/**
 * Unit tests for the APM Architecture Designer's eight model types
 * (book Appendix D.3). Asserts that the Model Type selector DRIVES the
 * settlement — the defect the 2026-10 promise audit found was that it was dead
 * state — and that each type reproduces its CMS rule.
 *
 * Run:  npx tsx --test scripts/test-apm-models.test.ts
 */
import test from "node:test";
import assert from "node:assert/strict";
import {
  APM_MODEL_TYPES, applyCorridors, computeApm, getModelType, msspOneSidedMsr,
  type ApmInputs, type ApmModelType,
} from "../components/research/APMDesignLab.models";

function inputsFor(m: ApmModelType, over: Partial<ApmInputs> = {}): ApmInputs {
  return {
    attributedLives: 12000, benchmarkPMPM: 950, actualSpendPct: 94, qualityScore: 72,
    upsideShare: m.upsideShare, downsideShare: m.downsideShare, msr: m.msr, mlr: m.mlr,
    savingsCap: m.savingsCap, lossCap: m.lossCap,
    qualityWithhold: m.qualityWithhold, qualityThreshold: m.qualityThreshold,
    ...over,
  };
}
const run = (id: string, over: Partial<ApmInputs> = {}) => {
  const m = getModelType(id);
  return computeApm(m, inputsFor(m, over));
};

test("offers exactly the eight model types the book names", () => {
  assert.equal(APM_MODEL_TYPES.length, 8);
  assert.equal(new Set(APM_MODEL_TYPES.map((m) => m.id)).size, 8);
});

test("changing the model type changes the projection", () => {
  const positions = APM_MODEL_TYPES.map((m) => Math.round(computeApm(m, inputsFor(m)).finalPosition));
  // Same population and spend; at least 6 distinct outcomes across 8 types.
  assert.ok(new Set(positions).size >= 6, `positions: ${positions.join(", ")}`);
});

test("FFS baseline never settles", () => {
  assert.equal(run("ffs_baseline").finalPosition, 0);
  assert.equal(run("ffs_baseline", { actualSpendPct: 110 }).finalPosition, 0);
});

test("MSSP one-sided MSR follows the 42 CFR 425.604(b) sliding scale", () => {
  assert.equal(msspOneSidedMsr(5000), 3.9);
  assert.equal(msspOneSidedMsr(10000), 3.0);
  assert.equal(msspOneSidedMsr(60000), 2.0);
  assert.equal(msspOneSidedMsr(300), 12.2);
  // 3% gross savings for a 5,000-life ACO misses its 3.9% MSR.
  assert.equal(run("shared_savings_one_sided", { attributedLives: 5000, actualSpendPct: 97 }).finalPosition, 0);
  // One-sided never owes money.
  assert.equal(run("shared_savings_one_sided", { actualSpendPct: 110 }).finalPosition, 0);
});

test("MSSP one-sided pays 40% capped at 10% of benchmark", () => {
  const r = run("shared_savings_one_sided", { actualSpendPct: 94 });
  assert.ok(Math.abs(r.finalPosition - r.grossSavings * 0.4) < 1);
  const big = run("shared_savings_one_sided", { actualSpendPct: 60 });
  assert.ok(Math.abs(big.finalPosition - big.totalBenchmark * 0.1) < 1);
});

test("MSSP ENHANCED loss rate is 1 - 0.75*quality, bounded 40-75%", () => {
  assert.equal(run("shared_savings_two_sided", { qualityScore: 100 }).effectiveLossRate, 40);
  assert.equal(run("shared_savings_two_sided", { qualityScore: 0 }).effectiveLossRate, 75);
});

test("TEAM episode applies the 2% discount and the 20% stop-loss", () => {
  const r = run("episode_bundled", { actualSpendPct: 98 });
  assert.ok(Math.abs(r.grossSavings) < 1, "spend at 98% of benchmark equals the discounted target");
  const worst = run("episode_bundled", { actualSpendPct: 140, qualityScore: 0 });
  assert.ok(Math.abs(worst.finalPosition + worst.targetBenchmark * 0.2) < 1);
});

test("REACH corridors: Global keeps 100% to 10%, then 50%", () => {
  // 20% savings -> 10 + 10*0.5 = 15% kept (Milliman's PY2026 worked example).
  const kept = applyCorridors(20, 100, getModelType("full_capitation").corridors!);
  assert.ok(Math.abs(kept - 15) < 1e-9);
  // Professional: 4% savings -> 2% kept.
  const prof = applyCorridors(4, 100, getModelType("partial_capitation").corridors!);
  assert.ok(Math.abs(prof - 2) < 1e-9);
  // Symmetric for losses.
  assert.ok(Math.abs(applyCorridors(-20, 100, getModelType("full_capitation").corridors!) + 15) < 1e-9);
});

test("global budget keeps every dollar of savings, quality moves revenue +/-2%", () => {
  const good = run("global_budget", { qualityScore: 72 });
  assert.ok(Math.abs(good.netACOPosition - good.grossSavings) < 1);
  assert.ok(Math.abs(good.qualityAdjustment - good.totalBenchmark * 0.02) < 1);
  const bad = run("global_budget", { qualityScore: 30 });
  assert.ok(bad.qualityAdjustment < 0);
});
