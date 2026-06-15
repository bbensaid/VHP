"use client";

import { useState, useMemo } from "react";
import { TrendingUp, Clock } from "lucide-react";

// ─────────────────────────────────────────────────────────────────────────────
// EMS Transformation & Community Paramedicine Modeler — Vermont RHT category.
//
// Vermont has 31 separate EMS agencies — fragmentation that drives avoidable ED
// utilization. RHT funds (a) regionalization to cut operational redundancy and
// (b) community paramedicine "treat-and-refer," keeping non-emergency patients
// out of the ED. Under global budgets (Act 68 / AHEAD), every prevented ED visit
// and admission improves margin. This models the diversion volume and savings.
//
// Self-contained; Vermont-anchored planning figures. Illustrative.
// ─────────────────────────────────────────────────────────────────────────────

const fmtUSD = (n: number) =>
  n >= 1_000_000 ? `$${(n / 1_000_000).toFixed(1)}M` : `$${Math.round(n).toLocaleString()}`;

export default function EMSTransformationLab() {
  const [agencies, setAgencies] = useState(31);                 // Vermont's 31 EMS agencies
  const [regionsTarget, setRegionsTarget] = useState(8);        // consolidate into N regions
  const [annual911, setAnnual911] = useState(95_000);           // statewide 911 EMS responses/yr
  const [nonEmergentPct, setNonEmergentPct] = useState(32);     // % of responses that are non-emergent
  const [paramedicineCoverage, setParamedicineCoverage] = useState(45); // % of non-emergent reachable by CP treat-and-refer
  const [edVisitCost, setEdVisitCost] = useState(1_400);        // avg avoidable ED visit cost

  const r = useMemo(() => {
    // ── Regionalization: redundant overhead falls as 31 agencies → N regions ──
    const overheadPerAgency = 420_000; // admin/dispatch/management overhead
    const regionalized = Math.max(regionsTarget, 1);
    const agenciesReduced = Math.max(0, agencies - regionalized);
    const regionalizationSavings = agenciesReduced * overheadPerAgency * 0.55; // not all overhead is removable

    // ── Community paramedicine treat-and-refer ED diversion ──
    const nonEmergent = annual911 * (nonEmergentPct / 100);
    const diverted = nonEmergent * (paramedicineCoverage / 100);
    const edSavings = diverted * edVisitCost;
    // A share of diversions also prevents a downstream admission (high-value).
    const admissionsPrevented = diverted * 0.08;
    const admissionSavings = admissionsPrevented * 13_000;

    // ── Community paramedicine program cost ──
    const cpProgramCost = regionalized * 380_000; // CP staffing + telehealth supervision per region

    const grossSavings = regionalizationSavings + edSavings + admissionSavings;
    const netSavings = grossSavings - cpProgramCost;

    return { agenciesReduced, regionalizationSavings, nonEmergent, diverted, edSavings, admissionsPrevented, admissionSavings, cpProgramCost, grossSavings, netSavings };
  }, [agencies, regionsTarget, annual911, nonEmergentPct, paramedicineCoverage, edVisitCost]);

  return (
    <div className="space-y-5">
      <p className="text-sm text-slate-600 leading-relaxed bg-slate-50 rounded-lg px-4 py-3 border border-slate-100">
        Vermont&apos;s <strong>31 separate EMS agencies</strong> create fragmentation and avoidable ED use.
        RHT funds <strong>regionalization</strong> (cut redundant overhead) and <strong>community
        paramedicine</strong> (treat-and-refer keeps non-emergency patients out of the ED). Under global
        budgets, every prevented ED visit improves margin.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <Field label="EMS agencies today">
          <input type="range" min={5} max={40} value={agencies} onChange={(e) => setAgencies(+e.target.value)} className="w-full accent-teal-600" />
          <span className="text-sm font-bold text-slate-900">{agencies}</span>
        </Field>
        <Field label="Consolidate into N regions">
          <input type="range" min={1} max={20} value={regionsTarget} onChange={(e) => setRegionsTarget(+e.target.value)} className="w-full accent-teal-600" />
          <span className="text-sm font-bold text-slate-900">{regionsTarget}</span>
        </Field>
        <Field label="Annual 911 EMS responses">
          <input type="range" min={20_000} max={200_000} step={5_000} value={annual911} onChange={(e) => setAnnual911(+e.target.value)} className="w-full accent-teal-600" />
          <span className="text-sm font-bold text-slate-900">{annual911.toLocaleString()}</span>
        </Field>
        <Field label="Non-emergent share (%)">
          <input type="range" min={10} max={55} value={nonEmergentPct} onChange={(e) => setNonEmergentPct(+e.target.value)} className="w-full accent-teal-600" />
          <span className="text-sm font-bold text-slate-900">{nonEmergentPct}%</span>
        </Field>
        <Field label="Community-paramedicine reach (%)">
          <input type="range" min={0} max={90} value={paramedicineCoverage} onChange={(e) => setParamedicineCoverage(+e.target.value)} className="w-full accent-teal-600" />
          <span className="text-sm font-bold text-slate-900">{paramedicineCoverage}%</span>
        </Field>
        <Field label="Avoidable ED visit cost">
          <input type="range" min={600} max={3_000} step={50} value={edVisitCost} onChange={(e) => setEdVisitCost(+e.target.value)} className="w-full accent-teal-600" />
          <span className="text-sm font-bold text-slate-900">${edVisitCost.toLocaleString()}</span>
        </Field>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <Stat label="Agencies consolidated" value={`${r.agenciesReduced}`} />
        <Stat label="ED visits diverted / yr" value={Math.round(r.diverted).toLocaleString()} tone="good" />
        <Stat label="Admissions prevented / yr" value={Math.round(r.admissionsPrevented).toLocaleString()} tone="good" />
        <Stat label="CP program cost / yr" value={fmtUSD(r.cpProgramCost)} tone="warn" />
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
        <Stat label="Regionalization savings" value={fmtUSD(r.regionalizationSavings)} tone="good" />
        <Stat label="ED + admission savings" value={fmtUSD(r.edSavings + r.admissionSavings)} tone="good" />
        <Stat label="Net annual impact" value={`${r.netSavings < 0 ? "−" : ""}${fmtUSD(Math.abs(r.netSavings))}`} tone={r.netSavings >= 0 ? "good" : "warn"} />
      </div>

      <div className={`flex items-center gap-2 rounded-lg px-4 py-3 text-sm font-semibold ${r.netSavings > 0 ? "bg-emerald-50 text-emerald-800" : "bg-amber-50 text-amber-800"}`}>
        <TrendingUp className="w-4 h-4 shrink-0" />
        {r.netSavings > 0
          ? `Net ${fmtUSD(r.netSavings)}/yr: regionalization + ${Math.round(r.diverted).toLocaleString()} diverted ED visits outweigh the community-paramedicine program cost.`
          : "At these inputs the program cost exceeds savings — raise community-paramedicine reach or consolidate more agencies."}
      </div>
      <Disclaimer text="Illustrative model of Vermont's RHT EMS-transformation thesis (31 agencies, treat-and-refer ED diversion) — planning figures, not operational EMS data." />
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

function Stat({ label, value, tone }: { label: string; value: string; tone?: "good" | "warn" }) {
  const cls = tone === "warn" ? "text-amber-600" : tone === "good" ? "text-emerald-600" : "text-slate-900";
  return (
    <div className="rounded-xl border border-slate-200 p-3 bg-white">
      <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wide">{label}</div>
      <div className={`text-xl font-black ${cls}`}>{value}</div>
    </div>
  );
}

function Disclaimer({ text }: { text: string }) {
  return <p className="text-[11px] text-slate-400 italic leading-relaxed flex items-center gap-1"><Clock className="w-3 h-3" />{text}</p>;
}
