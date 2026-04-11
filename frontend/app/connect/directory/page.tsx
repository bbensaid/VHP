import { Suspense } from "react";
import DirectoryClient from "./DirectoryClient";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

export const metadata = {
  title: "Member Directory | HTR Connect",
  description: "Find and connect with healthcare transformation professionals in the HTR subscriber network.",
};

export default function DirectoryPage() {
  return (
    <div className="w-full font-sans text-slate-800 flex flex-col pb-20">
      <div className="bg-white border border-slate-200 rounded-2xl p-8 mb-6 shadow-sm relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-violet-50 rounded-bl-full -mr-20 -mt-20 opacity-50 pointer-events-none" />
        <div className="relative z-10">
          <Link
            href="/connect"
            className="inline-flex items-center text-sm font-bold text-slate-500 hover:text-indigo-600 transition-colors mb-6"
          >
            <ArrowLeftIcon className="w-4 h-4 mr-1.5" /> Back to HTR Connect
          </Link>
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-black text-slate-900 tracking-tight mb-2">
            Member Directory
          </h1>
          <p className="text-slate-500 text-lg leading-relaxed max-w-2xl">
            Healthcare transformation professionals across the HTR subscriber network.
            All profiles are opt-in and subscriber-only.
          </p>
        </div>
      </div>
      <Suspense fallback={<div className="text-slate-400 text-sm p-8">Loading directory…</div>}>
        <DirectoryClient />
      </Suspense>
    </div>
  );
}
