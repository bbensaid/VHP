/**
 * Sourced per-state indicators for the fifty-state dashboard (/dashboard, /dashboard/[state], /dashboard/compare).
 *
 * Built by scripts/build-state-indicators.mjs from CDC BRFSS, CMS Care Compare, CMS's Rural Health Transformation
 * award table, KFF's Medicaid expansion tracker and CMS's AHEAD participant list. It replaces the "HTR Performance
 * Index" (2026-10-17): a 0–100 composite whose values were hand-entered with no calculation behind them. There is no
 * composite here and no "leading / at risk" label — each indicator is shown as the source reports it.
 */
import raw from "./state-indicators.json";
import type { PillarId } from "@/lib/taxonomy/pillars";

export type StateIndicators = {
  name: string;
  medicaidExpansion: boolean;
  ahead: string | null;
  rhtAwardFY26: number;
  brfss: {
    year: number;
    insuredPct: number;
    costBarrierPct: number | null;
    checkupPct: number | null;
    personalProviderPct: number | null;
    providerGapEducation: number | null;
  } | null;
  cms: { hospitals: number; criticalAccess: number; ratedHospitals: number; meanStarRating: number | null };
};

type SourceKey = "brfss" | "cms" | "rht" | "kff" | "ahead";
export const INDICATOR_SOURCES = raw.sources as Record<SourceKey, { label: string; url: string }>;
export const INDICATORS_GENERATED = raw.generated;
export const STATE_INDICATORS = raw.states as unknown as Record<string, StateIndicators>;

export type Indicator = {
  key: string;
  label: string;
  /** Pillar the indicator speaks to, or "equity" for the cross-cutting test. */
  pillar: PillarId | "equity";
  source: SourceKey;
  /** For colouring only: does a higher value read as better? null = neither (counts, dollars). */
  higherIsBetter: boolean | null;
  get: (s: StateIndicators) => number | null;
  format: (v: number) => string;
  note?: string;
};

const pct = (v: number) => `${v.toFixed(1)}%`;

export const INDICATORS: Indicator[] = [
  { key: "insured", label: "Adults with health insurance", pillar: "economics", source: "brfss", higherIsBetter: true,
    get: (s) => s.brfss?.insuredPct ?? null, format: pct },
  { key: "costBarrier", label: "Could not see a doctor because of cost", pillar: "economics", source: "brfss", higherIsBetter: false,
    get: (s) => s.brfss?.costBarrierPct ?? null, format: pct, note: "Adults who needed a doctor in the past 12 months but could not because of cost." },
  { key: "provider", label: "Have a personal health care provider", pillar: "clinical", source: "brfss", higherIsBetter: true,
    get: (s) => s.brfss?.personalProviderPct ?? null, format: pct },
  { key: "checkup", label: "Routine checkup in the past year", pillar: "clinical", source: "brfss", higherIsBetter: true,
    get: (s) => s.brfss?.checkupPct ?? null, format: pct },
  { key: "providerGap", label: "Personal-provider gap by education", pillar: "equity", source: "brfss", higherIsBetter: false,
    get: (s) => s.brfss?.providerGapEducation ?? null, format: (v) => `${v.toFixed(1)} pts`,
    note: "College graduates minus adults without a high-school diploma, percentage points." },
  { key: "stars", label: "Mean CMS hospital star rating", pillar: "clinical", source: "cms", higherIsBetter: true,
    get: (s) => s.cms.meanStarRating, format: (v) => v.toFixed(2), note: "Average of rated hospitals (1–5); many small hospitals are not rated." },
  { key: "hospitals", label: "Hospitals listed by CMS", pillar: "operations", source: "cms", higherIsBetter: null,
    get: (s) => s.cms.hospitals, format: (v) => v.toLocaleString() },
  { key: "cah", label: "Critical access hospitals", pillar: "operations", source: "cms", higherIsBetter: null,
    get: (s) => s.cms.criticalAccess, format: (v) => v.toLocaleString() },
  { key: "rht", label: "Rural Health Transformation award, FY2026", pillar: "policy", source: "rht", higherIsBetter: null,
    get: (s) => s.rhtAwardFY26, format: (v) => `$${(v / 1e6).toFixed(1)}M` },
];

/** "new-hampshire" / "new_hampshire" / "New Hampshire" → "NH". */
export function stateCodeFor(slugOrName: string): string | null {
  const k = slugOrName.toLowerCase().replace(/[_-]/g, " ").trim();
  const hit = Object.entries(STATE_INDICATORS).find(([, s]) => s.name.toLowerCase() === k);
  return hit ? hit[0] : null;
}

export function slugFor(code: string): string {
  return STATE_INDICATORS[code].name.toLowerCase().replace(/\s+/g, "-");
}

/** Rank (1 = highest value) of a state on an indicator among the states that have a value. */
export function rankOf(ind: Indicator, code: string): { rank: number; of: number } | null {
  const vals = Object.entries(STATE_INDICATORS).map(([c, s]) => [c, ind.get(s)] as const).filter(([, v]) => v != null);
  const mine = ind.get(STATE_INDICATORS[code]);
  if (mine == null) return null;
  return { rank: vals.filter(([, v]) => (v as number) > mine).length + 1, of: vals.length };
}
