import { notFound } from "next/navigation";
import { performanceIndexData } from "@/lib/data/performance-index-data";
import { rhtProgramData } from "@/lib/data/rht-program";
import StateDetailClientPage from "./StateDetailClientPage";
import React from 'react';

export default async function DynamicStatePage({ params }: { params: Promise<{ state: string }> }) {
  // Correctly await the params promise
  const resolvedParams = await params;
  const stateSlug = resolvedParams.state.toLowerCase();
  
  const indexData = performanceIndexData[stateSlug] || null;
  const programData = rhtProgramData[stateSlug] || null;

  if (!indexData && !programData) {
    return notFound();
  }

  // Pass all required data, including the slug, to the client component
  return (
    <StateDetailClientPage 
      indexData={indexData} 
      programData={programData} 
      stateSlug={stateSlug}
    />
  );
}
