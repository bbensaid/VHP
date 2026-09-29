# BUILD — Hospital Financial Stress Test extension (audit_ch07 finding #13)

Date: 2026-09-28
File changed: `frontend/components/research/HospitalFinancialScorecard.tsx` (only file changed)
Route confirmed: `frontend/app/research-lab/policy-quality/PolicyQualityClient.tsx` line 117 renders
`<HospitalFinancialScorecard />` under tab id `scorecard`, labelled "Hospital Financial Stress Test".
`HTR_Book_v42.docx` was NOT touched.

Standing rule applied: book vs tool disagree → extend the tool.

## The finding

audit_ch07.md #13: the book (§7.6.2) promises four CFO scenarios — RBP at 200% of Medicare
(Oliver Wyman) or 250% (GMCB phased); a global budget revenue cap; H.R. 1 Medicaid cuts phasing
in 2027–2031; a transformation-investment scenario — plus an answer to "what service lines have
prices furthest above the benchmark?". The tool had three presets, a flat "Medicare +15%"
RBP proxy, a mislabeled "H.R. 1 Medicaid Cliff (Post-2030)", no transformation scenario, and no
service-line dimension.

## What was added / fixed

**1. RBP benchmark selector (200% / 250% / custom) — NEW.**
Replaced the old preset's flat `volumeChangePct: -8` hack with an explicit model:

    revenue loss % = commercialShare × (1 − cap / currentCommercialPrice)

- Two one-click benchmarks, `200% of Medicare` (Oliver Wyman / Act 167 recommendation, the
  default per the book's primary figure) and `250% of Medicare` (GMCB phased), plus a free
  slider 150–400%.
- "Current commercial price (% of Medicare)" input, bounded 279–697% — the real published range
  from GMCB's Feb 2026 price-transparency dashboard (the same range `/vermont-act-68` cites).
  Default 300%, deliberately near the low end so the modeled loss understates rather than
  overstates. Labelled in-UI as a user assumption, since no per-hospital figure is published.
- "Commercial share of net revenue" input, default 35%, flagged ESTIMATED (payer mix is not
  published per hospital).
- Live readout of the modeled revenue loss in % and $.
- The `act68_rbp` preset now sets `rbpCapPct: 200` instead of the flat volume haircut.

**2. H.R. 1 timing fixed — 2027–2031 phase-in.**
Preset relabelled "H.R. 1 Medicaid Cuts (Phasing 2027–2031)" (was "Medicaid Cliff (Post-2030)").
New year selector 2027/2028/2029/2030/2031 applying a linear phase (20/40/60/80/100%) of the
full 12% Medicaid revenue reduction the old preset assumed. A selected year overrides the manual
Medicaid slider; the active-scenario banner names the year and the resulting effective cut.

**3. Transformation-investment scenario — NEW (the missing 4th).**
Models amortized capital against recurring operating savings:

    net annual effect = (operatingExpense × savingsPct × ramp) − (investment / amortYears)

Capital cost is added to both operating expense and annual debt service (so Debt Service Coverage
moves too); savings come off operating expense. Controls: capital invested, recurring savings as
% of operating expense (default 2%), amortization term (default 10 yrs), years since investment
(ramps to full effect over 3 yrs). Default investment = the selected hospital's pro-rata share of
the **$195M statewide RHT award**, allocated by its share of the 14-hospital FY2024 revenue base
— labelled in-UI as an allocation *rule*, not a published per-hospital award. New preset
"RHT Transformation Investment ($195M)".

**4. Global budget cap** was already delivered by the `act68_global_budget` preset; the manual
shock panel is now labelled "2 · Global Budget Cap & Manual Shocks" so all four scenarios are
numbered and findable, matching the book's list.

**5. Service-line panel — added as far as real data allows.**
Selecting any of the 14 real hospitals now shows its service lines, pulled from
`app/vermont-act-167/simulator/data.ts` (`HOSPITALS[].services`) via a new preset→Act 167 id map.

## Genuine data gap (NOT papered over)

**Vermont publishes commercial prices as a % of Medicare only at the HOSPITAL level.** GMCB's
price-transparency dashboard gives a hospital-level range (279%–697%); there is no published
per-service-line price-to-Medicare ratio for any Vermont hospital, and nothing in this repo holds
one. The Act 167 dataset's `services` field is a *presence* list (which lines a hospital
operates), not prices — and that file's own header says synthetic data is used where actuals are
unavailable.

So the book's question "what service lines have prices furthest above the benchmark?" **cannot be
answered numerically today.** No per-service-line prices were invented. The tool now shows which
service lines are exposed to RBP and states plainly, in the UI and in code comments, that the
ranking is hospital-level only and why.

Closing this properly needs new data: per-service-line commercial allowed amounts vs. Medicare
rates, e.g. from the VHCURES all-payer claims database or hospital machine-readable price
transparency files. That is a data-acquisition task, not a code task. Until it exists, the
book-side option is to narrow §7.6.2's promise to hospital-level price exposure.

Also still unverified from the same audit: #14, the §7.6.2 subscriber-gating claim
("Professional and Advisory subscribers") — not in scope here, not checked.

## Verification

- `npx tsc --noEmit` — clean.
- `npx eslint components/research/HospitalFinancialScorecard.tsx` — clean.
- Not rendered in a browser in this pass.
