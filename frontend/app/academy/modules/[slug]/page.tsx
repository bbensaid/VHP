// frontend/app/academy/modules/[slug]/page.tsx
// Route: /academy/modules/[slug]
// Renders a single academyModule document using AcademyModuleEngine.

import { Metadata } from "next";
import { notFound } from "next/navigation";
import { client } from "@/sanity/lib/client";
import AcademyModuleEngine from "@/components/templates/AcademyModuleEngine";

// ── Static params for build-time generation ──────────────────────────────────
export async function generateStaticParams() {
  const slugs: { slug: string }[] = await client.fetch(
    `*[_type == "academyModule" && defined(slug.current)]{ "slug": slug.current }`
  );
  return slugs.map(({ slug }) => ({ slug }));
}

// ── Page metadata ─────────────────────────────────────────────────────────────
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;

  const module = await client.fetch(
    `*[_type == "academyModule" && slug.current == $slug][0]{
      title, summary, courseTitle, moduleNumber
    }`,
    { slug }
  );

  if (!module) return { title: "Module Not Found" };

  return {
    title: `${module.title} | HTR Academy`,
    description: module.summary,
    openGraph: {
      title: module.title,
      description: module.summary,
      type: "article",
    },
  };
}

// ── Page component ────────────────────────────────────────────────────────────
export default async function AcademyModulePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  if (!slug) return notFound();

  return <AcademyModuleEngine slug={slug} />;
}