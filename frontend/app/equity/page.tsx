import PillarOverview from "@/components/PillarOverview";

export const metadata = {
  title: "Equity | Health Transformation Review",
  description:
    "Health equity intelligence covering social determinants of health, algorithmic bias in clinical AI, and access disparities across rural, racial, and economic dimensions.",
};

export default function Page() {
  return <PillarOverview pillarId="equity" />;
}
