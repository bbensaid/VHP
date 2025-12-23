import CategoryPageLayout from "@/components/CategoryPageLayout";

export default function GlobalPolicyPage() {
  return (
    <CategoryPageLayout
      pillar="Policy"
      category="global"
      title="Global & Comparative Policy"
      description="Comparative analysis of international health systems to identify best practices for domestic application."
      themeColor="text-card-policy"
      hoverBg="bg-card-policy"
      badgeStyle="bg-orange-100 text-orange-800"
    />
  );
}
