// app/login/page.tsx
"use client";

import React from "react";
import Link from "next/link";

const LoginPage: React.FC = () => {
  return (
    <div className="min-h-[80vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-surface-muted">
      <div className="max-w-md w-full space-y-8 bg-surface p-10 rounded-xl shadow-lg border border-ui-border">
        <div className="text-center">
          <h2 className="mt-2 text-3xl font-extrabold text-text-heading">
            Welcome Back
          </h2>
          <p className="mt-2 text-sm text-text-body">
            Or{" "}
            <Link
              href="/subscribe"
              className="font-medium text-ui-primary hover:underline"
            >
              start your 14-day free trial
            </Link>
          </p>
        </div>

        <form className="mt-8 space-y-6" action="#" method="POST">
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="email-address" className="sr-only">
                Email address
              </label>
              <input
                id="email-address"
                name="email"
                type="email"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-3 border border-ui-border placeholder-text-body/50 text-text-heading rounded-t-md focus:outline-none focus:ring-ui-primary focus:border-ui-primary focus:z-10 sm:text-sm"
                placeholder="Email address"
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-3 border border-ui-border placeholder-text-body/50 text-text-heading rounded-b-md focus:outline-none focus:ring-ui-primary focus:border-ui-primary focus:z-10 sm:text-sm"
                placeholder="Password"
              />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 text-ui-primary focus:ring-ui-primary border-ui-border rounded"
              />
              <label
                htmlFor="remember-me"
                className="ml-2 block text-sm text-text-body"
              >
                Remember me
              </label>
            </div>

            <div className="text-sm">
              <a
                href="#"
                className="font-medium text-ui-primary hover:underline"
              >
                Forgot your password?
              </a>
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-bold rounded-md text-ui-text-on-primary bg-ui-primary hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-ui-primary transition shadow-md"
            >
              Sign in
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
