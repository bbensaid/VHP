'use client'

import { useState, useMemo } from 'react'

const ORG_PRESETS = [
  {
    id: 'rural-cah',
    label: 'Rural CAH',
    beds: 25,
    annualRevenueM: 28,
    medicaidPct: 38,
    medicarePct: 42,
    commercialPct: 14,
    selfPayPct: 6,
    operatingMarginPct: -3.2,
    fteCount: 180,
  },
  {
    id: 'community',
    label: 'Community Hospital',
    beds: 120,
    annualRevenueM: 145,
    medicaidPct: 28,
    medicarePct: 38,
    commercialPct: 26,
    selfPayPct: 8,
    operatingMarginPct: 1.8,
    fteCount: 820,
  },
  {
    id: 'regional',
    label: 'Regional Medical Center',
    beds: 280,
    annualRevenueM: 420,
    medicaidPct: 22,
    medicarePct: 35,
    commercialPct: 36,
    selfPayPct: 7,
    operatingMarginPct: 3.4,
    fteCount: 2400,
  },
  {
    id: 'academic',
    label: 'Academic Medical Center',
    beds: 550,
    annualRevenueM: 1100,
    medicaidPct: 18,
    medicarePct: 30,
    commercialPct: 44,
    selfPayPct: 8,
    operatingMarginPct: 4.1,
    fteCount: 7200,
  },
]

const TRANSITION_YEARS = 7

function fmt(n: number) {
  if (Math.abs(n) >= 1000) return `$${(n / 1000).toFixed(2)}B`
  return `$${Math.abs(n).toFixed(1)}M`
}

function fmtPct(n: number) { return `${n >= 0 ? '+' : ''}${n.toFixed(1)}%` }

function ProgressBar({ pct, color, label }: { pct: number; color: string; label: string }) {
  return (
    <div className="mb-2">
      <div className="flex justify-between text-xs mb-1">
        <span className="font-bold text-slate-700">{label}</span>
        <span className="text-slate-500">{pct.toFixed(1)}%</span>
      </div>
      <div className="h-2.5 bg-slate-100 rounded-full overflow-hidden">
        <div className={`h-full rounded-full transition-all duration-500 ${color}`} style={{ width: `${Math.min(100, Math.max(0, pct))}%` }} />
      </div>
    </div>
  )
}

export default function GlobalBudgetTransitionModeler() {
  const [presetId, setPresetId] = useState('community')
  const [transitionYears, setTransitionYears] = useState(5)
  const [globalBudgetGrowthPct, setGlobalBudgetGrowthPct] = useState(3.5)
  const [ffsBaselineGrowthPct, setFfsBaselineGrowthPct] = useState(5.2)
  const [riskCorridorPct, setRiskCorridorPct] = useState(5)
  const [qualityBonusPct, setQualityBonusPct] = useState(2)
  const [adminReductionPct, setAdminReductionPct] = useState(8)
  const [utilizationReductionPct, setUtilizationReductionPct] = useState(6)

  const preset = ORG_PRESETS.find(p => p.id === presetId)!

  const yearlyProjections = useMemo(() => {
    const p = ORG_PRESETS.find(o => o.id === presetId)!
    return Array.from({ length: TRANSITION_YEARS }, (_, i) => {
      const year = 2025 + i
      const phase = transitionYears <= 1 ? 1 : i / (transitionYears - 1)

      const ffsGrowth = Math.pow(1 + ffsBaselineGrowthPct / 100, i)
      const ffsRevenueM = p.annualRevenueM * ffsGrowth

      const gbGrowth = Math.pow(1 + globalBudgetGrowthPct / 100, i)
      const baseGbM = p.annualRevenueM * gbGrowth

      const qualityBonusM = baseGbM * (qualityBonusPct / 100) * Math.min(1, phase * 1.5)
      const adminSavingsM = p.annualRevenueM * (adminReductionPct / 100) * phase
      const utilizationImpactRevenueM = -p.annualRevenueM * (utilizationReductionPct / 100) * phase * 0.4
      const utilizationCostSavingsM = p.annualRevenueM * (utilizationReductionPct / 100) * phase * 0.6

      const totalGbRevenueM = baseGbM + qualityBonusM + utilizationImpactRevenueM

      const activeRiskCorridor = phase < 1
      const corridorCapM = activeRiskCorridor ? p.annualRevenueM * (riskCorridorPct / 100) : 0
      const rawVarianceM = totalGbRevenueM - ffsRevenueM
      const corridorAdjustedVarianceM = activeRiskCorridor
        ? Math.max(-corridorCapM, Math.min(corridorCapM, rawVarianceM))
        : rawVarianceM

      const baseMarginM = p.annualRevenueM * (p.operatingMarginPct / 100)
      const projectedMarginM = baseMarginM + adminSavingsM + utilizationCostSavingsM + corridorAdjustedVarianceM
      const projectedMarginPct = totalGbRevenueM !== 0 ? (projectedMarginM / totalGbRevenueM) * 100 : 0

      return {
        year,
        phase,
        ffsRevenueM,
        totalGbRevenueM,
        qualityBonusM,
        adminSavingsM,
        utilizationCostSavingsM,
        corridorAdjustedVarianceM,
        projectedMarginM,
        projectedMarginPct,
        netDeltaVsFfsM: totalGbRevenueM - ffsRevenueM,
      }
    })
  }, [presetId, transitionYears, globalBudgetGrowthPct, ffsBaselineGrowthPct, riskCorridorPct, qualityBonusPct, adminReductionPct, utilizationReductionPct])

  const finalYear = yearlyProjections[yearlyProjections.length - 1]
  const maxRevenue = Math.max(...yearlyProjections.map(d => Math.max(d.ffsRevenueM, d.totalGbRevenueM)))

  return (
    <div className="space-y-8">

      {/* Org selector */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6">
        <h3 className="text-sm font-black uppercase tracking-wider text-slate-500 mb-4">Organization Type</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
          {ORG_PRESETS.map(p => (
            <button
              key={p.id}
              onClick={() => setPresetId(p.id)}
              className={`p-3 rounded-xl border-2 text-left transition-all ${
                presetId === p.id
                  ? 'border-emerald-500 bg-emerald-50'
                  : 'border-slate-200 hover:border-slate-300 bg-white'
              }`}
            >
              <div className={`text-xs font-black mb-1 ${presetId === p.id ? 'text-emerald-700' : 'text-slate-700'}`}>{p.label}</div>
              <div className="text-[10px] text-slate-400">{p.beds} beds · {fmt(p.annualRevenueM)} revenue</div>
              <div className={`text-[10px] font-bold ${p.operatingMarginPct >= 0 ? 'text-emerald-600' : 'text-rose-600'}`}>
                {fmtPct(p.operatingMarginPct)} margin
              </div>
            </button>
          ))}
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Global budget annual growth rate: <span className="text-emerald-700">{globalBudgetGrowthPct}%</span>
            </label>
            <input type="range" min={1} max={7} step={0.1} value={globalBudgetGrowthPct}
              onChange={e => setGlobalBudgetGrowthPct(+e.target.value)}
              className="w-full accent-emerald-600" />
            <div className="flex justify-between text-[10px] text-slate-400 mt-0.5"><span>1%</span><span>7%</span></div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              FFS baseline growth (counterfactual): <span className="text-slate-600">{ffsBaselineGrowthPct}%</span>
            </label>
            <input type="range" min={2} max={9} step={0.1} value={ffsBaselineGrowthPct}
              onChange={e => setFfsBaselineGrowthPct(+e.target.value)}
              className="w-full accent-slate-500" />
            <div className="flex justify-between text-[10px] text-slate-400 mt-0.5"><span>2%</span><span>9%</span></div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Risk corridor (±): <span className="text-amber-700">{riskCorridorPct}%</span>
            </label>
            <input type="range" min={1} max={20} value={riskCorridorPct}
              onChange={e => setRiskCorridorPct(+e.target.value)}
              className="w-full accent-amber-500" />
            <div className="flex justify-between text-[10px] text-slate-400 mt-0.5"><span>1%</span><span>20%</span></div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Quality bonus: <span className="text-emerald-700">{qualityBonusPct}%</span>
            </label>
            <input type="range" min={0} max={8} step={0.5} value={qualityBonusPct}
              onChange={e => setQualityBonusPct(+e.target.value)}
              className="w-full accent-emerald-600" />
            <div className="flex justify-between text-[10px] text-slate-400 mt-0.5"><span>0%</span><span>8%</span></div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Admin cost reduction: <span className="text-emerald-700">{adminReductionPct}%</span>
            </label>
            <input type="range" min={0} max={20} value={adminReductionPct}
              onChange={e => setAdminReductionPct(+e.target.value)}
              className="w-full accent-emerald-600" />
            <div className="flex justify-between text-[10px] text-slate-400 mt-0.5"><span>0%</span><span>20%</span></div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Utilization reduction: <span className="text-emerald-700">{utilizationReductionPct}%</span>
            </label>
            <input type="range" min={0} max={20} value={utilizationReductionPct}
              onChange={e => setUtilizationReductionPct(+e.target.value)}
              className="w-full accent-emerald-600" />
            <div className="flex justify-between text-[10px] text-slate-400 mt-0.5"><span>0%</span><span>20%</span></div>
          </div>
        </div>
      </div>

      {/* Revenue comparison chart */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6">
        <h3 className="text-sm font-black uppercase tracking-wider text-slate-500 mb-1">Revenue Trajectory</h3>
        <p className="text-xs text-slate-400 mb-6">Global budget vs FFS counterfactual over transition period</p>
        <div className="flex items-end gap-3 h-40">
          {yearlyProjections.map(d => (
            <div key={d.year} className="flex-1 flex flex-col items-center gap-0.5">
              <div className="w-full flex-1 flex gap-0.5 items-end">
                {/* FFS bar */}
                <div className="flex-1 flex items-end">
                  <div
                    className="w-full rounded-t bg-slate-200"
                    style={{ height: `${(d.ffsRevenueM / maxRevenue) * 100}%` }}
                  />
                </div>
                {/* GB bar */}
                <div className="flex-1 flex items-end">
                  <div
                    className="w-full rounded-t bg-emerald-400"
                    style={{ height: `${(d.totalGbRevenueM / maxRevenue) * 100}%` }}
                  />
                </div>
              </div>
              <div className="text-[10px] text-slate-400">{d.year}</div>
            </div>
          ))}
        </div>
        <div className="flex gap-4 mt-3 text-xs">
          <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded bg-slate-200 inline-block" />FFS baseline</span>
          <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded bg-emerald-400 inline-block" />Global budget</span>
        </div>
      </div>

      {/* Payer mix at maturity */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6">
        <h3 className="text-sm font-black uppercase tracking-wider text-slate-500 mb-4">Current Payer Mix</h3>
        <ProgressBar pct={preset.medicaidPct} color="bg-violet-400" label="Medicaid" />
        <ProgressBar pct={preset.medicarePct} color="bg-blue-400" label="Medicare" />
        <ProgressBar pct={preset.commercialPct} color="bg-emerald-400" label="Commercial" />
        <ProgressBar pct={preset.selfPayPct} color="bg-amber-400" label="Self-pay / Uninsured" />
      </div>

      {/* End-state summary */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <div className="bg-white border border-slate-200 rounded-xl p-4 text-center">
          <div className="text-xl font-black text-emerald-700">{fmt(finalYear.totalGbRevenueM)}</div>
          <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wide">Year 7 GB Revenue</div>
        </div>
        <div className="bg-white border border-slate-200 rounded-xl p-4 text-center">
          <div className={`text-xl font-black ${finalYear.projectedMarginPct >= 0 ? 'text-emerald-700' : 'text-rose-700'}`}>
            {fmtPct(finalYear.projectedMarginPct)}
          </div>
          <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wide">Projected Margin</div>
        </div>
        <div className="bg-white border border-slate-200 rounded-xl p-4 text-center">
          <div className={`text-xl font-black ${finalYear.netDeltaVsFfsM >= 0 ? 'text-emerald-700' : 'text-rose-700'}`}>
            {finalYear.netDeltaVsFfsM >= 0 ? '+' : ''}{fmt(finalYear.netDeltaVsFfsM)}
          </div>
          <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wide">vs FFS Counterfactual</div>
        </div>
        <div className="bg-white border border-slate-200 rounded-xl p-4 text-center">
          <div className="text-xl font-black text-emerald-700">{fmt(finalYear.adminSavingsM + finalYear.utilizationCostSavingsM)}</div>
          <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wide">Cost Savings</div>
          <div className="text-[10px] text-slate-400">admin + utilization</div>
        </div>
      </div>

      {/* Year table */}
      <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-100">
          <h3 className="text-sm font-black uppercase tracking-wider text-slate-500">Projection Detail</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="text-left px-4 py-2.5 font-black text-slate-600">Year</th>
                <th className="text-right px-4 py-2.5 font-black text-slate-500">FFS Baseline</th>
                <th className="text-right px-4 py-2.5 font-black text-emerald-700">GB Revenue</th>
                <th className="text-right px-4 py-2.5 font-black text-emerald-600">Admin Savings</th>
                <th className="text-right px-4 py-2.5 font-black text-slate-700">Margin %</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {yearlyProjections.map(d => (
                <tr key={d.year}>
                  <td className="px-4 py-2.5 font-bold text-slate-700">{d.year}</td>
                  <td className="px-4 py-2.5 text-right text-slate-400">{fmt(d.ffsRevenueM)}</td>
                  <td className="px-4 py-2.5 text-right text-emerald-700 font-bold">{fmt(d.totalGbRevenueM)}</td>
                  <td className="px-4 py-2.5 text-right text-emerald-600">{fmt(d.adminSavingsM)}</td>
                  <td className={`px-4 py-2.5 text-right font-black ${d.projectedMarginPct >= 0 ? 'text-emerald-700' : 'text-rose-700'}`}>
                    {fmtPct(d.projectedMarginPct)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 text-xs text-slate-500 leading-relaxed">
        <span className="font-bold text-slate-700">Methodology:</span> Global budget growth benchmarked to Vermont GMCB methodology
        and Maryland Total Cost of Care model experience. FFS baseline growth from CMS National Health Expenditure projections.
        Administrative savings estimates from NEJM Catalyst and Health Affairs research on global budget programs.
        Risk corridor structure modeled on Maryland TCOC program design. All outputs are directional estimates.
      </div>
    </div>
  )
}
