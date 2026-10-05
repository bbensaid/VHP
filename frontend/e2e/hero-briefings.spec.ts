import { test, expect } from "@playwright/test";
import { BRIEFINGS } from "../lib/briefings/briefings";
import { getTool } from "../lib/taxonomy/tools";
import { getPillar } from "../lib/taxonomy/pillars";

/**
 * The homepage hero and the 2026 briefings (revamp of 2026-10-04).
 *
 * A route returning 200 is not a delivered promise: every link the hero offers
 * is followed and the destination is checked for what the slide said it holds.
 */
test.describe.configure({ timeout: 240_000 });

test("hero shows the five pillars in the book's execution sequence", async ({ page }) => {
  await page.goto("/", { waitUntil: "domcontentloaded" });
  const hero = page.locator('section[aria-roledescription="carousel"]');
  await expect(hero).toBeVisible();
  const steps = hero.getByRole("list", { name: "Execution sequence" }).getByRole("button");
  await expect(steps).toHaveCount(5);
  for (const [i, b] of BRIEFINGS.entries()) {
    const slide = hero.locator('[aria-roledescription="slide"]').nth(i);
    await expect(slide).toHaveAttribute("aria-label", `${i + 1} of 5: ${getPillar(b.pillar).label}`);
    // The carousel is a client component: retry until hydration makes the click live.
    await expect(async () => {
      await steps.nth(i).click();
      await expect(slide.getByRole("heading", { level: 2 })).toHaveText(b.headline, { timeout: 2_000 });
    }).toPass({ timeout: 60_000 });
    // Every figure on the slide carries a source number.
    await expect(slide.locator("dd sup a")).toHaveCount(b.facts.reduce((n, f) => n + new Set(f.cite).size, 0));
  }
});

for (const b of BRIEFINGS) {
  test(`slide links deliver what they promise: ${b.pillar}`, async ({ page }) => {
    // Briefing page renders its headline and a numbered source for every citation.
    await page.goto(`/briefings/${b.slug}`, { waitUntil: "domcontentloaded" });
    await expect(page.getByRole("heading", { level: 1 })).toHaveText(b.headline);
    const anchors = await page.locator("article sup a").evaluateAll((els) => [...new Set(els.map((e) => e.getAttribute("href")))]);
    for (const href of anchors) await expect(page.locator(href!)).toHaveCount(1);

    // Book chapter anchor exists on /book.
    await page.goto(`/book`, { waitUntil: "domcontentloaded" });
    await expect(page.locator(`#chapter-${b.chapters[0]}`)).toHaveCount(1);

    // The course page names the course.
    const course = b.courses[0];
    await page.goto(`/academy/tracks/${course.slug}`, { waitUntil: "domcontentloaded" });
    await expect(page.getByText(course.title, { exact: false }).first()).toBeVisible({ timeout: 30_000 });

    // The tool route resolves (not a 404 page).
    // Heavy client benches: a cold dev-server compile can abort the first navigation.
    await expect(async () => {
      const res = await page.goto(getTool(b.tools[0]).href, { waitUntil: "domcontentloaded", timeout: 60_000 });
      expect(res?.status()).toBeLessThan(400);
    }).toPass({ timeout: 150_000 });
  });
}

test("the retired reports page sends readers to the briefings", async ({ page }) => {
  await page.goto("/advisory/reports", { waitUntil: "domcontentloaded" });
  await expect(page).toHaveURL(/\/briefings$/);
  await expect(page.getByRole("heading", { level: 1 })).toContainText("Five pillars");
});
