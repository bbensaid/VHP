"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { usePathname } from "next/navigation";

interface SidebarContextType {
  isLeftOpen: boolean;
  isRightOpen: boolean;
  toggleLeft: () => void;
  toggleRight: () => void;
  setLeftOpen: (open: boolean) => void;
  setRightOpen: (open: boolean) => void;
}

const SidebarContext = createContext<SidebarContextType | undefined>(undefined);

export function SidebarProvider({ children }: { children: ReactNode }) {
  const [isLeftOpen, setLeftOpen] = useState(true);
  const [isRightOpen, setRightOpen] = useState(true);
  const pathname = usePathname();

  // Close both sidebars on mobile when the route changes
  useEffect(() => {
    if (typeof window !== "undefined" && window.innerWidth < 1024) {
      setLeftOpen(false);
      setRightOpen(false);
    }
  }, [pathname]);

  const toggleLeft = () => setLeftOpen((prev) => !prev);
  const toggleRight = () => setRightOpen((prev) => !prev);

  return (
    <SidebarContext.Provider
      value={{ isLeftOpen, isRightOpen, toggleLeft, toggleRight, setLeftOpen, setRightOpen }}
    >
      {children}
    </SidebarContext.Provider>
  );
}

// Safe no-op fallback so a consumer rendered before the provider is mounted
// (SSR / client boundary timing) degrades gracefully instead of crashing the
// whole page. The real provider always supersedes this once mounted.
const NOOP_SIDEBAR: SidebarContextType = {
  isLeftOpen: true,
  isRightOpen: true,
  toggleLeft: () => {},
  toggleRight: () => {},
  setLeftOpen: () => {},
  setRightOpen: () => {},
};

export function useSidebar() {
  return useContext(SidebarContext) ?? NOOP_SIDEBAR;
}
