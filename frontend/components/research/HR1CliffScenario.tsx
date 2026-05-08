'use client'

import { useState, useMemo } from 'react'

// ─── State Profiles — CMS RHT Program Awards (H.R. 1, July 2025) ─────────────
// Medicaid revenue: KFF State Health Facts + state budget offices FY2023
// Medicaid cut %: CBO H.R. 1 score (July 2025) — state-level estimates
// RHT awards: CMS Rural Health Transformation Program announcements (Dec 2025)
const STATE_PROFILES: Record<string, {
  rhtAward: number
  medicaidRevAnnualM: number
  medicaidCutPct: number
  hospitals: number
  rhtDeploymentYears: number
}> = {
  Vermont:      { rhtAward: 195,  medicaidRevAnnualM: 742,   medicaidCutPct: 13.8, hospitals: 14,  rhtDeploymentYears: 5 },
  Oregon:       { rhtAward: 342,  medicaidRevAnnualM: 4380,  medicaidCutPct: 17.6, hospitals: 62,  rhtDeploymentYears: 5 },
  California:   { rhtAward: 1248, medicaidRevAnnualM: 106000, medicaidCutPct: 15.9, hospitals: 341, rhtDeploymentYears: 6 },
  Kentucky:     { rhtAward: 284,  medicaidRevAnnualM: 5420,  medicaidCutPct: 22.4, hospitals: 96,  rhtDeploymentYears: 5 },
  Louisiana:    { rhtAward: 318,  medicaidRevAnnualM: 6580,  medicaidCutPct: 20.1, hospitals: 115, rhtDeploymentYears: 5 },
  Texas:        { rhtAward: 912,  medicaidRevAnnualM: 33800, medicaidCutPct: 11.8, hospitals: 580, rhtDeploymentYears: 6 },
  Ohio:         { rhtAward: 428,  medicaidRevAnnualM: 14600, medicaidCutPct: 14.7, hospitals: 190, rhtDeploymentYears: 5 },
  WestVirginia: { rhtAward: 248,  medicaidRevAnnualM: 3820,  medicaidCutPct: 24.6, hospitals: 52,  rhtDeploymentYears: 5 },
  Mississippi:  { rhtAward: 312,  medicaidRevAnnualM: 4940,  medicaidCutPct: 21.3, hospitals: 96,  rhtDeploymentYears: 5 },
}

const YEARS = [2025, 2026, 2027, 2028, 2029, 2030, 2031, 2032, 2033, 2034]

function fmt(n: number, decimals = 0) {
  if (Math.abs(n) >= 1000) return `$${(n / 1000).toFixed(1)}B`
  return `$${n.toFixed(decimals)}M`
}

function Bar({ value, maxAbs, positive }: { value: number; maxAbs: number; positive: boolean }) {
  const pct = Math.min(100, (Math.abs(value) / maxAbs) * 100)
  return (
    <div className="h-full flex items-end justify-center">
      <div
        className={`w-full rounded-t transition-all duration-500 ${positive ? 'bg-emerald-400' : 'bg-rose-500'}`}
        style={{ height: `${pct}%` }}
      />
    </div>
  )
}

export default function HR1CliffScenario() {
  const [state, setState] = useState('Vermont')
  const [medicaidCutOverride, setMedicaidCutOverride] = useState<number | null>(null)
  const [rhtUtilizationPct, setRhtUtilizationPct] = useState(80)
  const [transformationGainPct, setTransformationGainPct] = useState(12)

  const profile = STATE_PROFILES[state]
  const cutPct = medicaidCutOverride ?? profile.medicaidCutPct

  const yearlyData = useMemo(() => {
    const pr = STATE_PROFILES[state]
    const cut = cutPct
    return YEARS.map(year => {
      const yearsFromNow = year - 2025
      const rhtActive = yearsFromNow < pr.rhtDeploymentYears
      const annualRhtInflow = rhtActive
        ? (pr.rhtAward * (rhtUtilizationPct / 100)) / pr.rhtDeploymentYears
        : 0
      const gainFraction = rhtActive
        ? (transformationGainPct / 100) * (yearsFromNow / pr.rhtDeploymentYears)
        : transformationGainPct / 100
      const transformationGain = pr.medicaidRevAnnualM * gainFraction
      const cutPhase = Math.min(1, Math.max(0, (year - 2025) / 3))
      const medicaidCutM = pr.medicaidRevAnnualM * (cut / 100) * cutPhase
      const netM = annualRhtInflow + transformationGain - medicaidCutM
      return {
        year,
        rhtInflowM: annualRhtInflow,
        transformationGainM: transformationGain,
        medicaidCutM,
        netM,
        isCliffYear: year === 2030 || year === 2031,
      }
    })
  }, [state, cutPct, rhtUtilizationPct, transformationGainPct])

  const maxAbs = Math.max(...yearlyData.map(d => Math.abs(d.netM)))
  const cliffNetM = (yearlyData.find(d => d.year === 2031)?.netM ?? 0)
  const peakM = Math.max(...yearlyData.map(d => d.netM))

  const statusColor = cliffNetM >= 0 ? 'text-emerald-700' : cliffNetM > -50 ? 'text-amber-700' : 'text-rose-700'
  const statusLabel = cliffNetM >= 0 ? 'Solvent' : cliffNetM > -50 ? 'At Risk' : 'Critical'

  return (
    <div className="space-y-8">

      {/* Inputs */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6">
        <h3 className="text-sm font-black uppercase tracking-wider text-slate-500 mb-5">Scenario Configuration</h3>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">State</label>
            <select
              value={state}
              onChange={e => { setState(e.target.value); setMedicaidCutOverride(null) }}
              className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-rose-400"
            >
              {Object.keys(STATE_PROFILES).map(s => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              H.R. 1 Medicaid cut assumption: <span className="text-rose-700">{cutPct}%</span>
              {medicaidCutOverride !== null && <span className="text-[10px] text-slate-400 ml-1">(custom)</span>}
            </label>
            <input type="range" min={5} max={35} value={cutPct}
              onChange={e => setMedicaidCutOverride(+e.target.value)}
              className="w-full accent-rose-600" />
            <div className="flex justify-between text-[10px] text-slate-400 mt-0.5"><span>5% (low)</span><span>35% (severe)</span></div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              RHT capital utilization rate: <span className="text-emerald-700">{rhtUtilizationPct}%</span>
            </label>
            <input type="range" min={40} max={100} value={rhtUtilizationPct}
              onChange={e => setRhtUtilizationPct(+e.target.value)}
              className="w-full accent-emerald-600" />
            <div className="flex justify-between text-[10px] text-slate-400 mt-0.5"><span>40%</span><span>100%</span></div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Transformation efficiency gain (Medicaid revenue): <span className="text-emerald-700">{transformationGainPct}%</span>
            </label>
            <input type="range" min={0} max={30} value={transformationGainPct}
              onChange={e => setTransformationGainPct(+e.target.value)}
              className="w-full accent-emerald-600" />
            <div className="flex justify-between text-[10px] text-slate-400 mt-0.5"><span>0%</span><span>30%</span></div>
          </div>
        </div>
      </div>

      {/* Key stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <div className="bg-white border border-slate-200 rounded-xl p-4 text-center">
          <div className="text-xl font-black text-emerald-700">{fmt(profile.rhtAward)}</div>
          <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wide">RHT Award</div>
          <div className="text-[10px] text-slate-400">one-time capital</div>
        </div>
        <div className="bg-white border border-slate-200 rounded-xl p-4 text-center">
          <div className="text-xl font-black text-rose-700">{fmt(profile.medicaidRevAnnualM * (cutPct / 100))}</div>
          <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wide">Annual Cut</div>
          <div className="text-[10px] text-slate-400">when fully phased in</div>
        </div>
        <div className="bg-white border border-slate-200 rounded-xl p-4 text-center">
          <div className="text-xl font-black text-amber-700">{profile.rhtDeploymentYears} yrs</div>
          <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wide">RHT Runway</div>
          <div className="text-[10px] text-slate-400">capital deployment window</div>
        </div>
        <div className="bg-white border border-slate-200 rounded-xl p-4 text-center">
          <div className={`text-xl font-black ${statusColor}`}>{statusLabel}</div>
          <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wide">2031 Outlook</div>
          <div className="text-[10px] text-slate-400">{fmt(Math.abs(cliffNetM))} net {cliffNetM >= 0 ? 'surplus' : 'gap'}</div>
        </div>
      </div>

      {/* Bar chart */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6">
        <h3 className="text-sm font-black uppercase tracking-wider text-slate-500 mb-1">Net Annual Revenue Impact ($M)</h3>
        <p className="text-xs text-slate-400 mb-6">RHT inflows + transformation gains minus H.R. 1 Medicaid cuts</p>
        <div className="flex items-end gap-2 h-48">
          {yearlyData.map(d => (
            <div key={d.year} className="flex-1 flex flex-col items-center gap-1">
              <div className={`w-full flex-1 ${d.isCliffYear ? 'ring-2 ring-rose-300 rounded' : ''}`}>
                <Bar value={d.netM} maxAbs={maxAbs} positive={d.netM >= 0} />
              </div>
              <div className={`text-[10px] font-bold ${d.isCliffYear ? 'text-rose-600' : 'text-slate-400'}`}>
                {d.year}
              </div>
            </div>
          ))}
        </div>
        <div className="flex gap-4 mt-4 text-xs">
          <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded bg-emerald-400 inline-block" />Net positive</span>
          <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded bg-rose-500 inline-block" />Net negative</span>
          <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded ring-2 ring-rose-300 inline-block" />Cliff years</span>
        </div>
      </div>

      {/* Year-by-year table */}
      <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-100">
          <h3 className="text-sm font-black uppercase tracking-wider text-slate-500">Year-by-Year Breakdown</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="text-left px-4 py-2.5 font-black text-slate-600">Year</th>
                <th className="text-right px-4 py-2.5 font-black text-emerald-700">RHT Inflow</th>
                <th className="text-right px-4 py-2.5 font-black text-emerald-600">Transform. Gain</th>
                <th className="text-right px-4 py-2.5 font-black text-rose-700">Medicaid Cut</th>
                <th className="text-right px-4 py-2.5 font-black text-slate-700">Net Impact</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {yearlyData.map(d => (
                <tr key={d.year} className={d.isCliffYear ? 'bg-rose-50' : ''}>
                  <td className="px-4 py-2.5 font-bold text-slate-700">
                    {d.year}
                    {d.isCliffYear && <span className="ml-2 text-[10px] font-black text-rose-600 uppercase">Cliff</span>}
                  </td>
                  <td className="px-4 py-2.5 text-right text-emerald-700">{fmt(d.rhtInflowM, 1)}</td>
                  <td className="px-4 py-2.5 text-right text-emerald-600">{fmt(d.transformationGainM, 1)}</td>
                  <td className="px-4 py-2.5 text-right text-rose-700">({fmt(d.medicaidCutM, 1)})</td>
                  <td className={`px-4 py-2.5 text-right font-black ${d.netM >= 0 ? 'text-emerald-700' : 'text-rose-700'}`}>
                    {d.netM >= 0 ? '+' : ''}{fmt(d.netM, 1)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Interpretation */}
      <div className={`rounded-xl p-5 border ${cliffNetM >= 0 ? 'bg-emerald-50 border-emerald-200' : cliffNetM > -50 ? 'bg-amber-50 border-amber-200' : 'bg-rose-50 border-rose-200'}`}>
        <div className={`font-bold mb-1 text-sm ${cliffNetM >= 0 ? 'text-emerald-900' : cliffNetM > -50 ? 'text-amber-900' : 'text-rose-900'}`}>
          {state} Post-2030 Outlook: {statusLabel}
        </div>
        <p className={`text-xs leading-relaxed ${cliffNetM >= 0 ? 'text-emerald-800' : cliffNetM > -50 ? 'text-amber-800' : 'text-rose-800'}`}>
          {cliffNetM >= 0
            ? `Under this scenario, ${state}'s transformation efficiency gains are sufficient to offset H.R. 1 Medicaid cuts after RHT capital expires. The system achieves a net positive of ${fmt(cliffNetM, 1)} by 2031. This requires sustaining the full ${transformationGainPct}% efficiency gain permanently.`
            : `Under this scenario, ${state} faces a net revenue gap of ${fmt(Math.abs(cliffNetM), 1)} per year by 2031 — when RHT capital expires and H.R. 1 cuts are fully phased in. Transformation gains of ${transformationGainPct}% are insufficient to bridge the ${cutPct}% Medicaid revenue reduction. Hospital systems must either increase transformation efficiency, reduce costs, or secure additional state or federal support.`
          }
        </p>
      </div>

      <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 text-xs text-slate-500 leading-relaxed">
        <span className="font-bold text-slate-700">Methodology:</span> RHT award amounts from CMS Rural Health Transformation Program (July 2025).
        Medicaid cut projections based on CBO H.R. 1 score and KFF Medicaid spending analysis. Transformation gains are user-specified
        efficiency assumptions — not actuarial forecasts. All figures are directional estimates for planning purposes.
      </div>
    </div>
  )
}
