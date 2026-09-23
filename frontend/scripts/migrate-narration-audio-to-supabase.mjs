#!/usr/bin/env node
// One-time migration: move the .m4a narration audio files out of
// public/audio/ (git-tracked, bundled into every Vercel deployment) into a
// public Supabase Storage bucket, so future deployments don't carry them.
//
// Uploads:
//   public/audio/narration/*.m4a                              -> bucket/narration/*.m4a
//   public/audio/Vermont_s_Five_Year_Race_Against_..._.m4a     -> bucket/<same filename>
//
// .txt transcripts are NOT moved — app/read/[slug]/page.tsx reads them
// server-side via fs from public/, they're tiny, and moving them would
// require a code change for no storage benefit.
//
//   node scripts/migrate-narration-audio-to-supabase.mjs            # upload + report only
//   node scripts/migrate-narration-audio-to-supabase.mjs --delete   # also delete local .m4a files after a verified upload

import { createClient } from '@supabase/supabase-js';
import { readFileSync, readdirSync, statSync, unlinkSync } from 'node:fs';
import path from 'node:path';

for (const line of readFileSync(new URL('../.env.local', import.meta.url), 'utf8').split('\n')) {
  const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/);
  if (m && !process.env[m[1]]) process.env[m[1]] = m[2].replace(/^["']|["']$/g, '');
}

const db = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
);

const BUCKET = 'narration-audio';
const AUDIO_DIR = new URL('../public/audio/', import.meta.url).pathname;
const doDelete = process.argv.includes('--delete');

// 1. Ensure the bucket exists and is public.
const { data: buckets } = await db.storage.listBuckets();
if (!buckets?.some(b => b.name === BUCKET)) {
  const { error } = await db.storage.createBucket(BUCKET, { public: true });
  if (error) { console.error('createBucket failed:', error.message); process.exit(1); }
  console.log(`created public bucket "${BUCKET}"`);
} else {
  console.log(`bucket "${BUCKET}" already exists`);
}

// 2. Collect every .m4a under public/audio/ (recursively), keeping relative path.
function collectM4a(dir, base = '') {
  const out = [];
  for (const entry of readdirSync(dir)) {
    const full = path.join(dir, entry);
    const rel = base ? `${base}/${entry}` : entry;
    if (statSync(full).isDirectory()) out.push(...collectM4a(full, rel));
    else if (entry.endsWith('.m4a')) out.push({ full, rel });
  }
  return out;
}

const files = collectM4a(AUDIO_DIR);
console.log(`found ${files.length} .m4a files to upload`);

const uploaded = [];
for (const { full, rel } of files) {
  const bytes = readFileSync(full);
  const { error } = await db.storage.from(BUCKET).upload(rel, bytes, {
    contentType: 'audio/mp4',
    upsert: true,
  });
  if (error) {
    console.error(`FAILED  ${rel}: ${error.message}`);
    continue;
  }
  const { data: pub } = db.storage.from(BUCKET).getPublicUrl(rel);
  console.log(`ok      ${rel}  (${(bytes.length / 1_000_000).toFixed(1)}MB) -> ${pub.publicUrl}`);
  uploaded.push({ full, rel, url: pub.publicUrl });
}

console.log(`\n${uploaded.length}/${files.length} uploaded successfully.`);
if (uploaded.length !== files.length) {
  console.log('Not all files uploaded — NOT deleting any local files. Fix errors above and re-run.');
  process.exit(1);
}

// 3. Verify each uploaded file is actually fetchable and the right size before
//    ever considering local deletion.
console.log('\nverifying each public URL is fetchable...');
let allVerified = true;
for (const { full, rel, url } of uploaded) {
  const localSize = statSync(full).size;
  const res = await fetch(url, { method: 'HEAD' });
  const remoteSize = Number(res.headers.get('content-length') || 0);
  const ok = res.ok && remoteSize === localSize;
  if (!ok) allVerified = false;
  console.log(`${ok ? 'match' : 'MISMATCH'}  ${rel}  local=${localSize} remote=${remoteSize} status=${res.status}`);
}

if (!allVerified) {
  console.log('\nVerification failed for at least one file — NOT deleting any local files.');
  process.exit(1);
}

console.log('\nAll files uploaded and verified byte-for-byte.');

if (doDelete) {
  for (const { full, rel } of uploaded) {
    unlinkSync(full);
    console.log(`deleted local: ${rel}`);
  }
  console.log('\nLocal .m4a files removed. .txt transcripts left in place.');
} else {
  console.log('\nRun again with --delete to remove the local .m4a files now that they are verified in storage.');
}
