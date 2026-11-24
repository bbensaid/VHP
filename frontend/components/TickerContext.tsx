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
  // Shown only until /api/ticker answers (or if it fails). Every item must be a
  // sourced fact that the linked page states — never a placeholder headline.
  // (Replaced 2026-11-23: the old fallbacks were invented — an "NVRH $75M deficit",
  // an unsourced "MA denials +12%", and the deleted 42/100 performance index.)
  { text: "RHT REVIEW: CMS awards $10B in Year 2 Rural Health Transformation funding (Nov 9, 2026)", url: "/rht-review" },
  { text: "VERMONT: GMCB FY2027 hospital budgets cut commercial rates 2.9% statewide", url: "/vermont-act-68" },
  { text: "THE BOOK: Health Transformation Review — read it online", url: "/book" },
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
