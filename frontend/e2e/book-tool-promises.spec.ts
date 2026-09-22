import { test, expect, type Page } from "@playwright/test";

/**
 * Companion to framework-tools.spec.ts, which covers Chapter 1's tools.
 *
 * These cover the tools built or extended in September 2026 to close gaps the
 * ecosystem audit found between what the book sends a reader to do and what the
 * tool actually did. Same rule as the other file: a route returning 200 is not a
 * delivered promise, so every test names the book sentence it enforces and then
 * asserts the reader can actually carry it out.
 */

// These are heavy client tools loaded with ssr:false; under a parallel dev-server
// run the first compile alone can approach the default budget.
test.describe.configure({ timeout: 90_000 });

/** Open the Risk Stratification Engine and switch to its Population tab. */
async function gotoPopulationSegmentation(page: Page) {
  await page.goto("/research-lab/interoperability?tab=risk", { waitUntil: "domcontentloaded" });
  // The component is dynamic(ssr:false), so retry until React has mounted and
  // the tab handler is live — clicking static markup would pass against nothing.
  await expect(async () => {
    await page.getByRole("button", { name: /^Population\b/ }).click({ timeout: 5_000 });
    await expect(
      page.getByRole("heading", { name: /Tier Reassignment Once Social Risk Is Included/i }),
    ).toBeVisible({ timeout: 2_000 });
  }).toPass({ timeout: 60_000 });
}

test.describe("risk stratification engine (/research-lab/interoperability?tab=risk)", () => {
  // Book Ch8 §8.9: "Run risk stratification on a live panel rather than reading
  // the methodology → How many patients change tier once social risk is included
  // alongside clinical risk."
  test("reports how many patients change tier once social risk is included", async ({ page }) => {
    await gotoPopulationSegmentation(page);

    const moved = page.getByTestId("sdoh-moved-total");
    await expect(moved).toBeVisible();
    const movedCount = Number((await moved.textContent())!.replace(/,/g, ""));
    expect(movedCount).toBeGreaterThan(0);

    // Social risk can only push patients upward, never down.
    const before = Number((await page.getByTestId("sdoh-high-before").textContent())!.replace(/,/g, ""));
    const after = Number((await page.getByTestId("sdoh-high-after").textContent())!.replace(/,/g, ""));
    expect(after).toBeGreaterThan(before);
  });

  // The invariant the tool discloses on screen: "Set every SDOH slider to 0 to
  // confirm this reproduces the clinical-only distribution exactly." A model that
  // fails this is adding risk out of nowhere.
  test("zero SDOH burden moves nobody", async ({ page }) => {
    await gotoPopulationSegmentation(page);

    for (const factor of ["Housing instability", "Food insecurity", "Transportation barriers"]) {
      await page.getByLabel(`${factor} prevalence`).fill("0");
    }

    await expect(page.getByText(/No SDOH burden entered — nobody changes tier/i)).toBeVisible();
  });

  // Book Ch9 §9.9: "Run risk stratification against a panel and compare tiers to
  // current care-management assignment → Patients in a high tier who are
  // receiving no care management --- the gap quality measures do not surface."
  test("names the high-tier patients receiving no care management", async ({ page }) => {
    await gotoPopulationSegmentation(page);

    const gap = page.getByTestId("cm-gap-after");
    await expect(gap).toBeVisible();
    const gapBefore = Number((await gap.textContent())!.replace(/,/g, ""));
    expect(gapBefore).toBeGreaterThan(0);

    // The half the chapter says quality measures miss: patients who are high-risk
    // once social risk counts, but sit on no registry that triggers outreach.
    const hidden = page.getByTestId("cm-gap-hidden");
    await expect(hidden).toBeVisible();
    expect(Number((await hidden.textContent())!.replace(/[+,]/g, ""))).toBeGreaterThan(0);

    // Enrolling the whole High tier must shrink the gap — proving the enrolment
    // inputs actually feed the number rather than sitting beside it.
    await page.getByLabel("High care management enrollment", { exact: true }).fill("100");
    await expect
      .poll(async () => Number((await gap.textContent())!.replace(/,/g, "")))
      .toBeLessThan(gapBefore);
  });
});

test.describe("HTI dashboard five-pillar view (/hti-dashboard)", () => {
  async function gotoPillars(page: Page) {
    await page.goto("/hti-dashboard", { waitUntil: "domcontentloaded" });
    await expect(async () => {
      await page.getByRole("button", { name: "Five-Pillar View" }).click({ timeout: 5_000 });
      await expect(page.getByRole("heading", { name: /Five-Pillar Status/i })).toBeVisible({
        timeout: 2_000,
      });
    }).toPass({ timeout: 60_000 });
  }

  // Book Ch13/15/16 cite this dashboard for "five-pillar status... over time",
  // including Ch16's specific Operations-pillar capacity claim. Before Sept 2026
  // it tracked six unrelated domains and no pillar appeared anywhere.
  test("shows all five pillars, with equity reported separately", async ({ page }) => {
    await gotoPillars(page);

    for (const pillar of ["policy", "technology", "economics", "clinical", "operations"]) {
      await expect(page.getByTestId(`pillar-row-${pillar}`)).toBeVisible();
    }
    // Equity is a test each pillar must pass, never a sixth scored axis.
    await expect(page.getByText(/never averaged into a pillar score/i)).toBeVisible();
  });

  // Regression guard for the contradiction found 2026-09-22: this tab derived
  // pillar scores from the HTI maturity domains and so showed Vermont's
  // Technology at 90, while /htr-simulator, the Friction Index and Chapter 1 all
  // put it at 45 and call it the binding constraint. Readiness must come from the
  // one sourced preset, so the two tools can never disagree again.
  test("pillar readiness matches the simulator's sourced Vermont preset", async ({ page }) => {
    await gotoPillars(page);

    const expected: Record<string, string> = {
      policy: "95",
      technology: "45",
      economics: "55",
      clinical: "65",
      operations: "50",
    };
    for (const [pillar, score] of Object.entries(expected)) {
      await expect(page.getByTestId(`pillar-readiness-${pillar}`)).toHaveText(score);
    }

    // And the tab must say why a rising trend is not an open gate.
    await expect(page.getByText(/A rising trend is not an open gate/i)).toBeVisible();
  });

  // The honesty constraint from lib/framework/pillar-mapping.ts: Policy is sourced
  // for Vermont only, and every other state must say so rather than show a guess.
  test("refuses to score Policy for states without sourced policy data", async ({ page }) => {
    await gotoPillars(page);
    await expect(page.getByText(/Policy is not yet scored/i)).toHaveCount(0); // Vermont: scored

    await page.locator("select").first().selectOption("massachusetts");
    await expect(page.getByText(/Policy is not yet scored for Massachusetts/i)).toBeVisible();
    // No pillar may show a borrowed number for a state with no sourced readiness.
    for (const pillar of ["policy", "technology", "economics", "clinical", "operations"]) {
      await expect(page.getByTestId(`pillar-readiness-${pillar}`)).toHaveText("—");
    }
  });
});

// Book Ch7 §7.9 / Ch15 §15.14 cite the Investment Tracker for capital "committed
// against each pillar" and "where funding runs ahead of dependency order".
// NOTE: the Sanity `investmentDeal` dataset is empty (0 docs as of 2026-09-22),
// so this asserts the check is present and states its own empty condition
// honestly. It does NOT assert a funded-ahead flag, because with no deals there
// is nothing to flag — that part of the promise is blocked on data, not code.
test("investment tracker carries a dependency-order check", async ({ page }) => {
  await page.goto("/investment-tracker", { waitUntil: "domcontentloaded" });
  await expect(
    page.getByRole("heading", { name: /Is this capital running ahead of its dependency order\?/i }),
  ).toBeVisible();
});
