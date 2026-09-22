/**
 * Maps the pre-existing HTI six-domain index to the book's five pillars + Equity.
 *
 * Built 2026-09-21 because Chapters 13, 15 and 16 cite the HTI Dashboard and the Innovation
 * Leaderboard as tracking "five-pillar status" (Policy/Technology/Economics/Clinical/Operations).
 * They didn't — HTI's domains (Digital Maturity, Value-Based Care, Clinical Excellence, Patient
 * Experience, Workforce Wellness, Equity) predate the five-pillar framework and don't line up with
 * it. Per the author's standing instruction, the tool is extended to match the book rather than the
 * book reworded down.
 *
 * Four of the five pillars have a defensible direct mapping onto existing HTI domains:
 *   Technology -> digital      (data/interoperability maturity is literally the Technology pillar)
 *   Clinical   -> outcomes     ("Clinical Excellence" already is the Clinical pillar's own name)
 *   Economics  -> vbc          (value-based-care penetration is a payment-incentive-structure metric)
 *   Operations -> workforce    ("Workforce Wellness" is execution capacity, the Operations currency)
 * Patient Experience has no pillar home and is dropped from this view (it remains in the original
 * six-domain HTI composite, untouched).
 *
 * Policy has NO existing HTI domain and no honest way to derive one from the other five numbers —
 * doing so would be inventing a score. Vermont is the one exception: its Policy trajectory is not
 * invented, it is read off this book's own Chapter 1 dependency-engine preset
 * (framework/sequence-engine.ts PRESETS "vermont-2026": policy=95) and off Acts 167/51/68's real
 * enactment dates (2022/2023/2025), which this book's own front matter and Chapter 2 document in
 * detail. Every other state's Policy score is explicitly UNSCORED here — see
 * `policyDataAvailable` — rather than guessed. Do not backfill it with a formula; that reintroduces
 * exactly the fabricated-precision problem this file exists to avoid.
 */
import type { QuarterlySnapshot, StateTimeSeries } from "../data/hti-timeseries-data";
import type { PillarId } from "../taxonomy/pillars";

export interface PillarSnapshot {
  quarter: string;
  policy: number | null; // null = not yet scored for this state
  technology: number;
  economics: number;
  clinical: number;
  operations: number;
  equity: number; // cross-cutting, reported alongside but never averaged into a pillar composite
}

export const PILLAR_SOURCE_DOMAIN: Record<PillarId, keyof QuarterlySnapshot | null> = {
  policy: null,
  technology: "digital",
  economics: "vbc",
  clinical: "outcomes",
  operations: "workforce",
};

/**
 * Vermont's Policy trajectory, quarter-aligned to `nationalBenchmark`'s Q1-2023..Q1-2025 keys.
 * Sourced, not fitted: Act 167 (2022, diagnostic mandate) is already in force at the start of this
 * series; Act 51 (2023) adds planning authority — modest step up; Act 68 (2025) makes RBP and global
 * budgets mandatory — the large step up, landing at 95 by Q1-2025 to match the book's own Fall-2026
 * "vermont-2026" preset (sequence-engine.ts). Values between enactments hold flat rather than
 * interpolate, because there is no sourced reason to assume gradual movement between two discrete
 * statutory events.
 */
const VERMONT_POLICY_BY_QUARTER: Record<string, number> = {
  "Q1-2023": 55, "Q2-2023": 55, "Q3-2023": 55, "Q4-2023": 62,
  "Q1-2024": 62, "Q2-2024": 62, "Q3-2024": 62, "Q4-2024": 62,
  "Q1-2025": 95,
};

function policyFor(stateId: string, quarter: string): number | null {
  return stateId === "vermont" ? (VERMONT_POLICY_BY_QUARTER[quarter] ?? null) : null;
}

/** Whether this state has a sourced Policy score at all (drives "—" vs. a number in the UI). */
export function policyDataAvailable(stateId: string): boolean {
  return stateId === "vermont";
}

export function toPillarSnapshot(snap: QuarterlySnapshot, stateId: string): PillarSnapshot {
  return {
    quarter: snap.quarter,
    policy: policyFor(stateId, snap.quarter),
    technology: snap.digital,
    economics: snap.vbc,
    clinical: snap.outcomes,
    operations: snap.workforce,
    equity: snap.equity,
  };
}

export function pillarSeriesFor(state: StateTimeSeries): PillarSnapshot[] {
  return state.snapshots.map((s) => toPillarSnapshot(s, state.stateId));
}

/**
 * Five-pillar composite for a snapshot. Averages only the pillars with a real score — Policy is
 * excluded from the mean wherever it's null, rather than treated as 0, so a state with no Policy
 * data isn't penalized for a gap in OUR data rather than a gap in its actual policy architecture.
 */
export function pillarComposite(p: PillarSnapshot): number {
  const scored = [p.technology, p.economics, p.clinical, p.operations, ...(p.policy != null ? [p.policy] : [])];
  return Math.round((scored.reduce((a, b) => a + b, 0) / scored.length) * 10) / 10;
}
