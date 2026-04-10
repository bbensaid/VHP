import Link from "next/link";
import { ADVISORY_SERVICES, PILLAR_STYLES } from "@/lib/advisory-data";

export const metadata = {
  title: "HTR Advisory | Custom Research & Analysis",
  description:
    "Bespoke healthcare intelligence across all 6 pillars. Market feasibility studies, policy impact modeling, competitive landscape analysis, workforce research, technology vendor evaluation, and equity needs assessments.",
};

const service = ADVISORY_SERVICES.find((s) => s.id === "research")!;

const CAPABILITIES = [
  {
    pillar: "economics" as const,
    icon: "📊",
    title: "Market Feasibility Studies",
    description: "Assess the viability of new service lines (ASCs, micro-hospitals, telehealth programs, PACE) using localized payer mix, demographic forecasting, and competitor analysis.",
    examples: ["New service line entry analysis", "Certificate of need (CON) feasibility", "Market share and referral pattern analysis", "Greenfield site feasibility for new facilities"],
  },
  {
    pillar: "policy" as const,
    icon: "⚖️",
    title: "Policy Impact Modeling",
    description: "Simulate the financial and operational impact of proposed state or federal legislation on your specific P&L — before the rule is finalized, not after.",
    examples: ["CMS annual rule P&L impact simulation", "State global budget / all-payer model modeling", "No Surprises Act compliance cost analysis", "Medicaid expansion scenario modeling"],
  },
  {
    pillar: "economics" as const,
    icon: "🔍",
    title: "Competitive Landscape Analysis",
    description: "Map the competitive dynamics of your market — payer strategy, competitor service expansions, ACO participation, and strategic partnerships — to identify positioning opportunities.",
    examples: ["Competitor service line benchmarking", "Payer market concentration analysis", "ACO and VBC partnership landscape", "Physician alignment competitive mapping"],
  },
  {
    pillar: "economics" as const,
    icon: "👥",
    title: "Workforce & Labor Economics Research",
    description: "Analyze the economics of healthcare labor in your market — supply/demand dynamics, wage benchmarking, turnover cost modeling, and workforce strategy scenario analysis.",
    examples: ["Nursing labor market supply/demand", "Contract labor vs. permanent staff ROI analysis", "Wage benchmarking by role and geography", "10-year workforce projection modeling"],
  },
  {
    pillar: "technology" as const,
    icon: "⚙️",
    title: "Technology Vendor Evaluation",
    description: "Independent, vendor-neutral evaluation of health IT products and platforms — from EHRs to AI tools — using our proprietary scoring methodology.",
    examples: ["EHR vendor scoring & shortlist", "AI/ML clinical decision support evaluation", "Revenue cycle technology assessment", "Population health platform comparison"],
  },
  {
    pillar: "policy" as const,
    icon: "🗺️",
    title: "State Regulatory Landscape Reports",
    description: "Comprehensive state-specific regulatory landscape analysis — Medicaid policy, CON laws, scope-of-practice rules, and state innovation model activity — for market entry or strategic planning.",
    examples: ["Multi-state market entry regulatory review", "State Medicaid program design analysis", "Scope of practice law comparative study", "State innovation waiver opportunity mapping"],
  },
  {
    pillar: "clinical" as const,
    icon: "🏥",
    title: "Clinical Program ROI Analysis",
    description: "Measure and project the financial and clinical return of specific clinical programs — from Hospital-at-Home to precision medicine — using HTR's 6-pillar impact framework.",
    examples: ["Hospital-at-Home program financial model", "Precision medicine program ROI", "Virtual care expansion business case", "Chronic disease management program analysis"],
  },
  {
    pillar: "equity" as const,
    icon: "⚡",
    title: "Health Equity & SDOH Needs Assessment",
    description: "Data-driven community health needs assessment and SDOH landscape analysis to identify the highest-impact equity investments and program opportunities in your service area.",
    examples: ["SDOH data integration needs assessment", "Community health needs assessment (CHNA)", "Disparities analysis by service line", "SDOH intervention ROI modeling"],
  },
];

export default function ResearchPage() {
  return (
    <div className="bg-white min-h-screen pb-20">

      {/* ── HERO ──────────────────────────────────────────────────────────── */}
      <div className="bg-slate-50 text-slate-900 py-8 border-b border-slate-200">
        <div className="container mx-auto px-4 md:px-8 max-w-5xl">
          <div className="flex items-center gap-2 mb-4">
            <span className="bg-rose-100 text-rose-700 border border-rose-200 text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded">
              Advisory Services
            </span>
            <span className="text-slate-400 text-xs">All 6 Pillars</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight mb-6">
            Custom Research & <span className="text-rose-600">Analysis</span>
          </h1>
          <p className="text-base text-slate-600 max-w-2xl leading-relaxed mb-8">
            We deploy the HTR 6-pillar intelligence framework to answer specific strategic questions for health systems, investors, government agencies, and academic institutions. Commission bespoke analysis on any healthcare question — from &quot;The Economics of CRISPR in Rural Hospitals&quot; to &quot;State-Level Telehealth Policy Forecasts.&quot;
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

      {/* ── RESEARCH CAPABILITIES ─────────────────────────────────────────── */}
      <div className="container mx-auto px-4 md:px-8 py-16 max-w-5xl">
        <h2 className="text-2xl font-bold text-slate-900 mb-2">Research Capabilities</h2>
        <p className="text-slate-500 mb-8">Eight research practice areas spanning all six HTR pillars.</p>
        <div className="grid md:grid-cols-2 gap-6">
          {CAPABILITIES.map((cap) => (
            <div key={cap.title} className="p-8 border border-slate-200 rounded-xl hover:border-rose-400 hover:shadow-lg transition-all bg-white">
              <div className="flex items-center gap-3 mb-4">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center text-xl border ${PILLAR_STYLES[cap.pillar].bg} ${PILLAR_STYLES[cap.pillar].border}`}>
                  {cap.icon}
                </div>
                <span className={`text-[10px] font-bold uppercase tracking-wide px-2 py-0.5 rounded-full ${PILLAR_STYLES[cap.pillar].bg} ${PILLAR_STYLES[cap.pillar].text}`}>
                  {PILLAR_STYLES[cap.pillar].label}
                </span>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">{cap.title}</h3>
              <p className="text-slate-600 text-sm mb-4 leading-relaxed">{cap.description}</p>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Example Deliverables</p>
              <ul className="space-y-1.5">
                {cap.examples.map((ex) => (
                  <li key={ex} className="flex gap-2 items-center text-xs text-slate-600">
                    <span className="w-1.5 h-1.5 rounded-full bg-rose-400 shrink-0"></span>
                    {ex}
                  </li>
                ))}
              </ul>
              <Link href="/advisory/contact" className="mt-4 block text-rose-600 font-bold text-sm uppercase tracking-wide hover:underline">
                Request Sample →
              </Link>
            </div>
          ))}
        </div>
      </div>

      {/* ── HOW A RESEARCH ENGAGEMENT WORKS ──────────────────────────────── */}
      <div className="bg-indigo-700 text-white py-16">
        <div className="container mx-auto px-4 md:px-8 max-w-5xl">
          <h2 className="text-2xl font-bold mb-8">How a Research Engagement Works</h2>
          <div className="grid md:grid-cols-4 gap-6">
            {service.processSteps.map((step) => (
              <div key={step.stepNumber}>
                <div className="w-10 h-10 rounded-full bg-rose-500 text-white flex items-center justify-center font-black text-lg mb-4">
                  {step.stepNumber}
                </div>
                <div className="text-xs font-bold text-rose-300 uppercase tracking-wide mb-1">{step.duration}</div>
                <h3 className="text-base font-bold text-white mb-2">{step.title}</h3>
                <p className="text-indigo-100 text-sm leading-relaxed">{step.description}</p>
              </div>
            ))}
          </div>
          <div className="mt-12 bg-indigo-800 rounded-xl p-8 border border-indigo-600">
            <h3 className="text-lg font-bold text-white mb-4">What Makes HTR Research Different</h3>
            <div className="grid md:grid-cols-3 gap-6">
              <div>
                <div className="text-rose-400 font-bold mb-2">Proprietary Data</div>
                <p className="text-indigo-100 text-sm leading-relaxed">Access to HTR&apos;s 6-pillar intelligence database, CMS open data, state all-payer claims, HFMA peer benchmarks, and curated peer-reviewed literature.</p>
              </div>
              <div>
                <div className="text-rose-400 font-bold mb-2">6-Pillar Framework</div>
                <p className="text-indigo-100 text-sm leading-relaxed">Every research question is analyzed through Policy, Economics, Technology, Clinical, Equity, and Operations lenses — not just the single dimension the client originally requested.</p>
              </div>
              <div>
                <div className="text-rose-400 font-bold mb-2">Non-Partisan Analysis</div>
                <p className="text-indigo-100 text-sm leading-relaxed">No vendor sponsorships. No referral fees. No ideological commitments. Our research reaches the conclusions the data supports — even when that&apos;s inconvenient.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── SAMPLE DELIVERABLE PREVIEW ────────────────────────────────────── */}
      <div className="container mx-auto px-4 md:px-8 max-w-5xl py-16">
        <h2 className="text-2xl font-bold text-slate-900 mb-8">Sample Deliverable Structure</h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-slate-50 border-2 border-dashed border-slate-300 rounded-xl p-8">
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Research Brief (2-Week Turnaround)</p>
            <div className="space-y-3">
              {["Executive Summary (1 page)", "Research Question & Methodology", "Key Findings (5–7 bullet points)", "Evidence Base & Data Sources", "Implications for Your Organization", "3–5 Recommended Actions", "Full Data Appendix", "30-Minute Virtual Debrief"].map((section, i) => (
                <div key={section} className="flex items-center gap-3 text-sm text-slate-700">
                  <span className="w-5 h-5 rounded bg-rose-100 text-rose-700 flex items-center justify-center text-xs font-black shrink-0">{i + 1}</span>
                  {section}
                </div>
              ))}
            </div>
          </div>
          <div className="bg-slate-50 border-2 border-dashed border-slate-300 rounded-xl p-8">
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Full Research Engagement (6–8 Weeks)</p>
            <div className="space-y-3">
              {["Research Protocol & Approved Methodology", "Interim Findings Briefing (Week 3)", "Quantitative Model with Scenario Analysis", "Competitive Intelligence Annex", "Policy Environment Assessment", "Clinical Evidence Review", "Financial Impact Projections", "Implementation Roadmap", "Final Report + Executive Presentation Deck", "Full Literature & Data Appendix"].map((section, i) => (
                <div key={section} className="flex items-center gap-3 text-sm text-slate-700">
                  <span className="w-5 h-5 rounded bg-rose-100 text-rose-700 flex items-center justify-center text-xs font-black shrink-0">{i + 1}</span>
                  {section}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── PRICING ───────────────────────────────────────────────────────── */}
      <div className="container mx-auto px-4 md:px-8 max-w-5xl py-8">
        <h2 className="text-2xl font-bold text-slate-900 mb-8">Engagement Models</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {service.tiers.map((tier) => (
            <div key={tier.name} className={`p-8 rounded-xl border-2 ${tier.highlight ? "border-rose-500 bg-rose-50 shadow-xl" : "border-slate-200 bg-white shadow-sm"}`}>
              {tier.highlight && <div className="text-xs font-black text-rose-700 uppercase tracking-widest mb-3">Most Comprehensive</div>}
              <h3 className="text-xl font-bold text-slate-900 mb-1">{tier.name}</h3>
              <div className="text-2xl font-black text-rose-600 mb-3">{tier.price}</div>
              <p className="text-slate-600 text-sm mb-6 leading-relaxed">{tier.description}</p>
              <ul className="space-y-2">
                {tier.includes.map((item) => (
                  <li key={item} className="flex gap-2 items-start text-sm text-slate-700">
                    <span className="text-rose-500 mt-0.5 shrink-0">✓</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* ── CTA ───────────────────────────────────────────────────────────── */}
      <div className="container mx-auto px-4 md:px-8 max-w-4xl mt-8 text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Commission Your Research</h2>
        <p className="text-xl text-gray-600 mb-8">
          Submit an inquiry describing your research question and we&apos;ll scope a proposal within 5 business days.
        </p>
        <Link
          href="/advisory/contact"
          className="inline-block px-8 py-4 bg-indigo-600 text-white font-bold rounded-lg hover:bg-indigo-700 transition-colors shadow-lg"
        >
          Request a Research Proposal
        </Link>
      </div>
    </div>
  );
}
