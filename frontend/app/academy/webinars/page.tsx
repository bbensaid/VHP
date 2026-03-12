import { client } from "@/lib/sanity";
import AcademyCard from "@/components/academy/AcademyCard";

interface Webinar {
  _id: string;
  title: string;
  pillar?: string;
  description?: string;
  date: string;
  duration?: string;
  slug: string;
}

async function getWebinars() {
  const query = `*[_type == "webinar"] | order(date asc) {
    _id, title, pillar, description, date, duration, "slug": slug.current
  }`;
  return client.fetch(query, {}, { next: { revalidate: 60 } });
}

export default async function WebinarsPage() {
  const allWebinars: Webinar[] = await getWebinars();
  const featured = allWebinars.length > 0 ? allWebinars[0] : null;
  const upcoming = allWebinars.length > 1 ? allWebinars.slice(1) : [];

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", { month: "short", day: "numeric", hour: "numeric", minute: "2-digit" });
  };

  return (
    <div className="bg-white min-h-screen pb-20">
      <div className="bg-slate-50 border-b border-gray-200 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-indigo-600 font-bold uppercase tracking-widest text-xs mb-2 block">Live Intelligence</span>
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6">Webinars & Roundtables</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">Join live discussions with global leaders. Q&A included in every session.</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8">
        {featured ? (
          <div className="bg-white p-8 rounded-xl border border-gray-200 shadow-xl mb-16 flex flex-col md:flex-row items-center gap-8">
            <div className="md:w-2/3">
              <div className="flex items-center gap-3 mb-4">
                <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-xs font-bold uppercase inline-block">Next Up</span>
                <span className="text-sm font-bold text-gray-500">{formatDate(featured.date)}</span>
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">{featured.title}</h2>
              <p className="text-gray-600 mb-6 text-lg">{featured.description}</p>
              <div className="flex gap-4">
                <button className="px-6 py-3 bg-indigo-600 text-white font-bold rounded hover:bg-indigo-700 shadow-md transition-all">Register Free</button>
                <button className="px-6 py-3 border border-gray-300 font-bold rounded hover:bg-gray-50 text-gray-700">Add to Calendar</button>
              </div>
            </div>
            <div className="md:w-1/3 bg-slate-900 h-48 w-full rounded-lg flex items-center justify-center text-white/20 font-bold text-4xl border border-slate-700">HTR</div>
          </div>
        ) : (
          <div className="bg-white p-12 rounded-xl border border-dashed border-gray-300 text-center mb-12">
            <p className="text-gray-500 font-bold">No upcoming webinars scheduled.</p>
          </div>
        )}

        {upcoming.length > 0 && (
          <>
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Upcoming Schedule</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {upcoming.map((webinar) => (
                <AcademyCard key={webinar._id} type="WEBINAR" pillar={(webinar.pillar ?? "General") as "Policy" | "Economics" | "Technology" | "General"} title={webinar.title} description={webinar.description ?? ""} meta={formatDate(webinar.date)} price="Free" href={`/academy/webinars/${webinar.slug}`} />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}