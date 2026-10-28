import { useMemo, useState } from 'react'
import { ThemeProvider, CssBaseline } from '@mui/material'
import { getTheme } from './theme'
import { BooksProvider } from './lib/store'
import { useRoute } from './lib/router'
import Layout from './components/Layout'
import Home from './pages/Home'
import BookPage from './pages/BookPage'
import Reader from './pages/Reader'
import Admin from './pages/Admin'

function Routes({ mode }) {
  const [page, id, , chapter] = useRoute()
  if (page === 'admin') return <Admin />
  if (page === 'book' && id && chapter !== undefined) return <Reader id={id} index={Number(chapter)} mode={mode} />
  if (page === 'book' && id) return <BookPage id={id} />
  return <Home />
}

function App() {
  const [mode, setMode] = useState(() => localStorage.getItem('mode') || 'light')
  const theme = useMemo(() => getTheme(mode), [mode])

  const toggleMode = () =>
    setMode((m) => {
      const next = m === 'light' ? 'dark' : 'light'
      localStorage.setItem('mode', next)
      return next
    })

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BooksProvider>
        <Layout mode={mode} onToggleMode={toggleMode}>
          <Routes mode={mode} />
        </Layout>
      </BooksProvider>
    </ThemeProvider>
  )
}

export default App
