import Link from "next/link";
import { BookOpenIcon } from "@heroicons/react/24/outline";

interface FromTheBookProps {
  chapter: string;
  chapterTitle: string;
  excerpt: string;
  href?: string;
}

export default function FromTheBook({ chapter, chapterTitle, excerpt, href = "/book" }: FromTheBookProps) {
  return (
    <div className="flex gap-3 p-4 rounded-xl bg-indigo-50 border border-indigo-100 mb-6">
      <div className="shrink-0 mt-0.5">
        <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center">
          <BookOpenIcon className="w-4 h-4 text-white" />
        </div>
      </div>
      <div className="min-w-0">
        <div className="flex items-center gap-2 flex-wrap mb-1">
          <span className="text-[9px] font-black uppercase tracking-widest text-indigo-400">From the Book</span>
          <span className="text-[9px] font-bold text-indigo-300">·</span>
          <span className="text-[10px] font-bold text-indigo-600">{chapter}</span>
        </div>
        <p className="text-xs font-bold text-indigo-900 mb-1">{chapterTitle}</p>
        <p className="text-xs text-indigo-700 leading-relaxed">{excerpt}</p>
        <Link
          href={href}
          className="inline-flex items-center gap-1 mt-2 text-[11px] font-bold text-indigo-600 hover:text-indigo-800 hover:underline"
        >
          Read in the Book →
        </Link>
      </div>
    </div>
  );
}
