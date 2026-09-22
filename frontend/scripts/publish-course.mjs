#!/usr/bin/env node
// Report (and optionally set) the publish state of any course, its tracks
// and its lessons in Supabase. Generalized from publish-five-pillars.mjs.
//
//   node scripts/publish-course.mjs <slug>            # report only
//   node scripts/publish-course.mjs <slug> --publish  # publish course + tracks + lessons
//
// The /academy/tracks/[courseSlug] route filters on is_published = true at every
// level, so a course with unpublished tracks still renders empty.

import { createClient } from '@supabase/supabase-js';
import { readFileSync } from 'node:fs';

for (const line of readFileSync(new URL('../.env.local', import.meta.url), 'utf8').split('\n')) {
  const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/);
  if (m && !process.env[m[1]]) process.env[m[1]] = m[2].replace(/^["']|["']$/g, '');
}

const db = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
);

const SLUG = process.argv[2];
const doPublish = process.argv.includes('--publish');

if (!SLUG || SLUG.startsWith('--')) {
  console.error('Usage: node scripts/publish-course.mjs <slug> [--publish]');
  process.exit(1);
}

const { data: course, error } = await db
  .from('courses').select('id, slug, title, is_published').eq('slug', SLUG).maybeSingle();

if (error) { console.error('query failed:', error.message); process.exit(1); }
if (!course) {
  console.error(`No course with slug "${SLUG}" in Supabase.`);
  const { data: all } = await db.from('courses').select('slug, is_published').order('slug');
  console.error('Courses present:', (all || []).map(c => `${c.slug}${c.is_published ? '' : ' (unpublished)'}`).join(', '));
  process.exit(1);
}

const { data: tracks } = await db
  .from('tracks').select('id, title, is_published').eq('course_id', course.id).order("order");
const trackIds = (tracks || []).map(t => t.id);
const { data: lessons } = trackIds.length
  ? await db.from('lessons').select('id, title, is_published, sanity_slug').in('track_id', trackIds)
  : { data: [] };

const un = a => (a || []).filter(r => !r.is_published).length;
console.log(`course  : ${course.title} — is_published=${course.is_published}`);
console.log(`tracks  : ${(tracks || []).length} total, ${un(tracks)} unpublished`);
console.log(`lessons : ${(lessons || []).length} total, ${un(lessons)} unpublished, ` +
            `${(lessons || []).filter(l => !l.sanity_slug).length} missing sanity_slug`);

if (!doPublish) {
  const blocked = !course.is_published || un(tracks) || un(lessons);
  console.log(blocked
    ? `\nRESULT: /academy/tracks/${SLUG} will 404 or render empty.\n` +
      'Re-run with --publish to fix.'
    : '\nRESULT: course is fully published and should render.');
  process.exit(0);
}

await db.from('courses').update({ is_published: true }).eq('id', course.id);
if (trackIds.length) {
  await db.from('tracks').update({ is_published: true }).eq('course_id', course.id);
  await db.from('lessons').update({ is_published: true }).in('track_id', trackIds);
}
console.log('\npublished course + tracks + lessons.');
console.log('Open: https://healthtransformationreview.org/academy/tracks/' + SLUG);
