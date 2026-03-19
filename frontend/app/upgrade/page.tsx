import Link from "next/link";
import { getUser } from "@/lib/auth";
import { LockClosedIcon } from "@heroicons/react/24/outline";

export default async function UpgradePage() {
  const user = await getUser();

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4">
      <div className="max-w-lg w-full text-center">
        <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <LockClosedIcon className="w-8 h-8 text-indigo-600" />
        </div>
        <h1 className="text-3xl font-black text-slate-900 mb-3">
          Upgrade to access this feature
        </h1>
        <p className="text-slate-500 mb-8">
          This content is available to subscribers. Upgrade your plan to get full access to dashboards, AI Analyst, reports, and more.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link href="/pricing"
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold px-8 py-3 rounded-xl text-sm transition-colors">
            View Plans & Pricing
          </Link>
          {!user && (
            <Link href="/login"
              className="border border-slate-200 text-slate-700 hover:bg-slate-50 font-bold px-8 py-3 rounded-xl text-sm transition-colors">
              Sign in to existing account
            </Link>
          )}
          {user && (
            <Link href="/account"
              className="border border-slate-200 text-slate-700 hover:bg-slate-50 font-bold px-8 py-3 rounded-xl text-sm transition-colors">
              Back to Account
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
