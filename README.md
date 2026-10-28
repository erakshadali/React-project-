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

## Admin password

Set `VITE_ADMIN_PASSWORD` in a `.env` file. The default is `dreamy123`, so change it.

## Important limitation

Books are stored in the browser (IndexedDB), so books added in the admin are only visible on the
device that added them. The admin login is a client-side gate, not real security. To let every
visitor see the books and to protect the admin, move storage to a backend (e.g. Supabase: a `books`
table plus Storage for covers, with auth for the admin).

## Scripts

`npm run dev`, `npm run build`, `npm run lint`
