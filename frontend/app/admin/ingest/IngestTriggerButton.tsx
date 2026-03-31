"use client";

import { useState } from "react";
import { ArrowPathIcon, CheckCircleIcon, ExclamationCircleIcon } from "@heroicons/react/24/outline";

export default function IngestTriggerButton() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const trigger = async () => {
    setStatus("loading");
    try {
      const res = await fetch("/api/webhooks/sanity", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ _type: "manual" }),
      });
      setStatus(res.ok ? "success" : "error");
    } catch {
      setStatus("error");
    } finally {
      setTimeout(() => setStatus("idle"), 3000);
    }
  };

  return (
    <button
      onClick={trigger}
      disabled={status === "loading"}
      className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold transition-colors ${
        status === "success"
          ? "bg-emerald-100 text-emerald-700 border border-emerald-200"
          : status === "error"
          ? "bg-rose-100 text-rose-700 border border-rose-200"
          : "bg-indigo-600 hover:bg-indigo-700 text-white disabled:opacity-50"
      }`}
    >
      {status === "loading" && <ArrowPathIcon className="w-4 h-4 animate-spin" />}
      {status === "success" && <CheckCircleIcon className="w-4 h-4" />}
      {status === "error" && <ExclamationCircleIcon className="w-4 h-4" />}
      {status === "idle" && <ArrowPathIcon className="w-4 h-4" />}
      {status === "loading" ? "Triggering…" : status === "success" ? "Triggered" : status === "error" ? "Failed" : "Trigger Ingest"}
    </button>
  );
}
