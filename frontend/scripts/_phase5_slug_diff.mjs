import { createClient } from "@supabase/supabase-js";
import fs from "fs";
const env = Object.fromEntries(fs.readFileSync(".env.local","utf8").split("\n").filter(l=>l.includes("=")&&!l.startsWith("#")).map(l=>{const i=l.indexOf("=");return [l.slice(0,i).trim(), l.slice(i+1).trim().replace(/^["']|["']$/g,"")];}));
const db = createClient(env.NEXT_PUBLIC_SUPABASE_URL, env.SUPABASE_SERVICE_ROLE_KEY);
const probe = JSON.parse(fs.readFileSync(process.argv[2],"utf8"));
const ids = probe.map(p=>p.sanity_slug);
const q = encodeURIComponent('*[_id in $ids]');
const r = await fetch(`https://fxz10xl7.api.sanity.io/v2023-10-01/data/query/production?query=${q}&$ids=${encodeURIComponent(JSON.stringify(ids))}`).then(r=>r.json());
const docs = new Map(r.result.map(d=>[d._id,d]));
const { data: rows } = await db.from("lessons").select("id,content_blocks").in("id", probe.map(p=>p.id));
const rmap = new Map(rows.map(x=>[x.id,x]));
const out = {};
for (const p of probe) {
  const d = docs.get(p.sanity_slug); const row = rmap.get(p.id);
  const pt = (row.content_blocks||[]).find(b=>b.type==="sanity_portable_text");
  const A = JSON.stringify(d.body), B = pt ? JSON.stringify(pt.body) : null;
  let diffs = [];
  if (pt) d.body.forEach((blk,i)=>{ const o = pt.body[i]; if (JSON.stringify(blk)!==JSON.stringify(o)) diffs.push(i); });
  console.log(p.slug, "| sanity==embedded:", A===B, "| differing indices:", diffs.join(","));
  out[p.id] = { doc: d, row };
}
fs.writeFileSync(process.argv[3], JSON.stringify(out));
