import React from "react";
import Link from "next/link";
import {
  DocumentTextIcon,
  LifebuoyIcon,
  ScaleIcon,
  CurrencyDollarIcon,
  CpuChipIcon,
} from "@heroicons/react/24/outline";

const policyItems = [
  { href: "/policy", label: "Policy Hub (Overview)" },
  { href: "/policy/regulation", label: "Regulation & Legislation" },
  { href: "/policy/mandates", label: "Public Health Mandates" },
  { href: "/policy/global", label: "Global & Comparative Policy" },
  { href: "/policy/feasibility", label: "Policy Feasibility Studies" },
];

const economicsItems = [
  { href: "/economics", label: "Economics Hub (Overview)" },
  { href: "/economics/value", label: "Value-Based Care Models" },
  { href: "/economics/market", label: "Market & Finance" },
  { href: "/economics/cea", label: "Labor & Workforce Strategy" },
  { href: "/economics/investment", label: "Healthcare Investment Trends" },
];

const technologyItems = [
  { href: "/technology", label: "Technology Hub (Overview)" },
  { href: "/technology/ai", label: "AI & Machine Learning" },
  { href: "/technology/digital", label: "Digital Health & Telemedicine" },
  { href: "/technology/security", label: "Data Security & Governance" },
  { href: "/technology/workflow", label: "Tech-Enabled Workflow" },
];

export default function HomeSidebar() {
  return (
    <aside className="w-full flex flex-col gap-8">
      {/* QUICK ACTIONS */}
      <div>
        <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4">
          Quick Actions
        </h3>
        <div className="space-y-2">
          <Link
            href="/submit-report"
            className="flex items-center gap-3 p-3 rounded-lg bg-slate-50 hover:bg-slate-100 border border-slate-200 transition-colors group"
          >
            <div className="w-8 h-8 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-500 group-hover:text-indigo-600 group-hover:border-indigo-200">
              <DocumentTextIcon className="w-4 h-4" />
            </div>
            <span className="text-sm font-bold text-slate-700 group-hover:text-slate-900">
              Submit Report
            </span>
          </Link>
          <Link
            href="/support"
            className="flex items-center gap-3 p-3 rounded-lg bg-slate-50 hover:bg-slate-100 border border-slate-200 transition-colors group"
          >
            <div className="w-8 h-8 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-500 group-hover:text-indigo-600 group-hover:border-indigo-200">
              <LifebuoyIcon className="w-4 h-4" />
            </div>
            <span className="text-sm font-bold text-slate-700 group-hover:text-slate-900">
              Contact Support
            </span>
          </Link>
        </div>
      </div>

      {/* POLICY PILLAR */}
      <div>
        <div className="flex items-center gap-2 mb-3 pb-2 border-b border-orange-100">
          <ScaleIcon className="w-4 h-4 text-orange-600" />
          <h3 className="text-xs font-black text-orange-700 uppercase tracking-widest">
            Policy
          </h3>
        </div>
        <ul className="space-y-1">
          {policyItems.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className="block px-3 py-2 text-sm font-medium text-slate-600 hover:text-orange-700 hover:bg-orange-50 rounded transition-colors"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* ECONOMICS PILLAR */}
      <div>
        <div className="flex items-center gap-2 mb-3 pb-2 border-b border-emerald-100">
          <CurrencyDollarIcon className="w-4 h-4 text-emerald-600" />
          <h3 className="text-xs font-black text-emerald-700 uppercase tracking-widest">
            Economics
          </h3>
        </div>
        <ul className="space-y-1">
          {economicsItems.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className="block px-3 py-2 text-sm font-medium text-slate-600 hover:text-emerald-700 hover:bg-emerald-50 rounded transition-colors"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* TECHNOLOGY PILLAR */}
      <div>
        <div className="flex items-center gap-2 mb-3 pb-2 border-b border-indigo-100">
          <CpuChipIcon className="w-4 h-4 text-indigo-600" />
          <h3 className="text-xs font-black text-indigo-700 uppercase tracking-widest">
            Technology
          </h3>
        </div>
        <ul className="space-y-1">
          {technologyItems.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className="block px-3 py-2 text-sm font-medium text-slate-600 hover:text-indigo-700 hover:bg-indigo-50 rounded transition-colors"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
}
