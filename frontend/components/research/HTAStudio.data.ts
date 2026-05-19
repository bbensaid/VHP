/**
 * Shared formatters for HTAStudio. Tab-specific constants live in each tab file.
 */

export function fmtUSD(n: number): string {
  const abs = Math.abs(n);
  if (abs >= 1_000_000_000) return (n < 0 ? "-$" : "$") + (abs / 1_000_000_000).toFixed(2) + "B";
  if (abs >= 1_000_000)     return (n < 0 ? "-$" : "$") + (abs / 1_000_000).toFixed(2) + "M";
  return (n < 0 ? "-$" : "$") + abs.toLocaleString("en-US", { maximumFractionDigits: 0 });
}

export function fmtNum(n: number, d = 0): string {
  return n.toLocaleString("en-US", { maximumFractionDigits: d });
}

export function fmtPct(n: number, d = 1): string {
  return n.toFixed(d) + "%";
}
