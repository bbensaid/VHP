/**
 * Shared formatters for APMDesignLab. Tab-specific constants live in each tab file.
 */

export function fmt(n: number, dec = 0) {
  return n.toLocaleString("en-US", { maximumFractionDigits: dec });
}

export function fmtUSD(n: number) {
  if (Math.abs(n) >= 1_000_000) return `$${(n / 1_000_000).toFixed(1)}M`;
  if (Math.abs(n) >= 1_000) return `$${Math.round(n / 1000)}K`;
  return `$${Math.round(n)}`;
}

export function fmtPct(n: number, dec = 1) {
  return `${n.toFixed(dec)}%`;
}
