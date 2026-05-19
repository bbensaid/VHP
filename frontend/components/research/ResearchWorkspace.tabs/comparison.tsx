"use client";

import { useState, useMemo, useCallback } from "react";
import { Plus, Copy, Star, X, Award, Clipboard } from "lucide-react";
import {
  COMP_TEMPLATES,
  type Scenario, type CompDimension, type CompScenario,
  uid,
} from "../ResearchWorkspace.data";
import { useLocalStorage } from "../ResearchWorkspace.atoms";

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

export function ComparisonDashboard() {
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
