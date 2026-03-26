'use client'

import { useState } from 'react'
import dynamic from 'next/dynamic'
import LabPageShell from '@/components/research/LabPageShell'

const APMDesignLab   = dynamic(() => import('@/components/research/APMDesignLab'),   { ssr: false })
const APMCalculator  = dynamic(() => import('@/components/research/APMCalculator'),  { ssr: false })
const CEACalculator  = dynamic(() => import('@/components/research/CEACalculator'),  { ssr: false })

function ToolHeader({ icon, label, badge, desc }: { icon: string; label: string; badge: string; desc: string }) {
  return (
    <div className="mb-4">
      <div className="flex flex-wrap items-center gap-2 mb-1">
        <span className="text-2xl">{icon}</span>
        <h2 className="text-xl font-black text-slate-900">{label}</h2>
        <span className="text-[10px] font-bold uppercase tracking-widest px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-700 border border-emerald-200">
          {badge}
        </span>
      </div>
      <p className="text-sm text-slate-500 leading-relaxed ml-9">{desc}</p>
    </div>
  )
}

const TABS = [
  {
    id: 'apm-design', icon: '🏗️', label: 'APM Design Lab', badge: 'Payment Innovation',
    desc: 'Design novel APMs from scratch: episode bundles, global budgets, benchmark waterfall charts, and natural-language model recommendations.',
  },
  {
    id: 'apm-calc', icon: '📈', label: 'APM Shared Savings Calculator', badge: 'Value-Based Care',
    desc: 'Model projected shared savings under MSSP, ACO REACH, and custom global budget scenarios. Includes risk corridor modeling and quality withhold impact.',
  },
  {
    id: 'cea', icon: '⚗️', label: 'Cost-Effectiveness Analysis Calculator', badge: 'Health Economics',
    desc: 'Calculate cost per QALY, NNT, and break-even timeline for any clinical intervention. Compare against ICER, NICE, and CMS willingness-to-pay thresholds.',
  },
]

export default function PaymentModelsClient() {
  const [activeTab, setActiveTab] = useState('apm-design')

  return (
    <LabPageShell
      icon="💰"
      label="Payment Models & VBC"
      desc="Design alternative payment models from the ground up — configure episode bundles, global budgets, benchmark methodologies, and model cost-effectiveness thresholds."
      accentClass="bg-emerald-600"
      accentLight="bg-emerald-100 text-emerald-700"
      currentHref="/research-lab/payment-models"
      practiceHref="/advisory/consulting"
      practiceLabel="Strategic Consulting"
      practiceIcon="💼"
      toolParam="Payment Models & VBC"
      advisoryBullets={[
        "Negotiate and structure your APM contracts with payers using your modeled benchmarks",
        "Design a global budget that works for your organization's specific payer mix and risk tolerance",
        "Build the financial infrastructure to actually survive downside risk arrangements",
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
                ? 'border-emerald-600 text-emerald-700'
                : 'border-transparent text-slate-500 hover:text-slate-800 hover:border-slate-300'
            }`}
          >
            <span>{tab.icon}</span>
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Active tool panel */}
      {activeTab === 'apm-design' && <div><ToolHeader icon="🏗️" label="APM Design Lab"                     badge="Payment Innovation" desc={TABS[0].desc} /><APMDesignLab /></div>}
      {activeTab === 'apm-calc'   && <div><ToolHeader icon="📈" label="APM Shared Savings Calculator"      badge="Value-Based Care"   desc={TABS[1].desc} /><APMCalculator /></div>}
      {activeTab === 'cea'        && <div><ToolHeader icon="⚗️" label="Cost-Effectiveness Analysis Calculator" badge="Health Economics" desc={TABS[2].desc} /><CEACalculator /></div>}
    </LabPageShell>
  )
}
