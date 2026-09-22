import { defineConfig, devices } from "@playwright/test";

/**
 * Smoke-test configuration. Hits the top 10 routes against a local Next.js
 * server, asserts each renders without crashing, and verifies the expected
 * H1 / page title. The beta cookie is set globally so the beta gate in
 * app/layout.tsx doesn't render the gate page for every request.
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
// Derive the beta-cookie host from the target URL so runs against a preview
// or production URL are gated correctly, not silently shown the gate page.
// (Mirrors normalizeHost in lib/brand.ts: URL.hostname already excludes the port.)
const BASE_URL = process.env.PLAYWRIGHT_BASE_URL ?? "http://localhost:3000";
const BASE_HOST = new URL(BASE_URL).hostname.replace(/^www\./, "");

export default defineConfig({
  testDir: "./e2e",
  // 60s, not 30s, because the suite is normally run against `next dev`, which
  // compiles each route on first request. Under a parallel run the heavy client
  // pages (/book, /book/listen, /htr-simulator) contend for that single dev
  // server and a cold compile alone can pass 30s. Every test passes in a few
  // seconds once warm, so this is headroom for the server, not slow assertions.
  timeout: 60_000,
  expect: { timeout: 5_000 },
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  reporter: process.env.CI ? "github" : "list",

  use: {
    baseURL: BASE_URL,
    trace: "on-first-retry",
    // The platform is beta-gated; ship the cookie with every test so we
    // don't get the gate page. app/layout.tsx only honors the domain-scoped
    // format "granted:<host>" (host per lib/brand.ts normalizeHost — port
    // stripped). A bare "granted" is treated as a legacy cookie and
    // re-prompts at the gate.
    extraHTTPHeaders: {},
    storageState: {
      cookies: [
        {
          name: "htr_beta",
          value: `granted:${BASE_HOST}`,
          domain: BASE_HOST,
          path: "/",
          httpOnly: false,
          secure: false,
          sameSite: "Lax",
          expires: -1,
        },
      ],
      // There is a SECOND gate after the beta cookie: components/WelcomeRedirect.tsx
      // client-side redirects any first-time visitor to /welcome unless
      // localStorage holds "htr-user-role". Without it a test lands on the
      // persona picker instead of the page under test, and whether it survives is
      // a race between the assertion and a useEffect — which is why some specs
      // passed and some failed on the same run. "all" is the value the page's own
      // "Skip — Show Me Everything" button writes, i.e. no personalization.
      origins: [
        {
          origin: BASE_URL,
          localStorage: [{ name: "htr-user-role", value: "all" }],
        },
      ],
    },
  },

  projects: [
    { name: "chromium", use: { ...devices["Desktop Chrome"] } },
  ],

  // CI sets PLAYWRIGHT_BASE_URL; locally we expect `npm run dev` to be
  // running in another terminal. If neither is true the tests will fail
  // fast with a connection error — that's the correct behavior.
});
