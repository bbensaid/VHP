/**
 * Research Lab tool badges. A badge takes the colour of the tool's primary
 * pillar in tools.ts (the platform standard), so it can never drift from the
 * pillar the tool belongs to. Literal class strings keep Tailwind's JIT happy.
 */
import type { FrameworkId } from "./pillars";
import { TOOLS } from "./tools";

export const PILLAR_BADGE: Record<FrameworkId, string> = {
  policy: "bg-blue-100 text-blue-700 border-blue-200",
  technology: "bg-indigo-100 text-indigo-700 border-indigo-200",
  economics: "bg-emerald-100 text-emerald-700 border-emerald-200",
  clinical: "bg-red-100 text-red-700 border-red-200",
  operations: "bg-amber-100 text-amber-800 border-amber-200",
  equity: "bg-violet-100 text-violet-700 border-violet-200",
};

/** Badge classes for the tool at /research-lab/<bench>?tab=<tab>. */
export function toolBadgeClass(bench: string, tab: string | undefined): string {
  const tool = tab ? TOOLS.find((t) => t.href === `/research-lab/${bench}?tab=${tab}`) : undefined;
  return tool ? PILLAR_BADGE[tool.pillars[0]] : "bg-slate-100 text-slate-700 border-slate-200";
}
