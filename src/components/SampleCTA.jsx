import { Box, Typography, Button } from '@mui/material'
import { motion } from 'framer-motion'

export default function SampleCTA() {
  return (
    <Box sx={{ position: 'relative', overflow: 'hidden', py: { xs: 8, md: 10 } }}>
      <motion.div
        style={{ position: 'absolute', inset: 0 }}
        animate={{
          background: [
            'linear-gradient(120deg, #1B3A2B, #D9A441)',
            'linear-gradient(120deg, #D9A441, #E8785A)',
            'linear-gradient(120deg, #E8785A, #1B3A2B)',
            'linear-gradient(120deg, #1B3A2B, #D9A441)',
          ],
        }}
        transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
      />
      <Box
        sx={{
          position: 'relative',
          zIndex: 1,
          maxWidth: 800,
          mx: 'auto',
          px: 3,
          textAlign: 'center',
          color: '#FAF6EE',
        }}
      >
        <Typography variant="h2" sx={{ fontSize: { xs: 26, md: 36 }, mb: 2 }}>
          Not Sure Which Blend Fits Your Menu?
        </Typography>
        <Typography sx={{ mb: 4, opacity: 0.9, fontSize: 16 }}>
          Get a free sample kit of our top-selling teas, concentrates, and syrups shipped to your business.
        </Typography>
        <Button
          size="large"
          variant="contained"
          sx={{ bgcolor: '#FAF6EE', color: '#1B3A2B', py: 1.5, px: 4, fontSize: 16, '&:hover': { bgcolor: '#fff' } }}
        >
          Get a Free Sample Kit
        </Button>
      </Box>
    </Box>
  )
}
