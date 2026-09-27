import { Box, Typography } from '@mui/material'
import { motion } from 'framer-motion'
import PublicIcon from '@mui/icons-material/Public'
import TuneIcon from '@mui/icons-material/Tune'
import StackedLineChartIcon from '@mui/icons-material/StackedLineChart'
import BoltIcon from '@mui/icons-material/Bolt'

const FEATURES = [
  { icon: PublicIcon, title: 'Direct-From-Origin', desc: 'We work directly with tea gardens and processors, cutting out middlemen for better quality and pricing.' },
  { icon: TuneIcon, title: 'Custom Blending', desc: 'Tell us your flavor profile — our blenders develop a custom concentrate or leaf blend for your brand.' },
  { icon: StackedLineChartIcon, title: 'Bulk Pricing Tiers', desc: 'Transparent volume discounts that scale as your order grows, with locked-in seasonal contracts.' },
  { icon: BoltIcon, title: 'Fast Fulfillment', desc: 'Regional warehouses and standing inventory mean most orders ship within 48 hours.' },
]

export default function WhyUs() {
  return (
    <Box id="why-us" sx={{ py: { xs: 8, md: 12 }, bgcolor: 'background.paper' }}>
      <Box sx={{ maxWidth: 1200, mx: 'auto', px: { xs: 3, md: 6 } }}>
        <Typography sx={{ color: 'secondary.main', fontWeight: 600, letterSpacing: 2, fontSize: 13, textTransform: 'uppercase' }}>
          Why Us
        </Typography>
        <Typography variant="h2" sx={{ fontSize: { xs: 28, md: 38 }, mb: 6 }}>
          Built for Businesses That Pour at Scale
        </Typography>

        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(4, 1fr)' },
            gap: 4,
          }}
        >
          {FEATURES.map((f, i) => {
            const Icon = f.icon
            return (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <Box
                  sx={{
                    width: 56,
                    height: 56,
                    borderRadius: '16px',
                    bgcolor: 'primary.main',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    mb: 2,
                  }}
                >
                  <Icon sx={{ color: 'secondary.main' }} />
                </Box>
                <Typography variant="h6" sx={{ fontSize: 18, mb: 1 }}>
                  {f.title}
                </Typography>
                <Typography sx={{ color: 'text.secondary', fontSize: 14.5, lineHeight: 1.6 }}>{f.desc}</Typography>
              </motion.div>
            )
          })}
        </Box>
      </Box>
    </Box>
  )
}
