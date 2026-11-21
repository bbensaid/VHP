import type { Metadata } from "next";
import Link from "next/link";
import { brandedMetadata } from "@/lib/brand-server";
import ModelerClient from "./ModelerClient";

export async function generateMetadata(): Promise<Metadata> {
  return brandedMetadata(
    "Single-Payer Modeler: Vermont's 14 Hospitals",
    "What a single payer would mean for each Vermont hospital: one rate for every patient, or S.1506's cost-based global budgets. Applied to GMCB's FY2027 budgets, with CBO's national estimates.",
  );
}

export default function SinglePayerModelerPage() {
  return (
    <div className="max-w-5xl mx-auto px-6 py-12">
      <div className="bg-slate-50 border border-slate-200 rounded-2xl p-8 md:p-10 mb-10">
        <div className="flex items-center gap-3 mb-4 flex-wrap">
          <span className="bg-blue-100 text-blue-700 border border-blue-200 text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded">Policy · Simulator</span>
          <span className="bg-slate-100 text-slate-600 text-[10px] font-bold uppercase tracking-wider px-3 py-1.5 rounded">Data: GMCB FY2027 budgets</span>
        </div>
        <h1 className="ty-h1 font-black text-slate-900 mb-4 leading-tight">Single-Payer Modeler</h1>
        <p className="ty-hero text-slate-600 leading-relaxed max-w-3xl">
          What would a single payer do to each of Vermont&apos;s 14 hospitals? Choose a payment design and see how
          each hospital&apos;s FY2027 budget changes. Every input comes from a named public source, and each assumption
          is stated below the results.
        </p>
        <p className="text-sm mt-4">
          <Link href="/policy/medicare-for-all" className="text-blue-700 underline underline-offset-2">← Medicare for All: the five-pillar test</Link>
          {" · "}
          <Link href="/academy/tracks/medicare-for-all-five-pillar-test" className="text-blue-700 underline underline-offset-2">Academy course: Track 6 walks through this Modeler</Link>
        </p>
      </div>
      <ModelerClient />
    </div>
  );
}
