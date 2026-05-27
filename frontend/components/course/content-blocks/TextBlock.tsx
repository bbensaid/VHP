import ReactMarkdown from "react-markdown";
import type { TextBlock } from "@/types/course";

export function TextBlockRenderer({ block }: { block: TextBlock }) {
  return (
    <div className="space-y-4">
      {block.heading && (
        <div className="mt-10 mb-5">
          <div className="flex items-center gap-3 mb-4">
            <div className="h-px flex-1 bg-slate-200" />
            <span className="text-[9px] font-black text-slate-400 uppercase tracking-[0.25em] px-2">Section</span>
            <div className="h-px flex-1 bg-slate-200" />
          </div>
          <h2 className="text-2xl font-black text-slate-900 leading-snug border-l-4 border-indigo-500 pl-4">
            {block.heading}
          </h2>
        </div>
      )}
      <div className="prose prose-slate max-w-none prose-p:text-[17px] prose-p:leading-8 prose-p:text-slate-700 prose-p:mb-6 prose-strong:font-bold prose-strong:text-slate-900 prose-li:text-[17px] prose-li:leading-8 prose-li:text-slate-700 prose-ul:my-6 prose-ul:space-y-3 prose-ol:my-6 prose-ol:space-y-3 [&_ul>li]:flex [&_ul>li]:gap-3 [&_ul>li]:items-start [&_ul>li]:list-none before:[&_ul>li]:content-[''] before:[&_ul>li]:mt-3 before:[&_ul>li]:w-2 before:[&_ul>li]:h-2 before:[&_ul>li]:rounded-full before:[&_ul>li]:bg-indigo-500 before:[&_ul>li]:shrink-0">
        <ReactMarkdown>{block.body}</ReactMarkdown>
      </div>
    </div>
  );
}
