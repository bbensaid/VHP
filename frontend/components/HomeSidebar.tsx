// frontend/components/HomeSidebar.tsx
"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  AcademicCapIcon,
  BriefcaseIcon,
  ChevronUpIcon,
  FilmIcon,
  ArrowTrendingUpIcon,
} from "@heroicons/react/24/outline";

// Preserved content links (kept in the file per your instructions to not lose content)
export const academyItems = [
  { href: "/education/courses", label: "Executive Masterclasses" },
  { href: "/education/faculty", label: "Faculty & Experts" },
  { href: "/education/webinars", label: "Webinars & Events" },
  { href: "/education/glossary", label: "Glossary" },
  { href: "/education/case-studies", label: "Case Studies Library" },
];

export const advisoryItems = [
  { href: "/advisory/consulting", label: "Strategic Consulting" },
  { href: "/advisory/research", label: "Custom Research Projects" },
  { href: "/advisory/reports", label: "Annual Impact Reports" },
  { href: "/advisory/contact", label: "Hire an Expert" },
];

export const mediaItems = [
  { href: "/media/podcasts", label: "HTR Podcast Network" },
  { href: "/media/videos", label: "Video Briefings" },
  { href: "/media/library", label: "Full Multimedia Library" },
];

export const trendingItems = [
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

  const scrollToTop = () => {
    const scrollContainer = document.querySelector(".overflow-y-auto");
    if (scrollContainer) {
      scrollContainer.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <aside className="relative flex flex-col h-full min-h-full">
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

          {/* NEW BUTTONS EXACTLY MATCHING "CASE STUDY: VERMONT" PARAMETERS */}
          <div className="mt-2 space-y-2">
            <Link
              href="/academy"
              onClick={onNavigate}
              className="flex items-center gap-3 p-3 rounded-lg bg-white hover:bg-slate-50 border border-slate-200 transition-colors group shadow-sm hover:shadow-md"
            >
              <div className="w-8 h-8 rounded-full bg-white border border-slate-100 flex items-center justify-center overflow-hidden flex-shrink-0 text-slate-500 group-hover:text-indigo-600 transition-colors">
                <AcademicCapIcon className="w-5 h-5" />
              </div>
              <span className="text-sm font-bold text-slate-700 group-hover:text-slate-900">
                Academy
              </span>
            </Link>

            <Link
              href="/advisory-hub"
              onClick={onNavigate}
              className="flex items-center gap-3 p-3 rounded-lg bg-white hover:bg-slate-50 border border-slate-200 transition-colors group shadow-sm hover:shadow-md"
            >
              <div className="w-8 h-8 rounded-full bg-white border border-slate-100 flex items-center justify-center overflow-hidden flex-shrink-0 text-slate-500 group-hover:text-indigo-600 transition-colors">
                <BriefcaseIcon className="w-5 h-5" />
              </div>
              <span className="text-sm font-bold text-slate-700 group-hover:text-slate-900">
                Advisory
              </span>
            </Link>

            <Link
              href="/multimedia"
              onClick={onNavigate}
              className="flex items-center gap-3 p-3 rounded-lg bg-white hover:bg-slate-50 border border-slate-200 transition-colors group shadow-sm hover:shadow-md"
            >
              <div className="w-8 h-8 rounded-full bg-white border border-slate-100 flex items-center justify-center overflow-hidden flex-shrink-0 text-slate-500 group-hover:text-indigo-600 transition-colors">
                <FilmIcon className="w-5 h-5" />
              </div>
              <span className="text-sm font-bold text-slate-700 group-hover:text-slate-900">
                Multimedia
              </span>
            </Link>

            <Link
              href="/trending-topics"
              onClick={onNavigate}
              className="flex items-center gap-3 p-3 rounded-lg bg-white hover:bg-slate-50 border border-slate-200 transition-colors group shadow-sm hover:shadow-md"
            >
              <div className="w-8 h-8 rounded-full bg-white border border-slate-100 flex items-center justify-center overflow-hidden flex-shrink-0 text-slate-500 group-hover:text-indigo-600 transition-colors">
                <ArrowTrendingUpIcon className="w-5 h-5" />
              </div>
              <span className="text-sm font-bold text-slate-700 group-hover:text-slate-900">
                Trending Topics
              </span>
            </Link>
          </div>
        </div>
      </div>

      {/* FOOTER ACTIONS */}
      <div className="sticky bottom-0 bg-white pt-4 pb-6 mt-auto border-t border-slate-100 z-20 -mx-4 px-4 -mb-4">
        {onCollapseAll && (
          <button
            onClick={onCollapseAll}
            className="w-full flex items-center justify-center gap-2 rounded-lg bg-white border border-slate-200 hover:bg-slate-50 text-slate-600 font-bold text-xs py-2.5 transition-colors mb-3 shadow-sm"
          >
            Collapse All Menus
          </button>
        )}

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
