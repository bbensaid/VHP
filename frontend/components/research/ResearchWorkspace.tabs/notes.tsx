"use client";

import { useState, useMemo, useCallback } from "react";
import {
  Plus, Trash2, Copy, Tag, Search, Filter, BookOpen, Clipboard, ChevronRight,
} from "lucide-react";
import {
  NOTE_CATEGORIES, SAMPLE_NOTES,
  type NoteCategory, type NotePriority, type ResearchNote, type Citation,
  uid, fmtDate,
} from "../ResearchWorkspace.data";
import { useLocalStorage, PriorityDot, CategoryBadge } from "../ResearchWorkspace.atoms";

// ─── TAB 4: Research Notes ────────────────────────────────────────────────────

function formatAMA(c: Citation) {
  const doi = c.doiUrl ? ` doi:${c.doiUrl}` : "";
  return `${c.author}. ${c.title}. *${c.journal}*. ${c.year};${c.volumeIssue}.${doi}`;
}

function formatAPA(c: Citation) {
  const doi = c.doiUrl ? ` https://doi.org/${c.doiUrl}` : "";
  return `${c.author} (${c.year}). ${c.title}. *${c.journal}*, ${c.volumeIssue}.${doi}`;
}

export function ResearchNotes() {
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
                  <p className="ty-body text-slate-600 mt-1 leading-relaxed">{n.content}</p>
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
