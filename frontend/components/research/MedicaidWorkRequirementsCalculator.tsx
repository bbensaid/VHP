'use client'

import { useState, useMemo } from 'react'

const STATE_DATA: Record<string, { medicaidPop: number; hospitals: number; avgMedicaidRevM: number }> = {
  Vermont:       { medicaidPop: 210000, hospitals: 14,  avgMedicaidRevM: 48  },
  California:    { medicaidPop: 14200000, hospitals: 341, avgMedicaidRevM: 210 },
  Oregon:        { medicaidPop: 1400000, hospitals: 62,  avgMedicaidRevM: 95  },
  Texas:         { medicaidPop: 4800000, hospitals: 580, avgMedicaidRevM: 88  },
  NewYork:       { medicaidPop: 7200000, hospitals: 210, avgMedicaidRevM: 320 },
  Ohio:          { medicaidPop: 3100000, hospitals: 190, avgMedicaidRevM: 112 },
  Pennsylvania:  { medicaidPop: 3400000, hospitals: 175, avgMedicaidRevM: 130 },
  Michigan:      { medicaidPop: 2900000, hospitals: 148, avgMedicaidRevM: 105 },
  Kentucky:      { medicaidPop: 1600000, hospitals: 96,  avgMedicaidRevM: 72  },
  Louisiana:     { medicaidPop: 2100000, hospitals: 115, avgMedicaidRevM: 68  },
}

const SCENARIO_PRESETS = [
  { id: 'low',    label: 'Low Impact',      adminErrorRate: 5,  exemptionRate: 45, enforcementDelay: 18 },
  { id: 'mid',    label: 'Moderate Impact', adminErrorRate: 12, exemptionRate: 32, enforcementDelay: 9  },
  { id: 'high',   label: 'High Impact',     adminErrorRate: 20, exemptionRate: 20, enforcementDelay: 3  },
  { id: 'custom', label: 'Custom',          adminErrorRate: 12, exemptionRate: 32, enforcementDelay: 9  },
]

function Gauge({ pct, color, label }: { pct: number; color: string; label: string }) {
  const r = 36
  const circ = 2 * Math.PI * r
  const dash = (pct / 100) * circ
  return (
    <div className="flex flex-col items-center gap-1">
      <svg width="88" height="88" viewBox="0 0 88 88">
        <circle cx="44" cy="44" r={r} fill="none" stroke="#e2e8f0" strokeWidth="7" />
        <circle cx="44" cy="44" r={r} fill="none" stroke={color} strokeWidth="7"
          strokeDasharray={`${dash} ${circ - dash}`} strokeLinecap="round"
          transform="rotate(-90 44 44)" />
        <text x="44" y="49" textAnchor="middle" fontSize="15" fontWeight="800" fill="#0f172a">{pct}%</text>
      </svg>
      <span className="text-[11px] font-bold text-slate-500 text-center leading-tight max-w-[90px]">{label}</span>
    </div>
  )
}

function StatBox({ value, label, sub, color = 'text-slate-900' }: { value: string; label: string; sub?: string; color?: string }) {
  return (
    <div className="bg-white border border-slate-200 rounded-xl p-4 text-center">
      <div className={`text-xl font-black mb-0.5 ${color}`}>{value}</div>
      <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wide leading-tight">{label}</div>
      {sub && <div className="text-[10px] text-slate-400 mt-0.5">{sub}</div>}
    </div>
  )
}

export default function MedicaidWorkRequirementsCalculator() {
  const [state, setState] = useState('Vermont')
  const [scenarioId, setScenarioId] = useState('mid')
  const [adminErrorRate, setAdminErrorRate] = useState(12)
  const [exemptionRate, setExemptionRate] = useState(32)
  const [enforcementDelay, setEnforcementDelay] = useState(9)
  const [workCapablePct, setWorkCapablePct] = useState(35)

  const isCustom = scenarioId === 'custom'

  function applyPreset(id: string) {
    setScenarioId(id)
    if (id !== 'custom') {
      const p = SCENARIO_PRESETS.find(s => s.id === id)!
      setAdminErrorRate(p.adminErrorRate)
      setExemptionRate(p.exemptionRate)
      setEnforcementDelay(p.enforcementDelay)
    }
  }

  const data = STATE_DATA[state]

  const results = useMemo(() => {
    const d = STATE_DATA[state]
    const workCapable = Math.round(d.medicaidPop * (workCapablePct / 100))
    const alreadyWorking = Math.round(workCapable * 0.58)
    const atRisk = workCapable - alreadyWorking
    const exempted = Math.round(atRisk * (exemptionRate / 100))
    const adminLost = Math.round((atRisk - exempted) * (adminErrorRate / 100))
    const totalLost = Math.round((atRisk - exempted) * (1 - exemptionRate / 100) * 0.3 + adminLost)
    const coverageLossPct = Math.round((totalLost / d.medicaidPop) * 100)
    const revenueImpactPerHospitalM = (totalLost / d.medicaidPop) * d.avgMedicaidRevM
    const totalSystemImpactM = revenueImpactPerHospitalM * d.hospitals
    const adminBurdenM = (d.medicaidPop * 320) / 1_000_000

    return {
      workCapable,
      atRisk,
      adminLost,
      totalLost,
      coverageLossPct,
      revenueImpactPerHospitalM,
      totalSystemImpactM,
      adminBurdenM,
      monthsToEffect: enforcementDelay,
    }
  }, [state, adminErrorRate, exemptionRate, enforcementDelay, workCapablePct])

  const fmt = (n: number) => n >= 1000 ? `${(n / 1000).toFixed(1)}K` : `${n}`
  const fmtM = (n: number) => `$${n.toFixed(1)}M`

  return (
    <div className="space-y-8">

      {/* Inputs */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6">
        <h3 className="text-sm font-black uppercase tracking-wider text-slate-500 mb-5">Configuration</h3>

        <div className="grid md:grid-cols-2 gap-6 mb-6">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">State</label>
            <select
              value={state}
              onChange={e => setState(e.target.value)}
              className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-sky-400"
            >
              {Object.keys(STATE_DATA).map(s => (
                <option key={s} value={s}>{s.replace(/([A-Z])/g, ' $1').trim()}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Impact Scenario</label>
            <div className="flex flex-wrap gap-2">
              {SCENARIO_PRESETS.map(p => (
                <button
                  key={p.id}
                  onClick={() => applyPreset(p.id)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold border transition-all ${
                    scenarioId === p.id
                      ? 'bg-sky-600 text-white border-sky-600'
                      : 'bg-white text-slate-600 border-slate-200 hover:border-slate-300'
                  }`}
                >
                  {p.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Work-capable adult share of Medicaid population: <span className="text-sky-700">{workCapablePct}%</span>
            </label>
            <input type="range" min={20} max={60} value={workCapablePct}
              onChange={e => setWorkCapablePct(+e.target.value)}
              className="w-full accent-sky-600" />
            <div className="flex justify-between text-[10px] text-slate-400 mt-0.5"><span>20%</span><span>60%</span></div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Exemption rate (medical, caregiving, etc.): <span className={isCustom ? 'text-sky-700' : 'text-slate-400'}>{exemptionRate}%</span>
            </label>
            <input type="range" min={5} max={70} value={exemptionRate}
              disabled={!isCustom}
              onChange={e => setExemptionRate(+e.target.value)}
              className="w-full accent-sky-600 disabled:opacity-40" />
            <div className="flex justify-between text-[10px] text-slate-400 mt-0.5"><span>5%</span><span>70%</span></div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Administrative error / disenrollment rate: <span className={isCustom ? 'text-sky-700' : 'text-slate-400'}>{adminErrorRate}%</span>
            </label>
            <input type="range" min={2} max={35} value={adminErrorRate}
              disabled={!isCustom}
              onChange={e => setAdminErrorRate(+e.target.value)}
              className="w-full accent-sky-600 disabled:opacity-40" />
            <div className="flex justify-between text-[10px] text-slate-400 mt-0.5"><span>2%</span><span>35%</span></div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Enforcement delay (months): <span className={isCustom ? 'text-sky-700' : 'text-slate-400'}>{enforcementDelay} mo</span>
            </label>
            <input type="range" min={0} max={36} value={enforcementDelay}
              disabled={!isCustom}
              onChange={e => setEnforcementDelay(+e.target.value)}
              className="w-full accent-sky-600 disabled:opacity-40" />
            <div className="flex justify-between text-[10px] text-slate-400 mt-0.5"><span>0 mo</span><span>36 mo</span></div>
          </div>
        </div>
      </div>

      {/* Gauges */}
      <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6">
        <h3 className="text-sm font-black uppercase tracking-wider text-slate-500 mb-6">Coverage Loss Breakdown</h3>
        <div className="flex flex-wrap justify-around gap-6">
          <Gauge pct={workCapablePct} color="#0ea5e9" label="Work-capable adults" />
          <Gauge pct={Math.round((results.atRisk / data.medicaidPop) * 100)} color="#f59e0b" label="At-risk (non-exempt)" />
          <Gauge pct={adminErrorRate} color="#ef4444" label="Admin disenrollment rate" />
          <Gauge pct={results.coverageLossPct} color="#dc2626" label="Net coverage loss" />
        </div>
      </div>

      {/* Key metrics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <StatBox value={fmt(results.workCapable)} label="Work-capable adults" sub="in Medicaid" />
        <StatBox value={fmt(results.totalLost)} label="Projected coverage loss" color="text-rose-700" />
        <StatBox value={fmtM(results.revenueImpactPerHospitalM)} label="Avg revenue impact" sub="per hospital" color="text-amber-700" />
        <StatBox value={fmtM(results.totalSystemImpactM)} label="Total system revenue impact" color="text-rose-800" />
      </div>

      {/* Timeline */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6">
        <h3 className="text-sm font-black uppercase tracking-wider text-slate-500 mb-4">Implementation Timeline</h3>
        <div className="space-y-3">
          {[
            { label: 'Rule finalization & systems build', start: 0, end: 6, color: 'bg-slate-300' },
            { label: 'State outreach & enrollment prep', start: 3, end: enforcementDelay, color: 'bg-sky-300' },
            { label: 'Enforcement begins', start: enforcementDelay, end: enforcementDelay + 3, color: 'bg-amber-400' },
            { label: 'Coverage losses materialize', start: enforcementDelay + 1, end: enforcementDelay + 9, color: 'bg-rose-400' },
            { label: 'Hospital revenue impact', start: enforcementDelay + 3, end: enforcementDelay + 12, color: 'bg-rose-600' },
          ].map(row => {
            const total = enforcementDelay + 14
            const leftPct = (row.start / total) * 100
            const widthPct = Math.max(3, ((row.end - row.start) / total) * 100)
            return (
              <div key={row.label}>
                <div className="text-xs font-bold text-slate-600 mb-1">{row.label}</div>
                <div className="h-5 bg-slate-100 rounded-full relative overflow-hidden">
                  <div
                    className={`absolute h-full rounded-full ${row.color}`}
                    style={{ left: `${leftPct}%`, width: `${widthPct}%` }}
                  />
                </div>
              </div>
            )
          })}
          <div className="flex justify-between text-[10px] text-slate-400 mt-1">
            <span>Month 0</span><span>Month {enforcementDelay + 14}</span>
          </div>
        </div>
      </div>

      {/* Admin burden */}
      <div className="bg-amber-50 border border-amber-200 rounded-xl p-5">
        <div className="font-bold text-amber-900 mb-1 text-sm">Administrative Burden Estimate</div>
        <p className="text-xs text-amber-800 leading-relaxed">
          Based on CBO estimates of ~$320 per enrollee in new administrative costs, {state.replace(/([A-Z])/g, ' $1').trim()} faces
          an estimated <span className="font-black">{fmtM(results.adminBurdenM)}</span> in additional annual administrative
          spending to implement work requirement verification — before a single coverage determination is made.
        </p>
      </div>

      {/* Methodology note */}
      <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 text-xs text-slate-500 leading-relaxed">
        <span className="font-bold text-slate-700">Methodology:</span> Coverage loss modeled using CBO work requirement
        analysis (2023), KFF Medicaid enrollment data, and CBPP administrative burden research. Revenue impact uses
        state-average Medicaid revenue per hospital from AHA Annual Survey. All outputs are directional estimates —
        not actuarial projections.
      </div>
    </div>
  )
}
