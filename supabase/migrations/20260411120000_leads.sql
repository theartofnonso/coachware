-- Run via Supabase CLI (`supabase db push`) or paste into SQL Editor (Dashboard).

create table if not exists public.tool_leads (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  tool text not null
    check (tool in (
      'nutrition-timing',
      'weight-progression',
      'calories-calculator'
    )),
  action text not null
    check (action in ('unlock', 'send_email')),
  first_name text not null,
  email text not null,
  result jsonb not null default '{}'::jsonb
);

create index if not exists tool_leads_created_at_idx
  on public.tool_leads (created_at desc);
create index if not exists tool_leads_email_idx
  on public.tool_leads (email);

create table if not exists public.community_signups (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  first_name text not null,
  email text not null
);

create index if not exists community_signups_created_at_idx
  on public.community_signups (created_at desc);
create index if not exists community_signups_email_idx
  on public.community_signups (email);

alter table public.tool_leads enable row level security;
alter table public.community_signups enable row level security;
