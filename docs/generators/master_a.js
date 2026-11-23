// Sections 1-5: ecosystem, domains, book, Academy inventory, platform and tools.
module.exports = ({ S, T, SC, H, add }) => {
  const { P, H1, H2, B, N, table } = H;
  const cap = s => s[0].toUpperCase() + s.slice(1);
  const TR = JSON.parse(require("fs").readFileSync(require("path").join(__dirname, "data/tracks_2026-11-23.json"), "utf8"));
  const NEW = new Set(["cmmi-models-waiver-strategy", "vbc-financial-modeling-apm-readiness", "political-sustainability-of-reform", "fhir-ai-governance-cds-in-practice", "clinical-transformation-toolkit"]);

  add(
    H1("1. The HTR ecosystem"),
    P("Health Transformation Review (HTR) is one body of work delivered in several forms. At its centre is a framework for transforming a state health system: five pillars (Policy, Technology, Economics, Clinical, Operations) executed in sequence and held to the Equity Imperative, which is applied across all five and is not a sixth pillar. Vermont is the worked example throughout. The same framework organises the book, the website, the Academy, the tools and the AI Analyst, and each links to the others."),
    table(["Component", "What it is", "Size on 23 Nov 2026", "Where it lives"], [
      ["The book", "HTR_Book_v42: the full argument, chapter by chapter", "Preface, Introduction, 16 chapters, Conclusion, Appendices A–H", "Google Docs (master) → PDF at /book, reader at /read, 18 audio files"],
      ["Pillar pages and analyses", "Intelligence pages per pillar; policy analysis briefs", "6 sections (5 pillars + Equity); 73 analyses", "Text in Sanity; pages on Vercel"],
      ["The Academy", "Courses → tracks → lessons", `${T.courses} courses, ${T.tracks} tracks, ${T.lessons} lessons`, "Structure in Supabase; lesson bodies in Sanity"],
      ["Tools and Research Lab", "Interactive models, calculators, simulators, dashboards", "45 registered tools", "Website code (Vercel)"],
      ["States and Programs", "Vermont programs and laws; 50-state rural health and RHT review", "13 Vermont pages and simulators; 50 state profiles; 50 RHT review pages", "Website code + Sanity (rhtState)"],
      ["AI Analyst", "Answers from the HTR library, with sources", `${S.t_data_rag_documents.toLocaleString("en-US")} searchable passages`, "Fly.io (Python) + Supabase"],
      ["Advisory Services", "Consulting pages, HTR Connect, Community", "11 pages", "Solutions domains only"],
    ], [16, 28, 29, 27]),
    H2("1.1 How the parts link"),
    B("**Book → platform:** every chapter ends with “Work This Chapter on the Platform”, naming tools and Academy courses. Appendices D and F describe the platform."),
    B("**Platform → book:** “From the Book” callouts; each course page shows its chapter; the book page lists the courses for each chapter. Chapters are defined once in frontend/lib/taxonomy/chapters.ts and tools once in tools.ts."),
    B("**Academy ↔ tools:** lessons send learners to the tools that apply them; the capstone lessons of the 23 November courses end in a written plan built from the course's tools."),
    B("**AI Analyst:** answers from the book, lessons, briefs, glossary, case studies and reference PDFs, cites them and points to the relevant tool."),
  );

  add(
    H1("2. The four domains and two brands"),
    P("The platform answers at four addresses served by **one** Vercel deployment. On each request the site reads the address and chooses a brand. Everything a visitor can read or use is identical on all four; the brand changes only the name and wordmark and whether Advisory Services exists (frontend/lib/brand.ts)."),
    table(["", "Review brand", "Solutions brand"], [
      ["Addresses", "healthtransformationreview.org and .com", "healthtransformationsolutions.org and .com (shown as www.…)"],
      ["Name in titles and footer", "Health Transformation Review", "Health Transformation Solutions"],
      ["Advisory Services (menu, pages, Connect, Community)", "Hidden; those pages answer “not found”", "Shown; all load"],
      ["Contact Us", "Email to contact@ the domain being viewed", "Email to contact@ the domain being viewed"],
      ["Sitemap (counted 14 Nov; the RHT review pages have been added since)", "130 pages, no advisory pages", "136 pages including 6 advisory pages"],
      ["Content, Academy, tools, book, AI library, database", "Identical", "Identical"],
    ], [30, 35, 35]),
    H2("2.1 Facts to know"),
    B("**Beta gate:** all four sit behind the beta access page (/beta). An access code lists the domains it works on; 11 of the 12 codes work only on healthtransformationreview.org. The pass cookie lasts 7 days."),
    B("**Live check, 23 Nov 2026:** the AI server (vhp-backend.fly.dev/health) answered status ok, version 4.2.0, index ready, answer model openai/gpt-oss-120b. /beta answered 200 on healthtransformationreview.org, healthtransformationreview.com and www.healthtransformationsolutions.org; healthtransformationsolutions.com redirected (307) to the www address, as designed."),
    B("**Registration (read 14 Nov, not re-read):** review.org expires 3 Oct 2027 (auto-renew on); **review.com expires 29 Dec 2026 with auto-renew OFF**; both Solutions domains expire 31 May 2027 (on). All four use Vercel's name servers; manage them at Vercel → Domains. The .com renewal is $12.03 a year."),
    B("**Email:** one Google Workspace user, contact@healthtransformationreview.org; the other three domains are free alias domains into the same inbox. All four have MX, SPF, DKIM and DMARC records in Vercel DNS (checked 15 Nov; test score 10/10). The author's personal address appears nowhere on the site."),
    B("**Preview hosts** (Vercel previews, localhost) show the Solutions brand; use review.localhost:3000 for the Review brand locally."),
  );

  add(
    H1("3. The book"),
    P("HTR_Book_v42 is the master document of the work. **The .docx is the book**: the author edits it in Google Docs and exports the PDF. The Markdown copy (HTR_Book_v42.md) is a private, disposable mirror used only to search and cross-check; truth flows one way, .docx → .md, never back. The md → docx build pipeline is retired and must not be run against the .docx."),
    table(["Part", "Title (group)"], [
      ["Preface · Introduction", "A System at the Breaking Point · What Transformation Actually Means (Foundations)"],
      ["1", "The Five-Pillar Framework and the Execution Sequence"],
      ["2–3", "Policy: Legislative Architecture (with §2.1.1 Medicare for All, added 21 Nov); CMMI Models, Waiver Strategy and the Federal-State Interface"],
      ["4–5", "Technology: Data Infrastructure; FHIR, AI Governance and Clinical Decision Support"],
      ["6–7", "Economics: Global Budgets, Reference-Based Pricing; VBC Financial Modeling and APM Readiness"],
      ["8–9", "Clinical: Redesigning Care Delivery; Care Model Implementation and the Clinical Transformation Toolkit"],
      ["10", "The Equity Imperative: Closing Gaps, Not Just Averaging Them"],
      ["11", "Operations: Executing Hospital System Transformation"],
      ["12–16", "Future and Strategy: Knowledge Transfer and Implementation; The Future of Transformation; Political Sustainability; Portfolio Management (PMI); The AHS Restructuring Roadmap"],
      ["Conclusion · Appendices", "A Vermont System Portrait · B Act 68 Timeline · C 14-Hospital Centers of Excellence · D Platform Tools and Methodology · E Vermont Transformation Scorecard · F Reader's Guide · G Adapting and Stress-Testing the Framework · H The HTR Lab Workbook"],
    ], [22, 78]),
    H2("3.1 How the book reaches readers"),
    B("**PDF:** frontend/public/HTR_Book_v42.pdf, served at /book and /read. Check any new PDF is current before wiring it in (search it for “The OneCare Failure: A Sequencing Autopsy”)."),
    B("**Web reader:** /read/<chapter> renders frontend/content/book-html/<slug>.html, generated from the .docx by book-build/make_reader_html.py (run by refresh_md.py)."),
    B("**Audio:** 18 narrations (Preface, Introduction, 16 chapters) in the Supabase bucket narration-audio, made locally with Piper or macOS say and uploaded by script; only changed chapters are re-recorded."),
    B("**AI library:** the book's passages are loaded by book-build/ingest_book_to_rag.py."),
    H2("3.2 Editing the .docx (surgical, by Claude)"),
    N("The author downloads the current .docx from Google Docs over the repo copy. The author re-uploads a new Google Doc each round, so search Drive for the newest HTR_Book title; never trust a stored doc ID."),
    N("Claude acknowledges the standing directives (python3 book-build/ack.py <chapter>), backs up the file to book-backups/, then edits only through book-build/patch_docx.py using the builders in docx_build.py, re-locating target text in the fresh file."),
    N("Claude runs python3 book-build/check_format.py after any paragraph or table change and python3 book-build/render_check.py <first> <last> to look at the pages. A Stop hook refuses to end a session if the .docx changed since the last logged render."),
    N("The author uploads the edited .docx to Google Docs and exports the PDF; Claude refreshes the mirror with book-build/refresh_md.py."),
    P("Recurring headings must stay byte-identical across chapters: “Work This Chapter on the Platform”, “Implications for You”, “Key Concepts in This Chapter”, and a plain “Sources:” paragraph. A chapter is “done” only when python3 book-build/audit_chapter.py <N> passes and every platform promise has been opened and confirmed (a 200 is not a delivered promise)."),
    H2("3.3 Book checks raised by the 23 November course work (book not edited)"),
    table(["Chapter", "Finding for the author's review"], [
      ["3", "Maryland's total-cost-of-care model ended early; prior-authorization timeframes exclude federal-marketplace plans; H.R.1 s.71118 and SMD #26-003 rewrite budget neutrality from 1 Jan 2027; the work-requirement rule and the 29 Oct 2026 court vacatur have dates the text does not carry."],
      ["5", "HTI-5 is now final (ASTP/ONC fact sheets, 26 Oct 2026); the UVM 2020 attack figures and Act 101's report list differ from the sources."],
      ["7", "Risk-based pricing year (FY2027 vs “FY2028”); Blueprint return figures are state estimates that the Blueprint report calls a comparison; Medicare stopped contributing to the Blueprint in Dec 2025."],
      ["9", "62.2 FTE of mental-health-integration staff is 36.2 community health workers plus 21.6 MH/SUD staff, not a ready care-manager pool; the Blueprint 2025 report never mentions collaborative care; the 14.8% readmission and 76% follow-up figures and exchange alert features are unverified."],
      ["10", "78% vs 91% Hispanic personal-provider figure not confirmed (an earlier survey shows about 82% vs 90%); Vermont's decision on the BALANCE GLP-1 model not found; the Essex County uninsured figure is from 2014; “HCAC” should read Health Care Delivery Advisory Committee."],
      ["14", "Monthly AHS reports tie to hospital FY2026; 2026 events (S.190 veto, GMCB order, election results) postdate the text."],
    ], [11, 89]),
  );

  const rows = S.courses.map(x => [x.title + (NEW.has(x.slug) ? " (new)" : x.slug === "medicare-for-all-through-the-five-pillar-test" || /Medicare for All/.test(x.title) ? " (new 21 Nov)" : (x.slug === "transformation-leadership" || x.slug === "health-equity-analytics" ? " (expanded)" : "")), x.pillar ? cap(x.pillar) : "—", x.ch || "—", String(x.tracks), String(x.lessons)]);
  add(
    H1("4. The Academy: full inventory"),
    P(`The Academy has ${T.courses} courses, ${T.tracks} tracks and ${T.lessons} lessons. All are published and all ${T.lessons} lessons have a Sanity body (Sanity holds ${SC.academyModule} lesson modules, one per lesson). Structure is in Supabase; each lesson's body is a Sanity “academyModule” joined by sanity_slug. Lesson pages are /academy/tracks/<course-slug>/<lesson-slug>; the old /academy/courses/ and /academy/modules/ addresses forward to them.`),
    table(["Course", "Pillar", "Book ch.", "Tracks", "Lessons"], rows, [60, 14, 10, 8, 8]),
    P("On 14 November the Academy held 19 courses, 105 tracks and 299 lessons. The five new courses of 23 November (CMMI, VBC Financial Modeling, Political Sustainability, FHIR/AI/CDS, Clinical Transformation Toolkit) each have 5 tracks of 3 lessons; Transformation Leadership grew from 1 track to 5 and Health Equity Analytics from 1 to 5. Every lesson meets one bar: at least five sections, 1,200 words of prose, four numbered sources, 6–8 takeaways and one knowledge check, written from the book and checked against primary sources, with discrepancies reported and the book left unedited."),
    H2("4.1 Tracks in every course"),
    table(["Course", "Tracks, in order"], S.courses.map(x => [x.title, (TR[x.slug] || []).map((t, i) => `${i + 1}. ${t}`).join("  ·  ")]), [30, 70]),
    H2("4.2 Other Academy areas"),
    table(["Area", "What it is", "Content on 23 Nov"], [
      ["Personalized Learning", "Week-by-week path from a visitor's role and goals, with audio (runs on Fly with Groq and OpenAI)", "Generated on request; links only to real courses"],
      ["Glossary", "Definitions at /academy/glossary", `${SC.definition} entries; two terms (ACO and Certificate of Need) are each defined twice and should be merged`],
      ["Case studies", "Worked real-world examples", `${SC.caseStudy} (Section 6)`],
      ["Webinars · Faculty", "Recorded sessions · instructor profiles", "Empty (no Sanity content)"],
      ["Medicaid Learning Center", "Hub over the Medicaid courses", "Draws on Medicaid 101 and Managed Care Operations"],
      ["Certificates", "Issued on completion for signed-in users", "Public check at /verify/<code>"],
    ], [24, 44, 32]),
  );

  add(
    H1("5. The platform and its tools"),
    P("The website is a Next.js application (198 page routes, 37 API routes) deployed on Vercel. The top menu has five sections: Pillars, Academy, Tools, States & Programs and, on the Solutions brand only, Advisory Services; a sidebar mirrors them and the ⌘K box searches pages, tools, briefs, glossary and chapters."),
    table(["Area", "Contents"], [
      ["Pillars", "Policy, Technology, Economics, Clinical, Equity and Operations pages with 3–5 sub-topics each and the 73 analyses"],
      ["Research Lab (/research-lab)", "Hubs: payment-models, policy-quality, vbc-clinical-quality, interoperability, technology-ai, population-equity, knowledge-workspace. Each tool opens on a tab, for example /research-lab/policy-quality?tab=quality"],
      ["Cross-pillar tools", "Five-Pillar Map · HTR Simulator · Medicaid Eligibility Simulator · HTI Dashboard · The Wire (live headlines) · Investment Tracker (with sequencing checks) · Transformation Friction Index · Portfolio Sequencing Test · Impact Simulation"],
      ["Policy and economics", "Policy Simulator · Work Requirements Calculator · H.R. 1 Cliff Scenario · APM Design Lab · APM Shared Savings Calculator · CEA Calculator · Global Budget Transition Modeler · VBC Contract Review Checklist (65 provisions) · Hospital Financial Stress Test · HTA Studio · Actuarial Lab"],
      ["Technology and clinical", "FHIR Interoperability Lab · EMR/EHR Lab · Statewide EHR Modeler · AI Clinical Governance Lab (62 items, 8 domains) · Digital Health Lab · Risk Stratification Engine · Clinical Quality Optimizer · High vs. Low Value Care · Workforce Modeler"],
      ["Operations and equity", "Transformation Scorecard · VBC Readiness Assessment (30 dimensions, 6 domains) · Evidence Library · Research Workspace · CIN & Shared Services Modeler · EMS Transformation Modeler · Population Health Modeler · Health Equity Studio"],
      ["Medicare for All", "/policy/medicare-for-all: hub, Vermont Act 48 page, Single-Payer Modeler (engine in frontend/lib/m4a/, 16 automated checks), a five-pillar assessment, a 7-track Academy course"],
      ["RHT Program Review", "/rht-review: 50-state dashboard (spending fingerprints, plan themes, CMS commitments, pace vs Year 2); /rht-review/vermont full Year 1 review; /rht-review/<state> pages; itemized award lists for 27 states; Vermont Year 2 award $189,996,036"],
      ["States & Programs", "Vermont Medicaid, Blueprint, VCCI, RHT, SASH, Designated Agencies, SDOH, Acts 167 and 68 (with simulator), AHEAD, hospital profiles, bed capacity, legislative library; 50 state profiles; California CalAIM"],
      ["Other", "/book and /read, /chat (AI Analyst), /library, /tester, /admin, /studio (Sanity); retired routes forward to current pages"],
    ], [22, 78]),
    P("frontend/lib/taxonomy/tools.ts is the one list of tools (45 entries); each carries pillars and book chapters, which drives the sidebar and the book's platform tables. Adding a tool also means the sidebar's lab list and backend/platform_catalog.py."),
  );
};
