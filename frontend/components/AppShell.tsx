"use client";

import React, { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import HomeSidebar, {
  ALL_SECTIONS as HOME_SECTIONS,
} from "@/components/HomeSidebar";
import RightSidebar, {
  ALL_SECTIONS as RIGHT_SECTIONS,
} from "@/components/RightSidebar";
import CollapsibleSidebar from "@/components/CollapsibleSidebar";
import TickerStrip from "@/components/TickerStrip";
import { XMarkIcon, ArrowPathIcon } from "@heroicons/react/24/outline";
import { useTicker } from "@/components/TickerContext";
import Breadcrumbs from "@/components/Breadcrumbs";

interface AppShellProps {
  children: React.ReactNode;
  tickerData?: any;
}

export default function AppShell({ children, tickerData }: AppShellProps) {
  const pathname = usePathname();
  const isHomepage = pathname === "/";
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isRightSidebarOpen, setIsRightSidebarOpen] = useState(true);
  const [leftOpenSections, setLeftOpenSections] = useState<string[]>([]);
  const [rightOpenSections, setRightOpenSections] = useState<string[]>([]);
  const { isStripVisible, setStripVisible } = useTicker();
  const [clientTickerData, setClientTickerData] = useState<any>(null);

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

  // Fallback: Fetch ticker data client-side if not provided prop-side
  useEffect(() => {
    if (!tickerData && !clientTickerData) {
      fetch("/api/ticker")
        .then((res) => res.json())
        .then((data) => setClientTickerData(data))
        .catch((err) => console.error("Failed to load ticker", err));
    }
  }, [tickerData, clientTickerData]);

  const activeTickerData = tickerData || clientTickerData;

  const toggleLeftSection = (section: string) => {
    setLeftOpenSections((prev) =>
      prev.includes(section)
        ? prev.filter((s) => s !== section)
        : [...prev, section],
    );
  };

  const toggleRightSection = (section: string) => {
    setRightOpenSections((prev) =>
      prev.includes(section)
        ? prev.filter((s) => s !== section)
        : [...prev, section],
    );
  };

  const showBreadcrumbs = true; // Always show breadcrumbs (Home is now visible)
  const hasTickerData = !!activeTickerData;
  const showTicker = hasTickerData && isStripVisible;
  const showRestore = hasTickerData && !isStripVisible;
  const isStickyBarVisible = showBreadcrumbs || showTicker;
  const sidebarTop = isStickyBarVisible ? "9rem" : "7rem"; // Header (7rem) + Bar (2rem)

  const handleSidebarLinkClick = () => {
    if (window.innerWidth < 1024) {
      setIsSidebarOpen(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* 1. Sticky Navigation Bar (Breadcrumbs + Ticker) */}
      {isStickyBarVisible && (
        <div className="sticky top-28 z-40 h-8 flex justify-center transition-all duration-300 pointer-events-none">
          <div className="container mx-auto px-4 md:px-0 h-full pointer-events-auto">
            <div className="h-full flex items-center w-full">
              {showBreadcrumbs && (
                <div className="flex-shrink-0 flex items-center h-full min-w-[260px]">
                  <Breadcrumbs />
                </div>
              )}

              {showTicker && (
                <div className="flex-1 flex items-center h-full min-w-0 ml-24">
                  <div className="flex-1 min-w-0 h-full">
                    <TickerStrip
                      tickerData={activeTickerData}
                      transparent={true}
                    />
                  </div>
                  <button
                    onClick={() => setStripVisible(false)}
                    className="h-6 w-6 flex items-center justify-center text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer ml-2 rounded-full border border-slate-200"
                    title="Dismiss Ticker"
                  >
                    <XMarkIcon className="w-3 h-3" />
                  </button>
                </div>
              )}

              {showRestore && (
                <button
                  onClick={() => setStripVisible(true)}
                  className="ml-auto flex items-center gap-2 text-[10px] font-bold text-slate-500 hover:text-indigo-600 uppercase tracking-wider transition-colors bg-white/90 backdrop-blur px-3 py-1 rounded-full border border-slate-200 shadow-sm"
                >
                  <ArrowPathIcon className="w-3 h-3" /> Restore Vitals
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* 2. Main Content Area */}
      <div className="flex flex-col lg:flex-row mt-8 px-4 md:px-0 container mx-auto transition-all relative">
        {/* LEFT SIDEBAR */}
        <CollapsibleSidebar
          side="left"
          isOpen={isSidebarOpen}
          setIsOpen={setIsSidebarOpen}
          stickyTop={sidebarTop}
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
            </>
          }
        >
          <HomeSidebar
            openSections={leftOpenSections}
            onToggleSection={toggleLeftSection}
            onNavigate={handleSidebarLinkClick}
            onCollapseAll={() => setLeftOpenSections([])}
          />
        </CollapsibleSidebar>

        {/* CENTER CONTENT */}
        <div
          className={`flex-1 min-w-0 transition-all duration-300 ${isSidebarOpen ? "pl-8" : "pl-0"} ${isRightSidebarOpen ? "pr-8" : "pr-0"}`}
        >
          {children}
        </div>

        {/* RIGHT SIDEBAR */}
        <CollapsibleSidebar
          side="right"
          isOpen={isRightSidebarOpen}
          setIsOpen={setIsRightSidebarOpen}
          stickyTop={sidebarTop}
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
            </>
          }
        >
          <RightSidebar
            openSections={rightOpenSections}
            onToggleSection={toggleRightSection}
          />
        </CollapsibleSidebar>
      </div>
    </div>
  );
}
