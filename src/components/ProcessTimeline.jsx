import { Box, Typography } from '@mui/material'
import { motion } from 'framer-motion'
import GrassIcon from '@mui/icons-material/Grass'
import PrecisionManufacturingIcon from '@mui/icons-material/PrecisionManufacturing'
import VerifiedIcon from '@mui/icons-material/Verified'
import LocalShippingIcon from '@mui/icons-material/LocalShipping'

const STEPS = [
  { icon: GrassIcon, title: 'Farm', desc: 'Hand-picked leaves from partner estates.' },
  { icon: PrecisionManufacturingIcon, title: 'Processing', desc: 'Withering, rolling & drying to spec.' },
  { icon: VerifiedIcon, title: 'Quality Testing', desc: 'Lab-tested for purity and flavor.' },
  { icon: LocalShippingIcon, title: 'Delivery', desc: 'Packed and shipped to your door.' },
]

export default function ProcessTimeline() {
  return (
    <Box id="process" sx={{ py: { xs: 8, md: 12 }, bgcolor: 'background.default' }}>
      <Box sx={{ maxWidth: 1200, mx: 'auto', px: { xs: 3, md: 6 } }}>
        <Typography sx={{ color: 'secondary.main', fontWeight: 600, letterSpacing: 2, fontSize: 13, textTransform: 'uppercase' }}>
          Our Process
        </Typography>
        <Typography variant="h2" sx={{ fontSize: { xs: 28, md: 38 }, mb: 6 }}>
          From Origin to Your Business
        </Typography>

        <Box sx={{ position: 'relative' }}>
          <Box
            sx={{
              position: 'absolute',
              top: 28,
              left: 0,
              right: 0,
              height: 2,
              bgcolor: 'divider',
              display: { xs: 'none', md: 'block' },
            }}
          />
          <motion.div
            style={{
              position: 'absolute',
              top: 28,
              left: 0,
              height: 2,
              background: 'linear-gradient(90deg, #D9A441, #E8785A)',
            }}
            initial={{ width: 0 }}
            whileInView={{ width: '100%' }}
            viewport={{ once: true }}
            transition={{ duration: 1.4, ease: 'easeInOut' }}
          />

          <Box
            sx={{
              position: 'relative',
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', md: 'repeat(4, 1fr)' },
              gap: { xs: 4, md: 2 },
            }}
          >
            {STEPS.map((step, i) => {
              const Icon = step.icon
              return (
                <motion.div
                  key={step.title}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.5, delay: i * 0.18 }}
                  style={{ textAlign: 'center' }}
                >
                  <Box
                    sx={{
                      width: 56,
                      height: 56,
                      mx: 'auto',
                      borderRadius: '50%',
                      bgcolor: 'background.paper',
                      border: '2px solid',
                      borderColor: 'secondary.main',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      mb: 2,
                    }}
                  >
                    <Icon sx={{ color: 'secondary.main' }} />
                  </Box>
                  <Typography variant="h6" sx={{ fontSize: 17 }}>
                    {step.title}
                  </Typography>
                  <Typography sx={{ color: 'text.secondary', fontSize: 14, mt: 0.5, maxWidth: 220, mx: 'auto' }}>
                    {step.desc}
                  </Typography>
                </motion.div>
              )
            })}
          </Box>
        </Box>
      </Box>
    </Box>
  )
}
