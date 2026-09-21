/**
 * Unit tests for the dependency-gate engine.
 *
 * These assert the CLAIMS CHAPTER 1 MAKES, not just that the code runs: that
 * building out of order collapses the composite, that the same downstream
 * spending succeeds once the upstream gates open, that a shortfall two hops
 * away arrives late, and that equity is never averaged into the score.
 *
 * Run:  npm run test:engine   (compiles the engine to .engine-build first)
 */
const test = require("node:test");
const assert = require("node:assert/strict");
const path = require("node:path");

const BUILD = path.join(__dirname, "..", ".engine-build", "framework");
const { DEPENDENCIES, BUILD_ORDER, PILLAR_CURRENCY } = require(path.join(BUILD, "dependencies.js"));
const {
  runSequence,
  findBindingConstraint,
  propagateShortfall,
  gateFactor,
  PRESETS,
} = require(path.join(BUILD, "sequence-engine.js"));

const IDS = ["policy", "technology", "economics", "clinical", "operations"];
const preset = (id) => PRESETS.find((p) => p.id === id).scores;
const flat = (n) => ({ policy: n, technology: n, economics: n, clinical: n, operations: n });

// ── The graph matches the book ────────────────────────────────────────────

test("nine directed dependencies, three critical-path, two feedback", () => {
  assert.equal(DEPENDENCIES.length, 9, "book §1.4: nine directed dependencies");
  assert.equal(DEPENDENCIES.filter((d) => d.criticalPath).length, 3, "book §1.12.1: three critical-path");
  assert.equal(DEPENDENCIES.filter((d) => d.feedback).length, 2, "book §1.4.5: two feedback loops");
});

test("the three critical-path dependencies are the ones §1.12.1 names", () => {
  const actual = DEPENDENCIES.filter((d) => d.criticalPath).map((d) => `${d.from}->${d.to}`).sort();
  assert.deepEqual(actual, ["policy->economics", "economics->clinical", "technology->economics"].sort());
});

test("every edge uses canonical pillar ids, with no self-edges or duplicates", () => {
  const seen = new Set();
  for (const d of DEPENDENCIES) {
    assert.ok(IDS.includes(d.from), `unknown from: ${d.from}`);
    assert.ok(IDS.includes(d.to), `unknown to: ${d.to}`);
    assert.notEqual(d.from, d.to, "no self-dependency");
    const key = `${d.from}->${d.to}`;
    assert.ok(!seen.has(key), `duplicate edge ${key}`);
    seen.add(key);
  }
  assert.deepEqual(Object.keys(PILLAR_CURRENCY).sort(), [...IDS].sort());
});

test("no Economics -> Technology cell (appropriations are authority, not incentive)", () => {
  // The currency rule, book §1.4. Re-litigating this by counting arrows is how
  // the cell keeps getting re-added.
  assert.equal(DEPENDENCIES.some((d) => d.from === "economics" && d.to === "technology"), false);
});

test("BUILD_ORDER is a topological order of the build-order edges", () => {
  // The engine computes in one pass and reads upstream EFFECTIVE values, which
  // is only sound if this holds.
  const pos = Object.fromEntries(BUILD_ORDER.map((id, i) => [id, i]));
  assert.deepEqual([...BUILD_ORDER].sort(), [...IDS].sort());
  for (const d of DEPENDENCIES) {
    if (d.feedback) continue;
    assert.ok(pos[d.from] < pos[d.to], `${d.from} must precede ${d.to}`);
  }
});

test("feedback loops impose no build-order gate", () => {
  // Operations feeds Policy and Technology, but only after the build — so a
  // weak Operations pillar must not retroactively cap them.
  const weakOps = runSequence({ ...flat(100), operations: 0 });
  assert.equal(weakOps.pillars.policy.effective, 100);
  assert.equal(weakOps.pillars.technology.effective, 100);
});

// ── Gate arithmetic ───────────────────────────────────────────────────────

test("gate factors stay in range and critical-path gates bite harder", () => {
  for (const u of [0, 25, 50, 75, 100]) {
    for (const crit of [true, false]) {
      const f = gateFactor(u, crit);
      assert.ok(f > 0 && f <= 1, `factor out of range: ${f}`);
    }
    if (u < 100) assert.ok(gateFactor(u, true) < gateFactor(u, false), "critical path must penalize more");
  }
  assert.equal(gateFactor(100, true), 1);
  assert.equal(gateFactor(100, false), 1);
});

test("all gates open: nothing is lost to sequencing", () => {
  const r = runSequence(flat(100));
  assert.equal(r.effectiveComposite, 100);
  assert.equal(r.sequenceLoss, 0);
  for (const id of IDS) assert.equal(r.pillars[id].penalty, 0);
  assert.equal(r.bindingConstraint, null, "nothing to unblock at full readiness");
});

// ── The chapter's central claim ───────────────────────────────────────────

test("OneCare profile: high Economics ambition collapses behind closed gates", () => {
  const r = runSequence(preset("onecare"));
  assert.ok(r.effectiveComposite < r.nominalComposite - 15, "composite must visibly collapse");
  assert.ok(r.pillars.economics.nominal >= 85, "the ambition was real");
  assert.ok(r.pillars.economics.effective < 40, "but it cannot be run: " + r.pillars.economics.effective);
  assert.equal(r.pillars.economics.limitingGate.dependency.from, "technology");
  assert.equal(r.pillars.economics.limitingGate.status, "closed");
});

test("same Economics spending, correct order: the pillar finally delivers", () => {
  // Book §1.15 TRY THIS: "raise Policy and Technology first, and watch the same
  // Economics inputs finally produce a viable score."
  const before = runSequence(preset("onecare"));
  const after = runSequence(preset("onecare-reordered"));
  for (const id of ["economics", "clinical", "operations"]) {
    assert.equal(after.pillars[id].nominal, before.pillars[id].nominal, `${id} input must be unchanged`);
  }
  assert.ok(
    after.pillars.economics.effective > before.pillars.economics.effective * 2,
    "reordering must more than double delivered Economics",
  );
  assert.ok(after.effectiveComposite > before.effectiveComposite + 20);
});

test("dropping one pillar to zero cascades two hops downstream", () => {
  const base = flat(90);
  const r = runSequence({ ...base, policy: 0 });
  // Policy gates Technology; the capped Technology then gates Economics.
  assert.ok(r.pillars.technology.effective < 90 * 0.65, "direct hit");
  assert.ok(r.pillars.economics.effective < 40, "cascade reaches two hops: " + r.pillars.economics.effective);
  assert.ok(r.pillars.clinical.effective < 60, "and three");
});

test("spending more downstream cannot open an upstream gate", () => {
  // §1.12.1: "Critical-path dependencies cannot be shortcut by allocating more
  // resources to the downstream intervention."
  const closed = { policy: 20, technology: 15, economics: 50, clinical: 50, operations: 50 };
  const maxSpend = runSequence({ ...closed, economics: 100 });
  const halfSpend = runSequence({ ...closed, economics: 50 });
  const gain = maxSpend.pillars.economics.effective - halfSpend.pillars.economics.effective;
  assert.ok(gain < 20, `doubling spend behind a closed gate bought ${gain} points`);
});

// ── Binding constraint ────────────────────────────────────────────────────

test("Vermont 2026: Technology is the binding constraint", () => {
  assert.equal(findBindingConstraint(preset("vermont-2026")), "technology");
});

test("the binding constraint is not simply the lowest score", () => {
  // Operations is lowest, but it is last in the sequence — nothing waits behind
  // it, so fixing it buys the least.
  const scores = { policy: 95, technology: 55, economics: 60, clinical: 70, operations: 20 };
  const binding = findBindingConstraint(scores);
  assert.notEqual(binding, "operations", "lowest score is not automatically binding");
  assert.equal(binding, "technology");
});

test("raising any single pillar never lowers the delivered composite", () => {
  const base = { policy: 55, technology: 40, economics: 70, clinical: 35, operations: 60 };
  const baseline = runSequence(base).effectiveComposite;
  for (const id of IDS) {
    const up = runSequence({ ...base, [id]: base[id] + 15 }).effectiveComposite;
    assert.ok(up >= baseline - 1e-9, `raising ${id} lowered the composite`);
  }
});

// ── The Equity Imperative is a test, not a score ──────────────────────────

test("equity is never averaged into the composite", () => {
  const scores = preset("vermont-2026");
  const failing = runSequence(scores);
  const passing = runSequence(scores, { policy: true, technology: true, economics: true, clinical: true, operations: true });
  assert.equal(failing.effectiveComposite, passing.effectiveComposite, "equity must not move the score");
  assert.equal(failing.equity.passes, false);
  assert.equal(passing.equity.passes, true);
});

test("an unanswered justice question is not a pass", () => {
  const r = runSequence(flat(100));
  assert.equal(r.equity.passes, false, "silence is not equity");
  assert.deepEqual([...r.equity.failing].sort(), [...IDS].sort());
});

test("one failed justice question fails the whole transformation", () => {
  const r = runSequence(flat(100), {
    policy: true, technology: true, economics: true, clinical: true, operations: false,
  });
  assert.equal(r.effectiveComposite, 100, "all five pillar tests still pass");
  assert.equal(r.equity.passes, false, "and it has still failed");
  assert.deepEqual(r.equity.failing, ["operations"]);
});

// ── Lag ───────────────────────────────────────────────────────────────────

test("a Technology gap shows up in Economics a year later, not immediately", () => {
  // Book §1.15: "The lag: a Technology gap shows up in Economics results a year
  // later, which is why it is missed."
  const { points, arrivals } = propagateShortfall(flat(85), "technology", 10, 36, 3);
  const at = (m) => points.find((p) => p.month === m);
  const healthyEcon = at(0).pillars.economics;

  assert.equal(at(6).pillars.economics, healthyEcon, "at 6 months Economics still reports healthy");
  assert.ok(at(12).pillars.economics < healthyEcon, "by 12 months it has landed");

  const econArrival = arrivals.find((a) => a.pillar === "economics");
  assert.equal(econArrival.month, 12);
  assert.equal(econArrival.via.from, "technology");
  assert.ok(econArrival.drop > 0);
});

test("the shocked pillar itself moves at month zero", () => {
  const { points } = propagateShortfall(flat(85), "technology", 10, 12, 3);
  assert.ok(points[0].pillars.technology < 85, "the gap is real on day one");
});

test("lag arrivals are ordered and every downstream pillar eventually registers", () => {
  const { arrivals } = propagateShortfall(flat(85), "policy", 0, 48, 3);
  const months = arrivals.map((a) => a.month);
  assert.deepEqual(months, [...months].sort((a, b) => a - b), "arrivals must be chronological");
  const hit = arrivals.map((a) => a.pillar);
  for (const id of ["technology", "economics", "clinical", "operations"]) {
    assert.ok(hit.includes(id), `${id} never registered the Policy shortfall`);
  }
});

// ── Robustness ────────────────────────────────────────────────────────────

test("out-of-range and missing inputs are clamped, not crashed", () => {
  const r = runSequence({ policy: 500, technology: -40, economics: NaN, clinical: 50, operations: 50 });
  assert.equal(r.pillars.policy.nominal, 100);
  assert.equal(r.pillars.technology.nominal, 0);
  assert.equal(r.pillars.economics.nominal, 0);
  for (const id of IDS) {
    assert.ok(Number.isFinite(r.pillars[id].effective), `${id} produced a non-finite score`);
  }
  assert.ok(Number.isFinite(r.effectiveComposite));
});

test("every preset is complete and runs", () => {
  assert.ok(PRESETS.length >= 3);
  for (const p of PRESETS) {
    assert.deepEqual(Object.keys(p.scores).sort(), [...IDS].sort(), `${p.id} is missing a pillar`);
    assert.ok(p.bookRef && p.blurb, `${p.id} needs a book reference and blurb`);
    assert.ok(Number.isFinite(runSequence(p.scores).effectiveComposite));
  }
});
