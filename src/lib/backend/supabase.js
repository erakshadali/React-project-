import { createClient } from '@supabase/supabase-js'

const url = import.meta.env.VITE_SUPABASE_URL
const key = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY

export const supabase = url && key ? createClient(url, key) : null

const fromRow = (r) => ({
  id: r.id,
  title: r.title,
  author: r.author,
  cover: r.cover_url || '',
  genres: r.genres,
  tags: r.tags,
  mature: r.mature,
  status: r.status,
  blurb: r.blurb,
  quote: r.quote,
  wattpadUrl: r.wattpad_url,
  featured: r.featured,
  createdAt: new Date(r.created_at).getTime(),
  chapters: [...(r.chapters || [])]
    .sort((a, b) => a.position - b.position)
    .map((c) => ({ title: c.title, words: c.words })),
})

const check = ({ data, error }) => {
  if (error) throw new Error(error.message)
  return data
}

async function uploadCover(book) {
  if (!book.cover.startsWith('data:')) return book.cover
  const blob = await (await fetch(book.cover)).blob()
  const path = `${book.id}-${Date.now()}.jpg`
  check(await supabase.storage.from('covers').upload(path, blob, { contentType: 'image/jpeg' }))
  return supabase.storage.from('covers').getPublicUrl(path).data.publicUrl
}

export const supabaseBackend = {
  mode: 'supabase',
  async listBooks() {
    const rows = check(
      await supabase.from('books').select('*, chapters(position, title, words)').order('created_at', { ascending: false }),
    )
    return rows.map(fromRow)
  },
  async getBook(id) {
    const row = check(await supabase.from('books').select('*, chapters(position, title, words, content)').eq('id', id).single())
    const book = fromRow(row)
    book.chapters = [...row.chapters].sort((a, b) => a.position - b.position).map((c) => ({ title: c.title, content: c.content, words: c.words }))
    return book
  },
  async getChapter(bookId, index) {
    const { data, error } = await supabase.from('chapters').select('title, content').eq('book_id', bookId).eq('position', index).maybeSingle()
    if (error) throw new Error(error.message)
    return data
  },
  async saveBook(book) {
    const cover_url = await uploadCover(book)
    check(
      await supabase.from('books').upsert({
        id: book.id, title: book.title, author: book.author, cover_url,
        genres: book.genres, tags: book.tags, mature: book.mature, status: book.status,
        blurb: book.blurb, quote: book.quote, wattpad_url: book.wattpadUrl, featured: book.featured,
      }),
    )
    const rows = book.chapters.map((c, position) => ({
      book_id: book.id, position, title: c.title, content: c.content, words: c.content.split(/\s+/).length,
    }))
    // Insert in batches so very long books don't exceed the request size limit.
    for (let i = 0; i < rows.length; i += 10) {
      check(await supabase.from('chapters').upsert(rows.slice(i, i + 10)))
    }
    check(await supabase.from('chapters').delete().eq('book_id', book.id).gte('position', rows.length))
  },
  async unfeatureOthers(id) {
    check(await supabase.from('books').update({ featured: false }).neq('id', id).eq('featured', true))
  },
  async deleteBook(id) {
    check(await supabase.from('books').delete().eq('id', id))
  },
  async isAdmin() {
    const { data } = await supabase.auth.getUser()
    if (!data.user) return false
    const { data: row } = await supabase.from('admins').select('user_id').eq('user_id', data.user.id).maybeSingle()
    return Boolean(row)
  },
  async signIn(email, password) {
    check(await supabase.auth.signInWithPassword({ email, password }))
    if (!(await this.isAdmin())) {
      await supabase.auth.signOut()
      throw new Error('This account is not an admin')
    }
  },
  async signOut() {
    await supabase.auth.signOut()
  },
}
