// app/api/chat/route.ts
//
// Thin proxy to the Python AI Brain (backend/main.py).
// Auth is handled by the Python backend (JWT validation + tier detection).
// When SUPABASE_JWT_SECRET is not set on the backend, it runs in dev mode and
// accepts any request.
//
// Python backend: cd backend && uvicorn main:app --reload --port 8000
// Set PYTHON_BACKEND_URL in .env.local for production.

import { NextResponse } from "next/server";
import { z } from "zod";

// Allow up to 60 seconds for the streaming response (backend retrieval can be slow)
export const maxDuration = 60;

const PYTHON_BACKEND = process.env.PYTHON_BACKEND_URL || "http://localhost:8000";

const HistoryMessageSchema = z.object({
  id: z.string().optional(),
  role: z.enum(["user", "ai"]),
  text: z.string().max(4000),
});

const VALID_PILLARS = ["Policy", "Economics", "Technology", "Clinical", "Equity"] as const;

const ChatRequestSchema = z.object({
  message: z.string().min(1).max(2000),
  history: z.array(HistoryMessageSchema).max(100).optional().default([]),
  temperature: z.number().min(0).max(1).optional().default(0.7),
  systemPrompt: z.string().max(800).optional(),
  pillar: z.enum(VALID_PILLARS).optional(),
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

  // Forward the user's cookie-based session token if present, otherwise send
  // a dev placeholder so the backend's auth_header check is satisfied.
  const authHeader = req.headers.get("Authorization") || "Bearer dev";

  try {
    const upstream = await fetch(`${PYTHON_BACKEND}/api/chat`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": authHeader,
      },
      body: JSON.stringify(parsed.data),
    });

    if (!upstream.ok) {
      const detail = await upstream.text();
      console.error("Python backend error:", upstream.status, detail);

      if (upstream.status === 401 || upstream.status === 403) {
        return NextResponse.json(
          { error: "Access denied. Check backend auth configuration." },
          { status: 403 }
        );
      }

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
