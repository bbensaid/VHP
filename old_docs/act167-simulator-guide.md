# Act 167 Healthcare Transformation Simulator
## Complete User Guide & Technical Reference

**Vermont Health Platform — Health Transformation Research**
**Version 1.0 | March 2026**
**Document classification: Internal Working Document**

---

> **Data Notice:** This simulator currently runs on a combination of data extracted from the Oliver
> Wyman "Act 167 Community Engagement: Recommendations" report (August 2024), publicly available
> GMCB hospital financial data, Vermont Census / ACS demographic data, and **synthetic projections**
> where actual data has not yet been ingested. All financial figures, outcome projections, and
> population statistics are illustrative for scenario-planning purposes. They should not be used as
> the sole basis for formal policy decisions without first replacing synthetic values with verified
> actuals. Section 9 of this guide describes exactly what real data is needed, where to obtain it,
> and how to ingest it.

---

## Table of Contents

**Part I — User Guide**

1. [Purpose and Intended Audience](#1-purpose-and-intended-audience)
2. [Navigating the Simulator](#2-navigating-the-simulator)
3. [Module 1 — Scenario Builder](#3-module-1--scenario-builder)
4. [Module 2 — Hospital Restructuring Simulator](#4-module-2--hospital-restructuring-simulator)
5. [Module 3 — Financial Modeling Dashboard](#5-module-3--financial-modeling-dashboard)
6. [Module 4 — Equity & Access Analysis](#6-module-4--equity--access-analysis)
7. [Module 5 — Technology Roadmap](#7-module-5--technology-roadmap)
8. [Module 6 — Workforce Planning](#8-module-6--workforce-planning)
9. [Module 7 — State Benchmarks](#9-module-7--state-benchmarks)
10. [Module 8 — Implementation Roadmap](#10-module-8--implementation-roadmap)
11. [Interpreting Results: The Five-Pillar Framework](#11-interpreting-results-the-five-pillar-framework)
12. [Common Use-Case Workflows](#12-common-use-case-workflows)

**Part II — Technical Guide**

13. [System Architecture Overview](#13-system-architecture-overview)
14. [File Structure and Codebase](#14-file-structure-and-codebase)
15. [Data Architecture: Types, Interfaces, and Schema](#15-data-architecture-types-interfaces-and-schema)
16. [The Five-Pillar Scoring System](#16-the-five-pillar-scoring-system)
17. [Simulation Engine: How Calculations Work](#17-simulation-engine-how-calculations-work)
18. [UI Component Library](#18-ui-component-library)
19. [State Management](#19-state-management)
20. [Data Ingestion Guide: What Real Data Is Needed](#20-data-ingestion-guide-what-real-data-is-needed)
21. [How to Add New Recommendations](#21-how-to-add-new-recommendations)
22. [How to Add New Hospitals or Modify Existing Data](#22-how-to-add-new-hospitals-or-modify-existing-data)
23. [Extending the Simulator: New Modules](#23-extending-the-simulator-new-modules)
24. [Maintenance and Operations Guide](#24-maintenance-and-operations-guide)
25. [Known Limitations and Future Development Roadmap](#25-known-limitations-and-future-development-roadmap)
26. [Data Sources and References](#26-data-sources-and-references)

---

# PART I — USER GUIDE

---

## 1. Purpose and Intended Audience

### 1.1 What Is This Tool?

The Act 167 Healthcare Transformation Simulator is an interactive, browser-based policy analysis
engine built specifically to model the implementation scenarios described in the Oliver Wyman
"Act 167 Community Engagement: Recommendations" report (August 2024). It allows analysts, policy
makers, hospital administrators, researchers, and community advocates to explore the consequences —
intended and unintended — of the report's recommendations before any are enacted.

The core insight behind the tool's design is this: the Wyman Report makes bold, systemic
recommendations that affect hospitals, communities, patients, workers, and state finances
simultaneously. No single metric tells the whole story. A recommendation that saves $40 million
a year may also force 9,500 rural residents to travel an extra 38 minutes for emergency care.
A policy that dramatically improves mental health access may require 18 months of legislative
groundwork before a single bed opens. This tool forces that full complexity into view.

### 1.2 Primary Audience

The simulator is designed to serve five distinct user types:

**Policy Makers and Legislators**
Vermont legislators, GMCB members, and AHS officials who need to understand the downstream
consequences of reform proposals — particularly the equity and financial tradeoffs — before
committing to a course of action. The Scenario Builder and Implementation Roadmap modules are
the most relevant starting points.

**Health Economists and Researchers**
Academics and policy analysts who want to model financial impact, compare Vermont to other state
transformations, or understand the aggregate cost-savings potential of different reform packages.
The Financial Modeling and State Benchmarks modules are primary tools.

**Hospital Administrators**
CEOs and CFOs of Vermont's 14 hospitals who want to understand what the Wyman Report means for
their specific institution — what options they face, what the financial trajectory looks like under
different scenarios, and what clinical and workforce changes would be required. The Hospital
Restructuring Simulator is purpose-built for this use case.

**Community Health Advocates and Equity Researchers**
Organizations focused on rural access, low-income populations, aging communities, or specific
demographic groups who need to understand which reforms help their communities and which
create new risks. The Equity & Access Analysis module is the primary tool.

**Infrastructure and Technology Planners**
IT directors, VITL administrators, and health information technology specialists planning the
digital infrastructure required to enable transformation. The Technology Roadmap module is
their primary resource.

### 1.3 Scope: What the Simulator Covers

The simulator models all major recommendation categories from the Wyman Report:

- Governance (AHS/GMCB PMO establishment)
- At-Risk Hospital Restructuring (all 4 "urgent restructuring" hospitals)
- Centers of Excellence (COE) Regionalization (surgical, mental health networks)
- Statewide Cost Reduction (shared services, group purchasing)
- Technology Infrastructure (VITL, telehealth, EMS broadband)
- Workforce Planning (new roles, pipeline, licensure reform)
- Equity and Transportation Access
- Payment Reform (reference-based pricing)
- UVMMC-specific cost reduction and productivity reform

It also draws on evidence from comparable state-level healthcare transformation models in Maryland,
Oregon, Minnesota, Pennsylvania, and Montana, grounded in peer-reviewed academic literature.

### 1.4 What This Tool Does Not Do

- It does not replace formal actuarial analysis or legal review.
- It does not access live GMCB data feeds in real time (the current version uses static data).
- It does not model individual patient-level outcomes.
- It does not automatically update when new GMCB reports are published.
- It does not yet include a geographic map visualization (planned for a future version).
- Financial figures currently use synthetic projections where real data is unavailable.
  See Section 20 for how to replace these with real data.

---

## 2. Navigating the Simulator

### 2.1 Accessing the Simulator

The simulator is accessible at:

```
http://localhost:3000/vermont-act-167/simulator
```

In production, this will be at the equivalent live domain path. You can reach it from three places:

1. **Left sidebar** → Tools & Resources → **HTR Simulator** → Use Cases tab → Vermont Act 167 → "Open Simulator"
2. **Act 167 Overview page** (`/vermont-act-167`) → click the **"Launch Simulation Engine →"** button in the "Policy Simulation Lab" section near the bottom of that page
3. **Direct URL** — navigate to `/vermont-act-167/simulator`

> **Context:** This simulator is a use case instance of the platform-wide **HTR Simulator** (`/htr-simulator`). The HTR Simulator hub contains the generic framework documentation — 5-pillar scoring model, methodology, and simulation engine mechanics. This guide covers only the Vermont Act 167-specific configuration. Readers unfamiliar with the simulation framework should start at `/htr-simulator` before using this guide.

### 2.2 The Header Panel

When the simulator loads, you will see a dark gradient header panel containing:

**Title and context:** "Act 167 Healthcare Transformation Simulator" with navigation breadcrumbs
back to the Act 167 Overview page.

**Status badges:**
- "Policy Simulation Engine" — confirms you are in the simulator
- "Beta — Synthetic Data" — a persistent reminder that current data includes synthetic projections

**Recommendation counter:** Two live numbers that update as you work:
- Total recommendations modeled in the system (14)
- Number of recommendations currently selected in your scenario (starts at 0)

**Quick control buttons:**
- **Select All Recommendations** — activates all 14 recommendations at once, giving you a
  "full implementation" scenario as a starting baseline
- **Clear Selection** — resets your scenario to zero selected recommendations
- **View Implementation Roadmap →** — appears only when at least one recommendation is selected;
  jumps directly to the Implementation Roadmap tab with your current selection applied

**Data source attribution:** A persistent note identifying the primary source document and the
use of synthetic projections.

### 2.3 The Tab Navigation Bar

Immediately below the page header is a sticky tab bar with nine navigation tabs. Tabs are
rendered as raised, browser-tab-style buttons (white background, black top/side borders when
active, sitting on a bottom border line) using the shared `HubPageTemplate` component. The
active tab is visually "lifted" off the bottom border. Tabs wrap to a second row on narrower
screens — there is no horizontal scrolling. The tab selection is synced to the URL query
parameter (`?tab=scenario`, `?tab=map`, etc.), so tabs are bookmarkable and browser
back/forward navigation works correctly.

The nine tabs are:

1. **Scenario Builder** — Select and configure recommendations; see aggregate impact
2. **Hospital Simulator** — Deep-dive per-hospital restructuring simulation
3. **Financial Modeling** — System and hospital-level financial analysis
4. **Equity & Access** — Geographic, demographic, and transportation equity analysis
5. **Geographic Map** — Interactive Leaflet map with real OpenStreetMap basemap
6. **Technology Roadmap** — IT and infrastructure implementation planning
7. **Workforce Planning** — Staffing, role, and pipeline analysis
8. **State Benchmarks** — Comparable state transformation models
9. **Implementation Plan** — Phased roadmap, dependencies, "no regrets" moves

Clicking any tab immediately renders its content below. The state of your scenario (which
recommendations are selected) persists across all tabs during your session.

### 2.4 Session State

The simulator maintains all user selections in React component state for the duration of the
browser session. There is no current persistence mechanism (no database, no cookies, no
localStorage). If you refresh the page, your scenario selections will reset.

**Implication for users:** Build your scenario in one session. If you want to save a particular
scenario for comparison, note which recommendations you have selected before navigating away.

---

## 3. Module 1 — Scenario Builder

### 3.1 Purpose

The Scenario Builder is the starting module and the hub of the simulator. It allows you to
construct a reform scenario by selecting any combination of the 14 modeled recommendations,
then see an immediate aggregate impact summary across all five pillars.

Think of this as your "control panel." Every other module in the simulator can use your selected
scenario as context. When you navigate to Financial Modeling with three recommendations selected,
only the financial impact of those three recommendations is shown. When you navigate to the
Implementation Roadmap, only your selected recommendations appear in the timeline.

### 3.2 Impact Summary Card

When at least one recommendation is selected, a blue summary card appears at the top of the
Scenario Builder showing:

**Active recommendation count:** How many recommendations are currently selected.

**Estimated Annual Savings ($M):** The aggregate annual savings potential across all selected
recommendations, summed across all five pillars. This represents a theoretical maximum if all
selected recommendations are implemented optimally.

**Total Investment ($M):** The aggregate one-time capital and setup investment required to
implement all selected recommendations.

**Five Pillar Gauges:** A row of five circular gauges, one per pillar. Each gauge shows a
score from 0 to 100, with color coding:
- Green gauge arc = positive impact direction (≥70 average score)
- Amber gauge arc = mixed impact direction (45–69 average score)
- Red gauge arc = negative or low impact (≤44 average score)

The gauge scores are the simple average of all selected recommendations' pillar scores. A score
of 80 in the Policy pillar means that, on average, the selected recommendations have strong,
well-defined policy pathways. A score of 45 in Equity means that the aggregate equity impact
is mixed — some recommendations help access, some create new access risks.

### 3.3 The Recommendation Checklist

Below the summary card is the full recommendation list, organized into nine category sections:

| Category | Color Code | Recommendations |
|---|---|---|
| Governance | Violet | 1 recommendation |
| At-Risk Hospital Restructuring | Rose/Red | 4 recommendations |
| COE Regionalization | Blue | 2 recommendations |
| Cost Reduction | Emerald | 1 recommendation |
| Technology | Sky Blue | 2 recommendations |
| Workforce | Orange | 1 recommendation |
| Equity & Access | Amber | 1 recommendation |
| Payment Reform | Indigo | 1 recommendation |
| UVMMC Reform | Purple | 1 recommendation |

Each recommendation card shows:
- **Checkbox** on the left for selection/deselection
- **Title** of the recommendation
- **Priority badge:** "Critical," "High," or "Medium"
- **Short description** of what the recommendation entails
- **Average impact score** (0–100) — the mean of the five pillar scores for that recommendation,
  displayed in large text on the right
- **Implementation year range** — "Year 1–2" indicates the recommendation can begin
  implementation in Year 1 (2025) and would be substantially complete by Year 2 (2026)
- **Affected hospitals** — if the recommendation targets specific hospitals, their short names
  are listed

### 3.4 Expanding a Recommendation

Each recommendation has a **"▼ Details"** toggle button. Clicking it expands a five-column
panel showing the full pillar analysis for that recommendation:

**Per-Pillar Detail Columns (one per pillar):**
Each column is color-coded by pillar and shows:
- Pillar name abbreviation
- Score (0–100) with direction context
- Headline sentence describing the key impact
- Implementation timeline
- Investment amount (if applicable)
- Annual savings amount (if applicable)
- Up to three specific action items drawn from the Wyman Report

This is the most granular view available in the Scenario Builder. For example, expanding
"Springfield Hospital: Convert to Rural Emergency Hospital (REH)" shows that the Equity pillar
has a score of 55 with a "mixed" direction, because while psychiatric care improves, 9,500 residents
lose acute inpatient access — and whether that is adequately mitigated depends entirely on whether
the $1.8M transportation investment is made.

### 3.5 Recommended Workflows in the Scenario Builder

**Full-implementation baseline:** Click "Select All Recommendations." This gives you the
theoretical maximum impact of implementing the entire Wyman Report. Use the pillar gauges to
understand where overall system strength and weakness lie.

**Critical path only:** Select only the four "critical" priority recommendations:
- AHS/GMCB PMO (governance foundation)
- Springfield REH (most urgent hospital)
- Gifford conversion (second most urgent)
- VITL Modernization (technology foundation)
This shows what the minimum viable reform package looks like.

**Equity stress test:** Select all four at-risk hospital restructuring recommendations (all
marked "critical" in the rose/red category) WITHOUT also selecting the Transportation recommendation.
Observe the Equity pillar score drop. Then add the Transportation recommendation back and watch
the score recover. This illustrates the dependency between restructuring and transportation
investment.

**Financial return scenario:** Select only the high-savings recommendations — Shared Services
Consortium, VITL Modernization, Reference-Based Pricing, and UVMMC Cost Reform — and look at the
aggregate investment vs. savings ratio. This demonstrates the business case for the reform package
that is most purely about system financial sustainability.

---

## 4. Module 2 — Hospital Restructuring Simulator

### 4.1 Purpose

This module simulates the specific restructuring options for each of the eight hospitals in the
"urgent" or "major restructuring" categories. It allows you to choose a restructuring model,
adjust three key parameters, and see the live five-pillar consequences for that specific hospital
and scenario.

### 4.2 Hospital Selector

The module opens with a grid of clickable hospital cards for the eight hospitals most urgently in
need of restructuring (all hospitals with "urgent" or "major" urgency levels). Each card shows:
- Hospital short name
- City
- Urgency badge (color-coded)

The default selection is Springfield Hospital (the most financially distressed at -14.2%
operating margin). Click any card to switch the simulation to that hospital.

**The eight hospitals available in this module:**
1. Springfield Hospital — Urgent
2. Grace Cottage Family Health & Hospital — Urgent
3. Gifford Medical Center — Urgent
4. North Country Hospital — Urgent
5. Northeastern Vermont Regional Hospital — Major
6. Copley Hospital — Major
7. Mt. Ascutney Hospital and Health Center — Major
8. Porter Medical Center — Significant (included for completeness)

### 4.3 Hospital Statistics Banner

Once a hospital is selected, a dark statistics banner displays its key operating data:

| Statistic | Source |
|---|---|
| Operating margin (%) | GMCB financial records / synthetic |
| Licensed beds | GMCB hospital profiles |
| Annual inpatient admissions | GMCB / Wyman Report |
| Annual ED visits | GMCB / Wyman Report |
| Annual operating loss ($M) | GMCB / synthetic projection |
| Households without vehicle (%) | Census ACS 5-year estimate / synthetic |
| Travel time to next nearest hospital (minutes) | Synthetic (based on geographic data) |

### 4.4 Restructuring Options

Four restructuring models are available, drawn directly from the Wyman Report's "Options"
framework:

**Option 1: Rural Emergency Hospital (REH)**
The REH designation is a federal CMS program (created by the Consolidated Appropriations Act of
2021, effective January 1, 2023 under 42 CFR § 485.500). It allows small hospitals in rural areas
to convert by maintaining a 24-hour emergency department, limiting acute inpatient beds to no more
than five, and receiving a supplemental Medicare payment. Under this model, inpatient beds are
typically repurposed for skilled nursing facility (SNF) or other extended care use.

*Model parameters in simulation:*
- 2 IP beds + SNF beds
- 24-hour emergency department
- Ambulatory surgery capability
- Free-standing diagnostics and pharmacy

*Recommended for:* Springfield Hospital, Grace Cottage

**Option 2: Community Ambulatory Care Center (CACC)**
The CACC model does not have a direct federal analog (unlike REH). It is an Oliver Wyman invention
for the Vermont context. It replaces full acute inpatient care with SNF/Rehabilitation/Mental Health
inpatient beds, a 16-hour urgent care service (rather than 24-hour ED), and an ambulatory surgery
center. This model is less capital-intensive than REH but provides slightly less around-the-clock
emergency coverage.

*Model parameters in simulation:*
- SNF + Rehab + Mental Health IP beds
- 16-hour urgent care (not full emergency department)
- Ambulatory surgery
- Free-standing diagnostics and pharmacy

*Recommended for:* North Country Hospital

**Option 3: Mental Health & Elder Care Focus (CACC-MH)**
A variant of the CACC model that converts the majority of inpatient beds specifically to
psychiatric care (adult and/or geriatric) or memory care. Preserves emergency department access.
This model is responsive to Vermont's acute psychiatric bed shortage.

*Model parameters in simulation:*
- Convert approximately 72% of acute beds to psychiatric/memory care
- Maintain emergency department
- Ambulatory surgery and diagnostics

*Recommended for:* Gifford Medical Center (convert to mental health/geriatric psychiatry/memory
care as per Wyman recommendation)

**Option 4: Full Closure + Service Migration**
The most disruptive option. All inpatient operations close and all patients are redirected to
regional centers. This option shows the maximum financial improvement but also the maximum
equity risk, because all admissions become transfers. It is presented as the "worst case" in the
Wyman Report but is a useful stress-test scenario.

### 4.5 Simulation Parameter Sliders

Three interactive sliders modify the simulation outcomes in real time:

**Transportation Investment (0–100% of recommended investment)**
Controls how much of the recommended medical transportation investment is made concurrently
with the hospital restructuring. At 0%, no new transport capacity is added and the equity risk
score reflects raw geographic isolation. At 100%, the full recommended investment ($1.8M–$3.8M
depending on the hospital) is made, and the equity risk score improves by up to 65%.

This slider embodies the core dependency in the Wyman Report: hospital restructuring without
concurrent transportation investment is a genuine access risk, not a theoretical one.

**Telehealth Implementation Scope (0–100%)**
Controls what percentage of the recommended telehealth infrastructure is deployed (broadband,
ED backup telemedicine, remote monitoring, EHR integration). At 0%, the restructured facility
has no telehealth capability. At 100%, full deployment is modeled. This affects the Technology
pillar score and, indirectly, the Clinical pillar score (because remote physician coverage
reduces transfer risks for lower-acuity cases).

**Implementation Speed (0–100% aggressiveness)**
Controls how quickly the restructuring is completed. The output "implementation months" is
displayed in real time. At 0% (fully conservative), implementation takes approximately 18 months.
At 100% (fully aggressive), implementation takes approximately 11 months. Speed has direct
consequences: faster implementation increases risk (less community engagement, less time for
regulatory approvals, less time for workforce transition) but reduces the period during which
the hospital is losing money at its current unsustainable rate.

### 4.6 Five-Pillar Output Panels

After setting parameters, five output panels display the simulation results:

**Policy Panel**
Shows regulatory complexity on a 1–10 scale, the specific key policy actions required (CMS REH
designation, GMCB budget renegotiation, CON amendment, transfer agreements), and the estimated
implementation timeline in months.

**Technology Panel**
Shows the telehealth coverage percentage based on the slider value, the estimated IT cost range
($1.4M–$2.8M for most hospitals), and the priority technology actions.

**Financial Panel**
Shows:
- Financial improvement percentage (what fraction of the annual loss is eliminated)
- Current annual loss → projected post-restructuring annual loss
- 2028 loss comparison: baseline trajectory vs. post-restructuring trajectory
- Panel turns green if the scenario achieves >50% loss reduction; amber otherwise

**Equity Panel**
Shows:
- Equity risk score (0–100; higher = more risk to equitable access)
- Number of acute admissions per year that must transfer under this model
- Average travel time to the next nearest hospital
- Percentage of households without a vehicle
- Percentage of population aged 65+
- Warning flag appears if transfer risk is above threshold

**Clinical Panel**
Shows:
- Transfer safety score (inverse of transfer risk, adjusted for transport and telehealth investment)
- Number of new psychiatric/memory care beds created (if applicable to the option)
- Key clinical protocol actions: procedures to stop, care to maintain, quality monitoring
  requirements

### 4.7 Applicable Wyman Report Recommendations

At the bottom of the Hospital Simulator, a "Applicable Wyman Report Recommendations" section
lists all recommendations that directly reference the selected hospital. Each is shown with its
five pillar gauges for quick comparison.

---

## 5. Module 3 — Financial Modeling Dashboard

### 5.1 Purpose

This module provides three different financial views of the Vermont hospital system, allowing
analysts to model the financial case for reform from multiple angles.

### 5.2 View Toggle

Three sub-views are available:

**📊 System Overview** — Aggregate Vermont hospital system financial position
**🏥 Hospital-by-Hospital** — Individual hospital financial profiles and improvement potential
**💧 Savings Waterfall** — Per-recommendation savings contribution ranked by magnitude

### 5.3 Parameter Controls

Two sliders appear above all three views and affect the calculations:

**Projection Horizon (1–10 years)**
How many years forward the financial model projects. The ROI calculation in the System Overview
uses this as its multiplier: ROI = (Annual Savings × Years − Total Investment) / Total Investment.
At 5 years (the default), a recommendation with $26M annual savings and $8.2M investment shows
a 5-year ROI of approximately 1,484%.

**Expense Growth Assumption (2–10%/year)**
The annual rate of healthcare expense inflation applied to project 2028 loss figures. The Wyman
Report used 5–8% expense growth in its projections. At 5%, the aggregate projected 2028 system
losses are higher than at 2%. Increasing this slider makes the status quo worse and the case
for reform stronger.

### 5.4 System Overview View

**Four metric cards:**
- Current Annual Loss ($M) — aggregate operating loss for all 14 hospitals today
- Projected 2028 Loss ($M) — without reform, at the selected expense growth rate
- Potential Annual Savings ($M) — based on selected recommendations (or all recommendations
  if none are selected)
- N-Year ROI (%) — return on the total investment based on selected projection horizon

**Hospital System Financial Health Bars:**
A horizontal bar chart showing all 14 hospitals sorted from most financially distressed (most
negative margin) to strongest (most positive margin). Each hospital shows:
- Its operating margin percentage
- A bi-directional bar: red bars extend left for losses, green bars extend right for profit
- An urgency badge

This gives an immediate visual sense of the financial landscape across the system.

**UVMMC Cost Context Card:**
A blue informational card highlighting three UVMMC-specific metrics from the Wyman Report:
- Administrative costs >400% of peer academic medical center benchmarks
- UVMMC accounts for >56% of Vermont's total commercial hospital spend
- UVMMC Medicare-to-cost ratio is 72% (MedPAC threshold for poor cost efficiency is 97%)

These numbers establish why UVMMC reform is structurally important even though UVMMC is not
losing money — it is the primary driver of Vermont's high commercial insurance costs.

### 5.5 Hospital-by-Hospital View

Each of the 14 hospitals is displayed as a card showing:
- Hospital name, city, and affiliation
- Urgency badge
- Current operating margin (in large text, red or green)
- Four financial metrics in a 2×2 grid:
  - Current annual loss per year ($M)
  - Projected 2028 loss without reform ($M)
  - Savings potential from selected recommendations ($M)
  - Improved projected 2028 loss with reform ($M)
- A progress bar showing savings as a percentage of the 2028 projected loss
- Cards for urgent hospitals are rendered with a red background, major hospitals in orange

**How savings are attributed per hospital:**
Recommendations that list specific `sourceHospitals` contribute their full savings potential to
those hospitals. System-wide recommendations (those with no specific hospital targets, like VITL
or the Shared Services Consortium) contribute a small pro-rated share (5% of their savings) to
each hospital's individual calculation.

### 5.6 Savings Waterfall View

A ranked horizontal bar chart showing the annual savings potential of each major recommendation
category, sorted from highest to lowest:

1. Reference-Based Pricing: $62M/yr
2. UVMMC Admin Reform: $52M/yr
3. Shared Services & GPO: $26M/yr
4. VITL / Interoperability: $18M/yr
5. Mental Health COE Network: $10.8M/yr
6. Hospital Restructuring (4 sites): $14M/yr
7. Telehealth Expansion: $8.4M/yr
8. EMS Regionalization: $6.9M/yr

A totals card at the bottom sums the full savings potential with a note that savings are
independent estimates and may not all be simultaneously achievable (because some are partly
interdependent).

**Important caveat for analysts:** The Reference-Based Pricing and UVMMC Admin Reform figures
represent the savings to the total Vermont healthcare system (employers, patients, government
payers), not only to hospital operating budgets. The $62M in reference-based pricing savings
is primarily a reduction in commercial insurance premium costs. For UVMMC specifically, this
represents a revenue reduction that must be offset by cost reductions. This distinction is
important when presenting financial analyses to hospital administrators vs. employers vs. policymakers.

---

## 6. Module 4 — Equity & Access Analysis

### 6.1 Purpose

This module examines the equity consequences of healthcare transformation, with a focus on
geographic access, vulnerable population groups, and the transportation system that determines
whether rural Vermonters can actually reach care.

### 6.2 Key Equity Metrics Card

Four headline metrics appear at the top:
- Total population in "at-risk" hospital Health Service Areas (HSAs): approximately 97,000 people
  served by the 8 hospitals in the "urgent" and "major" categories
- Average percentage of households without a vehicle in those HSAs: 21%
- Average percentage of population aged 65+ in those HSAs: 30%
- Maximum travel time to next hospital after restructuring: 52 minutes (Grace Cottage → BMH)

### 6.3 View Toggle

**🗺 County Access Map** — Equity scores for all 14 Vermont counties
**👥 Vulnerable Populations** — Population group analysis and recommendation equity rankings
**🚐 Transportation Analysis** — Scenario modeling of transportation investment levels

### 6.4 County Access Map View

All 14 Vermont counties are listed, sorted from lowest to highest access equity score. Each
county card shows:

**Access Equity Score (0–100):**
A composite score calculated from four weighted factors:
- Percentage of households without a vehicle (weight 1.5×)
- Percentage below poverty line (weight 0.8×)
- Travel time to primary hospital in minutes (weight 0.4×, adjusted by transportation scenario)
- A restructuring penalty if the county's primary hospital is undergoing restructuring under
  the current scenario (travel time multiplied by 1.6× to reflect care redirection)

Higher scores indicate better access equity. Counties scoring below 50 are highlighted in red;
50–70 in amber; above 70 in green.

**Per-county data displayed:**
- Population (total)
- Percentage aged 65 and over
- Percentage of households without a vehicle
- Percentage below the federal poverty line
- Average travel time to primary hospital (minutes)

**Reform impact flag:**
Counties whose primary hospital is being restructured under the current scenario are flagged with
a "Reform Impact" badge, so analysts can quickly see which communities are most directly affected.

### 6.5 Vulnerable Populations View

**Left panel — Vulnerable Population Groups:**
Eight at-risk population groups are listed with estimated Vermont counts and risk classifications:

| Group | Estimated Count | Risk Level |
|---|---|---|
| Uninsured / Underinsured | 28,000 | Medium |
| Age 65+ without vehicle | 18,400 | High |
| Below poverty line | 52,000 | High |
| Non-English speaking | 22,000 | Medium |
| Non-institutionalized disability | 68,000 | High |
| Dialysis patients (3×/wk need) | 1,200 | Critical |
| Serious mental illness | 14,000 | High |
| Migrant agricultural workers | 8,000 | Medium |

The dialysis population is flagged "Critical" because their three-times-weekly transport
need is existential — missing dialysis is a medical emergency. Any scenario that relocates
dialysis services without ensuring reliable transport is an immediate patient safety issue.

**Right panel — Equity Impact by Recommendation:**
All recommendations are sorted by their equity pillar score and the top eight are shown. This
ranking tells you which reform actions have the largest positive impact on equitable access.
The medical transportation recommendation consistently scores highest (98/100), confirming the
Wyman Report's finding that transportation is the single largest determinant of rural health access.

### 6.6 Transportation Analysis View

This is perhaps the most policy-relevant sub-view in the entire simulator because it makes the
transportation dependency explicit and quantifiable.

**Transportation Scenario Selector:**
Three scenarios are available:

**🔴 Baseline (No New Investment):**
Assumes current transportation infrastructure with no changes. Access coverage is simply the
inverse of the no-vehicle rate. For the most isolated hospitals, this means 78–80% coverage at
best — meaning 20–22% of the HSA population has no reliable transport to care.

**🟡 Enhanced Transport:**
Represents a moderate investment of approximately $8M/year, roughly equivalent to enhancing
the existing Medicaid NEMT (Non-Emergency Medical Transport) program and adding regional ride
programs. Coverage improves to approximately 88–90% of the HSA population.

**🟢 Full Transportation System:**
Represents the recommended investment of approximately $24M/year (with approximately $12M/year
in federal Medicaid matching funds). Coverage approaches 96–98% of the HSA population, and missed
appointment rates due to transportation barriers drop from 25% to approximately 5%.

**Coverage Bars by Hospital HSA:**
For each of the eight at-risk hospitals, a horizontal bar shows the population coverage
percentage under the selected transportation scenario, color-coded red/amber/green. The
annotation below each bar shows the number of people who lack transport access under that scenario.

**Research Evidence Panel:**
A blue information card cites four key research findings:
- 25–42% higher chronic disease complications among patients with transport barriers (RWJF 2019)
- 3.6 million Americans miss or delay care due to transportation barriers annually
- 28% reduction in avoidable hospitalizations when NEMT programs are well-funded
- $6,800 annual healthcare cost savings per patient when medical transport needs are met

---

## 7. Module 5 — Technology Roadmap

### 7.1 Purpose

This module documents and visualizes the technology infrastructure required to support the
Wyman Report recommendations. No other module in the simulator will deliver its projected
outcomes without the technology investments modeled here — particularly VITL modernization
and EMS broadband.

### 7.2 Summary Metrics

Four headline metrics:
- **Total IT investment:** ~$46M across all technology initiatives
- **VITL target date:** FY2026 (legislative mandate in the Wyman Report)
- **Telehealth kiosks:** 25 community sites planned
- **EMS vehicles equipped:** 120 vehicles with Starlink broadband

### 7.3 Sub-Views

**📅 Implementation Timeline View**

A Gantt-style chart with 16 technology initiatives plotted against a 5-year timeline. Each bar
shows:
- Initiative name (displayed on the left, truncated at 44 characters)
- Timeline bar colored by category (blue = VITL, orange = EMS, rose = hospital IT, sky = telehealth,
  violet = PMO analytics, emerald = home care, slate = shared services)
- Relative duration and phasing from Year 0 (2025) through Year 5 (2030)

This view makes the critical path immediately visible: EMS broadband must be deployed before
hospital restructuring begins (because EMS is the safety net for transferred acute patients).
VITL governance restructuring must begin before VITL technical deployment. The PMO analytics
platform must be built before meaningful hospital monitoring can occur.

**🔧 Technology Detail View**

Six technology domain cards, each showing:
- Domain name, icon, total investment, and timeline
- Bulleted list of specific technology components

The six domains are:
1. **VITL Modernization** ($12.8M, FY2026) — unified data space, SSO, self-help analytics,
   pharmacy data, master patient index, real-time ADT feeds, API architecture
2. **Telehealth Infrastructure** ($12.7M, Year 1–3) — 25 kiosks, Hospital-at-Home, remote
   monitoring 2,000 patients, tele-pharmacy, specialist tele-rounding, ED-at-Home pilot, broadband
3. **EMS Technology** ($4.2M, Year 1–2) — Starlink broadband 120 vehicles, 12-lead ECG
   transmission, field video consult, GPS dispatch, electronic patient care records
4. **Hospital IT (At-Risk Sites)** ($8.4M, Year 1–2) — Epic EHR alignment at 4 hospitals,
   remote monitoring, telemedicine ED backup, pharmacy dispensers, telepsychiatry, remote ICU
5. **PMO Analytics Platform** ($2.8M, Year 1) — performance monitoring, financial integration,
   equity tracking, automated reporting, provider performance measurement
6. **Shared Services IT** ($5.1M, Year 1–2) — procurement platform, centralized radiology
   teleread, IT security operations center, HR/payroll, nurse pool scheduling

**🔗 VITL Deep Dive View**

A detailed comparison of the current VITL limitations versus the VITL 2.0 target state:

*Current limitations:*
- Voluntary participation — many providers excluded
- No pharmacy claims data
- Not user-friendly
- Limited real-time clinical information
- No self-service analytics
- OneCare unable to provide needed care guidance

*VITL 2.0 target (FY2026):*
- Mandatory participation (requires legislation)
- Full pharmacy claims integration
- Provider single sign-on
- Real-time ADT from all 14 hospitals
- Self-help population health analytics
- API ecosystem for third-party applications
- 99.8% patient matching accuracy

A milestone timeline lists the eight key VITL implementation milestones from Q1 2025 through
FY2027. A second panel documents the clinical benefits of VITL 2.0: $14M/yr in duplicate test
elimination, $8M/yr in reduced readmissions, 40% reduction in care fragmentation incidents.

---

## 8. Module 6 — Workforce Planning

### 8.1 Purpose

No recommendation in the Wyman Report can be implemented without a workforce that can execute it.
This module models the FTE changes, new role requirements, workforce policy changes, and talent
pipeline strategies needed to make the transformation succeed.

### 8.2 Sub-Views

**👩‍⚕️ Workforce Needs View**

Four headline metrics from the Wyman Report:
- 1,393 physician FTEs in Vermont (2022 baseline)
- 203 of UVMMC's 654 physician FTEs are in non-patient care roles
- >75% of UVMMC clinical FTEs perform below the 50th Sullivan Cotter productivity percentile
- 43 PCPs needed in the White River Junction HSA alone by 2040

A detailed table shows FTE changes by recommendation category:

| Category | FTEs Reduced/Redirected | New FTEs Added | Net Change |
|---|---|---|---|
| Hospital Restructuring (4 sites) | -180 | +120 | -60 |
| COE Surgical Network | -80 | +140 | +60 |
| Mental Health COE Network | 0 | +85 | +85 |
| EMS Regionalization | +20 | +180 | +160 |
| Telehealth Expansion | -40 | +65 | +25 |
| Home Care Infrastructure | 0 | +240 | +240 |
| UVMMC Productivity Reform | -203 | +150 | -53 |
| Community Health Workers | 0 | +120 | +120 |

**📚 Training & Roles View**

Two panels:

*New/Expanded Professional Roles:*
Eight new or expanded roles that Vermont needs to develop:
- Community Paramedic (80+ statewide) — advanced home-based care
- Community Health Worker (120 statewide) — SDOH navigation
- Nurse Case Manager/Navigator (65 statewide) — complex patient management
- Pharmacist/PharmD expanded role (45 in clinics) — vaccinations, chronic disease protocols
- Telehealth Coordinator (30 statewide) — kiosk operations, patient onboarding
- Hospital-at-Home Clinician (120 statewide) — daily home visits
- Advanced Practice Provider for rural ED (40 at rural sites) — non-physician ED staffing
- Tele-Psychiatrist contracted (18 statewide) — 24/7 telepsychiatry coverage

*Workforce Policy Changes:*
Eight workforce policy actions from the Wyman Report, with implementation status:
- Expand top-of-license practice for nurses — requires legislation
- Allow immigrant professionals to practice in Vermont — regulatory streamlining
- Act 117 mental health licensure reform — study due December 2024
- Joined Social Work Licensure Compact — completed
- Joined PSYPACT for psychologist reciprocity — completed
- Short-term Rx extension by pharmacist — law since 2020
- EMS professional paramedicine Medicare waiver — application needed
- Rural health track at UVM medical school — needs development

**🌱 Pipeline Strategy View**

An important VITL finding from the Wyman Report: Vermont does not actually have a physician
shortage if PCPs see 3 patients per hour. HRSA recognizes zero Health Profession Shortage Areas
in Vermont. The issue is not quantity — it is distribution, productivity, and rural recruitment.

Five pipeline strategies:
1. UVM Rural Health Track — dedicated rural medicine curriculum; preference for Vermont native
   applicants; target 20% of graduates to practice in Vermont rural settings
2. Rural Residency Rotation Expansion — 80% of residencies to include ≥6 months rural rotation
3. Immigrant Professional Pathway — streamline licensure for immigrants with medical training
4. Loan Forgiveness for Rural Practice — $50K–$120K forgiveness for 3+ year rural commitment;
   $4M/yr state investment; 30–40 additional rural providers per year
5. Healthcare Worker Housing — 200 workforce housing units in 6 rural towns (AHS/ACCD partnership)

---

## 9. Module 7 — State Benchmarks

### 9.1 Purpose

Vermont is not inventing healthcare transformation from scratch. This module documents five
comparable state-level reform models with quantified outcomes and documented lessons — providing
an evidence base for Vermont's decisions and realistic expectations for what transformation can
and cannot achieve.

### 9.2 The Five State Models

**Maryland — HSCRC All-Payer Hospital Global Budget (Since 2014)**
The Maryland model is the most relevant comparator for Vermont because Maryland and Vermont are
both Cohort 1 states in the AHEAD Model. Maryland's Hospital Services Cost Review Commission
has operated a global budget model for hospitals since the 1970s, with the modern all-payer model
implemented in 2014.

Key outcomes: -12% hospital consolidation, -3.2% total cost reduction, -18% admin cost reduction,
+14% quality improvement, +22% equity improvement, rural access score 72/100.

Key lessons for Vermont:
- Global budgets eliminate the volume incentive and reduce unnecessary admissions
- Hospital-specific rate regulation requires sophisticated regulatory capacity
- Rural hospitals required supplemental payments to remain viable
- Transition to value required 5+ years to show full financial benefit

**Oregon — Coordinated Care Organization (CCO) Model (Since 2012)**
Oregon's CCO model achieved the largest cost reduction of any comparison state: 9.1% overall
cost reduction with $2.8B in Medicaid savings in three years. Most relevant for Vermont's equity
agenda.

Key outcomes: -6% hospital consolidation, -9.1% cost reduction, +22% quality improvement,
+31% equity improvement, rural access score 74/100.

Key lessons: Community health worker investment was the highest ROI equity intervention;
social determinants integration (housing, food) reduced ED visits 18%; tribal health partnership
was model for culturally competent care.

**Pennsylvania — Rural Health Redesign (PARHP) (Since 2019)**
The most directly comparable rural restructuring model. Pennsylvania implemented EMS
regionalization, community paramedicine, telehealth kiosks, and COE designation for surgery.

Key outcomes: -18% hospital consolidation (highest reduction), -4.8% cost reduction,
-22% admin cost reduction, +11% quality improvement.

Key lessons: EMS regionalization was critical prerequisite for rural hospital conversion;
community paramedicine reduced 30-day readmissions by 28%; COE designation improved surgical
outcomes with 19% complication reduction.

**Minnesota — Critical Access Hospital Network Transformation (Since 2016)**
Minnesota's shared services approach for Critical Access Hospitals is the closest model for
Vermont's Shared Services Consortium recommendation.

Key outcomes: -8% hospital consolidation, -2.1% cost reduction, -28% admin cost reduction
(highest reduction), +9% quality improvement, rural access score 78/100 (highest).

Key lessons: Shared services consortium achieved 28% admin cost reduction; regional specialty
centers for orthopedics reduced travel burden by 35%; housing for healthcare workers in rural
areas was necessary.

**Montana — Frontier Health Network Hub-and-Spoke (Since 2018)**
The most geographically extreme comparator — Montana's frontier health context has many parallels
with Vermont's most isolated communities (Newport, Essex County, Townshend).

Key outcomes: -22% hospital consolidation (highest), -3.8% cost reduction, +8% quality improvement,
rural access score 62/100 (lowest — reflecting the challenge), equity improvement 12%.

Key lessons: Hub-and-spoke only works with strong EMS and air transport; telehealth was
insufficient without broadband; financial sustainability required ongoing state subsidy for most
isolated facilities.

### 9.3 Expanded State Detail

Clicking any state card reveals an expanded panel with:
- Six quantified outcome metrics
- Four key lessons for Vermont with specific, actionable implications
- Source citation for all data

### 9.4 Academic Research Panel

Below the state cards, a grid of eight academic research citations provides the peer-reviewed
evidence base for the simulator's key assumptions:

| Citation | Key Finding | Vermont Relevance |
|---|---|---|
| Birkmeyer et al., NEJM 2002 | 20% lower mortality at high-volume surgical centers | Supports COE surgical regionalization |
| Levine et al., NEJM 2020 | Hospital-at-Home: equivalent or superior outcomes vs. inpatient | Supports H@H expansion |
| Haber et al., NEJM 2019 | Maryland global budget: -3.2% hospital spending without quality decline | Validates global budget model |
| Desai et al., Circulation 2017 | Remote CHF monitoring: 28% fewer 30-day readmissions | Supports telehealth investment |
| RWJF, 2019 | Transport barriers: 25–42% higher chronic disease complications | Supports medical transport investment |
| Dartmouth Atlas, 2020 | Vermont ranks 9th worst nationally for rural specialty access | Establishes urgency for COE and telehealth |
| MedPAC, 2024 | Medicare/cost ratio below 97% = poor cost efficiency; UVMMC at 72% | Validates UVMMC cost reduction target |
| Sullivan Cotter, 2023 | >75% of UVMMC clinical FTEs below 50th percentile | Supports UVMMC productivity reform |

---

## 10. Module 8 — Implementation Roadmap

### 10.1 Purpose

This module translates the selected scenario into a phased, chronological action plan. It shows
what must happen when, which actions have critical dependencies on others, and what "no regrets"
moves can begin immediately regardless of which longer-term scenario is chosen.

### 10.2 Headline Metrics

Four headline metrics use your selected scenario (or all recommendations if none are selected):
- Active recommendations in the roadmap
- Implementation horizon: 4 phases over 2025–2029
- Total investment: $133M across all pillars and all recommendations (full implementation)
- Annual savings target: $199M/year at full implementation

### 10.3 The Four Phases

**Phase 1: Foundation (2025, Year 1)**
The nine most urgent foundational actions:
- Establish AHS/GMCB PMO
- Pass EMS regionalization legislation (2025 legislative session)
- Apply for CMS REH designations (Springfield, Grace Cottage)
- Deploy Starlink broadband to all 120 EMS vehicles
- Launch VITL governance restructuring
- Engage communities in Springfield, Gifford, North Country, Grace Cottage
- Deploy PMO analytics platform
- Establish Vermont Hospital Collaborative Corporation (consortium legal entity)
- Issue RFP for shared services

**Phase 2: Restructuring (2026, Year 2)**
The nine core restructuring actions:
- Complete Springfield REH conversion
- Complete Grace Cottage REH + FQHC co-location
- Begin Gifford inpatient-to-mental-health conversion
- VITL mandatory participation law effective (FY2026 target)
- Launch 25 telehealth kiosks in community sites
- Shared services consortium operational
- Begin North Country CACC planning and engagement
- Deploy hospital-level telehealth ED backup platforms
- Launch EMS advanced paramedicine program

**Phase 3: Regionalization (2027, Year 3)**
- Complete North Country CACC conversion
- Designate and operationalize Surgical COE network
- Mental Health COE network fully operational (6 sites)
- VITL pharmacy data integration complete
- Hospital-at-Home program launch (UVMMC + partners)
- Begin reference-based pricing pilot
- UVMMC external consultancy engagement complete
- Rural health workforce pipeline launched
- Statewide nurse pool fully operational

**Phase 4: Transformation (2028–2029)**
- Reference-based pricing fully implemented
- UVMMC administrative cost reduction targets achieved
- VITL 2.0 full deployment with API ecosystem
- ED-at-Home pilot evaluation and expansion
- AHEAD Model mid-term assessment
- Elder care COE network established
- Statewide medical transportation network complete
- Equity scorecard published vs. baseline
- Financial sustainability review of all 14 hospitals

### 10.4 Critical Dependencies Panel

An amber warning panel lists the six critical sequencing dependencies that represent the most
common implementation failure modes:

1. **EMS Regionalization must precede Hospital Restructuring** — Safety prerequisite. Hospitals
   cannot safely reduce inpatient capacity without first ensuring that regional EMS has Advanced
   Life Support capability and sufficient capacity to handle increased transfer volumes.

2. **Transportation Investment must precede Hospital Restructuring** — Equity prerequisite. The
   equity risk scores in the Hospital Simulator make this quantitatively explicit: without
   concurrent transportation investment, restructuring creates dangerous access gaps for the
   20–22% of rural HSA residents without vehicles.

3. **VITL Modernization must precede Hospital-at-Home** — Real-time clinical data is required
   for safe home-based care management. Without VITL 2.0's real-time ADT feeds and medication
   reconciliation, Hospital-at-Home programs cannot meet Medicare's safety requirements.

4. **AHS/GMCB PMO must precede All Other Recommendations** — The PMO provides coordination,
   analytic capacity, and governance clarity that every other recommendation depends on.
   Without the PMO, there is no project management for the other recommendations.

5. **Community Engagement must precede Hospital Restructuring** — Legislative and political
   requirement. Act 167 explicitly mandates community engagement processes. The Wyman Report's
   data controversy with Gifford Medical Center illustrates what happens when communities feel
   excluded from the process.

6. **Reference-Based Pricing must coincide with UVMMC Cost Reform** — Revenue pressure drives
   change. UVMMC will only reduce costs under pricing pressure. Implementing reference-based
   pricing without giving UVMMC time to reduce costs creates a financial cliff.

### 10.5 No Regrets Moves Panel

A green panel lists nine actions that the Wyman Report identifies as worth doing immediately,
regardless of which longer-term scenario is ultimately chosen. These are actions with low risk,
positive expected value under any scenario, and no downside if the larger reform agenda is
delayed or modified:

**Expand Access:**
- Rural outreach programs for primary care and preventive services
- Expand telehealth for ER, urgent care, and specialists
- Establish programs for high-needs groups (Hospital-at-Home, PACE)

**Manage Costs:**
- Form purchasing consortiums — immediate ROI with no downside
- Develop regional physician group capability
- Develop statewide nurse pool to reduce agency staff costs

**Prepare for Redesign:**
- Develop remote monitoring capability
- Develop regionalized EMS transport services
- Engage with community stakeholders on service redesign

---

## 11. Interpreting Results: The Five-Pillar Framework

### 11.1 Why Five Pillars?

Single-metric health system analysis is systematically misleading. A recommendation that saves
money may harm access. A recommendation that improves clinical quality may require years of
regulatory groundwork that no analysis has costed. A recommendation that is technically brilliant
may be politically infeasible. The five-pillar framework forces all five dimensions into view
simultaneously.

### 11.2 Pillar Descriptions

**Pillar 1: Policy & Governance (Violet)**
Score range: 0–100
This pillar measures how clearly the policy pathway is defined, how achievable the regulatory
requirements are, how many legislative actions are required, and how complex the governance
landscape is.

A score of 90 means the policy path is clear, the statutory authority largely exists, and the
required actions are straightforward. A score of 40 means the recommendation requires new
legislation that has uncertain political support, multiple regulatory approvals from different
agencies, and governance complexity that has historically stalled similar efforts.

**Pillar 2: Technology & Infrastructure (Blue)**
Score range: 0–100
This pillar measures how well-defined the technology requirements are, how proven the technology
is, what the implementation complexity is, and whether the enabling infrastructure (broadband,
EHR, data standards) is in place.

A score of 95 means the technology is mature and commercially available, the implementation
path is clear, and the infrastructure is either already in place or straightforward to deploy.
A score of 55 means the technology exists but deployment requires complex integration, uncertain
vendor availability, or infrastructure gaps (particularly broadband) that must be addressed first.

**Pillar 3: Financial Impact (Emerald)**
Score range: 0–100
This pillar measures the overall financial attractiveness of the recommendation: the ratio of
savings to investment, the time to break-even, the certainty of the savings estimate, and the
distribution of financial impact across stakeholders.

A score of 88 means the financial case is compelling, the savings are well-evidenced, the
investment is recoverable within 2–3 years, and the financial benefit is broadly distributed.
A score of 55 means the investment is substantial, the savings are partially uncertain or
dependent on behavioral change, or the benefits accrue to payers while costs fall on hospitals.

**Pillar 4: Equity & Access (Amber)**
Score range: 0–100
Direction is critical for this pillar. A direction of "positive" means the recommendation
improves equity — it improves access for vulnerable populations, reduces disparities, or
strengthens care in underserved areas. A direction of "mixed" means it improves some dimensions
of equity while creating new risks in others (for example, closing an inpatient unit while
expanding psychiatric care). A direction of "negative" (rare) means the recommendation has a
net adverse effect on equity without sufficient mitigation.

Score interpretation: A score of 92 with "positive" direction means the recommendation is
among the strongest possible equity interventions. A score of 38 with "negative" direction
(North Country CACC under baseline transportation scenario) means the recommendation as
designed creates serious, measurable access harm to an already vulnerable population.

**Pillar 5: Clinical Quality (Rose)**
Score range: 0–100
This pillar measures the expected impact on patient outcomes, the clinical evidence base for the
recommendation, the volume-quality relationship implications, the safety profile of any patient
transfers required, and the risk of clinical harm during transition.

A score of 85 means strong evidence supports the clinical benefit, volume thresholds ensure
quality is maintained or improved, and patient safety risks during transition are low and
manageable. A score of 45 means the clinical impact is genuinely mixed — perhaps some patients
get better care at regional COE sites while others face increased transfer risks — and the
net clinical effect depends heavily on implementation quality.

### 11.3 Score Thresholds

| Score Range | Interpretation |
|---|---|
| 85–100 | Strong positive impact; well-evidenced; proceed with confidence |
| 70–84 | Good positive impact; some complexity or risk; proceed with standard care |
| 55–69 | Moderate positive impact; meaningful tradeoffs; requires active mitigation |
| 40–54 | Mixed impact; significant tradeoffs; mitigation is prerequisite to implementation |
| 25–39 | Significant concerns; adverse effects possible; major design revisions needed |
| 0–24 | High risk of harm; should not proceed without fundamental redesign |

### 11.4 Using Pillar Scores in Decision Making

No pillar operates in isolation. Recommendations with high Financial scores but low Equity scores
are precisely the recommendations that create political controversy and community backlash — as
the Gifford Medical Center data dispute illustrated. Recommendations with high Clinical scores but
low Policy scores may be clinically desirable but practically unreachable in the near term.

The simulator is designed to make these tensions explicit, not to resolve them. The resolution
requires human judgment informed by community values, political context, and stakeholder
negotiation that no analytical tool can substitute for.

---

## 12. Common Use-Case Workflows

### 12.1 For a GMCB Member Preparing for a Hearing on Hospital Restructuring

1. Open the Scenario Builder. Select all four at-risk hospital restructuring recommendations.
2. Note the Equity pillar aggregate score. It will be in the "mixed" range (50–60).
3. Also select the Transportation recommendation. Watch the Equity score improve.
4. Select the EMS Regionalization recommendation. Watch the Clinical score improve.
5. Navigate to the Hospital Simulator. Select Springfield. Use the REH option with 80%
   transportation investment and 70% telehealth. Note the equity risk score.
6. Reduce transportation investment to 20%. Note how the equity risk score rises above
   the warning threshold. This is your quantitative illustration of why transport investment
   must accompany restructuring.
7. Navigate to the Implementation Roadmap. Review Phase 1 and the critical dependencies panel.
8. Print or export the Implementation Roadmap view for your hearing materials.

### 12.2 For a Hospital CEO Preparing a Board Strategy Presentation

1. Open the Hospital Restructuring Simulator. Select your hospital.
2. Try all four restructuring options. Note the financial improvement percentage for each.
3. For the best financial option, adjust the implementation speed slider to see how aggressive
   vs. conservative timelines affect your transition period.
4. Navigate to the Financial Modeling — Hospital-by-Hospital view. Find your hospital. Note
   the gap between current annual loss, projected 2028 loss under baseline, and improved 2028
   loss under the recommended restructuring option.
5. Navigate to State Benchmarks. Read the Pennsylvania PARHP model for rural hospital
   restructuring lessons.
6. Return to Scenario Builder. Note which recommendations specifically name your hospital
   (check "Applicable Wyman Report Recommendations" at the bottom of the Hospital Simulator).
7. These are your board discussion items.

### 12.3 For a Health Equity Researcher

1. Open the Equity & Access module. Review the County Access Map view.
2. Sort by lowest access equity score. These are your priority communities.
3. Switch to the Vulnerable Populations view. Note the eight high-risk population groups.
4. Switch to the Transportation Analysis view. Toggle between Baseline and Full Transportation
   scenarios for the most isolated hospital (North Country, 62 minutes to NVRH). Document the
   difference in coverage rates.
5. Return to the Scenario Builder. Select ONLY the at-risk hospital restructuring recommendations
   WITHOUT the Transportation recommendation. Note the aggregate Equity pillar score.
6. Add the Transportation recommendation. Note the score change.
7. This delta is your quantitative argument for transportation investment as a health equity
   intervention, not merely a logistics matter.

### 12.4 For a Technology Planner Working on VITL

1. Open the Technology Roadmap module. Start with the Implementation Timeline view.
2. Identify all VITL-related bars (dark blue colors). Note the FY2026 deadline.
3. Switch to the VITL Deep Dive view. Review the Current vs. VITL 2.0 comparison.
4. Review the milestone timeline. Note which milestones are already completed (master patient
   index v1) and which are not started.
5. Review the clinical benefits panel: $14M/yr in duplicate test elimination, $8M/yr in reduced
   readmissions.
6. Navigate to the Implementation Roadmap. Phase 1 includes VITL governance restructuring as
   a Year 1 action. Phase 2 includes mandatory participation law effective. Phase 3 includes
   pharmacy data integration.
7. Use this as your briefing document for the VITL modernization business case.

---

# PART II — TECHNICAL GUIDE

---

## 13. System Architecture Overview

### 13.1 Technology Stack

The simulator is built as a standard Next.js application component within the Vermont Health
Platform frontend monorepo. No additional infrastructure, APIs, or databases are required for
the current version. All computation is client-side.

| Layer | Technology | Notes |
|---|---|---|
| Framework | Next.js 16.1.6 | App Router architecture |
| Language | TypeScript 5.x | Strict mode enabled |
| Rendering | React 19 | Client-side components ("use client") |
| Styling | Tailwind CSS | Utility-first; no additional CSS files |
| State | React useState / useMemo | No external state management library |
| Charts | Inline SVG | Custom-built; no charting library dependency |
| Data | Static TypeScript modules | No database, no API calls |
| Routing | Next.js App Router | File-system-based |

### 13.2 Rendering Strategy

The simulator uses the `"use client"` directive at the top of `page.tsx`, making it a fully
client-side React component. This is necessary because:
- All interactive state (selected recommendations, active tab, slider values) lives in the
  component and its children
- React hooks (`useState`, `useMemo`, `useCallback`) are used throughout
- No server-side data fetching is needed — all data is imported from the static `data.ts` module

The `data.ts` file itself has no `"use client"` directive because it exports only data and types,
not React components. It can be imported in both server and client components.

### 13.3 Application Entry Points

```
/frontend/app/vermont-act-167/               ← Act 167 overview page (server component)
    page.tsx                                  ← Existing overview content (unchanged)

/frontend/app/vermont-act-167/simulator/     ← Simulator directory
    page.tsx                                  ← Main simulator (client component, ~1,835 lines)
    data.ts                                   ← All data and type definitions (~1,756 lines)
```

### 13.4 No External Dependencies Added

The simulator was deliberately built without any new npm dependencies. It uses only packages
already present in the Vermont Health Platform frontend:
- `next` and `react` — base framework
- TypeScript types already in `package.json`
- Tailwind CSS — already configured
- No charting library (Recharts, Chart.js, D3) was added — all charts are custom inline SVG

This means the simulator adds zero build time, zero bundle size risk from new packages, and zero
dependency management overhead.

---

## 14. File Structure and Codebase

### 14.1 simulator/page.tsx — Structure

The main page file (~1,835 lines) is organized into clearly commented sections:

```typescript
"use client";

// ── Imports ─────────────────────────────────────────────────────────────────
// (React hooks, Next.js Link, all exports from data.ts)

// ── UI PRIMITIVES ────────────────────────────────────────────────────────────
// Badge           — small colored label chip
// SectionTitle    — icon + heading + optional subtitle
// InfoCard        — bordered card with variant theming (default/warn/info/success)
// PillarGauge     — circular SVG gauge for pillar scores
// HBar            — horizontal progress bar
// MetricCard      — single large metric with label
// UrgencyBadge    — hospital urgency indicator
// TabBtn          — tab navigation button
// TimelineRow     — Gantt chart row

// ── TAB COMPONENTS (one per module) ─────────────────────────────────────────
// ScenarioBuilder        — Tab 1: recommendation checklist + aggregate gauges
// HospitalDeepDive       — Tab 2: hospital selector + restructuring simulator
// FinancialModeling      — Tab 3: system/hospital/waterfall financial views
// EquityAnalysis         — Tab 4: county map / population / transport analysis
// TechnologyRoadmap      — Tab 5: timeline / detail / VITL deep-dive
// WorkforcePlanning      — Tab 6: needs / training / pipeline
// StateBenchmarks        — Tab 7: state comparison cards + academic citations
// ImplementationRoadmap  — Tab 8: 4-phase plan + dependencies + no-regrets

// ── MAIN COMPONENT ───────────────────────────────────────────────────────────
// Act167SimulatorPage    — default export; contains all state, tab navigation,
//                          header, and renders the active tab component
```

### 14.2 simulator/data.ts — Structure

The data file (~1,756 lines) is organized as:

```typescript
// ── Type Definitions ─────────────────────────────────────────────────────────
// HospitalUrgency     — "urgent" | "major" | "significant" | "modest"
// PillarKey           — "policy" | "technology" | "financial" | "equity" | "clinical"
// Hospital            — full interface (22 fields)
// RecommendationCategory  — 9 categories
// PillarImpact        — per-pillar impact object (8 fields)
// Recommendation      — full interface (8 fields + pillars record)
// StateBenchmark      — state comparison record (11 fields)
// CountyData          — Vermont county record (9 fields)

// ── Data Constants ────────────────────────────────────────────────────────────
// HOSPITALS           — array of 14 Hospital objects
// RECOMMENDATIONS     — array of 14 Recommendation objects
// STATE_BENCHMARKS    — array of 5 StateBenchmark objects
// COUNTY_DATA         — array of 14 CountyData objects
// PILLARS             — array of 5 pillar metadata objects
// CATEGORY_LABELS     — Record mapping category keys to display names
// CATEGORY_COLORS     — Record mapping category keys to Tailwind class strings
```

---

## 15. Data Architecture: Types, Interfaces, and Schema

### 15.1 The Hospital Interface

Every hospital in the system is represented by an object conforming to this interface:

```typescript
interface Hospital {
  id: string;                              // URL-safe identifier, e.g., "uvmmc"
  name: string;                            // Full official name
  shortName: string;                       // 3–6 character abbreviation
  city: string;                            // City or town
  hsa: string;                             // Health Service Area name
  urgency: HospitalUrgency;               // "urgent" | "major" | "significant" | "modest"
  lat: number;                             // Latitude (decimal degrees)
  lng: number;                             // Longitude (decimal degrees)
  beds: number;                            // Licensed inpatient beds
  icuBeds: number;                         // ICU/critical care beds
  annualAdmissions: number;               // Annual acute inpatient admissions
  annualEDVisits: number;                 // Annual emergency department visits
  operatingMarginPct: number;             // Operating margin % (negative = loss)
  annualLossM: number;                    // Annual operating loss in $M (0 if profitable)
  projectedLoss2028M: number;             // Projected 2028 loss at 5-8% expense growth
  services: string[];                      // Active service line names
  coes: string[];                          // Assigned Centers of Excellence
  affiliation: string;                     // Health system affiliation
  populationHSA: number;                  // Population of the Health Service Area
  popOver65Pct: number;                   // Percentage of HSA population aged 65+
  noCarPct: number;                       // Percentage of households without a vehicle
  lowIncomePct: number;                   // Percentage of HSA population below poverty
  avgTravelToNextHospitalMin: number;     // Minutes to nearest alternative hospital
  fteCount: number;                       // Total FTE employees
}
```

**Fields currently using synthetic data** (flagged for real data ingestion):
- `operatingMarginPct` — should be replaced with GMCB FY2023/FY2024 audited operating margin
- `annualLossM` — derived from operating margin; update with GMCB budget filing data
- `projectedLoss2028M` — synthetic projection; replace with GMCB-validated 5-year forecast
- `noCarPct` — use Census ACS 5-year estimate, Table B08201 (household vehicle availability)
- `avgTravelToNextHospitalMin` — use actual Google Maps / HERE routing API calculation
- `fteCount` — use GMCB hospital staffing reports

### 15.2 The Recommendation Interface

```typescript
interface Recommendation {
  id: string;                              // Unique identifier, e.g., "atrisk-01"
  category: RecommendationCategory;        // One of 9 categories
  title: string;                           // Full recommendation title
  shortTitle: string;                      // ≤30 character display title
  description: string;                     // 1–2 sentence description
  sourceHospitals: string[];              // Hospital IDs directly affected (empty = system-wide)
  priority: "critical" | "high" | "medium"; // Implementation priority
  implementationYears: [number, number];  // [start year offset, end year offset] from 2025
  pillars: Record<PillarKey, PillarImpact>; // Five-pillar analysis
  syntheticNote?: string;                 // Optional note on synthetic data usage
}
```

### 15.3 The PillarImpact Interface

This is the core analytical unit of the simulator. Every recommendation has five of these:

```typescript
interface PillarImpact {
  score: number;                           // 0–100 impact magnitude
  direction: "positive" | "mixed" | "negative"; // Net impact direction
  headline: string;                        // One-sentence summary of impact
  actions: string[];                       // Specific required actions (3–8 items)
  timeline: string;                        // Human-readable implementation timeline
  investmentM?: number;                    // One-time or setup investment in $M
  annualSavingsM?: number;               // Annual savings in $M (post-implementation)
  riskLevel: "low" | "medium" | "high";  // Implementation risk level
}
```

### 15.4 The StateBenchmark Interface

```typescript
interface StateBenchmark {
  state: string;                           // State name
  model: string;                           // Program/model name
  year: number;                            // Year model began
  hospitalConsolidation: number;           // % reduction in acute hospital count
  costReduction: number;                   // % reduction in total healthcare costs
  adminCostReduction: number;             // % reduction in administrative costs
  ruralAccessScore: number;               // 0–100 rural access quality score
  qualityImprovement: number;             // % improvement in quality metrics
  equityImprovement: number;              // % improvement in disparity reduction
  keyLessons: string[];                    // 4 key lessons applicable to Vermont
  source: string;                          // Citation for all statistics
}
```

### 15.5 The CountyData Interface

```typescript
interface CountyData {
  county: string;                          // Vermont county name (14 counties)
  population: number;                      // Total county population
  over65Pct: number;                       // % of population aged 65+
  noVehiclePct: number;                   // % of households without a vehicle
  belowPovertyPct: number;               // % of population below poverty line
  minorityPct: number;                    // % of population identifying as non-white
  uninsuredPct: number;                   // % of population without health insurance
  primaryHospital: string;                // Hospital ID of primary county hospital
  travelTimeToHospitalMin: number;       // Average travel time to primary hospital
}
```

---

## 16. The Five-Pillar Scoring System

### 16.1 Score Derivation

Pillar scores (0–100) are manually assigned in `data.ts` based on a structured assessment of
each recommendation against five criteria per pillar. They are not calculated algorithmically —
they are qualitative assessments encoded as numbers. This is both a strength (allows nuanced
expert judgment) and a limitation (not reproducible from a formula alone).

**Scoring criteria by pillar:**

**Policy (0–100):**
- 80–100: Clear statutory authority; well-defined regulatory pathway; achievable in ≤12 months
- 60–79: Some new legislation needed; multi-agency coordination required; 12–24 months
- 40–59: Significant legislative uncertainty; multiple regulatory approvals; 24–36 months
- 0–39: Requires fundamental new statutory authority; high political risk; >36 months

**Technology (0–100):**
- 80–100: Mature commercial technology; clear implementation path; no novel engineering
- 60–79: Some integration complexity; one or two known technical risks; standard stack
- 40–59: Significant integration requirements; depends on infrastructure not yet in place
- 0–39: Requires novel engineering; critical infrastructure gap (broadband); high technical risk

**Financial (0–100):**
- 80–100: ROI <3 years; savings well-evidenced; broad stakeholder benefit; low uncertainty
- 60–79: ROI 3–5 years; savings moderately evidenced; some stakeholder concentration
- 40–59: ROI 5–7 years; savings estimates have significant uncertainty; uneven distribution
- 0–39: ROI >7 years; savings dependent on behavioral change; concentrated costs vs. distributed benefit

**Equity (0–100) — direction matters:**
- "Positive" 80–100: Strong access improvement; targets most vulnerable; eliminates disparities
- "Positive" 60–79: Meaningful access improvement with modest new risks
- "Mixed" 40–59: Improves some access dimensions while creating new vulnerabilities
- "Mixed" 25–39: Adverse access effects likely without major mitigation investment
- "Negative" 0–24: Net harm to access equity under most implementation scenarios

**Clinical (0–100):**
- 80–100: Strong outcome improvement evidence; volume thresholds maintained; low transfer risk
- 60–79: Good evidence; some transfer risk; manageable quality transition
- 40–59: Mixed clinical effect; significant transfer risk; outcome depends on implementation quality
- 0–39: Genuine patient safety concern; inadequate evidence; high transfer volume risk

### 16.2 Score Interpretation in Aggregation

When multiple recommendations are selected, their pillar scores are averaged. This average is
displayed in the Scenario Builder's pillar gauges. Simple averaging is a reasonable aggregate
for exploration but has a known limitation: a high-scoring recommendation and a low-scoring
recommendation may have interacting effects that are not captured by their average.

Analysts should use the aggregate score as a starting point, then examine individual
recommendation scores and their interactions — particularly the critical dependencies — to form
a complete picture.

---

## 17. Simulation Engine: How Calculations Work

### 17.1 Hospital Restructuring Simulation

The `HospitalDeepDive` component contains a `useMemo` hook that calculates simulation outputs
from four inputs: the selected hospital, the selected restructuring option, and the values of
the three sliders (transport investment, telehealth scope, implementation speed).

```typescript
const outcomes = useMemo(() => {
  // transportFactor, teleFactor, speedFactor are 0.0–1.0
  const transportFactor = transportInvestment / 100;
  const teleFactor = telehealthScope / 100;
  const speedFactor = timelineAggressiveness / 100;

  // Equity risk: base from geographic isolation and car-less population
  const baseEquityRisk =
    hospital.noCarPct * 0.8 +
    (hospital.avgTravelToNextHospitalMin / 62) * 40;

  // Mitigation: transport investment reduces risk 65%, telehealth 20%
  const mitigatedEquityRisk =
    baseEquityRisk * (1 - transportFactor * 0.65 - teleFactor * 0.2);

  // Financial improvement is option-specific
  const financialImprovement = { reh: 0.58, cacc: 0.50, "cacc-mh": 0.56, close: 0.75 }[option];
  const newLoss = hospital.annualLossM * (1 - financialImprovement);

  // Transfer risk: higher travel time and lower transport investment = higher risk
  const transferRisk = (hospital.avgTravelToNextHospitalMin / 60) * (1 - transportFactor * 0.7) * 100;

  // Implementation time: 18 months at 0% aggressiveness, ~11 months at 100%
  const implementationMonths = Math.round(18 * (1 - speedFactor * 0.4));

  // Psychiatric beds from conversion
  const psychiatricBeds =
    option === "cacc-mh" ? Math.floor(hospital.beds * 0.72) :
    option === "reh" ? Math.floor(hospital.beds * 0.15) : 0;

  return { newLoss, financialImprovement, transfersPerYear, avgTransferMin,
           transferRisk, mitigatedEquityRisk, implementationMonths, psychiatricBeds };
}, [hospital, restructuringOption, transportInvestment, telehealthScope, timelineAggressiveness]);
```

**Key constants and their rationale:**
- `baseEquityRisk` formula: `noCarPct × 0.8` captures the direct no-vehicle barrier.
  `(travelTime / 62) × 40` normalizes travel time against North Country's 62-minute maximum
  (the most extreme case in the system) and weights it at 40 points maximum.
- Financial improvement factors (0.58, 0.50, 0.56, 0.75) are derived from the Wyman Report's
  financial projections for each restructuring model.
- Transport mitigation of 65% is based on the transportation research literature showing that
  well-funded NEMT programs reduce access barriers by approximately 65–70%.
- Telehealth mitigation of 20% reflects that telehealth can substitute for some but not all
  physical access needs.

**When real data is available:** Replace `financialImprovement` constants with hospital-specific
projections derived from GMCB actuarial analysis.

### 17.2 Financial Modeling Calculations

```typescript
const systemTotals = useMemo(() => {
  const totalCurrentLoss = HOSPITALS.reduce((s, h) => s + h.annualLossM, 0);
  const totalInvestment = activeRecs.reduce((s, r) =>
    s + PILLARS.reduce((ps, { key }) => ps + (r.pillars[key].investmentM ?? 0), 0), 0);
  const totalAnnualSavings = activeRecs.reduce((s, r) =>
    s + PILLARS.reduce((ps, { key }) => ps + (r.pillars[key].annualSavingsM ?? 0), 0), 0);
  const roi = totalInvestment > 0
    ? ((totalAnnualSavings * projectionYear - totalInvestment) / totalInvestment * 100)
    : 0;
  return { totalCurrentLoss, totalInvestment, totalAnnualSavings, roi };
}, [activeRecs, projectionYear]);
```

**Per-hospital savings attribution:**
```typescript
relevantRecs.forEach((r) => {
  PILLARS.forEach(({ key }) => {
    // Hospital-specific recommendations get 100% of savings
    cumulativeSavings += (r.pillars[key].annualSavingsM ?? 0)
      * (r.sourceHospitals.includes(h.id) ? 1 : 0.05);
    // System-wide recommendations get 5% per hospital (1/20 of 14 hospitals ≈ 7%)
  });
});
```

### 17.3 County Access Equity Score

```typescript
const accessScore = Math.max(0,
  100
  - (c.noVehiclePct * 1.5)                    // Car-less households, weight 1.5
  - (c.belowPovertyPct * 0.8)                 // Poverty, weight 0.8
  - (c.travelTimeToHospitalMin * 0.4)         // Travel time, weight 0.4
    * transportMultipliers[transportScenario]  // Modified by transport scenario
);
```

Transport scenario multipliers:
- `baseline`: 1.0 (no mitigation)
- `enhanced`: 0.65 (35% travel barrier reduction)
- `full`: 0.35 (65% travel barrier reduction)

If a county's primary hospital is under restructuring in the current scenario, travel time is
multiplied by 1.6 to reflect the increased distance patients must travel.

---

## 18. UI Component Library

The simulator defines eight reusable UI primitives in `page.tsx`. These are local to the
simulator and do not depend on or conflict with the platform's other components.

### 18.1 PillarGauge (SVG)

```typescript
// Circular gauge using SVG stroke-dasharray technique
// score: 0-100 → arc fill percentage
// direction: determines arc color (green/amber/red)
// circumference = 2π × 28 (radius)
// progress = (score/100) × circumference
```

The gauge renders a 72×72 SVG with:
- Background circle (light grey, strokeWidth 6)
- Foreground arc (color-coded, strokeWidth 6, strokeDasharray for partial fill)
- Score number centered in the circle

### 18.2 HBar (Horizontal Progress Bar)

```typescript
// Tailwind-styled div with a colored inner div
// width is set as an inline style: width: `${pct}%`
// pct = Math.min(100, (value / max) * 100)
```

### 18.3 TimelineRow (Gantt Row)

```typescript
// Renders a single Gantt chart row
// start and end are year offsets (0 = 2025, 5 = 2030)
// bar position: left = (start/5)*100% of container width
// bar width: ((end-start)/5)*100% of container width
// minimum width clamped to 3% to ensure visibility
```

### 18.4 InfoCard (Variant Card)

Four variants with different background and border colors:
- `default`: white background, slate border
- `warn`: amber-50 background, amber border
- `info`: blue-50 background, blue border
- `success`: emerald-50 background, emerald border

### 18.5 MetricCard

A centered card showing a large metric value, a label, and an optional sublabel. Color is
applied to the value text via the optional `color` prop (Tailwind text color class).

---

## 19. State Management

### 19.1 Global State (Act167SimulatorPage)

The root component manages two pieces of state shared across all tabs:

```typescript
const [activeTab, setActiveTab] = useState<TabId>("scenario");
// Which of the 8 tabs is currently active

const [selectedRecs, setSelectedRecs] = useState<Set<string>>(new Set());
// Set of recommendation IDs currently selected in the user's scenario
```

`selectedRecs` is passed as a prop to every tab component that needs it. Tab components that
do not use it (Technology Roadmap, Workforce Planning) receive no props.

The `toggleRec` callback is stabilized with `useCallback` to prevent unnecessary re-renders:
```typescript
const toggleRec = useCallback((id: string) => {
  setSelectedRecs((prev) => {
    const next = new Set(prev);
    if (next.has(id)) next.delete(id); else next.add(id);
    return next;
  });
}, []);
```

### 19.2 Local Tab State

Each tab component manages its own local UI state:

| Component | Local State |
|---|---|
| ScenarioBuilder | expandedRec: string \| null (which rec card is expanded) |
| HospitalDeepDive | selectedHospital, restructuringOption, transportInvestment, timelineAggressiveness, telehealthScope |
| FinancialModeling | view, projectionYear, assumedInflation |
| EquityAnalysis | view, transportScenario |
| TechnologyRoadmap | view |
| WorkforcePlanning | view |
| StateBenchmarks | selected: string \| null |
| ImplementationRoadmap | (no local state — uses selectedRecs prop) |

### 19.3 Performance: useMemo

Expensive calculations are wrapped in `useMemo` with appropriate dependency arrays:
- Scenario aggregate scores in `ScenarioBuilder` (deps: `selected`)
- Hospital restructuring outcomes in `HospitalDeepDive` (deps: `hospital`, `option`, 3 sliders)
- Financial system totals in `FinancialModeling` (deps: `activeRecs`, `projectionYear`)
- County access scores in `EquityAnalysis` (deps: `selectedRecs`, `transportScenario`)

This ensures that slider movements in `HospitalDeepDive` do not trigger unnecessary recalculations
in the financial or equity modules.

---

## 20. Data Ingestion Guide: What Real Data Is Needed

This section is the most operationally important part of the technical guide. The simulator
currently uses synthetic data where real data is unavailable. This section describes exactly what
real data should be ingested, where to obtain it, and how to update the data file.

### 20.1 Hospital Financial Data

**What is needed:**
- Operating margin (%) — FY2022, FY2023, FY2024
- Total operating revenue ($M) — annual
- Total operating expense ($M) — annual
- Annual operating loss or gain ($M)
- Projected losses under 5%, 6%, 7%, and 8% annual expense growth to 2028

**Where to obtain it:**
- **Primary source:** GMCB Hospital Budget Filings (public)
  URL: `https://gmcboard.vermont.gov/hospital-budget-review`
  The GMCB publishes each hospital's approved budget and audited financials annually.
  Financial statements for all 14 Vermont hospitals are available for FY2019–FY2024.
- **Supplementary source:** CMS Cost Reports (HCRIS database)
  URL: `https://www.cms.gov/Research-Statistics-Data-and-Systems/Downloadable-Public-Use-Files/Cost-Reports`
  CMS cost reports contain Medicare cost-to-charge ratios, FTE counts, and bed counts.
- **5-year projections:** Contact GMCB directly. The Wyman Report projections are available
  in the individual hospital analysis decks (referenced in the report as a "separate document").

**How to update `data.ts`:**
In the `HOSPITALS` array, update these fields for each hospital:
```typescript
operatingMarginPct: -14.2,    // Replace with GMCB FY2024 audited operating margin
annualLossM: 6.8,              // Replace with FY2024 operating loss
projectedLoss2028M: 14.1,     // Replace with GMCB-validated 5-year projection
```

### 20.2 Hospital Operational Data (Beds, Volumes, FTEs)

**What is needed:**
- Licensed bed count (acute, ICU, psychiatric, SNF separately)
- Annual inpatient admissions
- Annual emergency department visits
- Annual outpatient visits
- Total FTE count (clinical and non-clinical)
- Medicare payment-to-cost ratio

**Where to obtain it:**
- **GMCB Hospital Budget Filings** — same URL as above; include staffing and utilization data
- **Vermont Hospital Association (VHA)** — annual hospital profiles
- **AHA Annual Survey** — American Hospital Association survey data (subscription required)
- **CMS Provider of Service Files** — bed counts and certification information
  URL: `https://data.cms.gov/provider-characteristics/hospitals-and-other-facilities`

**How to update `data.ts`:**
Update `beds`, `icuBeds`, `annualAdmissions`, `annualEDVisits`, `fteCount` for each hospital.

### 20.3 Geographic and Demographic Data

**What is needed:**
- Household vehicle availability by county (% of households without a vehicle)
- Percentage of population aged 65+
- Percentage of population below the federal poverty line
- Health Service Area population totals
- Average travel time in minutes from population center to primary hospital
- Travel time from each hospital to the nearest alternative hospital

**Where to obtain it:**
- **U.S. Census Bureau — ACS 5-Year Estimates:**
  - Vehicle availability: Table B08201 "Household Size by Vehicles Available"
  - Age 65+: Table B01001 "Sex by Age"
  - Poverty: Table S1701 "Poverty Status in the Past 12 Months"
  - Download via Census API or `data.census.gov`

- **Vermont Agency of Transportation (VTrans):**
  URL: `https://vtrans.vermont.gov/planning/data-and-maps`
  Provides travel time and distance data for Vermont routes.

- **GMCB Health Service Area definitions:**
  URL: `https://gmcboard.vermont.gov/hospital-budget-review/hsas`
  Official HSA boundary definitions and population data.

- **Routing API for travel times:**
  Use Google Maps Directions API, HERE Routing API, or OSRM (open source) to calculate
  driving times between population centers and hospitals, and between hospitals.
  Query format: origin = population centroid of HSA, destination = hospital address.
  Run for both normal conditions and winter driving conditions.

**How to update `data.ts`:**
- In `HOSPITALS`: update `populationHSA`, `popOver65Pct`, `noCarPct`, `lowIncomePct`,
  `avgTravelToNextHospitalMin` for each hospital.
- In `COUNTY_DATA`: update all nine fields for each of the 14 Vermont counties.

### 20.4 Recommendation Impact Data

**What is needed:**
For each recommendation pillar, the following financial figures should be replaced with
actuarially reviewed estimates:
- `investmentM` — capital and operating setup cost
- `annualSavingsM` — ongoing annual savings post-implementation

**Where to obtain it:**
- **GMCB hospital budget model** — The Wyman Report referenced a "separate document" with
  detailed financial models for each hospital. Request this from AHS or GMCB.
- **REH federal financial data:**
  CMS publishes REH payment supplement amounts annually.
  URL: `https://www.cms.gov/medicare/payment/prospective-payment-systems/rural-emergency-hospitals`
- **Vermont NEMT cost data:** AHS DAIL (Division of Long-Term Services and Supports) maintains
  NEMT program costs by county.
- **VITL modernization cost estimates:** VITL (Vermont Information Technology Leaders) has
  published modernization cost estimates. Contact VITL directly.
- **UVMMC financial data:** UVMMC publishes audited financial statements. Administrative cost
  benchmarking (vs. peer AMCs) should use Sullivan Cotter data with GMCB staff assistance.

**How to update `data.ts`:**
For each `Recommendation` object in the `RECOMMENDATIONS` array, update the pillar-specific
`investmentM` and `annualSavingsM` fields. Also update the `score`, `headline`, and `actions`
arrays as the evidence base improves.

### 20.5 COE and Service Line Data

**What is needed:**
- Current procedure volumes by hospital and specialty (to validate COE designation thresholds)
- Case mix index by hospital and service line
- Volume-outcome data for Vermont-specific conditions

**Where to obtain it:**
- **GMCB Uniform Hospital Discharge Data Set (UHDDS)** — inpatient discharge data by hospital
- **GMCB All-Payer Claims Database (APCD)** — procedure volumes across all payers
- **Vermont Hospital Association annual reports**

### 20.6 Complete Real Data Ingestion Checklist

The following table summarizes all data that should be replaced with real values, with priority
ranking (P1 = most urgent, P3 = can wait):

| Data Item | Field(s) in data.ts | Source | Priority |
|---|---|---|---|
| Hospital operating margins | `operatingMarginPct`, `annualLossM` | GMCB budget filings | P1 |
| 2028 financial projections | `projectedLoss2028M` | GMCB / Wyman detailed models | P1 |
| Hospital bed counts | `beds`, `icuBeds` | GMCB / AHA Survey | P1 |
| Annual admission volumes | `annualAdmissions`, `annualEDVisits` | GMCB / UHDDS | P1 |
| HSA population | `populationHSA` | GMCB HSA definitions | P1 |
| Vehicle availability | `noCarPct` | Census ACS B08201 | P1 |
| Travel time to next hospital | `avgTravelToNextHospitalMin` | Routing API | P1 |
| Age 65+ percentage | `popOver65Pct` | Census ACS B01001 | P1 |
| Poverty rate | `lowIncomePct` | Census ACS S1701 | P1 |
| FTE count | `fteCount` | GMCB staffing reports | P2 |
| Recommendation investment costs | `pillars.*.investmentM` | GMCB / AHS estimates | P2 |
| Recommendation savings estimates | `pillars.*.annualSavingsM` | GMCB / actuarial | P2 |
| County uninsured rate | `uninsuredPct` | Census ACS S2701 | P2 |
| County minority population | `minorityPct` | Census ACS B02001 | P2 |
| GPS coordinates | `lat`, `lng` | Google Maps / Census TIGER | P3 |
| COE specialty assignments | `coes` | GMCB / hospital COE planning docs | P3 |
| State benchmark outcomes | All fields in `STATE_BENCHMARKS` | Cited academic sources | P3 |

---

## 21. How to Add New Recommendations

### 21.1 When to Add New Recommendations

Add a new recommendation to the simulator when:
- A new policy proposal emerges that is not covered by the existing 14 recommendations
- The Wyman Report's detailed hospital recommendations (referenced as a "separate document")
  are released and contain additional specific recommendations
- GMCB, AHS, or the Vermont Legislature proposes additional Act 167 implementation measures
- Community engagement processes surface recommendations not in the original report

### 21.2 Step-by-Step Addition Process

**Step 1: Assign the recommendation metadata**

Open `data.ts` and add a new object to the `RECOMMENDATIONS` array:

```typescript
{
  id: "new-01",                            // Unique ID, no spaces, hyphen-separated
  category: "governance",                  // Must be one of the 9 RecommendationCategory values
  title: "Full title of the recommendation",
  shortTitle: "Short title ≤30 chars",
  description: "1–2 sentence description of what this recommendation does.",
  sourceHospitals: ["hospital-id"],        // Hospital IDs affected, or [] for system-wide
  priority: "high",                        // "critical" | "high" | "medium"
  implementationYears: [1, 3],            // Year offsets from 2025: [start, end]
  pillars: {
    policy: { /* ... */ },
    technology: { /* ... */ },
    financial: { /* ... */ },
    equity: { /* ... */ },
    clinical: { /* ... */ },
  },
}
```

**Step 2: Score each pillar**

For each of the five pillars, create a `PillarImpact` object:

```typescript
policy: {
  score: 75,                               // 0–100 per the scoring criteria in Section 16
  direction: "positive",                   // "positive" | "mixed" | "negative"
  headline: "One sentence describing the key policy impact",
  actions: [
    "First specific legislative or regulatory action required",
    "Second action",
    "Third action",
    // 3–8 actions recommended
  ],
  timeline: "Year 1–2 (2025–2027)",        // Human-readable implementation period
  investmentM: 2.5,                        // Setup/capital investment in $M (optional)
  annualSavingsM: 4.0,                     // Annual savings after implementation (optional)
  riskLevel: "medium",                     // "low" | "medium" | "high"
},
```

**Step 3: Verify the TypeScript types**

Run the TypeScript compiler:
```bash
cd /Users/baba/Vermont-Health-Platform/frontend
npx tsc --noEmit
```
There should be no errors related to your new recommendation. Common errors:
- Missing a pillar (all five are required)
- Using a category string not in `RecommendationCategory`
- Forgetting `riskLevel` in a pillar
- Forgetting `direction` in a pillar

**Step 4: Add to category labels and colors (if adding a new category)**

If your recommendation uses a new category string not in the existing nine categories, add it to:
```typescript
// In data.ts:
export type RecommendationCategory = ... | "your-new-category";
export const CATEGORY_LABELS = { ..., "your-new-category": "Display Name" };
export const CATEGORY_COLORS = { ..., "your-new-category": "bg-color-100 text-color-800" };
```

**Step 5: Test in the browser**

Start the dev server:
```bash
cd /Users/baba/Vermont-Health-Platform/frontend
npm run dev
```
Navigate to `http://localhost:3000/vermont-act-167/simulator` and verify:
- The new recommendation appears in the Scenario Builder checklist under the correct category
- Checking it updates the aggregate pillar gauges
- Expanding it shows all five pillar detail columns
- The implementation year range displays correctly

---

## 22. How to Add New Hospitals or Modify Existing Data

### 22.1 Updating an Existing Hospital

To replace synthetic data with real data, find the hospital object in the `HOSPITALS` array
in `data.ts` and update the relevant fields. All fields are documented in Section 15.1.

For example, to update Springfield Hospital's operating margin with the FY2024 GMCB value:
```typescript
// Find the hospital object with id: "springfield"
// Change:
operatingMarginPct: -14.2,    // synthetic
annualLossM: 6.8,              // synthetic
// To:
operatingMarginPct: -16.4,    // FY2024 GMCB audited (example)
annualLossM: 7.9,              // FY2024 GMCB audited (example)
```

There is no other change required — the simulator dynamically reads from the `HOSPITALS` array.

### 22.2 Adding a New Hospital

Vermont has exactly 14 licensed hospitals. However, if a new critical access hospital is
designated, or if a healthcare campus is split or merged, add a new entry to the `HOSPITALS`
array following the `Hospital` interface. The simulator will automatically include it in:
- The Hospital-by-Hospital financial view
- The system totals calculation
- The Scenario Builder's hospital reference lists

Important: If the hospital has a `urgency` of `"urgent"` or `"major"`, it will automatically
appear in the Hospital Restructuring Simulator's hospital selector grid.

### 22.3 Adding a New County

Vermont has 14 counties. If the simulator is extended to other states or if sub-county analysis
is needed, add new entries to `COUNTY_DATA`. The simulator will automatically include new
counties in the County Access Map view.

---

## 23. Extending the Simulator: New Modules

### 23.1 Adding a New Tab Module

To add a ninth tab to the simulator:

**Step 1: Add the tab to the TABS constant**
```typescript
const TABS = [
  // ... existing tabs ...
  { id: "newmodule", label: "🆕 New Module", icon: "🆕" },
] as const;
```

TypeScript will automatically infer the new `TabId` type union.

**Step 2: Write the component**
```typescript
function NewModule({ selectedRecs }: { selectedRecs: Set<string> }) {
  // Your module component here
  return <div className="space-y-6">...</div>;
}
```

**Step 3: Add the render condition**
```typescript
{activeTab === "newmodule" && <NewModule selectedRecs={selectedRecs} />}
```

### 23.2 Planned Future Modules

The following modules are envisioned for future development:

**Monte Carlo Sensitivity Analysis** *(replacing the previously listed Geographic Map item, which has been implemented)*

**Monte Carlo Sensitivity Analysis**
Run 10,000 simulations with randomized inputs (operating margin ±20%, savings ±30%, timeline
±6 months) to produce probability distributions of outcomes rather than point estimates.
This would require adding a pseudo-random number generator (Math.random with seeding) and
a histogram SVG component.

**Payment Reform Modeler**
A dedicated module for simulating the reference-based pricing transition, including payer-by-payer
impact (Medicaid, Medicare, commercial), employer premium impact, and UVMMC revenue trajectory
under different phase-in schedules.

**Comparative Dashboard (Side-by-Side)**
Allow two scenarios to be displayed side-by-side: "Scenario A" vs. "Scenario B" with delta
highlighting. This requires splitting the `selectedRecs` state into two independent sets.

**Export / PDF Report Generation**
A "Generate Report" button that assembles the current scenario's key outputs into a formatted
PDF or HTML report using the browser's print API (`window.print()`) or a server-side rendering
endpoint.

---

## 24. Maintenance and Operations Guide

### 24.1 Routine Maintenance Tasks

**Annual Data Updates (Priority: High)**
At the start of each fiscal year (July 1), update:
- Hospital operating margins and loss figures with the newly published GMCB budget filings
- Population data with the latest ACS 5-year estimates (released each December)
- Recommendation investment and savings figures based on any new GMCB actuarial work

The data update process requires only modifying `data.ts` — no changes to `page.tsx` are needed.

**Legislative Session Updates (Priority: High)**
After each Vermont legislative session (typically ends in May/June), update:
- The `actions` arrays for policy-relevant recommendations to reflect passed or failed legislation
- Implementation timelines for any recommendations where legislation has advanced or stalled
- Add new recommendations if new legislation introduces new reform requirements

**GMCB Action Updates (Priority: Medium)**
As the GMCB takes actions related to Act 167 (approving restructuring plans, denying CON
applications, setting new payment rates), update the relevant recommendation's actions list
and timeline.

**Wyman Report Follow-Up Document (Priority: High)**
The Wyman Report references a "separate document for detailed recommendations" not yet publicly
available. When this document is released, review it for new recommendations and additional
hospital-specific details to incorporate into the simulator.

### 24.2 Code Maintenance

**TypeScript Compilation**
Run `npx tsc --noEmit` after any changes to `data.ts` to verify type safety. Common pitfalls:
- Adding a hospital ID to `sourceHospitals` that doesn't exist in `HOSPITALS`
- Using a category string not defined in `RecommendationCategory`
- Forgetting a required pillar field

**Dependency Updates**
The simulator uses no unique dependencies. When the Vermont Health Platform updates Next.js,
React, or Tailwind, no simulator-specific changes are needed unless the updates break the
`useMemo`, `useState`, or `useCallback` APIs (extremely unlikely).

**Performance Monitoring**
The simulator is lightweight (all client-side, no API calls). The heaviest computation is the
`useMemo` for aggregate pillar scores (O(n) over 14 recommendations). With 14 recommendations
and 5 pillars, this is effectively instantaneous. No performance monitoring is currently needed.

### 24.3 Testing

The simulator does not currently have automated tests. If automated tests are added in the future,
the recommended approach is:

**Unit tests for calculation functions:**
Extract the calculation logic from `useMemo` callbacks into standalone functions in `data.ts`
or a new `calculations.ts` file. Test with Jest:
```typescript
import { calculateEquityRisk } from './calculations';
test('equity risk is clamped at 0', () => {
  expect(calculateEquityRisk(0, 62, 1.0, 1.0)).toBe(0);
});
```

**Integration tests:**
Use Playwright or Cypress to verify that:
- Selecting a recommendation updates the aggregate score gauges
- Adjusting the transportation slider changes the equity risk output
- The tab navigation renders each module

### 24.4 Backup and Version Control

All simulator code is in the Vermont Health Platform git repository. Data changes should be
committed with descriptive messages referencing the data source:

```bash
git add frontend/app/vermont-act-167/simulator/data.ts
git commit -m "Update hospital operating margins with GMCB FY2024 audited financials

Sources:
- Springfield: -16.4% (GMCB FY2024 budget filing, p.47)
- Grace Cottage: -19.2% (GMCB FY2024 budget filing, p.52)
- Gifford: -18.1% (GMCB FY2024 budget filing, p.44)"
```

Keeping the data change history in git provides a complete audit trail of when data was updated
and what sources were used.

---

## 25. Known Limitations and Future Development Roadmap

### 25.1 Current Limitations

**Synthetic Data:**
The most significant limitation. Financial projections, travel times, demographic breakdowns,
and outcome estimates are derived from the Wyman Report and supplementary sources, but many
figures are estimates that should be replaced with verified actuals. All users should understand
that simulation outputs are illustrative, not actuarial.

**No Geographic Map:**
The simulator does not currently include an interactive map of Vermont. This is the most
frequently requested missing feature. The infrastructure (`react-simple-maps`, `d3-geo`) is
already installed and geographic coordinates are already in the hospital data. A map module
can be added without new dependencies.

**No Scenario Persistence:**
Scenarios reset on page refresh. There is no ability to save, name, share, or compare multiple
scenarios. This limits the tool's usefulness for multi-session analysis.

**Single-Point Estimates:**
All financial and outcome projections are single-point estimates. There are no confidence
intervals, probability distributions, or sensitivity ranges shown. A Monte Carlo module would
address this.

**No Multi-State Comparison:**
The State Benchmarks module shows outcomes from other states but does not allow users to
simulate what those states' specific interventions would produce in Vermont's context.

**No Real-Time Data Connection:**
The simulator does not connect to GMCB's data systems, the Vermont APCD, or any live data feed.
All data updates require manual editing of `data.ts` and redeployment.

### 25.2 Future Development Roadmap

**Version 1.1 (Short-term):**
- Replace all P1 synthetic data with real GMCB data (see Section 20.6)
- Add Vermont GIS map with hospital markers and HSA boundaries
- Add localStorage persistence for scenario selections

**Version 1.2 (Medium-term):**
- Side-by-side scenario comparison tool
- Sensitivity sliders for key financial assumptions (expense growth, savings certainty)
- Export to PDF/print-ready report format
- Additional COE-specific simulation for each specialty category

**Version 2.0 (Long-term):**
- Real-time data connection to GMCB financial reporting system
- Monte Carlo simulation with probability distributions
- Full payment reform modeler (reference-based pricing phase-in simulator)
- Vermont GIS map with isochrone travel time analysis
- Population-weighted access scoring using block-group-level Census data
- Longitudinal tracking (compare Year 1 actuals vs. simulator projections)
- Multi-user collaboration with named scenarios and sharing links

---

## 26. Data Sources and References

### 26.1 Primary Data Source

**Oliver Wyman (a business of Marsh McLennan)**
"Act 167 Community Engagement: Recommendations"
August 2024
Prepared for the Vermont Agency of Human Services and Green Mountain Care Board

This 144-page report is the foundational document for the simulator. All recommendation
categories, hospital-specific guidance, COE designations, financial frameworks, and the "at-risk
hospital" classifications derive from this report. The Wyman Report itself noted that some
of its data contained errors (the Gifford Medical Center data dispute documented a 37%
discrepancy in acute inpatient admissions). This is why the simulator treats all financial
figures as estimates pending verification with actual GMCB data.

### 26.2 Vermont Government Sources

- **GMCB Hospital Sustainability Hub:** `https://gmcboard.vermont.gov/hospitalsustainability`
- **GMCB Hospital Budget Review:** `https://gmcboard.vermont.gov/hospital-budget-review`
- **GMCB Act 167 Community Meetings:** `https://gmcboard.vermont.gov/Act-167-Community-Meetings`
- **Vermont Health Care Reform (AHS):** `https://healthcarereform.vermont.gov`
- **VITL (Vermont Information Technology Leaders):** `https://vitl.net`
- **Vermont Legislature — S.285 / Act 167:** `https://legislature.vermont.gov/bill/status/2022/S.285`
- **GMCB 2024 Annual Report:** Published January 2025

### 26.3 Federal Sources

- **CMS Rural Emergency Hospital:** `https://www.cms.gov/medicare/payment/prospective-payment-systems/rural-emergency-hospitals`
- **CMS AHEAD Model:** `https://innovation.cms.gov/innovation-models/ahead`
- **CMS HCRIS Cost Reports:** `https://www.cms.gov/Research-Statistics-Data-and-Systems/Downloadable-Public-Use-Files/Cost-Reports`
- **MedPAC 2024 Report:** Medicare Payment Advisory Commission annual report to Congress
- **HRSA Health Profession Shortage Area data:** `https://data.hrsa.gov/topics/health-workforce/hpsa-find`

### 26.4 Academic Citations

- **Birkmeyer, J.D. et al.** "Hospital Volume and Surgical Mortality in the United States."
  *New England Journal of Medicine*, 346(15):1128–1137, 2002. DOI: 10.1056/NEJMsa012337

- **Levine, D.M. et al.** "Hospital-Level Care at Home for Acutely Ill Adults: A Randomized
  Controlled Trial." *Annals of Internal Medicine*, 172(2):77–85, 2020.

- **Haber, S. et al.** "Changes in Hospital Finances After Maryland's Transition to an
  All-Payer Global Budget Model." *JAMA Internal Medicine*, 2019.

- **Desai, A.S. et al.** "Implantable Strategy- or Patient Education-Based Intervention for
  Heart Failure." *Circulation*, 2017.

- **Robert Wood Johnson Foundation.** "The Role of Transportation in Health."
  Princeton, NJ: RWJF, 2019.

- **Dartmouth Atlas of Health Care, 2020.** "Variation in the Care of Surgical Conditions."
  The Dartmouth Institute for Health Policy and Clinical Practice.

- **Sullivan Cotter, 2023.** Physician Compensation and Productivity Survey Report.
  (Proprietary data; GMCB references in Wyman Report, p.116–117)

### 26.5 State Reform Sources

- **Maryland HSCRC:** `https://hscrc.maryland.gov`
  Primary source: Haber et al., NEJM 2019; HSCRC Annual Reports 2014–2023

- **Oregon CCO:** Oregon Health Authority Annual Reports. `https://www.oregon.gov/oha`
  Primary source: OHA CCO Annual Report 2015; Dartmouth Atlas 2016

- **Pennsylvania PARHP:** Robert Wood Johnson Foundation Pennsylvania Rural Health Initiative
  reports, 2022. `https://www.rwjf.org`

- **Minnesota Rural Health:** Minnesota Rural Health Research Center, University of Minnesota.
  `https://rhrc.umn.edu`

- **Montana Frontier Health:** HRSA Frontier Health Research Center, Montana State University.
  Frontier Health Research Center Annual Reports 2018–2021.

### 26.6 Demographic Data Sources

- **U.S. Census Bureau — American Community Survey 5-Year Estimates:**
  `https://data.census.gov`
  Tables used: B08201 (vehicle availability), B01001 (age), S1701 (poverty), S2701 (insurance)

- **Vermont Agency of Commerce and Community Development:**
  `https://accd.vermont.gov/community-development/data-mapping`
  Vermont-specific demographic and housing data

---

## Appendix A: Complete Recommendation List

| ID | Category | Title | Priority | Hospitals | Years |
|---|---|---|---|---|---|
| gov-01 | Governance | Establish AHS/GMCB PMO | Critical | System-wide | 1–2 |
| atrisk-01 | At-Risk Restructuring | Springfield → REH | Critical | SRH | 1–2 |
| atrisk-02 | At-Risk Restructuring | Gifford → Mental Health COE | Critical | GMC | 1–2 |
| atrisk-03 | At-Risk Restructuring | North Country → CACC | Critical | NCH | 2–4 |
| atrisk-04 | At-Risk Restructuring | Grace Cottage → REH+Primary | Critical | GCH | 1–2 |
| coe-01 | COE Regionalization | Surgical COE Network | High | UVMMC, BMH, RRMC, SVMC, NVRH, NMC | 2–5 |
| coe-02 | COE Regionalization | Mental Health COE Network | Critical | UVMMC, BMH, CVMC, RRMC, SVMC, SRH | 1–4 |
| cost-01 | Cost Reduction | Shared Services & Group Purchasing | High | GMC, NCH, SRH, GCH, Copley, NVRH, NMC | 1–3 |
| tech-01 | Technology | VITL Modernization | Critical | System-wide | 1–3 |
| tech-02 | Technology | Telehealth Expansion | High | System-wide | 1–4 |
| work-01 | Workforce | EMS Regionalization | Critical | System-wide | 1–3 |
| pay-01 | Payment Reform | Reference-Based Pricing | High | System-wide | 2–6 |
| uvm-01 | UVMMC Reform | UVMMC Cost & Productivity Reform | Critical | UVMMC | 1–3 |
| eq-01 | Equity & Access | Statewide Medical Transportation | Critical | System-wide | 1–4 |

---

## Appendix B: Hospital Quick Reference

| Hospital | Short | City | Urgency | Beds | Margin | Annual Loss | Next Hospital |
|---|---|---|---|---|---|---|---|
| UVM Medical Center | UVMMC | Burlington | Modest | 562 | +1.2% | $0M | 25 min |
| Rutland Regional MC | RRMC | Rutland | Significant | 188 | -2.1% | $3.8M | 38 min |
| Southwestern VT MC | SVMC | Bennington | Significant | 99 | -4.2% | $4.1M | 42 min |
| Central Vermont MC | CVMC | Berlin | Significant | 142 | -3.8% | $5.2M | 32 min |
| Brattleboro Mem. Hosp | BMH | Brattleboro | Significant | 61 | -5.1% | $3.6M | 45 min |
| Northwestern MC | NMC | St. Albans | Significant | 70 | -6.2% | $4.8M | 35 min |
| NE Vermont Regional Hosp | NVRH | St. Johnsbury | Major | 25 | -8.4% | $4.2M | 55 min |
| Copley Hospital | Copley | Morrisville | Major | 25 | -9.8% | $3.9M | 48 min |
| Springfield Hospital | SRH | Springfield | Urgent | 25 | -14.2% | $6.8M | 38 min |
| Grace Cottage Family Health | GCH | Townshend | Urgent | 19 | -18.6% | $3.2M | 52 min |
| Gifford Medical Center | GMC | Randolph | Urgent | 25 | -16.8% | $4.1M | 42 min |
| North Country Hospital | NCH | Newport | Urgent | 35 | -12.4% | $5.6M | 62 min |
| Mt. Ascutney Hosp & HC | MAHHC | Windsor | Major | 35 | +2.0% | $0M | 44 min |
| Porter Medical Center | PMC | Middlebury | Significant | 25 | -7.1% | $3.4M | 40 min |

---

## Appendix C: Five-Pillar Color Reference

| Pillar | Key | Color | Tailwind Class |
|---|---|---|---|
| Policy & Governance | policy | Violet | text-violet-700 / bg-violet-100 |
| Technology & Infrastructure | technology | Blue | text-blue-700 / bg-blue-100 |
| Financial Impact | financial | Emerald | text-emerald-700 / bg-emerald-100 |
| Equity & Access | equity | Amber | text-amber-700 / bg-amber-100 |
| Clinical Quality | clinical | Rose | text-rose-700 / bg-rose-100 |

---

## Appendix D: Glossary

**AHEAD Model** — All-Payer Health Equity Approaches and Development Model. A CMS Innovation
Center model in which Vermont and Maryland are Cohort 1 participants (2024–2034). Provides up
to $12M in federal funding per state and a framework for total cost-of-care reform.

**APM** — Alternative Payment Model. A payment approach that incentivizes quality and efficiency
rather than volume of services, as opposed to traditional fee-for-service.

**ACS** — American Community Survey. An ongoing statistical survey by the U.S. Census Bureau
that collects social, economic, housing, and demographic data annually.

**CAH** — Critical Access Hospital. A federal designation for small rural hospitals (≤25 acute
inpatient beds, ≥35 miles from nearest hospital) that qualifies for Medicare cost-based
reimbursement. Four Vermont hospitals currently hold CAH status.

**CACC** — Community Ambulatory Care Center. Oliver Wyman's term for a restructured small
hospital that provides ambulatory, SNF, mental health, and urgent care services but no
traditional acute inpatient beds.

**COE** — Center of Excellence. A hospital site designated to provide high-quality, high-volume
specialty services to a regional population, based on existing clinical expertise and sufficient
patient volumes.

**CON** — Certificate of Need. A Vermont regulatory requirement that healthcare facilities
obtain GMCB approval before making major capital expenditures or service changes.

**EMS** — Emergency Medical Services. Pre-hospital emergency care provided by paramedics and
EMTs. EMS regionalization refers to consolidating fragmented local EMS services into coordinated
regional systems with consistent ALS capability.

**FQHC** — Federally Qualified Health Center. A community-based healthcare provider that
receives enhanced Medicaid reimbursement (cost-based) and serves underinsured and uninsured
populations. FQHC status requires meeting federal criteria including sliding-fee-scale billing.

**GMCB** — Green Mountain Care Board. Vermont's hospital regulatory authority, responsible for
reviewing and approving hospital budgets, rates, and major changes.

**GPO** — Group Purchasing Organization. A consortium through which multiple hospitals jointly
negotiate lower prices for medical supplies, drugs, equipment, and services.

**H@H** — Hospital at Home. A program in which patients who would otherwise require acute
inpatient hospitalization receive hospital-level care in their own homes, with daily clinician
visits and remote monitoring.

**HRSA** — Health Resources and Services Administration. The U.S. federal agency that oversees
rural health programs, workforce development, and community health center funding.

**HSA** — Health Service Area. A geographic area, roughly county-sized, defined by GMCB as the
primary service catchment for a Vermont hospital. Vermont has 14 HSAs, one per hospital.

**NEMT** — Non-Emergency Medical Transportation. Medicaid-funded transportation services that
help beneficiaries reach medical appointments that are not emergencies.

**PMO** — Project Management Office. A centralized organizational unit that provides governance,
coordination, analytic, and facilitation support for a complex multi-year initiative.

**REH** — Rural Emergency Hospital. A federal CMS designation created in 2023 for small rural
hospitals that convert to a model with emergency services, limited inpatient capacity, and
enhanced Medicare supplemental payments.

**SDOH** — Social Determinants of Health. The non-medical factors (housing, food, transportation,
education, income) that significantly influence health outcomes.

**SNF** — Skilled Nursing Facility. A licensed facility providing post-acute skilled nursing and
rehabilitative care, typically following an acute hospitalization.

**VITL** — Vermont Information Technology Leaders. Vermont's statewide Health Information
Exchange (HIE), responsible for connecting healthcare providers with shared patient data.

---

*End of Document*

**Document prepared by:** Health Transformation Research Platform
**Primary data source:** Oliver Wyman "Act 167 Community Engagement: Recommendations," August 2024
**Last updated:** March 2026
**File location:** `/Users/baba/Vermont-Health-Platform/ACT167_SIMULATOR_GUIDE.md`
**Simulator location:** `/Users/baba/Vermont-Health-Platform/frontend/app/vermont-act-167/simulator/`

*For questions about this document or the simulator, refer to the Vermont Health Platform
technical team or the Vermont Agency of Human Services Office of Health Care Reform.*
