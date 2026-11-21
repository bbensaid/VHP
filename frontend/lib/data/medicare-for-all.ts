/**
 * Medicare for All and Vermont's single-payer attempt — the platform's one data source for
 * /policy/medicare-for-all and /policy/medicare-for-all/vermont-act-48 (and, later, the
 * Single-Payer Modeler and the Academy course).
 *
 * EVERY figure here was read in a saved primary document on `M4A_AS_OF`:
 *   book-audit/deep/sources/m4a/  (index: README.md; page cites: VERIFIED_FACTS_M4A.md)
 * Do not add a figure that is not in that ledger. Interpretive lines are marked `analysis: true`
 * and are rendered as HTR analysis, never as a finding of a source.
 */

export const M4A_AS_OF = "2026-11-21";

export interface M4ASource {
  id: string;
  publisher: string;
  title: string;
  date: string;
  url: string;
  note?: string;
}

const LEG = "https://legislature.vermont.gov/Documents";

export const M4A_SOURCES: Record<string, M4ASource> = {
  act48: { id: "act48", publisher: "Vermont General Assembly", title: "Act 48 of 2011 (H.202), as enacted", date: "Approved May 26, 2011", url: `${LEG}/2012/Docs/ACTS/ACT048/ACT048%20As%20Enacted.pdf` },
  hsiao: { id: "hsiao", publisher: "Joint Fiscal Office (N. Langweil)", title: "Hsiao Report Overview (Act 128 of 2010)", date: "Report released January 2011", url: `${LEG}/2016/WorkGroups/Senate%20Health%20and%20Welfare/Health%20Care%20Reform/W~Nolan%20Langweil~Hsiao%20Report%20Overview%20(Act%20128%20of%202010)~1-16-2015.pdf` },
  plan13: { id: "plan13", publisher: "Vermont Agency of Administration; UMass Medical School & Wakely", title: "Health Care Reform Financing Plan in accordance with Act 48, Section 9", date: "January 24, 2013", url: `${LEG}/2014/WorkGroups/House%20Health%20Care/Financing%20Plan/W~Robin%20Lunge~Health%20Care%20Reform%20Financing%20Plan%20In%20Accordance%20with%20Act%2048,%20Section%209~1-25-2013.pdf` },
  avalere: { id: "avalere", publisher: "Avalere Health", title: "Evaluation of Vermont's health care reform financing plan", date: "November 14, 2013", url: `${LEG}/2014/WorkGroups/Health%20Care%20Oversight/Health%20Care%20Reform%20Financing%20Plan/W~Bob%20Atlas~Avalere%20Report%C2%A6%20Evaluation%20of%20Vermont%20Health%20Care%20Reform%20Financing%20Plan~11-14-2013.pdf`, note: "Commissioned by Vermont Partners for Health Care Reform, a provider and employer coalition" },
  gmc14: { id: "gmc14", publisher: "Office of Gov. Peter Shumlin", title: "Green Mountain Care: A Comprehensive Model for Building Vermont's Universal Health Care System", date: "December 30, 2014", url: `${LEG}/2016/WorkGroups/Senate%20Finance/Reports%20and%20Resources/W~Vermont%20Health%20Care%20Reform%20Office~Green%20Mountain%20Care%20Financing%20Report%20(Act%2048%20of%202011)~1-15-2015.pdf` },
  erisa: { id: "erisa", publisher: "U.S. Code (2023 ed.)", title: "29 U.S.C. § 1144 — ERISA § 514, other laws (preemption)", date: "2023", url: "https://www.govinfo.gov/content/pkg/USCODE-2023-title29/html/USCODE-2023-title29-chap18-subchapI-subtitleB-part5-sec1144.htm" },
  s1332: { id: "s1332", publisher: "U.S. Code (2023 ed.)", title: "42 U.S.C. § 18052 — ACA § 1332, waiver for state innovation", date: "2023", url: "https://www.govinfo.gov/content/pkg/USCODE-2023-title42/html/USCODE-2023-title42-chap157-subchapIII-partD-sec18052.htm" },
  s1506: { id: "s1506", publisher: "U.S. Senate, 119th Congress", title: "S.1506, Medicare for All Act (introduced text; bill status updated Nov 20, 2026)", date: "April 29, 2025", url: "https://www.govinfo.gov/content/pkg/BILLS-119s1506is/xhtml/BILLS-119s1506is.html" },
  hr3069: { id: "hr3069", publisher: "U.S. House, 119th Congress", title: "H.R.3069, Medicare for All Act (introduced text; bill status updated Oct 23, 2026)", date: "April 29, 2025", url: "https://www.govinfo.gov/content/pkg/BILLS-119hr3069ih/xhtml/BILLS-119hr3069ih.html" },
  hr10924: { id: "hr10924", publisher: "U.S. House, 119th Congress", title: "H.R.10924, Medicare for America Act of 2026 (introduced text)", date: "October 29, 2026", url: "https://www.govinfo.gov/content/pkg/BILLS-119hr10924ih/xml/BILLS-119hr10924ih.xml" },
  cbo: { id: "cbo", publisher: "Congressional Budget Office (P. Swagel)", title: "A Single-Payer Health Care System That Is Based on Medicare's Fee-for-Service Program — testimony to the Senate Budget Committee", date: "May 12, 2022", url: "https://collections.nlm.nih.gov/txt/nlm:nlmuid-9918471188406676-pdf", note: "National Library of Medicine copy; CBO publication 57973" },
  rollcall: { id: "rollcall", publisher: "Roll Call (H. Campbell)", title: "Sanders: 'Medicare for All' will be HELP priority", date: "November 18, 2026", url: "https://rollcall.com/2026/11/18/sanders-medicare-for-all-will-be-help-priority" },
  yahoo: { id: "yahoo", publisher: "Yahoo News (A. Romano)", title: "Final 2026 midterm election results: Democrats clinch 56-seat Senate majority", date: "November 20, 2026", url: "https://www.yahoo.com/news/politics/article/final-2026-midterm-election-results-democrats-clinch-56-seat-senate-majority-with-peltolas-alaska-win-what-they-can--and-cant--do-next-184618858.html" },
  baldwin: { id: "baldwin", publisher: "Office of Sen. Tammy Baldwin (republished by Urban Milwaukee)", title: "Baldwin Leads Colleagues in Introducing Bill to Lower Age of Medicare Eligibility to 50", date: "November 10, 2026", url: "https://urbanmilwaukee.com/?p=1237070" },
};

/** One-paragraph answer used by the hub hero. */
export const M4A_BRIEF = {
  headline: "Medicare for All, through the five-pillar test",
  dek: "Vermont tried single payer first. Act 48 of 2011 promised universal coverage, and in December 2014 the state stopped because it could not pay for it. The federal bills remove three of the walls Vermont hit. They do not remove the fourth: financing.",
};

export interface M4AFact { value: string; label: string; cite: string[] }

export const M4A_FACTS: M4AFact[] = [
  { value: "$2.58B", label: "new revenue Vermont needed in 2017, the plan's first year: an 11.5% payroll tax plus an income premium of up to 9.5%", cite: ["gmc14"] },
  { value: "19", label: "Senate cosponsors of S.1506, all Democrats; no committee action since April 2025", cite: ["s1506"] },
  { value: "$1.5–3.0T", label: "added federal health spending in 2030 across CBO's five single-payer designs", cite: ["cbo"] },
  { value: "None", label: "revenue provisions in S.1506 or H.R.3069", cite: ["s1506", "hr3069"] },
];

export interface Definition { term: string; meaning: string; example: string; cite: string[] }

export const M4A_DEFINITIONS: Definition[] = [
  { term: "Single payer", meaning: "One public plan pays for covered care for everyone in a jurisdiction, replacing private insurers for those benefits. Hospitals and clinicians can remain public or private.", example: "Hsiao's recommended option for Vermont (2011): a \"public-private single payer\"", cite: ["hsiao"] },
  { term: "Medicare for All (the bills)", meaning: "A specific federal single-payer design: one national program for every U.S. resident, with no premiums and no cost-sharing apart from an optional drug schedule. Duplicate private coverage becomes unlawful, and Medicare and Medicaid are folded in.", example: "S.1506 (Sanders); H.R.3069 (Jayapal)", cite: ["s1506", "hr3069"] },
  { term: "Medicare for America", meaning: "A federal universal program that is not single payer. Employer coverage may continue, premiums are capped at 8% of income, and the bill carries its own taxes.", example: "H.R.10924 (DeLauro, October 2026)", cite: ["hr10924"] },
  { term: "Medicare buy-in", meaning: "An option to join Medicare before age 65. It is not universal coverage.", example: "Medicare at 50 Act (Baldwin, November 2026)", cite: ["baldwin"] },
  { term: "Green Mountain Care (Act 48)", meaning: "A state universal plan for Vermont residents, publicly financed but required by law to pay after Medicare, federal plans and, without waivers, Medicaid. It was never implemented.", example: "Act 48 of 2011, 33 V.S.A. § 1827", cite: ["act48"] },
];

export interface Wall { wall: string; source: string; vermont: string; federal: string; solved: boolean; cite: string[] }

/** Why a federal program is not a larger Vermont. */
export const M4A_WALLS: Wall[] = [
  {
    wall: "Medicare: a state cannot run it",
    source: "Act 48 directed the state to \"seek permission\" from CMS to administer Medicare. If CMS said no, Green Mountain Care would pay only after Medicare (33 V.S.A. § 1827(e)).",
    vermont: "The 2014 plan left 140,000 Medicare enrollees on Medicare. The 2013 plan put the Medicare spending that stayed outside at $1.6 billion.",
    federal: "S.1506 § 901 ends separate Medicare benefits, and § 701 moves Medicare's appropriation into the program's trust fund.",
    solved: true, cite: ["act48", "gmc14", "plan13", "s1506"],
  },
  {
    wall: "ERISA: a state cannot bind employer health plans",
    source: "ERISA \"shall supersede any and all State laws insofar as they … relate to any employee benefit plan\" (29 U.S.C. § 1144(a)). The only statutory exemption is Hawaii's 1974 law.",
    vermont: "Employers could keep their own self-insured plans, with Green Mountain Care paying second. About 150,000 Vermonters were in self-insured plans in 2010.",
    federal: "S.1506 § 801 amends ERISA itself: no employee benefit plan may duplicate the program's benefits.",
    solved: true, cite: ["erisa", "gmc14", "plan13", "s1506"],
  },
  {
    wall: "Federal dollars: a state gets only what a waiver passes through",
    source: "ACA § 1332 lets a state waive only exchange and subsidy rules, and only if the plan \"will not increase the Federal deficit\". The state receives the subsidies that would otherwise have been paid.",
    vermont: "The federal pass-through estimate fell from $267 million (2013) to $106 million (2014), against a $4.34 billion program.",
    federal: "Congress appropriates the money directly, so no waiver is needed.",
    solved: true, cite: ["s1332", "plan13", "gmc14"],
  },
  {
    wall: "Financing: someone has to raise the money",
    source: "Under Act 48 § 1829 the Green Mountain Care Fund is the \"single source\", and federal money enters only \"if authorized by a waiver\".",
    vermont: "The plan needed $2.58 billion of new revenue in 2017 (an 11.5% payroll tax plus an income premium of up to 9.5%) and still ran deficits from 2019.",
    federal: "Not solved. S.1506 and H.R.3069 name no revenue source. H.R.10924 does: a surtax, payroll and excise taxes.",
    solved: false, cite: ["act48", "gmc14", "s1506", "hr3069", "hr10924"],
  },
];

export interface BillRow { label: string; s1506: string; hr3069: string; hr10924: string; m50: string }

export const M4A_BILLS: BillRow[] = [
  { label: "Sponsor", s1506: "Sanders (I-VT)", hr3069: "Jayapal (D-WA)", hr10924: "DeLauro (D-CT)", m50: "Baldwin (D-WI)" },
  { label: "Introduced", s1506: "Apr 29, 2025", hr3069: "Apr 29, 2025", hr10924: "Oct 29, 2026", m50: "Nov 10, 2026" },
  { label: "Cosponsors", s1506: "19, all Democrats (VT: Welch)", hr3069: "118, all Democrats (VT: Balint)", hr10924: "0", m50: "9 senators" },
  { label: "Status", s1506: "Referred to Finance; no further action", hr3069: "Referred to Energy & Commerce and six other committees", hr10924: "Referred to Ways & Means and five other committees", m50: "Bill number not yet published" },
  { label: "Who is covered", s1506: "Every U.S. resident", hr3069: "Every U.S. resident", hr10924: "All U.S. residents", m50: "Ages 50–64 may buy in" },
  { label: "Phase-in", s1506: "Full benefits Jan 1 of the 4th calendar year after enactment; children in year 1; buy-in at 55, then 45, then 35", hr3069: "Full benefits 2 years after enactment; under-19s and 55+ after 1 year", hr10924: "Fully implemented 2028; a public option on the exchanges 2028–29", m50: "—" },
  { label: "Employer and private coverage", s1506: "Duplicate coverage unlawful (§ 107); ERISA amended (§ 801)", hr3069: "Same", hr10924: "Qualified employer coverage kept", m50: "Unchanged" },
  { label: "Premiums and cost-sharing", s1506: "None, except an optional drug schedule", hr3069: "None", hr10924: "Premium capped at 8% of income; $0 below 200% FPL", m50: "Medicare premiums, with ACA-level subsidies" },
  { label: "Long-term care", s1506: "Home and community care covered federally; institutional care stays in state Medicaid", hr3069: "Institutional and home care both federal", hr10924: "Home and community care covered", m50: "—" },
  { label: "Hospital payment", s1506: "Quarterly global budgets (§ 611)", hr3069: "Quarterly global budgets (§ 611)", hr10924: "—", m50: "Existing Medicare rules" },
  { label: "Revenue title", s1506: "None", hr3069: "None", hr10924: "Surtax; payroll, investment-income and excise taxes", m50: "—" },
];

export type GateStatus = "CLOSED" | "CONDITIONALLY OPEN" | "NOT YET TESTABLE" | "OPEN";

export interface PillarVerdict {
  pillar: "policy" | "technology" | "economics" | "clinical" | "operations";
  name: string;
  currency: string;
  status: GateStatus;
  needs: string;
  bill: string;
  evidence: string;
  equity: string;
  verdict: string;
  opens: string;
  cite: string[];
}

/** The HTR assessment per pillar, in build order (book Ch.1 §1.9). Sequencing judgments, not policy positions. */
export const M4A_PILLARS: PillarVerdict[] = [
  {
    pillar: "policy", name: "Policy", currency: "Authority", status: "CLOSED",
    needs: "Mandatory national authority: a universal entitlement, the power to make duplicate coverage unlawful, to amend ERISA, and to merge Medicare and Medicaid funding.",
    bill: "S.1506 writes all four (§§ 102, 107, 801, 901, 701). Vermont's Act 48 could make every resident eligible, but it had to rank behind everything that federal law reserves.",
    evidence: "Democrats will hold 56 Senate seats in January. \"Trump still has veto power, and Senate Republicans still hold enough seats to filibuster most bills.\" Sanders says Democrats could use budget reconciliation. S.1506 has 19 cosponsors and has had no committee action. Baldwin and nine others back the narrower Medicare at 50.",
    equity: "Does the mandate close disparities or widen them? Universal coverage with no cost-sharing closes the coverage and price gaps by design. The risk is a mandate passed without a financing law, which is exactly the gap Act 48 had.",
    verdict: "Authority exists in bill text, not in law. While Policy → Economics, a critical-path gate, stays closed, no payment reform built on S.1506 can begin.",
    opens: "An enacted statute with an enacted financing title, or a narrower buy-in signed into law.",
    cite: ["s1506", "act48", "yahoo", "rollcall", "baldwin"],
  },
  {
    pillar: "technology", name: "Technology", currency: "Information", status: "CONDITIONALLY OPEN",
    needs: "Historical volume, costs and outcomes for every provider. A national budget and hospital global budgets cannot be set without them.",
    bill: "Hospital budgets are negotiated from the past three years of service volume and each hospital's Medicare cost report (§ 611(b)). The fee schedule uses Medicare's existing payment processes (§ 612(b)). A national database must report on equity across population groups (§ 401(b)).",
    evidence: "The bill reuses Medicare's systems rather than ordering a new build. Act 48 Sec. 27 pointed Vermont's unified health care database (VHCURES) at the same kind of cost comparison.",
    equity: "Does the data make disparities visible, or bury them in averages? The § 401(b) database must report equity among population groups. The test is whether small rural hospitals are reported on their own or averaged into a region.",
    verdict: "The information Economics needs mostly exists in Medicare's systems, and the bill reuses them. The gap is volume history for patients who are privately insured today.",
    opens: "Private-payer volume and cost data brought under the § 401 reporting standards. This work can start before authority exists.",
    cite: ["s1506", "act48"],
  },
  {
    pillar: "economics", name: "Economics", currency: "Incentives", status: "CLOSED",
    needs: "Payment that rewards the intended behaviour, backed by money that actually exists.",
    bill: "Quarterly global budgets treated as \"payment in full for all operating expenses\" (§ 611); a national fee schedule (§ 612); negotiated drug prices (§ 614); a separate capital budget; and no payments toward a provider's \"profit or net revenue\" (§ 615).",
    evidence: "There is no revenue title. CBO: federal subsidies would rise by $1.5–3.0 trillion in 2030. A lower-rate scenario (hospitals −13%, physicians −7%, drugs −23%) cuts national spending by 9% but also cuts the supply of care by 2%. GDP would be about 1% to 10% lower by 2030 if the cost were paid with payroll or income taxes.",
    equity: "Do the incentives reward serving the hardest-to-reach, or penalize it? A hospital's budget may be adjusted for work on rural and shortage-area disparities (§ 611(b)(2)(G)), and capital spending goes first to underserved areas (§ 615(b)(2)). Hospitals already running deficits would start the global budget behind.",
    verdict: "The incentive design is specific and points the same way as Vermont's Act 68, but an incentive without the money behind it does not work. Vermont's 2014 design was finished and stopped exactly here.",
    opens: "A named source of revenue, and a global-budget method shown to work for small and rural hospitals.",
    cite: ["s1506", "cbo", "gmc14"],
  },
  {
    pillar: "clinical", name: "Clinical", currency: "Outcomes", status: "NOT YET TESTABLE",
    needs: "Changes in care that produce measurable outcomes.",
    bill: "No cost-sharing (§ 202); quality standards run through CMS (§ 501); an Office of Primary Health Care with national access goals (§ 617). Long-term care is split: S.1506 leaves institutional care in state Medicaid, while H.R.3069 makes it federal.",
    evidence: "CBO expects \"the increase in demand for personal health care [to] exceed the increase in supply, resulting in greater unmet demand\", with \"delays and forgone care\". Green Mountain Care (2014) would not have covered long-term care, adult dental, adult vision or hearing.",
    equity: "Effective, and effective for whom? Removing cost-sharing helps most the people who now skip care because of price. When demand outruns supply, the shortfall lands first where clinicians are already scarce.",
    verdict: "Economics → Clinical is a critical-path dependency, and Economics is closed. No outcome can be credited to a program whose payment model has not started.",
    opens: "Payment that is actually running, and a supply of care that grows as fast as new demand.",
    cite: ["s1506", "hr3069", "cbo", "gmc14"],
  },
  {
    pillar: "operations", name: "Operations", currency: "Capacity", status: "CLOSED",
    needs: "The people, systems and institutions that carry the change through.",
    bill: "At least 1% of the national health budget, for up to five years, goes to workers displaced from insurance administration (§ 602). Regional offices are built on CMS's own (§ 403). Health-professional education has its own budget line (§ 601). The transition takes four years (§ 106).",
    evidence: "Vermont's 2014 report found that easing small businesses into the plan was \"absolutely critical\" and unaffordable. CBO warns that low payment \"might cause fewer people to enter health care professions\".",
    equity: "Executable everywhere, including rural and under-resourced areas? A program run through regional offices must show it can negotiate a sustainable budget for a critical-access hospital, not just for an academic medical center.",
    verdict: "The bill pays for the worker transition and the regional offices. But capacity is the last gate, and it inherits every gate still closed upstream.",
    opens: "A workforce pipeline, the worker transition and regional administration all in place before benefits begin.",
    cite: ["s1506", "gmc14", "cbo"],
  },
];

export interface TimelineEvent { date: string; title: string; body: string; cite: string[] }

export const ACT48_TIMELINE: TimelineEvent[] = [
  { date: "Jan 2011", title: "The Hsiao report", body: "Commissioned under Act 128 of 2010, the report designed three options and recommended a public-private single payer financed by a payroll tax, starting in 2015. It estimated accumulated savings of 16.1% to 25.3% and called them \"inherently uncertain\".", cite: ["hsiao"] },
  { date: "May 26, 2011", title: "Act 48 signed", body: "Act 48 created the Green Mountain Care Board, the state health benefit exchange and Green Mountain Care, a universal plan for all residents to start 90 days after five conditions were met. It did not include financing.", cite: ["act48"] },
  { date: "Jul 1, 2011", title: "The Green Mountain Care Board is created", body: "A chair and four members, nominated by a nominating committee and confirmed in the same way as a superior judge. The Board outlived the single-payer plan.", cite: ["act48"] },
  { date: "Jan 24, 2013", title: "First financing plan", body: "The state's plan put the publicly financed amount at $1.61 billion for 2017. It assumed $267 million from an ACA waiver and kept $1.6 billion of Medicare spending outside the plan. It named no revenue sources.", cite: ["plan13"] },
  { date: "Nov 14, 2013", title: "Avalere critique", body: "Avalere, commissioned by a provider and employer coalition, judged a cost of $1.9–$2.2 billion more appropriate. It noted that the state has no power over self-insured employer plans under ERISA.", cite: ["avalere"] },
  { date: "Dec 17, 2014", title: "The Governor stops", body: "Gov. Shumlin announced he could not recommend public financing: \"the risk of economic shock is too high.\"", cite: ["gmc14"] },
  { date: "Dec 30, 2014", title: "The final report", body: "The cost was $4.34 billion in 2017, with $2.58 billion of it new revenue: an 11.5% payroll tax and an income premium of up to 9.5%. The fund would be in deficit from 2019, and that was before any phase-in for small businesses.", cite: ["gmc14"] },
];

export interface Trigger { trigger: string; outcome: string }

export const ACT48_TRIGGERS: Trigger[] = [
  { trigger: "A waiver under ACA § 1332", outcome: "Not obtained. In 2014 the method for calculating it was still under discussion with federal agencies, and the expected pass-through had fallen from $267M to $106M." },
  { trigger: "A law establishing the financing", outcome: "Never proposed. The Governor withdrew on December 17, 2014." },
  { trigger: "Board approval of the benefit package", outcome: "Not reached" },
  { trigger: "Appropriations enacted", outcome: "Not reached" },
  { trigger: "Board findings: benefits worth at least 80% of costs; no negative effect on Vermont's economy; sustainable financing; lower administrative costs; slower cost growth; enough pay to recruit and keep providers", outcome: "Not reached. The 2014 balance sheet showed deficits from 2019." },
];

export interface BalanceRow { label: string; values: number[] }

/** Table 13, Green Mountain Care balance sheet ($ millions), 2017–2021 (gmc14 p.51). */
export const GMC_BALANCE = {
  years: [2017, 2018, 2019, 2020, 2021],
  rows: [
    { label: "Cost of coverage and operations", values: [-4340, -4579, -4820, -5001, -5177] },
    { label: "Federal Medicaid match", values: [1310, 1364, 1413, 1445, 1505] },
    { label: "Federal ACA waiver funding", values: [106, 118, 122, 125, 132] },
    { label: "State Medicaid", values: [344, 341, 350, 358, 366] },
    { label: "New revenue needed", values: [-2580, -2756, -2935, -3073, -3174] },
    { label: "Payroll tax (11.5%)", values: [1510, 1542, 1574, 1606, 1639] },
    { label: "Public premium (0–9.5% of income)", values: [1247, 1306, 1359, 1372, 1381] },
    { label: "Fund position", values: [177, 92, -2, -95, -154] },
  ] as BalanceRow[],
  cite: ["gmc14"],
};
