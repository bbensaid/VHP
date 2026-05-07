'use client'

import { useSearchParams, useRouter, usePathname } from 'next/navigation'
import dynamic from 'next/dynamic'
import LabPageShell from '@/components/research/LabPageShell'

const EvidenceLibrary        = dynamic(() => import('@/components/research/EvidenceLibrary'),        { ssr: false })
const WorkforceModeler       = dynamic(() => import('@/components/research/WorkforceModeler'),       { ssr: false })
const InnovationLeaderboard  = dynamic(() => import('@/components/research/InnovationLeaderboard'),  { ssr: false })
const ResearchWorkspace      = dynamic(() => import('@/components/research/ResearchWorkspace'),      { ssr: false })
const VBCReadinessAssessment = dynamic(() => import('@/components/research/VBCReadinessAssessment'), { ssr: false })
const TransformationScorecard = dynamic(() => import('@/components/research/TransformationScorecard'), { ssr: false })

function ToolHeader({ icon, label, badge, desc }: { icon: string; label: string; badge: string; desc: string }) {
  return (
    <div className="mb-4">
      <div className="flex flex-wrap items-center gap-2 mb-1">
        <span className="text-2xl">{icon}</span>
        <h2 className="ty-h3 font-black text-slate-900">{label}</h2>
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
    id: 'scorecard', icon: '🎯', label: 'Transformation Scorecard', badge: 'Executive',
    desc: 'Six-pillar executive scorecard — score your organization on Policy, Economics, Technology, Clinical, Equity, and Operations with Vermont AHEAD milestone tracking integrated.',
  },
  {
    id: 'readiness', icon: '📊', label: 'VBC Readiness Assessment', badge: 'Transformation',
    desc: '30-dimension assessment across 6 domains — Strategy, Data & Analytics, Clinical, Finance, Technology, and Equity — producing a readiness score and prioritized gap analysis for value-based care transformation.',
  },
  {
    id: 'workspace', icon: '🗂️', label: 'Research Workspace', badge: 'Workspace',
    desc: 'Save and compare analysis scenarios, build structured reports from templates, manage citations in AMA/APA format, and export findings as Markdown or text.',
  },
]

const VALID_TABS = TABS.map(t => t.id)
const DEFAULT_TAB = 'evidence'

export default function KnowledgeWorkspaceClient() {
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
      icon="📚"
      label="Operations, Policy & Clinical Tools"
      desc="Evidence Library & Research Workspace (Operations pillar) · Innovation Leaderboard (Policy pillar) · Workforce Modeler (Clinical pillar) · VBC Readiness Assessment (Cross-pillar). Five tools spanning four domains on one page."
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

      {activeTab === 'evidence'    && <div><ToolHeader icon="📖"  label="Evidence Library"         badge="Research"       desc={TABS[0].desc} /><EvidenceLibrary /></div>}
      {activeTab === 'workforce'   && <div><ToolHeader icon="👨‍⚕️" label="Workforce Modeler"         badge="Workforce"      desc={TABS[1].desc} /><WorkforceModeler /></div>}
      {activeTab === 'leaderboard' && <div><ToolHeader icon="🏆"  label="Innovation Leaderboard"   badge="Benchmarking"   desc={TABS[2].desc} /><InnovationLeaderboard /></div>}
      {activeTab === 'scorecard'   && <div><ToolHeader icon="🎯"  label="Transformation Scorecard" badge="Executive"      desc={TABS[3].desc} /><TransformationScorecard /></div>}
      {activeTab === 'readiness'   && <div><ToolHeader icon="📊"  label="VBC Readiness Assessment" badge="Transformation" desc={TABS[4].desc} /><VBCReadinessAssessment /></div>}
      {activeTab === 'workspace'   && <div><ToolHeader icon="🗂️"  label="Research Workspace"       badge="Workspace"      desc={TABS[5].desc} /><ResearchWorkspace /></div>}
    </LabPageShell>
  )
}
