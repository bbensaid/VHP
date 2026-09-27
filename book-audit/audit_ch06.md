# Chapter 6 Audit

**Scope:** Chapter 6 (The Economics Pillar — Global Budgets, Reference-Based Pricing, and
Financial Reform), body of `HTR_Book_v42.docx`, `word/document.xml` block indices 931–1085
(heading "Chapter 6:" through heading "Chapter 7:"). Read directly from the OOXML via
`zipfile` + ElementTree, cells extracted per `w:tr`/`w:tc` — not the `.md` mirror.

**Read-only audit. No edit was made to the .docx.** Every "proposed fix" below is a
recommendation, not an applied change.

Chapter contains 12 numbered figures (6.1–6.12) across 14 tables (Fig 6.1 is rendered as two
tables: a stat strip plus a data grid), 11 Heading2 sections, 225 non-empty blocks.

---

## Figures found (ground truth)

### Figure 6.1 — Vermont hospital commercial pricing vs. Medicare and break-even benchmarks
*Sources: GMCB Act 68 RBP Update (February 2026); RAND Hospital Price Transparency Study.*

Stat strip (4 cells): `358% UVMMC Commercial vs. Medicare (RAND)` · `250-300% Average VT
Commercial Rate` · `~136% Approx. Break-Even Point` · `$400M+ Projected 5-Year Savings`

Data grid (2×2):
| | |
|---|---|
| Average commercial-to-Medicare ratio, Vermont hospitals — 250–300% vs. ~136% break-even point | Outpatient imaging — worst case — 944% of Medicare rate at one Vermont hospital |
| UVMMC commercial prices — 358% of Medicare (RAND, 2018–2020 data) — the highest in Vermont | Potential savings at 200% Medicare (2018–2023) — $400M VEHI + VSEA combined, per GMCB analysis |

### Figure 6.2 — Vermont silver marketplace premium trajectory 2018–2024
*Sources: Oliver Wyman Act 167 Report; GMCB analysis.*
2018 $456 · 2019 $474 · 2020 $468 · 2021 $580 · 2022 $730 · 2023 $875 · 2024 $948

### Figure 6.3 — Cross-state reference-based pricing and rate regulation
*Sources: GMCB Act 68 Update (February 2026); Health Affairs; Commonwealth Fund; CMS.*
Header row + **5 data rows**: Oregon (2019) · Montana (2016) · Washington (2021) ·
Maryland (2014–present) · Vermont Act 68 (FY2027).
Key figures: Oregon 200% in-network / 185% out-of-network, ~300,000 lives, $107.5M in first
27 months, all 24 affected hospitals remained in-network. Montana $48M. Washington 160%.
Maryland $1.4B Medicare savings, 7% admission reduction, $800M spending reduction.
Vermont: "first negative commercial rate benchmark (-1%) **in effect FY26** as transition step";
"Initially commercial payers; **excludes Medicare/Medicaid**"; no numeric RBP multiplier stated.

### Figure 6.4 — Vermont RBP and global budget implementation phases
*Source: GMCB Act 68 Update, February 2026.*
Header row + **3 data rows**: Phase I — Differential Price Growth (FY26–FY27), "**FY27 guidance
recommends -1% commercial rate growth benchmark**" · Phase II — Rate Setting (RBP) (FY27–FY28),
final methodology March 2027 · Phase III — Global Budget Integration (FY28 and FY30), non-CAH
by FY28, all-hospital by FY30.

### Figure 6.5 — Five dimensions of global budget design
Header row + **5 data rows**: Scope · Population adjustment · Volume treatment · Quality
linkage · Flexibility mechanisms. Scope's Vermont direction: "**TBD through rulemaking.**"

### Figure 6.6 — Vermont global budget history: four attempts
Header row + **4 data rows**: GMCB Net Patient Revenue Cap (2012–present) · Rutland Regional
pilot (2014, never implemented) · Vermont All-Payer ACO Model (2017–2025, expired end 2025) ·
Act 167 / Act 68 Mandate (2022–present; non-CAH by FY2028, all by FY2030).

### Figure 6.7 — Maryland All-Payer Global Budget Model results
$1.4B Medicare hospital savings · 7% admission reduction, avoidable admissions down >6% ·
$800M spending reduction (Part A+B) · 3.58% all-payer per capita committed growth cap.

### Figure 6.8 — Oliver Wyman Vermont hospital financial projection scenarios
| Scenario | 5-year system deficit (2024–2028) |
|---|---|
| **Conservative** 3.5% rev / 5% expense | $700M vs. break-even; $1.4B vs. 3% margin; FY2023 budget overage $106M |
| **Realistic** 3.5% rev / 7–8% expense (labor +10%, physician +5%, other +7%, 340B +3%) | $2.4B vs. break-even ($3,700/resident); $3.1B vs. 3% margin ($4,800/resident); hospitals requested $285M in FY25 increases |

### Figure 6.9 — Financial metrics: FFS vs. global budget
8 paired rows, no numeric claims.

### Figure 6.10 — Estimated sources of savings (5-year total)
Close unsustainable inpatient facilities $100M+ · Admin costs & shared services $115M+ ·
**Shift procedures to ASUs/outpatient $130M+ (largest row)** · Expand primary care $90M+ ·
Address SDOH $80M+. **Row sum = $515M+.** Caption: "illustrative ranges derived from Oliver
Wyman's >$400M total estimate."

### Figure 6.11 — Three-phase APM transition model
Header + 3 rows: Preparation (Now through FY2026; "**-1% commercial rate benchmark**" listed as
already in the payment environment) · Transition (FY2027) · Operation (FY2028 and beyond;
"Statewide Strategic Plan delivered December 2028").

### Figure 6.12 — Hands-on platform tools for the Economics Pillar
2 rows citing `/research-lab/payment-models?tab=apm-design`,
`?tab=gb-transition`, `/research-lab/policy-quality?tab=scorecard`.
*(Route/promise delivery is criterion 5 and out of scope for this factual pass — not verified here.)*

---

## Claims checked against their own source (MATCH/MISMATCH + proposed fix)

### MISMATCH 1 — §6.1: "the other five" pillars (arithmetic self-contradiction) — HIGH
> "Of the five pillars in the five-pillar framework, the Economics pillar is the one that
> determines whether **the other five** actually produce results."

Five pillars minus Economics = four. Same class of error as the Chapter 1 find.
**Fix:** "…determines whether the other four actually produce results." (Also consider trimming
the redundant "Of the five pillars in the five-pillar framework" → "Of the five pillars".)

### MISMATCH 2 — §6.7.1 / Fig 6.8: the -1% benchmark is dated three different ways — HIGH
Three sources inside this chapter disagree on when the negative commercial rate benchmark applies:
- **Fig 6.3** (Vermont row): "first negative commercial rate benchmark (-1%) **in effect FY26**"
- **Fig 6.4** (Phase I) + §6.3.4 prose: "**FY27** guidance recommends -1%…"; "The Phase I action —
  the negative 1% commercial rate benchmark **for FY2027**"
- **Fig 6.11** (Preparation row): "**Now through FY2026** … -1% commercial rate benchmark" —
  i.e. already in force in FY26

**Fix:** pick one. Fig 6.4 and the §6.3.4 prose agree on FY27 guidance and are the more specific,
GMCB-sourced statement, so amend Fig 6.3's Vermont row to "first negative commercial rate
benchmark (-1%) in FY27 budget guidance" and move the -1% out of Fig 6.11's Preparation row
(FY26) into its Transition row, or relabel Preparation as "Now through FY2026, with the FY27
-1% benchmark already issued."

### MISMATCH 3 — §6.10 / Fig 6.3 + Fig 6.5: "Vermont's RBP target of 200% of Medicare" — HIGH
> "Vermont's RBP target of 200% of Medicare is the most specific **mandatory all-payer** price
> target enacted by any state."

Two defects against this chapter's own figures:
1. **No 200% Vermont target exists anywhere in the chapter.** Fig 6.3's Vermont row gives no
   multiplier ("maximum set by GMCB rule"); Fig 6.5's Scope row says "TBD through rulemaking";
   §6.3.1 and §6.3.4 say the final methodology is not released until March 2027 and will be
   *hospital-specific* (payer mix, labor costs, social risk). 200% is **Oregon's** number
   (Fig 6.3) and appears for Vermont only as a retrospective counterfactual ("Potential savings
   at 200% Medicare (2018–2023)" in Fig 6.1).
2. **"all-payer" contradicts Fig 6.3**, which states Act 68 RBP covers "Initially commercial
   payers; **excludes Medicare/Medicaid**."

**Fix:** "Vermont's mandatory commercial RBP ceiling — to be set by GMCB rule in March 2027,
with 200% of Medicare the benchmark most often modeled — is the most specific mandatory
statewide price ceiling enacted by any state."

### MISMATCH 4 — §6.5.4 vs §6.6 vs §6.11: EAST Fund causality is reversed — HIGH
- §6.5.4: "up to $138 million … starting in 2027 — later cut to a cap near $10 million **when
  Vermont withdrew from AHEAD** in July 2026" → the cut follows the withdrawal.
- §6.6: "a subsequent CMS renegotiation … cut that expectation to a cap of about $10 million.
  **That collapse left the State facing** … and in July 2026 Vermont formally notified CMS of
  its withdrawal." → the cut *caused* the withdrawal.
- §6.11 Key Concepts (EAST Fund): agrees with §6.6 — "A subsequent CMS renegotiation cut this
  expectation to a ~$10M cap, **and** Vermont withdrew."

Two of three say the cut caused the exit; §6.5.4 says the opposite.
**Fix (§6.5.4):** "…up to $138 million in additional Medicare funds annually starting in 2027 —
an expectation a later CMS renegotiation cut to a cap near $10 million, which is why Vermont
withdrew from AHEAD in July 2026."

### MISMATCH 5 — §6.6 vs §6.10: RHT Program is both "$195M per year for five years" and "first year only" — HIGH
- §6.6: "the **five-year, $195-million-per-year** Rural Health Transformation Program"
- §6.5.4: "The Rural Health Transformation Program award of **$195 million** provides capital…"
- §6.10 (legislator): "The Rural Health Transformation Program — **$195 million for its first
  year, with future-year amounts not yet published**"

§6.6 asserts as fact exactly what §6.10 says is unpublished.
**Fix:** adopt §6.10's cautious formulation everywhere: "the five-year Rural Health
Transformation Program, whose first-year Vermont award is $195 million."

### MISMATCH 6 — §6.10 + §6.8.1 + §6.11 still treat AHEAD as live after §6.6 says Vermont exited — HIGH
§6.6 and the §6.11 EAST Fund entry establish that Vermont withdrew in July 2026 and never
received EAST money. Three later/other passages contradict that:
- §6.10 (legislator): "…the population health improvement **AHEAD measures**. **If the EAST Fund
  is used** to cover operating deficits … The legislature **should set explicit expectations for
  EAST Fund use**." — advice about spending a fund the chapter says does not exist.
- Fig 6.11, Transition row: "Primary care investment: increase PC capacity **ahead of AHEAD's
  primary care investment requirements**."
- §6.11 Key Concepts, *All-payer alignment*: "Vermont's **AHEAD + Act 68 combination** is
  designed to achieve this by FY2028-2030."

**Fix:** re-point all three at Act 68 / RHT. Legislator paragraph → "the Rural Health
Transformation Program … If RHT funds are used to cover operating deficits…"; Fig 6.11 →
"ahead of the primary care capacity global budgets will require"; Key Concepts → "Vermont's
Act 68 mandate is designed to achieve this across commercial payers and Medicaid by FY2028-2030,
with Medicare alignment now unresolved after the AHEAD withdrawal."

### MISMATCH 7 — §6.2.3 vs Fig 6.8: the $700M–$2.4B range is attributed to one scenario — MEDIUM
> "under **the conservative scenario**, 13 of Vermont's 14 hospitals report operating losses by
> 2028, with a cumulative 5-year system deficit of **$700 million to $2.4 billion** depending on
> expense growth assumptions."

Fig 6.8: $700M is the conservative case, $2.4B the realistic case. A range "depending on expense
growth assumptions" spans *both* scenarios and cannot sit under "the conservative scenario."
**Fix:** "Oliver Wyman's projections show 13 of Vermont's 14 hospitals reporting operating losses
by 2028 even under the conservative scenario, with a cumulative 5-year system deficit of $700
million to $2.4 billion depending on expense growth assumptions."

### MISMATCH 8 — §6.3.2 vs Fig 6.3: "Three states" against a five-row table — MEDIUM
> "**Three states** have implemented meaningful price reference programs with documented results,
> providing the evidence base for Vermont's design choices."

Fig 6.3 carries **four** non-Vermont jurisdictions (Oregon, Montana, Washington, Maryland), and
the caption itself is "reference-based pricing **and rate regulation**." Maryland is arguably
rate-setting rather than RBP, but the reader counts rows.
**Fix:** "Three states have implemented meaningful price reference programs with documented
results, and a fourth — Maryland — regulates rates for all payers outright."

### MISMATCH 9 — §6.3.4 vs Fig 6.4: "two phases" against a three-phase table — MEDIUM
> "GMCB is implementing RBP in **two phases**…" immediately above Fig 6.4, which lists Phase I,
> Phase II and Phase III (and is captioned "RBP **and global budget** implementation phases").

**Fix:** "GMCB is implementing RBP in two phases, with a third that folds the resulting price
ceiling into global budgets."

### MISMATCH 10 — Fig 6.1 internal: two different $400Ms conflated — MEDIUM
The stat strip labels `$400M+` as "**Projected 5-Year Savings**". The same figure's data grid
defines its $400M as "**Potential savings at 200% Medicare (2018–2023)** — $400M VEHI + VSEA
combined, per GMCB analysis" — a *retrospective counterfactual* for two public employee plans.
§6.7.3's heading then reuses the number for a third thing: "Where Vermont's $400M+ Can Come
From," sourced to Oliver Wyman's *prospective* operational savings (Fig 6.10).
**Fix:** relabel the strip cell "$400M+ — Retrospective savings if capped at 200% of Medicare
(VEHI+VSEA, 2018–2023)", and keep §6.7.3's Oliver Wyman total visibly distinct
(e.g. ">$500M Oliver Wyman transformation savings").

### MISMATCH 11 — §6.7.3 heading/caption vs Fig 6.10 row sum — LOW
Fig 6.10's rows total **$515M+** ($100+$115+$130+$90+$80) while the heading says "$400M+" and
the caption says "derived from Oliver Wyman's >$400M total estimate." Technically consistent with
"more than $400M," but the decomposition overshoots its own stated total by ~29%, which invites
the arithmetic objection.
**Fix:** state the sum: "derived from Oliver Wyman's >$400M total estimate; the itemised ranges
here sum to roughly $515M at their low ends."

### MISMATCH 12 — §6.7.1: "again roughly 62%" — LOW
> "a $312M cumulative 5-year deficit … **more than 44%** of the total statewide deficit. Under
> the realistic scenario, this grows to $1.5B — **again roughly 62%** of the statewide total."

Both percentages check out against Fig 6.8 (312/700 = 44.6%; 1,500/2,400 = 62.5%) — the
arithmetic is fine. But "again" asserts the two shares are the same, and 44% ≠ 62%.
**Fix:** delete "again", or "— a still larger 62% of the statewide total."

### MISMATCH 13 — §6.2.2 vs §6.2.2 label / Fig 6.2 caption: premium series is named two ways — LOW
Prose: "**individual market** average monthly premium from $456 in 2018 to $948 in 2024."
Table lead-in and caption: "Vermont average monthly **silver marketplace** premium."
Individual-market average and silver-benchmark premium are different series.
**Fix:** use "silver marketplace" in the prose too, matching the figure.

### MISMATCH 14 — §6.7.3: "the third Oliver Wyman imperative" — LOW
Chapter 6 never enumerates the Oliver Wyman imperatives, so "the third" has no referent inside
the chapter. **Fix:** name it instead of numbering it ("reflects Oliver Wyman's imperative to
move all care possible out of hospitals"), or cite the chapter that does enumerate them.

### MISMATCH 15 — §6.10: "$1,303 per-discharge administrative gap" and "18 months away" — LOW/MEDIUM
Neither is supported inside the chapter. The $1,303 CAH-vs-national admin gap appears exactly
once, in no figure. "That model change is 18 months away" is a floating relative date that does
not match either of the chapter's own milestones (non-CAH global budgets FY2028; final RBP
methodology March 2027) and will rot.
**Fix:** cite the $1,303 figure to its source or drop it; replace "18 months away" with the
absolute milestone ("it changes when non-CAH global budgets take effect in FY2028").

### MISMATCH 16 — §6.8.2: "This gap must be closed before FY2027" — LOW
The attribution/TCOC analytics gap is described as preparation for *global budget participation*,
which the chapter dates to FY2028 (non-CAH) / FY2030 (all). FY2027 is the RBP date.
**Fix:** "before global budgets take effect in FY2028."

### Claims that MATCH their source (verified, no action)
- §6.2.2: "250–300% on average, with outliers reaching 944%", "~136% break-even", "358%" — all
  match Fig 6.1 both cells and strip.
- §6.2.2 premium math: $456 → $948 = **107.9%** increase over 2018–2024 (six years). "108% in six
  years" in both prose and Fig 6.2 caption. MATCH.
- §6.3.4: "$230.65 million in FY2026: $104.3M + $94.58M + $31.76M" sums to $230.64M — a $0.01M
  rounding artifact only. MATCH (no fix needed).
- §6.3.2: "all 24 affected hospitals remained in-network", "rates set at 200% of Medicare",
  "Oregon implemented RBP for a state employee plan" — all match Fig 6.3's Oregon row.
- §6.4.2 heading "Five Design Dimensions" ↔ Fig 6.5's exactly 5 data rows. MATCH.
- §6.4.3 heading "Four Attempts" ↔ Fig 6.6's exactly 4 data rows. MATCH.
- §6.5.1/§6.5.3 Maryland: $1.4B, 7%, >6% avoidable, $800M, 3.58% — Fig 6.3 Maryland row and
  Fig 6.7 agree with each other and with the prose. MATCH.
- §6.7.1: $2.4B ÷ $3,700/resident = 648,600 and $3.1B ÷ $4,800 = 645,800 — both consistent with
  Vermont's ~647k population, and with each other. MATCH.
- §6.7.3: "The largest single source … shifting procedures … to ambulatory surgical and
  outpatient settings" ↔ Fig 6.10's largest row ($130M+). MATCH. *(Minor caveat: Fig 6.10's
  column is "Direct **&** indirect savings" and does not separate the two, so the narrower claim
  "largest single source of **indirect** savings" cannot be checked against it.)*
- §6.6: "In January 2025 Vermont signed … **Eighteen months later** the State walked away" (July
  2026). MATCH.
- §6.11: AHEAD "operating in **five** states (Maryland, Connecticut, Hawaii, Rhode Island, and
  New York)" — list length matches the count. MATCH.
- Global budget dates are consistent in all four places they appear (§6.3.3, Fig 6.4 Phase III,
  Fig 6.6, Fig 6.11): non-CAH FY2028, all-hospital FY2030. MATCH.
- Fig 6.12's "Oliver Wyman's conservative-scenario assumptions (3.5% revenue growth, 5% expense
  growth)" ↔ Fig 6.8's conservative row. MATCH.
- "14 hospitals" consistent at §6.2.3, the BEYOND VERMONT box, and §6.3.1. MATCH.

---

## Superlative/ranking claims logged for cross-chapter comparison

Verbatim, with location. Flagged `⚠` where it may collide with a claim elsewhere in the book.

1. **Ch6 dek** — "Vermont's mandatory reference-based pricing and global hospital budgets
   represent **the most direct attempt by any American state** to break the fee-for-service
   incentive structure…" ⚠ collides with §6.5.1's "Maryland is **the only** U.S. state to have
   operated a mandatory all-payer hospital rate setting system with global budgets for more than
   a decade" — Maryland has done for twelve years what Vermont has legislated but not started.
2. **§6.1** — "Vermont's reform journey … is **the most complete real-world laboratory** for
   these economic questions currently operating in the United States." ⚠ same tension; "currently
   operating" is doing a lot of work when §6.5 says Vermont's global budgets begin FY2028.
3. **§6.1** — "the Economics pillar is **the one that determines whether the other [pillars]
   actually produce results**" / "Payment reform is **not one element** of healthcare
   transformation. It is **the precondition on which all other transformation depends**." ⚠ This
   is the highest-priority cross-chapter check: every pillar chapter is liable to nominate itself
   as the master variable. Compare against Ch2/Ch4's framing of Policy and Technology, and
   against the Ch1 dependency matrix and the Preface.
4. **§6.1 heading** — "Why Payment Reform Is **the Master Variable**."
5. **§6.2.2 / Fig 6.1** — "Vermont's price data … is **among the most extreme in the country**";
   "UVMMC commercial prices 358% of Medicare — **the highest in Vermont**."
6. **§6.2.3** — "This cross-subsidy is the financial foundation of **every** U.S. hospital that
   serves a mixed payer population — which is to say, **every hospital**."
7. **§6.2.2** — "highly concentrated hospital markets — which describe the majority of U.S.
   hospital markets, and **all of Vermont's**."
8. **§6.3.2** — "**The Oregon results are the most directly applicable** to Vermont's situation."
9. **§6.3.4** — "the negative 1% commercial rate growth benchmark — **first negative benchmark in
   Vermont history**"; and "**the largest single-year price reduction in Vermont hospital
   history**" ($230.65M, FY2026). ⚠ verify against Ch3/Ch7 if either cites a larger GMCB action.
10. **§6.5 / §6.5.1 / §6.5.2** — "Maryland is **the only U.S. state** with mandatory all-payer
    global budgets since 2014"; "**Vermont's closest comparable**"; "**the only** U.S. state to
    have operated [one] for more than a decade"; "**the closest available empirical evidence**";
    "a unique regulatory authority that **no other state possesses**." (Five uniqueness claims;
    see repetition note below.)
11. **§6.5.3** — dual-eligibles are "**the highest-cost, highest-complexity** population segment."
12. **§6.7** — UVM Health Network "**dominates** Vermont's hospital economics"; the UVM share is
    "**more than 44%**" / "roughly 62%" of the statewide deficit.
13. **§6.7.3** — "**The largest single source of indirect savings** — shifting procedures … to
    ambulatory surgical and outpatient settings."
14. **§6.7.3** — "Vermont currently has **only two** ambulatory surgical centers (both in
    Burlington)." ⚠ a hard, checkable, perishable count — verify against Ch11 (Operations).
15. **§6.8.2** — "Vermont's VHCURES all-payer claims database is **the foundational** data
    infrastructure." ⚠ compare Ch4/Ch5, which make foundational claims for the HIE/FHIR layer.
16. **§6.10** — "The global budget methodology is **the most consequential document** Vermont's
    transformation will produce." ⚠ Ch16 (AHS Restructuring Roadmap) and Ch2 are likely to
    nominate a different document.
17. **§6.10** — "Vermont's RBP target of 200% of Medicare is **the most specific mandatory
    all-payer price target enacted by any state**" (see MISMATCH 3 — the premise is wrong) …
    "will be **the most informative natural experiment** in all-payer pricing since Maryland's
    program began."
18. **§6.2.1** — "**fifteen years** of voluntary value-based care programs have moved the needle
    … without fundamentally changing the volume-driven behavior of the hospital sector." ⚠
    a countable duration — check Ch1/Ch3 for a different vintage (ACA 2010 → 2026 is sixteen).

---

## Other issues

### Genuine repetition (within Chapter 6 only)

1. **The Maryland regulator quote is used twice.** §6.2.1 sets it as a display quote — "The
   concept of the global budget is the fundamental piece that flipped the incentives for
   hospitals in the right direction…" — and §6.4.1 paraphrases the same quote as if new: "As one
   Maryland state regulator described it: the global budget is the fundamental piece that flips
   the incentives for hospitals…". *Fix:* cut the §6.4.1 paraphrase and cross-reference the
   §6.2.1 quote.
2. **The "global budgets without community investment don't improve population health" lesson
   appears three times**, each time as a fresh finding: §6.5.1 stat strip ("Global budgets
   without primary care investment reduce volume without improving population health"), §6.5.4
   (two full paragraphs developing it), and §6.8.2 Care Delivery Capability ("The Maryland
   experience demonstrated that global budgets without community care infrastructure simply
   reduce hospital volume without improving population health"). §6.5.4 is the right home;
   §6.8.2 should cross-reference rather than restate, and the strip line is redundant with the
   section it heads.
3. **Maryland's uniqueness is asserted five times in one section** (§6.5 intro, §6.5.1 strip,
   §6.5.1 prose, §6.5.2). §6.5.1's opening line and the paragraph immediately below it make the
   same claim in nearly identical words ("The only U.S. state with mandatory all-payer global
   budgets since 2014" / "Maryland is the only U.S. state to have operated a mandatory all-payer
   hospital rate setting system with global budgets for more than a decade"), and both also
   restate §6.5's framing.
4. **"Payment reform is the precondition on which all other transformation depends" is verbatim
   in two places** — the chapter dek and the last sentence of §6.1's first paragraph. Dek/body
   echo is a legitimate device, but here it is word-for-word within two blocks of itself.
5. **The "revenue is fixed, so cost reduction is the only lever" derivation runs three times** —
   §6.4 intro, §6.4.1 ("Under fee-for-service, revenue = price × volume…"), and §6.10's hospital
   executive paragraph. The §6.4.1 statement is the analytic one; the other two restate it.
6. *Legitimate recurrence, deliberately left:* the §6.11 Key Concepts entries for
   *Cross-subsidy*, *Revenue predictability*, *PMPM*, *EAST Fund* and *Potentially avoidable
   utilization* all restate body prose — that is what a glossary is for. Likewise Fig 6.3's
   Maryland row overlapping Fig 6.7 (a cross-state summary row vs. the dedicated results figure)
   and the repeated Oliver Wyman / GMCB source attributions in figure captions.

### Thin or structurally odd sections

- **§6.6 (The AHEAD Model) is a single 250-word paragraph** with no subsections, no figure and no
  table — the only Heading2 in the chapter built that way, and it carries the chapter's most
  consequential recent fact (the withdrawal). It reads as a late insert, which is consistent with
  MISMATCH 6: the surrounding sections were not updated to match it. Recommend splitting into
  "What Vermont signed" / "Why it collapsed" / "Why the reform survives it", and giving it the
  numbers table the rest of the chapter would have.
- **§6.5.1 opens with four unlabelled loose paragraphs acting as a stat strip** (lines "The only
  U.S. state…", "$1.4 billion…", "7% reduction…", "Global budgets without primary care
  investment…"). Every other stat strip in the chapter is a table inside a numbered figure
  (Fig 6.1, Fig 6.7). These four are neither, so they are unnumbered, uncaptioned and
  unsourced — and three of the four duplicate Fig 6.7 directly below them.
- **§6.9 (Work This Chapter on the Platform)** has only 2 rows against 12 figures' worth of
  modelable content — notably nothing for the Maryland evidence base or the premium trajectory.
  Thin relative to the equivalent section in other chapters, but no factual defect.
- **Orphan facts with no figure and no second mention:** "Statewide Strategic Plan delivered
  December 2028" (Fig 6.11 only); "$1,303 per-discharge administrative gap" (§6.10 only);
  "65+ from 21.7% in 2020 toward 30%+ by 2040 / working-age 58.8% toward 52%" (§6.2.3 only —
  the only demographic claims in the chapter, and the load-bearing premise of §6.2.3, yet not
  given a figure while far less structural numbers get one).

### Heading-text conformance (CLAUDE.md "recurring section headings")

`6.9 Work This Chapter on the Platform`, `6.10 Implications for You`, `6.11 Key Concepts in This
Chapter` are all present with the canonical wording, and `Sources: …` is a plain paragraph, not a
heading. Conformant.

### Not checked in this pass

Criterion 5 (platform promise delivery) and Preface/Introduction alignment were out of scope per
the brief. Fig 6.12's three tool routes, the "Value-Based Care Transformation Readiness
Assessment (30 dimensions across six domains)" named in §6.8.2, and the "Vermont's All-Payer TCOC
preset" named in Fig 6.12 are all deliverable-promise claims that this audit did **not** verify
against `frontend/app/` or Supabase. A 200 is not a delivered promise.
