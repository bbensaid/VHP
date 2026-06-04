# Content Corrections Log — Analysis Briefs

**Purpose:** An auditable record of cases where a *previously published* policyAnalysis
("Analysis") brief contained a statistic or claim that was **fabricated, self-attributed
without a source, or factually stale**, and was deleted or corrected during the
2026 deep-rewrite pass. Because these briefs make public-facing health-policy claims,
provenance matters: this file answers "was this number always wrong, and what changed?"

**Standing rule applied:** any statistic that could not be verified with a live external
source was **deleted and replaced with a verified figure**, never flagged-and-kept. All
replacements were web-verified (June 2026) and now carry an inline `(Source, year)` citation
plus an entry in each brief's "Sources" section. See `ANALYSIS_CONTENT_STANDARDS.md`.

Final state: `frontend/scripts/audit-analysis-length.mjs` → **77/77 PASS, QUEUE 0.**

---

## Substantive corrections (fabricated or stale → verified)

| Brief (_id) | Pillar | Original claim (problem) | Corrected to | Verified source(s) |
|---|---|---|---|---|
| `rural-hospital-cybersecurity-ransomware-2026` | Technology | "168 ransomware attacks on US hospitals in 2025, +87% over 2024; rural = 61% of breaches with 31% of hospital count." **Fabricated — none of these numbers are supportable.** | ~293 ransomware attacks on care providers in first 9 months of 2025 (roughly flat vs. 2024; attacks on healthcare *vendors* rose ~30%); rural ransomware-hit hospitals rose 5→17 (2016–2021); ~$1.9M/day downtime, up to ~18 days without EHR, ~$2.5M avg recovery. | HIPAA Journal 2025 Breach Report; RHRC (Univ. of Minnesota); Chief Healthcare Executive (HIMSS 2025) |
| `ai-clinical-decision-support-rural-hospitals-2026` | Technology | "14 rural deployments analyzed in a pre-publication report shared with HRSA Dec 2025," via "Texas's Lone Star AI Network." **Fabricated / unverifiable — entity and report do not check out.** | Rebuilt on real published evidence: Cleveland Clinic / Bayesian Health sepsis CDS (~10× fewer false positives, +46% sepsis cases identified); Dascena InSight (FDA-cleared); TREWS multisite study; Kenya AI Consult (16% diagnostic-error reduction); documented rural adoption gap. | NIH/PMC (PMC10498958, PMC10280361, PMC9289024); IntuitionLabs 2025 AI adoption |
| `telehealth-correction-economic-implications` | Economics | Framed Medicare telehealth waivers as **expiring / a payment "cliff."** **Stale premise.** | Corrected: Congress extended Medicare telehealth flexibilities through **Dec 31, 2027** (behavioral-health telehealth made permanent). Reframed the real cost as chronic *policy uncertainty* from short, last-minute extensions, plus a distinct RHC/FQHC rate-methodology problem. | telehealth.hhs.gov; Baker Donelson; Northwest AHEC/Wake Forest; NARHC; CMS Telehealth FAQ |
| `medicaid-dsh-rural-hospital-fiscal-collapse-2026` | Policy | Earlier draft: "DSH reductions legally in effect beginning FY2026." **Wrong.** (A self-correcting editor's note already existed; this pass finalized the status.) | Congress **eliminated** the DSH allotment reductions for **FY2026 and FY2027**; only the **FY2028 ~$8B** cut remains in statute (effective Oct 1, 2027 unless Congress acts). ACA scheduled ~$8B/yr (~$24B near-term exposure), delayed for over a decade. | CRS IF10422; AHA; American Action Forum (CAA 2026); CRFB |
| `alzheimers-drug-pipeline-costs` | Clinical | "ARIA occurs in roughly 20–30% of patients." **Imprecise / unsourced.** | Precise CLARITY-AD figures: ARIA-E ~12.6%, ARIA-H ~17.3%, rising to ~32.6% in APOE ε4 homozygotes. Added verified costs (lecanemab ~$26.5k/yr, donanemab ~$32k/yr; Medicare covers 80% of drug+MRI+infusion) and dosing (lecanemab q2wk, donanemab q4wk). | NIH/PMC (PMC12242126, PMC12470750); UW MBWC; Northwestern Mesulam Institute |
| `equity-broadband-digital-determinants` | Equity | "15% of the population is invisible to the digital system." **Unsourced round number.** | ~28% of **rural** residents (and ~24% in tribal areas) lacked broadband meeting the FCC 100/20 Mbps benchmark (2022); ~14.5M Americans lack telehealth-adequate speeds. Added the availability/affordability/adequacy/acceptability framing. | FCC; Rural Health Information Hub; NIH/PMC (PMC12052546); SHVS |
| `hospital-services-optimization-vermont-act-167-deep-dive` | Technology | "Commercial premiums rose 108% in six years, yet 9 of 14 hospitals operate at a loss." **Specific figures not verifiable as stated.** | Softened to confirmed data: premiums rose sharply over recent years; **six** Vermont hospitals lost money on operations in the latest GMCB reporting; Gifford operating margin ~−8.3% (2023) → −18.2% (2024). | Vermont Public; GMCB Hospital System Financial Report; GMCB Act 167 FAQ |
| `difficult-decisions-vermont-hospital-leaders` | Technology | Implied broad service-loss figures without source. | Anchored to verified GMCB data (six hospitals losing money; Gifford −18.2%; contract-labor + drug costs as drivers) and the GMCB's new authority to review/block service cuts (Rutland pediatric case). | Vermont Public; GMCB; healthcarereform.vermont.gov |

---

## Non-substantive fix (completeness, not accuracy)

| Briefs | Pillar | Issue | Fix |
|---|---|---|---|
| `vbc-fundamentals-module-2-policy-pillar`, `-3-economics-pillar`, `-4-technology-pillar`, `-5-clinical-equity-pillars` | Policy/Econ/Tech/Equity | Already 3.3–3.6k words with 42–45 inline source links, but lacked a literal **"Sources" heading** (so the audit flagged them). No accuracy problem. | Appended a consolidated "Sources" section to each (`frontend/scripts/append-vbc-sources.mjs`). Verified the linked URLs resolve. |

---

## How to extend this log

When a future edit corrects a published claim:
1. Add a row above with the brief `_id`, the old claim (and why it was wrong), the corrected
   value, and the verifying source.
2. Make the correction via a batch script using `frontend/scripts/lib/analysis-blocks.mjs`
   (it auto-backs up the prior doc to `/sanity-backups/` before patching — that backup is the
   primary evidence of the prior text).
3. Re-run `frontend/scripts/audit-analysis-length.mjs` and confirm the doc still PASSes.

> Backups of every pre-edit document body live in `/sanity-backups/backup-<id>-<timestamp>.json`.
> Those, plus this log and the git history, are the full provenance trail.
