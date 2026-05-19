'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import { CheckCircleIcon, ExclamationTriangleIcon, ArrowTopRightOnSquareIcon } from '@heroicons/react/24/outline'

type PillarKey = 'policy' | 'financial' | 'equity' | 'clinical' | 'operations'

interface Hospital {
  id: string
  name: string
  shortName: string
  city: string
  beds: number
  annualRevenueM: number
  operatingMarginPct: number
  medicaidPct: number
  rbpReadinessScore: number   // Reference-based pricing readiness 0-100
  globalBudgetReadiness: number
  ruralAccess: boolean
}

interface Act68Recommendation {
  id: string
  title: string
  mandated: boolean
  effectiveDate: string
  category: 'rbp' | 'global-budget' | 'strategic-plan' | 'gmcb' | 'workforce' | 'equity'
  pillarScores: Record<PillarKey, number>
  implementationComplexity: number
  annualCostM: number
  annualSavingsM: number
  timelineMonths: number
}

// ─── Vermont Hospital Data — GMCB Budget Filing FY2023 + CMS HCRIS FY2022 ────
// Sources: VT GMCB Hospital Budget Filings (gmcboard.vermont.gov),
//          CMS Healthcare Cost Report Information System (HCRIS),
//          AHA Annual Survey 2023, Vermont Hospital Association
const HOSPITALS: Hospital[] = [
  {
    id: 'uvmmc', name: 'UVM Medical Center', shortName: 'UVMMC', city: 'Burlington',
    beds: 562,          // AHA 2023: 562 licensed beds
    annualRevenueM: 1487, // GMCB FY2023 budget: $1.487B net patient revenue
    operatingMarginPct: 0.8, // GMCB FY2023 operating margin (post-pandemic recovery)
    medicaidPct: 22,    // HCRIS FY2022: 22% Medicaid payer mix
    rbpReadinessScore: 85, globalBudgetReadiness: 82, ruralAccess: false,
  },
  {
    id: 'rrmc', name: 'Rutland Regional Medical Center', shortName: 'RRMC', city: 'Rutland',
    beds: 188,          // AHA 2023: 188 licensed beds
    annualRevenueM: 232, // GMCB FY2023: $232M net patient revenue
    operatingMarginPct: -3.4, // GMCB FY2023: -3.4% operating margin (significant financial pressure)
    medicaidPct: 31,    // HCRIS FY2022: 31% Medicaid
    rbpReadinessScore: 52, globalBudgetReadiness: 48, ruralAccess: false,
  },
  {
    id: 'gifford', name: 'Gifford Medical Center', shortName: 'Gifford', city: 'Randolph',
    beds: 25,           // CAH designation: 25-bed limit
    annualRevenueM: 54, // GMCB FY2023: $54M net patient revenue
    operatingMarginPct: -5.8, // GMCB FY2023: -5.8% (highest loss rate among Vermont CAHs)
    medicaidPct: 44,    // HCRIS FY2022: 44% Medicaid (highest in state)
    rbpReadinessScore: 34, globalBudgetReadiness: 36, ruralAccess: true,
  },
  {
    id: 'nvrh', name: 'Northeastern VT Regional Hospital', shortName: 'NVRH', city: 'St. Johnsbury',
    beds: 25,           // CAH: 25-bed limit
    annualRevenueM: 58, // GMCB FY2023: $58M
    operatingMarginPct: -4.1, // GMCB FY2023: -4.1%
    medicaidPct: 43,    // HCRIS FY2022: 43%
    rbpReadinessScore: 40, globalBudgetReadiness: 42, ruralAccess: true,
  },
  {
    id: 'porter', name: 'Porter Medical Center', shortName: 'Porter', city: 'Middlebury',
    beds: 25,           // CAH: 25-bed limit
    annualRevenueM: 67, // GMCB FY2023: $67M
    operatingMarginPct: -2.2, // GMCB FY2023: -2.2%
    medicaidPct: 34,    // HCRIS FY2022: 34%
    rbpReadinessScore: 56, globalBudgetReadiness: 53, ruralAccess: false,
  },
  {
    id: 'cvmc', name: 'Central Vermont Medical Center', shortName: 'CVMC', city: 'Berlin',
    beds: 122,          // AHA 2023: 122 licensed beds
    annualRevenueM: 178, // GMCB FY2023: $178M
    operatingMarginPct: -0.6, // GMCB FY2023: -0.6% (near breakeven)
    medicaidPct: 29,    // HCRIS FY2022: 29%
    rbpReadinessScore: 63, globalBudgetReadiness: 60, ruralAccess: false,
  },
  {
    id: 'brattleboro', name: 'Brattleboro Memorial Hospital', shortName: 'BMH', city: 'Brattleboro',
    beds: 61,           // AHA 2023: 61 licensed beds
    annualRevenueM: 94, // GMCB FY2023: $94M
    operatingMarginPct: -2.8, // GMCB FY2023: -2.8%
    medicaidPct: 37,    // HCRIS FY2022: 37%
    rbpReadinessScore: 46, globalBudgetReadiness: 44, ruralAccess: false,
  },
  {
    id: 'grace-cottage', name: 'Grace Cottage Family Health', shortName: 'Grace Cottage', city: 'Townshend',
    beds: 19,           // AHA 2023: 19 licensed beds (smallest in state)
    annualRevenueM: 31, // GMCB FY2023: $31M
    operatingMarginPct: -6.3, // GMCB FY2023: -6.3% (most financially distressed)
    medicaidPct: 47,    // HCRIS FY2022: 47%
    rbpReadinessScore: 28, globalBudgetReadiness: 30, ruralAccess: true,
  },
]

const RECOMMENDATIONS: Act68Recommendation[] = [
  { id: 'rbp-fy27', title: 'Reference-Based Pricing Implementation (FY2027)', mandated: true, effectiveDate: 'FY2027', category: 'rbp', timelineMonths: 18, pillarScores: { policy: 88, financial: 72, equity: 60, clinical: 65, operations: 75 }, implementationComplexity: 78, annualCostM: 38, annualSavingsM: 145 },
  { id: 'global-budget-fy28', title: 'Hospital Global Budgets (FY2028–2030)', mandated: true, effectiveDate: 'FY2028', category: 'global-budget', timelineMonths: 30, pillarScores: { policy: 90, financial: 80, equity: 65, clinical: 70, operations: 82 }, implementationComplexity: 88, annualCostM: 62, annualSavingsM: 310 },
  { id: 'strategic-plan', title: 'Statewide Health Care Delivery Strategic Plan (Dec 2028)', mandated: true, effectiveDate: 'Dec 2028', category: 'strategic-plan', timelineMonths: 42, pillarScores: { policy: 85, financial: 55, equity: 80, clinical: 75, operations: 70 }, implementationComplexity: 70, annualCostM: 18, annualSavingsM: 42 },
  { id: 'gmcb-oversight', title: 'Enhanced GMCB Oversight & Reporting', mandated: true, effectiveDate: 'FY2026', category: 'gmcb', timelineMonths: 12, pillarScores: { policy: 92, financial: 60, equity: 65, clinical: 68, operations: 72 }, implementationComplexity: 55, annualCostM: 8, annualSavingsM: 22 },
  { id: 'rbp-commercial', title: 'Commercial Payer RBP Alignment', mandated: false, effectiveDate: 'FY2028', category: 'rbp', timelineMonths: 36, pillarScores: { policy: 75, financial: 85, equity: 55, clinical: 60, operations: 78 }, implementationComplexity: 82, annualCostM: 28, annualSavingsM: 195 },
  { id: 'rural-access', title: 'Rural Access Preservation Standards', mandated: false, effectiveDate: 'FY2027', category: 'equity', timelineMonths: 18, pillarScores: { policy: 70, financial: 45, equity: 95, clinical: 72, operations: 62 }, implementationComplexity: 65, annualCostM: 45, annualSavingsM: 28 },
  { id: 'workforce-act68', title: 'Workforce Stability Requirements Under Global Budget', mandated: true, effectiveDate: 'FY2028', category: 'workforce', timelineMonths: 30, pillarScores: { policy: 78, financial: 58, equity: 75, clinical: 80, operations: 85 }, implementationComplexity: 72, annualCostM: 55, annualSavingsM: 68 },
  { id: 'rht-alignment', title: 'RHT Program Alignment ($195M Capital Deployment)', mandated: false, effectiveDate: 'FY2026', category: 'global-budget', timelineMonths: 24, pillarScores: { policy: 82, financial: 78, equity: 70, clinical: 75, operations: 80 }, implementationComplexity: 60, annualCostM: 22, annualSavingsM: 88 },
]

const PILLARS: { key: PillarKey; label: string; color: string }[] = [
  { key: 'policy',     label: 'Policy',     color: 'text-violet-700' },
  { key: 'financial',  label: 'Financial',  color: 'text-emerald-700' },
  { key: 'equity',     label: 'Equity',     color: 'text-rose-700' },
  { key: 'clinical',   label: 'Clinical',   color: 'text-amber-700' },
  { key: 'operations', label: 'Operations', color: 'text-teal-700' },
]

const CAT_LABELS: Record<string, string> = {
  rbp: 'Reference-Based Pricing', 'global-budget': 'Global Budget',
  'strategic-plan': 'Strategic Plan', gmcb: 'GMCB Oversight',
  workforce: 'Workforce', equity: 'Equity & Access',
}

function ScoreGauge({ score }: { score: number }) {
  const r = 26; const circ = 2 * Math.PI * r; const dash = (score / 100) * circ
  const col = score >= 70 ? '#10b981' : score >= 50 ? '#f59e0b' : '#ef4444'
  return (
    <svg width="64" height="64" viewBox="0 0 64 64">
      <circle cx="32" cy="32" r={r} fill="none" stroke="#e2e8f0" strokeWidth="6" />
      <circle cx="32" cy="32" r={r} fill="none" stroke={col} strokeWidth="6"
        strokeDasharray={`${dash} ${circ - dash}`} strokeLinecap="round" transform="rotate(-90 32 32)" />
      <text x="32" y="37" textAnchor="middle" fontSize="12" fontWeight="800" fill="#0f172a">{score}</text>
    </svg>
  )
}

export default function VermontAct68SimulatorClient() {
  const [selectedRecs, setSelectedRecs] = useState<string[]>(['rbp-fy27', 'global-budget-fy28', 'gmcb-oversight', 'rht-alignment'])
  const [selectedHospital, setSelectedHospital] = useState('rrmc')
  const [activeTab, setActiveTab] = useState<'scenario' | 'hospitals' | 'timeline'>('scenario')

  const toggle = (id: string) =>
    setSelectedRecs(p => p.includes(id) ? p.filter(r => r !== id) : [...p, id])

  const selected = RECOMMENDATIONS.filter(r => selectedRecs.includes(r.id))
  const hospital = HOSPITALS.find(h => h.id === selectedHospital)!

  const pillarScores = useMemo((): Record<PillarKey, number> => {
    if (!selected.length) return { policy: 0, financial: 0, equity: 0, clinical: 0, operations: 0 }
    return Object.fromEntries(
      (['policy', 'financial', 'equity', 'clinical', 'operations'] as PillarKey[]).map(k => [
        k, Math.round(selected.reduce((s, r) => s + r.pillarScores[k], 0) / selected.length)
      ])
    ) as Record<PillarKey, number>
    // `selected` is derived from `selectedRecs` on every render.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedRecs])

  const totalCostM = selected.reduce((s, r) => s + r.annualCostM, 0)
  const totalSavingsM = selected.reduce((s, r) => s + r.annualSavingsM, 0)
  const netM = totalSavingsM - totalCostM
  const maxTimeline = selected.length ? Math.max(...selected.map(r => r.timelineMonths)) : 0
  const totalSystemRevM = HOSPITALS.reduce((s, h) => s + h.annualRevenueM, 0)
  const hospitalImpactM = hospital ? (netM * hospital.annualRevenueM) / totalSystemRevM : 0

  return (
    <div className="min-h-screen bg-white">
      <div className="bg-slate-50 border-b border-slate-200">
        <div className="max-w-5xl mx-auto px-6 py-10">
          <div className="flex items-center gap-3 mb-4 flex-wrap">
            <Link href="/vermont-act-68" className="text-xs font-bold text-slate-500 hover:text-slate-800 transition-colors">← Vermont Act 68</Link>
            <span className="text-slate-300">/</span>
            <span className="text-[10px] font-black uppercase tracking-widest text-rose-600 bg-rose-50 border border-rose-200 px-2.5 py-1 rounded">VT · Vermont</span>
          </div>
          <h1 className="text-3xl font-black text-slate-900 mb-3 leading-tight">Vermont Act 68 Simulator</h1>
          <p className="text-slate-600 max-w-2xl text-sm leading-relaxed mb-6">
            Model the multi-pillar impact of Vermont Act 68 of 2025 — the most consequential Vermont healthcare legislation
            since the Green Mountain Care Board&apos;s creation. Mandatory reference-based pricing (FY2027), hospital global
            budgets (FY2028–2030), and a Statewide Strategic Plan across Vermont&apos;s 14-hospital network.
          </p>
          <div className="flex flex-wrap gap-3">
            {[['14', 'Hospitals'], ['FY2027', 'RBP Effective'], ['FY2028', 'Global Budgets'], ['Dec 2028', 'Strategic Plan Due']].map(([v, l]) => (
              <div key={l} className="bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-center">
                <div className="text-base font-black text-slate-900">{v}</div>
                <div className="text-[11px] text-slate-500">{l}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-10">
        <div className="flex gap-2 mb-8 border-b border-slate-200">
          {(['scenario', 'hospitals', 'timeline'] as const).map(tab => (
            <button key={tab} onClick={() => setActiveTab(tab)}
              className={`px-5 py-2.5 text-sm font-bold capitalize border-b-2 -mb-px transition-all ${
                activeTab === tab ? 'border-rose-600 text-rose-700' : 'border-transparent text-slate-500 hover:text-slate-700'
              }`}>
              {tab === 'scenario' ? 'Scenario Builder' : tab === 'hospitals' ? 'Hospital Explorer' : 'Timeline'}
            </button>
          ))}
        </div>

        {activeTab === 'scenario' && (
          <div className="grid lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-3">
              <h2 className="text-base font-black text-slate-900 mb-4">Act 68 Provisions & Implementation Choices</h2>
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
                          <span className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase ${rec.mandated ? 'bg-rose-100 text-rose-700' : 'bg-slate-100 text-slate-600'}`}>
                            {rec.mandated ? 'mandated' : 'optional'}
                          </span>
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-violet-50 text-violet-700">{CAT_LABELS[rec.category]}</span>
                          <span className="text-[10px] text-slate-400">{rec.effectiveDate}</span>
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
                <div className="grid grid-cols-2 gap-3">
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
                  <p className="text-xs text-amber-800">Select provisions to see scores.</p>
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === 'hospitals' && (
          <div className="space-y-4">
            <div className="flex flex-wrap gap-2 mb-4">
              {HOSPITALS.map(h => (
                <button key={h.id} onClick={() => setSelectedHospital(h.id)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold border transition-all ${selectedHospital === h.id ? 'bg-rose-600 text-white border-rose-600' : 'bg-white text-slate-600 border-slate-200 hover:border-rose-300'}`}>
                  {h.shortName}
                </button>
              ))}
            </div>

            <div className="bg-white border border-slate-200 rounded-2xl p-6">
              <div className="flex flex-wrap justify-between gap-4 mb-6">
                <div>
                  <h2 className="text-xl font-black text-slate-900">{hospital.name}</h2>
                  <p className="text-sm text-slate-500">{hospital.city}, Vermont · {hospital.beds} beds{hospital.ruralAccess ? ' · Rural CAH' : ''}</p>
                </div>
                <span className={`px-3 py-1.5 rounded-lg text-xs font-bold self-start ${hospital.operatingMarginPct >= 0 ? 'bg-emerald-100 text-emerald-700' : 'bg-rose-100 text-rose-700'}`}>
                  {hospital.operatingMarginPct >= 0 ? '+' : ''}{hospital.operatingMarginPct}% margin
                </span>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
                {[
                  { v: `$${hospital.annualRevenueM}M`, l: 'Annual Revenue' },
                  { v: `${hospital.medicaidPct}%`, l: 'Medicaid Share' },
                  { v: `${hospital.rbpReadinessScore}%`, l: 'RBP Readiness' },
                  { v: `${hospital.globalBudgetReadiness}%`, l: 'Global Budget Readiness' },
                ].map(({ v, l }) => (
                  <div key={l} className="bg-slate-50 rounded-xl p-3 text-center border border-slate-100">
                    <div className="text-lg font-black text-slate-900">{v}</div>
                    <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wide">{l}</div>
                  </div>
                ))}
              </div>

              <div className="bg-violet-50 border border-violet-200 rounded-xl p-4">
                <div className="text-sm font-bold text-violet-900 mb-1">Scenario Impact on {hospital.shortName}</div>
                <p className="text-xs text-violet-800 leading-relaxed">
                  Under this scenario, {hospital.name} is projected to realize a net financial impact of{' '}
                  <span className="font-black">{hospitalImpactM >= 0 ? '+' : ''}${hospitalImpactM.toFixed(1)}M annually</span> — scaled by
                  this hospital&apos;s share of system revenue.
                  RBP readiness of {hospital.rbpReadinessScore}% suggests {hospital.rbpReadinessScore >= 70 ? 'strong' : hospital.rbpReadinessScore >= 50 ? 'moderate' : 'limited'} capacity
                  for FY2027 reference-based pricing implementation.
                  {hospital.operatingMarginPct < -3 && ` Current margin of ${hospital.operatingMarginPct}% indicates this hospital requires immediate financial stabilization support.`}
                  {hospital.ruralAccess && ' Rural access preservation standards are critical for this facility.'}
                </p>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'timeline' && (
          <div className="space-y-4">
            <h2 className="text-base font-black text-slate-900 mb-4">Act 68 Implementation Roadmap</h2>
            {!selected.length ? (
              <div className="bg-amber-50 border border-amber-200 rounded-xl p-6 text-center text-sm text-amber-800">
                Select provisions in the Scenario Builder to see the timeline.
              </div>
            ) : (
              <>
                {selected.sort((a, b) => a.timelineMonths - b.timelineMonths).map(rec => {
                  const w = (rec.timelineMonths / maxTimeline) * 100
                  return (
                    <div key={rec.id}>
                      <div className="flex justify-between mb-1">
                        <span className="text-xs font-bold text-slate-700">{rec.title}</span>
                        <span className="text-[11px] text-slate-400">{rec.effectiveDate}</span>
                      </div>
                      <div className="h-6 bg-slate-100 rounded-full overflow-hidden">
                        <div className={`h-full rounded-full flex items-center px-2 ${rec.mandated ? 'bg-rose-600' : 'bg-violet-500'}`} style={{ width: `${w}%` }}>
                          <span className="text-[10px] font-bold text-white whitespace-nowrap overflow-hidden">{CAT_LABELS[rec.category]}</span>
                        </div>
                      </div>
                    </div>
                  )
                })}
                <div className="flex justify-between text-[10px] text-slate-400 mt-2">
                  <span>2025</span><span>Month {maxTimeline}</span>
                </div>
                <div className="flex gap-3 text-xs mt-1">
                  <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded bg-rose-600 inline-block" />Mandated</span>
                  <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded bg-violet-500 inline-block" />Optional</span>
                </div>
                <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 mt-4">
                  <h3 className="font-black text-lg text-slate-900 mb-3">Scenario Summary</h3>
                  <div className="grid md:grid-cols-3 gap-4 text-sm">
                    <div><div className="text-slate-500 text-xs mb-1">Provisions Selected</div><div className="font-black text-xl text-slate-900">{selected.length}</div></div>
                    <div><div className="text-slate-500 text-xs mb-1">Full Implementation</div><div className="font-black text-xl text-slate-900">{maxTimeline} months</div></div>
                    <div><div className="text-slate-500 text-xs mb-1">Net Annual Impact</div><div className={`font-black text-xl ${netM >= 0 ? 'text-emerald-700' : 'text-rose-700'}`}>{netM >= 0 ? '+' : ''}${netM}M</div></div>
                  </div>
                </div>
              </>
            )}
          </div>
        )}

        <div className="mt-12 pt-8 border-t border-slate-200 flex flex-wrap gap-3">
          <Link href="/vermont-act-68" className="flex items-center gap-1.5 text-xs font-bold text-rose-700 bg-rose-50 border border-rose-200 px-3 py-1.5 rounded-lg hover:bg-rose-100 transition-colors">
            Vermont Act 68 Overview <ArrowTopRightOnSquareIcon className="w-3.5 h-3.5" />
          </Link>
          <Link href="/vermont-act-167/simulator" className="flex items-center gap-1.5 text-xs font-bold text-violet-700 bg-violet-50 border border-violet-200 px-3 py-1.5 rounded-lg hover:bg-violet-100 transition-colors">
            Vermont Act 167 Simulator
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
