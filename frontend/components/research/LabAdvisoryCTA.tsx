'use client'

import Link from 'next/link'

interface LabAdvisoryCTAProps {
  category: string           // e.g. "Interoperability & Risk"
  practiceHref: string       // e.g. "/advisory/it-consulting"
  practiceLabel: string      // e.g. "Health IT Consulting"
  practiceIcon: string       // e.g. "💻"
  bullets: string[]          // 3 things HTR can do based on what they just modeled
  toolParam: string          // URL param: which tool category they used
}

export default function LabAdvisoryCTA({
  category,
  practiceHref,
  practiceLabel,
  practiceIcon,
  bullets,
  toolParam,
}: LabAdvisoryCTAProps) {
  const contactHref = `/advisory/contact?from=research-lab&category=${encodeURIComponent(toolParam)}&practice=${encodeURIComponent(practiceLabel)}`

  return (
    <div className="bg-linear-to-br from-fuchsia-50 via-white to-indigo-50 border border-fuchsia-200 rounded-2xl p-8 mt-4">
      <div className="flex flex-col md:flex-row md:items-start gap-6">

        {/* Left: text */}
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-xs font-bold uppercase tracking-widest text-fuchsia-600 bg-fuchsia-100 px-3 py-1 rounded-full">
              From Analysis to Action
            </span>
          </div>
          <h3 className="text-lg md:text-xl font-black text-slate-900 mb-2">
            You just modeled <span className="text-fuchsia-700">{category}</span>.<br />
            HTR Advisory can help you implement it.
          </h3>
          <p className="text-sm text-slate-500 mb-4 leading-relaxed">
            The analysis you ran here is the starting point. Our <strong className="text-slate-700">{practiceLabel}</strong> practice turns these models into real-world decisions, contracts, and transformation roadmaps.
          </p>
          <ul className="space-y-2 mb-6">
            {bullets.map((b) => (
              <li key={b} className="flex items-start gap-2 text-sm text-slate-600">
                <span className="text-fuchsia-500 mt-0.5 shrink-0">✓</span>
                {b}
              </li>
            ))}
          </ul>

          <div className="flex flex-wrap gap-3">
            <Link
              href={contactHref}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-fuchsia-600 text-white font-bold text-sm rounded-xl hover:bg-fuchsia-700 transition-colors shadow-sm"
            >
              Talk to an HTR Advisor →
            </Link>
            <Link
              href={practiceHref}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-white border border-slate-200 text-slate-600 font-semibold text-sm rounded-xl hover:border-fuchsia-300 hover:text-fuchsia-700 transition-all"
            >
              {practiceIcon} {practiceLabel} practice
            </Link>
          </div>
        </div>

        {/* Right: quick stats */}
        <div className="shrink-0 flex flex-col gap-3 md:w-48">
          {[
            { value: '5 days', label: 'to proposal' },
            { value: '97%', label: 'client satisfaction' },
            { value: '35+', label: 'states served' },
          ].map((s) => (
            <div key={s.label} className="bg-white border border-slate-200 rounded-xl px-4 py-3 text-center shadow-sm">
              <div className="text-2xl font-black text-fuchsia-700">{s.value}</div>
              <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wide">{s.label}</div>
            </div>
          ))}
        </div>

      </div>
    </div>
  )
}
