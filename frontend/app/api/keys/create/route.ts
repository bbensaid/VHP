import { NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

const VALID_TIERS = ["researcher", "enterprise"] as const;
type Tier = (typeof VALID_TIERS)[number];

/**
 * Generate an HMAC-SHA256 signature (hex) over `message` using `secret`.
 * Uses the Web Crypto API (available in Edge and Node runtimes).
 */
async function hmacSign(secret: string, message: string): Promise<string> {
  const enc = new TextEncoder();
  const key = await crypto.subtle.importKey(
    "raw",
    enc.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );
  const sig = await crypto.subtle.sign("HMAC", key, enc.encode(message));
  return Array.from(new Uint8Array(sig))
    .map(b => b.toString(16).padStart(2, "0"))
    .join("");
}

async function sha256hex(text: string): Promise<string> {
  const buf = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(text));
  return Array.from(new Uint8Array(buf))
    .map(b => b.toString(16).padStart(2, "0"))
    .join("");
}

export async function POST(req: NextRequest) {
  const cookieStore = await cookies();
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    { cookies: { getAll: () => cookieStore.getAll() } }
  );

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let name: string;
  let tier: Tier;
  try {
    const body = await req.json();
    name = String(body.name ?? "").trim().slice(0, 100);
    tier = VALID_TIERS.includes(body.tier) ? body.tier : "researcher";
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  if (!name) {
    return NextResponse.json({ error: "Name is required" }, { status: 400 });
  }

  const secret = process.env.API_KEY_HMAC_SECRET;
  if (!secret) {
    console.error("API_KEY_HMAC_SECRET is not set");
    return NextResponse.json({ error: "Server misconfiguration" }, { status: 500 });
  }

  // Generate 32 hex chars (128-bit) random payload
  const randomBytes = new Uint8Array(16);
  crypto.getRandomValues(randomBytes);
  const random = Array.from(randomBytes)
    .map(b => b.toString(16).padStart(2, "0"))
    .join("");

  // HMAC signs userId:random — binds key to the issuing user, prevents forgery
  const hmac = await hmacSign(secret, `${user.id}:${random}`);
  // Use first 16 chars of HMAC (64-bit) as the signature suffix
  const rawKey = `htr_${random}${hmac.slice(0, 16)}`;

  const keyPrefix = rawKey.slice(0, 12); // "htr_" + 8 hex chars
  const keyHash = await sha256hex(rawKey);

  const { data, error } = await supabase
    .from("api_keys")
    .insert({
      user_id: user.id,
      name,
      key_prefix: keyPrefix,
      key_hash: keyHash,
      tier,
    })
    .select("id, name, key_prefix, tier, requests_today, last_used_at, created_at, revoked_at")
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  // Return the raw key only once — never stored
  return NextResponse.json({ key: rawKey, record: data });
}
