import { createClient } from "@sanity/client";
import { readFileSync } from "fs";
for (const l of readFileSync(".env.local", "utf8").split("\n")) { const m = l.match(/^([A-Z0-9_]+)=(.*)$/); if (m && !process.env[m[1]]) process.env[m[1]] = m[2].replace(/^"|"$/g, ""); }
const c = createClient({ projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID, dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production", apiVersion: "2024-01-01", useCdn: false, token: process.env.SANITY_API_TOKEN || process.env.SANITY_WRITE_TOKEN });
const types = await c.fetch(`array::unique(*[!(_id in path("drafts.**"))]._type)`);
const out = [];
for (const t of types) out.push([t, await c.fetch(`count(*[_type==$t && !(_id in path("drafts.**"))])`, { t })]);
out.sort((a, b) => b[1] - a[1]); for (const [t, n] of out) if (!t.startsWith("sanity.") && !t.startsWith("system.")) console.log(n, t);
