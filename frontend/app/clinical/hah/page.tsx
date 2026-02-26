import React from "react";

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
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {['Hospital-at-Home', 'Precision Medicine', 'Virtual Care Models'].map((item) => (
          <div key={item} className="p-8 bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
            <h3 className="font-bold text-slate-900 text-lg mb-2">{item}</h3>
            <p className="text-slate-500 text-sm">Explore our latest research and frameworks regarding {item.toLowerCase()}.</p>
          </div>
        ))}
      </div>
    </div>
  );
}