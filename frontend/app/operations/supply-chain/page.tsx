import Link from "next/link";

export default function SupplyChainPage() {
  return (
    <div className="bg-white font-sans text-slate-800 min-h-screen">
      <section className="relative bg-teal-700 text-white overflow-hidden py-20 md:py-28">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link href="/operations" className="inline-flex items-center text-sm font-bold text-teal-300 hover:text-white mb-8 block transition-colors">
            ← Operations Overview
          </Link>
          <span className="inline-block text-[11px] font-black tracking-[0.2em] uppercase text-teal-200 mb-5 border border-teal-500 bg-teal-600/40 px-4 py-1.5 rounded-full">
            Operations · Supply Chain & Infrastructure
          </span>
          <h1 className="ty-h1 font-black tracking-tight leading-tight mb-6">
            Supply Chain &<br />
            <span className="text-teal-300">Infrastructure</span>
          </h1>
          <p className="text-base md:ty-hero text-teal-100 max-w-2xl leading-relaxed">
            Pharmaceutical procurement, medical device logistics, GPO strategy, facilities management, and capital equipment planning. The physical and logistical foundation that either supports or limits care delivery at scale.
          </p>
        </div>
      </section>

      <section className="py-16 md:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-10 mb-16">
          <div>
            <h2 className="text-2xl font-black text-slate-900 mb-4">What HTR Analyzes</h2>
            <ul className="space-y-3">
              {[
                "GPO (Group Purchasing Organization) strategy and contract utilization rates",
                "Drug supply chain integrity: shortage exposure, formulary flexibility, 340B program compliance",
                "Medical device and PPE procurement resilience and single-source dependency risk",
                "Inventory management systems: par level accuracy, waste rates, stockout frequency",
                "Facilities condition: deferred maintenance backlog, capital renewal timelines",
                "Capital equipment planning: replacement cycles, lease vs. buy analysis, technology refresh",
                "Distribution and logistics infrastructure for expanded care delivery footprints",
                "Vendor concentration and supply chain diversification strategies",
                "Environmental services and infection control infrastructure",
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
              <p className="text-[11px] font-black uppercase tracking-widest text-teal-600 mb-2">The COVID Lesson</p>
              <p className="text-lg font-black text-slate-900 mb-2">Supply chain is a patient safety variable</p>
              <p className="ty-body text-slate-600 leading-relaxed">The pandemic exposed what health system operations experts had long known: supply chain fragility is not an efficiency problem — it is a patient safety and care continuity problem. Transformation strategies that expand care delivery footprints without assessing supply chain capacity are building on an untested foundation.</p>
            </div>
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-6">
              <p className="text-[11px] font-black uppercase tracking-widest text-slate-500 mb-2">The Expansion Risk</p>
              <p className="ty-body text-slate-600 leading-relaxed">Hospital-at-Home, telehealth expansion, and community health worker programs all require supply chain extensions beyond traditional hospital walls. HTR analyzes whether existing logistics infrastructure can support the expanded footprint of proposed care models.</p>
            </div>
          </div>
        </div>

        <div className="bg-slate-900 text-white rounded-2xl p-8 md:p-10">
          <h3 className="text-xl font-black mb-4">Supply Chain as a Transformation Constraint</h3>
          <p className="text-slate-300 leading-relaxed mb-4">
            A care model that requires specialized equipment, specific pharmaceutical protocols, or an extended distribution network presupposes a supply chain capable of supporting it. HTR analyzes supply chain readiness as a gating condition for transformation proposals that depend on physical and logistical infrastructure that may not exist at the required scale.
          </p>
          <p className="text-slate-400 leading-relaxed">
            This is particularly critical for rural health system transformations, where supply chain constraints — drug shortages, device availability, facilities condition — often represent binding constraints that policy and economic analysis never surfaces.
          </p>
        </div>
      </section>

      <section className="bg-slate-50 border-t border-slate-200 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-wrap gap-4">
          <Link href="/operations/compliance" className="inline-flex items-center gap-2 bg-white text-slate-900 border border-slate-200 px-6 py-3 rounded-lg font-bold hover:bg-slate-50 transition-colors">← Quality, Compliance & Risk</Link>
          <Link href="/operations/payer-network" className="inline-flex items-center gap-2 bg-teal-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-teal-700 transition-colors">Payer & Network Operations →</Link>
          <Link href="/clinical/hah" className="inline-flex items-center gap-2 bg-white text-slate-900 border border-slate-200 px-6 py-3 rounded-lg font-bold hover:bg-slate-50 transition-colors">Related: Hospital-at-Home →</Link>
        </div>
      </section>
    </div>
  );
}
