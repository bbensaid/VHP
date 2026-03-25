import { getAllPerformanceIndexes } from "@/lib/sanity-dashboard-queries";
import CompareClient from "./CompareClient";

export const revalidate = 3600;

export default async function ComparePage() {
  const allStates = await getAllPerformanceIndexes();
  return <CompareClient allStates={allStates} />;
}
