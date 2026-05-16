# VBC & Clinical Quality Lab — Complete Technical and User Documentation

**Delivered:** May 16, 2026  
**Platform:** Health Transformation Review (HTR)  
**Route:** `/research-lab/vbc-clinical-quality`  
**Status:** Production-ready, TypeScript clean, Next.js build passing

---

## Table of Contents

1. [Overview — What Was Built and Why](#1-overview)
2. [Architecture — How It All Fits Together](#2-architecture)
3. [The Synthetic Patient Dataset](#3-synthetic-patient-dataset)
4. [Tab 1 — Clinical Data Exchange Lab (HL7, FHIR, USCDI)](#4-clinical-data-exchange-lab)
5. [Tab 2 — VBC Quality Measures Dashboard (HEDIS, Readmissions, Avoidable ED)](#5-vbc-quality-measures-dashboard)
6. [Tab 3 — High vs. Low Value Care Analysis](#6-high-vs-low-value-care-analysis)
7. [Tab 4 — Risk Stratification Methodology](#7-risk-stratification-methodology)
8. [Tab 4 Sub-Feature — Vermont VCCI Scenario](#8-vermont-vcci-scenario)
9. [The VCCI Dataset in Detail](#9-vcci-dataset)
10. [Navigation and Integration Changes](#10-navigation-and-integration)
11. [File Inventory](#11-file-inventory)
12. [Glossary of Key Terms](#12-glossary)

---

## 1. Overview

### What Problem Does This Solve?

Before today, the platform's Technology and Clinical pillars had solid policy and economic content but lacked **practical, scenario-based clinical data**. A user could read about FHIR interoperability or HEDIS measures in the abstract, but could not see a real example of:

- What a Vermont patient's HL7 message actually looks like segment by segment
- How a HEDIS quality gap is identified and closed for a specific patient
- How a risk score is calculated from a patient's diagnoses, step by step
- What the Vermont VCCI program actually does to identify and manage high-risk Medicaid members

The new **VBC & Clinical Quality Lab** fills that gap entirely. It is built around **8 detailed synthetic Vermont patient profiles** and **3 dedicated Vermont VCCI Medicaid patient scenarios**, all with realistic clinical data, HL7 messages, FHIR resources, HEDIS status, encounter histories, medication lists, SDOH flags, and risk scores.

### Who Is This For?

| Audience | What They Get |
|---|---|
| **Health IT professionals** | Annotated HL7 v2 message anatomy, FHIR R4 resource structure, USCDI data elements, HL7↔FHIR side-by-side comparison |
| **Quality managers / HEDIS analysts** | Patient-level HEDIS gap identification, numerator/denominator definitions, closing actions, panel-level rates |
| **VBC/ACO leaders** | 30-day readmission analysis, avoidable ED classification, A1C/BP panel management with shared savings math |
| **Clinical leaders** | Choosing Wisely low-value care scan, Total Cost of Care decomposition, care gap identification |
| **Medicaid program staff / DVHA** | Full Vermont VCCI risk stratification walkthrough, CDPS score calculation, composite scoring, SDOH screening data |
| **Students and newcomers** | Every concept is explained from first principles — no prior knowledge of HL7, FHIR, HEDIS, or risk adjustment assumed |

---

## 2. Architecture

### How the Components Connect

```
/research-lab/vbc-clinical-quality          ← New route
├── VBCClinicalQualityClient.tsx            ← Shell: tab routing + LabPageShell wrapper
│
├── Tab: hl7       → HL7FHIRExplorer.tsx    ← Clinical data exchange
├── Tab: quality   → VBCQualityDashboard.tsx ← HEDIS, readmissions, avoidable ED
├── Tab: value     → HighLowValueCare.tsx   ← High vs. low value care
└── Tab: risk      → RiskStratificationMethodology.tsx
                        └── Sub-tab: vcci  → VCCIScenario.tsx  ← VCCI program
```

### Data Layer

```
lib/syntheticPatients.ts     ← 8 Vermont patient profiles (945 lines)
                                Used by: HL7FHIRExplorer, VBCQualityDashboard,
                                         HighLowValueCare, RiskStratificationMethodology

lib/vcciScenarioData.ts      ← 3 VCCI Medicaid patients + providers + hospitals (650 lines)
                                Used by: VCCIScenario
```

### Technical Choices

- All components are **`"use client"`** with `dynamic()` imports (`ssr: false`) — they render in the browser only, which is appropriate for interactive calculators with no SEO content
- The VCCI component is lazy-loaded via `dynamic()` inside `RiskStratificationMethodology` to keep the base bundle small
- All data is **static TypeScript** — no API calls, no database reads. This means the tools are fast, work offline, and have no dependency on backend availability
- URL state is managed via `?tab=` query params (consistent with all other Research Lab sections), so links to specific tabs are shareable and bookmarkable
- The lab is added to the Research Lab navigation bar (`LabPageShell.tsx`) so users can move between labs using the top nav

---

## 3. Synthetic Patient Dataset

**File:** `lib/syntheticPatients.ts`

### What It Is

A TypeScript data file containing 8 complete synthetic Vermont patient profiles. Every patient is fictional but clinically accurate — diagnoses, medications, lab values, and encounter patterns are all realistic and internally consistent. The scenarios were designed to represent the real patient complexity seen in Vermont's Medicaid and Medicare populations.

### Why Synthetic Data Instead of Real Data

Real patient data cannot be used in a platform without a BAA (Business Associate Agreement), IRB approval, and de-identification certification. Synthetic data that is clinically realistic — but contains no real individuals — achieves the same educational and analytical purpose while being fully compliant.

### What Each Patient Profile Contains

Every patient object contains **15 categories of data**:

| Category | Contents |
|---|---|
| **Demographics** | Name, age, DOB, sex, county, town, payer (Medicare/Medicaid/Commercial), member ID |
| **Risk scores** | HCC RAF score (CMS v28), Charlson Comorbidity Index score, risk tier (low/rising/high/very-high) |
| **HCC detail** | Each HCC code number, label, mapped ICD-10 codes, CMS coefficient, plain-English description |
| **Diagnoses** | ICD-10 code, display name, HCC code, HCC weight, SNOMED CT code |
| **Medications** | RxNorm code, drug name, dose, frequency, adherence status |
| **Lab results** | LOINC code, display name, value, units, date, interpretation (normal/abnormal/critical) |
| **Encounters** | Type (inpatient/ED/office/SNF/telehealth), dates, principal diagnosis, DRG, CPT codes, cost, avoidable flag, root cause |
| **HEDIS status** | Per-measure status: in denominator, in numerator, gap description, closing action |
| **HL7 v2 ADT message** | Full annotated ADT^A01 (admission) or ADT^A04 (outpatient registration) message |
| **HL7 v2 ORU message** | Full annotated ORU^R01 (lab results) message (where applicable) |
| **FHIR R4 Bundle** | Patient, Encounter, Condition, Observation, and MedicationRequest resources |
| **SDOH flags** | Plain-English social determinant flags (housing, food, transportation, isolation) |
| **Total cost PMPY** | Annual per-member-per-year cost |
| **Scenario title** | Short clinical scenario label for UI display |
| **Key learning** | 2–3 sentence educational takeaway connecting the patient's data to VBC concepts |

### The Eight Patients

---

**Patient 1 — Elaine Morrison, 67F, Orange County, Medicare**  
*Scenario: T2DM Readmission & HEDIS Gap*

Elaine has uncontrolled Type 2 diabetes (HbA1c 9.2%), chronic systolic heart failure, morbid obesity, and essential hypertension. She was admitted for diabetic ketoacidosis in September 2025 and readmitted 28 days later — a preventable 30-day readmission. She has had three additional avoidable ED visits for hyperglycemia and CHF fluid overload. She is out of the HEDIS CDC numerator on HbA1c control, blood pressure control, eye exam, and statin therapy. Her RAF score is 1.82 — 82% above the Medicare average.

**What Elaine Teaches:**
- How a 30-day readmission is defined and attributed (CMS RSRR methodology)
- How HEDIS CDC measure gaps stack up on a single patient
- Why insulin cost and non-adherence translate directly to ED visits and hospitalizations
- How HL7 ADT and ORU messages carry the clinical data that feeds HEDIS calculation

---

**Patient 2 — Marcus Webb, 72M, Chittenden County, Medicare**  
*Scenario: CHF Avoidable ED & Blood Pressure Uncontrolled*

Marcus has chronic diastolic heart failure, paroxysmal atrial fibrillation, peripheral artery disease, and stage 3 CKD. His blood pressure is 158/94 despite three antihypertensives — out of the HEDIS CBP numerator. He has had two avoidable ED visits for CHF fluid overload, both driven by lack of remote patient monitoring (RPM). He has no home weight scale. His RAF score is 1.64.

**What Marcus Teaches:**
- How RPM can prevent CHF decompensation and the $4,800/year in avoidable ED spend it represents
- What the HEDIS CBP (Controlling High Blood Pressure) measure requires and why Marcus fails it
- How multiple HCC codes interact to produce a RAF score (CHF + AFib + PVD + CKD)
- The AHRQ PQI-8 classification for CHF-related avoidable admissions

---

**Patient 3 — Dorothy Lafleur, 58F, Windham County, Medicaid**  
*Scenario: A1C Controlled But Quality Gaps Persist*

Dorothy has T2DM with CKD Stage 4. Her HbA1c is 7.6% — controlled, in the HEDIS numerator. But she has missed her annual urine albumin-to-creatinine ratio (UACR) test required for the HEDIS Kidney Health Evaluation measure. She also has a pattern of repeated routine urinalysis orders that flag as low-value per Choosing Wisely guidance. Her CKD is aggressively managed on an SGLT2 inhibitor (dapagliflozin).

**What Dorothy Teaches:**
- Why HEDIS compliance requires more than just A1C control — multiple sub-measures exist
- What the UACR test is and why it matters for diabetic kidney disease monitoring
- How Choosing Wisely flags identify low-value care that doesn't constitute fraud but wastes resources
- How CKD Stage 4 maps to CDPS RENAL_H category and HCC 136

---

**Patient 4 — James Bouchard, 81M, Franklin County, Medicare**  
*Scenario: COPD Exacerbations & Choosing Wisely Flags*

James has severe COPD, comorbid CHF, and severe protein-calorie malnutrition — the last having the highest HCC coefficient (0.455) in his profile, often undercoded in practice. He has had four COPD-related ED visits in 12 months, all classifiable as AHRQ PQI-5 ambulatory care-sensitive. He has received six chest X-rays in the measurement year despite stable COPD — flagged as low-value imaging per American College of Physicians Choosing Wisely guidance (Grade A evidence).

**What James Teaches:**
- How AHRQ Prevention Quality Indicators (PQIs) classify COPD admissions as ambulatory care-sensitive
- Why protein-calorie malnutrition carries a higher HCC weight than heart failure or diabetes
- How Choosing Wisely CPT-code-based scanning works in practice
- The financial cost of COPD exacerbation prevention failure (~$10,800 in avoidable ED spend over 12 months)

---

**Patient 5 — Sarah Thibodeau, 45F, Rutland County, Medicaid**  
*Scenario: MDD Hospitalization & Follow-Up Failure*

Sarah was hospitalized for major depressive disorder (MDD) and discharged September 27. Her first follow-up appointment was October 5 — 8 days post-discharge, missing the HEDIS FUH 7-day window by a single day. She fails three HEDIS measures: FUH-7, Controlling High Blood Pressure, and Antidepressant Medication Management (AMM). Multiple SDOH factors — housing instability, trauma history, childcare barriers — compound her clinical complexity.

**What Sarah Teaches:**
- The exact definition of the HEDIS FUH-7 measure and how a one-day miss triggers a gap
- How discharge planning failures directly translate to HEDIS measure failures
- Why behavioral health and primary care fragmentation creates compounding quality gaps
- How SDOH factors are coded in both HL7 OBX segments and FHIR Observation resources

---

**Patient 6 — Robert Arsenault, 63M, Washington County, Commercial**  
*Scenario: A1C Trending to Control After Pharmacist MTM*

Robert is an MTM success story. His HbA1c has improved from 9.1% (May 2024) to 7.4% (November 2025) over 18 months following pharmacist-led medication reconciliation and adherence coaching. He is now IN the HEDIS CDC-HbA1c numerator, IN the MAH (Medication Adherence) numerator, and on an appropriate statin. He still has one gap: no dilated eye exam in the measurement year.

**What Robert Teaches:**
- What a positive VBC outcome trajectory looks like in clinical data
- How PDC (proportion of days covered) is calculated and used for HEDIS MAH measures
- The dollar value of moving a patient from uncontrolled to controlled T2DM in a VBC contract
- What the A1C trend chart view in the platform shows over 4 time points

---

**Patient 7 — Maria Gonzalez, 55F, Lamoille County, Medicaid**  
*Scenario: Hypertension Controlled via RPM + SDOH Support*

Maria is a Vermont AHEAD RPM success case. Her blood pressure dropped from 162/98 (November 2024) to 124/76 (November 2025) after enrollment in a remote blood pressure monitoring program. SDOH screening identified food insecurity and housing instability — addressing these was essential to medication adherence. Spanish is her primary language (FHIR Patient.communication coded with BCP-47 `es`).

**What Maria Teaches:**
- The ROI calculation for RPM: $480/year program cost vs. $4,200/year in avoidable utilization
- How SDOH data is encoded in FHIR resources (LOINC-coded Observations, Z-code Conditions)
- How language preference flows through both FHIR Patient resource and HL7 PID segment
- What the Controlling High Blood Pressure (CBP) HEDIS measure requires

---

**Patient 8 — William Desrochers, 78M, Essex County, Medicare**  
*Scenario: Heart Failure Hospitalization & SNF Overutilization*

William is the highest-cost patient in the panel at $68,400/year. He has systolic CHF, longstanding persistent AFib, severe protein-calorie malnutrition, atherosclerosis, CKD Stage 3, and T2DM. His RAF score is 2.14. His care story: index CHF hospitalization → 21-day SNF stay → two additional ED visits including a 30-day readmission. SNF/post-acute spend is 38% of his TCOC — the highest modifiable cost category.

**What William Teaches:**
- How to decompose TCOC into service categories and identify modifiable vs. fixed spend
- Why SNF utilization is a primary target for VBC cost reduction
- How NT-proBNP (a heart failure biomarker, LOINC 33762-6) signals severity and appears in HL7 ORU
- The CMS RSRR methodology for 30-day readmission attribution and risk adjustment

---

### Panel Summary Statistics (Exported as `PANEL_SUMMARY`)

| Metric | Value |
|---|---|
| Total patients | 8 |
| Average cost PMPY | ~$31,000 |
| Average HCC RAF score | 1.33 |
| Average Charlson score | 4.4 |
| Very High risk tier | 4 patients |
| High risk tier | 1 patient |
| Rising risk tier | 3 patients |
| Avoidable ED visits | 11 |
| 30-day readmissions | 2 |
| HEDIS gaps | 18 |
| Payer mix | 4 Medicare, 3 Medicaid, 1 Commercial |

---

## 4. Clinical Data Exchange Lab

**File:** `components/research/HL7FHIRExplorer.tsx`  
**Route:** `/research-lab/vbc-clinical-quality?tab=hl7`  
**Access from:** Technology pillar sidebar → "Clinical Data Exchange Lab"

### What It Is

An interactive explorer that shows clinical data in the two dominant healthcare messaging standards — HL7 v2 (the legacy standard used in most hospital ADT and lab systems today) and FHIR R4 (the modern standard mandated by the ONC 21st Century Cures Act). It also includes a complete browser of the United States Core Data for Interoperability (USCDI) data element registry.

### Why These Two Standards Exist Side by Side

**Background for non-technical users:** Healthcare data has historically been trapped inside individual hospital and clinic systems that don't talk to each other. Two competing approaches have emerged to solve this:

- **HL7 v2** (released 1987, still dominant): A pipe-delimited text format that most hospitals use for real-time feeds of admissions, discharges, lab results, and orders. Think of it as a fax machine format that works — everywhere, reliably, but with limited structure.
- **FHIR R4** (released 2019, rapidly growing): A modern REST API and JSON format that treats every clinical concept as a discrete, queryable resource. Think of it as a well-structured database that any authorized app can read and write.

Most real-world health IT work involves translating between both. This tool shows exactly what that looks like.

### Tab 1: HL7 v2 Explorer

**How to use it:**
1. Select any of the 8 patient scenarios using the patient selector cards at the top
2. The patient's ADT (admission/registration) message appears below, broken into individual segments
3. Click any segment row to expand it
4. Each expansion shows:
   - A plain-English explanation of what the segment means and why it matters for VBC
   - The raw pipe-delimited data in a monospace terminal view
   - Field-by-field annotations (e.g., "MSH-9: ADT^A01 = this is an Admit event, not a discharge or transfer")

**Segments covered:**

| Segment | Full Name | What It Does |
|---|---|---|
| **MSH** | Message Header | The "envelope" — who sent the message, when, what type of event it represents |
| **EVN** | Event Type | Records the timestamp of the clinical event itself (separate from when the message was sent) |
| **PID** | Patient Identification | Core demographics: name, DOB, MRN, address. The #1 source of patient matching challenges in HIE |
| **PV1** | Patient Visit | Inpatient vs. outpatient vs. ED designation; attending physician NPI; financial class (Medicare/Medicaid/Commercial) |
| **DG1** | Diagnosis | **Critical for VBC**: Each ICD-10 diagnosis in a separate DG1 segment. These map to HCC codes for risk adjustment. Missing DG1 = missing RAF weight. |
| **OBR** | Observation Request | The lab order that generated results — links OBX results back to the ordering provider |
| **OBX** | Observation Result | **Critical for HEDIS**: Each lab result with its LOINC code. If the LOINC code is wrong or absent, HEDIS calculators cannot use the result even if the value is correct. |
| **AL1** | Allergy | Known allergies — critical for medication safety; maps to FHIR AllergyIntolerance |
| **PR1** | Procedure | Clinical procedures performed; CPT codes here feed quality measure calculation |

**The ORU^R01 (Lab Results) sub-section:**  
For patients with lab data (Elaine, Marcus, others), a second message section shows the ORU^R01 lab results message. This is the message type that carries HbA1c, blood pressure readings, and other HEDIS-relevant lab results from the Lab Information System (LIS) to the EHR and HIE. The key educational point: the LOINC code in OBX-3 is what HEDIS calculation engines search for. Without the correct LOINC code, a perfect lab result is invisible to quality measurement.

### Tab 2: FHIR R4 Bundle

**How to use it:**
1. Select a patient (same selector as HL7 tab — patient persists across tabs)
2. The patient's FHIR R4 Bundle is displayed as an expandable tree
3. Each Bundle.entry (one FHIR resource) appears as a card showing the resource type
4. Click any card to expand it — reveals the full JSON with interactive collapsed/expanded nodes
5. A plain-English description of each resource type appears at the top of each expanded card

**FHIR Resources Included Per Patient:**

| Resource Type | What It Represents | HEDIS/VBC Relevance |
|---|---|---|
| **Patient** | Demographics, language, address | USCDI-required elements; patient matching; SDOH county analysis |
| **Encounter** | Hospital or clinic visit | Determines encounter type for HEDIS denominator inclusion |
| **Condition** | Active diagnoses | Maps to ICD-10 → HCC → RAF score; primary source for risk adjustment |
| **Observation** | Lab results, vital signs, screening scores | Numerator data for HEDIS (HbA1c, BP, PHQ-9); must have LOINC code |
| **MedicationRequest** | Active prescriptions | Source for HEDIS medication adherence (PDC calculation) |

**Interactive JSON viewer features:**
- Triangles (▼/▶) expand/collapse nested objects and arrays
- String values in red; codes in green monospace; numbers in blue
- Depth-limited auto-expansion (first 2 levels open by default, deeper levels collapsed)

### Tab 3: HL7 ↔ FHIR Bridge

**How to use it:**
1. Select a patient
2. The same clinical event is shown in both formats simultaneously — HL7 v2 on the left, FHIR R4 on the right
3. A banner at the top explains the clinical context of the event being shown
4. Both sides are independently expandable

**Why This Matters:**  
In real-world Vermont healthcare infrastructure, data flows from HL7-generating hospital ADT systems through the Vermont Health Information Exchange (VITL) to downstream FHIR-consuming applications (patient portals, payer APIs, ACO analytics platforms). A Health IT professional must understand both formats. This side-by-side view makes the mapping explicit:

- HL7 PID-3 (Patient Identifier) = FHIR Patient.identifier
- HL7 DG1-3 (Diagnosis Code) = FHIR Condition.code
- HL7 OBX-3/5 (Lab Code + Value) = FHIR Observation.code + valueQuantity
- HL7 PV1-2 (Patient Class) = FHIR Encounter.class

### Tab 4: USCDI Data Elements Browser

**What USCDI Is (for non-technical users):**  
USCDI stands for United States Core Data for Interoperability. It is a list, published by the federal government (ONC), of health data elements that every EHR system must be able to share. Think of it as the minimum vocabulary that all healthcare software must speak. If a data element is in USCDI, any certified EHR must be able to send and receive it. If it's not in USCDI, there's no federal mandate to share it.

**Three versions are included:** v1 (2020, foundational), v2 (2022, added functional status, diagnostic imaging), v3 (2023, added SDOH goals, encounter disposition, SDOH assessment)

**How to use the browser:**
1. Search by any text: data class name, element name, FHIR resource type, LOINC/SNOMED code, or display name
2. Filter by USCDI version (v1, v2, v3, or all)
3. Click any data class to expand it — shows all elements in that class with four columns:
   - **Data element** — what the data is
   - **FHIR resource** — which FHIR resource carries this element
   - **Terminology system** — which coding standard (LOINC, SNOMED, ICD-10, RxNorm, CVX, etc.)
   - **Example code + display** — a concrete example from the synthetic dataset

**37 USCDI elements are documented**, spanning these data classes: Allergies, Assessment/Plan, Care Team, Clinical Notes (5 note types), Diagnostic Imaging, Encounter Information, Functional Status, Goals, Health Concerns, Immunizations, Laboratory, Medications, Patient Demographics (6 elements), Problems, Procedures, Provenance, Smoking Status, Social Determinants of Health, Unique Device Identifiers, and Vital Signs (5 measurements).

---

## 5. VBC Quality Measures Dashboard

**File:** `components/research/VBCQualityDashboard.tsx`  
**Route:** `/research-lab/vbc-clinical-quality?tab=quality`  
**Access from:** Clinical pillar sidebar → "VBC Quality Measures"

### What It Is

A three-section quality measurement dashboard that applies real quality measurement logic to the synthetic patient panel. Unlike generic HEDIS calculators that show theoretical rates, this tool shows exactly which patients are in or out of each measure's numerator and why, then extends to 30-day readmission analysis and avoidable ED classification.

### Background: What Quality Measurement Means in VBC (for new users)

In a value-based care contract, healthcare organizations are paid not just for services delivered but for how well they manage their patient population's health. Quality measures are the scorecards. The most widely used quality measurement framework in the United States is **HEDIS** — Healthcare Effectiveness Data and Information Set — published by the National Committee for Quality Assurance (NCQA).

Every HEDIS measure has:
- A **denominator** — the population of patients who should receive this care (e.g., "all adults aged 18–75 with Type 2 diabetes")
- A **numerator** — the subset who actually received it (e.g., "those who had a HbA1c < 8% in the measurement year")
- A **rate** — numerator ÷ denominator, expressed as a percentage (e.g., "64% of diabetic patients had controlled A1C")

In Vermont AHEAD, HEDIS rates feed directly into the quality performance score that determines how much shared savings an ACO receives.

### Sub-Tab 1: HEDIS Panel View

**14 HEDIS measures are tracked** across the 8-patient panel:

| Measure Code | Full Name | Clinical Area |
|---|---|---|
| CDC-HbA1c | Diabetes Care — A1C Control (<8%) | Diabetes |
| CDC-Test | Diabetes Care — A1C Testing | Diabetes |
| CDC-Eye | Diabetes Care — Eye Exam | Diabetes |
| CDC-KE | Diabetes Care — Kidney Health Evaluation | Diabetes |
| CBP | Controlling High Blood Pressure | Cardiovascular |
| FUH-7 | Follow-Up After Hospitalization (Mental Illness) — 7 day | Behavioral Health |
| FUH-30 | Follow-Up After Hospitalization (Mental Illness) — 30 day | Behavioral Health |
| AMM | Antidepressant Medication Management | Behavioral Health |
| SPD | Statin Therapy — Patients with Diabetes | Cardiovascular/Diabetes |
| SPC | Statin Use — Cardiovascular Disease | Cardiovascular |
| MAH | Medication Adherence — Diabetes (PDC ≥80%) | Medication |
| PCE | COPD Exacerbation — Systemic Corticosteroid | Pulmonary |
| PCE-BD | COPD Exacerbation — Bronchodilator | Pulmonary |
| FLU | Annual Influenza Vaccination | Preventive |

**How to Use the Measure Summary Grid:**
- 14 colored tiles appear at the top, each showing the measure code, full name, panel rate percentage, and a colored bar (green ≥70%, amber 50–70%, red <50%)
- Click any tile to open a **detailed measure panel** below the grid
- The detail panel shows: full name, domain, numerator definition, denominator definition, data source (what codes to look for), Vermont AHEAD context, and the LOINC or ICD-10 codes used for numerator capture
- Below the measure detail is a **patient-level table** showing which patients are in the denominator, whether they meet the numerator, the specific gap description, and the recommended closing action

**The full-panel grid at the bottom:**  
A cross-tab matrix showing every patient × every measure with green checkmarks (in numerator) or red X marks (gap) or "N/A" (not in denominator). This lets you see at a glance which patients have the most gaps and which measures have the worst panel rates.

**Key HEDIS concepts explained in the tool:**

- **PDC (Proportion of Days Covered):** For medication adherence measures, this is the percentage of days in a measurement period during which a patient had medication available. Calculated from pharmacy claims. PDC ≥80% = in the numerator. PDC <80% = gap. Example: if a patient has a 90-day supply every 100 days, their PDC is 90%.

- **Data sources for HEDIS:** The tool shows for each measure whether data comes from claims (CPT codes, DRG codes), lab data (LOINC codes via EHR or HIE), pharmacy claims (RxNorm codes), or hybrid sources. This matters because data that exists clinically but isn't coded correctly is invisible to HEDIS calculation.

- **Vermont AHEAD context:** Each measure has a Vermont-specific note explaining how it relates to the AHEAD global budget model, which measures are weighted most heavily, and where Vermont has historically underperformed.

### Sub-Tab 2: 30-Day Readmission Analyzer

**Background for new users:**  
A "30-day readmission" happens when a patient is discharged from a hospital and then admitted again within 30 days. CMS (the federal Medicare agency) penalizes hospitals with high readmission rates under the Hospital Readmissions Reduction Program (HRRP). In a VBC contract, the ACO is at financial risk for excess readmissions because they represent care failures that drive up total costs.

**What the CMS RSRR methodology means:**  
RSRR stands for Readmission Standardized Rate Ratio. It compares how many readmissions a hospital actually had (observed) to how many CMS expected, given the patient population's risk level (expected). A ratio above 1.0 means more readmissions than expected — penalty territory. The risk adjustment uses HCC diagnoses present at the index admission.

**What the tool shows:**

Panel summary statistics:
- Total index admissions in the panel
- Number of 30-day readmissions
- Panel readmission rate (%)
- Number of potentially preventable readmissions

For each readmission, an expandable record shows:
- The **index admission** (the original hospitalization): admit date, discharge date, principal diagnosis, DRG code and description, cost
- The **readmission event**: admit date, days since discharge, principal diagnosis, cost
- **Root cause analysis**: what failure of care management, medication adherence, or follow-up led to the readmission
- **Risk adjustment context**: the patient's RAF score, what CMS expects for a patient at that risk level, and how the actual cost compares

**The two readmissions in the panel:**

1. *Elaine Morrison:* CHF discharge May 8 → DKA admission June 2 = 25 days. Root cause: insulin non-adherence, no post-discharge follow-up appointment, food insecurity preventing medication access.

2. *William Desrochers:* CHF discharge September 22 → CHF readmission November 18. Root cause: 21-day SNF stay without home health transition, no transition care management (TCM) visit within 7 days of SNF discharge.

**The full encounter table:**  
At the bottom, every inpatient, ED, and SNF encounter across all 8 patients is listed chronologically with type, facility, dates, principal diagnosis, cost, and flags (Readmit / Avoidable).

### Sub-Tab 3: Avoidable ED Visit Tracker

**Background for new users:**  
Not every ED visit is medically necessary. The Agency for Healthcare Research and Quality (AHRQ) published the **Prevention Quality Indicators (PQIs)** — a list of conditions where good outpatient primary care management can prevent hospitalization or ED visits. These are called "ambulatory care-sensitive conditions" (ACSCs). An ED visit for a PQI condition is considered "potentially avoidable" — meaning better outpatient care could have prevented it.

**ACSC conditions covered in the platform:**

| ICD-10 | Condition | AHRQ PQI | Why It's Avoidable |
|---|---|---|---|
| J44.1, J44.0 | COPD Exacerbation | PQI-05 | Written action plans, rescue medications, and pulmonary rehab prevent most acute exacerbations |
| I50.32, I50.22, I50.9 | Heart Failure | PQI-08 | Daily weight monitoring (RPM), medication titration, and fluid management prevent decompensation |
| E11.65 | Uncontrolled T2DM | PQI-01/03 | Pharmacist MTM, CGM, and dietary support maintain glycemic control |
| I10 | Hypertension | PQI-07 | Outpatient medication management and RPM control blood pressure without hospitalization |

**What the tool shows:**

Four summary statistics: total ED visits, avoidable visits, avoidable rate (%), avoidable cost ($)

For each avoidable visit, an expandable record shows:
- Patient name, age, payer
- Visit date and cost
- ACSC classification (which PQI applies)
- AHRQ description of why the condition is ambulatory-care-sensitive
- Root cause specific to this visit (what failure of care management led to the ED visit)

**Panel findings:** 11 of the panel's ED visits are classified as avoidable, representing $22,800 in potentially avoidable spending. The majority involve COPD (James Bouchard, 4 visits, $10,800) and CHF/T2DM (Elaine Morrison, 3 visits, $6,700; Marcus Webb, 2 visits, $4,800).

---

## 6. High vs. Low Value Care Analysis

**File:** `components/research/HighLowValueCare.tsx`  
**Route:** `/research-lab/vbc-clinical-quality?tab=value`  
**Access from:** Clinical pillar sidebar → "High vs. Low Value Care"

### What It Is

A three-section tool that quantifies what value-based care organizations actually do every day: identify where money is well spent (high-value care that prevents illness) vs. poorly spent (low-value care that adds cost without clinical benefit), and demonstrate the financial impact of closing care management gaps.

### Sub-Tab 1: A1C & BP Panel Management

**Background for new users:**  
"Panel management" is how primary care practices — and by extension, ACOs — manage the health of their entire attributed patient population, not just the patients who come in for appointments. The goal is to proactively identify patients whose chronic conditions are not well controlled and intervene before they need the ED or hospital.

**Two metric views are available (toggle button at top):**

**A1C View (Diabetes Panel):**  
Shows all patients with Type 2 diabetes in the panel. For each patient:
- Latest HbA1c value with color coding (green <8%, amber 8–9%, red ≥9%)
- Control status (Controlled / Uncontrolled)
- Trend direction (Improving / Worsening / Stable) based on sequential values
- A1C history: up to 4 time-point values shown as color-coded mini-tiles, oldest to newest — so you can see trajectory at a glance
- VBC opportunity dollar estimate: for uncontrolled patients, the estimated annual shared savings value of achieving control

The shared savings math is explained in a dark banner:
1. **HEDIS quality score:** Each 1% improvement in CDC-HbA1c rate boosts the ACO's AHEAD quality score, which is weighted 1.5× in the composite
2. **Utilization avoidance:** Uncontrolled T2DM (A1C >9%) generates ~3× more ED visits and ~2× more hospitalizations vs. controlled — moving to controlled reduces TCOC by $1,200–$3,400/patient/year
3. **RAF trajectory:** Persistently uncontrolled T2DM progresses to complications, moving from HCC 19 (coefficient 0.105) to HCC 18 (coefficient 0.302) — higher score, but actual costs increase faster than the benchmark

**BP View (Hypertension Panel):**  
Same format for hypertensive patients — latest BP reading, control status (<140/90 threshold for HEDIS CBP), trend, and closing action. Highlights Maria Gonzalez's RPM success: 162/98 → 124/76 after remote monitoring enrollment, with the full RPM ROI calculation displayed.

**Intervention recommendations panel:**  
Below the table, for each uncontrolled patient, a panel lists: current A1C or BP value, RAF score, risk tier, open HEDIS gaps, and SDOH barriers. This is the workflow a care manager would use to prioritize outreach.

### Sub-Tab 2: Choosing Wisely Scan

**Background for new users:**  
**Choosing Wisely** is a program run by the ABIM Foundation (American Board of Internal Medicine Foundation) in which medical specialty societies publish lists of tests and treatments that are commonly ordered but — according to evidence — provide little or no benefit to patients in specific situations, or where the risks outweigh the benefits. These are called "low-value care" services. They are not fraudulent billing — they are well-intentioned clinical orders that evidence says should be reduced.

**Why this matters in VBC:**  
In a value-based care contract, the ACO is accountable for total cost of care. Low-value services add cost without improving outcomes. Identifying Choosing Wisely patterns in claims data is one of the highest-ROI activities an ACO analytics team can do.

**5 Choosing Wisely recommendations are implemented:**

| ID | Recommendation | Sponsoring Society | Evidence Grade | Est. Waste/Event |
|---|---|---|---|---|
| CW-001 | No routine chest X-rays in stable COPD | American College of Physicians | A | $140 |
| CW-002 | No routine urinalysis in asymptomatic adults | American Academy of Family Physicians | B | $35 |
| CW-003 | No repeat HbA1c more than every 3 months in stable, at-goal T2DM | American Diabetes Association | B | $45 |
| CW-004 | No routine CT for non-specific chest pain in low-risk patients | American College of Emergency Physicians | A | $1,200 |
| CW-005 | No antibiotics for upper respiratory infections without confirmed bacterial etiology | American Academy of Family Physicians | A | $65 |

**How the scan works:**  
For each recommendation, the tool checks whether any patient in the panel has:
- The trigger diagnosis (ICD-10 code) AND
- The flagged CPT code in the same or a related encounter

Where a match is found, the flag card shows: the recommendation text, grade, sponsoring society, matched CPT codes, matched diagnoses, estimated waste per event, and the specific patient(s) affected with their encounter dates and costs.

**Panel findings:**  
- James Bouchard (COPD): 6 chest X-rays in 12 months → $840 potentially low-value imaging
- Dorothy Lafleur (T2DM/CKD): 4 repeated urinalysis orders → $140 potentially low-value testing
- Total panel potential waste: ~$980

### Sub-Tab 3: Total Cost of Care Decomposition

**Background for new users:**  
"Total Cost of Care" (TCOC) is the sum of all healthcare spending for an attributed patient over a year — inpatient, outpatient, ED, pharmacy, skilled nursing, labs, everything. In Vermont AHEAD, the ACO receives a global budget based on expected TCOC for its attributed population. If actual TCOC is below budget, the ACO keeps a share of the savings. Understanding where TCOC comes from is the first step to managing it.

**How to use the tool:**
1. Select any of the 8 patients using the name buttons at the top (each shows first name + annual cost in thousands)
2. The patient's cost is decomposed into a horizontal waterfall bar chart showing each service category as a proportional bar
3. Color coding indicates modifiability: red (inpatient), orange (SNF/post-acute), amber (ED) are highly modifiable; green (office) and blue (telehealth) are low/fixed

**Service categories:**

| Category | Color | Modifiability | Primary VBC Levers |
|---|---|---|---|
| Inpatient | Red | Partially modifiable | Care management, readmission prevention, bundled payments |
| SNF/Post-Acute | Orange | Highly modifiable | Preferred SNF networks, standardized discharge criteria, TCM |
| Emergency Department | Amber | Highly modifiable | RPM, care management triggers, PCMH access |
| Outpatient/Office | Green | Fixed/low | Invest here to reduce the above categories |
| Telehealth | Blue | Fixed/low | Low-cost access, increases adherence |

**Modifiable vs. fixed split:**  
Below the waterfall, the tool calculates the total modifiable spend (inpatient + SNF + ED) vs. fixed spend and displays both with explanatory notes.

**Vermont AHEAD benchmarking:**  
A three-cell panel at the bottom shows:
1. Panel average PMPY across all 8 patients
2. How this patient compares to the panel average (above/below %)
3. Expected TCOC for this patient based on RAF-adjusted CMS benchmark (RAF score × $18,400 base rate)

**William Desrochers (highest cost) breakdown:**
- Inpatient: $22,400 (33%)
- SNF/Post-Acute: $26,000 (38%)
- ED visits: $7,900 (12%)
- Office/other: ~$12,100 (17%)
- 76% of his TCOC is in highly modifiable categories

---

## 7. Risk Stratification Methodology

**File:** `components/research/RiskStratificationMethodology.tsx`  
**Route:** `/research-lab/vbc-clinical-quality?tab=risk`  
**Access from:** Clinical pillar sidebar → "Risk Stratification Methodology"

### What Risk Stratification Means (for new users)

"Risk stratification" means sorting a patient population into groups based on how sick they are and how much healthcare they are likely to use. The purpose is not to discriminate — it is to make sure that sicker patients who need more intensive support actually receive it, while resources are not wasted on patients who are doing well.

In value-based care, risk stratification is critical for two reasons:
1. **Care management targeting:** You can't give every patient the same level of care management. Risk scores identify who needs a dedicated case manager, who needs a phone check-in, and who just needs their annual preventive visit.
2. **Payment adjustment:** Risk scores are used to adjust how much an ACO gets paid. If your population is sicker than average, you get paid more (higher expected TCOC). If your population is healthier, you get paid less. This prevents gaming by ensuring providers aren't rewarded just for enrolling healthy patients.

### Sub-Tab 1: HCC Walkthrough

**What HCC Is:**  
HCC stands for Hierarchical Condition Category. It is the risk adjustment model used by CMS for all Medicare payment. Every ICD-10 diagnosis maps to either an HCC category (with a published dollar weight called a "coefficient") or no HCC. A patient's RAF (Risk Adjustment Factor) score is calculated by adding up the demographic baseline factor plus the coefficients of all applicable HCCs.

**RAF = 1.0** means this patient is expected to cost exactly the average Medicare beneficiary.  
**RAF = 1.82** (Elaine Morrison) means 82% more than average.  
**RAF = 2.14** (William Desrochers) means 114% more than average.

**5 key hierarchy rules are explained and illustrated:**

1. **HCC 18 supersedes HCC 19:** When a patient has both "Diabetes with Complications" (HCC 18) and "Diabetes without Complications" (HCC 19) coded, only HCC 18 counts. The hierarchy prevents double-counting the same condition at two severity levels.

2. **Disease interaction coefficients:** CMS v28 adds an extra coefficient when certain high-cost combinations co-occur. CHF + COPD together generates an interaction coefficient of 0.139 on top of the individual weights — because the combination is known to cost even more than the two conditions separately.

3. **Malnutrition is the highest-weighted single HCC:** HCC 21 (Protein-Calorie Malnutrition) has a coefficient of 0.455 — higher than CHF (0.331), COPD (0.346), or T2DM with complications (0.302). It is chronically undercoded because clinicians focus on the primary diagnosis.

4. **Demographic baseline is always added:** Even a patient with no chronic conditions has a RAF > 0 based on age and sex. Female 65–69 = 0.378; Male 75–79 = 0.562. Disease coefficients add on top of this.

5. **Enrollment type multipliers:** CMS applies different models for community-dwelling, institutional (nursing home), and new-enrollee populations. Vermont AHEAD uses the community model.

**Patient-level RAF walkthrough:**  
Select any of the 8 patients. The tool shows:
- Step 1: Demographic factor (age + sex baseline)
- Steps 2–N: Each HCC with its code, label, mapped ICD-10 codes, and coefficient (expandable for plain-English explanation)
- Sum: Calculated total RAF with breakdown
- Interpretation: What the RAF score means in dollar terms (expected PMPY = RAF × $18,400 base rate) and how it compares to actual PMPY

### Sub-Tab 2: Population Tiers

A visual risk stratification pyramid showing all 8 patients distributed across 4 tiers:

| Tier | RAF Range | Population % | Cost Share | Intervention |
|---|---|---|---|---|
| Very High | ≥1.5 | 5–10% | 40–50% | Intensive case management, care coordinator, monthly outreach, 30-day TCM post-discharge |
| High | 1.0–1.49 | 10–15% | 25–35% | Care management, quarterly outreach, HEDIS gap closure, RPM enrollment |
| Rising | 0.5–0.99 | 20–30% | 15–20% | Annual wellness, SDOH screening, preventive care gap closure, medication adherence support |
| Low | <0.5 | 50–60% | 5–10% | Standard preventive care, telehealth convenience access |

The pyramid visualization shows tier width proportional to population share. Each tier card lists the patients in that tier with their RAF scores and annual costs.

### Sub-Tab 3: Algorithm Comparison

**5 risk adjustment algorithms are compared side by side:**

| Algorithm | Owner | Public? | Used For |
|---|---|---|---|
| CMS HCC v28 | CMS | Yes — fully public | Medicare ACOs, MSSP, ACO REACH, Vermont AHEAD Medicare |
| Johns Hopkins ACG | Johns Hopkins Bloomberg | No — licensed | Some Medicaid programs, employer plans; requires JHU license |
| CDPS | UC San Diego | Partial | Medicaid risk adjustment; used in Vermont for Medicaid benchmarking |
| Charlson Comorbidity Index | Weill Cornell (public domain) | Yes | Clinical research, hospitalization risk prediction, surgical risk |
| Elixhauser Comorbidity Index | AHRQ (public domain) | Yes | Inpatient outcomes research, readmission prediction |

For each algorithm, the comparison card shows: owner, public/proprietary status, primary use, input data required, output unit/format, strengths, limitations, and Vermont AHEAD-specific context.

**Important note on Johns Hopkins ACG:**  
The platform explains clearly and accurately that the Johns Hopkins ACG system is proprietary and licensed — the algorithm cannot be authentically implemented without a license from Johns Hopkins University. The platform explains the conceptual methodology (ADGs → Major ADGs → ACG cells → RUB scores) based on published academic literature, while being transparent that the actual weights require a license. This is the most honest and educationally appropriate approach.

### Sub-Tab 4: Vermont VCCI Scenario

This is the most comprehensive sub-tab. It is documented fully in Section 8.

---

## 8. Vermont VCCI Scenario

**File:** `components/research/VCCIScenario.tsx`  
**Route:** `/research-lab/vbc-clinical-quality?tab=risk` then select "Vermont VCCI Scenario" tab  
**Data file:** `lib/vcciScenarioData.ts`

### What VCCI Is (For New Users)

**VCCI** stands for **Vermont Chronic Care Initiative**. It is a program run by the **Department of Vermont Health Access (DVHA)** — Vermont's Medicaid agency — under the authority of Vermont's **Global Commitment to Health 1115 Medicaid Waiver**.

Think of VCCI as Vermont Medicaid's intensive care management program for its sickest and most expensive members. Vermont has about 230,000 Medicaid members. The sickest 5% of those members account for roughly 39% of all Medicaid spending. VCCI identifies those members, assigns them a dedicated case manager, builds a shared care plan with their clinical team, and helps address both medical needs and social barriers (housing, food, transportation, mental health, substance use).

**VCCI is voluntary.** Members who qualify must consent to enrollment. The case management is free to them. The program's value is in reducing preventable hospitalizations, ED visits, and care fragmentation for people who otherwise navigate a complex healthcare system alone.

**How it connects to Vermont AHEAD:**  
VCCI does not operate in isolation. It is one layer in Vermont's stacked care management infrastructure:
- **Blueprint for Health Community Health Teams (CHTs):** Handle medium-risk Medicaid members; community-based, less intensive
- **VCCI:** Handle high- and very-high-risk Medicaid members; dedicated case manager, intensive, telephonic or in-person
- **Vermont AHEAD ACO care management:** Handle high-risk attributed Medicare/commercial members
- These three programs share tools, care plan formats, and referral processes — enabling warm handoffs as patients move between coverage types

### How VCCI Identifies Members (The Three-Step Process)

**Step 1 — Identification:**  
DVHA runs monthly predictive analytics on all Medicaid claims. The algorithm flags members in the top 5–15% by predicted cost, based on: prior utilization (ED visits, hospitalizations, readmissions), chronic condition burden (using CDPS categories), polypharmacy, and high predictability of future complications. Referrals also arrive from PCPs, hospitals, emergency departments, Community Health Teams, social workers, and self-referral.

**Step 2 — Scoring and Tier Assignment:**  
A multi-domain composite score (0–100) is calculated. Then a telephonic screening call adds SDOH data (housing, food security, substance use, mental health, IPV) — this SDOH dimension was added in October 2018 after research showed social factors drive utilization as much as clinical factors. The final score + CDPS score + cost percentile determine the risk tier.

**Step 3 — Enrollment and Care Management:**  
- Very High / High → VCCI intensive case management
- Medium → Blueprint CHT referral (not VCCI direct)
- Low → Standard Medicaid preventive outreach

### The VCCI Composite Score — Detailed Breakdown

The composite score (0–100) has four weighted domains:

| Domain | Weight | Max Points | What It Measures |
|---|---|---|---|
| Utilization | 35% | 35 | ED visits (3+ = 12 pts), inpatient admissions (2+ = 10 pts), 30-day readmission (8 pts), SNF use (5 pts) |
| Chronic Burden (CDPS) | 30% | 30 | Very High CDPS category (12 pts), 2+ High categories (10 pts), polypharmacy ≥7 meds (8 pts), 3+ CDPS categories (7 pts) |
| SDOH Vulnerability | 20% | 20 | Housing instability (6 pts), food insecurity (4 pts), active SUD (4 pts), MH crisis (4 pts), IPV screen (2 pts), rural access barrier (6 pts) |
| Care Gaps | 15% | 15 | No PCP visit 6 months (5 pts), PDC <60% ≥2 meds (5 pts), HEDIS gap (3–5 pts), transport barrier (2–5 pts) |

In addition to the scored domains, two **eligibility gates** must be passed (they don't add points but are required):
- **Primary gate:** Top 5% cost (95th percentile or above)
- **Secondary gate:** CDPS score ≥2.0 (for members who are high-risk but not yet in the top cost percentile)

**Risk tier thresholds:**

| Score | CDPS | Cost %tile | Tier | Action |
|---|---|---|---|---|
| ≥80 | ≥3.5 | ≥95th | Very High | VCCI intensive — dedicated case manager, shared care plan, monthly touchpoints, eco-mapping |
| 60–79 | ≥2.0 | ≥80th | High | VCCI intensive — bi-monthly touchpoints, community resource navigation |
| 35–59 | ≥1.0 | ≥60th | Medium | Blueprint CHT referral — re-evaluate for VCCI in 90 days |
| <35 | <1.0 | <60th | Low | Standard Medicaid preventive outreach |

### What CDPS Is (Detailed Explanation)

**CDPS (Chronic Illness and Disability Payment System)** was developed at the University of California San Diego by Richard Kronick and colleagues, originally published in 1996 and regularly updated. It is Medicaid's counterpart to Medicare's HCC model.

**The core difference from HCC:**
- HCC maps ICD-10 diagnoses to 115 condition categories, each with one coefficient
- CDPS maps ICD-10 diagnoses to ~20 body-system categories, each with severity sub-levels (Very High, High, Medium, Low)
- CDPS was designed specifically for the Medicaid population — it weights mental health and substance use disorders more heavily than HCC, because those conditions are far more prevalent and cost-driving in Medicaid than in Medicare

**CDPS categories relevant to the Vermont population:**

| Category Code | Label | Weight | Typical Diagnoses |
|---|---|---|---|
| CARD_VH | Cardiovascular — Very High | 4.62 | I50.x (CHF), I21-22 (AMI) |
| CARD_H | Cardiovascular — High | 2.31 | I25.x (CAD), I48.x (AFib) |
| PULM_H | Pulmonary — High | 1.94 | J44.x (COPD), J45.x (Asthma) |
| DIAB_H | Diabetes — High | 1.72 | E11.6x, E11.4x (T2DM with complications) |
| SUD_H | Substance Use — High | 1.88 | F10.2x, F11.2x (Alcohol/Opioid Use Disorder) |
| MH_H | Mental Health — High | 2.07 | F31.x (Bipolar), F33.x (MDD severe), F20.x (Schizophrenia) |
| RENAL_H | Renal — High | 2.18 | N18.4-6 (CKD Stage 4-5, ESRD) |
| CANCER | Cancer | 2.96 | C18.x, C34.x, C50.x, C61.x |
| HIV | HIV/AIDS | 3.84 | B20.x, B24.x |

**How CDPS score is calculated:**  
`CDPS Score = Demographic Baseline Factor + Sum of applicable CDPS category weights`

A score of 1.0 = average Medicaid member cost. A score of 4.84 (Raymond Forcier, Very High tier) means expected to cost 484% of the average Medicaid member.

**CDPS vs. HCC comparison (important for dual-eligible patients):**  
Dual-eligible patients (enrolled in both Medicare and Medicaid) have TWO risk scores calculated under two different models:
- **HCC RAF** calculated from Medicare claims → used for Medicare payment
- **CDPS score** calculated from Medicaid claims → used for Medicaid payment

Both scores can be seen side by side for Linda Beaupre in the VCCI scenario (HCC RAF 1.38 + CDPS 2.94).

### The Three VCCI Patient Scenarios

---

**Patient 1 — Raymond Forcier, 54M, Rutland County, SSI Medicaid**  
*Composite Score: 90/100 | CDPS: 4.84 | Risk Tier: Very High | VCCI Enrolled*  
*Annual Cost: $58,400 (97th percentile)*

Raymond is the archetypal VCCI Very High patient. He has:
- Chronic systolic CHF (uncontrolled — NT-proBNP 3,840 pg/mL)
- Uncontrolled T2DM (A1C 9.8%)
- Opioid use disorder (OUD) on buprenorphine/naloxone (MOUD)
- Moderate recurrent major depressive disorder (PHQ-9 = 14)
- Essential hypertension (BP 158/96)
- CKD Stage 3

**Utilization in 12 months:** 3 inpatient admissions (2 for CHF, 1 for DKA), 6 ED visits (CHF, hyperglycemia, psychiatric crisis), 1 office visit. The DKA admission was a 25-day readmission from the prior CHF discharge.

**Medications:** 7 active medications including buprenorphine/naloxone, furosemide, carvedilol, lisinopril, metformin, insulin glargine, and sertraline. Adherence PDC is below 0.60 for insulin (0.48), furosemide (0.62), and carvedilol (0.58) — three medications below the adherence threshold. Two drug interaction flags are noted (metformin + CKD eGFR <45; furosemide + hypokalemia risk in CKD).

**SDOH flags:** Housing instability (8 months unstably housed), food insecurity (food shelf 3–4 days/week, not enrolled in SNAP), transportation barrier (30% appointment miss rate), social isolation (estranged from family due to prior OUD), active SUD (AUDIT-C = 8), financial strain (SSI $914/month, insulin rationing).

**VCCI goals:** Housing stabilization, CHF self-management competency, A1C reduction to <8%, MOUD adherence maintenance, ED visit reduction.

**Outcome (6 months post-enrollment):** A1C 9.8% → 8.4%. Zero ED visits in 3 months post-enrollment vs. 3 in prior 3 months. Housing stabilized via emergency bridge voucher. MOUD adherence >95%.

**FHIR CarePlan status:** Active. Activities include pharmacist MTM (monthly, 3 months), daily home weight RPM with 3-lb alert threshold, housing navigation, MOUD adherence support.

**HL7 Referral message type:** REF^I12 from DVHA Analytics to VCCI case management unit.

---

**Patient 2 — Linda Beaupre, 61F, Caledonia County, ABD Medicaid + Medicare Dual**  
*Composite Score: 74/100 | CDPS: 2.94 | HCC RAF: 1.38 | Risk Tier: High | VCCI Enrollment Pending*  
*Annual Cost: $31,200 (88th percentile)*

Linda illustrates the rural access dimension of VCCI. She is a dual Medicare/Medicaid enrollee in Vermont's Northeast Kingdom — one of the most rural and medically underserved regions in the state. She has:
- COPD with acute exacerbation (3 hospitalizations in 12 months, all at Northeastern Vermont Regional Hospital — a Critical Access Hospital with 25 beds)
- T2DM without complications (A1C controlled at 7.4%)
- Moderate recurrent major depression (PHQ-9 = 12)
- Essential hypertension (controlled, BP 132/80)
- 50 pack-year smoking history

**Key VCCI scoring distinction:** Linda does NOT have a CDPS Very High condition — her highest category is PULM_H (1.94). She qualifies for VCCI via the secondary pathway (CDPS 2.94 ≥ 2.0 threshold) rather than the primary top-5% cost gate (she's at 88th percentile, below the 95th percentile primary gate).

**Rural access barriers captured:** Poor broadband (<10 Mbps — insufficient for stable video telehealth), no vehicle (public transit 2 days/week in St. Johnsbury only), lives alone since husband passed in 2022. VCCI approach: telephonic-only care management.

**HEDIS gap:** No written COPD action plan — fails HEDIS PCE-BD bronchodilator measure.

**FHIR CarePlan status:** Draft (pending enrollment after telephonic screening).

**Dual-eligible scoring:**  
This patient demonstrates why dual eligibles require both CDPS and HCC calculation. Her HCC RAF of 1.38 (Medicare model) reflects COPD + MDD + T2DM in a 61-year-old. Her CDPS of 2.94 (Medicaid model) reflects the same conditions weighted differently for a Medicaid-enrolled population. Vermont AHEAD must calculate both to understand her total cost across both payer streams.

---

**Patient 3 — Darnell Washington, 38M, Chittenden County, MAGI Medicaid**  
*Composite Score: 48/100 | CDPS: 1.44 | Risk Tier: Medium | CHT Referral Only (Not VCCI)*  
*Annual Cost: $12,800 (72nd percentile)*

Darnell is deliberately included to illustrate the **VCCI tier boundary**. He is a 38-year-old in early recovery from alcohol use disorder, with generalized anxiety and hypertension. He has had 2 ED visits in 12 months for AUD relapse. His cost percentile (72nd) is below the VCCI primary gate (95th), and his CDPS (1.44) is below the secondary gate (2.0). He scores 48/100 — below the High threshold of 60.

**Result: CHT referral, NOT VCCI enrollment.**  
Darnell is referred to the Blueprint for Health Community Health Team in Burlington for SUD peer recovery support and SNAP enrollment assistance. The platform displays this with an explicit note: "NOT eligible for VCCI intensive case management (score 48, CDPS 1.44, 72nd percentile). Referring to Blueprint CHT Burlington."

**Why Darnell Is Included:**  
Understanding what does NOT qualify for VCCI is as important as understanding what does. The Medium tier and CHT referral pathway are explicitly documented here so users understand the program's targeting logic.

### The 7 VCCI Scenario Sub-Views

For each of the three VCCI patients, 7 views are available:

**1. VCCI Program Overview**  
A static educational panel (same across all patients) covering:
- The 3-step identification → scoring → enrollment process
- Risk tier threshold table
- VCCI's relationship to Blueprint CHT and Vermont AHEAD ACO
- How CDPS (Medicaid) and HCC (Medicare) are Vermont's two parallel risk models

**2. CDPS Score**  
Step-by-step CDPS calculation:
- Step 1: Demographic baseline factor (age + sex + enrollment category)
- Steps 2–N: Each CDPS category present, expandable to show the ICD-10 code, category label, CDPS weight, control status, most recent lab value, and (for dual eligibles) the equivalent HCC code and weight for comparison
- Sum: Calculated total with interpretation
- A callout box explains what the CDPS score means for VCCI eligibility and what the expected annual cost is at that score level

**3. Composite Score**  
Domain-by-domain breakdown of the 0–100 composite score:
- Visual score bar with threshold markers at 35 (Medium), 60 (High), 80 (Very High)
- Each domain accordion expands to show every scoring criterion, whether it triggered, how many points it earned, and the specific evidence (encounter date, test result, screen finding) that triggered it
- Eligibility gate section (non-scored but required): top-5% cost gate and CDPS threshold gate
- Tier decision panel with recommended VCCI action

**4. SDOH Screening**  
All SDOH items shown as flagged (red) or clear (green):
- Each flagged item includes the HL7 OBX segment that encodes it (e.g., `OBX|1|CWE|71802-3^Housing status^LN||LA30190-5^Homeless^LN`)
- Each flagged item also includes the FHIR Observation resource reference (e.g., `Observation: LOINC 71802-3 = Housing status → LA30190-5 (Homeless)`)
- A scoring grid at the bottom (dark background) shows how each SDOH flag maps to VCCI Domain 3 points, with the LOINC code for each screening instrument

**5. HL7 / FHIR Referral**  
Two sub-views toggle:

*HL7 v2 REF^I12 view:* The complete VCCI referral message. REF^I12 is the HL7 message type specifically for patient referrals to care management programs — distinct from ADT (admissions) and ORU (labs). Segments include MSH, RF1 (referral information), PID, PV1, DG1 (multiple diagnosis segments), IN1/IN2 (insurance including dual-eligible Medicare), and multiple OBX segments carrying VCCI-specific scores (composite score, risk tier, CDPS, HCC RAF, AUDIT-C, PHQ-9, housing screen).

*FHIR R4 CarePlan view:* The full FHIR CarePlan resource as formatted JSON, showing status (active for Raymond, draft for Linda), goals, planned activities, care team references, and enrollment notes. Under ONC 21st Century Cures Act, care plans must be shareable via patient access APIs — VCCI care plans are required to be accessible through Vermont's Medicaid FHIR API.

**6. Encounter History**  
Timeline of all encounters sorted by date (newest first):
- Type badge (inpatient in red, ED in amber, office in green)
- VCCI flag for avoidable encounters with root cause explanation
- DRG code where applicable
- Length of stay
- Cost

**7. Care Team**  
Provider cards for all team members with NPI, role, organization, and FHIR reference:
- PCP: Dr. Amara Osei — Rutland Regional Medical Associates
- VCCI Case Manager: Sandra Bilodeau, RN, CCM — DVHA/VCCI
- Cardiologist: Dr. Kenji Tanaka — UVM Medical Center Heart Center
- Social Worker/LICSW: Maria Santos — Rutland Mental Health Services
- Nephrologist: Dr. Priya Nair — Dartmouth-Hitchcock Kidney Center
- Clinical Pharmacist (MTM): Tom Guerette, PharmD — Community Pharmacy Rutland

Hospital cards with type, county, bed count, Critical Access Hospital flag, and FHIR Organization reference:
- Rutland Regional Medical Center (188 beds, Rutland County, Acute Care)
- UVM Medical Center (562 beds, Chittenden County, Academic Medical Center)
- Northeastern Vermont Regional Hospital (25 beds, Caledonia County, Critical Access)
- Southwestern Vermont Medical Center (99 beds, Bennington County, Acute Care)

VCCI enrollment status panel: eligible, enrolled, enrollment date, risk tier, composite score, CDPS, cost percentile — all at a glance.

---

## 9. VCCI Dataset

**File:** `lib/vcciScenarioData.ts`

This file exports the following data structures used by `VCCIScenario.tsx`:

### Interfaces (TypeScript Types)

| Interface | Purpose |
|---|---|
| `VCCIProvider` | Provider: NPI, name, role, organization, phone, FHIR reference |
| `VCCIHospital` | Hospital: ID, name, county, type, Critical Access flag, beds, FHIR ref |
| `VCCIScoreDomain` | One scoring domain: label, max points, weight, criteria array, earned points |
| `VCCISDOHItem` | One SDOH item: domain, flag, detail, HL7 OBX segment, FHIR resource reference |
| `VCCIChronicCondition` | One condition: ICD-10, CDPS category, CDPS weight, HCC code, HCC weight, control status, LOINC, latest value |
| `VCCIEncounter` | One encounter: date, type, facility, diagnosis, DRG, cost, LOS, avoidable flag |
| `VCCIMedication` | One medication: RxNorm, name, class, prescriber, PDC, drug interaction flag |
| `VCCIPatient` | Complete patient: all of the above plus demographics, risk scores, HL7 message, FHIR care plan, scenario narrative, VCCI goals, outcomes |

### CDPS Category Reference Table

The file contains a `CDPS_CATEGORIES` constant with 15 CDPS categories, each with label, approximate relative weight (based on published UCSD/Kronick methodology), and the ICD-10 code prefixes that map to each category.

### Risk Tier Threshold Constants

`VCCI_TIER_THRESHOLDS` exports the four tier definitions with their minimum composite score, minimum CDPS score, minimum cost percentile, and the full VCCI action description for each tier.

### Exported Constants

- `VCCI_PATIENTS` — array of 3 VCCIPatient objects
- `VCCI_PROVIDERS` — array of 6 VCCIProvider objects
- `VCCI_HOSPITALS` — array of 4 VCCIHospital objects
- `VCCI_TIER_THRESHOLDS` — tier threshold configuration
- `CDPS_CATEGORIES` — CDPS category reference data

---

## 10. Navigation and Integration Changes

### Files Modified (Not Created)

**`components/research/LabPageShell.tsx`**  
The top navigation bar shown inside every Research Lab page was updated. The new lab `/research-lab/vbc-clinical-quality` was added to the `NAV` array, so users can click "VBC & Quality" in the between-lab navigation strip to jump directly to the new lab from any other lab.

**`app/research-lab/page.tsx`**  
The Research Lab index page was updated in two ways:
1. The tool count in the page headline was updated from "20" to "24" (reflecting 4 new tools added)
2. Four new tool cards were added:
   - Under **Technology pillar:** "Clinical Data Exchange Lab" linking to `?tab=hl7`
   - Under **Clinical pillar:** "Risk Stratification Methodology," "VBC Quality Measures," and "High vs. Low Value Care" linking to their respective tabs

**`components/HomeSidebar.tsx`**  
The left navigation sidebar was updated with new links:
- Under **Technology pillar → Lab Tools section:** "Clinical Data Exchange Lab" (`/research-lab/vbc-clinical-quality?tab=hl7`)
- Under **Clinical pillar → Lab Tools section:** "Risk Stratification Methodology" (`?tab=risk`), "VBC Quality Measures" (`?tab=quality`), "High vs. Low Value Care" (`?tab=value`)

The active-pillar detection function was also updated: when a user navigates to `/research-lab/vbc-clinical-quality?tab=hl7`, the Technology pillar is highlighted in the sidebar. All other tabs at that route highlight the Clinical pillar.

---

## 11. File Inventory

### New Files Created

| File | Type | Lines | Purpose |
|---|---|---|---|
| `lib/syntheticPatients.ts` | Data | 945 | 8 Vermont patient profiles, USCDI elements, Choosing Wisely flags, panel summary |
| `lib/vcciScenarioData.ts` | Data | 650 | VCCI patients, providers, hospitals, CDPS categories, tier thresholds |
| `components/research/HL7FHIRExplorer.tsx` | Component | 506 | HL7 segment viewer, FHIR resource explorer, HL7↔FHIR bridge, USCDI browser |
| `components/research/VBCQualityDashboard.tsx` | Component | 582 | HEDIS panel, 30-day readmission, avoidable ED |
| `components/research/HighLowValueCare.tsx` | Component | 482 | A1C/BP panel, Choosing Wisely, TCOC decomposition |
| `components/research/RiskStratificationMethodology.tsx` | Component | 452 | HCC walkthrough, population tiers, algorithm comparison, VCCI tab |
| `components/research/VCCIScenario.tsx` | Component | 785 | Full VCCI scenario with 7 sub-views |
| `app/research-lab/vbc-clinical-quality/VBCClinicalQualityClient.tsx` | Client shell | 90 | Tab routing + LabPageShell wrapper |
| `app/research-lab/vbc-clinical-quality/page.tsx` | Page | 15 | Next.js route entry point with metadata |

**Total new code:** 4,402 lines across 7 data/component files + 2 page files

### Modified Files

| File | What Changed |
|---|---|
| `components/research/LabPageShell.tsx` | Added VBC & Quality to NAV array |
| `app/research-lab/page.tsx` | Updated tool count (20→24), added 4 tool cards |
| `components/HomeSidebar.tsx` | Added 4 new lab links, updated active-pillar detection |

---

## 12. Glossary of Key Terms

This glossary covers every technical term used in the new tools, in plain English.

**ACG (Adjusted Clinical Groups):** A proprietary risk stratification system from Johns Hopkins University that predicts future healthcare costs by grouping diagnoses into condition categories. Requires a license from JHU to implement.

**ACO (Accountable Care Organization):** A group of hospitals, doctors, and other providers who work together to give coordinated, high-quality care to patients. In VBC, ACOs are paid based on total cost of care and quality outcomes for their attributed population.

**ACSC (Ambulatory Care-Sensitive Condition):** A health condition where good outpatient care can prevent hospitalization or emergency visits. COPD, CHF, diabetes, and hypertension are examples. High ACSC admission rates indicate gaps in primary care.

**ADT Message (HL7):** Admission, Discharge, Transfer. The most common type of HL7 v2 message. ADT^A01 = patient admitted; ADT^A03 = patient discharged; ADT^A04 = patient registered as outpatient.

**AHEAD Model:** Vermont's All-Payer Accountable Care Organization (ACO) Model. A CMS-approved statewide value-based care model where Medicare, Medicaid, and commercial payers all participate together in a global budget. Vermont is the only state with this type of all-payer model.

**AUDIT-C:** A 3-question alcohol screening tool. Scores 0–12; ≥4 in men or ≥3 in women indicates hazardous drinking. LOINC code: 75626-2.

**Bundle (FHIR):** A FHIR resource that groups multiple other resources together. A Bundle of type "collection" or "transaction" is commonly used to represent a patient's complete clinical record at a point in time.

**CDPS (Chronic Illness and Disability Payment System):** Medicaid's risk adjustment model, developed at UC San Diego. Maps ICD-10 diagnoses to condition categories with severity levels, producing a score that predicts Medicaid cost relative to the average member (score 1.0 = average).

**CMS:** Centers for Medicare & Medicaid Services. The federal agency that runs Medicare and co-administers Medicaid with states.

**DG1 (HL7 segment):** Diagnosis Information. Each DG1 segment carries one ICD-10 diagnosis code. In HL7 v2 ADT messages, DG1 segments are the source of diagnosis data that feeds HCC risk adjustment.

**DRG (Diagnosis-Related Group):** A classification system used to group hospital inpatient cases with similar clinical profiles and expected resource use. Medicare pays a fixed amount per DRG regardless of how long the patient stays. DRG 291 = Heart failure and shock with MCC.

**DVHA (Department of Vermont Health Access):** Vermont's Medicaid agency. Administers Vermont Medicaid, VCCI, and participates in the AHEAD global budget model.

**eGFR (Estimated Glomerular Filtration Rate):** A blood test that measures how well the kidneys are filtering. LOINC 62238-1 (CKD-EPI method). Used to stage CKD and guide medication dosing.

**FHIR (Fast Healthcare Interoperability Resources):** The modern healthcare data exchange standard, published by HL7 International. Uses REST APIs and JSON. Required by ONC's 21st Century Cures Act for patient access portals and payer-to-payer data exchange.

**HEDIS (Healthcare Effectiveness Data and Information Set):** The primary quality measurement framework for health plans, ACOs, and VBC programs in the US. Published by NCQA. Contains ~90 measures across effectiveness of care, access, utilization, and health plan management domains.

**HCC (Hierarchical Condition Category):** CMS's risk adjustment model for Medicare. Maps ICD-10 diagnoses to categories with dollar-weight coefficients. RAF score = demographic baseline + sum of applicable HCC coefficients.

**HL7 v2:** Health Level Seven version 2. The dominant real-time clinical messaging standard used in hospitals. Pipe-delimited text format. Used for ADT events, lab results (ORU), orders, referrals, and more.

**ICD-10-CM:** International Classification of Diseases, 10th Revision, Clinical Modification. The standard diagnosis coding system used in the US for all clinical billing and quality reporting. Example: E11.65 = Type 2 diabetes mellitus with hyperglycemia.

**IPV (Intimate Partner Violence):** A component of SDOH screening in VCCI. The HITS screening tool (Hurt, Insult, Threaten, Scream) is used. LOINC: 96842-0.

**LOINC (Logical Observation Identifiers Names and Codes):** A universal coding system for laboratory tests, clinical measurements, and survey instruments. Maintained by Regenstrief Institute. Example: LOINC 4548-4 = Hemoglobin A1c. Used in OBX segments and FHIR Observation resources.

**MAGI Medicaid:** Modified Adjusted Gross Income — the income-based Medicaid eligibility category created by the ACA. Most working-age adults qualify for Medicaid under this category.

**MOUD (Medications for Opioid Use Disorder):** FDA-approved medications used to treat opioid addiction, including buprenorphine/naloxone (Suboxone), methadone, and naltrexone.

**MSH (HL7 segment):** Message Header. The first segment of every HL7 v2 message. Contains sender, receiver, message type, timestamp, and version.

**NT-proBNP:** A protein released by the heart when it is under stress. Elevated levels indicate heart failure severity. LOINC: 33762-6. Normal <300 pg/mL; acute HF typically >900 pg/mL.

**OBX (HL7 segment):** Observation Result. Each OBX segment carries one lab result or clinical observation with its LOINC code, value, units, and interpretation flag.

**ONC (Office of the National Coordinator for Health Information Technology):** The federal agency responsible for health IT policy, including EHR certification, interoperability standards (FHIR, USCDI), and information blocking rules.

**ORU^R01 (HL7):** Observation Result Unsolicited — Report. The HL7 v2 message type used to transmit lab results from the laboratory system to the ordering EHR and health information exchange.

**PDC (Proportion of Days Covered):** A pharmacy adherence metric. PDC = days of medication supply / total days in measurement period. PDC ≥80% is the standard threshold for HEDIS medication adherence measures.

**PHQ-9:** Patient Health Questionnaire — 9 item depression severity scale. Scores 0–27. 5–9 = mild; 10–14 = moderate; 15–19 = moderately severe; 20–27 = severe. LOINC: 55757-9.

**PID (HL7 segment):** Patient Identification. Contains patient demographics: name, DOB, sex, address, MRN. The primary source of patient identity data in HL7 messages.

**PQI (Prevention Quality Indicator):** AHRQ's set of indicators that use hospital inpatient data to identify quality of care for ambulatory conditions. PQI rates are used in VBC to track avoidable hospitalizations.

**PV1 (HL7 segment):** Patient Visit. Identifies the type of encounter (inpatient, outpatient, emergency), the location, and the attending physician. Financial class in PV1 determines payer-specific workflows.

**RAF (Risk Adjustment Factor):** The CMS HCC score. A value of 1.0 = average expected Medicare cost. Used as a multiplier on the base payment rate to set per-patient payment benchmarks.

**REF^I12 (HL7):** Patient Referral message type. Used to transmit referrals to care management programs, specialists, or other providers. The I12 event code = original referral. Used by DVHA for VCCI referrals.

**RPM (Remote Patient Monitoring):** Technology that collects patient vital signs or other health data outside the clinic — typically at home — and transmits it to clinical teams. CPT 99453 (setup), 99457 (monthly monitoring). Used for CHF weight monitoring, blood pressure management, glucose monitoring.

**RxNorm:** A standardized medication coding system maintained by the National Library of Medicine. Used in FHIR MedicationRequest resources and HL7 RXO/RXE segments. Example: RxNorm 860975 = Metformin 1000 MG Oral Tablet.

**SDOH (Social Determinants of Health):** Non-medical factors that influence health outcomes — housing, food security, transportation, social isolation, education, income, discrimination. Coded in FHIR as Observations (LOINC-coded screening tools) and Conditions (Z-codes in ICD-10).

**SNOMED CT (Systematized Nomenclature of Medicine — Clinical Terms):** A comprehensive clinical terminology used in FHIR Condition, Procedure, and Observation resources. Example: SNOMED 44054006 = Diabetes mellitus type 2.

**SSI Medicaid:** Supplemental Security Income — Medicaid eligibility for individuals who are elderly, blind, or disabled and have very low income. SSI Medicaid members tend to have higher chronic condition burden than MAGI Medicaid members.

**TCOC (Total Cost of Care):** The sum of all healthcare spending for an attributed patient or population over a defined period — inpatient, outpatient, ED, pharmacy, labs, SNF, home health, DME. The global budget metric in Vermont AHEAD.

**UACR (Urine Albumin-to-Creatinine Ratio):** A urine test that detects kidney damage in people with diabetes. Required annually for the HEDIS CDC Kidney Health Evaluation measure. LOINC: 14959-1. Values >30 mg/g indicate early kidney disease.

**USCDI (United States Core Data for Interoperability):** A federal government standard defining the minimum set of health data classes and elements that certified EHR systems must be able to exchange. Currently at version 3. Mandated under the ONC 21st Century Cures Act.

**VCCI (Vermont Chronic Care Initiative):** Vermont Medicaid's intensive case management program for high-risk, high-cost Medicaid members. Administered by DVHA under the Global Commitment to Health 1115 waiver. Uses a composite risk score to identify and tier members into Low/Medium/High/Very High care management intensity.

**VBC (Value-Based Care):** A healthcare payment and delivery model where providers are paid based on the quality of care they deliver and the health outcomes they achieve, rather than the volume of services. Contrasts with fee-for-service, where every service generates a separate payment.

**VITL (Vermont Information Technology Leaders):** Vermont's Health Information Exchange operator. Operates the Vermont HIE (VHIE) that connects hospitals, clinics, labs, and payers for real-time clinical data sharing.

---

*Documentation prepared May 16, 2026. Covers all new tools delivered in the VBC & Clinical Quality Lab build session.*
