/**
 * instrumentation.ts
 * ──────────────────
 * Next.js server instrumentation hook (stable in Next.js 15+).
 * Runs once in the Node.js process at server startup, before any request.
 *
 * Why this exists:
 *   AcademyModuleEngine (and other async server components) render in Node.js.
 *   React's dev-mode profiler calls performance.mark() at render start and
 *   performance.measure() at render end. When notFound() aborts a render,
 *   the end-timestamp can be numerically earlier than the start mark, causing
 *   Node.js (which implements the Web Performance API) to throw:
 *
 *     "Failed to execute 'measure' on 'Performance':
 *      '​AcademyModuleEngine' cannot have a negative time stamp."
 *
 *   Turbopack surfaces this Node.js DOMException as a full dev-overlay crash.
 *   Patching here — before React ever renders a page — suppresses it cleanly.
 *   The patch is a dev-only no-op: guarded by NODE_ENV and tree-shaken in prod.
 */

export async function register() {
  if (
    process.env.NEXT_RUNTIME === "nodejs" &&
    process.env.NODE_ENV === "development"
  ) {
    const { performance } = await import("perf_hooks");

    const orig = performance.measure.bind(performance);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (performance as any).measure = function (...args: any[]) {
      try {
        return (orig as (...a: unknown[]) => unknown)(...args);
      } catch (e: unknown) {
        const msg = e instanceof Error ? e.message : String(e);
        // Suppress React profiler errors caused by notFound() or redirect() aborting
        // an in-progress render — the mark start timestamp ends up after the measure
        // end timestamp, producing a "negative time stamp" DOMException. This is
        // harmless: the page/component handled the abort correctly.
        if (
          msg.includes("negative") ||
          msg.includes("time stamp") ||
          msg.includes("cannot have a negative")
        ) {
          return;
        }
        throw e;
      }
    };
  }
}
