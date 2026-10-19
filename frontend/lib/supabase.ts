// Anon client, created lazily (see lib/db/client.ts) so builds without
// Supabase env vars do not throw at import time.
export { db as supabase } from "@/lib/db/client";
