import { Box, Button, Chip, Container, Paper, Typography } from '@mui/material'
import Grid from '@mui/material/Grid'
import { motion } from 'framer-motion'
import { useBooks } from '../lib/booksContext'
import { href } from '../lib/router'

function Stat({ value, label }) {
  return (
    <Box sx={{ textAlign: 'center', flex: 1 }}>
      <Typography variant="h5" sx={{ lineHeight: 1 }}>{value}</Typography>
      <Typography variant="caption" color="text.secondary" sx={{ letterSpacing: '.08em', textTransform: 'uppercase' }}>{label}</Typography>
    </Box>
  )
}

export default function BookPage({ id }) {
  const { books, ready } = useBooks()
  const book = books.find((b) => b.id === id)

  if (!book) {
    return <Container sx={{ py: 10 }}><Typography>{ready ? 'Book not found.' : 'Loading…'}</Typography></Container>
  }

  const words = book.chapters.reduce((n, c) => n + (c.words || 0), 0)
  const minutes = words ? Math.max(1, Math.round(words / 230)) : 0
  const hours = minutes >= 90 ? `${(minutes / 60).toFixed(1)} h` : `${minutes} min`

  return (
    <Container maxWidth="md" sx={{ py: { xs: 3, md: 8 } }}>
      <Grid container spacing={{ xs: 4, md: 6 }} alignItems="flex-start">
        <Grid size={{ xs: 12, sm: 4 }} sx={{ display: 'flex', justifyContent: 'center' }}>
          <motion.div initial={{ opacity: 0, y: 24, rotate: -3 }} animate={{ opacity: 1, y: 0, rotate: 0 }} transition={{ duration: 0.8 }} style={{ width: '100%', maxWidth: 260 }}>
            <Box className="shine" sx={{ borderRadius: '8px 20px 20px 8px', boxShadow: '-7px 0 0 rgba(0,0,0,.12) inset, 0 26px 50px rgba(127,104,200,.45)' }}>
              <Box component="img" src={book.cover} alt={book.title} sx={{ display: 'block', width: '100%' }} />
            </Box>
          </motion.div>
        </Grid>
        <Grid size={{ xs: 12, sm: 8 }}>
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.1 }}>
            <Box sx={{ textAlign: { xs: 'center', sm: 'left' } }}>
              <Typography variant="h2" sx={{ lineHeight: 1, fontSize: { xs: '2.8rem', md: '3.8rem' } }}>{book.title}</Typography>
              <Typography variant="h6" color="text.secondary" sx={{ fontFamily: 'inherit', fontWeight: 500, mt: 1, mb: 2.5 }}>by {book.author}</Typography>
            </Box>

            <Paper variant="outlined" sx={{ display: 'flex', py: 1.75, mb: 2.5, borderRadius: '18px', bgcolor: 'transparent', backdropFilter: 'blur(6px)' }}>
              <Stat value={book.chapters.length} label="Parts" />
              {minutes > 0 && <Stat value={hours} label="Read" />}
              <Stat value={book.mature ? '18+' : 'All'} label="Rating" />
              <Stat value={book.status || 'Ongoing'} label="Status" />
            </Paper>

            <Box sx={{ display: 'flex', gap: 0.75, flexWrap: 'wrap', mb: 1, justifyContent: { xs: 'center', sm: 'flex-start' } }}>
              {book.genres.map((g) => <Chip key={g} label={g} color="primary" size="small" />)}
            </Box>
            <Box sx={{ display: 'flex', gap: 0.75, flexWrap: 'wrap', mb: 3, justifyContent: { xs: 'center', sm: 'flex-start' } }}>
              {book.tags.map((t) => <Chip key={t} label={`#${t}`} size="small" variant="outlined" />)}
            </Box>
            <Typography sx={{ whiteSpace: 'pre-line', mb: 3, lineHeight: 1.8, fontSize: '1.02rem' }}>{book.blurb}</Typography>
            <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', justifyContent: { xs: 'center', sm: 'flex-start' } }}>
              {book.chapters.length > 0 && (
                <Button variant="contained" size="large" href={href('book', book.id, 'read', 0)}>Start reading</Button>
              )}
              {book.wattpadUrl && (
                <Button variant="outlined" size="large" href={book.wattpadUrl} target="_blank" rel="noopener noreferrer">Read on Wattpad</Button>
              )}
            </Box>
          </motion.div>
        </Grid>
      </Grid>

      <Box sx={{ textAlign: 'center', mt: { xs: 8, md: 11 }, mb: 3 }}>
        <div className="ornament">✦</div>
        <Typography variant="h4" sx={{ mt: 1 }}>Parts</Typography>
      </Box>
      {book.chapters.length === 0 ? (
        <Typography color="text.secondary" align="center">Chapters are coming soon ☁️</Typography>
      ) : (
        <Box sx={{ display: 'grid', gap: 1.25 }}>
          {book.chapters.map((c, i) => (
            <Paper
              key={i}
              component={motion.a}
              href={href('book', book.id, 'read', i)}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-30px' }}
              transition={{ duration: 0.45, delay: Math.min(i, 6) * 0.04 }}
              whileHover={{ x: 6 }}
              whileTap={{ scale: 0.98 }}
              variant="outlined"
              sx={{ display: 'flex', alignItems: 'center', gap: 2, p: 1.75, borderRadius: '16px', textDecoration: 'none', color: 'inherit', bgcolor: 'background.paper', '&:hover': { borderColor: 'primary.main', boxShadow: '0 8px 24px rgba(127,104,200,.18)' } }}
            >
              <Box sx={{ width: 42, height: 42, flexShrink: 0, borderRadius: '50%', display: 'grid', placeItems: 'center', fontFamily: '"Cormorant Garamond", serif', fontWeight: 700, fontSize: '1.2rem', color: '#3B2F4F', background: 'linear-gradient(135deg,#F9C6DA,#C9B8F0)' }}>
                {i + 1}
              </Box>
              <Box sx={{ minWidth: 0, flexGrow: 1 }}>
                <Typography noWrap sx={{ fontWeight: 700 }}>{c.title}</Typography>
                {c.words > 0 && <Typography variant="caption" color="text.secondary">{Math.max(1, Math.round(c.words / 230))} min read</Typography>}
              </Box>
              <Typography color="primary" aria-hidden="true">→</Typography>
            </Paper>
          ))}
        </Box>
      )}
    </Container>
  )
}
