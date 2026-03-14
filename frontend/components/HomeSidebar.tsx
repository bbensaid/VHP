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
  LightBulbIcon,
  MapPinIcon,
  GlobeAmericasIcon,
} from "@heroicons/react/24/outline";


interface HomeSidebarProps {
  onNavigate?: () => void;
}

function SectionLabel({ children, bg = "bg-slate-100", border = "border-slate-300" }: { children: React.ReactNode; bg?: string; border?: string }) {
  return (
    <div className="px-1 pt-3 pb-1">
      <span className={`inline-block text-[10px] font-black uppercase tracking-[0.15em] text-slate-800 ${bg} ${border} border rounded-md px-2 py-1`}>
        {children}
      </span>
    </div>
  );
}

// Section accent colors
// Services   → indigo  (border-l-indigo-400, icon text-indigo-500, hover bg-indigo-50)
// Federal    → sky     (border-l-sky-400,    icon text-sky-500,    hover bg-sky-50)
// States     → violet  (border-l-violet-400, icon text-violet-500, hover bg-violet-50)
// Tools      → amber   (border-l-amber-400,  icon text-amber-500,  hover bg-amber-50)

export default function HomeSidebar({ onNavigate }: HomeSidebarProps) {
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
      <div>
        <div className="space-y-2">

          {/* ── Services (indigo) ──────────────────────────────────────── */}
          <SectionLabel bg="bg-indigo-100" border="border-indigo-300">Services</SectionLabel>
          <div className="space-y-2">
            <Link
              href="/academy"
              onClick={onNavigate}
              className="flex items-center gap-3 p-3 rounded-lg bg-white hover:bg-indigo-50 border border-slate-200 border-l-2 border-l-indigo-400 transition-colors group shadow-sm hover:shadow-md"
            >
              <div className="w-8 h-8 rounded-full bg-slate-50 border border-slate-200 flex items-center justify-center overflow-hidden shrink-0 text-indigo-500 group-hover:text-indigo-700 transition-colors">
                <AcademicCapIcon className="w-5 h-5" />
              </div>
              <span className="text-sm font-bold text-slate-700 group-hover:text-slate-900">
                Academy
              </span>
            </Link>

            <Link
              href="/advisory-hub"
              onClick={onNavigate}
              className="flex items-center gap-3 p-3 rounded-lg bg-white hover:bg-indigo-50 border border-slate-200 border-l-2 border-l-indigo-400 transition-colors group shadow-sm hover:shadow-md"
            >
              <div className="w-8 h-8 rounded-full bg-slate-50 border border-slate-200 flex items-center justify-center overflow-hidden shrink-0 text-indigo-500 group-hover:text-indigo-700 transition-colors">
                <BriefcaseIcon className="w-5 h-5" />
              </div>
              <span className="text-sm font-bold text-slate-700 group-hover:text-slate-900">
                Advisory
              </span>
            </Link>
          </div>

          {/* ── Federal Programs (sky) ─────────────────────────────────── */}
          <SectionLabel bg="bg-sky-100" border="border-sky-300">Federal Programs</SectionLabel>
          <div className="space-y-2">
            <Link
              href="/dashboard"
              onClick={onNavigate}
              title="Explore the Rural Health Transformation program — 50-state coverage, global budgets, and CMS data"
              className="flex items-center gap-3 p-3 rounded-lg bg-white hover:bg-sky-50 border border-slate-200 border-l-2 border-l-sky-400 transition-colors group shadow-sm hover:shadow-md"
            >
              <div className="w-8 h-8 rounded-full bg-slate-50 border border-slate-200 flex items-center justify-center overflow-hidden shrink-0">
                <Image
                  src="/rhtp-icon.png"
                  alt="Rural Health Transformation"
                  width={32}
                  height={32}
                  className="object-contain w-full h-full"
                />
              </div>
              <span className="text-sm font-bold text-slate-700 group-hover:text-slate-900 leading-tight">
                Rural Health Transformation
              </span>
            </Link>
            <Link
              href="/ahead-model"
              onClick={onNavigate}
              title="AHEAD Model — CMS all-payer total cost of care model operating in 6 states"
              className="flex items-center gap-3 p-3 rounded-lg bg-white hover:bg-sky-50 border border-slate-200 border-l-2 border-l-sky-400 transition-colors group shadow-sm hover:shadow-md"
            >
              <div className="w-8 h-8 rounded-full bg-slate-50 border border-slate-200 flex items-center justify-center shrink-0 text-sky-600 group-hover:text-sky-700 transition-colors font-black text-[11px]">
                AH
              </div>
              <span className="text-sm font-bold text-slate-700 group-hover:text-slate-900 leading-tight">
                AHEAD Model
              </span>
            </Link>
          </div>

          {/* ── State Initiatives (violet) ────────────────────────────── */}
          <SectionLabel bg="bg-violet-100" border="border-violet-300">State Initiatives</SectionLabel>
          <div className="space-y-2">
            <Link
              href="/vermont-act-167"
              onClick={onNavigate}
              title="Vermont Act 167 — Hospital transformation, Oliver Wyman Report, and the future of Vermont healthcare"
              className="flex items-center gap-3 p-3 rounded-lg bg-white hover:bg-violet-50 border border-slate-200 border-l-2 border-l-violet-400 transition-colors group shadow-sm hover:shadow-md"
            >
              <div className="w-8 h-8 rounded-full bg-slate-50 border border-slate-200 flex items-center justify-center shrink-0 text-violet-500 group-hover:text-violet-700 transition-colors">
                <MapPinIcon className="w-4 h-4" />
              </div>
              <span className="text-sm font-bold text-slate-700 group-hover:text-slate-900 leading-tight">
                Vermont Act 167
              </span>
            </Link>
            <Link
              href="/california-calaim"
              onClick={onNavigate}
              title="CalAIM — California's $6.7B Medi-Cal transformation: whole-person care, housing, and equity"
              className="flex items-center gap-3 p-3 rounded-lg bg-white hover:bg-violet-50 border border-slate-200 border-l-2 border-l-violet-400 transition-colors group shadow-sm hover:shadow-md"
            >
              <div className="w-8 h-8 rounded-full bg-slate-50 border border-slate-200 flex items-center justify-center shrink-0 text-violet-600 group-hover:text-violet-700 transition-colors font-black text-[11px]">
                CA
              </div>
              <span className="text-sm font-bold text-slate-700 group-hover:text-slate-900 leading-tight">
                California CalAIM
              </span>
            </Link>
            <Link
              href="/states"
              onClick={onNavigate}
              title="Explore health reform initiatives across all 50 states — Medicaid waivers, public options, global budgets, and more"
              className="flex items-center gap-3 p-3 rounded-lg bg-white hover:bg-violet-50 border border-slate-200 border-l-2 border-l-violet-400 transition-colors group shadow-sm hover:shadow-md"
            >
              <div className="w-8 h-8 rounded-full bg-slate-50 border border-slate-200 flex items-center justify-center shrink-0 text-violet-500 group-hover:text-violet-700 transition-colors">
                <GlobeAmericasIcon className="w-4 h-4" />
              </div>
              <span className="text-sm font-bold text-slate-700 group-hover:text-slate-900 leading-tight">
                Other States
              </span>
            </Link>
          </div>

          {/* ── Tools & Resources (amber) ─────────────────────────────── */}
          <SectionLabel bg="bg-amber-100" border="border-amber-300">Tools &amp; Resources</SectionLabel>
          <div className="space-y-2">
            <Link
              href="/hti-dashboard"
              onClick={onNavigate}
              className="flex items-center gap-3 p-3 rounded-lg bg-white hover:bg-amber-50 border border-slate-200 border-l-2 border-l-amber-400 transition-colors group shadow-sm hover:shadow-md"
            >
              <div className="w-8 h-8 rounded-full bg-slate-50 border border-slate-200 flex items-center justify-center overflow-hidden shrink-0 text-amber-500 group-hover:text-amber-700 transition-colors">
                <LightBulbIcon className="w-5 h-5" />
              </div>
              <span className="text-sm font-bold text-slate-700 group-hover:text-slate-900">
                Research Lab
              </span>
            </Link>

            <Link
              href="/multimedia"
              onClick={onNavigate}
              className="flex items-center gap-3 p-3 rounded-lg bg-white hover:bg-amber-50 border border-slate-200 border-l-2 border-l-amber-400 transition-colors group shadow-sm hover:shadow-md"
            >
              <div className="w-8 h-8 rounded-full bg-slate-50 border border-slate-200 flex items-center justify-center overflow-hidden shrink-0 text-amber-500 group-hover:text-amber-700 transition-colors">
                <FilmIcon className="w-5 h-5" />
              </div>
              <span className="text-sm font-bold text-slate-700 group-hover:text-slate-900">
                Multimedia
              </span>
            </Link>

            <Link
              href="/trending-topics"
              onClick={onNavigate}
              className="flex items-center gap-3 p-3 rounded-lg bg-white hover:bg-amber-50 border border-slate-200 border-l-2 border-l-amber-400 transition-colors group shadow-sm hover:shadow-md"
            >
              <div className="w-8 h-8 rounded-full bg-slate-50 border border-slate-200 flex items-center justify-center overflow-hidden shrink-0 text-amber-500 group-hover:text-amber-700 transition-colors">
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
