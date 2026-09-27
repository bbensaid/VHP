# Chapter 15 Audit

**Scope:** Chapter 15 ("Healthcare Transformation as Portfolio Management — Applying PMI Standards
to Five-Pillar Reform"), extracted directly from `word/document.xml` of `HTR_Book_v42.docx`
(char range between the `Heading1` "Chapter 15:" at offset 4,353,542 and the `Heading1`
"Chapter 16:" at offset 4,644,873). Tables read cell-by-cell from the XML, not from the
`.md` mirror. **Read-only audit — the `.docx` was not modified.**

Sections present: 15.1 – 15.16 plus the un-numbered chapter epigraph and the `Sources:` footer.
Eight numbered figures (15.1 – 15.8) plus three un-numbered callout boxes (BEYOND VERMONT,
THE PORTFOLIO MANAGER'S SEQUENCING TEST, TRY THIS).

---

## Figures found (ground truth)

| Figure | §  | Shape (rows incl. header) | Content summary |
| :--- | :--- | :--- | :--- |
| 15.1 | 15.1 | stat strip, 2×4 | `10 of 10` PMI knowledge areas · `19` portfolio components · `7` statutory deadlines · `14+` AHS programs |
| 15.2 | 15.2 | 4 rows (1 hdr + 3) | Project / Program / Portfolio × PMI definition, Vermont example, who manages, success measure |
| 15.3 | 15.3 | 18 rows (1 hdr + **17 data rows**) | The portfolio inventory. Pillar counts: **Policy 4, Technology 4, Economics 3, Clinical 3, Operations 3 = 17** |
| 15.4 | 15.5 | 6 rows (1 hdr + 5) | Pillar-level role matrix: Policy, Technology, Economics, Clinical, Operations PMs — **five roles, no Equity PM** |
| 15.5 | 15.9 | 11 rows (1 hdr + 10) | Risk register R-01 … R-10. Scores: 20, 15, 16, 12, 15, 16, 15, 12, 12, 20 |
| 15.6 | 15.10 | 6 rows (1 hdr + 5) | Act 167's five goals × contributing components × metric × 2028 target |
| 15.7 | 15.11 | 6 rows (1 hdr + 5) | Business case. Total annual `~$850K–$1.3M`; total 4–5 yr `~$4M–$6.4M` |
| 15.8 | 15.14 | 7 rows (1 hdr + 6) | Six platform tools: Transformation Friction Index, Investment Tracker, HTI Dashboard, HTR Simulator, Transformation Scorecard, Impact Simulation |

Figure 15.3's 17 data rows, verbatim in order:

1. Policy · Act 68 RBP-methodology rulemaking · Compliance project · Critical · GMCB · In progress → FY2027
2. Policy · AHEAD State Agreement management · Ongoing program · Critical · AHS · Active → annual CMS review
3. Policy · RHT Program contract management · Compliance project · High · AHS Health Reform · Active → annual federal reporting
4. Policy · Statewide Strategic Plan development · Strategic project · Critical · AHS + HCAC · In progress → Dec 2028
5. Technology · AHS-GMCB analytics-vendor deployment · Strategic project · Critical · AHS + GMCB · Procurement → Jan 2027 operational
6. Technology · Vermont CIN build-out · Strategic program · High · AHS + RHT · Design → FY2028 operational
7. Technology · VITL HIE expansion / FHIR compliance · Technical project · High · VITL + AHS · In progress → FY2027 mandatory
8. Technology · Statewide AI-governance framework · Policy project · Medium · AHS + CIN · Not started → FY2028 adoption
9. Economics · RBP implementation (all hospitals) · Compliance program · Critical · GMCB · Methodology design → FY2027
10. Economics · Global-budget design & implementation · Strategic program · Critical · GMCB + AHS · Design → FY2028 non-CAH
11. Economics · RHT Program deployment · Operational program · High · DVHA + AHS · Active → annual targets
12. Clinical · Blueprint PCMH · Operational program · Critical · Blueprint + DVHA · Active → 100% PCMH by FY2028
13. Clinical · CCBHC certification (5 entities) · Compliance project · High · AHS + providers · In progress → FY2026
14. Clinical · CoCM statewide deployment · Operational program · High · MHI + Blueprint · Pilot → 80%+ practices FY2028
15. Operations · 14-hospital transformation planning · Operational program · Critical · AHS + RHRC successor · Plan submission → FY2026 approved
16. Operations · AHS restructuring (HSA-coordinator model) · Organizational project · Critical · AHS Secretary · In progress → FY2027 staffed
17. Operations · AHS PMO establishment · Organizational project · Critical · AHS · Not started → Q1 2027 operational

---

## Claims checked against their own source

### 1. "19 components" vs. Figure 15.3's 17 rows — **MISMATCH (most serious defect)**

The number 19 is asserted **eleven times** across the chapter and is the chapter's central
organising fact. Figure 15.3, the table that is supposed to enumerate them, contains 17.

Every instance, verbatim:

- Epigraph: "Vermont's **19-component** portfolio is this chapter's worked example…"
- Figure 15.1 stat: "**19** / Vermont transformation portfolio components"
- §15.3 heading: "Vermont's Transformation Portfolio: **19 Components**"
- §15.3 prose: "**Nineteen** is what that exercise produces as of early 2026"
- Figure 15.2, Portfolio row: "all **19 components** across the pillars"
- Figure 15.3 caption: "Vermont's **19-component** transformation portfolio"
- BEYOND VERMONT box: "this **19-component** inventory… The number **19** is Vermont's"
- §15.4 opening: "**Nineteen** components. Shared stage gates."
- §15.6: "formalized project leads for all **19 components**"
- §15.7 opening: "The **nineteen** components are not a flat list…"
- Sequencing-test box: "Applied across all **nineteen**, this test produces…"
- §15.8: "Not all **19 components** should be managed identically"
- §15.12: "all **19** component leads identified"
- §15.13/§15.15: "a status summary of all **nineteen**"
- §15.16: "Vermont's **19-component** transformation portfolio"

**Proposed fix.** The author's intent should decide the direction, but the evidence points to
two components having been dropped from the table rather than the count being wrong, because
§15.7 and §15.8 both refer to components that Figure 15.3 does not list:

- §15.7 names the Economics components as "RBP implementation, global-budget design, **EAST
  Fund deployment**" — Figure 15.3's third Economics row is "**RHT Program deployment**".
- §15.8 names "**HEROI methodology** (iterating as data quality improves)" as an adaptive
  *component*; HEROI appears nowhere in Figure 15.3 (it appears only in Figure 15.6 as a
  contributing component for two Act 167 goals).
- R-08 in Figure 15.5 is a social-risk-adjustment risk owned by an "Equity PM", and §15.7
  treats "Social-risk-adjustment methodology" as a component that "can and should proceed in
  parallel today" — also absent from Figure 15.3.

So the likeliest fix is **adding two rows to Figure 15.3** — an Equity/Clinical row for
*HEROI methodology* and an Economics or Equity row for *social-risk-adjustment methodology*
(with a stage gate of FY2028, matching R-08) — which restores 19 and simultaneously fixes
defects 3, 5 and 6 below. The alternative fix (changing every "19"/"nineteen" to "17") is
mechanical but would leave §15.7's and §15.8's dangling component references unresolved,
and would contradict the numeral's use as a rhetorical anchor in §15.4 and §15.15.

### 2. AHEAD is simultaneously live and withdrawn — **MISMATCH (contradiction, and stale against the rest of the book)**

The book establishes elsewhere, repeatedly and with dates, that Vermont **withdrew from AHEAD in
July 2026**: Ch1's pillar table ("AHEAD Model State Agreement (January 2025; **withdrawn July
2026**)"), Ch1's status table ("subsequently withdrawn July 2026"), the timeline entry "Jul 2026 —
Vermont withdraws from AHEAD… cut expected EAST Fund from ~$138M to a ~$10M cap; Vermont exits
before its Cohort 2 performance period (Jan 2028) ever began."

Chapter 15 treats AHEAD as an active obligation in **five** places and as withdrawn in **one**:

| Location | Text | State assumed |
| :--- | :--- | :--- |
| Fig 15.3 row 2 | "AHEAD State Agreement management · Ongoing program · Critical · **Active → annual CMS review**" | live |
| Fig 15.2, Program row | "**AHEAD Implementation Program**" as a current Vermont program | live |
| Fig 15.5 R-01 | "hospitals **enter AHEAD** without financial-management capability" | live |
| Fig 15.5 R-09 | "**AHEAD driven by administrators** without clinical ownership" | live |
| Fig 15.5 R-06 | "**AHEAD population-health management** incomplete" | live |
| §15.13 objection 2 | "**The AHEAD State Agreement is a federal contract**" (present tense) | live |
| §15.4 | "Four statutory predecessors — Acts 167 and 51, Act 68, and the AHEAD State Agreement" | live |
| **Fig 15.7 row 1** | "coordinates $195M RHT capital and the **EAST Fund's wind-down after Vermont's AHEAD withdrawal**" | **withdrawn** |

Figure 15.7 was evidently updated for the withdrawal and nothing else in the chapter was. This is
the defect pattern the standing directives warn about — one stale fact is five.

**Proposed fix.** Sweep the whole chapter to the post-withdrawal state. Concretely:
Fig 15.3 row 2 becomes an AHEAD *closeout/wind-down* component (status "Withdrawn Jul 2026 →
FY2027 closeout reporting") rather than "Active → annual CMS review"; R-01's consequence clause
changes from "hospitals enter AHEAD without financial-management capability" to the Act 68
global-budget framing the rest of the book uses ("hospitals enter Act 68 global budgets without
financial-management capability") — which is also the stronger claim, since Act 68 survived and
AHEAD did not; R-06 and R-09 likewise re-anchor to Act 68/global budgets; §15.13's objection 2
keeps the federal-contract argument but must use the RHT grant as the live example, since the
AHEAD contract no longer binds; §15.4's "four statutory predecessors" should not count AHEAD
(see defect 9).

Also affected: Fig 15.4's Economics deliverable "**EAST Fund targets**" and Fig 15.6's listing of
the **EAST Fund** as a primary contributing component for both *Affordability* and *Robust
workforce*. With the fund cut from ~$138M to a ~$10M cap, it cannot carry two of Act 167's five
goals; Figure 15.6 now overstates the portfolio's benefit base.

### 3. §15.7 "the single highest-risk component in the register (R-01)" — **MISMATCH**

Figure 15.5 gives **R-01 a score of 20 and R-10 a score of 20**. R-01 is tied, not single
highest. Worse, the tie is with R-10 — "portfolio-management infrastructure not established
before 2027 deadlines", annotated in its own Response cell as "**the primary motivation for this
chapter**". So the chapter asserts a superlative for R-01 that its own register assigns equally
to the risk the chapter exists to argue.

**Proposed fix.** "The AHS-GMCB analytics deployment is the clearest case — it carries the
register's highest delivery-risk score (R-01, 20, tied only with the governance risk R-10)
precisely because three downstream components converge on it, not because its own deadline is
nearest."

### 4. Figure 15.5's score legend does not produce Figure 15.5's scores — **MISMATCH**

Caption: "Risk score = probability (Low=1 … High=5) × impact (Low=1 … Critical=4)."

Under that legend (prob Low 1 / Med 3 / High 5; impact Low 1 / Med 2 / High 3 / Critical 4),
**7 of 10 rows fail**:

| ID | Prob × Impact | Printed | Legend implies |
| :--- | :--- | :--- | :--- |
| R-01 | High × Critical | 20 | 20 ✓ |
| R-02 | Medium × Critical | 15 | 12 ✗ |
| R-03 | High × High | 16 | 15 ✗ |
| R-04 | Low–Med × Critical | 12 | 8–12 ✓ |
| R-05 | Med–High × High | 15 | 12 ✗ |
| R-06 | High × High | 16 | 15 ✗ |
| R-07 | Med–High × High | 15 | 12 ✗ |
| R-08 | Medium × High | 12 | 9 ✗ |
| R-09 | High × Medium | 12 | 10 ✗ |
| R-10 | High × Critical | 20 | 20 ✓ |

The printed scores are **not arbitrary** — all ten are exactly reproduced by a different scale:
probability Low=1, Low–Med=2.5, Med=3, Med–High=3.75, High=4; impact Low=1, Medium=3, High=4,
Critical=5 (R-04 = 2.5×5 = 12.5→12; R-05/R-07 = 3.75×4 = 15; R-09 = 4×3 = 12). The **numbers are
right and the caption is wrong.**

**Proposed fix** — replace the legend with: "Risk score = probability (Low=1, Low–Med=2.5,
Medium=3, Med–High=3.75, High=4) × impact (Low=1, Medium=3, High=4, Critical=5); hyphenated bands
are scored at the midpoint." Simpler alternative, if the author prefers a clean legend to
preserved numbers: restate both axes as 1–5 and recompute all ten scores.

### 5. R-08's "Equity PM" owner does not exist in the chapter's own role structure — **MISMATCH**

Figure 15.4 is titled "Five Roles, One Framework" and defines exactly five pillar PMs: Policy,
Technology, Economics, Clinical, Operations. R-08's Owner cell reads "**Equity PM** + GMCB" and
its Response reads "Equity PM leads SRA as co-equal to budget design". §15.6 likewise specifies
"**five** pillar Program Managers". No Equity PM is defined anywhere in the chapter.

This also runs against the project's standing Equity convention (Equity is carried as a
cross-cutting concern within each pillar, listed last, not as a sixth pillar) — so inventing a
sixth PM role is the wrong fix.

**Proposed fix.** Reassign R-08 to "**Econ PM + GMCB**" (SRA is a payment-methodology artifact
and R-08's Pillars cell already reads "Econ"), and change the Response to "Accelerate: Economics
PM leads SRA as co-equal to global-budget design; HCAC equity review required." Alternatively, if
an Equity lead is genuinely intended, Figure 15.4 must gain the row and §15.6/§15.5's "five" must
become "six" — a larger change that conflicts with the book's Equity treatment.

### 6. §15.7 "EAST Fund deployment" vs. Figure 15.3's "RHT Program deployment" — **MISMATCH**

§15.7: "The Economics components — RBP implementation, global-budget design, **EAST Fund
deployment** — cannot be productively worked before the Technology components…" Figure 15.3's
three Economics rows are RBP implementation, Global-budget design & implementation, and **RHT
Program deployment**. The sentence explicitly invites the reader to "read Figure 15.3 by its first
column", so the name must match.

**Proposed fix.** Change §15.7 to "RHT Program deployment", matching Figure 15.3 — the safer
direction, since the EAST Fund is now a ~$10M capped remnant (see defect 2) and cannot plausibly
be one of three critical Economics components.

### 7. Business-case cost figure contradicts itself: `$4–6.4M` vs `$4.5–7.5M` — **MISMATCH**

- Figure 15.7, Total row: "~$850K–$1.3M / **~$4M–$6.4M**"
- §15.11 prose: "The **~$4–6.4M** cost of a staffed PMO over four to five years is roughly 2% of
  the portfolio value it protects." ✓ matches the table
- §15.13, objection 3: "The **~$4.5–7.5M** cost is roughly 2% of the value it protects" ✗

Note also that the same "roughly 2%" is attached to both ranges, which cannot both be true.

**Proposed fix.** §15.13 → "The ~$4–6.4M cost is roughly 2% of the value it protects."

### 8. Figure 15.6's "13/14 sustainable" target vs. the book's "13 of 14 in losses" — **probable numeric artifact**

The book's Oliver Wyman finding, stated in four other places, is that "**13 of 14** hospitals are
projected to report losses by 2028" under the conservative scenario. §15.11 and §15.13 use it
correctly as the failure state ("the failure of 13 of 14 hospitals to reach sustainability").

Figure 15.6's *Financial sustainability* 2028 target, however, reads "**13/14 sustainable**" — the
same numerator, flipped to the success side. A transformation target of "13 of 14 hospitals
financially sustainable" is a coherent goal, but the coincidence with the failure-scenario count
is strong evidence the figure was mirrored rather than derived. Nothing in Chapter 15 or the
Scorecard (Appendix E, cited in the caption) sources a 13-of-14 sustainability *target*.

**Proposed fix.** Either source the target or restate it non-numerically — e.g. "deficit
trajectory reversed; no hospital in structural operating loss" — so the failure statistic is not
doing double duty as the goal.

### 9. §15.4 "Four statutory predecessors" — **MATCH on arithmetic, MISMATCH on category**

"Four statutory predecessors — Acts 167 and 51, Act 68, and the AHEAD State Agreement" counts
correctly to four. But the AHEAD State Agreement is a **federal model agreement, not a statute** —
the chapter itself calls it "a federal contract" in §15.13 — and it was withdrawn (defect 2).
Act 51 is also named nowhere else in the chapter and does not appear in the chapter's `Sources:`
footer, though Ch1's pillar table does establish "Acts 167 (2022), 51 (2023), 68 (2025)".

**Proposed fix.** "Three statutory predecessors — Acts 167, 51, and 68 — plus the AHEAD State
Agreement's closeout obligations, each with their own federal and state reporting requirements."

### 10. RBP methodology date: Figure 15.4 `FY2026` vs Figure 15.3 `FY2027` — **MISMATCH**

- Fig 15.3 row 1: "Act 68 RBP-methodology rulemaking · In progress → **FY2027**"
- Fig 15.3 row 9: "RBP implementation (all hospitals) · Methodology design → **FY2027**"
- Fig 15.4, Policy row: "RBP methodology (**FY2026**); Strategic Plan (Dec 2028); monthly Act 68 compliance"
- Fig 15.4, Economics row: "RBP rates in effect (**FY2027**)" ✓ consistent with Fig 15.3

Fig 15.4's Policy deliverable is the lone FY2026. Elsewhere the book has RBP mandatory FY2027.

**Proposed fix.** Fig 15.4 Policy row → "RBP methodology (FY2027)".

### 11. PMO analyst headcount: `2–3` vs `2` — **minor MISMATCH**

§15.6 specifies "**2–3 PMO analysts**"; Figure 15.7 costs "**2 PMO Analysts**" at $120K–$160K
(~$480K–$640K over 4–5 yr); §15.12 says only "PMO analyst positions posted". The business case
therefore under-costs §15.6's recommendation at its upper bound.

**Proposed fix.** Align §15.6 to "2 PMO analysts", or widen Figure 15.7's row to "2–3 PMO
Analysts · $120K–$240K · ~$480K–$960K" and update the Total row accordingly (which would change
the `~$4M–$6.4M` figure and therefore defect 7's fix too).

### 12. Portfolio Manager hire date: `Q2 2026` vs `Q3 2026` — **minor MISMATCH**

§15.12 roadmap: "Q1–Q2 2026: Post the position… **Q2 2026: Portfolio Manager hired**."
R-10 Response: "Avoid: **hire Portfolio Manager by Q3 2026**; PMO by Q1 2027."

Not strictly contradictory (hiring in Q2 satisfies "by Q3"), but the roadmap and the register
should give the reader one date.

**Proposed fix.** R-10 → "hire Portfolio Manager by Q2 2026", matching §15.12.

### 13. §15.14 "This is the risk register's R-01 in visual form" — **partial MISMATCH**

The HTR Simulator row says "Drop the Technology score and watch **Economics and Clinical** fall
with it. This is the risk register's R-01 in visual form." R-01's Pillars cell reads "**Tech,
Econ**" — Clinical is not in R-01. The Tech→Clinical propagation is R-06's ("Tech, Clin").

**Proposed fix.** Either broaden R-01's Pillars cell to "Tech, Econ, Clin" (consistent with Ch1's
own three-dependent claim, which includes Blueprint/CCBHC risk stratification — see the
cross-check below), or change §15.14 to "This is R-01 and R-06 in visual form." The first is
preferable: it aligns R-01 with Ch1.

### 14. Claims that verify clean — **MATCH**

- §15.6 "the **ten** PMI knowledge areas" / §15.6 heading / Fig 15.1 "10 of 10": the §15.6
  paragraph does enumerate exactly ten — scope (WBS), schedule (master schedule), cost (RHT
  spending), quality, resource (leveling), communications, procurement, stakeholder, risk,
  integration. ✓
- Figure 15.4 contains exactly five roles, matching its own title "Five Roles, One Framework" and
  §15.6's "five pillar Program Managers". ✓
- Figure 15.6 contains exactly five goals, matching "Act 167's five goals" as used in §15.4,
  §15.10 and §15.16. ✓
- §15.13 answers exactly four objections, matching its heading "Answering the Four Objections". ✓
- Figure 15.8 lists six tools across six data rows; §15.14's lead-in makes no count claim. ✓
- Primary-care FTE baseline: Fig 15.6's "FTE gap <200 (**from 370**)" matches the book's
  370-FTE-by-2030 shortfall, used consistently in Ch5 and Ch11. ✓
- R-08's FY2028 framing in §15.7 ("has a FY2028 target") matches R-08's register text ("not
  adopted before FY2028 budgets"). ✓
- §15.11 / §15.13's "13 of 14 hospitals" failure statistic matches Oliver Wyman as cited in Ch2
  and Ch14. ✓ (The *target* form in Fig 15.6 does not — defect 8.)
- $195M RHT award ✓ consistent with Ch1's "$195M first-year RHT award" and the timeline entry.

---

## Superlative / ranking claims logged for cross-chapter comparison

Verbatim, with context, for later comparison against other chapters:

1. §15.7 — "The AHS-GMCB analytics deployment is **the clearest case** — it is **the single
   highest-risk component in the register** (R-01) precisely because three downstream components
   converge on it, not because its own deadline is nearest." *(Contested internally: see defect 3;
   also note Ch1 uses the identical "clearest case" construction for Technology — flagged below.)*
2. BEYOND VERMONT box, §15.3 — the portfolio inventory exercise "is **often the single
   highest-value first step** toward the kind of portfolio governance this chapter recommends."
3. §15.15 — "**The single most consequential decision** is not whether to hire a Portfolio Manager
   but whether that role is given authority over sequencing." *(Compare Appendix G: "This is
   **the single most consequential open question** for any hospital CFO reading this book" —
   about transition financing. Two different "single most consequential" items; different framings
   ("decision" vs "open question") and different audiences (state leader vs hospital CFO), so
   probably legitimate, but worth the author's eye.)*
4. §15.13 — "the political-sustainability chapter's **most dangerous failure mode**" (the Dec 2028
   plan arriving descriptive rather than binding). *Needs checking against Ch14, which owns that
   designation — does Ch14 name the same failure mode as its most dangerous?*
5. Epigraph — the governance gap "is **the default state of most transformation efforts**, not a
   Vermont peculiarity."
6. BEYOND VERMONT box — "**Most organizations underestimate** their own portfolio size until they
   do this inventory."
7. §15.15 — "**Most organizations discover** in that exercise that they are running more
   simultaneous transformation components than they had counted." *(Near-duplicate of 6 — see
   Other issues.)*
8. §15.14, Transformation Friction Index row — "the pillar whose improvement **would lift
   delivered readiness most** is where the portfolio manager's attention belongs."
9. §15.11 / §15.13 — the PMO cost "is **roughly 2%** of the portfolio value it protects" (stated
   twice, against two different cost ranges — defect 7).
10. §15.13 — "the alternative is the **multi-billion-dollar** partial-transformation outcome."

For comparison, the corresponding Chapter 1 superlatives found while cross-checking:
"**Technology is the clearest case**"; "it is where the system's **most consequential execution
gap** actually sits"; "The AHS-GMCB analytics capability is **the single highest-risk gap in the
system**"; "Vermont's **most significant current sequencing risk** is the gap between the FY2028
start of Act 68's hospital global budgets and the analytics-capability deployment timeline";
"**The most important action** you can take before Act 68's global budgets take effect in FY2028
is completing HCC gap closure"; and Ch11's "The Workforce Crisis — Vermont's **Most Binding
Operational Constraint**".

Two of these want a cross-chapter look. First, §15.7 reuses Ch1's exact phrase "**the clearest
case**" for a different subject (Ch1: the Technology *pillar*; Ch15: the analytics *component*) —
compatible in substance, but the verbal echo reads as a copy. Second, and more substantive:
Ch11 calls **workforce** "Vermont's Most Binding Operational Constraint" while Ch1 and Ch15 both
put the binding constraint on **Technology/analytics**. Ch11's is scoped to *operational*
constraints and Ch1's to the dependency sequence, so they may well coexist — but this is exactly
the "two different dependencies both called the most underestimated" pattern the standing
directives call out, and it should be adjudicated in the cross-chapter pass. §15.14's first row
("Identify which pillar is the binding constraint on the whole portfolio right now") deliberately
leaves the answer to the tool, which is the right treatment; the prose chapters are less careful.

---

## Cross-check against Chapter 1's AHS-GMCB claim

**Verdict: consistent on the substance and on the number three. Two wording issues and one
figure-level gap.**

Chapter 1 (§1.3, risk-identification discussion), verbatim:

> Technology is the clearest case: Economics and Clinical both depend on it directly, and right
> now it is where the system's most consequential execution gap actually sits. The AHS-GMCB
> analytics capability is the single highest-risk gap in the system: a delay there does not delay
> one program but three, holding up financial management for global budgets, equity measurement
> for the Statewide Strategic Plan, and risk stratification for Blueprint's CCBHC expansion at
> once.

Chapter 15 §15.7, verbatim:

> The AHS-GMCB analytics deployment is the clearest case — it is the single highest-risk component
> in the register (R-01) precisely because three downstream components converge on it, not because
> its own deadline is nearest.

Point-by-point:

| Element | Ch1 | Ch15 | |
| :--- | :--- | :--- | :--- |
| Subject | AHS-GMCB analytics capability | AHS-GMCB analytics deployment | ✓ same |
| Ranking | "the single highest-risk gap in the system" | "the single highest-risk component in the register" | ✓ same claim, different universe of comparison |
| The number | "does not delay one program but three" | "three downstream components converge on it" | ✓ **three in both** |
| Reasoning | convergence of dependents, not deadline proximity | convergence of dependents, not deadline proximity | ✓ same |
| The three named | (a) financial management for global budgets, (b) equity measurement for the Statewide Strategic Plan, (c) risk stratification for Blueprint's CCBHC expansion | not named | see below |

The two claims are mutually reinforcing and neither has drifted. **No fix required for
consistency between them.** Three observations, in descending importance:

1. **Ch15 never names its three, and Figure 15.3 cannot supply them cleanly.** Mapping Ch1's
   three onto Figure 15.3's rows: (a) → "Global-budget design & implementation" ✓; (b) →
   "Statewide Strategic Plan development" ✓; (c) → splits across **two** rows, "Blueprint PCMH"
   *and* "CCBHC certification (5 entities)". So a reader who tries to verify Ch15's "three" in
   Ch15's own register gets three-or-four depending on how (c) is counted, and R-01's Pillars cell
   ("Tech, Econ") does not admit the Clinical dependent at all. Worth fixing while R-01 is being
   touched for defect 2: name the three in §15.7 as Ch1 does, and broaden R-01's Pillars cell to
   "Tech, Econ, Clin" (which also resolves defect 13).
2. **Ch15's superlative is over-tight against its own register** (defect 3): R-10 ties R-01 at 20.
   Ch1's version does not have this problem, because Ch1 is ranking *gaps in the system*, and
   Vermont's missing PMO is not one of Ch1's gaps. The fix belongs in Ch15, not Ch1 — the chapter
   yields.
3. **R-01's consequence clause is stale where Ch1's is not.** Ch1's claim is anchored to Act 68
   global budgets, which survived; R-01 is anchored to hospitals "enter[ing] AHEAD", which they
   never will (see defect 2). So the two claims agree on reasoning but Ch15 justifies it with an
   event the book elsewhere says was cancelled. Re-anchoring R-01 to Act 68 makes Ch15 *more*
   consistent with Ch1, not less.

Also consistent across the two chapters: the Jan 2027 operational date (Fig 15.3 "Procurement →
Jan 2027 operational") sits correctly ahead of Ch1's hard constraint ("hospitals will begin
bearing global-budget financial accountability in January 2028"), and Ch1's advice to hospitals
("Do not wait for the AHS-GMCB analytics capability… Start with VHCURES direct access… now")
matches R-01's response verbatim in substance ("Accelerate: parallel VHCURES direct-access; HCC
gap closure as compensating investment"). ✓

---

## Other issues

### Genuine repetition

1. **§15.11's closing sentence and §15.13's paragraph restate the same three-item failure list
   twice, near-verbatim, three paragraphs apart.** This is the clearest duplication in the
   chapter.

   §15.11 (before Figure 15.7): "The cost of not building it is the December 2028 plan arriving as
   a descriptive document rather than a binding commitment — the continuation of the Oliver Wyman
   deficit trajectory, the failure of 13 of 14 hospitals to reach sustainability, and the loss of
   the political window Vermont's mandatory architecture has opened. **That is not a $0 outcome.**"

   §15.13 (after Figure 15.7): "Without adequate PMO infrastructure, Vermont risks delivering the
   December 2028 plan as a descriptive document rather than a binding commitment — the
   political-sustainability chapter's most dangerous failure mode. **That is not a $0 outcome.** It
   is a multi-billion-dollar one: the continuation of the Oliver Wyman deficit trajectory, the
   failure of 13 of 14 hospitals to reach sustainability, and the loss of the political window
   that Vermont's mandatory architecture has opened."

   Same three-item list, same "That is not a $0 outcome" sentence, same argument. **Proposed fix:**
   cut the second half of §15.11's paragraph, leaving it to set up Figure 15.7 ("The cost-benefit
   analysis in Figure 15.7 answers that objection directly. The ~$4–6.4M cost of a staffed PMO
   over four to five years is roughly 2% of the portfolio value it protects."), and let the
   post-table paragraph carry the cost-of-failure argument in full. That also removes one of the
   two conflicting "roughly 2%" statements.

2. **The "most organizations underestimate their portfolio" point is made twice** — BEYOND VERMONT
   box in §15.3 ("Most organizations underestimate their own portfolio size until they do this
   inventory, because individual initiatives are usually owned by different departments that do
   not otherwise compare notes") and §15.15's hospital-PMO paragraph ("Most organizations discover
   in that exercise that they are running more simultaneous transformation components than they
   had counted, that several have no named owner, and that two or three are downstream of a gate
   nobody is tracking"). The §15.15 version adds two findings (no named owner; downstream of an
   untracked gate) so it is not pure restatement, but the shared opening clause makes it read as
   one. **Proposed fix:** trim the BEYOND VERMONT sentence to the causal half only ("because
   individual initiatives are usually owned by different departments that do not otherwise compare
   notes"), letting §15.15 own the finding.

3. **"Managed as a collection of projects" appears three times** — §15.2 ("AHS is managing
   Vermont's transformation as a collection of projects without the program or portfolio
   infrastructure"), §15.4 ("not as a collection of programs each doing their best"), R-10
   ("managed as a collection of projects"). This is the chapter's thesis phrase, so recurrence is
   defensible; logging it as *legitimate recurrence*, not duplication.

4. **The Statewide Strategic Plan / Dec 2028 deadline is invoked in nine sections** (epigraph,
   15.2, 15.3, 15.4, 15.6, 15.11, 15.12, 15.13, 15.15). Legitimate recurrence — it is the
   portfolio's single deadline and the chapter is organised around it.

### Thin sections

5. **§15.9 "The Portfolio Risk Register" has no prose at all** — the Heading2 is followed
   immediately by Figure 15.5 and its caption. It is the only numbered section in the chapter with
   zero body text, and it carries the chapter's most-cited artifact: R-01 is referenced from §15.7
   and §15.14, R-08 from §15.7, R-10 from §15.7 (implicitly) and Figure 15.7. A reader arriving at
   §15.9 gets no statement of how the register is maintained, who reviews it, or at what cadence —
   which matters, because §15.6 makes "risk is analyzed in this book but not managed operationally
   through a maintained register" one of its ten knowledge-area gaps. One short paragraph is
   needed; it is also the natural place to state the scoring scale correctly (defect 4).

6. **§15.8 "Predictive vs. Adaptive Approaches" is a single paragraph with no figure**, though it
   makes a three-way classification (predictive / adaptive / hybrid) over ten named components and
   assigns credentials to each class. Every comparable classification in the chapter gets a table.
   This is also where the un-listed "HEROI methodology" component enters (defect 1). Given the
   chapter's density of figures, the asymmetry is noticeable.

### Internal inconsistencies of citation style

7. **Figure 15.8 cites routes for two of six tools and not for the other four.** Rows 5 and 6 give
   paths ("Transformation Scorecard — /research-lab/knowledge-workspace?tab=scorecard"; "Impact
   Simulation — /impact-simulation"); rows 1–4 name the tool only (Transformation Friction Index,
   Investment Tracker, HTI Dashboard, HTR Simulator). Comparable tables elsewhere in the book
   (e.g. Figure 10.11) give a path for every row. **Route/promise verification was out of scope
   for this audit** — per the project's own rule, a route must be opened and confirmed, not
   inferred — so no claim is made here about whether any of these six resolve or whether each tool
   delivers what the row promises. Flagging only the inconsistency, and noting that four rows
   currently give a reader no way to find the tool.

8. **Figures 15.5 and 15.7 also duplicate rows 5 and 6 of Figure 15.8's content area** in that
   §15.14 row 4 and row 6 describe closely similar exercises — "Test what happens to composite
   readiness when one component slips" (HTR Simulator) and "Model what a single component slipping
   does to the rest of the portfolio" (Impact Simulation). The two "what look for" cells do
   distinguish them (cascade visualisation vs. slack identification), but the "Do this" columns are
   near-identical and a reader will not know which to open. **Proposed fix:** sharpen row 4's
   "Do this" to the pillar-score mechanic it actually describes ("Drop one pillar's score and watch
   the dependent pillars fall") and reserve "component slippage" language for row 6.

### Formatting observations (noted, not fixed — read-only audit)

9. The three callout boxes each render their label and body as one unbroken run:
   "BEYOND VERMONTThe exercise that produced…", "THE PORTFOLIO MANAGER'S SEQUENCING TESTFor each
   component, in order:", "TRY THIS — Find your own portfolio's binding constraint.Open the
   Transformation Friction Index…". This may be an artifact of flattening the XML to text rather
   than a defect in the document; it was **not** verified against a render, and `check_format.py`
   was **not** run, because this audit made no edits. If any of the above fixes are applied,
   `python3 book-build/check_format.py` and a `render_check.py` pass over the chapter are required
   before reporting.
10. The sequencing-test box's four steps are a run-together list in the XML text stream
    ("Which pillar does it belong to?… Is that pillar's upstream gate open?… If closed — …If
    open — …"). Same caveat as 9: verify against a render before treating as a defect.

### Summary of defects by severity

**Blocking (factual/self-consistency):** 1 (19 vs 17 components), 2 (AHEAD live vs withdrawn,
6 locations), 3 (R-01 "single highest" is a tie), 4 (risk-score legend wrong for 7 of 10 rows),
7 ($4–6.4M vs $4.5–7.5M).

**Should fix:** 5 (Equity PM undefined), 6 (EAST Fund vs RHT Program deployment), 8 (13/14
target), 9 ("four statutory predecessors" includes a non-statute), 10 (RBP FY2026 vs FY2027),
13 (R-01 vs R-06 in Figure 15.8), repetition item 1 (duplicated failure paragraph), thin
section 5 (§15.9 has no prose).

**Minor:** 11 (2 vs 2–3 analysts), 12 (Q2 vs Q3 2026 hire), repetition item 2, thin section 6
(§15.8), citation-style items 7 and 8.

**Verified clean:** ten knowledge areas, five roles, five goals, four objections, six tools,
370-FTE baseline, $195M RHT, R-08's FY2028 framing, the 13-of-14 failure statistic, and — most
importantly for this audit's specific charge — **the Ch1 ↔ Ch15 AHS-GMCB "three dependents"
claim**.
