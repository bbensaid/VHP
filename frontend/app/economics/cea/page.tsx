import CategoryPageLayout from "@/components/CategoryPageLayout";

export default function CEAPage() {
  return (
    <CategoryPageLayout
      pillar="Economics"
      category="cea"
      title="Cost-Effectiveness Analysis"
      description="Evaluating the relative costs and outcomes of different courses of action."
      themeColor="text-card-economics"
      hoverBg="bg-card-economics"
      badgeStyle="bg-green-100 text-green-800"
    />
  );
}
