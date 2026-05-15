"use client";

import React, { useState, useEffect, Suspense } from "react";
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
  badgeClass?: string;
  backLinkHoverClass?: string;
  rowBreakAfter?: number;
}

function HubPageTemplateInner({
  badgeLabel,
  title,
  subtitle,
  tabs,
  backLink = "/",
  backLabel = "Back to Home",
  badgeClass = "bg-indigo-50 text-indigo-700 border border-indigo-100",
  backLinkHoverClass = "hover:text-indigo-600",
  rowBreakAfter,
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
    <div className="w-full font-sans text-slate-800 dark:text-slate-100 flex flex-col pb-20">
      {/* HEADER CARD - Now fully contained, snapping to the AppShell Grid */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-2xl p-5 sm:p-8 mb-4 sm:mb-6 shadow-sm relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-50 dark:bg-indigo-950/20 rounded-bl-full -mr-20 -mt-20 opacity-50 pointer-events-none"></div>
        
        <div className="relative z-10">
          <Link href={backLink} className={`inline-flex items-center text-sm font-bold text-slate-500 dark:text-slate-400 ${backLinkHoverClass} transition-colors mb-6`}>
            <ArrowLeftIcon className="w-4 h-4 mr-1.5" /> {backLabel}
          </Link>
          
          <div className="flex flex-col md:flex-row justify-between items-start">
            <div className="max-w-3xl">
              <div className="flex items-center gap-2 mb-3">
                <span className={`${badgeClass} text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded`}>
                  {badgeLabel}
                </span>
              </div>
              <h1 className="ty-h1 font-black text-slate-900 dark:text-slate-100 tracking-tight mb-3">{title}</h1>
              <p className="text-slate-500 dark:text-slate-400 ty-hero leading-relaxed">{subtitle}</p>
            </div>
          </div>
        </div>
      </div>

      {/* TABS NAVIGATION - Sticky below the AppShell Header */}
      <div className="sticky z-30 mb-8" style={{ top: "var(--sidebar-top, var(--sticky-bar-height, 2.5rem))" }}>
        {/* Mobile: horizontal scroll. Desktop: wrap with rowBreakAfter support */}
        <div className="block md:hidden overflow-x-auto border border-slate-200 dark:border-slate-700 rounded-t-xl bg-slate-50/80 dark:bg-slate-800/80 backdrop-blur-sm">
          <nav className="flex items-end px-2 pt-2 gap-x-1 w-max min-w-full" aria-label="Tabs">
            {tabs.map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => handleTabChange(tab.id)}
                  className={`
                    relative flex items-center gap-1.5 px-3 py-2 text-xs font-bold transition-all whitespace-nowrap rounded-t-xl border-t border-l border-r shrink-0
                    ${isActive
                      ? "bg-white dark:bg-slate-900 border-slate-300 dark:border-slate-600 text-slate-900 dark:text-slate-100 z-10 -mb-px shadow-sm"
                      : "bg-slate-100 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400 mt-1"
                    }
                  `}
                >
                  {tab.icon}
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </nav>
        </div>
        <nav className="hidden md:flex flex-wrap justify-center items-end border border-slate-200 dark:border-slate-700 rounded-t-xl px-2 bg-slate-50/80 dark:bg-slate-800/80 backdrop-blur-sm pt-2 gap-y-1" aria-label="Tabs">
          {tabs.map((tab, index) => {
            const isActive = activeTab === tab.id;
            return (
              <React.Fragment key={tab.id}>
                {rowBreakAfter && index === rowBreakAfter && (
                  <div className="w-full" />
                )}
              <button
                key={tab.id}
                role="tab"
                aria-selected={isActive}
                onClick={() => handleTabChange(tab.id)}
                className={`
                  relative flex items-center justify-center gap-2 px-4 py-2.5 text-xs md:text-sm font-bold transition-all whitespace-nowrap rounded-t-xl border-t border-l border-r mr-2 mb-0
                  ${isActive
                    ? "bg-slate-100 dark:bg-slate-700 border-black dark:border-slate-500 text-slate-900 dark:text-slate-100 z-10 -mb-px"
                    : "bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-700 hover:text-slate-700 dark:hover:text-slate-200 mt-1.5 shadow-sm"
                  }
                `}
              >
                {tab.icon}
                {tab.label}
              </button>
              </React.Fragment>
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
export default function HubPageTemplate(props: HubPageTemplateProps) {
  return (
    <Suspense fallback={null}>
      <HubPageTemplateInner {...props} />
    </Suspense>
  );
}
