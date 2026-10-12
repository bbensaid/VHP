/**
 * Unit tests for the Portfolio Manager's Sequencing Test (book §15.7).
 * They assert what Chapter 15 claims the test produces, on the book's own
 * Vermont portfolio (Figure 15.3) and gate profile (Vermont, Fall 2026 preset).
 *
 * Run:  npm run test:engine
 */
const test = require("node:test");
const assert = require("node:assert/strict");
const path = require("node:path");

const BUILD = path.join(__dirname, "..", ".engine-build", "framework");
const { PRESETS } = require(path.join(BUILD, "sequence-engine.js"));
const { runPortfolioTest, verdictFor, VERMONT_PORTFOLIO } = require(path.join(BUILD, "portfolio-test.js"));

const vt = PRESETS.find((p) => p.id === "vermont-2026").scores;
const res = runPortfolioTest([...VERMONT_PORTFOLIO], vt);
const verdict = (id) => res.components.find((r) => r.component.id === id).verdict;

test("the preset is Figure 15.3's nineteen components across the five pillars", () => {
  assert.equal(VERMONT_PORTFOLIO.length, 19);
  const per = {};
  for (const c of VERMONT_PORTFOLIO) per[c.pillar] = (per[c.pillar] || 0) + 1;
  assert.deepEqual(per, { policy: 4, technology: 4, economics: 4, clinical: 4, operations: 3 });
  assert.equal(new Set(VERMONT_PORTFOLIO.map((c) => c.id)).size, 19, "unique ids");
});

test("Vermont Fall 2026: the Economics gate is closed behind Technology", () => {
  assert.equal(res.gates.policy.open, true, "Policy has no upstream gate");
  assert.equal(res.gates.technology.open, true, "Policy -> Technology open (Acts 167/51/68)");
  assert.equal(res.gates.economics.open, false);
  assert.ok(res.gates.economics.blockedBy.some((b) => b.pillar === "technology"),
    "§15.7: Economics waits on the Technology components that make it measurable");
});

test("§15.7: social-risk adjustment has no upstream blocker and should be running now", () => {
  assert.notEqual(verdict("sra"), "correctly-waiting");
  assert.notEqual(verdict("sra"), "late-by-dependency");
});

test("§1.11.2: payment design under a closed gate is correct, not ahead of the gate", () => {
  assert.equal(verdict("global-budget"), "design-in-parallel");
  assert.equal(verdict("rbp-impl"), "design-in-parallel");
});

test("§15.7 step 3: schedule pressure lands on the unfinished Technology components", () => {
  const ids = res.pressurePoints.map((p) => p.component.id);
  assert.ok(ids.includes("analytics"), "the analytics deployment (R-01) is a pressure point");
  assert.ok(res.pressurePoints.every((p) => p.component.pillar === "technology" || p.component.pillar === "economics"));
});

test("§15.7 inverse rule: an ungated component that is not running is late by dependency — the PMO itself", () => {
  assert.equal(verdict("pmo"), "late-by-dependency");
});

test("Figure 1.8: Clinical care-model programs proceed in parallel, never flagged ahead of the gate", () => {
  for (const id of ["pcmh", "ccbhc", "cocm"]) assert.equal(verdict(id), "on-track", id);
});

test("verdict table: a closed gate turns implementation into 'ahead of gate' and inaction into 'correctly waiting'", () => {
  const c = { id: "x", name: "x", pillar: "economics", gated: true };
  assert.equal(verdictFor({ ...c, status: "implementing" }, false), "ahead-of-gate");
  assert.equal(verdictFor({ ...c, status: "not-started" }, false), "correctly-waiting");
  assert.equal(verdictFor({ ...c, status: "not-started" }, true), "late-by-dependency");
  assert.equal(verdictFor({ ...c, status: "design" }, true), "ready-to-implement");
  assert.equal(verdictFor({ ...c, status: "done" }, false), "done");
});

test("opening the Technology gate releases the Economics components", () => {
  const open = runPortfolioTest([...VERMONT_PORTFOLIO], { ...vt, technology: 90, economics: 90 });
  assert.equal(open.gates.economics.open, true);
  assert.equal(open.components.find((r) => r.component.id === "global-budget").verdict, "ready-to-implement");
  assert.equal(open.pressurePoints.length, 0);
});
