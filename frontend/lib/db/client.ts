/**
 * Supabase clients for data fetching.
 * - `db`         — anon client (respects RLS, safe in browser and server components)
 * - `dbAdmin`    — service-role client (bypasses RLS, server-side only)
 */
import { createClient, type SupabaseClient } from "@supabase/supabase-js";

// Both clients are created on first use: `next build` imports every API route
// to collect page data, and CI builds without Supabase secrets — an eager
// createClient() throws there ("supabaseUrl is required").
function lazyClient(url: () => string, key: () => string): SupabaseClient {
  let client: SupabaseClient | null = null;
  return new Proxy({} as SupabaseClient, {
    get(_target, prop) {
      client ??= createClient(url(), key());
      const value = Reflect.get(client, prop, client);
      return typeof value === "function" ? value.bind(client) : value;
    },
  });
}

// Anon client — use in React Server Components and client components
export const db = lazyClient(
  () => process.env.NEXT_PUBLIC_SUPABASE_URL!,
  () => process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

// Service-role client — use ONLY in server-side code (API routes, server actions)
// Never import this in client components or expose to the browser
export const dbAdmin = lazyClient(
  () => process.env.NEXT_PUBLIC_SUPABASE_URL!,
  () => process.env.SUPABASE_SERVICE_ROLE_KEY!
);
