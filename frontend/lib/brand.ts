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

// ─── CONTACT ──────────────────────────────────────────────────────────────────
// Every public email address is contact@<the domain the visitor is on>
// (author's decision, 2026-11-15). All four domains deliver to the same Google
// Workspace mailbox (healthtransformationreview.org, with the other three as
// alias domains). Hosts that are not one of the four (preview deploys, local)
// use the primary domain. /advisory/contact is the Advisory engagement form,
// not a contact page.
export const PRIMARY_DOMAIN = "healthtransformationreview.org";

/** Mailbox the platform itself writes to (tester reports, admin notices). */
export const ADMIN_EMAIL = `contact@${PRIMARY_DOMAIN}`;

/** Placeholder for module-level link lists; swapped for the visitor's
 *  contact address at render time (components know the domain, modules don't). */
export const CONTACT_LINK = "mailto:__contact__";

/** The public contact address for a request host. */
export function contactEmailFor(host: string | null | undefined): string {
  const h = normalizeHost(host);
  return `contact@${isAccessDomain(h) ? h : PRIMARY_DOMAIN}`;
}

/** True for any path inside the Advisory section, which the Review brand blocks. */
export function isAdvisoryPath(href: string): boolean {
  return /^\/(advisory|advisory-hub|connect|connect-hub|community)(\/|$|\?|#)/.test(href);
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
