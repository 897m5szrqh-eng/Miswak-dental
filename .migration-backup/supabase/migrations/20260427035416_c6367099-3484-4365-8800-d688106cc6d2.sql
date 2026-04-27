create table public.appointment_requests (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  phone text not null,
  email text,
  preferred_date text,
  treatment text,
  notes text,
  transcript jsonb,
  created_at timestamptz not null default now()
);

alter table public.appointment_requests enable row level security;

create policy "Anyone can submit an appointment request"
  on public.appointment_requests
  for insert
  to anon, authenticated
  with check (true);

create policy "Authenticated users can view appointment requests"
  on public.appointment_requests
  for select
  to authenticated
  using (true);