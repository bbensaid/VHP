import React from "react";
import Link from "next/link";

export default function Page() {
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
          Digital transformation, AI integration, and interoperability standards.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: 'AI & Machine Learning', href: '/technology/ai' },
          { label: 'Digital Health & Telemedicine', href: '/technology/digital' },
          { label: 'Data Security & Governance', href: '/technology/security' },
          { label: 'Tech-Enabled Workflow', href: '/technology/workflow' }
        ].map((item) => (
          <Link key={item.label} href={item.href} className="block p-8 bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-all hover:-translate-y-1">
            <h3 className="font-bold text-slate-900 text-lg mb-2">{item.label}</h3>
            <p className="text-slate-500 text-sm">Research and implementation guides regarding {item.label.toLowerCase()}.</p>
          </Link>
        ))}
      </div>
    </div>
  );
}