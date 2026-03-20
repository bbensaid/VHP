"use client";

import React from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";

const COLLAPSED_WIDTH = "2.5rem";
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

  return (
    <>
      {/* Mobile overlay background */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-slate-900/50 z-40 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* WRAPPER: Handles Width & Sticky Positioning */}
      <div
        className={`
          transition-all ${TRANSITION_DURATION} ease-in-out shrink-0 z-50
          flex flex-col
          fixed lg:sticky
          ${isLeft ? "left-0" : "right-0"}
          ${isOpen ? "w-[85vw] md:w-72" : "w-0"}
        `}
        style={{
          top: stickyTop,
          height: `calc(100vh - ${stickyTop} - 2rem)`,
          maxHeight: `calc(100vh - ${stickyTop} - 2rem)`
        }}
      >
        <div className="w-full h-full relative">
          {/* ACTUAL SIDEBAR CONTENT */}
          <aside className={`
            absolute inset-0 bg-white border-slate-200 flex flex-col overflow-hidden border-t
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
                  className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-slate-200 hover:scrollbar-thumb-slate-300 scrollbar-track-transparent"
                  style={{ direction: isLeft ? "ltr" : "rtl" }}
                >
                  <div className="px-4 pb-4 pt-0" style={{ direction: "ltr" }}>
                    {children}
                  </div>
                </div>
              )}
            </div>
          </aside>

          {/* FLOATING CLOSE BUTTON - OUTSIDE ON DESKTOP */}
          {isOpen && (
            <button
              onClick={() => setIsOpen(false)}
              className={`
                absolute top-0 z-50 p-1 text-slate-400 hover:text-slate-600 transition-colors
                bg-white border border-slate-200 rounded-full shadow-sm
                /* Mobile: Inside */
                ${isLeft ? "right-2" : "left-2"}
                /* Desktop: On the Line */
                ${isLeft ? "lg:right-0 lg:left-auto lg:translate-x-1/2" : "lg:left-0 lg:right-auto lg:-translate-x-1/2"}
              `}
              title="Collapse Sidebar"
            >
              <CloseIcon className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Collapsed State Stub (Desktop) - Now explicitly opens the sidebar on click */}
      {!isOpen && (
        <div
          onClick={() => setIsOpen(true)}
          className={`hidden lg:flex flex-col items-center py-4 border-slate-200 bg-slate-50 cursor-pointer hover:bg-slate-100 transition-colors z-40 fixed lg:sticky border-t ${isLeft ? "left-0 border-r rounded-tl-xl" : "right-0 border-l rounded-tr-xl"}`}
          style={{
            top: stickyTop,
            height: `calc(100vh - ${stickyTop} - 2rem)`,
            width: COLLAPSED_WIDTH
          }}
          title={expandLabel}
        >
          <div 
            className="transform rotate-180 text-xs font-bold text-slate-400 tracking-widest uppercase whitespace-nowrap"
            style={{ writingMode: "vertical-rl" }}
          >
            {expandLabel}
          </div>
        </div>
      )}
    </>
  );
}
