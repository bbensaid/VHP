"use client";

import React, { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { client as sanityClient } from "@/lib/sanity";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function DashboardPage() {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);
  const [dashboardData, setDashboardData] = useState<any>({ courses: [], reports: [], webinar: null });

  useEffect(() => {
    async function init() {
      // 1. CHECK AUTH: Is anyone logged in?
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        setLoading(false);
        return; // Show Login Form
      }

      setUser(session.user);

      // 2. FETCH SUPABASE DATA (The "Ledger")
      // Get the rows that link this user to specific Course IDs
      const { data: enrollments } = await supabase
        .from("enrollments")
        .select("*")
        .eq("user_id", session.user.id);

      const { data: savedReports } = await supabase
        .from("saved_reports")
        .select("*")
        .eq("user_id", session.user.id);

      // 3. FETCH SANITY CONTENT (The "Library")
      // Extract the IDs we found in Supabase
      const courseIds = enrollments?.map((e) => e.sanity_course_id) || [];
      const reportIds = savedReports?.map((r) => r.sanity_report_id) || [];

      // Query Sanity for the details of ONLY these items
      const sanityQuery = `{
        "courses": *[_type == "course" && _id in $courseIds]{
          _id, title, pillar, "slug": slug.current, modules
        },
        "reports": *[_type == "report" && _id in $reportIds]{
          _id, title, accessLevel, "imageUrl": coverImage.asset->url
        },
        "webinar": *[_type == "webinar" && date > now()] | order(date asc)[0]{
          title, date, "slug": slug.current
        }
      }`;

      const sanityContent = await sanityClient.fetch(sanityQuery, { courseIds, reportIds });

      // 4. MERGE DATA (The "Join")
      // Combine the 'Progress' from Supabase with the 'Title' from Sanity
      const mergedCourses = sanityContent.courses.map((course: any) => {
        const sqlRecord = enrollments?.find((e) => e.sanity_course_id === course._id);
        return { ...course, progress: sqlRecord?.progress || 0 };
      });

      setDashboardData({
        courses: mergedCourses,
        reports: sanityContent.reports,
        webinar: sanityContent.webinar
      });
      setLoading(false);
    }

    init();
  }, []);

  // --- RENDER STATES ---

  // A. Loading
  if (loading) return <div className="min-h-screen flex items-center justify-center">Loading HTR Nexus...</div>;

  // B. Not Logged In (Show Login Form)
  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-200 max-w-md w-full text-center">
            <h1 className="text-2xl font-bold text-slate-900 mb-6">HTR Nexus Login</h1>
            <p className="text-gray-500 mb-6">Enter your credentials to access the simulation.</p>
            
            <button 
                onClick={async () => {
                    setLoading(true);
                    // LOGIN with the Seeded User Credentials
                    const { error } = await supabase.auth.signInWithPassword({
                        email: "aris.thorne@htr.com",
                        password: "password123"
                    });
                    if (error) {
                        alert(error.message);
                        setLoading(false);
                    } else {
                        window.location.reload(); // Refresh to trigger the data fetch
                    }
                }}
                className="w-full py-3 bg-indigo-600 text-white font-bold rounded hover:bg-indigo-700 transition-colors"
            >
                Log In as Dr. Thorne
            </button>
        </div>
      </div>
    );
  }

  // C. Logged In (Show Dashboard)
  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      
      {/* HEADER */}
      <div className="bg-slate-900 text-white py-12">
        <div className="container mx-auto px-4 md:px-8">
            <div className="flex justify-between items-end">
                <div>
                    <h1 className="text-3xl md:text-4xl font-bold mb-2">Welcome back, Dr. Thorne.</h1>
                    <p className="text-slate-400">
                        You are tracking <span className="text-white font-bold">{dashboardData.courses.length} active courses</span>.
                    </p>
                </div>
                <button 
                    onClick={() => supabase.auth.signOut().then(() => window.location.reload())}
                    className="text-sm text-slate-400 hover:text-white underline"
                >
                    Sign Out
                </button>
            </div>
        </div>
      </div>

      {/* CONTENT GRID */}
      <div className="container mx-auto px-4 md:px-8 -mt-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* LEFT COL: COURSES */}
        <div className="lg:col-span-2 space-y-8">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-6">My Learning</h2>
                <div className="space-y-6">
                    {dashboardData.courses.map((course: any) => (
                        <div key={course._id} className="border-b border-gray-50 pb-4 last:border-0 last:pb-0">
                            <div className="flex justify-between items-start mb-2">
                                <div>
                                    <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400 block mb-1">
                                        {course.pillar}
                                    </span>
                                    <h3 className="font-bold text-lg text-gray-900">{course.title}</h3>
                                </div>
                                <Link href={`/education/courses/${course.slug}`} className="px-4 py-2 text-sm font-bold border border-gray-200 rounded hover:bg-gray-50">
                                    Resume
                                </Link>
                            </div>
                            {/* PROGRESS BAR (Data from Supabase) */}
                            <div className="w-full bg-gray-100 rounded-full h-2 mb-1">
                                <div className="bg-indigo-600 h-2 rounded-full" style={{ width: `${course.progress}%` }}></div>
                            </div>
                            <span className="text-xs text-gray-500 font-medium">{course.progress}% Complete</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>

        {/* RIGHT COL: REPORTS & WEBINARS */}
        <div className="space-y-8">
            {/* Reports */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Saved Reports</h2>
                <div className="space-y-4">
                    {dashboardData.reports.map((report: any) => (
                        <div key={report._id} className="flex gap-4 items-center">
                            <div className="w-10 h-12 bg-slate-100 flex items-center justify-center text-lg rounded">📄</div>
                            <div className="flex-1">
                                <h4 className="font-bold text-sm text-gray-900 line-clamp-1">{report.title}</h4>
                                <Link href="/advisory/reports" className="text-xs text-indigo-600 font-bold hover:underline">Read Now</Link>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Webinar */}
            <div className="bg-indigo-900 text-white rounded-xl shadow-lg p-6">
                <h3 className="text-indigo-200 font-bold text-xs uppercase tracking-widest mb-4">Next Event</h3>
                {dashboardData.webinar ? (
                    <>
                        <h4 className="font-bold mb-2">{dashboardData.webinar.title}</h4>
                        <div className="text-indigo-200 text-sm mb-4">
                            {new Date(dashboardData.webinar.date).toLocaleDateString()}
                        </div>
                        <Link href={`/education/webinars/${dashboardData.webinar.slug}`} className="block w-full py-2 bg-white text-indigo-900 font-bold text-center rounded text-sm hover:bg-indigo-50">
                            Join Session
                        </Link>
                    </>
                ) : <p className="text-indigo-300">No upcoming events.</p>}
            </div>
        </div>

      </div>
    </div>
  );
}