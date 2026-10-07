// ─── SERVER-SIDE BRAND GUARDS ────────────────────────────────────────────────
// Nav surfaces (Header, HomeSidebar, Footer, sitemap) hide Advisory Services on
// the "review" brand, but hiding links is not access control: the routes were
// still reachable by direct URL on healthtransformationreview.org/.com.
// These guards enforce the brand at the route level.

import type { Metadata } from "next";
import { headers } from "next/headers";
import { notFound } from "next/navigation";
import { getBrandConfig, resolveBrand, type Brand } from "./brand";

/** Resolve the brand for the current request from the Host header. */
export async function currentBrand(): Promise<Brand> {
  return resolveBrand((await headers()).get("host"));
}

/**
 * 404 the request when the current brand does not offer Advisory Services.
 * Used by the layouts of /advisory, /advisory-hub, /connect, /connect-hub,
 * and /community — the sections filtered from nav on the review brand.
 */
export async function requireAdvisoryBrand(): Promise<void> {
  const brand = await currentBrand();
  if (!getBrandConfig(brand).showAdvisory) notFound();
}

/**
 * Page metadata titled for the current brand ("<title> | <brand display name>"),
 * so a page reads correctly on both the .review and .solutions domains.
 * Used by route layouts whose page is a client component (which cannot export
 * metadata itself). Pass `noIndex` for auth/account/utility pages.
 */
export async function brandedMetadata(
  title: string,
  description: string,
  opts: { noIndex?: boolean } = {}
): Promise<Metadata> {
  const { displayName } = getBrandConfig(await currentBrand());
  return {
    title: `${title} | ${displayName}`,
    description,
    ...(opts.noIndex ? { robots: { index: false, follow: false } } : {}),
  };
}
