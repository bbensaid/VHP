import { NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { webcrypto } from "crypto";

export async function POST(req: NextRequest) {
  const { keyId } = await req.json();
  if (!keyId || typeof keyId !== "string") {
    return NextResponse.json({ error: "keyId required" }, { status: 400 });
  }

  const cookieStore = await cookies();
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    { cookies: { getAll: () => cookieStore.getAll() } }
  );

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  // Fetch the key being rotated — must belong to this user and be active
  const { data: oldKey, error: fetchErr } = await supabase
    .from("api_keys")
    .select("id, name, tier, user_id, revoked_at")
    .eq("id", keyId)
    .eq("user_id", user.id)
    .is("revoked_at", null)
    .single();

  if (fetchErr || !oldKey) {
    return NextResponse.json({ error: "Key not found or already revoked" }, { status: 404 });
  }

  // Generate new key
  const hmacSecret = process.env.API_KEY_HMAC_SECRET;
  if (!hmacSecret) {
    return NextResponse.json({ error: "Server configuration error" }, { status: 500 });
  }

  const randomBytes = webcrypto.getRandomValues(new Uint8Array(32));
  const randomHex = Array.from(randomBytes).map(b => b.toString(16).padStart(2, "0")).join("");
  const payload = `${user.id}:${randomHex}`;
  const secretKey = await webcrypto.subtle.importKey(
    "raw", new TextEncoder().encode(hmacSecret), { name: "HMAC", hash: "SHA-256" }, false, ["sign"]
  );
  const sigBuf = await webcrypto.subtle.sign("HMAC", secretKey, new TextEncoder().encode(payload));
  const sigHex = Array.from(new Uint8Array(sigBuf)).map(b => b.toString(16).padStart(2, "0")).join("").slice(0, 16);
  const rawKey = `htr_${randomHex}${sigHex}`;

  const hashBuf = await webcrypto.subtle.digest("SHA-256", new TextEncoder().encode(rawKey));
  const keyHash = Array.from(new Uint8Array(hashBuf)).map(b => b.toString(16).padStart(2, "0")).join("");

  // Insert new key
  const { data: newRecord, error: insertErr } = await supabase
    .from("api_keys")
    .insert({
      user_id:      user.id,
      name:         oldKey.name,
      key_prefix:   rawKey.slice(0, 12),
      key_hash:     keyHash,
      tier:         oldKey.tier,
      rotated_from: oldKey.id,
    })
    .select("id, name, key_prefix, tier, requests_today, last_used_at, created_at, revoked_at")
    .single();

  if (insertErr || !newRecord) {
    return NextResponse.json({ error: "Failed to create rotated key" }, { status: 500 });
  }

  // Schedule old key expiry in 24 hours
  const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString();
  await supabase
    .from("api_keys")
    .update({ expires_at: expiresAt })
    .eq("id", oldKey.id);

  return NextResponse.json({ key: rawKey, record: newRecord, oldKeyExpiresAt: expiresAt });
}
