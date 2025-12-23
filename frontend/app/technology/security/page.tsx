import CategoryPageLayout from "@/components/CategoryPageLayout";

export default function SecurityPage() {
  return (
    <CategoryPageLayout
      pillar="Technology"
      category="security"
      title="Data Security & Governance"
      description="Analysis of cybersecurity threats, HIPAA compliance in the cloud age, and data sovereignty."
      themeColor="text-card-tech"
      hoverBg="bg-card-tech"
      badgeStyle="bg-indigo-100 text-indigo-800"
    />
  );
}
