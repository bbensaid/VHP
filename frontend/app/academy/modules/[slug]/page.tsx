// frontend/app/academy/modules/[slug]/page.tsx
// Route: /academy/modules/[slug]  (legacy address of a single lesson body)
//
// Every lesson now lives in its course's player:
//   /academy/tracks/<course slug>/<lesson slug>
// This address is still produced by site search, AI Analyst citations,
// Personalized Learning and old bookmarks, so it forwards to the lesson whose
// sanity_slug is this module. It used to render the Sanity document on its
// own, with old course names, numbering and next/previous links.

import { notFound, permanentRedirect } from "next/navigation";
import { db } from "@/lib/db/client";

export const revalidate = 3600;

async function lessonHref(slug: string): Promise<string | null> {
  const { data: lesson } = await db
    .from("lessons")
    .select("slug, tracks!inner(courses!inner(slug))")
    .eq("sanity_slug", slug)
    .limit(1)
    .maybeSingle();
  // supabase-js types the embedded rows loosely; read them defensively
  const course = (lesson as { slug: string; tracks: { courses: { slug: string } } } | null)?.tracks?.courses?.slug;
  return lesson && course ? `/academy/tracks/${course}/${lesson.slug}` : null;
}

export default async function AcademyModulePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const href = slug ? await lessonHref(slug) : null;
  if (!href) return notFound();
  permanentRedirect(href);
}
