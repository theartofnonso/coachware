-- PAR-Q (Physical Activity Readiness) submissions from /par-q

create table if not exists public.par_q_submissions (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  payload jsonb not null
);

create index if not exists par_q_submissions_created_at_idx
  on public.par_q_submissions (created_at desc);

alter table public.par_q_submissions enable row level security;
