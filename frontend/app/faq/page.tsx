// app/faq/page.tsx

import React from "react";
import Link from "next/link";

const FAQPage: React.FC = () => {
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
    <div className="py-16 px-4 md:px-8 max-w-4xl mx-auto">
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-extrabold text-text-heading mb-6">
          Frequently Asked Questions
        </h1>
        <p className="text-xl text-text-body">
          Everything you need to know about our methodology, membership, and
          mission.
        </p>
      </div>

      <div className="space-y-12">
        {faqs.map((section, i) => (
          <div
            key={i}
            className="bg-surface border border-ui-border rounded-xl p-8 shadow-sm"
          >
            <h2 className="text-2xl font-bold text-ui-primary mb-6 border-b border-ui-border pb-2">
              {section.category}
            </h2>
            <div className="space-y-8">
              {section.items.map((item, j) => (
                <div key={j}>
                  <h3 className="text-lg font-bold text-text-heading mb-2">
                    {item.q}
                  </h3>
                  <p className="text-text-body leading-relaxed">{item.a}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="text-center mt-16">
        <p className="text-text-body mb-4">Still have questions?</p>
        <Link
          href="/advisory/contact"
          className="text-ui-primary font-bold hover:underline"
        >
          Contact Support &rarr;
        </Link>
      </div>
    </div>
  );
};

export default FAQPage;
