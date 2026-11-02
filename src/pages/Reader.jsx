import { useEffect, useState } from 'react'
import { Box, Button, Container, IconButton, Typography } from '@mui/material'
import Grid from '@mui/material/Grid'
import TextIncreaseIcon from '@mui/icons-material/TextIncrease'
import TextDecreaseIcon from '@mui/icons-material/TextDecrease'
import { motion, useScroll, useSpring } from 'framer-motion'
import { useBooks } from '../lib/booksContext'
import { backend } from '../lib/backend'
import { href } from '../lib/router'

export default function Reader({ id, index }) {
  const { books, ready } = useBooks()
  const [size, setSize] = useState(() => Number(localStorage.getItem('fontSize')) || 19)
  const [adult, setAdult] = useState(() => sessionStorage.getItem('adult') === 'yes')
  const { scrollYProgress } = useScroll()
  const bar = useSpring(scrollYProgress, { stiffness: 140, damping: 26 })

  const [loaded, setLoaded] = useState({ key: '', chapter: null })
  const book = books.find((b) => b.id === id)
  const key = `${id}/${index}`
  const chapter = loaded.key === key ? loaded.chapter : null
  const adultOk = !book?.mature || adult

  useEffect(() => {
    if (!book || !adultOk) return
    let cancelled = false
    backend.getChapter(id, index).then((c) => !cancelled && setLoaded({ key, chapter: c }))
    return () => { cancelled = true }
  }, [id, index, key, book, adultOk])

  useEffect(() => { window.scrollTo({ top: 0 }) }, [key])

  if (book && book.mature && !adult) {
    return (
      <Container maxWidth="sm" sx={{ py: 10, textAlign: 'center' }}>
        <Typography variant="h3" gutterBottom>18+ content</Typography>
        <Typography color="text.secondary" sx={{ mb: 4 }}>
          “{book.title}” contains mature themes. Please confirm you are 18 or older to continue.
        </Typography>
        <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
          <Button variant="contained" size="large"
            onClick={() => { sessionStorage.setItem('adult', 'yes'); setAdult(true) }}>I am 18 or older</Button>
          <Button variant="outlined" size="large" href={href()}>Take me back</Button>
        </Box>
      </Container>
    )
  }

  if (!book || !chapter) {
    const missing = ready && (!book || index >= book.chapters.length || index < 0)
    return <Container sx={{ py: 10 }}><Typography>{missing ? 'This part was not found.' : 'Loading…'}</Typography></Container>
  }

  const zoom = (d) => {
    const next = Math.min(28, Math.max(14, size + d))
    setSize(next)
    localStorage.setItem('fontSize', String(next))
  }
  const paragraphs = chapter.content.split(/\n\s*\n/)
  const total = book.chapters.length

  return (
    <>
      <motion.div style={{ scaleX: bar, transformOrigin: '0 50%', position: 'fixed', left: 0, right: 0, bottom: 0, height: 4, zIndex: 1300, background: 'linear-gradient(90deg,#F0A3C4,#9B83E0,#C8A15B)' }} />
      <Container maxWidth="sm" sx={{ py: { xs: 2, md: 6 }, pb: { xs: 6, md: 8 } }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
          <Button href={href('book', id)} sx={{ flexGrow: 1, justifyContent: 'flex-start', minWidth: 0 }}>
            <Box component="span" sx={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>← {book.title}</Box>
          </Button>
          <IconButton onClick={() => zoom(-1)} aria-label="Smaller text"><TextDecreaseIcon /></IconButton>
          <IconButton onClick={() => zoom(1)} aria-label="Larger text"><TextIncreaseIcon /></IconButton>
        </Box>

        <motion.div key={key} initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <Box sx={{ textAlign: 'center', mb: 5 }}>
            <Typography variant="overline" sx={{ color: '#C8A15B' }}>Part {index + 1} of {total}</Typography>
            <Typography variant="h3" sx={{ fontSize: { xs: '2.3rem', md: '3rem' }, lineHeight: 1.05, mt: 0.5 }}>{chapter.title}</Typography>
            <Box className="ornament" sx={{ mt: 2.5 }}>✦</Box>
          </Box>

          <Box className="reader-text" sx={{ fontFamily: '"Cormorant Garamond", Georgia, serif', fontSize: size, lineHeight: 1.8, fontWeight: 500 }}>
            {paragraphs.map((p, i) => <p key={i} className={i === 0 && p.length > 140 ? 'dropcap' : undefined} style={{ whiteSpace: 'pre-line' }}>{p}</p>)}
          </Box>

          <Box className="ornament" sx={{ mt: 6 }}>✦ ✦ ✦</Box>
        </motion.div>

        <Grid container spacing={2} sx={{ mt: 4 }}>
          <Grid size={6}>
            {index > 0 && <Button fullWidth variant="outlined" size="large" href={href('book', id, 'read', index - 1)}>← Previous</Button>}
          </Grid>
          <Grid size={6}>
            {index < total - 1
              ? <Button fullWidth variant="contained" size="large" href={href('book', id, 'read', index + 1)}>Next →</Button>
              : <Button fullWidth variant="contained" size="large" href={href('book', id)}>The end ✦</Button>}
          </Grid>
        </Grid>
      </Container>
    </>
  )
}
