import Link from "next/link";
import { ADVISORY_SERVICES, PILLAR_STYLES } from "@/lib/advisory-data";

export const metadata = {
  title: "Independent Project Reviews | HTR Advisory",
  description:
    "Forensic-grade independent assessment of in-progress or completed healthcare transformation projects. Root cause analysis, remediation roadmap, and board-ready reporting.",
};

const service = ADVISORY_SERVICES.find((s) => s.id === "independent-review")!;

export default function IndependentReviewPage() {
  return (
    <div className="bg-white min-h-screen pb-20">

      {/* ── HERO ──────────────────────────────────────────────────────────── */}
      <div className="bg-slate-50 text-slate-900 py-8 border-b border-slate-200">
        <div className="container mx-auto px-4 md:px-8 max-w-5xl">
          <div className="flex items-center gap-2 mb-4">
            <span className="bg-amber-100 text-amber-700 border border-amber-200 text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded">
              HTR Advisory
            </span>
            <span className="text-slate-400 text-xs">Independent Assessment</span>
          </div>
          <h1 className="ty-h1 font-bold tracking-tight mb-6 leading-tight">
            Independent <span className="text-amber-600">Project Reviews</span>
          </h1>
          <p className="ty-hero text-slate-600 max-w-3xl leading-relaxed mb-8">
            When a project is over budget, behind schedule, or producing unexpected outcomes, you need a voice with <strong>no incentive to minimize findings.</strong> HTR Advisory conducts forensic-grade assessments of in-progress or recently completed healthcare transformation initiatives — and delivers a clear path forward.
          </p>
          <div className="flex flex-wrap gap-3">
            {service.clientTypes.map((ct) => (
              <span key={ct} className="bg-white border border-slate-200 text-slate-600 text-xs font-semibold px-3 py-1 rounded-full shadow-sm">
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

      {/* ── WHEN YOU NEED A REVIEW ────────────────────────────────────────── */}
      <div className="container mx-auto px-4 md:px-8 max-w-5xl py-12">
        <h2 className="text-2xl font-bold text-slate-900 mb-8">When You Need an Independent Review</h2>
        <div className="grid md:grid-cols-2 gap-6">
          {[
            { icon: "⚠️", title: "Project Over Budget or Schedule", desc: "Your EHR implementation has burned through contingency reserves and the vendor keeps moving the go-live date. You need an outside diagnosis." },
            { icon: "📉", title: "Unexpected Post-Go-Live Outcomes", desc: "Clinical adoption is low, claim denial rates spiked, or physician satisfaction scores collapsed. Someone needs to find out why without spin." },
            { icon: "⚖️", title: "Contract Disputes or Litigation", desc: "You believe the vendor failed to deliver on contractual obligations. You need independent expert analysis to support your legal position." },
            { icon: "🏛️", title: "Board or Regulatory Oversight", desc: "A board, state agency, or federal program requires a credible, independent assessment before releasing additional funding or approvals." },
            { icon: "💼", title: "Acquisition Due Diligence", desc: "You are acquiring a health system or portfolio company and need to evaluate the quality of their in-flight technology programs before close." },
            { icon: "🔄", title: "Program Rescue Planning", desc: "Leadership has lost confidence in the current project team or vendor. You need an independent assessment to decide whether to rescue, restart, or exit." },
          ].map((item) => (
            <div key={item.title} className="bg-white p-6 rounded-xl shadow-lg border border-gray-200 hover:shadow-xl transition-all flex gap-4">
              <span className="text-2xl shrink-0">{item.icon}</span>
              <div>
                <h3 className="font-bold text-slate-900 mb-1">{item.title}</h3>
                <p className="text-slate-600 ty-body leading-relaxed">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── DELIVERABLES ──────────────────────────────────────────────────── */}
      <div className="container mx-auto px-4 md:px-8 max-w-5xl py-8">
        <h2 className="text-2xl font-bold text-slate-900 mb-8">What&apos;s Included</h2>
        <div className="grid md:grid-cols-2 gap-4">
          {service.deliverables.map((d, i) => (
            <div key={i} className="flex items-start gap-3 p-4 bg-slate-50 rounded-lg border border-slate-100">
              <span className="w-5 h-5 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center text-xs font-black shrink-0 mt-0.5">{i + 1}</span>
              <span className="text-slate-700 text-sm font-medium">{d}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ── ENGAGEMENT PROCESS ────────────────────────────────────────────── */}
      <div className="container mx-auto px-4 md:px-8 max-w-5xl py-12">
        <h2 className="text-2xl font-bold text-slate-900 mb-8">Engagement Process</h2>
        <div className="grid md:grid-cols-4 gap-6">
          {service.processSteps.map((step) => (
            <div key={step.stepNumber}>
              <div className="w-10 h-10 rounded-full bg-amber-500 text-white flex items-center justify-center font-black text-lg mb-4">
                {step.stepNumber}
              </div>
              <div className="text-xs font-bold text-amber-600 uppercase tracking-wide mb-1">{step.duration}</div>
              <h3 className="text-base font-bold text-slate-900 mb-2">{step.title}</h3>
              <p className="text-slate-600 ty-body leading-relaxed">{step.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ── OUR METHODOLOGY ───────────────────────────────────────────────── */}
      <div className="bg-indigo-700 text-white py-16">
        <div className="container mx-auto px-4 md:px-8 max-w-5xl">
          <h2 className="text-2xl font-bold mb-8">The HTR Project Health Scorecard</h2>
          <p className="text-indigo-100 mb-8 max-w-3xl">Every Independent Project Review uses our structured Project Health Scorecard — a proprietary assessment tool that evaluates six critical dimensions.</p>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { dimension: "Scope", description: "Is the defined scope of work still achievable? Where has scope expanded without proper change controls?" },
              { dimension: "Schedule", description: "Is the project on the critical path? What are the root causes of schedule variance?" },
              { dimension: "Budget", description: "Is cost variance explainable and recoverable? Are there hidden costs the vendor hasn't disclosed?" },
              { dimension: "Risk", description: "What are the open risks and issues? Are risk mitigation plans credible and owned?" },
              { dimension: "Quality", description: "Are deliverables meeting agreed acceptance criteria? Is testing rigorous and documented?" },
              { dimension: "Governance", description: "Is the project appropriately governed? Are escalation paths functioning? Is leadership engaged?" },
            ].map((dim) => (
              <div key={dim.dimension} className="bg-indigo-600 rounded-xl p-6 border border-indigo-500">
                <div className="text-amber-300 font-black text-lg mb-2">{dim.dimension}</div>
                <p className="text-indigo-100 text-sm leading-relaxed">{dim.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── PRICING TIERS ─────────────────────────────────────────────────── */}
      <div className="container mx-auto px-4 md:px-8 max-w-5xl py-16">
        <h2 className="text-2xl font-bold text-slate-900 mb-8">Engagement Models</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {service.tiers.map((tier) => (
            <div key={tier.name} className={`p-8 rounded-xl border-2 ${tier.highlight ? "border-amber-500 bg-amber-50 shadow-xl" : "border-slate-200 bg-white shadow-sm"}`}>
              {tier.highlight && <div className="text-xs font-black text-amber-700 uppercase tracking-widest mb-3">Most Common</div>}
              <h3 className="ty-h3 font-bold text-slate-900 mb-1">{tier.name}</h3>
              <div className="text-2xl font-black text-amber-600 mb-3">{tier.price}</div>
              <p className="text-slate-600 ty-body mb-6 leading-relaxed">{tier.description}</p>
              <ul className="space-y-2">
                {tier.includes.map((item) => (
                  <li key={item} className="flex gap-2 items-start text-sm text-slate-700">
                    <span className="text-amber-500 mt-0.5 shrink-0">✓</span>
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
        <div className="bg-linear-to-r from-fuchsia-600 to-amber-500 text-white rounded-2xl p-10 md:p-14 text-center shadow-2xl">
          <h2 className="text-3xl font-black mb-4">Get the Independent Assessment You Need</h2>
          <p className="ty-hero text-fuchsia-100 mb-8 max-w-2xl mx-auto">
            Boards, CFOs, and oversight agencies trust HTR Advisory for independent assessments when the stakes are too high for internal optimism.
          </p>
          <Link
            href="/advisory/contact"
            className="inline-block px-8 py-4 bg-white text-fuchsia-700 font-black text-lg rounded-lg hover:bg-fuchsia-50 transition-colors shadow-lg"
          >
            Request a Review
          </Link>
          <p className="mt-4 text-sm text-fuchsia-100">Confidential. NDA signed at intake.</p>
        </div>
      </div>
    </div>
  );
}
