"use client";

import React, { useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";

export default function ResetPasswordPage() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    const { error: authError } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password/confirm`,
    });
    setLoading(false);
    if (authError) {
      setError(authError.message);
    } else {
      setSent(true);
    }
  };

  if (sent) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center py-12 px-4">
        <div className="max-w-md w-full text-center space-y-4">
          <div className="text-5xl mb-4">📧</div>
          <h2 className="text-2xl font-extrabold text-slate-900">Check your email</h2>
          <p className="text-slate-600">
            We sent password reset instructions to <strong>{email}</strong>.
          </p>
          <Link href="/login" className="inline-block mt-4 text-sm text-sky-700 hover:underline">
            Back to login
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[80vh] flex items-center justify-center py-12 px-4 bg-surface-muted">
      <div className="max-w-md w-full space-y-8 bg-surface p-10 rounded-xl shadow-lg border border-ui-border">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-text-heading">Reset your password</h2>
          <p className="mt-2 text-sm text-text-body">
            Enter your email and we'll send you a reset link.
          </p>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg px-4 py-3">
            {error}
          </div>
        )}

        <form className="space-y-6" onSubmit={handleSubmit}>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email address"
            className="w-full px-3 py-3 border border-ui-border rounded-md text-sm focus:outline-none focus:ring-ui-primary focus:border-ui-primary"
          />
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 text-sm font-bold text-white bg-slate-900 rounded-md hover:bg-slate-700 transition disabled:opacity-60"
          >
            {loading ? "Sending…" : "Send reset link"}
          </button>
          <div className="text-center">
            <Link href="/login" className="text-sm text-slate-500 hover:underline">
              Back to login
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
