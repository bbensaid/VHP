import Link from "next/link";

export const metadata = {
  title: "Site Map | HTR",
  description: "Complete directory of all pages, tools, and resources available on the Health Transformation Review platform.",
};

const sections = [
  {
    title: "Intelligence Pillars",
    links: [
      { label: "Policy", href: "/policy" },
      { label: "Economics", href: "/economics" },
      { label: "Technology", href: "/technology" },
      { label: "Clinical", href: "/clinical" },
      { label: "Equity", href: "/equity" },
    ],
  },
  {
    title: "Platform",
    links: [
      { label: "State Performance Index", href: "/dashboard" },
      { label: "HTR Academy", href: "/academy" },
      { label: "Future Advisory Services", href: "/advisory" },
      { label: "Multimedia", href: "/multimedia" },
      { label: "Trending Topics", href: "/trending-topics" },
      { label: "AI Analyst", href: "/chat" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About HTR", href: "/about" },
      { label: "Mission & Vision", href: "/mission" },
      { label: "Our Methodology", href: "/about/methodology" },
      { label: "FAQ", href: "/faq" },
      { label: "Contact", href: "/advisory/contact" },
      { label: "Subscribe", href: "/subscribe" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Terms of Service", href: "/terms" },
    ],
  },
];

export default function SitemapPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-24">
      <div className="mb-12 border-b border-slate-200 pb-8">
        <h1 className="ty-h1 font-black text-slate-900 mb-2">Sitemap</h1>
        <p className="text-slate-500">All pages on the Health Transformation Review platform.</p>
      </div>
      <div className="grid sm:grid-cols-2 gap-10">
        {sections.map((section) => (
          <div key={section.title}>
            <h2 className="text-xs font-black uppercase tracking-widest text-slate-400 mb-4">
              {section.title}
            </h2>
            <ul className="space-y-2.5">
              {section.links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-slate-700 hover:text-brand-policy font-medium transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
