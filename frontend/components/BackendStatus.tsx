"use client";

import { useEffect, useState } from "react";

type Status = "checking" | "online" | "indexing" | "offline";

export default function BackendStatus() {
  const [status, setStatus] = useState<Status>("checking");

  useEffect(() => {
    let cancelled = false;
    let interval: ReturnType<typeof setInterval> | null = null;

    async function check() {
      try {
        const res = await fetch("/api/health");
        const data = await res.json();
        if (cancelled) return;
        if (!data.ok) {
          setStatus("offline");
          if (interval) { clearInterval(interval); interval = null; }
        } else if (!data.indexReady) {
          setStatus("indexing");
          if (!interval) interval = setInterval(check, 10_000);
        } else {
          setStatus("online");
          if (interval) { clearInterval(interval); interval = null; }
        }
      } catch {
        if (!cancelled) {
          setStatus("offline");
          if (interval) { clearInterval(interval); interval = null; }
        }
      }
    }

    check();
    return () => {
      cancelled = true;
      if (interval) clearInterval(interval);
    };
  }, []);

  if (status === "checking") return null;

  const config = {
    online: { dot: "bg-emerald-400", label: "AI Ready", color: "text-emerald-600" },
    indexing: { dot: "bg-amber-400 animate-pulse", label: "Indexing…", color: "text-amber-600" },
    offline: { dot: "bg-red-400", label: "AI Offline", color: "text-red-600" },
  } as const;

  const { dot, label, color } = config[status];

  return (
    <span className={`flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest ${color}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${dot}`} />
      {label}
    </span>
  );
}
