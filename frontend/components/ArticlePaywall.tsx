import Link from "next/link";
import UpgradePrompt from "./UpgradePrompt"; // or inline a simple CTA if UpgradePrompt has different props

export default function ArticlePaywall({ previewText, title, from }: { previewText: string; title: string; from: string }) {
  return (
    <div>
      {/* Preview text shown to everyone */}
      <div className="prose prose-slate max-w-none mb-0">
        <p className="text-slate-700 leading-relaxed">{previewText}</p>
      </div>

      {/* Gradient fade into paywall */}
      <div className="relative">
        <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-transparent to-white pointer-events-none" />
        <div className="bg-white border border-indigo-200 rounded-2xl p-8 text-center shadow-sm mt-4">
          <p className="text-xs font-bold uppercase tracking-widest text-indigo-400 mb-2">Members Only</p>
          <h3 className="ty-h3 font-black text-slate-900 mb-2">Continue reading: {title}</h3>
          <p className="text-slate-500 text-sm mb-6">
            This analysis continues with key findings available to HTR subscribers.
            Join thousands of healthcare leaders reading the full analysis.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href={`/pricing?from=${encodeURIComponent(from)}`}
              className="bg-indigo-600 text-white font-bold px-6 py-3 rounded-xl text-sm hover:bg-indigo-700 transition-colors"
            >
              Subscribe — from $19/mo →
            </Link>
            <Link
              href={`/login?from=${encodeURIComponent(from)}`}
              className="border border-slate-200 text-slate-700 font-bold px-6 py-3 rounded-xl text-sm hover:bg-slate-50 transition-colors"
            >
              Sign in
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
