'use client'

import { useState } from 'react'
import dynamic from 'next/dynamic'
import LabPageShell from '@/components/research/LabPageShell'

const EvidenceLibrary      = dynamic(() => import('@/components/research/EvidenceLibrary'),      { ssr: false })
const WorkforceModeler     = dynamic(() => import('@/components/research/WorkforceModeler'),     { ssr: false })
const InnovationLeaderboard = dynamic(() => import('@/components/research/InnovationLeaderboard'), { ssr: false })
const ResearchWorkspace    = dynamic(() => import('@/components/research/ResearchWorkspace'),    { ssr: false })

function ToolHeader({ icon, label, badge, desc }: { icon: string; label: string; badge: string; desc: string }) {
  return (
    <div className="mb-4">
      <div className="flex flex-wrap items-center gap-2 mb-1">
        <span className="text-2xl">{icon}</span>
        <h2 className="text-xl font-black text-slate-900">{label}</h2>
        <span className="text-[10px] font-bold uppercase tracking-widest px-2.5 py-0.5 rounded-full bg-slate-200 text-slate-700 border border-slate-300">
          {badge}
        </span>
      </div>
      <p className="text-sm text-slate-500 leading-relaxed ml-9">{desc}</p>
    </div>
  )
}

const TABS = [
  {
    id: 'evidence', icon: '📖', label: 'Evidence Library', badge: 'Research',
    desc: 'Search 25 landmark CEA/CUA studies, track 20 CMMI innovation models with full lesson-learned summaries, and browse 15 HTR policy briefs.',
  },
  {
    id: 'workforce', icon: '👨‍⚕️', label: 'Workforce Modeler', badge: 'Workforce',
    desc: 'Project physician supply and demand across 12 specialties over 10 years, simulate nurse staffing ratio impacts, calculate turnover costs, and model rural incentive programs.',
  },
  {
    id: 'leaderboard', icon: '🏆', label: 'Innovation Leaderboard', badge: 'Benchmarking',
    desc: 'Rank all 50 states on a composite health transformation index, score 30 major health systems on VBC maturity, and compare 20 payers on innovation leadership.',
  },
  {
    id: 'workspace', icon: '🗂️', label: 'Research Workspace', badge: 'Workspace',
    desc: 'Save and compare analysis scenarios, build structured reports from templates, manage citations in AMA/APA format, and export findings as Markdown or text.',
  },
]

export default function KnowledgeWorkspaceClient() {
  const [activeTab, setActiveTab] = useState('evidence')

  return (
    <LabPageShell
      icon="📚"
      label="Knowledge & Workspace"
      desc="Access 25 CEA studies, track 20 CMMI innovation models, project workforce supply and demand, benchmark all 50 states, and manage your research scenarios with export."
      accentClass="bg-slate-700"
      accentLight="bg-slate-200 text-slate-700"
      currentHref="/research-lab/knowledge-workspace"
      practiceHref="/advisory/research"
      practiceLabel="Custom Research & Analysis"
      practiceIcon="🔬"
      toolParam="Knowledge & Workspace"
      advisoryBullets={[
        'Commission a publication-quality policy brief or systematic review on any topic you just explored',
        'Get a custom HTR benchmark report comparing your organization against the state and national leaders',
        'Turn your workforce gap analysis into a funded recruitment and retention strategy with real implementation support',
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
                ? 'border-slate-700 text-slate-900'
                : 'border-transparent text-slate-500 hover:text-slate-800 hover:border-slate-300'
            }`}
          >
            <span>{tab.icon}</span>
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Active tool panel */}
      {activeTab === 'evidence'    && <div><ToolHeader icon="📖"  label="Evidence Library"       badge="Research"     desc={TABS[0].desc} /><EvidenceLibrary /></div>}
      {activeTab === 'workforce'   && <div><ToolHeader icon="👨‍⚕️" label="Workforce Modeler"       badge="Workforce"    desc={TABS[1].desc} /><WorkforceModeler /></div>}
      {activeTab === 'leaderboard' && <div><ToolHeader icon="🏆"  label="Innovation Leaderboard"  badge="Benchmarking" desc={TABS[2].desc} /><InnovationLeaderboard /></div>}
      {activeTab === 'workspace'   && <div><ToolHeader icon="🗂️"  label="Research Workspace"      badge="Workspace"    desc={TABS[3].desc} /><ResearchWorkspace /></div>}
    </LabPageShell>
  )
}
