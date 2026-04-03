import { cachedFetch } from "@/lib/sanity-fetch";
import InvestmentTrackerClient, { Deal } from "./InvestmentTrackerClient";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Investment Tracker | Vermont Health Reform",
  description:
    "Track M&A activity, venture capital, private equity, and strategic partnerships shaping the healthcare industry.",
};

export const revalidate = 300; // 5 min; webhook will bust earlier on new deal entry

const DEALS_QUERY = `
  *[_type == "investmentDeal"] | order(announcedDate desc) {
    "_id": _id,
    title,
    dealType,
    status,
    announcedDate,
    closedDate,
    dealValueUsd,
    acquirer,
    target,
    pillar,
    sector,
    geography,
    summary,
    analystNote,
    sourceUrl,
    tags
  }
`;

export default async function InvestmentTrackerPage() {
  const deals = await cachedFetch<Deal[]>(DEALS_QUERY, undefined, {
    tags: ["investmentDeal"],
    revalidate: 300,
  });

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-black text-slate-900 dark:text-slate-100 mb-1">
          Investment Tracker
        </h1>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          M&amp;A, venture capital, private equity, and strategic partnerships shaping healthcare.
        </p>
      </div>

      <InvestmentTrackerClient deals={deals ?? []} />
    </div>
  );
}
