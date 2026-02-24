import React from "react";
import Link from "next/link";

export default function FAQPage() {
  const faqs = [
    {
      category: "Membership & Access",
      items: [
        {
          q: "Is HTR content free to access?",
          a: "We operate on a freemium model. Core news and policy briefs are free. Deep-dive economic models and masterclasses require a Professional Membership.",
        },
        {
          q: "Do you offer enterprise licenses?",
          a: "Yes. Health systems and payer organizations can purchase enterprise seats for their strategy teams. Contact Advisory for details.",
        },
      ],
    },
    {
      category: "Editorial Standards",
      items: [
        {
          q: "Is HTR funded by pharma or tech lobbies?",
          a: "No. We maintain strict editorial independence. Revenue is derived solely from subscriptions, advisory services, and masterclasses. We do not accept sponsored content.",
        },
        {
          q: "How do you source your data?",
          a: "We utilize primary source government filings (CMS, FDA), proprietary scraping of clinical trial databases, and anonymized claims data partnerships.",
        },
      ],
    },
    {
      category: "Advisory Services",
      items: [
        {
          q: "Can I hire HTR analysts for custom projects?",
          a: "Yes. Our Advisory arm engages in 4-6 week sprints for custom market sizing, policy impact analysis, and due diligence.",
        },
      ],
    },
  ];

  return (
    <div className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full font-sans text-slate-800">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-6">
            Frequently Asked Questions
          </h1>
          <p className="text-xl text-slate-600">
            Everything you need to know about our methodology, membership, and mission.
          </p>
        </div>

        <div className="space-y-12">
          {faqs.map((section, i) => (
            <div
              key={i}
              className="bg-white border border-slate-200 rounded-xl p-8 shadow-sm"
            >
              <h2 className="text-2xl font-bold text-indigo-600 mb-6 border-b border-slate-100 pb-2">
                {section.category}
              </h2>
              <div className="space-y-8">
                {section.items.map((item, j) => (
                  <div key={j}>
                    <h3 className="text-lg font-bold text-slate-900 mb-2">
                      {item.q}
                    </h3>
                    <p className="text-slate-600 leading-relaxed">{item.a}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-16">
          <p className="text-slate-600 mb-4">Still have questions?</p>
          <Link
            href="/advisory/contact"
            className="text-indigo-600 font-bold hover:underline"
          >
            Contact Support →
          </Link>
        </div>
      </div>
    </div>
  );
}