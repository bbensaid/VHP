import Link from "next/link";
import { ADVISORY_SERVICES, PILLAR_STYLES } from "@/lib/advisory-data";

export const metadata = {
  title: "Regulatory & Legislative Advisory | HTR Advisory",
  description:
    "HTR Advisory advises government regulators, legislative staff, and public health agencies on health policy design, rulemaking, and implementation. Expert testimony. Policy drafting. Regulatory impact analysis.",
};

const service = ADVISORY_SERVICES.find((s) => s.id === "regulatory")!;

export default function RegulatoryAdvisoryPage() {
  return (
    <div className="bg-white min-h-screen pb-20">

      {/* ── HERO ──────────────────────────────────────────────────────────── */}
      <div className="bg-indigo-700 text-white py-8 border-b border-indigo-800">
        <div className="container mx-auto px-4 md:px-8 max-w-5xl">
          <div className="flex items-center gap-2 mb-4">
            <span className="bg-indigo-600 text-indigo-100 border border-indigo-500 text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded">
              HTR Advisory
            </span>
            <span className="text-indigo-200 text-xs">Policy + All 6 Pillars</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight mb-6 leading-tight">
            Regulatory & Legislative <span className="text-fuchsia-400">Advisory</span>
          </h1>
          <p className="text-base text-slate-300 max-w-3xl leading-relaxed mb-8">
            Advising government regulators, legislative staff, and public health agencies on the <strong className="text-white">design, implementation, and evaluation of health policy</strong>. We translate complex clinical, technological, and economic realities into actionable regulatory frameworks — grounded in daily research, not periodic benchmarks.
          </p>
          <div className="flex flex-wrap gap-3">
            {service.clientTypes.map((ct) => (
              <span key={ct} className="bg-indigo-600 border border-indigo-500 text-indigo-100 text-xs font-semibold px-3 py-1 rounded-full">
                {ct}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* ── PILLAR COVERAGE ───────────────────────────────────────────────── */}
      <div className="container mx-auto px-4 md:px-8 max-w-5xl pt-12 pb-4">
        <p className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-3">Pillar Coverage</p>
        <div className="flex flex-wrap gap-2">
          {service.pillars.map((p) => (
            <span key={p} className={`inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-full border ${PILLAR_STYLES[p].bg} ${PILLAR_STYLES[p].text} ${PILLAR_STYLES[p].border}`}>
              {PILLAR_STYLES[p].label}
            </span>
          ))}
        </div>
      </div>

      {/* ── WHY HTR FOR GOVERNMENT ────────────────────────────────────────── */}
      <div className="container mx-auto px-4 md:px-8 max-w-5xl py-12">
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-sky-50 border border-sky-200 rounded-xl p-6">
            <div className="text-sky-700 text-2xl mb-3">📋</div>
            <h3 className="font-bold text-slate-900 mb-2">Evidence-Based Rulemaking</h3>
            <p className="text-slate-600 text-sm leading-relaxed">We synthesize peer-reviewed evidence, state-level case studies, and proprietary data to build the evidentiary foundation regulators need to withstand legal challenge.</p>
          </div>
          <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-6">
            <div className="text-emerald-700 text-2xl mb-3">💡</div>
            <h3 className="font-bold text-slate-900 mb-2">Practitioner Perspective</h3>
            <p className="text-slate-600 text-sm leading-relaxed">Unlike academia, our analysts work with health systems and payers daily. We know which policy designs work in practice — and which create unintended operational consequences.</p>
          </div>
          <div className="bg-red-50 border border-red-200 rounded-xl p-6">
            <div className="text-red-700 text-2xl mb-3">⚡</div>
            <h3 className="font-bold text-slate-900 mb-2">Rapid Turnaround</h3>
            <p className="text-slate-600 text-sm leading-relaxed">Legislation moves at the speed of politics. We staff dedicated analyst teams for time-sensitive rulemaking support — policy briefs in 2 weeks, not 6 months.</p>
          </div>
        </div>
      </div>

      {/* ── SPECIALTY PRACTICE AREAS ──────────────────────────────────────── */}
      <div className="container mx-auto px-4 md:px-8 max-w-5xl py-8">
        <h2 className="text-2xl font-bold text-slate-900 mb-8">Regulatory Practice Areas</h2>
        <div className="grid md:grid-cols-2 gap-6">
          {[
            { pillar: "policy" as const, icon: "⚖️", title: "Federal Health Policy (CMS / ONC / CMMI)", desc: "Rulemaking support for CMS annual payment rules, CMMI model design and evaluation, ONC interoperability and health IT regulations, and No Surprises Act implementation guidance." },
            { pillar: "policy" as const, icon: "🏛️", title: "State Medicaid & All-Payer Programs", desc: "State plan amendments, 1115 waiver design, all-payer model feasibility, global budget program design, and state health reform implementation advisory." },
            { pillar: "clinical" as const, icon: "🏥", title: "Clinical Care Regulations", desc: "Scope-of-practice reform analysis, certificate-of-need law review, hospital licensing regulations, and quality reporting program design for state health departments." },
            { pillar: "technology" as const, icon: "🤖", title: "AI & Digital Health Governance", desc: "Regulatory frameworks for AI in clinical decision support, algorithm transparency requirements, telemedicine parity laws, and data privacy regulations (HIPAA, state-level)." },
            { pillar: "equity" as const, icon: "⚡", title: "Health Equity Policy", desc: "SDOH screening mandates, health equity data collection requirements, disparities reporting frameworks, and community benefit investment policy for nonprofit hospitals." },
            { pillar: "economics" as const, icon: "💰", title: "Price Transparency & Market Regulation", desc: "Hospital price transparency rule compliance frameworks, anti-surprise billing implementation, insurance market reform analysis, and drug pricing policy modeling." },
          ].map((area) => (
            <div key={area.title} className="bg-white p-6 rounded-xl shadow-lg border border-gray-200 hover:shadow-xl transition-all">
              <div className="flex items-center gap-3 mb-3">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center text-xl border ${PILLAR_STYLES[area.pillar].bg} ${PILLAR_STYLES[area.pillar].border}`}>
                  {area.icon}
                </div>
                <span className={`text-[10px] font-bold uppercase tracking-wide px-2 py-0.5 rounded-full ${PILLAR_STYLES[area.pillar].bg} ${PILLAR_STYLES[area.pillar].text}`}>
                  {PILLAR_STYLES[area.pillar].label}
                </span>
              </div>
              <h3 className="font-bold text-slate-900 mb-2">{area.title}</h3>
              <p className="text-slate-600 text-sm leading-relaxed">{area.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ── EXPERT TESTIMONY ──────────────────────────────────────────────── */}
      <div className="bg-slate-50 py-16 border-y border-slate-200">
        <div className="container mx-auto px-4 md:px-8 max-w-5xl">
          <div className="md:flex gap-12 items-start">
            <div className="md:w-1/2">
              <span className="text-xs font-black text-slate-400 uppercase tracking-widest block mb-3">Expert Services</span>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">Expert Testimony & Legislative Appearances</h2>
              <p className="text-slate-600 leading-relaxed mb-6">
                HTR Advisory principals are available for testimony before state legislatures, Congressional committees, federal agency comment hearings, and court proceedings as expert witnesses in healthcare policy and economics matters.
              </p>
              <ul className="space-y-3">
                {["State legislative committee testimony", "Congressional hearing preparation & delivery", "Federal agency NPRM comment preparation", "Administrative law court expert witness", "Public comment writing & coordination", "Stakeholder convening facilitation"].map((item) => (
                  <li key={item} className="flex items-center gap-3 text-sm text-slate-700">
                    <span className="w-1.5 h-1.5 rounded-full bg-fuchsia-600 shrink-0"></span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="md:w-1/2 mt-8 md:mt-0">
              <div className="bg-indigo-700 text-white rounded-2xl p-8">
                <h3 className="text-lg font-bold mb-4 text-fuchsia-400">Our Testimony Standard</h3>
                <p className="text-slate-300 text-sm mb-6 leading-relaxed">
                  Every testimony or expert witness engagement includes a rigorous peer review of findings by a second HTR analyst before submission or delivery. We do not testify to positions we cannot defend under cross-examination.
                </p>
                <div className="space-y-3">
                  {["Full literature review before any testimony", "Quantitative modeling to support qualitative claims", "Peer-reviewed before submission", "Available for follow-up questions & rebuttals"].map((item) => (
                    <div key={item} className="flex items-center gap-3 text-sm text-slate-300">
                      <span className="text-fuchsia-400 shrink-0">✓</span>
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── DELIVERABLES ──────────────────────────────────────────────────── */}
      <div className="container mx-auto px-4 md:px-8 max-w-5xl py-12">
        <h2 className="text-2xl font-bold text-slate-900 mb-8">What&apos;s Included</h2>
        <div className="grid md:grid-cols-2 gap-4">
          {service.deliverables.map((d, i) => (
            <div key={i} className="flex items-start gap-3 p-4 bg-slate-50 rounded-lg border border-slate-100">
              <span className="w-5 h-5 rounded-full bg-slate-200 text-slate-700 flex items-center justify-center text-xs font-black shrink-0 mt-0.5">{i + 1}</span>
              <span className="text-slate-700 text-sm font-medium">{d}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ── PROCESS ───────────────────────────────────────────────────────── */}
      <div className="container mx-auto px-4 md:px-8 max-w-5xl py-12">
        <h2 className="text-2xl font-bold text-slate-900 mb-8">Engagement Process</h2>
        <div className="grid md:grid-cols-4 gap-6">
          {service.processSteps.map((step) => (
            <div key={step.stepNumber}>
              <div className="w-10 h-10 rounded-full bg-indigo-600 text-white flex items-center justify-center font-black text-lg mb-4">
                {step.stepNumber}
              </div>
              <div className="text-xs font-bold text-slate-500 uppercase tracking-wide mb-1">{step.duration}</div>
              <h3 className="text-base font-bold text-slate-900 mb-2">{step.title}</h3>
              <p className="text-slate-600 text-sm leading-relaxed">{step.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ── PRICING ───────────────────────────────────────────────────────── */}
      <div className="container mx-auto px-4 md:px-8 max-w-5xl py-12">
        <h2 className="text-2xl font-bold text-slate-900 mb-8">Engagement Models</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {service.tiers.map((tier) => (
            <div key={tier.name} className={`p-8 rounded-xl border-2 ${tier.highlight ? "border-slate-800 bg-slate-50 shadow-xl" : "border-slate-200 bg-white shadow-sm"}`}>
              {tier.highlight && <div className="text-xs font-black text-slate-700 uppercase tracking-widest mb-3">Most Comprehensive</div>}
              <h3 className="text-xl font-bold text-slate-900 mb-1">{tier.name}</h3>
              <div className="text-2xl font-black text-slate-700 mb-3">{tier.price}</div>
              <p className="text-slate-600 text-sm mb-6 leading-relaxed">{tier.description}</p>
              <ul className="space-y-2">
                {tier.includes.map((item) => (
                  <li key={item} className="flex gap-2 items-start text-sm text-slate-700">
                    <span className="text-fuchsia-600 mt-0.5 shrink-0">✓</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* ── CTA ───────────────────────────────────────────────────────────── */}
      <div className="container mx-auto px-4 md:px-8 max-w-4xl">
        <div className="bg-linear-to-r from-fuchsia-600 to-slate-800 text-white rounded-2xl p-10 md:p-14 text-center shadow-2xl">
          <h2 className="text-3xl font-black mb-4">Shape Policy That Works in Practice</h2>
          <p className="text-lg text-fuchsia-100 mb-8 max-w-2xl mx-auto">
            Good policy is grounded in clinical reality, economic feasibility, and equity impact across all six pillars. HTR Advisory brings all three lenses to every regulatory engagement.
          </p>
          <Link
            href="/advisory/contact"
            className="inline-block px-8 py-4 bg-white text-fuchsia-700 font-black text-lg rounded-lg hover:bg-fuchsia-50 transition-colors shadow-lg"
          >
            Request a Policy Brief
          </Link>
          <p className="mt-4 text-sm text-fuchsia-200">Government and legislative inquiries handled with discretion.</p>
        </div>
      </div>
    </div>
  );
}
