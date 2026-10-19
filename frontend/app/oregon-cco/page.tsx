import type { Metadata } from "next";
import { brandedMetadata } from "@/lib/brand-server";
import Link from 'next/link'
import { ArrowTopRightOnSquareIcon } from '@heroicons/react/24/outline'

export async function generateMetadata(): Promise<Metadata> {
  return brandedMetadata("Oregon CCOs", "Oregon's Coordinated Care Organizations — integrating physical, behavioral, and oral health under global budgets with equity accountability and community advisory councils.");
}

function StatBox({ value, label, sub }: { value: string; label: string; sub?: string }) {
  return (
    <div className="bg-white border border-slate-200 rounded-xl p-5 text-center">
      <div className="text-2xl font-black text-emerald-700 mb-1">{value}</div>
      <div className="text-xs font-bold text-slate-700 uppercase tracking-wide">{label}</div>
      {sub && <div className="text-[11px] text-slate-400 mt-1">{sub}</div>}
    </div>
  )
}

function InvestCard({ icon, title, desc, items }: { icon: string; title: string; desc: string; items: string[] }) {
  return (
    <div className="bg-white border border-slate-200 rounded-xl p-5">
      <div className="flex items-start gap-3 mb-3">
        <span className="text-2xl shrink-0">{icon}</span>
        <div>
          <h4 className="font-bold text-slate-900 text-sm">{title}</h4>
          <p className="text-xs text-slate-500 leading-relaxed">{desc}</p>
        </div>
      </div>
      <ul className="space-y-1 pl-1">
        {items.map(i => (
          <li key={i} className="flex items-start gap-2 text-xs text-slate-600">
            <span className="text-emerald-500 shrink-0 mt-0.5">→</span>
            <span>{i}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

const CCO_LIST = [
  { name: 'Advanced Health', area: 'Coos and Curry counties' },
  { name: 'AllCare CCO', area: 'Curry, Josephine, and Jackson counties; part of Douglas' },
  { name: 'Cascade Health Alliance', area: 'Part of Klamath County' },
  { name: 'Columbia Pacific CCO', area: 'Clatsop, Columbia, and Tillamook counties' },
  { name: 'Eastern Oregon CCO', area: 'Baker, Gilliam, Grant, Harney, Lake, Malheur, Morrow, Sherman, Umatilla, Union, Wallowa, and Wheeler counties' },
  { name: 'Health Share of Oregon', area: 'Clackamas, Multnomah, and Washington counties' },
  { name: 'InterCommunity Health Network CCO', area: 'Benton, Lincoln, and Linn counties' },
  { name: 'Jackson Care Connect', area: 'Jackson County' },
  { name: 'PacificSource Community Solutions – Central Oregon', area: 'Deschutes, Crook, and Jefferson counties; part of Klamath' },
  { name: 'PacificSource Community Solutions – Columbia Gorge', area: 'Hood River and Wasco counties' },
  { name: 'PacificSource Community Solutions – Marion/Polk', area: 'Marion and Polk counties' },
  { name: 'Trillium Community Health Plan – Southwest', area: 'Lane County; western Linn and Douglas' },
  { name: 'Trillium Community Health Plan – Tri-County', area: 'Clackamas, Multnomah, and Washington counties' },
  { name: 'Umpqua Health Alliance', area: 'Most of Douglas County' },
  { name: 'Yamhill Community Care', area: 'Yamhill County; parts of Polk and Washington' },
]

export default function OregonCCOPage() {
  return (
    <div className="max-w-5xl mx-auto px-6 py-12">

      {/* Header */}
      <div className="mb-10">
        <div className="flex flex-wrap items-center gap-2 mb-3">
          <span className="text-xs font-black uppercase tracking-widest text-emerald-600">Oregon · Medicaid Transformation</span>
          <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-100 text-emerald-700 border border-emerald-200">CCO 3.0 · next contract round, in planning</span>
        </div>
        <h1 className="text-3xl font-black text-slate-900 mb-4">Oregon CCOs</h1>
        <p className="text-slate-600 max-w-3xl leading-relaxed">
          Oregon&apos;s Coordinated Care Organizations integrate physical, behavioral, and oral health under global budgets,
          with community advisory councils and health equity accountability. Today&apos;s CCOs operate under CCO 2.0 contracts
          (signed for 2020–2024 and since extended); &ldquo;CCO 3.0&rdquo; is OHA&apos;s name for the next contract round, which it is
          still planning. CCOs serve most of Oregon&apos;s 1.4M Oregon Health Plan members.
        </p>
        <div className="flex flex-wrap gap-3 mt-6">
          <Link href="/oregon-cco/simulator"
            className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-black text-sm px-5 py-2.5 rounded-xl transition-colors">
            Open CCO 3.0 Simulator <ArrowTopRightOnSquareIcon className="w-4 h-4" />
          </Link>
          <Link href="/research-lab/payment-models?tab=gb-transition"
            className="inline-flex items-center gap-2 bg-white border border-slate-200 hover:border-emerald-400 text-slate-700 font-bold text-sm px-5 py-2.5 rounded-xl transition-colors">
            Global Budget Modeler
          </Link>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
        <StatBox value="15" label="CCOs" sub="since Feb 2026" />
        <StatBox value="1.4M" label="OHP Members" sub="Oregon Health Plan" />
        <StatBox value="$325M" label="2024 Quality Pool" sub="4.25% of CCO capitation" />
        <StatBox value="36" label="Counties" sub="covered statewide" />
      </div>

      {/* What CCO 3.0 Does */}
      <section className="mb-12">
        <h2 className="text-xl font-black text-slate-900 mb-2">What CCO 2.0 Requires</h2>
        <p className="text-slate-500 mb-6 text-sm max-w-2xl">
          CCO 2.0 contracts (2020 onward) were built on four state priorities: behavioral health, value-based payment,
          social determinants and health equity, and sustainable cost growth. The next round (CCO 3.0) is still in OHA planning.
        </p>
        <div className="grid md:grid-cols-2 gap-4">
          <InvestCard icon="📊" title="Social Determinants & Health Equity"
            desc="CCOs must increase their investment in strategies that address social determinants of health and health equity."
            items={['Increased SDOH and health equity investment', 'Stronger engagement with tribes and community advisory councils', 'Expanded use of traditional health workers']} />
          <InvestCard icon="🧠" title="Behavioral Health Integration"
            desc="Under CCO 2.0, CCOs are fully accountable for the behavioral health benefit."
            items={['Person-centered mental health and substance use disorder system', 'Remove barriers between behavioral, physical and oral health', 'Expand programs integrating primary care into behavioral health settings']} />
          <InvestCard icon="🤝" title="Traditional Health Workers"
            desc="CCO 2.0 calls for increased use of traditional health workers, a category that includes community health workers."
            items={['Traditional health workers include community health workers', 'Supports the SDOH and health equity priority']} />
          <InvestCard icon="💰" title="Global Budget Methodology"
            desc="CCO global budgets may grow no more than 3.4% per member per year, in line with the state cost growth target."
            items={['Growth cap: 3.4% per member per year', 'Goal: 70% of CCO provider payments value-based by the end of the contract period', 'Quality Pool bonus on top of capitation: 4.25% of total PMPM ($325M in 2024)']} />
        </div>
      </section>

      {/* CCO Directory */}
      <section className="mb-12">
        <h2 className="text-xl font-black text-slate-900 mb-4">Oregon CCO Directory</h2>
        <p className="text-xs text-slate-500 mb-3">Service areas per Oregon Health Authority, 2026. PacificSource left Lane County on Feb 1, 2026.</p>
        <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="text-left px-4 py-3 font-black text-slate-600 text-xs uppercase tracking-wide">CCO</th>
                <th className="text-left px-4 py-3 font-black text-slate-600 text-xs uppercase tracking-wide">Service Area</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {CCO_LIST.map(cco => (
                <tr key={cco.name} className="hover:bg-slate-50 transition-colors">
                  <td className="px-4 py-3 font-bold text-slate-900">{cco.name}</td>
                  <td className="px-4 py-3 text-slate-500">{cco.area}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Post-2030 outlook */}
      <section className="mb-12">
        <div className="bg-rose-50 border border-rose-200 rounded-2xl p-6">
          <span className="text-[10px] font-black uppercase tracking-widest text-rose-700 block mb-2">H.R. 1 Intersection</span>
          <h2 className="text-xl font-black text-slate-900 mb-3">H.R. 1 Risk for Oregon CCOs</h2>
          <p className="text-slate-600 text-sm leading-relaxed mb-4">
            Oregon&apos;s CCO model is highly exposed to H.R. 1 Medicaid cuts — OHP members represent 34% of the state&apos;s
            population. KFF&apos;s allocation of CBO&apos;s estimate places Oregon among the four hardest-hit states, with federal Medicaid cuts of 19% or more through 2034. CCO global budgets
            will need to absorb this reduction while maintaining equity performance standards.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link href="/research-lab/policy-quality?tab=hr1-cliff"
              className="inline-flex items-center gap-2 bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-sm px-4 py-2 rounded-lg transition-colors">
              Model Oregon H.R. 1 Cliff <ArrowTopRightOnSquareIcon className="w-3.5 h-3.5" />
            </Link>
            <Link href="/research-lab/policy-quality?tab=scorecard"
              className="inline-flex items-center gap-2 bg-white border border-slate-200 hover:border-slate-300 text-slate-700 font-bold text-sm px-4 py-2 rounded-lg transition-colors">
              Hospital Stress Test
            </Link>
          </div>
        </div>
      </section>

      {/* Related tools */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {[
          { href: '/oregon-cco/simulator', emoji: '⚙️', title: 'CCO 3.0 Simulator', desc: 'Model CCO scenario impact' },
          { href: '/research-lab/payment-models?tab=gb-transition', emoji: '📊', title: 'Global Budget Modeler', desc: 'FFS to global budget transition' },
          { href: '/research-lab/policy-quality?tab=hr1-cliff', emoji: '📉', title: 'H.R. 1 Cliff Scenario', desc: 'Post-2030 Medicaid cliff' },
          { href: '/research-lab/population-equity?tab=equity', emoji: '⚖️', title: 'Health Equity Studio', desc: 'Disparity analysis tools' },
        ].map(t => (
          <Link key={t.href} href={t.href}
            className="group flex flex-col gap-2 p-4 rounded-xl border-2 border-emerald-100 hover:border-emerald-300 hover:bg-emerald-50 transition-all">
            <div className="flex items-center gap-2">
              <span className="text-xl leading-none">{t.emoji}</span>
              <span className="text-sm font-bold text-slate-800 group-hover:text-emerald-700 leading-tight">{t.title}</span>
            </div>
            <p className="text-xs text-slate-500 leading-relaxed">{t.desc}</p>
          </Link>
        ))}
      </div>
    </div>
  )
}
