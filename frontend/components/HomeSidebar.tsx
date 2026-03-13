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
} from "@heroicons/react/24/outline";


interface HomeSidebarProps {
  onNavigate?: () => void;
}

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
      {/* QUICK ACTIONS */}
      <div>
        <div className="space-y-2">

          {/* ── Federal Programs ─────────────────────────────────── */}
          <p className="text-[10px] font-black uppercase tracking-[0.15em] text-slate-400 px-1 pt-1 pb-0.5">
            Federal Programs
          </p>
          <Link
            href="/dashboard"
            onClick={onNavigate}
            title="Explore the Rural Health Transformation program — 50-state coverage, global budgets, and CMS data"
            className="flex items-center gap-3 p-3 rounded-lg bg-blue-50 hover:bg-blue-100 border border-blue-200 transition-colors group shadow-sm hover:shadow-md"
          >
            <div className="w-8 h-8 rounded-full bg-white border border-blue-200 flex items-center justify-center overflow-hidden shrink-0">
              <Image
                src="/rhtp-icon.png"
                alt="Rural Health Transformation"
                width={32}
                height={32}
                className="object-contain w-full h-full"
              />
            </div>
            <span className="text-sm font-bold text-blue-800 group-hover:text-blue-900 leading-tight">
              Rural Health Transformation
            </span>
          </Link>
          <Link
            href="/ahead-model"
            onClick={onNavigate}
            title="AHEAD Model — CMS all-payer total cost of care model operating in 6 states"
            className="flex items-center gap-3 p-3 rounded-lg bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 transition-colors group shadow-sm hover:shadow-md"
          >
            <div className="w-8 h-8 rounded-full bg-white border border-emerald-200 flex items-center justify-center shrink-0 text-emerald-600 font-black text-[11px]">
              AH
            </div>
            <span className="text-sm font-bold text-emerald-800 group-hover:text-emerald-900 leading-tight">
              AHEAD Model
            </span>
          </Link>

          {/* ── Platform ─────────────────────────────────────────────── */}
          <p className="text-[10px] font-black uppercase tracking-[0.15em] text-slate-400 px-1 pt-3 pb-0.5">
            Platform
          </p>
          <div className="space-y-2">
            <Link
              href="/academy"
              onClick={onNavigate}
              className="flex items-center gap-3 p-3 rounded-lg bg-white hover:bg-slate-50 border border-slate-200 transition-colors group shadow-sm hover:shadow-md"
            >
              <div className="w-8 h-8 rounded-full bg-white border border-slate-100 flex items-center justify-center overflow-hidden shrink-0 text-slate-500 group-hover:text-indigo-600 transition-colors">
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
              <div className="w-8 h-8 rounded-full bg-white border border-slate-100 flex items-center justify-center overflow-hidden shrink-0 text-slate-500 group-hover:text-indigo-600 transition-colors">
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
              <div className="w-8 h-8 rounded-full bg-white border border-slate-100 flex items-center justify-center overflow-hidden shrink-0 text-slate-500 group-hover:text-indigo-600 transition-colors">
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
              <div className="w-8 h-8 rounded-full bg-white border border-slate-100 flex items-center justify-center overflow-hidden shrink-0 text-slate-500 group-hover:text-indigo-600 transition-colors">
                <ArrowTrendingUpIcon className="w-5 h-5" />
              </div>
              <span className="text-sm font-bold text-slate-700 group-hover:text-slate-900">
                Trending Topics
              </span>
            </Link>

            <Link
              href="/hti-dashboard"
              onClick={onNavigate}
              className="flex items-center gap-3 p-3 rounded-lg bg-white hover:bg-slate-50 border border-slate-200 transition-colors group shadow-sm hover:shadow-md"
            >
              <div className="w-8 h-8 rounded-full bg-white border border-slate-100 flex items-center justify-center overflow-hidden shrink-0 text-slate-500 group-hover:text-indigo-600 transition-colors">
                <LightBulbIcon className="w-5 h-5" />
              </div>
              <span className="text-sm font-bold text-slate-700 group-hover:text-slate-900">
                Ideas Lab
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
