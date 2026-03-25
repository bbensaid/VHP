import { requireAuth } from "@/lib/auth";
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Saved Articles | HTR Account" };

export default async function BookmarksPage() {
  const user = await requireAuth("/account/bookmarks");
  const cookieStore = await cookies();
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    { cookies: { getAll: () => cookieStore.getAll() } }
  );

  const { data: bookmarks } = await supabase
    .from("bookmarks")
    .select("id, slug, title, pillar, content_type, note, created_at")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <nav className="text-sm text-slate-500 mb-6">
          <Link href="/account" className="hover:text-indigo-600">Account</Link>
          <span className="mx-2">›</span>
          <span className="text-slate-800 font-medium">Saved Articles</span>
        </nav>
        <h1 className="text-3xl font-black text-slate-900 mb-8">Saved Articles</h1>

        {!bookmarks || bookmarks.length === 0 ? (
          <div className="bg-white border border-slate-200 rounded-2xl p-12 text-center">
            <p className="text-4xl mb-4">🔖</p>
            <p className="text-lg font-bold text-slate-700 mb-2">No saved articles yet</p>
            <p className="text-slate-500 text-sm mb-4">Bookmark articles as you read to find them here.</p>
            <Link href="/policy" className="inline-block bg-indigo-600 text-white font-bold px-5 py-2.5 rounded-xl text-sm hover:bg-indigo-700 transition-colors">
              Browse analyses →
            </Link>
          </div>
        ) : (
          <ul className="space-y-3">
            {bookmarks.map((b: { id: string; slug: string; title: string; pillar?: string; content_type?: string; note?: string; created_at: string }) => (
              <li key={b.id} className="bg-white border border-slate-200 rounded-xl p-5 hover:border-indigo-300 transition-all">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    {b.pillar && <p className="text-xs font-bold uppercase tracking-widest text-indigo-500 mb-1">{b.pillar}</p>}
                    <Link href={`/policy/${b.slug}`} className="font-bold text-slate-900 hover:text-indigo-600 transition-colors">{b.title}</Link>
                    {b.note && <p className="text-sm text-slate-500 mt-1 italic">"{b.note}"</p>}
                    <p className="text-xs text-slate-400 mt-1">{new Date(b.created_at).toLocaleDateString()}</p>
                  </div>
                  <Link href={`/policy/${b.slug}`} className="shrink-0 text-slate-300 hover:text-indigo-400 text-lg">→</Link>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
