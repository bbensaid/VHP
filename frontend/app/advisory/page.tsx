import React from "react";
import Link from "next/link";
import { ADVISORY_SERVICES, ADVISORY_STATS, CLIENT_SEGMENTS, PILLAR_STYLES } from "@/lib/advisory-data";

export const metadata = {
  title: "HTR Advisory | Healthcare Strategy Consulting",
  description:
    "World-class healthcare advisory services across all 5 pillars: Policy, Economics, Technology, Clinical, and Equity. Strategic consulting, IT project advisory, financial auditing, regulatory counsel, and executive training.",
};

export default function AdvisoryPage() {
  return (
    <div className="bg-white min-h-screen">

      {/* ── HERO ──────────────────────────────────────────────────────────── */}
      <div className="relative bg-slate-950 text-white overflow-hidden">
        <div className="absolute inset-0 bg-linear-to-br from-fuchsia-900/30 via-slate-950 to-indigo-900/20 pointer-events-none" />
        <div className="container mx-auto px-4 md:px-8 max-w-6xl py-28 md:py-36 relative z-10">
          <div className="flex items-center gap-3 mb-6">
            <span className="bg-fuchsia-600 text-white text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full">
              HTR Advisory
            </span>
            <span className="text-slate-400 text-sm">Burlington, VT · Washington, DC</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-black tracking-tight mb-8 leading-tight max-w-4xl">
            Healthcare Strategy at Every Level of the Enterprise
          </h1>
          <p className="text-xl text-slate-300 max-w-3xl leading-relaxed mb-4">
            The convergence of <strong className="text-sky-400">Policy</strong>, <strong className="text-emerald-400">Economics</strong>, <strong className="text-indigo-400">Technology</strong>, <strong className="text-red-400">Clinical</strong>, and <strong className="text-amber-400">Equity</strong> creates complexity that generalist consultants cannot navigate.
          </p>
          <p className="text-xl text-slate-300 max-w-3xl leading-relaxed mb-10">
            <strong className="text-white">HTR Advisory</strong> deploys cross-disciplinary expertise grounded in <em>daily intelligence research</em> — not periodic benchmarks. We compete with McKinsey, Deloitte, and Oliver Wyman on insight quality. We beat them on speed, independence, and depth of domain knowledge.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link
              href="/advisory/contact"
              className="inline-block px-8 py-4 bg-fuchsia-600 text-white font-black text-lg rounded-lg hover:bg-fuchsia-500 transition-colors shadow-lg"
            >
              Book a Discovery Call
            </Link>
            <Link
              href="/advisory/services"
              className="inline-block px-8 py-4 bg-white/10 text-white font-bold text-lg rounded-lg hover:bg-white/20 transition-colors border border-white/20"
            >
              View All Services
            </Link>
          </div>
        </div>
      </div>

      {/* ── FIVE PILLARS BAND ─────────────────────────────────────────────── */}
      <div className="bg-indigo-700 border-b border-indigo-800">
        <div className="container mx-auto px-4 md:px-8 max-w-6xl py-4">
          <div className="flex flex-wrap items-center gap-2 justify-center md:justify-start">
            <span className="text-indigo-200 text-xs font-bold uppercase tracking-widest mr-3">5 Pillar Framework:</span>
            {(Object.entries(PILLAR_STYLES) as [keyof typeof PILLAR_STYLES, typeof PILLAR_STYLES[keyof typeof PILLAR_STYLES]][]).map(([key, styles]) => (
              <span key={key} className={`text-xs font-bold px-3 py-1 rounded-full ${styles.bg} ${styles.text} ${styles.border} border`}>
                {styles.label}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* ── STATS BAR ─────────────────────────────────────────────────────── */}
      <div className="bg-indigo-700 text-white py-10 border-b border-indigo-800">
        <div className="container mx-auto px-4 md:px-8 max-w-6xl">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8 text-center">
            {ADVISORY_STATS.map((stat) => (
              <div key={stat.label}>
                <div className="text-4xl font-black text-fuchsia-300 mb-1">{stat.value}</div>
                <div className="text-indigo-200 text-sm font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── 8 SERVICES GRID ───────────────────────────────────────────────── */}
      <div className="container mx-auto px-4 md:px-8 max-w-6xl py-20">
        <div className="text-center mb-14">
          <span className="text-xs font-black text-fuchsia-600 uppercase tracking-widest block mb-3">Our Services</span>
          <h2 className="text-4xl font-black text-slate-900 mb-4">Eight Practice Areas. One Integrated Framework.</h2>
          <p className="text-xl text-slate-500 max-w-3xl mx-auto">
            Every HTR Advisory engagement draws from the full 5-pillar framework — because healthcare problems never respect disciplinary boundaries.
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {ADVISORY_SERVICES.map((service) => (
            <div
              key={service.id}
              className="group p-6 bg-white border-2 border-slate-100 rounded-xl shadow-sm hover:shadow-xl hover:border-fuchsia-200 transition-all duration-300"
            >
              <div className={`w-12 h-12 ${service.accentBg} ${service.accentText} rounded-xl flex items-center justify-center text-2xl mb-5 border ${service.accentBorder}`}>
                {service.icon}
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-fuchsia-700 transition-colors">
                {service.title}
              </h3>
              <p className="text-slate-500 text-sm leading-relaxed mb-4 line-clamp-3">
                {service.shortDescription}
              </p>
              <div className="flex flex-wrap gap-1 mb-4">
                {service.pillars.slice(0, 3).map((p) => (
                  <span key={p} className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full ${PILLAR_STYLES[p].bg} ${PILLAR_STYLES[p].text}`}>
                    {PILLAR_STYLES[p].label}
                  </span>
                ))}
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-slate-400 font-medium">From {service.startingPrice}</span>
                <Link
                  href={service.href}
                  className="text-fuchsia-600 font-bold text-sm hover:underline"
                >
                  Learn more →
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── THE 5-PILLAR ADVANTAGE ────────────────────────────────────────── */}
      <div className="bg-slate-50 py-20 border-y border-slate-200">
        <div className="container mx-auto px-4 md:px-8 max-w-6xl">
          <div className="text-center mb-14">
            <h2 className="text-4xl font-black text-slate-900 mb-4">The HTR 5-Pillar Advantage</h2>
            <p className="text-xl text-slate-500 max-w-3xl mx-auto">
              Every recommendation we make is stress-tested against all five dimensions of healthcare transformation. Siloed expertise creates blind spots. We eliminate them.
            </p>
          </div>
          <div className="grid md:grid-cols-5 gap-6">
            {[
              { pillar: "policy" as const, title: "Policy", desc: "Federal and state regulatory environment, legislative dynamics, compliance obligations, and policy feasibility analysis." },
              { pillar: "economics" as const, title: "Economics", desc: "Value-based care economics, payer contract strategy, financial modeling, market dynamics, and investment analysis." },
              { pillar: "technology" as const, title: "Technology", desc: "Health IT systems, AI governance, interoperability, digital health program management, and cybersecurity." },
              { pillar: "clinical" as const, title: "Clinical", desc: "Clinical operations, care model design, quality performance, workforce capacity, and patient outcomes." },
              { pillar: "equity" as const, title: "Equity", desc: "SDOH integration, algorithmic bias, access disparities, community engagement, and health equity program design." },
            ].map((item) => (
              <div key={item.pillar} className={`rounded-xl p-6 border-2 ${PILLAR_STYLES[item.pillar].bg} ${PILLAR_STYLES[item.pillar].border}`}>
                <div className={`text-lg font-black mb-3 ${PILLAR_STYLES[item.pillar].text}`}>{item.title}</div>
                <p className="text-slate-600 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── HOW WE WORK ───────────────────────────────────────────────────── */}
      <div className="container mx-auto px-4 md:px-8 max-w-6xl py-20">
        <div className="text-center mb-14">
          <h2 className="text-4xl font-black text-slate-900 mb-4">How We Work</h2>
          <p className="text-xl text-slate-500 max-w-2xl mx-auto">
            A structured, transparent engagement model designed around your timeline and decision-making process.
          </p>
        </div>
        <div className="grid md:grid-cols-4 gap-8">
          {[
            { step: "01", title: "Discovery Call", duration: "Week 1", desc: "Define your challenge, objectives, and key questions. We assess fit, scope, and suggest the right service line — no obligation." },
            { step: "02", title: "Engagement Design", duration: "Weeks 1–2", desc: "We propose a tailored methodology, team composition, timeline, and deliverables. You approve the scope before work begins." },
            { step: "03", title: "Analysis & Delivery", duration: "Weeks 3–12", desc: "Structured work sprints with interim briefings. You see the analysis as it develops — no surprises at final delivery." },
            { step: "04", title: "Ongoing Advisory", duration: "Optional", desc: "Many clients convert to a quarterly retainer for ongoing counsel, implementation support, and strategy evolution." },
          ].map((item) => (
            <div key={item.step} className="relative">
              <div className="text-6xl font-black text-slate-100 mb-4 leading-none">{item.step}</div>
              <div className="text-xs font-bold text-fuchsia-600 uppercase tracking-widest mb-2">{item.duration}</div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">{item.title}</h3>
              <p className="text-slate-500 text-sm leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
        <div className="text-center mt-10">
          <Link href="/advisory/approach" className="text-fuchsia-600 font-bold hover:underline text-sm">
            Read our full methodology → How We Work
          </Link>
        </div>
      </div>

      {/* ── CLIENT TYPES ──────────────────────────────────────────────────── */}
      <div className="bg-indigo-700 text-white py-20">
        <div className="container mx-auto px-4 md:px-8 max-w-6xl">
          <div className="text-center mb-14">
            <h2 className="text-4xl font-black mb-4">Types of Clients We Serve</h2>
            <p className="text-xl text-indigo-100 max-w-2xl mx-auto">
              From the bedside to the boardroom to the Capitol — we work across every part of the U.S. healthcare system.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {CLIENT_SEGMENTS.map((client) => (
              <div key={client.name} className="bg-indigo-600 rounded-xl p-6 border border-indigo-500 hover:border-fuchsia-400 transition-colors">
                <div className="text-3xl mb-4">{client.icon}</div>
                <h3 className="text-lg font-bold text-white mb-2">{client.name}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{client.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── WHY HTR VS BIG CONSULTING ─────────────────────────────────────── */}
      <div className="container mx-auto px-4 md:px-8 max-w-6xl py-20">
        <div className="text-center mb-14">
          <h2 className="text-4xl font-black text-slate-900 mb-4">Why HTR Advisory vs. The Big Firms</h2>
          <p className="text-xl text-slate-500 max-w-2xl mx-auto">
            McKinsey, Deloitte, and Oliver Wyman offer brand recognition. We offer something rarer: embedded expertise, non-partisan analysis, and speed.
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-linear-to-b from-fuchsia-50 to-white border-2 border-fuchsia-200 rounded-xl p-8">
            <div className="text-4xl mb-4">📡</div>
            <h3 className="text-xl font-bold text-slate-900 mb-3">Embedded Intelligence</h3>
            <p className="text-slate-600 leading-relaxed text-sm">
              Our advisors publish daily intelligence on the same topics we consult on. When CMS releases a final rule, we&apos;ve already modeled the impact — before you even book the discovery call. Big firms catch up weeks later.
            </p>
          </div>
          <div className="bg-linear-to-b from-fuchsia-50 to-white border-2 border-fuchsia-200 rounded-xl p-8">
            <div className="text-4xl mb-4">⚖️</div>
            <h3 className="text-xl font-bold text-slate-900 mb-3">Non-Partisan Framework</h3>
            <p className="text-slate-600 leading-relaxed text-sm">
              We have no vendor relationships, no preferred referral partners, and no political donors. Our only incentive is the quality of the outcome for your organization. We tell you the truth, even when it&apos;s uncomfortable.
            </p>
          </div>
          <div className="bg-linear-to-b from-fuchsia-50 to-white border-2 border-fuchsia-200 rounded-xl p-8">
            <div className="text-4xl mb-4">⚡</div>
            <h3 className="text-xl font-bold text-slate-900 mb-3">Speed to Insight</h3>
            <p className="text-slate-600 leading-relaxed text-sm">
              Healthcare decisions don&apos;t wait for a 6-month engagement. We deliver rapid policy briefs in 2 weeks, project assessments in 4 weeks, and financial reviews in 6 weeks — without cutting corners on rigor.
            </p>
          </div>
        </div>
      </div>

      {/* ── FINAL CTA ─────────────────────────────────────────────────────── */}
      <div className="bg-linear-to-r from-fuchsia-700 via-indigo-700 to-slate-900 py-24">
        <div className="container mx-auto px-4 md:px-8 max-w-4xl text-center text-white">
          <h2 className="text-4xl md:text-5xl font-black mb-6">Ready to Engage?</h2>
          <p className="text-xl text-fuchsia-200 mb-10 max-w-2xl mx-auto leading-relaxed">
            Schedule a no-obligation discovery call with a principal advisor. We&apos;ll identify the right service line, scope a proposal, and have a plan in front of you within 5 business days.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              href="/advisory/contact"
              className="inline-block px-10 py-5 bg-white text-fuchsia-700 font-black text-xl rounded-xl hover:bg-fuchsia-50 transition-all shadow-2xl"
            >
              Book a Discovery Call
            </Link>
            <Link
              href="/advisory/services"
              className="inline-block px-10 py-5 bg-transparent text-white font-bold text-xl rounded-xl hover:bg-white/10 transition-all border-2 border-white/40"
            >
              View All Services
            </Link>
          </div>
          <p className="mt-6 text-fuchsia-300 text-sm">Burlington, VT · Washington, DC · Remote engagements worldwide</p>
        </div>
      </div>
    </div>
  );
}
