'use client'

import { useState } from 'react'
import dynamic from 'next/dynamic'

/* ── Lazy-load all 19 tools ─────────────────────────────────────────────── */
const FHIRLab                  = dynamic(() => import('@/components/research/FHIRLab'),                  { ssr: false })
const RiskStratificationEngine = dynamic(() => import('@/components/research/RiskStratificationEngine'), { ssr: false })
const APMDesignLab             = dynamic(() => import('@/components/research/APMDesignLab'),             { ssr: false })
const APMCalculator            = dynamic(() => import('@/components/research/APMCalculator'),            { ssr: false })
const CEACalculator            = dynamic(() => import('@/components/research/CEACalculator'),            { ssr: false })
const PopulationHealthModeler  = dynamic(() => import('@/components/research/PopulationHealthModeler'),  { ssr: false })
const HealthEquityStudio       = dynamic(() => import('@/components/research/HealthEquityStudio'),       { ssr: false })
const PolicySimulator          = dynamic(() => import('@/components/research/PolicySimulator'),          { ssr: false })
const ClinicalQualityOptimizer = dynamic(() => import('@/components/research/ClinicalQualityOptimizer'),{ ssr: false })
const HospitalFinancialScorecard = dynamic(() => import('@/components/research/HospitalFinancialScorecard'), { ssr: false })
const HTAStudio                = dynamic(() => import('@/components/research/HTAStudio'),                { ssr: false })
const ActuarialLab             = dynamic(() => import('@/components/research/ActuarialLab'),             { ssr: false })
const AIAnalyticsLab           = dynamic(() => import('@/components/research/AIAnalyticsLab'),           { ssr: false })
const DigitalHealthLab         = dynamic(() => import('@/components/research/DigitalHealthLab'),         { ssr: false })
const EvidenceLibrary          = dynamic(() => import('@/components/research/EvidenceLibrary'),          { ssr: false })
const WorkforceModeler         = dynamic(() => import('@/components/research/WorkforceModeler'),         { ssr: false })
const InnovationLeaderboard    = dynamic(() => import('@/components/research/InnovationLeaderboard'),    { ssr: false })
const ResearchWorkspace        = dynamic(() => import('@/components/research/ResearchWorkspace'),        { ssr: false })

/* ── Types ──────────────────────────────────────────────────────────────── */
interface Tool {
  id: string
  icon: string
  label: string
  badge: string
  desc: string
}

interface Section {
  id: string
  icon: string
  label: string
  activeBg: string
  activeText: string
  toolActiveBorder: string
  toolActiveText: string
  badgeCls: string
  tools: Tool[]
}

/* ── Section + tool definitions ─────────────────────────────────────────── */
const SECTIONS: Section[] = [
  {
    id: 'interoperability',
    icon: '🧬',
    label: 'Interoperability & Risk',
    activeBg: 'bg-indigo-600',
    activeText: 'text-white',
    toolActiveBorder: 'border-indigo-600',
    toolActiveText: 'text-indigo-700',
    badgeCls: 'bg-indigo-100 text-indigo-700 border-indigo-200',
    tools: [
      {
        id: 'fhir', icon: '🔌', label: 'FHIR Interoperability Lab', badge: 'Interoperability',
        desc: 'Build and validate FHIR R4 resources, map clinical terminologies, test CDS Hooks, simulate prior authorization workflows, and check ONC compliance.',
      },
      {
        id: 'risk', icon: '📊', label: 'Risk Stratification Engine', badge: 'Clinical Risk',
        desc: 'Apply HCC v28 RAF scoring, segment populations by risk tier, build custom risk models, and analyze comorbidity interactions using Elixhauser and Charlson indices.',
      },
    ],
  },
  {
    id: 'payment-models',
    icon: '💰',
    label: 'Payment Models & VBC',
    activeBg: 'bg-emerald-600',
    activeText: 'text-white',
    toolActiveBorder: 'border-emerald-600',
    toolActiveText: 'text-emerald-700',
    badgeCls: 'bg-emerald-100 text-emerald-700 border-emerald-200',
    tools: [
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
    ],
  },
  {
    id: 'population-equity',
    icon: '👥',
    label: 'Population & Equity',
    activeBg: 'bg-amber-600',
    activeText: 'text-white',
    toolActiveBorder: 'border-amber-600',
    toolActiveText: 'text-amber-700',
    badgeCls: 'bg-amber-100 text-amber-700 border-amber-200',
    tools: [
      {
        id: 'population', icon: '🌍', label: 'Population Health Modeler', badge: 'Population Health',
        desc: 'Run Markov chain disease progression models for 5 conditions, simulate SIR epidemic dynamics, model preventable hospitalizations, and calculate intervention ROI.',
      },
      {
        id: 'equity', icon: '⚖️', label: 'Health Equity Studio', badge: 'Health Equity',
        desc: 'Analyze racial/ethnic disparities across 10 outcomes, map geographic access gaps, score SDOH burden, and compute equity-weighted ICER using the HEROI metric.',
      },
    ],
  },
  {
    id: 'policy-quality',
    icon: '📋',
    label: 'Policy & Quality Sciences',
    activeBg: 'bg-sky-600',
    activeText: 'text-white',
    toolActiveBorder: 'border-sky-600',
    toolActiveText: 'text-sky-700',
    badgeCls: 'bg-sky-100 text-sky-700 border-sky-200',
    tools: [
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
    ],
  },
  {
    id: 'technology-ai',
    icon: '🤖',
    label: 'Technology & AI',
    activeBg: 'bg-violet-600',
    activeText: 'text-white',
    toolActiveBorder: 'border-violet-600',
    toolActiveText: 'text-violet-700',
    badgeCls: 'bg-violet-100 text-violet-700 border-violet-200',
    tools: [
      {
        id: 'ai', icon: '🤖', label: 'AI Analytics Lab', badge: 'Artificial Intelligence',
        desc: 'Compare predictive model performance, detect algorithmic bias with Demographic Parity and Equal Opportunity metrics, build AI governance frameworks, and calculate AI ROI.',
      },
      {
        id: 'digital', icon: '📱', label: 'Digital Health Lab', badge: 'Digital Health',
        desc: 'Calculate RPM ROI using CMS CPT codes (99453–99458), model telehealth utilization under CMS policy scenarios, compare patient engagement platforms, and optimize EHR interoperability.',
      },
    ],
  },
  {
    id: 'knowledge-workspace',
    icon: '📚',
    label: 'Knowledge & Workspace',
    activeBg: 'bg-slate-700',
    activeText: 'text-white',
    toolActiveBorder: 'border-slate-700',
    toolActiveText: 'text-slate-900',
    badgeCls: 'bg-slate-200 text-slate-700 border-slate-300',
    tools: [
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
    ],
  },
]

/* ── ToolHeader ─────────────────────────────────────────────────────────── */
function ToolHeader({ icon, label, badge, badgeCls, desc }: {
  icon: string; label: string; badge: string; badgeCls: string; desc: string
}) {
  return (
    <div className="mb-6">
      <div className="flex flex-wrap items-center gap-2 mb-1">
        <span className="text-2xl">{icon}</span>
        <h2 className="text-xl font-black text-slate-900">{label}</h2>
        <span className={`text-[10px] font-bold uppercase tracking-widest px-2.5 py-0.5 rounded-full border ${badgeCls}`}>
          {badge}
        </span>
      </div>
      <p className="text-sm text-slate-500 leading-relaxed ml-9">{desc}</p>
    </div>
  )
}

/* ── Tool renderer ──────────────────────────────────────────────────────── */
function ActiveTool({ sectionId, toolId }: { sectionId: string; toolId: string }) {
  const key = `${sectionId}/${toolId}`
  switch (key) {
    case 'interoperability/fhir':        return <FHIRLab />
    case 'interoperability/risk':        return <RiskStratificationEngine />
    case 'payment-models/apm-design':    return <APMDesignLab />
    case 'payment-models/apm-calc':      return <APMCalculator />
    case 'payment-models/cea':           return <CEACalculator />
    case 'population-equity/population': return <PopulationHealthModeler />
    case 'population-equity/equity':     return <HealthEquityStudio />
    case 'policy-quality/policy':        return <PolicySimulator />
    case 'policy-quality/quality':       return <ClinicalQualityOptimizer />
    case 'policy-quality/scorecard':     return <HospitalFinancialScorecard />
    case 'policy-quality/hta':           return <HTAStudio />
    case 'policy-quality/actuarial':     return <ActuarialLab />
    case 'technology-ai/ai':             return <AIAnalyticsLab />
    case 'technology-ai/digital':        return <DigitalHealthLab />
    case 'knowledge-workspace/evidence':    return <EvidenceLibrary />
    case 'knowledge-workspace/workforce':   return <WorkforceModeler />
    case 'knowledge-workspace/leaderboard': return <InnovationLeaderboard />
    case 'knowledge-workspace/workspace':   return <ResearchWorkspace />
    default: return null
  }
}

/* ── Main component ─────────────────────────────────────────────────────── */
export default function ResearchLabTabs() {
  const [activeSectionId, setActiveSectionId] = useState('interoperability')
  const [activeToolId, setActiveToolId] = useState('fhir')

  const section = SECTIONS.find(s => s.id === activeSectionId)!
  const tool = section.tools.find(t => t.id === activeToolId)!

  function handleSectionChange(sectionId: string) {
    const sec = SECTIONS.find(s => s.id === sectionId)!
    setActiveSectionId(sectionId)
    setActiveToolId(sec.tools[0].id)
  }

  return (
    <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">

      {/* ── Section tabs ─────────────────────────────────────────────── */}
      <div className="flex flex-wrap gap-1 p-2 bg-slate-50 border-b border-slate-200">
        {SECTIONS.map(sec => (
          <button
            key={sec.id}
            onClick={() => handleSectionChange(sec.id)}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-semibold transition-colors ${
              sec.id === activeSectionId
                ? `${sec.activeBg} ${sec.activeText}`
                : 'text-slate-500 hover:text-slate-800 hover:bg-slate-100'
            }`}
          >
            <span>{sec.icon}</span>
            <span>{sec.label}</span>
          </button>
        ))}
      </div>

      {/* ── Tool tabs ────────────────────────────────────────────────── */}
      <div className="flex flex-wrap gap-x-1 px-6 pt-4 border-b border-slate-200">
        {section.tools.map(t => (
          <button
            key={t.id}
            onClick={() => setActiveToolId(t.id)}
            className={`flex items-center gap-1.5 px-4 py-2.5 text-sm font-semibold border-b-2 -mb-px transition-colors whitespace-nowrap ${
              t.id === activeToolId
                ? `${section.toolActiveBorder} ${section.toolActiveText}`
                : 'border-transparent text-slate-500 hover:text-slate-800 hover:border-slate-300'
            }`}
          >
            <span>{t.icon}</span>
            <span>{t.label}</span>
          </button>
        ))}
      </div>

      {/* ── Active tool panel ────────────────────────────────────────── */}
      <div className="p-6">
        <ToolHeader
          icon={tool.icon}
          label={tool.label}
          badge={tool.badge}
          badgeCls={section.badgeCls}
          desc={tool.desc}
        />
        <ActiveTool sectionId={activeSectionId} toolId={activeToolId} />
      </div>

    </div>
  )
}
