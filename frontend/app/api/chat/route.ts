// app/api/chat/route.ts
//
// IMPORTANT: This file was previously at components/route.ts which Next.js
// cannot register as an API route. It must live at app/api/chat/route.ts.
// No logic has changed — only the file location.

import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

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

    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash",
      generationConfig: {
        temperature: temperature ?? 0.7,
      },
    });

    const defaultContext =
      "You are an expert AI Analyst for the Health Transformation Review (HTR). " +
      "Your audience consists of healthcare executives, policy makers, and economists. " +
      "Answer questions thoroughly and professionally. " +
      "Focus on policy, economics, and technology implications.";

    const systemContext = `${systemPrompt || defaultContext}\n\nQuestion: ${message}`;
    const result = await model.generateContentStream(systemContext);

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