import Link from 'next/link'
import { ArrowRightIcon } from '@heroicons/react/24/outline'

export const metadata = {
  title: 'HTR Connect | Health Transformation Review',
  description: 'The HTR Connect network — peer cohorts, pillar circles, expert Q&A, resources, and the professional directory for healthcare transformation leaders.',
}

const CONNECT_FEATURES = [
  {
    href:        '/connect/ask',
    emoji:       '🎯',
    title:       'Ask HTR',
    description: 'Submit any healthcare transformation question to our advisory team. A named expert responds within 48 business hours. Browse the public Q&A library.',
    badge:       '48-hour response',
    badgeCls:    'bg-sky-100 text-sky-700',
  },
  {
    href:        '/connect/forums',
    emoji:       '💬',
    title:       'Pillar Circles',
    description: 'Six moderated discussion forums — one per pillar — where members exchange questions, analysis, and experience with expert facilitation.',
    badge:       'Moderated',
    badgeCls:    'bg-indigo-100 text-indigo-700',
  },
  {
    href:        '/connect-hub',
    emoji:       '🤝',
    title:       'Peer Cohorts',
    description: 'Structured quarterly learning groups organized by organization type — CAH, ACO, FQHC, health plan, and more. Chatham House rules apply.',
    badge:       'Quarterly',
    badgeCls:    'bg-teal-100 text-teal-700',
  },
  {
    href:        '/connect/directory',
    emoji:       '👥',
    title:       'Member Directory',
    description: 'Find and connect with healthcare transformation professionals across the HTR subscriber network. Opt-in, verified, searchable by role and pillar.',
    badge:       'Subscriber-only',
    badgeCls:    'bg-violet-100 text-violet-700',
  },
  {
    href:        '/connect/toolkits',
    emoji:       '🛠️',
    title:       'Toolkits & Templates',
    description: 'Practitioner-tested frameworks, policy templates, VBC contract scaffolds, and project management tools — ready to adapt.',
    badge:       'Downloadable',
    badgeCls:    'bg-amber-100 text-amber-700',
  },
  {
    href:        '/connect/register-office-hours',
    emoji:       '🕐',
    title:       'Office Hours',
    description: 'Register for monthly group office hours with HTR analysts and advisors — open Q&A format, no prepared presentation required.',
    badge:       'Monthly',
    badgeCls:    'bg-emerald-100 text-emerald-700',
  },
  {
    href:        '/connect/alerts',
    emoji:       '🔔',
    title:       'Policy Alerts',
    description: 'Subscribe to real-time notifications for CMS rule-making, state health plan amendments, and GMCB proceedings relevant to your pillars.',
    badge:       'Real-time',
    badgeCls:    'bg-rose-100 text-rose-700',
  },
  {
    href:        '/connect/apply',
    emoji:       '📋',
    title:       'Cohort Application',
    description: 'Apply to join a peer cohort. Cohorts are limited to 10–25 members to preserve candor. Rolling admissions with quarterly onboarding.',
    badge:       'Rolling admissions',
    badgeCls:    'bg-slate-100 text-slate-700',
  },
]

export default function ConnectPage() {
  return (
    <div className="w-full font-sans text-slate-800 flex flex-col pb-20">
      {/* Header */}
      <div className="bg-white border border-slate-200 rounded-2xl p-8 mb-6 shadow-sm relative overflow-hidden">
        <div className="absolute top-0 right-0 w-72 h-72 bg-violet-50 rounded-bl-full -mr-24 -mt-24 opacity-40 pointer-events-none" />
        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 bg-violet-100 text-violet-700 text-xs font-bold px-3 py-1 rounded-full mb-4">
            <span>👥</span> Subscriber Network
          </div>
          <h1 className="ty-h1 font-black text-slate-900 tracking-tight mb-3">
            HTR Connect
          </h1>
          <p className="text-slate-500 text-lg leading-relaxed max-w-2xl">
            The peer network for healthcare transformation professionals. Expert Q&A,
            structured peer cohorts, practitioner toolkits, and a verified professional directory —
            all in one place.
          </p>
        </div>
      </div>

      {/* Feature grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {CONNECT_FEATURES.map(f => (
          <Link
            key={f.href}
            href={f.href}
            className="group bg-white border border-slate-200 rounded-2xl p-6 hover:border-indigo-300 hover:shadow-md transition-all flex flex-col"
          >
            <div className="flex items-start justify-between mb-4">
              <span className="text-3xl">{f.emoji}</span>
              <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${f.badgeCls}`}>
                {f.badge}
              </span>
            </div>
            <h2 className="font-black text-slate-900 text-lg mb-2 group-hover:text-indigo-700 transition-colors">
              {f.title}
            </h2>
            <p className="text-slate-500 text-sm leading-relaxed flex-1">{f.description}</p>
            <div className="flex items-center gap-1 text-indigo-600 text-xs font-bold mt-4 group-hover:gap-2 transition-all">
              Explore <ArrowRightIcon className="w-3.5 h-3.5" />
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
