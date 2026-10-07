import { MetadataRoute } from "next";
import { headers } from "next/headers";
import { resolveBrand } from "@/lib/brand";
import { BRIEFINGS } from "@/lib/briefings/briefings";
import { getAllTracks } from "@/lib/narration";
import { db } from "@/lib/db/client";

const FALLBACK_URL = process.env.NEXT_PUBLIC_APP_URL ?? "https://htr.vercel.app";

// Static routes with their change frequency and priority.
// `advisoryOnly` paths are excluded from the sitemap on the "review" brand,
// where the advisory section does not exist.
const staticRoutes: { path: string; priority: number; changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"]; advisoryOnly?: boolean }[] = [
  // Core
  { path: "/",                    priority: 1.0, changeFrequency: "daily" },
  { path: "/mission",             priority: 0.8, changeFrequency: "monthly" },
  { path: "/values",              priority: 0.7, changeFrequency: "monthly" },
  { path: "/about",               priority: 0.8, changeFrequency: "monthly" },
  { path: "/about/framework",     priority: 0.7, changeFrequency: "monthly" },
  { path: "/about/methodology",   priority: 0.7, changeFrequency: "monthly" },
  { path: "/faq",                 priority: 0.6, changeFrequency: "monthly" },

  // The 2026 pillar briefings (homepage hero), in execution order
  // (individual /briefings/<slug> pages are derived from BRIEFINGS below)
  { path: "/briefings",                               priority: 0.9, changeFrequency: "monthly" },

  // The book: landing page, audio edition, and one /read/<slug> page per chapter
  // (derived from lib/narration below)
  { path: "/book",                priority: 0.9, changeFrequency: "monthly" },
  { path: "/book/listen",         priority: 0.7, changeFrequency: "monthly" },
  // Pillars
  { path: "/policy",              priority: 0.9, changeFrequency: "weekly" },
  { path: "/policy/feasibility",  priority: 0.7, changeFrequency: "weekly" },
  { path: "/policy/global",       priority: 0.7, changeFrequency: "weekly" },
  { path: "/policy/mandates",     priority: 0.7, changeFrequency: "weekly" },
  { path: "/policy/regulation",   priority: 0.7, changeFrequency: "weekly" },
  { path: "/economics",           priority: 0.9, changeFrequency: "weekly" },
  { path: "/economics/cea",       priority: 0.7, changeFrequency: "weekly" },
  { path: "/economics/investment",priority: 0.7, changeFrequency: "weekly" },
  { path: "/economics/market",    priority: 0.7, changeFrequency: "weekly" },
  { path: "/economics/value",     priority: 0.7, changeFrequency: "weekly" },
  { path: "/technology",          priority: 0.9, changeFrequency: "weekly" },
  { path: "/technology/ai",       priority: 0.7, changeFrequency: "weekly" },
  { path: "/technology/digital",  priority: 0.7, changeFrequency: "weekly" },
  { path: "/technology/security", priority: 0.7, changeFrequency: "weekly" },
  { path: "/technology/workflow", priority: 0.7, changeFrequency: "weekly" },
  { path: "/clinical",            priority: 0.9, changeFrequency: "weekly" },
  { path: "/clinical/genomics",   priority: 0.7, changeFrequency: "weekly" },
  { path: "/clinical/hah",        priority: 0.7, changeFrequency: "weekly" },
  { path: "/clinical/population", priority: 0.7, changeFrequency: "weekly" },
  { path: "/clinical/precision",  priority: 0.7, changeFrequency: "weekly" },
  { path: "/clinical/virtual",    priority: 0.7, changeFrequency: "weekly" },
  { path: "/equity",              priority: 0.9, changeFrequency: "weekly" },
  { path: "/equity/access",       priority: 0.7, changeFrequency: "weekly" },
  { path: "/equity/bias",         priority: 0.7, changeFrequency: "weekly" },
  { path: "/equity/sdoh",         priority: 0.7, changeFrequency: "weekly" },
  { path: "/operations",                 priority: 0.9, changeFrequency: "weekly" },
  { path: "/operations/compliance",      priority: 0.7, changeFrequency: "weekly" },
  { path: "/operations/payer-network",   priority: 0.7, changeFrequency: "weekly" },
  { path: "/operations/revenue-cycle",   priority: 0.7, changeFrequency: "weekly" },
  { path: "/operations/supply-chain",    priority: 0.7, changeFrequency: "weekly" },
  { path: "/operations/workforce",       priority: 0.7, changeFrequency: "weekly" },

  // Academy
  { path: "/academy",             priority: 0.9, changeFrequency: "weekly" },
  // Course catalogue. /academy/courses is NOT listed: it re-exports this page
  // (duplicate content). Individual /academy/tracks/<courseSlug> pages are
  // added below from Supabase (published courses only).
  { path: "/academy/tracks",      priority: 0.8, changeFrequency: "weekly" },
  { path: "/academy/getting-started", priority: 0.7, changeFrequency: "monthly" },
  { path: "/academy/personalized-learning", priority: 0.6, changeFrequency: "monthly" },
  { path: "/academy/webinars",    priority: 0.8, changeFrequency: "weekly" },
  { path: "/academy/case-studies",priority: 0.7, changeFrequency: "weekly" },
  { path: "/academy/glossary",    priority: 0.7, changeFrequency: "monthly" },
  { path: "/academy/faculty",     priority: 0.6, changeFrequency: "monthly" },

  // Advisory & tools
  { path: "/advisory",            priority: 0.8, changeFrequency: "monthly", advisoryOnly: true },
  { path: "/connect",             priority: 0.8, changeFrequency: "monthly", advisoryOnly: true },
  { path: "/advisory/research",   priority: 0.7, changeFrequency: "weekly",  advisoryOnly: true },
  { path: "/advisory/consulting", priority: 0.7, changeFrequency: "monthly", advisoryOnly: true },
  { path: "/advisory/contact",    priority: 0.7, changeFrequency: "monthly", advisoryOnly: true },
  { path: "/community",           priority: 0.6, changeFrequency: "weekly",  advisoryOnly: true },
  // /dashboard, /hti-dashboard and /chat are role-gated in proxy.ts (subscriber)
  // and /search is a results page — none belong in the index.
  { path: "/trending-topics",     priority: 0.8, changeFrequency: "daily" },
  { path: "/the-wire",            priority: 0.7, changeFrequency: "daily" },
  { path: "/multimedia",          priority: 0.7, changeFrequency: "weekly" },
  { path: "/library",             priority: 0.7, changeFrequency: "weekly" },
  { path: "/investment-tracker",  priority: 0.7, changeFrequency: "weekly" },

  // Research Lab + framework tools
  { path: "/research-lab",                    priority: 0.9, changeFrequency: "weekly" },
  { path: "/htr-index",                       priority: 0.8, changeFrequency: "weekly" },
  { path: "/htr-simulator",                   priority: 0.8, changeFrequency: "monthly" },
  { path: "/impact-simulation",               priority: 0.7, changeFrequency: "monthly" },
  { path: "/transformation-friction-index",   priority: 0.7, changeFrequency: "monthly" },
  { path: "/medicaid-eligibility-simulator",  priority: 0.7, changeFrequency: "monthly" },
  { path: "/bed-capacity",                    priority: 0.6, changeFrequency: "weekly" },

  // Federal programs & states
  { path: "/ahead-model",         priority: 0.8, changeFrequency: "monthly" },
  { path: "/states",              priority: 0.8, changeFrequency: "monthly" },
  { path: "/compare-states",      priority: 0.7, changeFrequency: "monthly" },
  { path: "/california-calaim",   priority: 0.8, changeFrequency: "monthly" },
  { path: "/oregon-cco",          priority: 0.7, changeFrequency: "monthly" },

  // Vermont
  { path: "/vermont-act-167",                 priority: 0.8, changeFrequency: "monthly" },
  { path: "/vermont-act-167/simulator",       priority: 0.7, changeFrequency: "monthly" },
  { path: "/vermont-act-51",                  priority: 0.7, changeFrequency: "monthly" },
  { path: "/vermont-act-68",                  priority: 0.7, changeFrequency: "monthly" },
  { path: "/vermont-blueprint",               priority: 0.7, changeFrequency: "monthly" },
  { path: "/vermont-designated-agencies",     priority: 0.7, changeFrequency: "monthly" },
  { path: "/vermont-legislative-resources",   priority: 0.7, changeFrequency: "monthly" },
  { path: "/vermont-medicaid",                priority: 0.7, changeFrequency: "monthly" },
  { path: "/vermont-rht-program",             priority: 0.7, changeFrequency: "monthly" },
  { path: "/vermont-sash",                    priority: 0.7, changeFrequency: "monthly" },
  { path: "/vermont-sdoh",                    priority: 0.7, changeFrequency: "monthly" },
  { path: "/vermont-uhds",                    priority: 0.7, changeFrequency: "monthly" },
  { path: "/vermont-vcci",                    priority: 0.7, changeFrequency: "monthly" },

  // Pricing & conversion
  { path: "/pricing",             priority: 0.9, changeFrequency: "monthly" },

  // Site info & legal
  { path: "/site-map",            priority: 0.4, changeFrequency: "monthly" },
  { path: "/changelog",           priority: 0.4, changeFrequency: "weekly" },
  { path: "/developers",          priority: 0.4, changeFrequency: "monthly" },
  { path: "/privacy",             priority: 0.4, changeFrequency: "yearly" },
  { path: "/terms",               priority: 0.4, changeFrequency: "yearly" },
  { path: "/disclaimer",          priority: 0.4, changeFrequency: "yearly" },
  { path: "/billing-policy",      priority: 0.4, changeFrequency: "yearly" },
];

/** Published Academy course slugs (course row published; the player also
 *  requires published tracks, which every published course has as of 2026-10-07). */
async function publishedCourseSlugs(): Promise<string[]> {
  try {
    const { data, error } = await db.from("courses").select("slug").eq("is_published", true);
    if (error || !data) return [];
    return data.map((c: { slug: string }) => c.slug);
  } catch {
    return [];
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();

  // Each domain serves a sitemap rooted at its own host, so search engines see
  // self-consistent canonical URLs per brand instead of cross-domain links.
  const host = (await headers()).get("host");
  const proto = (await headers()).get("x-forwarded-proto") ?? "https";
  const baseUrl = host ? `${proto}://${host}` : FALLBACK_URL;

  const brand = resolveBrand(host);

  const dynamicRoutes: typeof staticRoutes = [
    ...BRIEFINGS.map((b) => ({ path: `/briefings/${b.slug}`, priority: 0.8, changeFrequency: "monthly" as const })),
    ...getAllTracks().map((t) => ({ path: `/read/${t.slug}`, priority: 0.7, changeFrequency: "monthly" as const })),
    ...(await publishedCourseSlugs()).map((slug) => ({ path: `/academy/tracks/${slug}`, priority: 0.7, changeFrequency: "weekly" as const })),
  ];

  return [...staticRoutes, ...dynamicRoutes]
    .filter((r) => brand !== "review" || !r.advisoryOnly)
    .map(({ path, priority, changeFrequency }) => ({
      url: `${baseUrl}${path}`,
      lastModified: now,
      changeFrequency,
      priority,
    }));
}
