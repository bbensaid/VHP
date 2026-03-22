import Link from 'next/link'

export const metadata = {
  title: 'HTR Research Lab | Health Transformation Review',
  description:
    'The most comprehensive health transformation research environment — 19 interactive sandboxes spanning interoperability, payment models, population health, policy, AI, and workforce.',
}

const CATEGORIES = [
  {
    href: '/research-lab/interoperability',
    icon: '🧬',
    label: 'Interoperability & Risk',
    desc: 'Build FHIR R4 resources, test CDS Hooks, validate ONC compliance, and run HCC risk stratification models.',
    tools: ['FHIR Lab', 'Risk Stratification Engine'],
    color: 'indigo',
    border: 'border-indigo-400',
    bg: 'bg-indigo-50',
    badge: 'bg-indigo-100 text-indigo-700',
    btn: 'bg-indigo-600 hover:bg-indigo-700',
  },
  {
    href: '/research-lab/payment-models',
    icon: '💰',
    label: 'Payment Models & VBC',
    desc: 'Design APMs from scratch, model episode bundles, global budgets, shared savings, and cost-effectiveness thresholds.',
    tools: ['APM Design Lab', 'APM Shared Savings Calculator', 'Cost-Effectiveness Calculator'],
    color: 'emerald',
    border: 'border-emerald-400',
    bg: 'bg-emerald-50',
    badge: 'bg-emerald-100 text-emerald-700',
    btn: 'bg-emerald-600 hover:bg-emerald-700',
  },
  {
    href: '/research-lab/population-equity',
    icon: '👥',
    label: 'Population & Equity',
    desc: 'Run Markov chain disease models, SIR epidemic simulations, SDOH scoring, and equity-weighted cost-effectiveness.',
    tools: ['Population Health Modeler', 'Health Equity Studio'],
    color: 'amber',
    border: 'border-amber-400',
    bg: 'bg-amber-50',
    badge: 'bg-amber-100 text-amber-700',
    btn: 'bg-amber-600 hover:bg-amber-700',
  },
  {
    href: '/research-lab/policy-quality',
    icon: '📋',
    label: 'Policy & Quality Sciences',
    desc: 'Simulate 1115 waivers, global budgets, HEDIS/Star ratings, MIPS optimization, actuarial models, and hospital finance.',
    tools: ['Policy Simulator', 'Clinical Quality Optimizer', 'Hospital Financial Scorecard', 'HTA Studio', 'Actuarial Lab'],
    color: 'sky',
    border: 'border-sky-400',
    bg: 'bg-sky-50',
    badge: 'bg-sky-100 text-sky-700',
    btn: 'bg-sky-600 hover:bg-sky-700',
  },
  {
    href: '/research-lab/technology-ai',
    icon: '🤖',
    label: 'Technology & AI',
    desc: 'Evaluate AI model performance, audit algorithmic bias, build governance frameworks, and model RPM/telehealth ROI.',
    tools: ['AI Analytics Lab', 'Digital Health Lab'],
    color: 'violet',
    border: 'border-violet-400',
    bg: 'bg-violet-50',
    badge: 'bg-violet-100 text-violet-700',
    btn: 'bg-violet-600 hover:bg-violet-700',
  },
  {
    href: '/research-lab/knowledge-workspace',
    icon: '📚',
    label: 'Knowledge & Workspace',
    desc: 'Access the CEA evidence library, CMMI model tracker, workforce models, state rankings, and your research workspace.',
    tools: ['Evidence Library', 'Workforce Modeler', 'Innovation Leaderboard', 'Research Workspace'],
    color: 'slate',
    border: 'border-slate-400',
    bg: 'bg-slate-100',
    badge: 'bg-slate-200 text-slate-700',
    btn: 'bg-slate-700 hover:bg-slate-800',
  },
]

const STATS = [
  { value: '19', label: 'Interactive Tools' },
  { value: '6', label: 'Research Domains' },
  { value: '1,000+', label: 'Monte Carlo Iterations' },
  { value: '50', label: 'States Benchmarked' },
]

export default function ResearchLabPage() {
  return (
    <div className="min-h-screen bg-slate-50">

      {/* ── Hero ── */}
      <div className="bg-linear-to-br from-slate-100 via-white to-indigo-50 border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-6 py-16">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-xs font-bold uppercase tracking-widest text-indigo-600 bg-indigo-100 rounded-full px-3 py-1">
              Research Lab
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-slate-900 mb-4 leading-tight">
            HTR Research Lab
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl leading-relaxed mb-10">
            19 interactive analytical tools spanning every dimension of health system transformation — from FHIR interoperability to Monte Carlo health economic modeling.
          </p>

          {/* Stats row */}
          <div className="flex flex-wrap gap-6">
            {STATS.map(s => (
              <div key={s.label} className="flex flex-col">
                <span className="text-3xl font-black text-indigo-700">{s.value}</span>
                <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide">{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Category Grid ── */}
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {CATEGORIES.map(cat => (
            <Link
              key={cat.href}
              href={cat.href}
              className={`group flex flex-col bg-white rounded-2xl border border-slate-200 border-l-4 ${cat.border} shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden`}
            >
              <div className="p-6 flex-1">
                {/* Icon + title */}
                <div className="flex items-start gap-3 mb-3">
                  <span className="text-3xl">{cat.icon}</span>
                  <div>
                    <h2 className="text-lg font-black text-slate-900 leading-tight group-hover:text-indigo-700 transition-colors">
                      {cat.label}
                    </h2>
                    <span className={`inline-block text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full mt-1 ${cat.badge}`}>
                      {cat.tools.length} {cat.tools.length === 1 ? 'tool' : 'tools'}
                    </span>
                  </div>
                </div>

                {/* Description */}
                <p className="text-sm text-slate-500 leading-relaxed mb-4">{cat.desc}</p>

                {/* Tool list */}
                <ul className="space-y-1">
                  {cat.tools.map(tool => (
                    <li key={tool} className="flex items-center gap-2 text-xs text-slate-600">
                      <span className="w-1.5 h-1.5 rounded-full bg-slate-300 shrink-0" />
                      {tool}
                    </li>
                  ))}
                </ul>
              </div>

              {/* CTA footer */}
              <div className={`px-6 py-3 ${cat.bg} border-t border-slate-100 flex items-center justify-between`}>
                <span className="text-xs font-semibold text-slate-500">Open toolkit</span>
                <span className={`text-xs font-bold px-3 py-1.5 rounded-lg text-white ${cat.btn} transition-colors`}>
                  Explore →
                </span>
              </div>
            </Link>
          ))}
        </div>

        {/* HTI Dashboard CTA */}
        <div className="mt-10 bg-linear-to-r from-indigo-700 to-indigo-900 rounded-2xl p-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-2xl">📊</span>
              <h3 className="text-lg font-black text-white">HTI Dashboard</h3>
            </div>
            <p className="text-indigo-200 text-sm max-w-lg">
              Real-time system performance monitoring, regulatory tracking, and market intelligence across Vermont and national health systems.
            </p>
          </div>
          <Link
            href="/hti-dashboard"
            className="shrink-0 px-5 py-2.5 bg-white text-indigo-800 rounded-xl font-black text-sm hover:bg-indigo-50 transition-colors shadow"
          >
            Open HTI Dashboard →
          </Link>
        </div>
      </div>
    </div>
  )
}
