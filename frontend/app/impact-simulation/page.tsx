"use client";

import Link from "next/link";
import { ClockIcon } from "@heroicons/react/24/outline";

const scenarios = [
  {
    label: "Payment Model Transition",
    desc: "Simulate how a shift from fee-for-service to a global budget or shared savings model propagates across all six pillars — including the revenue cycle disruption, workforce retraining burden, and equity distribution of gains and losses.",
    pillarsAffected: ["Policy", "Economics", "Operations", "Clinical", "Equity"],
    color: "bg-sky-50 border-sky-200 text-sky-700",
  },
  {
    label: "Care Delivery Expansion",
    desc: "Model what happens when a health system launches Hospital-at-Home, a new telehealth program, or a community health worker initiative across its full six-pillar footprint — before a dollar is spent.",
    pillarsAffected: ["Clinical", "Technology", "Operations", "Equity", "Economics"],
    color: "bg-rose-50 border-rose-200 text-rose-700",
  },
  {
    label: "Technology Implementation",
    desc: "Assess the cross-pillar impact of a major EHR replacement, AI clinical decision support rollout, or interoperability platform deployment — including the operational friction, workforce burden, and compliance surface it creates.",
    pillarsAffected: ["Technology", "Operations", "Clinical", "Policy", "Economics"],
    color: "bg-indigo-50 border-indigo-200 text-indigo-700",
  },
  {
    label: "Workforce Strategy Change",
    desc: "Simulate the cascading effects of a major workforce restructuring, scope-of-practice expansion, or labor contract renegotiation across all pillars — including the equity and clinical quality implications that HR analysis alone never surfaces.",
    pillarsAffected: ["Operations", "Economics", "Clinical", "Equity", "Policy"],
    color: "bg-orange-50 border-orange-200 text-orange-700",
  },
  {
    label: "Equity Initiative Design",
    desc: "Model a proposed equity intervention — SDOH screening program, access expansion, or algorithmic bias remediation — across all six pillars to surface the economic cost, operational requirements, policy dependencies, and clinical pathway implications.",
    pillarsAffected: ["Equity", "Operations", "Economics", "Policy", "Clinical"],
    color: "bg-violet-50 border-violet-200 text-violet-700",
  },
  {
    label: "State Policy Implementation",
    desc: "Simulate how a specific state policy — a new 1115 waiver, scope-of-practice change, or Medicaid redesign — would play out across the equity, operational, clinical, and economic dimensions of the state's health system before implementation.",
    pillarsAffected: ["Policy", "Equity", "Economics", "Operations", "Clinical"],
    color: "bg-emerald-50 border-emerald-200 text-emerald-700",
  },
];

const pillarColors: Record<string, string> = {
  Policy:     "bg-sky-100 text-sky-700",
  Economics:  "bg-emerald-100 text-emerald-700",
  Technology: "bg-indigo-100 text-indigo-700",
  Clinical:   "bg-rose-100 text-rose-700",
  Equity:     "bg-violet-100 text-violet-700",
  Operations: "bg-teal-100 text-teal-700",
};

export default function ImpactSimulationPage() {
  return (
    <div className="bg-white font-sans text-slate-800 min-h-screen">

      {/* ── PAGE HEADER ──────────────────────────────────────────────────── */}
      <section className="bg-slate-950 text-white border-b border-slate-800 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <span className="text-[10px] font-semibold uppercase tracking-widest text-violet-400 block mb-0.5">Analyze &amp; Tools · Cross-Pillar Modeling</span>
          <h1 className="text-xl font-bold tracking-tight">Impact Simulation</h1>
          <p className="text-sm text-slate-400 mt-0.5 max-w-2xl">See how a policy change, economic model, or care delivery innovation plays out across all six pillars simultaneously.</p>
          <div className="mt-2.5 inline-flex items-center gap-1.5 bg-violet-500/20 border border-violet-500/40 text-violet-300 px-3 py-1 rounded-lg text-xs font-semibold">
            <ClockIcon className="w-3.5 h-3.5" />
            Full interactive module — Coming Q4 2026
          </div>
        </div>
      </section>

      {/* ── THE CONCEPT ───────────────────────────────────────────────────── */}
      <section className="bg-slate-50 border-y border-slate-200 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
              <p className="text-[11px] font-black uppercase tracking-widest text-violet-600 mb-3">The Problem It Solves</p>
              <p className="font-black text-slate-900 text-lg mb-3">Decisions made in one pillar create consequences in five others.</p>
              <p className="text-sm text-slate-600 leading-relaxed">
                A payment model change is an Economics decision — but it creates operational friction, clinical workflow disruption, equity implications, technology requirements, and regulatory dependencies. Impact Simulation makes those downstream effects visible before commitment.
              </p>
            </div>
            <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
              <p className="text-[11px] font-black uppercase tracking-widest text-violet-600 mb-3">How It Works</p>
              <p className="font-black text-slate-900 text-lg mb-3">Select a change. See it propagate.</p>
              <p className="text-sm text-slate-600 leading-relaxed">
                Select a proposed intervention — a policy change, economic model shift, care delivery innovation, or technology deployment. The simulation maps its first, second, and third-order effects across all six pillars, surfacing the interactions and trade-offs that siloed analysis misses.
              </p>
            </div>
            <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
              <p className="text-[11px] font-black uppercase tracking-widest text-violet-600 mb-3">What It Produces</p>
              <p className="font-black text-slate-900 text-lg mb-3">A pre-commitment intelligence brief.</p>
              <p className="text-sm text-slate-600 leading-relaxed">
                A structured cross-pillar impact map showing which pillars are positively affected, which face new stress, which represent binding constraints, and what pre-conditions would need to be met for the intervention to succeed across all six dimensions.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── SCENARIO TYPES ────────────────────────────────────────────────── */}
      <section className="py-20 md:py-28 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-14">
          <span className="text-[11px] font-black tracking-[0.2em] uppercase text-violet-600 mb-4 block">
            Simulation Scenario Types
          </span>
          <h2 className="text-4xl font-black tracking-tight text-slate-900 mb-4">
            Any transformation. Modeled across all six pillars.
          </h2>
          <p className="text-xl text-slate-500 max-w-3xl">
            Impact Simulation is designed for the full range of strategic decisions facing health system leaders, policymakers, and investors.
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {scenarios.map((s) => (
            <div key={s.label} className={`border rounded-xl p-6 ${s.color.split(" ").slice(1).join(" ")} bg-white shadow-sm`}>
              <h3 className={`font-black text-base mb-3 ${s.color.split(" ")[2]}`}>{s.label}</h3>
              <p className="text-sm text-slate-600 leading-relaxed mb-4">{s.desc}</p>
              <div className="flex flex-wrap gap-1.5">
                {s.pillarsAffected.map((p) => (
                  <span key={p} className={`text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded ${pillarColors[p]}`}>
                    {p}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── CTA ───────────────────────────────────────────────────────────── */}
      <section className="bg-slate-50 border-y border-slate-200 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-black tracking-tight text-slate-900 mb-4">
            In the meantime — use the tools that are live today.
          </h2>
          <p className="text-lg text-slate-500 mb-8 max-w-xl mx-auto">
            The HTR Simulator models specific transformation scenarios with full six-pillar scoring. The Friction Index framework is available for analytical use now.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/htr-simulator" className="inline-flex items-center gap-2 bg-slate-900 text-white px-8 py-4 rounded-lg font-bold hover:bg-slate-800 transition-colors">
              HTR Simulator →
            </Link>
            <Link href="/transformation-friction-index" className="inline-flex items-center gap-2 bg-white text-slate-900 border border-slate-200 px-8 py-4 rounded-lg font-bold hover:bg-slate-50 transition-colors">
              Friction Index
            </Link>
            <Link href="/research-lab" className="inline-flex items-center gap-2 bg-white text-slate-900 border border-slate-200 px-8 py-4 rounded-lg font-bold hover:bg-slate-50 transition-colors">
              Research Lab
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
