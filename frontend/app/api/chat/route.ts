// app/api/chat/route.ts
//
// RAG-enhanced AI chat with conversation memory. Flow:
//   1. Embed the user's question (Google text-embedding-004)
//   2. Retrieve top-5 relevant HTR content chunks from Supabase pgvector
//   3. Build Gemini chat session with prior conversation history
//   4. Send augmented message and stream the response back to the client

import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";
import { embedText, searchSimilar, buildContextBlock } from "@/lib/rag";

interface HistoryMessage {
  role: "user" | "ai";
  text: string;
}

export async function POST(req: Request) {
  try {
    const { message, temperature, systemPrompt, history } = await req.json();

    if (!message) {
      return NextResponse.json(
        { response: "Please provide a message." },
        { status: 400 }
      );
    }

    if (!process.env.GEMINI_API_KEY) {
      return NextResponse.json(
        { response: "System Error: API Key not configured." },
        { status: 500 }
      );
    }

    // ── Step 1: Retrieve relevant HTR content ──────────────────────────────
    let contextBlock = "";
    try {
      const queryEmbedding = await embedText(message);
      const chunks = await searchSimilar(queryEmbedding, {
        matchThreshold: 0.45,
        matchCount: 5,
      });
      contextBlock = buildContextBlock(chunks);
    } catch (ragError) {
      // RAG failure is non-fatal — degrade gracefully to a context-free response
      console.warn("RAG retrieval failed (degraded mode):", ragError);
    }

    // ── Step 2: Build system context and current message ──────────────────
    const defaultSystemContext =
      "You are an expert AI Analyst for the Health Transformation Review (HTR). " +
      "Your audience consists of healthcare executives, policy makers, and economists. " +
      "Answer questions thoroughly and professionally, citing specific policies and data where relevant. " +
      "Focus on policy, economics, and technology implications. " +
      "When referencing HTR content provided above, cite it by title or source number.";

    const systemContext = systemPrompt || defaultSystemContext;

    // On the very first turn, prepend the system context to the user message.
    // On follow-up turns it's already established via history.
    const priorMessages: HistoryMessage[] = Array.isArray(history) ? history : [];
    const isFirstTurn = priorMessages.length === 0;

    const currentUserText = contextBlock
      ? `${isFirstTurn ? systemContext + "\n\n" : ""}${contextBlock}\n\nQuestion: ${message}`
      : `${isFirstTurn ? systemContext + "\n\n" : ""}${message}`;

    // ── Step 3: Build Gemini chat history ─────────────────────────────────
    // Map prior messages to Gemini's { role, parts } format.
    // Gemini requires alternating user/model turns — filter out empty AI messages
    // (e.g. a streaming message that was aborted before any text arrived).
    const geminiHistory = priorMessages
      .filter((m) => m.text.trim().length > 0)
      .map((m) => ({
        role: m.role === "user" ? "user" as const : "model" as const,
        parts: [{ text: m.text }],
      }));

    // ── Step 4: Start chat session and stream response ────────────────────
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash",
      generationConfig: {
        temperature: temperature ?? 0.7,
      },
    });

    const chat = model.startChat({ history: geminiHistory });
    const result = await chat.sendMessageStream(currentUserText);

    const stream = new ReadableStream({
      async start(controller) {
        const encoder = new TextEncoder();
        try {
          for await (const chunk of result.stream) {
            const chunkText = chunk.text();
            if (chunkText) {
              controller.enqueue(encoder.encode(chunkText));
            }
          }
          controller.close();
        } catch (error) {
          controller.error(error);
        }
      },
    });

    return new NextResponse(stream);
  } catch (error) {
    console.error("AI Chat Error:", error);
    return NextResponse.json(
      {
        response:
          "I'm currently unable to connect to the intelligence network. Please try again later.",
      },
      { status: 500 }
    );
  }
}
