import React from "react";
import { client } from "@/lib/sanity";
import Link from "next/link";
import { notFound } from "next/navigation";

// 1. Fetch specific webinar data
async function getWebinar(slug: string) {
  const query = `*[_type == "webinar" && slug.current == $slug][0]{
    title,
    pillar,
    description,
    date,
    duration,
    registrationLink,
    "imageUrl": image.asset->url
  }`;
  return client.fetch(query, { slug }, { next: { revalidate: 60 } });
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

  // Format Date
  const eventDate = new Date(webinar.date);
  const dateStr = eventDate.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });
  const timeStr = eventDate.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    timeZoneName: "short",
  });

  return (
    <div className="bg-white min-h-screen pb-20">
      {/* HERO HEADER */}
      <div className="bg-slate-900 text-white py-20 border-b border-indigo-900">
        <div className="container mx-auto px-4 md:px-8 max-w-4xl text-center">
            <span className="inline-block px-3 py-1 mb-6 rounded border border-indigo-500/30 bg-indigo-500/10 text-indigo-300 text-xs font-bold uppercase tracking-widest">
                {webinar.pillar} Webinar
            </span>
            <h1 className="text-3xl md:text-5xl font-extrabold mb-6 leading-tight">
                {webinar.title}
            </h1>
            <p className="text-xl text-slate-300 max-w-2xl mx-auto">
                {webinar.description}
            </p>
        </div>
      </div>

      {/* BODY CONTENT */}
      <div className="container mx-auto px-4 md:px-8 max-w-4xl -mt-8 relative z-10">
        <div className="bg-white rounded-xl shadow-xl border border-gray-200 p-8 md:p-12 flex flex-col md:flex-row gap-12 items-center">
            
            {/* Left: Event Details */}
            <div className="flex-1 space-y-6">
                <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-slate-100 rounded-lg flex items-center justify-center text-2xl">
                        📅
                    </div>
                    <div>
                        <h3 className="font-bold text-gray-900 uppercase text-sm tracking-wider">Date</h3>
                        <p className="text-lg text-gray-700">{dateStr}</p>
                    </div>
                </div>

                <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-slate-100 rounded-lg flex items-center justify-center text-2xl">
                        ⏰
                    </div>
                    <div>
                        <h3 className="font-bold text-gray-900 uppercase text-sm tracking-wider">Time</h3>
                        <p className="text-lg text-gray-700">{timeStr} ({webinar.duration || "60 Min"})</p>
                    </div>
                </div>

                <div className="flex items-start gap-4">
                     <div className="w-12 h-12 bg-slate-100 rounded-lg flex items-center justify-center text-2xl">
                        🎥
                    </div>
                    <div>
                        <h3 className="font-bold text-gray-900 uppercase text-sm tracking-wider">Location</h3>
                        <p className="text-lg text-gray-700">Live via Zoom</p>
                    </div>
                </div>
            </div>

            {/* Right: Action */}
            <div className="w-full md:w-1/3 bg-slate-50 p-6 rounded-xl border border-slate-100 text-center">
                <h3 className="font-bold text-gray-900 mb-4">Reserve Your Spot</h3>
                <p className="text-sm text-gray-500 mb-6">
                    Space is limited to 500 attendees. Recordings are sent to registrants only.
                </p>
                {webinar.registrationLink ? (
                    <a 
                        href={webinar.registrationLink} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="block w-full py-4 bg-indigo-600 text-white font-bold rounded hover:bg-indigo-700 transition-colors shadow-lg"
                    >
                        Register Now
                    </a>
                ) : (
                    <button className="block w-full py-4 bg-indigo-600 text-white font-bold rounded hover:bg-indigo-700 transition-colors shadow-lg">
                        Register Now
                    </button>
                )}
            </div>
        </div>

        {/* BACK LINK */}
        <div className="mt-12 text-center">
            <Link href="/education/webinars" className="text-gray-500 font-bold hover:text-indigo-600 transition-colors">
                ← Back to All Events
            </Link>
        </div>
      </div>
    </div>
  );
}