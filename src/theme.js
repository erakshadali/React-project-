import { createTheme } from '@mui/material/styles'

export const palette = {
  lavender: '#C9B8F0',
  lavenderDeep: '#8F78D6',
  pink: '#F9C6DA',
  peach: '#FFDCC8',
  mint: '#CDEEDF',
  sky: '#CFE4F8',
  cream: '#FFF8FB',
  ink: '#4A3F63',
}

export function getTheme(mode) {
  const dark = mode === 'dark'
  const serif = '"Cormorant Garamond", "Playfair Display", serif'

  return createTheme({
    palette: {
      mode,
      primary: { main: palette.lavenderDeep },
      secondary: { main: '#E58FB4' },
      background: { default: dark ? '#1E1A2E' : palette.cream, paper: dark ? '#2A2440' : '#FFFFFF' },
      text: { primary: dark ? '#F1EBFF' : palette.ink, secondary: dark ? '#C9BEE6' : '#7C7196' },
    },
    typography: {
      fontFamily: '"Quicksand", sans-serif',
      h1: { fontFamily: serif, fontWeight: 700 },
      h2: { fontFamily: serif, fontWeight: 700 },
      h3: { fontFamily: serif, fontWeight: 700 },
      h4: { fontFamily: serif, fontWeight: 700 },
      h5: { fontFamily: serif, fontWeight: 700 },
      h6: { fontFamily: serif, fontWeight: 700 },
      button: { textTransform: 'none', fontWeight: 700 },
    },
    shape: { borderRadius: 18 },
    components: {
      MuiButton: { styleOverrides: { root: { borderRadius: 999, paddingInline: 24 } } },
      MuiChip: { styleOverrides: { root: { fontWeight: 600 } } },
      MuiPaper: { styleOverrides: { root: { backgroundImage: 'none' } } },
    },
  })
}
