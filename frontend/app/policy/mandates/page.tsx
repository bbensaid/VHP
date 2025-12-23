import CategoryPageLayout from "@/components/CategoryPageLayout";

export default function MandatesPage() {
  return (
    <CategoryPageLayout
      pillar="Policy"
      category="mandates"
      title="Public Health Mandates"
      description="Updates on state and federal health mandates."
      themeColor="text-card-policy"
      hoverBg="bg-card-policy"
      badgeStyle="bg-orange-100 text-orange-800"
    />
  );
}
