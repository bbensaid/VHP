"use client";

import { useState, useMemo } from "react";
import { CheckCircle, XCircle, AlertTriangle, TrendingDown, TrendingUp } from "lucide-react";
import { SYNTHETIC_PATIENTS, CHOOSING_WISELY_FLAGS } from "@/lib/syntheticPatients";

// ─── A1C / BP PANEL MANAGEMENT ────────────────────────────────────────────────

function A1CBPPanel() {
  const [metric, setMetric] = useState<'a1c' | 'bp'>('a1c');

  const diabeticPatients = useMemo(() =>
    SYNTHETIC_PATIENTS.filter(p =>
      p.diagnoses.some(d => d.icd10.startsWith('E11') || d.icd10.startsWith('E10'))
    ), []
  );

  const hypertensivePatients = useMemo(() =>
    SYNTHETIC_PATIENTS.filter(p =>
      p.diagnoses.some(d => d.icd10 === 'I10')
    ), []
  );

  const a1cData = useMemo(() => diabeticPatients.map(p => {
    const labs = p.labs.filter(l => l.loincCode === '4548-4').sort((a, b) => b.date.localeCompare(a.date));
    const latest = labs[0];
    const controlled = latest ? latest.value < 8.0 : false;
    const history = labs.slice(0, 4).reverse();
    const trend = labs.length >= 2 ? (labs[0].value < labs[1].value ? 'improving' : labs[0].value > labs[1].value ? 'worsening' : 'stable') : 'stable';
    const vbcValue = controlled ? 0 : Math.round((latest?.value ?? 0 - 8.0) * 1200);
    return { patient: p, latest, controlled, history, trend, vbcValue };
  }), [diabeticPatients]);

  const bpData = useMemo(() => hypertensivePatients.map(p => {
    const sys = p.labs.filter(l => l.loincCode === '8480-6').sort((a, b) => b.date.localeCompare(a.date));
    const dia = p.labs.filter(l => l.loincCode === '8462-4').sort((a, b) => b.date.localeCompare(a.date));
    const latestSys = sys[0];
    const latestDia = dia[0];
    const controlled = latestSys ? latestSys.value < 140 && (latestDia?.value ?? 0) < 90 : false;
    const trend = sys.length >= 2 ? (sys[0].value < sys[1].value ? 'improving' : sys[0].value > sys[1].value ? 'worsening' : 'stable') : 'stable';
    return { patient: p, latestSys, latestDia, controlled, trend };
  }), [hypertensivePatients]);

  const a1cControlledN = a1cData.filter(d => d.controlled).length;
  const bpControlledN = bpData.filter(d => d.controlled).length;

  // Shared savings model:
  // A1C: moving 1 uncontrolled T2DM patient to controlled = ~$1,200/year in VBC quality bonus + utilization savings
  // BP: moving 1 uncontrolled HTN patient to controlled = ~$800/year in VBC quality bonus
  const potentialA1CSavings = a1cData.filter(d => !d.controlled).length * 1200;
  const potentialBPSavings = bpData.filter(d => !d.controlled).length * 800;

  function trendIcon(trend: string) {
    if (trend === 'improving') return <TrendingDown size={12} className="text-emerald-600" />;
    if (trend === 'worsening') return <TrendingUp size={12} className="text-red-600" />;
    return <span className="text-xs text-slate-400">→</span>;
  }

  return (
    <div>
      <div className="mb-4 p-4 bg-blue-50 border border-blue-200 rounded-xl">
        <p className="text-xs text-blue-800 leading-relaxed">
          <strong>Panel Management in VBC:</strong> In a value-based care contract, moving patients from uncontrolled to controlled status has a direct financial value — both through quality performance scores (HEDIS CDC-HbA1c, CBP) that affect shared savings distribution, and through utilization avoidance (fewer ED visits, hospitalizations). This view quantifies that opportunity across the synthetic panel.
        </p>
      </div>

      {/* Metric toggle */}
      <div className="flex gap-2 mb-6">
        {([['a1c', 'HbA1c (A1C) — Diabetes'], ['bp', 'Blood Pressure — Hypertension']] as const).map(([id, label]) => (
          <button key={id} onClick={() => setMetric(id)} className={`px-4 py-2 text-sm font-bold rounded-xl border transition-all ${metric === id ? 'bg-rose-600 text-white border-rose-600' : 'bg-white text-slate-700 border-slate-200 hover:border-rose-300'}`}>{label}</button>
        ))}
      </div>

      {metric === 'a1c' && (
        <div>
          {/* Summary stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
            {[
              { label: 'Diabetic Patients', value: diabeticPatients.length, color: 'text-slate-900' },
              { label: 'A1C Controlled (<8%)', value: a1cControlledN, color: 'text-emerald-600' },
              { label: 'A1C Uncontrolled', value: a1cData.length - a1cControlledN, color: 'text-red-600' },
              { label: 'VBC Quality Opportunity', value: `$${potentialA1CSavings.toLocaleString()}`, color: 'text-amber-600' },
            ].map(s => (
              <div key={s.label} className="p-4 bg-white border border-slate-200 rounded-xl text-center">
                <p className={`text-2xl font-black ${s.color}`}>{s.value}</p>
                <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500 mt-1">{s.label}</p>
              </div>
            ))}
          </div>

          {/* VBC shared savings explainer */}
          <div className="mb-6 bg-slate-900 rounded-xl p-4 text-white">
            <p className="text-xs font-black uppercase tracking-widest text-slate-400 mb-2">How A1C Control Translates to Shared Savings</p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs text-slate-300">
              <div><p className="font-bold text-amber-400 mb-1">HEDIS Quality Score</p><p>Each 1% improvement in CDC-HbA1c rate boosts the ACO&apos;s quality score. AHEAD weights this measure at 1.5× in the quality performance composite.</p></div>
              <div><p className="font-bold text-amber-400 mb-1">Utilization Avoidance</p><p>Uncontrolled T2DM (A1C &gt;9%) generates ~3× more ED visits and ~2× more hospitalizations vs. controlled. Moving to controlled reduces TCOC by an estimated $1,200–$3,400/patient/year.</p></div>
              <div><p className="font-bold text-amber-400 mb-1">RAF Trajectory</p><p>Persistently uncontrolled T2DM progresses to complications (HCC 18 vs. HCC 19), increasing RAF score and CMS expected TCOC benchmark — but actual costs increase more, eroding savings.</p></div>
            </div>
          </div>

          {/* Per-patient A1C table */}
          <div className="overflow-x-auto rounded-xl border border-slate-200">
            <table className="w-full text-xs">
              <thead><tr className="bg-slate-900 text-white"><th className="text-left px-4 py-3 font-bold">Patient</th><th className="px-4 py-3 font-bold text-center">Latest A1C</th><th className="px-4 py-3 font-bold text-center">Status</th><th className="px-4 py-3 font-bold text-center">Trend</th><th className="px-4 py-3 font-bold text-left">A1C History (oldest → newest)</th><th className="px-4 py-3 font-bold text-right">VBC Opp.</th></tr></thead>
              <tbody>
                {a1cData.map(d => (
                  <tr key={d.patient.id} className="border-t border-slate-100 hover:bg-slate-50">
                    <td className="px-4 py-3">
                      <p className="font-bold text-slate-800">{d.patient.name}</p>
                      <p className="text-slate-400">{d.patient.age}y · {d.patient.payer}</p>
                    </td>
                    <td className="px-4 py-3 text-center">
                      {d.latest ? (
                        <span className={`text-lg font-black ${d.latest.value >= 9 ? 'text-red-600' : d.latest.value >= 8 ? 'text-amber-600' : 'text-emerald-600'}`}>{d.latest.value}%</span>
                      ) : <span className="text-slate-400">—</span>}
                    </td>
                    <td className="px-4 py-3 text-center">
                      {d.controlled
                        ? <span className="flex items-center justify-center gap-1 text-emerald-600 text-[10px] font-bold"><CheckCircle size={12} /> Controlled</span>
                        : <span className="flex items-center justify-center gap-1 text-red-600 text-[10px] font-bold"><XCircle size={12} /> Uncontrolled</span>}
                    </td>
                    <td className="px-4 py-3 text-center">{trendIcon(d.trend)}<span className={`ml-1 text-[10px] ${d.trend === 'improving' ? 'text-emerald-600' : d.trend === 'worsening' ? 'text-red-600' : 'text-slate-400'}`}>{d.trend}</span></td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1">
                        {d.history.map((lab, i) => (
                          <div key={i} className="flex flex-col items-center">
                            <div className={`w-8 rounded text-center text-[10px] font-bold py-0.5 ${lab.value >= 9 ? 'bg-red-100 text-red-700' : lab.value >= 8 ? 'bg-amber-100 text-amber-700' : 'bg-emerald-100 text-emerald-700'}`}>{lab.value}</div>
                            <span className="text-[9px] text-slate-400 mt-0.5">{lab.date.slice(5)}</span>
                          </div>
                        ))}
                      </div>
                    </td>
                    <td className="px-4 py-3 text-right font-bold text-amber-700">{d.controlled ? '—' : `$${d.vbcValue.toLocaleString()}`}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Intervention suggestions for uncontrolled */}
          <div className="mt-6 space-y-2">
            <p className="text-xs font-black uppercase tracking-widest text-slate-500 mb-3">Recommended Interventions for Uncontrolled Patients</p>
            {a1cData.filter(d => !d.controlled).map(d => {
              const gaps = d.patient.hedisStatus.filter(h => h.inDenominator && !h.inNumerator);
              return (
                <div key={d.patient.id} className="p-4 border border-red-200 bg-red-50 rounded-xl">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="font-black text-slate-800">{d.patient.name} — A1C {d.latest?.value}%</p>
                      <p className="text-xs text-slate-500 mt-0.5">RAF: {d.patient.rafScore} · Risk tier: {d.patient.riskTier}</p>
                    </div>
                    <span className="text-sm font-black text-amber-700">Δ${d.vbcValue.toLocaleString()}/yr</span>
                  </div>
                  {gaps.length > 0 && (
                    <div className="mt-2 flex flex-wrap gap-1.5">{gaps.map(g => <span key={g.code} className="px-2 py-0.5 bg-red-100 text-red-800 text-[10px] font-bold rounded border border-red-200">Gap: {g.code}</span>)}</div>
                  )}
                  {d.patient.sdohFlags.length > 0 && (
                    <div className="mt-2 flex flex-wrap gap-1.5">{d.patient.sdohFlags.map(f => <span key={f} className="px-2 py-0.5 bg-amber-100 text-amber-800 text-[10px] rounded border border-amber-200">SDOH: {f}</span>)}</div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {metric === 'bp' && (
        <div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
            {[
              { label: 'HTN Patients', value: hypertensivePatients.length, color: 'text-slate-900' },
              { label: 'BP Controlled (<140/90)', value: bpControlledN, color: 'text-emerald-600' },
              { label: 'BP Uncontrolled', value: bpData.length - bpControlledN, color: 'text-red-600' },
              { label: 'VBC Opportunity', value: `$${potentialBPSavings.toLocaleString()}`, color: 'text-amber-600' },
            ].map(s => (
              <div key={s.label} className="p-4 bg-white border border-slate-200 rounded-xl text-center">
                <p className={`text-2xl font-black ${s.color}`}>{s.value}</p>
                <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500 mt-1">{s.label}</p>
              </div>
            ))}
          </div>

          <div className="overflow-x-auto rounded-xl border border-slate-200">
            <table className="w-full text-xs">
              <thead><tr className="bg-slate-900 text-white"><th className="text-left px-4 py-3 font-bold">Patient</th><th className="px-4 py-3 font-bold text-center">Latest BP</th><th className="px-4 py-3 font-bold text-center">Status</th><th className="px-4 py-3 font-bold text-center">Trend</th><th className="px-4 py-3 font-bold text-left">Notes</th></tr></thead>
              <tbody>
                {bpData.map(d => (
                  <tr key={d.patient.id} className="border-t border-slate-100 hover:bg-slate-50">
                    <td className="px-4 py-3"><p className="font-bold text-slate-800">{d.patient.name}</p><p className="text-slate-400">{d.patient.age}y · {d.patient.payer}</p></td>
                    <td className="px-4 py-3 text-center">
                      {d.latestSys ? (
                        <span className={`text-lg font-black ${d.latestSys.value >= 160 ? 'text-red-600' : d.latestSys.value >= 140 ? 'text-amber-600' : 'text-emerald-600'}`}>
                          {d.latestSys.value}/{d.latestDia?.value ?? '?'}
                        </span>
                      ) : <span className="text-slate-400">—</span>}
                    </td>
                    <td className="px-4 py-3 text-center">
                      {d.controlled
                        ? <span className="flex items-center justify-center gap-1 text-emerald-600 text-[10px] font-bold"><CheckCircle size={12} /> Controlled</span>
                        : <span className="flex items-center justify-center gap-1 text-red-600 text-[10px] font-bold"><XCircle size={12} /> Uncontrolled</span>}
                    </td>
                    <td className="px-4 py-3 text-center">{trendIcon(d.trend)}</td>
                    <td className="px-4 py-3 text-slate-600">{!d.controlled ? d.patient.hedisStatus.find(h => h.code === 'CBP')?.closingAction ?? '—' : 'CBP measure satisfied'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-4 p-4 bg-indigo-50 border border-indigo-200 rounded-xl">
            <p className="text-xs font-black uppercase tracking-widest text-indigo-700 mb-2">Maria Gonzalez — RPM Success Case</p>
            <p className="text-xs text-indigo-800 leading-relaxed">Maria&apos;s BP dropped from 162/98 to 124/76 after RPM enrollment. Vermont AHEAD includes an RPM benefit for Medicare and Medicaid patients. Program cost: ~$480/year (CPT 99453 + 99457 × 12). Estimated avoidance: $4,200/year in ED/inpatient spend. ROI: 8.75× in year 1. At scale across a 500-patient hypertensive panel, the program generates ~$2.1M in net savings.</p>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── CHOOSING WISELY SCAN ──────────────────────────────────────────────────────

function ChoosingWiselyScan() {
  const [expandedFlag, setExpandedFlag] = useState<string | null>(null);

  const flagsWithPatients = useMemo(() => CHOOSING_WISELY_FLAGS.map(flag => {
    const patients = SYNTHETIC_PATIENTS.filter(p => flag.affectedPatients.includes(p.id));
    const encounters = patients.flatMap(p =>
      p.encounters.filter(e => e.cptCodes.some(cpt => flag.cptCodes.includes(cpt)))
    );
    const totalWaste = encounters.length * flag.estimatedWastePerEvent;
    return { flag, patients, encounters, totalWaste };
  }), []);

  const totalPotentialWaste = flagsWithPatients.reduce((s, f) => s + f.totalWaste, 0);

  return (
    <div>
      <div className="mb-4 p-4 bg-blue-50 border border-blue-200 rounded-xl">
        <p className="text-xs text-blue-800 leading-relaxed">
          <strong>Choosing Wisely</strong> is a ABIM Foundation initiative where medical specialty societies identify services that are commonly ordered but lack evidence of benefit — or that carry risks without corresponding benefit. In VBC, identifying Choosing Wisely services in claims data is a core high-value/low-value care analysis. These are not billing fraud — they are clinically ordered but evidence-based guidelines suggest they be deprescribed or reduced.
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-6">
        {[
          { label: 'Choosing Wisely Flags', value: CHOOSING_WISELY_FLAGS.length, color: 'text-slate-900' },
          { label: 'Flags Triggered (Panel)', value: flagsWithPatients.filter(f => f.encounters.length > 0).length, color: 'text-amber-600' },
          { label: 'Potential Waste', value: `$${totalPotentialWaste.toLocaleString()}`, color: 'text-red-600' },
        ].map(s => (
          <div key={s.label} className="p-4 bg-white border border-slate-200 rounded-xl text-center">
            <p className={`text-2xl font-black ${s.color}`}>{s.value}</p>
            <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500 mt-1">{s.label}</p>
          </div>
        ))}
      </div>

      <div className="space-y-3">
        {flagsWithPatients.map(({ flag, patients, encounters, totalWaste }) => {
          const triggered = encounters.length > 0;
          const open = expandedFlag === flag.id;
          const gradeColor = { A: 'bg-red-100 text-red-800 border-red-200', B: 'bg-amber-100 text-amber-800 border-amber-200', C: 'bg-slate-100 text-slate-700 border-slate-200' };

          return (
            <div key={flag.id} className={`border rounded-xl overflow-hidden ${triggered ? (open ? 'border-amber-400' : 'border-amber-200') : 'border-slate-200'}`}>
              <button onClick={() => setExpandedFlag(open ? null : flag.id)} className={`w-full flex items-start gap-3 px-4 py-3 text-left ${open ? 'bg-amber-50' : triggered ? 'bg-amber-50/40 hover:bg-amber-50' : 'bg-white hover:bg-slate-50'}`}>
                <div className={`shrink-0 w-5 h-5 rounded-full border-2 mt-0.5 flex items-center justify-center ${triggered ? 'border-amber-500 bg-amber-500' : 'border-slate-300'}`}>
                  {triggered && <AlertTriangle size={10} className="text-white" />}
                </div>
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded border ${gradeColor[flag.evidenceGrade]}`}>Grade {flag.evidenceGrade}</span>
                    <span className="text-[10px] text-slate-500 font-bold">{flag.sponsoringOrganization}</span>
                    {triggered && <span className="text-[10px] font-black text-amber-700">⚑ Triggered in panel</span>}
                  </div>
                  <p className="text-xs font-bold text-slate-800 leading-snug">{flag.recommendation}</p>
                </div>
                <div className="text-right shrink-0">
                  {triggered ? <p className="font-black text-amber-700">${totalWaste.toLocaleString()}</p> : <p className="text-slate-400 text-xs">$0</p>}
                  <p className="text-[9px] text-slate-400">est. waste</p>
                </div>
              </button>
              {open && (
                <div className="px-4 pb-4 bg-white border-t border-slate-100">
                  <div className="mt-3 grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs mb-3">
                    <div><p className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-1">CPT Codes Flagged</p><div className="flex flex-wrap gap-1">{flag.cptCodes.map(c => <span key={c} className="font-mono px-1.5 py-0.5 bg-slate-100 text-slate-700 rounded">{c}</span>)}</div></div>
                    <div><p className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-1">Trigger Diagnoses</p><div className="flex flex-wrap gap-1">{flag.icd10Triggers.map(c => <span key={c} className="font-mono px-1.5 py-0.5 bg-rose-100 text-rose-700 rounded">{c}</span>)}</div></div>
                    <div><p className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-1">Waste / Event</p><p className="font-black text-amber-700">${flag.estimatedWastePerEvent}</p></div>
                  </div>
                  {patients.length > 0 && (
                    <div>
                      <p className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-2">Affected Patients</p>
                      {patients.map(p => {
                        const ptEncs = p.encounters.filter(e => e.cptCodes.some(c => flag.cptCodes.includes(c)));
                        return (
                          <div key={p.id} className="p-3 bg-amber-50 border border-amber-200 rounded-lg mb-2">
                            <p className="font-bold text-slate-800 text-xs">{p.name} — {ptEncs.length} qualifying encounter{ptEncs.length > 1 ? 's' : ''}</p>
                            <p className="text-[10px] text-amber-700 mt-0.5">Estimated waste: ${(ptEncs.length * flag.estimatedWastePerEvent).toLocaleString()}</p>
                            <div className="mt-1 flex flex-wrap gap-1">
                              {ptEncs.map(e => (
                                <span key={e.id} className="text-[10px] font-mono bg-white border border-amber-200 px-1.5 py-0.5 rounded">{e.admitDate}: CPT {flag.cptCodes.filter(c => e.cptCodes.includes(c)).join(', ')}</span>
                              ))}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ─── TCOC DECOMPOSITION ───────────────────────────────────────────────────────

function TCOCDecomposition() {
  const [selectedId, setSelectedId] = useState<string>(SYNTHETIC_PATIENTS[7].id); // Default to William (highest cost)

  const patient = useMemo(() => SYNTHETIC_PATIENTS.find(p => p.id === selectedId)!, [selectedId]);

  const breakdown = useMemo(() => {
    const byType: Record<string, number> = {};
    patient.encounters.forEach(e => {
      byType[e.type] = (byType[e.type] ?? 0) + e.totalCost;
    });
    const total = Object.values(byType).reduce((s, v) => s + v, 0);
    const categories = [
      { key: 'inpatient', label: 'Inpatient', color: 'bg-red-500', modifiable: 'Partially' },
      { key: 'snf', label: 'SNF/Post-Acute', color: 'bg-orange-500', modifiable: 'Highly modifiable' },
      { key: 'ed', label: 'Emergency Dept', color: 'bg-amber-500', modifiable: 'Highly modifiable' },
      { key: 'office', label: 'Outpatient/Office', color: 'bg-emerald-500', modifiable: 'Fixed/low' },
      { key: 'telehealth', label: 'Telehealth', color: 'bg-sky-500', modifiable: 'Fixed/low' },
    ];
    return categories.map(c => ({
      ...c,
      cost: byType[c.key] ?? 0,
      pct: total > 0 ? Math.round(((byType[c.key] ?? 0) / total) * 100) : 0,
    })).filter(c => c.cost > 0);
  }, [patient]);

  const claimsTotal = breakdown.reduce((s, c) => s + c.cost, 0);
  const totalPMPY = patient.totalCostPMPY;
  const otherCost = totalPMPY - claimsTotal; // pharmacy, DME, etc.

  const fullBreakdown = [
    ...breakdown,
    ...(otherCost > 0 ? [{ key: 'other', label: 'Pharmacy & DME (est.)', color: 'bg-violet-500', modifiable: 'Variable', cost: otherCost, pct: Math.round((otherCost / totalPMPY) * 100) }] : []),
  ];

  return (
    <div>
      <div className="mb-4 p-4 bg-blue-50 border border-blue-200 rounded-xl">
        <p className="text-xs text-blue-800 leading-relaxed">
          <strong>Total Cost of Care (TCOC) Decomposition:</strong> In VBC, understanding where costs come from is the first step to managing them. Inpatient and SNF/post-acute spend are typically the most modifiable — the highest ROI interventions (care transitions, RPM, preferred SNF networks) directly target these categories. Outpatient primary care spend is low and largely fixed — but investing in primary care access reduces the high-cost categories downstream.
        </p>
      </div>

      {/* Patient selector */}
      <div className="mb-4">
        <p className="text-xs font-black uppercase tracking-widest text-slate-500 mb-2">Select Patient</p>
        <div className="flex flex-wrap gap-2">
          {SYNTHETIC_PATIENTS.map(p => (
            <button key={p.id} onClick={() => setSelectedId(p.id)} className={`px-3 py-1.5 text-xs font-bold rounded-lg border transition-all ${selectedId === p.id ? 'bg-emerald-600 text-white border-emerald-600' : 'bg-white text-slate-700 border-slate-200 hover:border-emerald-300'}`}>
              {p.name.split(' ')[0]} (${(p.totalCostPMPY / 1000).toFixed(0)}k)
            </button>
          ))}
        </div>
      </div>

      {/* Patient header */}
      <div className="mb-6 p-4 bg-slate-900 rounded-xl text-white">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-xs text-slate-400 uppercase tracking-widest font-bold mb-0.5">{patient.scenario}</p>
            <h4 className="font-black text-lg">{patient.name}</h4>
            <p className="text-sm text-slate-300">{patient.age}y · {patient.payer} · RAF {patient.rafScore} · {patient.riskTier.replace('-', ' ')} risk</p>
          </div>
          <div className="text-right">
            <p className="text-3xl font-black text-amber-400">${(totalPMPY / 1000).toFixed(0)}K</p>
            <p className="text-[10px] text-slate-400">Total PMPY</p>
          </div>
        </div>
      </div>

      {/* Waterfall bars */}
      <div className="mb-6 space-y-2">
        {fullBreakdown.map(c => (
          <div key={c.key} className="flex items-center gap-3">
            <div className="w-32 shrink-0 text-right">
              <p className="text-xs font-bold text-slate-700">{c.label}</p>
              <p className="text-[10px] text-slate-500">{c.modifiable}</p>
            </div>
            <div className="flex-1 h-8 bg-slate-100 rounded-lg overflow-hidden">
              <div className={`h-full ${c.color} rounded-lg transition-all duration-500 flex items-center justify-end pr-2`} style={{ width: `${Math.max(c.pct, 2)}%` }}>
                <span className="text-white text-xs font-black">{c.pct}%</span>
              </div>
            </div>
            <div className="w-24 shrink-0">
              <p className="text-sm font-black text-slate-800">${c.cost.toLocaleString()}</p>
            </div>
          </div>
        ))}
        <div className="flex items-center gap-3 pt-2 border-t border-slate-200">
          <div className="w-32 shrink-0 text-right"><p className="text-xs font-black text-slate-900">TOTAL PMPY</p></div>
          <div className="flex-1 h-8" />
          <div className="w-24 shrink-0"><p className="text-sm font-black text-slate-900">${totalPMPY.toLocaleString()}</p></div>
        </div>
      </div>

      {/* Modifiable vs fixed analysis */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        {(() => {
          const modifiable = fullBreakdown.filter(c => c.modifiable.includes('modifiable')).reduce((s, c) => s + c.cost, 0);
          const fixed = totalPMPY - modifiable;
          return [
            { label: 'Highly/Partially Modifiable', value: modifiable, pct: Math.round((modifiable / totalPMPY) * 100), color: 'text-amber-600', bg: 'bg-amber-50', border: 'border-amber-200', note: 'Inpatient, SNF, ED spend — reducible with care management, RPM, preferred networks' },
            { label: 'Fixed / Low Modifiability', value: fixed, pct: Math.round((fixed / totalPMPY) * 100), color: 'text-emerald-600', bg: 'bg-emerald-50', border: 'border-emerald-200', note: 'Primary care, telehealth, pharmacy — necessary cost; investing here reduces the modifiable spend' },
          ].map(s => (
            <div key={s.label} className={`p-4 rounded-xl border ${s.border} ${s.bg}`}>
              <p className="text-[10px] font-black uppercase tracking-widest text-slate-600 mb-1">{s.label}</p>
              <p className={`text-2xl font-black ${s.color}`}>${s.value.toLocaleString()}<span className="text-base text-slate-500 ml-1">({s.pct}%)</span></p>
              <p className="text-xs text-slate-600 mt-1">{s.note}</p>
            </div>
          ));
        })()}
      </div>

      {/* VBC benchmark */}
      <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl">
        <p className="text-xs font-black uppercase tracking-widest text-slate-500 mb-2">Vermont AHEAD Benchmarking</p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
          <div>
            <p className="text-[10px] text-slate-500 uppercase font-bold mb-0.5">Panel Average PMPY</p>
            <p className="font-black text-slate-900">${Math.round(SYNTHETIC_PATIENTS.reduce((s, p) => s + p.totalCostPMPY, 0) / SYNTHETIC_PATIENTS.length).toLocaleString()}</p>
          </div>
          <div>
            <p className="text-[10px] text-slate-500 uppercase font-bold mb-0.5">This Patient vs. Panel</p>
            <p className={`font-black ${totalPMPY > 25000 ? 'text-red-600' : 'text-emerald-600'}`}>{totalPMPY > 25000 ? `+${Math.round(((totalPMPY / (SYNTHETIC_PATIENTS.reduce((s, p) => s + p.totalCostPMPY, 0) / SYNTHETIC_PATIENTS.length)) - 1) * 100)}% above avg` : 'Below avg'}</p>
          </div>
          <div>
            <p className="text-[10px] text-slate-500 uppercase font-bold mb-0.5">Expected TCOC (RAF-adj)</p>
            <p className="font-black text-indigo-700">${Math.round(patient.rafScore * 18400).toLocaleString()}</p>
            <p className="text-[10px] text-slate-400">CMS benchmark = RAF × $18,400 base rate</p>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── MAIN COMPONENT ───────────────────────────────────────────────────────────

type HLVTab = 'panel' | 'wisely' | 'tcoc';

const HLV_TABS: { id: HLVTab; label: string; desc: string }[] = [
  { id: 'panel', label: 'A1C & BP Panel', desc: 'Control rates & VBC value' },
  { id: 'wisely', label: 'Choosing Wisely Scan', desc: 'Low-value care flags' },
  { id: 'tcoc', label: 'TCOC Decomposition', desc: 'Cost category breakdown' },
];

export default function HighLowValueCare() {
  const [tab, setTab] = useState<HLVTab>('panel');

  return (
    <div>
      <nav className="flex flex-wrap items-end border border-slate-200 rounded-t-xl px-2 bg-slate-50/80 pt-2 gap-y-1 mb-6">
        {HLV_TABS.map(t => (
          <button key={t.id} onClick={() => setTab(t.id)} className={`relative flex items-center gap-1.5 px-4 py-2 text-sm font-bold transition-all whitespace-nowrap rounded-t-xl border-t border-l border-r mr-1 ${tab === t.id ? 'bg-slate-100 border-slate-800 text-slate-900 z-10 -mb-px' : 'bg-white border-slate-200 text-slate-500 hover:bg-slate-50 hover:text-slate-700 mt-1.5 shadow-sm'}`}>
            {t.label}<span className="hidden sm:inline text-[10px] font-normal text-slate-400"> — {t.desc}</span>
          </button>
        ))}
      </nav>
      {tab === 'panel' && <A1CBPPanel />}
      {tab === 'wisely' && <ChoosingWiselyScan />}
      {tab === 'tcoc' && <TCOCDecomposition />}
    </div>
  );
}
