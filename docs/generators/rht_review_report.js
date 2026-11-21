// Printable RHT Program Review — mirrors /rht-review and /rht-review/vermont, built from the same JSON.
// Usage: node rht_review_report.js <out.docx> <repo-root>
const { Paragraph, TextRun, PageBreak } = require("./node_modules/docx");
const { P, H1, H2, H3, B, table, box, gap, build, OK_FILL, WARN_FILL } = require("./docstyle");
const path = require("path");
const ROOT = process.argv[3];
const V = require(path.join(ROOT, "frontend/lib/data/rht-review/vermont-year1.json"));
const S = require(path.join(ROOT, "frontend/lib/data/rht-review/states.json"));
const N = require(path.join(ROOT, "frontend/lib/data/rht-review/state-notes.json"));

const NAVY = "1F3A5F";
const usd = (n, d = 0) => n.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: d, minimumFractionDigits: d });
const m = (n, d = 1) => `$${(n / 1e6).toFixed(d)}M`;
const pct = (a, b, d = 1) => `${((a / b) * 100).toFixed(d)}%`;
const SHORT = {
  "Regionalization and Innovative Care Strategies": "Regionalization",
  "Establishing a Clinically Integrated Network of Shared Services": "Shared Services",
  "Strengthening Primary Care": "Primary Care",
  "Health Care Workforce Development": "Workforce",
  "Price Transparency and Insurance Competition": "Price Transparency",
};
const SRC = {
  list: "State of Vermont, RHT Year 1 Awards and Contracts (executed agreements; Oct 30, 2026 update) — healthcarereform.vermont.gov/rht-year-1-executed-agreements-and-contracts",
  budget: "Vermont RHT Program Budget Narrative (updated Jan 30, 2026), Joint Fiscal Committee",
  july: "AHS, Vermont's RHT Program Update, Joint Fiscal Committee (July 2026)",
  feb: "AHS, Rural Health Transformation, Joint Fiscal Committee (Feb 6, 2026)",
  jan: "AHS (J. Mazza Olson), RHTP Update, House Health Care Committee (Jan 7, 2026)",
  activities: "AHS, RHT Program Activity Details (Jul 17, 2026)",
  vtdNov2: "VTDigger, “Vermont has assigned its $195 million in federal rural health dollars” (Nov 2, 2026)",
  vtdNov11: "VTDigger, “Vermont receives $190M in the second year of federal rural health awards” (Nov 11, 2026)",
  vtdSep10: "VTDigger, “Vermont awards first batch of $195 million in federal rural health funds” (Sep 10, 2026)",
  cmsObl: "CMS, RHTP Obligated Funds Report (state-reported data as of Jul 31, 2026)",
  cmsSnap: "CMS, RHT State Program Snapshots, 2026 release (Budget Period 2)",
  cmsFy26: "CMS, FY2026 awards (Dec 29, 2025)",
  cmsFy27: "CMS, FY2027 awards (Nov 9, 2026)",
  cmsFact: "CMS fact sheet, RHT Program Year 2 awards",
  aaf: "American Action Forum, “Rural Health Transformation Program Funding: A Narrow Redistribution for Year 2”",
};
const src = (t) => new Paragraph({ spacing: { after: 160 }, children: [new TextRun({ text: "Source: " + t, size: 16, italics: true, color: "666666" })] });

const vt = S.states.find((s) => s.slug === "vermont");
const y1 = V.award.fy2026, y2 = V.award.fy2027, signed = V.agreements.total, ptw = V.cms.putToWork_2026_07_31;
const c = [];
const add = (...x) => c.push(...x.flat());

// ── Title
add(
  new Paragraph({ spacing: { before: 600, after: 200 }, children: [new TextRun({ text: "Health Transformation Review", size: 44, bold: true, color: NAVY, font: "Arial" })] }),
  new Paragraph({ spacing: { after: 360 }, children: [new TextRun({ text: "The Rural Health Transformation Program, Reviewed: Year 1 and Year 2", size: 34, color: NAVY, font: "Arial" })] }),
  P("This is the printed edition of the platform's RHT Program Review (healthtransformationreview.org/rht-review). Part 1 is the full Year 1 review of Vermont; Part 2 covers all 50 states. It is built from the same data files as the website, which were compiled from State of Vermont and CMS documents and named news reports."),
  P(`**Compiled:** ${V.asOf}. Every figure traces to a source named beside it; where the documents are silent, the review says so.`),
  box("Contents", ["Part 1 — Vermont: Year 1 review (findings, the numbers, where the money went, plan versus signed, every activity and recipient, the federal view, Year 2, voices, what to watch)", "Part 2 — All 50 states: national picture, awards and spending table, and state-by-state review notes", "Sources"], OK_FILL),
  new Paragraph({ children: [new PageBreak()] }),
);

// ── PART 1
add(
  H1("Part 1 — Vermont's $195 Million: What Year 1 of the Rural Health Transformation Program Bought"),
  P(`Vermont received ${usd(y1, 2)} for the program's first budget period and has committed all of it. This review sets what the state planned in January against the ${V.agreements.count} agreements it had signed by the October 30 deadline, what CMS says had actually been put to work, and how the Year 2 award of ${usd(y2)} was decided. It reports only what the documents show; where they are silent, it says so.`),
  H2("The review in brief: six findings"),
  B(`**Committed on time.** The state reports it had fully obligated its Year 1 award by CMS's October 30, 2026 deadline. Its public list shows ${V.agreements.count} executed grant and contract agreements totalling ${usd(signed, 2)} (${pct(signed, y1)} of the award); the list excludes provider-payment methods, program administration and a few agreements not yet fully executed.`),
  src(SRC.list),
  B(`**Committed is not spent.** As of July 31, 2026, Vermont reported ${usd(ptw, 2)} “put to work” to CMS — ${pct(ptw, y1)} of the award. At that point the state's own July update showed ${m(V.julyStatus.obligated)} obligated and ${m(V.julyStatus.closed)} in procurements still being awarded, drafted or signed. The money must be drawn down by September 30, 2027. CMS says these point-in-time figures do not by themselves measure a state's progress, and will refresh them after the November 30, 2026 quarterly report.`),
  src(`${SRC.cmsObl}; ${SRC.july}; ${SRC.cmsFact}; ${SRC.feb}`),
  B(`**Most of the money went to regionalization.** ${m(V.byInitiative[0].signed)} (${pct(V.byInitiative[0].signed, signed)} of signed agreements) sits under “Regionalization and Innovative Care Strategies”, led by ${m(V.activities.find((a) => a.activity.startsWith("Facility upgrades")).signed)} for facility upgrades.`),
  src("Computed from the state's agreement list"),
  B(`**The money moved between lines.** Against the January 30 budget, signed agreements are higher for facility upgrades, pharmacist test-to-treat, AI scribes and mental-health integration, and lower for team-based care, the shared EHR and McKinsey's transformation-analytics contract. Four budgeted lines (${m(V.plannedWithoutAgreement.reduce((s, x) => s + x.planned_jan2026, 0))}) have no agreement on the list; two of them, $15M each, are primary-care payment lines of the kind the state says its list does not include.`),
  src(`${SRC.budget}; state agreement list. Budgets can be revised with CMS during the year, so a difference is a reallocation, not an overrun.`),
  B(`**No outcomes yet.** None of the published documents reports a patient, access or cost outcome. An independent evaluator (NORC, ${usd(815989)}) is under contract; quarterly reporting to CMS begins in November 2026.`),
  src(`State agreement list; ${SRC.cmsFact}`),
  B(`**Year 2 is smaller.** CMS awarded Vermont ${usd(y2)} for Year 2, ${usd(y1 - y2)} (${(((y2 - y1) / y1) * 100).toFixed(1)}%) less than Year 1. Vermont made one policy commitment to CMS — a SNAP food-restriction waiver — and CMS rates it “No Progress”. CMS does not publish a per-state explanation of the change, and the funding it attributes to a policy factor is not the same as the year-over-year difference.`),
  src(`${SRC.cmsFy27}; ${SRC.cmsSnap}, Vermont pages`),
);

add(
  H2("Year 1 at a glance"),
  table(["Measure", "Value", "Note"], [
    ["Year 1 award", usd(y1, 2), "FY2026, Dec 29, 2025"],
    ["Executed agreements", usd(signed, 2), `${V.agreements.count} agreements, state list`],
    ["Put to work", usd(ptw, 2), "CMS, as of Jul 31, 2026"],
    ["Year 2 award", usd(y2), "FY2027, Nov 9, 2026"],
    ["Obligation deadline", "Oct 30, 2026", "Met, per the state"],
    ["Spending deadline", "Sep 30, 2027", "Year 1 funds"],
    ["State RHT staff", `${V.julyStatus.positionsFilled} filled + ${V.julyStatus.positionsRecruiting} recruiting`, "July 2026"],
    ["Provider-payment cap", "15%", "just over $29M of the award"],
  ], [34, 30, 36]),
  src(`${SRC.cmsFy26}; state agreement list; ${SRC.cmsObl}; ${SRC.cmsFy27}; deadlines and cap from ${SRC.feb}; staffing from ${SRC.july}`),
);

add(
  H2("Where the money went: signed agreements by initiative"),
  table(["Initiative", "Signed", "Share", "Agreements"],
    V.byInitiative.map((i) => [i.initiative, usd(i.signed), pct(i.signed, signed), String(i.agreements)]).concat([["**Total, executed agreements**", `**${usd(signed, 2)}**`, "", `**${V.agreements.count}**`]]),
    [52, 20, 12, 16]),
  src(`${SRC.list}, downloaded ${V.asOf}; the total equals the state's own total. The list leaves the first initiative heading blank; the state's Activity Details place every one of those activities under Regionalization. The category totals in VTDigger's Nov 2 report differ from these sums (for example, “more than $40 million” for primary care); the article does not say how they were computed, and the state's list excludes provider-payment methods and administration.`),
);

const moved = V.activities.filter((a) => a.planned_jan2026 && Math.abs(a.signed - a.planned_jan2026) >= 2e6)
  .sort((a, b) => (b.signed - b.planned_jan2026) - (a.signed - a.planned_jan2026));
add(
  H2("Plan versus signed: where the money moved"),
  P("Activities where the signed total differs from the January 30 budget by $2 million or more. The state negotiates its budget with CMS and could re-allocate within Year 1, so these are changes of plan, not overspending."),
  table(["Activity", "Jan 30 budget", "Signed", "Difference"], moved.map((a) => {
    const d = a.signed - a.planned_jan2026;
    return [`${a.activity} (${SHORT[a.initiative] || a.initiative})`, m(a.planned_jan2026, 2), m(a.signed, 2), `${d > 0 ? "+" : "−"}${m(Math.abs(d), 2)}`];
  }), [52, 16, 16, 16]),
  H3("Budgeted in January, no agreement on the list"),
  ...V.plannedWithoutAgreement.map((p) => B(`${p.activity} — ${m(p.planned_jan2026, 2)}`)),
  src(`The two $15M primary-care lines are per-member-per-month payments to practices (a Blueprint capacity payment for meeting access requirements, and performance payments shared between specialty and primary care), the kind of provider-payment method the state says its agreement list does not show. Their absence from the list is therefore not evidence they were dropped; the published documents do not say whether they were funded in Year 1. Sources: ${SRC.budget}; ${SRC.activities}; state agreement list.`),
);

add(H2(`Every activity with signed agreements (${V.activities.length}), and who received the money`));
for (const a of V.activities) {
  add(
    H3(a.activity),
    P(`${SHORT[a.initiative] || a.initiative} · ${a.agreements} agreement${a.agreements > 1 ? "s" : ""} · **${usd(a.signed)}**${a.planned_jan2026 ? ` · Jan budget ${usd(a.planned_jan2026)}` : ""}${a.planned_label.length && a.planned_label[0] !== a.activity ? ` (budget line: ${a.planned_label.join(" + ")})` : ""}`),
    table(["Recipient (legal name on the state list)", "Amount"], a.recipients.map((r) => [`${r.name}${r.dba ? ` (d/b/a ${r.dba})` : ""}${r.outOfStatePartner ? " *" : ""}`, usd(r.amount, 2)]), [75, 25]),
    gap(),
  );
}
add(src(`Recipients and amounts exactly as listed by the state. * ${V.agreements.outOfStateNote}`));

add(
  H2("The 15 largest recipients"),
  table(["Organization (legal name on the state list)", "Signed", "Agreements"], V.topRecipients.map((r) => [r.name, usd(r.signed), String(r.agreements)]), [60, 25, 15]),
  src(`Totals by legal name; one health system can appear under several legal names (for example “University of Vermont Health” and “University of Vermont Medical Center”), and they are not combined here. KPH Healthcare Services Inc. does business as Kinney Drugs; VTDigger reports $8 million of its total is for pharmacist test-to-treat (${SRC.vtdNov2}). Mary Hitchcock Memorial Hospital and Dartmouth Health Home Care are marked on the state list with the note that funding is specific to services benefiting Vermont patients.`),
);

add(H2("The federal view: what Vermont reported to CMS as put to work (through July 31, 2026)"));
for (const b of vt.obligated) {
  add(P(`**${b.heading}**`));
  for (const g of b.groups) { if (g.name) add(P(g.name)); for (const it of g.items) add(B(it)); }
}
add(src(`Verbatim from ${SRC.cmsObl}, Vermont page. CMS notes the report is state-submitted, reflects obligations as of July 31, 2026, and “is not a full view of state progress.” Under Program Operations, the itemised lines sum to less than the heading total; both are shown as CMS printed them.`));

const snapTotal = vt.policyActions.reduce((s, a) => s + a.year2FundingM, 0);
add(
  H2(`Year 2: how CMS set Vermont's ${m(y2)} award`),
  P("Half of the $10 billion is split equally ($100 million per state). The other half follows a workload formula: rural need, the initiatives in each plan, certain state policy actions, and technical factors. From Year 2, CMS also weighs each state's progress on its approved plan. The table shows the state-policy factors CMS lists for Vermont and the Year 2 funding CMS attributes to each."),
  table(["State policy action", "Vermont commitment / CMS status", "Year 2 funding attributed"],
    vt.policyActions.map((a) => [`${a.code} ${a.name}`, a.committed ? `Committed · ${a.status}` : "No commitment", `$${a.year2FundingM.toFixed(2)}M`]).concat([["**Total shown**", "", `**$${snapTotal.toFixed(2)}M**`]]), [40, 35, 25]),
  B("CMS's baselines for Vermont: member of two of the five licensure compacts; full or advanced scope of practice for physician assistants, nurse practitioners and dental hygienists, with pharmacists rated “limited authority”; Medicaid coverage of all three remote-care services."),
  B(`The SNAP commitment: in January the state told legislators that “the Governor has directed AHS to pursue submission of a USDA SNAP Food Restriction Waiver” and that it would pursue completion of policy actions by the end of calendar year 2027 (${SRC.jan}). CMS's 2026 snapshot rates it “No Progress”.`),
  B(`Vermont's decrease, $5.1 million, was the second-largest in dollars after Florida ($6.1 million). Nationally 25 states gained and 25 lost, and 46 changed by less than 3 percent, according to the ${SRC.aaf}, which also notes that the amounts CMS attributes to policy factors “are not the year-over-year increases caused by those policies.” CMS does not publish a per-state explanation of the change.`),
  src(`${SRC.cmsFact}; ${SRC.cmsSnap}, Vermont pages; ${SRC.cmsFy27}`),
);

add(
  H2("On the record: what officials and critics have said"),
  ...[
    ["When I look at year one, I feel really excited about how much money is directly going to the field.", "Jill Mazza Olson, AHS Medicaid and health systems director", SRC.vtdNov2],
    ["I always say this is a tool to support the broader transformation efforts.", "Jill Mazza Olson", SRC.vtdNov2],
    ["It’s not an opportunity to start from scratch again. … We don’t have a lot of flexibility to add or remove things from that list.", "Fran Hodgins, deputy director of rural health transformation, to the Health Care Reform Oversight Committee (October 2026)", SRC.vtdNov11],
    ["It doesn’t necessarily mean that we’re giving the same amount of money to the same amount of people for the same thing every year. It can adjust.", "Samantha Hefferon, director of rural health transformation", SRC.vtdNov11],
    ["I’m struggling to realize how on Earth we’re going to spend that much money on the same things.", "Rep. Alyssa Black, D-Essex Town, chair, House Health Care Committee (October 2026)", SRC.vtdNov11],
    ["We are flitting away one-time money on things that are not sustainable.", "Rep. Alyssa Black", SRC.vtdSep10],
  ].map(([q, who, s]) => P(`“${q}” — ${who} (${s})`)),
  H3("Published opinion"),
  B("Julie Wasserman, an independent health policy advocate who worked for Vermont state government for more than 25 years, argued that the plan “does not address Vermont’s current shortage” of primary care physicians (VTDigger commentary, Mar 19, 2026)."),
  B("A reader letter objected to the $5.1 million transformation-analytics contract with McKinsey, citing the firm's 2021 opioid settlement with Vermont (VTDigger letter, Nov 15, 2026)."),
  src("Opinion pieces are listed as published views, not as findings of this review."),
  H2("What to watch: the next tests"),
  B("**November 30, 2026:** first quarterly report to CMS; CMS then refreshes the obligated-funds report."),
  B(`**Spending:** how much of the ${m(signed)} in signed agreements is drawn down before the September 30, 2027 deadline.`),
  B("**The SNAP waiver commitment** and its end-of-2027 target."),
  B("**The independent evaluation** by NORC, the first source that could report outcomes."),
  B("**Year 2 awards:** the state says Year 2 keeps the same initiatives and activities but can change geography, provider types and gaps."),
  new Paragraph({ children: [new PageBreak()] }),
);

// ── PART 2
const fy26 = S.states.reduce((s, x) => s + x.fy2026, 0), fy27 = S.states.reduce((s, x) => s + x.fy2027, 0);
const allPtw = S.states.reduce((s, x) => s + (x.putToWork || 0), 0);
const up = S.states.filter((x) => x.fy2027 > x.fy2026).length;
const committed = S.states.reduce((n, s) => n + s.policyActions.filter((a) => a.committed).length, 0);
const noProg = S.states.reduce((n, s) => n + s.policyActions.filter((a) => a.committed && a.status === "No Progress").length, 0);
add(
  H1("Part 2 — All 50 States"),
  P("Congress created a $50 billion fund, $10 billion a year from FY2026 to FY2030, for states to transform rural health care. Two years of awards are out. This part follows the money state by state using CMS's own documents: what each state was awarded, what it reported as put to work, and the policy commitments CMS scored."),
  H2("National picture"),
  table(["Measure", "Value"], [
    ["Year 1 awards (FY2026), 50 states", `$${(fy26 / 1e9).toFixed(1)}B`],
    ["Year 2 awards (FY2027), 50 states", `$${(fy27 / 1e9).toFixed(1)}B`],
    ["Put to work, Year 1 (state-reported to CMS, as of Jul 31, 2026)", `$${(allPtw / 1e9).toFixed(2)}B (${((allPtw / fy26) * 100).toFixed(0)}% of Year 1)`],
    ["States whose award rose / fell in Year 2", `${up} up · ${50 - up} down`],
  ], [65, 35]),
  B("Half of each year's $10 billion is split equally ($100 million per state); the other half follows a workload formula of rural need, plan initiatives, state policy actions and technical factors. From Year 2 it also reflects each state's progress on its approved plan. All funds must be spent by September 30, 2032."),
  B(`Counting each scored policy action once per state, states committed to ${committed} of the state policy actions CMS scores; CMS rates ${noProg} of those “No Progress” in its 2026 snapshots (others are in progress, complete, or mixed across sub-commitments).`),
  B("CMS cautions that the July 31 “put to work” figures are a point-in-time view that does not by itself measure a state's progress or determine its Year 2 award."),
  src(`${SRC.cmsFy26}; ${SRC.cmsFy27}; ${SRC.cmsFact}; ${SRC.cmsObl}; ${SRC.cmsSnap}`),
  H2("Awards, money put to work, and policy commitments"),
  table(["State", "Year 1", "Year 2", "Change", "Put to work (Jul 31)", "Commitments"],
    S.states.map((s) => {
      const ch = ((s.fy2027 - s.fy2026) / s.fy2026) * 100;
      const com = s.policyActions.filter((a) => a.committed);
      const np = com.filter((a) => a.status === "No Progress").length;
      return [s.state, m(s.fy2026), m(s.fy2027), `${ch >= 0 ? "+" : ""}${ch.toFixed(1)}%`, s.putToWork != null ? `${m(s.putToWork)} · ${((s.putToWork / s.fy2026) * 100).toFixed(0)}%` : "—", `${com.length}${np ? ` (${np} no progress)` : ""}`];
    }), [20, 14, 14, 12, 24, 16]),
  src("“Put to work” is the amount each state reported to CMS as obligated through July 31, 2026, as a share of its Year 1 award. Commitments counts the state-policy actions CMS lists the state as having committed to; CMS counts some sub-commitments separately, so its own totals can be higher. Oregon: CMS's obligated-funds report lists a Year 1 award of $192,271,577.67, $5 million below the $197,271,578 in the December 2025 award table and the snapshot; the table uses the award table."),
  H2("State-by-state review notes"),
  P("What has been reported about each state's Year 1, restating only what each named source says. Vermont is covered in Part 1. Kentucky had published no concrete Year 1 facts beyond its total award when this was compiled."),
);
for (const s of S.states) {
  if (s.slug === "vermont") continue;
  const n = N[s.slug];
  add(H3(`${s.state} — Year 1 ${m(s.fy2026)} · Year 2 ${m(s.fy2027)}`));
  if (!n) { add(P("No review notes yet.")); continue; }
  for (const x of n.notes) add(B(`${x.text} (Source: ${n.sources[x.src].label})`));
  for (const q of n.quotes) add(P(`“${q.q}” — ${q.who} (${n.sources[q.src].label})`));
}

add(
  new Paragraph({ children: [new PageBreak()] }),
  H1("Sources"),
  P("All source files are saved in the project folder (book-audit/deep/sources/rht_vt and rht_states). Primary documents:"),
  ...[SRC.list, SRC.budget, SRC.activities, SRC.july, SRC.feb, SRC.jan, SRC.cmsFy26 + " — cms.gov/newsroom", SRC.cmsFy27 + " — cms.gov/newsroom", SRC.cmsFact, SRC.cmsObl + " — medicaid.gov", SRC.cmsSnap + " — medicaid.gov", SRC.vtdSep10, SRC.vtdNov2, SRC.vtdNov11, SRC.aaf].map((x) => B(x)),
);

build(process.argv[2], "The Rural Health Transformation Program, Reviewed", "HTR — RHT Program Review", c, "20 November 2026");
