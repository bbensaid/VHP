'use client'

import dynamic from 'next/dynamic'
import LabPageShell from '@/components/research/LabPageShell'

const FHIRLab = dynamic(() => import('@/components/research/FHIRLab'), { ssr: false })
const RiskStratificationEngine = dynamic(() => import('@/components/research/RiskStratificationEngine'), { ssr: false })

function ToolHeader({ icon, label, badge, desc }: { icon: string; label: string; badge: string; desc: string }) {
  return (
    <div className="mb-4">
      <div className="flex flex-wrap items-center gap-2 mb-1">
        <span className="text-2xl">{icon}</span>
        <h2 className="text-xl font-black text-slate-900">{label}</h2>
        <span className="text-[10px] font-bold uppercase tracking-widest px-2.5 py-0.5 rounded-full bg-indigo-100 text-indigo-700 border border-indigo-200">
          {badge}
        </span>
      </div>
      <p className="text-sm text-slate-500 leading-relaxed ml-9">{desc}</p>
    </div>
  )
}

export default function InteroperabilityClient() {
  return (
    <LabPageShell
      icon="🧬"
      label="Interoperability & Risk"
      desc="Build spec-compliant FHIR R4 resources, test CDS Hooks workflows, simulate prior authorization, validate ONC compliance, and run HCC v28 risk stratification models."
      accentClass="bg-indigo-600"
      accentLight="bg-indigo-100 text-indigo-700"
      currentHref="/research-lab/interoperability"
      practiceHref="/advisory/it-consulting"
      practiceLabel="Health IT Consulting"
      practiceIcon="💻"
      toolParam="Interoperability & Risk"
      advisoryBullets={[
        'Design and implement your FHIR R4 interoperability roadmap end-to-end',
        'Remediate ONC information blocking compliance gaps before an audit finds them',
        'Build a risk stratification infrastructure that feeds your care management program',
      ]}
    >
      <div>
        <ToolHeader
          icon="🔌"
          label="FHIR Interoperability Lab"
          badge="Interoperability"
          desc="Build and validate FHIR R4 resources, map clinical terminologies, test CDS Hooks, simulate prior authorization workflows, and check ONC compliance."
        />
        <FHIRLab />
      </div>

      <hr className="border-slate-200" />

      <div>
        <ToolHeader
          icon="📊"
          label="Risk Stratification Engine"
          badge="Clinical Risk"
          desc="Apply HCC v28 RAF scoring, segment populations by risk tier, build custom risk models, and analyze comorbidity interactions using Elixhauser and Charlson indices."
        />
        <RiskStratificationEngine />
      </div>
    </LabPageShell>
  )
}
