/**
 * Types, constants, sample data, and pure helpers for ResearchWorkspace.
 * No React, no hooks. Imported by atoms, tabs, and the shell.
 */
// ─── Types ────────────────────────────────────────────────────────────────────

export type ScenarioStatus = "Draft" | "In Review" | "Final";
export type ScenarioCategory =
  | "CEA Analysis"
  | "APM Modeling"
  | "Risk Stratification"
  | "Population Health"
  | "Policy Analysis"
  | "Financial Audit"
  | "Quality Optimization";

export interface Annotation {
  id: string;
  text: string;
  timestamp: string;
}

export interface Scenario {
  id: string;
  name: string;
  description: string;
  category: ScenarioCategory;
  tags: string[];
  status: ScenarioStatus;
  createdAt: string;
  annotations: Annotation[];
}

export type ReportSectionType =
  | "Executive Summary"
  | "Background"
  | "Methodology"
  | "Findings"
  | "Recommendations"
  | "Appendix"
  | "Clinical Question"
  | "ICER Results"
  | "WTP Assessment"
  | "Conclusions"
  | "Policy Background"
  | "Affected Stakeholders"
  | "Financial Impact"
  | "Equity Considerations"
  | "Market Overview"
  | "Competitive Landscape"
  | "Financial Projections"
  | "Go/No-Go Recommendation"
  | "Model Description"
  | "Financial Results"
  | "Quality Results"
  | "Lessons Learned"
  | "Next Steps";

export interface ReportSection {
  id: string;
  type: ReportSectionType;
  title: string;
  content: string;
  visible: boolean;
}

export interface ReportMeta {
  title: string;
  authors: string;
  organization: string;
  date: string;
  confidentiality: "Public" | "Internal" | "Confidential" | "Privileged & Confidential";
  version: string;
}

export type CompDimension = {
  id: string;
  name: string;
  unit: string;
  values: Record<string, string>;
};

export type CompScenario = {
  id: string;
  name: string;
  description: string;
  isWinner: boolean;
};

export type NoteCategory =
  | "Method Note"
  | "Data Finding"
  | "Assumption"
  | "Limitation"
  | "Citation"
  | "Todo"
  | "Question";
export type NotePriority = "Low" | "Medium" | "High";

export interface ResearchNote {
  id: string;
  title: string;
  category: NoteCategory;
  priority: NotePriority;
  content: string;
  tags: string[];
  createdAt: string;
}

export interface Citation {
  id: string;
  author: string;
  year: string;
  title: string;
  journal: string;
  volumeIssue: string;
  doiUrl: string;
  keyFinding: string;
  format: "AMA" | "APA";
}

// ─── Constants ────────────────────────────────────────────────────────────────

export const SCENARIO_CATEGORIES: ScenarioCategory[] = [
  "CEA Analysis",
  "APM Modeling",
  "Risk Stratification",
  "Population Health",
  "Policy Analysis",
  "Financial Audit",
  "Quality Optimization",
];

export const SECTION_TYPES: ReportSectionType[] = [
  "Executive Summary",
  "Background",
  "Methodology",
  "Findings",
  "Recommendations",
  "Appendix",
];

export const REPORT_TEMPLATES: Record<string, { label: string; sections: ReportSectionType[] }> = {
  cea: {
    label: "CEA Research Brief",
    sections: ["Background", "Clinical Question", "Methodology", "ICER Results", "WTP Assessment", "Conclusions"],
  },
  policy: {
    label: "Policy Impact Analysis",
    sections: ["Policy Background", "Affected Stakeholders", "Financial Impact", "Equity Considerations", "Recommendations"],
  },
  market: {
    label: "Market Feasibility Study",
    sections: ["Executive Summary", "Market Overview", "Competitive Landscape", "Financial Projections", "Go/No-Go Recommendation"],
  },
  apm: {
    label: "APM Performance Review",
    sections: ["Model Description", "Financial Results", "Quality Results", "Lessons Learned", "Next Steps"],
  },
};

export const COMP_TEMPLATES: Record<string, { label: string; dimensions: { name: string; unit: string }[] }> = {
  payment: {
    label: "Payment Model Comparison",
    dimensions: [
      { name: "Net ACO Position", unit: "$M" },
      { name: "Shared Savings %", unit: "%" },
      { name: "Risk Level", unit: "score" },
      { name: "Quality Requirements", unit: "measures" },
      { name: "Admin Burden", unit: "FTEs" },
    ],
  },
  vendor: {
    label: "Technology Vendor Comparison",
    dimensions: [
      { name: "Total Cost 3yr", unit: "$M" },
      { name: "Implementation Timeline", unit: "months" },
      { name: "Integration Complexity", unit: "score" },
      { name: "Uptime SLA", unit: "%" },
      { name: "User Satisfaction Score", unit: "/10" },
    ],
  },
  cea: {
    label: "Intervention CEA Comparison",
    dimensions: [
      { name: "ICER", unit: "$/QALY" },
      { name: "QALYs Gained", unit: "QALYs" },
      { name: "Budget Impact", unit: "$M" },
      { name: "Equity Impact", unit: "score" },
      { name: "Feasibility", unit: "score" },
    ],
  },
};

export const NOTE_CATEGORIES: NoteCategory[] = [
  "Method Note",
  "Data Finding",
  "Assumption",
  "Limitation",
  "Citation",
  "Todo",
  "Question",
];

// ─── Sample Data ──────────────────────────────────────────────────────────────

export const SAMPLE_SCENARIOS: Scenario[] = [
  {
    id: "sc-1",
    name: "Vermont Medicaid Expansion Impact — FY2025",
    description: "Longitudinal analysis of Medicaid expansion on coverage rates, ED utilization, and state budget impact for FY2025.",
    category: "Policy Analysis",
    tags: ["medicaid", "vermont", "expansion", "fy2025"],
    status: "Final",
    createdAt: "2025-01-15T09:00:00Z",
    annotations: [],
  },
  {
    id: "sc-2",
    name: "CHF Remote Monitoring Program ROI",
    description: "Cost-effectiveness evaluation of remote cardiac monitoring for CHF patients across Vermont regional hospitals.",
    category: "CEA Analysis",
    tags: ["chf", "remote-monitoring", "roi", "cardiac"],
    status: "In Review",
    createdAt: "2025-02-03T14:30:00Z",
    annotations: [],
  },
  {
    id: "sc-3",
    name: "ACO REACH Shared Savings Projection",
    description: "Five-year shared savings trajectory modeling for ACO REACH participation under standard and high-risk tracks.",
    category: "APM Modeling",
    tags: ["aco-reach", "shared-savings", "cms", "apm"],
    status: "Draft",
    createdAt: "2025-02-20T11:15:00Z",
    annotations: [],
  },
];

export const SAMPLE_NOTES: ResearchNote[] = [
  {
    id: "note-1",
    title: "HbA1c reduction may not reach minimally important difference threshold",
    category: "Limitation",
    priority: "High",
    content: "A 0.5% reduction in HbA1c, while statistically significant in the trial data, may fall below the 0.75% threshold commonly cited as the minimally important clinical difference. This should be disclosed in the limitations section.",
    tags: ["hba1c", "mid", "diabetes"],
    createdAt: "2025-02-01T10:00:00Z",
  },
  {
    id: "note-2",
    title: "Check ICER 2024 update on GLP-1 pricing",
    category: "Todo",
    priority: "Medium",
    content: "ICER released an updated evidence report on GLP-1 receptor agonists in late 2024. Verify if new price benchmarks change our ICER calculations for the obesity intervention model.",
    tags: ["glp-1", "icer", "pricing"],
    createdAt: "2025-02-05T15:45:00Z",
  },
  {
    id: "note-3",
    title: "Vermont APCD data access requires DUA",
    category: "Data Finding",
    priority: "High",
    content: "Confirmed with GMCB staff: access to Vermont All-Payer Claims Database (APCD) requires execution of a formal Data Use Agreement. Processing time is typically 6–8 weeks. Budget accordingly for project timeline.",
    tags: ["apcd", "dua", "vermont", "data-access"],
    createdAt: "2025-02-08T09:20:00Z",
  },
  {
    id: "note-4",
    title: "Monte Carlo sample size: 1,000 iterations sufficient for PSA",
    category: "Method Note",
    priority: "Low",
    content: "Internal validation confirmed that 1,000 Monte Carlo iterations produces stable PSA results for our CEA model (SE < 2% across all ICER estimates). No need to increase to 10,000 for this analysis.",
    tags: ["monte-carlo", "psa", "cea", "methods"],
    createdAt: "2025-02-12T13:30:00Z",
  },
  {
    id: "note-5",
    title: "CMS confirmed 2025 FMAP rate at 52.47% for Vermont",
    category: "Data Finding",
    priority: "Medium",
    content: "Per CMS Federal Register publication, Vermont's Federal Medical Assistance Percentage (FMAP) for FY2025 is confirmed at 52.47%. Use this rate for all Medicaid financial modeling in the current project cycle.",
    tags: ["fmap", "vermont", "cms", "medicaid"],
    createdAt: "2025-02-18T11:00:00Z",
  },
];


// ─── Pure helpers ─────────────────────────────────────────────────────────────

export function uid() {
  return `id-${Math.random().toString(36).slice(2, 9)}`;
}

export function fmtDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export function wordCount(text: string) {
  return text.trim().split(/\s+/).filter((w) => w.length > 0).length;
}
