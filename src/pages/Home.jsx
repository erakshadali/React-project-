import { useMemo, useState } from 'react'
import { Box, Button, Chip, Container, InputAdornment, TextField, Typography } from '@mui/material'
import Grid from '@mui/material/Grid'
import SearchIcon from '@mui/icons-material/Search'
import MenuBookIcon from '@mui/icons-material/MenuBookOutlined'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { useBooks } from '../lib/booksContext'
import { href } from '../lib/router'
import BookCard from '../components/BookCard'

function TiltCover({ src, alt }) {
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const rx = useSpring(useTransform(y, [-0.5, 0.5], [10, -10]), { stiffness: 150, damping: 15 })
  const ry = useSpring(useTransform(x, [-0.5, 0.5], [-12, 12]), { stiffness: 150, damping: 15 })

  const move = (e) => {
    const r = e.currentTarget.getBoundingClientRect()
    x.set((e.clientX - r.left) / r.width - 0.5)
    y.set((e.clientY - r.top) / r.height - 0.5)
  }
  const leave = () => { x.set(0); y.set(0) }

  return (
    <Box sx={{ perspective: 900, display: 'inline-block', position: 'relative' }}>
      <Box sx={{ position: 'absolute', inset: '8% -6% -6%', borderRadius: '50%', background: 'radial-gradient(closest-side, rgba(155,131,224,.55), transparent)', filter: 'blur(30px)' }} />
      <motion.div className="floaty" onPointerMove={move} onPointerLeave={leave} style={{ rotateX: rx, rotateY: ry, transformStyle: 'preserve-3d', position: 'relative' }}
        initial={{ opacity: 0, scale: 0.85, rotate: -6 }} animate={{ opacity: 1, scale: 1, rotate: 0 }} transition={{ duration: 0.9, ease: 'easeOut' }}>
        <Box className="shine" sx={{ borderRadius: '10px 24px 24px 10px', boxShadow: '-8px 0 0 rgba(0,0,0,.12) inset, 0 34px 60px rgba(127,104,200,.5)', width: { xs: 210, sm: 250, md: 300 } }}>
          <Box component="img" src={src} alt={alt} sx={{ display: 'block', width: '100%', aspectRatio: '2 / 3', objectFit: 'cover' }} />
        </Box>
      </motion.div>
    </Box>
  )
}

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
    <Container maxWidth="lg" sx={{ py: { xs: 3, md: 8 } }}>
      {featured && (
        <Grid container spacing={{ xs: 4, md: 6 }} alignItems="center" sx={{ mb: { xs: 8, md: 12 } }}>
          <Grid size={{ xs: 12, md: 7 }} sx={{ order: { xs: 2, md: 1 }, textAlign: { xs: 'center', md: 'left' } }}>
            <motion.div initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
              <Typography variant="overline" sx={{ color: '#C8A15B' }}>✦ Featured story ✦</Typography>
              <Typography variant="h1" sx={{ fontSize: { xs: '3.1rem', sm: '4rem', md: '5.2rem' }, lineHeight: 0.98, mt: 1 }}>
                {featured.title}
              </Typography>
              <Typography variant="h6" color="text.secondary" sx={{ mt: 1.5, fontFamily: 'inherit', fontWeight: 500 }}>by {featured.author}</Typography>
              {featured.quote && (
                <Typography variant="h5" sx={{ mt: 3, fontStyle: 'italic', fontWeight: 500, maxWidth: 560, mx: { xs: 'auto', md: 0 } }}>“{featured.quote}”</Typography>
              )}
              {featured.chapters.length > 0 && (
                <Box sx={{ mt: 3, display: 'flex', gap: 1, justifyContent: { xs: 'center', md: 'flex-start' }, flexWrap: 'wrap' }}>
                  <Chip icon={<MenuBookIcon />} label={`${featured.chapters.length} parts`} variant="outlined" />
                  {featured.genres.slice(0, 2).map((g) => <Chip key={g} label={g} variant="outlined" />)}
                </Box>
              )}
              <Box sx={{ mt: 4, display: 'flex', gap: 2, flexWrap: 'wrap', justifyContent: { xs: 'center', md: 'flex-start' } }}>
                {featured.chapters.length > 0 && (
                  <Button variant="contained" size="large" href={href('book', featured.id, 'read', 0)}>Start reading</Button>
                )}
                <Button variant="outlined" size="large" href={href('book', featured.id)}>About the story</Button>
              </Box>
            </motion.div>
          </Grid>
          <Grid size={{ xs: 12, md: 5 }} sx={{ textAlign: 'center', order: { xs: 1, md: 2 } }}>
            {featured.cover && <TiltCover src={featured.cover} alt={featured.title} />}
          </Grid>
        </Grid>
      )}

      <Box sx={{ textAlign: 'center', mb: 4 }}>
        <div className="ornament">✦</div>
        <Typography variant="h3" sx={{ mt: 1, fontSize: { xs: '2.2rem', md: '3rem' } }}>The Library</Typography>
      </Box>
      <TextField
        fullWidth
        placeholder="Search by title, author or tag…"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        slotProps={{ input: { startAdornment: <InputAdornment position="start"><SearchIcon /></InputAdornment> } }}
        sx={{ mb: 2, maxWidth: 640, mx: 'auto', display: 'flex', '& .MuiOutlinedInput-root': { borderRadius: '999px', bgcolor: 'background.paper', boxShadow: '0 6px 20px rgba(127,104,200,.12)' } }}
      />
      <Box className="hide-scroll" sx={{ display: 'flex', gap: 1, mb: 5, overflowX: 'auto', justifyContent: { sm: 'center' }, mx: -2, px: 2, pb: 0.5 }}>
        {genres.map((g) => (
          <Chip key={g} label={g} clickable color={g === genre ? 'primary' : 'default'} onClick={() => setGenre(g)} sx={{ flexShrink: 0 }} />
        ))}
      </Box>

      {ready && shown.length === 0 && <Typography color="text.secondary" align="center">No books found ☁️</Typography>}
      <Grid container spacing={{ xs: 2.5, md: 4 }} sx={{ justifyContent: shown.length < 3 ? 'center' : 'flex-start' }}>
        {shown.map((b, i) => (
          <Grid key={b.id} size={{ xs: 6, sm: 4, md: 3 }}><BookCard book={b} index={i} /></Grid>
        ))}
      </Grid>
    </Container>
  )
}
