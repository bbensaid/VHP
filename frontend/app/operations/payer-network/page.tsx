import Link from "next/link";

export default function PayerNetworkPage() {
  return (
    <div className="bg-white font-sans text-slate-800 min-h-screen">
      <section className="relative bg-teal-700 text-white overflow-hidden py-20 md:py-28">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link href="/operations" className="inline-flex items-center text-sm font-bold text-teal-300 hover:text-white mb-8 block transition-colors">
            ← Operations Overview
          </Link>
          <span className="inline-block text-[11px] font-black tracking-[0.2em] uppercase text-teal-200 mb-5 border border-teal-500 bg-teal-600/40 px-4 py-1.5 rounded-full">
            Operations · Payer & Network Operations
          </span>
          <h1 className="ty-h1 font-black tracking-tight leading-tight mb-6">
            Payer & Network<br />
            <span className="text-teal-300">Operations</span>
          </h1>
          <p className="text-base md:ty-hero text-teal-100 max-w-2xl leading-relaxed">
            Utilization management, prior authorization, network adequacy, contract administration, member services, and underwriting. The operational infrastructure of health insurance — and the friction interface between payers and providers.
          </p>
        </div>
      </section>

      <section className="py-16 md:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-10 mb-16">
          <div>
            <h2 className="text-2xl font-black text-slate-900 mb-4">What HTR Analyzes</h2>
            <ul className="space-y-3">
              {[
                "Prior authorization volume, approval rates, denial rates, and appeals outcomes by payer",
                "Utilization management programs: criteria, decision timelines, clinical review staffing",
                "Network adequacy standards: time-distance metrics, specialist availability, rural access",
                "Provider credentialing and enrollment cycle times across major payers",
                "Payer-provider contract terms: payment rates, carve-outs, quality incentive structures",
                "Claims adjudication accuracy and timeliness benchmarking",
                "Member services infrastructure: call center capacity, digital access, grievance rates",
                "Benefits design and administration: formulary management, cost-sharing structures",
                "Care management program enrollment, engagement, and outcomes by population segment",
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
              <p className="text-[11px] font-black uppercase tracking-widest text-teal-600 mb-2">The Friction Dimension</p>
              <p className="text-3xl font-black text-slate-900 mb-2">1,000+</p>
              <p className="ty-body text-slate-600 leading-relaxed">Insurance companies in the US, each with its own policies, forms, and filing requirements. The administrative burden created by this fragmentation consumes an estimated $265B annually in provider-side administrative costs alone.</p>
            </div>
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-6">
              <p className="text-[11px] font-black uppercase tracking-widest text-slate-500 mb-2">The VBC Intersection</p>
              <p className="ty-body text-slate-600 leading-relaxed">Value-based care transitions require payer operations to shift from high-volume transactional processing to risk-bearing relationship management. Payers without the operational infrastructure for population health management, shared savings accounting, and risk adjustment cannot be effective VBC partners.</p>
            </div>
          </div>
        </div>

        <div className="bg-slate-900 text-white rounded-2xl p-8 md:p-10">
          <h3 className="text-xl font-black mb-4">Payer Operations as a Transformation Enabler or Constraint</h3>
          <p className="text-slate-300 leading-relaxed mb-4">
            Every value-based care model, every alternative payment arrangement, every care delivery innovation requires a payer that can operationally support it — with the contract management, data sharing, care management, and administrative processing capacity that the model demands.
          </p>
          <p className="text-slate-400 leading-relaxed">
            HTR analyzes payer operational readiness as a co-determinant of transformation success — distinct from the policy frameworks that authorize the model and the economic structures that fund it. A payer that is contractually willing but operationally unprepared will delay, distort, or defeat a transformation even when all other conditions are met.
          </p>
        </div>
      </section>

      <section className="bg-slate-50 border-t border-slate-200 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-wrap gap-4">
          <Link href="/operations/supply-chain" className="inline-flex items-center gap-2 bg-white text-slate-900 border border-slate-200 px-6 py-3 rounded-lg font-bold hover:bg-slate-50 transition-colors">← Supply Chain & Infrastructure</Link>
          <Link href="/operations" className="inline-flex items-center gap-2 bg-teal-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-teal-700 transition-colors">Operations Overview</Link>
          <Link href="/economics/value" className="inline-flex items-center gap-2 bg-white text-slate-900 border border-slate-200 px-6 py-3 rounded-lg font-bold hover:bg-slate-50 transition-colors">Related: Value-Based Care Models →</Link>
        </div>
      </section>
    </div>
  );
}
