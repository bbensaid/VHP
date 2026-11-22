// Route: /rht-review — the 50-state Rural Health Transformation Program review.
// Data: lib/rht-review.ts (CMS documents only). Vermont has a full Year 1 review; every other
// state page is built from the same CMS documents until its own review is written.
import Link from "next/link";
import { RHT_STATES, RHT_AS_OF, CMS_DOCS, change, stateNotes } from "@/lib/rht-review";
import { Ext, Section, Stat, SourceNote } from "@/components/rht-review/ui";
import RhtStatesTable from "@/components/rht-review/RhtStatesTable";
import RhtDashboard, { type DashRow } from "@/components/rht-review/RhtDashboard";
import { NationalUses, PillarBar, PillarLegend, medianPace } from "@/components/rht-review/CompareCharts";
import { COMPARE, NATIONAL, CATEGORIES, THEMES, POLICY_ACTIONS, pearson } from "@/lib/rht-compare";
import { PILLARS } from "@/lib/taxonomy/pillars";

export const metadata = {
  title: "Rural Health Transformation Program Review: All 50 States | HTR",
  description:
    "A sourced review of the $50 billion Rural Health Transformation Program: Year 1 and Year 2 awards, what each state reported to CMS as put to work, and the state policy commitments CMS scored — starting with a full Year 1 review of Vermont.",
};

export default function RhtReviewIndex() {
  const fy26 = RHT_STATES.reduce((s, x) => s + x.fy2026, 0);
  const fy27 = RHT_STATES.reduce((s, x) => s + x.fy2027, 0);
  const ptw = RHT_STATES.reduce((s, x) => s + (x.putToWork ?? 0), 0);
  const up = RHT_STATES.filter((s) => change(s).dollars > 0).length;
  const committed = RHT_STATES.reduce((n, s) => n + s.policyActions.filter((a) => a.committed).length, 0);
  const noProgress = RHT_STATES.reduce((n, s) => n + s.policyActions.filter((a) => a.committed && a.status === "No Progress").length, 0);

  // ── Computed findings (no hand-typed figures) ──
  const P0 = (x: number) => `${(x * 100).toFixed(0)}%`;
  const M0 = (n: number) => `$${(n / 1e6).toFixed(0)}M`;
  const zero = COMPARE.filter((c) => c.ptwShare < 0.005).map((c) => c.name);
  const full = COMPARE.filter((c) => c.ptwShare >= 0.98).map((c) => c.name);
  const topCat = Object.entries(NATIONAL.byCat).sort((a, b) => b[1] - a[1])[0];
  const payPlan = NATIONAL.themeCount("payment"), paySpend = NATIONAL.statesWith("Provider payments");
  const payPlanNoSpend = COMPARE.filter((c) => c.themes.payment && !(c.categories["Provider payments"] > 0)).length;
  const bhPlan = NATIONAL.themeCount("bh"), bhSpend = NATIONAL.statesWith("Behavioral health");
  const adminOnly = COMPARE.filter((c) => c.categorized > 0 && (c.categories["Program administration"] ?? 0) / c.categorized >= 0.95).map((c) => c.name);
  const r = pearson(COMPARE.map((c) => c.ptwShare), COMPARE.map((c) => c.yoyPct));
  const pillarTot = Object.values(NATIONAL.pillar).reduce((a, b) => a + b, 0);
  const pillarHex = (k: string) => PILLARS.find((p) => p.id === k)?.hex ?? "#64748b";
  const dashRows: DashRow[] = COMPARE.map((c) => ({
    slug: c.slug, name: c.name, fy26: c.fy26, fy27: c.fy27, ptw: c.ptw, ptwShare: c.ptwShare, yoyPct: c.yoyPct,
    categories: c.categories, categorized: c.categorized, uncategorized: c.uncategorized, overReported: c.overReported,
    themes: Object.fromEntries(Object.entries(c.themes).map(([k, v]) => [k, v.evidence])),
    policy: c.s.policyActions.map((a) => ({ code: a.code, committed: a.committed, status: a.status, detail: a.statusDetail })),
  }));

  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      <header className="bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-2xl p-8 mb-10">
        <span className="bg-teal-100 text-teal-700 border border-teal-200 text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded">Health Transformation Review</span>
        <h1 className="ty-h1 font-black text-slate-900 dark:text-slate-100 mt-4 mb-4 leading-tight">The Rural Health Transformation Program, Reviewed</h1>
        <p className="ty-hero text-slate-600 dark:text-slate-300 leading-relaxed max-w-3xl">
          Congress created a $50 billion fund, $10 billion a year from FY2026 to FY2030, for states to transform rural health care. Two years of awards are out.
          This review follows the money state by state using CMS&apos;s own documents: what each state was awarded, what it reported as put to work, and the
          policy commitments CMS scored. We start with a full Year 1 review of Vermont and will extend the same depth to other states.
        </p>
        <Link href="/rht-review/vermont" className="inline-block mt-5 bg-teal-700 text-white text-sm font-bold px-5 py-2.5 rounded-lg hover:bg-teal-800">
          Read the Vermont Year 1 review →
        </Link>
      </header>

      <Section label="National picture" title="Two years of awards">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <Stat value={`$${(fy26 / 1e9).toFixed(1)}B`} label="Year 1 (FY2026)" sub="50 states, Dec 29, 2025" />
          <Stat value={`$${(fy27 / 1e9).toFixed(1)}B`} label="Year 2 (FY2027)" sub="50 states, Nov 9, 2026" />
          <Stat value={`$${(ptw / 1e9).toFixed(2)}B`} label="Put to work, Year 1" sub={`${((ptw / fy26) * 100).toFixed(0)}% of Year 1; state-reported to CMS, as of Jul 31, 2026`} />
          <Stat value={`${up} up · ${50 - up} down`} label="Year 2 vs Year 1" sub="states whose award rose or fell" />
        </div>
        <ul className="text-sm text-slate-700 dark:text-slate-300 space-y-2 list-disc pl-5 mt-5 max-w-4xl">
          <li>Half of each year&apos;s $10 billion is split equally ($100 million per state); the other half follows a workload formula of rural need, plan initiatives, state policy actions and technical factors. From Year 2 it also reflects each state&apos;s progress on its approved plan. All funds must be spent by September 30, 2032.</li>
          <li>Counting each scored policy action once per state, states committed to {committed}{" "}of the state policy actions CMS scores; CMS rates {noProgress}{" "}of those “No Progress” in its 2026 snapshots (others are in progress, complete, or mixed across sub-commitments).</li>
          <li>CMS cautions that the July 31 “put to work” figures are a point-in-time view that does not by itself measure a state&apos;s progress or determine its Year 2 award.</li>
        </ul>
        <SourceNote>
          Sources: <Ext href={CMS_DOCS.awardsFy26.url}>{CMS_DOCS.awardsFy26.label}</Ext>; <Ext href={CMS_DOCS.awardsFy27.url}>{CMS_DOCS.awardsFy27.label}</Ext>;
          {" "}<Ext href={CMS_DOCS.factSheet.url}>{CMS_DOCS.factSheet.label}</Ext>; <Ext href={CMS_DOCS.obligated.url}>{CMS_DOCS.obligated.label}</Ext>;
          {" "}<Ext href={CMS_DOCS.snapshot.url}>{CMS_DOCS.snapshot.label}</Ext>. Compiled {RHT_AS_OF}.
        </SourceNote>
      </Section>

      <Section id="findings" label="What the first year shows" title="Six findings across 50 states">
        <ol className="grid md:grid-cols-2 gap-4 list-none">
          {[
            ["Most of Year 1 is still in the pipeline.", `States reported ${P0(NATIONAL.ptw / NATIONAL.fy26)} of Year 1 as put to work by July 31, 2026 (median state ${P0(medianPace)}). The range is the story: ${zero.join(", ")} reported none, while ${full.join(", ")} reported virtually all of it.`],
            ["People before buildings.", `${topCat[0]} is the largest use of the money CMS categorized: ${M0(topCat[1])}, ${P0(topCat[1] / NATIONAL.categorized)} of ${M0(NATIONAL.categorized)}. Capital and infrastructure is ${P0(NATIONAL.byCat["Capital & infrastructure"] / NATIONAL.categorized)}.`],
            ["Payment reform is planned far more than it is funded.", `${payPlan} states' plans name value-based payment or global budgets, but only ${paySpend} states had put any money into provider payments, and ${payPlanNoSpend} of the ${payPlan} planners had none. Provider payments are ${P0(NATIONAL.byCat["Provider payments"] / NATIONAL.categorized)} of categorized dollars.`],
            ["A plan-to-spend gap in behavioral health.", `${bhPlan} states' plans name behavioral health or substance use; ${bhSpend} had reported spending in CMS's behavioral-health category by July 31.`],
            ["Some states have only started the machinery.", `In ${adminOnly.length} states (${adminOnly.join(", ")}), 95% or more of the money reported so far is program administration: grant management, staff and contracts to run the program, not yet the program itself.`],
            ["Speed did not buy Year 2 money.", `Across the 50 states, the share of Year 1 put to work and the change in the Year 2 award are only weakly related (correlation ${r.toFixed(2)}). CMS says the July figures do not by themselves determine a state's award; the data agree.`],
          ].map(([h, b], i) => (
            <li key={i} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl p-5">
              <div className="text-xs font-black text-teal-700 mb-1">{String(i + 1).padStart(2, "0")}</div>
              <div className="font-bold text-slate-900 dark:text-slate-100 mb-1">{h}</div>
              <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">{b}</p>
            </li>
          ))}
        </ol>
        <SourceNote>
          Computed from CMS&apos;s obligated-funds report (state-reported, as of July 31, 2026), the state project abstracts (December 2025), the award tables and the 2026 State Program Snapshots.
          {" "}CMS assigns {M0(NATIONAL.categorized)} of the {M0(NATIONAL.ptw)} put to work to spending categories; {NATIONAL.reconciling} states&apos; category lines add up exactly to their totals, and the rest are flagged state by state.
        </SourceNote>
      </Section>

      <Section id="uses" label="Where the money went" title="Year 1 dollars put to work, by CMS spending category">
        <NationalUses />
        <div className="mt-5 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl p-5">
          <div className="text-xs font-black uppercase tracking-widest text-slate-500 mb-2">HTR five-pillar lens (analysis)</div>
          <PillarBar dollars={NATIONAL.pillar} height="h-5" />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-3 text-sm">
            {(["technology", "economics", "clinical", "operations"] as const).map((k) => (
              <div key={k}><span className="inline-block w-3 h-3 rounded-sm mr-1.5 align-middle" style={{ background: pillarHex(k) }} /><span className="font-semibold">{PILLARS.find((p) => p.id === k)?.label}</span> <span className="tabular-nums">{P0(NATIONAL.pillar[k] / pillarTot)}</span></div>
            ))}
          </div>
          <p className="text-sm text-slate-700 dark:text-slate-300 mt-3 leading-relaxed max-w-4xl">
            Grouping CMS&apos;s categories by the five pillars shows where the first year&apos;s effort is going: overwhelmingly into Operations (workforce, training, buildings, administration) and Clinical services, with Economics, the pillar that changes how care is paid for, at {P0(NATIONAL.pillar.economics / pillarTot)}.
            In the book&apos;s framework, Economics drives Clinical on the critical path, and violating a critical-path dependency &ldquo;produces failed interventions that generate political resistance to the correct interventions that follow&rdquo; (Chapter 1, §1.12.1). New services funded by a time-limited grant still need a way to be paid for once the grant ends. Policy does not appear in these dollars; it is the state commitments CMS scores, shown in the dashboard below.
          </p>
          <SourceNote>Categories are CMS&apos;s. Assigning them to pillars is HTR&apos;s analysis: Technology = IT advances, consumer tech; Economics = provider payments; Clinical = appropriate care availability, prevention & chronic disease, behavioral health, innovative care; Operations = workforce, training & technical assistance, capital & infrastructure, fostering collaboration, program administration.</SourceNote>
        </div>
      </Section>

      <Section id="compare" label="Compare all 50 states" title="The dashboard">
        <RhtDashboard
          rows={dashRows}
          categories={CATEGORIES.map((c) => ({ key: c.key, pillar: c.pillar, color: pillarHex(c.pillar) }))}
          themes={THEMES}
          policyActions={POLICY_ACTIONS}
          r={r}
          medianPace={medianPace}
        />
        <div className="mt-6">
          <div className="text-xs font-black uppercase tracking-widest text-slate-500 mb-2">Pillar mix of each state&apos;s categorized dollars (HTR analysis)</div>
          <div className="grid md:grid-cols-2 gap-x-8 gap-y-1.5">
            {[...COMPARE].sort((a, b) => a.name.localeCompare(b.name)).map((c) => (
              <div key={c.slug} className="grid grid-cols-[8.5rem_1fr] items-center gap-2 text-xs">
                <a href={`/rht-review/${c.slug}`} className="text-slate-700 dark:text-slate-300 hover:underline truncate">{c.name}</a>
                <PillarBar dollars={c.pillarDollars} />
              </div>
            ))}
          </div>
          <div className="mt-3"><PillarLegend /></div>
        </div>
      </Section>

      <Section label="State by state" title="Awards, money put to work, and policy commitments">
        <RhtStatesTable states={RHT_STATES} withNotes={RHT_STATES.filter((s) => stateNotes(s.slug)).map((s) => s.slug)} />
        <SourceNote>
          “Put to work” is the amount each state reported to CMS as obligated through July 31, 2026, as a share of its Year 1 award. Commitments counts the
          state-policy actions CMS lists the state as having committed to; CMS counts some sub-commitments separately, so its own totals can be higher.
          Oregon: CMS&apos;s obligated-funds report lists a Year 1 award of $192,271,577.67, $5 million below the $197,271,578 in the December 2025 award table and the
          snapshot; the table uses the award table.
        </SourceNote>
      </Section>
    </div>
  );
}
