import React from "react";
import { client } from "@/lib/sanity";
import { PortableText } from "@portabletext/react";
import Link from "next/link";
import { notFound } from "next/navigation";
import Image from "next/image"; // <--- ADDED

async function getCourse(slug: string) {
  const query = `*[_type == "course" && slug.current == $slug][0] {
    _id,
    title,
    "slug": slug.current,
    description,
    price,
    level,
    duration,
    startDate,
    format,
    syllabus,
    overview,
    "instructors": instructors[]->{
      name,
      role,
      bio,
      "imageUrl": image.asset->url
    },
    "category": category->title,
    "modules": modules[]->{
      _id,
      title,
      moduleNumber,
      summary,
      estimatedReadTime,
      "slug": slug.current
    } | order(moduleNumber asc)
  }`;

  return await client.fetch(query, { slug });
}

export default async function CourseDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const course = await getCourse(slug);

  if (!course) return notFound();

  // Color theme helper
  const getCategoryColor = (cat: string) => {
    switch (cat?.toLowerCase()) {
      case "policy": return "text-blue-600 bg-blue-50 border-blue-200";
      case "economics": return "text-green-600 bg-green-50 border-green-200";
      case "technology": return "text-indigo-600 bg-indigo-50 border-indigo-200";
      default: return "text-slate-600 bg-slate-50 border-slate-200";
    }
  };

  return (
    <div className="bg-white min-h-screen pb-20">
      {/* HERO HEADER */}
      <div className="bg-slate-900 text-white py-20">
        <div className="container mx-auto px-4 md:px-8 max-w-5xl">
            <Link href="/education" className="text-slate-400 hover:text-white mb-6 inline-block text-sm font-bold uppercase tracking-wider">
                &larr; Back to Courses
            </Link>
            <div className={`inline-block px-3 py-1 rounded-full text-xs font-bold uppercase mb-4 ${getCategoryColor(course.category)} bg-opacity-10 border-opacity-20`}>
                {course.category || "Education"}
            </div>
            <h1 className="text-4xl md:text-5xl font-black mb-6 leading-tight">{course.title}</h1>
            <p className="text-xl text-slate-300 max-w-2xl leading-relaxed">{course.description}</p>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-8 max-w-5xl -mt-10 grid grid-cols-1 lg:grid-cols-3 gap-10">
        
        {/* LEFT COLUMN */}
        <div className="lg:col-span-2 space-y-8">
            
            {/* OVERVIEW */}
            <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-100">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Course Overview</h2>
                <div className="prose prose-lg text-gray-600">
                    {course.overview ? <PortableText value={course.overview} /> : <p>Syllabus coming soon...</p>}
                </div>
            </div>

            {/* MODULES LIST */}
            {course.modules && course.modules.length > 0 && (
              <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-100">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  Course Modules <span className="text-gray-400 font-normal text-lg">({course.modules.length})</span>
                </h2>
                <div className="space-y-3">
                  {course.modules.map((mod: any) => (
                    <Link
                      key={mod._id}
                      href={`/academy/modules/${mod.slug}`}
                      className="flex gap-4 p-4 border border-gray-100 rounded-lg hover:border-indigo-200 hover:bg-indigo-50 transition-colors group"
                    >
                      <div className="w-10 h-10 bg-indigo-100 text-indigo-700 rounded-full flex items-center justify-center font-bold text-sm shrink-0 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                        {mod.moduleNumber}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-bold text-gray-900 group-hover:text-indigo-700 transition-colors">{mod.title}</h3>
                        <p className="text-sm text-gray-500 mt-1 line-clamp-2">{mod.summary}</p>
                        {mod.estimatedReadTime && (
                          <span className="text-xs text-gray-400 mt-1 block">{mod.estimatedReadTime} min read</span>
                        )}
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* INSTRUCTORS - OPTIMIZED */}
            {course.instructors && (
                <div className="mt-12">
                    <h3 className="text-xl font-bold text-gray-900 mb-6">Your Instructors</h3>
                    <div className="grid gap-6">
                        {course.instructors.map((inst: any) => (
                            <div key={inst.name} className="flex gap-4 p-6 bg-slate-50 rounded-xl border border-gray-200">
                                <div className="relative w-16 h-16 flex-shrink-0">
                                  {inst.imageUrl ? (
                                      <Image 
                                        src={inst.imageUrl} 
                                        alt={inst.name} 
                                        fill
                                        className="rounded-full object-cover"
                                        sizes="64px"
                                      />
                                  ) : (
                                      <div className="w-16 h-16 bg-gray-300 rounded-full"></div>
                                  )}
                                </div>
                                <div>
                                    <h4 className="font-bold text-gray-900 text-lg">{inst.name}</h4>
                                    <p className="text-indigo-600 text-xs font-bold uppercase mb-2">{inst.role}</p>
                                    <p className="text-sm text-gray-600">{inst.bio}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>

        {/* RIGHT COLUMN (Sidebar) */}
        <div className="lg:col-span-1">
            <div className="bg-white p-6 rounded-xl shadow-xl border border-gray-200 sticky top-24">
                <div className="text-3xl font-black text-gray-900 mb-2">${course.price}</div>
                <div className="text-gray-500 text-sm mb-6">One-time payment • Lifetime access</div>
                
                <button className="w-full py-4 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-lg mb-4 transition-colors text-lg shadow-md hover:shadow-lg">
                    Enroll Now
                </button>
                
                <div className="space-y-4 pt-6 border-t border-gray-100">
                    <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-500">Level</span>
                        <span className="font-bold text-gray-900">{course.level}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-500">Duration</span>
                        <span className="font-bold text-gray-900">{course.duration}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-500">Start Date</span>
                        <span className="font-bold text-gray-900">
                             {course.startDate ? new Date(course.startDate).toLocaleDateString() : "On Demand"}
                        </span>
                    </div>
                     <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-500">Format</span>
                        <span className="font-bold text-gray-900">{course.format}</span>
                    </div>
                </div>
            </div>
        </div>

      </div>
    </div>
  );
}