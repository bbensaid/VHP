import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Thank You | HTR Survey 2026",
};

export default function ThankYouPage() {
  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4">
      <div className="max-w-md text-center bg-white border border-slate-200 rounded-2xl p-12 shadow-sm">
        <div className="text-5xl mb-4">🎉</div>
        <h1 className="text-3xl font-black text-slate-900 mb-3">Thank you!</h1>
        <p className="text-slate-600 mb-2">
          Your response has been recorded. The 2026 State of Healthcare Transformation report will be published in Q3 2026.
        </p>
        <p className="text-slate-500 text-sm mb-8">
          All findings will be aggregated and anonymised. You&apos;ll receive an email when the report is live.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/survey/results"
            className="bg-indigo-600 text-white font-bold px-5 py-2.5 rounded-xl text-sm hover:bg-indigo-700 transition-colors"
          >
            View aggregate results
          </Link>
          <Link
            href="/dashboard"
            className="border border-slate-200 text-slate-700 font-bold px-5 py-2.5 rounded-xl text-sm hover:bg-slate-50 transition-colors"
          >
            Back to Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
}
