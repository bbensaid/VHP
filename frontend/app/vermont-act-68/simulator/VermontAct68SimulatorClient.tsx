'use client'

// Vermont Act 68 Explorer — rebuilt 2026-11-23.
//
// The previous "simulator" priced each provision with invented annual cost and
// savings figures (e.g. "$310M/yr" for global budgets), scored named hospitals on
// an unsourced "RBP readiness" scale, listed provisions Act 68 does not contain
// (a mandated "workforce stability requirement"), and carried hospital margins
// that contradict the Oliver Wyman per-hospital data (e.g. Porter −2.2% vs +7.6%).
//
// Every figure below now comes from one of three places, named on the page:
//   • Act 68 of 2025 as enacted, and the GMCB's Feb 17, 2026 Act 68 update
//   • Oliver Wyman, Act 167 Community Engagement: Recommendations (rev. Oct 21, 2024)
//   • CMS Hospital Provider Cost Report, FY2023
// (all three extracted in book-audit/deep/sources/vt_hospitals_sourced_2026-10-17.json
//  and book-audit/deep/VERIFIED_FACTS.md). No projected dollar impact is shown,
// because no public source estimates one per provision.

import { useState } from 'react'
import Link from 'next/link'
import { ArrowTopRightOnSquareIcon } from '@heroicons/react/24/outline'

// ─── Provisions (Act 68 of 2025, signed June 12, 2025) ─────────────────────────

type Provision = {
  id: string
  title: string
  when: string
  what: string
  status: string
  conditional?: string
}

const PROVISIONS: Provision[] = [
  {
    id: 'rbp',
    title: 'Hospital reference-based pricing',
    when: 'Methodology by rule in 2027 · maximum rates from hospital FY2028',
    what: 'The GMCB must set reference-based prices — the maximum amounts Vermont hospitals may accept as payment in full from commercial payers — and review them in each annual hospital budget. Act 68 gives the Board no authority over Medicare or Medicaid rates.',
    status: 'The statute says "not later than hospital fiscal year 2027"; the GMCB\'s February 17, 2026 Act 68 update puts the methodology into rule in 2027 with maximum rates effective in HFY2028. S.190 (2026), which would have accelerated RBP, was vetoed on June 16, 2026.',
  },
  {
    id: 'global-budgets',
    title: 'Hospital global budgets',
    when: 'First wave by HFY2028 (non-critical-access) · all hospitals by HFY2030',
    what: 'Global budgets for one or more hospitals that are not critical access hospitals beginning no later than HFY2028, and for all hospitals by HFY2030. They include Medicare to the extent federal law permits and, by statute, exclude Medicaid.',
    status: 'Medicare participation is unresolved after Vermont withdrew from the federal AHEAD model in July 2026.',
    conditional: 'Both deadlines apply "to the extent that resources are available".',
  },
  {
    id: 'spending-reduction',
    title: 'Hospital spending reduction for HFY2026',
    when: 'HFY2026 (Oct 1, 2025 – Sep 30, 2026)',
    what: 'AHS must coordinate a reduction in hospital spending of not less than 2.5% for HFY2026, with monthly progress updates.',
    status: 'The GMCB\'s FY2027 budget orders (September 2026) separately cut commercial rates 2.9% statewide.',
  },
  {
    id: 'strategic-plan',
    title: 'Statewide Health Care Delivery Strategic Plan',
    when: 'Due January 15, 2028 · updated every 3 years from December 1, 2030',
    what: 'A statewide plan that must include annual total-cost-of-care targets and targets for the share of spending on primary care (including mental health) and preventive care.',
    status: 'Not yet due.',
  },
  {
    id: 'hcdac',
    title: 'Health Care Delivery Advisory Committee',
    when: 'Created by Act 68',
    what: 'An 18-member committee chaired by the Secretary of Human Services — including the GMCB Chair, the Chief Health Care Advocate, a commercial insurer, two hospitals, an FQHC, physicians, APRNs, designated agencies, home health, long-term care and small business — that establishes health care affordability benchmarks, monitors system performance, works with AHS on the Strategic Plan, and makes recommendations to the General Assembly (18 V.S.A. § 9403a).',
    status: 'Act 68 also creates a 16-member Vermont Steering Committee for Comprehensive Primary Health Care.',
  },
  {
    id: 'uhds',
    title: 'Unified Health Data Space',
    when: 'Clinical–claims integration no earlier than January 1, 2027',
    what: 'AHS, with the HIE Steering Committee, builds a unified data space. Linking clinical data with claims may begin no earlier than January 1, 2027, and only on a majority vote of the Steering Committee.',
    status: 'A governance gate, not only a technical one: the vote is a precondition.',
  },
  {
    id: 'oversight',
    title: 'GMCB data access and price-to-premium monitoring',
    when: 'In force on enactment',
    what: 'Providers must give the GMCB unredacted contracts on request; the Board may share subpoenaed material with AHS and the Department of Financial Regulation; the GMCB and DFR must monitor whether lower hospital prices reach premiums. Act 68 funds three new GMCB positions for RBP and $2M in AHS incentive grants.',
    status: 'Ongoing.',
  },
]

// ─── Hospitals (14) ────────────────────────────────────────────────────────────
// margin, opResultM, fy28: Oliver Wyman per-hospital pages (2023 operating margin; 2023
// operating result in $M where positive = loss; FY2028 projected loss $M at 5% / 7–8%
// expense growth). beds, discharges: CMS cost report FY2023. atRisk: Oliver Wyman's
// named at-risk list.

type Hospital = {
  id: string; name: string; city: string; cah: boolean
  margin: number; opResultM: number; fy28: [number, number]
  beds: number; discharges: number; atRisk?: boolean
}

const HOSPITALS: Hospital[] = [
  { id: 'uvmmc', name: 'University of Vermont Medical Center', city: 'Burlington', cah: false, margin: 3.1, opResultM: -64.6, fy28: [105, 486.4], beds: 448, discharges: 20252 },
  { id: 'rrmc', name: 'Rutland Regional Medical Center', city: 'Rutland', cah: false, margin: 2.1, opResultM: -7.4, fy28: [20.6, 79.9], beds: 142, discharges: 5482 },
  { id: 'cvmc', name: 'Central Vermont Medical Center', city: 'Berlin', cah: false, margin: -6.5, opResultM: 17.8, fy28: [44.0, 74.3], beds: 88, discharges: 3514 },
  { id: 'svmc', name: 'Southwestern Vermont Medical Center', city: 'Bennington', cah: false, margin: -3.8, opResultM: 7.4, fy28: [24.5, 58.0], beds: 53, discharges: 2828 },
  { id: 'nmc', name: 'Northwestern Medical Center', city: 'St. Albans', cah: false, margin: -6.6, opResultM: 8.2, fy28: [20.9, 44.4], beds: 53, discharges: 2301 },
  { id: 'bmh', name: 'Brattleboro Memorial Hospital', city: 'Brattleboro', cah: false, margin: -1.7, opResultM: 1.9, fy28: [12.4, 29.8], beds: 47, discharges: 2010 },
  { id: 'porter', name: 'Porter Medical Center', city: 'Middlebury', cah: true, margin: 7.6, opResultM: -9.0, fy28: [3.5, 10.8], beds: 25, discharges: 1545 },
  { id: 'copley', name: 'Copley Hospital', city: 'Morrisville', cah: true, margin: -1.8, opResultM: 1.7, fy28: [7.0, 16.5], beds: 25, discharges: 1380 },
  { id: 'north-country', name: 'North Country Hospital', city: 'Newport', cah: true, margin: -8.9, opResultM: 8.8, fy28: [17.3, 28.9], beds: 25, discharges: 1363, atRisk: true },
  { id: 'nvrh', name: 'Northeastern Vermont Regional Hospital', city: 'St. Johnsbury', cah: true, margin: 0.5, opResultM: -0.6, fy28: [5.2, 19.2], beds: 25, discharges: 1331 },
  { id: 'gifford', name: 'Gifford Medical Center', city: 'Randolph', cah: true, margin: -8.3, opResultM: 4.7, fy28: [1.3, 6.0], beds: 25, discharges: 815, atRisk: true },
  { id: 'springfield', name: 'Springfield Hospital', city: 'Springfield', cah: true, margin: -0.9, opResultM: 0.6, fy28: [5.0, 10.4], beds: 25, discharges: 584, atRisk: true },
  { id: 'mt-ascutney', name: 'Mt. Ascutney Hospital and Health Center', city: 'Windsor', cah: true, margin: 2.0, opResultM: -1.4, fy28: [1.4, 8.2], beds: 25, discharges: 319 },
  { id: 'grace-cottage', name: 'Grace Cottage Family Health & Hospital', city: 'Townshend', cah: true, margin: -8.9, opResultM: 2.3, fy28: [4.6, 9.9], beds: 19, discharges: 102, atRisk: true },
]

// ─── Timeline ─────────────────────────────────────────────────────────────────

const TIMELINE: { date: string; event: string; kind: 'act68' | 'context' }[] = [
  { date: 'Jun 12, 2025', event: 'Act 68 signed.', kind: 'act68' },
  { date: 'Aug 1, 2025', event: 'AHS monthly outcome-measure reports begin (through Jan 1, 2027).', kind: 'act68' },
  { date: 'Oct 1, 2025', event: 'HFY2026 begins — the year of the ≥2.5% hospital spending reduction.', kind: 'act68' },
  { date: 'Jan 2026', event: 'Vermont launches a Medicaid hospital global budget on state authority.', kind: 'context' },
  { date: 'Feb 17, 2026', event: 'GMCB Act 68 update: RBP methodology by rule in 2027, maximum rates HFY2028.', kind: 'act68' },
  { date: 'Jun 16, 2026', event: 'S.190 (faster RBP) vetoed.', kind: 'context' },
  { date: 'Jul 2026', event: 'Vermont withdraws from AHEAD; CMS rules the Medicaid hospital global budget not approved under Global Commitment and payments stop July 31.', kind: 'context' },
  { date: 'Sep 2026', event: 'GMCB FY2027 hospital budget orders cut commercial rates 2.9% statewide.', kind: 'context' },
  { date: 'Jan 1, 2027', event: 'Earliest date for clinical–claims integration in the Unified Health Data Space (Steering Committee vote required).', kind: 'act68' },
  { date: '2027', event: 'GMCB sets the RBP methodology by rule.', kind: 'act68' },
  { date: 'Oct 1, 2027', event: 'HFY2028 begins — maximum RBP rates effective; first global budgets for non-critical-access hospitals (resources permitting).', kind: 'act68' },
  { date: 'Jan 15, 2028', event: 'Statewide Health Care Delivery Strategic Plan due.', kind: 'act68' },
  { date: 'HFY2030', event: 'Global budgets for all hospitals (resources permitting).', kind: 'act68' },
  { date: 'Dec 1, 2030', event: 'First three-year update of the Strategic Plan.', kind: 'act68' },
]

const fmtM = (v: number) => `$${Math.abs(v).toFixed(1)}M`

export default function VermontAct68SimulatorClient() {
  const [activeTab, setActiveTab] = useState<'provisions' | 'hospitals' | 'timeline'>('provisions')
  const [selectedHospital, setSelectedHospital] = useState('rrmc')
  const hospital = HOSPITALS.find(h => h.id === selectedHospital)!
  const inLoss = HOSPITALS.filter(h => h.margin < 0).length

  return (
    <div className="min-h-screen bg-white">
      <div className="bg-slate-50 border-b border-slate-200">
        <div className="max-w-5xl mx-auto px-6 py-10">
          <div className="flex items-center gap-3 mb-4 flex-wrap">
            <Link href="/vermont-act-68" className="text-xs font-bold text-slate-500 hover:text-slate-800 transition-colors">← Vermont Act 68</Link>
            <span className="text-slate-300">/</span>
            <span className="text-[10px] font-black uppercase tracking-widest text-rose-600 bg-rose-50 border border-rose-200 px-2.5 py-1 rounded">VT · Vermont</span>
          </div>
          <h1 className="text-3xl font-black text-slate-900 mb-3 leading-tight">Vermont Act 68 Explorer</h1>
          <p className="text-slate-600 max-w-2xl text-sm leading-relaxed mb-6">
            What Act 68 of 2025 actually requires, when, and the starting position of each of Vermont&apos;s 14 hospitals —
            from the statute, the Green Mountain Care Board, Oliver Wyman&apos;s Act 167 report and CMS cost reports.
            No projected dollar impact is shown: no public source estimates one per provision.
          </p>
          <div className="flex flex-wrap gap-3">
            {[['14', 'Hospitals'], [`${inLoss} of 14`, 'Operating losses, 2023 (OW)'], ['HFY2028', 'RBP rates + first global budgets'], ['Jan 15, 2028', 'Strategic Plan due']].map(([v, l]) => (
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
          {(['provisions', 'hospitals', 'timeline'] as const).map(tab => (
            <button key={tab} onClick={() => setActiveTab(tab)}
              className={`px-5 py-2.5 text-sm font-bold border-b-2 -mb-px transition-all ${
                activeTab === tab ? 'border-rose-600 text-rose-700' : 'border-transparent text-slate-500 hover:text-slate-700'
              }`}>
              {tab === 'provisions' ? 'Provisions' : tab === 'hospitals' ? 'Hospital Baselines' : 'Timeline'}
            </button>
          ))}
        </div>

        {activeTab === 'provisions' && (
          <div className="space-y-3">
            {PROVISIONS.map(p => (
              <div key={p.id} className="p-5 rounded-xl border border-slate-200 bg-white">
                <div className="flex flex-wrap items-baseline justify-between gap-2 mb-2">
                  <h2 className="text-base font-black text-slate-900">{p.title}</h2>
                  <span className="text-[11px] font-bold text-rose-700 bg-rose-50 border border-rose-200 px-2 py-0.5 rounded">{p.when}</span>
                </div>
                <p className="text-sm text-slate-700 leading-relaxed">{p.what}</p>
                {p.conditional && <p className="text-xs text-amber-800 mt-2"><strong>Condition:</strong> {p.conditional}</p>}
                <p className="text-xs text-slate-500 mt-2"><strong>Status (Nov 2026):</strong> {p.status}</p>
              </div>
            ))}
            <p className="text-[11px] text-slate-500 pt-2">
              Source: Act 68 of 2025 as enacted (legislature.vermont.gov); GMCB Act 68 update, February 17, 2026; GMCB
              press releases. Related federal programs (the Rural Health Transformation Program, the former AHEAD agreement)
              are not Act 68 provisions and are covered on their own pages.
            </p>
          </div>
        )}

        {activeTab === 'hospitals' && (
          <div className="space-y-4">
            <div className="flex flex-wrap gap-2 mb-4">
              {HOSPITALS.map(h => (
                <button key={h.id} onClick={() => setSelectedHospital(h.id)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold border transition-all ${selectedHospital === h.id ? 'bg-rose-600 text-white border-rose-600' : 'bg-white text-slate-600 border-slate-200 hover:border-rose-300'}`}>
                  {h.name.replace(/ (Medical Center|Hospital and Health Center|Family Health & Hospital|Regional Hospital|Hospital)$/, '')}
                </button>
              ))}
            </div>

            <div className="bg-white border border-slate-200 rounded-2xl p-6">
              <div className="flex flex-wrap justify-between gap-4 mb-6">
                <div>
                  <h2 className="text-xl font-black text-slate-900">{hospital.name}</h2>
                  <p className="text-sm text-slate-500">{hospital.city}, Vermont · {hospital.cah ? 'Critical access hospital' : 'Acute care (PPS) hospital'}{hospital.atRisk ? ' · on Oliver Wyman\'s at-risk list' : ''}</p>
                </div>
                <span className={`px-3 py-1.5 rounded-lg text-xs font-bold self-start ${hospital.margin >= 0 ? 'bg-emerald-100 text-emerald-700' : 'bg-rose-100 text-rose-700'}`}>
                  {hospital.margin >= 0 ? '+' : ''}{hospital.margin}% operating margin, 2023
                </span>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
                {[
                  { v: hospital.opResultM <= 0 ? `+${fmtM(hospital.opResultM)}` : `−${fmtM(hospital.opResultM)}`, l: '2023 operating result (OW)' },
                  { v: `${fmtM(hospital.fy28[0])}–${fmtM(hospital.fy28[1])}`, l: 'FY2028 projected loss (OW)' },
                  { v: hospital.beds.toLocaleString("en-US"), l: 'Beds (CMS FY2023)' },
                  { v: hospital.discharges.toLocaleString("en-US"), l: 'Discharges (CMS FY2023)' },
                ].map(({ v, l }) => (
                  <div key={l} className="bg-slate-50 rounded-xl p-3 text-center border border-slate-100">
                    <div className="text-lg font-black text-slate-900">{v}</div>
                    <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wide">{l}</div>
                  </div>
                ))}
              </div>

              <div className="bg-violet-50 border border-violet-200 rounded-xl p-4">
                <div className="text-sm font-bold text-violet-900 mb-1">How Act 68 reaches {hospital.name.split(' ')[0] === 'University' ? 'UVM Medical Center' : hospital.name}</div>
                <p className="text-xs text-violet-800 leading-relaxed">
                  Reference-based pricing applies to its commercial prices from HFY2028.{' '}
                  {hospital.cah
                    ? 'As a critical access hospital it is not in the first global-budget wave; Act 68 brings all hospitals under global budgets by HFY2030, resources permitting.'
                    : 'As a non-critical-access hospital it is eligible for the first global-budget wave, beginning no later than HFY2028, resources permitting.'}
                  {hospital.atRisk && ' Oliver Wyman named it among the four hospitals most at risk, so the transition path for its services matters as much as its budget.'}
                </p>
              </div>
            </div>
            <p className="text-[11px] text-slate-500">
              Sources: Oliver Wyman, <em>Act 167 Community Engagement: Recommendations</em> (rev. Oct 21, 2024), per-hospital pages —
              2023 operating margin and result, and FY2028 projected losses under 5% and 7–8% expense growth; CMS Hospital
              Provider Cost Report, FY2023 — beds and discharges.
            </p>
          </div>
        )}

        {activeTab === 'timeline' && (
          <div>
            <ol className="relative border-l-2 border-slate-200 ml-2 space-y-5">
              {TIMELINE.map(t => (
                <li key={t.date + t.event} className="ml-5">
                  <span className={`absolute -left-[9px] w-4 h-4 rounded-full border-2 border-white ${t.kind === 'act68' ? 'bg-rose-600' : 'bg-slate-400'}`} />
                  <div className="text-xs font-black text-slate-500">{t.date}</div>
                  <div className="text-sm text-slate-800">{t.event}</div>
                </li>
              ))}
            </ol>
            <div className="flex gap-4 text-xs mt-6">
              <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-full bg-rose-600 inline-block" />Act 68 requirement</span>
              <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-full bg-slate-400 inline-block" />Related development</span>
            </div>
          </div>
        )}

        <div className="mt-12 pt-8 border-t border-slate-200 flex flex-wrap gap-3 pb-16">
          <Link href="/vermont-act-68" className="flex items-center gap-1.5 text-xs font-bold text-rose-700 bg-rose-50 border border-rose-200 px-3 py-1.5 rounded-lg hover:bg-rose-100 transition-colors">
            Vermont Act 68 Overview <ArrowTopRightOnSquareIcon className="w-3.5 h-3.5" />
          </Link>
          <Link href="/vermont-act-167/simulator" className="flex items-center gap-1.5 text-xs font-bold text-violet-700 bg-violet-50 border border-violet-200 px-3 py-1.5 rounded-lg hover:bg-violet-100 transition-colors">
            Vermont Act 167 Simulator
          </Link>
          <Link href="/read/chapter-06" className="flex items-center gap-1.5 text-xs font-bold text-slate-600 bg-slate-100 border border-slate-200 px-3 py-1.5 rounded-lg hover:bg-slate-200 transition-colors">
            Book Chapter 6 — Economics pillar
          </Link>
          <Link href="/htr-simulator" className="flex items-center gap-1.5 text-xs font-bold text-slate-600 bg-slate-100 border border-slate-200 px-3 py-1.5 rounded-lg hover:bg-slate-200 transition-colors">
            ← All Simulators
          </Link>
        </div>
      </div>
    </div>
  )
}
