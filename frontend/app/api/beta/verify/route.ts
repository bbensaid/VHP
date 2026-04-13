import { NextRequest, NextResponse } from "next/server";
import { dbAdmin } from "@/lib/db/client";

const BETA_COOKIE = "htr_beta";
const COOKIE_MAX_AGE = 60 * 60 * 24 * 7; // 7 days

export async function POST(req: NextRequest) {
  let code: string;
  try {
    const body = await req.json();
    code = (body.code ?? "").trim();
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  if (!code) {
    return NextResponse.json({ error: "Access code required" }, { status: 400 });
  }

  // Validate against Supabase table
  const { data, error } = await dbAdmin
    .from("beta_access_codes")
    .select("id")
    .eq("code", code)
    .eq("is_active", true)
    .maybeSingle();

  if (error || !data) {
    return NextResponse.json({ error: "Invalid access code" }, { status: 401 });
  }

  // Grant access — set httpOnly cookie
  const res = NextResponse.json({ ok: true });
  res.cookies.set(BETA_COOKIE, "granted", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: COOKIE_MAX_AGE,
    path: "/",
  });
  return res;
}
