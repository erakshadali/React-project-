import { Box, Button, Chip, Container, List, ListItemButton, ListItemText, Paper, Typography } from '@mui/material'
import Grid from '@mui/material/Grid'
import { useBooks } from '../lib/booksContext'
import { href } from '../lib/router'

export default function BookPage({ id }) {
  const { books, ready } = useBooks()
  const book = books.find((b) => b.id === id)

  if (!book) {
    return <Container sx={{ py: 10 }}><Typography>{ready ? 'Book not found.' : 'Loading…'}</Typography></Container>
  }

  const words = book.chapters.reduce((n, c) => n + (c.words || 0), 0)

  return (
    <Container maxWidth="md" sx={{ py: { xs: 4, md: 8 } }}>
      <Grid container spacing={5}>
        <Grid size={{ xs: 12, sm: 4 }}>
          <Box component="img" src={book.cover} alt={book.title}
            sx={{ width: '100%', borderRadius: '20px', boxShadow: '0 20px 45px rgba(143,120,214,.4)' }} />
        </Grid>
        <Grid size={{ xs: 12, sm: 8 }}>
          <Typography variant="h2" sx={{ lineHeight: 1.05 }}>{book.title}</Typography>
          <Typography variant="h6" color="text.secondary" sx={{ fontFamily: 'inherit', mb: 2 }}>by {book.author}</Typography>
          <Typography color="text.secondary" sx={{ mb: 2 }}>
            {book.mature ? 'Mature · ' : ''}{book.status} · {book.chapters.length} parts
            {words ? ` · ~${Math.max(1, Math.round(words / 230))} min read` : ''}
          </Typography>
          <Box sx={{ display: 'flex', gap: 0.75, flexWrap: 'wrap', mb: 1 }}>
            {book.genres.map((g) => <Chip key={g} label={g} color="primary" size="small" />)}
          </Box>
          <Box sx={{ display: 'flex', gap: 0.75, flexWrap: 'wrap', mb: 3 }}>
            {book.tags.map((t) => <Chip key={t} label={`#${t}`} size="small" variant="outlined" />)}
          </Box>
          <Typography sx={{ whiteSpace: 'pre-line', mb: 3 }}>{book.blurb}</Typography>
          <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
            {book.chapters.length > 0 && (
              <Button variant="contained" size="large" href={href('book', book.id, 'read', 0)}>Start reading</Button>
            )}
            {book.wattpadUrl && (
              <Button variant="outlined" size="large" href={book.wattpadUrl} target="_blank" rel="noopener noreferrer">Read on Wattpad</Button>
            )}
          </Box>
        </Grid>
      </Grid>

      <Typography variant="h4" sx={{ mt: 8, mb: 2 }}>Parts</Typography>
      {book.chapters.length === 0 ? (
        <Typography color="text.secondary">Chapters are coming soon ☁️</Typography>
      ) : (
        <Paper sx={{ borderRadius: '20px', overflow: 'hidden' }}>
          <List disablePadding>
            {book.chapters.map((c, i) => (
              <ListItemButton key={i} component="a" href={href('book', book.id, 'read', i)} divider>
                <ListItemText primary={c.title} secondary={`Part ${i + 1}`} />
              </ListItemButton>
            ))}
          </List>
        </Paper>
      )}
    </Container>
  )
}
