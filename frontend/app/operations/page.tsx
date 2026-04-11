import Link from "next/link";

const subpages = [
  {
    href: "/operations/revenue-cycle",
    label: "Revenue Cycle Management",
    dot: "bg-teal-500",
    desc: "Billing integrity, medical coding, claims management, denial analysis, prior authorization, and charge capture. The financial engine of every health system.",
  },
  {
    href: "/operations/workforce",
    label: "Workforce & Human Capital",
    dot: "bg-teal-400",
    desc: "Staffing models, credentialing pipelines, scheduling systems, vacancy and turnover analysis, labor relations, and workforce planning under resource constraints.",
  },
  {
    href: "/operations/compliance",
    label: "Quality, Compliance & Risk",
    dot: "bg-teal-600",
    desc: "Accreditation readiness (Joint Commission, NCQA), HIPAA compliance, regulatory audit management, patient safety systems, and quality improvement programs.",
  },
  {
    href: "/operations/supply-chain",
    label: "Supply Chain & Infrastructure",
    dot: "bg-amber-500",
    desc: "Pharmaceutical procurement, medical device logistics, GPO strategy, inventory resilience, facilities management, and capital equipment planning.",
  },
  {
    href: "/operations/payer-network",
    label: "Payer & Network Operations",
    dot: "bg-teal-700",
    desc: "Utilization management, prior authorization workflows, network adequacy, payer-provider contract administration, member services, and benefits design.",
  },
];

export default function OperationsPage() {
  return (
    <div className="bg-white font-sans text-slate-800 min-h-screen">

      {/* ── PAGE HEADER ──────────────────────────────────────────────────── */}
      <section className="bg-teal-700 text-white py-4 border-b border-teal-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <span className="text-[10px] font-semibold uppercase tracking-widest text-teal-300 block mb-0.5">Intelligence Pillar 06</span>
          <h1 className="text-xl font-bold tracking-tight uppercase">Operations Intelligence</h1>
          <p className="text-sm text-teal-200/80 mt-0.5 max-w-2xl">The machinery that carries or kills every policy reform — revenue cycles, workforce systems, supply chains, compliance, and payer operations.</p>
        </div>
      </section>

      {/* ── THE QUESTION ──────────────────────────────────────────────────── */}
      <section className="bg-teal-50 border-y border-teal-200 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white border border-teal-200 rounded-xl p-6 shadow-sm">
              <p className="text-[11px] font-black uppercase tracking-widest text-teal-500 mb-3">The Pillar Question</p>
              <p className="text-2xl font-black text-slate-900 italic">"Is it executable?"</p>
              <p className="text-sm md:text-base text-slate-600 mt-3 leading-relaxed">
                A transformation that is legally permissible, economically funded, technologically capable, clinically proven, and equitably designed still fails if the operational infrastructure cannot carry it.
              </p>
            </div>
            <div className="bg-white border border-teal-200 rounded-xl p-6 shadow-sm">
              <p className="text-[11px] font-black uppercase tracking-widest text-teal-500 mb-3">The Scale</p>
              <p className="text-3xl font-black text-slate-900">$1 Trillion</p>
              <p className="text-sm md:text-base text-slate-600 mt-2 leading-relaxed">
                Estimated annual US healthcare administrative spend — 25% of total healthcare expenditure. The single largest operational cost driver and the most underanalyzed lever for transformation.
              </p>
            </div>
            <div className="bg-white border border-teal-200 rounded-xl p-6 shadow-sm">
              <p className="text-[11px] font-black uppercase tracking-widest text-teal-500 mb-3">The Blind Spot</p>
              <p className="text-lg font-black text-slate-900 leading-tight">Strategy without operational ground-truth</p>
              <p className="text-sm md:text-base text-slate-600 mt-2 leading-relaxed">
                Most healthcare transformation analysis stops at policy, economics, and clinical evidence. HTR's Operations pillar is the ground-truth check that catches the execution failures before they become headline stories.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── 5 DOMAINS ─────────────────────────────────────────────────────── */}
      <section className="py-20 md:py-28 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-14">
          <span className="text-[11px] font-black tracking-[0.2em] uppercase text-teal-600 mb-4 block">
            Five Operational Domains
          </span>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-black tracking-tight text-slate-900 mb-4">
            Where transformation either lands or breaks.
          </h2>
          <p className="text-base md:text-lg text-slate-500 max-w-3xl">
            Each domain represents a distinct operational system with its own professional standards, data infrastructure, and failure modes. Weakness in any one can undermine strength across all others.
          </p>
        </div>
        <div className="space-y-4">
          {subpages.map((s) => (
            <Link
              key={s.href}
              href={s.href}
              className="group flex items-start gap-5 p-6 bg-white border border-teal-100 hover:border-teal-300 rounded-xl shadow-sm hover:shadow-md transition-all"
            >
              <span className={`w-3 h-3 rounded-full ${s.dot} shrink-0 mt-1.5`} />
              <div className="flex-1">
                <h3 className="font-black text-slate-900 text-lg group-hover:text-teal-700 transition-colors">
                  {s.label}
                </h3>
                <p className="text-sm md:text-base text-slate-600 mt-1 leading-relaxed">{s.desc}</p>
              </div>
              <span className="text-teal-400 group-hover:text-teal-600 text-lg font-bold shrink-0 self-center transition-colors">→</span>
            </Link>
          ))}
        </div>
      </section>

      {/* ── WHY NOW ───────────────────────────────────────────────────────── */}
      <section className="bg-slate-50 border-y border-slate-200 py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <span className="text-[11px] font-black tracking-[0.2em] uppercase text-teal-600 mb-4 block">
                Why Operations Belongs in the Framework
              </span>
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-black tracking-tight text-slate-900 mb-6">
                The execution layer has been the missing analysis.
              </h2>
              <p className="text-base text-slate-600 leading-relaxed mb-5">
                For decades, healthcare transformation analysis focused on policy frameworks, economic models, and clinical evidence — treating operations as an implementation detail. The evidence of 30 years of failed transformations proves otherwise.
              </p>
              <p className="text-base text-slate-600 leading-relaxed">
                Revenue cycles that cannot adapt to new payment models. Credentialing systems that cannot onboard the workforce a reform requires. Supply chains that break under the procurement demands of a new care model. These are not implementation problems — they are foundational analytical failures that occur when operations are not included from the beginning.
              </p>
            </div>
            <div className="space-y-4">
              {[
                { stat: "40%+", label: "of submitted claims are not paid electronically on first submission", color: "text-teal-700" },
                { stat: "17M", label: "healthcare workers employed in administration — more than in direct patient care", color: "text-teal-600" },
                { stat: "25%", label: "of total US healthcare spending attributed to administrative overhead", color: "text-teal-500" },
                { stat: "18 months", label: "average delay when transformation plans outpace operational readiness", color: "text-amber-600" },
              ].map((item) => (
                <div key={item.label} className="bg-white border border-slate-200 rounded-xl p-5 flex gap-4 items-start">
                  <span className={`text-2xl font-black ${item.color} shrink-0`}>{item.stat}</span>
                  <p className="text-sm md:text-base text-slate-600 leading-relaxed">{item.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ───────────────────────────────────────────────────────────── */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-xl md:text-2xl lg:text-3xl font-black tracking-tight text-slate-900 mb-4">
          See how Operations connects to the other five pillars.
        </h2>
        <p className="text-base md:text-lg text-slate-500 mb-8 max-w-xl mx-auto">
          No transformation analysis is complete until operational executability is confirmed.
        </p>
        <div className="flex flex-wrap gap-3 justify-center">
          <Link href="/about/framework" className="inline-flex items-center gap-2 bg-teal-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-teal-700 transition-colors">
            Our Six-Pillar Framework →
          </Link>
          <Link href="/htr-simulator" className="inline-flex items-center gap-2 bg-white text-slate-900 border border-slate-200 px-6 py-3 rounded-lg font-bold hover:bg-slate-50 transition-colors">
            HTR Simulator
          </Link>
          <Link href="/transformation-friction-index" className="inline-flex items-center gap-2 bg-white text-slate-900 border border-slate-200 px-6 py-3 rounded-lg font-bold hover:bg-slate-50 transition-colors">
            Friction Index
          </Link>
        </div>
      </section>
    </div>
  );
}
