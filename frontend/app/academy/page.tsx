import React from "react";
import AcademyClientPage from "./AcademyClientPage";

import CoursesPage from "@/app/education/courses/page";
import FacultyPage from "@/app/education/faculty/page";
import WebinarsPage from "@/app/education/webinars/page";
import GlossaryPage from "@/app/education/glossary/page";
import CaseStudiesPage from "@/app/education/case-studies/page";

export const metadata = {
  title: "HTR Academy | Intelligence & Masterclasses",
  description: "Centralized hub for all HTR educational content.",
};

export default function AcademyHubPage() {
  return (
    <AcademyClientPage
      coursesTab={<CoursesPage />}
      facultyTab={<FacultyPage />}
      webinarsTab={<WebinarsPage />}
      glossaryTab={<GlossaryPage />}
      caseStudiesTab={<CaseStudiesPage />}
    />
  );
}