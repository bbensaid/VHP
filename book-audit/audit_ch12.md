# Chapter 12 Audit

**Chapter 12: Infrastructure for Knowledge Transfer and Implementation**
Read-only pass, 2026-09-27. Ground truth = `word/document.xml` inside `HTR_Book_v42.docx`
(local copy of this date), high-offset Heading1 slice only (`Chapter 12: Infrastructure` →
`Chapter 13: The Future`, ~152,045 chars). The `.md` mirror was **not** used — it loses
table cells. The TOC copy of the heading (offset ~246,749) and the trailing duplicate of the
Figure 12.4 caption (~5,600,235) were both excluded.

Parsed structure: 10 H2 sections (12.1–12.10), 6 H3, 4 tables, 55 non-empty prose paragraphs.
Paragraph numbers below are that parse order and are for locating text, not for citation.

---

## Figures found (ground truth)

All four figures exist, are numbered 12.1–12.4 with no gap or duplicate, and each sits
immediately after the table it captions.

**Figure 12.1** — caption: *"Figure 12.1 — technical infrastructure framework components and
intended users. Source: technical infrastructure framework documentation."*
Table: **2 columns × 1 header + 4 data rows.** Header cells: `Component` | `What it provides`.
Rows: `The Wire`; `HTR Research Lab`; `HTR Academy`; `Transformation Advisory Services`.
The Research Lab cell names 7 tools: APM Shared Savings Calculator, VBC Transformation
Readiness Assessment (30-dimension), Hospital Financial Stress Test, AI Governance Checklist,
Health Equity Studio (HEROI scoring, HEDIS stratification, disparity decomposition), VBC
Contract Review Checklist, Policy Impact Assessment Framework.

**Figure 12.2** — caption: *"Figure 12.2 — Kotter's change management framework applied to
Vermont's healthcare transformation. Sources: HTR Advisory methodology; Kotter (1996); Vermont
transformation documentation."*
Table: **4 columns × 1 header + 8 data rows.** Header: `Kotter step` | `Original formulation` |
`Healthcare adaptation` | `Vermont application`. Steps 1–8: Create urgency; Form a guiding
coalition; Develop a vision; Communicate the vision; Remove obstacles; Create short-term wins;
Sustain acceleration; Institute change.

**Figure 12.3** — caption: *"Figure 12.3 — HTR Implementation Toolkit: available tools for
Strategist and Enterprise subscribers."*
Table: **2 columns × 1 header + 10 data rows.** Header: `Tool` | `What it does`.
Rows: APM Shared Savings Calculator; VBC Transformation Readiness Assessment; Hospital
Financial Stress Test Model; Health Equity Studio (HEROI); AI Clinical Governance Checklist;
VBC Contract Review Checklist; Policy Impact Assessment Framework; Transformation Readiness
Scorecard; FHIR Implementation Guide; HCC Gap Closure Playbook.

**Figure 12.4** — caption: *"Figure 12.4 — Hands-on platform tools for Chapter 12: turning
knowledge into implementation."*
Table: **3 columns × 1 header + 3 data rows.** Header: `Do this` | `On this tool` | `What to
look for`. Tools named: `Evidence Library`; `Research Workspace`; `AI Analyst`.
(Note: unlike other chapters' Work-This-Chapter tables, the `On this tool` cells carry **no
route paths** — e.g. Chapter 10's equivalent cell reads "Health Equity Studio —
/research-lab/population-equity?tab=equity". Ch12's are bare names. Flagged as a consistency
item, not a factual error; route verification is out of scope for this pass.)

---

## Claims checked against their own source (MATCH/MISMATCH + proposed fix)

### MISMATCH 1 — "the preceding sixteen chapters" in Chapter 12 (¶4, §12.1) — the big one

> "Every concept in the **preceding sixteen chapters** exists at an intersection…"

The book has exactly 16 chapters (verified: `Chapter 1:`–`Chapter 16:`, no 17). Chapter 12 has
**eleven** preceding chapters. The sentence describes the position of a final chapter, not of
Chapter 12 — a clear leftover from an earlier structure in which this material closed the book.
This is the same defect class as the Chapter 1 §1.6 miscount: a precise number that the
document itself contradicts.
**Proposed fix:** replace `the preceding sixteen chapters` with `the preceding chapters`
(matches Chapter 15's own phrasing, "Every concept in the preceding chapters maps to a
project-management discipline") or with `the preceding eleven chapters`.

### MISMATCH 2 — the chapter never describes the infrastructure its frame claims it describes

Four passages assert that this chapter describes a Transformation PMO, learning collaboratives
and Communities of Practice:

- Epigraph (¶1): "The Transformation PMO, learning collaboratives, and Vermont CIN shared
  services are the connective tissue…"
- ¶2: "The infrastructure described in this chapter — a program management function, structured
  advisory support, learning collaboratives, and a change-management discipline…"; "Vermont's
  specific instantiations (the Transformation PMO, the CIN shared services) are **this
  chapter's example**…"
- ¶42: "The knowledge transfer infrastructure **this chapter describes** — learning
  collaboratives, Communities of Practice, the Vermont CIN's shared analytics capability…"
- ¶43: "The Transformation PMO **this chapter describes** is the operational spine…"
- ¶44: "This chapter describes infrastructure that is necessary but not headline-generating: a
  PMO, learning collaboratives, a change management function, Communities of Practice."
- ¶45: "Every state … will need a PMO, learning collaboratives, a change management function…"

String counts over the chapter body (§12.1–§12.8, i.e. everything between the opening frame and
Implications): **"Transformation PMO" = 0, "learning collaborative" = 0, "Communities of
Practice" = 0, "CIN shared services" = 0.** All hits are in the epigraph, ¶2 and §12.9
Implications. The body (§12.2 platform components, §12.3 advisory service lines, §12.4 Kotter /
pace, §12.5 toolkit, §12.6 selecting advisory support, §12.7 HTR's Vermont engagements) is
about the HTR commercial platform and advisory practice. Of ¶2's four promised items, only two
(structured advisory support, change-management discipline) are delivered.

Book-wide, the PMO *is* described — in Chapter 15 ("Healthcare Transformation as Portfolio
Management", §15.1 "The Project-Management Gap") and in the Chapter 16 / Appendix A AHS
material ("AHS Transformation PMO + 14-hospital regionalization plan"). So the content exists;
Chapter 12's frame points at the wrong chapter.
**Proposed fix (author's call, two clean options):**
(a) Rewrite the six framing sentences to describe what §12.1–12.8 actually contain and
cross-reference Chapter 15 for the PMO — e.g. ¶43 → "The Transformation PMO described in
Chapter 15 is the operational spine…"; or
(b) Add a body section under §12.2 that actually describes the PMO, learning collaboratives and
Communities of Practice, and let the Implications stand.
Option (a) is the smaller, safer edit and is consistent with the book's practice of
cross-referencing rather than re-deriving.

### MISMATCH 3 — Figure 12.1's caption promises a column the table does not have

Caption: "technical infrastructure framework components **and intended users**."
The table has two columns, `Component` and `What it provides`. No cell names an intended user
or audience. The lead-in (¶10) does gesture at it — "each designed for a different kind of
engagement with the transformation agenda" — but no row states who the component is for.
**Proposed fix:** shorten the caption to "Figure 12.1 — The four components of the HTR
platform." (dropping "and intended users"), or add a third column `Intended user`. The caption
edit is the surgical one.

### MISMATCH 4 — §12.3 claims one service line per pillar; the five subsections are not the five pillars

> ¶12: "HTR Advisory engagements are organized around the five-pillar framework, with **service
> lines corresponding to each pillar** and cross-pillar engagements…"

The five H3 subsections that follow are: 12.3.1 Policy Strategy · 12.3.2 VBC Economics ·
12.3.3 Health Equity Practice · 12.3.4 Technology Strategy · 12.3.5 Transformation Management.

Against the book's five pillars (Policy, Technology, Economics, Clinical, Operations): Policy,
Economics and Technology map; **Clinical and Operations have no service line**, and Health
Equity Practice and Transformation Management are not pillars — Equity is explicitly the
cross-cutting lens, and Transformation Management is by its own text the *cross-pillar*
engagement. So the count is five-and-five by coincidence, not correspondence, and the sentence
as written asserts a mapping the section does not deliver.
**Proposed fix:** "…organized around the five-pillar framework, with service lines for the
Policy, Economics and Technology pillars, a dedicated Health Equity practice reflecting
Equity's cross-cutting role, and a Transformation Management line for organizations
executing across all five pillars at once." (This also removes the now-redundant "and
cross-pillar engagements for organizations navigating transformation at the system level",
which duplicates 12.3.5.)

### MISMATCH 5 — AHEAD global budget entry: "2027" vs the chapter's own "FY2028" and "January 2028"

Within Chapter 12:
- ¶18 (§12.3.2): "Vermont hospitals preparing for **AHEAD global budget entry in 2027**…"
- ¶25 (§12.4.2): "statutory deadlines — RBP by FY2027, **global budgets by FY2028**"
- ¶28 (§12.4.2): "**AHEAD's January 2028 launch** is a federal decision"

Book-wide, January 2028 / FY2028 is the settled figure (Appendix timeline: "January 1, 2028 —
Act 68 hospital global budgets take effect (FY2028) … Primary Care AHEAD and global budgets
launch"; "FY2028 (Oct 1, 2027) Global budgets for non-CAH (PPS)"). A bare "2027" is at best
the FY2028 start date read as a calendar year, and it reads as a third, inconsistent date
three paragraphs before ¶28 says January 2028.
**Proposed fix:** ¶18 → "Vermont hospitals preparing for AHEAD global budget entry in FY2028
(January 2028 for the AHEAD model; October 2027 for PPS hospitals' fiscal year)" — or simply
"…entry in January 2028", matching ¶28 and the timeline.

### MISMATCH 6 — Figure 12.3's tool names drift from Figure 12.1's, two pages apart

Same instruments, two namings, in adjacent figures of the same chapter:

| Figure 12.1 | Figure 12.3 |
| :--- | :--- |
| AI Governance Checklist | AI Clinical Governance Checklist |
| Hospital Financial Stress Test | Hospital Financial Stress Test Model |
| Health Equity Studio (HEROI scoring, HEDIS stratification, disparity decomposition) | Health Equity Studio (HEROI) |

Appendix E and the Chapter 10 platform table use **AI Clinical Governance** and **Hospital
Financial Stress Test** (no "Model"). §12.2.1 (¶7) adds a third naming layer, listing nine
Research Lab tools of which only Health Equity Studio overlaps Figure 12.1's seven.
**Proposed fix:** in Figure 12.1, "AI Governance Checklist" → "AI Clinical Governance
Checklist"; in Figure 12.3, "Hospital Financial Stress Test Model" → "Hospital Financial
Stress Test".

### MATCH — Kotter: "eight-step" (¶23) vs Figure 12.2's 8 data rows, vs Key Concepts' 8-step list

¶23 "John Kotter's eight-step change management framework"; Figure 12.2 has exactly 8 data
rows numbered 1–8; ¶52 Key Concepts lists "urgency, coalition, vision, communication, obstacle
removal, short-term wins, acceleration, institutionalization" — 8 items, in the table's order,
each matching its row. **MATCH, three ways.**

### MATCH — "four integrated components" (¶10) vs Figure 12.1's 4 data rows

¶10 "The transformation implementation platform has four integrated components"; §12.2.1 lists
four (THE WIRE, RESEARCH LAB, HTR ACADEMY, ADVISORY SERVICES); Figure 12.1 has 4 data rows;
both H3 headings say "Four Components". **MATCH.**

### MATCH — every numeric specification in Figures 12.1/12.3, checked against the rest of the book

- "VBC Transformation Readiness Assessment (30-dimension)" / "30-dimension assessment across
  six domains" — corroborated: Appendix E.18 "30-dimension, 6-domain assessment (120 points)";
  Key Concepts elsewhere "The 30-dimension, 6-domain assessment… Total score below 60/120".
  **MATCH.**
- "AI Clinical Governance Checklist — 62-item governance evaluation across eight governance
  domains" — corroborated: Appendix E.12 "62-item checklist, 8 governance domains"; Chapter 10's
  platform table "The 62-item checklist across eight governance domains". **MATCH.**
- "VBC Contract Review Checklist — 65-item analysis framework" — the only occurrence in the
  book; nothing contradicts it. **MATCH (uncorroborated but not contradicted).**
- "HEROI… composite equity performance score calculated across five dimensions" (¶51) —
  corroborated: §10.13.1 "calculated across five equity dimensions"; Appendix E.6 "Access
  Equity (25%), Quality Equity (25%), Outcome Equity (25%), SDOH Burden (15%), Trust &
  Engagement (10%)" = five, weights sum to 100%. **MATCH.**
- "nearly forty interactive tools" (¶7) — corroborated three further times (Introduction,
  Appendix F.5, platform description). **MATCH.**
- "FHIR Implementation Guide… three priority FHIR use cases… Epic, Oracle Health, Meditech,
  and TruBridge" — four named vendors, consistent with the book's Vermont EHR inventory.
  **MATCH.**

### MATCH — Figure 12.2's Vermont financial figures

- "9/14 Vermont hospitals reporting losses" (Figure 12.2 row 1) and "9 of 14 hospitals are
  financially fragile" (¶42) — the 9/14 figure appears 4× book-wide. **MATCH**, with a wording
  note: "reporting losses" and "financially fragile" are not the same predicate; the chapter
  uses them interchangeably for the same 9 hospitals. Minor — worth making one of them defer to
  the other's definition.
- "$2.4B 5-year deficit" — 7 occurrences book-wide. **MATCH.**
- "108% premium increase" — corroborated: "average premiums for silver exchange plans reached
  $948 in 2024 — a 108% price increase in six years" and "individual-market monthly premium
  rose from $456 (2018) to $948 (2024) — a 108% increase". **MATCH**, though Figure 12.2 drops
  the qualifier; unqualified it reads as all-market premium growth, which the book elsewhere
  puts at 60–80% for individual and small group. Suggest "108% individual-market premium
  increase".
- "$230.65M in commercial revenue reductions" (Figure 12.2 row 6) — 2 occurrences book-wide.
  **MATCH.**
- "Act 68's December 2028 deadline" (rows 3 and 7) vs "Vermont's 2028 Statewide Strategic Plan
  is the vision document… the vision is the December 2028 deadline" (row 3) — the book
  elsewhere says "The December 2028 Statewide Strategic Plan". Consistent, but row 3 conflates
  the Plan with the deadline in a way that reads as two different things being the same thing.
  Suggest: "…the vision is the December 2028 Statewide Strategic Plan deadline."

---

## Superlative/ranking claims logged for cross-chapter comparison

Verbatim, with locator and context. None of these is contradicted *within* Chapter 12; they are
logged because this chapter makes eleven of them and several are the "most X" form that has
produced cross-chapter contradictions before.

1. **¶1, epigraph:** "…are the connective tissue between Vermont's statutory mandates and the
   organizational capacity to execute them — and **their absence would be more consequential
   than any policy design flaw**." — ranks implementation infrastructure above all policy
   design. Compare against any chapter ranking a pillar or dependency as the most consequential
   / most underestimated. *Highest cross-chapter collision risk of the eleven.*
2. **¶6 / ¶22 (stated twice, verbatim):** "Healthcare transformation **fails more often**
   because of change management failures than analytical failures."
3. **¶18, §12.3.2:** "**The most common** VBC Economics engagement is an APM Contract
   Analysis…"
4. **¶18, §12.3.2:** "Vermont hospitals preparing for AHEAD global budget entry in 2027
   represent the **current highest-priority client segment** for this engagement."
5. **¶20, §12.3.4:** "…the healthcare IT decisions that have **the most significant strategic
   implications**: EHR selection and implementation, FHIR implementation planning, AI
   governance framework development, population health platform selection, and HIE connectivity
   strategy." (Five items all jointly "most significant".)
6. **¶20, §12.3.4:** "For Vermont's 14-hospital CIN, the **highest-priority** Technology
   Strategy engagement is the analytics vendor evaluation and CIN data architecture design…"
   — note this sits one sentence after claim 5; the section names a most-significant *class* and
   a highest-priority *instance*.
7. **¶21, §12.3.5:** "This is **the most intensive** advisory engagement…"
8. **¶25, §12.4.2:** "**One of the most consequential** advisory questions in healthcare
   transformation is pace…"
9. **¶25, §12.4.2:** "Whether Vermont's organizational capacity can match that pace is **the
   critical execution uncertainty**." — a singular superlative; compare against other chapters'
   nominations for the critical uncertainty / binding constraint (Chapter 15 uses "binding
   constraint" language).
10. **¶36, §12.6:** "**The most common advisory failure** in healthcare transformation is
    engaging external consultants for analysis and stopping before implementation."
11. **¶42, §12.9:** "…the fragile hospitals serve the populations **whose outcomes most need to
    improve**."
12. **¶45, §12.9:** "Vermont's infrastructure chapter is **the most transferable content in
    this book**." — the only occurrence of "most transferable" book-wide, so uncontradicted,
    but note it (a) ranks this chapter against all others and (b) refers to the chapter in the
    third person ("Vermont's infrastructure chapter"), which is odd inside the chapter itself
    and is further evidence of the relocation described in MISMATCH 2. Suggest "This chapter's
    subject is the most transferable content in this book" if the claim is kept.

Also logged, not superlative but a ranking-shaped absolute: **¶26, §12.4.2** — "Hiring the
staff to manage the portfolio on the statutory timeline **is not optional**." Compare with the
book's other "not optional" assertions (Ch12 ¶42 "is not optional generosity"; elsewhere
"Getting HCC coding right before AHEAD launches is not optional"). Three in-chapter uses of the
construction, two of them within two paragraphs of each other (¶26, ¶42).

---

## Other issues

### Genuine repetition

1. **§12.2.1 and §12.2.2 are the same content twice, back to back, under near-identical
   headings.** `12.2.1 The HTR Platform — Four Components` gives the four components as four
   all-caps prose paragraphs (¶6–¶9); `12.2.2 Four Components of the HTR Platform` re-introduces
   them ("The transformation implementation platform has four integrated components…") and
   presents the same four in Figure 12.1. This is not a table summarising its own prose at a
   distance — it is a duplicated section with a duplicated title. The two versions also
   disagree in detail (§12.2.1's Research Lab lists nine tools — FHIR Lab, EMR/EHR Lab,
   Statewide EHR Modeler, APM Design Lab, Health Equity Studio, Policy Simulator, CIN & Shared
   Services Modeler, EMS Transformation Modeler, "and more"; Figure 12.1's lists seven, of
   which only Health Equity Studio overlaps). **Proposed fix:** delete §12.2.1 (¶6–¶9) and keep
   §12.2.2 + Figure 12.1, renumbering; §12.2.1's unique content is the three URLs and the
   advisory@ contact address, which can be folded into the Figure 12.1 cells or a single
   sentence after it. Deleting the *second* instead would lose the figure, so delete the first.
2. **"Healthcare transformation fails more often because of change management failures than
   analytical failures."** — verbatim in ¶6 (chapter opener) and ¶22 (§12.4 opener). Defensible
   as a preview-then-develop pattern, but it is byte-identical and only ~3,000 words apart.
   Suggest varying ¶6 or cutting it, since ¶22 immediately develops it.
3. **Advisory-dependence / analysis-without-implementation is argued three times**: ¶5
   ("Transformation consulting that produces recommendations without supporting execution is
   worth little"), ¶36 ("The most common advisory failure… engaging external consultants for
   analysis and stopping before implementation… explicitly designed to avoid this failure
   mode"), and ¶54 Key Concepts ("Advisory dependence… explicitly designed to build client
   capability"). ¶21 adds a fourth ("designed to build internal organizational capacity over
   time, not create permanent advisory dependence"). Key Concepts recurrence is legitimate;
   ¶5 / ¶21 / ¶36 are three separate statements of the same thesis with the same
   "explicitly designed to" construction in two of them. Suggest consolidating ¶5 into a
   forward reference to §12.6.
4. **"learning collaboratives" appears 6 times, all within the epigraph/¶2/Implications**, and
   the PMO 3 times in the same three places — the frame restates its own list four times
   without the body ever expanding it (see MISMATCH 2). Fixing MISMATCH 2 resolves this.

### Internal contradictions

5. **"Real-time" vs "weekly" for The Wire.** ¶6: "THE WIRE — **Real-time** intelligence…
   Convergence Newsletter (**free weekly**)". Figure 12.1: "**Weekly synthesis** of the most
   consequential… developments". ¶48 Key Concepts: "The **weekly** policy and practice
   intelligence service". Two of three say weekly; one says real-time. Elsewhere the book calls
   it "a daily intelligence feed" (Introduction, Appendix F). Three different cadences for one
   product. **Proposed fix:** pick one cadence for The Wire and let the Convergence Newsletter
   carry "weekly"; the Introduction's "daily intelligence feed" should be reconciled too, which
   makes this a cross-chapter item rather than a Ch12-only edit.
6. See MISMATCH 4 (service lines ≠ pillars) and MISMATCH 5 (2027 vs January 2028) — both are
   contradictions internal to this chapter, logged there rather than repeated.
7. **Subscriber tiers are asserted but never defined in-chapter.** ¶6 "Observer subscribers"
   (free), ¶29 "available to **Strategist and Enterprise** subscribers", Figure 12.3's caption
   repeats it. Three tier names, no definition and no cross-reference. Not a contradiction, but
   a reader cannot place themselves. Suggest a cross-reference to wherever the tiers are
   defined (Appendix F), or drop the tier gate from ¶29 and the Figure 12.3 caption, which
   would also stop the caption from duplicating its own lead-in sentence verbatim.

### Thin sections

8. **§12.7 "The Role of External Technical Assistance in State-Level Transformation" — one
   paragraph (¶39), and it does not deliver its heading.** The title promises an analysis of
   external technical assistance as a category in state-level transformation; the paragraph is
   four sentences about HTR's own Vermont engagements and the book's sourcing. It is also the
   chapter's only H2 with no figure, no list and no subsection. Adjacent material that *would*
   deliver it exists elsewhere in the book (the RHRC engagement, Oliver Wyman's Act 167 work,
   the analytics vendor procurement — all named in Ch12's own Figure 12.2 and Implications).
   **Proposed fix:** retitle to "§12.7 HTR's Vermont Engagement and This Book's Sourcing", or
   expand with the RHRC / Oliver Wyman / analytics-vendor examples the chapter already cites.
9. **§12.3.3 Health Equity Practice — one paragraph (¶19)**, against three phases for §12.3.1
   and two substantial paragraphs for §12.3.2. §12.3.4 and §12.3.5 are also single paragraphs.
   Uneven but not thin in the §12.7 sense; noted for symmetry only.
10. **§12.2 has no prose of its own** — the H2 "The Knowledge and Implementation
    Infrastructure" is followed immediately by H3 12.2.1. Every other H2 in the chapter opens
    with at least one paragraph. Cosmetic, but combined with issue 1 (the duplicated 12.2.1 /
    12.2.2) it suggests §12.2 was assembled from two sources.

### Sourcing note

11. **Figure 12.1's source line is "technical infrastructure framework documentation"** — the
    same phrase as the figure's own subject ("technical infrastructure framework components"),
    and it reappears as the first item in the chapter's `Sources:` paragraph (¶55). It cites
    nothing locatable. Figures 12.2's source line, by contrast, names Kotter (1996) and Vermont
    transformation documentation. Figures 12.3 and 12.4 have **no** source line at all, where
    Figure 12.2 does. Flagged as an unresolved placeholder rather than a factual error — it may
    be deliberate (CLAUDE.md directive 16), so no fix proposed beyond noting that if Figure 12.1
    describes HTR's own platform, the honest source line is "HTR platform documentation" and the
    caption's self-referential phrasing should go.

### Not defects

- Figure numbering 12.1→12.4 sequential, each caption adjacent to its table. Clean.
- `## **Work This Chapter on the Platform**`, `## **Implications for You**`, `## **Key Concepts
  in This Chapter**` all present with the byte-identical titles directive requires; `Sources:`
  is a plain paragraph (¶55), not a heading. Clean.
- Key Concepts (¶47–¶54) restates The Wire, Research Lab, Academy, HEROI and Kotter from the
  body. This is legitimate recurrence (glossary), not repetition.
- The four `If you are a…` Implications entries are distinct in audience and ask. Clean, apart
  from their content pointing at the wrong chapter body (MISMATCH 2).

---

## Summary

**6 mismatches**, in descending severity:
1. "the preceding sixteen chapters" — arithmetically impossible in Chapter 12 of 16.
2. The epigraph, ¶2 and all four Implications entries describe a PMO / learning-collaboratives
   chapter that §12.1–12.8 does not contain; that content is in Chapter 15.
3. Figure 12.1's caption promises "intended users"; the table has no such column.
4. §12.3 claims a service line per pillar; Clinical and Operations have none, and two of the
   five subsections are not pillars.
5. AHEAD global budget entry given as "2027" in ¶18 against "FY2028" in ¶25 and "January 2028"
   in ¶28 and the book's timeline.
6. Tool names drift between Figures 12.1 and 12.3 (AI Governance vs AI Clinical Governance;
   Stress Test vs Stress Test Model).

**All checkable numbers pass**: 8 Kotter steps (3 ways), 4 platform components, 30-dimension /
6-domain, 62-item / 8-domain, 5 HEROI dimensions, ~40 Research Lab tools, 9/14 hospitals,
$2.4B, 108%, $230.65M. The chapter's quantitative claims are sound; its *structural* claims
about itself are not.

**Left deliberately, with reason:** Figure 12.1's placeholder source line (may be intentionally
suppressed per CLAUDE.md directive 16); Figure 12.4's missing route paths and the undefined
subscriber tiers (both cross-chapter/platform questions, not Ch12 facts); The Wire's
weekly/real-time/daily cadence, which cannot be fixed inside Chapter 12 alone.

**Nothing in the repo was modified. `HTR_Book_v42.docx` was opened read-only.**
