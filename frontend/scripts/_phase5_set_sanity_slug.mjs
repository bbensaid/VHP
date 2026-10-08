// Set lessons.sanity_slug to the Sanity slug.current for rows that stored the document _id.
// Usage: node scripts/_phase5_set_sanity_slug.mjs <lessonId>=<slug> ...
import { createClient } from "@supabase/supabase-js";
import fs from "fs";
const env = Object.fromEntries(fs.readFileSync(".env.local","utf8").split("\n").filter(l=>l.includes("=")&&!l.startsWith("#")).map(l=>{const i=l.indexOf("=");return [l.slice(0,i).trim(), l.slice(i+1).trim().replace(/^["']|["']$/g,"")];}));
const db = createClient(env.NEXT_PUBLIC_SUPABASE_URL, env.SUPABASE_SERVICE_ROLE_KEY);
for (const arg of process.argv.slice(2)) {
  const [id, slug] = arg.split("=");
  const q = encodeURIComponent('count(*[_type=="academyModule" && slug.current==$s].body)');
  const n = (await fetch(`https://fxz10xl7.api.sanity.io/v2023-10-01/data/query/production?query=${encodeURIComponent('*[_type=="academyModule" && slug.current==$s][0]{"n":count(body)}')}&$s=${encodeURIComponent(JSON.stringify(slug))}`).then(r=>r.json())).result?.n;
  if (!n || n < 20) { console.log("SKIP", id, slug, "blocks", n); continue; }
  const { error } = await db.from("lessons").update({ sanity_slug: slug }).eq("id", id);
  if (error) { console.log("ERR", id, error.message); continue; }
  const { data } = await db.from("lessons").select("slug,sanity_slug").eq("id", id).single();
  console.log("OK", data.slug, "->", data.sanity_slug, "blocks", n);
}
