"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  DocumentTextIcon,
  LifebuoyIcon,
  ScaleIcon,
  CurrencyDollarIcon,
  CpuChipIcon,
  ChevronDownIcon,
  AcademicCapIcon,
  BriefcaseIcon,
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

const academyItems = [
  { href: "/education/courses", label: "Executive Masterclasses" },
  { href: "/education/faculty", label: "Faculty & Experts" },
  { href: "/education/webinars", label: "Webinars & Events" },
  { href: "/education/glossary", label: "Glossary" },
  { href: "/education/case-studies", label: "Case Studies Library" },
];

const advisoryItems = [
  { href: "/advisory/consulting", label: "Strategic Consulting" },
  { href: "/advisory/research", label: "Custom Research Projects" },
  { href: "/advisory/reports", label: "Annual Impact Reports" },
  { href: "/advisory/contact", label: "Hire an Expert" },
];

const ALL_SECTIONS = [
  "Policy",
  "Economics",
  "Technology",
  "Academy",
  "Advisory",
];

export default function HomeSidebar() {
  const [openSections, setOpenSections] = useState<string[]>([]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const toggleSection = (section: string) => {
    setOpenSections((prev) =>
      prev.includes(section)
        ? prev.filter((s) => s !== section)
        : [...prev, section]
    );
  };

  const handleExpandAll = () => {
    setOpenSections(ALL_SECTIONS);
    scrollToTop();
  };

  const handleCollapseAll = () => {
    setOpenSections([]);
    scrollToTop();
  };

  const renderPillar = (
    title: string,
    icon: React.ReactNode,
    colorClass: string,
    bgClass: string,
    items: { href: string; label: string }[]
  ) => {
    const isOpen = openSections.includes(title);
    return (
      <div className="border-b border-slate-100 last:border-0">
        <button
          onClick={() => toggleSection(title)}
          className={`w-full flex items-center justify-between py-4 px-1 group transition-colors focus:outline-none ${isOpen ? "" : "hover:bg-slate-50/80"}`}
        >
          <div className="flex items-center gap-3">
            <div
              className={`p-1.5 rounded-md transition-colors duration-300 ${isOpen ? bgClass : "bg-white border border-slate-100"}`}
            >
              <span
                className={`block w-5 h-5 transition-colors duration-300 ${isOpen ? colorClass : "text-slate-400 group-hover:text-slate-600"}`}
              >
                {icon}
              </span>
            </div>
            <span
              className={`text-xs font-black uppercase tracking-widest transition-colors duration-300 ${isOpen ? "text-slate-900" : "text-slate-500 group-hover:text-slate-800"}`}
            >
              {title}
            </span>
          </div>
          <ChevronDownIcon
            className={`w-4 h-4 text-slate-300 transition-transform duration-300 ease-out ${isOpen ? "rotate-180 text-slate-600" : ""}`}
          />
        </button>

        <div
          className={`grid transition-all duration-300 ease-in-out ${isOpen ? "grid-rows-[1fr] opacity-100 pb-4" : "grid-rows-[0fr] opacity-0"}`}
        >
          <div className="overflow-hidden">
            <ul className="space-y-1 pl-11 border-l-2 border-slate-100 ml-4">
              {items.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={`block px-3 py-2 text-sm font-medium text-slate-500 hover:${colorClass} hover:bg-slate-50 rounded-r-md transition-colors`}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    );
  };

  return (
    <aside className="w-full flex flex-col gap-6">
      {/* QUICK ACTIONS */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest">
            Quick Actions
          </h3>
          <div className="flex gap-3">
            {openSections.length < ALL_SECTIONS.length && (
              <button
                onClick={handleExpandAll}
                className="text-[10px] font-bold text-slate-400 hover:text-indigo-600 uppercase tracking-wider transition-colors"
              >
                Expand All
              </button>
            )}
            {openSections.length > 0 && (
              <button
                onClick={handleCollapseAll}
                className="text-[10px] font-bold text-slate-400 hover:text-indigo-600 uppercase tracking-wider transition-colors"
              >
                Collapse All
              </button>
            )}
          </div>
        </div>
        <div className="space-y-2">
          <Link
            href="/dashboard"
            className="flex items-center gap-3 p-3 rounded-lg bg-slate-50 hover:bg-slate-100 border border-slate-200 transition-colors group"
          >
            <div className="w-8 h-8 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-500 group-hover:text-indigo-600 group-hover:border-indigo-200">
              <DocumentTextIcon className="w-4 h-4" />
            </div>
            <span className="text-sm font-bold text-slate-700 group-hover:text-slate-900">
              Rural Health Trasnformation Program (RHTP)
            </span>
          </Link>
          <Link
            href="/dashboard/vermont"
            className="flex items-center gap-3 p-3 rounded-lg bg-slate-50 hover:bg-slate-100 border border-slate-200 transition-colors group"
          >
            <div className="w-8 h-8 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-500 group-hover:text-indigo-600 group-hover:border-indigo-200">
              <LifebuoyIcon className="w-4 h-4" />
            </div>
            <span className="text-sm font-bold text-slate-700 group-hover:text-slate-900">
              Case Study: Vermont
            </span>
          </Link>
        </div>
      </div>

      {/* PILLARS ACCORDION */}
      <div className="mt-2">
        <h3 className="text-[10px] font-black text-slate-300 uppercase tracking-widest mb-2 px-1">
          Intelligence Pillars
        </h3>
        <div className="bg-white rounded-xl border border-slate-200 shadow-[0_2px_8px_rgba(0,0,0,0.02)] overflow-hidden px-3">
          {renderPillar(
            "Policy",
            <ScaleIcon />,
            "text-orange-600",
            "bg-orange-50",
            policyItems
          )}
          {renderPillar(
            "Economics",
            <CurrencyDollarIcon />,
            "text-emerald-600",
            "bg-emerald-50",
            economicsItems
          )}
          {renderPillar(
            "Technology",
            <CpuChipIcon />,
            "text-indigo-600",
            "bg-indigo-50",
            technologyItems
          )}
        </div>
      </div>

      {/* PROGRAMS & SERVICES ACCORDION */}
      <div className="mt-2">
        <h3 className="text-[10px] font-black text-slate-300 uppercase tracking-widest mb-2 px-1">
          Programs & Services
        </h3>
        <div className="bg-white rounded-xl border border-slate-200 shadow-[0_2px_8px_rgba(0,0,0,0.02)] overflow-hidden px-3">
          {renderPillar(
            "Academy",
            <AcademicCapIcon />,
            "text-sky-600",
            "bg-sky-50",
            academyItems
          )}
          {renderPillar(
            "Advisory",
            <BriefcaseIcon />,
            "text-violet-600",
            "bg-violet-50",
            advisoryItems
          )}
        </div>
      </div>

      {/* BOTTOM COLLAPSE ALL */}
      {openSections.length > 0 && (
        <div className="flex justify-center">
          <button
            onClick={handleCollapseAll}
            className="text-[10px] font-bold text-slate-400 hover:text-indigo-600 uppercase tracking-wider transition-colors"
          >
            Collapse All
          </button>
        </div>
      )}
    </aside>
  );
}
