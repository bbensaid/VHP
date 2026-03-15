import Link from "next/link";
import CEACalculator from "@/components/research/CEACalculator";
import APMCalculator from "@/components/research/APMCalculator";
import HospitalFinancialScorecard from "@/components/research/HospitalFinancialScorecard";

export const metadata = {
  title: "Research Lab | Health Transformation Review",
  description:
    "Advanced analytical tools for healthcare economists, hospital administrators, and policy makers — CEA, APM modeling, scenario analysis, and more.",
};

const TOOLS = [
  {
    id: "cea",
    label: "CEA Calculator",
    icon: "⚗️",
    desc: "Cost-Effectiveness Analysis — cost per QALY, NNT, break-even",
    badge: "Health Economics",
    badgeColor: "bg-emerald-100 text-emerald-700 border-emerald-300",
  },
  {
    id: "apm",
    label: "APM Economics",
    icon: "💰",
    desc: "Shared savings projections for ACO / VBP models",
    badge: "Value-Based Care",
    badgeColor: "bg-sky-100 text-sky-700 border-sky-300",
  },
  {
    id: "hospital",
    label: "Hospital Scorecard",
    icon: "🏥",
    desc: "Financial health stress-test with payer mix simulation",
    badge: "Finance",
    badgeColor: "bg-indigo-100 text-indigo-700 border-indigo-300",
  },
];

export default function ResearchLabPage() {
  return (
    <div className="min-h-screen bg-slate-50 pb-24">
      {/* Hero */}
      <div className="bg-slate-50 border-b border-slate-200 py-14">
        <div className="max-w-7xl mx-auto px-6">
          <span className="inline-block text-xs font-black uppercase tracking-widest text-indigo-600 bg-indigo-50 border border-indigo-200 rounded-full px-3 py-1 mb-4">
            Research Lab
          </span>
          <h1 className="text-4xl md:text-5xl font-black text-slate-900 mb-4">
            Analytical Tools
          </h1>
          <p className="text-xl text-slate-600 max-w-2xl leading-relaxed">
            Quantitative modeling for healthcare professionals, hospital
            administrators, and policy makers. Build evidence-based decisions
            with rigorous analytical frameworks.
          </p>

          {/* Tool nav pills */}
          <div className="flex flex-wrap gap-3 mt-8">
            {TOOLS.map((t) => (
              <a
                key={t.id}
                href={`#tool-${t.id}`}
                className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-xl text-sm font-bold text-slate-700 hover:border-indigo-300 hover:text-indigo-700 transition-colors shadow-sm"
              >
                <span>{t.icon}</span>
                {t.label}
              </a>
            ))}
            <Link
              href="/hti-dashboard"
              className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-xl text-sm font-bold hover:bg-indigo-700 transition-colors shadow-sm"
            >
              📊 HTI Dashboard →
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12 space-y-20">
        {/* Tool: CEA */}
        <section id="tool-cea">
          <div className="flex items-center gap-3 mb-6">
            <span className="text-2xl">⚗️</span>
            <div>
              <div className="flex items-center gap-2 mb-0.5">
                <h2 className="text-2xl font-black text-slate-900">Cost-Effectiveness Analysis Calculator</h2>
                <span className="text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full border bg-emerald-100 text-emerald-700 border-emerald-300">
                  Health Economics
                </span>
              </div>
              <p className="text-slate-500 text-sm">
                Calculate cost per QALY, NNT, and break-even timeline for any clinical intervention.
                Compare against standard willingness-to-pay thresholds used by ICER, NICE, and CMS.
              </p>
            </div>
          </div>
          <CEACalculator />
        </section>

        <div className="h-px bg-slate-200" />

        {/* Tool: APM */}
        <section id="tool-apm">
          <div className="flex items-center gap-3 mb-6">
            <span className="text-2xl">💰</span>
            <div>
              <div className="flex items-center gap-2 mb-0.5">
                <h2 className="text-2xl font-black text-slate-900">APM Shared Savings Calculator</h2>
                <span className="text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full border bg-sky-100 text-sky-700 border-sky-300">
                  Value-Based Care
                </span>
              </div>
              <p className="text-slate-500 text-sm">
                Model projected shared savings under MSSP Track 1/2, ACO REACH, and custom global budget scenarios.
                Includes risk corridor modeling and quality withhold impact.
              </p>
            </div>
          </div>
          <APMCalculator />
        </section>

        <div className="h-px bg-slate-200" />

        {/* Tool: Hospital Financial Scorecard */}
        <section id="tool-hospital">
          <div className="flex items-center gap-3 mb-6">
            <span className="text-2xl">🏥</span>
            <div>
              <div className="flex items-center gap-2 mb-0.5">
                <h2 className="text-2xl font-black text-slate-900">Hospital Financial Health Scorecard</h2>
                <span className="text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full border bg-indigo-100 text-indigo-700 border-indigo-300">
                  Finance
                </span>
              </div>
              <p className="text-slate-500 text-sm">
                Stress-test hospital financials against payer mix shifts, Medicaid rate cuts, and volume changes.
                Benchmarks against CAH, Rural PPS, and Urban Tertiary peer groups.
              </p>
            </div>
          </div>
          <HospitalFinancialScorecard />
        </section>
      </div>
    </div>
  );
}
