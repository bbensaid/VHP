"use client";

import React from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";

interface CollapsibleSidebarProps {
  side: "left" | "right";
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  stickyTop: string;
  expandLabel: string;
  headerContent?: React.ReactNode;
  children: React.ReactNode;
}

export default function CollapsibleSidebar({
  side,
  isOpen,
  setIsOpen,
  stickyTop,
  expandLabel,
  headerContent,
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

      <aside
        className={`
          bg-white transition-all duration-300 ease-in-out flex-shrink-0 z-50
          border-slate-200 flex flex-col overflow-hidden
          /* MOBILE: Fixed overlay | DESKTOP: Sticky push */
          fixed lg:sticky
          ${isLeft ? "left-0 border-r" : "right-0 border-l"}
          ${isOpen ? "w-[85vw] md:w-72 opacity-100 shadow-2xl lg:shadow-none" : "w-0 opacity-0 border-none"}
        `}
        style={{ 
          top: stickyTop, 
          height: `calc(100vh - ${stickyTop})`,
          maxHeight: `calc(100vh - ${stickyTop})` 
        }}
      >
        <div className="w-[85vw] md:w-72 h-full flex flex-col relative">
          {/* Minimal Directional Close Button */}
          <button
            onClick={() => setIsOpen(false)}
            className={`absolute top-2 z-50 p-2 text-slate-400 hover:text-slate-600 transition-colors ${isLeft ? "right-2" : "left-2"}`}
            title="Collapse Sidebar"
          >
            <CloseIcon className="w-5 h-5" />
          </button>

          {/* Scrollable Content */}
          <div 
            className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-slate-200 hover:scrollbar-thumb-slate-300 scrollbar-track-transparent"
            style={{ direction: isLeft ? "ltr" : "rtl" }}
          >
            <div className="px-4 pb-4 pt-0" style={{ direction: "ltr" }}>
              {children}
            </div>
          </div>
        </div>
      </aside>

      {/* Collapsed State Stub (Desktop) - Now explicitly opens the sidebar on click */}
      {!isOpen && (
        <div
          onClick={() => setIsOpen(true)}
          className={`hidden lg:flex flex-col items-center py-4 border-slate-200 bg-slate-50 cursor-pointer hover:bg-slate-100 transition-colors z-40 fixed lg:sticky ${isLeft ? "left-0 border-r" : "right-0 border-l"}`}
          style={{
            top: stickyTop,
            height: `calc(100vh - ${stickyTop})`,
            width: "2.5rem"
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
