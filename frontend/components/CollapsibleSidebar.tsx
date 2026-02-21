"use client";

import React from "react";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  MapPinIcon as PinSolidIcon,
} from "@heroicons/react/24/solid";
import { MapPinIcon as PinOutlineIcon } from "@heroicons/react/24/outline";

interface CollapsibleSidebarProps {
  side: "left" | "right";
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  isPinned: boolean;
  setIsPinned: (pinned: boolean) => void;
  children: React.ReactNode;
  headerContent?: React.ReactNode;
  expandLabel?: string;
  hideLabel?: string;
  stickyTop?: string;
}

export default function CollapsibleSidebar({
  side,
  isOpen,
  setIsOpen,
  isPinned,
  setIsPinned,
  children,
  headerContent,
  hideLabel = "Hide",
  stickyTop = "9rem",
}: CollapsibleSidebarProps) {
  const isLeft = side === "left";
  
  // The sidebar is visually active if it's either explicitly open (hover/toggle) or pinned
  const effectiveOpen = isOpen || isPinned;

  const handleMouseEnter = () => {
    if (!isPinned) {
      setIsOpen(true);
    }
  };

  const handleMouseLeave = () => {
    if (!isPinned) {
      setIsOpen(false);
    }
  };

  const togglePin = () => {
    const newPinned = !isPinned;
    setIsPinned(newPinned);
    if (newPinned) {
      setIsOpen(true);
    }
  };

  return (
    <>
      {/* MOBILE BACKDROP: Only shows when sidebar is open on small screens */}
      {effectiveOpen && (
        <div 
          className="fixed inset-0 bg-slate-900/20 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => {
            setIsPinned(false);
            setIsOpen(false);
          }}
        />
      )}

      <aside
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className={`
          bg-white transition-all duration-300 ease-in-out flex-shrink-0 z-50
          border-slate-200 flex flex-col overflow-hidden
          /* MOBILE: Fixed overlay | DESKTOP: Sticky push */
          fixed lg:sticky
          ${isLeft ? "left-0 border-r" : "right-0 border-l"}
          ${effectiveOpen ? "w-[85vw] md:w-80 opacity-100 shadow-2xl lg:shadow-none" : "w-0 opacity-0 border-none"}
        `}
        style={{ 
          top: stickyTop, 
          height: `calc(100vh - ${stickyTop})`,
          maxHeight: `calc(100vh - ${stickyTop})` 
        }}
      >
        <div className="w-[85vw] md:w-80 h-full flex flex-col">
          {/* SIDEBAR HEADER */}
          <div
            className={`
              flex-shrink-0 p-4 sticky top-0 bg-white z-50 flex items-center border-b border-slate-100
              ${
                isLeft
                  ? "justify-between"
                  : "justify-between flex-row-reverse"
              }
            `}
          >
            <div className="flex gap-2 overflow-hidden">
              {headerContent}
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={togglePin}
                className="p-2 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-indigo-600 transition-colors flex items-center gap-2"
                title={isPinned ? "Unpin Sidebar" : "Pin Sidebar"}
              >
                {isPinned ? (
                  <PinSolidIcon className="w-5 h-5 text-indigo-500" />
                ) : (
                  <PinOutlineIcon className="w-5 h-5" />
                )}
              </button>
              
              <button
                onClick={() => {
                  setIsPinned(false);
                  setIsOpen(false);
                }}
                className="p-2 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-red-500 transition-colors"
                title={`${hideLabel} Sidebar`}
              >
                {isLeft ? (
                  <ChevronLeftIcon className="w-4 h-4" />
                ) : (
                  <ChevronRightIcon className="w-4 h-4" />
                )}
              </button>
            </div>
          </div>

          {/* CONTENT WRAPPER */}
          <div className="flex-1 overflow-y-auto overflow-x-hidden p-6 pt-4 [direction:ltr]
            [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:bg-slate-300
            [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-slate-50">
            {/* Fixed width inner container prevents content from "squishing" during the width transition */}
            <div className="w-full md:w-64">
              {children}
            </div>
          </div>

          {/* FADE OVERLAY */}
          <div className="absolute bottom-0 left-0 w-full h-12 bg-gradient-to-t from-white to-transparent pointer-events-none z-10" />
        </div>
      </aside>
    </>
  );
}