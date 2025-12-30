import React from "react";
import Link from "next/link";

export default function ResearchPage() {
  return (
    <div className="bg-white min-h-screen pb-20">
      {/* 1. HERO HEADER */}
      <div className="bg-slate-900 text-white py-24 border-b border-indigo-900">
        <div className="container mx-auto px-4 md:px-8 max-w-5xl">
            <span className="text-indigo-400 font-bold uppercase tracking-widest text-xs mb-4 block">
                HTR Intelligence
            </span>
            <h1 className="text-4xl md:text-6xl font-extrabold mb-8 tracking-tight leading-tight">
                Custom Research
            </h1>
            <p className="text-xl text-slate-300 max-w-3xl leading-relaxed">
                When off-the-shelf market reports fall short, HTR deploys our research team to answer your specific strategic questions. 
                We combine quantitative data analysis with qualitative expert interviews.
            </p>
        </div>
      </div>

      {/* 2. METHODOLOGY GRID */}
      <div className="container mx-auto px-4 md:px-8 -mt-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            
            {/* Card 1: Surveys */}
            <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-200 hover:shadow-xl transition-all flex flex-col">
                <div className="h-2 w-12 bg-indigo-500 mb-6 rounded-full"></div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Survey Deployment</h3>
                <p className="text-gray-600 mb-6 leading-relaxed flex-grow">
                    Access our proprietary panel of 5,000+ clinicians and hospital administrators to test product-market fit or gauge sentiment.
                </p>
                <div className="bg-indigo-50 p-4 rounded-lg text-sm text-indigo-900 font-bold">
                    Target: CIOs, CMIOs, Heads of RevCycle
                </div>
            </div>

            {/* Card 2: Claims Data */}
            <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-200 hover:shadow-xl transition-all flex flex-col">
                <div className="h-2 w-12 bg-emerald-500 mb-6 rounded-full"></div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Claims Analysis</h3>
                <p className="text-gray-600 mb-6 leading-relaxed flex-grow">
                    Deep dives into de-identified patient data sets (Commercial, Medicare, Medicaid) to map referral patterns and leakage.
                </p>
                <div className="bg-emerald-50 p-4 rounded-lg text-sm text-emerald-900 font-bold">
                    Dataset: 150M+ Covered Lives
                </div>
            </div>

            {/* Card 3: Benchmarking */}
            <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-200 hover:shadow-xl transition-all flex flex-col">
                <div className="h-2 w-12 bg-orange-500 mb-6 rounded-full"></div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Benchmarking</h3>
                <p className="text-gray-600 mb-6 leading-relaxed flex-grow">
                    Blinded analysis of your operational performance relative to regional peers and national best practices.
                </p>
                <div className="bg-orange-50 p-4 rounded-lg text-sm text-orange-900 font-bold">
                    Scope: Regional & National
                </div>
            </div>

        </div>
      </div>

      {/* 3. CASE EXAMPLE (Social Proof) */}
      <div className="container mx-auto px-4 md:px-8 max-w-5xl mt-24">
        <div className="bg-slate-50 border border-gray-200 rounded-2xl p-8 md:p-12 flex flex-col md:flex-row gap-12 items-center">
            <div className="md:w-1/2">
                <h3 className="text-lg font-bold text-gray-500 uppercase tracking-widest mb-2">Recent Commission</h3>
                <h2 className="text-3xl font-bold text-gray-900 mb-4">The Economics of CRISPR in Rural Hospitals</h2>
                <p className="text-gray-600 text-lg mb-6">
                    A major payer commissioned HTR to forecast the 5-year budget impact of emerging gene therapies on critical access facilities.
                </p>
                <Link href="/education/case-studies" className="text-indigo-600 font-bold hover:underline">
                    View Case Studies &rarr;
                </Link>
            </div>
            <div className="md:w-1/2 flex justify-center">
                 {/* Visual representation of a chart/graph */}
                 <div className="bg-white p-6 shadow-sm rounded-lg border border-gray-200 w-full max-w-sm">
                    <div className="flex justify