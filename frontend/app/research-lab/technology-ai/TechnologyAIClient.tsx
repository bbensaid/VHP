'use client'

import { useState } from 'react'
import dynamic from 'next/dynamic'
import LabPageShell from '@/components/research/LabPageShell'

const AIAnalyticsLab  = dynamic(() => import('@/components/research/AIAnalyticsLab'),  { ssr: false })
const DigitalHealthLab = dynamic(() => import('@/components/research/DigitalHealthLab'), { ssr: false })

function ToolHeader({ icon, label, badge, desc }: { icon: string; label: string; badge: string; desc: string }) {
  return (
    <div className="mb-4">
      <div className="flex flex-wrap items-center gap-2 mb-1">
        <span className="text-2xl">{icon}</span>
        <h2 className="text-xl font-black text-slate-900">{label}</h2>
        <span className="text-[10px] font-bold uppercase tracking-widest px-2.5 py-0.5 rounded-full bg-violet-100 text-violet-700 border border-violet-200">
          {badge}
        </span>
      </div>
      <p className="text-sm text-slate-500 leading-relaxed ml-9">{desc}</p>
    </div>
  )
}

const TABS = [
  {
    id: 'ai', icon: '🤖', label: 'AI Analytics Lab', badge: 'Artificial Intelligence',
    desc: 'Compare predictive model performance, detect algorithmic bias with Demographic Parity and Equal Opportunity metrics, build AI governance frameworks, and calculate AI ROI with build vs. buy analysis.',
  },
  {
    id: 'digital', icon: '📱', label: 'Digital Health Lab', badge: 'Digital Health',
    desc: 'Calculate RPM ROI using CMS CPT codes (99453–99458), model telehealth utilization under CMS policy scenarios, compare patient engagement platforms, and optimize EHR interoperability.',
  },
]

export default function TechnologyAIClient() {
  const [activeTab, setActiveTab] = useState('ai')

  return (
    <LabPageShell
      icon="🤖"
      label="Technology & AI"
      desc="Evaluate clinical AI model performance, audit algorithmic bias across demographic groups, build governance frameworks, and model RPM and telehealth program ROI."
      accentClass="bg-violet-600"
      accentLight="bg-violet-100 text-violet-700"
      currentHref="/research-lab/technology-ai"
      practiceHref="/advisory/it-consulting"
      practiceLabel="Health IT Consulting"
      practiceIcon="💻"
      toolParam="Technology & AI"
      advisoryBullets={[
        'Build an AI governance framework that actually protects your organization from liability',
        'Validate your build vs. buy decision with a full vendor landscape assessment',
        'Design an RPM or telehealth program that maximizes CMS reimbursement from day one',
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
                ? 'border-violet-600 text-violet-700'
                : 'border-transparent text-slate-500 hover:text-slate-800 hover:border-slate-300'
            }`}
          >
            <span>{tab.icon}</span>
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Active tool panel */}
      {activeTab === 'ai'      && <div><ToolHeader icon="🤖" label="AI Analytics Lab"   badge="Artificial Intelligence" desc={TABS[0].desc} /><AIAnalyticsLab /></div>}
      {activeTab === 'digital' && <div><ToolHeader icon="📱" label="Digital Health Lab"  badge="Digital Health"         desc={TABS[1].desc} /><DigitalHealthLab /></div>}
    </LabPageShell>
  )
}
