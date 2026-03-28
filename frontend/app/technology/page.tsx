import Link from "next/link";
import HubSubscribeCTA from "@/components/HubSubscribeCTA";
import LatestHubReports from "@/components/LatestHubReports";

export default function Page() {
  const topics = [
    { 
      label: 'AI & Machine Learning', href: '/technology/ai',
      description: 'Applications of AI in diagnostics, operations, and care.',
      details: ['Generative AI', 'Predictive Analytics', 'NLP'],
      scope: 'Exploring the transformative potential of artificial intelligence in healthcare, from LLMs in clinical documentation to predictive models for patient risk.'
    },
    { 
      label: 'Digital Health & Telemedicine', href: '/technology/digital',
      description: 'Remote care platforms and digital therapeutics.',
      details: ['RPM', 'Telehealth Platforms', 'DTx'],
      scope: 'Analysis of the digital health ecosystem, including remote patient monitoring trends, virtual care adoption, and the efficacy of digital therapeutics.'
    },
    { 
      label: 'Data Security & Governance', href: '/technology/security',
      description: 'Cybersecurity, interoperability, and data privacy.',
      details: ['Cybersecurity', 'HIPAA Compliance', 'Interoperability'],
      scope: 'Critical updates on healthcare cybersecurity threats, ransomware defense strategies, and the evolving landscape of health data interoperability standards.'
    },
    { 
      label: 'Tech-Enabled Workflow', href: '/technology/workflow',
      description: 'Automation and tools to reduce clinical burnout.',
      details: ['RPA', 'EHR Optimization', 'Clinical Decision Support'],
      scope: 'Focusing on technologies that streamline hospital operations, optimize EHR usability, and automate administrative tasks to support the workforce.'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <div className="mb-12">
        <span className="text-sm font-bold text-indigo-600 uppercase tracking-wider">
          Health Technology
        </span>
        <h1 className="text-4xl font-black text-slate-900 mt-2 mb-4">
          Technology Hub
        </h1>
        <p className="text-xl text-slate-600 max-w-3xl">
          Tracking the digital transformation of healthcare delivery and operations.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {topics.map((item) => (
          <Link key={item.label} href={item.href} className="group flex flex-col p-6 bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-lg transition-all hover:-translate-y-1 hover:border-indigo-400 hover:bg-indigo-50/80">
            <div>
              <h3 className="font-bold text-slate-900 text-lg mb-2 group-hover:text-indigo-600 transition-colors">{item.label}</h3>
              <p className="text-slate-500 text-sm leading-relaxed">{item.description}</p>
            </div>
            <div className="mt-auto pt-4 space-y-2 border-t border-slate-100">
              <h4 className="text-[10px] font-bold uppercase text-slate-500 tracking-wider">Scope Includes</h4>
              {item.details.map(detail => (
                <div key={detail} className="flex items-center gap-2">
                  <span className="text-indigo-500 font-bold">✓</span>
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
            Tools &amp; Data for Technology
          </span>
          <div className="h-px flex-1 bg-slate-200" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { href: "/research-lab/technology-ai", emoji: "🤖", title: "Technology & AI Lab", desc: "Interactive models for AI adoption, ROI analysis & workflow automation" },
            { href: "/research-lab/interoperability", emoji: "🔗", title: "Interoperability Lab", desc: "FHIR implementation tools, API testing & data standards analysis" },
            { href: "/htr-simulator", emoji: "⚙️", title: "HTR Simulator", desc: "Score technology modernization in your transformation scenario" },
            { href: "/research-lab", emoji: "🧪", title: "Full Research Lab", desc: "All 19 analytical tools including digital health & security models" },
          ].map((tool) => (
            <Link key={tool.href} href={tool.href} className="group flex flex-col gap-2 p-4 rounded-xl border-2 border-indigo-100 hover:border-indigo-300 hover:bg-indigo-50 transition-all">
              <div className="flex items-center gap-2">
                <span className="text-xl leading-none">{tool.emoji}</span>
                <span className="text-sm font-bold text-slate-800 group-hover:text-indigo-700 leading-tight">{tool.title}</span>
              </div>
              <p className="text-xs text-slate-500 leading-relaxed">{tool.desc}</p>
              <span className="text-xs font-bold text-indigo-600 group-hover:text-indigo-800 mt-auto">Explore →</span>
            </Link>
          ))}
        </div>
      </div>

      <LatestHubReports pillar="Technology" colorClass="text-indigo-600" cardHoverClass="hover:border-indigo-400 hover:bg-indigo-50/80" titleHoverClass="group-hover:text-indigo-600" />

      <HubSubscribeCTA 
        pillar="Technology" 
        bgClass="bg-indigo-50" 
        buttonClass="bg-indigo-600 hover:bg-indigo-700" 
      />
    </div>
  );
}