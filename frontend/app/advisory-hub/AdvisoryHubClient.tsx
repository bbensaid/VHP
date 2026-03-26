'use client'

import Link from 'next/link'
import HubPageTemplate from '@/components/templates/HubPageTemplate'
import { ADVISORY_STATS } from '@/lib/advisory-data'

const SERVICES = [
  {
    id: 'consulting',
    href: '/advisory/consulting',
    icon: '💼',
    label: 'Strategic Consulting',
    desc: 'C-suite strategy across regulatory compliance, value-based care design, digital transformation, clinical operations, and M&A integration. We work directly with CEOs, CMOs, CFOs, and boards to turn Five-Pillar analysis into actionable organizational decisions.',
    pillars: ['Policy', 'Economics', 'Clinical'],
    accentBg: 'bg-fuchsia-50',
    accentBorder: 'border-fuchsia-200',
    accentText: 'text-fuchsia-700',
    badgeCls: 'bg-fuchsia-100 text-fuchsia-700',
    btnCls: 'bg-fuchsia-600 hover:bg-fuchsia-700',
  },
  {
    id: 'research',
    href: '/advisory/research',
    icon: '🔬',
    label: 'Custom Research & Analysis',
    desc: 'Policy briefs, systematic reviews, health economic modeling, program evaluation, and regulatory comment development. Delivered with academic rigor, on consulting timelines — typically 2–6 weeks.',
    pillars: ['Policy', 'Economics', 'Equity'],
    accentBg: 'bg-sky-50',
    accentBorder: 'border-sky-200',
    accentText: 'text-sky-700',
    badgeCls: 'bg-sky-100 text-sky-700',
    btnCls: 'bg-sky-600 hover:bg-sky-700',
  },
  {
    id: 'it-consulting',
    href: '/advisory/it-consulting',
    icon: '💻',
    label: 'Health IT Consulting',
    desc: 'EHR optimization, FHIR interoperability strategy, data governance, AI governance frameworks, and ONC compliance. We navigate the intersection of clinical workflow and technical architecture.',
    pillars: ['Technology', 'Policy'],
    accentBg: 'bg-indigo-50',
    accentBorder: 'border-indigo-200',
    accentText: 'text-indigo-700',
    badgeCls: 'bg-indigo-100 text-indigo-700',
    btnCls: 'bg-indigo-600 hover:bg-indigo-700',
  },
  {
    id: 'independent-review',
    href: '/advisory/independent-review',
    icon: '🔍',
    label: 'Independent Review',
    desc: 'Objective external validation of quality programs, HEDIS audits, CMS Star Ratings analysis, and NCQA/TJC accreditation readiness. Independent means no stake in the outcome — only the truth.',
    pillars: ['Clinical', 'Policy'],
    accentBg: 'bg-emerald-50',
    accentBorder: 'border-emerald-200',
    accentText: 'text-emerald-700',
    badgeCls: 'bg-emerald-100 text-emerald-700',
    btnCls: 'bg-emerald-600 hover:bg-emerald-700',
  },
  {
    id: 'capability-assessment',
    href: '/advisory/capability-assessment',
    icon: '📊',
    label: 'Capability Assessment',
    desc: 'Structured organizational readiness evaluation across 7 dimensions: leadership, data, technology, finance, clinical quality, workforce, and equity. Benchmarked against national cohorts.',
    pillars: ['Economics', 'Technology', 'Clinical'],
    accentBg: 'bg-amber-50',
    accentBorder: 'border-amber-200',
    accentText: 'text-amber-700',
    badgeCls: 'bg-amber-100 text-amber-700',
    btnCls: 'bg-amber-600 hover:bg-amber-700',
  },
  {
    id: 'financial-audit',
    href: '/advisory/financial-audit',
    icon: '💰',
    label: 'Financial & Actuarial Audit',
    desc: 'MLR analysis, HCC risk adjustment validation, TCOC benchmarking, IBNR reserve analysis, and actuarial value certification. Credentialed actuaries, not analysts playing actuarial.',
    pillars: ['Economics'],
    accentBg: 'bg-green-50',
    accentBorder: 'border-green-200',
    accentText: 'text-green-700',
    badgeCls: 'bg-green-100 text-green-700',
    btnCls: 'bg-green-600 hover:bg-green-700',
  },
  {
    id: 'regulatory',
    href: '/advisory/regulatory',
    icon: '⚖️',
    label: 'Regulatory & Compliance',
    desc: 'CMS program navigation, 1115 waiver applications, HIPAA/HITECH compliance, ONC information blocking, and Vermont GMCB advisory. We know the rules — and how they evolve.',
    pillars: ['Policy', 'Technology'],
    accentBg: 'bg-rose-50',
    accentBorder: 'border-rose-200',
    accentText: 'text-rose-700',
    badgeCls: 'bg-rose-100 text-rose-700',
    btnCls: 'bg-rose-600 hover:bg-rose-700',
  },
  {
    id: 'training',
    href: '/advisory/training',
    icon: '🎓',
    label: 'Training & Development',
    desc: 'Executive leadership programs, HEDIS/MIPS workshops, FHIR for administrators, and custom certificate programs delivered in-person or virtual. Grounded in the same content as the HTR Academy.',
    pillars: ['Clinical', 'Technology', 'Equity'],
    accentBg: 'bg-violet-50',
    accentBorder: 'border-violet-200',
    accentText: 'text-violet-700',
    badgeCls: 'bg-violet-100 text-violet-700',
    btnCls: 'bg-violet-600 hover:bg-violet-700',
  },
  {
    id: 'reports',
    href: '/advisory/reports',
    icon: '📄',
    label: 'Impact Reports',
    desc: 'HTR-published policy briefs, program evaluations, state health system analyses, and research reports available to clients and subscribers. Institutional-grade research you can act on.',
    pillars: ['Policy', 'Economics', 'Equity'],
    accentBg: 'bg-slate-50',
    accentBorder: 'border-slate-200',
    accentText: 'text-slate-700',
    badgeCls: 'bg-slate-200 text-slate-700',
    btnCls: 'bg-slate-600 hover:bg-slate-700',
  },
]

const PILLAR_COLORS: Record<string, string> = {
  Policy:     'bg-blue-100 text-blue-700',
  Economics:  'bg-emerald-100 text-emerald-700',
  Technology: 'bg-indigo-100 text-indigo-700',
  Clinical:   'bg-red-100 text-red-700',
  Equity:     'bg-orange-100 text-orange-700',
}

function ServicePanel({ svc }: { svc: typeof SERVICES[number] }) {
  return (
    <div className={`rounded-2xl border-2 ${svc.accentBorder} ${svc.accentBg} p-8`}>
      <div className="flex items-start gap-4 mb-5">
        <span className="text-5xl">{svc.icon}</span>
        <div>
          <h2 className={`text-2xl font-black ${svc.accentText} mb-1`}>{svc.label}</h2>
          <div className="flex flex-wrap gap-1.5">
            {svc.pillars.map(p => (
              <span key={p} className={`text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full ${PILLAR_COLORS[p] ?? 'bg-slate-100 text-slate-600'}`}>
                {p}
              </span>
            ))}
          </div>
        </div>
      </div>

      <p className="text-slate-600 leading-relaxed mb-8 text-base max-w-3xl">
        {svc.desc}
      </p>

      <div className="flex flex-wrap gap-3">
        <Link
          href={svc.href}
          className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-black text-white ${svc.btnCls} transition-colors shadow`}
        >
          View Full Practice Area →
        </Link>
        <Link
          href="/advisory/contact"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold bg-white border border-slate-200 text-slate-700 hover:border-slate-300 hover:text-slate-900 transition-colors shadow-sm"
        >
          Book a Discovery Call
        </Link>
      </div>
    </div>
  )
}

export default function AdvisoryHubClient() {
  const statsStr = ADVISORY_STATS.slice(0, 4)
    .map(s => `${s.value} ${s.label}`)
    .join(' · ')

  return (
    <HubPageTemplate
      badgeLabel="HTR Advisory"
      badgeClass="bg-fuchsia-50 text-fuchsia-700 border border-fuchsia-100"
      title="HTR Advisory"
      subtitle={`8 practice areas anchored in the Five-Pillar Framework — ${statsStr}`}
      backLink="/advisory"
      backLabel="← Advisory"
      backLinkHoverClass="hover:text-fuchsia-600"
      tabs={SERVICES.map(svc => ({
        id: svc.id,
        icon: <span>{svc.icon}</span>,
        label: svc.label,
        content: <ServicePanel svc={svc} />,
      }))}
    />
  )
}
