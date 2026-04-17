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
        <h2 className="ty-h3 font-black text-slate-900">{label}</h2>
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
    id: 'ai', icon: '🤖', label: 'AI Clinical Governance Lab', badge: 'Artificial Intelligence',
    desc: 'Compare predictive model performance, detect algorithmic bias with Demographic Parity and Equal Opportunity metrics, build AI governance frameworks, and calculate AI ROI with build vs. buy analysis.',
  },
  {
    id: 'digital', icon: '📱', label: 'Digital Health Lab', badge: 'Digital Health',
    desc: 'Calculate RPM ROI using CMS CPT codes (99453–99458), model telehealth utilization under CMS policy scenarios, compare patient engagement platforms, and optimize EHR interoperability.',
  },
]

const VALID_TABS = ['ai', 'digital']

export default function TechnologyAIClient({ initialTab }: { initialTab?: string }) {
  const [activeTab, setActiveTab] = useState(
    VALID_TABS.includes(initialTab ?? '') ? initialTab! : 'ai'
  )

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
      {activeTab === 'ai'      && <div><ToolHeader icon="🤖" label="AI Clinical Governance Lab"   badge="Artificial Intelligence" desc={TABS[0].desc} /><AIAnalyticsLab /></div>}
      {activeTab === 'digital' && <div><ToolHeader icon="📱" label="Digital Health Lab"  badge="Digital Health"         desc={TABS[1].desc} /><DigitalHealthLab /></div>}
    </LabPageShell>
  )
}
