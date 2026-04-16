# Research Lab Guide — Vermont Health Platform (HTR)

**Audience:** Analysts, tool developers, product managers.
**Version:** 4.2.0
**Access:** Subscriber role or above (`/research-lab`)

---

## Table of Contents

1. [Overview](#1-overview)
2. [Navigation Model](#2-navigation-model)
3. [Section 1 — Interoperability & Risk](#3-section-1--interoperability--risk)
4. [Section 2 — Payment Models & VBC](#4-section-2--payment-models--vbc)
5. [Section 3 — Population & Equity](#5-section-3--population--equity)
6. [Section 4 — Policy & Quality Sciences](#6-section-4--policy--quality-sciences)
7. [Section 5 — Technology & AI](#7-section-5--technology--ai)
8. [Section 6 — Knowledge & Workspace](#8-section-6--knowledge--workspace)
9. [Adding a New Tool](#9-adding-a-new-tool)
10. [UI Patterns & Component Guidelines](#10-ui-patterns--component-guidelines)

---

## 1. Overview

The Research Lab is a suite of 19 interactive analytical tools organized into six thematic sections. Each tool is a self-contained React component loaded lazily to keep initial bundle size small. Tools are accessible via a two-level tab navigation: a section row on top and a tool pill row below.

**Access requirement:** Subscriber, Student, Professional, or Advisory role. Free users see a paywall prompt.

**Route:** `/research-lab`

**Architecture:** All 19 tool components live in `frontend/components/research/`. They are loaded with `next/dynamic` (no SSR) to allow client-only rendering (charts, D3, canvas).

---

## 2. Navigation Model

The Research Lab uses a two-level tab layout:

1. **Section tabs** (top row) — six sections, each rendered as a raised tab
2. **Tool pills** (second row) — tools within the active section, rendered as pill buttons

State is managed in `ResearchLabHub.tsx` via `useState` for `activeSection` and `activeTool`. URL params (`?section=...&tool=...`) are synced via `useSearchParams` so deep links work.

The active tool component is rendered below the tab navigation inside a `<Suspense>` boundary with a loading fallback.

---

## 3. Section 1 — Interoperability & Risk

**Theme:** Standards compliance, clinical risk scoring, and data exchange.

### FHIR Interoperability Lab

**Component:** `FHIRLab`
**Badge:** Interoperability

Build and validate FHIR R4 resources, map clinical terminologies (SNOMED, LOINC, ICD-10), test CDS Hooks integrations, simulate prior authorization workflows, and check ONC compliance requirements. Supports the full FHIR R4 resource set with schema validation feedback.

**Key capabilities:**

- FHIR R4 resource builder (Patient, Observation, Condition, MedicationRequest, etc.)
- Terminology mapping: SNOMED CT ↔ ICD-10-CM, LOINC code lookup
- CDS Hooks simulator: hook type, context payload, card response preview
- Prior auth workflow simulation with payer-specific rule sets
- ONC 21st Century Cures compliance checklist

---

### Risk Stratification Engine

**Component:** `RiskStratificationEngine`
**Badge:** Clinical Risk

Apply HCC v28 RAF (Risk Adjustment Factor) scoring to patient cohorts, segment populations by risk tier, build custom risk models, and analyze comorbidity interactions using both Elixhauser and Charlson comorbidity indices.

**Key capabilities:**

- HCC v28 model: enter diagnoses (ICD-10), compute RAF score, view hierarchies
- Population segmentation: low / rising / high / complex risk tiers with thresholds
- Comorbidity scoring: Charlson Comorbidity Index + Elixhauser 30-condition set
- Custom model builder: weight conditions and utilization factors manually
- Cohort comparison: side-by-side RAF profiles for two populations

---

## 4. Section 2 — Payment Models & VBC

**Theme:** Alternative payment model design, shared savings modeling, and cost-effectiveness analysis.

### APM Design Lab

**Component:** `APMDesignLab`
**Badge:** Payment Innovation

Design novel alternative payment models from first principles: episode bundles, global budgets, partial capitation, and primary care payment models. Generates benchmark waterfall charts and natural-language model recommendations based on population characteristics.

**Key capabilities:**

- APM type selection: BPCI-A episodes, MSSP tracks, ACO REACH, global budget, PCMH
- Benchmark construction: episode cost waterfall, historical trend adjustment, quality withhold
- Population parameter inputs: payer mix, chronic condition prevalence, utilization rates
- Model recommendation engine: suggests APM structure based on organization characteristics
- Export: model specification summary as structured text

---

### APM Shared Savings Calculator

**Component:** `APMCalculator`
**Badge:** Value-Based Care

Model projected shared savings and losses under MSSP, ACO REACH, and custom global budget scenarios. Includes risk corridor modeling, minimum savings rate (MSR) thresholds, and quality withhold impact analysis.

**Key capabilities:**

- MSSP tracks: Basic A/B/C/D/E, Enhanced — applies correct sharing rates and corridors
- ACO REACH: professional, global, and high needs population options
- Custom global budget: set benchmark, trend rate, and performance year projection
- Shared savings calculation: gross savings, MSR check, quality score multiplier, net payment
- Sensitivity analysis: vary medical cost trend ±2% to see breakeven scenarios

---

### Cost-Effectiveness Analysis Calculator

**Component:** `CEACalculator`
**Badge:** Health Economics

Calculate cost per QALY gained, Number Needed to Treat (NNT), and break-even timeline for any clinical intervention. Compare results against ICER, NICE, and CMS willingness-to-pay thresholds.

**Key capabilities:**

- ICER calculation: incremental cost / incremental effectiveness (QALYs or LYs)
- NNT and Number Needed to Harm (NNH) with confidence intervals
- Threshold comparison: ICER ($100k/QALY), NICE (£20k–£30k/QALY), CMS
- Break-even timeline: years until net cost savings at given discount rate
- Probabilistic sensitivity analysis: one-way tornado charts for key parameters

---

## 5. Section 3 — Population & Equity

**Theme:** Disease modeling, population health simulation, and health equity measurement.

### Population Health Modeler

**Component:** `PopulationHealthModeler`
**Badge:** Population Health

Run Markov chain disease progression models for five chronic conditions, simulate SIR/SEIR epidemic dynamics, model preventable hospitalizations and ED utilization, and calculate intervention ROI.

**Key capabilities:**

- Markov models: diabetes, CHF, COPD, hypertension, depression — configurable state transitions
- Epidemic simulation: SIR model with configurable R0, vaccination rate, and population size
- Preventable hospitalization (AHRQ PQI): estimate reduction from care management programs
- Intervention ROI: input program cost and avoided utilization → net present value
- Cohort projector: 5-year disease burden and cost trajectory for a defined population

---

### Health Equity Studio

**Component:** `HealthEquityStudio`
**Badge:** Health Equity

Analyze racial and ethnic disparities across 10 clinical and access outcomes, map geographic access gaps, score SDOH burden by county, and compute equity-weighted cost-effectiveness using the HEROI (Health Equity Return on Investment) metric.

**Key capabilities:**

- Disparity analysis: 10 outcomes (diabetes control, hypertension, cancer screening, etc.) by race/ethnicity
- Geographic access mapping: drive time to nearest PCP, specialist, hospital by zip code
- SDOH burden score: composite of housing instability, food insecurity, transportation, income
- HEROI metric: equity-weighted ICER giving additional value to interventions targeting disadvantaged populations
- Equity action plan generator: ranked recommendations by equity impact and feasibility

---

## 6. Section 4 — Policy & Quality Sciences

**Theme:** Policy simulation, quality measure optimization, hospital financial analysis, and health technology assessment.

### Policy Simulator

**Component:** `PolicySimulator`
**Badge:** Health Policy

Model Section 1115 waiver designs across six state scenarios, design Vermont-style global budgets, simulate Medicaid expansion impact on coverage and state expenditure, and analyze price transparency policies.

**Key capabilities:**

- 1115 waiver designer: work requirements, premium assistance, benefit modifications, managed care carve-outs
- Global budget modeler: set all-payer growth rate cap, quality risk corridor, hospital-specific allocations
- Medicaid expansion: coverage gain estimates by age/income band, state cost share, crowd-out effect
- Price transparency policy: estimate cost savings from shoppable service disclosure by market concentration
- State comparison: side-by-side policy portfolio benchmarking for selected states

---

### Clinical Quality Optimizer

**Component:** `ClinicalQualityOptimizer`
**Badge:** Quality Improvement

Simulate performance on 15 HEDIS measures against NCQA national benchmarks, predict CMS Star Ratings across 32 sub-measures, optimize MIPS composite scores by intervention priority, and calculate Pay-for-Performance (P4P) revenue impact.

**Key capabilities:**

- HEDIS simulation: 15 measures including CDC-HbA1c, CBP, BCS, COL with NCQA 75th/90th percentile benchmarks
- CMS Stars predictor: enter current measure rates → predicted overall star rating
- MIPS optimizer: model which quality measures and improvement activities maximize MIPS score
- P4P calculator: estimated bonus/penalty given payer contract P4P structure
- Improvement planning: prioritized gap-closing recommendations by measure impact and difficulty

---

### Hospital Financial Scorecard

**Component:** `HospitalFinancialScorecard`
**Badge:** Hospital Finance

Stress-test hospital financial performance against payer mix shifts, Medicaid rate cuts, and volume changes. Benchmark results against three peer groups: Critical Access Hospital (CAH), Rural PPS, and Urban Tertiary.

**Key capabilities:**

- Payer mix analysis: enter Medicare/Medicaid/commercial/self-pay split, model rate change impact
- Medicaid rate sensitivity: slider from -10% to +10% Medicaid rate change → net revenue impact
- Volume stress test: inpatient/outpatient volume changes → operating margin impact
- Peer benchmarking: compare margin, days cash on hand, debt service coverage to CAH/Rural PPS/Urban Tertiary medians
- DSH and 340B analysis: disproportionate share hospital payment and 340B drug savings estimates

---

### HTA Studio

**Component:** `HTAStudio`
**Badge:** Health Technology Assessment

Build budget impact models, run Multi-Criteria Decision Analysis (MCDA) with eight weighted criteria, and execute Monte Carlo probabilistic sensitivity analysis with 1,000 stochastic iterations.

**Key capabilities:**

- Budget impact model: size the 5-year financial impact of a new technology on a payer or health system
- MCDA framework: weight 8 criteria (clinical effectiveness, safety, equity, innovation, cost, etc.) → composite score
- Monte Carlo PSA: 1,000 iterations with Beta (proportions), Log-normal (costs), Gamma (utilities) distributions → cost-effectiveness plane
- EVPI calculation: expected value of perfect information to guide further research investment
- HTA report generator: structured summary in ICER, NICE, or CDA-AMC format

---

### Actuarial Lab

**Component:** `ActuarialLab`
**Badge:** Actuarial Science

Calculate ACA actuarial value, develop premium rates using three methodologies, model adverse selection dynamics, and analyze Inflation Reduction Act 2022 drug pricing impacts.

**Key capabilities:**

- ACA actuarial value calculator: enter benefit design parameters → metal tier classification
- Premium development: community rating, age-banded rating, and experience rating methodologies
- Adverse selection model: simulate enrollment dynamics under different premium levels → death spiral risk
- IRA 2022 drug pricing: estimate negotiated price impact by drug class and payer type
- MLR analysis: medical loss ratio calculation and rebate estimation

---

## 7. Section 5 — Technology & AI

**Theme:** AI governance, predictive model evaluation, and digital health ROI.

### AI Analytics Lab

**Component:** `AIAnalyticsLab`
**Badge:** Artificial Intelligence

Compare predictive model performance across algorithms, detect algorithmic bias using Demographic Parity and Equal Opportunity metrics, build AI governance frameworks, and calculate AI implementation ROI.

**Key capabilities:**

- Model comparison: AUC-ROC, precision, recall, F1 for up to 4 models side-by-side
- Bias detection: Demographic Parity difference, Equal Opportunity difference, Disparate Impact ratio by demographic group
- AI governance checklist: 40-item framework covering data governance, model validation, monitoring, explainability
- ROI calculator: productivity gains, error reduction savings, and implementation costs → net present value
- Model card generator: structured documentation of model purpose, limitations, and performance

---

### Digital Health Lab

**Component:** `DigitalHealthLab`
**Badge:** Digital Health

Calculate Remote Patient Monitoring (RPM) ROI using CMS CPT codes, model telehealth utilization under CMS policy scenarios, compare patient engagement platforms, and optimize EHR interoperability scoring.

**Key capabilities:**

- RPM ROI: model CPT 99453–99458 reimbursement against device and staffing costs for a panel size
- Telehealth modeling: 5 CMS policy scenarios (PHE extension, audio-only, geographic restrictions) → utilization and revenue impact
- Patient engagement platform comparison: 12 criteria scorecard for digital front door, patient portal, and remote monitoring vendors
- EHR interoperability score: TEFCA readiness, FHIR API capability, CDS Hooks integration maturity
- Digital health investment guide: category heat map of ROI evidence strength by solution type

---

## 8. Section 6 — Knowledge & Workspace

**Theme:** Research reference, workforce planning, benchmarking, and report building.

### Evidence Library

**Component:** `EvidenceLibrary`
**Badge:** Research

Search 25 landmark CEA and CUA studies, track 20 CMMI innovation model evaluations with lesson-learned summaries, and browse 15 HTR policy briefs with key findings.

**Key capabilities:**

- CEA/CUA study database: 25 studies filterable by condition, intervention type, and ICER threshold
- CMMI model tracker: 20 models (BPCI, CPC+, Primary Care First, etc.) with evaluation status and results
- HTR policy brief library: 15 platform-authored briefs with structured findings and recommendations
- Citation export: AMA or APA format for any study in the library
- Comparative table builder: extract key metrics from selected studies into a side-by-side table

---

### Workforce Modeler

**Component:** `WorkforceModeler`
**Badge:** Workforce

Project physician supply and demand across 12 specialties over 10 years, simulate nurse staffing ratio policy impacts, calculate staff turnover costs, and model rural incentive program effectiveness.

**Key capabilities:**

- Physician pipeline: residency graduation rates, retirement curves, and demand growth → 10-year supply/demand gap by specialty
- Nurse staffing ratios: model patient outcomes and cost impact under mandatory ratio legislation (CA model vs. alternatives)
- Turnover cost calculator: replacement cost as % of salary by role, retention program ROI
- Rural incentive programs: NHSC scholarship, loan repayment, J-1 visa waiver, state programs → estimated recruitment yield
- Rural vs. urban comparison: per-capita physician supply, service area population, and unmet need index

---

### Innovation Leaderboard

**Component:** `InnovationLeaderboard`
**Badge:** Benchmarking

Rank all 50 states on a composite health transformation index, score 30 major health systems on VBC maturity using a 6-dimension framework, and compare 20 major payers on innovation leadership.

**Key capabilities:**

- State leaderboard: composite score (policy innovation + VBC penetration + equity progress + technology adoption)
- Health system VBC maturity: 6 dimensions — risk contracts, care management, data infrastructure, quality performance, consumer experience, network design
- Payer innovation scorecard: 20 payers rated on APM adoption, digital health investment, SDOH programs, equity reporting
- Year-over-year movement: change in rank with directional indicators
- Custom weighting: adjust dimension weights to match your evaluation priorities

---

### Research Workspace

**Component:** `ResearchWorkspace`
**Badge:** Workspace

Save and compare analysis scenarios from other Research Lab tools, build structured reports from templates, manage citations in AMA/APA format, and export findings as Markdown or plain text.

**Key capabilities:**

- Scenario manager: save named parameter sets from any tool, load for comparison
- Report builder: structured templates (executive summary, methodology, findings, recommendations)
- Citation manager: AMA and APA format with auto-generated bibliography
- Export: Markdown (`.md`) or plain text (`.txt`) download
- Annotation layer: add notes and commentary to any saved scenario

---

## 9. Adding a New Tool

### Step 1 — Create the component

Create `frontend/components/research/MyNewTool.tsx`:

```tsx
"use client";

export default function MyNewTool() {
  return (
    <div className="p-6">
      <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
        My New Tool
      </h2>
      {/* Tool UI */}
    </div>
  );
}
```

### Step 2 — Add to ResearchLabHub

In `frontend/app/research-lab/ResearchLabHub.tsx`:

```tsx
// 1. Add the dynamic import at the top
const MyNewTool = dynamic(() => import('@/components/research/MyNewTool'), { ssr: false })

// 2. Add the tool entry to the appropriate SECTIONS array entry
{
  id: 'my-tool',
  icon: '🔬',
  label: 'My New Tool',
  badge: 'Category',
  badgeCls: 'bg-indigo-100 text-indigo-700 border-indigo-200',
  desc: 'One-sentence description of what this tool does.',
}

// 3. Add the case to ActiveTool's switch statement
case 'section-id/my-tool':
  return <MyNewTool />
```

### Step 3 — Verify access gating

The Research Lab route is protected in `middleware.ts` — only `subscriber` role and above can access `/research-lab`. No additional gating is needed at the tool level unless a tool should be further restricted (e.g., Professional only).

---

## 10. UI Patterns & Component Guidelines

### Tool Layout

All tool components should follow this structure:

```tsx
<div className="space-y-6">
  {/* Input panel */}
  <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl p-6">
    <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-4">
      Parameters
    </h3>
    {/* Inputs */}
  </div>

  {/* Results panel */}
  <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl p-6">
    <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-4">
      Results
    </h3>
    {/* Charts, tables, outputs */}
  </div>
</div>
```

### Dark Mode

All tool components must include `dark:` variants on every hardcoded color class. Follow the standard mapping:

| Light | Dark |
| --- | --- |
| `bg-white` | `dark:bg-slate-900` |
| `bg-slate-50` | `dark:bg-slate-800` |
| `border-slate-200` | `dark:border-slate-700` |
| `text-slate-900` | `dark:text-slate-100` |
| `text-slate-600` | `dark:text-slate-300` |
| `text-slate-500` | `dark:text-slate-400` |

### Lazy Loading

All tools are loaded with `next/dynamic` and `{ ssr: false }`. This is required — tools that use browser APIs (canvas, `window`, D3 DOM manipulation) will crash during server-side rendering if SSR is not disabled.

### No External Data Fetching

Research Lab tools are fully client-side computational tools. They do not fetch from the Sanity CMS or the backend API during normal operation. All calculations happen in the browser. If a tool needs reference data, embed it as a static constant in the component file.
