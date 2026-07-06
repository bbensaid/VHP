import { requireRole } from "@/lib/auth";
import { dbAdmin } from "@/lib/db/client";
import Link from "next/link";
import { ArrowLeftIcon, ShieldCheckIcon } from "@heroicons/react/24/outline";
import AccessCodesClient from "./AccessCodesClient";

export const metadata = { title: "Beta Access Codes | HTR Admin" };
export const revalidate = 0;

export default async function AccessCodesPage() {
  await requireRole("admin", "/");

  const { data: codes, error } = await dbAdmin
    .from("beta_access_codes")
    .select("id, code, label, is_active, allowed_domains, created_at")
    .order("created_at", { ascending: true });

  if (error) {
    return (
      <div className="max-w-2xl mx-auto px-6 py-10">
        <p className="text-rose-600 text-sm">
          Failed to load access codes: {error.message}
          <br />
          Make sure you have run the SQL migration (supabase/migrations/20260411_beta_access_codes.sql).
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-6 py-10">

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
            <ShieldCheckIcon className="w-5 h-5 text-indigo-600" />
          </div>
          <div>
            <h1 className="text-2xl font-black text-slate-900">Beta Access Codes</h1>
            <p className="text-sm text-slate-500">
              Manage who can access the MVP during the testing phase.
            </p>
          </div>
        </div>

        <div className="mt-4 bg-amber-50 border border-amber-200 rounded-xl px-4 py-3 text-xs text-amber-800 leading-relaxed">
          <strong>How it works:</strong> Any visitor who doesn&apos;t have a valid beta session cookie is
          redirected to <code className="bg-amber-100 px-1 rounded">/beta</code> and must enter an active
          access code to proceed. Sessions last 7 days per browser. Disabling a code prevents new sessions
          but does not invalidate existing ones.
        </div>
      </div>

      <AccessCodesClient initialCodes={codes ?? []} />
    </div>
  );
}
