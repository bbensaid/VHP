import React from "react";
import CategoryPage from "@/components/CategoryPage";

export default function Page() {
  return (
    <CategoryPage
      pillar="Economics"
      title="Healthcare Investment Trends"
      description="Tracking private equity, venture capital, and public market activity."
      colorClass="text-emerald-700"
      category="Capital"
    />
  );
}