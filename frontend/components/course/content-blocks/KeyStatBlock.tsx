import type { KeyStatBlock } from "@/types/course";

const STAT_COLORS = [
  { bg: "bg-indigo-50",  border: "border-indigo-200",  num: "text-indigo-700",  label: "text-indigo-900",  sub: "text-indigo-500"  },
  { bg: "bg-emerald-50", border: "border-emerald-200", num: "text-emerald-700", label: "text-emerald-900", sub: "text-emerald-600" },
  { bg: "bg-amber-50",   border: "border-amber-200",   num: "text-amber-700",   label: "text-amber-900",   sub: "text-amber-600"   },
  { bg: "bg-rose-50",    border: "border-rose-200",    num: "text-rose-700",    label: "text-rose-900",    sub: "text-rose-500"    },
];

export function KeyStatBlockRenderer({ block }: { block: KeyStatBlock }) {
  const stats = block.stats ?? [];
  const cols = Math.min(stats.length || 1, 4);
  return (
    <div className="my-10">
      {block.heading && (
        <p className="text-[11px] font-black text-slate-500 uppercase tracking-[0.2em] mb-4 text-center">{block.heading}</p>
      )}
      <div className={`grid gap-4 ${cols === 2 ? "grid-cols-2" : cols === 3 ? "grid-cols-3" : "grid-cols-2 md:grid-cols-4"}`}>
        {stats.map((stat, i) => {
          const c = STAT_COLORS[i % STAT_COLORS.length];
          return (
            <div key={i} className={`${c.bg} border ${c.border} rounded-2xl p-6 flex flex-col gap-2`}>
              <div className={`text-4xl font-black ${c.num} leading-none`}>{stat.value}</div>
              <div className={`text-sm font-bold ${c.label} leading-snug`}>{stat.label}</div>
              {stat.source && <div className={`text-xs ${c.sub} leading-relaxed mt-1`}>{stat.source}</div>}
            </div>
          );
        })}
      </div>
    </div>
  );
}
