"use client";

import React, { useState } from "react";
import Link from "next/link";
import { BookOpen, Clock } from "lucide-react";

interface Course {
  id: string;
  slug: string;
  title: string;
  subtitle: string | null;
  description: string | null;
  pillar: string | null;
  level: string | null;
  estimated_hours: number | null;
}

const PILLAR_FILTERS = ["All", "general", "policy", "economics", "technology", "clinical", "equity", "operations"];

const PILLAR_LABEL: Record<string, string> = {
  all: "All Courses",
  general: "General",
  policy: "Policy",
  economics: "Economics",
  technology: "Technology",
  clinical: "Clinical",
  equity: "Equity",
  operations: "Operations",
};

const PILLAR_COLOR: Record<string, string> = {
  general:    "bg-slate-100 text-slate-700 border-slate-300",
  policy:     "bg-sky-50 text-sky-700 border-sky-300",
  economics:  "bg-emerald-50 text-emerald-700 border-emerald-300",
  technology: "bg-indigo-50 text-indigo-700 border-indigo-300",
  clinical:   "bg-pink-50 text-pink-700 border-pink-300",
  equity:     "bg-purple-50 text-purple-700 border-purple-300",
  operations: "bg-teal-50 text-teal-700 border-teal-300",
};

const PILLAR_ACTIVE: Record<string, string> = {
  all:        "bg-indigo-600 text-white border-indigo-600",
  general:    "bg-slate-600 text-white border-slate-600",
  policy:     "bg-sky-600 text-white border-sky-600",
  economics:  "bg-emerald-600 text-white border-emerald-600",
  technology: "bg-indigo-600 text-white border-indigo-600",
  clinical:   "bg-pink-600 text-white border-pink-600",
  equity:     "bg-purple-600 text-white border-purple-600",
  operations: "bg-teal-600 text-white border-teal-600",
};

const LEVEL_LABEL: Record<string, string> = {
  beginner: "Beginner",
  intermediate: "Intermediate",
  advanced: "Advanced",
};

export default function CoursesClient({ courses }: { courses: Course[] }) {
  const [activeFilter, setActiveFilter] = useState("All");

  const filtered = activeFilter === "All"
    ? courses
    : courses.filter((c) => c.pillar === activeFilter);

  return (
    <>
      {/* Filter bar */}
      <div className="flex flex-wrap gap-2 mt-8">
        {PILLAR_FILTERS.map((f) => {
          const isActive = activeFilter === f || (f === "All" && activeFilter === "All");
          const key = f.toLowerCase();
          return (
            <button
              key={f}
              onClick={() => setActiveFilter(f)}
              className={`px-4 py-1.5 rounded-full text-sm font-semibold border transition-all ${isActive ? (PILLAR_ACTIVE[key] ?? PILLAR_ACTIVE.all) : "bg-white text-slate-600 border-slate-300 hover:border-slate-400 hover:bg-slate-50"}`}
            >
              {PILLAR_LABEL[key] ?? f}
            </button>
          );
        })}
      </div>

      <p className="text-sm text-slate-500 mt-4 mb-8">
        {filtered.length} course{filtered.length === 1 ? "" : "s"} found
      </p>

      {filtered.length === 0 ? (
        <div className="py-16 text-center bg-white rounded-2xl border border-dashed border-slate-300">
          <p className="text-slate-500 font-medium">No courses found for this filter.</p>
          <button onClick={() => setActiveFilter("All")} className="mt-4 text-sm text-indigo-600 hover:underline font-bold">
            View all courses
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {filtered.map((course) => {
            const pillar = course.pillar ?? "general";
            const colorCls = PILLAR_COLOR[pillar] ?? PILLAR_COLOR.general;
            return (
              <Link
                key={course.id}
                href={`/academy/tracks/${course.slug}`}
                className="flex flex-col bg-white border border-slate-200 rounded-2xl p-6 hover:shadow-md hover:border-slate-300 transition-all group"
              >
                <div className="flex items-center justify-between mb-3">
                  <span className={`text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded-full border ${colorCls}`}>
                    {PILLAR_LABEL[pillar] ?? pillar}
                  </span>
                  {course.level && (
                    <span className="text-xs text-slate-400 font-medium">{LEVEL_LABEL[course.level] ?? course.level}</span>
                  )}
                </div>
                <h3 className="text-base font-bold text-slate-900 group-hover:text-indigo-700 transition-colors leading-snug mb-2">
                  {course.title}
                </h3>
                {course.subtitle && (
                  <p className="text-sm text-slate-500 leading-relaxed line-clamp-2 flex-1">{course.subtitle}</p>
                )}
                <div className="flex items-center gap-4 mt-4 pt-4 border-t border-slate-100 text-xs text-slate-400">
                  <span className="flex items-center gap-1"><BookOpen className="w-3.5 h-3.5" /> Course</span>
                  {course.estimated_hours && (
                    <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {course.estimated_hours}h</span>
                  )}
                  <span className="ml-auto text-indigo-600 font-semibold group-hover:underline">Start →</span>
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </>
  );
}
