import CategoryPageLayout from "@/components/CategoryPageLayout";

export default function ValueBasedCarePage() {
  return (
    <CategoryPageLayout
      pillar="Economics"
      category="value"
      title="Value-Based Care Models"
      description="Analysis of alternative payment models, ACO performance, and the shift from volume to value."
      themeColor="text-card-economics"
      hoverBg="bg-card-economics"
      badgeStyle="bg-green-100 text-green-800"
    />
  );
}
