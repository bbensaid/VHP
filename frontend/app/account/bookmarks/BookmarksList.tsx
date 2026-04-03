"use client";

import { useState } from "react";
import Link from "next/link";
import { TrashIcon } from "@heroicons/react/24/outline";

interface Bookmark {
  id: string;
  sanity_id: string;
  slug: string;
  title: string;
  pillar?: string;
  content_type?: string;
  note?: string;
  created_at: string;
}

export default function BookmarksList({ initialBookmarks }: { initialBookmarks: Bookmark[] }) {
  const [bookmarks, setBookmarks] = useState<Bookmark[]>(initialBookmarks);
  const [deleting, setDeleting] = useState<string | null>(null);

  async function handleDelete(sanityId: string) {
    // Optimistic remove
    setDeleting(sanityId);
    setBookmarks((prev) => prev.filter((b) => b.sanity_id !== sanityId));

    try {
      const res = await fetch(`/api/bookmarks?id=${encodeURIComponent(sanityId)}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Delete failed");
    } catch {
      // Revert on failure
      setBookmarks(initialBookmarks);
    } finally {
      setDeleting(null);
    }
  }

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <nav className="text-sm text-slate-500 mb-6">
          <Link href="/account" className="hover:text-indigo-600">Account</Link>
          <span className="mx-2">›</span>
          <span className="text-slate-800 font-medium">Saved Articles</span>
        </nav>
        <h1 className="text-3xl font-black text-slate-900 mb-8">Saved Articles</h1>

        {bookmarks.length === 0 ? (
          <div className="bg-white border border-slate-200 rounded-2xl p-12 text-center">
            <p className="text-4xl mb-4">🔖</p>
            <p className="text-lg font-bold text-slate-700 mb-2">No saved articles yet</p>
            <p className="text-slate-500 text-sm mb-4">Bookmark articles as you read to find them here.</p>
            <Link href="/policy" className="inline-block bg-indigo-600 text-white font-bold px-5 py-2.5 rounded-xl text-sm hover:bg-indigo-700 transition-colors">
              Browse analyses →
            </Link>
          </div>
        ) : (
          <ul className="space-y-3">
            {bookmarks.map((b) => (
              <li key={b.id} className="bg-white border border-slate-200 rounded-xl p-5 hover:border-indigo-300 transition-all">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    {b.pillar && <p className="text-xs font-bold uppercase tracking-widest text-indigo-500 mb-1">{b.pillar}</p>}
                    <Link href={`/articles/${b.slug}`} className="font-bold text-slate-900 hover:text-indigo-600 transition-colors">
                      {b.title}
                    </Link>
                    {b.note && <p className="text-sm text-slate-500 mt-1 italic">&ldquo;{b.note}&rdquo;</p>}
                    <p className="text-xs text-slate-400 mt-1">{new Date(b.created_at).toLocaleDateString()}</p>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <Link href={`/articles/${b.slug}`} className="text-slate-300 hover:text-indigo-400 text-lg">→</Link>
                    <button
                      onClick={() => handleDelete(b.sanity_id)}
                      disabled={deleting === b.sanity_id}
                      className="p-1.5 text-slate-300 hover:text-rose-500 rounded-lg hover:bg-rose-50 transition-colors disabled:opacity-40"
                      title="Remove bookmark"
                      aria-label="Remove bookmark"
                    >
                      <TrashIcon className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
