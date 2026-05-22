"use client";

import { useState, type ReactNode } from "react";
import { ChevronUpIcon, ChevronDownIcon } from "@heroicons/react/24/outline";

type Mode = "top" | "bottom" | "bottom-collapsible";

interface StickyOutputPanelProps {
  mode: Mode;
  children: ReactNode;
  compactSummary?: ReactNode;
  defaultCollapsed?: boolean;
  className?: string;
  show?: boolean;
}

const TOP_OFFSET = "calc(var(--sidebar-top, var(--sticky-bar-height, 2.5rem)) + 110px)";

export function StickyOutputPanel({
  mode,
  children,
  compactSummary,
  defaultCollapsed = true,
  className = "",
  show = true,
}: StickyOutputPanelProps) {
  const [collapsed, setCollapsed] = useState(defaultCollapsed);

  if (!show) return null;

  if (mode === "top") {
    return (
      <div
        className={`sticky z-20 ${className}`}
        style={{ top: TOP_OFFSET }}
      >
        {children}
      </div>
    );
  }

  const isCollapsible = mode === "bottom-collapsible";
  const showFull = !isCollapsible || !collapsed;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-30 px-2 sm:px-4 pb-2 sm:pb-4 pointer-events-none">
      <div className={`max-w-7xl mx-auto pointer-events-auto ${className}`}>
        <div className="bg-blue-50 border border-blue-200 rounded-xl shadow-lg">
          {isCollapsible && (
            <button
              onClick={() => setCollapsed((c) => !c)}
              className="w-full flex items-center justify-between px-4 py-2 text-xs font-bold text-blue-800 hover:bg-blue-100 transition-colors rounded-t-xl"
              aria-expanded={!collapsed}
            >
              <div className="flex-1 text-left">{compactSummary}</div>
              {collapsed ? (
                <span className="flex items-center gap-1 shrink-0">
                  Expand <ChevronUpIcon className="w-3.5 h-3.5" />
                </span>
              ) : (
                <span className="flex items-center gap-1 shrink-0">
                  Collapse <ChevronDownIcon className="w-3.5 h-3.5" />
                </span>
              )}
            </button>
          )}
          {showFull && (
            <div className={isCollapsible ? "border-t border-blue-200 p-4" : "p-4"}>
              {children}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export const STICKY_BOTTOM_RESERVE_CLASS = "pb-72 md:pb-64";
export const STICKY_BOTTOM_COLLAPSED_RESERVE_CLASS = "pb-14";
