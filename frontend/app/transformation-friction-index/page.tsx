"use client";

import Link from "next/link";
import {
  BeakerIcon,
  ArrowTrendingUpIcon,
  ExclamationTriangleIcon,
  CheckCircleIcon,
  ClockIcon,
} from "@heroicons/react/24/outline";

const frictionDimensions = [
  {
    label: "Policy Complexity",
    pillar: "Policy",
    color: "text-sky-700",
    bg: "bg-sky-50",
    border: "border-sky-200",
    dot: "bg-sky-500",
    desc: "Number and complexity of required regulatory approvals, waiver amendments, legislative changes, and stakeholder governance steps before the transformation can legally proceed.",
    inputs: ["CMS waiver requirements", "State legislation needed", "Regulatory agency count", "Stakeholder veto points"],
  },
  {
    label: "Economic Friction",
    pillar: "Economics",
    color: "text-emerald-700",
    bg: "bg-emerald-50",
    border: "border-emerald-200",
    dot: "bg-emerald-500",
    desc: "Financial barriers to implementation: upfront capital requirements, revenue at risk during transition, working capital needs, and the duration until new payment model revenues stabilize.",
    inputs: ["Capital investment required", "Transition revenue risk", "Months to revenue stability", "Margin compression during change"],
  },
  {
    label: "Technology Friction",
    pillar: "Technology",
    color: "text-indigo-700",
    bg: "bg-indigo-50",
    border: "border-indigo-200",
    dot: "bg-indigo-500",
    desc: "Gap between current digital infrastructure and what the transformation demands: EHR upgrades, interoperability requirements, new platform procurement, and implementation timelines.",
    inputs: ["EHR gap analysis", "Interoperability requirements", "New platform count", "IT implementation timeline"],
  },
  {
    label: "Clinical Friction",
    pillar: "Clinical",
    color: "text-rose-700",
    bg: "bg-rose-50",
    border: "border-rose-200",
    dot: "bg-rose-500",
    desc: "Evidence gaps, care protocol redesign burden, workforce retraining requirements, and clinical culture change resistance that must be navigated for the transformation to take hold.",
    inputs: ["Evidence maturity level", "Protocol redesign scope", "Physician buy-in risk", "Clinical workflow disruption"],
  },
  {
    label: "Equity Friction",
    pillar: "Equity",
    color: "text-violet-700",
    bg: "bg-violet-50",
    border: "border-violet-200",
    dot: "bg-violet-500",
    desc: "Distributional barriers: populations who face heightened access risk during the transition, SDOH gaps that the transformation may widen, and the political friction of equity trade-offs.",
    inputs: ["Vulnerable population exposure", "SDOH gap amplification risk", "Language and cultural barriers", "Community trust deficit"],
  },
  {
    label: "Operational Friction",
    pillar: "Operations",
    color: "text-teal-700",
    bg: "bg-teal-50",
    border: "border-teal-200",
    dot: "bg-teal-500",
    desc: "Administrative and execution barriers: revenue cycle readiness for new payment logic, workforce vacancy in required roles, compliance infrastructure gaps, and supply chain constraints.",
    inputs: ["Revenue cycle readiness gap", "Workforce vacancy rate", "Compliance infrastructure score", "Supply chain adequacy"],
  },
];

export default function TransformationFrictionIndexPage() {
  return (
    <div className="bg-white font-sans text-slate-800 min-h-screen">

      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section className="relative bg-slate-950 text-white overflow-hidden py-20 md:py-28">
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.4) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <span className="inline-block text-[11px] font-black tracking-[0.2em] uppercase text-amber-400 mb-6 border border-amber-700 bg-amber-900/30 px-4 py-1.5 rounded-full">
            Analyze & Tools · Predictive Strategy
          </span>
          <h1 className="text-4xl md:text-6xl font-black tracking-tight leading-tight mb-6">
            Transformation<br />
            <span className="text-amber-400">Friction Index</span>
          </h1>
          <p className="text-xl text-slate-300 max-w-2xl leading-relaxed mb-4">
            A composite score that weighs the complexity of a proposed transformation against the operational and structural readiness of the health infrastructure it must run through.
          </p>
          <p className="text-slate-400 max-w-2xl leading-relaxed">
            High friction doesn't mean abandon — it means sequence, de-risk, and resource differently. The Friction Index moves HTR from a review platform to a predictive strategy tool.
          </p>
          <div className="mt-8 inline-flex items-center gap-2 bg-amber-500/20 border border-amber-500/40 text-amber-300 px-4 py-2 rounded-lg text-sm font-bold">
            <ClockIcon className="w-4 h-4" />
            Interactive scoring tool — Coming Q3 2026
          </div>
        </div>
      </section>

      {/* ── WHAT IT MEASURES ──────────────────────────────────────────────── */}
      <section className="py-20 md:py-28 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-14">
          <span className="text-[11px] font-black tracking-[0.2em] uppercase text-amber-600 mb-4 block">
            What the Index Measures
          </span>
          <h2 className="text-4xl font-black tracking-tight text-slate-900 mb-4">
            Six friction dimensions. One composite score.
          </h2>
          <p className="text-xl text-slate-500 max-w-3xl">
            Each pillar of the HTR framework contributes a distinct friction dimension. The composite score surfaces where a transformation will encounter the most resistance — and which dimensions represent the binding constraints.
          </p>
        </div>
        <div className="space-y-4">
          {frictionDimensions.map((d) => (
            <div key={d.label} className={`bg-white border ${d.border} rounded-xl overflow-hidden shadow-sm`}>
              <div className={`${d.bg} border-b ${d.border} px-6 py-4 flex items-center gap-3`}>
                <span className={`w-2.5 h-2.5 rounded-full ${d.dot} shrink-0`} />
                <div>
                  <span className={`text-xs font-black uppercase tracking-widest ${d.color}`}>{d.pillar} Pillar</span>
                  <h3 className={`font-black text-lg ${d.color}`}>{d.label}</h3>
                </div>
              </div>
              <div className="px-6 py-5 grid md:grid-cols-3 gap-6">
                <div className="md:col-span-2">
                  <p className="text-sm text-slate-700 leading-relaxed">{d.desc}</p>
                </div>
                <div>
                  <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">Scored Inputs</p>
                  <ul className="space-y-1">
                    {d.inputs.map((input) => (
                      <li key={input} className="flex items-center gap-2 text-xs text-slate-600">
                        <span className={`w-1 h-1 rounded-full ${d.dot} shrink-0`} />
                        {input}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── HOW TO READ IT ────────────────────────────────────────────────── */}
      <section className="bg-slate-50 border-y border-slate-200 py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <span className="text-[11px] font-black tracking-[0.2em] uppercase text-amber-600 mb-4 block">
              Interpreting the Score
            </span>
            <h2 className="text-3xl font-black tracking-tight text-slate-900">
              Friction is directional intelligence, not a verdict.
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: CheckCircleIcon,
                range: "Low Friction (0–33)",
                color: "text-emerald-700",
                bg: "bg-emerald-50",
                border: "border-emerald-200",
                iconColor: "text-emerald-600",
                desc: "Structural and operational conditions broadly support the transformation. Standard implementation planning applies. Monitor for emerging friction as scope expands.",
              },
              {
                icon: ExclamationTriangleIcon,
                range: "Moderate Friction (34–66)",
                color: "text-amber-700",
                bg: "bg-amber-50",
                border: "border-amber-200",
                iconColor: "text-amber-600",
                desc: "Significant friction in one or more dimensions. Identify the binding constraints, sequence implementation to de-risk the highest-friction pillars first, and resource mitigation strategies explicitly.",
              },
              {
                icon: ArrowTrendingUpIcon,
                range: "High Friction (67–100)",
                color: "text-red-700",
                bg: "bg-red-50",
                border: "border-red-200",
                iconColor: "text-red-600",
                desc: "Structural resistance is high. The transformation is not necessarily wrong — but it requires pre-conditions to be met before full launch. Phased implementation, readiness investment, or scope reduction is warranted.",
              },
            ].map((tier) => (
              <div key={tier.range} className={`${tier.bg} border ${tier.border} rounded-xl p-6`}>
                <tier.icon className={`w-6 h-6 ${tier.iconColor} mb-3`} />
                <h3 className={`font-black text-base ${tier.color} mb-3`}>{tier.range}</h3>
                <p className="text-sm text-slate-700 leading-relaxed">{tier.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ───────────────────────────────────────────────────────────── */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl font-black tracking-tight text-slate-900 mb-4">
          Use the HTR Simulator while the Friction Index is in development.
        </h2>
        <p className="text-lg text-slate-500 mb-8 max-w-xl mx-auto">
          The HTR Simulator applies the six-pillar scoring framework to specific transformation scenarios today.
        </p>
        <div className="flex flex-wrap gap-4 justify-center">
          <Link href="/htr-simulator" className="inline-flex items-center gap-2 bg-slate-900 text-white px-8 py-4 rounded-lg font-bold hover:bg-slate-800 transition-colors">
            Open HTR Simulator →
          </Link>
          <Link href="/impact-simulation" className="inline-flex items-center gap-2 bg-white text-slate-900 border border-slate-200 px-8 py-4 rounded-lg font-bold hover:bg-slate-50 transition-colors">
            Impact Simulation
          </Link>
          <Link href="/about/framework" className="inline-flex items-center gap-2 bg-white text-slate-900 border border-slate-200 px-8 py-4 rounded-lg font-bold hover:bg-slate-50 transition-colors">
            The Six-Pillar Framework
          </Link>
        </div>
      </section>
    </div>
  );
}
