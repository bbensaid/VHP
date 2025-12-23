import CategoryPageLayout from "@/components/CategoryPageLayout";

export default function MarketPage() {
  return (
    <CategoryPageLayout
      pillar="Economics"
      category="market"
      title="Market & Finance"
      description="Deep dives into capital allocation and financial mechanics."
      themeColor="text-card-economics"
      hoverBg="bg-card-economics"
      badgeStyle="bg-green-100 text-green-800"
    />
  );
}
