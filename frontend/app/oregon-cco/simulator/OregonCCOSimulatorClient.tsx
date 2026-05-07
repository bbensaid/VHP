'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import { CheckCircleIcon, ExclamationTriangleIcon, ArrowTopRightOnSquareIcon } from '@heroicons/react/24/outline'

type PillarKey = 'policy' | 'financial' | 'equity' | 'clinical'

interface CCO {
  id: string
  name: string
  shortName: string
  region: string
  members: number
  counties: number
  globalBudgetM: number
  operatingMarginPct: number
  bhIntegrationScore: number  // 0-100
  equityScore: number         // 0-100
  ruralPct: number            // % rural members
}

interface CCORecommendation {
  id: string
  title: string
  category: 'global-budget' | 'equity' | 'bh' | 'chw' | 'data' | 'payment'
  pillarScores: Record<PillarKey, number>
  implementationComplexity: number
  annualCostM: number
  annualSavingsM: number
  timelineMonths: number
  status: 'required' | 'optional'
}

const CCOS: CCO[] = [
  { id: 'health-share', name: 'Health Share of Oregon', shortName: 'Health Share', region: 'Portland Metro', members: 410000, counties: 9, globalBudgetM: 940, operatingMarginPct: 1.8, bhIntegrationScore: 78, equityScore: 72, ruralPct: 4 },
  { id: 'pacific-source', name: 'PacificSource Community Solutions', shortName: 'PacificSource', region: 'Central Oregon', members: 95000, counties: 7, globalBudgetM: 218, operatingMarginPct: 2.1, bhIntegrationScore: 65, equityScore: 60, ruralPct: 42 },
  { id: 'willamette', name: 'Willamette Valley Community Health', shortName: 'WVCH', region: 'Mid-Willamette', members: 115000, counties: 5, globalBudgetM: 264, operatingMarginPct: 1.4, bhIntegrationScore: 70, equityScore: 65, ruralPct: 28 },
  { id: 'allcare', name: 'AllCare Health', shortName: 'AllCare', region: 'Southern Oregon', members: 48000, counties: 3, globalBudgetM: 110, operatingMarginPct: 0.9, bhIntegrationScore: 55, equityScore: 58, ruralPct: 55 },
  { id: 'eastern', name: 'Eastern Oregon CCO', shortName: 'Eastern OR', region: 'Eastern Oregon', members: 44000, counties: 12, globalBudgetM: 101, operatingMarginPct: -0.4, bhIntegrationScore: 42, equityScore: 52, ruralPct: 71 },
  { id: 'umpqua', name: 'Umpqua Health Alliance', shortName: 'Umpqua', region: 'Douglas County', members: 32000, counties: 1, globalBudgetM: 73, operatingMarginPct: 1.2, bhIntegrationScore: 60, equityScore: 63, ruralPct: 38 },
]

const RECOMMENDATIONS: CCORecommendation[] = [
  { id: 'equity-metrics', title: 'Enhanced Equity Performance Metrics (25 new measures)', category: 'equity', status: 'required', timelineMonths: 12, pillarScores: { policy: 80, financial: 55, equity: 95, clinical: 70 }, implementationComplexity: 65, annualCostM: 28, annualSavingsM: 15 },
  { id: 'bh-integration', title: 'Full Physical-Behavioral-Oral Health Integration', category: 'bh', status: 'required', timelineMonths: 36, pillarScores: { policy: 75, financial: 60, equity: 80, clinical: 90 }, implementationComplexity: 88, annualCostM: 145, annualSavingsM: 210 },
  { id: 'chw-workforce', title: 'Statewide CHW Workforce Infrastructure', category: 'chw', status: 'required', timelineMonths: 24, pillarScores: { policy: 70, financial: 50, equity: 92, clinical: 75 }, implementationComplexity: 72, annualCostM: 88, annualSavingsM: 65 },
  { id: 'global-budget-reform', title: 'GDP+0.5% Global Budget Growth Methodology', category: 'global-budget', status: 'required', timelineMonths: 12, pillarScores: { policy: 85, financial: 78, equity: 60, clinical: 65 }, implementationComplexity: 55, annualCostM: 12, annualSavingsM: 180 },
  { id: 'downside-risk', title: 'Downside Risk for Large CCOs (≥100K members)', category: 'payment', status: 'required', timelineMonths: 18, pillarScores: { policy: 88, financial: 70, equity: 55, clinical: 60 }, implementationComplexity: 70, annualCostM: 8, annualSavingsM: 95 },
  { id: 'rural-equity', title: 'Rural & Frontier CCO Equity Strategy', category: 'equity', status: 'optional', timelineMonths: 24, pillarScores: { policy: 65, financial: 40, equity: 98, clinical: 68 }, implementationComplexity: 80, annualCostM: 55, annualSavingsM: 30 },
  { id: 'sdoh-screening', title: 'Universal SDOH Screening (80% primary care target)', category: 'chw', status: 'required', timelineMonths: 18, pillarScores: { policy: 72, financial: 48, equity: 88, clinical: 78 }, implementationComplexity: 62, annualCostM: 42, annualSavingsM: 58 },
  { id: 'data-platform', title: 'Shared CCO Data & Analytics Platform', category: 'data', status: 'optional', timelineMonths: 30, pillarScores: { policy: 68, financial: 72, equity: 65, clinical: 85 }, implementationComplexity: 58, annualCostM: 65, annualSavingsM: 90 },
]

const PILLARS: { key: PillarKey; label: string; color: string }[] = [
  { key: 'policy',    label: 'Policy',    color: 'text-violet-700' },
  { key: 'financial', label: 'Financial', color: 'text-emerald-700' },
  { key: 'equity',    label: 'Equity',    color: 'text-rose-700' },
  { key: 'clinical',  label: 'Clinical',  color: 'text-amber-700' },
]

const CAT_LABELS: Record<string, string> = {
  'global-budget': 'Global Budget', equity: 'Equity', bh: 'Behavioral Health',
  chw: 'CHW', data: 'Data', payment: 'Payment',
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

export default function OregonCCOSimulatorClient() {
  const [selectedRecs, setSelectedRecs] = useState<string[]>(['equity-metrics', 'global-budget-reform', 'bh-integration', 'sdoh-screening'])
  const [selectedCCO, setSelectedCCO] = useState('health-share')
  const [activeTab, setActiveTab] = useState<'scenario' | 'ccos' | 'timeline'>('scenario')

  const toggle = (id: string) =>
    setSelectedRecs(p => p.includes(id) ? p.filter(r => r !== id) : [...p, id])

  const selected = RECOMMENDATIONS.filter(r => selectedRecs.includes(r.id))
  const cco = CCOS.find(c => c.id === selectedCCO)!

  const pillarScores = useMemo((): Record<PillarKey, number> => {
    if (!selected.length) return { policy: 0, financial: 0, equity: 0, clinical: 0 }
    return Object.fromEntries(
      (['policy', 'financial', 'equity', 'clinical'] as PillarKey[]).map(k => [
        k, Math.round(selected.reduce((s, r) => s + r.pillarScores[k], 0) / selected.length)
      ])
    ) as Record<PillarKey, number>
  }, [selectedRecs])

  const totalCostM = selected.reduce((s, r) => s + r.annualCostM, 0)
  const totalSavingsM = selected.reduce((s, r) => s + r.annualSavingsM, 0)
  const netM = totalSavingsM - totalCostM
  const maxTimeline = selected.length ? Math.max(...selected.map(r => r.timelineMonths)) : 0
  const ccoImpactM = cco ? (netM * cco.globalBudgetM) / 3200 : 0

  return (
    <div className="min-h-screen bg-white">
      <div className="bg-slate-50 border-b border-slate-200">
        <div className="max-w-5xl mx-auto px-6 py-10">
          <div className="flex items-center gap-3 mb-4 flex-wrap">
            <Link href="/htr-simulator" className="text-xs font-bold text-slate-500 hover:text-slate-800 transition-colors">← HTR Simulator</Link>
            <span className="text-slate-300">/</span>
            <span className="text-[10px] font-black uppercase tracking-widest text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded">OR · Oregon</span>
          </div>
          <h1 className="text-3xl font-black text-slate-900 mb-3 leading-tight">Oregon CCO 3.0 Simulator</h1>
          <p className="text-slate-600 max-w-2xl text-sm leading-relaxed mb-6">
            Model the impact of Oregon&apos;s third-generation Coordinated Care Organizations — integrating physical,
            behavioral, and oral health under global budgets with equity accountability and CHW infrastructure
            across 16 CCOs serving 1.4M OHP members.
          </p>
          <div className="flex flex-wrap gap-3">
            {[['16', 'CCOs'], ['1.4M', 'OHP Members'], ['$3.2B', 'Global Budget'], ['36', 'Counties']].map(([v, l]) => (
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
          {(['scenario', 'ccos', 'timeline'] as const).map(tab => (
            <button key={tab} onClick={() => setActiveTab(tab)}
              className={`px-5 py-2.5 text-sm font-bold capitalize border-b-2 -mb-px transition-all ${
                activeTab === tab ? 'border-emerald-600 text-emerald-700' : 'border-transparent text-slate-500 hover:text-slate-700'
              }`}>
              {tab === 'scenario' ? 'Scenario Builder' : tab === 'ccos' ? 'CCO Explorer' : 'Timeline'}
            </button>
          ))}
        </div>

        {activeTab === 'scenario' && (
          <div className="grid lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-3">
              <h2 className="text-base font-black text-slate-900 mb-4">Select CCO 3.0 Initiatives</h2>
              {RECOMMENDATIONS.map(rec => {
                const isSel = selectedRecs.includes(rec.id)
                return (
                  <button key={rec.id} onClick={() => toggle(rec.id)}
                    className={`w-full text-left p-4 rounded-xl border-2 transition-all ${isSel ? 'border-emerald-500 bg-emerald-50' : 'border-slate-200 hover:border-slate-300 bg-white'}`}>
                    <div className="flex items-start gap-3">
                      <div className={`w-5 h-5 rounded mt-0.5 shrink-0 border-2 flex items-center justify-center ${isSel ? 'bg-emerald-600 border-emerald-600' : 'border-slate-300'}`}>
                        {isSel && <CheckCircleIcon className="w-3.5 h-3.5 text-white" />}
                      </div>
                      <div className="flex-1">
                        <div className="flex flex-wrap items-center gap-2 mb-1">
                          <span className="text-sm font-black text-slate-900">{rec.title}</span>
                          <span className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase ${rec.status === 'required' ? 'bg-rose-100 text-rose-700' : 'bg-slate-100 text-slate-600'}`}>{rec.status}</span>
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-50 text-emerald-700">{CAT_LABELS[rec.category]}</span>
                        </div>
                        <div className="flex flex-wrap gap-3 text-[11px] text-slate-500">
                          <span>Cost: <span className="font-bold text-slate-700">${rec.annualCostM}M/yr</span></span>
                          <span>Savings: <span className="font-bold text-emerald-700">${rec.annualSavingsM}M/yr</span></span>
                          <span>Timeline: <span className="font-bold">{rec.timelineMonths} mo</span></span>
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
                  <span className="font-bold text-slate-700">Net Impact</span>
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

        {activeTab === 'ccos' && (
          <div className="space-y-4">
            <div className="flex flex-wrap gap-2 mb-4">
              {CCOS.map(c => (
                <button key={c.id} onClick={() => setSelectedCCO(c.id)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold border transition-all ${selectedCCO === c.id ? 'bg-emerald-600 text-white border-emerald-600' : 'bg-white text-slate-600 border-slate-200 hover:border-emerald-300'}`}>
                  {c.shortName}
                </button>
              ))}
            </div>
            <div className="bg-white border border-slate-200 rounded-2xl p-6">
              <div className="flex flex-wrap justify-between gap-4 mb-6">
                <div>
                  <h2 className="text-xl font-black text-slate-900">{cco.name}</h2>
                  <p className="text-sm text-slate-500">{cco.region} · {cco.counties} {cco.counties === 1 ? 'county' : 'counties'} · {cco.ruralPct}% rural members</p>
                </div>
                <span className={`px-3 py-1.5 rounded-lg text-xs font-bold self-start ${cco.operatingMarginPct >= 1 ? 'bg-emerald-100 text-emerald-700' : cco.operatingMarginPct >= 0 ? 'bg-amber-100 text-amber-700' : 'bg-rose-100 text-rose-700'}`}>
                  {cco.operatingMarginPct >= 0 ? '+' : ''}{cco.operatingMarginPct}% margin
                </span>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
                {[
                  { v: (cco.members / 1000).toFixed(0) + 'K', l: 'OHP Members' },
                  { v: `$${cco.globalBudgetM}M`, l: 'Global Budget' },
                  { v: `${cco.bhIntegrationScore}%`, l: 'BH Integration' },
                  { v: `${cco.equityScore}/100`, l: 'Equity Score' },
                ].map(({ v, l }) => (
                  <div key={l} className="bg-slate-50 rounded-xl p-3 text-center border border-slate-100">
                    <div className="text-lg font-black text-slate-900">{v}</div>
                    <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wide">{l}</div>
                  </div>
                ))}
              </div>
              <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4">
                <div className="text-sm font-bold text-emerald-900 mb-1">Scenario Impact on {cco.shortName}</div>
                <p className="text-xs text-emerald-800 leading-relaxed">
                  Under this scenario, {cco.name} is projected to realize a net financial impact of{' '}
                  <span className="font-black">{ccoImpactM >= 0 ? '+' : ''}${ccoImpactM.toFixed(1)}M annually</span> — scaled by
                  this CCO&apos;s share of Oregon&apos;s statewide global budget.
                  BH integration score of {cco.bhIntegrationScore}% suggests {cco.bhIntegrationScore >= 70 ? 'good' : cco.bhIntegrationScore >= 50 ? 'moderate' : 'limited'} readiness
                  for full physical-behavioral integration by 2027.
                  {cco.ruralPct > 40 && ` With ${cco.ruralPct}% rural members, rural equity strategy investment is strongly recommended.`}
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
                        <div className="h-full rounded-full bg-emerald-500 flex items-center px-2" style={{ width: `${w}%` }}>
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
          <Link href="/oregon-cco" className="flex items-center gap-1.5 text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-3 py-1.5 rounded-lg hover:bg-emerald-100 transition-colors">
            Oregon CCO Overview <ArrowTopRightOnSquareIcon className="w-3.5 h-3.5" />
          </Link>
          <Link href="/htr-simulator" className="flex items-center gap-1.5 text-xs font-bold text-slate-600 bg-slate-100 border border-slate-200 px-3 py-1.5 rounded-lg hover:bg-slate-200 transition-colors">
            ← All Simulators
          </Link>
        </div>
      </div>
    </div>
  )
}
