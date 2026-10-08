import { createClient } from "@supabase/supabase-js";
import fs from "fs";
const env = Object.fromEntries(fs.readFileSync(".env.local","utf8").split("\n").filter(l=>l.includes("=")&&!l.startsWith("#")).map(l=>{const i=l.indexOf("=");return [l.slice(0,i).trim(), l.slice(i+1).trim().replace(/^["']|["']$/g,"")];}));
const db = createClient(env.NEXT_PUBLIC_SUPABASE_URL, env.SUPABASE_SERVICE_ROLE_KEY);
const re = new RegExp(process.argv[2], "i");
let from=0;
while (true) {
  const { data, error } = await db.from("lessons").select("id,slug,sanity_slug,is_published,track_id,content_blocks,summary,objectives").range(from, from+499);
  if (error) { console.error(error.message); break; }
  for (const l of data) { const s = JSON.stringify(l); const m = s.match(re); if (m) console.log(l.id, l.slug, "sanity_slug=", l.sanity_slug, "pub=", l.is_published, "::", s.slice(Math.max(0,m.index-200), m.index+300)); }
  if (data.length < 500) break; from += 500;
}
