import CategoryPageLayout from "@/components/CategoryPageLayout";

export default function InvestmentPage() {
  return (
    <CategoryPageLayout
      pillar="Economics"
      category="investment"
      title="Healthcare Investment Trends"
      description="Tracking private equity activity, M&A consolidation, and capital allocation in the health sector."
      themeColor="text-card-economics"
      hoverBg="bg-card-economics"
      badgeStyle="bg-green-100 text-green-800"
    />
  );
}
