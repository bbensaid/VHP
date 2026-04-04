"use client";

import React, { useRef, useState, useEffect } from "react";
import { ChevronLeftIcon, ChevronRightIcon, ChevronUpIcon } from "@heroicons/react/24/outline";

const SIDEBAR_WIDTH = "18rem";       // 288px — matches --sidebar-width token
const SIDEBAR_STUB_WIDTH = "2.5rem"; // 40px  — matches --sidebar-stub-width token
const SIDEBAR_BOTTOM_GAP = "7rem";   // bottom breathing room
const TRANSITION_DURATION = "duration-300";

interface CollapsibleSidebarProps {
  side: "left" | "right";
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  stickyTop: string;
  expandLabel: string;
  headerContent?: React.ReactNode;
  fillHeight?: boolean;
  children: React.ReactNode;
}

export default function CollapsibleSidebar({
  side,
  isOpen,
  setIsOpen,
  stickyTop,
  expandLabel,
  headerContent,
  fillHeight = false,
  children,
}: CollapsibleSidebarProps) {
  const isLeft = side === "left";
  const CloseIcon = isLeft ? ChevronLeftIcon : ChevronRightIcon;

  const scrollRef = useRef<HTMLDivElement>(null);
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const onScroll = () => setShowBackToTop(el.scrollTop > 200);
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, [isOpen]);

  const sidebarHeight = `calc(100vh - ${stickyTop} - ${SIDEBAR_BOTTOM_GAP})`;

  return (
    <>
      {/* Mobile overlay background */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-slate-900/50 z-(--z-overlay) lg:hidden"
          onPointerDown={() => setIsOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* WRAPPER: Handles Width & Sticky Positioning */}
      <div
        className={`
          transition-all ${TRANSITION_DURATION} ease-in-out shrink-0 z-(--z-sidebar)
          flex flex-col
          fixed lg:sticky
          ${isLeft ? "left-0" : "right-0"}
          ${isOpen ? "w-[85vw] md:w-72" : "w-0"}
        `}
        style={{
          top: stickyTop,
          minHeight: "30vh",
          maxHeight: sidebarHeight,
        }}
      >
        <div className="w-full h-full relative">
          {/* ACTUAL SIDEBAR CONTENT */}
          <aside className={`
            absolute inset-0 bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700 flex flex-col overflow-hidden border-t
            ${isLeft ? "rounded-tl-xl border-r" : "rounded-tr-xl border-l"}
            ${isOpen ? "opacity-100 shadow-2xl lg:shadow-none" : "opacity-0 border-none"}
          `}>
            <div className="w-[85vw] md:w-72 h-full flex flex-col relative">
              {fillHeight ? (
                <div className="flex-1 min-h-0 flex flex-col overflow-hidden px-2 pt-3 pb-4">
                  {children}
                </div>
              ) : (
                <div
                  ref={scrollRef}
                  className="flex-1 min-h-0 overflow-y-auto scrollbar-thin scrollbar-thumb-slate-200 hover:scrollbar-thumb-slate-300 scrollbar-track-transparent"
                  style={{ direction: isLeft ? "ltr" : "rtl" }}
                >
                  <div className="px-4 pb-4 pt-0" style={{ direction: "ltr" }}>
                    {children}
                  </div>
                </div>
              )}

              {/* Back to Top — only when scrolled past 200px */}
              {!fillHeight && showBackToTop && (
                <button
                  onClick={() => scrollRef.current?.scrollTo({ top: 0, behavior: "smooth" })}
                  className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-800 dark:bg-slate-200 text-white dark:text-slate-900 text-[11px] font-semibold shadow-lg hover:bg-slate-700 dark:hover:bg-slate-300 transition-colors z-10"
                  aria-label="Back to top"
                >
                  <ChevronUpIcon className="w-3 h-3" />
                  Back to top
                </button>
              )}
            </div>
          </aside>

          {/* FLOATING CLOSE BUTTON - OUTSIDE ON DESKTOP */}
          {isOpen && (
            <button
              onClick={() => setIsOpen(false)}
              className={`
                absolute top-0 z-(--z-sidebar) p-2.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors
                bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-full shadow-sm
                ${isLeft ? "right-2" : "left-2"}
                ${isLeft ? "lg:right-0 lg:left-auto lg:translate-x-1/2" : "lg:left-0 lg:right-auto lg:-translate-x-1/2"}
              `}
              title="Collapse Sidebar"
            >
              <CloseIcon className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Collapsed State Stub (Desktop) */}
      {!isOpen && (
        <div
          onClick={() => setIsOpen(true)}
          className={`hidden lg:flex flex-col items-center py-4 border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors z-(--z-overlay) fixed lg:sticky border-t ${isLeft ? "left-0 border-r rounded-tl-xl" : "right-0 border-l rounded-tr-xl"}`}
          style={{
            top: stickyTop,
            height: sidebarHeight,
            width: SIDEBAR_STUB_WIDTH,
          }}
          title={expandLabel}
        >
          <div
            className="transform rotate-180 text-xs font-bold text-slate-400 dark:text-slate-500 tracking-widest uppercase whitespace-nowrap"
            style={{ writingMode: "vertical-rl" }}
          >
            {expandLabel}
          </div>
        </div>
      )}
    </>
  );
}
