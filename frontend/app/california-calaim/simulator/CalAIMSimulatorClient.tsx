'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import {
  AdjustmentsHorizontalIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon,
  ArrowTopRightOnSquareIcon,
  BuildingOffice2Icon,
  CurrencyDollarIcon,
  ScaleIcon,
  UsersIcon,
} from '@heroicons/react/24/outline'

// ─── DATA ─────────────────────────────────────────────────────────────────────

type PillarKey = 'policy' | 'financial' | 'equity' | 'clinical'

interface ManagedCarePlan {
  id: string
  name: string
  shortName: string
  region: string
  enrollees: number
  counties: number
  medicaidRevM: number
  operatingMarginPct: number
  sdohBurdenScore: number // 1-10
  ecmReadiness: number    // Enhanced Care Management readiness 0-100
  commSupportsReady: boolean
}

interface CalAIMRecommendation {
  id: string
  title: string
  category: 'ecm' | 'community-supports' | 'payment' | 'equity' | 'data'
  pillarScores: Record<PillarKey, number>
  implementationComplexity: number
  annualCostM: number
  annualSavingsM: number
  status: 'required' | 'optional'
  timelineMonths: number
}

const PLANS: ManagedCarePlan[] = [
  { id: 'la-care', name: 'L.A. Care Health Plan', shortName: 'LA Care', region: 'Los Angeles', enrollees: 2400000, counties: 1, medicaidRevM: 8200, operatingMarginPct: 1.2, sdohBurdenScore: 8, ecmReadiness: 72, commSupportsReady: true },
  { id: 'hpsj', name: 'Health Plan of San Joaquin', shortName: 'HPSJ', region: 'San Joaquin', enrollees: 310000, counties: 2, medicaidRevM: 1100, operatingMarginPct: 2.1, sdohBurdenScore: 9, ecmReadiness: 55, commSupportsReady: false },
  { id: 'partnership', name: 'Partnership HealthPlan', shortName: 'Partnership', region: 'Northern CA', enrollees: 620000, counties: 14, medicaidRevM: 2100, operatingMarginPct: 0.8, sdohBurdenScore: 7, ecmReadiness: 68, commSupportsReady: true },
  { id: 'inland', name: 'Inland Empire Health Plan', shortName: 'IEHP', region: 'Inland Empire', enrollees: 1400000, counties: 2, medicaidRevM: 4800, operatingMarginPct: 1.5, sdohBurdenScore: 8, ecmReadiness: 61, commSupportsReady: true },
  { id: 'molina', name: 'Molina Healthcare of CA', shortName: 'Molina', region: 'Statewide', enrollees: 1900000, counties: 22, medicaidRevM: 6500, operatingMarginPct: 3.2, sdohBurdenScore: 6, ecmReadiness: 78, commSupportsReady: true },
  { id: 'central', name: 'Central California Alliance', shortName: 'Alliance', region: 'Central CA', enrollees: 380000, counties: 3, medicaidRevM: 1400, operatingMarginPct: 1.1, sdohBurdenScore: 9, ecmReadiness: 49, commSupportsReady: false },
]

const RECOMMENDATIONS: CalAIMRecommendation[] = [
  {
    id: 'ecm-launch', title: 'Enhanced Care Management Program Launch',
    category: 'ecm', status: 'required', timelineMonths: 12,
    pillarScores: { policy: 75, financial: 60, equity: 85, clinical: 80 },
    implementationComplexity: 72, annualCostM: 340, annualSavingsM: 480,
  },
  {
    id: 'comm-supports', title: 'Community Supports Benefits Implementation',
    category: 'community-supports', status: 'required', timelineMonths: 18,
    pillarScores: { policy: 80, financial: 55, equity: 90, clinical: 70 },
    implementationComplexity: 78, annualCostM: 520, annualSavingsM: 390,
  },
  {
    id: 'pop-health', title: 'Population Health Management Platform',
    category: 'data', status: 'required', timelineMonths: 24,
    pillarScores: { policy: 65, financial: 70, equity: 75, clinical: 85 },
    implementationComplexity: 65, annualCostM: 180, annualSavingsM: 260,
  },
  {
    id: 'whole-person', title: 'Whole-Person Care Integration (BH + Physical)',
    category: 'ecm', status: 'required', timelineMonths: 30,
    pillarScores: { policy: 70, financial: 50, equity: 80, clinical: 90 },
    implementationComplexity: 85, annualCostM: 420, annualSavingsM: 580,
  },
  {
    id: 'housing-nav', title: 'Housing Navigation & Tenancy Support',
    category: 'community-supports', status: 'optional', timelineMonths: 18,
    pillarScores: { policy: 60, financial: 45, equity: 95, clinical: 65 },
    implementationComplexity: 70, annualCostM: 290, annualSavingsM: 210,
  },
  {
    id: 'payment-reform', title: 'Capitation-Based Payment Reform',
    category: 'payment', status: 'required', timelineMonths: 12,
    pillarScores: { policy: 85, financial: 80, equity: 55, clinical: 60 },
    implementationComplexity: 60, annualCostM: 95, annualSavingsM: 340,
  },
  {
    id: 'data-exchange', title: 'Real-Time Data Exchange & EDIE Integration',
    category: 'data', status: 'optional', timelineMonths: 24,
    pillarScores: { policy: 70, financial: 65, equity: 60, clinical: 88 },
    implementationComplexity: 55, annualCostM: 140, annualSavingsM: 220,
  },
  {
    id: 'rural-equity', title: 'Rural & Frontier County Equity Strategy',
    category: 'equity', status: 'optional', timelineMonths: 18,
    pillarScores: { policy: 65, financial: 40, equity: 98, clinical: 70 },
    implementationComplexity: 80, annualCostM: 160, annualSavingsM: 120,
  },
]

const PILLARS: { key: PillarKey; label: string; color: string; bg: string }[] = [
  { key: 'policy',   label: 'Policy Alignment',    color: 'text-violet-700', bg: 'bg-violet-100' },
  { key: 'financial', label: 'Financial Sustainability', color: 'text-emerald-700', bg: 'bg-emerald-100' },
  { key: 'equity',   label: 'Health Equity',        color: 'text-rose-700',   bg: 'bg-rose-100' },
  { key: 'clinical', label: 'Clinical Quality',     color: 'text-amber-700',  bg: 'bg-amber-100' },
]

const CATEGORY_LABELS: Record<string, string> = {
  ecm: 'Enhanced Care Mgmt',
  'community-supports': 'Community Supports',
  payment: 'Payment Reform',
  equity: 'Equity Strategy',
  data: 'Data & Analytics',
}

// ─── UI PRIMITIVES ────────────────────────────────────────────────────────────

function ScoreGauge({ score, color }: { score: number; color: string }) {
  const r = 28; const circ = 2 * Math.PI * r
  const dash = (score / 100) * circ
  const strokeColor = score >= 70 ? '#10b981' : score >= 50 ? '#f59e0b' : '#ef4444'
  return (
    <svg width="68" height="68" viewBox="0 0 68 68">
      <circle cx="34" cy="34" r={r} fill="none" stroke="#e2e8f0" strokeWidth="6" />
      <circle cx="34" cy="34" r={r} fill="none" stroke={strokeColor} strokeWidth="6"
        strokeDasharray={`${dash} ${circ - dash}`} strokeLinecap="round"
        transform="rotate(-90 34 34)" />
      <text x="34" y="39" textAnchor="middle" fontSize="13" fontWeight="800" fill="#0f172a">{score}</text>
    </svg>
  )
}

// ─── MAIN COMPONENT ───────────────────────────────────────────────────────────

export default function CalAIMSimulatorClient() {
  const [selectedRecs, setSelectedRecs] = useState<string[]>(['ecm-launch', 'payment-reform', 'pop-health'])
  const [selectedPlan, setSelectedPlan] = useState<string>('la-care')
  const [activeTab, setActiveTab] = useState<'scenario' | 'plans' | 'timeline'>('scenario')

  const toggleRec = (id: string) =>
    setSelectedRecs(prev => prev.includes(id) ? prev.filter(r => r !== id) : [...prev, id])

  const selected = RECOMMENDATIONS.filter(r => selectedRecs.includes(r.id))
  const plan = PLANS.find(p => p.id === selectedPlan)!

  const pillarScores = useMemo((): Record<PillarKey, number> => {
    if (selected.length === 0) return { policy: 0, financial: 0, equity: 0, clinical: 0 }
    const keys: PillarKey[] = ['policy', 'financial', 'equity', 'clinical']
    return Object.fromEntries(
      keys.map(k => [k, Math.round(selected.reduce((s, r) => s + r.pillarScores[k], 0) / selected.length)])
    ) as Record<PillarKey, number>
  }, [selectedRecs])

  const totalCostM = selected.reduce((s, r) => s + r.annualCostM, 0)
  const totalSavingsM = selected.reduce((s, r) => s + r.annualSavingsM, 0)
  const netM = totalSavingsM - totalCostM
  const avgComplexity = selected.length ? Math.round(selected.reduce((s, r) => s + r.implementationComplexity, 0) / selected.length) : 0
  const maxTimeline = selected.length ? Math.max(...selected.map(r => r.timelineMonths)) : 0

  const planImpactM = plan ? (netM * plan.medicaidRevM) / 98000 : 0 // scale by plan size vs CA total

  return (
    <div className="min-h-screen bg-white">

      {/* Hero */}
      <div className="bg-slate-50 border-b border-slate-200">
        <div className="max-w-5xl mx-auto px-6 py-10">
          <div className="flex items-center gap-3 mb-4 flex-wrap">
            <Link href="/htr-simulator" className="text-xs font-bold text-slate-500 hover:text-slate-800 transition-colors">← HTR Simulator</Link>
            <span className="text-slate-300">/</span>
            <span className="text-[10px] font-black uppercase tracking-widest text-blue-700 bg-blue-50 border border-blue-200 px-2.5 py-1 rounded">CA · California</span>
          </div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight mb-3 leading-tight">California CalAIM Simulator</h1>
          <p className="text-slate-600 max-w-2xl leading-relaxed text-sm mb-6">
            Model the multi-pillar impact of California&apos;s $6.7B Medi-Cal transformation — whole-person care,
            enhanced care management, community supports, and population health management across 24 managed care
            plans and 58 counties serving 14.2M beneficiaries.
          </p>
          <div className="flex flex-wrap gap-3 text-sm">
            {[['24', 'Managed Care Plans'], ['14.2M', 'Beneficiaries'], ['58', 'Counties'], ['$6.7B', 'Transformation Budget']].map(([v, l]) => (
              <div key={l} className="bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-center">
                <div className="text-lg font-black text-slate-900">{v}</div>
                <div className="text-[11px] text-slate-500">{l}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-10">

        {/* Tab nav */}
        <div className="flex gap-2 mb-8 border-b border-slate-200">
          {(['scenario', 'plans', 'timeline'] as const).map(tab => (
            <button key={tab} onClick={() => setActiveTab(tab)}
              className={`px-5 py-2.5 text-sm font-bold capitalize border-b-2 transition-all -mb-px ${
                activeTab === tab ? 'border-blue-600 text-blue-700' : 'border-transparent text-slate-500 hover:text-slate-700'
              }`}>
              {tab === 'scenario' ? 'Scenario Builder' : tab === 'plans' ? 'Plan Explorer' : 'Implementation Timeline'}
            </button>
          ))}
        </div>

        {/* SCENARIO TAB */}
        {activeTab === 'scenario' && (
          <div className="grid lg:grid-cols-3 gap-6">

            {/* Left: recommendation picker */}
            <div className="lg:col-span-2 space-y-3">
              <h2 className="text-base font-black text-slate-900 mb-4">Select CalAIM Initiatives</h2>
              {RECOMMENDATIONS.map(rec => {
                const isSelected = selectedRecs.includes(rec.id)
                return (
                  <button key={rec.id} onClick={() => toggleRec(rec.id)}
                    className={`w-full text-left p-4 rounded-xl border-2 transition-all ${
                      isSelected ? 'border-blue-500 bg-blue-50' : 'border-slate-200 hover:border-slate-300 bg-white'
                    }`}>
                    <div className="flex items-start gap-3">
                      <div className={`w-5 h-5 rounded mt-0.5 shrink-0 border-2 flex items-center justify-center transition-all ${
                        isSelected ? 'bg-blue-600 border-blue-600' : 'border-slate-300'
                      }`}>
                        {isSelected && <CheckCircleIcon className="w-3.5 h-3.5 text-white" />}
                      </div>
                      <div className="flex-1">
                        <div className="flex flex-wrap items-center gap-2 mb-1">
                          <span className="text-sm font-black text-slate-900">{rec.title}</span>
                          <span className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wide ${
                            rec.status === 'required' ? 'bg-rose-100 text-rose-700' : 'bg-slate-100 text-slate-600'
                          }`}>{rec.status}</span>
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-blue-50 text-blue-700">
                            {CATEGORY_LABELS[rec.category]}
                          </span>
                        </div>
                        <div className="flex flex-wrap gap-3 text-[11px] text-slate-500">
                          <span>Cost: <span className="font-bold text-slate-700">${rec.annualCostM}M/yr</span></span>
                          <span>Savings: <span className="font-bold text-emerald-700">${rec.annualSavingsM}M/yr</span></span>
                          <span>Timeline: <span className="font-bold text-slate-700">{rec.timelineMonths} mo</span></span>
                          <span>Complexity: <span className="font-bold text-amber-700">{rec.implementationComplexity}/100</span></span>
                        </div>
                      </div>
                    </div>
                  </button>
                )
              })}
            </div>

            {/* Right: scores */}
            <div className="space-y-4">
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5">
                <h3 className="text-xs font-black uppercase tracking-wider text-slate-500 mb-4">Pillar Scores</h3>
                <div className="grid grid-cols-2 gap-4">
                  {PILLARS.map(p => (
                    <div key={p.key} className="flex flex-col items-center gap-1">
                      <ScoreGauge score={pillarScores[p.key]} color={p.color} />
                      <span className={`text-[10px] font-bold text-center leading-tight ${p.color}`}>{p.label}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white border border-slate-200 rounded-2xl p-5 space-y-3">
                <h3 className="text-xs font-black uppercase tracking-wider text-slate-500 mb-2">Financial Summary</h3>
                <div className="flex justify-between text-sm"><span className="text-slate-600">Annual Cost</span><span className="font-black text-rose-700">${totalCostM}M</span></div>
                <div className="flex justify-between text-sm"><span className="text-slate-600">Annual Savings</span><span className="font-black text-emerald-700">${totalSavingsM}M</span></div>
                <div className="border-t border-slate-100 pt-3 flex justify-between text-sm">
                  <span className="font-bold text-slate-700">Net Impact</span>
                  <span className={`font-black ${netM >= 0 ? 'text-emerald-700' : 'text-rose-700'}`}>
                    {netM >= 0 ? '+' : ''}${netM}M
                  </span>
                </div>
                <div className="flex justify-between text-sm"><span className="text-slate-600">Avg Complexity</span><span className="font-bold text-amber-700">{avgComplexity}/100</span></div>
                <div className="flex justify-between text-sm"><span className="text-slate-600">Full Implementation</span><span className="font-bold text-slate-700">{maxTimeline} months</span></div>
              </div>

              {selected.length === 0 && (
                <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex gap-2">
                  <ExclamationTriangleIcon className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                  <p className="text-xs text-amber-800">Select at least one initiative to see pillar scores.</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* PLANS TAB */}
        {activeTab === 'plans' && (
          <div className="space-y-6">
            <div className="flex flex-wrap gap-2 mb-4">
              {PLANS.map(p => (
                <button key={p.id} onClick={() => setSelectedPlan(p.id)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold border transition-all ${
                    selectedPlan === p.id ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-slate-600 border-slate-200 hover:border-blue-300'
                  }`}>
                  {p.shortName}
                </button>
              ))}
            </div>

            <div className="bg-white border border-slate-200 rounded-2xl p-6">
              <div className="flex flex-wrap items-start justify-between gap-4 mb-6">
                <div>
                  <h2 className="text-xl font-black text-slate-900">{plan.name}</h2>
                  <p className="text-sm text-slate-500">{plan.region} · {plan.counties} {plan.counties === 1 ? 'county' : 'counties'}</p>
                </div>
                <div className={`px-3 py-1.5 rounded-lg text-xs font-bold ${plan.operatingMarginPct >= 2 ? 'bg-emerald-100 text-emerald-700' : plan.operatingMarginPct >= 0 ? 'bg-amber-100 text-amber-700' : 'bg-rose-100 text-rose-700'}`}>
                  {plan.operatingMarginPct >= 0 ? '+' : ''}{plan.operatingMarginPct}% margin
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
                {[
                  { v: (plan.enrollees / 1000000).toFixed(1) + 'M', l: 'Enrollees' },
                  { v: `$${plan.medicaidRevM.toLocaleString()}M`, l: 'Medi-Cal Revenue' },
                  { v: `${plan.ecmReadiness}%`, l: 'ECM Readiness' },
                  { v: `${plan.sdohBurdenScore}/10`, l: 'SDOH Burden Score' },
                ].map(({ v, l }) => (
                  <div key={l} className="bg-slate-50 rounded-xl p-3 text-center border border-slate-100">
                    <div className="text-lg font-black text-slate-900">{v}</div>
                    <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wide">{l}</div>
                  </div>
                ))}
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                <div className="text-sm font-bold text-blue-900 mb-1">Scenario Impact on {plan.shortName}</div>
                <p className="text-xs text-blue-800 leading-relaxed">
                  Based on your selected initiatives, {plan.shortName} is projected to realize a net financial impact
                  of <span className="font-black">{planImpactM >= 0 ? '+' : ''}${planImpactM.toFixed(0)}M annually</span> — scaled
                  by this plan&apos;s share of statewide Medi-Cal revenue.
                  ECM readiness of {plan.ecmReadiness}% suggests {plan.ecmReadiness >= 70 ? 'strong' : plan.ecmReadiness >= 50 ? 'moderate' : 'limited'} capacity
                  to launch enhanced care management within 12 months.
                  Community supports {plan.commSupportsReady ? 'infrastructure is in place' : 'infrastructure requires significant buildout'}.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* TIMELINE TAB */}
        {activeTab === 'timeline' && (
          <div className="space-y-4">
            <h2 className="text-base font-black text-slate-900 mb-4">Implementation Roadmap</h2>
            {selected.length === 0 && (
              <div className="bg-amber-50 border border-amber-200 rounded-xl p-6 text-center text-sm text-amber-800">
                Select initiatives in the Scenario Builder tab to see the implementation timeline.
              </div>
            )}
            {selected.length > 0 && (
              <>
                {selected.sort((a, b) => a.timelineMonths - b.timelineMonths).map((rec, i) => {
                  const maxT = maxTimeline
                  const widthPct = (rec.timelineMonths / maxT) * 100
                  return (
                    <div key={rec.id}>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs font-bold text-slate-700">{rec.title}</span>
                        <span className="text-[11px] text-slate-400">{rec.timelineMonths} months</span>
                      </div>
                      <div className="h-6 bg-slate-100 rounded-full overflow-hidden">
                        <div
                          className="h-full rounded-full bg-blue-500 flex items-center px-2 transition-all duration-500"
                          style={{ width: `${widthPct}%` }}
                        >
                          <span className="text-[10px] font-bold text-white whitespace-nowrap overflow-hidden">{CATEGORY_LABELS[rec.category]}</span>
                        </div>
                      </div>
                    </div>
                  )
                })}
                <div className="flex justify-between text-[10px] text-slate-400 mt-2">
                  <span>Month 0</span><span>Month {maxTimeline}</span>
                </div>

                <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 mt-6">
                  <h3 className="font-black text-lg text-slate-900 mb-2">Scenario Summary</h3>
                  <div className="grid md:grid-cols-3 gap-4 text-sm">
                    <div><div className="text-slate-500 text-xs mb-1">Initiatives Selected</div><div className="font-black text-xl text-slate-900">{selected.length}</div></div>
                    <div><div className="text-slate-500 text-xs mb-1">Full Implementation</div><div className="font-black text-xl text-slate-900">{maxTimeline} months</div></div>
                    <div><div className="text-slate-500 text-xs mb-1">Net Annual Impact</div><div className={`font-black text-xl ${netM >= 0 ? 'text-emerald-700' : 'text-rose-700'}`}>{netM >= 0 ? '+' : ''}${netM}M</div></div>
                  </div>
                </div>
              </>
            )}
          </div>
        )}

        {/* Footer links */}
        <div className="mt-12 pt-8 border-t border-slate-200 flex flex-wrap gap-3">
          <Link href="/california-calaim" className="flex items-center gap-1.5 text-xs font-bold text-blue-700 hover:text-blue-900 bg-blue-50 border border-blue-200 px-3 py-1.5 rounded-lg transition-colors">
            California CalAIM Overview <ArrowTopRightOnSquareIcon className="w-3.5 h-3.5" />
          </Link>
          <Link href="/htr-simulator" className="flex items-center gap-1.5 text-xs font-bold text-slate-600 hover:text-slate-900 bg-slate-100 border border-slate-200 px-3 py-1.5 rounded-lg transition-colors">
            ← All Simulators
          </Link>
          <Link href="/research-lab/policy-quality?tab=policy" className="flex items-center gap-1.5 text-xs font-bold text-slate-600 hover:text-slate-900 bg-slate-100 border border-slate-200 px-3 py-1.5 rounded-lg transition-colors">
            Policy Simulator
          </Link>
        </div>
      </div>
    </div>
  )
}
