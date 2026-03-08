import React from "react";
import CategoryPage from "@/components/CategoryPage";

export default function Page() {
  return (
    <CategoryPage
      pillar="Equity"
      title="Algorithmic Bias"
      description="Ensuring fairness in AI and clinical algorithms."
      colorClass="text-amber-700"
      category="Bias"
    />
  );
}