'use client'

import dynamic from 'next/dynamic'
import LabPageShell from '@/components/research/LabPageShell'

const PopulationHealthModeler = dynamic(() => import('@/components/research/PopulationHealthModeler'), { ssr: false })
const HealthEquityStudio = dynamic(() => import('@/components/research/HealthEquityStudio'), { ssr: false })

function ToolHeader({ icon, label, badge, desc }: { icon: string; label: string; badge: string; desc: string }) {
  return (
    <div className="mb-4">
      <div className="flex flex-wrap items-center gap-2 mb-1">
        <span className="text-2xl">{icon}</span>
        <h2 className="text-xl font-black text-slate-900">{label}</h2>
        <span className="text-[10px] font-bold uppercase tracking-widest px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-700 border border-amber-200">
          {badge}
        </span>
      </div>
      <p className="text-sm text-slate-500 leading-relaxed ml-9">{desc}</p>
    </div>
  )
}

export default function PopulationEquityClient() {
  return (
    <LabPageShell
      icon="👥"
      label="Population & Equity"
      desc="Model chronic disease progression via Markov chains, run SIR epidemic simulations, quantify health disparities, and calculate equity-weighted cost-effectiveness."
      accentClass="bg-amber-600"
      accentLight="bg-amber-100 text-amber-700"
      currentHref="/research-lab/population-equity"
      practiceHref="/advisory/consulting"
      practiceLabel="Strategic Consulting"
      practiceIcon="💼"
      toolParam="Population & Equity"
      advisoryBullets={[
        'Translate your disease progression model into a funded care management program',
        'Build an equity strategy with measurable disparity-reduction targets and SDOH interventions',
        'Design the population health operating model behind your simulation results',
      ]}
    >
      <div>
        <ToolHeader
          icon="🌍"
          label="Population Health Modeler"
          badge="Population Health"
          desc="Run Markov chain disease progression models for 5 conditions, simulate SIR epidemic dynamics, model preventable hospitalizations, and calculate intervention ROI."
        />
        <PopulationHealthModeler />
      </div>

      <hr className="border-slate-200" />

      <div>
        <ToolHeader
          icon="⚖️"
          label="Health Equity Studio"
          badge="Health Equity"
          desc="Analyze racial/ethnic disparities across 10 outcomes, map geographic access gaps, score SDOH burden, and compute equity-weighted ICER using the HEROI metric."
        />
        <HealthEquityStudio />
      </div>
    </LabPageShell>
  )
}
