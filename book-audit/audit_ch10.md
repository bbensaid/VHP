# Chapter 10 Audit

Chapter 10: "The Equity Imperative — Closing Gaps, Not Just Averaging Them"
Source: `HTR_Book_v42.docx` → `word/document.xml`, body element indices **1396–1557**
(Heading1 "Chapter 10:" at 1396 through Heading1 "Chapter 11:" at 1558). Tables read from
`w:tbl` cell contents, not from the `.md` mirror.

Read-only audit. No edits made to the `.docx`.

Structure: 19 numbered sections (10.1–10.19), 11 numbered figures (10.1–10.11, sequential,
none missing or duplicated), 2 unnumbered callout boxes (VERMONT IN PRACTICE at 1435,
BEYOND VERMONT at 1437), 12 table objects total.

---

## Figures found (ground truth)

**Figure 10.1** (table @1410, caption @1411) — "Vermont geographic equity disparities: key
indicators." 2×2 grid, **no header row**, 4 indicator blocks:
1. Uninsured rate, Essex County (NE Kingdom) — "8% vs. 3% statewide — nearly 3x the state average"
2. Counties with above-average suicide/self-harm ED rates — **Rutland + Windham**
3. Counties with above-average opioid overdose ED rates — **Chittenden + Bennington + Windham**
4. Rural counties with highest poverty rates — **Essex + Windham + Orleans**
Sources: AHS Nov 2025 Transformation Report; VT RHT Program Application; VDH.

**Figure 10.2** (table @1420, caption @1421) — "Vermont SDOH burden." Header + 5 rows
(Housing / Broadband access / Food insecurity / Transportation / Income). Key cell values:
rental vacancy 3% (healthy = 5%); half of renters cost-burdened; per-capita homelessness
**second highest nationally**; **80% of rural Vermonters have broadband, 14% of all Vermonters
lack access**; **9% food insecure**; income row names **Essex, Windham, Orleans** as higher
poverty and NEK as highest unemployment.

**Figure 10.3** (table @1425, caption @1426) — "Disparity root cause taxonomy." Header + **5**
numbered rows: 1 Geographic Access Barriers, 2 Social Needs Barriers, 3 Clinical Practice
Variation, 4 Insurance and Coverage Barriers, 5 Trust and Engagement Barriers. Row 4 cells
state: **"Despite Vermont's 97% coverage rate, 8% of Essex County residents are uninsured;
18% of 25-34 year olds are uninsured; income groups between 251-400% FPL have the highest
uninsurance rates."**

**Figure 10.4** (table @1466, caption @1467) — "Vermont equity gaps and required investments."
Header + 5 rows, columns Gap / What is missing / Required investment / Timeline. GLP-1 row
timeline cell: **"Decision needed by January 2026 (BALANCE opt-in deadline); coverage
effective May 2026 if Vermont participates."** NEK row: CCBHC designation for Northeast
Kingdom Human Services planned July 2026; EMS/telehealth 2027–2028; hospital transition
decisions by 2028.

**Figure 10.5** (table @1471, caption @1472) — "Equity as a cross-cutting dimension of all
five pillars." Header + **5** rows: Policy, Technology, Economics, Clinical, Operations.
Equity correctly absent as a row (it is the lens). Columns: equity risk / equity opportunity.

**Figure 10.6** (table @1476, caption @1477) — "Vermont equity accountability framework."
Header + **8** indicator rows. Columns: Indicator / Stratification required / **2028 target
direction** / Data source. Target cells:
- Uninsured rate — "Essex County: reduce from 8% toward statewide 3% **by 2030**"
- Primary care access — "BIPOC adult rate: reduce gap from **79-81% toward 90% statewide average**"
- Potentially avoidable ED visits — "Northeast Kingdom: reduce from current rate toward statewide **32.3%**"
- 30-day follow-up after MH/SUD ED visit — "**Windham and Rutland** counties: increase toward statewide **76%+**"
- SDOH screening completion — universal screening in all Blueprint PCMHs
- GLP-1 access for Medicaid enrollees with obesity — "BALANCE Model participation decision **by June 2026**"
- Emergency access time (EMS) — NEK: establish baseline
- Cultural competency standard compliance — all Blueprint PCMHs by 2027

**Figure 10.7** (table @1489, caption @1490) — "Vermont HEDIS equity stratification framework."
Header + 5 domain rows (Access/preventive, Chronic disease, Behavioral health, Maternal and
reproductive, Care coordination). BH row: "**Rutland and Windham** counties have statistically
higher MH crisis rates"; age 15-44.

**Figure 10.8** (table @1493, caption @1494) — "Equity imperative implementation matrix."
Header + 6 rows. Key cells: HEROI infra $30K-$80K setup + $20K/yr, benchmark "**Vermont HEROI:
14 HSA-level equity scores; GMCB reporting requirement**"; HRSN screening benchmark "**Vermont:
91% statewide access vs. 79-81% BIPOC**"; social risk adjustment $100K-$300K, 12-18 months;
SDOH data integration $200K-$500K; HEIA process $25K-$50K; VHCURES race/ethnicity $20K-$60K/yr.

**Figure 10.9** (table @1516, caption @1517) — "Five-step disparity closure process."
Header + **5** numbered steps. Step 4 example target: "increase Northeast Kingdom Medicaid
patient primary care visit rate **from 72% to 80%** within 18 months."

**Figure 10.10** (table @1536, caption @1537) — "Vermont equity analytics: current data sources
by equity dimension." Header + **8** dimension rows. 2 columns only.

**Figure 10.11** (table @1540, caption @1541) — "Hands-on platform tools." Header + 2 rows:
Health Equity Studio (`/research-lab/population-equity?tab=equity`), Population Health Modeler
(`/research-lab/population-equity?tab=population`).

**Callout @1435** VERMONT IN PRACTICE — NEK equity constraint; three named test questions
(Canaan heart attack at 2 a.m.; Newport SMI patient reaching a CCBHC without a two-hour drive;
Lyndonville child seeing a PCP within 14 days). **Callout @1437** BEYOND VERMONT — generalizes
the NEK pattern; refers back to "Vermont's three test questions above" (MATCH: there are exactly 3).

---

## Claims checked against their own source (MATCH/MISMATCH + proposed fix)

### MISMATCH 1 — §10.2.1 lead-in vs Figure 10.1 (the Chapter-1 class of error) — **most serious**
Prose @1409: "The Northeast Kingdom — Caledonia, Essex, and Orleans counties — concentrates the
state's most severe access, affordability, and outcome disparities**:**" — the colon presents
Figure 10.1 as the evidence. But only 1 of the figure's 4 cells is about the NEK (Essex
uninsured rate). The other three name **Rutland + Windham** (suicide/self-harm ED),
**Chittenden + Bennington + Windham** (opioid OD ED), and **Essex + Windham + Orleans**
(poverty — 2 of 3 NEK counties, but Windham is southern Vermont). The opioid-overdose cell
names **zero** NEK counties and leads with **Chittenden** — the Burlington county the chapter
uses throughout as the *advantaged* comparator. The figure Vermont's own cells cite therefore
contradicts the sentence introducing it: the state's worst outcome concentrations per this
table are *not* all in the NEK. The figure's own cell text even concedes this for overdose
("geographic concentration of SUD burden that does not align with service concentration").
**Proposed fix:** rewrite the lead-in to claim what the table shows, e.g. "The Northeast
Kingdom concentrates the state's most severe *coverage and poverty* disparities, while
Vermont's behavioral health crisis burden concentrates elsewhere — a divergence the figure
below makes explicit:" — or move the two behavioral-health cells into a separate figure and
keep 10.1 NEK-only.

### MISMATCH 2 — the "11-point primary care access gap by race"
Claimed three times: chapter opener @1397, "Implications for You" hospital-executive @1543
("an 11-point primary care access gap by race"), legislator @1545. Ground truth @1415: 90%
of Vermont adults overall have a personal healthcare provider vs Asian/PI **81%** (9 pts),
Black **80%** (10 pts), another race **79%** (11 pts). Figure 10.6 encodes the range as
"79-81% toward 90%" — i.e. a **9-to-11-point** gap. "11-point" silently promotes the single
widest subgroup ("another race") to stand for "by race", and is not the Black-adult gap most
readers will assume. **Proposed fix:** "9-to-11-point primary care access gap by race" in all
three places, or "a 10-point gap for Black adults" where a single figure is wanted.

### MISMATCH 3 — statewide primary care access is 90% in prose and 91% in Figure 10.8
@1415 and Figure 10.6 both say **90%** statewide personal-provider rate. Figure 10.8's HRSN
row says "**Vermont: 91% statewide access** vs. 79-81% BIPOC". Same quantity, two values, one
chapter. It also silently changes the implied gap to 10–12 points, compounding MISMATCH 2.
**Proposed fix:** change Figure 10.8's cell to 90% to match @1415 and Figure 10.6.

### MISMATCH 4 — GLP-1 state-count arithmetic does not close
@1446: "only 13 state Medicaid programs covered GLP-1s for obesity — **down from 16** in late
2025, as **four states** eliminated coverage." 16 − 4 = **12**, not 13. Callout @1442 repeats
"13". One of the three numbers is wrong. **Proposed fix:** confirm against the cited KFF
January 2026 analysis and make the three agree (most likely "down from 17" or "three states
eliminated coverage"); do not just delete the arithmetic.

### MISMATCH 5 — BALANCE opt-in deadline is January 2026 in Figure 10.4 and June 2026 in Figure 10.6
Figure 10.4 timeline cell: "**Decision needed by January 2026** (BALANCE opt-in deadline)."
Figure 10.6 target cell: "BALANCE Model participation decision **by June 2026**." Two figures,
six months apart, same decision. Both also sit awkwardly against @1451/@1443 ("launches in
Medicaid as early as May 2026"), since a June 2026 decision post-dates a May 2026 effective
date. **Proposed fix:** establish the real CMS opt-in deadline, use one date in both figures,
and ensure it precedes the stated May 2026 coverage-effective date.

### MISMATCH 6 — Figure 10.6's "2028 target direction" column contains non-2028 dates
Column header is "2028 target direction". Cells give "by **2030**" (uninsured rate), "by
**June 2026**" (GLP-1), "by **2027**" (cultural competency). The column header is falsified by
three of its own eight cells. **Proposed fix:** rename the column "Target direction and date".

### MISMATCH 7 — Vermont's coverage rate is 94%, 97%, and "3% uninsured" in the same chapter
@1403 and @1415: "94% of Vermont adults have health insurance." Figure 10.3 row 4: "Despite
Vermont's **97% coverage rate**." Figures 10.1/10.6: statewide uninsured **3%** (⇒ 97%
covered). The 94% figure is a BRFSS adult self-report and 97% an all-ages coverage estimate,
but the chapter never says so, so it reads as a contradiction — and the Black-adult gap is
stated against the 94% base (12 pts) while the county gaps are stated against the 97% base.
**Proposed fix:** label each once — "94% of Vermont *adults* (BRFSS self-report)" and "97%
all-ages coverage (ACS/KFF)" — at first use of each.

### MISMATCH 8 — HEROI is simultaneously an operating GMCB requirement and never computed
Figure 10.8 benchmark cell: "Vermont HEROI: **14 HSA-level equity scores; GMCB reporting
requirement**." @1507: "Vermont's statewide HEROI score … **has not been formally computed**;
the analytics vendor procurement underway will enable this calculation." @1499 establishes
HEROI as "**the Health Equity Studio's proprietary** approach" — i.e. HTR's, not the state's.
@1544 then calls it "**Vermont's** HEROI scoring framework … a policy innovation worth
protecting … the **only state-level tool** that systematically scores the equity impact of
healthcare interventions **before they are deployed**." A proprietary vendor framework that
has never been computed for Vermont cannot also be a GMCB reporting requirement, a Vermont
policy innovation, and a state-level tool in operation. This is the chapter's largest
credibility exposure, since @1544 is advice to named officials.
**Proposed fix:** make Figure 10.8's cell aspirational ("14 HSAs would each receive a score;
candidate for GMCB reporting"), and rewrite @1544 to "HEROI scoring is a framework Vermont
should adopt as a design constraint" rather than asserting it exists in state hands.

### MISMATCH 9 — "nearly 3x" vs "3x" on the same statistic
Callout @1406: "8% Essex County Uninsured — **3x State Avg**." Figure 10.1 cell: "**nearly 3x**."
8/3 = 2.67. The callout overstates. **Proposed fix:** make the callout read "nearly 3x".

### MATCH — counts and totals that do check out
- @1424 "five root cause categories" → Figure 10.3 has exactly 5 rows. **MATCH.**
- @1501 "five equity dimensions" → 5 listed (@1502–@1506); weights 25+25+25+15+10 = **100%**. **MATCH.**
- @1524 "checklist covers **eight** categories" → exactly 8 bullets @1525–@1532. **MATCH.**
- @1430 "identifies **five** principles" → exactly 5 principles in the sentence run. **MATCH.**
- @1470 "each of the five pillars" → Figure 10.5 has exactly 5 pillar rows, Equity correctly
  treated as the cross-cutting lens rather than a sixth row. **MATCH** (and consistent with
  the project's 5-pillars-plus-Equity rule).
- @1437 "Vermont's three test questions above" → exactly 3 in @1435. **MATCH.**
- @1409 and @1432 and glossary @1554 all define the NEK as Caledonia + Essex + Orleans. **MATCH.**
- Figure 10.6 row 4 ("Windham and Rutland") vs Figure 10.1 cell 2 ("Rutland + Windham") vs
  Figure 10.7 BH row ("Rutland and Windham"). **MATCH** across three figures.
- @1442/@1446 "Vermont Medicaid excludes obesity as a primary indication" vs Figure 10.4
  GLP-1 row vs glossary @1550. **MATCH.**
- Figure 10.2 broadband: "80% of rural Vermonters have broadband; 14% of all Vermonters lack
  access" — internally coherent (20% rural gap diluted to 14% statewide). **MATCH.**
- Figures numbered 10.1–10.11 with no gaps or repeats; every table except the two callout
  boxes carries exactly one caption. **MATCH.**

### Figures unsupported anywhere in the chapter (cannot be checked against a cited source; flag for sourcing)
- **"32.3%" statewide potentially-avoidable ED visit rate** (Figure 10.6). Appears once. A
  percentage is also the wrong-looking unit for an avoidable-ED measure usually reported per
  1,000 members; no denominator is given.
- **"statewide 76%+" 30-day MH/SUD follow-up target** (Figure 10.6). Appears once, unsourced.
- **"18% of 25-34 year olds are uninsured"** (Figure 10.3 row 4) — six times the 3% statewide
  rate, with no corroboration in the chapter and no source on the row.
- **"22% of Blueprint-attributed diabetic patients with HbA1c not under control"** (@1512).
  Appears once; carries the weight of the whole decomposition worked example.
- **"a 15-point difference in diabetes management quality by income"** (@1543). Stated to a
  hospital executive as if it were a Vermont finding; appears nowhere else in the chapter.
- **"from 72% to 80%"** NEK Medicaid primary care visit rate (Figure 10.9 step 4). Framed as an
  illustration, but the 72% baseline reads as real and is uncorroborated.
- **"per capita homelessness rate second highest nationally"** (Figure 10.2) — a ranking claim
  with no source on the row.

---

## Superlative/ranking claims logged for cross-chapter comparison

Verbatim, with element index and context. These are the claims most likely to collide with
other chapters' superlatives.

| # | Verbatim claim | Where | Context |
|---|---|---|---|
| S1 | "The **most common failure mode** in healthcare quality measurement is optimizing for the average" | @1400 | §10.1 opener |
| S2 | "Vermont is approximately 94% white — **one of the least racially diverse states** in the country" | @1402 | §10.1 |
| S3 | "Vermont's **most pervasive and consequential** health equity disparity is geographic" | @1409 | §10.2.1 |
| S4 | "Vermont's **most underserved** areas" | @1413 | §10.2.1, of the NEK |
| S5 | "per capita homelessness rate **second highest nationally**" | Fig 10.2 | Housing row |
| S6 | "Transportation barrier to care is the **single most frequently cited** access problem in Vermont's community meetings" | Fig 10.2 | Transportation row |
| S7 | "income groups between 251-400% of federal poverty line have the **highest uninsurance rates**" | Fig 10.3 | Root cause 4 |
| S8 | "the Northeast Kingdom … is Vermont's **clearest and most severe** equity priority. It is the **most rural**, the **most economically distressed**, the **most underserved** by healthcare providers, and the **most distant** from UVMMC" | @1432 | §10.4.1 — five stacked superlatives in two sentences |
| S9 | "**some of the lowest population densities in the eastern United States**" | @1432 | NEK |
| S10 | "the **highest uninsurance rates in the state**" | @1432 | NEK; glossary @1554 repeats as "(6-8%)" |
| S11 | "**among Vermont's most financially distressed**" | @1433 | North Country, NVRH, Copley |
| S12 | "the **most isolated** communities in the state" | @1434 | NEK |
| S13 | "the **defining rural equity challenge**" | @1437 | Mountain West / rural South / Appalachia / Great Plains |
| S14 | "**The Most Important New Equity Issue**" | @1439 heading, @1440 heading | GLP-1 (heading text duplicated — see Other issues) |
| S15 | "what **may be the most consequential new health equity issue** in American healthcare **since the introduction of statins**" | @1445 | GLP-1 |
| S16 | "the communities with **highest obesity prevalence**" | @1447 | Vermont Medicaid |
| S17 | "the **most vivid current example** of … the equity reckoning in pharmaceuticals" | @1456 | GLP-1; forward-references "what the book later identifies" |
| S18 | "Vermont has **more equity infrastructure than most states** of comparable size" | @1458 | §10.6 |
| S19 | "the **most systematic SDOH screening infrastructure of any state primary care program**" | @1460 | Blueprint HRSN |
| S20 | "the **most equity-protective access policy** for behavioral health services" | @1463 | CCBHCs |
| S21 | "HEDIS … is the **most widely used** quality measurement system in American healthcare" | @1486 | §10.11 |
| S22 | "Blueprint PCMH clinical registry (**most complete**, but only covers PCMH-attributed patients)" | Fig 10.10 | Chronic disease row |
| S23 | "Medicaid data has the **most complete** demographic information" | @1496 | §10.12.1 |
| S24 | "The **most common failure** in health equity intervention design is treating all disparities as if they have the same cause" | @1508 | §10.14 — near-twin of S1 |
| S25 | "the **only state-level tool** that systematically scores the equity impact of healthcare interventions before they are deployed" | @1544 | HEROI — see MISMATCH 8 |
| S26 | "the **most detailed state-level picture of healthcare equity in Vermont's history**" | @1545 | to legislators |
| S27 | "the **most comprehensive state-level equity monitoring architecture in the country**" | @1546 | to national audience |
| S28 | "**the central tension** in healthcare transformation" | @1546 | averages vs disparities |
| S29 | "the **highest equity burden**" / "**most financially distressed** hospital infrastructure" | Fig 10.4 | NEK row |
| S30 | "Vermont's **highest-priority equity geography**: **highest** uninsurance rates, **most limited** provider access, **highest** unemployment, **lowest** broadband connectivity, **most** financially distressed" | @1554 | glossary — five more stacked superlatives |

**Cross-chapter collision risks to check next:** S19/S20/S25/S26/S27 are all "Vermont is #1
nationally" claims within one chapter — four separate national firsts. S27 ("most
comprehensive state-level equity monitoring architecture in the country") sits directly
against @1507's admission that the state's own composite score has never been computed and
Figure 10.4's finding that county-level equity data infrastructure does not yet exist; that
is an in-chapter tension as well as a cross-chapter one. S13 and S3 both claim a "defining"
challenge. S28 "the central tension in healthcare transformation" should be grepped against
other chapters, which very likely name a different central tension (sequencing).

**In-chapter superlative tension (not a hard contradiction, but worth resolving):** S3 says
Vermont's most consequential equity disparity is geographic; S15 says GLP-1 access is the most
consequential *new* equity issue in American healthcare. The word "new" and the change of
scope (Vermont vs American healthcare) keep these compatible, but a reader meets both within
four pages. Similarly S6 names transportation the single most-cited access problem while
@1413's Oliver Wyman summary lists **cost first** ("not going to care because the premiums and
out-of-pocket costs are too high") in the same source's community feedback.

---

## Other issues

### Duplicated heading text — §10.5 and §10.5.1 are byte-identical
@1439 (Heading2) "10.5 The GLP-1 Access Crisis — The Most Important New Equity Issue" is
immediately followed by @1440 (Heading3) "10.5.1 The GLP-1 Access Crisis — The Most Important
New Equity Issue". Identical title at two levels with zero text between them. Renders as a
stutter. **Fix:** delete the Heading3 at @1440, or retitle it (e.g. "10.5.1 Why the Drugs
Change the Equity Calculus").

### §10.9 is a one-sentence orphan section, and §10.10 re-does its job
@1480 "10.9 Measuring Equity: HEROI, HEDIS Stratification, and VBC Safeguards" contains
exactly one sentence (@1481: "The remainder of this chapter turns that equity landscape into
an operational toolkit — the stratified measurement, composite scoring, and value-based-
contracting safeguards Vermont needs…"), then §10.10 opens with @1483: "The first half of
this chapter established the Vermont equity landscape … This chapter develops the analytical
and operational toolkit for actually closing those gaps." Two consecutive bridge passages
saying the same thing — the visible seam of a merge of two drafts. §10.9's own title also
promises HEROI, HEDIS and VBC content that is actually delivered in §10.11, §10.13 and §10.15.
**Fix:** delete §10.9 entirely (heading and sentence) and let §10.10 carry the bridge; or keep
§10.9's title as the part-two divider and delete §10.10's restatement. Note this renumbers
§10.10–10.19 if the heading is removed, and the chapter's own internal cross-reference at
@1509 ("the five-category root cause taxonomy introduced earlier in this chapter") is
section-number-free, so nothing breaks.

### Genuine repetition (as distinct from legitimate recurrence)
1. **The 94%/82% insurance pair is stated twice in near-identical words**: @1403 "Black adults
   in Vermont have an 82% health insurance coverage rate compared to 94% statewide" and @1415
   "statewide, 94% of Vermont adults have health insurance — but only 82% of Black adults."
   Both cite the same 2024 VDH report, 12 elements apart. §10.1 is the overview and §10.2.2 is
   the data section, so one should cross-reference rather than restate. **Fix:** cut the figures
   from @1403, leaving the qualitative claim, and let @1415 carry the numbers.
2. **The delay-care-due-to-cost list is stated twice**: @1403 "LGBTQ+ Vermonters, Vermonters
   with disabilities, and lower-income Vermonters delay care at higher rates due to cost" and
   @1416 "BIPOC Vermonters, LGBTQ+ Vermonters, Vermonters with disabilities, and lower-income
   Vermonters were all more likely to delay care due to cost."
3. **The NEK county definition appears three times** (@1409, @1432, glossary @1554). The
   glossary instance is legitimate recurrence; @1409 and @1432 are 23 elements apart and the
   second is a genuine restatement — @1432 should open with the superlative, not the
   definition.
4. **The "averages mask widening disparities" thesis is restated five times**: @1398 (epigraph),
   @1400 (§10.1), @1478 (§10.8 principle one), @1486 (§10.11 on HEDIS), @1546 (Implications).
   @1400 and @1486 are the two that most closely duplicate each other's argument; @1398/@1478/
   @1546 are legitimate recurrence (epigraph, accountability principle, closing).
5. **S1 vs S24** — "the most common failure mode in healthcare quality measurement" (@1400) and
   "the most common failure in health equity intervention design" (@1508) are different claims
   about different things, but the parallel construction makes the second read as a
   contradiction of the first on a skim. **Fix:** vary the second ("The recurring design error…").
6. **Root cause taxonomy prose is duplicated**: @1427 ("The five root cause categories are not
   mutually exclusive — a Black rural resident of Windham County may face geographic access
   barriers, SDOH barriers, and trust barriers simultaneously") and @1509 (restates the whole
   taxonomy inline: "geographic access, social needs, clinical practice variation, coverage
   barriers, trust and engagement"). @1509's re-listing is defensible as a reminder after nine
   sections, but it is the third full enumeration of the same five items (Figure 10.3, @1509,
   glossary @1548).

### Legitimate recurrence — checked and deliberately left
- Glossary entries @1548–@1555 restate definitions given in the body. That is what a glossary
  is for; not flagged.
- The `Sources:` paragraph @1556 is a plain paragraph, not a `## **Sources**` heading —
  correct per the recurring-headings rule.
- The three recurring end-of-chapter headings are byte-correct: "10.17 Work This Chapter on
  the Platform" (@1538), "10.18 Implications for You" (@1542), "10.19 Key Concepts in This
  Chapter" (@1547). (They carry section numbers here, consistent with the chapter's other
  headings; compare against sibling chapters before changing anything.)
- Figure 10.6 and Figure 10.10 both organize by "equity dimension" but list different
  dimension sets (8 accountability indicators vs 8 data-source dimensions) — not duplication,
  different axes. Worth a one-line note in the text so a reader does not read the second as a
  restatement of the first.

### Minor / mechanical
- **HEROI score bands overlap at 80**: @1507 "A HEROI score of **80+** indicates… A score of
  **60-80** indicates material disparities." 80 falls in both bands. **Fix:** "60–79".
- **Figure 10.1 has no header row.** It is a 2×2 indicator grid where each cell contains its
  own label. Per the project's rule 4, verify in the table-style XML that `tblLook` is not
  painting the first row navy under black text — a LibreOffice render cannot show this defect,
  and this is exactly the shape of table that triggers it. Not checked here (read-only audit
  of content, not formatting); flagging so `check_format.py` is run against it.
- **Figure 10.10 is a 2-column table where its caption implies a mapping table**; fine, but it
  is the only figure in the chapter whose header row has no third column, which will look
  inconsistent beside 10.6/10.7/10.8.
- **@1456 forward-references "what the book later identifies as the equity reckoning in
  pharmaceuticals"** without naming a chapter. Verify that a later chapter actually uses that
  phrase before this ships — a dangling forward reference is the same class of undelivered
  promise as an unresolved URL.
- **Platform links in Figure 10.11 not verified here** (`/research-lab/population-equity?tab=equity`
  and `?tab=population`). Per the definition-of-done, a 200 is not a delivered promise: the
  Health Equity Studio must actually compute a HEROI composite across the five named dimensions
  (access, quality, outcome, SDOH burden, trust) with those weights, and the Population Health
  Modeler must actually produce 5–10 year cohort outcomes. @1539's claim "exactly what the
  Health Equity Studio measures" is a promise that needs opening the tool. This is outside a
  read-only docx audit and is the highest-priority follow-up, given MISMATCH 8.
