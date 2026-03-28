// lib/sanity-fetch.ts
//
// Cached Sanity data fetching utilities.
//
// Uses Next.js unstable_cache to cache GROQ query results at the server level,
// with tag-based revalidation triggered by the Sanity webhook.
//
// Usage:
//   import { cachedFetch } from "@/lib/sanity-fetch";
//   const articles = await cachedFetch<Article[]>(groqQuery, params, { tags: ["policyAnalysis"] });

import { unstable_cache } from "next/cache";
import { client } from "@/lib/sanity";

// Revalidation window (seconds). Webhook-triggered revalidation takes precedence.
const DEFAULT_REVALIDATE_SECONDS = 300; // 5 minutes

/**
 * Cached GROQ fetch. Results are cached per (query + params) with the given
 * cache tags. Call `revalidateTag(tag)` from the webhook route to bust the cache.
 */
export async function cachedFetch<T>(
  query: string,
  params?: Record<string, unknown>,
  options?: {
    tags?: string[];
    revalidate?: number;
  }
): Promise<T> {
  const tags = options?.tags ?? ["sanity"];
  const revalidate = options?.revalidate ?? DEFAULT_REVALIDATE_SECONDS;

  // Create a stable cache key from query + params
  const cacheKey = [
    "sanity",
    // Simple hash: query length + first 40 chars + params JSON
    `${query.length}:${query.slice(0, 40)}`,
    params ? JSON.stringify(params) : "",
  ];

  const fetcher = unstable_cache(
    async () => client.fetch<T>(query, params ?? {}),
    cacheKey,
    { tags, revalidate }
  );

  return fetcher();
}

// ─── Pre-built cached fetchers for common queries ────────────────────────────

/** Home feed — articles + webinars + courses, most recent 30 */
export const getCachedHomeFeed = () =>
  cachedFetch<unknown[]>(
    `*[_type in ["policyAnalysis","post","webinar","course"]] | order(publishedAt desc, _createdAt desc) [0...30] {
      _id, _type, title, pillar,
      "slug": slug.current,
      "summary": select(_type == "policyAnalysis" => summary, _type == "post" => pt::text(body)[0...200], description),
      publishedAt, _createdAt
    }`,
    undefined,
    { tags: ["policyAnalysis", "post", "webinar", "course"], revalidate: 120 }
  );

/** Lead story — most recent high-impact policy analysis */
export const getCachedLeadStory = () =>
  cachedFetch<unknown>(
    `*[_type == "policyAnalysis" && impactLevel in ["Critical","High"]] | order(publishedAt desc) [0] {
      _id, title, summary, pillar, publishedAt,
      "slug": slug.current
    }`,
    undefined,
    { tags: ["policyAnalysis"], revalidate: 120 }
  );

/** Academy courses list */
export const getCachedCourses = () =>
  cachedFetch<unknown[]>(
    `*[_type == "course"] | order(_createdAt desc) {
      _id, title, pillar, type, description, meta, price,
      "slug": slug.current,
      "instructorCount": count(instructors),
      "moduleCount": count(modules)
    }`,
    undefined,
    { tags: ["course"], revalidate: 300 }
  );

/** Glossary definitions */
export const getCachedGlossary = () =>
  cachedFetch<unknown[]>(
    `*[_type == "definition"] | order(term asc) { _id, term, description, pillars }`,
    undefined,
    { tags: ["definition"], revalidate: 600 }
  );

/** Ticker data from Sanity */
export const getCachedTicker = () =>
  cachedFetch<unknown[]>(
    `*[_type == "ticker"] | order(_updatedAt desc) { _id, label, value, trend, status }`,
    undefined,
    { tags: ["ticker"], revalidate: 60 }
  );
