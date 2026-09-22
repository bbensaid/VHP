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
 * Four of the five pillars have an HTI domain that moves with them, and this file uses those domains
 * as a TREND PROXY only:
 *   Technology -> digital      (digital maturity)
 *   Clinical   -> outcomes     ("Clinical Excellence")
 *   Economics  -> vbc          (value-based-care penetration)
 *   Operations -> workforce    ("Workforce Wellness" as execution capacity)
 * Patient Experience has no pillar home and is dropped from this view (it remains in the original
 * six-domain HTI composite, untouched).
 *
 * CORRECTED 2026-09-22 — this is the important part. The first version of this file treated those
 * four domains as the pillars' READINESS SCORES, and that put the platform in direct contradiction
 * with itself: HTI has Vermont's digital maturity at 90 in Q1-2025, so the dashboard showed
 * "Technology 90" while the HTR Simulator, the Friction Index and Chapter 1 all say Vermont's
 * Technology pillar sits at 45 and is the binding constraint of the entire sequence. A reader
 * sent to one tool by Chapter 13 and the other by Chapter 1 got opposite answers about the single
 * most important claim in the book.
 *
 * They are not the same measurement. An HTI domain scores adoption and maturity, benchmarked across
 * states; a pillar readiness score asks whether the pillar can issue its currency to the pillars
 * downstream of it. Vermont scores well on the first and badly on the second for exactly the reason
 * Chapter 12's readiness table records: "VITL operational but voluntary; incomplete adoption ...
 * small providers disconnected." Widespread systems, unreliable exchange between them.
 *
 * So: readiness levels come from the framework's own sourced preset (`frameworkReadiness`), the HTI
 * domains supply direction of travel only, and the two are labelled separately in the UI. Neither is
 * derived from the other, and no pillar level is invented for a state we have no source for.
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
import { PRESETS } from "./sequence-engine";

/**
 * One quarter of the TREND series. The four domain-backed numbers are adoption/maturity proxies
 * used to read direction of travel, NOT pillar readiness — see the header. `policy` is the one
 * sourced level in here, because statutory enactment dates are a matter of record.
 */
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
 * The framework's own sourced pillar readiness for a state, or null where there is none.
 *
 * This is deliberately a lookup, not a calculation: it returns the exact preset the HTR Simulator
 * runs (`PRESETS` in sequence-engine.ts), so the dashboard cannot drift from the simulator the way
 * it did before 2026-09-22. Vermont is the only state the book sources pillar readiness for; every
 * other state returns null and the UI says so rather than showing a number.
 */
export function frameworkReadiness(
  stateId: string,
): { scores: Record<PillarId, number>; label: string; bookRef: string } | null {
  if (stateId !== "vermont") return null;
  const preset = PRESETS.find((p) => p.id === "vermont-2026");
  if (!preset) return null;
  return { scores: preset.scores, label: preset.label, bookRef: preset.bookRef };
}

/** Direction of travel for one pillar across the trend series: the book asks only whether a pillar
 *  is "improving, flat, or decaying between reporting intervals". */
export function pillarTrend(
  series: PillarSnapshot[],
  pillar: PillarId,
): { delta: number; direction: "improving" | "flat" | "decaying" } | null {
  if (series.length < 2) return null;
  const first = series[0][pillar];
  const last = series[series.length - 1][pillar];
  if (first == null || last == null) return null;
  const delta = Math.round((last - first) * 10) / 10;
  return { delta, direction: delta > 0 ? "improving" : delta < 0 ? "decaying" : "flat" };
}
