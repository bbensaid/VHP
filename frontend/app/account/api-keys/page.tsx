import { requireAuth, roleAtLeast } from "@/lib/auth";
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import Link from "next/link";
import type { Metadata } from "next";
import ApiKeysClient from "./ApiKeysClient";

export const metadata: Metadata = {
  title: "API Keys | HTR Account",
};

interface ApiKey {
  id: string;
  name: string;
  key_prefix: string;
  tier: string;
  requests_today: number;
  last_used_at: string | null;
  created_at: string;
  revoked_at: string | null;
}

export default async function ApiKeysPage() {
  const user = await requireAuth("/account/api-keys");
  const cookieStore = await cookies();
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    { cookies: { getAll: () => cookieStore.getAll() } }
  );

  const { data: keys } = await supabase
    .from("api_keys")
    .select("id, name, key_prefix, tier, requests_today, last_used_at, created_at, revoked_at")
    .order("created_at", { ascending: false });

  // Only professional/advisory/admin can use the API
  const canUseApi = roleAtLeast(user.role, "professional");

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <nav className="text-sm text-slate-500 mb-6" aria-label="Breadcrumb">
          <Link href="/account" className="hover:text-indigo-600 transition-colors">Account</Link>
          <span className="mx-2">›</span>
          <span className="text-slate-800 font-medium">API Keys</span>
        </nav>

        <div className="flex items-start justify-between mb-8">
          <div>
            <h1 className="text-3xl font-black text-slate-900">API Keys</h1>
            <p className="text-slate-500 mt-1 text-sm">
              Authenticate your applications and scripts against the HTR developer API.
            </p>
          </div>
          <Link
            href="/developers"
            className="shrink-0 text-sm font-semibold text-indigo-600 hover:text-indigo-800 border border-indigo-200 rounded-lg px-4 py-2 hover:bg-indigo-50 transition-colors"
          >
            API Docs →
          </Link>
        </div>

        {!canUseApi ? (
          <div className="bg-amber-50 border border-amber-200 rounded-2xl p-8 text-center">
            <p className="text-amber-900 font-bold text-lg mb-2">API access requires a Professional plan or higher</p>
            <p className="text-amber-700 text-sm mb-4">
              The HTR developer API is available to Professional, Advisory, and Admin tier members.
            </p>
            <Link
              href="/pricing"
              className="inline-block bg-amber-600 text-white font-bold px-5 py-2.5 rounded-xl text-sm hover:bg-amber-700 transition-colors"
            >
              View Plans
            </Link>
          </div>
        ) : (
          <ApiKeysClient
            initialKeys={(keys ?? []) as ApiKey[]}
            userId={user.id}
          />
        )}
      </div>
    </div>
  );
}
