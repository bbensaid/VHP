"use client";

import { useState, useMemo, useCallback } from "react";
import {
  Plus, Trash2, Copy, Download, Eye, EyeOff, ArrowUp, ArrowDown, Clipboard,
} from "lucide-react";
import {
  SECTION_TYPES, REPORT_TEMPLATES,
  type ReportSectionType, type ReportSection, type ReportMeta,
  uid, wordCount,
} from "../ResearchWorkspace.data";
import { useLocalStorage } from "../ResearchWorkspace.atoms";

// ─── TAB 2: Report Builder ────────────────────────────────────────────────────

export function ReportBuilder() {
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
