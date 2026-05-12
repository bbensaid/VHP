import Link from "next/link";
import { client } from "@/lib/sanity";

export const metadata = {
  title: "Faculty | HTR Academy",
  description: "HTR Academy instructors — the policymakers, health system executives, actuaries, and researchers who wrote the policies and built the systems they now teach.",
};

interface Person {
  _id: string;
  name: string;
  role?: string;
  bio?: string;
  tags?: string[];
  imageUrl?: string;
}

async function getFaculty() {
  const query = `*[_type == "instructor"] | order(name asc) {
    _id, name, role, bio, tags, "imageUrl": image.asset->url
  }`;
  return client.fetch(query, {}, { next: { revalidate: 60 } });
}

export default async function FacultyPage() {
  const faculty = await getFaculty();

  return (
    <div className="bg-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center max-w-4xl mx-auto mb-16">
          <h1 className="ty-h1 font-black text-slate-900 mb-4">Learn from the Architects</h1>
          <p className="text-base text-slate-600">
            HTR Academy courses are taught by the people who wrote the policies, built the technologies, and managed the budgets.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {faculty.length === 0 && (
            <div className="col-span-2 text-center py-12 bg-slate-50 rounded-xl border border-dashed border-slate-300">
              <p className="text-slate-500">No faculty found. Run the seed script to populate data.</p>
            </div>
          )}
          {(faculty as Person[]).map((person, idx) => {
            const anonName = `Faculty #${idx + 1}`;
            return (
            <div key={person._id} className="flex flex-col sm:flex-row gap-6 p-6 bg-white border border-slate-200 rounded-xl hover:shadow-lg transition-shadow">
              <div className="shrink-0 mx-auto sm:mx-0">
                <div className="w-32 h-32 rounded-full bg-indigo-600 flex items-center justify-center text-white text-2xl font-bold border-4 border-indigo-50">
                  F{idx + 1}
                </div>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-slate-900">{anonName}</h3>
                <p className="text-indigo-600 font-bold mb-3 uppercase text-xs tracking-wider">{person.role || "Instructor"}</p>
                <p className="text-slate-600 mb-4 leading-relaxed">{person.bio}</p>
                {person.tags && (
                  <div className="flex flex-wrap gap-2">
                    {person.tags.map((tag: string) => (
                      <span key={tag} className="px-2 py-1 bg-slate-100 text-slate-600 text-xs font-bold uppercase rounded-full border border-slate-200">{tag}</span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )})}
        </div>

        <div className="mt-20 p-10 bg-indigo-700 rounded-2xl text-center text-white">
          <h2 className="text-3xl font-bold mb-4">Become a Fellow</h2>
          <p className="text-indigo-100 max-w-2xl mx-auto mb-8">
            Are you a recognized expert in your field? HTR Academy is always looking for visiting faculty to lead masterclasses.
          </p>
          <Link href="/advisory/contact" className="px-6 py-3 bg-white text-indigo-700 font-bold rounded-lg hover:bg-indigo-50 transition-colors">
            Apply to Teach
          </Link>
        </div>
      </div>
    </div>
  );
}