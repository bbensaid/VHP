"use client";

import React from "react";
import Link from "next/link";
import {
  CpuChipIcon,
  InformationCircleIcon,
  BeakerIcon,
  MapIcon,
  DocumentTextIcon,
  CheckCircleIcon,
  ClockIcon,
  ArrowTopRightOnSquareIcon,
  SparklesIcon,
  ScaleIcon,
  CurrencyDollarIcon,
  ShieldCheckIcon,
  HeartIcon,
  DocumentCheckIcon,
  Square3Stack3DIcon,
} from "@heroicons/react/24/outline";

// ─── Pillar definitions ────────────────────────────────────────────────────────

const PILLARS = [
  {
    id: "policy",
    label: "Policy Alignment",
    color: "violet",
    icon: <DocumentCheckIcon className="w-6 h-6" />,
    tagline: "Legislative & Regulatory Readiness",
    description:
      "Evaluates how well a proposed transformation aligns with existing statutes, waivers, and regulatory frameworks — and what legal or administrative changes are required to enable it. Scores reflect the complexity of obtaining enabling legislation, CMS approvals, waiver amendments, or state plan changes.",
    dimensions: [
      "Enabling legislation requirements",
      "CMS waiver or state plan amendments",
      "Regulatory agency coordination",
      "Stakeholder governance structures",
      "Timeline to legal implementation",
    ],
  },
  {
    id: "technology",
    label: "Technology Modernization",
    color: "blue",
    icon: <CpuChipIcon className="w-6 h-6" />,
    tagline: "Digital Infrastructure & Interoperability",
    description:
      "Assesses the digital readiness of participating institutions — EHR maturity, data exchange capability, telehealth infrastructure, and analytics capacity. High-scoring transformations require modern, interoperable systems and sufficient IT governance to support real-time data flows.",
    dimensions: [
      "EHR adoption and maturity",
      "Health information exchange (HIE) participation",
      "Telehealth and remote monitoring infrastructure",
      "Analytics and population health management",
      "Cybersecurity and data governance",
    ],
  },
  {
    id: "financial",
    label: "Financial Sustainability",
    color: "emerald",
    icon: <CurrencyDollarIcon className="w-6 h-6" />,
    tagline: "Margin, Cost Structure & Revenue Stability",
    description:
      "Models the financial impact of transformation across participating institutions — operating margin trajectory, capital requirements, payment model transitions, and long-term solvency. Captures both the investment burden of change and the revenue opportunities created by new payment arrangements.",
    dimensions: [
      "Operating margin before and after transformation",
      "Capital and infrastructure investment required",
      "Revenue at risk during transition periods",
      "New revenue opportunities from value-based contracts",
      "Long-term solvency and reserve adequacy",
    ],
  },
  {
    id: "equity",
    label: "Health Equity",
    color: "rose",
    icon: <ScaleIcon className="w-6 h-6" />,
    tagline: "Access, Disparity & Social Determinants",
    description:
      "Quantifies the equity implications of transformation — including geographic access, racial and socioeconomic disparities, transportation barriers, and the distribution of benefits and burdens across vulnerable populations. Transformations that concentrate services or reduce coverage in underserved areas score lower.",
    dimensions: [
      "Geographic access to essential services",
      "Racial and ethnic disparity in outcomes",
      "Social determinants of health burden (housing, food, transport)",
      "Low-income and uninsured population impact",
      "Language access and cultural competency",
    ],
  },
  {
    id: "clinical",
    label: "Clinical Quality",
    color: "amber",
    icon: <HeartIcon className="w-6 h-6" />,
    tagline: "Outcomes, Safety & Patient Experience",
    description:
      "Measures the expected effect of transformation on patient outcomes, care quality, safety events, and patient experience. Accounts for care continuity during transition, workforce capacity to absorb change, and the degree to which transformation is supported by clinical evidence.",
    dimensions: [
      "Preventable hospitalizations and ED utilization",
      "Chronic disease management effectiveness",
      "Care coordination and transition quality",
      "Patient safety events and mortality",
      "Patient experience and satisfaction",
    ],
  },
];

// ─── Use cases ────────────────────────────────────────────────────────────────

const USE_CASES = [
  {
    id: "vermont-act167",
    name: "Vermont Act 167",
    subtitle: "Hospital Transformation Initiative",
    state: "Vermont",
    stateCode: "VT",
    status: "live",
    description:
      "Models the 18+ recommendations from the Oliver Wyman Report for restructuring Vermont's hospital network — including Centers of Excellence consolidation, global budgeting, telehealth expansion, and rural access preservation.",
    pillars: ["policy", "technology", "financial", "equity", "clinical"],
    href: "/vermont-act-167/simulator",
    color: "violet",
    stats: [
      { label: "Hospitals Modeled", value: "14" },
      { label: "Recommendations", value: "18+" },
      { label: "Pillars Scored", value: "5" },
    ],
  },
  {
    id: "california-calaim",
    name: "California CalAIM",
    subtitle: "Medi-Cal Transformation",
    state: "California",
    stateCode: "CA",
    status: "coming-soon",
    description:
      "CalAIM — California's $6.7B Medi-Cal transformation — introduces whole-person care, enhanced care management, community supports, and population health management across 58 counties.",
    pillars: ["policy", "financial", "equity", "clinical"],
    href: "/california-calaim/simulator",
    color: "blue",
    stats: [
      { label: "Managed Care Plans", value: "24" },
      { label: "Beneficiaries", value: "14.2M" },
      { label: "Counties", value: "58" },
    ],
  },
  {
    id: "oregon-cco",
    name: "Oregon CCO 3.0",
    subtitle: "Coordinated Care Organizations",
    state: "Oregon",
    stateCode: "OR",
    status: "coming-soon",
    description:
      "Oregon's third-generation Coordinated Care Organizations model — integrating physical, behavioral, and oral health under global budgets with strong equity accountability and community advisory boards.",
    pillars: ["policy", "financial", "equity", "clinical"],
    href: "/oregon-cco/simulator",
    color: "emerald",
    stats: [
      { label: "CCOs", value: "16" },
      { label: "OHP Members", value: "1.4M" },
      { label: "Global Budget", value: "$3.2B" },
    ],
  },
  {
    id: "cms-rhtp",
    name: "CMS Rural Health Transformation",
    subtitle: "Federal Rural Health Initiative",
    state: "National",
    stateCode: "US",
    status: "coming-soon",
    description:
      "Models CMS's Rural Health Transformation Program — global budget demonstrations, essential hospital designations, and payment reforms across 50-state rural and critical access hospital networks.",
    pillars: ["policy", "technology", "financial", "equity"],
    href: "/dashboard/simulator",
    color: "rose",
    stats: [
      { label: "Participating States", value: "12" },
      { label: "CAHs Modeled", value: "1,300+" },
      { label: "Program Budget", value: "$1.8B" },
    ],
  },
];

// ─── Color helpers ─────────────────────────────────────────────────────────────

const pillarColorMap: Record<string, string> = {
  violet: "bg-violet-50 text-violet-700 border-violet-200",
  blue:   "bg-blue-50 text-blue-700 border-blue-200",
  emerald:"bg-emerald-50 text-emerald-700 border-emerald-200",
  rose:   "bg-rose-50 text-rose-700 border-rose-200",
  amber:  "bg-amber-50 text-amber-700 border-amber-200",
};

const cardAccentMap: Record<string, string> = {
  violet: "border-l-violet-400 bg-violet-50/30",
  blue:   "border-l-blue-400 bg-blue-50/30",
  emerald:"border-l-emerald-400 bg-emerald-50/30",
  rose:   "border-l-rose-400 bg-rose-50/30",
  amber:  "border-l-amber-400 bg-amber-50/30",
};

const pillarsById: Record<string, typeof PILLARS[0]> = Object.fromEntries(
  PILLARS.map(p => [p.id, p])
);

// ─── Main page ─────────────────────────────────────────────────────────────────

export default function HTRSimulatorPage() {
  return (
    <div className="min-h-screen bg-white">

      {/* Hero */}
      <div className="bg-slate-950 text-white">
        <div className="max-w-5xl mx-auto px-6 py-20">
          <span className="text-[10px] font-black uppercase tracking-widest text-violet-400 block mb-4">
            HTR Simulator · Beta
          </span>
          <h1 className="text-5xl font-black tracking-tight mb-5 leading-tight">
            Health Transformation Roadmap Simulator
          </h1>
          <p className="text-xl text-slate-300 max-w-2xl leading-relaxed">
            Model the multi-pillar impact of any combination of healthcare transformation decisions
            before implementation — across policy, technology, financial, equity, and clinical dimensions.
          </p>
          <div className="mt-8">
            <Link
              href="/vermont-act-167/simulator"
              className="inline-flex items-center gap-2 bg-violet-600 hover:bg-violet-500 text-white font-black px-6 py-3 rounded-xl transition-colors"
            >
              Open Vermont Act 167 Simulator <ArrowTopRightOnSquareIcon className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-16 space-y-20">

        {/* What it does */}
        <section>
          <h2 className="text-2xl font-black text-slate-900 mb-2">What the Simulator Does</h2>
          <p className="text-slate-500 mb-8 max-w-2xl">
            A decision-support platform for healthcare policymakers, system leaders, and analysts — providing
            structured, multi-pillar scoring that surfaces tradeoffs and estimates the combined impact of
            any combination of reforms.
          </p>
          <div className="grid md:grid-cols-2 gap-4">
            {[
              {
                icon: <BeakerIcon className="w-5 h-5" />,
                title: "Scenario Modeling",
                body: "Build custom transformation scenarios by selecting any combination of policy recommendations. The simulator instantly scores the combined impact across all five pillars.",
              },
              {
                icon: <CurrencyDollarIcon className="w-5 h-5" />,
                title: "Financial Impact Analysis",
                body: "Projects operating margin trajectories, capital requirements, and long-term solvency for every institution affected by the selected scenario.",
              },
              {
                icon: <ScaleIcon className="w-5 h-5" />,
                title: "Equity Assessment",
                body: "Evaluates how transformation scenarios affect access for vulnerable populations — including rural communities, low-income households, and those without transportation.",
              },
              {
                icon: <MapIcon className="w-5 h-5" />,
                title: "Geographic Visualization",
                body: "Maps the affected institutions and service areas on real geography, making spatial patterns — access gaps, consolidation effects, travel burden — immediately visible.",
              },
              {
                icon: <DocumentTextIcon className="w-5 h-5" />,
                title: "Implementation Roadmap",
                body: "Converts selected scenarios into a prioritized, phased implementation plan with milestones, dependencies, and accountability assignments.",
              },
              {
                icon: <ShieldCheckIcon className="w-5 h-5" />,
                title: "Risk Scoring",
                body: "Each recommendation carries an implementation risk score. The simulator surfaces cumulative risk as scenarios grow in scope, helping planners sequence changes prudently.",
              },
            ].map(item => (
              <div key={item.title} className="bg-white border border-slate-200 rounded-xl p-5 flex gap-4">
                <div className="w-9 h-9 rounded-lg bg-violet-50 border border-violet-200 flex items-center justify-center shrink-0 text-violet-600">
                  {item.icon}
                </div>
                <div>
                  <div className="font-bold text-slate-900 mb-1">{item.title}</div>
                  <div className="text-sm text-slate-600 leading-relaxed">{item.body}</div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 5-Pillar Framework */}
        <section>
          <div className="flex items-center gap-3 mb-2">
            <Square3Stack3DIcon className="w-6 h-6 text-violet-600" />
            <h2 className="text-2xl font-black text-slate-900">The 5-Pillar Scoring Framework</h2>
          </div>
          <p className="text-slate-500 mb-8 max-w-2xl">
            Every transformation scenario is evaluated across five independent pillars. Each pillar
            receives a score from 0–100 based on the recommendations selected, their implementation
            complexity, and expected impact.
          </p>
          <div className="space-y-5">
            {PILLARS.map((pillar) => {
              const colorClass = pillarColorMap[pillar.color];
              const accentClass = cardAccentMap[pillar.color];
              return (
                <div
                  key={pillar.id}
                  className={`bg-white border border-slate-200 border-l-4 ${accentClass} rounded-2xl overflow-hidden`}
                >
                  <div className="p-6">
                    <div className="flex items-start gap-4 mb-4">
                      <div className={`w-11 h-11 rounded-xl border flex items-center justify-center shrink-0 ${colorClass}`}>
                        {pillar.icon}
                      </div>
                      <div>
                        <div className="font-black text-slate-900 text-lg">{pillar.label}</div>
                        <div className={`text-xs font-bold uppercase tracking-widest mt-0.5 ${colorClass.split(" ")[1]}`}>
                          {pillar.tagline}
                        </div>
                      </div>
                    </div>
                    <p className="text-slate-600 leading-relaxed mb-4">{pillar.description}</p>
                    <div>
                      <div className="text-xs font-black uppercase tracking-wider text-slate-500 mb-2">Scored Dimensions</div>
                      <div className="grid sm:grid-cols-2 gap-1.5">
                        {pillar.dimensions.map(d => (
                          <div key={d} className="flex items-center gap-2 text-sm text-slate-700">
                            <CheckCircleIcon className="w-4 h-4 text-slate-400 shrink-0" />
                            {d}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Score interpretation */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6 mt-6">
            <h3 className="text-lg font-black text-slate-900 mb-4">Score Interpretation</h3>
            <div className="grid sm:grid-cols-4 gap-3">
              {[
                { range: "80–100", label: "Strong",     color: "bg-emerald-100 text-emerald-800 border-emerald-200", desc: "High readiness or impact. Minimal barriers." },
                { range: "60–79",  label: "Moderate",   color: "bg-blue-100 text-blue-800 border-blue-200",          desc: "Solid foundation with addressable gaps." },
                { range: "40–59",  label: "Developing", color: "bg-amber-100 text-amber-800 border-amber-200",        desc: "Meaningful gaps requiring targeted investment." },
                { range: "0–39",   label: "Critical",   color: "bg-red-100 text-red-800 border-red-200",              desc: "Significant barriers; transformation at risk." },
              ].map(s => (
                <div key={s.range} className={`border rounded-xl p-4 ${s.color}`}>
                  <div className="text-2xl font-black mb-1">{s.range}</div>
                  <div className="font-bold text-sm mb-1">{s.label}</div>
                  <div className="text-xs leading-relaxed opacity-80">{s.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How the engine works */}
        <section>
          <h2 className="text-2xl font-black text-slate-900 mb-2">How the Simulation Engine Works</h2>
          <p className="text-slate-500 mb-8 max-w-2xl">
            The engine translates a set of selected policy recommendations into quantified impact estimates
            across institutions, geographies, and populations in three stages.
          </p>
          <div className="grid md:grid-cols-3 gap-4 mb-8">
            {[
              {
                step: "01",
                title: "Recommendation Scoring",
                body: "Each recommendation is pre-scored across all five pillars by domain experts. Scores reflect expected impact magnitude, implementation complexity, and risk — anchored to published evidence and comparable transformation programs.",
                color: "violet",
              },
              {
                step: "02",
                title: "Scenario Aggregation",
                body: "When multiple recommendations are selected, the engine aggregates pillar scores using weighted combination logic that accounts for synergies (complementary reforms that amplify each other) and conflicts (reforms that impose competing demands).",
                color: "blue",
              },
              {
                step: "03",
                title: "Impact Projection",
                body: "Aggregated scores are translated into institution-level projections — operating margin trajectories, population access changes, workforce requirements, and technology readiness gaps — visualized across the geographic service area.",
                color: "emerald",
              },
            ].map(s => (
              <div key={s.step} className="bg-white border border-slate-200 rounded-2xl p-6">
                <div className={`text-3xl font-black mb-3 text-${s.color}-300`}>{s.step}</div>
                <div className="font-black text-slate-900 text-lg mb-2">{s.title}</div>
                <p className="text-slate-600 text-sm leading-relaxed">{s.body}</p>
              </div>
            ))}
          </div>

          <div className="bg-amber-50 border border-amber-200 rounded-2xl p-6">
            <div className="flex gap-3">
              <InformationCircleIcon className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
              <div>
                <div className="font-bold text-amber-900 mb-2">Important Limitations</div>
                <ul className="text-sm text-amber-800 space-y-1.5 leading-relaxed">
                  <li>• Simulation outputs are estimates based on structured expert judgment and historical analogues — not actuarial forecasts.</li>
                  <li>• Current use cases use synthetic or aggregated data for illustrative purposes. Institution-level data is approximated from public sources.</li>
                  <li>• The engine does not model political feasibility, stakeholder opposition, or execution quality.</li>
                  <li>• Projections should be treated as directional inputs to decision-making, not precise predictions.</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Use Cases */}
        <section>
          <h2 className="text-2xl font-black text-slate-900 mb-2">Simulation Use Cases</h2>
          <p className="text-slate-500 mb-8 max-w-2xl">
            Each use case is a fully configured instance of the simulation engine — populated with
            context-specific institutions, recommendations, and data.
          </p>
          <div className="space-y-4">
            {USE_CASES.map(uc => {
              const isLive = uc.status === "live";
              const accentClass = cardAccentMap[uc.color];
              const badgeClass = pillarColorMap[uc.color];
              return (
                <div
                  key={uc.id}
                  className={`bg-white border border-slate-200 border-l-4 ${accentClass} rounded-2xl overflow-hidden`}
                >
                  <div className="p-6">
                    <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2 flex-wrap">
                          <span className={`text-xs font-black uppercase tracking-widest px-3 py-1 rounded border ${badgeClass}`}>
                            {uc.stateCode} · {uc.state}
                          </span>
                          {isLive ? (
                            <span className="flex items-center gap-1.5 text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded">
                              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                              Live
                            </span>
                          ) : (
                            <span className="flex items-center gap-1.5 text-xs font-bold text-slate-500 bg-slate-100 border border-slate-200 px-2.5 py-1 rounded">
                              <ClockIcon className="w-3 h-3" />
                              Coming Soon
                            </span>
                          )}
                        </div>
                        <h3 className="text-xl font-black text-slate-900">{uc.name}</h3>
                        <div className="text-sm font-bold text-slate-500 mb-3">{uc.subtitle}</div>
                        <p className="text-slate-600 text-sm leading-relaxed mb-4">{uc.description}</p>
                        <div className="flex flex-wrap gap-4 mb-4">
                          {uc.stats.map(stat => (
                            <div key={stat.label}>
                              <div className="text-lg font-black text-slate-900">{stat.value}</div>
                              <div className="text-xs text-slate-500 font-medium">{stat.label}</div>
                            </div>
                          ))}
                        </div>
                        <div className="flex flex-wrap gap-1.5">
                          {uc.pillars.map(pid => {
                            const p = pillarsById[pid];
                            return (
                              <span key={pid} className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded border ${pillarColorMap[p.color]}`}>
                                {p.label}
                              </span>
                            );
                          })}
                        </div>
                      </div>
                      <div className="shrink-0">
                        {isLive ? (
                          <Link
                            href={uc.href}
                            className="inline-flex items-center gap-2 bg-violet-600 hover:bg-violet-700 text-white font-black text-sm px-5 py-2.5 rounded-xl transition-colors"
                          >
                            Open Simulator <ArrowTopRightOnSquareIcon className="w-4 h-4" />
                          </Link>
                        ) : (
                          <button
                            disabled
                            className="inline-flex items-center gap-2 bg-slate-100 text-slate-400 font-black text-sm px-5 py-2.5 rounded-xl cursor-not-allowed"
                          >
                            <ClockIcon className="w-4 h-4" /> Coming Soon
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="bg-slate-900 rounded-2xl p-6 text-white mt-4">
            <div className="flex items-start gap-3">
              <SparklesIcon className="w-6 h-6 text-violet-400 shrink-0 mt-0.5" />
              <div>
                <div className="font-black text-lg mb-1">Have a use case to propose?</div>
                <p className="text-slate-400 text-sm leading-relaxed mb-4">
                  The HTR Simulator can be configured for any state, federal program, or health system transformation.
                  Contact the HTR team to discuss onboarding your context as a new use case.
                </p>
                <Link
                  href="/advisory"
                  className="inline-flex items-center gap-2 bg-violet-600 hover:bg-violet-500 text-white font-bold text-sm px-4 py-2 rounded-lg transition-colors"
                >
                  Contact Advisory Team <ArrowTopRightOnSquareIcon className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Methodology */}
        <section>
          <h2 className="text-2xl font-black text-slate-900 mb-2">Methodology</h2>
          <p className="text-slate-500 mb-8 max-w-2xl">
            Grounded in structured decision analysis, health policy research, and lessons from comparable
            transformation programs across the United States.
          </p>

          <div className="bg-white border border-slate-200 rounded-2xl p-6 mb-6">
            <h3 className="text-lg font-black text-slate-900 mb-4">Recommendation Scoring</h3>
            <div className="grid sm:grid-cols-2 gap-4">
              {[
                {
                  label: "Impact Magnitude",
                  desc: "Expected size of effect if successfully implemented — based on comparable programs and published evidence.",
                },
                {
                  label: "Implementation Complexity",
                  desc: "Estimated difficulty of executing the recommendation — accounting for stakeholder dynamics, technical requirements, and regulatory hurdles.",
                },
                {
                  label: "Time to Effect",
                  desc: "How quickly the expected impact would materialize — from immediate operational changes to multi-year structural shifts.",
                },
                {
                  label: "Confidence Level",
                  desc: "Quality of evidence supporting the impact estimate — ranging from strong empirical evidence to informed expert judgment.",
                },
              ].map(d => (
                <div key={d.label} className="bg-slate-50 rounded-xl p-4 border border-slate-100">
                  <div className="font-bold text-slate-900 mb-1 text-sm">{d.label}</div>
                  <div className="text-xs text-slate-600 leading-relaxed">{d.desc}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white border border-slate-200 rounded-2xl p-6 mb-6">
            <h3 className="text-lg font-black text-slate-900 mb-4">Data Sources</h3>
            <div className="space-y-2">
              {[
                ["CMS Provider of Services File", "Hospital characteristics, certification, bed counts"],
                ["CMS Cost Reports (HCRIS)", "Financial performance, operating margins, payer mix"],
                ["AHA Annual Survey", "Services, staffing, affiliations, technology adoption"],
                ["Census Bureau ACS", "Population demographics, income, transportation access"],
                ["HIFLD Open Data", "Facility locations, geographic service area analysis"],
                ["Oliver Wyman / Consulting Reports", "Transformation recommendations, industry benchmarks"],
                ["State All-Payer Claims Databases", "Utilization patterns, care coordination metrics (where available)"],
              ].map(([source, desc]) => (
                <div key={source} className="flex items-start gap-3 py-2 border-b border-slate-100 last:border-0">
                  <CheckCircleIcon className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                  <div>
                    <div className="text-sm font-bold text-slate-900">{source}</div>
                    <div className="text-xs text-slate-500">{desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-start gap-3 bg-blue-50 border border-blue-200 rounded-xl p-4">
            <InformationCircleIcon className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
            <div className="text-sm text-blue-800">
              <span className="font-bold">Current version: Beta.</span> The HTR Simulator methodology is under active development.
              Scoring models, data sources, and projection logic will be refined as use cases are added and
              expert review is completed.
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}
