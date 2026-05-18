import Link from "next/link";
import { getUser, roleAtLeast } from "@/lib/auth";
import UpgradePrompt from "@/components/UpgradePrompt";
import FromTheBook from "@/components/FromTheBook";

export const metadata = {
  title: "HTR Research Lab | Health Transformation Review",
  description: "24 interactive analytical tools organized by the six-pillar framework: Policy, Economics, Technology, Clinical, Equity, and Operations.",
};

const PILLAR_LABS: {
  id: string;
  label: string;
  color: string;
  bg: string;
  border: string;
  dot: string;
  tools: { label: string; desc: string; href: string }[];
}[] = [
  {
    id: "policy", label: "Policy", color: "text-sky-700", bg: "bg-sky-50", border: "border-sky-200", dot: "bg-sky-500",
    tools: [
      { label: "Policy Simulator", desc: "Model 1115 waivers, global budgets, and Medicaid expansion scenarios.", href: "/research-lab/policy-quality?tab=policy" },
      { label: "Innovation Leaderboard", desc: "Rank all 50 states on health transformation and innovation activity.", href: "/research-lab/knowledge-workspace?tab=leaderboard" },
    ],
  },
  {
    id: "economics", label: "Economics", color: "text-emerald-700", bg: "bg-emerald-50", border: "border-emerald-200", dot: "bg-emerald-500",
    tools: [
      { label: "APM Design Lab", desc: "Design novel APMs — episode bundles, global budgets, benchmark waterfalls.", href: "/research-lab/payment-models?tab=apm-design" },
      { label: "Shared Savings Calculator", desc: "Model MSSP, ACO REACH, and global budget shared savings scenarios.", href: "/research-lab/payment-models?tab=apm-calc" },
      { label: "CEA Calculator", desc: "Calculate cost per QALY, NNT, and break-even timeline for any intervention.", href: "/research-lab/payment-models?tab=cea" },
      { label: "Hospital Financial Stress Test", desc: "Stress-test hospital financials against payer mix, Medicaid cuts, and global budget scenarios.", href: "/research-lab/policy-quality?tab=scorecard" },
      { label: "HTA Studio", desc: "Build budget impact models and run Monte Carlo PSA with 1,000 iterations.", href: "/research-lab/policy-quality?tab=hta" },
      { label: "Actuarial Lab", desc: "Calculate ACA actuarial value, model adverse selection, and IRA drug pricing.", href: "/research-lab/policy-quality?tab=actuarial" },
    ],
  },
  {
    id: "technology", label: "Technology", color: "text-indigo-700", bg: "bg-indigo-50", border: "border-indigo-200", dot: "bg-indigo-500",
    tools: [
      { label: "FHIR Interoperability Lab", desc: "Build and validate FHIR R4 resources, test CDS Hooks, check ONC compliance.", href: "/research-lab/interoperability?tab=fhir" },
      { label: "Clinical Data Exchange Lab", desc: "Annotated HL7 v2 messages (ADT/ORU), FHIR R4 bundles, HL7↔FHIR bridge, and USCDI v3 data element browser — anchored to 8 Vermont patient scenarios.", href: "/research-lab/vbc-clinical-quality?tab=hl7" },
      { label: "AI Clinical Governance Lab", desc: "Compare predictive models, detect algorithmic bias, build AI governance frameworks.", href: "/research-lab/technology-ai?tab=ai" },
      { label: "Digital Health Lab", desc: "Calculate RPM ROI, model telehealth utilization, optimize EHR interoperability.", href: "/research-lab/technology-ai?tab=digital" },
    ],
  },
  {
    id: "clinical", label: "Clinical", color: "text-red-700", bg: "bg-red-50", border: "border-red-200", dot: "bg-red-500",
    tools: [
      { label: "Risk Stratification Engine", desc: "Apply HCC v28 RAF scoring and segment populations by clinical complexity.", href: "/research-lab/interoperability?tab=risk" },
      { label: "Risk Stratification Methodology", desc: "Step-by-step HCC v28 RAF calculation per patient, population tier pyramid, and comparison of HCC vs. ACG vs. CDPS vs. Charlson algorithms.", href: "/research-lab/vbc-clinical-quality?tab=risk" },
      { label: "VBC Quality Measures", desc: "HEDIS panel with numerator/denominator logic, 30-day readmission (CMS RSRR), and AHRQ PQI avoidable ED analysis — 8 Vermont patient scenarios.", href: "/research-lab/vbc-clinical-quality?tab=quality" },
      { label: "High vs. Low Value Care", desc: "A1C/BP panel management with VBC savings calculations, Choosing Wisely scan, and TCOC decomposition by service category.", href: "/research-lab/vbc-clinical-quality?tab=value" },
      { label: "Clinical Quality Optimizer", desc: "Simulate HEDIS measures, predict CMS Star Ratings, optimize MIPS scores.", href: "/research-lab/policy-quality?tab=quality" },
      { label: "Workforce Modeler", desc: "Project physician and nursing supply/demand across 12 specialties over 10 years.", href: "/research-lab/knowledge-workspace?tab=workforce" },
    ],
  },
  {
    id: "equity", label: "Equity", color: "text-violet-700", bg: "bg-violet-50", border: "border-violet-200", dot: "bg-violet-500",
    tools: [
      { label: "Population Health Modeler", desc: "Run Markov chain disease progression models and SIR epidemic dynamics.", href: "/research-lab/population-equity?tab=population" },
      { label: "Health Equity Studio", desc: "Analyze disparities across 10 outcomes and compute equity-weighted ICER via HEROI.", href: "/research-lab/population-equity?tab=equity" },
    ],
  },
  {
    id: "operations", label: "Operations", color: "text-teal-700", bg: "bg-teal-50", border: "border-teal-200", dot: "bg-teal-500",
    tools: [
      { label: "Transformation Scorecard", desc: "Executive six-pillar dashboard — score Policy, Economics, Technology, Clinical, Equity, and Operations with Vermont AHEAD milestone tracking.", href: "/research-lab/knowledge-workspace?tab=scorecard" },
      { label: "VBC Readiness Assessment", desc: "30-dimension, 6-domain self-assessment producing a readiness score and prioritized gap analysis for value-based care transformation. Vermont AHEAD presets included.", href: "/research-lab/knowledge-workspace?tab=readiness" },
      { label: "Evidence Library", desc: "Search 25 landmark CEA/CUA studies and 20 CMMI innovation model summaries.", href: "/research-lab/knowledge-workspace?tab=evidence" },
      { label: "Research Workspace", desc: "Save scenarios, build structured reports, manage citations, and export findings.", href: "/research-lab/knowledge-workspace?tab=workspace" },
    ],
  },
];

export default async function ResearchLabPage() {
  const user = await getUser();
  const isSubscriber = user ? roleAtLeast(user.role, "subscriber") : false;
  const isAdvisory   = user ? roleAtLeast(user.role, "advisory")   : false;

  return (
    <div className="min-h-screen bg-white">

      {/* Page header */}
      <div className="bg-slate-950 text-white">
        <div className="max-w-5xl mx-auto px-6 py-20">
          <span className="text-[10px] font-black uppercase tracking-widest text-amber-400 block mb-4">HTR Research Lab</span>
          <h1 className="ty-h1-xl font-black tracking-tight mb-5 leading-tight">24 Analytical Tools — Organized by Domain</h1>
          <p className="ty-hero text-slate-300 max-w-2xl leading-relaxed">
            Every tool is assigned to one of the six pillars. Access tools directly from their pillar section in the sidebar, or browse the full directory below.
          </p>
        </div>
      </div>


      {/* Tools by pillar */}
      <div className="max-w-5xl mx-auto px-6 py-16 space-y-10">
        <FromTheBook
          chapter="Chapters 1–20"
          chapterTitle="Every Research Lab Tool Has a Chapter"
          excerpt="The Research Lab is the interactive counterpart to the book. The APM Design Lab maps to Chapter 8–9 (Economics). The Risk Stratification Engine maps to Chapters 11 & 13. The Policy Simulator maps to Chapters 4–5. Appendix G of the book provides the complete chapter-to-tool mapping."
          href="/book"
        />

        <h2 className="text-2xl font-black text-slate-900">Tools by Domain</h2>

        {PILLAR_LABS.map((pillar) => (
          <div key={pillar.id} className={`rounded-2xl border ${pillar.border} ${pillar.bg} p-6`}>
            {/* Pillar header */}
            <div className="flex items-center gap-2.5 mb-5">
              <span className={`w-3 h-3 rounded-full ${pillar.dot} shrink-0`} />
              <h3 className={`text-base font-black uppercase tracking-widest ${pillar.color}`}>
                {pillar.label}
              </h3>
              <Link
                href={`/${pillar.id}`}
                className={`ml-auto text-[10px] font-bold uppercase tracking-widest ${pillar.color} hover:underline opacity-70`}
              >
                {pillar.label} Intelligence →
              </Link>
            </div>

            {/* Tool cards */}
            <div className="grid sm:grid-cols-2 gap-3">
              {pillar.tools.map((tool) => (
                <Link
                  key={tool.href}
                  href={tool.href}
                  className="bg-white rounded-xl border border-white/80 hover:border-slate-200 hover:shadow-sm p-4 transition-all group"
                >
                  <p className={`text-sm font-bold ${pillar.color} mb-1 group-hover:underline`}>{tool.label}</p>
                  <p className="text-xs text-slate-500 leading-relaxed">{tool.desc}</p>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Who uses it */}
      <div className="bg-slate-50 border-y border-slate-100">
        <div className="max-w-5xl mx-auto px-6 py-16">
          <h2 className="text-2xl font-black text-slate-900 mb-8">Built for Practitioners</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { role: "Health Economists", desc: "Model cost-effectiveness, shared savings, and actuarial risk with domain-matched tools under the Economics pillar." },
              { role: "Policy Analysts", desc: "Simulate waiver impacts, benchmark HEDIS performance, and stress-test regulatory assumptions under the Policy pillar." },
              { role: "Technology Leaders", desc: "Validate FHIR implementations, govern AI models, and assess digital health readiness under the Technology pillar." },
              { role: "Clinical Quality Managers", desc: "Analyze HEDIS measure gaps, 30-day readmissions, and avoidable ED visits against synthetic Vermont patient panels. Calculate VBC shared savings from quality improvement." },
              { role: "Medicaid Program Staff", desc: "Walk through VCCI risk stratification — CDPS scoring, composite score calculation, SDOH screening, and tier assignment with synthetic Vermont Medicaid member scenarios." },
              { role: "VBC Care Management Directors", desc: "Decompose total cost of care, identify high vs. low value services, manage A1C and blood pressure panels, and apply HCC risk adjustment to ACO performance analysis." },
            ].map((item) => (
              <div key={item.role} className="bg-white rounded-xl border border-slate-200 p-6">
                <h3 className="font-black text-slate-900 mb-2">{item.role}</h3>
                <p className="text-sm text-slate-500 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

    </div>
  );
}
