import { createContext, useContext } from 'react'

export const BooksContext = createContext(null)

export const useBooks = () => useContext(BooksContext)

export const slugify = (s) =>
  s.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '') || `book-${Date.now()}`
