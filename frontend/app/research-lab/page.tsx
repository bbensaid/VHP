import Link from "next/link";
import { getUser, roleAtLeast } from "@/lib/auth";
import UpgradePrompt from "@/components/UpgradePrompt";

export const metadata = {
  title: "HTR Research Lab | Health Transformation Review",
  description: "19 interactive analytical sandboxes spanning interoperability, payment models, population health, policy, AI, and workforce.",
};

export default async function ResearchLabPage() {
  const user = await getUser();
  const isSubscriber = user ? roleAtLeast(user.role, "subscriber") : false;
  const isAdvisory   = user ? roleAtLeast(user.role, "advisory")   : false;

  return (
    <div className="min-h-screen bg-white">

      {/* Page header */}
      <div className="bg-slate-950 text-white border-b border-slate-800">
        <div className="max-w-5xl mx-auto px-6 py-4">
          <span className="text-[10px] font-semibold uppercase tracking-widest text-amber-400 block mb-0.5">HTR Research Lab</span>
          <h1 className="text-xl font-bold tracking-tight">19 Interactive Analytical Tools</h1>
          <p className="text-sm text-slate-400 mt-0.5 max-w-2xl">Interoperability, payment innovation, population health, policy sciences, AI governance, and workforce strategy.</p>
        </div>
      </div>

      {/* Upgrade prompts */}
      {(!isSubscriber || (isSubscriber && !isAdvisory)) && (
        <div className="max-w-5xl mx-auto px-6 pt-10">
          {!isSubscriber && <UpgradePrompt required="subscriber" feature="Research Lab" />}
          {isSubscriber && !isAdvisory && (
            <UpgradePrompt required="advisory" feature="Research Lab Expert Support" compact />
          )}
        </div>
      )}

      {/* What the Lab covers */}
      <div className="max-w-5xl mx-auto px-6 py-16">
        <h2 className="text-2xl font-black text-slate-900 mb-2">Six Domain Labs</h2>
        <p className="text-slate-500 mb-10 max-w-2xl">
          Each lab contains multiple interactive tools built on real clinical, economic, and regulatory
          data models. Select a lab from the sidebar to begin.
        </p>

        <div className="grid md:grid-cols-2 gap-8">
          {[
            {
              icon: "🧬", label: "Interoperability & Risk",
              desc: "FHIR R4 resource validation, CDS Hooks testing, ONC compliance checking, HCC v28 risk stratification, and comorbidity interaction modeling using Elixhauser and Charlson indices.",
              tools: "FHIR Interoperability Lab · Risk Stratification Engine",
            },
            {
              icon: "💰", label: "Payment Models & VBC",
              desc: "APM design from scratch, shared savings projections under MSSP and ACO REACH, global budget modeling, cost-effectiveness analysis, and ICER/NICE threshold comparisons.",
              tools: "APM Design Lab · Shared Savings Calculator · CEA Calculator",
            },
            {
              icon: "👥", label: "Population & Equity",
              desc: "Markov chain disease progression, SIR epidemic dynamics, preventable hospitalization modeling, SDOH burden scoring, racial disparity analysis, and equity-weighted ICER via HEROI.",
              tools: "Population Health Modeler · Health Equity Studio",
            },
            {
              icon: "📋", label: "Policy & Quality Sciences",
              desc: "1115 waiver scenario modeling, Vermont global budget design, HEDIS measure simulation with NCQA benchmarks, CMS Star Ratings prediction across 32 sub-measures, and hospital financial stress-testing.",
              tools: "Policy Simulator · Clinical Quality Optimizer · Hospital Financial Scorecard · HTA Studio · Actuarial Lab",
            },
            {
              icon: "🤖", label: "Technology & AI",
              desc: "AI governance framework design, algorithmic bias detection, digital health program assessment, ONC certification compliance, and technology readiness scoring across clinical workflow dimensions.",
              tools: "AI Analytics Lab · Digital Health Lab",
            },
            {
              icon: "📚", label: "Knowledge & Workspace",
              desc: "Systematic evidence synthesis, workforce capacity modeling, innovation benchmarking against national leaders, and a persistent research workspace for saving and sharing analytical outputs.",
              tools: "Evidence Library · Workforce Modeler · Innovation Leaderboard · Research Workspace",
            },
          ].map((lab) => (
            <div key={lab.label} className="border border-slate-200 rounded-xl p-6">
              <div className="flex items-center gap-3 mb-3">
                <span className="text-2xl">{lab.icon}</span>
                <h3 className="font-black text-slate-900">{lab.label}</h3>
              </div>
              <p className="text-sm text-slate-600 leading-relaxed mb-3">{lab.desc}</p>
              <p className="text-[11px] font-semibold text-slate-400">{lab.tools}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Who uses it */}
      <div className="bg-slate-50 border-y border-slate-100">
        <div className="max-w-5xl mx-auto px-6 py-16">
          <h2 className="text-2xl font-black text-slate-900 mb-8">Built for Practitioners</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { role: "Health Economists", desc: "Model cost-effectiveness, shared savings scenarios, and investment returns with actuarial-grade rigor." },
              { role: "Policy Analysts", desc: "Simulate waiver impacts, benchmark HEDIS performance, and stress-test regulatory assumptions before they go live." },
              { role: "Technology Leaders", desc: "Validate FHIR implementations, assess AI governance frameworks, and score digital health readiness." },
            ].map((item) => (
              <div key={item.role} className="bg-white rounded-xl border border-slate-200 p-6">
                <h3 className="font-black text-slate-900 mb-2">{item.role}</h3>
                <p className="text-sm text-slate-500 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="max-w-5xl mx-auto px-6 py-16 text-center">
        <h2 className="text-2xl font-black text-slate-900 mb-3">Ready to run an analysis?</h2>
        <p className="text-slate-500 mb-6">Select a lab from the sidebar to open its tools directly.</p>
        <Link
          href="/research-lab/policy-quality"
          className="inline-block px-8 py-3 bg-amber-600 hover:bg-amber-700 text-white font-bold rounded-xl transition-colors"
        >
          Start with Policy & Quality Sciences →
        </Link>
      </div>

    </div>
  );
}
