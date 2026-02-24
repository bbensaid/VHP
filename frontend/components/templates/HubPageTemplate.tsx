"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import { useRouter, usePathname, useSearchParams } from "next/navigation";

export interface TabConfig {
  id: string;
  label: string;
  icon: React.ReactNode;
  content: React.ReactNode;
}

interface HubPageTemplateProps {
  badgeLabel: string;
  title: string;
  subtitle: string;
  tabs: TabConfig[];
  backLink?: string;
  backLabel?: string;
}

export default function HubPageTemplate({
  badgeLabel,
  title,
  subtitle,
  tabs,
  backLink = "/",
  backLabel = "Back to Home",
}: HubPageTemplateProps) {
  // THE FIX: Correctly grabbing the first index  using valid optional chaining
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const defaultTab = tabs?.[0]?.id || "";
  const tabFromUrl = searchParams.get("tab");

  const [activeTab, setActiveTab] = useState(tabFromUrl || defaultTab);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    const currentUrlTab = searchParams.get("tab");
    if (currentUrlTab && currentUrlTab !== activeTab) {
      setActiveTab(currentUrlTab);
    } else if (!currentUrlTab && activeTab !== defaultTab) {
      setActiveTab(defaultTab);
    }
  }, [searchParams, activeTab, defaultTab]);

  const handleTabChange = (tabId: string) => {
    if (tabId === activeTab) return;
    setIsTransitioning(true);
    const params = new URLSearchParams(searchParams.toString());
    params.set("tab", tabId);
    router.push(`${pathname}?${params.toString()}`, { scroll: false });

    setTimeout(() => {
      setActiveTab(tabId);
      setIsTransitioning(false);
    }, 200);
  };

  return (
    <div className="w-full font-sans text-slate-800 flex flex-col pb-20">
      {/* HEADER CARD - Now fully contained, snapping to the AppShell Grid */}
      <div className="bg-white border border-slate-200 rounded-2xl p-8 mb-6 shadow-sm relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-50 rounded-bl-full -mr-20 -mt-20 opacity-50 pointer-events-none"></div>
        
        <div className="relative z-10">
          <Link href={backLink} className="inline-flex items-center text-sm font-bold text-slate-500 hover:text-indigo-600 transition-colors mb-6">
            <ArrowLeftIcon className="w-4 h-4 mr-1.5" /> {backLabel}
          </Link>
          
          <div className="flex flex-col md:flex-row justify-between items-start">
            <div className="max-w-3xl">
              <div className="flex items-center gap-2 mb-3">
                <span className="bg-indigo-50 text-indigo-700 text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded border border-indigo-100">
                  {badgeLabel}
                </span>
              </div>
              <h1 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight mb-3">{title}</h1>
              <p className="text-slate-500 text-lg leading-relaxed">{subtitle}</p>
            </div>
          </div>
        </div>
      </div>

      {/* TABS NAVIGATION - Sticky below the AppShell Header */}
      <div className="sticky z-30 mb-8" style={{ top: "var(--sidebar-top, 8.5rem)" }}>
        <nav className="flex items-end overflow-x-auto hide-scrollbar border-b border-slate-200 pl-4 bg-white/95 backdrop-blur-sm pt-2" aria-label="Tabs">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                role="tab"
                aria-selected={isActive}
                onClick={() => handleTabChange(tab.id)}
                className={`
                  relative flex items-center justify-center gap-2 px-6 py-3 text-sm font-bold transition-all whitespace-nowrap rounded-t-xl border-t border-l border-r mr-2
                  ${isActive
                    ? "bg-slate-100 border-black text-slate-900 z-10 -mb-px"
                    : "bg-white border-slate-200 text-slate-500 hover:bg-slate-50 hover:text-slate-700 mt-1.5 shadow-sm"
                  }
                `}
              >
                {tab.icon}
                {tab.label}
              </button>
            );
          })}
        </nav>
      </div>

      {/* TAB CONTENT - The .hub-embedded-view magically neutralizes injected page layouts */}
      <div className={`w-full transition-opacity duration-200 ease-in-out ${isTransitioning ? 'opacity-0' : 'opacity-100'}`}>
        {tabs.map((tab) => (
          <div
            key={tab.id}
            role="tabpanel"
            hidden={activeTab !== tab.id}
            className="hub-embedded-view w-full"
          >
            {activeTab === tab.id && tab.content}
          </div>
        ))}
      </div>
    </div>
  );
}