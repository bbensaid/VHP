import { NextResponse } from "next/server";

const PYTHON_BACKEND = process.env.PYTHON_BACKEND_URL || "http://localhost:8000";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const upstream = await fetch(`${PYTHON_BACKEND}/api/suggest`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    if (!upstream.ok) return NextResponse.json({ suggestions: [] });
    const data = await upstream.json();
    return NextResponse.json(data);
  } catch {
    return NextResponse.json({ suggestions: [] });
  }
}
