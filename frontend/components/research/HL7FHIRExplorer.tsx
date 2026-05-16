"use client";

import { useState, useMemo } from "react";
import { ChevronDown, ChevronRight, Copy, CheckCircle, Info, Search } from "lucide-react";
import { SYNTHETIC_PATIENTS, USCDI_ELEMENTS, type SyntheticPatient } from "@/lib/syntheticPatients";

// ─── HL7 v2 SEGMENT LIBRARY ──────────────────────────────────────────────────

const HL7_SEGMENTS: Record<string, { name: string; purpose: string; fields: { pos: number; name: string; desc: string }[] }> = {
  MSH: {
    name: "Message Header", purpose: "Every HL7 v2 message begins with MSH. It defines the sending and receiving systems, the message type, timestamp, and version. Think of it as the envelope of the message.",
    fields: [
      { pos: 3, name: "Sending Application", desc: "The system that created the message (e.g., UVMMC-ADT is the ADT system at UVM Medical Center)" },
      { pos: 4, name: "Sending Facility", desc: "The organization sending the message" },
      { pos: 9, name: "Message Type", desc: "Defines the event type. ADT^A01 = Admit; ADT^A04 = Register outpatient; ORU^R01 = Lab results" },
      { pos: 10, name: "Message Control ID", desc: "Unique ID for this message — used for acknowledgment tracking" },
      { pos: 12, name: "Version ID", desc: "HL7 version — 2.5.1 is the current widely-deployed version for ADT and lab messaging" },
    ]
  },
  EVN: {
    name: "Event Type", purpose: "Records when the ADT event (admit, discharge, transfer) actually occurred. The timestamp here may differ from MSH — MSH is when the message was sent, EVN is when the clinical event happened.",
    fields: [
      { pos: 1, name: "Event Type Code", desc: "Mirrors the trigger from MSH-9 (A01=admit, A03=discharge, A08=update)" },
      { pos: 2, name: "Recorded DateTime", desc: "When the event was recorded in the source system" },
    ]
  },
  PID: {
    name: "Patient Identification", purpose: "The demographic core of every HL7 message. Contains all patient identity information. In care coordination, the PID segment is where patient matching (MPI) challenges occur — small discrepancies in name, DOB, or MRN can cause record duplication.",
    fields: [
      { pos: 3, name: "Patient Identifier List", desc: "MRN and other identifiers. Format: ID^^^AssigningAuthority^IDType. The VT-HIE prefix indicates this ID is registered with the Vermont Health Information Exchange." },
      { pos: 5, name: "Patient Name", desc: "Family^Given^Middle (XPN format). Used for patient matching — must match across systems." },
      { pos: 7, name: "Date of Birth", desc: "YYYYMMDD format — critical for patient matching and age-based eligibility rules" },
      { pos: 8, name: "Administrative Sex", desc: "M/F/O/U — administrative sex, distinct from gender identity (added to FHIR separately)" },
      { pos: 11, name: "Patient Address", desc: "Used for SDOH analysis, county-level population health, and care access assessment" },
    ]
  },
  PV1: {
    name: "Patient Visit", purpose: "Defines the visit context — is this inpatient, outpatient, or ED? Contains the attending physician NPI, room assignment, admission type, and financial class. The financial class (last field) drives payer-specific workflows downstream.",
    fields: [
      { pos: 2, name: "Patient Class", desc: "I=Inpatient, O=Outpatient, E=Emergency, P=Preadmit, R=Recurring, B=Obstetrics" },
      { pos: 3, name: "Assigned Location", desc: "Nursing unit^room^bed^facility — used for census management and care coordination" },
      { pos: 7, name: "Attending Doctor", desc: "NPI^LastName^FirstName^^^Degree — links to provider directory for care team tracking" },
      { pos: 18, name: "Patient Type", desc: "Facility-specific classification — drives billing workflows" },
      { pos: 20, name: "Financial Class", desc: "MCR=Medicare, MCD=Medicaid, COM=Commercial — drives payer-specific prior auth and billing logic" },
    ]
  },
  DG1: {
    name: "Diagnosis", purpose: "Each DG1 segment carries one diagnosis code. In VBC, DG1 segments from ADT feeds are the source data for HCC RAF scoring — if a diagnosis is missing from DG1, it will not be captured in the risk adjustment calculation, resulting in under-reimbursement.",
    fields: [
      { pos: 1, name: "Set ID", desc: "Sequential number — DG1|1, DG1|2, etc. for multiple diagnoses" },
      { pos: 3, name: "Diagnosis Code", desc: "Code^Description^CodingSystem. ICD-10-CM is standard. SNOMED CT increasingly used in FHIR." },
      { pos: 4, name: "Diagnosis Description", desc: "Free-text description — used for human review; the code is authoritative for analytics" },
      { pos: 6, name: "Diagnosis Type", desc: "A=Admitting, W=Working, F=Final — affects which codes count for HCC capture" },
    ]
  },
  OBR: {
    name: "Observation Request", purpose: "The OBR segment is the order that triggered the lab result. It links the result (OBX) back to the ordering provider and the clinical question being answered. Required for lab result routing in ORU messages.",
    fields: [
      { pos: 2, name: "Placer Order Number", desc: "The order ID from the ordering system (EHR)" },
      { pos: 3, name: "Filler Order Number", desc: "The order ID from the performing system (LIS/lab)" },
      { pos: 4, name: "Universal Service ID", desc: "LOINC code for the ordered test panel" },
      { pos: 16, name: "Ordering Provider", desc: "NPI of provider who ordered the test" },
    ]
  },
  OBX: {
    name: "Observation/Result", purpose: "Each OBX segment is one lab result or clinical observation. The LOINC code in OBX-3 is the standardized identifier that enables semantic interoperability — it is what allows HbA1c from one system to be recognized as HbA1c in another. This is the clinical data that feeds HEDIS measure calculation.",
    fields: [
      { pos: 2, name: "Value Type", desc: "NM=Numeric, ST=String, CWE=Coded, TX=Text, TS=Timestamp. NM for most lab values." },
      { pos: 3, name: "Observation Identifier", desc: "LOINC code^display^LN — the universal identifier. 4548-4 = HbA1c. This is what HEDIS calculators look for." },
      { pos: 5, name: "Observation Value", desc: "The actual result — e.g., 9.2 for HbA1c. Must be interpreted with OBX-6 (units)." },
      { pos: 6, name: "Units", desc: "UCUM units — % for HbA1c, mg/dL for glucose, mm[Hg] for blood pressure" },
      { pos: 7, name: "Reference Range", desc: "Normal range from the lab — <5.7 for HbA1c. Values outside this trigger H/L flags." },
      { pos: 8, name: "Abnormal Flag", desc: "H=High, L=Low, HH=Critical High, LL=Critical Low, N=Normal, A=Abnormal" },
      { pos: 11, name: "Observation Result Status", desc: "F=Final, P=Preliminary, C=Corrected, X=Cannot be obtained. Only F results should trigger HEDIS capture." },
    ]
  },
  AL1: {
    name: "Allergy Information", purpose: "Documents known allergies and adverse reactions. Critical for medication safety — allergy data must be available at every point of care. In FHIR, this maps to AllergyIntolerance resource.",
    fields: [
      { pos: 2, name: "Allergen Type Code", desc: "DA=Drug Allergy, FA=Food Allergy, MA=Misc Allergy, MC=Misc Contraindication" },
      { pos: 3, name: "Allergen Code/Mnemonic", desc: "Substance causing the reaction — ideally coded with RxNorm" },
      { pos: 5, name: "Allergy Action Code", desc: "The reaction — e.g., Rash, Anaphylaxis, Nausea" },
    ]
  },
  PR1: {
    name: "Procedures", purpose: "Documents clinical procedures performed. CPT codes here are the source for procedure-based quality measure calculation and claims generation. In FHIR, maps to Procedure resource.",
    fields: [
      { pos: 3, name: "Procedure Code", desc: "CPT code^description^CPT — e.g., 93000 = 12-lead ECG routine" },
      { pos: 6, name: "Procedure DateTime", desc: "When the procedure was performed — used for quality measure time windows" },
    ]
  },
};

// ─── PARSE HL7 v2 MESSAGE INTO SEGMENTS ──────────────────────────────────────

function parseHL7(msg: string): { segmentName: string; raw: string; fields: string[] }[] {
  return msg.trim().split('\n').map(line => {
    const trimmed = line.trim();
    const parts = trimmed.split('|');
    return { segmentName: parts[0] ?? '', raw: trimmed, fields: parts };
  }).filter(s => s.segmentName.length > 0);
}

// ─── RENDER FHIR JSON RECURSIVELY ────────────────────────────────────────────

function FHIRValue({ value, depth = 0 }: { value: unknown; depth?: number }) {
  const [open, setOpen] = useState(depth < 2);
  if (value === null || value === undefined) return <span className="text-slate-400">null</span>;
  if (typeof value === 'boolean') return <span className="text-amber-600">{String(value)}</span>;
  if (typeof value === 'number') return <span className="text-sky-600">{value}</span>;
  if (typeof value === 'string') {
    const isCode = /^[A-Z0-9\-_\.\/]{2,30}$/.test(value) && value.length < 25;
    return <span className={isCode ? "text-emerald-700 font-mono" : "text-rose-700"}>&quot;{value}&quot;</span>;
  }
  if (Array.isArray(value)) {
    if (value.length === 0) return <span className="text-slate-400">[]</span>;
    return (
      <span>
        <button onClick={() => setOpen(o => !o)} className="text-slate-500 hover:text-slate-800 font-mono text-xs mr-1">{open ? '▼' : '▶'} [{value.length}]</button>
        {open && (
          <span className="block pl-4 border-l border-slate-200 ml-1">
            {value.map((item, i) => (
              <span key={i} className="block"><FHIRValue value={item} depth={depth + 1} /></span>
            ))}
          </span>
        )}
      </span>
    );
  }
  if (typeof value === 'object') {
    const keys = Object.keys(value as object);
    return (
      <span>
        <button onClick={() => setOpen(o => !o)} className="text-slate-500 hover:text-slate-800 font-mono text-xs mr-1">{open ? '▼' : '▶'} {`{${keys.length}}`}</button>
        {open && (
          <span className="block pl-4 border-l border-slate-200 ml-1">
            {keys.map(k => (
              <span key={k} className="block">
                <span className="text-indigo-700 font-semibold">{k}</span>
                <span className="text-slate-500">: </span>
                <FHIRValue value={(value as Record<string, unknown>)[k]} depth={depth + 1} />
              </span>
            ))}
          </span>
        )}
      </span>
    );
  }
  return <span>{String(value)}</span>;
}

// ─── HL7 SEGMENT VIEWER ───────────────────────────────────────────────────────

function HL7SegmentRow({ segmentName, fields }: { segmentName: string; fields: string[] }) {
  const [open, setOpen] = useState(false);
  const meta = HL7_SEGMENTS[segmentName];
  const isKnown = !!meta;

  return (
    <div className={`border rounded-lg mb-2 overflow-hidden transition-all ${open ? 'border-indigo-300 shadow-sm' : 'border-slate-200'}`}>
      <button
        onClick={() => setOpen(o => !o)}
        className={`w-full flex items-start gap-3 px-4 py-3 text-left ${open ? 'bg-indigo-50' : 'bg-white hover:bg-slate-50'}`}
      >
        <span className="shrink-0 mt-0.5">{open ? <ChevronDown size={14} className="text-indigo-600" /> : <ChevronRight size={14} className="text-slate-400" />}</span>
        <span className={`font-mono font-black text-sm w-10 shrink-0 ${isKnown ? 'text-indigo-700' : 'text-slate-600'}`}>{segmentName}</span>
        {meta && <span className="text-xs font-bold text-slate-600 mt-0.5">{meta.name}</span>}
        <span className="ml-auto text-[10px] font-mono text-slate-400 truncate max-w-xs">{fields.slice(1, 5).join(' | ')}</span>
      </button>

      {open && (
        <div className="px-4 pb-4 bg-white border-t border-slate-100">
          {meta && (
            <div className="mt-3 mb-3 p-3 bg-indigo-50 rounded-lg border border-indigo-100">
              <p className="text-xs text-indigo-800 leading-relaxed">{meta.purpose}</p>
            </div>
          )}

          {/* Raw fields */}
          <div className="font-mono text-xs bg-slate-950 text-green-300 rounded-lg p-3 mb-3 overflow-x-auto whitespace-pre">
            {fields.join('|')}
          </div>

          {/* Annotated fields */}
          {meta && (
            <div className="space-y-1.5">
              <p className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-2">Field Annotations</p>
              {meta.fields.map(f => {
                const val = fields[f.pos] ?? '';
                if (!val) return null;
                return (
                  <div key={f.pos} className="flex gap-3 text-xs">
                    <span className="font-mono text-slate-400 shrink-0 w-16">{segmentName}-{f.pos}</span>
                    <span className="font-bold text-slate-700 shrink-0 w-40">{f.name}</span>
                    <span className="font-mono text-emerald-700 shrink-0 max-w-[140px] truncate" title={val}>{val || '—'}</span>
                    <span className="text-slate-500 leading-relaxed">{f.desc}</span>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// ─── FHIR ENTRY VIEWER ────────────────────────────────────────────────────────

function FHIREntryCard({ entry }: { entry: { resource?: Record<string, unknown> } }) {
  const [open, setOpen] = useState(false);
  const rt = (entry.resource?.resourceType as string) ?? 'Unknown';
  const id = (entry.resource?.id as string) ?? '';

  const RESOURCE_DESCRIPTIONS: Record<string, string> = {
    Patient: 'Demographic and administrative information about the individual receiving care. Maps to HL7 PID segment. Contains USCDI-required elements: name, DOB, sex, race, ethnicity, preferred language.',
    Encounter: 'An interaction between a patient and healthcare provider. Maps to PV1/EVN segments. The class (inpatient/outpatient/ED) determines many downstream workflows.',
    Condition: 'A clinical condition, problem, or diagnosis. Maps to HL7 DG1 segment. Uses ICD-10-CM or SNOMED CT codes. The primary source for HCC RAF scoring.',
    Observation: 'A measurement or assertion about the patient — lab results, vital signs, survey scores. Maps to HL7 OBX. LOINC code in Observation.code is the interoperability key.',
    MedicationRequest: 'A prescription or order for medication. Maps to HL7 RXO/RXE. RxNorm code identifies the drug. Used for medication adherence HEDIS measures (PDC calculation).',
    DiagnosticReport: 'A set of results from a diagnostic service. Groups related OBX segments into a structured report.',
    Procedure: 'A clinical procedure performed on the patient. Maps to HL7 PR1. CPT codes here feed procedure-based quality measure reporting.',
    AllergyIntolerance: 'A known or suspected allergy. Maps to HL7 AL1. RxNorm codes for medications; SNOMED for substances.',
    Goal: 'A target outcome for the patient — used in care plans and SDOH interventions.',
    CarePlan: 'A coordinated care plan addressing one or more health conditions.',
  };

  const rtColors: Record<string, string> = {
    Patient: 'bg-sky-100 text-sky-800 border-sky-200',
    Encounter: 'bg-violet-100 text-violet-800 border-violet-200',
    Condition: 'bg-rose-100 text-rose-800 border-rose-200',
    Observation: 'bg-amber-100 text-amber-800 border-amber-200',
    MedicationRequest: 'bg-emerald-100 text-emerald-800 border-emerald-200',
  };
  const badge = rtColors[rt] ?? 'bg-slate-100 text-slate-700 border-slate-200';

  return (
    <div className={`border rounded-lg mb-2 overflow-hidden ${open ? 'border-indigo-300' : 'border-slate-200'}`}>
      <button onClick={() => setOpen(o => !o)} className={`w-full flex items-center gap-3 px-4 py-3 text-left ${open ? 'bg-indigo-50' : 'bg-white hover:bg-slate-50'}`}>
        {open ? <ChevronDown size={14} className="text-indigo-600" /> : <ChevronRight size={14} className="text-slate-400" />}
        <span className={`text-[10px] font-bold px-2 py-0.5 rounded border ${badge}`}>{rt}</span>
        <span className="font-mono text-xs text-slate-500">{id}</span>
        {RESOURCE_DESCRIPTIONS[rt] && <span className="ml-auto text-[10px] text-slate-400 hidden sm:block max-w-xs truncate">{RESOURCE_DESCRIPTIONS[rt].slice(0, 60)}…</span>}
      </button>
      {open && (
        <div className="px-4 pb-4 bg-white border-t border-slate-100">
          {RESOURCE_DESCRIPTIONS[rt] && (
            <div className="mt-3 mb-3 p-3 bg-indigo-50 rounded-lg border border-indigo-100">
              <p className="text-xs text-indigo-800 leading-relaxed">{RESOURCE_DESCRIPTIONS[rt]}</p>
            </div>
          )}
          <div className="font-mono text-xs leading-relaxed overflow-x-auto bg-slate-950 text-slate-100 rounded-lg p-3">
            <FHIRValue value={entry.resource} depth={0} />
          </div>
        </div>
      )}
    </div>
  );
}

// ─── USCDI BROWSER ────────────────────────────────────────────────────────────

function USCDIBrowser() {
  const [search, setSearch] = useState('');
  const [filterVersion, setFilterVersion] = useState<'all' | 'v1' | 'v2' | 'v3'>('all');
  const [expandedClass, setExpandedClass] = useState<string | null>(null);

  const filtered = useMemo(() => USCDI_ELEMENTS.filter(e => {
    const matchSearch = !search || [e.dataClass, e.dataElement, e.fhirResource, e.exampleCode, e.exampleDisplay, e.terminologySystem].some(f => f.toLowerCase().includes(search.toLowerCase()));
    const matchVersion = filterVersion === 'all' || e.uscdiVersion === filterVersion;
    return matchSearch && matchVersion;
  }), [search, filterVersion]);

  const byClass = useMemo(() => {
    const map: Record<string, typeof USCDI_ELEMENTS> = {};
    filtered.forEach(e => { (map[e.dataClass] ??= []).push(e); });
    return map;
  }, [filtered]);

  const versionColor = { v1: 'bg-sky-100 text-sky-700 border-sky-200', v2: 'bg-violet-100 text-violet-700 border-violet-200', v3: 'bg-emerald-100 text-emerald-700 border-emerald-200' };

  return (
    <div>
      <div className="mb-4 p-4 bg-slate-50 rounded-xl border border-slate-200">
        <p className="text-sm text-slate-600 leading-relaxed">
          <strong>USCDI (United States Core Data for Interoperability)</strong> defines the minimum set of health data classes and elements that must be exchangeable under the ONC 21st Century Cures Act. Every USCDI element maps to a FHIR resource and a terminology code. Version 3 (2023) added SDOH, functional status, and imaging.
        </p>
      </div>
      <div className="flex flex-wrap gap-3 mb-4">
        <div className="relative flex-1 min-w-[200px]">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input className="w-full pl-8 pr-3 py-2 text-sm border border-slate-200 rounded-lg bg-white focus:outline-none focus:border-indigo-400" placeholder="Search data class, element, FHIR resource, code…" value={search} onChange={e => setSearch(e.target.value)} />
        </div>
        <div className="flex gap-1">
          {(['all', 'v1', 'v2', 'v3'] as const).map(v => (
            <button key={v} onClick={() => setFilterVersion(v)} className={`px-3 py-1.5 text-xs font-bold rounded-lg border transition-colors ${filterVersion === v ? 'bg-indigo-600 text-white border-indigo-600' : 'bg-white text-slate-600 border-slate-200 hover:border-indigo-300'}`}>
              {v === 'all' ? 'All versions' : v.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      <div className="text-xs text-slate-500 mb-3">{filtered.length} elements across {Object.keys(byClass).length} data classes</div>

      <div className="space-y-2">
        {Object.entries(byClass).map(([cls, elements]) => (
          <div key={cls} className="border border-slate-200 rounded-xl overflow-hidden">
            <button onClick={() => setExpandedClass(expandedClass === cls ? null : cls)} className="w-full flex items-center gap-3 px-4 py-3 bg-slate-50 hover:bg-slate-100 text-left">
              {expandedClass === cls ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
              <span className="font-bold text-sm text-slate-800">{cls}</span>
              <span className="text-xs text-slate-500">({elements.length} element{elements.length > 1 ? 's' : ''})</span>
            </button>
            {expandedClass === cls && (
              <div className="divide-y divide-slate-100">
                {elements.map(e => (
                  <div key={`${e.dataClass}-${e.dataElement}`} className="px-4 py-3 bg-white grid grid-cols-1 sm:grid-cols-4 gap-2 text-xs">
                    <div>
                      <p className="font-bold text-slate-800">{e.dataElement}</p>
                      <span className={`inline-block mt-1 px-1.5 py-0.5 rounded border text-[10px] font-bold ${versionColor[e.uscdiVersion]}`}>{e.uscdiVersion.toUpperCase()}</span>
                    </div>
                    <div>
                      <p className="text-[10px] font-black uppercase text-slate-400 mb-1">FHIR Resource</p>
                      <p className="font-mono text-indigo-700">{e.fhirResource}</p>
                    </div>
                    <div>
                      <p className="text-[10px] font-black uppercase text-slate-400 mb-1">Terminology</p>
                      <p className="font-bold text-slate-700">{e.terminologySystem}</p>
                    </div>
                    <div>
                      <p className="text-[10px] font-black uppercase text-slate-400 mb-1">Example</p>
                      <p className="font-mono text-emerald-700">{e.exampleCode}</p>
                      <p className="text-slate-500">{e.exampleDisplay}</p>
                      {e.notes && <p className="text-amber-600 mt-0.5 italic">{e.notes}</p>}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── SIDE-BY-SIDE VIEW ────────────────────────────────────────────────────────

function SideBySideView({ patient }: { patient: SyntheticPatient }) {
  const hl7Segments = parseHL7(patient.hl7AdtMessage);

  return (
    <div>
      <div className="mb-4 p-4 bg-amber-50 border border-amber-200 rounded-xl">
        <p className="text-xs text-amber-800 leading-relaxed">
          <strong>HL7 v2 ↔ FHIR R4 Bridge:</strong> The same clinical event — {patient.name}&apos;s encounter on {patient.encounters[0]?.admitDate} — expressed in both messaging formats. HL7 v2 is the incumbent standard in most hospital ADT and lab systems. FHIR R4 is the ONC-mandated standard for patient access and payer API requirements. Real-world interoperability often requires translating between both.
        </p>
      </div>
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <div>
          <div className="flex items-center gap-2 mb-3">
            <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">HL7 v2.5.1 ADT Message</span>
            <span className="px-2 py-0.5 text-[10px] font-bold rounded-full bg-slate-200 text-slate-600">Legacy / Incumbent</span>
          </div>
          <div className="space-y-1">
            {hl7Segments.map((seg, i) => (
              <HL7SegmentRow key={i} segmentName={seg.segmentName} fields={seg.fields} />
            ))}
          </div>
        </div>
        <div>
          <div className="flex items-center gap-2 mb-3">
            <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">FHIR R4 Bundle</span>
            <span className="px-2 py-0.5 text-[10px] font-bold rounded-full bg-indigo-100 text-indigo-700">ONC Mandate / Modern</span>
          </div>
          <div className="space-y-1">
            {((patient.fhirBundle as { entry?: Array<{ resource?: Record<string, unknown> }> }).entry ?? []).map((entry, i) => (
              <FHIREntryCard key={i} entry={entry} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── MAIN COMPONENT ───────────────────────────────────────────────────────────

type ViewTab = 'hl7' | 'fhir' | 'bridge' | 'uscdi';

export default function HL7FHIRExplorer() {
  const [selectedId, setSelectedId] = useState<string>(SYNTHETIC_PATIENTS[0].id);
  const [viewTab, setViewTab] = useState<ViewTab>('hl7');
  const [copied, setCopied] = useState(false);

  const patient = useMemo(() => SYNTHETIC_PATIENTS.find(p => p.id === selectedId)!, [selectedId]);
  const hl7Segments = useMemo(() => parseHL7(patient.hl7AdtMessage), [patient]);

  function copyRaw() {
    navigator.clipboard.writeText(patient.hl7AdtMessage);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  const VIEW_TABS: { id: ViewTab; label: string; desc: string }[] = [
    { id: 'hl7', label: 'HL7 v2 Explorer', desc: 'Annotated segments' },
    { id: 'fhir', label: 'FHIR R4 Bundle', desc: 'Resource explorer' },
    { id: 'bridge', label: 'HL7 ↔ FHIR Bridge', desc: 'Side-by-side comparison' },
    { id: 'uscdi', label: 'USCDI Data Elements', desc: 'v1/v2/v3 browser' },
  ];

  const riskTierColor = { 'very-high': 'bg-red-100 text-red-800', 'high': 'bg-orange-100 text-orange-800', 'rising': 'bg-amber-100 text-amber-800', 'low': 'bg-green-100 text-green-800' };

  return (
    <div>
      {/* Patient selector */}
      <div className="mb-6">
        <p className="text-xs font-black uppercase tracking-widest text-slate-500 mb-3">Select Patient Scenario</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
          {SYNTHETIC_PATIENTS.map(p => (
            <button key={p.id} onClick={() => setSelectedId(p.id)} className={`p-3 rounded-xl border text-left transition-all ${selectedId === p.id ? 'border-indigo-500 bg-indigo-50 shadow-sm' : 'border-slate-200 bg-white hover:border-indigo-300'}`}>
              <div className="flex items-start justify-between gap-1 mb-1">
                <p className={`text-xs font-black ${selectedId === p.id ? 'text-indigo-700' : 'text-slate-800'}`}>{p.name}</p>
                <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded-full ${riskTierColor[p.riskTier]}`}>{p.riskTier.replace('-', ' ')}</span>
              </div>
              <p className="text-[10px] text-slate-500">{p.age}y · {p.payer} · {p.county}</p>
              <p className="text-[10px] text-slate-600 mt-1 leading-tight">{p.scenarioTitle.split('—')[1]?.trim()}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Patient context bar */}
      <div className="mb-6 p-4 bg-slate-900 rounded-xl text-white">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="text-xs text-slate-400 uppercase tracking-widest font-bold mb-1">{patient.scenario}</p>
            <h3 className="text-lg font-black">{patient.name}</h3>
            <p className="text-sm text-slate-300">{patient.age}y {patient.sex === 'F' ? 'Female' : 'Male'} · {patient.county} County · {patient.payer} · MRN: {patient.memberId}</p>
          </div>
          <div className="flex flex-wrap gap-4 text-right">
            <div><p className="text-[10px] text-slate-400 uppercase tracking-widest">HCC RAF Score</p><p className="text-xl font-black text-amber-400">{patient.rafScore}</p></div>
            <div><p className="text-[10px] text-slate-400 uppercase tracking-widest">Charlson</p><p className="text-xl font-black text-rose-400">{patient.charlsonScore}</p></div>
            <div><p className="text-[10px] text-slate-400 uppercase tracking-widest">Risk Tier</p><p className="text-sm font-black text-indigo-300 capitalize">{patient.riskTier.replace('-', ' ')}</p></div>
          </div>
        </div>
        <p className="text-xs text-slate-300 mt-3 leading-relaxed border-t border-slate-700 pt-3">{patient.keyLearning}</p>
      </div>

      {/* View tabs */}
      <nav className="flex flex-wrap items-end border border-slate-200 rounded-t-xl px-2 bg-slate-50/80 pt-2 gap-y-1 mb-6">
        {VIEW_TABS.map(tab => (
          <button key={tab.id} onClick={() => setViewTab(tab.id)} className={`relative flex items-center gap-1.5 px-4 py-2 text-sm font-bold transition-all whitespace-nowrap rounded-t-xl border-t border-l border-r mr-1 ${viewTab === tab.id ? 'bg-slate-100 border-slate-800 text-slate-900 z-10 -mb-px' : 'bg-white border-slate-200 text-slate-500 hover:bg-slate-50 hover:text-slate-700 mt-1.5 shadow-sm'}`}>
            <span>{tab.label}</span>
            <span className="hidden sm:inline text-[10px] font-normal text-slate-400">— {tab.desc}</span>
          </button>
        ))}
        {viewTab === 'hl7' && (
          <button onClick={copyRaw} className="ml-auto mb-1 flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-slate-600 hover:text-slate-900 border border-slate-200 rounded-lg bg-white hover:bg-slate-50">
            {copied ? <><CheckCircle size={12} className="text-emerald-600" /> Copied</> : <><Copy size={12} /> Copy raw</>}
          </button>
        )}
      </nav>

      {/* HL7 view */}
      {viewTab === 'hl7' && (
        <div>
          <div className="mb-4 flex items-start gap-2 p-3 bg-blue-50 border border-blue-200 rounded-xl">
            <Info size={14} className="text-blue-600 mt-0.5 shrink-0" />
            <p className="text-xs text-blue-800">Click any segment row to expand it. Each segment is annotated with its clinical purpose and field-level definitions. The MSH, PID, PV1, and DG1 segments carry the data that feeds HCC risk adjustment and HEDIS measure calculation.</p>
          </div>
          {hl7Segments.map((seg, i) => <HL7SegmentRow key={i} segmentName={seg.segmentName} fields={seg.fields} />)}

          {patient.hl7OruMessage && (
            <div className="mt-8">
              <p className="text-xs font-black uppercase tracking-widest text-slate-500 mb-3">Lab Results (ORU^R01) — Source for HEDIS LOINC-coded data capture</p>
              <div className="mb-3 p-3 bg-amber-50 border border-amber-200 rounded-xl">
                <p className="text-xs text-amber-800">The ORU^R01 message carries lab results from the LIS to the EHR and HIE. Each OBX segment is one result. The LOINC code in OBX-3 is what HEDIS calculation engines search for when determining numerator inclusion. If the LOINC code is absent or wrong, the result cannot be used for quality measurement even if the value is correct.</p>
              </div>
              {parseHL7(patient.hl7OruMessage).map((seg, i) => <HL7SegmentRow key={i} segmentName={seg.segmentName} fields={seg.fields} />)}
            </div>
          )}
        </div>
      )}

      {/* FHIR view */}
      {viewTab === 'fhir' && (
        <div>
          <div className="mb-4 p-3 bg-indigo-50 border border-indigo-200 rounded-xl">
            <p className="text-xs text-indigo-800 leading-relaxed">
              This FHIR R4 Bundle represents {patient.name}&apos;s clinical data expressed per ONC US Core IG. The Bundle.entry array contains discrete FHIR resources — each resource type corresponds to a USCDI data class. Click any entry to expand it and see the full resource JSON with inline field descriptions.
            </p>
          </div>
          {((patient.fhirBundle as { entry?: Array<{ resource?: Record<string, unknown> }> }).entry ?? []).map((entry, i) => (
            <FHIREntryCard key={i} entry={entry} />
          ))}
        </div>
      )}

      {/* Bridge view */}
      {viewTab === 'bridge' && <SideBySideView patient={patient} />}

      {/* USCDI view */}
      {viewTab === 'uscdi' && <USCDIBrowser />}
    </div>
  );
}
