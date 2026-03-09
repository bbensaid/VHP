import Link from "next/link";

interface Article {
  _id: string;
  title: string;
  slug: { current: string };
  summary: string;
  publishedAt: string;
  category: string;
  impactLevel?: string;
}

interface PillarHubProps {
  pillarName: string;
  pillarSlug: string;
  tagline: string;
  description: string;
  themeColor: "economics" | "policy" | "technology";
  featured: Article | null;
  recent: Article[];
}

export function PillarHub({
  pillarName,
  pillarSlug,
  tagline,
  description,
  themeColor,
  featured,
  recent,
}: PillarHubProps) {
  
  const styles = {
    economics: {
      header: "bg-brand-economics",
      text: "text-brand-economics",
      border: "border-brand-economics",
      indicator: "bg-brand-economics",
      hoverText: "group-hover:text-brand-economics",
      lightBg: "bg-emerald-50",
    },
    policy: {
      header: "bg-brand-policy",
      text: "text-brand-policy",
      border: "border-brand-policy",
      indicator: "bg-brand-policy",
      hoverText: "group-hover:text-brand-policy",
      lightBg: "bg-sky-50",
    },
    technology: {
      header: "bg-brand-technology",
      text: "text-brand-technology",
      border: "border-brand-technology",
      indicator: "bg-brand-technology",
      hoverText: "group-hover:text-brand-technology",
      lightBg: "bg-indigo-50",
    },
  };

  const theme = styles[themeColor];

  return (
    <div className="min-h-screen bg-white pb-20 font-sans text-slate-800">
      
      {/* 1. HERO HEADER - Snaps to Global Grid */}
      <header className={`${theme.header} text-white py-16 border-b-4 border-black/10`}>
        <div className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="max-w-4xl">
            <h1 className="text-4xl md:text-6xl font-black tracking-tight mb-4 uppercase">
              {pillarName}
            </h1>
            <p className="text-xl md:text-2xl font-medium text-white/90 tracking-wide mb-6">
              {tagline}
            </p>
            <p className="text-lg text-white/80 leading-relaxed">
              {description}
            </p>
          </div>
        </div>
      </header>

      {/* 2. LEAD STORY SECTION */}
      <section className="relative -mt-8 z-10">
        <div className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden flex flex-col md:flex-row min-h-[400px]">
            
            {/* Main Content (Clickable) */}
            <div className="md:w-3/4 relative group">
              {featured ? (
                <Link 
                  href={`/${pillarSlug}/${featured.slug.current}`} 
                  className="block p-8 md:p-12 h-full w-full"
                >
                  <div className="flex items-center gap-3 mb-6">
                    <span className={`${theme.indicator} text-white text-xs font-bold uppercase px-3 py-1 rounded-full`}>
                      Deep Dive
                    </span>
                    <span className="text-slate-500 text-sm font-bold uppercase tracking-wider">
                      {featured.category || "Analysis"}
                    </span>
                  </div>
                  
                  <h2 className={`text-3xl md:text-4xl font-bold text-slate-900 mb-6 leading-tight transition-colors ${theme.hoverText}`}>
                    {featured.title}
                  </h2>
                  
                  <p className="text-lg text-slate-600 mb-8 leading-relaxed line-clamp-3 md:line-clamp-4">
                    {featured.summary}
                  </p>
                  
                  <span className={`inline-flex items-center font-bold text-lg transition-colors ${theme.text}`}>
                    Read Full Analysis →
                  </span>
                </Link>
              ) : (
                <div className="p-8 md:p-12 flex items-center justify-center h-full text-slate-400">
                  <p>No active reports available.</p>
                </div>
              )}
            </div>

            {/* Impact Sidebar */}
            <div className={`md:w-1/4 ${theme.lightBg} p-8 md:p-10 border-l border-slate-100 flex flex-col justify-center`}>
              <h4 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-3">Impact Level</h4>
              <div className="flex items-center gap-3">
                <div className={`w-5 h-5 rounded-full shadow-sm ${featured?.impactLevel === 'Critical' ? 'bg-red-500 animate-pulse' : 'bg-yellow-500'}`}></div>
                <span className="text-2xl font-bold text-slate-800">{featured?.impactLevel || "N/A"}</span>
              </div>
              
              {featured && (
                <div className="mt-8 pt-8 border-t border-slate-200/50">
                  <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-1">Published</p>
                  <p className="text-slate-700 font-medium">{new Date(featured.publishedAt).toLocaleDateString()}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* 3. RECENT BRIEFS & DATA DASHBOARD WIDGET */}
      <section className="py-20">
        <div className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="flex flex-col lg:flex-row gap-12 items-start">
            
            {/* Left Column: Recent Briefs */}
            <div className="lg:w-2/3">
              <h3 className="text-2xl font-bold text-slate-900 mb-8 flex items-center gap-3">
                <span className={`w-1.5 h-8 rounded-full ${theme.indicator}`}></span> 
                Recent Briefs
              </h3>
              
              <div className="grid grid-cols-1 gap-6">
                {recent.length > 0 ? recent.map((article) => (
                  <Link 
                    key={article._id} 
                    href={`/${pillarSlug}/${article.slug.current}`} 
                    className="group block bg-white border border-slate-200 rounded-2xl p-8 hover:shadow-lg transition-all hover:-translate-y-1"
                  >
                    <div className="flex justify-between items-start mb-4">
                      <span className={`text-xs font-bold uppercase tracking-wider ${theme.text}`}>
                        {article.category}
                      </span>
                      <span className="text-xs bg-slate-50 border border-slate-100 px-2 py-1 rounded text-slate-500 font-medium">
                        {new Date(article.publishedAt).toLocaleDateString()}
                      </span>
                    </div>
                    <h4 className={`text-2xl font-bold text-slate-900 mb-3 transition-colors leading-snug ${theme.hoverText}`}>
                      {article.title}
                    </h4>
                    <p className="text-slate-600 line-clamp-2 text-lg">
                      {article.summary}
                    </p>
                  </Link>
                )) : (
                  <div className="p-12 text-center bg-slate-50 rounded-xl border border-dashed border-slate-300 text-slate-500">
                    No recent briefs available.
                  </div>
                )}
              </div>
            </div>
            
            {/* Right Column: Sticky Sidebar Widget */}
            <div className="lg:w-1/3 sticky w-full" style={{ top: "var(--sidebar-top, 8rem)" }}>
              <div className="bg-slate-900 text-white p-8 md:p-10 rounded-2xl shadow-xl">
                <h3 className="font-bold text-2xl mb-3">HTR {pillarName} Data</h3>
                <p className="text-slate-400 mb-8 text-base leading-relaxed">
                  Access the raw datasets and live metrics behind our {pillarName.toLowerCase()} analysis.
                </p>
                <Link href="/dashboard" className="block w-full text-center py-4 bg-white/10 hover:bg-white/20 border border-white/10 text-white font-bold rounded-xl transition-colors text-sm uppercase tracking-wide">
                  Launch Dashboard
                </Link>
              </div>
            </div>

          </div>
        </div>
      </section>

    </div>
  );
}