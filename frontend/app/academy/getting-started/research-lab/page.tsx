import Link from "next/link";
import { ArrowLeftIcon, ArrowTopRightOnSquareIcon } from "@heroicons/react/24/outline";

export const metadata = {
  title: "Research Lab Guide | HTR Getting Started",
  description: "How to use HTR's 21 research lab tools — what each tool does and when to use it.",
};

const LAB_GROUPS = [
  {
    id: "interoperability",
    icon: "🧬",
    label: "Interoperability & Risk",
    href: "/research-lab/interoperability",
    tools: [
      {
        tab: "?tab=fhir",
        name: "FHIR Interoperability Lab",
        who: "Health IT professionals, clinical informaticists",
        when: "When analyzing CMS interoperability rule compliance, testing FHIR R4 resource design, or planning a Patient Access / Provider Directory API implementation.",
        tip: "Start by selecting the rule or use case — the lab walks you through the relevant FHIR resources and compliance checkpoints.",
      },
      {
        tab: "?tab=risk",
        name: "Risk Stratification Engine",
        who: "Population health managers, data scientists, clinical teams",
        when: "When building a risk-stratified care management program, validating HCC scores, or designing the data inputs for a predictive model.",
        tip: "Use the HCC v28 RAF scoring module first to understand your population's risk profile before designing interventions.",
      },
    ],
  },
  {
    id: "payment-models",
    icon: "💰",
    label: "Payment Models & VBC",
    href: "/research-lab/payment-models",
    tools: [
      {
        tab: "?tab=apm-design",
        name: "APM Design Lab",
        who: "Health economists, payment model consultants, payers, hospital finance teams",
        when: "When designing a new alternative payment model, evaluating an existing model structure, or preparing a CMS Innovation Center application.",
        tip: "Start with model type selection, then configure the risk arrangement. Use the natural-language recommendation engine if you're unsure which structure fits your situation.",
      },
      {
        tab: "?tab=apm-calc",
        name: "Shared Savings Calculator",
        who: "Health economists, ACO finance teams, consultants",
        when: "When projecting the financial performance of an APM arrangement — whether designing it, evaluating participation, or stress-testing assumptions.",
        tip: "Run multiple scenarios: vary the benchmark growth rate and quality withhold to understand the range of financial outcomes.",
      },
      {
        tab: "?tab=cea",
        name: "Cost-Effectiveness Analysis Calculator",
        who: "Health economists, HTA analysts, researchers, payers",
        when: "When evaluating the value of a clinical intervention, drug, or technology — or when preparing an ICER submission or payer coverage argument.",
        tip: "The tool compares your ICER against ICER, NICE, and CMS thresholds automatically — use this comparison in your coverage decision brief.",
      },
      {
        tab: "?tab=gb-transition",
        name: "Global Budget Transition Modeler",
        who: "State health officials, hospital finance teams, policy analysts",
        when: "When modeling the financial trajectory of a state transitioning from fee-for-service to a global hospital budget — Vermont AHEAD, Maryland Model, or a custom scenario.",
        tip: "Cross-reference with the Vermont AHEAD Model page (/ahead-model) for Vermont-specific parameters.",
      },
    ],
  },
  {
    id: "population-equity",
    icon: "👥",
    label: "Population & Equity",
    href: "/research-lab/population-equity",
    tools: [
      {
        tab: "?tab=population",
        name: "Population Health Modeler",
        who: "Population health managers, ACOs, public health officials, researchers",
        when: "When modeling disease burden, projecting the impact of preventive interventions, or building the analytic foundation for a care management program.",
        tip: "Run the Markov chain model for your primary chronic conditions first — it gives you the baseline trajectory to compare interventions against.",
      },
      {
        tab: "?tab=equity",
        name: "Health Equity Studio",
        who: "Equity officers, public health teams, clinicians, researchers",
        when: "When analyzing disparities in outcomes or access, identifying SDOH drivers, or designing equity-weighted program evaluation.",
        tip: "The HEROI metric (equity-weighted ICER) lets you compare interventions on both cost-effectiveness and equity impact in a single number.",
      },
    ],
  },
  {
    id: "policy-quality",
    icon: "📋",
    label: "Policy & Quality Sciences",
    href: "/research-lab/policy-quality",
    tools: [
      {
        tab: "?tab=policy",
        name: "Policy Simulator",
        who: "Policy analysts, state Medicaid officials, researchers",
        when: "When modeling the downstream impact of proposed legislation — coverage changes, Medicaid expansion, price transparency, or global budget adoption.",
        tip: "The 1115 waiver module is particularly detailed — use it for Vermont-specific global budget and waiver scenario analysis.",
      },
      {
        tab: "?tab=quality",
        name: "Clinical Quality Optimizer",
        who: "Clinicians, quality officers, VBC contracting teams",
        when: "When optimizing HEDIS measures, projecting CMS Star Ratings, or modeling the financial impact of quality performance in a VBC contract.",
        tip: "Run the MIPS composite score optimizer first if you're in a fee-for-service environment — it identifies the highest-ROI quality measures to target.",
      },
      {
        tab: "?tab=scorecard",
        name: "Hospital Financial Stress Test",
        who: "Hospital CFOs, health economists, consultants, investors",
        when: "When modeling how policy changes, Medicaid rate cuts, or volume shifts will affect a hospital's financial position.",
        tip: "Use the Vermont presets (NVRH, Gifford, UVM Medical Center) for Vermont-specific baseline scenarios.",
      },
      {
        tab: "?tab=hta",
        name: "HTA Studio",
        who: "HTA analysts, payers, health economists",
        when: "When conducting a formal health technology assessment — budget impact, MCDA, or probabilistic sensitivity analysis.",
        tip: "The Monte Carlo PSA runs 1,000 iterations — allow a few seconds for the simulation to complete before reading the cost-effectiveness plane.",
      },
      {
        tab: "?tab=actuarial",
        name: "Actuarial Lab",
        who: "Actuaries, payers, state Medicaid offices",
        when: "When developing premium rates, capitation rates, or modeling coverage cost projections under different benefit designs or policy scenarios.",
        tip: "The IRA 2022 drug pricing module is particularly useful for understanding the downstream premium impact of Medicare negotiation.",
      },
      {
        tab: "?tab=medicaid-wr",
        name: "Work Requirements Calculator",
        who: "State Medicaid officials, policy analysts, compliance officers",
        when: "When modeling the enrollment and budget impact of proposed Medicaid work requirement policies.",
        tip: "Compare your state's results against the Arkansas and Georgia historical data embedded in the tool — it gives you a calibration benchmark.",
      },
      {
        tab: "?tab=hr1-cliff",
        name: "H.R. 1 Cliff Scenario",
        who: "State officials, hospital finance teams, policy analysts",
        when: "When assessing the financial exposure of your state or hospital system to the federal Medicaid changes proposed in H.R. 1.",
        tip: "Run this alongside the Hospital Financial Stress Test for a complete picture of provider-level impact.",
      },
    ],
  },
  {
    id: "technology-ai",
    icon: "🤖",
    label: "Technology & AI",
    href: "/research-lab/technology-ai",
    tools: [
      {
        tab: "?tab=ai",
        name: "AI Clinical Governance Lab",
        who: "Health IT professionals, clinical leaders, compliance officers, product managers",
        when: "When building an AI governance framework, evaluating a clinical AI tool, or preparing for FDA SaMD review or ONC HTI-2 compliance.",
        tip: "Use the bias detection module (Demographic Parity and Equal Opportunity metrics) early — algorithmic bias is the most common governance gap.",
      },
      {
        tab: "?tab=digital",
        name: "Digital Health Lab",
        who: "Digital health product managers, investors, health system IT leaders",
        when: "When mapping reimbursement pathways, modeling RPM ROI, or evaluating a digital health product's regulatory and market positioning.",
        tip: "The CPT code ROI calculator (99453–99458) gives you a concrete financial case for RPM that you can present to clinical and finance leadership.",
      },
    ],
  },
  {
    id: "knowledge-workspace",
    icon: "📚",
    label: "Knowledge & Workspace",
    href: "/research-lab/knowledge-workspace",
    tools: [
      {
        tab: "?tab=scorecard",
        name: "Transformation Scorecard",
        who: "All roles — especially executives and consultants",
        when: "When assessing an organization's overall healthcare transformation readiness across all six pillars.",
        tip: "Self-score honestly — the value is in identifying your lowest-scoring areas, not in a high composite score.",
      },
      {
        tab: "?tab=readiness",
        name: "VBC Readiness Assessment",
        who: "Health system leaders, VBC contracting teams, consultants",
        when: "When evaluating a health system's readiness to take on financial risk in a value-based care arrangement.",
        tip: "The 30-dimension assessment takes about 15 minutes. Use the Vermont AHEAD and CAH presets as starting points for Vermont organizations.",
      },
      {
        tab: "?tab=evidence",
        name: "Evidence Library",
        who: "All roles",
        when: "When you need research backing for your analysis — as a starting point for any modeling work or to validate assumptions.",
        tip: "Search by pillar and topic before running any Research Lab model — the Evidence Library tells you what the research says about realistic assumptions.",
      },
      {
        tab: "?tab=workforce",
        name: "Workforce Modeler",
        who: "HR leaders, operations officers, state workforce planners",
        when: "When projecting physician or nurse supply/demand, modeling staffing ratio policy impacts, or building a rural recruitment strategy.",
        tip: "Start with the 10-year specialty supply/demand projection — it's the foundation for all other workforce planning in the tool.",
      },
      {
        tab: "?tab=leaderboard",
        name: "Innovation Leaderboard",
        who: "Executives, consultants, investors, researchers",
        when: "When benchmarking your state, health system, or payer against peers on health transformation maturity.",
        tip: "Use the state composite index to identify which states are leading on which pillars — it surfaces specific program models worth studying.",
      },
      {
        tab: "?tab=workspace",
        name: "Research Workspace",
        who: "Researchers, analysts, consultants",
        when: "When conducting an extended research session that spans multiple tools and requires structured note-taking and citation management.",
        tip: "Save scenarios as you go — the workspace doesn't auto-save. Export in Markdown for easy integration into your reports or AI Analyst sessions.",
      },
    ],
  },
];

export default function ResearchLabGuidePage() {
  return (
    <div className="min-h-screen bg-white dark:bg-slate-900">

      {/* Header */}
      <div className="bg-slate-950 text-white border-b border-slate-800">
        <div className="max-w-5xl mx-auto px-6 py-4">
          <Link
            href="/academy/getting-started"
            className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-slate-200 transition-colors mb-3"
          >
            <ArrowLeftIcon className="w-3 h-3" />
            Getting Started
          </Link>
          <span className="text-[10px] font-semibold uppercase tracking-widest text-sky-400 block mb-0.5">Feature Guide</span>
          <h1 className="text-xl font-bold tracking-tight">Research Lab — How to Use Each Tool</h1>
          <p className="text-sm text-slate-400 mt-0.5 max-w-2xl">
            Who each tool is for, when to use it, and one power tip per tool.
          </p>
        </div>
      </div>

      {/* Tools */}
      <div className="max-w-5xl mx-auto px-6 py-12 space-y-16">
        {LAB_GROUPS.map((group) => (
          <section key={group.id}>
            <div className="flex items-center gap-3 mb-6">
              <span className="text-2xl">{group.icon}</span>
              <div>
                <h2 className="text-lg font-black text-slate-900 dark:text-slate-100">{group.label}</h2>
                <Link
                  href={group.href}
                  className="inline-flex items-center gap-1 text-xs text-indigo-600 dark:text-indigo-400 hover:underline"
                >
                  Open in Research Lab
                  <ArrowTopRightOnSquareIcon className="w-3 h-3" />
                </Link>
              </div>
            </div>
            <div className="space-y-4">
              {group.tools.map((tool) => (
                <div
                  key={tool.tab}
                  className="p-5 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-100 dark:border-slate-700"
                >
                  <div className="flex items-start justify-between gap-4 mb-3">
                    <h3 className="font-black text-slate-900 dark:text-slate-100">{tool.name}</h3>
                    <Link
                      href={`${group.href}${tool.tab}`}
                      className="shrink-0 inline-flex items-center gap-1 text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:underline"
                    >
                      Open tool
                      <ArrowTopRightOnSquareIcon className="w-3 h-3" />
                    </Link>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500 mb-1">Best for</p>
                      <p className="text-slate-600 dark:text-slate-300">{tool.who}</p>
                    </div>
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500 mb-1">When to use it</p>
                      <p className="text-slate-600 dark:text-slate-300">{tool.when}</p>
                    </div>
                  </div>
                  <div className="mt-3 pt-3 border-t border-slate-200 dark:border-slate-600">
                    <p className="text-[10px] font-bold uppercase tracking-widest text-indigo-500 dark:text-indigo-400 mb-1">Power tip</p>
                    <p className="text-sm text-slate-600 dark:text-slate-300">{tool.tip}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>

      {/* Back link */}
      <div className="max-w-5xl mx-auto px-6 pb-20">
        <Link
          href="/academy/getting-started"
          className="inline-flex items-center gap-2 text-sm font-semibold text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 transition-colors"
        >
          <ArrowLeftIcon className="w-4 h-4" />
          Back to Getting Started
        </Link>
      </div>
    </div>
  );
}
