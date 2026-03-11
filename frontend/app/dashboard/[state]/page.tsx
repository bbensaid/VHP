import { notFound } from "next/navigation";
import { getRhtState, getPerformanceIndex, getHospitalsByState } from "@/lib/sanity-dashboard-queries";
import { performanceIndexData } from "@/lib/data/performance-index-data";
import { rhtProgramData } from "@/lib/data/rht-program";
import StateDetailClientPage from "./StateDetailClientPage";

export const revalidate = 3600;

export default async function DynamicStatePage({ params }: { params: Promise<{ state: string }> }) {
  const resolvedParams = await params;
  const stateSlug = resolvedParams.state.toLowerCase();

  const [sanityIndex, sanityProgram, hospitals] = await Promise.all([
    getPerformanceIndex(stateSlug),
    getRhtState(stateSlug),
    getHospitalsByState(stateSlug),
  ]);

  // Fall back to static data files if Sanity has no document for this state yet
  const indexData = sanityIndex ?? performanceIndexData[stateSlug] ?? null;
  const programData = sanityProgram ?? rhtProgramData[stateSlug] ?? null;

  if (!indexData && !programData) {
    return notFound();
  }

  return (
    <StateDetailClientPage
      indexData={indexData}
      programData={programData}
      stateSlug={stateSlug}
      hospitals={hospitals}
    />
  );
}
