"use client";

import React, { useState } from "react";
import Link from "next/link";
import { createPortal } from "react-dom";
import { XMarkIcon } from "@heroicons/react/24/outline";

interface TickerItem {
  // System Vitals fields
  label?: string;
  value?: string;
  trend?: string;
  status?: string;

  // News Headlines fields
  text?: string;
  url?: string;
}

interface TickerStripProps {
  tickerData: TickerItem[] | { headlines: TickerItem[] };
  transparent?: boolean;
  isVisible?: boolean;
  onToggle?: () => void;
  label?: string;
  theme?: "light" | "dark";
  duration?: number;
}

export default function TickerStrip({
  tickerData,
  transparent,
  isVisible = true,
  onToggle,
  label,
  theme = "light",
  duration,
}: TickerStripProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [selectedItem, setSelectedItem] = useState<TickerItem | null>(null);

  // Normalize data: Handle both Array (System Vitals) and Object (News Headlines)
  const items = Array.isArray(tickerData)
    ? tickerData
    : tickerData?.headlines || [];

  if (!items.length) return null;

  const isVitals = Array.isArray(tickerData);
  const isDark = theme === "dark";

  const getTickerColor = (status?: string) => {
    switch (status) {
      case "critical":
        return "text-red-600";
      case "warning":
        return "text-amber-600";
      case "good":
        return "text-emerald-600";
      default:
        return isDark ? "text-white" : "text-slate-900";
    }
  };

  return (
    <>
      <div
        className={`w-full ${transparent ? "bg-transparent" : (isDark ? "bg-indigo-800" : "bg-white")} h-full overflow-hidden flex items-center relative rounded-sm`}
      >
        {/* Label Badge */}
        <div
          className={`flex items-center ${transparent ? "bg-transparent" : (isDark ? "bg-neutral-900 border-r border-neutral-700" : "bg-slate-100 border-r border-slate-200")} h-full pr-4 pl-0 z-10 relative shrink-0`}
        >
          {onToggle && (
            <input
              type="checkbox"
              checked={isVisible}
              onChange={onToggle}
              className="w-3 h-3 cursor-pointer accent-indigo-500 hover:accent-indigo-400 mr-2"
              title="Toggle Vitals"
            />
          )}
          <div
            className={`w-2 h-2 rounded-full ${
              isVitals ? "bg-emerald-500" : "bg-red-500"
            } animate-pulse mr-2`}
          ></div>
          <span className={`text-[10px] font-black uppercase tracking-widest ${isDark ? "text-white" : "text-slate-700"} cursor-pointer`} onClick={onToggle}>
            {label || (isVitals ? "System Vitals" : "Live Wire")}
          </span>
          {onToggle && <span className={`${isDark ? "text-neutral-600" : "text-slate-300"} ml-3`}>|</span>}
        </div>

        {/* Scrolling Content */}
        <div
          className="flex-1 overflow-hidden relative h-full flex items-center"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          style={{ maskImage: "linear-gradient(to right, black 90%, transparent 100%)", WebkitMaskImage: "linear-gradient(to right, black 90%, transparent 100%)" }}
        >
          {isVisible ? (
            <div
              className="flex items-center animate-marquee whitespace-nowrap gap-2"
              style={{
                animationPlayState: isHovered ? "paused" : "running",
                animationDuration: `${duration || (isVitals ? 60 : 180)}s`,
              }}
            >
              {/* Render items multiple times to ensure the strip is filled and loops seamlessly */}
              {[...items, ...items, ...items, ...items].map((item, i) => (
                <div
                  key={i}
                  className="flex items-center gap-2 whitespace-nowrap"
                >
                  {item.label ? (
                    // RENDER SYSTEM VITAL
                    <button
                      onClick={() => setSelectedItem(item)}
                      className="flex items-center gap-2 hover:bg-slate-100/50 hover:shadow-sm px-2 py-1 rounded transition-all cursor-pointer focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                    >
                      <span className={`font-medium ${isDark ? "text-slate-400" : "text-slate-500"} text-xs`}>
                        {item.label}:
                      </span>
                      <span
                        className={`font-bold text-xs ${getTickerColor(
                          item.status,
                        )}`}
                      >
                        {item.value}
                      </span>
                      {item.trend && (
                        <span className="text-[10px] text-slate-400">
                          ({item.trend})
                        </span>
                      )}
                    </button>
                  ) : (
                    // RENDER NEWS HEADLINE
                    <Link
                      href={item.url || "#"}
                      className="flex items-center gap-2 group"
                    >
                      <span className={`font-bold ${isDark ? "text-slate-300 group-hover:text-white" : "text-slate-700 group-hover:text-indigo-600"} transition-colors`}>
                        {item.text}
                      </span>
                      <span className={`text-[10px] ${isDark ? "text-slate-600" : "text-slate-400"} group-hover:text-indigo-400`}>
                        &rarr;
                      </span>
                    </Link>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <span className="text-slate-500 text-[10px] font-medium uppercase tracking-wider ml-2">
              Vitals Paused
            </span>
          )}
        </div>
      </div>

      {/* DETAIL MODAL */}
      {selectedItem &&
        createPortal(
          <div
            className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4 animate-in fade-in duration-200"
            onClick={() => setSelectedItem(null)}
          >
            <div
              className="bg-white rounded-xl shadow-2xl max-w-sm w-full p-6 relative border border-slate-200"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedItem(null)}
                className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 transition-colors"
              >
                <XMarkIcon className="w-5 h-5" />
              </button>

              <div className="mb-4">
                <span className="text-xs font-bold uppercase tracking-widest text-slate-500 block mb-1">
                  System Vital
                </span>
                <h3 className="text-xl font-black text-slate-900">
                  {selectedItem.label}
                </h3>
              </div>

              <div className="flex items-center gap-4 mb-6">
                <div
                  className={`text-3xl font-black ${getTickerColor(
                    selectedItem.status,
                  )}`}
                >
                  {selectedItem.value}
                </div>
                {selectedItem.trend && (
                  <div className="px-2 py-1 bg-slate-100 rounded text-xs font-bold text-slate-600 uppercase">
                    {selectedItem.trend}
                  </div>
                )}
              </div>

              <div className="bg-slate-50 rounded-lg p-4 border border-slate-100 text-sm text-slate-600 leading-relaxed">
                <p>
                  Detailed analytics and historical data for{" "}
                  <strong>{selectedItem.label}</strong> would appear here. This
                  metric is currently flagged as{" "}
                  <span
                    className={`font-bold uppercase ${getTickerColor(
                      selectedItem.status,
                    )}`}
                  >
                    {selectedItem.status || "Normal"}
                  </span>
                  .
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100 flex justify-end">
                <button
                  onClick={() => setSelectedItem(null)}
                  className="text-sm font-bold text-slate-900 hover:text-indigo-600"
                >
                  Close View
                </button>
              </div>
            </div>
          </div>,
          document.body,
        )}
    </>
  );
}
