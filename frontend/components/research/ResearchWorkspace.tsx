"use client";

import { useState, useMemo, useCallback, useEffect } from "react";
import {
  Plus,
  Trash2,
  Copy,
  ChevronDown,
  ChevronUp,
  FileText,
  BarChart2,
  StickyNote,
  FolderOpen,
  Tag,
  Calendar,
  CheckCircle,
  Clock,
  AlertCircle,
  Download,
  Eye,
  EyeOff,
  ArrowUp,
  ArrowDown,
  Star,
  Search,
  Filter,
  BookOpen,
  X,
  MessageSquare,
  Award,
  Clipboard,
  ChevronRight,
} from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────────

type ScenarioStatus = "Draft" | "In Review" | "Final";
type ScenarioCategory =
  | "CEA Analysis"
  | "APM Modeling"
  | "Risk Stratification"
  | "Population Health"
  | "Policy Analysis"
  | "Financial Audit"
  | "Quality Optimization";

interface Annotation {
  id: string;
  text: string;
  timestamp: string;
}

interface Scenario {
  id: string;
  name: string;
  description: string;
  category: ScenarioCategory;
  tags: string[];
  status: ScenarioStatus;
  createdAt: string;
  annotations: Annotation[];
}

type ReportSectionType =
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

interface ReportSection {
  id: string;
  type: ReportSectionType;
  title: string;
  content: string;
  visible: boolean;
}

interface ReportMeta {
  title: string;
  authors: string;
  organization: string;
  date: string;
  confidentiality: "Public" | "Internal" | "Confidential" | "Privileged & Confidential";
  version: string;
}

type CompDimension = {
  id: string;
  name: string;
  unit: string;
  values: Record<string, string>;
};

type CompScenario = {
  id: string;
  name: string;
  description: string;
  isWinner: boolean;
};

type NoteCategory =
  | "Method Note"
  | "Data Finding"
  | "Assumption"
  | "Limitation"
  | "Citation"
  | "Todo"
  | "Question";
type NotePriority = "Low" | "Medium" | "High";

interface ResearchNote {
  id: string;
  title: string;
  category: NoteCategory;
  priority: NotePriority;
  content: string;
  tags: string[];
  createdAt: string;
}

interface Citation {
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

const SCENARIO_CATEGORIES: ScenarioCategory[] = [
  "CEA Analysis",
  "APM Modeling",
  "Risk Stratification",
  "Population Health",
  "Policy Analysis",
  "Financial Audit",
  "Quality Optimization",
];

const SECTION_TYPES: ReportSectionType[] = [
  "Executive Summary",
  "Background",
  "Methodology",
  "Findings",
  "Recommendations",
  "Appendix",
];

const REPORT_TEMPLATES: Record<string, { label: string; sections: ReportSectionType[] }> = {
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

const COMP_TEMPLATES: Record<string, { label: string; dimensions: { name: string; unit: string }[] }> = {
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

const NOTE_CATEGORIES: NoteCategory[] = [
  "Method Note",
  "Data Finding",
  "Assumption",
  "Limitation",
  "Citation",
  "Todo",
  "Question",
];

// ─── Sample Data ──────────────────────────────────────────────────────────────

const SAMPLE_SCENARIOS: Scenario[] = [
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

const SAMPLE_NOTES: ResearchNote[] = [
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

// ─── Utility helpers ──────────────────────────────────────────────────────────

function uid() {
  return Math.random().toString(36).slice(2, 10) + Date.now().toString(36);
}

function fmtDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

function wordCount(text: string) {
  return text.trim() === "" ? 0 : text.trim().split(/\s+/).length;
}

function useLocalStorage<T>(key: string, initial: T): [T, (v: T) => void] {
  const [state, setState] = useState<T>(() => {
    if (typeof window === "undefined") return initial;
    try {
      const stored = localStorage.getItem(key);
      return stored ? (JSON.parse(stored) as T) : initial;
    } catch {
      return initial;
    }
  });
  const set = useCallback(
    (v: T) => {
      setState(v);
      try {
        localStorage.setItem(key, JSON.stringify(v));
      } catch {}
    },
    [key]
  );
  return [state, set];
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function StatusBadge({ status }: { status: ScenarioStatus }) {
  const styles: Record<ScenarioStatus, string> = {
    Draft: "bg-slate-100 text-slate-600",
    "In Review": "bg-amber-100 text-amber-700",
    Final: "bg-emerald-100 text-emerald-700",
  };
  const icons: Record<ScenarioStatus, React.ReactNode> = {
    Draft: <Clock className="w-3 h-3" />,
    "In Review": <AlertCircle className="w-3 h-3" />,
    Final: <CheckCircle className="w-3 h-3" />,
  };
  return (
    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${styles[status]}`}>
      {icons[status]}
      {status}
    </span>
  );
}

function PriorityDot({ priority }: { priority: NotePriority }) {
  const colors: Record<NotePriority, string> = {
    Low: "bg-slate-400",
    Medium: "bg-amber-400",
    High: "bg-rose-500",
  };
  return (
    <span className="inline-flex items-center gap-1.5">
      <span className={`w-2 h-2 rounded-full inline-block ${colors[priority]}`} />
      <span className="text-xs text-slate-500">{priority}</span>
    </span>
  );
}

function CategoryBadge({ category }: { category: string }) {
  const colorMap: Record<string, string> = {
    "Method Note": "bg-violet-100 text-violet-700",
    "Data Finding": "bg-sky-100 text-sky-700",
    Assumption: "bg-orange-100 text-orange-700",
    Limitation: "bg-rose-100 text-rose-700",
    Citation: "bg-teal-100 text-teal-700",
    Todo: "bg-amber-100 text-amber-700",
    Question: "bg-indigo-100 text-indigo-700",
    "CEA Analysis": "bg-sky-100 text-sky-700",
    "APM Modeling": "bg-indigo-100 text-indigo-700",
    "Risk Stratification": "bg-rose-100 text-rose-700",
    "Population Health": "bg-emerald-100 text-emerald-700",
    "Policy Analysis": "bg-amber-100 text-amber-700",
    "Financial Audit": "bg-teal-100 text-teal-700",
    "Quality Optimization": "bg-violet-100 text-violet-700",
  };
  const cls = colorMap[category] ?? "bg-slate-100 text-slate-600";
  return (
    <span className={`inline-flex px-2 py-0.5 rounded-full text-xs font-medium ${cls}`}>
      {category}
    </span>
  );
}

// ─── TAB 1: Scenario Manager ──────────────────────────────────────────────────

function ScenarioManager() {
  const [scenarios, setScenarios] = useLocalStorage<Scenario[]>("rw:scenarios", SAMPLE_SCENARIOS);
  const [showForm, setShowForm] = useState(false);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [annotationInputs, setAnnotationInputs] = useState<Record<string, string>>({});
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [showComparison, setShowComparison] = useState(false);

  const [form, setForm] = useState({
    name: "",
    description: "",
    category: "CEA Analysis" as ScenarioCategory,
    tags: "",
    status: "Draft" as ScenarioStatus,
  });

  const handleCreate = useCallback(() => {
    if (!form.name.trim()) return;
    const newS: Scenario = {
      id: uid(),
      name: form.name.trim(),
      description: form.description.trim(),
      category: form.category,
      tags: form.tags
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean),
      status: form.status,
      createdAt: new Date().toISOString(),
      annotations: [],
    };
    setScenarios([newS, ...scenarios]);
    setForm({ name: "", description: "", category: "CEA Analysis", tags: "", status: "Draft" });
    setShowForm(false);
  }, [form, scenarios, setScenarios]);

  const handleDuplicate = useCallback(
    (s: Scenario) => {
      const copy: Scenario = {
        ...s,
        id: uid(),
        name: s.name + " (Copy)",
        status: "Draft",
        createdAt: new Date().toISOString(),
        annotations: [],
      };
      setScenarios([copy, ...scenarios]);
    },
    [scenarios, setScenarios]
  );

  const handleDelete = useCallback(
    (id: string) => {
      setScenarios(scenarios.filter((s) => s.id !== id));
      setSelectedIds((prev) => prev.filter((x) => x !== id));
    },
    [scenarios, setScenarios]
  );

  const handleAnnotation = useCallback(
    (id: string) => {
      const text = (annotationInputs[id] ?? "").trim();
      if (!text) return;
      setScenarios(
        scenarios.map((s) =>
          s.id === id
            ? {
                ...s,
                annotations: [
                  ...s.annotations,
                  { id: uid(), text, timestamp: new Date().toISOString() },
                ],
              }
            : s
        )
      );
      setAnnotationInputs((prev) => ({ ...prev, [id]: "" }));
    },
    [annotationInputs, scenarios, setScenarios]
  );

  const toggleSelect = useCallback(
    (id: string) => {
      if (selectedIds.includes(id)) {
        setSelectedIds(selectedIds.filter((x) => x !== id));
      } else if (selectedIds.length < 3) {
        setSelectedIds([...selectedIds, id]);
      }
    },
    [selectedIds]
  );

  const selectedScenarios = useMemo(
    () => scenarios.filter((s) => selectedIds.includes(s.id)),
    [scenarios, selectedIds]
  );

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-base font-semibold text-slate-800">Analysis Scenario Manager</h2>
          <p className="text-sm text-slate-500 mt-0.5">Save, organize, and compare analysis configurations</p>
        </div>
        <div className="flex gap-2">
          {selectedIds.length >= 2 && (
            <button
              onClick={() => setShowComparison(!showComparison)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700 transition-colors"
            >
              <BarChart2 className="w-4 h-4" />
              Compare ({selectedIds.length})
            </button>
          )}
          <button
            onClick={() => setShowForm(!showForm)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-800 text-white rounded-lg text-sm font-medium hover:bg-slate-700 transition-colors"
          >
            <Plus className="w-4 h-4" />
            New Scenario
          </button>
        </div>
      </div>

      {/* New Scenario Form */}
      {showForm && (
        <div className="border border-slate-200 rounded-xl bg-slate-50 p-4 space-y-3">
          <h3 className="text-sm font-semibold text-slate-700">New Analysis Scenario</h3>
          <input
            className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-indigo-300"
            placeholder="Scenario name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
          <textarea
            className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-indigo-300 h-20 resize-none"
            placeholder="Brief description of this analysis..."
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
          />
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-medium text-slate-600 mb-1 block">Category</label>
              <select
                className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-indigo-300"
                value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value as ScenarioCategory })}
              >
                {SCENARIO_CATEGORIES.map((c) => (
                  <option key={c}>{c}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-xs font-medium text-slate-600 mb-1 block">Status</label>
              <select
                className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-indigo-300"
                value={form.status}
                onChange={(e) => setForm({ ...form, status: e.target.value as ScenarioStatus })}
              >
                <option>Draft</option>
                <option>In Review</option>
                <option>Final</option>
              </select>
            </div>
          </div>
          <input
            className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-indigo-300"
            placeholder="Tags (comma-separated)"
            value={form.tags}
            onChange={(e) => setForm({ ...form, tags: e.target.value })}
          />
          <div className="flex gap-2 pt-1">
            <button
              onClick={handleCreate}
              className="px-4 py-1.5 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700 transition-colors"
            >
              Save Scenario
            </button>
            <button
              onClick={() => setShowForm(false)}
              className="px-4 py-1.5 bg-white border border-slate-200 text-slate-600 rounded-lg text-sm hover:bg-slate-50 transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Comparison hint */}
      {!showComparison && (
        <p className="text-xs text-slate-400 flex items-center gap-1">
          <CheckCircle className="w-3.5 h-3.5" />
          Select 2–3 scenarios to compare side-by-side
        </p>
      )}

      {/* Side-by-side comparison table */}
      {showComparison && selectedScenarios.length >= 2 && (
        <div className="border border-indigo-200 rounded-xl bg-indigo-50 p-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-semibold text-indigo-800">Scenario Comparison</h3>
            <button onClick={() => setShowComparison(false)} className="text-indigo-400 hover:text-indigo-600">
              <X className="w-4 h-4" />
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr>
                  <th className="text-left py-2 pr-4 text-xs font-semibold text-slate-500 uppercase tracking-wide w-32">Field</th>
                  {selectedScenarios.map((s) => (
                    <th key={s.id} className="text-left py-2 px-3 text-xs font-semibold text-indigo-700 bg-white/60 rounded-lg">
                      {s.name}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-indigo-100">
                {(
                  [
                    ["Category", (s: Scenario) => s.category],
                    ["Status", (s: Scenario) => s.status],
                    ["Created", (s: Scenario) => fmtDate(s.createdAt)],
                    ["Tags", (s: Scenario) => s.tags.join(", ") || "—"],
                    ["Annotations", (s: Scenario) => String(s.annotations.length)],
                  ] as [string, (s: Scenario) => string][]
                ).map(([label, fn]) => (
                  <tr key={label}>
                    <td className="py-2 pr-4 text-xs font-medium text-slate-500">{label}</td>
                    {selectedScenarios.map((s) => (
                      <td key={s.id} className="py-2 px-3 text-sm text-slate-700">
                        {fn(s)}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Scenarios list */}
      <div className="space-y-2">
        {scenarios.map((s) => {
          const isExpanded = expandedId === s.id;
          const isSelected = selectedIds.includes(s.id);
          return (
            <div
              key={s.id}
              className={`border rounded-xl bg-white transition-all ${isSelected ? "border-indigo-300 ring-1 ring-indigo-200" : "border-slate-200"}`}
            >
              <div className="flex items-start gap-3 p-4">
                {/* Select checkbox */}
                <button
                  onClick={() => toggleSelect(s.id)}
                  className={`mt-0.5 flex-shrink-0 w-4 h-4 rounded border-2 transition-colors ${isSelected ? "bg-indigo-500 border-indigo-500" : "border-slate-300 hover:border-indigo-400"}`}
                  title={isSelected ? "Deselect" : "Select for comparison"}
                >
                  {isSelected && (
                    <svg viewBox="0 0 12 12" className="w-full h-full text-white" fill="currentColor">
                      <path d="M2 6l3 3 5-5" stroke="white" strokeWidth="2" fill="none" strokeLinecap="round" />
                    </svg>
                  )}
                </button>

                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0">
                      <h3 className="text-sm font-semibold text-slate-800 truncate">{s.name}</h3>
                      <p className="text-xs text-slate-500 mt-0.5 line-clamp-1">{s.description}</p>
                    </div>
                    <div className="flex items-center gap-2 flex-shrink-0">
                      <StatusBadge status={s.status} />
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-2 mt-2">
                    <CategoryBadge category={s.category} />
                    <span className="text-xs text-slate-400 flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {fmtDate(s.createdAt)}
                    </span>
                    {s.tags.map((t) => (
                      <span key={t} className="inline-flex items-center gap-0.5 text-xs text-slate-500 bg-slate-100 px-1.5 py-0.5 rounded">
                        <Tag className="w-2.5 h-2.5" />
                        {t}
                      </span>
                    ))}
                    {s.annotations.length > 0 && (
                      <span className="text-xs text-indigo-600 flex items-center gap-1">
                        <MessageSquare className="w-3 h-3" />
                        {s.annotations.length} note{s.annotations.length !== 1 ? "s" : ""}
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-1 flex-shrink-0">
                  <button
                    onClick={() => setExpandedId(isExpanded ? null : s.id)}
                    className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
                    title="View notes"
                  >
                    {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </button>
                  <button
                    onClick={() => handleDuplicate(s)}
                    className="p-1.5 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
                    title="Duplicate"
                  >
                    <Copy className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(s.id)}
                    className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                    title="Delete"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Expanded: annotations */}
              {isExpanded && (
                <div className="border-t border-slate-100 px-4 pb-4 pt-3 space-y-3">
                  <h4 className="text-xs font-semibold text-slate-600 uppercase tracking-wide flex items-center gap-1.5">
                    <MessageSquare className="w-3.5 h-3.5" />
                    Annotations
                  </h4>
                  {s.annotations.length === 0 && (
                    <p className="text-xs text-slate-400 italic">No annotations yet.</p>
                  )}
                  <div className="space-y-2">
                    {s.annotations.map((ann) => (
                      <div key={ann.id} className="bg-amber-50 border border-amber-100 rounded-lg px-3 py-2">
                        <p className="text-sm text-slate-700">{ann.text}</p>
                        <p className="text-xs text-slate-400 mt-1">{fmtDate(ann.timestamp)}</p>
                      </div>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <input
                      className="flex-1 border border-slate-200 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300"
                      placeholder="Add an annotation..."
                      value={annotationInputs[s.id] ?? ""}
                      onChange={(e) =>
                        setAnnotationInputs((prev) => ({ ...prev, [s.id]: e.target.value }))
                      }
                      onKeyDown={(e) => e.key === "Enter" && handleAnnotation(s.id)}
                    />
                    <button
                      onClick={() => handleAnnotation(s.id)}
                      className="px-3 py-1.5 bg-amber-500 text-white rounded-lg text-sm hover:bg-amber-600 transition-colors"
                    >
                      Add
                    </button>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ─── TAB 2: Report Builder ────────────────────────────────────────────────────

function ReportBuilder() {
  const [sections, setSections] = useLocalStorage<ReportSection[]>("rw:report-sections", []);
  const [meta, setMeta] = useLocalStorage<ReportMeta>("rw:report-meta", {
    title: "Research Report",
    authors: "",
    organization: "Vermont Health Platform",
    date: new Date().toISOString().split("T")[0],
    confidentiality: "Internal",
    version: "1.0",
  });
  const [showPreview, setShowPreview] = useState(false);
  const [newSectionType, setNewSectionType] = useState<ReportSectionType>("Executive Summary");
  const [toast, setToast] = useState<string | null>(null);

  const showToast = useCallback((msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 2500);
  }, []);

  const addSection = useCallback(() => {
    const s: ReportSection = {
      id: uid(),
      type: newSectionType,
      title: newSectionType,
      content: "",
      visible: true,
    };
    setSections([...sections, s]);
  }, [newSectionType, sections, setSections]);

  const loadTemplate = useCallback(
    (key: string) => {
      const tpl = REPORT_TEMPLATES[key];
      if (!tpl) return;
      const newSections: ReportSection[] = tpl.sections.map((t) => ({
        id: uid(),
        type: t,
        title: t,
        content: "",
        visible: true,
      }));
      setSections(newSections);
    },
    [setSections]
  );

  const updateSection = useCallback(
    (id: string, patch: Partial<ReportSection>) => {
      setSections(sections.map((s) => (s.id === id ? { ...s, ...patch } : s)));
    },
    [sections, setSections]
  );

  const deleteSection = useCallback(
    (id: string) => {
      setSections(sections.filter((s) => s.id !== id));
    },
    [sections, setSections]
  );

  const moveSection = useCallback(
    (id: string, dir: -1 | 1) => {
      const idx = sections.findIndex((s) => s.id === id);
      if (idx < 0) return;
      const next = idx + dir;
      if (next < 0 || next >= sections.length) return;
      const arr = [...sections];
      [arr[idx], arr[next]] = [arr[next], arr[idx]];
      setSections(arr);
    },
    [sections, setSections]
  );

  const buildMarkdown = useCallback(() => {
    const conf = meta.confidentiality !== "Public" ? `**${meta.confidentiality.toUpperCase()}**\n\n` : "";
    const header = `# ${meta.title}\n\n**Author(s):** ${meta.authors || "—"}  \n**Organization:** ${meta.organization}  \n**Date:** ${meta.date}  \n**Version:** ${meta.version}  \n\n${conf}---\n\n`;
    const body = sections
      .filter((s) => s.visible)
      .map((s) => `## ${s.title}\n\n${s.content || "*[No content]*"}`)
      .join("\n\n---\n\n");
    return header + body;
  }, [meta, sections]);

  const copyMarkdown = useCallback(() => {
    navigator.clipboard.writeText(buildMarkdown()).then(() => showToast("Copied as Markdown"));
  }, [buildMarkdown, showToast]);

  const downloadTxt = useCallback(() => {
    const blob = new Blob([buildMarkdown()], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = (meta.title || "report").replace(/\s+/g, "_") + ".txt";
    a.click();
    URL.revokeObjectURL(url);
    showToast("Downloaded as .txt");
  }, [buildMarkdown, meta.title, showToast]);

  const confColors: Record<string, string> = {
    Public: "text-emerald-600 bg-emerald-50",
    Internal: "text-slate-600 bg-slate-100",
    Confidential: "text-amber-700 bg-amber-50",
    "Privileged & Confidential": "text-rose-700 bg-rose-50",
  };

  return (
    <div className="space-y-5">
      {toast && (
        <div className="fixed top-4 right-4 z-50 bg-slate-800 text-white text-sm px-4 py-2 rounded-lg shadow-lg">
          {toast}
        </div>
      )}

      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-base font-semibold text-slate-800">Report Builder</h2>
          <p className="text-sm text-slate-500 mt-0.5">Compose and export structured research reports</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={copyMarkdown}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 border border-slate-200 text-slate-600 rounded-lg text-sm hover:bg-slate-50 transition-colors"
          >
            <Clipboard className="w-4 h-4" />
            Copy Markdown
          </button>
          <button
            onClick={downloadTxt}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 border border-slate-200 text-slate-600 rounded-lg text-sm hover:bg-slate-50 transition-colors"
          >
            <Download className="w-4 h-4" />
            Download .txt
          </button>
          <button
            onClick={() => setShowPreview(!showPreview)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-800 text-white rounded-lg text-sm font-medium hover:bg-slate-700 transition-colors"
          >
            <Eye className="w-4 h-4" />
            {showPreview ? "Edit Mode" : "Preview"}
          </button>
        </div>
      </div>

      {/* Preview mode */}
      {showPreview ? (
        <div className="border border-slate-200 rounded-xl bg-white p-8 max-w-3xl mx-auto shadow-sm">
          {meta.confidentiality !== "Public" && (
            <div className={`text-center text-xs font-bold tracking-widest uppercase mb-6 py-1 rounded ${confColors[meta.confidentiality]}`}>
              {meta.confidentiality}
            </div>
          )}
          <h1 className="text-2xl font-bold text-slate-900 mb-2">{meta.title || "Untitled Report"}</h1>
          <div className="text-sm text-slate-500 space-y-0.5 mb-6 pb-6 border-b border-slate-100">
            {meta.authors && <p><strong>Author(s):</strong> {meta.authors}</p>}
            <p><strong>Organization:</strong> {meta.organization}</p>
            <p><strong>Date:</strong> {meta.date}</p>
            <p><strong>Version:</strong> {meta.version}</p>
          </div>
          {sections.filter((s) => s.visible).map((s) => (
            <div key={s.id} className="mb-8">
              <h2 className="text-lg font-semibold text-slate-800 border-b border-slate-100 pb-2 mb-3">{s.title}</h2>
              <div className="text-sm text-slate-700 whitespace-pre-wrap leading-relaxed">
                {s.content || <em className="text-slate-400">No content provided.</em>}
              </div>
            </div>
          ))}
          {sections.filter((s) => s.visible).length === 0 && (
            <p className="text-slate-400 text-sm italic text-center py-8">No sections added yet.</p>
          )}
        </div>
      ) : (
        <>
          {/* Report metadata */}
          <div className="border border-slate-200 rounded-xl bg-slate-50 p-4 space-y-3">
            <h3 className="text-sm font-semibold text-slate-700">Report Metadata</h3>
            <div className="grid grid-cols-2 gap-3">
              <div className="col-span-2">
                <label className="text-xs font-medium text-slate-600 mb-1 block">Report Title</label>
                <input
                  className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-indigo-300"
                  value={meta.title}
                  onChange={(e) => setMeta({ ...meta, title: e.target.value })}
                />
              </div>
              <div>
                <label className="text-xs font-medium text-slate-600 mb-1 block">Author(s)</label>
                <input
                  className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-indigo-300"
                  value={meta.authors}
                  onChange={(e) => setMeta({ ...meta, authors: e.target.value })}
                />
              </div>
              <div>
                <label className="text-xs font-medium text-slate-600 mb-1 block">Organization</label>
                <input
                  className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-indigo-300"
                  value={meta.organization}
                  onChange={(e) => setMeta({ ...meta, organization: e.target.value })}
                />
              </div>
              <div>
                <label className="text-xs font-medium text-slate-600 mb-1 block">Date</label>
                <input
                  type="date"
                  className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-indigo-300"
                  value={meta.date}
                  onChange={(e) => setMeta({ ...meta, date: e.target.value })}
                />
              </div>
              <div>
                <label className="text-xs font-medium text-slate-600 mb-1 block">Version</label>
                <input
                  className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-indigo-300"
                  value={meta.version}
                  onChange={(e) => setMeta({ ...meta, version: e.target.value })}
                />
              </div>
              <div className="col-span-2">
                <label className="text-xs font-medium text-slate-600 mb-1 block">Confidentiality</label>
                <select
                  className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-indigo-300"
                  value={meta.confidentiality}
                  onChange={(e) =>
                    setMeta({ ...meta, confidentiality: e.target.value as ReportMeta["confidentiality"] })
                  }
                >
                  <option>Public</option>
                  <option>Internal</option>
                  <option>Confidential</option>
                  <option>Privileged & Confidential</option>
                </select>
              </div>
            </div>
          </div>

          {/* Templates */}
          <div>
            <h3 className="text-xs font-semibold text-slate-600 uppercase tracking-wide mb-2">Load Template</h3>
            <div className="flex flex-wrap gap-2">
              {Object.entries(REPORT_TEMPLATES).map(([key, tpl]) => (
                <button
                  key={key}
                  onClick={() => loadTemplate(key)}
                  className="px-3 py-1.5 border border-slate-200 text-slate-600 rounded-lg text-xs hover:bg-indigo-50 hover:border-indigo-300 hover:text-indigo-700 transition-colors"
                >
                  {tpl.label}
                </button>
              ))}
            </div>
          </div>

          {/* Add section */}
          <div className="flex gap-2">
            <select
              className="flex-1 border border-slate-200 rounded-lg px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-indigo-300"
              value={newSectionType}
              onChange={(e) => setNewSectionType(e.target.value as ReportSectionType)}
            >
              {SECTION_TYPES.map((t) => (
                <option key={t}>{t}</option>
              ))}
            </select>
            <button
              onClick={addSection}
              className="inline-flex items-center gap-1.5 px-3 py-2 bg-slate-800 text-white rounded-lg text-sm hover:bg-slate-700 transition-colors"
            >
              <Plus className="w-4 h-4" />
              Add Section
            </button>
          </div>

          {/* Sections */}
          <div className="space-y-3">
            {sections.length === 0 && (
              <div className="text-center py-8 text-sm text-slate-400 border border-dashed border-slate-200 rounded-xl">
                No sections yet. Add a section or load a template above.
              </div>
            )}
            {sections.map((s, idx) => (
              <div key={s.id} className={`border rounded-xl bg-white ${s.visible ? "border-slate-200" : "border-slate-100 opacity-60"}`}>
                <div className="flex items-center gap-2 px-3 py-2 border-b border-slate-100">
                  <div className="flex flex-col gap-0.5">
                    <button
                      onClick={() => moveSection(s.id, -1)}
                      disabled={idx === 0}
                      className="p-0.5 text-slate-300 hover:text-slate-600 disabled:opacity-0 transition-colors"
                    >
                      <ArrowUp className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => moveSection(s.id, 1)}
                      disabled={idx === sections.length - 1}
                      className="p-0.5 text-slate-300 hover:text-slate-600 disabled:opacity-0 transition-colors"
                    >
                      <ArrowDown className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <input
                    className="flex-1 text-sm font-semibold text-slate-700 bg-transparent border-none outline-none"
                    value={s.title}
                    onChange={(e) => updateSection(s.id, { title: e.target.value })}
                  />
                  <button
                    onClick={() => updateSection(s.id, { visible: !s.visible })}
                    className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded transition-colors"
                    title={s.visible ? "Hide section" : "Show section"}
                  >
                    {s.visible ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
                  </button>
                  <button
                    onClick={() => deleteSection(s.id)}
                    className="p-1.5 text-slate-300 hover:text-rose-600 hover:bg-rose-50 rounded transition-colors"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
                {s.visible && (
                  <div className="p-3">
                    <textarea
                      className="w-full text-sm text-slate-700 bg-transparent border-none outline-none resize-none leading-relaxed"
                      rows={5}
                      placeholder={`Write the ${s.title} section...`}
                      value={s.content}
                      onChange={(e) => updateSection(s.id, { content: e.target.value })}
                    />
                    <div className="text-right text-xs text-slate-400 mt-1">
                      {wordCount(s.content)} words · {s.content.length} chars
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

// ─── TAB 3: Comparison Dashboard ─────────────────────────────────────────────

function colorCell(value: string, allValues: string[], unit: string): string {
  const nums = allValues.map((v) => parseFloat(v)).filter((n) => !isNaN(n));
  const n = parseFloat(value);
  if (nums.length < 2 || isNaN(n)) return "bg-slate-50 text-slate-700";
  const min = Math.min(...nums);
  const max = Math.max(...nums);
  if (min === max) return "bg-slate-50 text-slate-700";
  // Lower is better for cost-type dimensions
  const lowerIsBetter = ["cost", "timeline", "complexity", "burden", "admin", "icer", "budget"].some(
    (kw) => unit.toLowerCase().includes(kw) || kw.includes(unit.toLowerCase().slice(0, 4))
  );
  const isBest = lowerIsBetter ? n === min : n === max;
  const isWorst = lowerIsBetter ? n === max : n === min;
  if (isBest) return "bg-emerald-100 text-emerald-800 font-semibold";
  if (isWorst) return "bg-rose-100 text-rose-700";
  return "bg-amber-50 text-amber-700";
}

function ComparisonDashboard() {
  const [compScenarios, setCompScenarios] = useLocalStorage<CompScenario[]>("rw:comp-scenarios", [
    { id: "cs-1", name: "Option A", description: "", isWinner: false },
    { id: "cs-2", name: "Option B", description: "", isWinner: false },
  ]);
  const [dimensions, setDimensions] = useLocalStorage<CompDimension[]>("rw:comp-dims", []);
  const [toast, setToast] = useState<string | null>(null);
  const [newDimName, setNewDimName] = useState("");
  const [newDimUnit, setNewDimUnit] = useState("");

  const showToast = useCallback((msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 2500);
  }, []);

  const addScenario = useCallback(() => {
    if (compScenarios.length >= 4) return;
    const newS: CompScenario = { id: uid(), name: `Option ${String.fromCharCode(65 + compScenarios.length)}`, description: "", isWinner: false };
    setCompScenarios([...compScenarios, newS]);
  }, [compScenarios, setCompScenarios]);

  const removeScenario = useCallback(
    (id: string) => {
      setCompScenarios(compScenarios.filter((s) => s.id !== id));
      setDimensions(dimensions.map((d) => {
        const vals = { ...d.values };
        delete vals[id];
        return { ...d, values: vals };
      }));
    },
    [compScenarios, setCompScenarios, dimensions, setDimensions]
  );

  const updateScenario = useCallback(
    (id: string, patch: Partial<CompScenario>) => {
      setCompScenarios(compScenarios.map((s) => (s.id === id ? { ...s, ...patch } : s)));
    },
    [compScenarios, setCompScenarios]
  );

  const setWinner = useCallback(
    (id: string) => {
      setCompScenarios(compScenarios.map((s) => ({ ...s, isWinner: s.id === id ? !s.isWinner : false })));
    },
    [compScenarios, setCompScenarios]
  );

  const addDimension = useCallback(() => {
    if (!newDimName.trim()) return;
    const d: CompDimension = { id: uid(), name: newDimName.trim(), unit: newDimUnit.trim(), values: {} };
    setDimensions([...dimensions, d]);
    setNewDimName("");
    setNewDimUnit("");
  }, [newDimName, newDimUnit, dimensions, setDimensions]);

  const removeDimension = useCallback(
    (id: string) => {
      setDimensions(dimensions.filter((d) => d.id !== id));
    },
    [dimensions, setDimensions]
  );

  const updateDimValue = useCallback(
    (dimId: string, scenId: string, value: string) => {
      setDimensions(dimensions.map((d) =>
        d.id === dimId ? { ...d, values: { ...d.values, [scenId]: value } } : d
      ));
    },
    [dimensions, setDimensions]
  );

  const loadTemplate = useCallback(
    (key: string) => {
      const tpl = COMP_TEMPLATES[key];
      if (!tpl) return;
      const newDims: CompDimension[] = tpl.dimensions.map((d) => ({
        id: uid(),
        name: d.name,
        unit: d.unit,
        values: {},
      }));
      setDimensions(newDims);
    },
    [setDimensions]
  );

  const copyTable = useCallback(() => {
    const header = ["Dimension (Unit)", ...compScenarios.map((s) => s.name + (s.isWinner ? " ★" : ""))].join("\t");
    const rows = dimensions
      .map((d) =>
        [
          `${d.name} (${d.unit})`,
          ...compScenarios.map((s) => d.values[s.id] ?? "—"),
        ].join("\t")
      )
      .join("\n");
    navigator.clipboard.writeText(header + "\n" + rows).then(() => showToast("Table copied to clipboard"));
  }, [compScenarios, dimensions, showToast]);

  return (
    <div className="space-y-5">
      {toast && (
        <div className="fixed top-4 right-4 z-50 bg-slate-800 text-white text-sm px-4 py-2 rounded-lg shadow-lg">
          {toast}
        </div>
      )}

      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-base font-semibold text-slate-800">Scenario Comparison Dashboard</h2>
          <p className="text-sm text-slate-500 mt-0.5">Side-by-side quantitative comparison up to 4 alternatives</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={copyTable}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 border border-slate-200 text-slate-600 rounded-lg text-sm hover:bg-slate-50 transition-colors"
          >
            <Clipboard className="w-4 h-4" />
            Copy Table
          </button>
          {compScenarios.length < 4 && (
            <button
              onClick={addScenario}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-800 text-white rounded-lg text-sm font-medium hover:bg-slate-700 transition-colors"
            >
              <Plus className="w-4 h-4" />
              Add Alternative
            </button>
          )}
        </div>
      </div>

      {/* Templates */}
      <div>
        <h3 className="text-xs font-semibold text-slate-600 uppercase tracking-wide mb-2">Comparison Templates</h3>
        <div className="flex flex-wrap gap-2">
          {Object.entries(COMP_TEMPLATES).map(([key, tpl]) => (
            <button
              key={key}
              onClick={() => loadTemplate(key)}
              className="px-3 py-1.5 border border-slate-200 text-slate-600 rounded-lg text-xs hover:bg-indigo-50 hover:border-indigo-300 hover:text-indigo-700 transition-colors"
            >
              {tpl.label}
            </button>
          ))}
        </div>
      </div>

      {/* Scenarios header cards */}
      <div className={`grid gap-3 ${compScenarios.length === 2 ? "grid-cols-2" : compScenarios.length === 3 ? "grid-cols-3" : "grid-cols-4"}`}>
        {compScenarios.map((s) => (
          <div key={s.id} className={`border rounded-xl p-3 ${s.isWinner ? "border-emerald-300 bg-emerald-50" : "border-slate-200 bg-white"}`}>
            <div className="flex items-center justify-between mb-2">
              <button
                onClick={() => setWinner(s.id)}
                className={`p-1 rounded transition-colors ${s.isWinner ? "text-emerald-600" : "text-slate-300 hover:text-amber-400"}`}
                title="Mark as preferred"
              >
                <Award className="w-4 h-4" />
              </button>
              <button
                onClick={() => removeScenario(s.id)}
                className="p-1 text-slate-300 hover:text-rose-500 transition-colors"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
            <input
              className={`w-full text-sm font-semibold bg-transparent border-none outline-none ${s.isWinner ? "text-emerald-800" : "text-slate-800"}`}
              value={s.name}
              onChange={(e) => updateScenario(s.id, { name: e.target.value })}
              placeholder="Alternative name"
            />
            <input
              className="w-full text-xs text-slate-500 bg-transparent border-none outline-none mt-0.5"
              value={s.description}
              onChange={(e) => updateScenario(s.id, { description: e.target.value })}
              placeholder="Short description..."
            />
            {s.isWinner && (
              <div className="mt-2 text-xs font-medium text-emerald-700 flex items-center gap-1">
                <Star className="w-3 h-3 fill-emerald-500 text-emerald-500" />
                Preferred
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Comparison table */}
      {dimensions.length > 0 && (
        <div className="border border-slate-200 rounded-xl overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="text-left px-4 py-2.5 text-xs font-semibold text-slate-500 uppercase tracking-wide w-48">Dimension</th>
                <th className="text-left px-3 py-2.5 text-xs font-semibold text-slate-500 uppercase tracking-wide w-20">Unit</th>
                {compScenarios.map((s) => (
                  <th key={s.id} className="text-center px-3 py-2.5 text-xs font-semibold text-slate-700">
                    {s.name}
                    {s.isWinner && <Star className="w-3 h-3 inline ml-1 fill-amber-400 text-amber-400" />}
                  </th>
                ))}
                <th className="w-10" />
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {dimensions.map((d) => {
                const allVals = compScenarios.map((s) => d.values[s.id] ?? "");
                return (
                  <tr key={d.id} className="hover:bg-slate-50/50">
                    <td className="px-4 py-2 text-sm font-medium text-slate-700">{d.name}</td>
                    <td className="px-3 py-2 text-xs text-slate-500">{d.unit}</td>
                    {compScenarios.map((s) => {
                      const val = d.values[s.id] ?? "";
                      const cls = colorCell(val, allVals, d.name + " " + d.unit);
                      return (
                        <td key={s.id} className={`px-3 py-2 text-center ${cls}`}>
                          <input
                            className="w-full text-center bg-transparent border-none outline-none text-sm"
                            value={val}
                            onChange={(e) => updateDimValue(d.id, s.id, e.target.value)}
                            placeholder="—"
                          />
                        </td>
                      );
                    })}
                    <td className="px-2 py-2">
                      <button
                        onClick={() => removeDimension(d.id)}
                        className="p-1 text-slate-300 hover:text-rose-500 transition-colors"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {/* Add dimension */}
      <div className="flex gap-2">
        <input
          className="flex-1 border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300"
          placeholder="Dimension name (e.g., Total Cost)"
          value={newDimName}
          onChange={(e) => setNewDimName(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && addDimension()}
        />
        <input
          className="w-28 border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300"
          placeholder="Unit"
          value={newDimUnit}
          onChange={(e) => setNewDimUnit(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && addDimension()}
        />
        <button
          onClick={addDimension}
          className="inline-flex items-center gap-1.5 px-3 py-2 bg-slate-800 text-white rounded-lg text-sm hover:bg-slate-700 transition-colors"
        >
          <Plus className="w-4 h-4" />
          Add Row
        </button>
      </div>

      {dimensions.length === 0 && (
        <div className="text-center py-8 text-sm text-slate-400 border border-dashed border-slate-200 rounded-xl">
          Load a template or add a dimension row above to start comparing.
        </div>
      )}

      {/* Legend */}
      {dimensions.length > 0 && (
        <div className="flex items-center gap-4 text-xs text-slate-500">
          <span className="font-medium">Color key:</span>
          <span className="inline-flex items-center gap-1"><span className="w-3 h-3 rounded bg-emerald-100 border border-emerald-200 inline-block" /> Best value</span>
          <span className="inline-flex items-center gap-1"><span className="w-3 h-3 rounded bg-amber-50 border border-amber-200 inline-block" /> Middle</span>
          <span className="inline-flex items-center gap-1"><span className="w-3 h-3 rounded bg-rose-100 border border-rose-200 inline-block" /> Worst value</span>
        </div>
      )}
    </div>
  );
}

// ─── TAB 4: Research Notes ────────────────────────────────────────────────────

function formatAMA(c: Citation) {
  const doi = c.doiUrl ? ` doi:${c.doiUrl}` : "";
  return `${c.author}. ${c.title}. *${c.journal}*. ${c.year};${c.volumeIssue}.${doi}`;
}

function formatAPA(c: Citation) {
  const doi = c.doiUrl ? ` https://doi.org/${c.doiUrl}` : "";
  return `${c.author} (${c.year}). ${c.title}. *${c.journal}*, ${c.volumeIssue}.${doi}`;
}

function ResearchNotes() {
  const [notes, setNotes] = useLocalStorage<ResearchNote[]>("rw:notes", SAMPLE_NOTES);
  const [citations, setCitations] = useLocalStorage<Citation[]>("rw:citations", []);
  const [showNoteForm, setShowNoteForm] = useState(false);
  const [showCitForm, setShowCitForm] = useState(false);
  const [filterCat, setFilterCat] = useState<NoteCategory | "All">("All");
  const [filterPri, setFilterPri] = useState<NotePriority | "All">("All");
  const [sortBy, setSortBy] = useState<"date" | "priority" | "category">("date");
  const [search, setSearch] = useState("");
  const [toast, setToast] = useState<string | null>(null);
  const [citFormat, setCitFormat] = useState<"AMA" | "APA">("AMA");

  const [noteForm, setNoteForm] = useState({
    title: "",
    category: "Method Note" as NoteCategory,
    priority: "Medium" as NotePriority,
    content: "",
    tags: "",
  });

  const [citForm, setCitForm] = useState({
    author: "",
    year: "",
    title: "",
    journal: "",
    volumeIssue: "",
    doiUrl: "",
    keyFinding: "",
    format: "AMA" as "AMA" | "APA",
  });

  const showToast = useCallback((msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 2500);
  }, []);

  const addNote = useCallback(() => {
    if (!noteForm.title.trim()) return;
    const n: ResearchNote = {
      id: uid(),
      title: noteForm.title.trim(),
      category: noteForm.category,
      priority: noteForm.priority,
      content: noteForm.content.trim(),
      tags: noteForm.tags.split(",").map((t) => t.trim()).filter(Boolean),
      createdAt: new Date().toISOString(),
    };
    setNotes([n, ...notes]);
    setNoteForm({ title: "", category: "Method Note", priority: "Medium", content: "", tags: "" });
    setShowNoteForm(false);
  }, [noteForm, notes, setNotes]);

  const deleteNote = useCallback(
    (id: string) => {
      setNotes(notes.filter((n) => n.id !== id));
    },
    [notes, setNotes]
  );

  const addCitation = useCallback(() => {
    if (!citForm.title.trim() || !citForm.author.trim()) return;
    const c: Citation = { ...citForm, id: uid() };
    setCitations([c, ...citations]);
    setCitForm({ author: "", year: "", title: "", journal: "", volumeIssue: "", doiUrl: "", keyFinding: "", format: "AMA" });
    setShowCitForm(false);
  }, [citForm, citations, setCitations]);

  const deleteCitation = useCallback(
    (id: string) => {
      setCitations(citations.filter((c) => c.id !== id));
    },
    [citations, setCitations]
  );

  const copyCitations = useCallback(() => {
    const text = citations
      .map((c) => (citFormat === "AMA" ? formatAMA(c) : formatAPA(c)))
      .join("\n\n");
    navigator.clipboard.writeText(text).then(() => showToast("Citations copied"));
  }, [citations, citFormat, showToast]);

  const priorityOrder: Record<NotePriority, number> = { High: 0, Medium: 1, Low: 2 };

  const filteredNotes = useMemo(() => {
    let out = notes;
    if (filterCat !== "All") out = out.filter((n) => n.category === filterCat);
    if (filterPri !== "All") out = out.filter((n) => n.priority === filterPri);
    if (search.trim())
      out = out.filter(
        (n) =>
          n.title.toLowerCase().includes(search.toLowerCase()) ||
          n.content.toLowerCase().includes(search.toLowerCase()) ||
          n.tags.some((t) => t.toLowerCase().includes(search.toLowerCase()))
      );
    return [...out].sort((a, b) => {
      if (sortBy === "priority") return priorityOrder[a.priority] - priorityOrder[b.priority];
      if (sortBy === "category") return a.category.localeCompare(b.category);
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });
  }, [notes, filterCat, filterPri, search, sortBy]);

  return (
    <div className="space-y-5">
      {toast && (
        <div className="fixed top-4 right-4 z-50 bg-slate-800 text-white text-sm px-4 py-2 rounded-lg shadow-lg">
          {toast}
        </div>
      )}

      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-base font-semibold text-slate-800">Research Notes & Annotations</h2>
          <p className="text-sm text-slate-500 mt-0.5">Structured note-taking, annotations, and citation management</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => { setShowCitForm(!showCitForm); setShowNoteForm(false); }}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 border border-slate-200 text-slate-600 rounded-lg text-sm hover:bg-slate-50 transition-colors"
          >
            <BookOpen className="w-4 h-4" />
            Add Citation
          </button>
          <button
            onClick={() => { setShowNoteForm(!showNoteForm); setShowCitForm(false); }}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-800 text-white rounded-lg text-sm font-medium hover:bg-slate-700 transition-colors"
          >
            <Plus className="w-4 h-4" />
            New Note
          </button>
        </div>
      </div>

      {/* New Note Form */}
      {showNoteForm && (
        <div className="border border-slate-200 rounded-xl bg-slate-50 p-4 space-y-3">
          <h3 className="text-sm font-semibold text-slate-700">New Research Note</h3>
          <input
            className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-indigo-300"
            placeholder="Note title"
            value={noteForm.title}
            onChange={(e) => setNoteForm({ ...noteForm, title: e.target.value })}
          />
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-medium text-slate-600 mb-1 block">Category</label>
              <select
                className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-indigo-300"
                value={noteForm.category}
                onChange={(e) => setNoteForm({ ...noteForm, category: e.target.value as NoteCategory })}
              >
                {NOTE_CATEGORIES.map((c) => <option key={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <label className="text-xs font-medium text-slate-600 mb-1 block">Priority</label>
              <select
                className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-indigo-300"
                value={noteForm.priority}
                onChange={(e) => setNoteForm({ ...noteForm, priority: e.target.value as NotePriority })}
              >
                <option>Low</option>
                <option>Medium</option>
                <option>High</option>
              </select>
            </div>
          </div>
          <textarea
            className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-indigo-300 h-24 resize-none"
            placeholder="Note content..."
            value={noteForm.content}
            onChange={(e) => setNoteForm({ ...noteForm, content: e.target.value })}
          />
          <input
            className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-indigo-300"
            placeholder="Tags (comma-separated)"
            value={noteForm.tags}
            onChange={(e) => setNoteForm({ ...noteForm, tags: e.target.value })}
          />
          <div className="flex gap-2 pt-1">
            <button
              onClick={addNote}
              className="px-4 py-1.5 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700 transition-colors"
            >
              Save Note
            </button>
            <button
              onClick={() => setShowNoteForm(false)}
              className="px-4 py-1.5 bg-white border border-slate-200 text-slate-600 rounded-lg text-sm hover:bg-slate-50 transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Citation Form */}
      {showCitForm && (
        <div className="border border-teal-200 rounded-xl bg-teal-50 p-4 space-y-3">
          <h3 className="text-sm font-semibold text-teal-800">Add Citation</h3>
          <div className="grid grid-cols-2 gap-3">
            <input
              className="border border-slate-200 rounded-lg px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-teal-300"
              placeholder="Author(s)"
              value={citForm.author}
              onChange={(e) => setCitForm({ ...citForm, author: e.target.value })}
            />
            <input
              className="border border-slate-200 rounded-lg px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-teal-300"
              placeholder="Year"
              value={citForm.year}
              onChange={(e) => setCitForm({ ...citForm, year: e.target.value })}
            />
          </div>
          <input
            className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-teal-300"
            placeholder="Article / Study title"
            value={citForm.title}
            onChange={(e) => setCitForm({ ...citForm, title: e.target.value })}
          />
          <div className="grid grid-cols-2 gap-3">
            <input
              className="border border-slate-200 rounded-lg px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-teal-300"
              placeholder="Journal / Source"
              value={citForm.journal}
              onChange={(e) => setCitForm({ ...citForm, journal: e.target.value })}
            />
            <input
              className="border border-slate-200 rounded-lg px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-teal-300"
              placeholder="Volume / Issue / Pages"
              value={citForm.volumeIssue}
              onChange={(e) => setCitForm({ ...citForm, volumeIssue: e.target.value })}
            />
          </div>
          <input
            className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-teal-300"
            placeholder="DOI or URL"
            value={citForm.doiUrl}
            onChange={(e) => setCitForm({ ...citForm, doiUrl: e.target.value })}
          />
          <textarea
            className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-teal-300 h-16 resize-none"
            placeholder="Key finding / why cited"
            value={citForm.keyFinding}
            onChange={(e) => setCitForm({ ...citForm, keyFinding: e.target.value })}
          />
          <div className="flex gap-2 pt-1">
            <button
              onClick={addCitation}
              className="px-4 py-1.5 bg-teal-600 text-white rounded-lg text-sm font-medium hover:bg-teal-700 transition-colors"
            >
              Add Citation
            </button>
            <button
              onClick={() => setShowCitForm(false)}
              className="px-4 py-1.5 bg-white border border-slate-200 text-slate-600 rounded-lg text-sm hover:bg-slate-50 transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Filter / Search toolbar */}
      <div className="flex flex-wrap gap-2 items-center">
        <div className="flex items-center gap-1.5 bg-slate-100 rounded-lg px-3 py-1.5 flex-1 min-w-48">
          <Search className="w-3.5 h-3.5 text-slate-400" />
          <input
            className="bg-transparent text-sm outline-none w-full text-slate-700"
            placeholder="Search notes..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <select
          className="border border-slate-200 rounded-lg px-2.5 py-1.5 text-sm bg-white focus:outline-none"
          value={filterCat}
          onChange={(e) => setFilterCat(e.target.value as NoteCategory | "All")}
        >
          <option value="All">All categories</option>
          {NOTE_CATEGORIES.map((c) => <option key={c}>{c}</option>)}
        </select>
        <select
          className="border border-slate-200 rounded-lg px-2.5 py-1.5 text-sm bg-white focus:outline-none"
          value={filterPri}
          onChange={(e) => setFilterPri(e.target.value as NotePriority | "All")}
        >
          <option value="All">All priorities</option>
          <option>High</option>
          <option>Medium</option>
          <option>Low</option>
        </select>
        <select
          className="border border-slate-200 rounded-lg px-2.5 py-1.5 text-sm bg-white focus:outline-none"
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value as "date" | "priority" | "category")}
        >
          <option value="date">Sort: Date</option>
          <option value="priority">Sort: Priority</option>
          <option value="category">Sort: Category</option>
        </select>
      </div>

      {/* Notes list */}
      <div className="space-y-2">
        {filteredNotes.length === 0 && (
          <div className="text-center py-8 text-sm text-slate-400 border border-dashed border-slate-200 rounded-xl">
            No notes match your filters.
          </div>
        )}
        {filteredNotes.map((n) => (
          <div key={n.id} className="border border-slate-200 rounded-xl bg-white p-4">
            <div className="flex items-start justify-between gap-2">
              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-center gap-2 mb-1">
                  <CategoryBadge category={n.category} />
                  <PriorityDot priority={n.priority} />
                  <span className="text-xs text-slate-400">{fmtDate(n.createdAt)}</span>
                </div>
                <h3 className="text-sm font-semibold text-slate-800">{n.title}</h3>
                {n.content && (
                  <p className="text-sm text-slate-600 mt-1 leading-relaxed">{n.content}</p>
                )}
                {n.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1 mt-2">
                    {n.tags.map((t) => (
                      <span key={t} className="text-xs text-slate-500 bg-slate-100 px-1.5 py-0.5 rounded flex items-center gap-0.5">
                        <Tag className="w-2.5 h-2.5" />
                        {t}
                      </span>
                    ))}
                  </div>
                )}
              </div>
              <button
                onClick={() => deleteNote(n.id)}
                className="p-1.5 text-slate-300 hover:text-rose-500 hover:bg-rose-50 rounded-lg transition-colors flex-shrink-0"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Citation Manager */}
      {citations.length > 0 && (
        <div className="border border-teal-200 rounded-xl bg-teal-50/50 p-4 space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold text-teal-800 flex items-center gap-1.5">
              <BookOpen className="w-4 h-4" />
              Citation Library ({citations.length})
            </h3>
            <div className="flex gap-2 items-center">
              <select
                className="border border-teal-200 rounded-lg px-2.5 py-1 text-xs bg-white"
                value={citFormat}
                onChange={(e) => setCitFormat(e.target.value as "AMA" | "APA")}
              >
                <option>AMA</option>
                <option>APA</option>
              </select>
              <button
                onClick={copyCitations}
                className="inline-flex items-center gap-1 px-3 py-1 bg-teal-600 text-white rounded-lg text-xs hover:bg-teal-700 transition-colors"
              >
                <Clipboard className="w-3 h-3" />
                Copy All
              </button>
            </div>
          </div>
          <div className="space-y-2">
            {citations.map((c) => (
              <div key={c.id} className="bg-white border border-teal-100 rounded-lg p-3">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-slate-700 italic">
                      {citFormat === "AMA" ? formatAMA(c) : formatAPA(c)}
                    </p>
                    {c.keyFinding && (
                      <p className="text-xs text-slate-500 mt-1 flex items-start gap-1">
                        <ChevronRight className="w-3 h-3 flex-shrink-0 mt-0.5" />
                        {c.keyFinding}
                      </p>
                    )}
                  </div>
                  <button
                    onClick={() => deleteCitation(c.id)}
                    className="p-1 text-slate-300 hover:text-rose-500 transition-colors flex-shrink-0"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

type TabId = "scenarios" | "report" | "comparison" | "notes";

const TABS: { id: TabId; label: string; icon: React.ReactNode }[] = [
  { id: "scenarios", label: "Scenario Manager", icon: <FolderOpen className="w-4 h-4" /> },
  { id: "report", label: "Report Builder", icon: <FileText className="w-4 h-4" /> },
  { id: "comparison", label: "Comparison", icon: <BarChart2 className="w-4 h-4" /> },
  { id: "notes", label: "Notes & Citations", icon: <StickyNote className="w-4 h-4" /> },
];

export default function ResearchWorkspace() {
  const [activeTab, setActiveTab] = useState<TabId>("scenarios");

  return (
    <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
      {/* Workspace header */}
      <div className="bg-gradient-to-r from-slate-800 to-slate-700 px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-white font-semibold text-lg flex items-center gap-2">
              <FolderOpen className="w-5 h-5 text-slate-300" />
              Research Workspace
            </h1>
            <p className="text-slate-400 text-sm mt-0.5">Collaboration and export layer for Vermont Health Platform analysis</p>
          </div>
          <div className="text-xs text-slate-400 bg-slate-900/40 px-3 py-1.5 rounded-lg font-mono">
            Auto-saved · localStorage
          </div>
        </div>
      </div>

      {/* Tab bar */}
      <div className="border-b border-slate-200 bg-slate-50">
        <div className="flex overflow-x-auto">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-5 py-3 text-sm font-medium whitespace-nowrap border-b-2 transition-colors ${
                activeTab === tab.id
                  ? "border-slate-800 text-slate-800 bg-white"
                  : "border-transparent text-slate-500 hover:text-slate-700 hover:bg-slate-100"
              }`}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Tab content */}
      <div className="p-6">
        {activeTab === "scenarios" && <ScenarioManager />}
        {activeTab === "report" && <ReportBuilder />}
        {activeTab === "comparison" && <ComparisonDashboard />}
        {activeTab === "notes" && <ResearchNotes />}
      </div>
    </div>
  );
}
