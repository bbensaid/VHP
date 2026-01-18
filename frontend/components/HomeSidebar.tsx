"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ScaleIcon,
  CurrencyDollarIcon,
  CpuChipIcon,
  ChevronDownIcon,
  AcademicCapIcon,
  BriefcaseIcon,
  BuildingOfficeIcon,
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

const companyItems = [
  { href: "/about", label: "About Us" },
  { href: "/mission", label: "Mission & Vision" },
  { href: "/faq", label: "FAQ" },
  { href: "/careers", label: "Careers" },
  { href: "/contact", label: "Contact Us" },
];

const ALL_SECTIONS = [
  "Policy",
  "Economics",
  "Technology",
  "Academy",
  "Advisory",
  "Company",
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
    hoverBgClass: string,
    items: { href: string; label: string }[]
  ) => {
    const isOpen = openSections.includes(title);
    return (
      <div className="border-b border-slate-100 last:border-0">
        <button
          onClick={() => toggleSection(title)}
          className={`w-full flex items-center justify-between py-3 px-3 my-1 rounded-lg group transition-all duration-200 focus:outline-none ${isOpen ? bgClass : `bg-white ${hoverBgClass}`}`}
        >
          <div className="flex items-center gap-3">
            <div
              className={`p-1.5 rounded-md transition-colors duration-200 ${isOpen ? "bg-white/60 shadow-sm" : "bg-slate-50 group-hover:bg-white/60 group-hover:shadow-sm"}`}
            >
              <span
                className={`block w-5 h-5 transition-colors duration-200 ${colorClass}`}
              >
                {icon}
              </span>
            </div>
            <span
              className={`text-xs font-black uppercase tracking-widest transition-colors duration-200 ${colorClass}`}
            >
              {title}
            </span>
          </div>
          <ChevronDownIcon
            className={`w-4 h-4 transition-transform duration-200 ease-out ${colorClass} ${isOpen ? "rotate-180" : ""}`}
          />
        </button>

        <div
          className={`grid transition-all duration-300 ease-in-out ${isOpen ? "grid-rows-[1fr] opacity-100 pb-2" : "grid-rows-[0fr] opacity-0"}`}
        >
          <div className="overflow-hidden">
            <ul className="space-y-1 pl-2 ml-2">
              {items.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={`block px-3 py-2 text-sm font-medium text-slate-500 hover:${colorClass} hover:bg-slate-50 rounded-md transition-colors duration-200`}
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
            title="View the national surveillance map and active state cohorts"
            className="flex items-center gap-3 p-3 rounded-lg bg-[#1e3a8a] hover:bg-[#1e40af] border border-[#1e3a8a] transition-colors group shadow-md"
          >
            <div className="w-8 h-8 rounded-full bg-white border border-white flex items-center justify-center overflow-hidden flex-shrink-0">
              <Image
                src="/rhtp-icon.png"
                alt="RHTP Logo"
                width={32}
                height={32}
                className="object-contain w-full h-full"
              />
            </div>
            <span className="text-sm font-bold text-white">
              Rural Health Transformation
            </span>
          </Link>
          <Link
            href="/dashboard/vermont"
            title="Read the detailed case study on Vermont's health reform"
            className="flex items-center gap-3 p-3 rounded-lg bg-emerald-700 hover:bg-emerald-800 border border-emerald-700 transition-colors group shadow-md"
          >
            <div className="w-8 h-8 rounded-full bg-white border border-white flex items-center justify-center overflow-hidden flex-shrink-0">
              <Image
                src="/vermont-icon.svg"
                alt="Vermont Case Study"
                width={32}
                height={32}
                className="object-contain w-full h-full"
              />
            </div>
            <span className="text-sm font-bold text-white">
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
            "text-orange-700",
            "bg-orange-50",
            "hover:bg-orange-50",
            policyItems
          )}
          {renderPillar(
            "Economics",
            <CurrencyDollarIcon />,
            "text-emerald-600",
            "bg-emerald-50",
            "hover:bg-emerald-50",
            economicsItems
          )}
          {renderPillar(
            "Technology",
            <CpuChipIcon />,
            "text-indigo-600",
            "bg-indigo-50",
            "hover:bg-indigo-50",
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
            "text-sky-400",
            "bg-sky-50",
            "hover:bg-sky-50",
            academyItems
          )}
          {renderPillar(
            "Advisory",
            <BriefcaseIcon />,
            "text-fuchsia-500",
            "bg-fuchsia-50",
            "hover:bg-fuchsia-50",
            advisoryItems
          )}
        </div>
      </div>

      {/* COMPANY ACCORDION */}
      <div className="mt-2">
        <h3 className="text-[10px] font-black text-slate-300 uppercase tracking-widest mb-2 px-1">
          Company
        </h3>
        <div className="bg-white rounded-xl border border-slate-200 shadow-[0_2px_8px_rgba(0,0,0,0.02)] overflow-hidden px-3">
          {renderPillar(
            "Company",
            <BuildingOfficeIcon />,
            "text-slate-700",
            "bg-slate-50",
            "hover:bg-slate-50",
            companyItems
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
