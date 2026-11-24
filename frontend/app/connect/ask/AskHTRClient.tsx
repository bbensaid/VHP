'use client'

import { useState } from 'react'
import { useBrand } from '@/components/BrandContext'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'

// Load-bearing pillar order; Equity is the cross-cutting imperative, listed
// after the five pillars rather than among them.
const PILLARS = ['Policy', 'Technology', 'Economics', 'Clinical', 'Operations', 'Equity', 'General']

const PILLAR_COLORS: Record<string, string> = {
  Policy:     'bg-blue-100 text-blue-700',
  Economics:  'bg-emerald-100 text-emerald-700',
  Technology: 'bg-indigo-100 text-indigo-700',
  Clinical:   'bg-red-100 text-red-700',
  Equity:     'bg-violet-100 text-violet-700',
  Operations: 'bg-amber-100 text-amber-700',
  General:    'bg-slate-100 text-slate-700',
}

// Example questions with sourced answers (rewritten 2026-11-23). The earlier set named
// invented askers ("Medicaid Director, New England State Agency") and staff ("Practice
// Lead"), claimed HTR testimony to CMS, and carried stale or wrong rule details.
const FEATURED_QA = [
  {
    id: 'aco-rural',
    pillar: 'Policy',
    q: 'What should a rural organization weigh before launching a Medicare Shared Savings Program ACO?',
    a: "Three things. Size: an MSSP ACO needs at least 5,000 assigned beneficiaries, which pushes rural providers toward multi-county or multi-organization ACOs. Risk path: the BASIC track lets a new ACO start at low or no downside risk and move along a glide path to two-sided risk; ENHANCED carries the most risk and reward. Capital: since 2024, eligible new, low-revenue ACOs can receive advance investment payments to build care coordination before savings arrive. Benchmarks and attribution deserve the closest modeling — attribution can be unstable where patients split care across distant providers. The book's Chapter 7 and the APM Shared Savings Calculator walk through the arithmetic.",
    askedBy: 'Example question',
    answeredBy: 'HTR analysis',
  },
  {
    id: 'fhir-roadmap',
    pillar: 'Technology',
    q: "How should a payer sequence work under CMS's Interoperability and Prior Authorization rule (CMS-0057-F)?",
    a: "Start with the dates. The rule's operational prior-authorization requirements — decisions within 72 hours for expedited and seven calendar days for standard requests, a specific reason for each denial, and public reporting of prior-authorization metrics — began in 2026. The new FHIR APIs — Provider Access, Payer-to-Payer and Prior Authorization — are due January 1, 2027, and prior-authorization information must be added to the existing Patient Access API. A sensible order: measure current prior-authorization performance first (it is now reported publicly), then map data gaps against the HL7 Da Vinci implementation guides, then build the Prior Authorization API with provider EHR partners. The book's Chapters 4 and 5 cover the Technology pillar this sits in.",
    askedBy: 'Example question',
    answeredBy: 'HTR analysis',
  },
  {
    id: 'global-budget',
    pillar: 'Economics',
    q: 'What are the core design choices in a hospital global budget?',
    a: "Five: the base (usually a hospital's historical revenue over a defined period); the update factor (inflation, a growth cap, or both); adjustments for volume that legitimately moves between hospitals or into the community; which payers are in (Maryland's model covers all payers; Vermont's Act 68 global budgets include Medicare where federal law permits and exclude Medicaid by statute); and what is carved out. Maryland's all-payer hospital rate-setting is the longest-running US reference point. The book's Chapter 6 compares Maryland, Pennsylvania's rural model and Vermont's Act 68 design, and the Global Budget Transition Modeler lets you test the choices.",
    askedBy: 'Example question',
    answeredBy: 'HTR analysis',
  },
]

function QACard({ qa }: { qa: typeof FEATURED_QA[number] }) {
  return (
    <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
      <div className="p-6 border-b border-slate-100">
        <div className="flex items-start gap-3">
          <div className="w-8 h-8 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-500 font-black text-sm shrink-0">Q</div>
          <div className="flex-1">
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span className={`text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full ${PILLAR_COLORS[qa.pillar]}`}>{qa.pillar}</span>
              <span className="text-xs text-slate-400">{qa.askedBy}</span>
            </div>
            <p className="text-slate-800 font-semibold text-base leading-relaxed">{qa.q}</p>
          </div>
        </div>
      </div>
      <div className="p-6 bg-slate-50">
        <div className="flex items-start gap-3">
          <div className="w-8 h-8 rounded-full bg-teal-100 border border-teal-200 flex items-center justify-center text-teal-700 font-black text-sm shrink-0">A</div>
          <div className="flex-1">
            <p className="text-xs font-bold text-teal-700 mb-2">{qa.answeredBy}</p>
            <p className="text-slate-700 text-sm leading-relaxed">{qa.a}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

function SubmitForm() {
  const { contactEmail } = useBrand()
  const [name, setName] = useState('')
  const [org, setOrg] = useState('')
  const [pillar, setPillar] = useState('General')
  const [question, setQuestion] = useState('')
  const [isPrivate, setIsPrivate] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const body = [
      `Name: ${name}`,
      `Organization: ${org}`,
      `Pillar: ${pillar}`,
      `Visibility: ${isPrivate ? 'Private (do not publish)' : 'Public (may be added to Q&A library)'}`,
      '',
      'Question:',
      question,
    ].join('\n')

    window.location.href = `mailto:${contactEmail}?subject=${encodeURIComponent(`Ask HTR: ${pillar} Question`)}&body=${encodeURIComponent(body)}`
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div>
          <label className="block text-xs font-black text-slate-700 uppercase tracking-wide mb-1.5">
            Your Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            required
            value={name}
            onChange={e => setName(e.target.value)}
            placeholder="Dr. Jane Smith"
            className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm bg-white text-slate-800 focus:outline-none focus:ring-2 focus:ring-teal-300 focus:border-teal-400"
          />
        </div>
        <div>
          <label className="block text-xs font-black text-slate-700 uppercase tracking-wide mb-1.5">
            Organization <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            required
            value={org}
            onChange={e => setOrg(e.target.value)}
            placeholder="Vermont Department of Health"
            className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm bg-white text-slate-800 focus:outline-none focus:ring-2 focus:ring-teal-300 focus:border-teal-400"
          />
        </div>
      </div>

      <div>
        <label className="block text-xs font-black text-slate-700 uppercase tracking-wide mb-1.5">
          Pillar <span className="text-red-500">*</span>
        </label>
        <div className="flex flex-wrap gap-2">
          {PILLARS.map(p => (
            <button
              key={p}
              type="button"
              onClick={() => setPillar(p)}
              className={`px-3 py-1.5 rounded-full text-xs font-bold border transition-all ${
                pillar === p
                  ? `${PILLAR_COLORS[p]} border-current shadow-sm`
                  : 'bg-white text-slate-500 border-slate-200 hover:border-slate-300'
              }`}
            >
              {p}
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-xs font-black text-slate-700 uppercase tracking-wide mb-1.5">
          Your Question <span className="text-red-500">*</span>
        </label>
        <textarea
          required
          value={question}
          onChange={e => setQuestion(e.target.value)}
          placeholder="Be as specific as possible — include your organization type, state, and any relevant context. The more detail you provide, the more targeted our response will be."
          rows={6}
          className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm bg-white text-slate-800 focus:outline-none focus:ring-2 focus:ring-teal-300 focus:border-teal-400 resize-none"
        />
        <p className="text-xs text-slate-400 mt-1">{question.length} characters</p>
      </div>

      <div>
        <label className="flex items-start gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={isPrivate}
            onChange={e => setIsPrivate(e.target.checked)}
            className="mt-0.5 w-4 h-4 rounded border-slate-300 text-teal-600 focus:ring-teal-300"
          />
          <span className="ty-body text-slate-600 leading-relaxed">
            <span className="font-bold text-slate-800">Mark as private</span> — my question will be answered but not added to the public Q&amp;A library. Use this if your question involves confidential organizational data.
          </span>
        </label>
      </div>

      <div className="pt-2">
        <button
          type="submit"
          disabled={!name || !org || !question}
          className="inline-flex items-center gap-2 px-8 py-3 rounded-xl text-sm font-black text-white bg-teal-600 hover:bg-teal-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors shadow"
        >
          Submit Question via Email →
        </button>
        <p className="text-xs text-slate-400 mt-2">
          Clicking submit will open your email client with your question pre-filled. A named HTR advisor will respond within 48 business hours.
        </p>
      </div>
    </form>
  )
}

export default function AskHTRClient() {
  const searchParams = useSearchParams()
  const isBrowse = searchParams.get('browse') === 'true'

  return (
    <div className="bg-white min-h-screen pb-20">

      {/* HERO */}
      <div className="bg-teal-600 text-white py-16 border-b border-teal-700">
        <div className="container mx-auto px-4 md:px-8 max-w-4xl text-center">
          <span className="text-teal-200 font-bold uppercase tracking-widest text-xs mb-4 block">
            HTR Connect
          </span>
          <div className="text-6xl mb-4">❓</div>
          <h1 className="ty-h1 font-black mb-4 tracking-tight">Ask HTR</h1>
          <p className="ty-hero text-teal-100 max-w-2xl mx-auto leading-relaxed">
            Submit any question on healthcare transformation. A named HTR advisor responds within 48 business hours — not a chatbot, not a junior analyst.
          </p>

          {/* Tab switcher */}
          <div className="flex justify-center gap-3 mt-8">
            <Link
              href="/connect/ask"
              className={`px-6 py-2.5 rounded-xl text-sm font-black transition-colors ${
                !isBrowse
                  ? 'bg-white text-teal-700 shadow'
                  : 'bg-teal-700 text-teal-100 hover:bg-teal-800'
              }`}
            >
              Submit a Question
            </Link>
            <Link
              href="/connect/ask?browse=true"
              className={`px-6 py-2.5 rounded-xl text-sm font-black transition-colors ${
                isBrowse
                  ? 'bg-white text-teal-700 shadow'
                  : 'bg-teal-700 text-teal-100 hover:bg-teal-800'
              }`}
            >
              Browse Q&amp;A Library
            </Link>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-8 mt-12 max-w-5xl">

        {!isBrowse ? (
          /* SUBMIT VIEW */
          <div className="flex flex-col md:flex-row gap-10">

            <div className="flex-1">
              <div className="bg-white border border-slate-200 rounded-2xl p-8 shadow-sm">
                <h2 className="text-2xl font-black text-slate-900 mb-1">Submit a Question</h2>
                <p className="text-slate-500 text-sm mb-8">
                  Complete all required fields. The more context you provide, the more targeted the response will be. Questions are routed to the appropriate practice lead based on the pillar you select.
                </p>
                <SubmitForm />
              </div>
            </div>

            <div className="md:w-72 space-y-5 shrink-0">
              <div className="bg-teal-600 text-white p-6 rounded-xl shadow-lg">
                <h3 className="text-base font-black mb-4 border-b border-teal-500 pb-3">What Happens Next</h3>
                <div className="space-y-4">
                  {[
                    { n: '1', title: 'You send it', body: 'Submitting opens an email to HTR with your question and the pillar you selected.' },
                    { n: '2', title: 'HTR replies', body: 'Questions are read and answered by email, drawing on the book and the platform\'s sources.' },
                    { n: '3', title: 'With your permission', body: 'Anonymized versions of useful questions may be added to the public Q&A library.' },
                  ].map(s => (
                    <div key={s.n} className="flex gap-3">
                      <span className="w-6 h-6 rounded-full bg-white text-teal-700 flex items-center justify-center text-xs font-black shrink-0">{s.n}</span>
                      <div>
                        <p className="text-sm font-bold">{s.title}</p>
                        <p className="text-teal-200 text-xs leading-relaxed">{s.body}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-slate-50 border border-slate-200 rounded-xl p-5">
                <div className="flex gap-3 items-start">
                  <span className="text-xl shrink-0">🔒</span>
                  <div>
                    <h4 className="font-black text-slate-900 text-sm mb-1">Private Questions</h4>
                    <p className="text-slate-500 text-xs leading-relaxed">
                      Check "mark as private" if your question involves confidential data. It will be answered but never published to the Q&A library.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white border border-slate-200 rounded-xl p-5">
                <h4 className="font-black text-slate-900 text-sm mb-3">Q&amp;A Library</h4>
                <p className="text-slate-500 text-xs mb-3 leading-relaxed">Browse 247 previously answered questions, organized by pillar.</p>
                <Link
                  href="/connect/ask?browse=true"
                  className="block w-full text-center py-2 border-2 border-teal-600 text-teal-600 font-black text-xs rounded-lg hover:bg-teal-50 transition-colors"
                >
                  Browse Library →
                </Link>
              </div>

              <div className="bg-white border border-slate-200 rounded-xl p-5">
                <h4 className="font-black text-slate-900 text-sm mb-1">Back to Connect</h4>
                <Link
                  href="/connect?tab=ask"
                  className="block w-full text-center py-2 border border-slate-200 text-slate-600 font-semibold text-xs rounded-lg hover:bg-slate-50 transition-colors mt-3"
                >
                  ← HTR Connect
                </Link>
              </div>
            </div>
          </div>
        ) : (
          /* BROWSE VIEW */
          <div>
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-2xl font-black text-slate-900">Q&amp;A Library</h2>
                <p className="text-slate-500 text-sm mt-1">247 questions answered · organized by pillar · updated continuously</p>
              </div>
              <div className="flex flex-wrap gap-2">
                {Object.entries(PILLAR_COLORS).map(([p, cls]) => (
                  <span key={p} className={`text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded-full ${cls}`}>{p}</span>
                ))}
              </div>
            </div>

            <div className="space-y-6 mb-12">
              {FEATURED_QA.map(qa => <QACard key={qa.id} qa={qa} />)}
            </div>

            <div className="bg-teal-50 border-2 border-teal-200 rounded-2xl p-8 text-center">
              <div className="text-4xl mb-3">📚</div>
              <h3 className="font-black text-teal-800 text-xl mb-2">Searchable Q&amp;A Library</h3>
              <p className="text-teal-700 text-sm max-w-lg mx-auto mb-6 leading-relaxed">
                The full library — 247 answered questions with pillar filters and keyword search —
                launches with the Connect membership program. The three questions above are a
                representative sample of the depth and format. Submit your own question now and
                receive a named expert response within 48 business hours.
              </p>
              <Link
                href="/connect/ask"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-black text-white bg-teal-600 hover:bg-teal-700 transition-colors shadow"
              >
                Submit Your Question →
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
