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
        <h2 className="ty-h3 font-black text-slate-900">{label}</h2>
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

const VALID_TABS = ['policy', 'quality', 'scorecard', 'hta', 'actuarial']

export default function PolicyQualityClient({ initialTab }: { initialTab?: string }) {
  const [activeTab, setActiveTab] = useState(
    VALID_TABS.includes(initialTab ?? '') ? initialTab! : 'policy'
  )

  return (
    <LabPageShell
      icon="📋"
      label="Policy, Economics & Clinical Tools"
      desc="Policy Simulator (Policy pillar) · Clinical Quality Optimizer (Clinical pillar) · Hospital Financial Scorecard, HTA Studio & Actuarial Lab (Economics pillar). Five tools spanning three domains on one page."
      accentClass="bg-sky-600"
      accentLight="bg-sky-100 text-sky-700"
      currentHref="/research-lab/policy-quality"
      practiceHref="/advisory/regulatory"
      practiceLabel="Regulatory & Compliance"
      practiceIcon="⚖️"
      toolParam="Policy, Economics & Clinical Tools"
      advisoryBullets={[
        'Draft and file your 1115 waiver application with CMS using your modeled impact projections',
        'Build a 12-month HEDIS and Star Ratings improvement playbook tied to actual revenue impact',
        "Navigate actuarial filing requirements with credentialed actuaries who know your state's market",
      ]}
    >
      {/* Tab nav */}
      <nav className="flex flex-wrap items-end border border-slate-200 rounded-t-xl px-2 bg-slate-50/80 backdrop-blur-sm pt-2 gap-y-1 mb-8">
        {TABS.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
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

      {/* Active tool panel */}
      {activeTab === 'policy'    && <div><ToolHeader icon="🏛️" label="Policy Simulator"            badge="Health Policy"              desc={TABS[0].desc} /><PolicySimulator /></div>}
      {activeTab === 'quality'   && <div><ToolHeader icon="🎯" label="Clinical Quality Optimizer"  badge="Quality Improvement"        desc={TABS[1].desc} /><ClinicalQualityOptimizer /></div>}
      {activeTab === 'scorecard' && <div><ToolHeader icon="🏥" label="Hospital Financial Scorecard" badge="Hospital Finance"            desc={TABS[2].desc} /><HospitalFinancialScorecard /></div>}
      {activeTab === 'hta'       && <div><ToolHeader icon="🔎" label="HTA Studio"                  badge="Health Technology Assessment" desc={TABS[3].desc} /><HTAStudio /></div>}
      {activeTab === 'actuarial' && <div><ToolHeader icon="📉" label="Actuarial Lab"               badge="Actuarial Science"           desc={TABS[4].desc} /><ActuarialLab /></div>}
    </LabPageShell>
  )
}
