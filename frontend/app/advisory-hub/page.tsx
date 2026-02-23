import React from "react";
import AdvisoryClientPage from "./AdvisoryClientPage";

// We import the EXACT existing pages to ensure zero content loss.
import ConsultingPage from "@/app/advisory/consulting/page";
import ResearchPage from "@/app/advisory/research/page";
import ReportsPage from "@/app/advisory/reports/page";
import ContactPage from "@/app/advisory/contact/page";

export const metadata = {
  title: "HTR Advisory Hub | Intelligence & Strategy",
  description: "Centralized hub for all HTR advisory services and reports.",
};

export default function AdvisoryHubPage() {
  return (
    <AdvisoryClientPage
      consultingTab={<ConsultingPage />}
      researchTab={<ResearchPage />}
      reportsTab={<ReportsPage />}
      contactTab={<ContactPage />}
    />
  );
}