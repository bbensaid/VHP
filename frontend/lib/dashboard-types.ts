export type ScenarioType = 'statusQuo' | 'optimized';

export interface RHTMetric {
  label: string;
  value: string;
  trend?: 'up' | 'down' | 'neutral';
  status?: 'On Track' | 'Pending' | 'At Risk' | 'Achieved';
}

export interface RHTInitiative {
  title: string;
  description: string;
  status?: 'Active' | 'Planned' | 'Completed';
}

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

export interface RHTProfile {
  id: string; 
  stateName: string;
  awardAmount: string;
  strategicFocus: string | string[];
  metrics: RHTMetric[];
  initiatives: RHTInitiative[];
  simulation?: SimulationProfile; 
}

export interface DashboardContextType {
  selectedStateId: string | null;
  setSelectedStateId: (id: string | null) => void;
  simulationMode: ScenarioType;
  setSimulationMode: (mode: ScenarioType) => void;
  allStates: Record<string, RHTProfile>;
  selectedStateData: RHTProfile | null;
}