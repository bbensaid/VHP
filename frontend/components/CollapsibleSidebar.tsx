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
  stickyTop = "6rem",
}: CollapsibleSidebarProps) {
  const isLeft = side === "left";

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

  const effectiveOpen = isOpen || isPinned;

  return (
    <div
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`
        bg-white transition-all duration-300 ease-in-out flex-shrink-0 z-40 rounded-xl
        border border-slate-200 sticky flex flex-col
        ${effectiveOpen ? "w-80 shadow-lg" : "w-16"}
      `}
      style={{ top: stickyTop, maxHeight: `calc(100vh - ${stickyTop})` }}
    >
      {/* SIDEBAR HEADER */}
      <div
        className={`
          flex-shrink-0 p-2 sticky top-0 bg-white z-50 flex items-center border-b border-slate-100
          ${
            isLeft
              ? effectiveOpen
                ? "justify-between"
                : "justify-center"
              : effectiveOpen
              ? "justify-between flex-row-reverse"
              : "justify-center"
          }
        `}
      >
        {effectiveOpen && <div className="flex gap-2">{headerContent}</div>}

        <div className="flex items-center gap-1">
          <button
            onClick={togglePin}
            className="p-2 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors flex items-center gap-2"
            title={isPinned ? "Unpin Sidebar" : "Pin Sidebar"}
          >
            {isPinned ? (
              <PinSolidIcon className="w-5 h-5 text-indigo-500" />
            ) : (
              <PinOutlineIcon className="w-5 h-5" />
            )}
            {effectiveOpen && (
                <span className="text-[10px] font-bold uppercase tracking-wider">
                    {isPinned ? "Unpin" : "Pin"}
                </span>
            )}
            <span className="sr-only">
              {isPinned ? "Unpin Sidebar" : "Pin Sidebar"}
            </span>
          </button>
          {effectiveOpen && (
            <button
              onClick={() => {
                setIsPinned(false);
                setIsOpen(false);
              }}
              className="p-2 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors flex items-center gap-2"
              title={`${hideLabel} Sidebar`}
            >
              <span className="sr-only">{hideLabel} Sidebar</span>
              {isLeft && <span className="text-[10px] font-bold uppercase tracking-wider">{hideLabel}</span>}
              {isLeft ? (
                <ChevronLeftIcon className="w-4 h-4" />
              ) : (
                <ChevronRightIcon className="w-4 h-4" />
              )}
              {!isLeft && <span className="text-[10px] font-bold uppercase tracking-wider">{hideLabel}</span>}
            </button>
          )}
        </div>
      </div>

      {/* CONTENT */}
      <div
        className={`
          flex-1 overflow-y-auto overflow-x-hidden p-6 pt-4 [direction:ltr]
          [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:bg-slate-300
          [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-slate-50
          transition-opacity duration-200
          ${effectiveOpen ? "opacity-100" : "opacity-0"}
        `}
      >
        <div className="w-64">{children}</div>
      </div>

      {/* FADE OVERLAY */}
      {effectiveOpen && (
        <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-white to-transparent pointer-events-none z-10" />
      )}
    </div>
  );
}
