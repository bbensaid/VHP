import ReactMarkdown from "react-markdown";
import type { TextBlock } from "@/types/course";

export function TextBlockRenderer({ block }: { block: TextBlock }) {
  return (
    <div className="space-y-2">
      {block.heading && (
        <h3 className="text-lg font-semibold text-slate-900">{block.heading}</h3>
      )}
      <div className="text-base text-slate-700 leading-relaxed prose prose-slate max-w-none">
        <ReactMarkdown>{block.body}</ReactMarkdown>
      </div>
    </div>
  );
}
