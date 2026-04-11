import Link from "next/link";

export default function PrivacyPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-24">
      <div className="mb-10 border-b border-slate-200 pb-8">
        <p className="text-xs font-bold uppercase tracking-widest text-brand-policy mb-3">Legal</p>
        <h1 className="ty-h1 font-black text-slate-900 mb-4">Privacy Policy</h1>
        <p className="text-slate-500 text-sm">Last updated: 2026</p>
      </div>
      <div className="prose prose-slate max-w-none">
        <p className="text-slate-600 leading-relaxed">
          This Privacy Policy is under development. Health Transformation Review is committed to protecting the privacy of our users and will publish a full policy before launch.
        </p>
        <p className="text-slate-600 leading-relaxed mt-4">
          In the meantime, for any privacy-related questions or data requests, please contact us at{" "}
          <a href="mailto:hello@htr.com" className="text-brand-policy hover:underline">hello@htr.com</a>.
        </p>
      </div>
      <div className="mt-12 pt-8 border-t border-slate-200">
        <Link href="/" className="text-sm font-bold text-brand-policy hover:underline">
          ← Back to Home
        </Link>
      </div>
    </div>
  );
}
