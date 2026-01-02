import React from "react";
import { PortableText } from "@portabletext/react";

interface NoteData {
  headline: string;
  content: any;
  author: string;
}

export default function AnalystNote({ data }: { data: NoteData | null }) {
  if (!data) return null;

  return (
    // OUTER CONTAINER: Standard White Card
    <div className="bg-white border border-slate-200 rounded-lg shadow-sm p-5">
      
      {/* HEADER */}
      <div className="flex items-center gap-2 mb-3">
        <svg className="w-4 h-4 text-emerald-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
        <h3 className="font-bold text-slate-900 text-sm uppercase tracking-wider">
          The Signal
        </h3>
      </div>

      {/* INNER CONTENT BOX: THIS IS NOW bg-emerald-50 */}
      <div className="bg-emerald-50 rounded p-3 border border-emerald-100 mb-3 prose prose-sm max-w-none">
        <h4 className="text-xs font-black text-emerald-900 uppercase mb-2 tracking-tight">
          {data.headline}
        </h4>
        <div className="text-xs text-emerald-800 font-medium leading-relaxed">
            <PortableText value={data.content} />
        </div>
      </div>

      {/* FOOTER */}
      <div className="flex justify-end">
        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
            — {data.author}
        </span>
      </div>
    </div>
  );
}