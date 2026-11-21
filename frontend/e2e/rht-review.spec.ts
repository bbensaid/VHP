import { test, expect } from "@playwright/test";

// The RHT Program review pages are generated from state and CMS documents
// (lib/data/rht-review/*.json). These checks pin the figures that must match
// those documents, so a data rebuild that drifts from the sources fails here.

test("RHT review index lists all 50 states", async ({ page }) => {
  await page.goto("/rht-review");
  await expect(page.locator("h1")).toContainText("Rural Health Transformation Program");
  await expect(page.locator('table a[href^="/rht-review/"]')).toHaveCount(50);
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
