import type { TimelineBlock } from "@/types/course";

const PILLAR_COLOR: Record<string, string> = {
  policy: "bg-blue-500", technology: "bg-indigo-500", economics: "bg-emerald-500",
  clinical: "bg-red-500", equity: "bg-violet-500", operations: "bg-amber-500",
};

export function TimelineBlockRenderer({ block }: { block: TimelineBlock }) {
  return (
    <div className="space-y-3">
      {block.heading && <h3 className="text-lg font-semibold text-slate-900">{block.heading}</h3>}
      <ol className="relative border-l border-slate-200 ml-3 space-y-0">
        {(block.items ?? []).map((item, i) => (
          <li key={i} className="ml-6 pb-7 last:pb-0">
            <span className={`absolute -left-2 w-4 h-4 rounded-full border-2 border-white ${item.pillar ? PILLAR_COLOR[item.pillar] : "bg-slate-400"}`} />
            <p className="text-xs text-slate-400 font-semibold mb-0.5 uppercase tracking-wide">{item.year}</p>
            <h4 className="text-base font-semibold text-slate-900">{item.title}</h4>
            <p className="text-sm text-slate-600 leading-relaxed mt-1">{item.body}</p>
          </li>
        ))}
      </ol>
    </div>
  );
}
