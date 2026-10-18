import { notFound } from "next/navigation";
import { Suspense } from "react";
import { getRhtState } from "@/lib/sanity-dashboard-queries";
import { getCmsHospitals } from "@/lib/cms-hospitals";
import { stateCodeFor } from "@/lib/data/state-indicators";
import StateDetailClientPage from "./StateDetailClientPage";

export const revalidate = 3600;

// Rebuilt 2026-10-17: indicators come from lib/data/state-indicators.ts (sourced). The earlier Performance Index
// (Sanity statePerformanceIndex / Supabase state_health_metrics / lib/data/performance-index-data.ts) had no source.
export default async function DynamicStatePage({ params }: { params: Promise<{ state: string }> }) {
  const stateSlug = (await params).state.toLowerCase();
  const code = stateCodeFor(stateSlug);
  if (!code) return notFound();

  const [rht, hospitals] = await Promise.all([
    // Description and initiatives paraphrase CMS's RHT state project abstracts (December 2025).
    getRhtState(stateSlug.replace(/-/g, "_")).then((r) => r ?? getRhtState(stateSlug)),
    getCmsHospitals(stateSlug),
  ]);

  return (
    <Suspense>
      <StateDetailClientPage
        code={code}
        stateSlug={stateSlug}
        rht={rht ? { description: rht.description ?? "", initiatives: rht.initiatives ?? [] } : null}
        hospitals={hospitals}
      />
    </Suspense>
  );
}
