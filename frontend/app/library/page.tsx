// app/library/page.tsx — My Library: personal hub for everything the user has accumulated.
// Sections: Overview, Saved Articles, Saved Chapters, Notes, My Courses, AI Chats, Tool Results, Reading History.

import { requireAuth } from "@/lib/auth";
import { db } from "@/lib/db/client";
import {
  getUserEnrollments,
  getUserCertifications,
  getUserModuleProgress,
} from "@/lib/db/academy";
import LibraryShell from "./LibraryShell";

export const metadata = {
  title: "My Library | HTR",
  description: "Your saved articles, chapters, notes, courses, and more.",
};

export default async function LibraryPage() {
  const user = await requireAuth("/library");

  const [bookmarksRes, enrollments, certifications, moduleProgress] =
    await Promise.all([
      db
        .from("bookmarks")
        .select("id,sanity_id,slug,title,pillar,content_type,note,created_at")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false }),
      getUserEnrollments(user.id),
      getUserCertifications(user.id),
      getUserModuleProgress(user.id),
    ]);

  const bookmarks = bookmarksRes.data ?? [];
  const completedModuleSlugs = moduleProgress
    .filter((m) => m.completed_at)
    .map((m) => m.module_slug);

  return (
    <LibraryShell
      userName={user.fullName ?? user.email}
      bookmarks={bookmarks}
      enrollments={enrollments}
      certifications={certifications}
      completedModuleCount={completedModuleSlugs.length}
    />
  );
}
