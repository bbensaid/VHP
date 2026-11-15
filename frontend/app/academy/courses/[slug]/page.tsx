// Route: /academy/courses/[slug]  (legacy course address)
//
// Courses live at /academy/tracks/<course slug> (structure in Supabase). This
// route used to read a Sanity "course" document type that has no documents,
// so every link to it showed an empty page. It now forwards:
//   - a current course slug          → that course
//   - a retired course's slug        → the course that replaced it
//   - anything else (e.g. a course name an AI recommendation made up)
//                                    → the course list

import { permanentRedirect, redirect } from "next/navigation";
import { db } from "@/lib/db/client";

export const revalidate = 3600;

const RETIRED: Record<string, string> = {
  "value-based-care-fundamentals": "value-based-care",
  "precision-medicine-fundamentals": "genomics-precision-medicine",
};

export default async function LegacyCoursePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const wanted = RETIRED[slug] ?? slug;
  const { data } = await db.from("courses").select("slug").eq("slug", wanted).maybeSingle();
  if (data?.slug) permanentRedirect(`/academy/tracks/${data.slug}`);
  redirect("/academy/courses");
}
