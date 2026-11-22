// Tests for lib/m4a (Single-Payer Modeler). Run: npm run test:m4a
// 1. Every hospital input matches the saved source text. 2. The engine's arithmetic and invariants.
const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const { VT_HOSPITALS, COMMERCIAL_PRICE_PRESETS } = require("../.engine-build/m4a/vermont-hospitals.js");
const M = require("../.engine-build/m4a/modeler.js");

const SRC = path.resolve(__dirname, "../../book-audit/deep/sources");
const staff = fs.readFileSync(path.join(SRC, "gmcb_fy27_staff_overview_2026-08.txt"), "utf8");
const cms = JSON.parse(fs.readFileSync(path.join(SRC, "m4a/cms_cost_report_2024_vt.json"), "utf8"));
const MARGIN_ROW = { cvmc: "CVMC", copley: "CH", gifford: "GMC", grace_cottage: "GCH", mt_ascutney: "MAHHC", north_country: "NCH", nvrh: "NVRH", nmc: "NMC", porter: "PMC", rutland: "RRMC", svmc: "SVMC", springfield: "SH", uvmmc: "UVMMC" };

test("14 hospitals, BMH the only one without expense/margin", () => {
  assert.equal(VT_HOSPITALS.length, 14);
  assert.deepEqual(VT_HOSPITALS.filter((h) => h.opExpense === null).map((h) => h.id), ["bmh"]);
});

test("FY27 submitted expense matches the staff overview expense table, row by row", () => {
  const block = staff.slice(staff.indexOf("Hospital Expense Growth"), staff.indexOf("System-Wide Total4"));
  for (const h of VT_HOSPITALS) {
    if (h.opExpense === null) continue;
    const line = block.split("\n").find((l) => l.replace(/^(.*?)\d*\s+-?[\d.]+%.*/, "$1").trim() === h.name);
    assert.ok(line, `${h.id}: no expense row for ${h.name}`);
    const last = line.trim().split(/\s+/).pop();
    assert.equal(last, "$" + h.opExpense.toLocaleString("en-US"), h.id);
  }
});

test("FY27 submitted margin is the 7th figure in each operating-margin row", () => {
  const block = staff.slice(staff.indexOf("FY27 vs. \nFY26 (∆)"), staff.indexOf("=== PAGE 32"));
  for (const [id, row] of Object.entries(MARGIN_ROW)) {
    const line = block.split("\n").find((l) => l.startsWith(row + " "));
    assert.ok(line, `no margin row for ${row}`);
    const nums = line.slice(row.length).trim().split(/\s+/).map((x) => parseFloat(x));
    const h = VT_HOSPITALS.find((x) => x.id === id);
    assert.equal(Math.round(h.opMargin * 1000) / 10, nums[6], `${id} margin`);
  }
});

test("uncompensated care matches the CMS 2024 cost report", () => {
  for (const h of VT_HOSPITALS) {
    const r = cms.find((x) => x["Provider CCN"] === h.ccn);
    assert.ok(r, `${h.ccn} not in CMS file`);
    assert.equal(h.uncompensatedCost, Number(r["Cost of Uncompensated Care"]), h.id);
    assert.equal(h.cah, h.ccn.startsWith("4713"), `${h.id} CAH flag`);
  }
});

test("price presets are the published figures", () => {
  assert.deepEqual(COMMERCIAL_PRICE_PRESETS.map((p) => p.pct), [283, 289, 453]);
});

test("rate = Medicare reprices commercial revenue by 100/R and leaves the rest unchanged", () => {
  const h = VT_HOSPITALS[0];
  const c = M.rateBasedChange(h, { commercialPct: 283, ratePct: 100, payUncompensated: false });
  assert.ok(Math.abs(c - (h.commercialNpr * 100 / 283 - h.commercialNpr)) < 1);
});

test("revenue-neutral rate gives zero statewide change", () => {
  for (const p of [283, 289, 453]) {
    const rate = M.revenueNeutralRatePct(p);
    const t = M.totals(M.runRateBased({ commercialPct: p, ratePct: rate, payUncompensated: false }));
    assert.ok(Math.abs(t.revenueChange) < 1, `R=${p}: ${t.revenueChange}`);
    assert.ok(rate > 100 && rate < p, `R=${p}: neutral rate ${rate}`);
  }
});

test("global budget sets every reported margin to zero and moves revenue by −margin × revenue", () => {
  for (const r of M.runGlobalBudget()) {
    if (r.marginBefore === null) { assert.ok(Number.isNaN(r.revenueChange)); continue; }
    assert.ok(Math.abs(r.marginAfter) < 1e-12, r.id);
    assert.ok(Math.abs(r.revenueChange + r.marginBefore * r.opRevenue) < 1, r.id);
  }
});

test("operating revenue = expense + p.25 income, and its margin rounds to the p.31 figure", () => {
  let inc = 0;
  for (const h of VT_HOSPITALS) {
    const rev = M.impliedOpRevenue(h);
    if (rev === null) continue;
    inc += h.opIncome;
    assert.equal(rev, h.opExpense + h.opIncome, h.id);
    assert.equal(Math.round(M.marginBeforeOf(h) * 1000) / 10, Math.round(h.opMargin * 1000) / 10, h.id);
  }
  assert.ok(Math.abs(inc / 1e6 - -44.74) < 0.02, `p.25 system total ${inc / 1e6}`);
  assert.equal(VT_HOSPITALS.find((h) => h.id === "uvmmc").opIncome, -42860000);
});

test("revenue-neutral with uncompensated care paid gives zero statewide change (default view)", () => {
  for (const p of [283, 289, 453]) {
    const rate = M.revenueNeutralRatePct(p, undefined, true);
    const t = M.totals(M.runRateBased({ commercialPct: p, ratePct: rate, payUncompensated: true }));
    assert.ok(Math.abs(t.revenueChange) < 1, `R=${p}: ${t.revenueChange}`);
  }
});

test("CAH-at-cost option zeroes every CAH margin and leaves PPS hospitals unchanged", () => {
  const base = M.runRateBased({ commercialPct: 283, ratePct: 100, payUncompensated: true });
  const cah = M.runRateBased({ commercialPct: 283, ratePct: 100, payUncompensated: true, cahAtCost: true });
  for (let i = 0; i < base.length; i++) {
    if (cah[i].cah) assert.ok(Math.abs(cah[i].marginAfter) < 1e-12, cah[i].id);
    else assert.equal(cah[i].revenueChange, base[i].revenueChange, cah[i].id);
  }
});

test("NPR inputs equal the GMCB press-release totals", () => {
  const sum = (k) => VT_HOSPITALS.reduce((s, h) => s + h[k], 0);
  assert.equal(sum("totalNpr"), 3802585620);
  assert.equal(sum("commercialNpr"), 1936889939);
});

const press = fs.readFileSync(path.join(SRC, "gmcb_fy27_press_2026-09-15.txt"), "utf8");
test("each hospital's NPR and commercial NPR appear on its own press-release row", () => {
  for (const h of VT_HOSPITALS) {
    const squash = (x) => x.replace(/\s+/g, "");
    const line = press.split("\n").find((l) => squash(l).startsWith(squash(h.name)) && /\d/.test(l));
    assert.ok(line, `${h.id}: no press row`);
    assert.ok(line.includes(h.totalNpr.toLocaleString("en-US")) && line.includes(h.commercialNpr.toLocaleString("en-US")), h.id);
  }
});

test("payer days, depreciation and uncompensated care match the CMS 2024 cost report", () => {
  for (const h of VT_HOSPITALS) {
    const r = cms.find((x) => x["Provider CCN"] === h.ccn);
    assert.equal(h.depreciation, Number(r["Depreciation Cost"]), h.id);
    assert.equal(h.medicareDays, Number(r["Total Days Title XVIII"]), h.id);
    assert.equal(h.medicaidDays, Number(r["Total Days Title XIX"]), h.id);
  }
});

test("Medicaid sensitivity: 100% reproduces the original model; lower values cut the neutral rate, still neutral", () => {
  const h = VT_HOSPITALS[3];
  const base = { commercialPct: 283, ratePct: 140, payUncompensated: false };
  const other = h.totalNpr - h.commercialNpr;
  assert.ok(Math.abs(M.rateBasedChange(h, { ...base, medicaidPctOfMedicare: 100 }) - (h.commercialNpr * 140 / 283 - h.commercialNpr + other * 0.4)) < 1);
  const n100 = M.revenueNeutralRatePct(283, undefined, true, 100), n70 = M.revenueNeutralRatePct(283, undefined, true, 70);
  assert.ok(n70 < n100, `${n70} < ${n100}`);
  const t = M.totals(M.runRateBased({ commercialPct: 283, ratePct: n70, payUncompensated: true, medicaidPctOfMedicare: 70 }));
  assert.ok(Math.abs(t.revenueChange) < 1, String(t.revenueChange));
});

test("global budget without depreciation lowers each hospital's change by its depreciation", () => {
  const a = M.runGlobalBudget(), b = M.runGlobalBudget(undefined, { excludeDepreciation: true });
  for (let i = 0; i < a.length; i++) {
    if (!Number.isFinite(a[i].revenueChange)) continue;
    const h = VT_HOSPITALS.find((x) => x.id === a[i].id);
    assert.ok(Math.abs(a[i].revenueChange - b[i].revenueChange - h.depreciation) < 1, a[i].id);
  }
});
