// ─── VCCI Scenario Dataset ────────────────────────────────────────────────────
// Vermont Chronic Care Initiative (VCCI) — synthetic scenario data
// All patients, providers, hospitals, and scores are synthetic but
// reflect actual VCCI eligibility criteria, risk tier methodology,
// and care management workflows documented by DVHA.

// ─── ORGANIZATIONS ────────────────────────────────────────────────────────────

export interface VCCIProvider {
  npi: string;
  name: string;
  role: string;
  organization: string;
  phone: string;
  fhirRef: string;
}

export interface VCCIHospital {
  id: string;
  name: string;
  county: string;
  type: string;
  criticalAccess: boolean;
  beds: number;
  fhirRef: string;
}

export const VCCI_PROVIDERS: VCCIProvider[] = [
  { npi: '1234567890', name: 'Dr. Amara Osei', role: 'Primary Care Physician', organization: 'Rutland Regional Medical Associates', phone: '802-747-1900', fhirRef: 'Practitioner/prov-osei-001' },
  { npi: '1345678901', name: 'Sandra Bilodeau, RN, CCM', role: 'VCCI Case Manager', organization: 'DVHA / Vermont Chronic Care Initiative', phone: '802-879-5900', fhirRef: 'Practitioner/prov-bilodeau-001' },
  { npi: '1456789012', name: 'Dr. Kenji Tanaka', role: 'Cardiologist', organization: 'UVM Medical Center Heart Center', phone: '802-656-2200', fhirRef: 'Practitioner/prov-tanaka-001' },
  { npi: '1567890123', name: 'Maria Santos, LICSW', role: 'Behavioral Health / Social Worker', organization: 'Rutland Mental Health Services', phone: '802-775-1000', fhirRef: 'Practitioner/prov-santos-001' },
  { npi: '1678901234', name: 'Dr. Priya Nair', role: 'Nephrologist', organization: 'Dartmouth-Hitchcock Kidney Center', phone: '603-650-5000', fhirRef: 'Practitioner/prov-nair-001' },
  { npi: '1789012345', name: 'Tom Guerette, PharmD', role: 'Clinical Pharmacist (MTM)', organization: 'Community Pharmacy — Rutland', phone: '802-773-2200', fhirRef: 'Practitioner/prov-guerette-001' },
];

export const VCCI_HOSPITALS: VCCIHospital[] = [
  { id: 'hosp-rrmc', name: 'Rutland Regional Medical Center', county: 'Rutland', type: 'Acute Care', criticalAccess: false, beds: 188, fhirRef: 'Organization/hosp-rrmc-001' },
  { id: 'hosp-uvmmc', name: 'UVM Medical Center', county: 'Chittenden', type: 'Academic Medical Center', criticalAccess: false, beds: 562, fhirRef: 'Organization/hosp-uvmmc-001' },
  { id: 'hosp-nch', name: 'Northeastern Vermont Regional Hospital', county: 'Caledonia', type: 'Critical Access', criticalAccess: true, beds: 25, fhirRef: 'Organization/hosp-nch-001' },
  { id: 'hosp-swmc', name: 'Southwestern Vermont Medical Center', county: 'Bennington', type: 'Acute Care', criticalAccess: false, beds: 99, fhirRef: 'Organization/hosp-swmc-001' },
];

// ─── VCCI RISK SCORING FRAMEWORK ──────────────────────────────────────────────
// Vermont VCCI uses a composite, multi-domain scoring approach:
//   Domain 1: Claims-based utilization (ED, inpatient, readmissions)
//   Domain 2: Chronic condition burden (CDPS-informed categories)
//   Domain 3: Polypharmacy / medication complexity
//   Domain 4: SDOH vulnerability (since Oct 2018)
//   Domain 5: Care gap / access indicators
// Final composite score → maps to risk tier (Low / Medium / High / Very High)
// VCCI enrolls members at High and Very High tiers; Medium gets CHT referral.

export interface VCCIScoreDomain {
  domain: string;
  domainLabel: string;
  maxPoints: number;
  scoringCriteria: { criterion: string; points: number; triggered: boolean; evidence: string }[];
  earnedPoints: number;
  weight: number; // 0–1 multiplier for weighted composite
}

export interface VCCISDOHItem {
  domain: string;
  flag: boolean;
  detail: string;
  hl7Segment?: string;
  fhirResource?: string;
}

export interface VCCIChronicCondition {
  name: string;
  icd10: string;
  cdpsCategory: string;
  cdpsWeight: number;
  hccCode?: number;
  hccWeight?: number;
  severity: 'low' | 'medium' | 'high' | 'very-high';
  controlStatus: 'controlled' | 'uncontrolled' | 'unknown';
  relevantLoinc?: string;
  mostRecentValue?: string;
}

export interface VCCIEncounter {
  date: string;
  type: 'inpatient' | 'ed' | 'office' | 'telehealth' | 'snf';
  facility: string;
  principalDx: string;
  drg?: string;
  cost: number;
  los?: number;
  avoidable: boolean;
  vcciFlagReason?: string;
}

export interface VCCIMedication {
  rxnorm: string;
  name: string;
  class: string;
  prescriber: string;
  adherencePDC: number; // proportion days covered 0–1
  interactionFlag?: string;
}

export interface VCCIPatient {
  id: string;
  // Demographics
  name: string;
  age: number;
  dob: string;
  sex: 'M' | 'F';
  county: string;
  town: string;
  medicaidId: string;
  eligibilityType: 'MAGI' | 'SSI' | 'ABD' | 'CHIP';
  dualEligible: boolean;
  pcp: string; // provider NPI
  // Clinical
  chronicConditions: VCCIChronicCondition[];
  medications: VCCIMedication[];
  encounters: VCCIEncounter[];
  // SDOH
  sdoh: VCCISDOHItem[];
  // VCCI Scoring
  scoreDomains: VCCIScoreDomain[];
  compositeScore: number;       // 0–100
  riskTier: 'low' | 'medium' | 'high' | 'very-high';
  vcciEligible: boolean;
  vcciEnrolled: boolean;
  vcciEnrollmentDate?: string;
  vcciCaseManager?: string;     // provider NPI
  // RAF / CDPS
  cdpsScore: number;
  hccRafScore?: number;         // if Medicare dual
  // Financial
  totalCostPMPY: number;
  percentileRank: number;       // in Medicaid population 0–100
  // HL7 / FHIR
  hl7ReferralMessage: string;
  fhirCarePlan: object;
  // Narrative
  scenarioTitle: string;
  clinicalSummary: string;
  vcciGoals: string[];
  outcomeSummary?: string;
}

// ─── CDPS CHRONIC CONDITION CATEGORIES (simplified public weights) ─────────────
// Based on published CDPS methodology (UCSD / Kronick et al.)
// These are approximate relative weights for illustrative purposes.
export const CDPS_CATEGORIES: Record<string, { label: string; weight: number; icd10Prefixes: string[] }> = {
  CARD_VH: { label: 'Cardiovascular — Very High', weight: 4.62, icd10Prefixes: ['I50', 'I21', 'I22'] },
  CARD_H:  { label: 'Cardiovascular — High',      weight: 2.31, icd10Prefixes: ['I25', 'I20', 'I48'] },
  CARD_M:  { label: 'Cardiovascular — Medium',     weight: 1.18, icd10Prefixes: ['I10', 'I11'] },
  PULM_H:  { label: 'Pulmonary — High',            weight: 1.94, icd10Prefixes: ['J44', 'J45'] },
  DIAB_H:  { label: 'Diabetes — High',             weight: 1.72, icd10Prefixes: ['E11.6', 'E11.4', 'E11.5', 'E10.6'] },
  DIAB_M:  { label: 'Diabetes — Medium',           weight: 0.94, icd10Prefixes: ['E11.9', 'E11.0', 'E10.9'] },
  RENAL_H: { label: 'Renal — High',                weight: 2.18, icd10Prefixes: ['N18.4', 'N18.5', 'N18.6'] },
  RENAL_M: { label: 'Renal — Medium',              weight: 1.24, icd10Prefixes: ['N18.3', 'N18.2'] },
  MH_H:    { label: 'Mental Health — High',        weight: 2.07, icd10Prefixes: ['F31', 'F33', 'F20', 'F25'] },
  MH_M:    { label: 'Mental Health — Medium',      weight: 1.14, icd10Prefixes: ['F32', 'F41', 'F34'] },
  SUD_H:   { label: 'Substance Use — High',        weight: 1.88, icd10Prefixes: ['F10.2', 'F11.2', 'F14.2', 'F15.2'] },
  SUD_M:   { label: 'Substance Use — Medium',      weight: 1.02, icd10Prefixes: ['F10.1', 'F11.1'] },
  NEURO_H: { label: 'Neurological — High',         weight: 2.44, icd10Prefixes: ['G35', 'G20', 'G40'] },
  MUSCULO: { label: 'Musculoskeletal',             weight: 0.76, icd10Prefixes: ['M05', 'M15', 'M16', 'M17'] },
  CANCER:  { label: 'Cancer',                     weight: 2.96, icd10Prefixes: ['C18', 'C34', 'C50', 'C61'] },
  HIV:     { label: 'HIV/AIDS',                   weight: 3.84, icd10Prefixes: ['B20', 'B24'] },
};

// ─── VCCI PATIENT 1: RAYMOND FORCIER ──────────────────────────────────────────
// 54-year-old male, Rutland County, Medicaid SSI. T2DM + CHF + SUD + housing instability.
// The archetypal VCCI Very High risk patient — top 5% cost, multiple VCCI flags.

const raymond: VCCIPatient = {
  id: 'vcci-pt-001',
  name: 'Raymond Forcier',
  age: 54,
  dob: '1971-08-15',
  sex: 'M',
  county: 'Rutland',
  town: 'Rutland City',
  medicaidId: 'VT-MCD-VCCI-0001',
  eligibilityType: 'SSI',
  dualEligible: false,
  pcp: '1234567890',
  scenarioTitle: 'Raymond Forcier — Very High Risk, VCCI Enrolled',
  clinicalSummary: 'Raymond is a 54-year-old male on SSI-based Medicaid with uncontrolled T2DM, chronic systolic CHF, opioid use disorder (on MOUD/buprenorphine), and moderate depression. He was admitted twice to Rutland Regional in the past 12 months for CHF exacerbation and hyperglycemia. He has been unstably housed for 8 months. His claims-based risk score places him in the top 3% of Vermont Medicaid members by cost. He was identified through DVHA predictive analytics and referred to VCCI case management in January 2025.',
  vcciGoals: [
    'Stabilize housing — connect to Rutland Community Land Trust and Section 8 waitlist',
    'Achieve CHF self-management competency: daily weights, fluid restriction, medication adherence',
    'Reduce A1C from 9.8% to <8.0% within 6 months via pharmacist MTM and CGM enrollment',
    'Maintain MOUD (buprenorphine) adherence — coordinate with OTP and PCP',
    'Reduce ED utilization from 6 visits/year to <2 via care management triggers',
  ],
  outcomeSummary: '6 months post-VCCI enrollment: A1C improved from 9.8% to 8.4%. Zero ED visits in 3 months post-enrollment (vs. 3 in prior 3 months). Housing stabilized via emergency bridge voucher. MOUD adherence >95%.',
  cdpsScore: 4.84,
  totalCostPMPY: 58400,
  percentileRank: 97,
  vcciEligible: true,
  vcciEnrolled: true,
  vcciEnrollmentDate: '2025-01-14',
  vcciCaseManager: '1345678901',

  chronicConditions: [
    { name: 'Chronic systolic heart failure', icd10: 'I50.22', cdpsCategory: 'CARD_VH', cdpsWeight: 4.62, hccCode: 85, hccWeight: 0.331, severity: 'very-high', controlStatus: 'uncontrolled', relevantLoinc: '33762-6', mostRecentValue: 'NT-proBNP 3,840 pg/mL' },
    { name: 'Type 2 diabetes mellitus with hyperglycemia', icd10: 'E11.65', cdpsCategory: 'DIAB_H', cdpsWeight: 1.72, hccCode: 18, hccWeight: 0.302, severity: 'high', controlStatus: 'uncontrolled', relevantLoinc: '4548-4', mostRecentValue: 'A1C 9.8%' },
    { name: 'Opioid use disorder, moderate, on MOUD', icd10: 'F11.20', cdpsCategory: 'SUD_H', cdpsWeight: 1.88, severity: 'high', controlStatus: 'controlled', relevantLoinc: undefined },
    { name: 'Major depressive disorder, recurrent, moderate', icd10: 'F33.1', cdpsCategory: 'MH_M', cdpsWeight: 1.14, hccCode: 58, hccWeight: 0.399, severity: 'medium', controlStatus: 'uncontrolled', relevantLoinc: '55757-9', mostRecentValue: 'PHQ-9: 14' },
    { name: 'Essential hypertension', icd10: 'I10', cdpsCategory: 'CARD_M', cdpsWeight: 1.18, severity: 'medium', controlStatus: 'uncontrolled', relevantLoinc: '8480-6', mostRecentValue: 'BP 158/96' },
    { name: 'Chronic kidney disease, stage 3', icd10: 'N18.3', cdpsCategory: 'RENAL_M', cdpsWeight: 1.24, hccCode: 137, hccWeight: 0.184, severity: 'medium', controlStatus: 'unknown', relevantLoinc: '62238-1', mostRecentValue: 'eGFR 42 mL/min' },
    { name: 'Obesity, class II', icd10: 'E66.09', cdpsCategory: 'DIAB_M', cdpsWeight: 0.94, hccCode: 22, hccWeight: 0.272, severity: 'medium', controlStatus: 'unknown' },
  ],

  medications: [
    { rxnorm: '1431761', name: 'Buprenorphine/naloxone 8/2mg SL (Suboxone)', class: 'MOUD', prescriber: '1234567890', adherencePDC: 0.94 },
    { rxnorm: '197361', name: 'Furosemide 40mg daily', class: 'Loop diuretic (CHF)', prescriber: '1234567890', adherencePDC: 0.62, interactionFlag: 'Risk of hypokalemia; check K+ with CKD stage 3' },
    { rxnorm: '83515', name: 'Carvedilol 12.5mg BID', class: 'Beta-blocker (CHF)', prescriber: '1234567890', adherencePDC: 0.58 },
    { rxnorm: '311040', name: 'Lisinopril 10mg daily', class: 'ACE inhibitor (CHF/HTN/CKD)', prescriber: '1234567890', adherencePDC: 0.71 },
    { rxnorm: '860975', name: 'Metformin 500mg BID', class: 'Biguanide (T2DM)', prescriber: '1234567890', adherencePDC: 0.55, interactionFlag: 'Reduce dose or hold with CKD eGFR <45' },
    { rxnorm: '613391', name: 'Insulin glargine 20 units nightly', class: 'Basal insulin (T2DM)', prescriber: '1234567890', adherencePDC: 0.48 },
    { rxnorm: '2108878', name: 'Sertraline 50mg daily', class: 'SSRI (MDD)', prescriber: '1234567890', adherencePDC: 0.60 },
  ],

  encounters: [
    { date: '2025-09-18', type: 'inpatient', facility: 'Rutland Regional Medical Center', principalDx: 'I50.22', drg: '291', cost: 18400, los: 5, avoidable: false },
    { date: '2025-06-02', type: 'inpatient', facility: 'Rutland Regional Medical Center', principalDx: 'E11.65', drg: '638', cost: 12600, los: 4, avoidable: true, vcciFlagReason: 'DKA admission — 28-day readmission from CHF discharge; insulin non-adherence' },
    { date: '2025-05-08', type: 'inpatient', facility: 'Rutland Regional Medical Center', principalDx: 'I50.22', drg: '292', cost: 14200, los: 6, avoidable: false },
    { date: '2025-04-21', type: 'ed', facility: 'Rutland Regional Medical Center', principalDx: 'E11.65', cost: 2200, avoidable: true, vcciFlagReason: 'Hyperglycemia — no CGM, missed medication, food insecurity' },
    { date: '2025-03-10', type: 'ed', facility: 'Rutland Regional Medical Center', principalDx: 'I50.22', cost: 2400, avoidable: true, vcciFlagReason: 'CHF fluid overload — 6 lb weight gain, no home weight scale' },
    { date: '2025-02-14', type: 'ed', facility: 'Rutland Regional Medical Center', principalDx: 'F33.1', cost: 1800, avoidable: true, vcciFlagReason: 'Acute psychiatric crisis — missed sertraline, SUD relapse' },
    { date: '2025-01-28', type: 'office', facility: 'Rutland Regional Medical Associates', principalDx: 'Z00.00', cost: 290, avoidable: false },
    { date: '2024-11-05', type: 'ed', facility: 'Rutland Regional Medical Center', principalDx: 'I50.22', cost: 2100, avoidable: true, vcciFlagReason: 'CHF — carvedilol PDC 32% — adherence failure' },
    { date: '2024-09-19', type: 'ed', facility: 'Rutland Regional Medical Center', principalDx: 'E11.65', cost: 1900, avoidable: true, vcciFlagReason: 'Hyperglycemia — insulin cost barrier, rationing doses' },
  ],

  sdoh: [
    { domain: 'Housing Instability', flag: true, detail: 'Unstably housed for 8 months — couch-surfing, occasional shelter. No fixed address on file.', hl7Segment: 'OBX|1|CWE|71802-3^Housing status^LN||LA30190-5^Homeless^LN', fhirResource: 'Observation: LOINC 71802-3 = Housing status → LA30190-5 (Homeless)' },
    { domain: 'Food Insecurity', flag: true, detail: 'Relies on food shelf 3–4 days/week. No SNAP — not enrolled due to documentation gap.', hl7Segment: 'OBX|2|CWE|88122-7^Food insecurity^LN||LA28397-0^Often true^LN', fhirResource: 'Observation: LOINC 88122-7 = Food insecurity risk → LA28397-0 (Often true)' },
    { domain: 'Transportation', flag: true, detail: 'No vehicle. Misses ~30% of office appointments due to lack of transportation. Rural Rutland.', hl7Segment: 'OBX|3|CWE|93030-5^Transportation insecurity^LN||LA30122-8^Yes^LN', fhirResource: 'Observation: LOINC 93030-5 = Transportation insecurity → Yes' },
    { domain: 'Social Isolation', flag: true, detail: 'Lives alone (when housed). Limited social support. Estranged from family due to prior SUD.', fhirResource: 'Observation: LOINC 93029-7 = Social connection and isolation → isolated' },
    { domain: 'Substance Use Disorder', flag: true, detail: 'OUD on MOUD (buprenorphine). Previous fentanyl use. Relapse risk HIGH per AUDIT-C score 8.', hl7Segment: 'OBX|4|NM|75626-2^AUDIT-C score^LN||8', fhirResource: 'Observation: LOINC 75626-2 = AUDIT-C score → 8 (High risk)' },
    { domain: 'Mental Health', flag: true, detail: 'PHQ-9 score 14 (moderate-severe MDD). Not engaged with behavioral health since discharge.', hl7Segment: 'OBX|5|NM|55757-9^PHQ-9 score^LN||14', fhirResource: 'Observation: LOINC 55757-9 = PHQ-9 → 14 (Moderate-severe)' },
    { domain: 'Intimate Partner Violence', flag: false, detail: 'Screened negative at last visit (HITS tool score 4/40).', fhirResource: 'Observation: LOINC 96842-0 = Domestic violence screen → negative' },
    { domain: 'Financial Strain', flag: true, detail: 'SSI income $914/month. Medication costs causing insulin rationing.', fhirResource: 'Condition: Z59.6 — Low income' },
  ],

  scoreDomains: [
    {
      domain: 'utilization',
      domainLabel: 'Utilization (ED + Inpatient)',
      maxPoints: 35,
      weight: 0.35,
      earnedPoints: 33,
      scoringCriteria: [
        { criterion: '≥3 ED visits in prior 12 months', points: 12, triggered: true, evidence: '6 ED visits in 12 months (Apr 2024 – Sep 2025)' },
        { criterion: '≥2 inpatient admissions in prior 12 months', points: 10, triggered: true, evidence: '3 inpatient admissions (May, Jun, Sep 2025)' },
        { criterion: '30-day readmission present', points: 8, triggered: true, evidence: 'CHF discharge May 8 → DKA admit June 2 = 25 days' },
        { criterion: 'SNF or long-term care utilization', points: 5, triggered: false, evidence: 'No SNF utilization in measurement period' },
      ],
    },
    {
      domain: 'chronic',
      domainLabel: 'Chronic Condition Burden (CDPS)',
      maxPoints: 30,
      weight: 0.30,
      earnedPoints: 28,
      scoringCriteria: [
        { criterion: '≥1 CDPS Very High category condition (weight ≥4.0)', points: 12, triggered: true, evidence: 'CARD_VH (CHF I50.22) — CDPS weight 4.62' },
        { criterion: '≥2 CDPS High category conditions (weight 1.5–3.9)', points: 10, triggered: true, evidence: 'DIAB_H (E11.65, 1.72) + SUD_H (F11.20, 1.88) + MH_H/M (F33.1, 1.14)' },
        { criterion: 'Active polypharmacy ≥7 medications', points: 8, triggered: true, evidence: '7 active medications; buprenorphine + insulin + CHF triple therapy' },
        { criterion: 'Drug-drug interaction flag present', points: 0, triggered: false, evidence: 'Interaction flags present but scored under polypharmacy' },
      ],
    },
    {
      domain: 'sdoh',
      domainLabel: 'Social Determinants of Health',
      maxPoints: 20,
      weight: 0.20,
      earnedPoints: 18,
      scoringCriteria: [
        { criterion: 'Housing instability or homelessness', points: 6, triggered: true, evidence: 'Unstably housed 8 months — LOINC 71802-3 screened positive' },
        { criterion: 'Food insecurity', points: 4, triggered: true, evidence: 'Food shelf reliance 3–4 days/week — LOINC 88122-7 positive' },
        { criterion: 'Active SUD with treatment gap', points: 4, triggered: true, evidence: 'AUDIT-C 8 (high risk); prior relapse episode Feb 2025' },
        { criterion: 'Mental health crisis in prior 6 months', points: 4, triggered: true, evidence: 'ED visit for psychiatric crisis Feb 2025; PHQ-9 = 14' },
        { criterion: 'IPV screen positive', points: 2, triggered: false, evidence: 'HITS screen negative' },
      ],
    },
    {
      domain: 'careGaps',
      domainLabel: 'Care Gap & Access Indicators',
      maxPoints: 15,
      weight: 0.15,
      earnedPoints: 11,
      scoringCriteria: [
        { criterion: 'No PCP visit in prior 6 months (care gap)', points: 5, triggered: false, evidence: 'Office visit Jan 28, 2025 — within 6 months' },
        { criterion: 'Medication adherence PDC <60% for ≥2 medications', points: 5, triggered: true, evidence: 'Insulin PDC 0.48, furosemide PDC 0.62, carvedilol PDC 0.58 — 3 meds below 0.60' },
        { criterion: 'HEDIS quality gap: A1C uncontrolled (>9%)', points: 3, triggered: true, evidence: 'A1C 9.8% — CDC measure gap confirmed' },
        { criterion: 'Transportation barrier documented', points: 2, triggered: true, evidence: 'Transportation insecurity screened positive — LOINC 93030-5' },
      ],
    },
    {
      domain: 'cost',
      domainLabel: 'Predictive Cost Percentile',
      maxPoints: 0,
      weight: 0.00,
      earnedPoints: 0,
      scoringCriteria: [
        { criterion: 'Top 5% cost (VCCI primary eligibility gate)', points: 0, triggered: true, evidence: 'PMPY $58,400 — 97th percentile of Vermont Medicaid population. Automatic VCCI eligibility flag.' },
        { criterion: 'CDPS score ≥3.0 (high Medicaid cost predictor)', points: 0, triggered: true, evidence: 'CDPS composite score: 4.84 — exceeds Very High threshold of 3.5' },
      ],
    },
  ],

  compositeScore: 90,
  riskTier: 'very-high',

  hl7ReferralMessage: `MSH|^~\\&|DVHA-ANALYTICS|DVHA|VCCI-CM|VTCHRNCCARE|20250114083000||REF^I12^REF_I12|VCCI-REF-20250114-001|P|2.5.1|||AL|NE|USA
RF1|P|N|UD^^HL70336|SC^^HL70337|20250114|20250121|||VCCI-REF-2025-001
PID|1||VT-MCD-VCCI-0001^^^DVHA^MR||Forcier^Raymond^A||19710815|M|||Rutland^VT^05701^USA|||VT-English
PV1|1|O|VCCI^CM-UNIT^DVHA||||1345678901^Bilodeau^Sandra^RN^^^CCM
DG1|1||I50.22^Chronic systolic heart failure^ICD-10||20251001|A
DG1|2||E11.65^Type 2 diabetes mellitus with hyperglycemia^ICD-10||20251001|A
DG1|3||F11.20^Opioid use disorder moderate on MOUD^ICD-10||20251001|A
DG1|4||F33.1^Major depressive disorder recurrent moderate^ICD-10||20251001|A
DG1|5||N18.3^Chronic kidney disease stage 3^ICD-10||20251001|A
IN1|1|VTMEDICAID|VT-MEDICAID||DVHA||||||SSI||||20250101
OBX|1|NM|VCCI-RISK-SCORE^^LOCAL||90|score|70-100|H|||F
OBX|2|CWE|VCCI-RISK-TIER^^LOCAL||VERY-HIGH^^LOCAL
OBX|3|NM|VCCI-CDPS-SCORE^^LOCAL||4.84|score
OBX|4|NM|VCCI-COST-PCTILE^^LOCAL||97|%tile
OBX|5|CWE|71802-3^Housing status^LN||LA30190-5^Homeless^LN|||A|||F
OBX|6|NM|55757-9^PHQ-9 score^LN||14|score|<5|H|||F
OBX|7|NM|75626-2^AUDIT-C score^LN||8|score|<3|H|||F`,

  fhirCarePlan: {
    resourceType: 'CarePlan',
    id: 'cp-raymond-forcier-001',
    status: 'active',
    intent: 'plan',
    title: 'VCCI Intensive Case Management Care Plan — Raymond Forcier',
    period: { start: '2025-01-14', end: '2025-07-14' },
    subject: { reference: 'Patient/vcci-pt-raymond-001', display: 'Raymond Forcier' },
    author: { reference: 'Practitioner/prov-bilodeau-001', display: 'Sandra Bilodeau, RN, CCM — VCCI Case Manager' },
    careTeam: [{ reference: 'CareTeam/ct-raymond-001' }],
    goal: [
      { reference: 'Goal/goal-raymond-a1c', display: 'Reduce A1C from 9.8% to <8.0% within 6 months' },
      { reference: 'Goal/goal-raymond-housing', display: 'Achieve stable housing within 90 days' },
      { reference: 'Goal/goal-raymond-ed', display: 'Zero ED visits for CHF or hyperglycemia within 3 months' },
      { reference: 'Goal/goal-raymond-moud', display: 'Maintain MOUD adherence >90% PDC' },
    ],
    activity: [
      { detail: { kind: 'ServiceRequest', code: { coding: [{ system: 'http://snomed.info/sct', code: '410423009', display: 'Medication reconciliation' }] }, status: 'in-progress', description: 'Pharmacist MTM session — Tom Guerette PharmD — monthly for 3 months' } },
      { detail: { kind: 'ServiceRequest', code: { coding: [{ system: 'http://snomed.info/sct', code: '229070002', display: 'Weight monitoring' }] }, status: 'in-progress', description: 'Daily home weight monitoring via RPM — alert threshold 3 lb in 24h' } },
      { detail: { kind: 'ServiceRequest', code: { coding: [{ system: 'http://snomed.info/sct', code: '385763009', display: 'Housing assessment' }] }, status: 'in-progress', description: 'Housing navigation — connect to Rutland Community Land Trust + Section 8 application' } },
      { detail: { kind: 'ServiceRequest', code: { coding: [{ system: 'http://snomed.info/sct', code: '410427005', display: 'Substance use disorder treatment' }] }, status: 'in-progress', description: 'MOUD adherence support — monthly check-in, urine drug screen coordination' } },
    ],
    note: [{ text: 'VCCI enrollment approved 2025-01-14. Case manager: Sandra Bilodeau RN, CCM. Risk tier: Very High (composite score 90/100). CDPS: 4.84. 97th percentile Medicaid cost. Referral source: DVHA predictive analytics flag + PCP referral from Dr. Osei.' }],
  },
};

// ─── VCCI PATIENT 2: LINDA BEAUPRE ────────────────────────────────────────────
// 61-year-old female, Caledonia County, Medicaid ABD. COPD + T2DM + depression.
// Rural, limited access — Critical Access Hospital territory. High risk tier.

const linda: VCCIPatient = {
  id: 'vcci-pt-002',
  name: 'Linda Beaupre',
  age: 61,
  dob: '1964-02-28',
  sex: 'F',
  county: 'Caledonia',
  town: 'St. Johnsbury',
  medicaidId: 'VT-MCD-VCCI-0002',
  eligibilityType: 'ABD',
  dualEligible: true,
  pcp: '1234567890',
  scenarioTitle: 'Linda Beaupre — High Risk, Newly VCCI Eligible, Rural Access Barriers',
  clinicalSummary: 'Linda is a 61-year-old female in rural Caledonia County (Northeast Kingdom) with COPD, T2DM, and recurrent major depression. She is a Medicare/Medicaid dual eligible. Her COPD has caused 3 hospitalizations in the past year, all at Northeastern Vermont Regional Hospital (critical access). Telehealth access is limited by poor rural broadband. She screens positive for depression and food insecurity. Her CDPS score of 2.94 and utilization pattern qualify her for VCCI. This scenario illustrates the rural access dimension of VCCI targeting and the HCC/CDPS dual-model scoring for dual-eligible patients.',
  vcciGoals: [
    'Enroll in pulmonary rehabilitation (telehealth-based given rural location)',
    'Establish written COPD action plan with rescue medication protocol',
    'Connect to 3SquaresVT (Vermont SNAP) — close documentation gap',
    'Monthly telephonic case management — no in-person access available',
    'Coordinate CHT (Community Health Team) referral in St. Johnsbury',
  ],
  cdpsScore: 2.94,
  hccRafScore: 1.38,
  totalCostPMPY: 31200,
  percentileRank: 88,
  vcciEligible: true,
  vcciEnrolled: false,
  vcciEnrollmentDate: undefined,
  vcciCaseManager: undefined,

  chronicConditions: [
    { name: 'COPD with acute exacerbation', icd10: 'J44.1', cdpsCategory: 'PULM_H', cdpsWeight: 1.94, hccCode: 111, hccWeight: 0.346, severity: 'high', controlStatus: 'uncontrolled', relevantLoinc: '19926-5', mostRecentValue: 'FEV1/FVC 0.52' },
    { name: 'Type 2 diabetes mellitus without complications', icd10: 'E11.9', cdpsCategory: 'DIAB_M', cdpsWeight: 0.94, hccCode: 19, hccWeight: 0.105, severity: 'medium', controlStatus: 'controlled', relevantLoinc: '4548-4', mostRecentValue: 'A1C 7.4%' },
    { name: 'Major depressive disorder, recurrent, moderate', icd10: 'F33.1', cdpsCategory: 'MH_M', cdpsWeight: 1.14, hccCode: 58, hccWeight: 0.399, severity: 'medium', controlStatus: 'uncontrolled', relevantLoinc: '55757-9', mostRecentValue: 'PHQ-9: 12' },
    { name: 'Essential hypertension', icd10: 'I10', cdpsCategory: 'CARD_M', cdpsWeight: 1.18, severity: 'low', controlStatus: 'controlled', relevantLoinc: '8480-6', mostRecentValue: 'BP 132/80' },
    { name: 'Personal history of tobacco use (50 pack-years)', icd10: 'F17.210', cdpsCategory: 'PULM_H', cdpsWeight: 0, severity: 'medium', controlStatus: 'controlled' },
  ],

  medications: [
    { rxnorm: '1037361', name: 'Tiotropium 18mcg inhaler daily', class: 'LAMA (COPD)', prescriber: '1234567890', adherencePDC: 0.78 },
    { rxnorm: '896006', name: 'Fluticasone/salmeterol 250/50 BID', class: 'ICS/LABA (COPD)', prescriber: '1234567890', adherencePDC: 0.61 },
    { rxnorm: '860975', name: 'Metformin 1000mg BID', class: 'Biguanide (T2DM)', prescriber: '1234567890', adherencePDC: 0.82 },
    { rxnorm: '311040', name: 'Lisinopril 5mg daily', class: 'ACE inhibitor (HTN)', prescriber: '1234567890', adherencePDC: 0.88 },
    { rxnorm: '2108878', name: 'Sertraline 100mg daily', class: 'SSRI (MDD)', prescriber: '1234567890', adherencePDC: 0.67 },
    { rxnorm: '905175', name: 'Prednisone 20mg taper (rescue)', class: 'Corticosteroid (COPD rescue)', prescriber: '1234567890', adherencePDC: 1.0 },
  ],

  encounters: [
    { date: '2025-09-10', type: 'inpatient', facility: 'Northeastern Vermont Regional Hospital', principalDx: 'J44.1', drg: '190', cost: 8400, los: 3, avoidable: false },
    { date: '2025-05-22', type: 'inpatient', facility: 'Northeastern Vermont Regional Hospital', principalDx: 'J44.1', drg: '190', cost: 7800, los: 4, avoidable: true, vcciFlagReason: 'ACSC PQI-5 — COPD exacerbation; no written action plan, no rescue medication instructions given at prior discharge' },
    { date: '2025-02-08', type: 'inpatient', facility: 'Northeastern Vermont Regional Hospital', principalDx: 'J44.0', drg: '192', cost: 7200, los: 4, avoidable: true, vcciFlagReason: 'ACSC PQI-5 — COPD with infection; antibiotic prescribing delayed in outpatient' },
    { date: '2025-11-01', type: 'ed', facility: 'Northeastern Vermont Regional Hospital', principalDx: 'J44.1', cost: 1800, avoidable: true, vcciFlagReason: 'ACSC — COPD exacerbation; inhaler adherence PDC 0.61 for ICS/LABA' },
    { date: '2025-07-15', type: 'office', facility: 'NVR Primary Care', principalDx: 'J44.1', cost: 280, avoidable: false },
  ],

  sdoh: [
    { domain: 'Food Insecurity', flag: true, detail: 'Relies on food shelf and neighbor support. Not enrolled in SNAP despite eligibility.', fhirResource: 'Observation: LOINC 88122-7 → LA28397-0 (Often true)' },
    { domain: 'Transportation', flag: true, detail: 'No vehicle; rural Caledonia County. Public transit limited to 2 days/week in St. Johnsbury.', fhirResource: 'Observation: LOINC 93030-5 → Yes' },
    { domain: 'Social Isolation', flag: true, detail: 'Widowed 2022. Lives alone. Adult children in southern Vermont.', fhirResource: 'Observation: LOINC 93029-7 → isolated' },
    { domain: 'Rural Broadband Access', flag: true, detail: 'Broadband speed <10 Mbps — insufficient for stable telehealth. VCCI telephonic-only approach needed.', fhirResource: 'Observation: local extension → broadband barrier' },
    { domain: 'Housing Instability', flag: false, detail: 'Owns home; stable housing. No housing need identified.', fhirResource: 'Observation: LOINC 71802-3 → stable' },
    { domain: 'Mental Health', flag: true, detail: 'PHQ-9 score 12 (moderate). Not engaged with behavioral health since husband passed.', fhirResource: 'Observation: LOINC 55757-9 → 12' },
  ],

  scoreDomains: [
    {
      domain: 'utilization',
      domainLabel: 'Utilization (ED + Inpatient)',
      maxPoints: 35,
      weight: 0.35,
      earnedPoints: 28,
      scoringCriteria: [
        { criterion: '≥3 ED visits in prior 12 months', points: 12, triggered: false, evidence: '1 ED visit in 12 months — does not trigger maximum' },
        { criterion: '≥2 inpatient admissions in prior 12 months', points: 10, triggered: true, evidence: '3 inpatient admissions (Feb, May, Sep 2025)' },
        { criterion: '30-day readmission present', points: 8, triggered: false, evidence: 'No 30-day readmission in measurement period' },
        { criterion: 'Partial utilization credit (1 ED + 3 admits)', points: 10, triggered: true, evidence: 'Pro-rated scoring: 3 admissions × 3 pts + 1 ED × 1 pt = 10 pts for utilization sub-score' },
      ],
    },
    {
      domain: 'chronic',
      domainLabel: 'Chronic Condition Burden (CDPS)',
      maxPoints: 30,
      weight: 0.30,
      earnedPoints: 22,
      scoringCriteria: [
        { criterion: '≥1 CDPS Very High category condition (weight ≥4.0)', points: 12, triggered: false, evidence: 'No CDPS Very High category — highest is PULM_H (1.94)' },
        { criterion: '≥2 CDPS High category conditions (weight 1.5–3.9)', points: 10, triggered: false, evidence: 'Only 1 CDPS High: PULM_H (1.94). DIAB_M (0.94) and MH_M (1.14) are Medium.' },
        { criterion: 'Active polypharmacy ≥5 medications', points: 5, triggered: true, evidence: '6 active medications including COPD triple therapy' },
        { criterion: '≥3 distinct CDPS categories', points: 7, triggered: true, evidence: 'PULM_H + DIAB_M + MH_M + CARD_M = 4 distinct CDPS categories' },
      ],
    },
    {
      domain: 'sdoh',
      domainLabel: 'Social Determinants of Health',
      maxPoints: 20,
      weight: 0.20,
      earnedPoints: 14,
      scoringCriteria: [
        { criterion: 'Housing instability or homelessness', points: 6, triggered: false, evidence: 'Housing stable — not triggered' },
        { criterion: 'Food insecurity', points: 4, triggered: true, evidence: 'Food shelf reliance; SNAP gap — LOINC 88122-7 positive' },
        { criterion: 'Active SUD with treatment gap', points: 4, triggered: false, evidence: 'No active SUD' },
        { criterion: 'Mental health crisis in prior 6 months', points: 4, triggered: true, evidence: 'PHQ-9 = 12 — moderate depression, no active BH engagement' },
        { criterion: 'Rural access barrier (broadband/transport)', points: 6, triggered: true, evidence: 'Transportation insecurity + broadband barrier documented' },
      ],
    },
    {
      domain: 'careGaps',
      domainLabel: 'Care Gap & Access Indicators',
      maxPoints: 15,
      weight: 0.15,
      earnedPoints: 10,
      scoringCriteria: [
        { criterion: 'No PCP visit in prior 6 months (care gap)', points: 5, triggered: false, evidence: 'Office visit Jul 15, 2025' },
        { criterion: 'Medication adherence PDC <60% for ≥2 medications', points: 5, triggered: false, evidence: 'ICS/LABA PDC 0.61 — just above threshold; sertraline PDC 0.67' },
        { criterion: 'COPD action plan absent (HEDIS PCE gap)', points: 5, triggered: true, evidence: 'No written COPD action plan documented in chart — HEDIS PCE gap' },
        { criterion: 'Transportation barrier documented', points: 5, triggered: true, evidence: 'Transportation insecurity screened positive' },
      ],
    },
    {
      domain: 'cost',
      domainLabel: 'Predictive Cost Percentile',
      maxPoints: 0,
      weight: 0.00,
      earnedPoints: 0,
      scoringCriteria: [
        { criterion: 'Top 5% cost (VCCI primary eligibility gate)', points: 0, triggered: false, evidence: 'PMPY $31,200 — 88th percentile. Above VCCI threshold (typically top 10–15%) but not top 5%.' },
        { criterion: 'CDPS score ≥2.0 (VCCI secondary threshold)', points: 0, triggered: true, evidence: 'CDPS composite score: 2.94 — exceeds High threshold of 2.0. Qualifies via secondary pathway.' },
      ],
    },
  ],

  compositeScore: 74,
  riskTier: 'high',

  hl7ReferralMessage: `MSH|^~\\&|NVRHOSPITAL-ADT|NVRH|VCCI-CM|VTCHRNCCARE|20251010093000||REF^I12^REF_I12|VCCI-REF-20251010-002|P|2.5.1
RF1|P|N|UD^^HL70336|SC^^HL70337|20251010|20251017
PID|1||VT-MCD-VCCI-0002^^^DVHA^MR||Beaupre^Linda^M||19640228|F|||St. Johnsbury^VT^05819^USA
PV1|1|O|VCCI^CM-UNIT^DVHA
DG1|1||J44.1^COPD with acute exacerbation^ICD-10||20251010|A
DG1|2||E11.9^Type 2 diabetes mellitus^ICD-10||20251010|A
DG1|3||F33.1^Major depressive disorder recurrent^ICD-10||20251010|A
IN1|1|VTMEDICAID|VT-MEDICAID||DVHA||||||ABD
IN2|||MEDICARE|VT-MCR-1234567
OBX|1|NM|VCCI-RISK-SCORE^^LOCAL||74|score|60-100|H|||F
OBX|2|CWE|VCCI-RISK-TIER^^LOCAL||HIGH^^LOCAL
OBX|3|NM|VCCI-CDPS-SCORE^^LOCAL||2.94|score
OBX|4|NM|VCCI-HCC-RAF^^LOCAL||1.38|score
OBX|5|NM|55757-9^PHQ-9 score^LN||12|score|<5|H|||F
OBX|6|CWE|88122-7^Food insecurity^LN||LA28397-0^Often true^LN`,

  fhirCarePlan: {
    resourceType: 'CarePlan',
    id: 'cp-linda-beaupre-001',
    status: 'draft',
    intent: 'plan',
    title: 'VCCI Proposed Care Plan — Linda Beaupre (Pending Enrollment)',
    period: { start: '2025-10-17' },
    subject: { reference: 'Patient/vcci-pt-linda-001', display: 'Linda Beaupre' },
    note: [{ text: 'VCCI eligibility confirmed 2025-10-10. Enrollment pending telephonic screening. Proposed case manager: Sandra Bilodeau RN CCM. Risk tier: High (composite score 74/100). CDPS: 2.94. 88th percentile. Dual eligible (Medicare + Medicaid). Rural access barrier — telephonic-only care management approach.' }],
  },
};

// ─── VCCI PATIENT 3: DARNELL WASHINGTON ───────────────────────────────────────
// 38-year-old male, Chittenden County, Medicaid MAGI. SUD + MH + housing. Medium risk.
// Illustrates the VCCI MEDIUM tier — eligible for CHT referral, not VCCI intensive CM.

const darnell: VCCIPatient = {
  id: 'vcci-pt-003',
  name: 'Darnell Washington',
  age: 38,
  dob: '1987-04-11',
  sex: 'M',
  county: 'Chittenden',
  town: 'Burlington',
  medicaidId: 'VT-MCD-VCCI-0003',
  eligibilityType: 'MAGI',
  dualEligible: false,
  pcp: '1234567890',
  scenarioTitle: 'Darnell Washington — Medium Risk, CHT Referral (Not VCCI Intensive)',
  clinicalSummary: 'Darnell is a 38-year-old on MAGI Medicaid with AUD (alcohol use disorder) in early recovery, moderate anxiety disorder, and hypertension. He has had 2 ED visits in the past year — both for alcohol-related issues. He screens positive for food insecurity and has unstable employment. His CDPS score of 1.44 and utilization pattern place him in the Medium risk tier — above the CHT referral threshold but below the VCCI intensive case management threshold. This scenario is used to illustrate the VCCI tier boundary and how the scoring algorithm distinguishes Medium from High risk.',
  vcciGoals: [
    'CHT referral for SUD peer recovery support',
    'Connect to SNAP and food shelf resources',
    'PCP follow-up within 30 days for BP management',
  ],
  cdpsScore: 1.44,
  totalCostPMPY: 12800,
  percentileRank: 72,
  vcciEligible: false,
  vcciEnrolled: false,

  chronicConditions: [
    { name: 'Alcohol use disorder, moderate', icd10: 'F10.20', cdpsCategory: 'SUD_H', cdpsWeight: 1.88, severity: 'medium', controlStatus: 'controlled' },
    { name: 'Generalized anxiety disorder', icd10: 'F41.1', cdpsCategory: 'MH_M', cdpsWeight: 1.14, severity: 'low', controlStatus: 'controlled' },
    { name: 'Essential hypertension', icd10: 'I10', cdpsCategory: 'CARD_M', cdpsWeight: 1.18, severity: 'low', controlStatus: 'controlled', relevantLoinc: '8480-6', mostRecentValue: 'BP 138/86' },
  ],

  medications: [
    { rxnorm: '308460', name: 'Naltrexone 50mg daily', class: 'MOUD/AUD treatment', prescriber: '1234567890', adherencePDC: 0.72 },
    { rxnorm: '311040', name: 'Lisinopril 10mg daily', class: 'ACE inhibitor (HTN)', prescriber: '1234567890', adherencePDC: 0.80 },
    { rxnorm: '723527', name: 'Buspirone 10mg BID', class: 'Anxiolytic (GAD)', prescriber: '1234567890', adherencePDC: 0.68 },
  ],

  encounters: [
    { date: '2025-08-03', type: 'ed', facility: 'UVM Medical Center', principalDx: 'F10.20', cost: 1600, avoidable: true, vcciFlagReason: 'AUD relapse — missed naltrexone 12 days; no SUD peer support active' },
    { date: '2025-03-15', type: 'ed', facility: 'UVM Medical Center', principalDx: 'F10.20', cost: 1400, avoidable: true, vcciFlagReason: 'AUD relapse — job loss stress event; no BH appointment within 30 days' },
    { date: '2025-01-22', type: 'office', facility: 'Burlington Family Medicine', principalDx: 'F10.20', cost: 260, avoidable: false },
  ],

  sdoh: [
    { domain: 'Food Insecurity', flag: true, detail: 'Skips meals 3–4 days/week. Not enrolled in SNAP.', fhirResource: 'Observation: LOINC 88122-7 → Often true' },
    { domain: 'Housing Instability', flag: true, detail: 'Month-to-month lease at risk. Unstable employment.', fhirResource: 'Observation: LOINC 71802-3 → At risk' },
    { domain: 'Social Isolation', flag: false, detail: 'Has social support from recovery group. Not isolated.', fhirResource: 'Observation: LOINC 93029-7 → not isolated' },
    { domain: 'Substance Use Disorder', flag: true, detail: 'AUD in early recovery. AUDIT-C score 6 (moderate risk).', fhirResource: 'Observation: LOINC 75626-2 → 6' },
  ],

  scoreDomains: [
    { domain: 'utilization', domainLabel: 'Utilization (ED + Inpatient)', maxPoints: 35, weight: 0.35, earnedPoints: 14,
      scoringCriteria: [
        { criterion: '≥3 ED visits in prior 12 months', points: 12, triggered: false, evidence: '2 ED visits — below threshold' },
        { criterion: '≥2 inpatient admissions in prior 12 months', points: 10, triggered: false, evidence: 'No inpatient admissions' },
        { criterion: '2 ED visits (partial credit)', points: 8, triggered: true, evidence: '2 ED visits in 12 months = 8 pts partial credit' },
        { criterion: '30-day readmission present', points: 8, triggered: false, evidence: 'No readmission' },
      ] },
    { domain: 'chronic', domainLabel: 'Chronic Condition Burden (CDPS)', maxPoints: 30, weight: 0.30, earnedPoints: 14,
      scoringCriteria: [
        { criterion: '≥1 CDPS Very High category condition', points: 12, triggered: false, evidence: 'No CDPS Very High conditions' },
        { criterion: '≥2 CDPS High category conditions', points: 10, triggered: false, evidence: 'Only 1 CDPS-H adjacent: SUD_H coded (AUD) — but controlled/early recovery status reduces severity weighting' },
        { criterion: 'Active polypharmacy ≥5 medications', points: 5, triggered: false, evidence: '3 medications — not polypharmacy' },
        { criterion: '≥2 distinct CDPS categories', points: 7, triggered: true, evidence: 'SUD_H + MH_M + CARD_M = 3 CDPS categories' },
      ] },
    { domain: 'sdoh', domainLabel: 'SDOH Vulnerability', maxPoints: 20, weight: 0.20, earnedPoints: 12,
      scoringCriteria: [
        { criterion: 'Housing instability or homelessness', points: 6, triggered: false, evidence: 'At-risk but not unstable — partial trigger (3 pts)' },
        { criterion: 'Food insecurity', points: 4, triggered: true, evidence: 'LOINC 88122-7 positive — 4 pts' },
        { criterion: 'Active SUD with treatment gap', points: 4, triggered: false, evidence: 'In recovery on naltrexone — reduced weight' },
        { criterion: 'Mental health — mild-moderate, controlled', points: 4, triggered: false, evidence: 'GAD controlled on buspirone — not a crisis presentation' },
        { criterion: 'AUDIT-C ≥4 (moderate SUD risk)', points: 5, triggered: true, evidence: 'AUDIT-C 6 — moderate risk. Relapse history. = 5 pts' },
      ] },
    { domain: 'careGaps', domainLabel: 'Care Gap & Access Indicators', maxPoints: 15, weight: 0.15, earnedPoints: 8,
      scoringCriteria: [
        { criterion: 'No PCP visit in prior 6 months', points: 5, triggered: false, evidence: 'Office visit Jan 22, 2025' },
        { criterion: 'Medication adherence PDC <60%', points: 5, triggered: false, evidence: 'All meds PDC >0.60' },
        { criterion: 'SUD peer support gap', points: 5, triggered: true, evidence: 'No active SUD peer support connection documented — 5 pts' },
        { criterion: 'SNAP enrollment gap despite eligibility', points: 3, triggered: true, evidence: 'Eligible for SNAP but not enrolled — 3 pts' },
      ] },
    { domain: 'cost', domainLabel: 'Predictive Cost Percentile', maxPoints: 0, weight: 0.00, earnedPoints: 0,
      scoringCriteria: [
        { criterion: 'Top 5% cost gate', points: 0, triggered: false, evidence: 'PMPY $12,800 — 72nd percentile. Does not meet top 5% cost gate.' },
        { criterion: 'CDPS ≥2.0 secondary gate', points: 0, triggered: false, evidence: 'CDPS 1.44 — below secondary threshold of 2.0. Does not qualify via secondary pathway.' },
      ] },
  ],

  compositeScore: 48,
  riskTier: 'medium',

  hl7ReferralMessage: `MSH|^~\\&|BURLINGTON-FHM|BFM|CHTTEAM|BLUEPRINTHT|20251101110000||REF^I12|CHT-REF-20251101-003|P|2.5.1
RF1|P|N|UD^^HL70336|RU^^HL70337|20251101|20251108
PID|1||VT-MCD-VCCI-0003^^^DVHA^MR||Washington^Darnell^L||19870411|M|||Burlington^VT^05401^USA
DG1|1||F10.20^Alcohol use disorder moderate^ICD-10||20251101|A
DG1|2||F41.1^Generalized anxiety disorder^ICD-10||20251101|A
OBX|1|NM|VCCI-RISK-SCORE^^LOCAL||48|score
OBX|2|CWE|VCCI-RISK-TIER^^LOCAL||MEDIUM^^LOCAL
OBX|3|NM|VCCI-CDPS-SCORE^^LOCAL||1.44
OBX|4|CWE|REF-DESTINATION^^LOCAL||CHT-BURLINGTON^^LOCAL|||F
NTE|1||NOT eligible for VCCI intensive case management (score 48, CDPS 1.44, 72nd pctile). Referring to Blueprint CHT Burlington for SUD peer support and SNAP navigation.`,

  fhirCarePlan: {
    resourceType: 'CarePlan',
    id: 'cp-darnell-washington-001',
    status: 'active',
    intent: 'plan',
    title: 'Blueprint CHT Care Plan — Darnell Washington',
    note: [{ text: 'Medium risk tier (48/100). Below VCCI intensive threshold. Referred to Blueprint CHT Burlington for SUD peer support, SNAP enrollment, and PCP follow-up coordination. Re-evaluate for VCCI if score increases above 60 or CDPS exceeds 2.0.' }],
  },
};

export const VCCI_PATIENTS: VCCIPatient[] = [raymond, linda, darnell];

// ─── VCCI RISK TIER THRESHOLDS ────────────────────────────────────────────────
export const VCCI_TIER_THRESHOLDS = {
  veryHigh: { minScore: 80, cdpsMin: 3.5, costPercentileMin: 95, action: 'VCCI Intensive Case Management — assigned dedicated VCCI case manager, shared care plan, monthly in-person or telephonic touchpoints, eco-mapping, care team conferences' },
  high:     { minScore: 60, cdpsMin: 2.0, costPercentileMin: 80, action: 'VCCI Intensive Case Management — same as Very High but lower intensity; bi-monthly touchpoints; community resource navigation' },
  medium:   { minScore: 35, cdpsMin: 1.0, costPercentileMin: 60, action: 'Blueprint CHT Referral — Community Health Team support, peer recovery, care navigation; re-evaluate for VCCI in 90 days' },
  low:      { minScore: 0,  cdpsMin: 0,   costPercentileMin: 0,  action: 'Standard Medicaid — preventive outreach, annual wellness, SDOH screening at next encounter' },
};
