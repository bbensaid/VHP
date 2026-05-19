/**
 * Weekly digest cron — Vercel runs this once a week (see vercel.json).
 *
 * Flow:
 *   1. Build the digest payload from Sanity (lib/digest.ts)
 *   2. Read the subscriber list from Supabase (auth.users joined with
 *      user_roles for opted-in subscribers)
 *   3. Fan out via Loops transactional template
 *
 * The endpoint is guarded by CRON_SECRET; Vercel sends `Authorization:
 * Bearer <secret>` automatically when invoking scheduled jobs. The endpoint
 * also accepts ?dryRun=1 which builds the digest but does not send.
 */

import { NextResponse } from "next/server";
import { buildDigest } from "@/lib/digest";
import { dbAdmin } from "@/lib/db/client";
import { sendTransactional, TEMPLATE } from "@/lib/loops";

const APP_URL = process.env.NEXT_PUBLIC_APP_URL ?? "https://localhost:3000";

function unauthorized() {
  return NextResponse.json({ error: "unauthorized" }, { status: 401 });
}

export async function GET(req: Request) {
  // Vercel cron sends `Authorization: Bearer <CRON_SECRET>`. Local / manual
  // calls can pass ?token=<CRON_SECRET> instead.
  const cronSecret = process.env.CRON_SECRET;
  const auth = req.headers.get("authorization") ?? "";
  const url = new URL(req.url);
  const tokenParam = url.searchParams.get("token");
  if (cronSecret) {
    const ok = auth === `Bearer ${cronSecret}` || tokenParam === cronSecret;
    if (!ok) return unauthorized();
  }

  const dryRun = url.searchParams.get("dryRun") === "1";

  // 1. Build the digest
  const payload = await buildDigest();
  if (payload.items.length === 0) {
    return NextResponse.json({ ok: true, sent: 0, reason: "no items this week" });
  }

  if (dryRun) {
    return NextResponse.json({ ok: true, dryRun: true, payload });
  }

  // 2. Subscribers: users with the digest_opt_in flag set.
  //    The opt-in is stored on auth.users.raw_user_meta_data; admins manage
  //    it via the /account page (TODO when account UI lands).
  const { data: users, error } = await dbAdmin
    .from("user_roles")
    .select("user_id, email, role, digest_opt_in")
    .eq("digest_opt_in", true);

  if (error) {
    console.error("digest cron: failed to load subscribers", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  // 3. Render a compact data-variable payload for the Loops template.
  //    Loops templates support up to ~30 data variables — we send the top 6
  //    items as item_1_title / item_1_url / etc., plus an aggregate count.
  const topItems = payload.items.slice(0, 6);
  const dataVars: Record<string, string | number> = {
    week_end: new Date(payload.weekEnd).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
    item_count: payload.items.length,
    headline: payload.analystHeadline ?? "",
  };
  topItems.forEach((it, i) => {
    const n = i + 1;
    dataVars[`item_${n}_title`] = it.title;
    dataVars[`item_${n}_url`] = `${APP_URL}/${it.slug}`;
    dataVars[`item_${n}_pillar`] = it.pillar ?? "";
    dataVars[`item_${n}_summary`] = (it.summary ?? "").slice(0, 240);
  });

  // 4. Fan out. We don't await all in parallel against the API rate limit —
  //    Loops handles ~10 req/s, so for moderate audiences we send serially
  //    and only escalate to batched if subscriber count grows.
  let sent = 0;
  let failed = 0;
  if (!TEMPLATE.digest) {
    console.warn("digest cron: LOOPS_TEMPLATE_DIGEST not set, skipping send");
    return NextResponse.json({ ok: true, sent: 0, reason: "template id not configured" });
  }
  for (const u of users ?? []) {
    if (!u.email) continue;
    try {
      await sendTransactional(TEMPLATE.digest, u.email, dataVars);
      sent++;
    } catch (err) {
      console.error("digest cron: send failed for", u.email, err);
      failed++;
    }
  }

  return NextResponse.json({ ok: true, sent, failed, total: users?.length ?? 0 });
}
