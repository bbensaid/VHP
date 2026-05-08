"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

interface Headline { text: string; url: string; }

interface TickerContextType {
  isHeaderVisible: boolean;
  setHeaderVisible: (visible: boolean) => void;
  isStripVisible: boolean;
  setStripVisible: (visible: boolean) => void;
  headlines: Headline[];
}

const TickerContext = createContext<TickerContextType | undefined>(undefined);

const FALLBACK_HEADLINES: Headline[] = [
  { text: "INSOLVENCY ALERT: NVRH projects $75M Deficit", url: "/dashboard/vermont/nvrh" },
  { text: "MARKET MOVER: Medicare Advantage Denials Rise 12%", url: "/economics/market" },
  { text: "STATE PROFILE: Vermont Rated CRITICAL (42/100)", url: "/dashboard/vermont" },
];

export const TickerProvider = ({ children }: { children: React.ReactNode }) => {
  const [isHeaderVisible, setHeaderVisible] = useState(true);
  const [isStripVisible, setStripVisible] = useState(true);
  const [headlines, setHeadlines] = useState<Headline[]>(FALLBACK_HEADLINES);

  useEffect(() => {
    fetch("/api/ticker")
      .then(r => r.ok ? r.json() : null)
      .then(data => { if (data?.headlines?.length) setHeadlines(data.headlines); })
      .catch(() => {});
  }, []);

  return (
    <TickerContext.Provider value={{ isHeaderVisible, setHeaderVisible, isStripVisible, setStripVisible, headlines }}>
      {children}
    </TickerContext.Provider>
  );
};

export const useTicker = () => {
  const context = useContext(TickerContext);
  if (!context)
    return {
      isHeaderVisible: true,
      setHeaderVisible: () => {},
      isStripVisible: true,
      setStripVisible: () => {},
      headlines: FALLBACK_HEADLINES,
    };
  return context;
};
