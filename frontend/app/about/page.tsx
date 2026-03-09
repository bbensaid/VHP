import React from "react";
import Link from "next/link";

const pillars = [
  {
    id: "policy",
    label: "Policy",
    color: "text-sky-700",
    bg: "bg-sky-50",
    border: "border-sky-200",
    accent: "bg-sky-600",
    hover: "hover:border-sky-400 hover:bg-sky-50/80",
    question: "Is it permissible?",
    href: "/policy",
    description:
      "Regulatory intelligence, legislative tracking, and global comparative analysis. We decode the governance frameworks that determine what rural health transformation is allowed to be.",
    subcategories: ["Regulation & Legislation", "Public Health Mandates", "Global & Comparative Policy", "Policy Feasibility Studies"],
  },
  {
    id: "economics",
    label: "Economics",
    color: "text-emerald-700",
    bg: "bg-emerald-50",
    border: "border-emerald-200",
    accent: "bg-emerald-500",
    hover: "hover:border-emerald-400 hover:bg-emerald-50/80",
    question: "Is it sustainable?",
    href: "/economics",
    description:
      "Value-based care modeling, market dynamics, and workforce investment strategy. We follow capital flows to determine what rural health transformation can actually afford.",
    subcategories: ["Value-Based Care Models", "Market & Finance", "Labor & Workforce Strategy", "Healthcare Investment Trends"],
  },
  {
    id: "technology",
    label: "Technology",
    color: "text-indigo-700",
    bg: "bg-indigo-50",
    border: "border-indigo-200",
    accent: "bg-indigo-500",
    hover: "hover:border-indigo-400 hover:bg-indigo-50/80",
    question: "Is it possible?",
    href: "/technology",
    description:
      "AI integration, digital infrastructure, and data governance. We evaluate the tools that amplify human clinical capacity and determine operational feasibility at the point of care.",
    subcategories: ["AI & Machine Learning", "Digital Health & Telemedicine", "Data Security & Governance", "Tech-Enabled Workflow"],
  },
  {
    id: "clinical",
    label: "Clinical",
    color: "text-rose-700",
    bg: "bg-rose-50",
    border: "border-rose-200",
    accent: "bg-rose-500",
    hover: "hover:border-rose-400 hover:bg-rose-50/80",
    question: "Is it effective?",
    href: "/clinical",
    description:
      "Evidence-based care models, population health strategy, and precision medicine access. We bridge the gap between clinical innovation and rural deployment reality.",
    subcategories: ["Hospital-at-Home", "Precision Medicine", "Virtual Care Models", "Population Health"],
  },
  {
    id: "equity",
    label: "Equity",
    color: "text-violet-700",
    bg: "bg-violet-50",
    border: "border-violet-200",
    accent: "bg-violet-500",
    hover: "hover:border-violet-400 hover:bg-violet-50/80",
    question: "Is it just?",
    href: "/equity",
    description:
      "SDOH integration, algorithmic bias, and access disparity analysis. We hold transformation accountable to the communities it is meant to serve.",
    subcategories: ["SDOH Integration", "Algorithmic Bias", "Access Disparity", "Community Engagement"],
  },
];

const stats = [
  { value: "50", label: "States Tracked", suffix: "" },
  { value: "1,366", label: "Critical Access Hospitals Monitored", suffix: "" },
  { value: "$50B+", label: "RHT Program Capital Analyzed", suffix: "" },
  { value: "20", label: "Research Domains Covered", suffix: "" },
];

const team = [
  {
    name: "Dr. Sarah Chen",
    role: "Chief Intelligence Officer",
    focus: "Health Policy & Federal Regulation",
    initials: "SC",
    color: "bg-sky-100 text-sky-700",
  },
  {
    name: "Marcus Webb",
    role: "Principal Economist",
    focus: "Value-Based Care & Capital Markets",
    initials: "MW",
    color: "bg-emerald-100 text-emerald-700",
  },
  {
    name: "Dr. Priya Nair",
    role: "Technology Research Director",
    focus: "AI/ML Systems & Digital Infrastructure",
    initials: "PN",
    color: "bg-indigo-100 text-indigo-700",
  },
  {
    name: "James Okafor",
    role: "Clinical Affairs Lead",
    focus: "Evidence-Based Care & Workforce",
    initials: "JO",
    color: "bg-rose-100 text-rose-700",
  },
  {
    name: "Dr. Lucia Reyes",
    role: "Equity & SDOH Director",
    focus: "Health Disparities & Community Systems",
    initials: "LR",
    color: "bg-violet-100 text-violet-700",
  },
];

export default function AboutPage() {
  return (
    <div className="bg-white font-sans text-slate-800 min-h-screen">
      
      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-slate-900 text-white py-24 md:py-32">
        {/* Subtle grid texture */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
        {/* Indigo accent orb */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-indigo-600/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4 pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <span className="inline-block text-[11px] font-black tracking-[0.2em] uppercase text-indigo-400 mb-6 border border-indigo-800 bg-indigo-900/40 px-4 py-1.5 rounded-full">
              About Health Transformation Review
            </span>
            <h1 className="text-5xl md:text-7xl font-black tracking-tight leading-[0.9] mb-8">
              The Intelligence<br />
              <span className="text-indigo-400">Layer</span> Between<br />
              Data and Decision.
            </h1>
            <p className="text-xl text-slate-300 leading-relaxed max-w-2xl mb-10">
              HTR is the only cross-disciplinary intelligence platform purpose-built for rural health system transformation. We translate the intersection of five critical domains into actionable intelligence for the executives, policymakers, and clinicians who are doing the work.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/dashboard"
                className="inline-flex items-center gap-2 bg-indigo-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-indigo-700 transition-colors"
              >
                Explore the Dashboard
                <span aria-hidden>→</span>
              </Link>
              <Link
                href="/mission"
                className="inline-flex items-center gap-2 bg-white/10 text-white border border-white/20 px-6 py-3 rounded-lg font-bold hover:bg-white/20 transition-colors"
              >
                Our Mission & Vision
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── STATS BAR ─────────────────────────────────────────────────────── */}
      <section className="bg-slate-50 border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:divide-x divide-slate-200">
            {stats.map((s) => (
              <div key={s.label} className="text-center px-4 first:pl-0 last:pr-0">
                <div className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight">
                  {s.value}
                </div>
                <div className="text-xs text-slate-500 font-bold uppercase tracking-widest mt-1">
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHY HTR ───────────────────────────────────────────────────────── */}
      <section className="py-20 md:py-28 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div>
            <span className="text-[11px] font-black tracking-[0.2em] uppercase text-indigo-600 mb-4 block">
              The Translation Problem
            </span>
            <h2 className="text-4xl md:text-5xl font-black tracking-tight text-slate-900 leading-tight mb-6">
              Why does a{" "}
              <span className="text-indigo-600">$50 billion</span>{" "}
              mandate still produce so little change?
            </h2>
            <p className="text-lg text-slate-600 leading-relaxed mb-6">
              The Rural Health Transformation program represents the largest federal investment in rural health infrastructure in a generation. Yet the capital is not reaching patients at the rate it should — because the people who design policy, model economics, and deploy technology are operating in silos.
            </p>
            <p className="text-lg text-slate-600 leading-relaxed">
              HTR exists to close that gap. Our five-pillar framework — Policy, Economics, Technology, Clinical, and Equity — is designed so that no decision is made in isolation. Every insight is stress-tested across all dimensions before it reaches you.
            </p>
          </div>

          {/* Vermont case study card */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-xl overflow-hidden">
            <div className="bg-slate-900 px-6 py-4 flex items-center justify-between">
              <span className="text-xs font-black uppercase tracking-widest text-slate-300">
                Case Study — Vermont
              </span>
              <span className="bg-red-500 text-white text-[10px] font-black px-2 py-1 rounded uppercase tracking-wider">
                Critical
              </span>
            </div>
            <div className="p-6 space-y-4">
              <p className="text-sm text-slate-500 font-medium">
                The convergence failure that defines why HTR exists:
              </p>
              {[
                {
                  label: "Policy enacted telehealth flexibilities",
                  sub: "But broadband didn't reach 38% of rural addresses",
                  icon: "📋",
                },
                {
                  label: "Economics approved VBC incentive pools",
                  sub: "But 9 of 14 hospitals lacked care coordination infrastructure",
                  icon: "📊",
                },
                {
                  label: "Technology deployed AI triage tools",
                  sub: "But the models were trained on urban patient populations",
                  icon: "🤖",
                },
                {
                  label: "Clinical innovations sat in journals",
                  sub: "Without a deployment pathway to CAH settings",
                  icon: "🏥",
                },
                {
                  label: "Equity was measured last, not first",
                  sub: "SDOH data missing from 67% of high-risk patient records",
                  icon: "⚖️",
                },
              ].map((item) => (
                <div key={item.label} className="flex gap-3 p-3 rounded-lg bg-slate-50 border border-slate-100">
                  <span className="text-lg flex-shrink-0">{item.icon}</span>
                  <div>
                    <p className="text-sm font-bold text-slate-900">{item.label}</p>
                    <p className="text-xs text-red-600 mt-0.5">{item.sub}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── 5 PILLARS ─────────────────────────────────────────────────────── */}
      <section className="bg-slate-50 border-y border-slate-200 py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <span className="text-[11px] font-black tracking-[0.2em] uppercase text-indigo-600 mb-4 block">
              Our Intelligence Framework
            </span>
            <h2 className="text-4xl md:text-5xl font-black tracking-tight text-slate-900 mb-4">
              Five Pillars. One Framework.
            </h2>
            <p className="text-xl text-slate-500 max-w-2xl mx-auto">
              Where the original model analyzed three dimensions, HTR's evolved framework asks five essential questions — because transformation that ignores clinical evidence or equity is incomplete.
            </p>
          </div>

          <div className="grid md:grid-cols-5 gap-4">
            {pillars.map((p) => (
              <Link
                key={p.id}
                href={p.href}
                className={`group block p-6 bg-white rounded-xl border ${p.border} ${p.hover} transition-all duration-200 shadow-sm hover:shadow-md`}
              >
                {/* Accent bar */}
                <div className={`w-10 h-1 ${p.accent} rounded-full mb-5`} />
                <h3 className={`text-xl font-black mb-2 ${p.color}`}>
                  {p.label}
                </h3>
                <p className="text-xs text-slate-500 mb-4 leading-relaxed">
                  {p.description}
                </p>
                <div className={`inline-block text-xs font-black italic ${p.color} ${p.bg} px-2 py-1 rounded mb-4`}>
                  &ldquo;{p.question}&rdquo;
                </div>
                <ul className="space-y-1">
                  {p.subcategories.map((cat) => (
                    <li key={cat} className="text-[11px] text-slate-500 flex items-center gap-1.5">
                      <span className={`w-1 h-1 rounded-full flex-shrink-0 ${p.accent}`} />
                      {cat}
                    </li>
                  ))}
                </ul>
                <div className={`mt-4 text-xs font-bold ${p.color} opacity-0 group-hover:opacity-100 transition-opacity`}>
                  Explore pillar →
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHO WE SERVE ──────────────────────────────────────────────────── */}
      <section className="py-20 md:py-28 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <span className="text-[11px] font-black tracking-[0.2em] uppercase text-indigo-600 mb-4 block">
            Our Audience
          </span>
          <h2 className="text-4xl font-black tracking-tight text-slate-900">
            Built for the people doing the work.
          </h2>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            {
              icon: "🏛️",
              title: "Health System Executives",
              desc: "CFOs, CNOs, CIOs, and CEOs navigating operating margin crises, value-based contract transitions, and technology procurement decisions that will define the next decade.",
            },
            {
              icon: "📜",
              title: "Policy Architects",
              desc: "Federal and state health officials, legislative staff, and think tank analysts who need cross-disciplinary evidence to design interventions that are not only permissible but deployable.",
            },
            {
              icon: "💹",
              title: "Health Economy Investors",
              desc: "PE firms, venture capital, health system M&A teams, and community development finance institutions allocating capital into rural health infrastructure.",
            },
            {
              icon: "🩺",
              title: "Clinical Innovators",
              desc: "Physicians, nurses, and allied health leaders implementing evidence-based models like Hospital-at-Home, telehealth, and precision medicine in resource-constrained rural settings.",
            },
            {
              icon: "🎓",
              title: "Health Equity Researchers",
              desc: "Academic investigators, community health organizations, and SDOH practitioners who need data-driven analysis of disparity trends, algorithmic fairness, and access gap interventions.",
            },
            {
              icon: "🤝",
              title: "Advisory Consultants",
              desc: "Management consultants, strategy advisors, and expert witnesses who require rigorous, non-partisan intelligence that can withstand scrutiny at the board level and in regulatory proceedings.",
            },
          ].map((a) => (
            <div key={a.title} className="p-6 bg-white border border-slate-200 rounded-xl shadow-sm">
              <span className="text-3xl mb-4 block">{a.icon}</span>
              <h3 className="text-lg font-bold text-slate-900 mb-2">{a.title}</h3>
              <p className="text-sm text-slate-600 leading-relaxed">{a.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── TEAM ──────────────────────────────────────────────────────────── */}
      <section className="bg-slate-900 text-white py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <span className="text-[11px] font-black tracking-[0.2em] uppercase text-indigo-400 mb-4 block">
              Principal Analysts
            </span>
            <h2 className="text-4xl font-black tracking-tight">
              One analyst per pillar. Zero silos.
            </h2>
            <p className="text-slate-400 mt-4 max-w-xl mx-auto">
              Each domain is led by a dedicated principal analyst — former policymakers, practicing clinicians, and credentialed economists who collaborate to ensure every insight accounts for all five dimensions.
            </p>
          </div>
          <div className="grid md:grid-cols-5 gap-4">
            {team.map((m) => (
              <div key={m.name} className="bg-white/5 border border-white/10 rounded-xl p-6 text-center hover:bg-white/10 transition-colors">
                <div className={`w-14 h-14 rounded-full ${m.color} flex items-center justify-center text-xl font-black mx-auto mb-4`}>
                  {m.initials}
                </div>
                <h3 className="font-bold text-white text-sm leading-tight mb-1">{m.name}</h3>
                <p className="text-indigo-400 text-xs font-bold uppercase tracking-wider mb-2">{m.role}</p>
                <p className="text-slate-400 text-xs leading-relaxed">{m.focus}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ───────────────────────────────────────────────────────────── */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl md:text-4xl font-black tracking-tight text-slate-900 mb-4">
          The intelligence you need is already here.
        </h2>
        <p className="text-lg text-slate-500 mb-8 max-w-xl mx-auto">
          Start with the State Performance Dashboard, or dive into any of the five pillars. Every page is built for action, not just reading.
        </p>
        <div className="flex flex-wrap gap-4 justify-center">
          <Link href="/dashboard" className="inline-flex items-center gap-2 bg-slate-900 text-white px-8 py-4 rounded-lg font-bold hover:bg-slate-800 transition-colors">
            Launch Dashboard
          </Link>
          <Link href="/subscribe" className="inline-flex items-center gap-2 bg-indigo-600 text-white px-8 py-4 rounded-lg font-bold hover:bg-indigo-700 transition-colors">
            Choose Your Intelligence Level
          </Link>
        </div>
      </section>
    </div>
  );
}