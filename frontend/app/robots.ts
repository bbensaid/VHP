import type { MetadataRoute } from "next";
import { headers } from "next/headers";
import { ACCESS_DOMAINS, normalizeHost } from "@/lib/brand";

// Host-aware, like app/sitemap.ts: each production domain points crawlers at
// its own sitemap, so every brand stays self-consistent. Any other host
// (Vercel preview deployments, localhost) is disallowed entirely so preview
// URLs never compete with the production domains in search results.
//
// NOTE: while the beta gate is on, proxy.ts redirects /robots.txt and
// /sitemap.xml to /beta like any other page (it exempts only /beta, /api/ and
// /studio). That is deliberate access policy and is not changed here.

const PRIVATE_PATHS = [
  "/api/",
  "/admin",
  "/account",
  "/onboarding",
  "/beta",
  "/studio",
  "/saved",
  "/setup",
  "/tester",
  "/verify/",
  "/login",
  "/signup",
  "/forgot-password",
  "/reset-password",
  "/upgrade",
  "/welcome",
  "/auth/",
  "/chat",
  "/dashboard",
  "/hti-dashboard",
  "/advisory-hub",
  "/connect-hub",
  "/search",
];

export default async function robots(): Promise<MetadataRoute.Robots> {
  const h = await headers();
  const rawHost = h.get("host");
  const proto = h.get("x-forwarded-proto") ?? "https";
  const host = normalizeHost(rawHost);
  const isProduction = (ACCESS_DOMAINS as readonly string[]).includes(host);
  const baseUrl = rawHost ? `${proto}://${rawHost}` : "https://healthtransformationreview.org";

  if (!isProduction) {
    return {
      rules: [{ userAgent: "*", disallow: "/" }],
      sitemap: `${baseUrl}/sitemap.xml`,
    };
  }

  return {
    rules: [{ userAgent: "*", allow: "/", disallow: PRIVATE_PATHS }],
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  };
}
