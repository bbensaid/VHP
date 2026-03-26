'use client'

import dynamic from 'next/dynamic'
import HubPageTemplate from '@/components/templates/HubPageTemplate'
import SubTabView from '@/components/templates/SubTabView'

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

/* ── Tool header (title + badge + desc above each tool) ─────────────────── */
function ToolHeader({ icon, label, badge, badgeCls, desc }: {
  icon: string; label: string; badge: string; badgeCls: string; desc: string
}) {
  return (
    <div className="mb-6">
      <div className="flex flex-wrap items-center gap-2 mb-1">
        <span className="text-2xl">{icon}</span>
        <h3 className="text-xl font-black text-slate-900">{label}</h3>
        <span className={`text-[10px] font-bold uppercase tracking-widest px-2.5 py-0.5 rounded-full border ${badgeCls}`}>
          {badge}
        </span>
      </div>
      <p className="text-sm text-slate-500 leading-relaxed ml-9">{desc}</p>
    </div>
  )
}

/* ── Section content definitions ────────────────────────────────────────── */

const INTEROP_TOOLS = [
  {
    id: 'fhir', icon: '🔌', label: 'FHIR Interoperability Lab', badge: 'Interoperability',
    badgeCls: 'bg-indigo-100 text-indigo-700 border-indigo-200',
    desc: 'Build and validate FHIR R4 resources, map clinical terminologies, test CDS Hooks, simulate prior authorization workflows, and check ONC compliance.',
    component: <FHIRLab />,
  },
  {
    id: 'risk', icon: '📊', label: 'Risk Stratification Engine', badge: 'Clinical Risk',
    badgeCls: 'bg-indigo-100 text-indigo-700 border-indigo-200',
    desc: 'Apply HCC v28 RAF scoring, segment populations by risk tier, build custom risk models, and analyze comorbidity interactions using Elixhauser and Charlson indices.',
    component: <RiskStratificationEngine />,
  },
]

const PAYMENT_TOOLS = [
  {
    id: 'apm-design', icon: '🏗️', label: 'APM Design Lab', badge: 'Payment Innovation',
    badgeCls: 'bg-emerald-100 text-emerald-700 border-emerald-200',
    desc: 'Design novel APMs from scratch: episode bundles, global budgets, benchmark waterfall charts, and natural-language model recommendations.',
    component: <APMDesignLab />,
  },
  {
    id: 'apm-calc', icon: '📈', label: 'APM Shared Savings Calculator', badge: 'Value-Based Care',
    badgeCls: 'bg-emerald-100 text-emerald-700 border-emerald-200',
    desc: 'Model projected shared savings under MSSP, ACO REACH, and custom global budget scenarios. Includes risk corridor modeling and quality withhold impact.',
    component: <APMCalculator />,
  },
  {
    id: 'cea', icon: '⚗️', label: 'Cost-Effectiveness Analysis Calculator', badge: 'Health Economics',
    badgeCls: 'bg-emerald-100 text-emerald-700 border-emerald-200',
    desc: 'Calculate cost per QALY, NNT, and break-even timeline for any clinical intervention. Compare against ICER, NICE, and CMS willingness-to-pay thresholds.',
    component: <CEACalculator />,
  },
]

const POPULATION_TOOLS = [
  {
    id: 'population', icon: '🌍', label: 'Population Health Modeler', badge: 'Population Health',
    badgeCls: 'bg-amber-100 text-amber-700 border-amber-200',
    desc: 'Run Markov chain disease progression models for 5 conditions, simulate SIR epidemic dynamics, model preventable hospitalizations, and calculate intervention ROI.',
    component: <PopulationHealthModeler />,
  },
  {
    id: 'equity', icon: '⚖️', label: 'Health Equity Studio', badge: 'Health Equity',
    badgeCls: 'bg-amber-100 text-amber-700 border-amber-200',
    desc: 'Analyze racial/ethnic disparities across 10 outcomes, map geographic access gaps, score SDOH burden, and compute equity-weighted ICER using the HEROI metric.',
    component: <HealthEquityStudio />,
  },
]

const POLICY_TOOLS = [
  {
    id: 'policy', icon: '🏛️', label: 'Policy Simulator', badge: 'Health Policy',
    badgeCls: 'bg-sky-100 text-sky-700 border-sky-200',
    desc: 'Model 1115 waiver types across 6 state scenarios, design Vermont-style global budgets, simulate Medicaid expansion impact, and analyze price transparency policies.',
    component: <PolicySimulator />,
  },
  {
    id: 'quality', icon: '🎯', label: 'Clinical Quality Optimizer', badge: 'Quality Improvement',
    badgeCls: 'bg-sky-100 text-sky-700 border-sky-200',
    desc: 'Simulate 15 HEDIS measures with NCQA benchmarks, predict CMS Star Ratings across 32 sub-measures, optimize MIPS composite scores, and calculate P4P ROI.',
    component: <ClinicalQualityOptimizer />,
  },
  {
    id: 'scorecard', icon: '🏥', label: 'Hospital Financial Scorecard', badge: 'Hospital Finance',
    badgeCls: 'bg-sky-100 text-sky-700 border-sky-200',
    desc: 'Stress-test hospital financials against payer mix shifts, Medicaid rate cuts, and volume changes. Benchmarks against CAH, Rural PPS, and Urban Tertiary peers.',
    component: <HospitalFinancialScorecard />,
  },
  {
    id: 'hta', icon: '🔎', label: 'HTA Studio', badge: 'Health Technology Assessment',
    badgeCls: 'bg-sky-100 text-sky-700 border-sky-200',
    desc: 'Build budget impact models, run MCDA with 8 criteria, and execute real Monte Carlo PSA with 1,000 stochastic iterations using Beta, Log-normal, and Gamma distributions.',
    component: <HTAStudio />,
  },
  {
    id: 'actuarial', icon: '📉', label: 'Actuarial Lab', badge: 'Actuarial Science',
    badgeCls: 'bg-sky-100 text-sky-700 border-sky-200',
    desc: 'Calculate ACA actuarial value, develop premium rates across 3 methodologies, model adverse selection death spirals, and analyze IRA 2022 drug pricing impacts.',
    component: <ActuarialLab />,
  },
]

const TECH_TOOLS = [
  {
    id: 'ai', icon: '🤖', label: 'AI Analytics Lab', badge: 'Artificial Intelligence',
    badgeCls: 'bg-violet-100 text-violet-700 border-violet-200',
    desc: 'Compare predictive model performance, detect algorithmic bias with Demographic Parity and Equal Opportunity metrics, build AI governance frameworks, and calculate AI ROI.',
    component: <AIAnalyticsLab />,
  },
  {
    id: 'digital', icon: '📱', label: 'Digital Health Lab', badge: 'Digital Health',
    badgeCls: 'bg-violet-100 text-violet-700 border-violet-200',
    desc: 'Calculate RPM ROI using CMS CPT codes (99453–99458), model telehealth utilization under CMS policy scenarios, compare patient engagement platforms, and optimize EHR interoperability.',
    component: <DigitalHealthLab />,
  },
]

const KNOWLEDGE_TOOLS = [
  {
    id: 'evidence', icon: '📖', label: 'Evidence Library', badge: 'Research',
    badgeCls: 'bg-slate-200 text-slate-700 border-slate-300',
    desc: 'Search 25 landmark CEA/CUA studies, track 20 CMMI innovation models with full lesson-learned summaries, and browse 15 HTR policy briefs.',
    component: <EvidenceLibrary />,
  },
  {
    id: 'workforce', icon: '👨‍⚕️', label: 'Workforce Modeler', badge: 'Workforce',
    badgeCls: 'bg-slate-200 text-slate-700 border-slate-300',
    desc: 'Project physician supply and demand across 12 specialties over 10 years, simulate nurse staffing ratio impacts, calculate turnover costs, and model rural incentive programs.',
    component: <WorkforceModeler />,
  },
  {
    id: 'leaderboard', icon: '🏆', label: 'Innovation Leaderboard', badge: 'Benchmarking',
    badgeCls: 'bg-slate-200 text-slate-700 border-slate-300',
    desc: 'Rank all 50 states on a composite health transformation index, score 30 major health systems on VBC maturity, and compare 20 payers on innovation leadership.',
    component: <InnovationLeaderboard />,
  },
  {
    id: 'workspace', icon: '🗂️', label: 'Research Workspace', badge: 'Workspace',
    badgeCls: 'bg-slate-200 text-slate-700 border-slate-300',
    desc: 'Save and compare analysis scenarios, build structured reports from templates, manage citations in AMA/APA format, and export findings as Markdown or text.',
    component: <ResearchWorkspace />,
  },
]

/* ── Helper: build SubTabView tabs from a tool list ─────────────────────── */
function toSubTabs(tools: typeof INTEROP_TOOLS) {
  return tools.map(t => ({
    id: t.id,
    icon: <span>{t.icon}</span>,
    label: t.label,
    content: (
      <div>
        <ToolHeader icon={t.icon} label={t.label} badge={t.badge} badgeCls={t.badgeCls} desc={t.desc} />
        {t.component}
      </div>
    ),
  }))
}

/* ── Section tab content nodes ──────────────────────────────────────────── */
const InteropSection  = () => <SubTabView tabs={toSubTabs(INTEROP_TOOLS)}  />
const PaymentSection  = () => <SubTabView tabs={toSubTabs(PAYMENT_TOOLS)}  />
const PopulationSection = () => <SubTabView tabs={toSubTabs(POPULATION_TOOLS)} />
const PolicySection   = () => <SubTabView tabs={toSubTabs(POLICY_TOOLS)}   />
const TechSection     = () => <SubTabView tabs={toSubTabs(TECH_TOOLS)}     />
const KnowledgeSection = () => <SubTabView tabs={toSubTabs(KNOWLEDGE_TOOLS)} />

/* ── Main component ─────────────────────────────────────────────────────── */
export default function ResearchLabHub() {
  return (
    <HubPageTemplate
      badgeLabel="Research Lab"
      badgeClass="bg-indigo-50 text-indigo-700 border border-indigo-100"
      title="HTR Research Lab"
      subtitle="19 interactive analytical tools spanning every dimension of health system transformation — from FHIR interoperability to Monte Carlo health economic modeling."
      backLink="/"
      backLabel="Back to Home"
      backLinkHoverClass="hover:text-indigo-600"
      tabs={[
        {
          id: 'interoperability',
          icon: <span>🧬</span>,
          label: 'Interoperability & Risk',
          content: <InteropSection />,
        },
        {
          id: 'payment-models',
          icon: <span>💰</span>,
          label: 'Payment Models & VBC',
          content: <PaymentSection />,
        },
        {
          id: 'population-equity',
          icon: <span>👥</span>,
          label: 'Population & Equity',
          content: <PopulationSection />,
        },
        {
          id: 'policy-quality',
          icon: <span>📋</span>,
          label: 'Policy & Quality Sciences',
          content: <PolicySection />,
        },
        {
          id: 'technology-ai',
          icon: <span>🤖</span>,
          label: 'Technology & AI',
          content: <TechSection />,
        },
        {
          id: 'knowledge-workspace',
          icon: <span>📚</span>,
          label: 'Knowledge & Workspace',
          content: <KnowledgeSection />,
        },
      ]}
    />
  )
}
