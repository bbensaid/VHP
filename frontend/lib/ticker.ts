import fs from "fs";
import path from "path";

export interface TickerItem {
  label: string;
  value: string;
  trend?: string;
  status?: string;
  type?: "vital" | "bed";
}

export const DEFAULT_TICKER_DATA: TickerItem[] = [
  { label: "VT Health Index",  value: "42/100", trend: "-2.4%", status: "critical" },
  { label: "Hospital Margins", value: "-4.1%",  trend: "DOWN",  status: "warning"  },
  { label: "Workforce Gap",    value: "1,240",  trend: "RISING",status: "warning"  },
];

// ─── Minimal CSV parser (handles double-quoted fields with embedded commas) ───
function parseCSV(content: string): TickerItem[] {
  const lines = content.trim().split(/\r?\n/);
  if (lines.length < 2) return [];

  const headers = lines[0].split(",").map((h) => h.trim());

  return lines
    .slice(1)
    .filter((line) => line.trim())
    .map((line) => {
      // Walk char-by-char to handle quoted fields
      const values: string[] = [];
      let current = "";
      let inQuotes = false;

      for (const ch of line) {
        if (ch === '"') {
          inQuotes = !inQuotes;
        } else if (ch === "," && !inQuotes) {
          values.push(current.trim());
          current = "";
        } else {
          current += ch;
        }
      }
      values.push(current.trim());

      const obj: Record<string, string> = {};
      headers.forEach((h, i) => {
        obj[h] = values[i] ?? "";
      });

      const type = (obj.type as "vital" | "bed") ?? "vital";

      // Bed rows: derive status purely from available/total ratio.
      // The status column in the CSV is ignored for bed rows — it has nothing
      // to do with any other hospital metric.
      let status = obj.status || undefined;
      if (type === "bed") {
        // value format: "N avail"   trend format: "of N beds"
        const available = parseInt(obj.value.replace(/[^0-9]/g, ""), 10);
        const totalMatch = obj.trend.match(/of\s*([\d,]+)/i);
        const total = totalMatch ? parseInt(totalMatch[1].replace(/,/g, ""), 10) : 0;
        if (total > 0) {
          const pct = available / total;
          if (pct < 0.10)      status = "critical"; // < 10% available
          else if (pct < 0.25) status = "warning";  // 10–24% available
          else                 status = "good";      // 25%+ available
        }
      }

      return {
        type,
        label:  obj.label  ?? "",
        value:  obj.value  ?? "",
        trend:  obj.trend  || undefined,
        status,
      };
    })
    .filter((item) => item.label && item.value);
}

// ─── Main export ──────────────────────────────────────────────────────────────
export async function getTickerData(): Promise<TickerItem[]> {
  // 1. CSV spreadsheet (primary source — edit data/vitals.csv to update)
  try {
    const csvPath = path.join(process.cwd(), "data", "vitals.csv");
    const content = fs.readFileSync(csvPath, "utf-8");
    const items = parseCSV(content);
    if (items.length > 0) return items;
  } catch {
    // CSV not present or unreadable — fall through
  }

  // 2. Optional external API (set TICKER_API_URL env var to enable)
  const apiUrl = process.env.TICKER_API_URL;
  if (apiUrl) {
    try {
      const res = await fetch(apiUrl, { next: { revalidate: 60 } });
      if (res.ok) return await res.json();
    } catch {
      // API unreachable — fall through
    }
  }

  // 3. Hardcoded fallback
  return DEFAULT_TICKER_DATA;
}
