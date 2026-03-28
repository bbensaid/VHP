"use client";

import React, { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import HomeSidebar from "@/components/HomeSidebar";
import RightSidebar from "@/components/RightSidebar";
import CollapsibleSidebar from "@/components/CollapsibleSidebar";
import TickerStrip from "@/components/TickerStrip";
import { useTicker } from "@/components/TickerContext";
import { useSidebar } from "@/components/SidebarContext";
import Breadcrumbs from "@/components/Breadcrumbs";
import Footer from "@/components/Footer";
import { SparklesIcon } from "@heroicons/react/24/outline";

interface AppShellProps {
  children: React.ReactNode;
  tickerData?: unknown;
}

export default function AppShell({ children, tickerData }: AppShellProps) {
  const pathname = usePathname() || "";

  // 1. ROUTE LOGIC
  const isStudio = pathname.startsWith("/studio");
  const isChatPage = pathname === "/chat";
  const hideSidebarsCompletely = isStudio || isChatPage;

  // 2. SIDEBAR STATE from Context (shared with Header)
  const { isLeftOpen, isRightOpen, setLeftOpen, setRightOpen } = useSidebar();

  const { isStripVisible, setStripVisible } = useTicker();
  const [clientTickerData, setClientTickerData] = useState<unknown>(null);

  // 3. AUTO-COLLAPSE — only for pages that need full width (studio, chat)
  //    All other pages: sidebar persists in whatever state the user set it.
  useEffect(() => {
    if (hideSidebarsCompletely) {
      setLeftOpen(false);
      setRightOpen(false);
    }
  }, [pathname, hideSidebarsCompletely, setLeftOpen, setRightOpen]);

  // 4. WINDOW RESIZE HANDLER
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1024) setLeftOpen(false);
      if (window.innerWidth < 1280) setRightOpen(false);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [setLeftOpen, setRightOpen]);

  // 5. TICKER DATA FETCHING (fallback if SSR data not passed)
  useEffect(() => {
    if (!tickerData && !clientTickerData) {
      fetch("/api/ticker")
        .then((res) => res.json())
        .then((data) => setClientTickerData(data))
        .catch((err) => console.error("Failed to load ticker", err));
    }
  }, [tickerData, clientTickerData]);

  const activeTickerData = tickerData || clientTickerData;

  const showBreadcrumbs = !isStudio;
  const showTicker = !!activeTickerData && !isStudio;
  const isStickyBarVisible = showBreadcrumbs || showTicker;
  const sidebarTop = isStickyBarVisible ? "2.5rem" : "0rem";

  const handleSidebarLinkClick = () => {
    if (window.innerWidth < 1024) setLeftOpen(false);
  };

  if (hideSidebarsCompletely) {
    return <div className="flex-1 min-h-0 overflow-hidden flex flex-col">{children}</div>;
  }

  return (
    <div className="flex-1 min-h-0 overflow-y-auto flex flex-col bg-white">
      {/* 1. Sticky Navigation Bar */}
      {isStickyBarVisible && (
        <div className="sticky top-0 z-30 h-10 flex justify-center transition-all duration-300 pointer-events-none bg-white border-b border-slate-200 shadow-[0_4px_8px_-2px_rgba(0,0,0,0.12)]">
          <div className="w-full px-4 h-full pointer-events-auto">
            <div className="h-full flex items-center w-full">
              <div className="shrink-0 flex items-center h-full w-85">
                {showBreadcrumbs && <Breadcrumbs />}
              </div>

              {showTicker && (
                <>
                  <div className="hidden lg:flex flex-1 items-center h-full min-w-0 pr-12">
                    <div className="flex items-center w-full h-full">
                      <div className="flex-1 min-w-0 h-full">
                        <TickerStrip
                          tickerData={activeTickerData as never}
                          transparent={true}
                          isVisible={isStripVisible}
                          onToggle={() => setStripVisible(!isStripVisible)}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="hidden lg:block w-87.5 shrink-0" />
                </>
              )}
            </div>
          </div>
        </div>
      )}

      {/* 2. Main Content Area */}
      <div className="flex flex-col lg:flex-row mt-4 w-full px-4 transition-all relative z-0">
        <CollapsibleSidebar
          side="left"
          isOpen={isLeftOpen}
          setIsOpen={setLeftOpen}
          stickyTop={sidebarTop}
          expandLabel="Navigation"
        >
          <HomeSidebar onNavigate={handleSidebarLinkClick} />
        </CollapsibleSidebar>

        <main
          className={`flex-1 min-w-0 transition-all duration-300 ${isLeftOpen ? "lg:ml-4" : "ml-0"} ${isRightOpen ? "lg:mr-4" : "mr-0"}`}
          style={{ "--sidebar-top": sidebarTop } as React.CSSProperties}
        >
          {children}
        </main>

        <CollapsibleSidebar
          side="right"
          isOpen={isRightOpen}
          setIsOpen={setRightOpen}
          stickyTop={sidebarTop}
          expandLabel="AI Analyst"
          fillHeight={true}
        >
          <RightSidebar />
        </CollapsibleSidebar>
      </div>

      {/* 3. Floating "Ask AI" button — visible on desktop when right sidebar is closed */}
      {!isRightOpen && (
        <button
          onClick={() => setRightOpen(true)}
          className="flex fixed bottom-6 right-4 lg:right-6 z-40 items-center gap-2 bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 text-white px-4 py-2.5 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 text-sm font-bold"
          aria-label="Open AI Analyst"
        >
          <SparklesIcon className="w-4 h-4" />
          Ask AI
        </button>
      )}

      <Footer />
    </div>
  );
}
