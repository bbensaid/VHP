'use client'

import { useState } from 'react'
import dynamic from 'next/dynamic'
import LabPageShell from '@/components/research/LabPageShell'

const PolicySimulator         = dynamic(() => import('@/components/research/PolicySimulator'),          { ssr: false })
const ClinicalQualityOptimizer = dynamic(() => import('@/components/research/ClinicalQualityOptimizer'), { ssr: false })
const HospitalFinancialScorecard = dynamic(() => import('@/components/research/HospitalFinancialScorecard'), { ssr: false })
const HTAStudio               = dynamic(() => import('@/components/research/HTAStudio'),                { ssr: false })
const ActuarialLab            = dynamic(() => import('@/components/research/ActuarialLab'),             { ssr: false })

function ToolHeader({ icon, label, badge, desc }: { icon: string; label: string; badge: string; desc: string }) {
  return (
    <div className="mb-4">
      <div className="flex flex-wrap items-center gap-2 mb-1">
        <span className="text-2xl">{icon}</span>
        <h2 className="text-xl font-black text-slate-900">{label}</h2>
        <span className="text-[10px] font-bold uppercase tracking-widest px-2.5 py-0.5 rounded-full bg-sky-100 text-sky-700 border border-sky-200">
          {badge}
        </span>
      </div>
      <p className="text-sm text-slate-500 leading-relaxed ml-9">{desc}</p>
    </div>
  )
}

const TABS = [
  {
    id: 'policy', icon: '🏛️', label: 'Policy Simulator', badge: 'Health Policy',
    desc: 'Model 1115 waiver types across 6 state scenarios, design Vermont-style global budgets, simulate Medicaid expansion impact, and analyze price transparency policies.',
  },
  {
    id: 'quality', icon: '🎯', label: 'Clinical Quality Optimizer', badge: 'Quality Improvement',
    desc: 'Simulate 15 HEDIS measures with NCQA benchmarks, predict CMS Star Ratings across 32 sub-measures, optimize MIPS composite scores, and calculate P4P ROI.',
  },
  {
    id: 'scorecard', icon: '🏥', label: 'Hospital Financial Scorecard', badge: 'Hospital Finance',
    desc: 'Stress-test hospital financials against payer mix shifts, Medicaid rate cuts, and volume changes. Benchmarks against CAH, Rural PPS, and Urban Tertiary peers.',
  },
  {
    id: 'hta', icon: '🔎', label: 'HTA Studio', badge: 'Health Technology Assessment',
    desc: 'Build budget impact models, run MCDA with 8 criteria, and execute real Monte Carlo PSA with 1,000 stochastic iterations using Beta, Log-normal, and Gamma distributions.',
  },
  {
    id: 'actuarial', icon: '📉', label: 'Actuarial Lab', badge: 'Actuarial Science',
    desc: 'Calculate ACA actuarial value, develop premium rates across 3 methodologies, model adverse selection death spirals, and analyze IRA 2022 drug pricing impacts.',
  },
]

export default function PolicyQualityClient() {
  const [activeTab, setActiveTab] = useState('policy')

  return (
    <LabPageShell
      icon="📋"
      label="Policy & Quality Sciences"
      desc="Simulate 1115 Medicaid waivers, model global budgets, optimize HEDIS/Star/MIPS performance, run actuarial scenarios, and stress-test hospital financials."
      accentClass="bg-sky-600"
      accentLight="bg-sky-100 text-sky-700"
      currentHref="/research-lab/policy-quality"
      practiceHref="/advisory/regulatory"
      practiceLabel="Regulatory & Compliance"
      practiceIcon="⚖️"
      toolParam="Policy & Quality Sciences"
      advisoryBullets={[
        'Draft and file your 1115 waiver application with CMS using your modeled impact projections',
        'Build a 12-month HEDIS and Star Ratings improvement playbook tied to actual revenue impact',
        "Navigate actuarial filing requirements with credentialed actuaries who know your state's market",
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
                ? 'border-sky-600 text-sky-700'
                : 'border-transparent text-slate-500 hover:text-slate-800 hover:border-slate-300'
            }`}
          >
            <span>{tab.icon}</span>
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Active tool panel */}
      {activeTab === 'policy'    && <div><ToolHeader icon="🏛️" label="Policy Simulator"            badge="Health Policy"              desc={TABS[0].desc} /><PolicySimulator /></div>}
      {activeTab === 'quality'   && <div><ToolHeader icon="🎯" label="Clinical Quality Optimizer"  badge="Quality Improvement"        desc={TABS[1].desc} /><ClinicalQualityOptimizer /></div>}
      {activeTab === 'scorecard' && <div><ToolHeader icon="🏥" label="Hospital Financial Scorecard" badge="Hospital Finance"            desc={TABS[2].desc} /><HospitalFinancialScorecard /></div>}
      {activeTab === 'hta'       && <div><ToolHeader icon="🔎" label="HTA Studio"                  badge="Health Technology Assessment" desc={TABS[3].desc} /><HTAStudio /></div>}
      {activeTab === 'actuarial' && <div><ToolHeader icon="📉" label="Actuarial Lab"               badge="Actuarial Science"           desc={TABS[4].desc} /><ActuarialLab /></div>}
    </LabPageShell>
  )
}
