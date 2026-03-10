"use client";

import React, { createContext, useContext, useState } from 'react';
import { DashboardContextType, ScenarioType } from '@/lib/dashboard-types';
import type { RHTProfile } from '@/lib/dashboard-types';

const DashboardContext = createContext<DashboardContextType | undefined>(undefined);

interface DashboardProviderProps {
  children: React.ReactNode;
  /** Pre-fetched RHT state data from the server. Falls back to empty object. */
  initialStates?: Record<string, RHTProfile>;
}

export function DashboardProvider({ children, initialStates = {} }: DashboardProviderProps) {
  const [selectedStateId, setSelectedStateId] = useState<string | null>(null);
  const [simulationMode, setSimulationMode] = useState<ScenarioType>('statusQuo');

  const value: DashboardContextType = {
    selectedStateId,
    setSelectedStateId,
    simulationMode,
    setSimulationMode,
    allStates: initialStates,
    selectedStateData: selectedStateId ? initialStates[selectedStateId] ?? null : null,
  };

  return (
    <DashboardContext.Provider value={value}>
      {children}
    </DashboardContext.Provider>
  );
}

export function useDashboard() {
  const context = useContext(DashboardContext);
  if (context === undefined) {
    throw new Error('useDashboard must be used within a DashboardProvider');
  }
  return context;
}
