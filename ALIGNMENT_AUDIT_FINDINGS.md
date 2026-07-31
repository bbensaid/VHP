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
| 1 | **Policy** | 2026-07-31 | Complete — fixes applied (§7) |
| 2 | **Technology** | 2026-07-31 | Complete — fixes applied (§T6) |
| 3 | Economics | — | Not started |
| 4 | Clinical | — | Not started |
| 5 | Equity | — | Not started |
| 6 | Operations | — | Not started |

The author held the manuscript during both audit passes (`./book.sh who`), so
`HTR_Book_v42.md` was read-only while auditing. The one exception is C-5, where
the author explicitly authorised the Act 51 correction; the lock was taken and
handed back for that edit.

## Scripts written for this audit (read-only)

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

## Pass 2 — Technology pillar

**2026-07-31.** Book chapters 4 and
5. The author held the manuscript throughout; `HTR_Book_v42.md` was read only.

New read-only scripts, both reusable for passes 3–6:

| Script | Purpose |
| :--- | :--- |
| `frontend/scripts/audit-pillar-inventory.mjs <Pillar>` | Sanity + Academy inventory for any pillar |
| `frontend/scripts/audit-pillar-excerpts.mjs` | Verifies C-6 — exits 1 while it stands |

### T1. Inventory

#### Book — Technology chapters

| Ch | Title | Lines |
| :--- | :--- | :--- |
| 4 | The Technology Pillar — Data Infrastructure for a Transformed Health System | 1501–1854 |
| 5 | The Technology Pillar in Practice — FHIR, AI Governance, and Clinical Decision Support | 1855–2038 |

#### Platform — Technology tools

6 tools carry `pillars: ["technology"]`, plus 4 cross-cutting. All 6 are named
in the manuscript and all three bench routes resolve — **no orphans**.

| Tool | `chapters:` |
| :--- | :--- |
| FHIR Interoperability Lab | 4, 5 |
| EMR/EHR Lab | 4 |
| Statewide EHR Deployment Modeler | 4 |
| AI Clinical Governance Lab | 5 |
| Digital Health Lab | 5 |
| Clinical Data Exchange Lab | 5 |

#### Platform — Technology editorial

25 Sanity docs tagged `Technology`: 17 `policyAnalysis`, 3 `academyModule`,
2 `caseStudy`, 1 `analystNote`, 1 `report`, 1 `webinar`. All now correctly at
`chapterRef=4` after pass 1's C-1 fix.

#### Academy — 2 substantive courses

| Course | Lessons | Rich | `chapter_ref` |
| :--- | :--- | :--- | :--- |
| ai-machine-learning-healthcare | 18 | 18/18 ✅ | 4 |
| interoperability-data-exchange | 26 | 25/26 ⚠️ | 4 |
| welcome-htr-framework | 1 | 0/1 ❌ | 1 (cross-cutting) |

### T2. Coverage matrix — Technology

| Concept | Book | Tool | Editorial | Academy |
| :--- | :--- | :--- | :--- | :--- |
| VHCURES / APCD | Ch 4 | — | — | — |
| VITL / VHIE | Ch 4 | — | 2 briefs (VHIE resilience, CRISP pivot) | interop *Vermont's HIE: VITL* |
| Act 62 HIE governance transfer | Ch 4 | — | — | — |
| FHIR / interoperability | Ch 4, 5 | FHIR Lab | 1 brief (TEFCA) | interop track (4 lessons) |
| Terminology (SNOMED/LOINC/RxNorm) | Ch 4 | FHIR Lab | — | interop *Clinical Terminology* |
| USCDI data quality | Ch 4 | EMR/EHR Lab | — | interop *USCDI* |
| EHR market / TCO / ROI | Ch 4 | EMR/EHR Lab | — | interop *EHR Business Case* |
| Statewide EHR feasibility | Ch 4 | Statewide EHR Modeler | — | — |
| Risk stratification / HCC | Ch 4 (Fig 4.H) | Risk Stratification Engine ⚠️ | — | aiml *Population Health AI* |
| AI governance lifecycle | Ch 4, 5 | AI Governance Lab | 3 briefs | aiml *AI Governance* |
| Clinical decision support | Ch 5 | AI Governance Lab | 2 briefs | aiml CDS track (2) |
| Ambient AI / scribe | Ch 5 | — | 1 brief | aiml *LLMs in Healthcare* |
| RPM / telehealth | Ch 5 | Digital Health Lab | 2 briefs | — |
| HL7 v2 messaging | Ch 5 | Clinical Data Exchange Lab | — | interop *HL7 v2* |
| Cybersecurity / ransomware | — | — | 2 briefs | interop *HIPAA Security* |
| Information blocking / Cures Act | — | — | — | interop track (4 lessons) |
| FDA regulation of AI/SaMD | — | — | 1 brief | aiml FDA track (2) |
| Algorithmic bias | Ch 10 (Equity) | — | — | aiml fairness track (2) |

### T3. Contradictions

### C-6 — **All six pillar pages cite the wrong book chapters, and contradict their own headings.** 🔴 Critical

[frontend/components/FromTheBookForPillar.tsx:14-46](frontend/components/FromTheBookForPillar.tsx#L14-L46)

The component computes the chapter range correctly from `chapters.ts`, then
renders it beside a **hardcoded excerpt whose chapter numbers are the +2 error
again** — the same Preface/Introduction miscount as C-1, in prose this time.
Both appear on the same card, so each pillar page contradicts itself:

| Pillar page | Heading renders | Excerpt prose says | Off by |
| :--- | :--- | :--- | :--- |
| `/policy` | Chapters 2 & 3 | "Chapter 4 decodes… Chapter 5 covers…" | +2 |
| `/technology` | Chapters 4 & 5 | "Chapter 6 covers VHCURES… Chapter 7…" | +2 |
| `/economics` | Chapters 6 & 7 | "Chapter 8 dissects… Chapter 9 provides…" | +2 |
| `/clinical` | Chapters 8 & 9 | "Chapter 10 covers… Chapter 11 provides…" | +2 |
| `/equity` | Chapter 10 | "Chapter 12 treats… Chapter 13 operationalizes…" | +2, **and invents a 2nd chapter** |
| `/operations` | Chapter 11 | "Chapter 14 covers… Chapter 15 provides…" | +3, **and invents a 2nd chapter** |

Equity and Operations are worse than a renumbering. Each pillar has exactly
**one** chapter (10 and 11), but both excerpts describe two, and the invented
second chapter's content does not exist: chapters 12, 13 and 15 are Knowledge
Transfer, The Future, and Portfolio Management — not equity measurement or
operational levers.

The *substance* of each excerpt is otherwise accurate — VHCURES/Act 62/FHIR
genuinely is chapter 4. So for four pillars this is a pure renumbering fix;
Equity and Operations additionally need their phantom second chapter removed.

Reader-visible on all six top-level pillar pages (five via `PillarOverview`,
`/operations` directly) — a primary navigation surface.

Verify: `cd frontend && node scripts/audit-pillar-excerpts.mjs` (exits 1 while this stands)

### C-7 — **Act 62 dated 2024 in one place, 2025 everywhere else.** 🟡 Medium

[frontend/lib/data/state-comparison.ts:177](frontend/lib/data/state-comparison.ts#L177)
reads `{ value: "Act 62 (2024)", detail: "Reorganized governance of VITL" }`.

The book (`HTR_Book_v42.md:1590`), `VermontReformCascade.tsx:89`, and
`TransformationScorecard.tsx:91` all say **2025**, effective July 1, 2025.

**2025 is correct** — Act 62 is S.63 of the 2025 session; GMCB's own HIT pages
confirm the July 1, 2025 transfer. The `state-comparison.ts` entry is wrong,
and it sits in a cross-state comparison table where Vermont is scored "best."

### C-8 — Chapter 4 features a tool that isn't tagged Technology. 🟡 Medium

Ch 4's "Work This Chapter on the Platform" table (`:1806`) sends readers to the
**Risk Stratification Engine** as one of four Technology-pillar tools, with the
rationale *"why technology must precede economics."* In
[tools.ts:170](frontend/lib/taxonomy/tools.ts#L170) that tool is
`pillars: ["clinical", "equity"], chapters: ["8", "9"]` — neither tagged
`technology` nor mapped to chapter 4.

The href in the book matches the registry, so the link works. But the tool is
invisible in any Technology-pillar or chapter-4 listing, which is the same
class of gap as Ch 2's zero-tool finding in pass 1. It is genuinely used by
three chapters (4, 8, 9), so this is a tagging question, not a relocation.

### T4. Orphans and gaps — Technology

- **No tool orphans.** All 6 technology tools are named in the book; all bench
  routes resolve.
- **VHCURES, VITL and Act 62 have no tool and no dedicated page** — the three
  most Vermont-specific items in ch 4. *Likely deliberate* (they are described,
  not modelled), but Act 62 is referenced in four separate files without a home
  page, unlike Acts 167/51/68.
- **Cybersecurity/ransomware: 2 briefs, no book coverage.** Editorial breadth
  beyond the book — *likely deliberate*.
- **Information blocking / Cures Act: 4 Academy lessons, no book coverage.**
  Foundational material the book assumes — *likely deliberate*.
- **`interoperability-data-exchange` is 25/26** — one lesson not rich. Per the
  standing rule, thin content is often intentional; flagged, not actioned.

### T5. Recommendations — Technology

| # | Action | Effort | Value |
| :--- | :--- | :--- | :--- |
| ~~R-7~~ | ~~Fix the six `PILLAR_EXCERPTS` (C-6).~~ | — | ✅ **DONE** 2026-07-31 |
| ~~R-8~~ | ~~Correct Act 62 to 2025 (C-7).~~ | — | ✅ **DONE** 2026-07-31 |
| ~~R-9~~ | ~~Tag Risk Stratification Engine for Technology / ch 4 (C-8).~~ | — | ✅ **DONE** 2026-07-31 |
| ~~R-10~~ | ~~Extend the guard to component prose.~~ | — | ✅ **DONE** 2026-07-31 |

### T6. Fixes applied — Technology

All four applied 2026-07-31. Verified: `tsc` clean, `next build` passes, all six
pillar pages re-rendered and checked, guard green.

**C-6 — six pillar excerpts rewritten.**
[FromTheBookForPillar.tsx](frontend/components/FromTheBookForPillar.tsx)

| Page | Heading | Excerpt before | Excerpt now |
| :--- | :--- | :--- | :--- |
| `/policy` | Chapters 2 & 3 | ch 4, 5 | ch 2, 3 ✅ |
| `/technology` | Chapters 4 & 5 | ch 6, 7 | ch 4, 5 ✅ |
| `/economics` | Chapters 6 & 7 | ch 8, 9 | ch 6, 7 ✅ |
| `/clinical` | Chapters 8 & 9 | ch 10, 11 | ch 8, 9 ✅ |
| `/equity` | Chapter 10 | ch 12, 13 | ch 10 only ✅ |
| `/operations` | Chapter 11 | ch 14, 15 | ch 11 only ✅ |

Equity and Operations needed rewriting, not renumbering. Their phantom second
chapter was removed and the real chapter's content substituted, read from the
manuscript: ch 10 genuinely contains both the disparity analysis *and* the
HEROI / stratified-HEDIS measurement material; ch 11 is the transformation
operating model, RHRC methodology, regionalization, workforce, and the $1,303
per-discharge administrative cost gap.

> **One claim was fabricated, not just misnumbered.** The Operations excerpt
> promised *"30 operational levers for cost reduction."* `grep -F "30 operational"`
> returns nothing in the manuscript. Replaced with what ch 11 actually covers.

A comment now marks the map as taxonomy-coupled, since nothing enforces it at
runtime.

**C-7 — Act 62 corrected to 2025.**
[state-comparison.ts:177](frontend/lib/data/state-comparison.ts#L177). Detail
text also expanded to name the actual change (HIT Plan + VITL oversight, GMCB →
DVHA, effective July 1, 2025) rather than the vague "Reorganized governance of
VITL." Confirmed against GMCB's own HIT pages: Act 62 is S.63 of the 2025
session.

**C-8 — Risk Stratification Engine retagged.**
[tools.ts:170](frontend/lib/taxonomy/tools.ts#L170) — now
`pillars: ["technology", "clinical", "equity"]`, `chapters: ["4", "8", "9"]`.
It is genuinely used by all three chapters, so this is additive; nothing was
removed. Ch 4's platform table no longer points at a tool invisible to the
Technology pillar. Tool→chapter pairs: 44 → 45.

**R-10 — guard extended to component prose.**
[check-chapterref-integrity.mjs](frontend/scripts/check-chapterref-integrity.mjs)
now also parses `FromTheBookForPillar.tsx` and asserts each excerpt's cited
chapters match `chapters.ts`, failing if the parser stops matching all six
(so the check cannot silently no-op). Verified by reintroducing the bug: the
guard exits 1 and names the pillar.

C-1 and C-6 are the same defect in two media — data and prose. The guard now
covers both.

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
