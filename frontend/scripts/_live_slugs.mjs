import { createClient } from "@supabase/supabase-js";
import { readFileSync, writeFileSync } from "fs";
for (const l of readFileSync(".env.local", "utf8").split("\n")) { const m = l.match(/^([A-Z0-9_]+)=(.*)$/); if (m && !process.env[m[1]]) process.env[m[1]] = m[2].replace(/^"|"$/g, ""); }
const db = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);
const { data: tables } = await db.from("lessons").select("*").limit(1);
let rows = [], from = 0;
for (;;) { const { data, error } = await db.from("lessons").select("*").range(from, from + 999); if (error) { console.log(error.message); break; } rows = rows.concat(data); if (data.length < 1000) break; from += 1000; }
console.log("course_lessons", rows.length, rows[0] ? Object.keys(rows[0]).join(",") : "");
writeFileSync(process.argv[2], JSON.stringify(rows));
