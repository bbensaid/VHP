// ─── BRAND VARIANTS ───────────────────────────────────────────────────────────
// The platform serves four domains from a single deployment:
//   healthtransformationsolutions.org / .com  → "solutions" (full functionality)
//   healthtransformationreview.org    / .com  → "review"    (reduced: no advisory)
//
// 99% of the app is identical across domains. The only differences are the logo
// wordmark, the display name, and whether the "Future Advisory Services" section
// is shown. Everything flows from a single brand value resolved per request from
// the Host header.

export type Brand = "solutions" | "review";

export interface BrandConfig {
  /** Wordmark shown under the logo and used in the display name. */
  logoWord: string;
  /** Full brand name for <title>, metadata, footer copyright. */
  displayName: string;
  /** Whether the "Future Advisory Services" nav section is available. */
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
