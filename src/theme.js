import { createTheme } from '@mui/material/styles'

export const palette = {
  lavender: '#C9B8F0',
  lavenderDeep: '#7F68C8',
  pink: '#F9C6DA',
  peach: '#FFDCC8',
  mint: '#CDEEDF',
  sky: '#CFE4F8',
  cream: '#FFF9F4',
  ink: '#3B2F4F',
  gold: '#C8A15B',
}

export function getTheme(mode) {
  const dark = mode === 'dark'
  const serif = '"Cormorant Garamond", "Playfair Display", Georgia, serif'
  const heading = { fontFamily: serif, fontWeight: 700, letterSpacing: '-0.01em' }

  return createTheme({
    palette: {
      mode,
      primary: { main: dark ? '#B7A3F2' : palette.lavenderDeep },
      secondary: { main: dark ? '#F0A3C4' : '#D9779F' },
      background: { default: dark ? '#17131F' : palette.cream, paper: dark ? '#231D33' : '#FFFFFF' },
      text: { primary: dark ? '#F4EEFF' : palette.ink, secondary: dark ? '#C9BEE6' : '#76698F' },
      divider: dark ? 'rgba(255,255,255,.1)' : 'rgba(127,104,200,.16)',
    },
    typography: {
      fontFamily: '"Quicksand", system-ui, sans-serif',
      h1: heading, h2: heading, h3: heading, h4: heading, h5: heading, h6: heading,
      button: { textTransform: 'none', fontWeight: 700, letterSpacing: '0.01em' },
      overline: { letterSpacing: '0.2em', fontWeight: 700 },
    },
    shape: { borderRadius: 18 },
    components: {
      MuiCssBaseline: { styleOverrides: { body: { backgroundColor: dark ? '#17131F' : palette.cream } } },
      MuiButton: {
        styleOverrides: {
          root: { borderRadius: 999, paddingInline: 26, transition: 'transform .25s ease, box-shadow .25s ease', '&:hover': { transform: 'translateY(-2px)' } },
          containedPrimary: { background: 'linear-gradient(135deg,#9B83E0,#7F68C8)', boxShadow: '0 8px 22px rgba(127,104,200,.38)' },
        },
      },
      MuiChip: { styleOverrides: { root: { fontWeight: 600 } } },
      MuiPaper: { styleOverrides: { root: { backgroundImage: 'none' } } },
    },
  })
}
