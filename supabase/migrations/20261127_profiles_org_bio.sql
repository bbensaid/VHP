-- /account/profile reads and writes profiles.org_name and profiles.bio, but the
-- live table only ever had (id, email, full_name, avatar_url, updated_at), so
-- every save failed with "Could not find the 'bio' column of 'profiles' in the
-- schema cache". Additive and nullable; existing RLS (own-row select/update)
-- already covers the new columns.
alter table public.profiles add column if not exists org_name text;
alter table public.profiles add column if not exists bio text;
notify pgrst, 'reload schema';
