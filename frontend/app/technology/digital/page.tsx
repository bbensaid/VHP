import CategoryPageLayout from "@/components/CategoryPageLayout";

export default function DigitalHealthPage() {
  return (
    <CategoryPageLayout
      pillar="Technology"
      category="digital"
      title="Digital Health & Telemedicine"
      description="Coverage of remote patient monitoring, hospital-at-home models, and virtual care infrastructure."
      themeColor="text-card-tech"
      hoverBg="bg-card-tech"
      badgeStyle="bg-indigo-100 text-indigo-800"
    />
  );
}
