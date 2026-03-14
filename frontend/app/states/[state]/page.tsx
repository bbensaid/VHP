// frontend/app/states/[state]/page.tsx
import { notFound } from "next/navigation";
import Link from "next/link";
import { getStateInitiatives } from "@/lib/data/state-initiatives-data";
import type { InitiativeStatus, InitiativeType } from "@/lib/data/state-initiatives-data";
import {
  ArrowLeftIcon,
  MapPinIcon,
  ArrowTopRightOnSquareIcon,
} from "@heroicons/react/24/outline";

interface PageProps {
  params: Promise<{ state: string }>;
}

const TYPE_COLORS: Record<InitiativeType, string> = {
  "Medicaid Waiver": "bg-violet-50 text-violet-700 border-violet-200",
  "State Law": "bg-blue-50 text-blue-700 border-blue-200",
  "Federal Program": "bg-indigo-50 text-indigo-700 border-indigo-200",
  "State Program": "bg-sky-50 text-sky-700 border-sky-200",
  "Multi-Payer": "bg-teal-50 text-teal-700 border-teal-200",
  "Value-Based Care": "bg-emerald-50 text-emerald-700 border-emerald-200",
  "Global Budget": "bg-rose-50 text-rose-700 border-rose-200",
  "ACO Model": "bg-orange-50 text-orange-700 border-orange-200",
};

const STATUS_COLORS: Record<InitiativeStatus, string> = {
  Active: "bg-emerald-100 text-emerald-700",
  "In Development": "bg-amber-100 text-amber-700",
  Completed: "bg-slate-100 text-slate-600",
  Pending: "bg-yellow-100 text-yellow-700",
};

export default async function StateInitiativesPage({ params }: PageProps) {
  const { state: stateId } = await params;
  const profile = getStateInitiatives(stateId);

  if (!profile || profile.initiatives.length === 0) notFound();

  const activeCount = profile.initiatives.filter((i) => i.status === "Active").length;

  return (
    <div className="font-sans text-slate-800 pb-24">

      {/* ── Hero ─────────────────────────────────────────────────────── */}
      <div className="bg-slate-50 border-b border-slate-200 py-16 px-8">
        <div className="max-w-4xl mx-auto">
          <Link
            href="/states"
            className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-indigo-600 mb-6 transition-colors"
          >
            <ArrowLeftIcon className="w-4 h-4" />
            All State Initiatives
          </Link>
          <div className="flex items-start gap-4 flex-wrap">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <span
                  className={`inline-flex items-center gap-1.5 text-xs font-black px-3 py-1.5 rounded-full border ${profile.heroColor}`}
                >
                  <MapPinIcon className="w-3.5 h-3.5" />
                  {profile.region}
                </span>
                <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                  {profile.stateAbbr}
                </span>
              </div>
              <h1 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight mb-4">
                {profile.stateName}
              </h1>
              <p className="text-slate-600 text-base leading-relaxed max-w-2xl">{profile.summary}</p>
            </div>
          </div>
          <div className="flex gap-6 mt-8 text-sm">
            <div>
              <span className="text-2xl font-black text-indigo-600">{profile.initiatives.length}</span>
              <span className="block text-slate-500 text-xs font-semibold uppercase tracking-wide mt-0.5">
                Initiatives
              </span>
            </div>
            <div className="w-px bg-slate-200" />
            <div>
              <span className="text-2xl font-black text-emerald-600">{activeCount}</span>
              <span className="block text-slate-500 text-xs font-semibold uppercase tracking-wide mt-0.5">
                Active
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* ── Initiatives ──────────────────────────────────────────────── */}
      <div className="max-w-4xl mx-auto px-8 mt-12 space-y-6">
        <h2 className="text-sm font-black uppercase tracking-widest text-slate-400">
          Health Reform Initiatives
        </h2>

        {profile.initiatives.map((initiative) => (
          <div
            key={initiative.id}
            className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-3">
              <div className="flex-1">
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  <span
                    className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full border ${TYPE_COLORS[initiative.type]}`}
                  >
                    {initiative.type}
                  </span>
                  <span
                    className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full ${STATUS_COLORS[initiative.status]}`}
                  >
                    {initiative.status}
                  </span>
                  <span className="text-[10px] font-semibold text-slate-400">
                    Est. {initiative.year}
                  </span>
                </div>
                <h3 className="text-lg font-black text-slate-900">{initiative.name}</h3>
              </div>
            </div>

            <p className="text-sm text-slate-600 leading-relaxed mb-4">{initiative.description}</p>

            {/* Tags */}
            {initiative.tags.length > 0 && (
              <div className="flex flex-wrap gap-1.5 mb-4">
                {initiative.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-[10px] font-semibold text-slate-500 bg-slate-50 border border-slate-200 rounded-full px-2 py-0.5"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}

            {/* Links */}
            <div className="flex flex-wrap gap-3">
              {initiative.internalLink && (
                <Link
                  href={initiative.internalLink}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-indigo-600 hover:text-indigo-800 bg-indigo-50 hover:bg-indigo-100 border border-indigo-200 rounded-lg px-3 py-1.5 transition-colors"
                >
                  Full Analysis on HTR
                  <ArrowTopRightOnSquareIcon className="w-3.5 h-3.5" />
                </Link>
              )}
              {initiative.externalUrl && (
                <a
                  href={initiative.externalUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-slate-800 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-lg px-3 py-1.5 transition-colors"
                >
                  External Source
                  <ArrowTopRightOnSquareIcon className="w-3.5 h-3.5" />
                </a>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* ── Back nav ─────────────────────────────────────────────────── */}
      <div className="max-w-4xl mx-auto px-8 mt-12">
        <Link
          href="/states"
          className="inline-flex items-center gap-2 text-sm font-bold text-slate-500 hover:text-indigo-600 transition-colors"
        >
          <ArrowLeftIcon className="w-4 h-4" />
          Back to All States
        </Link>
      </div>
    </div>
  );
}
