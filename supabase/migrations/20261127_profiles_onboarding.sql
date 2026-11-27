-- /onboarding writes profiles.onboarding_role and profiles.onboarding_complete,
-- which no migration ever created, and it never checked the error, so every
-- onboarding save silently failed. Additive.
alter table public.profiles add column if not exists onboarding_role text;
alter table public.profiles add column if not exists onboarding_complete boolean not null default false;
notify pgrst, 'reload schema';
