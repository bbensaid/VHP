// app/api/chat/route.ts
//
// Thin proxy to the Python AI Brain (backend/main.py).
// Validates input, forwards the user's Supabase JWT to the Python backend
// for auth + tier detection, and streams the response back to the browser.
//
// Python backend: cd backend && uvicorn main:app --reload --port 8000
// Set PYTHON_BACKEND_URL in .env.local for production.

import { NextResponse } from "next/server";
import { z } from "zod";
import { createSupabaseServerClient } from "@/lib/auth";
import { rateLimit } from "@/lib/rate-limit";

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
  // Get the current user's session token
  const supabase = await createSupabaseServerClient();
  const { data: { session } } = await supabase.auth.getSession();

  // Chat requires authentication; return 401 if not logged in
  if (!session?.access_token) {
    return NextResponse.json(
      { error: "Authentication required. Please sign in to use the AI Analyst." },
      { status: 401 }
    );
  }

  // Rate limit: 30 requests per 60 seconds per user
  const limiter = await rateLimit(`chat:${session.user.id}`, {
    limit: 30,
    window: 60_000,
  });
  if (!limiter.success) {
    return NextResponse.json(
      { error: "Too many requests. Please wait a moment before sending another message." },
      { status: 429, headers: limiter.headers }
    );
  }

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
      headers: {
        "Content-Type": "application/json",
        // Forward the user's JWT — Python backend validates it and extracts role
        "Authorization": `Bearer ${session.access_token}`,
      },
      body: JSON.stringify(parsed.data),
    });

    if (!upstream.ok) {
      const detail = await upstream.text();
      console.error("Python backend error:", upstream.status, detail);

      if (upstream.status === 401 || upstream.status === 403) {
        return NextResponse.json(
          { error: "Your plan does not include AI Analyst access. Upgrade to Subscriber or higher." },
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
