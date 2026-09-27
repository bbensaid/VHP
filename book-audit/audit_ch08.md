# Chapter 8 Audit

Read-only audit of Chapter 8 ("The Clinical Pillar — Redesigning Care Delivery for a
Transformed System") extracted directly from `HTR_Book_v42.docx` → `word/document.xml`
via zipfile, body-child order preserved (tables kept as cell grids, not the lossy `.md`
mirror). Chapter 8 = body children 1184–1295 (Heading1 "Chapter 8:" → Heading1
"Chapter 9:"). No edits were made to the docx.

Paragraph indices below are body-child indices in the fresh file as of 2026-09-27;
re-locate by text before any edit.

## Figures found (ground truth)

Seven numbered figures, sequential 8.1–8.7, no gaps or duplicates. Two unnumbered
callout tables (VERMONT IN PRACTICE, BEYOND VERMONT) correctly carry no figure number.

| Fig | Table at | Shape | Actual cell contents (ground truth) |
| :-- | :-- | :-- | :-- |
| (stat band, unnumbered) | 1193 | 1 row × 4 | `5.8:1 Blueprint ROI on Investment` · `15+ Yrs Operational Since 2006` · `All-Payer Medicare + Medicaid + Commercial` · `91% VT Adults with Primary Care Provider` |
| 8.1 | 1198 | 4 rows × 4 (header + 3) | Header: Component / What it is / How it is funded / What it does. Rows: **PCMH** (NCQA-recognized practices; all-payer PMPM base + performance payment); **CHT** (social workers, nurses, CHWs, BH professionals; DVHA Blueprint funding + OneCare "now transitioning" + Medicaid + grants); **Health Information Technology** (VITL HIE → clinical registry + VHCURES; enables population HEDIS, care-gap reports, registries) |
| 8.2 | 1204 | 2 rows × 2, no header row | `Blueprint ROI … per $1M invested — $5.8M` · `VT residents with a personal health care provider — 91% vs. 87% national benchmark — 4 points above (AHS Nov 2025)` ; `Blueprint PCMH hypertension controlled — 77%` · `Blueprint PCMH diabetes HbA1c NOT in control — 22%` |
| 8.3 | 1232 | 4 rows × 4 (header + 3) | Header: CoCM component / Role / What they do / Vermont application. Rows: **PCP** (screens PHQ-9, GAD-7; bills CoCM codes monthly); **BHCM** (registry, brief intervention, rating scales, escalation) — Vermont cell reads "MHI pilot found **80%** of administrative entities increased CHT staffing"; **Psychiatric Consultant** (case review, not primary provider) |
| 8.4 | 1246 | 6 rows × 3 (header + 5) | Header: Component / What it means in practice / Vermont investment vehicle. Five components: Team-based care; Population health management; SDOH screening and navigation; Behavioral health integration; Care coordination for complex patients |
| 8.5 | 1255 | 6 rows × 4 (header + 5) | Domains: Preventive/chronic (HTN 77% controlled; diabetes 22% not controlled); Behavioral health (76% MH ED follow-up; 68% SUD ED follow-up); Primary care access (59% practices accepting new Medicaid; 91% with personal health provider); Hospital quality (readmission 14.8%; avoidable ED 32.3%; admin cost 91% above benchmark); Equity/SDOH (NEK uninsured 6–8% vs 3% statewide) |
| 8.6 | 1273 | 6 rows × 4 (header + 5) | Commitments: Universal Blueprint PCMH coverage (2025–2028); BH integration at every PCMH (2025–2028); CCBHC network covering all HSAs (2026, 5 new CCBHCs, through 2028); PACE program development (2026–2028); Dementia care infrastructure (memory care COE at **3–5 facilities**, 2026–2030) |
| 8.7 | 1277 | 4 rows × 3 (header + 3) | Do this / On this tool / What to look for. Tools: Risk Stratification Methodology `/research-lab/vbc-clinical-quality?tab=risk`; VBC Quality Measures `/research-lab/vbc-clinical-quality?tab=quality`; Risk Stratification Engine `/research-lab/interoperability?tab=risk` |

**No prose sentence anywhere in Chapter 8 cites a figure by number.** Figures are
captioned but never cross-referenced ("as Figure 8.5 shows" appears zero times). So the
Chapter-1 class of defect — prose citing a figure whose cells say otherwise — cannot
occur by explicit citation here; it occurs instead by *silent* restatement of the same
numbers in prose, which is what the checks below test.

Figure 8.7 is the only figure with no `Sources:` line. All six others have one.

## Claims checked against their own source (MATCH/MISMATCH + proposed fix)

### MISMATCH 1 — The ROI study is dated three different ways, and one is wrong

- [1202]: "a six-year longitudinal study using VHCURES … published in *Population Health Management*"
- [1249]: "**The 2013 evaluation finding** — lower hospitalization rates and reduced outpatient facility use for Blueprint participants"
- [1283]: "The 5.8:1 ROI figure is **from a 2016 peer-reviewed study of 2008–2013 data**"
- Sources [1294]: "Population Health Management (Blueprint ROI study, **2016**)"

[1249] calls it "the 2013 evaluation" while [1283] and the Sources block both date the
study to 2016 (2013 is the end of the data window, not the publication). Same study,
same finding, wrong year. **Fix:** [1249] → "The 2016 evaluation finding" (or "the
2016 evaluation of 2008–2013 data").

### MISMATCH 2 — The same 68% is attributed to two different denominators

- [1217] stat block: "76% 30-day follow-up rate after mental health ED visits. **68% after SUD ED visits.**"
- [1255] Figure 8.5: "76% 30-day follow-up after MH ED visit; **68% after SUD ED visit**"
- [1239]: "The 30-day follow-up rate after ED visits **for alcohol use** — 68% in the November 2025 data"

Two places call 68% the all-SUD follow-up rate; [1239] calls the identical number the
alcohol-specific rate. One of the two is wrong, and [1239] then builds the whole
SUD-continuum argument on it. **Fix:** decide from the AHS November 2025 report which
measure the 68% is (the AHS measure is normally FUA, alcohol/other-drug abuse or
dependence) and make [1217], [1239] and Figure 8.5 use one identical label.

### MISMATCH 3 — "the other five pillars" (the framework has five pillars total)

- [1186]: "The Clinical pillar is where the abstractions of **the other five pillars** become a patient's actual experience of care"

The framework is five pillars (Policy, Technology, Economics, Clinical, Operations), of
which Clinical is one — so there are four others. **Fix:** "the other four pillars."
(If Equity is being counted as a sixth, that conflicts with the book's own
five-pillars-plus-Equity-as-imperative structure and with Ch10's framing; "the other
four pillars and the Equity imperative" would be the safe form.)

### MISMATCH 4 — Five new CCBHCs cannot cover fourteen HSAs

- [1218] stat block: "Vermont's CCBHC expansion target: 5 new certified entities by July 2026, **covering every Hospital Service Area**."
- [1227]: "As of 2025, Vermont has **two** active CCBHC demonstration sites … plans to certify **five additional** … — Springfield, Burlington, St. Albans, Newport, Barre."
- [1191]: Blueprint is "embedded in primary care practices across **all 14 Hospital Service Areas**."
- [1273] Figure 8.6: "CCBHC network covering all HSAs … **2026 (5 new CCBHCs) through 2028**"

Two active + five new = seven entities in seven named towns. Fourteen HSAs cannot be
covered by seven entities in 2026. Figure 8.6 is the accurate version (all-HSA coverage
is a *through-2028* goal, of which the five 2026 certifications are the first tranche);
the [1218] stat block overstates it as achieved by July 2026. **Fix:** [1218] →
"5 new certified entities by July 2026, the first tranche toward coverage of every
Hospital Service Area." This is the highest-value fix in the chapter: it is the one
mismatch where a stat card contradicts a figure's own timeline cell.

### MISMATCH 5 — "No HPSAs in Vermont" contradicts the chapter's own shortage claims

- [1241]: "Vermont does not have a primary care physician shortage in the traditional sense. **HRSA recognizes no Health Profession Shortage Areas in Vermont.**"
- [1232] Figure 8.3: "**Vermont's psychiatric shortage** makes the CoCM model especially valuable"
- [1266]: "home and community-based services … are **limited by workforce shortages**"
- [1269]: "Vermont **currently lacks** dementia-specialized primary care at scale"

A psychiatric shortage *is* a HRSA Health Professional Shortage Area designation
(mental-health HPSA), so the absolute form of [1241] contradicts Figure 8.3 one page
later. **Fix:** narrow [1241] to what Oliver Wyman actually argued — "HRSA recognizes
no *primary care* Health Professional Shortage Areas in Vermont" — and verify even that
against HRSA's current designation file before it ships, because the unqualified claim
is the kind that is easy to check and embarrassing to get wrong. Flagged as
verify-externally, not fixed here.

### MISMATCH 6 — "fifteen-year record" vs "two decades"

- [1186]: "its **fifteen-year** record offers something most states do not have"
- [1191]: "for **nearly two decades**"
- 8.2 heading [1192]: "**Two Decades** of Primary Care Transformation"
- [1193] stat card: "**15+ Yrs** Operational Since 2006"
- [1201]: "The evidence base spans **more than a decade** of operation"

Established 2006, chapter's present is late 2025/2026 → twenty years. "Fifteen-year
record" in the chapter's third paragraph is wrong and contradicts the heading two
paragraphs later. **Fix:** [1186] → "its twenty-year record"; [1193] card → "20 Yrs";
[1201] "more than a decade" → "nearly two decades" (or leave — it is true but
gratuitously weak next to the heading).

### MISMATCH 7 — 245.5 vs 245

- [1187] and [1216] and [1220]: "**245.5** ED visits per 10,000"
- [1190]: "a state with **245** ED visits per 10,000"

**Fix:** [1190] → 245.5. Trivial, but it is the same number three lines apart.

### MISMATCH 8 — "nearly 80%" vs "80%"

- [1225]: "with **nearly 80%** of administrative entities reporting increased CHT staffing"
- [1232] Figure 8.3 BHCM row: "MHI pilot found **80%** of administrative entities increased CHT staffing"

**Fix:** pick one against the 2025 MHI evaluation and use it in both.

### MISMATCH 9 — Glossary overstates what the MHI evaluation found

- [1225]: "The 2025 evaluation found **improved access and engagement but sustainability concerns** when temporary funding ends"
- [1290] glossary: "evaluated in 2025 as **highly effective** but facing sustainability challenges"

"Improved access and engagement" is not "highly effective." The glossary is the louder
claim and has no source behind it. **Fix:** [1290] → "evaluated in 2025 as improving
access and engagement, but facing sustainability challenges when pilot funding ends."

### MATCH — checks that hold

- **5.8:1 ROI / $5.8M per $1M.** Consistent in [1193] card, [1202] prose, [1204] Figure 8.2, [1280], [1282], [1283]. Direction and units correct everywhere.
- **91% with a primary care provider.** [1193] card, [1204] Figure 8.2 ("91% vs. 87% national — 4 points above"), [1255] Figure 8.5. Internally consistent; 91 − 87 = 4 ✓.
- **Hypertension 77% controlled / diabetes 22% not in control.** [1204] and [1255] agree, including the awkward but consistent NOT-in-control polarity of the diabetes measure.
- **Avoidable-ED arithmetic [1250].** 32.3% → 25% is 7.3 pts; 7.3% × 200,000 = 14,600 ✓ ("approximately 14,600"). 14,600 × $800–1,200 = $11.7M–$17.5M ✓ ("$12–18 million"). The 32.3% matches Figure 8.5's hospital-quality cell. This calculation is clean.
- **14 hospitals / 14 HSAs.** [1191] "all 14 Hospital Service Areas" and [1250] "approximately 14 hospitals" are consistent with Appendix C's 14-hospital COE framework.
- **CoCM CPT codes 99492, 99493, 99494.** Identical in [1219] and [1231]; [1288] refers to them without numbers. No drift.
- **Blueprint founded 2006.** [1195], [1193] card, [1285] glossary agree. [1207]'s "operated since 2010 under a CMS Multi-Payer Advanced Primary Care Practice Demonstration" is about the *Medicare* participation vehicle, not the program's start, and does not contradict 2006 — though it reads as if it might, and a two-word clarification ("has operated since 2010 *with Medicare participation* under…") would remove the ambiguity.
- **Figure 8.6's "3–5 facilities" memory care COE** is the only place that number appears; no conflicting count elsewhere in the chapter.
- **Platform links in Figure 8.7 all resolve, including the tab params** (mechanical half of criterion 5, verified against the route files, not inferred): `frontend/app/research-lab/vbc-clinical-quality/VBCClinicalQualityClient.tsx` defines `id: 'quality'` (line 36) and `id: 'risk'` (line 50); `frontend/app/research-lab/interoperability/InteroperabilityClient.tsx` defines `id: 'risk'` (line 33, "Risk Stratification Engine"). The two tool *names* in the book match the tabs' own labels. **Not verified here:** whether each tool actually delivers the promised behaviour ("how many patients change tier once social risk is included alongside clinical risk" requires a social-risk input to exist in that engine), and whether those tools tag Chapter 8. A 200 is not a delivered promise — that half is outside this read-only pass and should be run through `audit_chapter.py 8` plus a real page open.

## Superlative/ranking claims logged for cross-chapter comparison

Verbatim, with location. The Blueprint cluster is the one to reconcile across chapters —
the chapter makes three *different* "most X in the country" claims about the same program
within six paragraphs.

**Blueprint (three competing superlatives, plus repeats):**
1. [1187] "The Vermont Blueprint for Health **is the most successful sustained primary care transformation program in American health policy.**" — flat, unhedged, unsourced, in a malformed paragraph (see Other issues).
2. [1195] "It is, **in the view of most independent analysts, the most successful sustained primary care transformation initiative in American health policy.**" — same claim, hedged, "initiative" not "program".
3. [1191] "because Vermont has been running the Blueprint for Health — **the most sophisticated all-payer primary care transformation program in the country** — for nearly two decades."
4. [1186] "it is **one of the longest-running primary care transformation programs in the country**."
5. [1201] "Vermont's Blueprint is **one of the most extensively studied primary care transformation programs in the country.**"
6. [1282] "The Blueprint for Health is **Vermont's most successful population health program and its most underfunded one.**"
7. [1191] "the Blueprint … **embedded in primary care practices across all 14 Hospital Service Areas**" (not a superlative but the completeness claim that Figure 8.6's "Universal Blueprint PCMH coverage, 2025–2028" commitment implicitly denies).

**CoCM (four restatements of the same two superlatives):**
8. [1219] "**90+ RCTs and the only integrated care model with dedicated Medicare billing codes** (CPT 99492, 99493, 99494)."
9. [1225] "CoCM is **the only integrated behavioral health model with designated Medicare billing codes and a 90+ randomized controlled trial evidence base.**"
10. [1231] "it is **the clinical standard of practice** for behavioral health integration in primary care — not just a promising approach, but **the only integrated care model with a clear evidence base across 90+ randomized controlled trials, and the only model with dedicated Medicare billing codes.**"
11. [1288] glossary "**The** integrated behavioral health care model **with the strongest evidence base — 90+ RCTs** … **The only integrated care model with designated Medicare billing codes.**"
12. [1281] "The Collaborative Care Model … is **the clinical intervention with the highest evidence base** for the population health challenges that drive Vermont's cost trajectory."

**Evidence-strength claims:**
13. [1202] "**The most rigorous evaluation** — a six-year longitudinal study…"
14. [1249] "one of **the best-established relationships** in health services research"
15. [1282] "**the strongest evidence available** that primary care investment produces system savings"
16. [1283] "**the best available evidence** that primary care investment produces system-level returns in a rural setting"
17. [1283] "Those updated results will be **the primary evidence base** for primary care investment policy in rural markets nationally."

**Other rankings/superlatives:**
18. [1202] "precisely the kinds of avoidable utilization that Oliver Wyman identified as **the largest source of indirect savings** from Vermont's transformation."
19. [1190] "care coordination … for Vermont's rapidly growing elderly population, **with the highest-cost, most complex needs**"
20. [1246] "Vermont's **highest-cost, highest-complexity** patients"
21. [1263] "The aging population drives demand for **the most expensive and most complex services**"
22. [1265] "PACE is **one of the most effective and cost-efficient models** for managing the population segment that drives **the highest healthcare costs in any state system.**"
23. [1238] "a Hub and Spoke model that has been **nationally recognized as a model for rural SUD treatment**"
24. [1239] "the transition from crisis to community care remains **the most operationally challenging step** in the SUD care continuum"
25. [1208] "would undermine **one of Vermont's most effective clinical programs**"
26. [1220] "Vermont's behavioral health system is failing patients **at the point of highest acuity**"
27. [1282] "is **among the highest-ROI appropriations** Vermont can make before FY2028"
28. Heading 8.3 "The Behavioral Health Crisis — **Vermont's Most Urgent Clinical Challenge**"
29. [1260] "This infrastructure is **a competitive advantage** for Vermont's transformation"

Cross-chapter flags for whoever runs the next chapter: #24 and #28 are both
"most X challenge" claims inside one chapter (different scopes, so arguably fine — but
CLAUDE.md's "two different dependencies both called the most underestimated" defect is
exactly this shape, so check #28 against Ch10's equity framing and Ch11's operations
framing). #6's "most underfunded" is asserted with no funding figure anywhere in the
chapter. #18 should be checked against Ch7's Oliver Wyman savings decomposition.

## Other issues

**Malformed paragraph [1187].** "The Vermont Blueprint for Health is the most successful
sustained primary care transformation program in American health policy. Vermont's
behavioral health data: 245.5 ED visits per 10,000 for suicide ideation and self-harm."
Two unrelated sentences in one paragraph, the second a bare fragment. This reads like the
residue of a stat-card block that was flattened into body text — and it front-loads, in
unhedged form, the superlative that [1195] states properly eight paragraphs later, and
the 245.5 figure that §8.3 introduces properly. Strong candidate for deletion outright:
nothing downstream depends on it and both of its claims are made better elsewhere.

**Stat blocks [1215]–[1219] are loose paragraphs, not a table.** "Vermont Behavioral
Health Crisis — The Data" followed by four bare data paragraphs, unlike §8.2's equivalent
which is a real 1×4 table at [1193]. Worth a render check before deciding whether this is
intentional; it is a formatting question, so `check_format.py` and a real render govern,
not this audit.

**Genuine repetition (fix):**
- CoCM's "only model with Medicare billing codes / 90+ RCTs" appears four times ([1219], [1225], [1231], [1288]). [1219] as a stat card and [1288] as a glossary entry are legitimate recurrence. **[1225] and [1231] are not** — [1231] opens §8.3.2 by restating, at greater length, the exact two facts [1225] stated one page earlier, and then says "Understanding CoCM's structure is important," which Figure 8.3 immediately delivers. [1231]'s first sentence should compress to the section's actual new content (that CoCM is the *standard of practice*, not merely evidenced) and drop the re-derivation.
- The 76%/68% follow-up pair appears in [1217], [1220]/[1229], [1239] and Figure 8.5. Figure 8.5 summarising its own prose is legitimate; [1229]'s "The 30-day follow-up rate of 76% … indicates that crisis presentations are not consistently connected to ongoing care" and [1239]'s "68% … indicates that the care coordination infrastructure between crisis and community-based SUD treatment is not fully functional" are the *same sentence twice* with the payer swapped. One of the two should be cut or merged.
- The 5.8:1 ROI is restated in all four "Implications for You" bullets ([1280], [1282], [1283]). Three of the four audiences are told the same number. Defensible in a role-segmented section, but [1280]'s "is not a projection; it is a documented result" and [1282]'s "documented from Vermont's own experience" are the same rhetorical move back to back.
- "Highest-cost, most complex" phrasing recurs at [1190], [1246], [1263] (log entries #19–21 above).

**Thin / unsupported cross-reference — §8.5.1 [1258].** "The HEDIS improvement
methodology — five-step framework from performance baseline through root cause analysis
to sustainable systems design — applies directly to Vermont primary care practices." The
five-step framework is never enumerated in Chapter 8, and the sentence points nowhere:
no chapter cross-reference, no figure, no platform link. Either the five steps belong
here, or this needs "(see Chapter N)" pointing at wherever the methodology is actually
laid out. As written, a reader is told a framework applies without being shown it — the
promise-not-delivered class of defect, in prose form.

**Thin sections.** §8.6 opens with a single paragraph [1263] before its first subsection.
§8.6.2 (Dementia) is two paragraphs with no figure, table, or platform link, while every
other second-level topic in the chapter gets one — and it carries the chapter's only
national-scale projection ([1269] "Dementia affects an estimated 14 million Americans
nationally by 2060," whose tense is garbled: a condition does not "affect … by 2060").
§8.7 is one lead-in paragraph plus Figure 8.6.

**Numbers that appear exactly once and should be verified externally before they ship**
(none contradict anything in-chapter, so they are flagged, not fixed): 59% of practices
accepting new Medicaid patients [1255]; readmission 14.8% [1255]; "admin cost 91% above
benchmark" [1255] — note this reuses the digits of the chapter's other headline 91%
(primary care provider rate) in the same table, which invites a misreading and is worth
double-checking it is not a transcription slip; NEK uninsured 6–8% vs 3% statewide
[1255]; 65+ growing 57% by 2040 and exceeding 30% of population [1263]; six Designated
Hospitals with inpatient psychiatric units [1229]; "no Vermont resident more than 30
minutes from a PCMH practice" [1273].

**Left deliberately.** Nothing was edited (read-only pass). The recurring-heading
requirements hold: "Work This Chapter on the Platform" [1275], "Implications for You"
[1279], "Key Concepts in This Chapter" [1284] are present with the canonical text, and
Sources [1294] is a plain paragraph, not a heading.
