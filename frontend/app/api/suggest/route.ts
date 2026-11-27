import { NextResponse } from "next/server";
import { backendAuthHeader } from "@/lib/auth";

const PYTHON_BACKEND = process.env.PYTHON_BACKEND_URL || "http://localhost:8000";

// Follow-up suggestions are part of the AI Analyst: signed-in members only.
// Anyone else simply gets no suggestions (the chat itself shows the sign-in message).
export async function POST(req: Request) {
  try {
    const authHeaders = await backendAuthHeader();
    if (!authHeaders.Authorization) return NextResponse.json({ suggestions: [] });
    const body = await req.json();
    const upstream = await fetch(`${PYTHON_BACKEND}/api/suggest`, {
      method: "POST",
      headers: { "Content-Type": "application/json", ...authHeaders },
      body: JSON.stringify(body),
    });
    if (!upstream.ok) return NextResponse.json({ suggestions: [] });
    const data = await upstream.json();
    return NextResponse.json(data);
  } catch {
    return NextResponse.json({ suggestions: [] });
  }
}
