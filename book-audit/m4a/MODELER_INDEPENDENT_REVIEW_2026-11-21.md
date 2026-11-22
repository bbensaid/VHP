# Single-Payer Modeler: independent methods review (2026-11-21)

Scope: `frontend/lib/m4a/modeler.ts`, `frontend/lib/m4a/vermont-hospitals.ts`,
`frontend/lib/data/gmcb-fy27-budget-orders.ts`, `frontend/app/policy/medicare-for-all/modeler/{ModelerClient,page}.tsx`,
`frontend/scripts/test-m4a-modeler.cjs`, and the saved sources named in the brief. I edited no file except this one.

I recomputed everything with a separate Python script, not the engine. `npm run -s test:m4a` gives 9/9 pass.

Labels: **[repo]** = a finding from the repo's saved sources. **[domain]** = general health-finance knowledge,
not confirmed by a repo source. Treat [domain] items as hypotheses to check before you rely on them.

---

## 1. Data integrity

| Input | Source check | Result |
|---|---|---|
| Total and commercial NPR, 14 hospitals | `gmcb_fy27_press_2026-09-15.txt` lines 125–139 | **Exact match.** They sum to $3,802,585,620 and $1,936,889,939, the press-release totals. |
| FY27 operating expense, 13 hospitals | Staff overview p.27 (lines 533–546) | **Exact match.** The excl-BMH sum of $4,435,214,245 equals the p.27 system total. |
| FY27 operating margin | Staff overview p.31, 7th column ("FY27 Submitted") | **Match** (the test parses this column correctly). Values are rounded to 0.1 pt. See 1d. |
| Uncompensated care | `cms_cost_report_2024_vt.json`, "Cost of Uncompensated Care" | **Exact match.** For all 14 hospitals the fiscal year runs 2023-10-01 to 2024-09-30. CCNs and the CAH flag (4713xx) are correct. |
| RAND 283% | `rand_vt_2024-08.txt` l.169: "Overall (outpatient + inpatient 283%)" | Match. The "2022" year comes from staff overview p.77, not from the RAND slides. |
| VSEA/VEHI 289% | `gmcb_rbp_report_2024-12-16.txt` l.94 | The value matches. **The label is wrong:** the study period is "2018 through the third quarter of 2023" (l.91–92), not "2018–22". |
| GMCB 453% | Staff overview p.77 | The value matches. Comparability problems are in 3c. |
| 200% Act 167 quote | RBP report l.122 | Exact. |
| CBO figures | `cbo_swagel_testimony_2022-05-12.txt` l.50–54, 113–136, 163–164 | All match. |

**Basis issues found:**

a. **"Total NPR" is NPR + FPP.** [repo] The standard budget condition reads "FY27 NPR/FPP ("NPR") budget"
   (staff overview l.270). The approved excl-BMH total of $3,689M matches submitted NPR+FPP of $3,700M (p.23), not NPR of $3,508M.
   The FPP (fixed prospective payments, $193M submitted) are not fee-for-service. The model reprices them at P/100 anyway.
   The page never mentions FPP.

b. **Commercial NPR excludes Medicare Advantage** [repo, p.24 header: "Commercial NPR+FPP (Excluding Medicare Advantage)"].
   That means MA sits in "non-commercial" and is treated as Medicare-rate. This is defensible [domain: MA hospital rates are roughly Medicare-based].
   Commercial NPR *does* include workers' comp, ChampVA, Tricare and IHS. [repo, p.26 note 3: RRMC "requested carve-outs of Worker's
   Compensation, ChampVA, Tricare and Indian Health Services"]. Those payers are not priced at RAND's commercial ratio.
   S.1506 also keeps VA, TRICARE and IHS benefits outside the program (s1506 l.4035), and workers' comp carriers reimburse it (l.3830).

c. **Approved vs submitted is not "slight" at every hospital.** [repo] The p.26 *requested* commercial NPR differs from the approved figure.
   NMC asked for $86,686,524 and was approved for $68,929,669. That gap is **−$17.76M, 11.6% of NMC's implied operating revenue.**
   Other gaps: Copley −$4.13M, RRMC −$3.68M, Mt. Ascutney −$1.63M.
   The "Margin FY27" column is the submitted margin, and for NMC it is materially optimistic. The repo has no per-hospital submitted
   total NPR, so I cannot compute the approved margin. The comment in `vermont-hospitals.ts` ("differ slightly") is wrong for NMC.

d. **Margin rounding.** Implied revenue = expense/(1−m), with m rounded to 0.1 pt. Recomputed operating income compared with the p.25 bar labels:
   UVMMC −42.37 vs −42.86; CVMC −3.41 vs −3.25; system −44.31 vs −44.74 ($M).
   The implied system operating revenue, $4,390.9M, matches p.23 ($4,390M). The error is small but avoidable.

e. **Year mix.** Prices come from 2022 (RAND), 2018–Q3 2023 (VSEA) and 2025 (GMCB). Revenue is FY27. Uncompensated care is FY24.
   The page dates each input separately, but it does not say that RAND and VSEA predate several years of GMCB commercial-rate cuts (FY27 alone is −2.9%).

f. **Gifford's charity care is blank** in the CMS file. Its $353,991 is bad debt only, so its uncompensated care is understated.

## 2. Formula recomputation

All figures are from my own script, using the inputs as coded.

| Quantity | Result |
|---|---|
| Statewide change, P=100, R=283, uncomp off | **−$1,252.5M (−32.9% of $3.80B)** |
| Same, uncomp on (the default) | **−$1,193.0M (−31.4%)**. Uncompensated care adds +$59.4M. |
| Revenue-neutral rate, R=283 / 289 / 453 | **149.1% / 150.0% / 165.8%** of Medicare |
| Global budget (§611 lens), statewide | **+$44.3M** (13 hospitals). It would be +$44.74M using p.25 incomes. |
| P=100, R=283: CAH margins after | Grace Cottage −14.1%, Mt. Ascutney −21.6%, Porter −29.4%, Springfield −30.3%, Gifford −31.1%, Copley −35.8%, NVRH −36.1%, North Country −39.1% |
| At the neutral rate (149%), uncomp on | 12 of 13 hospitals gain. UVMMC is −$53.2M (margin −3.9%). Grace Cottage's margin goes to **+20.7%**. |

The engine reproduces these exactly. The algebra is right:

- neutral = 100·T / (C·100/R + (T−C))
- Δ = C(P/R−1) + O(P/100−1) + U
- margin after = (Rev+Δ−E)/(Rev+Δ)

**Internal inconsistencies:**

- **Revenue-neutral button vs default checkbox.** The "Revenue-neutral" preset excludes uncompensated care (modeler.ts l.101).
  But the checkbox defaults to on (ModelerClient l.95), so pressing "Revenue-neutral" shows **+$59.4M, not $0**.
  This contradicts the on-page text: "Revenue-neutral is the one rate at which total revenue across the 14 hospitals stays the same."
- **Lens B percentage tile.** The tile divides a 13-hospital change (excluding BMH) by the 14-hospital $3.80B.
  The result is 1.17%; the like-for-like figure is 1.20%.

## 3. Assumptions

**(a) One statewide ratio applied to commercial NPR that includes professional services.**
[repo] RAND gives facility 283% and professional 226% (rand l.169, l.189–191). RAND's system-level range is 148%–321% (l.172).
Applying 100/283 to professional revenue cuts it too far, so at P below R **the model overstates the loss**.
The page lists the assumption but **does not state the direction**.

The same direction of bias applies to:
- Outpatient drugs already capped at 120% ASP (staff overview l.281, Act 55). These are commercial NPR far below 283% of Medicare [domain: Medicare pays about ASP+6%].
- WC/Tricare/ChampVA revenue inside commercial NPR (1b).

[domain, unverified] UVMMC's NPR is likely to include its employed-physician group, so this matters most for UVMMC.

Using one statewide R also misallocates between hospitals. RAND's 148–321% system spread is wider than most of the cross-hospital differences the table displays.

**(b) All non-commercial revenue treated as Medicare-rate.**
The page states the direction correctly for Medicaid ("understates the gain"). What it leaves out:

1. The same bias **overstates the revenue-neutral rate**. The Medicare-equivalent of Medicaid revenue is larger than its dollars.
   As an illustration only (not Vermont data): if 25% of non-commercial revenue were Medicaid at 70% of Medicare, the neutral rate falls from 149% to about 138%.
2. FPP (1a) and self-pay are in this bucket too.

MA at Medicare rate is defensible [domain].

**(c) Is 453% comparable to RAND's 283%? No, not for repricing realized NPR.**
[repo] GMCB's own breakdown is outpatient 503% and inpatient 333% (p.77). RAND's is outpatient 311% and inpatient 227%.
No repo source defines the GMCB tool's weighting or benchmark ("Medicare-equivalent estimated payment").
Commercial NPR is realized revenue, so the right denominator is a claims-weighted allowed/Medicare ratio, which is RAND's construction.

The VSEA 289% has its own limits:
- It covers two self-funded plans (59k members, l.102).
- It is measured against "Medicare base prices" (l.528). The same report also shows 273% against "National Medicare base price" (Fig. 10, l.888–896).

At R=453 the model's P=100 loss is −$1.45B. That is an artefact of using an incomparable benchmark, but the UI presents it as an equal preset.

**(d) Adding uncompensated care as new revenue.**
- Not a double count against NPR. [repo] GMCB defines NPR as revenue "after contractual allowances, uncompensated care and other deductions" (press l.62–63).
- The CMS value really is at cost: (U − charity)/bad debt ≈ cost-to-charge ratio for every hospital I checked, for example SVMC 0.3533 vs CCR 0.3534.
- S.1506 §202 bars cost-sharing (s1506 l.1547), so insured patients' bad debt does disappear.

Caveats:
1. It is paid at *cost* while every other dollar is paid at P% of Medicare. That is inconsistent when P ≠ ~cost, and understates at the neutral rate.
2. It uses FY24 levels.
3. Gifford's charity care is missing (1f).
4. BMH's $2.9M is in the statewide total, but BMH is outside the margin counts.

Overall the term is small (1.6% of NPR) and directionally sound.

**(e) Critical access hospitals: the largest methodological problem.**
[domain] Medicare pays CAHs about 101% of reasonable cost for inpatient and outpatient services, not a fee schedule.
A single payer "at Medicare rates" would therefore put the 8 CAHs near cost-based break-even. The model shows −14% to −39% margins at P=100 (section 2).
At P=149 it pays CAH non-commercial revenue 49% *above* cost-based levels, producing a +20.7% margin at Grace Cottage.

[repo] HMA also reports that the CAH commercial percentages differ from PPS (RBP l.455–461), and GMCB p.78 shows separate CAH price ranges.

Lens A therefore misstates 8 of 14 hospitals, and the CAH badge on the table does not warn the reader.

**(f) §611 modelled as revenue = operating expense.**
- [repo] §611(b)(3)(A): payments "may not take into account capital expenditures". Yet the p.27 expense includes depreciation (p.27 note 1).
  The page says "Capital is budgeted separately and is not shown". In fact **capital cost is inside the expense the model fully funds**.
  Under §611 the operating budget would exclude depreciation and interest. Capital would come only from discretionary §615(b) grants.
- [repo] §611(b)(2)(B)(ii) and §611(c) make Medicare PPS operating base rates the comparative benchmark in negotiation, so the budget is not cost pass-through.
  §611(b)(4) caps compensation.
- Revenue = expense is therefore an upper-bound, full-cost-recognition case, not "what §611 pays".
- The model also nets all *other operating revenue* ($690M system-wide, $576M at UVMMC) into the comparison. The page does not say so.
- Provider tax sits inside the expense as well (p.27 note 1).

## 4. Overstated or wrong statements on the page

1. "Revenue-neutral is the one rate at which total revenue … stays the same". **False under the default settings** (+$59.4M).
2. "Capital is budgeted separately and is not shown" (lens B intro and modeler.ts header). **Misleading.** Depreciation is in the funded expense (3f).
3. "HTR models this as … every hospital's operating margin becomes zero" and "A cost-based global budget rescues…" read as what S.1506 *does*.
   §611 is negotiated against PPS benchmarks, so this is the full-cost assumption, not the statute's outcome.
4. "At Medicare rates, every hospital loses". True only inside the model. For CAHs it contradicts Medicare's cost-based payment (3e).
5. The VSEA preset label "(2018–22)" is wrong. The source says 2018–Q3 2023.
6. "Vermont's own Medicaid global budget for six hospitals was stopped by CMS in July 2026". The saved source
   (`gcr_26-089_hgb_discontinuation.txt`) supports the CMS July 7, 2026 notice and the cessation on July 31, 2026, **but does not state "six"**.
   The count is cited elsewhere in the repo (`vt-pillar-history.ts`, `ch16_findings`) to the same GCR. Confirm it or drop it.
7. The basis caveat calls the difference "slight", which is false for NMC (1c).
8. The "Professional services … repriced at the same ratio" bullet omits the direction of bias (the loss is overstated).
9. The page presents 453% as an equal preset without saying it is likely non-comparable.
10. "Every input comes from a named public source" (page.tsx) is true. "each assumption is stated" overstates: FPP, other operating revenue, capital in expense, and CAH cost-based payment are all unstated.

## 5. Recommendations

### Must-fix
1. **Revenue-neutral consistency.** Choose one fix:
   - (i) compute the neutral rate with uncompensated care when the box is ticked: solve Σ[C·P/R + O·P/100] + U = T, which gives P = 100(T−U)/(C·100/R+O); or
   - (ii) change the text to "…stays the same, before paying uncompensated care". For R=283 with uncomp on, (i) gives 146.8%.
2. **CAH treatment.** Add a CAH option, default on: "Pay CAHs as Medicare does (cost-based)". Under it, CAH revenue = opExpense (the lens B logic for CAHs).
   At minimum, add an assumption bullet: "Medicare pays critical access hospitals on a cost basis; lens A's results for the 8 CAHs therefore overstate their loss at Medicare rates and overstate their gain above it."
3. **Fix the capital statement.** Replace "Capital is budgeted separately and is not shown" with:
   "S.1506 excludes capital from the global budget (§ 611(b)(3)(A)), but GMCB's operating expense includes depreciation, so this lens funds capital cost too; it is an upper bound."
   Better still, load depreciation per hospital and subtract it.
4. **Reframe lens B as an assumption**, not as the statute's outcome:
   "If the negotiated budget recognised every FY27 submitted cost… S.1506 negotiates against Medicare PPS operating rates (§ 611(c)), so actual budgets could be lower."
5. **VSEA label:** "State employee & teacher plans (2018–Q3 2023)".
6. **"Six hospitals":** verify it against a source that states the count and save that source, or change the text to "Vermont's own Medicaid hospital global budget was stopped by CMS in July 2026."

### Should-fix
7. **Define NPR on the page:** "Net patient revenue here includes fixed prospective payments (FPP), as GMCB budgets it; commercial excludes Medicare Advantage but includes workers' comp, Tricare and ChampVA."
8. **Correct the basis caveat** in `vermont-hospitals.ts` and the assumption bullet. Name the NMC gap: approved commercial NPR is $17.8M below the submission, so NMC's FY27 margin shown is optimistic. Add a footnote marker on the NMC row.
9. **Demote 453%.** Mark it "not claims-weighted; not comparable to RAND for repricing revenue", or remove the preset. Keep RAND 283% as the default.
10. **State the direction of bias** for professional services, 120%-ASP drugs, and WC/Tricare: "overstates the commercial loss at rates below today's price".
    Add "also overstates the revenue-neutral rate" to the Medicaid bullet.
11. **Derive operating revenue from p.25 operating income** (revenue = expense + income) instead of the rounded margin. The UVMMC error is $0.5M.
12. **Lens B percentage tile:** divide by the excl-BMH NPR ($3.689B), or label the tile "13 hospitals".
13. **Tests:** check NPR inputs against the press-release text and assert the sums equal the press totals; assert that the neutral rate yields Δ=0 under the UI's default settings; replace the `staff.includes(money)` substring test with a row-anchored match.

### Nice-to-have
14. Pay uncompensated care at P% of its Medicare-equivalent (cost ÷ Medicare cost-coverage) instead of at cost, and flag Gifford's missing charity care.
15. Add a Medicaid-share input (or a sensitivity row) so the Medicaid bias is quantified, not just named.
16. Use hospital-level commercial prices if GMCB/RAND per-hospital files are saved. RAND's 148–321% spread dominates the redistribution results.
17. In lens B, say that "other operating revenue" ($690M system-wide) is netted in, and that provider tax is treated as an allowable cost.
