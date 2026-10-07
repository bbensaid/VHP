"use client";

// Root-level error boundary: catches errors thrown by app/layout.tsx itself,
// which app/error.tsx cannot (it renders inside the layout). Must render its
// own <html>/<body> because it replaces the root layout.
import * as Sentry from "@sentry/nextjs";
import { useEffect } from "react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    Sentry.captureException(error);
  }, [error]);

  return (
    <html lang="en">
      <body style={{ margin: 0, fontFamily: "system-ui, -apple-system, sans-serif", background: "#f8fafc" }}>
        <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", padding: 16 }}>
          <div style={{ maxWidth: 448, textAlign: "center", background: "#fff", border: "1px solid #e2e8f0", borderRadius: 16, padding: 48 }}>
            <h1 style={{ fontSize: 24, fontWeight: 900, color: "#0f172a", margin: "0 0 8px" }}>Something went wrong</h1>
            <p style={{ fontSize: 14, color: "#64748b", margin: "0 0 24px" }}>
              The page failed to load. Our team has been notified.
            </p>
            <div style={{ display: "flex", gap: 12, justifyContent: "center" }}>
              <button
                onClick={reset}
                style={{ background: "#4f46e5", color: "#fff", fontWeight: 700, fontSize: 14, padding: "10px 20px", borderRadius: 12, border: 0, cursor: "pointer" }}
              >
                Try again
              </button>
              {/* Plain <a>: a full reload is the safest recovery from a root-layout failure. */}
              {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
              <a
                href="/"
                style={{ color: "#334155", fontWeight: 700, fontSize: 14, padding: "10px 20px", borderRadius: 12, border: "1px solid #e2e8f0", textDecoration: "none" }}
              >
                Home
              </a>
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
