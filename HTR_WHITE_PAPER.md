# Transforming American Healthcare: The HTR Ecosystem
## A Comprehensive White Paper on the Framework, Tools, and Vermont Implementation Plan

**Health Transformation Review (HTR)**
**Version 1.0 | May 2026**
**Prepared for: Institutional Partners, State Agency Leaders, and Policy Professionals**

---

## TABLE OF CONTENTS

1. Executive Summary
2. The Problem: Why American Healthcare Is Structurally Failing
3. The Framework: Six Pillars of Transformation
4. The HTR Ecosystem: Book, Platform, and Tools
5. Vermont as the National Case Study
6. Acts 167 and 68: Vermont's Legislative Architecture
7. The Technology Pillar: FHIR, Interoperability, and VITL
8. The Health Information Exchange: VITL in Context
9. Agency Integration: ADS, AHS, and GMCB
10. The Economics Pillar: Value-Based Care and Global Budgets
11. The Clinical Pillar: Blueprint, VCCI, SASH, and Designated Agencies
12. The Equity Pillar: SDOH, HEROI, and Population Health
13. Cross-State Evidence: Oregon CCO 3.0 and CalAIM
14. Vermont Health Transformation: Implementation and Project Plan
15. Conclusion

---

## 1. EXECUTIVE SUMMARY

American healthcare spends more per capita than any other nation and delivers worse population health outcomes than most peer countries. The structural causes of this failure are well documented: misaligned payment incentives that reward volume over value, a fragmented data infrastructure that prevents care coordination, persistent health disparities rooted in unaddressed social determinants, and a clinical delivery system designed for episodic acute care rather than longitudinal population health management.

Vermont has become the most important national laboratory for solving these problems. Through a sequence of landmark legislation — Act 167 (2022) and Act 68 (2025) — Vermont is executing the most structurally complete healthcare transformation in the United States: mandatory all-payer global budgets, a primary care investment floor, a federal AHEAD Model participation, an integrated behavioral health architecture, and a statewide health care delivery strategic plan. Vermont has achieved this not through political accident but through two decades of deliberate institutional infrastructure building.

The Health Transformation Review (HTR) ecosystem — comprising the book *Transforming American Healthcare*, the HTR Platform (200+ routes, 24 analytical tools, AI Analyst), and a growing practitioner community — is the only comprehensive knowledge and analytical system built explicitly to support this transformation work. It uses Vermont as its primary teaching case while providing the national comparative evidence (Oregon CCO 3.0, California CalAIM, all 50 states) needed to generalize Vermont's lessons.

This white paper covers the theoretical foundations of health transformation, the full HTR ecosystem, Vermont's legislative and programmatic architecture, the critical role of Health Information Exchange and VITL, the integration of state agency work across ADS, AHS, and GMCB, and culminates in a detailed implementation and project plan for Vermont health transformation through 2030.

---

## 2. THE PROBLEM: WHY AMERICAN HEALTHCARE IS STRUCTURALLY FAILING

### 2.1 The Cost-Quality Paradox

The United States spends approximately $4.5 trillion annually on healthcare — 17.3% of GDP, nearly double the OECD average. Yet on nearly every population health outcome measure — life expectancy, infant mortality, chronic disease prevalence, preventable hospitalization rates, avoidable deaths — the United States performs below the median of peer nations.

This is not a funding problem. It is a structural problem. The structure of American healthcare creates incentives to deliver more services, not better outcomes. Fee-for-service (FFS) payment rewards volume: more procedures, more tests, more admissions. Providers operating under FFS have no financial incentive to keep patients healthy, manage chronic conditions proactively, or coordinate care across settings. The system is optimized for billable encounters, not health.

```
STRUCTURAL FAILURE CASCADE
────────────────────────────────────────────────────────────────
FFS Payment → Volume Incentives → Over-Treatment
             → Fragmented Care → Poor Coordination
             → No Prevention Investment → Avoidable Admissions
             → SDOH Unaddressed → High-Cost Tail Population
             → Cost Escalation → Benefit Cuts → Access Reduction
             → Worse Outcomes → More Acute Care → Repeat
────────────────────────────────────────────────────────────────
```

### 2.2 The Five Structural Failures

**1. Payment Misalignment.** FFS pays for activity, not outcomes. A hospital that prevents 100 readmissions through better discharge planning loses revenue. A primary care practice that invests in proactive chronic disease management reduces specialist referrals and emergency visits — and earns nothing for that reduction. The incentive structure systematically underinvests in prevention and primary care.

**2. Data Fragmentation.** A patient with diabetes, hypertension, depression, and housing instability typically has their clinical data distributed across a primary care EHR, two specialist EHR systems, a pharmacy system, a behavioral health record, and a social services database — none of which communicate with each other. Care coordinators are flying blind. Risk stratification is impossible without complete data. SDOH screening results vanish into paper or siloed systems.

**3. Clinical Delivery Design Mismatch.** The U.S. clinical system is designed for acute episodic care — a hospital visit, a specialist referral, a procedure. Chronic disease management is longitudinal, relational, and community-based. The system is structurally misaligned with the actual burden of disease: 60% of Americans have at least one chronic condition, 40% have two or more, and 5% of patients account for 50% of costs.

**4. Social Determinants Neglect.** Health is 80% determined by factors outside the clinical encounter — housing, food security, transportation, social connection, income, education. American healthcare, structured around billable clinical encounters, has no mechanism to address these factors at scale. The result: high-cost patients cycle through emergency departments and hospitals because their housing instability, food insecurity, and social isolation remain unaddressed between visits.

**5. Equity Gaps.** Healthcare disparities in the United States are not random — they are structural. Black Americans have higher rates of preventable hospitalization, lower rates of PCMH enrollment, and worse chronic disease outcomes than white Americans with similar incomes. Rural Americans have worse access to primary care, higher rates of preventable ED use, and higher per-capita costs than urban populations. These disparities are not explained by behavior alone — they are produced by the structure of the system.

### 2.3 The Transformation Imperative

Solving these structural failures requires simultaneous reform across six interdependent domains. Reform in one domain without the others fails — this is the central insight of the HTR framework and the key lesson of Vermont's own policy history.

---

## 3. THE FRAMEWORK: SIX PILLARS OF TRANSFORMATION

The HTR framework organizes healthcare transformation into six interdependent pillars. The order is not alphabetical — it is causal. Each pillar depends on those that precede it.

```
THE SIX-PILLAR TRANSFORMATION FRAMEWORK
═══════════════════════════════════════════════════════════════════

  PILLAR 1       PILLAR 2        PILLAR 3       PILLAR 4
   POLICY        TECHNOLOGY      ECONOMICS       CLINICAL
 ┌─────────┐   ┌─────────────┐  ┌──────────┐  ┌──────────────┐
 │ Mandate │→  │ Data Infra  │→ │ Payment  │→ │ Care Model   │
 │ Authority│  │ FHIR + HIE  │  │ Reform   │  │ Design       │
 │ Regulate │  │ Analytics   │  │ VBC/APMs │  │ PCMH/ACO     │
 └─────────┘   └─────────────┘  └──────────┘  └──────────────┘
                                                      │
  PILLAR 5       PILLAR 6                             ↓
   EQUITY        OPERATIONS                   Population Health
 ┌──────────┐   ┌──────────────┐              Improvement
 │ SDOH     │   │ Revenue Cycle│
 │ Disparity│   │ Workforce    │
 │ HEROI    │   │ Compliance   │
 └──────────┘   └──────────────┘

═══════════════════════════════════════════════════════════════════
All six pillars must move together. Reform in one without the
others creates partial solutions that fail at scale.
═══════════════════════════════════════════════════════════════════
```

### 3.1 Why Technology Precedes Economics

The sequencing of Technology before Economics is not intuitive to most policy professionals, but it is the most consequential ordering decision in the framework. You cannot price what you cannot measure. Global budgets require total cost of care data across all payers. Risk adjustment requires longitudinal claims and clinical data. Shared savings calculations require attribution logic that depends on complete encounter data. Value-based contracts require quality measurement that depends on HEDIS-coded clinical data.

Every Economics pillar reform — global budgets, alternative payment models, shared savings, reference-based pricing — requires a functioning Technology infrastructure as a prerequisite. Vermont's own history confirms this: the failure of OneCare Vermont's early risk contracting was substantially a data failure. Attribution was wrong, cost data was incomplete, and risk adjustment was unreliable. You cannot build payment reform on a broken data foundation.

This is why the HTR framework places Technology at Pillar 2 and Economics at Pillar 3. This sequence drives narrative, tool design, implementation planning, and the order in which reforms must be staged.

### 3.2 The Fifteen Dependencies

Six pillars produce fifteen pairwise dependencies (6 × 5 ÷ 2). These dependencies are not theoretical — they are predictive. When a dependency is violated — when a pillar is reformed out of sequence or in isolation — the reform fails in specific, traceable ways.

```
PILLAR DEPENDENCY MATRIX
                Policy  Technol  Econom  Clinical  Equity  Operatns
Policy            —       ✓        ✓        ✓         ✓        ✓
Technology        ✓       —        ✓        ✓         —        ✓
Economics         ✓       ✓        —        ✓         ✓        ✓
Clinical          ✓       ✓        ✓        —         ✓        ✓
Equity            ✓       —        ✓        ✓         —        ✓
Operations        ✓       ✓        ✓        ✓         ✓        —

✓ = Documented dependency (reform in column pillar depends on
    or is materially affected by reform in row pillar)
```

Key dependencies to understand:

- **Policy → Technology**: Mandate (e.g., Act 62 in Vermont, 21st Century Cures Act federally) creates the authority and requirement for data governance and HIE participation. Without policy mandate, HIE adoption remains voluntary and fragmented.
- **Technology → Economics**: Data infrastructure enables risk adjustment, attribution, and performance measurement — prerequisites for any value-based payment model.
- **Economics → Clinical**: Payment signals drive clinical behavior. PCMH capitation payments funded Blueprint's Community Health Teams. Global budgets create financial incentive for VCCI's preventive case management. FFS creates incentive against both.
- **Clinical → Equity**: Clinical programs targeting high-risk populations must be designed with SDOH awareness or they will inadvertently exclude the most vulnerable patients who have the most to gain.
- **Policy → Equity**: Equity outcomes cannot be achieved without policy mandates that make equity a performance dimension — not just a reporting requirement. AHEAD's Health Equity Benchmark (HEB) is the first federal payment model to do this explicitly.

---

## 4. THE HTR ECOSYSTEM: BOOK, PLATFORM, AND TOOLS

### 4.1 Overview

The HTR ecosystem is a three-component knowledge and analytical system designed to support healthcare transformation practitioners, policy professionals, students, and institutional leaders.

```
THE HTR ECOSYSTEM ARCHITECTURE
═══════════════════════════════════════════════════════════════════════

          ┌─────────────────────────────────────────────────────┐
          │              SIX-PILLAR FRAMEWORK                   │
          │  Policy → Technology → Economics → Clinical         │
          │                      → Equity → Operations         │
          └─────────────────────────────────────────────────────┘
                    │                              │
                    ↓                              ↓
        ┌─────────────────────┐      ┌──────────────────────────┐
        │      THE BOOK       │      │      THE PLATFORM         │
        │  Transforming       │ ←──→ │  200+ routes             │
        │  American Healthcare│      │  24 Research Lab tools   │
        │  20 chapters        │      │  AI Analyst              │
        │  6 appendices       │      │  The Wire (daily)        │
        │  v28 current        │      │  Community + Connect     │
        └─────────────────────┘      └──────────────────────────┘
                    │                              │
                    └──────── Appendix G ──────────┘
                       (explicit book-platform map)
                                   │
                                   ↓
                    ┌──────────────────────────┐
                    │    AI ANALYST            │
                    │  Cross-reference engine  │
                    │  Available on every page │
                    │  or at /chat             │
                    └──────────────────────────┘

═══════════════════════════════════════════════════════════════════════
```

### 4.2 The Book: Transforming American Healthcare

*Transforming American Healthcare* (v28, current) is a 20-chapter framework text organized around the six-pillar model. It differs from conventional healthcare policy texts in three critical ways:

**1. It is grounded in a complete case.** Vermont is the primary teaching case throughout all 20 chapters because Vermont is the most structurally complete and most data-transparent state-level transformation in the United States. Every theoretical argument has a Vermont empirical test.

**2. It is actionable.** The book contains operational tools: the 65-item VBC Contract Review Checklist (Appendix D), the six-pillar organizational scoring framework (Chapter 1), the HEROI metric (Chapter 13), the 30 operational levers for revenue cycle under global budgets (Chapter 15).

**3. It is linked to live data.** Every chapter has a Platform Companion section mapping the chapter's arguments to specific platform tools and Vermont program pages. Appendix G is a complete cross-reference between every book topic and the platform.

**Chapter Map by Pillar:**

| Pillar | Book Chapters |
|--------|--------------|
| Policy | 4 (Policy Architecture), 5 (Policy in Practice), 18 (Political Sustainability), 20 (AHS Restructuring) |
| Technology | 6 (Technology Infrastructure), 7 (Technology in Practice: AI, RPM, Telehealth) |
| Economics | 8 (Economics Pillar: Global Budgets, FFS Trap), 9 (Economics in Practice: VBC Contracts) |
| Clinical | 10 (Clinical Pillar: Blueprint, VCCI, SASH, DAs), 11 (Clinical in Practice: PCMH, HEDIS) |
| Equity | 12 (Equity Pillar: SDOH, Algorithmic Bias), 13 (Equity in Practice: HEROI) |
| Operations | 14 (Operations: Revenue Cycle, HCC, Workforce), 15 (Operations in Practice: 30 Levers) |
| Cross-cutting | 1 (Framework), 2 (Sequencing), 3 (Vermont Architecture), 16 (Knowledge Transfer), 17 (The Horizon), 19 (Portfolio Management) |

### 4.3 The Platform: Architecture and Capabilities

The HTR Platform is a Next.js-based web application with 200+ routes organized around the six-pillar framework. It provides four categories of capability:

**A. Information Architecture**
Vermont program pages (12+ dedicated pages for Act 167, Act 68, Blueprint, VCCI, SASH, Designated Agencies, SDOH, AHEAD, RHT Program, Medicaid, Legislative Resources, Hospital Profiles), cross-state pages (Oregon CCO 3.0, California CalAIM), and a 50-state explorer with the HTI Dashboard.

**B. Research Lab (24 Tools across 7 Sections)**

```
RESEARCH LAB — 24 TOOLS BY PILLAR SECTION
══════════════════════════════════════════════════════════════════

POLICY & QUALITY (5 tools)       TECHNOLOGY AI (3 tools)
  E.6  Policy Simulator            E.14 AI Governance Lab
  E.7  H.R. 1 Cliff Scenario       E.15 Digital Health Lab
  E.8  Work Requirements Calc      E.16 FHIR Interoperability Lab
  E.9  Innovation Leaderboard
  E.24 Medicaid Eligibility Sim   INTEROPERABILITY (1 tool)
                                   [FHIR Lab, shared with Tech]
PAYMENT MODELS (6 tools)
  E.1  APM Design Lab             POPULATION EQUITY (2 tools)
  E.2  Shared Savings Calculator    E.17 Health Equity Studio
  E.3  CEA Calculator              E.18 Population Health Modeler
  E.4  Global Budget Modeler
  E.5  APM Scenario Builder       KNOWLEDGE WORKSPACE (2 tools)
  E.22 Investment Tracker          E.19 Evidence Library
                                   E.13 VBC Readiness Assessment
VBC CLINICAL QUALITY (3 tools)
  E.10 VBC Quality Measures       PLATFORM-WIDE (3 tools)
  E.11 Clinical Quality Optimizer   E.20 HTR Simulator
  E.12 Risk Stratification Lab      E.21 Transformation Friction Index
                                    E.23 HTI Dashboard

══════════════════════════════════════════════════════════════════
```

**C. Intelligence and Currency**
The Wire (daily policy intelligence feed), trending topics tracker, and changelog keep the platform current. The AI Analyst draws on all platform content, all 20 book chapters, and The Wire's daily items to answer cross-chapter, cross-pillar, cross-state questions.

**D. Community and Connection**
The Community (/community) and Connect (/connect) layers provide a practitioner network with discussion threads, a member directory, toolkits, policy alerts, office hours, and direct expert access.

### 4.4 The AI Analyst

The AI Analyst is the cross-reference engine of the HTR ecosystem. Available on every platform page and at /chat, it knows: all 20 book chapters, all Vermont program pages, all cross-state pages, all 24 Research Lab tool descriptions, and The Wire's recent items. When queried from a specific page (e.g., /vermont-vcci), it automatically attaches that page's context and the corresponding pillar tag.

Its highest-value use cases are cross-pillar synthesis questions that would require reading multiple chapters and multiple platform pages manually:

- "How does VCCI's risk stratification compare to CalAIM's ECM tiering, and what does that imply for Vermont's SDOH investment strategy?"
- "What does the dependency between Technology and Economics mean for the sequencing of Act 68's reference-based pricing implementation?"
- "What is the failure cascade if Vermont's Designated Agencies go financially insolvent in 2027?"

---

## 5. VERMONT AS THE NATIONAL CASE STUDY

### 5.1 Why Vermont

Vermont is a state of approximately 647,000 people — the second smallest state by population in the United States. It is not the obvious choice for a national healthcare transformation case study. The reasons it is the correct choice are structural, not statistical.

**Structural completeness.** Vermont is the only state in the United States that has simultaneously: a mandatory all-payer hospital global budget (Act 68, effective FY2028), active AHEAD Model participation, a statewide primary care medical home program (Blueprint for Health) in all 14 counties, an intensive Medicaid case management program (VCCI), a nationally recognized housing-based care coordination program (SASH), a community behavioral health infrastructure covering every county (Designated Agencies), and an active 1115 waiver (Global Commitment to Health) supporting the full care continuum. No other state has all of these simultaneously.

**Data transparency.** Vermont publishes more healthcare data than any other state of comparable size. The Green Mountain Care Board publishes hospital budget submissions, financial reviews, and performance data. AHS publishes monthly Act 68 implementation updates. The Blueprint publishes annual reports to the legislature. This data transparency makes Vermont uniquely analyzable.

**Causal density.** Because Vermont is small and its transformation is deep, the causal relationships between policy changes and outcomes are more observable than in larger, more heterogeneous states. Vermont is, in effect, a healthcare transformation laboratory at a scale where the experiment can be observed end-to-end.

### 5.2 Vermont's Transformation Timeline

```
VERMONT HEALTH TRANSFORMATION — KEY MILESTONES
═══════════════════════════════════════════════════════════════════

2006  ──── Blueprint for Health established in statute
           First state-legislated PCMH model in the US

2010  ──── Act 128: Blueprint expanded statewide
           Community Health Teams in every county
           All-payer PCMH payment model activated

2011  ──── SASH Program launched under Blueprint infrastructure
           Housing-based care for Medicare seniors begins

2012  ──── Vermont single-payer (Green Mountain Care) attempt
           Abandoned 2014 — financing mechanism unresolved
           LESSON: Economics reform without Technology prereqs fails

2015  ──── OneCare Vermont ACO formed
           First attempt at VBC at scale

2019  ──── Vermont All-Payer ACO Model (AHEAD precursor)
           Blueprint practices become ACO primary care foundation

2022  ──── Act 167 enacted
           GMCB authority over hospital spending expanded
           Oliver Wyman report commissioned
           RHT Program ($195M) authorized

2025  ──── Act 68 enacted (most consequential since GMCB creation)
           Reference-based pricing mandated FY2027
           Hospital global budgets mandated FY2028–2030
           Statewide Health Care Delivery Strategic Plan by Dec 2028

2026  ──── AHEAD Model active (Vermont + 5 states)
           Blueprint: 128 practices, 34+ CHWs, MHI launched
           VCCI 4-tier model operational
           Act 68 implementation underway

2027  ──── Reference-based pricing effective
           HIE full participation requirements active

2028  ──── Hospital global budgets begin
           Statewide Strategic Plan filed

2030  ──── Full AHEAD Model performance period
           Target: Measurable TCOC reduction
                   Primary care investment floor met
                   Health equity benchmarks demonstrated

═══════════════════════════════════════════════════════════════════
```

---

## 6. ACTS 167 AND 68: VERMONT'S LEGISLATIVE ARCHITECTURE

### 6.1 Act 167 (2022): Expanding the Foundation

Act 167 of 2022 is a healthcare affordability law that significantly expanded the Green Mountain Care Board's authority over hospital and insurance spending. Its key provisions:

**Hospital spending authority.** The GMCB gained authority to set hospital budget parameters and enforce spending targets. Hospitals exceeding their budgets face accountability mechanisms including required corrective action plans.

**Rural Health Transformation Program.** Act 167 authorized the $195M RHT Program — a multi-year investment in rural healthcare infrastructure including capital grants for critical access hospitals, workforce recruitment and retention funding, telehealth infrastructure, and behavioral health integration in primary care.

**Oliver Wyman commission.** Act 167 commissioned the Oliver Wyman report that provided the analytical foundation for Act 68 — a comprehensive assessment of Vermont's healthcare system and a blueprint for global budget implementation.

**Insurance spending oversight.** Enhanced GMCB authority over commercial insurance premium increases and health benefit designs, tightening the all-payer coordination mechanism.

### 6.2 Act 68 (2025): The Transformation Mandate

Act 68 of 2025 is the most consequential healthcare legislation in Vermont since the Green Mountain Care Board's creation. It mandates a specific reform sequence:

```
ACT 68 — IMPLEMENTATION TIMELINE
═══════════════════════════════════════════════════════════════════

FY2027:   Reference-Based Pricing
          ┌──────────────────────────────────────────────────┐
          │ Hospitals must price services using a reference   │
          │ pricing formula tied to Medicare rates plus an    │
          │ allowed percentage. Eliminates the opacity of     │
          │ chargemaster pricing. Creates price transparency  │
          │ as a precondition for global budget setting.      │
          └──────────────────────────────────────────────────┘

FY2028:   Hospital Global Budgets Begin
          ┌──────────────────────────────────────────────────┐
          │ Prospective annual budgets set for all Vermont    │
          │ hospitals. Budget = historical base + population  │
          │ need adjustment + quality performance factor.     │
          │ Replaces revenue-per-admission incentive with     │
          │ population health accountability.                 │
          └──────────────────────────────────────────────────┘

FY2028–2030: Budget Transition Period
          ┌──────────────────────────────────────────────────┐
          │ Phased transition allowing hospital revenue cycle │
          │ operations to adapt. GMCB monitors quarterly.    │
          │ Corrective action triggered if >5% budget excess. │
          └──────────────────────────────────────────────────┘

Dec 2028: Statewide Health Care Delivery Strategic Plan
          ┌──────────────────────────────────────────────────┐
          │ AHS must file a comprehensive statewide plan      │
          │ covering: primary care capacity, workforce,       │
          │ behavioral health integration, aging population   │
          │ strategy, SDOH investment roadmap, and HIE        │
          │ integration requirements.                         │
          └──────────────────────────────────────────────────┘

═══════════════════════════════════════════════════════════════════
```

**Why this sequence is correct.** Reference-based pricing (FY2027) comes before global budgets (FY2028) because you cannot set a global budget without price transparency. The budget-setting process requires knowing what hospitals charge and what the reference price is. This is the Technology → Economics dependency in legislative form: create the data and pricing transparency infrastructure before imposing the budget mechanism.

**The GMCB's role under Act 68.** The Green Mountain Care Board is the regulatory authority for Act 68. Its responsibilities include: setting hospital budget parameters annually, reviewing hospital performance against budget, approving reference price schedules, monitoring the transition period, and reporting to the legislature on implementation progress. The GMCB is not a managed care organization — it is a rate-setting and accountability body. It does not manage care. It creates the financial environment in which care management organizations (Blueprint, VCCI, OneCare) operate.

---

## 7. THE TECHNOLOGY PILLAR: FHIR, INTEROPERABILITY, AND THE DATA FOUNDATION

### 7.1 Why Technology Is Pillar 2

Technology infrastructure is the enabling condition for every subsequent reform. This point cannot be overstated. Without complete, interoperable, longitudinal health data:

- Risk stratification (VCCI, AHEAD) cannot identify the right patients
- Attribution (ACO models, global budgets) cannot assign patients to providers accurately
- Quality measurement (HEDIS, CMS quality metrics) cannot be computed reliably
- Population health management (Blueprint CHTs, SASH coordinators) operates without complete information
- Cost accounting (total cost of care models, global budget setting) cannot be trusted

Vermont recognized this in statute. Act 62 (2010) established Vermont's Health Information Technology governance framework, created the Vermont Health Information Technology Plan, and established VITL (Vermont Information Technology Leaders) as the state's designated Health Information Organization (HIO). This legislative mandate preceded Vermont's all-payer model work by nearly a decade.

### 7.2 FHIR and the Interoperability Revolution

**What FHIR Is.** HL7 FHIR (Fast Healthcare Interoperability Resources) is the current standard for healthcare data exchange. FHIR R4 (the current release) defines a set of data resources — Patient, Observation, MedicationRequest, Condition, Encounter, etc. — and REST APIs for accessing and exchanging them. FHIR is not a product — it is a specification that EHR vendors, HIEs, and health IT systems implement.

**Why FHIR Matters for Vermont.** Vermont's transformation depends on data flows that cross organizational boundaries: between hospitals, primary care practices, behavioral health providers, the Blueprint's CHTs, VCCI case managers, SASH coordinators, social service agencies, and payers (Medicaid, Medicare, commercial). Every one of these handoffs requires data exchange. FHIR is the mechanism through which these exchanges can be standardized and automated.

```
VERMONT HEALTH DATA FLOW ARCHITECTURE
═══════════════════════════════════════════════════════════════════

  CLINICAL DATA SOURCES                 ADMINISTRATIVE DATA SOURCES
  ┌─────────────────────┐               ┌─────────────────────────┐
  │ Hospital EHRs       │               │ DVHA Medicaid Claims    │
  │ (Epic, Meditech)    │               │ Medicare Claims (CMS)   │
  │ Primary Care EHRs   │               │ Commercial Claims       │
  │ (Epic, eClinWorks)  │               │ GMCB Hospital Budgets   │
  │ BH EHRs (DAs)       │               │ APM Encounter Data      │
  └────────┬────────────┘               └──────────┬──────────────┘
           │                                        │
           │  HL7 / FHIR R4                         │  EDI / FHIR
           ▼                                        ▼
  ┌─────────────────────────────────────────────────────────────┐
  │              VERMONT HEALTH INFORMATION EXCHANGE             │
  │                        (VITL)                               │
  │                                                             │
  │  Master Patient Index (MPI)  │  Record Locator Service     │
  │  Clinical Document Archive   │  Care Alerts                │
  │  Care Summary Delivery       │  SDOH Screening Repository  │
  └───────────────────────────────────┬─────────────────────────┘
                                      │
                    ┌─────────────────┼─────────────────┐
                    ▼                 ▼                  ▼
          ┌──────────────┐  ┌─────────────────┐  ┌──────────────┐
          │  VHCURES     │  │  Blueprint CHT  │  │  VCCI        │
          │  All-Payer   │  │  Care Management│  │  Case Mgmt   │
          │  Claims DB   │  │  Platform       │  │  Platform    │
          └──────────────┘  └─────────────────┘  └──────────────┘
                    │                 │                  │
                    └─────────────────┴──────────────────┘
                                      │
                                      ▼
                          ┌───────────────────┐
                          │  GMCB / AHS       │
                          │  Analytics &      │
                          │  Reporting        │
                          └───────────────────┘

═══════════════════════════════════════════════════════════════════
```

### 7.3 The 21st Century Cures Act and Federal Interoperability Mandates

The 21st Century Cures Act (2016) and its implementing regulations (ONC Final Rule, 2020; CMS Interoperability Rule, 2020) created the federal framework for interoperability that Vermont's state-level work now operates within:

- **Information blocking prohibition.** EHR vendors, health systems, and HIEs are prohibited from practices that impede the access, exchange, or use of electronic health information. This is critical for Vermont's HIE strategy — it removes the legal cover that large health systems historically used to resist data sharing.
- **SMART on FHIR requirements.** Patient access APIs using SMART on FHIR R4 are now required for all CMS-regulated payers and most hospital EHR systems. This creates a technical baseline on which Vermont's more advanced data-sharing requirements can build.
- **Trusted Exchange Framework (TEFCA).** The ONC's TEFCA creates a national framework for cross-organizational data exchange that Vermont's VITL participation connects to, enabling Vermont data exchange with out-of-state providers for patients who receive care across state lines.

### 7.4 VHCURES: Vermont's All-Payer Claims Database

VHCURES (Vermont Health Care Uniform Reporting and Evaluation System) is Vermont's all-payer claims database — one of the most comprehensive in the United States. It collects claims data from all payers operating in Vermont: Medicaid (DVHA), Medicare (CMS), and all commercial insurers.

VHCURES is the primary data source for:
- Total cost of care calculations (AHEAD Model, global budget setting)
- Risk adjustment and member attribution (OneCare, VCCI)
- Population health analytics (Blueprint performance measurement)
- GMCB hospital budget review
- The HTR Platform's research tools (APM Design Lab, Global Budget Modeler)

The completeness and quality of VHCURES data is the single most important technical factor in Vermont's ability to implement global budgets. If a hospital system's claims are not fully and accurately submitted to VHCURES, the budget-setting process is compromised.

### 7.5 AI Governance in Clinical Settings

Vermont's technology infrastructure now includes AI-powered clinical tools: AI scribes reducing administrative burden in primary care, diagnostic AI for radiology and pathology, remote patient monitoring (RPM) systems for chronic disease management, and predictive analytics for risk stratification.

The governance challenge is significant. AI tools embedded in clinical workflows create accountability gaps — when an AI diagnostic tool contributes to a misdiagnosis, who is responsible? Vermont's Act 62 framework and the Blueprint's governance structure provide a starting point, but AI-specific clinical governance is an emerging requirement.

The HTR Platform's AI Governance Lab (Research Lab, technology-ai section) implements a full AI Clinical Governance Lifecycle — a structured scoring framework for evaluating AI vendor tools against safety, equity, transparency, and accountability criteria. This is the operational implementation of the governance framework described in the book's Chapter 7.

---

## 8. THE HEALTH INFORMATION EXCHANGE: VITL IN CONTEXT

### 8.1 What VITL Is

Vermont Information Technology Leaders (VITL) is Vermont's designated statewide Health Information Organization (HIO) — the organization responsible for operating Vermont's Health Information Exchange (HIE). VITL connects Vermont's hospitals, primary care practices, behavioral health providers, and long-term care facilities into a shared data infrastructure that enables care coordination, medication reconciliation, and population health analytics across organizational boundaries.

VITL operates under a mandate established by Act 62 (2010) and subsequent legislation. Its core services include:

**Master Patient Index (MPI).** A statewide patient matching system that creates a unique identifier for each Vermont resident across all participating healthcare organizations. The MPI is the foundation of care coordination — without accurate patient matching, data from different EHR systems cannot be reliably linked to the same individual.

**Clinical Document Architecture (CDA) Exchange.** VITL receives and routes clinical documents — Continuity of Care Documents (CCDs), discharge summaries, operative notes, lab results, and medication lists — between participating organizations using HL7 CDA standards.

**Care Alerts.** Real-time notifications to primary care providers and care coordinators when a patient is admitted to a hospital, discharged from an ED, or transfers between care settings. Care alerts enable the 24-hour follow-up protocols that are critical for preventing readmissions.

**Record Locator Service.** Enables authorized providers to discover where a patient's records exist across all VITL-connected organizations and request them on demand.

**SDOH Screening Repository.** An emerging VITL capability to store and share SDOH screening results — housing instability screens, food insecurity screens, PHQ-9 depression screens — across care settings, so that a result from a primary care SDOH screening is visible to an ED clinician treating the same patient for a housing-related health crisis.

### 8.2 VITL's Role in Vermont's Transformation Architecture

VITL is not a peripheral infrastructure component — it is a structural prerequisite for Vermont's transformation. Every major clinical program in Vermont depends on VITL:

```
VITL — CONNECTIONS TO CLINICAL PROGRAMS
═══════════════════════════════════════════════════════════════════

VITL
 │
 ├── VCCI (Chronic Care Initiative)
 │     VITL care alerts trigger 30-day TCM protocols
 │     EHR data feeds VCCI risk stratification engine
 │     Case manager care plan shared via CDA exchange
 │
 ├── Blueprint for Health
 │     CHT care coordinators receive VITL care alerts
 │     Post-discharge follow-up protocol driven by VITL
 │     Panel management data aggregated from VITL-connected EHRs
 │
 ├── SASH Program
 │     SASH coordinators receive hospital admission alerts
 │     Medication reconciliation supported by VITL CDA exchange
 │     SDOH screening results shared to clinical providers
 │
 ├── Designated Agencies (11 DAs)
 │     BH encounter data exchanged to PCPs via VITL
 │     Crisis service encounters trigger primary care alerts
 │     Medication reconciliation for BH/PCP transitions
 │
 ├── AHEAD Model / OneCare Vermont
 │     ACO attribution requires VITL encounter data
 │     Total cost of care calculation supplements VHCURES
 │     Quality measurement supported by VITL clinical data
 │
 └── GMCB Budget Review
       Hospital budget submissions cross-referenced to VITL data
       Performance monitoring uses VITL-derived quality metrics

═══════════════════════════════════════════════════════════════════
```

### 8.3 VITL's Current Gaps and Integration Challenges

Despite its foundational role, VITL faces significant operational and strategic challenges:

**Participation gaps.** Not all Vermont healthcare organizations are fully connected to VITL. Small independent practices, some behavioral health providers, and rural critical access hospitals have inconsistent or incomplete VITL participation. These gaps create holes in the patient data picture that undermine risk stratification accuracy.

**FHIR transition.** VITL historically operated on HL7 v2 and CDA standards. The federal mandate for FHIR R4 APIs requires a significant technical transition. VITL's FHIR implementation roadmap is critical to Vermont's compliance with 21st Century Cures requirements and to enabling the patient-facing data access that modern care management tools require.

**SDOH data integration.** Connecting clinical SDOH screening data (PHQ-9, AHC HRSN, AUDIT-C) with social service data (2-1-1 Vermont, community action agencies, housing programs) is technically complex and legally constrained by different privacy frameworks (HIPAA for health data, state privacy laws for social service data). Vermont has not yet achieved this integration at scale.

**Behavioral health data.** Federal 42 CFR Part 2 regulations create significant restrictions on the sharing of substance use disorder treatment data — even within Vermont's HIE. These restrictions create a structural gap in the integrated data picture: a patient's SUD treatment history is often invisible to their primary care provider and to VCCI case managers unless the patient has provided specific consent.

**Real-time data latency.** Most VITL data flows operate on batch schedules (daily or weekly). For real-time care coordination — ED diversions, same-day medication reconciliation, immediate post-discharge follow-up — batch data is insufficient. Real-time FHIR APIs are required.

### 8.4 Integrating VITL with ADS, AHS, and GMCB: The Strategic Opportunity

The full value of Vermont's HIE infrastructure is realized only when VITL data is integrated with the analytical and operational systems of Vermont's key state agencies. This integration is currently incomplete and represents Vermont's most important near-term technology opportunity.

**Vermont Agency of Digital Services (ADS).** ADS is the state agency responsible for state government IT infrastructure, enterprise applications, and digital services. ADS manages the state's data governance framework, enterprise architecture standards, and interoperability policies across state agencies. For Vermont's health transformation:

- ADS is the technical partner for building the data integration layer between VITL and state Medicaid systems (MMIS — Medicaid Management Information System)
- ADS manages the state's cloud infrastructure and data warehousing capabilities that support DVHA's analytics
- ADS sets enterprise API standards that govern how state systems exchange data with VITL
- ADS is the entity responsible for implementing the Statewide Health Care Delivery Strategic Plan's technology components (required by Act 68 by December 2028)

**Vermont Agency of Human Services (AHS).** AHS oversees DVHA (Medicaid), the Department of Mental Health (DMH), the Department of Disabilities, Aging, and Independent Living (DAIL), and the Department of Children and Families (DCF). AHS is the operational owner of:

- VCCI (run by DVHA under AHS)
- Designated Agency contracts (managed by DMH under AHS)
- SASH coordination with housing programs (DAIL under AHS)
- 1115 waiver (Global Commitment to Health — DVHA under AHS)
- Act 68 Statewide Strategic Plan development and filing

AHS is also the primary state agency interface with CMS for AHEAD Model implementation, Medicaid waiver management, and federal quality reporting. AHS's data needs — for VCCI operations, DA oversight, AHEAD performance measurement — drive the requirements for VITL integration and DVHA MMIS modernization.

**Green Mountain Care Board (GMCB).** The GMCB is Vermont's independent regulatory body for hospital spending, insurance rates, and health technology governance. Under Act 68, the GMCB:

- Sets hospital budget parameters annually
- Reviews hospital performance against budget and imposes corrective action
- Approves reference price schedules (FY2027)
- Oversees the AHEAD Model's Vermont implementation
- Publishes hospital financial performance data (used by the HTR Platform's Hospital Profiles)

The GMCB's analytical capabilities depend directly on VITL data quality. Budget-setting requires accurate total cost of care data. Performance monitoring requires quality metrics derived from clinical data. The GMCB cannot effectively regulate hospital budgets without a complete, reliable data picture from VITL and VHCURES.

```
AGENCY INTEGRATION ARCHITECTURE
═══════════════════════════════════════════════════════════════════════

     VITL (HIE)                ADS (IT Infrastructure)
         │                            │
         │  Clinical data             │  Enterprise IT
         │  Care alerts               │  API standards
         │  CDA exchange              │  Cloud/data warehouse
         │  SDOH data                 │  MMIS integration
         │                            │
         └──────────┬─────────────────┘
                    │
                    ▼
         ┌──────────────────┐
         │    SHARED        │
         │  DATA LAYER      │
         │  (VHCURES +      │
         │   VITL +         │
         │   MMIS)          │
         └────────┬─────────┘
                  │
        ┌─────────┼─────────┐
        ▼         ▼         ▼
    ┌────────┐ ┌──────┐ ┌──────┐
    │  AHS   │ │ GMCB │ │ ADS  │
    │ DVHA   │ │Budget│ │ Data │
    │ DMH    │ │ Reg. │ │ Gov. │
    │ DAIL   │ │ AHEAD│ │      │
    └───┬────┘ └──────┘ └──────┘
        │
   ┌────┴────────────────┐
   │ Clinical Programs   │
   │ VCCI · Blueprint    │
   │ SASH · DAs · AHEAD  │
   └────────────────────┘

═══════════════════════════════════════════════════════════════════════
```

### 8.5 VITL Strategic Integration Priorities

Based on the current state of Vermont's transformation and the requirements of Act 68, the following VITL integration priorities are critical for the 2026–2030 period:

**Priority 1: FHIR R4 Full Implementation.** Complete VITL's transition to FHIR R4 APIs for all data exchange, enabling real-time patient data access by authorized care management systems (VCCI, Blueprint, SASH, DA case managers). Target: FY2026–2027.

**Priority 2: Real-Time Care Alert Expansion.** Extend VITL care alerts to include not just hospital admissions and discharges but also ED visits, SNF admissions, and outpatient specialty encounters. Real-time alerts are a prerequisite for 24-hour TCM protocols. Target: FY2027.

**Priority 3: SDOH Data Integration.** Build the technical and governance infrastructure to share LOINC-coded SDOH screening results between clinical providers, VCCI case managers, Blueprint CHTs, and 2-1-1 Vermont. Requires both technical integration (FHIR Observation resources for SDOH screens) and governance (patient consent framework, privacy protections). Target: FY2027–2028.

**Priority 4: 42 CFR Part 2 Compliant SUD Data Exchange.** Work with the federal government on the 2024 Part 2 rule changes (which partially aligned SUD data sharing with HIPAA) to implement consent-based SUD data exchange through VITL. Enables integrated care management for the highest-cost, highest-complexity population in Vermont. Target: FY2027.

**Priority 5: VITL-MMIS Integration for VCCI.** Create a real-time bidirectional data connection between VITL clinical data and DVHA's MMIS claims data to support VCCI's risk stratification engine. Currently, VCCI relies on batch claims data — real-time clinical data would enable more accurate risk identification and faster intervention. Target: FY2026.

**Priority 6: Global Budget Data Infrastructure.** Build the VITL data infrastructure required to support Act 68 hospital global budgets — real-time hospital encounter data, reference price tracking, and budget performance monitoring. This infrastructure must be operational by FY2027 to support the FY2028 budget transition. Target: FY2026–2027.

---

## 9. AGENCY INTEGRATION: ADS, AHS, AND GMCB — ROLES AND COORDINATION

### 9.1 The Coordination Problem

Vermont's healthcare transformation involves three agencies with distinct statutory authorities, organizational cultures, and technical capabilities operating on an integrated reform agenda. The coordination failure modes are real and have occurred:

- AHS and GMCB have historically had jurisdictional tensions over hospital regulation
- ADS and AHS have not always coordinated on IT system development (MMIS modernization delays)
- VITL governance has involved all three agencies without clear decision authority

Act 68 implicitly requires a coordination mechanism that does not currently exist in statute: a joint AHS-GMCB-ADS governance body for the technology and data infrastructure that underpins the global budget system.

### 9.2 Recommended Governance Structure

```
VERMONT HEALTH TRANSFORMATION GOVERNANCE
═══════════════════════════════════════════════════════════════════

                    GOVERNOR'S OFFICE
                          │
            ┌─────────────┼─────────────────┐
            ▼             ▼                 ▼
          AHS            GMCB              ADS
     (Clinical &       (Regulatory       (Technology
      Programs)          Authority)       Platform)
            │             │                 │
            └──────┬───────┘                 │
                   ▼                         │
        HEALTH TRANSFORMATION         ───────┘
        STEERING COMMITTEE
        (AHS Sec + GMCB Chair
         + ADS Commissioner)
                   │
     ┌─────────────┼────────────────┐
     ▼             ▼                ▼
  DVHA/VCCI    Blueprint /      VITL / HIE
  Operations   SASH / DA        Integration
  Workgroup    Workgroup        Workgroup

═══════════════════════════════════════════════════════════════════
```

### 9.3 ADS Responsibilities in Health Transformation

ADS's role in Vermont's health transformation is often underappreciated. As the state's IT authority, ADS is responsible for:

1. **MMIS Modernization.** Vermont's Medicaid Management Information System is the operational backbone of DVHA's claims processing, eligibility determination, and payment operations. Modernizing MMIS to support real-time FHIR data exchange, enhanced analytics, and global budget accounting is an ADS-led project with AHS as the primary customer.

2. **Enterprise Data Architecture.** ADS sets the standards for how state data systems share data with each other and with external entities like VITL. The standards ADS sets determine whether Vermont's data infrastructure can support the integrated analytics required for AHEAD performance measurement and global budget management.

3. **Cybersecurity and Compliance.** Healthcare data is subject to HIPAA. State Medicaid data is subject to additional federal regulations. ADS is the entity responsible for ensuring Vermont's state health IT infrastructure meets these requirements — including the increasingly sophisticated cyber threats targeting healthcare systems.

4. **Act 68 Technology Implementation.** The Statewide Health Care Delivery Strategic Plan required by Act 68 (due December 2028) will have a substantial technology component. ADS is the technical author of that plan's IT sections.

### 9.4 AHS Responsibilities and the DVHA-DMH-DAIL Integration Challenge

AHS manages three departments that are each critical to Vermont's transformation and that historically have operated in silos:

**DVHA (Department of Vermont Health Access)** manages Medicaid, the 1115 waiver, VCCI, and Vermont's participation in the AHEAD Model. DVHA is the primary clinical policy and payment arm of Vermont's transformation.

**DMH (Department of Mental Health)** manages the DA system — contracts with all 11 Designated Agencies, crisis services funding, and behavioral health workforce development. DMH and DVHA have historically had poor data integration: a Medicaid member in a DA mental health crisis may have their DA encounter data completely invisible to DVHA's VCCI case manager.

**DAIL (Department of Disabilities, Aging, and Independent Living)** manages SASH partnerships, long-term care programs, and aging services. DAIL's data on SASH participant outcomes is not systematically integrated with DVHA's Medicaid data — making it difficult to measure SASH's impact on Medicaid costs.

The AHS integration challenge is fundamentally a data governance challenge: how does Vermont create a longitudinal, integrated data picture of a Medicaid member who simultaneously interacts with DVHA (for Medicaid benefits), DMH (through a DA for mental health), and DAIL (through SASH for housing-based care coordination)?

The answer requires: VITL as the clinical data backbone, a shared SDOH data layer, aligned privacy governance across DVHA/DMH/DAIL, and an integrated care management platform that presents a unified member view to case managers, CHT coordinators, and SASH coordinators.

---

## 10. THE ECONOMICS PILLAR: VALUE-BASED CARE AND GLOBAL BUDGETS

### 10.1 The Fee-for-Service Trap

Fee-for-service (FFS) is not merely a payment mechanism — it is an incentive structure that shapes every clinical, organizational, and investment decision made by healthcare providers. Under FFS:

- Revenue is proportional to volume: more procedures, tests, and admissions = more revenue
- Prevention reduces revenue: a successfully managed diabetic patient who avoids a hospitalization generates less revenue than one who is admitted
- Care coordination is unreimbursed: a care manager who prevents three readmissions generates no billable encounters
- Primary care is systematically undervalued relative to specialty and procedural care

Vermont's four failed global budget attempts before Act 68 (Green Mountain Care, OneCare Vermont's early iterations) demonstrate that you cannot transition from FFS to global budgets without first building the data infrastructure (Technology Pillar), the primary care management capacity (Blueprint, VCCI), and the political architecture (GMCB authority) required to make global budgets work.

### 10.2 Alternative Payment Models: The Spectrum

```
PAYMENT MODEL EVOLUTION
═══════════════════════════════════════════════════════════════════

FEE-FOR-SERVICE          VALUE-BASED CARE            GLOBAL BUDGET
      │                        │                            │
      ▼                        ▼                            ▼
Pay per visit         Pay for outcomes              Pay prospective
                                                    population budget
  HIGH VOLUME           SHARED RISK                 FULL RISK
  FFS BILLING        SHARED SAVINGS             GLOBAL ACCOUNTABILITY

Models:               Models:                    Models:
• Traditional FFS     • MSSP ACO (Medicare)      • Hospital Global Budget
• Episode payments    • AHEAD Model              • State-Level TCOC
• P4P bonuses         • Commercial VBC           • Maryland HSCRC Model
                      • PCMH capitation          • Vermont Act 68

Risk direction:       Risk direction:            Risk direction:
Provider has no       Provider shares            Provider bears full
downside risk         downside risk              population risk
for utilization       with payer                 for cost & quality

═══════════════════════════════════════════════════════════════════
```

### 10.3 The AHEAD Model

The Accountable Health Communities AHEAD (All-Payer Health Equity Approaches and Development) Model is a CMS Innovation Center (CMMI) model in which states commit to achieving total cost of care reduction for their Medicare population while meeting primary care investment floors and health equity benchmarks.

Vermont is one of six AHEAD Model participants (with Connecticut, Hawaii, Maryland, Minnesota, and New Hampshire). Vermont's AHEAD participation:

- Commits to a Primary Care Investment (PCI) target — a percentage of total health spending directed to primary care
- Requires a Health Equity Benchmark (HEB) — measurable equity targets for specific populations
- Participates in Hospital Global Budget (HGB) arrangements for AHEAD-participating hospitals
- Receives CMMI technical assistance and upfront infrastructure payments

AHEAD is the federal framework within which Act 68's hospital global budgets operate. Act 68's FY2028 global budget mandate aligns Vermont's state law with its AHEAD Model commitments.

### 10.4 The 65-Item VBC Contract Review Checklist (Appendix D)

The most operationally cited artifact in the HTR book is the 65-item Value-Based Care Contract Review Checklist in Appendix D. Any organization entering a VBC contract — shared savings, capitation, global budget, episode payment — should walk through all 65 items with their legal, finance, and clinical leadership teams.

Key checklist domains:
1. Attribution methodology (how are patients attributed to this contract?)
2. Risk adjustment methodology (is the patient population fairly risk-adjusted?)
3. Quality measure specifications (which measures, which data sources, which benchmarks?)
4. Financial terms (shared savings percentage, loss corridors, stop-loss provisions)
5. Data sharing requirements (what data does the payer provide? What do you report?)
6. Term and termination provisions (exit provisions, performance cure periods)
7. Equity requirements (are equity metrics in the contract? What are the consequences?)

---

## 11. THE CLINICAL PILLAR: BLUEPRINT, VCCI, SASH, AND DESIGNATED AGENCIES

### 11.1 Vermont's Integrated Clinical Architecture

Vermont's clinical transformation infrastructure is the most integrated in the United States. Four programs — Blueprint for Health, VCCI, SASH, and the Designated Agency system — operate as a tiered, interconnected system that covers Vermont's entire population from low-risk preventive care to intensive case management for the highest-cost members.

```
VERMONT CLINICAL CARE ARCHITECTURE — TIERED POPULATION MANAGEMENT
═══════════════════════════════════════════════════════════════════

POPULATION RISK LEVEL        PROGRAM                  INTENSITY
═══════════════════════════════════════════════════════════════════

VERY HIGH RISK          ┌─────────────────────────┐
(top 5% of cost,        │  VCCI INTENSIVE          │  HIGHEST
CDPS ≥ 3.5)             │  Case Management         │
                        │  Dedicated case manager  │
                        │  Shared care plan        │
                        │  Monthly touchpoints     │
                        └─────────────────────────┘

HIGH RISK               ┌─────────────────────────┐
(top 5–15%,             │  VCCI HIGH TIER          │  HIGH
CDPS ≥ 2.0)             │  Case Management         │
                        │  Bi-monthly touchpoints  │
                        │  Community resource nav  │
                        └─────────────────────────┘

MEDIUM RISK             ┌─────────────────────────┐
(CDPS ≥ 1.0,            │  BLUEPRINT CHT           │  MODERATE
score 35–59)            │  Care Coordination       │
                        │  CHW + RN + BH support   │
                        │  SDOH navigation         │
                        └─────────────────────────┘

SENIORS IN              ┌─────────────────────────┐
AFFORDABLE              │  SASH PROGRAM            │  MODERATE
HOUSING                 │  Housing-Based Care Coord│
(Medicare)              │  Wellness nurse + coord  │
                        │  Group wellness programs │
                        └─────────────────────────┘

BEHAVIORAL HEALTH       ┌─────────────────────────┐
COMPLEX                 │  DESIGNATED AGENCIES     │  VARIABLE
(MH/SUD/DD)             │  (11 Regional DAs)       │
                        │  Outpatient MH + SUD     │
                        │  Crisis services         │
                        │  Community rehab         │
                        └─────────────────────────┘

GENERAL POPULATION      ┌─────────────────────────┐
(all Vermont            │  BLUEPRINT FOR HEALTH    │  FOUNDATION
residents)              │  128 PCMH Practices      │
                        │  All-payer PCMH payment  │
                        │  Proactive panel mgmt    │
                        └─────────────────────────┘

═══════════════════════════════════════════════════════════════════
```

### 11.2 Vermont Blueprint for Health

Established in statute in 2006, the Blueprint for Health is Vermont's foundational primary care transformation initiative — the clinical backbone on which VCCI, SASH, and AHEAD all depend.

**Core components:**
- **128 Patient-Centered Medical Home (PCMH) practices** across all 14 Vermont counties, receiving per-member-per-month payments from all payers (Medicare, Medicaid, commercial) for achieving NCQA PCMH recognition
- **Community Health Teams (CHTs)** in every Health Service Area — multidisciplinary teams including CHWs, RNs, behavioral health specialists, and health coaches providing care coordination, SDOH navigation, and transition of care support
- **Mental Health Integration (MHI)** initiative (launched 2023) embedding BH screening and brief intervention directly in primary care visits
- **All-payer payment model** requiring Medicare, Medicaid, and all commercial payers participating in Vermont to contribute to PCMH payments — the most complete all-payer alignment of any state primary care program

The Blueprint's 2025 Annual Report documents: 128 participating practices, 14 Health Service Areas fully staffed, 34+ FTE CHWs deployed, 17 new behavioral health and SUD team members funded through Pilot funding, and Act 68's new Steering Committee for Comprehensive Primary Health Care designating the Blueprint as the primary care foundation for the global budget transition.

### 11.3 Vermont Chronic Care Initiative (VCCI)

VCCI is the most clinically intensive program in Vermont's transformation architecture. Operated by DVHA under the Global Commitment to Health 1115 waiver, VCCI targets the top 5–15% of Medicaid members by predicted cost and clinical complexity.

**The VCCI Risk Stratification Methodology:**

VCCI uses a multi-domain composite scoring methodology combining four data domains:

| Domain | Weight | Key Triggers |
|--------|--------|-------------|
| Utilization (ED + IP) | 35% | ≥3 ED visits (12 pts), ≥2 IP admissions (10 pts), 30-day readmission (8 pts) |
| Chronic Condition Burden (CDPS) | 30% | Very High category ≥4.0 (12 pts), 2+ High categories (10 pts), polypharmacy (8 pts) |
| SDOH Vulnerability | 20% | Housing instability (6 pts), food insecurity (4 pts), active SUD with treatment gap (4 pts) |
| Care Gaps & Access | 15% | Medication PDC <60% (5 pts), HEDIS quality gap (3-5 pts), no PCP visit 6 months (5 pts) |

**The four risk tiers:**

| Tier | Score | CDPS | Action |
|------|-------|------|--------|
| Very High | ≥80 | ≥3.5 | VCCI intensive — dedicated case manager, shared care plan, monthly touchpoints |
| High | 60-79 | ≥2.0 | VCCI — bi-monthly touchpoints, community resource navigation |
| Medium | 35-59 | ≥1.0 | Blueprint CHT referral — re-evaluate in 90 days |
| Low | <35 | <1.0 | Standard preventive outreach |

**Why VCCI matters under global budgets.** Under FFS, VCCI's value is invisible — the hospitalizations it prevents generate no revenue. Under Act 68's global budget, preventing hospitalizations is the explicit financial objective. The top 5% of Medicaid members account for approximately 39% of all Vermont Medicaid spending. Effective VCCI case management is the difference between a global budget surplus and a structural deficit.

### 11.4 SASH Program

Launched in 2011 under Blueprint infrastructure, the Support and Services at Home program is Vermont's housing-based care coordination model for Medicare seniors and people with disabilities. SASH operates in 200+ affordable housing communities across all 14 Vermont counties, serving 13,000+ participants.

**SASH's proof of concept for global budgets.** Under FFS, SASH's value is largely invisible to the payers who would benefit from it (Medicare, Medicaid). SASH prevents hospitalizations, reduces ED visits, and delays nursing home placement — but FFS payers capture that value as savings while SASH operating costs are carried by housing organizations and state grants. Under a global budget, the financial alignment is corrected: avoided hospitalizations directly benefit the budget, creating a structural incentive to fund SASH as a clinical strategy, not merely a housing amenity.

Commonwealth Fund and CHCS evaluations document: lower hospitalization rates, fewer ED visits, lower per-member-per-year Medicare spending, and delayed nursing home placement among SASH participants compared to matched controls.

### 11.5 Vermont Designated Agencies (DAs)

Vermont's 11 regional Designated Agencies are the community behavioral health infrastructure that serves the highest-complexity intersection of poverty, serious mental illness, SUD, developmental disability, and rural geography.

**The DA system's structural vulnerability.** Several DAs operate with thin margins, Medicaid rate structures below the cost of mandated service obligations, and severe workforce shortages in rural communities. If a Designated Agency becomes financially insolvent — a real risk for agencies in the Northeast Kingdom and rural Washington County — the Hub-and-Spoke SUD treatment model collapses, Blueprint CHTs lose their behavioral health referral destination, and VCCI case managers lose the DA hub infrastructure required to step patients up from community-based SUD treatment to a higher level of care.

This is why the HTR framework treats DA sustainability as a system-level risk, not an individual agency problem. Vermont's transformation agenda depends on the financial viability of all 11 Designated Agencies.

---

## 12. THE EQUITY PILLAR: SDOH, HEROI, AND POPULATION HEALTH

### 12.1 SDOH as Structural, Not Incidental

Health disparities in Vermont — and nationally — are not random. They are produced by structural conditions: the geography of poverty, the architecture of housing markets, the distribution of food access, the quality of rural transportation networks. Treating SDOH as an add-on to clinical care ("we also screen for social needs") misses the structural point.

The HTR framework treats equity as a structural pillar — Pillar 5 — that requires the same policy mandate, technology infrastructure, payment reform, and clinical redesign as any other pillar. Vermont's eight SDOH domains operationalize this principle:

| SDOH Domain | ICD-10 Code | VCCI Weight | Key Vermont Resources |
|-------------|-------------|-------------|----------------------|
| Housing Instability | Z59.0–Z59.9 | 6 pts (highest) | 2-1-1 Vermont, Champlain Housing Trust, VHFA |
| Food Insecurity | Z59.41 | 4 pts | 3SquaresVT, Vermont Foodbank, WIC |
| Transportation Barriers | Z59.9 | Up to 6 pts (rural) | VPTA, GMT, Medicaid NEMT |
| Social Isolation | Z60.2 | 4 pts | SASH, Senior Centers, DA Peer Support |
| Substance Use Disorder | F10–F19 | 4 pts | Hub-and-Spoke, Designated Agencies |
| Mental Health | F32–F43 | 4 pts | Designated Agencies, Blueprint MHI |
| Financial Strain | Z59.6–7 | 3 pts | Community Action Agencies, LIHEAP |
| Domestic Violence | Z63.0 | 2 pts | Vermont Network, DA crisis services |

### 12.2 AHEAD's Health Equity Benchmark: A Structural Shift

The AHEAD Model's Health Equity Benchmark (HEB) is the most significant structural change in equity accountability in any federal payment model. For the first time, a CMS payment model makes equity improvement a financial performance dimension — not a reporting requirement, not a bonus metric, but a component of the performance evaluation that determines whether a state succeeds or fails in the model.

Vermont's HEB focuses on income-based disparities in chronic disease management and maternal health outcomes. This creates a direct financial linkage between VCCI's SDOH-informed case management, Blueprint CHTs' community outreach, and SASH's housing-based care coordination — and Vermont's AHEAD financial performance.

### 12.3 HEROI: Health Equity Return on Investment

Chapter 13 of the HTR book introduces HEROI — the Health Equity ROI Index — as an operational metric for quantifying the return on investment of equity-focused clinical programs. HEROI adjusts standard ROI calculations for equity weighting: interventions that disproportionately benefit high-disparity populations receive a higher equity weight.

HEROI answers the question that program administrators and board members actually ask: "If we invest in a new SDOH navigator position for our VCCI program, what is the expected financial return per dollar invested, adjusted for the equity benefit to the populations most affected?"

The HTR Platform's Health Equity Studio (Research Lab, population-equity section) is the only tool that implements HEROI calculations — allowing organizations to calculate equity-adjusted ROI for specific programs using Vermont's population data as a baseline.

---

## 13. CROSS-STATE EVIDENCE: OREGON CCO 3.0 AND CALAIM

### 13.1 Why Cross-State Evidence Matters

Vermont's transformation is the most complete in the United States, but Vermont's population (647,000) lacks the statistical power to generate definitive evidence for many key questions. Oregon and California provide the scale evidence that Vermont cannot.

```
THREE-STATE TRANSFORMATION COMPARISON
═════════════════════════════════════════════════════════════════════

                  VERMONT           OREGON CCO 3.0      CALIFORNIA CalAIM
                  ═══════           ══════════════      ════════════════════
Population        647K (all-payer)  1.4M (OHP/Medicaid) 14M+ (Medi-Cal)
Payment model     Global budget     Global budget +      ECM + Community
                  (FY2028 mandatory) shared savings       Supports
                  AHEAD Model       (voluntary, 3rd gen)
Legislative       Act 68 (2025)     ORS 414 + CCO        DHCS Medi-Cal
basis             mandatory         contracts            1115 waiver ($6.7B)
SDOH              8 domains via     SDOH screening       ECM as SDOH gateway
integration       VCCI/SASH/Blueprint required            Housing + food
Behavioral health Designated        CCO-integrated        MH/SUD carve-in
                  Agencies          (physical + BH + oral) (2025)
Equity            AHEAD HEB         Equity metrics +     ECM targets homeless,
accountability    (income-based)    community advisory   incarcerated, SMI
                                    boards with authority
Key innovation    Mandatory global  CCO 3.0 climate      $6.7B whole-person
                  budget + AHEAD    resilience           care investment
                  lab
Platform page     /vermont-act-68   /oregon-cco          /california-calaim

═════════════════════════════════════════════════════════════════════
```

### 13.2 What Oregon Proves

Oregon's CCO model, now in its third generation (CCO 3.0, 2025–2030), provides the longitudinal evidence base Vermont lacks. Key findings from 13+ years of Oregon CCO data:

- CCO global budgets produced measurable reductions in per-member-per-month cost growth compared to pre-CCO trend while maintaining or improving HEDIS quality metrics
- Physical-behavioral-oral health integration is achievable at scale under a global budget — Oregon's integration rates are among the highest in the country for a Medicaid population
- Community advisory boards with genuine decision-making authority (CCO governance requirement) produce equity accountability mechanisms that purely regulatory approaches cannot
- CCO 3.0's new climate resilience requirements signal that the next generation of global budget models will incorporate environmental determinants as performance criteria

**Implication for Vermont:** Oregon's equity governance model — community advisory boards with real authority, not just advisory status — is a template Vermont should evaluate for the GMCB's governance structure as it matures under Act 68.

### 13.3 What California Proves (and What It Will Prove)

California's CalAIM is the largest state Medicaid transformation in U.S. history. Its Enhanced Care Management (ECM) and Community Supports components are the most comprehensive operationalization of whole-person care at scale ever attempted.

CalAIM's ECM targets Medi-Cal's highest-need populations — homeless, recently incarcerated, serious mental illness — with person-centered care management that explicitly addresses SDOH. Community Supports authorizes managed care plans to pay for housing deposits, recuperative care, medically tailored meals, and day habilitation as alternatives to more expensive medical services.

This is the structural logic Vermont is implementing through VCCI, SASH, and Blueprint CHTs. California's ECM outcome data (expected from DHCS beginning 2026) will provide the strongest available national evidence for or against the whole-person care model that Vermont's transformation strategy depends on.

---

## 14. VERMONT HEALTH TRANSFORMATION: IMPLEMENTATION AND PROJECT PLAN

### 14.1 Implementation Framework

The following implementation plan covers the period 2026–2030 — the critical window between now and the full activation of Act 68's global budget mechanism. It is organized by the six-pillar sequence, with specific milestones, responsible agencies, dependencies, and the HTR Platform tools that support each initiative.

This plan is not a wish list. It is a sequenced implementation roadmap that respects the dependency structure of the six-pillar framework. Initiatives are not parallelized arbitrarily — they are staged according to their prerequisites.

```
VERMONT HEALTH TRANSFORMATION — MASTER TIMELINE
══════════════════════════════════════════════════════════════════════════

        2026            2027            2028            2029–2030
PILLAR  ════════════════════════════════════════════════════════════════

        ┌────────────┐  ┌────────────┐  ┌────────────┐  ┌────────────┐
POLICY  │ Act 68     │  │ Reference  │  │ Statewide  │  │ Act 68     │
        │ Implement  │→ │ Pricing    │→ │ Strategic  │→ │ Budget     │
        │ Regulations│  │ Effective  │  │ Plan Filed │  │ Evaluation │
        └────────────┘  └────────────┘  └────────────┘  └────────────┘
               │               │               │               │
        ┌────────────┐  ┌────────────┐  ┌────────────┐  ┌────────────┐
TECH-   │ VITL FHIR  │  │ Real-Time  │  │ SDOH Data  │  │ AI Gov.    │
NOLOGY  │ R4 Deploy  │→ │ Care Alerts│→ │ Integration│→ │ Framework  │
        │ MMIS Integ.│  │ SUD Part 2 │  │ Full HIE   │  │ Mature     │
        └────────────┘  └────────────┘  └────────────┘  └────────────┘
               │               │               │               │
        ┌────────────┐  ┌────────────┐  ┌────────────┐  ┌────────────┐
ECON-   │ AHEAD Perf.│  │ Hospital   │  │ Global     │  │ AHEAD      │
OMICS   │ Year 1-2   │→ │ Budget     │→ │ Budget     │→ │ Performance│
        │ VBC Readn. │  │ Prep Period│  │ Live FY28  │  │ Evaluation │
        └────────────┘  └────────────┘  └────────────┘  └────────────┘
               │               │               │               │
        ┌────────────┐  ┌────────────┐  ┌────────────┐  ┌────────────┐
CLIN-   │ VCCI 4-Tier│  │ Blueprint  │  │ SASH       │  │ Full       │
ICAL    │ Operational│→ │ MHI Scale  │→ │ Medicare   │→ │ Population │
        │ DA Sustain.│  │ DA Funding │  │ Alignment  │  │ Health Mgmt│
        └────────────┘  └────────────┘  └────────────┘  └────────────┘
               │               │               │               │
        ┌────────────┐  ┌────────────┐  ┌────────────┐  ┌────────────┐
EQUITY  │ AHEAD HEB  │  │ SDOH Nav.  │  │ HEROI      │  │ Equity     │
        │ Baseline   │→ │ Expanded   │→ │ Measurement│→ │ Benchmark  │
        │ HEROI Pilot│  │ Statewide  │  │ Formal     │  │ Demonstrated│
        └────────────┘  └────────────┘  └────────────┘  └────────────┘
               │               │               │               │
        ┌────────────┐  ┌────────────┐  ┌────────────┐  ┌────────────┐
OPER-   │ Rev. Cycle │  │ HCC Coding │  │ 30-Lever   │  │ Full Oper. │
ATIONS  │ Assessment │→ │ Optimizatn │→ │ Assessment │→ │ Maturity   │
        │ VBC Readn. │  │ Workforce  │  │ All Hosps  │  │ All Hosps  │
        └────────────┘  └────────────┘  └────────────┘  └────────────┘

══════════════════════════════════════════════════════════════════════════
```

### 14.2 Pillar 1 — Policy Implementation Plan

**Goal:** Create the regulatory and governance architecture required for Act 68 implementation and the Statewide Health Care Delivery Strategic Plan.

**Initiative 1.1: Act 68 Regulatory Rulemaking (2026)**
- Responsible: GMCB, AHS
- Deliverables: Reference price schedule (FY2027), hospital budget methodology, corrective action framework
- HTR Tools: Policy Simulator, Act 68 Simulator (/vermont-act-68/simulator)
- Dependency: None (this is the initiating policy action)

**Initiative 1.2: Reference-Based Pricing Implementation (FY2027)**
- Responsible: GMCB
- Deliverables: Reference price schedules for all Vermont hospitals; transparency reporting framework; hospital compliance verification
- HTR Tools: Act 68 Simulator, Hospital Financial Stress Test
- Dependency: Regulatory rulemaking (1.1) complete; hospital data submission to VHCURES reliable

**Initiative 1.3: Statewide Health Care Delivery Strategic Plan (2026–2028)**
- Responsible: AHS (lead), GMCB, ADS
- Deliverables: Filed December 2028 per Act 68 requirement; covers primary care capacity, workforce, behavioral health, aging, SDOH, HIE
- HTR Tools: HTR Simulator, Transformation Friction Index, Impact Simulation
- Dependency: AHEAD Year 1-2 data available; VITL integration status assessed; Blueprint and VCCI performance data integrated

**Initiative 1.4: GMCB Governance Enhancement (2026–2027)**
- Responsible: GMCB, Legislature
- Deliverables: Community advisory mechanism (informed by Oregon CCO governance model); equity accountability framework; hospital performance dashboard
- HTR Tools: HTI Dashboard, Innovation Leaderboard, Compare States
- Dependency: AHEAD HEB baseline established

### 14.3 Pillar 2 — Technology Implementation Plan

**Goal:** Build the data infrastructure required for global budgets, population health management, and interoperable care coordination.

**Initiative 2.1: VITL FHIR R4 Full Implementation (2026)**
- Responsible: VITL, ADS
- Deliverables: FHIR R4 APIs live for all connected organizations; SMART on FHIR patient access enabled; 21st Century Cures compliance certified
- HTR Tools: FHIR Interoperability Lab (/research-lab/interoperability?tab=fhir)
- Dependency: ONC compliance requirements; EHR vendor FHIR implementation readiness
- Risk: Epic and Meditech FHIR implementation maturity varies across Vermont hospitals

**Initiative 2.2: VITL-MMIS Real-Time Integration (2026)**
- Responsible: VITL, DVHA, ADS
- Deliverables: Real-time bidirectional data exchange between VITL clinical data and DVHA MMIS; VCCI risk stratification engine updated to incorporate real-time clinical data
- HTR Tools: Risk Stratification Lab
- Dependency: FHIR R4 implementation (2.1); MMIS API readiness assessment complete
- Cost estimate: $2.5–4M implementation; $800K annual operations

**Initiative 2.3: Real-Time Care Alert Expansion (2027)**
- Responsible: VITL, Blueprint, DVHA
- Deliverables: VITL care alerts expanded to include ED visits, SNF admissions, and outpatient specialty encounters; 24-hour TCM protocol triggers automated; VCCI and Blueprint CHT systems integrated with alert feed
- HTR Tools: Digital Health Lab, FHIR Lab
- Dependency: FHIR R4 live (2.1); VITL-MMIS integration complete (2.2)

**Initiative 2.4: SDOH Data Integration (2027–2028)**
- Responsible: VITL, AHS (DVHA + DMH + DAIL), ADS, 2-1-1 Vermont
- Deliverables: LOINC-coded SDOH screening results stored in VITL repository; SDOH data shared between clinical providers, VCCI, Blueprint CHTs, and 2-1-1; consent framework implemented
- HTR Tools: Health Equity Studio, Population Health Modeler
- Dependency: FHIR Observation resource implementation for SDOH (2.1); legal review of HIPAA/state privacy law intersection; 2-1-1 Vermont technical integration
- Risk: Governance complexity — three AHS departments + external agencies must agree on data governance

**Initiative 2.5: 42 CFR Part 2 SUD Data Exchange (2027)**
- Responsible: VITL, DMH, Designated Agencies, DVHA
- Deliverables: Consent-based SUD data exchange through VITL using 2024 Part 2 rule; DA behavioral health encounter data visible to VCCI case managers with patient consent; integrated member view for complex SUD + MH + medical cases
- HTR Tools: AI Governance Lab (for evaluating SUD data governance tools)
- Dependency: Federal Part 2 rule implementation guidance; DA EHR FHIR readiness

**Initiative 2.6: Global Budget Data Infrastructure (2026–2027)**
- Responsible: VITL, GMCB, DVHA, ADS
- Deliverables: Real-time hospital encounter data feeds for global budget performance monitoring; reference price tracking system; budget performance dashboard for GMCB
- HTR Tools: Global Budget Transition Modeler, Hospital Financial Stress Test, HTI Dashboard
- Dependency: FHIR R4 (2.1); VHCURES data quality verification; reference price schedule (1.2)
- Timeline critical: Must be operational by FY2027 to support FY2028 budget activation

**Initiative 2.7: AI Governance Framework (2027–2028)**
- Responsible: GMCB (policy), ADS (technical standards), AHS (clinical deployment)
- Deliverables: Vermont AI Clinical Governance Framework; vendor evaluation criteria; mandatory governance lifecycle documentation for all AI tools in clinical use
- HTR Tools: AI Clinical Governance Lab (/research-lab/technology-ai?tab=ai)
- Dependency: National AI governance landscape assessment; existing Blueprint and VCCI AI tool inventory

### 14.4 Pillar 3 — Economics Implementation Plan

**Goal:** Execute the transition from fee-for-service to global budget payment and mature Vermont's value-based contracting ecosystem.

**Initiative 3.1: AHEAD Model Year 1-2 Performance (2026–2027)**
- Responsible: AHS (DVHA), GMCB, OneCare Vermont
- Deliverables: PCI target achievement; HEB baseline established; HGB participation aligned with Act 68 budget methodology
- HTR Tools: APM Design Lab, Shared Savings Calculator, Global Budget Modeler
- Dependency: VITL data quality for AHEAD attribution and quality measurement

**Initiative 3.2: Hospital VBC Readiness Assessment (2026)**
- Responsible: GMCB (oversight), each Vermont hospital (self-assessment)
- Deliverables: All Vermont hospitals complete HTR VBC Readiness Assessment; gap profiles filed with GMCB; corrective action plans for hospitals with critical gaps
- HTR Tools: VBC Readiness Assessment (/research-lab/knowledge-workspace?tab=readiness), Hospital Financial Stress Test
- Dependency: Reference price rulemaking (1.1) provides the financial parameters for assessment

**Initiative 3.3: Hospital Global Budget Preparation (2027)**
- Responsible: GMCB (budget setting), each Vermont hospital (preparation)
- Deliverables: Draft FY2028 hospital budgets developed; revenue cycle adaptation plans complete; HCC coding optimization implemented; shared savings arrangements negotiated where applicable
- HTR Tools: Global Budget Transition Modeler, Act 68 Simulator, APM Design Lab, Investment Tracker
- Dependency: Reference pricing live (1.2); VITL data infrastructure operational (2.6)

**Initiative 3.4: Hospital Global Budget Activation (FY2028)**
- Responsible: GMCB, AHS, each Vermont hospital
- Deliverables: FY2028 global budgets in effect for all participating hospitals; monthly GMCB performance monitoring; corrective action protocol for budget-exceeding hospitals
- HTR Tools: HTI Dashboard, Hospital Financial Stress Test, Transformation Scorecard
- Dependency: All Pillar 2 technology initiatives (2.1–2.6) complete; all hospital preparation (3.3) complete

**Initiative 3.5: VBC Ecosystem Maturation (2026–2030)**
- Responsible: DVHA, commercial payers, provider organizations
- Deliverables: Appendix D checklist used for all new VBC contract reviews; shared savings arrangements with equity accountability requirements; CEA analysis for major clinical program investments
- HTR Tools: APM Scenario Builder, CEA Calculator, APM Design Lab, Shared Savings Calculator
- Dependency: VITL data quality (2.1–2.3); risk stratification operational (VCCI)

### 14.5 Pillar 4 — Clinical Implementation Plan

**Goal:** Mature Vermont's integrated clinical architecture and ensure clinical programs are optimally designed for global budget performance.

**Initiative 4.1: VCCI 4-Tier Full Operationalization (2026)**
- Responsible: DVHA
- Deliverables: All four VCCI tiers fully operational with standardized protocols; CDPS scoring updated with real-time clinical data (pending 2.2); SDOH screening at all enrollment touchpoints; care plan templates standardized
- HTR Tools: Risk Stratification Lab, VCCI Risk Stratification methodology
- Dependency: VITL-MMIS integration (2.2) for real-time data; SDOH screening tools validated

**Initiative 4.2: Designated Agency Sustainability Plan (2026–2027)**
- Responsible: DMH, AHS, Legislature
- Deliverables: Financial sustainability assessment of all 11 DAs; Medicaid rate adequacy analysis; workforce recruitment and retention investment plan; DA-Blueprint data integration proposal
- HTR Tools: Hospital Financial Stress Test (adapted for DA use), VBC Readiness Assessment
- Dependency: DMH Medicaid rate data; DA financial statements
- Risk: Legislative appetite for DA rate increases in a constrained budget environment

**Initiative 4.3: Blueprint Mental Health Integration Scale (2026–2027)**
- Responsible: Blueprint (AHS), DVHA
- Deliverables: BH integration operational in all 14 Health Service Areas; SBIRT protocol standardized; DA-CHT handoff protocols documented; SDOH screening integrated with BH screening
- HTR Tools: Digital Health Lab, VBC Quality Measures
- Dependency: DA sustainability (4.2) — CHTs need functional DA referral destinations

**Initiative 4.4: SASH Medicare Alignment (2027–2028)**
- Responsible: DAIL, Blueprint, housing organizations, GMCB
- Deliverables: SASH reimbursement mechanism aligned with global budget incentives; SASH outcomes formally tracked in AHEAD performance framework; SASH expanded to reach 100% of eligible Medicare participants in affordable housing
- HTR Tools: Population Health Modeler, Health Equity Studio
- Dependency: AHEAD Model performance framework (3.1); VITL-MMIS integration for Medicare data (2.2)

**Initiative 4.5: Blueprint Statewide Performance Reporting (2026)**
- Responsible: Blueprint (AHS), DVHA, GMCB
- Deliverables: Standardized Blueprint performance dashboard integrated with VITL data; HEDIS metrics tracked in real-time; PCMH performance linked to AHEAD quality metrics
- HTR Tools: VBC Quality Measures, Clinical Quality Optimizer, Transformation Scorecard
- Dependency: VITL FHIR R4 (2.1) for clinical data

### 14.6 Pillar 5 — Equity Implementation Plan

**Goal:** Make equity a structural, measured, and financially consequential dimension of Vermont's health transformation — not a reporting checkbox.

**Initiative 5.1: AHEAD Health Equity Benchmark Operationalization (2026)**
- Responsible: DVHA, AHS
- Deliverables: Vermont HEB baseline established for income-based disparities in chronic disease and maternal health; measurement methodology validated with GMCB and CMS; SDOH screening standardized across VCCI and Blueprint
- HTR Tools: Health Equity Studio, Population Health Modeler
- Dependency: AHEAD Year 1 reporting requirements; SDOH data infrastructure (2.4 initiated)

**Initiative 5.2: SDOH Navigator Expansion (2026–2027)**
- Responsible: Blueprint (CHTs), DVHA (VCCI), DAIL (SASH)
- Deliverables: CHW staffing increased to cover all high-SDOH-burden communities; SDOH navigation workflows standardized across Blueprint, VCCI, and SASH; 2-1-1 Vermont referral completion tracked in VITL
- HTR Tools: Health Equity Studio, Population Health Modeler
- Dependency: SDOH data integration (2.4); 2-1-1 Vermont technical integration

**Initiative 5.3: HEROI Pilot Implementation (2026)**
- Responsible: DVHA (with AHS)
- Deliverables: HEROI calculation methodology adopted for VCCI program evaluation; baseline HEROI scores calculated for key VCCI interventions; equity-adjusted ROI reported to legislature
- HTR Tools: Health Equity Studio (HEROI implementation)
- Dependency: SDOH screening data available (2.4); VCCI outcome data complete

**Initiative 5.4: HEROI Formal Measurement (2028)**
- Responsible: AHS, GMCB
- Deliverables: HEROI incorporated into GMCB performance monitoring framework; hospitals and clinical programs report equity-adjusted ROI for major investments; AHEAD HEB demonstrated to CMS
- HTR Tools: Health Equity Studio, HTI Dashboard
- Dependency: HEROI pilot (5.3) validated; SDOH data integration (2.4) mature

### 14.7 Pillar 6 — Operations Implementation Plan

**Goal:** Ensure Vermont hospitals and clinical organizations have the operational capabilities required to succeed under global budgets.

**Initiative 6.1: VBC Readiness Baseline (2026)**
- Responsible: Each Vermont hospital and clinical organization (self-assessment); GMCB (oversight)
- Deliverables: All Vermont hospitals complete the 65-item Appendix D checklist and the HTR VBC Readiness Assessment; gap profiles published to GMCB; priority remediation plans filed
- HTR Tools: VBC Readiness Assessment, Hospital Financial Stress Test, Transformation Scorecard
- Dependency: None — this is a foundational baseline assessment

**Initiative 6.2: HCC Coding Optimization (2026–2027)**
- Responsible: Each Vermont hospital's revenue cycle team
- Deliverables: HCC coding accuracy assessment completed; documented improvement program implemented; coding accuracy tracked quarterly; relationship between coding accuracy and risk adjustment fairness documented
- HTR Tools: Evidence Library (HCC coding references), Transformation Scorecard
- Dependency: VBC Readiness baseline (6.1)

**Initiative 6.3: Revenue Cycle Adaptation for Global Budgets (2027–2028)**
- Responsible: Each Vermont hospital's CFO and revenue cycle leadership
- Deliverables: Revenue cycle processes redesigned for prospective budget accounting; cash flow management adapted for budget-vs-actual monitoring; financial reporting aligned with GMCB budget performance requirements
- HTR Tools: Global Budget Transition Modeler, Hospital Financial Stress Test, VBC Readiness Assessment
- Dependency: Reference pricing live (1.2); hospital budget preparation (3.3)

**Initiative 6.4: Workforce Planning Under Global Budgets (2027)**
- Responsible: Each Vermont hospital; AHS workforce programs
- Deliverables: Workforce projection under global budget revenue scenarios; recruitment and retention investment aligned with budget envelope; workforce data reported to GMCB in budget filings
- HTR Tools: Workforce tab (/research-lab/technology-ai?tab=workforce), Transformation Scorecard
- Dependency: Hospital budget preparation (3.3)

**Initiative 6.5: 30-Lever Operational Assessment — All Vermont Hospitals (2028)**
- Responsible: GMCB, each Vermont hospital
- Deliverables: All Vermont hospitals assessed against the 30 operational levers in Chapter 15; lever gap profiles integrated into GMCB corrective action framework; peer benchmarking against Vermont hospital cohort and Maryland HSCRC hospitals
- HTR Tools: VBC Readiness Assessment, Hospital Financial Stress Test, Transformation Scorecard, HTI Dashboard
- Dependency: Global budget activation (3.4); GMCB monitoring framework operational

### 14.8 VITL-Specific Implementation Milestones

Given VITL's foundational role in Vermont's transformation, its implementation milestones deserve special treatment in the project plan:

```
VITL IMPLEMENTATION ROADMAP 2026–2028
══════════════════════════════════════════════════════════════════

Q1 2026  ▶ FHIR R4 gap assessment: identify all organizations not
            yet FHIR-compliant; publish roadmap to full compliance

Q2 2026  ▶ VITL-MMIS integration pilot: real-time VCCI risk data
            feed tested with DVHA in pilot county

Q3 2026  ▶ FHIR R4 APIs live for all VITL-connected hospitals

Q4 2026  ▶ VITL-MMIS full production integration live
          ▶ Primary care practice FHIR onboarding complete (80%)

Q1 2027  ▶ Real-time care alert expansion: ED visits, SNF
            admissions, outpatient specialty alerts live

Q2 2027  ▶ 42 CFR Part 2 SUD data exchange pilot (2 DAs, 1 hospital)
          ▶ SDOH screening repository pilot: PHQ-9, AUDIT-C, AHC HRSN

Q3 2027  ▶ Reference price tracking system live (supports FY2027
            pricing implementation)
          ▶ SDOH data sharing governance framework finalized

Q4 2027  ▶ Full SDOH data integration: VITL ↔ 2-1-1 Vermont ↔ VCCI
          ▶ 42 CFR Part 2 SUD exchange expanded to all DAs

Q1 2028  ▶ Global budget data infrastructure operational:
            real-time hospital encounter data for GMCB monitoring
          ▶ Patient-facing FHIR APIs: all payers compliant

Q2 2028  ▶ Statewide SDOH data layer mature: screening results
            visible across Blueprint, VCCI, SASH, DAs
          ▶ AI governance framework integrated with VITL vendor
            assessment process

══════════════════════════════════════════════════════════════════
```

### 14.9 Key Performance Indicators (KPIs) for Vermont's Transformation

```
VERMONT HEALTH TRANSFORMATION — KEY PERFORMANCE INDICATORS
══════════════════════════════════════════════════════════════════

POLICY PILLAR
  □ Reference price schedule effective: FY2027 (binary)
  □ Global budgets active: FY2028 (binary)
  □ Statewide Strategic Plan filed: December 2028 (binary)
  □ GMCB corrective action rate: <15% of hospitals in any year

TECHNOLOGY PILLAR
  □ VITL FHIR R4 compliance: 100% of connected hospitals by Q3 2026
  □ Primary care FHIR: 90% by Q4 2026
  □ Real-time care alert coverage: 95% of Vermont admissions by Q1 2027
  □ SDOH data integration: Blueprint + VCCI + 2-1-1 by Q4 2027
  □ VHCURES data completeness: >98% of encounters captured

ECONOMICS PILLAR
  □ AHEAD PCI target: on track by Year 2 (2027)
  □ AHEAD HEB: baseline established 2026; improvement demonstrated 2028
  □ Hospital budget variance: average <3% across Vermont hospitals in FY2028
  □ VBC Readiness: 90% of Vermont hospitals score ≥70/100 by FY2028

CLINICAL PILLAR
  □ VCCI enrollment: top 5% of Medicaid flagged and outreached within 30 days
  □ Blueprint PCMH: 128+ practices; 100% of Health Service Areas staffed
  □ SASH reach: 90%+ of eligible Medicare participants in affordable housing
  □ DA sustainability: all 11 DAs financially solvent through 2028
  □ 30-day readmission rate: Vermont below national average by FY2028
  □ Preventable ED visits: 10% reduction from 2025 baseline by 2030

EQUITY PILLAR
  □ AHEAD HEB demonstrated: income-based disparity in chronic disease
    management reduced by ≥5% by 2028
  □ SDOH screening coverage: ≥80% of VCCI enrollees screened in all 8 domains
  □ HEROI: formal calculation for ≥5 major programs by 2028
  □ Race/ethnicity health disparity monitoring: formal GMCB reporting

OPERATIONS PILLAR
  □ VBC Readiness score: 90% of hospitals ≥70/100 by FY2028
  □ HCC coding accuracy: Vermont average ≥97% by FY2027
  □ Hospital cash on hand: <20% of Vermont hospitals below 60 days
  □ Revenue cycle adaptation: 100% hospitals with prospective budget
    accounting operational by Q3 FY2028

══════════════════════════════════════════════════════════════════
```

### 14.10 Risk Register

| Risk | Probability | Impact | Mitigation |
|------|------------|--------|------------|
| VITL FHIR readiness gap in small/rural practices | High | High | Prioritized onboarding support; ADS enterprise IT assistance |
| Designated Agency insolvency (1 or more DAs) | Medium | Very High | DA sustainability plan (4.2); emergency bridge funding mechanism |
| Hospital revenue cycle failure under global budgets | Medium | High | VBC Readiness assessments (6.1); GMCB corrective action triggers |
| VHCURES data completeness below 98% | Low | High | GMCB data submission mandate; penalties for non-submission |
| Federal policy change (H.R. 1 Medicaid cuts) | High | Very High | H.R. 1 Cliff Scenario modeling; contingency budget plans |
| AHEAD Model cancelled or restructured by CMS | Low | High | Act 68 independent of AHEAD; state can proceed without federal model |
| 42 CFR Part 2 governance complexity blocking SUD data | Medium | Medium | Phased implementation; pilot with consenting patient population |
| Political resistance to global budgets from hospitals | Medium | High | GMCB regulatory authority; legislative coalition (Chapter 18 framework) |
| AI tool governance vacuum (unvetted AI in clinical use) | High | Medium | AI Governance Framework (2.7); GMCB vendor assessment requirement |

---

## 15. CONCLUSION

Vermont's health transformation is the most consequential and most complete state-level reform in the United States. It is not a pilot program or a demonstration project. It is a legislative mandate — Acts 167 and 68 — that commits Vermont to mandatory all-payer global budgets, a statewide primary care investment floor, a health equity accountability framework, and a comprehensive delivery system strategic plan, all by 2028.

The HTR ecosystem — the book *Transforming American Healthcare*, the HTR Platform, and the practitioner community — is the only comprehensive knowledge and analytical system built specifically to support this work. It provides the framework (six pillars, fifteen dependencies, the correct sequencing), the analytical tools (24 Research Lab instruments for modeling every aspect of Vermont's transformation), the live intelligence (The Wire, Vermont program pages updated as policy evolves), and the community (practitioners working the same problems).

The six-pillar sequence — **Policy → Technology → Economics → Clinical → Equity → Operations** — is not a convenience. It is a causal argument grounded in Vermont's own history and in the national evidence from Oregon and California. You cannot build global budgets without data infrastructure. You cannot manage populations without clinical programs. You cannot achieve equity without making it a financial performance dimension. And you cannot sustain any of this without operational excellence at the hospital and practice level.

Vermont's transformation will be hard. The Designated Agency system is financially fragile. VITL's FHIR transition is technically complex. Hospital revenue cycle adaptation under global budgets will be operationally painful. Federal policy (H.R. 1, CMMI model changes) creates uncertainty. The political economy of reform is always contested.

But Vermont has something no other state has: the most complete legislative architecture, the most transparent data system, the most integrated clinical infrastructure, and two decades of institutional learning. If Vermont executes this plan — and if the HTR ecosystem supports practitioners in executing it — Vermont will be the proof of concept that the rest of the country needs.

The convergence horizon that this white paper is oriented toward: mandatory payment reform (Vermont) + proven CCO governance at scale (Oregon) + whole-person care investment (California) = what a fully transformed state Medicaid system looks like. That convergence has not happened anywhere yet. Vermont is the most likely place to approach it first.

---

## APPENDIX A: GLOSSARY OF KEY TERMS

**AHEAD Model** — CMS Innovation Center model requiring participating states to achieve total cost of care reduction with primary care investment floors and health equity benchmarks.

**APM (Alternative Payment Model)** — Any payment arrangement that departs from pure fee-for-service, including shared savings, capitation, bundled payments, and global budgets.

**Blueprint for Health** — Vermont's state primary care transformation initiative: 128 PCMH practices and Community Health Teams in all 14 counties.

**CDPS (Chronic Disability Payment System)** — Medicaid-specific diagnostic cost group classification system used by VCCI for risk stratification.

**CHT (Community Health Team)** — Regional multidisciplinary teams under Blueprint infrastructure providing care coordination, SDOH navigation, and BH integration.

**DA (Designated Agency)** — One of Vermont's 11 regionally designated non-profit organizations providing community MH, SUD, and DD services under DMH/DAIL contract.

**FHIR (Fast Healthcare Interoperability Resources)** — HL7 standard for healthcare data exchange using REST APIs.

**Global Budget** — A prospective annual payment to a hospital or health system covering all services for a defined population, replacing per-service FFS billing.

**GMCB (Green Mountain Care Board)** — Vermont's independent regulatory body for hospital spending, insurance rates, and health technology governance.

**HEB (Health Equity Benchmark)** — AHEAD Model requirement for measurable health equity improvement as a financial performance dimension.

**HEDIS (Healthcare Effectiveness Data and Information Set)** — Standardized quality measures used by health plans and CMS for performance reporting.

**HEROI (Health Equity ROI Index)** — HTR-developed metric for equity-adjusted return on investment of clinical programs.

**HIE (Health Information Exchange)** — Technical infrastructure for sharing patient data between healthcare organizations; operated in Vermont by VITL.

**HCC (Hierarchical Condition Category)** — Risk adjustment methodology used by Medicare to adjust payments based on patient diagnosis coding.

**MOUD (Medications for Opioid Use Disorder)** — Pharmacological treatment for OUD including buprenorphine, methadone, and naltrexone.

**PCMH (Patient-Centered Medical Home)** — Primary care practice model emphasizing proactive, team-based, coordinated care; recognized by NCQA.

**SASH (Support and Services at Home)** — Vermont housing-based care coordination for Medicare seniors: 200+ communities, 13,000+ participants.

**SDOH (Social Determinants of Health)** — Non-clinical factors determining health outcomes: housing, food, transportation, social connection, income, education.

**TCOC (Total Cost of Care)** — All healthcare spending for a defined population across all settings and payers.

**VCCI (Vermont Chronic Care Initiative)** — DVHA's intensive Medicaid case management program for the top 5-15% of members by cost and complexity.

**VHCURES** — Vermont's all-payer claims database collecting all Medicare, Medicaid, and commercial claims for Vermont residents.

**VITL (Vermont Information Technology Leaders)** — Vermont's designated Health Information Organization operating the statewide HIE.

---

## APPENDIX B: HTR PLATFORM QUICK REFERENCE

| Need | Platform Path |
|------|--------------|
| Vermont Act 68 details and simulator | /vermont-act-68 |
| AHEAD Model analysis | /ahead-model |
| Vermont Blueprint for Health | /vermont-blueprint |
| VCCI risk stratification | /vermont-vcci |
| SASH Program | /vermont-sash |
| Designated Agencies | /vermont-designated-agencies |
| Vermont SDOH (8 domains) | /vermont-sdoh |
| Vermont Legislative Resources | /vermont-legislative-resources |
| Oregon CCO 3.0 | /oregon-cco |
| California CalAIM | /california-calaim |
| Compare states | /compare-states |
| HTI Dashboard | /hti-dashboard |
| Policy Simulator | /research-lab/policy-quality?tab=policy |
| H.R. 1 Cliff Scenario | /research-lab/policy-quality?tab=hr1-cliff |
| FHIR Interoperability Lab | /research-lab/interoperability?tab=fhir |
| AI Governance Lab | /research-lab/technology-ai?tab=ai |
| APM Design Lab | /research-lab/payment-models?tab=apm-design |
| Global Budget Modeler | /research-lab/payment-models |
| Risk Stratification Lab | /research-lab/vbc-clinical-quality?tab=risk |
| Health Equity Studio (HEROI) | /research-lab/population-equity?tab=equity |
| VBC Readiness Assessment | /research-lab/knowledge-workspace?tab=readiness |
| Evidence Library | /research-lab/knowledge-workspace?tab=evidence |
| HTR Simulator | /htr-simulator |
| Transformation Friction Index | /transformation-friction-index |
| AI Analyst | /chat (or sidebar on any page) |

---

*© 2026 Health Transformation Review. This white paper is produced by the HTR editorial team drawing on the book Transforming American Healthcare (v28), the HTR Platform, and publicly available Vermont state agency publications. Platform tools and Vermont program data are available at healthtransformationreview.com.*

*Word count: approximately 18,000 words*
*Page estimate at standard formatting: 38–42 pages*
