# Platform Update — May 16, 2026
## Complete Technical & User Documentation

All changes delivered in this session. TypeScript passes clean. No commits yet — all changes on disk, ready to commit on request.

---

## Part 1 — VBC & Clinical Quality Lab (new route: `/research-lab/vbc-clinical-quality`)

### What it is
A new Research Lab section with 4 tabbed tools built around 8 detailed synthetic Vermont patient profiles. It is the most comprehensive clinical data and VBC content addition in the platform's history.

### Tab 1 — Clinical Data Exchange (`?tab=hl7`)
**For: Health IT professionals, interoperability teams, anyone learning clinical data standards**

Three sub-views:
- **HL7 v2 Explorer** — Select any of 8 Vermont patients → see their full ADT^A01 admission message and/or ORU^R01 lab results message broken into individual segments. Every segment (MSH, PID, PV1, DG1, OBX, OBR, AL1, PR1) expands with: a plain-English explanation of what the segment does and why it matters for VBC, the raw pipe-delimited data in a terminal view, and field-by-field annotations. The OBX explanation specifically calls out why the LOINC code in OBX-3 is critical — without the correct LOINC code, a lab result is invisible to HEDIS calculation engines.
- **FHIR R4 Bundle** — Same patient's data as an interactive JSON explorer. Resources (Patient, Encounter, Condition, Observation, MedicationRequest) expand with plain-English descriptions. Coded values highlight in green, strings in red, numbers in blue.
- **HL7 ↔ FHIR Bridge** — Both formats side by side for the same clinical event with explicit field-level mapping (e.g., HL7 DG1-3 = FHIR Condition.code).
- **USCDI Browser** — 37 data elements across all USCDI v1/v2/v3 classes, searchable by any field, showing FHIR resource, terminology system, and a concrete example code from the patient data.

### Tab 2 — VBC Quality Measures (`?tab=quality`)
**For: Quality managers, HEDIS analysts, care management directors, VBC contract staff**

Three sub-views:
- **HEDIS Panel** — 14 measures tracked across 8 patients. Summary tile grid with rates and color coding. Click any measure → full detail panel with exact numerator/denominator definitions, data source (what CPT/LOINC codes to look for), Vermont AHEAD context, and patient-level gap table with closing actions. Bottom: full cross-tab matrix (every patient × every measure).
- **30-Day Readmission** — CMS RSRR methodology explained step by step. Panel stats (index admissions, readmissions, rate, preventable count). Each readmission expands to show index admit, readmit, days between, root cause, and RAF risk adjustment context. Full encounter table at bottom.
- **Avoidable ED Tracker** — AHRQ PQI logic applied to the panel. 11 avoidable ED visits identified across 8 patients ($22,800 in avoidable spend). Each visit shows ACSC classification (PQI-01/05/07/08), AHRQ description, and specific root cause.

### Tab 3 — High vs. Low Value Care (`?tab=value`)
**For: VBC finance teams, ACO leadership, clinical quality officers**

Three sub-views:
- **A1C & BP Panel** — Toggle between diabetes (HbA1c) and hypertension (BP) views. Per-patient values with color coding, trend direction, time-series mini-tiles, control status, and VBC dollar opportunity for uncontrolled patients. Shared savings math explained (HEDIS quality score impact, utilization avoidance, RAF trajectory). Intervention recommendations for each uncontrolled patient.
- **Choosing Wisely Scan** — 5 evidence-based recommendations scanned against the panel's CPT claims. Triggered flags show evidence grade, sponsoring society, matched encounters, and estimated waste per event.
- **TCOC Decomposition** — Select any patient. Horizontal waterfall bars break TCOC by service category (inpatient, SNF, ED, outpatient, telehealth, pharmacy/DME). Modifiable vs. fixed split. Vermont AHEAD benchmark comparison (panel average, this patient vs. average, RAF-adjusted expected cost at $18,400 base rate).

### Tab 4 — Risk Stratification (`?tab=risk`)
**For: Population health managers, ACO analytics, Medicaid program staff, educators**

Four sub-tabs:
- **HCC Walkthrough** — 5 hierarchy rules explained (HCC 18 trumps 19, disease interactions, malnutrition highest coefficient, demographic baseline, enrollment type). Select any patient → step-by-step RAF calculation (demographic factor + each HCC with coefficient, expandable for plain-English explanation). Shows coding gap opportunities.
- **Population Tiers** — Risk pyramid visualization. Four tiers (Very High/High/Rising/Low) with RAF ranges, population share percentages, cost share, and recommended intervention intensity. Patient cards per tier.
- **Algorithm Comparison** — 5 algorithms compared: CMS HCC v28 (public), Johns Hopkins ACG (proprietary — explained with clear licensing note), CDPS (partial), Charlson (public domain), Elixhauser (public domain). Each with input data, output unit, strengths, limitations, Vermont context.
- **Vermont VCCI Scenario** — See Part 2 below.

### The 8 Synthetic Vermont Patients
All fictional, clinically accurate, internally consistent. File: `lib/syntheticPatients.ts` (945 lines, 71KB).

| Patient | Age | County | Payer | Scenario | RAF | Cost/yr |
|---|---|---|---|---|---|---|
| Elaine Morrison | 67F | Orange | Medicare | T2DM readmission, A1C 9.2%, 3 avoidable EDs | 1.82 | $42,800 |
| Marcus Webb | 72M | Chittenden | Medicare | CHF avoidable ED, BP 158/94, no RPM | 1.64 | $38,600 |
| Dorothy Lafleur | 58F | Windham | Medicaid | T2DM controlled A1C 7.6%, missed UACR, Choosing Wisely flags | 1.31 | $22,400 |
| James Bouchard | 81M | Franklin | Medicare | COPD 4 avoidable EDs, malnutrition HCC 21 (0.455), repeat CXRs | 1.47 | $31,200 |
| Sarah Thibodeau | 45F | Rutland | Medicaid | MDD hospitalization, FUH-7 missed by 1 day, SDOH crisis | 0.98 | $18,700 |
| Robert Arsenault | 63M | Washington | Commercial | MTM success — A1C 9.1%→7.4% over 18 months | 0.74 | $9,800 |
| Maria Gonzalez | 55F | Lamoille | Medicaid | HTN controlled via RPM (162/98→124/76), Spanish speaker | 0.52 | $6,400 |
| William Desrochers | 78M | Essex | Medicare | CHF hospitalization → 21-day SNF → SNF overutilization, highest TCOC | 2.14 | $68,400 |

---

## Part 2 — Vermont VCCI Scenario (inside Risk Stratification tab)

**Route:** `/research-lab/vbc-clinical-quality?tab=risk` → "Vermont VCCI Scenario" tab  
**Files:** `lib/vcciScenarioData.ts` (650 lines), `components/research/VCCIScenario.tsx` (785 lines)

### What VCCI is
Vermont Chronic Care Initiative — DVHA's intensive case management program for the top 5% highest-cost Medicaid members (who account for ~39% of Vermont Medicaid spend). Runs under the Global Commitment to Health 1115 waiver.

### 3 Synthetic VCCI Patients

**Raymond Forcier** (Very High risk, score 90/100, CDPS 4.84, 97th percentile, $58,400/yr)
- CHF + T2DM (A1C 9.8%) + OUD on buprenorphine + MDD + CKD + housing instability
- 3 inpatient, 6 ED visits in 12 months; 25-day readmission
- 7 medications; 3 below PDC 0.60; 2 drug interaction flags
- All 6 SDOH domains flagged; SSI income $914/month; insulin rationing
- VCCI enrolled; 6-month outcome: A1C 9.8%→8.4%, zero ED visits, housing stabilized

**Linda Beaupre** (High risk, score 74/100, CDPS 2.94, HCC RAF 1.38, dual Medicare/Medicaid)
- COPD + T2DM (A1C controlled) + MDD in rural Caledonia County (Northeast Kingdom)
- 3 COPD hospitalizations at Critical Access Hospital; telehealth blocked by poor broadband
- Qualifies via secondary CDPS gate (≥2.0), not primary top-5% cost gate
- Illustrates dual-eligible scoring (HCC for Medicare + CDPS for Medicaid) and rural access barriers

**Darnell Washington** (Medium risk, score 48/100, CDPS 1.44, 72nd percentile — NOT VCCI eligible)
- AUD in early recovery + GAD + HTN; 2 ED visits
- Does NOT meet VCCI thresholds → CHT referral pathway instead
- Illustrates the tier boundary and why Medium ≠ VCCI

### 7 sub-views per patient
1. VCCI Program overview (how identification → scoring → enrollment works; tier threshold table; VCCI/Blueprint/AHEAD architecture)
2. CDPS Score — step-by-step demographic baseline + each CDPS category with ICD-10, weight, HCC equivalent for comparison
3. Composite Score — domain breakdown (Utilization 35%, CDPS 30%, SDOH 20%, Care Gaps 15%), every criterion expandable with evidence, tier decision
4. SDOH Screening — flagged/clear with HL7 OBX segments and FHIR Observation resources per item; scoring grid
5. HL7/FHIR Referral — full REF^I12 referral message with segment annotations; FHIR CarePlan JSON
6. Encounter History — full timeline with VCCI flags and root causes
7. Care Team — 6 providers with NPI + FHIR refs; 4 hospitals with CAH flag

### Provider & hospital data (in `vcciScenarioData.ts`)
6 providers: Dr. Amara Osei (PCP), Sandra Bilodeau RN CCM (VCCI case manager), Dr. Kenji Tanaka (cardiologist), Maria Santos LICSW (BH/social work), Dr. Priya Nair (nephrologist), Tom Guerette PharmD (MTM pharmacist)  
4 hospitals: Rutland Regional (188 beds), UVM Medical Center (562 beds, AMC), Northeastern Vermont Regional (25 beds, CAH), SWMC (99 beds)

---

## Part 3 — New Vermont Program Pages

### `/vermont-blueprint` — Vermont Blueprint for Health
- Program overview: 128 PCMH practices, all-payer capitation model, 14 Health Service Areas
- CHT team composition (5 role types with descriptions)
- Mental Health Integration (MHI) initiative — 2023, SBIRT, crisis navigation, 1,096 trained
- Full 2006–2025 program timeline
- Payment structure: PCMH capitation (to practice) + CHT capitation (to regional entity)
- Connections to VCCI, AHEAD, Act 68, DAs, SASH
- 8 direct resource links including 2025 and 2024 annual reports (PDFs)

### `/vermont-sash` — Vermont SASH Program (Support and Services at Home)
- Housing-based care coordination in 200+ affordable housing communities, all 14 counties
- 13,000+ Vermonters served since 2011; free to participants
- Team model: full-time SASH Coordinator + quarter-time Wellness Nurse
- 6 service types (comprehensive assessment, care plan, nurse coaching, care coordination, group wellness programs, SDOH navigation)
- Documented outcomes: fewer falls, lower hospitalizations, lower ED visits, lower Medicare/Medicaid spend
- VBC ROI case: estimated 2–5× return on ~$400/participant/year program cost
- AHEAD, Blueprint, and VCCI integration explained
- 6 external resource links

### `/vermont-designated-agencies` — Vermont Designated Agencies
- 11 DAs covering all 14 Vermont counties — listed with county coverage, description, sustainability flags
- Specialized Service Agencies: Brattleboro Retreat, VPCH, Clara Martin Center
- Vermont Care Partners as umbrella (16 members, vtcare.net data repository)
- Chronic underfunding crisis documented (Howard Center 100+ vacancies, VPR 2024 report linked)
- DA connections to Blueprint MHI, VCCI, and Act 68 payment reform
- 6 official resource links

### `/vermont-sdoh` — Vermont SDOH & Social Services ← **New this final session**
- 8 SDOH domains covered, each expandable: Housing, Food Insecurity, Transportation, Social Isolation, SUD, Mental Health, Financial Strain, IPV
- Each domain shows: ICD-10 Z-code, LOINC screening code, VCCI composite score points, prevalence in Vermont, community resources by name, healthcare system connection
- Vermont 2-1-1 explained as the central SDOH navigation hub (4,000+ programs, all counties, 24/7)
- 7 Community Action Agencies listed by county
- 4-step SDOH workflow (Screen → Document Z-code → Refer via 2-1-1 → Close loop in FHIR CarePlan)
- Why SDOH is a VBC priority (VCCI scoring weight, Z-code requirement in AHEAD, USCDI v3 SDOH data class)
- Connections to SASH, Blueprint, DAs, VCCI, equity/sdoh platform page

### `/vermont-legislative-resources` — Legislative Reports Library
- 35+ direct links to official Vermont government documents organized by 6 agencies:
  - GMCB: 2024 Annual Report, hospital budget review portal, FY2025 decisions, Act 167 hub, FY2026 decisions, archived public comments, House committee testimony
  - AHS/OHCR: Act 68 monthly reports (Aug + Dec 2025), health care reform presentations, AHS reorg update, Secretary Samuelson statement, health care transformation portal
  - Blueprint: 2025 and 2024 annual reports, 2022 report, full archive, Senate testimony, MHI page
  - Act 167: full text, FAQ, GMCB implementation hub
  - House Health Care Committee: VCP DA overview, Howard Center testimony, mental health continuum, AHS workforce, VCCI reentry presentation
  - VCCI: DVHA program page, services detail, current referral form, 2017 foundational presentation, CMS 1115 waiver report
  - AHEAD: CMS CMMI page, 4th evaluation report, DVHA quality measures, GMCB analytics reports

---

## Part 4 — Resource Sections Added to Existing Pages

### Act 167 page (`/vermont-act-167`)
New "Official Reports & GMCB Resources" section added before the bottom nav with 6 direct document links and a link to the full Legislative Resources Library.

### Act 68 page (`/vermont-act-68`)
New "Act 68 Legislative Reports & AHS Testimony" section with 6 links including both AHS monthly transformation reports and internal link to the Legislative Resources Library.

---

## Part 5 — Bug Fixes & UI Improvements (this final session)

### Fix 1 — States & Programs panel overflowing screen
**Problem:** The desktop mega-menu panel was anchored `left-0` (aligned to button's left edge). "States & Programs" is far enough right in the navbar that a wide 3-column panel overflowed off the right side of the viewport.

**Fix:** Changed panel positioning to use `right-0` (anchor to right edge) for `states` and `intelligence` panel types. Added `max-h-[80vh]` with `overflow-y-auto` so tall panels don't overflow vertically either. Added `max-w-[95vw]` guard. Reduced States panel column padding and font sizes for compactness. Panel now correctly stays within the viewport on any screen width.

### Fix 2 — HomeSidebar States & Programs: flat list replaced with grouped sections
**Problem:** The 19-item States & Programs list was a completely flat list with no visual separation between Vermont programs, VBC labs, and other state models — making it hard to scan.

**Fix:** Added `groupLabel` optional field to the `RegularItem` type. The sidebar renderer now inserts a colored divider line + small uppercase group header label before any item that has `groupLabel` set. Five groups are now clearly labeled in the sidebar:
- **Vermont Care Programs** — Medicaid, Blueprint, SASH, DAs, SDOH, RHT
- **Vermont Policy & Law** — Act 167, Act 68, Act 68 Simulator, AHEAD, Legislative Reports
- **Vermont Data & Facilities** — VT Hospital Profiles, Bed Capacity
- **VBC & Clinical Labs** — VCCI Risk Stratification Lab, VBC Quality Measures Lab
- **Other State Models** — CalAIM, Oregon CCO, All States, 50-State Dashboard, CMS Rural

### Fix 3 — SDOH & Social Services gap filled
**Problem:** SDOH content existed at `/equity/sdoh` as an Equity pillar page (national/clinical framework) but there was no Vermont-specific SDOH page showing the actual social services ecosystem, community resources, and clinical program connections.

**Fix:** Created `/vermont-sdoh` page (see Part 3 above). Added to:
- HomeSidebar States & Programs → Vermont Care Programs group
- HomeSidebar Equity pillar → intelligence items
- Header navbar States panel → Vermont Programs column
- Header mobile menu → States section

### Fix 4 — Multimedia library updated with new content
**Problem:** The Multimedia Library tab only had 6 generic "coming soon" category cards and did not surface any of the new interactive tools, Vermont program pages, or official government reports added this session.

**Fix:** The Library tab now has 3 sections:
1. **Media Formats** (unchanged — 6 category cards)
2. **Interactive Analytical Tools** — 6 Research Lab tool cards with direct links to HL7/FHIR Explorer, VBC Quality Measures, High vs. Low Value Care, Risk Stratification, FHIR Interoperability Lab, AI Governance Lab
3. **Vermont Government Reports** — 6 cards linking to GMCB Annual Report, Blueprint Annual Report, AHS Act 68 Transformation Report, Vermont APM Evaluation, VCCI 2017 presentation (all external PDFs), plus the internal Legislative Resources Library

### Fix 5 — Advisory contact page: "Future Offering" watermark
**Problem:** The advisory contact page presented a fully active engagement form implying the advisory service was operational.

**Fix:** Two additions to `/advisory/contact/page.tsx`:
1. **Diagonal watermark** — Fixed-position `pointer-events-none` overlay rotated -30° displaying "Future Offering / Pending Availability of Qualified Volunteers" in light slate-300 text. Visible on the page without obscuring the content.
2. **Amber banner** — A non-dismissible `bg-amber-50 border-amber-300` banner at the very top of the page (above the hero) reading: "Future Offering — Pending Availability of Qualified Volunteers. Submissions are recorded but cannot be acted upon until volunteer advisors are onboarded."

---

## Part 6 — Navigation Changes (this final session)

### HomeSidebar
- Vermont SDOH & Social Services added to States & Programs → Vermont Care Programs group
- Vermont SDOH also added to Equity pillar → intelligence items (listed as "Vermont SDOH & Social Services")
- `groupLabel` rendering logic added to the regular section item renderer
- `getSectionForPath` updated to include `/vermont-sdoh` in states routes

### Header Navbar — Desktop
- States & Programs panel: Vermont SDOH added to Vermont Programs column
- States & Programs panel: Overflowing width fix (right-anchored, max 90vw, max 80vh with scroll)
- `isMenuActive` updated to include `/vermont-sdoh`

### Header Navbar — Mobile
- States & Programs accordion: Vermont SDOH added

---

## Part 7 — Full File Inventory

### New files created this session
| File | Purpose |
|---|---|
| `app/vermont-blueprint/page.tsx` | Vermont Blueprint for Health program page |
| `app/vermont-sash/page.tsx` | Vermont SASH program page |
| `app/vermont-designated-agencies/page.tsx` | Vermont Designated Agencies (11 DAs) page |
| `app/vermont-sdoh/page.tsx` | Vermont SDOH & Social Services page |
| `app/vermont-legislative-resources/page.tsx` | Vermont Legislative Reports Library (35+ links) |
| `lib/syntheticPatients.ts` | 8 synthetic Vermont patients (945 lines) |
| `lib/vcciScenarioData.ts` | 3 VCCI patients + providers + hospitals (650 lines) |
| `components/research/HL7FHIRExplorer.tsx` | HL7/FHIR/USCDI interactive explorer |
| `components/research/VBCQualityDashboard.tsx` | HEDIS, readmissions, avoidable ED |
| `components/research/HighLowValueCare.tsx` | A1C/BP panel, Choosing Wisely, TCOC |
| `components/research/RiskStratificationMethodology.tsx` | HCC, tiers, algorithms, VCCI tab |
| `components/research/VCCIScenario.tsx` | Full VCCI scenario component |
| `app/research-lab/vbc-clinical-quality/page.tsx` | New lab route |
| `app/research-lab/vbc-clinical-quality/VBCClinicalQualityClient.tsx` | Lab shell |
| `CLINICAL_DATA_VBC_DOCUMENTATION.md` | Full technical documentation (1,067 lines) |

### Files modified
| File | Changes |
|---|---|
| `components/Header.tsx` | States panel 3-column redesign, overflow fix (right-anchor, max-h scroll), SDOH + all new Vermont pages, PILLARS lab links per column, Tools count 20→24, mobile menu updates |
| `components/HomeSidebar.tsx` | groupLabel type + rendering, States grouped into 5 sections, SDOH added, Equity pillar SDOH link, route detection for all new routes |
| `components/research/LabPageShell.tsx` | New lab added to between-lab nav |
| `app/research-lab/page.tsx` | 4 new tools added under Technology + Clinical, count 20→24 |
| `app/vermont-act-167/page.tsx` | GMCB reports section added |
| `app/vermont-act-68/page.tsx` | AHS Act 68 reports section added |
| `app/advisory/contact/page.tsx` | Watermark + amber availability banner added |
| `app/multimedia/page.tsx` | Library tab expanded with Interactive Tools section and Vermont Reports section |

---

## Part 8 — What Exists for SDOH (answer to your question)

To directly answer "have you covered SDOH already?" — yes, in multiple places:

| Location | What's There |
|---|---|
| `/equity/sdoh` | Clinical/policy framework: PRAPARE screening domains, Z-code documentation guide, SDOH in VBC contracts, national policy |
| `/vermont-sdoh` | **NEW** Vermont-specific: 8 domains with ICD-10/LOINC/VCCI points, 2-1-1 Vermont, 7 Community Action Agencies, 4-step SDOH workflow, clinical program connections |
| `/vermont-sash` | SDOH integration model: housing-based, SDOH navigation as core service |
| `/vermont-blueprint` | CHT SDOH navigation role explained; MHI as BH SDOH response |
| `/vermont-designated-agencies` | MH/SUD services as the clinical response tier for behavioral SDOH needs |
| `lib/syntheticPatients.ts` | Every patient has SDOH flags; Maria Gonzalez (food/housing/Spanish-speaking RPM success) and Sarah Thibodeau (housing/IPV/childcare) are explicitly SDOH-driven scenarios |
| `lib/vcciScenarioData.ts` | VCCI SDOH screening fully implemented: 8 domain flags per patient, each with HL7 OBX segment, FHIR Observation, and VCCI scoring impact |
| Research Lab → VBC Quality → Risk Stratification | SDOH domain scoring shown in VCCI composite score calculator |
| Research Lab → HL7/FHIR Explorer | SDOH LOINC codes (71802-3 housing, 88122-7 food, 93030-5 transport, 55757-9 PHQ-9, 75626-2 AUDIT-C) shown in OBX segments and FHIR Observations |

---

*Session completed May 16, 2026. All changes on disk. TypeScript clean. Not yet committed to git.*
