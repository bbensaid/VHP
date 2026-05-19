import PillarOverview from "@/components/PillarOverview";
import HR1Tracker from "@/components/policy/HR1Tracker";

export const metadata = {
  title: "Policy | Health Transformation Review",
  description:
    "Healthcare policy analysis covering federal regulation, public health mandates, global comparative policy, and feasibility studies — grounded in the HTR Six-Pillar Framework.",
};

export default function Page() {
  return (
    <PillarOverview pillarId="policy">
      <HR1Tracker />
    </PillarOverview>
  );
}
