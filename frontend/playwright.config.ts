import { defineConfig, devices } from "@playwright/test";

/**
 * Smoke-test configuration. Hits the top 10 routes against a local Next.js
 * server, asserts each renders without crashing, and verifies the expected
 * H1 / page title. The beta cookie is set globally so middleware doesn't
 * redirect every request to /beta.
 *
 * Run locally:
 *     npx playwright install --with-deps chromium   # first time only
 *     npm run dev                                   # in a separate terminal
 *     npx playwright test                           # or: npm run test:e2e
 *
 * Run in CI:
 *     The GitHub Action installs Playwright + Chromium, builds the app,
 *     starts the server, and runs the suite.
 */
export default defineConfig({
  testDir: "./e2e",
  timeout: 30_000,
  expect: { timeout: 5_000 },
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  reporter: process.env.CI ? "github" : "list",

  use: {
    baseURL: process.env.PLAYWRIGHT_BASE_URL ?? "http://localhost:3000",
    trace: "on-first-retry",
    // The platform is beta-gated; ship the cookie with every test so we
    // don't bounce to /beta. The HTR backend code reads `htr_beta=granted`
    // (see middleware.ts).
    extraHTTPHeaders: {},
    storageState: {
      cookies: [
        {
          name: "htr_beta",
          value: "granted",
          domain: "localhost",
          path: "/",
          httpOnly: false,
          secure: false,
          sameSite: "Lax",
          expires: -1,
        },
      ],
      origins: [],
    },
  },

  projects: [
    { name: "chromium", use: { ...devices["Desktop Chrome"] } },
  ],

  // CI sets PLAYWRIGHT_BASE_URL; locally we expect `npm run dev` to be
  // running in another terminal. If neither is true the tests will fail
  // fast with a connection error — that's the correct behavior.
});
