"use client";

/**
 * "From the Book" link for a Research Lab tool.
 *
 * The Preface and Introduction promise that "the platform's tools carry 'From the
 * Book' callouts back to the chapters that explain them." The bench pages had none.
 * Rather than hand-writing a callout per tab (which would drift from the book), this
 * reads the chapters each tool implements straight from the tool registry
 * (lib/taxonomy/tools.ts → `chapters`) and the chapter titles from
 * lib/taxonomy/chapters.ts, so it updates whenever those do.
 *
 * Links go to /read/chapter-NN, the per-chapter reader generated from CHAPTERS
 * (app/read/[slug]/page.tsx via lib/narration.ts chapterToSlug).
 */

import Link from "next/link";
import { BookOpenIcon } from "@heroicons/react/24/outline";
import { TOOLS } from "@/lib/taxonomy/tools";
import { CHAPTERS } from "@/lib/taxonomy/chapters";

function readSlug(num: string): string {
  if (num === "Preface") return "preface";
  if (num === "Introduction") return "introduction";
  return `chapter-${num.padStart(2, "0")}`;
}

export default function ToolBookCallout({ href }: { href: string }) {
  const tool = TOOLS.find((t) => t.href === href);
  const chapters = (tool?.chapters ?? [])
    .map((num) => CHAPTERS.find((c) => c.num === num))
    .filter((c): c is (typeof CHAPTERS)[number] => Boolean(c));
  if (!tool || chapters.length === 0) return null;

  return (
    <div
      data-testid="tool-book-callout"
      className="flex gap-3 items-start p-3 rounded-xl bg-indigo-50 border border-indigo-100 mb-6"
    >
      <div className="shrink-0 w-7 h-7 rounded-lg bg-indigo-600 flex items-center justify-center">
        <BookOpenIcon className="w-4 h-4 text-white" />
      </div>
      <div className="min-w-0">
        <p className="text-[9px] font-black uppercase tracking-widest text-indigo-400 mb-1">
          From the Book · {tool.label}
        </p>
        <ul className="space-y-0.5">
          {chapters.map((c) => (
            <li key={c.num} className="text-xs text-indigo-900">
              <Link href={`/read/${readSlug(c.num)}`} className="font-bold text-indigo-700 hover:underline">
                Chapter {c.num}
              </Link>{" "}
              — {c.title}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
