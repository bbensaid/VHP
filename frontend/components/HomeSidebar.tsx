"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  AcademicCapIcon,
  BriefcaseIcon,
  ChevronUpIcon,
  ChevronDownIcon,
  BuildingOfficeIcon,
  FilmIcon,
  ArrowTrendingUpIcon,
  MinusIcon,
} from "@heroicons/react/24/outline";

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

const mediaItems = [
  { href: "/media/podcasts", label: "HTR Podcast Network" },
  { href: "/media/videos", label: "Video Briefings" },
  { href: "/media/library", label: "Full Multimedia Library" },
];

const trendingItems = [
  { href: "/topics/value-based-care", label: "Value-Based Care Models" },
  { href: "/topics/workforce", label: "Clinical Workforce Gaps" },
  { href: "/topics/telehealth", label: "Telehealth Reimbursement" },
];

export const ALL_SECTIONS = [
  "Academy",
  "Advisory",
  "Multimedia",
  "Trending Topics",
];

interface HomeSidebarProps {
  openSections: string[];
  onToggleSection: (section: string) => void;
  onNavigate?: () => void;
  onCollapseAll?: () => void;
}

export default function HomeSidebar({
  openSections,
  onToggleSection,
  onNavigate,
  onCollapseAll,
}: HomeSidebarProps) {
  const [showBackToTop, setShowBackToTop] = useState(false);
  const topSentinelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setShowBackToTop(!entry.isIntersecting);
      },
      { threshold: 0 },
    );

    if (topSentinelRef.current) {
      observer.observe(topSentinelRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const scrollToTop = (e: React.MouseEvent) => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    // Also scroll the sidebar container itself
    const sidebarContainer = e.currentTarget.closest(".overflow-y-auto");
    if (sidebarContainer) {
      sidebarContainer.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const renderPillar = (
    title: string,
    icon: React.ReactNode,
    items: { href: string; label: string }[],
  ) => {
    const isOpen = openSections.includes(title);

    return (
      <div className="border-b border-slate-100 last:border-0">
        <button
          onClick={() => onToggleSection(title)}
          className={`w-full flex items-center justify-between py-3 px-3 my-1 rounded-lg group transition-all duration-200 focus:outline-none border border-slate-200 ${isOpen ? "bg-slate-100 text-slate-900" : "bg-white text-slate-600 hover:bg-slate-50 hover:text-slate-900"}`}
          aria-expanded={isOpen}
        >
          <div className="flex items-center gap-3">
            <div
              className={`p-1.5 rounded-md transition-colors duration-200 ${isOpen ? "bg-white shadow-sm text-slate-900" : "bg-slate-50 text-slate-400 group-hover:text-slate-600 group-hover:bg-white group-hover:shadow-sm"}`}
            >
              <span className="block w-5 h-5 transition-colors duration-200">
                {icon}
              </span>
            </div>
            <span className="text-xs font-black uppercase tracking-widest transition-colors duration-200">
              {title}
            </span>
          </div>
          <ChevronDownIcon
            className={`w-4 h-4 transition-transform duration-200 ease-out text-slate-400 ${isOpen ? "rotate-180 text-slate-600" : "group-hover:text-slate-500"}`}
          />
        </button>

        <div
          className={`grid transition-all duration-300 ease-in-out ${isOpen ? "grid-rows-[1fr] opacity-100 pb-2" : "grid-rows-[0fr] opacity-0"}`}
        >
          <div className="overflow-hidden">
            <ul className="space-y-1 pl-4 ml-3 border-l border-slate-200">
              {items.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={onNavigate}
                    className="block px-3 py-2 text-sm font-medium text-slate-500 hover:text-slate-900 hover:bg-slate-100 rounded-md transition-colors duration-200"
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
    <aside className="w-full flex flex-col gap-6 min-h-full relative">
      <div
        ref={topSentinelRef}
        className="absolute top-0 left-0 w-full h-1 pointer-events-none"
      />
      {/* QUICK ACTIONS */}
      <div>
        <div className="space-y-2">
          <Link
            href="/dashboard"
            onClick={onNavigate}
            title="View the national surveillance map and active state cohorts"
            className="flex items-center gap-3 p-3 rounded-lg bg-white hover:bg-slate-50 border border-slate-200 transition-colors group shadow-sm hover:shadow-md"
          >
            <div className="w-8 h-8 rounded-full bg-white border border-slate-100 flex items-center justify-center overflow-hidden flex-shrink-0">
              <Image
                src="/rhtp-icon.png"
                alt="RHTP Logo"
                width={32}
                height={32}
                className="object-contain w-full h-full"
              />
            </div>
            <span className="text-sm font-bold text-slate-700 group-hover:text-slate-900">
              State Performance Index
            </span>
          </Link>
          <Link
            href="/dashboard/vermont"
            onClick={onNavigate}
            title="Read the detailed case study on Vermont's health reform"
            className="flex items-center gap-3 p-3 rounded-lg bg-white hover:bg-slate-50 border border-slate-200 transition-colors group shadow-sm hover:shadow-md"
          >
            <div className="w-8 h-8 rounded-full bg-white border border-slate-100 flex items-center justify-center overflow-hidden flex-shrink-0">
              <Image
                src="/vermont-icon.svg"
                alt="Vermont Case Study"
                width={32}
                height={32}
                className="object-contain w-full h-full"
              />
            </div>
            <span className="text-sm font-bold text-slate-700 group-hover:text-slate-900">
              Case Study: Vermont
            </span>
          </Link>
        </div>
      </div>

      {/* ACADEMY ACCORDION */}
      <div className="mt-2">
        {renderPillar("Academy", <AcademicCapIcon />, academyItems)}
      </div>

      {/* ADVISORY ACCORDION */}
      <div className="mt-2">
        {renderPillar("Advisory", <BriefcaseIcon />, advisoryItems)}
      </div>

      {/* MULTIMEDIA ACCORDION */}
      <div className="mt-2">
        {renderPillar("Multimedia", <FilmIcon />, mediaItems)}
      </div>

      {/* TRENDING TOPICS ACCORDION */}
      <div className="mt-2">
        {renderPillar(
          "Trending Topics",
          <ArrowTrendingUpIcon />,
          trendingItems,
        )}
      </div>

      {/* FOOTER ACTIONS */}
      <div className="sticky bottom-0 bg-white pt-4 pb-6 mt-auto border-t border-slate-100 z-20 -mx-6 px-6 -mb-6">
        {/* COLLAPSE ALL */}
        {onCollapseAll && (
          <button
            onClick={onCollapseAll}
            className={`w-full flex items-center justify-center gap-2 rounded-lg bg-white border hover:bg-slate-50 text-slate-500 hover:text-slate-900 transition-all duration-300 text-[10px] font-bold uppercase tracking-wider shadow-sm overflow-hidden ${
              openSections.length > 0
                ? "opacity-100 max-h-10 py-2 border-slate-200 mb-3"
                : "opacity-0 max-h-0 py-0 border-transparent pointer-events-none mb-0"
            }`}
          >
            <MinusIcon className="w-3 h-3" />
            Collapse All
          </button>
        )}

        {/* BACK TO TOP */}
        <button
          onClick={scrollToTop}
          className={`w-full flex items-center justify-center gap-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-900 transition-all duration-300 text-[10px] font-bold uppercase tracking-wider overflow-hidden ${
            showBackToTop
              ? "opacity-100 max-h-10 py-2"
              : "opacity-0 max-h-0 py-0 pointer-events-none"
          }`}
        >
          <ChevronUpIcon className="w-3 h-3" />
          Back to Top
        </button>
      </div>
    </aside>
  );
}
