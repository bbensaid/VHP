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

  // MAPPING: We map the pillar name to YOUR specific CSS variables.
  // Policy -> brand-orange
  // Economics -> brand-green
  // Technology -> brand-indigo
  const styles = {
    economics: {
      header: "bg-brand-green",
      text: "text-brand-green",
      border: "border-brand-green",
      indicator: "bg-brand-green",
      hoverText: "group-hover:text-brand-green",
      lightBg: "bg-emerald-50", // Subtle match for green
    },
    policy: {
      header: "bg-brand-orange",
      text: "text-brand-orange",
      border: "border-brand-orange",
      indicator: "bg-brand-orange",
      hoverText: "group-hover:text-brand-orange",
      lightBg: "bg-orange-50", // Subtle match for orange
    },
    technology: {
      header: "bg-brand-indigo",
      text: "text-brand-indigo",
      border: "border-brand-indigo",
      indicator: "bg-brand-indigo",
      hoverText: "group-hover:text-brand-indigo",
      lightBg: "bg-indigo-50", // Subtle match for indigo
    },
  };

  const theme = styles[themeColor];

  return (
    <div className="min-h-screen bg-white pb-20 font-sans text-slate-800">
      
      {/* HEADER */}
      <header className={`${theme.header} text-white py-16 border-b-4 border-black/10`}>
        <div className="container mx-auto px-4 md:px-8">
          <div className="max-w-4xl">
            <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-2 uppercase">
              {pillarName}
            </h1>
            <p className="text-xl font-medium text-white/90 tracking-wide mb-6">
              {tagline}
            </p>
            <p className="text-lg text-white/80 max-w-2xl leading-relaxed">
              {description}
            </p>
          </div>
        </div>
      </header>

      {/* LEAD STORY SECTION */}
      <section className="relative -mt-8 container mx-auto px-4 md:px-8 z-10">
        <div className="bg-white rounded-xl shadow-xl border border-slate-200 overflow-hidden flex flex-col md:flex-row min-h-[400px]">
          
          {/* Main Content (Clickable) */}
          <div className="md:w-3/4 relative group">
            {featured ? (
              <Link 
                href={`/${pillarSlug}/${featured.slug.current}`} 
                className="block p-8 md:p-10 h-full w-full"
              >
                <div className="flex items-center gap-3 mb-6">
                  <span className={`${theme.indicator} text-white text-xs font-bold uppercase px-3 py-1 rounded-full`}>
                    Deep Dive
                  </span>
                  <span className="text-slate-500 text-sm font-bold uppercase tracking-wider">
                    {featured.category || "Analysis"}
                  </span>
                </div>
                
                <h2 className={`text-3xl font-bold text-slate-900 mb-6 leading-tight transition-colors ${theme.hoverText}`}>
                  {featured.title}
                </h2>
                
                <p className="text-lg text-slate-600 mb-8 leading-relaxed line-clamp-3">
                  {featured.summary}
                </p>
                
                <span className={`inline-flex items-center font-bold transition-colors ${theme.text}`}>
                  Read Full Analysis &rarr;
                </span>
              </Link>
            ) : (
              <div className="p-8 md:p-10 flex items-center justify-center h-full text-slate-400">
                <p>No active reports available.</p>
              </div>
            )}
          </div>

          {/* Impact Sidebar */}
          <div className={`md:w-1/4 ${theme.lightBg} p-8 border-l border-slate-100 flex flex-col justify-center`}>
             <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">Impact Level</h4>
             <div className="flex items-center gap-3">
                <div className={`w-4 h-4 rounded-full shadow-sm ${featured?.impactLevel === 'Critical' ? 'bg-red-500 animate-pulse' : 'bg-yellow-500'}`}></div>
                <span className="text-xl font-bold text-slate-700">{featured?.impactLevel || "N/A"}</span>
             </div>
             {featured && (
               <div className="mt-8 pt-8 border-t border-slate-200/50">
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Published</p>
                  <p className="text-slate-600 font-medium">{new Date(featured.publishedAt).toLocaleDateString()}</p>
               </div>
             )}
          </div>
        </div>
      </section>

      {/* RECENT BRIEFS */}
      <section className="container mx-auto px-4 md:px-8 py-16">
        <div className="flex flex-col lg:flex-row gap-12">
          
          <div className="lg:w-2/3">
             <h3 className="text-2xl font-bold text-slate-900 mb-8 flex items-center gap-3">
               <span className={`w-1.5 h-8 rounded-full ${theme.indicator}`}></span>
               Recent Briefs
             </h3>
             <div className="grid gap-4">
                {recent.length > 0 ? recent.map((article) => (
                  <Link 
                    key={article._id} 
                    href={`/${pillarSlug}/${article.slug.current}`} 
                    className="group block bg-white border border-slate-200 rounded-lg p-6 hover:shadow-md transition-all hover:-translate-y-1"
                  >
                    <div className="flex justify-between items-start mb-3">
                       <span className={`text-xs font-bold uppercase tracking-wider ${theme.text}`}>
                         {article.category}
                       </span>
                       <span className="text-xs text-slate-400 font-medium">
                         {new Date(article.publishedAt).toLocaleDateString()}
                       </span>
                    </div>
                    <h4 className={`text-xl font-bold text-slate-900 mb-2 transition-colors ${theme.hoverText}`}>
                      {article.title}
                    </h4>
                    <p className="text-slate-600 line-clamp-2 text-base">
                      {article.summary}
                    </p>
                  </Link>
                )) : (
                  <div className="p-8 text-center bg-slate-50 rounded-lg border border-slate-100 text-slate-500">
                    No recent briefs available.
                  </div>
                )}
             </div>
          </div>
          
           {/* Sidebar Widget */}
           <div className="lg:w-1/3">
             <div className="bg-slate-900 text-white p-8 rounded-xl shadow-lg">
                <h3 className="font-bold text-xl mb-2">HTR {pillarName} Data</h3>
                <p className="text-slate-400 mb-6 text-sm leading-relaxed">
                  Access the raw datasets and live metrics behind our {pillarName.toLowerCase()} analysis.
                </p>
                <button className="w-full py-3 bg-white/10 hover:bg-white/20 border border-white/10 text-white font-bold rounded-lg transition-colors text-sm uppercase tracking-wide">
                   Launch Dashboard
                </button>
             </div>
          </div>
        </div>
      </section>
    </div>
  );
}