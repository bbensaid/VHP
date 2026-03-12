"use client";

import React from "react";

import HubPageTemplate from "@/components/templates/HubPageTemplate";
import { CurrencyDollarIcon, UserGroupIcon, SignalIcon } from "@heroicons/react/24/outline";

interface TrendingTopicsClientPageProps {
  vbcTab: React.ReactNode;
  workforceTab: React.ReactNode;
  telehealthTab: React.ReactNode;
}

export default function TrendingTopicsClientPage(props: TrendingTopicsClientPageProps) {
  const tabs = [
    { id: "vbc", label: "Value-Based Care Models", icon: <CurrencyDollarIcon className="w-5 h-5"/>, content: props.vbcTab },
    { id: "workforce", label: "Clinical Workforce Gaps", icon: <UserGroupIcon className="w-5 h-5"/>, content: props.workforceTab },
    { id: "telehealth", label: "Telehealth Reimbursement", icon: <SignalIcon className="w-5 h-5"/>, content: props.telehealthTab },
  ];

  return (
    <HubPageTemplate
      badgeLabel="Live Market Signals"
      title="Trending Topics"
      subtitle="Value-Based Care Models, Clinical Workforce Gaps, and Telehealth Reimbursement"
      tabs={tabs}
    />
  );
}