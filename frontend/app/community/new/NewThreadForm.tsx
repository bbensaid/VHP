"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createBrowserClient } from "@supabase/ssr";

interface Category {
  id: string;
  slug: string;
  name: string;
  icon: string;
}

interface Props {
  categories: Category[];
  defaultCategory?: string;
  userId: string;
}

export default function NewThreadForm({ categories, defaultCategory, userId }: Props) {
  const router = useRouter();
  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  const defaultCat = categories.find(c => c.slug === defaultCategory) ?? categories[0];
  const [categoryId, setCategoryId] = useState(defaultCat?.id ?? "");
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (title.trim().length < 5) {
      setError("Title must be at least 5 characters.");
      return;
    }
    if (body.trim().length < 10) {
      setError("Body must be at least 10 characters.");
      return;
    }

    startTransition(async () => {
      const { data, error: insertError } = await supabase
        .from("community_threads")
        .insert({
          category_id: categoryId,
          author_id: userId,
          title: title.trim(),
          body: body.trim(),
        })
        .select("id")
        .single();

      if (insertError) {
        setError(insertError.message);
        return;
      }
      if (data) {
        router.push(`/community/thread/${data.id}`);
      }
    });
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white border border-slate-200 rounded-2xl p-6 space-y-5">
      {/* Category */}
      <div>
        <label htmlFor="thread-category" className="block text-sm font-bold text-slate-700 mb-2">
          Category
        </label>
        <select
          id="thread-category"
          value={categoryId}
          onChange={e => setCategoryId(e.target.value)}
          required
          className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-800 outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 bg-white"
        >
          {categories.map(cat => (
            <option key={cat.id} value={cat.id}>
              {cat.icon} {cat.name}
            </option>
          ))}
        </select>
      </div>

      {/* Title */}
      <div>
        <label htmlFor="thread-title" className="block text-sm font-bold text-slate-700 mb-2">
          Title <span className="text-slate-400 font-normal">(5–200 characters)</span>
        </label>
        <input
          id="thread-title"
          type="text"
          value={title}
          onChange={e => setTitle(e.target.value)}
          placeholder="A clear, specific title for your discussion…"
          minLength={5}
          maxLength={200}
          required
          className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-800 outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
        />
        <p className="text-xs text-slate-400 mt-1 text-right">{title.length}/200</p>
      </div>

      {/* Body */}
      <div>
        <label htmlFor="thread-body" className="block text-sm font-bold text-slate-700 mb-2">
          Body <span className="text-slate-400 font-normal">(10–10,000 characters)</span>
        </label>
        <textarea
          id="thread-body"
          value={body}
          onChange={e => setBody(e.target.value)}
          placeholder="Share context, ask your question, or make your argument…"
          rows={8}
          minLength={10}
          maxLength={10000}
          required
          className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-800 outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 resize-y"
        />
        <p className="text-xs text-slate-400 mt-1 text-right">{body.length}/10,000</p>
      </div>

      {error && (
        <p role="alert" className="text-sm text-rose-600 bg-rose-50 border border-rose-200 rounded-xl px-4 py-3">
          {error}
        </p>
      )}

      {/* Guidelines reminder */}
      <div className="bg-indigo-50 border border-indigo-200 rounded-xl p-4 text-xs text-indigo-800 space-y-1">
        <p className="font-bold text-indigo-900 mb-1">Before you post:</p>
        <p>• Be respectful and professional</p>
        <p>• Cite sources when making factual claims</p>
        <p>• No promotional content or spam</p>
        <p>• Protect patient and organizational privacy</p>
      </div>

      <div className="flex items-center justify-between pt-1">
        <Link href="/community" className="text-sm text-slate-500 hover:text-slate-700 transition-colors">
          Cancel
        </Link>
        <button
          type="submit"
          disabled={isPending || title.trim().length < 5 || body.trim().length < 10 || !categoryId}
          className="bg-indigo-600 text-white font-bold px-6 py-2.5 rounded-xl text-sm hover:bg-indigo-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isPending ? "Posting…" : "Post Discussion"}
        </button>
      </div>
    </form>
  );
}
