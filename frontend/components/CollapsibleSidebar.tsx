"use client";

import React from "react";
import { XMarkIcon } from "@heroicons/react/24/outline";

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
        <div className="w-[85vw] md:w-72 h-full flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-slate-100 flex-shrink-0 min-h-[60px]">
            <div className="flex items-center gap-4">
              {headerContent}
            </div>

            <div className="flex items-center gap-2">
              {/* Clean, explicit Close Button */}
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded transition-colors"
                title="Close Sidebar"
              >
                <XMarkIcon className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Scrollable Content */}
          <div className="flex-1 overflow-y-auto hide-scrollbar p-4">
            {children}
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
