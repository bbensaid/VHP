'use client'

// Rebuilt 2026-10-17. The earlier version modelled "12 participating states", a "$1.8B program budget" and
// invented per-initiative costs, savings, pillar scores and state metrics. All 50 states were awarded; the
// figures below are CMS's own (press release, December 29, 2025; book-audit/deep/sources/cms_rht_fy26_awards.json).

import { useMemo, useState } from 'react'
import Link from 'next/link'
import { ArrowTopRightOnSquareIcon } from '@heroicons/react/24/outline'

const SOURCE_URL = 'https://www.cms.gov/newsroom/press-releases/cms-announces-50-billion-awards-strengthen-rural-health-all-50-states'

// FY2026 awards, CMS, December 29, 2025. Sum: $10,000,000,003.
const AWARDS: { name: string; award: number }[] = [
  { name: "Alaska", award: 272174856 },
  { name: "Alabama", award: 203404327 },
  { name: "Arizona", award: 166988956 },
  { name: "Arkansas", award: 208779396 },
  { name: "California", award: 233639308 },
  { name: "Colorado", award: 200105604 },
  { name: "Connecticut", award: 154249106 },
  { name: "Delaware", award: 157394964 },
  { name: "Florida", award: 209938195 },
  { name: "Georgia", award: 218862170 },
  { name: "Hawaii", award: 188892440 },
  { name: "Idaho", award: 185974368 },
  { name: "Illinois", award: 193418216 },
  { name: "Indiana", award: 206927897 },
  { name: "Iowa", award: 209040064 },
  { name: "Kansas", award: 221898008 },
  { name: "Kentucky", award: 212905591 },
  { name: "Louisiana", award: 208374448 },
  { name: "Maine", award: 190008051 },
  { name: "Maryland", award: 168180838 },
  { name: "Massachusetts", award: 162005238 },
  { name: "Michigan", award: 173128201 },
  { name: "Minnesota", award: 193090618 },
  { name: "Mississippi", award: 205907220 },
  { name: "Missouri", award: 216276818 },
  { name: "Montana", award: 233509359 },
  { name: "Nebraska", award: 218529075 },
  { name: "Nevada", award: 179931608 },
  { name: "New Hampshire", award: 204016550 },
  { name: "New Jersey", award: 147250806 },
  { name: "New Mexico", award: 211484741 },
  { name: "New York", award: 212058208 },
  { name: "North Carolina", award: 213008356 },
  { name: "North Dakota", award: 198936970 },
  { name: "Ohio", award: 202030262 },
  { name: "Oklahoma", award: 223476949 },
  { name: "Oregon", award: 197271578 },
  { name: "Pennsylvania", award: 193294054 },
  { name: "Rhode Island", award: 156169931 },
  { name: "South Carolina", award: 200030252 },
  { name: "South Dakota", award: 189477607 },
  { name: "Tennessee", award: 206888882 },
  { name: "Texas", award: 281319361 },
  { name: "Utah", award: 195743566 },
  { name: "Vermont", award: 195053740 },
  { name: "Virginia", award: 189544888 },
  { name: "Washington", award: 181257515 },
  { name: "West Virginia", award: 199476099 },
  { name: "Wisconsin", award: 203670005 },
  { name: "Wyoming", award: 205004743 },
]

// Public Law 119-21: half of each year's $10B is split equally among approved states, half by CMS's scoring factors.
const EQUAL_SHARE = 10_000_000_000 / 2 / 50

// CMS's own summary of what states are planning (same press release).
const PRIORITIES = [
  { title: 'Bring more care within reach', body: 'Preventive, primary, maternal and behavioral health services; new access points; chronic disease prevention; EMS communication, treat-in-place and coordinated transfers.' },
  { title: 'Strengthen the rural clinical workforce', body: 'Training, residencies, recruitment and retention incentives, and pathways for students to start health careers in their own communities.' },
  { title: 'Modernize infrastructure and technology', body: 'Facilities and equipment; cybersecurity and interoperability; telehealth, remote patient monitoring and digital tools; AI scribes and workflow tools.' },
  { title: 'Structural efficiency and community providers', body: 'Streamlined operations, hub-and-spoke models, rural regional centers of excellence, data-sharing platforms and rural clinically integrated networks.' },
  { title: 'Innovative care models and payment reform', body: 'New primary care and value-based care models, partnerships among rural and other providers, and regional collaboration.' },
]

const usdM = (n: number) => `$${(n / 1e6).toFixed(1)}M`

export default function CMSRuralSimulatorClient() {
  const [selected, setSelected] = useState('Vermont')
  const [tab, setTab] = useState<'awards' | 'priorities'>('awards')

  const ranked = useMemo(() => [...AWARDS].sort((a, b) => b.award - a.award), [])
  const state = AWARDS.find((s) => s.name === selected)!
  const rank = ranked.findIndex((s) => s.name === selected) + 1
  const max = ranked[0].award

  return (
    <div className="min-h-screen bg-white">
      <div className="bg-slate-50 border-b border-slate-200">
        <div className="max-w-5xl mx-auto px-6 py-10">
          <div className="flex items-center gap-3 mb-4 flex-wrap">
            <Link href="/htr-simulator" className="text-xs font-bold text-slate-500 hover:text-slate-800 transition-colors">← HTR Simulator</Link>
            <span className="text-slate-300">/</span>
            <span className="text-[10px] font-black uppercase tracking-widest text-rose-600 bg-rose-50 border border-rose-200 px-2.5 py-1 rounded">US · National</span>
          </div>
          <h1 className="text-3xl font-black text-slate-900 mb-3 leading-tight">Rural Health Transformation Program — State Awards</h1>
          <p className="text-slate-600 max-w-2xl text-sm leading-relaxed mb-6">
            The $50 billion federal program created by Public Law 119-21 (H.R. 1) pays out $10 billion a year from 2026
            through 2030. CMS awarded all 50 states for FY2026: half of the money split equally, half by CMS&apos;s scoring
            of rurality, state policy actions and the strength of each plan. Later years&apos; awards are set annually.
          </p>
          <div className="flex flex-wrap gap-3">
            {[['$50B', 'FY2026–2030'], ['$10B', 'Per year'], ['50', 'States awarded'], ['$147M–$281M', 'FY2026 range']].map(([v, l]) => (
              <div key={l} className="bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-center">
                <div className="text-lg font-black text-slate-900">{v}</div>
                <div className="text-[11px] text-slate-500">{l}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-10">
        <div className="flex gap-2 mb-8 border-b border-slate-200">
          {(['awards', 'priorities'] as const).map((t) => (
            <button key={t} onClick={() => setTab(t)}
              className={`px-5 py-2.5 text-sm font-bold border-b-2 -mb-px transition-all ${tab === t ? 'border-rose-600 text-rose-700' : 'border-transparent text-slate-500 hover:text-slate-700'}`}>
              {t === 'awards' ? 'State Awards' : 'What States Are Funding'}
            </button>
          ))}
        </div>

        {tab === 'awards' && (
          <div className="grid lg:grid-cols-3 gap-6">
            <div className="lg:col-span-1">
              <label className="text-xs font-black uppercase tracking-wider text-slate-500" htmlFor="rht-state">State</label>
              <select id="rht-state" value={selected} onChange={(e) => setSelected(e.target.value)}
                className="mt-2 w-full border border-slate-300 rounded-lg px-3 py-2 text-sm">
                {AWARDS.map((s) => <option key={s.name} value={s.name}>{s.name}</option>)}
              </select>
              <div className="mt-4 bg-rose-50 border border-rose-200 rounded-xl p-4 space-y-2 text-sm">
                <div className="flex justify-between"><span className="text-slate-600">FY2026 award</span><span className="font-black text-slate-900">{usdM(state.award)}</span></div>
                <div className="flex justify-between"><span className="text-slate-600">Rank of 50</span><span className="font-bold">{rank}</span></div>
                <div className="flex justify-between"><span className="text-slate-600">Equal share</span><span className="font-bold">{usdM(EQUAL_SHARE)}</span></div>
                <div className="flex justify-between"><span className="text-slate-600">Scored share</span><span className="font-bold">{usdM(state.award - EQUAL_SHARE)}</span></div>
              </div>
              <p className="text-[11px] text-slate-500 mt-3 leading-relaxed">
                Equal share = half of $10B divided among 50 states. Scored share = the rest of the state&apos;s award.
              </p>
            </div>
            <div className="lg:col-span-2 space-y-1.5">
              {ranked.map((s, i) => (
                <button key={s.name} onClick={() => setSelected(s.name)} className="w-full flex items-center gap-3 text-left">
                  <span className="w-6 text-[11px] text-slate-400 text-right">{i + 1}</span>
                  <span className={`w-32 text-xs ${s.name === selected ? 'font-black text-rose-700' : 'text-slate-700'}`}>{s.name}</span>
                  <span className="flex-1 h-3 bg-slate-100 rounded">
                    <span className={`block h-3 rounded ${s.name === selected ? 'bg-rose-600' : 'bg-slate-400'}`} style={{ width: `${(s.award / max) * 100}%` }} />
                  </span>
                  <span className="w-16 text-[11px] text-slate-600 text-right">{usdM(s.award)}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {tab === 'priorities' && (
          <div className="grid md:grid-cols-2 gap-4">
            {PRIORITIES.map((p) => (
              <div key={p.title} className="bg-white border border-slate-200 rounded-xl p-5">
                <div className="text-sm font-black text-slate-900 mb-1">{p.title}</div>
                <p className="text-xs text-slate-600 leading-relaxed">{p.body}</p>
              </div>
            ))}
          </div>
        )}

        <p className="text-[11px] text-slate-400 mt-8">
          Source: <a href={SOURCE_URL} target="_blank" rel="noopener noreferrer" className="underline">CMS, &quot;CMS Announces $50 Billion in Awards to Strengthen Rural Health in All 50 States,&quot; December 29, 2025</a>.
        </p>

        <div className="mt-8 pt-8 border-t border-slate-200 flex flex-wrap gap-3 pb-16">
          <Link href="/vermont-rht-program" className="flex items-center gap-1.5 text-xs font-bold text-rose-700 bg-rose-50 border border-rose-200 px-3 py-1.5 rounded-lg hover:bg-rose-100 transition-colors">
            Vermont RHT Program <ArrowTopRightOnSquareIcon className="w-3.5 h-3.5" />
          </Link>
          <Link href="/htr-simulator" className="flex items-center gap-1.5 text-xs font-bold text-slate-600 bg-slate-100 border border-slate-200 px-3 py-1.5 rounded-lg hover:bg-slate-200 transition-colors">
            ← All Simulators
          </Link>
          <Link href="/research-lab/policy-quality?tab=hr1-cliff" className="flex items-center gap-1.5 text-xs font-bold text-slate-600 bg-slate-100 border border-slate-200 px-3 py-1.5 rounded-lg hover:bg-slate-200 transition-colors">
            H.R. 1 Cliff Scenario
          </Link>
        </div>
      </div>
    </div>
  )
}
