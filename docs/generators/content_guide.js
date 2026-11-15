const { P, H1, H2, H3, B, L, N, table, box, code, gap, titlePage, build, OK_FILL, WARN_FILL } = require("./docstyle");

const c = [];
const add = (...x) => c.push(...x.flat());

add(
  titlePage("Content Production Guide",
    null,
    ["How every kind of content on the platform is created, checked, published and kept current: the Academy, analysis briefs, case studies, the glossary, the investment tracker, the book, and the AI Analyst's library. It explains Sanity from the beginning, and gives ready-to-paste instructions (prompts) for producing content with AI."]),
  box("How to use this guide", [
    "**New to Sanity?** Read Sections 1 and 2 first (15 minutes). They explain where content lives and what Sanity is.",
    "**Want to add something today?** Go straight to the recipe in Section 5 and the matching prompt in Section 6.",
    "**Sanity is connected to the AI Analyst** (set up and tested 15 November): whatever you publish reaches the AI Analyst about a minute later (Section 9).",
  ], OK_FILL),
  gap(),
  H2("Contents"),
  P("1. Where every kind of content lives  ·  2. Sanity in plain terms  ·  3. Three ways to create content  ·  4. The house rules for content  ·  5. Step-by-step recipes  ·  6. Prompt library  ·  7. After you publish: checklist  ·  8. Keeping the AI Analyst's library current  ·  9. One-time setup: connect Sanity to the AI Analyst  ·  10. Known gaps and quirks  ·  11. Map of the existing templates and scripts"),
);

// ───────────── 1
add(
  H1("1. Where every kind of content lives"),
  P("The platform's content is spread across four places. Knowing which one holds a given item tells you how to change it."),
  B("**Sanity** (content library with an editing screen): analysis briefs, Academy lesson text, case studies, the glossary, investment deals, the 50 state profiles."),
  B("**Supabase** (the database): the Academy's structure (courses, tracks, lesson order, quizzes, who is enrolled), access codes, user accounts, narration audio files, and the AI Analyst's library."),
  B("**The book's Google Doc**: the manuscript, which the website turns into the web reader, the PDF and the audio narration."),
  B("**The code** (GitHub): the Research Lab tools, the HTR Simulator, the home-page pillar briefings, menus and page layouts. Changing these is a programming task: ask Claude Code."),
  gap(),
  table(["Content", "Lives in", "Shown on the site at", "How many today", "AI Analyst learns it"], [
    ["Analysis briefs", "Sanity (Policy Analyses)", "/articles/<slug>, pillar pages, search", "73", "Yes, about a minute after Publish"],
    ["Academy lesson text", "Sanity (Academy → Modules)", "Inside each lesson, /academy/tracks/<track>", "299 modules (one per lesson)", "Yes, about a minute after Publish"],
    ["Academy structure: courses, tracks, lessons, quizzes", "Supabase", "/academy and every course page", "19 courses, 105 tracks, 299 lessons", "Through the lesson text"],
    ["Case studies", "Sanity (Case Studies)", "/academy/case-studies", "5", "Yes, about a minute after Publish"],
    ["Glossary terms", "Sanity (Data & Intelligence → Glossary)", "/academy/glossary, command palette (⌘K)", "36", "Yes, about a minute after Publish"],
    ["Investment deals", "Sanity (Data & Intelligence → Investment Deals)", "/investment-tracker", "22", "No"],
    ["State profiles (RHT program)", "Sanity (State Profiles)", "50-state dashboard", "50", "No"],
    ["Webinars, articles, instructors, analyst notes, audio", "Sanity", "/academy/webinars, /academy/faculty …", "0 of each", "Webinars, articles, notes: yes"],
    ["The book", "Google Doc to .docx", "/book (PDF), /read (web reader), audio", "Preface, Introduction, 16 chapters, Conclusion, Appendices A–H", "Yes, when Claude runs the book loader (Section 8)"],
    ["Home-page pillar briefings", "Code (lib/briefings)", "Home hero, /briefings", "5", "Yes, when Claude runs the briefing loader"],
    ["Research Lab tools, Simulator, dashboards", "Code", "/research-lab, /htr-simulator …", "44 tools", "Their descriptions only"],
    ["The Wire (news)", "Automatic: 9 news and government feeds", "Home page, /the-wire", "~28 live headlines", "No"],
  ], [17, 20, 22, 17, 24]),
);

// ───────────── 2
add(
  H1("2. Sanity in plain terms"),
  H2("2.1 What it is"),
  P("Sanity is a hosted content library. Instead of pages, it stores **documents**: one document per brief, per lesson, per glossary term. Each document has **fields** (title, summary, pillar, body text…). The website asks Sanity for those documents and lays them out. You never design a page in Sanity; you fill in fields, and the website decides how they look."),
  P("Your Sanity project is called **HealthTransformationReview** (project ID fxz10xl7), and everything lives in one dataset called **production**. It is on Sanity's free plan."),
  H2("2.2 Opening the editing screen (the Studio)"),
  L(),
  N("Go to **healthtransformationreview.org/studio** (any of the four domains works; the access-code page does not apply to /studio)."),
  N("Sign in with the Sanity account that owns the project (the one you created it with; Google sign-in if that is how you signed up)."),
  N("The left menu has five groups: **Editorial** (Articles, Policy Analyses, Case Studies, Analyst Notes), **Academy** (Modules, Courses, Webinars, Instructors), **Data & Intelligence** (Daily Insights, Ticker, Glossary, Hospitals, State Profiles, Investment Deals), **People & Taxonomy**, and **Audio**."),
  N("Click a type to see its documents; click a document to edit it; use the pencil/plus icon at the top of a list to create a new one."),
  H2("2.3 Draft, Publish, History"),
  B("While you type, Sanity saves a **draft** automatically. Visitors do not see drafts."),
  B("The green **Publish** button (bottom right) makes your changes live. If it is greyed out, a required field is empty: the field is outlined in red."),
  B("Every document keeps its **history** (clock icon, top right). You can open any earlier version and restore it. Nothing you do in the Studio is irreversible."),
  B("**Unpublish** hides a document from the site without deleting it. Prefer it to Delete."),
  H2("2.4 How fast a published change appears"),
  table(["What you changed", "Appears on the site", "Why"], [
    ["An analysis brief's text", "Within about a minute", "The brief page always asks Sanity for the latest version"],
    ["A case study", "Within 1 minute", "Page refreshes its copy every minute"],
    ["Lists of briefs on pillar pages and the home page", "Within 2 minutes", "Refreshed every 2 minutes"],
    ["Academy lesson text, investment deals", "Within 5 minutes", "Refreshed every 5 minutes"],
    ["Glossary", "Within 1 hour", "Refreshed hourly"],
    ["Anything", "At the latest by the next midnight", "A nightly job refreshes every cached page"],
    ["The AI Analyst's knowledge", "About 1 minute after Publish", "Sanity notifies the site on Publish (Section 9)"],
  ], [34, 26, 40]),
  H2("2.5 Backups"),
  P("Sanity's own history covers mistakes in the Studio. In addition, the scripts Claude uses save a copy of every document before changing it, in the **sanity-backups/** folder of the project (one JSON file per document per change)."),
);

// ───────────── 3
add(
  H1("3. Three ways to create content"),
  table(["Way", "Best for", "How", "Watch out for"], [
    ["**A. Type it in the Studio**", "Short items: a glossary term, an investment deal, fixing a sentence or a number in a brief", "Studio → choose the type → fill the fields → Publish", "Long items with special blocks (stat cards, quizzes, tables) are slow to build by hand"],
    ["**B. Ask Claude Code** (recommended)", "Everything substantial: new briefs, lessons, courses, case studies, corrections across many items", "Paste a prompt from Section 6 into Claude Code in VS Code. Claude researches, verifies every fact, writes it with the project's templates, shows you a preview, posts it after your OK, and checks it live", "Read the preview before you approve. Claude must show its sources"],
    ["**C. Draft with any AI chat** (ChatGPT, Claude.ai, Gemini)", "Brainstorming outlines, first drafts of glossary definitions, rewording", "Use the chat prompt in Section 6.9, then paste the result into the Studio fields", "Chat assistants invent facts and sources. Check every number and link yourself before publishing. Do not use this for Academy lessons: their special blocks cannot be pasted"],
  ], [19, 25, 30, 26]),
  gap(),
  box("Why Claude Code is the recommended route", [
    "It works inside the project: it can read the book, the existing lessons and the schemas; it uses the templates that guarantee the special blocks display correctly; it can post to Sanity and Supabase; and it can open the live page to confirm the result.",
    "Project rule: Claude asks before writing any Academy or Sanity content. A prompt from Section 6 that you send **is** that approval, for that item only.",
  ]),
);

// ───────────── 4
add(
  H1("4. The house rules for content"),
  P("These rules come from the project's own standards files and from past mistakes. They apply whoever writes the content: you, Claude, or another AI."),
  L(),
  N("**Every fact is verified against a live, citable source before it is published**: laws and act numbers, statistics, dollar amounts, dates, named programs and organizations."),
  N("**If it cannot be verified, it is deleted**, not softened. No “approximately”, “reportedly” or unsourced house figures."),
  N("**Real examples only.** Case studies and examples name real organizations with a documented outcome. No invented or composite cases."),
  N("**Every piece ends with its sources**, numbered, with full links, each saying which claim it supports."),
  N("**The framework is five pillars, held to one imperative.** The pillars are Policy, Technology, Economics, Clinical and Operations. Equity is the cross-cutting **Equity Imperative**, applied to every pillar; it is not a sixth pillar. (Some Sanity fields still offer “Equity” as a pillar value for older content; use it only when the piece is about equity itself.)"),
  N("**Vermont facts that recur:** Vermont has 14 hospitals and 13 Health Service Areas (Department of Health definition)."),
  N("**Stale claims are corrected, and every correction is logged** in CONTENT_CORRECTIONS.md (date, item, old claim, new claim, source)."),
  N("**Length floors:** analysis briefs at least 1,400 words (target ~2,000); Academy lessons at least 5 sections and ~1,500 words, ending with key takeaways, a 4-option quiz and sources; a lesson counts as “rich” only with at least 20 Sanity blocks (the best lessons have 64–75)."),
  N("**The book leads, the platform follows.** If a lesson or tool disagrees with the book, the lesson or tool is extended or corrected; the book is not reworded to fit it."),
  N("**No new content type without asking.** Use the existing types and blocks. New fields or block designs are a programming change."),
  gap(),
  box("Two older instruction files disagree with these rules", [
    "CONTENT_PROMPT_EDITORIAL.md says briefs are 600–1,200 words. The newer ANALYSIS_CONTENT_STANDARDS.md (which all 77 live briefs pass) requires at least 1,400. **Use 1,400.**",
    "The text files in frontend/sanity/ (ultimate_prompt*.txt, Prompt_template_*.txt) are early drafts that predate the templates. **Do not use them.**",
  ], WARN_FILL),
);

// ───────────── 5
add(H1("5. Step-by-step recipes"));

add(
  H2("5.1 Add a glossary term (by hand, 5 minutes)"),
  L(),
  N("Studio → Data & Intelligence → Glossary → create new."),
  N("**Term** (required): the word or acronym, with the expansion in brackets, e.g. “Certificate of Need (CON)”."),
  N("**Description** (required): 2–4 plain sentences. Define it, say why it matters, add a Vermont angle if there is one. Facts must be sourced (Section 4)."),
  N("**Pillars**: tick the pillar(s) it belongs to. **Chapter ref**: the book chapter that discusses it, if any."),
  N("Publish. It appears on /academy/glossary within an hour and in the ⌘K search."),
  P("Check first that the term does not already exist (search the Glossary list): there are two “Certificate of Need” entries today."),
);

add(
  H2("5.2 Add an investment deal"),
  P("Studio → Data & Intelligence → Investment Deals → create new, or ask Claude with prompt 6.6. Fields:"),
  table(["Field", "What to put"], [
    ["Title (required)", "“Acquirer acquires Target” or the announced deal name"],
    ["Deal type (required)", "ma (merger/acquisition), vc, pe, ipo, partnership, debt"],
    ["Announced date (required) / Closed date", "From the press release"],
    ["Target (required), Acquirer", "Company names as written in the announcement"],
    ["Deal value (USD)", "Only if publicly disclosed; leave empty otherwise"],
    ["Status", "announced, pending, closed, terminated"],
    ["Pillar, Sector, Geography", "Pick from the lists"],
    ["Summary, Analyst note", "What happened; why it matters for transformation"],
    ["Source URL", "The press release or a reputable news report (required in practice)"],
    ["Is simulated", "**Leave off.** It marks placeholder data; real deals are never simulated"],
  ], [30, 70]),
);

add(
  H2("5.3 Write an analysis brief (Claude Code)"),
  L(),
  N("Pick the topic, pillar and angle. Optional: the key point you want made, and any sources you already have."),
  N("Paste prompt **6.2** into Claude Code with those filled in."),
  N("Claude researches and replies with a short plan: thesis, section titles, the key verified figures and their sources. **Approve or adjust.**"),
  N("Claude writes the brief with the project's builder (frontend/scripts/lib/analysis-blocks.mjs), dry-runs it (word count, sources count), and shows it to you."),
  N("On your OK it publishes (a backup is taken automatically), runs the brief audit (must show PASS), and opens /articles/<slug> to confirm it displays."),
  P("Required fields Claude fills: title, slug (web address), pillar, category, summary (2–3 sentences shown on cards), body, status and impact level where relevant, chapter reference."),
);

add(
  H2("5.4 Add a case study (Claude Code)"),
  P("Same flow as a brief, with prompt **6.4**. A case study needs a real, named organization, the problem, what was done, measurable results (the **metrics** field) and sources. It appears on /academy/case-studies/<slug> within a minute."),
);

add(
  H2("5.5 Add a lesson to an existing Academy course (Claude Code)"),
  P("An Academy lesson has **two halves**, and both must exist:"),
  B("**Supabase lesson row**: places the lesson in its course and track, gives its order, title, summary, objectives, estimated minutes, quiz, and the field **sanity_slug** that points to the text."),
  B("**Sanity module** (Academy → Modules): the lesson text itself, built from the special blocks (key concept, stat cards, real-world example, steps, comparison, warning, table, key takeaways, knowledge check, sources)."),
  P("If the Supabase row exists but sanity_slug is empty or wrong, the lesson shows a thin fallback text. If the Sanity module exists but no row points to it, nobody can reach it."),
  L(),
  N("Paste prompt **6.3** with the course, track, position and topic."),
  N("Claude reads the course, the neighbouring lessons and the related book chapter, researches, and proposes an outline and quiz. **Approve.**"),
  N("Claude writes the module with CONTENT_TEMPLATE.py (the block helpers), creates the Supabase row with sanity_slug set (pattern: frontend/scripts/add-hie-intro-lesson.mjs), and dry-runs both."),
  N("On your OK it posts both, runs frontend/scripts/audit-courses.mjs (the lesson must count as rich: ≥20 blocks), and opens the lesson page to confirm it displays with its quiz."),
);

add(
  H2("5.6 Create a new Academy course (Claude Code, several sessions)"),
  L(),
  N("Prompt **6.5**: Claude proposes the course: audience, level, pillar, 5–8 tracks, lessons per track, and the book chapters it ties to. **Approve the outline before any writing.**"),
  N("Lessons are written track by track (recipe 5.5 for each), committed and checked as they go."),
  N("The course is created unpublished. When every lesson passes the audit, you decide to publish (one switch: is_published on the course and its tracks)."),
  N("Claude adds the course to the book's “Go deeper” references and the chapter map if you want it linked from the book."),
);

add(
  H2("5.7 Correct a fact in existing content"),
  B("**Single sentence or number:** open the document in the Studio, edit, Publish. Add a line to CONTENT_CORRECTIONS.md (or ask Claude to)."),
  B("**A claim that may appear in many places** (e.g. a statistic used in several lessons): use prompt **6.7**. Claude searches every Sanity document, the book and the code for the claim, verifies the correct value, fixes every occurrence, logs the correction, and reports what it changed."),
);

add(
  H2("5.8 Change the book"),
  L(),
  N("Edit the Google Doc as usual."),
  N("Download it as .docx (File → Download → Microsoft Word) and save it over HTR_Book_v42.docx in the project folder."),
  N("Ask Claude Code: “The book .docx is updated. Refresh the web reader, the AI Analyst's book passages and the narration transcripts, and tell me what changed.” Claude runs refresh_md.py (web reader) and ingest_book_to_rag.py (AI library)."),
  N("For the downloadable PDF: Google Docs → File → Download → PDF, then ask Claude to put it on the site (it replaces frontend/public/HTR_Book_v42.pdf after checking it is the current version)."),
  N("Audio narration is regenerated on the Mac only when you ask (Piper voice, free)."),
);

add(
  H2("5.9 Webinars, instructors, articles (first ones)"),
  P("These types exist but have no documents yet, so their pages show an empty state. To start them: Studio → Academy → Webinars (title, slug, pillar, date, description, registration or recording link) or Academy → Instructors (name, role, bio, photo). Articles (Editorial → Articles) are short posts with an author; briefs are the better format for analysis. Each appears on its page within minutes."),
);

// ───────────── 6
add(
  H1("6. Prompt library"),
  P("Copy a prompt into Claude Code (the chat panel in VS Code, with the Vermont-Health-Platform folder open), replace everything in [square brackets], and send it. Each prompt already contains the house rules, so you do not need to repeat them. Claude will stop at the marked checkpoints for your approval."),
);

const RULES = `Rules: verify every fact against a live source and show me the source; delete anything
you cannot verify; real named examples only; five pillars held to the Equity Imperative
(equity is not a sixth pillar); match the book where it covers this topic.`;

add(
  H2("6.1 Before any session: the context line"),
  P("Start any content session with this line. It makes Claude load the project's own instructions first."),
  code("Prompt", `Read CLAUDE.md, CONTENT_PROMPT.md and ANALYSIS_CONTENT_STANDARDS.md first.
I am about to ask for new platform content. This message approves writing to Sanity
and Supabase for the item I describe next only.`),
  gap(),
  H2("6.2 New analysis brief"),
  code("Prompt", `Write a new analysis brief for Sanity (type policyAnalysis).
Topic: [topic]
Pillar: [Policy | Technology | Economics | Clinical | Operations]
Category: [pick from the schema's list, or let Claude choose]
Angle / key point: [what a reader should leave knowing]
Vermont angle: [yes, how | no]
Sources I already have: [links, or "none"]

${RULES}
Follow ANALYSIS_CONTENT_STANDARDS.md: at least 1,400 words, inline (Source, year)
citations, a Sources section with at least 3 links, a 2-3 sentence summary.
Build it with frontend/scripts/lib/analysis-blocks.mjs.
Checkpoint 1: show me the thesis, section titles and key verified figures. Wait.
Checkpoint 2: dry-run, show me the word count and the full text. Wait.
Then publish, run audit-analysis-length.mjs, open the live page, and report the URL.
Commit the script to git.`),
  gap(),
  H2("6.3 New lesson in an existing course"),
  code("Prompt", `Add a new lesson to the Academy.
Course: [course title or slug]   Track: [track title]   Position: [after lesson X]
Lesson title: [title]
Learning goal: [what the learner can do afterwards]
Sub-topics: [list]
Book chapter it should tie to: [chapter, or "find it"]

${RULES}
Write the Sanity module with CONTENT_TEMPLATE.py (exec it, never rewrite the helpers):
at least 5 sections, ~1,500 words, a visual block in every section, one analogy at
most, key takeaways, one knowledge check, sources. Fill summary, courseTitle and
moduleNumber too. Create the Supabase lesson row with sanity_slug set, objectives,
estimated minutes and a quiz, following frontend/scripts/add-hie-intro-lesson.mjs.
Checkpoint 1: outline, objectives and quiz question. Wait.
Checkpoint 2: dry-run both writes and show the block count. Wait.
Then post both, run audit-courses.mjs (must be rich: 20+ blocks), open the lesson
on the live site, and report. Commit the scripts.`),
  gap(),
  H2("6.4 New case study"),
  code("Prompt", `Create a new case study in Sanity (type caseStudy).
Organization / program: [name]
What it should illustrate: [the lesson for transformation leaders]
Pillar: [pillar]   Book chapter: [chapter, or "find it"]

${RULES}
Include: the situation, what was done, measurable results in the metrics field,
what others can learn, and sources. Checkpoint: show me the draft and sources. Wait.
Then publish, open /academy/case-studies/<slug> live, and report.`),
  gap(),
  H2("6.5 New Academy course (outline first)"),
  code("Prompt", `Propose a new Academy course. Do not write any lesson yet.
Subject: [subject]   Audience: [who]   Level: [foundational | intermediate | advanced]
Book chapters it should build on: [chapters, or "suggest"]

Check the 19 existing courses for overlap first and tell me what already exists.
Give me: course description, 5-8 tracks, 2-4 lessons per track with one-line goals,
the book chapter each track ties to, and an estimate of sessions needed.
Stop there and wait for my approval of the outline.`),
  gap(),
  H2("6.6 Add investment deals"),
  code("Prompt", `Add these deals to the investment tracker (Sanity type investmentDeal):
[deal 1: who, what, when, link]
[deal 2 ...]
Verify each against the press release or a reputable news report. Fill every field you
can source; leave deal value empty unless it was disclosed; isSimulated must be false.
Show me the records before publishing, then open /investment-tracker and confirm.`),
  gap(),
  H2("6.7 Correct a claim everywhere"),
  code("Prompt", `This claim may be wrong: "[the claim as it appears]".
1. Verify the correct fact with at least two independent sources and show them.
2. Search every Sanity document, the book (.md mirror), the lessons and the code for
   this claim and close variants. List every occurrence.
3. Wait for my OK, then fix every occurrence (back up first), log the correction in
   CONTENT_CORRECTIONS.md, and confirm on the live pages. Do not edit the book .docx:
   tell me the exact sentence to change in Google Docs.`),
  gap(),
  H2("6.8 Audit a course, a brief or the glossary"),
  code("Prompt", `Audit [course slug | brief slug | the glossary] for accuracy and quality.
Re-verify every statistic, date and named program against live sources; check every
link opens; flag anything stale, unsourced, duplicated or contradicting the book.
Report as a table: item, problem, evidence, proposed fix. Change nothing yet.`),
  gap(),
  H2("6.9 For ChatGPT, Claude.ai or Gemini (drafting only)"),
  P("Use this in a general AI chat when you want a first draft to paste into the Studio yourself. Then check every fact before publishing."),
  code("Prompt", `You are drafting content for Health Transformation Review, a platform for US
health-system transformation leaders, built on a framework of five pillars (Policy,
Technology, Economics, Clinical, Operations) held to an Equity Imperative.
Draft: [a glossary definition of X | a 150-word summary of Y | an outline for Z]
Audience: [executives | policy analysts | students]. Plain, precise English.
For every factual claim give the source (publisher, title, year, URL). If you are not
certain a fact is correct, leave it out and say so. Do not invent examples,
statistics or quotations.`),
);

// ───────────── 7
add(
  H1("7. After you publish: checklist"),
  L(),
  N("Open the live page on healthtransformationreview.org (and a Solutions domain if it is an Advisory item) and read it through once."),
  N("Click every source link."),
  N("For a lesson: open it from its course page, answer the knowledge check, confirm the next/previous navigation."),
  N("Ask the AI Analyst a question only the new content answers (wait a minute after publishing first)."),
  N("For a correction: add the line to CONTENT_CORRECTIONS.md."),
  N("If Claude did the work: confirm it committed its script to GitHub (it says so in its report)."),
);

// ───────────── 8
add(
  H1("8. Keeping the AI Analyst's library current"),
  P("The AI Analyst answers from a library of about 60,000 passages stored in Supabase. Each source reaches it differently:"),
  table(["Source", "How it gets into the library", "When"], [
    ["Sanity briefs, lessons, case studies, glossary", "Automatically: Sanity notifies the site on Publish, and that one document's passages are replaced", "About a minute after Publish"],
    ["All Sanity content at once", "backend/scripts/reindex_sanity_to_rag.py (Claude runs it on the Mac)", "Only if the library's Sanity content is ever suspected stale"],
    ["The book", "book-build/ingest_book_to_rag.py, after refresh_md.py", "After each book change"],
    ["Home-page briefings", "book-build/ingest_briefings_to_rag.py", "After the briefings change"],
    ["A reference PDF (report, law)", "Put it in backend/data/, then backend/scripts/ingest_pdf_to_rag.py \"file.pdf\"", "When you add a document"],
  ], [26, 50, 24]),
  gap(),
  box("Fixed on 14–15 November while preparing this guide", [
    "**The automatic update never worked.** The site forwarded Sanity's notifications to an address that did not exist, checked a signature format Sanity stopped using, and deleted old passages from an empty table. The library's Sanity passages also carried random IDs, so they could never be matched to their documents. All four are fixed and the code is deployed.",
    "**The rebuild function was open to anyone on the internet.** It is now locked with a secret (verified: strangers get “unauthorized”).",
    "**All 425 Sanity documents were reloaded into the library with their correct IDs**, which also replaced older copies of the briefs and lessons.",
    "The two “re-index” buttons on the admin pages did nothing; they were replaced by a note pointing here.",
    "In the Studio menu, the broken “Reports” entry was removed and **Investment Deals** was added (it existed but could not be reached from the menu).",
    "**Old Academy content retired (15 November):** every lesson module now carries its lesson's current title, summary, course, position and next/previous lesson (261 had empty required fields, so the Studio refused to publish edits; others named retired courses). Deleted: 8 duplicate lesson modules and 4 “Value-Based Care Fundamentals” units that were filed as analysis briefs; their old addresses forward to the current lessons. Old lesson and course addresses (/academy/modules/…, /academy/courses/…) now open the lesson or course in the current Academy player.",
  ], OK_FILL),
);

// ───────────── 9
add(
  H1("9. Sanity and the AI Analyst: connected"),
  P("**Set up on 15 November and tested live:** a published change to a glossary term reached the website, which checked Sanity's signature and passed it to the AI program; the term's passages in the AI library were replaced within 5 seconds, with no duplicates. Nothing more to do. This section records how it is configured, for reference."),
  table(["Setting (in sanity.io/manage: project, then API, then Webhooks)", "Value"], [
    ["Name", "AI Analyst library update"],
    ["URL", "https://healthtransformationreview.org/api/webhooks/sanity"],
    ["Dataset", "production"],
    ["Trigger on", "Create, Update, Delete"],
    ["Filter", "_type in [\"policyAnalysis\",\"post\",\"academyModule\",\"caseStudy\",\"definition\",\"analystNote\",\"webinar\"]"],
    ["Projection", "{_id, _type}"],
    ["Drafts", "Off: unpublished drafts never reach the AI Analyst"],
    ["Secret", "Stored in Sanity and in Vercel (SANITY_WEBHOOK_SECRET); the two must be identical"],
  ], [38, 62]),
  B("**If the AI Analyst stops picking up new content:** ask Claude to check the webhook. Claude can read the website's log, which states the reason for any rejected notification (for example, a secret mismatch)."),
  B("**If the webhook is ever deleted or re-created:** ask Claude to generate a fresh secret, set it in Vercel, and give you the exact text to paste into Sanity's Secret field."),
  gap(),
  box("Why the secret matters", ["Without it, anyone could send fake notifications. The site rejects any notification not signed with this secret (tested 14–15 November: unsigned or wrongly signed notifications are refused, correctly signed ones are accepted). Never paste the secret into a chat, email or document."], WARN_FILL),
);

// ───────────── 10
add(
  H1("10. Known gaps and quirks"),
  table(["What you will notice", "Why", "What to do"], [
    ["A lesson table looks like code in the Studio", "Tables are stored as text in JSON form so their column order survives", "Edit with care, or ask Claude"],
    ["Webinars, faculty, articles pages are empty", "No documents of those types yet", "Recipe 5.9"],
    ["Two glossary entries for Certificate of Need", "Duplicate created in the past", "Delete one in the Studio (Unpublish first)"],
    ["Bed-capacity page does not show live numbers", "It calls the AI program at an address that is not configured; today the server returns the same baseline numbers anyway", "Low priority; ask Claude when live bed data matters"],
  ], [32, 36, 32]),
);

// ───────────── 11
add(
  H1("11. Map of the existing templates and scripts"),
  table(["File", "What it is", "Use it?"], [
    ["CONTENT_TEMPLATE.py", "Block helpers for Academy lessons and the post() function", "Yes: every lesson"],
    ["CONTENT_PROMPT.md", "Rules and block reference for lessons", "Yes"],
    ["ANALYSIS_CONTENT_STANDARDS.md", "Rules for analysis briefs (≥1,400 words, sources, audit)", "Yes: every brief"],
    ["frontend/scripts/lib/analysis-blocks.mjs", "Builders and safe-publish routine for briefs (backs up first)", "Yes"],
    ["frontend/scripts/audit-courses.mjs", "Shows each lesson's status (rich / partial / empty)", "After lesson work"],
    ["frontend/scripts/audit-analysis-length.mjs", "Pass/fail for every brief", "After brief work"],
    ["frontend/scripts/add-hie-intro-lesson.mjs", "Worked example: adding one lesson row to Supabase", "As a pattern"],
    ["CONTENT_CORRECTIONS.md", "Log of corrected published claims", "After every correction"],
    ["backend/scripts/reindex_sanity_to_rag.py, ingest_pdf_to_rag.py; book-build/ingest_book_to_rag.py, ingest_briefings_to_rag.py", "Load content into the AI library", "See Section 8"],
    ["CONTENT_TEMPLATE_EDITORIAL.py, CONTENT_PROMPT_EDITORIAL.md", "Older editorial template", "Superseded for briefs by analysis-blocks.mjs; its 600–1,200-word rule is outdated"],
    ["frontend/sanity/*.txt (ultimate_prompt, Prompt_template_…)", "Early prompt drafts", "No"],
  ], [34, 44, 22]),
);

build(process.argv[2], "HTR Content Production Guide", "HTR Content Production Guide", c);
