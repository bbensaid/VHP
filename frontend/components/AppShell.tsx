"use client";

import React, { useEffect, Suspense } from "react";
import dynamic from "next/dynamic";
import { usePathname } from "next/navigation";
import HomeSidebar from "@/components/HomeSidebar";
const RightSidebar = dynamic(() => import("@/components/RightSidebar"), { ssr: false });
import CollapsibleSidebar from "@/components/CollapsibleSidebar";
import TickerStrip from "@/components/TickerStrip";
import { useTicker } from "@/components/TickerContext";
import { useSidebar } from "@/components/SidebarContext";
import Breadcrumbs from "@/components/Breadcrumbs";
import Footer from "@/components/Footer";
import BottomNav from "@/components/BottomNav";
import { SparklesIcon } from "@heroicons/react/24/outline";

// Named breakpoints matching Tailwind's lg / xl thresholds
const BREAKPOINT_LG = 1024;
const BREAKPOINT_XL = 1280;

interface AppShellProps {
  children: React.ReactNode;
  tickerData?: unknown;
}

export default function AppShell({ children, tickerData }: AppShellProps) {
  const pathname = usePathname() || "";

  // 1. ROUTE LOGIC
  const isStudio = pathname.startsWith("/studio");
  const isChatPage = pathname === "/chat";
  const isWelcomePage = pathname === "/welcome";
  // The course PLAYER (fixed, non-scrolling shell) is only the lesson route:
  // /academy/tracks/[courseSlug]/[lessonSlug] — i.e. 4 path segments.
  // The course OVERVIEW (/academy/tracks/[courseSlug], 3 segments) should scroll
  // like a normal page, just like the catalog at /academy/tracks.
  const isCoursePage =
    pathname.startsWith("/academy/tracks/") &&
    pathname.split("/").filter(Boolean).length >= 4;
  const hideSidebarsCompletely = isStudio || isChatPage || isWelcomePage;

  // 2. SIDEBAR STATE from Context (shared with Header)
  const { isLeftOpen, isRightOpen, setLeftOpen, setRightOpen } = useSidebar();

  const { isStripVisible, setStripVisible } = useTicker();

  // 3. AUTO-COLLAPSE — studio/chat hide sidebars entirely; course pages collapse them by default.
  //    Catalog page (/academy/tracks exactly) always forces left sidebar open.
  useEffect(() => {
    if (hideSidebarsCompletely || isCoursePage) {
      setLeftOpen(false);
      setRightOpen(false);
    } else if (pathname === "/academy/tracks") {
      if (typeof window !== "undefined" && window.innerWidth >= BREAKPOINT_LG) {
        setLeftOpen(true);
      }
    }
  }, [pathname, hideSidebarsCompletely, isCoursePage, setLeftOpen, setRightOpen]);

  // 4. WINDOW RESIZE HANDLER — only fires on actual resize, not on mount.
  //    User controls initial state; sidebars start open per SidebarContext defaults.
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < BREAKPOINT_LG) setLeftOpen(false);
      if (window.innerWidth < BREAKPOINT_XL) setRightOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [setLeftOpen, setRightOpen]);

  const activeTickerData = tickerData;

  const showBreadcrumbs = !isStudio && !isCoursePage;
  const showTicker = !!activeTickerData && !isStudio;
  const isStickyBarVisible = showBreadcrumbs || showTicker;
  const sidebarTop = isStickyBarVisible ? "2.5rem" : "0rem"; // 2.5rem = --sticky-bar-height

  if (hideSidebarsCompletely) {
    return (
      <div className="flex-1 min-h-0 overflow-hidden flex flex-col [&>main]:flex-1 [&>main]:min-h-0 [&>main]:flex [&>main]:flex-col">
        {children}
      </div>
    );
  }

  return (
    <div className={`bg-white dark:bg-slate-900 flex flex-col ${isCoursePage ? "h-full overflow-hidden" : "flex-1 overflow-y-auto"}`}>
      {/* 1. Sticky Navigation Bar */}
      {isStickyBarVisible && (
        <div className="sticky top-0 z-(--z-sticky) h-10 flex justify-center transition-all duration-300 pointer-events-none bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-700 shadow-[0_4px_8px_-2px_rgba(0,0,0,0.12)]">
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
      <div className={`flex flex-col lg:flex-row w-full transition-all relative z-0 ${isCoursePage ? "flex-1 min-h-0 overflow-hidden" : "mt-3 md:mt-4 px-3 md:px-4 pb-20 md:pb-0"}`}>
        <CollapsibleSidebar
          side="left"
          isOpen={isLeftOpen}
          setIsOpen={setLeftOpen}
          stickyTop={sidebarTop}
          expandLabel="Navigation"
        >
          <HomeSidebar onNavigate={() => { if (window.innerWidth < BREAKPOINT_LG) setLeftOpen(false); }} />
        </CollapsibleSidebar>

        <main
          className={`flex-1 min-w-0 transition-all duration-300 ${isCoursePage ? "min-h-0 flex flex-col" : "min-h-screen"} ${isLeftOpen ? "lg:ml-4" : isCoursePage ? "" : "lg:pl-6"} ${isRightOpen ? "lg:mr-4" : isCoursePage ? "" : "lg:pr-6"}`}
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
          <Suspense fallback={null}>
            <RightSidebar />
          </Suspense>
        </CollapsibleSidebar>
      </div>

      {/* 3. Floating "Ask AI" button — hidden on course pages (button lives in course top bar instead) */}
      {!isRightOpen && !isCoursePage && (
        <button
          onClick={() => setRightOpen(true)}
          className="hidden md:flex fixed bottom-6 right-6 z-9999 items-center gap-2 bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 text-white px-4 py-2.5 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 text-sm font-bold"
          aria-label="Open AI Analyst"
        >
          <SparklesIcon className="w-4 h-4" />
          Ask AI
        </button>
      )}

      {/* 4. Bottom navigation — mobile only */}
      <BottomNav />

      {!isCoursePage && <Footer />}
    </div>
  );
}
