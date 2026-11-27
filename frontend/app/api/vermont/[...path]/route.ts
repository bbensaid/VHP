/**
 * Same-origin pass-through for /bed-capacity → backend /api/vermont/*.
 *
 * The page used to call the backend straight from the browser via
 * NEXT_PUBLIC_BACKEND_URL, which was never set in Vercel, so the live bundle
 * called http://localhost:8000 and the page never reached the backend. It also
 * read a token from localStorage that nothing set. This route uses the
 * server-only PYTHON_BACKEND_URL (as /api/chat does) and the caller's own
 * cookie session; the backend still enforces its subscriber check.
 */
import { NextResponse, type NextRequest } from "next/server";
import { createSupabaseServerClient } from "@/lib/auth";

const PYTHON_BACKEND = process.env.PYTHON_BACKEND_URL || "http://localhost:8000";

async function forward(req: NextRequest, ctx: { params: Promise<{ path: string[] }> }) {
  const { path } = await ctx.params;
  if (!path.every((p) => /^[A-Za-z0-9_-]+$/.test(p))) {
    return NextResponse.json({ error: "bad path" }, { status: 400 });
  }
  const supabase = await createSupabaseServerClient();
  const { data: { session } } = await supabase.auth.getSession();
  const url = `${PYTHON_BACKEND}/api/vermont/${path.join("/")}${req.nextUrl.search}`;
  const init: RequestInit = {
    method: req.method,
    headers: {
      "Content-Type": "application/json",
      ...(session?.access_token ? { Authorization: `Bearer ${session.access_token}` } : {}),
    },
    cache: "no-store",
  };
  if (req.method !== "GET") init.body = await req.text();
  try {
    const upstream = await fetch(url, init);
    return new NextResponse(await upstream.text(), {
      status: upstream.status,
      headers: { "Content-Type": upstream.headers.get("content-type") ?? "application/json" },
    });
  } catch {
    return NextResponse.json({ error: "backend unreachable" }, { status: 502 });
  }
}

export const GET = forward;
export const POST = forward;
export const PATCH = forward;
