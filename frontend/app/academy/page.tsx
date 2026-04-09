import Link from "next/link";

export const metadata = {
  title: "HTR Academy | Intelligence & Masterclasses",
  description: "Executive education, expert faculty, and deep-dive case studies for healthcare leaders.",
};

export default function AcademyHub() {
  return (
    <div className="min-h-screen bg-white">

      {/* Hero */}
      <div className="bg-slate-950 text-white">
        <div className="max-w-5xl mx-auto px-6 py-20">
          <span className="text-[10px] font-black uppercase tracking-widest text-sky-400 block mb-4">
            HTR Academy
          </span>
          <h1 className="text-5xl font-black tracking-tight mb-5 leading-tight">
            Intelligence &amp; Masterclasses
          </h1>
          <p className="text-xl text-slate-300 max-w-2xl leading-relaxed">
            Executive education built for healthcare leaders who need to understand policy, economics,
            technology, clinical transformation, and equity — not as separate disciplines, but as one
            integrated system.
          </p>
        </div>
      </div>

      {/* What the Academy covers */}
      <div className="max-w-5xl mx-auto px-6 py-16">
        <h2 className="text-2xl font-black text-slate-900 mb-2">What the Academy Covers</h2>
        <p className="text-slate-500 mb-10 max-w-2xl">
          Every program is anchored in the HTR Six-Pillar Framework — Policy, Economics, Technology,
          Clinical, Equity, and Operations. Content is produced by practitioners and updated as the landscape shifts.
        </p>

        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-sm font-black uppercase tracking-widest text-sky-700 mb-3">
              Personalized Learning
            </h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              An AI-powered engine that builds a custom learning path based on your role, knowledge gaps,
              and goals. Updated dynamically as you progress and as new content is published.
            </p>
          </div>
          <div>
            <h3 className="text-sm font-black uppercase tracking-widest text-sky-700 mb-3">
              Learning Tracks
            </h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              Structured multi-course sequences designed for specific roles — health economists, compliance
              officers, CMOs, policy analysts, and technology leaders. Each track culminates in a
              verifiable credential.
            </p>
          </div>
          <div>
            <h3 className="text-sm font-black uppercase tracking-widest text-sky-700 mb-3">
              Courses &amp; Webinars
            </h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              Deep-dive modules on specific topics — from CMS rule interpretation to FHIR implementation
              to value-based contract design. Webinars bring in domain experts for live Q&amp;A and
              recorded sessions available on demand.
            </p>
          </div>
          <div>
            <h3 className="text-sm font-black uppercase tracking-widest text-sky-700 mb-3">
              Case Studies &amp; Glossary
            </h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              Real-world analyses of what worked, what failed, and why — across APM implementations,
              state waiver programs, AI deployments, and equity initiatives. The Glossary provides
              authoritative definitions across all six pillars.
            </p>
          </div>
        </div>
      </div>

      {/* Who it's for */}
      <div className="bg-slate-50 border-y border-slate-100">
        <div className="max-w-5xl mx-auto px-6 py-16">
          <h2 className="text-2xl font-black text-slate-900 mb-8">Who the Academy Is For</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { role: "Health System Leaders", desc: "CMOs, CFOs, and CEOs navigating value-based care transitions, technology adoption, and regulatory compliance." },
              { role: "Policy &amp; Government", desc: "State Medicaid directors, CMS staff, legislative analysts, and public health officials interpreting complex federal rules." },
              { role: "Consultants &amp; Advisors", desc: "Strategy, IT, and financial consultants who need deep domain knowledge to serve healthcare clients effectively." },
            ].map((item) => (
              <div key={item.role} className="bg-white rounded-xl border border-slate-200 p-6">
                <h3 className="font-black text-slate-900 mb-2" dangerouslySetInnerHTML={{ __html: item.role }} />
                <p className="text-sm text-slate-500 leading-relaxed" dangerouslySetInnerHTML={{ __html: item.desc }} />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="max-w-5xl mx-auto px-6 py-16 text-center">
        <h2 className="text-2xl font-black text-slate-900 mb-3">Ready to start?</h2>
        <p className="text-slate-500 mb-6">Use the sidebar to navigate to a specific section, or begin with a personalized path.</p>
        <Link
          href="/academy/personalized-learning"
          className="inline-block px-8 py-3 bg-sky-600 hover:bg-sky-700 text-white font-bold rounded-xl transition-colors"
        >
          Start Personalized Learning →
        </Link>
      </div>

    </div>
  );
}
