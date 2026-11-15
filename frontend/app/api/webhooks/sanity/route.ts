/**
 * frontend/app/api/webhooks/sanity/route.ts
 *
 * Sanity calls this when a document is published, changed or deleted, so the
 * AI Analyst's library picks up the change (incremental re-index on Fly).
 *
 * Sanity webhook (sanity.io/manage → project → API → Webhooks):
 *   URL:     https://healthtransformationreview.org/api/webhooks/sanity
 *   Dataset: production · Trigger on: create, update, delete · Drafts: off
 *   Filter:  _type in ["policyAnalysis","post","academyModule","caseStudy","definition","analystNote","webinar"]
 *   Projection: {_id, _type}
 *   Secret:  SANITY_WEBHOOK_SECRET (Vercel)
 *
 * Two secrets, two hops:
 *   Sanity → here: Sanity signs with SANITY_WEBHOOK_SECRET (header
 *     "sanity-webhook-signature: t=<ms>,v1=<base64url HMAC-SHA256 of 't.body'>",
 *     the scheme of Sanity's own @sanity/webhook library).
 *   here → Fly:   Authorization: Bearer INGEST_SECRET (set on Vercel and Fly).
 */

import { NextRequest, NextResponse } from "next/server";

const SIGNATURE_HEADER = "sanity-webhook-signature";
const SIGNATURE_RE = /^t=(\d+)[, ]+v1=([^, ]+)$/;
const MAX_AGE_MS = 5 * 60 * 1000;

function base64url(bytes: ArrayBuffer): string {
  let s = "";
  for (const b of new Uint8Array(bytes)) s += String.fromCharCode(b);
  return btoa(s).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

async function isValidSignature(body: string, header: string | null, secret: string): Promise<boolean> {
  const m = header?.trim().match(SIGNATURE_RE);
  if (!m) return false;
  const timestamp = parseInt(m[1], 10);
  if (Math.abs(Date.now() - timestamp) > MAX_AGE_MS) return false;
  const key = await crypto.subtle.importKey(
    "raw", new TextEncoder().encode(secret), { name: "HMAC", hash: "SHA-256" }, false, ["sign"],
  );
  const sig = await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(`${timestamp}.${body}`));
  const expected = base64url(sig);
  // Constant-time compare
  if (expected.length !== m[2].length) return false;
  let diff = 0;
  for (let i = 0; i < expected.length; i++) diff |= expected.charCodeAt(i) ^ m[2].charCodeAt(i);
  return diff === 0;
}

export async function POST(req: NextRequest) {
  const webhookSecret = process.env.SANITY_WEBHOOK_SECRET;
  const ingestSecret = process.env.INGEST_SECRET;
  if (!webhookSecret || !ingestSecret) {
    return NextResponse.json({ error: "Webhook not configured" }, { status: 503 });
  }

  const body = await req.text();
  const sigHeader = req.headers.get(SIGNATURE_HEADER);
  if (!(await isValidSignature(body, sigHeader, webhookSecret))) {
    // Say which check failed, never the secret or the signature itself.
    const m = sigHeader?.trim().match(SIGNATURE_RE);
    const reason = !sigHeader ? "no signature header (is a secret set on the Sanity webhook?)"
      : !m ? `signature header in an unexpected format (length ${sigHeader.length})`
      : Math.abs(Date.now() - parseInt(m[1], 10)) > MAX_AGE_MS ? `timestamp too old or in the future (${m[1]})`
      : `signature does not match: the Sanity webhook secret differs from SANITY_WEBHOOK_SECRET (secret length here ${webhookSecret.length}, body length ${body.length})`;
    // Temporary diagnosis: which likely copy-paste mix-up the Sanity secret is.
    let mixup = "none of the common mix-ups";
    if (m && sigHeader) {
      const candidates: [string, string][] = [
        ["the INGEST_SECRET value", ingestSecret],
        ["the whole line SANITY_WEBHOOK_SECRET=…", `SANITY_WEBHOOK_SECRET=${webhookSecret}`],
        ["the whole line INGEST_SECRET=…", `INGEST_SECRET=${ingestSecret}`],
      ];
      for (const [label, candidate] of candidates) {
        if (await isValidSignature(body, sigHeader, candidate)) { mixup = label; break; }
      }
    }
    console.warn(`[sanity-webhook] rejected: ${reason}; Sanity's secret matches: ${mixup}`);
    return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
  }

  // PYTHON_BACKEND_URL is the setting that exists in Vercel; BACKEND_URL was
  // never set, so this used to forward to localhost and silently do nothing.
  const backendUrl = process.env.PYTHON_BACKEND_URL ?? process.env.BACKEND_URL ?? "http://localhost:8000";

  try {
    const res = await fetch(`${backendUrl}/api/ingest/webhook`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${ingestSecret}`,
      },
      body,
    });

    const text = await res.text();
    if (!res.ok) {
      console.error("Backend webhook rejected:", res.status, text);
      return NextResponse.json({ error: "Backend rejected" }, { status: 502 });
    }
    return new NextResponse(text, { status: 200, headers: { "Content-Type": "application/json" } });
  } catch (err) {
    console.error("Sanity webhook forward failed:", err);
    // 502 so Sanity retries later (the Fly machine may be waking up)
    return NextResponse.json({ error: "backend_unavailable" }, { status: 502 });
  }
}
