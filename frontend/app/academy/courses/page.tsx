import { client } from "@/lib/sanity";
import CoursesClient from "./CoursesClient";

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
  return client.fetch(query, {}, { next: { revalidate: 60 } });
}

export default async function CoursesPage() {
  const courses = await getCourses();

  return (
    <div className="bg-white min-h-screen pb-20">
      <div className="max-w-7xl mx-auto px-6 pt-12 pb-0">
        <div className="bg-slate-50 border border-slate-200 rounded-2xl px-8 py-10 mb-10">
          <span className="inline-block text-xs font-black uppercase tracking-widest text-sky-700 bg-sky-50 border border-sky-200 rounded-full px-3 py-1 mb-4">
            Academy · Courses
          </span>
          <h1 className="ty-h1 font-black text-slate-900 mb-3">
            Course Catalog
          </h1>
          <p className="ty-hero text-slate-600 max-w-3xl leading-relaxed">
            Browse our library of certifications, masterclasses, and workshops
            tailored for healthcare leadership.
          </p>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <CoursesClient courses={courses} />
      </div>
    </div>
  );
}
