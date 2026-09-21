import { test, expect, type Page } from "@playwright/test";

/**
 * The book's Chapter 1 sends readers to these tools to DO specific things.
 * These tests assert the tools actually do them — a page returning 200 is not a
 * delivered promise. Each test names the sentence it holds the platform to.
 */

/**
 * Load the simulator and wait until React has hydrated.
 *
 * Without this the assertions are worthless: the server-rendered markup already
 * shows the first preset's results, so a test can "pass" against static HTML
 * while every click goes nowhere. Clicking a DIFFERENT preset and waiting for
 * its blurb proves the handlers are live.
 */
// /htr-simulator is a large client page; under a parallel dev-server run,
// first paint plus hydration can exceed the suite's default 30s budget.
test.describe.configure({ timeout: 90_000 });

async function gotoSimulator(page: Page, preset = "Vermont, Fall 2026") {
  await page.goto("/htr-simulator", { waitUntil: "domcontentloaded" });
  // Retry the click until it takes: Playwright waits for the element to be
  // actionable, but not for React to hydrate, and this page is heavy.
  await expect(async () => {
    await page.getByRole("button", { name: preset }).click({ timeout: 5_000 });
    await expect(page.getByText(/Policy gate open \(Acts 167\/51\/68\)/)).toBeVisible({ timeout: 2_000 });
  }).toPass({ timeout: 60_000 });
}

test.describe("execution-sequence simulator (/htr-simulator)", () => {
  // Book §1.15 TRY THIS: "build a profile with strong Economics ambition but
  // weak Policy mandate and weak Technology substrate. The composite score
  // should collapse... Then fix the order: raise Policy and Technology first,
  // and watch the same Economics inputs finally produce a viable score."
  test("the OneCare profile collapses, and reordering rescues the same spending", async ({ page }) => {
    await gotoSimulator(page);

    await page.getByRole("button", { name: "OneCare Vermont (2013)" }).click();
    const delivered = page.getByTestId("delivered-composite");
    const economics = page.locator("#slider-economics");

    await expect(economics).toHaveValue("85");
    await expect(page.getByText(/cannot be delivered/i)).toBeVisible();
    const collapsed = Number(await delivered.textContent());
    expect(collapsed).toBeLessThan(50);

    await page.getByRole("button", { name: "The same ambition, in order" }).click();
    await expect(economics).toHaveValue("85"); // unchanged: only the upstream pillars moved
    const rescued = Number(await delivered.textContent());

    expect(rescued).toBeGreaterThan(collapsed + 20);
  });

  // Book §1.15: "Drop one pillar's score to zero and observe the cascade — the
  // simulator penalizes downstream readiness."
  test("dropping an upstream pillar to zero penalizes downstream readiness", async ({ page }) => {
    await gotoSimulator(page);
    const delivered = page.getByTestId("delivered-composite");
    const before = Number(await delivered.textContent());

    await page.locator("#slider-policy").fill("0");

    await expect
      .poll(async () => Number(await delivered.textContent()))
      .toBeLessThan(before);
    // Economics sits two hops downstream of Policy and must itself be gated.
    await expect(page.getByText(/lost behind/i).first()).toBeVisible();
  });

  // Book §1.3: the Equity Imperative is a test each pillar must pass, never a
  // sixth scored axis.
  test("the equity verdict is reported and never moves the score", async ({ page }) => {
    await gotoSimulator(page);

    const delivered = page.getByTestId("delivered-composite");
    const before = await delivered.textContent();
    await expect(page.getByText(/Fails the Equity Imperative/i)).toBeVisible();

    const equitySection = page.locator("section", { hasText: "The sixth question" }).last();
    const boxes = equitySection.getByRole("checkbox");
    await expect(boxes).toHaveCount(5);
    for (let i = 0; i < 5; i++) await boxes.nth(i).check();

    await expect(page.getByText(/Passes the Equity Imperative on all five pillars/i)).toBeVisible();
    expect(await delivered.textContent()).toBe(before); // equity is not averaged in
  });
});

// Book §1.15: "Identify your own 'Technology gate' bottleneck — the chapter's
// central Vermont vulnerability — before it becomes a financial one."
test("friction index names the binding constraint", async ({ page }) => {
  await page.goto("/transformation-friction-index", { waitUntil: "domcontentloaded" });
  const binding = page.getByTestId("friction-binding-constraint");
  await expect(binding).toBeVisible();
  await expect(binding).toContainText("Technology");
  await expect(page.getByText(/managed blind/i)).toBeVisible();
});

// Book §1.15: "The lag: a Technology gap shows up in Economics results a year
// later, which is why it is missed."
test("impact simulation shows the Technology gap reaching Economics a year later", async ({ page }) => {
  await page.goto("/impact-simulation", { waitUntil: "domcontentloaded" });

  const propagation = page.locator("section", { hasText: "Shortfall propagation over time" }).first();
  await expect(propagation).toBeVisible();
  await propagation.getByRole("button", { name: "Technology" }).click();

  const economicsRow = propagation.locator("li", { hasText: "Economics" }).first();
  await expect(economicsRow).toContainText("month 12");
  await expect(economicsRow).toContainText("Technology → Economics");
});
