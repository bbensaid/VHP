import { client } from "@/lib/sanity";
import { PortableText } from "@portabletext/react";
import Link from "next/link";
import { notFound } from "next/navigation";

async function getCaseStudy(slug: string) {
  const query = `*[_type == "caseStudy" && slug.current == $slug][0]`;
  return client.fetch(query, { slug }, { next: { revalidate: 60 } });
}

export default async function CaseStudyDetail({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const study = await getCaseStudy(slug);

  if (!study) return notFound();

  return (
    <div className="bg-white min-h-screen pb-20">
      <div className="bg-slate-900 text-white py-24">
        <div className="container mx-auto px-4 md:px-8 max-w-4xl">
           <span className="text-indigo-400 font-bold uppercase tracking-widest text-xs mb-4 block">
              Case Study • {study.clientType}
           </span>
           <h1 className="text-4xl md:text-6xl font-extrabold mb-8 leading-tight">
             {study.title}
           </h1>
           <div className="flex flex-wrap gap-4">
              {study.metrics?.map((m: string) => (
                <span key={m} className="px-4 py-2 bg-white/10 border border-white/20 rounded-lg font-bold text-white">
                  {m}
                </span>
              ))}
           </div>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-8 max-w-3xl py-12">
        <div className="prose prose-lg prose-indigo mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Executive Summary</h2>
          <p className="text-xl text-gray-600 mb-12 leading-relaxed border-l-4 border-indigo-600 pl-6 italic">
            {study.summary}
          </p>
          <hr className="my-12 border-gray-200" />
          
          <div className="bg-slate-50 p-8 rounded-xl border border-gray-200 mb-12">
             <h3 className="font-bold text-gray-900 mb-4">Analysis</h3>
             {study.body ? <PortableText value={study.body} /> : <p>Detailed analysis content loading...</p>}
          </div>
        </div>
        
        <div className="mt-12 text-center">
             <Link href="/academy/case-studies" className="text-indigo-600 font-bold hover:underline">
                &larr; Back to Library
             </Link>
        </div>
      </div>
    </div>
  );
}