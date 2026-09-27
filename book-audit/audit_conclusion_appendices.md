# Conclusion + Appendices Audit

Scope: `HTR_Book_v42.docx` → `word/document.xml`, from the **real** `Conclusion` Heading1
(byte offset 4,830,522 — not the TOC decoy) to end of document. Extracted order-preserving
via top-level `<w:tbl>` split + `<w:p>` in the gaps; text via `<w:t(?:\s[^>]*)?>`.
Sections covered: Conclusion, Appendices A–H, Figure Index, Bibliography, Index.
**Read-only — the .docx was not modified.**

Section IDs below in `[n]` refer to the extracted element order.

---

## Figures found (ground truth)

Numbered figures in range (9 tables carry figure captions; 8 more tables carry none):

| Figure | Caption | Backing table (ground truth, abbreviated) |
| :-- | :-- | :-- |
| A.1 | Vermont demographic transformation | 6 data rows: 65+ by 2040 **30%+** ("up from 21.7% in 2020 — a 57% increase"); working-age by 2040 **−13%** (~367,000 → ~318,000); total pop 2020–2040 **Flat, ~612,000–624,000**; insured 2025 **97%**; PCP shortage by 2030 **370 FTE** ("112 family medicine, 190 other primary-care specialties"); rental vacancy **3%** |
| A.2 | GMCB regulatory functions | 6 data rows. Budget review row: "FY25 approved **$3.7B (+4.1%** vs. 8% requested)". Enforcement row: "FY23: UVMMC **$80.3M**, RRMC **$11.1M**". RBP from FY2027. Global budgets FY2028–2030; analytics vendor **McKinsey, 2025–2026** |
| A.3 | Vermont's 14 hospitals | 14 data rows. UVMMC: admin **$3,826** vs **$1,427**, FY23 overage **$80.3M**. **Porter Hospital: "FY23 overage of $11M"**. RRMC: "FY23 overage **$11.1M** (partially enforced)". NVRH: "FY23 overage (not enforced)". Springfield: plan not approved as of Jan 2026. Grace Cottage: denials **$76K→$1,274** (FY25), FY24 **$4M** loss → ~**$1M** |
| A.4 | Initiative themes, Jan 2026 (148 initiatives) | 6 data rows: ~55 + ~20 + ~25 + ~20 + ~15 + ~13 |
| B.1 | Act 68 statutory timeline | 17 data rows, Jan 2026 → "every 3 years from 2028". Includes both "**January 1, 2028** — Act 68 hospital global budgets take effect (FY2028) … Nine-year model; Primary Care AHEAD and global budgets launch" **and** "**FY2028 (Oct 1, 2027)** — Global budgets for non-CAH (PPS) hospitals". RHT: "$195M award; spending window 2026–2032" |
| B.2 | Policy-pillar implementation matrix | 5 data rows. RHT row: "Vermont RHT: **$195M over 5 years**". State-employee direct contracting: "Year 1: $48M Vermont savings" |
| E.1 | Policy-pillar scorecard | 5 rows. RHT: "$195M awarded **for FY2026, first year**". Federal-state alignment 2028 target: "**Full AHEAD compliance; second agreement negotiated**" |
| E.2 | Technology-pillar scorecard | 5 rows |
| E.3 | Economics-pillar scorecard | 5 rows. Margins: 2022 **9 of 14** in losses (FY2023, worst −8.9%) → 2026 **6 of 14** (FY2024). CAH $938 vs $2,784. UVMMC admin $3,826 = "267% of $1,427". VBC row 2028 target: "Medicare: fee-for-service (**AHEAD withdrawn**)" |
| E.4 | Clinical-pillar scorecard | 6 rows. CCBHC 0 → 5 planned → 7. 370-FTE gap. Readmissions 14.8% |
| E.5 | Equity Imperative scorecard | 6 rows. BIPOC access 79–81%, 11–12 pt gap. Essex uninsurance 8% |
| E.6 | Operations-pillar scorecard | 6 rows |
| **I.1** | "The HTR Lab Workbook maps each of the five pillars…" | **Appendix H caption, numbered I.1** — no table; caption orphaned after the CAPSTONE callout |

**Unnumbered tables in range** (no figure caption, so absent from the Figure Index):
Appendix C's 14-hospital COE table `[99]`; Appendix F's F.3 pillar/chapter table `[156]`;
Appendix G's G.1 glossary (15 terms) `[176]` and G.2 worksheet `[179]`; the two single-cell
callouts "THE GAP" `[185]` and "WHAT THIS MEANS" `[194]`; the "CAPSTONE" callout `[217]`.

Figure Index `[331]–[343]` reproduces exactly A.1–A.4, B.1–B.2, E.1–E.6, I.1 — i.e. it
faithfully mirrors the defect: **no C, D, F, G or H figure numbers exist**, and the one
Appendix H figure is indexed as `I.1`.

---

## Claims checked against their own source (MATCH/MISMATCH + proposed fix)

### The two pre-flagged Appendix A items

**1. FY25 $3.7B increase stated as both +3.5% and +4.1% — CONFIRMED MISMATCH.**
- `[59]` A.3 prose: "For FY25 it approved **$3.7 billion** in system-wide hospital spending — a **3.5% increase** after hospitals requested 8%".
- Figure A.2, budget-review row: "FY25 approved **$3.7B (+4.1%** vs. 8% requested)".
Same fiscal year, same dollar total, two growth rates, one paragraph apart. No third
occurrence anywhere else in the manuscript (grep for `3.7 billion`/`3.7B` returns only
these two). The prose figure (3.5%) is the one consistent with GMCB's FY2025 decision
summary; the table is the outlier.
*Proposed fix:* in Figure A.2 change `FY25 approved $3.7B (+4.1% vs. 8% requested)` →
`FY25 approved $3.7B (+3.5% vs. 8% requested)`.

**2. RRMC's $11.1M FY23 overage misattributed to Porter — CONFIRMED (high confidence).**
Every other mention in the whole manuscript pairs the FY23 enforcement actions as
**UVMMC $80.3M + RRMC $11.1M only**, and three of them call them "the **first such**
enforcement actions in Vermont's regulatory history" (Conclusion `[24]`, A.3 `[59]`,
Figure A.2 enforcement row, Figure A.3 UVMMC row, G.4.2 `[193]`). Figure A.3's Porter row
nonetheless reads "UVMHN system; **FY23 overage of $11M**" — the same number, rounded,
one row above RRMC's "FY23 overage $11.1M (partially enforced)". A Porter overage would
make the enforcement pair a trio and falsify the "first such actions" framing used five
times.
*Proposed fix:* Figure A.3, Porter row, Key challenges → `UVMHN system; subject to system
budget constraints` (matching the CVMC row, which shares Porter's grant and focus), i.e.
delete `FY23 overage of $11M`.
*Note, deliberately left for the author:* Figure A.3's NVRH row says "FY23 overage (not
enforced)", which is compatible with the "first **enforcement** actions" claim and is not
flagged.

### Other claims checked

**3. MISMATCH — Vermont's population: 647,000 vs. "~612,000–624,000 throughout".**
`[51]`: "Its **647,000 residents** live across 14 counties". Figure A.1: "Total population
2020–2040 | **Flat** | ~612,000–624,000 throughout — aging, not growing." 647,000 sits
outside the range the table says holds for the entire period including 2020 and 2025.
*Proposed fix:* set the prose to the table's basis — `Its roughly 648,000 residents`
is the 2024 Census estimate, so the table's band is the weaker number; either widen the
table to `~620,000–650,000` or state the prose figure as `~624,000 (2020 Census)`.
Author's call which source governs; the two cannot both stand.

**4. MISMATCH (arithmetic) — "a 57% increase in the elderly population."**
Figure A.1: 65+ share goes from **21.7% (2020)** to **30%+ (2040)** while total population
is **flat**. On a flat base that is a **≈38%** increase in the number of people 65+
(30.0/21.7 = 1.38), not 57%. 57% would require either a growing population or a 2040 share
near 34%.
*Proposed fix:* `— up from 21.7% in 2020, a roughly 38% increase in the elderly population`.

**5. MISMATCH (arithmetic, appears twice) — 370 FTE broken out as 112 + 190 = 302.**
Figure A.1: "Primary-care provider shortage by 2030 | **370 FTE** | 112 family medicine,
190 other primary-care specialties (RHT application)". 112 + 190 = **302**, leaving 68 FTE
unaccounted. Restated in A.7 `[84]`: "a 370-FTE primary-care shortfall by 2030 (112 family
medicine, 190 other)" — same arithmetic gap, so a fix must be applied in both places.
*Proposed fix:* either name the missing component (e.g. `112 family medicine, 190 other
primary-care specialties, 68 pediatrics/NP-PA`) or drop the parenthetical breakdown. Do
not silently change 370 — it is the RHT application's headline number and is used as the
baseline in Figure E.4 ("FTE gap <200").

**6. MATCH — 148 initiatives.** `[75]` "The 148 individual initiatives"; Figure A.4 rows
sum ~55+20+25+20+15+13 = **148**. Caption agrees. Clean.

**7. MATCH — individual-market premium.** `[81]` $456 (2018) → $948 (2024) = 107.9%,
stated as "a 108% increase". Clean.

**8. MATCH — UVMMC administrative cost ratio.** $3,826 / $1,427 = 268%, stated as "267%
of $1,427 benchmark" in Figure E.3. Within rounding; consistent across `[65]`, `[71]`,
Figure A.3, Figure E.3, Figure E.6.

**9. MISMATCH — "nine of fourteen hospitals reporting operating losses" presented as
current, contradicted by Figure E.3.** G.3 `[182]`: "Chapters 6 and 7 document where
Vermont's hospital system stands **today** — **nine of fourteen** hospitals reporting
operating losses, with Oliver Wyman's conservative scenario projecting thirteen of fourteen
in losses by 2028." Figure E.3 makes 9 of 14 the **2022 baseline (FY2023)** and 6 of 14 the
**2026 status (FY2024, GMCB)**.
*Proposed fix:* `— six of fourteen hospitals reporting operating losses in FY2024, down
from nine in FY2023, with Oliver Wyman's conservative scenario projecting thirteen of
fourteen in losses by 2028`.

**10. MISMATCH — the RHT $195M is described three incompatible ways.**
- Figure B.2: "Vermont RHT: **$195M over 5 years** for CIN and IT infrastructure"
- Figure E.1: "$195M awarded **for FY2026, first year**"
- G.3.1 `[184]`: "provided Vermont **$195M for its first year (2026)**, with amounts for
  2027–2030 not yet published"
- G.1 glossary `[176]`: "**$195M for its first year**, awarded annually through FY2030"
- "THE GAP" callout `[185]`: "The Rural Health Transformation Program's **$195 million per
  year**"
- Figure B.1: "**$195M award**; spending window 2026–2032" / "All RHT Program funds must be
  spent" by Oct 1, 2032
So: $195M total-over-5-years (B.2), $195M for year one with later years unpublished (G.3.1,
E.1, G.1), and $195M per year (the callout) all coexist — and B.1's 2026–2032 window
conflicts with G.1's "through FY2030".
*Proposed fix:* adopt the G.3.1 formulation as canonical ($195M for FY2026, the first of
five annual awards, amounts for 2027–2030 not yet published; spending window through
Oct 1 2032). Then: Figure B.2 → `$195M first-year award for CIN and IT infrastructure`;
"THE GAP" callout → `The Rural Health Transformation Program's $195 million first-year
award is the only funding source…`; G.1 glossary → `awarded annually through FY2030, with
funds spendable through FY2032`.

**11. MISMATCH — Figure B.1 gives two different effective dates for FY2028 global budgets,
inside the same table.** Row: "**January 1, 2028** | Act 68 hospital global budgets take
effect (FY2028)". Row: "**FY2028 (Oct 1, 2027)** | Global budgets for non-CAH (PPS)
hospitals". A reader cannot tell whether PPS global budgets start Oct 1 2027 or Jan 1 2028.
The FY2030 row is consistently "FY2030 (Oct 1, 2029)", so the table's own convention is
fiscal-year-start.
*Proposed fix:* make the Jan 1 2028 row `FY2028 (Oct 1, 2027)` and move the calendar-year
detail into its requirement text, or relabel the Jan 1 2028 row as the AHEAD performance
year specifically rather than "Act 68 hospital global budgets take effect".

**12. MISMATCH — Figure E.1 and Figure E.3 contradict each other on AHEAD, two pages
apart.** Figure E.1 (Policy), federal-state alignment, 2028 target: "**Full AHEAD
compliance; second agreement negotiated**". Figure E.3 (Economics), VBC penetration, 2028
target: "Medicare: fee-for-service (**AHEAD withdrawn**)". Both are the same appendix's
2028 column. Figure E.1's own row also still asserts "AHEAD State Agreement signed Jan
2025; nine-year term" as the 2026 status with no withdrawal noted.
*Proposed fix:* Figure E.1, 2026 status → `AHEAD State Agreement signed Jan 2025; Vermont
withdrew July 2026`; 2028 target → `Successor federal-state agreement negotiated post-AHEAD`.

**13. MISMATCH — the Conclusion is dated April 2026 but reports a July 2026 event, and
then keeps reasoning as though AHEAD were live.** `[8]` "As of April 2026"; `[25]` "as of
April 2026"; `[46]` signature "— April 2026". Yet `[23]`: "The AHEAD EAST Fund **was** to
provide another $138 million annually … a renegotiation cut that to a cap near $10 million
**before Vermont withdrew from AHEAD in July 2026**." Downstream of that sentence the
Conclusion still treats AHEAD as the operative deadline: `[4]` "The AHEAD performance year
begins in January 2028 and the analytics vendor is not yet producing…"; `[14]` "The
'Managing Blind' failure mode…"; `[32]` "that build care management infrastructure **ahead
of AHEAD's performance year**"; `[33]` "before **AHEAD's financial accountability**
begins".
This is the single largest internal contradiction in the range: either the vantage point is
April 2026 (and the withdrawal cannot be known) or it is post-July 2026 (and four calls to
action are addressed to a model Vermont has left).
*Proposed fix:* move the vantage point to the later date (`As of late 2026`, signature
`— 2026`) and re-anchor `[32]` and `[33]` on Act 68's FY2028 global budgets rather than
AHEAD's performance year — Act 68's January 2028 date is independent of AHEAD and carries
the argument unchanged. `[4]`'s failure-scenario sentence should name the Act 68 global-
budget year, not the AHEAD performance year.
Also `[23]`'s sentence is ungrammatical as written ("a renegotiation cut that to a cap near
$10 million") — recommend `…another $138 million annually in Medicare performance funds for
a state that invests in population health; a renegotiation cut that to a cap near $10
million, and Vermont withdrew from AHEAD in July 2026.`

**14. MISMATCH — Appendix F's pillar→chapter map is wrong for all five pillars.** Figure-
less table `[156]` vs. the actual Heading1s in the file:

| F.3 says | Book actually has |
| :-- | :-- |
| Policy → Chapter 1 | Policy = Ch **2–3** (Ch 1 is the framework itself) |
| Economics → Chapters 8–9 | Economics = Ch **6–7**; Ch 8–9 are Clinical |
| Technology → Chapters 6–7 | Technology = Ch **4–5** |
| Clinical → Chapters 10–11 | Clinical = Ch **8–9**; Ch 10 = Equity, Ch 11 = Operations |
| Operations → Chapters 14–15 | Operations = Ch **11** (and 16); Ch 14–15 are Political Sustainability / Portfolio Management |

*Proposed fix:* Policy → Chapters 2–3; Technology → Chapters 4–5; Economics → Chapters 6–7;
Clinical → Chapters 8–9; Operations → Chapters 11, 16. (Equity/Chapter 10 has no row and
should probably get one, since Appendix E gives it a full scorecard as a sixth section.)

**15. MISMATCH — tool counts and tool names across Appendices D, F and H.**
- Appendix D `[102]`: "the **19** HTR Research Lab tools referenced throughout the book.
  **All are available to Strategist and Enterprise** subscribers" — then item E.19 (The
  Wire) says its newsletter is "**free weekly** for Observer-tier", contradicting "all".
- Appendix F `[160]`: "a suite of **nearly forty** interactive analytical tools", names
  **23**, and closes "Full tool specifications are in **Appendix D**" — false for the four
  it names that Appendix D omits (EMR/EHR Lab, Statewide EHR Deployment Modeler, CIN &
  Shared Services Modeler, EMS Transformation Modeler).
- Ground truth: `frontend/lib/taxonomy/tools.ts` contains **39** tool entries, so F's
  "nearly forty" is right and D's 19 is a subset. All four tools F names and D omits do
  exist in the registry.
- Appendix H names five tools that Appendix D does not list: **Global Budget Transition
  Modeler**, **Hospital Financial Stress Test**, **Risk Stratification Methodology**,
  **VBC Quality Measures**, **Transformation Scorecard**. All five exist in `tools.ts`.
- Three of Appendix D's names do not match the registry: D's "**Hospital Financial
  Scorecard**" (E.9) is the platform's "Hospital Financial Stress Test" (the name Appendix
  H uses); D's "**AI Analytics Lab**" (E.12) has no registry entry — the nearest is "AI
  Clinical Governance Lab"; D's "APM Shared Savings Calculator" (E.4) is "Shared Savings
  Calculator" and "VBC Transformation Readiness Assessment" (E.18) is "VBC Readiness
  Assessment".
*Proposed fix:* reword D's opening to "describes the **nineteen core** HTR Research Lab
tools the chapters draw on most; the full catalogue of thirty-nine is on the platform",
drop "All are available to Strategist and Enterprise" or qualify it, and align D's three
off-name tools to the registry labels. F's "Full tool specifications are in Appendix D"
should become "Specifications for the core tools are in Appendix D."

**16. MISMATCH — Appendix D numbers its items E.1–E.19 inside Appendix **D**.**
Every entry is labelled `E.n`. The cause is visible in the platform source:
`frontend/lib/taxonomy/tools.ts` header comment reads "The book's **Appendix E ('Tool
List')** is generated from this" — the tool list moved from E to D and the item numbering
was never renumbered. Appendix E is now the Transformation Scorecard, so `E.9` is ambiguous
between a tool and a scorecard figure.
*Proposed fix:* renumber to D.1–D.19 and update the `tools.ts` header comment to say
Appendix D.

**17. MISMATCH — Appendix G cross-references itself as "Section H.3", twice.**
`[193]`: "heading into the FY2027–2028 transition window described in **Section H.3**";
`[194]` (WHAT THIS MEANS callout): "the financing gap identified in **Section H.3**". The
transition-window section is **G.3** of this appendix; H.3 is the workbook's Stage 2.
*Proposed fix:* both → `Section G.3`.

**18. MISMATCH — G.3.1 cross-references "in this chapter" for an AHEAD discussion that is
not in this appendix.** `[184]`: "Vermont withdrew from AHEAD in July 2026, so this funding
will not arrive at all (see "**The AHEAD Model**" **in this chapter**)." Appendix G has no
"The AHEAD Model" section, and it is an appendix, not a chapter.
*Proposed fix:* point at the real location (the AHEAD treatment in Chapter 3, and the G.1
glossary's AHEAD Model entry) and change "chapter" to "appendix".

**19. MISMATCH — Appendix H labels two different sections "The Stage 5 question."**
`[213]` closes H.6 (The Equity Imperative) with "The **Stage 5** question: Does the design
penalize safety-net providers…"; `[216]` closes H.7 (Stage 5 — Operations) with "The
**Stage 5** question: Is operational capacity keeping pace…". H.6 is deliberately *not* a
numbered stage (it is the cross-cutting Equity Imperative, consistent with Appendix E
treating Equity as unnumbered), so the first label is the error.
*Proposed fix:* `[213]` → `The equity question:`.

**20. MISMATCH — Appendix H's figure is numbered I.1.** `[218]` "Figure **I.1** — The HTR
Lab Workbook maps each of the five pillars…" in Appendix **H**, and the Figure Index
reproduces it as I.1. There is no Appendix I.
*Proposed fix:* `Figure H.1`, in both the appendix and the Figure Index.

**21. MISMATCH — H.7's "$1,303 per discharge" administrative-cost gap is not derivable
from any figure in this range.** `[216]`: "The administrative-cost gap (Vermont's **$1,303
per discharge**) is the funding source for closing the workforce gap." The only
administrative-cost numbers in the appendices are UVMMC $3,826 vs. the $1,427 national
benchmark — a gap of **$2,399** — plus Figure E.6's "system avg 91% above [benchmark]",
which on $1,427 implies a system average of ~$2,726 and a gap of ~$1,299. So $1,303 is
almost certainly the *system-average* gap, but the sentence reads as a single unexplained
number with no cited source.
*Proposed fix:* `The administrative-cost gap (Vermont's system average runs ~91% above the
$1,427 national benchmark — roughly $1,300 per discharge) is the funding source…`.

**22. MISMATCH (factual, geography) — Mount Ascutney placed in White River Junction.**
Appendix C `[99]`: "**Mount Ascutney Hospital (White River Junction)**". Appendix A `[78]`
has Mt. Ascutney "subsidizing **Windsor's** only pharmacy … after the town's private
pharmacy closed in 2025" — i.e. Windsor is its town. Mt. Ascutney Hospital and Health
Center is in Windsor; White River Junction is where the VA medical center and DHMC-area
facilities sit.
*Proposed fix:* Appendix C → `Mount Ascutney Hospital (Windsor)`.
Also note Appendix C uses "**Mount** Ascutney Hospital" and "**Porter Medical Center**"
while Appendix A uses "**Mt.** Ascutney Hospital" and "**Porter Hospital**" — the same two
institutions under two names each, across two appendices.

**23. MATCH — Appendix C covers 14 hospitals** (14 data rows) and every hospital named in
Appendix A's Figure A.3 appears exactly once. Tier assignments are internally consistent
(4 Tier 1, 5 Tier 2 focused, 4 Tier 3, plus Porter at Tier 2 with COE count TBD).

**24. MATCH — GMCB creation date.** `[59]` "created in 2011"; `[82]` "since Act 48 created
the GMCB in 2011". Consistent.

**25. MATCH — Essex County / statewide uninsurance.** `[52]` "8% uninsurance against a 3%
statewide rate"; Figure A.1 "Residents with health insurance (2025) 97%"; Figure E.5
"Essex County uninsurance 8% (highest in Vermont)". All three agree.

---

## Superlative/ranking claims logged for cross-chapter comparison

Verbatim, with location. These are logged, not judged — several will need checking against
competing superlatives elsewhere in the manuscript.

**Conclusion**
1. `[17]` H.R. 1 + AHEAD + Act 68 pricing reform combined pressure "is **the biggest test**
   of whether Vermont's transformation architecture is robust enough to absorb shocks while
   remaining on its statutory timeline."
2. `[24]` GMCB's FY23 actions against UVMMC and RRMC were "**the first such enforcement
   actions in Vermont's regulatory history**." (Repeated verbatim-in-substance at A.3 `[59]`
   and G.4.2 `[193]`. Contradicted only by Figure A.3's Porter row — see MISMATCH 2.)
3. `[6]` the partial-transformation failure scenario "is **the modal outcome** of healthcare
   reform efforts in American history."
4. `[22]` "The political durability of mandatory reform — **always the central uncertainty**
   in healthcare policy — has held through two legislative cycles."
5. `[42]` the three decisions are "the three unresolved questions on which Vermont's
   transformation outcome **most directly depends**."

**Appendix A**
6. `[51]` "Vermont is **the second-smallest state by population**."
7. `[52]` Essex County "**among the most rural and least populated** counties in the
   Northeast Kingdom."
8. `[52]` UVMMC "with roughly 50% of the state's hospital market share, is the economic
   center of gravity — every reform affecting UVMMC affects the state economy in ways
   **no single hospital does in larger states**."
9. Figure A.1 "97% … **Among the highest coverage rates in the country**."
10. `[64]` the nine independents "are **these that face the most acute fragility**."
11. `[65]` CAHs are "**the smallest and most rural**, serving communities with **the fewest
    alternatives** — are **the most distressed** … also where service reductions would have
    **the most severe community consequences**, and where AHEAD's global-budget design must
    protect **most carefully**." (Four superlatives in one sentence.)
12. `[71]` UVMMC is "Vermont's **largest and most powerful** hospital."
13. `[78]` Grace Cottage's trajectory "is **the book's most important counterexample** to
    the narrative that Vermont's CAHs are uniformly failing."
14. `[78]` Mt. Ascutney's CHT data is "**the most concrete illustration** of demographic
    aging at the clinical level."
15. `[82]` "UVMMC's commercial prices averaged 358% of Medicare in RAND's published data —
    **the highest in the state**."
16. `[82]` "Act 68's RBP mandate is **the most consequential health-policy legislation
    Vermont has passed since Act 48** created the GMCB in 2011."
17. `[84]` "The primary-care shortage is **the most immediately actionable**"; "The housing
    constraint is **the most intractable**"; Vermont has "**the second-highest per-capita
    homelessness rate in the country**."
18. `[86]` Blueprint's 5.8:1 ROI is "**among the most robust ROI findings in the VBC
    literature**."
19. `[84]` "a triple constraint **no single intervention resolves**."

**Appendix C**
20. Grace Cottage: "19-bed, **Vermont's smallest**."
21. Gifford: "**Among most financially vulnerable** — comprehensive assessment needed."
22. North Country: "**Northeast Kingdom anchor**."

**Appendix E**
23. Figure E.3, 2022 baseline: "9 of 14 reporting losses (FY2023); **worst −8.9%**."
24. Figure E.5: "Essex County uninsurance 8% (**highest in Vermont**)."
25. `[147]` a 2028 scorecard with Policy/Economics at target but Technology/Operations at
    2026 status "would indicate financial accountability without management capability —
    precisely the sequencing failure Chapters 2 and 3 identify as **the most dangerous**."

**Appendix G**
26. G.1 glossary: Northeast Kingdom is "the state's **most severe** rural access and equity
    challenge."
27. `[184]` Medicaid "is, perversely, **the first** to move to a budget-based model, while
    commercial payers … are **the last**."
28. "THE GAP" callout `[185]`: RHT is "**the only funding source available** during this
    window."
29. `[187]` the FY2027–2028 transition-financing gap "is **the single most consequential
    open question** for any hospital CFO reading this book."
30. `[193]` UVMMC is "the system with **the most resources and the most to lose**" and
    "**the largest and most capable** potential challenger."

**Cross-chapter checks these will need** (flagged, not resolved here, since the mandate was
this range only): #1 "the biggest test" vs. #29 "the single most consequential open
question" vs. #16 "the most consequential health-policy legislation" vs. #25 "the most
dangerous" sequencing failure vs. #13 "the book's most important counterexample" — five
book-scoped superlatives about different subjects. None contradict each other *within* this
range (they qualify different nouns), but the manuscript-wide grep for competing "most
consequential / most dangerous / most underestimated" claims should include all five.

---

## Other issues

**Repetition (genuine, and mostly defensible)**
- The UVMMC $80.3M / RRMC $11.1M FY23 enforcement pair appears **five** times in this range
  alone (Conclusion `[24]`, A.3 `[59]`, Figure A.2 enforcement row, Figure A.3 UVMMC row,
  G.4.2 `[193]`). G.4.2's opening sentence is near-verbatim the Conclusion's. Appendix
  recurrence is legitimate (the appendices are reference documents and the A.2/A.3 rows are
  tabular restatements of A.3's prose), but **Conclusion `[24]` and G.4.2 `[193]` are the
  same argument told twice at the same length** — that pair is real duplication, not
  reference recurrence. Left for the author to cut, since G.4.2 is the section built around
  it and the Conclusion needs the proof point.
- UVMMC's $3,826 vs. $1,427 admin cost appears four times (`[65]`, `[71]`, Figure A.3,
  Figure E.3, plus Figure E.6 in ratio form). `[71]` is an entire paragraph restating `[65]`'s
  closing sentence with no new information — thin, and the clearest candidate for a cut.
- CAH $938 vs. $2,784 benchmark: `[65]` and Figure E.3. Legitimate (prose + scorecard).
- Mt. Ascutney's ~$600K/yr shared-C-suite savings appears three times in Appendix A alone
  (`[72]`, `[78]`, Figure A.3 row) plus Figure A.4's shared-purchasing row — four times in
  one appendix.
- The "370-FTE gap by 2030 (112 family medicine, 190 other)" appears in Figure A.1, `[84]`
  and Figure E.4. Legitimate recurrence, but note the arithmetic defect (MISMATCH 5) must
  be fixed in all three.
- "Managing blind" as the OneCare failure mode: Conclusion `[14]` and Appendix H `[204]`.
  Legitimate — H is the practicum reproducing the claim.

**Thin sections**
- `[71]` A.4.2's first paragraph: one sentence, entirely a restatement of `[65]`.
- Appendix C has **no figure caption and no numbered figure** despite being a full
  14-row table, and its source note `[100]` repeats the second half of its own intro `[98]`
  verbatim ("COE designations are proposed; final designations subject to the AHS and
  hospital transformation planning process").
- Appendix F carries **no figure numbers at all** for its F.3 table, and Appendix G none for
  its 15-term glossary or its worksheet — four substantial tables invisible to the Figure
  Index.
- Appendix H's `[218]` figure caption has no figure: it describes a mapping the appendix
  delivers as prose stages, not as a table. Either build the table the caption promises or
  drop the caption.

**Internal contradictions (summarized — details above)**
1. +3.5% vs +4.1% on the same FY25 $3.7B (MISMATCH 1) — the pre-flagged item, confirmed.
2. Porter carrying RRMC's $11.1M overage, which falsifies the five-times-repeated "first
   such enforcement actions" claim (MISMATCH 2) — the pre-flagged item, confirmed.
3. 647,000 residents vs. "~612,000–624,000 throughout" (MISMATCH 3).
4. April 2026 vantage point vs. the July 2026 AHEAD withdrawal, with four subsequent
   AHEAD-dependent calls to action (MISMATCH 13) — the most consequential one.
5. Figure E.1 "Full AHEAD compliance" vs. Figure E.3 "AHEAD withdrawn", same appendix
   (MISMATCH 12).
6. Figure B.1's two effective dates for FY2028 global budgets (MISMATCH 11).
7. $195M as five-year total vs. first-year award vs. per-year (MISMATCH 10).
8. 9 of 14 vs. 6 of 14 hospitals in losses (MISMATCH 9).
9. 19 vs. 23 vs. "nearly forty" tools; three Appendix D tool names not matching the
   platform registry (MISMATCH 15).
10. Appendix D numbered E.1–E.19; Appendix H's figure numbered I.1 (MISMATCH 16, 20).
11. "Section H.3" for G.3, twice; "in this chapter" for a section that is not in the
    appendix (MISMATCH 17, 18).
12. "The Stage 5 question" used for both H.6 and H.7 (MISMATCH 19).
13. Mount Ascutney in White River Junction vs. Windsor; Mt./Mount and Porter
    Hospital/Porter Medical Center naming split across appendices (MISMATCH 22).
14. Appendix F's pillar→chapter map wrong on all five rows (MISMATCH 14).

**Checked and clean**
- 148 initiatives sum exactly; premium 108% increase correct; $3,826/$1,427 = 267% correct;
  Appendix C covers all 14 hospitals once each with internally consistent tiers; GMCB 2011
  consistent; 8%/3%/97% insurance figures mutually consistent; Act 68 dates (RBP FY2027,
  global budgets FY2028 non-CAH → FY2030 all, Strategic Plan Dec 2028) consistent across
  Figure B.1, G.1's Act 68 entry, G.2's worksheet, Figure E.1 and the Conclusion;
  Figure Index faithfully reproduces every numbered figure caption in range, verbatim.
- CCBHC counts (0 baseline → 5 certified July 2026 → 7 by 2028) consistent between
  Figure B.1 and Figure E.4.
- The AHEAD EAST Fund's "$138 million annually" is consistent between Conclusion `[23]` and
  G.3.1 `[184]`.

**Not checked (out of scope as instructed)**
Route resolution and delivered-promise verification for the 20+ platform URLs in Appendix H
and the tool/section names in Appendix F. Two things surfaced incidentally and are worth a
separate pass: Appendix D's "AI Analytics Lab" has no registry match, and Appendix F's
reader-profile paragraphs name several surfaces ("HTR Simulator (five-pillar readiness
score)", "Medicaid Eligibility Simulator", "Bed Capacity & Transfer dashboard (System
Vitals)", "50-State RHTP Dashboard", "All States Explorer") whose delivery was not verified
here.
