/**
 * Weekly digest builder.
 *
 * Queries Sanity for the past 7 days of reports, courses, and webinars and
 * returns a structured payload ready to feed Loops.so or render in the
 * /api/cron/digest preview.
 *
 * Used by:
 *   - /api/cron/digest    (vercel cron → sends to all subscribed users)
 *   - /api/digest/preview (editorial preview of next digest before send)
 */

import { client } from "@/lib/sanity";

export interface DigestItem {
  type: "report" | "course" | "webinar";
  title: string;
  slug: string;
  /** ISO timestamp. */
  publishedAt: string;
  /** Pillar id when known (lowercase). */
  pillar?: string;
  summary?: string;
}

export interface DigestPayload {
  /** Week start (ISO date, Monday 00:00 UTC). */
  weekStart: string;
  /** Week end (ISO date, Sunday 23:59:59 UTC). */
  weekEnd: string;
  items: DigestItem[];
  /** Hand-curated headline from the most recent analystNote. */
  analystHeadline?: string;
}

const QUERY = /* groq */ `{
  "items": *[
    _type in ["report", "course", "webinar"] &&
    coalesce(publishedAt, _createdAt) >= $start &&
    coalesce(publishedAt, _createdAt) <= $end
  ] | order(coalesce(publishedAt, _createdAt) desc)[0...12] {
    "type": _type,
    title,
    "slug": slug.current,
    "publishedAt": coalesce(publishedAt, _createdAt),
    "pillar": pillar,
    summary
  },
  "analystNote": *[_type == "analystNote"] | order(_updatedAt desc)[0]{
    headline
  }
}`;

/**
 * Build the digest for the seven days ending at `now`. Defaults to "now" but
 * accepts an override for testing / backfill.
 */
export async function buildDigest(now: Date = new Date()): Promise<DigestPayload> {
  const end = new Date(now);
  const start = new Date(now);
  start.setUTCDate(start.getUTCDate() - 7);

  const data = await client.fetch<{
    items: DigestItem[];
    analystNote: { headline?: string } | null;
  }>(
    QUERY,
    { start: start.toISOString(), end: end.toISOString() },
    { next: { revalidate: 0 } }
  );

  return {
    weekStart: start.toISOString(),
    weekEnd: end.toISOString(),
    items: data.items ?? [],
    analystHeadline: data.analystNote?.headline,
  };
}

/**
 * Pillar-grouped view of a digest payload, useful for templates that lay out
 * one section per pillar.
 */
export function groupByPillar(payload: DigestPayload): Record<string, DigestItem[]> {
  const out: Record<string, DigestItem[]> = {};
  for (const item of payload.items) {
    const key = (item.pillar ?? "other").toLowerCase();
    if (!out[key]) out[key] = [];
    out[key].push(item);
  }
  return out;
}
