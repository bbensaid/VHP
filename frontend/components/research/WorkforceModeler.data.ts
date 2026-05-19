/**
 * Shared formatters for WorkforceModeler. Each tab's domain data is colocated
 * in its own tab file under WorkforceModeler.tabs/.
 */

export function fmt(n: number, decimals = 0) {
  return n.toLocaleString("en-US", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
}

export function fmtDollars(n: number) {
  if (Math.abs(n) >= 1_000_000) return `$${(n / 1_000_000).toFixed(1)}M`;
  if (Math.abs(n) >= 1_000)     return `$${Math.round(n / 1000)}K`;
  return `$${Math.round(n)}`;
}

export type Tab = "supply" | "staffing" | "turnover" | "rural";
