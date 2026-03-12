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
          <Link key={item.label} href={item.href} className="flex flex-col p-6 bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-lg transition-all hover:-translate-y-1 hover:border-indigo-400 hover:bg-indigo-50/80">
            <div>
              <h3 className="font-bold text-slate-900 text-lg mb-2">{item.label}</h3>
              <p className="text-slate-500 text-sm leading-relaxed">{item.description}</p>
            </div>
            <div className="mt-auto pt-4 space-y-2 border-t border-slate-100 mt-4">
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

      <LatestHubReports pillar="Technology" colorClass="text-indigo-600" />

      <HubSubscribeCTA 
        pillar="Technology" 
        bgClass="bg-indigo-50" 
        buttonClass="bg-indigo-600 hover:bg-indigo-700" 
      />
    </div>
  );
}