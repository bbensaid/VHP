// app/api/chat/route.ts
//
// RAG-enhanced AI chat. Flow:
//   1. Embed the user's question (Google text-embedding-004)
//   2. Retrieve top-5 relevant HTR content chunks from Supabase pgvector
//   3. Inject retrieved chunks as context into the Gemini prompt
//   4. Stream the response back to the client

import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";
import { embedText, searchSimilar, buildContextBlock } from "@/lib/rag";

export async function POST(req: Request) {
  try {
    const { message, temperature, systemPrompt } = await req.json();

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

    // ── Step 2: Build the augmented prompt ────────────────────────────────
    const defaultSystemContext =
      "You are an expert AI Analyst for the Health Transformation Review (HTR). " +
      "Your audience consists of healthcare executives, policy makers, and economists. " +
      "Answer questions thoroughly and professionally, citing specific policies and data where relevant. " +
      "Focus on policy, economics, and technology implications. " +
      "When referencing HTR content provided above, cite it by title or source number.";

    const systemContext = systemPrompt || defaultSystemContext;

    const fullPrompt = contextBlock
      ? `${systemContext}\n\n${contextBlock}\n\nQuestion: ${message}`
      : `${systemContext}\n\nQuestion: ${message}`;

    // ── Step 3: Stream Gemini response ────────────────────────────────────
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash",
      generationConfig: {
        temperature: temperature ?? 0.7,
      },
    });

    const result = await model.generateContentStream(fullPrompt);

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
