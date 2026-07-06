import { requireRole } from "@/lib/auth";
import { dbAdmin } from "@/lib/db/client";
import Link from "next/link";
import { ArrowLeftIcon, BeakerIcon } from "@heroicons/react/24/outline";
import TesterFeedbackClient, { type FeedbackRow } from "./TesterFeedbackClient";

export const metadata = { title: "Tester Feedback | HTR Admin" };
export const revalidate = 0;

export default async function TesterFeedbackPage() {
  await requireRole("admin", "/");

  const { data, error } = await dbAdmin
    .from("tester_feedback")
    .select("id, tester_name, domain, total, works, issues, broken, low_detail, feedback, email_sent, created_at")
    .order("created_at", { ascending: false });

  if (error) {
    return (
      <div className="max-w-2xl mx-auto px-6 py-10">
        <p className="text-rose-600 text-sm">
          Failed to load tester feedback: {error.message}
          <br />
          Make sure you have run the SQL migration
          (supabase/migrations/20260705_tester_feedback.sql).
        </p>
      </div>
    );
  }

  const rows = (data ?? []) as FeedbackRow[];

  return (
    <div className="max-w-5xl mx-auto px-6 py-10">
      {/* Header */}
      <div className="mb-8">
        <Link
          href="/admin"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-400 hover:text-slate-700 mb-4 transition-colors"
        >
          <ArrowLeftIcon className="w-3.5 h-3.5" />
          Back to Admin
        </Link>

        <div className="flex items-center gap-3 mb-2">
          <div className="w-9 h-9 bg-indigo-100 rounded-xl flex items-center justify-center">
            <BeakerIcon className="w-5 h-5 text-indigo-600" />
          </div>
          <div>
            <h1 className="text-2xl font-black text-slate-900">Tester Feedback</h1>
            <p className="text-sm text-slate-500">
              Every beta tester submission, saved as it comes in.
            </p>
          </div>
        </div>
      </div>

      <TesterFeedbackClient rows={rows} />
    </div>
  );
}
