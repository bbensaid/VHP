# Website pages line check — 2026-11-24

**Scope.** `scan_pages.py` covers every `app/` route that is not a Research Lab tool, with admin and api routes
excluded. It follows imports and skips the 171 tool files already checked. That gives 401 files.

**Passes.** Each flagged line was read, then checked against its source document, the book, or a web search:

1. Figures with no source marker nearby: 276 lines (`flags.json`).
2. A sweep for social proof and audience-size claims across the whole site.
3. Unsourced superlatives.
4. Sanity content outside the Academy and policy articles: the `caseStudy`, `rhtState` and `definition` types.

## Invented, deleted

- **Pricing page:**
  - "1,200+ Active subscribers" and "4.9★ Avg. rating". There are no subscribers yet; Stripe is not configured.
  - Three fabricated testimonials, attributed to a "Chief Medical Officer, Vermont integrated health system", a
    payer VP, and a named institution (Boston University School of Public Health).
- **Advisory stats** (`lib/advisory-data.ts`, shown on /advisory and /advisory-hub): "200+ Engagements
  Completed", "$2.4B+ Client Spend Advised", "94% Client Retention Rate" and "6 Pillars". Now only "8 Service
  Lines" and "5 Pillars, plus the Equity Imperative".
- **Subscribe prompt on every pillar hub:** "Join 15,000+ healthcare leaders".
- **`lib/data/rht-program.ts`:** about 950 lines of per-state RHT metric targets with no source, such as "Mobile
  Unit ROI $36:1" and "EMS Home Visits 5,000/yr". Nothing rendered them; live profiles come from Sanity
  `rhtState`, which has no metrics. The data was deleted and the types kept.
- **Act 167 equity tab:**
  - An unsourced vulnerable-population table (uninsured 28,000, migrant workers 8,000, and others).
  - A "21% No Vehicle" card. The tab's own footnote said no vehicle data was loaded.
  - Quantified transport scenarios ($8M/$24M; 25%→12%→5%).
  - Three unplaceable citations, including "Medicaid Journal 2021".
  - Its metrics are now computed from the VDH 65+ data and straight-line distances.

## Misattributed

- **Act 167 hospital pages:** "Oliver Wyman Recommendations" were HTR's own generic tier lists, including
  "Administrative Cost Reduction Target: 15–20%" and "Hire external consultants". They are now labelled as HTR
  options. The four at-risk hospitals show Oliver Wyman's actual final recommendation text.
- **False claim:** "As Vermont's only financially stable system, UVMMC" (UVMMC reports about $75M in losses).
  It also displayed on every hospital in the modest tier. Rewritten.

## Stale or wrong, corrected

- **Medicaid income figures:** "~$20,780" was 138% of the 2024 poverty line; now $22,025 on the 2026 HHS
  guideline of $15,960. SSI 300% was "$2,742", 300% of the 2023 rate; now $2,982 on the 2026 rate of $994,
  corrected in two places. The MABD income figure was mislabelled "protected income level"; VT Law Help calls it
  the "monthly income limit".
- **SASH:** "13,000+ served, 200+ communities, 70+ partners" became about 5,000 participants in every county
  (SASH, January 2025). The unsourced "reduces Medicaid spend" and "nationally recognized" claims were removed;
  ASPE's evaluation finding is cited instead.
- **Medi-Cal:** "13.7M members" and "15 million ≈38%" became 13.2M in managed care and about 13.9M in total
  (DHCS, April 2026). "24 plans" was removed (no source).
- **Uninsured rates:** Oregon 6.1% → 5.2% and California 7.2% → 5.9%. Vermont's 4.2% was confirmed. All are
  ACS 2024 via America's Health Rankings.
- **US uninsured:** "8M+ uninsured" became 8.0%, about 27 million people (Census 2024).
- **UHDS:** e-Consult "$1,550,000" was not in the CMS-derived data. It now shows $2.3M planned and $5.64M signed;
  closed-loop referral shows $455K planned and $425K signed.
- **Connect grants:**
  - Rural Health Transformation Program: "HRSA / CMS, up to $25M per state" became CMS, $50B over FY2026–2030,
    with state awards of $147M–$281M.
  - Unverifiable CCBHC and CDC PHIG totals were replaced.
  - An RWJF "Health Systems Innovation Initiative" was removed (no such program found).
  - A Commonwealth Fund entry was removed ("State Health System Performance" is their scorecard, not a grant).
- **/advisory-hub:** it served the advisory offering with no FutureOfferingNotice, unlike /advisory. Now wrapped.
- **Superlatives removed or sourced:**
  - "World-class", twice.
  - AHEAD as "first time in a CMS model" to tie equity to payment. ACO REACH did so earlier.
  - "Transportation is the single largest determinant".
  - AI documentation rated "Proven". Now "modest gains in RCTs", with the 9.5% figure stated relative to control.
  - "World's largest share of GDP" became "largest among OECD nations".
- **Other corrections:** 10x Visium described as "single-cell" (it is spot-level). Vermont Care Partners'
  "16 DAs and SSAs" (it is a network of 16 that includes them). The Academy DA lesson's "11" was made
  consistent with DMH's 10 DAs plus 2 SSAs. The site's "11 Designated Agencies" is correct: 10 DMH agencies plus
  Upper Valley Services under DAIL.

## Sanity case studies (verified)

- **Kaiser AAM (Escobar, NEJM 2020):** 520 deaths avoided per year, not over the whole study. 548,838 eligible
  hospitalizations and 19 rollout hospitals are confirmed; all 21 KPNC hospitals had adopted it by 2019. "Nearly
  100 data elements" was not in the paper and was removed.
- **Intermountain:** "40% lower readmissions", "16 hospitals" and "projected 15–30%" were unconfirmed and
  removed. The case now uses Intermountain's December 2023 figures: 1,000 patients since May 2020, over 3,000 bed
  days saved, and up to 30% lower cost.
- **CMQCC:** 13.1 → 7.0 confirmed (Health Affairs 2018) and the 20.8% vs 1.2% result confirmed (Main 2017).
  "92% of hospitals adopted" was unconfirmed and removed.
- **OneCare:** 36% higher ED use and 18% fewer primary care visits are confirmed. The source is OneCare's own
  benchmarking to the GMCB (2021: 36.6% and 18.7%), not the State Auditor; the year was added. The financial
  figures match the verified ledger.
- **Camden:** 800 patients and 62.3% vs 61.7% confirmed (Finkelstein, NEJM 2020).
- **IDR definition:** 1.46M disputes in 2024 confirmed (CRS). "Original projection of 22,000" was unconfirmed
  and removed.
- **`rhtState`:** all 50 award amounts match CMS FY2026.

## Confirmed and kept

- **Federal and program figures:** 2026 FPL table ($15,960); MSSP tracks and caps; QP thresholds; coding
  intensity 5.9%; HHI 1,800/100; Cooper 2019; Rock Health; Change Healthcare 192.7M and $872M; FDA 1,614 AI
  devices (September 2026).
- **Health statistics:**
  - Maternal mortality 50.3 vs 14.5, and 84% preventable.
  - Food insecurity 13.5%; Wallace 3.6M; NAAL 36%.
  - CalAIM: 42K+ reentry (DHCS); 38,490 in foster care (CWLA); about 3.6× Black vs white maternal mortality
    (CDPH 2019–21); top 5% drive over half of Medi-Cal costs (DHCS); 187,084 unhoused (HUD).
- **Oregon:** $325M quality pool at 4.25% in 2024 (OHA, now noting the 3% cut for 2025); 15 CCOs since February
  2026 (16 in 2025, then PacificSource left Lane County).
- **Vermont sources:**
  - Oliver Wyman: $3.1B vs a 3% margin; 13 of 14 hospitals; 108%.
  - UVM Health ransomware: $63M (book).
  - Act 55 = H.266.
  - RHT activity amounts match the CMS-derived Vermont data to the dollar.
- **Labelled content:** examples marked hypothetical; product prices match `stripe.ts`.

## Not checked

Advisory service prices ($15,000–$150,000 engagements) are commercial terms only the author can set, and they
sit behind the "Future Offering" notice.
