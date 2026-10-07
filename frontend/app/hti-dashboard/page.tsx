import type { Metadata } from "next";
import { brandedMetadata } from "@/lib/brand-server";
import HTIDashboard from "@/components/HTIDashboard";

export async function generateMetadata(): Promise<Metadata> {
  return brandedMetadata("HTI Dashboard", "Health Transformation Index (HTI) Simulation Engine");
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
