/**
 * POST /api/digest
 *
 * Sends the weekly intelligence digest to all active subscribers.
 * Called manually or via a cron job / Vercel Cron.
 *
 * Prerequisites:
 *   - RESEND_API_KEY in environment
 *   - DIGEST_SECRET in environment (to protect this endpoint)
 *
 * Trigger (e.g. via curl):
 *   curl -X POST https://your-domain.com/api/digest \
 *     -H "Authorization: Bearer $DIGEST_SECRET"
 */

import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@sanity/client";

const sanity = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  apiVersion: "2024-01-01",
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
});

async function sendEmail(to: string, subject: string, html: string) {
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: "HTR Intelligence <digest@healthtransformationreport.com>",
      to,
      subject,
      html,
    }),
  });
  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Resend error: ${err}`);
  }
}

function buildDigestHtml(articles: { title: string; summary: string; slug: string; pillar: string }[]) {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://healthtransformationreport.com";
  const rows = articles
    .map(
      (a) => `
    <tr>
      <td style="padding:16px 0;border-bottom:1px solid #e2e8f0">
        <div style="font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:0.1em;color:#64748b;margin-bottom:4px">${a.pillar}</div>
        <a href="${baseUrl}/policy/${a.slug}" style="font-size:16px;font-weight:700;color:#0f172a;text-decoration:none">${a.title}</a>
        <p style="font-size:14px;color:#475569;margin:6px 0 0">${a.summary}</p>
      </td>
    </tr>`
    )
    .join("");

  return `<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;background:#f8fafc;margin:0;padding:0">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f8fafc;padding:32px 16px">
    <tr><td>
      <table width="600" cellpadding="0" cellspacing="0" align="center" style="background:#fff;border-radius:12px;overflow:hidden;border:1px solid #e2e8f0">
        <!-- Header -->
        <tr><td style="background:#0f172a;padding:24px 32px">
          <div style="font-size:20px;font-weight:900;color:#fff;letter-spacing:-0.5px">HTR Intelligence</div>
          <div style="font-size:12px;color:#94a3b8;margin-top:4px">Weekly Healthcare Policy Digest</div>
        </td></tr>
        <!-- Body -->
        <tr><td style="padding:24px 32px">
          <p style="font-size:14px;color:#64748b;margin:0 0 24px">This week's top analyses from the Vermont Health Transformation Report:</p>
          <table width="100%" cellpadding="0" cellspacing="0">${rows}</table>
        </td></tr>
        <!-- Footer -->
        <tr><td style="background:#f8fafc;padding:16px 32px;border-top:1px solid #e2e8f0">
          <p style="font-size:11px;color:#94a3b8;margin:0">
            You're receiving this because you subscribed at <a href="${baseUrl}" style="color:#64748b">${baseUrl}</a>.
            <a href="${baseUrl}/unsubscribe" style="color:#64748b">Unsubscribe</a>
          </p>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`;
}

export async function POST(req: NextRequest) {
  // Auth check
  const auth = req.headers.get("authorization");
  if (!auth || auth !== `Bearer ${process.env.DIGEST_SECRET}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (!process.env.RESEND_API_KEY) {
    return NextResponse.json({ error: "RESEND_API_KEY not configured" }, { status: 500 });
  }

  try {
    // Fetch active digest subscribers
    const subscribers: { email: string }[] = await sanity.fetch(
      `*[_type == "subscriber" && isActive == true && digestEnabled == true]{ email }`
    );

    // Fetch last 5 policy analyses for the digest
    const articles = await sanity.fetch(
      `*[_type == "policyAnalysis"] | order(publishedAt desc) [0...5] {
        title, "slug": slug.current, summary, pillar
      }`
    );

    if (subscribers.length === 0) {
      return NextResponse.json({ message: "No active subscribers", sent: 0 });
    }

    const subject = `HTR Weekly Digest — ${new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}`;
    const html = buildDigestHtml(articles);

    let sent = 0;
    let errors = 0;
    for (const sub of subscribers) {
      try {
        await sendEmail(sub.email, subject, html);
        sent++;
      } catch {
        errors++;
      }
    }

    return NextResponse.json({ message: "Digest sent", sent, errors, total: subscribers.length });
  } catch (err) {
    console.error("Digest send error:", err);
    return NextResponse.json({ error: "Failed to send digest" }, { status: 500 });
  }
}
