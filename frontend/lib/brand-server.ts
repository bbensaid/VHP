// ─── SERVER-SIDE BRAND GUARDS ────────────────────────────────────────────────
// Nav surfaces (Header, HomeSidebar, Footer, sitemap) hide Advisory Services on
// the "review" brand, but hiding links is not access control: the routes were
// still reachable by direct URL on healthtransformationreview.org/.com.
// These guards enforce the brand at the route level.

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
