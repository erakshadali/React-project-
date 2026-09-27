import { createTheme } from '@mui/material/styles'

export const palette = {
  green: '#1B3A2B',
  greenDark: '#0F241A',
  amber: '#D9A441',
  cream: '#FAF6EE',
  charcoal: '#212121',
  coral: '#E8785A',
}

export function getTheme(mode) {
  const isDark = mode === 'dark'

  return createTheme({
    palette: {
      mode,
      primary: { main: palette.green, light: '#2E5540', dark: palette.greenDark },
      secondary: { main: palette.amber },
      background: {
        default: isDark ? '#10201A' : palette.cream,
        paper: isDark ? '#16281F' : '#FFFFFF',
      },
      text: {
        primary: isDark ? '#F3EEE2' : palette.charcoal,
        secondary: isDark ? '#C7D6CC' : '#5B5B5B',
      },
      error: { main: palette.coral },
    },
    typography: {
      fontFamily: '"Inter", "Manrope", sans-serif',
      h1: { fontFamily: '"Fraunces", "Playfair Display", serif', fontWeight: 600 },
      h2: { fontFamily: '"Fraunces", "Playfair Display", serif', fontWeight: 600 },
      h3: { fontFamily: '"Fraunces", "Playfair Display", serif', fontWeight: 600 },
      h4: { fontFamily: '"Fraunces", "Playfair Display", serif', fontWeight: 600 },
      h5: { fontFamily: '"Fraunces", "Playfair Display", serif', fontWeight: 600 },
      button: { textTransform: 'none', fontWeight: 600 },
    },
    shape: { borderRadius: 14 },
    components: {
      MuiButton: {
        styleOverrides: {
          root: { borderRadius: 999, paddingLeft: 24, paddingRight: 24 },
        },
      },
    },
  })
}
