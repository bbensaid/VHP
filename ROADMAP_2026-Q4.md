# HTR Roadmap — Q4 2026 → Q2 2027

Written 2026-10-26 from the repo state at `75bc211` ("weekly update done", 2026-10-19).
Sanity and Supabase APIs were not reachable from the session that wrote this, so
live counts come from the most recent dumps in the repo (Academy dump 2026-10,
`ACADEMY.md` catalogue re-pulled 2026-10-07). Re-pull before acting on a number.

Legend — **[Claude]** Claude can do it without a content decision ·
**[Author]** needs the author's decision or sign-off (CLAUDE.md rules 16–17) ·
**[Both]** Claude drafts, author approves before anything is published.

---

## Part 1 — Finish what the last sessions started

### 1.1 Academy deep fact-check — not started (resume first)
`book-audit/deep/agent/PROGRESS.md`: `academyA` 0/90, `academyB` 0/76, `academyC` 0/90
lessons. Book chapters 3, 8, 9, 12 and the Oregon/CalAIM simulators finished the same
deep pass; the Academy did not. Passes 1–2 (time-sensitive federal claims, Vermont
claims) are done; the deep pass is the sentence-level check against `VERIFIED_FACTS.md`
and sources.
- **[Claude]** Run A/B/C over the 2026-10 plain-text dump; write findings + replacement
  pairs to the existing `academy{A,B,C}_*.json(l)` files. No Sanity writes.
- **[Author]** Approve the pair list, then **[Claude]** applies it with pre-edit backups
  to `sanity-backups/` (the pattern used for the 2026-10-17/19 fixes).

### 1.2 Book promises the platform still does not keep
- **Investment Tracker** — **no gap.** Corrected 2026-10-26: the first version of this
  roadmap said the tool lacked the gate logic Ch7 and Ch15 promise. Wrong — both checks
  were built 2026-09-21 and are live on `/investment-tracker`:
  `components/framework/InvestmentSequencingCheck.tsx` (deal-feed capital vs. Vermont's
  gate status, Ch7 wording) and `PortfolioSequencingCheck.tsx` (the reader's own
  initiatives vs. their pillar's limiting gate, Ch15 wording). Book wording matches;
  nothing to build or reword.
- HTI Dashboard (flagged 2026-09-21) — **resolved**: now a five-pillar view.
- "Go Deeper — Academy" doorways (flagged 2026-09-21) — **resolved**: Ch2–16 each
  carry an "In the Academy" paragraph with `/academy/tracks/…` links. Still worth a
  promise-delivery check (CLAUDE.md "DONE" criterion 5): open each cited track and
  confirm the named lesson titles exist verbatim.

### 1.3 Media pages that make promises the site does not keep — **[Claude]**, small code fixes
| Page | Defect |
|---|---|
| `/multimedia` → Podcasts tab | All three series say "Launching Q2/Q3 2025". It is Oct 2026. |
| `/multimedia` → Podcasts tab | "Subscribe to Alerts" links to `/connect/alerts`, which `requireAdvisoryBrand()` 404s on the `.review` domains. |
| `/academy/webinars` | "Register Free" and "Add to Calendar" are `<button>`s with no handler — they do nothing. |
| `/academy/webinars` | Query has no date filter, so a past event shows as "Next Up". |
| Sanity `webinar` schema | `chapterRef` help text says chapters "1–20"; the book has 16. |
| `/media/videos` | Only finds video blocks inside `policyAnalysis` bodies; likely empty. Needs its own source (see 2.4). |

Fix copy to an honest status now; replace with real content as Part 2 lands.

### 1.4 Narration drifted again — **[Author approves run]**, Claude runs it
Audio was re-recorded 2026-10-07. Book edits on 2026-10-17/18/19 (Preface/Intro,
Ch2, Ch6, Ch7, Ch11, Ch12 §12.7 cut, Appendix D) post-date it. Regenerate only the
affected transcripts with Piper and re-upload to `narration-audio`. Local and free.

### 1.5 AI Analyst grounding
- `backend/services/indexing.py` now registers `htr_book_v42.pdf` — confirm the
  index was rebuilt from the **2026-10-19** export, not an older one.
- RAG golden dataset is 8 Q/A pairs (target 50); Operations has ~30 indexed docs vs
  800–2,600 for other pillars. **[Claude]** drafts 42 more Q/A pairs from the book
  (answers quoted from the text, so no new claims); **[Author]** spot-checks.

### 1.6 Open sign-offs carried since August — **[Author]**
- **Live check 2026-10-27 (Supabase + Sanity, audit-courses.mjs): CONTENT-1 and CONTENT-2 are
  already resolved.** All 280 lessons in 18 courses are rich (sanity_slug set, >=20 blocks);
  `welcome-htr-framework` has one 47-block lesson (posted 2026-10-18). Items below are history.
- CONTENT-1: `welcome-htr-framework` course is a live 1-lesson empty shell. Delete,
  hide, or fill (fill = the "start here" course in 2.1).
- CONTENT-2: 14 thin lessons (genomics 15/21 rich, VBC 17/23, interoperability 25/26).
  Confirm intentional or approve rewrites.
- CODE-3: unknown hosts default to the `.solutions` (advisory) brand.

### 1.6b Done 2026-10-27
- **Start Here course live**: `welcome-htr-framework` renamed Start Here, 5 lessons (~2 h):
  the existing welcome lesson + Reading the Book With the Platform Open, Your First Research
  Lab Session, Getting Good Answers From the AI Analyst, Your Learning Path and the Lab
  Workbook. Source: `frontend/content/_course_start_here.py`, `frontend/scripts/start-here-course.mjs`.
- **Open: 35 older Academy tables have scrambled (alphabetical) columns** — Sanity sorted the
  object keys. Fix = re-post each table as a JSON string with the intended column order, taken
  from the lesson's source script where one exists.
- **Open: the AI Analyst's index contains a PDF sourced from Anna's Archive** (Culyer,
  Dictionary of Health Economics) — a pirated copy; remove it from `data_rag_documents` and
  `backend/data/`. Also unverified: whether the book itself is in the live index.

### 1.7 Hygiene (background, low priority) — **[Claude]**
Lint 245 warnings; 21 moderate npm vulns (upstream Sanity/Sentry); `backend/venv`
pip shebang points at another project (rebuild venv); Supabase backup ≤30 days.

---

## Part 2 — New content to make it world-class

Principle: everything new hangs off a **book chapter** (`chapterRef`) and a **pillar**,
so the book, Academy, AI Analyst and media all cross-link the same way the existing
"In the Academy" paragraphs do. No orphan content.

### 2.1 Academy courses — fill the chapters no course covers
Courses by `chapter_ref` today: Ch1, 2 (×3), 4 (×2), 6 (×2), 8 (×4), 10, 11, 12, 16.
**No course anchors Chapters 3, 5, 7, 9, 13, 14, 15.** Two courses are one track deep
(`health-equity-analytics`, `transformation-leadership`, 6 lessons each).

| Priority | Course | Book anchor | Why |
|---|---|---|---|
| 1 | **Start Here: Reading the Five-Pillar Framework** (replaces the empty `welcome-htr-framework`) | Preface, Intro, Ch1 | First thing a new user sees; currently empty |
| 2 | **Transformation as Portfolio Management (PMI)** | Ch15 | Unique to this book; practitioners will pay attention to it |
| 3 | **CMMI Models & Waiver Strategy** | Ch3 | AHEAD, TEAM, LEAD, 1115s — high demand, time-sensitive |
| 4 | **VBC Financial Modeling & APM Readiness** | Ch7 | Pairs with the APM calculator and Hospital Stress Test |
| 5 | **Political Sustainability of Reform** | Ch14 | No equivalent elsewhere; Vermont + Act 48 history |
| 6 | **FHIR, AI Governance & CDS in Practice** | Ch5 | Re-anchor or extend AI/interop courses |
| 7 | **Clinical Transformation Toolkit** | Ch9 | Operational counterpart to Ch8 courses |
| 8 | Expand `transformation-leadership` and `health-equity-analytics` to 5–6 tracks | Ch12, Ch10 | Finish what exists before adding more |

Each course: 5–7 tracks, 15–20 lessons, Sanity body ≥20 blocks, canonical quiz format,
one Research Lab tool exercise per track, `chapter_ref` set, `sanity_slug` linked
(rules 18–21). **[Both]**: Claude drafts one track at a time from the book's own text
and verified sources; nothing posts to Sanity without approval (rule 17).

**Academy features** — **[Claude]**
- **Completion certificates** for the Supabase course player (today only the legacy
  Sanity module engine issues them). Shareable PDF + LinkedIn "Add certification" link.
- **Learning paths** by role (Policymaker, Hospital executive, Clinician leader, Payer,
  Student) that sequence existing courses — no new content needed.
- Later, **[Author]**: explore CME/CNE/CPHQ/PMI-PDU credit. PMI PDUs for the Ch15
  course is the most reachable.

### 2.2 Webinars — "Chapter Live" series
The schema and pages exist; there are no events and the buttons are dead.
- **Format**: one 45-min session per chapter (16), twice a month → ~8 months of
  programming. 20 min author walkthrough, 15 min live tool demo, 10 min Q&A.
  Then quarterly "Vermont Sequence Update" roundtables tied to the HTI Dashboard.
- **[Claude] build**: add `registrationUrl`, `recordingUrl`, `status` (upcoming/past)
  to the schema; split upcoming/past; generate `.ics` for "Add to Calendar"; make
  "Register" a real link (Zoom/StreamYard/Luma — **[Author]** picks the host);
  past events show the recording + transcript + linked chapter and course.
- **[Both]**: Claude drafts each session's slide outline from the chapter (the decks in
  `Book_potential_slides/` are a starting point) and the event description.

### 2.3 Podcasts — start with what can be produced honestly
Three series are announced; none exist. Order by what is realistic:
1. **HTR Audiobook feed** (weeks, free) — the Piper narration already exists per
   chapter. Publish as a podcast RSS feed (one episode per chapter) from Supabase
   Storage. **[Claude]** builds `/podcast/feed.xml` + a `podcastEpisode` Sanity type
   (or reuses `audio.ts`), with transcripts on `/read/<slug>`.
2. **The Wire: Weekly Briefing** (weeks) — a 10–15 min synthetic-voice digest of the
   week's Wire items, labelled as AI-narrated. Script drafted by Claude from published
   Wire items only (no new claims), approved by the author, voiced with Piper.
3. **Five Pillars / Vermont Health Lab interviews** (months, **[Author]**) — needs
   guests and the author's time. Claude can prep guest research briefs, question
   lists tied to chapters, show notes and transcripts. Keep the cards but mark them
   "In development" until the first episode is recorded.

### 2.4 Video
- **Chapter explainers** (5–8 min each, 16): slides + narration, or the author on
  camera. Embed at the top of each `/read/<slug>` and in the matching course.
- **Tool walkthroughs** (2–4 min each, top 10 of the 39 Research Lab tools):
  **[Claude]** can script and record these automatically with Playwright screen
  capture + Piper voice-over, so they stay current when a tool changes.
- Give `/media/videos` its own source (a `video` Sanity type with `chapterRef`,
  `pillar`, `toolSlug`) instead of scraping article bodies. Captions required.

### 2.5 Sanity editorial content — **[Both]**, each batch approved
- **Case studies** for the states the simulators already model (Maryland TCOC,
  Pennsylvania Rural Health Model, Oregon CCO, CalAIM) plus one failure case per pillar
  — the OneCare autopsy is the template.
- **Quarterly "State of the Sequence" report** on Vermont, generated from the HTI
  Dashboard data, so the book's July 2026 snapshot keeps moving.
- **Rule trackers** for the 2027 cycle: CY2027 PFS/OPPS proposed rules (~July 2027),
  FY2027 IPPS, TEAM year 2, AHEAD milestones, CMS-0057-F Jan 2027 API deadline.
- **Glossary**: every "Key Concepts in This Chapter" term gets a glossary entry that
  links back to the chapter and course.
- Grow **Operations** content specifically (the AI has ~30 Operations docs).

### 2.6 Book companion assets
- **Instructor kit** per chapter: discussion questions, slide deck, a Research Lab
  exercise, and an answer key. Add a "Teach with this book" page. This is how a book
  gets adopted by universities and leadership programmes.
- **Appendix H Lab Workbook** as a fillable download that saves to the user's account.
- **Executive summaries** (1 page per chapter) for busy readers and for sharing.

### 2.7 Platform polish that makes the content findable
- schema.org `Course`, `Event`, `PodcastEpisode`, `VideoObject`, `Book` markup for search.
- Site search across book + Academy + briefs + media in one box.
- Usage analytics on which chapters, courses and tools people actually use, to steer
  Part 2 priorities after the first month.
- Accessibility pass (captions, transcripts, contrast, keyboard) — required for
  university and government audiences.

---

## Sequencing

| When | Work |
|---|---|
| Weeks 1–2 | 1.1 Academy deep audit (findings only) · 1.3 media page fixes · 1.4 narration · 1.5 RAG check + dataset · author decides 1.2, 1.6 |
| Weeks 3–6 | Apply 1.1 fixes · Investment Tracker view (if chosen) · audiobook podcast feed · webinar schema/registration · certificates · "Start Here" course |
| Months 2–3 | Ch15 and Ch3 courses · Chapter Live webinars begin · tool walkthrough videos · Wire audio briefing · learning paths |
| Months 3–6 | Ch7, Ch14, Ch5, Ch9 courses · chapter explainer videos · instructor kit · first State of the Sequence report · interview podcast pilot · credit accreditation enquiry |

## Decisions only the author can make
Answered 2026-10-26:
1. Investment Tracker — already built (see 1.2); no action.
2. `welcome-htr-framework` — **replace with the "Start Here" course.**
3. The 14 thin lessons — **rewrite them.**
4. Webinars — free; author produces them with Claude's help. **Last in the queue.**
5. AI-voiced audio — **yes, if labelled.**
6. Course order — Claude decides; quality bar is non-negotiable.
7. On camera / mic — yes; author may prefer an **AI-generated presenter persona**
   (Claude to help design it, labelled as AI like the audio).

Prerequisite for everything in Parts 1–2 that touches data: **live API access from
cloud sessions** (Sanity, Supabase, production site, Fly backend). No work from dumps.

## HANDOFF — Chapter 15 course in progress (2026-10-27)

Course slug `transformation-portfolio-management` ("Transformation as Portfolio Management"),
5 tracks x 3 lessons. Scripts: `frontend/content/_course_portfolio_t{1..5}.py` (run from repo
root; `--commit` posts to Sanity; quality gate in `_course_portfolio_common.py`).
- Track 1 (L1-3) and Track 2 (L4-6): POSTED to Sanity.
- Track 3 (L7-9): POSTED to Sanity.
- Track 4 (L10 risk register, L11 reading the register/heat map/escalation, L12 benefits
  realization vs Act 167 goals) and Track 5 (L13 business case, L14 objections + roadmap,
  L15 capstone across /portfolio-sequencing-test, /transformation-friction-index,
  /investment-tracker, /impact-simulation, scorecard tab, /hti-dashboard): NOT WRITTEN.
- Supabase rows NOT created yet: write a seed script in frontend/scripts/ (pattern:
  start-here-course.mjs; lessons table has no unique slug constraint -> insert-if-missing),
  course chapter_ref "15", pillar operations, level intermediate, sanity_slug = lesson slug.
- Verified facts for the remaining lessons: PMI Pulse 2017 9.7%; Pulse 2018 9.9%, 1 in 3 high
  BRM maturity; BRM Practice Guide (PMI, Dec 2018/Jan 2019); risk responses escalate/avoid/
  transfer/mitigate/accept; Healthcare.gov GAO-14-694 + OIG OEI-06-14-00350.
- Book defects found (report, do not fix without asking): Fig 15.3 CCBHC row says "5 entities"
  but "six in all"; Fig 15.2 cites Program Mgmt standard 4th ed. (5th ed. published 2024).
- Node scripts in cloud sessions need NODE_USE_ENV_PROXY=1. frontend/.env.local is session-only.
