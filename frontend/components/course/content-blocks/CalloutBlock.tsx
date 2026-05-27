import type { CalloutBlock } from "@/types/course";

const CALLOUT_CONFIG: Record<string, { emoji: string; label: string; border: string; bg: string; heading: string; text: string; labelColor: string }> = {
  info:    { emoji: "💡", label: "Key Concept",  border: "border-indigo-500",  bg: "bg-indigo-50",  heading: "text-indigo-950", text: "text-indigo-950",  labelColor: "text-indigo-600"  },
  tip:     { emoji: "💡", label: "Key Concept",  border: "border-indigo-500",  bg: "bg-indigo-50",  heading: "text-indigo-950", text: "text-indigo-950",  labelColor: "text-indigo-600"  },
  warning: { emoji: "⚠️", label: "Important",    border: "border-amber-500",   bg: "bg-amber-50",   heading: "text-amber-950",  text: "text-amber-950",  labelColor: "text-amber-600"   },
  success: { emoji: "✅", label: "Key Takeaway", border: "border-emerald-500", bg: "bg-emerald-50", heading: "text-emerald-950",text: "text-emerald-900", labelColor: "text-emerald-700" },
};

export function CalloutBlockRenderer({ block }: { block: CalloutBlock }) {
  const c = CALLOUT_CONFIG[block.variant] ?? CALLOUT_CONFIG.info;
  return (
    <div className={`my-8 border-l-4 ${c.border} ${c.bg} rounded-r-xl px-6 py-5 shadow-sm`}>
      <div className="flex items-center gap-2 mb-3">
        <span className="text-base leading-none">{c.emoji}</span>
        <span className={`text-[10px] font-black uppercase tracking-[0.2em] ${c.labelColor}`}>
          {block.heading ?? c.label}
        </span>
      </div>
      <p className={`text-[16px] leading-8 font-medium ${c.text} whitespace-pre-line`}>{block.body}</p>
    </div>
  );
}
