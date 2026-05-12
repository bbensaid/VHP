import { Suspense } from "react";
import MultimediaClientPage from "./MultimediaClientPage";
import VideosPage from "@/app/media/videos/page";
import Link from "next/link";

const PODCAST_SERIES = [
  {
    id: "pillars",
    emoji: "🏛️",
    title: "Six Pillars Podcast",
    desc: "Deep-dive conversations on Policy, Economics, Technology, Clinical, Equity, and Operations — one episode per pillar per month, featuring HTR analysts and field practitioners.",
    frequency: "Monthly · 6 episodes per cycle",
    status: "Launching Q3 2025",
    accentBg: "bg-indigo-50",
    accentBorder: "border-indigo-200",
    accentText: "text-indigo-700",
  },
  {
    id: "vermont",
    emoji: "🏔️",
    title: "Vermont Health Lab",
    desc: "On-the-ground reporting from Vermont's health system transformation — Act 167, Act 68, the AHEAD model, and what's actually working for rural hospitals.",
    frequency: "Bi-weekly · ~30 minutes",
    status: "Launching Q3 2025",
    accentBg: "bg-emerald-50",
    accentBorder: "border-emerald-200",
    accentText: "text-emerald-700",
  },
  {
    id: "wire",
    emoji: "⚡",
    title: "The Wire: Weekly Briefing",
    desc: "A 15-minute audio digest of the week's top healthcare policy and economics news — everything from The Wire, curated and narrated by an HTR analyst.",
    frequency: "Weekly · ~15 minutes",
    status: "Launching Q2 2025",
    accentBg: "bg-amber-50",
    accentBorder: "border-amber-200",
    accentText: "text-amber-700",
  },
];

const PodcastsTab = () => (
  <div className="space-y-8">
    <div className="rounded-2xl border-2 border-indigo-200 bg-indigo-50 p-8">
      <div className="flex items-start gap-4 mb-5">
        <span className="text-5xl">🎙️</span>
        <div>
          <h2 className="text-2xl font-black text-indigo-700 mb-1">HTR Podcast Network</h2>
          <p className="text-slate-600 leading-relaxed max-w-3xl">
            Three podcast series covering healthcare transformation from policy to practice.
            Episodes are produced by HTR analysts and feature practitioners, researchers, and
            executives working at the frontier of health system change. Subscribe to get notified
            at launch.
          </p>
        </div>
      </div>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
      {PODCAST_SERIES.map(s => (
        <div key={s.id} className={`rounded-xl border ${s.accentBorder} ${s.accentBg} p-5 flex flex-col`}>
          <span className="text-3xl mb-3">{s.emoji}</span>
          <h3 className={`font-black text-base ${s.accentText} mb-2`}>{s.title}</h3>
          <p className="text-slate-600 text-sm leading-relaxed flex-1 mb-3">{s.desc}</p>
          <div className="border-t border-slate-200 pt-3 space-y-1">
            <p className="text-xs text-slate-500 font-semibold">{s.frequency}</p>
            <span className="inline-block text-[10px] font-black uppercase tracking-widest bg-white border border-slate-200 text-slate-500 px-2 py-0.5 rounded">
              {s.status}
            </span>
          </div>
        </div>
      ))}
    </div>

    <div className="bg-white border border-slate-200 rounded-2xl p-6 flex flex-col md:flex-row items-start md:items-center gap-6">
      <div className="flex-1">
        <h3 className="font-black text-slate-900 text-lg mb-1">Get Notified at Launch</h3>
        <p className="text-slate-600 text-sm leading-relaxed">
          Subscribe to receive an email when the first episodes drop. Subscribers also get
          early access to episode transcripts and show notes.
        </p>
      </div>
      <Link
        href="/connect/alerts"
        className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-black text-white bg-indigo-600 hover:bg-indigo-700 transition-colors shadow whitespace-nowrap"
      >
        Subscribe to Alerts →
      </Link>
    </div>
  </div>
);

const LIBRARY_CATEGORIES = [
  { emoji: "📋", label: "Policy Briefs", count: "Coming soon", desc: "Downloadable PDF briefs on CMS rule-making, state Medicaid policy, and legislative analysis." },
  { emoji: "📊", label: "Data Reports", count: "Coming soon", desc: "State-level data reports, benchmarking analyses, and research findings from the HTR Index." },
  { emoji: "🎓", label: "Webinar Recordings", count: "Available now", desc: "Full recordings from HTR webinars and expert sessions.", href: "/academy/webinars" },
  { emoji: "📖", label: "Case Studies", count: "Available now", desc: "In-depth case studies on health system transformation initiatives.", href: "/academy/case-studies" },
  { emoji: "🗒️", label: "White Papers", count: "Coming soon", desc: "Long-form analytical papers on Six-Pillar topics, co-authored with academic and policy partners." },
  { emoji: "🔬", label: "Research Summaries", count: "Coming soon", desc: "Structured summaries of peer-reviewed research relevant to health system transformation." },
];

const LibraryTab = () => (
  <div className="space-y-8">
    <div className="rounded-2xl border-2 border-slate-200 bg-slate-50 p-8">
      <div className="flex items-start gap-4 mb-5">
        <span className="text-5xl">📚</span>
        <div>
          <h2 className="text-2xl font-black text-slate-700 mb-1">Full Multimedia Library</h2>
          <p className="text-slate-600 leading-relaxed max-w-3xl">
            A unified archive of all HTR media assets — policy briefs, data reports, webinar
            recordings, case studies, and white papers. Content is organized by pillar and
            accessible to subscribers. Some categories are available now; others launch with
            the full platform in 2025.
          </p>
        </div>
      </div>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {LIBRARY_CATEGORIES.map(c => (
        <div key={c.label} className="bg-white border border-slate-200 rounded-xl p-5">
          <div className="flex items-center gap-3 mb-3">
            <span className="text-2xl">{c.emoji}</span>
            <div>
              <h3 className="font-black text-slate-900 text-sm">{c.label}</h3>
              <span className={`text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded ${c.count === "Available now" ? "bg-emerald-100 text-emerald-700" : "bg-slate-100 text-slate-500"}`}>
                {c.count}
              </span>
            </div>
          </div>
          <p className="text-slate-500 text-sm leading-relaxed">{c.desc}</p>
          {c.href && (
            <Link href={c.href} className="inline-flex items-center gap-1 text-xs font-black text-indigo-600 hover:underline mt-3">
              Browse →
            </Link>
          )}
        </div>
      ))}
    </div>
  </div>
);

export const metadata = {
  title: "HTR Multimedia | Podcasts, Videos & Library",
  description: "Podcasts, video briefings, policy briefs, and the full HTR media library — organized by the Six-Pillar Framework.",
};

export default function MultimediaHubPage() {
  return (
    <Suspense>
      <MultimediaClientPage
        podcastsTab={<PodcastsTab />}
        videosTab={<VideosPage />}
        libraryTab={<LibraryTab />}
      />
    </Suspense>
  );
}
