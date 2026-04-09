"use client";

import { Suspense } from "react";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

// ── Metric Detail Component ────────────────────────────────────────────────────
const MetricDetail = ({
  pillar,
  metric,
  description,
  weight,
}: {
  pillar: string;
  metric: string;
  description: string;
  weight?: string;
}) => {
  const styles: Record<string, { label: string; bar: string; text: string; bg: string; border: string }> = {
    Policy:     { label: "Policy",     bar: "bg-sky-600",     text: "text-sky-700",    bg: "bg-sky-50",     border: "border-sky-200" },
    Economics:  { label: "Economics",  bar: "bg-emerald-500", text: "text-emerald-700", bg: "bg-emerald-50", border: "border-emerald-200" },
    Technology: { label: "Technology", bar: "bg-indigo-500",  text: "text-indigo-700",  bg: "bg-indigo-50",  border: "border-indigo-200" },
    Clinical:   { label: "Clinical",   bar: "bg-rose-500",    text: "text-rose-700",    bg: "bg-rose-50",    border: "border-rose-200" },
    Equity:     { label: "Equity",     bar: "bg-violet-500",  text: "text-violet-700",  bg: "bg-violet-50",  border: "border-violet-200" },
    Operations: { label: "Operations", bar: "bg-teal-500",  text: "text-teal-700",  bg: "bg-teal-50",  border: "border-teal-200" },
  };
  const s = styles[pillar] ?? styles["Policy"];

  return (
    <div className={`border ${s.border} rounded-xl p-5 ${s.bg}`}>
      <div className="flex items-center justify-between mb-2">
        <span className={`text-[10px] font-black tracking-[0.15em] uppercase ${s.text} flex items-center gap-2`}>
          <span className={`w-2 h-2 rounded-full ${s.bar}`} />
          {pillar}
        </span>
        {weight && (
          <span className={`text-[10px] font-black ${s.text} border ${s.border} px-2 py-0.5 rounded`}>
            weight: {weight}
          </span>
        )}
      </div>
      <dt className="text-base font-bold text-slate-900">{metric}</dt>
      <dd className="mt-1 text-sm text-slate-600 leading-relaxed">{description}</dd>
    </div>
  );
};

// ── Pillar Score Block ─────────────────────────────────────────────────────────
const PillarBlock = ({
  pillar,
  weight,
  metrics,
  barColor,
  textColor,
}: {
  pillar: string;
  weight: string;
  metrics: string[];
  barColor: string;
  textColor: string;
}) => (
  <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
    <div className={`${barColor} px-4 py-3 flex items-center justify-between`}>
      <span className="text-white font-black text-sm uppercase tracking-wider">{pillar}</span>
      <span className="text-white/80 text-xs font-bold">Index weight: {weight}</span>
    </div>
    <ul className="p-4 space-y-2">
      {metrics.map((m) => (
        <li key={m} className="flex items-center gap-2 text-sm text-slate-700">
          <span className={`w-1.5 h-1.5 rounded-full ${barColor} shrink-0`} />
          {m}
        </li>
      ))}
    </ul>
  </div>
);

function MethodologyPageInner() {
  const searchParams = useSearchParams();
  const from = searchParams.get("from");
  const backHref = from || "/dashboard";
  const backText = from ? "Back to State Page" : "Back to the Index Dashboard";

  return (
    <div className="bg-white font-sans text-slate-800 min-h-screen">

      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <div className="bg-indigo-700 text-white py-20 md:py-28 relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.4) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />
        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl translate-x-1/4 -translate-y-1/4 pointer-events-none" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <Link
              href={backHref}
              className="inline-flex items-center text-sm font-bold text-slate-400 hover:text-indigo-400 transition-colors"
            >
              <ArrowLeftIcon className="w-4 h-4 mr-1.5" />
              {backText}
            </Link>
          </div>
          <span className="text-[11px] font-black tracking-[0.2em] uppercase text-indigo-400 mb-5 block">
            Our Methodology
          </span>
          <h1 className="text-4xl md:text-6xl font-black tracking-tight leading-tight mb-6">
            The HTR Health System<br />
            <span className="text-indigo-400">Performance Index</span>
          </h1>
          <p className="text-xl text-slate-300 max-w-2xl leading-relaxed">
            A proprietary composite metric — built across six pillars and eighteen sub-metrics — designed to provide a standardized, cross-dimensional measure of each state&rsquo;s healthcare system performance and readiness for transformation.
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 space-y-20">

        {/* ── OVERVIEW ─────────────────────────────────────────────────── */}
        <section>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-8 bg-indigo-600 text-white rounded-lg flex items-center justify-center font-black text-sm">1</div>
            <h2 className="text-2xl md:text-3xl font-black text-slate-900">Framework Overview</h2>
          </div>
          <p className="text-slate-600 leading-relaxed text-lg mb-6">
The HTR Performance Index scores health system transformation readiness across six pillars: Policy, Economics, Technology, Clinical, Equity, and Operations. Each pillar addresses a distinct structural variable that determines whether a proposed transformation is permissible, sustainable, possible, effective, just, and executable. The Index reflects eighteen sub-metrics across those six pillars, each normalized to a 0–100 scale where a higher score is always better.
          </p>
          <div className="bg-indigo-50 border border-indigo-200 rounded-xl p-6">
            <p className="text-indigo-900 font-semibold text-sm leading-relaxed">
              <strong>Why six pillars?</strong> Policy, Economics, and Technology determine whether a transformation is authorized, funded, and infrastructurally possible. Clinical, Equity, and Operations determine whether it actually works, for whom, and whether the institution can execute it at scale. All six are co-equal structural variables. An analysis that answers only three of the six questions is incomplete — regardless of which three.
            </p>
          </div>
        </section>

        {/* ── INPUT METRICS ────────────────────────────────────────────── */}
        <section>
          <div className="flex items-center gap-3 mb-8">
            <div className="w-8 h-8 bg-indigo-600 text-white rounded-lg flex items-center justify-center font-black text-sm">2</div>
            <h2 className="text-2xl md:text-3xl font-black text-slate-900">Input Data &amp; Sub-Metrics</h2>
          </div>
          <p className="text-slate-600 leading-relaxed mb-8">
            Eighteen sub-metrics are calculated from primary government data sources — CMS, HRSA, FCC, CDC, HFMA, and state-level filings — and normalized to a 0–100 scale. Each pillar contributes three metrics to the composite score.
          </p>
          <div className="space-y-4">
            {/* Policy */}
            <MetricDetail
              pillar="Policy"
              metric="Value-Based Payment (VBP) Adoption"
              description="The extent to which payers and providers in the state have adopted VBP models over fee-for-service. Scored on CMS AHEAD enrollment, ACO participation, and Medicaid alternative payment model penetration."
              weight="0.20"
            />
            <MetricDetail
              pillar="Policy"
              metric="Telehealth Policy Permissiveness"
              description="Measures the breadth of reimbursement parity, geographic eligibility, and originating site flexibility in state telehealth law. Updated quarterly as legislative sessions advance."
              weight="0.10"
            />
            <MetricDetail
              pillar="Policy"
              metric="Scope of Practice Index"
              description="Reflects the degree to which state law allows nurse practitioners, physician assistants, and other advanced practice providers to operate at the full extent of their training — a key determinant of rural access."
              weight="0.10"
            />
            {/* Economics */}
            <MetricDetail
              pillar="Economics"
              metric="Per-Capita Healthcare Spending Efficiency"
              description="An efficiency score where a higher value indicates lower per-capita spending relative to national average, adjusted for population complexity. Captures resource allocation discipline."
              weight="0.10"
            />
            <MetricDetail
              pillar="Economics"
              metric="Workforce Availability Index"
              description="Measures the availability of primary care physicians, NPs, and PAs per 100,000 rural residents. A higher score indicates a smaller rural workforce gap and better primary access."
              weight="0.10"
            />
            <MetricDetail
              pillar="Economics"
              metric="Insurance Coverage Rate"
              description="Population-weighted score based on the percentage of residents with any form of health insurance, with additional weighting for rural county coverage rates."
              weight="0.10"
            />
            {/* Technology */}
            <MetricDetail
              pillar="Technology"
              metric="Health Information Exchange (HIE) Maturity"
              description="Represents the maturity, adoption rate, and bidirectional interoperability of the state's HIE infrastructure. Draws from ONC Health IT Dashboard data."
              weight="0.05"
            />
            <MetricDetail
              pillar="Technology"
              metric="Rural Broadband Access"
              description="FCC-sourced measurement of broadband availability and minimum qualifying speed in rural census blocks. Critical infrastructure for telehealth and remote monitoring viability."
              weight="0.05"
            />
            <MetricDetail
              pillar="Technology"
              metric="Certified EHR Adoption Rate"
              description="Adoption rate of ONC-certified Electronic Health Record systems among rural providers, sourced from CMS Medicare and Medicaid EHR Incentive Program data."
              weight="0.05"
            />
            {/* Clinical */}
            <MetricDetail
              pillar="Clinical"
              metric="Preventable Hospitalization Rate"
              description="Age-adjusted ambulatory care-sensitive condition (ACSC) hospitalization rate per 10,000 rural residents. Lower rates indicate more effective primary and preventive care delivery."
              weight="0.05"
            />
            <MetricDetail
              pillar="Clinical"
              metric="Rural Hospital Operational Viability"
              description="Composite of rural hospital operating margin, days cash on hand, and 30-day readmission rates. Identifies clinical infrastructure sustainability."
              weight="0.05"
            />
            <MetricDetail
              pillar="Clinical"
              metric="Advanced Care Access Index"
              description="Measures availability of specialist care, behavioral health services, and maternal health within 60 minutes of rural residents. Draws from HRSA Health Professional Shortage Area designations."
              weight="0.05"
            />
            {/* Equity */}
            <MetricDetail
              pillar="Equity"
              metric="Rural-Urban Outcome Disparity Gap"
              description="Composite mortality and hospitalization gap between rural and urban populations, covering cardiovascular, maternal, and behavioral health. Narrower gaps score higher."
              weight="0.05"
            />
            <MetricDetail
              pillar="Equity"
              metric="SDOH Screening & Referral Completion Rate"
              description="Percentage of Medicaid-attributed patients receiving standardized SDOH screening with documented referral completion. Sourced from CMS Quality Payment Program data."
              weight="0.05"
            />
            <MetricDetail
              pillar="Equity"
              metric="Algorithmic Disparity Index"
              description="Measures documented evidence of algorithmic bias in risk stratification tools deployed in the state, sourced from HHS Office for Civil Rights reports and peer-reviewed audits. Higher scores indicate lower documented bias."
              weight="0.05"
            />
            {/* Operations */}
            <MetricDetail
              pillar="Operations"
              metric="Administrative Cost Ratio"
              description="Administrative expenditures as a percentage of total health spending in the state, benchmarked against national average. Lower administrative overhead relative to peer states scores higher — reflecting a leaner, more execution-ready system."
              weight="0.05"
            />
            <MetricDetail
              pillar="Operations"
              metric="Revenue Cycle Performance Index"
              description="Composite of clean claim submission rate, claims denial rate, and days in accounts receivable across the state's major health systems. Sources: CMS cost reports and HFMA benchmark data. Higher scores indicate lower friction in payer-provider payment workflows."
              weight="0.05"
            />
            <MetricDetail
              pillar="Operations"
              metric="Workforce Operational Readiness"
              description="Composite of clinical staff vacancy rates, turnover rates, and credentialing cycle times across key workforce categories. Sourced from HRSA workforce data and ACHE operational surveys. Higher scores indicate a more stable and administratively capable workforce."
              weight="0.05"
            />
          </div>
        </section>

        {/* ── CALCULATION ──────────────────────────────────────────────── */}
        <section>
          <div className="flex items-center gap-3 mb-8">
            <div className="w-8 h-8 bg-indigo-600 text-white rounded-lg flex items-center justify-center font-black text-sm">3</div>
            <h2 className="text-2xl md:text-3xl font-black text-slate-900">Calculation Methodology</h2>
          </div>

          <p className="text-slate-600 leading-relaxed mb-8">
            The final <code className="bg-slate-100 px-1.5 py-0.5 rounded text-sm font-mono text-indigo-700">performanceScore</code> is calculated in two steps: pillar scores first, then a weighted composite.
          </p>

          {/* Step 1: Pillar Scores */}
          <div className="space-y-4 mb-10">
            <div className="flex gap-4 items-start p-6 bg-white border border-slate-200 rounded-xl shadow-sm">
              <div className="w-10 h-10 bg-slate-100 rounded-lg flex items-center justify-center font-black text-slate-700 shrink-0">1</div>
              <div className="flex-1">
                <h3 className="font-bold text-slate-900 mb-2">Pillar Scores</h3>
                <p className="text-sm text-slate-600 mb-4">
                  Each pillar score is the simple average of its three normalized sub-metrics:
                </p>
                <code className="block bg-slate-50 border border-slate-200 rounded-lg p-4 text-sm font-mono text-slate-800">
                  Pillar Score = (Metric₁ + Metric₂ + Metric₃) ÷ 3
                </code>
              </div>
            </div>

            <div className="flex gap-4 items-start p-6 bg-white border border-slate-200 rounded-xl shadow-sm">
              <div className="w-10 h-10 bg-slate-100 rounded-lg flex items-center justify-center font-black text-slate-700 shrink-0">2</div>
              <div className="flex-1">
                <h3 className="font-bold text-slate-900 mb-2">Composite Performance Score</h3>
                <p className="text-sm text-slate-600 mb-4">
                  The final score is a weighted average of six pillar scores. Policy and Economics carry the greatest weight as the foundational structural drivers. Operations, Technology, and Clinical carry equal secondary weights. Equity carries a baseline weight scheduled to increase as data coverage improves:
                </p>
                <code className="block bg-slate-50 border border-slate-200 rounded-lg p-4 text-sm font-mono text-slate-800">
                  Score = (Policy × 0.25) + (Economics × 0.25) + (Operations × 0.15) + (Technology × 0.10) + (Clinical × 0.15) + (Equity × 0.10)
                </code>
                <p className="text-xs text-slate-400 mt-3 italic">
                  Note: Operations weight was introduced at 0.15 in the 2026 Index version. Equity weight is scheduled for review in the 2027 Index version as SDOH and algorithmic bias data quality improves across states. We expect to increase Equity weighting to 0.15 as data coverage reaches ≥90% of states, with a corresponding reduction in Technology weighting.
                </p>
              </div>
            </div>
          </div>

          {/* Pillar Weight Grid */}
          <div className="grid md:grid-cols-3 lg:grid-cols-6 gap-4 mb-10">
            <PillarBlock
              pillar="Policy" weight="25%"
              barColor="bg-sky-600"
              textColor="text-sky-700"
              metrics={["VBP Adoption", "Telehealth Policy", "Scope of Practice"]}
            />
            <PillarBlock
              pillar="Economics" weight="25%"
              barColor="bg-emerald-500"
              textColor="text-emerald-700"
              metrics={["Per-Capita Efficiency", "Workforce Availability", "Insurance Coverage"]}
            />
            <PillarBlock
              pillar="Operations" weight="15%"
              barColor="bg-teal-500"
              textColor="text-teal-700"
              metrics={["Admin Cost Ratio", "Revenue Cycle Performance", "Workforce Readiness"]}
            />
            <PillarBlock
              pillar="Technology" weight="10%"
              barColor="bg-indigo-500"
              textColor="text-indigo-700"
              metrics={["HIE Maturity", "Broadband Access", "EHR Adoption"]}
            />
            <PillarBlock
              pillar="Clinical" weight="15%"
              barColor="bg-rose-500"
              textColor="text-rose-700"
              metrics={["Preventable Hospitalization", "Operational Viability", "Care Access Index"]}
            />
            <PillarBlock
              pillar="Equity" weight="10%"
              barColor="bg-violet-500"
              textColor="text-violet-700"
              metrics={["Outcome Disparity Gap", "SDOH Referral Rate", "Algorithmic Disparity"]}
            />
          </div>
        </section>

        {/* ── OUTPUT & INTERPRETATION ──────────────────────────────────── */}
        <section>
          <div className="flex items-center gap-3 mb-8">
            <div className="w-8 h-8 bg-indigo-600 text-white rounded-lg flex items-center justify-center font-black text-sm">4</div>
            <h2 className="text-2xl md:text-3xl font-black text-slate-900">Output &amp; Interpretation</h2>
          </div>
          <p className="text-slate-600 leading-relaxed mb-6">
            The Index produces a quantitative score and a qualitative status tier for rapid executive interpretation. Status tiers are designed to communicate urgency, not to rank states against each other — two states with identical scores may face entirely different structural challenges.
          </p>
          <div className="space-y-3">
            {[
              { range: "80–100", label: "Leading", desc: "National leaders with strong cross-pillar performance. States setting replication-worthy standards in at least four of the six dimensions.", borderColor: "border-emerald-500", bg: "bg-emerald-50", titleColor: "text-emerald-800", bodyColor: "text-emerald-700" },
              { range: "70–79", label: "Improving", desc: "States with solid structural foundations and measurable positive momentum. Typically strong in Policy and Economics with Technology and Clinical gains in progress.", borderColor: "border-green-500", bg: "bg-green-50", titleColor: "text-green-800", bodyColor: "text-green-700" },
              { range: "60–69", label: "Stable", desc: "Mixed performance across pillars — typically strong in one or two dimensions and structurally lagging in others. At risk of slipping to At Risk without targeted intervention.", borderColor: "border-yellow-500", bg: "bg-yellow-50", titleColor: "text-yellow-800", bodyColor: "text-yellow-700" },
              { range: "< 60", label: "At Risk", desc: "States facing significant structural deficits across multiple pillars. Typically characterized by persistent equity gaps, workforce shortages, or operating margin crises that undermine cross-pillar gains.", borderColor: "border-red-500", bg: "bg-red-50", titleColor: "text-red-800", bodyColor: "text-red-700" },
            ].map((tier) => (
              <div key={tier.label} className={`${tier.bg} border-l-4 ${tier.borderColor} p-5 rounded-r-xl`}>
                <div className="flex items-center gap-3 mb-1">
                  <p className={`font-black text-lg ${tier.titleColor}`}>{tier.label}</p>
                  <span className={`text-xs font-bold ${tier.titleColor} opacity-60`}>{tier.range}</span>
                </div>
                <p className={`text-sm ${tier.bodyColor} leading-relaxed`}>{tier.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── DATA SOURCES ─────────────────────────────────────────────── */}
        <section>
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-8 bg-indigo-600 text-white rounded-lg flex items-center justify-center font-black text-sm">5</div>
            <h2 className="text-2xl md:text-3xl font-black text-slate-900">Primary Data Sources</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            {[
              { source: "CMS Quality Payment Program", use: "VBP adoption, SDOH screening rates" },
              { source: "HRSA Area Health Resources Files", use: "Workforce availability, HPSA designations" },
              { source: "FCC Broadband Data Collection", use: "Rural broadband access and speed" },
              { source: "ONC Health IT Dashboard", use: "HIE maturity, EHR adoption rates" },
              { source: "CDC BRFSS & WONDER Database", use: "Rural-urban outcome disparity metrics" },
              { source: "HHS Office for Civil Rights", use: "Algorithmic bias documentation" },
              { source: "CMS Cost Reports", use: "Hospital operational viability metrics" },
              { source: "State Legislative Databases", use: "Telehealth policy, scope of practice law" },
              { source: "HFMA Benchmark Data", use: "Revenue cycle performance, clean claim rates, days in AR" },
              { source: "ACHE & MGMA Operational Surveys", use: "Workforce vacancy, turnover, and credentialing cycle times" },
            ].map((d) => (
              <div key={d.source} className="flex gap-3 p-4 bg-slate-50 border border-slate-200 rounded-xl">
                <span className="text-indigo-600 font-black text-sm shrink-0">→</span>
                <div>
                  <p className="font-bold text-slate-900 text-sm">{d.source}</p>
                  <p className="text-xs text-slate-500 mt-0.5">{d.use}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── FOOTER CTA ───────────────────────────────────────────────── */}
        <div className="bg-indigo-700 text-white rounded-2xl p-8 md:p-10 text-center">
          <h3 className="text-xl font-black mb-3">Explore the Performance Index</h3>
          <p className="text-indigo-100 text-sm mb-6">
            See how every state scores across all six pillars — and drill into sub-metric detail.
          </p>
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-2 bg-indigo-600 text-white px-8 py-3 rounded-lg font-bold hover:bg-indigo-700 transition-colors"
          >
            Launch Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function MethodologyPage() {
  return (
    <Suspense fallback={null}>
      <MethodologyPageInner />
    </Suspense>
  );
}
