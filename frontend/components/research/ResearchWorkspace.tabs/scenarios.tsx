"use client";

import { useState, useMemo, useCallback } from "react";
import {
  Plus, Trash2, Copy, ChevronDown, ChevronUp, BarChart2,
  Tag, Calendar, CheckCircle, X, MessageSquare,
} from "lucide-react";
import {
  SCENARIO_CATEGORIES, SAMPLE_SCENARIOS,
  type ScenarioStatus, type ScenarioCategory, type Scenario,
  uid, fmtDate,
} from "../ResearchWorkspace.data";
import { useLocalStorage, StatusBadge, CategoryBadge } from "../ResearchWorkspace.atoms";

// ─── TAB 1: Scenario Manager ──────────────────────────────────────────────────

export function ScenarioManager() {
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
