import CategoryPageLayout from "@/components/CategoryPageLayout";

export default function FeasibilityPage() {
  return (
    <CategoryPageLayout
      pillar="Policy"
      category="feasibility"
      title="Policy Feasibility Studies"
      description=" rigorous assessment of proposed legislation, focusing on implementation barriers and fiscal impact."
      themeColor="text-card-policy"
      hoverBg="bg-card-policy"
      badgeStyle="bg-orange-100 text-orange-800"
    />
  );
}
