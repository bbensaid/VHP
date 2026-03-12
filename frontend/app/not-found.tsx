import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center px-4 text-center">
      <div className="max-w-md">
        <div className="text-6xl font-black text-slate-200 mb-4">404</div>
        <h1 className="text-2xl font-black text-slate-900 mb-2 tracking-tight">
          Page not found
        </h1>
        <p className="text-slate-600 mb-8">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <div className="flex items-center justify-center gap-4">
          <Link
            href="/"
            className="px-6 py-2.5 bg-slate-900 text-white text-sm font-bold rounded-xl hover:bg-slate-700 transition-colors"
          >
            Go home
          </Link>
          <Link
            href="/chat"
            className="px-6 py-2.5 border border-slate-200 text-slate-700 text-sm font-bold rounded-xl hover:bg-slate-100 transition-colors"
          >
            Ask the Analyst
          </Link>
        </div>
      </div>
    </div>
  );
}
