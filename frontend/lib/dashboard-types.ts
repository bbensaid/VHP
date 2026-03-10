// lib/dashboard-types.ts

export type ScenarioType = 'statusQuo' | 'optimized';

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

// Canonical RHTProfile comes from the data layer
export type { RHTProfile } from '@/lib/data/rht-program';
import type { RHTProfile } from '@/lib/data/rht-program';

export interface DashboardContextType {
  selectedStateId: string | null;
  setSelectedStateId: (id: string | null) => void;
  simulationMode: ScenarioType;
  setSimulationMode: (mode: ScenarioType) => void;
  allStates: Record<string, RHTProfile>;
  selectedStateData: RHTProfile | null;
}
