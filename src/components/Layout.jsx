import { AppBar, Box, Button, Container, IconButton, Toolbar, Typography } from '@mui/material'
import AutoStoriesIcon from '@mui/icons-material/AutoStories'
import DarkModeIcon from '@mui/icons-material/DarkModeOutlined'
import LightModeIcon from '@mui/icons-material/LightModeOutlined'
import { href } from '../lib/router'

export default function Layout({ mode, onToggleMode, children }) {
  return (
    <Box className={`dreamy-bg ${mode}`} sx={{ display: 'flex', flexDirection: 'column' }}>
      <AppBar position="sticky" elevation={0} sx={{ bgcolor: (t) => (t.palette.mode === 'dark' ? 'rgba(30,26,46,.7)' : 'rgba(255,248,251,.7)'), backdropFilter: 'blur(14px)', color: 'text.primary' }}>
        <Toolbar sx={{ gap: 1 }}>
          <AutoStoriesIcon color="primary" />
          <Typography component="a" href={href()} variant="h5" sx={{ flexGrow: 1, color: 'inherit', textDecoration: 'none' }}>
            Dreamy Pages
          </Typography>
          <Button href={href()} color="inherit">Library</Button>
          <Button href={href('admin')} color="inherit">Admin</Button>
          <IconButton onClick={onToggleMode} color="inherit" aria-label="Toggle dark mode">
            {mode === 'dark' ? <LightModeIcon /> : <DarkModeIcon />}
          </IconButton>
        </Toolbar>
      </AppBar>
      <Box component="main" sx={{ flexGrow: 1 }}>{children}</Box>
      <Container component="footer" sx={{ py: 4, textAlign: 'center' }}>
        <Typography variant="body2" color="text.secondary">
          ✦ Dreamy Pages — stories belong to their authors. Only upload books you have the right to share. ✦
        </Typography>
      </Container>
    </Box>
  )
}
