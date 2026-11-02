import { Box, Chip, Typography } from '@mui/material'
import { motion } from 'framer-motion'
import { href } from '../lib/router'

export default function BookCard({ book, index = 0 }) {
  return (
    <Box
      component={motion.a}
      href={href('book', book.id)}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.6, delay: (index % 4) * 0.08, ease: 'easeOut' }}
      whileHover={{ y: -10 }}
      whileTap={{ scale: 0.97 }}
      sx={{ display: 'block', textDecoration: 'none', color: 'inherit' }}
    >
      <Box className="shine" sx={{ borderRadius: '18px', boxShadow: '0 14px 34px rgba(127,104,200,.32)', transition: 'box-shadow .3s', '&:hover': { boxShadow: '0 22px 46px rgba(127,104,200,.48)' } }}>
        {book.cover ? (
          <Box component="img" src={book.cover} alt={`${book.title} cover`} loading="lazy"
            sx={{ display: 'block', width: '100%', aspectRatio: '2 / 3', objectFit: 'cover' }} />
        ) : (
          <Box sx={{ aspectRatio: '2 / 3', display: 'grid', placeItems: 'center', p: 2, textAlign: 'center', background: 'linear-gradient(160deg,#F9C6DA,#C9B8F0)' }}>
            <Typography variant="h5" sx={{ color: '#3B2F4F' }}>{book.title}</Typography>
          </Box>
        )}
      </Box>
      <Typography variant="h6" sx={{ mt: 1.75, lineHeight: 1.15, fontSize: { xs: '1.15rem', sm: '1.3rem' } }}>{book.title}</Typography>
      <Typography variant="body2" color="text.secondary">by {book.author}</Typography>
      <Box sx={{ mt: 0.75, display: 'flex', gap: 0.5, flexWrap: 'wrap' }}>
        {book.genres.slice(0, 2).map((g) => <Chip key={g} label={g} size="small" />)}
        {book.mature && <Chip label="18+" size="small" color="secondary" />}
      </Box>
    </Box>
  )
}
