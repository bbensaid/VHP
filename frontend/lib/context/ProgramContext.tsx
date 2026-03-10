"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';
import { ProgramContextType, ScenarioType } from '@/types';
import type { RHTProfile } from '@/lib/data/rht-program';

const ProgramContext = createContext<ProgramContextType | undefined>(undefined);

export function ProgramProvider({ children }: { children: React.ReactNode }) {
  const [selectedStateId, setSelectedStateId] = useState<string | null>(null);
  const [simulationMode, setSimulationMode] = useState<ScenarioType>('statusQuo');
  const [allStates, setAllStates] = useState<Record<string, RHTProfile>>({});
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    fetch('/api/rht-states')
      .then((r) => r.json())
      .then((data: Record<string, RHTProfile>) => setAllStates(data))
      .catch(() => {/* graceful degradation — context works, just empty */});
  }, []);

  const value: ProgramContextType = {
    selectedStateId,
    setSelectedStateId,
    simulationMode,
    setSimulationMode,
    allStates,
    selectedStateData: selectedStateId ? allStates[selectedStateId] : null,
  };

  if (!mounted) {
    return <>{children}</>;
  }

  return (
    <ProgramContext.Provider value={value}>
      {children}
    </ProgramContext.Provider>
  );
}

export function useProgram() {
  const context = useContext(ProgramContext);
  if (context === undefined) {
    throw new Error('useProgram must be used within a ProgramProvider');
  }
  return context;
}

// Alias used in legacy pages
export const useProgramContext = useProgram;
