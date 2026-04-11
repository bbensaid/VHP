import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Community | Health Transformation Review",
  description: "Join the HTR member community — discuss policy, economics, technology, and health system transformation with peers.",
};

export const revalidate = 60;

interface Category {
  id: string;
  slug: string;
  name: string;
  description: string;
  icon: string;
  sort_order: number;
  thread_count?: number;
}

export default async function CommunityPage() {
  const cookieStore = await cookies();
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    { cookies: { getAll: () => cookieStore.getAll() } }
  );

  const { data: categories } = await supabase
    .from("community_categories")
    .select("*")
    .order("sort_order");

  // Get recent threads across all categories
  const { data: recentThreads } = await supabase
    .from("community_threads")
    .select("id, title, reply_count, created_at, category_id")
    .order("created_at", { ascending: false })
    .limit(5);

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero */}
      <div className="bg-linear-to-br from-indigo-900 to-indigo-700 text-white py-14 px-4">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-black mb-3">HTR Community</h1>
          <p className="text-indigo-200 max-w-xl text-lg">
            Connect with healthcare executives, policy professionals, and researchers. Share insights, ask questions, and shape the future of health system transformation.
          </p>
          <div className="flex flex-wrap gap-3 mt-6">
            <Link
              href="/community/new"
              className="bg-white text-indigo-700 font-bold px-5 py-2.5 rounded-xl text-sm hover:bg-indigo-50 transition-colors"
            >
              Start a discussion
            </Link>
            <a
              href="https://join.slack.com/t/htr-community/shared_invite/placeholder"
              target="_blank"
              rel="noopener noreferrer"
              className="border border-indigo-400 text-indigo-100 hover:bg-indigo-800 font-bold px-5 py-2.5 rounded-xl text-sm transition-colors"
            >
              Join HTR Slack →
            </a>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-10 grid grid-cols-1 lg:grid-cols-3 gap-8">

        {/* Category list */}
        <div className="lg:col-span-2 space-y-3">
          <h2 className="text-xs font-black uppercase tracking-widest text-slate-400 mb-4">Discussion Categories</h2>
          {(categories as Category[] | null)?.map(cat => (
            <Link
              key={cat.id}
              href={`/community/${cat.slug}`}
              className="flex items-start gap-4 bg-white border border-slate-200 rounded-xl p-5 hover:border-indigo-300 hover:shadow-sm transition-all group"
            >
              <span className="text-2xl shrink-0 mt-0.5">{cat.icon}</span>
              <div className="flex-1 min-w-0">
                <h3 className="font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
                  {cat.name}
                </h3>
                <p className="text-sm text-slate-500 mt-0.5">{cat.description}</p>
              </div>
              <span className="text-slate-300 group-hover:text-indigo-400 text-lg shrink-0">→</span>
            </Link>
          ))}

          {(!categories || categories.length === 0) && (
            <div className="bg-white border border-slate-200 rounded-xl p-8 text-center text-slate-400">
              Community is launching soon. Check back shortly.
            </div>
          )}
        </div>

        {/* Sidebar */}
        <aside className="space-y-6">
          {/* Recent activity */}
          <div className="bg-white border border-slate-200 rounded-xl p-5">
            <h3 className="text-xs font-black uppercase tracking-widest text-slate-400 mb-4">Recent Discussions</h3>
            {recentThreads && recentThreads.length > 0 ? (
              <ul className="space-y-3">
                {recentThreads.map(t => (
                  <li key={t.id}>
                    <Link
                      href={`/community/thread/${t.id}`}
                      className="text-sm font-semibold text-slate-700 hover:text-indigo-600 transition-colors line-clamp-2 block"
                    >
                      {t.title}
                    </Link>
                    <p className="text-xs text-slate-400 mt-0.5">
                      {t.reply_count} {t.reply_count === 1 ? "reply" : "replies"} ·{" "}
                      {new Date(t.created_at).toLocaleDateString()}
                    </p>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-slate-400">No discussions yet. Be the first!</p>
            )}
          </div>

          {/* Community guidelines */}
          <div className="bg-indigo-50 border border-indigo-200 rounded-xl p-5">
            <h3 className="font-bold text-indigo-900 mb-2 text-sm">Community Guidelines</h3>
            <ul className="text-xs text-indigo-800 space-y-1.5">
              <li>• Be respectful and professional</li>
              <li>• Cite sources when making factual claims</li>
              <li>• No promotional content or spam</li>
              <li>• Protect patient and organizational privacy</li>
            </ul>
          </div>
        </aside>
      </div>
    </div>
  );
}
