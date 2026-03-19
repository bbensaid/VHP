// frontend/components/HomeSidebar.tsx
"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
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

// Option D — each section is a card panel with a colored header band + divider rows

export default function HomeSidebar({ onNavigate }: HomeSidebarProps) {
  const pathname = usePathname();
  const [showBackToTop, setShowBackToTop] = useState(false);
  const topSentinelRef = useRef<HTMLDivElement>(null);

  // Returns true if the current page matches this nav item
  const isActive = (href: string) =>
    pathname === href || pathname.startsWith(href + "/");

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
        <div className="space-y-3">

          {/* ── Services (indigo) ──────────────────────────────────────── */}
          <div className="rounded-xl overflow-hidden border border-indigo-200 border-l-4 border-l-indigo-400 shadow-sm">
            <div className="bg-indigo-100 px-3 py-2 border-b border-indigo-200">
              <span className="text-[10px] font-black uppercase tracking-[0.15em] text-indigo-700">Services</span>
            </div>
            <div className="divide-y divide-indigo-100">
              <Link
                href="/academy"
                onClick={onNavigate}
                className={`flex items-center gap-3 px-3 py-3 transition-colors group ${isActive("/academy") ? "bg-indigo-50" : "bg-white hover:bg-indigo-50"}`}
              >
                <div className="w-8 h-8 rounded-full bg-indigo-50 border border-indigo-200 flex items-center justify-center overflow-hidden shrink-0 text-indigo-500 group-hover:text-indigo-700 transition-colors">
                  <AcademicCapIcon className="w-5 h-5" />
                </div>
                <span className="text-sm font-bold text-slate-700 group-hover:text-slate-900">
                  Academy
                </span>
              </Link>
              <Link
                href="/advisory-hub"
                onClick={onNavigate}
                className={`flex items-center gap-3 px-3 py-3 transition-colors group ${isActive("/advisory-hub") ? "bg-indigo-50" : "bg-white hover:bg-indigo-50"}`}
              >
                <div className="w-8 h-8 rounded-full bg-indigo-50 border border-indigo-200 flex items-center justify-center overflow-hidden shrink-0 text-indigo-500 group-hover:text-indigo-700 transition-colors">
                  <BriefcaseIcon className="w-5 h-5" />
                </div>
                <span className="text-sm font-bold text-slate-700 group-hover:text-slate-900">
                  Advisory
                </span>
              </Link>
            </div>
          </div>

          {/* ── Tools & Resources (amber) ─────────────────────────────── */}
          <div className="rounded-xl overflow-hidden border border-amber-200 border-l-4 border-l-amber-400 shadow-sm">
            <div className="bg-amber-100 px-3 py-2 border-b border-amber-200">
              <span className="text-[10px] font-black uppercase tracking-[0.15em] text-amber-700">Tools &amp; Resources</span>
            </div>
            <div className="divide-y divide-amber-100">
              <Link
                href="/research-lab"
                onClick={onNavigate}
                className={`flex items-center gap-3 px-3 py-3 transition-colors group ${isActive("/research-lab") ? "bg-amber-50" : "bg-white hover:bg-amber-50"}`}
              >
                <div className="w-8 h-8 rounded-full bg-amber-50 border border-amber-200 flex items-center justify-center overflow-hidden shrink-0 text-amber-500 group-hover:text-amber-700 transition-colors">
                  <LightBulbIcon className="w-5 h-5" />
                </div>
                <span className="text-sm font-bold text-slate-700 group-hover:text-slate-900">
                  Research Lab
                </span>
              </Link>
              <Link
                href="/multimedia"
                onClick={onNavigate}
                className={`flex items-center gap-3 px-3 py-3 transition-colors group ${isActive("/multimedia") ? "bg-amber-50" : "bg-white hover:bg-amber-50"}`}
              >
                <div className="w-8 h-8 rounded-full bg-amber-50 border border-amber-200 flex items-center justify-center overflow-hidden shrink-0 text-amber-500 group-hover:text-amber-700 transition-colors">
                  <FilmIcon className="w-5 h-5" />
                </div>
                <span className="text-sm font-bold text-slate-700 group-hover:text-slate-900">
                  Multimedia
                </span>
              </Link>
              <Link
                href="/trending-topics"
                onClick={onNavigate}
                className={`flex items-center gap-3 px-3 py-3 transition-colors group ${isActive("/trending-topics") ? "bg-amber-50" : "bg-white hover:bg-amber-50"}`}
              >
                <div className="w-8 h-8 rounded-full bg-amber-50 border border-amber-200 flex items-center justify-center overflow-hidden shrink-0 text-amber-500 group-hover:text-amber-700 transition-colors">
                  <ArrowTrendingUpIcon className="w-5 h-5" />
                </div>
                <span className="text-sm font-bold text-slate-700 group-hover:text-slate-900">
                  Trending Topics
                </span>
              </Link>
            </div>
          </div>

          {/* ── Federal Programs (emerald) ────────────────────────────── */}
          <div className="rounded-xl overflow-hidden border border-emerald-200 border-l-4 border-l-emerald-400 shadow-sm">
            <div className="bg-emerald-100 px-3 py-2 border-b border-emerald-200">
              <span className="text-[10px] font-black uppercase tracking-[0.15em] text-emerald-700">Federal Programs</span>
            </div>
            <div className="divide-y divide-emerald-100">
              <Link
                href="/dashboard"
                onClick={onNavigate}
                title="Explore the Rural Health Transformation program — 50-state coverage, global budgets, and CMS data"
                className={`flex items-center gap-3 px-3 py-3 transition-colors group ${isActive("/dashboard") ? "bg-emerald-50" : "bg-white hover:bg-emerald-50"}`}
              >
                <div className="w-8 h-8 rounded-full bg-emerald-50 border border-emerald-200 flex items-center justify-center overflow-hidden shrink-0">
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
                className={`flex items-center gap-3 px-3 py-3 transition-colors group ${isActive("/ahead-model") ? "bg-emerald-50" : "bg-white hover:bg-emerald-50"}`}
              >
                <div className="w-8 h-8 rounded-full bg-emerald-50 border border-emerald-200 flex items-center justify-center shrink-0 text-emerald-600 group-hover:text-emerald-700 transition-colors font-black text-[11px]">
                  AH
                </div>
                <span className="text-sm font-bold text-slate-700 group-hover:text-slate-900 leading-tight">
                  AHEAD Model
                </span>
              </Link>
            </div>
          </div>

          {/* ── State Initiatives (rose) ──────────────────────────────── */}
          <div className="rounded-xl overflow-hidden border border-rose-200 border-l-4 border-l-rose-400 shadow-sm">
            <div className="bg-rose-100 px-3 py-2 border-b border-rose-200">
              <span className="text-[10px] font-black uppercase tracking-[0.15em] text-rose-700">State Initiatives</span>
            </div>
            <div className="divide-y divide-rose-100">
              <Link
                href="/vermont-act-167"
                onClick={onNavigate}
                title="Vermont Act 167 — Hospital transformation, Oliver Wyman Report, and the future of Vermont healthcare"
                className={`flex items-center gap-3 px-3 py-3 transition-colors group ${isActive("/vermont-act-167") ? "bg-rose-50" : "bg-white hover:bg-rose-50"}`}
              >
                <div className="w-8 h-8 rounded-full bg-rose-50 border border-rose-200 flex items-center justify-center shrink-0 text-rose-500 group-hover:text-rose-700 transition-colors">
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
                className={`flex items-center gap-3 px-3 py-3 transition-colors group ${isActive("/california-calaim") ? "bg-rose-50" : "bg-white hover:bg-rose-50"}`}
              >
                <div className="w-8 h-8 rounded-full bg-rose-50 border border-rose-200 flex items-center justify-center shrink-0 text-rose-600 group-hover:text-rose-700 transition-colors font-black text-[11px]">
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
                className={`flex items-center gap-3 px-3 py-3 transition-colors group ${isActive("/states") ? "bg-rose-50" : "bg-white hover:bg-rose-50"}`}
              >
                <div className="w-8 h-8 rounded-full bg-rose-50 border border-rose-200 flex items-center justify-center shrink-0 text-rose-500 group-hover:text-rose-700 transition-colors">
                  <GlobeAmericasIcon className="w-4 h-4" />
                </div>
                <span className="text-sm font-bold text-slate-700 group-hover:text-slate-900 leading-tight">
                  Other States
                </span>
              </Link>
            </div>
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
