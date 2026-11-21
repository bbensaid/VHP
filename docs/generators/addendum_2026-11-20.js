const { Paragraph, TextRun } = require("./node_modules/docx");
const { P, H1, H2, B, table, box, gap, build, OK_FILL, WARN_FILL } = require("./docstyle");

const NAVY = "1F3A5F";
const c = [];
const add = (...x) => c.push(...x.flat());

add(
  new Paragraph({ spacing: { before: 600, after: 200 }, children: [new TextRun({ text: "Health Transformation Review", size: 44, bold: true, color: NAVY, font: "Arial" })] }),
  new Paragraph({ spacing: { after: 360 }, children: [new TextRun({ text: "Documentation Addendum 2: 20 November 2026", size: 34, color: NAVY, font: "Arial" })] }),
  P("File this with the three guides of 14 November and Addendum 1 of 15 November. It covers the work done on 20 November 2026: the Rural Health Transformation (RHT) Program Year 2 update, the new RHT Program Review pages, and the completion of earlier unfinished work. Where this addendum and an earlier page disagree, this addendum is correct."),
  P("**Prepared:** 20 November 2026, by Claude (Claude Code), for Bechir Ben Said. Every figure below was taken from a document that was downloaded or opened that day; the source files are saved in the project folder."),
  box("In short", [
    "**New:** an RHT Program Review section on the website — a full Year 1 review of Vermont and a review page for each of the 50 states.",
    "**Updated:** Vermont's Year 2 award ($189,996,036) on the website, in the Academy and in the book.",
    "**Finished:** the Academy fact-check (all 19 courses), 34 scrambled Academy tables, the book-to-Academy link check, and the AI Analyst's test set (now 50 questions).",
    "**Still open:** audiobook re-recording (in progress), technical clean-up, Kentucky's review notes, and your book upload (Section 7).",
  ], OK_FILL),
  gap(),
  P("**Contents:** 1. RHT Year 2 award  ·  2. The RHT Program Review pages  ·  3. Book changes  ·  4. Academy changes  ·  5. AI Analyst test set  ·  6. Updating the review data  ·  7. Still open"),
);

add(
  H1("1. RHT Year 2 award"),
  P("CMS announced the Year 2 (FY2027) awards on 9 November 2026: $10 billion across all 50 states."),
  table(["", "Year 1 (FY2026)", "Year 2 (FY2027)"], [
    ["Vermont award", "$195,053,740", "$189,996,036"],
    ["Change", "", "−$5,057,704 (−2.6%), the second-largest dollar decrease after Florida (American Action Forum)"],
    ["Two-year total", "", "$385,049,776"],
  ], [28, 30, 42]),
  gap(),
  B("**How Year 2 was set:** half of the $10 billion is split equally ($100 million per state); the other half follows a formula of rural need, plan initiatives, state policy actions and technical factors, and from Year 2 also reflects each state's progress on its plan (CMS fact sheet)."),
  B("**Deadlines:** Vermont's Year 1 money had to be committed by 30 October 2026 (met, per the state) and spent by 30 September 2027. All program money must be spent by 30 September 2032 or returned to the Treasury."),
);

add(
  H1("2. The RHT Program Review pages (new)"),
  P("The platform is called Health Transformation Review, so the program now has a review section, not just a description. Three kinds of pages:"),
  table(["Page", "What it shows", "Built from"], [
    ["/rht-review", "All 50 states: Year 1 and Year 2 awards, change, money “put to work” by 31 July 2026, and the policy commitments CMS scored. Sortable.", "CMS award tables, CMS obligated-funds report, CMS state snapshots"],
    ["/rht-review/vermont", "The full Year 1 review of Vermont (below)", "State of Vermont agreements list, budget and legislative reports; CMS; VTDigger"],
    ["/rht-review/<state>", "Each other state's awards, CMS spending figures and policy scores, plus sourced “review notes” for 48 of 49 states", "CMS documents; state agency releases; news reports"],
  ], [20, 50, 30]),
  gap(),
  H2("Vermont's Year 1 review: the six findings"),
  B("**Committed on time.** 242 signed agreements total $182,154,948.14 — matching the state's own total. The list leaves out provider payments and administration."),
  B("**Committed is not spent.** Vermont reported $28,369,910.31 “put to work” to CMS as of 31 July 2026 (14.5% of the award). CMS says these figures alone do not measure progress."),
  B("**Most money went to regionalization:** $87.5 million (48%), led by $36.5 million in facility upgrades."),
  B("**Money moved between budget lines** versus the January plan: more for facility upgrades, pharmacist test-to-treat, AI scribes and mental-health integration; less for team-based care, the shared EHR and the McKinsey analytics contract."),
  B("**No outcomes yet.** No published document reports a patient, access or cost result; an independent evaluator (NORC, $815,989) is under contract."),
  B("**Year 2 is smaller,** and CMS rates Vermont's one policy commitment (a SNAP food-restriction waiver) “No Progress.” CMS does not explain individual state changes, so the review does not claim a cause."),
  P("The page also lists every agreement and recipient, the 15 largest recipients, what Vermont reported to CMS, quotes from state officials and legislators, two opinion pieces (labelled as opinion), what to watch next, and all sources."),
  H2("Other website changes"),
  B("The Vermont RHT Program page now shows both awards, signed amounts per investment area, and a link to the review. It wrongly said 47 states were funded (all 50 were); its CMS and AHS links were also fixed."),
  B("Year 2 wording updated on the Act 68, data-space (UHDS), H.R. 1 tracker, simulator and regulation-calendar pages. Each state dashboard now shows its Year 2 award and links to its review."),
  B("Menus, the site map and chapter links include the review. Three automated tests now check the review's key figures on every run."),
);

add(
  H1("3. Book changes (in HTR_Book_v42.docx)"),
  P("Surgical edits only, with a backup taken first (book-backups/HTR_Book_v42_20261120-212249.docx). The affected pages were rendered and checked, and the format check is clean."),
  table(["Where", "Was", "Now"], [
    ["Ch. 6, legislator box", "“$195 million for its first year, with future-year amounts not yet published”", "“$195 million for its first year and $190 million for its second (FY2027)”"],
    ["Ch. 16, Figure 16.5", "“awards run through FY2030, later years set annually”", "“FY2027 award $190M (November 2026); awards run through FY2030”"],
    ["Appendix G, G.3.1", "“with amounts for 2027–2030 not yet published”", "“and $190M for its second (2027), with amounts for 2028–2030 set annually”"],
    ["Appendix B, timeline", "Last RHT spending date 30 September 2031", "30 September 2032 (CMS), with the CMS fact sheet added to the sources"],
  ], [22, 39, 39]),
  gap(),
  box("Your step", ["Upload the updated HTR_Book_v42.docx to Google Docs and export the PDF, as usual. The website reader's Chapter 6 and 16 pages were regenerated automatically."], WARN_FILL),
);

add(
  H1("4. Academy changes"),
  H2("RHT Year 2"),
  P("Six lessons updated with the FY2027 award and the fact that Year 1 was fully committed by 30 October 2026; one lesson corrected to call the program a cooperative agreement, not a grant (as the state itself describes it)."),
  H2("Fact-check of all 19 courses: complete"),
  P("The sentence-by-sentence check that stopped on 28 October is finished. Corrections made on 20 November, each against an opened source:"),
  table(["Course", "Corrections"], [
    ["Revenue Cycle", "Receivables over 90 days benchmark aligned to 10% (one lesson said 15%)"],
    ["HIE & Health Reform", "Information-blocking complaint count (2,450 claims, HHS, July 2026); HIPAA penalty cap ($2,134,831 as of Aug 2024); an outdated payment-model share removed"],
    ["Genomics", "Human Genome Project cost $2.7 billion (not $3 billion, five places); Precision Medicine Initiative history; Cures Act NIH account $4.796 billion; All of Us enrollment (over 880,000); FDA pharmacogenomic table (517 pairs); BRCA risk figures; an unsourced Vermont Medicaid share removed"],
    ["Five Pillars", "Primary-care shortfall breakdown matched to the book (112 family medicine, 190 internal medicine, 52 OB/GYN)"],
    ["Value-Based Care", "Advanced APM bonus schedule; federal hospital social-needs screening measures removed by CMS in 2025; Medicare Advantage Health Equity Index cancelled in April 2026"],
    ["AI & Machine Learning", "EU AI Act deadlines moved by the 2026 Digital Omnibus (2 Dec 2027; medical devices 2 Aug 2028); an unsourced incident count removed"],
    ["Interoperability", "TEFCA exception date; Carequality volume replaced with a sourced figure"],
  ], [24, 76]),
  gap(),
  H2("Other Academy fixes"),
  B("**34 tables in 33 lessons** had their columns scrambled into alphabetical order by Sanity. All re-posted in reading order; table headers now display without underscores."),
  B("**Book-to-Academy check:** every course, track and lesson the book names exists under that exact title; all pass."),
  P("Every changed lesson was backed up before editing (sanity-backups/ in the project folder)."),
);

add(
  H1("5. AI Analyst test set"),
  P("The question set used to test the AI Analyst's answers grew from 14 to 50. The 36 new answers are sentences quoted word for word from the book, so the test introduces no new claims. One old question about an “HTI composite score” was removed because the platform no longer has that score. Every pillar now has at least six questions."),
);

add(
  H1("6. Updating the review data later"),
  P("CMS said it will refresh its spending report after states' 30 November 2026 quarterly reports. When it does, ask Claude to “refresh the RHT review data.” The steps are in the runbook (section 11.1). The scripts check themselves: each year's awards must add up to $10.0 billion, and Vermont's agreements must match the state's printed total."),
  P("State review notes are added one source at a time; Claude opens each source before writing a note, and saves the source text in the project folder."),
);

add(
  H1("7. Still open"),
  table(["Item", "Status", "Who"], [
    ["Audiobook re-recording", "All 18 sections changed since October. Transcripts are updated; recording was in progress (local, free); then upload to Supabase", "Claude, next session"],
    ["Book upload and PDF", "Upload the edited .docx to Google Docs and export the PDF", "You"],
    ["Kentucky review notes", "The state has published no concrete Year 1 facts beyond its total", "Claude, when published"],
    ["Technical clean-up (roadmap 1.7)", "Code warnings and package advisories; rebuilding the backend's Python environment needs your permission (standing rule)", "Your decision"],
    ["Earlier open items", "The .com domain renewal, GitHub Support request and before-launch list (Addendum 1, Section 7) are unchanged unless you have done them", "You"],
  ], [26, 52, 22]),
);

build(process.argv[2], "HTR Documentation Addendum 2, 20 November 2026", "HTR Documentation Addendum 2", c, "20 November 2026");
