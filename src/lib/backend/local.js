// Fallback backend: books live in this browser only (IndexedDB). Used when Supabase isn't configured.
const DB_NAME = 'dreamy-books'
const STORE = 'books'

const seedBooks = [
  {
    id: 'wanna-be-yours',
    title: 'Wanna Be Yours',
    author: 'sara_wrtss',
    cover: '/covers/wanna-be-yours.jpg',
    genres: ['Fiction', 'Romance', 'Dark Romance'],
    tags: ['18plus', 'agegap', 'darkromance'],
    mature: true,
    status: 'Ongoing',
    blurb: 'Aarav × Aanya | 33 × 22\n\n"I despise you. I hate you with every drop of blood running through my veins."',
    quote: 'I always find what\'s mine. And the world outside doesn\'t get to have you.',
    wattpadUrl: 'https://www.wattpad.com/story/405079731',
    featured: true,
    createdAt: 1,
    chapters: [],
  },
]

function openDb() {
  return new Promise((resolve, reject) => {
    const req = indexedDB.open(DB_NAME, 1)
    req.onupgradeneeded = () => req.result.createObjectStore(STORE, { keyPath: 'id' })
    req.onsuccess = () => resolve(req.result)
    req.onerror = () => reject(req.error)
  })
}

async function tx(mode, fn) {
  const db = await openDb()
  return new Promise((resolve, reject) => {
    const t = db.transaction(STORE, mode)
    const result = fn(t.objectStore(STORE))
    t.oncomplete = () => resolve(result.result)
    t.onerror = () => reject(t.error)
  })
}

const summarize = (b) => ({ ...b, chapters: b.chapters.map((c) => ({ title: c.title, words: c.words ?? c.content.split(/\s+/).length })) })

const SESSION_KEY = 'admin'
// Client-side gate only: not real security. Supabase mode uses real auth.
const ADMIN_PASSWORD = import.meta.env.VITE_ADMIN_PASSWORD || 'dreamy123'

export const localBackend = {
  mode: 'local',
  async listBooks() {
    let all = await tx('readonly', (s) => s.getAll())
    if (all.length === 0) {
      await Promise.all(seedBooks.map((b) => tx('readwrite', (s) => s.put(b))))
      all = seedBooks
    }
    return all.sort((a, b) => b.createdAt - a.createdAt).map(summarize)
  },
  async getBook(id) {
    return tx('readonly', (s) => s.get(id))
  },
  async getChapter(bookId, index) {
    const book = await tx('readonly', (s) => s.get(bookId))
    return book?.chapters[index] ?? null
  },
  async saveBook(book) {
    await tx('readwrite', (s) => s.put(book))
  },
  async unfeatureOthers(id) {
    const all = await tx('readonly', (s) => s.getAll())
    await Promise.all(all.filter((b) => b.featured && b.id !== id).map((b) => tx('readwrite', (s) => s.put({ ...b, featured: false }))))
  },
  async deleteBook(id) {
    await tx('readwrite', (s) => s.delete(id))
  },
  async isAdmin() {
    return sessionStorage.getItem(SESSION_KEY) === 'yes'
  },
  async signIn(_email, password) {
    if (password !== ADMIN_PASSWORD) throw new Error('Wrong password')
    sessionStorage.setItem(SESSION_KEY, 'yes')
  },
  async signOut() {
    sessionStorage.removeItem(SESSION_KEY)
  },
}
