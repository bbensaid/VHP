// Exports the numbers the /rht-review page computes (same modules, same code) to JSON for the printable review
// (docs/generators/rht_review_report.js). Run:  cd frontend && npx tsx scripts/export-rht-report.mts <out.json>
import fs from "node:fs";
import { COMPARE, NATIONAL, CATEGORIES, THEMES, POLICY_ACTIONS, PILLAR_LABEL, pearson } from "../lib/rht-compare";
import { stateReadout, medianPace } from "../components/rht-review/CompareCharts";

const P0 = (x: number) => `${(x * 100).toFixed(0)}%`;
const M0 = (n: number) => `$${(n / 1e6).toFixed(0)}M`;
const zero = COMPARE.filter((c) => c.ptw === 0).map((c) => c.name);
const underOne = COMPARE.filter((c) => c.ptw > 0 && c.ptwShare < 0.01).map((c) => c.name);
const full = COMPARE.filter((c) => c.ptwShare >= 0.98).map((c) => c.name);
const topCat = Object.entries(NATIONAL.byCat).sort((a, b) => b[1] - a[1])[0];
const payPlan = NATIONAL.themeCount("payment"), paySpend = NATIONAL.statesWith("Provider payments");
const payPlanNoSpend = COMPARE.filter((c) => c.themes.payment && !(c.categories["Provider payments"] > 0)).length;
const bhPlan = NATIONAL.themeCount("bh"), bhSpend = NATIONAL.statesWith("Behavioral health");
const adminOnly = COMPARE.filter((c) => c.ptw > 0 && (c.categories["Program administration"] ?? 0) / c.ptw >= 0.95).map((c) => c.name);
const r = pearson(COMPARE.map((c) => c.ptwShare), COMPARE.map((c) => c.yoyPct));
const pillarTot = Object.values(NATIONAL.pillar).reduce((a, b) => a + b, 0);

const findings = [
  ["Most of Year 1 is still in the pipeline.", `States reported ${P0(NATIONAL.ptw / NATIONAL.fy26)} of Year 1 as put to work by July 31, 2026 (median state ${P0(medianPace)}). The range is the story: ${zero.join(" and ") || "no state"} reported none and ${underOne.join(", ") || "no state"} under 1%, while ${full.join(", ")} reported 98% or more.`],
  ["People before buildings.", `${topCat[0]} is the largest use of the money CMS categorized: ${M0(topCat[1])}, ${P0(topCat[1] / NATIONAL.categorized)} of ${M0(NATIONAL.categorized)}. Capital and infrastructure is ${P0(NATIONAL.byCat["Capital & infrastructure"] / NATIONAL.categorized)}.`],
  ["Payment reform is planned far more than it is funded.", `${payPlan} states' plans name value-based payment or global budgets, but only ${paySpend} states had put any money into provider payments, and ${payPlanNoSpend} of the ${payPlan} planners had none. Provider payments are ${P0(NATIONAL.byCat["Provider payments"] / NATIONAL.categorized)} of categorized dollars.`],
  ["A plan-to-spend gap in behavioral health.", `${bhPlan} states' plans name behavioral health or substance use; ${bhSpend} had reported spending in CMS's behavioral-health category by July 31.`],
  ["Some states have only started the machinery.", `In ${adminOnly.length} states (${adminOnly.join(", ")}), 95% or more of the money reported so far is program administration: grant management, staff and contracts to run the program, not yet the program itself.`],
  ["Speed did not buy Year 2 money.", `Across the 50 states, the share of Year 1 put to work and the change in the Year 2 award are only weakly related (correlation ${r.toFixed(2)}). CMS says the July figures do not by themselves determine a state's award; the data agree.`],
];
const out = {
  findings, r, medianPace,
  national: { fy26: NATIONAL.fy26, ptw: NATIONAL.ptw, categorized: NATIONAL.categorized, reconciling: NATIONAL.reconciling, pillar: NATIONAL.pillar, pillarTot },
  categories: CATEGORIES.map((c) => ({ key: c.key, pillar: c.pillar, pillarLabel: PILLAR_LABEL[c.pillar], dollars: NATIONAL.byCat[c.key], statesSpending: NATIONAL.statesWith(c.key) })),
  themes: THEMES.map((t) => ({ key: t.key, label: t.label, states: NATIONAL.themeCount(t.key) })),
  policy: POLICY_ACTIONS.map((a) => {
    const rows = COMPARE.flatMap((c) => c.s.policyActions.filter((x) => x.code === a.code));
    const com = rows.filter((x) => x.committed);
    return { code: a.code, name: a.name, committed: com.length, complete: com.filter((x) => x.status === "Complete").length, noProgress: com.filter((x) => x.status === "No Progress").length };
  }),
  states: COMPARE.map((c) => {
    const top = CATEGORIES.map((k) => ({ k: k.key, v: c.categories[k.key] ?? 0 })).sort((a, b) => b.v - a.v)[0];
    return { slug: c.slug, name: c.name, fy26: c.fy26, ptw: c.ptw, ptwShare: c.ptwShare, yoyPct: c.yoyPct, categorized: c.categorized,
      topCategory: c.categorized > 0 ? top.k : null, topShare: c.categorized > 0 ? top.v / c.categorized : null,
      pillar: c.pillarDollars, themes: Object.keys(c.themes), readout: stateReadout(c) };
  }),
};
fs.writeFileSync(process.argv[2], JSON.stringify(out, null, 1));
console.log("wrote", process.argv[2], out.states.length, "states;", out.findings.length, "findings");
