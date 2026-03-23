# HTR Research Lab — Complete User Guide

> **Location:** `/research-lab`
> **Access:** Professional plan and above
> **Purpose:** Six interactive quantitative modeling labs — 19 tools total — covering payment models, policy simulation, population health, AI governance, FHIR interoperability, and knowledge management. All computations run entirely in the browser. No patient data or inputs are transmitted to any server.

---

## Overview of the Six Labs

| Lab | URL | Tools |
|---|---|---|
| Payment Models & VBC | `/research-lab/payment-models` | APM Design Lab, APM Shared Savings Calculator, CEA Calculator |
| Policy & Quality Sciences | `/research-lab/policy-quality` | Policy Simulator, Clinical Quality Optimizer, Hospital Financial Scorecard, HTA Studio, Actuarial Lab |
| Population & Equity | `/research-lab/population-equity` | Population Health Modeler, AI Analytics Lab (Digital Health) |
| Technology & AI | `/research-lab/technology-ai` | AI Performance Analyzer, Algorithmic Bias Auditor, AI Governance Builder, Build vs. Buy Calculator, AI Scribe ROI |
| Interoperability & Risk | `/research-lab/interoperability` | FHIR Interoperability Lab, Risk Stratification Engine |
| Knowledge & Workspace | `/research-lab/knowledge-workspace` | Evidence Library, Workforce Modeler, Innovation Leaderboard, Research Workspace |

---

---

# Part I — Payment Models & VBC

`/research-lab/payment-models`

Three tools for designing, stress-testing, and evaluating alternative payment models from global budgets to episode bundles to cost-effectiveness analysis.

---

## Tool 1 — APM Design Lab

A three-tab modeling studio for designing alternative payment models at multiple levels of complexity.

---

### Tab 1 — ACO Architecture Designer

Design a custom ACO financial model by configuring all structural parameters and immediately seeing the resulting financial waterfall and viability assessment.

**Section A — Model Structure**

| Input | Options | Notes |
|---|---|---|
| Model Type | FFS with Shared Savings, Episode-Based, Prospective Capitation, Global Budget, Hybrid | Drives which financial mechanics apply |
| Risk Arrangement | One-Sided (upside only), Two-Sided (upside + downside), Full Risk | One-sided has no loss exposure; two-sided unlocks higher sharing rates |
| Attribution Method | Claims-Based, Panel-Based, Hybrid | How patients are assigned to the ACO |
| Benchmark Methodology | Regional (CMS Regional), National, Blended (Regional + National) | Blended shows a regional/national weight slider |

**Section B — Financial Parameters**

| Input | Range | Description |
|---|---|---|
| Upside Sharing Rate | 0–100% | ACO's share of gross savings above MSR |
| Downside Sharing Rate | 0–100% | ACO's share of losses below MLR (two-sided only) |
| Minimum Savings Rate (MSR) | 0–5% | Savings threshold ACO must exceed before sharing begins |
| Minimum Loss Rate (MLR) | 0–5% | Loss threshold before loss sharing is triggered |
| Savings Cap | 0–20% | Maximum shared savings as % of benchmark |
| Loss Cap | 0–20% | Maximum loss payment as % of benchmark |
| Quality Withhold | 0–10% | % of shared savings held pending quality performance |
| Quality Threshold Score | 0–100 | Minimum quality score to recover withhold |

**Section C — Population Data**

| Input | Range |
|---|---|
| Attributed Lives | 500–50,000 |
| Benchmark PMPM ($) | $400–$2,500 |
| Actual Spend (% of benchmark) | 75%–120% |
| Quality Performance Score | 0–100 |

**Section D — Results Dashboard**

| Output | Description |
|---|---|
| Gross Savings vs Benchmark | Total dollar savings; % of benchmark |
| Net ACO Position | After MSR, sharing rate, withhold, and caps |
| PMPM Equivalent | Net position divided by attributed lives and months |
| Break-Even Spend | The actual spend % at which the ACO breaks even |
| Financial Waterfall | Bar chart: Benchmark → Actual Spend → MSR Gate → Sharing Applied → Quality Withhold → Net Position |
| Viability Badge | Green (viable), Amber (marginal), Red (not viable) with reason text |

**Model Flags** — Three flags show pass/fail in real time:
- **MSR Gate** — whether savings exceed the minimum savings rate threshold
- **Downside Exposure** — maximum dollar loss if two-sided and under benchmark
- **Quality Withhold** — whether quality score meets threshold to recover withheld funds

---

### Tab 2 — Episode-Based Payment Designer

Design bundled payment models for specific procedural episodes.

**Episode Types (8 pre-configured)**

| Episode | 30-Day Base Cost | 90-Day Base Cost | 180-Day Base Cost |
|---|---|---|---|
| Joint Replacement | $22,000 | $28,000 | $32,000 |
| CABG | $45,000 | $55,000 | $62,000 |
| Hip Fracture | $24,000 | $32,000 | $38,000 |
| Pneumonia | $14,000 | $18,000 | $22,000 |
| Major Bowel Procedure | $35,000 | $42,000 | $50,000 |
| Cesarean Section | $16,000 | $20,000 | $24,000 |
| PCI | $28,000 | $34,000 | $40,000 |
| Chemotherapy | $18,000 | $30,000 | $52,000 |

**Configuration Inputs**

- **Episode Duration** — 30, 60, 90, or 180 days
- **Services Included** — checkboxes for 8 service categories (Facility Fee 38%, Physician Fee 18%, Anesthesia 7%, Post-Acute SNF 15%, Home Health 6%, Rehab Therapy 5%, Readmissions 7%, Labs/Imaging 4%); each shows its % of total cost
- **Target Price Method** — CMS-Based (historical −3%), Market-Based (−5%), Negotiated (custom % discount slider)
- **Episode Volume** — 10–2,000 episodes/year
- **Gainsharing Distribution** — Hospital %, Physician %; Reinvestment % auto-calculates to 100%

**Outputs**

- Current Average Episode Cost and Target Bundle Price
- Per-Episode Variance (positive = under target = savings)
- Total Gainsharing Pool (variance × volume)
- Gainsharing bar chart showing Hospital / Physician / Reinvestment splits
- Loss sharing alert if episodes exceed target
- Episode Cost Waterfall by care setting showing each service component

---

### Tab 3 — Global Budget Simulator

Model a 5-year spending trajectory under a global budget cap vs. unconstrained healthcare trend.

**Inputs**

| Input | Range | Default |
|---|---|---|
| Global Budget Growth Rate (annual) | 0–6% | 3.5% |
| Base Year Total Spending | $500M–$10,000M | $2,000M |
| Population Growth | −1% to +3% | 0.5% |
| General Healthcare Inflation | 3–8% | 5.0% |
| Hospital Cost Trend | 2–8% | 4.5% |
| Physician Cost Trend | 2–7% | 3.5% |
| Pharmaceutical Trend | 5–15% | 8.0% |
| SDOH Investment Offset toggle | On/Off | Off |
| Trend Reduction from SDOH Investment | 0.5–2.0% | 1.0% |

**Composite Unconstrained Trend** is calculated as a weighted average:
- Hospital: 45% weight
- Physician: 30% weight
- Pharmaceutical: 15% weight
- Other/Inflation: 10% weight

**5-Year Projection Output** — for each year:

| Output |
|---|
| Capped Budget (compound growth at your rate) |
| Unconstrained Spend (composite trend × population growth) |
| Required Efficiency (gap as % of unconstrained) |
| Feasibility status: Green (< 3%), Amber (3–5%), Red (> 5% — Feasibility Alert) |

---

## Tool 2 — APM Shared Savings Calculator

A simpler, preset-driven calculator for five standard ACO models. Ideal for rapid what-if analysis without configuring every structural parameter.

**Model Presets**

| Model | MSR | Sharing Rate | Loss Share | Quality Withhold | Savings Cap |
|---|---|---|---|---|---|
| MSSP Track 1 | 2.0% | 50% | None | 0% | 10% |
| MSSP Enhanced | 0.0% | 75% | 40% | 5% | 15% |
| ACO REACH | 0.0% | 50% | 50% | 5% | 20% |
| BPCI-Advanced | 0.0% | 100% | 100% | 0% | None |
| Custom | All adjustable | | | | |

**Inputs (all models)**

| Input | Range |
|---|---|
| Attributed Lives | 500–50,000 |
| Benchmark PMPM ($) | $400–$2,500 |
| Actual Spend (% of benchmark) | 75%–120% |
| Quality Performance Score | 0–100 |
| Admin Cost PMPM ($) | $0–$50 |

**Outputs**

| Output | Description |
|---|---|
| Annual Benchmark | Total benchmark spending |
| Gross Savings | Benchmark minus actual spend |
| Net Savings after MSR | Gross savings less minimum savings threshold |
| Quality Multiplier | Multiplier based on quality score (< 40 = 0.0×, 40–59 = 0.5×, 60–79 = 0.75×, ≥ 80 = 1.0×) |
| Shared Savings (capped) | Net savings × sharing rate × quality multiplier, capped at savings cap |
| Loss Payment | Downside payment if applicable |
| Admin Cost | Admin PMPM × attributed lives × 12 |
| Net Position | Shared savings − admin cost − loss payment |
| Net Position PMPM | Net position divided by attributed lives and 12 months |
| Break-Even Savings % | The gross savings % at which net position = 0 |

---

## Tool 3 — Cost-Effectiveness Analysis (CEA) Calculator

Calculate ICER (Incremental Cost-Effectiveness Ratio) and classify an intervention against four standard willingness-to-pay (WTP) thresholds.

**Pre-built Condition Presets (12 conditions)** — clicking a condition pre-fills all inputs with evidence-based defaults:

| Condition | Example Pre-Set Cost/Patient | Efficacy Rate |
|---|---|---|
| Cardiovascular Disease | (varies by intervention) | varies |
| Diabetes T2 | (prevention program defaults) | varies |
| Mental Health | (collaborative care defaults) | varies |
| Cancer Screening | (colonoscopy defaults) | varies |
| Opioid Use Disorder | (MOUD defaults) | varies |
| COPD | | |
| Hypertension | | |
| Stroke Prevention | | |
| Obesity | | |
| HIV Prevention | | |
| Asthma | | |
| Maternal Health | | |

**Inputs**

| Input | Description |
|---|---|
| Cost per Patient ($) | Annual cost of the new intervention per patient |
| Efficacy Rate (%) | % of treated patients who respond |
| QALY Gain per Responder | Quality-adjusted life years gained |
| Population Size | Number of eligible patients |
| Time Horizon (years) | 1–20 years |
| Discount Rate (%) | 0–10%; applied to future QALYs |
| Comparator Cost per Patient ($) | Annual cost of standard of care |

**Outputs**

| Output | Formula |
|---|---|
| Responders | Population × Efficacy Rate |
| Number Needed to Treat (NNT) | 100 / Efficacy Rate |
| Total Intervention Cost | Cost per Patient × Population |
| Incremental Cost | (Intervention − Comparator) × Population |
| Total QALYs Gained | Responders × QALY Gain |
| Discounted QALYs | Total QALYs adjusted for discount rate and time horizon |
| ICER | Incremental Cost ÷ Discounted QALYs |

**ICER Classification**

| ICER Range | Classification |
|---|---|
| < $0 (dominant) | Highly Cost-Effective — Dominant |
| $0 – $30,000 | Highly Cost-Effective (NICE threshold) |
| $30,001 – $100,000 | Cost-Effective (ICER Standard threshold) |
| $100,001 – $150,000 | Borderline (ICER High threshold) |
| $150,001 – $200,000 | High Value but Uncertain (CMS Informal threshold) |
| > $200,000 | Not Cost-Effective by standard thresholds |

---

---

# Part II — Policy & Quality Sciences

`/research-lab/policy-quality`

Five tools for policy simulation, quality measurement, hospital financial analysis, health technology assessment, and actuarial modeling.

---

## Tool 1 — Policy Simulator

A four-tab simulator modeling Medicaid waiver design, all-payer global budgets, Medicaid expansion, and price transparency.

---

### Tab 1 — 1115 Waiver Modeler

Design a Section 1115 Medicaid waiver and see projected enrollment, financial, population health, and CMS approval impacts.

**Waiver Type (7 options with CMS Alignment Scores)**

| Waiver Type | CMS Alignment | Description |
|---|---|---|
| Global Commitment | High | Vermont-style global budget waiver |
| DSRIP (Delivery System Reform) | High | Hospital transformation waiver |
| Community Engagement | Moderate | Work/community activity requirements |
| Expansion Premium | Moderate | Premium assistance for marketplace coverage |
| Managed Care | High | MCO-based Medicaid delivery |
| Behavioral Health | High | BH services integration |
| Global Budget | Moderate | All-payer global budget variant |

**State Data (6 states pre-loaded)**

| State | Enrollees | Per-Capita Spending | FMAP | Uninsured Rate |
|---|---|---|---|---|
| Vermont | 218,000 | $9,800 | 56.87% | 4.2% |
| New York | 7,800,000 | $11,200 | 50.00% | 6.8% |
| California | 14,600,000 | $8,400 | 50.00% | 7.2% |
| Texas | 4,200,000 | $6,900 | 61.39% | 18.4% |
| Ohio | 3,100,000 | $8,100 | 63.68% | 6.5% |
| Michigan | 2,800,000 | $8,700 | 65.27% | 5.8% |

**Waiver Design Parameters**

| Input | Range | Description |
|---|---|---|
| Coverage Expansion | 0–25% of uninsured | % of currently uninsured newly covered |
| Managed Care Penetration | 0–100% | % of enrollees in managed care |
| SDOH Investment Set-Aside | 0–5% | % of total spending directed to social determinants |
| Premiums (above 138% FPL) | $0–$100/month | Monthly premiums for expansion population |
| Community Engagement Requirement | None / 20 hrs/week / 80 hrs/month | Work/community activity requirements |
| Benefit Limitations | None / Dental carve-out / Vision / Non-emergency transport | Service exclusions |
| Work Requirement | Toggle | Reduces approval likelihood by 25 points |

**Outputs**

| Output | Description |
|---|---|
| CMS Approval Likelihood | % probability (0–98%); color-coded bar; degraded by work requirements, high premiums |
| Enrollment Impact (5-Year) | New enrollees (expansion) / Lost enrollees (requirements) / Net change / Total Yr-5 enrollees |
| 5-Year Spending Change | Total spend change; Federal share (90% FMAP for expansion); State net cost |
| Savings & Offsets | SDOH investment return (30¢ on dollar); Managed care efficiency (5% at 100% MC); Uncompensated care reduction ($2,800/newly insured) |
| Hospital Financial Impact | Revenue gain from expansion; revenue loss from disenrollment; net hospital impact |
| Population Health Metrics | ER visit reduction; preventable hospitalization reduction; estimated lives saved (~1 per 455 newly insured) |

---

### Tab 2 — All-Payer Model / Global Budget Designer

10-year global budget projection for any payer configuration.

**Inputs**

| Input | Range | Description |
|---|---|---|
| Base Year Spending | $500M–$20,000M | Total spending in base year |
| Annual Growth Cap | 0–6% | Maximum allowed growth per year |
| Projected Unconstrained Trend | 4–9% | What spending would grow to without a cap |
| Spending Allocation | Hospital 30–50% / Physician 28–35% / Drugs 10–20% | % of total budget by sector |
| Quality Pool | 0–5% | % of budget reserved for quality payments |
| SDOH Pool | 0–3% | % reserved for social determinants investment |
| Payer Alignment | Medicare / Medicaid / Commercial / Self-Pay toggles | Which payers are included in the global budget |
| VT ACO Compare Mode | Toggle | Overlays Vermont ACO model benchmarks |

**10-Year Projection Outputs** — per year:
- Capped Budget vs. Trend Budget
- Annual Savings Generated
- Cumulative Savings
- Quality Allocation ($)
- SDOH Allocation ($)
- Required Productivity Improvement % (trend gap / growth rate)

**Vermont ACO Benchmarks** (shown when Compare Mode is on):
- Growth Target: 3.5% / Actual Growth: 4.2% / Quality Score: 78 / SDOH Investment: 1.2%

---

### Tab 3 — Medicaid Expansion Impact

Non-expansion state analysis showing coverage gap and the impact of expansion.

**Non-Expansion State Data (10 states pre-loaded):** Texas, Florida, Georgia, Tennessee, Alabama, Mississippi, South Carolina, Kansas, Wisconsin, Wyoming — each with coverage gap size and annual uncompensated care costs.

**Outputs:**
- Coverage gap count and uninsured rate for selected state
- 5-year enrollment, spending, federal/state cost projections under expansion
- Uncompensated care reduction estimate

---

### Tab 4 — Price Transparency Analyzer

Models the financial and utilization impact of CMS price transparency requirements.

**Services with Rate Comparisons (10 procedures pre-loaded):**

| Service | HOPD Rate | ASC Rate | Office Rate |
|---|---|---|---|
| Knee Replacement | $28,500 | $14,200 | — |
| Colonoscopy | $1,850 | $620 | $520 |
| Echocardiogram | $890 | $420 | $310 |
| Infusion Therapy (per hour) | $520 | $200 | $160 |
| PT/OT (per session) | $230 | $110 | $90 |
| Lab Services (per panel) | $180 | $95 | $60 |
| (+ 4 additional procedures) | | | |

**NSA Surprise Billing Specialties:** Emergency Medicine, Anesthesiology, Radiology, Pathology, Neonatology

**Outputs:** Potential savings per site-of-care migration; annual savings if X% of volume shifts to lower-cost setting; surprise billing exposure estimate.

---

## Tool 2 — Clinical Quality Optimizer

Simulate HEDIS quality measure performance, CMS Star Ratings, MIPS composite scores, and Pay-for-Performance bonuses — with evidence-based improvement strategies for each measure.

---

### Tab 1 — HEDIS Simulator

Model quality measure performance for a health plan or provider group.

**Configuration:** Organization Type (Health Plan / Provider Group); Plan Type (Commercial / Medicaid / Medicare Advantage)

**15 HEDIS Measures with National Benchmarks**

| Measure | Code | P50 Benchmark | P90 Benchmark | Weight |
|---|---|---|---|---|
| Controlling High Blood Pressure | CBP | 62% | 74% | 1.5 |
| HbA1c Control (<8%) | HBD | 60% | 72% | 1.5 |
| Colorectal Cancer Screening | COL | 55% | 70% | 1.3 |
| Breast Cancer Screening | BCS | 67% | 79% | 1.2 |
| Childhood Immunization Status | CIS | 66% | 78% | 1.2 |
| Prenatal Care | PNC | 83% | 92% | 1.2 |
| Medication Adherence – Diabetes | MAH | 80% | 87% | 1.2 |
| BMI Assessment and Follow-Up | WCC | 66% | 80% | 1.0 |
| Cervical Cancer Screening | CCS | 58% | 71% | 1.2 |
| Depression Screening | DSF | 67% | 82% | 1.1 |
| Antidepressant Medication Mgmt | AMM | 58% | 70% | 1.1 |
| Follow-up after MH Hospitalization (7d) | FUH | 39% | 55% | 1.4 |
| Well-Child Visits | W34 | 70% | 83% | 1.0 |
| Immunizations – Adolescents | IMA | 37% | 52% | 1.0 |
| Access to Preventive/Ambulatory | AAP | 88% | 95% | 0.8 |

For each measure you can:
- Set your current performance with a slider
- See your 1–5 star rating vs. P50/P90 benchmarks
- Expand to see 4 evidence-based improvement strategies
- See opportunity score (gap to P90 × weight)

**Composite HEDIS Score** — weighted average of all measures; shown as a gradient card with overall star rating.

**Top 5 Opportunities** — sorted by weighted gap to P90; your highest-ROI measures ranked.

---

### Tab 2 — CMS Star Ratings Simulator

Model Medicare Advantage composite Star Rating across 5 domains (32 sub-measures).

**5 Star Rating Domains**

| Domain | Weight | Measures |
|---|---|---|
| Staying Healthy | 1.0× | 8 measures including flu vaccine, cancer screenings, BMI, diabetes monitoring |
| Managing Chronic Conditions | 3.0× | 9 measures including BP control, diabetes, medication adherence (each 3×) |
| Member Experience (CAHPS) | 4.0× | 6 measures including getting needed care, appointments, customer service (each 4×) |
| Member Complaints & Appeals | 1.5× | 6 measures including timely decisions, appeals review, call center performance |
| Health Plan Administration | 1.5× | 3 measures including physical/mental health improvement, readmissions |

Each measure has 5-star cut points. Enter your plan's performance on any measure and see the star contribution. Overall composite star rating drives CMS quality bonus payments.

---

### Tab 3 — MIPS Composite Score

Model Merit-based Incentive Payment System (MIPS) composite score for physician practices.

**Four MIPS Categories**

| Category | Weight | Input Method |
|---|---|---|
| Quality | 30% | Select 6 quality measures; enter performance rates |
| Improvement Activities | 15% | Select from 20 pre-built activities (10 or 20 points each) |
| Promoting Interoperability | 25% | Score on 4 PI requirements |
| Cost | 30% | Estimated based on resource use patterns |

**20 Improvement Activities pre-loaded** (with point values):
- Annual Psychosocial Needs Assessment (10 pts)
- Care Coordination Agreements with Specialists (20 pts)
- CMS-Approved Diabetes Prevention Program (20 pts)
- PCMH Certification/Attestation (20 pts)
- Behavioral Health Integration (20 pts)
- FHIR & Interoperability Standards (10 pts)
- Practice Improvements for Underserved Populations (20 pts)
- (+ 13 additional)

**Outputs:** Composite MIPS score (0–100); payment adjustment (+/− % of Medicare payments); Exceptional Performance bonus threshold (≥ 75 points).

---

### Tab 4 — Pay-for-Performance ROI Calculator

Calculate annual P4P bonus revenue for a provider group.

**12 P4P Measures with Base Bonus Values**

| Measure | Base Bonus |
|---|---|
| HbA1c Control (<8%) | $850 |
| Controlling High Blood Pressure | $900 |
| Follow-up after MH Hospitalization | $1,100 |
| Plan All-Cause Readmissions Reduction | $1,400 |
| Colorectal Cancer Screening | $600 |
| Breast Cancer Screening | $600 |
| Prenatal Care | $750 |
| Medication Adherence – Diabetes | $700 |
| Antidepressant Medication Management | $650 |
| Depression Screening | $450 |
| Well-Child Visits | $400 |
| Adolescent Immunizations | $500 |

For each measure: enter your current performance rate and whether you participate. The calculator outputs total annual P4P bonus revenue and a per-provider average.

---

## Tool 3 — Hospital Financial Scorecard

Benchmark your hospital's financial health against peer group medians. Stress-test against Medicaid cuts, volume changes, and travel nurse cost increases.

**Peer Groups (4 options)**

| Peer Group | Median Operating Margin | Median Days Cash | Median DSCR | Median Current Ratio | Median Labor % |
|---|---|---|---|---|---|
| Critical Access Hospital (CAH) | 0.8% | 45 days | 2.0× | 1.8× | 52% |
| Rural PPS Hospital | 1.2% | 58 days | 2.5× | 2.1× | 50% |
| Urban Community Hospital | 2.0% | 90 days | 3.2× | 2.4× | 48% |
| Urban Tertiary / Academic | 3.1% | 142 days | 4.0× | 2.8× | 45% |

**Base Financial Inputs (7 sliders)**

| Input | Default | Range |
|---|---|---|
| Total Net Revenue | $48M | $5M–$500M |
| Total Operating Expense | $47.4M | $5M–$500M |
| Cash & Investments | $5.8M | $0–$100M |
| Annual Debt Service | $1.2M | $0–$50M |
| Current Assets | $8.2M | $1M–$200M |
| Current Liabilities | $4.1M | $1M–$200M |
| Total Labor Costs | $24M | $1M–$300M |

**Stress Test Scenarios (3 sliders)**

| Scenario | Range | Mechanism |
|---|---|---|
| Medicaid Rate Cut | 0–20% | Reduces revenue by: rate cut % × 15% (Medicaid share of net revenue) |
| Volume Change | −30% to +20% | Adjusts revenue proportionally |
| Travel Nurse Labor Increase | 0–100% | Increases labor by: increase % × 12% (travel nurses' share of labor) |

**5 Scored Metrics**

| Metric | Scoring | Direction |
|---|---|---|
| Operating Margin | vs. peer median | Higher is better |
| Days Cash on Hand | vs. peer median | Higher is better |
| Debt Service Coverage Ratio | vs. peer median | Higher is better |
| Current Ratio | vs. peer median | Higher is better |
| Labor Cost % of Revenue | vs. peer median | Lower is better |

**Scoring Logic:** Each metric is scored Strong (≥ 115% of benchmark), Adequate (85–115%), Weak (60–85%), or Critical (< 60%).

**Overall Status:** Critical if ≥ 2 critical metrics; Weak if ≥ 1 critical or ≥ 2 weak; otherwise Adequate.

*Benchmarks sourced from AHA Annual Survey 2024 and Kaufman Hall National Hospital Flash Report.*

---

## Tool 4 — HTA Studio (Health Technology Assessment)

Four-tab HTA toolkit: Budget Impact Model, Multi-Criteria Decision Analysis, Probabilistic Sensitivity Analysis, and Threshold Analysis.

---

### Tab 1 — Budget Impact Model (BIM)

Model the 5-year payer budget impact of adopting a new intervention, including offsetting savings from avoided hospitalizations and ED visits.

**Intervention Parameters**

| Input | Description |
|---|---|
| Intervention Name | Free text label |
| Target Condition | 8 options: Diabetes T2, CHF, COPD, Depression, CKD, Oncology, Rare Disease, Hypertension |
| Total Population Size | Number of patients in the payer's covered population |
| Eligible Population (% of total) | % meeting clinical criteria for the intervention |
| Standard of Care Cost (annual/patient) | Annual cost of current therapy |
| New Intervention Cost (annual/patient) | Annual cost of new intervention |
| Market Uptake Scenario | Slow / Moderate / Rapid (see rates below) |
| Displacement (% switching from SoC) | % of eligible patients who switch |
| Total Covered Lives (for PMPM) | Used to calculate per-member-per-month cost impact |

**Uptake Scenario Rates**

| Scenario | Yr1 | Yr2 | Yr3 | Yr4 | Yr5 |
|---|---|---|---|---|---|
| Slow | 5% | 15% | 25% | 32% | 38% |
| Moderate | 10% | 25% | 40% | 50% | 58% |
| Rapid | 20% | 40% | 60% | 72% | 80% |

**Offsetting Savings (optional)**

| Offset Type | Inputs |
|---|---|
| Reduced Hospitalizations | Toggle; hospitalization reduction %; cost per hospitalization; baseline hospitalization rate |
| Reduced ED Visits | Toggle; ED reduction %; cost per ED visit; baseline ED visit rate |

**Outputs** — per year and 5-year cumulative:
- Treated patients, drug cost, offsetting savings, net cost, cumulative cost
- 5-year total budget impact (base, low/slow, high/rapid scenarios)
- PMPM impact at base, low, and high scenarios
- Warning flag if total 5-year impact exceeds $500M

---

### Tab 2 — Multi-Criteria Decision Analysis (MCDA)

Evaluate interventions across clinical, economic, and equity criteria using weighted scoring.

**Criteria Domains:** Clinical Efficacy, Safety Profile, Cost-Effectiveness, Implementation Feasibility, Health Equity Impact, Quality of Evidence

Each domain is weighted and scored for each intervention alternative. Outputs a weighted composite score and radar chart for each alternative.

---

### Tab 3 — Probabilistic Sensitivity Analysis (PSA)

Monte Carlo simulation (1,000 iterations) to model uncertainty in ICER estimates.

**Inputs:** Point estimates and standard deviations for cost and effectiveness parameters; distribution types (normal, log-normal, beta, gamma).

**Outputs:**
- Cost-effectiveness acceptability curve at multiple WTP thresholds
- Scatter plot of 1,000 cost-effectiveness pairs on the CE plane
- Probability cost-effective at each WTP threshold
- 95% credible interval for ICER

---

### Tab 4 — Threshold & Surrogate Endpoint Analysis

Calculate the minimum clinical threshold required to achieve cost-effectiveness at a given WTP, and map surrogate endpoints (HbA1c, LDL reduction) to QALY estimates.

**Inputs:** Current cost, comparator cost, WTP threshold, current QALY gain.

**Output:** The minimum QALY gain or efficacy rate required for cost-effectiveness at the specified WTP.

---

## Tool 5 — Actuarial Lab

Four-tab actuarial modeling suite for ACA plan design, premium rate setting, adverse selection dynamics, and IRA drug pricing.

---

### Tab 1 — Actuarial Value (AV) Calculator

Estimate the actuarial value and metallic tier of an ACA-compliant health plan based on cost-sharing parameters.

**Inputs (13 cost-sharing parameters)**

| Parameter | Default |
|---|---|
| Deductible | $1,500 |
| Out-of-Pocket Maximum | $7,000 |
| Coinsurance (%) | 20% |
| PCP Copay | $25 |
| Specialist Copay | $50 |
| ER Copay | $350 |
| Urgent Care Copay | $75 |
| Generic Drug Copay | $10 |
| Preferred Brand Copay | $45 |
| Non-Preferred Brand Copay | $95 |
| Specialty Drug Coinsurance (%) | 30% |
| Drug Deductible | $0 |
| CSR Silver Plan Toggle | Off |

**Algorithm:** AV estimated from OOP max (50–80% base), adjusted for deductibles (−4% per $1,000), coinsurance excess, and copay deltas from reference values. CSR toggle adds +7.3% AV (capped at 94%).

**Outputs:**
- Estimated AV % (45–97% range)
- Metallic Tier: Sub-Bronze (<56%), Bronze (56–68%), Silver (68–78%), Gold (78–88%), Platinum (≥88%)
- Tier visualization bar
- PMPM impact vs. standard Silver benchmark (~$4 PMPM per 1% AV difference)

---

### Tab 2 — Premium Rate Setting

Model the actuarially sound premium for a health plan.

**Inputs:** State, Plan Type (Individual/Small Group/Large Group), Target MLR, Expected Claims PMPM, Admin Load %, Profit Margin %, Risk Corridor toggle, Tobacco Surcharge %, Geographic Factor, Employer Contribution %.

**Outputs:** Required Premium PMPM; Employee share after employer contribution; Effective employee premium vs. benchmark comparison; MLR waterfall (claims → admin → profit → required premium).

---

### Tab 3 — Adverse Selection Dynamics

Model how premium increases and policy design features drive enrollment exit and risk pool deterioration.

**Inputs:** Population size, Initial insured rate, Average health score, Community rating toggle, Risk adjustment method, Year-1 premium increase %, Exit rate per 10% premium increase, Market stabilizers (mandate, risk corridors, reinsurance, CSR payments).

**Outputs:**
- Enrollment trajectory over 5 years
- Risk pool health score over time
- Premium spiral (if adverse selection is occurring)
- Breakeven premium increase rate before death spiral risk

---

### Tab 4 — IRA Drug Pricing Impact

Model the impact of the Inflation Reduction Act's Medicare drug price negotiation on 10 high-spend drugs.

**Pre-loaded IRA Drugs (10)**

| Drug | Current List Price | MFP (post-negotiation) | Medicare Spending |
|---|---|---|---|
| Eliquis (apixaban) | $7,120 | 44% of list | $16.4B |
| Jardiance (empagliflozin) | $6,450 | 34% of list | $7.1B |
| Xarelto (rivaroxaban) | $6,080 | 38% of list | $6.1B |
| Januvia (sitagliptin) | $6,200 | 21% of list | $4.2B |
| Farxiga (dapagliflozin) | $6,300 | 32% of list | $3.1B |
| Entresto | $8,200 | 39% of list | $2.9B |
| Enbrel (etanercept) | $74,000 | 25% of list | $2.7B |
| Imbruvica (ibrutinib) | $181,000 | 42% of list | $2.4B |
| Stelara (ustekinumab) | $119,000 | 34% of list | $2.2B |
| Insulin aspart (NovoLog) | $35 | 80% of list | $1.8B |

**Inputs:** Panel size (number of Medicare patients on each drug); toggle negotiated pricing on/off.

**Outputs:** Estimated savings per drug, total portfolio savings, PMPM impact on Medicare drug spend.

---

---

# Part III — Population & Equity

`/research-lab/population-equity`

---

## Tool 1 — Population Health Modeler

Four-tab simulation suite for chronic disease progression, epidemic modeling, population risk segmentation, and health equity analysis.

---

### Tab 1 — Chronic Disease Progression Model

Markov chain simulation across a patient cohort over a 10-year horizon.

**Disease Models**

| Disease | Severity States | Cost Range (annual/person) |
|---|---|---|
| Type 2 Diabetes | Pre-diabetes → Controlled → Uncontrolled → Complications → End-stage | $2,400–$48,000 |
| Heart Failure | NYHA I → NYHA II → NYHA III → NYHA IV → End-stage/Transplant | $8,500–$120,000 |
| COPD | GOLD 1 → GOLD 2 → GOLD 3 → GOLD 4 → Respiratory Failure | $3,200–$85,000 |
| Chronic Kidney Disease | CKD 1-2 → Stage 3 → Stage 4 → Stage 5 → ESRD/Dialysis | $3,800–$92,000 |
| Depression | Mild → Moderate → Mod-Severe → Severe → Treatment-Resistant | $3,100–$52,000 |

**Inputs:** Disease selection; cohort size (1,000–100,000); baseline state distribution (% across 5 states, must sum to 100%); Apply intervention toggle; Intervention efficacy (5–80% reduction in progression transitions); Cost per person per year ($).

**Pre-built Intervention Scenarios (15 total — 3 per disease)**

| Disease | Scenario | Efficacy | Cost/Person/Year |
|---|---|---|---|
| Diabetes | Intensive DM Program | 42% | $1,800 |
| Diabetes | Community Health Worker | 28% | $900 |
| Diabetes | CGM + Telehealth | 35% | $2,200 |
| Heart Failure | Remote Patient Monitoring | 38% | $1,600 |
| Heart Failure | ACE/ARB Optimization | 25% | $400 |
| Heart Failure | Hospital-at-Home | 45% | $3,200 |
| COPD | Pulmonary Rehab | 32% | $2,800 |
| COPD | Care Transitions Program | 22% | $1,100 |
| COPD | LABD Medication Optimization | 28% | $1,400 |
| CKD | Nephrology Care Management | 35% | $2,400 |
| CKD | SGLT2 Inhibitor Program | 42% | $3,600 |
| CKD | Dietitian Integration | 20% | $800 |
| Depression | Collaborative Care Model | 38% | $1,200 |
| Depression | Digital CBT Platform | 25% | $600 |
| Depression | PCMH BH Integration | 32% | $1,500 |

**Outputs:** 10-year stacked bar chart (cohort in each state over time); 10-year cumulative cost comparison (baseline vs. intervention); QALYs gained; ROI (net savings minus program cost); cost-per-QALY.

---

### Tab 2 — SIR Epidemic Model

Susceptible-Infected-Recovered epidemiological model with a vaccination arm.

**Inputs:** Population size; Initial infected (%); Transmission rate (β); Recovery rate (γ); Vaccination coverage (%); Vaccine efficacy (%); Simulation duration (weeks).

**Outputs:** S/I/R trajectory chart over time; Peak infected count and week; Herd immunity threshold (= 1 − 1/R₀ where R₀ = β/γ); Whether vaccination coverage exceeds herd immunity threshold.

---

### Tab 3 — Health Equity Studio

Model health disparity interventions across racial and socioeconomic dimensions.

**Inputs:** Baseline disparity gap (% outcome difference between highest and lowest groups); Intervention type; Population reach; Investment level.

**Outputs:** Projected disparity gap at Year 1, 3, 5; Lives affected; Cost per disparity-point-reduced.

---

### Tab 4 — SDOH Impact Modeler

Quantify the health and financial return on SDOH investments (housing, food security, transportation, employment support).

**Inputs:** SDOH category; Population in need; Investment per person; Evidence-based impact factor.

**Outputs:** Health events avoided per year; 5-year medical cost offset; ROI multiple on SDOH investment.

---

## Tool 2 — AI Analytics Lab (Digital Health)

Four-tab suite covering clinical AI performance, algorithmic bias, AI governance, build vs. buy, AI medical scribe ROI, and digital health technology ROI. (Full documentation in Part IV — Technology & AI.)

---

---

# Part IV — Technology & AI

`/research-lab/technology-ai`

---

## Tool 1 — AI Performance Analyzer

Four-tab clinical AI evaluation suite.

---

### Tab 1 — Model Performance Evaluator

Enter raw confusion matrix data and calculate all standard clinical AI performance metrics.

**Inputs:** True Positives, False Positives, True Negatives, False Negatives (enter as counts or use sliders).

**Outputs**

| Metric | Formula |
|---|---|
| Sensitivity (Recall) | TP / (TP + FN) |
| Specificity | TN / (TN + FP) |
| Precision (PPV) | TP / (TP + FP) |
| NPV | TN / (TN + FN) |
| F1 Score | 2 × (Precision × Recall) / (Precision + Recall) |
| Accuracy | (TP + TN) / Total |
| MCC (Matthews Correlation Coefficient) | ±1 scale; robust for imbalanced datasets |
| AUROC | Estimated from sensitivity/specificity |
| Prevalence | (TP + FN) / Total |

**Alert fatigue index:** FP Rate × (TP + FP) = alerts per day if deployed. Color-coded: green (< 20 alerts/day), amber (20–50), red (> 50).

---

### Tab 2 — Net Monetary Value (NMV) Calculator

Calculate the economic value of deploying a clinical AI model.

**Inputs:** True/False Positive costs, True/False Negative costs, deployment cost, patient volume, prevalence.

**NMV Formula:**
```
NMV = (TP × TP_value) + (TN × TN_value) − (FP × FP_cost) − (FN × FN_cost) − deployment_cost
```

**Outputs:** NMV per patient, annual NMV, break-even prevalence, optimal decision threshold recommendation.

---

### Tab 3 — Clinical Threshold Optimizer

Find the optimal classification threshold for a given clinical use case by trading sensitivity against specificity.

**Inputs:** ROC curve data (or sensitivity/specificity pairs at multiple thresholds), cost ratio of FP:FN, target use case (screening vs. rule-out vs. treatment selection).

**Outputs:** Optimal threshold, expected sensitivity and specificity at that threshold, net clinical benefit curve.

---

### Tab 4 — Deployment Readiness Checklist

Score a clinical AI model across 8 readiness dimensions: validation data, population representativeness, clinical workflow integration, monitoring plan, clinician training, consent and privacy, performance monitoring, and governance documentation.

**Output:** Readiness score (0–100); pass/fail by dimension; deployment risk rating (Low / Moderate / High).

---

## Tool 2 — Algorithmic Bias Auditor

Three-tab tool for detecting and quantifying bias in clinical AI models.

---

### Tab 1 — Fairness Criteria Tester

Test your model's performance data against three standard fairness criteria across demographic groups.

**Inputs:** Performance metrics (TPR, FPR, PPV) for each demographic group (Race, Gender, Income, Insurance, Geography).

**Three Fairness Criteria**

| Criterion | Definition | Threshold (pass) |
|---|---|---|
| Demographic Parity | Positive prediction rate equal across groups | < 5 percentage point gap |
| Equal Opportunity | True positive rate equal across groups | < 10 percentage point gap |
| Predictive Parity | Precision (PPV) equal across groups | < 10 percentage point gap |

**Output:** Pass/fail badge per criterion per demographic group; maximum disparity value; recommended mitigation strategy.

---

### Tab 2 — Bias Source Analyzer

Identify likely sources of bias in the training pipeline. Checklist of 12 bias sources across data collection, labeling, model design, and deployment stages. Severity rating (High / Medium / Low) for each identified source.

---

### Tab 3 — Mitigation Planner

Map identified bias sources to evidence-based mitigation strategies (re-sampling, re-weighting, adversarial debiasing, threshold adjustment, stratified monitoring). Estimate implementation effort (Low / Medium / High) and expected bias reduction for each strategy.

---

## Tool 3 — AI Governance Framework Builder

Six-domain governance assessment producing a governance score and regulatory risk rating.

**6 Domains, 22 Questions**

| Domain | Questions | Focus |
|---|---|---|
| Risk Classification | 4 | FDA SaMD classification (Class I–III); intended use; patient risk |
| Data Governance | 4 | Training data documentation; provenance; de-identification; consent |
| Clinical Validation | 4 | Prospective validation; external validation; subgroup analysis; intended population |
| Bias & Equity | 4 | Protected class analysis; disparity monitoring; corrective action plan |
| Monitoring & Alerting | 4 | Production monitoring cadence; drift detection; performance alert thresholds |
| Transparency & Explainability | 2 | Clinician-facing explanations; patient disclosure |

Each question is answered Yes/No/Partial. Each has a regulatory risk impact score.

**Outputs:**
- Governance score (0–100) with color-coded maturity level
- Regulatory risk rating: Low / Moderate / High / Critical
- Domain-by-domain gap analysis
- Top 3 priority remediation actions with effort and risk-reduction estimates

---

## Tool 4 — Build vs. Buy Calculator

NPV analysis comparing internal development of a clinical AI tool vs. purchasing a vendor solution.

**Build Inputs:** Development team cost (FTE × salary × months), infrastructure cost, integration cost, maintenance (% of build cost per year), timeline to deployment (months).

**Buy Inputs:** License/SaaS cost (annual), implementation cost (one-time), integration cost, vendor contract term (years).

**Shared Inputs:** Discount rate (%), time horizon (years), expected clinical value per year ($).

**Outputs:**
- 5-year NPV for Build and Buy scenarios
- Crossover point (year at which one becomes more favorable)
- Risk-adjusted NPV (adjusting for build project failure rate)
- Recommendation: Build / Buy / Hybrid with rationale

---

## Tool 5 — AI Medical Scribe ROI Calculator

Calculate the return on investment for deploying an AI medical documentation (ambient scribe) solution.

**Inputs:** Number of physicians; Average documentation time per encounter (minutes); Encounters per physician per day; Hourly physician rate ($); AI scribe cost per physician per month ($); Estimated documentation time reduction (%); Physician burnout reduction estimate (% FTE retention benefit).

**Outputs:**
- Hours saved per physician per day
- Annual documentation time saved across all physicians
- Annual time value of savings (hours × hourly rate)
- Monthly ROI and payback period
- Burnout cost offset (FTE retention × recruitment/training cost)
- Net annual benefit and ROI %

---

## Tool 6 — Digital Health Lab

Three calculators for RPM, telehealth, and patient engagement platform ROI.

**Remote Patient Monitoring (RPM) ROI Calculator**

CPT code revenue model: CPT 99453 (device setup), 99454 (device supply), 99457 (first 20 min monitoring), 99458 (additional 20 min), 99091 (data interpretation).

Inputs: enrolled patient count, device type, monthly monitoring minutes, hospitalization reduction rate, payer mix.
Outputs: total annual reimbursement by CPT code, gross margin, hospitalizations avoided, net ROI.

**Telehealth Utilization Modeler**

Models visit volume, revenue, and cost under different CMS policy scenarios. Inputs include specialty, payer mix, visit volume, and originating site status. Outputs include revenue comparison across policy scenarios and cost-per-visit analysis.

**Patient Engagement Platform Comparator**

Side-by-side evaluation across activation rate, NPS score, FHIR compliance, cost PMPM, and ROI.

---

---

# Part V — Interoperability & Risk

`/research-lab/interoperability`

---

## Tool 1 — FHIR Interoperability Lab

Five-tab FHIR R4 testing and compliance workbench.

---

### Tab 1 — FHIR Resource Builder

Build and validate FHIR R4 resource JSON. Select a resource type, complete the guided form, and the tool generates standards-compliant FHIR JSON.

**Resources supported:** Patient, Observation, Condition, MedicationRequest, Encounter, DiagnosticReport, Procedure, AllergyIntolerance, Immunization, CarePlan.

**Observation LOINC Codes pre-loaded (10):**

| LOINC | Description |
|---|---|
| 8480-6 | Systolic blood pressure |
| 8462-4 | Diastolic blood pressure |
| 8867-4 | Heart rate |
| 9279-1 | Respiratory rate |
| 8310-5 | Body temperature |
| 29463-7 | Body weight |
| 8302-2 | Body height |
| 2339-0 | Glucose in Blood |
| 4548-4 | Hemoglobin A1c |
| 2160-0 | Creatinine in Serum |

**Output:** Generated FHIR JSON with copy button; validation status (valid / warnings / errors); element-by-element validation detail.

---

### Tab 2 — Terminology Mapper

Cross-map clinical terms across ICD-10, SNOMED CT, LOINC, and RxNorm. 15 pre-loaded conditions with cross-system code mappings.

**Pre-loaded mappings (15 conditions including):**

| Clinical Term | ICD-10 | SNOMED CT |
|---|---|---|
| Diabetes mellitus type 2 | E11.9 | 44054006 |
| Hypertension | I10 | 38341003 |
| Sepsis | A41.9 | 91302008 |
| Acute MI | I21.9 | 22298006 |
| COPD | J44.1 | 13645005 |
| Major depressive disorder | F32.9 | 370143000 |
| CKD stage 3 | N18.3 | 433144002 |
| Atrial fibrillation | I48.91 | 49436004 |
| Heart failure | I50.9 | 84114007 |
| Stroke | I63.9 | 230690007 |
| (+ 5 more) | | |

---

### Tab 3 — CDS Hooks Tester

Simulate Clinical Decision Support (CDS) Hooks invocations and inspect the CDS card responses.

**Pre-built CDS Scenarios (6):**

| Scenario | Hook Type | Alert Level |
|---|---|---|
| Drug-Drug Interaction (Warfarin + Aspirin) | order-select | Critical |
| Overdue HbA1c Screening | patient-view | Warning |
| Statin Therapy for CVD Risk | order-select | Info |
| Opioid High-Risk Alert | order-sign | Critical |
| Sepsis Early Warning | patient-view | Critical |
| Preventive Care Gap | patient-view | Info |

Each scenario shows: summary card text, detail, indicator level, source citation, suggestion cards (actionable order recommendations). The test shows the full CDS Hooks JSON request/response structure.

---

### Tab 4 — Prior Authorization (FHIR PA)

Model the FHIR-based prior authorization workflow under the CMS 2024 Interoperability Rule.

**PA Scenarios pre-loaded:** Home health, Specialty drug, Imaging (MRI), DME, Physical therapy, Mental health inpatient.

Each scenario shows: required FHIR resources (Coverage, Claim, ClaimResponse), response time requirements (72 hours urgent / 7 days standard), and example FHIR ClaimResponse JSON.

---

### Tab 5 — ONC Compliance Checker

Self-assessment checklist for 21st Century Cures Act compliance.

**Compliance Areas:** Patient access API (SMART on FHIR), Provider access API, Payer-to-payer exchange, Information blocking attestation, Electronic prior authorization, CDS Hooks support.

For each area: compliance status toggle (Compliant / Partial / Non-Compliant), penalty risk level, implementation timeline.

**Output:** Overall compliance score; highest-risk gaps; recommended remediation steps with ONC regulatory citations.

---

## Tool 2 — Risk Stratification Engine

Four-tab risk scoring and population segmentation suite.

---

### Tab 1 — HCC v28 RAF Calculator

Calculate a Medicare Advantage risk adjustment factor (RAF) score for an individual patient.

**Demographic Base RAF (by age and gender)** — lookup table from age 18–99, male/female. Examples:
- Age 70, Female: ~0.459
- Age 80, Male: ~0.514

**20 HCC Conditions across 9 Categories with RAF Values**

| Category | Condition | RAF Value |
|---|---|---|
| Diabetes | Diabetes with Chronic Complications | 0.302 |
| Cardiovascular | Congestive Heart Failure | 0.331 |
| Cardiovascular | Coronary Artery Disease | 0.150 |
| Pulmonary | COPD | 0.335 |
| Pulmonary | Chronic Respiratory Failure | 0.587 |
| Metabolic | Morbid Obesity | 0.272 |
| Metabolic | Protein-Calorie Malnutrition | 0.455 |
| Behavioral | Major Depressive Disorder | 0.309 |
| Behavioral | Substance Use Disorder | 0.395 |
| Renal | Chronic Kidney Disease Stage 4–5 | 0.289 |
| Renal | ESRD on Dialysis | 0.493 |
| Cancer | Lung/Head/Neck Cancer | 1.024 |
| Cancer | Metastatic Cancer | 2.659 |
| Musculoskeletal | Hip Fracture/Dislocation | 0.394 |
| Musculoskeletal | Inflammatory Arthritis | 0.421 |
| Neurological | Multiple Sclerosis | 0.522 |
| Neurological | Ischemic/Hemorrhagic Stroke | 0.346 |
| Wounds | Pressure Ulcer Stage 3–4 | 1.233 |
| Wounds | Diabetic Foot Ulcer | 0.575 |
| (Additional conditions) | | |

**Total RAF** = Demographic Base RAF + sum of selected condition RAFs

**Risk Tier**

| RAF Score | Tier |
|---|---|
| < 1.0 | Low |
| 1.0–1.5 | Average |
| 1.5–2.5 | High |
| > 2.5 | Very High |

**Estimated MA Payment** = Total RAF × $950/month (monthly), × $11,400 (annual)

---

### Tab 2 — Population Risk Segmentation

Model cost and risk for a virtual patient panel.

**Inputs:**
- Panel size (500–50,000 patients)
- Payer mix (Medicare / Medicaid / Commercial / Uninsured %)
- Risk tier distribution (Very Low / Low / Moderate / High / Very High % — must sum to 100%)
- Condition prevalence sliders (Diabetes, CHF, COPD, CKD, Depression, Substance Use)
- SDOH risk factors (Housing instability, Food insecurity, Transportation barriers)

**Annual Cost Benchmarks by Tier** (AHRQ MEPS / CMS claims):

| Tier | Annual Cost per Patient |
|---|---|
| Very Low | $1,800 |
| Low | $3,200 |
| Moderate | $8,500 |
| High | $22,000 |
| Very High | $68,000 |

**Outputs:**
- Total annual panel cost and cost per patient
- High-risk patient count and % of panel
- Potential savings if 10% of High/Very High tier moves to Moderate ($cost avoided)
- SDOH Complexity Index (% of panel at elevated social risk)
- Segmentation bar chart

---

### Tab 3 — Custom Risk Model Builder

Build a custom risk scoring model using selected clinical, demographic, and SDOH variables.

**Variables:** Age, Chronic condition count, Prior hospitalization, ER utilization, Medication adherence score, SDOH score, Disability status, Dual eligibility.

**Inputs:** Weight each variable (0–10); define risk tier thresholds.

**Output:** Risk score distribution for a sample panel; sensitivity analysis of weight changes; comparison to HCC RAF alignment.

---

### Tab 4 — Comorbidity Interaction Analyzer

Model the compounding cost and risk effect of multi-condition comorbidity combinations.

**Pre-loaded comorbidity pairs and triads:** CHF+CKD, Diabetes+CKD, Diabetes+Depression, CHF+Depression+CKD, (+ others).

**Output:** Additive vs. synergistic cost multiplier; RAF interaction value; recommended care management intensity.

---

---

# Part VI — Knowledge & Workspace

`/research-lab/knowledge-workspace`

---

## Tool 1 — Evidence Library

Searchable, filterable reference library containing 25 CEA studies, 20 CMMI innovation models, and 15 HTR policy briefs.

---

### Section A — CEA Evidence Library (25 studies)

Peer-reviewed cost-effectiveness analyses from NEJM, JAMA, Lancet, and other major journals. Each entry includes: title, journal, year, condition, intervention, ICER value, verdict, and evidence level.

**Sort options:** ICER (ascending/descending), Year, Journal, Title

**Filter by:** Condition area, Verdict, Evidence level (High / Moderate / Low)

**Verdict classifications:**

| Verdict | ICER Range |
|---|---|
| Dominant | ICER < $0 (saves money AND improves health) |
| Highly Effective | < $30,000/QALY |
| Cost-Effective | $30,001–$100,000/QALY |
| Borderline | $100,001–$150,000/QALY |
| Not Cost-Effective | > $200,000/QALY |

**Selected studies (highlights):**

| Study | ICER | Verdict |
|---|---|---|
| Metformin for T2D Prevention (NEJM 2002) | $11,000 | Highly Effective |
| Buprenorphine for OUD (JAMA 2019) | $13,500 | Highly Effective |
| Childhood MMR Vaccine (MMWR 2014) | −$500 | Dominant |
| Hospital at Home (Ann Int Med 2022) | −$14,000 | Dominant |
| Palliative Care Consultation (NEJM 2010) | −$8,000 | Dominant |
| Lung Cancer Screening LDCT (NEJM 2011) | $52,000 | Cost-Effective |
| GLP-1 Agonists for Obesity (NEJM 2021) | $175,000 | Borderline |
| PCSK9 Inhibitors (NEJM 2017) | $325,000 | Not Cost-Effective |
| CAR-T Therapy Kymriah (NEJM 2018) | $610,000 | Not Cost-Effective |
| Gene Therapy Zolgensma (NEJM 2019) | $900,000 | Not Cost-Effective |

---

### Section B — CMMI Innovation Model Tracker (20 models)

Track all major Center for Medicare and Medicaid Innovation models: status, participants, savings evidence, and key lessons.

**Model Status:** Active, Ended, Cancelled

**Model Types:** ACO, Episode, Primary Care, Specialty, State/Rural, State/Equity, State/All-Payer, State/Pediatric

**20 Models Tracked (selected):**

| Model | Status | Participants | Key Finding |
|---|---|---|---|
| MSSP | Active | 485 ACOs | $1.8B net savings through 2022; Enhanced track outperforms |
| ACO REACH | Active | 150 | Successor to Direct Contracting; mandatory health equity plans |
| BPCI-Advanced | Active | 1,000 | $600M gross savings; orthopedic/cardiac working well |
| Vermont All-Payer ACO | Active | 1 (state) | Only all-payer state model; mixed early results |
| MSSP Next Gen ACO | Ended | 53 | Too complex; replaced by ACO REACH |
| CPC+ | Ended | 3,000 | No net savings despite quality improvement; 5-year timeline too short |
| Independence at Home | Ended | 14 | $2,700 savings/beneficiary; scalability limited by workforce |
| GUIDE (Dementia Care) | Active | 400 | Comprehensive dementia model with caregiver support |
| Making Care Primary (MCP) | Active | 200 | 10-year primary care transformation pathway |
| Transforming Maternity Care | Active | 150 | First bundled maternity model with doula integration |
| Radiation Oncology Model | Cancelled | 0 | Cancelled after stakeholder opposition |

Each model entry expands to show full lessons learned (100–200 word analysis per model).

---

### Section C — HTR Policy Briefs (15 briefs)

In-depth HTR-authored policy analyses on major healthcare transformation topics. Each brief includes: title, area, key statistic, 150-word abstract, and 500-word full body.

**Topic Areas:** Payment Reform, Access, Health IT, State Policy, Workforce, Equity

**15 Briefs include:**

| Title | Key Statistic |
|---|---|
| All-Payer Claims Databases: State Policy Landscape 2024 | $0 federal support for APCD infrastructure |
| Medicaid Expansion: 10-Year Impact Assessment | 4.1M adults still in coverage gap |
| Site-Neutral Payment: Evidence For and Against | Hospital outpatient pays 2.2× more than physician office |
| FHIR Interoperability: Status 2025 | 91% of hospitals have certified FHIR R4 APIs |
| Medicare Advantage: Overpayment and Risk Coding | MedPAC estimates $88B cumulative overpayment |
| Vermont Global Budget: Lessons Learned | GMCB regulated $4.2B in hospital spending in FY2024 |
| AI Regulation in Healthcare: Federal Policy Gap Analysis | FDA cleared 882 AI/ML devices through 2023 |
| Prior Authorization Reform: Legislative Landscape | 1 in 4 physicians report a patient harm from PA delays |
| No Surprises Act: Implementation Assessment | 490,000+ surprise billing disputes in first 18 months |
| (+ 6 additional briefs) | |

---

## Tool 2 — Workforce Modeler

Four-tab healthcare workforce supply, demand, and retention modeling tool.

---

### Tab 1 — Physician Supply & Demand

10-year national or regional physician supply and demand projection.

**12 Specialties pre-loaded:**

| Specialty | Current FTE | Annual Grads | Retirement Rate | Demand/Provider |
|---|---|---|---|---|
| Family Medicine | 109,000 | 4,800 | 3.5% | 3,029 patients |
| Internal Medicine | 135,000 | 8,000 | 3.5% | 2,444 patients |
| General Surgery | 26,000 | 1,200 | 3.8% | 12,692 patients |
| Orthopedics | 20,700 | 800 | 3.2% | 15,942 patients |
| Cardiology | 22,000 | 2,000 | 4.0% | 15,000 patients |
| Psychiatry | 33,000 | 1,900 | 4.5% | 10,000 patients |
| Emergency Medicine | 41,000 | 2,200 | 3.0% | 8,049 patients |
| OB/GYN | 19,000 | 1,300 | 4.2% | 8,684 patients |
| Pediatrics | 33,000 | 2,800 | 3.5% | 2,242 patients |
| Oncology | 13,300 | 700 | 3.8% | 24,812 patients |
| Neurology | 16,700 | 900 | 3.5% | 19,760 patients |
| Radiology | 34,000 | 1,100 | 3.3% | 9,706 patients |

**Adjustable Inputs:** Current FTE, Annual graduates, Retirement rate (%), IMG contribution, Population served, Demand per provider.

**Geographic Scope:** National (1.0×), Northeast (0.18×), Southeast (0.22×), Midwest (0.21×), West (0.24×), Rural (0.14×), Urban (0.56×).

**Outputs:** 10-year supply projection (FTE per year accounting for retirements + graduates + IMG); demand projection; supply/demand gap by year; shortage or surplus classification; graph of supply vs. demand curves.

---

### Tab 2 — Nurse Staffing Ratios

Model the cost and FTE impact of implementing mandatory nurse-to-patient staffing ratios.

**7 Unit Types pre-loaded:**

| Unit | Current Ratio | Mandated Ratio | Avg Salary | Agency % |
|---|---|---|---|---|
| ICU | 1:2 | 1:2 | $105,000 | 15% |
| Med/Surg | 1:6 | 1:5 | $82,000 | 20% |
| Emergency Dept | 1:4 | 1:4 | $95,000 | 25% |
| Labor & Delivery | 1:2 | 1:2 | $98,000 | 12% |
| Pediatrics | 1:4 | 1:4 | $88,000 | 18% |
| Telemetry | 1:5 | 1:4 | $86,000 | 22% |
| Behavioral Health | 1:6 | 1:5 | $78,000 | 30% |

**Inputs:** Current ratio, mandated ratio, census (occupied beds), current FTE, average salary, agency nurse proportion (%).

**Outputs:**
- Additional FTEs required to meet mandated ratio
- Annual incremental labor cost
- Agency cost if filled with travel nurses vs. permanent hire
- Annualized cost per unit type
- Total hospital cost of mandate compliance

---

### Tab 3 — Turnover ROI Calculator

Calculate the total cost of staff turnover and the ROI of retention investments.

**Role Defaults pre-loaded:**

| Role | Salary | Turnover Rate | Recruit Cost | Onboard Cost | Vacancy Days | Agency Premium |
|---|---|---|---|---|---|---|
| RN | $85,000 | 22% | $5,000 | $10,000 | 75 | 120% |
| Physician | $280,000 | 8% | $50,000 | $80,000 | 120 | 150% |
| APP (NP/PA) | $130,000 | 14% | $20,000 | $25,000 | 90 | 130% |
| Medical Assistant | $42,000 | 35% | $2,000 | $3,000 | 30 | 80% |
| (+ additional roles) | | | | | | |

**Inputs:** Role selection, number of FTEs in role, current turnover rate, recruit cost, onboarding cost, vacancy days, agency fill premium.

**Outputs:**
- Total annual turnover cost
- Cost per departure (recruit + onboard + vacancy + agency)
- Breakeven investment in retention programs
- ROI of 1% turnover reduction

---

### Tab 4 — Rural Workforce Shortage Analysis

Model rural healthcare workforce gaps and the financial case for rural-specific incentive programs.

**Inputs:** Rural population size; current provider-to-population ratio; target ratio; loan forgiveness program cost; retention bonus cost; rural training pipeline investment.

**Outputs:** Current shortage (FTEs needed); annual population-level impact of shortage; cost of filling gap with each incentive type; 10-year ROI of rural pipeline investment.

---

## Tool 3 — Innovation Leaderboard

Ranked leaderboards showing healthcare transformation performance across states, health systems, and payers.

**Three Leaderboards:**

**State Transformation Rankings** — 50 states scored and ranked on: AHEAD/APM adoption rate, quality measure performance, uninsured rate trajectory, Medicaid expansion status, SDOH investment index, hospital global budget adoption.

**Health System Performance** — Rankings across major health systems on: value-based care revenue %, readmission rate, quality composite, patient experience score, cost efficiency index, equity performance.

**Payer Innovation Index** — Rankings across major payers/insurers on: APM adoption rate, Star Rating, member HEDIS composite, prior authorization denial rate, network adequacy score.

**Filter options:** Region, System type (academic / community / rural / safety-net), Payer type (Commercial / Medicaid / Medicare).

---

## Tool 4 — Research Workspace

Save, organize, and export your Research Lab work across sessions.

**Features:**

**Scenario Storage** — Save named scenarios from any lab tool. Each saved scenario stores all input parameters so you can reload and compare configurations.

**Compare View** — Side-by-side comparison of up to 4 saved scenarios from the same tool. Differences between scenarios are highlighted.

**Report Templates** — Three pre-built report formats:
- Strategic Summary (executive-level, 1 page)
- Technical Analysis (full inputs + outputs + methodology notes)
- Policy Brief (framing, evidence synthesis, recommendation structure)

**Citation Generator** — Auto-generates citations for the data sources and evidence underlying each tool's pre-loaded parameters (AHA, AHRQ, CMS, NEJM, JAMA, etc.).

**Export Options** — Download workspace as PDF report or CSV data file.

*Note: The Research Workspace uses browser local storage. Data persists across page reloads on the same browser but does not sync across devices or browsers. Export your work before clearing browser storage.*

---

---

## Using the Research Lab Effectively

**These tools are for scenario modeling, not prediction.** All outputs are based on published evidence-based parameters and user-supplied inputs. They are designed to inform strategic planning, build the business case for program investment, and support evidence-based conversations — not to produce final financial forecasts for board-level budget commitments without additional validation.

**Vermont-specific calibration.** The Vermont All-Payer ACO Model data, Global Budget Simulator, and 1115 Waiver Modeler are explicitly calibrated to Vermont policy contexts. Vermont-specific prevalence rates, cost benchmarks, and regulatory parameters should be used when available to replace national defaults.

**Saving your work.** Tools do not persist state between browser sessions unless you use the Research Workspace save function. Screenshot or export results before closing.

**Data sources.** Pre-loaded parameter values are sourced from: AHA Annual Survey, AHRQ MEPS, CMS National Health Expenditure Accounts, NCQA HEDIS benchmarks, MedPAC reports, Kaufman Hall National Hospital Flash Report, AAMC workforce data, and peer-reviewed literature. Citations are available in the Research Workspace citation generator.

**Model limitations.** The HEDIS simulator, APM Calculator, and Hospital Financial Scorecard use simplified calculation models calibrated to real-world data but are not certified actuarial tools. For regulatory submissions, contract negotiations, or GAAP financial reporting, engage a licensed actuary.

**Advisory escalation.** If your modeling reveals a scenario requiring deep customization — multi-state APM design, Act 167 simulation for specific facilities, or population health program implementation — the Advisory Services panel on each lab page links directly to the HTR Advisory team.
