import PillarOverview from "@/components/PillarOverview";

export const metadata = {
  title: "Clinical | Health Transformation Review",
  description:
    "Clinical transformation intelligence covering hospital-at-home, precision medicine, virtual care models, genomics, and population health management.",
};

export default function Page() {
  return <PillarOverview pillarId="clinical" />;
}
