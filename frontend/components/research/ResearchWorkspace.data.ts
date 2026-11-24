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
  | "Next Steps"
  | "Pillar Readiness Scores"
  | "Dependency Gates"
  | "Binding Constraint"
  | "Equity Imperative Test"
  | "Sequenced Action Plan";

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

export const REPORT_TEMPLATES: Record<string, {
  label: string;
  sections: ReportSectionType[];
  /** Optional starter text per section — used by the book-framework templates to pose the question each section must answer. */
  prompts?: Partial<Record<ReportSectionType, string>>;
}> = {
  fivePillar: {
    label: "Five-Pillar Sequencing Analysis (the book's framework)",
    sections: ["Executive Summary", "Pillar Readiness Scores", "Dependency Gates", "Binding Constraint", "Equity Imperative Test", "Sequenced Action Plan"],
    prompts: {
      "Executive Summary": "In one paragraph: is this organization (or state) building its pillars in dependency order, and if not, which gate is it ahead of? (Book Ch. 1 §1.8)",
      "Pillar Readiness Scores": "Score each pillar 0-100 with your own numbers, answering its diagnostic question: Policy — is it permissible? Technology — is it possible? Economics — is it sustainable? Clinical — is it effective? Operations — is it executable? Run the scores on the HTR Simulator (/htr-simulator) and paste the delivered composite here.",
      "Dependency Gates": "For each of the nine dependencies (Ch. 1 §1.4), state whether the upstream pillar is delivering the currency the downstream one needs: Policy → AUTHORITY, Technology → INFORMATION, Economics → INCENTIVES, Clinical → OUTCOMES, Operations → CAPACITY. Mark each gate open, partial, or closed.",
      "Binding Constraint": "Name the one pillar whose improvement lifts delivered readiness most (the Friction Index finds it by sensitivity — /transformation-friction-index). Explain why it outranks the lowest-scoring pillar if they differ.",
      "Equity Imperative Test": "For each pillar, does the design close gaps or only raise the average? Note any pillar that would penalize safety-net providers or widen a disparity (Ch. 10). Equity is a test of every pillar, not a sixth score.",
      "Sequenced Action Plan": "List actions in build order — Policy, Technology, Economics, Clinical, Operations — and flag any funded initiative that sits behind a closed gate (premature investment, Ch. 7 / Ch. 15).",
    },
  },
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
  fivePillar: {
    label: "Five-Pillar Readiness Comparison (the book's framework)",
    dimensions: [
      { name: "Policy readiness — is it permissible?", unit: "0-100" },
      { name: "Technology readiness — is it possible?", unit: "0-100" },
      { name: "Economics readiness — is it sustainable?", unit: "0-100" },
      { name: "Clinical readiness — is it effective?", unit: "0-100" },
      { name: "Operations readiness — is it executable?", unit: "0-100" },
      { name: "Delivered composite after dependency gates (HTR Simulator)", unit: "0-100" },
      { name: "Equity Imperative — gaps closed, not averaged", unit: "pass/fail" },
    ],
  },
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
    description: "Shared savings modeling for ACO REACH under its Professional and Global risk options — REACH ends after performance year 2026; CMS's LEAD model follows from January 2027.",
    category: "APM Modeling",
    tags: ["aco-reach", "shared-savings", "cms", "apm"],
    status: "Draft",
    createdAt: "2025-02-20T11:15:00Z",
    annotations: [],
  },
];

// Example notes shown in a new workspace. They are illustrations of how to use the
// tool, so they must not assert facts that are not sourced in the note itself.
// (Rewritten 2026-11-23: earlier examples claimed an unsourced "confirmed with GMCB staff"
// timeline, an unverified FMAP rate, and a misdated ICER report.)
export const SAMPLE_NOTES: ResearchNote[] = [
  {
    id: "note-1",
    title: "Separate statistical from clinical significance",
    category: "Limitation",
    priority: "High",
    content: "A result can be statistically significant and still smaller than the minimal clinically important difference for the outcome. State the MCID you are using, cite where it comes from, and say whether the effect clears it.",
    tags: ["mcid", "limitations", "methods"],
    createdAt: "2026-11-01T10:00:00Z",
  },
  {
    id: "note-2",
    title: "Use ICER's December 2025 obesity report for GLP-1 inputs",
    category: "Todo",
    priority: "Medium",
    content: "ICER's final obesity report (Dec 16, 2025) estimates $66,355/QALY for injectable semaglutide and $57,779/QALY for tirzepatide versus lifestyle modification, at SSR Health net prices of $6,830 and $7,973 a year. Check our price inputs against these before reporting. Source: icer.org/assessment/obesity-2025",
    tags: ["glp-1", "icer", "pricing"],
    createdAt: "2026-11-05T15:45:00Z",
  },
  {
    id: "note-3",
    title: "Plan for VHCURES data access and claims run-out",
    category: "Data Finding",
    priority: "High",
    content: "VHCURES (the GMCB's all-payer claims database) is collected quarterly with roughly a six-month claims run-out, so the most recent quarters are incomplete. Self-funded ERISA plans report only voluntarily since Gobeille v. Liberty Mutual (2016). Check the GMCB's current data-release requirements before fixing a timeline.",
    tags: ["vhcures", "apcd", "vermont", "data-access"],
    createdAt: "2026-11-08T09:20:00Z",
  },
  {
    id: "note-4",
    title: "Test PSA stability before choosing an iteration count",
    category: "Method Note",
    priority: "Low",
    content: "Run the probabilistic sensitivity analysis at 1,000 and 10,000 iterations and compare the mean ICER and the probability cost-effective at your threshold. Report the count you used and the check you ran.",
    tags: ["monte-carlo", "psa", "cea", "methods"],
    createdAt: "2026-11-12T13:30:00Z",
  },
  {
    id: "note-5",
    title: "Take the FMAP from the Federal Register for the modeled year",
    category: "Data Finding",
    priority: "Medium",
    content: "Vermont's Federal Medical Assistance Percentage changes every federal fiscal year. Use the rate HHS publishes in the Federal Register for the year being modeled, and note it in the assumptions table.",
    tags: ["fmap", "vermont", "medicaid", "assumptions"],
    createdAt: "2026-11-15T11:00:00Z",
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
