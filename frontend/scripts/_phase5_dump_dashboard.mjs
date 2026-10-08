import { createClient } from "@supabase/supabase-js";
import fs from "fs";
const env = Object.fromEntries(fs.readFileSync(".env.local","utf8").split("\n").filter(l=>l.includes("=")&&!l.startsWith("#")).map(l=>{const i=l.indexOf("=");return [l.slice(0,i).trim(), l.slice(i+1).trim().replace(/^["']|["']$/g,"")];}));
const db = createClient(env.NEXT_PUBLIC_SUPABASE_URL, env.SUPABASE_SERVICE_ROLE_KEY);
const out = {};
for (const t of ["rht_profiles","state_health_metrics","hospitals"]) {
  const { data, error } = await db.from(t).select("*");
  out[t] = error ? { error: error.message } : data;
  console.log(t, error ? error.message : data.length);
}
fs.writeFileSync(process.argv[2], JSON.stringify(out));
