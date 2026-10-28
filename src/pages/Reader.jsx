import { useState } from 'react'
import { Box, Button, Container, IconButton, Typography } from '@mui/material'
import Grid from '@mui/material/Grid'
import TextIncreaseIcon from '@mui/icons-material/TextIncrease'
import TextDecreaseIcon from '@mui/icons-material/TextDecrease'
import { useBooks } from '../lib/booksContext'
import { href } from '../lib/router'

export default function Reader({ id, index }) {
  const { books, ready } = useBooks()
  const [size, setSize] = useState(() => Number(localStorage.getItem('fontSize')) || 19)
  const [adult, setAdult] = useState(() => sessionStorage.getItem('adult') === 'yes')

  const book = books.find((b) => b.id === id)
  const chapter = book?.chapters[index]

  if (!book || !chapter) {
    return <Container sx={{ py: 10 }}><Typography>{ready ? 'This part was not found.' : 'Loading…'}</Typography></Container>
  }

  if (book.mature && !adult) {
    return (
      <Container maxWidth="sm" sx={{ py: 10, textAlign: 'center' }}>
        <Typography variant="h3" gutterBottom>18+ content</Typography>
        <Typography color="text.secondary" sx={{ mb: 4 }}>
          “{book.title}” contains mature themes. Please confirm you are 18 or older to continue.
        </Typography>
        <Button variant="contained" size="large" sx={{ mr: 2 }}
          onClick={() => { sessionStorage.setItem('adult', 'yes'); setAdult(true) }}>I am 18 or older</Button>
        <Button variant="outlined" size="large" href={href()}>Take me back</Button>
      </Container>
    )
  }

  const zoom = (d) => {
    const next = Math.min(28, Math.max(14, size + d))
    setSize(next)
    localStorage.setItem('fontSize', String(next))
  }
  const paragraphs = chapter.content.split(/\n\s*\n/)

  return (
    <Container maxWidth="sm" sx={{ py: { xs: 3, md: 6 } }}>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
        <Button href={href('book', id)} sx={{ flexGrow: 1, justifyContent: 'flex-start' }}>← {book.title}</Button>
        <IconButton onClick={() => zoom(-1)} aria-label="Smaller text"><TextDecreaseIcon /></IconButton>
        <IconButton onClick={() => zoom(1)} aria-label="Larger text"><TextIncreaseIcon /></IconButton>
      </Box>

      <Typography variant="overline" color="text.secondary">Part {index + 1} of {book.chapters.length}</Typography>
      <Typography variant="h3" sx={{ mb: 4 }}>{chapter.title}</Typography>

      <Box className="reader-text" sx={{ fontFamily: '"Cormorant Garamond", serif', fontSize: size, lineHeight: 1.8, fontWeight: 500 }}>
        {paragraphs.map((p, i) => <p key={i} style={{ whiteSpace: 'pre-line' }}>{p}</p>)}
      </Box>

      <Grid container spacing={2} sx={{ mt: 6 }}>
        <Grid size={6}>
          {index > 0 && <Button fullWidth variant="outlined" href={href('book', id, 'read', index - 1)}>← Previous</Button>}
        </Grid>
        <Grid size={6}>
          {index < book.chapters.length - 1
            ? <Button fullWidth variant="contained" href={href('book', id, 'read', index + 1)}>Next →</Button>
            : <Button fullWidth variant="contained" href={href('book', id)}>The end ✦</Button>}
        </Grid>
      </Grid>
    </Container>
  )
}
