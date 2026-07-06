"use client";

import React, { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { useBrand } from "@/components/BrandContext";

// ─── Types ────────────────────────────────────────────────────────────────────

type Rating = "works" | "issues" | "broken";

interface FeedbackEntry {
  rating: Rating;
  note: string;
}

interface PageLink {
  label: string;
  href: string;
  note?: string;
  tag?: "subscriber" | "admin";
}

interface Section {
  id: string;
  title: string;
  emoji: string;
  color: string;
  /**
   * Which brand this section applies to. Omitted = shared across both domains.
   * "solutions" = only the Health Transformation Solutions domains (Advisory
   * Services is hidden on the Review domains — see lib/brand.ts / HomeSidebar).
   */
  brand?: "solutions" | "review";
  pages: PageLink[];
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const SECTIONS: Section[] = [
  {
    id: "home",
    title: "Home & Core",
    emoji: "🏠",
    color: "bg-slate-700",
    pages: [
      { label: "Home / Landing", href: "/", note: "Main entry point — hero, featured content" },
      { label: "The Wire (News Feed)", href: "/the-wire", note: "Real-time intelligence feed — scroll articles" },
      { label: "Trending Topics", href: "/trending-topics", note: "Hot topics ranked by activity" },
      { label: "Search", href: "/search", note: "Global search — try a query like 'Medicaid'" },
      { label: "My Library", href: "/library", note: "Saved articles & resources (login required; /saved redirects here)", tag: "subscriber" },
      { label: "Multimedia Hub", href: "/multimedia", note: "Videos & audio content hub" },
      { label: "Video Library", href: "/media/videos", note: "Video content listing" },
      { label: "System Vitals", href: "/system-vitals", note: "Live platform metrics ticker page" },
      { label: "Bed Capacity", href: "/bed-capacity", note: "Real-time hospital bed availability" },
      { label: "Changelog", href: "/changelog", note: "Platform release notes / what's new" },
      { label: "Site Map", href: "/site-map", note: "Public sitemap page" },
    ],
  },
  {
    id: "book",
    title: "The Book",
    emoji: "📖",
    color: "bg-amber-800",
    pages: [
      { label: "The Book — Landing", href: "/book", note: "'Transforming American Healthcare' book page" },
      { label: "Book → Listen (audio)", href: "/book/listen", note: "Narrated audio version of the book" },
    ],
  },
  {
    id: "intelligence",
    title: "Intelligence Dashboard",
    emoji: "📊",
    color: "bg-indigo-700",
    pages: [
      { label: "HTI Dashboard (main)", href: "/hti-dashboard", note: "Health Transformation Index — charts & gauges", tag: "subscriber" },
      { label: "Dashboard → State Picker", href: "/dashboard", note: "Select a state to drill in", tag: "subscriber" },
      { label: "Dashboard → Vermont", href: "/dashboard/vermont", note: "Vermont state detail view (dynamic [state] route)", tag: "subscriber" },
      { label: "Dashboard → Vermont Hospitals", href: "/dashboard/vermont/hospitals", note: "Hospital list for Vermont", tag: "subscriber" },
      { label: "Dashboard → NVRH Hospital", href: "/dashboard/vermont/hospitals/nvrh", note: "Northeastern Vermont Regional Hospital detail", tag: "subscriber" },
      { label: "Dashboard → California", href: "/dashboard/california", note: "California state detail view (dynamic [state] route)", tag: "subscriber" },
      { label: "Dashboard → Compare States", href: "/dashboard/compare", note: "Side-by-side state comparison", tag: "subscriber" },
      { label: "Dashboard → Simulator", href: "/dashboard/simulator", note: "Dashboard-integrated scenario simulator", tag: "subscriber" },
      { label: "Compare States (standalone)", href: "/compare-states", note: "State comparison entry page" },
      { label: "HTR Index Methodology", href: "/htr-index", note: "How the index is calculated" },
      { label: "Transformation Friction Index", href: "/transformation-friction-index", note: "Friction scoring methodology" },
      { label: "Investment Tracker", href: "/investment-tracker", note: "Healthcare investment trends" },
      { label: "Impact Simulation", href: "/impact-simulation", note: "Simulate policy impact" },
    ],
  },
  {
    id: "research",
    title: "Research Lab",
    emoji: "🔬",
    color: "bg-violet-700",
    pages: [
      { label: "Research Lab — Hub", href: "/research-lab", note: "Overview of all lab benches & tools" },
      { label: "Lab → Interoperability & Clinical", href: "/research-lab/interoperability", note: "FHIR validator, CDS Hooks, HCC risk stratification", tag: "subscriber" },
      { label: "Lab → VBC & Clinical Quality", href: "/research-lab/vbc-clinical-quality", note: "Value-based care & clinical quality tools", tag: "subscriber" },
      { label: "Lab → Payment Models", href: "/research-lab/payment-models", note: "APM design, MSSP/ACO REACH, global budget", tag: "subscriber" },
      { label: "Lab → Population & Equity", href: "/research-lab/population-equity", note: "Markov chains, SIR dynamics, disparity analysis", tag: "subscriber" },
      { label: "Lab → Policy & Quality", href: "/research-lab/policy-quality", note: "1115 waiver, HEDIS, CMS Star Ratings", tag: "subscriber" },
      { label: "Lab → Technology & AI", href: "/research-lab/technology-ai", note: "Digital health benchmarking, AI analytics", tag: "subscriber" },
      { label: "Lab → Knowledge Workspace", href: "/research-lab/knowledge-workspace", note: "Save & share analytical outputs", tag: "subscriber" },
    ],
  },
  {
    id: "simulators",
    title: "Simulators & Tools",
    emoji: "⚙️",
    color: "bg-teal-700",
    pages: [
      { label: "HTR Simulator", href: "/htr-simulator", note: "Interactive health transformation scenarios" },
      { label: "AHEAD Model", href: "/ahead-model", note: "All-Payer Claims Database explorer" },
      { label: "Medicaid Eligibility Simulator", href: "/medicaid-eligibility-simulator", note: "Test eligibility scenarios" },
      { label: "AI Analyst Chat", href: "/chat", note: "Full-page AI chat interface", tag: "subscriber" },
    ],
  },
  {
    id: "clinical",
    title: "Clinical Transformation",
    emoji: "🩺",
    color: "bg-cyan-700",
    pages: [
      { label: "Clinical — Overview", href: "/clinical", note: "All clinical sub-topics" },
      { label: "Clinical → Genomics", href: "/clinical/genomics", note: "Precision genomics coverage" },
      { label: "Clinical → Population Health", href: "/clinical/population", note: "Population health models" },
      { label: "Clinical → Virtual Care", href: "/clinical/virtual", note: "Telehealth & virtual care" },
      { label: "Clinical → Hospital at Home", href: "/clinical/hah", note: "HAH program analysis" },
      { label: "Clinical → Precision Medicine", href: "/clinical/precision", note: "Precision medicine landscape" },
    ],
  },
  {
    id: "economics",
    title: "Health Economics",
    emoji: "💰",
    color: "bg-emerald-700",
    pages: [
      { label: "Economics — Overview", href: "/economics", note: "All economics sub-topics" },
      { label: "Economics → Investment", href: "/economics/investment", note: "Healthcare investment trends" },
      { label: "Economics → Value-Based Care", href: "/economics/value", note: "Value frameworks & outcomes" },
      { label: "Economics → Cost-Effectiveness", href: "/economics/cea", note: "CEA methodology & tools" },
      { label: "Economics → Market Dynamics", href: "/economics/market", note: "Market structure & competition" },
    ],
  },
  {
    id: "technology",
    title: "Technology",
    emoji: "💻",
    color: "bg-blue-700",
    pages: [
      { label: "Technology — Overview", href: "/technology", note: "All technology sub-topics" },
      { label: "Technology → AI & ML", href: "/technology/ai", note: "AI in healthcare landscape" },
      { label: "Technology → Security", href: "/technology/security", note: "Cybersecurity & HIPAA" },
      { label: "Technology → Digital Health", href: "/technology/digital", note: "Digital health innovation" },
      { label: "Technology → Workflow", href: "/technology/workflow", note: "Clinical workflow automation" },
    ],
  },
  {
    id: "equity",
    title: "Health Equity",
    emoji: "⚖️",
    color: "bg-rose-700",
    pages: [
      { label: "Equity — Overview", href: "/equity", note: "All equity sub-topics" },
      { label: "Equity → Access", href: "/equity/access", note: "Healthcare access barriers" },
      { label: "Equity → SDOH", href: "/equity/sdoh", note: "Social determinants of health" },
      { label: "Equity → Algorithmic Bias", href: "/equity/bias", note: "Bias in clinical algorithms" },
    ],
  },
  {
    id: "operations",
    title: "Operations",
    emoji: "🏥",
    color: "bg-orange-700",
    pages: [
      { label: "Operations — Overview", href: "/operations", note: "All operations sub-topics" },
      { label: "Operations → Workforce", href: "/operations/workforce", note: "Staffing, burnout, retention" },
      { label: "Operations → Compliance", href: "/operations/compliance", note: "Regulatory compliance tools" },
      { label: "Operations → Revenue Cycle", href: "/operations/revenue-cycle", note: "RCM & billing analytics" },
      { label: "Operations → Supply Chain", href: "/operations/supply-chain", note: "Supply chain resilience" },
      { label: "Operations → Payer Networks", href: "/operations/payer-network", note: "Payer network analysis" },
    ],
  },
  {
    id: "policy",
    title: "Policy",
    emoji: "📜",
    color: "bg-yellow-700",
    pages: [
      { label: "Policy — Overview", href: "/policy", note: "All policy sub-topics" },
      { label: "Policy → Feasibility", href: "/policy/feasibility", note: "Policy feasibility scoring" },
      { label: "Policy → Global", href: "/policy/global", note: "Global health policy comparisons" },
      { label: "Policy → Mandates", href: "/policy/mandates", note: "Federal & state mandates" },
      { label: "Policy → Regulation", href: "/policy/regulation", note: "Regulatory landscape" },
    ],
  },
  {
    id: "states",
    title: "State Profiles & Programs",
    emoji: "🗺️",
    color: "bg-lime-700",
    pages: [
      { label: "States — Directory", href: "/states", note: "All state profiles" },
      { label: "State → Vermont", href: "/states/vermont", note: "Vermont profile (dynamic [state] route)" },
      { label: "State → California", href: "/states/california", note: "California profile (dynamic [state] route)" },
      { label: "State → Oregon", href: "/states/oregon", note: "Oregon profile (dynamic [state] route)" },
      { label: "California CalAIM", href: "/california-calaim", note: "California's CalAIM initiative" },
      { label: "California CalAIM Simulator", href: "/california-calaim/simulator", note: "Simulate CalAIM scenarios" },
      { label: "Oregon CCO", href: "/oregon-cco", note: "Oregon Coordinated Care Organizations" },
      { label: "Oregon CCO Simulator", href: "/oregon-cco/simulator", note: "Simulate Oregon CCO scenarios" },
    ],
  },
  {
    id: "vermont",
    title: "Vermont Programs",
    emoji: "🍁",
    color: "bg-green-800",
    pages: [
      { label: "Vermont ACT 167", href: "/vermont-act-167", note: "Vermont's landmark health reform law" },
      { label: "Vermont ACT 167 Simulator", href: "/vermont-act-167/simulator", note: "Simulate Act 167 outcomes" },
      { label: "Vermont ACT 68", href: "/vermont-act-68", note: "Act 68 overview & analysis" },
      { label: "Vermont ACT 68 Simulator", href: "/vermont-act-68/simulator", note: "Simulate Act 68 outcomes" },
      { label: "Vermont Medicaid", href: "/vermont-medicaid", note: "Vermont Medicaid program overview" },
      { label: "Vermont Blueprint for Health", href: "/vermont-blueprint", note: "Blueprint program overview" },
      { label: "Vermont RHT Program", href: "/vermont-rht-program", note: "Regional Health Transformation program" },
      { label: "Vermont Designated Agencies", href: "/vermont-designated-agencies", note: "DA network overview" },
      { label: "Vermont SASH", href: "/vermont-sash", note: "Support & Services at Home" },
      { label: "Vermont VCCI", href: "/vermont-vcci", note: "Vermont Chronic Care Initiative" },
      { label: "Vermont SDOH", href: "/vermont-sdoh", note: "Social determinants of health in Vermont" },
      { label: "Vermont Legislative Resources", href: "/vermont-legislative-resources", note: "Legislative reference hub" },
    ],
  },
  {
    id: "academy",
    title: "Academy",
    emoji: "🎓",
    color: "bg-purple-700",
    pages: [
      { label: "Academy — Hub", href: "/academy", note: "Main academy landing" },
      { label: "Academy → Getting Started", href: "/academy/getting-started", note: "New-user orientation" },
      { label: "Academy → Getting Started: Research Lab", href: "/academy/getting-started/research-lab", note: "Research Lab orientation lesson" },
      { label: "Academy → Personalized Learning", href: "/academy/personalized-learning", note: "AI-curated learning path" },
      { label: "Academy → Courses", href: "/academy/courses", note: "All course listings" },
      { label: "Academy → Tracks", href: "/academy/tracks", note: "Curated learning tracks" },
      { label: "Academy → Faculty", href: "/academy/faculty", note: "Instructor / faculty directory" },
      { label: "Academy → Case Studies", href: "/academy/case-studies", note: "Real-world case study library" },
      { label: "Academy → Webinars", href: "/academy/webinars", note: "Live & recorded webinars" },
      { label: "Academy → Glossary", href: "/academy/glossary", note: "Healthcare reform terminology" },
      { label: "Academy → Medicaid", href: "/academy/medicaid", note: "Medicaid-specific curriculum" },
      { label: "Academy → Medicaid Glossary", href: "/academy/medicaid/glossary", note: "Medicaid-specific terms" },
      { label: "My Courses (Account)", href: "/account/courses", note: "Enrolled courses progress tracker" },
    ],
  },
  {
    id: "advisory",
    title: "Advisory Services",
    emoji: "🤝",
    color: "bg-sky-700",
    brand: "solutions", // Hidden on the Review domains — Solutions-only feature.
    pages: [
      { label: "Advisory — Hub", href: "/advisory", note: "Pro-bono advisory services overview" },
      { label: "Advisory → Services Menu", href: "/advisory/services", note: "Full services list" },
      { label: "Advisory → Consulting", href: "/advisory/consulting", note: "Consulting engagement model" },
      { label: "Advisory → Financial Audit", href: "/advisory/financial-audit", note: "Financial health audit service" },
      { label: "Advisory → Independent Review", href: "/advisory/independent-review", note: "Third-party review offering" },
      { label: "Advisory → IT Consulting", href: "/advisory/it-consulting", note: "Health IT advisory" },
      { label: "Advisory → Regulatory", href: "/advisory/regulatory", note: "Regulatory navigation support" },
      { label: "Advisory → Research", href: "/advisory/research", note: "Custom research offering" },
      { label: "Advisory → Training", href: "/advisory/training", note: "Custom training programs" },
      { label: "Advisory → Reports", href: "/advisory/reports", note: "Published advisory reports" },
      { label: "Advisory → Approach", href: "/advisory/approach", note: "Our methodology" },
      { label: "Advisory → Capability Assessment", href: "/advisory/capability-assessment", note: "Self-assessment tool" },
      { label: "Advisory → Contact", href: "/advisory/contact", note: "Advisory engagement contact form" },
      { label: "Advisory Hub (subscriber)", href: "/advisory-hub", note: "Subscriber advisory portal", tag: "subscriber" },
    ],
  },
  {
    id: "connect",
    title: "Connect",
    emoji: "🔗",
    color: "bg-fuchsia-700",
    pages: [
      { label: "Connect — Hub", href: "/connect", note: "Community connection hub" },
      { label: "Connect → Directory", href: "/connect/directory", note: "Member directory" },
      { label: "Connect → Forums", href: "/connect/forums", note: "Discussion forums" },
      { label: "Connect → Ask an Expert", href: "/connect/ask", note: "Expert Q&A submission" },
      { label: "Connect → Alerts", href: "/connect/alerts", note: "Notification preferences" },
      { label: "Connect → Toolkits", href: "/connect/toolkits", note: "Downloadable toolkits" },
      { label: "Connect → Apply (membership)", href: "/connect/apply", note: "Apply for membership tier" },
      { label: "Connect → Office Hours", href: "/connect/register-office-hours", note: "Register for office hours" },
      { label: "Connect Hub (redirects → /connect)", href: "/connect-hub", note: "Redirects to /connect" },
    ],
  },
  {
    id: "community",
    title: "Community",
    emoji: "💬",
    color: "bg-pink-700",
    pages: [
      { label: "Community — Feed", href: "/community", note: "Main community discussion feed" },
      { label: "Community → New Post", href: "/community/new", note: "Create a new discussion post" },
    ],
  },
  {
    id: "account",
    title: "Account & Profile",
    emoji: "👤",
    color: "bg-gray-700",
    pages: [
      { label: "Account — Overview", href: "/account", note: "Account dashboard" },
      { label: "Account → Profile", href: "/account/profile", note: "Edit name, bio, avatar" },
      { label: "Account → Subscription", href: "/account/subscription", note: "Plan & subscription details" },
      { label: "Account → Billing", href: "/account/billing", note: "Payment history & invoices" },
      { label: "Account → Bookmarks", href: "/account/bookmarks", note: "Saved articles & resources" },
      { label: "Account → My Courses", href: "/account/courses", note: "Enrolled courses & progress" },
      { label: "Account → Referrals", href: "/account/referrals", note: "Referral program & codes" },
      { label: "Account → API Keys", href: "/account/api-keys", note: "Developer API key management" },
    ],
  },
  {
    id: "admin",
    title: "Admin (Admin Role Required)",
    emoji: "🔐",
    color: "bg-red-800",
    pages: [
      { label: "Admin — Dashboard", href: "/admin", note: "Admin overview", tag: "admin" },
      { label: "Admin → Users", href: "/admin/users", note: "User management table", tag: "admin" },
      { label: "Admin → Role Changes", href: "/admin/role-changes", note: "Pending role elevation requests", tag: "admin" },
      { label: "Admin → Revenue", href: "/admin/revenue", note: "Revenue & subscription analytics", tag: "admin" },
      { label: "Admin → Analytics", href: "/admin/analytics", note: "Platform usage analytics", tag: "admin" },
      { label: "Admin → Content Ingest", href: "/admin/ingest", note: "Sanity/CMS content pipeline", tag: "admin" },
      { label: "Admin → Access Codes", href: "/admin/access-codes", note: "Beta access code management", tag: "admin" },
    ],
  },
  {
    id: "about",
    title: "About & Legal",
    emoji: "ℹ️",
    color: "bg-stone-700",
    pages: [
      { label: "Mission", href: "/mission", note: "HTR mission statement" },
      { label: "Values", href: "/values", note: "Organizational values" },
      { label: "About → Framework", href: "/about/framework", note: "Analytical framework" },
      { label: "About → Methodology", href: "/about/methodology", note: "Research methodology" },
      { label: "FAQ", href: "/faq", note: "Frequently asked questions" },
      { label: "Pricing", href: "/pricing", note: "Subscription plans & pricing" },
      { label: "Subscribe", href: "/subscribe", note: "Subscription sign-up flow" },
      { label: "Upgrade", href: "/upgrade", note: "Plan upgrade prompt" },
      { label: "Developers", href: "/developers", note: "Developer / API documentation" },
      { label: "Privacy Policy", href: "/privacy", note: "Privacy policy" },
      { label: "Terms of Service", href: "/terms", note: "Terms of service" },
      { label: "Disclaimer", href: "/disclaimer", note: "Legal / not-medical-advice disclaimer" },
      { label: "Billing Policy", href: "/billing-policy", note: "Billing & refund policy" },
    ],
  },
  {
    id: "auth",
    title: "Auth Flows",
    emoji: "🔑",
    color: "bg-zinc-700",
    pages: [
      { label: "Login", href: "/login", note: "Email/password login (+ Skip option for access-code users)" },
      { label: "Sign Up", href: "/signup", note: "New account registration" },
      { label: "Forgot Password", href: "/forgot-password", note: "Password reset request" },
      { label: "Reset Password", href: "/reset-password", note: "Password reset form (needs token)" },
      { label: "Onboarding", href: "/onboarding", note: "Post-signup onboarding flow" },
      { label: "Setup", href: "/setup", note: "Initial account/profile setup" },
      { label: "Welcome / Role Picker", href: "/welcome", note: "First-visit role selection + Skip" },
      { label: "Beta Gate", href: "/beta", note: "Domain-scoped access code entry screen" },
    ],
  },
  {
    id: "survey",
    title: "Survey",
    emoji: "📋",
    color: "bg-amber-700",
    pages: [
      { label: "Survey — Form", href: "/survey", note: "Beta tester survey form" },
      { label: "Survey → Results", href: "/survey/results", note: "Survey results overview" },
      { label: "Survey → Thank You", href: "/survey/thank-you", note: "Post-submission confirmation" },
    ],
  },
];

// ─── Rating config ─────────────────────────────────────────────────────────────

const RATINGS = [
  { value: "works" as Rating,  label: "Works",  emoji: "✅", bg: "bg-emerald-50", border: "border-emerald-400", text: "text-emerald-700" },
  { value: "issues" as Rating, label: "Issues", emoji: "⚠️", bg: "bg-amber-50",   border: "border-amber-400",   text: "text-amber-700"   },
  { value: "broken" as Rating, label: "Broken", emoji: "❌", bg: "bg-red-50",     border: "border-red-400",     text: "text-red-700"     },
] as const;

const STORAGE_KEY = "htr_tester_feedback_v1";

// ─── Helpers ──────────────────────────────────────────────────────────────────

function loadFeedback(): Record<string, FeedbackEntry> {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "{}");
  } catch {
    return {};
  }
}

function saveFeedback(data: Record<string, FeedbackEntry>) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}


// ─── Sub-components ───────────────────────────────────────────────────────────

const TAG_STYLES = {
  subscriber: "bg-indigo-100 text-indigo-700 border border-indigo-200",
  admin:      "bg-red-100   text-red-700   border border-red-200",
};

function Tag({ tag }: { tag: "subscriber" | "admin" }) {
  return (
    <span className={`text-[10px] font-bold uppercase tracking-widest px-1.5 py-0.5 rounded ${TAG_STYLES[tag]}`}>
      {tag}
    </span>
  );
}

interface PageCardProps {
  page: PageLink;
  entry: FeedbackEntry | undefined;
  onRate: (href: string, rating: Rating) => void;
  onNote: (href: string, note: string) => void;
}

function PageCard({ page, entry, onRate, onNote }: PageCardProps) {
  const [showNote, setShowNote] = useState(false);
  const activeRating = RATINGS.find((r) => r.value === entry?.rating);

  return (
    <div
      className={`flex flex-col gap-2 p-3 rounded-xl border-2 transition-all ${
        activeRating
          ? `${activeRating.bg} ${activeRating.border}`
          : "bg-white border-slate-200 hover:border-slate-300"
      }`}
    >
      {/* Top row: label + link + tag */}
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-center gap-2 flex-wrap min-w-0">
          <Link
            href={page.href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-semibold text-slate-800 hover:text-indigo-700 hover:underline transition-colors truncate"
          >
            {page.label}
          </Link>
          {page.tag && <Tag tag={page.tag} />}
        </div>
        <span className="text-[11px] font-mono text-slate-400 shrink-0">{page.href}</span>
      </div>

      {/* Description */}
      {page.note && (
        <p className="text-xs text-slate-500 leading-snug">{page.note}</p>
      )}

      {/* Rating buttons */}
      <div className="flex items-center gap-1.5 mt-1">
        {RATINGS.map((r) => (
          <button
            key={r.value}
            onClick={() => {
              onRate(page.href, r.value);
              if (r.value !== "works") setShowNote(true);
            }}
            title={r.label}
            className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-bold border transition-all ${
              entry?.rating === r.value
                ? `${r.bg} ${r.border} ${r.text} shadow-sm scale-105`
                : "bg-slate-50 border-slate-200 text-slate-500 hover:bg-slate-100"
            }`}
          >
            <span>{r.emoji}</span>
            <span>{r.label}</span>
          </button>
        ))}

        {/* Note toggle */}
        {entry?.rating && (
          <button
            onClick={() => setShowNote((v) => !v)}
            className="ml-auto text-[11px] text-slate-400 hover:text-slate-600 underline transition-colors"
          >
            {showNote ? "hide note" : entry?.note ? "edit note" : "add note"}
          </button>
        )}
      </div>

      {/* Note field */}
      {showNote && entry?.rating && (
        <textarea
          autoFocus
          rows={2}
          value={entry?.note ?? ""}
          onChange={(e) => onNote(page.href, e.target.value)}
          placeholder="Describe the issue, what you expected, what you saw…"
          className="w-full text-xs border border-slate-300 rounded-lg px-3 py-2 focus:outline-none focus:border-indigo-400 resize-none bg-white text-slate-700 placeholder:text-slate-400"
        />
      )}
    </div>
  );
}

// ─── Main page ────────────────────────────────────────────────────────────────

type SendState = "idle" | "sending" | "sent" | "error";

export default function TesterPage() {
  const { brand, config } = useBrand();

  // Only show sections that apply to the current domain. A section with no
  // `brand` is shared; one tagged "solutions"/"review" shows only on that
  // domain — so Review testers never see Advisory, and vice versa. This mirrors
  // the real nav filtering in HomeSidebar / Header / Footer.
  const sections = React.useMemo(
    () => SECTIONS.filter((s) => !s.brand || s.brand === brand),
    [brand]
  );

  const [feedback, setFeedback] = useState<Record<string, FeedbackEntry>>({});
  const [filter, setFilter]     = useState("");
  const [openSections, setOpenSections] = useState<Record<string, boolean>>(
    Object.fromEntries(sections.map((s) => [s.id, true]))
  );
  const [testerName, setTesterName] = useState("");
  const [sendState, setSendState]   = useState<SendState>("idle");
  const [showNamePrompt, setShowNamePrompt] = useState(false);

  // Load from localStorage on mount (including saved tester name)
  useEffect(() => {
    setFeedback(loadFeedback());
    const saved = localStorage.getItem("htr_tester_name");
    if (saved) setTesterName(saved);
  }, []);

  const handleRate = useCallback((href: string, rating: Rating) => {
    setFeedback((prev) => {
      const next = { ...prev, [href]: { rating, note: prev[href]?.note ?? "" } };
      saveFeedback(next);
      return next;
    });
  }, []);

  const handleNote = useCallback((href: string, note: string) => {
    setFeedback((prev) => {
      const next = { ...prev, [href]: { ...prev[href], note } };
      saveFeedback(next);
      return next;
    });
  }, []);

  const handleClearAll = () => {
    if (!confirm("Clear all ratings and notes? This cannot be undone.")) return;
    localStorage.removeItem(STORAGE_KEY);
    setFeedback({});
  };

  const handleSend = async () => {
    if (!testerName.trim()) { setShowNamePrompt(true); return; }
    setSendState("sending");
    try {
      const res = await fetch("/api/tester-report", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ testerName: testerName.trim(), feedback }),
      });
      if (!res.ok) throw new Error("send failed");
      localStorage.setItem("htr_tester_name", testerName.trim());
      setSendState("sent");
      setTimeout(() => setSendState("idle"), 4000);
    } catch {
      setSendState("error");
      setTimeout(() => setSendState("idle"), 4000);
    }
  };

  // Stats
  const totalPages = sections.reduce((a, s) => a + s.pages.length, 0);
  const rated  = Object.keys(feedback).length;
  const works  = Object.values(feedback).filter((f) => f.rating === "works").length;
  const issues = Object.values(feedback).filter((f) => f.rating === "issues").length;
  const broken = Object.values(feedback).filter((f) => f.rating === "broken").length;
  const pct    = Math.round((rated / totalPages) * 100);

  // Filter
  const q = filter.toLowerCase();
  const filteredSections = sections.map((s) => ({
    ...s,
    pages: s.pages.filter(
      (p) => !q || p.label.toLowerCase().includes(q) || p.href.toLowerCase().includes(q) || (p.note ?? "").toLowerCase().includes(q)
    ),
  })).filter((s) => s.pages.length > 0);

  const toggleSection = (id: string) =>
    setOpenSections((prev) => ({ ...prev, [id]: !prev[id] }));
  const expandAll  = () => setOpenSections(Object.fromEntries(sections.map((s) => [s.id, true])));
  const collapseAll = () => setOpenSections(Object.fromEntries(sections.map((s) => [s.id, false])));

  return (
    <div className="min-h-screen bg-slate-50">

      {/* ── Sticky header ── */}
      <div className="sticky top-0 z-20 bg-white border-b border-slate-200 shadow-sm">
        <div className="max-w-6xl mx-auto px-6 py-4 space-y-3">

          {/* Title row */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex-1 min-w-0">
              <h1 className="text-xl font-black text-slate-900 tracking-tight">🧪 Beta Tester Navigation Hub</h1>
              <p className="text-xs text-slate-500 mt-0.5">
                Testing <span className="font-bold text-slate-700">{config.displayName}</span>
                {" "}({brand}) · {totalPages} pages · {sections.length} sections · All links open in a new tab
              </p>
            </div>
            <div className="flex items-center gap-2 flex-wrap">
              <button onClick={expandAll}   className="text-xs px-3 py-1.5 rounded-lg border border-slate-200 hover:bg-slate-100 text-slate-600 font-semibold transition-colors">Expand all</button>
              <button onClick={collapseAll} className="text-xs px-3 py-1.5 rounded-lg border border-slate-200 hover:bg-slate-100 text-slate-600 font-semibold transition-colors">Collapse all</button>
              {rated > 0 && (
                <button onClick={handleClearAll} className="text-xs px-3 py-1.5 rounded-lg border border-red-200 hover:bg-red-50 text-red-500 font-semibold transition-colors">
                  Clear all
                </button>
              )}
            </div>
          </div>

          {/* Name + Send row */}
          <div className="flex items-center gap-2 flex-wrap">
            <div className="relative flex-1 min-w-[180px] max-w-xs">
              <input
                type="text"
                value={testerName}
                onChange={(e) => { setTesterName(e.target.value); setShowNamePrompt(false); }}
                placeholder="Your name (required to submit)"
                className={`w-full px-3 py-2 text-sm border rounded-xl focus:outline-none focus:border-indigo-400 bg-white ${showNamePrompt ? "border-red-400 placeholder:text-red-400" : "border-slate-300"}`}
              />
              {showNamePrompt && (
                <p className="absolute -bottom-4 left-0 text-[10px] text-red-500 font-semibold">Please enter your name first</p>
              )}
            </div>
            <button
              onClick={handleSend}
              disabled={rated === 0 || sendState === "sending"}
              className={`text-xs px-4 py-2 rounded-xl font-bold transition-colors whitespace-nowrap ${
                sendState === "sent"    ? "bg-emerald-600 text-white" :
                sendState === "error"   ? "bg-red-600 text-white" :
                sendState === "sending" ? "bg-indigo-400 text-white cursor-wait" :
                rated === 0             ? "bg-slate-200 text-slate-400 cursor-not-allowed" :
                                          "bg-indigo-600 hover:bg-indigo-700 text-white"
              }`}
            >
              {sendState === "sending" ? "Sending…" :
               sendState === "sent"    ? "✓ Report sent!" :
               sendState === "error"   ? "✗ Failed — try again" :
               "📧 Submit feedback report"}
            </button>
            {sendState === "sent" && (
              <span className="text-xs text-emerald-600 font-semibold">Delivered to the HTR team</span>
            )}
          </div>

          {/* Progress bar + stats */}
          <div className="space-y-1.5">
            <div className="flex items-center gap-3 text-xs font-semibold">
              <span className="text-slate-600">{rated}/{totalPages} rated ({pct}%)</span>
              <span className="text-emerald-600">✅ {works} works</span>
              <span className="text-amber-600">⚠️ {issues} issues</span>
              <span className="text-red-600">❌ {broken} broken</span>
            </div>
            <div className="h-2 bg-slate-100 rounded-full overflow-hidden flex">
              {works  > 0 && <div className="bg-emerald-500 h-full transition-all" style={{ width: `${(works  / totalPages) * 100}%` }} />}
              {issues > 0 && <div className="bg-amber-400 h-full transition-all"   style={{ width: `${(issues / totalPages) * 100}%` }} />}
              {broken > 0 && <div className="bg-red-500 h-full transition-all"     style={{ width: `${(broken / totalPages) * 100}%` }} />}
            </div>
          </div>

          {/* Filter */}
          <input
            type="text"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            placeholder="Filter by page name, path, or description…"
            className="w-full px-4 py-2 text-sm border border-slate-300 rounded-xl focus:outline-none focus:border-indigo-400 bg-slate-50"
          />
        </div>
      </div>

      {/* ── Callout ── */}
      <div className="max-w-6xl mx-auto px-6 pt-5">
        <div className="bg-indigo-50 border border-indigo-200 rounded-xl p-4 text-sm text-indigo-800 leading-relaxed">
          <strong>How to use:</strong> Click a page link to open it in a new tab. Come back here and rate it{" "}
          <strong>✅ Works · ⚠️ Issues · ❌ Broken</strong>. Add a note for anything that needs attention.
          Ratings auto-save in your browser. When done, enter your name above and hit <strong>Submit feedback report</strong> — your scores and notes will be emailed directly to the HTR team as a formatted report.
        </div>
      </div>

      {/* ── Sections ── */}
      <div className="max-w-6xl mx-auto px-6 py-6 space-y-4">
        {filteredSections.map((section) => {
          const sWorks  = section.pages.filter((p) => feedback[p.href]?.rating === "works").length;
          const sIssues = section.pages.filter((p) => feedback[p.href]?.rating === "issues").length;
          const sBroken = section.pages.filter((p) => feedback[p.href]?.rating === "broken").length;
          const sRated  = sWorks + sIssues + sBroken;

          return (
            <div key={section.id} className="rounded-xl border border-slate-200 overflow-hidden shadow-sm">
              <button
                onClick={() => toggleSection(section.id)}
                className={`w-full flex items-center justify-between px-5 py-3.5 text-left ${section.color} text-white`}
              >
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-lg">{section.emoji}</span>
                  <span className="font-black text-base tracking-tight">{section.title}</span>
                  <span className="text-white/60 text-xs font-semibold">
                    {section.pages.length} page{section.pages.length !== 1 ? "s" : ""}
                  </span>
                  {/* Per-section mini scoreboard */}
                  {sRated > 0 && (
                    <span className="flex items-center gap-1.5 bg-black/20 rounded-full px-2.5 py-0.5 text-xs font-bold">
                      {sWorks  > 0 && <span>✅{sWorks}</span>}
                      {sIssues > 0 && <span>⚠️{sIssues}</span>}
                      {sBroken > 0 && <span>❌{sBroken}</span>}
                    </span>
                  )}
                </div>
                <span className="text-white/70 text-sm">{openSections[section.id] !== false ? "▲" : "▼"}</span>
              </button>

              {openSections[section.id] !== false && (
                <div className="bg-slate-50 p-4 grid grid-cols-1 md:grid-cols-2 gap-3">
                  {section.pages.map((page) => (
                    <PageCard
                      key={page.href}
                      page={page}
                      entry={feedback[page.href]}
                      onRate={handleRate}
                      onNote={handleNote}
                    />
                  ))}
                </div>
              )}
            </div>
          );
        })}

        {filteredSections.length === 0 && (
          <div className="text-center py-16 text-slate-400 text-sm">No pages match &quot;{filter}&quot;</div>
        )}
      </div>

      <div className="max-w-6xl mx-auto px-6 pb-10 text-center text-xs text-slate-400">
        HTR Beta Tester Hub — internal use only — ratings saved locally in your browser
      </div>
    </div>
  );
}
