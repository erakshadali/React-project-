import { useEffect, useState } from 'react'
import { AppBar, Toolbar, Typography, Button, IconButton, Stack, useMediaQuery } from '@mui/material'
import LightModeIcon from '@mui/icons-material/LightMode'
import DarkModeIcon from '@mui/icons-material/DarkMode'
import MenuIcon from '@mui/icons-material/Menu'
import { motion } from 'framer-motion'

const NAV_LINKS = ['Products', 'Why Us', 'Process', 'Pricing', 'Testimonials']

export default function Navbar({ mode, onToggleMode }) {
  const [scrolled, setScrolled] = useState(false)
  const isMobile = useMediaQuery('(max-width:900px)')

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <AppBar
      position="fixed"
      elevation={0}
      component={motion.div}
      animate={{
        paddingTop: scrolled ? 4 : 14,
        paddingBottom: scrolled ? 4 : 14,
      }}
      transition={{ duration: 0.3 }}
      sx={{
        bgcolor: scrolled ? 'background.paper' : 'transparent',
        backdropFilter: scrolled ? 'blur(10px)' : 'none',
        boxShadow: scrolled ? '0 4px 24px rgba(0,0,0,0.08)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(0,0,0,0.06)' : '1px solid transparent',
        transition: 'background-color 0.3s ease, box-shadow 0.3s ease',
        color: 'text.primary',
      }}
    >
      <Toolbar sx={{ maxWidth: 1200, width: '100%', mx: 'auto', px: { xs: 2, md: 3 } }}>
        <Typography
          variant="h6"
          sx={{ flexGrow: 1, fontFamily: '"Fraunces", serif', fontWeight: 700, letterSpacing: 0.3 }}
        >
          Leaf &amp; Brew
        </Typography>

        {!isMobile && (
          <Stack direction="row" spacing={3} sx={{ mr: 3 }}>
            {NAV_LINKS.map((link) => (
              <Typography
                key={link}
                onClick={() => scrollTo(link.toLowerCase().replace(/\s/g, '-'))}
                sx={{
                  cursor: 'pointer',
                  fontWeight: 500,
                  fontSize: 15,
                  '&:hover': { color: 'secondary.main' },
                  transition: 'color 0.2s ease',
                }}
              >
                {link}
              </Typography>
            ))}
          </Stack>
        )}

        <IconButton onClick={onToggleMode} sx={{ mr: 1 }} aria-label="toggle theme">
          {mode === 'dark' ? <LightModeIcon /> : <DarkModeIcon />}
        </IconButton>

        {isMobile ? (
          <IconButton aria-label="menu" onClick={() => scrollTo('products')}>
            <MenuIcon />
          </IconButton>
        ) : (
          <Button
            variant="contained"
            color="secondary"
            onClick={() => scrollTo('pricing')}
            sx={{ color: '#1B1B1B' }}
          >
            Request Bulk Pricing
          </Button>
        )}
      </Toolbar>
    </AppBar>
  )
}
