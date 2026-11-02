import { AppBar, Box, Button, Container, IconButton, Toolbar, Typography } from '@mui/material'
import AutoStoriesIcon from '@mui/icons-material/AutoStories'
import DarkModeIcon from '@mui/icons-material/DarkModeOutlined'
import LightModeIcon from '@mui/icons-material/LightModeOutlined'
import LockIcon from '@mui/icons-material/LockOutlined'
import { motion, useScroll, useSpring } from 'framer-motion'
import { href } from '../lib/router'
import Sparkles from './Sparkles'

export default function Layout({ mode, onToggleMode, children }) {
  const { scrollYProgress } = useScroll()
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 24 })
  const dark = mode === 'dark'

  return (
    <Box className={`dreamy-bg ${mode}`} sx={{ display: 'flex', flexDirection: 'column' }}>
      <Sparkles />
      <AppBar
        position="sticky"
        elevation={0}
        sx={{
          bgcolor: dark ? 'rgba(23,19,31,.72)' : 'rgba(255,249,244,.72)',
          backdropFilter: 'blur(16px) saturate(1.4)',
          color: 'text.primary',
          borderBottom: '1px solid',
          borderColor: 'divider',
          pt: 'env(safe-area-inset-top)',
        }}
      >
        <Toolbar sx={{ gap: { xs: 0.5, sm: 1 }, minHeight: { xs: 56, sm: 68 } }}>
          <motion.span whileHover={{ rotate: -8, scale: 1.12 }} style={{ display: 'flex' }}>
            <AutoStoriesIcon color="primary" />
          </motion.span>
          <Typography component="a" href={href()} variant="h5" sx={{ flexGrow: 1, ml: 0.5, color: 'inherit', textDecoration: 'none', fontSize: { xs: '1.45rem', sm: '1.7rem' }, whiteSpace: 'nowrap' }}>
            Dreamy <Box component="span" sx={{ fontStyle: 'italic', color: 'primary.main' }}>Pages</Box>
          </Typography>
          <Button href={href()} color="inherit" sx={{ display: { xs: 'none', sm: 'inline-flex' } }}>Library</Button>
          <Button href={href('admin')} color="inherit" startIcon={<LockIcon fontSize="small" />} sx={{ display: { xs: 'none', sm: 'inline-flex' } }}>Admin</Button>
          <IconButton href={href('admin')} color="inherit" aria-label="Admin" sx={{ display: { xs: 'inline-flex', sm: 'none' } }}>
            <LockIcon fontSize="small" />
          </IconButton>
          <IconButton onClick={onToggleMode} color="inherit" aria-label="Toggle dark mode">
            {dark ? <LightModeIcon /> : <DarkModeIcon />}
          </IconButton>
        </Toolbar>
        <motion.div style={{ scaleX: progress, transformOrigin: '0 50%', height: 3, background: 'linear-gradient(90deg,#F0A3C4,#9B83E0,#C8A15B)' }} />
      </AppBar>

      <Box component="main" sx={{ flexGrow: 1 }}>{children}</Box>

      <Container component="footer" sx={{ py: 5, textAlign: 'center' }}>
        <div className="ornament">✦</div>
        <Typography variant="h6" sx={{ mt: 1.5 }}>Dreamy <i>Pages</i></Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5, maxWidth: 520, mx: 'auto' }}>
          Stories belong to their authors. Only upload books you have the right to share.
        </Typography>
      </Container>
    </Box>
  )
}
