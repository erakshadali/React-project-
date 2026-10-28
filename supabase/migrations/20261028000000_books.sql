-- Books, chapters and admins for Dreamy Pages. Everyone can read; only admins can write.

create table public.books (
  id text primary key,
  title text not null,
  author text not null,
  cover_url text,
  genres text[] not null default '{}',
  tags text[] not null default '{}',
  mature boolean not null default false,
  status text not null default 'Ongoing',
  blurb text not null default '',
  quote text not null default '',
  wattpad_url text not null default '',
  featured boolean not null default false,
  created_at timestamptz not null default now()
);

create table public.chapters (
  book_id text not null references public.books (id) on delete cascade,
  position int not null,
  title text not null,
  content text not null,
  words int not null default 0,
  primary key (book_id, position)
);

create table public.admins (
  user_id uuid primary key references auth.users (id) on delete cascade
);

alter table public.books enable row level security;
alter table public.chapters enable row level security;
alter table public.admins enable row level security;

-- An admin can see their own row (needed by the policies below); nobody can write admins via the API.
create policy "admins read own row" on public.admins
  for select to authenticated using (user_id = (select auth.uid()));

create policy "books are public" on public.books
  for select to anon, authenticated using (true);
create policy "chapters are public" on public.chapters
  for select to anon, authenticated using (true);

create policy "admins insert books" on public.books
  for insert to authenticated
  with check (exists (select 1 from public.admins a where a.user_id = (select auth.uid())));
create policy "admins update books" on public.books
  for update to authenticated
  using (exists (select 1 from public.admins a where a.user_id = (select auth.uid())))
  with check (exists (select 1 from public.admins a where a.user_id = (select auth.uid())));
create policy "admins delete books" on public.books
  for delete to authenticated
  using (exists (select 1 from public.admins a where a.user_id = (select auth.uid())));

create policy "admins insert chapters" on public.chapters
  for insert to authenticated
  with check (exists (select 1 from public.admins a where a.user_id = (select auth.uid())));
create policy "admins update chapters" on public.chapters
  for update to authenticated
  using (exists (select 1 from public.admins a where a.user_id = (select auth.uid())))
  with check (exists (select 1 from public.admins a where a.user_id = (select auth.uid())));
create policy "admins delete chapters" on public.chapters
  for delete to authenticated
  using (exists (select 1 from public.admins a where a.user_id = (select auth.uid())));

-- Cover images
insert into storage.buckets (id, name, public) values ('covers', 'covers', true)
  on conflict (id) do nothing;

create policy "admins upload covers" on storage.objects
  for insert to authenticated
  with check (bucket_id = 'covers' and exists (select 1 from public.admins a where a.user_id = (select auth.uid())));
create policy "admins update covers" on storage.objects
  for update to authenticated
  using (bucket_id = 'covers' and exists (select 1 from public.admins a where a.user_id = (select auth.uid())));
create policy "admins delete covers" on storage.objects
  for delete to authenticated
  using (bucket_id = 'covers' and exists (select 1 from public.admins a where a.user_id = (select auth.uid())));

-- First book
insert into public.books (id, title, author, cover_url, genres, tags, mature, status, blurb, quote, wattpad_url, featured)
values (
  'wanna-be-yours', 'Wanna Be Yours', 'sara_wrtss', '/covers/wanna-be-yours.jpg',
  '{Fiction,Romance,"Dark Romance"}', '{18plus,agegap,darkromance}', true, 'Ongoing',
  E'Aarav × Aanya | 33 × 22\n\n"I despise you. I hate you with every drop of blood running through my veins."',
  'I always find what''s mine. And the world outside doesn''t get to have you.',
  'https://www.wattpad.com/story/405079731', true
) on conflict (id) do nothing;
