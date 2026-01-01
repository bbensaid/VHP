"use client";

import Link from "next/link";
import React from "react";

interface Insight {
  category: string;
  content: string;
  link: string | null;
}

export default function InsightStrip({ data }: { data: Insight | null }) {
  // If no data is passed from the parent, render nothing.
  if (!data) return null;

  const getBadgeStyle = (cat: string) => {
    switch (cat) {
      case 'QUOTE': return 'bg-indigo-500 text-white';
      case 'STAT': return 'bg-emerald-500 text-white';
      case 'CHART': return 'bg-orange-500 text-white';
      case 'READ': return 'bg-rose-500 text-white';
      case 'TRIVIA': return 'bg-violet-500 text-white';
      default: return 'bg-slate-600 text-white';
    }
  };

  const ContentWrapper = data.link ? Link : 'div';
  const props = data.link ? { href: data.link } : {};

  return (
    <div className="w-full bg-slate-900 border-b border-indigo-900/30 text-white text-xs py-2 relative overflow-hidden">
      <div className="container mx-auto px-4 flex justify-center items-center relative z-10">
        {/* @ts-ignore */}
        <ContentWrapper {...props} className="group flex items-center gap-3 cursor-pointer transition-opacity hover:opacity-90">
            
            <span className={`px-2 py-0.5 rounded font-black tracking-widest text-[9px] uppercase ${getBadgeStyle(data.category)}`}>
                {data.category}
            </span>

            <span className="font-medium text-slate-200 group-hover:text-white transition-colors">
                {data.content}
            </span>

            {data.link && (
                <span className="text-slate-500 group-hover:text-white group-hover:translate-x-1 transition-all">
                    →
                </span>
            )}
        </ContentWrapper>
      </div>
    </div>
  );
}