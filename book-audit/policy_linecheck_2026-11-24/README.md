# Policy analysis line check — 2026-11-24

Scope: all 73 `policyAnalysis` documents in Sanity. Every sentence containing a figure ($, %, large count, Nx)
without a citation in the same sentence was flagged: 189 sentences in 50 articles (`flags.json`). All 50 were
reviewed (`done.txt`). Rule: verify against the cited source or a web search; correct it; if it cannot be
confirmed, delete it.

Fix files (applied with `frontend/scripts/fix-academy-strings.mjs`, backups in `sanity-backups/`):

- **batch1.json**
  - MSSP PY2024 figures updated to CMS's updated fact sheet: $2.5B net savings; $245 net and $651 gross per capita.
  - Removed: the Level E $5.4B claim, the "$1.2 trillion" and "$4.8 billion" headline figures.
  - The "300,000 shortfall" is now HRSA's projection.
  - Rock Health 2024 corrected to $10.1B.
- **batch2.json**
  - CHW figure: "~$2,500 per enrollee" replaced with Kangovi 2020's $2.47 returned per $1.
  - Removed: BCBSVT "$1.11 per premium dollar", "$47 trillion" chronic-disease cost, and prevention "ROI >20%".
- **batch3.json**
  - Rural hospital margins now use Chartis's 2026 report: 41.2% in the red, 417 vulnerable, median 2.0%. These
    replace the 2025-report figures that had been mixed in with the 2026 ones.
  - Vermont Medicare Advantage: 92.2% of enrollees lost their plan for 2026 (Meiselbach et al., JAMA 2026). This
    replaces "about 50,000".
  - Maryland: about $975M in Medicare savings over 2014–2018 (RTI final evaluation, against a $330M target).
    Removed the unconfirmed "$550M over three years".
  - Removed as unconfirmed:
    - Gifford "−18%" margin (the GMCB filings give −8.3% for FY2023; −18% appears to be a consolidated figure).
    - NP "62% more likely" and "89%/94%".
    - Epic "~280M records".
    - Telehealth $112.80/$161.40/$82, ER "8.5%→3.03%", and "12.5%".
    - CON "~11% higher", PharmGKB "63%", CYP2C19 "~52%".
    - Vermont "65+ ~30% by 2040".
    - Tele-ICU "12% mortality drop", "82%/46%/56%" survey, and Mercy "seven states".
    - Travel-nurse "$2,100/week" and hospital-at-home "1-2%".
    - The "$0.7–2.4 Billion" title figure and the "$47T" claim (2 more articles).
  - Removed an editorial note that had leaked into published text: "Unverified '108% premium / 9-of-14' figures replaced".
- **batch4.json**
  - REH conversions: "42 (19+18+3)" did not add up to 42. Now "43 since Jan 2023" (Sheps Center via HFMA).

Kept after checking (sourced in context or confirmed):

- AHEAD 10%→30% Medicare FFS ramp: CMS, stated in the article.
- Cleveland Clinic sepsis AI and the Penda/Kenya AI Consult 16%.
- DSH cuts of $8B/yr.
- RN turnover cost ~$60k (NSI).
- PREPARE trial, 6,944 patients (Lancet 2023).
- Severe maternal morbidity 4.2%→2.9% (Howell 2016); >80% of maternal deaths preventable (CDC MMRCs).
- Medicare Advantage forced disenrollment: 6.9%→10%, 2.9M people (JAMA 2026).
- Rural primary care physicians 39.8 vs 53.3 per 100k (RHIhub).
- Rural hospitals without obstetric services: 52.4% (Penn LDI).
- BEAD $42.45B.
- Drug Channels gross-to-net $334B (2023).
- TEFCA: 11 QHINs, ~71,000 sites (ASTP/ONC).
- REH payment of $285,625/month (2025).
- SDOH Z-codes on 1.9% of admissions (Truong 2020).
- National health expenditure 2024: $5.3T, 18.0% of GDP (CMS).
- Illustrative or rhetorical lines that make no factual claim, such as the "95% accurate note" and the "$500,000 platform" myth.

Verification: after the fixes, a fresh full Sanity export (602 docs) has no hits for any removed figure.
