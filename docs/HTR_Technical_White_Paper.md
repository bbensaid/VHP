# HTR Platform: Technical White Paper
## The Strategy and Code Logic Behind 20 Analytical Tools

**Vermont Health Transformation Research Platform**
*Prepared from the HTR Six-Pillar Blueprint and Production Codebase*
*April 2026*

---

## Preface: The Analytical Architecture

This white paper documents the design rationale and implementation logic behind each of the 20 analytical tools that comprise the Vermont Health Transformation (HTR) Research Platform. For every tool, two questions are answered:

**The Why** — What strategic problem does this tool solve within the Six-Pillar Framework? What system failure would occur without it?

**The How** — What is the mathematical and logical structure of the tool as implemented in the production codebase?

These tools are not independent utilities. They constitute an integrated analytical substrate for executing Vermont's mandatory healthcare transformation under Acts 167 and 68. The failure of any single pillar creates a systemic cascade; the tools are architected to mirror that interdependency.

**System Ground-Truth Constants** used across all tools:
- 9 of 14 Vermont hospitals reporting operating losses (FY2023 baseline)
- 136% of Medicare = absolute break-even floor for solvency stress tests
- $2.4B projected cumulative system deficit through 2028
- $1,303/discharge excess administrative cost vs. 75th percentile national benchmark
- 32.3% avoidable ED visits
- FY2027: Mandatory Reference-Based Pricing (RBP) hard stop
- FY2028: Non-CAH Global Budgets + Statewide Delivery Plan
- FY2030: Universal Global Budgets for all 14 hospitals

---

## Tool 1: APM Shared Savings Calculator

**Primary Pillar:** Economics
**Location:** `frontend/components/research/APMCalculator.tsx`

### The Why

The fundamental challenge of Vermont's transformation is transitioning hospital revenue from volume-based fee-for-service to population-based global budgets without triggering mass insolvency. The AHEAD program and Vermont's Medicaid ACO are not optional experiments — they are the statutory pathway to mandatory global budgets by FY2030. This tool models the financial mechanics of that transition, exposing the exact point at which each APM model becomes economically rational versus destructive for a given organization.

Without this tool, hospitals enter risk-based contracts without understanding the interaction between their Minimum Savings Rate (MSR), quality score penalties, loss-sharing exposure, and administrative overhead burden. The result is what Vermont experienced in the voluntary OneCare period (2012–2022): organizations join models but cannot manage them, generating losses they cannot explain.

### The How

The tool models five payment architectures against five user-configurable input dimensions:

**APM Model Parameters (hardcoded constants):**
```
MSSP Track 1:       sharingRate=0.50, lossShare=0.00, MSR=0.02, capGainPct=0.10
MSSP Enhanced:      sharingRate=0.75, lossShare=0.30, MSR=0.00, capGainPct=0.15
ACO REACH:          sharingRate=1.00, lossShare=1.00, MSR=0.00, capGainPct=1.00
BPCI-Advanced:      sharingRate=1.00, lossShare=1.00, MSR=0.00 (episode-based)
Custom:             user-defined across all parameters
```

**Core Calculation Waterfall** (executed in a single `useMemo` hook):
```
annualBenchmark    = attributedLives × benchmarkPMPM × 12
actualSpend        = annualBenchmark × (actualSpendPct / 100)
grossSavings       = annualBenchmark − actualSpend
savingsRate        = grossSavings / annualBenchmark

// MSR gate: if savings below threshold, shared savings = $0
netSavings         = savingsRate ≥ model.msr ? grossSavings : 0

// Quality multiplier: below score 70, withhold is applied
qualityMultiplier  = qualityScore ≥ 70 ? 1.0 : (1 − model.qualityWithhold)

// Shared savings (capped at capGainPct × benchmark)
sharedSavings      = min(netSavings × sharingRate × qualityMult, annualBenchmark × capGainPct)

// Loss payment (in deficit scenarios)
lossPayment        = |grossLoss| × model.lossShare

// Net position
netPosition        = sharedSavings − lossPayment − (adminCostPMPM × attributedLives × 12)

// Break-even threshold (admin cost coverage)
breakEvenSavingsPct = (adminCosts / (annualBenchmark × sharingRate)) × 100
```

**Vermont Presets** provide calibrated scenarios anchored to real program data:
- AHEAD FY2028: 52,000 attributed lives, $1,040 PMPM benchmark, 96.5% actual spend (3.5% savings)
- Medicaid ACO: 185,000 lives (largest Vermont payer), $620 PMPM, 98.1% actual spend
- Rural CAH: 4,200 lives, $1,120 PMPM (highest per-member cost, reflecting aging, rural complexity)

**Alert Logic** fires three conditional warnings: when savings rate falls below MSR (no payment earned despite savings), when quality score triggers withhold, and the break-even savings percentage required to cover admin overhead.

---

## Tool 2: Hospital Financial Stress Test

**Primary Pillar:** Economics
**Location:** `frontend/components/research/HospitalFinancialScorecard.tsx`

### The Why

Vermont's transformation is predicated on financial solvency. The 136% Medicare break-even constant in the blueprint is not an abstraction — it represents the minimum commercial payment rate below which PPS hospitals cannot maintain operations. Act 68's Reference-Based Pricing (FY2027 mandatory) will compress commercial revenue toward Medicare-plus benchmarks for the first time in Vermont's history.

Nine of fourteen Vermont hospitals were already reporting operating losses before this compression begins. This tool answers the survival question: under RBP, under Medicaid cuts, under travel nurse cost spirals, which hospitals remain solvent and which face closure? This intelligence is essential for the COE assignment strategy (Tool 12) — you cannot concentrate specialty volume at a hospital that will not survive the financing transition.

### The How

The tool runs four financial stress scenarios against five verified Vermont hospital financial baselines:

**Vermont Hospital Presets (verified FY2023 actuals):**
```
NVRH:   revenue=$48.2M, opex=$47.6M, cashOnHand=$5.8M, debtService=$1.2M
Gifford: revenue=$58.5M, opex=$57.2M, cashOnHand=$7.2M, debtService=$1.5M
CVMC:   revenue=$185M,  opex=$182.5M, cashOnHand=$28M,  debtService=$6.2M
```

**Stress Scenarios:**
```
Act 68 RBP (FY2027): volumeChangePct = −8%  (commercial at Medicare +15%)
H.R.1 Medicaid Cliff: medicaidCutPct = 12%, volumeChangePct = −5%, travelNurseIncrease = +15%
```

**Peer Group Benchmarks** (national 75th percentile targets):
```
CAH:            operatingMargin=0.8%,  dayCashOnHand=45,  debtServiceCoverage=2.0×
Rural PPS:      operatingMargin=1.2%,  dayCashOnHand=58,  debtServiceCoverage=2.5×
Urban Community: operatingMargin=2.0%, dayCashOnHand=90,  debtServiceCoverage=3.2×
```

**Calculated Ratios:**
- Operating Margin = (revenue − opex) / revenue
- Days Cash on Hand = cashOnHand / (opex / 365)
- Debt Service Coverage = (revenue − opex + depreciation) / annualDebtService
- Current Ratio = currentAssets / currentLiabilities
- Labor Cost % = laborCost / totalRevenue

Each ratio is evaluated against peer benchmarks and color-coded red (below benchmark), yellow (approaching), or green (above). The combined stress test shows the post-scenario operating margin against the 136% Medicare break-even floor.

---

## Tool 3: VBC Readiness Assessment

**Primary Pillar:** Operations
**Location:** `components/research/VBCReadinessAssessment.tsx`

### The Why

Global budgets do not simply happen — they require organizational infrastructure across six interconnected capability domains. Vermont's AHEAD cohort hospitals that enter global budget arrangements without adequate analytics, care management, physician alignment, or equity programs will experience the Maryland HSCRC early-period failure pattern: budget pressure without delivery models to reduce costs, leading to service closures rather than care transformation.

This tool provides the pre-entry organizational gap analysis that identifies the 2-3 year investment pathway required before an organization can safely assume downside risk. It is the operational prerequisite for Tool 1 (APM Calculator) — an organization must know its readiness score before it can safely choose an APM model.

### The How

The tool implements a 30-dimension assessment across 6 organizational domains, each mapped to its corresponding HTR pillar:

```
Strategy & Leadership  (5 dims) → Policy Pillar
Data & Analytics       (5 dims) → Technology Pillar
Clinical Operations    (5 dims) → Clinical Pillar
Financial Readiness    (5 dims) → Economics Pillar
Technology Infrastructure (5 dims) → Technology Pillar
Health Equity          (5 dims) → Equity Pillar
```

**Scoring Architecture:**
Each dimension is scored 0–4: Not Started → Early Stage → In Progress → Advanced → Optimized

The overall score is a weighted average across all answered dimensions:
```
domainAvg    = sum(answered scores) / answeredCount
domainPct    = domainAvg / 4 × 100
overallPct   = sum(domainAvg × answeredCount) / totalAnswered × 100 × 100
```

**Readiness Thresholds:**
```
≥ 80% → "Global Budget Ready"
60–79% → "Advanced — 12–18 Months to Readiness"
40–59% → "In Progress — 2–3 Years to Readiness"
20–39% → "Early Stage — Significant Investment Required"
< 20% → "Not Ready — Foundation Work Required"
```

**Gap Detection:** The tool sorts all dimensions with scores <3 in ascending order, surfacing the most critical organizational gaps first for prioritized action planning.

**Vermont Notes** embedded in each dimension connect abstract organizational requirements to concrete Vermont-specific actions (e.g., VHCURES access for data, FHIR Lab for interoperability, Vermont RHT Program $195M for investment capital).

---

## Tool 4: Equity Analytics — HEROI Calculator

**Primary Pillar:** Equity
**Location:** `components/research/HealthEquityStudio.tsx` (Tab 4: EquityICER)

### The Why

Standard cost-effectiveness analysis (CEA) is politically and ethically inadequate for health transformation. When an intervention costs more to deliver in a high-disparity population but generates equivalent or greater health gains, a standard ICER will systematically undervalue it — effectively directing resources away from the populations with the greatest need. The HEROI (Health Equity Return on Investment) ratio corrects this market failure by incorporating a societal preference for reducing health inequality into the investment calculus.

This tool implements Distributional Cost-Effectiveness Analysis (DCEA), allowing policymakers to specify equity weights from 1.0× (unweighted) to 3.0× (strong equity preference) and observe whether an intervention crosses standard cost-effectiveness thresholds when equity adjustments are applied. Without this, transformation systematically concentrates gains among already well-served populations, violating both the equity pillar's cross-cutting constraint and Vermont's AHEAD equity benchmarks.

### The How

**Standard ICER:**
```
standardICER = (interventionCost − controlCost) / (qalyIntervention − qalyControl)
```

**Equity-Weighted ICER** (DCEA framework, Cookson et al. 2017):
```
equityQALY   = qalyDiff × equityMultiplier × (disadvantageLevel / 2)
equityICER   = costDiff / equityQALY
```
where `disadvantageLevel` ranges 1.0 (average) to 3.0 (severely disadvantaged), and `equityMultiplier` is the societal preference weight (1.0×, 1.5×, 2.0×, or 3.0×).

**HEROI Ratio:**
```
HEROI = (financialSavings + socialValue) / programCost
```
A HEROI > 1.0 indicates that the combined financial savings from disparity reduction plus the social value of achieving health equity exceeds total program cost — the investment generates positive returns even before standard QALY accounting.

**Threshold Crossing Analysis:** For each of the four WTP thresholds (NICE $30K, ICER Standard $100K, ICER High $150K, CMS Informal $200K), the tool calculates the minimum equity weight multiplier required to cross that threshold:
```
minMult = costDiff / (qalyDiff × (disadvantage / 2) × thresholdValue)
```

---

## Tool 5: AI Clinical Governance Checklist

**Primary Pillar:** Technology
**Location:** `components/research/AIAnalyticsLab.tsx`

### The Why

Vermont's FY2030 global budget targets require dramatic reductions in avoidable utilization. The only scalable mechanism is clinical AI: sepsis prediction, readmission risk, fall prevention, medication non-adherence detection. But clinical AI deployed without governance frameworks creates new harms — biased algorithms that penalize rural or minority patients, false positive alerts that destroy clinical trust, poorly calibrated models that generate interventions for the wrong patients.

The blueprint flags "AI Tool Inventory, Bias Testing Protocols" as required inputs because VITL underutilization is the diagnostic flag for technology implementation failure. This tool operationalizes the due diligence framework that prevents AI deployment from becoming another layer of digitized paperwork rather than genuine population health intelligence.

### The How

The tool is structured across four analytical tabs:

**Tab 1 — Predictive Model Performance Comparator:**
Model types evaluated: Logistic Regression, Random Forest, XGBoost, Neural Network, LSTM, Ensemble.
Metrics calculated: AUC-ROC, sensitivity, specificity, PPV (Positive Predictive Value), calibration.
Deployed presets:
```
Sepsis XGBoost:      AUC=0.87, sensitivity=78%, specificity=85%, PPV=42%
Readmission LR:      AUC=0.72, sensitivity=60%, specificity=78%, PPV=35%
Fall Risk Ensemble:  AUC=0.81, sensitivity=72%, specificity=82%, PPV=28%
```

**Tab 2 — Bias Detection Engine:**
Population-level bias audit across demographic subgroups: the model computes predicted vs. actual event rates for each demographic segment, flags calibration drift (systematic over/under-prediction for specific groups), and calculates the demographic parity gap.

**Tab 3 — Governance Framework Builder:**
65-dimension governance checklist across: data governance, model development, clinical validation, deployment controls, ongoing monitoring, equity safeguards. Each dimension is binary (implemented/not) with a composite governance score.

**Tab 4 — Clinical AI ROI Calculator:**
```
truePositives    = populationSize × (prevalence/100) × (sensitivity/100)
falsePositives   = populationSize × (1 − prevalence/100) × (1 − specificity/100)
alertFatigueAdj  = 1 − (alertFatigue / 100)
netBenefit       = (truePositives × benefitPerTP × alertFatigueAdj) − (interventionCost × populationSize)
```

---

## Tool 6: VBC Contract Review Checklist

**Primary Pillar:** Economics
**Location:** `components/research/APMDesignLab.tsx` (Benchmark Comparison tab)

### The Why

VBC contracts contain structural traps that are invisible to organizations without analytical sophistication. The benchmark methodology — how the historical spend target is set — is the single most consequential variable in whether a global budget arrangement is survivable. A national trending benchmark advantages organizations in low-cost regions; a regional trending benchmark advantages those in high-cost regions. Signing the wrong contract locks a hospital into 3-5 years of guaranteed losses that cannot be operationally corrected.

### The How

The tool's benchmark comparison module implements three trending methodologies against the same attributed population and expenditure baseline:

**Benchmark Methods:**
- Regional: Uses local/state medical trend rate
- National: Uses national average medical trend
- Blended: Weighted average (configurable regional/national weight)

**Comparative Logic:**
```
regionalBenchmark = basePMPM × (1 + regionalTrend)^years × attributedLives × 12
nationalBenchmark = basePMPM × (1 + nationalTrend)^years × attributedLives × 12
blendedBenchmark  = (regional × blendWt) + (national × (1 − blendWt))
```

The tool generates a recommendation rule:
```
if regionalTrend > nationalTrend:
  → "Regional trending creates more favorable benchmark. Select regional."
else:
  → "National trend exceeds regional. National or blended benchmark may be more advantageous."
```

**Stop-Loss Configuration:** The APMDesignLab also models stop-loss thresholds (the percentage of benchmark at which CMS assumes surplus/deficit responsibility), quality withhold percentages, and MSR interaction — producing a composite contract risk score that flags contracts where multiple adverse terms compound.

---

## Tool 7: Policy Impact Assessment

**Primary Pillar:** Policy
**Location:** `components/research/PolicySimulator.tsx`

### The Why

Vermont's transformation is driven by statute, not voluntary adoption. Acts 167 and 68 create legally binding deadlines with financial penalties for non-compliance. But federal policy changes — CMS waivers, CMMI model modifications, H.R.1-style Medicaid cuts — can invalidate state-level planning assumptions mid-execution. An organization that built its FY2028 global budget strategy around a stable federal FMAP (Federal Medical Assistance Percentage) is catastrophically exposed if Congress changes the matching rate.

This tool forecasts the combined operational and financial exposure created by intersecting state statutory mandates and federal policy changes, enabling evidence-based adjustment of transformation timelines.

### The How

The tool models four policy vectors across a matrix of state-level Medicaid program parameters:

**Vermont State Parameters (hardcoded actuals):**
```
enrollees:         218,000
perCapitaSpending: $9,800
FMAP:              56.87%
budgetPct:         28.4% of state budget
uninsuredRate:     4.2%
```

**Waiver Simulation (Tab 1):**
For each waiver type (Global Commitment, DSRIP, Section 1115, Section 1332), the tool calculates:
```
federalExpenditure = enrollees × perCapitaSpending × (FMAP / 100)
stateMatch         = federalExpenditure × ((100 − FMAP) / FMAP)
netStateImpact     = stateMatch × waiverCompression
```

**APM Impact (Tab 2):**
Simulates the financial impact of a percentage shift from FFS to VBC revenue on a hospital's operating margin, integrating the Act 68 statutory timeline.

**Policy Trigger Logic:** The tool flags "System Architecture Failure" when any legislative scenario eliminates a pillar's financial viability — for example, an H.R.1 FMAP reduction that pushes Medicaid payments below 136% of Medicare, breaking the solvency floor constant.

---

## Tool 8: FHIR Implementation Guide

**Primary Pillar:** Technology
**Location:** `components/research/FHIRLab.tsx`

### The Why

Vermont's VITL (Vermont Information Technology Leaders) HIE represents one of the most underutilized data assets in the state's transformation infrastructure. VITL's underutilization is the blueprint's diagnostic flag for Technology pillar implementation failure. Without standardized FHIR R4 API connectivity, VHCURES claims data cannot be linked to clinical data, global budget performance cannot be measured in real time, and equity gaps in care quality remain invisible in aggregate statistics.

Act 68 mandates VITL/VHIE connectivity for all participating hospitals. This tool provides the technical implementation guide and validator that translates that statutory requirement into deployable API specifications.

### The How

**Tab 1 — FHIR Resource Builder:**
Constructs valid FHIR R4 JSON resources for Observation, Condition, Patient, and Medication resources with conformance validation. LOINC codes for vital signs are hardcoded with HL7-validated values:
```
8480-6  → Systolic blood pressure
8462-4  → Diastolic blood pressure
4548-4  → Hemoglobin A1c (diabetes management)
2160-0  → Creatinine (kidney disease monitoring)
```

**Tab 2 — Terminology Mapper:**
Cross-maps clinical terms across four coding systems essential for interoperability:
```
Diabetes mellitus type 2:
  ICD-10:  E11.9
  SNOMED:  44054006
  LOINC:   4548-4 (HbA1c monitoring)
  
Hypertension:
  ICD-10:  I10
  SNOMED:  38341003
  LOINC:   8480-6 (BP monitoring)
```

**Tab 3 — CDS Hooks Engine:**
Implements the HL7 CDS Hooks specification for real-time clinical decision support. Hook types: patient-view (on chart open), order-sign (pre-authorization), order-select.

**Tab 4 — Prior Authorization Automation:**
Generates FHIR-compliant prior auth request bundles using CRD (Coverage Requirements Discovery) workflow.

**Tab 5 — Compliance Checker:**
Validates FHIR implementations against ONC §170.315(g)(10) requirements and Act 68 data exchange mandates.

---

## Tool 9: Risk Adjustment Accuracy Playbook

**Primary Pillar:** Economics
**Location:** `components/research/RiskStratificationEngine.tsx` (Tab 1: HCC Calculator)

### The Why

CMS global budget benchmarks are denominated in Risk-Adjusted PMPM — the per-member-per-month benchmark is adjusted upward for populations with higher chronic disease burden. An organization that fails to capture HCC (Hierarchical Condition Categories) codes in clinical documentation will have its benchmark artificially depressed relative to its actual care cost, creating structural losses that no amount of operational efficiency can overcome.

Vermont's rural hospitals disproportionately serve elderly, high-complexity populations that carry multiple HCC conditions — CHF, COPD, diabetes with complications, CKD. The blueprint identifies Risk Adjustment Factor (RAF) scores and VHCURES data as required inputs precisely because accurate coding is the financial prerequisite for equitable benchmark setting.

### The How

The tool implements CMS v28 HCC model parameters across 20 clinically significant conditions:

**RAF Score Reference Table (key values):**
```
HCC 8  (Metastatic Cancer):          RAF = 2.659
HCC 161 (Pressure Ulcer Stage 4):    RAF = 2.227
HCC 77  (Multiple Sclerosis):        RAF = 0.522
HCC 188 (Schizophrenia):             RAF = 0.379
HCC 40  (Rheumatoid Arthritis):      RAF = 0.421
HCC 134 (ESRD/Dialysis):             RAF = 0.493
HCC 85  (CHF):                       RAF = 0.331
HCC 111 (COPD):                      RAF = 0.335
HCC 18  (Diabetes w/ Complications): RAF = 0.302
HCC 19  (Diabetes w/o Complication): RAF = 0.105
```

**Demographic Base RAF** (age/gender table, CMS v28 approximation):
```
Age 65–69 Male:  0.38  |  Age 80–84 Male:  0.72
Age 70–74 Male:  0.47  |  Age 85–89 Male:  0.89
Age 75–79 Male:  0.58  |  Age 90+ Male:    1.05
```

**Total RAF Calculation:**
```
totalRAF     = demographicRAF + sum(selected HCC RAF scores)
adjustedPMPM = basePMPM × totalRAF
annualSpend  = adjustedPMPM × 12 × memberCount
```

**Gap Identification:** The tool's population tab identifies members with documented clinical conditions that lack corresponding HCC codes — the coding gap that represents missed benchmark revenue.

---

## Tool 10: Hospital Performance Dashboard

**Primary Pillar:** Operations
**Location:** `components/HTIDashboard.tsx`

### The Why

The blueprint's $1,303/discharge excess administrative cost gap identifies PPS hospitals operating at the 75th percentile of national management and administrative overhead. This is the operations pillar's primary quantitative gap — not clinical quality but organizational efficiency. A hospital that achieves HEDIS benchmarks while maintaining $1,303 excess administrative overhead per discharge will not survive a global budget environment where total cost of care is the financial constraint.

The HTI (Healthcare Transformation Index) Dashboard provides the continuous performance monitoring infrastructure that translates statutory transformation requirements into trackable operational metrics.

### The How

The dashboard computes a six-domain composite index with validated weights:

```
Digital Maturity:      20%  (EHR Interoperability, AI Adoption Rate, Cyber Resilience)
Social Determinants:   20%  (SDOH Integration Score, Racial Equity Gap, Rural-Urban Gap)
Clinical Excellence:   20%  (Readmission Rate, Preventable Hospitalization PQI, HEDIS Composite)
Value-Based Care:      15%  (% Revenue in Risk Contracts, Shared Savings Participation, ACO Attribution)
Patient Experience:    15%  (Patient NPS, Digital Engagement Rate, PROM Collection Rate)
Workforce Wellness:    10%  (RN Turnover Rate, Burnout Index, Leadership Diversity)
```

**Composite Score:**
```
HTIScore = Σ (domainScore[i] × domainWeight[i])

statusLabels:
≥ 78 → "Leading"
≥ 65 → "Advancing"
≥ 50 → "Developing"
< 50 → "At Risk"
```

**State Time-Series Engine:** The dashboard imports `stateTimeSeries` and `nationalBenchmark` data arrays to plot HTI trajectory against national benchmarks, with velocity calculations showing whether a state's transformation is accelerating, stable, or decelerating.

**Clinical Metric Benchmarks (national reference):**
```
Preventable Hospitalization: 980/100K (lower = better)
Cancer Screening Rate:       69% (higher = better)
Mental Health Access:        52% of need met (higher = better)
Primary Care Density:        13.2 PCPs/10K population
```

---

## Tool 11: NASHP Hospital Cost Tool

**Primary Pillar:** Economics
**Location:** `components/research/HospitalFinancialScorecard.tsx` (Peer Benchmark tabs)

### The Why

Vermont hospitals cannot know whether their administrative costs are structurally excessive or reflect legitimate rural market conditions without comparison to verified national peer data. The NASHP (National Academy for State Health Policy) hospital cost methodology provides the peer-group-adjusted benchmarks that distinguish avoidable administrative inefficiency from inherent cost structure differences between hospital types.

The blueprint's $1,303/discharge gap is the aggregate finding. This tool decomposes it: what share is labor cost structure, what share is management overhead, what share is shared services inefficiency that could be addressed through consolidation?

### The How

The tool implements peer-group-adjusted benchmarks from CMS Cost Reports, organized by hospital classification:

**Peer Group Benchmarks (75th percentile national):**
```
CAH:             operatingMargin=0.8%,  laborCostPct=52%, dayCashOnHand=45
Rural PPS:       operatingMargin=1.2%,  laborCostPct=50%, dayCashOnHand=58
Urban Community: operatingMargin=2.0%,  laborCostPct=48%, dayCashOnHand=90
Urban Tertiary:  operatingMargin=3.5%,  laborCostPct=45%, dayCashOnHand=120
```

**Gap Calculation:**
```
adminGapPerDischarge = (actualAdminCostPerDischarge − benchmarkAdminCostPerDischarge)
totalAdminGap        = adminGapPerDischarge × annualDischarges
```

For Vermont PPS hospitals: `$1,303 × annualDischarges` = the total administrative drag that must be eliminated under global budget constraints.

**Adjusted Discharge Volume:** The tool normalizes for case mix index (CMI) to ensure comparisons reflect complexity-adjusted efficiency rather than raw volume differences.

---

## Tool 12: COE Assignment Framework

**Primary Pillar:** Operations
**Location:** `components/research/TransformationScorecard.tsx`

### The Why

Vermont's 9,616 square miles and 70 people/sq mile density create an irreducible geographic constraint: you cannot maintain specialty surgery at 14 separate hospital sites when volume is insufficient to support safe outcomes. The Center of Excellence (COE) designation system is the statutory mechanism (FY2028 deadline in the Statewide Health Care Delivery Strategic Plan) for concentrating specialty procedures at designated sites while maintaining community access to primary and emergency care.

Without the COE framework, clinical redesign (Pillar 4) cannot shift care from acute settings into the community — because the acute infrastructure remains over-provisioned for low-volume specialty care that consumes capital that should fund primary care transformation.

### The How

The TransformationScorecard tracks COE implementation against statutory milestones:
```
FY2026: Hospital transformation plans (Act 68, all 14 hospitals)
FY2028: COE designation system operational (Statewide Plan hard stop)
FY2030: Global budget universal coverage
```

**COE Viability Scoring:**
For each specialty service line, the tool evaluates:
- Minimum annual procedure volume for safe outcomes (evidence-based thresholds)
- Geographic access time from population centroids (Vermont: max acceptable drive time)
- Current hospital financial baseline (Tool 2 output → only financially viable sites receive COE designation)
- AHEAD equity benchmarks for geographic access

**Assignment Logic:**
```
if procedureVolume < minimumSafeThreshold:
  → flag for COE consolidation
if accessTime > maxAcceptable AND noAlternativeSite:
  → flag for access mitigation (telemedicine, transport subsidy)
if hospital.financialStressScore < threshold:
  → exclude from COE designation (hospital may not survive to FY2028)
```

---

## Tool 13: Transformation ROI Framework

**Primary Pillar:** Economics
**Location:** `components/research/CEACalculator.tsx`

### The Why

Vermont's $195M Rural Health Transformation (RHT) program represents the largest single investment in the state's healthcare history. Legislators, hospital boards, and payers need a rigorous financial framework to evaluate competing investment options: Does $1M invested in a Diabetes Prevention Program (DPP) generate greater value than $1M in an AI-powered RPM system? Does a Community Health Worker (CHW) program produce returns that justify diverting capital from capital equipment replacement?

The Transformation ROI Framework applies health technology assessment (HTA) methodology — specifically the ICER (Incremental Cost-Effectiveness Ratio) and QALY (Quality-Adjusted Life Year) framework — to Vermont's specific transformation investment decisions, with condition-specific preset parameters derived from published literature.

### The How

**Primary Calculation:**
```
responders       = populationSize × (efficacyRate / 100)
nnt              = 1 / efficacyRate  // Number needed to treat
totalCost        = costPerPatient × populationSize
incrementalCost  = totalCost − (comparatorCost × populationSize)
totalQALYs       = responders × qalyGain

// Discounted QALY calculation (annuity formula)
discountFactor   = (1 − (1 + r)^−t) / r  where r = discountRate, t = timeHorizon
discountedQALYs  = totalQALYs × (discountFactor / timeHorizon)

ICER             = incrementalCost / discountedQALYs
```

**Condition Presets** (calibrated to Vermont's priority clinical programs):
```
CoCM (Collaborative Care Model):    $1,200/patient, 58% efficacy, 0.28 QALY  → ~$7,400/QALY
MAT/MOUD (Opioid Treatment):        $5,600/patient, 50% efficacy, 0.45 QALY  → ~$24,900/QALY
Hospital at Home:                   $8,200/patient, 72% efficacy, 0.19 QALY  → ~$59,900/QALY
Sepsis AI Early Warning:            $6,800/patient, 38% efficacy, 0.62 QALY  → ~$28,800/QALY
```

**ICER Status Classification:**
```
< $30,000/QALY    → "Highly Cost-Effective" (NICE threshold)
$30,000–$100,000  → "Cost-Effective (ICER Standard)"
$100,000–$150,000 → "Borderline — Requires Justification"
$150,000–$200,000 → "High Cost — CMS Informal Threshold"
> $200,000/QALY   → "Not Cost-Effective at Standard Thresholds"
```

---

## Tool 14: Clinical Quality Optimizer

**Primary Pillar:** Clinical
**Location:** `components/research/ClinicalQualityOptimizer.tsx`

### The Why

Global budgets create financial pressure without automatically creating the delivery model changes needed to reduce costs. The Maryland HSCRC early-period failure demonstrated exactly this: global budget constraints without primary care alignment led to service closures rather than care transformation. The Clinical Quality Optimizer addresses the Clinical pillar's core mechanism: improving HEDIS performance through targeted interventions reduces avoidable acute care utilization, which is the only pathway to living within a fixed global budget.

The 32.3% avoidable ED visits figure from the blueprint represents the clinical opportunity. HEDIS performance improvement is the operational mechanism for capturing it.

### The How

The tool implements a multi-framework quality optimization engine:

**HEDIS Measure Set** (with weighted performance targets):
```
CDC (HbA1c Control):     p50=64%,  p90=76%,  weight=1.5
COL (CRC Screening):     p50=69%,  p90=80%,  weight=1.3
BCS (Breast Screening):  p50=68%,  p90=79%,  weight=1.3
CBP (BP Control):        p50=61%,  p90=73%,  weight=1.4
```

**Gap-to-Goal Calculation:**
```
gapToP90    = p90Target − currentPerformance
improvementPotential = gapToP90 × populationSize × weight
```

**Clinical Strategy Recommendations:** For each measure, the tool surfaces evidence-based intervention protocols ranked by implementation cost and expected performance gain (e.g., for HbA1c: proactive outreach calls, pharmacist-led MTM, CGM programs, culturally tailored diabetes education).

**Star Rating Engine:** Maps HEDIS performance to CMS Star Rating cut points across 5 domains, calculating the revenue impact of star rating changes:
```
starRatingImpact = membershipSize × (starBonusPct × revenuePMPM) × 12
```

**P4P Bonus Calculator:**
```
bonusRevenue = sum(measure improvements × baseBonus × memberCount / 1000)
```

---

## Tool 15: HTR Intelligence Feed

**Primary Pillar:** Technology
**Location:** `components/HTIDashboard.tsx` + `/app/the-wire`

### The Why

Vermont's transformation operates at the intersection of three rapidly changing policy environments: CMS/CMMI federal payment model design, Vermont GMCB (Green Mountain Care Board) regulatory actions, and state legislative session outputs. An organization that misses a CMMI model deadline or a GMCB rate order can find its transformation strategy invalidated within 90 days.

The HTR Intelligence Feed provides the real-time synthesis infrastructure that converts the firehose of federal and state policy activity into actionable strategic intelligence, organized by impact on the Six-Pillar Framework. VITL underutilization is the technology pillar's diagnostic flag; delayed policy response is the policy pillar's equivalent failure mode.

### The How

The HTI Dashboard tracks statutory milestone status against the Vermont transformation timeline:

**Hard-Stop Milestones (coded as `status: "active" | "upcoming" | "overdue"`):**
```
FY2026: All 14 hospital transformation plans (Act 68)
FY2027: Mandatory RBP implementation (GMCB rate setting)
FY2028: Non-CAH Global Budgets (AHEAD Cohort 1 + 2)
FY2028: Statewide Health Care Delivery Strategic Plan delivery
FY2030: Universal Global Budgets (all 14 Vermont hospitals)
```

**The Wire** (`/the-wire`) delivers weekly policy synthesis with content tagged to pillar, source (Federal Register, GMCB Orders, DVHA guidance), and urgency level. The HTI Dashboard sub-metrics track leading indicators of technology implementation progress: EHR Interoperability score, AI Adoption Rate, and VITL FHIR connectivity compliance percentage.

---

## Tool 16: HCC Gap Analysis Tool

**Primary Pillar:** Economics
**Location:** `components/research/RiskStratificationEngine.tsx` (HCC Calculator tab)

### The Why

HCC coding accuracy is the most direct lever a Vermont provider organization has on its global budget benchmark. An HCC gap — a clinically documented condition without a corresponding HCC code submitted to VHCURES — depresses the benchmark PMPM, creating a structural deficit that cannot be closed through utilization management or care redesign. The blueprint identifies HCC Category Codes and RAF Scores as required inputs to the APM Calculator precisely because an inaccurate RAF produces an unworkable benchmark.

### The How

The HCC Gap Analysis Tool (Tab 1 of the Risk Stratification Engine) implements a two-step workflow:

**Step 1 — RAF Score Assembly:**
User selects diagnosed conditions from the 20-condition HCC library; the tool assembles the composite RAF score:
```
compositeRAF = demographicBase + Σ(selected HCC RAF values)
```

**Step 2 — Gap Revenue Calculation:**
The tool compares the assembled RAF against a "documented" RAF (reflecting currently coded conditions only):
```
rafGap          = compositeRAF − documentedRAF
benchmarkGap    = rafGap × basePMPM × 12 × memberCount
```

This `benchmarkGap` is the annual revenue at risk from incomplete coding — the amount the global budget benchmark will be suppressed below its medically appropriate level if documentation gaps are not closed before the benchmark setting period.

**Population Distribution (Tab 2):**
Applies HCC scoring across a simulated attributed population, generating a risk stratification pyramid: top 5% high-risk (typically driving 50% of costs), rising-risk 15%, stable 80%. This pyramid structure drives care management program design and resource allocation.

---

## Tool 17: Health Equity Studio

**Primary Pillar:** Equity
**Location:** `components/research/HealthEquityStudio.tsx`

### The Why

The blueprint's most critical equity finding is that national VBC experience shows transformation improving averages while widening geographic and demographic disparities — the Safety-Net Provider Penalty. Vermont's AHEAD equity benchmarks require stratified performance measurement by Hospital Service Area. Without a tool that makes disparities visible, quantifies their cost, and models intervention pathways, transformation will replicate the national VBC experience: better average HEDIS scores for the commercially insured white population in Burlington while the Northeast Kingdom's outcomes continue to diverge.

### The How

**Tab 1 — Disparity Calculator:**
Implements population-weighted disparity scoring across 10 health outcomes × 5 racial/ethnic groups using CDC/AHRQ national disparity ratios.

```
weightedRate       = Σ(popShare[group] × baselineWhite × disparityRatio[group])
disparityIndex     = (weightedRate − allWhiteRate) / allWhiteRate × 100
excessEvents/100K  = Σ(popShare[group] × (rate[group] − baselineWhite)) × 100,000
costOfDisparity    = excessEvents/100K × perEventCost
```

Vermont presets anchor this calculation to Vermont's actual demographics: 94% white statewide, 88% white in Burlington (most diverse), 96% white in Northeast Kingdom (rural CAH service areas where poverty/disability burden drives outcome gaps despite demographic homogeneity).

**Tab 2 — Geographic Access Gap Analyzer:**
Composite access score (0–100) across 5 urban-rural continuum categories × 7 service types:
```
accessScore = (accessRate × 0.35) + (densityScore × 0.25) +
              (hpsaScore × 0.15) + (waitTimeScore × 0.15) +
              (insuredScore × 0.10)
```
HPSA (Health Professional Shortage Area) designation is coded as a three-level indicator (No = 100 points, Partial = 55, Full = 10), reflecting the statutory significance of shortage designations for federal funding eligibility.

**Tab 3 — SDOH Composite:**
15 indicators across 5 domains (Economic Stability, Education, Social Context, Health/Healthcare, Neighborhood/Environment) normalized against national benchmarks:
```
normalizedScore[i] = higherIsBetter ? min(local/national, 1.5)/1.5 × 100
                                    : max(0, (2 − local/national)/2 × 100)
compositeSDOH      = mean(normalizedScores) // 0=Severe deprivation, 100=Optimal
```
The composite maps to four health outcomes via evidence-based regression functions:
```
lifeExpectancy = 66.0 + (compositeSDOH / 100) × 14.0   // 66–80 year range
diabetesRate   = 18.0 − (compositeSDOH / 100) × 10.5   // 7.5–18% range
```

**Tab 4 — Equity ICER/HEROI:** (See Tool 4 above for full implementation detail)

---

## Tool 18: AI Analyst

**Primary Pillar:** Technology
**Location:** `app/chat` (UI) + `app/api/chat/route.ts` (Claude API backend)

### The Why

The twenty analytical tools in this platform generate structured quantitative outputs. But Vermont's transformation operates in the ambiguous space between data and decisions: a hospital CFO looking at a 136% Medicare break-even floor, a 2.659 RAF score for metastatic cancer patients, and a FY2027 RBP compliance deadline needs synthesis, not more data. The AI Analyst is the platform's conversational intelligence layer — it holds the Six-Pillar Logic Substrate as its operating framework and synthesizes disparate data points into decision-relevant guidance.

The blueprint's directive is explicit: "The local AI must treat the mathematical logic found in the codebase as the 'How' and the content of this blueprint as the 'Why.'"

### The How

The AI Analyst is a conversational interface backed by the Claude API, with the Six-Pillar blueprint loaded as a structured system prompt. The system prompt encodes:

**Six-Pillar Logic Gates** (the 15 interdependency relationships — each pillar's dependency on others is a logical constraint that filters valid recommendations)

**Failure Cascade Training Set** (the 6 historical examples of single-pillar thinking failure, allowing the AI to detect and flag incomplete transformation strategies)

**Ground-Truth Constants** (the 9 financial and demographic constants that must be respected in all calculations and recommendations)

**Statutory Timeline** (the FY2027/2028/2030 hard stops that create urgency gradients across recommendations)

The AI's diagnostic function is to flag "System Architecture Failure" when any response to a healthcare policy question fails to address all six pillars, their interdependencies, or the 136% break-even floor — preventing the single-pillar thinking that has characterized Vermont's previous transformation attempts.

**Architecture:**
```
User Query → 
  System Context (Six-Pillar Blueprint + Ground-Truth Constants) →
  Tool Output Data (optional, if user is analyzing specific tool results) →
  Claude API (claude-sonnet-4-6 or claude-opus-4-7) →
  Streaming Response with pillar-tagged analysis →
  Right Sidebar Widget + Full Chat at /chat
```

---

## Tool 19: RHRC Methodology Framework

**Primary Pillar:** Operations
**Location:** `components/research/TransformationScorecard.tsx`

### The Why

Vermont's 14 hospitals are not uniformly viable in their current configurations. The RHRC (Rural Hospital Restructuring Commission) — referenced repeatedly in Act 68 — provides the structured methodology for hospital right-sizing: determining which service lines should be maintained locally, which should be regionalized to COEs, and which should be converted to alternative care delivery models (FQHC, emergency-only, community health center).

Without RHRC methodology, the COE assignment framework (Tool 12) lacks its complement. COE concentrates specialty volume; RHRC provides the blueprint for what replaces full acute hospital capabilities at sites that are right-sized to their true community health function.

### The How

The TransformationScorecard implements RHRC compliance tracking as a statutory milestone management system:

**RHRC-Related Milestones:**
```
FY2026: Hospital transformation plans submitted (Act 68) — status: "active"
         Vermont note: "$2M AHS transformation grants; RHRC technical assistance underway"
FY2028: Statewide Health Care Delivery Strategic Plan — Hard Stop
         Vermont note: "RHRC-submitted transformation plans required as input"
```

**Service Line Analysis Framework:**
For each hospital, RHRC methodology evaluates service lines against three criteria:
1. Volume threshold (minimum caseload for safe, cost-effective operations)
2. Geographic necessity (no alternative access within acceptable distance)
3. Financial contribution margin (net positive or cross-subsidy dependent)

**Right-Sizing Outcomes Matrix:**
```
High volume + Geographic necessity + Positive margin → Maintain as-is
Low volume + Geographic necessity + Negative margin → Convert to alternative model (FQHC/CAH-qualified)
Low volume + No geographic barrier + Negative margin → Regionalize to COE
High volume + Strong margin → COE designation candidate
```

**Vermont RHT Program Integration:** The $195M RHT program funds the transformation investments that RHRC transformation plans identify, creating the financial bridge between right-sizing decisions and actual implementation capacity.

---

## Tool 20: VHCURES Attribution Modeler

**Primary Pillar:** Technology
**Location:** `components/research/APMDesignLab.tsx` (Attribution method module)

### The Why

Every global budget calculation, every APM shared savings calculation, every PMPM benchmark begins with the same foundational question: which patients are attributed to this hospital or ACO? VHCURES (Vermont's All-Payer Claims Database) is the authoritative data source for this determination. Errors in attribution — patients attributed to the wrong provider, or not attributed at all — directly distort the benchmark PMPM, the shared savings calculation, and the equity analysis.

The AHEAD model uses prospective attribution (predicting future attributed population based on current utilization patterns) while traditional ACO models use retrospective attribution (assigning patients based on where they received the plurality of primary care visits in the measurement year). The choice of method significantly affects the attributed population size and composition — and therefore the benchmark.

### The How

The APMDesignLab models three attribution methodologies against a configurable attributed population:

**Attribution Method Options:**
```
claims:       Retrospective attribution — plurality primary care rule
              Attributed = Patients whose plurality of primary care E&M visits
              were with a provider in the ACO's TIN (Tax Identification Number)

prospective:  Forward-looking attribution — enrollment-based
              Attributed = Patients who designated a PCP in the ACO network
              during the enrollment period

hybrid:       Blended — prospective designation with claims-based fallback
              for patients without a designated PCP
```

**Attribution Impact on Benchmark:**
```
attributedLives    = f(attributionMethod, NPI_list, VHCURES_claims)
annualBenchmark    = attributedLives × benchmarkPMPM × 12
```

A 10% change in attributed lives from method selection produces a proportional change in the total benchmark dollar value. For Vermont's Medicaid ACO (185,000 attributed lives at $620 PMPM), a 10% attribution variance = $137.5M annual benchmark difference.

**VHCURES Data Requirements:**
The modeler requires NPI (National Provider Identifier) lists for all participating providers, VHCURES claims data for the baseline attribution period (typically 2-3 years), and monthly run-out periods to capture claims lag. Vermont's VHCURES submission deadline (monthly) and lag (3–6 months for complete claims) creates an attribution timing issue that the tool's lookback window parameter accommodates.

---

## Appendix A: Tool-to-Pillar Cross-Reference

| Tool | Primary Pillar | Dependency Tools | Failure Mode if Absent |
|------|---------------|------------------|------------------------|
| APM Shared Savings Calculator | Economics | Tools 9, 20 | Hospitals enter contracts without financial modeling |
| Hospital Financial Stress Test | Economics | Tool 12 | Insolvent hospitals receive COE designation |
| VBC Readiness Assessment | Operations | All tools | Organizations enter global budgets without capability gaps identified |
| Equity Analytics (HEROI) | Equity | Tool 17 | Transformation investments bypass disparity populations |
| AI Clinical Governance | Technology | Tool 10 | Biased AI deployed without oversight framework |
| VBC Contract Review | Economics | Tool 1 | Organizations sign unfavorable benchmark methodology |
| Policy Impact Assessment | Policy | Tool 15 | Federal policy changes invalidate state transformation plans |
| FHIR Implementation Guide | Technology | Tool 9, 20 | VITL remains underutilized; data substrate fails |
| Risk Adjustment Playbook | Economics | Tool 16, 20 | Benchmark PMPM artificially suppressed by coding gaps |
| Hospital Performance Dashboard | Operations | All tools | No continuous monitoring of transformation progress |
| NASHP Hospital Cost Tool | Economics | Tool 2 | Administrative excess unquantified; COE decisions uninformed |
| COE Assignment Framework | Operations | Tools 2, 11 | Specialty volume dispersed; quality and cost outcomes suffer |
| Transformation ROI Framework | Economics | Tool 14 | RHT $195M misallocated without ICER justification |
| Clinical Quality Optimizer | Clinical | Tool 17 | HEDIS gaps persist; avoidable utilization unaddressed |
| HTR Intelligence Feed | Technology | All tools | Policy changes missed; transformation timeline invalidated |
| HCC Gap Analysis Tool | Economics | Tool 9 | Benchmark PMPM set below medically appropriate level |
| Health Equity Studio | Equity | Tools 4, 17 | Disparities hidden in aggregate averages |
| AI Analyst | Technology | All tools | Framework intelligence isolated in individual tools |
| RHRC Methodology Framework | Operations | Tools 2, 12 | Right-sizing decisions lack structured methodology |
| VHCURES Attribution Modeler | Technology | Tools 1, 9 | Population denominator for all benchmarks is incorrect |

---

## Appendix B: The 15 Logic Gates in Code

The blueprint's 15 interdependency logic flows are encoded across the tool network as data dependencies:

**Policy → Economics:** `PolicySimulator.tsx` FMAP/waiver outputs feed `HospitalFinancialScorecard.tsx` stress test scenarios. The statutory RBP mandate (Tool 7) triggers the break-even floor calculation (Tool 2).

**Economics → Clinical:** `APMCalculator.tsx` shared savings output drives the ROI justification for `ClinicalQualityOptimizer.tsx` interventions — only when APM financial model shows adequate shared savings can care transformation investments be funded.

**Technology → Economics:** `RiskStratificationEngine.tsx` RAF scores and `FHIRLab.tsx` VHCURES connectivity are prerequisites for the benchmark PMPM in `APMCalculator.tsx`. Broken data pipeline = broken benchmark.

**Technology → Equity:** `HealthEquityStudio.tsx` Tab 1 (DisparityCalculator) requires the same population data infrastructure as the APM Calculator — VHCURES stratified by race, geography, and income. Aggregate data conceals the 11-point BIPOC primary care access gap.

**Equity → Policy:** `HealthEquityStudio.tsx` HEROI outputs feed back into `PolicySimulator.tsx` as evidence for equity-weighted investment decisions in Medicaid waiver design.

---

## Final Directive

The blueprint's final directive states: *"All outputs must resolve the tension between the current system's $2.4B deficit and the statutory requirement for structural transformation across all six pillars. Outputs that fail to address any single pillar, its dependency relationships, or the 136% break-even floor must be flagged as a 'System Architecture Failure.'"*

The 20 tools in this platform are the analytical operationalization of that directive. They do not describe transformation — they calculate it.

---

*HTR Research Platform — Technical Documentation*
*For research, strategy, and policy planning purposes.*
*Not a substitute for legal, financial, or clinical professional guidance.*
