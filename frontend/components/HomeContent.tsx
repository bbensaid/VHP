"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import HomeSidebar, {
  ALL_SECTIONS as HOME_SECTIONS,
} from "@/components/HomeSidebar";
import RightSidebar, {
  ALL_SECTIONS as RIGHT_SECTIONS,
} from "@/components/RightSidebar";
import CollapsibleSidebar from "@/components/CollapsibleSidebar";
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
  const [isRightSidebarOpen, setIsRightSidebarOpen] = useState(true);
  const [leftOpenSections, setLeftOpenSections] = useState<string[]>([]);
  const [rightOpenSections, setRightOpenSections] = useState<string[]>([
    "Multimedia",
  ]);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1024) {
        setIsSidebarOpen(false);
      }
      if (window.innerWidth < 1280) {
        setIsRightSidebarOpen(false);
      }
    };
    handleResize(); // Check on mount
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleLeftSection = (section: string) => {
    setLeftOpenSections((prev) =>
      prev.includes(section)
        ? prev.filter((s) => s !== section)
        : [...prev, section]
    );
  };

  const toggleRightSection = (section: string) => {
    setRightOpenSections((prev) =>
      prev.includes(section)
        ? prev.filter((s) => s !== section)
        : [...prev, section]
    );
  };

  return (
    <div className="min-h-screen bg-white">
      {/* 1. TickerStrip */}
      <TickerStrip tickerData={ticker} />

      {/* 2. Main Content */}
      <div className="flex flex-col lg:flex-row mt-8 px-4 md:px-0 container mx-auto transition-all relative">
        {/* EXPAND BUTTON (Sticky, Floating outside sidebar) */}
        <div
          className={`sticky top-24 z-50 w-0 h-10 ${isSidebarOpen ? "hidden" : "block"}`}
        >
          <button
            onClick={() => setIsSidebarOpen(true)}
            className={`absolute -left-24 top-0 p-2 bg-white border border-slate-200 rounded-lg shadow-sm text-slate-500 hover:text-slate-900 transition-all duration-500 flex flex-row items-center gap-2 ${isScrolled ? "opacity-30 hover:opacity-100" : "opacity-100 animate-pulse hover:animate-none"}`}
            title="Expand Sidebar"
          >
            <ChevronRightIcon className="w-4 h-4" />
            <span className="text-[10px] font-bold uppercase tracking-wider">
              Expand
            </span>
          </button>
        </div>

        {/* Sidebar */}
        <div
          className={`
            bg-white transition-all duration-300 ease-in-out overflow-hidden flex-shrink-0 z-40 rounded-xl border border-slate-200 sticky top-24 max-h-[calc(100vh-6rem)] flex flex-col
            ${isSidebarOpen ? "w-80 shadow-[4px_0_24px_rgba(0,0,0,0.02)] opacity-100" : "w-0 border-none opacity-0"}
          `}
        >
          {/* SIDEBAR HEADER (Expand/Collapse + Hide) */}
          <div className="flex-shrink-0 p-2 sticky top-0 bg-white z-50 flex justify-between items-center border-b border-slate-100">
            <div className="flex gap-2">
        {/* LEFT SIDEBAR */}
        <CollapsibleSidebar
          side="left"
          isOpen={isSidebarOpen}
          setIsOpen={setIsSidebarOpen}
          headerContent={
            <>
              {leftOpenSections.length < HOME_SECTIONS.length && (
                <button
                  onClick={() => setLeftOpenSections(HOME_SECTIONS)}
                  className="text-[10px] font-bold text-slate-400 hover:text-indigo-600 uppercase tracking-wider transition-colors"
                >
                  Expand All
                </button>
              )}
              {leftOpenSections.length > 0 && (
                <button
                  onClick={() => setLeftOpenSections([])}
                  className="text-[10px] font-bold text-slate-400 hover:text-indigo-600 uppercase tracking-wider transition-colors"
                >
                  Collapse All
                </button>
              )}
            </div>
            <button
              onClick={() => setIsSidebarOpen(false)}
              className="p-2 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors flex items-center gap-2"
              title="Collapse Sidebar"
            >
              <span className="text-[10px] font-bold uppercase tracking-wider">
                Hide
              </span>
              <ChevronLeftIcon className="w-4 h-4" />
            </button>
          </div>
            </>
          }
        >
          <HomeSidebar
            openSections={leftOpenSections}
            onToggleSection={toggleLeftSection}
          />
        </CollapsibleSidebar>

          <div className="w-80 flex-1 overflow-y-auto p-6 pt-4 [direction:rtl] [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:bg-slate-300 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-slate-50">
            <div className="[direction:ltr]">
              <HomeSidebar
                openSections={leftOpenSections}
                onToggleSection={toggleLeftSection}
              />
            </div>
          </div>
          {/* Scroll Fade Overlay */}
          <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-white to-transparent pointer-events-none z-10" />
        </div>

        {/* Intelligence Feed */}
        <div
          className={`flex-1 min-w-0 transition-all duration-300 ${isSidebarOpen ? "pl-8" : "pl-0"} ${isRightSidebarOpen ? "pr-8" : "pr-0"}`}
        >
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

        {/* Right Sidebar (Intelligence Rail) */}
        <div
          className={`
            bg-white transition-all duration-300 ease-in-out overflow-hidden flex-shrink-0 z-40 rounded-xl border border-slate-200 sticky top-24 max-h-[calc(100vh-6rem)] flex flex-col
            ${isRightSidebarOpen ? "w-80 shadow-[4px_0_24px_rgba(0,0,0,0.02)] opacity-100" : "w-0 border-none opacity-0"}
          `}
        >
          {/* RIGHT SIDEBAR HEADER */}
          <div className="flex-shrink-0 p-2 sticky top-0 bg-white z-50 flex justify-between items-center border-b border-slate-100 flex-row-reverse">
            <div className="flex gap-2">
        {/* RIGHT SIDEBAR */}
        <CollapsibleSidebar
          side="right"
          isOpen={isRightSidebarOpen}
          setIsOpen={setIsRightSidebarOpen}
          expandLabel="Expand Intelligence Rail"
          headerContent={
            <>
              {rightOpenSections.length < RIGHT_SECTIONS.length && (
                <button
                  onClick={() => setRightOpenSections(RIGHT_SECTIONS)}
                  className="text-[10px] font-bold text-slate-400 hover:text-indigo-600 uppercase tracking-wider transition-colors"
                >
                  Expand All
                </button>
              )}
              {rightOpenSections.length > 0 && (
                <button
                  onClick={() => setRightOpenSections([])}
                  className="text-[10px] font-bold text-slate-400 hover:text-indigo-600 uppercase tracking-wider transition-colors"
                >
                  Collapse All
                </button>
              )}
            </div>
            <button
              onClick={() => setIsRightSidebarOpen(false)}
              className="p-2 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors flex items-center gap-2"
              title="Collapse Intelligence Rail"
            >
              <ChevronRightIcon className="w-4 h-4" />
              <span className="text-[10px] font-bold uppercase tracking-wider">
                Hide
              </span>
            </button>
          </div>

          <div className="w-80 flex-1 overflow-y-auto p-6 pt-4 [direction:ltr] [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:bg-slate-300 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-slate-50">
            <RightSidebar
              openSections={rightOpenSections}
              onToggleSection={toggleRightSection}
            />
          </div>
        </div>

        {/* RIGHT EXPAND BUTTON */}
        <div
          className={`sticky top-24 z-50 w-0 h-10 ${isRightSidebarOpen ? "hidden" : "block"}`}
            </>
          }
        >
          <button
            onClick={() => setIsRightSidebarOpen(true)}
            className={`absolute -right-24 top-0 p-2 bg-white border border-slate-200 rounded-lg shadow-sm text-slate-500 hover:text-slate-900 transition-all duration-500 flex flex-row items-center gap-2 ${isScrolled ? "opacity-30 hover:opacity-100" : "opacity-100 animate-pulse hover:animate-none"}`}
            title="Expand Intelligence Rail"
          >
            <span className="text-[10px] font-bold uppercase tracking-wider">
              Expand
            </span>
            <ChevronLeftIcon className="w-4 h-4" />
          </button>
        </div>
          <RightSidebar
            openSections={rightOpenSections}
            onToggleSection={toggleRightSection}
          />
        </CollapsibleSidebar>
      </div>
    </div>
  );
}
