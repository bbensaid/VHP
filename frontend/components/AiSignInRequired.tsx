"use client";

// The AI Analyst is for signed-in members only (author's decision 2026-11-27).
// Shown in place of the chat input to anyone not signed in, on the sidebar
// widget and on /chat. The server enforces the same rule (app/api/chat and the
// backend both refuse a request with no session); this is the clear message.

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { createBrowserClient } from "@supabase/ssr";
import { LockClosedIcon } from "@heroicons/react/24/outline";

import { AI_SIGN_IN_MESSAGE } from "@/lib/ai/signin";

export { AI_SIGN_IN_MESSAGE };

/** null while checking, then true/false. */
export function useSignedIn(): boolean | null {
  const [signedIn, setSignedIn] = useState<boolean | null>(null);
  useEffect(() => {
    const sb = createBrowserClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );
    sb.auth.getSession().then(({ data }) => setSignedIn(!!data.session));
    const { data: { subscription } } = sb.auth.onAuthStateChange((_e, session) => setSignedIn(!!session));
    return () => subscription.unsubscribe();
  }, []);
  return signedIn;
}

export default function AiSignInRequired({ compact = false }: { compact?: boolean }) {
  const pathname = usePathname() ?? "/";
  const from = encodeURIComponent(pathname);
  return (
    <div
      role="status"
      data-testid="ai-signin-required"
      className={`flex flex-col items-center text-center gap-3 ${compact ? "px-3 py-6" : "px-6 py-12"}`}
    >
      <LockClosedIcon className={compact ? "w-6 h-6 text-indigo-500" : "w-10 h-10 text-indigo-500"} />
      <p className={`font-black text-slate-800 dark:text-slate-100 ${compact ? "text-sm" : "text-xl"}`}>
        Sign in to use the AI Analyst
      </p>
      <p className={`text-slate-600 dark:text-slate-300 leading-relaxed ${compact ? "text-xs" : "text-sm max-w-md"}`}>
        {AI_SIGN_IN_MESSAGE}
      </p>
      <div className="flex gap-2 mt-1">
        <Link
          href={`/login?from=${from}`}
          className={`bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-lg ${compact ? "text-xs px-3 py-1.5" : "text-sm px-5 py-2.5"}`}
        >
          Sign in
        </Link>
        <Link
          href="/signup"
          className={`border border-indigo-300 text-indigo-700 dark:text-indigo-300 hover:bg-indigo-50 dark:hover:bg-indigo-950/40 font-bold rounded-lg ${compact ? "text-xs px-3 py-1.5" : "text-sm px-5 py-2.5"}`}
        >
          Create account
        </Link>
      </div>
    </div>
  );
}
