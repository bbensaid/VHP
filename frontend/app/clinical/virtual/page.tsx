import React from "react";

export default function Page() {
  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <div className="mb-12">
        <span className="text-sm font-bold text-rose-600 uppercase tracking-wider">
          Clinical / Telehealth
        </span>
        <h1 className="text-4xl font-black text-slate-900 mt-2 mb-4">
          Virtual Care Models
        </h1>
        <p className="text-xl text-slate-600 max-w-3xl">
          Next-generation synchronous and asynchronous care platforms extending provider reach.
        </p>
      </div>
      <div className="p-12 bg-slate-50 rounded-2xl border border-slate-200 text-center">
        <p className="text-slate-500 font-medium">Module under active development.</p>
      </div>
    </div>
  );
}