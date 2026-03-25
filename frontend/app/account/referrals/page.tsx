"use client";

import { useState, useEffect } from "react";
import { createBrowserClient } from "@supabase/ssr";
import {
  ClipboardDocumentIcon,
  CheckIcon,
  GiftIcon,
  UserGroupIcon,
} from "@heroicons/react/24/outline";

const supabase = createBrowserClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

interface ReferralEvent {
  id: string;
  status: "signed_up" | "converted" | "credited";
  reward_months: number;
  created_at: string;
}

export default function ReferralsPage() {
  const [code, setCode]           = useState<string | null>(null);
  const [events, setEvents]       = useState<ReferralEvent[]>([]);
  const [copied, setCopied]       = useState(false);
  const [loading, setLoading]     = useState(true);

  const referralUrl = code
    ? `${typeof window !== "undefined" ? window.location.origin : ""}/signup?ref=${code}`
    : null;

  useEffect(() => {
    async function load() {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      // Get or create referral code via DB function
      const { data: codeData } = await supabase
        .rpc("get_or_create_referral_code", { p_user_id: user.id });
      setCode(codeData as string | null);

      // Load referral events
      const { data: eventsData } = await supabase
        .from("referral_events")
        .select("id, status, reward_months, created_at")
        .eq("referrer_id", user.id)
        .order("created_at", { ascending: false });
      setEvents((eventsData as ReferralEvent[]) || []);
      setLoading(false);
    }
    load();
  }, []);

  async function copyLink() {
    if (!referralUrl) return;
    await navigator.clipboard.writeText(referralUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  const totalConverted = events.filter(e => e.status !== "signed_up").length;
  const totalMonths    = events.reduce((sum, e) => sum + e.reward_months, 0);

  return (
    <div className="max-w-2xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-black text-slate-900 mb-2">Referral Program</h1>
      <p className="text-slate-500 mb-8">
        Share HTR with colleagues and earn <span className="font-semibold text-indigo-700">1 free month</span> for every person who subscribes using your link.
      </p>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        {[
          { icon: UserGroupIcon, label: "Sign-ups",  value: events.length },
          { icon: CheckIcon,     label: "Converted", value: totalConverted },
          { icon: GiftIcon,      label: "Months earned", value: totalMonths },
        ].map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.label} className="bg-white border border-slate-200 rounded-xl p-5 text-center">
              <Icon className="w-5 h-5 text-indigo-400 mx-auto mb-2" />
              <p className="text-2xl font-black text-slate-900">{stat.value}</p>
              <p className="text-xs text-slate-400 font-semibold uppercase tracking-wide mt-0.5">{stat.label}</p>
            </div>
          );
        })}
      </div>

      {/* Referral link */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 mb-6">
        <h2 className="font-bold text-slate-900 mb-3">Your referral link</h2>
        {loading ? (
          <div className="h-12 bg-slate-100 rounded-xl animate-pulse" />
        ) : (
          <div className="flex items-center gap-3">
            <div className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-600 font-mono truncate">
              {referralUrl}
            </div>
            <button
              onClick={copyLink}
              className="shrink-0 flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold px-4 py-3 rounded-xl text-sm transition-colors"
            >
              {copied
                ? <><CheckIcon className="w-4 h-4" /> Copied!</>
                : <><ClipboardDocumentIcon className="w-4 h-4" /> Copy</>
              }
            </button>
          </div>
        )}
        <p className="text-xs text-slate-400 mt-3">
          Your referral code: <span className="font-mono font-bold text-slate-600">{code ?? "—"}</span>
        </p>
      </div>

      {/* How it works */}
      <div className="bg-indigo-50 border border-indigo-200 rounded-2xl p-6 mb-8">
        <h2 className="font-bold text-indigo-900 mb-3">How it works</h2>
        <ol className="space-y-2 text-sm text-indigo-800">
          <li className="flex gap-3"><span className="font-black text-indigo-400">1.</span> Share your unique link with a colleague.</li>
          <li className="flex gap-3"><span className="font-black text-indigo-400">2.</span> They sign up and start a free trial.</li>
          <li className="flex gap-3"><span className="font-black text-indigo-400">3.</span> When they convert to a paid plan, you earn 1 free month — automatically credited to your subscription.</li>
        </ol>
      </div>

      {/* History */}
      <h2 className="font-bold text-slate-900 mb-4">Referral history</h2>
      {loading ? (
        <div className="space-y-3">
          {[1, 2].map(i => <div key={i} className="h-14 bg-slate-100 rounded-xl animate-pulse" />)}
        </div>
      ) : events.length === 0 ? (
        <p className="text-sm text-slate-400 py-8 text-center">No referrals yet — share your link to get started.</p>
      ) : (
        <div className="space-y-2">
          {events.map((e) => (
            <div key={e.id} className="flex items-center justify-between bg-white border border-slate-100 rounded-xl px-5 py-3">
              <div>
                <span className={`text-xs font-bold uppercase tracking-wide px-2 py-0.5 rounded-full ${
                  e.status === "credited"  ? "bg-emerald-100 text-emerald-700" :
                  e.status === "converted" ? "bg-indigo-100 text-indigo-700"  :
                                             "bg-slate-100 text-slate-500"
                }`}>
                  {e.status}
                </span>
              </div>
              <div className="text-right">
                <p className="text-xs text-slate-400">{new Date(e.created_at).toLocaleDateString()}</p>
                {e.reward_months > 0 && (
                  <p className="text-xs text-emerald-600 font-semibold">+{e.reward_months} month{e.reward_months > 1 ? "s" : ""}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
