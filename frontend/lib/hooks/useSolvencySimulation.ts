import { useMemo } from 'react';

export type ScenarioType = 'baseline' | 'aggressive' | 'hybrid';

export interface SimulationConfig {
  id: ScenarioType;
  title: string;
  monthlyBurnRate: number;
  monthlySavings: number;
  implementationLag: number;
}

export const SCENARIO_DEFAULTS: Record<ScenarioType, SimulationConfig> = {
  baseline: {
    id: 'baseline',
    title: "Status Quo",
    monthlyBurnRate: 3.5,
    monthlySavings: 0,
    implementationLag: 0
  },
  aggressive: {
    id: 'aggressive',
    title: "Aggressive Consolidation",
    monthlyBurnRate: 3.5,
    monthlySavings: 5.5,
    implementationLag: 3
  },
  hybrid: {
    id: 'hybrid',
    title: "Regional Partnership",
    monthlyBurnRate: 3.5,
    monthlySavings: 3.8,
    implementationLag: 6
  }
};

export function useSolvencySimulation(scenarioId: ScenarioType, startCash: number = 30) {
  const config = SCENARIO_DEFAULTS[scenarioId];

  const projection = useMemo(() => {
    const months = 12;
    const dataPoints: number[] = [];
    let currentCash = startCash;

    for (let m = 1; m <= months; m++) {
      // 1. Burn
      currentCash -= config.monthlyBurnRate;
      
      // 2. Savings (after lag)
      if (m > config.implementationLag) {
        currentCash += config.monthlySavings;
      }

      // 3. Floor
      if (currentCash < 0) currentCash = 0;
      
      dataPoints.push(currentCash);
    }
    return dataPoints;
  }, [config, startCash]);

  const finalSolvency = Math.round(projection[projection.length - 1]);
  const isViable = finalSolvency > 15;

  return {
    config,
    projectionData: projection,
    finalSolvency,
    isViable
  };
}