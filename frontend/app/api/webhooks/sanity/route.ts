/**
 * POST /api/webhooks/sanity
 * Receives Sanity content change events and triggers RAG re-ingestion.
 * Verifies the Sanity webhook signature (HMAC-SHA256).
 */
import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";

const SANITY_WEBHOOK_SECRET = process.env.SANITY_WEBHOOK_SECRET;
const BACKEND_URL = process.env.PYTHON_BACKEND_URL;
const INGEST_SECRET = process.env.INGEST_SECRET;

export async function POST(req: NextRequest) {
  const body = await req.text();
  const signature = req.headers.get("sanity-webhook-signature");

  if (SANITY_WEBHOOK_SECRET && signature) {
    // Sanity signs with HMAC-SHA256; signature is "t=<timestamp>,v1=<hex>"
    const [tPart, v1Part] = signature.split(",");
    const timestamp = tPart?.replace("t=", "");
    const receivedSig = v1Part?.replace("v1=", "");
    const expectedSig = crypto
      .createHmac("sha256", SANITY_WEBHOOK_SECRET)
      .update(`${timestamp}.${body}`)
      .digest("hex");
    if (receivedSig !== expectedSig) {
      return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
    }
  }

  // Trigger backend RAG re-ingestion
  if (BACKEND_URL && INGEST_SECRET) {
    try {
      await fetch(`${BACKEND_URL}/api/ingest`, {
        method: "POST",
        headers: { Authorization: `Bearer ${INGEST_SECRET}` },
      });
    } catch (e) {
      console.error("[sanity-webhook] Failed to trigger ingest:", e);
    }
  }

  return NextResponse.json({ received: true });
}
