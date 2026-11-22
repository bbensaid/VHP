/**
 * Cross-state comparison layer for the RHT Program Review (/rht-review). Everything here is COMPUTED from three
 * CMS-derived files; no figure is typed by hand:
 *  - states.json : awards (FY26, FY27), put to work, policy commitments (CMS award tables, obligated-funds report,
 *                  State Program Snapshots BP2) — built by book-audit/deep/rht/extract_cms.py
 *  - uses.json   : put-to-work dollars by CMS use-of-funds CATEGORY and by state initiative (obligated-funds report,
 *                  data as of Jul 31, 2026) — book-audit/deep/rht/extract_uses.py
 *  - themes.json : planned themes tagged in each state's CMS project abstract (Dec 2025), with the matching text
 *                  as evidence — book-audit/deep/rht/extract_themes.py
 * The five-pillar grouping of CMS categories is HTR analysis and is labelled as such wherever it is shown.
 */
import usesData from "@/lib/data/rht-review/uses.json";
import themesData from "@/lib/data/rht-review/themes.json";
import { RHT_STATES, change, type RhtState } from "@/lib/rht-review";

export type PillarKey = "policy" | "technology" | "economics" | "clinical" | "operations";

/** CMS's use-of-funds categories, in display order, with HTR's pillar grouping (analysis). */
export const CATEGORIES: { key: string; pillar: PillarKey }[] = [
  { key: "IT advances", pillar: "technology" },
  { key: "Consumer tech solutions", pillar: "technology" },
  { key: "Provider payments", pillar: "economics" },
  { key: "Appropriate care availability", pillar: "clinical" },
  { key: "Prevention & chronic disease", pillar: "clinical" },
  { key: "Behavioral health", pillar: "clinical" },
  { key: "Innovative care", pillar: "clinical" },
  { key: "Workforce", pillar: "operations" },
  { key: "Training & technical assistance", pillar: "operations" },
  { key: "Capital & infrastructure", pillar: "operations" },
  { key: "Fostering collaboration", pillar: "operations" },
  { key: "Program administration", pillar: "operations" },
];

export const PILLAR_LABEL: Record<PillarKey, string> = {
  policy: "Policy", technology: "Technology", economics: "Economics", clinical: "Clinical", operations: "Operations",
};

type UseRow = {
  putToWork: number | null; categories: Record<string, number>; categoryTotal: number; reconciles: boolean;
  coverage: number | null; initiatives: { name: string; amount: number }[]; cmsTypos: { label: string; printed: string; usedBulletSum: number }[];
};
const USES = (usesData as { states: Record<string, UseRow> }).states;
export const THEMES = (themesData as { themes: { key: string; label: string }[] }).themes;
const THEME_STATES = (themesData as { states: Record<string, { themes: Record<string, { match: string; evidence: string }> }> }).states;

export type StateCompare = {
  s: RhtState;
  slug: string;
  name: string;
  fy26: number;
  fy27: number;
  ptw: number;
  ptwShare: number;
  yoyPct: number;
  categories: Record<string, number>;
  categorized: number;
  /** Put-to-work dollars CMS did not assign to a category (>= 0), or the excess of category lines over the total. */
  uncategorized: number;
  overReported: number;
  reconciles: boolean;
  initiatives: { name: string; amount: number }[];
  cmsTypos: UseRow["cmsTypos"];
  pillarDollars: Record<Exclude<PillarKey, "policy">, number>;
  themes: Record<string, { match: string; evidence: string }>;
  committed: number;
  noProgress: number;
  complete: number;
};

function build(s: RhtState): StateCompare {
  const u = USES[s.state];
  const cats = u?.categories ?? {};
  const categorized = Object.values(cats).reduce((a, b) => a + b, 0);
  const ptw = s.putToWork ?? 0;
  const pillarDollars = { technology: 0, economics: 0, clinical: 0, operations: 0 };
  for (const c of CATEGORIES) {
    if (c.pillar !== "policy") pillarDollars[c.pillar as keyof typeof pillarDollars] += cats[c.key] ?? 0;
  }
  const committedActions = s.policyActions.filter((a) => a.committed);
  return {
    s, slug: s.slug, name: s.state, fy26: s.fy2026, fy27: s.fy2027, ptw,
    ptwShare: s.fy2026 ? ptw / s.fy2026 : 0,
    yoyPct: change(s).percent,
    categories: cats, categorized,
    uncategorized: Math.max(0, ptw - categorized),
    overReported: Math.max(0, categorized - ptw),
    reconciles: !!u?.reconciles,
    initiatives: u?.initiatives ?? [],
    cmsTypos: u?.cmsTypos ?? [],
    pillarDollars,
    themes: THEME_STATES[s.state]?.themes ?? {},
    committed: committedActions.length,
    noProgress: committedActions.filter((a) => a.status === "No Progress").length,
    complete: committedActions.filter((a) => a.status === "Complete").length,
  };
}

export const COMPARE: StateCompare[] = RHT_STATES.map(build);
export const compareFor = (slug: string) => COMPARE.find((c) => c.slug === slug);

export const NATIONAL = (() => {
  const byCat: Record<string, number> = {};
  for (const c of CATEGORIES) byCat[c.key] = COMPARE.reduce((a, s) => a + (s.categories[c.key] ?? 0), 0);
  const categorized = Object.values(byCat).reduce((a, b) => a + b, 0);
  const fy26 = COMPARE.reduce((a, s) => a + s.fy26, 0);
  const ptw = COMPARE.reduce((a, s) => a + s.ptw, 0);
  const uncategorized = COMPARE.reduce((a, s) => a + s.uncategorized, 0);
  const statesWith = (cat: string) => COMPARE.filter((s) => (s.categories[cat] ?? 0) > 0).length;
  const themeCount = (key: string) => COMPARE.filter((s) => s.themes[key]).length;
  const pillar: Record<string, number> = { technology: 0, economics: 0, clinical: 0, operations: 0 };
  for (const s of COMPARE) for (const k of Object.keys(pillar)) pillar[k] += s.pillarDollars[k as keyof StateCompare["pillarDollars"]];
  return { byCat, categorized, fy26, ptw, uncategorized, statesWith, themeCount, pillar, reconciling: COMPARE.filter((s) => s.reconciles).length };
})();

/** Pearson correlation, used to test (not assert) a relationship the data might suggest. */
export function pearson(xs: number[], ys: number[]) {
  const n = xs.length, mx = xs.reduce((a, b) => a + b, 0) / n, my = ys.reduce((a, b) => a + b, 0) / n;
  let sxy = 0, sxx = 0, syy = 0;
  for (let i = 0; i < n; i++) { sxy += (xs[i] - mx) * (ys[i] - my); sxx += (xs[i] - mx) ** 2; syy += (ys[i] - my) ** 2; }
  return sxy / Math.sqrt(sxx * syy);
}

/** Rank (1 = highest) of a state on a metric among all 50. */
export function rankOf(slug: string, metric: (s: StateCompare) => number) {
  const sorted = [...COMPARE].sort((a, b) => metric(b) - metric(a));
  return sorted.findIndex((s) => s.slug === slug) + 1;
}

export const POLICY_ACTIONS = (() => {
  const seen = new Map<string, string>();
  for (const s of COMPARE) for (const a of s.s.policyActions) if (!seen.has(a.code)) seen.set(a.code, a.name);
  return [...seen.entries()].sort((a, b) => a[0].localeCompare(b[0])).map(([code, name]) => ({ code, name }));
})();
