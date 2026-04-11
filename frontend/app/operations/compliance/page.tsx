import Link from "next/link";

export default function CompliancePage() {
  return (
    <div className="bg-white font-sans text-slate-800 min-h-screen">
      <section className="relative bg-teal-700 text-white overflow-hidden py-20 md:py-28">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link href="/operations" className="inline-flex items-center text-sm font-bold text-teal-300 hover:text-white mb-8 block transition-colors">
            ← Operations Overview
          </Link>
          <span className="inline-block text-[11px] font-black tracking-[0.2em] uppercase text-teal-200 mb-5 border border-teal-500 bg-teal-600/40 px-4 py-1.5 rounded-full">
            Operations · Quality, Compliance & Risk
          </span>
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-black tracking-tight leading-tight mb-6">
            Quality, Compliance<br />
            <span className="text-teal-300">& Risk</span>
          </h1>
          <p className="text-base md:text-lg text-teal-100 max-w-2xl leading-relaxed">
            Accreditation, regulatory compliance, patient safety infrastructure, and quality management systems. The operational foundation that determines whether a health system can meet the standards transformation demands.
          </p>
        </div>
      </section>

      <section className="py-16 md:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-10 mb-16">
          <div>
            <h2 className="text-2xl font-black text-slate-900 mb-4">What HTR Analyzes</h2>
            <ul className="space-y-3">
              {[
                "Accreditation status and readiness: Joint Commission, NCQA, DNV, CARF",
                "HIPAA compliance infrastructure: breach history, audit programs, training rates",
                "CMS Conditions of Participation compliance and survey history",
                "Quality payment program performance: MIPS, APM participation, star ratings",
                "Patient safety systems: event reporting infrastructure, near-miss culture, RCA processes",
                "Fraud, waste, and abuse (FWA) detection and prevention programs",
                "Clinical documentation improvement (CDI) program maturity",
                "Risk management: malpractice claims history, sentinel event rates, liability exposure",
                "Regulatory change management capacity — ability to absorb new compliance requirements",
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
              <p className="text-[11px] font-black uppercase tracking-widest text-teal-600 mb-2">Why This Is an Operations Question</p>
              <p className="text-lg font-black text-slate-900 mb-2">Compliance is not legal — it is operational</p>
              <p className="text-sm md:text-base text-slate-600 leading-relaxed">The rules are set by Policy. The legal exposure is analyzed by Risk. But whether the organization has the staff, systems, and culture to actually comply — day in, day out, at scale — is an Operations question.</p>
            </div>
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-6">
              <p className="text-[11px] font-black uppercase tracking-widest text-slate-500 mb-2">The Transformation Intersection</p>
              <p className="text-sm md:text-base text-slate-600 leading-relaxed">Every new care model, payment arrangement, and technology deployment carries a compliance surface. Organizations with weak compliance infrastructure cannot safely absorb rapid change — creating an operational ceiling on transformation speed.</p>
            </div>
          </div>
        </div>

        <div className="bg-slate-900 text-white rounded-2xl p-8 md:p-10">
          <h3 className="text-xl font-black mb-4">The Distinction from the Policy Pillar</h3>
          <p className="text-slate-300 leading-relaxed mb-4">
            HTR's Policy pillar analyzes what the rules are — the regulatory framework, the legislative landscape, the enforcement priorities. The Operations pillar analyzes whether the organization has the infrastructure to meet those rules under conditions of transformation stress.
          </p>
          <p className="text-slate-400 leading-relaxed">
            A health system that is compliant today may not remain compliant when it doubles its care coordination staff, implements a new EHR, and shifts 30% of its revenue to value-based contracts simultaneously. Compliance capacity under transformation conditions is a distinct and underevaluated risk.
          </p>
        </div>
      </section>

      <section className="bg-slate-50 border-t border-slate-200 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-wrap gap-4">
          <Link href="/operations/workforce" className="inline-flex items-center gap-2 bg-white text-slate-900 border border-slate-200 px-6 py-3 rounded-lg font-bold hover:bg-slate-50 transition-colors">← Workforce & Human Capital</Link>
          <Link href="/operations/supply-chain" className="inline-flex items-center gap-2 bg-teal-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-teal-700 transition-colors">Supply Chain & Infrastructure →</Link>
          <Link href="/policy" className="inline-flex items-center gap-2 bg-white text-slate-900 border border-slate-200 px-6 py-3 rounded-lg font-bold hover:bg-slate-50 transition-colors">Related: Policy Pillar →</Link>
        </div>
      </section>
    </div>
  );
}
