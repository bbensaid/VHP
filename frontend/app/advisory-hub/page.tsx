import Link from 'next/link'
import { ADVISORY_STATS } from '@/lib/advisory-data'

export const metadata = {
  title: 'HTR Advisory Hub | 8 Practice Areas',
  description:
    'Strategic consulting, research, IT advisory, independent review, capability assessment, financial audit, regulatory counsel, and training — all anchored in the HTR Five-Pillar Framework.',
}

const SERVICES = [
  {
    href: '/advisory/consulting',
    icon: '💼',
    label: 'Strategic Consulting',
    desc: 'C-suite strategy across regulatory compliance, value-based care design, digital transformation, clinical operations, and M&A integration.',
    pillars: ['Policy', 'Economics', 'Clinical'],
    border: 'border-fuchsia-400',
    badge: 'bg-fuchsia-100 text-fuchsia-700',
    btn: 'bg-fuchsia-600 hover:bg-fuchsia-700',
    bg: 'bg-fuchsia-50',
  },
  {
    href: '/advisory/research',
    icon: '🔬',
    label: 'Custom Research & Analysis',
    desc: 'Policy briefs, systematic reviews, health economic modeling, program evaluation, and regulatory comment development.',
    pillars: ['Policy', 'Economics', 'Equity'],
    border: 'border-sky-400',
    badge: 'bg-sky-100 text-sky-700',
    btn: 'bg-sky-600 hover:bg-sky-700',
    bg: 'bg-sky-50',
  },
  {
    href: '/advisory/it-consulting',
    icon: '💻',
    label: 'Health IT Consulting',
    desc: 'EHR optimization, FHIR interoperability strategy, data governance, AI governance frameworks, and ONC compliance.',
    pillars: ['Technology', 'Policy'],
    border: 'border-indigo-400',
    badge: 'bg-indigo-100 text-indigo-700',
    btn: 'bg-indigo-600 hover:bg-indigo-700',
    bg: 'bg-indigo-50',
  },
  {
    href: '/advisory/independent-review',
    icon: '🔍',
    label: 'Independent Review',
    desc: 'Objective external validation of quality programs, HEDIS audits, CMS Star Ratings analysis, and NCQA/TJC accreditation readiness.',
    pillars: ['Clinical', 'Policy'],
    border: 'border-emerald-400',
    badge: 'bg-emerald-100 text-emerald-700',
    btn: 'bg-emerald-600 hover:bg-emerald-700',
    bg: 'bg-emerald-50',
  },
  {
    href: '/advisory/capability-assessment',
    icon: '📊',
    label: 'Capability Assessment',
    desc: 'Structured organizational readiness evaluation across 7 dimensions: leadership, data, technology, finance, clinical quality, workforce, and equity.',
    pillars: ['Economics', 'Technology', 'Clinical'],
    border: 'border-amber-400',
    badge: 'bg-amber-100 text-amber-700',
    btn: 'bg-amber-600 hover:bg-amber-700',
    bg: 'bg-amber-50',
  },
  {
    href: '/advisory/financial-audit',
    icon: '💰',
    label: 'Financial & Actuarial Audit',
    desc: 'MLR analysis, HCC risk adjustment validation, TCOC benchmarking, IBNR reserve analysis, and actuarial value certification.',
    pillars: ['Economics'],
    border: 'border-green-400',
    badge: 'bg-green-100 text-green-700',
    btn: 'bg-green-600 hover:bg-green-700',
    bg: 'bg-green-50',
  },
  {
    href: '/advisory/regulatory',
    icon: '⚖️',
    label: 'Regulatory & Compliance',
    desc: 'CMS program navigation, 1115 waiver applications, HIPAA/HITECH compliance, ONC information blocking, and Vermont GMCB advisory.',
    pillars: ['Policy', 'Technology'],
    border: 'border-rose-400',
    badge: 'bg-rose-100 text-rose-700',
    btn: 'bg-rose-600 hover:bg-rose-700',
    bg: 'bg-rose-50',
  },
  {
    href: '/advisory/training',
    icon: '🎓',
    label: 'Training & Development',
    desc: 'Executive leadership programs, HEDIS/MIPS workshops, FHIR for administrators, and custom certificate programs delivered in-person or virtual.',
    pillars: ['Clinical', 'Technology', 'Equity'],
    border: 'border-violet-400',
    badge: 'bg-violet-100 text-violet-700',
    btn: 'bg-violet-600 hover:bg-violet-700',
    bg: 'bg-violet-50',
  },
  {
    href: '/advisory/reports',
    icon: '📄',
    label: 'Impact Reports',
    desc: 'HTR-published policy briefs, program evaluations, state health system analyses, and research reports available to clients and subscribers.',
    pillars: ['Policy', 'Economics', 'Equity'],
    border: 'border-slate-400',
    badge: 'bg-slate-100 text-slate-700',
    btn: 'bg-slate-600 hover:bg-slate-700',
    bg: 'bg-slate-100',
  },
  {
    href: '/advisory/contact',
    icon: '📬',
    label: 'Start an Engagement',
    desc: 'Book a no-obligation discovery call. We scope a proposal and have a plan in front of you within 5 business days.',
    pillars: [],
    border: 'border-fuchsia-600',
    badge: 'bg-fuchsia-600 text-white',
    btn: 'bg-fuchsia-600 hover:bg-fuchsia-700',
    bg: 'bg-fuchsia-50',
  },
]

export default function AdvisoryHubPage() {
  return (
    <div className="min-h-screen bg-slate-50">

      {/* ── Hero ── */}
      <div className="bg-linear-to-br from-slate-100 via-white to-fuchsia-50 border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-6 py-14">
          <div className="flex items-center gap-2 mb-4">
            <Link href="/advisory" className="text-xs font-bold text-slate-400 hover:text-fuchsia-600 transition-colors">
              ← Advisory
            </Link>
          </div>
          <div className="flex items-center gap-3 mb-4">
            <span className="text-xs font-bold uppercase tracking-widest text-fuchsia-600 bg-fuchsia-100 rounded-full px-3 py-1">
              Advisory Hub
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-slate-900 mb-4 leading-tight">
            HTR Advisory
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl leading-relaxed mb-10">
            8 practice areas anchored in the Five-Pillar Framework — Policy, Economics, Technology, Clinical, and Equity — delivered through rigorous, research-first methodology.
          </p>

          {/* Stats */}
          <div className="flex flex-wrap gap-8">
            {ADVISORY_STATS.slice(0, 4).map(s => (
              <div key={s.label} className="flex flex-col">
                <span className="text-3xl font-black text-fuchsia-700">{s.value}</span>
                <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide">{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Services Grid ── */}
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {SERVICES.map(svc => (
            <Link
              key={svc.href}
              href={svc.href}
              className={`group flex flex-col bg-white rounded-2xl border border-slate-200 border-l-4 ${svc.border} shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden`}
            >
              <div className="p-6 flex-1">
                <div className="flex items-start gap-3 mb-3">
                  <span className="text-3xl">{svc.icon}</span>
                  <div>
                    <h2 className="text-lg font-black text-slate-900 leading-tight group-hover:text-fuchsia-700 transition-colors">
                      {svc.label}
                    </h2>
                    {svc.pillars.length > 0 && (
                      <div className="flex flex-wrap gap-1 mt-1">
                        {svc.pillars.map(p => (
                          <span key={p} className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-500">
                            {p}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
                <p className="text-sm text-slate-500 leading-relaxed">{svc.desc}</p>
              </div>

              <div className={`px-6 py-3 ${svc.bg} border-t border-slate-100 flex items-center justify-between`}>
                <span className="text-xs font-semibold text-slate-400">View practice area</span>
                <span className={`text-xs font-bold px-3 py-1.5 rounded-lg text-white ${svc.btn} transition-colors`}>
                  Explore →
                </span>
              </div>
            </Link>
          ))}
        </div>

        {/* Bottom links */}
        <div className="mt-10 flex flex-wrap gap-4 justify-center">
          <Link
            href="/advisory/approach"
            className="px-5 py-2.5 bg-white border border-slate-200 rounded-xl text-sm font-semibold text-slate-600 hover:border-fuchsia-300 hover:text-fuchsia-700 transition-all shadow-sm"
          >
            Our Methodology →
          </Link>
          <Link
            href="/advisory/services"
            className="px-5 py-2.5 bg-white border border-slate-200 rounded-xl text-sm font-semibold text-slate-600 hover:border-fuchsia-300 hover:text-fuchsia-700 transition-all shadow-sm"
          >
            Full Services Overview →
          </Link>
          <Link
            href="/advisory/contact"
            className="px-5 py-2.5 bg-fuchsia-600 text-white rounded-xl text-sm font-bold hover:bg-fuchsia-700 transition-colors shadow"
          >
            Book a Discovery Call →
          </Link>
        </div>
      </div>
    </div>
  )
}
