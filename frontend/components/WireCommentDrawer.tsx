"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { createClient } from "@supabase/supabase-js";
import { XMarkIcon, ChatBubbleLeftIcon } from "@heroicons/react/24/outline";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

interface Profile { full_name: string | null; avatar_url: string | null }

interface Comment {
  id: string;
  body: string;
  upvotes: number;
  created_at: string;
  user_id: string;
  profiles: Profile | null;
}

interface Props {
  articleUrl: string;
  articleTitle: string;
  isOpen: boolean;
  onClose: () => void;
  currentUserId?: string;
  onCommentPosted?: () => void;
}

function timeAgo(iso: string): string {
  const diff = Date.now() - new Date(iso).getTime();
  const m = Math.floor(diff / 60000);
  if (m < 1) return "just now";
  if (m < 60) return `${m}m ago`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h}h ago`;
  return `${Math.floor(h / 24)}d ago`;
}

function Avatar({ name }: { name: string | null }) {
  const initials = (name ?? "?").split(" ").map(n => n[0]).join("").slice(0, 2).toUpperCase();
  return (
    <div className="w-7 h-7 rounded-full bg-indigo-100 dark:bg-indigo-900/50 text-indigo-700 dark:text-indigo-300 flex items-center justify-center text-[10px] font-black shrink-0">
      {initials}
    </div>
  );
}

export default function WireCommentDrawer({
  articleUrl,
  articleTitle,
  isOpen,
  onClose,
  currentUserId,
  onCommentPosted,
}: Props) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [body, setBody] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const loadComments = useCallback(async () => {
    setIsLoading(true);
    try {
      const res = await fetch(`/api/wire/comments?url=${encodeURIComponent(articleUrl)}`);
      const data = await res.json();
      setComments(data.comments ?? []);
    } finally {
      setIsLoading(false);
    }
  }, [articleUrl]);

  // Load on open
  useEffect(() => {
    if (!isOpen) return;
    loadComments();
    setTimeout(() => inputRef.current?.focus(), 150);
  }, [isOpen, loadComments]);

  // Realtime subscription
  useEffect(() => {
    if (!isOpen) return;

    const channel = supabase
      .channel(`wire:${articleUrl}`)
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "wire_comments",
          filter: `article_url=eq.${articleUrl}`,
        },
        async (_payload) => {
          // Fetch the full row including profile join
          const res = await fetch(`/api/wire/comments?url=${encodeURIComponent(articleUrl)}`);
          const data = await res.json();
          setComments(data.comments ?? []);
        }
      )
      .on(
        "postgres_changes",
        { event: "DELETE", schema: "public", table: "wire_comments" },
        (payload) => {
          setComments(prev => prev.filter(c => c.id !== payload.old.id));
        }
      )
      .subscribe();

    return () => { supabase.removeChannel(channel); };
  }, [isOpen, articleUrl]);

  // Scroll to bottom when new comments arrive
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [comments.length]);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!body.trim() || isSubmitting) return;
    setIsSubmitting(true);
    setError(null);

    try {
      const res = await fetch("/api/wire/comments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ article_url: articleUrl, article_title: articleTitle, body: body.trim() }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? "Failed to post comment");
        return;
      }
      // Optimistically add
      setComments(prev => [...prev, data.comment]);
      setBody("");
      onCommentPosted?.();
    } catch {
      setError("Network error — please try again");
    } finally {
      setIsSubmitting(false);
    }
  }

  async function deleteComment(id: string) {
    const res = await fetch(`/api/wire/comments/${id}`, { method: "DELETE" });
    if (res.ok) setComments(prev => prev.filter(c => c.id !== id));
  }

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-900/40 z-40 lg:hidden"
        onPointerDown={onClose}
        aria-hidden="true"
      />

      {/* Drawer */}
      <div
        role="dialog"
        aria-label="Article discussion"
        className="fixed right-0 top-0 bottom-0 w-full sm:w-105 bg-white dark:bg-slate-900 shadow-2xl z-50 flex flex-col"
      >
        {/* Header */}
        <div className="flex items-start gap-3 px-5 py-4 border-b border-slate-200 dark:border-slate-700 shrink-0">
          <ChatBubbleLeftIcon className="w-5 h-5 text-indigo-500 shrink-0 mt-0.5" />
          <div className="flex-1 min-w-0">
            <p className="text-xs font-black uppercase tracking-widest text-slate-500 dark:text-slate-400">Discussion</p>
            <p className="text-sm font-semibold text-slate-800 dark:text-slate-100 line-clamp-2 mt-0.5 leading-snug">
              {articleTitle}
            </p>
          </div>
          <button
            onClick={onClose}
            className="shrink-0 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
            aria-label="Close discussion"
          >
            <XMarkIcon className="w-5 h-5" />
          </button>
        </div>

        {/* Comments list */}
        <div className="flex-1 min-h-0 overflow-y-auto px-5 py-4 space-y-4">
          {isLoading ? (
            <p className="text-sm text-slate-400 dark:text-slate-500 text-center py-8">Loading…</p>
          ) : comments.length === 0 ? (
            <div className="text-center py-10">
              <p className="text-2xl mb-2">💬</p>
              <p className="text-sm font-semibold text-slate-600 dark:text-slate-300">No comments yet</p>
              <p className="text-xs text-slate-400 dark:text-slate-500 mt-1">Be the first to start the discussion</p>
            </div>
          ) : (
            comments.map(c => (
              <div key={c.id} className="flex gap-3">
                <Avatar name={c.profiles?.full_name ?? null} />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-bold text-slate-700 dark:text-slate-200">
                      {c.profiles?.full_name ?? "Member"}
                    </span>
                    <span className="text-[10px] text-slate-400 dark:text-slate-500">
                      {timeAgo(c.created_at)}
                    </span>
                    {currentUserId === c.user_id && (
                      <button
                        onClick={() => deleteComment(c.id)}
                        className="ml-auto text-[10px] text-rose-400 hover:text-rose-600 transition-colors"
                        aria-label="Delete comment"
                      >
                        delete
                      </button>
                    )}
                  </div>
                  <p className="text-sm text-slate-700 dark:text-slate-200 leading-relaxed whitespace-pre-wrap wrap-break-word">
                    {c.body}
                  </p>
                </div>
              </div>
            ))
          )}
          <div ref={bottomRef} />
        </div>

        {/* Compose */}
        <div className="shrink-0 border-t border-slate-200 dark:border-slate-700 px-5 py-4">
          {currentUserId ? (
            <form onSubmit={submit} className="space-y-2">
              {error && (
                <p className="text-xs text-rose-600 dark:text-rose-400">{error}</p>
              )}
              <textarea
                ref={inputRef}
                value={body}
                onChange={e => setBody(e.target.value)}
                placeholder="Add to the discussion…"
                rows={3}
                maxLength={2000}
                className="w-full resize-none border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2 text-sm bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 placeholder-slate-400 outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 dark:focus:ring-indigo-900/30 transition"
              />
              <div className="flex items-center justify-between">
                <span className="text-[10px] text-slate-400 dark:text-slate-500">{body.length}/2000</span>
                <button
                  type="submit"
                  disabled={!body.trim() || isSubmitting}
                  className="px-4 py-1.5 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed text-white text-xs font-bold rounded-lg transition-colors"
                >
                  {isSubmitting ? "Posting…" : "Post"}
                </button>
              </div>
            </form>
          ) : (
            <p className="text-sm text-slate-500 dark:text-slate-400 text-center py-2">
              <a href="/login" className="text-indigo-600 font-semibold hover:underline">Sign in</a>
              {" "}to join the discussion
            </p>
          )}
        </div>
      </div>
    </>
  );
}
