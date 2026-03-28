"use client";

import { useState } from "react";
import { BookmarkIcon } from "@heroicons/react/24/outline";
import { BookmarkIcon as BookmarkSolid } from "@heroicons/react/24/solid";

interface BookmarkButtonProps {
  sanityId: string;
  slug: string;
  title: string;
  pillar?: string;
  contentType?: string;
  initialSaved?: boolean;
  size?: "sm" | "md";
  className?: string;
}

export default function BookmarkButton({
  sanityId,
  slug,
  title,
  pillar,
  contentType,
  initialSaved = false,
  size = "sm",
  className = "",
}: BookmarkButtonProps) {
  const [saved, setSaved] = useState(initialSaved);
  const [pending, setPending] = useState(false);

  const iconClass = size === "sm" ? "w-4 h-4" : "w-5 h-5";

  const toggle = async () => {
    if (pending) return;
    setPending(true);
    const next = !saved;
    setSaved(next); // optimistic

    try {
      if (next) {
        await fetch("/api/bookmarks", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ sanity_id: sanityId, slug, title, pillar, content_type: contentType }),
        });
      } else {
        await fetch(`/api/bookmarks?id=${encodeURIComponent(sanityId)}`, { method: "DELETE" });
      }
    } catch {
      setSaved(!next); // revert on failure
    } finally {
      setPending(false);
    }
  };

  return (
    <button
      onClick={(e) => { e.preventDefault(); e.stopPropagation(); toggle(); }}
      aria-label={saved ? "Remove bookmark" : "Save to reading list"}
      aria-pressed={saved}
      title={saved ? "Saved — click to remove" : "Save to reading list"}
      disabled={pending}
      className={`transition-colors disabled:opacity-50 ${
        saved
          ? "text-indigo-600 hover:text-indigo-800"
          : "text-slate-300 hover:text-slate-500"
      } ${className}`}
    >
      {saved
        ? <BookmarkSolid className={iconClass} />
        : <BookmarkIcon className={iconClass} />
      }
    </button>
  );
}
