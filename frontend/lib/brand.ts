// ─── BRAND VARIANTS ───────────────────────────────────────────────────────────
// The platform serves four domains from a single deployment:
//   healthtransformationsolutions.org / .com  → "solutions" (full functionality)
//   healthtransformationreview.org    / .com  → "review"    (reduced: no advisory)
//
// 99% of the app is identical across domains. The only differences are the logo
// wordmark, the display name, and whether the "Advisory Services" section
// is shown. Everything flows from a single brand value resolved per request from
// the Host header.

export type Brand = "solutions" | "review";

export interface BrandConfig {
  /** Wordmark shown under the logo and used in the display name. */
  logoWord: string;
  /** Full brand name for <title>, metadata, footer copyright. */
  displayName: string;
  /** Whether the "Advisory Services" nav section is available. */
  showAdvisory: boolean;
}

export const BRAND_CONFIG: Record<Brand, BrandConfig> = {
  solutions: {
    logoWord: "SOLUTIONS",
    displayName: "Health Transformation Solutions",
    showAdvisory: true,
  },
  review: {
    logoWord: "REVIEW",
    displayName: "Health Transformation Review",
    showAdvisory: false,
  },
};

/**
 * Resolve the brand from a request host. Defaults to "solutions" so an unknown
 * host (localhost, preview deploys, etc.) gets the full-functionality variant.
 */
export function resolveBrand(host: string | null | undefined): Brand {
  if (!host) return "solutions";
  const h = host.toLowerCase();
  // Production: the review domains. Local dev: use a `review.localhost` alias
  // (or any host starting with `review.`) to preview the reduced variant.
  if (h.includes("healthtransformationreview") || h.startsWith("review.")) {
    return "review";
  }
  return "solutions";
}

export function getBrandConfig(brand: Brand): BrandConfig {
  return BRAND_CONFIG[brand];
}

// ─── DOMAIN-SCOPED ACCESS ─────────────────────────────────────────────────────
// Beta access codes are scoped to one or more of these canonical hostnames.
// A code is only valid on a domain listed in its `allowed_domains` column.
// This is the single source of truth referenced by the verify route, the
// admin UI, and the SQL migration.

export const ACCESS_DOMAINS = [
  "healthtransformationreview.org",
  "healthtransformationreview.com",
  "healthtransformationsolutions.org",
  "healthtransformationsolutions.com",
] as const;

export type AccessDomain = (typeof ACCESS_DOMAINS)[number];

/**
 * Normalize a raw request Host header to a canonical hostname:
 *   - lowercase
 *   - strip port (":3000")
 *   - strip a leading "www."
 * Returns the bare hostname, e.g. "healthtransformationreview.org".
 */
export function normalizeHost(host: string | null | undefined): string {
  if (!host) return "";
  return host
    .toLowerCase()
    .trim()
    .split(":")[0]
    .replace(/^www\./, "");
}

/** True if the normalized host is one of the four production access domains. */
export function isAccessDomain(host: string): host is AccessDomain {
  return (ACCESS_DOMAINS as readonly string[]).includes(host);
}
