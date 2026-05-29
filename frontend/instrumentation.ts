/**
 * instrumentation.ts
 * ──────────────────
 * Next.js server instrumentation hook (stable in Next.js 15+).
 * Runs once in the Node.js process at server startup, before any request.
 *
 * Why this exists:
 *   Async server components (LessonPage, AcademyModuleEngine, etc.) call
 *   notFound() or redirect() to abort a render mid-flight. React's dev-mode
 *   profiler calls performance.mark() at render start and performance.measure()
 *   at render end. When the render is aborted, the end-timestamp can be
 *   numerically earlier than the start mark, causing Node.js to throw:
 *
 *     "Failed to execute 'measure' on 'Performance':
 *      '​LessonPage' cannot have a negative time stamp."
 *
 *   Both Turbopack and Webpack dev modes surface this as a dev-overlay crash.
 *   Patching both performance.measure and performance.mark here suppresses it.
 *   The patch is dev-only and a no-op in production.
 */

function isNegativeTimestampError(e: unknown): boolean {
  const msg = e instanceof Error ? e.message : String(e);
  return (
    msg.includes("negative") ||
    msg.includes("time stamp") ||
    msg.includes("cannot have a negative")
  );
}

export async function register() {
  if (
    process.env.NEXT_RUNTIME === "nodejs" &&
    process.env.NODE_ENV === "development"
  ) {
    const { performance } = await import("perf_hooks");

    const origMeasure = performance.measure.bind(performance);
    const origMark = performance.mark.bind(performance);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (performance as any).measure = function (...args: any[]) {
      try {
        return (origMeasure as (...a: unknown[]) => unknown)(...args);
      } catch (e: unknown) {
        if (isNegativeTimestampError(e)) return;
        throw e;
      }
    };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (performance as any).mark = function (...args: any[]) {
      try {
        return (origMark as (...a: unknown[]) => unknown)(...args);
      } catch (e: unknown) {
        if (isNegativeTimestampError(e)) return;
        throw e;
      }
    };
  }
}
