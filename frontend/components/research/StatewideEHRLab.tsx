"use client";

import { useState, useMemo } from "react";
import { Building2, GitCompare, AlertTriangle, CheckCircle, Clock } from "lucide-react";

// ─────────────────────────────────────────────────────────────────────────────
// Statewide EHR Deployment Modeler — the Act 167 / Oliver Wyman question.
//
// Vermont's AHS has an active feasibility assessment (HIE Strategic Plan,
// "in line with the Act 167 Report") weighing a SINGLE statewide EHR — every
// hospital and practice on one platform — against FHIR-based interoperability
// across Vermont's existing ~4 EHR platforms. This tool models that head-to-head:
// 10-year total cost, data timeliness, disruption, and vendor-lock-in risk, and
// renders the verdict the book frames: does FHIR make a statewide EHR unnecessary?
//
// Self-contained; Vermont-anchored planning figures (14 hospitals, 4 platforms,
// VHCURES 12–18 mo data lag). Illustrative — not a procurement model.
// ─────────────────────────────────────────────────────────────────────────────

const fmtUSD = (n: number) =>
  n >= 1_000_000 ? `$${(n / 1_000_000).toFixed(1)}M` : `$${Math.round(n).toLocaleString()}`;

export default function StatewideEHRLab() {
  const [hospitals, setHospitals] = useState(14);            // Vermont's 14 hospitals
  const [practices, setPractices] = useState(120);           // primary care/specialty practices
  const [migrationPerHospital, setMigrationPerHospital] = useState(28_000_000); // single-EHR migration capex/hospital
  const [fhirPerHospital, setFhirPerHospital] = useState(2_400_000);            // FHIR-compliance build/hospital
  const [lockInWeight, setLockInWeight] = useState(50);      // how much you weight vendor lock-in risk (0–100)

  const r = useMemo(() => {
    // ── Path A: single statewide EHR ──
    const ehrMigration = hospitals * migrationPerHospital + practices * 350_000;
    const ehrAnnual = (hospitals * 6_500_000 + practices * 45_000); // licensing/support
    const ehrDisruptionMonths = 18 + hospitals * 1.5;        // staggered statewide rollout
    const ehr10yr = ehrMigration + ehrAnnual * 10;

    // ── Path B: FHIR interoperability across existing 4 platforms ──
    const fhirBuild = hospitals * fhirPerHospital + practices * 120_000;
    const fhirAnnual = hospitals * 850_000 + practices * 12_000; // interface maintenance
    const fhir10yr = fhirBuild + fhirAnnual * 10;

    // ── Qualitative dimensions (0–100 higher=better) ──
    // Single EHR: best data timeliness (real-time, no lag) but worst lock-in + disruption.
    const ehr = {
      timeliness: 95,                          // real-time shared infrastructure
      lockIn: 25,                              // single-vendor dependence (low score = bad)
      disruption: 20,                          // massive migration (low = bad)
      tco: fhir10yr / ehr10yr * 100,           // relative cost score
    };
    const fhir = {
      timeliness: 68,                          // near-real-time, depends on exchange cadence
      lockIn: 80,                              // keep existing vendors, no single dependence
      disruption: 82,                          // incremental, no rip-and-replace
      tco: 100,                                // cheaper baseline
    };

    // Weighted verdict. Lock-in weight is user-driven; the rest fixed-ish.
    const w = { timeliness: 25, tco: 30, disruption: 20, lockIn: lockInWeight / 100 * 25 + 12 };
    const wt = Object.values(w).reduce((a, b) => a + b, 0);
    const score = (o: typeof ehr) =>
      (o.timeliness * w.timeliness + Math.min(100, o.tco) * w.tco + o.disruption * w.disruption + o.lockIn * w.lockIn) / wt;
    const ehrScore = score(ehr);
    const fhirScore = score(fhir);

    return { ehrMigration, ehrAnnual, ehr10yr, ehrDisruptionMonths, fhirBuild, fhirAnnual, fhir10yr, ehr, fhir, ehrScore, fhirScore };
  }, [hospitals, practices, migrationPerHospital, fhirPerHospital, lockInWeight]);

  const fhirWins = r.fhirScore >= r.ehrScore;

  return (
    <div className="space-y-5">
      <p className="text-sm text-slate-600 leading-relaxed bg-slate-50 rounded-lg px-4 py-3 border border-slate-100">
        Vermont&apos;s Act 167 feasibility assessment asks: build <strong>one statewide EHR</strong> (every
        provider on a single platform) or invest in <strong>FHIR interoperability</strong> across the
        existing ~4 platforms? The book&apos;s framing: if FHIR can deliver real-time exchange at acceptable
        cost, the case for a disruptive statewide migration weakens. Model it.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <Field label="Hospitals">
          <input type="range" min={4} max={20} value={hospitals} onChange={(e) => setHospitals(+e.target.value)} className="w-full accent-teal-600" />
          <span className="text-sm font-bold text-slate-900">{hospitals}</span>
        </Field>
        <Field label="Practices">
          <input type="range" min={20} max={300} step={10} value={practices} onChange={(e) => setPractices(+e.target.value)} className="w-full accent-teal-600" />
          <span className="text-sm font-bold text-slate-900">{practices}</span>
        </Field>
        <Field label="Vendor lock-in concern">
          <input type="range" min={0} max={100} value={lockInWeight} onChange={(e) => setLockInWeight(+e.target.value)} className="w-full accent-teal-600" />
          <span className="text-sm font-bold text-slate-900">{lockInWeight}</span>
        </Field>
        <Field label="Statewide-EHR migration / hospital">
          <input type="range" min={10_000_000} max={50_000_000} step={1_000_000} value={migrationPerHospital} onChange={(e) => setMigrationPerHospital(+e.target.value)} className="w-full accent-teal-600" />
          <span className="text-sm font-bold text-slate-900">{fmtUSD(migrationPerHospital)}</span>
        </Field>
        <Field label="FHIR build / hospital">
          <input type="range" min={500_000} max={6_000_000} step={100_000} value={fhirPerHospital} onChange={(e) => setFhirPerHospital(+e.target.value)} className="w-full accent-teal-600" />
          <span className="text-sm font-bold text-slate-900">{fmtUSD(fhirPerHospital)}</span>
        </Field>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <PathCard title="Path A — Single Statewide EHR" icon={<Building2 className="w-4 h-4" />}
          win={!fhirWins} score={r.ehrScore}
          rows={[
            ["Migration (one-time)", fmtUSD(r.ehrMigration)],
            ["Annual license/support", fmtUSD(r.ehrAnnual)],
            ["10-year total cost", fmtUSD(r.ehr10yr)],
            ["Rollout disruption", `~${Math.round(r.ehrDisruptionMonths)} mo`],
          ]}
          dims={r.ehr} />
        <PathCard title="Path B — FHIR Interoperability" icon={<GitCompare className="w-4 h-4" />}
          win={fhirWins} score={r.fhirScore}
          rows={[
            ["Build (one-time)", fmtUSD(r.fhirBuild)],
            ["Annual maintenance", fmtUSD(r.fhirAnnual)],
            ["10-year total cost", fmtUSD(r.fhir10yr)],
            ["Rollout disruption", "Incremental"],
          ]}
          dims={r.fhir} />
      </div>

      <div className={`flex items-start gap-2 rounded-lg px-4 py-3 text-sm font-semibold ${fhirWins ? "bg-emerald-50 text-emerald-800" : "bg-sky-50 text-sky-800"}`}>
        {fhirWins ? <CheckCircle className="w-4 h-4 mt-0.5 shrink-0" /> : <AlertTriangle className="w-4 h-4 mt-0.5 shrink-0" />}
        <span>
          On these assumptions, <strong>{fhirWins ? "FHIR interoperability" : "a single statewide EHR"}</strong> scores higher
          ({Math.round(Math.max(r.fhirScore, r.ehrScore))} vs {Math.round(Math.min(r.fhirScore, r.ehrScore))}).
          {fhirWins
            ? " The book's hypothesis holds here: FHIR delivers the data sharing without a rip-and-replace migration."
            : " The statewide EHR's real-time data and lower TCO outweigh migration disruption at these inputs."}
        </span>
      </div>
      <Disclaimer text="Illustrative model of the Act 167 statewide-EHR feasibility question — Vermont-anchored planning figures, not a procurement analysis." />
    </div>
  );
}

function PathCard({ title, icon, win, score, rows, dims }: {
  title: string; icon: React.ReactNode; win: boolean; score: number;
  rows: [string, string][]; dims: { timeliness: number; lockIn: number; disruption: number };
}) {
  return (
    <div className={`rounded-xl border p-4 ${win ? "border-teal-400 ring-2 ring-teal-100" : "border-slate-200"}`}>
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2 font-bold text-slate-900">{icon}{title}</div>
        <span className={`text-lg font-black ${win ? "text-teal-600" : "text-slate-400"}`}>{Math.round(score)}</span>
      </div>
      <div className="space-y-1.5 mb-3">
        {rows.map(([k, v]) => (
          <div key={k} className="flex justify-between text-sm"><span className="text-slate-500">{k}</span><span className="font-semibold text-slate-800">{v}</span></div>
        ))}
      </div>
      <div className="grid grid-cols-3 gap-2">
        {([["Timeliness", dims.timeliness], ["No lock-in", dims.lockIn], ["Low disruption", dims.disruption]] as [string, number][]).map(([k, val]) => (
          <div key={k}>
            <div className="flex justify-between text-[10px] text-slate-500 mb-0.5"><span>{k}</span><span>{val}</span></div>
            <div className="h-1.5 rounded-full bg-slate-100 overflow-hidden"><div className="h-full bg-teal-500" style={{ width: `${val}%` }} /></div>
          </div>
        ))}
      </div>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block rounded-xl border border-slate-200 p-3">
      <span className="block text-xs font-bold text-slate-500 uppercase tracking-wide mb-2">{label}</span>
      <div className="flex items-center gap-3">{children}</div>
    </label>
  );
}

function Disclaimer({ text }: { text: string }) {
  return <p className="text-[11px] text-slate-400 italic leading-relaxed flex items-center gap-1"><Clock className="w-3 h-3" />{text}</p>;
}
