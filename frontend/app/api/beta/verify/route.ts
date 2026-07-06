import { NextRequest, NextResponse } from "next/server";
import { dbAdmin } from "@/lib/db/client";
import { normalizeHost, isAccessDomain } from "@/lib/brand";

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

  const host = normalizeHost(req.headers.get("host"));

  // Validate against Supabase table
  const { data, error } = await dbAdmin
    .from("beta_access_codes")
    .select("id, allowed_domains")
    .eq("code", code)
    .eq("is_active", true)
    .maybeSingle();

  if (error || !data) {
    return NextResponse.json({ error: "Invalid access code" }, { status: 401 });
  }

  // Enforce domain scope in production. On non-production hosts (localhost,
  // preview deploys) the host isn't one of the four access domains, so we
  // bypass the check to avoid locking out local dev.
  if (process.env.NODE_ENV === "production" || isAccessDomain(host)) {
    const allowed: string[] = data.allowed_domains ?? [];
    if (!allowed.includes(host)) {
      return NextResponse.json(
        { error: "This access code isn't valid for this site." },
        { status: 401 }
      );
    }
  }

  // Grant access — set httpOnly cookie. The value embeds the granted host so a
  // cookie copied to another domain is rejected at the gate (defense in depth;
  // the cookie is already host-scoped because we set no Domain attribute).
  const res = NextResponse.json({ ok: true });
  res.cookies.set(BETA_COOKIE, `granted:${host}`, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: COOKIE_MAX_AGE,
    path: "/",
  });
  return res;
}
