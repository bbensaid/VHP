// app/api/personalized-learning/route.ts
//
// Thin proxy to the Python AI Brain for personalized learning path generation.
// Forwards the user's auth token to the Python backend for subscriber gating.

import { NextResponse } from "next/server";

const PYTHON_BACKEND = process.env.PYTHON_BACKEND_URL || "http://localhost:8000";

export async function POST(req: Request) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const authHeader = req.headers.get("Authorization") || "Bearer dev";

  try {
    const upstream = await fetch(
      `${PYTHON_BACKEND}/api/personalized-learning/generate`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: authHeader,
        },
        body: JSON.stringify(body),
        // Allow up to 90 seconds — LLM generation of multi-week curriculum takes time
        signal: AbortSignal.timeout(90_000),
      }
    );

    if (!upstream.ok) {
      const detail = await upstream.text();
      console.error("Personalized learning backend error:", upstream.status, detail);
      return NextResponse.json(
        { error: "The AI backend returned an error. Please try again." },
        { status: upstream.status }
      );
    }

    const data = await upstream.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Personalized learning proxy error:", error);
    return NextResponse.json(
      {
        error:
          "Cannot reach the AI backend. Ensure it is running: cd backend && uvicorn main:app --reload --port 8000",
      },
      { status: 503 }
    );
  }
}
