import React from "react";

interface StaticPageProps {
  title: string;
  subtitle: string;
  content: React.ReactNode; // Allows passing HTML/Components
}

export default function StaticPageLayout({
  title,
  subtitle,
  content,
}: StaticPageProps) {
  return (
    <div className="py-24 px-4 md:px-8 max-w-5xl mx-auto">
      {/* Header Section */}
      <div className="text-center mb-16 border-b border-gray-100 pb-12">
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6 tracking-tight">
          {title}
        </h1>
        <p className="text-xl text-gray-500 max-w-3xl mx-auto leading-relaxed">
          {subtitle}
        </p>
      </div>

      {/* Content Injection */}
      <div className="prose prose-lg max-w-none text-gray-700">{content}</div>
    </div>
  );
}
