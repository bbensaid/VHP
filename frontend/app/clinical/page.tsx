import React from "react";
import Link from "next/link";

export default function Page() {
  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <div className="mb-12">
        <span className="text-sm font-bold text-rose-600 uppercase tracking-wider">
          Clinical Intelligence
        </span>
        <h1 className="text-4xl font-black text-slate-900 mt-2 mb-4">
          Clinical Hub
        </h1>
        <p className="text-xl text-slate-600 max-w-3xl">
          Advanced clinical frameworks, care delivery models, and medical intelligence.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: 'Hospital-at-Home', href: '/clinical/hah' },
          { label: 'Precision Medicine', href: '/clinical/precision' },
          { label: 'Virtual Care Models', href: '/clinical/virtual' },
          { label: 'Population Health', href: '/clinical/population' }
        ].map((item) => (
          <Link key={item.label} href={item.href} className="block p-8 bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-all hover:-translate-y-1">
            <h3 className="font-bold text-slate-900 text-lg mb-2">{item.label}</h3>
            <p className="text-slate-500 text-sm">Explore our latest research and frameworks regarding {item.label.toLowerCase()}.</p>
          </Link>
        ))}
      </div>
    </div>
  );
}