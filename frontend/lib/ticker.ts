export const DEFAULT_TICKER_DATA = [
  {
    label: "VT Health Index",
    value: "42/100",
    trend: "-2.4%",
    status: "critical",
  },
  {
    label: "Hospital Margins",
    value: "-4.1%",
    trend: "DOWN",
    status: "warning",
  },
  {
    label: "Workforce Gap",
    value: "1,240",
    trend: "RISING",
    status: "warning",
  },
];

export async function getTickerData() {
  const apiUrl = process.env.TICKER_API_URL;

  if (apiUrl) {
    try {
      const res = await fetch(apiUrl, { next: { revalidate: 60 } });
      if (res.ok) {
        return await res.json();
      }
    } catch (error) {
      console.error("Failed to fetch ticker data:", error);
    }
  }
  return DEFAULT_TICKER_DATA;
}
