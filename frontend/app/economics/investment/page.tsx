import CategoryPage from "@/components/CategoryPage";

export const metadata = {
  title: "Healthcare Investment Trends | HTR Economics",
  description: "M&A activity, private equity healthcare deals, venture capital in health tech, and capital flow analysis across the health system transformation landscape.",
};

export default function Page() {
  return (
    <CategoryPage
      pillar="Economics"
      title="Healthcare Investment Trends"
      description="Tracking private equity, venture capital, and public market activity."
      colorClass="text-emerald-700"
      category="Capital"
    />
  );
}