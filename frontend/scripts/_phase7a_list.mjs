import { query } from '/Users/baba/Vermont-Health-Platform/frontend/scripts/_phase7a_lib.mjs';
const r = await query(`*[_type in ["academyModule","policyAnalysis"] && (_id match "*vbc*" || slug.current match "*vbc*" || _id match "*capitation*" || slug.current match "*capitation*" || _id match "*aco-*" || slug.current match "*aco-*")]{_id,_type,"slug":slug.current,title,"n":count(body)}`);
for (const d of r.sort((a,b)=>a._id.localeCompare(b._id))) console.log(d._type, d._id, d.slug, d.n, '|', d.title);
