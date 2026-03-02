import React from "react";
import { client } from "@/sanity/lib/client";
import { notFound } from "next/navigation";
import Link from "next/link";

// Refresh data every 0 seconds to prevent 404s on new content
export const revalidate = 0;

async function getWebinar(slug: string) {
  const query = `*[_type == "webinar" && slug.current == $slug][0]{
    title,
    "slug": slug.current,
    summary,
    publishedAt,
    registrationLink,
    "imageUrl": image.asset->url
  }`;
  return client.fetch(query, { slug });
}

export default async function WebinarDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const webinar = await getWebinar(slug);

  if (!webinar) {
    return notFound();
  }

  return (
    <div className="min-h-screen bg-white pb-20 font-sans text-slate-800">
      {/* HEADER */}
      <header className="bg-blue-900 text-white py-16 border-b-4 border-blue-700">
        <div className="container mx-auto px-4 md:px-8 max-w-4xl">
          <div className="flex items-center gap-3 mb-6">
            <Link 
              href="/education/webinars" 
              className="text-blue-300 hover:text-white uppercase text-xs font-bold tracking-widest transition-colors"
            >
              Webinars
            </Link>
          </div>
          
          <h1 className="text-3xl md:text-5xl font-black tracking-tight mb-6 leading-tight">
            {webinar.title}
          </h1>
          
          <p className="text-xl text-blue-100 leading-relaxed">
            {webinar.summary}
          </p>

          <div className="mt-8 flex items-center gap-4 text-sm text-blue-200 font-medium">
            <span>{new Date(webinar.publishedAt).toLocaleDateString()}</span>
          </div>
        </div>
      </header>

      {/* CONTENT */}
      <article className="container mx-auto px-4 md:px-8 max-w-3xl py-12">
        <div className="prose prose-lg prose-slate max-w-none">
          {webinar.registrationLink && (
            <div className="mb-8">
              <a 
                href={webinar.registrationLink} 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-block bg-blue-600 text-white px-8 py-4 rounded-lg font-bold hover:bg-blue-700 transition-colors shadow-lg"
              >
                Register for Webinar
              </a>
            </div>
          )}
          <p className="text-slate-600">
            Join us for this informative session.
          </p>
        </div>
      </article>
    </div>
  );
}