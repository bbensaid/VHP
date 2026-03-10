"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import type { User } from "@supabase/supabase-js";

export default function AccountPage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      setUser(data.user);
      setLoading(false);
    });
  }, []);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.push("/");
  };

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center text-slate-500">Loading…</div>;
  }

  if (!user) {
    router.push("/login");
    return null;
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-black text-slate-900 mb-8">Your Account</h1>

      <div className="bg-white border border-slate-200 rounded-xl p-6 space-y-4 shadow-sm">
        <div>
          <div className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-1">Email</div>
          <div className="text-slate-800 font-medium">{user.email}</div>
        </div>
        <div>
          <div className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-1">Account created</div>
          <div className="text-slate-800">
            {new Date(user.created_at).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
          </div>
        </div>
        <div>
          <div className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-1">Subscription</div>
          <span className="inline-block bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded">
            Free
          </span>
        </div>
      </div>

      <div className="mt-8 flex gap-4">
        <button
          onClick={handleSignOut}
          className="px-5 py-2.5 text-sm font-bold text-slate-700 border border-slate-200 rounded-lg hover:bg-slate-100 transition"
        >
          Sign out
        </button>
        <a
          href="/subscribe"
          className="px-5 py-2.5 text-sm font-bold text-white bg-slate-900 rounded-lg hover:bg-slate-700 transition"
        >
          Upgrade to Pro
        </a>
      </div>
    </div>
  );
}
