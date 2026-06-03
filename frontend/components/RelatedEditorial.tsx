import Link from "next/link";
import { client } from "@/lib/sanity";

/**
 * "More in this pillar" rail — case studies + webinars for a pillar
 * (PLAN_SANITY_ECOSYSTEM.md §8 surfacing). Server component; one GROQ query.
 * Reports are paywalled (no per-doc route) so they are not listed here — they
 * live behind /advisory/reports.
 *
 * `pillar` is the capitalized label (matches Sanity caseStudy/webinar.pillar).
 * Renders nothing if the pillar has no case studies or webinars.
 */

interface EditorialItem {
  _id: string;
  _type: "caseStudy" | "webinar";
  title: string;
  summary?: string;
  slug?: { current: string };
}

const HREF: Record<EditorialItem["_type"], string> = {
  caseStudy: "/academy/case-studies",
  webinar: "/academy/webinars",
};

const LABEL: Record<EditorialItem["_type"], string> = {
  caseStudy: "Case Study",
  webinar: "Webinar",
};

export default async function RelatedEditorial({
  pillar,
  cardHoverClass = "hover:border-slate-300",
  titleHoverClass = "group-hover:text-slate-900",
}: {
  /** Capitalized pillar label, e.g. "Economics". */
  pillar: string;
  cardHoverClass?: string;
  titleHoverClass?: string;
}) {
  const items: EditorialItem[] = await client.fetch(
    `*[_type in ["caseStudy","webinar"] && pillar == $pillar] | order(_createdAt desc)[0...6]{
      _id, _type, title,
      "summary": coalesce(summary, description),
      slug
    }`,
    { pillar },
    { next: { revalidate: 300 } }
  );

  if (!items || items.length === 0) return null;

  return (
    <div className="mb-12 mt-16">
      <div className="flex items-center justify-between mb-6 border-b border-slate-200 pb-2">
        <h2 className="ty-h3 font-black text-slate-900">More in this Pillar</h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((item) => {
          const href = item.slug?.current
            ? `${HREF[item._type]}/${item.slug.current}`
            : HREF[item._type];
          return (
            <Link
              key={item._id}
              href={href}
              className={`group block bg-white p-6 rounded-xl border border-slate-200 ${cardHoverClass} hover:shadow-lg transition-all`}
            >
              <div className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-3">
                {LABEL[item._type]}
              </div>
              <h3 className={`font-bold text-slate-900 mb-2 ${titleHoverClass} transition-colors leading-snug`}>
                {item.title}
              </h3>
              {item.summary && (
                <p className="ty-body text-slate-600 line-clamp-3">{item.summary}</p>
              )}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
