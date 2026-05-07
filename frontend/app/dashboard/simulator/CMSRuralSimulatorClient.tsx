'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import { CheckCircleIcon, ExclamationTriangleIcon, ArrowTopRightOnSquareIcon } from '@heroicons/react/24/outline'

type PillarKey = 'policy' | 'technology' | 'financial' | 'equity'

interface ParticipatingState {
  id: string
  name: string
  abbr: string
  cahCount: number
  rhtAwardM: number
  ruralPop: number
  medicaidRuralPct: number
  broadbandGapPct: number
  transformationPhase: 'planning' | 'early' | 'active' | 'advanced'
}

interface RHTPRecommendation {
  id: string
  title: string
  category: 'payment' | 'telehealth' | 'workforce' | 'equity' | 'data' | 'capital'
  pillarScores: Record<PillarKey, number>
  implementationComplexity: number
  annualCostM: number
  annualSavingsM: number
  timelineMonths: number
  status: 'required' | 'optional'
}

const STATES: ParticipatingState[] = [
  { id: 'vermont', name: 'Vermont', abbr: 'VT', cahCount: 14, rhtAwardM: 195, ruralPop: 380000, medicaidRuralPct: 38, broadbandGapPct: 12, transformationPhase: 'active' },
  { id: 'montana', name: 'Montana', abbr: 'MT', cahCount: 48, rhtAwardM: 285, ruralPop: 820000, medicaidRuralPct: 32, broadbandGapPct: 28, transformationPhase: 'early' },
  { id: 'south-dakota', name: 'South Dakota', abbr: 'SD', cahCount: 36, rhtAwardM: 220, ruralPop: 560000, medicaidRuralPct: 29, broadbandGapPct: 22, transformationPhase: 'planning' },
  { id: 'wyoming', name: 'Wyoming', abbr: 'WY', cahCount: 24, rhtAwardM: 168, ruralPop: 420000, medicaidRuralPct: 25, broadbandGapPct: 18, transformationPhase: 'early' },
  { id: 'alaska', name: 'Alaska', abbr: 'AK', cahCount: 28, rhtAwardM: 310, ruralPop: 510000, medicaidRuralPct: 44, broadbandGapPct: 42, transformationPhase: 'planning' },
  { id: 'west-virginia', name: 'West Virginia', abbr: 'WV', cahCount: 32, rhtAwardM: 248, ruralPop: 1100000, medicaidRuralPct: 52, broadbandGapPct: 35, transformationPhase: 'early' },
  { id: 'mississippi', name: 'Mississippi', abbr: 'MS', cahCount: 52, rhtAwardM: 340, ruralPop: 1800000, medicaidRuralPct: 58, broadbandGapPct: 31, transformationPhase: 'planning' },
  { id: 'kentucky', name: 'Kentucky', abbr: 'KY', cahCount: 44, rhtAwardM: 280, ruralPop: 1600000, medicaidRuralPct: 46, broadbandGapPct: 24, transformationPhase: 'active' },
]

const RECOMMENDATIONS: RHTPRecommendation[] = [
  { id: 'global-budget-demo', title: 'Rural Global Budget Payment Demonstration', category: 'payment', status: 'required', timelineMonths: 18, pillarScores: { policy: 88, technology: 60, financial: 82, equity: 65 }, implementationComplexity: 72, annualCostM: 45, annualSavingsM: 180 },
  { id: 'essential-hospital', title: 'Essential Hospital Designation & Payment Floor', category: 'payment', status: 'required', timelineMonths: 12, pillarScores: { policy: 85, technology: 50, financial: 78, equity: 72 }, implementationComplexity: 55, annualCostM: 28, annualSavingsM: 120 },
  { id: 'telehealth-infra', title: 'Rural Telehealth Infrastructure Investment', category: 'telehealth', status: 'required', timelineMonths: 24, pillarScores: { policy: 72, technology: 90, financial: 65, equity: 80 }, implementationComplexity: 68, annualCostM: 88, annualSavingsM: 145 },
  { id: 'broadband-rural', title: 'Rural Broadband & Connectivity Program', category: 'telehealth', status: 'required', timelineMonths: 36, pillarScores: { policy: 65, technology: 95, financial: 55, equity: 85 }, implementationComplexity: 80, annualCostM: 140, annualSavingsM: 90 },
  { id: 'workforce-pipeline', title: 'Rural Physician & Nursing Workforce Pipeline', category: 'workforce', status: 'required', timelineMonths: 48, pillarScores: { policy: 70, technology: 45, financial: 60, equity: 88 }, implementationComplexity: 85, annualCostM: 110, annualSavingsM: 85 },
  { id: 'cin-development', title: 'Rural Clinically Integrated Network Development', category: 'payment', status: 'optional', timelineMonths: 30, pillarScores: { policy: 78, technology: 72, financial: 75, equity: 62 }, implementationComplexity: 76, annualCostM: 65, annualSavingsM: 140 },
  { id: 'ai-scribe', title: 'AI Scribe & Administrative Automation', category: 'data', status: 'optional', timelineMonths: 12, pillarScores: { policy: 60, technology: 85, financial: 70, equity: 55 }, implementationComplexity: 45, annualCostM: 32, annualSavingsM: 58 },
  { id: 'sdoh-rural', title: 'Rural SDOH Navigation & Community Health Workers', category: 'equity', status: 'optional', timelineMonths: 18, pillarScores: { policy: 65, technology: 48, financial: 48, equity: 95 }, implementationComplexity: 70, annualCostM: 55, annualSavingsM: 40 },
]

const PILLARS: { key: PillarKey; label: string; color: string }[] = [
  { key: 'policy',     label: 'Policy',     color: 'text-violet-700' },
  { key: 'technology', label: 'Technology', color: 'text-indigo-700' },
  { key: 'financial',  label: 'Financial',  color: 'text-emerald-700' },
  { key: 'equity',     label: 'Equity',     color: 'text-rose-700' },
]

const CAT_LABELS: Record<string, string> = {
  payment: 'Payment Reform', telehealth: 'Telehealth', workforce: 'Workforce',
  equity: 'Equity', data: 'Data & AI', capital: 'Capital',
}

const PHASE_COLORS: Record<string, string> = {
  planning: 'bg-slate-100 text-slate-600',
  early: 'bg-amber-100 text-amber-700',
  active: 'bg-emerald-100 text-emerald-700',
  advanced: 'bg-blue-100 text-blue-700',
}

function ScoreGauge({ score }: { score: number }) {
  const r = 28; const circ = 2 * Math.PI * r; const dash = (score / 100) * circ
  const col = score >= 70 ? '#10b981' : score >= 50 ? '#f59e0b' : '#ef4444'
  return (
    <svg width="68" height="68" viewBox="0 0 68 68">
      <circle cx="34" cy="34" r={r} fill="none" stroke="#e2e8f0" strokeWidth="6" />
      <circle cx="34" cy="34" r={r} fill="none" stroke={col} strokeWidth="6"
        strokeDasharray={`${dash} ${circ - dash}`} strokeLinecap="round" transform="rotate(-90 34 34)" />
      <text x="34" y="39" textAnchor="middle" fontSize="13" fontWeight="800" fill="#0f172a">{score}</text>
    </svg>
  )
}

export default function CMSRuralSimulatorClient() {
  const [selectedRecs, setSelectedRecs] = useState<string[]>(['global-budget-demo', 'essential-hospital', 'telehealth-infra', 'ai-scribe'])
  const [selectedState, setSelectedState] = useState('vermont')
  const [activeTab, setActiveTab] = useState<'scenario' | 'states' | 'timeline'>('scenario')

  const toggle = (id: string) =>
    setSelectedRecs(p => p.includes(id) ? p.filter(r => r !== id) : [...p, id])

  const selected = RECOMMENDATIONS.filter(r => selectedRecs.includes(r.id))
  const state = STATES.find(s => s.id === selectedState)!

  const pillarScores = useMemo((): Record<PillarKey, number> => {
    if (!selected.length) return { policy: 0, technology: 0, financial: 0, equity: 0 }
    return Object.fromEntries(
      (['policy', 'technology', 'financial', 'equity'] as PillarKey[]).map(k => [
        k, Math.round(selected.reduce((s, r) => s + r.pillarScores[k], 0) / selected.length)
      ])
    ) as Record<PillarKey, number>
  }, [selectedRecs])

  const totalCostM = selected.reduce((s, r) => s + r.annualCostM, 0)
  const totalSavingsM = selected.reduce((s, r) => s + r.annualSavingsM, 0)
  const netM = totalSavingsM - totalCostM
  const maxTimeline = selected.length ? Math.max(...selected.map(r => r.timelineMonths)) : 0
  const totalRHTPool = STATES.reduce((s, st) => s + st.rhtAwardM, 0)
  const stateImpactM = state ? (netM * state.rhtAwardM) / totalRHTPool : 0

  return (
    <div className="min-h-screen bg-white">
      <div className="bg-slate-50 border-b border-slate-200">
        <div className="max-w-5xl mx-auto px-6 py-10">
          <div className="flex items-center gap-3 mb-4 flex-wrap">
            <Link href="/htr-simulator" className="text-xs font-bold text-slate-500 hover:text-slate-800 transition-colors">← HTR Simulator</Link>
            <span className="text-slate-300">/</span>
            <span className="text-[10px] font-black uppercase tracking-widest text-rose-600 bg-rose-50 border border-rose-200 px-2.5 py-1 rounded">US · National</span>
          </div>
          <h1 className="text-3xl font-black text-slate-900 mb-3 leading-tight">CMS Rural Health Transformation Simulator</h1>
          <p className="text-slate-600 max-w-2xl text-sm leading-relaxed mb-6">
            Model the multi-pillar impact of CMS&apos;s $50B Rural Health Transformation Program — global budget
            demonstrations, essential hospital designations, telehealth infrastructure, and payment reforms
            across 12 participating states and 1,300+ critical access hospitals.
          </p>
          <div className="flex flex-wrap gap-3">
            {[['12', 'Participating States'], ['1,300+', 'CAHs Modeled'], ['$1.8B', 'Program Budget'], ['$50B', 'H.R. 1 Authorization']].map(([v, l]) => (
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
          {(['scenario', 'states', 'timeline'] as const).map(tab => (
            <button key={tab} onClick={() => setActiveTab(tab)}
              className={`px-5 py-2.5 text-sm font-bold capitalize border-b-2 -mb-px transition-all ${
                activeTab === tab ? 'border-rose-600 text-rose-700' : 'border-transparent text-slate-500 hover:text-slate-700'
              }`}>
              {tab === 'scenario' ? 'Scenario Builder' : tab === 'states' ? 'State Explorer' : 'Timeline'}
            </button>
          ))}
        </div>

        {activeTab === 'scenario' && (
          <div className="grid lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-3">
              <h2 className="text-base font-black text-slate-900 mb-4">Select RHTP Initiatives</h2>
              {RECOMMENDATIONS.map(rec => {
                const isSel = selectedRecs.includes(rec.id)
                return (
                  <button key={rec.id} onClick={() => toggle(rec.id)}
                    className={`w-full text-left p-4 rounded-xl border-2 transition-all ${isSel ? 'border-rose-500 bg-rose-50' : 'border-slate-200 hover:border-slate-300 bg-white'}`}>
                    <div className="flex items-start gap-3">
                      <div className={`w-5 h-5 rounded mt-0.5 shrink-0 border-2 flex items-center justify-center ${isSel ? 'bg-rose-600 border-rose-600' : 'border-slate-300'}`}>
                        {isSel && <CheckCircleIcon className="w-3.5 h-3.5 text-white" />}
                      </div>
                      <div className="flex-1">
                        <div className="flex flex-wrap items-center gap-2 mb-1">
                          <span className="text-sm font-black text-slate-900">{rec.title}</span>
                          <span className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase ${rec.status === 'required' ? 'bg-rose-100 text-rose-700' : 'bg-slate-100 text-slate-600'}`}>{rec.status}</span>
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-rose-50 text-rose-700">{CAT_LABELS[rec.category]}</span>
                        </div>
                        <div className="flex flex-wrap gap-3 text-[11px] text-slate-500">
                          <span>Cost: <span className="font-bold text-slate-700">${rec.annualCostM}M/yr</span></span>
                          <span>Savings: <span className="font-bold text-emerald-700">${rec.annualSavingsM}M/yr</span></span>
                          <span>Timeline: <span className="font-bold">{rec.timelineMonths} mo</span></span>
                          <span>Complexity: <span className="font-bold text-amber-700">{rec.implementationComplexity}/100</span></span>
                        </div>
                      </div>
                    </div>
                  </button>
                )
              })}
            </div>

            <div className="space-y-4">
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5">
                <h3 className="text-xs font-black uppercase tracking-wider text-slate-500 mb-4">Pillar Scores</h3>
                <div className="grid grid-cols-2 gap-4">
                  {PILLARS.map(p => (
                    <div key={p.key} className="flex flex-col items-center gap-1">
                      <ScoreGauge score={pillarScores[p.key]} />
                      <span className={`text-[10px] font-bold ${p.color}`}>{p.label}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-white border border-slate-200 rounded-2xl p-5 space-y-3 text-sm">
                <h3 className="text-xs font-black uppercase tracking-wider text-slate-500 mb-2">Financial Summary</h3>
                <div className="flex justify-between"><span className="text-slate-600">Annual Cost</span><span className="font-black text-rose-700">${totalCostM}M</span></div>
                <div className="flex justify-between"><span className="text-slate-600">Annual Savings</span><span className="font-black text-emerald-700">${totalSavingsM}M</span></div>
                <div className="border-t border-slate-100 pt-3 flex justify-between">
                  <span className="font-bold">Net Impact</span>
                  <span className={`font-black ${netM >= 0 ? 'text-emerald-700' : 'text-rose-700'}`}>{netM >= 0 ? '+' : ''}${netM}M</span>
                </div>
                <div className="flex justify-between"><span className="text-slate-600">Full Implementation</span><span className="font-bold">{maxTimeline} months</span></div>
              </div>
              {!selected.length && (
                <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex gap-2">
                  <ExclamationTriangleIcon className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                  <p className="text-xs text-amber-800">Select initiatives to see scores.</p>
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === 'states' && (
          <div className="space-y-4">
            <div className="flex flex-wrap gap-2 mb-4">
              {STATES.map(s => (
                <button key={s.id} onClick={() => setSelectedState(s.id)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold border transition-all ${selectedState === s.id ? 'bg-rose-600 text-white border-rose-600' : 'bg-white text-slate-600 border-slate-200 hover:border-rose-300'}`}>
                  {s.abbr} — {s.name}
                </button>
              ))}
            </div>

            <div className="bg-white border border-slate-200 rounded-2xl p-6">
              <div className="flex flex-wrap justify-between gap-4 mb-6">
                <div>
                  <h2 className="text-xl font-black text-slate-900">{state.name}</h2>
                  <p className="text-sm text-slate-500">{state.cahCount} critical access hospitals · {(state.ruralPop / 1000).toFixed(0)}K rural residents</p>
                </div>
                <span className={`px-3 py-1.5 rounded-lg text-xs font-bold capitalize self-start ${PHASE_COLORS[state.transformationPhase]}`}>
                  {state.transformationPhase} phase
                </span>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
                {[
                  { v: `$${state.rhtAwardM}M`, l: 'RHT Award' },
                  { v: `${state.cahCount}`, l: 'Critical Access Hospitals' },
                  { v: `${state.medicaidRuralPct}%`, l: 'Rural Medicaid Rate' },
                  { v: `${state.broadbandGapPct}%`, l: 'Broadband Gap' },
                ].map(({ v, l }) => (
                  <div key={l} className="bg-slate-50 rounded-xl p-3 text-center border border-slate-100">
                    <div className="text-lg font-black text-slate-900">{v}</div>
                    <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wide">{l}</div>
                  </div>
                ))}
              </div>

              <div className="bg-rose-50 border border-rose-200 rounded-xl p-4">
                <div className="text-sm font-bold text-rose-900 mb-1">Scenario Impact on {state.name}</div>
                <p className="text-xs text-rose-800 leading-relaxed">
                  Under this scenario, {state.name} is projected to realize a net financial impact of{' '}
                  <span className="font-black">{stateImpactM >= 0 ? '+' : ''}${stateImpactM.toFixed(1)}M annually</span> — scaled by
                  this state&apos;s RHT award share.
                  {state.broadbandGapPct > 25 && ` Broadband gap of ${state.broadbandGapPct}% makes connectivity investment a prerequisite for effective telehealth deployment.`}
                  {state.transformationPhase === 'planning' && ' This state is in the planning phase — implementation timelines may extend beyond standard projections.'}
                </p>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'timeline' && (
          <div className="space-y-4">
            <h2 className="text-base font-black text-slate-900 mb-4">Implementation Roadmap</h2>
            {!selected.length ? (
              <div className="bg-amber-50 border border-amber-200 rounded-xl p-6 text-center text-sm text-amber-800">
                Select initiatives in the Scenario Builder to see the timeline.
              </div>
            ) : (
              <>
                {selected.sort((a, b) => a.timelineMonths - b.timelineMonths).map(rec => {
                  const w = (rec.timelineMonths / maxTimeline) * 100
                  return (
                    <div key={rec.id}>
                      <div className="flex justify-between mb-1">
                        <span className="text-xs font-bold text-slate-700">{rec.title}</span>
                        <span className="text-[11px] text-slate-400">{rec.timelineMonths} mo</span>
                      </div>
                      <div className="h-6 bg-slate-100 rounded-full overflow-hidden">
                        <div className="h-full rounded-full bg-rose-500 flex items-center px-2" style={{ width: `${w}%` }}>
                          <span className="text-[10px] font-bold text-white whitespace-nowrap overflow-hidden">{CAT_LABELS[rec.category]}</span>
                        </div>
                      </div>
                    </div>
                  )
                })}
                <div className="flex justify-between text-[10px] text-slate-400 mt-2">
                  <span>Month 0</span><span>Month {maxTimeline}</span>
                </div>
                <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 mt-4">
                  <h3 className="font-black text-lg text-slate-900 mb-3">Scenario Summary</h3>
                  <div className="grid md:grid-cols-3 gap-4 text-sm">
                    <div><div className="text-slate-500 text-xs mb-1">Initiatives</div><div className="font-black text-xl text-slate-900">{selected.length}</div></div>
                    <div><div className="text-slate-500 text-xs mb-1">Full Implementation</div><div className="font-black text-xl text-slate-900">{maxTimeline} months</div></div>
                    <div><div className="text-slate-500 text-xs mb-1">Net Annual Impact</div><div className={`font-black text-xl ${netM >= 0 ? 'text-emerald-700' : 'text-rose-700'}`}>{netM >= 0 ? '+' : ''}${netM}M</div></div>
                  </div>
                </div>
              </>
            )}
          </div>
        )}

        <div className="mt-12 pt-8 border-t border-slate-200 flex flex-wrap gap-3">
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
