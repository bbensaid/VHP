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

  const isAcademyModule = pathname.startsWith("/academy/modules/") ||
                           pathname.startsWith("/academy/courses/");

  const hideSidebarsCompletely = isStudio || isChatPage;

  // STRICT SINGLE-SOURCE-OF-TRUTH STATE
  const [isLeftSidebarOpen, setLeftSidebarOpen] = useState(true);
  const [isRightSidebarOpen, setRightSidebarOpen] = useState(true);
  
  const [leftOpenSections, setLeftOpenSections] = useState<string[]>([]);
  const [rightOpenSections, setRightOpenSections] = useState<string[]>([]);
  const { isStripVisible, setStripVisible } = useTicker();
  const [clientTickerData, setClientTickerData] = useState<any>(null);

  // 2. REMOTE CONTROL HANDLER (Listen for Header events)
  useEffect(() => {
    const handleToggle = (e: any) => {
      if (e.detail.side === 'left') {
        setLeftSidebarOpen(prev => !prev);
      }
      if (e.detail.side === 'right') {
        setRightSidebarOpen(prev => !prev);
      }
    };
    window.addEventListener('sidebar-toggle', handleToggle);
    return () => window.removeEventListener('sidebar-toggle', handleToggle);
  }, []);

  // 3. AUTO-COLLAPSE ON NAVIGATION
  useEffect(() => {
    if (hideSidebarsCompletely || isArticle || isAcademyModule) {
      setLeftSidebarOpen(false);
      setRightSidebarOpen(false);
    } else if (isHomepage) {
      setLeftSidebarOpen(true);
      setRightSidebarOpen(true);
    }
  }, [pathname, hideSidebarsCompletely, isArticle, isAcademyModule, isHomepage]);

  // 4. WINDOW RESIZE HANDLER
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1024) {
        setLeftSidebarOpen(false);
      }
      if (window.innerWidth < 1280) {
        setRightSidebarOpen(false);
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
  const showTicker = hasTickerData && !isStudio;
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
          <div className="w-full px-4 h-full pointer-events-auto">
            <div className="h-full flex items-center w-full">
              {/* LEFT COLUMN: Breadcrumbs (Fixed 500px to match Header) */}
              <div className="flex-shrink-0 flex items-center h-full w-[500px]">
                {showBreadcrumbs && <Breadcrumbs />}
              </div>

              {showTicker && (
                <>
                <div className={`hidden lg:flex flex-1 items-center h-full min-w-0 pr-12`}>
                  <div className="flex items-center w-full h-full">
                    <div className="flex-1 min-w-0 h-full">
                      <TickerStrip 
                        tickerData={activeTickerData} 
                        transparent={true} 
                        isVisible={isStripVisible}
                        onToggle={() => setStripVisible(!isStripVisible)}
                      />
                    </div>
                  </div>
                </div>
                {/* RIGHT SPACER: Matches Header's Right Section (Company Dropdown area) */}
                <div className="hidden lg:block w-[350px] flex-shrink-0" />
                </>
              )}
            </div>
          </div>
        </div>
      )}

      {/* 2. Main Content Area */}
      <div className="flex flex-col lg:flex-row mt-8 w-full px-4 transition-all relative">
        <CollapsibleSidebar
          side="left"
          isOpen={isLeftSidebarOpen}
          setIsOpen={setLeftSidebarOpen}
          stickyTop={sidebarTop}
          expandLabel="Display Sidebar"
        >
          <HomeSidebar
            openSections={leftOpenSections}
            onToggleSection={toggleLeftSection}
            onNavigate={handleSidebarLinkClick}
          />
        </CollapsibleSidebar>

        {/* Tighter margins applied here to expand the middle container's room */}
        <main
          className={`flex-1 min-w-0 transition-all duration-300 ${isLeftSidebarOpen ? "lg:ml-4" : "ml-0"} ${isRightSidebarOpen ? "lg:mr-4" : "mr-0"}`}
          style={{ "--sidebar-top": sidebarTop } as React.CSSProperties}
        >
          {children}
        </main>

        <CollapsibleSidebar
          side="right"
          isOpen={isRightSidebarOpen}
          setIsOpen={setRightSidebarOpen}
          stickyTop={sidebarTop}
          expandLabel="Display Sidebar"
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