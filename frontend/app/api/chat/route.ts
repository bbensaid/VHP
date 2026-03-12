// app/api/chat/route.ts
//
// Thin proxy to the Python AI Brain (backend/main.py).
// All RAG logic, embeddings, and LLM calls happen in the Python service.
// This route validates input, then forwards the request and streams the response back.
//
// Python backend must be running: uvicorn main:app --reload --port 8000
// Set PYTHON_BACKEND_URL in .env.local for production deployments.

import { NextResponse } from "next/server";
import { z } from "zod";

const PYTHON_BACKEND = process.env.PYTHON_BACKEND_URL || "http://localhost:8000";

const HistoryMessageSchema = z.object({
  id: z.string().optional(),
  role: z.enum(["user", "ai"]),
  text: z.string().max(4000),
});

const ChatRequestSchema = z.object({
  message: z.string().min(1).max(2000),
  history: z.array(HistoryMessageSchema).max(100).optional().default([]),
  temperature: z.number().min(0).max(1).optional().default(0.7),
  systemPrompt: z.string().max(800).optional(),
});

export async function POST(req: Request) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const parsed = ChatRequestSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Invalid request", details: parsed.error.flatten() },
      { status: 400 }
    );
  }

  try {
    const upstream = await fetch(`${PYTHON_BACKEND}/api/chat`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(parsed.data),
    });

    if (!upstream.ok) {
      const detail = await upstream.text();
      console.error("Python backend error:", detail);
      return NextResponse.json(
        { error: "The AI backend returned an error. Is the Python server running?" },
        { status: upstream.status }
      );
    }

    // Stream the response directly back to the browser
    return new NextResponse(upstream.body, {
      headers: { "Content-Type": "text/plain; charset=utf-8" },
    });
  } catch (error) {
    console.error("Proxy error:", error);
    return NextResponse.json(
      { error: "Cannot reach the AI backend. Start it with: cd backend && uvicorn main:app --reload --port 8000" },
      { status: 503 }
    );
  }
}
