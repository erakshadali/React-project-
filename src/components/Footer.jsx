import { useState } from 'react'
import { Box, Typography, TextField, Button, IconButton, Stack, Divider } from '@mui/material'
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser'
import InstagramIcon from '@mui/icons-material/Instagram'
import LinkedInIcon from '@mui/icons-material/LinkedIn'
import EmailIcon from '@mui/icons-material/Email'
import PhoneIcon from '@mui/icons-material/Phone'

export default function Footer() {
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)

  const handleSubscribe = (e) => {
    e.preventDefault()
    if (email) setSubscribed(true)
  }

  return (
    <Box component="footer" sx={{ bgcolor: 'primary.dark', color: 'rgba(250,246,238,0.85)', pt: 8, pb: 4 }}>
      <Box sx={{ maxWidth: 1200, mx: 'auto', px: { xs: 3, md: 6 } }}>
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: '1.4fr 1fr 1fr' },
            gap: 6,
            mb: 6,
          }}
        >
          <Box>
            <Typography variant="h5" sx={{ color: '#FAF6EE', fontFamily: '"Fraunces", serif', mb: 2 }}>
              Leaf &amp; Brew Supply Co.
            </Typography>
            <Typography sx={{ fontSize: 14, mb: 3, maxWidth: 320 }}>
              Premium raw materials for tea and iced tea, sourced direct from origin for cafés, tea brands, and restaurants worldwide.
            </Typography>
            <Box component="form" onSubmit={handleSubscribe}>
              <Typography sx={{ fontSize: 13, mb: 1, color: 'secondary.main', fontWeight: 600 }}>
                SUBSCRIBE FOR SOURCING UPDATES
              </Typography>
              <Stack direction="row" spacing={1}>
                <TextField
                  size="small"
                  placeholder="you@business.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  sx={{
                    flex: 1,
                    '& .MuiOutlinedInput-root': { bgcolor: 'rgba(250,246,238,0.06)' },
                    input: { color: '#FAF6EE' },
                  }}
                />
                <Button type="submit" variant="contained" color="secondary" sx={{ color: '#1B1B1B' }}>
                  Join
                </Button>
              </Stack>
              {subscribed && (
                <Typography sx={{ fontSize: 12.5, color: 'secondary.main', mt: 1 }}>
                  Thanks — you're on the list!
                </Typography>
              )}
            </Box>
          </Box>

          <Box>
            <Typography sx={{ color: '#FAF6EE', fontWeight: 700, mb: 2 }}>Contact</Typography>
            <Stack spacing={1.2}>
              <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
                <EmailIcon sx={{ fontSize: 18, color: 'secondary.main' }} />
                <Typography sx={{ fontSize: 14 }}>sales@leafandbrew.co</Typography>
              </Stack>
              <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
                <PhoneIcon sx={{ fontSize: 18, color: 'secondary.main' }} />
                <Typography sx={{ fontSize: 14 }}>+1 (555) 019-2837</Typography>
              </Stack>
              <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
                <VerifiedUserIcon sx={{ fontSize: 18, color: 'secondary.main' }} />
                <Typography sx={{ fontSize: 14 }}>Organic &amp; FSSAI Certified</Typography>
              </Stack>
            </Stack>
          </Box>

          <Box>
            <Typography sx={{ color: '#FAF6EE', fontWeight: 700, mb: 2 }}>Follow Us</Typography>
            <Stack direction="row" spacing={1}>
              <IconButton sx={{ color: '#FAF6EE', border: '1px solid rgba(250,246,238,0.2)' }} size="small">
                <InstagramIcon fontSize="small" />
              </IconButton>
              <IconButton sx={{ color: '#FAF6EE', border: '1px solid rgba(250,246,238,0.2)' }} size="small">
                <LinkedInIcon fontSize="small" />
              </IconButton>
            </Stack>
          </Box>
        </Box>

        <Divider sx={{ borderColor: 'rgba(250,246,238,0.12)', mb: 3 }} />
        <Typography sx={{ fontSize: 12.5, textAlign: 'center', opacity: 0.6 }}>
          © {new Date().getFullYear()} Leaf &amp; Brew Supply Co. All rights reserved.
        </Typography>
      </Box>
    </Box>
  )
}
