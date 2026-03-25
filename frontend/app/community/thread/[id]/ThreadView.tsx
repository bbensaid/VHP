"use client";

import { useState, useTransition } from "react";
import { createBrowserClient } from "@supabase/ssr";

interface Post {
  id: string;
  body: string;
  upvotes: number;
  created_at: string;
  updated_at: string;
  author_id: string;
}

interface Props {
  threadId: string;
  initialPosts: Post[];
  locked: boolean;
  userId: string | null;
}

export default function ThreadView({ threadId, initialPosts, locked, userId }: Props) {
  const [posts, setPosts] = useState<Post[]>(initialPosts);
  const [body, setBody] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  async function submitReply(e: React.FormEvent) {
    e.preventDefault();
    if (!body.trim()) return;
    setError(null);

    startTransition(async () => {
      const { data, error: insertError } = await supabase
        .from("community_posts")
        .insert({ thread_id: threadId, body: body.trim(), author_id: userId })
        .select("id, body, upvotes, created_at, updated_at, author_id")
        .single();

      if (insertError) {
        setError(insertError.message);
        return;
      }
      if (data) {
        setPosts(prev => [...prev, data]);
        setBody("");
      }
    });
  }

  async function handleUpvote(postId: string) {
    if (!userId) return;
    // Optimistic update
    setPosts(prev =>
      prev.map(p => p.id === postId ? { ...p, upvotes: p.upvotes + 1 } : p)
    );
    const { error: upvoteError } = await supabase
      .from("community_upvotes")
      .insert({ user_id: userId, post_id: postId });
    if (upvoteError) {
      // Revert on conflict (already upvoted) or error
      setPosts(prev =>
        prev.map(p => p.id === postId ? { ...p, upvotes: p.upvotes - 1 } : p)
      );
    }
  }

  return (
    <div className="space-y-3">
      {/* Replies */}
      {posts.length === 0 ? (
        <div className="bg-white border border-slate-200 rounded-2xl p-8 text-center text-slate-400">
          No replies yet.{userId && !locked ? " Be the first to respond!" : ""}
        </div>
      ) : (
        posts.map((post, idx) => (
          <div key={post.id} className="bg-white border border-slate-200 rounded-2xl p-5">
            <div className="flex items-start justify-between gap-3">
              <div className="flex-1">
                <p className="text-xs text-slate-400 mb-2">
                  Reply #{idx + 1} · {new Date(post.created_at).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                  {post.updated_at !== post.created_at && " · edited"}
                </p>
                <p className="text-slate-700 leading-relaxed whitespace-pre-wrap">{post.body}</p>
              </div>
              {userId && (
                <button
                  onClick={() => handleUpvote(post.id)}
                  className="shrink-0 flex flex-col items-center gap-0.5 text-slate-400 hover:text-indigo-600 transition-colors group"
                  aria-label={`Upvote reply ${idx + 1}`}
                >
                  <svg className="w-4 h-4 group-hover:scale-110 transition-transform" aria-hidden="true" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
                  </svg>
                  <span className="text-xs font-bold">{post.upvotes}</span>
                </button>
              )}
              {!userId && post.upvotes > 0 && (
                <span className="shrink-0 text-xs text-slate-400 font-semibold">▲ {post.upvotes}</span>
              )}
            </div>
          </div>
        ))
      )}

      {/* Reply form */}
      {!locked && userId ? (
        <div className="bg-white border border-slate-200 rounded-2xl p-5 mt-6">
          <h2 className="text-sm font-bold text-slate-700 mb-3">Add a reply</h2>
          <form onSubmit={submitReply} className="space-y-3">
            <label htmlFor="reply-body" className="sr-only">Your reply</label>
            <textarea
              id="reply-body"
              value={body}
              onChange={e => setBody(e.target.value)}
              placeholder="Share your thoughts…"
              rows={4}
              minLength={2}
              maxLength={10000}
              required
              className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-800 outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 resize-y"
            />
            {error && <p className="text-xs text-rose-600">{error}</p>}
            <div className="flex items-center justify-between">
              <span className="text-xs text-slate-400">{body.length}/10000</span>
              <button
                type="submit"
                disabled={isPending || body.trim().length < 2}
                className="bg-indigo-600 text-white font-bold px-5 py-2 rounded-xl text-sm hover:bg-indigo-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isPending ? "Posting…" : "Post Reply"}
              </button>
            </div>
          </form>
        </div>
      ) : !locked && !userId ? (
        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 mt-4 text-center">
          <p className="text-sm text-slate-500 mb-3">Sign in to join the discussion.</p>
          <a
            href="/login?from=/community"
            className="inline-block bg-indigo-600 text-white font-bold px-5 py-2 rounded-xl text-sm hover:bg-indigo-700 transition-colors"
          >
            Sign in
          </a>
        </div>
      ) : locked ? (
        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 mt-2 text-center text-sm text-slate-500">
          🔒 This thread is locked and no longer accepting replies.
        </div>
      ) : null}
    </div>
  );
}
