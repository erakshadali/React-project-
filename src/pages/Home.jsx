import { useMemo, useState } from 'react'
import { Box, Button, Chip, Container, InputAdornment, TextField, Typography } from '@mui/material'
import Grid from '@mui/material/Grid'
import SearchIcon from '@mui/icons-material/Search'
import { motion } from 'framer-motion'
import { useBooks } from '../lib/booksContext'
import { href } from '../lib/router'
import BookCard from '../components/BookCard'

export default function Home() {
  const { books, ready } = useBooks()
  const [query, setQuery] = useState('')
  const [genre, setGenre] = useState('All')

  const featured = books.find((b) => b.featured) || books[0]
  const genres = useMemo(() => ['All', ...new Set(books.flatMap((b) => b.genres))], [books])
  const shown = books.filter(
    (b) =>
      (genre === 'All' || b.genres.includes(genre)) &&
      `${b.title} ${b.author} ${b.tags.join(' ')}`.toLowerCase().includes(query.toLowerCase()),
  )

  return (
    <Container maxWidth="lg" sx={{ py: { xs: 4, md: 8 } }}>
      {featured && (
        <Grid container spacing={6} alignItems="center" sx={{ mb: 10 }}>
          <Grid size={{ xs: 12, md: 7 }}>
            <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
              <Chip label="✦ Featured story" color="secondary" sx={{ mb: 2 }} />
              <Typography variant="h1" sx={{ fontSize: { xs: '3rem', md: '4.8rem' }, lineHeight: 1 }}>
                {featured.title}
              </Typography>
              <Typography variant="h6" color="text.secondary" sx={{ mt: 1, fontFamily: 'inherit' }}>by {featured.author}</Typography>
              {featured.quote && (
                <Typography variant="h5" sx={{ mt: 3, fontStyle: 'italic', fontWeight: 500 }}>“{featured.quote}”</Typography>
              )}
              <Box sx={{ mt: 4, display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                <Button variant="contained" size="large" href={href('book', featured.id)}>Open the story</Button>
                {featured.chapters.length > 0 && (
                  <Button variant="outlined" size="large" href={href('book', featured.id, 'read', 0)}>Start reading</Button>
                )}
              </Box>
            </motion.div>
          </Grid>
          <Grid size={{ xs: 12, md: 5 }} sx={{ textAlign: 'center' }}>
            <Box className="floaty" component="img" src={featured.cover} alt={featured.title}
              sx={{ width: { xs: 220, md: 300 }, aspectRatio: '2 / 3', objectFit: 'cover', borderRadius: '28px', boxShadow: '0 30px 60px rgba(143,120,214,.45)', transform: 'rotate(3deg)' }} />
          </Grid>
        </Grid>
      )}

      <Typography variant="h3" sx={{ mb: 3 }}>The Library</Typography>
      <TextField
        fullWidth
        placeholder="Search by title, author or tag…"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        slotProps={{ input: { startAdornment: <InputAdornment position="start"><SearchIcon /></InputAdornment> } }}
        sx={{ mb: 2, '& .MuiOutlinedInput-root': { borderRadius: '999px', bgcolor: 'background.paper' } }}
      />
      <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mb: 4 }}>
        {genres.map((g) => (
          <Chip key={g} label={g} clickable color={g === genre ? 'primary' : 'default'} onClick={() => setGenre(g)} />
        ))}
      </Box>

      {ready && shown.length === 0 && <Typography color="text.secondary">No books found ☁️</Typography>}
      <Grid container spacing={4}>
        {shown.map((b) => (
          <Grid key={b.id} size={{ xs: 6, sm: 4, md: 3 }}><BookCard book={b} /></Grid>
        ))}
      </Grid>
    </Container>
  )
}
