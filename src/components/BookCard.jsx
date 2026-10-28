import { Box, Chip, Typography } from '@mui/material'
import { motion } from 'framer-motion'
import { href } from '../lib/router'

export default function BookCard({ book }) {
  return (
    <Box
      component={motion.a}
      href={href('book', book.id)}
      whileHover={{ y: -8 }}
      sx={{ display: 'block', textDecoration: 'none', color: 'inherit' }}
    >
      {book.cover ? (
        <Box
          component="img"
          src={book.cover}
          alt={`${book.title} cover`}
          sx={{ width: '100%', aspectRatio: '2 / 3', objectFit: 'cover', borderRadius: '20px', boxShadow: '0 12px 30px rgba(143,120,214,.35)' }}
        />
      ) : (
        <Box sx={{ aspectRatio: '2 / 3', borderRadius: '20px', display: 'grid', placeItems: 'center', p: 2, textAlign: 'center', background: 'linear-gradient(160deg,#F9C6DA,#C9B8F0)', boxShadow: '0 12px 30px rgba(143,120,214,.35)' }}>
          <Typography variant="h5" sx={{ color: '#4A3F63' }}>{book.title}</Typography>
        </Box>
      )}
      <Typography variant="h6" sx={{ mt: 1.5, lineHeight: 1.2 }}>{book.title}</Typography>
      <Typography variant="body2" color="text.secondary">by {book.author}</Typography>
      <Box sx={{ mt: 0.5, display: 'flex', gap: 0.5, flexWrap: 'wrap' }}>
        {book.genres.slice(0, 2).map((g) => <Chip key={g} label={g} size="small" />)}
        {book.mature && <Chip label="18+" size="small" color="secondary" />}
      </Box>
    </Box>
  )
}
