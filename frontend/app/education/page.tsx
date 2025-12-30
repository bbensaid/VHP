// app/education/page.tsx
import React from "react";
import Link from "next/link";
import AcademyCard from "@/components/academy/AcademyCard";

export default function EducationPage() {
  return (
    <div className="bg-white">
      {/* 1. HERO: The Value Prop */}
      <div className="relative bg-slate-900 py-20 lg:py-28 overflow-hidden">
        {/* Abstract Background Elements */}
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-indigo-900/20 to-transparent"></div>
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl"></div>
        
        <div className="relative container mx-auto px-4 md:px-8 text-center max-w-4xl mx-auto">
          <span className="inline-block py-1 px-3 rounded-full bg-indigo-500/20 border border-indigo-400/30 text-indigo-200 text-xs font-bold uppercase tracking-widest mb-6">
            HTR Academy
          </span>
          <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-8 tracking-tight">
            Master the <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">Business of Healthcare</span>
          </h1>
          <p className="text-xl text-slate-300 mb-10 leading-relaxed max-w-3xl mx-auto">
            Bridge the gap between policy, economics, and technology. 
            Executive education designed for leaders who need to navigate 
            complexity and drive transformation.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/education/courses" className="px-8 py-4 bg-white text-slate-900 font-bold rounded-lg hover:bg-slate-50 transition-all shadow-lg hover:shadow-xl w-full sm:w-auto">
              Explore Catalog
            </Link>
            <Link href="/education/faculty" className="px-8 py-4 bg-transparent border border-slate-600 text-white font-bold rounded-lg hover:bg-slate-800 transition-all w-full sm:w-auto">
              Meet the Faculty
            </Link>
          </div>
        </div>
      </div>

      {/* 2. FEATURED CERTIFICATIONS (Revenue Drivers) */}
      <div className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 md:px-8">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-3">
                Professional Certifications
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl">
                Cohort-based immersive programs designed to verify your expertise.
              </p>
            </div>
            <Link href="/education/courses" className="hidden md:inline-block text-indigo-600 font-bold hover:underline">
              View All Programs &rarr;
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <AcademyCard 
              type="CERTIFICATION"
              pillar="Technology"
              title="Certified Health AI Strategist (CHAIS)"
              description="The industry standard for leading AI governance, deployment, and ethics in clinical settings."
              meta="8 Weeks • Cohort Begins Jan 15"
              price="$2,995"
              instructors={["Dr. Aris Thorne", "Sarah Jenkins, CIO"]}
              href="/education/courses/chais"
            />
            <AcademyCard 
              type="CERTIFICATION"
              pillar="Economics"
              title="Value-Based Care Executive (VBCE)"
              description="Master risk adjustment, capitation modeling, and population health finance."
              meta="6 Weeks • Self-Paced"
              price="$1,895"
              instructors={["Mark Cuban (Guest)", "Elena Roza"]}
              href="/education/courses/vbce"
            />
             <AcademyCard 
              type="CERTIFICATION"
              pillar="Policy"
              title="Health Policy & Regulatory Analyst"
              description="Navigate the FDA, CMS, and global regulatory landscapes with confidence."
              meta="10 Weeks • Cohort Begins Feb 01"
              price="$3,200"
              instructors={["Fmr. CMS Admin", "Policy Lead"]}
              href="/education/courses/hpra"
            />
          </div>
        </div>
      </div>

      {/* 3. LATEST MASTERCLASSES (Upsell) */}
      <div className="py-20 bg-white">
        <div className="container mx-auto px-4 md:px-8">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Latest Masterclasses</h2>
            <p className="text-gray-600">Deep dives into specific emerging topics.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <AcademyCard 
              type="COURSE"
              pillar="Policy"
              title="2025 CMS Fee Schedule"
              description="Unpacking the new reimbursement rules for RPM and Telehealth."
              meta="3 Hours • Video"
              price="$299"
              href="/education/courses/cms-2025"
            />
            <AcademyCard 
              type="COURSE"
              pillar="Technology"
              title="Interoperability (FHIR) 101"
              description="A non-technical guide to data exchange standards."
              meta="4 Hours • Video"
              price="$349"
              href="/education/courses/fhir-101"
            />
            <AcademyCard 
              type="COURSE"
              pillar="Economics"
              title="Direct-to-Employer Contracting"
              description="How health systems can bypass payers."
              meta="5 Hours • Workshop"
              price="$499"
              href="/education/courses/direct-contracting"
            />
             <AcademyCard 
              type="COURSE"
              pillar="Technology"
              title="Cybersecurity for Execs"
              description="Managing ransomware risk in hospital operations."
              meta="2 Hours • Video"
              price="$199"
              href="/education/courses/cyber-exec"
            />
          </div>
        </div>
      </div>

      {/* 4. FACULTY SPOTLIGHT */}
      <div className="py-20 bg-slate-900 text-white">
        <div className="container mx-auto px-4 md:px-8">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="lg:w-1/2">
              <span className="text-indigo-400 font-bold tracking-widest uppercase text-sm mb-2 block">World-Class Instruction</span>
              <h2 className="text-4xl font-extrabold mb-6">Learn from the Architects of the System.</h2>
              <p className="text-lg text-slate-300 mb-8 leading-relaxed">
                Our faculty aren't just academics. They are former CMS Administrators, Hospital CEOs, Chief Medical Officers, and Tech Founders who have built the systems you operate in today.
              </p>
              <Link href="/education/faculty" className="inline-block px-8 py-3 bg-indigo-600 text-white font-bold rounded-lg hover:bg-indigo-700 transition-colors">
                View Faculty Roster
              </Link>
            </div>
            <div className="lg:w-1/2 grid grid-cols-2 gap-4">
               {/* Abstract Faculty Cards */}
               <div className="bg-slate-800 p-6 rounded-xl border border-slate-700">
                  <div className="w-16 h-16 bg-slate-600 rounded-full mb-4"></div>
                  <h4 className="font-bold text-lg">Dr. Elena Roza</h4>
                  <p className="text-slate-400 text-sm">Former Chief Economist, UnitedHealth</p>
               </div>
               <div className="bg-slate-800 p-6 rounded-xl border border-slate-700 mt-8">
                  <div className="w-16 h-16 bg-slate-600 rounded-full mb-4"></div>
                  <h4 className="font-bold text-lg">Marcus Chen</h4>
                  <p className="text-slate-400 text-sm">Architect of the 2020 Interop Rule</p>
               </div>
            </div>
          </div>
        </div>
      </div>

      {/* 5. STATS / SOCIAL PROOF */}
      <div className="py-16 border-t border-gray-200">
        <div className="container mx-auto px-4 md:px-8 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
                <div className="text-4xl font-extrabold text-indigo-600 mb-1">15k+</div>
                <div className="text-sm text-gray-500 font-bold uppercase">Students Trained</div>
            </div>
            <div>
                <div className="text-4xl font-extrabold text-indigo-600 mb-1">500+</div>
                <div className="text-sm text-gray-500 font-bold uppercase">Organizations</div>
            </div>
            <div>
                <div className="text-4xl font-extrabold text-indigo-600 mb-1">42</div>
                <div className="text-sm text-gray-500 font-bold uppercase">Countries</div>
            </div>
            <div>
                <div className="text-4xl font-extrabold text-indigo-600 mb-1">98%</div>
                <div className="text-sm text-gray-500 font-bold uppercase">Career Impact</div>
            </div>
        </div>
      </div>
    </div>
  );
}