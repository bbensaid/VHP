import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import ThreadView from "./ThreadView";

export const revalidate = 30;

interface Props {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const cookieStore = await cookies();
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    { cookies: { getAll: () => cookieStore.getAll() } }
  );
  const { data: thread } = await supabase
    .from("community_threads")
    .select("title")
    .eq("id", id)
    .single();
  if (!thread) return { title: "Thread | HTR Community" };
  return { title: `${thread.title} | HTR Community` };
}

export default async function ThreadPage({ params }: Props) {
  const { id } = await params;
  const cookieStore = await cookies();
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    { cookies: { getAll: () => cookieStore.getAll() } }
  );

  const [
    { data: thread },
    { data: { user } = { user: null } },
  ] = await Promise.all([
    supabase
      .from("community_threads")
      .select("*, community_categories(slug, name, icon)")
      .eq("id", id)
      .single(),
    supabase.auth.getUser(),
  ]);

  if (!thread) notFound();

  const { data: posts } = await supabase
    .from("community_posts")
    .select("id, body, upvotes, created_at, updated_at, author_id")
    .eq("thread_id", id)
    .order("created_at", { ascending: true });

  const category = thread.community_categories as { slug: string; name: string; icon: string } | null;

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-3xl mx-auto px-4 py-4">
          <nav className="text-sm text-slate-500" aria-label="Breadcrumb">
            <Link href="/community" className="hover:text-indigo-600 transition-colors">Community</Link>
            {category && (
              <>
                <span className="mx-2">›</span>
                <Link href={`/community/${category.slug}`} className="hover:text-indigo-600 transition-colors">
                  {category.icon} {category.name}
                </Link>
              </>
            )}
            <span className="mx-2">›</span>
            <span className="text-slate-800 font-medium line-clamp-1">{thread.title}</span>
          </nav>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-6">
        {/* Thread OP */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 mb-4">
          <div className="flex items-start justify-between gap-4 mb-4">
            <h1 className="text-2xl font-black text-slate-900 leading-tight">{thread.title}</h1>
            <div className="shrink-0 flex gap-1.5">
              {thread.pinned && <span className="text-xs bg-indigo-100 text-indigo-700 font-bold px-2 py-0.5 rounded-full">Pinned</span>}
              {thread.locked && <span className="text-xs bg-slate-100 text-slate-600 font-bold px-2 py-0.5 rounded-full">Locked</span>}
            </div>
          </div>
          <p className="text-slate-700 leading-relaxed whitespace-pre-wrap">{thread.body}</p>
          <p className="text-xs text-slate-400 mt-4">
            Posted {new Date(thread.created_at).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
            {" · "}{thread.reply_count} {thread.reply_count === 1 ? "reply" : "replies"}
            {" · "}{thread.view_count} views
          </p>
        </div>

        {/* Replies + reply form (client component) */}
        <ThreadView
          threadId={id}
          initialPosts={posts ?? []}
          locked={thread.locked}
          userId={user?.id ?? null}
        />
      </div>
    </div>
  );
}
