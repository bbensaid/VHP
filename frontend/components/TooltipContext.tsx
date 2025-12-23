// components/TooltipContext.tsx
"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

interface TooltipContextType {
  showTooltips: boolean;
  toggleTooltips: () => void;
}

const TooltipContext = createContext<TooltipContextType | undefined>(undefined);

export const TooltipProvider = ({ children }: { children: ReactNode }) => {
  const [showTooltips, setShowTooltips] = useState(true); // Default ON

  const toggleTooltips = () => {
    setShowTooltips((prev) => !prev);
  };

  return (
    <TooltipContext.Provider value={{ showTooltips, toggleTooltips }}>
      {children}
    </TooltipContext.Provider>
  );
};

export const useTooltipContext = () => {
  const context = useContext(TooltipContext);
  if (!context)
    throw new Error("useTooltipContext must be used within a TooltipProvider");
  return context;
};
