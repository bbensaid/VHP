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

test("FY27 submitted expense matches the staff overview expense table", () => {
  for (const h of VT_HOSPITALS) {
    if (h.opExpense === null) continue;
    const money = "$" + h.opExpense.toLocaleString("en-US");
    assert.ok(staff.includes(money), `${h.id}: ${money} not in staff overview`);
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

test("implied operating revenue reproduces the submitted margin", () => {
  for (const h of VT_HOSPITALS) {
    const rev = M.impliedOpRevenue(h);
    if (rev === null) continue;
    assert.ok(Math.abs((rev - h.opExpense) / rev - h.opMargin) < 1e-12, h.id);
  }
});
