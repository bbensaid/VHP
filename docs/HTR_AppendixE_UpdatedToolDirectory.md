# HTR Appendix E — Updated: HTR Platform Tools and Methodology Overview

## Replacement for Appendix E in the published book

**Editorial note:** The original Appendix E listed 10 tools. The Research Lab has expanded to 21 interactive analytical tools organized by the six-pillar framework. This replacement updates tool names, descriptions, and URLs to match the live platform at healthtransformationreview.com/research-lab. Several entries in the original Appendix E (VBC Contract Review Checklist, Policy Impact Assessment Framework, FHIR Implementation Guide, HCC Gap Closure Playbook) are methodology guides and advisory deliverables, not interactive Research Lab tools; they have been moved to a separate advisory methodology section (E.22–E.25) at the end of this appendix.

---

## Appendix E: HTR Platform Tools and Methodology Overview

This appendix describes the Health Transformation Review platform tools referenced throughout the book. All interactive Research Lab tools (E.1–E.21) are available to Research Lab subscribers at healthtransformationreview.com/research-lab. Advisory methodology tools (E.22–E.25) are delivered through HTR Advisory engagements.

---

### POLICY PILLAR TOOLS

**E.1 Policy Simulator**
`/research-lab/policy-quality?tab=policy`

Models the financial and coverage impact of state and federal policy scenarios. Inputs: policy type (reference-based pricing, global budget, 1115 waiver, Medicaid expansion/contraction), rate benchmarks, population affected, and timeline. Outputs: premium impact, coverage change, total cost of care trajectory, and fiscal impact across payer types.

Vermont-specific presets: Act 68 RBP at Medicare +15%, +30%, and +50%; Vermont AHEAD global budget (FY2028); Medicaid expansion scenarios; H.R. 1 work requirement scenarios; Vermont 1115 waiver baseline.

**E.2 Innovation Leaderboard**
`/research-lab/knowledge-workspace?tab=leaderboard`

Ranks all 50 states on a composite health transformation index across six dimensions: payment reform, primary care investment, quality performance, equity outcomes, technology infrastructure, and regulatory environment. Allows comparison of Vermont against any state or national average. Vermont's mandatory all-payer model gives it one of the highest Policy pillar scores in the country.

---

### ECONOMICS PILLAR TOOLS

**E.3 APM Shared Savings Calculator**
`/research-lab/payment-models?tab=apm-calc`

Models shared savings or loss potential under any APM contract. Inputs: benchmark PMPM, attributed member months, actual total cost of care, sharing rate, minimum savings rate, quality withhold percentage, and stop-loss threshold. Outputs: projected shared savings or loss under pessimistic/base/optimistic scenarios, sensitivity analysis by key variable, and break-even care management investment level.

Vermont-specific presets: AHEAD Global Budget (FY2028, 52,000 attributed lives), Vermont Blueprint ACO (current), Vermont Medicaid ACO (185,000 attributed lives), Small Rural Hospital CAH AHEAD Participant.

**E.4 APM Design Lab**
`/research-lab/payment-models?tab=apm-design`

Design novel alternative payment models from scratch. Build episode bundles for Vermont's top DRG categories, design global budget architectures for the FY2028 Act 68 mandate, and construct benchmark waterfalls with risk adjustment. Particularly useful for Vermont hospitals designing their transformation plans under the RHRC technical assistance process.

**E.5 CEA Calculator**
`/research-lab/payment-models?tab=cea`

Calculates cost per QALY (quality-adjusted life year), number needed to treat, and break-even timeline for any clinical intervention. Relevant for Vermont's AHEAD primary care investment floor requirement — quantifies the QALY return on preventive care investment and primary care expansion. Includes probabilistic sensitivity analysis and ICER threshold comparison.

**E.6 Hospital Financial Stress Test**
`/research-lab/policy-quality?tab=scorecard`

Models hospital financial position under concurrent stressors: Act 68 RBP compression, H.R. 1 Medicaid cuts, volume decline, and labor cost escalation. Inputs: total revenue, operating expense, payer mix (Medicare/Medicaid/commercial/self-pay), commercial-to-Medicare ratio, volume change, and Medicaid cut scenario. Outputs: operating margin trajectory, break-even analysis, and sensitivity by payer mix shift.

Vermont-specific presets: NVRH (Northeastern VT Regional, CAH), Gifford Medical Center (CAH), Central Vermont Medical Center (Rural PPS), Act 68 RBP Scenario (FY2027), H.R. 1 Medicaid Cliff (Post-2030). Benchmarks against CAH, Rural PPS, Urban Community, and Urban Tertiary peer groups.

**E.7 HTA Studio**
`/research-lab/policy-quality?tab=hta`

Builds budget impact models for transformation investments: care management programs, telehealth expansion, AI scribe deployment, and RPM infrastructure. Run Monte Carlo probabilistic sensitivity analysis with 1,000 iterations to quantify uncertainty in transformation ROI projections. Particularly relevant for Vermont RHT Program investment business case development.

**E.8 Actuarial Lab**
`/research-lab/policy-quality?tab=actuarial`

Models the actuarial value impact of Act 68's reference-based pricing on Vermont commercial insurance premiums. Calculates premium reduction timeline from RBP implementation (FY2027) to global budget stabilization (FY2028–2030). Models ACA actuarial value, adverse selection dynamics, and H.R. 1 pharmaceutical pricing interaction with Act 55's drug cap provisions.

---

### TECHNOLOGY PILLAR TOOLS

**E.9 FHIR Interoperability Lab**
`/research-lab/interoperability?tab=fhir`

Build and validate FHIR R4 resources, test CDS Hooks implementations, and verify ONC 21st Century Cures compliance. Vermont CIN FHIR use cases pre-loaded: ADT notification for care transitions, medication reconciliation on discharge, and population health data export for AHEAD reporting. EHR-specific configuration guidance for Epic, Oracle Health, Meditech, and TruBridge — the four platforms across Vermont's 14 hospitals. Critical for Act 68 mandatory VITL/VHIE connectivity compliance.

**E.10 AI Clinical Governance Lab**
`/research-lab/technology-ai?tab=ai`

65-dimension governance evaluation across six AI lifecycle stages: problem definition, data governance, model development, validation, deployment, and monitoring. Detects algorithmic bias with Demographic Parity and Equal Opportunity metrics. Builds governance frameworks aligned with Vermont's AHEAD equity requirements — AI tools deployed under global budget accountability must not amplify disparities. Vendor assessment module and equity monitoring protocol included.

*Note: This tool was previously referred to in early editions as the "AI Clinical Governance Checklist." The current interactive version is the AI Clinical Governance Lab.*

**E.11 Digital Health Lab**
`/research-lab/technology-ai?tab=digital`

Calculates RPM ROI using CMS CPT codes 99453–99458 for Vermont's RHT Program RPM investments. Models telehealth utilization under post-COVID CMS policy scenarios. Vermont's $195M RHT award includes significant telehealth and RPM investment — this tool calculates the clinical and financial return required to justify the investment and sustain it post-RHT.

---

### CLINICAL PILLAR TOOLS

**E.12 Risk Stratification Engine**
`/research-lab/interoperability?tab=risk`

Applies HCC v28 Risk Adjustment Factor (RAF) scoring to segment attributed populations by clinical complexity. Essential for Vermont hospitals entering AHEAD global budgets — RAF-based risk adjustment determines Vermont's CMS benchmark and shared savings calculation. Includes prospective and retrospective attribution modeling, HCC gap identification, and risk score benchmarking against Vermont peer groups.

**E.13 Clinical Quality Optimizer**
`/research-lab/policy-quality?tab=quality`

Simulates 15 HEDIS measures with NCQA benchmarks, predicts CMS Star Ratings across 32 sub-measures, and optimizes MIPS composite scores. Vermont AHEAD equity benchmarks require stratified HEDIS performance — this tool calculates the quality investment required to achieve AHEAD target performance across Vermont's priority measures (A1c control, blood pressure control, behavioral health follow-up). Includes measure-level gap analysis and intervention-to-improvement mapping.

**E.14 Workforce Modeler**
`/research-lab/knowledge-workspace?tab=workforce`

Projects physician and nursing supply/demand across 12 specialties over 10 years. Models the impact of Vermont's nurse staffing ratios and rural incentive programs. Quantifies the workforce gap that Oliver Wyman identified as the primary driver of Vermont's care delivery crisis — and models the RHT Program workforce recruitment investments against projected supply needs.

---

### EQUITY PILLAR TOOLS

**E.15 Health Equity Studio (HEROI)**
`/research-lab/population-equity?tab=equity`

Calculates HEROI composite equity score from stratified HEDIS data across five dimensions: Access Equity (25%), Quality Equity (25%), Outcome Equity (25%), SDOH Burden (15%), and Trust and Engagement (10%). Analyzes disparities across 10 health outcomes with disparity decomposition (income, insurance, access, quality, structural factors). Designs intervention portfolios matched to root causes. Equity-weighted ICER calculation for AHEAD equity goal modeling.

Vermont population presets: Statewide (AHEAD equity baseline), Burlington/Chittenden County (most diverse), Northeast Kingdom (highest poverty/disparity burden), and National Average benchmark.

**E.16 Population Health Modeler**
`/research-lab/population-equity?tab=population`

Runs Markov chain disease progression models for Vermont's priority chronic disease populations (diabetes, hypertension, CHF). Models the population health impact of Vermont's AHEAD primary care investment floor and care management expansion. Calculates the SDoH-driven disease burden that Vermont's HRSN screening programs are designed to address. Includes SIR epidemic dynamics for infectious disease scenarios.

---

### OPERATIONS PILLAR TOOLS

**E.17 Transformation Scorecard**
`/research-lab/knowledge-workspace?tab=scorecard`

Executive six-pillar dashboard. Self-scores organizational transformation readiness across Policy, Economics, Technology, Clinical, Equity, and Operations — with Vermont AHEAD statutory milestones integrated into each pillar. Tracks progress against Act 68's FY2027 RBP and FY2028 global budget deadlines. Links to the full VBC Readiness Assessment for 30-dimension deep-dive scoring.

**E.18 VBC Transformation Readiness Assessment**
`/research-lab/knowledge-workspace?tab=readiness`

30-dimension assessment across 6 domains (Strategy & Leadership, Data & Analytics, Clinical Operations, Financial Readiness, Technology Infrastructure, Health Equity) producing an organizational readiness score and prioritized gap analysis. Score 0-4 per dimension; total score expressed as a percentage with readiness labels from "Not Ready" to "Global Budget Ready."

Vermont presets: AHEAD Entry (FY2027), Vermont CAH Early Transformation, and Advanced System Global Budget Ready. Self-assessment or facilitated external assessment. Each dimension includes Vermont-specific notes referencing Act 68, AHEAD, and RHT Program obligations.

**E.19 Evidence Library**
`/research-lab/knowledge-workspace?tab=evidence`

Searches 25 landmark CEA/CUA studies on care management interventions, primary care transformation, and population health management. Reviews 20 CMMI innovation model summaries with lesson-learned analysis. Particularly relevant for Vermont hospital transformation plans requiring an evidence base for proposed interventions.

**E.20 Research Workspace**
`/research-lab/knowledge-workspace?tab=workspace`

Saves scenarios, builds structured reports, manages citations, and exports findings across all Research Lab tools. Enables multi-session research projects that draw on outputs from multiple tools — for example, combining Hospital Financial Stress Test results, VBC Readiness Assessment gaps, and APM Shared Savings Calculator scenarios into a single transformation business case document.

---

### CROSS-PILLAR TOOLS

**E.21 The Wire (HTR Intelligence Feed)**
`/the-wire`

Weekly synthesis of consequential healthcare transformation developments, published every Tuesday. Coverage organized around the six pillars: Policy (federal rulemaking, CMMI model developments, state legislation), Economics (VBC market developments, hospital financial trends), Technology (health IT, AI governance, interoperability), Clinical (quality measurement, care model evidence), Equity (disparity data, equity policy), and Operations (workforce, administrative simplification). Free tier available; Professional and Advisory tiers include full analysis and Vermont-specific commentary.

---

## Advisory Methodology Tools (E.22–E.25)

The following are structured methodology tools delivered through HTR Advisory engagements (not interactive Research Lab tools):

**E.22 VBC Contract Review Checklist**
65-item analysis framework in eight categories: Benchmark Methodology, Attribution, Quality Withhold, Risk Corridors and Stop-Loss, Carve-Outs, Reconciliation, Reporting Requirements, and Termination Provisions. Delivered in Advisory contract review engagements.

**E.23 Policy Impact Assessment Framework**
Structured evaluation tool for new policy developments covering: exposure mapping, financial impact estimation, scenario analysis, response strategy selection, and stakeholder communication. Delivered in Advisory policy analysis engagements.

**E.24 FHIR Implementation Guide**
Step-by-step technical guide for Vermont's three priority FHIR use cases: Patient Access API, Provider Access API, and Payer-to-Provider API. EHR-specific notes for Epic, Oracle Health, Meditech, and TruBridge. Delivered through Advisory technology engagements.

**E.25 HCC Gap Closure Playbook**
Methodology guide for retrospective HCC gap analysis: RAF comparison, chart review protocol, HCC specificity coding education, AWV completion program design, and monitoring dashboard. Vermont-specific: pre-loaded AHEAD Medicare attribution data. Delivered through Advisory clinical documentation engagements.

---

*All Research Lab tool URLs are relative to healthtransformationreview.com. Full tool directory at /research-lab. Tool names as listed are exact labels in the Research Lab interface as of April 2026. For subscription information, visit healthtransformationreview.com.*
