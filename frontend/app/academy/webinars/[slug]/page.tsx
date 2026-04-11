import { client } from "@/sanity/lib/client";
import { notFound } from "next/navigation";
import Link from "next/link";
import VideoBlock from "@/components/VideoBlock";

export const revalidate = 0;

async function getWebinar(slug: string) {
  const query = `*[_type == "webinar" && slug.current == $slug][0]{
    title,
    "slug": slug.current,
    summary,
    description,
    publishedAt,
    date,
    duration,
    pillar,
    registrationLink,
    "videoUrl": video.url,
    "videoCaption": video.caption,
    "imageUrl": image.asset->url,
    "speakers": speakers[]->{
      name,
      role,
      bio,
      "imageUrl": image.asset->url
    }
  }`;
  return client.fetch(query, { slug });
}

const pillarColors: Record<string, string> = {
  Policy:     "bg-sky-100 text-sky-700 border-sky-300",
  Economics:  "bg-emerald-100 text-emerald-700 border-emerald-300",
  Technology: "bg-indigo-100 text-indigo-700 border-indigo-300",
  Clinical:   "bg-rose-100 text-rose-700 border-rose-300",
  Equity:     "bg-violet-100 text-violet-700 border-violet-300",
  Academy:    "bg-sky-100 text-sky-700 border-sky-300",
};

export default async function WebinarDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const webinar = await getWebinar(slug);

  if (!webinar) return notFound();

  const pillarStyle = pillarColors[webinar.pillar] ?? "bg-slate-100 text-slate-600 border-slate-200";
  const displayDate = webinar.date ?? webinar.publishedAt;

  return (
    <div className="min-h-screen bg-white pb-20 font-sans text-slate-800">

      {/* ── HERO ── */}
      <header className="bg-slate-50 border-b border-slate-200 py-14">
        <div className="max-w-5xl mx-auto px-6">
          <Link
            href="/academy/webinars"
            className="text-slate-400 hover:text-slate-700 text-xs font-bold uppercase tracking-widest transition-colors mb-6 inline-block"
          >
            ← Webinars & Roundtables
          </Link>

          <div className="flex flex-wrap gap-2 mb-4">
            {webinar.pillar && (
              <span className={`text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full border ${pillarStyle}`}>
                {webinar.pillar}
              </span>
            )}
            <span className="text-[10px] font-bold text-slate-400 border border-slate-200 rounded-full px-3 py-1">
              Webinar
            </span>
          </div>

          <h1 className="ty-h1 font-black tracking-tight leading-tight mb-5">
            {webinar.title}
          </h1>

          <p className="ty-hero text-slate-600 leading-relaxed max-w-3xl">
            {webinar.summary}
          </p>

          <div className="flex flex-wrap items-center gap-4 mt-6 text-sm text-slate-500 font-medium">
            {displayDate && (
              <span>📅 {new Date(displayDate).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}</span>
            )}
            {webinar.duration && <span>⏱ {webinar.duration}</span>}
          </div>
        </div>
      </header>

      {/* ── MAIN CONTENT ── */}
      <div className="max-w-5xl mx-auto px-6 py-10 grid grid-cols-1 lg:grid-cols-3 gap-10">

        {/* Left: Video + Description */}
        <div className="lg:col-span-2 space-y-8">

          {/* Video Player */}
          {webinar.videoUrl ? (
            <div>
              <VideoBlock
                value={{ url: webinar.videoUrl, caption: webinar.videoCaption || webinar.title }}
              />
            </div>
          ) : webinar.imageUrl ? (
            <div className="aspect-video bg-slate-900 rounded-2xl overflow-hidden flex items-center justify-center relative shadow-xl">
              <img src={webinar.imageUrl} alt={webinar.title} className="w-full h-full object-cover opacity-70" />
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
                <div className="w-16 h-16 rounded-full bg-white/90 flex items-center justify-center shadow-lg">
                  <svg className="w-8 h-8 text-indigo-600 ml-1" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
                {webinar.registrationLink && (
                  <span className="text-white/80 text-sm font-medium">Register to watch live</span>
                )}
              </div>
            </div>
          ) : (
            <div className="aspect-video bg-linear-to-br from-indigo-900 to-slate-900 rounded-2xl flex items-center justify-center shadow-xl">
              <div className="text-center text-white">
                <div className="text-5xl mb-3">🎥</div>
                <p className="font-bold text-lg">Video Coming Soon</p>
                <p className="text-slate-400 text-sm mt-1">Register below to be notified when the recording is available.</p>
              </div>
            </div>
          )}

          {/* Description */}
          {(webinar.description || webinar.summary) && (
            <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
              <h2 className="font-black text-slate-900 text-xl mb-4">About This Webinar</h2>
              <p className="text-slate-600 leading-relaxed text-[17px]">
                {webinar.description || webinar.summary}
              </p>
            </div>
          )}

          {/* Speakers */}
          {webinar.speakers && webinar.speakers.length > 0 && (
            <div>
              <h2 className="font-black text-slate-900 text-xl mb-4">Featured Speakers</h2>
              <div className="space-y-4">
                {webinar.speakers.map((sp: { name: string; role?: string; bio?: string; imageUrl?: string }) => (
                  <div key={sp.name} className="flex gap-4 p-5 bg-slate-50 rounded-2xl border border-slate-200">
                    <div className="w-14 h-14 rounded-full bg-indigo-100 flex items-center justify-center shrink-0 overflow-hidden">
                      {sp.imageUrl
                        ? <img src={sp.imageUrl} alt={sp.name} className="w-full h-full object-cover" />
                        : <span className="text-xl font-black text-indigo-600">{sp.name[0]}</span>
                      }
                    </div>
                    <div>
                      <p className="font-bold text-slate-900">{sp.name}</p>
                      {sp.role && <p className="text-xs font-bold text-indigo-600 uppercase tracking-wider mt-0.5">{sp.role}</p>}
                      {sp.bio && <p className="text-sm text-slate-500 mt-1 leading-relaxed">{sp.bio}</p>}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right: CTA sidebar */}
        <div className="lg:col-span-1">
          <div className="bg-white border border-slate-200 rounded-2xl shadow-xl p-6 sticky top-24 space-y-4">
            <div className="text-center py-3 bg-indigo-50 rounded-xl border border-indigo-100">
              <p className="text-xs font-black uppercase tracking-widest text-indigo-500 mb-1">Free Event</p>
              <p className="text-2xl font-black text-indigo-900">Open Access</p>
            </div>

            {webinar.registrationLink ? (
              <a
                href={webinar.registrationLink}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full py-4 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl text-center text-lg transition-colors shadow-md"
              >
                Register Now →
              </a>
            ) : (
              <button className="w-full py-4 bg-slate-100 text-slate-400 font-bold rounded-xl text-center cursor-not-allowed" disabled>
                Registration Closed
              </button>
            )}

            <div className="space-y-3 pt-4 border-t border-slate-100 text-sm">
              {displayDate && (
                <div className="flex justify-between">
                  <span className="text-slate-400">Date</span>
                  <span className="font-bold text-slate-700">
                    {new Date(displayDate).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                  </span>
                </div>
              )}
              {webinar.duration && (
                <div className="flex justify-between">
                  <span className="text-slate-400">Duration</span>
                  <span className="font-bold text-slate-700">{webinar.duration}</span>
                </div>
              )}
              {webinar.pillar && (
                <div className="flex justify-between">
                  <span className="text-slate-400">Pillar</span>
                  <span className="font-bold text-slate-700">{webinar.pillar}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span className="text-slate-400">Format</span>
                <span className="font-bold text-slate-700">Live + Recording</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">CE Credit</span>
                <span className="font-bold text-slate-700">Pending ANCC</span>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100">
              <p className="text-xs text-slate-400 text-center leading-relaxed">
                Can&apos;t attend live? A recording will be available to registered attendees within 48 hours.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
