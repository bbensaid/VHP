import { getAllPerformanceIndexes } from "@/lib/sanity-dashboard-queries";
import { getUser, roleAtLeast } from "@/lib/auth";
import UpgradePrompt from "@/components/UpgradePrompt";
import DashboardIndexClient from "./DashboardIndexClient";
import Link from "next/link";

export const revalidate = 3600; // re-fetch from Sanity at most once per hour

export default async function DashboardIndex() {
  const [allStates, user] = await Promise.all([getAllPerformanceIndexes(), getUser()]);
  const isSubscriber = user ? roleAtLeast(user.role, "subscriber") : false;

  return (
    <>
      {!isSubscriber && (
        <div className="max-w-7xl mx-auto px-4 pt-6">
          <UpgradePrompt
            required="subscriber"
            feature="Full state dashboard access"
            compact
          />
        </div>
      )}
      <div className="max-w-7xl mx-auto px-4 pt-4 flex justify-end">
        <Link
          href="/dashboard/compare"
          className="text-sm font-bold text-indigo-600 hover:text-indigo-800 border border-indigo-200 rounded-lg px-4 py-2 hover:bg-indigo-50 transition-colors"
        >
          Compare states →
        </Link>
      </div>
      <DashboardIndexClient allStates={allStates} />
    </>
  );
}
