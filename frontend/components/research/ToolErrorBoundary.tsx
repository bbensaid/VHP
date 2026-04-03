"use client";

import React from "react";
import { ExclamationTriangleIcon, ArrowPathIcon } from "@heroicons/react/24/outline";

interface Props {
  toolName?: string;
  children: React.ReactNode;
}

interface State {
  hasError: boolean;
  errorMessage: string;
}

export default class ToolErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, errorMessage: "" };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, errorMessage: error?.message ?? "Unknown error" };
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    // Report to Sentry if available (non-blocking)
    try {
      const win = window as Window & { Sentry?: { captureException: (e: Error, ctx: unknown) => void } };
      win.Sentry?.captureException(error, {
        extra: {
          componentStack: info.componentStack,
          tool: this.props.toolName ?? "unknown",
        },
      });
    } catch {
      // Sentry not available — silently ignore
    }
    console.error(`[${this.props.toolName ?? "Research Lab"} Error]`, error, info);
  }

  reset() {
    this.setState({ hasError: false, errorMessage: "" });
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex flex-col items-center justify-center min-h-[320px] px-6 py-12 text-center bg-slate-50 rounded-2xl border border-slate-200">
          <div className="w-14 h-14 bg-amber-50 border border-amber-200 rounded-full flex items-center justify-center mb-4">
            <ExclamationTriangleIcon className="w-7 h-7 text-amber-500" />
          </div>
          <h3 className="text-base font-black text-slate-900 mb-1">
            {this.props.toolName ? `${this.props.toolName} encountered an error` : "Tool error"}
          </h3>
          <p className="text-sm text-slate-500 mb-1 max-w-sm">
            This can happen with invalid inputs or extreme values. Reset the tool to try again.
          </p>
          {this.state.errorMessage && (
            <p className="text-xs font-mono text-rose-500 bg-rose-50 border border-rose-100 rounded-lg px-3 py-1.5 mb-5 max-w-sm break-all">
              {this.state.errorMessage}
            </p>
          )}
          <button
            onClick={() => this.reset()}
            className="flex items-center gap-2 px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-bold rounded-xl transition-colors"
          >
            <ArrowPathIcon className="w-4 h-4" />
            Reset Tool
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
