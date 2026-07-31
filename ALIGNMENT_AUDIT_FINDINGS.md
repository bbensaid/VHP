# Book ↔ Platform ↔ Academy — Alignment Audit Findings

Companion to [ALIGNMENT_AUDIT_BRIEF.md](ALIGNMENT_AUDIT_BRIEF.md). One pillar
per pass; findings accumulate here.

**Report only.** Nothing in any corpus was modified. Every count below came from
a script, not an estimate; the scripts are named so each number can be re-derived.

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
| **Chapter 2 has zero tools** in `tools.ts` | **Likely oversight** | Ch 2's own "Work This Chapter" table points readers at Policy Simulator + the Act pages, but `tools.ts` maps Policy Simulator to `chapters: ["3"]` only. The book promises a ch-2 tool experience the registry does not encode. Chapters 12, 14 and 16 are also at zero tools. |
| **Act 51 has no platform presence** | **Likely oversight** | Act 167 and Act 68 each have a dedicated route; Act 51 defined the six-pillar architecture the whole platform is organised around, and has none. |
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
| **R-1** | Fix `LEAD_CHAPTER` in the backfill script (−2 on every value), then re-run to correct 97 Sanity docs + 15 courses. Decide the two cross-cutting courses by hand. | Low — one map, one re-run | **Very high** — corrects every book↔platform tie on `/book` and every course page |
| **R-2** | Resolve the AHEAD cohort conflict (C-2) against the CMS source of record, then correct whichever side is wrong. | Low | **High** — a labelled fact box contradicting the book |
| **R-3** | Add a regression guard asserting every `chapterRef` resolves to a chapter whose `pillar` matches the doc's. Would have caught C-1 at write time. | Low | High — this class of bug is silent |
| **R-4** | Decide whether Ch 2 should map to tools in `tools.ts`, and whether Act 51 warrants a route. | Medium | Medium — closes the Policy pillar's real coverage gaps |
| **R-5** | Reconcile the $700M–$2.4B range vs. the bare "$2.4B" in the book's own tables (C-3). | Low | Medium — internal consistency |
| **R-6** | Consider surfacing 9-of-14 and the deficit range on `/vermont-act-167` (C-4). | Low | Low–medium |

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
