import Link from "next/link";
import HubSubscribeCTA from "@/components/HubSubscribeCTA";
import LatestHubReports from "@/components/LatestHubReports";

export default function Page() {
  const topics = [
    {
      label: 'Hospital-at-Home', href: '/clinical/hah',
      description: 'Acute care delivery in the home setting.',
      details: ['CMS Waiver', 'Remote Monitoring', 'Logistics'],
      scope: 'Examining the clinical and operational expansion of Hospital-at-Home programs, including regulatory waivers and patient safety outcomes.'
    },
    {
      label: 'Precision Medicine', href: '/clinical/precision',
      description: 'Genomics and personalized treatment plans.',
      details: ['Genomics', 'Targeted Therapies', 'Biomarkers'],
      scope: 'Updates on the integration of genomic data into clinical practice, advancements in targeted therapies, and the economics of precision medicine.'
    },
    {
      label: 'Genomics & Predictive Medicine', href: '/clinical/genomics',
      description: 'PGx, germline sequencing, polygenic risk scores, and AI clinical prediction.',
      details: ['Pharmacogenomics', 'Polygenic Risk Scores', 'AI Early Warning'],
      scope: 'Deep-dive into pharmacogenomics (CYP2D6, CYP2C19), germline variant classification (ACMG), tumor genomics, and AI-driven deterioration prediction tools.'
    },
    {
      label: 'Virtual Care Models', href: '/clinical/virtual',
      description: 'Hybrid care delivery and virtual nursing.',
      details: ['Virtual Nursing', 'Asynchronous Care', 'Tele-ICU'],
      scope: 'Analysis of evolving virtual care models beyond basic telehealth, including virtual nursing units, tele-ICU, and asynchronous specialty consults.'
    },
    {
      label: 'Population Health', href: '/clinical/population',
      description: 'Managing chronic disease at scale.',
      details: ['Chronic Care Mgmt', 'Preventive Screenings', 'Risk Stratification'],
      scope: 'Strategies for managing large patient populations, improving chronic disease outcomes, and implementing effective preventive care programs.'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <div className="mb-12">
        <span className="text-sm font-bold text-rose-600 uppercase tracking-wider">
          Clinical Innovation
        </span>
        <h1 className="text-2xl md:text-3xl lg:text-4xl font-black text-slate-900 mt-2 mb-4">
          Clinical Hub
        </h1>
        <p className="text-base md:text-lg text-slate-600 max-w-3xl">
          Advancing care delivery through innovation, precision, and new care models.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
        {topics.map((item) => (
          <Link key={item.label} href={item.href} className="group flex flex-col p-6 bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-lg transition-all hover:-translate-y-1 hover:border-rose-400 hover:bg-rose-50/80">
            <div>
              <h3 className="font-bold text-slate-900 text-base mb-2 group-hover:text-rose-600 transition-colors">{item.label}</h3>
              <p className="text-slate-500 text-sm leading-relaxed">{item.description}</p>
            </div>
            <div className="mt-auto pt-4 space-y-2 border-t border-slate-100">
              <h4 className="text-[10px] font-bold uppercase text-slate-500 tracking-wider">Scope Includes</h4>
              {item.details.map(detail => (
                <div key={detail} className="flex items-center gap-2">
                  <span className="text-rose-500 font-bold">✓</span>
                  <span className="text-xs font-medium text-slate-600">{detail}</span>
                </div>
              ))}
              <div className="pt-4 mt-4 border-t border-slate-100 text-xs text-slate-500 leading-relaxed">
                {item.scope}
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* ── RELATED TOOLS & DATA ─────────────────────────────────── */}
      <div className="mt-16 mb-12">
        <div className="flex items-center gap-3 mb-6">
          <div className="h-px flex-1 bg-slate-200" />
          <span className="text-[11px] font-black uppercase tracking-widest text-slate-400 whitespace-nowrap">
            Tools &amp; Data for Clinical
          </span>
          <div className="h-px flex-1 bg-slate-200" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { href: "/research-lab/population-equity", emoji: "👥", title: "Population & Equity Lab", desc: "Risk stratification models, chronic care analytics & equity dashboards" },
            { href: "/htr-simulator", emoji: "⚙️", title: "HTR Simulator", desc: "Score clinical quality & outcomes in your transformation scenario" },
            { href: "/dashboard", emoji: "🗺️", title: "50-State Dashboard", desc: "Hospital-level clinical performance data across all RHTP participants" },
            { href: "/research-lab", emoji: "🧪", title: "Full Research Lab", desc: "All 19 tools including clinical decision support & care model analysis" },
          ].map((tool) => (
            <Link key={tool.href} href={tool.href} className="group flex flex-col gap-2 p-4 rounded-xl border-2 border-rose-100 hover:border-rose-300 hover:bg-rose-50 transition-all">
              <div className="flex items-center gap-2">
                <span className="text-xl leading-none">{tool.emoji}</span>
                <span className="text-sm font-bold text-slate-800 group-hover:text-rose-700 leading-tight">{tool.title}</span>
              </div>
              <p className="text-xs text-slate-500 leading-relaxed">{tool.desc}</p>
              <span className="text-xs font-bold text-rose-600 group-hover:text-rose-800 mt-auto">Explore →</span>
            </Link>
          ))}
        </div>
      </div>

      <LatestHubReports pillar="Clinical" colorClass="text-rose-600" cardHoverClass="hover:border-rose-400 hover:bg-rose-50/80" titleHoverClass="group-hover:text-rose-600" />

      <HubSubscribeCTA 
        pillar="Clinical" 
        bgClass="bg-rose-50" 
        buttonClass="bg-rose-600 hover:bg-rose-700" 
      />
    </div>
  );
}