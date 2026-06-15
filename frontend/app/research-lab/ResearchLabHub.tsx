'use client'

/**
 * ResearchLabHub — Two-level tab layout that puts BOTH section tabs (row 1)
 * and tool tabs (row 2) inside the SAME sticky <nav> container, matching
 * HubPageTemplate's exact styling so both rows are gap-y-1 (4 px) apart.
 */

import { useState, useEffect, Suspense } from 'react'
import { useRouter, usePathname, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeftIcon } from '@heroicons/react/24/outline'
import dynamic from 'next/dynamic'
import ErrorBoundary from '@/components/ErrorBoundary'

/* ── Tool loading skeleton ──────────────────────────────────────────────── */
function ToolSkeleton() {
  return (
    <div className="w-full animate-pulse space-y-4 p-6">
      <div className="h-6 bg-slate-100 rounded-lg w-1/3" />
      <div className="h-4 bg-slate-100 rounded w-2/3" />
      <div className="grid grid-cols-3 gap-4 mt-6">
        {[1, 2, 3].map(i => (
          <div key={i} className="h-28 bg-slate-100 rounded-xl" />
        ))}
      </div>
      <div className="h-48 bg-slate-100 rounded-2xl mt-4" />
    </div>
  )
}

const loadOpts = (label: string) => ({
  ssr: false,
  loading: () => <ToolSkeleton />,
  // Webpack magic comment: group chart-heavy tools into named chunks
  // so they share vendor splitting with chart.js / recharts
} as const)

/* ── Lazy-load all 21 tools with loading skeletons ──────────────────────── */
const FHIRLab                    = dynamic(() => import(/* webpackChunkName: "tool-fhir" */        '@/components/research/FHIRLab'),                    { ...loadOpts('FHIR'), ssr: false })
const RiskStratificationEngine   = dynamic(() => import(/* webpackChunkName: "tool-risk" */        '@/components/research/RiskStratificationEngine'),   { ...loadOpts('Risk'), ssr: false })
const EMREHRLab                  = dynamic(() => import(/* webpackChunkName: "tool-emr" */         '@/components/research/EMREHRLab'),                  { ...loadOpts('EMR'), ssr: false })
const APMDesignLab               = dynamic(() => import(/* webpackChunkName: "tool-apm" */         '@/components/research/APMDesignLab'),               { ...loadOpts('APM'), ssr: false })
const APMCalculator              = dynamic(() => import(/* webpackChunkName: "tool-apm" */         '@/components/research/APMCalculator'),              { ...loadOpts('APMCalc'), ssr: false })
const CEACalculator              = dynamic(() => import(/* webpackChunkName: "tool-econ" */        '@/components/research/CEACalculator'),              { ...loadOpts('CEA'), ssr: false })
const PopulationHealthModeler    = dynamic(() => import(/* webpackChunkName: "tool-pop" */         '@/components/research/PopulationHealthModeler'),    { ...loadOpts('Pop'), ssr: false })
const HealthEquityStudio         = dynamic(() => import(/* webpackChunkName: "tool-equity" */      '@/components/research/HealthEquityStudio'),         { ...loadOpts('Equity'), ssr: false })
const PolicySimulator            = dynamic(() => import(/* webpackChunkName: "tool-policy" */      '@/components/research/PolicySimulator'),            { ...loadOpts('Policy'), ssr: false })
const ClinicalQualityOptimizer   = dynamic(() => import(/* webpackChunkName: "tool-clinical" */    '@/components/research/ClinicalQualityOptimizer'),   { ...loadOpts('CQO'), ssr: false })
const HospitalFinancialScorecard = dynamic(() => import(/* webpackChunkName: "tool-finance" */     '@/components/research/HospitalFinancialScorecard'), { ...loadOpts('Finance'), ssr: false })
const HTAStudio                  = dynamic(() => import(/* webpackChunkName: "tool-hta" */         '@/components/research/HTAStudio'),                  { ...loadOpts('HTA'), ssr: false })
const ActuarialLab               = dynamic(() => import(/* webpackChunkName: "tool-actuarial" */   '@/components/research/ActuarialLab'),               { ...loadOpts('Actuarial'), ssr: false })
const AIAnalyticsLab             = dynamic(() => import(/* webpackChunkName: "tool-ai" */          '@/components/research/AIAnalyticsLab'),             { ...loadOpts('AI'), ssr: false })
const DigitalHealthLab           = dynamic(() => import(/* webpackChunkName: "tool-digital" */     '@/components/research/DigitalHealthLab'),           { ...loadOpts('Digital'), ssr: false })
const EvidenceLibrary            = dynamic(() => import(/* webpackChunkName: "tool-evidence" */    '@/components/research/EvidenceLibrary'),            { ...loadOpts('Evidence'), ssr: false })
const WorkforceModeler           = dynamic(() => import(/* webpackChunkName: "tool-workforce" */   '@/components/research/WorkforceModeler'),           { ...loadOpts('Workforce'), ssr: false })
const InnovationLeaderboard      = dynamic(() => import(/* webpackChunkName: "tool-innovation" */  '@/components/research/InnovationLeaderboard'),      { ...loadOpts('Innovation'), ssr: false })
const ResearchWorkspace          = dynamic(() => import(/* webpackChunkName: "tool-workspace" */   '@/components/research/ResearchWorkspace'),          { ...loadOpts('Workspace'), ssr: false })
const VBCReadinessAssessment     = dynamic(() => import(/* webpackChunkName: "tool-readiness" */   '@/components/research/VBCReadinessAssessment'),     { ...loadOpts('Readiness'), ssr: false })
const TransformationScorecard    = dynamic(() => import(/* webpackChunkName: "tool-scorecard" */   '@/components/research/TransformationScorecard'),    { ...loadOpts('Scorecard'), ssr: false })

/* ── Data model ─────────────────────────────────────────────────────────── */
interface Tool {
  id: string
  icon: string
  label: string
  badge: string
  badgeCls: string
  desc: string
}

interface Section {
  id: string
  icon: string
  label: string
  tools: Tool[]
}

const SECTIONS: Section[] = [
  {
    id: 'interoperability', icon: '🧬', label: 'Interoperability & Risk',
    tools: [
      { id: 'fhir',   icon: '🔌', label: 'FHIR Interoperability Lab',  badge: 'Interoperability', badgeCls: 'bg-indigo-100 text-indigo-700 border-indigo-200', desc: 'Build and validate FHIR R4 resources, map clinical terminologies, test CDS Hooks, simulate prior authorization workflows, and check ONC compliance.' },
      { id: 'risk',   icon: '📊', label: 'Risk Stratification Engine',  badge: 'Clinical Risk',    badgeCls: 'bg-indigo-100 text-indigo-700 border-indigo-200', desc: 'Apply HCC v28 RAF scoring, segment populations by risk tier, build custom risk models, and analyze comorbidity interactions using Elixhauser and Charlson indices.' },
      { id: 'emr',    icon: '🏥', label: 'EMR/EHR Lab',                 badge: 'EHR Systems',      badgeCls: 'bg-indigo-100 text-indigo-700 border-indigo-200', desc: 'Model EHR adoption cost, timeline, and 5-year ROI; compare Epic, Oracle Health, MEDITECH, and athenahealth; audit a record for USCDI data quality; and step through a simulated clinical encounter to see documentation burden.' },
    ],
  },
  {
    id: 'payment-models', icon: '💰', label: 'Payment Models & VBC',
    tools: [
      { id: 'apm-design', icon: '🏗️', label: 'APM Design Lab',                        badge: 'Payment Innovation', badgeCls: 'bg-emerald-100 text-emerald-700 border-emerald-200', desc: 'Design novel APMs from scratch: episode bundles, global budgets, benchmark waterfall charts, and natural-language model recommendations.' },
      { id: 'apm-calc',   icon: '📈', label: 'APM Shared Savings Calculator',          badge: 'Value-Based Care',   badgeCls: 'bg-emerald-100 text-emerald-700 border-emerald-200', desc: 'Model projected shared savings under MSSP, ACO REACH, and custom global budget scenarios. Includes risk corridor modeling and quality withhold impact.' },
      { id: 'cea',        icon: '⚗️', label: 'Cost-Effectiveness Analysis Calculator', badge: 'Health Economics',   badgeCls: 'bg-emerald-100 text-emerald-700 border-emerald-200', desc: 'Calculate cost per QALY, NNT, and break-even timeline for any clinical intervention. Compare against ICER, NICE, and CMS willingness-to-pay thresholds.' },
    ],
  },
  {
    id: 'population-equity', icon: '👥', label: 'Population & Equity',
    tools: [
      { id: 'population', icon: '🌍', label: 'Population Health Modeler', badge: 'Population Health', badgeCls: 'bg-violet-100 text-violet-700 border-violet-200', desc: 'Run Markov chain disease progression models for 5 conditions, simulate SIR epidemic dynamics, model preventable hospitalizations, and calculate intervention ROI.' },
      { id: 'equity',     icon: '⚖️', label: 'Health Equity Studio',       badge: 'Health Equity',    badgeCls: 'bg-violet-100 text-violet-700 border-violet-200', desc: 'Analyze racial/ethnic disparities across 10 outcomes, map geographic access gaps, score SDOH burden, and compute equity-weighted ICER using the HEROI metric.' },
    ],
  },
  {
    id: 'policy-quality', icon: '📋', label: 'Policy & Quality Sciences',
    tools: [
      { id: 'policy',    icon: '🏛️', label: 'Policy Simulator',             badge: 'Health Policy',              badgeCls: 'bg-sky-100 text-sky-700 border-sky-200', desc: 'Model 1115 waiver types across 6 state scenarios, design Vermont-style global budgets, simulate Medicaid expansion impact, and analyze price transparency policies.' },
      { id: 'quality',   icon: '🎯', label: 'Clinical Quality Optimizer',   badge: 'Quality Improvement',        badgeCls: 'bg-sky-100 text-sky-700 border-sky-200', desc: 'Simulate 15 HEDIS measures with NCQA benchmarks, predict CMS Star Ratings across 32 sub-measures, optimize MIPS composite scores, and calculate P4P ROI.' },
      { id: 'scorecard', icon: '🏥', label: 'Hospital Financial Stress Test', badge: 'Hospital Finance',            badgeCls: 'bg-sky-100 text-sky-700 border-sky-200', desc: 'Stress-test hospital financials against payer mix shifts, Medicaid rate cuts, and volume changes. Benchmarks against CAH, Rural PPS, and Urban Tertiary peers.' },
      { id: 'hta',       icon: '🔎', label: 'HTA Studio',                   badge: 'Health Technology Assessment',badgeCls: 'bg-sky-100 text-sky-700 border-sky-200', desc: 'Build budget impact models, run MCDA with 8 criteria, and execute real Monte Carlo PSA with 1,000 stochastic iterations using Beta, Log-normal, and Gamma distributions.' },
      { id: 'actuarial', icon: '📉', label: 'Actuarial Lab',                badge: 'Actuarial Science',           badgeCls: 'bg-sky-100 text-sky-700 border-sky-200', desc: 'Calculate ACA actuarial value, develop premium rates across 3 methodologies, model adverse selection death spirals, and analyze IRA 2022 drug pricing impacts.' },
    ],
  },
  {
    id: 'technology-ai', icon: '🤖', label: 'Technology & AI',
    tools: [
      { id: 'ai',      icon: '🤖', label: 'AI Clinical Governance Lab',   badge: 'Artificial Intelligence', badgeCls: 'bg-violet-100 text-violet-700 border-violet-200', desc: 'Compare predictive model performance, detect algorithmic bias with Demographic Parity and Equal Opportunity metrics, build AI governance frameworks, and calculate AI ROI.' },
      { id: 'digital', icon: '📱', label: 'Digital Health Lab',  badge: 'Digital Health',          badgeCls: 'bg-violet-100 text-violet-700 border-violet-200', desc: 'Calculate RPM ROI using CMS CPT codes (99453–99458), model telehealth utilization under CMS policy scenarios, compare patient engagement platforms, and optimize EHR interoperability.' },
    ],
  },
  {
    id: 'knowledge-workspace', icon: '📚', label: 'Knowledge & Workspace',
    tools: [
      { id: 'scorecard',   icon: '🎯',  label: 'Transformation Scorecard', badge: 'Executive',      badgeCls: 'bg-teal-100 text-teal-700 border-teal-200', desc: 'Executive six-pillar scorecard — self-score Policy, Economics, Technology, Clinical, Equity, and Operations with Vermont AHEAD statutory milestones integrated.' },
      { id: 'readiness',   icon: '📊',  label: 'VBC Readiness Assessment', badge: 'Transformation', badgeCls: 'bg-emerald-100 text-emerald-700 border-emerald-200', desc: '30-dimension, 6-domain assessment producing an organizational readiness score and prioritized gap analysis for value-based care transformation. Vermont AHEAD, CAH, and advanced system presets included.' },
      { id: 'evidence',    icon: '📖',  label: 'Evidence Library',         badge: 'Research',     badgeCls: 'bg-slate-200 text-slate-700 border-slate-300', desc: 'Search 25 landmark CEA/CUA studies, track 20 CMMI innovation models with full lesson-learned summaries, and browse 15 HTR policy briefs.' },
      { id: 'workforce',   icon: '👨‍⚕️', label: 'Workforce Modeler',         badge: 'Workforce',    badgeCls: 'bg-slate-200 text-slate-700 border-slate-300', desc: 'Project physician supply and demand across 12 specialties over 10 years, simulate nurse staffing ratio impacts, calculate turnover costs, and model rural incentive programs.' },
      { id: 'leaderboard', icon: '🏆',  label: 'Innovation Leaderboard',   badge: 'Benchmarking', badgeCls: 'bg-slate-200 text-slate-700 border-slate-300', desc: 'Rank all 50 states on a composite health transformation index, score 30 major health systems on VBC maturity, and compare 20 payers on innovation leadership.' },
      { id: 'workspace',   icon: '🗂️',  label: 'Research Workspace',       badge: 'Workspace',    badgeCls: 'bg-slate-200 text-slate-700 border-slate-300', desc: 'Save and compare analysis scenarios, build structured reports from templates, manage citations in AMA/APA format, and export findings as Markdown or text.' },
    ],
  },
]

/* ── Tool component renderer ────────────────────────────────────────────── */
function ActiveTool({ sectionId, toolId }: { sectionId: string; toolId: string }) {
  const key = `${sectionId}/${toolId}`
  switch (key) {
    case 'interoperability/fhir':          return <FHIRLab />
    case 'interoperability/risk':          return <RiskStratificationEngine />
    case 'interoperability/emr':           return <EMREHRLab />
    case 'payment-models/apm-design':      return <APMDesignLab />
    case 'payment-models/apm-calc':        return <APMCalculator />
    case 'payment-models/cea':             return <CEACalculator />
    case 'population-equity/population':   return <PopulationHealthModeler />
    case 'population-equity/equity':       return <HealthEquityStudio />
    case 'policy-quality/policy':          return <PolicySimulator />
    case 'policy-quality/quality':         return <ClinicalQualityOptimizer />
    case 'policy-quality/scorecard':       return <HospitalFinancialScorecard />
    case 'policy-quality/hta':             return <HTAStudio />
    case 'policy-quality/actuarial':       return <ActuarialLab />
    case 'technology-ai/ai':               return <AIAnalyticsLab />
    case 'technology-ai/digital':          return <DigitalHealthLab />
    case 'knowledge-workspace/scorecard':  return <TransformationScorecard />
    case 'knowledge-workspace/readiness':  return <VBCReadinessAssessment />
    case 'knowledge-workspace/evidence':   return <EvidenceLibrary />
    case 'knowledge-workspace/workforce':  return <WorkforceModeler />
    case 'knowledge-workspace/leaderboard':return <InnovationLeaderboard />
    case 'knowledge-workspace/workspace':  return <ResearchWorkspace />
    default: return null
  }
}

/* ── Section tab button — browser-tab style (matches HubPageTemplate) ───── */
function SectionTabBtn({ active, onClick, children }: {
  active: boolean
  onClick: () => void
  children: React.ReactNode
}) {
  return (
    <button
      role="tab"
      aria-selected={active}
      onClick={onClick}
      className={`
        relative flex items-center justify-center gap-2 px-6 py-3 text-sm font-bold
        transition-all whitespace-nowrap rounded-t-xl border-t border-l border-r mr-2 mb-0
        ${active
          ? 'bg-slate-100 dark:bg-slate-700 border-black dark:border-slate-500 text-slate-900 dark:text-slate-100 z-10 -mb-px'
          : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-700 hover:text-slate-700 dark:hover:text-slate-200 mt-1.5 shadow-sm'
        }
      `}
    >
      {children}
    </button>
  )
}

/* ── Tool pill button — pill/chip style, clearly subordinate to section tabs */
function ToolPillBtn({ active, onClick, children }: {
  active: boolean
  onClick: () => void
  children: React.ReactNode
}) {
  return (
    <button
      role="tab"
      aria-selected={active}
      onClick={onClick}
      className={`
        flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold
        border transition-all whitespace-nowrap
        ${active
          ? 'bg-slate-800 dark:bg-slate-200 text-white dark:text-slate-900 border-slate-800 dark:border-slate-200 shadow-sm'
          : 'bg-white dark:bg-slate-800 text-slate-500 dark:text-slate-400 border-slate-300 dark:border-slate-600 hover:border-slate-400 dark:hover:border-slate-500 hover:text-slate-700 dark:hover:text-slate-200'
        }
      `}
    >
      {children}
    </button>
  )
}

/* ── Inner component (needs router hooks) ───────────────────────────────── */
function ResearchLabHubInner() {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const defaultSection = SECTIONS[0].id
  const urlTab = searchParams.get('tab')

  const [activeSectionId, setActiveSectionId] = useState(urlTab ?? defaultSection)
  const [activeToolId, setActiveToolId]       = useState(SECTIONS[0].tools[0].id)
  const [isTransitioning, setIsTransitioning] = useState(false)

  // Keep section in sync if URL changes (back/forward nav)
  useEffect(() => {
    const current = searchParams.get('tab')
    const section = SECTIONS.find(s => s.id === current)
    if (section && section.id !== activeSectionId) {
      setActiveSectionId(section.id)
      setActiveToolId(section.tools[0].id)
    } else if (!current && activeSectionId !== defaultSection) {
      setActiveSectionId(defaultSection)
      setActiveToolId(SECTIONS[0].tools[0].id)
    }
  }, [searchParams]) // eslint-disable-line react-hooks/exhaustive-deps

  function handleSectionChange(sectionId: string) {
    if (sectionId === activeSectionId) return
    const section = SECTIONS.find(s => s.id === sectionId)!
    setIsTransitioning(true)
    const params = new URLSearchParams(searchParams.toString())
    params.set('tab', sectionId)
    router.push(`${pathname}?${params.toString()}`, { scroll: false })
    setTimeout(() => {
      setActiveSectionId(sectionId)
      setActiveToolId(section.tools[0].id)
      setIsTransitioning(false)
    }, 200)
  }

  const activeSection = SECTIONS.find(s => s.id === activeSectionId) ?? SECTIONS[0]
  const activeTool    = activeSection.tools.find(t => t.id === activeToolId) ?? activeSection.tools[0]

  return (
    <div className="w-full font-sans text-slate-800 dark:text-slate-100 flex flex-col pb-20">

      {/* ── Header card (matches HubPageTemplate exactly) ─────────────── */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-2xl p-8 mb-6 shadow-sm relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-50 dark:bg-indigo-950/20 rounded-bl-full -mr-20 -mt-20 opacity-50 pointer-events-none" />
        <div className="relative z-10">
          <Link
            href="/"
            className="inline-flex items-center text-sm font-bold text-slate-500 dark:text-slate-400 hover:text-indigo-600 transition-colors mb-6"
          >
            <ArrowLeftIcon className="w-4 h-4 mr-1.5" /> Back to Home
          </Link>
          <div className="flex flex-col md:flex-row justify-between items-start">
            <div className="max-w-3xl">
              <div className="flex items-center gap-2 mb-3">
                <span className="bg-indigo-50 text-indigo-700 border border-indigo-100 text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded">
                  Research Lab
                </span>
              </div>
              <h1 className="ty-h1 font-black text-slate-900 dark:text-slate-100 tracking-tight mb-3">
                HTR Research Lab
              </h1>
              <p className="text-slate-500 dark:text-slate-400 text-lg leading-relaxed">
                21 interactive analytical tools spanning every dimension of health system transformation — from FHIR interoperability to six-pillar transformation scorecard.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ── Sticky nav — BOTH rows in ONE container ────────────────────── */}
      <div className="sticky z-30 mb-8" style={{ top: 'var(--sidebar-top, var(--sticky-bar-height, 2.5rem))' }}>
        <nav
          className="flex flex-wrap justify-center items-end border border-slate-200 dark:border-slate-700 rounded-t-xl px-2 bg-slate-50/80 dark:bg-slate-800/80 backdrop-blur-sm pt-2 gap-y-1"
          aria-label="Research Lab navigation"
        >
          {/* Row 1: Section tabs — browser-tab style */}
          {SECTIONS.map(sec => (
            <SectionTabBtn
              key={sec.id}
              active={sec.id === activeSectionId}
              onClick={() => handleSectionChange(sec.id)}
            >
              <span>{sec.icon}</span>
              {sec.label}
            </SectionTabBtn>
          ))}

          {/* Row 2: Tool pills — pill/chip style, visually subordinate */}
          <div className="w-full flex flex-wrap gap-2 justify-center px-2 py-2">
            {activeSection.tools.map(tool => (
              <ToolPillBtn
                key={tool.id}
                active={tool.id === activeToolId}
                onClick={() => setActiveToolId(tool.id)}
              >
                <span>{tool.icon}</span>
                {tool.label}
              </ToolPillBtn>
            ))}
          </div>
        </nav>
      </div>

      {/* ── Tool content ─────────────────────────────────────────────── */}
      <div className={`w-full transition-opacity duration-200 ease-in-out ${isTransitioning ? 'opacity-0' : 'opacity-100'}`}>
        <div className="hub-embedded-view w-full">
          {/* Tool header */}
          <div className="mb-6">
            <div className="flex flex-wrap items-center gap-2 mb-1">
              <span className="text-2xl">{activeTool.icon}</span>
              <h2 className="ty-h3 font-black text-slate-900 dark:text-slate-100">{activeTool.label}</h2>
              <span className={`text-[10px] font-bold uppercase tracking-widest px-2.5 py-0.5 rounded-full border ${activeTool.badgeCls}`}>
                {activeTool.badge}
              </span>
            </div>
            <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed ml-9">{activeTool.desc}</p>
          </div>

          <ErrorBoundary section={activeTool.label} key={`${activeSectionId}/${activeToolId}`}>
            <ActiveTool sectionId={activeSectionId} toolId={activeToolId} />
          </ErrorBoundary>
        </div>
      </div>

    </div>
  )
}

export default function ResearchLabHub() {
  return (
    <Suspense fallback={null}>
      <ResearchLabHubInner />
    </Suspense>
  )
}
