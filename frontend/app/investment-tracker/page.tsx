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
    <div className="max-w-4xl mx-auto px-4 pt-8 pb-8">
      <div className="bg-slate-50 border border-slate-200 rounded-2xl px-8 py-10 mb-8">
        <span className="inline-block text-xs font-black uppercase tracking-widest text-emerald-700 bg-emerald-50 border border-emerald-200 rounded-full px-3 py-1 mb-4">
          Analyze &amp; Tools
        </span>
        <h1 className="ty-h1 font-black text-slate-900 dark:text-slate-100 mb-3">
          Investment Tracker
        </h1>
        <p className="ty-hero text-slate-600 dark:text-slate-400 max-w-3xl leading-relaxed">
          M&amp;A, venture capital, private equity, and strategic partnerships shaping healthcare.
        </p>
      </div>

      <InvestmentTrackerClient deals={deals ?? []} />
    </div>
  );
}
