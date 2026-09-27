import { useMemo, useState } from 'react'
import { ThemeProvider, CssBaseline } from '@mui/material'
import { getTheme } from './theme'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import TrustBar from './components/TrustBar'
import ProductCategories from './components/ProductCategories'
import WhyUs from './components/WhyUs'
import ProcessTimeline from './components/ProcessTimeline'
import PricingQuote from './components/PricingQuote'
import Testimonials from './components/Testimonials'
import SampleCTA from './components/SampleCTA'
import Footer from './components/Footer'

function App() {
  const [mode, setMode] = useState('light')
  const theme = useMemo(() => getTheme(mode), [mode])

  const toggleMode = () => setMode((m) => (m === 'light' ? 'dark' : 'light'))

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Navbar mode={mode} onToggleMode={toggleMode} />
      <Hero />
      <TrustBar />
      <ProductCategories />
      <WhyUs />
      <ProcessTimeline />
      <PricingQuote />
      <Testimonials />
      <SampleCTA />
      <Footer />
    </ThemeProvider>
  )
}

export default App
