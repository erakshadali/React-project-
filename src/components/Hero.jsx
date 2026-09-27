import { Box, Typography, Button, Stack } from '@mui/material'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'

const headline = 'From Leaf to Glass — Premium Tea Ingredients for Your Business'

export default function Hero() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '40%'])
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0.2])

  const words = headline.split(' ')

  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })

  return (
    <Box
      id="hero"
      ref={ref}
      sx={{
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        overflow: 'hidden',
        bgcolor: 'primary.dark',
      }}
    >
      <motion.div
        style={{
          position: 'absolute',
          inset: 0,
          y,
          background:
            'radial-gradient(ellipse at 20% 20%, rgba(217,164,65,0.35), transparent 55%), radial-gradient(ellipse at 80% 70%, rgba(232,120,90,0.25), transparent 50%), linear-gradient(160deg, #0F241A 0%, #1B3A2B 55%, #234A35 100%)',
        }}
      />

      {/* decorative floating leaves */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          style={{
            position: 'absolute',
            top: `${10 + i * 14}%`,
            left: `${(i % 2 === 0 ? 5 : 85) + (i % 3) * 2}%`,
            width: 18 + (i % 3) * 6,
            height: 18 + (i % 3) * 6,
            borderRadius: '0% 60% 0% 60%',
            background: i % 2 === 0 ? 'rgba(217,164,65,0.35)' : 'rgba(250,246,238,0.18)',
          }}
          animate={{ y: [0, -18, 0], rotate: [0, 25, 0] }}
          transition={{ duration: 6 + i, repeat: Infinity, ease: 'easeInOut' }}
        />
      ))}

      <Box sx={{ position: 'relative', zIndex: 2, maxWidth: 1200, mx: 'auto', px: { xs: 3, md: 6 }, width: '100%' }}>
        <Box sx={{ maxWidth: 720 }}>
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <Typography
              sx={{
                color: 'secondary.main',
                letterSpacing: 3,
                fontWeight: 600,
                fontSize: 13,
                textTransform: 'uppercase',
                mb: 2,
              }}
            >
              Wholesale Tea &amp; Iced Tea Ingredients
            </Typography>
          </motion.div>

          <Typography
            variant="h1"
            component={motion.h1}
            style={{ opacity }}
            sx={{
              color: '#FAF6EE',
              fontSize: { xs: 36, sm: 48, md: 62 },
              lineHeight: 1.15,
              mb: 3,
            }}
          >
            {words.map((word, i) => (
              <motion.span
                key={i}
                style={{ display: 'inline-block', marginRight: 12 }}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.15 + i * 0.06 }}
              >
                {word}
              </motion.span>
            ))}
          </Typography>

          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.9 }}>
            <Typography sx={{ color: 'rgba(250,246,238,0.8)', fontSize: 18, mb: 5, maxWidth: 560 }}>
              Direct-from-origin loose-leaf tea, concentrates, syrups, and packaging —
              sourced, blended, and delivered at scale for cafés, tea brands, and restaurants.
            </Typography>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 1.05 }}>
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
              <Button
                size="large"
                variant="contained"
                color="error"
                onClick={() => scrollTo('pricing')}
                sx={{ py: 1.5, px: 4, fontSize: 16 }}
              >
                Request Bulk Pricing
              </Button>
              <Button
                size="large"
                variant="outlined"
                onClick={() => scrollTo('products')}
                sx={{ py: 1.5, px: 4, fontSize: 16, color: '#FAF6EE', borderColor: 'rgba(250,246,238,0.4)' }}
              >
                Browse Catalog
              </Button>
            </Stack>
          </motion.div>
        </Box>
      </Box>
    </Box>
  )
}
