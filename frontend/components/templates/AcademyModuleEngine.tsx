// components/templates/AcademyModuleEngine.tsx
// Server component — fetches module data and delegates rendering to AcademyModuleLayout.

import { notFound } from "next/navigation";
import { client } from "@/sanity/lib/client";
import AcademyModuleLayout from "@/components/templates/AcademyModuleLayout";

async function getModule(slug: string) {
  return client.fetch(
    `*[_type == "academyModule" && slug.current == $slug][0]{
      _id, title, courseTitle, moduleNumber, totalModules,
      pillar, level, estimatedReadTime, summary,
      learningObjectives, prevModuleSlug, nextModuleSlug,
      body[]{
        ...,
        _type == "image" => {
          ...,
          asset->{ _id, _ref, url, metadata { dimensions } }
        }
      }
    }`,
    { slug },
    { cache: "no-store" }
  );
}

async function getCourseModules(courseTitle: string) {
  return client.fetch(
    `*[_type == "academyModule" && courseTitle == $courseTitle] | order(moduleNumber asc) {
      _id, title, moduleNumber, "slug": slug.current
    }`,
    { courseTitle }
  );
}

export default async function AcademyModuleEngine({ slug }: { slug: string }) {
  const mod = await getModule(slug);
  if (!mod) return notFound();

  const courseModules = await getCourseModules(mod.courseTitle);

  return (
    <AcademyModuleLayout
      module={mod}
      courseModules={courseModules}
      slug={slug}
    />
  );
}
