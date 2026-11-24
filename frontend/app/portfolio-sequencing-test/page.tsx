"use client";

import FromTheBook from "@/components/FromTheBook";
import PortfolioSequencingTest from "@/components/framework/PortfolioSequencingTest";

export default function PortfolioSequencingTestPage() {
  return (
    <div className="bg-white font-sans text-slate-800 min-h-screen">
      <section className="relative bg-slate-950 text-white overflow-hidden py-16 md:py-20">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <span className="inline-block text-[11px] font-black tracking-[0.2em] uppercase text-amber-400 mb-6 border border-amber-700 bg-amber-900/30 px-4 py-1.5 rounded-full">
            Analyze &amp; Tools · Portfolio Management
          </span>
          <h1 className="ty-h1-xl font-black tracking-tight leading-tight mb-6">
            Portfolio<br />
            <span className="text-amber-400">Sequencing Test</span>
          </h1>
          <p className="ty-hero text-slate-300 max-w-2xl leading-relaxed mb-4">
            A component whose upstream gate is still closed is not behind schedule. It is correctly waiting. A component with nothing upstream holding it should be running now, however distant its deadline.
          </p>
          <p className="text-slate-400 max-w-2xl leading-relaxed">
            Load Vermont&apos;s nineteen-component portfolio or build your own register, set which gates are open, and the test sorts every component by dependency order rather than by calendar.
          </p>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-12">
        <FromTheBook
          chapter="Chapter 1"
          chapterTitle="The Core Argument: Dependency Logic Determines Sequence"
          excerpt="The execution sequence is determined by dependency logic — the structural reality that some things cannot produce value until other things are already in place."
          href="/read/chapter-01"
        />
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <PortfolioSequencingTest />
      </section>
    </div>
  );
}
