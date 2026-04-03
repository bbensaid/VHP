/**
 * frontend/app/api/webhooks/sanity/route.ts
 * Receives Sanity GROQ-webhook POST and forwards it to the backend incremental ingest endpoint.
 *
 * Sanity webhook config:
 *   URL: https://<your-domain>/api/webhooks/sanity
 *   Secret: same value as INGEST_SECRET in backend/.env
 *   Filter: _type in ["policyAnalysis","post","academyModule","caseStudy","definition","analystNote","webinar","report"]
 */

import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.text();
  const backendUrl = process.env.BACKEND_URL ?? "http://localhost:8000";

  try {
    const res = await fetch(`${backendUrl}/api/ingest/webhook`, {
      method: "POST",
      headers: {
        "Content-Type":       "application/json",
        "X-Sanity-Signature": req.headers.get("x-sanity-signature") ?? "",
        "Authorization":      `Bearer ${process.env.INGEST_SECRET ?? ""}`,
      },
      body,
    });

    if (!res.ok) {
      const text = await res.text();
      console.error("Backend webhook rejected:", res.status, text);
      return NextResponse.json({ error: "Backend rejected" }, { status: res.status });
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Sanity webhook forward failed:", err);
    // Return 200 to prevent Sanity from retrying during transient backend downtime
    return NextResponse.json({ ok: true, note: "backend_unavailable" });
  }
}
