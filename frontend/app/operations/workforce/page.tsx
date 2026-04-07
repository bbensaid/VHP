import Link from "next/link";

export default function WorkforcePage() {
  return (
    <div className="bg-white font-sans text-slate-800 min-h-screen">
      <section className="relative bg-teal-700 text-white overflow-hidden py-20 md:py-28">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link href="/operations" className="inline-flex items-center text-sm font-bold text-teal-300 hover:text-white mb-8 block transition-colors">
            ← Operations Overview
          </Link>
          <span className="inline-block text-[11px] font-black tracking-[0.2em] uppercase text-teal-200 mb-5 border border-teal-500 bg-teal-600/40 px-4 py-1.5 rounded-full">
            Operations · Workforce & Human Capital
          </span>
          <h1 className="text-4xl md:text-6xl font-black tracking-tight leading-tight mb-6">
            Workforce &<br />
            <span className="text-teal-300">Human Capital</span>
          </h1>
          <p className="text-xl text-teal-100 max-w-2xl leading-relaxed">
            Every transformation requires people who can execute it. Vacancy rates, credentialing timelines, staffing models, and labor relations are not HR metrics — they are transformation viability signals.
          </p>
        </div>
      </section>

      <section className="py-16 md:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-10 mb-16">
          <div>
            <h2 className="text-2xl font-black text-slate-900 mb-4">What HTR Analyzes</h2>
            <ul className="space-y-3">
              {[
                "Clinical and administrative staff vacancy rates by role, specialty, and geography",
                "Turnover rates and retention analysis — including physician, nursing, and allied health",
                "Credentialing and privileging cycle times and backlog analysis",
                "Workforce planning models: FTE requirements for new care delivery configurations",
                "Scheduling optimization and staffing-to-acuity alignment",
                "Labor relations landscape: union density, contract status, pending negotiations",
                "Agency and travel nurse dependency and associated cost premiums",
                "Training and competency pipelines for new care model adoption",
                "Burnout indicators: administrative burden hours, documentation load per provider",
              ].map((item) => (
                <li key={item} className="flex gap-3 text-sm text-slate-700">
                  <span className="w-1.5 h-1.5 rounded-full bg-teal-500 shrink-0 mt-2" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="space-y-5">
            <div className="bg-teal-50 border border-teal-200 rounded-xl p-6">
              <p className="text-[11px] font-black uppercase tracking-widest text-teal-600 mb-2">The Execution Ceiling</p>
              <p className="text-3xl font-black text-slate-900 mb-2">20%+</p>
              <p className="text-sm text-slate-600 leading-relaxed">Nursing vacancy rates in many rural and safety-net markets. A transformation that assumes full workforce capacity to implement new models will fail before it launches in high-vacancy markets.</p>
            </div>
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-6">
              <p className="text-[11px] font-black uppercase tracking-widest text-slate-500 mb-2">HTR Index Metric</p>
              <p className="font-black text-slate-900 mb-1">Workforce Operational Readiness</p>
              <p className="text-sm text-slate-600 leading-relaxed">Composite of clinical staff vacancy rates, turnover, and credentialing cycle times. Sourced from HRSA workforce data and ACHE operational surveys. Weight: 0.05 in the HTR Performance Index.</p>
            </div>
          </div>
        </div>

        <div className="bg-slate-900 text-white rounded-2xl p-8 md:p-10">
          <h3 className="text-xl font-black mb-4">Why Workforce Operations Is Distinct from Workforce Economics</h3>
          <p className="text-slate-300 leading-relaxed mb-4">
            The Economics pillar tracks workforce as a macro variable: supply pipelines, compensation benchmarking, and labor market dynamics. The Operations pillar tracks workforce as an execution variable: can the specific institutions implementing a specific transformation actually staff it?
          </p>
          <p className="text-slate-400 leading-relaxed">
            A Hospital-at-Home program that requires 40 additional skilled nursing FTEs in a market with a 22% RN vacancy rate is not a staffing plan — it is a failure mode waiting to be discovered at launch. HTR's Operations analysis surfaces these gaps before the program design is locked.
          </p>
        </div>
      </section>

      <section className="bg-slate-50 border-t border-slate-200 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-wrap gap-4">
          <Link href="/operations/revenue-cycle" className="inline-flex items-center gap-2 bg-white text-slate-900 border border-slate-200 px-6 py-3 rounded-lg font-bold hover:bg-slate-50 transition-colors">← Revenue Cycle</Link>
          <Link href="/operations/compliance" className="inline-flex items-center gap-2 bg-teal-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-teal-700 transition-colors">Quality, Compliance & Risk →</Link>
          <Link href="/economics/cea" className="inline-flex items-center gap-2 bg-white text-slate-900 border border-slate-200 px-6 py-3 rounded-lg font-bold hover:bg-slate-50 transition-colors">Related: Labor & Workforce Strategy →</Link>
        </div>
      </section>
    </div>
  );
}
