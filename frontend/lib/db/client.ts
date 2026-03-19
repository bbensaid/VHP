/**
 * Supabase clients for data fetching.
 * - `db`         — anon client (respects RLS, safe in browser and server components)
 * - `dbAdmin`    — service-role client (bypasses RLS, server-side only)
 */
import { createClient } from "@supabase/supabase-js";

// Anon client — use in React Server Components and client components
export const db = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

// Service-role client — use ONLY in server-side code (API routes, server actions)
// Never import this in client components or expose to the browser
export const dbAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);
