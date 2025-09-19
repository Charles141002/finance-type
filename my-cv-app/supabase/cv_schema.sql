create extension if not exists "uuid-ossp";

-- Table to store user CV data
create table if not exists public.user_cvs (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references auth.users(id) on delete cascade,
  title text not null default 'Mon CV',
  blocks jsonb not null,
  font_scale numeric(4,2) default 1,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index if not exists user_cvs_user_id_idx on public.user_cvs(user_id);

alter table public.user_cvs enable row level security;

-- Allow authenticated users to manage their own CVs
drop policy if exists "Users can insert their CV" on public.user_cvs;
create policy "Users can insert their CV" on public.user_cvs
  for insert
  to authenticated
  with check (auth.uid() = user_id);

drop policy if exists "Users can update their CV" on public.user_cvs;
create policy "Users can update their CV" on public.user_cvs
  for update
  to authenticated
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

drop policy if exists "Users can view their CV" on public.user_cvs;
create policy "Users can view their CV" on public.user_cvs
  for select
  to authenticated
  using (auth.uid() = user_id);

drop policy if exists "Users can delete their CV" on public.user_cvs;
create policy "Users can delete their CV" on public.user_cvs
  for delete
  to authenticated
  using (auth.uid() = user_id);

create or replace function public.sync_user_cvs_timestamps()
returns trigger as $$
begin
  if tg_op = 'INSERT' then
    new.created_at := coalesce(new.created_at, now());
  end if;
  new.updated_at := now();
  return new;
end;
$$ language plpgsql;

drop trigger if exists sync_user_cvs_updated_at on public.user_cvs;
drop trigger if exists sync_user_cvs_timestamps on public.user_cvs;
create trigger sync_user_cvs_timestamps
  before insert or update on public.user_cvs
  for each row execute procedure public.sync_user_cvs_timestamps();
