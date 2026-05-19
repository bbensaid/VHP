# Playwright Smoke Tests

End-to-end smoke tests for the HTR platform. They catch render-time crashes, missing imports, and broken routes before they ship. They do **not** exercise interactivity in depth — that's for follow-up specs.

## What's covered

- **smoke.spec.ts** — Top 10 routes render with the expected H1 text. Catches the "I broke a pillar page and forgot to test it" failure mode.
- **chat-api.spec.ts** — `/api/chat` contract: rejects invalid bodies, accepts valid ones, gracefully reports backend-down state. `/api/health` returns the expected shape.

## First-time setup

```bash
# Install Playwright + the Chromium browser (~150 MB). One-time.
npm run test:e2e:install

# Add @playwright/test as a dev dependency (not yet in package.json)
npm install --save-dev @playwright/test
```

The `@playwright/test` package is deliberately **not** in `package.json` by default — it's a 200+MB install and most contributors don't need it on every clone. Add it on demand or via the CI workflow.

## Running locally

```bash
# Terminal 1
npm run dev

# Terminal 2
npm run test:e2e
```

Override the base URL when testing against a different environment:

```bash
PLAYWRIGHT_BASE_URL=https://preview-xyz.vercel.app npm run test:e2e
```

## How the beta gate is handled

The platform is gated behind a `htr_beta=granted` cookie set by [/beta](../app/beta/page.tsx). [`playwright.config.ts`](../playwright.config.ts) pre-sets this cookie via `storageState` so every test bypasses the gate.

If the beta gate is removed at GA, the cookie just becomes a no-op — no test change required.

## Adding a new test

Drop a `*.spec.ts` file in this directory. Playwright auto-discovers it.

```ts
import { test, expect } from "@playwright/test";

test("my new page renders", async ({ page }) => {
  await page.goto("/my-new-page");
  await expect(page.locator("body")).toContainText("Expected text");
});
```

## Known gaps

- No visual-regression / screenshot diffing yet.
- No mobile viewport coverage — desktop Chrome only.
- No tests for the AI Analyst conversational flow (the backend dependency makes this fragile in CI).
