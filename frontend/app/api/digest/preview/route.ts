/**
 * Editorial preview of the upcoming weekly digest — JSON only, no email.
 *
 * GET /api/digest/preview        → next digest as JSON
 * GET /api/digest/preview?for=2026-05-14  → digest ending on this date
 */

import { NextResponse } from "next/server";
import { buildDigest } from "@/lib/digest";
import { createSupabaseServerClient } from "@/lib/auth";

export async function GET(req: Request) {
  // Editors only — verify the requester is signed in. (Stricter role gating
  // can be added once an "editor" role exists; for now any authenticated
  // user can see what would be sent.)
  const supabase = await createSupabaseServerClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "unauthenticated" }, { status: 401 });

  const url = new URL(req.url);
  const forDate = url.searchParams.get("for");
  const now = forDate ? new Date(forDate) : new Date();
  if (Number.isNaN(now.getTime())) {
    return NextResponse.json({ error: "Invalid ?for= date" }, { status: 400 });
  }

  const payload = await buildDigest(now);
  return NextResponse.json(payload);
}
