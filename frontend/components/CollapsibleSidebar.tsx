"use client";

import React, { useState, useEffect } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";

interface CollapsibleSidebarProps {
  side: "left" | "right";
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  children: React.ReactNode;
  headerContent?: React.ReactNode; // For "Expand All / Collapse All" buttons
  expandLabel?: string;
  hideLabel?: string;
}

export default function CollapsibleSidebar({
  side,
  isOpen,
  setIsOpen,
  children,
  headerContent,
  expandLabel = "Expand",
  hideLabel = "Hide",
}: CollapsibleSidebarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const isLeft = side === "left";

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* EXPAND BUTTON (Sticky, Floating outside sidebar) */}
      <div
        className={`sticky top-24 z-50 w-0 h-10 ${isOpen ? "hidden" : "block"}`}
      >
        <button
          onClick={() => setIsOpen(true)}
          className={`absolute ${isLeft ? "-left-24" : "-right-24"} top-0 p-2 bg-white border border-slate-200 rounded-lg shadow-sm text-slate-500 hover:text-slate-900 transition-all duration-500 flex flex-row items-center gap-2 ${isScrolled ? "opacity-30 hover:opacity-100" : "opacity-100 animate-pulse hover:animate-none"}`}
          title={`${expandLabel} Sidebar`}
        >
          {!isLeft && <ChevronLeftIcon className="w-4 h-4" />}
          <span className="text-[10px] font-bold uppercase tracking-wider">
            {expandLabel}
          </span>
          {isLeft && <ChevronRightIcon className="w-4 h-4" />}
        </button>
      </div>

      {/* SIDEBAR CONTAINER */}
      <div
        className={`
          bg-white transition-all duration-300 ease-in-out overflow-hidden flex-shrink-0 z-40 rounded-xl border border-slate-200 sticky top-24 max-h-[calc(100vh-6rem)] flex flex-col
          ${isOpen ? "w-80 shadow-[4px_0_24px_rgba(0,0,0,0.02)] opacity-100" : "w-0 border-none opacity-0"}
        `}
      >
        {/* SIDEBAR HEADER */}
        <div
          className={`flex-shrink-0 p-2 sticky top-0 bg-white z-50 flex items-center border-b border-slate-100 ${isLeft ? "justify-between" : "justify-between flex-row-reverse"}`}
        >
          <div className="flex gap-2">{headerContent}</div>
          <button
            onClick={() => setIsOpen(false)}
            className="p-2 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors flex items-center gap-2"
            title={`${hideLabel} Sidebar`}
          >
            {!isLeft && <ChevronRightIcon className="w-4 h-4" />}
            <span className="text-[10px] font-bold uppercase tracking-wider">
              {hideLabel}
            </span>
            {isLeft && <ChevronLeftIcon className="w-4 h-4" />}
          </button>
        </div>

        {/* CONTENT */}
        <div className="w-80 flex-1 overflow-y-auto p-6 pt-4 [direction:ltr] [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:bg-slate-300 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-slate-50">
          {children}
        </div>

        {/* FADE OVERLAY */}
        <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-white to-transparent pointer-events-none z-10" />
      </div>
    </>
  );
}
