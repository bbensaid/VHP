"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';
import { DashboardContextType, ScenarioType } from '@/lib/dashboard-types';
import { rhtAwardsData } from '@/lib/data/rht-awards'; 

const DashboardContext = createContext<DashboardContextType | undefined>(undefined);

export function DashboardProvider({ children }: { children: React.ReactNode }) {
  const [selectedStateId, setSelectedStateId] = useState<string | null>(null);
  const [simulationMode, setSimulationMode] = useState<ScenarioType>('statusQuo');

  // We define the value object here.
  // It is safe to render immediately because we aren't using window/localStorage yet.
  const value: DashboardContextType = {
    selectedStateId,
    setSelectedStateId,
    simulationMode,
    setSimulationMode,
    allStates: rhtAwardsData,
    selectedStateData: selectedStateId ? rhtAwardsData[selectedStateId] : null
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