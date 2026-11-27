-- Tables used by backend/routers/vermont_ops.py (/bed-capacity page) and the AI
-- Analyst's bed-capacity tool. No migration ever created them, so every bed
-- update, transfer log entry and flag on /bed-capacity failed with a 500.
-- Accessed only by the backend's service-role client (RLS on, no client
-- policies), which is the only caller.

create table if not exists public.vt_bed_capacity (
  hospital_id      text primary key,
  icu_total        int, icu_avail        int,
  medsurg_total    int, medsurg_avail    int,
  behavioral_total int, behavioral_avail int,
  snf_total        int, snf_avail        int,
  notes            text,
  updated_by       text,
  updated_at       timestamptz not null default now()
);

create table if not exists public.vt_capacity_alerts (
  id          uuid primary key default gen_random_uuid(),
  hospital_id text not null,
  bed_type    text not null,
  avail       int,
  total       int,
  pct         int,
  severity    text,
  message     text,
  resolved    boolean not null default false,
  created_at  timestamptz not null default now(),
  unique (hospital_id, bed_type)
);

create table if not exists public.vt_transfer_log (
  id            uuid primary key default gen_random_uuid(),
  from_hospital text not null,
  to_hospital   text not null,
  patient_label text not null,
  acuity        text not null,
  specialty     text,
  status        text not null default 'initiated',
  notes         text,
  created_by    text,
  created_at    timestamptz not null default now()
);
create index if not exists vt_transfer_log_created_idx on public.vt_transfer_log (created_at desc);

create table if not exists public.vt_flags (
  id          uuid primary key default gen_random_uuid(),
  hospital_id text,
  category    text not null,
  title       text not null,
  description text not null,
  severity    text not null default 'medium',
  status      text not null default 'open',
  assigned_to text,
  resolution  text,
  created_by  text,
  created_at  timestamptz not null default now(),
  updated_by  text,
  updated_at  timestamptz
);
create index if not exists vt_flags_status_idx on public.vt_flags (status, created_at desc);

-- Backend's ingest endpoint records job status here (non-fatal if absent; now present).
create table if not exists public.ingest_jobs (
  id          text primary key,
  status        text not null,
  started_at    timestamptz,
  completed_at  timestamptz,
  error_message text,
  created_at    timestamptz not null default now()
);

alter table public.vt_bed_capacity    enable row level security;
alter table public.vt_capacity_alerts enable row level security;
alter table public.vt_transfer_log    enable row level security;
alter table public.vt_flags           enable row level security;
alter table public.ingest_jobs        enable row level security;

notify pgrst, 'reload schema';
