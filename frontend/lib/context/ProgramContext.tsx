"use client";

import React, { createContext, useContext, useState } from 'react';

// Define the shape of our Global Memory
interface ProgramState {
  hospitalStatuses: Record<string, 'critical' | 'watch' | 'stable'>;
  updateStatus: (id: string, status: 'critical' | 'watch' | 'stable') => void;
}

const ProgramContext = createContext<ProgramState | undefined>(undefined);

export function ProgramProvider({ children }: { children: React.ReactNode }) {
  // Initial State: NVRH is Critical
  const [hospitalStatuses, setStatuses] = useState<Record<string, 'critical' | 'watch' | 'stable'>>({
    'nvrh': 'critical',
    'uvm': 'stable'
  });

  const updateStatus = (id: string, status: 'critical' | 'watch' | 'stable') => {
    setStatuses(prev => ({
      ...prev,
      [id]: status
    }));
  };

  return (
    <ProgramContext.Provider value={{ hospitalStatuses, updateStatus }}>
      {children}
    </ProgramContext.Provider>
  );
}

export function useProgramContext() {
  const context = useContext(ProgramContext);
  if (context === undefined) {
    throw new Error('useProgramContext must be used within a ProgramProvider');
  }
  return context;
}