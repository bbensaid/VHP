# Book ↔ Platform ↔ Academy — Alignment Audit Findings

Companion to [ALIGNMENT_AUDIT_BRIEF.md](ALIGNMENT_AUDIT_BRIEF.md). One pillar
per pass; findings accumulate here.

Every count below came from a script, not an estimate; the scripts are named so
each number can be re-derived.

> **Status update — 2026-07-31, after author sign-off.** Pass 1 was reported
> read-only; the author then authorised fixes. Applied and verified: **C-1**
> (all 97 Sanity `chapterRef`s + 13 of 15 course `chapter_ref`s repointed),
> **C-2** (AHEAD cohort corrected on the Act 167 page), **R-3** (regression
> guard), **R-4** (Ch 2 tool mapping + a new `/vermont-act-51` page).
>
> Building that page surfaced **C-5** — the book misdescribed Act 51 — which
> required editing the manuscript (`HTR_Book_v42.md` + a `.docx` rebuild, book
> handed back afterwards). No Academy lesson or Sanity article content was
> written or re-linked.
>
> **Still open:** C-3 (deficit range vs. bare "$2.4B"), C-4, and the §5 gaps.

| Pass | Pillar | Date | Status |
| :--- | :--- | :--- | :--- |
| 1 | **Policy** | 2026-07-31 | Complete |
| 2 | Technology | — | Not started |
| 3 | Economics | — | Not started |
| 4 | Clinical | — | Not started |
| 5 | Equity | — | Not started |
| 6 | Operations | — | Not started |

Book state during this pass: **the author held the manuscript** (`./book.sh who`).
`HTR_Book_v42.md` was read only, never written.

### Scripts written for this audit (read-only)

| Script | Purpose |
| :--- | :--- |
| `frontend/scripts/audit-policy-alignment.mjs` | Course → pillar / chapter_ref, and every lesson in the 4 policy courses |
| `frontend/scripts/audit-policy-sanity.mjs` | Sanity doc counts by type; all docs carrying a `pillar` |
| `frontend/scripts/audit-chapterref-blast.mjs` | Cross-checks every `chapterRef` / `chapter_ref` against `chapters.ts` |

---

## 1. Inventory — Policy pillar

### Book — 2 dedicated chapters

| Ch | Title | Lines in `HTR_Book_v42.md` |
| :--- | :--- | :--- |
| 2 | The Policy Pillar — Legislative Architecture for Structural Reform | 880–1279 |
| 3 | The Policy Pillar in Practice — CMMI Models, Waiver Strategy, and the Federal-State Interface | 1280–1500 |

Both carry `## **Work This Chapter on the Platform**` and `## **Implications for
You**`. Policy material also appears in Appendix B (Act 68 statutory timeline),
Appendix D (AHEAD State Agreement) and Appendix H.4 (Act 68 ↔ AHEAD "two clocks").

### Platform — tools

11 of 39 tools carry `pillars: ["policy"]`. All 11 are referenced by name in the
manuscript — **zero orphans in the tool→book direction.**

| Tool | `chapters:` | Policy-only? |
| :--- | :--- | :--- |
| Policy Simulator | 3 | yes |
| Work Requirements Calculator | 3 | yes |
| H.R. 1 Cliff Scenario | 3 | yes |
| Medicaid Eligibility Simulator | 3 | policy + equity |
| Innovation Leaderboard | 13 | yes |
| Six-Pillar Map | 1 | all six |
| HTR Simulator | 1 | all six |
| Transformation Friction Index | 1, 15 | policy + operations |
| HTI Dashboard | 13 | all six |
| Impact Simulation | 1, 15 | 4 pillars |
| The Wire | *(none)* | all six |

### Platform — editorial (Sanity)

18 documents carry `pillar == "Policy"`: 13 `policyAnalysis`, 2 `webinar`,
2 `academyModule`, 1 `analystNote`. Plus three dedicated Next.js routes —
`/vermont-act-167`, `/vermont-act-68`, `/vermont-rht-program` — which are page
components, not Sanity documents.

### Academy — 4 policy courses

| Course | Lessons | Rich | `chapter_ref` |
| :--- | :--- | :--- | :--- |
| medicaid-101 | 9 | 9/9 ✅ | 5 |
| medicare-fundamentals | 12 | 12/12 ✅ | 5 |
| medicaid-managed-care-operations | 17 | 17/17 ✅ | 5 |
| hie-health-reform-onboarding | 13 | 13/13 ✅ | 16 |

All 51 policy lessons have `sanity_slug` set and rich bodies. Content health in
this pillar is good; the problems below are all **wiring**, not content.

---

## 2. Coverage matrix — Policy

Concept × corpus. `—` marks an empty cell, not necessarily a defect.

| Concept | Book | Tool | Editorial | Academy |
| :--- | :--- | :--- | :--- | :--- |
| Act 167 (diagnostic mandate) | Ch 2 | — | `/vermont-act-167`, 2 briefs | hie *Vermont Act 167 & Act 68* |
| Act 68 (operational mandate) | Ch 2 | — | `/vermont-act-68` | hie *Vermont Act 167 & Act 68* |
| Act 51 (six-pillar architecture) | Ch 2 | — | — | — |
| Oliver Wyman blueprint | Ch 2 | — | within Act 167 page | — |
| Reference-based pricing | Ch 2, 6 | Hospital Financial Stress Test (ch 7) | `/vermont-act-68` | — |
| Global budgets | Ch 2, 6 | — | `/vermont-act-68` | — |
| Enforcement / GMCB authority | Ch 2 | — | `/vermont-act-167` | — |
| CMMI model landscape | Ch 3 | Policy Simulator | — | medicare *Bundled Payments & CMMI* |
| §1115 waivers, budget neutrality | Ch 3 | Policy Simulator | — | medicaid-101 *1115 Waivers*; mmc-ops *1115 & MC Innovation* |
| H.R. 1 / Medicaid cuts | Ch 3 | H.R.1 Cliff, Work Req. Calculator | 1 brief (redetermination) | medicaid-101 *Great Unwinding* |
| Medicaid eligibility | Ch 3 | Medicaid Eligibility Simulator | — | medicaid-101 *MAGI* |
| Prior authorization reform | Ch 3 | — | — | — |
| AHEAD / federal-state interface | Ch 3, App D | — | — | — |
| Medicare program mechanics | — | — | — | medicare-fundamentals (12) |
| Medicaid managed care ops | — | — | — | mmc-operations (17) |
| Certificate of Need | — | — | 1 brief | — |
| PBM reform | — | — | 1 brief | — |
| Surprise billing / NSA | — | — | 1 brief | — |
| Scope of practice | — | — | 1 brief | — |

---

## 3. Contradictions

Ranked by reader visibility.

### C-1 — **Every `chapterRef` on the platform points at the wrong chapter.** 🔴 Critical

**97 of 97** Sanity documents and **15 of 15** Academy courses. Zero correct.
Not a Policy-only defect — it is systemic across all six pillars, found while
auditing Policy.

Root cause is a lookup table in
[frontend/scripts/backfill-editorial-pillar-chapter.mjs:22](frontend/scripts/backfill-editorial-pillar-chapter.mjs#L22):

```js
const LEAD_CHAPTER = {
  Policy: "5", Economics: "8", Technology: "6",
  Clinical: "10", Equity: "12", Operations: "14",
};
```

Every value is the pillar's true lead chapter **+2**, because `chapters.ts`
opens with `Preface` and `Introduction` — 18 entries for 16 numbered chapters —
and those two were counted as chapters 1 and 2.

| Pillar | Backfill says | Lands on | True lead ch | Docs affected |
| :--- | :--- | :--- | :--- | :--- |
| Policy | 5 | **Technology** | 2 | 16 |
| Technology | 6 | **Economics** | 4 | 22 |
| Economics | 8 | **Clinical** | 6 | 32 |
| Clinical | 10 | **Equity** | 8 | 13 |
| Equity | 12 | *(non-pillar ch)* | 10 | 12 |
| Operations | 14 | *(non-pillar ch)* | 11 | 2 |

Reader-visible in two places:

- [frontend/app/book/page.tsx:28-60](frontend/app/book/page.tsx#L28-L60) groups
  briefs, case studies and webinars by `chapterRef` and lists them under each
  chapter — **88 of the 97 docs render here.** A reader on the `/book` page sees
  Policy briefs filed under the Technology chapter.
- [frontend/components/CourseBookTie.tsx:36](frontend/components/CourseBookTie.tsx#L36)
  resolves `chapterRef` through `getChapter()` and renders a *"From the Book ·
  Chapter N"* callout **with that chapter's real title and description**. A
  Medicaid 101 learner is told the course ties to *"Chapter 5 — The Technology
  Pillar in Practice — FHIR, AI Governance, and Clinical Decision Support."*

Verify: `cd frontend && node scripts/audit-chapterref-blast.mjs`

> Two courses need a judgement call beyond the +2 rule:
> `hie-health-reform-onboarding` (`ref=16`) and `welcome-htr-framework`
> (`ref=1`) are cross-cutting; ch 16 and ch 1 may be deliberate. Author's call.

### C-2 — **AHEAD cohort: the Act 167 page says Cohort 1, the book says Cohort 2.** 🔴 High

[frontend/app/vermont-act-167/page.tsx](frontend/app/vermont-act-167/page.tsx)
states Cohort 1 in three places, including a labelled fact box:

- L169 — `"CMS announces Vermont selected for AHEAD Model Cohort 1 (alongside Maryland)"`
- L175 — `"AHEAD Model Cohort 1 implementation officially begins in Vermont"`
- L454 — `{ label: "Vermont Cohort", value: "Cohort 1 (with Maryland)" }`

The book says **Cohort 2** consistently, 14+ times, including the signed
agreement in Appendix D (`HTR_Book_v42.md:5397`): *"Vermont's AHEAD Model State
Agreement was signed January 17, 2025; Vermont participates as a Cohort 2
state."* Also ch 2 line 895, ch 3 line 1317, Appendix H.4.

The start dates disagree too: the page says implementation began **Jan 1, 2026**;
the book says the Cohort 2 performance year begins **January 2028**, "updated per
CMS's September 2025 announcement" (line 806). The book's own line 1194 notes
Medicaid global budgets start Jan 2026 under the Cohort 2 agreement — so the
page may have conflated the Medicaid start with cohort membership.

I did not verify which is factually correct against CMS. **One of them is wrong
and they cannot both ship.**

### C-3 — **Hospitals-in-losses figure differs.** 🟡 Medium

| Source | Claim |
| :--- | :--- |
| Book (`:918`, `:962`, `:973`) | **9 of 14** in operating loss, FY2023 actual |
| Book (`:962`, `:974`, `:2113`) | **13 of 14** projected by 2028, conservative scenario |
| Act 167 page (`:248`) | *"Most Vermont hospitals are operating at a loss. By 2028, **13 of Vermont's 14** hospitals are projected to face even deeper deficits"* |

The 13/14 projection matches. But the page's lead-in — "most hospitals are
operating at a loss" — describes the *current* state, where the book's number is
9 of 14. Softer than a numeric conflict, though the page never gives the reader
the 9-of-14 baseline that the book treats as the headline diagnostic.

Related: the book quotes the five-year deficit as a **range**, "$700 million to
$2.4 billion depending on expense growth assumptions" (`:2113`, `:974`), but the
ch 2 milestone table (`:891`) compresses it to a bare **"$2.4B 5-year deficit
projection"** — the top of the range presented as the figure. Same in ch 12
(`:4220`). Internal to the book; worth a consistency decision.

### C-4 — Act 167 page omits the book's two headline diagnostics. 🟢 Low

Neither "9 of 14" nor "$2.4B" appears anywhere in
[frontend/app/vermont-act-167/page.tsx](frontend/app/vermont-act-167/page.tsx).
A reader following the book's Ch 2 pointer to that page does not find the
numbers the chapter built its argument on. Not a contradiction — a
non-reinforcement. Flagged because Ch 2 sends readers there specifically.

---

## 4. Orphans

- **Tool → book: none.** All 11 policy tools are named in the manuscript.
- **The Wire** (`/the-wire`) has an empty `chapters:` array — the only policy
  tool with no chapter mapping. It is a live news feed, so *likely deliberate*;
  it is mentioned 8× in the book but never chapter-anchored.
- **4 policy briefs have no book home** — Certificate of Need, PBM reform,
  surprise billing, scope of practice. Each is a real policy topic the book does
  not cover. *Likely deliberate* — editorial breadth beyond the book's Vermont
  focus — but they are what a reader browsing "Policy" sees first.
- **No reverse index.** Nothing in the Academy links to a *tool*; the
  course→book tie exists (`CourseBookTie`) but course→tool does not.

---

## 5. Gaps

| Gap | Assessment | Reasoning |
| :--- | :--- | :--- |
| **Chapter 2 has zero tools** in `tools.ts` | **Was an oversight — now closed** | Ch 2's own "Work This Chapter" table points readers at Policy Simulator + the Act pages, but `tools.ts` mapped Policy Simulator to `chapters: ["3"]` only. Now `["2", "3"]`. **Chapters 12, 14 and 16 remain at zero tools** — not yet assessed. |
| **Act 51 has no platform presence** | **Was an oversight — now closed** | Act 167 and Act 68 each had a dedicated route; Act 51 had none. ⚠️ The reasoning first recorded here ("defined the six-pillar architecture") was itself wrong — see [C-5](#c-5--the-book-misdescribed-act-51--high-found-while-building-the-page). `/vermont-act-51` now exists, written from the enacted text. |
| **AHEAD has no dedicated policy surface** | Likely deliberate | `/ahead-model` exists but is mapped to Economics (ch 6). AHEAD is genuinely cross-pillar. |
| **Prior authorization reform** — Ch 3 only | Likely deliberate | Minor sub-topic of one chapter. |
| **Global budgets / RBP have no Academy course** | Likely deliberate | Covered by `value-based-care` and `hospital-finance` under Economics. Cross-pillar by nature. |
| **Medicare + Medicaid managed care have no book chapter** | Likely deliberate | The book is a Vermont transformation argument, not a payer-mechanics primer. The Academy legitimately teaches foundations the book assumes. |

---

## 6. Recommendations

Ordered by effort-to-value. **All require author sign-off** — per
[CLAUDE.md](CLAUDE.md), thin or unlinked content is often intentional.

| # | Action | Effort | Value |
| :--- | :--- | :--- | :--- |
| ~~R-1~~ | ~~Fix `LEAD_CHAPTER` and repoint 97 docs + courses.~~ | — | ✅ **DONE** 2026-07-31 — see §7 |
| ~~R-2~~ | ~~Resolve the AHEAD cohort conflict.~~ | — | ✅ **DONE** 2026-07-31 — book was right, page corrected |
| ~~R-3~~ | ~~Add a `chapterRef` regression guard.~~ | — | ✅ **DONE** 2026-07-31 — `check-chapterref-integrity.mjs` |
| ~~R-4~~ | ~~Ch 2 tool mapping + an Act 51 route.~~ | — | ✅ **DONE** 2026-07-31 — and surfaced C-5, a factual error in the book |
| **R-5** | Reconcile the $700M–$2.4B range vs. the bare "$2.4B" in the book's own tables (C-3). | Low | Medium — internal consistency |
| **R-6** | Consider surfacing 9-of-14 and the deficit range on `/vermont-act-167` (C-4). | Low | Low–medium |

---

## 7. Fixes applied

Applied 2026-07-31 on the author's instruction ("fix it, leave those two courses
alone, and check CMS on the cohort"). Content fields were not touched — only
chapter-reference wiring and the factually wrong AHEAD figures.

### C-1 — chapter references repointed ✅

`frontend/scripts/fix-chapterref-offset.mjs` (new, dry-run by default).
It derives each pillar's lead chapter from `chapters.ts` **at runtime** rather
than hardcoding a map, so it stays correct if the book is restructured — and it
catches individually-wrong refs the −2 rule would miss.

| | Before | After |
| :--- | :--- | :--- |
| Sanity docs correct | **0 / 97** | **97 / 97** |
| Courses correct | 0 / 15 | 13 / 13 attempted (2 held back) |

Held back per instruction, unchanged: `hie-health-reform-onboarding` (ch 16),
`welcome-htr-framework` (ch 1).

One course was *not* a simple −2: `genomics-precision-medicine` was at ch 7
(Economics) and moved to ch 8 (Clinical) — it had been individually wrong.
Deriving from `chapters.ts` caught it; a blanket −2 would not have.

Root cause fixed at source: the `LEAD_CHAPTER` map in
[backfill-editorial-pillar-chapter.mjs:21](frontend/scripts/backfill-editorial-pillar-chapter.mjs#L21)
now holds the correct values, with a comment explaining the Preface/Introduction
trap so it is not reintroduced.

Verified with the same script that found the bug:
`node scripts/audit-chapterref-blast.mjs` → `correct: 97  mispointed: 0`.

### C-2 — AHEAD cohort corrected ✅

**The book was right; the platform page was wrong.** Confirmed against Vermont
reporting on the signed State Agreement: *"The agreement states that Vermont
will enter the second cohort in the program… Maryland may be the only state
that participates in the first cohort."*
([VTDigger, 17 Jan 2025](https://vtdigger.org/2025/01/17/vermont-moves-ahead-with-new-federal-health-care-payment-model/))
CMS then moved Cohorts 2–3 to January 2028 in September 2025 — exactly as the
book records at `HTR_Book_v42.md:806`.

Corrected in [frontend/app/vermont-act-167/page.tsx](frontend/app/vermont-act-167/page.tsx):

| Line | Was | Now |
| :--- | :--- | :--- |
| 169 | selected for "Cohort 1 (alongside Maryland)" | Cohort 2 (Maryland in Cohort 1) |
| 175 | "Cohort 1 implementation begins" Jan 2026 | Medicaid global budgets begin (Cohort 2 prep) |
| 176 | *(absent)* | **new** — Jan 1 2028 Cohort 2 performance year |
| 455 | "Cohort 1 (with Maryland)" | "Cohort 2 (Maryland is Cohort 1)" |
| 456 | "11 years (2024–2034)" | "11 years (2024–2035)" |
| 458 | Implementation start Jan 1 2026 | Jan 1 2028 (Medicare FFS global budgets) |

Two of these — the 2034 end date and the implementation start — were **not in
the original findings**; they surfaced while editing the fact box. The Jan 2026
date was not simply deleted: Vermont's Medicaid global budgets genuinely do
begin then (`HTR_Book_v42.md:1194`), so that row was reworded rather than
removed.

### R-3 — regression guard added ✅

`frontend/scripts/check-chapterref-integrity.mjs` — asserts every chapter
reference resolves to a chapter whose pillar matches the document's own. Exits
non-zero on drift; safe for CI. Currently passes.

This class of bug is silent: every wrong ref still resolved to a *real* chapter,
so nothing crashed and no link 404'd. Only a pillar cross-check catches it.

### C-5 — **The book misdescribed Act 51.** 🔴 High *(found while building the page)*

Not in the original pass. Building the Act 51 page meant reading the statute,
and it is **not what the book said it was**.

Vermont Act 51 of 2023 (**H.206**, signed June 6, 2023) is titled *"An act
relating to miscellaneous changes affecting the duties of the Department of
Vermont Health Access."* Its nine sections cover Medicaid adult dental
coverage, third-party liability, the prescription monitoring system, an FQHC
payment report, a Blueprint for Health payment report, a PBM/340B repeal,
hospital liens, and effective dates.

**Sec. 8 is the only transformation content**: it adds a new Sec. 2a to Act 167
authorizing AHS to conduct transformation planning with *up to four hospitals*,
informed by Act 167's analysis and coordinated with GMCB.

There is no six-pillar framework in the statute and no AHS restructuring
mandate — that is Act 68's, which the book states correctly elsewhere. The
six-pillar framework is the book's own analytical model, not Vermont law.

The book contradicted itself: its Sources line (`:5958`) was accurate
(*"healthcare-reform continuation; hospital sustainability assessments; CON
review"*) while three prominent places were wrong. Corrected in the manuscript:

| Line | Was | Now |
| :--- | :--- | :--- |
| 663 | "Act 51 defined the transformation architecture" | "moved from diagnosis to planning, authorizing AHS to run transformation engagements with individual hospitals" |
| 893 (ch 2 table) | "Defined the six-pillar transformation architecture; established AHS restructuring mandate" | "Authorized AHS hospital transformation planning pilots with up to four hospitals (amending Act 167); Medicaid and DVHA program changes" |
| 5623 (App. H glossary) | "Defined the six-pillar transformation architecture and the AHS restructuring mandate." | "Vermont's planning mandate — authorized AHS to conduct transformation planning with up to four hospitals (amending Act 167)…" |

Lines 866, 911, 4557, 4625 and 4665 were left alone — their "reform cascade" /
"planning mandate" framing is accurate.

`VermontReformCascade.tsx` carried the same error in a different form,
describing Act 51 as *"Health Care Reform & Data Infrastructure"* with four
VHCURES/GMCB data provisions **none of which are in the statute**. Rewritten
against the enacted text and repointed from `/policy` to `/vermont-act-51`.

Source: [Act 51 as enacted](https://legislature.vermont.gov/Documents/2024/Docs/ACTS/ACT051/ACT051%20As%20Enacted.pdf)
(Vermont Legislature, official enrolled text).

### R-4 — Chapter 2 coverage gap closed ✅

- `policy-simulator` now maps to `chapters: ["2", "3"]` in `tools.ts`, matching
  what Ch 2's own "Work This Chapter on the Platform" table already told
  readers. Chapter 2 is no longer a zero-tool chapter.
- **New page: `/vermont-act-51`** — section-by-section from the enacted text,
  with Sec. 8 broken out, the cascade position, and primary sources. Written to
  describe the statute as it actually reads, and it says so explicitly where
  secondary summaries differ. Added to Ch 2's `platformLinks` in `chapters.ts`.

### Incidental finding — empty Sanity token

`SANITY_API_TOKEN` in `frontend/.env.local` is **empty**. The write-capable
token (role: `editor`) is in `backend/.env`. Sanity reads are public, so audit
scripts appeared to work; only writes failed. Worth reconciling — a script
following the runbook's "credentials are in `frontend/.env.local`" will fail to
write with a permissions error that does not name the real cause.

---

## Notes for the next pass

- **C-1 is already measured for all six pillars** — the table in §3 has the
  per-pillar doc counts. The remaining passes do not need to re-derive it.
- `chapters.ts` has **18 entries for 16 chapters** (Preface + Introduction carry
  `num: "Preface"` / `"Introduction"`). Any future indexing work should treat
  `num` as an opaque string, never an array position. This is the trap that
  produced C-1.
- `lessons` orders on a column literally named `"order"`, not `order_index`; a
  `.order("order_index")` call fails silently and returns rows unordered.
- Two `grep -noE` patterns with `.{0,180}` wrappers over the 5,700-line
  manuscript backtrack catastrophically and hang. Use `grep -n -F` for
  fixed-string manuscript searches.
