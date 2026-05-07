'use client'

import { useSearchParams, useRouter, usePathname } from 'next/navigation'
import dynamic from 'next/dynamic'
import LabPageShell from '@/components/research/LabPageShell'

const FHIRLab                   = dynamic(() => import('@/components/research/FHIRLab'),                   { ssr: false })
const RiskStratificationEngine  = dynamic(() => import('@/components/research/RiskStratificationEngine'),  { ssr: false })

function ToolHeader({ icon, label, badge, desc }: { icon: string; label: string; badge: string; desc: string }) {
  return (
    <div className="mb-4">
      <div className="flex flex-wrap items-center gap-2 mb-1">
        <span className="text-2xl">{icon}</span>
        <h2 className="ty-h3 font-black text-slate-900">{label}</h2>
        <span className="text-[10px] font-bold uppercase tracking-widest px-2.5 py-0.5 rounded-full bg-indigo-100 text-indigo-700 border border-indigo-200">
          {badge}
        </span>
      </div>
      <p className="text-sm text-slate-500 leading-relaxed ml-9">{desc}</p>
    </div>
  )
}

const TABS = [
  {
    id: 'fhir', icon: '🔌', label: 'FHIR Interoperability Lab', badge: 'Interoperability',
    desc: 'Build and validate FHIR R4 resources, map clinical terminologies, test CDS Hooks, simulate prior authorization workflows, and check ONC compliance.',
  },
  {
    id: 'risk', icon: '📊', label: 'Risk Stratification Engine', badge: 'Clinical Risk',
    desc: 'Apply HCC v28 RAF scoring, segment populations by risk tier, build custom risk models, and analyze comorbidity interactions using Elixhauser and Charlson indices.',
  },
]

const VALID_TABS = TABS.map(t => t.id)
const DEFAULT_TAB = 'fhir'

export default function InteroperabilityClient() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const pathname = usePathname()
  const rawTab = searchParams.get('tab') ?? ''
  const activeTab = VALID_TABS.includes(rawTab) ? rawTab : DEFAULT_TAB

  function setTab(id: string) {
    const params = new URLSearchParams(searchParams.toString())
    params.set('tab', id)
    router.push(`${pathname}?${params.toString()}`)
  }

  return (
    <LabPageShell
      icon="🧬"
      label="Technology & Clinical Tools"
      desc="FHIR Interoperability Lab (Technology pillar) — validate FHIR R4 resources, test CDS Hooks, check ONC compliance. Risk Stratification Engine (Clinical pillar) — apply HCC v28 RAF scoring and segment populations by clinical complexity."
      accentClass="bg-indigo-600"
      accentLight="bg-indigo-100 text-indigo-700"
      currentHref="/research-lab/interoperability"
      practiceHref="/advisory/it-consulting"
      practiceLabel="Health IT Consulting"
      practiceIcon="💻"
      toolParam="Technology & Clinical Tools"
      advisoryBullets={[
        'Design and implement your FHIR R4 interoperability roadmap end-to-end',
        'Remediate ONC information blocking compliance gaps before an audit finds them',
        'Build a risk stratification infrastructure that feeds your care management program',
      ]}
    >
      <nav className="flex flex-wrap items-end border border-slate-200 rounded-t-xl px-2 bg-slate-50/80 backdrop-blur-sm pt-2 gap-y-1 mb-8">
        {TABS.map(tab => (
          <button
            key={tab.id}
            onClick={() => setTab(tab.id)}
            className={`relative flex items-center gap-2 px-5 py-2.5 text-sm font-bold transition-all whitespace-nowrap rounded-t-xl border-t border-l border-r mr-1 ${
              activeTab === tab.id
                ? 'bg-slate-100 border-slate-800 text-slate-900 z-10 -mb-px'
                : 'bg-white border-slate-200 text-slate-500 hover:bg-slate-50 hover:text-slate-700 mt-1.5 shadow-sm'
            }`}
          >
            <span>{tab.icon}</span>
            <span>{tab.label}</span>
          </button>
        ))}
      </nav>

      {activeTab === 'fhir' && <div><ToolHeader icon="🔌" label="FHIR Interoperability Lab"  badge="Interoperability" desc={TABS[0].desc} /><FHIRLab /></div>}
      {activeTab === 'risk' && <div><ToolHeader icon="📊" label="Risk Stratification Engine" badge="Clinical Risk"    desc={TABS[1].desc} /><RiskStratificationEngine /></div>}
    </LabPageShell>
  )
}
