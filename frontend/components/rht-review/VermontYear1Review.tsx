// Vermont RHT Program — Year 1 review (Budget Period 1, $195,053,740.44).
// Every figure is read from lib/data/rht-review/*.json (generated from the documents listed in
// SOURCES below) or quoted from a cited article. No figure here is estimated or modelled.
import Link from "next/link";
import { VERMONT_YEAR1 as V, rhtState, usd, usdM, pct, CMS_DOCS } from "@/lib/rht-review";
import { Ext, Section, Stat, SourceNote, StatusPill } from "./ui";

const SRC = {
  list: { label: "State of Vermont, RHT Year 1 Awards and Contracts (executed agreements; Oct 30, 2026 update)", url: "https://healthcarereform.vermont.gov/rht-year-1-executed-agreements-and-contracts" },
  budget: { label: "Vermont RHT Program Budget Narrative (updated Jan 30, 2026), Joint Fiscal Committee", url: "https://ljfo.vermont.gov/assets/Meetings/Joint-Fiscal-Committee/2026-02-06/Vermont-RHT-Budget-Narrative-UPDATED-01-30-26.pdf" },
  july: { label: "AHS, Vermont's RHT Program Update, Joint Fiscal Committee (July 2026)", url: "https://ljfo.vermont.gov/assets/Meetings/Joint-Fiscal-Committee/2026-07-28/RHT-JFC-7.29.26.pdf" },
  feb: { label: "AHS, Rural Health Transformation, Joint Fiscal Committee (Feb 6, 2026)", url: "https://ljfo.vermont.gov/assets/Meetings/Joint-Fiscal-Committee/2026-02-06/JFC-RHT-20260205.pdf" },
  jan: { label: "AHS (J. Mazza Olson), RHTP Update, House Health Care Committee (Jan 7, 2026)", url: "https://legislature.vermont.gov/Documents/2026/Workgroups/House%20Health%20Care/Orientation/W~Jill%20Mazza%20Olson~RHTP%20Update~1-7-2026.pdf" },
  activities: { label: "AHS, RHT Program Activity Details (Jul 17, 2026)", url: "https://healthcarereform.vermont.gov/sites/hcr/files/documents/RHT%20Application%20Activity%20Details%2007172026.pdf" },
  vtdNov2: { label: "VTDigger, “Vermont has assigned its $195 million in federal rural health dollars” (Nov 2, 2026)", url: "https://vtdigger.org/2026/11/02/vermont-has-assigned-its-195-million-in-federal-rural-health-dollars-heres-where-its-going/" },
  vtdNov11: { label: "VTDigger, “Vermont receives $190M in the second year of federal rural health awards” (Nov 11, 2026)", url: "https://vtdigger.org/2026/11/11/vermont-receives-190m-in-the-second-year-of-federal-rural-health-awards/" },
  vtdSep10: { label: "VTDigger, “Vermont awards first batch of $195 million in federal rural health funds” (Sep 10, 2026)", url: "https://vtdigger.org/2026/09/10/vermont-awards-first-batch-of-195-million-in-federal-rural-health-funds/" },
  vtdApr9: { label: "VTDigger, “The state is racing to implement nearly $200 million in rural health transformation projects” (Apr 9, 2026)", url: "https://vtdigger.org/2026/04/09/the-state-is-racing-to-implement-nearly-200-million-for-rural-health-transformation-projects/" },
  opWasserman: { label: "Opinion — Julie Wasserman, “Where are the doctors in Vermont’s $195M rural health plan?” (VTDigger, Mar 19, 2026)", url: "https://vtdigger.org/2026/03/19/julie-wasserman-where-are-the-doctors-in-vermonts-195m-rural-health-plan/" },
  opSchwartz: { label: "Opinion — Ellen Schwartz, “Spend our tax dollars on healthcare, not pricey consultants” (VTDigger letter, Nov 15, 2026)", url: "https://vtdigger.org/2026/11/15/opinion-spend-our-tax-dollars-on-healthcare-not-pricey-consultants/" },
};

const SHORT: Record<string, string> = {
  "Regionalization and Innovative Care Strategies": "Regionalization",
  "Establishing a Clinically Integrated Network of Shared Services": "Shared Services",
  "Strengthening Primary Care": "Primary Care",
  "Health Care Workforce Development": "Workforce",
  "Price Transparency and Insurance Competition": "Price Transparency",
};

export default function VermontYear1Review() {
  const cms = rhtState("vermont")!;
  const y1 = V.award.fy2026;
  const y2 = V.award.fy2027;
  const signed = V.agreements.total;
  const ptw = V.cms.putToWork_2026_07_31;
  const moved = V.activities
    .filter((a) => a.planned_jan2026 && Math.abs(a.signed - a.planned_jan2026) >= 2_000_000)
    .sort((a, b) => (b.signed - (b.planned_jan2026 ?? 0)) - (a.signed - (a.planned_jan2026 ?? 0)));
  const snap = cms.policyActions;
  const snapTotal = snap.reduce((s, a) => s + a.year2FundingM, 0);

  return (
    <div className="max-w-5xl mx-auto px-6 py-12">
      <nav className="text-xs text-slate-500 mb-6">
        <Link href="/rht-review" className="underline">RHT Program Review</Link>{" "}/ Vermont
      </nav>

      {/* HERO */}
      <header className="bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-2xl p-8 mb-10">
        <div className="flex flex-wrap gap-2 mb-4">
          <span className="bg-teal-100 text-teal-700 border border-teal-200 text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded">Health Transformation Review</span>
          <span className="bg-slate-100 text-slate-600 text-[10px] font-bold uppercase tracking-wider px-3 py-1.5 rounded">Year 1 review · as of {V.asOf}</span>
        </div>
        <h1 className="ty-h1 font-black text-slate-900 dark:text-slate-100 mb-4 leading-tight">
          Vermont&apos;s $195 Million: What Year 1 of the Rural Health Transformation Program Bought
        </h1>
        <p className="ty-hero text-slate-600 dark:text-slate-300 leading-relaxed max-w-3xl">
          Vermont received {usd(y1, 2)}{" "}for the program&apos;s first budget period and has committed all of it.
          This review sets what the state planned in January against the {V.agreements.count}{" "}agreements it had signed by
          the October 30 deadline, what CMS says had actually been put to work, and how the Year 2 award of {usd(y2)}{" "}was decided.
          It reports only what the documents show; where they are silent, it says so.
        </p>
      </header>

      {/* IN BRIEF */}
      <Section id="brief" label="The review in brief" title="Six findings">
        <ol className="space-y-4 text-sm text-slate-700 dark:text-slate-300 leading-relaxed list-decimal pl-5">
          <li>
            <strong>Committed on time.</strong>{" "}The state reports it had fully obligated its Year 1 award by CMS&apos;s October 30, 2026
            deadline. Its public list shows {V.agreements.count}{" "}executed grant and contract agreements totalling {usd(signed, 2)}{" "}({pct(signed, y1)}{" "}of
            the award); the list excludes provider-payment methods, program administration and a few agreements not yet fully executed.
            <SourceNote>Source: <Ext href={SRC.list.url}>{SRC.list.label}</Ext>.</SourceNote>
          </li>
          <li>
            <strong>Committed is not spent.</strong>{" "}As of July 31, 2026, Vermont reported {usd(ptw!, 2)}{" "}“put to work” to CMS —
            {" "}{pct(ptw!, y1)}{" "}of the award. At that point the state&apos;s own July update showed {usdM(V.julyStatus.obligated)}{" "}obligated and {usdM(V.julyStatus.closed)}{" "}in
            procurements still being awarded, drafted or signed. The money must be drawn down by September 30, 2027. CMS says these point-in-time figures do not by
            themselves measure a state&apos;s progress, and will refresh them after the November 30, 2026 quarterly report.
            <SourceNote>Sources: <Ext href={CMS_DOCS.obligated.url}>{CMS_DOCS.obligated.label}</Ext>; <Ext href={SRC.july.url}>{SRC.july.label}</Ext>; <Ext href={CMS_DOCS.factSheet.url}>{CMS_DOCS.factSheet.label}</Ext>; spending deadline from <Ext href={SRC.feb.url}>{SRC.feb.label}</Ext>.</SourceNote>
          </li>
          <li>
            <strong>Most of the money went to regionalization.</strong> {usdM(V.byInitiative[0].signed)}{" "}({pct(V.byInitiative[0].signed, signed)}{" "}of signed agreements) sits under
            “Regionalization and Innovative Care Strategies”, led by {usdM(V.activities.find((a) => a.activity.startsWith("Facility upgrades"))!.signed)}{" "}for facility upgrades.
            <SourceNote>Computed from the state&apos;s agreement list (see the table below).</SourceNote>
          </li>
          <li>
            <strong>The money moved between lines.</strong>{" "}Against the January 30 budget, signed agreements are higher for facility upgrades, pharmacist test-to-treat,
            AI scribes and mental-health integration, and lower for team-based care, the shared EHR and McKinsey&apos;s transformation-analytics contract.
            Four budgeted lines ({usdM(V.plannedWithoutAgreement.reduce((s, x) => s + x.planned_jan2026, 0))}) have no agreement on the list; two of them, $15M each, are
            primary-care payment lines of the kind the state says its list does not include.
            <SourceNote>Sources: <Ext href={SRC.budget.url}>{SRC.budget.label}</Ext>; <Ext href={SRC.list.url}>state agreement list</Ext>. Budgets can be revised with CMS during the year, so a difference is a reallocation, not an overrun.</SourceNote>
          </li>
          <li>
            <strong>No outcomes yet.</strong>{" "}None of the published documents reports a patient, access or cost outcome. An independent evaluator (NORC, {usd(815989)})
            is under contract; quarterly reporting to CMS begins in November 2026.
            <SourceNote>Sources: <Ext href={SRC.list.url}>state agreement list</Ext>; <Ext href={CMS_DOCS.factSheet.url}>{CMS_DOCS.factSheet.label}</Ext>.</SourceNote>
          </li>
          <li>
            <strong>Year 2 is smaller.</strong>{" "}CMS awarded Vermont {usd(y2)}{" "}for Year 2, {usd(y1 - y2)}{" "}({((y2 - y1) / y1 * 100).toFixed(1)}%) less than Year 1.
            Vermont made one policy commitment to CMS — a SNAP food-restriction waiver — and CMS rates it “No Progress”.
            CMS does not publish a per-state explanation of the change, and the funding it attributes to a policy factor is not the same as the year-over-year difference.
            <SourceNote>Sources: <Ext href={CMS_DOCS.awardsFy27.url}>{CMS_DOCS.awardsFy27.label}</Ext>; <Ext href={CMS_DOCS.snapshot.url}>{CMS_DOCS.snapshot.label}</Ext>, Vermont pages.</SourceNote>
          </li>
        </ol>
      </Section>

      {/* NUMBERS */}
      <Section id="numbers" label="By the numbers" title="Year 1 at a glance">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <Stat value={usdM(y1)} label="Year 1 award" sub="FY2026, Dec 29, 2025" />
          <Stat value={usdM(signed)} label="Executed agreements" sub={`${V.agreements.count} agreements, state list`} />
          <Stat value={usdM(ptw!)} label="Put to work" sub="CMS, as of Jul 31, 2026" />
          <Stat value={usdM(y2)} label="Year 2 award" sub="FY2027, Nov 9, 2026" />
          <Stat value="Oct 30, 2026" label="Obligation deadline" sub="Met, per the state" />
          <Stat value="Sep 30, 2027" label="Spending deadline" sub="Year 1 funds" />
          <Stat value={`${V.julyStatus.positionsFilled} + ${V.julyStatus.positionsRecruiting}`} label="State RHT staff" sub="filled + recruiting, July 2026" />
          <Stat value="15%" label="Provider-payment cap" sub="just over $29M of the award" />
        </div>
        <SourceNote>
          Sources: <Ext href={CMS_DOCS.awardsFy26.url}>{CMS_DOCS.awardsFy26.label}</Ext>; <Ext href={SRC.list.url}>state agreement list</Ext>; <Ext href={CMS_DOCS.obligated.url}>CMS obligated-funds report</Ext>;
          {" "}<Ext href={CMS_DOCS.awardsFy27.url}>{CMS_DOCS.awardsFy27.label}</Ext>; deadlines and cap from <Ext href={SRC.feb.url}>{SRC.feb.label}</Ext>; staffing from <Ext href={SRC.july.url}>{SRC.july.label}</Ext>.
        </SourceNote>
      </Section>

      {/* WHERE IT WENT */}
      <Section id="initiatives" label="Where the money went" title="Signed agreements by initiative">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead><tr className="border-b border-slate-200 text-[10px] uppercase tracking-wide text-slate-500">
              <th className="text-left py-2 pr-3">Initiative</th><th className="text-right py-2 pr-3">Signed</th><th className="text-right py-2 pr-3">Share</th><th className="text-right py-2">Agreements</th>
            </tr></thead>
            <tbody className="divide-y divide-slate-100">
              {V.byInitiative.map((i) => (
                <tr key={i.initiative}>
                  <td className="py-2 pr-3 text-slate-800 dark:text-slate-200">{i.initiative}</td>
                  <td className="py-2 pr-3 text-right font-semibold">{usd(i.signed)}</td>
                  <td className="py-2 pr-3 text-right text-slate-500">{pct(i.signed, signed)}</td>
                  <td className="py-2 text-right text-slate-500">{i.agreements}</td>
                </tr>
              ))}
              <tr className="font-bold"><td className="py-2 pr-3">Total, executed agreements</td><td className="py-2 pr-3 text-right">{usd(signed, 2)}</td><td /><td className="py-2 text-right">{V.agreements.count}</td></tr>
            </tbody>
          </table>
        </div>
        <SourceNote>
          Source: <Ext href={SRC.list.url}>{SRC.list.label}</Ext>, downloaded {V.asOf}; the total equals the state&apos;s own total. The list leaves the first initiative heading blank;
          the state&apos;s <Ext href={SRC.activities.url}>Activity Details</Ext>{" "}place every one of those activities under Regionalization. The category totals in
          VTDigger&apos;s <Ext href={SRC.vtdNov2.url}>Nov 2 report</Ext>{" "}differ from these sums (for example, “more than $40 million” for primary care); the article does not
          say how they were computed, and the state&apos;s list excludes provider-payment methods and administration.
        </SourceNote>
      </Section>

      {/* PLAN VS SIGNED */}
      <Section id="plan-vs-signed" label="Plan versus signed" title="Where the money moved">
        <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-4 max-w-3xl">
          Activities where the signed total differs from the January 30 budget by $2 million or more. The state negotiates its budget with CMS and could
          re-allocate within Year 1, so these are changes of plan, not overspending.
        </p>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead><tr className="border-b border-slate-200 text-[10px] uppercase tracking-wide text-slate-500">
              <th className="text-left py-2 pr-3">Activity</th><th className="text-right py-2 pr-3">Jan 30 budget</th><th className="text-right py-2 pr-3">Signed</th><th className="text-right py-2">Difference</th>
            </tr></thead>
            <tbody className="divide-y divide-slate-100">
              {moved.map((a) => {
                const d = a.signed - (a.planned_jan2026 ?? 0);
                return (
                  <tr key={a.activity}>
                    <td className="py-2 pr-3 text-slate-800 dark:text-slate-200">{a.activity}<div className="text-[11px] text-slate-400">{SHORT[a.initiative] ?? a.initiative}</div></td>
                    <td className="py-2 pr-3 text-right">{usdM(a.planned_jan2026!, 2)}</td>
                    <td className="py-2 pr-3 text-right font-semibold">{usdM(a.signed, 2)}</td>
                    <td className={`py-2 text-right font-semibold ${d > 0 ? "text-amber-700" : "text-sky-700"}`}>{d > 0 ? "+" : "−"}{usdM(Math.abs(d), 2)}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <h3 className="text-sm font-black text-slate-800 dark:text-slate-200 mt-8 mb-2">Budgeted in January, no agreement on the list</h3>
        <ul className="text-sm text-slate-700 dark:text-slate-300 space-y-1 list-disc pl-5">
          {V.plannedWithoutAgreement.map((p) => <li key={p.activity}>{p.activity}{" "}— {usdM(p.planned_jan2026, 2)}</li>)}
        </ul>
        <SourceNote>
          The two $15M primary-care lines are per-member-per-month payments to practices (a Blueprint capacity payment for meeting access requirements, and
          performance payments shared between specialty and primary care), the kind of provider-payment method the state says
          its agreement list does not show. Their absence from the list is therefore not evidence they were dropped; the published documents do not say whether
          they were funded in Year 1. Sources: <Ext href={SRC.budget.url}>{SRC.budget.label}</Ext>; <Ext href={SRC.activities.url}>{SRC.activities.label}</Ext>; <Ext href={SRC.list.url}>state agreement list</Ext>.
        </SourceNote>
      </Section>

      {/* EVERY ACTIVITY */}
      <Section id="activities" label="Every activity" title={`All ${V.activities.length} activities with signed agreements, and who received the money`}>
        <div className="space-y-2">
          {V.activities.map((a) => (
            <details key={a.activity} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg">
              <summary className="cursor-pointer px-4 py-3 flex flex-wrap items-center justify-between gap-2 text-sm">
                <span className="font-semibold text-slate-800 dark:text-slate-200">{a.activity}</span>
                <span className="text-xs text-slate-500">{SHORT[a.initiative] ?? a.initiative}{" "}· {a.agreements}{" "}agreement{a.agreements > 1 ? "s" : ""}{" "}· <strong className="text-teal-700">{usd(a.signed)}</strong>
                  {a.planned_jan2026 ? <> · Jan budget {usd(a.planned_jan2026)}</> : null}</span>
              </summary>
              <div className="px-4 pb-4">
                {a.planned_label.length > 0 && a.planned_label[0] !== a.activity && (
                  <p className="text-[11px] text-slate-400 mb-2">January budget line: {a.planned_label.join(" + ")}</p>
                )}
                <table className="w-full text-xs">
                  <tbody className="divide-y divide-slate-100">
                    {a.recipients.map((r, i) => (
                      <tr key={i}>
                        <td className="py-1.5 pr-3">{r.name}{r.dba ? <span className="text-slate-400"> (d/b/a {r.dba})</span> : null}{r.outOfStatePartner ? <span className="text-slate-400"> *</span> : null}</td>
                        <td className="py-1.5 text-right">{usd(r.amount, 2)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </details>
          ))}
        </div>
        <SourceNote>
          Recipients and amounts exactly as listed by the state (<Ext href={SRC.list.url}>source</Ext>). * {V.agreements.outOfStateNote}
        </SourceNote>
      </Section>

      {/* LARGEST RECIPIENTS */}
      <Section id="recipients" label="Who received it" title="The 15 largest recipients">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead><tr className="border-b border-slate-200 text-[10px] uppercase tracking-wide text-slate-500">
              <th className="text-left py-2 pr-3">Organization (legal name on the state list)</th><th className="text-right py-2 pr-3">Signed</th><th className="text-right py-2">Agreements</th>
            </tr></thead>
            <tbody className="divide-y divide-slate-100">
              {V.topRecipients.map((r) => (
                <tr key={r.name}><td className="py-2 pr-3">{r.name}</td><td className="py-2 pr-3 text-right font-semibold">{usd(r.signed)}</td><td className="py-2 text-right text-slate-500">{r.agreements}</td></tr>
              ))}
            </tbody>
          </table>
        </div>
        <SourceNote>
          Totals by legal name; one health system can appear under several legal names (for example “University of Vermont Health” and “University of Vermont Medical Center”),
          and they are not combined here. KPH Healthcare Services Inc. does business as Kinney Drugs; VTDigger reports $8 million of its total is for pharmacist test-to-treat
          (<Ext href={SRC.vtdNov2.url}>Nov 2, 2026</Ext>). Mary Hitchcock Memorial Hospital and Dartmouth Health Home Care are marked on the state list with the note that funding is specific to services benefiting Vermont patients.
        </SourceNote>
      </Section>

      {/* CMS VIEW */}
      <Section id="cms" label="The federal view" title="What Vermont reported to CMS as put to work (through July 31, 2026)">
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl p-5 space-y-4">
          {cms.obligated.map((b) => (
            <div key={b.heading}>
              <h4 className="text-sm font-bold text-slate-800 dark:text-slate-200">{b.heading}</h4>
              {b.groups.map((g, i) => (
                <div key={i} className="ml-3 mt-1">
                  {g.name && <div className="text-xs font-semibold text-slate-600">{g.name}</div>}
                  <ul className="text-xs text-slate-600 list-disc pl-5">{g.items.map((it, j) => <li key={j}>{it}</li>)}</ul>
                </div>
              ))}
            </div>
          ))}
        </div>
        <SourceNote>
          Verbatim from <Ext href={CMS_DOCS.obligated.url}>{CMS_DOCS.obligated.label}</Ext>, Vermont page. CMS notes the report is state-submitted, reflects obligations as of
          July 31, 2026, and “is not a full view of state progress.” Under Program Operations, the itemised lines sum to less than the heading total; both are shown as CMS printed them.
        </SourceNote>
      </Section>

      {/* YEAR 2 */}
      <Section id="year2" label="Year 2" title={`How CMS set Vermont's ${usdM(y2)} Year 2 award`}>
        <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-4 max-w-3xl">
          Half of the $10 billion is split equally ($100 million per state). The other half follows a workload formula: rural need, the initiatives in each plan,
          certain state policy actions, and technical factors. From Year 2, CMS also weighs each state&apos;s progress on its approved plan. The table shows the
          state-policy factors CMS lists for Vermont and the Year 2 funding CMS attributes to each.
        </p>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead><tr className="border-b border-slate-200 text-[10px] uppercase tracking-wide text-slate-500">
              <th className="text-left py-2 pr-3">State policy action</th><th className="text-left py-2 pr-3">Vermont commitment / CMS status</th><th className="text-right py-2">Year 2 funding attributed</th>
            </tr></thead>
            <tbody className="divide-y divide-slate-100">
              {snap.map((a) => (
                <tr key={a.code}>
                  <td className="py-2 pr-3">{a.code} {a.name}</td>
                  <td className="py-2 pr-3">{a.committed ? <>Committed · <StatusPill status={a.status} /></> : <span className="text-slate-500">No commitment</span>}</td>
                  <td className="py-2 text-right font-semibold">${a.year2FundingM.toFixed(2)}M</td>
                </tr>
              ))}
              <tr className="font-bold"><td className="py-2 pr-3">Total shown</td><td /><td className="py-2 text-right">${snapTotal.toFixed(2)}M</td></tr>
            </tbody>
          </table>
        </div>
        <ul className="text-sm text-slate-700 dark:text-slate-300 space-y-2 list-disc pl-5 mt-4">
          <li>CMS&apos;s baselines for Vermont: member of two of the five licensure compacts; full or advanced scope of practice for physician assistants, nurse practitioners and dental hygienists, with pharmacists rated “limited authority”; Medicaid coverage of all three remote-care services.</li>
          <li>The SNAP commitment: in January the state told legislators that “the Governor has directed AHS to pursue submission of a USDA SNAP Food Restriction Waiver” and that it would pursue completion of policy actions by the end of calendar year 2027 (<Ext href={SRC.jan.url}>Jan 7, 2026 slides</Ext>). CMS&apos;s 2026 snapshot rates it “No Progress”.</li>
          <li>Vermont&apos;s decrease, $5.1 million, was the second-largest in dollars after Florida ($6.1 million). Nationally 25 states gained and 25 lost, and 46 changed by less than 3 percent, according to the <Ext href="https://www.americanactionforum.org/weekly-checkup/rural-health-transformation-funding-year-2/">American Action Forum</Ext>, which also notes that the amounts CMS attributes to policy factors “are not the year-over-year increases caused by those policies.” CMS does not publish a per-state explanation of the change.</li>
        </ul>
        <SourceNote>
          Sources: <Ext href={CMS_DOCS.factSheet.url}>{CMS_DOCS.factSheet.label}</Ext>; <Ext href={CMS_DOCS.snapshot.url}>{CMS_DOCS.snapshot.label}</Ext>, Vermont pages; <Ext href={CMS_DOCS.awardsFy27.url}>{CMS_DOCS.awardsFy27.label}</Ext>.
        </SourceNote>
      </Section>

      {/* VOICES */}
      <Section id="voices" label="On the record" title="What officials and critics have said">
        <div className="space-y-4">
          {[
            { q: "When I look at year one, I feel really excited about how much money is directly going to the field.", who: "Jill Mazza Olson, AHS Medicaid and health systems director", src: SRC.vtdNov2 },
            { q: "I always say this is a tool to support the broader transformation efforts.", who: "Jill Mazza Olson", src: SRC.vtdNov2 },
            { q: "It’s not an opportunity to start from scratch again. … We don’t have a lot of flexibility to add or remove things from that list.", who: "Fran Hodgins, deputy director of rural health transformation, to the Health Care Reform Oversight Committee (October 2026)", src: SRC.vtdNov11 },
            { q: "It doesn’t necessarily mean that we’re giving the same amount of money to the same amount of people for the same thing every year. It can adjust.", who: "Samantha Hefferon, director of rural health transformation", src: SRC.vtdNov11 },
            { q: "I’m struggling to realize how on Earth we’re going to spend that much money on the same things.", who: "Rep. Alyssa Black, D-Essex Town, chair, House Health Care Committee (October 2026)", src: SRC.vtdNov11 },
            { q: "We are flitting away one-time money on things that are not sustainable.", who: "Rep. Alyssa Black", src: SRC.vtdSep10 },
          ].map((v) => (
            <blockquote key={v.q} className="border-l-4 border-teal-300 pl-4">
              <p className="text-sm italic text-slate-800 dark:text-slate-200">“{v.q}”</p>
              <footer className="text-[11px] text-slate-500 mt-1">{v.who}{" "}— <Ext href={v.src.url}>{v.src.label}</Ext></footer>
            </blockquote>
          ))}
        </div>
        <h3 className="text-sm font-black text-slate-800 dark:text-slate-200 mt-8 mb-2">Published opinion</h3>
        <ul className="text-sm text-slate-700 dark:text-slate-300 space-y-2 list-disc pl-5">
          <li>Julie Wasserman, an independent health policy advocate who worked for Vermont state government for more than 25 years, argued that the plan “does not address Vermont’s current shortage” of primary care physicians (<Ext href={SRC.opWasserman.url}>commentary, Mar 19, 2026</Ext>).</li>
          <li>A reader letter objected to the $5.1 million transformation-analytics contract with McKinsey, citing the firm&apos;s 2021 opioid settlement with Vermont (<Ext href={SRC.opSchwartz.url}>letter, Nov 15, 2026</Ext>).</li>
        </ul>
        <SourceNote>Opinion pieces are listed as published views, not as findings of this review.</SourceNote>
      </Section>

      {/* WATCH */}
      <Section id="watch" label="What to watch" title="The next tests">
        <ul className="text-sm text-slate-700 dark:text-slate-300 space-y-2 list-disc pl-5">
          <li><strong>November 30, 2026:</strong>{" "}first quarterly report to CMS; CMS then refreshes the obligated-funds report (<Ext href={CMS_DOCS.obligated.url}>CMS</Ext>).</li>
          <li><strong>Spending:</strong>{" "}how much of the {usdM(signed)}{" "}in signed agreements is drawn down before the September 30, 2027 deadline (<Ext href={SRC.feb.url}>AHS</Ext>).</li>
          <li><strong>The SNAP waiver commitment</strong>{" "}and its end-of-2027 target (<Ext href={SRC.jan.url}>AHS</Ext>; <Ext href={CMS_DOCS.snapshot.url}>CMS</Ext>).</li>
          <li><strong>The independent evaluation</strong>{" "}by NORC, the first source that could report outcomes (<Ext href={SRC.list.url}>state list</Ext>).</li>
          <li><strong>Year 2 awards:</strong>{" "}the state says Year 2 keeps the same initiatives and activities but can change geography, provider types and gaps (<Ext href={SRC.vtdNov11.url}>VTDigger</Ext>).</li>
        </ul>
      </Section>

      {/* METHOD */}
      <Section id="method" label="Method" title="How this review was built">
        <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-3 max-w-3xl">
          Every number above is computed from documents published by the State of Vermont and CMS, downloaded on {V.asOf}. Agreement totals are the sum of the
          {" "}{V.agreements.count}{" "}rows on the state&apos;s executed-agreement list and match the state&apos;s printed total. Quotations come from named news reports and
          are attributed. This review does not estimate outcomes or spending the documents do not report.
        </p>
        <ul className="text-xs text-slate-600 dark:text-slate-400 space-y-1 list-disc pl-5">
          {[SRC.list, SRC.budget, SRC.activities, SRC.july, SRC.feb, SRC.jan, CMS_DOCS.awardsFy26, CMS_DOCS.awardsFy27, CMS_DOCS.factSheet, CMS_DOCS.obligated, CMS_DOCS.snapshot, SRC.vtdApr9, SRC.vtdSep10, SRC.vtdNov2, SRC.vtdNov11, SRC.opWasserman, SRC.opSchwartz].map((s) => (
            <li key={s.url}><Ext href={s.url}>{s.label}</Ext></li>
          ))}
        </ul>
        <p className="text-sm text-slate-600 dark:text-slate-300 mt-6">
          Related: <Link href="/vermont-rht-program" className="underline text-teal-700">Vermont&apos;s RHT Program plan</Link>{" "}·{" "}
          <Link href="/rht-review" className="underline text-teal-700">All 50 states</Link>{" "}·{" "}
          <Link href="/vermont-act-68" className="underline text-teal-700">Act 68</Link>
        </p>
      </Section>
    </div>
  );
}
