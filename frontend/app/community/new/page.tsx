import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import NewThreadForm from "./NewThreadForm";

export const metadata: Metadata = {
  title: "New Discussion | HTR Community",
};

interface Props {
  searchParams: Promise<{ category?: string }>;
}

export default async function NewThreadPage({ searchParams }: Props) {
  const { category: defaultCategory } = await searchParams;
  const cookieStore = await cookies();
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    { cookies: { getAll: () => cookieStore.getAll() } }
  );

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/login?from=/community/new");

  const { data: categories } = await supabase
    .from("community_categories")
    .select("id, slug, name, icon")
    .order("sort_order");

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-2xl mx-auto px-4 py-10">
        <nav className="text-sm text-slate-500 mb-6" aria-label="Breadcrumb">
          <Link href="/community" className="hover:text-indigo-600 transition-colors">Community</Link>
          <span className="mx-2">›</span>
          <span className="text-slate-800 font-medium">New Discussion</span>
        </nav>

        <h1 className="text-3xl font-black text-slate-900 mb-2">Start a Discussion</h1>
        <p className="text-slate-500 mb-8 text-sm">Share insights, ask questions, or start a debate with the HTR community.</p>

        <NewThreadForm
          categories={(categories ?? []) as { id: string; slug: string; name: string; icon: string }[]}
          defaultCategory={defaultCategory}
          userId={user.id}
        />
      </div>
    </div>
  );
}
