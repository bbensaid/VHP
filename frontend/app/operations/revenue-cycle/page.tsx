import Link from "next/link";

export default function RevenueCyclePage() {
  return (
    <div className="bg-white font-sans text-slate-800 min-h-screen">
      <section className="relative bg-teal-700 text-white overflow-hidden py-20 md:py-28">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link href="/operations" className="inline-flex items-center text-sm font-bold text-teal-300 hover:text-white mb-8 block transition-colors">
            ← Operations Overview
          </Link>
          <span className="inline-block text-[11px] font-black tracking-[0.2em] uppercase text-teal-200 mb-5 border border-teal-500 bg-teal-600/40 px-4 py-1.5 rounded-full">
            Operations · Revenue Cycle Management
          </span>
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-black tracking-tight leading-tight mb-6">
            Revenue Cycle<br />
            <span className="text-teal-300">Management</span>
          </h1>
          <p className="text-base md:text-lg text-teal-100 max-w-2xl leading-relaxed">
            The end-to-end financial process from patient encounter to payment collection. Where administrative complexity either compounds or collapses the economics of care delivery.
          </p>
        </div>
      </section>

      <section className="py-16 md:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-10 mb-16">
          <div>
            <h2 className="text-2xl font-black text-slate-900 mb-4">What HTR Analyzes</h2>
            <ul className="space-y-3">
              {[
                "Medical coding accuracy and ICD-10/CPT coding compliance",
                "Clean claim submission rates and first-pass resolution",
                "Claims denial rates, denial root cause analysis, and appeals management",
                "Prior authorization burden — volume, approval rates, delay analysis",
                "Days in accounts receivable (AR) benchmarked against peer systems",
                "Charge capture integrity and charge description master (CDM) governance",
                "Revenue cycle staffing models and automation (RPA, AI-assisted coding)",
                "Payer contract performance and underpayment identification",
                "Patient financial experience — estimates, billing transparency, collections",
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
              <p className="text-[11px] font-black uppercase tracking-widest text-teal-600 mb-2">The Scale of the Problem</p>
              <p className="text-3xl font-black text-slate-900 mb-2">$935B</p>
              <p className="text-sm md:text-base text-slate-600 leading-relaxed">Estimated annual waste in US healthcare attributable to administrative complexity and billing inefficiency, per JAMA estimates. Revenue cycle dysfunction is the single largest non-clinical cost driver in American healthcare.</p>
            </div>
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-6">
              <p className="text-[11px] font-black uppercase tracking-widest text-slate-500 mb-2">HTR Index Metric</p>
              <p className="font-black text-slate-900 mb-1">Revenue Cycle Performance Index</p>
              <p className="text-sm md:text-base text-slate-600 leading-relaxed">Composite of clean claim rate, denial rate, and days in AR across the state's major health systems. Weight: 0.05 in the HTR Performance Index.</p>
            </div>
          </div>
        </div>

        <div className="bg-slate-900 text-white rounded-2xl p-8 md:p-10">
          <h3 className="text-xl font-black mb-4">Why Revenue Cycle Is a Transformation Variable, Not Just an Operations Problem</h3>
          <p className="text-slate-300 leading-relaxed mb-4">
            Value-based care transitions, global budgets, and alternative payment models all require revenue cycle systems capable of handling fundamentally different payment logic. A health system transitioning from fee-for-service to a global budget cannot succeed if its billing infrastructure, staff training, and payer contracts are still optimized for volume-based reimbursement.
          </p>
          <p className="text-slate-400 leading-relaxed">
            HTR analyzes revenue cycle not as a back-office function but as a strategic indicator of whether a health system is operationally prepared to absorb the payment model changes that every major transformation demands.
          </p>
        </div>
      </section>

      <section className="bg-slate-50 border-t border-slate-200 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-wrap gap-4">
          <Link href="/operations" className="inline-flex items-center gap-2 bg-teal-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-teal-700 transition-colors">← Operations Overview</Link>
          <Link href="/operations/workforce" className="inline-flex items-center gap-2 bg-white text-slate-900 border border-slate-200 px-6 py-3 rounded-lg font-bold hover:bg-slate-50 transition-colors">Workforce & Human Capital →</Link>
          <Link href="/economics" className="inline-flex items-center gap-2 bg-white text-slate-900 border border-slate-200 px-6 py-3 rounded-lg font-bold hover:bg-slate-50 transition-colors">Related: Economics Pillar →</Link>
        </div>
      </section>
    </div>
  );
}
