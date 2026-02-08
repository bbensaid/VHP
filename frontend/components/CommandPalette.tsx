"use client";

import { useEffect, useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import {
  MagnifyingGlassIcon,
  ChartBarIcon,
  BuildingLibraryIcon,
  GlobeAmericasIcon,
  DocumentTextIcon,
  ArrowRightIcon,
  HomeIcon,
  MapIcon
} from "@heroicons/react/24/outline";

// --- CONFIGURATION ---

type CommandItem = {
  id: string;
  title: string;
  category: "Navigation" | "State" | "Tool";
  href: string;
  icon: any;
  shortcut?: string;
};

const COMMANDS: CommandItem[] = [
  // MAIN NAVIGATION
  { id: "nav-0", title: "Home", category: "Navigation", href: "/", icon: HomeIcon, shortcut: "H" },
  { id: "nav-1", title: "Economics Monitor", category: "Navigation", href: "/economics", icon: ChartBarIcon, shortcut: "E" },
  { id: "nav-2", title: "Policy Analysis", category: "Navigation", href: "/policy", icon: BuildingLibraryIcon, shortcut: "P" },
  { id: "nav-3", title: "Technology Radar", category: "Navigation", href: "/technology", icon: GlobeAmericasIcon, shortcut: "T" },
  
  // DASHBOARD TOOLS
  { id: "dash-1", title: "National Dashboard", category: "Navigation", href: "/dashboard", icon: MapIcon },
  { id: "dash-2", title: "Investment Tracker", category: "Navigation", href: "/economics/investment", icon: DocumentTextIcon },
  
  // SHORTCUTS (States)
  { id: "st-1", title: "Vermont Profile", category: "State", href: "/dashboard/vermont", icon: ArrowRightIcon },
  { id: "st-2", title: "Texas Profile", category: "State", href: "/dashboard/texas", icon: ArrowRightIcon },
  { id: "st-3", title: "California Profile", category: "State", href: "/dashboard/california", icon: ArrowRightIcon },
  { id: "st-4", title: "New York Profile", category: "State", href: "/dashboard/new_york", icon: ArrowRightIcon },
];

export default function CommandPalette() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const router = useRouter();

  // 1. GLOBAL KEYBOARD LISTENER
  useEffect(() => {
    // Debug log to confirm component is mounted
    console.log("Command Palette: Ready (Cmd+K)");

    const onKeydown = (e: KeyboardEvent) => {
      // Toggle on Cmd+K or Ctrl+K
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setIsOpen((open) => !open);
      }
      
      // Close on Escape
      if (e.key === "Escape") {
        setIsOpen(false);
      }
    };

    // Use window instead of document for better capture
    window.addEventListener("keydown", onKeydown);
    return () => window.removeEventListener("keydown", onKeydown);
  }, []);

  // 2. FILTERING LOGIC
  const filteredCommands = useMemo(() => {
    if (!query) return COMMANDS;
    return COMMANDS.filter((command) =>
      command.title.toLowerCase().includes(query.toLowerCase())
    );
  }, [query]);

  // 3. NAVIGATION & SELECTION
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
        if (filteredCommands[selectedIndex]) {
          runCommand(filteredCommands[selectedIndex]);
        }
      }
    };

    if (isOpen) {
      window.addEventListener("keydown", onListKeydown);
    }
    return () => window.removeEventListener("keydown", onListKeydown);
  }, [isOpen, filteredCommands, selectedIndex]);

  // Reset selection when query changes
  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  // Prevent scrolling when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-start justify-center pt-[15vh] px-4">
      {/* BACKDROP */}
      <div 
        className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity"
        onClick={() => setIsOpen(false)}
      />

      {/* MODAL */}
      <div className="relative w-full max-w-2xl bg-white rounded-xl shadow-2xl overflow-hidden ring-1 ring-slate-900/5 flex flex-col animate-in fade-in zoom-in-95 duration-100">
        
        {/* INPUT */}
        <div className="flex items-center border-b border-slate-100 px-4 py-3 bg-white">
          <MagnifyingGlassIcon className="w-5 h-5 text-slate-400 mr-3" />
          <input
            type="text"
            className="flex-1 bg-transparent text-lg text-slate-800 placeholder:text-slate-400 focus:outline-none"
            placeholder="Type a command or search..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoFocus
          />
          <button 
            onClick={() => setIsOpen(false)}
            className="p-1 hover:bg-slate-100 rounded text-slate-400 transition-colors"
          >
            <span className="text-[10px] font-bold px-1.5 py-0.5 bg-slate-100 rounded border border-slate-200">ESC</span>
          </button>
        </div>

        {/* LIST */}
        <div className="max-h-[60vh] overflow-y-auto py-2 bg-slate-50/50">
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
                    className={`flex items-center justify-between px-3 py-3 rounded-lg cursor-pointer transition-all ${
                      active ? "bg-white shadow-sm ring-1 ring-slate-200 text-indigo-700" : "text-slate-600 hover:bg-slate-100/50"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`p-1.5 rounded-md ${active ? "bg-indigo-50 text-indigo-600" : "bg-white text-slate-400 border border-slate-100"}`}>
                        <Icon className="w-5 h-5" />
                      </div>
                      <span className={`font-medium ${active ? "font-bold" : ""}`}>
                        {command.title}
                      </span>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      {command.category === "State" && (
                         <span className="text-[10px] uppercase font-bold text-slate-400 bg-white border border-slate-200 px-1.5 py-0.5 rounded">
                           State
                         </span>
                      )}
                      {active && (
                        <ArrowRightIcon className="w-4 h-4 text-indigo-400" />
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="py-12 text-center text-slate-500">
              <p>No results found for "{query}"</p>
            </div>
          )}
        </div>

        {/* FOOTER */}
        <div className="bg-white px-4 py-2 text-[10px] text-slate-400 border-t border-slate-100 flex justify-between shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.02)]">
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