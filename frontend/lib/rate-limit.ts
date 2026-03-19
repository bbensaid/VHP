/**
 * lib/rate-limit.ts
 *
 * Sliding-window rate limiter for Next.js API routes.
 * Uses an in-memory Map — resets on each cold start, which is acceptable
 * for a single-instance deployment (Railway/Vercel with 1 region).
 *
 * For multi-region or high-traffic production, swap `store` for
 * an Upstash Redis client (drop-in: @upstash/ratelimit + @upstash/redis).
 *
 * Usage:
 *   const result = await rateLimit(userId, { limit: 20, window: 60_000 });
 *   if (!result.success) return NextResponse.json({ error: "Rate limit exceeded" }, { status: 429 });
 */

interface WindowEntry {
  count: number;
  resetAt: number;
}

// Module-level store — persists across requests within a container instance
const store = new Map<string, WindowEntry>();

// Clean up expired entries every 5 minutes to prevent unbounded memory growth
if (typeof setInterval !== "undefined") {
  setInterval(() => {
    const now = Date.now();
    for (const [key, entry] of store) {
      if (entry.resetAt < now) store.delete(key);
    }
  }, 5 * 60 * 1000);
}

interface RateLimitOptions {
  /** Max requests allowed in the window */
  limit: number;
  /** Window duration in milliseconds */
  window: number;
}

interface RateLimitResult {
  success: boolean;
  /** Remaining requests in this window */
  remaining: number;
  /** Epoch ms when the current window resets */
  resetAt: number;
  /** HTTP headers to add to the response */
  headers: Record<string, string>;
}

export async function rateLimit(
  key: string,
  { limit, window }: RateLimitOptions
): Promise<RateLimitResult> {
  const now = Date.now();
  const entry = store.get(key);

  if (!entry || entry.resetAt < now) {
    // Start a fresh window
    const resetAt = now + window;
    store.set(key, { count: 1, resetAt });
    return {
      success: true,
      remaining: limit - 1,
      resetAt,
      headers: {
        "X-RateLimit-Limit": String(limit),
        "X-RateLimit-Remaining": String(limit - 1),
        "X-RateLimit-Reset": String(Math.ceil(resetAt / 1000)),
      },
    };
  }

  entry.count += 1;
  const remaining = Math.max(0, limit - entry.count);
  const success = entry.count <= limit;

  return {
    success,
    remaining,
    resetAt: entry.resetAt,
    headers: {
      "X-RateLimit-Limit": String(limit),
      "X-RateLimit-Remaining": String(remaining),
      "X-RateLimit-Reset": String(Math.ceil(entry.resetAt / 1000)),
      ...(success ? {} : { "Retry-After": String(Math.ceil((entry.resetAt - now) / 1000)) }),
    },
  };
}
