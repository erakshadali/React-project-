import { useEffect, useState } from 'react'
import { Box, Typography, IconButton, Avatar } from '@mui/material'
import { AnimatePresence, motion } from 'framer-motion'
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'
import FormatQuoteIcon from '@mui/icons-material/FormatQuote'

const REVIEWS = [
  {
    quote:
      'Switching to their concentrate cut our prep time in half and our iced tea sales are up 30% this summer.',
    name: 'Maria Chen',
    role: 'Owner, Bloom Café',
    initials: 'MC',
  },
  {
    quote:
      'Consistent quality, every batch. Our custom blend tastes identical whether we order 50kg or 500kg.',
    name: 'David Okafor',
    role: 'Beverage Director, Leaf & Table',
    initials: 'DO',
  },
  {
    quote:
      'Their team helped us develop a private-label iced tea line from scratch — sourcing to packaging.',
    name: 'Priya Nair',
    role: 'Founder, Chai Collective',
    initials: 'PN',
  },
]

export default function Testimonials() {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => setIndex((i) => (i + 1) % REVIEWS.length), 6000)
    return () => clearInterval(timer)
  }, [])

  const next = () => setIndex((i) => (i + 1) % REVIEWS.length)
  const prev = () => setIndex((i) => (i - 1 + REVIEWS.length) % REVIEWS.length)

  const review = REVIEWS[index]

  return (
    <Box id="testimonials" sx={{ py: { xs: 8, md: 12 }, bgcolor: 'primary.dark', color: '#FAF6EE' }}>
      <Box sx={{ maxWidth: 800, mx: 'auto', px: { xs: 3, md: 6 }, textAlign: 'center' }}>
        <Typography sx={{ color: 'secondary.main', fontWeight: 600, letterSpacing: 2, fontSize: 13, textTransform: 'uppercase', mb: 1 }}>
          Testimonials
        </Typography>
        <Typography variant="h2" sx={{ fontSize: { xs: 26, md: 34 }, mb: 6 }}>
          Trusted by Cafés &amp; Tea Brands
        </Typography>

        <Box sx={{ position: 'relative', minHeight: 220 }}>
          <FormatQuoteIcon sx={{ fontSize: 48, color: 'secondary.main', opacity: 0.4, mb: 1 }} />
          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -24 }}
              transition={{ duration: 0.4 }}
            >
              <Typography sx={{ fontSize: { xs: 18, md: 22 }, fontFamily: '"Fraunces", serif', mb: 3, lineHeight: 1.5 }}>
                “{review.quote}”
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1.5 }}>
                <Avatar sx={{ bgcolor: 'secondary.main', color: '#1B1B1B', fontWeight: 700 }}>{review.initials}</Avatar>
                <Box sx={{ textAlign: 'left' }}>
                  <Typography sx={{ fontWeight: 600, fontSize: 14 }}>{review.name}</Typography>
                  <Typography sx={{ fontSize: 13, opacity: 0.7 }}>{review.role}</Typography>
                </Box>
              </Box>
            </motion.div>
          </AnimatePresence>
        </Box>

        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, mt: 4 }}>
          <IconButton onClick={prev} sx={{ color: '#FAF6EE', border: '1px solid rgba(250,246,238,0.3)' }} size="small">
            <ArrowBackIosNewIcon fontSize="small" />
          </IconButton>
          <IconButton onClick={next} sx={{ color: '#FAF6EE', border: '1px solid rgba(250,246,238,0.3)' }} size="small">
            <ArrowForwardIosIcon fontSize="small" />
          </IconButton>
        </Box>
      </Box>
    </Box>
  )
}
