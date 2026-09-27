# Chapter 9 Audit

Source of truth: `HTR_Book_v42.docx` → `word/document.xml`, read directly via zipfile
(not the `.md` mirror). Chapter 9 boundaries: Heading1 "Chapter 9: The Clinical Pillar in
Practice…" through Heading1 "Chapter 10: The Equity Imperative…" (doc.xml offsets
2,902,834 → 3,119,194; 216 KB of XML). Read-only pass — **the .docx was not modified.**

Contents in range: 8 `w:tbl` elements — 6 numbered figures (9.1–9.6) and 2 unnumbered
shaded callouts (BEYOND VERMONT, VERMONT IN PRACTICE).

---

## Figures found (ground truth)

### Figure 9.1 — NCQA PCMH recognition: six concept areas and Vermont implementation challenges
Table 1. Header row (navy `1b3a6b`, white text): `Concept Area | What it requires operationally | Vermont implementation challenge`. **6 data rows:**

| Concept Area | Vermont challenge (abridged) |
| :--- | :--- |
| Team-Based Care and Practice Organization | small teams; role definition needs workflow redesign |
| Knowing and Managing Your Patients | registry outreach needs data infra; Blueprint field staff + VITL |
| Patient-Centered Access and Continuity | "After-hours access is the **most** operationally challenging requirement for small rural practices" |
| Care Management and Support | CHT staff supply much of the function |
| Care Coordination and Care Transitions | **"30-day follow-up after behavioral health *hospitalization* — Vermont's 76% rate — is a care coordination failure."** |
| Performance Measurement and Quality Improvement | Blueprint HEDIS support + GMCB analytics vendor |

Sources line: NCQA PCMH Standards and Guidelines 2023; Blueprint Annual Report 2024; Oliver Wyman Act 167 (Aug 2024, rev. Oct 2024 & Jan 2025).

### Figure 9.2 — Panel risk stratification framework for Vermont PCMH practices
Table 2. Header: `Tier | % of Panel | Characteristics | Care Model`. **4 data rows:**

| Tier | % of Panel |
| :--- | :--- |
| Tier 1 — Complex | 3-5% |
| Tier 2 — Moderate Risk | 15-20% |
| Tier 3 — Standard | 50-60% |
| Tier 4 — Inactive | 20-30% |

### (unnumbered callout) BEYOND VERMONT
Table 3. Single-cell callout on panel stratification transferring outside Vermont. No figure number, no caption — correct for this callout class.

### Figure 9.3 — Collaborative Care Model components and Vermont application
Table 4. Header: `CoCM Component | Role | What they do | Vermont application`. **3 data rows:** Primary Care Provider (PCP); Behavioral Health Care Manager (BHCM); Psychiatric Consultant. Key cells:
- BHCM row, Vermont application: "MHI pilot found **80% of administrative entities increased CHT staffing** — CHT staff are the natural BHCM pool; sustainability challenge when pilot funding ends"
- Psychiatric Consultant row, Vermont application: **"one psychiatrist can support an entire primary care practice's behavioral health population through consultation rather than direct care"**

### Figure 9.4 — Clinical pillar in-practice implementation commitments
Table 6. Header: `Commitment | Operational Requirement | Timeline | Primary Vehicle`. **5 data rows:** PCMH transformation support (2025–2028); CoCM deployment at every PCMH practice (2025–2028); Structured data capture standards (2025–2027); Care transition protocols (2025–2027); Clinical leader engagement (2025–2028).

### (unnumbered callout) VERMONT IN PRACTICE — The Blueprint CHT Transition Protocol
Table 5. Single-cell callout: 24-hour contact → 7-day follow-up visit → 30-day care plan review. Claims "Blueprint practices that have implemented this protocol systematically **report 30-day readmission rates below the Vermont statewide average.**"

### Figure 9.5 — Clinical pillar implementation matrix
Table 7. Header: `Investment | Estimated cost | Timeline to value | ROI crossover | Vermont benchmark`. **6 data rows:**

| Investment | Cost | Timeline to value | ROI crossover | Vermont benchmark |
| :--- | :--- | :--- | :--- | :--- |
| Blueprint PCMH transformation (NCQA recognition) | $25K-$75K per practice | 12-18 months | 18-24 months | 5.8:1 ROI documented; $5.8M reduced expenditure per $1M PCMH investment |
| CoCM deployment (BHCM + telepsychiatry) | $80K-$150K annually per practice | 3-6 months setup | 12-18 months | Vermont MHI pilot: PHQ-9 improvement; CHT staff as natural BHCM pool |
| CCBHC certification | $500K-$2M annually per entity | 18-36 months | 24-48 months | Vermont: 5 planned CCBHCs; enhanced Medicaid FMAP funding **for 8 years** |
| Panel risk stratification and care management | $40K-$100K annually | 3-6 months | 12 months | Blueprint: Tier 1 (3-5% of panel) = 30-40% of total cost of care |
| Care transition protocol (CHT + VITL admission notification) | $20K-$50K setup | 3 months | 6-12 months | Vermont: 14.8% 30-day readmission; 76% BH follow-up rate — improvement target |
| HCC documentation improvement at clinical level | $10K-$30K training | 1-2 months | Immediate: Year 1 RAF gain | CKD staging, DM complications, morbid obesity — most common VT gaps |

### Figure 9.6 — Hands-on platform tools for the Clinical Pillar in practice
Table 8. Header: `Do this | On this tool | What to look for`. **3 data rows:**
1. Clinical Quality Optimizer — `/research-lab/policy-quality?tab=quality`
2. High vs. Low Value Care — `/research-lab/vbc-clinical-quality?tab=value`
3. Risk Stratification Engine — `/research-lab/interoperability?tab=risk`

---

## Claims checked against their own source (MATCH/MISMATCH + proposed fix)

### 1. MISMATCH — "76%" is attached to the wrong HEDIS denominator in Figure 9.1
**This is the same class of defect found in Chapter 1: the prose/cell claim does not match the measure it cites.**

- Figure 9.1, Care Coordination row: "30-day follow-up after behavioral health **hospitalization** — Vermont's 76% rate".
- §9.4.2: "76% 30-day follow-up after mental health **ED visits**, 68% after SUD ED visits."
- §9.12 Key Concepts: "HEDIS **FUM** — Follow-Up After Emergency **Department Visit** for Mental Illness … Vermont's 76% 30-day follow-up rate reflects performance on this measure."
- Whole-manuscript grep on `76%` (every occurrence in the book): Ch8 "76% 30-day follow-up rate after mental health ED visits"; Ch8 again "30-day follow-up after mental health ED visits reaching only 76%"; Ch8 table "76% 30-day follow-up after MH ED visit"; Ch13 "BH follow-up 76% (mental health)"; Appendix "BH ED follow-up … HEDIS FUM". **Every other instance in the book says ED visit.** Figure 9.1 is the sole outlier.

Follow-up-after-**hospitalization** is a different HEDIS measure (FUH), with a different rate. The cell as written misattributes Vermont's FUM rate to FUH.

**Proposed fix** (exact-text replacement inside the cell):
`30-day follow-up after behavioral health hospitalization — Vermont’s 76% rate — is a care coordination failure.`
→
`30-day follow-up after a behavioral health ED visit — Vermont’s 76% rate (HEDIS FUM) — is a care coordination failure.`

Note §9.6 has the same looseness but stays defensible: "Vermont's 14.8% 30-day readmission rate and 76% 30-day behavioral health follow-up rate" — no denominator asserted, so it is not wrong, only unspecific. Recommend adding "after a behavioral health ED visit" there too for consistency.

### 2. MISMATCH — psychiatric-consultant leverage stated at two different orders of magnitude
- §9.3.2 prose: "One psychiatrist providing consultation through a telepsychiatry model can support **10-15 primary care practices** simultaneously."
- Figure 9.3, Psychiatric Consultant row: "one psychiatrist can support **an entire primary care practice's** behavioral health population."

The figure's cell understates the prose by roughly 10×, and the prose's whole point ("Vermont's psychiatric workforce, deployed this way, can support CoCM at a scale that direct psychiatric referral could never achieve") depends on the multi-practice number. A reader comparing the two reads the table as contradicting the section that introduced it.

**Proposed fix:** change the Figure 9.3 cell to
`Vermont’s psychiatric shortage makes the CoCM model especially valuable — one psychiatrist can support 10-15 primary care practices’ behavioral health populations through consultation rather than direct care`

### 3. MISMATCH (scale/arithmetic) — the $180,000 ROI claim funds far more than "a half-time care coordinator"
§9.2.3: "A care management program that prevents one hospitalization per month among Tier 1 patients in a 2,000-patient panel generates approximately **$180,000** in avoided cost annually — sufficient to **fully fund a half-time care coordinator** position and produce net positive ROI under any VBC arrangement."

- The $180,000 arithmetic is internally sound (12 avoided admissions × ~$15,000 = $180,000) — the implied per-admission cost is not stated, which is the only gap on the number itself.
- The conclusion does not follow from the chapter's own cost figures. Figure 9.5 prices the entire "Panel risk stratification and care management" investment at **$40K-$100K annually**. $180,000 therefore funds the whole program 1.8×–4.5× over, not a half-time coordinator. The sentence understates its own case by roughly 4–8×, and a reader who has the matrix in front of them sees the mismatch.

**Proposed fix:**
`— sufficient to fully fund a half-time care coordinator position and produce net positive ROI under any VBC arrangement.`
→
`— enough to fund the entire panel-stratification and care-management program costed in Figure 9.5 several times over, and to produce net positive ROI under any VBC arrangement.`

### 4. SOFT MISMATCH — Figure 9.2 tier percentages do not bound to 100%
Tier ranges sum to **88% at the low end and 115% at the high end** (3+15+50+20 = 88; 5+20+60+30 = 115). Midpoints sum to ~101.5%, so the intent is clear, but the low end cannot describe a complete panel and the high end over-allocates it.

**Proposed fix:** either add a note to the caption ("ranges are indicative; tiers are mutually exclusive and exhaust the panel") or tighten Tier 3 to `45-55%` and Tier 4 to `20-25%`, which brings the bounds to 83–105 → still loose; cleanest is the caption note. Deliberately **left for the author** — this is a judgment about how precise the reference table should be, not a factual error.

### 5. MATCH — "six concept areas"
§9.2.1 prose: "organized around **six** concept areas"; caption: "**six** concept areas". Figure 9.1 has exactly **6** data rows. MATCH.

### 6. MATCH — "four operational dimensions" (CoCM readiness)
§9.3.1 names EHR integration (1), then "Physical space, workflow protocols, and billing setup complete the four-dimension readiness assessment" (2, 3, 4). Count is correct. (Thinness of the treatment is logged under Other issues.)

### 7. MATCH — "five clinical implementation commitments"
§9.8 prose: "the plan should contain **five** clinical implementation commitments." Figure 9.4 has exactly **5** data rows. MATCH.

### 8. MATCH — Tier 1 cost concentration, stated three times consistently
§9.2.3 prose "The 3-5% of complex patients in Tier 1 typically account for 30-40% of total cost of care"; Figure 9.2 Tier 1 = "3-5%"; Figure 9.5 benchmark "Tier 1 (3-5% of panel) = 30-40% of total cost of care." All three agree. MATCH.

### 9. MATCH — 12-18 month PCMH timeline
§9.2.1 "typically requires 12-18 months of preparation"; Figure 9.5 "Timeline to value 12-18 months". MATCH.

### 10. MATCH — Blueprint 5.8:1 ROI
Figure 9.5: "5.8:1 ROI documented; $5.8M reduced expenditure per $1M PCMH investment" — internally consistent (5.8:1 = $5.8M/$1M) and consistent with every other instance in the manuscript (Ch1 VERMONT EVIDENCE box, Ch8 §8.2 stat strip and prose, Ch13, Ch16). Whole-book grep on `5.8:1` found no conflicting statement. MATCH.

### 11. MATCH — 80% CHT staffing finding
§9.3.3 "The 80% of Blueprint administrative entities that reported increased CHT staffing in the 2025 MHI evaluation"; Figure 9.3 BHCM row "MHI pilot found 80% of administrative entities increased CHT staffing." MATCH (legitimate table-echo of its own prose).

### 12. MATCH — 14.8% readmission rate
§9.6 and Figure 9.5 both say 14.8%; consistent with Ch11 dashboard ("14.8% 30-Day Readmission Rate", benchmark 14.5%), Ch13 and Appendix E. MATCH.

### 13. MATCH — CoCM billing codes and evidence base
§9.3.1 "99492, 99493, and 99494"; §9.3 "90+ randomized controlled trials." Whole-book grep: Ch1 and Ch8 both say "90+ randomized controlled trials" and Ch8 lists the same CPT codes. Consistent. MATCH.

### 14. MISMATCH (rounding) — diabetes gap arithmetic rounds the wrong way at the top
§9.4.2: "22% of Vermont's Blueprint diabetic patients have HbA1c not in control. Given Vermont's population of approximately 60,000-70,000 adults with type 2 diabetes, this represents **13,000-15,000** patients."
22% × 60,000 = 13,200; 22% × 70,000 = **15,400**. The stated upper bound is 400 low.

Two further notes on this sentence:
- It applies a **Blueprint-attributed** control rate to the **statewide** diabetic adult population. That is an inference, not a measured figure, and the sentence does not flag it as one.
- The 22% itself is consistent with the rest of the book (Ch11 quality targets: "diabetes: reduce 22% not-controlled"). MATCH on the rate.

**Proposed fix:** `this represents 13,000-15,000 patients` → `this implies on the order of 13,000-15,400 patients`, or state the range as "roughly 13,000-15,000" with the Blueprint-to-statewide extrapolation made explicit.

### 15. UNVERIFIED — "enhanced Medicaid FMAP funding for 8 years" (Figure 9.5, CCBHC row)
No other statement in the manuscript gives a duration for Vermont's CCBHC demonstration enhanced-FMAP period. Ch8 says only "Vermont became an official CCBHC Demonstration State in 2024, receiving enhanced Medicaid funding." The federal CCBHC demonstration operates on statutorily defined participation periods that do not obviously produce "8 years," so this figure is unsupported anywhere in the book and unsupported by the row's cited source line (Figure 9.5 sources: Blueprint Annual Report 2024; MHI Evaluation 2025; SAMHSA CCBHC documentation). **Flagged, not fixed** — needs a primary-source check against the SAMHSA CCBHC demonstration authority before it is either sourced or removed. Per directive 14, no replacement text is proposed from inference.

### 16. CROSS-CHAPTER CONFLICT on the CCBHC count (not a Chapter 9 error)
Chapter 9 Figure 9.5 says "Vermont: **5 planned** CCBHCs" — correct and consistent with Ch8's "five additional CCBHC entities by July 2026" and with Ch16's RHT milestone table. But Ch8 also states Vermont already "has **two active** CCBHC demonstration sites," while Ch13's baseline column reads "**zero** CCBHCs" and Appendix E reads "CCBHC network — **0 certified**." Chapter 9's own number is right; the zero-vs-two conflict lives in Ch13/Appendix E and is logged here only so the eventual fix sweeps the whole manuscript (directive 13).

### 17. Platform routes in Figure 9.6 — directory-level PASS, tab-level INCOMPLETE
All three route directories exist under `frontend/app/research-lab/`: `policy-quality`, `vbc-clinical-quality`, `interoperability`. Grep for the cited tab ids found `'quality'` in `policy-quality`, `'value'` in `vbc-clinical-quality`, and `'risk'` in `interoperability` — so each `?tab=` value appears in its target bench.

**Not completed, and explicitly not claimed as verified:** confirming that each tab id is a *registered tab* in that page's tab list (rather than an unrelated string match), and — the half that directive 5/criterion 5 says is where the defects hide — **opening each tool and confirming the promise is delivered**: that the Clinical Quality Optimizer actually returns payment-adjustment estimates, that High vs. Low Value Care actually separates services, and that the Risk Stratification Engine actually surfaces "patients in a high tier who are receiving no care management." A directory existing is not a delivered promise. Note also that `'risk'` appears in **both** `vbc-clinical-quality` and `interoperability`, so the Risk Stratification Engine's home bench should be confirmed before the URL is trusted.

---

## Superlative/ranking claims logged for cross-chapter comparison

Verbatim, with location, for later cross-chapter contradiction sweeps (Ch1 already showed that "the most X" claims collide across chapters):

1. Figure 9.1, Access row: "**After-hours access is the most operationally challenging requirement** for small rural practices."
2. §9.2.2: "And AHEAD transition support … **is the most operationally significant clinical program transition Vermont's primary care system faces.**"
3. §9.2.2: "Vermont's Blueprint program provides something that **most states' primary care transformation initiatives do not**: dedicated field staff…"
4. §9.2.2: "This infrastructure is operationally important and is **often underappreciated as a driver of Vermont's Blueprint success.**"
5. §9.2.3: panel of "1,500-2,000 patients — **significantly larger than the 1,100-1,200** typically associated with solo or minimally supported practice"; "can expand effective panel capacity by **30-50%** without adding physicians."
6. §9.3: CoCM's evidence base "**makes it the clinical standard of practice** for behavioral health integration in primary care." (Compare Ch1/Ch8: "the **only** integrated behavioral health model with designated Medicare billing codes and a 90+ RCT evidence base" — "only" vs "the standard of practice" are different claims; both survive, but the book should pick one framing.)
7. §9.3.2: "The CoCM psychiatric consultation model is **more efficient than traditional psychiatric referral** in exactly the way that Vermont's workforce situation requires"; "can support CoCM at **a scale that direct psychiatric referral could never achieve.**"
8. §9.3.3: "The behavioral health care manager is **the linchpin of CoCM**."
9. §9.12 Key Concepts, Warm handoff: "The warm handoff between CCBHC case managers and primary care BHCMs is **the operational linchpin of Vermont's behavioral health continuum.**" — **two different things called "the linchpin" within one chapter.** Scopes differ (CoCM vs. the BH continuum), so this is not a strict contradiction, but it is the exact rhetorical pattern that produced Ch1's "most underestimated dependency" collision. Flagged for the cross-chapter sweep.
10. §9.4.1 Step 5: "**The most common HEDIS improvement failure mode** is the improvement campaign that produces a short-term spike in performance followed by regression to baseline."
11. §9.4.2: opportunity areas "that primary care practices can prioritize for improvement investments with **the highest population health and financial return** under VBC."
12. §9.5.1 Step 3: "**Vermont's most critical current gap is at Steps 1 and 2** — incomplete structured data capture and incomplete VITL connectivity."
13. §9.5.2: "**The three most common HCC documentation opportunities** in Vermont's primary care population…" (echoed in Figure 9.5: "most common VT gaps").
14. §9.6 callout: "Vermont's Community Health Teams have developed a care transition protocol that **represents current best practice** for Blueprint-participating practices."
15. §9.7: "**One of the clearest findings** from Oliver Wyman's Act 167 community engagement process…"
16. §9.7 heading: "Clinical Leadership in Transformation — **The Under-Resourced Pillar**."
17. §9.4.1 Step 3: uncontrolled hypertension's cause "is **almost always** multi-factorial."
18. §9.10 lead-in: Chapter 9's quality mechanics "map to the clinical-quality bench."
19. §9.11 (national policy professional): Vermont's approach "**is worth studying as a model** for states trying to translate clinical evidence into rural implementation."

Two Chapter 9 superlatives to check against Chapter 8 in particular, which carries the strongest Blueprint claims in the book ("Vermont's **most successful** population health program and its **most underfunded** one", "the **strongest evidence available**", "the **best available evidence**", "**among the most robust** ROI findings in the VBC literature"): items 2 and 3 above make Blueprint-infrastructure superlatives of their own and should not be allowed to drift into a second "most important Blueprint asset" claim.

---

## Other issues

### A. Terminology collision: §9.7 calls clinical leadership "The Under-Resourced Pillar"
The book's five pillars are Policy, Technology, Economics, Clinical, Operations (`frontend/lib/framework/` and `chapters.ts` encode exactly these). A section heading inside the Clinical chapter that names a *sixth* thing "the Under-Resourced Pillar" reads, on a contents page, as a pillar of the framework. **Proposed fix:** `9.7  Clinical Leadership in Transformation — The Under-Resourced Capability`. Low risk, purely a heading string.

### B. Thin section: §9.3.1 Site Readiness Assessment
The chapter's stated purpose (opening paragraph) is "the implementation layer that national specifications typically leave abstract: panel sizes, staffing ratios, workflow sequencing." §9.3.1 announces a **four-dimension** readiness assessment, then gives EHR integration a full paragraph and compresses the remaining three into one sentence — "Physical space, workflow protocols, and billing setup complete the four-dimension readiness assessment" — before jumping to billing codes. Physical space and workflow protocols get **zero** operational content. This is the thinnest section in the chapter and it is thin precisely where the chapter promises depth.

### C. Thin/asymmetric: §9.4.2 Vermont-Specific HEDIS Opportunity Areas
Three areas only, and the third is asymmetric with the first two: Diabetes and Behavioral Health Follow-Up each carry a rate and a population count; Cervical Cancer Screening carries **no number at all** ("below-benchmark … in several Vermont communities, particularly in rural areas"). §9.4.2 also opens "Vermont's November 2025 data reveals…" but the cervical screening claim is sourced to "the 2025 AHS transformation report" — two different vintages under one lead-in.

### D. Repetition: "CHT staff are the natural BHCM pool" appears three times
§9.3.3 prose ("CHT staff with the appropriate clinical background are the natural BHCM pool"), Figure 9.3 BHCM row ("CHT staff are the natural BHCM pool"), Figure 9.5 CoCM row ("CHT staff as natural BHCM pool"). One table echoing its own prose is legitimate recurrence; **three** instances of the same phrase, two of them in tables 50 paragraphs apart, is genuine duplication. Recommend dropping it from Figure 9.5, whose column is a *Vermont benchmark* and where "Vermont MHI pilot: PHQ-9 improvement" already carries the row.

### E. Legitimate recurrence (checked, deliberately left)
- **76% / 14.8% recurring five and two times.** These are the chapter's anchor metrics and each instance serves a different function (figure cell, opportunity-area analysis, §9.6 lead, matrix benchmark, glossary definition). Recurrence is correct; only the Figure 9.1 *denominator* is wrong (finding 1).
- **Structured data capture** in §9.5.1 Step 1, the "Vermont's implementation gap" paragraph, and the §9.12 glossary entry — glossary entries are exempt by the definition of done.
- **Registry** described in §9.3.1 and again in the §9.12 "CoCM registry" glossary entry — same exemption.
- **80% CHT staffing** in §9.3.3 and Figure 9.3 — a table summarising its own prose.

### F. Potentially confusing but not an error: the 62% hypertension figure
§9.4.1 Step 2 uses "A practice with a hypertension control rate of 62%" as a worked hypothetical. Elsewhere the book states Vermont's actual hypertension control at 77% (Ch11 quality targets: "Hypertension control: maintain 77%"). The sentence is framed hypothetically ("A practice with…"), so it is not a false claim, but a reader arriving from Ch11 may read 62% as a Vermont figure. Deliberately left — a one-word fix ("a practice with, say, a hypertension control rate of 62%") is available if the author wants it.

### G. Unsourced performance claim in the VERMONT IN PRACTICE callout
"Blueprint practices that have implemented this protocol systematically **report 30-day readmission rates below the Vermont statewide average.**" This is a comparative outcome claim with no number, no denominator, and no source — and the callout carries no Sources line of its own (correct for the callout class, but it means the claim is unsourced anywhere). Flagged for sourcing, not rewritten.

### H. No in-text figure citations anywhere in Chapter 9
Not one sentence in the chapter says "Figure 9.x". Every figure is introduced by proximity alone (e.g. §9.2.1 ends "…represent the current requirements:" immediately before Figure 9.1). This is consistent within the chapter and is not a defect, but it means the prose↔figure link is positional only — which is *why* findings 1, 2 and 3 above could drift without anything looking broken. Worth knowing for the cross-chapter sweep: chapters that do cite figures by number would flag these faster.

### I. Structural checks that passed
- Recurring headings byte-identical to the canonical strings: `9.10  Work This Chapter on the Platform`, `9.11  Implications for You`, `9.12  Key Concepts in This Chapter` all present and correctly spelled.
- `Sources: …` at the end of the chapter is a **plain paragraph**, not a `Heading` — correct per the style-critical rule.
- Figure numbering is gapless and in document order: 9.1, 9.2, 9.3, 9.4, 9.5, 9.6. The two unnumbered callouts are correctly excluded from the sequence.
- Both figure tables carrying a header row use navy fill `1b3a6b` with white (`ffffff`) bold runs — no white-on-light and no colourless run in a filled cell in this chapter's tables. (A full formatting verdict requires `python3 book-build/check_format.py`, which was **not** run in this read-only pass.)

---

## Summary of actionable findings

| # | Severity | Finding |
| :--- | :--- | :--- |
| 1 | **High** | Figure 9.1 attributes Vermont's 76% FUM (ED-visit) rate to follow-up after **hospitalization**. Sole outlier in the whole manuscript. |
| 2 | **High** | Figure 9.3 says one psychiatrist supports "an entire primary care practice"; §9.3.2 says **10-15 practices**. ~10× conflict. |
| 3 | Medium | §9.2.3's $180,000 "funds a half-time care coordinator" contradicts Figure 9.5's $40K-$100K program cost. |
| 15 | Medium | Figure 9.5's "enhanced Medicaid FMAP funding for 8 years" is unsourced anywhere in the book. Needs a primary source. |
| 14 | Low | Diabetes gap upper bound should be ~15,400, not 15,000; Blueprint→statewide extrapolation not flagged. |
| 4 | Low | Figure 9.2 tier ranges bound to 88%-115%, not 100%. |
| A | Low | §9.7 heading calls clinical leadership a sixth "Pillar". |
| B, C | Low | §9.3.1 and §9.4.2 are thin; §9.3.1 gives no content for 2 of its 4 named dimensions. |
| D | Low | "CHT staff are the natural BHCM pool" repeated three times. |
| G | Low | Callout's readmission-rate comparison is unsourced. |
| 17 | Open | Figure 9.6 tab ids exist in their benches, but **promise delivery was not verified** — three tools still need to be opened. |

**Nothing in the .docx was modified.** No fix above has been applied.
