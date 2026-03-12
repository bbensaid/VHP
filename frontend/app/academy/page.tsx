import HubPageTemplate from "@/components/templates/HubPageTemplate";
import {
  AcademicCapIcon,
  UserGroupIcon,
  VideoCameraIcon,
  ClipboardDocumentListIcon,
  BookOpenIcon
} from "@heroicons/react/24/outline";

// Import sub-pages to render as tab content
import CoursesPage from "./courses/page";
import FacultyPage from "./faculty/page";
import WebinarsPage from "./webinars/page";
import GlossaryPage from "./glossary/page";
import CaseStudiesPage from "./case-studies/page";

export const metadata = {
  title: "HTR Academy | Intelligence & Masterclasses",
  description: "Executive education, expert faculty, and deep-dive case studies.",
};

export default function AcademyHub() {
  const tabs = [
    {
      id: "courses",
      label: "Courses",
      icon: <AcademicCapIcon className="w-5 h-5" />,
      content: <CoursesPage />
    },
    {
      id: "faculty",
      label: "Faculty",
      icon: <UserGroupIcon className="w-5 h-5" />,
      content: <FacultyPage />
    },
    {
      id: "webinars",
      label: "Webinars",
      icon: <VideoCameraIcon className="w-5 h-5" />,
      content: <WebinarsPage />
    },
    {
      id: "case-studies",
      label: "Case Studies",
      icon: <ClipboardDocumentListIcon className="w-5 h-5" />,
      content: <CaseStudiesPage />
    },
    {
      id: "glossary",
      label: "Glossary",
      icon: <BookOpenIcon className="w-5 h-5" />,
      content: <GlossaryPage />
    },
  ];

  return (
    <HubPageTemplate
      badgeLabel="HTR Academy"
      title="Intelligence & Masterclasses"
      subtitle="Executive education, expert faculty, and deep-dive case studies for healthcare leaders."
      tabs={tabs}
    />
  );
}