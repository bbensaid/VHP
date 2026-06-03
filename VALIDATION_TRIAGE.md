# policyAnalysis Validation — Corrections Log (§5)

**Date:** 2026-06-02 · **Scope:** the 30 stat-heaviest of 109 policyAnalysis briefs.
This pass **web-verified specific numeric claims and corrected the docs in Sanity**
(not just flagged them). All edited bodies are backed up in
`/sanity-backups/backup-validation-top30-*.json` (reversible).

**Scripts:**
- `frontend/scripts/fix-dsh-brief.mjs` — full rewrite of the DSH brief.
- `frontend/scripts/fix-validated-blocks.mjs` — targeted block corrections.

---

## ✅ Corrections applied (verified against external sources)

| Doc | Was | Now | Source |
|---|---|---|---|
| `policyAnalysis-clin-005` (Maternal Mortality) | "23.8 per 100,000 in 2024 — **more than triple Canada, Australia, and the UK**" | "**17.9 per 100,000** (CDC 2024 final) … roughly double Canada (~8), several times Australia/UK (~3–6)" | CDC NCHS 2024; WHO; Our World in Data |
| `vbc-fundamentals-module-4-technology-pillar` (telehealth) | "840k → **52M visits/week**, a **6,100% increase**" | "from **0.2% to ~50.7%** of outpatient E&M visits in Apr 2020, ~**78×** the Feb 2020 level" | CDC MMWR; HHS ASPE |
| same doc (EHR adoption) | "**88%** of hospitals … from **9%** in 2008" | "**~10% (2008) → ~96% (2021)**" | Health Affairs; AHA; Commonwealth Fund |
| `zero-sum-battlefield-fee-for-service-failure-vermont` | "this **262% to 555%** markup" / "the **555% markup arbitrage**" | "a **262% markup**" / "the markup arbitrage" (555% unsupported; CT pair is ~304%) | VTDigger; BCBSVT "VT Affordable Care" |
| `vermont-payer-provider-war-economics-19-percent` | "premium of **262% to 555%**" | "roughly **262%** … $6,520 vs $1,799" | same |
| `rural-nurse-retention-economic-model-2026` | "**HRSA Jan 2026** report: rural nursing shortage cost **$1.2 trillion 2026–2035**" | "$1.2T = **IHS Markit** national economic-output loss by 2030 (not rural-specific); per-hospital premium labeled an **HTR estimate**" | IHS Markit / nursing-shortage literature |
| `policyAnalysis-eco-003` (Travel Nurse) | "**An HTR analysis projects** … 450,000 / $38.7B" stated as fact | reframed as explicit **HTR estimate** ($1,820/wk Q3'25 left — corroborated by ZipRecruiter) | — |

### Full rewrite
- **`medicaid-dsh-rural-hospital-fiscal-collapse-2026`** — the original's core premise
  was **false**: it said the FY2026 DSH cuts were "legally in effect." In reality the
  ACA's ~$8B/yr DSH reductions (FY2026–2028) have been **repeatedly delayed by Congress**
  (a one-year delay scores ~$625M at CBO). The draft also invented bills (S.1847,
  H.R.4891), a CMS rule (CMS-2408-P), named hospitals, and CBO scores. **Rewritten from
  scratch** against verified sources: Chartis 2025 (46% of rural hospitals negative-margin,
  432 vulnerable; non-expansion states 53% in the red vs 43% in expansion); rural service
  loss (293 OB closures 2011–23, 424 chemo 2014–23); real DSH delay/CBO figures. An
  editor's note documents the revision. (CRS IF10422; HFMA; Georgetown CCF; Chartis)

---

## ✅ Verified correct (checked, left as-is)
- Vermont premiums **19.6% of income, highest in nation** — confirmed (Newsweek; VTDigger).
- Vermont silver premium **+108% since 2018** — confirmed in the Oliver Wyman Act 167 report.
- UVMMC MRI **$6,520 vs $1,799** — confirmed (VTDigger / BCBSVT).
- HITECH **$27B** — confirmed. Price-transparency **$2M/yr max penalty** (actually $2,007,500) — confirmed.
- Black maternal mortality **~3.4×** white — CDC 2024 gives 44.8 vs 14.2 (≈3.2×); within range, kept.

---

## ⚠️ Remaining — house figures not externally checkable (verify before citing)
These survived because they're plausible but rest on HTR's own modeling/audits with no
public source to confirm. Recommend the same "HTR estimate" labeling or a real citation:
- `policyAnalysis-eco-005` / `roi-hospital-price-transparency` — "HTR audit of 500 price
  files" (67% non-standard / 43% omitted / 28% errors) and the 82%/44%/61% compliance split.
- `ahead-model-year-one-financial-outcomes` — AHEAD Year-One shared-savings splits (34%/41%).
- `policyAnalysis-equ-001`, `sdoh-screening-rural-...`, `community-health-worker-rural-...`
  — ROI multipliers ($2.40/$1, $3,400/patient, CHW revenue math).
- `policyAnalysis-clin-001` (Hospital-at-Home) — "11,246 patients / 27.7% readmission cut /
  $8–14M savings": find the source study or label as modeled.
- `rural-hospital-cybersecurity-ransomware-2026` — breach stats (87% increase; rural 61%/31%).

**Net this pass:** 7 docs corrected (1 full rewrite + 6 targeted), all changes
web-sourced and reversible; ~10 house-figure items remain for a sourcing/labeling pass.

**Sources:** CDC NCHS Maternal Mortality 2024 · CDC MMWR 6943a3 (telehealth) ·
Health Affairs 10.1377/hlthaff.2016.1651 (EHR) · VTDigger 2025-12-22 (UVMMC/BCBSVT) ·
congress.gov IF10422 + Georgetown CCF + HFMA (DSH) · Chartis 2025 Rural Health State of the State.
