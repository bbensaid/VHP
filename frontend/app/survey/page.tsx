import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import type { Metadata } from "next";
import SurveyForm from "./SurveyForm";
import Link from "next/link";

export const metadata: Metadata = {
  title: "State of Healthcare Transformation Survey 2026 | HTR",
  description: "Share your perspective on healthcare transformation. HTR's annual survey shapes the industry's most-cited benchmark report.",
};

export default async function SurveyPage() {
  const cookieStore = await cookies();
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    { cookies: { getAll: () => cookieStore.getAll() } }
  );

  const { data: { user } } = await supabase.auth.getUser();

  // Check if current edition is open
  const { data: edition } = await supabase
    .from("survey_editions")
    .select("id, year, title, close_at")
    .lte("open_at", new Date().toISOString())
    .gte("close_at", new Date().toISOString())
    .single();

  // Check if signed-in user already responded
  let alreadySubmitted = false;
  if (user && edition) {
    const { data: existing } = await supabase
      .from("survey_responses")
      .select("id")
      .eq("edition_id", edition.id)
      .eq("user_id", user.id)
      .eq("completed", true)
      .maybeSingle();
    alreadySubmitted = !!existing;
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero */}
      <div className="bg-linear-to-br from-indigo-900 to-indigo-700 text-white py-14 px-4">
        <div className="max-w-3xl mx-auto">
          <p className="text-indigo-300 text-sm font-semibold uppercase tracking-widest mb-3">Annual Research</p>
          <h1 className="ty-h1 font-black mb-3">
            {edition?.title ?? "State of Healthcare Transformation Survey"}
          </h1>
          <p className="text-indigo-200 text-lg max-w-xl">
            Share your perspective on where health system transformation stands today. Responses are aggregated anonymously and published as our flagship annual report.
          </p>
          {edition && (
            <p className="text-indigo-300 text-sm mt-4">
              Open until {new Date(edition.close_at).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
              {" · "}
              <Link href="/survey/results" className="text-indigo-100 hover:text-white underline">
                View 2025 results →
              </Link>
            </p>
          )}
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-10">
        {!edition ? (
          <div className="bg-white border border-slate-200 rounded-2xl p-12 text-center text-slate-400">
            <p className="text-lg font-semibold text-slate-600 mb-2">Survey currently closed</p>
            <p className="text-sm">The 2026 survey will open in March. Check back soon.</p>
          </div>
        ) : alreadySubmitted ? (
          <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-10 text-center">
            <p className="text-2xl mb-2">✅</p>
            <p className="text-lg font-black text-emerald-900 mb-2">Thank you for responding!</p>
            <p className="text-emerald-700 text-sm mb-4">
              Your input will be included in the {edition.year} State of Healthcare Transformation report.
            </p>
            <Link
              href="/survey/results"
              className="inline-block bg-indigo-600 text-white font-bold px-5 py-2.5 rounded-xl text-sm hover:bg-indigo-700 transition-colors"
            >
              View aggregate results →
            </Link>
          </div>
        ) : (
          <SurveyForm editionId={edition.id} userId={user?.id ?? null} />
        )}
      </div>
    </div>
  );
}
