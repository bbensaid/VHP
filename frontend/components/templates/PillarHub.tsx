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
      header: "bg-brand-green",
      text: "text-brand-green",
      border: "border-brand-green",
      indicator: "bg-brand-green",
      hoverText: "group-hover:text-brand-green",
      lightBg: "bg-emerald-50", 
    },
    policy: {
      header: "bg-brand-orange",
      text: "text-brand-orange",
      border: "border-brand-orange",
      indicator: "bg-brand-orange",
      hoverText: "group-hover:text-brand-orange",
      lightBg: "bg-orange-50", 
    },
    technology: {
      header: "bg-brand-indigo",
      text: "text-brand-indigo",
      border: "border-brand-indigo",
      indicator: "bg-brand-indigo",
      hoverText: "group-hover:text-brand-indigo",
      lightBg: "bg-indigo-50", 
    },
  };

  const theme = styles[themeColor];

  return (
    <div className="min-h-screen bg-white pb-20 font-sans text-slate-800">
      
      {/* FIX: Removed 'pt-8 md:pt-12' 
         Added 'mt-4' to provide a minimal standard gap from your navbar 
         without pushing it down below your sidebars. 
         If you need it absolutely flush (0px), remove 'mt-4'.
      */}
      <div className="container mx-auto px-4 md:px-8 mt-1">
        
        {/* 1. HEADER CARD */}
        <div className={`${theme.header} text-white p-8 md:p-12 rounded-t-3xl shadow-sm`}>
            <div className="max-w-4xl">
              <h1 className="text-4xl md:text-6xl font-black tracking-tight mb-4 uppercase">
                {pillarName}
              </h1>
              <p className="text-xl md:text-2xl font-medium text-white/90 tracking-wide mb-6">
                {tagline}
              </p>
              <p className="text-lg text-white/80 max-w-2xl leading-relaxed">
                {description}
              </p>
            </div>
        </div>

        {/* 2. DEEP DIVE SECTION */}
        <div className="bg-white rounded-b-3xl shadow-xl border-x border-b border-slate-200 overflow-hidden flex flex-col md:flex-row min-h-[400px]">
          
          {/* Main Content */}
          <div className="md:w-3/4 relative group border-r border-slate-100">
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
                
                <p className="text-lg text-slate-600 mb-8 leading-relaxed line-clamp-3">
                  {featured.summary}
                </p>
                
                <span className={`inline-flex items-center font-bold text-lg transition-colors ${theme.text}`}>
                  Read Full Analysis &rarr;
                </span>
              </Link>
            ) : (
              <div className="p-12 flex items-center justify-center h-full text-slate-400">
                <p>No active reports available.</p>
              </div>
            )}
          </div>

          {/* Impact Sidebar */}
          <div className={`md:w-1/4 ${theme.lightBg} p-8 md:p-10 flex flex-col justify-center`}>
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

        {/* 3. RECENT BRIEFS */}
        <div className="py-16">
          <div className="flex flex-col lg:flex-row gap-12">
            
            <div className="lg:w-2/3">
               <h3 className="text-2xl font-bold text-slate-900 mb-8 flex items-center gap-3">
                 <span className={`w-1.5 h-8 rounded-full ${theme.indicator}`}></span>
                 Recent Briefs
               </h3>
               <div className="grid gap-6">
                  {recent.length > 0 ? recent.map((article) => (
                    <Link 
                      key={article._id} 
                      href={`/${pillarSlug}/${article.slug.current}`} 
                      className="group block bg-white border border-slate-200 rounded-xl p-8 hover:shadow-lg transition-all hover:-translate-y-1"
                    >
                      <div className="flex justify-between items-start mb-4">
                         <span className={`text-xs font-bold uppercase tracking-wider ${theme.text}`}>
                           {article.category}
                         </span>
                         <span className="text-xs text-slate-400 font-medium">
                           {new Date(article.publishedAt).toLocaleDateString()}
                         </span>
                      </div>
                      <h4 className={`text-xl font-bold text-slate-900 mb-3 transition-colors ${theme.hoverText}`}>
                        {article.title}
                      </h4>
                      <p className="text-slate-600 line-clamp-2 text-base">
                        {article.summary}
                      </p>
                    </Link>
                  )) : (
                    <div className="p-12 text-center bg-white rounded-xl border border-slate-200 text-slate-500">
                      No recent briefs available.
                    </div>
                  )}
               </div>
            </div>
            
             {/* Sidebar Widget */}
             <div className="lg:w-1/3">
               <div className="bg-slate-900 text-white p-8 rounded-2xl shadow-lg sticky top-8">
                  <h3 className="font-bold text-xl mb-3">HTR {pillarName} Data</h3>
                  <p className="text-slate-400 mb-8 text-sm leading-relaxed">
                    Access the raw datasets and live metrics behind our {pillarName.toLowerCase()} analysis.
                  </p>
                  <button className="w-full py-4 bg-white/10 hover:bg-white/20 border border-white/10 text-white font-bold rounded-xl transition-colors text-sm uppercase tracking-wide">
                     Launch Dashboard
                  </button>
               </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}