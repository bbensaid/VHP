"use client";

import { PortableText, PortableTextComponents } from "next-sanity";
import { client } from "@/sanity/lib/client";
import imageUrlBuilder from '@sanity/image-url';
import VideoBlock from "@/components/VideoBlock";
import AudioBlock from "@/components/AudioBlock";

const builder = imageUrlBuilder(client);
function urlFor(source: any) {
  return builder.image(source);
}

const ptComponents: PortableTextComponents = {
  block: {
    quote: ({ children }) => (
      <blockquote className="border-l-4 border-indigo-600 pl-6 italic text-xl text-slate-700 my-8 bg-slate-50 py-6 pr-6 rounded-r-lg">
        {children}
      </blockquote>
    ),
    callout: ({ children }) => (
      <div className="my-8 p-6 bg-indigo-50 border border-indigo-100 rounded-xl text-indigo-900 shadow-sm">
        <div className="flex items-start gap-3">
          <span className="text-2xl text-indigo-600">💡</span>
          <div className="text-lg font-medium leading-relaxed">{children}</div>
        </div>
      </div>
    ),
  },
  types: {
    image: ({ value }) => {
      // Logic: If asset exists, show image. If not, show a styled placeholder for the Studio upload.
      const hasAsset = value?.asset?._ref;
      
      return (
        <figure className="my-10">
          {hasAsset ? (
            <img
              src={urlFor(value).width(1200).auto('format').url()}
              alt={value.alt || ''}
              className="w-full rounded-xl shadow-lg border border-slate-200"
            />
          ) : (
            <div className="w-full h-64 bg-slate-50 border-2 border-dashed border-slate-200 rounded-xl flex flex-col items-center justify-center text-slate-400 gap-2">
              <span className="text-4xl">🖼️</span>
              <span className="text-sm font-medium">Image Asset Pending (Upload in Sanity Studio)</span>
            </div>
          )}
          {value.caption && (
            <figcaption className="mt-3 text-center text-sm text-slate-500 italic">
              {value.caption}
            </figcaption>
          )}
        </figure>
      );
    },
    video: VideoBlock,
    youtube: VideoBlock,
    audio: AudioBlock,
    code: ({ value }) => {
      let data = value.code;
      if (typeof data === 'string') {
        try { data = JSON.parse(data); } catch (e) {
          return <pre className="p-4 bg-slate-900 text-slate-50 rounded-lg overflow-x-auto my-6 text-sm"><code>{data}</code></pre>;
        }
      }
      if (!Array.isArray(data) || data.length === 0) return null;
      const headers = Object.keys(data[0]);
      return (
        <div className="my-10 overflow-hidden border border-slate-200 rounded-xl shadow-sm bg-white">
          {value.title && <div className="bg-slate-900 text-white px-6 py-3 font-bold text-xs uppercase tracking-widest">{value.title}</div>}
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200">
                  {headers.map((header) => (
                    <th key={header} className="px-6 py-4 text-[10px] font-black text-slate-500 uppercase tracking-tighter">{header}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {data.map((row, rowIndex) => (
                  <tr key={rowIndex} className="hover:bg-slate-50/50">
                    {headers.map((header) => (
                      <td key={`${rowIndex}-${header}`} className="px-6 py-4 text-slate-700 text-sm">{row[header]}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      );
    },
  },
};

export default function ArticleContent({ body }: { body: any }) {
  return <PortableText value={body} components={ptComponents} />;
}