"use client";

import { useEffect, useState } from "react";
import { PencilSquareIcon, TrashIcon, PlusIcon } from "@heroicons/react/24/outline";

/**
 * Private notes panel for a book chapter. Subscribers can add and delete
 * notes attached to the chapter's reader-mode slug. Notes are stored in
 * Supabase via /api/chapter-notes and are RLS-scoped per user.
 *
 * Anonymous users see a sign-in prompt; the API also enforces auth, so the
 * prompt is just UX and not a security boundary.
 */

interface Note {
  id: string;
  chapter_slug: string;
  content: string;
  created_at: string;
  updated_at: string;
}

interface Props {
  slug: string;
}

const MAX_LEN = 4000;

function fmtTimestamp(iso: string): string {
  return new Date(iso).toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}

export default function ChapterNotes({ slug }: Props) {
  const [notes, setNotes] = useState<Note[] | null>(null); // null = loading
  const [draft, setDraft] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [authBlocked, setAuthBlocked] = useState(false);

  // Initial load
  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch(`/api/chapter-notes?slug=${encodeURIComponent(slug)}`);
        if (res.status === 401) {
          if (!cancelled) { setAuthBlocked(true); setNotes([]); }
          return;
        }
        const data = await res.json() as { notes?: Note[] };
        if (!cancelled) setNotes(data.notes ?? []);
      } catch {
        if (!cancelled) setNotes([]);
      }
    })();
    return () => { cancelled = true; };
  }, [slug]);

  async function addNote() {
    const content = draft.trim();
    if (!content || submitting) return;
    setSubmitting(true);
    setError(null);

    try {
      const res = await fetch("/api/chapter-notes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ slug, content }),
      });
      if (res.status === 401) {
        setAuthBlocked(true);
        return;
      }
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setError(data.error ?? "Failed to save note.");
        return;
      }
      const data = await res.json() as { note: Note };
      setNotes((prev) => [data.note, ...(prev ?? [])]);
      setDraft("");
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  async function removeNote(id: string) {
    // Optimistic
    const prev = notes ?? [];
    setNotes(prev.filter((n) => n.id !== id));
    try {
      const res = await fetch(`/api/chapter-notes?id=${encodeURIComponent(id)}`, { method: "DELETE" });
      if (!res.ok) {
        // Revert
        setNotes(prev);
        setError("Failed to delete note.");
      }
    } catch {
      setNotes(prev);
      setError("Network error while deleting note.");
    }
  }

  // ─── Anonymous: prompt sign-in ─────────────────────────────────────────────
  if (authBlocked) {
    return (
      <div className="rounded-xl border border-slate-200 bg-white p-4">
        <div className="flex items-center gap-2 mb-2">
          <PencilSquareIcon className="w-4 h-4 text-slate-400" />
          <h3 className="text-[10px] font-black uppercase tracking-widest text-slate-500">
            Your notes
          </h3>
        </div>
        <p className="text-xs text-slate-500 leading-relaxed">
          <a href="/login" className="text-indigo-600 font-bold hover:underline">Sign in</a> to add private notes to this chapter. Notes sync across your devices.
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4">
      <div className="flex items-center gap-2 mb-3">
        <PencilSquareIcon className="w-4 h-4 text-slate-400" />
        <h3 className="text-[10px] font-black uppercase tracking-widest text-slate-500">
          Your notes
        </h3>
        {notes && notes.length > 0 && (
          <span className="ml-auto text-[10px] text-slate-400">{notes.length}</span>
        )}
      </div>

      {/* Composer */}
      <div className="mb-3">
        <textarea
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          placeholder="Add a note about this chapter…"
          maxLength={MAX_LEN}
          rows={3}
          className="w-full text-xs text-slate-800 bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-2 focus:outline-none focus:border-indigo-300 resize-none leading-snug"
        />
        <div className="flex items-center justify-between mt-1.5">
          <span className="text-[10px] text-slate-400">
            {draft.length} / {MAX_LEN}
          </span>
          <button
            onClick={addNote}
            disabled={!draft.trim() || submitting}
            className="inline-flex items-center gap-1 text-[11px] font-bold bg-indigo-600 hover:bg-indigo-700 disabled:bg-slate-300 text-white px-2.5 py-1 rounded-md transition-colors"
          >
            <PlusIcon className="w-3 h-3" />
            {submitting ? "Saving…" : "Add note"}
          </button>
        </div>
        {error && (
          <p className="text-[11px] text-rose-600 mt-1.5">{error}</p>
        )}
      </div>

      {/* Notes list */}
      {notes === null ? (
        <p className="text-[11px] text-slate-400">Loading…</p>
      ) : notes.length === 0 ? (
        <p className="text-[11px] text-slate-400 leading-relaxed">
          No notes yet for this chapter.
        </p>
      ) : (
        <ul className="space-y-2">
          {notes.map((n) => (
            <li key={n.id} className="group bg-slate-50 border border-slate-200 rounded-lg p-2.5">
              <p className="text-xs text-slate-700 leading-relaxed whitespace-pre-wrap break-words">
                {n.content}
              </p>
              <div className="flex items-center justify-between mt-1.5">
                <span className="text-[10px] text-slate-400">{fmtTimestamp(n.created_at)}</span>
                <button
                  onClick={() => removeNote(n.id)}
                  aria-label="Delete note"
                  className="text-slate-300 hover:text-rose-500 opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <TrashIcon className="w-3 h-3" />
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
