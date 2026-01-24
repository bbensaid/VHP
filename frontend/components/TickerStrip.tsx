"use client";

import React, { useState } from "react";
import Link from "next/link";

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
}

export default function TickerStrip({
  tickerData,
  transparent,
}: TickerStripProps) {
  const [isHovered, setIsHovered] = useState(false);

  // Normalize data: Handle both Array (System Vitals) and Object (News Headlines)
  const items = Array.isArray(tickerData)
    ? tickerData
    : tickerData?.headlines || [];

  if (!items.length) return null;

  const isVitals = Array.isArray(tickerData);

  const getTickerColor = (status?: string) => {
    switch (status) {
      case "critical":
        return "text-red-600";
      case "warning":
        return "text-amber-600";
      case "good":
        return "text-emerald-600";
      default:
        return "text-slate-900";
    }
  };

  return (
    <div
      className={`w-full ${transparent ? "bg-transparent" : "bg-slate-50"} h-full overflow-hidden flex items-center relative rounded-sm`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Label Badge */}
      <div
        className={`flex items-center ${transparent ? "bg-transparent" : "bg-slate-100 border-r border-slate-200"} h-full px-4 z-10 relative flex-shrink-0`}
      >
        <div
          className={`w-2 h-2 rounded-full ${
            isVitals ? "bg-emerald-500" : "bg-red-500"
          } animate-pulse mr-2`}
        ></div>
        <span className="text-[10px] font-black uppercase tracking-widest text-slate-700">
          {isVitals ? "System Vitals" : "Live Wire"}
        </span>
      </div>

      {/* Scrolling Content */}
      <div className="flex-1 overflow-hidden relative h-full flex items-center">
        <div
          className="flex items-center animate-marquee whitespace-nowrap"
          style={{
            animationPlayState: isHovered ? "paused" : "running",
          }}
        >
          {/* Render items twice for seamless loop */}
          {[...items, ...items].map((item, i) => (
            <div
              key={i}
              className="flex items-center gap-2 mx-8 whitespace-nowrap"
            >
              {item.label ? (
                // RENDER SYSTEM VITAL
                <>
                  <span className="font-medium text-slate-500 text-xs">
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
                </>
              ) : (
                // RENDER NEWS HEADLINE
                <Link
                  href={item.url || "#"}
                  className="flex items-center gap-2 group"
                >
                  <span className="font-bold text-xs text-slate-700 group-hover:text-indigo-600 transition-colors">
                    {item.text}
                  </span>
                  <span className="text-[10px] text-slate-400 group-hover:text-indigo-400">
                    &rarr;
                  </span>
                </Link>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
