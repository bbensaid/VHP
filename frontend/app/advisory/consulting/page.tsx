import Link from "next/link";
import { ADVISORY_SERVICES, PILLAR_STYLES } from "@/lib/advisory-data";

export const metadata = {
  title: "Strategic Consulting | HTR Advisory",
  description:
    "Partner with HTR Advisory's C-suite consulting practice. Strategic frameworks across all 6 pillars: regulatory compliance, value-based care, digital transformation, clinical operations, health equity, operational execution, and M&A.",
};

const service = ADVISORY_SERVICES.find((s) => s.id === "consulting")!;

const SIX_SERVICE_CARDS = [
  {
    pillar: "policy" as const,
    icon: "⚖️",
    title: "Regulatory Compliance",
    description: "Navigate the shifting landscape of CMS rules, price transparency mandates, No Surprises Act requirements, and data privacy obligations across all lines of business.",
    bullets: ["No Surprises Act Audit & Remediation", "Interoperability Rule Compliance Roadmap", "OCR / HIPAA Audit Preparation", "CMS Conditions of Participation Review"],
  },
  {
    pillar: "economics" as const,
    icon: "💰",
    title: "Value-Based Care & Payer Strategy",
    description: "Data-backed strategies for maximizing performance in VBC contracts, optimizing payer mix, and building the financial infrastructure to thrive under risk-sharing arrangements.",
    bullets: ["Capitation & Risk-Sharing Modeling", "Risk Adjustment Strategy (HCC coding)", "Payer Contract Negotiation Support", "Quality Measure Performance Optimization"],
  },
  {
    pillar: "technology" as const,
    icon: "⚙️",
    title: "Digital Transformation",
    description: "Selecting, implementing, and optimizing the clinical technologies that actually drive ROI — not just vendor hype. We build the governance infrastructure that protects your investment.",
    bullets: ["EHR Strategy & Optimization", "AI Governance Framework Design", "Cybersecurity Posture Assessment", "Digital Health Portfolio Rationalization"],
  },
  {
    pillar: "clinical" as const,
    icon: "🏥",
    title: "Clinical Operations Transformation",
    description: "Redesign clinical care delivery models to improve outcomes, reduce variation, and optimize capacity — while sustaining the workforce engagement needed to execute the change.",
    bullets: ["Care Model Redesign (Hospital-at-Home, VBC)", "Clinical Workforce Strategy", "Quality & Patient Safety Program Design", "Population Health Operating Model"],
  },
  {
    pillar: "equity" as const,
    icon: "⚡",
    title: "Health Equity & SDOH Strategy",
    description: "Build a credible, measurable health equity strategy that addresses root causes — SDOH data integration, algorithmic bias mitigation, community partnership development, and equity-centered care design.",
    bullets: ["SDOH Screening & Intervention Design", "Algorithmic Bias Assessment & Remediation", "Community Health Needs Assessment (CHNA)", "CMS Health Equity Program Compliance"],
  },
  {
    pillar: "economics" as const,
    icon: "🤝",
    title: "M&A Integration Strategy",
    description: "Cultural and technical roadmap design for hospital system consolidation, medical group acquisition, and post-merger integration — across all six pillar dimensions simultaneously.",
    bullets: ["Multi-Pillar Operational Due Diligence", "Technology Stack Rationalization", "Clinical Governance Design", "Culture Integration Playbook"],
  },
];

export default function ConsultingPage() {
  return (
    <div className="bg-white min-h-screen pb-20">

      {/* ── HERO ──────────────────────────────────────────────────────────── */}
      <div className="bg-slate-50 text-slate-900 py-8 border-b border-slate-200">
        <div className="container mx-auto px-4 md:px-8 max-w-5xl">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-fuchsia-600 font-bold uppercase tracking-widest text-xs">HTR Advisory</span>
            <span className="text-slate-400">·</span>
            <span className="text-slate-500 text-xs">Spanning All 6 Pillars</span>
          </div>
          <h1 className="ty-h1 font-bold mb-4 tracking-tight leading-tight">
            Strategic Consulting
          </h1>
          <p className="ty-hero text-slate-600 max-w-3xl leading-relaxed mb-8">
            We partner with C-suite executives to design resilient operational frameworks spanning all six pillars of healthcare transformation: Policy, Economics, Technology, Clinical, Equity, and Operations. We move beyond theory to implement actionable strategies that protect margins, improve clinical outcomes, and advance health equity — simultaneously.
          </p>
          <div className="flex flex-wrap gap-2">
            {service.pillars.map((p) => (
              <span key={p} className={`inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-full border ${PILLAR_STYLES[p].bg} ${PILLAR_STYLES[p].text} ${PILLAR_STYLES[p].border}`}>
                {PILLAR_STYLES[p].label}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* ── 6 SERVICE AREAS ───────────────────────────────────────────────── */}
      <div className="container mx-auto px-4 md:px-8 mt-12 max-w-5xl">
        <h2 className="text-2xl font-bold text-slate-900 mb-2">Six Consulting Practice Areas</h2>
        <p className="text-slate-500 mb-8">Each practice area is anchored to one or more of the six HTR pillars — and every engagement draws connections across all six.</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {SIX_SERVICE_CARDS.map((card) => (
            <div key={card.title} className="bg-white p-8 rounded-xl shadow-lg border border-gray-200 hover:shadow-xl transition-all">
              <div className="flex items-center gap-3 mb-4">
                <div className={`w-12 h-12 ${PILLAR_STYLES[card.pillar].bg} rounded-lg flex items-center justify-center text-2xl border ${PILLAR_STYLES[card.pillar].border}`}>
                  {card.icon}
                </div>
                <span className={`text-[10px] font-black uppercase tracking-widest px-2 py-1 rounded-full ${PILLAR_STYLES[card.pillar].bg} ${PILLAR_STYLES[card.pillar].text} border ${PILLAR_STYLES[card.pillar].border}`}>
                  {PILLAR_STYLES[card.pillar].label} Pillar
                </span>
              </div>
              <h3 className="ty-h3 font-bold text-slate-900 mb-3">{card.title}</h3>
              <p className="text-slate-600 ty-body mb-5 leading-relaxed">{card.description}</p>
              <ul className="space-y-2.5">
                {card.bullets.map((bullet) => (
                  <li key={bullet} className="flex gap-3 items-center text-sm text-slate-600 font-medium">
                    <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${PILLAR_STYLES[card.pillar].text.replace("text-", "bg-")}`}></span>
                    {bullet}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* ── THE STRATEGIC TRIAD METHODOLOGY ──────────────────────────────── */}
      <div className="container mx-auto px-4 md:px-8 max-w-5xl mt-20">
        <div className="bg-indigo-700 text-white rounded-2xl p-8 md:p-12">
          <h2 className="text-2xl font-bold mb-2">The HTR Strategic Triad</h2>
          <p className="text-indigo-100 mb-8 max-w-3xl">Every strategic recommendation we make is stress-tested across three lenses before it reaches your leadership team. This cross-disciplinary rigor is what separates HTR Advisory from single-pillar consultants.</p>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-indigo-600/40 rounded-xl p-6 border border-indigo-500">
              <div className="text-sky-400 font-black text-lg mb-2">Policy Feasibility</div>
              <p className="text-slate-300 text-sm leading-relaxed">Is the strategy compliant with current and anticipated regulation? Does it survive a change in the regulatory environment? How does it interact with state and federal policy trends?</p>
            </div>
            <div className="bg-emerald-900/50 rounded-xl p-6 border border-emerald-800">
              <div className="text-emerald-400 font-black text-lg mb-2">Economic Viability</div>
              <p className="text-slate-300 text-sm leading-relaxed">Does the strategy generate a positive return under realistic market assumptions? How does it perform across payer mix scenarios? What are the margin and liquidity implications?</p>
            </div>
            <div className="bg-indigo-900/50 rounded-xl p-6 border border-indigo-800">
              <div className="text-indigo-400 font-black text-lg mb-2">Operational Readiness</div>
              <p className="text-slate-300 text-sm leading-relaxed">Does the organization have the technology, clinical workflows, workforce capacity, and equity infrastructure to execute? What capability gaps need to close first?</p>
            </div>
          </div>
        </div>
      </div>

      {/* ── ENGAGEMENT MODELS ─────────────────────────────────────────────── */}
      <div className="container mx-auto px-4 md:px-8 max-w-5xl mt-16">
        <h2 className="text-2xl font-bold text-slate-900 mb-8">Engagement Models</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-8">
            <div className="text-3xl mb-4">📋</div>
            <h3 className="ty-h3 font-bold text-slate-900 mb-2">Project-Based</h3>
            <p className="text-slate-600 ty-body mb-4 leading-relaxed">Defined scope, deliverables, and timeline. Ideal for discrete strategic questions — entering a new market, responding to a regulatory change, evaluating an acquisition.</p>
            <p className="text-fuchsia-600 font-bold text-sm">3–6 month typical duration</p>
          </div>
          <div className="bg-fuchsia-50 border-2 border-fuchsia-300 rounded-xl p-8 shadow-lg">
            <div className="text-3xl mb-4">🔄</div>
            <h3 className="ty-h3 font-bold text-slate-900 mb-2">Advisory Retainer</h3>
            <p className="text-slate-600 ty-body mb-4 leading-relaxed">Ongoing access to a dedicated principal advisor on a monthly or quarterly retainer. Ideal for organizations navigating continuous regulatory change or major multi-year transformation.</p>
            <p className="text-fuchsia-600 font-bold text-sm">Monthly or quarterly commitment</p>
          </div>
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-8">
            <div className="text-3xl mb-4">🧑‍💼</div>
            <h3 className="ty-h3 font-bold text-slate-900 mb-2">Expert Embed</h3>
            <p className="text-slate-600 ty-body mb-4 leading-relaxed">A fractional HTR principal embedded part-time in your leadership team — attending strategy sessions, joining board meetings, and serving as an on-call strategic resource.</p>
            <p className="text-fuchsia-600 font-bold text-sm">Flexible time commitment</p>
          </div>
        </div>
      </div>

      {/* ── TYPICAL DELIVERABLES ──────────────────────────────────────────── */}
      <div className="container mx-auto px-4 md:px-8 max-w-5xl mt-16">
        <div className="md:flex gap-12">
          <div className="md:w-1/2">
            <h2 className="text-2xl font-bold text-slate-900 mb-6">Typical Deliverables</h2>
            <ul className="space-y-3">
              {service.deliverables.map((d, i) => (
                <li key={i} className="flex items-start gap-3 text-sm text-slate-700">
                  <span className="w-5 h-5 rounded-full bg-fuchsia-100 text-fuchsia-700 flex items-center justify-center text-xs font-black shrink-0 mt-0.5">{i + 1}</span>
                  {d}
                </li>
              ))}
            </ul>
          </div>
          <div className="md:w-1/2 mt-8 md:mt-0">
            <h2 className="text-2xl font-bold text-slate-900 mb-6">Case Study: Epic Go-Live Recovery</h2>
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-6">
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">Anonymized Engagement</p>
              <p className="text-slate-700 text-sm leading-relaxed mb-4">
                A 600-bed integrated delivery network in the Northeast had just completed a $280M Epic implementation — on time, over budget, and with clinical adoption rates at 34% after 90 days. Claim denials had spiked 22%, and physician satisfaction scores dropped to the 12th percentile.
              </p>
              <p className="text-slate-700 text-sm leading-relaxed mb-4">
                HTR Advisory was engaged on Day 97 post-go-live. We conducted a full 6-pillar diagnostic: the root cause was not the technology. It was a mismatch between Epic&apos;s workflow design and the clinical operations model, compounded by inadequate front-end revenue cycle training.
              </p>
              <p className="text-slate-700 text-sm leading-relaxed">
                Within 180 days of engagement, denial rates returned to baseline, physician adoption reached 78%, and the health system recovered $14.2M in previously denied claims through a targeted appeals program.
              </p>
              <p className="text-xs text-slate-400 mt-4">Names and identifying details changed. Results may vary.</p>
            </div>
          </div>
        </div>
      </div>

      {/* ── PRICING ───────────────────────────────────────────────────────── */}
      <div className="container mx-auto px-4 md:px-8 max-w-5xl mt-16">
        <h2 className="text-2xl font-bold text-slate-900 mb-8">Pricing</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {service.tiers.map((tier) => (
            <div key={tier.name} className={`p-8 rounded-xl border-2 ${tier.highlight ? "border-fuchsia-600 bg-fuchsia-50 shadow-xl" : "border-slate-200 bg-white shadow-sm"}`}>
              {tier.highlight && <div className="text-xs font-black text-fuchsia-700 uppercase tracking-widest mb-3">Most Popular</div>}
              <h3 className="ty-h3 font-bold text-slate-900 mb-1">{tier.name}</h3>
              <div className="text-2xl font-black text-fuchsia-600 mb-3">{tier.price}</div>
              <p className="text-slate-600 ty-body mb-6 leading-relaxed">{tier.description}</p>
              <ul className="space-y-2">
                {tier.includes.map((item) => (
                  <li key={item} className="flex gap-2 items-start text-sm text-slate-700">
                    <span className="text-fuchsia-500 mt-0.5 shrink-0">✓</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* ── CTA ───────────────────────────────────────────────────────────── */}
      <div className="container mx-auto px-4 md:px-8 max-w-4xl mt-16 text-center">
        <h2 className="ty-h1 font-bold text-slate-900 mb-4">Ready to optimize your organization?</h2>
        <p className="ty-hero text-slate-600 mb-8 max-w-2xl mx-auto">
          Engagements begin with a no-obligation discovery call. We scope the project in 5 business days and have a proposal in your inbox within 10.
        </p>
        <Link
          href="/advisory/contact"
          className="inline-block px-8 py-4 bg-indigo-600 text-white font-bold rounded-lg hover:bg-indigo-700 transition-colors shadow-lg"
        >
          Request a Proposal
        </Link>
      </div>
    </div>
  );
}
