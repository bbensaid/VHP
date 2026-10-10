import { query } from '/Users/baba/Vermont-Health-Platform/frontend/scripts/_phase8a_lib.mjs';
const r = await query(`*[defined(body)]{_id,_type,"n":count(body),"m":body[_type in ["image","video","videoEmbed","audio","audioBlock","media","embed","youtube","podcast"]]{_key,_type,"a":defined(asset),"u":coalesce(url,src,videoId,file)}}`);
for (const d of r) for (const b of d.m||[]) if (!b.a && !b.u) console.log(d._type, d._id, d.n, b._key, b._type);
console.log('docs', r.length);
