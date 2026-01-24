"use client";

import React, { createContext, useContext, useState } from "react";

interface TickerContextType {
  isHeaderVisible: boolean;
  setHeaderVisible: (visible: boolean) => void;
  isStripVisible: boolean;
  setStripVisible: (visible: boolean) => void;
}

const TickerContext = createContext<TickerContextType | undefined>(undefined);

export const TickerProvider = ({ children }: { children: React.ReactNode }) => {
  const [isHeaderVisible, setHeaderVisible] = useState(true);
  const [isStripVisible, setStripVisible] = useState(true);

  return (
    <TickerContext.Provider
      value={{
        isHeaderVisible,
        setHeaderVisible,
        isStripVisible,
        setStripVisible,
      }}
    >
      {children}
    </TickerContext.Provider>
  );
};

export const useTicker = () => {
  const context = useContext(TickerContext);
  // Return a safe fallback if provider is missing to prevent crashes during development
  if (!context)
    return {
      isHeaderVisible: true,
      setHeaderVisible: () => {},
      isStripVisible: true,
      setStripVisible: () => {},
    };
  return context;
};
