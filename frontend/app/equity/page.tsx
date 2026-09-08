import PillarOverview from "@/components/PillarOverview";

export const metadata = {
  title: "The Equity Imperative | Health Transformation Review",
  description:
    "The Equity Imperative — the cross-cutting 'is it just?' test applied to every pillar, not a sixth pillar. Health equity intelligence covering social determinants of health, algorithmic bias in clinical AI, and access disparities across rural, racial, and economic dimensions.",
};

export default function Page() {
  return <PillarOverview pillarId="equity" />;
}
