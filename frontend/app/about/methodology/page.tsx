"use client";

// Rewritten 2026-10-17. The earlier page described an "HTR Health System Performance Index" — eighteen weighted
// sub-metrics "calculated from primary government data sources". No such calculation existed: the stored scores were
// hand-entered. The dashboard now shows sourced indicators only (lib/data/state-indicators.ts), described below.

import { Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import { INDICATORS, INDICATOR_SOURCES, INDICATORS_GENERATED } from "@/lib/data/state-indicators";

const PILLAR_LABEL: Record<string, string> = {
  policy: "Policy", technology: "Technology", economics: "Economics", clinical: "Clinical", operations: "Operations", equity: "Equity Imperative",
};

function MethodologyPageInner() {
  const from = useSearchParams().get("from");
  return (
    <div className="max-w-4xl mx-auto px-6 py-12 text-slate-800">
      {from && (
        <Link href={from} className="inline-flex items-center text-sm font-bold text-slate-500 hover:text-indigo-600 mb-6">
          <ArrowLeftIcon className="w-4 h-4 mr-1.5" /> Back
        </Link>
      )}
      <p className="text-xs font-black uppercase tracking-widest text-indigo-600 mb-2">Methodology</p>
      <h1 className="ty-h1 font-black text-slate-900 mb-4">How HTR Sources Its Numbers</h1>
      <p className="ty-hero text-slate-600 leading-relaxed mb-10">
        Every figure on the platform names its source. Where a number could not be traced to one, it was removed rather
        than estimated. Models — the simulators and calculators — are labelled as models and show their assumptions.
      </p>

      <section className="mb-12">
        <h2 className="text-xl font-black text-slate-900 mb-3">The framework</h2>
        <p className="text-slate-600 leading-relaxed">
          The five pillars — Policy, Technology, Economics, Clinical and Operations — and the Equity Imperative that tests
          each of them come from the book&apos;s Chapter 1, with the dependency logic that sets their order. See the{" "}
          <Link href="/about/framework" className="text-indigo-700 underline">framework page</Link>. Pillar readiness is
          scored only where the book sources it — Vermont, in the{" "}
          <Link href="/htr-simulator" className="text-indigo-700 underline">HTR Simulator</Link> — and is never presented as a
          maturity ranking of states.
        </p>
      </section>

      <section className="mb-12">
        <h2 className="text-xl font-black text-slate-900 mb-3">The fifty-state dashboard</h2>
        <p className="text-slate-600 leading-relaxed mb-4">
          The <Link href="/dashboard" className="text-indigo-700 underline">dashboard</Link> shows each indicator as its source
          reports it. There is no composite score and no &quot;leading&quot; or &quot;at risk&quot; label: a single number
          cannot carry the dependency logic the framework is built on. Data built {INDICATORS_GENERATED}.
        </p>
        <div className="overflow-x-auto border border-slate-200 rounded-xl">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 text-xs uppercase text-slate-500"><tr><th className="p-3">Indicator</th><th className="p-3">Speaks to</th><th className="p-3">Source</th></tr></thead>
            <tbody className="divide-y divide-slate-100">
              {INDICATORS.map((i) => (
                <tr key={i.key}>
                  <td className="p-3"><div className="font-semibold">{i.label}</div>{i.note && <div className="text-xs text-slate-500">{i.note}</div>}</td>
                  <td className="p-3 text-xs text-slate-500">{PILLAR_LABEL[i.pillar]}</td>
                  <td className="p-3 text-xs"><a className="underline" href={INDICATOR_SOURCES[i.source].url} target="_blank" rel="noopener noreferrer">{INDICATOR_SOURCES[i.source].label}</a></td>
                </tr>
              ))}
              <tr><td className="p-3 font-semibold">Medicaid expansion status</td><td className="p-3 text-xs text-slate-500">Policy</td><td className="p-3 text-xs"><a className="underline" href={INDICATOR_SOURCES.kff.url} target="_blank" rel="noopener noreferrer">{INDICATOR_SOURCES.kff.label}</a></td></tr>
              <tr><td className="p-3 font-semibold">AHEAD Model participation</td><td className="p-3 text-xs text-slate-500">Policy</td><td className="p-3 text-xs"><a className="underline" href={INDICATOR_SOURCES.ahead.url} target="_blank" rel="noopener noreferrer">{INDICATOR_SOURCES.ahead.label}</a></td></tr>
            </tbody>
          </table>
        </div>
        <p className="text-xs text-slate-500 mt-3 leading-relaxed">
          BRFSS figures are the CDC&apos;s weighted state estimates for adults 18 and over, latest survey year available for
          each state. CMS star ratings average the hospitals CMS rates; many small and critical access hospitals have too
          few measures to be rated. No fifty-state Technology measure is shown yet because none was found that is current,
          comparable across states and published by a primary source.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-black text-slate-900 mb-3">Corrections</h2>
        <p className="text-slate-600 leading-relaxed">
          Facts are checked against primary sources — statutes as enacted, agency reports, federal datasets — and corrected
          in the book, the tools and the Academy together. If you find a figure you cannot trace, we want to hear about it.
        </p>
      </section>
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
