/**
 * Supabase clients for data fetching.
 * - `db`         — anon client (respects RLS, safe in browser and server components)
 * - `dbAdmin`    — service-role client (bypasses RLS, server-side only)
 */
import { createClient, type SupabaseClient } from "@supabase/supabase-js";

// Anon client — use in React Server Components and client components
export const db = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

// Service-role client — use ONLY in server-side code (API routes, server actions)
// Never import this in client components or expose to the browser
// Created on first use: `next build` imports API routes to collect page data,
// and CI builds without SUPABASE_SERVICE_ROLE_KEY — an eager client throws there.
let adminClient: SupabaseClient | null = null;
export const dbAdmin = new Proxy({} as SupabaseClient, {
  get(_target, prop) {
    adminClient ??= createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );
    const value = Reflect.get(adminClient, prop, adminClient);
    return typeof value === "function" ? value.bind(adminClient) : value;
  },
});
