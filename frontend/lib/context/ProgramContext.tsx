"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';
import { ProgramContextType, RHTProfile, ScenarioType } from '@/types';
import { rhtProgramData } from '@/lib/data/rht-program'; 

const ProgramContext = createContext<ProgramContextType | undefined>(undefined);

export function ProgramProvider({ children }: { children: React.ReactNode }) {
  const [selectedStateId, setSelectedStateId] = useState<string | null>(null);
  const [simulationMode, setSimulationMode] = useState<ScenarioType>('statusQuo');
  const [mounted, setMounted] = useState(false);

  // Hydration fix: Only render after client mount
  useEffect(() => {
    setMounted(true);
  }, []);

  const value: ProgramContextType = {
    selectedStateId,
    setSelectedStateId,
    simulationMode,
    setSimulationMode,
    allStates: rhtProgramData,
    selectedStateData: selectedStateId ? rhtProgramData[selectedStateId] : null
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