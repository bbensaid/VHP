"use client";
import { useState } from "react";

interface Props {
  context?: string; // 'policy', 'economics', 'technology', 'clinical', 'equity' — for segmentation
  variant?: "banner" | "inline" | "footer";
}

export default function EmailCaptureBar({ context, variant = "inline" }: Props) {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    try {
      await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, source: context ?? "inline", digestEnabled: true }),
      });
      setSubmitted(true);
    } catch {
      // silent
    } finally {
      setLoading(false);
    }
  }

  if (submitted) {
    return (
      <div className={`text-center py-4 text-sm font-semibold text-emerald-600 ${variant === "banner" ? "bg-emerald-50 border border-emerald-200 rounded-xl px-4" : ""}`}>
        ✓ You're in! Watch for your first HTR brief.
      </div>
    );
  }

  if (variant === "banner") {
    return (
      <div className="bg-indigo-50 border border-indigo-200 rounded-xl px-4 py-3 flex flex-col sm:flex-row items-center gap-3">
        <p className="text-sm font-semibold text-indigo-900 shrink-0">Free weekly healthcare briefing →</p>
        <form onSubmit={handleSubmit} className="flex gap-2 flex-1 w-full">
          <input
            type="email" value={email} onChange={e => setEmail(e.target.value)}
            placeholder="your@email.com" required
            className="flex-1 border border-indigo-200 rounded-xl px-3 py-2 text-sm outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
          />
          <button type="submit" disabled={loading}
            className="shrink-0 bg-indigo-600 text-white font-bold px-4 py-2 rounded-xl text-sm hover:bg-indigo-700 transition-colors disabled:opacity-50">
            {loading ? "…" : "Subscribe"}
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 text-center">
      <p className="font-black text-slate-900 text-lg mb-1">Get the weekly HTR brief — free</p>
      <p className="text-slate-500 text-sm mb-4">Policy, economics, technology, and equity analysis delivered every week.</p>
      <form onSubmit={handleSubmit} className="flex gap-2 max-w-sm mx-auto">
        <input
          type="email" value={email} onChange={e => setEmail(e.target.value)}
          placeholder="your@email.com" required
          className="flex-1 border border-slate-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
        />
        <button type="submit" disabled={loading}
          className="shrink-0 bg-indigo-600 text-white font-bold px-4 py-2.5 rounded-xl text-sm hover:bg-indigo-700 transition-colors disabled:opacity-50">
          {loading ? "…" : "Subscribe"}
        </button>
      </form>
    </div>
  );
}
