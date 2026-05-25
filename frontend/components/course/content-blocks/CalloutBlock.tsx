import { Info, AlertTriangle, CheckCircle, Lightbulb } from "lucide-react";
import type { CalloutBlock } from "@/types/course";

const CALLOUT_CONFIG = {
  info:    { icon: Info,          className: "bg-blue-50 border-blue-200 text-blue-900" },
  warning: { icon: AlertTriangle, className: "bg-amber-50 border-amber-200 text-amber-900" },
  success: { icon: CheckCircle,   className: "bg-emerald-50 border-emerald-200 text-emerald-900" },
  tip:     { icon: Lightbulb,     className: "bg-purple-50 border-purple-200 text-purple-900" },
};

export function CalloutBlockRenderer({ block }: { block: CalloutBlock }) {
  const config = CALLOUT_CONFIG[block.variant];
  const Icon = config.icon;
  return (
    <div className={`border rounded-lg p-5 space-y-2 ${config.className}`}>
      <div className="flex items-center gap-2">
        <Icon className="w-5 h-5 shrink-0" />
        {block.heading && <h4 className="text-base font-semibold">{block.heading}</h4>}
      </div>
      <p className="text-sm leading-relaxed whitespace-pre-line pl-7">{block.body}</p>
    </div>
  );
}
