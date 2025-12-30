// app/education/courses/page.tsx
import React from "react";
import StaticPageLayout from "@/components/StaticPageLayout";
import AcademyCard from "@/components/academy/AcademyCard";

export default function CoursesPage() {
  
  // Helper to assign pillar-specific colors to the filter buttons
  const getFilterStyle = (filter: string, index: number) => {
    // 1. "All Programs" (Active State simulation - Solid Dark)
    if (index === 0) {
        return "bg-slate-900 text-white border-slate-900";
    }

    // 2. Pillar-Specific Styles
    // Using exact custom classes from components/Header.tsx and app/globals.css
    switch(filter) {
        case "Policy Pillar":
            return "bg-white text-card-policy border-card-policy/30 hover:border-card-policy hover:bg-orange-50";
        case "Economics Pillar":
            return "bg-white text-card-economics border-card-economics/30 hover:border-card-economics hover:bg-emerald-50";
        case "Technology Pillar":
            return "bg-white text-card-tech border-card-tech/30 hover:border-card-tech hover:bg-indigo-50";
        // 3. Default/Generic Style (Gray)
        default:
            return "bg-white text-gray-600 border-gray-300 hover:border-gray-400 hover:bg-gray-50";
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen pb-20">
      {/* Page Header */}
      <div className="bg-white border-b border-gray-200 py-12 md:py-16">
        <div className="container mx-auto px-4 md:px-8">
            <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">
                Course Catalog
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl">
                Browse our library of certifications, masterclasses, and workshops tailored for healthcare leadership.
            </p>
            
            {/* Filter Bar with Colored Pills */}
            <div className="flex flex-wrap gap-3 mt-8">
                {["All Programs", "Policy Pillar", "Economics Pillar", "Technology Pillar", "Certifications Only"].map((filter, i) => (
                    <button 
                        key={filter}
                        className={`px-5 py-2 rounded-full text-sm font-bold border transition-all shadow-sm ${getFilterStyle(filter, i)}`}
                    >
                        {filter}
                    </button>
                ))}
            </div>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-8 mt-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Sidebar Filters (Desktop) */}
            <div className="hidden lg:block space-y-8">
                <div>
                    <h3 className="font-bold text-gray-900 mb-4 uppercase tracking-wider text-xs">Learning Format</h3>
                    <div className="space-y-2">
                        <label className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer hover:text-gray-900">
                            <input type="checkbox" className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" defaultChecked />
                            Cohort-Based (Live)
                        </label>
                        <label className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer hover:text-gray-900">
                            <input type="checkbox" className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" defaultChecked />
                            Self-Paced Video
                        </label>
                        <label className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer hover:text-gray-900">
                            <input type="checkbox" className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" />
                            Workshops
                        </label>
                    </div>
                </div>
                <div>
                    <h3 className="font-bold text-gray-900 mb-4 uppercase tracking-wider text-xs">Skill Level</h3>
                    <div className="space-y-2">
                        <label className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer hover:text-gray-900">
                            <input type="checkbox" className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" />
                            Introductory
                        </label>
                        <label className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer hover:text-gray-900">
                            <input type="checkbox" className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" defaultChecked />
                            Executive / Strategic
                        </label>
                        <label className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer hover:text-gray-900">
                            <input type="checkbox" className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" defaultChecked />
                            Technical / Operational
                        </label>
                    </div>
                </div>
            </div>

            {/* Main Grid */}
            <div className="lg:col-span-3 space-y-12">
                
                {/* Section: Certifications */}
                <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                        <span className="w-2 h-8 bg-indigo-600 rounded-full"></span>
                        Premium Certifications
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <AcademyCard 
                            type="CERTIFICATION"
                            pillar="Technology"
                            title="Certified Health AI Strategist (CHAIS)"
                            description="Comprehensive training on AI governance, model selection, and clinical workflow integration."
                            meta="8 Weeks • Online Cohort"
                            price="$2,995"
                            instructors={["Dr. Aris Thorne"]}
                            href="/education/courses/chais"
                        />
                         <AcademyCard 
                            type="CERTIFICATION"
                            pillar="Policy"
                            title="Health Policy & Regulatory Analyst"
                            description="Deep dive into legislative mechanics, FDA pathways, and reimbursement rule-making."
                            meta="10 Weeks • Online Cohort"
                            price="$3,200"
                            instructors={["Sarah Jenkins"]}
                            href="/education/courses/hpra"
                        />
                    </div>
                </div>

                {/* Section: Economics Masterclasses */}
                <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                         <span className="w-2 h-8 bg-emerald-500 rounded-full"></span>
                        Economics & Finance
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        <AcademyCard 
                            type="COURSE"
                            pillar="Economics"
                            title="Value-Based Care Financial Modeling"
                            description="Excel-based workshop on capitation."
                            meta="4 Hours • Self-Paced"
                            price="$495"
                            href="/education/courses/vbc-finance"
                        />
                        <AcademyCard 
                            type="COURSE"
                            pillar="Economics"
                            title="Hospital Price Transparency Strategy"
                            description="Compliance and competitive pricing."
                            meta="2 Hours • Video"
                            price="$199"
                            href="/education/courses/transparency"
                        />
                        <AcademyCard 
                            type="COURSE"
                            pillar="Economics"
                            title="Private Equity in Healthcare"
                            description="Understanding the PE playbook."
                            meta="3 Hours • Video"
                            price="$349"
                            href="/education/courses/pe-healthcare"
                        />
                    </div>
                </div>

                 {/* Section: Technology Masterclasses */}
                 <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                         <span className="w-2 h-8 bg-indigo-500 rounded-full"></span>
                        Technology & Operations
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        <AcademyCard 
                            type="COURSE"
                            pillar="Technology"
                            title="Cybersecurity Crisis Management"
                            description="Tabletop exercises for executives."
                            meta="5 Hours • Workshop"
                            price="$599"
                            href="/education/courses/cyber-crisis"
                        />
                        <AcademyCard 
                            type="COURSE"
                            pillar="Technology"
                            title="RPM & Telehealth Scaling"
                            description="Operational playbooks for remote care."
                            meta="3 Hours • Video"
                            price="$299"
                            href="/education/courses/rpm-scaling"
                        />
                    </div>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
}