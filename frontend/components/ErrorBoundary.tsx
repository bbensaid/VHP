"use client";

import React from "react";

interface Props {
  children: React.ReactNode;
  /** Optional custom fallback. Defaults to a generic error card. */
  fallback?: React.ReactNode;
  /** Section label shown in the default fallback (e.g. "AI Analyst", "Dashboard") */
  section?: string;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    // Report to Sentry if available
    if (typeof window !== "undefined") {
      import("@sentry/nextjs")
        .then(({ captureException }) => captureException(error, { extra: { componentStack: info.componentStack } }))
        .catch(() => {});
    }
    console.error(`[ErrorBoundary${this.props.section ? ` — ${this.props.section}` : ""}]`, error, info);
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) return this.props.fallback;

      return (
        <div className="flex flex-col items-center justify-center min-h-[200px] p-8 bg-slate-50 border border-slate-200 rounded-xl text-center">
          <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center mb-4">
            <svg className="w-5 h-5 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
            </svg>
          </div>
          <h3 className="font-bold text-slate-800 mb-1">
            {this.props.section ? `${this.props.section} failed to load` : "Something went wrong"}
          </h3>
          <p className="text-sm text-slate-500 mb-4">
            This section encountered an unexpected error. The issue has been reported.
          </p>
          <button
            onClick={() => this.setState({ hasError: false, error: null })}
            className="text-sm font-semibold text-indigo-600 hover:text-indigo-700"
          >
            Try again
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
