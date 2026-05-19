/**
 * Helpers that map book chapters (from lib/taxonomy/chapters.ts) to the
 * narration files in public/audio/narration/. The naming convention is:
 *
 *   00-preface.txt           00-preface.m4a
 *   01-introduction.txt      01-introduction.m4a
 *   02-chapter-01.txt        02-chapter-01.m4a
 *   ...
 *   21-chapter-20.txt        21-chapter-20.m4a
 *
 * Files are written by scripts/generate-narration-audio.sh against the txt
 * sources. Both /book/listen and /read/[slug] consume these via this module.
 */

import { CHAPTERS, type Chapter } from "@/lib/taxonomy";

export interface NarrationTrack {
  /** The chapter's `num` field, used as the route slug for /read/[slug]. */
  id: string;
  /** Display label — same as `id` but presented with "Chapter " prefix for numeric. */
  num: string;
  title: string;
  desc: string;
  audioSrc: string;
  textSrc: string;
  /** URL-safe slug derived from id. Numeric chapters become "chapter-01", "chapter-20"; "Preface"/"Introduction" become "preface"/"introduction". */
  slug: string;
  /** The full Chapter record from the taxonomy. */
  chapter: Chapter;
}

function chapterToBaseFilename(ch: Chapter, sequenceIndex: number): string {
  if (ch.num === "Preface") return "00-preface";
  if (ch.num === "Introduction") return "01-introduction";
  const padded = ch.num.padStart(2, "0");
  const seq = String(sequenceIndex).padStart(2, "0");
  return `${seq}-chapter-${padded}`;
}

function chapterToSlug(ch: Chapter): string {
  if (ch.num === "Preface") return "preface";
  if (ch.num === "Introduction") return "introduction";
  return `chapter-${ch.num.padStart(2, "0")}`;
}

/** Returns every narration track in canonical reading order. */
export function getAllTracks(): NarrationTrack[] {
  return CHAPTERS.map((ch, i) => {
    const base = chapterToBaseFilename(ch, i);
    return {
      id: ch.num,
      num: ch.num,
      title: ch.title,
      desc: ch.desc,
      audioSrc: `/audio/narration/${base}.m4a`,
      textSrc: `/audio/narration/${base}.txt`,
      slug: chapterToSlug(ch),
      chapter: ch,
    };
  });
}

/** Find one track by slug. Returns undefined if no such chapter. */
export function getTrackBySlug(slug: string): NarrationTrack | undefined {
  return getAllTracks().find((t) => t.slug === slug);
}

/** Get the prev/next tracks relative to a given slug, for chapter navigation. */
export function getAdjacentTracks(slug: string): {
  prev: NarrationTrack | undefined;
  next: NarrationTrack | undefined;
} {
  const all = getAllTracks();
  const idx = all.findIndex((t) => t.slug === slug);
  if (idx === -1) return { prev: undefined, next: undefined };
  return {
    prev: idx > 0 ? all[idx - 1] : undefined,
    next: idx < all.length - 1 ? all[idx + 1] : undefined,
  };
}
