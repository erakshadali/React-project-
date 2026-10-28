import { useCallback, useEffect, useState } from 'react'
import { BooksContext } from './booksContext'

// Books live in the visitor's browser (IndexedDB). See README for moving this to a shared backend.
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

async function fetchBooks() {
  let all = await tx('readonly', (s) => s.getAll())
  if (all.length === 0) {
    await Promise.all(seedBooks.map((b) => tx('readwrite', (s) => s.put(b))))
    all = seedBooks
  }
  return all.sort((a, b) => b.createdAt - a.createdAt)
}

export function BooksProvider({ children }) {
  const [books, setBooks] = useState([])
  const [ready, setReady] = useState(false)

  const refresh = useCallback(() => fetchBooks().then(setBooks), [])

  useEffect(() => {
    fetchBooks()
      .catch(() => seedBooks)
      .then((all) => {
        setBooks(all)
        setReady(true)
      })
  }, [])

  const saveBook = async (book) => {
    await tx('readwrite', (s) => s.put(book))
    await refresh()
  }
  const deleteBook = async (id) => {
    await tx('readwrite', (s) => s.delete(id))
    await refresh()
  }

  return (
    <BooksContext.Provider value={{ books, ready, saveBook, deleteBook }}>
      {children}
    </BooksContext.Provider>
  )
}
