import type { Metadata } from "next";
import { brandedMetadata } from "@/lib/brand-server";
import HTIDashboard from "@/components/HTIDashboard";

export async function generateMetadata(): Promise<Metadata> {
  return brandedMetadata("HTI Dashboard", "Vermont five-pillar status: sourced pillar readiness, dated milestones per pillar, and pace to the January 2028 Strategic Plan deadline.");
}

export default function Page() {
  return (
    <div className="w-full min-h-screen bg-slate-50/50 pb-20">
      <div className="max-w-[1920px] mx-auto">
        <HTIDashboard />
      </div>
    </div>
  );
}
