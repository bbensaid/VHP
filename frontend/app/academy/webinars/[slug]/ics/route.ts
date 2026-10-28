import { client } from "@/sanity/lib/client";
import { buildIcs } from "@/lib/webinar-calendar";

export const revalidate = 60;

export async function GET(request: Request, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const webinar = await client.fetch(
    `*[_type == "webinar" && slug.current == $slug][0]{ title, date, duration, description, summary }`,
    { slug },
  );
  if (!webinar?.date) return new Response("Not found", { status: 404 });

  const pageUrl = new URL(`/academy/webinars/${slug}`, request.url).toString();
  const body = buildIcs({
    slug,
    title: webinar.title,
    date: webinar.date,
    duration: webinar.duration,
    description: webinar.description ?? webinar.summary,
    url: pageUrl,
  });

  return new Response(body, {
    headers: {
      "Content-Type": "text/calendar; charset=utf-8",
      "Content-Disposition": `attachment; filename="${slug}.ics"`,
    },
  });
}
