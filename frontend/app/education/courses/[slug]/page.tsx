import React from "react";
import { client } from "@/lib/sanity";
import { PortableText } from "@portabletext/react";
import Link from "next/link";
import { notFound } from "next/navigation";

// Fetch full course details
async function getCourse(slug: string) {
  const query = `*[_type == "course" && slug.current == $slug][0]{
    title,
    pillar,
    type,
    price,
    meta,
    description,
    overview,
    instructors[]->{
      name, 
      role, 
      bio, 
      "imageUrl": image.asset->url
    }
  }`;
  return client.fetch(query, { slug }, { next: { revalidate: 60 } });
}

export default async function CourseDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const course = await getCourse(slug);

  if (!course) return notFound();

  // Visual Theme Helpers based on your globals.css
  const getPillarColor = (p: string) => {
    switch(p) {
        case "Policy": return "text-card-policy border-card-policy";
        case "Economics": return "text-card-economics border-card-economics";
        case "Technology": return "text-card-tech border-card-tech";
        default: return "text-gray-600 border-gray-600";
    }
  };

  return (
    <div className="bg-white min-h-screen pb-20">
      {/* Hero Header */}
      <div className="bg-slate-900 text-white py-20 border-b border-indigo-900/30">
        <div className="container mx-auto px-4 md:px-8 max-w-5xl">
            <div className="flex gap-4 mb-6">
                 <span className={`px-3 py-1 rounded border bg-white/10 ${getPillarColor(course.pillar)} font-bold uppercase tracking-widest text-xs`}>
                    {course.pillar}
                 </span>
                 <span className="px-3 py-1 rounded bg-indigo-600 text-white font-bold uppercase tracking-widest text-xs">
                    {course.type}
                 </span>
            </div>
            <h1 className="text-4xl md:text-6xl font-extrabold mb-6 tracking-tight">
                {course.title}
            </h1>
            <p className="text-xl text-slate-300 max-w-3xl leading-relaxed">
                {course.description}
            </p>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-8 max-w-5xl -mt-10 grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Left Column: Syllabus */}
        <div className="lg:col-span-2 space-y-8">
            <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-100">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Course Overview</h2>
                <div className="prose prose-lg text-gray-600">
                    {course.overview ? <PortableText value={course.overview} /> : <p>Syllabus coming soon...</p>}
                </div>
            </div>

            {/* Instructors Section */}
            {course.instructors && (
                <div className="mt-12">
                    <h3 className="text-xl font-bold text-gray-900 mb-6">Your Instructors</h3>
                    <div className="grid gap-6">
                        {course.instructors.map((inst: any) => (
                            <div key={inst.name} className="flex gap-4 p-6 bg-slate-50 rounded-xl border border-gray-200">
                                {inst.imageUrl ? (
                                    <img src={inst.imageUrl} alt={inst.name} className="w-16 h-16 rounded-full object-cover" />
                                ) : (
                                    <div className="w-16 h-16 bg-gray-300 rounded-full"></div>
                                )}
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

        {/* Right Column: Enrollment Card */}
        <div className="lg:col-span-1">
            <div className="bg-white p-6 rounded-xl shadow-xl border border-gray-200 sticky top-24">
                <div className="mb-6 pb-6 border-b border-gray-100 flex justify-between items-baseline">
                    <span className="text-sm font-bold text-gray-500">Tuition</span>
                    <span className="text-3xl font-black text-gray-900">{course.price}</span>
                </div>
                <div className="space-y-4 mb-8">
                    <div className="flex items-center gap-3">
                        <span className="text-gray-400">📅</span>
                        <span className="font-bold text-gray-700 text-sm">{course.meta}</span>
                    </div>
                </div>
                <button className="w-full py-4 bg-indigo-600 text-white font-bold rounded hover:bg-indigo-700 transition shadow-lg">
                    Enroll Now
                </button>
            </div>
        </div>
      </div>
    </div>
  );
}