"use client";

import { useState, useMemo } from "react";
import { CheckCircle, XCircle, AlertTriangle, ChevronDown, ChevronRight, Info } from "lucide-react";
import { SYNTHETIC_PATIENTS, type SyntheticPatient, type Encounter } from "@/lib/syntheticPatients";

// ─── HEDIS MEASURE METADATA ───────────────────────────────────────────────────

const HEDIS_META: Record<string, { fullName: string; domain: string; numeratorDef: string; denominatorDef: string; dataSource: string; loincCodes?: string[]; icd10Codes?: string[]; vermont?: string }> = {
  'CDC-HbA1c': {
    fullName: 'Comprehensive Diabetes Care — HbA1c Control (<8%)',
    domain: 'Effectiveness of Care',
    numeratorDef: 'Members with T2DM aged 18–75 with most recent HbA1c value < 8.0% during the measurement year.',
    denominatorDef: 'Members aged 18–75 with T2DM identified by claims or pharmacy data.',
    dataSource: 'Lab data (LOINC 4548-4) or claims with CPT 83036. MUST be a final result (OBX-11 = F) to count.',
    loincCodes: ['4548-4'],
    icd10Codes: ['E11.9', 'E11.65', 'E10.9'],
    vermont: 'Vermont AHEAD tracks CDC measures as a primary VBC performance benchmark. Controlling A1C to <8% in attributed diabetic members is one of the highest-weight quality metrics in the AHEAD contract scorecard.',
  },
  'CDC-Test': {
    fullName: 'Comprehensive Diabetes Care — HbA1c Testing',
    domain: 'Effectiveness of Care',
    numeratorDef: 'Members with at least one HbA1c test performed during the measurement year.',
    denominatorDef: 'Same as CDC-HbA1c.',
    dataSource: 'Lab claims (CPT 83036) or LOINC 4548-4 in clinical data.',
    loincCodes: ['4548-4'],
    vermont: 'Lower bar than A1C control — tests whether the patient is even connected to care. Gaps here signal attribution/access problems.',
  },
  'CDC-Eye': {
    fullName: 'Comprehensive Diabetes Care — Eye Exam',
    domain: 'Effectiveness of Care',
    numeratorDef: 'Members with T2DM who received a retinal or dilated eye exam in the measurement year or a negative retinal exam in the prior year.',
    denominatorDef: 'Same as CDC-HbA1c.',
    dataSource: 'CPT codes: 67028, 67030, 67031, 67036, 67039, 67040, 67041, 67042, 67043, 67101, 92002, 92004, 92012, 92014, 92018, 92019, 92134, 92225, 92226, 92228, 92230, 92235, 92240, 92250, 92260.',
    vermont: 'High gap rate in rural counties due to limited ophthalmology access. Teleretinal screening programs (e.g., EyePACS) address access barriers.',
  },
  'CDC-KE': {
    fullName: 'Comprehensive Diabetes Care — Kidney Health Evaluation',
    domain: 'Effectiveness of Care',
    numeratorDef: 'Members with T2DM who received a urine albumin-to-creatinine ratio (UACR) test and an eGFR in the measurement year.',
    denominatorDef: 'Same as CDC-HbA1c.',
    dataSource: 'LOINC: 14959-1 (UACR), 62238-1 (eGFR CKD-EPI), 33914-3 (eGFR MDRD).',
    loincCodes: ['14959-1', '62238-1', '33914-3'],
    vermont: 'Added to HEDIS 2023. Often has lowest numerator rate of all CDC measures — UACR is routinely forgotten when providers focus on A1C.',
  },
  'CBP': {
    fullName: 'Controlling High Blood Pressure',
    domain: 'Effectiveness of Care',
    numeratorDef: 'Members 18–85 with hypertension whose most recent BP reading is < 140/90 mmHg.',
    denominatorDef: 'Members 18–85 with a diagnosis of hypertension (I10) identified by claims.',
    dataSource: 'The BP reading must come from an outpatient setting. ED and inpatient readings are excluded. LOINC: 8480-6 (systolic), 8462-4 (diastolic).',
    loincCodes: ['8480-6', '8462-4'],
    icd10Codes: ['I10'],
    vermont: 'Rutland and Windsor counties show highest hypertension prevalence in Vermont. CBP is a triple-weighted measure in AHEAD quality scoring.',
  },
  'FUH-7': {
    fullName: 'Follow-Up After Hospitalization for Mental Illness — 7-day',
    domain: 'Effectiveness of Care',
    numeratorDef: 'Members who were followed up within 7 days after discharge from an inpatient stay for mental illness.',
    denominatorDef: 'Members 6+ with a qualifying inpatient discharge with a principal MH diagnosis.',
    dataSource: 'Inpatient claims (DRG 880-887, 894-897) plus outpatient BH follow-up claims. Must be an outpatient visit — a phone call does NOT count.',
    vermont: 'Vermont has one of the highest MH hospitalization rates in New England. FUH-7 is chronically low due to BH capacity constraints. AHEAD requires performance improvement plans for any organization below state average.',
  },
  'FUH-30': {
    fullName: 'Follow-Up After Hospitalization for Mental Illness — 30-day',
    domain: 'Effectiveness of Care',
    numeratorDef: 'Members followed up within 30 days after MH inpatient discharge.',
    denominatorDef: 'Same as FUH-7.',
    dataSource: 'Same as FUH-7, extended window.',
    vermont: 'An easier target than FUH-7 but Vermont still underperforms national average on 30-day follow-up in rural ACOs.',
  },
  'AMM': {
    fullName: 'Antidepressant Medication Management — Effective Continuation Phase',
    domain: 'Effectiveness of Care',
    numeratorDef: 'Members with MDD who remained on antidepressant medication for at least 180 days (6 months) after the initial diagnosis.',
    denominatorDef: 'Members 18+ newly diagnosed with MDD and who were dispensed an antidepressant.',
    dataSource: 'Pharmacy data: PDC (proportion of days covered) ≥80% for 180 days. RxNorm codes for all SSRIs, SNRIs, TCAs.',
    vermont: 'Medication continuation failure is common in Rutland and Windham — where SDOH barriers (housing, food insecurity) disrupt treatment adherence.',
  },
  'SPD': {
    fullName: 'Statin Therapy for Patients with Diabetes',
    domain: 'Effectiveness of Care',
    numeratorDef: 'Members with T2DM who were dispensed a statin medication during the measurement year.',
    denominatorDef: 'Members 40–75 with T2DM.',
    dataSource: 'Pharmacy data: active statin prescription. RxNorm codes for all statin drugs.',
    vermont: 'High gap rate in elderly T2DM patients where statin deprescribing occurred without documentation.',
  },
  'SPC': {
    fullName: 'Statin Use in Persons with Cardiovascular Disease',
    domain: 'Effectiveness of Care',
    numeratorDef: 'Members with ASCVD who were dispensed a statin in the measurement year.',
    denominatorDef: 'Members 21+ with cardiovascular disease (CAD, stroke, PVD, prior MI).',
    dataSource: 'Pharmacy data. ICD-10 for ASCVD: I20-I25, I60-I69, I70-I74.',
    vermont: 'Underuse of statins in CHF patients who have comorbid ASCVD is a common quality gap in Vermont rural ACOs.',
  },
  'MAH': {
    fullName: 'Medication Adherence for Diabetes — PDC ≥80%',
    domain: 'Effectiveness of Care',
    numeratorDef: 'Members with T2DM with PDC ≥80% for diabetes medications (metformin, GLP-1, SGLT2i, sulfonylureas).',
    denominatorDef: 'Members with T2DM who were dispensed a diabetes medication.',
    dataSource: 'Pharmacy claims: PDC = days supply / days in measurement period. Requires ≥2 fills.',
    vermont: 'Insulin cost burden is a major adherence barrier in Vermont Medicaid patients. AHEAD includes cost-sharing waivers for insulin as part of VBC contract terms.',
  },
  'PCE': {
    fullName: 'Pharmacotherapy Mgmt of COPD Exacerbation — Systemic Corticosteroid',
    domain: 'Effectiveness of Care',
    numeratorDef: 'Members with COPD who received a systemic corticosteroid within 14 days of an ED visit or inpatient discharge for COPD.',
    denominatorDef: 'Members 40+ with COPD who had an ED visit or inpatient stay for COPD exacerbation.',
    dataSource: 'Claims: corticosteroid dispense within 14 days. CPT 94640 (nebulizer), ICD-10 J44.x.',
    vermont: 'COPD is disproportionately prevalent in rural Vermont due to farm/dust exposure. Franklin, Grand Isle, and Lamoille counties show highest rates.',
  },
  'PCE-BD': {
    fullName: 'Pharmacotherapy Mgmt of COPD — Bronchodilator',
    domain: 'Effectiveness of Care',
    numeratorDef: 'Members with COPD who were dispensed a bronchodilator within 14 days of an ED/inpatient COPD encounter.',
    denominatorDef: 'Same as PCE.',
    dataSource: 'Pharmacy claims: SABA or LABA dispense within 14 days of COPD event.',
    vermont: 'Rescue inhaler prescribing at discharge is often missed in rural EDs due to lack of pharmacist consultation at discharge.',
  },
  'FLU': {
    fullName: 'Annual Influenza Vaccination',
    domain: 'Effectiveness of Care',
    numeratorDef: 'Members who received an influenza vaccination between July 1 and the end of the measurement year.',
    denominatorDef: 'Members 6 months – 64 years (some versions extend to 65+).',
    dataSource: 'Claims: CVX code 141 or 158 (influenza vaccines). Can also be captured via immunization registry.',
    vermont: 'Vermont has a statewide immunization registry (VPHIP) that can be queried to supplement claims data.',
  },
};

// ─── READMISSION CALCULATOR ───────────────────────────────────────────────────

interface ReadmissionRecord {
  patient: SyntheticPatient;
  indexEncounter: Encounter;
  readmitEncounter: Encounter;
  daysToReadmit: number;
  icdPrincipal: string;
  preventable: boolean;
  preventionNote: string;
}

function computeReadmissions(): ReadmissionRecord[] {
  const records: ReadmissionRecord[] = [];
  for (const patient of SYNTHETIC_PATIENTS) {
    for (const enc of patient.encounters) {
      if (enc.readmission && enc.indexEncounterId) {
        const idx = patient.encounters.find(e => e.id === enc.indexEncounterId);
        if (!idx) continue;
        const d1 = new Date(idx.dischargeDate);
        const d2 = new Date(enc.admitDate);
        const days = Math.round((d2.getTime() - d1.getTime()) / (1000 * 60 * 60 * 24));
        records.push({
          patient,
          indexEncounter: idx,
          readmitEncounter: enc,
          daysToReadmit: days,
          icdPrincipal: enc.principalDx,
          preventable: enc.avoidable ?? false,
          preventionNote: enc.avoidableReason ?? '',
        });
      }
    }
  }
  return records;
}

// ─── AVOIDABLE ED LOGIC ───────────────────────────────────────────────────────

const ACSC_CONDITIONS: Record<string, { label: string; description: string; pqiNumber: string }> = {
  'J44.1': { label: 'COPD Exacerbation', description: 'AHRQ PQI #5 — COPD admissions preventable with timely outpatient management and action plans', pqiNumber: 'PQI-05' },
  'J44.0': { label: 'COPD with Infection', description: 'AHRQ PQI #5 — COPD complications preventable with early antibiotic prescribing', pqiNumber: 'PQI-05' },
  'I50.32': { label: 'Congestive Heart Failure', description: 'AHRQ PQI #8 — CHF decompensation preventable with RPM, fluid monitoring, and medication titration', pqiNumber: 'PQI-08' },
  'I50.22': { label: 'Systolic Heart Failure', description: 'AHRQ PQI #8 — Systolic CHF exacerbation preventable with remote monitoring', pqiNumber: 'PQI-08' },
  'I50.9': { label: 'Heart Failure (unspecified)', description: 'AHRQ PQI #8 — Heart failure admissions', pqiNumber: 'PQI-08' },
  'E11.65': { label: 'Uncontrolled T2DM', description: 'AHRQ PQI #1/#3 — Diabetes short-term complications preventable with pharmacist MTM, RPM glucose monitoring', pqiNumber: 'PQI-01/03' },
  'I10': { label: 'Hypertension', description: 'AHRQ PQI #7 — Hypertension admissions preventable with outpatient blood pressure management', pqiNumber: 'PQI-07' },
};

// ─── HEDIS SUMMARY TABLE ──────────────────────────────────────────────────────

function HEDISPanelView() {
  const [selectedMeasure, setSelectedMeasure] = useState<string | null>(null);
  const [expandedPatient, setExpandedPatient] = useState<string | null>(null);

  const allMeasureCodes = useMemo(() => {
    const codes = new Set<string>();
    SYNTHETIC_PATIENTS.forEach(p => p.hedisStatus.forEach(h => codes.add(h.code)));
    return Array.from(codes).sort();
  }, []);

  const measureStats = useMemo(() => allMeasureCodes.map(code => {
    const allStatuses = SYNTHETIC_PATIENTS.flatMap(p => p.hedisStatus.filter(h => h.code === code));
    const inDenom = allStatuses.filter(h => h.inDenominator).length;
    const inNumer = allStatuses.filter(h => h.inDenominator && h.inNumerator).length;
    const rate = inDenom > 0 ? Math.round((inNumer / inDenom) * 100) : null;
    const meta = HEDIS_META[code];
    return { code, inDenom, inNumer, rate, gaps: inDenom - inNumer, meta };
  }), [allMeasureCodes]);

  const activeMeasure = selectedMeasure ? measureStats.find(m => m.code === selectedMeasure) : null;
  const patientGapsForMeasure = useMemo(() => selectedMeasure ? SYNTHETIC_PATIENTS.map(p => {
    const status = p.hedisStatus.find(h => h.code === selectedMeasure);
    return { patient: p, status };
  }).filter(x => x.status?.inDenominator) : [], [selectedMeasure]);

  return (
    <div>
      <div className="mb-4 p-4 bg-blue-50 border border-blue-200 rounded-xl">
        <p className="text-xs text-blue-800 leading-relaxed">
          <strong>HEDIS (Healthcare Effectiveness Data and Information Set)</strong> is NCQA&apos;s standardized quality measurement framework — the primary quality scorecard for health plans, ACOs, and VBC contracts. Each measure has a strict numerator/denominator definition. Rates are calculated from claims and clinical data. In Vermont AHEAD, HEDIS rates feed directly into the quality performance score that determines shared savings distribution.
        </p>
      </div>

      {/* Measure summary grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2 mb-6">
        {measureStats.map(m => (
          <button key={m.code} onClick={() => setSelectedMeasure(m.code === selectedMeasure ? null : m.code)} className={`p-3 rounded-xl border text-left transition-all ${selectedMeasure === m.code ? 'border-indigo-500 bg-indigo-50' : 'border-slate-200 bg-white hover:border-indigo-300'}`}>
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">{m.code}</span>
              {m.rate !== null && (
                <span className={`text-xs font-black ${m.rate >= 70 ? 'text-emerald-600' : m.rate >= 50 ? 'text-amber-600' : 'text-red-600'}`}>{m.rate}%</span>
              )}
            </div>
            <p className="text-[10px] text-slate-600 leading-tight">{m.meta?.fullName ?? m.code}</p>
            {m.inDenom > 0 && (
              <div className="mt-2">
                <div className="h-1.5 bg-slate-200 rounded-full overflow-hidden">
                  <div className={`h-full rounded-full transition-all ${(m.rate ?? 0) >= 70 ? 'bg-emerald-500' : (m.rate ?? 0) >= 50 ? 'bg-amber-500' : 'bg-red-500'}`} style={{ width: `${m.rate ?? 0}%` }} />
                </div>
                <p className="text-[9px] text-slate-400 mt-0.5">{m.inNumer}/{m.inDenom} in panel</p>
              </div>
            )}
          </button>
        ))}
      </div>

      {/* Measure detail panel */}
      {activeMeasure && activeMeasure.meta && (
        <div className="mb-6 border border-indigo-200 rounded-xl overflow-hidden">
          <div className="bg-indigo-900 text-white px-5 py-4">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-[10px] font-black uppercase tracking-widest text-indigo-300 mb-1">{activeMeasure.code} — {activeMeasure.meta.domain}</p>
                <h4 className="font-black text-base">{activeMeasure.meta.fullName}</h4>
              </div>
              {activeMeasure.rate !== null && (
                <div className="text-right shrink-0">
                  <p className="text-3xl font-black text-amber-400">{activeMeasure.rate}%</p>
                  <p className="text-[10px] text-indigo-300">Panel rate ({activeMeasure.inNumer}/{activeMeasure.inDenom})</p>
                </div>
              )}
            </div>
          </div>
          <div className="bg-white p-5 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
            <div>
              <p className="font-black text-slate-700 uppercase tracking-widest text-[10px] mb-1.5">Numerator</p>
              <p className="text-slate-600 leading-relaxed">{activeMeasure.meta.numeratorDef}</p>
            </div>
            <div>
              <p className="font-black text-slate-700 uppercase tracking-widest text-[10px] mb-1.5">Denominator</p>
              <p className="text-slate-600 leading-relaxed">{activeMeasure.meta.denominatorDef}</p>
            </div>
            <div>
              <p className="font-black text-slate-700 uppercase tracking-widest text-[10px] mb-1.5">Data Source</p>
              <p className="text-slate-600 leading-relaxed">{activeMeasure.meta.dataSource}</p>
            </div>
            {activeMeasure.meta.vermont && (
              <div className="sm:col-span-3 bg-emerald-50 border border-emerald-200 rounded-lg p-3">
                <p className="text-[10px] font-black uppercase tracking-widest text-emerald-700 mb-1">Vermont AHEAD Context</p>
                <p className="text-emerald-800 leading-relaxed">{activeMeasure.meta.vermont}</p>
              </div>
            )}
            {activeMeasure.meta.loincCodes && (
              <div className="sm:col-span-3">
                <p className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-1">LOINC Codes for Numerator Capture</p>
                <div className="flex flex-wrap gap-2">{activeMeasure.meta.loincCodes.map(c => <span key={c} className="font-mono text-xs px-2 py-0.5 bg-amber-100 text-amber-800 rounded border border-amber-200">{c}</span>)}</div>
              </div>
            )}
          </div>

          {/* Per-patient gap table */}
          <div className="border-t border-slate-200">
            <p className="text-[10px] font-black uppercase tracking-widest text-slate-500 px-5 pt-4 pb-2">Patient-Level Detail</p>
            <table className="w-full text-xs">
              <thead>
                <tr className="bg-slate-50 text-slate-600">
                  <th className="text-left px-4 py-2 font-bold">Patient</th>
                  <th className="text-center px-4 py-2 font-bold">Status</th>
                  <th className="text-left px-4 py-2 font-bold">Gap / Note</th>
                  <th className="text-left px-4 py-2 font-bold">Closing Action</th>
                </tr>
              </thead>
              <tbody>
                {patientGapsForMeasure.map(({ patient, status }) => status && (
                  <tr key={patient.id} className="border-t border-slate-100 hover:bg-slate-50">
                    <td className="px-4 py-3">
                      <p className="font-bold text-slate-800">{patient.name}</p>
                      <p className="text-slate-400">{patient.age}y · {patient.payer}</p>
                    </td>
                    <td className="px-4 py-3 text-center">
                      {status.inNumerator
                        ? <span className="flex items-center justify-center gap-1 text-emerald-600"><CheckCircle size={14} /> Met</span>
                        : <span className="flex items-center justify-center gap-1 text-red-600"><XCircle size={14} /> Gap</span>}
                    </td>
                    <td className="px-4 py-3 text-slate-600 max-w-[200px]">{status.gapDescription ?? (status.inNumerator ? 'Measure satisfied' : 'Not documented')}</td>
                    <td className="px-4 py-3 text-slate-600 max-w-[200px]">{status.closingAction ?? '—'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* All-patient HEDIS grid */}
      <div>
        <p className="text-xs font-black uppercase tracking-widest text-slate-500 mb-3">Full Panel — All Patients × All Measures</p>
        <div className="overflow-x-auto rounded-xl border border-slate-200">
          <table className="w-full text-xs">
            <thead>
              <tr className="bg-slate-900 text-white">
                <th className="text-left px-4 py-3 font-bold sticky left-0 bg-slate-900 z-10 min-w-[140px]">Patient</th>
                {allMeasureCodes.map(c => <th key={c} className="px-2 py-3 font-bold text-center whitespace-nowrap text-[10px]">{c}</th>)}
              </tr>
            </thead>
            <tbody>
              {SYNTHETIC_PATIENTS.map(p => (
                <tr key={p.id} className="border-t border-slate-100 hover:bg-slate-50">
                  <td className="px-4 py-2 sticky left-0 bg-white z-10 border-r border-slate-200">
                    <p className="font-bold text-slate-800">{p.name}</p>
                    <p className="text-slate-400 text-[10px]">{p.payer}</p>
                  </td>
                  {allMeasureCodes.map(code => {
                    const status = p.hedisStatus.find(h => h.code === code);
                    if (!status) return <td key={code} className="px-2 py-2 text-center text-slate-300">—</td>;
                    if (!status.inDenominator) return <td key={code} className="px-2 py-2 text-center"><span className="text-[10px] text-slate-300">N/A</span></td>;
                    return (
                      <td key={code} className="px-2 py-2 text-center">
                        {status.inNumerator
                          ? <CheckCircle size={14} className="text-emerald-500 mx-auto" />
                          : <XCircle size={14} className="text-red-500 mx-auto" />}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// ─── 30-DAY READMISSION VIEW ──────────────────────────────────────────────────

function ReadmissionView() {
  const readmissions = useMemo(() => computeReadmissions(), []);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const totalInpatient = SYNTHETIC_PATIENTS.flatMap(p => p.encounters).filter(e => e.type === 'inpatient' && !e.readmission).length;
  const readmitRate = totalInpatient > 0 ? ((readmissions.length / totalInpatient) * 100).toFixed(1) : '0';

  return (
    <div>
      <div className="mb-4 p-4 bg-blue-50 border border-blue-200 rounded-xl">
        <p className="text-xs text-blue-800 leading-relaxed">
          <strong>CMS 30-Day Readmission:</strong> CMS measures all-cause 30-day readmission for AMI, HF, pneumonia, COPD, stroke, and CABG under the Hospital Readmissions Reduction Program (HRRP). For ACOs and VBC contracts, 30-day readmission is tracked across all conditions. A readmission within 30 days of a qualifying index discharge is attributed to the discharging hospital unless an exclusion applies (planned procedure, transfer, death). Under Vermont AHEAD, hospitals face financial penalties for excess readmissions above a risk-adjusted expected rate.
        </p>
      </div>

      {/* Panel stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
        {[
          { label: 'Index Admissions', value: totalInpatient, color: 'text-slate-900' },
          { label: '30-Day Readmissions', value: readmissions.length, color: 'text-red-600' },
          { label: 'Panel Readmit Rate', value: `${readmitRate}%`, color: readmissions.length > 1 ? 'text-red-600' : 'text-emerald-600' },
          { label: 'Preventable Readmits', value: readmissions.filter(r => r.preventable).length, color: 'text-amber-600' },
        ].map(s => (
          <div key={s.label} className="p-4 bg-white border border-slate-200 rounded-xl text-center">
            <p className={`text-2xl font-black ${s.color}`}>{s.value}</p>
            <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500 mt-1">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Methodology note */}
      <div className="mb-4 bg-slate-900 rounded-xl p-5 text-white">
        <p className="text-xs font-black uppercase tracking-widest text-slate-400 mb-2">CMS RSRR Methodology (Simplified)</p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs text-slate-300">
          <div><p className="font-bold text-white mb-1">Step 1 — Identify Index</p><p>Any inpatient admission (not a planned procedure, not a transfer). Must be discharged alive.</p></div>
          <div><p className="font-bold text-white mb-1">Step 2 — 30-Day Window</p><p>Count any subsequent inpatient admission within 30 days of discharge, regardless of diagnosis.</p></div>
          <div><p className="font-bold text-white mb-1">Step 3 — Risk Adjustment</p><p>Expected rate adjusted by patient demographics and HCC diagnoses present at the index admission. Compare actual vs. expected using hierarchical logistic regression.</p></div>
        </div>
      </div>

      {/* Readmission records */}
      {readmissions.length === 0 ? (
        <div className="text-center py-8 text-slate-400">No 30-day readmissions in this panel to display.</div>
      ) : (
        <div className="space-y-3">
          {readmissions.map(r => {
            const key = `${r.patient.id}-${r.readmitEncounter.id}`;
            const open = expandedId === key;
            return (
              <div key={key} className={`border rounded-xl overflow-hidden ${open ? 'border-red-300' : 'border-slate-200'}`}>
                <button onClick={() => setExpandedId(open ? null : key)} className={`w-full flex items-start gap-3 px-5 py-4 text-left ${open ? 'bg-red-50' : 'bg-white hover:bg-slate-50'}`}>
                  {open ? <ChevronDown size={14} className="text-red-600 mt-0.5" /> : <ChevronRight size={14} className="text-slate-400 mt-0.5" />}
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-3 mb-1">
                      <span className="font-black text-slate-900">{r.patient.name}</span>
                      <span className="text-xs text-slate-500">{r.patient.age}y · {r.patient.payer}</span>
                      <span className="px-2 py-0.5 text-[10px] font-bold rounded-full bg-red-100 text-red-700 border border-red-200">30-Day Readmission</span>
                      {r.preventable && <span className="px-2 py-0.5 text-[10px] font-bold rounded-full bg-amber-100 text-amber-700 border border-amber-200">Potentially Preventable</span>}
                    </div>
                    <p className="text-xs text-slate-600">Index: {r.indexEncounter.admitDate} → {r.indexEncounter.dischargeDate} · Readmit: {r.readmitEncounter.admitDate} · <strong>{r.daysToReadmit} days</strong></p>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="text-lg font-black text-red-600">Day {r.daysToReadmit}</p>
                    <p className="text-[10px] text-slate-500">post-discharge</p>
                  </div>
                </button>
                {open && (
                  <div className="px-5 pb-5 bg-white border-t border-slate-100">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4 text-xs">
                      <div className="p-4 bg-slate-50 rounded-xl">
                        <p className="font-black uppercase tracking-widest text-[10px] text-slate-500 mb-2">Index Admission</p>
                        <p className="font-bold text-slate-800">{r.indexEncounter.drgDescription ?? r.indexEncounter.principalDx}</p>
                        <p className="text-slate-500 mt-1">{r.indexEncounter.admitDate} → {r.indexEncounter.dischargeDate}</p>
                        <p className="text-slate-500">DRG: {r.indexEncounter.drg} · Cost: ${r.indexEncounter.totalCost.toLocaleString()}</p>
                      </div>
                      <div className="p-4 bg-red-50 rounded-xl">
                        <p className="font-black uppercase tracking-widest text-[10px] text-red-600 mb-2">Readmission ({r.daysToReadmit} days later)</p>
                        <p className="font-bold text-slate-800">{r.readmitEncounter.drgDescription ?? r.readmitEncounter.principalDx}</p>
                        <p className="text-slate-500 mt-1">{r.readmitEncounter.admitDate} → {r.readmitEncounter.dischargeDate}</p>
                        <p className="text-slate-500">Cost: ${r.readmitEncounter.totalCost.toLocaleString()}</p>
                      </div>
                    </div>
                    {r.preventable && (
                      <div className="mt-4 p-4 bg-amber-50 border border-amber-200 rounded-xl">
                        <p className="text-[10px] font-black uppercase tracking-widest text-amber-700 mb-1">Root Cause & Prevention Opportunity</p>
                        <p className="text-xs text-amber-800 leading-relaxed">{r.preventionNote}</p>
                      </div>
                    )}
                    <div className="mt-4 p-4 bg-indigo-50 border border-indigo-200 rounded-xl">
                      <p className="text-[10px] font-black uppercase tracking-widest text-indigo-700 mb-1">Risk Adjustment Context</p>
                      <p className="text-xs text-indigo-800">HCC RAF Score at index: <strong>{r.patient.rafScore}</strong> (panel average: 1.33). Risk tier: <strong>{r.patient.riskTier}</strong>. Higher RAF score means CMS expects a higher readmission rate — this patient would need a higher O/E ratio before triggering a penalty.</p>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* All inpatient encounters table */}
      <div className="mt-6">
        <p className="text-xs font-black uppercase tracking-widest text-slate-500 mb-3">All Inpatient & ED Encounters — Full Panel</p>
        <div className="overflow-x-auto rounded-xl border border-slate-200">
          <table className="w-full text-xs">
            <thead><tr className="bg-slate-900 text-white"><th className="text-left px-4 py-2 font-bold">Patient</th><th className="px-4 py-2 font-bold text-left">Type</th><th className="px-4 py-2 font-bold text-left">Dates</th><th className="px-4 py-2 font-bold text-left">Principal Dx</th><th className="px-4 py-2 font-bold text-right">Cost</th><th className="px-4 py-2 font-bold text-center">Flag</th></tr></thead>
            <tbody>
              {SYNTHETIC_PATIENTS.flatMap(p => p.encounters.filter(e => e.type === 'inpatient' || e.type === 'ed' || e.type === 'snf').map(e => ({ ...e, patient: p }))).sort((a, b) => a.admitDate.localeCompare(b.admitDate)).map(e => (
                <tr key={e.id} className="border-t border-slate-100 hover:bg-slate-50">
                  <td className="px-4 py-2 font-bold text-slate-800">{e.patient.name}</td>
                  <td className="px-4 py-2"><span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${e.type === 'inpatient' ? 'bg-slate-100 text-slate-700' : e.type === 'ed' ? 'bg-red-100 text-red-700' : 'bg-amber-100 text-amber-700'}`}>{e.type}</span></td>
                  <td className="px-4 py-2 font-mono text-slate-500">{e.admitDate}{e.type !== 'ed' ? ` → ${e.dischargeDate}` : ''}</td>
                  <td className="px-4 py-2 text-slate-700">{e.principalDx}</td>
                  <td className="px-4 py-2 text-right font-bold text-slate-700">${e.totalCost.toLocaleString()}</td>
                  <td className="px-4 py-2 text-center">
                    {e.readmission && <span className="px-1.5 py-0.5 bg-red-100 text-red-700 rounded text-[9px] font-bold">Readmit</span>}
                    {e.avoidable && !e.readmission && <span className="px-1.5 py-0.5 bg-amber-100 text-amber-700 rounded text-[9px] font-bold">Avoidable</span>}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// ─── AVOIDABLE ED VIEW ────────────────────────────────────────────────────────

function AvoidableEDView() {
  const avoidableEDs = useMemo(() =>
    SYNTHETIC_PATIENTS.flatMap(p =>
      p.encounters.filter(e => e.type === 'ed' && e.avoidable).map(e => ({ ...e, patient: p }))
    ), []
  );
  const totalEDs = SYNTHETIC_PATIENTS.flatMap(p => p.encounters.filter(e => e.type === 'ed')).length;
  const avoidableCost = avoidableEDs.reduce((s, e) => s + e.totalCost, 0);

  return (
    <div>
      <div className="mb-4 p-4 bg-blue-50 border border-blue-200 rounded-xl">
        <p className="text-xs text-blue-800 leading-relaxed">
          <strong>AHRQ Prevention Quality Indicators (PQIs):</strong> PQIs identify ambulatory care–sensitive conditions (ACSCs) — diagnoses where timely and effective outpatient care can prevent or reduce the need for ED visits or hospitalizations. Under VBC contracts, ACOs are measured on ACSC admission rates and bear financial risk for preventable utilization. Vermont AHEAD specifically tracks PQI #1 (Diabetes), PQI #5 (COPD), and PQI #8 (CHF) as VBC performance metrics.
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
        {[
          { label: 'Total ED Visits', value: totalEDs, color: 'text-slate-900' },
          { label: 'Avoidable (ACSC)', value: avoidableEDs.length, color: 'text-red-600' },
          { label: 'Avoidable Rate', value: `${Math.round((avoidableEDs.length / totalEDs) * 100)}%`, color: 'text-red-600' },
          { label: 'Avoidable Cost', value: `$${avoidableCost.toLocaleString()}`, color: 'text-amber-600' },
        ].map(s => (
          <div key={s.label} className="p-4 bg-white border border-slate-200 rounded-xl text-center">
            <p className={`text-2xl font-black ${s.color}`}>{s.value}</p>
            <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500 mt-1">{s.label}</p>
          </div>
        ))}
      </div>

      <div className="space-y-3">
        {avoidableEDs.map(e => {
          const acsc = ACSC_CONDITIONS[e.principalDx];
          return (
            <div key={e.id} className="border border-amber-200 rounded-xl p-4 bg-amber-50">
              <div className="flex flex-wrap items-start justify-between gap-3 mb-2">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-black text-slate-900">{e.patient.name}</span>
                    <span className="text-xs text-slate-500">{e.patient.age}y · {e.patient.payer}</span>
                    {acsc && <span className="px-2 py-0.5 text-[10px] font-bold rounded-full bg-amber-200 text-amber-900">{acsc.pqiNumber}</span>}
                  </div>
                  <p className="text-xs text-slate-600 font-bold">{e.admitDate} — ED Visit</p>
                </div>
                <div className="text-right">
                  <p className="text-lg font-black text-amber-700">${e.totalCost.toLocaleString()}</p>
                  <p className="text-[10px] text-slate-500">Encounter cost</p>
                </div>
              </div>
              {acsc && (
                <div className="mb-2">
                  <p className="text-[10px] font-black uppercase tracking-widest text-amber-700 mb-0.5">ACSC Classification</p>
                  <p className="text-xs text-amber-900">{acsc.description}</p>
                </div>
              )}
              <div className="mt-2 p-3 bg-white rounded-lg border border-amber-200">
                <p className="text-[10px] font-black uppercase tracking-widest text-slate-600 mb-0.5">Root Cause</p>
                <p className="text-xs text-slate-700 leading-relaxed">{e.avoidableReason}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ─── MAIN COMPONENT ───────────────────────────────────────────────────────────

type DashTab = 'hedis' | 'readmission' | 'ed';

const DASH_TABS: { id: DashTab; label: string; desc: string }[] = [
  { id: 'hedis', label: 'HEDIS Quality Panel', desc: 'Measure rates & gaps' },
  { id: 'readmission', label: '30-Day Readmissions', desc: 'CMS RSRR methodology' },
  { id: 'ed', label: 'Avoidable ED Visits', desc: 'AHRQ PQI analysis' },
];

export default function VBCQualityDashboard() {
  const [tab, setTab] = useState<DashTab>('hedis');

  return (
    <div>
      <nav className="flex flex-wrap items-end border border-slate-200 rounded-t-xl px-2 bg-slate-50/80 pt-2 gap-y-1 mb-6">
        {DASH_TABS.map(t => (
          <button key={t.id} onClick={() => setTab(t.id)} className={`relative flex items-center gap-1.5 px-4 py-2 text-sm font-bold transition-all whitespace-nowrap rounded-t-xl border-t border-l border-r mr-1 ${tab === t.id ? 'bg-slate-100 border-slate-800 text-slate-900 z-10 -mb-px' : 'bg-white border-slate-200 text-slate-500 hover:bg-slate-50 hover:text-slate-700 mt-1.5 shadow-sm'}`}>
            {t.label}<span className="hidden sm:inline text-[10px] font-normal text-slate-400"> — {t.desc}</span>
          </button>
        ))}
      </nav>
      {tab === 'hedis' && <HEDISPanelView />}
      {tab === 'readmission' && <ReadmissionView />}
      {tab === 'ed' && <AvoidableEDView />}
    </div>
  );
}
