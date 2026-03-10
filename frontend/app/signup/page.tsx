"use client";

import React, { useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";

export default function SignupPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const { error: authError } = await supabase.auth.signUp({
      email,
      password,
      options: { emailRedirectTo: `${window.location.origin}/dashboard` },
    });

    setLoading(false);
    if (authError) {
      setError(authError.message);
    } else {
      // Also add to subscriber list
      await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      }).catch(() => {});
      setSuccess(true);
    }
  };

  if (success) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center py-12 px-4">
        <div className="max-w-md w-full text-center space-y-4">
          <div className="text-5xl mb-4">📬</div>
          <h2 className="text-2xl font-extrabold text-slate-900">Check your email</h2>
          <p className="text-slate-600">
            We sent a confirmation link to <strong>{email}</strong>. Click it to activate your account.
          </p>
          <Link href="/" className="inline-block mt-4 text-sm text-sky-700 hover:underline">
            Back to home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[80vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-surface-muted">
      <div className="max-w-md w-full space-y-8 bg-surface p-10 rounded-xl shadow-lg border border-ui-border">
        <div className="text-center">
          <h2 className="mt-2 text-3xl font-extrabold text-text-heading">Create your account</h2>
          <p className="mt-2 text-sm text-text-body">
            Already have one?{" "}
            <Link href="/login" className="font-medium text-ui-primary hover:underline">
              Sign in
            </Link>
          </p>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg px-4 py-3">
            {error}
          </div>
        )}

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="email" className="sr-only">Email address</label>
              <input
                id="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="appearance-none rounded-none relative block w-full px-3 py-3 border border-ui-border placeholder-text-body/50 text-text-heading rounded-t-md focus:outline-none focus:ring-ui-primary focus:border-ui-primary focus:z-10 sm:text-sm"
                placeholder="Email address"
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">Password</label>
              <input
                id="password"
                type="password"
                required
                minLength={8}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="appearance-none rounded-none relative block w-full px-3 py-3 border border-ui-border placeholder-text-body/50 text-text-heading rounded-b-md focus:outline-none focus:ring-ui-primary focus:border-ui-primary focus:z-10 sm:text-sm"
                placeholder="Password (8+ characters)"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full flex justify-center py-3 px-4 border border-transparent text-sm font-bold rounded-md text-white bg-slate-900 hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-900 transition shadow-md disabled:opacity-60"
          >
            {loading ? "Creating account…" : "Create free account"}
          </button>

          <p className="text-xs text-center text-slate-500">
            By creating an account you agree to our{" "}
            <Link href="/terms" className="underline">Terms</Link> and{" "}
            <Link href="/privacy" className="underline">Privacy Policy</Link>.
          </p>
        </form>
      </div>
    </div>
  );
}
