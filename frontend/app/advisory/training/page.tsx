import Link from "next/link";
import { ADVISORY_SERVICES, PILLAR_STYLES } from "@/lib/advisory-data";

export const metadata = {
  title: "Training & Executive Education | HTR Advisory",
  description:
    "Healthcare-specific professional development across all 6 pillars. From Health IT PM fundamentals to AI leadership frameworks, revenue cycle excellence, and regulatory literacy for executives.",
};

const service = ADVISORY_SERVICES.find((s) => s.id === "training")!;

const PROGRAMS = [
  {
    title: "Health IT Project Management Fundamentals",
    duration: "2 Days",
    audience: "Project Managers, IT Coordinators, Clinical Informatics",
    pillars: ["technology" as const, "clinical" as const],
    description: "From charter to go-live: master the PM methodologies, vendor management tactics, and go-live risk protocols specific to health IT programs. Includes Epic, Oracle Health, and EHR-agnostic frameworks.",
    topics: ["Project charter & scope management", "Health IT vendor evaluation", "Clinical workflow analysis", "Change management for clinical staff", "Go-live readiness scoring", "Post-implementation optimization"],
  },
  {
    title: "Value-Based Care Operations Bootcamp",
    duration: "1 Day",
    audience: "Operations Leaders, Clinical Directors, Finance Teams",
    pillars: ["economics" as const, "clinical" as const, "policy" as const],
    description: "Operationalize VBC contracts from the inside. Master the economics of capitation, risk adjustment, attribution, and quality performance — and translate them into actionable workflows.",
    topics: ["Capitation & risk-sharing models", "Quality measure selection & performance", "Population health workflow design", "Risk coding & documentation", "Payer contract economics", "VBC performance dashboards"],
  },
  {
    title: "EHR Governance & Clinical Optimization",
    duration: "Half Day",
    audience: "CMIOs, Clinical Informatics, EHR Governance Committees",
    pillars: ["technology" as const, "clinical" as const],
    description: "Structure and operate a high-performing EHR governance model. Design build standards, manage optimization requests, measure clinical adoption, and keep your system clean as it scales.",
    topics: ["Governance committee structure", "Build standards & request management", "Clinical decision support governance", "Optimization intake & prioritization", "Adoption metrics & reporting", "Downtime & disaster recovery planning"],
  },
  {
    title: "AI in Healthcare: Leadership Framework",
    duration: "Half Day",
    audience: "C-Suite, Board Members, Senior Clinical Leaders",
    pillars: ["technology" as const, "clinical" as const, "equity" as const],
    description: "What every healthcare leader needs to know about AI — without the hype. Covers governance, liability, algorithmic bias, clinical validation, vendor evaluation, and the regulatory landscape.",
    topics: ["AI readiness self-assessment", "Governance & oversight structures", "Clinical AI validation standards", "Algorithmic bias & equity risk", "FDA & CMS regulatory landscape", "Build vs. buy vs. partner frameworks"],
  },
  {
    title: "Revenue Cycle Excellence",
    duration: "2 Days",
    audience: "Revenue Cycle Staff, Billing Managers, CFO Teams",
    pillars: ["economics" as const, "policy" as const],
    description: "From front-end to back-end: a comprehensive skill-building program for revenue cycle professionals covering coding accuracy, denial management, payer contract strategy, and financial reporting.",
    topics: ["ICD-10 coding accuracy & CDI", "Denial prevention & appeals strategy", "Payer contract performance monitoring", "Price transparency compliance", "AR management & collections KPIs", "Revenue cycle technology selection"],
  },
  {
    title: "Regulatory Literacy for Health Executives",
    duration: "1 Day",
    audience: "C-Suite, Senior VP, Department Directors",
    pillars: ["policy" as const, "economics" as const, "equity" as const],
    description: "Navigate the regulatory landscape with confidence. Understand how CMS, ONC, state Medicaid, and legislative processes affect your organization — and how to engage effectively.",
    topics: ["CMS annual rule cycle & impact", "ONC interoperability & data sharing", "No Surprises Act & price transparency", "State Medicaid policy environment", "Health equity regulatory requirements", "Effective public comment & advocacy"],
  },
  {
    title: "Health Equity Strategy & SDOH Integration",
    duration: "1 Day",
    audience: "Strategy, Clinical, Community Health, DEI Leaders",
    pillars: ["equity" as const, "clinical" as const, "policy" as const],
    description: "Build a practical, measurable health equity strategy grounded in SDOH data, community engagement, and regulatory requirements — not just aspirational statements.",
    topics: ["SDOH screening & data integration", "Health equity data collection standards", "Community health needs assessments", "Equity-focused care model design", "Algorithmic bias identification & mitigation", "CMS health equity program requirements"],
  },
  {
    title: "Custom Executive Curriculum",
    duration: "Tailored",
    audience: "Leadership Teams, Board Members, Any Audience",
    pillars: ["policy" as const, "economics" as const, "technology" as const, "clinical" as const, "equity" as const, "operations" as const],
    description: "We design bespoke education programs combining modules from across all six pillars, tailored to your organization's specific challenges, strategic priorities, and audience level.",
    topics: ["Fully customized to your agenda", "Combines any program topics", "Real case studies from your context", "Pre/post assessment tools", "Executive coaching integration", "Multi-session cohort design available"],
  },
];

export default function TrainingPage() {
  return (
    <div className="bg-white min-h-screen pb-20">

      {/* ── HERO ──────────────────────────────────────────────────────────── */}
      <div className="bg-slate-50 text-slate-900 py-8 border-b border-slate-200">
        <div className="container mx-auto px-4 md:px-8 max-w-5xl">
          <div className="flex items-center gap-2 mb-4">
            <span className="bg-purple-100 text-purple-700 border border-purple-200 text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded">
              HTR Advisory
            </span>
            <span className="text-slate-400 text-xs">All 6 Pillars</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight mb-6 leading-tight">
            Training & Executive <span className="text-purple-600">Education</span>
          </h1>
          <p className="text-base md:text-lg text-slate-600 max-w-3xl leading-relaxed mb-8">
            Healthcare-specific professional development that bridges the gap between policy awareness and operational execution. Built on the same frameworks we use in live engagements. Taught by <strong>practitioners, not academics</strong> — across all six pillars.
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

      {/* ── DELIVERY FORMATS ──────────────────────────────────────────────── */}
      <div className="container mx-auto px-4 md:px-8 max-w-5xl py-12">
        <h2 className="text-2xl font-bold text-slate-900 mb-8">Delivery Formats</h2>
        <div className="grid md:grid-cols-4 gap-6">
          {[
            { icon: "🏢", title: "On-Site Workshop", desc: "Facilitator-led workshop at your location. Minimum 10 participants. Includes pre-work, participant materials, and post-session action planning." },
            { icon: "💻", title: "Virtual Cohort", desc: "Structured virtual program with live sessions + async recordings. Ideal for distributed teams. Up to 50 learners per cohort license." },
            { icon: "🎯", title: "Executive Coaching", desc: "1:1 or small-group executive coaching with a senior HTR advisor. Monthly retainer model. Tailored to individual leadership challenges." },
            { icon: "📚", title: "Custom Curriculum", desc: "Full curriculum design and development service. HTR designs, writes, and delivers a bespoke multi-session program built entirely for your organization." },
          ].map((format) => (
            <div key={format.title} className="bg-purple-50 border border-purple-200 rounded-xl p-6 text-center">
              <div className="text-3xl mb-3">{format.icon}</div>
              <h3 className="font-bold text-slate-900 mb-2">{format.title}</h3>
              <p className="text-slate-600 text-sm md:text-base leading-relaxed">{format.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ── PROGRAM CATALOG ───────────────────────────────────────────────── */}
      <div className="container mx-auto px-4 md:px-8 max-w-5xl py-8">
        <h2 className="text-2xl font-bold text-slate-900 mb-2">Program Catalog</h2>
        <p className="text-slate-500 mb-8">All programs can be delivered on-site, virtually, or as custom cohorts. Each is tagged to its primary HTR pillars.</p>
        <div className="space-y-6">
          {PROGRAMS.map((program) => (
            <div key={program.title} className="bg-white p-6 md:p-8 rounded-xl shadow-lg border border-gray-200 hover:shadow-xl transition-all">
              <div className="md:flex gap-8">
                <div className="md:w-2/3">
                  <div className="flex flex-wrap items-center gap-2 mb-3">
                    <span className="bg-purple-100 text-purple-700 text-xs font-black px-2 py-1 rounded-full border border-purple-200">{program.duration}</span>
                    {program.pillars.map((p) => (
                      <span key={p} className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-full border ${PILLAR_STYLES[p].bg} ${PILLAR_STYLES[p].text} ${PILLAR_STYLES[p].border}`}>
                        {PILLAR_STYLES[p].label}
                      </span>
                    ))}
                  </div>
                  <h3 className="text-lg md:text-xl font-bold text-slate-900 mb-1">{program.title}</h3>
                  <p className="text-xs text-slate-400 font-semibold uppercase tracking-wide mb-3">For: {program.audience}</p>
                  <p className="text-slate-600 text-sm md:text-base leading-relaxed">{program.description}</p>
                </div>
                <div className="md:w-1/3 mt-4 md:mt-0">
                  <p className="text-xs font-bold text-slate-500 uppercase tracking-wide mb-2">Topics Covered</p>
                  <ul className="space-y-1.5">
                    {program.topics.map((topic) => (
                      <li key={topic} className="flex gap-2 items-center text-xs text-slate-600">
                        <span className="w-1.5 h-1.5 rounded-full bg-purple-400 shrink-0"></span>
                        {topic}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── PRICING ───────────────────────────────────────────────────────── */}
      <div className="container mx-auto px-4 md:px-8 max-w-5xl py-12">
        <h2 className="text-2xl font-bold text-slate-900 mb-8">Pricing</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {service.tiers.map((tier) => (
            <div key={tier.name} className={`p-8 rounded-xl border-2 ${tier.highlight ? "border-purple-600 bg-purple-50 shadow-xl" : "border-slate-200 bg-white shadow-sm"}`}>
              {tier.highlight && <div className="text-xs font-black text-purple-700 uppercase tracking-widest mb-3">Most Popular</div>}
              <h3 className="text-lg md:text-xl font-bold text-slate-900 mb-1">{tier.name}</h3>
              <div className="text-2xl font-black text-purple-600 mb-3">{tier.price}</div>
              <p className="text-slate-600 text-sm md:text-base mb-6 leading-relaxed">{tier.description}</p>
              <ul className="space-y-2">
                {tier.includes.map((item) => (
                  <li key={item} className="flex gap-2 items-start text-sm text-slate-700">
                    <span className="text-purple-500 mt-0.5 shrink-0">✓</span>
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
        <div className="bg-linear-to-r from-fuchsia-600 to-purple-600 text-white rounded-2xl p-10 md:p-14 text-center shadow-2xl">
          <h2 className="text-3xl font-black mb-4">Invest in Your Team&apos;s Healthcare Intelligence</h2>
          <p className="text-lg text-fuchsia-100 mb-8 max-w-2xl mx-auto">
            The most expensive mistake in healthcare transformation is having the strategy without the team capability to execute it. Let&apos;s close that gap.
          </p>
          <Link
            href="/advisory/contact"
            className="inline-block px-8 py-4 bg-white text-fuchsia-700 font-black text-lg rounded-lg hover:bg-fuchsia-50 transition-colors shadow-lg"
          >
            Request Training Information
          </Link>
          <p className="mt-4 text-sm text-fuchsia-200">Group pricing available for 3+ programs. CEU credits available for select programs.</p>
        </div>
      </div>
    </div>
  );
}
