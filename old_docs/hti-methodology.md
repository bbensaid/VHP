# HTI Methodology — Health Transformation Index

**Audience:** Data scientists, researchers, policymakers.
**Version:** 4.7.0 | **Updated:** April 2026
**Route:** `/hti-dashboard`

---

## Table of Contents

1. [Overview](#1-overview)
2. [Index Architecture](#2-index-architecture)
3. [Data Sources](#3-data-sources)
4. [Pillar Sub-Indexes](#4-pillar-sub-indexes)
5. [Composite Score Construction](#5-composite-score-construction)
6. [State Performance Index](#6-state-performance-index)
7. [Update Cadence](#7-update-cadence)
8. [Limitations & Interpretive Guidance](#8-limitations--interpretive-guidance)
9. [HTI Dashboard (Platform)](#9-hti-dashboard-platform)

---

## 1. Overview

The **Health Transformation Index (HTI)** is a composite metric that tracks the overall state of U.S. healthcare transformation across six analytical pillars: Policy, Economics, Technology, Clinical, Equity, and Operations. It produces:

- A **national composite score** (0–100) updated quarterly
- **Six pillar sub-indexes** (0–100 each)
- **State Performance Index scores** for all 50 states across six pillar dimensions

The HTI is designed to answer the question: *Is the U.S. healthcare system making progress toward transformation?* It is a macro-level tracking instrument, not an individual organization performance metric.

### Score Interpretation

| Score Range | Interpretation |
| --- | --- |
| 85–100 | Transformative leadership — sector is materially restructured |
| 70–84 | Advanced progress — significant structural change underway |
| 55–69 | Moderate progress — meaningful initiatives, incomplete adoption |
| 40–54 | Early stage — foundational activity with limited penetration |
| 0–39 | Pre-transformation — minimal structural change evident |

Vermont's current national composite sits at **82/100** (Q1 2026), making it one of the highest-scoring states overall while facing acute financial sustainability challenges — a finding that illustrates why HTI measures transformation *infrastructure maturity*, not financial health.

---

## 2. Index Architecture

```text
HTI National Composite (0–100)
│
├── Policy Sub-Index          (20% weight)
│   ├── APM Penetration Rate
│   ├── Medicaid Expansion Status
│   ├── Price Transparency Compliance
│   ├── Prior Authorization Reform
│   └── State Innovation Activity
│
├── Economics Sub-Index       (25% weight)
│   ├── VBC Contract Penetration
│   ├── Hospital Operating Margin (inverted risk)
│   ├── Payer Efficiency Ratio
│   ├── Healthcare Spend Growth vs. GDP
│   └── APM Shared Savings Performance
│
├── Operations Sub-Index      (10% weight)
│   ├── Administrative Overhead Rate
│   ├── Revenue Cycle Friction Index
│   └── Workforce Operational Stability
│
├── Technology Sub-Index      (15% weight)
│   ├── FHIR API Adoption Rate
│   ├── EHR Interoperability Score
│   ├── Telehealth Penetration
│   ├── AI Clinical Tool Deployment
│   └── Health IT Investment per Beneficiary
│
├── Clinical Sub-Index        (20% weight)
│   ├── Quality Composite (HEDIS/Stars)
│   ├── Preventable Hospitalization Rate
│   ├── Hospital Readmission Rate
│   ├── Patient Experience Score
│   └── Workforce Sufficiency Index
│
└── Equity Sub-Index          (10% weight)
    ├── Racial Disparity Index
    ├── Rural Access Score
    ├── SDOH Investment Rate
    ├── Uninsured Rate by Subgroup
    └── Community Health Worker Penetration
```

---

## 3. Data Sources

### Federal Data Sources

| Source | Data Elements | Update Frequency |
| --- | --- | --- |
| CMS Quality Payment Program (QPP) | APM participation, MIPS scores | Annual |
| CMS Innovation Center (CMMI) | CMMI model participation, shared savings | Annual |
| CMS Medicare Fee-for-Service | Quality measures, utilization | Quarterly |
| CMS Medicaid.gov | State Medicaid expansion, enrollment | Monthly |
| AHRQ HCUP | Hospital utilization, preventable admissions | Annual |
| ONC Health IT Dashboard | EHR adoption, interoperability measures | Annual |
| HRSA | HPSA designations, primary care workforce | Annual |
| CDC BRFSS | Behavioral risk factors, preventive care | Annual |
| Census Bureau ACS | Income, insurance, SDOH demographics | Annual |
| KFF State Health Facts | Insurance coverage, policy tracking | Monthly |

### Proprietary HTR Scoring

Some components are scored using HTR's proprietary assessment methodology rather than a single public data source:

- **State Innovation Activity** — HTR analysts score each state's legislative and regulatory innovation portfolio on a 0–10 scale, updated quarterly
- **Payer Innovation Leadership** — scored annually based on APM contracts disclosed, digital health programs, and equity reporting
- **Health IT Investment** — based on CMS innovation funding, ONC grants, and disclosed health system IT budgets

### Data Lag

Most federal data sources have 12–18 month reporting lags. HTR applies a **currency adjustment** for lagged data: metrics from the most recent available year are weighted at 100% of face value; data from two years prior is weighted at 85%; three years prior at 70%. This prevents the index from being dominated by stale data in high-lag components.

---

## 4. Pillar Sub-Indexes

### Policy Sub-Index (20% weight)

Tracks legislative and regulatory transformation across five components:

**APM Penetration Rate (30% of pillar)**
Percentage of total healthcare spending flowing through alternative payment models (two-sided risk or higher). Source: CMMI annual participation data + KFF.

Scale: 0–100, where 100 = ≥60% of spending in two-sided risk APMs.

---

**Medicaid Expansion Status (20% of pillar)**
Binary (0 or 100) for whether the state has adopted ACA Medicaid expansion, plus a partial credit score for states with partial expansion or active negotiations.

---

**Price Transparency Compliance (20% of pillar)**
CMS tracks hospital compliance with the Hospital Price Transparency Final Rule. Scored 0–100 based on share of hospitals with compliant machine-readable files.

---

**Prior Authorization Reform (15% of pillar)**
Scored 0–100 based on: state PA reform legislation, CMS Interoperability and PA Final Rule compliance, average PA approval time.

---

**State Innovation Activity (15% of pillar)**
HTR proprietary score assessing: active 1115 waivers, SIM grants, global budget programs, all-payer model participation, reinsurance programs.

---

### Economics Sub-Index (25% weight)

**VBC Contract Penetration (35% of pillar)**
Share of commercially insured and Medicaid beneficiaries in value-based payment arrangements (any tier, including P4P). Source: HCPLAN annual survey.

---

**Hospital Operating Margin Stability (20% of pillar)**
Inverse score — higher scores indicate more stable margins. Measured as percentage of hospitals with operating margin ≥ -2%. Source: CMS Cost Reports.

---

**Healthcare Spend Growth vs. GDP (25% of pillar)**
Ratio of healthcare expenditure growth to GDP growth. Score of 100 when healthcare grows ≤ GDP; 0 when growing at 2× GDP rate or higher. Source: CMS National Health Expenditure Accounts.

---

**APM Shared Savings Performance (20% of pillar)**
Net shared savings generated by CMS Innovation models as a percentage of benchmarked spend. Source: CMMI evaluation reports.

---

### Operations Sub-Index (10% weight)

Tracks the administrative and operational execution capacity of the U.S. healthcare system — the infrastructure layer that determines whether policy and clinical reforms can actually be carried out.

**Administrative Overhead Rate (35% of pillar)**
National administrative expenditures as a percentage of total healthcare spending, benchmarked against the prior-year baseline and international comparators. Lower overhead relative to prior periods scores higher. Source: CMS National Health Expenditure Accounts, Commonwealth Fund international comparisons.

---

**Revenue Cycle Friction Index (35% of pillar)**
National aggregate of clean claim submission rates, average days in accounts receivable, and denial rates across Medicare and Medicaid claims. Lower friction scores higher. Source: CMS cost reports, HFMA benchmark surveys.

---

**Workforce Operational Stability (30% of pillar)**
National composite of healthcare workforce turnover rates, clinical vacancy rates, and credentialing cycle times across key workforce categories. Higher stability scores higher. Source: HRSA workforce data, ACHE annual operational surveys, BLS Occupational Employment Statistics.

---

### Technology Sub-Index (15% weight)

**FHIR API Adoption (30% of pillar)**
Share of hospitals and clinics with certified FHIR R4 Patient Access and Provider Access APIs. Source: ONC Health IT Dashboard.

---

**EHR Interoperability Score (25% of pillar)**
Share of clinicians who send, receive, find, and integrate patient health information from outside their organization (ONC four-part interoperability). Source: AHA IT Supplement.

---

**Telehealth Penetration (25% of pillar)**
Share of eligible outpatient encounters delivered via telehealth (audio-visual). Source: CMS telehealth utilization data.

---

**AI Clinical Tool Deployment (20% of pillar)**
HTR proprietary score based on disclosed AI deployments by major health systems, FDA AI/ML-enabled device approvals, and survey data on clinical AI use.

---

### Clinical Sub-Index (20% weight)

**Quality Composite (35% of pillar)**
Weighted average of HEDIS commercial, Medicaid, and Medicare measures at national level. Source: NCQA Quality Compass.

---

**Preventable Hospitalization Rate (25% of pillar)**
AHRQ Prevention Quality Indicators (PQI) composite, inverted (lower PQI = higher score). Source: HCUP.

---

**Hospital Readmission Rate (20% of pillar)**
CMS hospital readmission reduction program composite. Source: CMS.

---

**Workforce Sufficiency Index (20% of pillar)**
Composite of primary care physician supply per 100,000 population and nursing vacancy rates. Source: HRSA, AHA Annual Survey.

---

### Equity Sub-Index (15% weight)

**Racial Disparity Index (35% of pillar)**
Composite gap score across five clinical measures comparing non-Hispanic white to Black and Hispanic populations. Source: NCQA HEQ measures, AHRQ National Healthcare Quality and Disparities Report.

---

**Rural Access Score (25% of pillar)**
Share of rural population within 30 minutes drive of primary care, emergency care, and OB/GYN services. Source: HRSA, USDA Rural-Urban Continuum.

---

**SDOH Investment Rate (20% of pillar)**
Per-capita social services spending relative to healthcare spending. Source: NYU Stern Global Center for Sustainable Business; state budget data.

---

**Uninsured Rate by Subgroup (20% of pillar)**
Focus on non-elderly, low-income, and minority uninsured rates. Scored 0–100 inverted (lower uninsured = higher score). Source: ACS.

---

## 5. Composite Score Construction

### Weighting

| Pillar | Weight | Rationale |
| --- | --- | --- |
| Policy | 20% | Sets the rules; slower-moving than other pillars |
| Economics | 25% | Financial incentives are the most powerful behavioral lever |
| Operations | 10% | Execution capacity; introduced at baseline weight as national data infrastructure matures |
| Technology | 15% | Enabler of all other transformation; reduced from 20% as Operations introduced |
| Clinical | 20% | Ultimate purpose — actual care delivery improvement |
| Equity | 10% | Critical cross-cutting lens; reduced from 15% pending improved national SDOH and algorithmic bias data coverage; scheduled for review in the 2027 methodology revision |

Weights are reviewed annually by HTR's methodology committee and may be adjusted as the transformation landscape evolves.

### Normalization

Each component is normalized to a 0–100 scale before pillar aggregation:

```text
Normalized Score = ((Raw Value - Min Benchmark) / (Max Benchmark - Min Benchmark)) × 100
```

Where:
- **Min Benchmark** = the value that represents pre-transformation baseline (score of 0)
- **Max Benchmark** = the value that represents leading-edge transformation (score of 100)

Benchmarks are set by HTR's methodology committee based on literature, CMS targets, and observed leading-edge state performance.

### Composite Calculation

```text
HTI = (Policy × 0.20) + (Economics × 0.25) + (Operations × 0.10) + (Technology × 0.15) + (Clinical × 0.20) + (Equity × 0.10)
```

### Trend Arrow Logic

The HTI Dashboard displays trend arrows (▲ ▼ —) based on quarter-over-quarter change:

| Change | Arrow |
| --- | --- |
| +1.5 or more | ▲ (improving) |
| -1.5 or less | ▼ (declining) |
| Between -1.5 and +1.5 | — (stable) |

---

## 6. State Performance Index

Each state receives a Performance Index (0–100) across six dimensions, displayed in the State Dashboard.

### Six Dimensions

| Dimension | Weight | Key Metrics |
| --- | --- | --- |
| **Performance Score** | Composite | Weighted average of all six dimensions below |
| **Cost Index** | — | Total healthcare spend per capita relative to national median (inverted) |
| **Quality Score** | — | HEDIS + Stars composite for commercial and Medicaid populations |
| **Access Score** | — | Uninsured rate, primary care supply, telehealth adoption |
| **Equity Score** | — | Racial disparity index + rural access + uninsured by subgroup |
| **Innovation Score** | — | APM penetration + VBC contracts + CMMI model participation |

### State Data Table (Sample)

| State | Performance Score | Cost Index | Quality Score | Access Score | Equity Score | Innovation Score |
| --- | --- | --- | --- | --- | --- | --- |
| Vermont | 82 | 1.18 | 78 | 73 | 81 | 85 |
| Massachusetts | 79 | 1.24 | 82 | 77 | 74 | 84 |
| Minnesota | 76 | 1.09 | 80 | 71 | 71 | 79 |
| Mississippi | 31 | 0.89 | 42 | 28 | 22 | 29 |

Note: The Cost Index is not inverted in the raw data — a cost index of 1.18 means 18% above national median. The State Dashboard inverts this for scoring purposes (lower cost = higher performance).

---

## 7. Update Cadence

| Component | Update Frequency | Next Update |
| --- | --- | --- |
| HTI National Composite | Quarterly | Q2 2026 (June) |
| Pillar Sub-Indexes | Quarterly | Q2 2026 (June) |
| State Performance Index | Semi-annual | Q3 2026 (September) |
| HTI Dashboard indicators | Real-time where available | Continuous |
| Methodology review | Annual | January 2027 |

---

## 8. Limitations & Interpretive Guidance

### What the HTI Is Not

- **Not a financial health indicator.** Vermont's high HTI score coexists with severe hospital financial distress — the index measures transformation infrastructure, not financial sustainability.
- **Not a quality ranking.** The HTI captures adoption of transformation mechanisms, not ultimate health outcomes. A state can score high by adopting APMs that have not yet improved outcomes.
- **Not an individual organization assessment.** The HTI applies to states and the national system. It should not be used to evaluate individual health systems, payers, or providers.

### Data Quality Considerations

- Federal data sources have inconsistent reporting requirements and voluntary vs. mandatory disclosure
- CMMI model participation data is precise; health system AI adoption data is based on disclosure and surveys
- Rural health data is less reliable than urban data due to small sample sizes in surveys
- Equity data is systematically less complete for smaller racial/ethnic subgroups

### Geographic Aggregation

State-level scores mask significant within-state variation. Vermont's urban-rural divide in access scores is larger than the state average suggests. Users analyzing specific geographies should supplement state scores with county-level data from AHRQ, CDC, and HRSA.

---

## 9. HTI Dashboard (Platform)

The HTI Dashboard at `/hti-dashboard` displays:

- **National HTI Score** — large composite display with trend arrow
- **System Vitals Ticker** — scrolling real-time indicators (APM penetration, VBC spend share, etc.)
- **Pillar Cards** — six cards showing each pillar sub-index with trend arrow and top-line summary
- **Methodology Link** — links to this document
- **Historical Trend** — quarterly HTI history chart

The dashboard is publicly accessible (no login required). All indicators reflect the most recent quarterly release.
