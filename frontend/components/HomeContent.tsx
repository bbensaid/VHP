"use client";

import React, { useState } from "react";
import Link from "next/link";
import HomeSidebar from "@/components/HomeSidebar";
import TickerStrip from "@/components/TickerStrip";
import HeroCarousel from "@/components/HeroCarousel";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";

interface HomeContentProps {
  leadStory: any;
  feed: any;
  ticker: any;
}

const getCategoryStyle = (type: string, pillar: string) => {
  if (type === "webinar") return "text-rose-700 bg-rose-50 border-rose-200";
  switch (pillar) {
    case "Policy":
      return "text-orange-700 bg-orange-50 border-orange-200";
    case "Economics":
      return "text-emerald-700 bg-emerald-50 border-emerald-200";
    case "Technology":
      return "text-indigo-700 bg-indigo-50 border-indigo-200";
    default:
      return "text-slate-700 bg-slate-50 border-slate-200";
  }
};

const getCategoryLabel = (type: string, pillar: string) => {
  if (type === "webinar") return "EVENT";
  return pillar ? pillar.toUpperCase() : "NEWS";
};

export default function HomeContent({
  leadStory,
  feed,
  ticker,
}: HomeContentProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <div className="min-h-screen bg-white">
      {/* 1. TickerStrip */}
      <TickerStrip tickerData={ticker} />

      {/* 2. Main Content */}
      <div className="flex flex-col lg:flex-row gap-8 mt-8 px-4 md:px-0 container mx-auto transition-all">
        {/* Sidebar */}
        <div
          className={`
            bg-white transition-all duration-300 ease-in-out overflow-hidden flex-shrink-0 z-40 rounded-xl border border-slate-200
            ${isSidebarOpen ? "w-80 shadow-[4px_0_24px_rgba(0,0,0,0.02)] ml-0" : "w-0 border-none"}
          `}
        >
          <div className="w-full h-full overflow-y-auto p-6 [&::-webkit-scrollbar]:hidden [scrollbar-width:none]">
            <HomeSidebar />
          </div>
          {/* Scroll Fade Overlay */}
          <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-white to-transparent pointer-events-none z-10" />
        </div>

        {/* Intelligence Feed */}
        <div className="flex-1 min-w-0">
          {/* Toggle Button */}
          <div className="mb-4">
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="p-2 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors flex-shrink-0"
              title={isSidebarOpen ? "Collapse Sidebar" : "Expand Sidebar"}
            >
              {isSidebarOpen ? (
                <ChevronLeftIcon className="w-6 h-6" />
              ) : (
                <ChevronRightIcon className="w-6 h-6" />
              )}
            </button>
          </div>

          {/* HERO CAROUSEL */}
          <HeroCarousel leadStory={leadStory} />

          {/* THE WIRE */}
          <div>
            <div className="flex items-center justify-between mb-6 border-b border-slate-200 pb-2">
              <h2 className="text-xl font-black text-slate-900 uppercase tracking-tight">
                The Wire{" "}
                <span className="text-slate-400 font-normal normal-case ml-2 text-base">
                  Real-time Intelligence
                </span>
              </h2>
              <Link
                href="/advisory/reports"
                className="text-xs font-bold text-slate-500 hover:text-indigo-600"
              >
                View All
              </Link>
            </div>
            <div className="space-y-4">
              {feed?.map((item: any, index: number) => (
                <div
                  key={index}
                  className="flex flex-col md:flex-row md:items-center gap-3 md:gap-6 py-4 border-b border-slate-100 hover:bg-slate-50 transition-colors p-2 rounded -mx-2 group"
                >
                  <div className="flex items-center gap-3 w-40 flex-shrink-0">
                    <span
                      className={`text-[10px] font-black px-2 py-1 rounded w-16 text-center border ${getCategoryStyle(item._type, item.pillar)}`}
                    >
                      {getCategoryLabel(item._type, item.pillar)}
                    </span>
                  </div>
                  <div className="flex-grow">
                    <Link
                      href={
                        item._type === "webinar"
                          ? `/education/webinars/${item.slug}`
                          : item._type === "course"
                            ? `/education/courses/${item.slug}`
                            : `/advisory/reports`
                      }
                      className="text-base font-bold text-slate-800 leading-snug hover:text-indigo-600"
                    >
                      {item.title}
                    </Link>
                  </div>
                </div>
              ))}
            </div>
            <button className="w-full mt-8 py-3 border border-slate-200 text-slate-500 font-bold text-sm rounded hover:bg-slate-50 hover:text-slate-900 transition-colors">
              Load More Intelligence
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
