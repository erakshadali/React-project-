# Dreamy Pages

A pastel, dreamy online library built with React, Vite, MUI and framer-motion.

- **Library**: search and filter books, with a featured story on the homepage
- **Book page**: cover, blurb, tags, chapter list, optional Wattpad link
- **Reader**: serif reading view, font size controls, previous/next, 18+ age confirmation for mature books
- **Admin** (`#/admin`): add, edit and delete books; upload a cover; upload a full book

## Uploading a full book

1. Open `#/admin`, sign in, click **+ Add book**.
2. Fill in title, author, genres, tags and blurb, and upload a cover.
3. Upload the manuscript:
   - one `.txt` / `.md` file: split into chapters at lines like `Chapter 1`, `Part 2`, `Prologue`, `Epilogue` or `# Heading`
   - several files: one chapter per file (sorted by file name)
   - or paste the text and click **Add pasted text as chapters**
4. Rename or remove chapters, then **Save book**.

For Word/PDF manuscripts, save or copy the text into a `.txt` file first.

## Backend (Supabase)

With Supabase configured, books, chapters and covers are shared by every visitor, and the admin signs in with a real account.

1. Create a Supabase project and run `supabase/migrations/20261028000000_books.sql` (SQL editor, or `supabase db push`).
   It creates the `books`, `chapters` and `admins` tables, row-level security (everyone reads, only admins write),
   a public `covers` storage bucket, and the first book.
2. In Authentication, create your admin user (email + password), then make them an admin in the SQL editor:
   `insert into public.admins (user_id) select id from auth.users where email = 'you@example.com';`
3. Copy `.env.example` to `.env.local` and fill in `VITE_SUPABASE_URL` and `VITE_SUPABASE_PUBLISHABLE_KEY`
   (Project Settings → API). Restart `npm run dev`.

## Local-only mode

Without those variables the site stores books in the browser (IndexedDB), visible only on that device.
The admin password is `VITE_ADMIN_PASSWORD` (default `dreamy123`) and is a client-side gate, not real security.

## Scripts

`npm run dev`, `npm run build`, `npm run lint`
