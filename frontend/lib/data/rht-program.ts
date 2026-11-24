export type Initiative = {
  title: string;
  description: string;
  status?: "Active" | "Planned" | "Completed";
};

export type Metric = {
  label: string;
  value?: string;
  trend?: "up" | "down" | "neutral";
  status: "Pending" | "In Progress" | "Achieved" | "On Track" | "At Risk";
  target?: string;
};

export type RHTProfile = {
  id: string;
  stateName: string;
  awardAmount: string;
  status?: "Active" | "Pending" | "At Risk";
  strategicFocus: string | string[];
  description?: string;
  initiatives: Initiative[];
  metrics: Metric[];
  simulation?: import('@/lib/dashboard-types').SimulationProfile;
};

// The former hand-written rhtProgramData (per-state metric targets with no source) was removed
// 2026-11-24: it was rendered nowhere. Live state profiles come from Sanity `rhtState`, which
// paraphrase CMS project abstracts and carry no metrics.
