import { BoltIcon } from "@heroicons/react/24/outline";
import WireFeed from "./WireFeed";
import { getUser } from "@/lib/auth";
import VermontBillTracker from "./VermontBillTracker";
import { getTrackedBills, type BillStatus } from "@/lib/wire/vt-bills";
import { getWireFeed, type WireFeed as WireFeedData } from "@/lib/wire/feed";

export const metadata = {
  title: "The Wire | HTR Live Intelligence",
  description: "Real-time healthcare news aggregated from leading policy, regulatory, and clinical sources — updated continuously throughout the day.",
};

export const revalidate = 900; // 15 minutes

async function getWireItems(): Promise<WireFeedData> {
  try {
    return await getWireFeed();
  } catch {
    return { items: [], fetched_at: new Date().toISOString(), unavailable_sources: [] };
  }
}

async function getBills(): Promise<BillStatus[]> {
  try {
    return await getTrackedBills();
  } catch {
    return [];
  }
}

export default async function TheWirePage() {
  const [{ items, fetched_at, unavailable_sources }, user, bills] = await Promise.all([
    getWireItems(),
    getUser(),
    getBills(),
  ]);

  return (
    <div className="max-w-3xl mx-auto px-4 pt-8 pb-8">
      {/* Hero */}
      <div className="bg-slate-50 border border-slate-200 rounded-2xl px-6 py-8 mb-8">
        <span className="inline-block text-xs font-black uppercase tracking-widest text-amber-700 bg-amber-50 border border-amber-200 rounded-full px-3 py-1 mb-4">
          Live Intelligence
        </span>
        <div className="flex items-center gap-2 mb-2">
          <BoltIcon className="w-5 h-5 text-amber-500" />
          <h1 className="ty-h1 font-black tracking-tight text-slate-900 dark:text-slate-50">
            The Wire
          </h1>
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-rose-100 dark:bg-rose-900/40 text-rose-600 dark:text-rose-400 text-[10px] font-black uppercase tracking-wider">
            <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-pulse" />
            Live
          </span>
        </div>
        <p className="text-slate-600 dark:text-slate-400">
          Real-time healthcare news aggregated from leading policy, regulatory, and clinical sources.
        </p>
      </div>

      {/* Vermont Legislature bill tracker (Ch.14 early-warning signals) */}
      <VermontBillTracker bills={bills} />

      {/* Feed */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl shadow-sm p-6">
        <WireFeed
          initialItems={items}
          fetchedAt={fetched_at}
          currentUserId={user?.id}
          unavailableSources={unavailable_sources}
        />
      </div>
    </div>
  );
}
