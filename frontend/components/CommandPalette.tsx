// components/CommandPalette.tsx
// CONTRAST FIX: All text-slate-400 on white backgrounds replaced with
// text-slate-600 (≥ 4.5:1 vs white). Icon/decorative uses left as-is.

"use client";

import React, { useEffect, useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import {
  MagnifyingGlassIcon,
  ChartBarIcon,
  BuildingLibraryIcon,
  GlobeAmericasIcon,
  DocumentTextIcon,
  ArrowRightIcon,
  HomeIcon,
  MapIcon,
  BeakerIcon,
  ScaleIcon,
  ChatBubbleLeftRightIcon,
  UserCircleIcon,
  CreditCardIcon,
  BookmarkIcon,
  ClipboardDocumentListIcon,
  WrenchScrewdriverIcon,
} from "@heroicons/react/24/outline";

type CommandItem = {
  id: string;
  title: string;
  category: "Navigation" | "State" | "Tool" | "Actions" | "Launch Tool";
  href: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  shortcut?: string;
};

const COMMANDS: CommandItem[] = [
  // Navigation
  { id: "nav-0", title: "Home", category: "Navigation", href: "/", icon: HomeIcon, shortcut: "H" },
  { id: "nav-1", title: "Economics Monitor", category: "Navigation", href: "/economics", icon: ChartBarIcon, shortcut: "E" },
  { id: "nav-2", title: "Policy Analysis", category: "Navigation", href: "/policy", icon: BuildingLibraryIcon, shortcut: "P" },
  { id: "nav-3", title: "Technology Radar", category: "Navigation", href: "/technology", icon: GlobeAmericasIcon, shortcut: "T" },
  { id: "nav-4", title: "Clinical Intelligence", category: "Navigation", href: "/clinical", icon: BeakerIcon, shortcut: "C" },
  { id: "nav-5", title: "Health Equity", category: "Navigation", href: "/equity", icon: ScaleIcon, shortcut: "Q" },
  { id: "dash-1", title: "National Dashboard", category: "Navigation", href: "/dashboard", icon: MapIcon },
  { id: "dash-2", title: "Investment Tracker", category: "Navigation", href: "/economics/investment", icon: DocumentTextIcon },
  { id: "dash-3", title: "HTI Simulator", category: "Tool", href: "/hti-dashboard", icon: ChartBarIcon },
  { id: "nav-6", title: "Go to AI Analyst", category: "Navigation", href: "/chat", icon: ChatBubbleLeftRightIcon },
  { id: "nav-7", title: "Go to Research Lab", category: "Navigation", href: "/research-lab", icon: BeakerIcon },
  { id: "nav-8", title: "Go to State Dashboard", category: "Navigation", href: "/dashboard", icon: MapIcon },
  { id: "nav-9", title: "Go to Community", category: "Navigation", href: "/community", icon: GlobeAmericasIcon },
  { id: "nav-10", title: "Go to Account", category: "Navigation", href: "/account", icon: UserCircleIcon },
  { id: "nav-11", title: "Go to Pricing", category: "Navigation", href: "/pricing", icon: CreditCardIcon },
  // State
  { id: "st-1", title: "Vermont Profile", category: "State", href: "/dashboard/vermont", icon: ArrowRightIcon },
  { id: "st-2", title: "Texas Profile", category: "State", href: "/dashboard/texas", icon: ArrowRightIcon },
  { id: "st-3", title: "California Profile", category: "State", href: "/dashboard/california", icon: ArrowRightIcon },
  { id: "st-4", title: "New York Profile", category: "State", href: "/dashboard/new_york", icon: ArrowRightIcon },
  // Actions
  { id: "act-1", title: "Start new conversation", category: "Actions", href: "/chat", icon: ChatBubbleLeftRightIcon },
  { id: "act-2", title: "Upgrade plan", category: "Actions", href: "/pricing", icon: CreditCardIcon },
  { id: "act-3", title: "View saved articles", category: "Actions", href: "/account/bookmarks", icon: BookmarkIcon },
  { id: "act-4", title: "Take annual survey", category: "Actions", href: "/survey", icon: ClipboardDocumentListIcon },
  // Launch Tool
  { id: "tool-1", title: "Open APM Calculator", category: "Launch Tool", href: "/research-lab?tool=apm", icon: WrenchScrewdriverIcon },
  { id: "tool-2", title: "Open CEA Calculator", category: "Launch Tool", href: "/research-lab?tool=cea", icon: WrenchScrewdriverIcon },
  { id: "tool-3", title: "Open HCC Scoring", category: "Launch Tool", href: "/research-lab?tool=hcc", icon: WrenchScrewdriverIcon },
  { id: "tool-4", title: "Open FHIR Lab", category: "Launch Tool", href: "/research-lab?tool=fhir", icon: WrenchScrewdriverIcon },
];

export default function CommandPalette() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const router = useRouter();

  useEffect(() => {
    const onKeydown = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setIsOpen((open) => !open);
      }
      if (e.key === "Escape") setIsOpen(false);
    };
    window.addEventListener("keydown", onKeydown);
    return () => window.removeEventListener("keydown", onKeydown);
  }, []);

  const filteredCommands = useMemo(() => {
    if (!query) return COMMANDS;
    return COMMANDS.filter((c) =>
      c.title.toLowerCase().includes(query.toLowerCase())
    );
  }, [query]);

  const runCommand = (command: CommandItem) => {
    setIsOpen(false);
    setQuery("");
    router.push(command.href);
  };

  useEffect(() => {
    const onListKeydown = (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelectedIndex((i) => (i + 1) % filteredCommands.length);
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelectedIndex((i) => (i - 1 + filteredCommands.length) % filteredCommands.length);
      } else if (e.key === "Enter") {
        e.preventDefault();
        if (filteredCommands[selectedIndex]) runCommand(filteredCommands[selectedIndex]);
      }
    };
    if (isOpen) window.addEventListener("keydown", onListKeydown);
    return () => window.removeEventListener("keydown", onListKeydown);
  }, [isOpen, filteredCommands, selectedIndex]);

  useEffect(() => { setSelectedIndex(0); }, [query]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "unset";
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-(--z-modal) flex items-start justify-center pt-[15vh] px-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity"
        onClick={() => setIsOpen(false)}
      />

      {/* Modal */}
      <div className="relative w-full max-w-2xl bg-white dark:bg-slate-900 rounded-xl shadow-2xl overflow-hidden ring-1 ring-slate-900/5 dark:ring-slate-700/50 flex flex-col animate-in fade-in zoom-in-95 duration-100">
        {/* Input */}
        <div className="flex items-center border-b border-slate-100 dark:border-slate-700 px-4 py-3 bg-white dark:bg-slate-900">
          <MagnifyingGlassIcon
            className="w-5 h-5 text-slate-500 mr-3"
            aria-hidden="true"
          />
          <input
            type="text"
            className="flex-1 bg-transparent text-lg text-slate-800 dark:text-slate-100 placeholder:text-slate-500 dark:placeholder:text-slate-600 focus:outline-none"
            placeholder="Type a command or search…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoFocus
            aria-label="Command palette search"
          />
          <button
            onClick={() => setIsOpen(false)}
            className="p-1 hover:bg-slate-100 dark:hover:bg-slate-700 rounded text-slate-600 dark:text-slate-400 transition-colors"
            aria-label="Close command palette"
          >
            {/* ESC badge — on a slate-100 background, text-slate-700 gives ~8.5:1 */}
            <span className="text-[10px] font-bold px-1.5 py-0.5 bg-slate-100 dark:bg-slate-700 rounded border border-slate-200 dark:border-slate-600 text-slate-700 dark:text-slate-300">
              ESC
            </span>
          </button>
        </div>

        {/* List */}
        <div className="max-h-[60vh] overflow-y-auto py-2 bg-slate-50/50 dark:bg-slate-800/50">
          {filteredCommands.length > 0 ? (
            <div className="px-2 space-y-1">
              {filteredCommands.map((command, index) => {
                const active = index === selectedIndex;
                const Icon = command.icon;
                return (
                  <div
                    key={command.id}
                    onClick={() => runCommand(command)}
                    onMouseEnter={() => setSelectedIndex(index)}
                    role="option"
                    aria-selected={active}
                    className={`flex items-center justify-between px-3 py-3 rounded-lg cursor-pointer transition-all ${
                      active
                        ? "bg-white dark:bg-slate-700 shadow-sm ring-1 ring-slate-200 dark:ring-slate-600 text-indigo-700 dark:text-indigo-400"
                        : "text-slate-700 dark:text-slate-200 hover:bg-slate-100/50 dark:hover:bg-slate-700/50"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`p-1.5 rounded-md ${
                          active
                            ? "bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400"
                            : "bg-white dark:bg-slate-700 text-slate-500 dark:text-slate-400 border border-slate-100 dark:border-slate-600"
                        }`}
                      >
                        <Icon className="w-5 h-5" aria-hidden="true" />
                      </div>
                      <span className={`font-medium ${active ? "font-bold" : ""}`}>
                        {command.title}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      {command.category === "State" && (
                        /*
                         * "State" badge on white bg.
                         * text-slate-600 on white = ~5.9:1 ✓ WCAG AA
                         */
                        <span className="text-[10px] uppercase font-bold text-slate-600 dark:text-slate-400 bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 px-1.5 py-0.5 rounded">
                          State
                        </span>
                      )}
                      {active && (
                        <ArrowRightIcon
                          className="w-4 h-4 text-indigo-400"
                          aria-hidden="true"
                        />
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="py-12 text-center text-slate-600 dark:text-slate-400">
              <p>No results found for &ldquo;{query}&rdquo;</p>
            </div>
          )}
        </div>

        {/* Footer
            text-slate-600 on white = ~5.9:1 ✓ WCAG AA (was text-slate-400 ~2.9:1 ✗)
        */}
        <div className="bg-white dark:bg-slate-900 px-4 py-2 text-[10px] text-slate-600 dark:text-slate-400 border-t border-slate-100 dark:border-slate-700 flex justify-between shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.02)]">
          <div className="flex gap-4">
            <span><strong>↑↓</strong> to navigate</span>
            <span><strong>Enter</strong> to select</span>
          </div>
          <span><strong>Cmd+K</strong> to close</span>
        </div>
      </div>
    </div>
  );
}