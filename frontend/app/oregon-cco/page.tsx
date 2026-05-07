import Link from 'next/link'
import { ArrowTopRightOnSquareIcon } from '@heroicons/react/24/outline'

export const metadata = {
  title: 'Oregon CCO 3.0 | Health Transformation Review',
  description: "Oregon's third-generation Coordinated Care Organizations model — integrating physical, behavioral, and oral health under global budgets with equity accountability and community advisory boards.",
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
  { name: 'CareOregon (Health Share of Oregon)', region: 'Portland Metro', members: 410000, counties: 9 },
  { name: 'PacificSource Community Solutions', region: 'Central Oregon', members: 95000, counties: 7 },
  { name: 'Umpqua Health Alliance', region: 'Douglas County', members: 32000, counties: 1 },
  { name: 'AllCare Health', region: 'Southern Oregon', members: 48000, counties: 3 },
  { name: 'Willamette Valley Community Health', region: 'Mid-Willamette', members: 115000, counties: 5 },
  { name: 'Eastern Oregon CCO', region: 'Eastern Oregon', members: 44000, counties: 12 },
  { name: 'FamilyCare Health', region: 'Washington County', members: 88000, counties: 1 },
  { name: 'Cascade Health Alliance', region: 'Klamath County', members: 22000, counties: 1 },
]

export default function OregonCCOPage() {
  return (
    <div className="max-w-5xl mx-auto px-6 py-12">

      {/* Header */}
      <div className="mb-10">
        <div className="flex flex-wrap items-center gap-2 mb-3">
          <span className="text-xs font-black uppercase tracking-widest text-emerald-600">Oregon · Medicaid Transformation</span>
          <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-100 text-emerald-700 border border-emerald-200">CCO 3.0 · 2025–2030</span>
        </div>
        <h1 className="text-3xl font-black text-slate-900 mb-4">Oregon CCO 3.0</h1>
        <p className="text-slate-600 max-w-3xl leading-relaxed">
          Oregon&apos;s third-generation Coordinated Care Organizations model integrates physical, behavioral, and oral health
          under global budgets with strong equity accountability metrics and community advisory boards. CCO 3.0 deepens
          the state&apos;s commitment to value-based payment and whole-person care for 1.4M Oregon Health Plan members.
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
        <StatBox value="16" label="CCOs" sub="coordinated care orgs" />
        <StatBox value="1.4M" label="OHP Members" sub="Oregon Health Plan" />
        <StatBox value="$3.2B" label="Global Budget" sub="annual spend" />
        <StatBox value="36" label="Counties" sub="covered statewide" />
      </div>

      {/* What CCO 3.0 Does */}
      <section className="mb-12">
        <h2 className="text-xl font-black text-slate-900 mb-2">What CCO 3.0 Changes</h2>
        <p className="text-slate-500 mb-6 text-sm max-w-2xl">
          Building on CCO 2.0&apos;s global budget framework, the third iteration strengthens equity accountability,
          deepens behavioral health integration, and expands community health worker infrastructure.
        </p>
        <div className="grid md:grid-cols-2 gap-4">
          <InvestCard icon="📊" title="Enhanced Equity Metrics"
            desc="25 new equity-weighted performance measures tracking disparities by race, language, and geography."
            items={['Race/ethnicity stratified HEDIS reporting', 'Language access compliance audits', 'Geographic access standards for rural CCOs', 'Equity withhold: 5% of CCO incentive pool tied to disparity reduction']} />
          <InvestCard icon="🧠" title="Behavioral Health Integration"
            desc="Full physical-behavioral-oral health integration under a single capitated payment by 2027."
            items={['Co-located BH in primary care: 80% CCO target', 'Same-day BH access standards', 'Integrated care coordination for dual-eligible members', 'Substance use disorder parity enforcement']} />
          <InvestCard icon="🤝" title="Community Health Workers"
            desc="Statewide CHW infrastructure investment with CCO-funded workforce pipelines."
            items={['State-funded CHW certification program', 'CCO CHW ratio: 1 per 1,500 high-risk members', 'Housing navigation and food security referrals', 'SDOH screening at 80% of primary care encounters']} />
          <InvestCard icon="💰" title="Global Budget Methodology"
            desc="PMPM growth rate tied to state economic growth plus equity adjustment factors."
            items={['Global budget growth cap: GDP + 0.5%', 'Shared savings: up to 50% retained by CCO', 'Downside risk introduced at CCO scale ≥100K members', 'Quality withhold: 3.5% of capitation at risk']} />
        </div>
      </section>

      {/* CCO Directory */}
      <section className="mb-12">
        <h2 className="text-xl font-black text-slate-900 mb-4">Oregon CCO Directory</h2>
        <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="text-left px-4 py-3 font-black text-slate-600 text-xs uppercase tracking-wide">CCO</th>
                <th className="text-left px-4 py-3 font-black text-slate-600 text-xs uppercase tracking-wide">Region</th>
                <th className="text-right px-4 py-3 font-black text-slate-600 text-xs uppercase tracking-wide">Members</th>
                <th className="text-right px-4 py-3 font-black text-slate-600 text-xs uppercase tracking-wide">Counties</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {CCO_LIST.map(cco => (
                <tr key={cco.name} className="hover:bg-slate-50 transition-colors">
                  <td className="px-4 py-3 font-bold text-slate-900">{cco.name}</td>
                  <td className="px-4 py-3 text-slate-500">{cco.region}</td>
                  <td className="px-4 py-3 text-right text-slate-700 font-bold">{cco.members.toLocaleString()}</td>
                  <td className="px-4 py-3 text-right text-slate-500">{cco.counties}</td>
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
            population. CBO projects Oregon faces $2.1B in Medicaid revenue reduction by 2034. CCO global budgets
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
