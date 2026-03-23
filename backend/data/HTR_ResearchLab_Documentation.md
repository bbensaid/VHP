# HTR Research Lab — Complete Technical & Functional Documentation

**Health Transformation Research (HTR)**
**Version:** 3.0 | **Date:** March 2026 | **Classification:** Internal + Public

---

## Table of Contents

1. [Executive Overview](#1-executive-overview)
2. [Architecture & Technology Stack](#2-architecture--technology-stack)
3. [Module Catalog — All 19 Tools](#3-module-catalog)
4. [Category Organization](#4-category-organization)
5. [Data & Calculation Reference](#5-data--calculation-reference)
6. [User Interface Patterns](#6-user-interface-patterns)
7. [Performance & Implementation Notes](#7-performance--implementation-notes)
8. [Use Cases by Role](#8-use-cases-by-role)
9. [Research Lab Roadmap](#9-research-lab-roadmap)

---

## 1. Executive Overview

The HTR Research Lab is a browser-based, interactive computational environment for health system researchers, policy analysts, health economists, clinicians, and technology strategists. It replaces the need for multiple standalone desktop tools (Excel models, SPSS, specialized actuarial software) with a unified, web-native platform that runs entirely in the browser — no downloads, no installations, no data upload to external servers.

### Design Philosophy
1. **Real calculations, not placeholders** — Every tool performs genuine computation. The Monte Carlo engine runs 1,000 stochastic iterations. The Markov chain models genuine disease state transitions. The FHIR builder generates valid R4 JSON.
2. **No external data required** — All tools work with inputs you provide via UI controls. No PHI, no HIPAA concerns.
3. **Production-grade UX** — Each tool is designed to match the quality of commercial SaaS health analytics products.
4. **Evidence-anchored** — Default values, benchmarks, and models are sourced from peer-reviewed literature, CMS data, AHRQ, and NCQA standards.

### Access
```
URL: http://[domain]/research-lab
```
No authentication required for base access. Client portal login unlocks saved workspace persistence and custom benchmark loading.

### Scale
- **19 interactive tools** across 6 functional categories
- **~1,200+ interactive UI controls** (sliders, dropdowns, toggles, number inputs, tabs)
- **~30,000+ lines of TypeScript/React** across all components
- **Zero external computation dependencies** — all algorithms run in browser JavaScript

---

## 2. Architecture & Technology Stack

### Frontend Framework
- **Next.js 14+** App Router with Server Components for page shells
- All 19 tool components are **Client Components** (`"use client"`)
- Dynamic imports with `ssr: false` in Client Components only (required by Next.js 16+)

### Page Architecture — 6 Separate Sub-Pages

The Research Lab is split into a landing hub + 6 independent category pages. **No longer a single scrolling page.**

```
/research-lab                          → Landing hub (Server Component, card grid)
/research-lab/interoperability         → FHIR Lab + Risk Stratification
/research-lab/payment-models           → APM Design Lab + APM Calculator + CEA Calculator
/research-lab/population-equity        → Population Health Modeler + Health Equity Studio
/research-lab/policy-quality           → Policy Simulator + Clinical Quality Optimizer +
                                         Hospital Financial Scorecard + HTA Studio + Actuarial Lab
/research-lab/technology-ai            → AI Analytics Lab + Digital Health Lab
/research-lab/knowledge-workspace      → Evidence Library + Workforce Modeler +
                                         Innovation Leaderboard + Research Workspace
```

Each sub-page follows the pattern:
```
/research-lab/[category]/
├── page.tsx              Server Component — exports metadata, renders client
└── [Category]Client.tsx  Client Component — dynamic imports with ssr:false, renders LabPageShell
```

### Shared Infrastructure Components

**`/components/research/LabPageShell.tsx`** — Client Component rendered by every sub-page. Provides:
- Top bar: "← Research Lab" back link + 6 category nav pills (flex-wrap, no horizontal scroll)
- Light gray page header with icon, title, description
- Children slot for the tools
- `LabAdvisoryCTA` — Advisory conversion funnel card (see Section 2a below)
- Prev/Next category navigation at bottom

Props:
```typescript
interface LabPageShellProps {
  icon: string
  label: string
  desc: string
  accentClass: string       // active nav pill color, e.g. "bg-indigo-600"
  accentLight: string       // badge color, e.g. "bg-indigo-100 text-indigo-700"
  currentHref: string       // used to highlight active nav pill + compute prev/next
  practiceHref: string      // advisory practice page link
  practiceLabel: string     // advisory practice name
  practiceIcon: string      // advisory practice emoji
  advisoryBullets: string[] // 3 bullets for the CTA card
  toolParam: string         // URL param passed to contact form
  children: React.ReactNode
}
```

**`/components/research/LabAdvisoryCTA.tsx`** — Advisory conversion funnel. Appears at the bottom of every sub-page above the prev/next nav. Contains:
- Headline: "You just modeled [category]. HTR Advisory can help you implement it."
- 3 category-specific implementation bullets
- Primary CTA: "Talk to an HTR Advisor →" → links to `/advisory/contact?from=research-lab&category=X&practice=Y`
- Secondary link to the specific advisory practice area page
- 3 quick-stat cards (5 days to proposal, 97% satisfaction, 35+ states)

### Component Import Pattern (in Client Components only)
```typescript
// e.g. /app/research-lab/interoperability/InteroperabilityClient.tsx
'use client'
import dynamic from 'next/dynamic'
import LabPageShell from '@/components/research/LabPageShell'

const FHIRLab = dynamic(() => import('@/components/research/FHIRLab'), { ssr: false })
const RiskStratificationEngine = dynamic(() => import('@/components/research/RiskStratificationEngine'), { ssr: false })
```

### Advisory → Research Lab Integration (ContactForm)
`/app/advisory/contact/ContactForm.tsx` reads URL params set by `LabAdvisoryCTA`:
- `?from=research-lab` — triggers a fuchsia referral banner at top of form
- `?category=` — shown in the banner ("You came from the Research Lab — Payment Models & VBC")
- `?practice=` — auto-selects the matching service in the dropdown via `PRACTICE_TO_SERVICE_ID` map
- Textarea placeholder is customized to prompt user to describe what they were modeling

### File Locations
All tool components live in:
```
/frontend/components/research/
├── LabPageShell.tsx               Shared sub-page shell with nav + Advisory CTA
├── LabAdvisoryCTA.tsx             Advisory conversion funnel card
├── FHIRLab.tsx                    (~1,675 lines, ~79KB)
├── RiskStratificationEngine.tsx   (~1,549 lines, ~69KB)
├── APMDesignLab.tsx               (~1,895 lines, ~64KB)
├── PopulationHealthModeler.tsx    (~1,693 lines, ~68KB)
├── HealthEquityStudio.tsx         (~1,380 lines, ~67KB)
├── PolicySimulator.tsx            (~780 lines, ~77KB)
├── ClinicalQualityOptimizer.tsx   (~1,767 lines, ~73KB)
├── HTAStudio.tsx                  (~2,227 lines, ~88KB)
├── AIAnalyticsLab.tsx             (~2,100 lines, ~85KB)
├── DigitalHealthLab.tsx           (~1,566 lines, ~66KB)
├── ActuarialLab.tsx               (~1,700 lines, ~69KB)
├── EvidenceLibrary.tsx            (~2,200 lines, ~92KB)
├── WorkforceModeler.tsx           (~1,800 lines, ~74KB)
├── ResearchWorkspace.tsx          (~1,900 lines, ~77KB)
├── InnovationLeaderboard.tsx      (~1,600 lines, ~65KB)
```

Plus 4 original tools (pre-expansion):
```
├── CostEffectivenessCalculator.tsx
├── PolicyImpactSimulator.tsx
├── QualityMeasureDashboard.tsx
├── VBCDesignTool.tsx
```

### State Management
- All tool state is managed with React `useState` and `useMemo`/`useCallback`
- No external state management library (no Redux, Zustand, Jotai)
- ResearchWorkspace uses `localStorage` for persistence across sessions

### Styling
- **Tailwind CSS v4** exclusively — no CSS files, no component libraries (no shadcn, no MUI)
- All charts and visualizations built with **pure CSS** (flex bars, CSS grid, width percentages)
- No Recharts, Chart.js, D3, or any charting library

### Icons
- **lucide-react** — used consistently across all 19 components

---

## 3. Module Catalog

---

### MODULE 01: FHIR Interoperability Lab
**File:** `FHIRLab.tsx` | **Category:** Interoperability & Standards

#### Sub-Tools (5 tabs):

**1.1 FHIR R4 Resource Builder**
- Builds complete, spec-compliant FHIR R4 JSON resources
- Supported resource types: Patient, Observation, Condition, MedicationRequest, Encounter, Procedure, DiagnosticReport, Coverage, Claim, Bundle
- Inputs: resource type selector, 8–15 dynamic fields per resource type
- Output: syntax-highlighted JSON with line numbers
- Syntax highlighting: custom `syntaxColorJson()` function — keys in blue, strings in green, numbers in orange, booleans in red, nulls in gray
- Resource builder function: `buildFhirResource(type, params)` — generates UUIDs, formats dates, constructs nested FHIR structures including `resourceType`, `id`, `meta.profile`, `text.status`, `text.div`

**Key generated resources include:**
- Patient: name (HumanName), gender, birthDate, address, telecom, identifier (MRN with system)
- Observation: subject reference, effectiveDateTime, valueQuantity with UCUM unit, LOINC code
- Condition: clinical/verification status coded values, onset, code with SNOMED CT
- MedicationRequest: medication reference, dosageInstruction with timing

**1.2 Terminology Mapper**
- Maps clinical codes across: ICD-10-CM, SNOMED CT, LOINC, RxNorm, CPT, NDC, HCPCS
- Lookup table of 50+ common clinical concepts with cross-system mappings
- Filter by source system and target system
- Display: table with code, display name, system, version, OID

**1.3 CDS Hooks Simulator**
- Simulates the CDS Hooks workflow (FHIR-based clinical decision support)
- Hook types: `patient-view`, `order-sign`, `order-select`, `medication-prescribe`
- Generates realistic hook request JSON (context + prefetch)
- Displays simulated CDS response cards (Summary, Indicator: info/warning/critical, Detail, Suggestions, Links)
- Demonstrates 5 pre-built CDS scenarios: opioid prescribing alert, diabetes A1c gap, drug-drug interaction, preventive care reminder, prior auth requirement

**1.4 Prior Authorization Workflow Simulator**
- Models the gold-carding and prior auth determination workflow
- Input: procedure code (CPT), payer, diagnosis (ICD-10), patient demographics
- Output: simulated PA determination (Approved/Pended/Denied), turnaround time estimate, appeal rights notice
- Demonstrates CMS 2024 Prior Auth Rule (FHIR-based PA via payer APIs)

**1.5 ONC Compliance Checker**
- Checklist of 21st Century Cures Act compliance requirements
- Categories: Information Blocking (8 conditions), Certification Criteria (ONC Health IT), USCDI v3 data elements
- Self-assessment tool: toggle compliance status per requirement
- Output: compliance score, gap list, remediation priorities

---

### MODULE 02: Risk Stratification Engine
**File:** `RiskStratificationEngine.tsx` | **Category:** Interoperability & Standards

#### Sub-Tools (4 tabs):

**2.1 HCC v28 RAF Calculator**
- Implements CMS HCC version 28 risk adjustment model
- 20 hierarchical condition categories across 9 accordion sections:
  - Diabetes (3 HCCs): HCC17 (Diabetes with Chronic Complications), HCC18, HCC19
  - Cardiovascular (4 HCCs): HCC85 (CHF), HCC86, HCC87, HCC88
  - Respiratory (3 HCCs): HCC110 (COPD), HCC111, HCC112
  - Renal (3 HCCs): HCC136 (ESRD), HCC137, HCC138
  - Neurological (3 HCCs): HCC18 (Quadriplegia), HCC71, HCC72
  - Cancer (2 HCCs): HCC8, HCC9
  - Mental Health (2 HCCs): HCC54, HCC55
  - Musculoskeletal (2 HCCs): HCC40, HCC41
  - Other (2 HCCs): HCC22, HCC23
- Age/Sex demographic adjustments (actual CMS coefficients by age band × sex)
- Dual-eligibility status adjustment
- Output: total RAF score, component breakdown, estimated Medicare revenue per member per year

**2.2 Population Risk Segmentation**
- Segments a defined population into 5 risk tiers
- Inputs: population size, prevalence of 8 chronic conditions, demographic mix
- Tier definition: Healthy (RAF <0.5), Low-Risk (0.5–0.9), Moderate (0.9–1.5), High (1.5–2.5), Complex (>2.5)
- Output: distribution chart, care management resource allocation recommendations

**2.3 Custom Risk Model Builder**
- Build a custom risk score from 1–10 user-defined variables
- 3 pre-built templates: Readmission Risk, ED Utilization Risk, Care Gap Risk
- Each variable: name, weight (0–100), threshold, direction (higher = more risk / lower = more risk)
- Composite score calculation (weighted sum, normalized 0–100)
- Sensitivity analysis: which variables drive score most?

**2.4 Comorbidity Matrix**
- 10×10 interactive comorbidity correlation matrix (toggle cell to mark co-occurrence)
- Pre-populated Elixhauser 30-condition comorbidity index
- Charlson Comorbidity Index (CCI) calculator — inputs 17 conditions, outputs CCI score and 10-year survival estimate
- Output: mortality risk percentile, recommended care intensity tier

---

### MODULE 03: Alternative Payment Model Design Lab
**File:** `APMDesignLab.tsx` | **Category:** Payment Models & VBC

#### Sub-Tools (4 tabs):

**3.1 APM Architecture Designer**
- Design the complete structure of an alternative payment model
- Parameters: model type (MSSP, ACO REACH, Bundled, PCMH, Global Budget, P4P, Shared Savings, Capitation), risk track, quality gate configuration
- **Benchmark methodology visualization:** CSS waterfall chart showing national trend adjustment → regional trend → efficiency corridor → quality adjustment → final benchmark
- **Natural-language recommendation engine:** Based on organization size, current quality performance, risk tolerance, and payer mix → generates 3-sentence plain-English recommendation for APM design choices

**3.2 Episode-Based Payment Designer**
- Design bundled payment episodes for 8 clinical episode types:
  1. Total Hip/Knee Replacement
  2. Coronary Artery Bypass Graft (CABG)
  3. Major Joint Replacement (lower extremity)
  4. Spinal Fusion
  5. Congestive Heart Failure (30-day)
  6. COPD/Pneumonia (30-day)
  7. Acute Myocardial Infarction (30-day)
  8. Hip Fracture
- Per episode: set trigger type, episode window (30/60/90 days), included services, reconciliation methodology
- Output: projected episode spend distribution, gainsharing/risk-sharing calculation, target price vs. actual comparison

**3.3 Global Budget Simulator**
- Vermont All-Payer Model (GMCB) simulator — 5-year total cost of care projection
- Inputs: base year TCOC, trend rate, efficiency targets by category (inpatient, outpatient, professional, pharmacy, post-acute)
- Per-Member Per-Month (PMPM) budget development
- Output: 5-year budget path with confidence intervals, comparison to fee-for-service trajectory, savings to payer/provider split

**3.4 Benchmark Methodology Comparison**
- Compare 4 benchmark approaches side-by-side:
  1. Historical expenditure trend (retrospective)
  2. Regional market reference pricing
  3. National Medicare FFS adjusted
  4. Prospective efficiency corridor (GMCB method)
- Input the same organization parameters → see how benchmark differs across methods
- Implications for provider financial performance by method

---

### MODULE 04: Population Health Modeler
**File:** `PopulationHealthModeler.tsx` | **Category:** Payment Models & VBC

#### Sub-Tools (4 tabs):

**4.1 Chronic Disease Progression (Markov Chain)**
- Real Markov chain disease state transition model
- 5 disease models × 5 states each:
  - **Diabetes:** Controlled → Uncontrolled → Complications → ESRD/Blindness/Amputation → Death
  - **CHF:** Mild (NYHA I) → Moderate (II) → Severe (III) → Advanced (IV) → Death
  - **COPD:** Mild (GOLD 1) → Moderate (2) → Severe (3) → Very Severe (4) → Death
  - **CKD:** Stage 1 → Stage 2 → Stage 3 → Stage 4 → Stage 5/ESRD
  - **Depression:** Mild → Moderate → Severe → Remission → Relapse
- Transition probabilities editable per cell (10×10 matrix UI)
- `runMarkov(initialState, transitions, years)` function: runs year-by-year matrix multiplication
- Output: cohort distribution across states at each year, total progression curve, intervention comparison (treated vs. untreated)

**4.2 Preventable Hospitalization & ED Modeler**
- AHRQ Prevention Quality Indicators (PQI) set implementation
- 13 PQI conditions: Diabetes short-term complications, COPD, Hypertension, CHF, Dehydration, Bacterial Pneumonia, Urinary Tract Infection, Angina, Uncontrolled Diabetes, LASIK, Lower-extremity amputation, appendix perforated, pediatric asthma
- Input: population denominator, current PQI rates, proposed intervention
- Output: estimated preventable hospitalizations, cost avoidance (CMS-calibrated cost per admission by condition), quality improvement opportunity

**4.3 Intervention Impact Library**
- 8 evidence-based population health interventions with ROI modeling:
  1. Diabetes Prevention Program (DPP) — CDC-recognized
  2. Transitional Care Management (TCM) — 30-day post-discharge
  3. Community Paramedicine — rural ED diversion
  4. Medication Adherence Program — pharmacy-based
  5. Chronic Care Management (CCM) — CMS billing code-supported
  6. Remote Patient Monitoring (RPM) — for CHF and hypertension
  7. Behavioral Health Integration — collaborative care model
  8. SDOH Navigation — community health worker program
- Per intervention: investment cost, reach (% population), effect size (literature-sourced), timeline to ROI
- Output: 5-year net financial projection, quality-adjusted life year (QALY) gain estimate

**4.4 SIR Epidemic Model**
- Classic Susceptible-Infectious-Recovered (SIR) model with HTR enhancements
- Dual simulation: Baseline (no intervention) vs. Vaccination campaign
- Parameters: population size (N), initial infected (I₀), transmission rate (β), recovery rate (γ), vaccination rate, vaccine efficacy
- Algorithm: Euler numerical integration, day-by-day for 90 days
  ```
  dS/dt = -(β × S × I) / N
  dI/dt = (β × S × I) / N - γ × I
  dR/dt = γ × I
  ```
- Output: dual-line chart (S, I, R curves for baseline vs. vaccinated), peak infection day, total infections, herd immunity threshold, vaccination breakeven point

---

### MODULE 05: Health Equity Studio
**File:** `HealthEquityStudio.tsx` | **Category:** Payment Models & VBC

#### Sub-Tools (4 tabs):

**5.1 Racial/Ethnic Disparity Calculator**
- Calculate disparities across 10 health outcomes × 5 racial/ethnic groups
- Outcomes: Preventable hospitalization, Diabetes control, Hypertension control, Prenatal care, Child immunization, Colorectal cancer screening, Mammography, Smoking cessation, Mental health treatment, ED utilization
- Groups: White NH, Black/AA NH, Hispanic/Latino, Asian/PI NH, AIAN NH
- Disparity metrics: Absolute difference (AD), Relative difference (RD), Population Attributable Risk (PAR)
- HEDIS stratification visualization (rate by group, reference line = top-performing group)

**5.2 Geographic Access Gap Analyzer**
- Input geographic area parameters: urban/suburban/rural classification, travel time to nearest PCP, specialist, hospital, pharmacy
- Calculate access scores against HRSA Health Professional Shortage Area (HPSA) thresholds
- Rural health shortage index: composite of provider supply, distance, insurance coverage
- Maps access gaps to recommended interventions: FQHC, telehealth, community health worker, mobile clinic

**5.3 SDOH Composite Scoring & ROI**
- 5 SDOH domain scoring (AHC Health-Related Social Needs model):
  1. Housing Instability
  2. Food Insecurity
  3. Transportation Barriers
  4. Utility Difficulties
  5. Interpersonal Safety
- Input: screening positive rate per domain, population size, cost of intervention per domain
- Output: composite SDOH burden score, estimated downstream cost avoidance, intervention ROI by domain

**5.4 Equity-Weighted ICER Calculator (HEROI)**
- Health Equity Return on Investment (HEROI) metric — HTR proprietary
- Standard ICER adjusted for equity weighting
- Equity weight factors: proportion of intervention reaching underserved population, disparity reduction magnitude, SDOH co-benefit score
- Formula: `HEROI = ICER × (1 / equity_weight)` — more equitable interventions show lower HEROI (better value)
- Comparison: standard ICER vs. HEROI side-by-side

---

### MODULE 06: Policy Simulator
**File:** `PolicySimulator.tsx` | **Category:** Policy & Quality Sciences

#### Sub-Tools (4 tabs):

**6.1 1115 Waiver Modeler**
- Model the financial and coverage impact of 7 1115 waiver types:
  1. Medicaid expansion (Section 1902(a)(10)(A)(i)(VIII))
  2. Work requirements (controversial — shows coverage loss)
  3. Presumptive eligibility expansion
  4. Substance Use Disorder (SUD) institution exclusion waiver
  5. Premium/cost-sharing demonstration
  6. Delivery system reform incentive pool (DSRIP)
  7. Community Engagement / SDOH pilot
- 6 state scenarios with pre-loaded parameters
- Outputs: enrollment impact, federal FMAP implications, state fiscal impact, estimated outcomes (hospitalizations averted, SUD treatment access)

**6.2 All-Payer Global Budget Designer**
- Vermont-style all-payer budget design tool
- 10-year projection model
- Inputs: base year total medical expenditure by payer (Medicare, Medicaid, Commercial, Self-pay), annual budget growth cap, efficiency targets
- PMPM calculation by payer
- Budget reconciliation mechanics: surplus/deficit sharing, quality bonuses, withhold structure
- Comparison to CMS national trend projection

**6.3 Medicaid Expansion Impact Calculator**
- 10 non-expansion state scenarios (pre-loaded)
- Model impact of expansion on: newly eligible population (size and demographics), federal revenue, state cost, hospital uncompensated care reduction, rural hospital viability
- Sources: KFF Medicaid expansion data, CBO scoring methodology, SHADAC estimates

**6.4 Price Transparency & Site-Neutral Analyzer**
- Model impact of CMS price transparency rules and site-neutral payment policies
- Compare hospital outpatient department (HOPD) vs. physician office rates for 20 common services
- Calculate site-of-care cost differential
- Estimate savings to payers and patients if site-neutral applied across services

---

### MODULE 07: Clinical Quality Optimizer
**File:** `ClinicalQualityOptimizer.tsx` | **Category:** Policy & Quality Sciences

#### Sub-Tools (4 tabs):

**7.1 HEDIS Simulator**
- 15 HEDIS measures with 50th and 90th percentile benchmarks (NCQA HEDIS Benchmarks 2024):
  - Breast Cancer Screening (BCS)
  - Colorectal Cancer Screening (COL)
  - Controlling Blood Pressure (CBP)
  - Comprehensive Diabetes Care — A1c Good Control (CDC-H)
  - Child/Adolescent BMI Assessment (WCC)
  - Antidepressant Medication Management — Continuation Phase (AMM)
  - Follow-Up After Hospitalization for Mental Illness (FUH)
  - Diabetes Monitoring for People with Diabetes and Schizophrenia (SMD)
  - Annual Monitoring for Patients on Persistent Medications (MPM)
  - Medication Reconciliation Post-Discharge (MRP)
  - Plan All-Cause Readmissions (PCR)
  - CAHPS: Getting Care Quickly
  - CAHPS: Getting Needed Care
  - CAHPS: Customer Service
  - CAHPS: Rating of Health Plan
- For each measure: input current rate → shows gap to 50th/90th percentile, intervention options, estimated improvement timeline
- Aggregate HEDIS composite score (weighted average)

**7.2 CMS Star Ratings Predictor**
- 5 Star Rating domains × 32 sub-measures
- Domains: Staying Healthy (screenings/tests/vaccines), Managing Chronic Conditions, Member Experience (CAHPS), Member Complaints & Changes, Drug Plan Quality
- Each sub-measure: current performance → predicted star score (1–5) using cut-point lookup tables
- Aggregate prediction: Part C Star, Part D Star, Overall Star
- "What-if" analysis: which 3 measure improvements would most increase Overall Star?

**7.3 QPP/MIPS Optimizer**
- 4 MIPS performance categories with 2024 weights:
  - Quality: 30%
  - Promoting Interoperability: 25%
  - Improvement Activities: 15%
  - Cost: 30%
- 15 quality measures to choose from (select 6 for submission)
- PI measures: pre-populated with ONC certified EHR requirements
- Improvement Activities: select from 20 activities (medium = 10 pts, high = 20 pts, max 40 pts)
- Cost: calculated from Medicare Part B claims (input TCOC PMPM)
- Output: composite MIPS score, performance threshold comparison (70 exceptional, 75 exceptional performance bonus), payment adjustment estimate (+/- %)

**7.4 P4P ROI Calculator**
- Design a Pay-for-Performance program
- Inputs: measurement set, bonus pool size, attribution methodology, performance threshold design (top decile, improvement from baseline, absolute threshold)
- Output: estimated provider distribution, budget adequacy analysis, expected quality improvement, net ROI (quality improvement value vs. bonus expenditure)

---

### MODULE 08: HTA Studio (Health Technology Assessment)
**File:** `HTAStudio.tsx` | **Category:** Technology & AI in Health

#### Sub-Tools (4 tabs):

**8.1 Budget Impact Model Builder**
- 5-year budget impact model following ISPOR guidelines
- 3 uptake scenarios: Conservative, Base Case, Optimistic
- Per scenario: market penetration curve by year (S-curve or linear), uptake rate
- Cost inputs: intervention cost, comparator cost, administration cost, offset savings
- Clinical inputs: population size, condition prevalence, eligible proportion
- Output: annual incremental budget impact, cumulative 5-year BIM, cost per patient treated vs. comparator

**8.2 Multi-Criteria Decision Analysis (MCDA)**
- MCDA framework for health technology decisions
- 8 decision criteria:
  1. Clinical Effectiveness
  2. Safety Profile
  3. Patient-Reported Outcomes
  4. Economic Value (ICER)
  5. Budget Impact
  6. Implementation Feasibility
  7. Health Equity Impact
  8. Innovation Potential
- 3 intervention alternatives (configurable names)
- Weight each criterion (0–100, auto-normalizes to sum to 1.0)
- Score each alternative per criterion (0–10)
- Output: weighted composite score, 2×2 decision grid (value vs. feasibility), ranking with score breakdown

**8.3 Monte Carlo Probabilistic Sensitivity Analysis (PSA)**
- **Real stochastic simulation — 1,000 iterations** — not a placeholder
- Parameter distributions:
  - **Beta distribution** — for rates and probabilities (uses Johnk's method in pure JavaScript)
  - **Log-normal distribution** — for costs and resource use (uses Box-Muller transform)
  - **Gamma distribution** — for utility weights and positive-skewed parameters (uses Marsaglia-Tsang method)
  - **Normal distribution** — for continuous parameters (Box-Muller transform)
- JavaScript implementation: runs via `setTimeout` batching (50 iterations per tick) to keep UI responsive during computation
- Progress bar displayed during simulation
- Outputs:
  - Cost-effectiveness plane scatter plot (incremental cost vs. incremental QALY, 1,000 points)
  - Cost-Effectiveness Acceptability Curve (CEAC) — % of simulations cost-effective at each WTP threshold ($0–$200K/QALY)
  - Distribution of ICER values (mean, median, 95% credible interval)
  - Net Monetary Benefit (NMB) at user-defined WTP threshold

**8.4 Threshold & Surrogate Analysis**
- WTP threshold sensitivity: how does cost-effectiveness decision change across $50K–$200K/QALY thresholds?
- Surrogate endpoint validation: input surrogate-to-clinical outcome correlation coefficient → calculates reliability-adjusted ICER
- Breakeven analysis: at what clinical effect size does intervention become cost-effective?

---

### MODULE 09: AI Analytics Lab
**File:** `AIAnalyticsLab.tsx` | **Category:** Technology & AI in Health

#### Sub-Tools (4 tabs):

**9.1 Predictive Model Performance Comparator**
- Compare up to 3 ML models side-by-side
- Performance metrics displayed: AUC-ROC, Sensitivity, Specificity, PPV, NPV, F1 Score, Brier Score
- Calibration plot (predicted probability vs. observed frequency)
- Clinical utility curves (net benefit at different decision thresholds)
- Model types supported: Logistic Regression, Random Forest, XGBoost, Neural Network, LASSO, Ridge

**9.2 Algorithmic Bias Detector**
- Fairness metrics across demographic subgroups (race, sex, age group, insurance type)
- Implemented fairness criteria:
  - **Demographic Parity:** P(Ŷ=1|A=0) = P(Ŷ=1|A=1)
  - **Equal Opportunity:** P(Ŷ=1|Y=1,A=0) = P(Ŷ=1|Y=1,A=1)
  - **Predictive Parity:** P(Y=1|Ŷ=1,A=0) = P(Y=1|Ŷ=1,A=1)
  - **Calibration Within Groups:** expected vs. observed within each subgroup
- Bias detection threshold: flagged if ratio <0.80 or >1.25 (EEOC 4/5ths rule adapted)
- Mitigation strategies recommended per bias type (pre-processing, in-processing, post-processing)

**9.3 Clinical AI Governance Framework Builder**
- 6 governance domains × 22 assessment questions:
  1. Data Governance (5 questions): data lineage, consent, representativeness, drift monitoring, access controls
  2. Model Development (4): validation methodology, held-out test set, subgroup analysis, explainability
  3. Clinical Validation (4): prospective study, IRB review, clinician workflow integration, safety monitoring
  4. Deployment & Monitoring (4): alerting thresholds, human-in-the-loop requirements, rollback procedure, performance degradation detection
  5. Equity & Ethics (3): disparate impact assessment, ethics review board, patient notification
  6. Regulatory Compliance (2): FDA SaMD classification, ONC certification status
- Scoring: Compliant / Partial / Gap per question
- Output: governance maturity heatmap, gap priority list, policy template generation

**9.4 AI ROI & Build vs. Buy Calculator**
- Total Cost of Ownership (TCO) comparison: build in-house vs. buy vendor solution vs. hybrid
- Cost categories: development/licensing, implementation, training, maintenance, infrastructure, opportunity cost
- Benefit categories: staff time savings, error reduction, quality improvement, revenue optimization
- **AI Scribe Sub-Calculator:** Specific ROI model for ambient AI documentation tools
  - Inputs: number of physicians, current documentation time per day, hourly cost, subscription cost per physician per month
  - Output: annual net savings, payback period, 5-year NPV
- 5-year NPV comparison across all three build/buy options

---

### MODULE 10: Digital Health Lab
**File:** `DigitalHealthLab.tsx` | **Category:** Technology & AI in Health

#### Sub-Tools (4 tabs):

**10.1 Remote Patient Monitoring (RPM) ROI Calculator**
- Full CMS CPT reimbursement model for RPM:
  - **99453:** Device setup and patient education — $19.24 (once)
  - **99454:** Device supply and transmission — $53.68/month (≥16 days data)
  - **99457:** RPM treatment management, first 20 min — $48.46/month
  - **99458:** RPM treatment management, additional 20 min — $40.80/month
- 6 condition modules: Hypertension, CHF, Diabetes, COPD, Atrial Fibrillation, Post-Surgical
- Per condition: evidence-based hospitalization reduction rate, ED reduction rate, clinical outcome improvement
- Input: number of patients enrolled, payer mix, device cost, staff FTE for monitoring
- Output: monthly revenue, annual revenue, device/staff cost, net margin, payback period

**10.2 Telehealth Utilization Modeler**
- CMS Pre-COVID vs. Post-PHE policy comparison toggle
- Policy environment simulator: which services are billable, at what parity level
- Modeled service types: Primary care visit, Mental health, Substance use disorder, Chronic care management, Annual wellness visit, Specialist consultation
- Input: patient panel size, telehealth adoption rate by service, current no-show rate, payer mix
- Output: visit volume shift, revenue impact, patient access improvement (new patients reached), cost avoidance (travel, time)

**10.3 Patient Engagement Platform Comparison**
- Patient Activation Measure (PAM) model implementation
- 4 PAM activation levels (1=Disengaged, 2=Aware, 3=Taking Action, 4=Maintaining)
- Distribution of population across PAM levels (adjustable)
- 5 platform types: Patient Portal (basic), Patient Portal (advanced), mHealth App, Conversational AI, Comprehensive Care Navigation Platform
- Per platform: PAM level shift by cohort, cost per member per month, quality outcome correlation
- Output: predicted quality score change, estimated readmission reduction, ROI at 3 and 5 years

**10.4 EHR Optimization & Interoperability ROI**
- Current-state EHR burden assessment: clicks per note, documentation time per visit, alert fatigue rate
- Optimization interventions: Note templates, Smart order sets, BPA de-duplication, Ambient AI documentation, FHIR bulk export, Care gap integration
- Per intervention: implementation cost, FTE time reduction, alert reduction rate, documentation time savings
- Interoperability sub-module: cost of manual care transitions vs. automated FHIR-based care coordination
- Output: annual staff time savings (hours and dollars), physician burnout risk reduction, quality improvement potential

---

### MODULE 11: Actuarial Lab
**File:** `ActuarialLab.tsx` | **Category:** Policy & Quality Sciences

#### Sub-Tools (4 tabs):

**11.1 Actuarial Value Calculator**
- ACA metallic tier AV calculation per CMS AV Calculator methodology
- Standard cost-sharing inputs: deductible (individual/family), in-network out-of-pocket maximum, coinsurance rate, copays (PCP, specialist, ED, inpatient)
- Claims simulation: runs synthetic plan design through representative utilization distribution
- Output: calculated AV percentage, metallic tier classification (Bronze 60%, Silver 70%, Gold 80%, Platinum 90%), compliance status

**11.2 Premium Rating Workbench**
- 3 rating methodologies:
  1. **Community Rating** (pure): single rate for all members
  2. **Modified Community Rating** (ACA): age 3:1 ratio allowed, tobacco surcharge allowed
  3. **Experience Rating** (self-insured): group-specific claims history adjusted
- Age rating curve: ACA-standard 1.0–3.0 multipliers by age band (0–20 through 64+)
- Inputs: base premium, group demographics, claims experience, administrative load, profit margin
- Output: premium by age band, rate filing summary, affordability analysis (% FPL for benchmark silver plan)

**11.3 Adverse Selection Death Spiral Model**
- 5-year dynamic simulation of adverse selection in an insurance market
- Starting parameters: risk pool composition, premium level, cost trend, risk adjustment mechanism
- Year-over-year logic: healthier enrollees exit as premiums rise → remaining pool sicker → premiums rise further
- Risk adjustment dampening: modeled as partial mitigation
- Output: 5-year enrollment trajectory (healthy vs. sick), premium escalation path, probability of market collapse (zero healthy enrollment)
- Policy interventions to test: risk adjustment strengthening, reinsurance program, individual mandate penalty

**11.4 Medicare Drug Pricing IRA 2022 Calculator**
- Inflation Rebate Calculator: input drug, launch price, CPI-U since launch → calculates rebate amount
- Medicare Price Negotiation Estimator: for drugs eligible in 2026–2029 cycles, estimate negotiated price discount range (ICER-based)
- Out-of-Pocket Cap Impact: model the $2,000 Part D OOP cap (effective 2025) → enrollment impact, gross-to-net implications for manufacturers

---

### MODULE 12: Evidence Library
**File:** `EvidenceLibrary.tsx` | **Category:** Knowledge & Workspace

#### Sub-Tools (3 tabs):

**12.1 CEA/CUA Study Database**
- 25 landmark cost-effectiveness studies searchable and filterable
- Study metadata: intervention, comparator, population, ICER ($/QALY), study design, sample size, time horizon, perspective, source journal, year
- Filter by: disease area, ICER threshold range, study design, publication year range
- Sort by: ICER, year, evidence quality
- Each study expandable with abstract-level summary and key clinical/economic findings
- WTP threshold comparison line (default $100K/QALY, adjustable)

**12.2 CMMI Innovation Center Model Tracker**
- 20 CMMI models tracked (past, current, discontinued):
  1. MSSP (Multiple Tracks → Pathways to Success → Enhanced)
  2. ACO REACH (formerly Global/Professional DC)
  3. Comprehensive Primary Care Plus (CPC+)
  4. Primary Care First (PCF)
  5. Bundled Payments for Care Improvement Advanced (BPCI-A)
  6. Oncology Care Model (OCM)
  7. ESRD Treatment Choices (ETC)
  8. Making Care Primary (MCP)
  9. Kidney Care Choices (KCC)
  10. Radiation Oncology Model (ROM) — discontinued
  11. Vermont All-Payer Model
  12. Maryland Total Cost of Care (TCOC) Model
  13. Pennsylvania Rural Health Model
  14. Integrated Care for Kids (InCK)
  15. Financial Alignment Initiative (FAI)
  16. Community Mental Health Centers (CMHC)
  17. Independence at Home
  18. Graduate Medical Education (GME) Demonstration
  19. State Innovation Models (SIM)
  20. Strong Start for Mothers and Newborns
- Per model: model type, participants, financial arrangement, performance period, key results, status, lessons learned (250+ words each)

**12.3 Policy Brief Library**
- 15 policy briefs on key health transformation topics:
  1. Vermont Act 167 Community Engagement Implementation
  2. FHIR-Based Prior Authorization: CMS Rule Analysis
  3. Medicare Advantage Risk Adjustment Reform
  4. Medicaid Work Requirements: Evidence Review
  5. AI Governance in Clinical Decision Support
  6. Rural Hospital Financial Sustainability
  7. Pharmacy Benefit Manager (PBM) Transparency Reform
  8. Surprise Billing and No Surprises Act Implementation
  9. Mental Health Parity Enforcement Update
  10. SDOH Data Standardization for Value-Based Care
  11. ACO REACH Program: Year 2 Performance Analysis
  12. Site-Neutral Payment Policy: Economic Impact
  13. Hospital Price Transparency Compliance Landscape
  14. State All-Payer Claims Database (APCD) Policy Guide
  15. Health Equity Measurement: Federal Framework Update
- Each brief: Title, Date, Author(s), 5 key findings, 250-word full-text summary (expandable inline), download link

---

### MODULE 13: Workforce Modeler
**File:** `WorkforceModeler.tsx` | **Category:** Knowledge & Workspace

#### Sub-Tools (4 tabs):

**13.1 Physician Supply & Demand Projector**
- 12 specialty projections over 10-year horizon:
  1. Primary Care (Internal Medicine, Family Medicine, Pediatrics)
  2. Psychiatry
  3. General Surgery
  4. Orthopedic Surgery
  5. Cardiology
  6. Oncology
  7. Emergency Medicine
  8. OB/GYN
  9. Neurology
  10. Radiology
  11. Anesthesiology
  12. Geriatrics
- Supply factors: current FTE, graduation rate, retirement rate, burnout attrition, IMG pipeline
- Demand factors: population growth, age distribution shift, disease prevalence trends, APM participation (shifts to team-based care)
- Output: supply-demand gap by specialty by year, shortage/surplus heat map, policy intervention impact (GME expansion, team-based care adoption, telehealth)

**13.2 Nurse Staffing Ratio Simulator**
- 7 unit types: ICU, Step-Down/PCU, Medical/Surgical, Emergency Department, Labor & Delivery, Operating Room, Behavioral Health
- California ratios vs. proposed federal ratios vs. current organization ratios
- Quality outcome correlations: HAI rates, patient falls, readmissions, mortality index (all literature-sourced)
- Financial modeling: RN FTE cost at different ratios, overtime premium impact, agency/traveler cost
- Output: quality improvement estimate at different ratio levels, cost per quality event averted, optimal ratio recommendation

**13.3 Total Cost of Turnover Calculator**
- 5 clinical roles: RN, Physician, PA/NP, Medical Assistant, Behavioral Health Clinician
- Turnover cost components (literature-sourced):
  - Separation costs (exit interviews, administration)
  - Vacancy costs (overtime, agency coverage)
  - Acquisition costs (recruiting, advertising, sign-on bonus)
  - Onboarding costs (training, productivity ramp-up, mentorship)
- 7 retention interventions with ROI:
  1. Loan repayment program
  2. Flexible scheduling
  3. Career ladder development
  4. Wellness/burnout program
  5. Childcare subsidy
  6. Sign-on bonus restructuring
  7. Pay equity audit and adjustment
- Output: current annual turnover cost, retention intervention ROI, payback period per intervention

**13.4 Rural Workforce Distribution & Incentive Modeler**
- 7 rural workforce incentive programs:
  1. NHSC Loan Repayment (primary care)
  2. NHSC Scholarship
  3. J-1 Visa Waiver (Conrad 30)
  4. State Loan Repayment Programs
  5. Critical Access Hospital rural track GME
  6. Area Health Education Centers (AHECs)
  7. Community Health Worker (CHW) pipeline
- Per incentive: federal investment required, expected provider years retained, cost per provider-year, HPSA population served
- Geographic distribution modeling: HP Shortage Area vs. geographic isolation vs. financial vulnerability
- Output: optimal incentive portfolio for a defined rural region, coverage gap closure estimate

---

### MODULE 14: Research Workspace
**File:** `ResearchWorkspace.tsx` | **Category:** Knowledge & Workspace

#### Sub-Tools (4 tabs):

**14.1 Analysis Scenario Manager**
- Create, name, and save analysis scenarios with any parameters
- JSON-based scenario storage via `localStorage`
- Scenario metadata: name, description, tool used, date created, tags
- Import/export scenarios as JSON files
- Duplicate and modify scenarios (branching)
- Up to 50 saved scenarios per browser session

**14.2 Report Builder**
- Structured report creation from Research Lab findings
- Report templates:
  - Policy Brief (Executive Summary, Background, Findings, Recommendations)
  - Financial Analysis (Methodology, Data Sources, Results, Sensitivity Analysis)
  - Quality Improvement Report (Baseline, Intervention, Outcomes, Next Steps)
  - Technology Assessment (Current State, Gap Analysis, Vendor Options, Recommendation)
- Rich text editor (basic markdown-like formatting: bold, headers, lists)
- Insert tool outputs as formatted blocks
- Export as: plain text (.txt), Markdown (.md)

**14.3 Scenario Comparison Dashboard**
- Compare up to 4 scenarios side-by-side
- Color-coded comparison table (Green = favorable, Yellow = neutral, Red = unfavorable)
- Delta calculation: absolute and percentage difference vs. baseline scenario
- Recommended scenario selection algorithm (weighted scoring of user-defined priority criteria)

**14.4 Research Notes & Citation Manager**
- Create, tag, and organize research notes
- Citation types supported: Journal Article, Report, CMS Guidance, Statute/Regulation, Press Release, Data Source
- Citation fields: author(s), title, year, source, URL, access date, notes
- Citation formatting: AMA and APA styles generated automatically
- Export reference list as formatted text
- `localStorage` persistence — notes survive page refresh

---

### MODULE 15: Innovation Leaderboard
**File:** `InnovationLeaderboard.tsx` | **Category:** Knowledge & Workspace

#### Sub-Tools (3 tabs):

**15.1 State Health Transformation Rankings**
- All 50 states + DC ranked on composite health transformation index
- Scoring dimensions (each 0–100):
  1. Value-Based Care Adoption (% providers in APMs)
  2. Interoperability & Data Sharing (FHIR adoption, HIE participation)
  3. Primary Care Investment (% spending on primary care)
  4. Health Equity (disparity reduction trend)
  5. Technology Innovation (digital health policy environment)
  6. All-Payer Model Participation
- Filter by region, rank tier, or specific dimension
- Sort by any column
- Click state for full profile with strengths, gaps, key programs

**15.2 Hospital System VBC Maturity Index**
- 30 major U.S. health systems scored on VBC maturity
- Systems: Kaiser, Mayo, Cleveland Clinic, Geisinger, Intermountain, Partners/MGB, Ascension, HCA, Providence, CommonSpirit, Advocate, Spectrum Health, Atrium, Sentara, UPMC, OhioHealth, Sanford, Allina, Centura, Northwell, NewYork-Presbyterian, NYU Langone, Mount Sinai, Cedars-Sinai, UCLA Health, Stanford, UCSF, OHSU, Vanderbilt, UNC Health
- Scored dimensions: Risk Contract Revenue %, HEDIS Percentile, Technology Maturity, Equity Programs, Primary Care Investment
- Maturity tiers: Pioneer (80+), Advanced (65–79), Developing (50–64), Emerging (<50)

**15.3 Payer Innovation Index**
- 20 major payers scored on innovation leadership:
  - National: UHG, Anthem/Elevance, Aetna/CVS, Humana, Cigna, Centene, Molina, WellCare
  - Regional: BCBS plans (12 regional plans)
- Scored dimensions: VBC contract sophistication, technology investment, equity commitment, consumer experience, provider partnership quality
- Trend: 3-year trajectory (improving, stable, declining)

---

## 4. Category Organization

The 19 modules are organized into 6 functional categories with color-coded navigation pills:

| # | Category | Color | Modules |
|---|----------|-------|---------|
| 1 | Interoperability & Risk | Blue | FHIR Lab, Risk Stratification Engine |
| 2 | Payment Models & VBC | Green | APM Design Lab, Population Health Modeler, Health Equity Studio |
| 3 | Policy & Quality Sciences | Purple | Policy Simulator, Clinical Quality Optimizer, Actuarial Lab |
| 4 | Technology & AI in Health | Orange | HTA Studio, AI Analytics Lab, Digital Health Lab |
| 5 | Knowledge & Workspace | Teal | Evidence Library, Workforce Modeler, Research Workspace, Innovation Leaderboard |
| 6 | Original Tools | Gray | Cost-Effectiveness Calculator, Policy Impact Simulator, Quality Measure Dashboard, VBC Design Tool |

---

## 5. Data & Calculation Reference

### Implemented Statistical Methods

| Method | Used In | Implementation |
|--------|---------|---------------|
| Markov Chain (matrix multiplication) | PopulationHealthModeler | `runMarkov()` — pure JavaScript matrix ops |
| Monte Carlo PSA (1,000 iterations) | HTAStudio | Box-Muller, Beta (Johnk), Gamma (Marsaglia-Tsang), all in browser |
| SIR Epidemic Model | PopulationHealthModeler | Euler integration, 90-day daily simulation |
| Beta Distribution Sampling | HTAStudio | Johnk's method (pure JS) |
| Log-normal Sampling | HTAStudio | Box-Muller transform on Normal → exponentiate |
| Gamma Distribution Sampling | HTAStudio | Marsaglia-Tsang method |
| HCC v28 RAF Calculation | RiskStratificationEngine | CMS v28 coefficients, hierarchical conditions, demographics |
| Charlson CCI | RiskStratificationEngine | 17-condition weighted index |
| ACA Actuarial Value | ActuarialLab | Claims simulation against cost-sharing parameters |
| HEDIS Rate Calculation | ClinicalQualityOptimizer | Numerator/denominator logic per NCQA spec |
| MIPS Composite Score | ClinicalQualityOptimizer | 4-category weighted scoring per 2024 Final Rule |
| ICER Calculation | HTAStudio, EvidenceLibrary | ΔCost / ΔQALY |
| HEROI | HealthEquityStudio | Equity-weighted ICER (HTR proprietary) |
| Net Monetary Benefit | HTAStudio | NMB = (WTP × ΔQALY) - ΔCost |

### Key External Data Sources (for default values)
- CMS HCC v28 Coefficients (2024)
- NCQA HEDIS Benchmarks 2024 (50th/90th percentiles)
- AHRQ Prevention Quality Indicators v2023
- CMS Star Rating cut-points 2024
- ISPOR Budget Impact Model Guidelines
- WHO-CHOICE WTP thresholds
- ICER Reference Case (WTP $100K–$150K/QALY)
- CMS CPT reimbursement rates (2024 Physician Fee Schedule)
- AAMC Physician Supply/Demand projections (2023–2036)

---

## 6. User Interface Patterns

### Common UI Components (repeated across tools)

**Category Tabs:** Horizontal scrollable tab bar at top of each tool. Active tab: filled background with white text. Inactive: transparent with border.

**Input Controls:** Consistent slider + number input pairs. Slider shows range visually; number input allows precise entry. Both are synced via React state.

**Result Cards:** Metric display cards with: large number/value, label, trend indicator (↑↓). Color-coded: green (favorable), yellow (caution), red (unfavorable).

**Expandable Sections:** Accordion pattern used in RiskStratificationEngine HCC categories and EvidenceLibrary study details.

**Progress Indicators:** Used in HTAStudio Monte Carlo PSA — animated progress bar using CSS transition during simulation.

**Data Tables:** Sortable (click header), filterable (search input), pagination at 10 or 25 rows.

**Tooltips:** Hover-activated explanation text for technical metrics and acronyms.

### Page Structure (research-lab/page.tsx)
```
Hero section (gradient background, title, description)
Category navigation pills (sticky on scroll)
Per-category section:
  CategoryHeader (category name, description, icon count)
  Tool grid (2-column on large screens, 1-column on mobile)
    Per tool:
      ToolHeader (title, description, category badge)
      Dynamic component (loaded client-side)
```

---

## 7. Performance & Implementation Notes

### Bundle Size Management
- Each of 19 components is code-split via `next/dynamic`
- Tools only load when user scrolls to/activates them (intersection observer in future roadmap)
- No chart libraries → significant bundle size reduction vs. Recharts/D3 approach

### Hydration Safety
- All 19 components use `ssr: false` to prevent "document is not defined" and "window is not defined" hydration errors
- localStorage access wrapped in `typeof window !== 'undefined'` checks in ResearchWorkspace

### Computation Performance
- Monte Carlo PSA: 1,000 iterations take ~50–200ms on modern devices (batched via setTimeout)
- Markov chain: 5 diseases × 10-year horizon runs in <5ms (pure synchronous math)
- SIR model: 90-day day-by-day integration runs in <1ms

### Browser Compatibility
- Tested in: Chrome 120+, Safari 17+, Firefox 121+, Edge 120+
- localStorage: required for ResearchWorkspace persistence (fallback: in-memory state if unavailable)
- No WebAssembly or Web Workers used (pure main-thread JavaScript)

---

## 8. Use Cases by Role

### Health System CIO/CMIO
**Recommended Modules:** FHIR Lab, AI Analytics Lab, Digital Health Lab, HTA Studio
**Primary Use Cases:**
- Evaluate EHR interoperability readiness against ONC requirements (FHIR Lab)
- Build the business case for AI investment (AI Analytics Lab — Build vs. Buy Calculator)
- Calculate RPM program ROI before vendor contract (Digital Health Lab)
- Conduct budget impact analysis for new technology before budget cycle (HTA Studio)

### State Medicaid Director
**Recommended Modules:** Policy Simulator, APM Design Lab, Workforce Modeler, Evidence Library
**Primary Use Cases:**
- Model 1115 waiver impact before federal submission (Policy Simulator)
- Design a global budget with payer partners (APM Design Lab — Global Budget Simulator)
- Project workforce needs for expanding behavioral health services (Workforce Modeler)
- Brief legislators using policy briefs from Evidence Library

### Health Plan VP of Quality
**Recommended Modules:** Clinical Quality Optimizer, Risk Stratification Engine, Health Equity Studio, Actuarial Lab
**Primary Use Cases:**
- Model HEDIS improvement trajectory for next year's rates (Clinical Quality Optimizer)
- Validate HCC coding accuracy and identify RAF optimization (Risk Stratification Engine)
- Analyze racial disparities in quality measure performance (Health Equity Studio)
- Project actuarial impact of benefit design changes (Actuarial Lab)

### ACO Financial Analyst
**Recommended Modules:** APM Design Lab, Actuarial Lab, Clinical Quality Optimizer, Research Workspace
**Primary Use Cases:**
- Compare benchmark methodologies for contract negotiation (APM Design Lab)
- Model downside risk exposure under different performance scenarios (Actuarial Lab)
- Project MIPS payment adjustment (Clinical Quality Optimizer)
- Document and export analysis scenarios for CFO presentation (Research Workspace)

### Health Economist / Researcher
**Recommended Modules:** HTA Studio, Evidence Library, Population Health Modeler, Health Equity Studio
**Primary Use Cases:**
- Run probabilistic sensitivity analysis for CEA manuscript (HTA Studio — Monte Carlo PSA)
- Access ICER database for comparative value analysis (Evidence Library)
- Model epidemic intervention impact for grant application (Population Health Modeler — SIR)
- Calculate equity-weighted ICER for health equity-focused evaluation (Health Equity Studio)

### Clinical Quality Director
**Recommended Modules:** Clinical Quality Optimizer, Risk Stratification Engine, Population Health Modeler, Digital Health Lab
**Primary Use Cases:**
- Simulate CMS Star Rating impact of quality investments (Clinical Quality Optimizer)
- Stratify patient population for care management program design (Risk Stratification Engine)
- Model impact of chronic disease management programs (Population Health Modeler)
- Evaluate telehealth expansion impact on access and quality (Digital Health Lab)

---

## 9. Research Lab Roadmap

### Planned Enhancements (Next 12 Months)

**Interoperability & Risk:**
- Da Vinci FHIR Implementation Guide support (Coverage Requirements Discovery, Prior Auth)
- NCPDP SCRIPT integration for pharmacy data
- Real-time FHIR server connection for live data validation (opt-in)

**Payment Models:**
- CMS AHEAD Model simulator (All-Payer, All-Provider model launched 2024)
- Commercial payer VBC contract analyzer
- APM comparison import/export (JSON format for sharing between organizations)

**Population & Equity:**
- County-level SDOH data integration (RWJF County Health Rankings)
- Tribal health equity module
- Pediatric population health models (CHIP-specific)

**Technology & AI:**
- FDA 510(k) SaMD classification decision tree
- LLM evaluation framework (accuracy, safety, bias for clinical AI)
- Digital therapeutics (DTx) coverage analysis tool

**Knowledge & Workspace:**
- Multi-user collaboration (shared workspaces via Supabase backend)
- Natural language query interface ("Show me states with the best HEDIS performance for diabetes")
- API access for embedding tools in client portals

**Infrastructure:**
- All tools: export results as CSV/Excel
- Persistent user accounts with cloud-saved scenarios (vs. localStorage only)
- Audit trail for research governance compliance

---

*Document prepared by HTR Research Practice. For questions contact: research@healthtransformationresearch.com*
*Version 2.0 — March 2026*
