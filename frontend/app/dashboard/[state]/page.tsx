import { notFound } from "next/navigation";
import { getRhtState, getPerformanceIndex, getHospitalsByState } from "@/lib/sanity-dashboard-queries";
import StateDetailClientPage from "./StateDetailClientPage";

export const revalidate = 3600;

export default async function DynamicStatePage({ params }: { params: Promise<{ state: string }> }) {
  const resolvedParams = await params;
  const stateSlug = resolvedParams.state.toLowerCase();

  const [indexData, programData, hospitals] = await Promise.all([
    getPerformanceIndex(stateSlug),
    getRhtState(stateSlug),
    getHospitalsByState(stateSlug),
  ]);

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
