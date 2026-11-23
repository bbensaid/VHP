// Part II (sections 14-18): tool reference, book-platform-Academy crosswalk, persona playbooks, presenting HTR, onboarding checklists.
// Tool and chapter data come from frontend/lib/taxonomy via data/taxonomy_2026-11-23.json; course data from the Supabase snapshot.
const fs = require("fs");
const path = require("path");
module.exports = ({ S, T, SC, H, add }) => {
  const { P, H1, H2, B, N, table, box } = H;
  const X = JSON.parse(fs.readFileSync(path.join(__dirname, "data/taxonomy_2026-11-23.json"), "utf8"));
  const tool = Object.fromEntries(X.tools.map(t => [t.id, t]));
  const pil = p => ({ policy: "Policy", technology: "Technology", economics: "Economics", clinical: "Clinical", operations: "Operations", equity: "Equity" }[p] || p);
  const tl = id => tool[id] ? tool[id].label : id;
  const th = id => tool[id] ? tool[id].href : "";
  const course = t => S.courses.find(c => c.title.startsWith(t));
  const ct = t => { const c = course(t); return c ? `${c.title} (${c.lessons} lessons)` : t; };

  // ───────── 14 Tool reference
  const toolRows = X.tools.map(t => [t.label, t.pillars.map(pil).join(" + "), (t.chapters || []).join(", ") || "—", t.desc, t.href]);
  add(
    H1("14. Tool reference: all 45 tools"),
    P("This is the complete list of tools registered in frontend/lib/taxonomy/tools.ts on 23 November 2026, with the one-line description each tool carries in the code. Addresses are relative to any of the four domains. A tool's chapters are the book chapters whose “Work This Chapter on the Platform” tables send readers to it."),
    box("How to read the tools", [
      "**Tools teach logic; they do not replace your data.** Where a tool uses illustrative benchmarks or synthetic patients it says so on the page (for example the Clinical Quality Optimizer's percentile benchmarks are illustrative approximations, and High vs. Low Value Care runs on synthetic Vermont patients). Use them to rehearse a decision, then bring your own numbers.",
      "**Equity is a lens, not a sixth pillar.** Tools marked Equity apply across the pillars. Tools carrying two pillars serve both.",
    ]),
    table(["Tool", "Pillar", "Ch.", "What it does", "Address"], toolRows, [16, 14, 6, 40, 24]),
    P("**Tools by pillar:** " + ["policy", "technology", "economics", "clinical", "operations", "equity"].map(p => `${pil(p)} ${X.tools.filter(t => t.pillars[0] === p).length}`).join(" · ") + " (counted by each tool's first-listed pillar)."),
  );

  // ───────── 15 Crosswalk
  const rows = X.chapters.map(ch => {
    const num = ch.num;
    const courses = S.courses.filter(c => c.ch === num).map(c => c.title);
    const tools = (ch.links || []).map(l => typeof l === "string" ? tl(l) : l.label);
    return [num[0].toUpperCase() + num.slice(1), ch.title.replace(/ — .*$/, ""), courses.join("; ") || "—", tools.join("; ") || "—"];
  });
  add(
    H1("15. Crosswalk: book chapter → Academy course → tools"),
    P("The book, the Academy and the tools are one system. This table is built from the same sources the website uses: chapters.ts for the book's platform links and each course's chapter reference in Supabase. Use it to plan a reading, a course of study or a workshop around any chapter."),
    table(["Ch.", "Chapter (short title)", "Academy course(s) tied to the chapter", "Tools the chapter sends readers to"], rows, [7, 25, 33, 35]),
    P("Two Academy courses are not tied to a single chapter: Five Pillars, One Imperative (8 tracks, 24 lessons) walks the whole framework, and Health Equity Analytics (5 tracks, 18 lessons) extends Chapter 10. Start Here is tied to Chapter 1 and is the right first course for any new reader."),
  );

  // ───────── 16 Persona playbooks
  add(
    H1("16. Playbooks: how each kind of person should use HTR"),
    P("Each playbook is a path through real pages, courses and tools, sized as a first hour and a first month. The tool and course names are exactly those in the platform today."),
    H2("16.1 Hospital or health-system executive"),
    P("**Question this person brings:** what do payment reform and the 2028 timeline mean for my organization's finances, and are we ready?"),
    N(`First hour: read Chapter 6 (Global Budgets, Reference-Based Pricing) in /read; run the ${tl("hospital-stress-test")} (${th("hospital-stress-test")}) with your own revenue mix; open the ${tl("vbc-readiness")} (${th("vbc-readiness")}) for a 30-dimension self-assessment.`),
    N(`First week: take ${ct("Hospital Finance")} and ${ct("Value-Based Care")}; model a contract in the ${tl("shared-savings-calc")} and screen it against the ${tl("vbc-contract-checklist")}; read the Political Sustainability course for how reform survives election cycles.`),
    N(`First month: run the ${tl("global-budget-modeler")} for your hospital; use ${ct("Transformation Leadership")} to build a capacity assessment, triage list and scenario table; write the three-page plan that course ends with.`),
    H2("16.2 Policy analyst or state official"),
    P("**Question:** what are the legal and program levers, what have other states done, and how do I test a design?"),
    N(`First hour: read Chapters 2–3; open the ${tl("policy-simulator")} and the ${tl("single-payer-modeler")} for Vermont; compare states on /rht-review and /dashboard.`),
    N(`First week: take ${ct("CMMI Models")} (federal-state interface, waivers, H.R. 1 changes) and ${ct("Medicare for All")}; check each claim you intend to cite in the ${tl("evidence-library")}, which labels its sources as peer-reviewed, agency self-report or HTR synthesis.`),
    N(`First month: use the ${tl("policy-impact-assessment")} on a live proposal; follow bills in The Wire; read ${ct("Health Equity Analytics")} to write indicator specifications with targets stated as a gap and a level.`),
    H2("16.3 Clinician or quality leader"),
    P("**Question:** how do I run a medical home, collaborative care, quality improvement and care transitions in a practice, and what will payment reward?"),
    N(`First hour: read Chapters 8–9; open the ${tl("clinical-quality-optimizer")} (HEDIS simulator first) and ${tl("high-low-value-care")}.`),
    N(`First week: take ${ct("Clinical Transformation Toolkit")} (primary care, behavioral health integration, quality mechanics, data and transitions) and ${ct("Clinical Quality Measurement")}.`),
    N(`First month: run the ${tl("risk-stratification-engine")} against your panel to find high-risk patients without care management; finish the Toolkit's capstone, a one-page practice plan with owners, budget and measures.`),
    H2("16.4 Technology or data leader"),
    P("**Question:** what must be built first, what is required by law, and how do I govern AI?"),
    N(`First hour: read Chapters 4–5; open the ${tl("fhir-lab")} and the ${tl("ai-governance-lab")} (62 items across 8 domains).`),
    N(`First week: take ${ct("FHIR, AI Governance")} and ${ct("Healthcare Interoperability")}; use the ${tl("fhir-implementation-guide")} for the three priority use cases.`),
    N(`First month: model a statewide or regional record with the ${tl("statewide-ehr-lab")}; run the ${tl("cin-shared-services")} for shared services; write the sequencing and policy capstone.`),
    H2("16.5 Student, new hire or researcher"),
    N("First hour: take Start Here (5 lessons); skim the Preface and Introduction; ask the AI Analyst “what is the execution sequence?” and open its cited sources."),
    N("First week: Five Pillars, One Imperative (24 lessons); use the Glossary; open the Research Lab and try one tool per pillar."),
    N("First month: choose a pillar course; use Personalized Learning to build a week-by-week path; earn the course certificate (public check at /verify/<code>)."),
    H2("16.6 Investor or consultant"),
    N(`First hour: open the ${tl("investment-tracker")} (22 sourced deals, each with a sequencing check against Vermont's gate status) and the ${tl("transformation-friction-index")}.`),
    N(`First week: read Chapters 7, 14 and 15; take ${ct("Portfolio Management")} and ${ct("Political Sustainability")}; run the ${tl("portfolio-sequencing-test")} on a portfolio of initiatives.`),
    N("First month: use the 50-state RHT review to see where federal dollars are going; on the Solutions domains, open Advisory Services for how engagements are scoped (see the engagement form caveat in Section 9.5)."),
  );

  // ───────── 17 Presenting HTR
  add(
    H1("17. Presenting HTR to partners, clients and employees"),
    P("This section is a briefing you can speak from. Every claim is one this document verifies; nothing here describes customers, revenue or outcomes that do not exist. Where the honest answer is “not yet”, it says so, because partners test that first."),
    H2("17.1 The one-paragraph pitch"),
    box("HTR in one paragraph", [
      "Health Transformation Review is a single framework for transforming a state health system, delivered four ways that reinforce each other: a book that makes the argument, an Academy that teaches it, a platform of 45 tools and intelligence pages that apply it, and an AI Analyst that answers questions from all of it with sources. The framework has five pillars executed in sequence and held to an Equity Imperative; Vermont, which has mandated payment reform on a statutory timeline, is the worked example, and the same method applies to any state.",
    ]),
    H2("17.2 What is inside, in numbers (23 November 2026)"),
    table(["Component", "Proof points you can state"], [
      ["Book", "Preface, Introduction, 16 chapters, Conclusion, Appendices A–H; web reader, PDF and 18 audio narrations; each chapter ends by naming the tools and courses to use"],
      ["Academy", `${T.courses} courses, ${T.tracks} tracks, ${T.lessons} lessons, every one with a full lesson body, objectives, takeaways, a knowledge check and numbered sources; certificates with a public check link`],
      ["Platform", "45 tools across all five pillars and the equity lens; 73 policy analyses; live headline feed; 50-state rural health dashboard; the 50-state RHT Program Review with itemized award lists for 27 states; a Vermont Act 68 simulator; a single-payer modeler"],
      ["AI Analyst", `${S.t_data_rag_documents.toLocaleString("en-US")} searchable passages from the book, lessons, analyses and reference documents; every answer shows its sources; Sanity edits reach it in about a minute`],
      ["Method", "Facts are checked against primary sources before publishing; unverifiable claims are deleted; each lesson ends with numbered sources; differences between book and source are reported, not hidden"],
      ["Cost to run", "About $40–45 a month plus one email user: the platform is lean enough to be sustained without outside funding"],
    ], [18, 82]),
    H2("17.3 Why it is different"),
    B("**One framework, everywhere.** Pages, courses, tools, chapters and library passages carry the same pillar tags, so a reader can move from an idea to a lesson to a tool to a cited answer without leaving the framework."),
    B("**Sequencing is the argument.** The framework says reform fails when pillars are funded out of order. A gate engine and checks (the Investment Sequencing Check, Portfolio Sequencing Test and HTR Simulator) turn that claim into something a user can test on their own plan."),
    B("**Equity is measured, not asserted.** Courses and tools teach stratified measurement, small-number handling and contract audits so that gaps are closed and not averaged away."),
    B("**Honest about limits.** Tools label illustrative data; the AI Analyst cites; the book is corrected when sources disagree."),
    H2("17.4 A 20-minute demonstration"),
    table(["Minutes", "Show", "Where", "Say"], [
      ["0–3", "The framework", "/ (home) and the Five-Pillar Map", "Five pillars, one imperative, executed in sequence; Vermont as the worked example"],
      ["3–7", "The book as a living document", "/book, then /read/1", "Web reader, PDF, audio; each chapter ends with tools and courses to use"],
      ["7–11", "The Academy", "/academy, open one track and a lesson", `${T.lessons} lessons, each with sources; follow the sources; show the certificate path`],
      ["11–15", "A tool, live", th("hospital-stress-test") + " or " + th("shared-savings-calc"), "Change an input and watch the result; say plainly what is illustrative"],
      ["15–18", "The AI Analyst", "/chat", "Ask a question you know the answer to; open its sources; note it answers from HTR's own library"],
      ["18–20", "Proof of rigor", "/rht-review/vermont", "A full sourced review of Vermont's Year 1 RHT money, with honest limits stated on the page"],
    ], [10, 24, 30, 36]),
    H2("17.5 Questions partners ask, and the honest answers"),
    table(["Question", "Answer"], [
      ["Is it live and open to the public?", "It is in a closed beta behind access codes on all four domains; testers get a code. Public launch needs the items in Section 9.5."],
      ["Does it take payments or send email today?", "No. Payment, automatic email and error-tracking integrations are built but not switched on; the contact address is a real shared inbox."],
      ["Who is it for?", "Health-system and hospital leaders, state and policy staff, clinicians and quality leaders, technology and data leaders, students and new hires, and investors and consultants (Section 16)."],
      ["Is the data real?", "Facts are verified against cited sources. Some tools use illustrative benchmarks or synthetic patients and say so; the user supplies their own numbers for real analysis."],
      ["Is the AI Analyst reliable?", "It answers only from HTR's library and shows its sources, so every claim can be checked; it is a research aid, not an authority."],
      ["Can we license or white-label it?", "Not answered in the code or documents. It is a decision for the author; the two brands (Review and Solutions) show the platform already supports a distinct name and an advisory layer."],
      ["Is it only about Vermont?", "Vermont is the worked example, and California is carried second in multi-state features. The framework, the tools and the 50-state RHT review are national."],
    ], [30, 70]),
  );

  // ───────── 18 Onboarding and calendars
  add(
    H1("18. Onboarding and operating calendars"),
    H2("18.1 Onboarding a beta tester (administrator, 10 minutes)"),
    N("Sign in at /login and open /admin → Access Codes."),
    N("Create a code (for example Name_Org_2026), a label for who it is for, and tick only the domains the tester will use; most testers need healthtransformationreview.org only."),
    N("Send the address and the code, and tell them the pass lasts 7 days per browser, that the Tester Hub button (bottom right) collects feedback, and that the first AI answer after a quiet period can take about 20 seconds."),
    N("Read /admin/tester-feedback weekly and turn recurring comments into roadmap items."),
    H2("18.2 A 30-day plan for a new employee or partner team member"),
    table(["Week", "Do", "Outcome"], [
      ["1", "Start Here; Preface and Introduction; Five-Pillar Map; Glossary; ask the AI Analyst five questions and open the sources", "Can explain the five pillars, the sequence and the equity lens in plain words"],
      ["2", "Five Pillars, One Imperative (first four tracks); one Research Lab tool per pillar", "Has run a tool in each pillar and noted what it assumes"],
      ["3", "The course tied to their role (Section 16); the matching book chapter; the Evidence Library for the claims they will cite", "Can cite a claim with its source type"],
      ["4", "A capstone from their course, presented to the team", "A one-to-three-page plan using real tools and numbers"],
    ], [10, 52, 38]),
    H2("18.3 Operating calendar"),
    table(["When", "Task"], [
      ["Every week", "Read tester feedback; ask the AI Analyst a known-answer question; skim The Wire for stale feeds"],
      ["Every month", "Bills (Fly, OpenAI, Vercel with Supabase, Google Workspace); browser test suite on all four domains; database size; review open items in Section 11.5"],
      ["After CMS posts updated RHT figures", "Refresh the RHT review data and rebuild the printable review"],
      ["Before 29 Dec 2026", "Renew healthtransformationreview.com"],
      ["Each quarter", "Run the AI Analyst's 50-question test set; re-check the 25 course lists against Supabase; review book discrepancies with the author; review domain, key and plan status"],
      ["Each year", "Domain renewals (May and October); rotate API keys per the runbook; archive the year's backups"],
    ], [26, 74]),
  );
};
