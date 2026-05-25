import type { KeyStatBlock } from "@/types/course";

export function KeyStatBlockRenderer({ block }: { block: KeyStatBlock }) {
  const cols = Math.min(block.stats.length, 4);
  return (
    <div
      className="grid gap-3"
      style={{ gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))` }}
    >
      {block.stats.map((stat, i) => (
        <div key={i} className="bg-slate-100 rounded-lg p-4 text-center space-y-1.5">
          <p className="text-3xl font-bold text-slate-900">{stat.value}</p>
          <p className="text-sm text-slate-600 leading-tight">{stat.label}</p>
          {stat.source && <p className="text-xs text-slate-400">{stat.source}</p>}
        </div>
      ))}
    </div>
  );
}
