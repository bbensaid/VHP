import { test, expect } from "@playwright/test";

// The RHT Program review pages are generated from state and CMS documents
// (lib/data/rht-review/*.json). These checks pin the figures that must match
// those documents, so a data rebuild that drifts from the sources fails here.

test("RHT review index lists all 50 states", async ({ page }) => {
  await page.goto("/rht-review");
  await expect(page.locator("h1")).toContainText("Rural Health Transformation Program");
  await expect(page.locator('[data-testid="rht-states-table"] a[href^="/rht-review/"]')).toHaveCount(50);
});

test("RHT dashboard: findings, national uses and all four comparison views render", async ({ page }) => {
  await page.goto("/rht-review");
  await expect(page.locator("#findings li")).toHaveCount(6);
  await expect(page.locator("#uses")).toContainText("Workforce");
  for (const tab of ["Spending fingerprints", "What states planned", "Policy commitments", "Pace vs. Year 2"]) {
    await expect(async () => {
      await page.getByRole("tab", { name: tab }).click();
      await expect(page.getByRole("tab", { name: tab })).toHaveAttribute("aria-selected", "true", { timeout: 1000 });
    }).toPass({ timeout: 30000 });
  }
  await expect(page.locator("#compare svg[role=img]")).toBeVisible(); // pace scatter
});

test("published award lists: national comparison and source-checked state figures", async ({ page }) => {
  await page.goto("/rht-review");
  const nat = page.locator('[data-testid="rht-recipients-national"] tbody tr');
  await expect(nat).toHaveCount(7);
  await expect(page.locator('[data-testid="rht-recipients-national"]')).toContainText("Mississippi");
  // Mississippi's 167 awards sum to the announced $104,115,146.80; Oregon's file reports 103 Catalyst projects.
  await page.goto("/rht-review/mississippi");
  await expect(page.locator("#recipients")).toContainText("$104,115,146.80");
  await page.goto("/rht-review/oregon");
  await expect(page.locator("#recipients")).toContainText("103");
  await expect(page.locator("#recipients")).toContainText("Catalyst Awards only");
});

test("Iowa page repairs CMS's malformed amount from the itemized lines", async ({ page }) => {
  await page.goto("/rht-review/iowa");
  await expect(page.locator("body")).toContainText("5,4967,800.72");
  await expect(page.locator("body")).toContainText("$5,467,800.72");
});

test("Vermont Year 1 review shows the state's agreement total and the CMS figures", async ({ page }) => {
  await page.goto("/rht-review/vermont");
  const body = page.locator("body");
  await expect(body).toContainText("$182,154,948.14"); // state list total (Oct 30, 2026 update)
  await expect(body).toContainText("$189,996,036"); // CMS FY2027 award
  await expect(body).toContainText("$28,369,910.31"); // CMS put to work, Jul 31, 2026
  await expect(body).toContainText("No Progress"); // CMS snapshot: SNAP waiver commitment
});

test("a non-Vermont state review renders from CMS data", async ({ page }) => {
  await page.goto("/rht-review/iowa");
  await expect(page.locator("body")).toContainText("$216,007,657"); // CMS FY2027 award, Iowa
});
