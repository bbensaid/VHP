import { notFound } from "next/navigation";
import { performanceIndexData } from "@/lib/data/performance-index-data";
import Link from "next/link";
import { 
  ArrowLeftIcon, 
  ChartBarIcon,
  BookOpenIcon,
  BoltIcon,
  BanknotesIcon,
} from "@heroicons/react/24/outline";
import { getScoreColor } from "@/lib/utils";

const MetricDisplay = ({ label, score }: { label: string, score: number }) => (
  <div className="flex items-center justify-between py-3 border-b border-slate-100">
    <span className="text-sm text-slate-600">{label}</span>
    <div className="flex items-center gap-2">
      <span className="text-sm font-bold w-8 text-right" style={{ color: getScoreColor(score) }}>{score}</span>
      <div className="w-24 bg-slate-200 rounded-full h-2"><div className="h-2 rounded-full" style={{ width: `${score}%`, backgroundColor: getScoreColor(score) }}></div></div>
    </div>
  </div>
);

export default async function DynamicStatePage({ params }: { params: Promise<{ state: string }> }) {

  const resolvedParams = await params;

  const stateSlug = resolvedParams.state.toLowerCase();
  const stateData = performanceIndexData[stateSlug];

  if (!stateData) {
    return notFound();
  }

  const overallScoreColor = getScoreColor(stateData.performanceScore);

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800 p-4 md:p-8">
      <div className="max-w-5xl mx-auto">
        <header className="mb-8">
          <Link href="/dashboard" className="inline-flex items-center text-sm font-bold text-slate-500 hover:text-indigo-600 mb-6 transition-colors">
            <ArrowLeftIcon className="w-4 h-4 mr-1" /> Back to National Index
          </Link>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end">
            <div>
              <h1 className="text-4xl md:text-5xl font-black text-slate-900 mb-2">{stateData.stateName}</h1>
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide" style={{ backgroundColor: overallScoreColor + '20', color: overallScoreColor }}>
                  {stateData.status}
                </span>
              </div>
            </div>
            <div className="text-left md:text-right mt-4 md:mt-0">
               <div className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Overall Performance Score</div>
               <div className="text-5xl font-black" style={{ color: overallScoreColor }}>
                 {stateData.performanceScore}
               </div>
            </div>
          </div>
        </header>

        <div className="bg-white p-8 rounded-xl border border-slate-200 shadow-sm mb-8">
            <h2 className="text-xl font-bold text-slate-900 mb-2">{stateData.narrative.title}</h2>
            <p className="text-slate-600 leading-relaxed">{stateData.narrative.summary}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Policy */}
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-brand-orange/10 p-2 rounded-lg"><BookOpenIcon className="w-6 h-6 text-brand-orange" /></div>
              <h3 className="text-xl font-bold text-slate-900">Policy</h3>
            </div>
            <div className="space-y-2">
              <MetricDisplay label="VBP Adoption" score={stateData.metrics.policy.vbpAdoption} />
              <MetricDisplay label="Telehealth Policy" score={stateData.metrics.policy.telehealth} />
              <MetricDisplay label="Scope of Practice" score={stateData.metrics.policy.scopeOfPractice} />
            </div>
          </div>
          {/* Economics */}
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-brand-green/10 p-2 rounded-lg"><BanknotesIcon className="w-6 h-6 text-brand-green" /></div>
              <h3 className="text-xl font-bold text-slate-900">Economics</h3>
            </div>
            <div className="space-y-2">
              <MetricDisplay label="Low Spending" score={stateData.metrics.economics.spendingPerCapita} />
              <MetricDisplay label="Workforce" score={stateData.metrics.economics.workforceGaps} />
              <MetricDisplay label="Coverage Rate" score={stateData.metrics.economics.insuranceCoverage} />
            </div>
          </div>
          {/* Technology */}
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-brand-indigo/10 p-2 rounded-lg"><BoltIcon className="w-6 h-6 text-brand-indigo" /></div>
              <h3 className="text-xl font-bold text-slate-900">Technology</h3>
            </div>
            <div className="space-y-2">
              <MetricDisplay label="HIE Adoption" score={stateData.metrics.technology.hieAdoption} />
              <MetricDisplay label="Broadband Access" score={stateData.metrics.technology.broadbandAccess} />
              <MetricDisplay label="EHR Adoption" score={stateData.metrics.technology.ehrAdoption} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
