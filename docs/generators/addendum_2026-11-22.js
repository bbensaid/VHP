const fs = require("fs");
const path = require("path");
const { Paragraph, TextRun } = require("./node_modules/docx");
const { P, H1, H2, B, table, box, gap, build, OK_FILL, WARN_FILL } = require("./docstyle");

const NAVY = "1F3A5F";
const ROOT = path.resolve(__dirname, process.argv[3] || "../..");
const REC = path.join(ROOT, "frontend/lib/data/rht-review/recipients");
const cov = JSON.parse(fs.readFileSync(path.join(ROOT, "frontend/lib/data/rht-review/recipient-coverage.json"), "utf8"));
const usd = (n) => "$" + Math.round(n).toLocaleString("en-US");
const recs = fs.readdirSync(REC).filter((f) => f.endsWith(".json")).map((f) => JSON.parse(fs.readFileSync(path.join(REC, f), "utf8")))
  .sort((a, b) => (a.slug === "california" ? -1 : b.slug === "california" ? 1 : a.state.localeCompare(b.state)));
const host = (u) => u.replace(/^https?:\/\/(www\.)?/, "").split("/")[0];

const c = [];
const add = (...x) => c.push(...x.flat());

add(
  new Paragraph({ spacing: { before: 600, after: 200 }, children: [new TextRun({ text: "Health Transformation Review", size: 44, bold: true, color: NAVY, font: "Arial" })] }),
  new Paragraph({ spacing: { after: 360 }, children: [new TextRun({ text: "Documentation Addendum 3: 22 November 2026", size: 34, color: NAVY, font: "Arial" })] }),
  P("File this with the three guides of 14 November and Addendums 1 and 2. It does two jobs: Section 1 is the **index of every document and where it lives**, and the rest describes the work done on 21 and 22 November 2026 (Medicare for All; the RHT Program Review dashboard; the state award lists). Where this addendum and an earlier page disagree, this addendum is correct."),
  P("**Prepared:** 22 November 2026, by Claude (Claude Code), for Bechir Ben Said. Figures were taken from documents downloaded or opened on the day; the saved source files are listed in Section 6."),
  box("In short", [
    "**Medicare for All:** a sourced evidence base, a five-pillar memo, a website hub with a Vermont Act 48 page, a Single-Payer Modeler, a 7-track / 18-lesson Academy course, and a new Chapter 2 section (§2.1.1).",
    "**RHT Program Review:** a 50-state comparison dashboard, per-state spending and plan profiles, and — where the state publishes one — the state's own list of who received the money.",
    "**Award lists:** " + (cov.itemized.length) + " states, including Vermont and California, now have an itemized list with amounts. The rest are recorded, state by state, with the reason (Section 4).",
    "**Still open:** see Section 7. Nothing here is estimated; a state with no usable list is shown as such.",
  ], OK_FILL),
  gap(),
  P("**Contents:** 1. Where to find every document  ·  2. Medicare for All  ·  3. RHT Program Review dashboard  ·  4. State award lists  ·  5. How to update  ·  6. Sources and data files  ·  7. Still open"),
);

add(
  H1("1. Where to find every document"),
  P("All paths are inside the project folder (Vermont-Health-Platform). The .docx files in docs/ are rebuilt from the generator named in the last column; they are not edited by hand. To rebuild, run the generator from a folder where the docx package is installed (docs/generators/README.md)."),
  table(["Document", "File", "Built by"], [
    ["Infrastructure Inventory (every service, cost, Mac tool)", "docs/HTR_Infrastructure_Inventory_2026-11-14.docx", "docs/generators/inventory.js"],
    ["Content Production Guide (Sanity/Academy/Supabase)", "docs/HTR_Content_Production_Guide_2026-11-14.docx", "docs/generators/content_guide.js"],
    ["Ecosystem User and Operations Guide", "docs/HTR_Ecosystem_User_Operations_Guide_2026-11-14.docx", "docs/generators/ops_guide.js"],
    ["Addendum 1 (15 Nov): domains, email, Sanity webhook, database size", "docs/HTR_Documentation_Addendum_2026-11-15.docx", "docs/generators/addendum_2026-11-15.js"],
    ["Addendum 2 (20 Nov): RHT Year 2, RHT Review pages, Academy fact-check", "docs/HTR_Documentation_Addendum_2_2026-11-20.docx", "docs/generators/addendum_2026-11-20.js"],
    ["**Addendum 3 (this document)**", "docs/HTR_Documentation_Addendum_3_2026-11-22.docx", "docs/generators/addendum_2026-11-22.js"],
    ["Printable RHT Program Review (36 pp; Vermont plus the 50-state tables as of 20 Nov)", "docs/HTR_RHT_Program_Review_2026-11-20.docx", "docs/generators/rht_review_report.js"],
    ["Medicare for All five-pillar memo", "docs/HTR_Medicare_for_All_Five_Pillar_Memo_2026-11-21.docx", "docs/generators/m4a_memo.js"],
    ["Operations runbook (access, deploys, costs, emergencies)", "HTR_ADMIN_RUNBOOK.md (new section 16: RHT review data)", "written by hand"],
    ["Modeler independent-review report, with how each finding was handled", "book-audit/m4a/MODELER_INDEPENDENT_REVIEW_2026-11-21.md", "—"],
    ["Verified Medicare-for-All facts (each with its source file)", "book-audit/deep/sources/m4a/VERIFIED_FACTS_M4A.md", "—"],
    ["50-state search record for award lists", "book-audit/deep/rht/recipient_search_ledger.json", "updated as each state is searched"],
    ["Generator guide", "docs/generators/README.md", "—"],
  ], [34, 40, 26]),
  gap(),
  P("The printable RHT review of 20 November has not yet been rebuilt to include the dashboard and the award lists described below (Section 7)."),
);

add(
  H1("2. Medicare for All (phases 1–6, complete)"),
  table(["Piece", "Where it is"], [
    ["Website hub", "/policy/medicare-for-all (files: frontend/app/policy/medicare-for-all/, data in frontend/lib/data/medicare-for-all.ts)"],
    ["Vermont Act 48 page", "/policy/medicare-for-all/vermont-act-48"],
    ["Single-Payer Modeler (Vermont hospitals)", "/policy/medicare-for-all/modeler. Engine: frontend/lib/m4a/modeler.ts; hospital data: frontend/lib/m4a/vermont-hospitals.ts; 16 automated checks: node frontend/scripts/test-m4a-modeler.cjs"],
    ["Academy course", "“Medicare for All Through the Five-Pillar Test”: 7 tracks, 18 lessons. Sources: frontend/content/_course_m4a_*.py; loaded by frontend/scripts/seed-m4a-course.mjs"],
    ["Book", "Chapter 2, new section 2.1.1; narration re-recorded only for the chapters that changed"],
    ["Evidence base", "book-audit/deep/sources/m4a/ (every source file, plus VERIFIED_FACTS_M4A.md)"],
  ], [28, 72]),
  gap(),
  B("**The five-pillar assessment** (HTR's analysis, stated in the memo and hub): Policy closed; Technology conditionally open; Economics closed; Clinical not yet testable; Operations closed."),
  B("**Modeler review:** a fresh reviewer examined the method; every finding was fixed or closed, and the review report records each one. The model is labelled as a lens, not a forecast."),
);

add(
  H1("3. RHT Program Review dashboard (new since Addendum 2)"),
  P("/rht-review now answers “how do the states compare?” before it lists them. Everything is computed from CMS's own documents in frontend/lib/data/rht-review/."),
  table(["Section on /rht-review", "What it shows"], [
    ["Six findings", "Computed from the data, not typed: for example, about 40% of Year 1 money was reported as put to work by 31 July 2026 (median state 41%); workforce is the largest CMS spending category; provider payments are a small share of categorized dollars although many plans name value-based payment"],
    ["#uses — where the money went", "Put-to-work dollars by CMS's twelve spending categories, with a five-pillar view (HTR's grouping, labelled as analysis)"],
    ["#compare — the dashboard", "Four views: spending fingerprints for all 50 states (sortable), what each state's plan set out to do (click a dot to read the words that triggered it), CMS policy-commitment scoring, and pace versus Year 2 change"],
    ["#recipients — who received the money", "The states with an itemized award list, side by side (Section 4)"],
    ["State table", "The earlier 50-row table of awards, put-to-work and commitments"],
  ], [30, 70]),
  gap(),
  B("**Each state page** (/rht-review/<state>) now opens with “the review at a glance” against the other 49 states, then spending by category, the state's initiatives as CMS lists them, the plan's themes, and — if the state publishes one — its award list. Vermont's page ends with the same 50-state comparison."),
  B("**Honest limits:** CMS's figures are state-reported obligations, not outcomes. A theme tag means the plan mentioned it, not that money was committed. CMS prints some figures inconsistently (for example Iowa's malformed amount); the page shows what CMS printed and what was used, and says so."),
  B("**Tests:** frontend/e2e/rht-review.spec.ts (6 checks). Run it against the live site: PLAYWRIGHT_BASE_URL=https://healthtransformationreview.org npx playwright test e2e/rht-review.spec.ts. The local development server is slow and can time out; the live site is the reliable check."),
);

const rows = recs.map((r) => [r.state, String(r.rows.length), usd(r.rows.reduce((a, x) => a + x.amount, 0)), host(r.source.url)]);
add(
  H1("4. State award lists"),
  P("Vermont comes first and California second in every multi-state view. For each state, award lists were searched on that state's own agency and governor pages (22 November 2026) — not through a third-party directory. A list is shown only if its rows could be checked against the source (a printed total, a printed count, or every amount in the document). The amounts are the states', not estimates; the lists are not all the same kind (final, preliminary, offers, multi-year), and each state's page says which."),
  H2("States with an itemized list with amounts (" + recs.length + " shown, plus Vermont's own review)"),
  table(["State", "Awards", "Sum of listed awards", "Published by"], rows, [24, 12, 26, 38]),
  gap(),
  P("Two states carry a caution. **South Carolina:** the state's own list has 223 entries; news coverage of the announcement reported 228 grants, and the state does not explain the difference. **Texas:** the state's file names 68 hospital districts; the $750,000 each comes from a news report and matches the governor's $51 million total. **Tennessee** lists five-year totals, so its “share of the Year 1 award” is left blank."),
  H2("States not itemized, and why"),
  table(["Group", "States"], [
    ["Recipients or regions named, no per-award amounts", cov.namesWithoutAmounts.join(", ")],
    ["Some named awards announced, no consolidated list found", cov.partial.join(", ")],
    ["No recipient list found", cov.noneFound.join(", ")],
    ["List exists but the state's site refuses automated access", cov.blocked.join(", ") + " (a browser download by you would unblock these)"],
  ], [34, 66]),
  gap(),
  P("The page's coverage note is generated from this record (frontend/lib/data/rht-review/recipient-coverage.json), so it cannot claim more or less than was checked."),
);

add(
  H1("5. How to update"),
  H2("Add or refresh a state's award list"),
  B("Save the state's page or file in book-audit/deep/sources/rht_recipients/ (remove script tags from saved web pages first; a saved page once carried a map token and GitHub blocked the upload)."),
  B("Copy the closest parser in book-audit/deep/rht/ (parse_recipients_<state>.py). Each one checks its row count or sum against the source and stops if they disagree. Run it from the project root; it writes frontend/lib/data/rht-review/recipients/<state>.json."),
  B("Add the state's one-line description to the BASIS list in frontend/components/rht-review/RecipientsNational.tsx; set “multiYear” in the file if amounts are multi-year totals."),
  B("Update book-audit/deep/rht/recipient_search_ledger.json, regenerate frontend/lib/data/rht-review/recipient-coverage.json from it, update the row count in frontend/e2e/rht-review.spec.ts, then deploy and run the tests against the live site."),
  H2("Refresh the CMS-based data"),
  B("book-audit/deep/rht/extract_cms.py → build_states.py (awards, put-to-work, policy scores); extract_uses.py (spending categories); extract_themes.py (plan themes); build_vermont.py (Vermont's agreements)."),
);

add(
  H1("6. Sources and data files"),
  table(["What", "Where"], [
    ["Saved state award lists (originals)", "book-audit/deep/sources/rht_recipients/ (PDFs, spreadsheets, trimmed web pages)"],
    ["Saved CMS and Vermont sources", "book-audit/deep/sources/rht_vt/, book-audit/deep/sources/rht_states/"],
    ["Data the website reads", "frontend/lib/data/rht-review/ — states.json, uses.json, themes.json, vermont-year1.json, state-notes.json, recipients/<state>.json, recipient-coverage.json"],
    ["Comparison logic", "frontend/lib/rht-compare.ts; charts in frontend/components/rht-review/ (CompareCharts, RhtDashboard, Recipients, RecipientsNational)"],
    ["Small spreadsheet reader (no extra software)", "book-audit/deep/rht/xlsx_rows.py"],
  ], [34, 66]),
);

add(
  H1("7. Still open"),
  table(["Item", "Status", "Who"], [
    ["Award lists: remaining states", "New York, North Carolina, Minnesota and the other “partial” states are searched one at a time; Colorado and Kansas need a browser download", "Claude (continuing); you for Colorado/Kansas files"],
    ["Printable RHT Program Review", "The 20 November edition does not yet include the dashboard, spending categories or award lists; rebuild it when the state work settles", "Claude"],
    ["Book and PDF", "Upload the edited .docx to Google Docs and export the PDF after any book change", "You"],
    ["Earlier open items", "Domain renewal, GitHub Support request, before-launch list (Addendum 1, Section 7), technical clean-up (Addendum 2, Section 7) — unchanged unless you have done them", "You"],
  ], [26, 52, 22]),
);

build(process.argv[2], "HTR Documentation Addendum 3, 22 November 2026", "HTR Documentation Addendum 3", c, "22 November 2026");
