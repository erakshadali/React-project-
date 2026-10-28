import { useEffect, useState } from 'react'

// Tiny hash router: "#/book/my-book/read/2" -> ['book', 'my-book', 'read', '2']
export function useRoute() {
  const read = () => window.location.hash.replace(/^#\/?/, '').split('/').filter(Boolean)
  const [parts, setParts] = useState(read)
  useEffect(() => {
    const on = () => {
      setParts(read())
      window.scrollTo(0, 0)
    }
    window.addEventListener('hashchange', on)
    return () => window.removeEventListener('hashchange', on)
  }, [])
  return parts
}

export const href = (...parts) => `#/${parts.join('/')}`
