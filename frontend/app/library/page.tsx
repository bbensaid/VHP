// app/library/page.tsx — My Library: personal hub for everything the user has accumulated.
// Sections: Overview, Saved Articles, Saved Chapters, Notes, My Courses, AI Chats, Tool Results, Reading History.

import { getUser } from "@/lib/auth";
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
  const user = await getUser();

  // A visitor without an account sees an empty library and a sign-in prompt.
  // Redirecting to /login instead made a loop: the login page's "Skip"
  // button sends them straight back here.
  if (!user) {
    return (
      <LibraryShell
        userName={null}
        bookmarks={[]}
        enrollments={[]}
        certifications={[]}
        completedModuleCount={0}
      />
    );
  }

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
