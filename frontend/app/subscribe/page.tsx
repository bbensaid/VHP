import { redirect } from "next/navigation";

// /subscribe used to carry a separate Observer / Strategist / Enterprise price sheet that matched
// none of the plans the platform enforces (proxy.ts HIERARCHY: free, subscriber, student,
// professional, advisory). /pricing is the canonical plan page; keep old links working.
// Previous page preserved at sanity-backups/subscribe-page-2026-10-12.tsx.bak.
export default function SubscribePage() {
  redirect("/pricing");
}
