import { requireAuth } from "@/lib/auth";
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import type { Metadata } from "next";
import BookmarksList from "./BookmarksList";

export const metadata: Metadata = { title: "Saved Articles | HTR Account" };

export default async function BookmarksPage() {
  const user = await requireAuth("/account/bookmarks");
  const cookieStore = await cookies();
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    { cookies: { getAll: () => cookieStore.getAll() } }
  );

  const { data: bookmarks } = await supabase
    .from("bookmarks")
    .select("id, sanity_id, slug, title, pillar, content_type, note, created_at")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });

  return <BookmarksList initialBookmarks={bookmarks ?? []} />;
}
