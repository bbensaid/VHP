// Apply an RHT profile rebuild batch (book-audit/deep/content/rht_batchN.json) to Sanity rhtState docs.
// Sets description, initiatives, strategicFocus from the CMS abstract; removes the unsourced metrics array. Backs up each doc.
import fs from 'fs';
const env = Object.fromEntries(fs.readFileSync('.env.local','utf8').split('\n').filter(l=>l.includes('=')).map(l=>{const i=l.indexOf('=');return [l.slice(0,i).trim(), l.slice(i+1).trim().replace(/^["']|["']$/g,'')]}));
const API=`https://${env.NEXT_PUBLIC_SANITY_PROJECT_ID}.api.sanity.io/v2023-10-01/data`; const H={Authorization:`Bearer ${env.SANITY_API_TOKEN}`,'Content-Type':'application/json'};
const go=async(q)=>(await (await fetch(`${API}/query/production?query=${encodeURIComponent(q)}`,{headers:H})).json()).result;
const B=JSON.parse(fs.readFileSync(process.argv[2],'utf8'));
const muts=[];
for (const [st,b] of Object.entries(B)) {
  const d=await go(`*[_type=="rhtState" && stateName==$s][0]`.replace('$s',JSON.stringify(st)));
  if(!d){console.log('MISSING',st);continue;}
  fs.writeFileSync(`../sanity-backups/rhtState-${d._id}-${Date.now()}.json`, JSON.stringify(d,null,1));
  muts.push({patch:{id:d._id,set:{description:b.description,strategicFocus:b.focus,initiatives:b.initiatives.map(([t,x],i)=>({_key:'ini-'+i,title:t,description:x}))},unset:['metrics']}});
}
const r=await fetch(`${API}/mutate/production`,{method:'POST',headers:H,body:JSON.stringify({mutations:muts})});
console.log('patched',muts.length,'status',r.status);
