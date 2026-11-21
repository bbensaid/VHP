// Route: /rht-review — the 50-state Rural Health Transformation Program review.
// Data: lib/rht-review.ts (CMS documents only). Vermont has a full Year 1 review; every other
// state page is built from the same CMS documents until its own review is written.
import Link from "next/link";
import { RHT_STATES, RHT_AS_OF, CMS_DOCS, usdM, change } from "@/lib/rht-review";
import { Ext, Section, Stat, SourceNote } from "@/components/rht-review/ui";
import RhtStatesTable from "@/components/rht-review/RhtStatesTable";

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

      <Section label="State by state" title="Awards, money put to work, and policy commitments">
        <RhtStatesTable states={RHT_STATES} />
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
