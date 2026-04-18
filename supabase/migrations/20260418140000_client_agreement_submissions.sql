-- Signed client coaching agreements from /client-agreement

create table if not exists public.client_agreement_submissions (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  payload jsonb not null
);

create index if not exists client_agreement_submissions_created_at_idx
  on public.client_agreement_submissions (created_at desc);

alter table public.client_agreement_submissions enable row level security;
