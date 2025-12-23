import CategoryPageLayout from "@/components/CategoryPageLayout";

export default function RegulationPage() {
  return (
    <CategoryPageLayout
      pillar="Policy"
      category="regulation"
      title="Regulation & Legislation"
      description="Analysis of legislative frameworks and compliance landscapes."
      themeColor="text-card-policy"
      hoverBg="bg-card-policy"
      badgeStyle="bg-orange-100 text-orange-800"
    />
  );
}
