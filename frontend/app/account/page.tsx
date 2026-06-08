import { requireAuth } from "@/lib/auth";
import Link from "next/link";
import { getUserCertifications, getUserEnrollments } from "@/lib/db/academy";

export default async function AccountPage() {
  const user = await requireAuth("/account");

  const [enrollments, certifications] = await Promise.all([
    getUserEnrollments(user.id),
    getUserCertifications(user.id),
  ]);

  const roleBadge: Record<string, string> = {
    admin: "bg-purple-100 text-purple-700",
    advisory: "bg-rose-100 text-rose-700",
    professional: "bg-amber-100 text-amber-700",
    student: "bg-blue-100 text-blue-700",
    subscriber: "bg-indigo-100 text-indigo-700",
    free: "bg-slate-100 text-slate-600",
  };

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-black text-slate-900">My Account</h1>
          <p className="text-slate-500 mt-1">Manage your profile, subscription, and learning progress.</p>
        </div>

        {/* Profile card */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 mb-6 flex items-center gap-6">
          <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center text-2xl font-black text-indigo-600">
            {(user.fullName ?? user.email)?.[0]?.toUpperCase() ?? "?"}
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-3 flex-wrap">
              <h2 className="ty-h3 font-black text-slate-900">{user.fullName ?? "No name set"}</h2>
              <span className={`text-xs font-bold uppercase px-2.5 py-1 rounded-full ${roleBadge[user.role] ?? roleBadge.free}`}>
                {user.role}
              </span>
            </div>
            <p className="text-slate-500 text-sm mt-0.5">{user.email}</p>
          </div>
          <Link href="/account/profile"
            className="text-sm font-semibold text-indigo-600 hover:text-indigo-800 border border-indigo-200 rounded-lg px-4 py-2 hover:bg-indigo-50 transition-colors">
            Edit Profile
          </Link>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
          {[
            { label: "Plan", value: user.plan.charAt(0).toUpperCase() + user.plan.slice(1), href: "/account/subscription" },
            { label: "Enrolled Courses", value: enrollments.length.toString(), href: "/account/courses" },
            { label: "Certifications", value: certifications.length.toString(), href: "/account/courses" },
          ].map((stat) => (
            <Link key={stat.label} href={stat.href}
              className="bg-white rounded-xl border border-slate-200 shadow-sm p-5 hover:border-indigo-300 hover:shadow-md transition-all">
              <div className="text-3xl font-black text-slate-900">{stat.value}</div>
              <div className="text-sm text-slate-500 mt-0.5">{stat.label}</div>
            </Link>
          ))}
        </div>

        {/* Quick links */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[
            { href: "/account/profile",      label: "Edit Profile",     desc: "Update name, bio, and organization" },
            { href: "/account/subscription", label: "Subscription",     desc: "View your current plan and usage" },
            { href: "/account/billing",      label: "Billing",          desc: "Manage payment methods and invoices" },
            { href: "/account/courses",    label: "My Courses",       desc: "Track progress and view certifications" },
            { href: "/account/referrals",   label: "Referrals",        desc: "Share HTR and earn free months" },
            { href: "/account/api-keys",   label: "API Keys",         desc: "Manage developer API credentials" },
            { href: "/pricing",            label: "Upgrade Plan",     desc: "Unlock premium features and content" },
            { href: "/chat",               label: "AI Analyst",       desc: "Ask questions about health policy" },
            { href: "/survey",             label: "Annual Survey",    desc: "Share your perspective on health transformation" },
          ].map((link) => (
            <Link key={link.href} href={link.href}
              className="bg-white rounded-xl border border-slate-200 shadow-sm p-5 hover:border-indigo-300 hover:shadow-md transition-all group">
              <div className="font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">{link.label}</div>
              <div className="text-sm text-slate-500 mt-0.5">{link.desc}</div>
            </Link>
          ))}
        </div>

      </div>
    </div>
  );
}
