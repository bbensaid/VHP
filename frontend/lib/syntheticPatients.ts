// Synthetic Vermont patient dataset for VBC Clinical Quality Lab
// 8 scenario-based patient profiles covering risk stratification, HEDIS, readmissions, and value-based care

export interface Diagnosis {
  icd10: string;
  display: string;
  hccCode?: number;
  hccWeight?: number;
  snomedCode?: string;
}

export interface LabResult {
  loincCode: string;
  loincDisplay: string;
  value: number;
  unit: string;
  date: string;
  interpretation: 'normal' | 'abnormal' | 'critical';
}

export interface Medication {
  rxnorm: string;
  display: string;
  dose: string;
  frequency: string;
  adherent: boolean;
}

export interface Encounter {
  id: string;
  type: 'inpatient' | 'ed' | 'office' | 'snf' | 'telehealth';
  admitDate: string;
  dischargeDate: string;
  principalDx: string;
  drg?: string;
  drgDescription?: string;
  cptCodes: string[];
  totalCost: number;
  avoidable?: boolean;
  avoidableReason?: string;
  readmission?: boolean;
  indexEncounterId?: string;
}

export interface HEDISMeasureStatus {
  measure: string;
  code: string;
  inNumerator: boolean;
  inDenominator: boolean;
  gapDescription?: string;
  closingAction?: string;
}

export interface HCCDetail {
  hccCode: number;
  hccLabel: string;
  icd10Codes: string[];
  coefficient: number;
  description: string;
}

export interface SyntheticPatient {
  id: string;
  name: string;
  age: number;
  dob: string;
  sex: 'M' | 'F';
  county: string;
  payer: 'Medicare' | 'Medicaid' | 'Commercial';
  memberId: string;
  // Risk
  rafScore: number;
  hccDetails: HCCDetail[];
  charlsonScore: number;
  riskTier: 'low' | 'rising' | 'high' | 'very-high';
  // Clinical
  diagnoses: Diagnosis[];
  medications: Medication[];
  labs: LabResult[];
  encounters: Encounter[];
  // HEDIS
  hedisStatus: HEDISMeasureStatus[];
  // HL7 & FHIR
  hl7AdtMessage: string;
  hl7OruMessage?: string;
  fhirBundle: object;
  // Narrative
  scenario: string;
  scenarioTitle: string;
  keyLearning: string;
  sdohFlags: string[];
  totalCostPMPY: number;
}

// ─── PATIENT 1: Elaine Morrison ───────────────────────────────────────────────
// T2DM + DKA readmission. HbA1c 9.2% — out of CDC numerator. Multiple avoidable ED visits.

const elaine: SyntheticPatient = {
  id: 'pt-001',
  name: 'Elaine Morrison',
  age: 67,
  dob: '1958-03-14',
  sex: 'F',
  county: 'Orange',
  payer: 'Medicare',
  memberId: 'VT-MCR-001847',
  rafScore: 1.82,
  charlsonScore: 5,
  riskTier: 'very-high',
  hccDetails: [
    { hccCode: 19, hccLabel: 'Diabetes without Complication', icd10Codes: ['E11.9'], coefficient: 0.105, description: 'Type 2 diabetes mellitus without complications — base HCC for all T2DM patients' },
    { hccCode: 18, hccLabel: 'Diabetes with Chronic Complications', icd10Codes: ['E11.65', 'E11.40'], coefficient: 0.302, description: 'Hyperglycemic crises and ophthalmic complications elevate from HCC 19 to HCC 18' },
    { hccCode: 85, hccLabel: 'Congestive Heart Failure', icd10Codes: ['I50.9'], coefficient: 0.331, description: 'CHF adds significant RAF weight — highest-cost comorbidity in this profile' },
    { hccCode: 22, hccLabel: 'Morbid Obesity', icd10Codes: ['E66.01'], coefficient: 0.272, description: 'BMI 41 — interacts with T2DM and HTN to compound risk score' },
  ],
  scenario: 'T2DM Readmission & HEDIS Gap',
  scenarioTitle: 'Elaine Morrison — Diabetic Readmission & Care Gap',
  keyLearning: 'Elaine represents the classic high-cost, high-gap patient: HbA1c out of control, a DKA hospitalization, a 28-day readmission, and three avoidable ED visits over 12 months. Closing her HbA1c gap alone would move her from the bottom quartile to near the 50th percentile on CDC measure performance, and an RPM-linked pharmacist MTM program could prevent ~$18,400 in annual ED/inpatient spend.',
  sdohFlags: ['Transportation barrier', 'Food insecurity — rural Orange County', 'Limited health literacy'],
  totalCostPMPY: 42800,
  diagnoses: [
    { icd10: 'E11.65', display: 'Type 2 diabetes mellitus with hyperglycemia', hccCode: 18, hccWeight: 0.302, snomedCode: '44054006' },
    { icd10: 'E11.40', display: 'Type 2 diabetes mellitus with diabetic ophthalmic complication', hccCode: 18, hccWeight: 0.302 },
    { icd10: 'I50.9', display: 'Heart failure, unspecified', hccCode: 85, hccWeight: 0.331, snomedCode: '84114007' },
    { icd10: 'I10', display: 'Essential (primary) hypertension', snomedCode: '38341003' },
    { icd10: 'E66.01', display: 'Morbid (severe) obesity due to excess calories', hccCode: 22, hccWeight: 0.272 },
    { icd10: 'Z87.39', display: 'Personal history of other endocrine, nutritional and metabolic diseases' },
  ],
  medications: [
    { rxnorm: '860975', display: 'Metformin 1000mg', dose: '1000mg', frequency: 'BID', adherent: false },
    { rxnorm: '311040', display: 'Lisinopril 10mg', dose: '10mg', frequency: 'Daily', adherent: true },
    { rxnorm: '197361', display: 'Furosemide 40mg', dose: '40mg', frequency: 'Daily', adherent: false },
    { rxnorm: '613391', display: 'Insulin glargine 100 units/mL', dose: '20 units', frequency: 'Nightly', adherent: false },
  ],
  labs: [
    { loincCode: '4548-4', loincDisplay: 'Hemoglobin A1c/Hemoglobin.total in Blood', value: 9.2, unit: '%', date: '2025-11-10', interpretation: 'abnormal' },
    { loincCode: '4548-4', loincDisplay: 'Hemoglobin A1c/Hemoglobin.total in Blood', value: 8.8, unit: '%', date: '2025-08-03', interpretation: 'abnormal' },
    { loincCode: '4548-4', loincDisplay: 'Hemoglobin A1c/Hemoglobin.total in Blood', value: 9.6, unit: '%', date: '2025-04-15', interpretation: 'abnormal' },
    { loincCode: '8480-6', loincDisplay: 'Systolic blood pressure', value: 148, unit: 'mmHg', date: '2025-11-10', interpretation: 'abnormal' },
    { loincCode: '8462-4', loincDisplay: 'Diastolic blood pressure', value: 92, unit: 'mmHg', date: '2025-11-10', interpretation: 'abnormal' },
    { loincCode: '2160-0', loincDisplay: 'Creatinine [Mass/volume] in Serum or Plasma', value: 1.4, unit: 'mg/dL', date: '2025-11-10', interpretation: 'abnormal' },
    { loincCode: '2339-0', loincDisplay: 'Glucose [Mass/volume] in Blood', value: 386, unit: 'mg/dL', date: '2025-09-12', interpretation: 'critical' },
  ],
  encounters: [
    { id: 'enc-001-1', type: 'inpatient', admitDate: '2025-09-12', dischargeDate: '2025-09-17', principalDx: 'E11.65', drg: '638', drgDescription: 'Diabetes with MCC', cptCodes: ['99233', '93000', '82947'], totalCost: 14200, avoidable: false },
    { id: 'enc-001-2', type: 'inpatient', admitDate: '2025-10-10', dischargeDate: '2025-10-13', principalDx: 'E11.65', drg: '639', drgDescription: 'Diabetes with CC', cptCodes: ['99232', '82947'], totalCost: 8600, readmission: true, indexEncounterId: 'enc-001-1', avoidable: true, avoidableReason: 'Readmission within 30 days — no post-discharge follow-up, insulin non-adherence' },
    { id: 'enc-001-3', type: 'ed', admitDate: '2025-07-04', dischargeDate: '2025-07-04', principalDx: 'E11.65', cptCodes: ['99285'], totalCost: 2100, avoidable: true, avoidableReason: 'Hyperglycemia — manageable in outpatient with RPM and pharmacist MTM' },
    { id: 'enc-001-4', type: 'ed', admitDate: '2025-03-18', dischargeDate: '2025-03-18', principalDx: 'I50.9', cptCodes: ['99285', '93010'], totalCost: 2400, avoidable: true, avoidableReason: 'CHF decompensation — no RPM, missed follow-up after prior visit' },
    { id: 'enc-001-5', type: 'office', admitDate: '2025-11-10', dischargeDate: '2025-11-10', principalDx: 'E11.9', cptCodes: ['99214', '82947'], totalCost: 280 },
  ],
  hedisStatus: [
    { measure: 'Comprehensive Diabetes Care — HbA1c Control (<8%)', code: 'CDC-HbA1c', inDenominator: true, inNumerator: false, gapDescription: 'Most recent HbA1c 9.2% — fails <8% threshold. Three consecutive values above 8.5%.', closingAction: 'Pharmacist MTM + insulin titration protocol + CGM enrollment' },
    { measure: 'Comprehensive Diabetes Care — HbA1c Testing', code: 'CDC-Test', inDenominator: true, inNumerator: true },
    { measure: 'Controlling High Blood Pressure', code: 'CBP', inDenominator: true, inNumerator: false, gapDescription: 'BP 148/92 at most recent visit — above <140/90 threshold.', closingAction: 'Add amlodipine 5mg, remote BP monitoring enrollment' },
    { measure: 'Comprehensive Diabetes Care — Eye Exam', code: 'CDC-Eye', inDenominator: true, inNumerator: false, gapDescription: 'No dilated eye exam documented in measurement year.', closingAction: 'Close-loop referral to ophthalmology within 30 days' },
    { measure: 'Statin Therapy for Patients with Diabetes', code: 'SPD', inDenominator: true, inNumerator: false, gapDescription: 'No statin prescribed despite T2DM + cardiovascular risk.', closingAction: 'Prescribe atorvastatin 40mg at next visit' },
  ],
  hl7AdtMessage: `MSH|^~\\&|UVMMC-ADT|UVMMC|VT-HIE|VTINFO|20250912083045||ADT^A01^ADT_A01|MSG20250912083045|P|2.5.1|||AL|NE|USA
EVN|A01|20250912083045
PID|1||VT-MCR-001847^^^VT-HIE^MR||Morrison^Elaine^A||19580314|F|||123 Maple Hill Rd^^Bradford^VT^05033^USA|||||||123-45-6789
PV1|1|I|3NORTH^312^A^UVMMC||||1234567^Johnson^Robert^M^^^MD|1234568^Chen^Lisa^K^^^MD||MED||||A|||1234567^Johnson^Robert^M^^^MD|IP||MCR|||||||||||||||||UVMMC||ADM|20250912083045
DG1|1||E11.65^Type 2 diabetes mellitus with hyperglycemia^ICD-10|Type 2 DM with hyperglycemia|20250912|A
DG1|2||I50.9^Heart failure, unspecified^ICD-10|Heart failure|20250912|A
DG1|3||I10^Essential (primary) hypertension^ICD-10|Hypertension|20250912|A
AL1|1|DA|^Sulfonamides||Rash
PR1|1||93000^Electrocardiogram routine ECG^CPT|||20250912`,

  hl7OruMessage: `MSH|^~\\&|UVMMC-LIS|UVMMC|VT-HIE|VTINFO|20250912140022||ORU^R01^ORU_R01|LAB20250912140022|P|2.5.1
PID|1||VT-MCR-001847^^^VT-HIE^MR||Morrison^Elaine^A||19580314|F
PV1|1|I|3NORTH^312^A^UVMMC
OBR|1|ORD-20250912-001|LAB-20250912-001|82947^Glucose [Mass/volume] in Blood^LN|||20250912133000|||||||||1234569^Kim^Susan^^^MD
OBX|1|NM|82947^Glucose [Mass/volume] in Blood^LN||386|mg/dL|70-99|HH|||F|||20250912140000
OBX|2|NM|4548-4^Hemoglobin A1c/Hemoglobin.total in Blood^LN||9.2|%|<5.7|H|||F|||20250912140000
OBX|3|NM|2160-0^Creatinine [Mass/volume] in Serum or Plasma^LN||1.4|mg/dL|0.6-1.2|H|||F|||20250912140000
OBX|4|NM|8480-6^Systolic blood pressure^LN||148|mm[Hg]|<130|H|||F|||20250912140000
OBX|5|NM|8462-4^Diastolic blood pressure^LN||92|mm[Hg]|<80|H|||F|||20250912140000`,

  fhirBundle: {
    resourceType: 'Bundle',
    id: 'bundle-elaine-morrison-001',
    type: 'collection',
    timestamp: '2025-09-12T08:30:45Z',
    entry: [
      {
        resource: {
          resourceType: 'Patient',
          id: 'pt-elaine-001',
          identifier: [{ system: 'urn:oid:2.16.840.1.113883.4.3.50', value: 'VT-MCR-001847' }],
          name: [{ family: 'Morrison', given: ['Elaine', 'A'] }],
          gender: 'female',
          birthDate: '1958-03-14',
          address: [{ line: ['123 Maple Hill Rd'], city: 'Bradford', state: 'VT', postalCode: '05033', country: 'USA' }],
          extension: [{ url: 'http://hl7.org/fhir/us/core/StructureDefinition/us-core-county', valueString: 'Orange County, VT' }]
        }
      },
      {
        resource: {
          resourceType: 'Encounter',
          id: 'enc-elaine-001',
          status: 'finished',
          class: { system: 'http://terminology.hl7.org/CodeSystem/v3-ActCode', code: 'IMP', display: 'inpatient encounter' },
          type: [{ coding: [{ system: 'http://snomed.info/sct', code: '32485007', display: 'Hospital admission' }] }],
          subject: { reference: 'Patient/pt-elaine-001' },
          period: { start: '2025-09-12T08:30:45Z', end: '2025-09-17T14:00:00Z' },
          diagnosis: [{ condition: { reference: 'Condition/cond-elaine-001' }, rank: 1 }]
        }
      },
      {
        resource: {
          resourceType: 'Condition',
          id: 'cond-elaine-001',
          clinicalStatus: { coding: [{ system: 'http://terminology.hl7.org/CodeSystem/condition-clinical', code: 'active' }] },
          code: { coding: [{ system: 'http://hl7.org/fhir/sid/icd-10-cm', code: 'E11.65', display: 'Type 2 diabetes mellitus with hyperglycemia' }, { system: 'http://snomed.info/sct', code: '44054006', display: 'Diabetes mellitus type 2' }] },
          subject: { reference: 'Patient/pt-elaine-001' },
          onsetDateTime: '2015-06-01'
        }
      },
      {
        resource: {
          resourceType: 'Observation',
          id: 'obs-elaine-hba1c-001',
          status: 'final',
          category: [{ coding: [{ system: 'http://terminology.hl7.org/CodeSystem/observation-category', code: 'laboratory' }] }],
          code: { coding: [{ system: 'http://loinc.org', code: '4548-4', display: 'Hemoglobin A1c/Hemoglobin.total in Blood' }] },
          subject: { reference: 'Patient/pt-elaine-001' },
          effectiveDateTime: '2025-11-10T10:00:00Z',
          valueQuantity: { value: 9.2, unit: '%', system: 'http://unitsofmeasure.org', code: '%' },
          interpretation: [{ coding: [{ system: 'http://terminology.hl7.org/CodeSystem/v3-ObservationInterpretation', code: 'H', display: 'High' }] }],
          referenceRange: [{ high: { value: 5.7, unit: '%' } }]
        }
      },
      {
        resource: {
          resourceType: 'MedicationRequest',
          id: 'medrx-elaine-001',
          status: 'active',
          intent: 'order',
          medicationCodeableConcept: { coding: [{ system: 'http://www.nlm.nih.gov/research/umls/rxnorm', code: '860975', display: 'Metformin 1000 MG Oral Tablet' }] },
          subject: { reference: 'Patient/pt-elaine-001' },
          dosageInstruction: [{ text: '1000mg twice daily with meals', timing: { repeat: { frequency: 2, period: 1, periodUnit: 'd' } } }]
        }
      }
    ]
  }
};

// ─── PATIENT 2: Marcus Webb ───────────────────────────────────────────────────
// CHF + HTN. BP 158/94 — out of CBP numerator. 2 avoidable ED visits. No RPM.

const marcus: SyntheticPatient = {
  id: 'pt-002',
  name: 'Marcus Webb',
  age: 72,
  dob: '1953-07-22',
  sex: 'M',
  county: 'Chittenden',
  payer: 'Medicare',
  memberId: 'VT-MCR-002391',
  rafScore: 1.64,
  charlsonScore: 6,
  riskTier: 'very-high',
  hccDetails: [
    { hccCode: 85, hccLabel: 'Congestive Heart Failure', icd10Codes: ['I50.32'], coefficient: 0.331, description: 'CHF with preserved EF — highest-weight HCC in this profile' },
    { hccCode: 96, hccLabel: 'Specified Heart Arrhythmias', icd10Codes: ['I48.0'], coefficient: 0.263, description: 'Paroxysmal AFib adds arrhythmia HCC on top of CHF' },
    { hccCode: 107, hccLabel: 'Vascular Disease with Complications', icd10Codes: ['I73.9'], coefficient: 0.374, description: 'Peripheral artery disease — highest coefficient in profile' },
    { hccCode: 22, hccLabel: 'Morbid Obesity', icd10Codes: ['E66.09'], coefficient: 0.272, description: 'Class II obesity contributing to CHF and HTN burden' },
  ],
  scenario: 'CHF Avoidable ED & BP Gap',
  scenarioTitle: 'Marcus Webb — CHF Fluid Overload & Blood Pressure Uncontrolled',
  keyLearning: 'Marcus has two avoidable ED visits for CHF decompensation that together cost $4,800. No remote weight monitoring was in place. His BP remains at 158/94 despite three antihypertensives, flagging a medication reconciliation and adherence problem. Enrolling him in RPM (daily weight + BP telemetry) is estimated to reduce ED utilization by 60% based on Vermont AHEAD RPM pilot data.',
  sdohFlags: ['Social isolation — lives alone', 'Fixed income — medication cost burden'],
  totalCostPMPY: 38600,
  diagnoses: [
    { icd10: 'I50.32', display: 'Chronic diastolic (congestive) heart failure', hccCode: 85, hccWeight: 0.331, snomedCode: '84114007' },
    { icd10: 'I48.0', display: 'Paroxysmal atrial fibrillation', hccCode: 96, hccWeight: 0.263, snomedCode: '49436004' },
    { icd10: 'I10', display: 'Essential (primary) hypertension', snomedCode: '38341003' },
    { icd10: 'I73.9', display: 'Peripheral vascular disease, unspecified', hccCode: 107, hccWeight: 0.374 },
    { icd10: 'E66.09', display: 'Other obesity due to excess calories', hccCode: 22, hccWeight: 0.272 },
    { icd10: 'N18.3', display: 'Chronic kidney disease, stage 3', hccCode: 137, hccWeight: 0.184 },
  ],
  medications: [
    { rxnorm: '197361', display: 'Furosemide 40mg', dose: '40mg', frequency: 'Daily', adherent: true },
    { rxnorm: '311040', display: 'Lisinopril 20mg', dose: '20mg', frequency: 'Daily', adherent: true },
    { rxnorm: '83515', display: 'Carvedilol 25mg', dose: '25mg', frequency: 'BID', adherent: false },
    { rxnorm: '1546356', display: 'Apixaban 5mg', dose: '5mg', frequency: 'BID', adherent: true },
    { rxnorm: '200801', display: 'Amlodipine 10mg', dose: '10mg', frequency: 'Daily', adherent: true },
  ],
  labs: [
    { loincCode: '8480-6', loincDisplay: 'Systolic blood pressure', value: 158, unit: 'mmHg', date: '2025-11-15', interpretation: 'abnormal' },
    { loincCode: '8462-4', loincDisplay: 'Diastolic blood pressure', value: 94, unit: 'mmHg', date: '2025-11-15', interpretation: 'abnormal' },
    { loincCode: '8480-6', loincDisplay: 'Systolic blood pressure', value: 162, unit: 'mmHg', date: '2025-08-20', interpretation: 'abnormal' },
    { loincCode: '8462-4', loincDisplay: 'Diastolic blood pressure', value: 98, unit: 'mmHg', date: '2025-08-20', interpretation: 'abnormal' },
    { loincCode: '2160-0', loincDisplay: 'Creatinine [Mass/volume] in Serum or Plasma', value: 1.8, unit: 'mg/dL', date: '2025-11-15', interpretation: 'abnormal' },
    { loincCode: '29463-7', loincDisplay: 'Body weight', value: 224, unit: 'lbs', date: '2025-11-15', interpretation: 'abnormal' },
    { loincCode: '29463-7', loincDisplay: 'Body weight', value: 231, unit: 'lbs', date: '2025-10-01', interpretation: 'critical' },
  ],
  encounters: [
    { id: 'enc-002-1', type: 'ed', admitDate: '2025-10-01', dischargeDate: '2025-10-01', principalDx: 'I50.32', cptCodes: ['99285', '93010', '71046'], totalCost: 2600, avoidable: true, avoidableReason: '7-lb weight gain over 3 days — no RPM alert system in place to flag decompensation early' },
    { id: 'enc-002-2', type: 'ed', admitDate: '2025-06-14', dischargeDate: '2025-06-14', principalDx: 'I50.32', cptCodes: ['99285', '93010'], totalCost: 2200, avoidable: true, avoidableReason: 'Fluid overload recurrence — carvedilol non-adherence identified post-visit' },
    { id: 'enc-002-3', type: 'office', admitDate: '2025-11-15', dischargeDate: '2025-11-15', principalDx: 'I10', cptCodes: ['99214'], totalCost: 260 },
    { id: 'enc-002-4', type: 'office', admitDate: '2025-04-02', dischargeDate: '2025-04-02', principalDx: 'I50.32', cptCodes: ['99213', '93000'], totalCost: 310 },
  ],
  hedisStatus: [
    { measure: 'Controlling High Blood Pressure', code: 'CBP', inDenominator: true, inNumerator: false, gapDescription: 'BP 158/94 at most recent encounter — above <140/90 threshold. Third consecutive visit above threshold.', closingAction: 'Medication reconciliation, add spironolactone 25mg, enroll in RPM BP monitoring' },
    { measure: 'Statin Use in Persons with Cardiovascular Disease', code: 'SPC', inDenominator: true, inNumerator: false, gapDescription: 'No statin documented despite AFib + PVD + CHF.', closingAction: 'Prescribe rosuvastatin 20mg; check for drug-drug interaction with apixaban' },
    { measure: 'Medication Adherence — Hypertension (RAS Antagonists)', code: 'MAH', inDenominator: true, inNumerator: true },
  ],
  hl7AdtMessage: `MSH|^~\\&|UVM-MCHV|UVMMC|VT-HIE|VTINFO|20251001141200||ADT^A04^ADT_A04|MSG20251001141200|P|2.5.1|||AL|NE|USA
EVN|A04|20251001141200
PID|1||VT-MCR-002391^^^VT-HIE^MR||Webb^Marcus^T||19530722|M|||44 Birch St^^Burlington^VT^05401^USA
PV1|1|E|ED^ED-BAY-7^UVMMC||||2345678^Patel^Anita^R^^^MD||EM||||A|||2345678^Patel^Anita^R^^^MD|OP||MCR
DG1|1||I50.32^Chronic diastolic heart failure^ICD-10|CHF Exacerbation|20251001|A
DG1|2||I10^Essential hypertension^ICD-10|Hypertension|20251001|A
DG1|3||I48.0^Paroxysmal atrial fibrillation^ICD-10|AFib|20251001|A`,
  fhirBundle: {
    resourceType: 'Bundle',
    id: 'bundle-marcus-webb-001',
    type: 'collection',
    timestamp: '2025-10-01T14:12:00Z',
    entry: [
      {
        resource: {
          resourceType: 'Patient',
          id: 'pt-marcus-001',
          name: [{ family: 'Webb', given: ['Marcus', 'T'] }],
          gender: 'male',
          birthDate: '1953-07-22',
          address: [{ line: ['44 Birch St'], city: 'Burlington', state: 'VT', postalCode: '05401' }]
        }
      },
      {
        resource: {
          resourceType: 'Observation',
          id: 'obs-marcus-bp-001',
          status: 'final',
          code: { coding: [{ system: 'http://loinc.org', code: '55284-4', display: 'Blood pressure systolic and diastolic' }] },
          subject: { reference: 'Patient/pt-marcus-001' },
          effectiveDateTime: '2025-11-15T09:00:00Z',
          component: [
            { code: { coding: [{ system: 'http://loinc.org', code: '8480-6', display: 'Systolic blood pressure' }] }, valueQuantity: { value: 158, unit: 'mmHg' } },
            { code: { coding: [{ system: 'http://loinc.org', code: '8462-4', display: 'Diastolic blood pressure' }] }, valueQuantity: { value: 94, unit: 'mmHg' } }
          ]
        }
      },
      {
        resource: {
          resourceType: 'Condition',
          id: 'cond-marcus-chf',
          code: { coding: [{ system: 'http://hl7.org/fhir/sid/icd-10-cm', code: 'I50.32', display: 'Chronic diastolic heart failure' }, { system: 'http://snomed.info/sct', code: '84114007', display: 'Heart failure' }] },
          subject: { reference: 'Patient/pt-marcus-001' },
          clinicalStatus: { coding: [{ system: 'http://terminology.hl7.org/CodeSystem/condition-clinical', code: 'active' }] }
        }
      }
    ]
  }
};

// ─── PATIENT 3: Dorothy Lafleur ───────────────────────────────────────────────
// T2DM + CKD. HbA1c controlled at 7.6% but missed kidney monitoring. Low-value: repeated urinalysis.

const dorothy: SyntheticPatient = {
  id: 'pt-003',
  name: 'Dorothy Lafleur',
  age: 58,
  dob: '1967-01-08',
  sex: 'F',
  county: 'Windham',
  payer: 'Medicaid',
  memberId: 'VT-MCD-003512',
  rafScore: 1.31,
  charlsonScore: 4,
  riskTier: 'high',
  hccDetails: [
    { hccCode: 18, hccLabel: 'Diabetes with Chronic Complications', icd10Codes: ['E11.65'], coefficient: 0.302, description: 'T2DM with CKD complication maps to HCC 18, not base HCC 19' },
    { hccCode: 136, hccLabel: 'Chronic Kidney Disease, Stage 4', icd10Codes: ['N18.4'], coefficient: 0.289, description: 'Stage 4 CKD adds significant HCC weight — approaching ESRD threshold' },
    { hccCode: 19, hccLabel: 'Diabetes without Complication', icd10Codes: ['E11.9'], coefficient: 0.105, description: 'Base diabetes HCC — superseded by HCC 18 but shown for hierarchy illustration' },
  ],
  scenario: 'T2DM Controlled but CKD Monitoring Gap',
  scenarioTitle: 'Dorothy Lafleur — A1C Controlled, But Quality Gaps Persist',
  keyLearning: 'Dorothy illustrates that controlling A1C is necessary but not sufficient for HEDIS compliance. Her HbA1c of 7.6% puts her IN the CDC numerator — a success — but she has missed nephrology monitoring (no microalbumin/creatinine ratio in the measurement year) and has a pattern of repeated urinalysis orders that flag as low-value per Choosing Wisely. Her CKD Stage 4 RAF weight is nearly equal to her diabetes HCC, underscoring the importance of accurate comorbidity coding.',
  sdohFlags: ['Rural access — Windham County', 'Language barrier — French Canadian'],
  totalCostPMPY: 22400,
  diagnoses: [
    { icd10: 'E11.65', display: 'Type 2 diabetes mellitus with hyperglycemia', hccCode: 18, hccWeight: 0.302 },
    { icd10: 'N18.4', display: 'Chronic kidney disease, stage 4', hccCode: 136, hccWeight: 0.289 },
    { icd10: 'I10', display: 'Essential (primary) hypertension' },
    { icd10: 'E78.5', display: 'Hyperlipidemia, unspecified' },
    { icd10: 'Z87.891', display: 'Personal history of nicotine dependence' },
  ],
  medications: [
    { rxnorm: '860975', display: 'Metformin 500mg', dose: '500mg', frequency: 'BID', adherent: true },
    { rxnorm: '311040', display: 'Lisinopril 40mg', dose: '40mg', frequency: 'Daily', adherent: true },
    { rxnorm: '617312', display: 'Atorvastatin 40mg', dose: '40mg', frequency: 'Daily', adherent: true },
    { rxnorm: '1232611', display: 'Dapagliflozin 10mg (SGLT2i — renoprotective)', dose: '10mg', frequency: 'Daily', adherent: true },
  ],
  labs: [
    { loincCode: '4548-4', loincDisplay: 'Hemoglobin A1c', value: 7.6, unit: '%', date: '2025-10-22', interpretation: 'normal' },
    { loincCode: '4548-4', loincDisplay: 'Hemoglobin A1c', value: 7.9, unit: '%', date: '2025-05-14', interpretation: 'normal' },
    { loincCode: '8480-6', loincDisplay: 'Systolic blood pressure', value: 132, unit: 'mmHg', date: '2025-10-22', interpretation: 'normal' },
    { loincCode: '8462-4', loincDisplay: 'Diastolic blood pressure', value: 78, unit: 'mmHg', date: '2025-10-22', interpretation: 'normal' },
    { loincCode: '2160-0', loincDisplay: 'Creatinine', value: 2.6, unit: 'mg/dL', date: '2025-10-22', interpretation: 'abnormal' },
    { loincCode: '14959-1', loincDisplay: 'Microalbumin/Creatinine ratio — NOT performed in measurement year', value: 0, unit: 'mg/g', date: '', interpretation: 'abnormal' },
  ],
  encounters: [
    { id: 'enc-003-1', type: 'office', admitDate: '2025-10-22', dischargeDate: '2025-10-22', principalDx: 'E11.9', cptCodes: ['99214', '82947', '81001'], totalCost: 310 },
    { id: 'enc-003-2', type: 'office', admitDate: '2025-07-08', dischargeDate: '2025-07-08', principalDx: 'E11.9', cptCodes: ['99213', '81001'], totalCost: 220, avoidable: false },
    { id: 'enc-003-3', type: 'office', admitDate: '2025-04-15', dischargeDate: '2025-04-15', principalDx: 'N18.4', cptCodes: ['99214', '81001', '82565'], totalCost: 290 },
    { id: 'enc-003-4', type: 'office', admitDate: '2025-01-20', dischargeDate: '2025-01-20', principalDx: 'E11.9', cptCodes: ['99213', '81001'], totalCost: 210 },
  ],
  hedisStatus: [
    { measure: 'Comprehensive Diabetes Care — HbA1c Control (<8%)', code: 'CDC-HbA1c', inDenominator: true, inNumerator: true },
    { measure: 'Comprehensive Diabetes Care — HbA1c Testing', code: 'CDC-Test', inDenominator: true, inNumerator: true },
    { measure: 'Comprehensive Diabetes Care — Kidney Health Evaluation', code: 'CDC-KE', inDenominator: true, inNumerator: false, gapDescription: 'No urine albumin-to-creatinine ratio (UACR) in measurement year — required for CKD monitoring.', closingAction: 'Order UACR at next visit; consider nephrology co-management given Stage 4 CKD' },
    { measure: 'Controlling High Blood Pressure', code: 'CBP', inDenominator: true, inNumerator: true },
  ],
  hl7AdtMessage: `MSH|^~\\&|BRATTLEBORO-MEM|BMH|VT-HIE|VTINFO|20251022090000||ADT^A01^ADT_A01|MSG20251022090000|P|2.5.1
EVN|A01|20251022090000
PID|1||VT-MCD-003512^^^VT-HIE^MR||Lafleur^Dorothy^M||19670108|F|||88 River Rd^^Brattleboro^VT^05301^USA
PV1|1|O|CLINIC^EXAM-4^BMH||||3456789^Rivera^Carlos^A^^^MD
DG1|1||E11.9^Type 2 diabetes mellitus without complications^ICD-10||20251022|A
DG1|2||N18.4^Chronic kidney disease stage 4^ICD-10||20251022|A`,
  fhirBundle: {
    resourceType: 'Bundle',
    id: 'bundle-dorothy-lafleur-001',
    type: 'collection',
    timestamp: '2025-10-22T09:00:00Z',
    entry: [
      {
        resource: {
          resourceType: 'Patient',
          id: 'pt-dorothy-001',
          name: [{ family: 'Lafleur', given: ['Dorothy', 'M'] }],
          gender: 'female',
          birthDate: '1967-01-08',
          address: [{ city: 'Brattleboro', state: 'VT', postalCode: '05301' }]
        }
      },
      {
        resource: {
          resourceType: 'Observation',
          id: 'obs-dorothy-hba1c',
          status: 'final',
          code: { coding: [{ system: 'http://loinc.org', code: '4548-4', display: 'Hemoglobin A1c' }] },
          subject: { reference: 'Patient/pt-dorothy-001' },
          effectiveDateTime: '2025-10-22',
          valueQuantity: { value: 7.6, unit: '%' },
          interpretation: [{ coding: [{ code: 'N', display: 'Normal' }] }]
        }
      }
    ]
  }
};

// ─── PATIENT 4: James Bouchard ────────────────────────────────────────────────
// COPD — multiple ACSC ED visits. Choosing Wisely: frequent chest X-rays.

const james: SyntheticPatient = {
  id: 'pt-004',
  name: 'James Bouchard',
  age: 81,
  dob: '1944-11-03',
  sex: 'M',
  county: 'Franklin',
  payer: 'Medicare',
  memberId: 'VT-MCR-004108',
  rafScore: 1.47,
  charlsonScore: 5,
  riskTier: 'very-high',
  hccDetails: [
    { hccCode: 111, hccLabel: 'COPD', icd10Codes: ['J44.1', 'J44.0'], coefficient: 0.346, description: 'COPD with acute exacerbation — primary driver of ED utilization and RAF score' },
    { hccCode: 85, hccLabel: 'Congestive Heart Failure', icd10Codes: ['I50.9'], coefficient: 0.331, description: 'Comorbid CHF complicates COPD management and increases exacerbation risk' },
    { hccCode: 21, hccLabel: 'Protein-Calorie Malnutrition', icd10Codes: ['E44.0'], coefficient: 0.455, description: 'Moderate malnutrition — highest coefficient in profile; often undercoded in COPD patients' },
  ],
  scenario: 'COPD Avoidable ED & Low-Value Imaging',
  scenarioTitle: 'James Bouchard — COPD Exacerbations & Choosing Wisely Flags',
  keyLearning: 'James has four COPD-related ED visits in 12 months — all qualify as ACSC ambulatory-care-sensitive. An action-plan-based pulmonary rehab referral + telephonic nurse coaching (Vermont AHEAD care management benefit) could prevent an estimated 3 of 4 visits. Additionally, he has received 6 chest X-rays in 12 months despite stable COPD — Choosing Wisely recommends against routine chest X-rays in stable COPD, flagging ~$840 in potential low-value imaging spend.',
  sdohFlags: ['Former smoker (50 pack-years)', 'Rural Franklin County — limited pulmonology access', 'Caregiver fatigue (spouse 79 years old)'],
  totalCostPMPY: 31200,
  diagnoses: [
    { icd10: 'J44.1', display: 'COPD with acute exacerbation', hccCode: 111, hccWeight: 0.346, snomedCode: '13645005' },
    { icd10: 'J44.0', display: 'COPD with lower respiratory tract infection', hccCode: 111, hccWeight: 0.346 },
    { icd10: 'I50.9', display: 'Heart failure, unspecified', hccCode: 85, hccWeight: 0.331 },
    { icd10: 'E44.0', display: 'Moderate protein-calorie malnutrition', hccCode: 21, hccWeight: 0.455 },
    { icd10: 'F17.210', display: 'Nicotine dependence, cigarettes, uncomplicated' },
    { icd10: 'J45.50', display: 'Severe persistent asthma, uncomplicated' },
  ],
  medications: [
    { rxnorm: '1037361', display: 'Tiotropium 18mcg inhaler', dose: '18mcg', frequency: 'Daily', adherent: true },
    { rxnorm: '896006', display: 'Fluticasone-salmeterol 250/50 inhaler', dose: '250/50mcg', frequency: 'BID', adherent: false },
    { rxnorm: '197361', display: 'Furosemide 20mg', dose: '20mg', frequency: 'Daily', adherent: true },
    { rxnorm: '905175', display: 'Prednisone 20mg (rescue course)', dose: '20mg taper', frequency: 'As needed exacerbation', adherent: true },
  ],
  labs: [
    { loincCode: '59408-5', loincDisplay: 'Oxygen saturation by pulse oximetry', value: 91, unit: '%', date: '2025-11-02', interpretation: 'abnormal' },
    { loincCode: '19926-5', loincDisplay: 'FEV1/FVC', value: 0.48, unit: 'ratio', date: '2025-03-10', interpretation: 'abnormal' },
    { loincCode: '8480-6', loincDisplay: 'Systolic blood pressure', value: 138, unit: 'mmHg', date: '2025-11-02', interpretation: 'normal' },
    { loincCode: '2160-0', loincDisplay: 'Creatinine', value: 1.3, unit: 'mg/dL', date: '2025-11-02', interpretation: 'normal' },
  ],
  encounters: [
    { id: 'enc-004-1', type: 'ed', admitDate: '2025-11-02', dischargeDate: '2025-11-02', principalDx: 'J44.1', cptCodes: ['99285', '71046', '94640'], totalCost: 2800, avoidable: true, avoidableReason: 'ACSC: COPD exacerbation — patient had no written action plan, no pulmonary rehab enrollment' },
    { id: 'enc-004-2', type: 'ed', admitDate: '2025-08-19', dischargeDate: '2025-08-19', principalDx: 'J44.1', cptCodes: ['99285', '71046'], totalCost: 2400, avoidable: true, avoidableReason: 'ACSC: Acute COPD exacerbation — inhaler non-adherence, no rescue medication instructions' },
    { id: 'enc-004-3', type: 'ed', admitDate: '2025-05-07', dischargeDate: '2025-05-07', principalDx: 'J44.0', cptCodes: ['99285', '71046', '71250'], totalCost: 3100, avoidable: true, avoidableReason: 'ACSC: COPD + lower respiratory infection — delayed outpatient antibiotic prescribing' },
    { id: 'enc-004-4', type: 'ed', admitDate: '2025-02-11', dischargeDate: '2025-02-11', principalDx: 'J44.1', cptCodes: ['99285', '71046'], totalCost: 2500, avoidable: true, avoidableReason: 'ACSC: COPD exacerbation — winter exacerbation, no flu/pneumonia vaccination documented' },
    { id: 'enc-004-5', type: 'office', admitDate: '2025-11-10', dischargeDate: '2025-11-10', principalDx: 'J44.1', cptCodes: ['99214', '71046'], totalCost: 340 },
    { id: 'enc-004-6', type: 'office', admitDate: '2025-09-05', dischargeDate: '2025-09-05', principalDx: 'J44.1', cptCodes: ['99213', '71046'], totalCost: 290 },
  ],
  hedisStatus: [
    { measure: 'Pharmacotherapy Management of COPD Exacerbation — Systemic Corticosteroids', code: 'PCE', inDenominator: true, inNumerator: true },
    { measure: 'Pharmacotherapy Management of COPD Exacerbation — Bronchodilator', code: 'PCE-BD', inDenominator: true, inNumerator: false, gapDescription: 'Short-acting bronchodilator not dispensed within 14 days of exacerbation for 2 of 4 ED visits.', closingAction: 'Standing rescue inhaler prescription; patient education on rescue protocol' },
    { measure: 'Annual Flu Vaccination', code: 'FLU', inDenominator: true, inNumerator: false, gapDescription: 'No influenza vaccine documented in measurement year.', closingAction: 'Administer at next office visit; add standing vaccination order' },
  ],
  hl7AdtMessage: `MSH|^~\\&|NCHC-ADT|NCHC|VT-HIE|VTINFO|20251102131500||ADT^A04^ADT_A04|MSG20251102131500|P|2.5.1
EVN|A04|20251102131500
PID|1||VT-MCR-004108^^^VT-HIE^MR||Bouchard^James^R||19441103|M|||7 Farm Rd^^St. Albans^VT^05478^USA
PV1|1|E|ED^ED-BAY-2^NCHC||||4567890^Tremblay^Nicole^C^^^MD||EM
DG1|1||J44.1^COPD with acute exacerbation^ICD-10||20251102|A
DG1|2||I50.9^Heart failure, unspecified^ICD-10||20251102|A`,
  fhirBundle: {
    resourceType: 'Bundle', id: 'bundle-james-bouchard-001', type: 'collection',
    timestamp: '2025-11-02T13:15:00Z',
    entry: [
      { resource: { resourceType: 'Patient', id: 'pt-james-001', name: [{ family: 'Bouchard', given: ['James', 'R'] }], gender: 'male', birthDate: '1944-11-03', address: [{ city: 'St. Albans', state: 'VT', postalCode: '05478' }] } },
      { resource: { resourceType: 'Condition', id: 'cond-james-copd', code: { coding: [{ system: 'http://hl7.org/fhir/sid/icd-10-cm', code: 'J44.1', display: 'COPD with acute exacerbation' }, { system: 'http://snomed.info/sct', code: '13645005', display: 'COPD' }] }, subject: { reference: 'Patient/pt-james-001' }, clinicalStatus: { coding: [{ code: 'active' }] } } }
    ]
  }
};

// ─── PATIENT 5: Sarah Thibodeau ───────────────────────────────────────────────
// MDD + HTN. Missed FUH measure. BP uncontrolled. BH integration gap.

const sarah: SyntheticPatient = {
  id: 'pt-005',
  name: 'Sarah Thibodeau',
  age: 45,
  dob: '1980-09-27',
  sex: 'F',
  county: 'Rutland',
  payer: 'Medicaid',
  memberId: 'VT-MCD-005234',
  rafScore: 0.98,
  charlsonScore: 2,
  riskTier: 'rising',
  hccDetails: [
    { hccCode: 58, hccLabel: 'Major Depressive, Bipolar, and Paranoid Disorders', icd10Codes: ['F33.1'], coefficient: 0.399, description: 'Moderate recurrent MDD — highest HCC coefficient in this profile' },
    { hccCode: 55, hccLabel: 'Substance Use Disorder, Moderate/Severe', icd10Codes: ['F10.20'], coefficient: 0.329, description: 'Alcohol use disorder documented in chart — adds to BH RAF weight' },
  ],
  scenario: 'Behavioral Health + FUH Gap',
  scenarioTitle: 'Sarah Thibodeau — MDD Hospitalization & Follow-Up Failure',
  keyLearning: 'Sarah was hospitalized for a MDD episode and discharged without a follow-up appointment within 7 days — failing the HEDIS FUH measure. Vermont AHEAD has explicit BH integration benchmarks, and Rutland County has some of the highest MDD hospitalization rates in the state. Her BP is also uncontrolled but was not addressed during the BH hospitalization. This scenario illustrates how fragmented care coordination between BH and primary care creates compounding HEDIS gaps.',
  sdohFlags: ['Housing instability — Rutland', 'Trauma history', 'Childcare responsibilities limiting appointment access'],
  totalCostPMPY: 18700,
  diagnoses: [
    { icd10: 'F33.1', display: 'Major depressive disorder, recurrent, moderate', hccCode: 58, hccWeight: 0.399, snomedCode: '370143000' },
    { icd10: 'F10.20', display: 'Alcohol use disorder, moderate', hccCode: 55, hccWeight: 0.329 },
    { icd10: 'I10', display: 'Essential (primary) hypertension' },
    { icd10: 'Z59.0', display: 'Homelessness' },
  ],
  medications: [
    { rxnorm: '2108878', display: 'Sertraline 100mg', dose: '100mg', frequency: 'Daily', adherent: false },
    { rxnorm: '311040', display: 'Lisinopril 10mg', dose: '10mg', frequency: 'Daily', adherent: false },
    { rxnorm: '308460', display: 'Naltrexone 50mg', dose: '50mg', frequency: 'Daily', adherent: false },
  ],
  labs: [
    { loincCode: '8480-6', loincDisplay: 'Systolic blood pressure', value: 152, unit: 'mmHg', date: '2025-10-05', interpretation: 'abnormal' },
    { loincCode: '8462-4', loincDisplay: 'Diastolic blood pressure', value: 96, unit: 'mmHg', date: '2025-10-05', interpretation: 'abnormal' },
    { loincCode: '55757-9', loincDisplay: 'PHQ-9 total score', value: 16, unit: 'score', date: '2025-10-05', interpretation: 'abnormal' },
  ],
  encounters: [
    { id: 'enc-005-1', type: 'inpatient', admitDate: '2025-09-20', dischargeDate: '2025-09-27', principalDx: 'F33.1', drg: '885', drgDescription: 'Psychoses', cptCodes: ['99233', '90837'], totalCost: 9800 },
    { id: 'enc-005-2', type: 'office', admitDate: '2025-10-05', dischargeDate: '2025-10-05', principalDx: 'F33.1', cptCodes: ['99214', '90837'], totalCost: 320 },
  ],
  hedisStatus: [
    { measure: 'Follow-Up After Hospitalization for Mental Illness — 7-day', code: 'FUH-7', inDenominator: true, inNumerator: false, gapDescription: 'Discharge 9/27; first follow-up not until 10/5 (8 days post-discharge) — fails 7-day window by 1 day.', closingAction: 'Discharge planning protocol: schedule BH follow-up appointment BEFORE patient leaves hospital' },
    { measure: 'Follow-Up After Hospitalization for Mental Illness — 30-day', code: 'FUH-30', inDenominator: true, inNumerator: true },
    { measure: 'Controlling High Blood Pressure', code: 'CBP', inDenominator: true, inNumerator: false, gapDescription: 'BP 152/96 — above threshold. Not addressed during BH hospitalization.', closingAction: 'Warm handoff from BH team to PCP for BP management at discharge' },
    { measure: 'Antidepressant Medication Management — Effective Continuation Phase', code: 'AMM', inDenominator: true, inNumerator: false, gapDescription: 'Sertraline fill gap >15 days — fails 180-day continuation requirement.', closingAction: '90-day supply at discharge + adherence phone outreach at 30 days' },
  ],
  hl7AdtMessage: `MSH|^~\\&|RRMC-ADT|RRMC|VT-HIE|VTINFO|20250920094500||ADT^A01^ADT_A01|MSG20250920094500|P|2.5.1
EVN|A01|20250920094500
PID|1||VT-MCD-005234^^^VT-HIE^MR||Thibodeau^Sarah^L||19800927|F|||Rutland^VT^05701^USA
PV1|1|I|PSYCH^BH-UNIT-3^RRMC||||5678901^Greene^Patricia^A^^^MD||PSY
DG1|1||F33.1^Major depressive disorder, recurrent, moderate^ICD-10||20250920|A
DG1|2||F10.20^Alcohol use disorder, moderate^ICD-10||20250920|A`,
  fhirBundle: {
    resourceType: 'Bundle', id: 'bundle-sarah-thibodeau-001', type: 'collection', timestamp: '2025-09-20T09:45:00Z',
    entry: [
      { resource: { resourceType: 'Patient', id: 'pt-sarah-001', name: [{ family: 'Thibodeau', given: ['Sarah', 'L'] }], gender: 'female', birthDate: '1980-09-27', address: [{ city: 'Rutland', state: 'VT', postalCode: '05701' }] } },
      { resource: { resourceType: 'Observation', id: 'obs-sarah-phq9', status: 'final', code: { coding: [{ system: 'http://loinc.org', code: '55757-9', display: 'PHQ-9 total score' }] }, subject: { reference: 'Patient/pt-sarah-001' }, effectiveDateTime: '2025-10-05', valueQuantity: { value: 16, unit: 'score' } } }
    ]
  }
};

// ─── PATIENT 6: Robert Arsenault ──────────────────────────────────────────────
// T2DM + Hyperlipidemia. A1C improving with pharmacist MTM. Medication adherence success story.

const robert: SyntheticPatient = {
  id: 'pt-006',
  name: 'Robert Arsenault',
  age: 63,
  dob: '1962-04-18',
  sex: 'M',
  county: 'Washington',
  payer: 'Commercial',
  memberId: 'VT-COM-006745',
  rafScore: 0.74,
  charlsonScore: 2,
  riskTier: 'rising',
  hccDetails: [
    { hccCode: 19, hccLabel: 'Diabetes without Complication', icd10Codes: ['E11.9'], coefficient: 0.105, description: 'T2DM without complications — base HCC; trending toward HCC 18 if A1C remains elevated' },
    { hccCode: 87, hccLabel: 'Unstable Angina and Other Acute Ischemic Heart Disease', icd10Codes: ['I25.10'], coefficient: 0.220, description: 'CAD without angina — present but stable; adds to vascular risk profile' },
  ],
  scenario: 'Pharmacist MTM Success & Medication Adherence',
  scenarioTitle: 'Robert Arsenault — A1C Trending to Control After MTM Enrollment',
  keyLearning: 'Robert is an MTM success story. His A1C has dropped from 9.1% to 7.4% over 18 months following pharmacist-led medication reconciliation and adherence coaching. This scenario illustrates how medication adherence HEDIS measures (MAH) correlate with clinical outcomes. His case is also used to demonstrate high vs. low value care: a Choosing Wisely-flagged annual fasting lipid panel was appropriately replaced with a non-fasting panel, saving a repeat visit.',
  sdohFlags: ['Engaged, health-literate patient', 'Employer-sponsored insurance — Montpelier area'],
  totalCostPMPY: 9800,
  diagnoses: [
    { icd10: 'E11.9', display: 'Type 2 diabetes mellitus without complications', hccCode: 19, hccWeight: 0.105 },
    { icd10: 'E78.5', display: 'Hyperlipidemia, unspecified' },
    { icd10: 'I25.10', display: 'Atherosclerotic heart disease of native coronary artery without angina', hccCode: 87, hccWeight: 0.220 },
    { icd10: 'Z87.891', display: 'Personal history of nicotine dependence' },
  ],
  medications: [
    { rxnorm: '860975', display: 'Metformin 1000mg', dose: '1000mg', frequency: 'BID', adherent: true },
    { rxnorm: '617312', display: 'Atorvastatin 40mg', dose: '40mg', frequency: 'Daily', adherent: true },
    { rxnorm: '1232611', display: 'Dapagliflozin 10mg', dose: '10mg', frequency: 'Daily', adherent: true },
    { rxnorm: '311040', display: 'Lisinopril 10mg', dose: '10mg', frequency: 'Daily', adherent: true },
  ],
  labs: [
    { loincCode: '4548-4', loincDisplay: 'Hemoglobin A1c', value: 7.4, unit: '%', date: '2025-11-01', interpretation: 'normal' },
    { loincCode: '4548-4', loincDisplay: 'Hemoglobin A1c', value: 7.9, unit: '%', date: '2025-05-10', interpretation: 'normal' },
    { loincCode: '4548-4', loincDisplay: 'Hemoglobin A1c', value: 8.6, unit: '%', date: '2024-11-15', interpretation: 'abnormal' },
    { loincCode: '4548-4', loincDisplay: 'Hemoglobin A1c', value: 9.1, unit: '%', date: '2024-05-20', interpretation: 'abnormal' },
    { loincCode: '8480-6', loincDisplay: 'Systolic blood pressure', value: 128, unit: 'mmHg', date: '2025-11-01', interpretation: 'normal' },
    { loincCode: '2093-3', loincDisplay: 'Cholesterol [Mass/volume] in Serum', value: 168, unit: 'mg/dL', date: '2025-11-01', interpretation: 'normal' },
  ],
  encounters: [
    { id: 'enc-006-1', type: 'office', admitDate: '2025-11-01', dischargeDate: '2025-11-01', principalDx: 'E11.9', cptCodes: ['99214', '82947'], totalCost: 280 },
    { id: 'enc-006-2', type: 'office', admitDate: '2025-08-12', dischargeDate: '2025-08-12', principalDx: 'E11.9', cptCodes: ['99213'], totalCost: 210 },
    { id: 'enc-006-3', type: 'office', admitDate: '2025-05-10', dischargeDate: '2025-05-10', principalDx: 'E11.9', cptCodes: ['99214', '82947'], totalCost: 290 },
  ],
  hedisStatus: [
    { measure: 'Comprehensive Diabetes Care — HbA1c Control (<8%)', code: 'CDC-HbA1c', inDenominator: true, inNumerator: true },
    { measure: 'Medication Adherence — Diabetes (PDC ≥80%)', code: 'MAH', inDenominator: true, inNumerator: true },
    { measure: 'Statin Therapy for Patients with Diabetes', code: 'SPD', inDenominator: true, inNumerator: true },
    { measure: 'Comprehensive Diabetes Care — Eye Exam', code: 'CDC-Eye', inDenominator: true, inNumerator: false, gapDescription: 'No dilated eye exam in measurement year despite 4+ years T2DM.', closingAction: 'Refer to optometrist; EHR reminder at annual visit' },
  ],
  hl7AdtMessage: `MSH|^~\\&|CVMC-EMR|CVMC|VT-HIE|VTINFO|20251101100000||ADT^A04^ADT_A04|MSG20251101100000|P|2.5.1
EVN|A04|20251101100000
PID|1||VT-COM-006745^^^VT-HIE^MR||Arsenault^Robert^G||19620418|M|||Montpelier^VT^05602^USA
PV1|1|O|CLINIC^EXAM-2^CVMC||||6789012^Warner^David^K^^^MD
DG1|1||E11.9^Type 2 diabetes mellitus without complications^ICD-10||20251101|A`,
  fhirBundle: {
    resourceType: 'Bundle', id: 'bundle-robert-arsenault-001', type: 'collection', timestamp: '2025-11-01T10:00:00Z',
    entry: [
      { resource: { resourceType: 'Patient', id: 'pt-robert-001', name: [{ family: 'Arsenault', given: ['Robert', 'G'] }], gender: 'male', birthDate: '1962-04-18' } },
      { resource: { resourceType: 'Observation', id: 'obs-robert-hba1c-latest', status: 'final', code: { coding: [{ system: 'http://loinc.org', code: '4548-4', display: 'Hemoglobin A1c' }] }, subject: { reference: 'Patient/pt-robert-001' }, effectiveDateTime: '2025-11-01', valueQuantity: { value: 7.4, unit: '%' }, interpretation: [{ coding: [{ code: 'N', display: 'Normal' }] }] } }
    ]
  }
};

// ─── PATIENT 7: Maria Gonzalez ────────────────────────────────────────────────
// Hypertension. BP controlled after RPM enrollment. Positive VBC story. SDOH flags.

const maria: SyntheticPatient = {
  id: 'pt-007',
  name: 'Maria Gonzalez',
  age: 55,
  dob: '1970-06-12',
  sex: 'F',
  county: 'Lamoille',
  payer: 'Medicaid',
  memberId: 'VT-MCD-007003',
  rafScore: 0.52,
  charlsonScore: 1,
  riskTier: 'rising',
  hccDetails: [
    { hccCode: 19, hccLabel: 'Diabetes without Complication', icd10Codes: ['E11.9'], coefficient: 0.105, description: 'New T2DM diagnosis — caught at preventive visit; diet-controlled for now' },
  ],
  scenario: 'RPM Success & SDOH Intervention',
  scenarioTitle: 'Maria Gonzalez — Hypertension Controlled via RPM + SDOH Support',
  keyLearning: 'Maria was enrolled in a remote blood pressure monitoring program in Q1 2025 after two years of poorly controlled hypertension. Her BP dropped from 162/98 to 124/76 within 6 months. This scenario demonstrates the ROI of RPM: estimated $4,200/year in ED/inpatient avoidance, with a ~$480/year RPM program cost. SDOH screening also identified food insecurity and housing instability — addressing these was integral to medication adherence improvement.',
  sdohFlags: ['Food insecurity — SNAP eligible', 'Housing instability — seasonal worker housing', 'Primary language: Spanish', 'Limited transportation'],
  totalCostPMPY: 6400,
  diagnoses: [
    { icd10: 'I10', display: 'Essential (primary) hypertension', snomedCode: '38341003' },
    { icd10: 'E11.9', display: 'Type 2 diabetes mellitus without complications', hccCode: 19, hccWeight: 0.105 },
    { icd10: 'Z59.41', display: 'Food insecurity' },
    { icd10: 'Z59.1', display: 'Inadequate housing' },
  ],
  medications: [
    { rxnorm: '311040', display: 'Lisinopril 10mg', dose: '10mg', frequency: 'Daily', adherent: true },
    { rxnorm: '200801', display: 'Amlodipine 5mg', dose: '5mg', frequency: 'Daily', adherent: true },
  ],
  labs: [
    { loincCode: '8480-6', loincDisplay: 'Systolic blood pressure', value: 124, unit: 'mmHg', date: '2025-11-08', interpretation: 'normal' },
    { loincCode: '8462-4', loincDisplay: 'Diastolic blood pressure', value: 76, unit: 'mmHg', date: '2025-11-08', interpretation: 'normal' },
    { loincCode: '8480-6', loincDisplay: 'Systolic blood pressure', value: 162, unit: 'mmHg', date: '2024-11-01', interpretation: 'abnormal' },
    { loincCode: '8462-4', loincDisplay: 'Diastolic blood pressure', value: 98, unit: 'mmHg', date: '2024-11-01', interpretation: 'abnormal' },
    { loincCode: '4548-4', loincDisplay: 'Hemoglobin A1c', value: 6.8, unit: '%', date: '2025-11-08', interpretation: 'normal' },
  ],
  encounters: [
    { id: 'enc-007-1', type: 'office', admitDate: '2025-11-08', dischargeDate: '2025-11-08', principalDx: 'I10', cptCodes: ['99214', '93784'], totalCost: 290 },
    { id: 'enc-007-2', type: 'telehealth', admitDate: '2025-08-22', dischargeDate: '2025-08-22', principalDx: 'I10', cptCodes: ['99213', '99457'], totalCost: 180 },
    { id: 'enc-007-3', type: 'telehealth', admitDate: '2025-05-14', dischargeDate: '2025-05-14', principalDx: 'I10', cptCodes: ['99213', '99457'], totalCost: 180 },
  ],
  hedisStatus: [
    { measure: 'Controlling High Blood Pressure', code: 'CBP', inDenominator: true, inNumerator: true },
    { measure: 'Comprehensive Diabetes Care — HbA1c Testing', code: 'CDC-Test', inDenominator: true, inNumerator: true },
    { measure: 'Comprehensive Diabetes Care — HbA1c Control (<8%)', code: 'CDC-HbA1c', inDenominator: true, inNumerator: true },
  ],
  hl7AdtMessage: `MSH|^~\\&|MCMH-EMR|MCMH|VT-HIE|VTINFO|20251108090000||ADT^A04^ADT_A04|MSG20251108090000|P|2.5.1
EVN|A04|20251108090000
PID|1||VT-MCD-007003^^^VT-HIE^MR||Gonzalez^Maria^C||19700612|F|||Morrisville^VT^05661^USA
PV1|1|O|CLINIC^EXAM-1^MCMH||||7890123^Soto^Elena^R^^^MD
DG1|1||I10^Essential hypertension^ICD-10||20251108|A`,
  fhirBundle: {
    resourceType: 'Bundle', id: 'bundle-maria-gonzalez-001', type: 'collection', timestamp: '2025-11-08T09:00:00Z',
    entry: [
      { resource: { resourceType: 'Patient', id: 'pt-maria-001', name: [{ family: 'Gonzalez', given: ['Maria', 'C'] }], gender: 'female', birthDate: '1970-06-12', communication: [{ language: { coding: [{ system: 'urn:ietf:bcp:47', code: 'es', display: 'Spanish' }] }, preferred: true }] } },
      { resource: { resourceType: 'Observation', id: 'obs-maria-bp-latest', status: 'final', code: { coding: [{ system: 'http://loinc.org', code: '55284-4', display: 'Blood pressure' }] }, subject: { reference: 'Patient/pt-maria-001' }, effectiveDateTime: '2025-11-08', component: [{ code: { coding: [{ system: 'http://loinc.org', code: '8480-6' }] }, valueQuantity: { value: 124, unit: 'mmHg' } }, { code: { coding: [{ system: 'http://loinc.org', code: '8462-4' }] }, valueQuantity: { value: 76, unit: 'mmHg' } }] } }
    ]
  }
};

// ─── PATIENT 8: William Desrochers ───────────────────────────────────────────
// HF + AFib. Index hospitalization → SNF stay → post-acute overuse. TCOC showcase.

const william: SyntheticPatient = {
  id: 'pt-008',
  name: 'William Desrochers',
  age: 78,
  dob: '1947-02-28',
  sex: 'M',
  county: 'Essex',
  payer: 'Medicare',
  memberId: 'VT-MCR-008612',
  rafScore: 2.14,
  charlsonScore: 8,
  riskTier: 'very-high',
  hccDetails: [
    { hccCode: 85, hccLabel: 'Congestive Heart Failure', icd10Codes: ['I50.22'], coefficient: 0.331, description: 'Systolic CHF — primary driver of hospitalization and post-acute utilization' },
    { hccCode: 96, hccLabel: 'Specified Heart Arrhythmias', icd10Codes: ['I48.11'], coefficient: 0.263, description: 'Longstanding persistent AFib — on anticoagulation' },
    { hccCode: 21, hccLabel: 'Protein-Calorie Malnutrition', icd10Codes: ['E43'], coefficient: 0.455, description: 'Unspecified severe malnutrition — highest coefficient in profile; common in complex HF patients' },
    { hccCode: 108, hccLabel: 'Vascular Disease', icd10Codes: ['I70.209'], coefficient: 0.299, description: 'Aortoiliac atherosclerosis — adds vascular HCC' },
    { hccCode: 137, hccLabel: 'Chronic Kidney Disease, Stage 3', icd10Codes: ['N18.3'], coefficient: 0.184, description: 'CKD 3 — complicates diuretic titration and anticoagulation management' },
  ],
  scenario: 'Post-Acute Overuse & TCOC Decomposition',
  scenarioTitle: 'William Desrochers — Heart Failure Hospitalization & SNF Overutilization',
  keyLearning: 'William represents the highest total cost patient in the panel at $68,400/year. His care story: index HF hospitalization → 21-day SNF stay (above expected 14 days) → two additional ED visits → no home health transition. His TCOC breakdown shows SNF/post-acute at 38% of total spend — the highest modifiable cost category. A preferred SNF network with standardized discharge criteria and a 30-day transition care management program would address the most expensive cost drivers.',
  sdohFlags: ['Very rural — Essex County (Northeast Kingdom)', 'No reliable internet for telehealth', 'Limited family support', 'Transportation dependency'],
  totalCostPMPY: 68400,
  diagnoses: [
    { icd10: 'I50.22', display: 'Chronic systolic (congestive) heart failure', hccCode: 85, hccWeight: 0.331 },
    { icd10: 'I48.11', display: 'Longstanding persistent atrial fibrillation', hccCode: 96, hccWeight: 0.263 },
    { icd10: 'E43', display: 'Unspecified severe protein-calorie malnutrition', hccCode: 21, hccWeight: 0.455 },
    { icd10: 'I70.209', display: 'Unspecified atherosclerosis of native arteries of extremities', hccCode: 108, hccWeight: 0.299 },
    { icd10: 'N18.3', display: 'Chronic kidney disease, stage 3', hccCode: 137, hccWeight: 0.184 },
    { icd10: 'E11.65', display: 'Type 2 diabetes mellitus with hyperglycemia', hccCode: 18, hccWeight: 0.302 },
  ],
  medications: [
    { rxnorm: '197361', display: 'Furosemide 80mg', dose: '80mg', frequency: 'BID', adherent: true },
    { rxnorm: '1546356', display: 'Apixaban 5mg', dose: '5mg', frequency: 'BID', adherent: true },
    { rxnorm: '83515', display: 'Carvedilol 12.5mg', dose: '12.5mg', frequency: 'BID', adherent: true },
    { rxnorm: '1232611', display: 'Sacubitril/valsartan 49/51mg (Entresto)', dose: '49/51mg', frequency: 'BID', adherent: false },
    { rxnorm: '617312', display: 'Atorvastatin 40mg', dose: '40mg', frequency: 'Daily', adherent: true },
  ],
  labs: [
    { loincCode: '8480-6', loincDisplay: 'Systolic blood pressure', value: 102, unit: 'mmHg', date: '2025-09-15', interpretation: 'abnormal' },
    { loincCode: '2160-0', loincDisplay: 'Creatinine', value: 2.1, unit: 'mg/dL', date: '2025-09-15', interpretation: 'abnormal' },
    { loincCode: '33762-6', loincDisplay: 'NT-proBNP', value: 4820, unit: 'pg/mL', date: '2025-09-15', interpretation: 'critical' },
    { loincCode: '2160-0', loincDisplay: 'Creatinine', value: 1.9, unit: 'mg/dL', date: '2025-11-01', interpretation: 'abnormal' },
  ],
  encounters: [
    { id: 'enc-008-1', type: 'inpatient', admitDate: '2025-09-15', dischargeDate: '2025-09-22', principalDx: 'I50.22', drg: '291', drgDescription: 'Heart failure and shock with MCC', cptCodes: ['99233', '93306', '71046'], totalCost: 22400 },
    { id: 'enc-008-2', type: 'snf', admitDate: '2025-09-22', dischargeDate: '2025-10-13', principalDx: 'I50.22', cptCodes: ['99307', '99308', '99309'], totalCost: 26000 },
    { id: 'enc-008-3', type: 'ed', admitDate: '2025-10-28', dischargeDate: '2025-10-28', principalDx: 'I50.22', cptCodes: ['99285', '93010', '71046'], totalCost: 3100, avoidable: true, avoidableReason: 'Fluid re-accumulation post-SNF discharge — no home health ordered, no transition care management visit' },
    { id: 'enc-008-4', type: 'ed', admitDate: '2025-11-18', dischargeDate: '2025-11-20', principalDx: 'I50.22', cptCodes: ['99285', '93010'], totalCost: 4800, readmission: true, indexEncounterId: 'enc-008-1' },
  ],
  hedisStatus: [
    { measure: 'Statin Use in Persons with Cardiovascular Disease', code: 'SPC', inDenominator: true, inNumerator: true },
    { measure: 'Medication Adherence — Hypertension (RAS Antagonists)', code: 'MAH', inDenominator: true, inNumerator: false, gapDescription: 'Sacubitril/valsartan PDC falls below 80% — cost barrier identified', closingAction: 'Entresto patient assistance program enrollment; consider generic ACEI bridge' },
    { measure: 'Comprehensive Diabetes Care — HbA1c Testing', code: 'CDC-Test', inDenominator: true, inNumerator: false, gapDescription: 'No A1C in measurement year despite T2DM diagnosis.', closingAction: 'Add A1C to standing CHF follow-up labs order set' },
  ],
  hl7AdtMessage: `MSH|^~\\&|NCHC-ADT|NCHC|VT-HIE|VTINFO|20250915073000||ADT^A01^ADT_A01|MSG20250915073000|P|2.5.1
EVN|A01|20250915073000
PID|1||VT-MCR-008612^^^VT-HIE^MR||Desrochers^William^A||19470228|M|||Rural Route 2^^Island Pond^VT^05846^USA
PV1|1|I|CARDIAC^ROOM-4^NCHC||||8901234^Bergeron^Louis^P^^^MD|8901235^Singh^Priya^V^^^MD||CARD||||A|||8901234^Bergeron^Louis^P^^^MD|IP||MCR
DG1|1||I50.22^Chronic systolic heart failure^ICD-10||20250915|A
DG1|2||I48.11^Longstanding persistent atrial fibrillation^ICD-10||20250915|A
DG1|3||E43^Severe protein-calorie malnutrition^ICD-10||20250915|A
DG1|4||N18.3^Chronic kidney disease stage 3^ICD-10||20250915|A`,
  fhirBundle: {
    resourceType: 'Bundle', id: 'bundle-william-desrochers-001', type: 'collection', timestamp: '2025-09-15T07:30:00Z',
    entry: [
      { resource: { resourceType: 'Patient', id: 'pt-william-001', name: [{ family: 'Desrochers', given: ['William', 'A'] }], gender: 'male', birthDate: '1947-02-28', address: [{ line: ['Rural Route 2'], city: 'Island Pond', state: 'VT', postalCode: '05846' }] } },
      { resource: { resourceType: 'Observation', id: 'obs-william-bnp', status: 'final', code: { coding: [{ system: 'http://loinc.org', code: '33762-6', display: 'NT-proBNP [Mass/volume] in Serum or Plasma' }] }, subject: { reference: 'Patient/pt-william-001' }, effectiveDateTime: '2025-09-15', valueQuantity: { value: 4820, unit: 'pg/mL' }, interpretation: [{ coding: [{ code: 'HH', display: 'Critical High' }] }] } },
      { resource: { resourceType: 'Condition', id: 'cond-william-hf', code: { coding: [{ system: 'http://hl7.org/fhir/sid/icd-10-cm', code: 'I50.22', display: 'Chronic systolic heart failure' }] }, subject: { reference: 'Patient/pt-william-001' }, clinicalStatus: { coding: [{ code: 'active' }] } } }
    ]
  }
};

// ─── USCDI v3 DATA ELEMENTS ───────────────────────────────────────────────────

export interface USCDIElement {
  dataClass: string;
  dataElement: string;
  fhirResource: string;
  fhirProfile?: string;
  terminologySystem: string;
  exampleCode: string;
  exampleDisplay: string;
  uscdiVersion: 'v1' | 'v2' | 'v3';
  notes?: string;
}

export const USCDI_ELEMENTS: USCDIElement[] = [
  { dataClass: 'Allergies and Intolerances', dataElement: 'Substance (Medication)', fhirResource: 'AllergyIntolerance', terminologySystem: 'RxNorm', exampleCode: '7980', exampleDisplay: 'Penicillin', uscdiVersion: 'v1' },
  { dataClass: 'Allergies and Intolerances', dataElement: 'Reaction', fhirResource: 'AllergyIntolerance', terminologySystem: 'SNOMED CT', exampleCode: '271807003', exampleDisplay: 'Skin rash', uscdiVersion: 'v1' },
  { dataClass: 'Assessment and Plan of Treatment', dataElement: 'Assessment and Plan', fhirResource: 'CarePlan', terminologySystem: 'SNOMED CT / free text', exampleCode: '734163000', exampleDisplay: 'Care plan', uscdiVersion: 'v1' },
  { dataClass: 'Care Team Members', dataElement: 'Care Team Member Name', fhirResource: 'CareTeam', terminologySystem: 'NPI', exampleCode: '1234567890', exampleDisplay: 'Dr. Robert Johnson (PCP)', uscdiVersion: 'v1' },
  { dataClass: 'Clinical Notes', dataElement: 'Consultation Note', fhirResource: 'DocumentReference', terminologySystem: 'LOINC', exampleCode: '11488-4', exampleDisplay: 'Consult note', uscdiVersion: 'v1' },
  { dataClass: 'Clinical Notes', dataElement: 'Discharge Summary', fhirResource: 'DocumentReference', terminologySystem: 'LOINC', exampleCode: '18842-5', exampleDisplay: 'Discharge summary', uscdiVersion: 'v1' },
  { dataClass: 'Clinical Notes', dataElement: 'History and Physical', fhirResource: 'DocumentReference', terminologySystem: 'LOINC', exampleCode: '34117-2', exampleDisplay: 'History and physical note', uscdiVersion: 'v1' },
  { dataClass: 'Clinical Notes', dataElement: 'Procedure Note', fhirResource: 'DocumentReference', terminologySystem: 'LOINC', exampleCode: '28570-0', exampleDisplay: 'Procedure note', uscdiVersion: 'v1' },
  { dataClass: 'Clinical Notes', dataElement: 'Progress Note', fhirResource: 'DocumentReference', terminologySystem: 'LOINC', exampleCode: '11506-3', exampleDisplay: 'Progress note', uscdiVersion: 'v1' },
  { dataClass: 'Diagnostic Imaging', dataElement: 'Imaging Result', fhirResource: 'DiagnosticReport / ImagingStudy', terminologySystem: 'LOINC / RADLEX', exampleCode: '24627-2', exampleDisplay: 'Chest X-ray AP', uscdiVersion: 'v2' },
  { dataClass: 'Encounter Information', dataElement: 'Encounter Diagnosis', fhirResource: 'Encounter', terminologySystem: 'ICD-10-CM', exampleCode: 'E11.65', exampleDisplay: 'T2DM with hyperglycemia', uscdiVersion: 'v1' },
  { dataClass: 'Encounter Information', dataElement: 'Encounter Disposition', fhirResource: 'Encounter', terminologySystem: 'NUBC / SNOMED', exampleCode: '306689006', exampleDisplay: 'Discharge to SNF', uscdiVersion: 'v3' },
  { dataClass: 'Encounter Information', dataElement: 'Encounter Time', fhirResource: 'Encounter', terminologySystem: 'ISO 8601', exampleCode: '2025-09-15T07:30:00Z', exampleDisplay: 'Admission datetime', uscdiVersion: 'v1' },
  { dataClass: 'Functional Status', dataElement: 'Functional Status Assessment', fhirResource: 'Observation', terminologySystem: 'LOINC', exampleCode: '89576-4', exampleDisplay: 'Functional Status Assessment', uscdiVersion: 'v2' },
  { dataClass: 'Goals', dataElement: 'Patient Goal', fhirResource: 'Goal', terminologySystem: 'SNOMED CT', exampleCode: '699691000000102', exampleDisplay: 'HbA1c target <8%', uscdiVersion: 'v1' },
  { dataClass: 'Health Concerns', dataElement: 'Health Concern', fhirResource: 'Condition', terminologySystem: 'SNOMED CT / ICD-10', exampleCode: 'Z59.41', exampleDisplay: 'Food insecurity', uscdiVersion: 'v2' },
  { dataClass: 'Immunizations', dataElement: 'Immunization', fhirResource: 'Immunization', terminologySystem: 'CVX', exampleCode: '141', exampleDisplay: 'Influenza, seasonal, injectable', uscdiVersion: 'v1' },
  { dataClass: 'Laboratory', dataElement: 'Laboratory Test Result', fhirResource: 'Observation', terminologySystem: 'LOINC', exampleCode: '4548-4', exampleDisplay: 'Hemoglobin A1c', uscdiVersion: 'v1' },
  { dataClass: 'Laboratory', dataElement: 'Laboratory Value/Result', fhirResource: 'Observation', terminologySystem: 'UCUM', exampleCode: '%', exampleDisplay: '9.2 %', uscdiVersion: 'v1' },
  { dataClass: 'Medications', dataElement: 'Medications', fhirResource: 'MedicationRequest', terminologySystem: 'RxNorm', exampleCode: '860975', exampleDisplay: 'Metformin 1000 MG Oral Tablet', uscdiVersion: 'v1' },
  { dataClass: 'Patient Demographics', dataElement: 'Date of Birth', fhirResource: 'Patient', terminologySystem: 'ISO 8601', exampleCode: '1958-03-14', exampleDisplay: 'Birth date', uscdiVersion: 'v1' },
  { dataClass: 'Patient Demographics', dataElement: 'Race', fhirResource: 'Patient (US Core extension)', terminologySystem: 'CDC Race & Ethnicity', exampleCode: '2106-3', exampleDisplay: 'White', uscdiVersion: 'v1' },
  { dataClass: 'Patient Demographics', dataElement: 'Ethnicity', fhirResource: 'Patient (US Core extension)', terminologySystem: 'CDC Race & Ethnicity', exampleCode: '2186-5', exampleDisplay: 'Not Hispanic or Latino', uscdiVersion: 'v1' },
  { dataClass: 'Patient Demographics', dataElement: 'Sex (Biological)', fhirResource: 'Patient', terminologySystem: 'HL7 AdministrativeGender', exampleCode: 'female', exampleDisplay: 'Female', uscdiVersion: 'v1' },
  { dataClass: 'Patient Demographics', dataElement: 'Gender Identity', fhirResource: 'Patient (US Core extension)', terminologySystem: 'SNOMED CT', exampleCode: '446141000124107', exampleDisplay: 'Identifies as female gender', uscdiVersion: 'v2' },
  { dataClass: 'Patient Demographics', dataElement: 'Preferred Language', fhirResource: 'Patient.communication', terminologySystem: 'BCP-47', exampleCode: 'es', exampleDisplay: 'Spanish', uscdiVersion: 'v1' },
  { dataClass: 'Problems', dataElement: 'Problems/Conditions', fhirResource: 'Condition', terminologySystem: 'ICD-10-CM / SNOMED CT', exampleCode: 'I50.32', exampleDisplay: 'Chronic diastolic heart failure', uscdiVersion: 'v1' },
  { dataClass: 'Procedures', dataElement: 'Procedures', fhirResource: 'Procedure', terminologySystem: 'CPT / SNOMED CT', exampleCode: '99214', exampleDisplay: 'Office/outpatient visit, moderate', uscdiVersion: 'v1' },
  { dataClass: 'Provenance', dataElement: 'Author Time Stamp', fhirResource: 'Provenance', terminologySystem: 'ISO 8601', exampleCode: '2025-09-12T08:30:45Z', exampleDisplay: 'Record authored', uscdiVersion: 'v2' },
  { dataClass: 'Smoking Status', dataElement: 'Smoking Status', fhirResource: 'Observation', terminologySystem: 'SNOMED CT / LOINC', exampleCode: '8517006', exampleDisplay: 'Ex-smoker', uscdiVersion: 'v1', notes: 'LOINC panel: 72166-2' },
  { dataClass: 'Social Determinants of Health', dataElement: 'SDOH Assessment', fhirResource: 'Observation', terminologySystem: 'LOINC', exampleCode: '96777-8', exampleDisplay: 'Accountable health communities — screening questions', uscdiVersion: 'v3' },
  { dataClass: 'Social Determinants of Health', dataElement: 'SDOH Goal', fhirResource: 'Goal', terminologySystem: 'SNOMED CT', exampleCode: '1078229009', exampleDisplay: 'Improve food access', uscdiVersion: 'v3' },
  { dataClass: 'Unique Device Identifier(s)', dataElement: 'UDI', fhirResource: 'Device', terminologySystem: 'FDA UDI', exampleCode: '(01)00844588003288', exampleDisplay: 'Cardiac rhythm monitor', uscdiVersion: 'v1' },
  { dataClass: 'Vital Signs', dataElement: 'Systolic Blood Pressure', fhirResource: 'Observation', terminologySystem: 'LOINC', exampleCode: '8480-6', exampleDisplay: 'Systolic blood pressure', uscdiVersion: 'v1' },
  { dataClass: 'Vital Signs', dataElement: 'Diastolic Blood Pressure', fhirResource: 'Observation', terminologySystem: 'LOINC', exampleCode: '8462-4', exampleDisplay: 'Diastolic blood pressure', uscdiVersion: 'v1' },
  { dataClass: 'Vital Signs', dataElement: 'Body Weight', fhirResource: 'Observation', terminologySystem: 'LOINC', exampleCode: '29463-7', exampleDisplay: 'Body weight', uscdiVersion: 'v1' },
  { dataClass: 'Vital Signs', dataElement: 'BMI', fhirResource: 'Observation', terminologySystem: 'LOINC', exampleCode: '39156-5', exampleDisplay: 'Body mass index (BMI)', uscdiVersion: 'v1' },
  { dataClass: 'Vital Signs', dataElement: 'Oxygen Saturation', fhirResource: 'Observation', terminologySystem: 'LOINC', exampleCode: '59408-5', exampleDisplay: 'Oxygen saturation by pulse oximetry', uscdiVersion: 'v2' },
];

// ─── CHOOSING WISELY LOW-VALUE FLAGS ─────────────────────────────────────────

export interface ChoosingWiselyFlag {
  id: string;
  recommendation: string;
  sponsoringOrganization: string;
  evidenceGrade: 'A' | 'B' | 'C';
  cptCodes: string[];
  icd10Triggers: string[];
  estimatedWastePerEvent: number;
  affectedPatients: string[];
}

export const CHOOSING_WISELY_FLAGS: ChoosingWiselyFlag[] = [
  {
    id: 'cw-001',
    recommendation: "Don't perform routine chest X-rays in stable COPD patients without acute symptoms.",
    sponsoringOrganization: 'American College of Physicians',
    evidenceGrade: 'A',
    cptCodes: ['71046', '71045'],
    icd10Triggers: ['J44.0', 'J44.1', 'J44.9'],
    estimatedWastePerEvent: 140,
    affectedPatients: ['pt-004'],
  },
  {
    id: 'cw-002',
    recommendation: "Don't order urinalysis as part of routine preventive care in asymptomatic adults.",
    sponsoringOrganization: 'American Academy of Family Physicians',
    evidenceGrade: 'B',
    cptCodes: ['81001', '81002', '81003'],
    icd10Triggers: ['Z00.00', 'Z00.01', 'Z01.419'],
    estimatedWastePerEvent: 35,
    affectedPatients: ['pt-003'],
  },
  {
    id: 'cw-003',
    recommendation: "Don't perform repeat HbA1c testing more frequently than every 3 months in stable T2DM patients already at goal.",
    sponsoringOrganization: 'American Diabetes Association',
    evidenceGrade: 'B',
    cptCodes: ['83036'],
    icd10Triggers: ['E11.9'],
    estimatedWastePerEvent: 45,
    affectedPatients: [],
  },
  {
    id: 'cw-004',
    recommendation: "Don't routinely perform CT imaging for non-specific chest pain in low-risk patients.",
    sponsoringOrganization: 'American College of Emergency Physicians',
    evidenceGrade: 'A',
    cptCodes: ['71250', '71275'],
    icd10Triggers: ['R07.9'],
    estimatedWastePerEvent: 1200,
    affectedPatients: ['pt-004'],
  },
  {
    id: 'cw-005',
    recommendation: "Don't prescribe antibiotics for upper respiratory infections without confirmed bacterial etiology.",
    sponsoringOrganization: 'American Academy of Family Physicians',
    evidenceGrade: 'A',
    cptCodes: ['87880', '87081'],
    icd10Triggers: ['J06.9', 'J00'],
    estimatedWastePerEvent: 65,
    affectedPatients: [],
  },
];

// ─── EXPORTS ─────────────────────────────────────────────────────────────────

export const SYNTHETIC_PATIENTS: SyntheticPatient[] = [
  elaine, marcus, dorothy, james, sarah, robert, maria, william
];

export const PANEL_SUMMARY = {
  totalPatients: 8,
  totalCostPMPY: Math.round(SYNTHETIC_PATIENTS.reduce((s, p) => s + p.totalCostPMPY, 0) / 8),
  byRiskTier: {
    'very-high': SYNTHETIC_PATIENTS.filter(p => p.riskTier === 'very-high').length,
    'high': SYNTHETIC_PATIENTS.filter(p => p.riskTier === 'high').length,
    'rising': SYNTHETIC_PATIENTS.filter(p => p.riskTier === 'rising').length,
    'low': SYNTHETIC_PATIENTS.filter(p => p.riskTier === 'low').length,
  },
  avgRafScore: +(SYNTHETIC_PATIENTS.reduce((s, p) => s + p.rafScore, 0) / 8).toFixed(2),
  avgCharlsonScore: +(SYNTHETIC_PATIENTS.reduce((s, p) => s + p.charlsonScore, 0) / 8).toFixed(1),
  payers: { Medicare: 4, Medicaid: 3, Commercial: 1 },
  avoidableEdVisits: SYNTHETIC_PATIENTS.flatMap(p => p.encounters).filter(e => e.type === 'ed' && e.avoidable).length,
  readmissions: SYNTHETIC_PATIENTS.flatMap(p => p.encounters).filter(e => e.readmission).length,
  hedisGaps: SYNTHETIC_PATIENTS.flatMap(p => p.hedisStatus).filter(h => h.inDenominator && !h.inNumerator).length,
};
