import { test, expect } from "@playwright/test";

/**
 * Content integrity — guards the 2026-11-23 partner-readiness audit.
 *
 * Each assertion pins a fix for content that was invented or false: pages for
 * features that never existed, fabricated credentials, claims of accreditation,
 * and invented figures. If one of these fails, something removed for being untrue
 * has come back. Fix the content; do not loosen the test.
 */

test.describe("retired pages for features that do not exist redirect", () => {
  for (const [from, to] of [
    ["/htr-index", "/about/methodology"],
    ["/developers", "/about/methodology"],
    ["/survey", "/briefings"],
    ["/dashboard/vermont/hospitals/nvrh", "/dashboard/vermont/hospitals"],
  ] as const) {
    test(`${from} -> ${to}`, async ({ page }) => {
      await page.goto(from);
      await expect(page).toHaveURL(new RegExp(`${to.replace(/\//g, "\\/")}$`));
    });
  }
});

test("FAQ makes no accreditation, index or credential claims", async ({ page }) => {
  await page.goto("/faq");
  const body = page.locator("#main-content");
  await expect(page.getByText("Who can use the platform today?")).toBeVisible();
  await expect(body).not.toContainText(/CME\/CNE|ACHE Qualified|expert witness|Performance Index/i);
});

test("About page has no placeholder team with invented credentials", async ({ page }) => {
  await page.goto("/about");
  await expect(page.getByText(/sequence — sourced/i)).toBeVisible();
  await expect(page.locator("body")).not.toContainText(/Former CMS policy advisor|Analyst #1|HFMA national faculty/);
});

test("Evidence Library rows cite their source", async ({ page }) => {
  await page.goto("/research-lab/knowledge-workspace?tab=evidence");
  await expect(page.getByText("Published evaluation", { exact: false }).first()).toBeVisible({ timeout: 15_000 });
  // 25 studies, each with a Source link
  await expect(page.getByRole("link", { name: /Source ↗/ })).toHaveCount(25);
});

test("Act 68 Explorer shows statutory provisions, not invented savings", async ({ page }) => {
  await page.goto("/vermont-act-68/simulator");
  await expect(page.getByRole("heading", { name: "Vermont Act 68 Explorer" })).toBeVisible();
  await expect(page.getByText("Health Care Delivery Advisory Committee")).toBeVisible();
  await expect(page.locator("body")).not.toContainText(/Annual Savings|Net Impact|RBP Readiness/);
});

test("pricing makes no CME claim", async ({ page }) => {
  await page.goto("/pricing");
  await expect(page.locator("body")).not.toContainText(/CME/);
});
