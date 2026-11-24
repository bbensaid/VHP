import { createClient } from "@sanity/client";
import { readFileSync, writeFileSync } from "fs";
for (const l of readFileSync(".env.local", "utf8").split("\n")) { const m = l.match(/^([A-Z0-9_]+)=(.*)$/); if (m && !process.env[m[1]]) process.env[m[1]] = m[2].replace(/^"|"$/g, ""); }
const c = createClient({ projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID, dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production", apiVersion: "2024-01-01", useCdn: false, token: process.env.SANITY_API_TOKEN || process.env.SANITY_WRITE_TOKEN });
const docs = await c.fetch(`*[!(_id in path("drafts.**")) && !(_type match "sanity.*") && !(_type match "system.*")]`);
writeFileSync(process.argv[2], JSON.stringify(docs));
console.log(docs.length);
