import { getAllPerformanceIndexes } from "@/lib/sanity-dashboard-queries";
import DashboardIndexClient from "./DashboardIndexClient";

export const revalidate = 3600; // re-fetch from Sanity at most once per hour

export default async function DashboardIndex() {
  const allStates = await getAllPerformanceIndexes();
  return <DashboardIndexClient allStates={allStates} />;
}
