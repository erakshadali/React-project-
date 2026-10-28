import { useCallback, useEffect, useState } from 'react'
import { BooksContext } from './booksContext'
import { backend } from './backend'

export function BooksProvider({ children }) {
  const [books, setBooks] = useState([])
  const [ready, setReady] = useState(false)
  const [error, setError] = useState('')

  const refresh = useCallback(() => backend.listBooks().then(setBooks), [])

  useEffect(() => {
    backend
      .listBooks()
      .then(setBooks)
      .catch((e) => setError(e.message))
      .then(() => setReady(true))
  }, [])

  const saveBook = async (book) => {
    if (book.featured) await backend.unfeatureOthers(book.id)
    await backend.saveBook(book)
    await refresh()
  }
  const deleteBook = async (id) => {
    await backend.deleteBook(id)
    await refresh()
  }

  return (
    <BooksContext.Provider value={{ books, ready, error, saveBook, deleteBook }}>
      {children}
    </BooksContext.Provider>
  )
}
