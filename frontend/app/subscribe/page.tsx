import Link from "next/link";

export default function SubscribePage() {
  return (
    <div className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full font-sans text-slate-800">
      {/* Hero */}
      <div className="text-center mb-16">
        <h1 className="ty-h1 font-black text-slate-900 mb-6 tracking-tight">
          Choose Your Intelligence Level
        </h1>
        <p className="text-base text-slate-600 max-w-2xl mx-auto">
          Join 15,000+ healthcare leaders who rely on HTR for non-partisan
          analysis and strategic foresight.
        </p>
      </div>

      {/* Pricing Tables */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20 max-w-6xl mx-auto">
        {/* Tier 1: Free */}
        <div className="p-8 bg-white border border-slate-200 rounded-2xl shadow-sm hover:shadow-md transition">
          <h3 className="ty-h3 font-bold text-slate-900 mb-2">Observer</h3>
          <p className="text-slate-600 ty-body mb-6">
            Essential news & public policy briefs.
          </p>
          <div className="mb-6">
            <span className="ty-h1 font-black text-slate-900">$0</span>
            <span className="text-slate-500">/month</span>
          </div>
          <button className="w-full py-3 border-2 border-slate-200 font-bold text-slate-700 rounded-lg hover:bg-slate-50 transition mb-8">
            Sign Up Free
          </button>
          <ul className="space-y-4 text-sm text-slate-600">
            <li className="flex items-center">
              <span className="text-emerald-500 mr-2 font-bold">✓</span> Weekly
              "Convergence" Newsletter
            </li>
            <li className="flex items-center">
              <span className="text-emerald-500 mr-2 font-bold">✓</span> Public Policy
              Tracker
            </li>
            <li className="flex items-center">
              <span className="text-emerald-500 mr-2 font-bold">✓</span> Limited Podcast
              Access
            </li>
          </ul>
        </div>

        {/* Tier 2: Professional (Highlighted) */}
        <div className="p-8 bg-white border-2 border-indigo-600 rounded-2xl shadow-xl relative transform md:-translate-y-4">
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-indigo-600 text-white px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wide">
            Most Popular
          </div>
          <h3 className="text-xl font-bold text-indigo-600 mb-2">Strategist</h3>
          <p className="text-slate-600 ty-body mb-6">
            Deep dives, data models & education.
          </p>
          <div className="mb-6">
            <span className="ty-h1 font-black text-slate-900">$49</span>
            <span className="text-slate-500">/month</span>
          </div>
          <button className="w-full py-3 bg-indigo-600 text-white font-bold rounded-lg hover:bg-indigo-700 transition mb-8 shadow-md">
            Start 14-Day Trial
          </button>
          <ul className="space-y-4 text-sm text-slate-700 font-medium">
            <li className="flex items-center">
              <span className="text-indigo-600 mr-2 font-bold">✓</span>{" "}
              <strong>All Observer features</strong>
            </li>
            <li className="flex items-center">
              <span className="text-indigo-600 mr-2 font-bold">✓</span> Full Economic
              Impact Models
            </li>
            <li className="flex items-center">
              <span className="text-indigo-600 mr-2 font-bold">✓</span> Unrestricted Case
              Study Library
            </li>
            <li className="flex items-center">
              <span className="text-indigo-600 mr-2 font-bold">✓</span> Webinar Archive
              Access
            </li>
            <li className="flex items-center">
              <span className="text-indigo-600 mr-2 font-bold">✓</span> 20% Off
              Masterclasses
            </li>
          </ul>
        </div>

        {/* Tier 3: Enterprise */}
        <div className="p-8 bg-slate-50 border border-slate-200 rounded-2xl shadow-sm">
          <h3 className="ty-h3 font-bold text-slate-900 mb-2">
            Enterprise
          </h3>
          <p className="text-slate-600 ty-body mb-6">
            For strategy teams & health systems.
          </p>
          <div className="mb-6">
            <span className="ty-h1 font-black text-slate-900">
              Custom
            </span>
          </div>
          <Link
            href="/advisory/contact"
            className="block w-full py-3 bg-indigo-600 text-white font-bold text-center rounded-lg hover:bg-indigo-700 transition mb-8"
          >
            Contact Sales
          </Link>
          <ul className="space-y-4 text-sm text-slate-600">
            <li className="flex items-center">
              <span className="text-slate-900 mr-2 font-bold">✓</span>{" "}
              <strong>Multi-seat Licenses</strong>
            </li>
            <li className="flex items-center">
              <span className="text-slate-900 mr-2 font-bold">✓</span> Custom API
              Access to Data
            </li>
            <li className="flex items-center">
              <span className="text-slate-900 mr-2 font-bold">✓</span> Quarterly
              Analyst Briefings
            </li>
            <li className="flex items-center">
              <span className="text-slate-900 mr-2 font-bold">✓</span> White-labeled
              Reports
            </li>
          </ul>
        </div>
      </div>

      {/* Social Proof with Logo Placeholders */}
      <div className="text-center pt-16 border-t border-slate-200 max-w-4xl mx-auto">
        <p className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-8">
          Trusted by Strategy Teams at
        </p>
        <div className="flex flex-wrap justify-center gap-12 opacity-40 grayscale items-center">
          <img
            src="https://via.placeholder.com/150x50/E5E7EB/111827?text=Cleveland+Clinic"
            alt="Cleveland Clinic"
            className="h-12 w-auto"
          />
          <img
            src="https://via.placeholder.com/150x50/E5E7EB/111827?text=Humana"
            alt="Humana"
            className="h-12 w-auto"
          />
          <img
            src="https://via.placeholder.com/150x50/E5E7EB/111827?text=Competitor+%231"
            alt="Competitor #1"
            className="h-12 w-auto"
          />
          <img
            src="https://via.placeholder.com/150x50/E5E7EB/111827?text=Oracle+Health"
            alt="Oracle Health"
            className="h-12 w-auto"
          />
        </div>
      </div>
    </div>
  );
}