// frontend/app/trending-topics/page.tsx
import { Suspense } from "react";
import TrendingTopicsClientPage from "./TrendingTopicsClientPage";

// FIX: Mapped to the actual existing pages in your app that match these topics
// instead of the non-existent /topics/ directory.
import VBCPage from "@/app/economics/value/page";
import WorkforcePage from "@/app/economics/cea/page";
import TelehealthPage from "@/app/technology/digital/page";

export const metadata = {
  title: "HTR Trending Topics | Pulse of Healthcare",
  description: "Centralized hub for trending healthcare topics and analysis.",
};

export default function TrendingTopicsHubPage() {
  return (
    <Suspense>
      <TrendingTopicsClientPage
        vbcTab={<VBCPage />}
        workforceTab={<WorkforcePage />}
        telehealthTab={<TelehealthPage />}
      />
    </Suspense>
  );
}