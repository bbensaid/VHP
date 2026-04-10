import Link from "next/link";
import { ADVISORY_SERVICES, PILLAR_STYLES } from "@/lib/advisory-data";

export const metadata = {
  title: "Capability & Maturity Assessments | HTR Advisory",
  description:
    "HTR Advisory's Organizational Readiness Framework (ORF) benchmarks your health system's maturity across 7 domains. Know your readiness before you transform.",
};

const service = ADVISORY_SERVICES.find((s) => s.id === "capability-assessment")!;

const ORF_DOMAINS = [
  { pillar: "policy" as const,     icon: "⚖️", domain: "Leadership & Governance",      description: "Board composition, executive alignment, governance structures, decision-making velocity, and strategic planning maturity." },
  { pillar: "economics" as const,  icon: "💰", domain: "Financial Resilience",          description: "Operating margins, days cash on hand, debt service coverage, revenue diversification, and financial scenario planning capability." },
  { pillar: "clinical" as const,   icon: "🏥", domain: "Clinical Operations",           description: "Clinical quality benchmarks, care model standardization, patient safety culture, workforce competency, and outcomes performance." },
  { pillar: "technology" as const, icon: "⚙️", domain: "Data & Analytics Maturity",     description: "EHR adoption, data governance, analytics infrastructure, predictive modeling capability, and real-time decision support." },
  { pillar: "economics" as const,  icon: "👥", domain: "Workforce Capacity",            description: "Staffing ratios, turnover rates, workforce pipeline, labor relations stability, and upskilling program maturity." },
  { pillar: "technology" as const, icon: "🔗", domain: "Technology Infrastructure",     description: "System integration depth, interoperability readiness, cybersecurity posture, cloud adoption, and legacy system retirement planning." },
  { pillar: "equity" as const,     icon: "⚡", domain: "Payer Strategy & Equity",       description: "Payer mix diversification, VBC contract readiness, SDOH integration, community health investment, and health equity program maturity." },
];

export default function CapabilityAssessmentPage() {
  return (
    <div className="bg-white min-h-screen pb-20">

      {/* ── HERO ──────────────────────────────────────────────────────────── */}
      <div className="bg-slate-50 text-slate-900 py-8 border-b border-slate-200">
        <div className="container mx-auto px-4 md:px-8 max-w-5xl">
          <div className="flex items-center gap-2 mb-4">
            <span className="bg-sky-100 text-sky-700 border border-sky-200 text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded">
              HTR Advisory
            </span>
            <span className="text-slate-400 text-xs">All 6 Pillars</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight mb-6 leading-tight">
            Capability & Maturity <span className="text-sky-600">Assessments</span>
          </h1>
          <p className="text-base text-slate-600 max-w-3xl leading-relaxed mb-8">
            Before embarking on transformation, organizations need an honest answer to one question: <strong>&quot;Are we ready?&quot;</strong> HTR Advisory&apos;s proprietary <strong>Organizational Readiness Framework (ORF)</strong> benchmarks your maturity across 7 domains using a national peer comparison database — so you know exactly where you stand.
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

      {/* ── ORF INTRO ─────────────────────────────────────────────────────── */}
      <div className="container mx-auto px-4 md:px-8 max-w-5xl py-12">
        <div className="bg-indigo-700 text-white rounded-2xl p-8 md:p-12">
          <h2 className="text-2xl font-bold mb-2">The Organizational Readiness Framework (ORF)</h2>
          <p className="text-indigo-100 mb-8 max-w-3xl">
            HTR&apos;s proprietary ORF scores each of 7 domains on a 1–5 maturity scale, then benchmarks your results against our database of peer health organizations.
            Unlike generic consulting frameworks, ORF is built specifically for the economics, clinical realities, and regulatory complexity of U.S. healthcare.
          </p>
          <div className="grid md:grid-cols-5 gap-4">
            {[1, 2, 3, 4, 5].map((score) => (
              <div key={score} className="bg-indigo-600 rounded-xl p-4 text-center border border-indigo-500">
                <div className="text-3xl font-black text-white mb-1">{score}</div>
                <div className="text-indigo-100 text-xs font-bold uppercase tracking-wide">
                  {["Initial", "Developing", "Defined", "Managed", "Optimizing"][score - 1]}
                </div>
                <p className="text-indigo-200 text-xs mt-2 leading-relaxed">
                  {["Ad hoc, reactive. No formal processes.", "Some processes defined but inconsistent.", "Standardized processes across the org.", "Measured and controlled. Data-driven.", "Continuous improvement. Industry leader."][score - 1]}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── 7 DOMAINS ─────────────────────────────────────────────────────── */}
      <div className="container mx-auto px-4 md:px-8 max-w-5xl py-8">
        <h2 className="text-2xl font-bold text-slate-900 mb-2">The 7 Assessment Domains</h2>
        <p className="text-slate-500 mb-8">Each domain maps directly to one or more of the 5 HTR pillars, ensuring comprehensive coverage of your organization&apos;s transformation readiness.</p>
        <div className="grid md:grid-cols-2 gap-6">
          {ORF_DOMAINS.map((d) => (
            <div key={d.domain} className="bg-white p-6 rounded-xl shadow-lg border border-gray-200 hover:shadow-xl transition-all flex gap-4">
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center text-xl shrink-0 border ${PILLAR_STYLES[d.pillar].bg} ${PILLAR_STYLES[d.pillar].border}`}>
                {d.icon}
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-bold text-slate-900">{d.domain}</h3>
                  <span className={`text-[10px] font-bold uppercase px-1.5 py-0.5 rounded ${PILLAR_STYLES[d.pillar].bg} ${PILLAR_STYLES[d.pillar].text}`}>
                    {PILLAR_STYLES[d.pillar].label}
                  </span>
                </div>
                <p className="text-slate-600 text-sm leading-relaxed">{d.description}</p>
              </div>
            </div>
          ))}
          <div className="bg-sky-50 p-6 rounded-xl border-2 border-sky-200 flex gap-4 items-center">
            <div className="text-4xl">📋</div>
            <div>
              <h3 className="font-bold text-sky-900 mb-1">Peer Benchmarking Included</h3>
              <p className="text-sky-700 text-sm">Every ORF assessment includes benchmark comparison against HTR&apos;s proprietary national database of health systems, stratified by bed size, geography, and payer mix.</p>
            </div>
          </div>
        </div>
      </div>

      {/* ── DELIVERABLES ──────────────────────────────────────────────────── */}
      <div className="container mx-auto px-4 md:px-8 max-w-5xl py-8">
        <h2 className="text-2xl font-bold text-slate-900 mb-8">What&apos;s Included</h2>
        <div className="grid md:grid-cols-2 gap-4">
          {service.deliverables.map((d, i) => (
            <div key={i} className="flex items-start gap-3 p-4 bg-slate-50 rounded-lg border border-slate-100">
              <span className="w-5 h-5 rounded-full bg-sky-100 text-sky-700 flex items-center justify-center text-xs font-black shrink-0 mt-0.5">{i + 1}</span>
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
              <div className="w-10 h-10 rounded-full bg-sky-600 text-white flex items-center justify-center font-black text-lg mb-4">
                {step.stepNumber}
              </div>
              <div className="text-xs font-bold text-sky-600 uppercase tracking-wide mb-1">{step.duration}</div>
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
            <div key={tier.name} className={`p-8 rounded-xl border-2 ${tier.highlight ? "border-sky-600 bg-sky-50 shadow-xl" : "border-slate-200 bg-white shadow-sm"}`}>
              {tier.highlight && <div className="text-xs font-black text-sky-700 uppercase tracking-widest mb-3">Most Comprehensive</div>}
              <h3 className="text-xl font-bold text-slate-900 mb-1">{tier.name}</h3>
              <div className="text-2xl font-black text-sky-600 mb-3">{tier.price}</div>
              <p className="text-slate-600 text-sm mb-6 leading-relaxed">{tier.description}</p>
              <ul className="space-y-2">
                {tier.includes.map((item) => (
                  <li key={item} className="flex gap-2 items-start text-sm text-slate-700">
                    <span className="text-sky-500 mt-0.5 shrink-0">✓</span>
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
        <div className="bg-linear-to-r from-fuchsia-600 to-sky-600 text-white rounded-2xl p-10 md:p-14 text-center shadow-2xl">
          <h2 className="text-3xl font-black mb-4">Know Your Readiness Before You Commit</h2>
          <p className="text-lg text-fuchsia-100 mb-8 max-w-2xl mx-auto">
            Transformation investments fail when organizations overestimate their capabilities. The ORF assessment gives leadership an honest, benchmarked baseline — before the project kicks off.
          </p>
          <Link
            href="/advisory/contact"
            className="inline-block px-8 py-4 bg-white text-fuchsia-700 font-black text-lg rounded-lg hover:bg-fuchsia-50 transition-colors shadow-lg"
          >
            Request an Assessment
          </Link>
        </div>
      </div>
    </div>
  );
}
