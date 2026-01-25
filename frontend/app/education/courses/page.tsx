import React from "react";
import { client } from "@/lib/sanity";
import AcademyCard from "@/components/academy/AcademyCard";

// 1. Fetch real data from Sanity
async function getCourses() {
  const query = `*[_type == "course"] | order(title asc) {
    _id,
    title,
    pillar,
    type,
    price,
    meta,
    description,
    "slug": slug.current,
    instructors[]->{name}
  }`;

  // Revalidate every 60 seconds
  return client.fetch(query, {}, { next: { revalidate: 60 } });
}

export default async function CoursesPage() {
  const courses = await getCourses();

  // (Keep your existing helper function exactly as it was)
  const getFilterStyle = (filter: string, index: number) => {
    if (index === 0) return "bg-slate-900 text-white border-slate-900";
    switch (filter) {
      case "Policy Pillar":
        return "bg-white text-card-policy border-card-policy/30 hover:border-card-policy hover:bg-orange-50";
      case "Economics Pillar":
        return "bg-white text-card-economics border-card-economics/30 hover:border-card-economics hover:bg-emerald-50";
      case "Technology Pillar":
        return "bg-white text-card-tech border-card-tech/30 hover:border-card-tech hover:bg-indigo-50";
      default:
        return "bg-white text-gray-600 border-gray-300 hover:border-gray-400 hover:bg-gray-50";
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen pb-20">
      {/* Header Section (Unchanged) */}
      <div className="bg-white border-b border-gray-200 py-12 md:py-16">
        <div className="container mx-auto px-4 md:px-8">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">
            Course Catalog
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl">
            Browse our library of certifications, masterclasses, and workshops
            tailored for healthcare leadership.
          </p>

          <div className="flex flex-wrap gap-3 mt-8">
            {[
              "All Programs",
              "Policy Pillar",
              "Economics Pillar",
              "Technology Pillar",
              "Certifications Only",
            ].map((filter, i) => (
              <button
                key={filter}
                className={`px-5 py-2 rounded-full text-sm font-bold border transition-all shadow-sm ${getFilterStyle(filter, i)}`}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-8 mt-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar Filters (Keep your existing sidebar code here) */}
          <div className="hidden lg:block space-y-8">
            {/* ... (Your existing checkbox filters) ... */}
            <div>
              <h3 className="font-bold text-gray-900 mb-4 uppercase tracking-wider text-xs">
                Learning Format
              </h3>
              <div className="space-y-2">
                {/* Placeholder for interactive filters later */}
                <p className="text-sm text-gray-500">
                  Filter logic to be implemented
                </p>
              </div>
            </div>
          </div>

          {/* Main Grid: NOW DYNAMIC */}
          <div className="lg:col-span-3 space-y-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              All Active Programs
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
              {courses.map((course: any) => (
                <AcademyCard
                  key={course._id}
                  type={course.type}
                  pillar={course.pillar}
                  title={course.title}
                  description={course.description}
                  meta={course.meta}
                  price={course.price}
                  // Pass mapped instructor names or null
                  instructors={course.instructors?.map((i: any) => i.name)}
                  // Valid link to dynamic page
                  href={`/education/courses/${course.slug}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
