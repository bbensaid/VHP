import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Developer API | Health Transformation Review",
  description: "Access HTR state performance data, HTI scores, and survey results via a structured JSON API. Authenticated with API keys.",
};

const BASE = "https://brain.htr.health";

const ENDPOINTS = [
  {
    method: "GET",
    path: "/api/v1/states",
    description: "List all 50-state HTR Performance Index profiles.",
    response: `{
  "data": [
    {
      "id": "vermont",
      "state_name": "Vermont",
      "performance_score": 82.4,
      "status": "Leading",
      "metrics": { ... },
      "narrative": { "summary": "..." }
    },
    ...
  ],
  "count": 50
}`,
  },
  {
    method: "GET",
    path: "/api/v1/states/{state_id}",
    description: "Single state profile. Use the lowercase state slug (e.g. vermont, california).",
    response: `{
  "data": {
    "id": "vermont",
    "state_name": "Vermont",
    "performance_score": 82.4,
    "status": "Leading",
    "metrics": {
      "policy":     { "vbpAdoption": 78, "telehealth": 91 },
      "economics":  { "spendingPerCapita": 9840, "insuranceCoverage": 95 },
      "technology": { "ehrAdoption": 88, "broadbandAccess": 74 },
      "clinical":   { "preventiveCare": 82, "readmissionRate": 14 },
      "equity":     { "racialEquityGap": 1.3, "sdohIntegration": 67 }
    },
    "narrative": { "summary": "..." }
  }
}`,
  },
  {
    method: "GET",
    path: "/api/v1/survey/results",
    description: "Aggregated, anonymised results from the current annual 'State of Healthcare Transformation' survey.",
    response: `{
  "data": [
    {
      "year": 2026,
      "title": "State of Healthcare Transformation 2026",
      "total_responses": 412,
      "avg_readiness": 3.2,
      "avg_ai_adoption": 2.9,
      "top_barrier": "workforce",
      "top_opportunity": "ai_analytics"
    }
  ]
}`,
  },
];

export default function DevelopersPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero */}
      <div className="bg-linear-to-br from-slate-900 to-slate-700 text-white py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <p className="text-slate-400 text-sm font-semibold uppercase tracking-widest mb-3">Developer API</p>
          <h1 className="text-4xl font-black mb-4">HTR Data API</h1>
          <p className="text-slate-300 text-lg max-w-2xl mb-6">
            Programmatic access to the HTR Performance Index, state health metrics, and annual survey results. Authenticated with API keys, returns structured JSON.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/account/api-keys"
              className="bg-white text-slate-900 font-bold px-5 py-2.5 rounded-xl text-sm hover:bg-slate-100 transition-colors"
            >
              Get an API Key
            </Link>
            <a
              href="#endpoints"
              className="border border-slate-500 text-slate-200 hover:bg-slate-700 font-semibold px-5 py-2.5 rounded-xl text-sm transition-colors"
            >
              Browse endpoints ↓
            </a>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-12 space-y-12">

        {/* Auth */}
        <section>
          <h2 className="text-xl font-black text-slate-900 mb-4">Authentication</h2>
          <div className="bg-white border border-slate-200 rounded-2xl p-6 space-y-4">
            <p className="text-slate-600 text-sm">
              All API requests must include your key in the <code className="bg-slate-100 px-1.5 py-0.5 rounded text-slate-800 font-mono text-xs">X-HTR-API-Key</code> request header.
            </p>
            <div className="bg-slate-900 rounded-xl p-4 overflow-x-auto">
              <pre className="text-emerald-400 text-sm font-mono whitespace-pre">{`curl https://brain.htr.health/api/v1/states \\
  -H "X-HTR-API-Key: htr_your_key_here"`}</pre>
            </div>
            <p className="text-slate-500 text-xs">
              Manage your keys at <Link href="/account/api-keys" className="text-indigo-600 hover:underline">/account/api-keys</Link>.
              Keys are hashed before storage — copy yours immediately after creation.
            </p>
          </div>
        </section>

        {/* Rate limits */}
        <section>
          <h2 className="text-xl font-black text-slate-900 mb-4">Rate Limits</h2>
          <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200">
                  <th className="text-left px-5 py-3 font-bold text-slate-600">Tier</th>
                  <th className="text-left px-5 py-3 font-bold text-slate-600">Requests / day</th>
                  <th className="text-left px-5 py-3 font-bold text-slate-600">Access</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                <tr>
                  <td className="px-5 py-3 font-semibold text-slate-800">Researcher</td>
                  <td className="px-5 py-3 text-slate-600">1,000</td>
                  <td className="px-5 py-3 text-slate-600">Professional plan+</td>
                </tr>
                <tr>
                  <td className="px-5 py-3 font-semibold text-slate-800">Enterprise</td>
                  <td className="px-5 py-3 text-slate-600">Unlimited</td>
                  <td className="px-5 py-3 text-slate-600">Advisory / custom</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-xs text-slate-500 mt-2">Counters reset daily at midnight UTC. Exceeded limits return HTTP 429.</p>
        </section>

        {/* Endpoints */}
        <section id="endpoints">
          <h2 className="text-xl font-black text-slate-900 mb-6">Endpoints</h2>
          <p className="text-slate-500 text-sm mb-6">
            Base URL: <code className="bg-slate-100 px-1.5 py-0.5 rounded text-slate-800 font-mono text-xs">{BASE}</code>
          </p>
          <div className="space-y-6">
            {ENDPOINTS.map(ep => (
              <div key={ep.path} className="bg-white border border-slate-200 rounded-2xl overflow-hidden">
                <div className="flex items-center gap-3 px-5 py-4 border-b border-slate-100">
                  <span className="bg-indigo-100 text-indigo-700 text-xs font-black px-2.5 py-1 rounded-lg font-mono">
                    {ep.method}
                  </span>
                  <code className="font-mono text-slate-800 text-sm font-semibold">{ep.path}</code>
                </div>
                <div className="px-5 py-4">
                  <p className="text-sm text-slate-600 mb-4">{ep.description}</p>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Example response</p>
                  <div className="bg-slate-900 rounded-xl p-4 overflow-x-auto">
                    <pre className="text-slate-300 text-xs font-mono whitespace-pre">{ep.response}</pre>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Errors */}
        <section>
          <h2 className="text-xl font-black text-slate-900 mb-4">Error codes</h2>
          <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200">
                  <th className="text-left px-5 py-3 font-bold text-slate-600">HTTP</th>
                  <th className="text-left px-5 py-3 font-bold text-slate-600">Meaning</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {[
                  ["401", "Missing or invalid API key"],
                  ["404", "State ID not found"],
                  ["429", "Daily rate limit exceeded"],
                  ["503", "Data temporarily unavailable"],
                ].map(([code, desc]) => (
                  <tr key={code}>
                    <td className="px-5 py-3 font-mono text-slate-800 font-semibold">{code}</td>
                    <td className="px-5 py-3 text-slate-600">{desc}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* CTA */}
        <div className="bg-indigo-50 border border-indigo-200 rounded-2xl p-8 text-center">
          <h3 className="font-black text-indigo-900 text-xl mb-2">Ready to build?</h3>
          <p className="text-indigo-700 text-sm mb-4">
            Create your API key and start pulling live health system data in minutes.
          </p>
          <Link
            href="/account/api-keys"
            className="inline-block bg-indigo-600 text-white font-bold px-6 py-3 rounded-xl text-sm hover:bg-indigo-700 transition-colors"
          >
            Get your API key →
          </Link>
        </div>

      </div>
    </div>
  );
}
