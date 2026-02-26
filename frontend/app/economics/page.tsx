import React from "react";
import Link from "next/link";

export default function Page() {
  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <div className="mb-12">
        <span className="text-sm font-bold text-emerald-600 uppercase tracking-wider">
          Health Economics
        </span>
        <h1 className="text-4xl font-black text-slate-900 mt-2 mb-4">
          Economics Hub
        </h1>
        <p className="text-xl text-slate-600 max-w-3xl">
          Analyzing the financial drivers of healthcare transformation, from value-based care to market consolidation.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: 'Value-Based Care Models', href: '/economics/value' },
          { label: 'Market & Finance', href: '/economics/market' },
          { label: 'Labor & Workforce Strategy', href: '/economics/cea' },
          { label: 'Healthcare Investment Trends', href: '/economics/investment' }
        ].map((item) => (
          <Link key={item.label} href={item.href} className="block p-8 bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-all hover:-translate-y-1">
            <h3 className="font-bold text-slate-900 text-lg mb-2">{item.label}</h3>
            <p className="text-slate-500 text-sm">Economic analysis and market trends regarding {item.label.toLowerCase()}.</p>
          </Link>
        ))}
      </div>
    </div>
  );
}