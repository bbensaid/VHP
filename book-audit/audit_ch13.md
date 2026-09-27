# Chapter 13 Audit

**Scope:** Chapter 13 — "The Future of Healthcare Transformation — 2026, What Vermont Proves, and What Remains".
**Source of truth:** `HTR_Book_v42.docx` → `word/document.xml`, parsed with `zipfile` + `ElementTree`.
Chapter body = `w:body` children **1839 (Heading1 "Chapter 13:") through 1922** (exclusive of 1923, Heading1 "Chapter 14:").
84 block elements: 70 paragraphs, 6 tables (5 numbered figures + 1 STATES TO WATCH callout).
Read-only. **Nothing was edited.** Cross-checks against Appendix E (els 2263–2284), Chapter 1 (136–440), Chapter 3 (576–674), Chapter 5 (853–930), Chapter 6 (931–1085), Chapter 16 (2060–2178), and `frontend/app/`.

---

## Figures found (ground truth)

### Figure 13.1 — Vermont Five-Pillar Transformation Scorecard, April 2026 (§13.1)
Header: `Pillar | 2022 Baseline | 2026 Status | 2028 Target | Signal`. **Five data rows** (Policy, Technology, Economics, Clinical, Operations — no Equity row).

| Pillar | 2022 Baseline | 2026 Status | 2028 Target | Signal |
| :-- | :-- | :-- | :-- | :-- |
| Policy | Voluntary only; no price regulation; no federal agreement | Mandatory RBP (FY2027) and global budgets (FY2028) enacted; AHEAD signed Jan 2025; $195M RHT awarded | All hospitals under global budgets; AHEAD compliant; Statewide Strategic Plan delivered Dec 2028 | **ON TRACK** |
| Technology | VHCURES operational with 2-year lag; VITL partial; no analytics vendor; AI governance absent | Analytics vendor procurement underway; CIN in development; AI scribes deployed; FHIR upgrades in progress | Real-time VHCURES; analytics vendor fully deployed; CIN operational; AI-governance framework in place | **AT RISK** — analytics vendor gap vs. Jan 2028 AHEAD start |
| Economics | 9/14 hospitals in losses; UVMMC at 300%+ of Medicare; $700M–$2.4B 5-year deficit projection | RBP mandatory FY2027 enacted; global-budget methodology under design; deficit trajectory unchanged | All hospitals at or below RBP ceiling; cross-subsidy reduced 40%+; deficit trajectory reversed; break-even by FY2030 | **WATCH** — methodology design is the critical near-term decision |
| Clinical | Blueprint 90%+ PCMH; BH follow-up 76% (MH), 68% (SUD); 370-FTE workforce gap; zero CCBHCs | 5 CCBHCs planned; CoCM pilots underway; team-based care deploying; readmission at 14.8% (unchanged) | 100% PCMH; 7+ CCBHCs; readmission below 12%; workforce gap below 200 FTEs | **PROGRESSING** — CCBHC certification on track; workforce gap remains structural |
| Operations | RHRC not deployed; no PMO; no CIN; admin cost 91%+ above benchmark; no transformation reporting | RHRC engaged all 14 hospitals; PMO being established; CIN under development; two AHS transformation reports delivered | All 14 hospitals with approved transformation plans; PMO operational; CIN live; admin cost below 150% of benchmark | **PROGRESSING** — RHRC engagement is the right investment at the right time |

### Figure 13.2 — The 2025 federal healthcare policy inflection point (§13.2)
Header: `Measure | Figure | Detail`.
- Federal Medicaid spending reduction, H.R. 1 (10 yr) — **$911B** — CBO estimate; ~10 million more uninsured by 2034
- Rural Medicaid spending reduction (10 yr) — **$137B** — KFF estimate; Medicaid covers 1 in 4 rural adults
- Rural Health Transformation Program (5 yr) — **$50B** — $10B/yr FY2026–FY2030; temporary, front-loaded
- Rural hospitals operating at a loss — **>40%** — before Medicaid cuts; 52% in non-expansion states (Chartis, 2026)

### Unnumbered callout (§13.3.5) — "STATES TO WATCH"
Single-cell callout. Names Maryland (longest-running global-budget proof of concept, Ch6), Connecticut, Hawaii, Rhode Island, New York as "AHEAD's other **Cohort 1 and Cohort 2** states", plus Pennsylvania and "several Midwestern states".

### Figure 13.3 — Five-pillars forecast, 2026–2035 (§13.4)
Header: `Pillar | 2026 starting point | Primary headwinds | Primary tailwinds | 2035 assessment`. Five rows. Load-bearing cells:
- Policy: "Acts 167/68/AHEAD form the most complete state reform mandate in the country"; tailwind "**AHEAD expanding (6 states)**"; "Mandatory APM participation is the critical unresolved national question."
- Technology: "**analytics vendor procured**"; "Fastest-improving pillar nationally; FHIR operationally complete for major EHRs by ~2028."
- Economics: "VBC ~58% commercial"; "global budgets rare outside VT/MD"; "VBC ~70–75% commercial by 2030".
- Clinical: headwind "MHI sustainability uncertain without a durable funding source **after the AHEAD withdrawal**; primary-care shortage (**370-FTE gap by 2030** in VT)"; tailwind "Blueprint among strongest PCMH infrastructure in the country"; assessment "**Blueprint + AHEAD primary-care investment strongest in country**".
- Operations: "$195M RHT capital; all 14 hospitals engaged; GMCB capacity added under Act 68".

### Figure 13.4 — Vermont's transformation decisions and their national implications (§13.6)
Header: `Decision | Vermont timeline | If Vermont succeeds | If Vermont struggles`. Five decision rows: mandatory all-payer RBP (FY2027/FY2028 evidence); hospital global budgets (FY2028; **AHEAD data 2027–2030**); AHS Strategic Plan (Dec 2028 statutory deadline); RHT capital as structural transformation (FY2026–FY2030); Act 68 global budgets demonstrating savings (**AHEAD data from 2027; CMS evaluation through 2035**).

### Figure 13.5 — Platform tools for Chapter 13 (§13.7)
Header: `Do this | On this tool | What to look for`. Four rows: HTI Dashboard, Innovation Leaderboard, The Wire, HTR Simulator.
All four resolve: `frontend/app/hti-dashboard/`, `frontend/app/the-wire/`, `frontend/app/htr-simulator/`, and Innovation Leaderboard registered in `frontend/lib/taxonomy/tools.ts` (surfaced via `app/research-lab/ResearchLabHub.tsx`). No broken tool name.

---

## Claims checked against their own source (MATCH/MISMATCH + proposed fix)

### 1. MISMATCH — the chapter's opening list of "five forces" is not the five forces it develops
Opening paragraph: *"The five forces this chapter develops — federal Medicaid retrenchment, **the AHEAD Model's national rollout**, demographic aging, the fee-for-service plateau, and **political sustainability risk**…"*
§13.3's actual five headings: Force 1 Medicaid–RHT tension; Force 2 **AI clinical transformation**; Force 3 demographic reckoning; Force 4 **drug-pricing reckoning**; Force 5 VBC tipping point.
Two named forces (AHEAD rollout, political sustainability risk) are not forces in §13.3 — political sustainability is Chapter 14's subject — and two that are (AI, drug pricing) are missing.
**Fix:** rewrite the opener's list to "federal Medicaid retrenchment, AI clinical transformation outpacing governance, demographic aging, drug-pricing complexity, and the fee-for-service plateau."

### 2. MISMATCH — "Policy and Economics on track" contradicts Figure 13.1's own Signal column
§13.1 closing paragraph: *"the combination of **Policy and Economics on track** while Technology remains at risk."* Figure 13.1 gives Policy = ON TRACK but **Economics = WATCH**, not on track.
**Fix:** "the combination of Policy on track and Economics only on watch while Technology remains at risk" — or upgrade the Economics signal, which the rest of the row does not support.

### 3. MISMATCH — "six independent measures" describes a five-row table
Same paragraph: *"Reading this scorecard as a system rather than as **six** independent measures."* Figure 13.1 has five pillar rows and no Equity row. (Appendix E does have six sections — Equity is E.0.5 — which is probably where "six" came from.)
**Fix:** "five independent measures", or add the Equity row the caption already gestures at.

### 4. MISMATCH (cluster, highest priority) — Figure 13.1 and Figure 13.4 still treat Vermont as an AHEAD participant, which §13.3.5 of the same chapter contradicts
§13.3.5: *"now operating in five states … **after Vermont's 2026 withdrawal**"*, and Figure 13.3's Clinical headwind says "after the AHEAD withdrawal". The rest of the book is unambiguous and dates it: Ch1 el.318 "AHEAD Model State Agreement (January 2025; **withdrawn July 2026**)"; Ch6 §6.6 "Medicare's Entry That Vermont Signed, Then Withdrew"; glossary el.1081 "signed for **Cohort 2** in January 2025 but withdrew in July 2026"; Appendix E Economics row "Medicare: fee-for-service (**AHEAD withdrawn**)". Yet inside Chapter 13:
- Fig 13.1 Policy **2028 Target**: "AHEAD **compliant**".
- Fig 13.1 Technology **Signal**: "analytics vendor gap vs. **Jan 2028 AHEAD start**" — and §13.1 prose restates it as "Mandatory financial accountability (January 2028)". Vermont has no Jan 2028 AHEAD start.
- Fig 13.3 Clinical **tailwind and 2035 assessment**: "Blueprint + **AHEAD primary-care investment** strongest in country" — directly contradicting the headwind cell beside it.
- Fig 13.4 row 2: "AHEAD data **2027–2030**"; row 5: "**AHEAD data from 2027**; CMS evaluation through 2035" — offered as the evidence base for Vermont's Act 68 global budgets.
- §13.5.1 (2031–2035): "AHEAD expands **using Vermont's documented results**".
- §13.8: "whether the analytics capability is operational before **AHEAD financial accountability** begins".
**Fix:** re-base every Vermont-AHEAD dependency on Act 68 state authority. Policy 2028 target → "All hospitals under Act 68 global budgets; Statewide Strategic Plan delivered Dec 2028". Technology signal → "analytics vendor gap vs. FY2028 global-budget start". Fig 13.4 rows 2 and 5 → "GMCB global-budget data from FY2028" (Medicare AHEAD data will come from the five remaining states, not Vermont). Clinical tailwind → "Blueprint PCMH infrastructure" without the AHEAD clause. §13.8 → "before FY2028 global-budget financial accountability begins".

### 5. MISMATCH — "AHEAD expanding (6 states)" vs "five states"
Fig 13.3 Policy tailwind says **6 states**; §13.3.5 prose, Ch3 el.591 ("Five-state voluntary total cost of care model") and the glossary all say **five** (MD, CT, HI, RI, NY). Six is only reachable by counting Vermont, which withdrew.
**Fix:** "AHEAD operating in 5 states".

### 6. MISMATCH — cohort labels conflict between prose and callout, one paragraph apart
§13.3.5 prose: "**Connecticut, Hawaii, Rhode Island, and New York's Cohort 2 and 3** participation". The STATES TO WATCH callout immediately after: the same four are "AHEAD's other **Cohort 1 and Cohort 2** states". The book's own glossary puts Vermont in Cohort 2 and Maryland in Cohort 1.
**Fix:** pick one. Per the book's data: Maryland Cohort 1; CT/HI/RI Cohort 1–2; NY Cohort 3. Simplest correct phrasing in both places: "AHEAD's other participating states".

### 7. MISMATCH — "analytics vendor procured" (Fig 13.3) vs "procurement underway" (Fig 13.1 and Appendix E)
Fig 13.1 2026 status: "Analytics vendor **procurement underway**". Appendix E Technology (el.2269): "analytics-vendor **procurement underway**". Fig 13.3 Technology 2026 starting point: "analytics vendor **procured**". Fig 13.3 Operations headwind, in the same table, says "analytics vendor **not yet operational**".
**Fix:** Fig 13.3 → "analytics vendor procurement underway". The AT RISK Technology signal depends on this cell not being "procured".

### 8. MISMATCH — 370-FTE gap presented as a 2022 baseline
Fig 13.1 Clinical 2022 Baseline: "370-FTE workforce gap". Appendix E (el.2275): "370-FTE gap **projected by 2030**". Fig 13.3, correctly: "370-FTE gap **by 2030** in VT".
**Fix:** Fig 13.1 baseline → "370-FTE primary-care gap projected by 2030". Note the 2028 target "workforce gap below 200 FTEs" is then a target against a 2030 projection — worth one clause of explanation, as Appendix E's "FTE gap <200 via team-based care and telehealth" also leaves ambiguous.

### 9. MISMATCH — "readmission at 14.8% (unchanged)" has no baseline referent in its own table
Fig 13.1 Clinical 2026 Status says readmission is "14.8% (unchanged)", but the 2022 Baseline cell lists PCMH, BH follow-up, workforce and CCBHCs — no readmission figure. Appendix E supplies it (baseline 14.8%, 2026 "14.8% (**minimal change**)").
**Fix:** add "readmission 14.8%" to the baseline cell, and align "unchanged" → "minimal change" with Appendix E.

### 10. MISMATCH — Economics 2026 status is stale against Appendix E, which the chapter cites as its detail source
§13.1 says "The full scorecard with metric-level detail appears in Appendix E." Appendix E Economics 2026 status: "**6 of 14 in losses (FY2024, GMCB)**" — an improvement from the 9-of-14 baseline. Fig 13.1's Economics 2026 cell reports no margin figure at all and says "deficit trajectory unchanged", which is true of the five-year deficit projection metric only. A reader comparing the two will see the chapter omitting progress its own appendix documents.
**Fix:** Economics 2026 status → "RBP mandatory FY2027 enacted; global-budget methodology under design; 6 of 14 hospitals in losses (FY2024, improved from 9); five-year deficit trajectory unchanged."

### 11. MISMATCH — 9-of-14 losses is FY2023 data, labelled 2022 baseline
Appendix E: "9 of 14 reporting losses (**FY2023**); worst −8.9%". Fig 13.1 puts it in the "2022 Baseline" column.
**Fix:** "9/14 hospitals in losses (FY2023)" — the column is a pre-Act-167 baseline, so naming the year inside the cell resolves it.

### 12. MISMATCH — admin-cost target date
Fig 13.1 Operations **2028 Target**: "admin cost below 150% of benchmark". Appendix E Operations (el.2281) 2028 target: "System average below 150% of benchmark **by 2030**". (Appendix E's Economics table gives the same 150% as a 2028 target, so the appendix is itself inconsistent — but Chapter 13 has picked the more aggressive reading without saying so.)
**Fix:** state one date. Recommend "admin cost on track to below 150% of benchmark by 2030" in Fig 13.1, and fix Appendix E's two rows to agree (out of scope here — flagged, not touched).

### 13. Unit trap, not strictly a mismatch — "91%+ above benchmark" vs "below 150% of benchmark"
Fig 13.1 Operations states the baseline as a *percentage above* benchmark (91% above = 191% of benchmark) and the target as a *percentage of* benchmark (150%). Both match Appendix E, and the arithmetic works, but the switch of denominator inside one row reads as a target *worse* than the baseline on a fast read.
**Fix:** express both the same way — baseline "admin cost 191% of benchmark", target "below 150% of benchmark".

### 14. MISMATCH — CIN AI-governance framework attributed to Chapter 1
§13.3.2: *"The CIN-based AI governance framework **developed in Chapter 1**…"* Chapter 1 mentions AI governance only in a list of Technology-pillar staffing needs (el.298). The framework is developed in **Chapter 5** — "The Technology Pillar in Practice — FHIR, AI Governance, and Clinical Decision Support", el.884–885: training-data representativeness, and "a shared AI governance function within the CIN monitors all member hospital AI deployments".
**Fix:** "developed in Chapter 5".

### 15. MATCH — cross-references other than #14
"the AHS Restructuring chapter (**Chapter 16**)" ✓ (el.2060, "The AHS Restructuring Roadmap"). "Maryland's all-payer model … (**Chapter 6**)" ✓ (el.931, global budgets and §6.6). "Appendix E" for the full scorecard ✓ (el.2263, same April 2026 as-of date, el.2283).

### 16. MATCH — RHT arithmetic and the $195M figure
$50B over 5 years = $10B/yr FY2026–FY2030 ✓ internally consistent between Fig 13.2 and §13.2 prose. $195M first-year award appears five times in the chapter (§13.2, §13.2 response, Fig 13.1, Fig 13.3 Operations, §13.10) with no drift, and matches Ch1 el.232, Appendix E el.2266 and Appendix G el.2322.

### 17. MATCH — demographic arithmetic
"exceeding 30% of the state by 2040 … Vermont is **fourteen years** from that milestone" as of 2026 ✓.

### 18. MISMATCH (soft, same paragraph) — "by 2035" vs "national within fifteen years"
§13.3.3: "By **2035**, the challenge Vermont faces today will be present in every Northeastern state … most Midwestern states, and increasingly nationally," then two sentences later, the same work solves "a problem that will be national **within fifteen years**" — i.e. 2041. The paragraph gives the same event two horizons six years apart.
**Fix:** use 2035 in both, or "national within a decade".

### 19. Overstated — "The Baby Boom generation, fully in Medicare by 2030, will be in its eighties by 2040"
"Fully in Medicare by 2030" is right (1964 cohort turns 65 in 2029). "In its eighties by 2040" is not: the 1964 cohort turns 76 in 2040, and only the 1946–1960 cohorts are 80+. The cost claim that follows doesn't need the overstatement.
**Fix:** "will be entering its eighties through the 2040s" or "its oldest members will be in their nineties and its median member in her late seventies by 2040".

### 20. MISMATCH (arithmetic) — hospital-count scenario exceeds the state's hospital count
§13.5.1 (2030): "the hospital sector stabilized at **10–12 sustainable facilities** with **2–4 REH or CACC conversions**". Upper bound = 16 against Vermont's 14 hospitals, a number the chapter itself uses six times ("all 14 hospitals").
**Fix:** "10–12 full-service hospitals with the remaining 2–4 converted to REH or CACC status" — which makes the bounds sum to 14 by construction.

### 21. MATCH — VBC penetration, GLP-1 and IRA figures internally consistent
"~58% of commercially insured Americans" in §13.3.5 ✓ Fig 13.3 Economics "VBC ~58% commercial". Semaglutide: selected for 2025 negotiation, negotiated prices effective 2027, ~$274 for a 30-day supply down from over $1,000 — internally consistent and consistent with Fig 13.3's "IRA GLP-1 negotiation (2027)". BALANCE Model dated December 2025 in prose and "December 23, 2025" in Sources ✓.

### 22. Minor — "fifteen years of payment-reform effort" vs "since CMMI's founding"
§13.3.5 opens with "fifteen years of payment-reform effort" and then dates the comparison to CMMI's founding, which was 2010 — sixteen years before this chapter's 2026. Harmless but easily made exact: "sixteen years".

### 23. Unverifiable offline, internally consistent — Chartis figures
Fig 13.2 ">40% of rural hospitals operating at a loss; 52% in non-expansion states (Chartis, 2026)" and §13.3.1 "417 rural hospitals currently vulnerable to closure" both cite Chartis, *2026 State of Rural Health*, which is also in the chapter's Sources line (February 2026) and in the book's master source list (el.2492). No internal conflict; the 417 figure appears nowhere else in the manuscript, so there is nothing to contradict it. Flagged for external fact-check, not as a defect.

### 24. Unverified figure — "Medicaid covers roughly 19% of the state's insured population"
Appears only here in the whole manuscript. Appendix A's payer-mix material (el.2189, el.2213) discusses the commercial cross-subsidy and the 97% coverage rate but gives no Medicaid share to check it against. Not a contradiction; a single-sourced number with no corroboration in the book.
**Fix:** add the source to the Sources line, or cross-reference Appendix A once Appendix A carries the figure.

### 25. MISMATCH — the chapter's as-of date contradicts its own contents
The chapter opens "**Updated April 2026**"; Figure 13.1 is "April 2026"; but §13.3.1 carries an "**UPDATE — JUNE 2026**" box, and §13.3.5 reports a Vermont AHEAD withdrawal the rest of the book dates **July 2026**. A chapter dated April cannot report a July event.
**Fix:** move the chapter header to "Updated July 2026", keep Figure 13.1 and Appendix E explicitly dated "as of April 2026" with a one-line note that the AHEAD-dependent cells are superseded by the July 2026 withdrawal described in §13.3.5. This single change also resolves most of defect #4's reader-facing contradiction.

---

## Superlative/ranking claims logged for cross-chapter comparison

Verbatim, with location. Flagged `[COLLISION]` where the same superlative frame recurs inside this chapter.

**National-scale firsts / largests**
1. §13.2 — "Its healthcare provisions represent **the largest single reduction in federal health-program spending in American history**." (H.R. 1)
2. §13.2 — "**the largest healthcare-coverage contraction in American history**, partially offset by a historic but time-limited and front-loaded capital investment". [COLLISION with #1 — same subject, two different "largest in American history" frames one paragraph apart]
3. §13.3.5 — "the AHEAD Model … is **the most serious federal commitment to all-payer total-cost-of-care accountability since CMMI's founding**."
4. §13.3.5 — "**the most ambitious federal payment reform currently operating**." (AHEAD)

**Vermont / Maryland rankings**
5. Fig 13.3, Policy — "Acts 167/68/AHEAD form **the most complete state reform mandate in the country**."
6. Fig 13.3, Clinical tailwind — "Blueprint **among strongest PCMH infrastructure in the country**."
7. Fig 13.3, Clinical 2035 — "Blueprint + AHEAD primary-care investment **strongest in country**." [COLLISION with #6 — hedged "among strongest" and unhedged "strongest" in the same table row; #7 also depends on the withdrawn AHEAD investment, see defect #4]
8. §13.3.3 — "Vermont is **the national canary** for demographic healthcare stress."
9. §13.3.5 — "Maryland — **the model's longest-running and most-watched participant**."
10. STATES TO WATCH callout — "Maryland's all-payer model remains **the longest-running proof of concept for global budgets nationally**." [Consistent with #9; cross-check against Chapter 6's own Maryland superlatives]
11. §13.3.5 — "Vermont's experience as **its clearest warning so far**."

**"Most consequential / most dangerous / critical" — the collision-prone set**
12. §13.1 — "**The most dangerous pattern** is not a single pillar failing — it is the combination of Policy and Economics on track while Technology remains at risk." (see defect #2)
13. §13.1 — "The Technology signal is therefore **the most consequential number on this table**."
14. Fig 13.1, Technology — the only **AT RISK** signal; Fig 13.3 calls Technology "**Fastest-improving pillar nationally**". [Not strictly contradictory — AT RISK is Vermont-vs-target, fastest-improving is national — but the two labels sit two figures apart with no reconciling clause. Worth one.]
15. Fig 13.1, Economics — "methodology design is **the critical near-term decision**."
16. Fig 13.3, Policy — "Mandatory APM participation is **the critical unresolved national question**."
17. Fig 13.3, Clinical — "BH integration is **the critical clinical variable**."
18. §13.3.2 — "**Governance is the critical gap**."
19. §13.3.4 — "The GLP-1 agonist spending wave is **the most consequential near-term pharmaceutical challenge** for state systems." [COLLISION with #13 — two "most consequential" claims in one chapter; scopes differ (a scorecard cell vs. pharmaceutical policy) so both may stand, but they should not be phrased identically]
20. §13.3.3 — dual-eligibles are "**the highest-cost, most poorly coordinated challenge in the system**."
21. §13.3.3/§13.3.4 — the 80s frailty phase "drives **the highest costs and the most inadequate care models**."
22. §13.3.2 — "AI is moving … **faster than any governance framework can track**."
23. §13.3.4 — "**exactly where GLP-1 efficacy is best demonstrated**."
24. §13.10 — "it is **the most plausible outcome** given Vermont's specific combination".
25. §13.10 — "**The deepest bet** is about the relationship between analysis and action."
26. Fig 13.1, Operations — "RHRC engagement is **the right investment at the right time**." (evaluative, not ranked — logged because it is the only Signal cell that editorializes rather than assesses)
27. Fig 13.1 caption — "**Technology is the pillar where 2026 status most diverges from the 2028 target**." [Consistent with the table: Technology is the sole AT RISK row]

Items **5, 6, 7, 8, 9, 10** are the ones most likely to collide with Chapters 2, 6, 8 and 9, which make their own "strongest/first/only in the country" claims about Act 68, Maryland and the Blueprint. Items **1** and **2** should be reconciled to one claim before any cross-chapter pass.

---

## Other issues

### Internal contradictions (beyond the numbered mismatches above)
- **Fig 13.3 Clinical row contradicts itself cell-to-cell.** Headwind: "MHI sustainability uncertain … after the AHEAD withdrawal." Tailwind and 2035 assessment: AHEAD primary-care investment as an ongoing Vermont strength. One row, two states of the world.
- **Medicaid-cut onset dates drift across three timings.** §13.2: cuts "will pressure hospital finances beginning in **2026–2027**"; §13.3.1: "the Medicaid cuts taking effect **after 2027**"; §13.2 also puts work requirements in "**late 2026**". Fix to one phrasing — work requirements late 2026, revenue effects 2026–2027, the bulk of reductions back-loaded after FY2030 — which is what §13.2's KFF paragraph already says.
- **CCBHC counting.** Fig 13.1 2028 target "7+ CCBHCs"; Appendix E "7 certified". Trivially reconcilable, but the chapter's 2026 status is "5 CCBHCs **planned**" (i.e. zero certified) while the Signal reads "CCBHC certification **on track**" — the cell gives no certification milestone to be on track against.

### Genuine repetition
- **The RHT-is-temporary / Medicaid-cuts-are-back-loaded argument is made four times**: §13.2 ¶4 ("partially offset by a historic but time-limited and front-loaded capital investment"), §13.2 ¶6 (KFF, "temporary and front-loaded … nearly two-thirds back-loaded after FY2030"), §13.3.1 ¶1 ("permanent Medicaid revenue reductions arriving after the expiration of a temporary, one-time capital fund"), §13.3.1 ¶3 ("the post-2030 Medicaid cliff"). The §13.2 KFF paragraph is the strongest statement; §13.3.1 ¶1 restates it with no new content and could open on the state-by-state question instead.
- **The Samuelson framing appears twice.** Paraphrased in §13.2 ("the RHT funding is a tool for executing reform, not a substitute for reform — the analytical frame every state should adopt"), then quoted verbatim as a pull quote at the end of §13.5. Legitimate as pull-quote reinforcement only if the §13.2 paraphrase is trimmed; as written, the reader meets the same sentence twice.
- **§13.3.5 closes by restating itself.** "…Vermont's own withdrawal already stands as a cautionary data point on the reliability of the federal funding those states are counting on" then, next sentence, "…with Vermont's experience as its clearest warning so far." Two sentences, one point. Cut the second clause.
- **Legitimate recurrence, not duplication** (do not "fix"): "five forces" in the opener, §13.3 heading and §13.9 Key Concepts; the two-scenario framing in §13.5 and again in Fig 13.5's HTI Dashboard row and §13.8; the $195M figure at five points, each in a different register (award, capital, scorecard cell, forecast cell, closing bet). The STATES TO WATCH callout deliberately fulfils the opener's promise that the forecast "returns to" other states below — that pairing is working as designed.

### Thin sections / structural imbalance
- **Force 3 (§13.3.3, demographics) and Force 5 (§13.3.5's opening) are the thinnest.** Force 1 gets four paragraphs plus a dated update box; Force 3 gets two paragraphs resting on a single 2024 Oliver Wyman projection with no Vermont figure other than the 30%-by-2040 milestone — no dual-eligible count, no LTC bed gap, no PACE capacity number, though Appendix A (el.2189) has payer-mix material this section could cite.
- **§13.3.2 through §13.3.5 carry no figure.** Five of the chapter's six tables sit in §13.1, §13.2, §13.4, §13.6 and §13.7; the whole of §13.3 has one unnumbered callout. The Five Forces are the chapter's spine and are the least visually supported part of it.
- **§13.5's two scenarios are prose-only** and strictly parallel by year (FY2027 / FY2028 / 2028 / 2030 / 2031–2035). They are asking to be one two-column figure, which would also make the scenario divergence in §13.8's "small number of decisions" checkable at a glance.
- **§13.9 Key Concepts is a single undifferentiated run of seven terms** — consistent with the book's convention, noted only so it isn't mistaken for truncation.

### Recurring-heading check (CLAUDE.md style-critical set)
§13.7 "Work This Chapter on the Platform", §13.8 "Implications for You", §13.9 "Key Concepts in This Chapter" are all present with the canonical wording, and Sources is a plain paragraph, not a heading. ✓ No drift in this chapter.

### Priority order for a fix pass
1. Defect **#4** + **#25** (AHEAD-withdrawal staleness across Fig 13.1, Fig 13.3, Fig 13.4, §13.5.1, §13.8, and the chapter's as-of date) — this is one edit cluster and the only one that makes the chapter contradict itself in front of the reader.
2. Defect **#1** (the five forces named in the opener are not the five forces developed).
3. Defects **#2**, **#3**, **#5**, **#6**, **#7** — figure-vs-prose and figure-vs-figure mismatches, each a short string replacement.
4. Defects **#8**–**#13** — Fig 13.1 vs Appendix E reconciliation.
5. Defect **#14** (Chapter 1 → Chapter 5), **#18**, **#19**, **#20**, **#22** — single-clause corrections.
6. Repetition trims and the §13.5 scenario figure.
