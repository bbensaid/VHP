// app/api/chat/route.ts
//
// Thin proxy to the Python AI Brain (backend/main.py).
// The AI Analyst is for signed-in members only (author's decision 2026-11-27):
// a request with no session is refused here with a clear message, and the
// backend independently refuses any request without a valid Supabase token.
//
// Python backend: cd backend && uvicorn main:app --reload --port 8000
// Set PYTHON_BACKEND_URL in .env.local for production.

import { backendAuthHeader } from "@/lib/auth";
import { AI_PLAN_REQUIRED, AI_SIGN_IN_REQUIRED } from "@/lib/ai/signin";
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

// The five pillars, plus the Equity Imperative as an accepted cross-cutting
// scope. "Operations" was missing, so a chat request scoped to the Operations
// pillar was rejected by this schema outright.
const VALID_PILLARS = ["Policy", "Technology", "Economics", "Clinical", "Operations", "Equity"] as const;

const VALID_USER_ROLES = ["executive", "policy", "clinician", "economist", "tech", "compliance", "researcher", "investor", "all"] as const;

const ChatRequestSchema = z.object({
  message: z.string().min(1).max(2000),
  history: z.array(HistoryMessageSchema).max(100).optional().default([]),
  temperature: z.number().min(0).max(1).optional().default(0.7),
  systemPrompt: z.string().max(800).optional(),
  pillar: z.enum(VALID_PILLARS).optional(),
  userRole: z.enum(VALID_USER_ROLES).optional(),
  pageContext: z.string().max(300).optional(),
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

  // The caller's real session token (lib/auth backendAuthHeader); none if anonymous.
  const authHeaders = await backendAuthHeader();
  if (!authHeaders.Authorization) {
    return NextResponse.json(AI_SIGN_IN_REQUIRED, { status: 401 });
  }

  // Forward the requesting domain so the backend can brand its URLs
  // (healthtransformationreview.* vs healthtransformationsolutions.*).
  // Prefer x-forwarded-host: behind a proxy/CDN the bare host header can be
  // the internal deployment host rather than the public domain.
  const hostHeader =
    req.headers.get("x-forwarded-host") || req.headers.get("host") || "";

  try {
    const upstream = await fetch(`${PYTHON_BACKEND}/api/chat`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...authHeaders,
        "X-HTR-Host": hostHeader,
      },
      body: JSON.stringify(parsed.data),
    });

    if (!upstream.ok) {
      const detail = await upstream.text();
      console.error("Python backend error:", upstream.status, detail);

      if (upstream.status === 401) {
        return NextResponse.json(AI_SIGN_IN_REQUIRED, { status: 401 });
      }
      if (upstream.status === 403) {
        return NextResponse.json(AI_PLAN_REQUIRED, { status: 403 });
      }

      return NextResponse.json(
        { error: "The AI Analyst returned an error. Please try again." },
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
      { error: "The AI Analyst is not reachable right now. It may be starting up — try again in 30 seconds." },
      { status: 503 }
    );
  }
}
