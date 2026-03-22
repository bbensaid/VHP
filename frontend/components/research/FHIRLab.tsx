"use client";

import { useState, useMemo, useCallback } from "react";
import {
  FlaskConical,
  Copy,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Info,
  ChevronDown,
  ChevronRight,
  Zap,
  FileText,
  ArrowRight,
  ToggleLeft,
  ToggleRight,
  Shield,
  Activity,
  Search,
  ClipboardList,
} from "lucide-react";

// ─────────────────────────────────────────────────────────────────────────────
// TYPES
// ─────────────────────────────────────────────────────────────────────────────

type TabId = "builder" | "mapper" | "cds" | "priorauth" | "compliance";

// ─────────────────────────────────────────────────────────────────────────────
// STATIC DATA
// ─────────────────────────────────────────────────────────────────────────────

const LOINC_CODES = [
  { code: "8480-6", display: "Systolic blood pressure" },
  { code: "8462-4", display: "Diastolic blood pressure" },
  { code: "8867-4", display: "Heart rate" },
  { code: "9279-1", display: "Respiratory rate" },
  { code: "8310-5", display: "Body temperature" },
  { code: "29463-7", display: "Body weight" },
  { code: "8302-2", display: "Body height" },
  { code: "2339-0", display: "Glucose [Mass/volume] in Blood" },
  { code: "4548-4", display: "Hemoglobin A1c/Hemoglobin.total in Blood" },
  { code: "2160-0", display: "Creatinine [Mass/volume] in Serum or Plasma" },
];

const TERMINOLOGY_MAPPINGS: {
  term: string;
  icd10: { code: string; display: string };
  snomed: { code: string; display: string };
  loinc?: { code: string; display: string };
  rxnorm?: { code: string; display: string };
}[] = [
  {
    term: "Diabetes mellitus type 2",
    icd10: { code: "E11.9", display: "Type 2 diabetes mellitus without complications" },
    snomed: { code: "44054006", display: "Diabetes mellitus type 2" },
    loinc: { code: "4548-4", display: "Hemoglobin A1c/Hemoglobin.total in Blood" },
  },
  {
    term: "Hypertension",
    icd10: { code: "I10", display: "Essential (primary) hypertension" },
    snomed: { code: "38341003", display: "Hypertensive disorder, systemic arterial" },
    loinc: { code: "8480-6", display: "Systolic blood pressure" },
  },
  {
    term: "Sepsis",
    icd10: { code: "A41.9", display: "Sepsis, unspecified organism" },
    snomed: { code: "91302008", display: "Sepsis (disorder)" },
  },
  {
    term: "Acute myocardial infarction",
    icd10: { code: "I21.9", display: "Acute myocardial infarction, unspecified" },
    snomed: { code: "22298006", display: "Myocardial infarction (disorder)" },
  },
  {
    term: "COPD",
    icd10: { code: "J44.1", display: "Chronic obstructive pulmonary disease with acute exacerbation" },
    snomed: { code: "13645005", display: "Chronic obstructive lung disease (disorder)" },
  },
  {
    term: "Major depressive disorder",
    icd10: { code: "F32.9", display: "Major depressive disorder, single episode, unspecified" },
    snomed: { code: "370143000", display: "Major depressive disorder (disorder)" },
  },
  {
    term: "Chronic kidney disease stage 3",
    icd10: { code: "N18.3", display: "Chronic kidney disease, stage 3 (moderate)" },
    snomed: { code: "433144002", display: "Chronic kidney disease stage 3 (disorder)" },
    loinc: { code: "2160-0", display: "Creatinine [Mass/volume] in Serum or Plasma" },
  },
  {
    term: "Atrial fibrillation",
    icd10: { code: "I48.91", display: "Unspecified atrial fibrillation" },
    snomed: { code: "49436004", display: "Atrial fibrillation (disorder)" },
  },
  {
    term: "Pneumonia",
    icd10: { code: "J18.9", display: "Pneumonia, unspecified organism" },
    snomed: { code: "233604007", display: "Pneumonia (disorder)" },
  },
  {
    term: "Heart failure",
    icd10: { code: "I50.9", display: "Heart failure, unspecified" },
    snomed: { code: "84114007", display: "Heart failure (disorder)" },
  },
  {
    term: "Stroke",
    icd10: { code: "I63.9", display: "Cerebral infarction, unspecified" },
    snomed: { code: "230690007", display: "Cerebrovascular accident (disorder)" },
  },
  {
    term: "Anxiety disorder",
    icd10: { code: "F41.9", display: "Anxiety disorder, unspecified" },
    snomed: { code: "197480006", display: "Anxiety disorder (disorder)" },
  },
  {
    term: "Hypothyroidism",
    icd10: { code: "E03.9", display: "Hypothyroidism, unspecified" },
    snomed: { code: "40930008", display: "Hypothyroidism (disorder)" },
  },
  {
    term: "Asthma",
    icd10: { code: "J45.909", display: "Unspecified asthma, uncomplicated" },
    snomed: { code: "195967001", display: "Asthma (disorder)" },
  },
  {
    term: "Hyperlipidemia",
    icd10: { code: "E78.5", display: "Hyperlipidemia, unspecified" },
    snomed: { code: "55822004", display: "Hyperlipidemia (disorder)" },
    rxnorm: { code: "41493", display: "Atorvastatin" },
  },
];

const CDS_SCENARIOS = [
  {
    id: "drug-interaction",
    label: "Drug Interaction Alert",
    hookType: "order-select",
    cards: [
      {
        summary: "Potential Drug-Drug Interaction: Warfarin + Aspirin",
        detail:
          "Concomitant use of warfarin and aspirin significantly increases the risk of major bleeding events. Current INR is 2.8. Consider alternative analgesic such as acetaminophen. If aspirin is clinically necessary, monitor INR closely and consider dose reduction.",
        indicator: "critical" as const,
        source: { label: "Clinical Pharmacology Database", url: "https://clinicalpharmacology.com" },
        suggestions: [
          { label: "Switch to Acetaminophen 500mg PRN", uuid: "sug-1" },
          { label: "Order INR monitoring in 48h", uuid: "sug-2" },
          { label: "Consult Pharmacy", uuid: "sug-3" },
        ],
      },
    ],
  },
  {
    id: "preventive-gap",
    label: "Preventive Care Gap",
    hookType: "patient-view",
    cards: [
      {
        summary: "Overdue: Colorectal Cancer Screening",
        detail:
          "Patient is 58 years old and has no record of colorectal cancer screening in the past 10 years. US Preventive Services Task Force recommends colonoscopy every 10 years or annual FIT test for adults aged 45-75.",
        indicator: "warning" as const,
        source: { label: "USPSTF Guidelines", url: "https://uspreventiveservicestaskforce.org" },
        suggestions: [
          { label: "Order FIT Test", uuid: "sug-4" },
          { label: "Refer for Colonoscopy", uuid: "sug-5" },
          { label: "Patient Declined — Document", uuid: "sug-6" },
        ],
      },
      {
        summary: "Influenza Vaccine Due",
        detail: "No influenza vaccine recorded for the current flu season (2025–2026). Recommend administration at today's visit.",
        indicator: "info" as const,
        source: { label: "CDC Immunization Schedule", url: "https://cdc.gov" },
        suggestions: [
          { label: "Administer Flu Vaccine Today", uuid: "sug-7" },
          { label: "Schedule for Next Visit", uuid: "sug-8" },
        ],
      },
    ],
  },
  {
    id: "high-risk-flag",
    label: "High-Risk Patient Flag",
    hookType: "patient-view",
    cards: [
      {
        summary: "LACE Score: 14 — High 30-Day Readmission Risk",
        detail:
          "This patient has a LACE index score of 14, placing them in the highest risk category for 30-day readmission. Factors contributing: length of stay >7 days, 3 ED visits in past 6 months, 6 active comorbidities, emergent admission. Consider intensive discharge planning, post-discharge follow-up call within 48 hours, and care coordinator assignment.",
        indicator: "critical" as const,
        source: { label: "LACE Risk Model", url: "https://pubmed.ncbi.nlm.nih.gov/20713894" },
        suggestions: [
          { label: "Assign Care Coordinator", uuid: "sug-9" },
          { label: "Schedule 48h Follow-up Call", uuid: "sug-10" },
          { label: "Initiate Transition of Care Protocol", uuid: "sug-11" },
        ],
      },
    ],
  },
  {
    id: "prior-auth-cds",
    label: "Prior Auth Required",
    hookType: "order-sign",
    cards: [
      {
        summary: "Prior Authorization Required: Adalimumab (Humira)",
        detail:
          "The selected medication (Adalimumab 40mg injection) requires prior authorization from the patient's insurance plan (BlueCross BlueShield of Vermont). Estimated processing time: 3–5 business days. Ensure documentation includes: diagnosis code, prior treatment failures, and functional status assessment.",
        indicator: "warning" as const,
        source: { label: "BCBS VT Coverage Policies", url: "https://bcbsvt.com" },
        suggestions: [
          { label: "Initiate PA Request", uuid: "sug-12" },
          { label: "Request Peer-to-Peer Review", uuid: "sug-13" },
          { label: "Prescribe Formulary Alternative", uuid: "sug-14" },
        ],
      },
    ],
  },
];

const INSURANCE_PLANS = [
  "BlueCross BlueShield of Vermont",
  "MVP Health Care",
  "Medicaid — Vermont Health Access Plan",
  "Medicare Advantage (Humana)",
  "Cigna Commercial Plan",
];

const PA_SERVICES = [
  { code: "J0135", label: "Adalimumab (Humira) injection" },
  { code: "27447", label: "Total knee arthroplasty" },
  { code: "70553", label: "MRI brain with/without contrast" },
  { code: "J0129", label: "Abatacept (Orencia) injection" },
  { code: "43239", label: "EGD with biopsy" },
  { code: "J9999", label: "Chemotherapy — unclassified" },
  { code: "90837", label: "Psychotherapy, 60 min" },
  { code: "J0600", label: "Eculizumab (Soliris) injection" },
  { code: "22612", label: "Lumbar spinal fusion" },
  { code: "J2505", label: "Pegfilgrastim (Neulasta) injection" },
];

const PA_DECISIONS: ("approved" | "denied" | "pended")[] = ["approved", "denied", "pended"];

const COMPLIANCE_ITEMS = [
  { id: "c1", category: "Information Blocking", label: "TEFCA participation or good-faith onboarding initiated" },
  { id: "c2", category: "Information Blocking", label: "No practices that unreasonably restrict access to EHI" },
  { id: "c3", category: "Information Blocking", label: "Exceptions to information blocking properly documented" },
  { id: "c4", category: "FHIR APIs", label: "SMART on FHIR / OAuth 2.0 patient-access API implemented (R4)" },
  { id: "c5", category: "FHIR APIs", label: "Provider directory API available and public" },
  { id: "c6", category: "FHIR APIs", label: "Payer-to-payer data exchange API operational" },
  { id: "c7", category: "ONC HTI-1", label: "Predictive DSI transparency attestations complete" },
  { id: "c8", category: "ONC HTI-1", label: "USCDI v3 data classes supported in certified EHR" },
  { id: "c9", category: "ONC HTI-1", label: "Real-world testing plans submitted and executed" },
  { id: "c10", category: "21st Century Cures", label: "Patients can access their EHI at no cost" },
  { id: "c11", category: "21st Century Cures", label: "Electronic prior authorization implemented per HIPAA" },
  { id: "c12", category: "Prior Authorization", label: "Prior auth decisions returned within 72h (urgent) / 7 days (standard)" },
  { id: "c13", category: "Prior Authorization", label: "PA-specific FHIR APIs (CRD, DTR, PAS) implemented" },
  { id: "c14", category: "Interoperability", label: "HL7 Da Vinci implementation guides adopted" },
  { id: "c15", category: "Interoperability", label: "Bulk FHIR export (Group/$export) available for attributed populations" },
];

// ─────────────────────────────────────────────────────────────────────────────
// HELPER: syntax-color a FHIR JSON string
// ─────────────────────────────────────────────────────────────────────────────

function syntaxColorJson(json: string): string {
  return json
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(
      /("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+-]?\d+)?)/g,
      (match) => {
        let cls = "text-purple-300"; // number
        if (/^"/.test(match)) {
          if (/:$/.test(match)) {
            cls = "text-blue-300"; // key
          } else {
            cls = "text-green-300"; // string value
          }
        } else if (/true|false/.test(match)) {
          cls = "text-yellow-300";
        } else if (/null/.test(match)) {
          cls = "text-red-400";
        }
        return `<span class="${cls}">${match}</span>`;
      }
    );
}

// ─────────────────────────────────────────────────────────────────────────────
// TAB 1 — FHIR Resource Builder
// ─────────────────────────────────────────────────────────────────────────────

type ResourceType =
  | "Patient"
  | "Observation"
  | "Condition"
  | "Medication"
  | "Encounter"
  | "CarePlan"
  | "DiagnosticReport"
  | "Bundle";

function buildFhirResource(type: ResourceType, fields: Record<string, string>): object {
  const now = new Date().toISOString();
  switch (type) {
    case "Patient":
      return {
        resourceType: "Patient",
        id: fields.id || "example-patient",
        meta: { profile: ["http://hl7.org/fhir/us/core/StructureDefinition/us-core-patient"] },
        text: { status: "generated", div: "<div>Patient</div>" },
        name: [{ use: "official", family: fields.family || "", given: fields.given ? [fields.given] : [] }],
        gender: fields.gender || "unknown",
        birthDate: fields.dob || "",
        telecom: fields.phone ? [{ system: "phone", value: fields.phone, use: "home" }] : [],
      };
    case "Observation":
      return {
        resourceType: "Observation",
        id: `obs-${Date.now()}`,
        status: fields.status || "final",
        category: [
          {
            coding: [
              {
                system: "http://terminology.hl7.org/CodeSystem/observation-category",
                code: "vital-signs",
                display: "Vital Signs",
              },
            ],
          },
        ],
        code: {
          coding: [
            {
              system: "http://loinc.org",
              code: fields.loincCode || "",
              display: LOINC_CODES.find((l) => l.code === fields.loincCode)?.display || "",
            },
          ],
        },
        subject: { reference: `Patient/${fields.subject || ""}` },
        effectiveDateTime: now,
        valueQuantity: { value: parseFloat(fields.value) || 0, unit: fields.unit || "", system: "http://unitsofmeasure.org" },
      };
    case "Condition":
      return {
        resourceType: "Condition",
        id: `cond-${Date.now()}`,
        clinicalStatus: {
          coding: [
            {
              system: "http://terminology.hl7.org/CodeSystem/condition-clinical",
              code: fields.clinicalStatus || "active",
            },
          ],
        },
        code: {
          coding: [{ system: "http://hl7.org/fhir/sid/icd-10-cm", code: fields.icd10 || "", display: fields.conditionDisplay || "" }],
          text: fields.conditionDisplay || fields.icd10 || "",
        },
        subject: { reference: `Patient/${fields.subject || ""}` },
        onsetDateTime: fields.onset || "",
      };
    case "Medication":
      return {
        resourceType: "Medication",
        id: `med-${Date.now()}`,
        code: {
          coding: [
            {
              system: "http://www.nlm.nih.gov/research/umls/rxnorm",
              code: fields.rxnorm || "",
              display: fields.medName || "",
            },
          ],
          text: fields.medName || "",
        },
        status: fields.medStatus || "active",
        form: fields.form
          ? {
              coding: [{ system: "http://snomed.info/sct", display: fields.form }],
            }
          : undefined,
        ingredient: fields.ingredient
          ? [
              {
                itemCodeableConcept: { text: fields.ingredient },
                strength: { numerator: { value: parseFloat(fields.strength) || 0, unit: fields.strengthUnit || "mg" } },
              },
            ]
          : undefined,
      };
    case "Encounter":
      return {
        resourceType: "Encounter",
        id: `enc-${Date.now()}`,
        status: fields.encStatus || "finished",
        class: {
          system: "http://terminology.hl7.org/CodeSystem/v3-ActCode",
          code: fields.encClass || "AMB",
          display: fields.encClass === "IMP" ? "inpatient encounter" : "ambulatory",
        },
        type: [{ coding: [{ system: "http://snomed.info/sct", code: "11429006", display: "Consultation" }] }],
        subject: { reference: `Patient/${fields.subject || ""}` },
        period: {
          start: fields.encStart || now,
          end: fields.encEnd || now,
        },
        reasonCode: fields.reason ? [{ text: fields.reason }] : [],
      };
    case "CarePlan":
      return {
        resourceType: "CarePlan",
        id: `cp-${Date.now()}`,
        status: fields.cpStatus || "active",
        intent: "plan",
        title: fields.cpTitle || "Care Plan",
        description: fields.cpDesc || "",
        subject: { reference: `Patient/${fields.subject || ""}` },
        period: { start: now },
        goal: fields.cpGoal ? [{ reference: `Goal/goal-1`, display: fields.cpGoal }] : [],
        activity: fields.cpActivity
          ? [{ detail: { status: "not-started", description: fields.cpActivity } }]
          : [],
      };
    case "DiagnosticReport":
      return {
        resourceType: "DiagnosticReport",
        id: `dr-${Date.now()}`,
        status: fields.drStatus || "final",
        category: [
          {
            coding: [
              {
                system: "http://terminology.hl7.org/CodeSystem/v2-0074",
                code: "LAB",
                display: "Laboratory",
              },
            ],
          },
        ],
        code: { text: fields.drCode || "Laboratory Report" },
        subject: { reference: `Patient/${fields.subject || ""}` },
        effectiveDateTime: now,
        conclusion: fields.drConclusion || "",
        presentedForm: fields.drNarrative
          ? [{ contentType: "text/plain", data: btoa(fields.drNarrative) }]
          : [],
      };
    case "Bundle":
      return {
        resourceType: "Bundle",
        id: `bundle-${Date.now()}`,
        type: fields.bundleType || "collection",
        timestamp: now,
        total: parseInt(fields.bundleTotal) || 0,
        entry: [],
        meta: { lastUpdated: now },
      };
    default:
      return { resourceType: type };
  }
}

const RESOURCE_REQUIRED_FIELDS: Record<ResourceType, string[]> = {
  Patient: ["family", "given", "dob", "gender"],
  Observation: ["subject", "loincCode", "value", "unit"],
  Condition: ["subject", "icd10"],
  Medication: ["medName", "rxnorm"],
  Encounter: ["subject", "encStart"],
  CarePlan: ["subject", "cpTitle"],
  DiagnosticReport: ["subject", "drCode"],
  Bundle: ["bundleType"],
};

function BuilderTab() {
  const [resourceType, setResourceType] = useState<ResourceType>("Patient");
  const [fields, setFields] = useState<Record<string, string>>({});
  const [generated, setGenerated] = useState<string>("");
  const [copied, setCopied] = useState(false);

  const setField = useCallback((k: string, v: string) => setFields((f) => ({ ...f, [k]: v })), []);

  const requiredFields = RESOURCE_REQUIRED_FIELDS[resourceType];

  const validation = useMemo(() => {
    const missing = requiredFields.filter((f) => !fields[f]);
    return { valid: missing.length === 0, missing };
  }, [fields, requiredFields]);

  const generate = useCallback(() => {
    const resource = buildFhirResource(resourceType, fields);
    setGenerated(JSON.stringify(resource, null, 2));
  }, [resourceType, fields]);

  const copyToClipboard = useCallback(async () => {
    if (!generated) return;
    await navigator.clipboard.writeText(generated);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [generated]);

  const inputCls =
    "w-full rounded-lg border border-indigo-200 bg-white px-3 py-2 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-400";
  const selectCls =
    "w-full rounded-lg border border-indigo-200 bg-white px-3 py-2 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-400";
  const labelCls = "block text-xs font-medium text-indigo-700 mb-1";

  function renderFields() {
    switch (resourceType) {
      case "Patient":
        return (
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={labelCls}>Patient ID</label>
              <input className={inputCls} placeholder="patient-001" value={fields.id || ""} onChange={(e) => setField("id", e.target.value)} />
            </div>
            <div>
              <label className={labelCls}>Family Name *</label>
              <input className={inputCls} placeholder="Smith" value={fields.family || ""} onChange={(e) => setField("family", e.target.value)} />
            </div>
            <div>
              <label className={labelCls}>Given Name *</label>
              <input className={inputCls} placeholder="John" value={fields.given || ""} onChange={(e) => setField("given", e.target.value)} />
            </div>
            <div>
              <label className={labelCls}>Date of Birth *</label>
              <input type="date" className={inputCls} value={fields.dob || ""} onChange={(e) => setField("dob", e.target.value)} />
            </div>
            <div>
              <label className={labelCls}>Gender *</label>
              <select className={selectCls} value={fields.gender || ""} onChange={(e) => setField("gender", e.target.value)}>
                <option value="">Select gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
                <option value="unknown">Unknown</option>
              </select>
            </div>
            <div>
              <label className={labelCls}>Phone</label>
              <input className={inputCls} placeholder="555-555-5555" value={fields.phone || ""} onChange={(e) => setField("phone", e.target.value)} />
            </div>
          </div>
        );
      case "Observation":
        return (
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={labelCls}>Subject Patient ID *</label>
              <input className={inputCls} placeholder="patient-001" value={fields.subject || ""} onChange={(e) => setField("subject", e.target.value)} />
            </div>
            <div>
              <label className={labelCls}>LOINC Code *</label>
              <select className={selectCls} value={fields.loincCode || ""} onChange={(e) => setField("loincCode", e.target.value)}>
                <option value="">Select LOINC</option>
                {LOINC_CODES.map((l) => (
                  <option key={l.code} value={l.code}>{l.code} — {l.display}</option>
                ))}
              </select>
            </div>
            <div>
              <label className={labelCls}>Value *</label>
              <input className={inputCls} placeholder="120" value={fields.value || ""} onChange={(e) => setField("value", e.target.value)} />
            </div>
            <div>
              <label className={labelCls}>Unit *</label>
              <input className={inputCls} placeholder="mmHg" value={fields.unit || ""} onChange={(e) => setField("unit", e.target.value)} />
            </div>
            <div>
              <label className={labelCls}>Status</label>
              <select className={selectCls} value={fields.status || ""} onChange={(e) => setField("status", e.target.value)}>
                <option value="">Select status</option>
                <option value="final">final</option>
                <option value="preliminary">preliminary</option>
                <option value="amended">amended</option>
                <option value="entered-in-error">entered-in-error</option>
              </select>
            </div>
          </div>
        );
      case "Condition":
        return (
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={labelCls}>Subject Patient ID *</label>
              <input className={inputCls} placeholder="patient-001" value={fields.subject || ""} onChange={(e) => setField("subject", e.target.value)} />
            </div>
            <div>
              <label className={labelCls}>ICD-10 Code *</label>
              <input className={inputCls} placeholder="E11.9" value={fields.icd10 || ""} onChange={(e) => setField("icd10", e.target.value)} />
            </div>
            <div>
              <label className={labelCls}>Condition Display Name</label>
              <input className={inputCls} placeholder="Type 2 diabetes mellitus" value={fields.conditionDisplay || ""} onChange={(e) => setField("conditionDisplay", e.target.value)} />
            </div>
            <div>
              <label className={labelCls}>Onset Date</label>
              <input type="date" className={inputCls} value={fields.onset || ""} onChange={(e) => setField("onset", e.target.value)} />
            </div>
            <div>
              <label className={labelCls}>Clinical Status</label>
              <select className={selectCls} value={fields.clinicalStatus || ""} onChange={(e) => setField("clinicalStatus", e.target.value)}>
                <option value="">Select status</option>
                <option value="active">active</option>
                <option value="recurrence">recurrence</option>
                <option value="relapse">relapse</option>
                <option value="inactive">inactive</option>
                <option value="remission">remission</option>
                <option value="resolved">resolved</option>
              </select>
            </div>
          </div>
        );
      case "Medication":
        return (
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={labelCls}>Medication Name *</label>
              <input className={inputCls} placeholder="Metformin" value={fields.medName || ""} onChange={(e) => setField("medName", e.target.value)} />
            </div>
            <div>
              <label className={labelCls}>RxNorm Code *</label>
              <input className={inputCls} placeholder="861007" value={fields.rxnorm || ""} onChange={(e) => setField("rxnorm", e.target.value)} />
            </div>
            <div>
              <label className={labelCls}>Form</label>
              <input className={inputCls} placeholder="Tablet" value={fields.form || ""} onChange={(e) => setField("form", e.target.value)} />
            </div>
            <div>
              <label className={labelCls}>Status</label>
              <select className={selectCls} value={fields.medStatus || ""} onChange={(e) => setField("medStatus", e.target.value)}>
                <option value="active">active</option>
                <option value="inactive">inactive</option>
                <option value="entered-in-error">entered-in-error</option>
              </select>
            </div>
            <div>
              <label className={labelCls}>Active Ingredient</label>
              <input className={inputCls} placeholder="Metformin hydrochloride" value={fields.ingredient || ""} onChange={(e) => setField("ingredient", e.target.value)} />
            </div>
            <div className="flex gap-2">
              <div className="flex-1">
                <label className={labelCls}>Strength</label>
                <input className={inputCls} placeholder="500" value={fields.strength || ""} onChange={(e) => setField("strength", e.target.value)} />
              </div>
              <div className="w-24">
                <label className={labelCls}>Unit</label>
                <input className={inputCls} placeholder="mg" value={fields.strengthUnit || ""} onChange={(e) => setField("strengthUnit", e.target.value)} />
              </div>
            </div>
          </div>
        );
      case "Encounter":
        return (
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={labelCls}>Subject Patient ID *</label>
              <input className={inputCls} placeholder="patient-001" value={fields.subject || ""} onChange={(e) => setField("subject", e.target.value)} />
            </div>
            <div>
              <label className={labelCls}>Class</label>
              <select className={selectCls} value={fields.encClass || ""} onChange={(e) => setField("encClass", e.target.value)}>
                <option value="AMB">AMB — Ambulatory</option>
                <option value="IMP">IMP — Inpatient</option>
                <option value="EMER">EMER — Emergency</option>
                <option value="VR">VR — Virtual</option>
              </select>
            </div>
            <div>
              <label className={labelCls}>Start *</label>
              <input type="datetime-local" className={inputCls} value={fields.encStart || ""} onChange={(e) => setField("encStart", e.target.value)} />
            </div>
            <div>
              <label className={labelCls}>End</label>
              <input type="datetime-local" className={inputCls} value={fields.encEnd || ""} onChange={(e) => setField("encEnd", e.target.value)} />
            </div>
            <div>
              <label className={labelCls}>Status</label>
              <select className={selectCls} value={fields.encStatus || ""} onChange={(e) => setField("encStatus", e.target.value)}>
                <option value="finished">finished</option>
                <option value="in-progress">in-progress</option>
                <option value="planned">planned</option>
                <option value="cancelled">cancelled</option>
              </select>
            </div>
            <div>
              <label className={labelCls}>Reason</label>
              <input className={inputCls} placeholder="Annual wellness visit" value={fields.reason || ""} onChange={(e) => setField("reason", e.target.value)} />
            </div>
          </div>
        );
      case "CarePlan":
        return (
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={labelCls}>Subject Patient ID *</label>
              <input className={inputCls} placeholder="patient-001" value={fields.subject || ""} onChange={(e) => setField("subject", e.target.value)} />
            </div>
            <div>
              <label className={labelCls}>Plan Title *</label>
              <input className={inputCls} placeholder="Diabetes Management Plan" value={fields.cpTitle || ""} onChange={(e) => setField("cpTitle", e.target.value)} />
            </div>
            <div className="col-span-2">
              <label className={labelCls}>Description</label>
              <textarea className={inputCls + " resize-none"} rows={2} placeholder="Comprehensive care plan for..." value={fields.cpDesc || ""} onChange={(e) => setField("cpDesc", e.target.value)} />
            </div>
            <div>
              <label className={labelCls}>Goal</label>
              <input className={inputCls} placeholder="HbA1c < 7.0% within 6 months" value={fields.cpGoal || ""} onChange={(e) => setField("cpGoal", e.target.value)} />
            </div>
            <div>
              <label className={labelCls}>Activity</label>
              <input className={inputCls} placeholder="Monthly endocrinology follow-up" value={fields.cpActivity || ""} onChange={(e) => setField("cpActivity", e.target.value)} />
            </div>
            <div>
              <label className={labelCls}>Status</label>
              <select className={selectCls} value={fields.cpStatus || ""} onChange={(e) => setField("cpStatus", e.target.value)}>
                <option value="active">active</option>
                <option value="draft">draft</option>
                <option value="completed">completed</option>
                <option value="revoked">revoked</option>
              </select>
            </div>
          </div>
        );
      case "DiagnosticReport":
        return (
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={labelCls}>Subject Patient ID *</label>
              <input className={inputCls} placeholder="patient-001" value={fields.subject || ""} onChange={(e) => setField("subject", e.target.value)} />
            </div>
            <div>
              <label className={labelCls}>Report Code *</label>
              <input className={inputCls} placeholder="Basic Metabolic Panel" value={fields.drCode || ""} onChange={(e) => setField("drCode", e.target.value)} />
            </div>
            <div>
              <label className={labelCls}>Status</label>
              <select className={selectCls} value={fields.drStatus || ""} onChange={(e) => setField("drStatus", e.target.value)}>
                <option value="final">final</option>
                <option value="preliminary">preliminary</option>
                <option value="amended">amended</option>
              </select>
            </div>
            <div>
              <label className={labelCls}>Conclusion</label>
              <input className={inputCls} placeholder="Results within normal limits" value={fields.drConclusion || ""} onChange={(e) => setField("drConclusion", e.target.value)} />
            </div>
            <div className="col-span-2">
              <label className={labelCls}>Narrative</label>
              <textarea className={inputCls + " resize-none"} rows={2} placeholder="Detailed narrative text..." value={fields.drNarrative || ""} onChange={(e) => setField("drNarrative", e.target.value)} />
            </div>
          </div>
        );
      case "Bundle":
        return (
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={labelCls}>Bundle Type *</label>
              <select className={selectCls} value={fields.bundleType || ""} onChange={(e) => setField("bundleType", e.target.value)}>
                <option value="">Select type</option>
                <option value="collection">collection</option>
                <option value="searchset">searchset</option>
                <option value="transaction">transaction</option>
                <option value="batch">batch</option>
                <option value="document">document</option>
                <option value="message">message</option>
              </select>
            </div>
            <div>
              <label className={labelCls}>Total Entries</label>
              <input type="number" className={inputCls} placeholder="0" value={fields.bundleTotal || ""} onChange={(e) => setField("bundleTotal", e.target.value)} />
            </div>
          </div>
        );
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <div className="flex-1">
          <label className="block text-sm font-medium text-indigo-700 mb-1">FHIR Resource Type</label>
          <select
            className="rounded-lg border border-indigo-300 bg-white px-3 py-2 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            value={resourceType}
            onChange={(e) => { setResourceType(e.target.value as ResourceType); setFields({}); setGenerated(""); }}
          >
            {(["Patient", "Observation", "Condition", "Medication", "Encounter", "CarePlan", "DiagnosticReport", "Bundle"] as ResourceType[]).map((r) => (
              <option key={r} value={r}>{r}</option>
            ))}
          </select>
        </div>
        <div className="flex items-center gap-2 mt-5">
          {validation.valid ? (
            <span className="flex items-center gap-1 text-sm text-green-600 font-medium">
              <CheckCircle className="w-4 h-4" /> All required fields filled
            </span>
          ) : (
            <span className="flex items-center gap-1 text-sm text-red-500 font-medium">
              <XCircle className="w-4 h-4" /> Missing: {validation.missing.join(", ")}
            </span>
          )}
        </div>
      </div>

      <div className="bg-indigo-50 border border-indigo-100 rounded-xl p-5">
        {renderFields()}
      </div>

      <div className="flex gap-3">
        <button
          onClick={generate}
          className="flex items-center gap-2 rounded-lg bg-indigo-600 px-5 py-2 text-sm font-semibold text-white hover:bg-indigo-700 transition-colors"
        >
          <FileText className="w-4 h-4" /> Generate JSON
        </button>
        {generated && (
          <button
            onClick={copyToClipboard}
            className="flex items-center gap-2 rounded-lg border border-indigo-300 px-4 py-2 text-sm font-medium text-indigo-700 hover:bg-indigo-50 transition-colors"
          >
            {copied ? <CheckCircle className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
            {copied ? "Copied!" : "Copy"}
          </button>
        )}
      </div>

      {generated && (
        <div className="relative rounded-xl overflow-hidden border border-gray-700">
          <div className="flex items-center justify-between bg-gray-800 px-4 py-2">
            <span className="text-xs font-mono text-gray-400">FHIR R4 — {resourceType}</span>
            <span className="text-xs text-indigo-400">application/fhir+json</span>
          </div>
          <div className="overflow-auto max-h-96 bg-gray-900 p-4">
            <pre
              className="text-xs font-mono leading-relaxed"
              dangerouslySetInnerHTML={{ __html: syntaxColorJson(generated) }}
            />
          </div>
        </div>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// TAB 2 — Terminology Mapper
// ─────────────────────────────────────────────────────────────────────────────

type SourceTerminology = "ICD-10" | "SNOMED CT" | "LOINC" | "RxNorm" | "CPT";
type TargetTerminology = "FHIR CodeableConcept" | "ICD-10" | "SNOMED CT" | "LOINC";

const SYSTEM_URLS: Record<string, string> = {
  "ICD-10": "http://hl7.org/fhir/sid/icd-10-cm",
  "SNOMED CT": "http://snomed.info/sct",
  LOINC: "http://loinc.org",
  RxNorm: "http://www.nlm.nih.gov/research/umls/rxnorm",
  CPT: "http://www.ama-assn.org/go/cpt",
};

function MapperTab() {
  const [searchTerm, setSearchTerm] = useState("");
  const [source, setSource] = useState<SourceTerminology>("ICD-10");
  const [target, setTarget] = useState<TargetTerminology>("SNOMED CT");

  const results = useMemo(() => {
    if (!searchTerm.trim()) return TERMINOLOGY_MAPPINGS;
    const q = searchTerm.toLowerCase();
    return TERMINOLOGY_MAPPINGS.filter(
      (m) =>
        m.term.toLowerCase().includes(q) ||
        m.icd10.code.toLowerCase().includes(q) ||
        m.icd10.display.toLowerCase().includes(q) ||
        m.snomed.code.includes(q)
    );
  }, [searchTerm]);

  function getTargetData(mapping: (typeof TERMINOLOGY_MAPPINGS)[0]) {
    switch (target) {
      case "FHIR CodeableConcept":
        return {
          code: mapping.icd10.code,
          display: mapping.icd10.display,
          system: SYSTEM_URLS["ICD-10"],
          extra: `{ "coding": [{ "system": "${SYSTEM_URLS["ICD-10"]}", "code": "${mapping.icd10.code}", "display": "${mapping.icd10.display}" }] }`,
        };
      case "ICD-10":
        return { code: mapping.icd10.code, display: mapping.icd10.display, system: SYSTEM_URLS["ICD-10"] };
      case "SNOMED CT":
        return { code: mapping.snomed.code, display: mapping.snomed.display, system: SYSTEM_URLS["SNOMED CT"] };
      case "LOINC":
        return mapping.loinc
          ? { code: mapping.loinc.code, display: mapping.loinc.display, system: SYSTEM_URLS.LOINC }
          : null;
    }
  }

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-3 gap-4">
        <div>
          <label className="block text-xs font-medium text-indigo-700 mb-1">Search Term or Code</label>
          <div className="relative">
            <Search className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
            <input
              className="w-full rounded-lg border border-indigo-200 bg-white pl-9 pr-3 py-2 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-400"
              placeholder="diabetes, I10, sepsis…"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        <div>
          <label className="block text-xs font-medium text-indigo-700 mb-1">Source Terminology</label>
          <select
            className="w-full rounded-lg border border-indigo-200 bg-white px-3 py-2 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            value={source}
            onChange={(e) => setSource(e.target.value as SourceTerminology)}
          >
            {(["ICD-10", "SNOMED CT", "LOINC", "RxNorm", "CPT"] as SourceTerminology[]).map((s) => (
              <option key={s}>{s}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-xs font-medium text-indigo-700 mb-1">Target Terminology</label>
          <select
            className="w-full rounded-lg border border-indigo-200 bg-white px-3 py-2 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            value={target}
            onChange={(e) => setTarget(e.target.value as TargetTerminology)}
          >
            {(["FHIR CodeableConcept", "ICD-10", "SNOMED CT", "LOINC"] as TargetTerminology[]).map((t) => (
              <option key={t}>{t}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="text-xs text-gray-500 flex items-center gap-2">
        <Info className="w-3.5 h-3.5 text-indigo-400" />
        Showing {results.length} of {TERMINOLOGY_MAPPINGS.length} mappings
        {source !== "ICD-10" && (
          <span className="ml-1 text-amber-600">(Source column shown as ICD-10 for demonstration; {source} mappings apply equivalent concept codes)</span>
        )}
      </div>

      {results.length === 0 ? (
        <div className="rounded-xl border border-amber-200 bg-amber-50 p-6 text-center">
          <AlertTriangle className="w-8 h-8 text-amber-500 mx-auto mb-2" />
          <p className="font-medium text-amber-800">No exact match found</p>
          <p className="text-sm text-amber-600 mt-1">Try searching for related terms or a broader code range. Consider browsing UMLS or NLM Value Set Authority Center.</p>
          <div className="mt-3 text-left inline-block">
            <p className="text-xs text-amber-700 font-medium mb-1">Closest approximations to try:</p>
            <ul className="text-xs text-amber-600 list-disc list-inside space-y-0.5">
              <li>Review parent concept codes in the code system hierarchy</li>
              <li>Search NLM VSAC for applicable value sets</li>
              <li>Consult SNOMED CT browser for synonyms</li>
            </ul>
          </div>
        </div>
      ) : (
        <div className="overflow-auto rounded-xl border border-indigo-100">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-indigo-50 text-indigo-700">
                <th className="px-4 py-3 text-left font-semibold text-xs uppercase tracking-wide">Clinical Term</th>
                <th className="px-4 py-3 text-left font-semibold text-xs uppercase tracking-wide">Source Code</th>
                <th className="px-4 py-3 text-left font-semibold text-xs uppercase tracking-wide">→ Target Code</th>
                <th className="px-4 py-3 text-left font-semibold text-xs uppercase tracking-wide">Display Name</th>
                <th className="px-4 py-3 text-left font-semibold text-xs uppercase tracking-wide">System URL</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-indigo-50">
              {results.map((m) => {
                const td = getTargetData(m);
                return (
                  <tr key={m.term} className="hover:bg-indigo-50/40 transition-colors">
                    <td className="px-4 py-3 font-medium text-gray-800">{m.term}</td>
                    <td className="px-4 py-3">
                      <span className="font-mono text-xs bg-gray-100 text-gray-700 px-2 py-0.5 rounded">{m.icd10.code}</span>
                    </td>
                    <td className="px-4 py-3">
                      {td ? (
                        <span className="font-mono text-xs bg-indigo-100 text-indigo-800 px-2 py-0.5 rounded">{td.code}</span>
                      ) : (
                        <span className="text-xs text-gray-400 italic">No LOINC mapping</span>
                      )}
                    </td>
                    <td className="px-4 py-3 text-xs text-gray-600 max-w-xs truncate">
                      {td ? td.display : "—"}
                    </td>
                    <td className="px-4 py-3 text-xs text-indigo-500 font-mono truncate max-w-xs">
                      {td ? td.system : "—"}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// TAB 3 — CDS Hooks Simulator
// ─────────────────────────────────────────────────────────────────────────────

type HookType = "patient-view" | "order-select" | "order-sign" | "appointment-book";

function CDSTab() {
  const [hookType, setHookType] = useState<HookType>("patient-view");
  const [patientId, setPatientId] = useState("pt-12345");
  const [userRole, setUserRole] = useState("physician");
  const [encounterId, setEncounterId] = useState("enc-67890");
  const [scenarioId, setScenarioId] = useState("preventive-gap");
  const [firedCards, setFiredCards] = useState<(typeof CDS_SCENARIOS)[0]["cards"] | null>(null);
  const [showPayload, setShowPayload] = useState(false);
  const [firing, setFiring] = useState(false);
  const [activeSuggestion, setActiveSuggestion] = useState<string | null>(null);

  const scenario = useMemo(() => CDS_SCENARIOS.find((s) => s.id === scenarioId), [scenarioId]);

  const payload = useMemo(
    () =>
      JSON.stringify(
        {
          hookInstance: `${Date.now()}`,
          hook: hookType,
          fhirServer: "https://fhir.vtmedical.org/r4",
          context: {
            userId: `Practitioner/pract-${userRole}-001`,
            patientId,
            encounterId,
          },
          prefetch: {
            patient: { resourceType: "Patient", id: patientId },
          },
        },
        null,
        2
      ),
    [hookType, patientId, userRole, encounterId]
  );

  const fireHook = useCallback(async () => {
    setFiring(true);
    setFiredCards(null);
    setActiveSuggestion(null);
    await new Promise((r) => setTimeout(r, 900));
    setFiredCards(scenario?.cards ?? []);
    setFiring(false);
  }, [scenario]);

  const indicatorConfig = {
    info: { color: "bg-blue-50 border-blue-200", badge: "bg-blue-100 text-blue-700", icon: <Info className="w-4 h-4 text-blue-500" />, label: "info" },
    warning: { color: "bg-amber-50 border-amber-200", badge: "bg-amber-100 text-amber-700", icon: <AlertTriangle className="w-4 h-4 text-amber-500" />, label: "warning" },
    critical: { color: "bg-red-50 border-red-200", badge: "bg-red-100 text-red-700", icon: <XCircle className="w-4 h-4 text-red-500" />, label: "critical" },
  };

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-medium text-indigo-700 mb-1">Hook Type</label>
          <select
            className="w-full rounded-lg border border-indigo-200 bg-white px-3 py-2 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            value={hookType}
            onChange={(e) => setHookType(e.target.value as HookType)}
          >
            {(["patient-view", "order-select", "order-sign", "appointment-book"] as HookType[]).map((h) => (
              <option key={h}>{h}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-xs font-medium text-indigo-700 mb-1">Scenario</label>
          <select
            className="w-full rounded-lg border border-indigo-200 bg-white px-3 py-2 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            value={scenarioId}
            onChange={(e) => { setScenarioId(e.target.value); setFiredCards(null); }}
          >
            {CDS_SCENARIOS.map((s) => (
              <option key={s.id} value={s.id}>{s.label}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-xs font-medium text-indigo-700 mb-1">Patient ID</label>
          <input
            className="w-full rounded-lg border border-indigo-200 bg-white px-3 py-2 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            value={patientId}
            onChange={(e) => setPatientId(e.target.value)}
          />
        </div>
        <div>
          <label className="block text-xs font-medium text-indigo-700 mb-1">User Role</label>
          <select
            className="w-full rounded-lg border border-indigo-200 bg-white px-3 py-2 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            value={userRole}
            onChange={(e) => setUserRole(e.target.value)}
          >
            <option value="physician">Physician</option>
            <option value="nurse">Nurse</option>
            <option value="pharmacist">Pharmacist</option>
            <option value="admin">Clinical Admin</option>
          </select>
        </div>
        <div>
          <label className="block text-xs font-medium text-indigo-700 mb-1">Encounter ID</label>
          <input
            className="w-full rounded-lg border border-indigo-200 bg-white px-3 py-2 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            value={encounterId}
            onChange={(e) => setEncounterId(e.target.value)}
          />
        </div>
      </div>

      <div className="flex gap-3 items-center">
        <button
          onClick={fireHook}
          disabled={firing}
          className="flex items-center gap-2 rounded-lg bg-indigo-600 px-5 py-2 text-sm font-semibold text-white hover:bg-indigo-700 disabled:opacity-60 transition-colors"
        >
          <Zap className="w-4 h-4" />
          {firing ? "Firing Hook…" : "Fire Hook"}
        </button>
        <button
          onClick={() => setShowPayload((v) => !v)}
          className="flex items-center gap-2 rounded-lg border border-indigo-200 px-4 py-2 text-sm text-indigo-700 hover:bg-indigo-50 transition-colors"
        >
          {showPayload ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
          {showPayload ? "Hide" : "Show"} Request Payload
        </button>
      </div>

      {showPayload && (
        <div className="rounded-xl overflow-hidden border border-gray-700">
          <div className="bg-gray-800 px-4 py-2 text-xs font-mono text-gray-400">CDS Hooks Request Payload</div>
          <div className="overflow-auto max-h-60 bg-gray-900 p-4">
            <pre className="text-xs font-mono leading-relaxed" dangerouslySetInnerHTML={{ __html: syntaxColorJson(payload) }} />
          </div>
        </div>
      )}

      {firing && (
        <div className="flex items-center gap-3 rounded-xl border border-indigo-200 bg-indigo-50 p-4">
          <div className="w-5 h-5 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin" />
          <span className="text-sm text-indigo-700">Sending hook to CDS service…</span>
        </div>
      )}

      {firedCards && (
        <div className="space-y-4">
          <p className="text-xs font-semibold text-indigo-600 uppercase tracking-wide">CDS Cards Response ({firedCards.length} card{firedCards.length !== 1 ? "s" : ""})</p>
          {firedCards.map((card, i) => {
            const cfg = indicatorConfig[card.indicator];
            return (
              <div key={i} className={`rounded-xl border p-5 ${cfg.color}`}>
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="flex items-start gap-2">
                    {cfg.icon}
                    <p className="font-semibold text-gray-800 text-sm">{card.summary}</p>
                  </div>
                  <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${cfg.badge}`}>{cfg.label}</span>
                </div>
                <p className="text-sm text-gray-600 mb-4 leading-relaxed">{card.detail}</p>
                <div className="flex flex-wrap gap-2">
                  {card.suggestions.map((sug) => (
                    <button
                      key={sug.uuid}
                      onClick={() => setActiveSuggestion(sug.uuid)}
                      className={`text-xs rounded-lg px-3 py-1.5 border font-medium transition-colors ${
                        activeSuggestion === sug.uuid
                          ? "bg-indigo-600 text-white border-indigo-600"
                          : "bg-white border-gray-300 text-gray-700 hover:bg-indigo-50 hover:border-indigo-300"
                      }`}
                    >
                      {activeSuggestion === sug.uuid && <CheckCircle className="w-3 h-3 inline mr-1" />}
                      {sug.label}
                    </button>
                  ))}
                </div>
                <p className="mt-3 text-xs text-gray-400">Source: {card.source.label}</p>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// TAB 4 — Prior Auth Workflow
// ─────────────────────────────────────────────────────────────────────────────

type PAStatus = "idle" | "submitted" | "processing" | "decided";
type PADecision = "approved" | "denied" | "pended";

const PA_STEPS: { key: PAStatus; label: string }[] = [
  { key: "submitted", label: "Submitted" },
  { key: "processing", label: "Processing" },
  { key: "decided", label: "Decision" },
];

function PriorAuthTab() {
  const [plan, setPlan] = useState(INSURANCE_PLANS[0]);
  const [service, setService] = useState(PA_SERVICES[0].code);
  const [diagnosis, setDiagnosis] = useState("M79.3");
  const [serviceDate, setServiceDate] = useState("");
  const [npi, setNpi] = useState("1234567890");
  const [status, setStatus] = useState<PAStatus>("idle");
  const [decision, setDecision] = useState<PADecision | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const selectedService = PA_SERVICES.find((s) => s.code === service);

  const submit = useCallback(async () => {
    setSubmitting(true);
    setStatus("submitted");
    setDecision(null);
    await new Promise((r) => setTimeout(r, 1000));
    setStatus("processing");
    await new Promise((r) => setTimeout(r, 1500));
    setStatus("decided");
    const dec = PA_DECISIONS[Math.floor(Math.random() * PA_DECISIONS.length)];
    setDecision(dec);
    setSubmitting(false);
  }, []);

  const stepIndex = PA_STEPS.findIndex((s) => s.key === status);

  const decisionConfig = {
    approved: {
      color: "bg-green-50 border-green-300",
      badge: "bg-green-100 text-green-800",
      title: "Prior Authorization Approved",
      body: "The requested service has been approved. Authorization number: PA-2026-" + Math.floor(10000 + Math.random() * 90000) + ". Authorization is valid for 90 days from today. Please include this authorization number on all claims submitted for this service.",
    },
    denied: {
      color: "bg-red-50 border-red-300",
      badge: "bg-red-100 text-red-800",
      title: "Prior Authorization Denied",
      body: "The requested service does not meet medical necessity criteria per plan coverage guidelines (Clinical Policy: CP-2024-MSK). You have the right to appeal this decision within 60 days. To initiate an appeal, submit a written request with supporting clinical documentation to the Appeals Department. You may also request a peer-to-peer review with the medical director.",
    },
    pended: {
      color: "bg-amber-50 border-amber-300",
      badge: "bg-amber-100 text-amber-800",
      title: "Pended — Additional Information Required",
      body: "Your request is pending review. Additional clinical documentation is required: (1) Operative report if prior surgery performed, (2) Functional status assessment using a standardized tool (e.g., KOOS, HOOS), (3) Documented failure of at least 6 weeks of conservative therapy. Please submit documents within 14 days to avoid auto-denial.",
    },
  };

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-medium text-indigo-700 mb-1">Insurance Plan</label>
          <select
            className="w-full rounded-lg border border-indigo-200 bg-white px-3 py-2 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            value={plan}
            onChange={(e) => setPlan(e.target.value)}
          >
            {INSURANCE_PLANS.map((p) => <option key={p}>{p}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-xs font-medium text-indigo-700 mb-1">Procedure / Service</label>
          <select
            className="w-full rounded-lg border border-indigo-200 bg-white px-3 py-2 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            value={service}
            onChange={(e) => setService(e.target.value)}
          >
            {PA_SERVICES.map((s) => <option key={s.code} value={s.code}>{s.code} — {s.label}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-xs font-medium text-indigo-700 mb-1">Primary Diagnosis (ICD-10)</label>
          <input
            className="w-full rounded-lg border border-indigo-200 bg-white px-3 py-2 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            value={diagnosis}
            onChange={(e) => setDiagnosis(e.target.value)}
          />
        </div>
        <div>
          <label className="block text-xs font-medium text-indigo-700 mb-1">Requested Service Date</label>
          <input
            type="date"
            className="w-full rounded-lg border border-indigo-200 bg-white px-3 py-2 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            value={serviceDate}
            onChange={(e) => setServiceDate(e.target.value)}
          />
        </div>
        <div>
          <label className="block text-xs font-medium text-indigo-700 mb-1">Ordering Provider NPI</label>
          <input
            className="w-full rounded-lg border border-indigo-200 bg-white px-3 py-2 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            value={npi}
            onChange={(e) => setNpi(e.target.value)}
          />
        </div>
      </div>

      <button
        onClick={submit}
        disabled={submitting}
        className="flex items-center gap-2 rounded-lg bg-indigo-600 px-5 py-2 text-sm font-semibold text-white hover:bg-indigo-700 disabled:opacity-60 transition-colors"
      >
        <ClipboardList className="w-4 h-4" />
        {submitting ? "Processing…" : "Submit PA Request"}
      </button>

      {status !== "idle" && (
        <div className="space-y-6">
          {/* Timeline */}
          <div className="relative flex items-center justify-between mt-2">
            <div className="absolute left-0 right-0 top-4 h-0.5 bg-gray-200 z-0" />
            <div
              className="absolute left-0 top-4 h-0.5 bg-indigo-500 z-0 transition-all duration-700"
              style={{ width: status === "submitted" ? "0%" : status === "processing" ? "50%" : "100%" }}
            />
            {PA_STEPS.map((step, i) => {
              const active = i <= stepIndex;
              const current = i === stepIndex;
              return (
                <div key={step.key} className="relative z-10 flex flex-col items-center">
                  <div
                    className={`w-9 h-9 rounded-full border-2 flex items-center justify-center transition-all duration-500 ${
                      active
                        ? "border-indigo-500 bg-indigo-500 text-white"
                        : "border-gray-300 bg-white text-gray-400"
                    } ${current && submitting ? "animate-pulse" : ""}`}
                  >
                    {active && !current ? (
                      <CheckCircle className="w-4 h-4" />
                    ) : (
                      <span className="text-xs font-bold">{i + 1}</span>
                    )}
                  </div>
                  <span className={`mt-2 text-xs font-medium ${active ? "text-indigo-700" : "text-gray-400"}`}>
                    {step.label}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Summary row */}
          <div className="rounded-xl border border-indigo-100 bg-indigo-50 p-4 grid grid-cols-3 gap-3 text-sm">
            <div><span className="text-xs text-gray-500">Plan</span><p className="font-medium text-gray-800 truncate">{plan}</p></div>
            <div><span className="text-xs text-gray-500">Service</span><p className="font-medium text-gray-800">{selectedService?.code} — {selectedService?.label}</p></div>
            <div><span className="text-xs text-gray-500">NPI</span><p className="font-mono font-medium text-gray-800">{npi}</p></div>
          </div>

          {/* Decision */}
          {status === "decided" && decision && (
            <div className={`rounded-xl border p-5 ${decisionConfig[decision].color}`}>
              <div className="flex items-center justify-between mb-3">
                <p className="font-bold text-gray-800">{decisionConfig[decision].title}</p>
                <span className={`text-xs font-semibold px-3 py-1 rounded-full uppercase ${decisionConfig[decision].badge}`}>
                  {decision}
                </span>
              </div>
              <p className="text-sm text-gray-700 leading-relaxed">{decisionConfig[decision].body}</p>
              {decision === "denied" && (
                <div className="mt-4 flex gap-2">
                  <button className="text-xs rounded-lg px-3 py-1.5 bg-white border border-red-300 text-red-700 font-medium hover:bg-red-50">
                    Initiate Appeal
                  </button>
                  <button className="text-xs rounded-lg px-3 py-1.5 bg-white border border-gray-300 text-gray-700 font-medium hover:bg-gray-50">
                    Request P2P Review
                  </button>
                </div>
              )}
              {decision === "pended" && (
                <button className="mt-4 text-xs rounded-lg px-3 py-1.5 bg-amber-600 text-white font-medium hover:bg-amber-700">
                  Upload Additional Documents
                </button>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// TAB 5 — Interoperability Compliance Checker
// ─────────────────────────────────────────────────────────────────────────────

function ComplianceTab() {
  const [checks, setChecks] = useState<Record<string, boolean>>(() =>
    Object.fromEntries(COMPLIANCE_ITEMS.map((c) => [c.id, false]))
  );
  const [reportGenerated, setReportGenerated] = useState(false);

  const toggle = useCallback((id: string) => {
    setChecks((prev) => ({ ...prev, [id]: !prev[id] }));
    setReportGenerated(false);
  }, []);

  const compliantCount = useMemo(() => Object.values(checks).filter(Boolean).length, [checks]);
  const total = COMPLIANCE_ITEMS.length;
  const score = Math.round((compliantCount / total) * 100);

  const scoreColor =
    score >= 90 ? "text-green-600" : score >= 70 ? "text-amber-600" : "text-red-600";
  const barColor =
    score >= 90 ? "bg-green-500" : score >= 70 ? "bg-amber-500" : "bg-red-500";
  const statusLabel =
    score >= 90 ? "Compliant" : score >= 70 ? "Partially Compliant" : "Non-Compliant";
  const statusBadge =
    score >= 90
      ? "bg-green-100 text-green-800"
      : score >= 70
      ? "bg-amber-100 text-amber-800"
      : "bg-red-100 text-red-800";

  const categories = useMemo(() => {
    const cats: Record<string, { total: number; compliant: number }> = {};
    COMPLIANCE_ITEMS.forEach((item) => {
      if (!cats[item.category]) cats[item.category] = { total: 0, compliant: 0 };
      cats[item.category].total++;
      if (checks[item.id]) cats[item.category].compliant++;
    });
    return cats;
  }, [checks]);

  const gaps = COMPLIANCE_ITEMS.filter((c) => !checks[c.id]);

  const recommendations: Record<string, string> = {
    c1: "Register with TEFCA at sequoiaproject.org and initiate QHIN onboarding",
    c2: "Conduct information blocking risk assessment and document policies",
    c3: "Review ONC Cures Rule exceptions (privacy, security, infeasibility, etc.)",
    c4: "Implement SMART on FHIR with HL7 FHIR R4 patient-access API",
    c5: "Publish FHIR R4 provider directory endpoint per NPPES standards",
    c6: "Implement payer-to-payer exchange per CMS Interoperability Rule §156.221",
    c7: "Complete DSI transparency attestations for all AI/ML clinical tools",
    c8: "Upgrade certified EHR to support all USCDI v3 data elements",
    c9: "Submit and execute real-world testing plans per ONC §170.315(g)(3)",
    c10: "Remove cost barriers for patients accessing their EHI",
    c11: "Implement X12 278 electronic PA transactions per HIPAA",
    c12: "Configure PA decision workflows to meet CMS timing requirements",
    c13: "Implement Da Vinci CRD, DTR, and PAS FHIR implementation guides",
    c14: "Adopt relevant HL7 Da Vinci IGs for your use case",
    c15: "Implement Bulk FHIR API ($export) for population-level data access",
  };

  return (
    <div className="space-y-5">
      {/* Score Panel */}
      <div className="rounded-xl border border-indigo-100 bg-gradient-to-r from-indigo-50 to-blue-50 p-5 flex items-center gap-6">
        <div className="text-center min-w-24">
          <p className={`text-5xl font-bold ${scoreColor}`}>{score}<span className="text-2xl">%</span></p>
          <p className="text-xs text-gray-500 mt-1">Compliance Score</p>
        </div>
        <div className="flex-1 space-y-2">
          <div className="flex items-center justify-between mb-1">
            <span className="text-sm font-medium text-gray-700">{compliantCount} of {total} requirements met</span>
            <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${statusBadge}`}>{statusLabel}</span>
          </div>
          <div className="h-3 w-full bg-gray-200 rounded-full overflow-hidden">
            <div
              className={`h-full rounded-full transition-all duration-500 ${barColor}`}
              style={{ width: `${score}%` }}
            />
          </div>
          <div className="grid grid-cols-3 gap-2 mt-3">
            {Object.entries(categories).map(([cat, data]) => (
              <div key={cat} className="text-xs bg-white rounded-lg px-2 py-1.5 border border-indigo-100">
                <p className="font-medium text-gray-700 truncate">{cat}</p>
                <p className={`font-bold ${data.compliant === data.total ? "text-green-600" : data.compliant > 0 ? "text-amber-600" : "text-red-500"}`}>
                  {data.compliant}/{data.total}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Checklist */}
      <div className="space-y-2">
        {COMPLIANCE_ITEMS.map((item) => (
          <div
            key={item.id}
            className={`flex items-center gap-3 rounded-xl border px-4 py-3 transition-colors ${
              checks[item.id] ? "border-green-200 bg-green-50" : "border-gray-200 bg-white"
            }`}
          >
            <button
              onClick={() => toggle(item.id)}
              className="flex-shrink-0 transition-colors"
              aria-label={checks[item.id] ? "Mark non-compliant" : "Mark compliant"}
            >
              {checks[item.id] ? (
                <ToggleRight className="w-7 h-7 text-green-500" />
              ) : (
                <ToggleLeft className="w-7 h-7 text-gray-400" />
              )}
            </button>
            <div className="flex-1 min-w-0">
              <p className={`text-sm font-medium ${checks[item.id] ? "text-green-800" : "text-gray-700"}`}>
                {item.label}
              </p>
              <p className="text-xs text-gray-400">{item.category}</p>
            </div>
            <div className="flex-shrink-0">
              {checks[item.id] ? (
                <CheckCircle className="w-4 h-4 text-green-500" />
              ) : (
                <XCircle className="w-4 h-4 text-gray-300" />
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Generate Report */}
      <button
        onClick={() => setReportGenerated(true)}
        className="flex items-center gap-2 rounded-lg bg-indigo-600 px-5 py-2 text-sm font-semibold text-white hover:bg-indigo-700 transition-colors"
      >
        <Shield className="w-4 h-4" />
        Generate Compliance Report
      </button>

      {reportGenerated && (
        <div className="rounded-xl border border-indigo-200 bg-white overflow-hidden">
          <div className="bg-indigo-700 px-5 py-3 flex items-center justify-between">
            <p className="font-bold text-white text-sm">ONC HTI-1 / 21st Century Cures Compliance Report</p>
            <p className="text-indigo-200 text-xs">Generated {new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}</p>
          </div>
          <div className="p-5 space-y-4">
            <div className="grid grid-cols-3 gap-4 text-center">
              <div className="rounded-lg bg-green-50 border border-green-200 p-3">
                <p className="text-2xl font-bold text-green-700">{compliantCount}</p>
                <p className="text-xs text-green-600">Compliant</p>
              </div>
              <div className="rounded-lg bg-red-50 border border-red-200 p-3">
                <p className="text-2xl font-bold text-red-700">{total - compliantCount}</p>
                <p className="text-xs text-red-600">Gaps Identified</p>
              </div>
              <div className="rounded-lg bg-indigo-50 border border-indigo-200 p-3">
                <p className={`text-2xl font-bold ${scoreColor}`}>{score}%</p>
                <p className="text-xs text-indigo-600">Overall Score</p>
              </div>
            </div>

            {gaps.length > 0 && (
              <div>
                <p className="text-sm font-semibold text-gray-700 mb-2 flex items-center gap-1">
                  <AlertTriangle className="w-4 h-4 text-amber-500" /> Compliance Gaps & Recommended Actions
                </p>
                <div className="space-y-2">
                  {gaps.map((gap, i) => (
                    <div key={gap.id} className="flex gap-2 text-sm">
                      <span className="flex-shrink-0 w-5 h-5 rounded-full bg-red-100 text-red-700 text-xs font-bold flex items-center justify-center">
                        {i + 1}
                      </span>
                      <div>
                        <p className="text-gray-800 font-medium">{gap.label}</p>
                        <p className="text-xs text-gray-500 mt-0.5">{recommendations[gap.id]}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {compliantCount === total && (
              <div className="rounded-lg bg-green-50 border border-green-200 p-4 text-center">
                <CheckCircle className="w-8 h-8 text-green-500 mx-auto mb-1" />
                <p className="font-bold text-green-800">Full Compliance Achieved</p>
                <p className="text-xs text-green-600 mt-1">All ONC HTI-1 and 21st Century Cures requirements are met. Maintain documentation for audits.</p>
              </div>
            )}

            <p className="text-xs text-gray-400 border-t border-gray-100 pt-3">
              This report is generated for informational and educational purposes. Consult your compliance officer and legal counsel for official certification requirements. Vermont Health Platform Research Lab — 2026.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// MAIN COMPONENT
// ─────────────────────────────────────────────────────────────────────────────

const TABS: { id: TabId; label: string; icon: React.ReactNode; desc: string }[] = [
  { id: "builder", label: "FHIR Resource Builder", icon: <FileText className="w-4 h-4" />, desc: "Construct FHIR R4 resources" },
  { id: "mapper", label: "Terminology Mapper", icon: <ArrowRight className="w-4 h-4" />, desc: "Map across code systems" },
  { id: "cds", label: "CDS Hooks Simulator", icon: <Zap className="w-4 h-4" />, desc: "Fire CDS hook scenarios" },
  { id: "priorauth", label: "Prior Auth Workflow", icon: <ClipboardList className="w-4 h-4" />, desc: "Simulate PA decisions" },
  { id: "compliance", label: "Compliance Checker", icon: <Shield className="w-4 h-4" />, desc: "ONC HTI-1 assessment" },
];

export default function FHIRLab() {
  const [activeTab, setActiveTab] = useState<TabId>("builder");

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50/30 to-blue-50/40">
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center">
              <FlaskConical className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900 leading-tight">FHIR &amp; Interoperability Lab</h1>
              <p className="text-sm text-indigo-600 font-medium">Interactive Sandbox — Vermont Health Platform Research</p>
            </div>
          </div>
          <p className="text-sm text-gray-500 max-w-3xl mt-2">
            Explore FHIR R4 resource construction, cross-terminology mapping, CDS Hooks simulation, prior authorization workflows, and ONC HTI-1 compliance assessment. All data is generated locally for educational purposes.
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="flex flex-wrap gap-2 mb-6">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-medium transition-all duration-150 ${
                activeTab === tab.id
                  ? "bg-indigo-600 text-white shadow-md shadow-indigo-200"
                  : "bg-white border border-indigo-100 text-gray-600 hover:bg-indigo-50 hover:text-indigo-700"
              }`}
            >
              {tab.icon}
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Tab description bar */}
        <div className="flex items-center gap-2 mb-5 text-xs text-indigo-600 bg-indigo-50 border border-indigo-100 rounded-lg px-4 py-2">
          <Activity className="w-3.5 h-3.5" />
          <span className="font-medium">{TABS.find((t) => t.id === activeTab)?.label}</span>
          <span className="text-gray-400">—</span>
          <span className="text-gray-500">{TABS.find((t) => t.id === activeTab)?.desc}</span>
        </div>

        {/* Tab Content */}
        <div className="bg-white rounded-2xl border border-indigo-100 shadow-sm p-6">
          {activeTab === "builder" && <BuilderTab />}
          {activeTab === "mapper" && <MapperTab />}
          {activeTab === "cds" && <CDSTab />}
          {activeTab === "priorauth" && <PriorAuthTab />}
          {activeTab === "compliance" && <ComplianceTab />}
        </div>

        {/* Footer */}
        <p className="text-center text-xs text-gray-400 mt-6">
          Vermont Health Platform — FHIR &amp; Interoperability Lab &mdash; Educational use only. Not for clinical decision-making. FHIR® is a registered trademark of HL7.
        </p>
      </div>
    </div>
  );
}
