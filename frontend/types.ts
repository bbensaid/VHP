// types.ts

export type ScenarioType = 'statusQuo' | 'optimized';

// Re-export the canonical RHTProfile from the data layer
export type { RHTProfile } from '@/lib/data/rht-program';

export interface RHTMetric {
  label: string;
  value?: string;
  trend?: 'up' | 'down' | 'neutral';
  status?: 'On Track' | 'Pending' | 'At Risk' | 'Achieved';
}

export interface RHTInitiative {
  title: string;
  description: string;
  status?: 'Active' | 'Planned' | 'Completed';
}

// --- SIMULATION TYPES (Hospital Economics) ---
export interface HospitalScenario {
  label: string;
  margin: number;
  revenue: number;
  expenses: number;
  operatingIncome: number;
}

export interface SimulationProfile {
  hospitalName: string;
  scenarios: {
    statusQuo: HospitalScenario;
    optimized: HospitalScenario;
  };
}

import type { RHTProfile } from '@/lib/data/rht-program';

export interface ProgramContextType {
  selectedStateId: string | null;
  setSelectedStateId: (id: string | null) => void;
  simulationMode: ScenarioType;
  setSimulationMode: (mode: ScenarioType) => void;
  allStates: Record<string, RHTProfile>;
  selectedStateData: RHTProfile | null;
  updateStatus?: (id: string, status: string) => void;
}
