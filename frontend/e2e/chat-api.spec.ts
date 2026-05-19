import { test, expect } from "@playwright/test";

/**
 * Chat API contract test. Hits POST /api/chat with a minimal payload and
 * verifies:
 *   - we get a streaming text response (not JSON, not 4xx)
 *   - the proxy handler validates the request body
 *
 * If the Python AI backend is offline, the proxy returns 503 with a JSON
 * body and a helpful "Cannot reach the AI backend" message. We assert that
 * graceful-degradation path here.
 */

test("chat API rejects invalid request body with 400", async ({ request }) => {
  const res = await request.post("/api/chat", {
    data: { not: "a valid chat request" },
    headers: { "Content-Type": "application/json" },
  });
  expect(res.status()).toBe(400);
  const body = await res.json();
  expect(body.error).toBeTruthy();
});

test("chat API rejects empty message with 400", async ({ request }) => {
  const res = await request.post("/api/chat", {
    data: { message: "" },
    headers: { "Content-Type": "application/json" },
  });
  expect(res.status()).toBe(400);
});

test("chat API accepts valid request (200 or 503 if backend down)", async ({ request }) => {
  const res = await request.post("/api/chat", {
    data: { message: "Hello, smoke test." },
    headers: { "Content-Type": "application/json" },
  });
  // Acceptable outcomes:
  //   200 — backend up, response streaming
  //   503 — backend down, proxy returned the friendly "cannot reach" body
  expect([200, 503]).toContain(res.status());
  if (res.status() === 503) {
    const body = await res.json();
    expect(body.error).toMatch(/backend|reach/i);
  }
});

test("health API reports backend status", async ({ request }) => {
  const res = await request.get("/api/health");
  expect(res.status()).toBe(200);
  const body = await res.json();
  expect(body).toHaveProperty("ok");
  expect(body).toHaveProperty("indexReady");
});
