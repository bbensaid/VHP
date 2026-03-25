"use client";
import { useState } from "react";
import { createBrowserClient } from "@supabase/ssr";

interface Props {
  sanityId: string;
  slug: string;
  title: string;
  pillar?: string;
  contentType?: string;
  userId: string | null;
}

export default function BookmarkButton({ sanityId, slug, title, pillar, contentType, userId }: Props) {
  const [bookmarked, setBookmarked] = useState(false);
  const [loading, setLoading] = useState(false);

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  async function toggle() {
    if (!userId) {
      window.location.href = "/login?from=" + encodeURIComponent(window.location.pathname);
      return;
    }
    setLoading(true);
    if (bookmarked) {
      await supabase.from("bookmarks").delete().match({ user_id: userId, sanity_id: sanityId });
      setBookmarked(false);
    } else {
      await supabase.from("bookmarks").upsert({ user_id: userId, sanity_id: sanityId, slug, title, pillar, content_type: contentType });
      setBookmarked(true);
    }
    setLoading(false);
  }

  return (
    <button
      onClick={toggle}
      disabled={loading}
      aria-label={bookmarked ? "Remove bookmark" : "Bookmark this article"}
      aria-pressed={bookmarked}
      className={`flex items-center gap-1.5 text-sm font-semibold px-3 py-1.5 rounded-lg transition-colors ${
        bookmarked ? "bg-indigo-100 text-indigo-700" : "bg-slate-100 text-slate-600 hover:bg-slate-200"
      }`}
    >
      <svg className="w-4 h-4" aria-hidden="true" fill={bookmarked ? "currentColor" : "none"} viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
      </svg>
      {bookmarked ? "Saved" : "Save"}
    </button>
  );
}
