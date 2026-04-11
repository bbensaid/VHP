import Link from "next/link";
import { ADVISORY_SERVICES, PILLAR_STYLES } from "@/lib/advisory-data";

export const metadata = {
  title: "Health IT Project Consulting | HTR Advisory",
  description:
    "End-to-end health IT advisory: EHR implementation oversight, FHIR interoperability strategy, AI governance, and digital health program management. Protect your investment against vendor over-promise.",
};

const service = ADVISORY_SERVICES.find((s) => s.id === "it-consulting")!;

export default function ITConsultingPage() {
  return (
    <div className="bg-white min-h-screen pb-20">

      {/* ── HERO ──────────────────────────────────────────────────────────── */}
      <div className="bg-slate-50 text-slate-900 py-8 border-b border-slate-200">
        <div className="container mx-auto px-4 md:px-8 max-w-5xl">
          <div className="flex items-center gap-2 mb-4">
            <span className="bg-indigo-100 text-indigo-700 border border-indigo-200 text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded">
              HTR Advisory
            </span>
            <span className="text-slate-400 text-xs">Technology Pillar</span>
          </div>
          <h1 className="ty-h1 font-bold tracking-tight mb-6 leading-tight">
            Health IT Project <span className="text-indigo-600">Consulting</span>
          </h1>
          <p className="ty-hero text-slate-600 max-w-3xl leading-relaxed mb-8">
            End-to-end advisory for EHR implementations, interoperability programs, AI adoption, and digital health transformation.
            We serve as your <strong>owner&apos;s representative</strong> — protecting your investment against vendor over-promise, scope creep, and go-live failures.
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

      {/* ── WHY IT PROJECTS FAIL ──────────────────────────────────────────── */}
      <div className="container mx-auto px-4 md:px-8 max-w-5xl py-12">
        <div className="bg-indigo-950 text-white rounded-2xl p-8 md:p-12">
          <h2 className="text-2xl font-bold mb-6">Why Health IT Projects Fail — And How We Prevent It</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <div className="text-3xl font-black text-indigo-300 mb-2">73%</div>
              <p className="text-indigo-100 text-sm leading-relaxed">of large EHR implementations experience significant cost overruns, according to KLAS Research and OIG audits.</p>
            </div>
            <div>
              <div className="text-3xl font-black text-indigo-300 mb-2">$1.7B</div>
              <p className="text-indigo-100 text-sm leading-relaxed">average total cost of an enterprise EHR implementation for a 500-bed system, including hidden indirect costs most vendors don&apos;t disclose.</p>
            </div>
            <div>
              <div className="text-3xl font-black text-indigo-300 mb-2">18 months</div>
              <p className="text-indigo-100 text-sm leading-relaxed">average time before organizations realize their go-live actually failed — when physician burnout and claim denials begin to peak.</p>
            </div>
          </div>
          <p className="mt-8 text-indigo-200 text-sm">
            HTR Advisory brings <strong className="text-white">independent expertise</strong> — no vendor relationships, no referral fees — to keep your project on track, on budget, and on mission.
          </p>
        </div>
      </div>

      {/* ── DELIVERABLES ──────────────────────────────────────────────────── */}
      <div className="container mx-auto px-4 md:px-8 max-w-5xl py-8">
        <h2 className="text-2xl font-bold text-slate-900 mb-8">What&apos;s Included</h2>
        <div className="grid md:grid-cols-2 gap-4">
          {service.deliverables.map((d, i) => (
            <div key={i} className="flex items-start gap-3 p-4 bg-slate-50 rounded-lg border border-slate-100">
              <span className="w-5 h-5 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center text-xs font-black shrink-0 mt-0.5">{i + 1}</span>
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
            <div key={step.stepNumber} className="relative">
              <div className="w-10 h-10 rounded-full bg-indigo-600 text-white flex items-center justify-center font-black text-lg mb-4">
                {step.stepNumber}
              </div>
              <div className="text-xs font-bold text-indigo-600 uppercase tracking-wide mb-1">{step.duration}</div>
              <h3 className="text-base font-bold text-slate-900 mb-2">{step.title}</h3>
              <p className="text-slate-600 ty-body leading-relaxed">{step.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ── SPECIALTY AREAS ───────────────────────────────────────────────── */}
      <div className="container mx-auto px-4 md:px-8 max-w-5xl py-8">
        <h2 className="text-2xl font-bold text-slate-900 mb-8">Specialty Areas</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200 hover:shadow-xl transition-all">
            <div className="w-10 h-10 bg-indigo-100 text-indigo-700 rounded-lg flex items-center justify-center text-xl mb-4 border border-indigo-200">🏥</div>
            <h3 className="text-lg font-bold text-slate-900 mb-2">EHR Selection & Implementation</h3>
            <p className="text-slate-600 ty-body mb-4">Vendor-neutral scoring, contract negotiation support, and implementation oversight for Epic, Oracle Health, Meditech, and athenahealth.</p>
            <ul className="space-y-1.5 text-xs text-slate-600 font-medium">
              <li className="flex gap-2 items-center"><span className="w-1.5 h-1.5 rounded-full bg-indigo-500"></span>RFP Development & Scoring</li>
              <li className="flex gap-2 items-center"><span className="w-1.5 h-1.5 rounded-full bg-indigo-500"></span>Contract Red-Line Review</li>
              <li className="flex gap-2 items-center"><span className="w-1.5 h-1.5 rounded-full bg-indigo-500"></span>Go-Live Risk Assessment</li>
            </ul>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200 hover:shadow-xl transition-all">
            <div className="w-10 h-10 bg-indigo-100 text-indigo-700 rounded-lg flex items-center justify-center text-xl mb-4 border border-indigo-200">🔗</div>
            <h3 className="text-lg font-bold text-slate-900 mb-2">Interoperability & FHIR</h3>
            <p className="text-slate-600 ty-body mb-4">Architecture and strategy for ONC compliance, CMS interoperability rules, and FHIR R4 API implementations across payer and provider systems.</p>
            <ul className="space-y-1.5 text-xs text-slate-600 font-medium">
              <li className="flex gap-2 items-center"><span className="w-1.5 h-1.5 rounded-full bg-indigo-500"></span>FHIR API Architecture</li>
              <li className="flex gap-2 items-center"><span className="w-1.5 h-1.5 rounded-full bg-indigo-500"></span>ONC / CMS Compliance Roadmap</li>
              <li className="flex gap-2 items-center"><span className="w-1.5 h-1.5 rounded-full bg-indigo-500"></span>Patient Access App Strategy</li>
            </ul>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200 hover:shadow-xl transition-all">
            <div className="w-10 h-10 bg-indigo-100 text-indigo-700 rounded-lg flex items-center justify-center text-xl mb-4 border border-indigo-200">🤖</div>
            <h3 className="text-lg font-bold text-slate-900 mb-2">AI Governance & Adoption</h3>
            <p className="text-slate-600 ty-body mb-4">Governance frameworks for clinical AI tools, vendor evaluation, bias monitoring, and responsible deployment across all six HTR pillar dimensions.</p>
            <ul className="space-y-1.5 text-xs text-slate-600 font-medium">
              <li className="flex gap-2 items-center"><span className="w-1.5 h-1.5 rounded-full bg-indigo-500"></span>AI Governance Charter</li>
              <li className="flex gap-2 items-center"><span className="w-1.5 h-1.5 rounded-full bg-indigo-500"></span>Algorithmic Bias Assessment</li>
              <li className="flex gap-2 items-center"><span className="w-1.5 h-1.5 rounded-full bg-indigo-500"></span>Vendor Due Diligence Matrix</li>
            </ul>
          </div>
        </div>
      </div>

      {/* ── PRICING TIERS ─────────────────────────────────────────────────── */}
      <div className="container mx-auto px-4 md:px-8 max-w-5xl py-12">
        <h2 className="text-2xl font-bold text-slate-900 mb-8">Engagement Models</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {service.tiers.map((tier) => (
            <div key={tier.name} className={`p-8 rounded-xl border-2 ${tier.highlight ? "border-indigo-600 bg-indigo-50 shadow-xl" : "border-slate-200 bg-white shadow-sm"}`}>
              {tier.highlight && <div className="text-xs font-black text-indigo-700 uppercase tracking-widest mb-3">Most Popular</div>}
              <h3 className="ty-h3 font-bold text-slate-900 mb-1">{tier.name}</h3>
              <div className="text-2xl font-black text-indigo-600 mb-3">{tier.price}</div>
              <p className="text-slate-600 ty-body mb-6 leading-relaxed">{tier.description}</p>
              <ul className="space-y-2">
                {tier.includes.map((item) => (
                  <li key={item} className="flex gap-2 items-start text-sm text-slate-700">
                    <span className="text-indigo-500 mt-0.5 shrink-0">✓</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* ── CTA ───────────────────────────────────────────────────────────── */}
      <div className="container mx-auto px-4 md:px-8 max-w-4xl mt-8">
        <div className="bg-linear-to-r from-fuchsia-600 to-indigo-600 text-white rounded-2xl p-10 md:p-14 text-center shadow-2xl">
          <h2 className="text-3xl font-black mb-4">Protect Your Health IT Investment</h2>
          <p className="ty-hero text-fuchsia-100 mb-8 max-w-2xl mx-auto">
            Before your next EHR go-live or digital health initiative, engage an independent advisor who works for you — not the vendor.
          </p>
          <Link
            href="/advisory/contact"
            className="inline-block px-8 py-4 bg-white text-fuchsia-700 font-black text-lg rounded-lg hover:bg-fuchsia-50 transition-colors shadow-lg"
          >
            Request a Proposal
          </Link>
          <p className="mt-4 text-sm text-fuchsia-200">Typical response within 48 business hours.</p>
        </div>
      </div>
    </div>
  );
}
