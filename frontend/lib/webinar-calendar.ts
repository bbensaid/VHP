// Shared date logic for the webinar list, detail page and .ics download.
// Status is derived from the event's date, so an editor never has to flip
// a field when an event ends.

export const DEFAULT_WEBINAR_MINUTES = 60;

/** "60 Min", "45 minutes", "1.5 hours", "90" → minutes. Falls back to 60. */
export function durationMinutes(duration?: string | null): number {
  if (!duration) return DEFAULT_WEBINAR_MINUTES;
  const m = duration.match(/(\d+(?:\.\d+)?)\s*(h|hr|hrs|hour|hours)?/i);
  if (!m) return DEFAULT_WEBINAR_MINUTES;
  const n = parseFloat(m[1]);
  return Math.round(m[2] ? n * 60 : n) || DEFAULT_WEBINAR_MINUTES;
}

/** An event stays "upcoming" until it has finished, not merely started. */
export function isUpcoming(date: string, duration?: string | null, now = Date.now()): boolean {
  const start = new Date(date).getTime();
  if (Number.isNaN(start)) return false;
  return start + durationMinutes(duration) * 60_000 > now;
}

function icsStamp(d: Date): string {
  return d.toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "");
}

function icsEscape(s: string): string {
  return s.replace(/\\/g, "\\\\").replace(/;/g, "\\;").replace(/,/g, "\\,").replace(/\r?\n/g, "\\n");
}

export interface CalendarEvent {
  slug: string;
  title: string;
  date: string;
  duration?: string | null;
  description?: string | null;
  url: string;
}

export function buildIcs(ev: CalendarEvent): string {
  const start = new Date(ev.date);
  const end = new Date(start.getTime() + durationMinutes(ev.duration) * 60_000);
  const lines = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//HTR Academy//Webinars//EN",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    "BEGIN:VEVENT",
    `UID:webinar-${ev.slug}@htr-academy`,
    `DTSTAMP:${icsStamp(new Date())}`,
    `DTSTART:${icsStamp(start)}`,
    `DTEND:${icsStamp(end)}`,
    `SUMMARY:${icsEscape(ev.title)}`,
    `DESCRIPTION:${icsEscape([ev.description ?? "", ev.url].filter(Boolean).join("\n\n"))}`,
    `URL:${ev.url}`,
    "END:VEVENT",
    "END:VCALENDAR",
  ];
  return lines.join("\r\n") + "\r\n";
}
