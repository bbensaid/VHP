import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { createClient } from "@supabase/supabase-js";
const __dir = path.dirname(fileURLToPath(import.meta.url));
const env = fs.readFileSync(path.join(__dir, "../.env.local"), "utf8");
for (const l of env.split("\n")) { const m = l.match(/^\s*([A-Z0-9_]+)\s*=\s*(.+?)\s*$/); if (m) process.env[m[1]] = m[2].replace(/^["']|["']$/g, ""); }
const OUT = path.join(__dir, "../../sanity-backups/phase9-2026-10-10");
const tag = process.argv[2] || "pre";
const db = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);
const q = encodeURIComponent('*[_id in ["ehr-business-case-roi","drafts.ehr-business-case-roi"] || slug.current=="ehr-business-case-roi"]');
const r = await fetch(`https://fxz10xl7.api.sanity.io/v2021-06-07/data/query/production?query=${q}`, { headers: { Authorization: `Bearer ${process.env.SANITY_API_TOKEN}` } });
const docs = (await r.json()).result;
fs.writeFileSync(path.join(OUT, `sanity_ehr-business-case-roi.${tag}.json`), JSON.stringify(docs, null, 2));
const { data, error } = await db.from("lessons").select("*").eq("slug", "ehr-business-case-roi");
if (error) { console.error(error); process.exit(1); }
fs.writeFileSync(path.join(OUT, `supabase_lesson_ehr-business-case-roi.${tag}.json`), JSON.stringify(data, null, 2));
const { data: tr } = await db.from("tracks").select("id,slug,title,course_id,order,is_published").eq("id", data[0].track_id);
const { data: c } = await db.from("courses").select("id,slug,title").eq("id", tr[0].course_id);
const { data: sib } = await db.from("lessons").select("slug,order,sanity_slug").eq("track_id", tr[0].id).order("order");
const { data: qz } = await db.from("quizzes").select("id").eq("lesson_id", data[0].id);
console.log(JSON.stringify({ sanityDocs: docs.map(d => ({ id: d._id, n: (d.body || []).length })), rows: data.map(x => ({ id: x.id, order: x.order, sanity_slug: x.sanity_slug, cb: (x.content_blocks || []).length, pub: x.is_published })), track: tr, course: c, siblings: sib, quizzes: qz }, null, 1));
