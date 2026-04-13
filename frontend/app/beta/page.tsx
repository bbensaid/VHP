"use client";

import React, { useState, useRef, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { ShieldCheckIcon, ExclamationTriangleIcon } from "@heroicons/react/24/outline";

export default function BetaGatePage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get("from") || "/";

  const [code, setCode] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!code.trim()) return;

    setStatus("loading");
    setErrorMsg("");

    try {
      const res = await fetch("/api/beta/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code: code.trim() }),
      });

      if (res.ok) {
        // Cookie set server-side — navigate to destination
        router.replace(redirectTo.startsWith("/beta") ? "/" : redirectTo);
        router.refresh();
      } else {
        const data = await res.json().catch(() => ({}));
        setErrorMsg(data.error || "Invalid access code. Please try again.");
        setStatus("error");
        setCode("");
        inputRef.current?.focus();
      }
    } catch {
      setErrorMsg("Network error. Please check your connection and try again.");
      setStatus("error");
    }
  };

  return (
    <div className="fixed inset-0 z-[9999] bg-gray-50 flex flex-col items-center justify-center px-4 overflow-y-auto">

      <div className="relative z-10 w-full max-w-md">

        {/* Logo / Brand */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-14 h-14 bg-indigo-600 rounded-2xl mb-4">
            <ShieldCheckIcon className="w-7 h-7 text-white" />
          </div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">
            Health Transformation Review
          </h1>
          {/* <p className="text-slate-500 text-sm mt-1">htr.health</p> */}
        </div>

        {/* MVP Disclaimer card */}
        <div className="bg-red-50 border-2 border-red-400 rounded-2xl p-5 mb-6 flex items-start gap-3">
          <ExclamationTriangleIcon className="w-6 h-6 text-red-600 shrink-0 mt-0.5" />
          <div>
            <p className="text-red-700 font-black text-base uppercase tracking-widest mb-2">
              MVP — Testing Phase Only
            </p>
            <p className="text-red-800 text-sm leading-relaxed font-medium">
              This platform is currently in early MVP testing and is accessible by invitation only.
              It is <strong>not available to the general public</strong>. Features, data, and content may be incomplete,
              change without notice, or contain errors. By entering, you agree that this is a
              pre-release testing environment.
            </p>
          </div>
        </div>

        {/* Access form */}
        <div className="bg-white border border-slate-200 rounded-2xl p-8 shadow-sm">
          <h2 className="text-slate-900 font-black text-lg mb-1">Enter your access code</h2>
          <p className="text-slate-500 text-sm mb-6">
            You should have received an access code from the HTR team. Enter it below to continue.
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <input
                ref={inputRef}
                type="text"
                value={code}
                onChange={(e) => { setCode(e.target.value); setStatus("idle"); setErrorMsg(""); }}
                placeholder="e.g. Name_X_0.0.0"
                autoComplete="off"
                autoCapitalize="off"
                spellCheck={false}
                className={`w-full bg-white border rounded-xl px-4 py-3 text-slate-900 placeholder:text-slate-400 text-sm font-mono focus:outline-none transition-colors ${
                  status === "error"
                    ? "border-red-500 focus:border-red-400"
                    : "border-slate-300 focus:border-indigo-400"
                }`}
              />
              {errorMsg && (
                <p className="mt-2 text-red-600 text-sm font-bold">{errorMsg}</p>
              )}
            </div>

            <button
              type="submit"
              disabled={status === "loading" || !code.trim()}
              className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-300 disabled:cursor-not-allowed text-white font-black rounded-xl text-sm transition-colors"
            >
              {status === "loading" ? "Verifying…" : "Enter Platform →"}
            </button>
          </form>
        </div>

        {/* Footer note */}
        <p className="text-center text-slate-500 text-xs mt-6 leading-relaxed">
          Don&apos;t have an access code?{" "}
          <a
            href="mailto:contact@htr.health"
            className="text-slate-600 hover:text-slate-900 underline underline-offset-2 transition-colors"
          >
            Contact the HTR team
          </a>
        </p>
      </div>
    </div>
  );
}
