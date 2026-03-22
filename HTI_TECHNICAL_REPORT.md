# Health Transformation Index — Technical Report
## Algorithm Design, Data Architecture, and Methodological Analysis

**Technical Brief | Q1 2026**

---

## Overview

The Health Transformation Review publishes two distinct composite indices:

1. **The Health Transformation Index (HTI)** — an institution-level and state-level scoring system (0–100 scale) that measures the degree of transformation across six structural dimensions of healthcare delivery.

2. **The HTR System Health Index (SHI)** — a macroeconomic composite index of the American healthcare economy, normalized to a Q4 2019 = 100 baseline, that tracks systemic sustainability across four market-level forces.

These are architecturally separate instruments with different data sources, calculation methods, and audiences. The HTI is the primary analytical tool for healthcare institutions, regions, and states evaluating transformation progress. The SHI is the macroeconomic gauge tracking system-wide structural health. This document covers both in full technical detail.

---

## Part I — The Health Transformation Index (HTI)

### 1.1 Conceptual Purpose

The HTI answers a single question: *How effectively is a healthcare institution, region, or state transforming toward a sustainable, high-quality, equitable care model?*

It synthesizes six structural dimensions into a single 0–100 composite score that enables:
- Benchmarking against national averages and leading-state performance
- Identification of domain-specific gaps and improvement priorities
- Longitudinal tracking of transformation momentum over time
- Projection of where an entity is headed based on current trajectory
- Comparison between institutions, regions, and states

The HTI is not a clinical quality score, a financial performance score, or a regulatory compliance score. It is a *transformation readiness and progress* instrument. An institution can have excellent financial margins and still score poorly on the HTI if it has not adopted value-based care models, addressed workforce wellness, or embedded equity measurement into operations.

---

### 1.2 The Six Domains and Weighting

The HTI is a weighted linear composite of six domain scores. Each domain score is independently calculated on a 0–100 scale. The composite is computed as:

```
HTI = Σ (domain_score_i × weight_i)
    = (Digital_Maturity × 0.20)
    + (Value_Based_Care × 0.15)
    + (Social_Determinants × 0.20)
    + (Clinical_Excellence × 0.20)
    + (Patient_Experience × 0.15)
    + (Workforce_Wellness × 0.10)
```

| Domain | Weight | Rationale |
|--------|--------|-----------|
| Digital Maturity | 20% | Interoperability, cybersecurity, and AI adoption determine whether transformation can scale. Without digital infrastructure, every other domain improvement remains local and fragile. |
| Value-Based Care | 15% | The payment model that determines whether clinical and operational transformation is financially sustainable. |
| Social Determinants | 20% | Equity is the ultimate accountability test. Systems that improve outcomes for high-margin patients while leaving disparities in place are not transforming — they are stratifying. |
| Clinical Excellence | 20% | Readmission rates, prevention quality indicators, and quality measure composites are the ultimate outcome accountability layer. |
| Patient Experience | 15% | Encompasses NPS, digital engagement, and patient-reported outcomes. Signals whether transformation is patient-centered. |
| Workforce Wellness | 10% | Labor costs are 55–65% of healthcare operating expense. Burnout, retention, and leadership diversity determine transformation sustainability. |

**Weight sum validation:** 0.20 + 0.15 + 0.20 + 0.20 + 0.15 + 0.10 = **1.00** ✓

**The exact implementation (`calcComposite()` function):**

```typescript
function calcComposite(m: Record<string, number>): number {
  return HTI_WEIGHTS.reduce((acc, w) => acc + (m[w.id] ?? 0) * w.weight, 0);
}
```

This is a straightforward dot product. Missing domain scores default to 0, which has the effect of depressing the composite — a conservative assumption that avoids inflating scores where data is unavailable.

---

### 1.3 Domain Sub-Metrics and National Benchmarks

Each domain is further decomposed into three sub-metrics that drive the domain score. The sub-metrics are used in the simulation interface for granular diagnosis. National benchmark values reflect current performance averages across US healthcare systems.

#### Domain 1: Digital Maturity (weight 0.20)

*"Interoperability, Cyber-resilience, AI Adoption"*

| Sub-Metric | National Benchmark |
|------------|-------------------|
| EHR Interoperability | 72 |
| AI Adoption Rate | 38 |
| Cyber Resilience Score | 65 |

**EHR Interoperability** measures the degree to which patient data flows bidirectionally between providers, payers, and patients — covering both technical interoperability (HL7 FHIR compliance, TEFCA participation) and clinical operationalization (actual provider use of received records). The national average of 72 reflects meaningful progress since the 21st Century Cures Act, but significant fragmentation persists.

**AI Adoption Rate** measures the percentage of operational workflows in which AI tools are actively deployed — clinical decision support, prior authorization automation, documentation assistance, and predictive risk modeling. The national average of 38 reflects early-majority adoption in administrative AI and pilot-stage adoption of clinical AI.

**Cyber Resilience Score** measures an organization's security posture: penetration testing frequency, HIPAA risk assessment currency, incident response plan testing, and staff security training completion. The national average of 65 reflects wide variance between large academic medical centers (typically 80+) and critical access hospitals (frequently below 50).

---

#### Domain 2: Value-Based Care (weight 0.15)

*"% revenue in risk-based contracts, APM penetration"*

| Sub-Metric | National Benchmark |
|------------|-------------------|
| % Revenue in Risk Contracts | 42 |
| Shared Savings Participation | 31 |
| ACO Attribution Rate | 28 |

**% Revenue in Risk Contracts** measures the share of total net patient revenue flowing through Alternative Payment Models — capitated contracts, global budgets, bundled payments, and shared savings arrangements with downside risk. 42% nationally represents meaningful penetration but still indicates a fee-for-service majority.

**Shared Savings Participation** measures the percentage of Medicare/Medicaid eligible patients whose care is attributed to a shared savings program (Medicare Shared Savings Program, AHEAD Model, state-level VBC contracts). At 31% nationally, adoption is growing but adoption barriers around actuarial risk, data infrastructure, and care management capacity remain significant.

**ACO Attribution Rate** measures the percentage of an organization's patient panel formally attributed to an Accountable Care Organization. At 28% nationally, this reflects the ACO movement's reach but also the dominance of uncoordinated fee-for-service in much of the country.

---

#### Domain 3: Social Determinants / Equity (weight 0.20)

*"Gini coefficient of outcomes, SDOH integration score"*

| Sub-Metric | National Benchmark |
|------------|-------------------|
| SDOH Integration Score | 48 |
| Racial Outcome Equity Gap | 55 |
| Rural-Urban Access Gap | 52 |

**SDOH Integration Score** measures systematic screening and intervention for social determinants: housing instability, food insecurity, transportation barriers, and social isolation. Specifically captures screening rate completeness, referral pathway formalization, and community health worker deployment per 1,000 patients. National average of 48 reflects wide variation between urban safety-net systems (often >70) and rural systems without CHW infrastructure (often <30).

**Racial Outcome Equity Gap** measures the divergence in key clinical outcomes — readmission rates, preventable hospitalization, chronic disease control — between White and non-White patient populations within the same system. Scored inversely (100 = no gap, 0 = maximum disparity). National average of 55 signals persistent and measurable racial disparities embedded in care delivery systems.

**Rural-Urban Access Gap** measures the differential in care access metrics (specialist wait times, preventive care utilization, ER-as-primary-care rates) between the rural and urban populations within a state or region. Scored inversely. National average of 52 signals a persistent structural access divide.

---

#### Domain 4: Clinical Excellence (weight 0.20)

*"Readmission rates, quality measures, PQI scores"*

| Sub-Metric | National Benchmark |
|------------|-------------------|
| 30-Day Readmission Rate | 76 |
| Preventable Hospitalization PQI | 68 |
| HEDIS Composite Score | 71 |

**30-Day Readmission Rate** is scored inversely: a lower readmission rate yields a higher sub-metric score. The national benchmark of 76 reflects the current CMS quality measurement baseline after a decade of Hospital Readmissions Reduction Program incentives.

**Preventable Hospitalization PQI** measures performance on AHRQ Prevention Quality Indicators — ambulatory care sensitive conditions (diabetes, hypertension, asthma, COPD) that should not require hospitalization if managed effectively in primary care. Scored inversely. National average of 68.

**HEDIS Composite Score** incorporates NCQA Healthcare Effectiveness Data and Information Set measures across preventive care, chronic disease management, and behavioral health integration. National average of 71.

---

#### Domain 5: Patient Experience (weight 0.15)

*"NPS, Digital engagement, PROMs, care access index"*

| Sub-Metric | National Benchmark |
|------------|-------------------|
| Patient NPS | 62 |
| Digital Engagement Rate | 58 |
| PROM Collection Rate | 44 |

**Patient NPS** (Net Promoter Score) measures the likelihood that patients would recommend the system, capturing loyalty and satisfaction beyond HCAHPS. National average of 62.

**Digital Engagement Rate** measures the percentage of patients actively using patient portal and digital communication tools — scheduling, messaging, results access, telehealth initiation. National average of 58.

**PROM Collection Rate** measures the percentage of eligible encounters in which Patient-Reported Outcome Measures are collected and integrated into care planning. At 44% nationally, this is the lowest-performing experience sub-metric — reflecting that while NPS and digital engagement have matured, systematic collection of patient-reported outcomes remains nascent at most institutions.

---

#### Domain 6: Workforce Wellness (weight 0.10)

*"Burnout index, retention rate, leadership diversity"*

| Sub-Metric | National Benchmark |
|------------|-------------------|
| RN Turnover Rate | 72 |
| Burnout Index | 58 |
| Leadership Diversity Score | 48 |

**RN Turnover Rate** is scored inversely: lower turnover yields a higher sub-metric score. National benchmark of 72 reflects that while turnover has declined from pandemic peaks, it remains elevated above sustainable levels for most health systems.

**Burnout Index** measures clinician burnout prevalence (scored inversely) using validated survey instruments — scored such that lower burnout = higher index. National benchmark of 58.

**Leadership Diversity Score** measures the representation of women, racial minorities, and clinician-trained leaders in senior management positions. National average of 48, indicating that C-suites remain less diverse than clinical workforces.

---

### 1.4 Status Classification Thresholds

HTI composite scores are mapped to four status classifications:

| Score Range | Status | Interpretation |
|-------------|--------|----------------|
| ≥ 78 | **Leading** | Ahead of national trajectory. A benchmark organization demonstrating transformation at scale. |
| 65 – 77 | **Improving** | Performing above national average with measurable momentum. Strategic priorities are producing results. |
| 50 – 64 | **Stable** | At or near national average. Progress exists but is uneven across domains. No acute crisis, but trajectory risk if momentum stalls. |
| < 50 | **At Risk** | Below national average on multiple dimensions. Structural vulnerabilities present. Requires urgent prioritization. |

**Threshold rationale:** The 78 threshold for "Leading" is set approximately one standard deviation above the national mean for well-managed health systems. The 65 threshold for "Improving" aligns with the national composite average at time of index inception. The 50 threshold for "At Risk" represents the midpoint of the scale — systems below this level are underperforming the majority of comparable institutions.

---

### 1.5 Level Presets — Hospital, Region, State

The HTI simulation engine supports three analysis levels, each with representative starting metrics that reflect the typical performance profile of that organizational unit. These presets are the defaults loaded when a user selects an analysis level — they are not fixed scores but starting points for simulation.

| Domain | Hospital Preset | Region Preset | State Preset |
|--------|----------------|---------------|--------------|
| Digital Maturity | 61 | 68 | 74 |
| Value-Based Care | 38 | 52 | 58 |
| Social Determinants | 34 | 41 | 42 |
| Clinical Excellence | 72 | 78 | 85 |
| Patient Experience | 65 | 67 | 70 |
| Workforce Wellness | 44 | 50 | 52 |
| **Composite** | **53.0** | **61.3** | **66.1** |

**Hospital-level characteristics:** High variance, typically lower VBC penetration (38) because individual facilities rarely hold payer risk directly. Digital maturity (61) reflects EHR deployment without enterprise interoperability. Social Determinants are lowest (34) because SDOH programs tend to be system-wide rather than facility-specific.

**Region-level characteristics:** Multi-county Health Service Area averages. Moderate across all dimensions. VBC at 52 reflects regional ACO structures and shared savings arrangements. Digital at 68 reflects more mature HIE adoption at the regional level.

**State-level characteristics:** Statewide aggregates smoothed by population size. Clinical Excellence is highest (85) at the state level because population-level preventive care utilization looks better in aggregate than at the facility level. VBC at 58 reflects states where Medicaid and public payer programs are in risk-based contracts.

**Composite by preset:**
- Hospital preset HTI: (61×0.20) + (38×0.15) + (34×0.20) + (72×0.20) + (65×0.15) + (44×0.10) = **53.0** (Stable, lower bound)
- Region preset HTI: (68×0.20) + (52×0.15) + (41×0.20) + (78×0.20) + (67×0.15) + (50×0.10) = **61.3** (Stable, upper bound)
- State preset HTI: (74×0.20) + (58×0.15) + (42×0.20) + (85×0.20) + (70×0.15) + (52×0.10) = **66.1** (Improving)

---

### 1.6 The National Excellence Benchmark

The radar chart in the simulation interface plots three reference series:

| Domain | National Average | National Excellence Benchmark |
|--------|-----------------|-------------------------------|
| Digital Maturity | 78 | 92 |
| Value-Based Care | 65 | 88 |
| Social Determinants | 57 | 85 |
| Clinical Excellence | 80 | 95 |
| Patient Experience | 76 | 90 |
| Workforce Wellness | 62 | 85 |

The **National Average** series reflects current (Q1-2025) national averages derived from the time-series data: Digital 78, VBC 65, Equity 57, Outcomes 80, Experience 76, Workforce 62.

The **National Excellence Benchmark** represents the performance profile of the top-quartile US health systems — organizations like Intermountain Health, Mayo Clinic, Kaiser Permanente, and the top-performing academic medical centers. These are aspirational but achievable targets.

The gap between an institution's score and the National Excellence Benchmark quantifies the transformation upside available in each domain.

---

### 1.7 The Trend Velocity Metric

For each state in the longitudinal dataset, trend velocity is calculated as:

```
TrendVelocity = last_composite_score - first_composite_score
```

For the 8 tracked states, this represents the cumulative composite score change from Q1-2023 to Q1-2025 (9 quarters):

| State | Q1-2023 | Q1-2025 | Velocity (9-quarter) |
|-------|---------|---------|----------------------|
| Massachusetts | 80 | 85 | +5 |
| Vermont | 76 | 82 | +6 |
| Minnesota | 74 | 80 | +6 |
| California | 70 | 77 | +7 |
| New York | 68 | 74 | +6 |
| Ohio | 60 | 67 | +7 |
| Florida | 55 | 61 | +6 |
| Texas | 52 | 58 | +6 |

**Interpretation:** Velocity is nearly uniform at +6 to +7 points over 9 quarters across all states — suggesting the current national trajectory produces roughly 0.67 points per quarter of improvement across institutional types. This is useful for establishing baseline improvement assumptions, but note that the uniformity also signals a modeling limitation (see Section 4 — Methodological Critique).

---

### 1.8 Linear Regression Projection Algorithm

For any state's time-series data, the system projects forward N quarters using Ordinary Least Squares (OLS) linear regression. The implementation:

```typescript
function projectScore(snapshots: QuarterlySnapshot[], quarters: number): number[] {
  const n = snapshots.length;
  if (n < 2) return [];

  // Assign integer time indices to each historical snapshot
  const xs = snapshots.map((_, i) => i);           // [0, 1, 2, ..., n-1]
  const ys = snapshots.map(s => s.composite);      // composite scores

  // OLS slope and intercept
  const sumX  = xs.reduce((a, b) => a + b, 0);
  const sumY  = ys.reduce((a, b) => a + b, 0);
  const sumXY = xs.reduce((a, x, i) => a + x * ys[i], 0);
  const sumX2 = xs.reduce((a, x) => a + x * x, 0);

  const slope     = (n * sumXY - sumX * sumY) / (n * sumX2 - sumX * sumX);
  const intercept = (sumY - slope * sumX) / n;

  // Project next N quarters
  return Array.from({ length: quarters }, (_, i) => {
    const projected = intercept + slope * (n + i);
    return Math.min(100, Math.max(0, Math.round(projected * 10) / 10));
  });
}
```

**Mathematical basis:** Standard OLS regression fitting a line Y = intercept + slope × X to historical data, then extrapolating X forward.

**Constraints:**
- Projected values are clamped to [0, 100] — preventing scores below zero or above the theoretical maximum
- Rounded to one decimal place
- Requires at least 2 data points

**Current projection horizon:** 4 quarters forward (Q2-2025 through Q1-2026)

**Example — Vermont projection:**
Vermont's 9-quarter series (composite 76→82) yields:
- Slope ≈ +0.75 per quarter
- Projected Q1-2026 ≈ 83.0 (clamped at 100, never triggered at this trajectory)

**Critical limitation:** A linear model assumes past velocity will continue unchanged. Healthcare transformation often shows S-curve dynamics — rapid early gains as "easy wins" are captured, followed by deceleration as structural barriers become harder to overcome. The linear projection will systematically overestimate scores for Leading institutions approaching ceiling effects.

---

## Part II — The HTR System Health Index (SHI)

### 2.1 Conceptual Purpose

The HTR SHI is a macroeconomic composite that measures whether the American healthcare economy as a whole is more or less structurally healthy than the pre-pandemic baseline. It is calibrated to **Q4 2019 = 100**.

- A current SHI above 100 indicates the system is structurally healthier than the 2019 baseline
- A current SHI below 100 indicates structural fragility relative to pre-pandemic conditions
- The SHI is not a clinical quality measure — it is an economic sustainability measure

---

### 2.2 The Four Components

```
SHI = (Provider_Stability × 0.40)
    + (Payer_Friction × 0.30)
    + (Patient_Access × 0.20)
    + (Innovation_Velocity × 0.10)
```

| Component | Weight | Data Sources |
|-----------|--------|-------------|
| Provider Stability | 40% | CMS cost reports, SEC filings (for-profit systems), BLS wage data, HTR Executive Panel survey |
| Payer Friction | 30% | Commercial payer denial rate data, CMS claims data, DSO reporting from health system quarterly filings |
| Patient Access | 20% | CMS survey data, BLS household survey, HTR survey of scheduling velocity |
| Innovation Velocity | 10% | CMS APM participation data, ONC interoperability reports, HTR Executive Panel innovation adoption survey |

---

### 2.3 Component Detail

#### Component 1: Provider Stability Score (40%)

*"A score below 100 indicates systemic fragility."*

**Operating Margin Spread**
The divergence between Academic Medical Center operating margins and Rural Independent Hospital margins. As AMC margins stabilize post-pandemic while rural hospitals continue margin compression, the spread widens — signaling systemic fragility. Data source: CMS Hospital Cost Reports (annual), supplemented by SEC 10-K filings for investor-owned systems.

**Labor Efficiency Ratio**
Net Patient Revenue divided by Total Labor Expense. Declining ratio = growing labor cost burden. This ratio has deteriorated significantly from 2019 as travel nurse premium labor and wage inflation drove labor costs up faster than revenue recovery. Data source: CMS Cost Report worksheets, BLS Occupational Employment Statistics.

**Why 40%:** Provider stability is the dominant weight because if the delivery system is financially insolvent, no other transformation initiative can succeed. Provider financial fragility is the rate-limiting constraint on healthcare transformation.

---

#### Component 2: Payer Friction Score (30%)

*"High friction reduces the overall index score."*

**The "Denial Drag"**
Initial claims denial rate across major commercial payers. Rising denial rates (which accelerated 2021–2024) create cash flow disruption, administrative cost burden, and care access barriers. Data source: Claims data aggregates from CMS, HTR Executive Panel CFO survey reporting denial rate trends.

**DSO Velocity**
Days Sales Outstanding — how long it takes for cash to move from payer authorization through payment posting to provider accounts. Longer DSO = higher administrative friction and working capital burden. Data source: Health system quarterly earnings reports (for publicly traded systems), HTR Executive Panel CFO survey.

**Why 30%:** Payer friction is the most immediately controllable structural variable. Denial rates and DSO are responsive to regulatory changes (No Surprises Act, CMS prior authorization rulemaking), making this the canary-in-the-coal-mine for policy intervention effectiveness.

---

#### Component 3: Patient Access Score (20%)

**Deductible Burden**
Average commercial deductible as a percentage of median household income. As deductibles have risen faster than incomes over the 2019–2025 period, the out-of-pocket burden creates a financial access barrier that suppresses utilization — leading to deferred care, preventable hospitalizations, and downstream cost acceleration. Data source: Kaiser Family Foundation Employer Health Benefits Survey (annual), BLS median household income.

**Appointment Velocity**
Mean wait time in days for net-new specialist referrals. Appointment velocity captures care access in a way that insurance coverage metrics miss — a patient may be insured but unable to access a specialist within a clinically meaningful timeframe. Data source: Merritt Hawkins annual physician wait time survey, HTR supplemental survey.

---

#### Component 4: Innovation Velocity (10%)

*This component is described in the methodology page but not further detailed in the public documentation. It measures the rate at which the system is adopting value-based care models and digital health infrastructure.*

Data sources include: CMS APM participation data (number of beneficiaries in risk-bearing models), ONC interoperability framework adoption data, and the HTR Executive Panel innovation adoption survey (n=50 CFOs rating adoption velocity in their institutions).

---

## Part III — Supplementary Analytics

### 3.1 State-Level Longitudinal Data (Q1-2023 through Q1-2025)

Eight states are tracked quarterly across all 6 HTI domains plus 14 supplementary metrics (7 clinical, 7 economic).

**Composite Trajectory — All 8 States**

| State | Q1-2023 | Q4-2023 | Q1-2025 | Status | Region |
|-------|---------|---------|---------|--------|--------|
| Massachusetts | 80 | 82 | 85 | Leading | Northeast |
| Vermont | 76 | 79 | 82 | Leading | Northeast |
| Minnesota | 74 | 77 | 80 | Leading | Midwest |
| California | 70 | 73 | 77 | Improving | West |
| New York | 68 | 71 | 74 | Improving | Northeast |
| Ohio | 60 | 63 | 67 | Improving | Midwest |
| Florida | 55 | 57 | 61 | Stable | South |
| Texas | 52 | 54 | 58 | Stable | South |
| **National Avg** | **61** | **64** | **69** | — | — |

---

### 3.2 Domain-Level Profiles — Q1-2025 Snapshot

| State | Digital | VBC | Equity | Outcomes | Experience | Workforce | **Composite** |
|-------|---------|-----|--------|----------|-----------|-----------|---------------|
| Massachusetts | 93 | 88 | 78 | 93 | 86 | 78 | **85** |
| Vermont | 90 | 88 | 75 | 88 | 82 | 76 | **82** |
| Minnesota | 86 | 80 | 73 | 88 | 84 | 75 | **80** |
| California | 90 | 78 | 63 | 80 | 78 | 68 | **77** |
| New York | 82 | 74 | 65 | 81 | 76 | 68 | **74** |
| Ohio | 73 | 64 | 57 | 76 | 70 | 62 | **67** |
| Florida | 68 | 58 | 48 | 70 | 66 | 58 | **61** |
| Texas | 67 | 52 | 44 | 68 | 65 | 54 | **58** |
| **National** | **78** | **65** | **57** | **80** | **76** | **62** | **69** |

**Key patterns:**
- **Equity is the lagging domain universally.** No state in the tracked cohort exceeds 78 on Social Determinants, even as Clinical Excellence reaches into the 80s and 90s. Texas (44) and Florida (48) are below the 50 threshold — At Risk on equity even if Stable overall.
- **Digital Maturity is the leading domain in most states.** California (90) and Massachusetts (93) lead on digital despite California lagging on equity and New York posting negative operating margins.
- **VBC and Equity are correlated.** States with higher value-based care penetration (Massachusetts 88, Vermont 88) also tend to have better equity scores. This reflects that global budget and shared savings models create financial incentives to address SDOH that fee-for-service does not.
- **Workforce is universally the lowest-weighted but structurally most fragile domain.** At 10% weight, workforce wellness has limited impact on the composite, but it represents the domain most likely to trigger systemic collapse if it deteriorates significantly.

---

### 3.3 Supplementary Clinical Metrics

These 7 metrics are tracked per-state alongside the HTI but are not components of the composite calculation. They provide clinical and epidemiological context that the HTI domains do not fully capture.

| Metric | Unit | Direction | National Benchmark |
|--------|------|-----------|-------------------|
| Preventable Hospitalization Rate | per 100k | Lower = better | 980 |
| Maternal Mortality Rate | per 100k live births | Lower = better | 23.5 |
| Cancer Screening Rate | % eligible patients | Higher = better | 69% |
| Mental Health Access Rate | % of need met | Higher = better | 52% |
| Primary Care Density | PCPs per 10k population | Higher = better | 13.2 |
| Opioid Overdose Deaths | per 100k | Lower = better | 22.4 |
| Uncompensated Care Ratio | % total hospital costs | Lower = better | 5.6% |

**State comparisons on selected metrics:**

| State | Prev. Hosp. | Maternal Mortality | Cancer Screening | Primary Care Density |
|-------|-----------|--------------------|------------------|--------------------|
| Massachusetts | 710 | 11.8 | 82% | 19.2 |
| Vermont | 820 | 14.2 | 78% | 16.4 |
| Minnesota | 760 | 13.0 | 80% | 17.1 |
| California | 880 | 22.8 | 74% | 14.8 |
| New York | 920 | 20.4 | 76% | 15.6 |
| Ohio | 1,040 | 24.8 | 68% | 12.4 |
| Florida | 1,100 | 28.6 | 64% | 11.2 |
| Texas | 1,240 | 34.2 | 60% | 9.4 |

**Ohio on opioids:** Ohio's opioid overdose death rate (42.6 per 100k) is nearly double the national average (22.4) and the highest in the tracked cohort — a stark signal that the HTI composite score (67, Improving) does not fully capture Ohio's catastrophic behavioral health burden.

**Texas on maternal mortality:** Texas's maternal mortality rate (34.2 per 100k) is among the highest in the nation and 46% above the national average. This is not captured in the HTI composite score in proportion to its severity.

---

### 3.4 Supplementary Economic Metrics

| Metric | Unit | National Reference |
|--------|------|--------------------|
| Spending Per Capita | USD annually | — |
| Medical Inflation Rate | % annual | — |
| Uninsured Rate | % population | — |
| Medicaid Expansion | Boolean | — |
| Hospital Operating Margin Avg | % | — |
| Payer Mix Commercial | % | — |
| Workforce Turnover Rate | % annual | — |

**State economic profiles:**

| State | Spending/Capita | Inflation | Uninsured | Op. Margin | Turnover |
|-------|----------------|-----------|-----------|-----------|---------|
| Massachusetts | $11,940 | 4.4% | 3.1% | +2.4% | 16.4% |
| Vermont | $10,820 | 4.1% | 4.2% | +1.8% | 18.2% |
| Minnesota | $9,840 | 3.9% | 4.8% | +3.1% | 17.1% |
| California | $10,240 | 5.2% | 6.2% | +0.8% | 22.4% |
| New York | $12,480 | 4.8% | 5.8% | -0.8% | 20.8% |
| Ohio | $8,920 | 4.6% | 7.2% | +0.6% | 21.4% |
| Florida | $8,680 | 5.4% | 13.6% | +0.2% | 24.2% |
| Texas | $8,120 | 5.8% | 18.4% | -0.4% | 26.8% |

**Notable patterns:**
- New York spends the most per capita ($12,480) but has negative operating margins (-0.8%) — the worst margin performance among tracked states. High spending does not translate to institutional financial sustainability.
- Texas has the lowest spending per capita ($8,120), highest uninsured rate (18.4%), and negative operating margins (-0.4%) — a triple indicator of structural fragility.
- Minnesota achieves the highest operating margin (3.1%) with below-average spending per capita ($9,840) — suggesting that value-based care penetration and workforce stability (lower turnover) do generate financial efficiency.

---

## Part IV — The Solvency Simulation Engine

### 4.1 Purpose

Distinct from the HTI, the Solvency Simulation models the financial trajectory of a healthcare institution or system facing transformation decisions. It is specifically designed to evaluate the 12-month financial impact of three strategic scenarios.

### 4.2 Model Architecture

```
Monthly Cash Position = Prior Month Cash
                      - Monthly Burn Rate
                      + Monthly Savings (if month > Implementation Lag)
```

If cash position reaches 0, it is floored at 0 (no negative cash modeled).

**Starting cash assumption:** $30M (configurable)

**Viability threshold:** Final cash position > $15M at month 12

### 4.3 The Three Scenarios

| Scenario | Title | Monthly Burn | Monthly Savings | Implementation Lag |
|----------|-------|-------------|-----------------|-------------------|
| `baseline` | Status Quo | $3.5M | $0 | 0 months |
| `aggressive` | Aggressive Consolidation | $3.5M | $5.5M | 3 months |
| `hybrid` | Regional Partnership | $3.5M | $3.8M | 6 months |

**Scenario outcomes from $30M starting position:**

**Status Quo (baseline):**
- Month 12 cash: $30M - (3.5M × 12) = **$30M - $42M = $0** (floored)
- Viable: **No** — institution runs out of cash before month 9
- Interpretation: No transformation action = financial deterioration to insolvency threshold within one year

**Aggressive Consolidation:**
- Months 1–3: Burn only. Cash after month 3: $30M - $10.5M = $19.5M
- Months 4–12: Net flow = $5.5M - $3.5M = +$2M/month
- Cash after month 12: $19.5M + (9 × $2M) = **$37.5M**
- Viable: **Yes** (>$15M threshold)

**Regional Partnership (hybrid):**
- Months 1–6: Burn only. Cash after month 6: $30M - $21M = $9M
- Months 7–12: Net flow = $3.8M - $3.5M = +$0.3M/month
- Cash after month 12: $9M + (6 × $0.3M) = **$10.8M**
- Viable: **No** — below $15M threshold
- Interpretation: Regional partnership generates insufficient savings to overcome the burn during the 6-month implementation lag. Final cash position is marginal and below threshold.

### 4.4 Solvency Model Critique

The solvency model is deliberately simple and pedagogical — it illustrates the structural tension between implementation lag and burn rate, not a real financial forecast. Key limitations:

- No revenue growth modeling (assumes flat revenue)
- No capital expenditure modeling
- No scenario for implementation failure or partial savings realization
- Burn rate assumed constant (real institutions have seasonality and discrete cost events)
- Savings assumed to arrive at full value immediately after lag (no ramp curve)

---

## Part V — Data Sources and Collection Methodology

### 5.1 Primary Data Sources

| Source | What It Provides | Update Frequency |
|--------|----------------|-----------------|
| **CMS Hospital Cost Reports** | Operating margins, labor costs, payer mix, uncompensated care | Annual (18-month lag) |
| **CMS Quality Measures** | Readmission rates, PQIs, HCAHPS scores | Annual |
| **CMS APM Participation** | ACO attribution, risk contract participation | Annual |
| **BLS Occupational Employment Statistics** | Workforce wage trends, turnover indicators | Annual/Quarterly |
| **BLS Household Survey** | Uninsured rates, income data for deductible burden calculation | Annual |
| **SEC 10-K Filings** | Operating margins for investor-owned health systems | Quarterly/Annual |
| **ONC Interoperability Reports** | EHR adoption, FHIR compliance, HIE participation | Annual |
| **NCQA HEDIS** | Preventive care and chronic disease management quality measures | Annual |
| **AHRQ Prevention Quality Indicators** | Preventable hospitalization rates | Annual |
| **KFF Employer Health Benefits Survey** | Deductible levels, premium costs | Annual |
| **HTR Executive Panel Survey** | 50 CFOs providing real-time operational intelligence | Quarterly |
| **HTR Editorial Research** | Synthesis, supplementary data, case study data | Continuous |

### 5.2 The HTR Executive Panel

The HTR Executive Panel (n=50 CFOs and CMOs) is the proprietary primary data source that differentiates the HTR Index from purely public-data composites. The panel provides:

- Quarterly survey data on operational metrics not captured in public filings (denial rates, DSO velocity, actual VBC contract percentages)
- Validation of model assumptions against lived institutional experience
- Early-signal intelligence on emerging trends 6–12 months before they appear in public data

The panel's 50-member size is sufficient for directional trending but not for sub-state geographic analysis. Panel composition (institution type, geography, system size) is not fully disclosed.

---

## Part VI — Methodological Critique and Recommendations

### 6.1 Current Methodology Strengths

**Comprehensive domain coverage.** The six-domain structure captures the full transformation landscape — technical, financial, clinical, experiential, equity-focused, and workforce dimensions. Most existing healthcare quality indices focus on clinical outcomes alone. The HTI explicitly models the enabling conditions for sustainable transformation, not just outcomes.

**Explicit weighting with documented rationale.** The weights are defined, visible, and explained. This is a significant methodological advance over "black box" composite indices where weights are obscured.

**Dual-layer structure.** The domain scores + sub-metrics architecture allows both high-level benchmarking (composite) and granular diagnostic use (sub-metrics). The simulation tool's ability to drill into specific sub-metrics gives the HTI practical utility beyond a single number.

**Linear projection with appropriate constraints.** The OLS projection is simple, transparent, and bounded. Avoiding neural network or ARIMA projections keeps the methodology auditable and avoids overfitting on a 9-quarter dataset.

**Trend velocity as a standalone metric.** Separating velocity from current-period score is methodologically important. A state with a score of 60 and velocity of +7 is in a fundamentally different strategic position than a state with a score of 65 and velocity of +1.

---

### 6.2 Current Methodology Weaknesses

**The Equity domain weight (20%) may be insufficient.** Given that the Social Determinants sub-index consistently shows the greatest national gap (lowest absolute scores across all states, widest variance), a 20% weight means a profoundly inequitable institution can still score "Improving" overall by performing well on Digital Maturity and Clinical Excellence. A health equity violation of this magnitude arguably warrants a floor constraint or non-compensatory threshold, not just a linear weight.

**Recommendation:** Introduce a hard floor rule: if the Social Determinants domain score is below 40, the overall status cannot be classified higher than "Stable" regardless of composite score. This prevents the methodological problem of equity-poor systems appearing to be improving simply by investing in digital infrastructure.

---

**Linear velocity assumption is structurally flawed for leading-state projections.** The OLS projection will systematically overshoot for Massachusetts and Vermont — states already in the "Leading" tier approaching the scoring ceiling. A state at 82 composite cannot grow at +0.75 points per quarter indefinitely toward 100. The actual trajectory is almost certainly decelerating as the marginal cost of improvement rises.

**Recommendation:** Replace the linear projection with a logistic (S-curve) growth model for states in the Leading tier. The formula:

```
projected_score = ceiling / (1 + e^(-k × (t - t_mid)))
```

where `ceiling` is the practical maximum (approximately 97–98, not 100), `k` is the steepness parameter calibrated to historical deceleration, and `t_mid` is the inflection point. This would require fitting 2–3 parameters per state, which is tractable given 9 quarters of data.

---

**The six domain scores currently have no objective measurement anchors.** A domain score of 72 on Digital Maturity means something qualitatively different from 72 on Value-Based Care, yet they are treated as equivalent in the composite formula. The scores are normalized to 0–100 but the underlying measurement scales are heterogeneous.

**Recommendation:** Publish explicit score-to-metric conversion tables for each sub-metric showing what a score of 50, 75, and 90 corresponds to in observable, objective terms (e.g., "Digital score 72 = EHR FHIR R4 compliant, 68% portal activation rate, no active breach in 24 months"). This converts the HTI from a relative ranking tool into an absolute progress measurement instrument.

---

**The Workforce domain weight (10%) understates its structural importance.** Workforce wellness is the domain most likely to trigger catastrophic system failure if it deteriorates significantly — a wave of RN departures can render a facility unable to staff beds, which is a clinically and financially existential event. The current 10% weight means workforce can deteriorate dramatically without substantially affecting the composite score.

**Recommendation:** Consider raising the Workforce weight to 15% while reducing either Digital Maturity or Value-Based Care by 5%. Alternatively, add a workforce-specific alarm threshold: if the Burnout Index sub-metric falls below 35 or the RN Turnover Rate sub-metric falls below 40, trigger a "Workforce Alert" flag on the dashboard regardless of composite score.

---

**The HTR Executive Panel (n=50) is too small and may be unrepresentative.** Fifty CFOs cannot represent the full diversity of the US healthcare system — which includes over 6,000 hospitals, 1 million+ physician practices, and thousands of community health centers. The panel is almost certainly biased toward large, sophisticated health systems that volunteer to participate in executive panels.

**Recommendation:** Expand the panel to 200+ members using a stratified random sampling approach that ensures representation across institution type (critical access, rural, urban safety net, academic medical center), geography (all census regions), payer mix, and system size. Publish panel composition statistics annually alongside the index.

---

**The solvency simulation uses fixed parameters that may not reflect institutional diversity.** A $3.5M/month burn rate is meaningful for a mid-sized regional health system but irrelevant for a 20-bed critical access hospital or a 1,000-bed academic medical center. The current model is pedagogical rather than analytical.

**Recommendation:** Allow users to input their own institution-specific burn rate, starting cash position, and expected savings parameters. This would transform the solvency tool from an illustration into an actionable planning instrument. The three scenarios (baseline, aggressive, hybrid) should remain as reference benchmarks but user-configurable parameters would make the simulation operationally useful.

---

**The performance-index data (five-pillar profiles) and the HTI data (six-domain scores) are structurally misaligned.** The performance index profiles use five pillars (Policy, Economics, Technology, Clinical, Equity) with three sub-metrics each. The HTI uses six domains (Digital Maturity, VBC, Social Determinants, Clinical Excellence, Patient Experience, Workforce Wellness). These are not the same measurement system, and presenting both creates the risk of user confusion about which is the authoritative composite.

**Recommendation:** Clarify in all user-facing documentation that the HTI (6 domains) is the primary composite score for institutional-level transformation measurement, while the 5-pillar performance index is a policy/systems-level diagnostic for state-level health reform readiness. These are complementary, not duplicative — but the relationship needs explicit articulation.

---

### 6.3 Priority Recommendations Summary

| Priority | Recommendation | Effort | Impact |
|----------|---------------|--------|--------|
| 1 | Introduce equity floor constraint (no "Improving" status if Equity < 40) | Low | High — prevents misleading scores |
| 2 | Publish objective score-to-metric conversion tables for all sub-metrics | Medium | High — converts relative ranking to absolute measurement |
| 3 | Replace linear projection with logistic model for Leading-tier states | Medium | Medium — improves projection accuracy at ceiling |
| 4 | Raise Workforce domain weight to 15% (reduce Digital or VBC by 5%) | Low | Medium — better reflects structural risk |
| 5 | Expand Executive Panel to 200+ with stratified sampling | High | High — addresses representativeness bias |
| 6 | Add workforce alarm threshold (Burnout < 35 or Turnover sub-metric < 40) | Low | Medium — prevents composite masking of critical workforce risk |
| 7 | Make solvency simulation parameters user-configurable | Medium | High — transforms pedagogical tool into operational planning tool |
| 8 | Formally document the HTI / 5-pillar distinction in all user-facing materials | Low | Medium — reduces user confusion about which index is authoritative |

---

## Part VII — National Benchmark Time Series (Q1-2023 through Q1-2025)

This is the reference series against which all state-level HTI scores are evaluated. The national benchmark composite has grown from 61 in Q1-2023 to 69 in Q1-2025 — a 9-quarter gain of 8 points, approximately 0.89 points per quarter.

| Quarter | Composite | Digital | VBC | Equity | Outcomes | Experience | Workforce |
|---------|-----------|---------|-----|--------|----------|-----------|-----------|
| Q1-2023 | 61 | 65 | 52 | 48 | 72 | 68 | 55 |
| Q2-2023 | 62 | 67 | 54 | 49 | 73 | 69 | 56 |
| Q3-2023 | 63 | 68 | 55 | 50 | 74 | 70 | 57 |
| Q4-2023 | 64 | 70 | 57 | 51 | 75 | 71 | 57 |
| Q1-2024 | 65 | 72 | 59 | 52 | 76 | 72 | 58 |
| Q2-2024 | 66 | 74 | 61 | 54 | 77 | 73 | 59 |
| Q3-2024 | 67 | 75 | 62 | 55 | 78 | 74 | 60 |
| Q4-2024 | 68 | 77 | 64 | 56 | 79 | 75 | 61 |
| Q1-2025 | 69 | 78 | 65 | 57 | 80 | 76 | 62 |

**Domain velocity over 9 quarters (national benchmark):**

| Domain | Q1-2023 | Q1-2025 | Change | Quarterly Rate |
|--------|---------|---------|--------|----------------|
| Digital Maturity | 65 | 78 | +13 | +1.44/quarter |
| Value-Based Care | 52 | 65 | +13 | +1.44/quarter |
| Social Determinants | 48 | 57 | +9 | +1.00/quarter |
| Clinical Excellence | 72 | 80 | +8 | +0.89/quarter |
| Patient Experience | 68 | 76 | +8 | +0.89/quarter |
| Workforce Wellness | 55 | 62 | +7 | +0.78/quarter |

Digital and VBC are moving fastest nationally (+13 points over 9 quarters each). Equity (Social Determinants) lags all other domains in absolute improvement (+9) despite starting from the lowest base — the structural barriers to closing outcome disparities are more resistant than digital infrastructure adoption.

---

## Appendix — Vermont-Specific Analysis

Vermont is the platform's primary case study state, given the AHEAD Model context and the $195M RHT award.

**Vermont Q1-2025 HTI Profile:**

| Domain | Vermont | National | Gap |
|--------|---------|---------|-----|
| Digital Maturity | 90 | 78 | +12 |
| Value-Based Care | 88 | 65 | +23 |
| Social Determinants | 75 | 57 | +18 |
| Clinical Excellence | 88 | 80 | +8 |
| Patient Experience | 82 | 76 | +6 |
| Workforce Wellness | 76 | 62 | +14 |
| **Composite** | **82** | **69** | **+13** |

Vermont's 23-point lead on Value-Based Care is the largest single-domain gap in the tracked cohort — reflecting the operational impact of Act 167, the AHEAD Model, and Vermont's decades-long investment in all-payer reform. This is the strongest evidence in the HTI dataset that legislative and payment reform policy (Pillar 1 × Pillar 2 interaction) can produce measurable transformation outcomes over a 5–10 year horizon.

Vermont's weakest relative performance is on Patient Experience (+6 gap) and Clinical Excellence (+8 gap) — not because Vermont underperforms nationally, but because these are the domains where national improvement has been fastest, narrowing the gap Vermont once had.

Vermont's status: **Leading** — with a 9-quarter velocity of +6 composite points and a projected Q1-2026 score of approximately 82.8, Vermont faces ceiling effects as it approaches the Leading tier's upper boundary.

---

*Health Transformation Review | Health Transformation Index Technical Report | Q1 2026*
*All data derived from HTR platform source code, CMS public datasets, BLS statistics, and HTR Executive Panel survey data.*
*For methodology questions: contact the HTR Research Team via the Advisory contact form.*
