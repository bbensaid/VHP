import { requireAuth } from "@/lib/auth";
import {
  getUserEnrollments,
  getUserCertifications,
  getUserModuleProgress,
} from "@/lib/db/academy";
import Link from "next/link";
import { CheckCircle, Award, BookOpen, Clock } from "lucide-react";

export default async function MyCoursesPage() {
  const user = await requireAuth();

  const [enrollments, certifications, moduleProgress] = await Promise.all([
    getUserEnrollments(user.id),
    getUserCertifications(user.id),
    getUserModuleProgress(user.id),
  ]);

  const completedModuleSlugs = new Set(
    moduleProgress.filter((m) => m.completed_at).map((m) => m.module_slug)
  );

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <Link href="/account" className="text-sm text-slate-500 hover:text-indigo-600">← Back to Account</Link>
          <h1 className="text-2xl font-black text-slate-900 mt-3">My Courses</h1>
          <p className="text-slate-500 text-sm mt-1">Track your learning progress and certifications.</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          {[
            { label: "Enrolled", value: enrollments.length, icon: BookOpen, color: "text-indigo-600" },
            { label: "Modules Done", value: completedModuleSlugs.size, icon: CheckCircle, color: "text-emerald-600" },
            { label: "Certificates", value: certifications.length, icon: Award, color: "text-amber-600" },
          ].map(({ label, value, icon: Icon, color }) => (
            <div key={label} className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 flex items-center gap-4">
              <Icon size={28} className={color} />
              <div>
                <div className="text-2xl font-black text-slate-900">{value}</div>
                <div className="text-xs text-slate-500">{label}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Enrollments */}
        <section className="mb-10">
          <h2 className="text-lg font-black text-slate-900 mb-4">Enrolled Courses</h2>
          {enrollments.length === 0 ? (
            <div className="bg-white rounded-2xl border border-dashed border-slate-300 p-10 text-center">
              <BookOpen size={40} className="mx-auto text-slate-300 mb-3" />
              <p className="text-slate-500 font-semibold">No courses enrolled yet.</p>
              <Link href="/academy/courses" className="mt-4 inline-block text-sm font-bold text-indigo-600 hover:text-indigo-800">
                Browse Courses →
              </Link>
            </div>
          ) : (
            <div className="space-y-3">
              {enrollments.map((enroll) => {
                const pct = enroll.progress_pct ?? 0;
                const isComplete = enroll.completed_at !== null;
                return (
                  <div
                    key={enroll.id}
                    className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 flex items-center gap-4"
                  >
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${
                      isComplete ? "bg-emerald-100" : "bg-indigo-100"
                    }`}>
                      {isComplete
                        ? <CheckCircle size={20} className="text-emerald-600" />
                        : <BookOpen size={20} className="text-indigo-600" />
                      }
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-bold text-slate-900 capitalize mb-1">
                        {enroll.course_slug.replace(/-/g, " ")}
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="flex-1 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-indigo-500 rounded-full transition-all"
                            style={{ width: `${pct}%` }}
                          />
                        </div>
                        <span className="text-xs text-slate-500 shrink-0">{pct}%</span>
                      </div>
                      {isComplete && (
                        <div className="flex items-center gap-1 mt-1 text-xs text-emerald-600 font-semibold">
                          <CheckCircle size={10} />
                          Completed {new Date(enroll.completed_at!).toLocaleDateString()}
                        </div>
                      )}
                    </div>
                    <Link
                      href={`/academy/courses/${enroll.course_slug}`}
                      className="shrink-0 text-xs font-bold text-indigo-600 hover:text-indigo-800 border border-indigo-200 rounded-lg px-3 py-1.5 hover:bg-indigo-50 transition-colors"
                    >
                      {isComplete ? "Review" : "Continue"}
                    </Link>
                  </div>
                );
              })}
            </div>
          )}
        </section>

        {/* Certifications */}
        <section>
          <h2 className="text-lg font-black text-slate-900 mb-4">Certifications</h2>
          {certifications.length === 0 ? (
            <div className="bg-white rounded-2xl border border-dashed border-slate-300 p-10 text-center">
              <Award size={40} className="mx-auto text-slate-300 mb-3" />
              <p className="text-slate-500 font-semibold">No certifications earned yet.</p>
              <p className="text-sm text-slate-400 mt-1">Complete a course to earn a certificate.</p>
            </div>
          ) : (
            <div className="space-y-3">
              {certifications.map((cert) => (
                <div
                  key={cert.id}
                  className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 flex items-center gap-4"
                >
                  <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center shrink-0">
                    <Award size={20} className="text-amber-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-bold text-slate-900">{cert.cert_name}</div>
                    <div className="flex items-center gap-2 text-xs text-slate-500 mt-0.5">
                      <Clock size={10} />
                      <span>Issued {new Date(cert.issued_at).toLocaleDateString("en-US", {
                        year: "numeric", month: "long", day: "numeric",
                      })}</span>
                      {cert.expires_at && (
                        <span>· Expires {new Date(cert.expires_at).toLocaleDateString()}</span>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    {cert.verification_hash && (
                      <Link
                        href={`/verify/${cert.verification_hash}`}
                        className="text-xs font-bold text-slate-500 hover:text-indigo-600 border border-slate-200 rounded-lg px-3 py-1.5 hover:bg-slate-50 transition-colors"
                      >
                        Verify
                      </Link>
                    )}
                    {cert.cert_url && (
                      <a
                        href={cert.cert_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs font-bold text-indigo-600 hover:text-indigo-800 border border-indigo-200 rounded-lg px-3 py-1.5 hover:bg-indigo-50 transition-colors"
                      >
                        Download
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
