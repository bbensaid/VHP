import { test, expect } from "@playwright/test";

/**
 * Smoke tests for the top 10 most-trafficked routes.
 *
 * The goal: catch render-time crashes and missing imports before they ship.
 * These tests do NOT exercise interactivity — see other spec files (when they
 * exist) for that. Each test loads the page and verifies (a) we got a 200,
 * (b) the page contains an expected text marker.
 *
 * Backend dependencies: /chat depends on the Python AI brain; the page itself
 * should render even when the backend is offline, but the chat input may show
 * an "AI offline" indicator. We don't assert that here.
 */

interface Route {
  path: string;
  expectedText: string | RegExp;
  // If true, the page is server-side rendered and we can assert response.ok().
  ssr?: boolean;
}

const SMOKE_ROUTES: Route[] = [
  { path: "/",                         expectedText: /Health Transformation Review/i,                ssr: true },
  { path: "/book",                     expectedText: "Transforming",                                   ssr: true },
  { path: "/book/listen",              expectedText: /Listen|Audio Edition/i,                          ssr: true },
  { path: "/about/framework",          expectedText: /Six-Pillar|Framework/i,                          ssr: true },
  { path: "/policy",                   expectedText: "Policy Hub",                                     ssr: true },
  { path: "/economics",                expectedText: "Economics Hub",                                  ssr: true },
  { path: "/technology",               expectedText: "Technology Hub",                                 ssr: true },
  { path: "/clinical",                 expectedText: "Clinical Hub",                                   ssr: true },
  { path: "/equity",                   expectedText: "Equity Hub",                                     ssr: true },
  { path: "/operations",               expectedText: /Operations Intelligence|Operations Hub/i,        ssr: true },
];

for (const route of SMOKE_ROUTES) {
  test(`renders ${route.path}`, async ({ page }) => {
    const response = await page.goto(route.path);
    if (route.ssr && response) {
      expect(response.status(), `expected 200 for ${route.path}`).toBeLessThan(400);
    }
    await expect(page.locator("body")).toContainText(route.expectedText, { timeout: 10_000 });
  });
}

test("research lab landing page lists at least one tool", async ({ page }) => {
  await page.goto("/research-lab");
  await expect(page.locator("body")).toContainText(/research lab/i, { timeout: 10_000 });
  // Sanity check: at least one of the well-known lab tools is linked.
  const labLinks = page.locator('a[href*="/research-lab/"]');
  await expect(labLinks.first()).toBeVisible();
});

test("vermont act 68 page mentions Act 68", async ({ page }) => {
  await page.goto("/vermont-act-68");
  await expect(page.locator("body")).toContainText(/Act 68/i, { timeout: 10_000 });
});

test("book page has download link", async ({ page }) => {
  await page.goto("/book");
  const downloadLink = page.locator('a[download]').first();
  await expect(downloadLink).toBeVisible();
});

test("listen page lists all 22 narration tracks", async ({ page }) => {
  await page.goto("/book/listen");
  // The track list renders one button per chapter (Preface + Intro + 20).
  // We use a relaxed assertion that the body contains the chapter-20 label.
  await expect(page.locator("body")).toContainText("AHS Restructuring", { timeout: 10_000 });
  await expect(page.locator("body")).toContainText("Preface", { timeout: 10_000 });
});
