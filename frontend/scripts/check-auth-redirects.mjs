// Does Supabase accept each live domain as a return address for auth emails and
// Google sign-in? A domain that is not on Supabase's Redirect URLs allowlist is
// silently replaced by the Site URL (found 2026-11-27: http://localhost:3000, so
// every confirmation and reset email on the live site pointed at localhost).
// Run from frontend/:  node scripts/check-auth-redirects.mjs   (exit 1 on any failure)
// Uses a recovery link for a throwaway address that it creates and deletes; no email is sent.
import fs from "fs";
import { createClient } from "@supabase/supabase-js";
const env = Object.fromEntries(fs.readFileSync(".env.local", "utf8").split("\n").filter((l) => l.includes("=") && !l.startsWith("#")).map((l) => { const i = l.indexOf("="); return [l.slice(0, i).trim(), l.slice(i + 1).trim().replace(/^"|"$/g, "")]; }));
const admin = createClient(env.NEXT_PUBLIC_SUPABASE_URL, env.SUPABASE_SERVICE_ROLE_KEY, { auth: { persistSession: false } });
const email = `htr-redirect-check-${Date.now()}@example.com`;
const { data: created, error: ce } = await admin.auth.admin.createUser({ email, email_confirm: true });
if (ce) { console.error(ce.message); process.exit(1); }
let bad = 0;
try {
  for (const d of ["healthtransformationreview.org", "www.healthtransformationreview.org", "healthtransformationreview.com", "www.healthtransformationreview.com", "healthtransformationsolutions.org", "www.healthtransformationsolutions.org", "healthtransformationsolutions.com", "www.healthtransformationsolutions.com"]) {
    for (const p of ["/auth/callback?next=/onboarding", "/auth/callback?next=/reset-password"]) {
      const want = `https://${d}${p}`;
      const { data, error } = await admin.auth.admin.generateLink({ type: "recovery", email, options: { redirectTo: want } });
      const got = error ? `ERROR ${error.message}` : new URL(data.properties.action_link).searchParams.get("redirect_to");
      const ok = got === want;
      if (!ok) bad++;
      console.log(`${ok ? "OK  " : "FAIL"} ${want}${ok ? "" : `  ->  ${got}`}`);
    }
  }
} finally {
  await admin.auth.admin.deleteUser(created.user.id);
}
process.exit(bad ? 1 : 0);
