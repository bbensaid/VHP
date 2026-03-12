"use client";

import React from "react";

import HubPageTemplate from "@/components/templates/HubPageTemplate";
import {
  AcademicCapIcon,
  UserGroupIcon,
  FilmIcon,
  BookOpenIcon,
  BuildingLibraryIcon,
} from "@heroicons/react/24/outline";

interface AcademyClientPageProps {
  coursesTab: React.ReactNode;
  facultyTab: React.ReactNode;
  webinarsTab: React.ReactNode;
  glossaryTab: React.ReactNode;
  caseStudiesTab: React.ReactNode;
}

export default function AcademyClientPage(props: AcademyClientPageProps) {
  const tabs = [
    { id: "courses", label: "Executive Masterclasses", icon: <AcademicCapIcon className="w-5 h-5"/>, content: props.coursesTab },
    { id: "faculty", label: "Faculty & Experts", icon: <UserGroupIcon className="w-5 h-5"/>, content: props.facultyTab },
    { id: "webinars", label: "Webinars & Events", icon: <FilmIcon className="w-5 h-5"/>, content: props.webinarsTab },
    { id: "glossary", label: "Glossary", icon: <BookOpenIcon className="w-5 h-5"/>, content: props.glossaryTab },
    { id: "casestudies", label: "Case Study Library", icon: <BuildingLibraryIcon className="w-5 h-5"/>, content: props.caseStudiesTab },
  ];

  return (
    <HubPageTemplate
      badgeLabel="Education & Intelligence Hub"
      title="HTR Academy"
      subtitle="Executive Masterclasses, Faculty, Webinars, Glossary, and Case Studies"
      tabs={tabs}
    />
  );
}