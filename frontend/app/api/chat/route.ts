// app/api/chat/route.ts
//
// Thin proxy to the Python AI Brain (backend/main.py).
// All RAG logic, embeddings, and LLM calls happen in the Python service.
// This route simply forwards the request and streams the response back.
//
// Python backend must be running: uvicorn main:app --reload --port 8000
// Set PYTHON_BACKEND_URL in .env.local for production deployments.

import { NextResponse } from "next/server";

const PYTHON_BACKEND = process.env.PYTHON_BACKEND_URL || "http://localhost:8000";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const upstream = await fetch(`${PYTHON_BACKEND}/api/chat`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    if (!upstream.ok) {
      const detail = await upstream.text();
      console.error("Python backend error:", detail);
      return NextResponse.json(
        { response: "The AI backend returned an error. Is the Python server running?" },
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
      {
        response:
          "Cannot reach the AI backend. Start it with: cd backend && uvicorn main:app --reload --port 8000",
      },
      { status: 503 }
    );
  }
}
