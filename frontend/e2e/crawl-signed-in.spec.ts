/**
 * Every sitemap page (+ the 50 state dashboards), opened in a real browser as a
 * signed-in admin after passing the real beta gate. Fails with the full list of
 * pages that returned >= 400, showed error text, or threw an uncaught error
 * (including React hydration errors #418/#423/#425).
 *
 *   PLAYWRIGHT_BASE_URL=https://healthtransformationreview.org \
 *   HTR_ADMIN_EMAIL=<admin email> npx playwright test e2e/crawl-signed-in.spec.ts --project=chromium
 */
import { test, expect, type Page } from "@playwright/test";
import { createClient } from "@supabase/supabase-js";
import { createServerClient } from "@supabase/ssr";
import fs from "fs";

const env: Record<string, string> = Object.fromEntries(
  fs.readFileSync(".env.local", "utf8").split("\n")
    .filter((l) => l.includes("=") && !l.startsWith("#"))
    .map((l) => { const i = l.indexOf("="); return [l.slice(0, i).trim(), l.slice(i + 1).trim().replace(/^"|"$/g, "")]; })
);
const admin = createClient(env.NEXT_PUBLIC_SUPABASE_URL, env.SUPABASE_SERVICE_ROLE_KEY, { auth: { persistSession: false } });
const ADMIN_EMAIL = process.env.HTR_ADMIN_EMAIL ?? "";
const BAD_TEXT = /could not find the|(relation|column|function) \S+ does not exist|schema cache|Application error|Internal Server Error|Something went wrong|Unhandled Runtime Error|NaN%|undefined%|\[object Object\]/i;

async function sessionCookies(email: string, baseURL: string) {
  const { data, error } = await admin.auth.admin.generateLink({ type: "magiclink", email });
  if (error) throw error;
  const jar: { name: string; value: string }[] = [];
  const sb = createServerClient(env.NEXT_PUBLIC_SUPABASE_URL, env.NEXT_PUBLIC_SUPABASE_ANON_KEY, {
    cookies: { getAll: () => jar, setAll: (c) => c.forEach(({ name, value }) => {
      const i = jar.findIndex((x) => x.name === name); if (i >= 0) jar.splice(i, 1); if (value) jar.push({ name, value });
    }) },
  });
  const v = await sb.auth.verifyOtp({ token_hash: data.properties.hashed_token, type: "magiclink" });
  if (v.error) throw v.error;
  const domain = new URL(baseURL).hostname;
  return jar.map((c) => ({ ...c, domain, path: "/", secure: baseURL.startsWith("https"), sameSite: "Lax" as const }));
}

test("crawl every page signed in", async ({ browser, baseURL, request }) => {
  test.skip(!ADMIN_EMAIL, "HTR_ADMIN_EMAIL not set");
  test.setTimeout(45 * 60_000);
  const host = new URL(baseURL!).hostname.replace(/^www\./, "");
  const xml = await (await request.get("/sitemap.xml")).text();
  const paths = new Set([...xml.matchAll(/<loc>https?:\/\/[^/]+([^<]*)<\/loc>/g)].map((m) => m[1] || "/"));
  const ind = JSON.parse(fs.readFileSync("lib/data/state-indicators.json", "utf8")).states as Record<string, { name: string }>;
  for (const s of Object.values(ind)) paths.add(`/dashboard/${s.name.toLowerCase().replace(/ /g, "-")}`);

  const ctx = await browser.newContext({ baseURL, storageState: undefined });
  await ctx.clearCookies();
  await ctx.addInitScript(() => { try { localStorage.setItem("htr-user-role", "all"); } catch {} });
  const gate = await ctx.newPage();
  const { data: codes } = await admin.from("beta_access_codes").select("code,allowed_domains").eq("is_active", true);
  const code = (codes ?? []).find((c) => !c.allowed_domains?.length || c.allowed_domains.includes(host))!.code;
  await gate.goto("/beta");
  await gate.getByPlaceholder(/Name_X/).fill(code);
  await gate.getByRole("button", { name: /Enter Platform/ }).click();
  await gate.waitForURL((u) => !u.pathname.startsWith("/beta"), { timeout: 20_000 });
  await gate.close();
  await ctx.addCookies(await sessionCookies(ADMIN_EMAIL, baseURL!));

  const failures: string[] = [];
  const queue = [...paths].sort();
  async function worker(page: Page) {
    for (let p = queue.shift(); p; p = queue.shift()) {
      const errs: string[] = [];
      const onErr = (e: Error) => errs.push(e.message.slice(0, 160));
      page.on("pageerror", onErr);
      try {
        const res = await page.goto(p, { waitUntil: "load", timeout: 45_000 });
        await page.waitForTimeout(2500);
        const status = res?.status() ?? 0;
        const landed = new URL(page.url()).pathname;
        const body = await page.locator("body").innerText().catch(() => "");
        const bad = body.match(BAD_TEXT)?.[0];
        if (status >= 400) failures.push(`${p} → HTTP ${status}`);
        else if (/^\/(beta|login|upgrade)$/.test(landed) && landed !== p) failures.push(`${p} → bounced to ${landed}`);
        if (bad) failures.push(`${p} → shows "${bad}"`);
        for (const e of errs) failures.push(`${p} → uncaught: ${e}`);
      } catch (e) {
        failures.push(`${p} → ${(e as Error).message.split("\n")[0]}`);
      } finally {
        page.off("pageerror", onErr);
      }
    }
  }
  const pages = await Promise.all(Array.from({ length: 4 }, () => ctx.newPage()));
  await Promise.all(pages.map(worker));
  await ctx.close();
  console.log(`crawled ${paths.size} pages, ${failures.length} problems`);
  fs.writeFileSync("test-results/crawl-failures.txt", failures.join("\n"));
  expect(failures, failures.join("\n")).toEqual([]);
});
