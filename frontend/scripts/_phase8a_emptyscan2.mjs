import fs from 'fs';
import { db } from './_phase8a_lib.mjs';
const MEDIA = /^(image|video|videoEmbed|audio|audioBlock|media|embed|youtube|podcast|audio_slot|image_placeholder|figure)$/;
const empty = b => !b.asset && !b.url && !b.src && !b.videoId && !b.file && !b.image_url && !b.audio_url && !b.video_url;
const hits = [];
const visit = (v, where) => { if (Array.isArray(v)) v.forEach(x => visit(x, where)); else if (v && typeof v === 'object') { if (typeof v._type === 'string' && MEDIA.test(v._type) && empty(v)) hits.push([where, v._type, v._key, JSON.stringify(v).slice(0,120)]); if (typeof v.type === 'string' && MEDIA.test(v.type) && empty(v) && empty(v.data||{})) hits.push([where, 'type:'+v.type, v.id, JSON.stringify(v).slice(0,120)]); Object.values(v).forEach(x => visit(x, where)); } };
let f = 0; for (;;) { const { data } = await db.from('lessons').select('id,slug,content_blocks').range(f, f+999); data.forEach(r => visit(r.content_blocks, 'supabase '+r.slug)); if (data.length < 1000) break; f += 1000; }
const scan = d => { for (const e of fs.readdirSync(d, { withFileTypes: true })) { const p = d + '/' + e.name; if (e.isDirectory()) { if (e.name !== 'node_modules') scan(p); } else if (p.endsWith('.json')) { try { visit(JSON.parse(fs.readFileSync(p,'utf8')), p); } catch {} } } };
['content','sanity'].forEach(scan);
hits.forEach(h => console.log(h.join(' | '))); console.log('hits', hits.length);
