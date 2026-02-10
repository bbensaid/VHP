export function formatCompactCurrency(value: number | string): string {
  const num =
    typeof value === "string"
      ? parseFloat(value.replace(/[^0-9.-]+/g, ""))
      : value;

  if (isNaN(num)) return "$0";

  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    notation: "compact",
    maximumFractionDigits: 1,
  }).format(num);
}

export const getScoreColor = (score?: number): string => {
  if (score === undefined) return "#64748b"; // Slate-500 for no data
  if (score >= 80) return "#16a34a"; // Green-600
  if (score >= 70) return "#22c55e"; // Green-500
  if (score >= 60) return "#facc15"; // Yellow-400
  return "#ef4444"; // Red-500
};
