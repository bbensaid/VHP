const fs = require("fs");
const {
  Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell, HeadingLevel,
  AlignmentType, WidthType, ShadingType, BorderStyle, LevelFormat, PageBreak,
  TableOfContents, Footer, PageNumber, ImageRun,
} = require("./node_modules/docx");

const NAVY = "1F3A5F", INK = "222222", GREY = "666666", HEAD_FILL = "DCE6F1", NOTE_FILL = "FFF4E5", OK_FILL = "E8F5E9";
const W = 9360; // US Letter, 1" margins

// "**bold** plain" mini-markup -> runs
function runs(text, opts = {}) {
  return text.split(/(\*\*[^*]+\*\*)/).filter(Boolean).map(s =>
    s.startsWith("**") ? new TextRun({ text: s.slice(2, -2), bold: true, color: INK, ...opts })
                       : new TextRun({ text: s, color: INK, ...opts }));
}
const P = (t, o = {}) => new Paragraph({ children: runs(t, o.run), spacing: { after: 120 }, ...o.para });
const H1 = t => new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun(t)] });
const DIAG = process.argv[3];
let figNo = 0;
function fig(name, wpx, hpx, caption) {
  figNo++;
  const w = 624, h = Math.round(624 * hpx / wpx);
  return [new Paragraph({ alignment: AlignmentType.CENTER, keepNext: true, spacing: { before: 120, after: 60 },
      children: [new ImageRun({ type: 'png', data: fs.readFileSync(DIAG + '/' + name + '.png'), transformation: { width: w, height: h },
        altText: { title: caption, description: caption, name } })] }),
    new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 200 },
      children: [new TextRun({ text: 'Figure ' + figNo + '. ' + caption, italics: true, size: 18, color: GREY })] })];
}
const H1first = t => new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun(t)] });
const H2 = t => new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun(t)] });
const H3 = t => new Paragraph({ heading: HeadingLevel.HEADING_3, children: [new TextRun(t)] });
const B = (t, level = 0) => new Paragraph({ numbering: { reference: "bul", level }, children: runs(t), spacing: { after: 60 } });
let curList = 0;
const L = () => { curList++; return []; };
const N = t => new Paragraph({ numbering: { reference: "num", level: 0, instance: curList }, children: runs(t), spacing: { after: 60 } });

const border = { style: BorderStyle.SINGLE, size: 4, color: "B0B7C3" };
const borders = { top: border, bottom: border, left: border, right: border };
function cell(text, width, { head = false, fill } = {}) {
  return new TableCell({
    width: { size: width, type: WidthType.DXA }, borders,
    shading: head ? { type: ShadingType.CLEAR, color: "auto", fill: HEAD_FILL } : fill ? { type: ShadingType.CLEAR, color: "auto", fill } : undefined,
    margins: { top: 60, bottom: 60, left: 100, right: 100 },
    children: String(text).split("\n").map(line => new Paragraph({ children: runs(line, { size: 18, bold: head || undefined }) })),
  });
}
function table(headers, rows, pct) {
  const widths = pct.map(p => Math.round(W * p / 100));
  widths[widths.length - 1] = W - widths.slice(0, -1).reduce((a, b) => a + b, 0);
  return new Table({
    width: { size: W, type: WidthType.DXA }, columnWidths: widths,
    rows: [
      new TableRow({ tableHeader: true, children: headers.map((h, i) => cell(h, widths[i], { head: true })) }),
      ...rows.map(r => new TableRow({ children: r.map((c, i) => cell(c, widths[i])) })),
    ],
  });
}
function box(title, lines, fill = NOTE_FILL) {
  return new Table({
    width: { size: W, type: WidthType.DXA }, columnWidths: [W],
    rows: [new TableRow({ children: [new TableCell({
      width: { size: W, type: WidthType.DXA }, borders, shading: { type: ShadingType.CLEAR, color: "auto", fill },
      margins: { top: 120, bottom: 120, left: 160, right: 160 },
      children: [new Paragraph({ children: runs("**" + title + "**", { size: 20 }), spacing: { after: 80 } }),
        ...lines.map(l => new Paragraph({ children: runs(l, { size: 19 }), spacing: { after: 60 } }))],
    })] })],
  });
}
const gap = () => new Paragraph({ children: [], spacing: { after: 80 } });

// One service = a consistent block
function service(name, f) {
  const out = [H2(name)];
  out.push(tableNoHead(f));
  if (f.note) out.push(gap(), box(f.note[0], f.note.slice(1)));
  return out;
}
function tableNoHead(f) {
  const rows = [
    ["What it is", f.what], ["What your app uses it for", f.use], ["Connected to", f.links],
    ["Account / plan", f.plan], ["Cost", f.cost], ["If it stops working", f.breaks],
    ["Where its settings live", f.settings], ["Status checked 14 Nov 2026", f.status],
  ];
  const widths = [Math.round(W * 0.26), W - Math.round(W * 0.26)];
  return new Table({
    width: { size: W, type: WidthType.DXA }, columnWidths: widths,
    rows: rows.map(([a, b]) => new TableRow({ children: [cell("**" + a + "**", widths[0], { fill: HEAD_FILL }), cell(b, widths[1])] })),
  });
}

const children = [];
const add = (...x) => children.push(...x.flat());

// ───────────── Title page
add(
  new Paragraph({ spacing: { before: 600, after: 200 }, children: [new TextRun({ text: "Health Transformation Review Platform", size: 44, bold: true, color: NAVY, font: "Arial" })] }),
  new Paragraph({ spacing: { after: 480 }, children: [new TextRun({ text: "Infrastructure and Software Inventory", size: 34, color: NAVY, font: "Arial" })] }),
  P("Every system, service, tool and Python installation involved in running, building and editing the platform, what each one does, how they connect, and what is free versus paid."),
  P("**Prepared:** 14 November 2026, by Claude (Claude Code), for Bechir Ben Said."),
  P("**How this was checked:** every service and setting below was found in the project's code, configuration files, or on this Mac, and checked on 14 November 2026. Everything that can be tested from outside was tested live. The few facts that only your own account logins can show (Vercel's plan and settings, invoices) are marked as such, and Section 11 says exactly which login unlocks each. Prices marked “list price” are the provider's published rates as known to me; confirm them against your invoices."),
  gap(),
  box("Reading guide", [
    "**Section 1** describes the whole HTR ecosystem: the framework, the book, the website, the Academy, the tools and the AI Analyst. **Section 2** explains the four web addresses and the two brands.",
    "**Section 3** is the one-page picture of the technology. If you read nothing else, read Sections 1–3.",
    "**Section 4** is the full inventory table: every piece, free or paid, in one place.",
    "**Sections 5–6** describe each online service and how they talk to each other.",
    "**Sections 7–8** cover your Mac: the tools installed for this project, and Python in particular.",
    "**Section 9** explains the AI models and what one question costs.",
    "**Section 10** is the money summary. **Section 11** lists open problems. **Section 12** is a glossary.",
  ], OK_FILL),
  gap(),
  new Paragraph({ children: runs("**Contents**", { size: 24, color: NAVY }), spacing: { before: 240, after: 120 } }),
  ...["1. The HTR ecosystem: what it is", "2. The four domains (two brands)", "3. The one-page picture", "4. Complete inventory", "5. Each online service in detail", "6. How the pieces talk to each other", "7. Your Mac: what is installed for this project", "8. Python, explained", "9. The AI models and what one question costs", "10. Money: what is free and what is paid", "11. Open problems and loose ends", "12. Glossary"]
    .map(t => new Paragraph({ children: runs(t), spacing: { after: 40 }, indent: { left: 240 } })),
);

// ───────────── NEW 1 + 2: the ecosystem and the four domains (inserted 14 Nov 2026)
add(
  new Paragraph({ children: [new PageBreak()] }),
  H1("1. The HTR ecosystem: what it is"),
  P("Health Transformation Review (HTR) is one body of work delivered in several forms. At its centre is a framework for transforming a state health system, built on five pillars (**Policy, Technology, Economics, Clinical, Operations**) plus the **Equity Imperative**, which is applied across all five rather than being a sixth pillar. Vermont is the worked example throughout. The same framework organises the book, the website, the Academy, the tools and the AI Analyst, and each of them links to the others."),
  ...fig("07_ecosystem", 1000, 632, "The HTR ecosystem: one framework, seven components"),
  table(["Component", "What it is", "Size on 14 Nov 2026", "Where it lives"], [
    ["**The book**", "HTR_Book_v42: the full argument of the framework, chapter by chapter", "Preface, Introduction, 16 chapters, Conclusion, Appendices A–H, figure index, bibliography, index", "Google Docs (master) → PDF at /book, web reader at /read, 18 audio narrations"],
    ["**Pillar pages**", "Intelligence pages for each pillar, split into sub-topics", "6 sections (5 pillars + Equity), 3–5 sub-topics each; 73 policy analyses", "Text in Sanity, pages on Vercel"],
    ["**The Academy**", "Structured courses: course → track → lesson", "19 courses, 105 tracks, 299 lessons (all published, all with full lesson bodies)", "Structure in Supabase, lesson bodies in Sanity"],
    ["**Tools & Research Lab**", "Interactive models, calculators, simulators and dashboards", "44 tools, 35 of them in the Research Lab", "Website code (Vercel)"],
    ["**States & Programs**", "Vermont programs and legislation; state-by-state rural health profiles", "13 Vermont pages + a simulator; 50 state profiles", "Website code + Sanity"],
    ["**AI Analyst**", "Answers questions from the HTR library, with sources", "60,299 searchable passages", "Fly.io + Supabase"],
    ["**Advisory Services**", "Consulting service pages, HTR Connect member directory, Community", "11 pages", "Website code; Solutions domains only (Section 2)"],
  ], [16, 30, 28, 26]),

  H2("1.1 The book"),
  P("The live manuscript is the Google Doc HTR_Book_v42, which you edit and export to PDF. The website offers it three ways: the PDF download (/book), a chapter-by-chapter web reader built from the .docx (/read/<chapter>), and audio narration of the Preface, Introduction and 16 chapters (18 files). Its text is also in the AI Analyst's library, so answers can quote and cite it."),
  table(["Part", "Title", "Group"], [
    ["Preface", "A System at the Breaking Point", "Foundations"],
    ["Introduction", "What Transformation Actually Means", "Foundations"],
    ["1", "The Five-Pillar Framework and the Execution Sequence", "Foundations"],
    ["2", "The Policy Pillar — Legislative Architecture for Structural Reform", "Policy Pillar"],
    ["3", "The Policy Pillar in Practice — CMMI Models, Waiver Strategy, and the Federal-State Interface", "Policy Pillar"],
    ["4", "The Technology Pillar — Data Infrastructure for a Transformed Health System", "Technology Pillar"],
    ["5", "The Technology Pillar in Practice — FHIR, AI Governance, and Clinical Decision Support", "Technology Pillar"],
    ["6", "The Economics Pillar — Global Budgets, Reference-Based Pricing, and Financial Reform", "Economics Pillar"],
    ["7", "The Economics Pillar in Practice — VBC Financial Modeling and APM Readiness", "Economics Pillar"],
    ["8", "The Clinical Pillar — Redesigning Care Delivery for a Transformed System", "Clinical Pillar"],
    ["9", "The Clinical Pillar in Practice — Care Model Implementation, Quality Mechanics, and the Vermont Clinical Transformation Toolkit", "Clinical Pillar"],
    ["10", "The Equity Imperative — Closing Gaps, Not Just Averaging Them", "The Equity Imperative"],
    ["11", "The Operations Pillar — Executing Hospital System Transformation", "Operations Pillar"],
    ["12", "Infrastructure for Knowledge Transfer and Implementation", "Future & Strategy"],
    ["13", "The Future of Healthcare Transformation — 2026, What Vermont Proves, and What Remains", "Future & Strategy"],
    ["14", "Political Sustainability — Protecting Transformation Across Election Cycles", "Future & Strategy"],
    ["15", "Healthcare Transformation as Portfolio Management — Applying PMI Standards to Five-Pillar Reform", "Future & Strategy"],
    ["16", "The AHS Restructuring Roadmap — A Five-Pillar Framework for System Architects", "Future & Strategy"],
    ["Conclusion", "What Vermont Proves, and What Remains to Be Proven", "—"],
    ["Appendices", "A Vermont System Portrait · B Act 68 Timeline · C 14-Hospital Centers of Excellence · D HTR Platform Tools and Methodology · E Vermont Transformation Scorecard · F Reader's Guide to the Platform · G Adapting and Stress-Testing the Framework · H The HTR Lab Workbook", "—"],
  ], [13, 67, 20]),
  gap(),

  H2("1.2 The website (the platform)"),
  P("The top menu has five sections. A sidebar repeats them and, under each pillar, lists that pillar's Research Lab tools. Around them sit the About pages (About HTR, Mission & Vision, Core Values, Our Framework, Our Methodology, Contact), the book pages, the AI Analyst (a side panel on every page, plus a full chat page at /chat), the beta access page, an admin page for access codes, the Sanity editing studio (/studio) and a tester page."),
  table(["Menu", "What it contains"], [
    ["**PILLARS**", "Policy: Regulation & Legislation; Public Health Mandates; Global & Comparative Policy; Policy Feasibility Studies.\nEconomics: Value-Based Care Models; Market & Finance; Labor & Workforce Strategy; Healthcare Investment Trends.\nTechnology: AI & Machine Learning; Digital Health & Telemedicine; Data Security & Governance; Tech-Enabled Workflow.\nClinical: Hospital-at-Home; Precision Medicine; Virtual Care Models; Genomics & Predictive Medicine; Population Health Management.\nEquity: SDOH Integration; Algorithmic Bias; Access Disparity.\nOperations: Revenue Cycle Management; Workforce & Human Capital; Quality, Compliance & Risk; Supply Chain & Infrastructure; Payer & Network Operations."],
    ["**ACADEMY**", "Start Here · Personalized Learning · Courses · Webinars · Case Studies · Glossary · Medicaid Learning Center · Faculty (Section 1.3)"],
    ["**TOOLS**", "Five-Pillar Map · HTR Simulator · Medicaid Eligibility Simulator · HTI Dashboard · The Wire (news feed) · Investment Tracker · Transformation Friction Index · Portfolio Sequencing Test · Impact Simulation · Multimedia · Trending Topics · the full Research Lab directory (Section 1.4)"],
    ["**STATES & PROGRAMS**", "Vermont Medicaid · Blueprint for Health · VCCI · Vermont RHT Program · SASH · Designated Agencies (MH/SUD) · SDOH & Social Services · Act 167 (2022) · Act 68 (2025) and its simulator · AHEAD Model · Vermont Hospital Profiles · Bed Capacity & Transfer · Legislative Reports Library · 50 state rural-health profiles"],
    ["**ADVISORY SERVICES**", "Advisory Hub · Strategic Consulting · Custom Research · Financial Audit · Regulatory Counsel · IT Consulting · Training & Education · Independent Review · HTR Connect · Member Directory · Community. **Solutions domains only.**"],
  ], [20, 80]),
  gap(),

  H2("1.3 The Academy"),
  P("The Academy is organised as **course → track → lesson**. The structure (which lessons belong to which track, their order, whether they are published) is stored in Supabase. The body of each lesson is a document in Sanity, joined by the lesson's sanity_slug. On 14 November all 299 published lessons had a Sanity body. Each course page shows the book chapter it belongs to, and the book page lists the Academy courses for each chapter."),
  table(["Course", "Pillar", "Level", "Tracks", "Lessons", "Book ch."], [
    ["Start Here", "Technology", "Foundational", "1", "5", "1"],
    ["Five Pillars, One Imperative", "—", "—", "8", "24", "—"],
    ["Medicaid 101: How America's Safety Net Works", "Policy", "Foundational", "6", "9", "2"],
    ["Medicare Fundamentals", "Policy", "Foundational", "5", "12", "2"],
    ["Medicaid Managed Care Operations", "Policy", "Intermediate", "6", "17", "2"],
    ["HIE & Health Reform", "Policy", "—", "6", "13", "16"],
    ["AI & Machine Learning in Healthcare", "Technology", "Intermediate", "7", "18", "4"],
    ["Healthcare Interoperability & Data Exchange", "Technology", "Intermediate", "7", "26", "4"],
    ["Hospital Finance", "Economics", "Intermediate", "6", "18", "6"],
    ["Value-Based Care: From Fee-for-Service to Outcomes", "Economics", "Intermediate", "7", "23", "6"],
    ["Behavioral Health Integration", "Clinical", "Intermediate", "6", "13", "8"],
    ["Clinical Quality Measurement", "Clinical", "Intermediate", "6", "18", "8"],
    ["Genomics & Precision Medicine", "Clinical", "Intermediate", "7", "21", "8"],
    ["Population Health Management", "Clinical", "Intermediate", "7", "17", "8"],
    ["Health Equity & SDOH: From Awareness to Action", "Equity", "Foundational", "6", "16", "10"],
    ["Health Equity Analytics", "—", "—", "1", "6", "—"],
    ["Revenue Cycle Management", "Operations", "Intermediate", "7", "21", "11"],
    ["Transformation Leadership", "Operations", "Advanced", "1", "7", "12"],
    ["Portfolio Management for Healthcare Transformation", "Operations", "Intermediate", "5", "15", "15"],
    ["**Total: 19 courses**", "", "", "**105**", "**299**", ""],
  ], [42, 13, 14, 9, 10, 12]),
  gap(),
  table(["Other Academy area", "What it is", "Content on 14 Nov 2026"], [
    ["Personalized Learning", "Builds a week-by-week learning path from a visitor's goals, with spoken audio; runs on the AI program (Fly) using Groq and OpenAI", "Generated on request"],
    ["Glossary", "Definitions of key terms", "36 definitions (Sanity)"],
    ["Case Studies", "Worked real-world examples", "5 (Sanity)"],
    ["Webinars", "Recorded sessions", "None in Sanity at present: the page has no content"],
    ["Medicaid Learning Center", "Medicaid-focused learning hub", "Draws on the Medicaid courses"],
    ["Faculty", "Instructor profiles", "—"],
  ], [24, 50, 26]),

  H2("1.4 Tools and the Research Lab"),
  P("44 tools are registered in frontend/lib/taxonomy/tools.ts, 35 of them in the Research Lab. Each tool is tagged with the pillars and book chapters it serves, which is how the book's “Work This Chapter on the Platform” tables and the sidebar know which tools to show. Grouped by each tool's first-listed pillar:"),
  table(["Pillar", "Tools"], [
    ["Policy and cross-pillar (13)", "Policy Simulator · Work Requirements Calculator · H.R. 1 Cliff Scenario · Policy Impact Assessment Framework · Innovation Leaderboard · Five-Pillar Map · HTR Simulator · Transformation Friction Index · Portfolio Sequencing Test · HTI Dashboard · Medicaid Eligibility Simulator · Impact Simulation · The Wire"],
    ["Technology (9)", "FHIR Interoperability Lab · Clinical Data Exchange · EMR/EHR Lab · Statewide EHR Deployment Modeler · FHIR Implementation Guide · AI Clinical Governance Lab · Digital Health Lab · Risk Stratification Engine · HCC Gap Closure Playbook"],
    ["Economics (9)", "APM Design Lab · APM Shared Savings Calculator · CEA Calculator · Global Budget Transition Modeler · VBC Contract Review Checklist · Hospital Financial Stress Test · HTA Studio · Actuarial Lab · Investment Tracker"],
    ["Clinical (5)", "Clinical Quality Optimizer · Risk Stratification Methodology · VBC Quality Measures · High vs. Low Value Care · Workforce Modeler"],
    ["Operations (6)", "Transformation Scorecard · VBC Readiness Assessment · Evidence Library · Research Workspace · CIN & Shared Services Modeler · EMS Transformation Modeler"],
    ["Equity (2)", "Population Health Modeler · Health Equity Studio"],
  ], [24, 76]),
  gap(),

  H2("1.5 The AI Analyst's library"),
  P("Everything the AI Analyst can answer from, as stored in Supabase on 15 November. Published Sanity edits reach it automatically within about a minute (Sanity webhook, set up and tested 15 November); the book, briefings and PDFs are loaded by scripts on the Mac (same guide, Section 8)."),
  table(["Source", "Passages", "What it is"], [
    ["PDF reports and books", "35,427", "38 files: Vermont reports and legislative documents, plus two health-economics reference books (Bhattacharya et al.; Culyer's Dictionary)"],
    ["Academy lessons", "20,111", "The 299 lesson bodies from Sanity"],
    ["Policy analyses", "4,048", "73 analyses from Sanity"],
    ["The book", "539", "HTR_Book_v42"],
    ["Definitions, case studies, briefings", "174", "Glossary definitions, 5 case studies, 5 HTR briefings"],
    ["**Total**", "**60,299**", ""],
  ], [28, 14, 58]),
  gap(),

  H2("1.6 How the parts link to each other"),
  B("**From the book to the platform:** every chapter ends with a “Work This Chapter on the Platform” section naming the tools and Academy courses to use. Appendices D and F describe the platform for readers."),
  B("**From the platform to the book:** pages across the site carry “From the Book” callouts; course pages show their chapter; the book page lists the courses for each chapter."),
  B("**Tools and chapters:** each tool is tagged with the chapters it serves (frontend/lib/taxonomy/tools.ts); chapters are defined once in frontend/lib/taxonomy/chapters.ts."),
  B("**The AI Analyst and everything else:** it answers from the book, the Academy and the analyses, cites its sources, and points readers to the relevant HTR Lab tool."),
  B("**Pillars everywhere:** pages, courses, tools, chapters and library passages are all tagged with the same pillars, which is what lets each part find the others."),

  H1("2. The four domains (two brands)"),
  P("The platform answers at four web addresses. They are **not four websites**: one Vercel deployment serves all four, and on every request it looks at the address the visitor typed and picks one of two **brands**. Everything a visitor can read or use (pages, Academy, tools, book, AI Analyst, database) is the same on all four; the brand changes only the name, the logo wordmark and whether Advisory Services exists. The code describes Solutions as the full-functionality variant and Review as the reduced variant without advisory services (frontend/lib/brand.ts)."),
  ...fig("08_domains", 1000, 452, "Four domains, two brands, one website"),
  table(["Feature", "Review brand\nhealthtransformationreview.org / .com", "Solutions brand\nhealthtransformationsolutions.org / .com"], [
    ["Wordmark under the logo", "REVIEW", "SOLUTIONS"],
    ["Name in page titles, footer and link previews (verified live)", "Health Transformation Review", "Health Transformation Solutions (the home page showed “Review” here until fixed on 14 Nov)"],
    ["Advisory Services in the top menu, sidebar and footer", "Hidden", "Shown"],
    ["Advisory pages (verified live on all 4 domains)", "Blocked: /advisory, /advisory/contact, /advisory/consulting, /connect, /connect/directory, /connect-hub and /community all return “page not found” (404)", "All load (200). /advisory-hub first asks for a login (see 2.3)"],
    ["Links into Advisory pages elsewhere on the site (verified live)", "None: all 130 pages in the Review sitemap checked after the 14 Nov fix", "Shown, as intended"],
    ["“Contact Us” (verified live)", "Opens an email to contact@ the Review domain being viewed (.org or .com)", "Opens an email to contact@ the Solutions domain being viewed (.org or .com)"],
    ["Sitemap for search engines (verified live)", "130 pages, no advisory pages, all on the Review address", "136 pages, including 6 advisory pages, all on the www. Solutions address"],
    ["AI Analyst", "Links in answers point to the Review address", "Links rewritten to the Solutions address; calls itself “Health Transformation Solutions (HTR)”"],
    ["www. in the address (checked live)", "www. is removed: www.healthtransformationreview.org → healthtransformationreview.org", "www. is added: healthtransformationsolutions.org → www.healthtransformationsolutions.org"],
    ["Active access codes that work here", ".org: all 12 · .com: 1", ".org: 1 · .com: 1"],
    ["Pages, Academy, tools, book, AI library, database", "Identical", "Identical"],
  ], [34, 33, 33]),
  gap(),
  H2("2.1 Things to know about the domains"),
  B("**All four are behind the same beta access page.** Checked live on 14 November: each address sends a new visitor to /beta."),
  B("**Testers can only use healthtransformationreview.org.** Each access code lists the domains it works on. 11 of the 12 active codes are limited to healthtransformationreview.org; the one code valid on all four is, according to the July runbook, yours. A tester who types the .com or a Solutions address will be turned away."),
  B("**The www. difference** (Review removes it, Solutions adds it) comes from how each domain was set up in Vercel's Domains settings. It is harmless, but inconsistent."),
  B("**Any other address that reaches the site** (Vercel preview links, a local copy on your Mac) shows the Solutions brand. To preview the Review brand locally, use review.localhost:3000."),
  B("**How all of this was tested (14 Nov 2026):** every page was requested from the live site with the beta access cookie, on all four addresses; all 130 pages in the Review sitemap were loaded and checked for errors and Advisory links; and the project's own automated browser tests (34 checks: page loads, brand names, titles, links, error pages) were run against each of the four addresses: **34 of 34 passed on every domain.**"),

  H2("2.2 Registration (verified with the public domain registry)"),
  table(["Domain", "Registered", "Expires", "Auto-renew"], [
    ["healthtransformationreview.org", "3 Oct 2025", "3 Oct 2027", "On"],
    ["healthtransformationreview.com", "29 Dec 2025", "**29 Dec 2026: six weeks away**", "**OFF**"],
    ["healthtransformationsolutions.org", "31 May 2026", "31 May 2027", "On"],
    ["healthtransformationsolutions.com", "31 May 2026", "31 May 2027", "On"],
  ], [34, 18, 26, 22]),
  P("Name.com is the registrar Vercel uses when a domain is bought inside Vercel, and all four use Vercel's name servers, so the domains are managed and renewed from Vercel → Domains. Auto-renew was read from the Vercel account on 14 November. **healthtransformationreview.com is the only one with auto-renew off**: it lapses on 29 Dec 2026 unless renewed. Renewal costs $12.03 a year (Vercel registrar price, read the same day). To keep it: Vercel → Domains → healthtransformationreview.com → turn on Auto Renew."),

  H2("2.3 Problems found by testing, 14 November"),
  table(["Problem (all verified live)", "Status"], [
    ["Every page on the Review domains had links into the blocked Advisory pages: the phone tab bar's “Advisory” tab, two home-page cards, Getting Started, the site map, the command palette, the Research Lab “From Analysis to Action” box, and book chapter 12's platform link", "**Fixed and verified** (commit 4f9f1ed): 0 such links across all 130 Review pages"],
    ["Every “Contact Us” went to /advisory/contact: blocked on Review, and on Solutions an Advisory engagement form whose Submit button sends nothing", "**Fixed and verified:** Contact Us opens an email to contact@<the domain being viewed>; all four reach one Google Workspace inbox (15 Nov)"],
    ["The Solutions home page title and link preview said “Health Transformation Review”", "**Fixed and verified**"],
    ["The home page's “The Wire → View All” pointed to /advisory/reports", "**Fixed:** now /the-wire"],
    ["The automated browser tests could not run against the www. Solutions addresses (their access cookie never reached www.)", "**Fixed:** all four domains now pass"],
    ["**Login loop:** /chat (full-screen AI Analyst), /dashboard (50-state dashboard and every state profile), /hti-dashboard and /library sent anyone not logged in to the login page. Its “Skip, continue without an account” button led straight back to the login page. The cause: ALLOW_AUTH_BYPASS was not switched on in Vercel, although the July runbook says it was", "**Fixed and verified:** ALLOW_AUTH_BYPASS=true added to Vercel production and redeployed. All four pages answer on all four domains; the 3 browser tests that failed now pass"],
    ["**The beta gate can be bypassed by anyone:** the access cookie is the plain text “granted:<domain>”, with no signature, so anyone who knows its format can skip the access code", "**Not fixed** (a security change that would sign every tester out). Section 11"],
    ["The home page's “The Wire” section was empty on all four domains (it looked for courses and webinars in Sanity, and Sanity has none). The full /the-wire page was also empty when first opened: it fetched its headlines through a setting (NEXT_PUBLIC_APP_URL) that is missing in production, so it called “localhost”", "**Fixed and verified:** both now show the live headlines (KFF Health News, STAT, CMS, FDA, Health Affairs, Green Mountain Care Board and others). The home page shows the 8 newest with pillar filters"],
    ["On Review, the retired /advisory/reports page answered “page not found” instead of forwarding readers to the briefings (1 automated test failed on Review only)", "**Fixed and verified:** forwards to /briefings on all four domains; full browser suite 57/57 on Review"],
    ["The Review sitemap listed /library, which needed a login", "**Fixed:** /library now opens for visitors without an account (an empty library with sign-up and sign-in links) and is removed from the sitemap"],
    ["The same missing setting made the build use “http://localhost:3000” as the site address, so Academy certificate “verify” links (sent by email) would have pointed at localhost", "**Fixed:** certificates use the domain the student is on; other links fall back to healthtransformationreview.org"],
  ], [70, 30]),
);

// ───────────── 3. Big picture (technology)
add(
  H1("3. The one-page picture"),
  P("Your platform is not one program. It is a website, a separate AI program, a database, and a content library, each rented from a different company, plus the tools on your Mac used to build and edit them. Here is what each part does, in plain terms:"),
  ...fig("01_architecture", 1000, 640, "Architecture: every system and how they connect"),
  table(["Part", "Plain-language job", "Company"], [
    ["The website", "Everything a visitor sees: pages, Academy, Research Lab tools, the book reader. Runs on Vercel's servers.", "Vercel"],
    ["The AI Analyst program", "The chat assistant. A Python program that searches your library and writes answers. Runs on a small rented server.", "Fly.io"],
    ["The database", "Stores user data, Academy structure (courses, tracks, lessons), access codes, narration audio files, and the AI Analyst's searchable library.", "Supabase"],
    ["The content library", "Articles, lesson bodies, case studies, definitions, reports. Where editors write and publish.", "Sanity"],
    ["The code storage", "Holds all the code and its history. Pushing code here automatically updates the website and the AI program.", "GitHub"],
    ["The AI models", "Write the chat answers and turn text into searchable form. Rented per use.", "Groq (every tier), OpenAI (search + backup + audio)"],
    ["The book", "You edit the manuscript in Google Docs; the website serves the exported PDF and an HTML reader built from it.", "Google Docs / Drive"],
    ["Your Mac", "Where code is written and tested, the book is checked, and narration audio is made. Not needed for the live site to run.", "Apple + Homebrew + others"],
  ], [20, 58, 22]),
  gap(),
  H2("What happens when a visitor asks the AI Analyst a question"),
  ...fig("02_question_flow", 1000, 425, "The path of one AI Analyst question"),
  L(),
  N("The visitor types a question on the website (**Vercel**)."),
  N("The website passes the question to the AI program on **Fly.io**. The visitor's browser never talks to Fly directly."),
  N("The AI program asks **OpenAI** to turn the question into a list of numbers (an “embedding”) so it can be compared with the library."),
  N("It searches the library stored in **Supabase** two ways at once (by meaning and by keywords) and takes the 20 best passages."),
  N("A small sorting model running inside the AI program itself (**FlashRank**) re-orders them and keeps the best 5."),
  N("It sends the question, the 5 passages and its instructions to **Groq**, which writes the answer. If Groq refuses (busy or over its free limit), **OpenAI** writes it instead."),
  N("The answer streams back through the website to the visitor, with source links."),
  gap(),
  box("The key point about cost", [
    "Only **Supabase** (database, paid plan you chose) and **Fly.io** (small server) have regular monthly charges right now. Everything else is free or charged per use in fractions of a cent, apart from the yearly domain fees. Vercel is on the free Hobby plan (read from the account). Section 10 has the numbers.",
  ]),
);

// ───────────── 2. Full inventory
add(
  H1("4. Complete inventory"),
  P("Every piece found, in one table. “Required” means the live platform breaks without it. “Wired, not live” means the code exists but the service is not switched on in production."),
  H2("4.1 Online services (the live platform)"),
  table(["Service", "Role", "Status", "Free or paid"], [
    ["**Vercel**", "Hosts the website (Next.js) for all 4 domains", "Required, live", "Free: Hobby plan (read from the account)"],
    ["**Fly.io**", "Runs the AI Analyst program", "Required, live", "Paid per second running: under $6/mo (verified ceiling)"],
    ["**Supabase**", "Database, file storage, AI library", "Required, live", "Paid: Pro plan (verified), ~$35/mo"],
    ["**Sanity**", "Content library and editing studio (/studio)", "Required, live", "Free plan (verified)"],
    ["**GitHub**", "Code storage; triggers automatic updates", "Required", "Free"],
    ["**Groq**", "Writes AI Analyst answers", "Required, live", "Free (with limits)"],
    ["**OpenAI**", "Search embeddings; backup answer writer; Personalized Learning audio", "Required, live", "Paid per use: cents"],
    ["**Resend**", "Sends transactional email", "Wired; key on the Mac only, not in production", "Free tier (3,000 emails/mo, list)"],
    ["**Loops**", "Email campaigns (welcome, digest, payment failed…)", "Wired, not live", "Free up to 1,000 contacts (list)"],
    ["**Stripe**", "Paid subscriptions (8 price plans in code)", "Not configured (verified live)", "No monthly fee; % per sale"],
    ["**Sentry**", "Error tracking", "Wired, not live", "Free developer tier (list)"],
    ["**Domain registrar**", "4 domains: healthtransformationreview.org/.com, healthtransformationsolutions.org/.com", "Required", "Paid yearly: $12.03 for the .com renewal; bought and renewed through Vercel"],
    ["**Google Drive / Docs**", "Where you edit the book and export the PDF", "Required for the book", "Free"],
  ], [18, 34, 20, 28]),
  gap(),
  H2("4.2 Your Mac (building, editing, testing)"),
  table(["Tool", "What it is for", "Needed for"], [
    ["**Homebrew**", "Installs and updates command-line software on macOS", "Installing most tools below"],
    ["**Python 3.11, 3.12, 3.13, 3.14** (Homebrew)", "The language the AI program and book scripts are written in. Several versions because different projects were built on different ones (Section 8)", "Running the AI program locally; book scripts; other projects"],
    ["**uv**", "A fast Python installer; it keeps its own private copy of Python 3.12", "The Piper narration environment"],
    ["**Node.js 22** (via nvm) + npm", "Runs and builds the website locally", "Website development"],
    ["**Vercel CLI**", "Command-line access to Vercel", "Optional (logged in 14 Nov)"],
    ["**flyctl**", "Command-line access to Fly.io", "Optional: logs, manual restarts (logged in 14 Nov)"],
    ["**git** + **git-filter-repo**", "Version control; filter-repo rewrote history to remove the pirated PDF", "Saving and pushing code"],
    ["**PostgreSQL 17 client** (psql, pg_dump)", "Direct database access and backups", "Database maintenance"],
    ["**pandoc**", "Converts the book .docx to text/HTML", "Book mirror, web reader"],
    ["**LibreOffice** (soffice)", "Renders the .docx to PDF/images so layout can be checked", "Book layout checks"],
    ["**ffmpeg**", "Audio conversion", "Narration audio"],
    ["**Piper** (in .piper-venv) / macOS say", "Text-to-speech voices", "Narration audio"],
    ["**VS Code**, **Cursor**", "Code editors", "Editing; Claude Code runs inside VS Code"],
    ["**Claude Code**", "The AI assistant writing this document", "Development help"],
  ], [28, 48, 24]),
);

// ───────────── 3. Each service
add(H1("5. Each online service in detail"));
add(service("5.1 Vercel: the website", {
  what: "A hosting company specialised in Next.js websites. It builds the site from your code and serves it worldwide.",
  use: "Serves all four domains from one deployment. The brand (Review or Solutions) is chosen from the address the visitor typed. Also runs the site's small server functions under /api (beta access codes, Stripe, email, ticker, search, and the bridge to the AI Analyst), plus one scheduled job every midnight (/api/cron/revalidate) that refreshes cached pages.",
  links: "GitHub (every push to main rebuilds the site) → Supabase (data), Sanity (content), Fly.io (AI questions, via the PYTHON_BACKEND_URL setting), Resend/Loops/Stripe (if enabled).",
  plan: "**Hobby (free)**, read from the account on 14 November (team “bechirbensaid-url”, project “vhp”). Hobby is restricted to non-commercial use: move to Pro ($20 per member per month, list) before charging users.",
  cost: "$0 today. $20/mo if moved to Pro. Storage overrun was fixed on 22 Sep 2026 by moving audio to Supabase.",
  breaks: "The whole website is down. The AI program, database and content survive.",
  settings: "Vercel dashboard → Project → Settings → Environment Variables (read at build time: redeploy after changing). Region: iad1 (Washington, D.C.). Config file: vercel.json. Production has 13 settings (read 14 November): PYTHON_BACKEND_URL; the Sanity project, dataset, version, token and telemetry switch; the Supabase address, public keys and service key; ALLOW_AUTH_BYPASS (added 14 November); and INGEST_SECRET and SANITY_WEBHOOK_SECRET (added 14 November, for the AI library connection). There is **no** email (Resend, Loops), Stripe, Sentry, cron secret or NEXT_PUBLIC_APP_URL setting.",
  status: "Live site answered normally through healthtransformationreview.org/api/chat.",
}));
add(service("5.2 Fly.io: the AI Analyst program", {
  what: "A company that rents small virtual computers by the second. Your Fly app is called vhp-backend.",
  use: "Runs one Python program (“HTR AI Brain”, FastAPI) that answers AI Analyst questions, generates Personalized Learning paths, and suggests follow-up questions. This is the only reason Fly exists in your setup.",
  links: "Receives questions from Vercel. Reads the library from Supabase. Calls OpenAI, Groq, Sanity. Updated automatically by GitHub whenever files in backend/ change.",
  plan: "Pay-as-you-go, read from the account on 14 November: personal organisation, paid plan, billing status CURRENT (no overdue balance), $0.00 prepaid credit. One app (vhp-backend), one machine: 1 shared CPU, 1 GB memory, San Jose (sjc). No storage volumes. One shared IPv4 address (free) and one IPv6 address.",
  cost: "At most about $5.70/mo, the price of running this machine 24/7 (list). It is set to stop when idle (autostop on, 0 machines kept running; confirmed on the live machine), so the real bill is lower: on 14 November, a heavy testing day, it ran 0.6 of 4.8 hours (12%), which is under $1 a month at that rate. Exact invoice amounts appear only on fly.io → Billing; Fly’s command-line tool and API do not provide them. Cost of the idle setting: the first question after a quiet period waited 20 seconds (measured) while the machine started.",
  breaks: "The AI Analyst and Personalized Learning stop. The rest of the website still works.",
  settings: "backend/fly.toml (machine size, idle behaviour). Health check: https://vhp-backend.fly.dev/health. Its 11 secret keys (read 14 November): FRONTEND_URL, GROQ_API_KEY, OPENAI_API_KEY, SANITY_API_TOKEN, SANITY_API_VERSION, SANITY_DATASET, SANITY_PROJECT_ID, SUPABASE_DB_URL, SUPABASE_SERVICE_ROLE_KEY, SUPABASE_URL, and INGEST_SECRET (added 14 November: locks the library-rebuild functions, which were open to anyone). There is **no** ANTHROPIC_API_KEY and **no** SENTRY_DSN.",
  status: "Healthy (verified 14 November: woke from stopped and answered its health check). Today's four fixes are deployed (see Section 9). Fly’s app list shows the app as “suspended”: that is Fly’s word for “no machine running right now”, not an account problem. flyctl is logged in on this Mac since 14 November.",
  note: ["Why you were asked to run “fly auth login”, and why you didn't need to",
    "I wrongly said a manual deploy was needed. Updates to Fly happen automatically through GitHub (Section 6.4). Logging in to flyctl is only for reading Fly's logs or restarting by hand. Installing flyctl via Homebrew is what removed Python 3.13 from your Mac (Section 8.3)."],
}));
add(service("5.3 Supabase: database, file storage, AI library", {
  what: "A hosted PostgreSQL database with extras (file storage, user authentication, an add-on called pgvector for AI search).",
  use: "Academy courses/tracks/lessons (structure; lesson bodies live in Sanity); beta access codes; user profiles and roles; feedback and bookmarks; the AI Analyst's library (table data_rag_documents, ~60,000 passages: your book, Academy, Sanity articles, Vermont reports, and two health-economics books); narration audio files (storage bucket narration-audio).",
  links: "Read by Vercel (site data) and Fly (AI library). Written by scripts on your Mac.",
  plan: "Pro (you chose to upgrade on 13 Nov 2026), billed through Vercel Marketplace. Read from the Vercel account on 14 November: three Supabase resources, all on “Supabase Pro Plan”: Vermont-Health-Platform (available), ppm-platform (available), sommiPicks_Data (suspended). The same Vercel account also holds a free Neon database, VT-AHS-NEON-DB, used by another of your projects, not by this platform.",
  cost: "Pro is $25/mo per organisation, including $10 of computing credit (covers one small project). Each additional running project adds about $10/mo. With two running projects, ~$35/mo (list). Paused projects add nothing.",
  breaks: "Site data, Academy structure, access codes, audio and the AI library all fail. On the free plan, an idle project is paused after about a week, which is what took the site down earlier.",
  settings: "supabase.com dashboard; project ref clryhwqaqhvdikgesjbc. Database changes are recorded in supabase/migrations/ and applied by hand in the SQL editor.",
  status: "Database is 1,123 MB after the 13 Nov cleanup and the two books were added (Pro includes 8 GB).",
}));
add(service("5.4 Sanity: the content library", {
  what: "A content management system: a structured library plus an editing studio.",
  use: "Holds articles, policy analyses, Academy lesson bodies, case studies, definitions, reports, webinars, investment deals and more (21 content types). The editing studio is at /studio on the website.",
  links: "Read by Vercel to build pages. Read by Fly when the AI library is rebuilt. Academy lessons are joined to Supabase through each lesson's sanity_slug.",
  plan: "Project fxz10xl7 (“HealthTransformationReview”), dataset production. **Free plan, active** (verified through Sanity's API, plan free-2023-10-19).",
  cost: "$0 on the free plan (list). Paid plans start at about $15 per editor per month.",
  breaks: "Articles, lessons and most content pages are empty.",
  settings: "sanity.io/manage. Content types are defined in frontend/sanity/schemaTypes/.",
  status: "Content renders on the live site.",
}));
add(service("5.5 GitHub: code storage and automation", {
  what: "Stores the code (repository bbensaid/VHP) and its full history; runs automated jobs called Actions.",
  use: "Two automatic jobs: CI (checks the code builds, on every push) and “Deploy Backend to Fly.io” (only when files in backend/ change). Vercel also watches the repository and rebuilds the site on every push to main.",
  links: "Feeds Vercel and Fly.io.",
  plan: "Free. The repository is public, which is why the pirated PDF had to be removed from its history.",
  cost: "$0.",
  breaks: "No new updates can go out. The live site keeps running on its last version.",
  settings: ".github/workflows/ci.yml and fly-deploy.yml. Secrets (such as Fly's deploy token) are in GitHub → Settings → Secrets.",
  status: "All of today's deploys succeeded. The gh command-line tool is not installed; it is not needed.",
}));
add(service("5.6 Groq: the main AI answer writer", {
  what: "A company that runs open AI models very fast. Not to be confused with “GROQ”, Sanity's unrelated query language, or Grok, Elon Musk's chatbot.",
  use: "Writes AI Analyst answers, rewrites follow-up questions for search, suggests follow-ups, writes Personalized Learning paths.",
  links: "Called only by the Fly program.",
  plan: "Free tier. Measured today: 8,000 tokens per minute and 1,000 requests per day per model.",
  cost: "$0.",
  breaks: "Answers fall back to OpenAI automatically (fixed today).",
  settings: "console.groq.com; key stored as GROQ_API_KEY. Models are named in backend/config.py.",
  status: "Groq retired the Llama models the code used. Switched to openai/gpt-oss-120b (answers) and openai/gpt-oss-20b (quick tasks). These are open models that happen to be published by OpenAI but run on Groq; Groq bills for them, not OpenAI.",
}));
add(service("5.7 OpenAI", {
  what: "The ChatGPT company, used here as a pay-per-use service.",
  use: "Three jobs: (1) turning every question and every library passage into embeddings for search (model text-embedding-3-small); (2) writing the answer when Groq refuses (gpt-4o-mini); (3) the spoken audio in Personalized Learning (tts-1-hd).",
  links: "Called only by the Fly program and by library-loading scripts on your Mac.",
  plan: "Pay-as-you-go, prepaid credit.",
  cost: "Embeddings: $0.02 per million tokens (one question ≈ 10 tokens: effectively zero; loading the two books cost roughly 15 cents). Backup answers: about 0.07¢ each since today's fix. Audio: $30 per million characters, about 15¢ for a 5,000-character script: the most expensive item per use (list prices).",
  breaks: "Search fails, so the AI Analyst cannot find passages. In September a zero credit balance silently stopped searches.",
  settings: "platform.openai.com → Billing. Key stored as OPENAI_API_KEY.",
  status: "Working (embeddings and backup answers both used successfully today).",
}));
add(service("5.8 Email, payments and error tracking (built, not switched on)", {
  what: "Resend (transactional email), Loops (email campaigns), Stripe (card payments), Sentry (error reports).",
  use: "Resend: code for sending emails, key present locally. Loops: welcome, trial-ending, digest, survey and payment-failed emails. Stripe: 8 subscription prices (subscriber, student, professional, team; monthly and yearly). Sentry: crash reports from the website and the AI program.",
  links: "All called from the website's server functions (Vercel); Sentry also from Fly.",
  plan: "Stripe: **not configured in production** (verified live: the checkout function answers “Stripe is not configured” on both brands). Sentry: no error-reporting address in the live site's scripts. Loops and Resend: **no keys in production** (Vercel settings read 14 November), so the live site sends no email at all, including the weekly digest.",
  cost: "$0 while unused. Stripe charges only per sale (about 2.9% + 30¢ per US card payment, list).",
  breaks: "Nothing today.",
  settings: "Vercel environment variables (RESEND_API_KEY, LOOPS_API_KEY, STRIPE_*, NEXT_PUBLIC_SENTRY_DSN) and Fly secrets (SENTRY_DSN). None of them is set in either place (both read 14 November).",
  status: "Resend: the key in this project works and is limited to sending email (verified with Resend). The three older Resend strings still stored in .claude/settings.local.json are all rejected by Resend, so the key exposed in July is dead. That file is excluded from GitHub.",
}));
add(service("5.9 Google Drive / Google Docs: the book", {
  what: "Google's document editor and file storage.",
  use: "The live manuscript (HTR_Book_v42) is a Google Doc. You edit it there and export the PDF. A local copy, HTR_Book_v42.docx, is downloaded for checks and for building the web reader.",
  links: "PDF → frontend/public/HTR_Book_v42.pdf → served by Vercel at /book and /read. The .docx → pandoc → frontend/content/book-html (the web reader) and into the AI library.",
  plan: "Your Google account.",
  cost: "$0.",
  breaks: "Book editing stops; the published PDF and reader keep working.",
  settings: "Google Drive. Several files share the title HTR_Book_v42; the newest is the live one.",
  status: "Not changed today.",
}));
add(service("5.10 Domains", {
  what: "The four web addresses.",
  use: "healthtransformationreview.org and .com show the “Review” brand; healthtransformationsolutions.org and .com show the “Solutions” brand with Advisory Services.",
  links: "Point to Vercel.",
  plan: "Registered through Vercel (registrar Name.com), DNS on Vercel. Expiry dates in Section 2.2: **healthtransformationreview.com expires 29 Dec 2026 and its auto-renew is off.** The other three renew automatically.",
  cost: "$12.03 per year for the .com renewal (Vercel price, read 14 November); similar for the others.",
  breaks: "That address stops resolving.",
  settings: "Vercel → Domains.",
  status: "All four answer and serve the right brand (Section 2).",
}));

// ───────────── 4. Flows
add(
  H1("6. How the pieces talk to each other"),
  P("Five journeys cover everything that happens. Each step names the system doing the work."),
  H2("6.1 A visitor opens a page"),
  L(),
  N("Browser → **domain** → **Vercel**."),
  N("Vercel checks the beta access cookie (codes are stored in **Supabase**; the cookie lasts 7 days)."),
  N("Vercel builds the page from **Sanity** content and **Supabase** data, and caches it. The midnight job refreshes the cache."),
  N("Audio players stream narration from **Supabase** Storage. The book PDF is served by Vercel."),
  H2("6.2 A visitor asks the AI Analyst"),
  P("Shown in Figure 4 (Section 3). Systems involved, in order: Vercel → Fly.io → OpenAI (embedding) → Supabase (search) → FlashRank (inside Fly) → Groq, or OpenAI as backup → Vercel → browser."),
  H2("6.3 An editor publishes content"),
  L(),
  N("Write and publish in **Sanity** Studio (/studio)."),
  N("The page updates after the midnight refresh, or immediately after a Vercel redeploy."),
  N("The AI Analyst only learns the new text when its library is rebuilt (a script run from your Mac, writing to **Supabase**)."),
  ...fig("04_content", 1000, 480, "Publishing content, and how the AI Analyst learns it"),
  H2("6.4 A code change goes live"),
  L(),
  N("Code is edited on your **Mac** and committed with **git**."),
  N("Pushed to **GitHub** (branch main)."),
  N("**Vercel** rebuilds the website automatically (about 2–4 minutes)."),
  N("If anything under backend/ changed, a **GitHub Action** builds the AI program into a container and deploys it to **Fly.io** automatically (about 3–5 minutes)."),
  N("Database structure changes are separate: they are applied by hand in the **Supabase** SQL editor."),
  ...fig("03_deploy", 1000, 520, "How a code change goes live"),
  H2("6.5 A book update"),
  L(),
  N("You edit in **Google Docs**."),
  N("You download the .docx over the copy in the project folder; Claude checks or edits it (Python scripts, **pandoc**, **LibreOffice**)."),
  N("You upload it back to Google Docs; you export the PDF; it is copied to frontend/public and pushed (**GitHub** → **Vercel**)."),
  N("The web reader and the AI library are refreshed from the .docx by scripts on the Mac."),
  ...fig("05_book", 1000, 465, "The book workflow"),
);

// ───────────── 5. Mac tools
add(
  H1("7. Your Mac: what is installed for this project"),
  P("Nothing on your Mac is needed for the live platform to run. The Mac is the workshop: it is where code is changed and tested, the book is checked, and audio is made. If the Mac were switched off, visitors would notice nothing."),
  table(["Tool", "Installed via", "Used for", "Safe to remove?"], [
    ["Homebrew", "brew.sh", "Installing tools", "No: most tools below depend on it"],
    ["Python 3.14", "Homebrew", "Default python3; options_bot, Illustrated-Guide-AI-Agents, manual-2-sommpicks", "No"],
    ["Python 3.13", "Homebrew (reinstalled 14 Nov, 3.13.18)", "This project's local AI program; Building-with-LlamaIndex; PITS_APP; ai-agent-from-scratch", "No"],
    ["Python 3.12", "Homebrew", "A temporary test copy of the AI program (scratch folder only)", "No (marked as kept)"],
    ["Python 3.11", "Homebrew", "Matches the version Fly and GitHub use", "No (marked as kept)"],
    ["Python 3.12 (private)", "uv", "Piper narration environment only", "Only with Piper"],
    ["Python 3.9 (Apple)", "Xcode command-line tools", "ai-agent-from-scratch/notebooks", "Managed by Apple"],
    ["Node.js 22.14 + npm", "nvm", "Building and running the website locally", "No"],
    ["PostgreSQL 17 (client)", "EDB installer in /Library/PostgreSQL", "psql, pg_dump: backups and maintenance", "Keep"],
    ["pandoc", "Homebrew", "Book → HTML/text", "Keep"],
    ["LibreOffice", "Application", "Book page renders", "Keep"],
    ["ffmpeg", "Homebrew", "Audio", "Keep"],
    ["git-filter-repo", "Homebrew", "History rewrites (used for the PDF removal)", "Optional"],
    ["flyctl", "Homebrew, installed today", "Fly logs/restarts (optional)", "Optional; removing it will not bring back Python"],
    ["Vercel CLI", "npm", "Vercel access (logged in 14 Nov)", "Optional"],
    ["Go 1.27", "Homebrew, installed today", "Pulled in to build flyctl", "Leave it"],
  ], [20, 20, 38, 22]),
  gap(),
  H2("Where the secret keys are kept"),
  table(["Location", "Contains", "In GitHub?"], [
    ["backend/.env", "OpenAI, Groq, Supabase, Sanity keys (for running the AI program locally)", "No (ignored)"],
    ["frontend/.env.local", "Supabase, Sanity, Resend keys (for running the site locally)", "No (ignored)"],
    ["Vercel environment variables", "The live website's keys", "No"],
    ["Fly secrets", "The live AI program's keys", "No"],
    ["GitHub Actions secrets", "Fly deploy token", "Stored in GitHub, encrypted"],
  ], [28, 54, 18]),
);

// ───────────── 6. Python
add(
  H1("8. Python, explained"),
  H2("8.1 Why there are several Pythons"),
  P("Python is the programming language. A Python **version** (3.11, 3.12…) is an installed copy of the language. Each project keeps its own private folder of add-on packages, called a **virtual environment** (“venv”), and each venv is permanently tied to the exact Python copy it was created with. If that copy is deleted, every venv built on it stops working, even though the venv folder is still there."),
  P("Your Mac has several versions because different projects were created at different times, and Homebrew keeps each version as a separate install. None of this is unusual, and none of it was added for the live platform: Fly and GitHub run their own Python 3.11 inside sealed containers that have nothing to do with your Mac."),
  H2("8.2 Which project uses which Python"),
  ...fig("06_python", 1000, 615, "Which project on your Mac uses which Python"),
  table(["Project folder (venv)", "Python it depends on", "State"], [
    ["Vermont-Health-Platform/backend/venv", "Homebrew 3.13", "Repaired 14 Nov; packages tested"],
    ["building-with-llamaIndex/venv", "Homebrew 3.13", "Repaired 14 Nov; packages tested"],
    ["building-with-llamaIndex/PITS_APP/.venv", "Homebrew 3.13", "Repaired 14 Nov; packages tested"],
    ["ai-agent-from-scratch/.venv", "Homebrew 3.13", "Repaired 14 Nov; packages tested"],
    ["options_bot/.venv", "Homebrew 3.14", "OK"],
    ["Illustrated-Guide-AI-Agents/.venv", "Homebrew 3.14", "OK"],
    ["Agentic AI/manual-2-sommpicks/.venv", "Homebrew 3.14", "OK"],
    ["Vermont-Health-Platform/.piper-venv", "uv's private 3.12", "OK"],
    ["ai-agent-from-scratch/notebooks/.venv", "Apple's 3.9", "OK"],
  ], [46, 22, 32]),
  gap(),
  H2("8.3 What happened on 14 November"),
  L(),
  N("I told you to run “fly auth login”, which needed the flyctl tool. That instruction was unnecessary (Section 5.2)."),
  N("You ran “brew install flyctl”. Homebrew built it from source, installing Go first."),
  N("After an install, Homebrew automatically removes packages that were originally installed only as a helper for something else and that nothing needs any more. Python 3.13 had been installed that way, so Homebrew deleted it."),
  N("The four venvs in the table above lost their Python and stopped working."),
  N("This project's venv had also been copied from Building-with-LlamaIndex at some point, so its pip installer still pointed into that other project. When I installed three web-server packages (fastapi, uvicorn, slowapi) with it, they went into Building-with-LlamaIndex's venv instead. They are standard, compatible versions and do not interfere with that project, but you should know they are there."),
  gap(),
  H2("8.4 What I did about it"),
  B("Reinstalled Python 3.13 through Homebrew with automatic removal and clean-up switched off for that command, so nothing else could be removed as a side effect. Homebrew puts it back at the same location (/usr/local/opt/python@3.13), so all four venvs reconnect without being rebuilt. Done: version 3.13.18 (built from source, about 50 minutes). Checked afterwards: all four venvs start, and their installed packages load (llama_index, fastapi, anthropic, aiohttp and others)."),
  B("Marked Python 3.13 and 3.14 as “installed on request” so Homebrew's automatic removal will never delete them again. Python 3.11 and 3.12 were already marked that way."),
  B("For testing today I used a separate temporary environment in Claude's scratch folder, outside all your projects, and did not modify any other project."),
  gap(),
  box("Rules from now on", [
    "Claude will not install, upgrade or remove any Python version, and will not run brew install, without asking you first and saying what it could remove.",
    "Inside this project, packages are installed with “venv/bin/python -m pip”, never “venv/bin/pip”, so they always land in this project.",
    "To stop Homebrew ever auto-removing anything, add this line to ~/.zshrc: export HOMEBREW_NO_AUTOREMOVE=1",
  ]),
);

// ───────────── 7. AI models and per-question cost
add(
  H1("9. The AI models and what one question costs"),
  H2("9.1 What a “token” is"),
  P("AI services measure text in tokens, about ¾ of a word each. Both what is sent to the model (the question plus the material it should answer from) and what it writes back are counted."),
  H2("9.2 Why each question was 11,000–14,000 tokens, and the fix"),
  P("A question like “What is a QALY?” is 7 tokens. To answer it well the AI program attaches the 5 most relevant passages from your library, plus about 870 tokens of standing instructions. That is normal and should come to roughly 2,000–3,000 tokens."),
  P("Measured on 14 November, the real figure was **11,445 tokens**. The cause was a bug: each passage was sent with all of its internal storage labels: file paths on the Mac, file sizes, dates, database IDs, and a complete second copy of the passage in machine format. About 80% of every request was this bookkeeping, which the model cannot use."),
  P("**Fixed and deployed the same day:** only the title, pillar, source type, page and link now go with each passage. Measured after the fix:"),
  table(["Question", "Before", "After"], [
    ["What is a QALY?", "11,445 tokens", "2,242 tokens"],
    ["What is horizontal equity?", "—", "1,817 tokens"],
    ["What is the Green Mountain Care Board?", "—", "1,692 tokens"],
    ["Who is eligible for Medicaid under MAGI?", "—", "2,699 tokens"],
  ], [52, 24, 24]),
  gap(),
  H2("9.3 What that means for cost"),
  table(["Who writes the answer", "When", "Cost per question"], [
    ["Groq (gpt-oss-120b)", "Normally: requests now fit Groq's free 8,000-tokens-per-minute limit", "$0"],
    ["OpenAI gpt-4o-mini (backup)", "Only when Groq is busy or the free limit is used up (more than about 3 questions in the same minute)", "About $0.0007 (0.07 of a cent): roughly 1,400 questions per $1"],
    ["Before today's fix (for comparison)", "Every question went to the backup", "About $0.002 (0.2 of a cent, i.e. one fifth of a cent, not 20 cents): 500 questions per $1"],
  ], [28, 44, 28]),
  gap(),
  box("Correction to my earlier message", [
    "I wrote “roughly 0.2¢ per question”. That meant two-tenths of one cent ($0.002), not $0.20. Even so, the token count was wrong and is now fixed, and normal questions are free again.",
  ]),
  gap(),
  H2("9.4 Everything fixed in the AI program on 14 November"),
  table(["Problem", "Effect", "Fix"], [
    ["Groq retired the Llama models named in the code", "Every answer failed", "Switched to Groq's current models"],
    ["The backup did not trigger for “model does not exist” or “request too large”, and could not catch errors once a reply had started", "Failures were never handed to OpenAI", "Backup now catches these cases"],
    ["The library unknowingly assumed a 3,900-token limit for the new model names", "Would have cut off passages", "Correct limit set (131,072)"],
    ["The result-sorting step (FlashRank) grew to ~1.3 GB of memory after 2–3 questions on a 1 GB server", "Server crashed mid-answer: blank replies", "Now holds at ~165 MB and runs twice as fast"],
    ["Passages carried all their internal labels", "11,000+ tokens per question; always over Groq's free limit", "Only useful labels sent: ~2,000 tokens"],
    ["Personalized Learning and the free-tier Medicaid path had no backup", "Would fail under Groq's limits", "Backup added"],
  ], [36, 30, 34]),
);

// ───────────── 8. Money
add(
  H1("10. Money: what is free and what is paid"),
  P("Plans below were read from each account on 14 November. Monthly amounts are list prices applied to those plans; the invoices themselves are only on each provider's billing page (Section 11), so check them against this table."),
  table(["Service", "Plan", "Expected monthly cost", "What makes it go up", "Billing page"], [
    ["Supabase", "Pro (verified): 2 active projects, 1 suspended", "~$35", "More running projects; database over 8 GB; bigger computer", "vercel.com → Settings → Billing (Supabase is billed through Vercel)"],
    ["Fly.io", "Pay-as-you-go (verified)", "Under $6 (about $1 at measured use)", "Keeping the machine always on (max ~$5.70); bigger or more machines", "fly.io → Billing"],
    ["Vercel", "Hobby (verified)", "$0", "Moving to Pro ($20) before charging users", "vercel.com → Settings → Billing"],
    ["OpenAI", "Prepaid usage", "Cents; dollars only if Personalized Learning audio is used a lot", "Audio generation; library rebuilds; backup answers", "platform.openai.com → Billing"],
    ["Groq", "Free", "$0", "Only if you choose a paid tier", "console.groq.com"],
    ["Sanity", "Free (verified)", "$0", "More editors or usage", "sanity.io/manage"],
    ["GitHub", "Free", "$0", "—", "github.com/settings/billing"],
    ["Google Drive", "Your account", "$0", "Storage beyond your Google plan", "—"],
    ["Google Workspace (email)", "1 user: contact@healthtransformationreview.org; the 3 other domains are free alias domains", "One user at your Workspace plan's price (see the Google bill)", "Adding a second user (each one is billed); aliases and alias domains cost nothing", "admin.google.com → Billing"],
    ["Domains (4)", "Bought through Vercel (verified)", "~$4 averaged (.com renewal $12.03/yr; 3 of 4 auto-renew)", "—", "vercel.com → Domains"],
    ["Resend, Loops, Stripe, Sentry", "Not active", "$0", "Switching them on", "—"],
  ], [16, 16, 20, 28, 20]),
  gap(),
  box("Total", [
    "**Roughly $40–45 per month**: about $35 Supabase, under $6 Fly, about $4 of domain fees spread over the year, plus one Google Workspace user for email. Vercel is free (Hobby). The AI services cost cents.",
    "The Claude Code subscription used for development is separate and not part of running the platform.",
  ]),
);

// ───────────── 9. Open items
add(
  H1("11. Open problems and loose ends"),
  table(["Item", "Why it matters", "Who"], [
    ["The pirated Dictionary PDF is still downloadable through 18 old Dependabot pull requests on GitHub", "GitHub keeps pull-request copies that a history rewrite cannot remove", "You: ask GitHub Support to purge them, and close those pull requests"],
    ["“Health Economics.pdf” (the 2014 textbook) is in the public repository", "If it is not openly licensed, it should not be public", "Your decision"],
    ["Fly is set to stop when idle, against the runbook's July decision", "First question after idle is slower; cheaper", "Your call; currently cheaper. Measured: the first question after idle waits 20 seconds"],
    ["Stripe, Loops, Sentry built but off", "Must be configured before charging users or emailing them", "Before launch"],
    ["**Beta gate cookie can be forged** (Section 2.3)", "Anyone who knows the cookie format can skip the access code", "Decide before inviting more testers; the fix signs everyone out once"],
    ["**healthtransformationreview.com expires 29 Dec 2026**", "The address stops working if it is not renewed", "You: auto-renew is OFF. Vercel → Domains → healthtransformationreview.com → turn on Auto Renew ($12.03/yr)"],
    ["The Solutions “Start an Engagement” form sends nothing", "Its page claims submissions are recorded; they are not", "Your decision: fix it or remove the claim"],
    ["No email is configured in production (no Resend or Loops key in Vercel)", "Emails the site sends itself (course-completion, weekly digest, other Loops and Resend messages) do not go out. Account sign-up emails come from Supabase and are not affected", "Before launch"],
    ["Invoice amounts for Fly, OpenAI and Supabase", "Plans and settings are now all read from the accounts; only the invoice amounts are not. Fly’s and Vercel’s tools do not provide them, and the OpenAI key is restricted to AI calls (OpenAI refused it for billing: “missing scope api.usage.read”)", "You, once a month: fly.io → Billing; platform.openai.com → Usage; vercel.com → Settings → Billing (Supabase is billed there)"],
  ], [34, 40, 26]),
);

// ───────────── 10. Glossary
add(
  H1("12. Glossary"),
  table(["Term", "Meaning"], [
    ["API", "A way for one program to ask another for something over the internet (e.g. the AI program asking Groq for an answer)."],
    ["API key", "A secret password that identifies your account to a service and is how it bills you."],
    ["Backend", "The program running on a server that does work the visitor doesn't see. Here: the AI Analyst program on Fly."],
    ["Frontend", "The website itself: what runs on Vercel and in the visitor's browser."],
    ["Deploy", "Putting a new version live."],
    ["Embedding", "A list of numbers representing the meaning of a piece of text, so that similar meanings can be found by comparing numbers."],
    ["RAG", "“Retrieval-augmented generation”: look up relevant passages first, then have the AI answer from them. This is how the AI Analyst stays grounded in your book."],
    ["Token", "The unit AI services count and bill: about ¾ of a word."],
    ["Fallback / backup model", "A second AI service used automatically when the first one refuses."],
    ["pgvector", "The Supabase add-on that stores embeddings and searches them."],
    ["Virtual environment (venv)", "A project's private folder of Python packages, tied to one installed Python version."],
    ["pip", "Python's package installer."],
    ["Homebrew", "The Mac's command-line software installer."],
    ["Environment variable", "A named setting (often a secret key) given to a program from outside its code."],
    ["Migration", "A recorded change to the database structure."],
    ["CI", "Continuous integration: automatic checks GitHub runs on every change."],
    ["Groq vs GROQ vs Grok", "Groq = the AI company used here. GROQ = Sanity's query language (unrelated). Grok = xAI's chatbot (not used)."],
  ], [26, 74]),
);

const doc = new Document({
  creator: "Claude", title: "HTR Platform Infrastructure Inventory",
  styles: {
    default: { document: { run: { font: "Arial", size: 21, color: INK } } },
    paragraphStyles: [
      { id: "Heading1", name: "Heading 1", basedOn: "Normal", next: "Normal", quickFormat: true,
        run: { font: "Arial", size: 32, bold: true, color: NAVY }, paragraph: { spacing: { before: 240, after: 160 }, keepNext: true, outlineLevel: 0 } },
      { id: "Heading2", name: "Heading 2", basedOn: "Normal", next: "Normal", quickFormat: true,
        run: { font: "Arial", size: 26, bold: true, color: NAVY }, paragraph: { spacing: { before: 280, after: 120 }, keepNext: true, outlineLevel: 1 } },
      { id: "Heading3", name: "Heading 3", basedOn: "Normal", next: "Normal", quickFormat: true,
        run: { font: "Arial", size: 22, bold: true, color: NAVY }, paragraph: { spacing: { before: 200, after: 80 }, keepNext: true, outlineLevel: 2 } },
    ],
  },
  numbering: { config: [
    { reference: "bul", levels: [{ level: 0, format: LevelFormat.BULLET, text: "•", alignment: AlignmentType.LEFT, style: { paragraph: { indent: { left: 540, hanging: 270 } } } }] },
    { reference: "num", levels: [{ level: 0, format: LevelFormat.DECIMAL, text: "%1.", alignment: AlignmentType.LEFT, style: { paragraph: { indent: { left: 540, hanging: 300 } } } }] },
  ] },
  features: { updateFields: true },
  sections: [{
    properties: { page: { size: { width: 12240, height: 15840 }, margin: { top: 1440, bottom: 1440, left: 1440, right: 1440 } } },
    footers: { default: new Footer({ children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [
      new TextRun({ text: "HTR Platform Infrastructure Inventory · 14 November 2026 · page ", size: 16, color: GREY }),
      new TextRun({ children: [PageNumber.CURRENT], size: 16, color: GREY })] })] }) },
    children,
  }],
});
Packer.toBuffer(doc).then(b => { fs.writeFileSync(process.argv[2], b); console.log("wrote", process.argv[2]); });
