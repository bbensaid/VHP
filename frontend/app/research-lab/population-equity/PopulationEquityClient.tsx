'use client'

import { useState } from 'react'
import dynamic from 'next/dynamic'
import LabPageShell from '@/components/research/LabPageShell'

const PopulationHealthModeler = dynamic(() => import('@/components/research/PopulationHealthModeler'), { ssr: false })
const HealthEquityStudio      = dynamic(() => import('@/components/research/HealthEquityStudio'),      { ssr: false })

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

const TABS = [
  {
    id: 'population', icon: '🌍', label: 'Population Health Modeler', badge: 'Population Health',
    desc: 'Run Markov chain disease progression models for 5 conditions, simulate SIR epidemic dynamics, model preventable hospitalizations, and calculate intervention ROI.',
  },
  {
    id: 'equity', icon: '⚖️', label: 'Health Equity Studio', badge: 'Health Equity',
    desc: 'Analyze racial/ethnic disparities across 10 outcomes, map geographic access gaps, score SDOH burden, and compute equity-weighted ICER using the HEROI metric.',
  },
]

export default function PopulationEquityClient() {
  const [activeTab, setActiveTab] = useState('population')

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
      {/* Tab nav */}
      <div className="flex flex-wrap gap-x-1 border-b border-slate-200 mb-8">
        {TABS.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-1.5 px-4 py-2.5 text-sm font-semibold border-b-2 -mb-px transition-colors whitespace-nowrap ${
              activeTab === tab.id
                ? 'border-amber-600 text-amber-700'
                : 'border-transparent text-slate-500 hover:text-slate-800 hover:border-slate-300'
            }`}
          >
            <span>{tab.icon}</span>
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Active tool panel */}
      {activeTab === 'population' && <div><ToolHeader icon="🌍" label="Population Health Modeler" badge="Population Health" desc={TABS[0].desc} /><PopulationHealthModeler /></div>}
      {activeTab === 'equity'     && <div><ToolHeader icon="⚖️" label="Health Equity Studio"      badge="Health Equity"    desc={TABS[1].desc} /><HealthEquityStudio /></div>}
    </LabPageShell>
  )
}
