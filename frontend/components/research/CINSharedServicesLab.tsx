"use client";

import { useState, useMemo } from "react";
import { TrendingUp, Clock } from "lucide-react";

// ─────────────────────────────────────────────────────────────────────────────
// CIN & Shared Services Modeler — Vermont RHT investment category.
//
// Vermont's RHT application funds a Clinically Integrated Network linking its 14
// hospitals into shared clinical + data infrastructure, explicitly to attack the
// ~$1,303/discharge administrative cost premium via shared billing, coding,
// credentialing, HR, IT, and group purchasing. This models the savings vs. the
// CIN setup + operating cost, and the break-even.
//
// Self-contained; Vermont-anchored planning figures. Illustrative.
// ─────────────────────────────────────────────────────────────────────────────

const fmtUSD = (n: number) =>
  n >= 1_000_000 ? `$${(n / 1_000_000).toFixed(1)}M` : `$${Math.round(n).toLocaleString()}`;

// Shared-service domains: each cuts a fraction of its share of the admin premium
// when consolidated across hospitals.
const DOMAINS = [
  { id: "billing",       label: "Billing & claims",      share: 0.28, cut: 0.30 },
  { id: "coding",        label: "Coding",                share: 0.16, cut: 0.25 },
  { id: "credentialing", label: "Credentialing",         share: 0.10, cut: 0.40 },
  { id: "hr",            label: "HR & payroll",          share: 0.18, cut: 0.22 },
  { id: "it",            label: "IT & analytics",        share: 0.28, cut: 0.35 },
] as const;
type DomainId = typeof DOMAINS[number]["id"];

export default function CINSharedServicesLab() {
  const [hospitals, setHospitals] = useState(14);
  const [dischargesPerHospital, setDischargesPerHospital] = useState(4_200);
  const [adminPremium, setAdminPremium] = useState(1_303); // $/discharge admin cost premium
  const [groupPurchasingSpend, setGroupPurchasingSpend] = useState(180_000_000); // combined supply spend
  const [enabled, setEnabled] = useState<Record<DomainId, boolean>>({
    billing: true, coding: true, credentialing: true, hr: true, it: true,
  });

  const r = useMemo(() => {
    const totalDischarges = hospitals * dischargesPerHospital;
    const totalAdminCost = totalDischarges * adminPremium;

    // Admin savings = sum over enabled domains of (domain share × cut), scaled by
    // a consolidation factor (more hospitals → more scale, with diminishing return).
    const scale = Math.min(1, 0.45 + hospitals * 0.04);
    const adminSavings = DOMAINS.reduce((s, d) => enabled[d.id] ? s + totalAdminCost * d.share * d.cut * scale : s, 0);

    // Group purchasing: ~6% on combined supply spend once aggregated.
    const gpoSavings = groupPurchasingSpend * 0.06 * scale;

    const annualSavings = adminSavings + gpoSavings;

    // CIN cost: setup (one-time) + annual operating (shared-services staff/platform).
    const setupCost = 4_500_000 + hospitals * 600_000;
    const annualOperating = 2_800_000 + hospitals * 450_000;
    const netYear1 = annualSavings - annualOperating - setupCost;
    const netSteady = annualSavings - annualOperating;
    const breakEvenMonths = netSteady > 0 ? (setupCost / netSteady) * 12 : null;
    const premiumReduction = totalDischarges ? adminSavings / totalDischarges : 0;

    return { totalDischarges, totalAdminCost, adminSavings, gpoSavings, annualSavings, setupCost, annualOperating, netYear1, netSteady, breakEvenMonths, premiumReduction };
  }, [hospitals, dischargesPerHospital, adminPremium, groupPurchasingSpend, enabled]);

  return (
    <div className="space-y-5">
      <p className="text-sm text-slate-600 leading-relaxed bg-slate-50 rounded-lg px-4 py-3 border border-slate-100">
        Vermont&apos;s RHT-funded <strong>Clinically Integrated Network</strong> consolidates back-office
        functions across its 14 hospitals to attack the <strong>~$1,303/discharge administrative cost
        premium</strong>. Toggle which functions to share and see the savings against CIN setup and
        operating cost.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Field label="Hospitals in CIN">
          <input type="range" min={3} max={14} value={hospitals} onChange={(e) => setHospitals(+e.target.value)} className="w-full accent-teal-600" />
          <span className="text-sm font-bold text-slate-900">{hospitals}</span>
        </Field>
        <Field label="Discharges / hospital / yr">
          <input type="range" min={800} max={12_000} step={100} value={dischargesPerHospital} onChange={(e) => setDischargesPerHospital(+e.target.value)} className="w-full accent-teal-600" />
          <span className="text-sm font-bold text-slate-900">{dischargesPerHospital.toLocaleString()}</span>
        </Field>
        <Field label="Admin premium / discharge">
          <input type="range" min={400} max={2_500} step={25} value={adminPremium} onChange={(e) => setAdminPremium(+e.target.value)} className="w-full accent-teal-600" />
          <span className="text-sm font-bold text-slate-900">${adminPremium.toLocaleString()}</span>
        </Field>
        <Field label="Combined supply spend">
          <input type="range" min={50_000_000} max={400_000_000} step={10_000_000} value={groupPurchasingSpend} onChange={(e) => setGroupPurchasingSpend(+e.target.value)} className="w-full accent-teal-600" />
          <span className="text-sm font-bold text-slate-900">{fmtUSD(groupPurchasingSpend)}</span>
        </Field>
      </div>

      <div>
        <span className="block text-xs font-bold text-slate-500 uppercase tracking-wide mb-2">Shared-service domains</span>
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
          {DOMAINS.map((d) => (
            <button key={d.id} onClick={() => setEnabled((s) => ({ ...s, [d.id]: !s[d.id] }))}
              className={`rounded-lg border p-2.5 text-left transition ${enabled[d.id] ? "border-teal-400 bg-teal-50/50" : "border-slate-200 opacity-60 hover:opacity-100"}`}>
              <span className="block text-xs font-bold text-slate-800">{d.label}</span>
              <span className="block text-[10px] text-teal-600">−{Math.round(d.cut * 100)}% of segment</span>
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <Stat label="Annual admin savings" value={fmtUSD(r.adminSavings)} tone="good" />
        <Stat label="Group-purchasing savings" value={fmtUSD(r.gpoSavings)} tone="good" />
        <Stat label="CIN annual operating cost" value={fmtUSD(r.annualOperating)} tone="warn" />
        <Stat label="Premium reduction / discharge" value={`$${Math.round(r.premiumReduction).toLocaleString()}`} tone="good" />
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
        <Stat label="One-time setup cost" value={fmtUSD(r.setupCost)} tone="warn" />
        <Stat label="Net steady-state / yr" value={`${r.netSteady < 0 ? "−" : ""}${fmtUSD(Math.abs(r.netSteady))}`} tone={r.netSteady >= 0 ? "good" : "warn"} />
        <Stat label="Break-even" value={r.breakEvenMonths ? `${Math.round(r.breakEvenMonths)} mo` : "—"} />
      </div>

      <div className={`flex items-center gap-2 rounded-lg px-4 py-3 text-sm font-semibold ${r.netSteady > 0 ? "bg-emerald-50 text-emerald-800" : "bg-amber-50 text-amber-800"}`}>
        <TrendingUp className="w-4 h-4 shrink-0" />
        {r.netSteady > 0
          ? `Shared services net ${fmtUSD(r.netSteady)}/yr after operating cost; setup pays back in ~${Math.round(r.breakEvenMonths!)} months.`
          : "At these inputs the CIN operating cost exceeds the savings — add more hospitals or shared domains to reach scale."}
      </div>
      <Disclaimer text="Illustrative model of Vermont's RHT-funded CIN shared-services thesis — planning figures anchored to the $1,303/discharge admin premium, not audited accounts." />
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
