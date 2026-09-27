import { useState } from 'react'
import {
  Box,
  Typography,
  TextField,
  MenuItem,
  Button,
  Stack,
  Alert,
} from '@mui/material'
import { motion } from 'framer-motion'

const TIERS = [
  { name: 'Starter', volume: '25 – 100 kg / mo', discount: 'List price', best: false },
  { name: 'Growth', volume: '100 – 500 kg / mo', discount: '8% off list', best: true },
  { name: 'Enterprise', volume: '500 kg+ / mo', discount: '15%+ off list', best: false },
]

const PRODUCT_OPTIONS = ['Loose-Leaf Tea', 'Iced Tea Concentrates', 'Flavor Syrups', 'Sweeteners', 'Packaging & Cups']

export default function PricingQuote() {
  const [form, setForm] = useState({ business: '', volume: '', product: '' })
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (field) => (e) => setForm((f) => ({ ...f, [field]: e.target.value }))

  const handleSubmit = (e) => {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <Box id="pricing" sx={{ py: { xs: 8, md: 12 }, bgcolor: 'background.paper' }}>
      <Box sx={{ maxWidth: 1200, mx: 'auto', px: { xs: 3, md: 6 } }}>
        <Typography sx={{ color: 'secondary.main', fontWeight: 600, letterSpacing: 2, fontSize: 13, textTransform: 'uppercase' }}>
          Pricing
        </Typography>
        <Typography variant="h2" sx={{ fontSize: { xs: 28, md: 38 }, mb: 6 }}>
          Volume Pricing That Scales With You
        </Typography>

        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' },
            gap: 3,
            mb: 8,
          }}
        >
          {TIERS.map((tier, i) => (
            <motion.div
              key={tier.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <Box
                sx={{
                  p: 4,
                  borderRadius: 3,
                  height: '100%',
                  bgcolor: tier.best ? 'primary.main' : 'background.default',
                  color: tier.best ? '#FAF6EE' : 'text.primary',
                  border: '1px solid',
                  borderColor: tier.best ? 'primary.main' : 'divider',
                  position: 'relative',
                  transform: tier.best ? { md: 'scale(1.05)' } : 'none',
                }}
              >
                {tier.best && (
                  <Box
                    sx={{
                      position: 'absolute',
                      top: -14,
                      left: 24,
                      bgcolor: 'secondary.main',
                      color: '#1B1B1B',
                      px: 1.5,
                      py: 0.3,
                      borderRadius: 999,
                      fontSize: 12,
                      fontWeight: 700,
                    }}
                  >
                    MOST POPULAR
                  </Box>
                )}
                <Typography variant="h5" sx={{ fontSize: 20, mb: 1 }}>{tier.name}</Typography>
                <Typography sx={{ opacity: 0.85, fontSize: 14, mb: 2 }}>{tier.volume}</Typography>
                <Typography variant="h4" sx={{ fontSize: 26, color: tier.best ? 'secondary.main' : 'primary.main' }}>
                  {tier.discount}
                </Typography>
              </Box>
            </motion.div>
          ))}
        </Box>

        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
            gap: 6,
            alignItems: 'center',
          }}
        >
          <Box>
            <Typography variant="h3" sx={{ fontSize: { xs: 24, md: 30 }, mb: 2 }}>
              Request a Custom Quote
            </Typography>
            <Typography sx={{ color: 'text.secondary', mb: 3 }}>
              Tell us about your business and volume needs — our team responds with a tailored quote within one business day.
            </Typography>
          </Box>

          <Box component="form" onSubmit={handleSubmit}>
            {submitted && (
              <Alert severity="success" sx={{ mb: 2 }}>
                Thanks! Your quote request has been received — we'll be in touch shortly.
              </Alert>
            )}
            <Stack spacing={2}>
              <TextField
                label="Business Name"
                required
                value={form.business}
                onChange={handleChange('business')}
                fullWidth
              />
              <TextField
                label="Estimated Monthly Volume"
                required
                placeholder="e.g. 200kg"
                value={form.volume}
                onChange={handleChange('volume')}
                fullWidth
              />
              <TextField
                select
                label="Product Interest"
                required
                value={form.product}
                onChange={handleChange('product')}
                fullWidth
              >
                {PRODUCT_OPTIONS.map((opt) => (
                  <MenuItem key={opt} value={opt}>
                    {opt}
                  </MenuItem>
                ))}
              </TextField>
              <Button type="submit" variant="contained" color="error" size="large" sx={{ alignSelf: 'flex-start', py: 1.4, px: 4 }}>
                Submit Request
              </Button>
            </Stack>
          </Box>
        </Box>
      </Box>
    </Box>
  )
}
