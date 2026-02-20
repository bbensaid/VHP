"use client";

import { PortableText, PortableTextComponents } from "next-sanity";
import { client } from "@/sanity/lib/client";
import imageUrlBuilder from '@sanity/image-url';
import VideoBlock from "@/components/VideoBlock";

const builder = imageUrlBuilder(client);
function urlFor(source: any) {
  return builder.image(source);
}

const ptComponents: PortableTextComponents = {
  block: {
    h1: ({ children }) => <h1 className="text-4xl font-black mt-12 mb-6 text-slate-900">{children}</h1>,
    h2: ({ children }) => <h2 className="text-3xl font-bold mt-10 mb-4 text-slate-900 leading-tight">{children}</h2>,
    h3: ({ children }) => <h3 className="text-2xl font-bold mt-8 mb-3 text-slate-800">{children}</h3>,
    normal: ({ children }) => <p className="mb-6 text-lg leading-relaxed text-slate-700">{children}</p>,
    quote: ({ children }) => (
      <blockquote className="border-l-4 border-indigo-600 pl-4 italic text-xl text-slate-600 my-8 bg-slate-50 py-4 pr-4 rounded-r-lg">
        {children}
      </blockquote>
    ),
  },
  types: {
    image: ({ value }) => {
      if (!value?.asset?._ref) return null;
      return (
        <figure className="my-10">
          <img
            src={urlFor(value).width(1200).auto('format').url()}
            alt={value.alt || ''}
            className="w-full rounded-xl shadow-lg"
          />
          {value.caption && <figcaption className="mt-2 text-center text-sm text-slate-500 italic">{value.caption}</figcaption>}
        </figure>
      );
    },
    video: VideoBlock,
    youtube: VideoBlock,
    // --- ADDED AUDIO TYPE HANDLER BELOW ---
    audio: ({ value }) => {
      if (!value?.url) return null;
      return (
        <div className="my-10 p-6 bg-slate-50 border border-slate-200 rounded-xl shadow-sm">
          <div className="flex flex-col gap-2 mb-4">
            <span className="text-xs font-bold uppercase tracking-widest text-indigo-600">Audio Insight</span>
            <h4 className="text-xl font-bold text-slate-900">{value.title || "Untitled Podcast"}</h4>
            {value.summary && <p className="text-slate-600 text-sm italic">{value.summary}</p>}
          </div>
          <audio controls className="w-full h-12">
            <source src={value.url} type="audio/mpeg" />
            Your browser does not support the audio element.
          </audio>
        </div>
      );
    },
  },
};

export default function ArticleContent({ body }: { body: any }) {
  return <PortableText value={body} components={ptComponents} />;
}