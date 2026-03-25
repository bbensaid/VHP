import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

export const revalidate = 60;

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const cookieStore = await cookies();
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    { cookies: { getAll: () => cookieStore.getAll() } }
  );
  const { data: cat } = await supabase
    .from("community_categories")
    .select("name, description")
    .eq("slug", slug)
    .single();
  if (!cat) return { title: "Community | HTR" };
  return {
    title: `${cat.name} | HTR Community`,
    description: cat.description,
  };
}

export default async function CategoryPage({ params }: Props) {
  const { slug } = await params;
  const cookieStore = await cookies();
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    { cookies: { getAll: () => cookieStore.getAll() } }
  );

  const [{ data: category }, { data: { user } = { user: null } }] = await Promise.all([
    supabase.from("community_categories").select("*").eq("slug", slug).single(),
    supabase.auth.getUser(),
  ]);

  if (!category) notFound();

  const { data: threads } = await supabase
    .from("community_threads")
    .select("id, title, body, reply_count, view_count, pinned, locked, created_at, last_reply_at, author_id")
    .eq("category_id", category.id)
    .order("pinned", { ascending: false })
    .order("last_reply_at", { ascending: false, nullsFirst: false })
    .order("created_at", { ascending: false });

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Breadcrumb + header */}
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-5xl mx-auto px-4 py-4">
          <nav className="text-sm text-slate-500 mb-3" aria-label="Breadcrumb">
            <Link href="/community" className="hover:text-indigo-600 transition-colors">Community</Link>
            <span className="mx-2">›</span>
            <span className="text-slate-800 font-medium">{category.name}</span>
          </nav>
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <span className="text-3xl">{category.icon}</span>
              <div>
                <h1 className="text-2xl font-black text-slate-900">{category.name}</h1>
                <p className="text-sm text-slate-500">{category.description}</p>
              </div>
            </div>
            {user ? (
              <Link
                href={`/community/new?category=${category.slug}`}
                className="shrink-0 bg-indigo-600 text-white font-bold px-4 py-2 rounded-xl text-sm hover:bg-indigo-700 transition-colors"
              >
                New Thread
              </Link>
            ) : (
              <Link
                href="/login?from=/community"
                className="shrink-0 border border-indigo-300 text-indigo-600 font-bold px-4 py-2 rounded-xl text-sm hover:bg-indigo-50 transition-colors"
              >
                Sign in to post
              </Link>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-6">
        {threads && threads.length > 0 ? (
          <ul className="space-y-2">
            {threads.map(thread => (
              <li key={thread.id}>
                <Link
                  href={`/community/thread/${thread.id}`}
                  className="flex items-start gap-4 bg-white border border-slate-200 rounded-xl p-4 hover:border-indigo-300 hover:shadow-sm transition-all group"
                >
                  {/* Pinned / locked badges */}
                  <div className="shrink-0 w-8 flex flex-col items-center gap-1 mt-0.5">
                    {thread.pinned && (
                      <span className="text-indigo-500" title="Pinned" aria-label="Pinned">📌</span>
                    )}
                    {thread.locked && (
                      <span className="text-slate-400" title="Locked" aria-label="Locked">🔒</span>
                    )}
                    {!thread.pinned && !thread.locked && (
                      <span className="text-slate-200 text-xl">💬</span>
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <h2 className="font-bold text-slate-900 group-hover:text-indigo-600 transition-colors leading-snug">
                      {thread.title}
                    </h2>
                    <p className="text-sm text-slate-500 mt-0.5 line-clamp-1">
                      {thread.body}
                    </p>
                    <p className="text-xs text-slate-400 mt-1.5">
                      {new Date(thread.created_at).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                    </p>
                  </div>

                  <div className="shrink-0 text-right text-xs text-slate-400 space-y-1 ml-4 hidden sm:block">
                    <p className="font-semibold text-slate-600">{thread.reply_count} {thread.reply_count === 1 ? "reply" : "replies"}</p>
                    {thread.last_reply_at && (
                      <p>Last: {new Date(thread.last_reply_at).toLocaleDateString()}</p>
                    )}
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <div className="bg-white border border-slate-200 rounded-xl p-12 text-center">
            <p className="text-slate-400 text-lg mb-4">No threads yet in this category.</p>
            {user ? (
              <Link
                href={`/community/new?category=${category.slug}`}
                className="inline-block bg-indigo-600 text-white font-bold px-5 py-2.5 rounded-xl text-sm hover:bg-indigo-700 transition-colors"
              >
                Start the first discussion
              </Link>
            ) : (
              <Link
                href="/login?from=/community"
                className="inline-block border border-indigo-300 text-indigo-600 font-bold px-5 py-2.5 rounded-xl text-sm hover:bg-indigo-50 transition-colors"
              >
                Sign in to post
              </Link>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
