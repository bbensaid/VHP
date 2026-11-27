/**
 * Real-email journeys: signup confirmation and password reset, end to end.
 *
 * Unlike signed-in.spec.ts (which mints sessions without email), this drives the
 * real forms, so Supabase really sends the email. The link inside the email has
 * to be read from an inbox, so the flow runs one STEP at a time and the link is
 * passed back in:
 *
 *   EMAIL_FLOW_STATE=<json file> EMAIL_FLOW_STEP=signup   npx playwright test e2e/email-flows.spec.ts
 *     -> read the "Confirm your signup" email, then
 *   EMAIL_FLOW_LINK=<link> EMAIL_FLOW_STEP=confirm ...
 *   EMAIL_FLOW_STEP=login ...
 *   EMAIL_FLOW_STEP=forgot ...
 *     -> read the "Reset your password" email, then
 *   EMAIL_FLOW_LINK=<link> EMAIL_FLOW_STEP=reset ...
 *   EMAIL_FLOW_STEP=cleanup ...      (deletes the test account)
 *
 * The state file holds the test address and passwords between steps. Use a
 * plus-address of an inbox you can read (name+htr-<n>@gmail.com): it is a new
 * account to Supabase but lands in that inbox.
 */
import { test, expect, type Page } from "@playwright/test";
import { createClient } from "@supabase/supabase-js";
import fs from "fs";

const env: Record<string, string> = Object.fromEntries(
  fs.readFileSync(".env.local", "utf8").split("\n")
    .filter((l) => l.includes("=") && !l.startsWith("#"))
    .map((l) => { const i = l.indexOf("="); return [l.slice(0, i).trim(), l.slice(i + 1).trim().replace(/^"|"$/g, "")]; })
);
const admin = createClient(env.NEXT_PUBLIC_SUPABASE_URL, env.SUPABASE_SERVICE_ROLE_KEY, { auth: { persistSession: false } });

const STEP = process.env.EMAIL_FLOW_STEP ?? "";
const STATE_FILE = process.env.EMAIL_FLOW_STATE ?? "";
const LINK = process.env.EMAIL_FLOW_LINK ?? "";
type State = { email: string; password: string; newPassword: string };
const load = (): State => JSON.parse(fs.readFileSync(STATE_FILE, "utf8"));

test.skip(!STEP || !STATE_FILE, "EMAIL_FLOW_STEP and EMAIL_FLOW_STATE are required");
test.describe.configure({ mode: "serial" });

async function userByEmail(email: string) {
  for (let p = 1; p < 20; p++) {
    const { data } = await admin.auth.admin.listUsers({ page: p, perPage: 200 });
    const u = data.users.find((x) => x.email === email);
    if (u || data.users.length < 200) return u;
  }
}

async function passGate(page: Page) {
  const host = new URL(process.env.PLAYWRIGHT_BASE_URL ?? "http://localhost:3000").hostname.replace(/^www\./, "");
  const { data } = await admin.from("beta_access_codes").select("code,allowed_domains").eq("is_active", true);
  const code = (data ?? []).find((c) => !c.allowed_domains?.length || c.allowed_domains.includes(host))?.code;
  await page.goto("/beta");
  await page.getByPlaceholder(/Name_X/).fill(code!);
  await page.getByRole("button", { name: /Enter Platform/ }).click();
  await page.waitForURL((u) => !u.pathname.startsWith("/beta"), { timeout: 20_000 });
}

/** The submit button of the form that contains `field` (the header has its own search form). */
const submitOf = (page: Page, field: string) =>
  page.locator("form", { has: page.locator(field) }).locator("button[type=submit]");

async function freshPage(browser: import("@playwright/test").Browser, baseURL: string) {
  const ctx = await browser.newContext({ baseURL, storageState: undefined });
  await ctx.clearCookies();
  await ctx.addInitScript(() => { try { localStorage.setItem("htr-user-role", "all"); } catch {} });
  return { ctx, page: await ctx.newPage() };
}

async function expectSignedInAs(page: Page, email: string) {
  await page.goto("/account", { waitUntil: "load" });
  await page.waitForTimeout(2000);
  expect(new URL(page.url()).pathname, `not signed in: landed on ${page.url()}`).toBe("/account");
  await expect(page.locator("body")).toContainText(email);
}

test("signup form sends a confirmation email", async ({ browser, baseURL }) => {
  test.skip(STEP !== "signup");
  const s = load();
  const { ctx, page } = await freshPage(browser, baseURL!);
  await passGate(page);
  await page.goto("/signup");
  await page.locator("#signup-name").fill("HTR Email Test");
  await page.locator("#signup-email").fill(s.email);
  await page.locator("#signup-password").fill(s.password);
  await submitOf(page, "#signup-email").click();
  await expect(page.getByText("Check your email")).toBeVisible({ timeout: 20_000 });
  const u = await userByEmail(s.email);
  expect(u, "account not created").toBeTruthy();
  expect(u!.email_confirmed_at, "should not be confirmed before the link is clicked").toBeFalsy();
  expect(u!.confirmation_sent_at, "Supabase did not record sending the email").toBeTruthy();
  await ctx.close();
});

test("confirmation link (opened in a new browser, no access code) signs you in", async ({ browser, baseURL }) => {
  test.skip(STEP !== "confirm");
  const s = load();
  expect(LINK).toMatch(/^https:\/\//);
  const { ctx, page } = await freshPage(browser, baseURL!);
  await page.goto(LINK, { waitUntil: "load" });
  await page.waitForTimeout(4000);
  const landed = new URL(page.url());
  expect(landed.pathname, `confirmation link landed on ${page.url()}`).not.toMatch(/^\/(beta|login)/);
  expect(landed.hostname, "confirmation link must land on the site, not localhost").not.toMatch(/localhost/);
  const u = await userByEmail(s.email);
  expect(u!.email_confirmed_at, "email not confirmed").toBeTruthy();
  await expectSignedInAs(page, s.email);
  await ctx.close();
});

test("log in with email + password on the real form", async ({ browser, baseURL }) => {
  test.skip(STEP !== "login");
  const s = load();
  const { ctx, page } = await freshPage(browser, baseURL!);
  await passGate(page);
  await page.goto("/login");
  await page.locator("#login-email").fill(s.email);
  await page.locator("#login-password").fill(s.password);
  await submitOf(page, "#login-email").click();
  await page.waitForURL((u) => !u.pathname.startsWith("/login"), { timeout: 20_000 });
  await expectSignedInAs(page, s.email);
  await ctx.close();
});

test("forgot-password form sends a reset email", async ({ browser, baseURL }) => {
  test.skip(STEP !== "forgot");
  const s = load();
  const { ctx, page } = await freshPage(browser, baseURL!);
  await passGate(page);
  await page.goto("/forgot-password");
  await page.locator("main input[type=email], form input[type=email]").first().fill(s.email);
  await submitOf(page, "input[type=email]").click();
  await page.waitForTimeout(3000);
  await expect(page.locator("body")).not.toContainText(/error|rate limit/i);
  const u = await userByEmail(s.email);
  expect(u!.recovery_sent_at, "Supabase did not record sending the reset email").toBeTruthy();
  await ctx.close();
});

test("reset link (new browser, no access code) sets a new password that works", async ({ browser, baseURL }) => {
  test.skip(STEP !== "reset");
  const s = load();
  expect(LINK).toMatch(/^https:\/\//);
  const { ctx, page } = await freshPage(browser, baseURL!);
  await page.goto(LINK, { waitUntil: "load" });
  await page.waitForTimeout(4000);
  expect(new URL(page.url()).pathname, `reset link landed on ${page.url()}`).toBe("/reset-password");
  const pw = page.locator("input[type=password]");
  await pw.nth(0).fill(s.newPassword);
  await pw.nth(1).fill(s.newPassword);
  await submitOf(page, "input[type=password]").click();
  await page.waitForTimeout(4000);
  await expect(page.locator("body")).not.toContainText(/expired or was opened in a different browser|Auth session missing/);
  await ctx.close();

  // The new password works on the real login form; the old one does not.
  const b = await freshPage(browser, baseURL!);
  await passGate(b.page);
  await b.page.goto("/login");
  await b.page.locator("#login-email").fill(s.email);
  await b.page.locator("#login-password").fill(s.password);
  await submitOf(b.page, "#login-email").click();
  await b.page.waitForTimeout(4000);
  expect(new URL(b.page.url()).pathname, "old password must no longer work").toBe("/login");
  await b.page.locator("#login-password").fill(s.newPassword);
  await submitOf(b.page, "#login-email").click();
  await b.page.waitForURL((u) => !u.pathname.startsWith("/login"), { timeout: 20_000 });
  await expectSignedInAs(b.page, s.email);
  await b.ctx.close();
});

test("cleanup: delete the test account", async () => {
  test.skip(STEP !== "cleanup");
  const s = load();
  const u = await userByEmail(s.email);
  if (!u) return;
  await admin.from("course_player_enrollments").delete().eq("user_id", u.id);
  const { error } = await admin.auth.admin.deleteUser(u.id);
  expect(error).toBeNull();
  expect(await userByEmail(s.email)).toBeFalsy();
});
