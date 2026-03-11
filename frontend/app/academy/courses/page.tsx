import React from "react";
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
    <div className="bg-gray-50 min-h-screen pb-20">
      <div className="bg-white border-b border-gray-200 py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">
            Course Catalog
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl">
            Browse our library of certifications, masterclasses, and workshops
            tailored for healthcare leadership.
          </p>
          <CoursesClient courses={courses} />
        </div>
      </div>
    </div>
  );
}
