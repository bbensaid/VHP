"use client";

// There was no sign-out anywhere in the UI before 2026-11-27.
import { createBrowserClient } from "@supabase/ssr";

export default function SignOutButton() {
  async function signOut() {
    const sb = createBrowserClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );
    await sb.auth.signOut();
    window.location.href = "/";
  }
  return (
    <button
      onClick={signOut}
      className="text-sm font-semibold text-slate-600 hover:text-red-600 border border-slate-200 rounded-lg px-4 py-2 transition-colors"
    >
      Sign out
    </button>
  );
}
