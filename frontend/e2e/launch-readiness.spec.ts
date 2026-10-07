import { test, expect } from "@playwright/test";
import { BRAND_CONFIG, resolveBrand, ACCESS_DOMAINS, normalizeHost } from "../lib/brand";

/**
 * Launch-readiness checks: robots.txt, sitemap.xml, per-page metadata and
 * security headers. Requests go through `page.request`, which shares the
 * browser context's cookies — including the `htr_beta=granted:<host>` cookie
 * that playwright.config.ts pre-sets — so the beta gate in proxy.ts does not
 * redirect /robots.txt and /sitemap.xml to /beta.
 */

const BASE_URL = process.env.PLAYWRIGHT_BASE_URL ?? "http://localhost:3000";
const HOST = new URL(BASE_URL).hostname;
const BRAND_NAME = BRAND_CONFIG[resolveBrand(HOST)].displayName;
const IS_PRODUCTION_HOST = (ACCESS_DOMAINS as readonly string[]).includes(normalizeHost(HOST));

test.describe("robots.txt", () => {
  test("is served, names a sitemap on the same host, and blocks private paths", async ({ page }) => {
    const res = await page.request.get("/robots.txt", { maxRedirects: 0 });
    expect(res.status()).toBe(200);
    const body = await res.text();
    expect(body).toMatch(/User-Agent: \*/i);
    expect(body).toMatch(new RegExp(`Sitemap: https?://${HOST.replace(/\./g, "\\.")}(:\\d+)?/sitemap\\.xml`));
    if (IS_PRODUCTION_HOST) {
      for (const p of ["/api/", "/admin", "/account", "/beta"]) {
        expect(body).toContain(`Disallow: ${p}`);
      }
    } else {
      // Previews and localhost must never be indexed.
      expect(body).toMatch(/Disallow: \/\s*$/m);
    }
  });
});

test.describe("sitemap.xml", () => {
  test("lists the key public routes on the requesting host and omits gated ones", async ({ page }) => {
    const res = await page.request.get("/sitemap.xml", { maxRedirects: 0 });
    expect(res.status()).toBe(200);
    const xml = await res.text();
    const locs = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => new URL(m[1]));
    expect(locs.length).toBeGreaterThan(50);

    // Every URL is rooted at the host under test (brand-consistent).
    for (const u of locs) expect(u.hostname).toBe(HOST);

    const paths = new Set(locs.map((u) => u.pathname));
    for (const p of ["/", "/book", "/briefings", "/academy", "/academy/tracks", "/research-lab", "/vermont-act-167", "/vermont-medicaid", "/privacy"]) {
      expect(paths, `sitemap should list ${p}`).toContain(p);
    }
    expect([...paths].some((p) => p.startsWith("/briefings/"))).toBe(true);
    expect([...paths].some((p) => p.startsWith("/read/"))).toBe(true);

    for (const p of ["/dashboard", "/hti-dashboard", "/chat", "/admin", "/account", "/beta", "/search", "/academy/courses"]) {
      expect(paths, `sitemap must not list ${p}`).not.toContain(p);
    }
  });
});

test.describe("page metadata", () => {
  const PAGES = ["/", "/book", "/briefings", "/academy", "/research-lab", "/vermont-act-167", "/faq", "/htr-simulator", "/pricing"];

  for (const path of PAGES) {
    test(`${path} has a title, description and Open Graph site name`, async ({ page }) => {
      // Metadata is in the server-rendered <head>; no need to wait for every asset.
      await page.goto(path, { waitUntil: "domcontentloaded" });
      const title = await page.title();
      expect(title.trim().length).toBeGreaterThan(0);
      const description = await page.locator('meta[name="description"]').first().getAttribute("content");
      expect(description?.trim().length ?? 0).toBeGreaterThan(20);
      const siteName = await page.locator('meta[property="og:site_name"]').first().getAttribute("content");
      expect(siteName).toBe(BRAND_NAME);
    });
  }

  test("client-page layouts carry the brand in the title", async ({ page }) => {
    await page.goto("/faq");
    expect(await page.title()).toBe(`Frequently Asked Questions | ${BRAND_NAME}`);
  });

  test("auth pages are noindex", async ({ page }) => {
    await page.goto("/login");
    const robots = await page.locator('meta[name="robots"]').first().getAttribute("content");
    expect(robots).toMatch(/noindex/);
  });
});

test.describe("security headers", () => {
  test("baseline headers and CSP are present", async ({ page }) => {
    const res = await page.request.get("/");
    const h = res.headers();
    expect(h["x-content-type-options"]).toBe("nosniff");
    expect(h["x-frame-options"]).toBe("SAMEORIGIN");
    expect(h["referrer-policy"]).toBe("strict-origin-when-cross-origin");
    expect(h["permissions-policy"]).toContain("camera=()");
    const csp = h["content-security-policy"] ?? "";
    expect(csp).toContain("default-src 'self'");
    // Book narration audio is served from Supabase Storage (lib/narration.ts).
    expect(csp).toMatch(/media-src [^;]*https:\/\/\*\.supabase\.co/);
  });
});

test.describe("error pages", () => {
  test("an unknown route returns the branded 404", async ({ page }) => {
    const res = await page.goto("/this-route-does-not-exist-launch-check");
    expect(res?.status()).toBe(404);
    await expect(page.getByRole("heading", { name: "Page not found" })).toBeVisible();
  });
});
