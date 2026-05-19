"use client";

import { useEffect, useState } from "react";
import BookmarkButton from "./BookmarkButton";

/**
 * Bookmark a book chapter in Reader Mode.
 *
 * Reuses the existing /api/bookmarks endpoint with a synthetic sanity_id of
 * `chapter:<slug>`, content_type `chapter`, and the chapter's reader-mode
 * slug. The /saved page routes such bookmarks to /read/<slug>.
 *
 * On mount, the button queries /api/bookmarks to see whether this chapter is
 * already saved — without that, the button would always render as
 * "unbookmarked" on first paint and would only correct after the user
 * clicks.
 */

interface Props {
  slug: string;
  title: string;
  /** Optional pillar id, for grouping on the /saved page. */
  pillar?: string;
  className?: string;
}

export default function BookmarkChapterButton({ slug, title, pillar, className }: Props) {
  const sanityId = `chapter:${slug}`;
  const [initialSaved, setInitialSaved] = useState<boolean | null>(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch("/api/bookmarks");
        if (!res.ok) {
          if (!cancelled) setInitialSaved(false);
          return;
        }
        const data = await res.json() as { bookmarks?: Array<{ sanity_id: string }> };
        const saved = (data.bookmarks ?? []).some((b) => b.sanity_id === sanityId);
        if (!cancelled) setInitialSaved(saved);
      } catch {
        if (!cancelled) setInitialSaved(false);
      }
    })();
    return () => { cancelled = true; };
  }, [sanityId]);

  // While we don't yet know the initial saved state, render a neutral
  // placeholder that matches the BookmarkButton footprint. This avoids a
  // flash of "unsaved" on bookmarked chapters.
  if (initialSaved === null) {
    return <div className={`w-5 h-5 ${className ?? ""}`} aria-hidden="true" />;
  }

  return (
    <BookmarkButton
      sanityId={sanityId}
      slug={slug}
      title={title}
      pillar={pillar}
      contentType="chapter"
      initialSaved={initialSaved}
      size="md"
      className={className}
    />
  );
}
