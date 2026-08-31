-- Supabase Postgres — Kuyakhanya FM v2 (free tier)
-- Run in Supabase → SQL Editor. Also works for Strapi Postgres.
-- This schema is for auxiliary tables (contact submissions, analytics) —
-- DatoCMS remains primary CMS. Strapi uses its own Strapi-generated tables.

-- Contact submissions (from frontend Contact form)
create table if not exists public.contact_submissions (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  phone text,
  subject text,
  message text not null,
  created_at timestamptz not null default now()
);
alter table public.contact_submissions enable row level security;
create policy "allow inserts for anon" on public.contact_submissions for insert to anon with check (true);
create policy "allow reads for service_role" on public.contact_submissions for select to service_role using (true);

-- Newsletter / join requests
create table if not exists public.join_requests (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  phone text,
  interest text, -- e.g. Presenter, Volunteer, Intern
  message text,
  created_at timestamptz not null default now()
);
alter table public.join_requests enable row level security;
create policy "join inserts anon" on public.join_requests for insert to anon with check (true);
create policy "join reads service_role" on public.join_requests for select to service_role using (true);

-- News view counter (optional analytics)
create table if not exists public.news_views (
  id uuid primary key default gen_random_uuid(),
  slug text not null,
  viewed_at timestamptz not null default now(),
  ip_hash text
);
alter table public.news_views enable row level security;
create policy "news views inserts anon" on public.news_views for insert to anon with check (true);

-- Services enquiries
create table if not exists public.service_enquiries (
  id uuid primary key default gen_random_uuid(),
  service_slug text not null,
  name text not null,
  email text not null,
  message text not null,
  created_at timestamptz not null default now()
);
alter table public.service_enquiries enable row level security;
create policy "service enquiries anon insert" on public.service_enquiries for insert to anon with check (true);

-- For Strapi Postgres (if using Strapi): Strapi auto-creates its tables;
-- just ensure connection pooling (port 6543) and set DATABASE_SSL=true in .env.
