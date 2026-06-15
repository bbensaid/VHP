import Link from "next/link";
import Image from "next/image";
import { getImageDimensions } from "@sanity/asset-utils";
import { client } from "@/lib/sanity";
import { getUser, roleAtLeast } from "@/lib/auth";
import UpgradePrompt from "@/components/UpgradePrompt";
import AcademyContent from "./AcademyContent";
import VideoBlock from "./VideoBlock";
import AudioBlock from "./AudioBlock";
import PrintButton from "@/components/PrintButton";
import ListenButton from "@/components/ListenButton";
import ShareButton from "@/components/ShareButton";
import CitationButton from "@/components/CitationButton";
import SaveToPdfButton from "@/components/SaveToPdfButton";
import FontSizeToggle from "@/components/FontSizeToggle";
import BookmarkButton from "@/components/BookmarkButton";
import EmailCaptureBar from "@/components/EmailCaptureBar";

// Minimal Sanity portable-text block shape (full types require sanity typegen)
interface SanityBlock {
  _type: string;
  _key?: string;
  style?: string;
  children?: Array<{ text: string }>;
  [key: string]: unknown;
}

interface RelatedArticle {
  _id: string;
  title: string;
  summary?: string;
  publishedAt?: string;
  pillar?: string;
  slug?: { current: string };
}

// Helper to style based on Pillar
const getTheme = (pillar: string) => {
  switch (pillar) {
    case "Economics":
      return { badge: "bg-green-100 text-green-800", text: "text-green-800" };
    case "Policy":
      return {
        badge: "bg-sky-100 text-sky-800",
        text: "text-sky-800",
      };
    case "Technology":
      return {
        badge: "bg-indigo-100 text-indigo-800",
        text: "text-indigo-800",
      };
    default:
      return { badge: "bg-gray-100 text-slate-800", text: "text-slate-800" };
  }
};

const slugify = (text: string) => text.toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-');

export default async function ArticlePageTemplate({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const query = `*[_type == "policyAnalysis" && slug.current == $slug][0]{
    _id,
    title,
    summary,
    publishedAt,
    pillar,
    status,
    impactLevel,
    mainImage {
      asset->{
        _id,
        url
      },
      alt,
      caption
    },
    body[]{
      ...,
      _key,
      _type == "video" => {
        ...,
        "url": url, 
        videoFile { asset->{url, mimeType} },
        file { asset->{url, mimeType} },
        video { asset->{url, mimeType} },
        asset->{url, mimeType}
      },
      _type == "youtube" => { ..., url },
      _type == "mux.video" => { ..., url },
      _type == "audio" => {
        ...,
        file { asset->{url} }
      },
      _type == "image" => {
        ...,
        asset->{url}
      }
    },
    "relatedArticles": *[_type == "policyAnalysis" && pillar == ^.pillar && _id != ^._id] | order(publishedAt desc)[0...2] {
      _id,
      title,
      slug,
      publishedAt,
      pillar,
      summary
    }
  }`;

  const article = await client.fetch(
    query,
    { slug: id },
    { next: { revalidate: 0 } },
  );

  if (!article) {
    return (
      <div className="max-w-3xl mx-auto py-20 px-8 text-center">
        <h1 className="ty-h1 font-bold text-slate-900 dark:text-slate-100">Article Not Found</h1>
        <p className="mt-2 text-slate-600 dark:text-slate-400">
          The requested analysis could not be retrieved.
        </p>
        <Link
          href="/"
          className="mt-6 inline-block text-indigo-600 hover:underline"
        >
          &larr; Return Home
        </Link>
      </div>
    );
  }

  const theme = getTheme(article.pillar);

  // TEMP: subscription gating disabled — all content is fully readable by every
  // user (anon included) until the subscription flow is built. To re-enable the
  // paywall, restore: `user ? roleAtLeast(user.role, "subscriber") : false`.
  const user = await getUser();
  void roleAtLeast; // keep import while gating is disabled
  const canReadFull = true;

  const videoElements =
    article.body?.filter((block: SanityBlock) => ["video", "youtube", "mux.video"].includes(block._type)) || [];
  const audioElements =
    article.body?.filter((block: SanityBlock) => block._type === "audio") || [];
  const mainContent =
    article.body || [];

  // Extract plain text for the speech synthesizer
  const plainTextBody = (article.body as SanityBlock[] | null)
    ?.filter((b) => b._type === "block")
    .map((b) => b.children?.map((c) => c.text).join(""))
    .join(" ") || "";
  const readText = `${article.title}. ${article.summary}. ${plainTextBody}`;

  interface Heading { text: string; id: string; level: string }
  // Extract headings for Table of Contents
  const headings: Heading[] = mainContent
    .filter((block: SanityBlock) => block._type === 'block' && block.style != null && ['h2', 'h3'].includes(block.style))
    .map((block: SanityBlock) => {
      const text = block.children?.map((c) => c.text).join('') || '';
      return { text, id: slugify(text), level: block.style ?? 'h2' };
    });

  return (
    <>
      <div className="flex flex-col lg:flex-row gap-8 max-w-7xl mx-auto px-4 md:px-8 py-12">
        {/* Left Sidebar */}
        <aside className="order-2 lg:order-1 lg:w-1/4 w-full">
          <div className="sticky space-y-6" style={{ top: "calc(var(--sidebar-top, var(--sticky-bar-height, 2.5rem)) + 1rem)" }}>
            
            {/* Table of Contents */}
            {headings.length > 0 && (
              <div className="p-5 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm hidden lg:block">
                <h3 className="font-bold text-slate-900 dark:text-slate-100 uppercase tracking-wider text-xs mb-4 border-b border-slate-100 dark:border-slate-700 pb-2">
                  Contents
                </h3>
                <nav>
                  <ul className="space-y-2.5">
                    {headings.map((heading) => (
                      <li key={heading.id} className={heading.level === 'h3' ? 'pl-3 border-l-2 border-slate-100' : ''}>
                        <a href={`#${heading.id}`} className={`text-sm block leading-snug transition-colors ${heading.level === 'h3' ? 'text-slate-500 dark:text-slate-400 hover:text-indigo-600' : 'text-slate-700 dark:text-slate-300 font-medium hover:text-indigo-600'}`}>
                          {heading.text}
                        </a>
                      </li>
                    ))}
                  </ul>
                </nav>
              </div>
            )}

            <div id="video-content" style={{ scrollMarginTop: "calc(var(--sidebar-top, var(--sticky-bar-height, 2.5rem)) + 1rem)" }}>
              {videoElements.map((video: SanityBlock) => (
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                <VideoBlock key={video._key} value={video as any} />
              ))}
            </div>
            {videoElements.length > 0 && audioElements.length > 0 && (
              <hr className="border-gray-200 my-8" />
            )}
            <div id="audio-content" style={{ scrollMarginTop: "calc(var(--sidebar-top, var(--sticky-bar-height, 2.5rem)) + 1rem)" }}>
              {audioElements.map((audio: SanityBlock) => (
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                <AudioBlock key={audio._key} value={audio as any} />
              ))}
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <article id="article-content" className="order-1 lg:order-2 w-full lg:w-3/4">
          <div className="mb-8" data-html2canvas-ignore="true">
            <Link
              href={article.pillar ? `/${article.pillar.toLowerCase()}` : "/"}
              className="text-sm font-bold text-slate-500 hover:text-indigo-600 flex items-center gap-2 transition-colors"
            >
              &larr; Back to {article.pillar || "Intelligence Feed"}
            </Link>
          </div>

          <header className="mb-10 border-b border-gray-200 dark:border-slate-700 pb-10">
            <div className="flex items-center gap-3 mb-6">
              {article.pillar && (
                <span
                  className={`px-3 py-1 rounded text-xs font-bold uppercase tracking-wide ${theme.badge}`}
                >
                  {article.pillar}
                </span>
              )}
              <span className="text-slate-500 dark:text-slate-400 text-sm font-medium">
                {new Date(article.publishedAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </span>
              <div className="ml-auto flex items-center gap-4">
                {article.status && (
                  <span className="text-xs font-mono text-slate-400 dark:text-slate-500 border border-gray-200 dark:border-slate-700 px-2 py-0.5 rounded">
                    {article.status}
                  </span>
                )}
                <ListenButton text={readText} />
                <ShareButton title={article.title} summary={article.summary} />
                <BookmarkButton
                  sanityId={article._id}
                  slug={id}
                  title={article.title}
                  pillar={article.pillar}
                  contentType={article._type}
                />
                <CitationButton title={article.title} publishedAt={article.publishedAt} />
                <SaveToPdfButton elementId="article-content" filename={`${id}.pdf`} />
                <FontSizeToggle targetId="article-body" />
                <PrintButton />
              </div>
            </div>

            <h1 className={`text-2xl sm:text-3xl font-black mb-4 leading-tight ${theme.text}`}>
              {article.title}
            </h1>

            <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
              {article.summary}
            </p>
          </header>

          {article.mainImage?.asset?.url && (() => {
            // Dimensions parsed from the Sanity asset _id (encodes WxH) so
            // next/image preserves ratio; the max-h-[600px] object-cover crop
            // (intentional) is preserved via className.
            let dims: { width: number; height: number } | null = null;
            try { dims = getImageDimensions(article.mainImage.asset); } catch { dims = null; }
            const heroClass = "w-full h-auto rounded-xl shadow-lg object-cover max-h-[600px]";
            return (
            <figure className="mb-12">
              {dims ? (
                <Image
                  src={article.mainImage.asset.url}
                  alt={article.mainImage.alt || article.title}
                  width={dims.width}
                  height={dims.height}
                  sizes="(max-width: 1024px) 100vw, 1024px"
                  className={heroClass}
                />
              ) : (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={article.mainImage.asset.url}
                  alt={article.mainImage.alt || article.title}
                  className={heroClass}
                  loading="lazy"
                />
              )}
              {article.mainImage.caption && (
                <figcaption className="mt-3 text-center text-sm text-slate-500 dark:text-slate-400 italic">
                  {article.mainImage.caption}
                </figcaption>
              )}
            </figure>
            );
          })()}

          {canReadFull ? (
            <>
              <div id="article-body" className="max-w-none transition-all duration-200">
                <AcademyContent body={mainContent} />
              </div>
              {!user && (
                <div className="mt-12">
                  <EmailCaptureBar context={article.pillar?.toLowerCase()} variant="inline" />
                </div>
              )}
            </>
          ) : (
            <>
              {/* Show first 3 content blocks as preview */}
              <div id="article-body" className="max-w-none transition-all duration-200 relative">
                <AcademyContent body={mainContent.slice(0, 3)} />
                {/* Fade out the preview */}
                <div className="absolute bottom-0 inset-x-0 h-48 bg-linear-to-t from-white dark:from-slate-900 to-transparent pointer-events-none" />
              </div>
              <div className="mt-2 py-8">
                <EmailCaptureBar context={article.pillar?.toLowerCase()} variant="banner" />
                <UpgradePrompt
                  required="subscriber"
                  feature="Read the full analysis — subscribe to unlock this article and the complete HTR intelligence library."
                />
              </div>
            </>
          )}

          {article.relatedArticles && article.relatedArticles.length > 0 && (
            <div className="mt-16 pt-10 border-t border-gray-200 dark:border-slate-700" data-html2canvas-ignore="true">
              <h3 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-6">Related Analysis</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {article.relatedArticles.map((related: RelatedArticle) => {
                  if (!related.slug?.current) return null;

                  const href = `/${(related.pillar || 'policy').toLowerCase()}/${related.slug.current}`;
                  
                  return (
                    <Link 
                      key={related._id} 
                      href={href}
                      className="group block bg-slate-50 dark:bg-slate-800 p-6 rounded-xl border border-slate-100 dark:border-slate-700 hover:border-indigo-200 dark:hover:border-indigo-700 hover:shadow-md transition-all"
                    >
                      <div className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">
                        {related.publishedAt ? new Date(related.publishedAt).toLocaleDateString() : ""}
                      </div>
                      <h4 className="font-bold text-slate-900 dark:text-slate-100 mb-2 group-hover:text-indigo-600 transition-colors">
                        {related.title}
                      </h4>
                      <p className="ty-body text-slate-600 dark:text-slate-400 line-clamp-2">
                        {related.summary}
                      </p>
                    </Link>
                  );
                })}
              </div>
            </div>
          )}

          <div className="mt-20 pt-10 border-t border-gray-200 dark:border-slate-700" data-html2canvas-ignore="true">
            <Link
              href={article.pillar ? `/${article.pillar.toLowerCase()}` : "/"}
              className="text-slate-500 dark:text-slate-400 hover:text-indigo-600 font-bold flex items-center gap-2"
            >
              &larr; Back to {article.pillar || "Intelligence Feed"}
            </Link>
          </div>
        </article>
      </div>
    </>
  );
}
