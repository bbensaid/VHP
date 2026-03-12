import React from "react";
"use client";

import HubPageTemplate from "@/components/templates/HubPageTemplate";
import { BriefcaseIcon, ChartBarIcon, DocumentTextIcon, UserPlusIcon } from "@heroicons/react/24/outline";

interface AdvisoryClientPageProps {
  consultingTab: React.ReactNode;
  researchTab: React.ReactNode;
  reportsTab: React.ReactNode;
  contactTab: React.ReactNode;
}

export default function AdvisoryClientPage(props: AdvisoryClientPageProps) {
  const tabs = [
    { id: "consulting", label: "Strategic Consulting", icon: <BriefcaseIcon className="w-5 h-5"/>, content: props.consultingTab },
    { id: "research", label: "Custom Research Projects", icon: <ChartBarIcon className="w-5 h-5"/>, content: props.researchTab },
    { id: "reports", label: "Annual Impact Reports", icon: <DocumentTextIcon className="w-5 h-5"/>, content: props.reportsTab },
    { id: "contact", label: "Hire an Expert", icon: <UserPlusIcon className="w-5 h-5"/>, content: props.contactTab },
  ];

  return (
    <HubPageTemplate
      badgeLabel="Strategy & Consulting Hub"
      title="HTR Advisory"
      subtitle="Strategic Consulting, Custom Research, Annual Reports, and Direct Engagement"
      tabs={tabs}
    />
  );
}
