'use client'

import Link from 'next/link'
import LabAdvisoryCTA from './LabAdvisoryCTA'
import ToolErrorBoundary from './ToolErrorBoundary'
import { QuestionMarkCircleIcon } from '@heroicons/react/24/outline'

const NAV = [
  { href: '/research-lab/interoperability',     icon: '🧬', short: 'Interoperability' },
  { href: '/research-lab/payment-models',       icon: '💰', short: 'Payment Models' },
  { href: '/research-lab/population-equity',    icon: '👥', short: 'Population & Equity' },
  { href: '/research-lab/policy-quality',       icon: '📋', short: 'Policy & Quality' },
  { href: '/research-lab/technology-ai',        icon: '🤖', short: 'Technology & AI' },
  { href: '/research-lab/vbc-clinical-quality', icon: '🏥', short: 'VBC & Quality' },
  { href: '/research-lab/knowledge-workspace',  icon: '📚', short: 'Knowledge' },
]

interface LabPageShellProps {
  icon: string
  label: string
  desc: string
  accentClass: string
  accentLight: string
  currentHref: string
  children: React.ReactNode
  // Advisory CTA
  practiceHref: string
  practiceLabel: string
  practiceIcon: string
  advisoryBullets: string[]
  toolParam: string
}

export default function LabPageShell({
  icon, label, desc, accentClass, accentLight, currentHref, children,
  practiceHref, practiceLabel, practiceIcon, advisoryBullets, toolParam
}: LabPageShellProps) {
  const currentIndex = NAV.findIndex(n => n.href === currentHref)
  const prev = NAV[currentIndex - 1]
  const next = NAV[currentIndex + 1]

  return (
    <div className="min-h-screen bg-slate-50">

      {/* ── Top bar ── */}
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-6 py-3 flex items-center justify-between gap-4">
          <Link
            href="/research-lab"
            className="flex items-center gap-1.5 text-sm font-semibold text-slate-500 hover:text-indigo-700 transition-colors"
          >
            ← Research Lab
          </Link>

          {/* Category nav — wraps naturally, no horizontal scroll */}
          <div className="flex flex-wrap gap-1 justify-end">
            {NAV.map(n => (
              <Link
                key={n.href}
                href={n.href}
                className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                  n.href === currentHref
                    ? `${accentClass} text-white`
                    : 'text-slate-500 hover:text-slate-800 hover:bg-slate-100'
                }`}
              >
                <span>{n.icon}</span>
                <span className="hidden sm:inline">{n.short}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* ── Page header ── */}
      <div className="bg-linear-to-br from-slate-100 via-white to-slate-50 border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-6 py-10 flex items-start gap-4">
          <span className="text-5xl">{icon}</span>
          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span className={`inline-block text-[10px] font-bold uppercase tracking-widest px-2.5 py-0.5 rounded-full ${accentLight}`}>
                Research Lab
              </span>
              <Link
                href="/academy/getting-started/research-lab"
                className="inline-flex items-center gap-1 text-[10px] font-semibold uppercase tracking-widest px-2.5 py-0.5 rounded-full bg-indigo-50 text-indigo-600 border border-indigo-100 hover:bg-indigo-100 transition-colors"
                title="Open the Research Lab guide in Getting Started"
              >
                <QuestionMarkCircleIcon className="w-3 h-3" />
                How to use this lab
              </Link>
            </div>
            <h1 className="text-3xl font-black text-slate-900 mb-2">{label}</h1>
            <p className="text-slate-500 ty-body max-w-2xl leading-relaxed">{desc}</p>
          </div>
        </div>
      </div>

      {/* ── Tools ── */}
      <div className="max-w-6xl mx-auto px-6 py-10 space-y-10">
        <ToolErrorBoundary toolName={label}>
          {children}
        </ToolErrorBoundary>
      </div>

      {/* ── Advisory CTA ── */}
      <div className="max-w-6xl mx-auto px-6 pb-10">
        <LabAdvisoryCTA
          category={label}
          practiceHref={practiceHref}
          practiceLabel={practiceLabel}
          practiceIcon={practiceIcon}
          bullets={advisoryBullets}
          toolParam={toolParam}
        />
      </div>

      {/* ── Prev / Next nav ── */}
      <div className="max-w-6xl mx-auto px-6 pb-16 flex items-center justify-between gap-4">
        {prev ? (
          <Link
            href={prev.href}
            className="flex items-center gap-2 px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm font-semibold text-slate-600 hover:border-slate-300 hover:text-slate-900 transition-all shadow-sm"
          >
            ← {prev.icon} {prev.short}
          </Link>
        ) : <div />}
        {next ? (
          <Link
            href={next.href}
            className="flex items-center gap-2 px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm font-semibold text-slate-600 hover:border-slate-300 hover:text-slate-900 transition-all shadow-sm"
          >
            {next.icon} {next.short} →
          </Link>
        ) : <div />}
      </div>
    </div>
  )
}
