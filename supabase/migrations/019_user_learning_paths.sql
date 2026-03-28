-- Migration 019: user_learning_paths
-- Persists personalized learning paths for authenticated users.
-- Replaces localStorage-only storage with cross-device Supabase persistence.

create table if not exists public.user_learning_paths (
  id              bigint generated always as identity primary key,
  user_id         uuid not null references auth.users(id) on delete cascade,
  path_id         text not null,                -- matches SavedPath.id (client-generated UUID)
  path_data       jsonb not null,               -- full SavedPath object (preferences, path, progress, notes)
  last_accessed   timestamptz not null default now(),
  created_at      timestamptz not null default now(),

  constraint user_learning_paths_unique unique (user_id, path_id)
);

-- Index for fast lookups by user
create index if not exists user_learning_paths_user_idx on public.user_learning_paths(user_id);
create index if not exists user_learning_paths_last_accessed_idx on public.user_learning_paths(user_id, last_accessed desc);

-- RLS: users can only see and modify their own paths
alter table public.user_learning_paths enable row level security;

create policy "Users can read own learning paths"
  on public.user_learning_paths for select
  using (auth.uid() = user_id);

create policy "Users can insert own learning paths"
  on public.user_learning_paths for insert
  with check (auth.uid() = user_id);

create policy "Users can update own learning paths"
  on public.user_learning_paths for update
  using (auth.uid() = user_id);

create policy "Users can delete own learning paths"
  on public.user_learning_paths for delete
  using (auth.uid() = user_id);

comment on table public.user_learning_paths is
  'Stores AI-generated personalized learning paths per user. Each row is one learning path (may span multiple weeks). path_data holds the full SavedPath JSON including progress tracking and notes.';
