# **Vermont Health Platform — Research Lab & Tools: Comprehensive Reference Guide**

---

## **SECTION 1: THE TWO "TOOLS" SECTIONS — WHAT THEY ARE AND HOW THEY DIFFER**

### **1.1 Why There Are Two "Tools" Sections**

The Vermont Health Platform has two separate areas both labeled "Tools." They are **not the same**. They overlap partially but serve different purposes, reach different audiences, and contain different items. Understanding the distinction is essential before using the platform.

---

### **1.2 Tools in the Home Sidebar**

**Where it lives:** In the left-hand Home Sidebar, below the six Pillars (Policy, Economics, Technology, Clinical, Equity, Operations), States & Programs, and above Academy. It is a flat, always-visible navigation section.

**How to access it:** Open the application. The Home Sidebar is visible on the left side of every page. Scroll down past the six Pillar sections and States & Programs. You will see a section labeled **TOOLS**. It is not collapsible into a sub-pillar — it is a top-level section at the same level as the Pillars themselves.

**What it contains (10 items):**

| Item | Route |
| ----- | ----- |
| Six-Pillar Map | /about/framework |
| HTR Simulator | /htr-simulator |
| Medicaid Eligibility Simulator | /medicaid-eligibility-simulator |
| HTI Dashboard | /hti-dashboard |
| The Wire | /the-wire |
| Investment Tracker | /investment-tracker |
| Transformation Friction Index | /transformation-friction-index |
| Impact Simulation | /impact-simulation |
| Multimedia | /multimedia |
| Trending Topics | /trending-topics |

**Character of this Tools section:** These are all **stand-alone tools** — each lives at its own top-level URL route, functions independently, and does not require navigating into a pillar or research lab. They are the platform's primary operational instruments: a live news feed, a real-time investment tracker, simulators, dashboards. Think of this as the platform's **instrument panel**.

---

### **1.3 Tools in the Header (Mega-Menu)**

**Where it lives:** In the top navigation bar (Header), which is present on every page. The Header contains five mega-menu tabs: **Intelligence | Academy | Tools | States & Programs | Advisory & Services**. Clicking **Tools** opens a dropdown mega-menu panel.

**How to access it:** Click the word **"Tools"** in the top navigation bar. A large dropdown panel appears with three grouped columns.

**What the Header Tools panel contains:**

**Column 1 — Simulators:**

* `HTR Simulator →` /htr-simulator  
* `Medicaid Eligibility Simulator →` /medicaid-eligibility-simulator  
* `Impact Simulation →` /impact-simulation  
* `Transformation Friction Index →` /transformation-friction-index

**Column 2 — Data & Signals:**

* `Trending Topics →` /trending-topics  
* `The Wire →` /the-wire  
* `Investment Tracker →` /investment-tracker  
* `HTI Dashboard →` /hti-dashboard

**Column 3 — Media \+ Research Lab:**

* `Multimedia →` /multimedia  
* `Research Lab →` /research-lab (labeled "All 19 Lab Tools" or "All 21 Lab Tools" depending on version)

---

### **1.4 Direct Comparison: Sidebar Tools vs Header Tools**

| Dimension | Home Sidebar Tools | Header Tools Panel |
| ----- | ----- | ----- |
| **Location** | Left sidebar, always visible | Top navbar, click-to-open dropdown |
| **Navigation style** | One click from sidebar | `Two clicks (open nav → click Tools → click item)` |
| **Items** | 10 items | 10 items \+ direct link to Research Lab Hub |
| **Unique to Sidebar** | Six-Pillar Map | — |
| **Unique to Header** | — | Direct "Research Lab / All Tools" shortcut |
| **Overlap** | 9 of 10 items are identical | 9 of 10 items are identical |
| **Purpose** | Persistent quick-access panel | Contextual discovery for new/returning users |
| **Research Lab access** | NOT directly listed (Research Lab tools are accessed via each Pillar's Research Lab sub-items) | YES — direct link to Research Lab hub |

**The key practical difference:** The Sidebar Tools section gives you fast one-click access to the 9 stand-alone tools \+ the Six-Pillar Map. The Header Tools panel gives you the same 9 stand-alone tools organized by category (Simulators vs Data & Signals), PLUS a direct shortcut into the Research Lab hub. The Research Lab's 20 analytical tools are **not** `listed in the Sidebar Tools section — they are accessed through each Pillar's Research Lab sub-items in the Sidebar, or through the Header Tools → Research Lab link.`

---

## **SECTION 2: STAND-ALONE TOOLS (The 10 Sidebar/Header Tools)**

---

### **Tool 1: Six-Pillar Framework Map**

**URL:** /about/framework  
**File:** frontend/components/SixPillarFrameworkMap.tsx

**Sidebar:** Yes (Tools section) | **Header Tools:** No (appears under Company dropdown)

**What it is:** An interactive visual map of the platform's six-pillar analytical framework. It is primarily an orientation and educational tool — not a calculator. It explains how the six pillars (Policy, Economics, Technology, Clinical, Equity, Operations) relate to each other and to healthcare transformation.

**How to access:** `Home Sidebar → Tools → Six-Pillar Map. Or: Header → Company dropdown → Framework.`

**What it does:** Displays each of the six pillars with their core dimensions and interdependencies. No calculations. No inputs. Pure visualization and navigation.

**Regulatory basis:** None — this is a proprietary analytical framework developed for the platform.

---

### **Tool 2: HTR Simulator (Health Transformation Readiness)**

**URL:** /htr-simulator  
**File:** frontend/app/htr-simulator/page.tsx

**Sidebar:** Yes | **Header Tools:** Yes (under Simulators)

**What it is:** The HTR (Health Transformation Readiness) Simulator is the platform's flagship multi-dimensional scoring engine. It assesses an organization's or region's readiness for healthcare transformation across six domains, producing a composite readiness score.

**How to access:** `Home Sidebar → Tools → HTR Simulator. Or: Header → Tools → Simulators → HTR Simulator.`

**The six scoring pillars and their dimensions:**

| Pillar | Dimensions (5 each) |
| ----- | ----- |
| Policy | Regulatory alignment, Legislative capacity, Waiver status, Mandate compliance, Policy innovation |
| Technology | EHR maturity, Interoperability, AI adoption, Cybersecurity, Digital engagement |
| Financial | Revenue mix, APM participation, Margin stability, Capital access, Cost structure |
| Equity | SDOH integration, Disparity reduction, Access equity, Workforce diversity, Community trust |
| Clinical | Quality performance, Care coordination, Prevention, Population health, Outcomes |
| Operations | Workflow efficiency, Staffing, Supply chain, Revenue cycle, Leadership capacity |

**Scoring scale:** Each pillar scored 0–100. Composite score \= average across all six pillars.

**Score interpretation bands:**

* **80–100:** Strong — organization is transformation-ready  
* **60–79:** Moderate — progressing, with gaps to address  
* **40–59:** Developing — significant work needed  
* **0–39:** Critical — fundamental barriers exist

**Live implementations:** The simulator is fully live for **Vermont Act 167** `→ clicking the Vermont card routes to` /vermont-act-167/simulator. Three other use cases are listed as "Coming Soon": California CalAIM, Oregon CCO 3.0, and CMS RHTP.

**Data sources used (per methodology in code):**

* CMS Provider of Services File  
* CMS Cost Reports (HCRIS — Healthcare Cost Report Information System)  
* AHA Annual Survey  
* U.S. Census Bureau American Community Survey (ACS)  
* HIFLD (Homeland Infrastructure Foundation-Level Data) Open Data  
* Oliver Wyman / consulting reports  
* State All-Payer Claims Databases (APCDs)

**Regulatory context:**

* **Vermont Act 167 (2022):** The primary live implementation. Act 167 authorized a statewide hospital transformation program with performance benchmarks. The simulator operationalizes readiness assessment for Act 167 compliance.  
* **CMS RHTP (Rural Health Transformation Program):** A future implementation target. RHTP provides federal grants to states transforming rural health delivery.  
* **California CalAIM (California Advancing and Innovating Medi-Cal):** A Medi-Cal 1115 waiver-based transformation program — planned future implementation.

---

### **Tool 3: Vermont Medicaid Eligibility Simulator**

**URL:** /medicaid-eligibility-simulator  
**File:** frontend/app/medicaid-eligibility-simulator/page.tsx

**Sidebar:** Yes | **Header Tools:** Yes (under Simulators)

**What it is:** An interactive step-by-step wizard that determines which Vermont Medicaid programs a person is likely eligible for, based on household and personal characteristics. It is the most regulation-dense of all stand-alone tools.

**How to access:** `Home Sidebar → Tools → Medicaid Eligibility. Or: Header → Tools → Simulators → Medicaid Eligibility Simulator.`

**The 5-step wizard:**

1. Vermont residency and citizenship  
2. Household size and annual income  
3. Family and pregnancy status  
4. Age, disability, and insurance status  
5. Results

**All input variables:**

* isVermont — Vermont resident (yes/no)  
* isCitizen — U.S. citizen or qualified immigrant (yes/no)  
* householdSize — number of people in household (1–10+)  
* annualIncome — gross annual household income ($)  
* hasChildren — has children under 19 (yes/no)  
* childrenUnder19 — count of children under 19  
* isPregnant — currently pregnant (yes/no)  
* isPostpartum — within 12 months post-delivery (yes/no)  
* age — applicant's age  
* isDisabled — has qualifying disability (yes/no)  
* isBlind — legally blind (yes/no)  
* isFosterCareYouth — former foster care youth (yes/no)  
* hasEmployerInsurance — has access to employer-sponsored insurance (yes/no)  
* hasMedicare — enrolled in Medicare (yes/no)

**The Federal Poverty Level (FPL) Calculation:**

The simulator uses the 2026 HHS Federal Poverty Guidelines for the 48 contiguous states:

FPL\_BASE \= $15,650 (1-person household)  
FPL\_INCREMENT \= $5,500 (per additional person)  
getFPL(householdSize) \= $15,650 \+ ($5,500 × (householdSize − 1))

Examples:

* 1 person: $15,650  
* 2 people: $21,150  
* 3 people: $26,650  
* 4 people: $32,150

**FPL Visual Indicator thresholds displayed to user:** 100% / 138% / 208% / 317% FPL — these correspond to the eligibility cutoffs for different programs.

**All programs evaluated and their rules:**

**Program 1: Adult Medicaid (Green Mountain Care)**

* Who: Adults aged 19–64, not on Medicare  
* `Rule: Income ≤138% FPL → "Likely eligible"`  
* `Rule: Income 139–200% FPL → "Unlikely" (referred to Vermont Health Connect for premium tax credits available 139–400% FPL under ACA)`  
* Federal basis: ACA Medicaid expansion (45 CFR §435.119)

**Program 2: Dr. Dynasaur (Children)**

* Who: Children under age 19  
* `Rule: Income ≤317% FPL → "Likely eligible"`  
* `Sub-rule: No premiums charged if income ≤225% FPL`  
* Vermont-specific: Dr. Dynasaur is Vermont's CHIP/Medicaid program for children, one of the most generous in the nation  
* Federal basis: Title XIX Medicaid \+ Title XXI CHIP (42 USC §1396)

**Program 3: Dr. Dynasaur (Pregnancy)**

* Who: Currently pregnant individuals  
* `Rule: Income ≤208% FPL → "Likely eligible"`  
* Coverage: Prenatal, labor/delivery, postpartum services

**Program 4: Postpartum Medicaid (12-Month Extension)**

* Who: Within 12 months of delivery  
* `Rule: Income ≤208% FPL → "Likely eligible"`  
* Regulatory basis: **Vermont 2022 law** implementing the ARP (American Rescue Plan Act) option for 12-month postpartum coverage. Prior to 2022, Medicaid postpartum coverage ended at 60 days. Vermont was among the first states to adopt the full 12-month extension under the American Rescue Plan Act of 2021 (§9812).

**Program 5: AABD Medicaid (Aged, Blind, and Disabled)**

* `Who: Age ≥65, OR has qualifying disability, OR is legally blind`  
* `Rule: Income ≤100% FPL → "Likely eligible"`  
* `Rule: Income 101–150% FPL → "Possibly eligible"`  
* Asset test: \~$2,000 individual / \~$3,000 couple (Vermont standard)  
* SSI note: SSI recipients are automatically eligible  
* Federal basis: Title XIX, original Medicaid categories (42 USC §1396a)

**Program 6: Choices for Care (Long-Term Services and Supports)**

* `Who: Age ≥65 or with disability requiring LTSS`  
* Rule: Income 300% of SSI rate ($2,742/month)  
* Vermont-specific: Vermont's HCBS waiver program for nursing-home-level care delivered at home or in community  
* Federal basis: §1915(c) HCBS waiver

**Program 7: Former Foster Care Youth**

* Who: Under age 26, former foster care youth  
* Rule: No income test  
* Regulatory basis: ACA §2004 (42 USC §1396a(a)(10)(A)(i)(IX)) — mandatory coverage of former foster care youth to age 26 with no income test, enacted 2014

**Program 8: Vermont Premium Assistance (VPA)**

* Who: Has access to employer-sponsored insurance \+ income 138–300% FPL  
* Rule: Medicaid pays the employee premium share for employer coverage  
* Vermont-specific: VPA program administered by DVHA

**Program 9: Medicare Savings Programs (MSP)**

* Who: Has Medicare  
* Three tiers:  
  * **QMB (Qualified Medicare Beneficiary):** `≤100% FPL — Medicare pays Part A + B premiums, deductibles, and cost-sharing`  
  * **SLMB (Specified Low-Income Medicare Beneficiary):** 101–120% FPL — Medicaid pays Part B premium only  
  * **QI (Qualifying Individual):** 121–135% FPL — Medicaid pays Part B premium (subject to annual funding)  
* Federal basis: QMB under §1902(a)(10)(E)(i), SLMB under §1902(a)(10)(E)(iii), QI under §1902(a)(10)(E)(iv)

**Program 10: Dual Eligible (Medicare \+ Medicaid)**

* `Who: Has Medicare AND (age ≥65 OR disability)`  
* Outcome: Qualifies for both Medicare and Medicaid simultaneously — "full dual eligible" or "partial dual eligible" depending on income  
* Federal basis: 42 CFR §§422, 423 (Medicare Advantage/Part D for duals)

**Output structure:** Each program evaluated produces an EligibilityResult with:

* Verdict: likely / possibly / unlikely  
* Plain-language reason  
* Details about premiums, asset tests, next steps  
* Apply URL (links to DVHA or DCF application portals)

---

### **Tool 4: HTI Dashboard (Health Transformation Index)**

**URL:** /hti-dashboard  
**Files:** frontend/app/hti-dashboard/page.tsx \+ frontend/components/HTIDashboard.tsx

**Sidebar:** Yes | **Header Tools:** Yes (under Data & Signals)

**What it is:** A multi-dimensional dashboard that calculates a composite Health Transformation Index (HTI) score for hospitals, regions, or states. It combines simulation (slider-based modeling) with real data overlays from CMS and ONC, and provides trend analysis, peer comparison, and clinical deep-dives.

**How to access:** `Home Sidebar → Tools → HTI Dashboard. Or: Header → Tools → Data & Signals → HTI Dashboard.`

**The four dashboard tabs:**

1. Simulation Engine  
2. Trend Analysis  
3. Peer Comparison  
4. Clinical Deep-Dive

**The Six HTI Domains and Their Weights:**

| Domain | Weight | What It Measures |
| ----- | ----- | ----- |
| Digital Maturity | 20% | EHR interoperability, AI adoption, cybersecurity |
| Value-Based Care | 15% | Revenue at risk, shared savings participation, ACO attribution |
| Social Determinants (SDOH) | 20% | SDOH integration, racial outcome equity gap, rural-urban access gap |
| Clinical Excellence | 20% | Readmission rates, preventable hospitalizations, HEDIS composite |
| Patient Experience | 15% | Net Promoter Score, digital engagement, PROMs |
| Workforce Wellness | 10% | RN turnover, burnout index, leadership diversity |

**The Composite HTI Formula:**

HTI\_Composite \= Σ (domain\_score × domain\_weight)  
\= (DigitalMaturity × 0.20) \+ (VBC × 0.15) \+ (SDOH × 0.20)   
  \+ (ClinicalExcellence × 0.20) \+ (PatientExperience × 0.15)   
  \+ (WorkforceWellness × 0.10)

**HTI Score Interpretation:**

* **`≥78:`** Leading  
* **`≥65:`** Improving  
* **`≥50:`** Stable  
* **\<50:** At Risk

**The 18 Sub-Metrics (3 per domain) with National Benchmarks:**

*Digital Maturity:*

* EHR Interoperability — national benchmark: 72  
* AI Adoption — national benchmark: 38  
* Cyber Resilience — national benchmark: 65

*Value-Based Care:*

* % Revenue in Risk Contracts — national benchmark: 42  
* Shared Savings Participation — national benchmark: 31  
* ACO Attribution Rate — national benchmark: 28

*SDOH:*

* SDOH Integration Score — national benchmark: 48  
* Racial Outcome Equity Gap — national benchmark: 55  
* Rural-Urban Access Gap — national benchmark: 52

*Clinical Excellence:*

* 30-Day Readmission Rate — national benchmark: 76  
* Preventable Hospitalization (PQI) — national benchmark: 68  
* HEDIS Composite — national benchmark: 71

*Patient Experience:*

* Net Promoter Score (NPS) — national benchmark: 62  
* Digital Engagement Rate — national benchmark: 58  
* Patient-Reported Outcome Measures (PROMs) — national benchmark: 44

*Workforce Wellness:*

* RN Turnover Rate — national benchmark: 72  
* Burnout Index — national benchmark: 58  
* Leadership Diversity Score — national benchmark: 48

**National Clinical Reference Benchmarks (displayed in Clinical Deep-Dive tab):**

* Preventable hospitalization: 980 per 100,000 population  
* Maternal mortality: 23.5 per 100,000 live births  
* Cancer screening rate: 69%  
* Mental health access rate: 52%  
* Primary care density: 13.2 per 10,000 population  
* Opioid overdoses: 22.4 per 100,000 population  
* Uncompensated care ratio: 5.6%

**Level Presets:** Users can switch between three analysis levels: Hospital, Region, State — each loads default starting metrics appropriate to that level.

**Real Data Overlay:** The Trend Analysis tab pulls from /api/hti-scores, which retrieves Supabase-stored quarterly snapshots labeled "Real Data (CMS/ONC)" — these are overlaid on the trend chart alongside simulation projections (Q1 2023 through Q1 2025, with 4 quarters projected forward).

**Regulatory relevance:**

* ONC Health Information Technology standards (EHR interoperability, USCDI)  
* CMS quality reporting (HEDIS, PQI, readmission measures)  
* CMS Value-Based Purchasing programs  
* SDOH-related HHS Healthy People 2030 framework

---

### **Tool 5: The Wire**

**URL:** /the-wire  
**Files:** frontend/app/the-wire/page.tsx \+ WireFeed.tsx

**Sidebar:** Yes | **Header Tools:** Yes (under Data & Signals)

**What it is:** A live, real-time healthcare policy and industry news feed. It is not a calculator or simulator — it is a curated intelligence feed.

**How to access:** `Home Sidebar → Tools → The Wire. Or: Header → Tools → Data & Signals → The Wire.`

**How it works:** The page uses Next.js Incremental Static Regeneration (ISR) with revalidate \= 900 seconds (15 minutes), meaning the feed refreshes every 15 minutes from the /api/wire endpoint. Each news item contains:

* title — headline  
* url — link to original source  
* source — publication/outlet name  
* label — category tag (e.g., "Policy," "Technology," "Equity")  
* published\_at — timestamp

**Regulatory relevance:** None directly — this is a passive information tool. However, it is designed to surface breaking changes in CMS rules, state legislation, CMS model updates, and federal health policy.

---

### **Tool 6: Investment Tracker**

**URL:** /investment-tracker  
**Files:** frontend/app/investment-tracker/page.tsx \+ InvestmentTrackerClient.tsx

**Sidebar:** Yes | **Header Tools:** Yes (under Data & Signals)

**What it is:** A searchable, filterable database of healthcare investment deals — M\&A, venture capital, private equity, and strategic partnerships — sourced from Sanity CMS.

**How to access:** `Home Sidebar → Tools → Investment Tracker. Or: Header → Tools → Data & Signals → Investment Tracker.`

**How it works:** The page fetches from Sanity (revalidates every 300 seconds / 5 minutes). Each deal record contains:

* dealType — M\&A / VC / PE / Strategic / Grant  
* status — Announced / Closed / Pending / Terminated  
* announcedDate / closedDate  
* dealValueUsd — deal value in US dollars  
* acquirer — acquiring entity  
* target — target entity  
* pillar — which of the six pillars this deal relates to  
* sector — healthcare sector classification  
* geography — state / region  
* summary — deal description  
* analystNote — platform analyst commentary  
* sourceUrl — link to primary source  
* tags — searchable tags

**Regulatory relevance:** None directly — passive tracking tool. Relevant deals may relate to CMS model implementations, technology mandates, or state-level program investments.

---

### **Tool 7: Transformation Friction Index**

**URL:** /transformation-friction-index  
**File:** frontend/app/transformation-friction-index/page.tsx

**Sidebar:** Yes | **Header Tools:** Yes (under Simulators)

**What it is:** A planned analytical tool that will score the degree of friction (resistance/barriers) a health system faces across six transformation dimensions. **Status: Coming Q3 2026 — not yet live.**

**How to access:** `Home Sidebar → Tools → Friction Index. Or: Header → Tools → Simulators → Transformation Friction Index.`

**The six friction dimensions (defined in code, engine not yet live):**

| Dimension | Color Code | Examples of Inputs |
| ----- | ----- | ----- |
| Policy Complexity | Sky blue | Regulatory burden, legislative barriers |
| Economic Friction | Emerald | Financial constraints, revenue model dependency |
| Technology Friction | Indigo | System fragmentation, interoperability gaps |
| Clinical Friction | Rose | Workflow disruption, clinical change resistance |
| Equity Friction | Violet | Structural inequities, access barriers |
| Operational Friction | Teal | Workforce constraints, capacity limits |

Each dimension has 4 scored inputs. Scoring bands: Low (0–33), Moderate (34–66), High (67–100).

---

### **Tool 8: Impact Simulation**

**URL:** /impact-simulation  
**File:** frontend/app/impact-simulation/page.tsx

**Sidebar:** Yes | **Header Tools:** Yes (under Simulators)

**What it is:** A planned scenario-based simulation engine for modeling the downstream impact of major strategic decisions. **Status: Coming Q4 2026 — not yet live.**

**How to access:** `Home Sidebar → Tools → Impact Simulation. Or: Header → Tools → Simulators → Impact Simulation.`

**Six scenario types defined in code (engine not yet live):**

1. Payment Model Transition  
2. Care Delivery Expansion  
3. Technology Implementation  
4. Workforce Strategy Change  
5. Equity Initiative Design  
6. State Policy Implementation

---

### **Tool 9: Multimedia**

**URL:** /multimedia  
**Files:** frontend/app/multimedia/page.tsx \+ MultimediaClientPage.tsx

**Sidebar:** Yes | **Header Tools:** Yes (listed in Research Lab block)

**What it is:** A media library — videos, webinars, reports, and visual content related to healthcare transformation topics. Not a calculator or simulator.

**How to access:** `Home Sidebar → Tools → Multimedia. Or: Header → Tools → Multimedia.`

---

### **Tool 10: Trending Topics**

**URL:** /trending-topics  
**Files:** frontend/app/trending-topics/page.tsx \+ TrendingTopicsClientPage.tsx

**Sidebar:** Yes | **Header Tools:** Yes (under Data & Signals)

**What it is:** A curated view of the most active/discussed healthcare policy and transformation topics, surfaced from platform activity, news, and editorial curation.

**How to access:** `Home Sidebar → Tools → Trending Topics. Or: Header → Tools → Data & Signals → Trending Topics. Also accessible from the Header Intelligence panel → Quick Access → Trending Topics.`

---

## **SECTION 3: THE RESEARCH LAB — OVERVIEW AND ARCHITECTURE**

### **3.1 What the Research Lab Is**

The Research Lab is the platform's analytical engine — a collection of 20 sophisticated, interactive tools organized across six thematic sections that map to the platform's six Pillars. Unlike the stand-alone tools in Section 2 (which are informational feeds, dashboards, or coming-soon simulators), the Research Lab tools are all **live, fully functional analytical instruments** with real calculations, formulas, scenario modeling, and outputs that can be used for research, planning, compliance, and strategy.

### **3.2 How to Access the Research Lab**

**Path 1 — Direct (fastest):** `Header → Tools → "Research Lab / All [N] Lab Tools" link in the third column of the Tools panel → lands on` /research-lab

**Path 2 — Via Sidebar Pillar:** `Home Sidebar → any Pillar (e.g., Economics) → scroll to Research Lab sub-items under that pillar → click any specific tool (e.g., "APM Design Lab")`

**Path 3 — Direct URL:** Navigate directly to /research-lab

**The hub page** (/research-lab) requires authentication (getUser() \+ roleAtLeast check). Once authenticated, it displays all tools organized by section. The ResearchLabHub.tsx client component handles tab navigation between sections and lazy-loads each tool with next/dynamic (Webpack chunk splitting for performance).

### **3.3 The Six Research Lab Sections**

Each section groups related tools and maps to a sidebar pillar:

| Section ID | Tab Label | Pillar | Tools Included |
| ----- | ----- | ----- | ----- |
| policy-quality | Policy & Quality | Policy \+ Clinical | Policy Simulator, Hospital Financial Stress Test, HTA Studio, Actuarial Lab, Clinical Quality Optimizer |
| payment-models | Payment Models | Economics | APM Design Lab, APM Calculator, CEA Calculator |
| interoperability | Interoperability & Risk | Technology \+ Clinical | FHIR Lab, Risk Stratification Engine |
| technology-ai | Technology & AI | Technology | AI Clinical Governance Lab, Digital Health Lab |
| population-equity | Population & Equity | Equity | Population Health Modeler, Health Equity Studio |
| knowledge-workspace | Knowledge & Operations | Operations \+ Policy | Transformation Scorecard, VBC Readiness Assessment, Evidence Library, Workforce Modeler, Innovation Leaderboard, Research Workspace |

### **3.4 Research Lab Tool Count**

The Research Lab contains **20 functional analytical tools**. Some marketing copy within the platform says "19" or "21" — the authoritative count from the code is 20 live tools across 6 sections.

---

## **SECTION 4: RESEARCH LAB — POLICY PILLAR TOOLS**

---

### **Tool 11: Policy Simulator**

**URL:** /research-lab/policy-quality?tab=policy  
**File:** frontend/components/research/PolicySimulator.tsx  
**Pillar:** Policy

**Sidebar access:** `Home Sidebar → Policy Pillar → Research Lab → Policy Simulator`

**What it is:** A multi-scenario policy modeling tool with four analytical modules covering Medicaid waiver design, global budget construction, Medicaid expansion analysis, and price transparency compliance.

**The four tabs:**

---

**Tab 1: 1115 Waiver Modeler**

A 1115 waiver is a federal mechanism (Section 1115 of the Social Security Act) that allows states to waive standard Medicaid rules and test new approaches, subject to CMS approval.

**State data available for modeling:**

* Vermont, New York, California, Texas, Ohio, Michigan  
* Each state has: enrolled lives, per-capita spending, FMAP rate, Medicaid as % of state budget, uninsured rate, population

**Waiver types modeled:**

| Waiver Type | Featured State | CMS Approval Probability | Risk Level |
| ----- | ----- | ----- | ----- |
| Global Commitment to Health | Vermont | 0.82 (82%) | High |
| DSRIP (Delivery System Reform Incentive Payment) | New York / New Jersey / Texas | 0.68 | Medium |
| Community Engagement Requirements | Multiple | 0.35 | Low |
| Expansion with Premium | Multiple | 0.55 | Medium |
| Managed Care | Multiple | 0.72 | Medium |
| Behavioral Health Integration | Multiple | 0.78 | Medium |
| Global Budget | Vermont / Maryland | 0.60 | Medium |

**What the approval probability means:** Based on historical CMS approval rates for each waiver category. Vermont's Global Commitment waiver has an 82% probability because Vermont has successfully maintained and renewed it since 2005\. Community Engagement Requirements have only 35% probability because courts have repeatedly struck them down as inconsistent with Medicaid's statutory purpose (Gresham v. Azar, 2020).

**Regulatory framework:**

* **Section 1115 of the Social Security Act (42 USC §1315):** Grants the HHS Secretary authority to waive Medicaid requirements for "experimental, pilot, or demonstration projects."  
* **FMAP (Federal Medical Assistance Percentage):** The federal matching rate. Vermont's FMAP is approximately 55–57% (federal pays \~55–57 cents per dollar of Medicaid spending). Higher FMAPs in poorer states (Mississippi \~77%).  
* **Budget neutrality requirement:** CMS requires 1115 waivers to cost no more than what Medicaid would have spent without the waiver. This is a critical constraint modeled in the tool.

---

**Tab 2: Global Budget Designer**

Models the construction of a hospital global budget — a fixed annual spending target for a hospital or health system regardless of volume.

**Key concept:** A global budget replaces fee-for-service payment with a prospective lump sum. The hospital receives the same payment regardless of whether it sees more or fewer patients — creating incentives for prevention and efficiency.

**Vermont-specific regulatory context:**

* **Vermont Act 68 (2025):** Mandates that non-Critical Access Hospitals participate in global budgets beginning FY2028. Critical Access Hospitals (CAHs) are exempt.  
* **Vermont AHEAD Model (Cohort 2):** CMS's all-payer model for Vermont that includes global budget components and an equity benchmark requirement. AHEAD \= Advancing All-Payer Health Equity Approaches and Development.  
* **GMCB (Green Mountain Care Board):** Vermont's independent regulatory body that sets hospital budgets, reviews rates, and oversees the AHEAD model implementation.

---

**Tab 3: Expansion Calculator**

Models the impact of Medicaid expansion in the 10 states that have not yet expanded Medicaid under the ACA.

**Non-expansion states in the model:** Includes states with their uninsured rates, coverage gap population, uncompensated care burden, and FMAP rates.

**What the "coverage gap" means:** In non-expansion states, adults with incomes above the state's traditional Medicaid limit but below 100% FPL fall into a "coverage gap" — they are too poor for ACA marketplace subsidies (which start at 100% FPL) but ineligible for Medicaid (which in non-expansion states may have a cutoff as low as 18–25% FPL for non-disabled adults).

**Regulatory framework:**

* **ACA Section 2001 (42 USC §1396a(a)(10)(A)(i)(VIII)):** The Medicaid expansion provision, covering adults up to 138% FPL  
* **NFIB v. Sebelius (2012):** Supreme Court made expansion optional for states  
* **Enhanced FMAP:** Under ARP (American Rescue Plan Act, 2021), states newly adopting expansion receive an additional 5 percentage point FMAP increase for the first 2 years  
* **90/10 matching:** For expansion population, federal government pays 90%, state pays 10% (vs standard FMAP for traditional population)

---

**Tab 4: Price Transparency**

Three sub-sections covering federal price transparency laws:

**Sub-section A: Hospital Price Transparency Compliance**

Models compliance with CMS Hospital Price Transparency rule (effective January 1, 2021, strengthened January 1, 2024).

**Regulatory basis:**

* **45 CFR §180:** CMS Hospital Price Transparency rule. Requires hospitals to post a machine-readable file of all standard charges (gross charges, payer-negotiated rates, de-identified minimums/maximums, cash-pay prices) for all items and services. Civil monetary penalties up to $110,000/year for large hospitals.

**Sub-section B: Site-Neutral Payment Impact**

Models the financial impact of CMS site-neutral payment policies, which pay the same rate for the same service regardless of whether it is delivered in a hospital outpatient department (HOPD) vs ambulatory surgical center (ASC) vs physician office.

**Services modeled:**

* Evaluation & Management (E\&M) visits  
* Echocardiogram  
* Physical/Occupational Therapy  
* Colonoscopy  
* Drug infusion  
* Lab work

**For each service, the tool shows:**

* HOPD rate (highest — hospital facility fee applies)  
* ASC rate (middle)  
* Office rate (lowest — no facility fee)  
* Dollar differential  
* Annual impact if volume shifts to lower-cost setting

**Regulatory basis:**

* **Bipartisan Budget Act of 2015 §603:** Established site-neutral payments for off-campus provider-based departments (PBDs) for new facilities  
* **OPPS (Outpatient Prospective Payment System):** CMS's payment system for hospital outpatient services  
* **CY2025 OPPS Final Rule:** Continued expansion of site-neutral policies

**Sub-section C: No Surprises Act Impact**

Models the financial impact of the No Surprises Act on hospital and physician revenue from balance billing.

**Regulatory basis:**

* **No Surprises Act (Division BB of the Consolidated Appropriations Act, 2021):** Effective January 1, 2022\. Bans out-of-network balance billing for:  
  * Emergency services at any facility  
  * Non-emergency services by out-of-network providers at in-network facilities (anesthesiology, radiology, pathology, EM, neonatology)  
  * Air ambulance services from out-of-network providers

**Specialties affected (modeled):**

* Emergency Medicine  
* Anesthesiology  
* Radiology  
* Pathology  
* Neonatology

**QPA (Qualifying Payment Amount):** The benchmark rate used to determine out-of-network payments under the NSA. Defined as the plan's median in-network contracted rate for the service in the geographic area (as of January 31, 2019, inflation-adjusted). Providers who disagree with QPA can initiate the Independent Dispute Resolution (IDR) process.

**IDR (Independent Dispute Resolution):** An arbitration process where an independent arbiter chooses between the plan's offer (typically near QPA) and the provider's offer. As of 2023-2024, over 490,000 disputes had been initiated — far more than CMS projected, creating a massive administrative burden. Arbiter selection and QPA calculation remain under active litigation.

---

### **Tool 12: Innovation Leaderboard**

**URL:** /research-lab/knowledge-workspace?tab=leaderboard  
**File:** frontend/components/research/InnovationLeaderboard.tsx  
**Pillar:** Policy (per sidebar) / Operations (per routing to knowledge-workspace)

**Sidebar access:** `Home Sidebar → Policy Pillar → Research Lab → Innovation Leaderboard`

**What it is:** A comparative benchmarking tool that ranks all 50 states, 30 major health systems, and 20 major payers on healthcare innovation and transformation performance across six domains.

**The three leaderboard tabs:**

**Tab 1: States (all 50\)**

Metrics per state:

* Composite innovation score (0–100)  
* Digital Maturity score  
* Value-Based Care score  
* SDOH/Equity score  
* Clinical Excellence score  
* Patient Experience score  
* Workforce Wellness score  
* Year-over-year change

**Top performers:** Massachusetts (85), Vermont (82), Minnesota (80)

**Lowest performers:** West Virginia (47), Mississippi (48), Alabama (49)

**Tab 2: Health Systems (30 organizations)**

Organizations ranked include:

Kaiser Permanente, Geisinger, Intermountain Health, University of Vermont Health Network, Atrium Health, Advocate Aurora, MaineHealth, Northwell Health, Dartmouth-Hitchcock, Mass General Brigham, Beth Israel Lahey Health, Providence, UPMC, Ochsner Health, Cleveland Clinic, ChristianaCare, Corewell/Spectrum, Banner Health, RWJBarnabas, Trinity Health, Mayo Clinic, Sanford Health, CommonSpirit, Ascension, Prisma Health, Bon Secours Mercy, Ballad Health, HCA Healthcare, Tenet Healthcare, Community Health Systems

Metrics: Digital maturity, revenue at risk, ACO/APM participation, quality performance, data analytics, patient engagement, trend direction.

**Tab 3: Payers (20 organizations)**

Organizations ranked include:

CMS/Medicare (90), Kaiser Foundation Health Plan (88), BCBS Massachusetts (AQC) (82), BCBS Vermont (78), Humana, CDPHP, BCBS Michigan (PGIP), UnitedHealthcare, CVS/Aetna, Point32Health, Priority Health Michigan, Cigna, Independence BCBS, Medicaid Average, Elevance/Anthem, BCBS Average, AmeriHealth Caritas, Molina Healthcare, Centene, WellCare

Metrics: Innovation score, APM payment percentage, APM model types, quality metrics, SDOH investment, data sharing, trend direction.

**Regulatory relevance:**

* NCQA accreditation standards (quality metrics)  
* CMS ACO/APM participation data  
* CMS Star ratings (payer quality)  
* AQC (Alternative Quality Contract — BCBS Massachusetts pioneering APM model)  
* PGIP (Physician Group Incentive Program — BCBS Michigan)

---

## **SECTION 5: RESEARCH LAB — ECONOMICS PILLAR TOOLS**

---

### **Tool 13: APM Design Lab**

**URL:** /research-lab/payment-models?tab=apm-design  
**File:** frontend/components/research/APMDesignLab.tsx  
**Pillar:** Economics

**Sidebar access:** `Home Sidebar → Economics Pillar → Research Lab → APM Design Lab`

**What it is:** A comprehensive alternative payment model (APM) architecture designer with four sub-tools: APM Architecture Designer, Episode Designer, Global Budget Simulator, and Benchmark Comparison. At 1,894 lines of code, it is one of the most complex tools in the platform.

**What an APM is:** An Alternative Payment Model is a payment approach that rewards healthcare providers for quality and cost efficiency rather than volume. APMs range from upside-only shared savings models to full two-sided risk arrangements where providers can gain or lose significant revenue.

**Tab 1: APM Architecture Designer**

Allows users to design a custom APM by selecting and configuring model components. The ViabilityBadge component evaluates whether a given combination of design choices is viable based on population size, risk arrangement, and administrative capacity.

Key design dimensions:

* Population type (attributed, enrolled, episode-based)  
* Risk arrangement (upside-only / two-sided / full risk)  
* Benchmark methodology (historical, national, regional, state-blended)  
* Shared savings rate  
* Quality measurement approach  
* Infrastructure requirements

**Tab 2: Episode Designer**

Designs episode-based payment models (bundled payments). The EPISODES catalog includes major clinical episodes (CABG, total knee arthroplasty, hip fracture, AMI, etc.) with the EPISODE\_SERVICES array defining what is included in each bundle window (typically 90 days pre-trigger through 90 days post-discharge).

**What an episode bundle is:** A bundled payment covers all services related to a clinical condition or procedure within a defined time window. Instead of paying each provider separately, a single payment is made to a "convener" who distributes funds. Savings are realized when total actual spending falls below the target price.

**Regulatory basis:**

* **BPCI-Advanced (Bundled Payments for Care Improvement Advanced):** CMS's current bundled payment model (voluntary, two-sided risk)  
* **CJR (Comprehensive Care for Joint Replacement):** CMS's mandatory bundled payment for hip and knee replacements (ended for most participants)  
* **OCM (Oncology Care Model):** Predecessor to the current Enhancing Oncology Model (EOM)

**Tab 3: Global Budget Simulator**

Simulates the construction and financial dynamics of a global budget arrangement for a hospital or health system.

**Key global budget concepts modeled:**

* **Budget cap:** The maximum spending allowed  
* **Trend factor:** Annual allowable growth rate (e.g., Vermont's GMCB uses a commercial benchmark tied to Vermont's All-Payer Model cap)  
* **Quality performance adjustments:** Budget adjusted up/down based on quality metrics  
* **Reconciliation methodology:** How actual spending is compared to budget at year end  
* **Carry-forward provisions:** Whether surplus/deficit rolls into the next year

**Tab 4: Benchmark Comparison**

The BENCHMARK\_METHODS array defines four approaches to setting payment benchmarks:

* **National benchmark:** Uses national average spending by service category  
* **Regional benchmark:** Uses spending patterns for the relevant census region  
* **State-blended benchmark:** Blends state-specific and national data  
* **Historical benchmark:** Uses the organization's own prior 3-year spending with trend adjustment

**Regulatory basis:**

* **MACRA (Medicare Access and CHIP Reauthorization Act of 2015):** Created the APM pathway and MIPS program. Qualifying APM Participants (QPs) in Advanced APMs are exempt from MIPS and receive a 5% APM Incentive Payment.  
* **Advanced APM criteria (42 CFR §414.1415):** An APM must use certified EHR technology, provide for payment based on quality measures, and bear more than nominal financial risk.

---

### **Tool 14: APM Shared Savings Calculator**

**URL:** /research-lab/payment-models?tab=apm-calc  
**File:** frontend/components/research/APMCalculator.tsx  
**Pillar:** Economics

**Sidebar access:** `Home Sidebar → Economics Pillar → Research Lab → Shared Savings Calculator`

**What it is:** A precise financial calculator for modeling shared savings and losses under major CMS alternative payment models, with Vermont-specific presets.

**The five APM models available:**

| Model | MSR | Sharing Rate | Loss Exposure | Quality Withhold | Gain Cap |
| ----- | ----- | ----- | ----- | ----- | ----- |
| MSSP Track 1 (Basic) | 2% | 50% | None (upside only) | 0% | 10% |
| MSSP Enhanced | 0% (no MSR) | 75% | 30% of losses | 2.5% | 15% |
| ACO REACH | 0% | 100% | Full risk | 5% | 100% |
| BPCI-Advanced | 0% | 100% (episode) | Full episode risk | 0% | 100% |
| Custom | Configurable | Configurable | Configurable | Configurable | Configurable |

**Explaining the key terms:**

* **MSR (Minimum Savings Rate):** The minimum percentage by which actual spending must fall below the benchmark before any shared savings are earned. MSSP Track 1 requires 2% savings before sharing begins; MSSP Enhanced has no MSR.  
* **Sharing Rate:** The percentage of gross savings that the ACO/provider keeps. MSSP Track 1: 50% (Medicare keeps 50%). MSSP Enhanced: 75%. ACO REACH: 100%.  
* **Quality Withhold:** A portion of shared savings held back unless quality thresholds are met. MSSP Enhanced withholds 2.5%. ACO REACH withholds 5%.  
* **Gain Cap:** Maximum shared savings payment as a percentage of benchmark. Prevents windfall gains.  
* **Loss Sharing:** In two-sided models, if spending exceeds benchmark, the ACO must repay a share. MSSP Enhanced: 30% loss sharing. ACO REACH: 100% (full downside risk).

**Vermont-specific presets:**

| Preset | Lives | Benchmark PMPM | Actual Spend | Quality Score | Admin PMPM |
| ----- | ----- | ----- | ----- | ----- | ----- |
| Vermont AHEAD Global Budget FY2028 | 52,000 | $1,040 | 96.5% | 88 | $22 |
| Vermont Blueprint ACO | 28,000 | $980 | 97.2% | 82 | $18 |
| Vermont Medicaid ACO | 185,000 | $620 | 98.1% | 78 | $12 |
| Small Rural Hospital CAH AHEAD (Act 68 Exempt) | 4,200 | $1,120 | 97.8% | 74 | $28 |

**All Calculations (step by step):**

Step 1: Annual Benchmark  
annualBenchmark \= attributedLives × benchmarkPMPM × 12

Step 2: Actual Spend  
actualSpend \= annualBenchmark × (actualSpendPct / 100\)

Step 3: Gross Savings  
grossSavings \= annualBenchmark − actualSpend

Step 4: Savings Rate  
savingsRate \= grossSavings / annualBenchmark

Step 5: Net Savings (apply MSR)  
netSavings \= (savingsRate ≥ MSR) ? grossSavings : 0

Step 6: Quality Multiplier  
qualityMultiplier \= (qualityScore ≥ 70\) ? 1.0 : (1 − qualityWithhold/100)

Step 7: Shared Savings (apply cap)  
rawSharedSavings \= netSavings × sharingRate × qualityMultiplier  
sharedSavings \= min(rawSharedSavings, capGainPct × annualBenchmark)

Step 8: Loss Payment (if two-sided and over benchmark)  
lossPayment \= (actualSpend \> annualBenchmark) ?   
  (actualSpend − annualBenchmark) × lossShareRate : 0

Step 9: Total Admin Cost  
totalAdminCost \= adminCostPMPM × attributedLives × 12

Step 10: Net Financial Position  
netPosition \= sharedSavings − lossPayment − totalAdminCost

Step 11: Break-Even Savings Rate  
breakEvenSavingsPct \= (adminCostPMPM × 12 / benchmarkPMPM) × 100

**Example calculation using Vermont AHEAD preset:**

* Lives: 52,000 | PMPM: $1,040 | Actual spend: 96.5% | Quality: 88 | Admin: $22  
* Annual benchmark: 52,000 × $1,040 × 12 \= **$648,960,000**  
* Actual spend: $648,960,000 × 0.965 \= **$626,246,400**  
* `Gross savings: $648,960,000 − $626,246,400 =` **$22,713,600**  
* Savings rate: $22,713,600 / $648,960,000 \= **3.5%**  
* `Quality multiplier: 88 ≥ 70, so 1.0`  
* Shared savings (AHEAD uses \~100% sharing for global budget): $22,713,600 × 1.0 × 1.0 \= **$22,713,600**  
* Admin cost: $22 × 52,000 × 12 \= **$13,728,000**  
* `Net position: $22,713,600 − $0 − $13,728,000 =` **$8,985,600 net gain**

**Regulatory framework:**

* **MSSP (Medicare Shared Savings Program):** 42 CFR §425. CMS's flagship ACO program. Basic track (upside only, 3-year agreement), Enhanced track (two-sided, 5-year agreement with higher sharing).  
* **ACO REACH (Realizing Equity, Access, and Community Health):** CMS Innovation Center model replacing Global and Professional Direct Contracting. Full risk, requires meaningful equity commitments.  
* **BPCI-Advanced:** CMS bundled payment model with 28 clinical episodes. Two-sided risk at the episode level.  
* **Vermont Act 68 (2025):** Mandates participation in the AHEAD global budget model for Vermont non-CAH hospitals starting FY2027–FY2028. The CAH preset is specifically noted as "Act 68 Exempt."  
* **Vermont AHEAD (All-Payer Health Equity Approaches and Development):** `CMS's 5-year model for Vermont (Cohort 2) targeting all-payer spending growth ≤Vermont's economy-wide growth, with mandatory equity benchmarks.`  
* **Vermont Blueprint ACO:** Vermont's long-running advanced primary care \+ ACO program.  
* **DVHA (Department of Vermont Health Access):** Vermont's Medicaid agency, administers the Medicaid ACO.

---

### **Tool 15: Cost-Effectiveness Analysis (CEA) Calculator**

**URL:** /research-lab/payment-models?tab=cea  
**File:** frontend/components/research/CEACalculator.tsx  
**Pillar:** Economics

**Sidebar access:** `Home Sidebar → Economics Pillar → Research Lab → CEA Calculator`

**What it is:** A health economics tool for calculating the cost-effectiveness of clinical interventions. It computes the Incremental Cost-Effectiveness Ratio (ICER) — the standard metric used by payers, HTA bodies, and policymakers to decide whether a treatment is "worth it."

**What ICER means:** ICER \= Incremental Cost ÷ Incremental Health Gain (in QALYs). It answers: "How much does it cost to gain one additional Quality-Adjusted Life Year with this treatment compared to the alternative?"

**What a QALY is:** A Quality-Adjusted Life Year combines quantity and quality of life. One QALY \= one year lived in perfect health. Half a year in perfect health \= 0.5 QALY. One year at 50% health quality \= 0.5 QALY. QALYs allow comparison across different diseases and treatments.

**The 12 condition presets available:**

| Preset | Condition | Cost/Patient | Efficacy | QALY Gain |
| ----- | ----- | ----- | ----- | ----- |
| T2DM Intensive Glycemic Control | Type 2 Diabetes | (preset values) | (%) | (QALY) |
| Heart Failure RPM | HF Remote Monitoring |  |  |  |
| COPD Pulmonary Rehab | COPD |  |  |  |
| Colorectal Cancer Screening | CRC Prevention |  |  |  |
| Hypertension Pharmacist | HTN Management |  |  |  |
| Depression Collaborative Care | Depression (CoCM) |  |  |  |
| OUD Medication-Assisted Treatment | Opioid Use Disorder |  |  |  |
| Breast Cancer Screening | BCS |  |  |  |
| Sepsis AI Early Warning | Sepsis Detection |  |  |  |
| Hospital at Home | HaH |  |  |  |
| Pharmacogenomics | Drug-Gene Testing |  |  |  |

**All inputs:**

* preset — selected condition (or custom)  
* costPerPatient — total intervention cost per patient ($)  
* efficacyRate — percentage of patients who respond/benefit (%)  
* qalyGain — QALYs gained per responding patient  
* populationSize — target population size  
* timeHorizonYears — years over which to model outcomes  
* discountRate — annual discount rate (standard: 3%)  
* comparatorCost — cost of the comparator (standard of care) per patient ($)

**All calculations:**

Responders \= populationSize × (efficacyRate / 100\)

Number Needed to Treat (NNT) \= 1 / (efficacyRate / 100\)

Total Intervention Cost \= costPerPatient × populationSize

Total Comparator Cost \= comparatorCost × populationSize

Incremental Cost \= Total Intervention Cost − Total Comparator Cost

Total QALYs Gained \= responders × qalyGain

Discount Factor (annuity) \= (1 − (1 \+ discountRate)^−timeHorizonYears) / discountRate

Discounted QALYs \= totalQALYs × (discountFactor / timeHorizonYears)

ICER \= Incremental Cost / Discounted QALYs

**Willingness-to-Pay (WTP) Thresholds — what they mean:**

| Threshold | Body | Meaning |
| ----- | ----- | ----- |
| $30,000/QALY | NICE (UK) | UK National Institute for Health and Care Excellence standard threshold |
| $100,000/QALY | ICER (standard) | US Institute for Clinical and Economic Review standard threshold |
| $150,000/QALY | ICER (high) | ICER upper range for treatments with significant unmet need |
| $200,000/QALY | CMS (informal) | CMS's informal benchmark for Medicare coverage decisions |

**ICER verdict interpretation:**

* `ICER < $30,000 → Highly cost-effective (dominant in most frameworks)`  
* `$30,000–$100,000 → Cost-effective (acceptable under most US and international standards)`  
* `$100,000–$150,000 → Borderline (requires further justification)`  
* `$150,000–$200,000 → Likely not cost-effective (may be acceptable for severe/rare conditions)`  
* `$200,000 → Not cost-effective (rarely covered without special justification)`

**Regulatory relevance:**

* ICER reports are used by PBMs, state Medicaid programs, and some commercial plans in coverage and formulary decisions  
* No federal law mandates use of ICER/QALY in Medicare (CMS is legally restricted from using QALY-based cost-effectiveness as a coverage criterion under ACA §1182)  
* The Inflation Reduction Act's drug price negotiation process uses ICER-adjacent methodology but is not formally QALY-based

---

### **Tool 16: Hospital Financial Stress Test**

**URL:** /research-lab/policy-quality?tab=scorecard  
**File:** frontend/components/research/HospitalFinancialScorecard.tsx  
**Pillar:** Economics

**Sidebar access:** `Home Sidebar → Economics Pillar → Research Lab → Hospital Financial Stress Test`

**What it is:** A financial modeling tool that assesses a hospital's financial health under baseline conditions and then stress-tests it against three policy shocks: Medicaid cuts, volume changes, and travel nurse cost increases.

**Vermont-specific presets:**

| Preset | Total Revenue | Total Expenses | Cash | Context |
| ----- | ----- | ----- | ----- | ----- |
| NVRH (North Country) | $48.2M | $47.6M | $5.8M | Small Vermont rural hospital |
| Gifford Medical Center | $58.5M | — | — | Vermont CAH |
| CVMC (Central Vermont) | $185M | — | — | Mid-size Vermont community hospital |
| Act 68 RBP Scenario FY2027 | — | — | — | `Reference-Based Pricing at Medicare +15%, −8% volume` |
| H.R. 1 Medicaid Cliff (Post-2030) | — | — | — | `−12% Medicaid revenue, −5% volume, +15% travel nurses` |

**Peer Benchmark Groups:**

| Hospital Type | Operating Margin | Days Cash on Hand | Debt Service Coverage | Current Ratio | Labor Cost % |
| ----- | ----- | ----- | ----- | ----- | ----- |
| Critical Access Hospital (CAH) | 0.8% | 45 days | 2.0× | 1.8× | 52% |
| Rural PPS | 1.2% | 58 days | 2.5× | 2.1× | 50% |
| Urban Community | 2.0% | 90 days | 3.2× | 2.4× | 48% |
| Urban Tertiary | 3.1% | 142 days | 4.0× | 2.8× | 45% |

**Stress test inputs (three sliders):**

* medicaidCutPct — % reduction in Medicaid payments (0–30%)  
* volumeChangePct `— % change in patient volume (−20% to +20%)`  
* travelNurseIncreasePct — % increase in travel nurse costs (0–100%)

**All stress-test calculations:**

Revenue Adjustment:  
revenueAdj \= totalRevenue   
  × (1 \+ volumeChange/100)   
  × (1 − medicaidCut/100 × 0.15)  
\[Note: 0.15 factor assumes Medicaid is \~15% of net revenue\]

Labor Adjustment:  
laborAdj \= laborCosts × (1 \+ travelNurseIncrease/100 × 0.12)  
\[Note: 0.12 factor assumes travel nurses are \~12% of labor spend\]

Days Cash on Hand:  
dailyExpense \= adjustedExpenses / 365  
dayCashOnHand \= cash / dailyExpense

Debt Service Coverage Ratio:  
DSCR \= (adjustedRevenue − adjustedExpenses \+ debtService) / debtService

Current Ratio:  
currentRatio \= currentAssets / currentLiabilities

Operating Margin:  
operatingMargin \= (adjustedRevenue − adjustedExpenses) / adjustedRevenue

**Metric scoring logic:**

For each metric, the tool assigns a strength rating by comparing the calculated value to the peer benchmark:

* **Strong:** `≥115% of benchmark`  
* **Adequate:** `≥85% of benchmark`  
* **Weak:** `≥60% of benchmark`  
* **Critical:** \<60% of benchmark

**Overall hospital health rating:**

* **Critical:** 2 or more metrics rated "Critical"  
* **Weak:** 1 Critical OR 2 Weak metrics  
* **Adequate / Strong:** Otherwise

**Regulatory context:**

* **Vermont Act 68 (2025):** `The RBP (Reference-Based Pricing) preset models the impact of Act 68's requirement that non-CAH hospitals accept Reference-Based Pricing at Medicare rates +15%. This eliminates the ability to negotiate higher commercial rates, compressing margins significantly (modeled as −8% volume as commercial payers redirect patients).`  
* **H.R. 1 "One Big Beautiful Bill" (2025 Congressional proposal):** `The most extreme stress test preset. Models $911B in proposed federal Medicaid cuts over 10 years, including per-capita caps and work requirements. The −12% Medicaid revenue shock reflects CMS actuarial estimates of the impact on safety-net hospitals.`  
* **GMCB (Green Mountain Care Board):** Vermont's hospital rate regulator. Its budget decisions directly affect the benchmark scenarios.  
* **CAH (Critical Access Hospital) designation:** Federal designation under Medicare Conditions of Participation (42 CFR §485.601–485.645). CAHs receive cost-based reimbursement from Medicare (101% of reasonable costs) rather than DRG-based PPS rates. This is why they are treated differently under Act 68\.  
* **AHA Annual Survey 2024 and Kaufman Hall Flash Reports:** The data sources for peer benchmarks.

---

### **Tool 17: HTA Studio (Health Technology Assessment)**

**URL:** /research-lab/policy-quality?tab=hta  
**File:** frontend/components/research/HTAStudio.tsx  
**Pillar:** Economics

**Sidebar access:** `Home Sidebar → Economics Pillar → Research Lab → HTA Studio`

**What it is:** A four-module health technology assessment platform covering Budget Impact Modeling, Multi-Criteria Decision Analysis, Probabilistic Sensitivity Analysis (Monte Carlo simulation), and Evidence Threshold Analysis.

**What HTA is:** Health Technology Assessment is the systematic evaluation of the clinical, economic, social, and ethical implications of adopting a health technology (drug, device, procedure, or diagnostic). HTA is used by HTA bodies (NICE in UK, ICER in US, HAS in France, G-BA in Germany), payers, and formulary committees to make coverage and reimbursement decisions.

---

**Tab 1: Budget Impact Model (BIM)**

Models the total budget impact on a payer or health system of adding a new treatment.

**8 condition options available**

**3 uptake scenarios:** Slow / Moderate / Rapid (5-year uptake curves showing year-by-year adoption rates)

**All inputs:**

* interventionName — name of the treatment being evaluated  
* condition — clinical indication  
* totalPopulation — total payer/system covered population  
* eligiblePct — percentage of population eligible for this treatment  
* socCost — standard of care (comparator) cost per patient per year  
* newCost — new treatment cost per patient per year  
* uptakeScenario — Slow / Moderate / Rapid  
* displacementPct — % of eligible patients who switch from SoC to new treatment  
* hospitalSavingsRate — reduction in hospitalization rate  
* hospitalSavingsReduction — cost per hospitalization avoided  
* hospitalSavingsCost — baseline hospitalization cost  
* edSavingsRate — reduction in ED visits  
* edSavingsReduction — cost per ED visit avoided  
* edSavingsCost — baseline ED visit cost  
* coveredLives — payer's total covered lives (for PMPM calculation)

**Calculations:**

Annual Treated Patients \= totalPopulation × eligiblePct% × uptake(year) × displacementPct%

Drug Cost Difference \= (newCost − socCost) × annualTreated

Hospital Offset Savings \= annualTreated × hospitalSavingsRate% × hospitalSavingsReduction% × hospitalSavingsCost

ED Offset Savings \= annualTreated × edSavingsRate% × edSavingsReduction% × edSavingsCost

Annual Net Cost \= drugCostDifference − hospitalOffsetSavings − edOffsetSavings

5-Year Cumulative Cost \= Σ(Year 1 through Year 5 net costs)

PMPM (Per Member Per Month) \= Annual Net Cost / (coveredLives × 12\)

---

**Tab 2: MCDA (Multi-Criteria Decision Analysis)**

Evaluates multiple treatment alternatives against multiple weighted criteria simultaneously — used when decisions involve trade-offs between cost, efficacy, safety, equity, and other factors.

**8 criteria available:** Clinical efficacy, Safety profile, Cost-effectiveness, Quality of life impact, Health equity considerations, Implementation feasibility, Evidence quality, Patient preference

Users assign weights to each criterion (must sum to 100%) and score each alternative (0–100) on each criterion. The tool computes a weighted composite score for each alternative.

**Formula:**

WeightedScore(alternative) \= Σ (criterion\_weight × criterion\_score) for all criteria

---

**Tab 3: Probabilistic Sensitivity Analysis (PSA) — Monte Carlo Simulation**

This is the most mathematically sophisticated component of the platform. It performs 1,000 Monte Carlo iterations to quantify uncertainty in cost-effectiveness estimates.

**What Monte Carlo simulation does here:** Instead of using single point estimates for cost and effectiveness, PSA assigns probability distributions to each parameter and randomly samples from those distributions 1,000 times. The result is a cloud of 1,000 ICER estimates that shows the full range of possible outcomes.

**Probability distributions implemented:**

| Distribution | Formula Used | Typical Use |
| ----- | ----- | ----- |
| Normal | Box-Muller transform: z \= √(−2ln(u₁)) × cos(2πu₂) | Costs, continuous outcomes |
| Beta | Via gamma ratio: Beta(α,β) \= Gamma(α) / (Gamma(α) \+ Gamma(β)) | Probabilities, rates (bounded 0–1) |
| Gamma | Marsaglia-Tsang method | Costs (always positive, right-skewed) |
| Log-Normal | exp(Normal(μ, σ)) | Ratios, costs (always positive) |

**CEAC (Cost-Effectiveness Acceptability Curve):** `Generated from PSA results. For each WTP threshold ($50K, $100K, $150K, $200K), the CEAC shows the probability that the intervention is cost-effective — calculated as the proportion of Monte Carlo iterations where ICER ≤ WTP threshold.`

**WTP thresholds for PSA:** $50,000 / $100,000 / $150,000 / $200,000

---

**Tab 4: Evidence Threshold Analysis**

Evaluates surrogate endpoints (intermediate clinical outcomes like HbA1c reduction, tumor shrinkage) and their validation status as proxies for final outcomes (mortality, quality of life).

**Surrogate endpoint validation levels:**

* **Validated:** Strong evidence that surrogate predicts final outcome  
* **Likely:** Good evidence but not definitive  
* **Uncertain:** Mixed or limited evidence  
* **Invalid:** Evidence suggests surrogate does not predict final outcome

**Regulatory context for HTA Studio:**

* **ICER (Institute for Clinical and Economic Review):** US-based HTA organization. Uses WTP thresholds of $100,000–$150,000/QALY. ICER reports influence formulary decisions by major PBMs and state Medicaid programs.  
* **NICE (UK National Institute for Health and Care Excellence):** Uses £20,000–£30,000/QALY (\~$25,000–$38,000). Mandatory for NHS coverage decisions.  
* **CMS Coverage with Evidence Development (CED):** CMS can require additional evidence collection for technologies with uncertain benefit — budget impact modeling is key to CED decisions.  
* **Inflation Reduction Act drug negotiation:** Uses a form of BIM and cost-effectiveness analysis in determining Maximum Fair Price. The tool's BIM tab directly simulates this analytical approach.

---

### **Tool 18: Actuarial Lab**

**URL:** /research-lab/policy-quality?tab=actuarial  
**File:** frontend/components/research/ActuarialLab.tsx  
**Pillar:** Economics

**Sidebar access:** `Home Sidebar → Economics Pillar → Research Lab → Actuarial Lab`

**What it is:** An insurance actuarial analysis platform covering four areas: ACA Actuarial Value calculation, Premium Rating, Adverse Selection modeling, and IRA Drug Pricing impact analysis.

---

**Tab 1: ACA Actuarial Value (AV) Calculator**

**What Actuarial Value is:** The percentage of total allowed costs that a health plan pays, on average, for a standard population. A plan with 80% AV pays 80 cents of every dollar of covered medical expenses; the enrollee pays 20 cents on average.

**ACA metal tier requirements (with de minimis tolerance of ±2%):**

* **Bronze:** 60% AV (acceptable range: 56–68% — wider due to HDHP/HSA variation)  
* **Silver:** 70% AV (acceptable range: 68–78%)  
* **Gold:** 80% AV (acceptable range: 78–88%)  
* **Platinum:** `90% AV (acceptable range: ≥88%)`  
* **Catastrophic:** Not subject to metal tier rules; available only to those under 30 or with hardship exemptions

**All inputs (13 variables):**

* deductible — individual medical deductible ($)  
* oopMax — out-of-pocket maximum ($, ACA limit 2026: $9,450 individual)  
* coinsurance — coinsurance after deductible (%)  
* pcpCopay — primary care copay ($)  
* specialistCopay — specialist copay ($)  
* erCopay — emergency room copay ($)  
* urgentCareCopay — urgent care copay ($)  
* genericDrugCopay — generic drug copay ($)  
* preferredBrandCopay — preferred brand copay ($)  
* nonPreferredBrandCopay — non-preferred brand copay ($)  
* specialtyDrugCoinsurance — specialty drug coinsurance (%)  
* drugDeductible — separate drug deductible ($)  
* csrTier — Cost-Sharing Reduction tier (None / 73% / 87% / 94%)

**AV Heuristic Formula (the estimation algorithm):**

Base AV \= 0.50 \+ (1 − oopMax/18200) × 0.30

Deductible adjustment: −4% per $1,000 of deductible

Drug deductible adjustment: −1% per $500 of drug deductible

Coinsurance adjustment: −10% per percentage point above 20% coinsurance  
  \[e.g., 30% coinsurance → −10% adjustment\]

Copay adjustments (vs reference copays):  
  `PCP: reference $25 → adjustment proportional to delta`  
  Specialist: reference $50  
  ER: reference $250  
  UC: reference $75  
  Generic: reference $10  
  Preferred Brand: reference $35  
  Non-Preferred Brand: reference $70  
  Specialty: reference 25% coinsurance

CSR adjustment:  
  73% CSR tier: no adjustment (this IS the base silver plan)  
  87% CSR tier: \+7.3% AV (silver enhanced for 150–200% FPL)  
  94% CSR tier: \+7.3% × 2 AV cap at 94% (silver enhanced for 100–150% FPL)

Clamp: min 0.45, max 0.97

PMPM impact \= (calculatedAV − 0.70) × $4.00/percentage point

**CSR (Cost-Sharing Reduction) regulatory context:**

* **ACA §1402 (42 USC §18071):** Requires insurers to reduce cost-sharing for silver plans for enrollees with incomes 100–250% FPL. Three enhanced silver tiers:  
  * 100–150% FPL: Plan AV increases to 94%  
  * 150–200% FPL: Plan AV increases to 87%  
  * 200–250% FPL: Plan AV increases to 73%  
* **CSR payment controversy:** Trump administration stopped federal CSR reimbursement to insurers in 2017\. Most states responded with "silver loading" — concentrating premium increases on silver plans, which also increased premium tax credit amounts. CSR payments remain a contested policy issue.

---

**Tab 2: Premium Rating Workbench**

Models how insurance premiums are calculated under ACA community rating rules.

**ACA rating restrictions (45 CFR §147.102):**

* Premiums may only vary by: age (3:1 ratio), tobacco use (1.5:1 ratio in most states), geography, and family/individual enrollment  
* Cannot vary by: health status, claims history, gender, occupation, or coverage duration

**Age rating factors used in the model (6 age bands, relative to 21-year-old \= 1.0):**

| Age Band | Factor |
| ----- | ----- |
| Under 21 | 0.635 |
| 21–25 | 0.800 |
| 26–34 | 1.000 (reference) |
| 35–44 | 1.278 |
| 45–54 | 1.786 |
| 55–64 | 3.000 (max 3:1 ratio) |

**All inputs:**

* State (50 states, affects geographic factor)  
* Plan type (HMO/PPO/EPO/POS)  
* Target MLR (Medical Loss Ratio) — default 85%  
* Expected claims PMPM  
* Admin load (%)  
* Profit margin (%)  
* Risk corridor adjustment  
* Tobacco surcharge (0–50%, max 1.5×)  
* Geographic factor  
* Median household income (affects risk pool characteristics)  
* Employer contribution % (for group markets)

**Premium calculation formula:**

Base Premium \= (expectedClaimsPMPM / targetMLR) × (1 \+ adminLoad%) × (1 \+ profitMargin%)  
Age-Adjusted Premium \= Base Premium × ageFactor  
Geography-Adjusted \= Age-Adjusted × geographicFactor  
Tobacco-Adjusted \= Geography-Adjusted × (1 \+ tobaccoSurcharge%)  
Final Premium \= Tobacco-Adjusted × riskCorridorAdjustment

**MLR (Medical Loss Ratio) regulatory context:**

* **ACA §2718 (45 CFR §158):** Requires insurers to spend at least 80% of premium revenue on medical claims and quality improvement (small group/individual market) or 85% (large group market). If MLR falls below threshold, insurers must issue rebates to policyholders.  
* In 2022 alone, insurers paid $1.1 billion in MLR rebates to approximately 8.8 million consumers.

---

**Tab 3: Adverse Selection Modeling**

Models the "death spiral" dynamic where sick people disproportionately enroll, raising premiums, causing healthy people to drop coverage, further raising premiums.

**Key inputs:**

* Initial insured rate in population (%)  
* Average health score (1–100, higher \= healthier)  
* Community rating toggle  
* Risk adjustment mechanism toggle  
* Year 1 premium increase  
* Exit rate per 10% premium increase  
* Individual mandate toggle  
* Risk corridors toggle  
* Reinsurance toggle  
* CSR payment status toggle

**Dynamic modeled:** Each year, if premiums increase by X%, exit rate % of previously insured drop coverage. Those who exit are disproportionately healthy. Average health score of remaining enrollees falls. Claims per enrollee rise. Premiums must rise further. Cycle repeats until market stabilizes or collapses.

**Regulatory stabilizers modeled:**

* **Individual mandate** (§5000A IRC — penalty zero since 2019 at federal level but some states have reinstated): Reduces adverse selection by requiring healthy people to enroll  
* **Risk adjustment** (45 CFR §153, Subpart G): Transfers funds from plans with healthier-than-average enrollees to plans with sicker-than-average enrollees — neutralizes selection incentives  
* **Risk corridors** (45 CFR §153.510): Three-year temporary program (2014–2016) where HHS shared gains/losses with insurers — largely defunded by Congress, subject to Supreme Court litigation (Maine Community Health Options v. United States, 2020 — Court ruled government owed $12B to insurers)  
* **Reinsurance** (45 CFR §153, Subpart E): Federal reinsurance program (2014–2016) covered 80% of individual claims between $45K and $250K — many states have since created state-based reinsurance programs (Alaska, Maine, Wisconsin, etc.) under §1332 innovation waivers

---

**Tab 4: IRA Drug Pricing Analysis**

Models the impact of the Inflation Reduction Act's drug pricing provisions on Medicare spending and beneficiary costs.

**The 10 IRA-negotiated drugs modeled:**

| Drug | Launch Price (2021) | Current List Price | MFP Reduction | Medicare Spending |
| ----- | ----- | ----- | ----- | ----- |
| Eliquis (apixaban) | $550/mo | $616/mo | `−48%` | $16.5B/yr |
| Jardiance (empagliflozin) | $590/mo | $631/mo | `−66%` | $7.1B/yr |
| Xarelto (rivaroxaban) | $490/mo | $534/mo | `−62%` | $6.0B/yr |
| Januvia (sitagliptin) | $497/mo | $548/mo | `−79%` | $4.1B/yr |
| Farxiga (dapagliflozin) | $563/mo | $612/mo | `−68%` | $3.3B/yr |
| Entresto (sacubitril/valsartan) | $571/mo | $621/mo | `−53%` | $2.9B/yr |
| Enbrel (etanercept) | $4,850/mo | $7,106/mo | `−67%` | $2.8B/yr |
| Imbruvica (ibrutinib) | $9,400/mo | $14,934/mo | `−38%` | $3.0B/yr |
| Stelara (ustekinumab) | $13,000/mo | $16,900/mo | `−66%` | $2.6B/yr |
| Insulin (multiple) | Varies | Varies | Capped $35/mo | $2.3B/yr |

**CPI inflation constant used:** CPI\_2021\_TO\_NOW \= 1.16 `(16% cumulative inflation 2021→2026)`

**Calculations:**

Current Real Price (inflation-adjusted) \= launchPrice2021 × CPI\_2021\_TO\_NOW  
MFP Savings per Patient \= currentListPrice × mfpReduction%  
Annual Medicare Savings \= mfpSavings × (MedicareSpending / currentListPrice × 12\)

**Regulatory framework:**

* **Inflation Reduction Act of 2022 (IRA), §§11001–11003:** Drug Price Negotiation Program for Medicare. HHS negotiates Maximum Fair Price (MFP) with manufacturers for high-spending drugs with no generic/biosimilar competition. First 10 drugs negotiated for CY2026, next 15 for CY2027, expanding annually.  
* **Part D Redesign (IRA §11201):** Restructured Medicare Part D cost-sharing: $0 for vaccines, $35 cap for insulin, $2,000 annual out-of-pocket cap (effective 2025), manufacturer discount in the catastrophic phase.  
* **Inflation Rebates (IRA §11101):** Drug manufacturers must pay rebates to Medicare if drug prices rise faster than inflation (CPI-U). This reversed the incentive structure that previously encouraged above-inflation price increases.  
* **Total projected savings:** $98.5 billion over 10 years according to CBO estimates (embedded in Evidence Library).  
* **Manufacturer litigation:** Multiple manufacturers (Bristol-Myers Squibb, Merck, Janssen, AstraZeneca) filed constitutional challenges arguing the negotiation program violates the First and Fifth Amendments. Courts have largely upheld the program.

---

## **SECTION 6: RESEARCH LAB — TECHNOLOGY PILLAR TOOLS**

---

### **Tool 19: FHIR Interoperability Lab**

**URL:** /research-lab/interoperability?tab=fhir  
**File:** frontend/components/research/FHIRLab.tsx  
**Pillar:** Technology

**Sidebar access:** `Home Sidebar → Technology Pillar → Research Lab → FHIR Interoperability Lab`

**What it is:** A five-tab technical laboratory for building, testing, and validating FHIR (Fast Healthcare Interoperability Resources) implementations. FHIR is the universal data exchange standard now federally mandated for healthcare.

**What FHIR is:** HL7 FHIR R4 (Release 4\) is the current generation of healthcare data exchange standard. It represents clinical data as "resources" (JSON or XML objects) accessible via RESTful APIs. FHIR enables any certified EHR or app to share patient data using a common, predictable format.

---

**Tab 1: FHIR Resource Builder**

Builds standards-compliant FHIR R4 JSON resources.

**8 resource types supported:**

* **Patient** — demographic and administrative data  
* **Observation** — lab results, vital signs, social history  
* **Condition** — diagnoses and problems  
* **Medication** — drug records  
* **Encounter** — visits and episodes  
* **CarePlan** — longitudinal care plans  
* **DiagnosticReport** — structured reports (radiology, pathology, lab panels)  
* **Bundle** — container for multiple resources (transaction, document)

**Required fields validated per resource (RESOURCE\_REQUIRED\_FIELDS):** Each resource type has mandatory fields (e.g., Patient requires id, name, birthDate; Observation requires code, status, subject).

**US Core Profile enforced:** The Patient builder references http://hl7.org/fhir/us/core/StructureDefinition/us-core-patient — the US Core Implementation Guide profile that ONC mandates for certified EHRs under the 21st Century Cures Act.

**LOINC codes built in (10 common vitals/labs):**

Blood pressure, heart rate, body weight, body temperature, oxygen saturation, hemoglobin A1c, fasting glucose, serum creatinine, LDL cholesterol, CBC (complete blood count).

---

**Tab 2: Terminology Mapper**

Maps clinical codes across 4 coding systems: ICD-10-CM (diagnoses), SNOMED CT (clinical concepts), LOINC (labs and observations), RxNorm (medications).

**15 hard-coded terminology mappings included:**

Examples:

* `ICD-10 E11.9 (Type 2 DM without complications) ↔ SNOMED CT 44054006 ↔ LOINC 4548-4 (HbA1c) ↔ RxNorm 860975 (Metformin)`  
* `ICD-10 I50.9 (Heart Failure) ↔ SNOMED CT 84114007 ↔ LOINC 33762-6 (BNP) ↔ RxNorm 203160 (Furosemide)`

**Canonical system URIs used:**

* ICD-10: http://hl7.org/fhir/sid/icd-10-cm  
* SNOMED CT: http://snomed.info/sct  
* LOINC: http://loinc.org  
* RxNorm: http://www.nlm.nih.gov/research/umls/rxnorm

---

**Tab 3: CDS Hooks Tester**

Tests Clinical Decision Support (CDS) Hooks integrations — the standard mechanism for embedding real-time clinical decision support into EHR workflows.

**4 hook types:** patient-view (fires when chart opens), order-select (fires when ordering), order-sign (fires when signing), appointment-book (fires when scheduling)

**4 clinical scenarios:**

1. **Drug Interaction Check** — fires on order-select when a potentially interacting medication is selected  
2. **Preventive Care Gap** — fires on patient-view when USPSTF-recommended screenings are overdue  
3. **High-Risk Patient Flag** — uses **LACE score** (Length of stay, Acuity, Comorbidities, ED visits in prior 6 months) to flag high readmission risk on patient-view  
4. **Prior Authorization Required** — flags Adalimumab (Humira) as requiring prior auth on order-sign

**Output:** Generates a complete CDS Hooks JSON request payload that can be sent to any CDS Hooks-compliant service endpoint.

---

**Tab 4: Prior Authorization Simulator**

Simulates the PA decision workflow using the X12 278 Health Care Services Review transaction standard.

**5 insurance plans modeled:** BCBS Vermont, MVP Health Care, VHAP (Vermont Health Access Plan), Humana Medicare Advantage, Cigna

**10 service codes modeled:**

| Code | Service | Notes |
| ----- | ----- | ----- |
| J0135 | Adalimumab (Humira) injection | High-cost biologic, almost always requires PA |
| 27447 | Total Knee Arthroplasty | Surgical procedure |
| 70553 | MRI Brain with/without contrast | Imaging |
| J0129 | Abatacept (Orencia) injection | Biologic for RA |
| 43239 | EGD with biopsy | Endoscopy |
| J9999 | Chemotherapy (unspecified) | Oncology |
| 90837 | Psychotherapy, 60 minutes | Mental health |
| J0600 | Eculizumab (Soliris) | Ultra-high-cost rare disease |
| 22612 | Lumbar Fusion | Spinal surgery |
| J2505 | Pegfilgrastim (Neulasta) | Colony-stimulating factor |

**Outcomes generated:** approved / denied / pended (with authorization number PA-2026-XXXXXX, 60-day appeal window)

**Regulatory framework:**

* **Consolidated Appropriations Act 2021 (CAA) / No Surprises Act PA provisions:** Requires plans to respond to PA requests within 72 hours (urgent) or 7 days (standard)  
* **CMS Prior Authorization Rule (CMS-0057-F, effective 2026):** Requires Medicare Advantage, Medicaid managed care, and QHP issuers to: implement FHIR APIs for PA, respond within 72 hours (urgent) / 7 days (standard), provide specific denial reasons, implement HL7 Da Vinci CRD/DTR/PAS implementation guides, and publicly report PA metrics annually  
* **X12 278 transaction:** The HIPAA-mandated EDI format for health care services review requests and responses

---

**Tab 5: Compliance Checker**

15-item interoperability compliance checklist scoring organizations on federal mandates.

**Items scored (with regulatory citations):**

| Item | Regulation |
| ----- | ----- |
| Information Blocking Rule | 21st Century Cures Act, 45 CFR §171 |
| Patient Access API | ONC §170.315(g)(10) |
| Provider Directory API | CMS Interoperability Rule §156.221 |
| Payer-to-Payer Exchange | CMS Interoperability Rule §156.221(b) |
| USCDI v3 | ONC HTI-1 Final Rule (2024) |
| FHIR R4 API | ONC §170.315(g)(10) |
| SMART on FHIR / OAuth 2.0 | ONC §170.315(g)(10) implementation spec |
| TEFCA Enrollment | ONC TEFCA Framework |
| Bulk FHIR Group/$export | ONC §170.315(b)(10) |
| Prior Auth API (Da Vinci CRD/DTR/PAS) | CMS-0057-F |
| X12 278 PA Transactions | HIPAA 45 CFR §162 |
| ONC HTI-1 AI/DSI Transparency | ONC HTI-1 Final Rule (45 CFR §170.315(b)(11)) |
| CMS Stars Data Sharing | CMS Star Ratings requirements |
| HIPAA Security Rule | 45 CFR §§164.302–164.318 |
| QHIN Participation | TEFCA/QHIN requirements |

**Score \= compliant items / 15 × 100\.** Generates a "ONC HTI-1 / 21st Century Cures Compliance Report" with specific recommendations for each failing item.

**Key regulatory framework:**

* **21st Century Cures Act (2016):** Prohibits information blocking, mandates patient access to electronic health information  
* **ONC Cures Final Rule (2020):** Implements 21st Century Cures requirements; requires certified EHRs to expose FHIR R4 APIs; defines 8 information blocking exceptions  
* **ONC HTI-1 Final Rule (2024):** Updates USCDI to v3, adds transparency requirements for AI-based clinical decision support (Predictive DSI attestations), expands FHIR implementation requirements  
* **CMS Interoperability and Prior Authorization Final Rule (CMS-0057-F, effective 2026):** PA API requirements, payer-to-payer exchange, PA decision timeframes and reporting  
* **TEFCA (Trusted Exchange Framework and Common Agreement):** ONC framework for nationwide health information exchange; QHINs (Qualified Health Information Networks) include CommonWell, Carequality (Epic), Sequoia Project  
* **HIPAA Security Rule (45 CFR §§164.302–318):** Administrative, physical, and technical safeguards for ePHI

---

### **Tool 20: AI Clinical Governance Lab**

**URL:** /research-lab/technology-ai?tab=ai  
**File:** frontend/components/research/AIAnalyticsLab.tsx  
**Pillar:** Technology

**Sidebar access:** `Home Sidebar → Technology Pillar → Research Lab → AI Clinical Governance Lab`

**What it is:** A four-tab platform for evaluating AI/ML clinical models, detecting algorithmic bias, building governance frameworks, and calculating AI ROI.

---

**Tab 1: Predictive Model Comparator**

Evaluates and compares clinical AI models across performance metrics.

**6 model types:** Logistic Regression, Random Forest, XGBoost, Neural Network, LSTM, Ensemble

**6 clinical prediction tasks:**

* 30-Day Readmission  
* ED Super-utilizer identification  
* Sepsis early warning  
* Fall risk  
* Medication non-adherence  
* Disease progression

**3 clinical presets:**

1. Sepsis XGBoost (AUC-ROC 0.87, Sensitivity 82%, Specificity 85%)  
2. Readmission Logistic Regression (AUC-ROC 0.71, Sensitivity 65%, Specificity 75%)  
3. Fall Risk Ensemble (AUC-ROC 0.79, Sensitivity 74%, Specificity 80%)

**Model configuration inputs:**

* aucRoc — Area Under ROC Curve (0–1, higher \= better discrimination)  
* sensitivity — True positive rate (% of actual positives correctly identified)  
* specificity — True negative rate (% of actual negatives correctly identified)  
* ppv — Positive Predictive Value (% of positive predictions that are actually positive)  
* calibration — How well predicted probabilities match actual event rates  
* sampleSize — Training/validation dataset size  
* populationSize — Deployment population size  
* prevalence — Event rate in deployment population  
* interventionCost — Cost of intervening on each alert ($)  
* benefitPerTP — Financial/clinical benefit per true positive ($)  
* alertFatigue — % of alerts ignored due to alert fatigue

**calcModelMetrics outputs:**

True Positives (TP) \= populationSize × prevalence × sensitivity  
False Positives (FP) \= populationSize × (1−prevalence) × (1−specificity)  
False Negatives (FN) \= populationSize × prevalence × (1−sensitivity)  
True Negatives (TN) \= populationSize × (1−prevalence) × specificity

Total Alerts \= TP \+ FP  
Alerts Acted On \= Total Alerts × (1 − alertFatigue%)  
Effective TP \= TP × (1 − alertFatigue%)  
Effective FP \= FP × (1 − alertFatigue%)

Net Benefit \= (effectiveTP × benefitPerTP) − (Alerts Acted On × interventionCost)

Alert Burden per Shift \= Total Alerts / (365 × 3\)  \[3 shifts/day\]

F1 Score \= 2 × (PPV × sensitivity) / (PPV \+ sensitivity)

**What these metrics mean for clinical use:**

* **High sensitivity, lower specificity:** Better for conditions where missing a case is catastrophic (sepsis). Generates more false alarms but catches more true cases.  
* **High specificity, lower sensitivity:** Better for high-cost interventions where false positives are expensive. Misses more cases but alerts are more trustworthy.  
* **Alert fatigue:** The most critical operational consideration. If clinicians receive too many alerts, they start ignoring them. A model with 80% AUC-ROC may perform worse in practice than one with 75% AUC-ROC if the 80% model generates 3× more alerts.

---

**Tab 2: Algorithmic Bias Detector**

Evaluates AI model performance across demographic subgroups to detect disparate impact.

**Demographic dimensions analyzed:**

* Race/ethnicity: White, Black/African American, Hispanic/Latino, Asian  
* Gender: Male, Female  
* Age: Under 65, Over 65

**Two bias metrics:**

**Demographic Parity:** The difference in positive prediction rates across groups. If a sepsis model predicts sepsis in 15% of White patients and 10% of Black patients (given similar actual sepsis rates), that is a demographic parity violation.

**Equal Opportunity:** The difference in True Positive Rates (sensitivity) across groups. If a readmission model identifies 80% of high-risk White patients correctly but only 65% of high-risk Black patients correctly, that is an equal opportunity violation.

**Verdict thresholds:**

* pass: \<5% difference across groups  
* warn: 5–10% difference  
* fail: \>10% difference

**Regulatory context:**

* **ONC HTI-1 Final Rule (2024) — Predictive DSI Transparency:** Certified EHR technology that incorporates AI-based predictive decision support must meet new transparency attestation requirements: developers must attest to what data was used for training, what populations the model was trained on, what fairness metrics were evaluated, and whether the model has been validated for health equity  
* **CMS Medicare Advantage Rule (2024):** MA plans using AI for prior authorization decisions must disclose the use of AI, allow human review, and not use AI to make coverage denials without clinical review  
* **FDA SaMD (Software as a Medical Device) regulation:** AI clinical decision support tools that "diagnose, treat, prevent, or mitigate" a disease are regulated as medical devices. FDA's AI/ML SaMD Action Plan (2021) introduced "Predetermined Change Control Plans" to allow continuous learning models to update without full re-approval

---

**Tab 3: AI Governance Framework Builder**

Builds a customized AI governance policy document across six domains.

**6 governance domains:**

1. AI Lifecycle Management (development, validation, deployment, monitoring)  
2. Health Equity and Bias Mitigation  
3. Transparency and Explainability  
4. Technical Risk Management  
5. Regulatory Compliance  
6. Operational Integration

**Governance templates available:**

* FDA SaMD Governance Framework  
* ONC HTI-1 DSI Transparency Compliance  
* CMS-Aligned MA Governance Framework  
* NIST AI Risk Management Framework (RMF)

---

**Tab 4: AI ROI Calculator**

Calculates return on investment for AI implementation, comparing two paths: **Build** (develop in-house) vs **Buy** (license vendor solution). Also models **AI Scribe** (ambient documentation) ROI separately.

**Key inputs for Build vs Buy:**

* Development/license cost  
* Implementation cost  
* Annual maintenance  
* FTE cost savings  
* Quality improvement value  
* Clinical outcome improvement value  
* Time horizon (years)

**Output:** NPV (Net Present Value) comparison, payback period, 5-year ROI %.

---

### **Tool 21: Digital Health Lab**

**URL:** /research-lab/technology-ai?tab=digital  
**File:** frontend/components/research/DigitalHealthLab.tsx  
**Pillar:** Technology

**Sidebar access:** `Home Sidebar → Technology Pillar → Research Lab → Digital Health Lab`

**What it is:** A four-tab platform for modeling the financial and clinical impact of digital health programs: RPM, telehealth, patient engagement, and EHR optimization.

---

**Tab 1: RPM (Remote Patient Monitoring) Calculator**

Calculates reimbursement and ROI for RPM programs.

**CMS CPT codes for RPM (with 2026 reimbursement rates):**

| CPT Code | Description | Medicare Rate |
| ----- | ----- | ----- |
| 99453 | RPM setup and patient education (one-time) | \~$19 |
| 99454 | Device supply/daily transmissions, 30-day period | \~$64/month |
| 99457 | RPM treatment management, first 20 minutes/month | \~$52/month |
| 99458 | RPM treatment management, additional 20 minutes/month | \~$42/month |

**Regulatory requirements for RPM billing:**

* Patient must have a chronic condition  
* Device must automatically upload data (no manual entry)  
* 99457 requires a minimum of 20 minutes of clinical staff time per month  
* 99453 can only be billed once per patient per device  
* Incident-to billing rules apply for non-physician clinical staff  
* **Telehealth/RPM extension:** The Consolidated Appropriations Act 2023 and subsequent legislation extended pandemic-era RPM flexibilities

**Conditions modeled:** Multiple chronic conditions with standard RPM protocols (hypertension, heart failure, diabetes, COPD, post-surgical, etc.)

**Calculations:**

Monthly Revenue per Patient \= 99454 \+ 99457 \+ (if 40+ min: 99458\)  
Annual Revenue per Patient \= Monthly Revenue × 12  
Program Revenue \= Annual Revenue × enrolled patients  
Program Cost \= device cost \+ staffing cost \+ platform cost  
Net ROI \= Program Revenue − Program Cost  
Cost per ED avoidance \= (baseline ED rate − RPM ED rate) × ED cost

---

**Tab 2: Telehealth Modeler**

Models telehealth revenue and margin across specialties and payer mixes.

**Specialties modeled** with in-person visit rate and overhead comparison:

Primary Care, Behavioral Health, Dermatology, Cardiology (follow-up), Neurology, Endocrinology, Rheumatology, Infectious Disease

**Payers modeled** with telehealth reimbursement parity assumptions:

Medicare, Medicaid (Vermont), Commercial (BCBS VT), Commercial (MVP), Medicaid Managed Care, Medicare Advantage

**Key regulatory context:**

* **Ryan Haight Act (21 USC §831):** Requires in-person evaluation before prescribing controlled substances via telehealth (with pandemic-era DEA exceptions under debate)  
* **Medicare telehealth parity:** COVID-19 PHE created temporary Medicare telehealth parity. The Consolidated Appropriations Act 2023 extended most provisions through December 2024; subsequent legislation continues some extensions  
* **Vermont telehealth law:** Vermont has enacted telehealth parity requiring commercial insurers to reimburse telehealth services at the same rate as in-person services for equivalent services

---

**Tab 3: Patient Engagement Comparison**

Compares patient engagement platforms on six dimensions using the PAM (Patient Activation Measure) framework.

**PAM Levels (4):**

* **Level 1:** Patient is passive, overwhelmed  
* **Level 2:** Patient lacks knowledge/confidence but beginning to engage  
* **Level 3:** Patient taking action but inconsistently  
* **Level 4:** Patient maintaining behaviors even under stress

Higher PAM levels correlate strongly with better outcomes and lower costs.

**6 engagement dimensions:** Communication channels, Care gap outreach, Chronic disease management, Preventive care, Medication adherence, SDOH screening

---

**Tab 4: EHR Optimization Calculator**

Models productivity and revenue recovery from EHR workflow optimization initiatives.

**12 clinical specialties** with EHR-specific workflow patterns.

**Intervention types:** Documentation templates, order sets, smart phrases, In-Basket optimization, ambient AI documentation, reminder automation.

---

## **SECTION 7: RESEARCH LAB — CLINICAL PILLAR TOOLS**

---

### **Tool 22: Risk Stratification Engine**

**URL:** /research-lab/interoperability?tab=risk  
**File:** frontend/components/research/RiskStratificationEngine.tsx  
**Pillar:** Clinical

**Sidebar access:** `Home Sidebar → Clinical Pillar → Research Lab → Risk Stratification Engine`

**What it is:** A four-tab clinical analytics engine for risk scoring, population segmentation, predictive model building, and comorbidity analysis. Centers on Medicare's Hierarchical Condition Category (HCC) risk adjustment system.

---

**Tab 1: HCC Risk Adjustment Calculator**

**What HCC risk adjustment is:** Medicare uses HCC v28 (Hierarchical Condition Categories, version 28\) to predict the expected cost of caring for a Medicare patient based on their diagnoses. Each HCC condition is assigned a Risk Adjustment Factor (RAF) score. The sum of all RAF scores for a patient (demographic \+ disease conditions) determines their expected relative cost. Patients with RAF \> 1.0 are expected to cost more than average; RAF \< 1.0 \= below average expected cost.

**Why RAF matters:** Medicare Advantage plans and ACOs are paid based on their patient population's average RAF score. A plan with sicker patients (higher RAF) receives higher capitation payments. This is meant to neutralize the incentive to avoid sick patients.

**20 HCC conditions modeled with their RAF scores (HCC v28):**

| HCC | Condition | RAF Score |
| ----- | ----- | ----- |
| HCC 18 | Diabetes with Chronic Complications | 0.302 |
| HCC 19 | Diabetes without Complication | 0.118 |
| HCC 85 | Congestive Heart Failure | 0.331 |
| HCC 86 | Acute Myocardial Infarction | 0.199 |
| HCC 108 | Vascular Disease with Complications | 0.388 |
| HCC 111 | Vascular Disease | 0.299 |
| HCC 134 | Dialysis Status / ESRD | 0.493 |
| HCC 136 | Renal Failure | 0.289 |
| HCC 8 | Metastatic Cancer | 2.659 |
| HCC 9 | Lung/Colorectal/Bladder/Urinary Cancers | 0.671 |
| HCC 10 | Lymphatic/Head/Neck/GI/Genitourinary Cancers | 0.595 |
| HCC 11 | Other Cancers | 0.341 |
| HCC 21 | Protein-Calorie Malnutrition | 0.388 |
| HCC 161 | Pressure Ulcer Stage 4 | 2.227 |
| HCC 162 | Pressure Ulcer Stage 3 | 0.721 |
| HCC 46 | Severe Mental Illness | 0.309 |
| HCC 54 | Drug/Alcohol Dependence | 0.329 |
| HCC 55 | Substance Use Disorder | 0.209 |
| HCC 72 | Spinal Cord Disorders/Injuries | 0.471 |
| HCC 96 | Specified Heart Arrhythmias | 0.272 |

**Demographic RAF factors (age/gender base rates):**

The demographic RAF varies by age band and gender, with higher values for older patients.

Example age band structure (approximated):

* Age 65–69 Female: \~0.35  
* Age 70–74 Male: \~0.45  
* Age 75–79: \~0.55  
* Age 80–84: \~0.65  
* Age 85+: \~0.80

**Total RAF Calculation:**

totalRAF \= demographicRAF \+ Σ (RAF score for each selected HCC condition)

**Monthly Payment Calculation:**

monthlyPayment \= totalRAF × $950 (base capitation rate)  
annualPayment \= monthlyPayment × 12

Note: $950 is the model's base capitation constant. Actual Medicare Advantage capitation rates vary by county and benchmark.

**Risk tier classification:**

* **Low Risk:** RAF \< 1.0  
* **Average Risk:** RAF 1.0–1.49  
* **High Risk:** RAF 1.5–2.49  
* **Very High Risk:** `RAF ≥ 2.5`

**Example calculation:**

Patient: 75-year-old male with CHF (HCC 85), Diabetes with complications (HCC 18), CKD (HCC 136):

* Demographic RAF: \~0.55  
* CHF: 0.331  
* Diabetes: 0.302  
* CKD: 0.289  
* Total RAF: 0.55 \+ 0.331 \+ 0.302 \+ 0.289 \= **1.472 (Average-High Risk)**  
* Monthly payment: 1.472 × $950 \= **$1,398.40/month**  
* Annual payment: **$16,780.80/year**

---

**Tab 2: Population Segmentation**

Assigns a modeled population to risk tiers and applies TIER\_COSTS (annual cost lookup per tier) to project total population cost.

Used for population health management planning, care management resource allocation, and APM financial modeling.

---

**Tab 3: Custom Risk Model Builder**

Allows users to build custom risk stratification models using clinical variables, assigned weights, and normalization functions.

**normalizeValue(raw, min, max):** Maps raw clinical values to a 0–100 normalized risk score. Used to combine disparate variables (e.g., HbA1c, blood pressure, utilization history) into a composite risk score.

---

**Tab 4: Comorbidity Visualizer**

**Two clinical comorbidity indices implemented:**

**Charlson Comorbidity Index:**

The Charlson index assigns weights to 17 conditions (range 1–6 points each). Conditions include: MI, CHF, PVD, Cerebrovascular disease, Dementia, COPD, Connective tissue disease, Peptic ulcer, Mild liver disease, Diabetes (with/without complications), Hemiplegia, Moderate/severe renal disease, Diabetes with end-organ damage, Solid tumor, Leukemia, Lymphoma, Moderate/severe liver disease, Metastatic cancer, AIDS.

**Charlson Survival Prediction:**

charlsonSurvival(score, age) \= f(score \+ age\_adjustment)

The 10-year survival probability decreases with increasing Charlson score. A score of 0 \= \~98% 10-year survival; score of 6+ \= substantially lower predicted survival.

**Elixhauser Comorbidity Index:**

The Elixhauser index uses approximately 30 conditions, each with ICD-10 code mappings, weighted for mortality and readmission prediction. Generally considered more comprehensive than Charlson for administrative data analysis.

**10×10 Comorbidity Co-Occurrence Matrix:**

CO\_OCCUR — a 10×10 matrix showing the likelihood that any two conditions occur together in a patient population. Used for care management targeting and bundle design.

**Regulatory context:**

* **CMS HCC v28:** The official risk adjustment model used in Medicare Advantage (Part C) and accountable care programs. CMS updates the model periodically; v28 introduced refined coding for diagnosis hierarchies.  
* **RADV (Risk Adjustment Data Validation):** CMS audits Medicare Advantage plans to verify that HCC codes are supported by medical records. RADV audits have resulted in large repayments to CMS.  
* **Three-way risk corridor in AHEAD:** Vermont AHEAD uses a modified risk adjustment approach for the all-payer context.

---

### **Tool 23: Clinical Quality Optimizer**

**URL:** /research-lab/policy-quality?tab=quality  
**File:** frontend/components/research/ClinicalQualityOptimizer.tsx  
**Pillar:** Clinical

**Sidebar access:** `Home Sidebar → Clinical Pillar → Research Lab → Clinical Quality Optimizer`

**What it is:** A four-tab quality measurement and optimization platform covering HEDIS, CMS Star Ratings, QPP/MIPS, and Pay-for-Performance programs.

---

**Tab 1: HEDIS Optimizer**

**What HEDIS is:** Healthcare Effectiveness Data and Information Set — the standard quality measurement framework developed by NCQA (National Committee for Quality Assurance). Over 200+ measures covering preventive care, chronic disease management, and behavioral health. Most commercial and Medicaid managed care plans are required to report HEDIS measures; CMS uses adapted HEDIS measures in Star Ratings.

**15 HEDIS measures modeled:**

| Measure ID | Full Name | Domain | NCQA p50 | NCQA p90 |
| ----- | ----- | ----- | ----- | ----- |
| CDC | HbA1c Control for Patients with Diabetes | Chronic Care | 68% | 82% |
| COL | Colorectal Cancer Screening | Prevention | 65% | 78% |
| BCS | Breast Cancer Screening | Prevention | 71% | 84% |
| CBP | Controlling High Blood Pressure | Chronic Care | 58% | 74% |
| WCC | Weight Assessment and Counseling (Pediatric BMI) | Prevention | 72% | 89% |
| DSF | Depression Screening and Follow-Up | Behavioral Health | 62% | 78% |
| PNC | Prenatal and Postpartum Care | Maternal | 74% | 88% |
| MAH | Medication Adherence for Hypertension | Chronic Care | 79% | 91% |
| FUH | Follow-Up After Hospitalization for Mental Illness (7-day) | Behavioral Health | 38% | 58% |
| AMM | Antidepressant Medication Management | Behavioral Health | 54% | 70% |
| W34 | Well-Child Visits (3–6 years) | Prevention | 69% | 83% |
| IMA | Immunizations for Adolescents | Prevention | 55% | 74% |
| SNP | Care Transitions for SNP Enrollees | Care Coordination | 60% | 76% |
| AAP | Access to Preventive/Ambulatory Health Services | Access | 77% | 91% |
| MHU | Mental Health Utilization | Behavioral Health | 16% | 28% |

**HEDIS Star conversion:**

hedisStars(currentRate, p50, p90):  
  if currentRate ≥ p90: 5 stars  
  if currentRate ≥ (p50 \+ p90)/2: 4 stars  
  if currentRate ≥ p50: 3 stars  
  if currentRate ≥ p50 × 0.75: 2 stars  
  else: 1 star

Each measure also has strategies\[\] — evidence-based improvement tactics (care gaps outreach, clinical protocols, care management, etc.).

---

**Tab 2: CMS Star Ratings Optimizer**

**What CMS Stars are:** The CMS 5-star quality rating system for Medicare Advantage plans and Part D drug plans. Ratings drive: (1) quality bonus payments (+5% revenue for 4+ star plans), (2) enrollment marketing rights (5-star plans can enroll year-round), (3) public consumer information. Plans with \<3 stars for 3 consecutive years face contract termination.

**4 Star Rating domains modeled:**

1. Staying Healthy (preventive care, screenings)  
2. Managing Chronic Conditions  
3. Member Experience / CAHPS (Consumer Assessment of Healthcare Providers and Systems)  
4. Customer Service / Appeals

**\~32 sub-measures**, each with cut points defining \[2★, 3★, 4★, 5★\] thresholds.

**Stars calculation:**

starsFromCutPoints(value, \[c2, c3, c4, c5\], invert):  
  if invert (lower \= better, e.g., complaints rate):  
    if value ≤ c5: 5 stars  
    elif value ≤ c4: 4 stars  
    ... etc.  
  else (higher \= better):  
    if value ≥ c5: 5 stars  
    elif value ≥ c4: 4 stars  
    ... etc.

**Financial impact of Star Ratings:**

* 4+ star plans receive a Quality Bonus Payment (QBP) — currently 5% above base capitation rates  
* For a MA plan with 100,000 members at $1,000 PMPM average: 5% QBP \= $60M additional annual revenue  
* 5-star status: year-round enrollment window (significant competitive advantage)

---

**Tab 3: QPP/MIPS Optimizer**

**What MIPS is:** Merit-based Incentive Payment System — one of two tracks under MACRA (Medicare Access and CHIP Reauthorization Act of 2015). Clinicians who see Medicare patients and exceed volume thresholds must participate in MIPS or an Advanced APM.

**MIPS composite score composition (out of 100 points):**

| Category | Weight | What It Measures |
| ----- | ----- | ----- |
| Quality | 30% | Performance on 6+ quality measures |
| Promoting Interoperability (PI) | 25% | EHR use, e-prescribing, health information exchange |
| Improvement Activities (IA) | 15% | Care coordination, patient safety, access activities |
| Cost | 30% | Medicare spending per beneficiary, episode costs |

**Payment adjustments based on MIPS score (CY2026):**

* `Score ≥ 75: Positive adjustment (+)`  
* Score 45–74: Neutral  
* `Score < 45: Negative adjustment (−)`  
* `Exceptional performance (≥89): Additional bonus payment`

**APM Track:**

* **Qualifying APM Participants (QPs):** Clinicians in Advanced APMs (MSSP Enhanced, ACO REACH, certain BPCI arrangements) who meet threshold criteria are **exempt from MIPS** and receive a **5% APM Incentive Payment** instead  
* **APM threshold criteria (CY2026):** `≥50% of Medicare patients through Advanced APM, OR ≥35% of all patients through Advanced APM`

**MIPS quality measures in the model:** Includes measures from multiple clinical domains, allowing users to select their measure set and project their composite MIPS score.

**PI (Promoting Interoperability) measures:**

* e-Prescribing  
* Query of Prescription Drug Monitoring Program (PDMP)  
* Health Information Exchange  
* Provider-to-Patient Exchange  
* Immunization Registry Reporting  
* Syndromic Surveillance Reporting

---

**Tab 4: Pay-for-Performance Calculator**

Models financial incentives/penalties under commercial and Medicaid P4P programs.

**Formula:**

P4P Bonus \= baseBonus × (actualRate − baselineRate) × enrolledMembers / 100

Where baseBonus is the incentive payment per 1% improvement per 1,000 members.

**Regulatory context:**

* **MACRA (Pub.L. 114-10):** The statute creating MIPS and the APM pathway, signed April 2015  
* **NCQA accreditation:** Plans must report HEDIS measures for NCQA accreditation; NCQA accreditation is required for most state Medicaid managed care contracts  
* **CMS Star Ratings (42 CFR §422.162):** Quality bonus payment structure for MA plans  
* **Vermont AHEAD equity stratification requirement:** By FY2027, Vermont hospitals in AHEAD must stratify HEDIS measures by race/ethnicity — embedded as a milestone in the Transformation Scorecard tool

---

### **Tool 24: Workforce Modeler**

**URL:** /research-lab/knowledge-workspace?tab=workforce  
**File:** frontend/components/research/WorkforceModeler.tsx  
**Pillar:** Clinical (per sidebar) / Operations (per routing)

**Sidebar access:** `Home Sidebar → Clinical Pillar → Research Lab → Workforce Modeler`

**What it is:** A four-tab healthcare workforce planning tool covering physician supply/demand, nurse staffing ratio analysis, turnover cost calculation, and rural workforce strategy.

---

**Tab 1: Physician Supply/Demand Modeler**

**12 specialties with baseline data:**

| Specialty | Current FTE | Annual Grads | Retirement Rate | IMG % | Demand/Provider |
| ----- | ----- | ----- | ----- | ----- | ----- |
| Family Medicine | (default) | (default) | (default) | \~25% | (default) |
| Internal Medicine |  |  |  | \~40% |  |
| General Surgery |  |  |  | \~15% |  |
| Orthopedics |  |  |  | \~10% |  |
| Cardiology |  |  |  | \~15% |  |
| Psychiatry |  |  |  | \~30% |  |
| Emergency Medicine |  |  |  | \~20% |  |
| OB/GYN |  |  |  | \~20% |  |
| Pediatrics |  |  |  | \~25% |  |
| Oncology |  |  |  | \~10% |  |
| Neurology |  |  |  | \~15% |  |
| Radiology |  |  |  | \~15% |  |

**Geographic scope multipliers:** Applied to scale national estimates to Northeast, Southeast, Midwest, West, Rural, Urban.

**Supply model:**

Year N Supply \= Year (N−1) Supply \+ newGrads − retirements \+ IMG\_inflow

**Demand model:**

Year N Demand \= populationGrowth × ageAdjustment × utilizationTrend

**`Gap = Supply − Demand`** (negative \= shortage)

**Regulatory context:**

* **HRSA (Health Resources and Services Administration):** Publishes annual supply/demand projections by specialty  
* **HPSA (Health Professional Shortage Areas):** Federal designation (42 USC §254e) for areas with inadequate primary care, dental, or mental health providers. HPSA designation triggers NHSC eligibility and J-1 visa waiver.  
* **J-1 Visa Waiver:** Allows international medical graduates (IMGs) on J-1 exchange visitor visas to remain in the US if they commit to 3 years of practice in a HPSA or MUA (Medically Underserved Area) — primary workforce tool for rural/underserved area physician recruitment

---

**Tab 2: Nurse Staffing Ratio Analyzer**

Models financial and clinical impact of nurse staffing ratio mandates.

**7 unit types with current vs mandated ratios:**

| Unit | Current Ratio (pts/nurse) | California-Style Mandated Ratio |
| ----- | ----- | ----- |
| ICU | 2.5 | 2:1 |
| Med/Surg | 5.5 | 4:1 (or 5:1 phased) |
| Emergency Dept | 4.5 | 4:1 |
| Labor & Delivery | 2.2 | 2:1 |
| Pediatrics | 4.0 | 4:1 |
| Telemetry | 5.0 | 4:1 |
| Behavioral Health | 6.5 | 6:1 |

**For each unit:**

* census — average daily census  
* currentFTE — current nursing FTE  
* salary — average RN salary  
* agencyProportion — % of nursing filled by agency/travel nurses

**Calculations:**

Required FTE \= (census / mandatedRatio) × (1/occupancy) × (shift coverage factor)

FTE Gap \= Required FTE − Current FTE

Additional Cost \= FTE Gap × (salary × 1.25 for agency/benefits overhead)

Agency Cost Premium \= currentFTE × agencyProportion × salary × agencyPremium%

**Regulatory context:**

* **California AB 394 (1999) / Title 22 CCR §70217:** The only US state with legislated minimum nurse-to-patient staffing ratios. Ratios vary by unit type.  
* **Massachusetts Question 1 (2018):** Ballot initiative for nurse staffing ratios — defeated. Massachusetts eventually passed a nurse staffing law through legislation.  
* **Federal safe staffing proposals:** The Nurse Staffing Standards for Hospital Patient Safety and Quality Care Act has been introduced multiple times in Congress but not enacted.  
* **Vermont:** No mandatory staffing ratio law, but AHEAD model includes workforce wellness metrics (RN turnover, burnout index) as monitored outcomes.

---

**Tab 3: Turnover Cost Calculator**

**5 role types with default parameters:**

| Role | Turnover Rate | Annual Salary | Recruit Cost | Onboard Cost | Vacancy Days | Agency Premium |
| ----- | ----- | ----- | ----- | ----- | ----- | ----- |
| RN (Registered Nurse) | 22% | $78,000 | $8,000 | $12,000 | 90 days | 50% above salary |
| Physician | 6% | $285,000 | $50,000 | $25,000 | 180 days | N/A |
| APP (Advanced Practice Provider) | 14% | $125,000 | $20,000 | $15,000 | 120 days | 30% above salary |
| Tech/Allied Health | 28% | $55,000 | $5,000 | $6,000 | 60 days | 40% above salary |
| Clinical Support | 32% | $42,000 | $3,500 | $4,500 | 45 days | 35% above salary |

**Turnover cost formula:**

Cost per Turnover \= recruitCost \+ onboardCost \+ (dailySalary × vacancyDays × agencyFillRate)

Total Annual Turnover Cost \= (FTE × turnoverRate%) × cost per turnover

**7 retention programs with cost and effectiveness:**

| Program | Annual Cost/Employee | Turnover Reduction |
| ----- | ----- | ----- |
| Loan Repayment | $8,000–$15,000 | 15–25% |
| Sign-on Bonus | $5,000–$30,000 (one-time) | 10–15% |
| Flexible Scheduling | $2,000 (productivity cost) | 20–30% |
| Employer Childcare | $4,000–$8,000 | 12–18% |
| Mental Health EAP | $1,200 | 8–12% |
| Career Advancement Pathways | $3,000–$6,000 | 15–22% |
| 5% Wage Increase | 5% of salary | 18–25% |

---

**Tab 4: Rural Workforce Strategy Modeler**

**10 states with rural health data:**

| State | Rural % | Primary Care/10k | Mental Health/100k | OBGYN/100k | Hospital Closures | HPSA Count |
| ----- | ----- | ----- | ----- | ----- | ----- | ----- |
| Vermont | 61% | 13.2 | 18.5 | 8.2 | 0 | 12 |
| Mississippi | 51% | 7.8 | 6.2 | 4.1 | 8 | 94 |
| Montana | 55% | 9.1 | 8.8 | 3.5 | 3 | 45 |
| West Virginia | 48% | 8.3 | 7.1 | 3.8 | 5 | 67 |
| North Dakota | 41% | 10.2 | 9.1 | 4.2 | 2 | 28 |
| Kentucky | 43% | 8.9 | 7.5 | 4.5 | 6 | 78 |
| Texas | 15% | 9.5 | 8.2 | 5.8 | 24 | 156 |
| California | 5% | 11.2 | 12.5 | 7.8 | 12 | 189 |
| Maine | 62% | 12.1 | 10.2 | 5.5 | 1 | 34 |
| Alabama | 44% | 8.1 | 6.8 | 4.0 | 7 | 82 |

**Rural intervention options:**

* J-1 Visa Waiver Slots (federal: 30 slots/state/year; can be supplemented by Conrad 30 waiver)  
* NHSC (National Health Service Corps) — loan repayment $50,000–$130,000 for 2-year commitment  
* State Loan Repayment Program — typically \~$30,000  
* Loan repayment incentives, rural residency programs, telehealth hub-and-spoke models

**Regulatory context:**

* **NHSC (National Health Service Corps):** 42 USC §254d. Provides loan repayment ($50K–$130K) and scholarships for clinicians committing to serve in HPSA-designated areas. Administered by HRSA.  
* **J-1 Visa Waiver (Conrad 30):** 8 USC §1184(l). Each state can sponsor up to 30 J-1 waivers annually for IMGs who agree to serve in HPSAs. Many states have augmented this with state-funded waivers.  
* **Title VIII Nursing Workforce Development Act (42 USC §§296–298):** Federal funding for nursing education, advanced practice nursing, and workforce diversity. Administered by HRSA Bureau of Health Workforce.  
* **Rural Health Clinic (RHC) program:** 42 USC §1395x(aa). Federally-certified clinics in rural HPSAs receive cost-based Medicare/Medicaid reimbursement.  
* **FQHC (Federally Qualified Health Center):** Section 330 of the Public Health Service Act. Cost-based reimbursement, sliding-scale fees, mandatory comprehensive services.

---

## **SECTION 8: RESEARCH LAB — EQUITY PILLAR TOOLS**

---

### **Tool 25: Population Health Modeler**

**URL:** /research-lab/population-equity?tab=population  
**File:** frontend/components/research/PopulationHealthModeler.tsx  
**Pillar:** Equity

**Sidebar access:** `Home Sidebar → Equity Pillar → Research Lab → Population Health Modeler`

**What it is:** A four-tab mathematical modeling platform covering chronic disease Markov modeling, preventable utilization analysis, intervention impact simulation, and SIR epidemic modeling.

---

**Tab 1: Chronic Disease Markov Model**

**What a Markov model is:** A mathematical model where a patient can be in one of several discrete health states, and each year (or cycle) transitions between states with fixed probabilities. The model tracks what happens to a cohort of patients over time as they move through health states.

**5 diseases modeled, each with 5 states:**

**Diabetes:**

* `Pre-diabetes → Type 2 Controlled → Type 2 Uncontrolled → Complications (neuropathy/nephropathy/retinopathy) → End-stage (ESRD/blindness/amputation)`

**Heart Failure (NYHA classification):**

* `NYHA Class I (no symptoms) → Class II (mild) → Class III (moderate) → Class IV (severe) → Transplant/LVAD/Death`

**COPD (GOLD classification):**

* `GOLD 1 (mild, FEV1 ≥80%) → GOLD 2 (moderate) → GOLD 3 (severe) → GOLD 4 (very severe) → Respiratory Failure`

**CKD (kidney disease stages):**

* `CKD 1–2 (mild, GFR ≥60) → CKD 3 (GFR 30–59) → CKD 4 (GFR 15–29) → CKD 5 (GFR <15) → ESRD (dialysis or transplant)`

**Annual costs per CKD state:**

* CKD 1–2: \~$8,500/year  
* CKD 3: \~$14,200/year  
* CKD 4: \~$22,800/year  
* CKD 5: \~$38,000/year  
* ESRD (dialysis): \~$92,000/year

**QoL utilities per CKD state:** 0.87 / 0.78 / 0.68 / 0.52 / 0.38

**Depression (PHQ-9 severity tiers):**

* `Minimal/None (PHQ <5) → Mild (PHQ 5–9) → Moderate (PHQ 10–14) → Severe (PHQ 15–19) → Treatment-Resistant (PHQ ≥20 despite adequate trials)`

**Annual costs per Depression state:**

* Minimal: \~$2,100/year  
* Mild: \~$4,800/year  
* Moderate: \~$9,200/year  
* Severe: \~$18,500/year  
* Treatment-Resistant: \~$42,000/year (includes ECT, TMS, esketamine, inpatient)

**QoL utilities per Depression state:** 0.95 / 0.82 / 0.65 / 0.42 / 0.28

---

**How the Markov model runs (runMarkov function):**

Inputs:  
  initialDist — starting distribution of cohort across 5 states (must sum to 1.0)  
  transitions — 5×5 annual transition probability matrix  
  years — number of years to simulate  
  efficacy — intervention efficacy (0–1)  
  applyIntervention — boolean

Each year:  
  newDist\[j\] \= Σ currentDist\[i\] × transitions\[i\]\[j\] for all i

If applyIntervention \= true:  
  Forward (worsening) transition probabilities are reduced by efficacy factor  
  Probability mass is redistributed back to "stay in current state"  
  i.e., transitions\[i\]\[i\] \+= (1 − efficacy) × transitions\[i\]\[j\] for j \> i

History array stores state distribution for every year

**calcCostQaly function:**

For each year t and each state s:  
  cohortInState \= history\[t\]\[s\] × cohortSize  
  annualCost \+= cohortInState × states\[s\].annualCost  
  annualQALYs \+= cohortInState × states\[s\].qolUtility

totalCost \= Σ annualCost over all years  
totalQALYs \= Σ annualQALYs over all years

**Regulatory context for Markov modeling:**

* ICER and NICE both require Markov or similar state-transition models for submissions involving chronic progressive diseases  
* CMS Coverage with Evidence Development (CED) decisions for chronic disease interventions typically require submitted Markov-based cost-effectiveness models  
* Vermont AHEAD uses disease progression modeling (analogous to Markov) for total cost of care projections across the attributed population

---

**Tab 2: Preventable Utilization Analyzer**

Models the volume and cost of potentially preventable hospitalizations and ED visits across a population, using AHRQ Prevention Quality Indicators (PQIs) and ED utilization patterns.

**What PQIs are:** Prevention Quality Indicators are standardized measures developed by AHRQ (Agency for Healthcare Research and Quality) that identify hospitalizations that might have been avoided with timely and effective outpatient care. High PQI rates signal gaps in primary care access and chronic disease management.

**PQI conditions modeled:**

* Diabetes short-term complications (PQI 01\)  
* Chronic obstructive pulmonary disease (PQI 05\)  
* Hypertension (PQI 07\)  
* Heart failure (PQI 08\)  
* Dehydration (PQI 10\)  
* Bacterial pneumonia (PQI 11\)  
* Urinary tract infection (PQI 12\)  
* Angina without procedure (PQI 13\)  
* Uncontrolled diabetes (PQI 14\)  
* Asthma in younger adults (PQI 15\)

**Calculations:**

Preventable Hospitalizations \= population × PQI\_rate/100,000

Preventable Cost \= preventable\_hospitalizations × avg\_cost\_per\_admission

Preventable ED Visits \= population × ED\_rate/100,000

ED Cost \= preventable\_ED × avg\_ED\_cost

Total Preventable Cost \= Preventable Hospital Cost \+ Preventable ED Cost

Potential Savings (with intervention) \= Total Preventable Cost × reduction\_rate%

**Regulatory context:**

* **AHRQ PQIs:** Used by CMS, state Medicaid programs, and ACOs as quality benchmarks. Vermont AHEAD uses PQI-composite as an outcome measure.  
* **Vermont GMCB:** Tracks PQI rates statewide as part of hospital performance monitoring.

---

**Tab 3: Intervention Impact Simulator**

Models the population-level impact of deploying specific evidence-based interventions on clinical outcomes and costs.

**8 interventions with full parameters:**

| Intervention | Target Condition | ED Reduction | Hosp Reduction | Complication Reduction | Death Reduction | Cost/Participant | ROI |
| ----- | ----- | ----- | ----- | ----- | ----- | ----- | ----- |
| Diabetes Prevention Program (DPP) | Pre-diabetes | 5% | 8% | 35% | 12% | $429/yr | 3.2× |
| Chronic Care Management (CCM) | Multiple chronic | 18% | 22% | 28% | 15% | $1,200/yr | 2.8× |
| Hospital at Home (HaH) | Acute conditions | 45% | 100% (IS the alternative) | 12% | 8% | $8,500/episode | 1.9× |
| Remote Patient Monitoring (RPM) | HF/HTN/DM | 25% | 38% | 20% | 18% | $1,800/yr | 2.4× |
| Collaborative Care Model (CoCM) | Depression/anxiety | 12% | 15% | 42% | 22% | $900/yr | 6.5× |
| PACE (Program of All-Inclusive Care for the Elderly) | Elderly/frail | 55% | 62% | 38% | 28% | $45,000/yr | 1.6× |
| MOUD (Medication for Opioid Use Disorder) | OUD | 35% | 42% | 68% | 55% | $3,200/yr | 4.1× |
| Community Health Worker (CHW) | SDOH/complex | 22% | 28% | 18% | 10% | $2,400/yr | 2.1× |

**Impact calculation:**

Enrolled \= population × prevalence × uptakeRate%

Baseline ED visits \= population × baselineEDrate

Intervention ED visits \= Enrolled × baselineEDrate × (1 − edReduction%)

ED Savings \= (Baseline − Intervention) × avgEDcost

Baseline Hospitalizations \= population × baselineHospRate

Intervention Hospitalizations \= Enrolled × baselineHospRate × (1 − hospReduction%)

Hospitalization Savings \= (Baseline − Intervention) × avgAdmissionCost

Total Savings \= ED Savings \+ Hospitalization Savings \+ Complication Avoidance Savings

Program Cost \= Enrolled × costPerParticipant

Net ROI \= Total Savings / Program Cost

**Regulatory context:**

* **DPP Medicare coverage (42 CFR §410.79):** CMS covers the CDC-recognized Diabetes Prevention Program for Medicare beneficiaries with pre-diabetes. First preventive service covered based on lifestyle intervention evidence.  
* **CCM (99490/99491 CPT codes):** CMS reimburses Chronic Care Management for patients with 2+ chronic conditions. Minimum 20 minutes of clinical staff time per month.  
* **PACE (42 CFR §460):** Fully capitated, all-inclusive care model for nursing-home-eligible individuals age 55+. Combines Medicare and Medicaid funding into a single capitated payment.  
* **MOUD:** Buprenorphine, methadone (OTP only), and naltrexone. Vermont was an early leader in hub-and-spoke MOUD delivery through the Blueprint program. DEA regulations govern prescribing authority (waiver requirements recently eliminated under Consolidated Appropriations Act 2023).  
* **CHW:** Vermont and many states have added CHW reimbursement to Medicaid state plans following CMS guidance (SHO \#21-001).

---

**Tab 4: SIR Epidemic Model**

A classical mathematical epidemiology model for simulating infectious disease spread through a population.

**What SIR means:**

* **S (Susceptible):** People who have not yet been infected and have no immunity  
* **I (Infected):** People currently infected and capable of transmitting  
* **R (Recovered/Removed):** People who have recovered (and are immune) or died

**The SIR differential equations (discretized for daily simulation):**

β \= R0 × γ  (transmission rate)

β\_adjusted \= β × (1 − socialDistancing%)

ΔS \= −β\_adjusted × S × I / N

ΔI \= β\_adjusted × S × I / N − γ × I

ΔR \= γ × I

Where:

  N \= total population

  γ \= recovery rate (1/infectious\_period)

  R0 \= basic reproduction number

**Vaccination adjustment:**

effectiveVaxCoverage \= vaxCoverage% × vaxEfficacy%

S\_initial \= N × (1 − effectiveVaxCoverage) − initialInfected

**Two parallel tracks simulated:** No vaccination vs vaccination — allowing direct comparison of outcomes.

**R0 reference values embedded in the model:**

| R0 Value | Disease |
| ----- | ----- |
| 1.3 | Influenza / COVID-19 Omicron |
| 2.5 | SARS-CoV-1 |
| 3.0 | Smallpox |
| 5.0 | Polio |
| 12.0 | Measles |
| 18.0 | Mumps |

**Outputs:** Daily S/I/R curves over user-defined number of days, peak infection day, total infected, attack rate, lives saved by vaccination.

**Regulatory/public health context:**

* **`Herd immunity threshold = 1 − (1/R0):`** `For measles (R0=12): 1 − 1/12 = 91.7% vaccination coverage needed. For COVID Omicron (R0=1.3 baseline but much higher in practice): threshold varies significantly.`  
* This model is the same mathematical framework used by CDC, WHO, and state health departments for epidemic planning.

---

## **SECTION 8: RESEARCH LAB — EQUITY PILLAR TOOLS**

---

### **Tool 26: Health Equity Studio**

**URL:** /research-lab/population-equity?tab=equity

**File:** frontend/components/research/HealthEquityStudio.tsx

**Pillar:** Equity

**Sidebar access:** `Home Sidebar → Equity Pillar → Research Lab → Health Equity Studio`

**What it is:** A four-tab analytical platform for measuring, analyzing, and modeling health disparities across racial/ethnic groups and geographies, with tools for SDOH composite scoring and equity-adjusted cost-effectiveness analysis.

---

**Tab 1: Disparity Calculator**

Quantifies racial/ethnic health outcome disparities across 10 conditions and decomposes the sources of those disparities.

**10 health outcomes modeled:**

| Outcome | Baseline (White) | Black Ratio | Hispanic Ratio | Asian Ratio | AIAN Ratio | Per-Event Cost |
| ----- | ----- | ----- | ----- | ----- | ----- | ----- |
| Diabetes prevalence | 10.5% | 1.6× | 1.5× | 0.8× | 1.9× | $12,000/yr |
| Hypertension control | 55% controlled | 0.78× | 0.82× | 0.91× | 0.75× | $8,500/yr |
| Maternal Mortality | 14/100k births | 2.9× | 1.8× | 0.6× | 2.1× | $450,000/death |
| Infant Mortality | 4.5/1,000 births | 2.4× | 1.2× | 0.8× | 2.0× | $380,000/death |
| Cancer Screening | 68% screened | 0.88× | 0.82× | 0.85× | 0.75× | $95,000/late dx |
| Mental Health Access | 48% needing tx get it | 0.75× | 0.68× | 0.72× | 0.65× | $18,000/yr |
| COVID Hospitalization | 180/100k | 2.1× | 1.8× | 0.9× | 2.3× | $28,000/hosp |
| Opioid Overdose | 18/100k | 0.7× | 0.5× | 0.2× | 2.8× | $95,000/death |
| Life Expectancy | 78.4 years | 0.93× | 1.01× | 1.08× | 0.88× | — |
| Preventable Hospitalization | 890/100k | 1.8× | 1.6× | 0.7× | 2.2× | $14,000/hosp |

**Disparity decomposition — 5 contributing factors:**

For each condition, the disparity is decomposed into:

1. **Income/poverty** — share of disparity explained by income differences  
2. **Insurance coverage** — share explained by insurance gaps  
3. **Access to care** — share explained by geographic/provider access  
4. **Quality of care** — share explained by differential quality once in care  
5. **Structural racism** — residual disparity not explained by the above factors

**Calculations:**

Disparity Index \= (minority\_rate / baseline\_white\_rate) − 1

  (positive \= minority worse; negative \= minority better)

Excess Cases \= population × minority\_share × (minority\_rate − baseline\_rate)

Excess Cost \= excess\_cases × perEventCost

Disparity Burden \= Σ excess\_costs across all racial groups

**What AIAN means:** American Indian / Alaska Native — consistently show some of the worst health disparities across all categories.

---

**Tab 2: Geographic Access Analyzer**

Maps healthcare access disparities across a 5×7 matrix of geographic categories and service types.

**5 geographic categories:**

* Urban core  
* Suburban  
* Small city/town  
* Rural  
* Frontier/remote

**7 service types:**

* Primary care  
* Specialty care  
* Emergency care  
* Behavioral health  
* Dental  
* Obstetrics/maternity  
* Long-term care

**For each cell in the matrix:**

* accessRate — % of population with adequate access  
* providerDensity — providers per 10,000 population  
* HPSADesignation — whether area has federal HPSA designation  
* waitTime — average days to appointment  
* uninsuredRate — % uninsured in that geographic/service combination

**5 intervention options modeled:**

| Intervention | Access Improvement | Cost |
| ----- | ----- | ----- |
| Telehealth expansion | \+15–25% rural access | Low |
| Rural Health Clinic (RHC) designation | \+20% access | Medium |
| FQHC establishment | \+30% access | High |
| Mobile health unit program | \+10% access | Low-Medium |
| Loan repayment (NHSC/J-1) | \+8% provider density | Medium |

**For each intervention:**

Improved Access Rate \= current\_access × (1 \+ improvement%)

Additional Population Served \= total\_population × (improved\_rate − current\_rate)

Cost per Additional Person Served \= intervention\_cost / additional\_population

---

**Tab 3: SDOH Composite Scorer**

Calculates a composite Social Determinants of Health score using the Healthy People 2030 five-domain framework.

**5 SDOH domains (Healthy People 2030):**

| Domain | Sub-indicators | National Benchmark |
| ----- | ----- | ----- |
| Economic Stability | Poverty rate, unemployment, food insecurity, housing instability | 12% poverty rate |
| Education Access & Quality | HS graduation, college enrollment, early childhood education | 88% HS grad rate |
| Social & Community Context | Social cohesion, civic participation, discrimination, incarceration | (composite) |
| Health & Healthcare | Insurance coverage, provider access, health literacy, care quality | 90% insured |
| Neighborhood & Built Environment | Housing quality, air quality, water safety, walkability, violence | (composite) |

**sdohToOutcomes(compositeScore) — linear mapping:**

Life Expectancy \= 66 \+ (compositeScore/100) × (80 − 66\)

  `→ Score 0 = 66 years; Score 100 = 80 years`

Diabetes Prevalence \= 18% − (compositeScore/100) × (18% − 7.5%)

  `→ Score 0 = 18%; Score 100 = 7.5%`

Depression Rate \= 28% − (compositeScore/100) × (28% − 14%)

  `→ Score 0 = 28%; Score 100 = 14%`

Infant Mortality \= 10/1,000 − (compositeScore/100) × (10 − 4)/1,000

  `→ Score 0 = 10/1,000; Score 100 = 4/1,000`

**Vermont SDOH presets:**

| Geography | Description |
| ----- | ----- |
| VT Statewide | Vermont baseline |
| Burlington/Chittenden | Most urban, highest scores |
| Northeast Kingdom (Caledonia/Essex/Orleans) | Most rural, lowest scores — the persistent equity challenge |
| Rutland County | Mid-range, opioid crisis impact |

**Regulatory context:**

* **Healthy People 2030 (HHS):** The federal framework for national health objectives. SDOH is one of five overarching goals.  
* **CMS AHEAD equity benchmarks:** Vermont AHEAD requires hospitals to establish equity baselines by FY2026 and meet equity improvement targets by FY2027 — directly uses SDOH composite methodology.  
* **HEROI (Health Equity Return on Investment):** Vermont-specific equity measurement framework referenced in the tool.

---

**Tab 4: Equity-Adjusted ICER (Equity ICER)**

Applies equity weighting multipliers to standard ICER calculations to give greater weight to health gains in disadvantaged populations — reflecting a societal preference for reducing disparities.

**4 equity weighting approaches:**

| Weight | Multiplier | Framework |
| ----- | ----- | ----- |
| Standard (no equity adjustment) | 1.0× | Standard ICER/QALY |
| HEROI (Health Equity ROI) | 1.5× | Vermont AHEAD equity framework |
| Heterodox Equity-Adjusted | 2.0× | Academic equity economics |
| Strong Equity Priority | 3.0× | Maximum equity weighting |

**How equity weighting works:**

Standard ICER \= Incremental Cost / Incremental QALYs

Equity-Adjusted ICER \= Incremental Cost / (Incremental QALYs × equityWeight)

Effect: A 1.5× equity weight makes an intervention appear MORE cost-effective

when it benefits a disadvantaged population — because each QALY gained 

in that population is counted as 1.5 QALYs in the denominator.

**WTP thresholds for Equity ICER:** $30,000 / $100,000 / $150,000 / $200,000 (same as standard CEA).

**Regulatory context:**

* No federal mandate currently requires equity-adjusted ICER in coverage decisions  
* **ICER Equity and Inclusion Framework (2023):** ICER released guidance on incorporating health equity into HTA — the tool implements this emerging methodology  
* **Vermont AHEAD:** Explicitly includes health equity as a required dimension of transformation — making equity-adjusted analysis directly relevant to Vermont hospital strategy

---

## **SECTION 9: RESEARCH LAB — OPERATIONS PILLAR TOOLS**

---

### **Tool 27: Transformation Scorecard**

**URL:** /research-lab/knowledge-workspace?tab=scorecard

**File:** frontend/components/research/TransformationScorecard.tsx

**Pillar:** Operations

**Sidebar access:** `Home Sidebar → Operations Pillar → Research Lab → Transformation Scorecard`

**What it is:** A comprehensive organizational self-assessment tool that scores a health system's progress across all six transformation pillars on a 0–100 scale, with embedded Vermont-specific milestones and regulatory deadlines.

**The scoring scale (5 levels per dimension):**

| Score | Label | Meaning |
| ----- | ----- | ----- |
| 0 | Not Started (NS) | No activity in this dimension |
| 25 | Early Stage (ES) | Planning begun, no implementation |
| 50 | In Progress (IP) | Active implementation underway |
| 75 | Advanced (ADV) | Largely implemented, being refined |
| 100 | Optimized (OPT) | Fully implemented and continuously improved |

**6 Pillars × 5 dimensions \= 30 scored dimensions.**

**Pillar 1 — Policy Transformation (5 dimensions):**

1. Regulatory alignment and compliance readiness  
2. Legislative engagement and advocacy  
3. Waiver/APM participation status  
4. Policy implementation capacity  
5. Stakeholder governance structures

**Pillar 2 — Economic Transformation (5 dimensions):**

1. Revenue diversification away from fee-for-service  
2. APM financial infrastructure  
3. Cost structure optimization  
4. Capital planning for transformation  
5. Financial risk management

**Pillar 3 — Technology Transformation (5 dimensions):**

1. EHR optimization and interoperability  
2. Data analytics and population health platform  
3. AI/ML clinical deployment  
4. Cybersecurity posture  
5. Digital patient engagement

**Pillar 4 — Clinical Transformation (5 dimensions):**

1. Care model redesign (team-based, value-based)  
2. Quality measurement and improvement  
3. Care coordination infrastructure  
4. Clinical decision support deployment  
5. Preventive care and population health

**Pillar 5 — Equity Transformation (5 dimensions):**

1. SDOH screening and referral infrastructure  
2. Disparity measurement and reporting  
3. Culturally responsive care  
4. Workforce diversity and inclusion  
5. Community partnership and trust

**Pillar 6 — Operations Transformation (5 dimensions):**

1. Workforce planning and retention  
2. Revenue cycle optimization for value-based  
3. Supply chain resilience  
4. Operational efficiency and lean processes  
5. Leadership and change management capacity

**Overall score calculation:**

PillarScore \= average of 5 dimension scores

OverallScore \= average of 6 pillar scores

**Overall transformation status bands:**

* **`≥80:`** Transformation Leader  
* **`≥60:`** Advanced — On Track  
* **`≥40:`** In Progress  
* **`≥20:`** Early Stage  
* **\<20:** Pre-Transformation

**Vermont-specific milestones embedded in the scorecard (with dates):**

| Milestone | Deadline | Regulatory Source |
| ----- | ----- | ----- |
| `GMCB commercial benchmark cap (−1% growth)` | FY2026 | GMCB/AHEAD |
| RBP (Reference-Based Pricing) mandatory for non-CAH | FY2027 | Vermont Act 68 |
| Global budgets mandatory for non-CAH | FY2028 | Vermont Act 68 |
| Statewide Strategic Health Plan submission | December 2028 | Vermont Act 68 |
| H.R.1 Medicaid cliff planning | Post-2030 | Federal (proposed) |
| HIE governance transfer to DVHA | July 2025 | Vermont Act 62 |
| RHT AI scribe \+ RPM deployment | FY2026 | Vermont RHT Program |
| VITL mandatory connectivity | FY2027 | Vermont Act 68 |
| AHEAD primary care investment floor | FY2026 | CMS AHEAD |
| HEDIS equity stratification required | FY2027 | AHEAD/GMCB |
| Center of Excellence (COE) designation | FY2028 | AHEAD |
| AHEAD equity baseline established | FY2026 | CMS AHEAD |
| AHEAD equity targets enforced | FY2027 | CMS AHEAD |

**Regulatory framework:**

* **Vermont Act 68 (2025):** The most consequential Vermont health law in a generation. Establishes: mandatory Reference-Based Pricing at Medicare \+15% for non-CAH hospitals (FY2027); global budget mandate for non-CAH hospitals (FY2028); mandatory VITL/VHIE connectivity (FY2027); CAH exemption from RBP and global budget mandates.  
* **Vermont Act 62:** Transfers HIE governance from VITL board to DVHA (Department of Vermont Health Access) effective July 2025\.  
* **Vermont AHEAD (CMS All-Payer Model):** Cohort 2 participation. Includes: all-payer spending growth cap tied to Vermont's economy; primary care investment floor (% of total medical expenditure directed to primary care); equity benchmarks (FY2026 baseline, FY2027 enforced); global budget components.  
* **GMCB (Green Mountain Care Board):** `Sets annual hospital budget caps under Vermont law. Commercial benchmark growth cap of −1% in FY2026 is among the most aggressive in the nation.`  
* **OneCare Vermont:** The statewide ACO administering the Blueprint and AHEAD model at the provider level.  
* **VITL/VHIE (Vermont Information Technology Leaders / Vermont Health Information Exchange):** The state HIE infrastructure. Act 68 mandates all non-CAH hospitals connect by FY2027.

---

### **Tool 28: VBC Readiness Assessment**

**URL:** /research-lab/knowledge-workspace?tab=readiness

**File:** frontend/components/research/VBCReadinessAssessment.tsx

**Pillar:** Operations

**Sidebar access:** `Home Sidebar → Operations Pillar → Research Lab → VBC Readiness Assessment`

**What it is:** A 30-dimension self-assessment tool specifically for evaluating an organization's readiness to enter and succeed in Value-Based Care arrangements. More operationally specific than the Transformation Scorecard.

**6 domains × 5 dimensions \= 30 dimensions:**

Each dimension scored 0 (Not Started) through 4 (Optimized).

**Domain 1 — Strategy & Leadership:**

1. VBC vision and board commitment  
2. Executive VBC expertise and bandwidth  
3. Physician alignment and engagement  
4. VBC-specific strategic plan  
5. Market analysis and APM selection strategy

**Domain 2 — Data & Analytics:**

1. Population health analytics platform  
2. Risk stratification capability  
3. Quality measure reporting infrastructure  
4. Financial modeling for risk contracts  
5. VHCURES / all-payer claims data access (Vermont-specific)

**Domain 3 — Clinical Operations:**

1. Care management program for high-risk patients  
2. Care transitions and readmission prevention  
3. Preventive care and gap closure workflows  
4. Behavioral health integration  
5. CCBHC (Certified Community Behavioral Health Clinic) infrastructure

**Domain 4 — Financial Readiness:**

1. VBC contract negotiation capability  
2. Actuarial/risk modeling capacity  
3. Claims and cost data analytics  
4. Reserves and financial risk tolerance  
5. APM-specific revenue cycle processes

**Domain 5 — Technology Infrastructure:**

1. EHR interoperability and FHIR APIs  
2. Care management technology platform  
3. Patient engagement technology  
4. Real-time data feeds and alerts  
5. VITL/VHIE connectivity (Vermont Act 68 mandate)

**Domain 6 — Health Equity:**

1. SDOH screening and referral program  
2. Disparity measurement by race/ethnicity  
3. Culturally and linguistically appropriate services (CLAS)  
4. Community health worker program  
5. HEROI / equity-adjusted outcomes measurement

**Scoring:**

DomainScore \= average of 5 dimension scores (0–4)

DomainPct \= (DomainScore / 4\) × 100

OverallPct \= average of 6 DomainPct values

**Readiness bands:**

* **`≥80%:`** Global Budget / Full-Risk Ready (can enter AHEAD or ACO REACH)  
* **`≥60%:`** Advanced VBC — ready within 12–18 months  
* **`≥40%:`** In Progress — 2–3 year timeline to readiness  
* **`≥20%:`** Early Stage — foundational work needed  
* **\<20%:** Not Ready — start with MSSP Track 1 or no-risk pilots

**Vermont presets:**

| Preset | Profile |
| ----- | ----- |
| Vermont Hospital — AHEAD Entry FY2027 | Non-CAH hospital preparing for Act 68 global budget mandate |
| Vermont CAH — Early Transformation | Critical Access Hospital, exempt from RBP/global budget but pursuing VBC voluntarily |
| Integrated Health System — Advanced VBC | Large integrated system already in AHEAD/Blueprint |

**Vermont-specific dimension notes embedded in the tool:**

* **VHCURES:** Vermont's all-payer claims database, required for population analytics under AHEAD  
* **VITL/VHIE:** Mandatory connectivity by FY2027 under Act 68 — assessed in Technology Infrastructure domain  
* **HCC coding:** Vermont AHEAD uses HCC-based risk adjustment — assessed in Data & Analytics domain  
* **HEDIS stratification:** Required by FY2027 under AHEAD equity benchmarks — assessed in Health Equity domain  
* **CCBHC:** Vermont's certified community behavioral health clinic program — assessed in Clinical Operations domain  
* **RHT (Rural Health Transformation) Program:** $195M federal investment in Vermont rural health infrastructure — relevant to CAH preset

**Regulatory framework:**

* **Vermont Act 68 (2025):** Global budget mandate (FY2028 non-CAH), RBP mandate (FY2027), VITL connectivity (FY2027), CAH exemption  
* **CMS AHEAD (Cohort 2):** Readiness criteria for AHEAD entry mirror this assessment's domains  
* **ACO REACH:** Full-risk model; highest readiness tier required  
* **42 CFR §495 (Medicaid EHR Incentive Program):** Historical foundation for EHR infrastructure now assessed  
* **CMS Innovation Center (CMMI):** All AHEAD, ACO REACH, and advanced APMs operate under CMMI authority (§1115A of the Social Security Act)

---

### **Tool 29: Evidence Library**

**URL:** /research-lab/knowledge-workspace?tab=evidence

**File:** frontend/components/research/EvidenceLibrary.tsx

**Pillar:** Operations

**Sidebar access:** `Home Sidebar → Operations Pillar → Research Lab → Evidence Library`

**What it is:** A three-tab curated knowledge base containing landmark cost-effectiveness studies, CMMI model outcomes, and full-text policy briefs on major health policy topics — all with regulatory citations.

---

**Tab 1: CEA Studies Database (25 landmark studies)**

Each study includes: ICER value, journal, year, evidence level (I–IV), condition, verdict (dominant / highly-effective / cost-effective / borderline / not-effective).

**Verdict definitions:**

* **Dominant:** The intervention is both cheaper AND more effective than the comparator (ICER is negative — saves money AND improves health)  
* **Highly cost-effective:** ICER \< $30,000/QALY  
* **Cost-effective:** ICER $30,000–$100,000/QALY  
* **Borderline:** ICER $100,000–$150,000/QALY  
* **Not cost-effective:** ICER \> $150,000/QALY

Example studies included:

* Metformin for T2DM prevention (DPP): Dominant  
* Statin therapy for CVD prevention: Highly cost-effective (\~$11,000/QALY)  
* CABG vs medical management for severe CAD: Cost-effective (\~$68,000/QALY)  
* TAVR for inoperable AS: Borderline (\~$128,000/QALY)  
* CAR-T cell therapy for DLBCL: Not cost-effective (\~$280,000/QALY)

---

**Tab 2: CMMI Model Outcomes Database (20 models)**

Tracks all major Center for Medicare and Medicaid Innovation models with status and savings data.

**Models included:**

| Model | Status | Type | Key Outcomes |
| ----- | ----- | ----- | ----- |
| Pioneer ACO | Ended | ACO | Modest savings Year 1–2, mixed thereafter |
| MSSP | Active | ACO | $1.8B cumulative savings through 2022 |
| ACO REACH | Active | ACO full risk | Replacing Direct Contracting |
| BPCI | Ended | Bundle | Mixed — some episodes saved, others did not |
| BPCI-Advanced | Active | Bundle | \~$4,700 savings per episode on average |
| OCM (Oncology Care) | Ended | Specialty | Small savings, high admin burden |
| EOM (Enhancing Oncology) | Active | Specialty | Successor to OCM |
| KCC (Kidney Care Choices) | Active | Kidney | Targeting ESRD prevention and transplant |
| PCF (Primary Care First) | Active | Primary care | Replacing CPC+ |
| MAP (Making Care Primary) | Active | Primary care | New model 2024 |
| AHEAD | Active (Cohort 2\) | State all-payer | Vermont \+ others; multi-year |
| CMHC | Cancelled | Behavioral | Never launched |
| FQHC Advanced Primary Care | Ended | FQHC | Limited enrollment |
| Maryland Total Cost of Care | Active | State | Maryland global budget model |
| Pennsylvania Rural Health | Active | State | Rural global budget |

---

**Tab 3: Policy Briefs (15+ full-text briefs)**

Each brief contains full body text with regulatory citations. Topics covered:

**Brief 1: All-Payer Claims Databases (APCDs) and ERISA Preemption**

* Core issue: Self-insured employer health plans are governed by ERISA (Employee Retirement Income Security Act, 29 USC §1001 et seq.), which preempts state laws that "relate to" employee benefit plans  
* **Gobeille v. Liberty Mutual Insurance Co. (2016):** Supreme Court ruled Vermont's APCD reporting requirement for self-insured ERISA plans was preempted. This limits the completeness of state APCDs — a major gap in Vermont and all-state healthcare data  
* VHCURES (Vermont's APCD) can mandate reporting from insured plans and Medicare (under MOUs) but cannot compel self-insured ERISA plans  
* Federal APCD legislation has been proposed but not enacted

**Brief 2: ONC Cures Final Rule and FHIR R4**

* **21st Century Cures Act (2016, Pub.L. 114-255):** Banned information blocking, authorized interoperability requirements  
* **ONC Cures Final Rule (2020, 85 FR 25642):** Mandated FHIR R4 APIs for certified EHRs by December 2022; defined 8 information blocking exceptions; established TEFCA framework; introduced Patient Access API and Provider Directory API requirements  
* **USCDI v3:** Current version of the United States Core Data for Interoperability — the minimum data set EHRs must be able to exchange  
* **QHINs (Qualified Health Information Networks):** Networks certified under TEFCA to facilitate nationwide exchange. Current QHINs include CommonWell Health Alliance, Carequality (Epic), Sequoia Project, eHealth Exchange, MedAllies, Konza Health, NCQA

**Brief 3: AI Regulation in Healthcare — The Current Gap**

* **FDA SaMD (Software as a Medical Device):** AI tools that "diagnose, treat, prevent, or mitigate" disease are medical devices regulated under 21 USC §321(h). FDA's AI/ML SaMD Action Plan (2021) introduced Predetermined Change Control Plans (PCCPs).  
* **21st Century Cures CDS carve-out:** Clinical Decision Support software that does NOT acquire, process, or analyze medical device data AND whose basis for recommendation is transparent to the user is NOT a medical device. This exemption covers most EHR-embedded CDS.  
* **ONC HTI-1 (2024):** New transparency attestation requirements for "Predictive DSIs" — AI tools embedded in certified EHRs must disclose training data, development approach, fairness testing, and intended populations.  
* **CMS MA AI rule (2024):** Medicare Advantage plans using AI for PA or coverage decisions must disclose AI use, allow human review, and may not use AI to issue denials without clinical review.  
* **Current gap:** No comprehensive federal AI-in-healthcare law. FDA regulates SaMD as devices; ONC regulates EHR-embedded tools; CMS regulates payer AI in MA. Large category of standalone clinical AI tools falls between all three frameworks.

**Brief 4: No Surprises Act — Implementation and Disputes**

* **NSA (Division BB, CAA 2021):** Effective January 1, 2022\. Prohibits out-of-network balance billing in: emergency settings (any facility); non-emergency services by out-of-network specialists at in-network facilities; air ambulance (non-emergency).  
* **QPA (Qualifying Payment Amount):** Defined as the plan's median in-network contracted rate as of January 31, 2019, adjusted for inflation. Serves as the benchmark for out-of-network payment.  
* **IDR (Independent Dispute Resolution):** When provider and plan cannot agree, either may initiate federal IDR arbitration. Arbiter must pick one side's offer; must consider QPA as a presumptive starting point; may consider additional factors (provider training, market conditions, case complexity).  
* **490,000+ disputes:** Far exceeded CMS projections of \~22,000 disputes/year. Dispute backlog created massive administrative burden. Multiple court challenges to QPA methodology by provider groups.  
* **Texas Medical Association v. HHS:** Series of rulings striking down certain IDR implementing regulations that gave excessive weight to QPA.

**Brief 5: Inflation Reduction Act Drug Pricing**

* Full analysis of IRA §§11001–11003 Medicare drug negotiation, §11101 inflation rebates, §11201 Part D redesign, $2,000 OOP cap, $35 insulin cap, $0 vaccine cost-sharing  
* Projected savings: $98.5B over 10 years (CBO)  
* Manufacturer litigation status and constitutional arguments

**Brief 6: Nursing Workforce Crisis**

* 2024 shortage: \~100,000 RN vacancies nationally  
* **Title VIII (42 USC §§296–298):** Federal nursing workforce development funding — scholarships, loan repayment, advanced practice training, workforce diversity  
* **ANA (American Nurses Association)** advocacy for federal staffing ratios  
* RN turnover: national average 22%; ICU turnover: 28%; cost per RN turnover: $40,000–$60,000  
* Travel nurse premium: typically 2–3× base salary; 2021–2023 peak spending by hospitals added $8–10B in labor costs nationally

---

### **Tool 30: Research Workspace**

**URL:** /research-lab/knowledge-workspace?tab=workspace

**File:** frontend/components/research/ResearchWorkspace.tsx

**Pillar:** Operations

**Sidebar access:** `Home Sidebar → Operations Pillar → Research Lab → Research Workspace`

**What it is:** A personal research productivity tool with four modules — scenario management, report building, comparison dashboards, and notes/citations. All data persists in browser localStorage via the useLocalStorage hook. No server-side storage.

---

**Tab 1: Scenario Manager**

Stores and organizes analytical scenarios created across other Research Lab tools.

**Scenario statuses:** Draft / In Review / Final

Each scenario can be tagged, given a description, linked to a pillar, and assigned a due date. Scenarios can be exported for sharing.

---

**Tab 2: Report Builder**

Builds structured reports from Research Lab findings.

**Report templates available:**

* Executive Briefing (2-page format)  
* Technical Report (full methodology included)  
* Board Presentation (decision-focused)  
* Regulatory Submission (compliance format)  
* Grant Application (funding-focused)  
* Policy Brief (advocacy format)

**Output:** Markdown export or plain text export.

---

**Tab 3: Comparison Dashboard**

Side-by-side comparison of multiple scenarios, organizations, or policy options.

**Comparison templates available:** Financial comparison, Quality comparison, Equity comparison, APM model comparison, Technology maturity comparison.

---

**Tab 4: Notes & Citations**

**Note categories:** Strategy, Research, Regulatory, Financial, Clinical, Equity

**Note priorities:** High / Medium / Low

**Citation manager with two academic formats:**

**AMA format:**

formatAMA(citation):

Author AA, Author BB. Title. Journal. Year;Volume(Issue):Pages. DOI.

**APA format:**

formatAPA(citation):

Author, A. A., & Author, B. B. (Year). Title. Journal, Volume(Issue), Pages.

https://doi.org/DOI

**Regulatory relevance:** None — this is a pure productivity and documentation tool. It is designed to help researchers document their work done in other Research Lab tools and produce deliverables for regulatory submissions, board presentations, and grant applications.

---

## **SECTION 10: CROSS-CUTTING REGULATORY FRAMEWORK**

This section organizes all federal laws, state laws, and clinical standards that drive the tools documented above into a single reference.

---

### **10.1 Federal Laws and Statutes**

**Affordable Care Act (ACA) — Pub.L. 111-148 (2010)**

Drives: Actuarial Lab (metal tiers, MLR, AV, risk adjustment, CSR, individual mandate), Medicaid Eligibility Simulator (expansion at 138% FPL, premium tax credits 139–400% FPL, young adult coverage to 26), Policy Simulator (expansion calculator, 1115 waivers), CEA Calculator (coverage decisions).

Key provisions referenced: §1001 (MLR), §1201 (community rating, guaranteed issue), §1302 (essential health benefits, cost-sharing limits), §1311 (exchanges), §1401 (premium tax credits), §1402 (CSR), §2001 (Medicaid expansion), §2004 (former foster care), §2702 (guaranteed availability), §10101 (patient protections).

**Medicare Access and CHIP Reauthorization Act (MACRA) — Pub.L. 114-10 (2015)**

Drives: APM Calculator (MSSP, ACO REACH, QP status), Clinical Quality Optimizer (MIPS, QPP, APM Incentive Payment), APM Design Lab (Advanced APM criteria).

Key provisions: MIPS composite (Quality 30/PI 25/IA 15/Cost 30), 5% APM Incentive Payment for QPs, QPP pathways, Advanced APM definition criteria.

**21st Century Cures Act — Pub.L. 114-255 (2016)**

Drives: FHIR Lab (information blocking prohibition, ONC Final Rule, FHIR R4 mandate, CDS carve-out), AI Governance Lab (ONC HTI-1 DSI transparency), Evidence Library (APCD brief, interoperability brief).

Key provisions: Information blocking prohibition (45 CFR §171), TEFCA framework, certified EHR API requirements (45 CFR §170.315(g)(10)), CDS carve-out.

**HIPAA (Health Insurance Portability and Accountability Act) — Pub.L. 104-191 (1996)**

Drives: FHIR Lab (compliance checklist — Security Rule, X12 278 PA transactions), HTI Dashboard (cybersecurity sub-metric).

Key provisions: Privacy Rule (45 CFR §§164.500–164.534), Security Rule (45 CFR §§164.302–164.318), Transactions Rule (45 CFR §§162.100–162.1902 — X12 278 PA, X12 837 claims, X12 835 remittance).

**ERISA (Employee Retirement Income Security Act) — Pub.L. 93-406 (1974)**

Drives: Evidence Library (Gobeille v. Liberty Mutual, APCD preemption brief).

Key issue: §514 preemption of state laws that "relate to" employee benefit plans — blocks state APCD mandates for self-insured employers, which cover \~60% of commercially insured Americans.

**No Surprises Act (Division BB, Consolidated Appropriations Act 2021 — Pub.L. 116-260)**

Drives: Policy Simulator (NSA impact tab), Evidence Library (NSA policy brief).

Key provisions: Balance billing ban (§2799B-1), QPA definition (§2799A-1), federal IDR process (§2799A-2), good faith estimate requirements (§2799B-6), advanced EOB requirements (§2799B-6).

**Inflation Reduction Act (IRA) — Pub.L. 117-169 (2022)**

Drives: Actuarial Lab (IRA drug pricing tab — 10 negotiated drugs, MFP, Part D $2,000 OOP cap, $35 insulin cap, inflation rebates), Evidence Library (IRA policy brief), CEA Calculator (downstream coverage implications).

Key provisions: §11001 (drug negotiation program), §11101 (inflation rebates), §11201 (Part D redesign — $2,000 OOP cap, catastrophic phase manufacturer discount, $0 vaccines, $35 insulin).

**American Rescue Plan Act (ARP) — Pub.L. 117-2 (2021)**

Drives: Medicaid Eligibility Simulator (12-month postpartum extension option — §9812), Policy Simulator (enhanced FMAP for new expansion states).

Key provisions: §9812 (12-month postpartum Medicaid coverage option), enhanced premium tax credits through 2025 (extended by IRA), 5% FMAP bonus for new expansion states.

**Social Security Act — Various titles**

* **Title XIX (Medicaid):** Foundation for all Medicaid tools — eligibility, FMAP, APMs, 1115 waivers  
* **Title XVIII (Medicare):** Foundation for CMS payment models, HCC RAF, Star Ratings, MIPS  
* **Title XXI (CHIP):** Foundation for Dr. Dynasaur children's program  
* **§1115 (42 USC §1315):** 1115 waiver authority — Policy Simulator waiver modeler  
* **§1115A (42 USC §1315a):** CMMI authority — all CMMI models in Evidence Library and APM tools  
* **§1902(a)(10)(A)(i)(VIII):** Medicaid expansion provision — Medicaid Eligibility Simulator  
* **§2001 ACA:** Medicaid expansion — drives expansion calculator in Policy Simulator

**Ryan Haight Act — 21 USC §831**

Drives: Digital Health Lab (telehealth prescribing constraints).

Key issue: Requires in-person evaluation before prescribing controlled substances via telemedicine. DEA proposed rules on permanent telehealth prescribing exceptions remain under development.

---

### **10.2 CMS Regulatory Framework**

**CMS Interoperability and Prior Authorization Final Rule (CMS-0057-F, effective January 2026\)**

Drives: FHIR Lab (compliance checklist — PA API, payer-to-payer, Da Vinci CRD/DTR/PAS).

Applies to: Medicare Advantage, Medicaid FFS, Medicaid managed care, CHIP, QHP issuers.

Requirements: FHIR PA API (72-hour urgent / 7-day standard response), payer-to-payer exchange, annual PA metrics reporting, specific denial reasons.

**ONC HTI-1 Final Rule (2024, 45 CFR §170.315(b)(11))**

Drives: FHIR Lab (DSI transparency attestation), AI Governance Lab (predictive DSI governance).

Requirements: EHR developers must provide transparency attestations for AI-based predictive clinical decision support: training data description, intended use population, fairness testing approach, performance metrics by subgroup.

**Medicare Advantage Star Ratings (42 CFR §422.162)**

Drives: Clinical Quality Optimizer (Stars tab — 32 measures, 4 domains, cut points, 5% QBP).

Key: 4+ stars \= 5% Quality Bonus Payment (QBP). 5 stars \= year-round enrollment. \<3 stars for 3 years \= contract termination risk.

**CMS AHEAD Model (All-Payer Health Equity Approaches and Development)**

Drives: APM Calculator (Vermont AHEAD preset), Transformation Scorecard (AHEAD milestones), VBC Readiness Assessment (AHEAD readiness criteria), Hospital Financial Stress Test (AHEAD benchmark scenarios).

Key Vermont AHEAD requirements: All-payer spending growth cap tied to Vermont GDP; primary care investment floor; equity baselines FY2026; equity enforcement FY2027; global budget components for non-CAH hospitals.

**HCC Risk Adjustment (CMS HCC Model v28)**

Drives: Risk Stratification Engine (HCC RAF calculator — 20 conditions with exact v28 RAF scores, demographic factors, $950/month base capitation).

Applied to: Medicare Advantage capitation, ACO REACH attribution, some MSSP arrangements.

**Hospital Price Transparency Rule (45 CFR §180, effective January 2021, strengthened January 2024\)**

Drives: Policy Simulator (price transparency compliance tab).

Requirements: Machine-readable file of all standard charges (gross, payer-negotiated, de-identified min/max, cash price) for all items and services. Penalties up to $110,000/year for large hospitals (\>30 beds).

---

### **10.3 Vermont-Specific Laws and Programs**

**Vermont Act 167 (2022) — Hospital Transformation**

Drives: HTR Simulator (primary live implementation), Transformation Scorecard (Act 167 milestone).

Core: Authorized statewide hospital transformation program with performance benchmarks administered by GMCB. Established the framework that Act 68 subsequently expanded.

**Vermont Act 68 (2025) — Health System Transformation**

Drives: APM Calculator (CAH exempt preset, Act 68 annotation), Hospital Financial Stress Test (Act 68 RBP scenario), Transformation Scorecard (Act 68 milestones), VBC Readiness Assessment (VITL mandate dimension).

Core provisions:

* Reference-Based Pricing (RBP) at Medicare \+15% mandatory for non-CAH hospitals: FY2027  
* Global budget mandatory for non-CAH hospitals: FY2028  
* VITL/VHIE mandatory connectivity: FY2027  
* CAH (Critical Access Hospital) exemption from RBP and global budget  
* Statewide Strategic Health Plan submission: December 2028

**Vermont Act 62 — HIE Governance**

Drives: Transformation Scorecard (Act 62 milestone: July 2025 HIE governance transfer).

Core: Transfers governance of Vermont's HIE (VITL/VHIE) from the VITL board to DVHA (Department of Vermont Health Access).

**Vermont AHEAD Model (CMS Cohort 2\)**

See CMS section above. Vermont-specific note: Vermont is the anchor state for the AHEAD model, having operated the predecessor All-Payer Model since 2017\.

**Vermont Blueprint for Health**

Drives: APM Calculator (Vermont Blueprint ACO preset), VBC Readiness Assessment (Blueprint as advanced VBC example).

Core: Vermont's advanced primary care model integrating community health teams, practice transformation, and ACO attribution. One of the most mature primary care models in the US.

**Vermont RHT Program (Rural Health Transformation)**

Drives: Workforce Modeler (rural preset — Vermont 0 hospital closures, 12 HPSAs), Transformation Scorecard (RHT milestones FY2026).

Core: $195M federal investment in Vermont rural health infrastructure through HRSA. Covers AI scribe deployment, RPM expansion, rural workforce recruitment.

**GMCB (Green Mountain Care Board)**

`Drives: Hospital Financial Stress Test (GMCB benchmark scenarios), Transformation Scorecard (FY2026 −1% commercial benchmark), APM Design Lab (global budget components).`

Core: Vermont's independent regulatory body with authority to set hospital budgets, review rates, oversee AHEAD implementation, and enforce Act 68 compliance. No other state has an equivalent body with this scope of authority.

**VHCURES (Vermont Healthcare Claims Uniform Reporting and Evaluation System)**

Drives: VBC Readiness Assessment (VHCURES data access dimension).

Core: Vermont's all-payer claims database. Subject to the ERISA preemption limitation from Gobeille — self-insured employer plans cannot be compelled to report.

**Dr. Dynasaur Program**

`Drives: Medicaid Eligibility Simulator (children ≤317% FPL, pregnancy ≤208% FPL, no premiums ≤225% FPL).`

Core: Vermont's Medicaid/CHIP program for children and pregnant individuals. Among the highest income eligibility thresholds for children's coverage in the nation.

**Vermont 12-Month Postpartum Extension (2022)**

`Drives: Medicaid Eligibility Simulator (postpartum program — 12 months at ≤208% FPL).`

Core: Vermont was among the first states to adopt the ARP §9812 option for 12-month postpartum Medicaid coverage, extending coverage from 60 days post-delivery to 12 months.

---

### **10.4 Clinical Standards and Quality Frameworks**

**NCQA HEDIS (Healthcare Effectiveness Data and Information Set)**

Drives: Clinical Quality Optimizer (15 HEDIS measures with p50/p90 benchmarks, star conversion, improvement strategies).

Used by: All commercial managed care plans (required for NCQA accreditation), Medicaid managed care plans (state contract requirement), CMS Stars (adapted HEDIS measures).

**HL7 FHIR R4 (Fast Healthcare Interoperability Resources Release 4\)**

Drives: FHIR Lab (resource builder, US Core profile, 8 resource types, system URIs, Da Vinci IGs).

Standard: HL7 international standard (published 2018). Federally mandated for certified EHRs since December 2022 (ONC Cures Final Rule).

**LOINC (Logical Observation Identifiers Names and Codes)**

Drives: FHIR Lab (10 LOINC codes for vitals/labs, terminology mapper).

Standard: Universal standard for identifying medical laboratory observations. Maintained by Regenstrief Institute. Required for USCDI v3 compliance.

**SNOMED CT (Systematized Nomenclature of Medicine Clinical Terms)**

Drives: FHIR Lab (terminology mapper — 15 SNOMED codes).

Standard: Comprehensive clinical terminology. US licensed through NLM. Required for USCDI v3 problem list representation.

**ICD-10-CM (International Classification of Diseases, 10th Revision, Clinical Modification)**

Drives: FHIR Lab (terminology mapper — ICD-10 codes), Risk Stratification Engine (HCC conditions mapped to ICD-10).

Standard: HIPAA-mandated diagnosis coding standard. Updated annually by CDC/CMS.

**RxNorm**

Drives: FHIR Lab (terminology mapper — 15 RxNorm codes for medications).

Standard: NLM normalized drug nomenclature for clinical drugs. Required for USCDI v3 medication representation.

**USPSTF (US Preventive Services Task Force)**

Drives: FHIR Lab (CDS Hooks preventive care gap scenario), Clinical Quality Optimizer (preventive care measures).

Authority: Independent panel whose Grade A and B recommendations are mandated to be covered without cost-sharing under ACA §2713.

**Charlson Comorbidity Index / Elixhauser Index**

Drives: Risk Stratification Engine (comorbidity visualizer — both indices with full condition lists and weights, Charlson survival prediction formula).

Used by: Researchers, risk adjusters, case-mix analysts for mortality and readmission prediction from administrative data.

**AHRQ Prevention Quality Indicators (PQIs)**

Drives: Population Health Modeler (preventable utilization tab — 10 PQI conditions).

Used by: CMS, state health departments, ACOs for preventable hospitalization measurement.

**PAM (Patient Activation Measure)**

Drives: Digital Health Lab (patient engagement comparison — 4 PAM levels).

Standard: Licensed measure of patient knowledge, skill, and confidence in self-management. Higher PAM scores correlate with better outcomes and lower costs. Developed by Judith Hibbard, University of Oregon.

**CDS Hooks Standard**

Drives: FHIR Lab (CDS Hooks tester — 4 hook types, 4 clinical scenarios).

Standard: HL7 specification for real-time clinical decision support integration within EHR workflows. Enables external CDS services to respond to EHR events.

**LACE Score**

Drives: FHIR Lab (High-Risk Patient Flag CDS scenario).

Calculation: **L**ength of stay (0–4 pts) \+ **A**cuity of admission (3 pts for ED admission) \+ **C**omorbidities (Charlson score, 0–5 pts) \+ **E**`D visits in prior 6 months (0–4 pts). Total 0–19. Score ≥10 = high readmission risk.`

**X12 278 Health Care Services Review**

Drives: FHIR Lab (prior authorization simulator).

Standard: HIPAA-mandated EDI transaction for prior authorization requests and responses. Required under 45 CFR §162.1301.

---

### **Section 10 Expansions — Key Laws in Full**

---

**Vermont Act 68 (2025) — Full Standalone Explanation**

Act 68 is the most consequential piece of Vermont health legislation since the failed single-payer attempt (Act 48, 2011). It operationalizes what Vermont has been building toward for 15 years.

**Core mandates:**

**1\. Reference-Based Pricing (RBP) — effective FY2027**

All non-CAH hospitals in Vermont must accept Reference-Based Pricing from commercial payers at a maximum rate of Medicare rates \+ 15%. This eliminates negotiated commercial rates, which currently average 200–260% of Medicare for Vermont hospitals. The financial impact is severe for larger community hospitals (modeled in the Hospital Financial Stress Test Act 68 preset as −8% volume, compressed margins).

Why \+15%? Medicare pays hospitals at cost-based rates for CAHs and DRG-based rates for PPS hospitals. The \+15% margin above Medicare is intended to be sufficient for operational sustainability while eliminating excessive commercial rate variation.

CAH exemption rationale: Critical Access Hospitals already receive cost-based Medicare reimbursement (101% of reasonable costs). Applying RBP to CAHs would be redundant and potentially harmful to already-marginal rural facilities.

**2\. Global Budget Mandate — effective FY2028**

Non-CAH hospitals must operate under a global budget set by GMCB. This makes Vermont the second US state (after Maryland) with mandatory hospital global budgets. Under the global budget:

* Hospitals receive a fixed annual payment regardless of volume  
* Incentive shifts from "see more patients" to "keep patients healthy"  
* GMCB sets budget through annual regulatory process  
* Budgets tied to Vermont's all-payer growth target under AHEAD

**3\. VITL Mandatory Connectivity — effective FY2027**

All non-CAH hospitals must connect to VITL/VHIE (Vermont Health Information Exchange). This closes the data gap where some hospitals were not sharing data through the state HIE, limiting population health management and VHCURES completeness.

**4\. CAH Exemption**

Critical Access Hospitals are exempt from both RBP and global budget mandates. Vermont has 14 CAHs. CAH designation requires: located \>35 miles from nearest hospital (or 15 miles in mountainous terrain), ≤25 acute care beds, average length of stay ≤96 hours, 24/7 emergency services.

**5\. Statewide Strategic Health Plan**

Vermont must submit a comprehensive Statewide Strategic Health Plan to the legislature by December 2028, covering the full transformation roadmap through 2035\.

---

**CMS AHEAD Model — Full Standalone Explanation**

AHEAD (Advancing All-Payer Health Equity Approaches and Development) is CMS's Innovation Center model for state-level health transformation. Vermont is in Cohort 2 (alongside Oregon, Minnesota, and others).

**What makes AHEAD different from other models:**

* It is an ALL-PAYER model — applies to Medicare, Medicaid, AND commercial payers simultaneously  
* It operates at the STATE level, not the individual provider level  
* It requires equity commitments as a condition of participation — not optional

///////  Tool 13 Again

### **Tool 13 (Completed): APM Design Lab — Full Calculations and Logic**

**URL:** /research-lab/payment-models?tab=apm-design

**File:** frontend/components/research/APMDesignLab.tsx

---

**Tab 1: APM Architecture Designer — Full Detail**

**All design dimensions and their options:**

**Population Attribution Method:**

* Prospective attribution — patients assigned based on prior year utilization patterns  
* Retrospective attribution — patients assigned after the performance year based on actual utilization  
* Voluntary enrollment — patients actively choose to enroll  
* Claims-based plurality — assigned to provider with most primary care claims

**Risk Arrangement:**

* Upside only (one-sided) — ACO keeps share of savings, owes nothing for overages  
* Two-sided (symmetric) — ACO keeps savings share AND owes loss share  
* Full risk (global capitation) — ACO receives fixed PMPM and bears all cost responsibility  
* Corridor model — losses shared only within defined band (e.g., 2–10% over benchmark)

**Benchmark Setting Method:**

* Historical trend — organization's own prior 3-year average × trend factor  
* Regional average — CMS regional fee-for-service expenditure data  
* National average — CMS national FFS expenditure by service category  
* State all-payer — uses APCD/VHCURES all-payer data where available  
* Blended (state \+ national) — weighted average of state and national

**Benchmark trend factors applied:**

historicalBenchmark \= (Year−3 \+ Year−2 \+ Year−1) / 3 × trendFactor

trendFactor \= CMS published national trend (typically 3–5% annually)

regionalBenchmark \= CMS regional FFS × geographicAdjustmentFactor

blendedBenchmark \= (stateBenchmark × stateWeight) \+ (nationalBenchmark × (1−stateWeight))

**Quality Measurement Approach options:**

* HEDIS composite (NCQA measures)  
* CMS Star Ratings subset  
* Custom measure set  
* ACO REACH required measures  
* AHEAD equity-stratified measures (Vermont-specific)

**Infrastructure Requirements scored by model type:**

| Requirement | Upside-Only | Two-Sided | Full Risk |
| ----- | ----- | ----- | ----- |
| Population health platform | Recommended | Required | Required |
| Risk stratification engine | Recommended | Required | Required |
| Care management program | Recommended | Required | Required |
| Actuarial capacity | Optional | Recommended | Required |
| Claims data feed | Recommended | Required | Required |
| Financial reserves | Not required | 2–4% of benchmark | 8–15% of benchmark |

---

**ViabilityBadge Logic:**

The ViabilityBadge component evaluates whether a specific APM design combination is viable. It scores four dimensions:

populationViability:

  `<500 lives → Not Viable (insufficient for statistical stability)`

  `500–2,000 lives → Marginal (high variance, upside-only only)`

  `2,001–10,000 lives → Viable (two-sided acceptable)`

  `>10,000 lives → Highly Viable (full risk feasible)`

riskViability:

  `upsideOnly + anyPopulation → Viable`

  `twoSided + <2,000 lives → Marginal`

  twoSided \+ ≥2,000 lives → Viable

  `fullRisk + <10,000 lives → Not Viable`

  fullRisk \+ ≥10,000 lives → Viable

infrastructureViability:

  scored 0–100 based on checked infrastructure requirements

  ≥80 → Viable

  `50–79 → Marginal`

  `<50 → Not Viable`

overallViability:

  `All three Viable → Green (Viable)`

  `Any one Not Viable → Red (Not Viable)`

  `Otherwise → Yellow (Marginal — proceed with caution)`

---

**Tab 2: Episode Designer — Full Detail**

**What an episode bundle covers:**

An episode window has three components:

* **Trigger event:** The qualifying clinical event that initiates the episode (e.g., CABG procedure, hip fracture hospitalization)  
* **Pre-trigger window:** Services in the 30 days before the trigger (pre-operative workup)  
* **Post-trigger window:** Services in the 90 days after discharge (post-acute care, follow-up, complications)

**EPISODES catalog with clinical parameters:**

| Episode | Trigger | Window | Avg Medicare Cost | Key Cost Driver |
| ----- | ----- | ----- | ----- | ----- |
| CABG | DRG 231–236 | 30 pre / 90 post | $52,000 | SNF/rehab post-discharge |
| Total Knee Arthroplasty (TKA) | DRG 470 | 30 pre / 90 post | $28,000 | Physical therapy, SNF |
| Total Hip Arthroplasty (THA) | DRG 469–470 | 30 pre / 90 post | $26,500 | SNF, complications |
| Hip Fracture | DRG 480–482 | 0 pre / 90 post | $38,000 | SNF, mortality risk |
| Acute MI (AMI) | DRG 280–282 | 0 pre / 90 post | $34,000 | Readmission (30-day rate \~15%) |
| Pneumonia | DRG 193–195 | 0 pre / 90 post | $18,500 | Readmission, SNF |
| CHF | DRG 291–293 | 0 pre / 90 post | $22,000 | Readmission (30-day rate \~22%) |
| Stroke | DRG 61–66 | 0 pre / 90 post | $44,000 | Inpatient rehab, long-term disability |
| COPD | DRG 190–192 | 0 pre / 90 post | $16,000 | Readmission |
| Sepsis | DRG 870–872 | 0 pre / 90 post | $48,000 | ICU, post-acute |
| Colorectal Surgery | DRG 329–331 | 30 pre / 90 post | $35,000 | Complications, SNF |
| Spinal Fusion | DRG 453–455 | 30 pre / 90 post | $42,000 | PT, SNF |

**EPISODE\_SERVICES — what is included in each bundle:**

* Acute inpatient facility (DRG payment)  
* Physician/surgeon professional fees  
* Anesthesia  
* ICU (if applicable)  
* SNF (skilled nursing facility) — up to 90 days  
* Inpatient rehabilitation facility (IRF)  
* Long-term acute care (LTAC)  
* Home health agency (HHA)  
* Outpatient PT/OT  
* Outpatient follow-up visits (30 and 90-day)  
* Readmissions within 30 days  
* Durable medical equipment (DME)

**What is excluded from episodes:**

* Unrelated conditions (e.g., chemotherapy during an orthopedic episode)  
* New acute events unrelated to trigger (e.g., new MI during a knee replacement episode)  
* Hospice care  
* Part D drugs (unless model specifically includes)

**Episode target price calculation:**

historicalEpisodeCost \= average of prior 3 years of episode costs

  for this provider/region

trendAdjustment \= historicalEpisodeCost × annualTrend%

qualityAdjustment \= trendAdjusted × (1 − qualityImprovementTarget%)

targetPrice \= qualityAdjusted × (1 − expectedSavingsRate%)

reconciliation:

  if actualEpisodeCost \< targetPrice:

    providerGain \= (targetPrice − actualEpisodeCost) × sharingRate%

  if actualEpisodeCost \> targetPrice:

    providerLoss \= (actualEpisodeCost − targetPrice) × lossShareRate%

    (only if two-sided)

---

**Tab 3: Global Budget Simulator — Full Detail**

**What a global budget is:** A prospective, fixed annual spending cap for a hospital or health system covering all services for an attributed or enrolled population. The hospital receives a fixed payment regardless of volume — fundamentally different from fee-for-service where more services \= more revenue.

**All global budget parameters:**

**Budget Construction inputs:**

* baseYearSpend — actual total spending in the base year ($)  
* attributedLives — population covered by the budget  
* trendFactor — allowed annual growth rate (%) — Vermont's GMCB uses GDP-linked cap  
* qualityAdjustment — budget modifier based on quality performance (±%)  
* equityAdjustment — additional modifier for equity performance (Vermont AHEAD specific)  
* carryForward — whether prior year surplus/deficit rolls into new year budget  
* riskCorridorBand — the corridor within which gains/losses are shared vs. absorbed

**Budget calculation:**

Year 1 Budget \= baseYearSpend × (1 \+ trendFactor%)

  × (1 \+ qualityAdjustment%)

  × (1 \+ equityAdjustment%)

Year N Budget \= Year(N−1) Budget × (1 \+ trendFactor%)

  × qualityMultiplier × equityMultiplier

  × carryForwardAdjustment

If carryForward \= true:

  Year N Budget \+= (Year(N−1) Budget − Year(N−1) ActualSpend)

  \[surplus increases next year budget; deficit reduces it\]

**Risk corridor mechanics:**

variance \= actualSpend − budget

If |variance| \< corridorFloor%:

  hospital absorbs entire variance (within normal operations)

If corridorFloor% ≤ |variance| \< corridorCeiling%:

  sharedVariance \= variance × sharingRate%

  hospitalPortion \= variance × (1 − sharingRate%)

If |variance| \> corridorCeiling%:

  hospital absorbs up to ceiling; payer/state absorbs above ceiling

  (stop-loss protection for catastrophic variance)

**Vermont AHEAD global budget specifics:**

* Trend cap tied to Vermont's all-payer growth target (linked to Vermont GDP/personal income growth)  
* Non-CAH hospitals: mandatory participation FY2028 (Act 68\)  
* CAH hospitals: exempt from mandate, voluntary participation available  
* GMCB sets annual budget through regulatory process (public hearings, hospital submissions, GMCB vote)  
* Commercial, Medicare, and Medicaid payers each have different rate-setting arrangements within the global budget framework

---

**Tab 4: Benchmark Comparison — Full Detail**

**BENCHMARK\_METHODS — four approaches with full methodology:**

**Method 1: National Benchmark**

nationalBenchmark \= CMS national FFS PMPM by service category

  × geographicAdjustmentFactor (CMS wage index \+ geographic practice cost index)

  × (1 \+ nationalTrend%)^years

Service categories: inpatient, outpatient, professional, SNF, home health, hospice, DME, Part D

**Method 2: Regional Benchmark**

regionalBenchmark \= CMS regional FFS expenditure (9 census regions)

  × regionalCaseMixAdjustment

  × (1 \+ regionalTrend%)^years

Regional trend varies: Northeast typically lower than South/Southwest

**Method 3: State-Blended Benchmark**

stateBlended \= (stateFFS × stateWeight) \+ (nationalFFS × (1 − stateWeight))

stateWeight \= typically 0.5–0.7 depending on state data reliability

stateFFS \= derived from state APCD or CMS state-level reports

**Method 4: Historical Benchmark**

historicalBase \= (actuals\_Y−3 \+ actuals\_Y−2 \+ actuals\_Y−1) / 3

normalizedBase \= historicalBase × caseRiskAdjustment

  \[adjusts for changes in patient population risk/HCC score year over year\]

trendedBenchmark \= normalizedBase × (1 \+ trendFactor%)^performanceYear

efficiencyDiscount \= trendedBenchmark × (1 − efficiencyTarget%)

  \[CMS typically applies 0.5–2% efficiency discount to prevent "spend your way 

   to a high benchmark" gaming\]

finalBenchmark \= efficiencyDiscount

**Benchmark comparison output:**

For each method:

  benchmarkPMPM \= method-specific calculation above

  projectedSpend \= actualPMPM × attributedLives × 12

  variance \= projectedSpend − (benchmarkPMPM × attributedLives × 12\)

  savingsOpportunity \= max(0, variance × sharingRate%)

**Regulatory framework for APM Design Lab:**

* **MACRA §101 (42 CFR §414.1415):** Advanced APM criteria — certified EHR, quality measurement, more than nominal financial risk  
* **CMMI §1115A authority:** All CMMI-run models (AHEAD, ACO REACH, BPCI-A, EOM, PCF) operate under this authority — the Innovation Center can waive Medicare/Medicaid rules for model testing  
* **BPCI-Advanced:** Current CMS bundled payment model. 28 clinical episodes. Two-sided risk. Convener model. Target prices set using historical CMS data with efficiency discount.  
* **CJR (Comprehensive Care for Joint Replacement):** Mandatory bundled payment model for hip/knee; served as template for Episode Designer methodology  
* **Vermont Act 68:** Global Budget Simulator directly models the Act 68 mandate structure — non-CAH mandatory FY2028, trend-linked to GMCB cap, risk corridor provisions  
* **Maryland Total Cost of Care Model:** The only other US state with a hospital global budget system; serves as benchmark comparison for Vermont's AHEAD/Act 68 approach

---

* It includes a global budget component for participating hospitals

**Vermont AHEAD specific requirements:**

**All-Payer Spending Growth Cap:**

Total all-payer healthcare spending in Vermont must not grow faster than Vermont's economy (personal income growth). This is measured across Medicare, Medicaid, and commercial simultaneously. Currently Vermont's all-payer spending growth target is linked to GMCB's commercial benchmark — approximately 3.5% for FY2026.

**Primary Care Investment Floor:**

Vermont must direct a minimum percentage of total medical expenditure to primary care. The floor increases annually. Rationale: primary care investment is underfunded relative to its value in prevention and coordination. This creates a structural incentive to fund primary care rather than downstream acute care.

**Equity Benchmarks:**

* FY2026: All AHEAD participants must establish equity baselines — measure health outcomes stratified by race/ethnicity across HEDIS measures  
* FY2027: Equity targets go from baseline to enforced — plans/hospitals must show measurable disparity reduction or face performance consequences  
* Vermont hospitals must stratify HEDIS measures by race/ethnicity by FY2027 (embedded as milestone in Transformation Scorecard)

**Global Budget Component:**

Non-CAH hospitals in AHEAD receive global budgets negotiated between GMCB, CMS, and payers. The global budget covers Medicare spending; Act 68 extends the mandate to commercial payers as well.

**AHEAD financial model:**

AHEAD Payment \= Medicare Global Budget \+ Medicaid Capitation \+ Commercial RBP  
  (all three payer streams flowing into single hospital global budget)

Performance adjustment \= budget × (qualityScore/100) × equityMultiplier  
  where equityMultiplier \= 1.0 baseline, up to 1.05 for equity achievement,  
  down to 0.95 for equity failure

---

**MACRA — Full Standalone Explanation**

MACRA (Medicare Access and CHIP Reauthorization Act of 2015, Pub.L. 114-10) is the law that restructured how Medicare pays physicians. It replaced the SGR (Sustainable Growth Rate) formula — which had required annual Congressional "doc fixes" for 12 years — with a permanent value-based framework.

**Two tracks created by MACRA:**

**Track 1: MIPS (Merit-based Incentive Payment System)**

Applies to all eligible clinicians who do not qualify for the APM track. Four categories:

* **Quality (30%):** Clinician reports on 6+ quality measures from the MIPS measure set. Performance scored against national benchmarks. Each measure assigned 1–10 decile points.  
* **Promoting Interoperability (25%):** EHR use, e-prescribing, PDMP query, health information exchange, patient portal engagement. Must use certified EHR technology.  
* **Improvement Activities (15%):** Participation in activities from a defined catalog — care coordination, patient safety, access improvement, population management. High-weighted activities (20 pts) and medium-weighted (10 pts).  
* **Cost (30%):** CMS calculates automatically from claims — no reporting required. Two measures: Medicare Spending Per Beneficiary (MSPB) and Total Per Capita Cost (TPCC). Additional episode-based cost measures for relevant specialties.

**MIPS payment adjustments (CY2026):**

`Composite MIPS Score → Payment Adjustment Factor`  
Score ≥ 89 (exceptional): \+positive adjustment \+ additional bonus  
Score 75–88: positive adjustment (scaled)  
Score 45–74: neutral (no adjustment)  
Score \< 45: negative adjustment (up to −9% in CY2026)

**Track 2: APM Incentive Payment**

Clinicians who meet the threshold criteria for participation in an Advanced APM:

* Receive a **5% lump-sum APM Incentive Payment** on Medicare Part B allowed charges  
* Are **exempt from MIPS** entirely  
* Beginning 2026, the 5% bonus phases out and is replaced by higher fee schedule updates

**Qualifying APM Participant (QP) thresholds (CY2026):**

Medicare QP threshold: ≥50% of Medicare patients attributed through Advanced APM  
  OR ≥35% of Medicare revenue through Advanced APM

All-Payer QP threshold: ≥50% of all patients through APMs (Medicare \+ other)  
  OR ≥35% of all revenue through APMs

**Advanced APM criteria (42 CFR §414.1415):**

A model must:

1. Require participants to use certified EHR technology  
2. Base payments on quality measures comparable to MIPS quality measures  
3. Bear more than nominal financial risk OR be a Medical Home model expanded by the Innovation Center

**Why this matters for Vermont:** Vermont Blueprint ACO participants and AHEAD hospital-based clinicians are QPs — they receive the 5% APM Incentive Payment and are exempt from MIPS reporting burden. This is a significant financial and administrative advantage.

---

