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
  const pathname = usePathname() || "";
  
  // 1. ROUTE LOGIC DETERMINATION
  const isHomepage = pathname === "/";
  const isStudio = pathname.startsWith("/studio");
  const isChatPage = pathname === "/chat";
  const isArticle = pathname.startsWith("/articles") || 
                    pathname.includes("/policy/") || 
                    pathname.includes("/economics/") || 
                    pathname.includes("/technology/");

  const hideSidebarsCompletely = isStudio || isChatPage;

  const [isLeftSidebarOpen, setLeftSidebarOpen] = useState(true);
  const [isRightSidebarOpen, setRightSidebarOpen] = useState(true);
  const [isLeftSidebarPinned, setLeftSidebarPinned] = useState(true);
  const [isRightSidebarPinned, setRightSidebarPinned] = useState(true);
  
  const [leftOpenSections, setLeftOpenSections] = useState<string[]>([]);
  const [rightOpenSections, setRightOpenSections] = useState<string[]>([]);
  const { isStripVisible, setStripVisible } = useTicker();
  const [clientTickerData, setClientTickerData] = useState<any>(null);

  // 2. REMOTE CONTROL HANDLER (Listen for Header events)
  useEffect(() => {
    const handleToggle = (e: any) => {
      if (e.detail.side === 'left') {
        setLeftSidebarOpen(prev => !prev);
        setLeftSidebarPinned(prev => !prev);
      }
      if (e.detail.side === 'right') {
        setRightSidebarOpen(prev => !prev);
        setRightSidebarPinned(prev => !prev);
      }
    };
    window.addEventListener('sidebar-toggle', handleToggle);
    return () => window.removeEventListener('sidebar-toggle', handleToggle);
  }, []);

  // 3. AUTO-COLLAPSE ON NAVIGATION
  useEffect(() => {
    if (hideSidebarsCompletely || isArticle) {
      setLeftSidebarOpen(false);
      setLeftSidebarPinned(false);
      setRightSidebarOpen(false);
      setRightSidebarPinned(false);
    } else if (isHomepage) {
      setLeftSidebarOpen(true);
      setLeftSidebarPinned(true);
      setRightSidebarOpen(true);
      setRightSidebarPinned(true);
    }
  }, [pathname, hideSidebarsCompletely, isArticle, isHomepage]);

  // 4. WINDOW RESIZE HANDLER
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1024) {
        setLeftSidebarOpen(false);
        setLeftSidebarPinned(false);
      }
      if (window.innerWidth < 1280) {
        setRightSidebarOpen(false);
        setRightSidebarPinned(false);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // 5. TICKER DATA FETCHING
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
      prev.includes(section) ? prev.filter((s) => s !== section) : [...prev, section],
    );
  };

  const toggleRightSection = (section: string) => {
    setRightOpenSections((prev) =>
      prev.includes(section) ? prev.filter((s) => s !== section) : [...prev, section],
    );
  };

  const showBreadcrumbs = !isStudio; 
  const hasTickerData = !!activeTickerData;
  const showTicker = hasTickerData && isStripVisible && !isStudio;
  const showRestore = hasTickerData && !isStripVisible && !isStudio;
  const isStickyBarVisible = showBreadcrumbs || showTicker;
  const sidebarTop = isStickyBarVisible ? "9rem" : "7rem";

  const handleSidebarLinkClick = () => {
    if (window.innerWidth < 1024) {
      setLeftSidebarOpen(false);
    }
  };

  if (hideSidebarsCompletely) {
    return <div className="min-h-screen bg-white">{children}</div>;
  }

  return (
    <div className="min-h-screen bg-white">
      {/* 1. Sticky Navigation Bar */}
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
                    <TickerStrip tickerData={activeTickerData} transparent={true} />
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
        <CollapsibleSidebar
          side="left"
          isOpen={isLeftSidebarOpen}
          setIsOpen={setLeftSidebarOpen}
          isPinned={isLeftSidebarPinned}
          setIsPinned={setLeftSidebarPinned}
          stickyTop={sidebarTop}
          expandLabel="Display Sidebar"
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

        <main className={`flex-1 min-w-0 transition-all duration-300 ${isLeftSidebarOpen ? "lg:ml-8" : "ml-0"} ${isRightSidebarOpen ? "lg:mr-8" : "mr-0"}`}>
          {children}
        </main>

        <CollapsibleSidebar
          side="right"
          isOpen={isRightSidebarOpen}
          setIsOpen={setRightSidebarOpen}
          isPinned={isRightSidebarPinned}
          setIsPinned={setRightSidebarPinned}
          stickyTop={sidebarTop}
          expandLabel="Vitals"
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