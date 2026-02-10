import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';

export const metadata = {
  title: "HTR Health System Performance Index Methodology",
  description: "A detailed explanation of the definition, calculation, and data sources for the HTR Health System Performance Index.",
};

const MetricDetail = ({ pillar, metric, description }: { pillar: string, metric: string, description: string }) => {
    let pillarColor = "text-slate-700";
    if (pillar === 'Policy') pillarColor = "text-brand-orange";
    if (pillar === 'Economics') pillarColor = "text-brand-green";
    if (pillar === 'Technology') pillarColor = "text-brand-indigo";

    return (
        <div className="border-t border-slate-200 py-4">
            <dt className={`text-sm font-bold tracking-wider uppercase ${pillarColor}`}>{pillar}</dt>
            <dd className="mt-1 text-base text-slate-800 font-semibold">{metric}</dd>
            <dd className="mt-1 text-sm text-slate-600 leading-relaxed">{description}</dd>
        </div>
    )
}

export default function MethodologyPage() {
  return (
    <div className="bg-white py-12 sm:py-16">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-3xl">
          
          <div className="mb-8">
            <Link href="/dashboard" className="inline-flex items-center text-sm font-bold text-slate-500 hover:text-indigo-600 transition-colors">
              <ArrowLeftIcon className="w-4 h-4 mr-1.5" />
              Back to the Index Dashboard
            </Link>
          </div>

          <div className="text-base">
            <p className="font-semibold uppercase tracking-wide text-indigo-600">Our Methodology</p>
            <h1 className="mt-2 text-3xl font-black tracking-tight text-slate-900 sm:text-4xl">The HTR Health System Performance Index</h1>
            <p className="mt-6 text-xl leading-8 text-slate-700">
              The Index is a proprietary composite metric designed to provide a standardized, data-driven measure of a state's healthcare system performance and its readiness for transformation.
            </p>
          </div>

          <div className="mt-16 text-base leading-7 text-slate-700">
            <h2 className="text-2xl font-bold tracking-tight text-slate-900">1. Input Data & Metrics</h2>
            <p className="mt-4">
              The overall Index is calculated from 9 distinct sub-metrics, each normalized to a 0-100 scale where a higher score is always better. These metrics are grouped into the three core pillars.
            </p>
            <dl className="mt-8 space-y-2">
                <MetricDetail pillar="Policy" metric="VBP Adoption" description="A score representing the extent to which payers and providers in the state have adopted value-based payment (VBP) models over traditional fee-for-service." />
                <MetricDetail pillar="Policy" metric="Telehealth Policy" description="Measures the permissiveness and reimbursement parity of the state's policies regarding telehealth and remote care delivery." />
                <MetricDetail pillar="Policy" metric="Scope of Practice" description="A score reflecting the degree to which state laws allow healthcare professionals (like Nurse Practitioners) to practice at the full extent of their training." />

                <MetricDetail pillar="Economics" metric="Low Spending Per Capita" description="An efficiency score where a higher value indicates more efficient, lower per-capita healthcare spending compared to the national average." />
                <MetricDetail pillar="Economics" metric="Workforce Availability" description="Measures the availability of key healthcare professionals per capita. A higher score indicates a smaller workforce gap and better access to care." />
                <MetricDetail pillar="Economics" metric="Insurance Coverage" description="A score based on the percentage of the state's population with health insurance coverage." />

                <MetricDetail pillar="Technology" metric="HIE Adoption" description="Represents the maturity and interoperability of the state's Health Information Exchange (HIE) for sharing patient data across systems." />
                <MetricDetail pillar="Technology" metric="Broadband Access" description="Measures the availability and speed of broadband internet, particularly in rural areas, which is critical for digital health." />
                <MetricDetail pillar="Technology" metric="EHR Adoption" description="A score based on the adoption rate of certified Electronic Health Record (EHR) systems among providers in the state." />
            </dl>

            <h2 className="mt-16 text-2xl font-bold tracking-tight text-slate-900">2. Calculation Methodology</h2>
            <p className="mt-4">The final `performanceScore` is calculated using a weighted average model in two steps:</p>
            <ul role="list" className="mt-8 max-w-2xl space-y-8">
              <li className="flex gap-x-3">
                <div className="flex h-10 w-10 flex-none items-center justify-center rounded-lg bg-slate-100 font-bold text-slate-700">1</div>
                <div>
                  <h3 className="text-base font-semibold text-slate-900">Pillar Scores</h3>
                  <p className="mt-1">First, a score for each pillar is calculated by taking the simple average of its three sub-metrics.</p>
                </div>
              </li>
              <li className="flex gap-x-3">
                <div className="flex h-10 w-10 flex-none items-center justify-center rounded-lg bg-slate-100 font-bold text-slate-700">2</div>
                <div>
                  <h3 className="text-base font-semibold text-slate-900">Overall Performance Score</h3>
                  <p className="mt-1">The final score is a weighted average of the three pillar scores, with Policy and Economics weighted more heavily as foundational drivers. The formula is:</p>
                  <p className="mt-2 rounded-md bg-slate-50 p-3 text-sm font-mono text-slate-800 border border-slate-200">
                    (Policy * 0.4) + (Economics * 0.4) + (Technology * 0.2)
                  </p>
                </div>
              </li>
            </ul>

            <h2 className="mt-16 text-2xl font-bold tracking-tight text-slate-900">3. Output & Interpretation</h2>
            <p className="mt-4">The Index produces a quantitative score and a qualitative status tier for quick interpretation:</p>
            <div className="mt-6 space-y-4">
              <div className="bg-emerald-50 border-l-4 border-emerald-500 p-4"><p className="font-bold text-emerald-800">Leading (80-100):</p><p className="text-emerald-700">States that are national leaders with strong policies and robust infrastructure.</p></div>
              <div className="bg-green-50 border-l-4 border-green-500 p-4"><p className="font-bold text-green-800">Improving (70-79):</p><p className="text-green-700">States with solid foundations and positive momentum in key transformation areas.</p></div>
              <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4"><p className="font-bold text-yellow-800">Stable (60-69):</p><p className="text-yellow-700">States with mixed performance, showing strengths in some areas but lagging in others.</p></div>
              <div className="bg-red-50 border-l-4 border-red-500 p-4"><p className="font-bold text-red-800">At Risk (&lt;60):</p><p className="text-red-700">States facing significant structural challenges that may hinder transformation.</p></div>
            </div>
            
          </div>
        </div>
      </div>
    </div>
  )
}
