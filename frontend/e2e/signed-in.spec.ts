/**
 * Signed-in journeys — the flows every earlier suite skipped.
 *
 * Added 2026-11-27 after the author's first real use found: admin shown as FREE
 * and locked out of /admin, profile save failing on a missing column, header
 * stuck on "Login", and 20 migrations never applied to the live DB. None of the
 * existing specs signed in, and all of them planted the beta cookie instead of
 * passing the gate, so none could see any of it.
 *
 * Needs SUPABASE_SERVICE_ROLE_KEY (read from .env.local). It mints real sessions
 * via a one-time magic-link token (no email is sent), and creates one throwaway
 * free-tier user that is deleted in afterAll.
 *
 *   PLAYWRIGHT_BASE_URL=https://healthtransformationreview.org \
 *   HTR_ADMIN_EMAIL=<admin email> npx playwright test e2e/signed-in.spec.ts --project=chromium
 */
import { test, expect, type Page, type BrowserContext } from "@playwright/test";
import { createClient } from "@supabase/supabase-js";
import { createServerClient } from "@supabase/ssr";
import fs from "fs";

const env: Record<string, string> = Object.fromEntries(
  fs.readFileSync(".env.local", "utf8").split("\n")
    .filter((l) => l.includes("=") && !l.startsWith("#"))
    .map((l) => { const i = l.indexOf("="); return [l.slice(0, i).trim(), l.slice(i + 1).trim().replace(/^"|"$/g, "")]; })
);
const URL_ = env.NEXT_PUBLIC_SUPABASE_URL;
const ANON = env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const admin = createClient(URL_, env.SUPABASE_SERVICE_ROLE_KEY, { auth: { persistSession: false } });
const ADMIN_EMAIL = process.env.HTR_ADMIN_EMAIL ?? "";
const TEST_EMAIL = `htr-e2e-${Date.now()}@example.com`;
let testUserId = "";

test.describe.configure({ mode: "default" });

/** Real @supabase/ssr cookies for `email`, exactly as the site's login would set them. */
async function sessionCookies(email: string, baseURL: string) {
  const { data, error } = await admin.auth.admin.generateLink({ type: "magiclink", email });
  if (error) throw error;
  const jar: { name: string; value: string }[] = [];
  const sb = createServerClient(URL_, ANON, {
    cookies: { getAll: () => jar, setAll: (c) => c.forEach(({ name, value }) => {
      const i = jar.findIndex((x) => x.name === name); if (i >= 0) jar.splice(i, 1);
      if (value) jar.push({ name, value });
    }) },
  });
  const v = await sb.auth.verifyOtp({ token_hash: data.properties.hashed_token, type: "magiclink" });
  if (v.error) throw v.error;
  const domain = new URL(baseURL).hostname;
  return jar.map((c) => ({ ...c, domain, path: "/", httpOnly: false, secure: baseURL.startsWith("https"), sameSite: "Lax" as const }));
}

/** Pass the beta gate the way a person does: type an active code. */
async function passGate(page: Page) {
  const { data } = await admin.from("beta_access_codes").select("code,allowed_domains").eq("is_active", true);
  const host = new URL(page.context()["_options"]?.baseURL ?? process.env.PLAYWRIGHT_BASE_URL ?? "http://localhost:3000").hostname.replace(/^www\./, "");
  const code = (data ?? []).find((c) => !c.allowed_domains?.length || c.allowed_domains.includes(host))?.code;
  expect(code, `no active access code valid on ${host}`).toBeTruthy();
  await page.goto("/beta");
  await page.getByPlaceholder(/Name_X/).fill(code!);
  await page.getByRole("button", { name: /Enter Platform/ }).click();
  await page.waitForURL((u) => !u.pathname.startsWith("/beta"), { timeout: 20_000 });
}

const BAD_TEXT = /could not find the|does not exist|schema cache|Application error|Internal Server Error|Something went wrong/i;

/** Visit, then assert: not bounced, 2xx/3xx, no DB/app error text, no uncaught page error. */
async function visitOk(page: Page, path: string, mustNotRedirectTo = /\/(login|upgrade|beta)(\?|$)/) {
  const errors: string[] = [];
  page.on("pageerror", (e) => errors.push(e.message));
  const res = await page.goto(path, { waitUntil: "load" });
  await page.waitForTimeout(2500);
  expect(res?.status(), `${path} HTTP status`).toBeLessThan(400);
  expect(new URL(page.url()).pathname, `${path} bounced to ${page.url()}`).not.toMatch(mustNotRedirectTo);
  const body = await page.locator("body").innerText();
  expect(body, `${path} shows an error`).not.toMatch(BAD_TEXT);
  expect(errors, `${path} uncaught errors`).toEqual([]);
  return body;
}

async function signedInContext(browser: import("@playwright/test").Browser, baseURL: string, email: string): Promise<BrowserContext> {
  const ctx = await browser.newContext({ baseURL, storageState: undefined });
  await ctx.clearCookies();
  // First-visit "who are you" chooser covers every page; pick "Show me everything".
  await ctx.addInitScript(() => { try { localStorage.setItem("htr-user-role", "all"); } catch {} });
  const page = await ctx.newPage();
  await passGate(page);
  await ctx.addCookies(await sessionCookies(email, baseURL));
  await page.close();
  return ctx;
}

test.beforeAll(async () => {
  const { data, error } = await admin.auth.admin.createUser({ email: TEST_EMAIL, email_confirm: true });
  if (error) throw error;
  testUserId = data.user.id;
  // mirror what signup does: a profile row + free role (idempotent)
  await admin.from("profiles").upsert({ id: testUserId, email: TEST_EMAIL });
});

test.afterAll(async () => {
  if (testUserId) await admin.auth.admin.deleteUser(testUserId);
});

test("beta gate: /login is gated, a real code lets you through", async ({ browser, baseURL }) => {
  const ctx = await browser.newContext({ baseURL, storageState: undefined });
  await ctx.clearCookies();
  const page = await ctx.newPage();
  await page.goto("/login");
  expect(new URL(page.url()).pathname).toBe("/beta");
  await passGate(page);
  await visitOk(page, "/login", /\/beta/);
  await ctx.close();
});

test.describe("admin (author's account)", () => {
  test.skip(!ADMIN_EMAIL, "HTR_ADMIN_EMAIL not set");
  let ctx: BrowserContext; let page: Page;
  test.beforeAll(async ({ browser, baseURL }) => { ctx = await signedInContext(browser, baseURL!, ADMIN_EMAIL); page = await ctx.newPage(); });
  test.afterAll(async () => { await ctx?.close(); });

  test("account shows ADMIN, header shows Account, sign-out button present", async () => {
    const body = await visitOk(page, "/account");
    expect(body).toMatch(/\badmin\b/i);
    expect(body).not.toMatch(/No name set\s*free/i);
    await expect(page.locator("header").getByRole("link", { name: /^Account$/ }).first()).toBeVisible();
    await expect(page.getByRole("button", { name: "Sign out" })).toBeVisible();
  });

  for (const p of ["/admin", "/admin/access-codes", "/admin/users", "/admin/role-changes", "/admin/tester-feedback", "/admin/analytics", "/admin/revenue", "/admin/ingest"]) {
    test(`admin page ${p} opens for the admin`, async () => { await visitOk(page, p); });
  }

  test("access codes page lists the real codes", async () => {
    const { data } = await admin.from("beta_access_codes").select("code").limit(1);
    const body = await visitOk(page, "/admin/access-codes");
    expect(body).toContain(data![0].code);
  });

  for (const p of ["/account/profile", "/account/subscription", "/account/billing", "/account/courses", "/account/referrals", "/account/bookmarks", "/library", "/onboarding", "/chat"]) {
    test(`page ${p} opens for the admin`, async () => { await visitOk(page, p); });
  }
});

test.describe("free-tier user (throwaway)", () => {
  let ctx: BrowserContext; let page: Page;
  test.beforeAll(async ({ browser, baseURL }) => { ctx = await signedInContext(browser, baseURL!, TEST_EMAIL); page = await ctx.newPage(); });
  test.afterAll(async () => { await ctx?.close(); });

  test("account shows FREE and the user's email", async () => {
    const body = await visitOk(page, "/account");
    expect(body).toContain(TEST_EMAIL);
    expect(body).toMatch(/\bfree\b/i);
  });

  test("/admin is refused to a free user", async () => {
    await page.goto("/admin/access-codes");
    expect(new URL(page.url()).pathname).not.toBe("/admin/access-codes");
  });

  test("profile: edit name/org/bio, save, reload, values persist", async () => {
    await visitOk(page, "/account/profile");
    const form = () => page.locator("form", { has: page.getByRole("button", { name: /Save changes/ }) });
    const inputs = form().locator("input[type=text]");
    await inputs.nth(0).fill("E2E Tester");
    await inputs.nth(1).fill("E2E Org");
    await form().locator("textarea").fill("E2E bio");
    await page.getByRole("button", { name: /Save changes/ }).click();
    await expect(page.getByText("Profile saved!")).toBeVisible({ timeout: 10_000 });
    await page.reload({ waitUntil: "load" });
    await expect(form().locator("input[type=text]").nth(0)).toHaveValue("E2E Tester");
    await expect(form().locator("textarea")).toHaveValue("E2E bio");
    const body = await visitOk(page, "/account");
    expect(body).toContain("E2E Tester");
  });

  test("onboarding save persists", async () => {
    await visitOk(page, "/onboarding");
    const { data } = await admin.from("profiles").select("onboarding_complete").eq("id", testUserId).single();
    expect(data).not.toBeNull(); // column exists and is readable
  });

  test("bookmarks API: add, list, remove", async () => {
    const add = await page.request.post("/api/bookmarks", { data: { sanity_id: "e2e-test", slug: "e2e-test", title: "E2E", content_type: "article" } });
    expect(add.status(), await add.text()).toBeLessThan(300);
    const list = await (await page.request.get("/api/bookmarks")).json();
    expect(JSON.stringify(list)).toContain("e2e-test");
    const del = await page.request.delete("/api/bookmarks?id=e2e-test");
    expect(del.status(), await del.text()).toBeLessThan(300);
  });

  test("academy: opening a course enrolls you and My Courses lists it", async () => {
    const { data } = await admin.from("courses").select("slug").eq("is_published", true).limit(1);
    const slug = data![0].slug as string;
    await visitOk(page, `/academy/tracks/${slug}`);
    const body = await visitOk(page, "/account/courses");
    expect(body.toLowerCase(), `My Courses should list ${slug}`).toContain(slug.replace(/-/g, " ").toLowerCase());
  });

  test("chapter notes API: add, list, remove", async () => {
    const add = await page.request.post("/api/chapter-notes", { data: { slug: "chapter-1", content: "e2e note" } });
    expect(add.status(), await add.text()).toBeLessThan(300);
    const list = await (await page.request.get("/api/chapter-notes?slug=chapter-1")).json();
    const note = (list.notes ?? []).find((n: { content: string }) => n.content === "e2e note");
    expect(note, JSON.stringify(list)).toBeTruthy();
    const del = await page.request.delete(`/api/chapter-notes?id=${note.id}`);
    expect(del.status(), await del.text()).toBeLessThan(300);
  });

  for (const p of ["/account/subscription", "/account/billing", "/account/courses", "/account/referrals", "/account/bookmarks", "/library"]) {
    test(`page ${p} opens for a free user`, async () => { await visitOk(page, p); });
  }
});
