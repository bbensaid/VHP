// Ad-hoc screenshot helper (not part of the app):
//   node scripts/_shot.cjs <url> <out.png> [--full] [clickText...]
// Sets the same beta cookie + persona localStorage the e2e config uses.
const { chromium } = require("@playwright/test");
(async () => {
  const args = process.argv.slice(2);
  const full = args.includes("--full");
  const atIdx = args.indexOf("--at");
  const at = atIdx >= 0 ? args[atIdx + 1] : null;
  const [url, out, ...clicks] = args.filter((a, i) => a !== "--full" && i !== atIdx && i !== atIdx + 1);
  const u = new URL(url);
  const host = u.hostname.replace(/^www\./, "");
  const b = await chromium.launch();
  const ctx = await b.newContext({
    viewport: { width: 1400, height: 1000 },
    storageState: {
      cookies: [{ name: "htr_beta", value: `granted:${host}`, domain: host === "localhost" ? host : `.${host}`, path: "/", httpOnly: false, secure: false, sameSite: "Lax", expires: -1 }],
      origins: [{ origin: u.origin, localStorage: [{ name: "htr-user-role", value: "all" }] }],
    },
  });
  const p = await ctx.newPage();
  await p.goto(url, { waitUntil: "networkidle", timeout: 240000 });
  for (const c of clicks) {
    await p.getByText(c, { exact: false }).first().click();
    await p.waitForTimeout(1000);
  }
  if (at) { await p.getByText(at, { exact: false }).first().scrollIntoViewIfNeeded(); await p.waitForTimeout(500); }
  await p.screenshot({ path: out, fullPage: full });
  await b.close();
})();
