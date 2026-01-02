// app/about/page.tsx

import React from "react";
import Link from "next/link";

const AboutPage: React.FC = () => {
  return (
    <div className="py-12 px-4 md:px-8 max-w-6xl mx-auto font-sans text-gray-800">
      {/* =========================================
          1. HERO SECTION
          ========================================= */}
      <section className="mb-16 border-b border-gray-200 pb-12">
        <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 mb-6 tracking-tight leading-tight">
          Decoding the Future of <br className="hidden md:block" />
          <span className="text-policy">Healthcare Reform</span>
        </h1>
        <p className="text-xl md:text-2xl text-gray-600 max-w-3xl leading-relaxed">
          We bridge the gap between high-level policy mandates and the operational
          reality of care delivery. HTR is the operating system for health transformation.
        </p>
      </section>

      {/* =========================================
          2. MISSION & VISION (The Foundation)
          ========================================= */}
      <section className="mb-20 grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Mission */}
        <div className="bg-slate-50 p-8 rounded-xl border border-slate-100">
          <h2 className="text-sm font-bold text-policy uppercase tracking-widest mb-4">
            Our Mission
          </h2>
          <p className="text-lg text-gray-800 leading-relaxed font-medium">
            The Health Transformation Review (HTR) empowers policymakers,
            executives, and communities with the rigorous analysis, educational
            tools, and actionable metrics needed to execute health reform.
            Through our proprietary <strong>System Health Index (SHI)</strong>,
            we decode the complexity of Policy, Economics, and Technology.
          </p>
        </div>

        {/* Vision */}
        <div className="bg-slate-50 p-8 rounded-xl border border-slate-100">
          <h2 className="text-sm font-bold text-economics uppercase tracking-widest mb-4">
            Our Vision
          </h2>
          <p className="text-lg text-gray-800 leading-relaxed font-medium">
            To be the global authority on health system reform, driving the
            transition from fragmented, financially unsustainable care to
            integrated, equitable, and data-driven health ecosystems.
          </p>
        </div>
      </section>

      {/* =========================================
          3. CONTEXT: WHY HTR? WHY NOW? (Vermont Data)
          ========================================= */}
      <section className="mb-20">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-6 text-gray-900">
              Why HTR? Why Now?
            </h2>
            <p className="mb-4 text-lg text-gray-600 leading-relaxed">
              The healthcare landscape is at a fracture point. Rural hospitals are
              closing, premiums are outpacing inflation, and "innovation" often
              stops at the pilot phase.
            </p>
            <p className="mb-6 text-lg text-gray-600 leading-relaxed">
              With over <strong>$50 billion</strong> mobilizing for rural health
              transformation (RHT), resources exist but precision is missing. HTR
              solves the "Translation Problem" between policymakers, economists,
              and technologists.
            </p>
          </div>
          
          {/* Case Study Card */}
          <div className="bg-white p-8 rounded-lg border-l-4 border-red-500 shadow-lg shadow-gray-200/50">
            <div className="flex justify-between items-start mb-4">
              <h3 className="font-bold text-lg text-gray-900">
                The Current Crisis <span className="text-gray-400 font-normal ml-2">(Vermont Case Study)</span>
              </h3>
              <span className="bg-red-100 text-red-700 text-[10px] font-bold px-2 py-1 rounded uppercase">Critical</span>
            </div>
            <ul className="space-y-4 text-gray-600">
              <li className="flex items-start">
                <span className="text-red-500 mr-3 font-bold">➜</span>
                <span>
                  <strong>Unchecked Inflation:</strong> Commercial premiums rose{" "}
                  <span className="text-red-600 font-bold">108%</span> in 6 years.
                </span>
              </li>
              <li className="flex items-start">
                <span className="text-red-500 mr-3 font-bold">➜</span>
                <span>
                  <strong>System Insolvency:</strong> 9 of 14 hospitals currently
                  operate at a loss.
                </span>
              </li>
              <li className="flex items-start">
                <span className="text-red-500 mr-3 font-bold">➜</span>
                <span>
                  <strong>Inefficiency:</strong> Admin costs at major hubs exceed benchmarks by{" "}
                  <span className="text-red-600 font-bold">400%</span>.
                </span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* =========================================
          4. THE 3 PILLARS
          ========================================= */}
      <section className="mb-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            The HTR Approach
          </h2>
          <p className="text-gray-500 max-w-2xl mx-auto">
            Real transformation requires a holistic understanding. We assess systems through three interconnected lenses.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {/* Policy */}
          <div className="p-6 border text-card-policy rounded-lg hover:border-policy transition-colors group">
            <h3 className="text-card-policy text-xl font-bold text-policy mb-2 group-hover:underline decoration-2 underline-offset-4">
              Policy
            </h3>
            <p className="text-xs font-bold text-card-policy uppercase tracking-widest mb-4">
              The Rules of the Game
            </p>
            <p className="text-card-policy leading-relaxed">
              Understanding the regulatory, legislative, and ethical frameworks.
              We track how governance structures must evolve to manage modern health ecosystems.
              <br />
              <span className="italic text-sm text-card-policy mt-2 block">
                "Is it permissible?"
              </span>
            </p>
          </div>

          {/* Economics */}
          <div className="p-6 border text-card-economics rounded-lg hover:border-economics transition-colors group">
            <h3 className="text-card-economics text-xl font-bold text-economics mb-2 group-hover:underline decoration-2 underline-offset-4">
              Economics
            </h3>
            <p className="text-xs font-bold text-card-economics uppercase tracking-widest mb-4">
              The Financial Engine
            </p>
            <p className="text-card-economics leading-relaxed">
              Evaluating market dynamics and the investment required for viability.
              We model the transition from fee-for-service to global budgets.
              <br />
              <span className="italic text-sm text-card-economics mt-2 block">
                "Is it affordable & sustainable?"
              </span>
            </p>
          </div>

          {/* Technology */}
          <div className="p-6 border text-card-tech rounded-lg hover:border-technology transition-colors group">
            <h3 className="text-card-tech text-xl font-bold text-technology mb-2 group-hover:underline decoration-2 underline-offset-4">
              Technology
            </h3>
            <p className="text-xs font-bold text-card-tech uppercase tracking-widest mb-4">
              The Enabler
            </p>
            <p className="text-card-tech leading-relaxed">
              Reviewing the efficacy and integration of cutting-edge tools.
              We measure digital maturity not by app count, but by true interoperability.
              <br />
              <span className="italic text-sm text-card-tech mt-2 block">
                "Does it actually work?"
              </span>
            </p>
          </div>
        </div>
      </section>

      {/* =========================================
          5. THE SHI INDEX (New Feature)
          ========================================= */}
      <section className="bg-slate-900 rounded-2xl p-8 md:p-12 text-white mb-16">
        <div className="max-w-3xl mx-auto text-center">
          <span className="inline-block py-1 px-3 rounded bg-indigo-500/20 text-indigo-300 text-xs font-bold uppercase tracking-widest mb-4">
            Proprietary Metric
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            The System Health Index (SHI)
          </h2>
          <p className="text-slate-300 text-lg mb-8 leading-relaxed">
            Moving beyond static PDF reports, the SHI provides a dynamic composite
            score (0-100) of a health system’s viability. It allows stakeholders
            to diagnose failure points in real-time.
          </p>
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-left">
            <div className="bg-slate-800 p-5 rounded border border-slate-700">
              <div className="font-bold text-white mb-1">Diagnose</div>
              <div className="text-sm text-slate-400">Identify critical failures like economic insolvency.</div>
            </div>
            <div className="bg-slate-800 p-5 rounded border border-slate-700">
              <div className="font-bold text-white mb-1">Benchmark</div>
              <div className="text-sm text-slate-400">Compare performance against national reform standards.</div>
            </div>
            <div className="bg-slate-800 p-5 rounded border border-slate-700">
              <div className="font-bold text-white mb-1">Prescribe</div>
              <div className="text-sm text-slate-400">Deliver evidence-based interventions tailored to local needs.</div>
            </div>
          </div>
          
          <div className="mt-8 pt-8 border-t border-slate-800">
             <Link href="/htr-index" className="text-white font-bold underline decoration-indigo-500 decoration-2 underline-offset-4 hover:text-indigo-400 transition-colors">
                View the Methodology &rarr;
             </Link>
          </div>
        </div>
      </section>

      {/* =========================================
          6. TEAM / RIGOR
          ========================================= */}
      <section className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-gray-900 mb-6 border-l-4 border-gray-300 pl-4">
          Our Commitment to Rigor
        </h2>
        <div className="prose prose-lg text-gray-600">
          <p>
            **Expertise at the Nexus.** Our team is comprised of professionals
            who have directly driven change in healthcare systems. Our core
            commitment is to maintaining a reviewer base with proven track
            records in industry and government, ensuring our analysis is
            actionable and grounded in practical experience.
          </p>
          <p className="italic text-sm mt-4">
            (Full team directory and Academic Review Board forthcoming.)
          </p>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;