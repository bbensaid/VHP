"use client";

import React, { useState } from "react";
import AcademyCard from "@/components/academy/AcademyCard";

interface Course {
  _id: string;
  title: string;
  pillar: string | null;
  type: string | null;
  price: string | null;
  meta: string | null;
  description: string | null;
  slug: string;
  instructors: { name: string }[] | null;
}

const FILTERS = [
  "All Programs",
  "Policy Pillar",
  "Economics Pillar",
  "Technology Pillar",
  "Clinical Pillar",
  "Equity Pillar",
  "Certifications Only",
];

function getFilterStyle(filter: string, isActive: boolean) {
  const base = "px-5 py-2 rounded-full text-sm font-bold border transition-all shadow-sm";
  if (isActive) {
    switch (filter) {
      case "All Programs":      return `${base} bg-slate-900 text-white border-slate-900`;
      case "Policy Pillar":     return `${base} bg-sky-600 text-white border-sky-600`;
      case "Economics Pillar":  return `${base} bg-emerald-600 text-white border-emerald-600`;
      case "Technology Pillar": return `${base} bg-indigo-600 text-white border-indigo-600`;
      case "Clinical Pillar":   return `${base} bg-brand-clinical text-white border-brand-clinical`;
      case "Equity Pillar":     return `${base} bg-brand-equity text-white border-brand-equity`;
      default:                  return `${base} bg-slate-900 text-white border-slate-900`;
    }
  }
  switch (filter) {
    case "Policy Pillar":     return `${base} bg-white text-card-policy border-card-policy/30 hover:border-sky-400 hover:bg-sky-50`;
    case "Economics Pillar":  return `${base} bg-white text-card-economics border-card-economics/30 hover:border-emerald-400 hover:bg-emerald-50`;
    case "Technology Pillar": return `${base} bg-white text-card-tech border-card-tech/30 hover:border-indigo-400 hover:bg-indigo-50`;
    case "Clinical Pillar":   return `${base} bg-white text-brand-clinical border-brand-clinical/30 hover:border-brand-clinical hover:bg-red-50`;
    case "Equity Pillar":     return `${base} bg-white text-brand-equity border-brand-equity/30 hover:border-brand-equity hover:bg-amber-50`;
    default:                  return `${base} bg-white text-gray-600 border-gray-300 hover:border-gray-400 hover:bg-gray-50`;
  }
}

function matchesFilter(course: Course, filter: string): boolean {
  switch (filter) {
    case "All Programs":      return true;
    case "Policy Pillar":     return course.pillar === "Policy";
    case "Economics Pillar":  return course.pillar === "Economics";
    case "Technology Pillar": return course.pillar === "Technology";
    case "Clinical Pillar":   return course.pillar === "Clinical";
    case "Equity Pillar":     return course.pillar === "Equity";
    case "Certifications Only": return course.type === "CERTIFICATION";
    default:                  return true;
  }
}

export default function CoursesClient({ courses }: { courses: Course[] }) {
  const [activeFilter, setActiveFilter] = useState("All Programs");

  const filtered = courses.filter((c) => matchesFilter(c, activeFilter));

  return (
    <>
      {/* Filter bar */}
      <div className="flex flex-wrap gap-3 mt-8">
        {FILTERS.map((filter) => (
          <button
            key={filter}
            onClick={() => setActiveFilter(filter)}
            className={getFilterStyle(filter, activeFilter === filter)}
          >
            {filter}
          </button>
        ))}
      </div>

      {/* Course grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="hidden lg:block space-y-8">
            <div>
              <h3 className="font-bold text-gray-900 mb-4 uppercase tracking-wider text-xs">Learning Format</h3>
              <div className="space-y-2">
                <p className="text-sm text-gray-500">
                  {filtered.length === 0
                    ? "No programs match this filter."
                    : `${filtered.length} program${filtered.length === 1 ? "" : "s"} found`}
                </p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-3 space-y-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              {activeFilter === "All Programs" ? "All Active Programs" : activeFilter}
            </h2>

            {filtered.length === 0 ? (
              <div className="py-16 text-center bg-white rounded-2xl border border-dashed border-slate-300">
                <p className="text-slate-500 font-medium">No programs found for this filter.</p>
                <button
                  onClick={() => setActiveFilter("All Programs")}
                  className="mt-4 text-sm text-indigo-600 hover:underline font-bold"
                >
                  View all programs
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filtered.map((course) => (
                  <AcademyCard
                    key={course._id}
                    type={course.type}
                    pillar={course.pillar}
                    title={course.title}
                    description={course.description}
                    meta={course.meta}
                    price={course.price}
                    instructors={course.instructors?.map((i) => i.name)}
                    href={`/academy/courses/${course.slug}`}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
