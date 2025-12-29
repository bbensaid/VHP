// components/CategoryPageLayout.tsx
import React from "react";
import Link from "next/link";
import { client } from "@/lib/sanity";
import VideoBlock from "./VideoBlock";
import AudioBlock from "./AudioBlock";

interface CategoryPageProps {
  pillar: "Policy" | "Economics" | "Technology"; // Restricted to your 3 Pillars
  category: string; // Must match the folder name / Header link
  title: string; // The big H1 title
  description: string; // The subtitle
  themeColor: string; // CSS class for text color
  hoverBg: string; // CSS class for hover background
  badgeStyle: string; // CSS classes for the status badge
}

export default async function CategoryPageLayout({
  pillar,
  category,
  title,
  description,
  themeColor,
  hoverBg,
  badgeStyle,
}: CategoryPageProps) {
  // Dynamic Query: Fetches articles matching the Pillar AND Category
  const query = `*[_type == "policyAnalysis" && pillar == "${pillar}" && category == "${category}"] | order(publishedAt desc) {
    _id, title, summary, publishedAt, slug, status,
    body[]{
      _key,
      _type,
      url,
      videoFile { asset->{url} },
      file { asset->{url} },
      title,
      summary,
      caption
    }
  }`;

  const articles = await client.fetch(query, {}, { next: { revalidate: 0 } });

  return (
    <div className="mt-6 space-y-12">
      {/* HEADER SECTION */}
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="lg:w-1/4 hidden lg:block"></div>
        <div className="w-full lg:w-3/4">
          <div className="mb-16 border-b border-ui-border pb-8">
            <span
              className={`text-sm font-bold ${themeColor} uppercase tracking-wider mb-2 block`}
            >
              {pillar} Pillar
            </span>
            <h1 className="text-4xl md:text-5xl font-extrabold text-text-heading mb-6">
              {title}
            </h1>
            <p className="text-xl text-text-body leading-relaxed max-w-4xl">
              {description}
            </p>
          </div>
        </div>
      </div>

      {/* ARTICLE GRID */}
      <div className="space-y-8">
        {articles.length === 0 && (
          <div className="flex flex-col lg:flex-row gap-8">
            <div className="lg:w-1/4 hidden lg:block"></div>
            <div className="w-full lg:w-3/4">
              <div className="p-10 text-center bg-surface-muted rounded-xl border border-ui-border">
                <p className="text-text-body mb-4">No analysis available yet.</p>
                <p className="text-sm text-text-body/60">
                  Run the AI script with pillar: "<strong>{pillar}</strong>" and
                  category: "<strong>{category}</strong>".
                </p>
              </div>
            </div>
          </div>
        )}

        {articles.map((article: any) => {
          const videos = article.body?.filter((b: any) => b._type === "video") || [];
          const audios = article.body?.filter((b: any) => b._type === "audio") || [];

          return (
            <div key={article._id} className="flex flex-col lg:flex-row gap-8">
              {/* LEFT SIDEBAR (25%) - Media Blocks */}
              <div className="order-2 lg:order-1 lg:w-1/4 flex flex-row lg:flex-col gap-4 items-start justify-start">
                {videos.map((video: any) => (
                  <div key={video._key} className="w-full max-w-[240px] lg:max-w-none">
                    <VideoBlock value={video} compact={true} />
                  </div>
                ))}
                {audios.map((audio: any) => (
                  <div key={audio._key} className="w-full max-w-[240px] lg:max-w-none">
                    <AudioBlock value={audio} compact={true} />
                  </div>
                ))}
              </div>

              {/* MAIN CONTENT (75%) - Article Card */}
              <div className="order-1 lg:order-2 w-full lg:w-3/4">
                <div className="group bg-surface border border-ui-border rounded-xl p-6 hover:shadow-md transition-all relative overflow-hidden">
                  {/* Hover Color Bar */}
                  <div
                    className={`absolute left-0 top-0 bottom-0 w-1 ${hoverBg} opacity-0 group-hover:opacity-100 transition-opacity`}
                  ></div>

                  <div className="flex flex-col gap-4">
                    <div>
                      <div className="flex items-center gap-3 mb-3">
                        <span className="text-xs text-text-body/60 font-mono border border-ui-border px-2 py-1 rounded">
                          {new Date(article.publishedAt).toLocaleDateString()}
                        </span>
                        {article.status && (
                          <span
                            className={`px-2 py-1 ${badgeStyle} text-xs font-bold rounded uppercase`}
                          >
                            {article.status}
                          </span>
                        )}
                      </div>
                      <h3 className="text-xl font-bold text-text-heading mb-3">
                        {article.title}
                      </h3>
                      <p className="text-text-body leading-relaxed">{article.summary}</p>
                    </div>

                    {/* Footer Action Row (Just Read Analysis now) */}
                    <div className="flex items-center justify-between pt-4 border-t border-ui-border/50 mt-2">
                      <Link
                        href={`/articles/${article.slug.current}`}
                        className={`text-sm font-bold ${themeColor} hover:underline`}
                      >
                        Read Analysis &rarr;
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
