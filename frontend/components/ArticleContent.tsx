import React from "react";
import { PortableText } from "@portabletext/react";
import Link from "next/link";

// The Table Component
const TableBlock = ({ value }: { value: any }) => {
  let data = [];
  try {
    data = JSON.parse(value.code);
  } catch (e) {
    return (
      <pre className="bg-gray-100 p-4 rounded text-xs overflow-x-auto">
        {value.code}
      </pre>
    );
  }

  if (!Array.isArray(data) || data.length === 0) return null;
  const headers = Object.keys(data[0]);

  return (
    <div className="my-8 overflow-x-auto rounded-lg border border-gray-200 shadow-sm">
      <table className="w-full text-sm text-left">
        <thead className="bg-gray-50 text-gray-700 uppercase text-xs font-bold border-b border-gray-200">
          <tr>
            {headers.map((header) => (
              <th key={header} className="px-6 py-3 whitespace-nowrap">
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100 bg-white">
          {data.map((row: any, i: number) => (
            <tr key={i} className="hover:bg-gray-50 transition-colors">
              {headers.map((header) => (
                <td
                  key={header}
                  className="px-6 py-4 font-medium text-gray-900"
                >
                  {row[header]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

// --- MAIN EXPORT ---

const components = {
  types: {
    code: TableBlock,
    image: ({ value }: any) => (
      <figure className="my-8">
        <img
          src={value.asset?.url}
          alt={value.alt || "Article Image"}
          className="w-full rounded-xl shadow-md"
        />
        {value.caption && (
          <figcaption className="mt-2 text-center text-sm text-gray-500">
            {value.caption}
          </figcaption>
        )}
      </figure>
    ),
  },
  block: {
    h2: ({ children }: any) => (
      <h2 className="text-2xl font-bold mt-12 mb-6 text-gray-900">
        {children}
      </h2>
    ),
    h3: ({ children }: any) => (
      <h3 className="text-xl font-bold mt-8 mb-4 text-gray-800">{children}</h3>
    ),
    normal: ({ children }: any) => (
      <p className="mb-6 text-lg leading-relaxed text-gray-700">{children}</p>
    ),
    quote: ({ children }: any) => (
      <blockquote className="border-l-4 border-indigo-500 pl-6 py-2 my-8 italic text-xl text-gray-800 bg-gray-50 rounded-r-lg">
        {children}
      </blockquote>
    ),
    callout: ({ children }: any) => (
      <div className="my-8 p-6 bg-indigo-50 border border-indigo-100 rounded-lg text-lg text-indigo-900 font-medium shadow-sm">
        {children}
      </div>
    ),
    blockquote: ({ children }: any) => {
      return (
        <blockquote className="border-l-4 border-indigo-500 pl-6 py-2 my-8 italic text-xl text-gray-800 bg-gray-50 rounded-r-lg">
          {children}
        </blockquote>
      );
    },
  },
  marks: {
    strong: ({ children }: any) => (
      <strong className="font-bold text-gray-900">{children}</strong>
    ),
    link: ({ children, value }: any) => (
      <Link
        href={value.href}
        className="text-indigo-600 hover:underline decoration-2 underline-offset-2"
      >
        {children}
      </Link>
    ),
    "highlight-policy": ({ children }: any) => (
      <span className="bg-orange-100 text-orange-800 px-1 rounded">
        {children}
      </span>
    ),
    "highlight-economics": ({ children }: any) => (
      <span className="bg-green-100 text-green-800 px-1 rounded">
        {children}
      </span>
    ),
    "highlight-tech": ({ children }: any) => (
      <span className="bg-indigo-100 text-indigo-800 px-1 rounded">
        {children}
      </span>
    ),
  },
};

export default function ArticleContent({ body }: { body: any }) {
  return <PortableText value={body} components={components} />;
}
