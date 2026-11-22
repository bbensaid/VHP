// Medicare for All — five-pillar sequencing memo for the author (M4A plan, Phase 2).
// Every fact comes from book-audit/deep/sources/m4a/VERIFIED_FACTS_M4A.md (Vermont hospital/Act 68 facts from
// book-audit/deep/VERIFIED_FACTS.md). Usage: node m4a_memo.js <out.docx>
const { Paragraph, TextRun, PageBreak } = require("./node_modules/docx");
const { P, H1, H2, H3, B, table, box, gap, build, OK_FILL, WARN_FILL, NOTE_FILL } = require("./docstyle");

const NAVY = "1F3A5F";
const c = [];
const add = (...x) => c.push(...x.flat());
const src = (t) => new Paragraph({ spacing: { after: 160 }, children: [new TextRun({ text: "Source: " + t, size: 16, italics: true, color: "666666" })] });
const brk = () => new Paragraph({ children: [new PageBreak()] });
const verdict = (gate, lines) => box("HTR assessment — " + gate, lines, gate.startsWith("CLOSED") ? WARN_FILL : gate.startsWith("OPEN") ? OK_FILL : NOTE_FILL);
const equity = (q, lines) => [H3("The equity question: " + q), ...lines.map((l) => P(l))];

const S = {
  act48: "Act 48 of 2011 (H.202) as enacted, approved May 26, 2011",
  hsiao: "Joint Fiscal Office, Hsiao Report Overview (Act 128 of 2010), report released January 2011",
  plan13: "Agency of Administration / UMass Medical School & Wakely, Health Care Reform Financing Plan (Act 48, Sec. 9), January 24, 2013",
  avalere: "Avalere Health, evaluation of the 2013 financing plan, November 14, 2013 (commissioned by Vermont Partners for Health Care Reform, a provider and employer coalition)",
  gmc14: "Green Mountain Care: A Comprehensive Model for Building Vermont's Universal Health Care System, submitted by Gov. Shumlin, December 30, 2014",
  slides14: "Shumlin administration, Green Mountain Care Financing slides, December 17, 2014",
  erisa: "29 U.S.C. § 1144 (ERISA § 514), U.S. Code 2023 edition",
  s1332: "42 U.S.C. § 18052 (ACA § 1332), U.S. Code 2023 edition",
  s1506: "S.1506, Medicare for All Act (119th Congress), introduced text; Congress bill-status record updated Nov 20, 2026",
  hr3069: "H.R.3069, Medicare for All Act (119th Congress), introduced text; bill-status record updated Oct 23, 2026",
  hr10924: "H.R.10924, Medicare for America Act of 2026, introduced text and CRS summary",
  cbo: "CBO Director Phillip Swagel, testimony to the Senate Budget Committee, May 12, 2022 (summarising CBO Working Papers 2020-08 and 2022-02)",
  rollcall: "Roll Call, “Sanders: ‘Medicare for All’ will be HELP priority”, November 18, 2026",
  yahoo: "Yahoo News (A. Romano), final 2026 midterm results, November 20, 2026",
  baldwin: "Sen. Baldwin press release on the Medicare at 50 Act, November 10, 2026 (republished by Urban Milwaukee)",
  ow: "Oliver Wyman, Act 167 report to the GMCB (2024; updated January 31, 2025)",
  gcr: "AHS, Global Commitment Register notice GCR 26-089",
  act68: "Act 68 of 2025 as enacted",
};

// ── Title
add(
  new Paragraph({ spacing: { before: 600, after: 200 }, children: [new TextRun({ text: "Health Transformation Review", size: 44, bold: true, color: NAVY, font: "Arial" })] }),
  new Paragraph({ spacing: { after: 360 }, children: [new TextRun({ text: "Medicare for All Through the Five-Pillar Test: What Vermont's Single-Payer Attempt Teaches the Federal Debate", size: 34, color: NAVY, font: "Arial" })] }),
  P("This memo applies the book's sequencing test to Medicare for All. It sets out what Vermont tried between 2011 and 2014, why the state abandoned it, how a federal program differs from a state one, and then takes each pillar in build order, ending each with an HTR assessment. The assessments are sequencing judgments, whether each pillar can issue what the pillars downstream of it need. They are not a position for or against the policy."),
  P("**Prepared:** 21 November 2026, by Claude (Claude Code), for Bechir Ben Said. Every fact comes from a document saved in the project (book-audit/deep/sources/m4a), named beside it. Passages marked **Analysis** are this memo's reasoning, not a finding of any source."),
  box("Contents", [
    "1. The answer in brief",
    "2. Medicare for All, single payer, and what Vermont built",
    "3. Vermont 2011–2014: Act 48 and Green Mountain Care",
    "4. Why a federal program is not a larger Vermont",
    "5. The federal bills side by side",
    "6. The five-pillar test: Policy, Technology, Economics, Clinical, Operations",
    "7. The sequencing verdict",
    "8. What this means for the platform, the Academy and the book",
    "9. What is not yet verified",
    "Sources",
  ], OK_FILL),
  brk(),
);

// ── 1. Brief
add(
  H1("1. The answer in brief"),
  B("**Vermont did not fail at the idea; it failed at the gates it could not open.** Act 48 made Green Mountain Care conditional on a federal waiver, a financing law and a board finding that the plan would not harm the economy. In December 2014 the Governor would not propose the financing: the plan needed $2.58 billion of new revenue in its first year, including an 11.5% payroll tax, and still ran a deficit from its third year."),
  src(`${S.act48}, 33 V.S.A. § 1822; ${S.gmc14}, pp. 6, 51`),
  B("**Three of Vermont's walls were federal, and a federal law can remove them.** A state cannot run Medicare, cannot bind self-insured employer plans because ERISA pre-empts state law, and can capture only the ACA subsidy stream through a § 1332 waiver. S.1506 folds Medicare and Medicaid funding into one trust fund, amends ERISA itself, and needs no waiver."),
  src(`${S.erisa}; ${S.s1332}; ${S.s1506}, §§ 701, 801, 901`),
  B("**The wall that killed Vermont is still standing federally: financing.** Neither S.1506 nor H.R.3069 contains a revenue title. CBO has never scored a Sanders bill. Across five designs it estimated, federal health spending would rise by $1.5 to $3.0 trillion in 2030, and GDP would be about 1% to 10% lower by 2030 if the cost were paid through a payroll or income tax."),
  src(S.cbo),
  B("**Policy authority, the first gate, is closed for now.** Democrats will hold 56 Senate seats in January, but the President keeps the veto and Republicans keep enough seats to filibuster most bills. S.1506 has 19 Senate cosponsors and no committee action since April 2025. Under the book's sequencing rule, no downstream pillar can open while authority has not been issued."),
  src(`${S.yahoo}; ${S.s1506}`),
  box("The sequencing verdict in one line", ["Policy **CLOSED** → Technology **CONDITIONALLY OPEN** → Economics **CLOSED** → Clinical **NOT YET TESTABLE** → Operations **CLOSED**. The useful work now is in the pillars that can be built before authority arrives: data, payment design and workforce. That is also where Vermont already has assets, among them the unified health care database (VHCURES), Act 68 global budgets and the GMCB."], NOTE_FILL),
  brk(),
);

// ── 2. Definitions
add(
  H1("2. Medicare for All, single payer, and what Vermont built"),
  P("The three terms are often used interchangeably. They are not the same thing, and the differences decide which of Vermont's problems apply."),
  table(["Term", "What it means here", "Example"], [
    ["Single payer", "One public plan pays for covered care for everyone in a jurisdiction, replacing private insurers for those benefits. Providers stay public or private.", "The design Hsiao recommended to Vermont in 2011 (a “public-private single payer”)"],
    ["Medicare for All (the bill)", "A specific federal single-payer design: one national program for every U.S. resident, no premiums, no cost-sharing (except an optional drug schedule), duplicate private coverage unlawful, Medicare and Medicaid folded in.", "S.1506 (Sanders); H.R.3069 (Jayapal)"],
    ["Medicare for America", "A federal universal program that is not single payer: employer coverage may continue, premiums are capped at 8% of income, and the bill carries its own taxes.", "H.R.10924 (DeLauro, Oct 2026)"],
    ["Medicare buy-in", "An option to join Medicare earlier. It is not universal coverage.", "Medicare at 50 Act (Baldwin, Nov 2026)"],
    ["Green Mountain Care", "A state universal plan for residents, publicly financed, but by law secondary to Medicare, federal plans and (without waivers) Medicaid. It was never implemented.", "Act 48 of 2011"],
  ], [20, 52, 28]),
  src(`${S.hsiao}; ${S.s1506}; ${S.hr10924}; ${S.baldwin}; ${S.act48}, § 1827`),
  P("**Analysis.** Green Mountain Care was single payer only for the people and dollars a state can reach. Medicare beneficiaries, federal employees, the military and self-insured employer plans sat outside it by law. That boundary, not the idea of single payer, is what Section 4 is about."),
);

// ── 3. Vermont
add(
  H1("3. Vermont 2011–2014: Act 48 and Green Mountain Care"),
  H2("What Act 48 did"),
  B("**Created the Green Mountain Care Board** on July 1, 2011: a chair and four members, nominated by a nominating committee and confirmed like a superior judge (18 V.S.A. § 9374). The Board outlived the single-payer plan and is today's hospital budget and rate regulator."),
  B("**Created the health benefit exchange** (enrolling by November 1, 2013), intended, “to the extent allowable under federal law or a waiver”, to become the mechanism for Green Mountain Care."),
  B("**Made all residents eligible**, “regardless of whether an employer offers health insurance”."),
  B("**Did not finance it.** Section 9 ordered financing plans by January 15, 2013. Implementation would come 90 days after the last of five triggers."),
  src(`${S.act48}, §§ 1801, 1822, 1824, 9374; Secs. 9, 34`),
  table(["Act 48 trigger (33 V.S.A. § 1822)", "What happened"], [
    ["1. ACA § 1332 waiver received", "Not obtained. In 2014 the methodology was still under discussion with federal agencies, and the expected pass-through had fallen from $267M (2013 plan) to $106M"],
    ["2. Law establishing the financing", "Never proposed: the Governor withdrew on December 17, 2014"],
    ["3. GMCB approves benefit package", "Not reached"],
    ["4. Appropriations enacted", "Not reached"],
    ["5. GMCB finds: ≥80% actuarial value; no negative impact on the economy; sustainable financing; lower admin cost; slower cost growth; adequate provider pay", "Not reached. The 2014 balance sheet showed deficits from 2019"],
  ], [48, 52]),
  src(`${S.act48}, § 1822; ${S.plan13}, Table 7; ${S.gmc14}, pp. 6, 40, 51`),
  H2("How the estimates moved, 2011 → 2014"),
  table(["Report", "Key estimate", "Note"], [
    ["Hsiao (Jan 2011)", "Accumulated savings of 16.1%–25.3%, depending on option; payroll-tax financed; start in 2015", "The report called the savings “inherently uncertain”"],
    ["State financing plan (Jan 2013)", "$1,611M to be publicly financed in 2017; Medicare stays outside ($1,613M); ACA waiver $267M", "Did not name revenue sources"],
    ["Avalere (Nov 2013)", "$1.9–$2.2B, about 20–35% above the state figure", "Paid for by a provider and employer coalition"],
    ["Shumlin report (Dec 2014)", "Cost $4,340M; new revenue needed $2,580M (2017); 11.5% payroll tax plus a 0–9.5% income premium; fund position −$2M in 2019, −$154M in 2021", "No phase-in for small businesses, though the Governor called a phase-in a priority"],
  ], [22, 50, 28]),
  src(`${S.hsiao}, pp. 1–4; ${S.plan13}, p. 59; ${S.avalere}, pp. 1–2; ${S.gmc14}, Table 13, p. 51`),
  H2("Why it was abandoned, in the state's own words"),
  P("“On December 17, 2014, after receiving our recommendations on the policy choices necessary to implement public financing, the Governor announced that he could not recommend that the legislature move forward with public financing at this time. Given the current economic climate and other factors, the risk of economic shock is too high.”"),
  src(`${S.gmc14}, p. 6`),
  P("The December 17 slides list the headwinds behind that decision:"),
  B("Federal and state funding came in lower than expected: the ACA waiver estimate fell by $161M, and state Medicaid funding was $150M below the 2013 estimate."),
  B("Replacing provider taxes would cost $158M."),
  B("There was a $75M General Fund reduction over FY16–17."),
  B("Easing small businesses into the plan would reduce revenue by more than $500M."),
  B("A cheaper 80% actuarial-value plan was only 14% less expensive."),
  src(S.slides14),
);

// ── 4. Federal vs state
add(
  H1("4. Why a federal program is not a larger Vermont"),
  P("The author's question: why would federal Medicare for All differ from Vermont's failed state plan? Each wall below is shown with the document that put it there and the clause of S.1506 that would remove it."),
  table(["Vermont's wall", "Source of the wall", "What the 2014 plan had to do", "What S.1506 does"], [
    ["**Medicare**: a state cannot run it", "Act 48 could only direct the state to “seek permission” from CMS to administer Medicare; failing that, GMC is the secondary payer (§ 1827(e))", "Left 140,000 Medicare enrollees on Medicare; $1.6B of Medicare spending stayed outside", "§ 901 ends separate Medicare benefits; § 701 moves Medicare's appropriation into the program's trust fund"],
    ["**ERISA**: a state cannot bind employer plans", "ERISA “shall supersede any and all State laws insofar as they … relate to any employee benefit plan” (29 U.S.C. § 1144(a)); only Hawaii's 1974 law is exempt", "Employers could keep self-insured plans, with GMC secondary; about 150,000 Vermonters were in self-insured plans in 2010", "§ 801 amends ERISA itself: no employee benefit plan may duplicate program benefits"],
    ["**Federal dollars**: a state gets only what a waiver passes through", "§ 1332 can waive only ACA exchange and subsidy rules, and only if the plan “will not increase the Federal deficit”; the pass-through equals the subsidies that would otherwise have been paid", "$106M of federal ACA money against a $4.34B program; Medicaid match depended on keeping the § 1115 waiver terms", "Congress appropriates directly; no waiver is needed"],
    ["**Tax base**: one small state", "Act 48 § 1829: the Green Mountain Care Fund is the “single source”, and federal funds enter only “if authorized by a waiver”", "$2.58B of new state revenue in 2017: an 11.5% payroll tax plus an income premium of up to 9.5%", "**Not solved by the bill**: S.1506 names no revenue source (see below)"],
  ], [17, 30, 27, 26]),
  src(`${S.act48}; ${S.erisa}; ${S.s1332}; ${S.plan13}, pp. 15, 59; ${S.gmc14}, pp. 16, 19, 40, 51; ${S.s1506}`),
  H2("What a federal law does not remove"),
  B("**The financing question.** S.1506 § 701 funds its trust fund from existing Medicare, Medicaid, FEHB and other federal health appropriations, plus “the net increase in revenues” from §§ 801 and 902, neither of which levies a tax. The bill's only tax-code amendment is a premium-credit rule for transition enrollees. H.R.3069 has the same structure. H.R.10924, by contrast, carries a surtax, payroll and excise taxes."),
  B("**The cost uncertainty Vermont met at the end.** Every Vermont estimate rose as it came closer to enactment ($1.61B → $2.58B in new revenue). CBO found national health spending could fall by $0.7T or rise by $0.3T in 2030 depending on design, mainly on provider payment rates and whether long-term care is covered."),
  B("**Who still sits outside.** S.1506 leaves the VA, TRICARE and the Indian Health Service unchanged (§ 901(c)). That is a far smaller group than the Medicare-and-ERISA population Vermont could not reach."),
  src(`${S.s1506}, §§ 701, 901; ${S.hr3069}, § 701; ${S.hr10924}; ${S.cbo}`),
  P("**Analysis.** The federal version removes the walls that stopped Vermont from becoming a true single payer, but it moves the decisive wall, financing, from Montpelier to Congress without dismantling it. Vermont's Act 48 shows what happens when a design reaches its financing trigger without a financing law."),
);

// ── 5. Bills
add(
  H1("5. The federal bills side by side"),
  table(["", "S.1506 Medicare for All", "H.R.3069 Medicare for All", "H.R.10924 Medicare for America", "Medicare at 50 Act"], [
    ["Sponsor", "Sanders (I-VT)", "Jayapal (D-WA)", "DeLauro (D-CT)", "Baldwin (D-WI)"],
    ["Introduced", "Apr 29, 2025", "Apr 29, 2025", "Oct 29, 2026", "Nov 10, 2026"],
    ["Cosponsors", "19, all Democrats (Vermont: Welch)", "118, all Democrats (Vermont: Balint)", "0", "9 senators"],
    ["Status", "Referred to Finance; no further action", "Referred to Energy & Commerce and six other committees", "Referred to Ways & Means and five other committees", "Bill number not yet seen"],
    ["Who is covered", "Every U.S. resident", "Every U.S. resident", "All U.S. residents", "Ages 50–64 may buy in"],
    ["Phase-in", "Full benefits on Jan 1 of the 4th calendar year after enactment; children in year 1; buy-in at 55 / 45 / 35", "2 years after enactment; under-19 and 55+ after 1 year", "Fully implemented in 2028; public option on exchanges 2028–29", "—"],
    ["Private / employer coverage", "Duplicate coverage unlawful (§ 107); ERISA amended (§ 801)", "Same", "Qualified employer coverage kept", "Unchanged"],
    ["Premiums and cost-sharing", "None, except an optional drug schedule", "None", "Premium capped at 8% of income; $0 below 200% FPL", "Medicare premiums with ACA-equivalent credits"],
    ["Long-term care", "Home and community-based care federal; institutional care stays in state Medicaid", "Institutional and home care both federal", "Home and community-based care covered", "—"],
    ["Hospital payment", "Quarterly global budgets (§ 611)", "Quarterly global budgets (§ 611)", "—", "Medicare rules"],
    ["Revenue title", "**None**", "**None**", "Surtax, payroll, investment-income and excise taxes", "—"],
  ], [16, 21, 21, 22, 20]),
  src(`${S.s1506}; ${S.hr3069}; ${S.hr10924}; ${S.baldwin}`),
  P("**Analysis.** Medicare at 50 is the alternative with the fewest gates. It reaches the near-retirement group whose marketplace premiums doubled in 2026, according to Baldwin's release, and it needs no restructuring of hospital payment. It is a Policy-pillar action that depends on almost nothing downstream, which is why it can move first."),
  src(S.baldwin),
  brk(),
);

// ── 6. Pillars
add(
  H1("6. The five-pillar test"),
  P("Each pillar issues one currency that the pillars downstream need: Policy issues **authority**, Technology **information**, Economics **incentives**, Clinical **outcomes** and Operations **capacity**. A gate opens only when that currency has actually been issued. Intention does not open a gate, and a rising trend is not an open gate."),
  P("Each pillar below ends with the equity question the framework asks of it, followed by the HTR assessment."),

  H2("Policy — does the authority exist?"),
  P("Medicare for All needs **mandatory, national authority**: a universal entitlement, the power to make duplicate coverage unlawful, the power to amend ERISA, and the power to merge Medicare and Medicaid funding. S.1506 writes all four (§§ 102, 107, 801, 901, 701)."),
  P("Vermont's Act 48 had the opposite profile. The state could legislate universality for residents but had to make the plan secondary to everything federal law reserved."),
  P("**Where authority stands (21 November 2026):**"),
  B("Democrats hold 56 Senate seats and about 257 House seats from January."),
  B("“Trump still has veto power, and Senate Republicans still hold enough seats to filibuster most bills.”"),
  B("Sanders says Democrats “could bring it about through the filibuster-proof budget reconciliation process.”"),
  B("S.1506 sits in the Finance Committee, with no action since referral. It has 19 Senate cosponsors (Wyden of Finance among them), well short of a 56-member majority."),
  B("Jeffries calls the Medicare eligibility age “all part of an ongoing conversation”."),
  B("Baldwin and nine others back the narrower Medicare at 50."),
  src(`${S.yahoo}; ${S.rollcall}; ${S.s1506}; ${S.baldwin}`),
  P("**Analysis.** Whether S.1506's non-budgetary provisions, such as the ERISA amendment and the ban on duplicate coverage, could pass through reconciliation is a parliamentary question. This memo has no source on it and does not answer it."),
  ...equity("does the mandate close disparities or widen them?", [
    "Universal entitlement with no cost-sharing closes the coverage and price gaps by design.",
    "The equity risk in the Policy pillar is a mandate passed without the financing law. Vermont's Act 48 had exactly that gap.",
  ]),
  verdict("CLOSED (authority not issued)", [
    "Authority exists in bill text, not in law. While Policy → Economics, a critical-path gate, is closed, no payment reform built on S.1506 can open.",
    "Analysis: with the veto and the filibuster in place, the realistic window for the full bill is after the current presidential term (January 2029), unless a narrower measure, such as a buy-in or a lower Medicare age, is signed first.",
    "What would open this gate: an enacted statute carrying an enacted financing title. Vermont shows both are needed.",
  ]),

  H2("Technology — can the system know what it is paying for?"),
  P("A national health budget and hospital global budgets need **information**: historical volume, costs and outcomes for every provider."),
  P("S.1506 builds on machinery that already exists rather than ordering a new build:"),
  B("Global budgets are negotiated from the previous three years' volume of each service and each provider's Medicare cost report, compared with other providers (§ 611(b))."),
  B("The fee schedule leverages “existing Medicare payment processes” (§ 612(b))."),
  B("The Secretary must create uniform reporting standards and a national database covering practitioners, costs, quality, outcomes and “the equity of health among population groups” (§ 401(b))."),
  src(`${S.s1506}, §§ 401, 611, 612`),
  P("**Analysis.** Medicare's cost-report and fee-schedule systems give the program a working starting point. That is why this gate is rated conditionally open. The gap is the volume history for patients now covered privately, which today sits with private insurers."),
  P("Vermont already has a working example. Act 48 Sec. 27 directed the state's unified health care database (VHCURES, 18 V.S.A. § 9410) to serve the Green Mountain Care Board, including for comparing costs between treatment settings, effective October 1, 2011."),
  src(`${S.act48}, Sec. 34(f)`),
  ...equity("does the data make disparities visible, or bury them in averages?", [
    "§ 401(b) puts equity among population groups into the national database's mandate, and § 616 creates an Office of Health Equity.",
    "The test will be whether rural and small-hospital data are reported separately or averaged into regions. The regional offices (§ 403) are the level at which global budgets are negotiated.",
  ]),
  verdict("CONDITIONALLY OPEN", [
    "The information the Economics pillar needs mostly exists today in Medicare's systems, and the bill reuses them.",
    "The gate opens fully only when private-payer volume and cost data are brought under the § 401 reporting standards. That work can start before authority arrives, and Vermont's unified health care database (VHCURES) is a working model.",
  ]),

  H2("Economics — are the incentives real, and is the money there?"),
  P("S.1506's incentive design is specific:"),
  B("Quarterly lump-sum **global budgets** for hospitals, nursing facilities and dialysis, treated as “payment in full for all operating expenses” (§ 611)."),
  B("A national **fee schedule** for clinicians (§ 612)."),
  B("Annually **negotiated drug prices** and a formulary (§ 614)."),
  B("A separate **capital budget**, with priority for underserved areas (§ 615(b))."),
  B("A ban on payments used for marketing or for “the profit or net revenue of the provider” (§ 615(a))."),
  P("This is the direction Vermont's Act 68 already points: hospital global budgets by fiscal year 2028 for some non-critical-access hospitals, “to the extent that resources are available”, and reference-based pricing."),
  src(`${S.s1506}, §§ 611–615; ${S.act68}`),
  P("**The money is not there.** The bill names no revenue. CBO estimated, across five designs:"),
  B("Federal health subsidies in 2030 would rise by **$1.5 trillion to $3.0 trillion**."),
  B("A lower payment-rate scenario (hospitals −13%, physicians −7%, drugs −23%) cuts national spending by 9% relative to the higher-rate scenario, but also cuts the supply of care by 2%."),
  B("If financed through payroll or income taxes, GDP would be about 1% to 10% lower by 2030."),
  B("Borrowing to pay for it indefinitely “would be unsustainable”."),
  src(S.cbo),
  P("**The Vermont evidence on global budgets is sobering:**"),
  B("Vermont's Medicaid hospital global budget, launched January 1, 2026, was not approved by CMS under the Global Commitment waiver terms. Payments stopped July 31, 2026, and the January–July payments are being reprocessed as fee-for-service."),
  B("Nine of 14 Vermont hospitals ran operating losses in 2023."),
  src(`${S.gcr}; ${S.ow}`),
  ...equity("do the incentives reward serving the hardest-to-reach, or penalize it?", [
    "S.1506 lets a hospital's budget be adjusted for efforts to reduce disparities in rural areas and health professional shortage areas (§ 611(b)(2)(G)), and gives capital priority to underserved areas (§ 615(b)(2)).",
    "The risk is the low-rate path. Analysis: if budgets are set from Medicare-level costs, hospitals already running deficits start the global budget behind.",
  ]),
  verdict("CLOSED (no financing; design untested at scale)", [
    "The incentive architecture is specific and consistent with Vermont's own Act 68 direction, but an incentive without the money behind it is not an incentive.",
    "Two gates feed Economics: Policy → Economics (critical path) is closed, and Technology → Economics (critical path) is only conditionally open.",
    "Vermont's 2014 report is the precedent: the design was finished and the financing could not be found.",
  ]),

  H2("Clinical — would care, and outcomes, change?"),
  P("S.1506 removes price at the point of care (§ 202). It routes quality standards through CMS's Center for Clinical Standards and Quality (§ 501) and creates an Office of Primary Health Care charged with national access goals for underserved areas (§ 617)."),
  P("CBO's finding is the clinical constraint: virtually everyone would be enrolled and would use more care. But “the increase in demand for personal health care would exceed the increase in supply, resulting in greater unmet demand”, with “delays and forgone care”."),
  src(`${S.s1506}, §§ 202, 501, 617; ${S.cbo}`),
  P("Long-term care is where the two House and Senate bills differ most. S.1506 leaves institutional long-term care in state Medicaid, with a maintenance-of-effort requirement. H.R.3069 makes it a federal benefit. In 2014 Green Mountain Care excluded long-term care, adult dental, vision and hearing."),
  src(`${S.s1506}, § 204; ${S.hr3069}, § 204; ${S.gmc14}, p. 20`),
  ...equity("effective — and effective for whom?", [
    "Removing cost-sharing helps most the people who now forgo care because of price.",
    "When demand outruns supply, the shortfall falls first on places that already lack clinicians. The bill's answer is the primary-care goals in § 617 and budget adjustments for shortage areas.",
    "The book's question, effective for whom, cannot be answered until payment is live.",
  ]),
  verdict("NOT YET TESTABLE", [
    "Economics → Clinical is a critical-path dependency, and Economics is closed. No clinical outcome can be credited to a program whose payment model has not started.",
    "The design flags the right risk (supply), and CBO quantifies its direction.",
  ]),

  H2("Operations — is there capacity to run it?"),
  P("Operations issues **capacity**: the people, systems and institutions that carry the change through."),
  B("**A displaced workforce.** S.1506 sets aside at least 1% of the national health budget for up to five years for workers in insurance administration who may lose jobs, covering wage replacement, retirement benefits, retraining and preferential hiring (§ 602)."),
  B("**Regional offices** built where possible on CMS's own (§ 403)."),
  B("**Health-professional education** as a budget component (§ 601(a)(2)(E))."),
  B("**A four-year transition** (§ 106)."),
  src(`${S.s1506}, §§ 106, 403, 601, 602`),
  P("Vermont's 2014 report found the transition was the expensive part: easing small businesses in “is necessary but extremely expensive”, worth more than $500M in lost revenue."),
  P("Vermont also starts with limited capacity: Oliver Wyman projected 13 of 14 hospitals in operating loss by 2028."),
  P("CBO warns that payment below projected levels “might cause fewer people to enter health care professions”, and that providers unable to adjust “could cease to operate”."),
  src(`${S.slides14}; ${S.ow}; ${S.cbo}`),
  ...equity("executable everywhere, including the rural and under-resourced?", [
    "The capacity gap is widest where hospitals are smallest and furthest apart.",
    "A national program run through regional offices must show it can negotiate a sustainable budget for a critical-access hospital, not only for an academic medical centre.",
  ]),
  verdict("CLOSED (capacity not yet built)", [
    "The bill funds the worker transition and the regional offices, but capacity is the last gate and it inherits every closed gate upstream.",
    "Workforce is the one lever Vermont can pull today without any federal action.",
  ]),
  brk(),
);

// ── 7. Verdict
add(
  H1("7. The sequencing verdict"),
  table(["Pillar", "Currency it must issue", "HTR assessment", "What would open it"], [
    ["Policy", "Authority", "CLOSED", "An enacted statute with an enacted financing title; or a narrower buy-in signed into law"],
    ["Technology", "Information", "CONDITIONALLY OPEN", "Private-payer volume and cost data brought under national reporting standards (Vermont's VHCURES is a model)"],
    ["Economics", "Incentives", "CLOSED", "Named revenue, plus a global-budget method that works for small and rural hospitals"],
    ["Clinical", "Outcomes", "NOT YET TESTABLE", "Live payment, and supply growth that keeps pace with new demand"],
    ["Operations", "Capacity", "CLOSED", "Workforce pipeline, worker transition and regional administration in place before benefits begin"],
  ], [14, 18, 22, 46]),
  P("**Analysis.** Medicare for All follows the book's central argument: a reform fails when it starts its downstream pillars before the upstream gates are open."),
  P("Vermont reached its financing gate with everything else designed, and stopped. The federal debate is at the Policy gate now. The sequencing lesson is to build what does not depend on that gate: data standards, a tested global-budget method for small hospitals, and workforce. That work is valuable whether the end state is Medicare for All, Medicare for America or a buy-in at 50."),
  P("That is also Vermont's position under Act 68."),
);

// ── 8. Next phases
add(
  H1("8. What this means for the platform, the Academy and the book"),
  P("These are the remaining phases of the plan you approved. Each will be built only from the sources behind this memo."),
  B("**Platform:** a Medicare for All hub (/policy/medicare-for-all), an Act 48 / Green Mountain Care case page, and a briefing. The existing /policy/feasibility page cites the 2023 bill and says there is “no Senate majority”; both are now out of date and will be corrected."),
  B("**Single-Payer Modeler:** national scenarios built on CBO's ranges, plus Vermont's named hospitals under a global budget. Hospital data will come from GMCB budget filings."),
  B("**Academy:** a course of seven tracks, about 18–20 lessons, following this memo's structure."),
  B("**Book:** a section in Chapter 2 on Act 48 and why Green Mountain Care was abandoned, cross-referenced to Chapter 1's sequencing rule rather than re-deriving it. Chapter 14 is added only if Chapter 2 cannot carry it. Narration will be re-recorded only for chapters that change."),
);

// ── 9. Open
add(
  H1("9. What is not yet verified"),
  P("Nothing below appears in this memo as fact."),
  B("CBO's option-by-option tables (Working Paper 2020-08; the 2019 design report). The CBO website refuses automated downloads, so only the Director's summary testimony was read."),
  B("Whether reconciliation could carry S.1506's non-budgetary provisions."),
  B("Any cost estimate of S.1506 or H.R.3069. None is known to exist."),
  B("The Medicare at 50 Act's bill number and text."),
  B("The full Hsiao report beyond the Joint Fiscal Office overview."),
);

// ── Sources
add(
  H1("Sources"),
  P("All files are saved in book-audit/deep/sources/m4a, with page-level notes in VERIFIED_FACTS_M4A.md. Vermont hospital and Act 68 facts come from book-audit/deep/VERIFIED_FACTS.md."),
  ...Object.values(S).map((x) => B(x)),
);

build(process.argv[2], "Medicare for All Through the Five-Pillar Test", "HTR — Medicare for All memo", c, "21 November 2026");
