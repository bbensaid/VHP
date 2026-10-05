import { redirect } from "next/navigation";

// The four "annual reports" that lived here were empty Sanity shells and were
// retired with the homepage revamp (2026-10-04). The sourced 2026 pillar
// briefings replace them.
export default function ReportsPage() {
  redirect("/briefings");
}
