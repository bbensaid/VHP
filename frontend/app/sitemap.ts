import { MetadataRoute } from "next";

const APP_URL = process.env.NEXT_PUBLIC_APP_URL ?? "https://htr.vercel.app";

// Static routes with their change frequency and priority
const staticRoutes: { path: string; priority: number; changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"] }[] = [
  // Core
  { path: "/",                    priority: 1.0, changeFrequency: "daily" },
  { path: "/mission",             priority: 0.8, changeFrequency: "monthly" },
  { path: "/values",              priority: 0.7, changeFrequency: "monthly" },
  { path: "/about",               priority: 0.8, changeFrequency: "monthly" },
  { path: "/about/framework",     priority: 0.7, changeFrequency: "monthly" },
  { path: "/about/methodology",   priority: 0.7, changeFrequency: "monthly" },
  { path: "/faq",                 priority: 0.6, changeFrequency: "monthly" },

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

  // Academy
  { path: "/academy",             priority: 0.9, changeFrequency: "weekly" },
  { path: "/academy/tracks",      priority: 0.8, changeFrequency: "weekly" },
  { path: "/academy/courses",     priority: 0.8, changeFrequency: "weekly" },
  { path: "/academy/webinars",    priority: 0.8, changeFrequency: "weekly" },
  { path: "/academy/case-studies",priority: 0.7, changeFrequency: "weekly" },
  { path: "/academy/glossary",    priority: 0.7, changeFrequency: "monthly" },
  { path: "/academy/faculty",     priority: 0.6, changeFrequency: "monthly" },

  // Advisory & tools
  { path: "/advisory",            priority: 0.8, changeFrequency: "monthly" },
  { path: "/advisory-hub",        priority: 0.8, changeFrequency: "monthly" },
  { path: "/advisory/reports",    priority: 0.7, changeFrequency: "weekly" },
  { path: "/advisory/research",   priority: 0.7, changeFrequency: "weekly" },
  { path: "/advisory/consulting", priority: 0.7, changeFrequency: "monthly" },
  { path: "/advisory/contact",    priority: 0.7, changeFrequency: "monthly" },
  { path: "/hti-dashboard",       priority: 0.8, changeFrequency: "weekly" },
  { path: "/trending-topics",     priority: 0.8, changeFrequency: "daily" },
  { path: "/multimedia",          priority: 0.7, changeFrequency: "weekly" },
  { path: "/search",              priority: 0.6, changeFrequency: "weekly" },

  // Federal programs & states
  { path: "/dashboard",           priority: 0.8, changeFrequency: "weekly" },
  { path: "/ahead-model",         priority: 0.8, changeFrequency: "monthly" },
  { path: "/states",              priority: 0.8, changeFrequency: "monthly" },
  { path: "/vermont-act-167",     priority: 0.8, changeFrequency: "monthly" },
  { path: "/california-calaim",   priority: 0.8, changeFrequency: "monthly" },

  // Pricing & conversion
  { path: "/pricing",             priority: 0.9, changeFrequency: "monthly" },

  // Legal
  { path: "/privacy",             priority: 0.4, changeFrequency: "yearly" },
  { path: "/terms",               priority: 0.4, changeFrequency: "yearly" },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  return staticRoutes.map(({ path, priority, changeFrequency }) => ({
    url: `${APP_URL}${path}`,
    lastModified: now,
    changeFrequency,
    priority,
  }));
}
