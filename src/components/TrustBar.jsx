import { Box, Typography } from '@mui/material'
import { motion, useInView, useMotionValue, useSpring } from 'framer-motion'
import { useEffect, useRef } from 'react'

const stats = [
  { value: 18, suffix: '+', label: 'Years Sourcing' },
  { value: 4200, suffix: 't', label: 'Tons Supplied / Year' },
  { value: 26, suffix: '', label: 'Countries Served' },
  { value: 900, suffix: '+', label: 'Business Clients' },
]

function Counter({ value, suffix }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })
  const motionValue = useMotionValue(0)
  const spring = useSpring(motionValue, { duration: 1.6, bounce: 0 })

  useEffect(() => {
    if (inView) motionValue.set(value)
  }, [inView, value, motionValue])

  useEffect(() => {
    const unsub = spring.on('change', (latest) => {
      if (ref.current) ref.current.textContent = Math.round(latest).toLocaleString() + suffix
    })
    return unsub
  }, [spring, suffix])

  return (
    <Typography variant="h3" ref={ref} sx={{ fontSize: { xs: 30, md: 40 }, color: 'secondary.main' }}>
      0{suffix}
    </Typography>
  )
}

export default function TrustBar() {
  return (
    <Box sx={{ bgcolor: 'primary.main', py: { xs: 5, md: 6 } }}>
      <Box
        sx={{
          maxWidth: 1200,
          mx: 'auto',
          px: { xs: 3, md: 6 },
          display: 'grid',
          gridTemplateColumns: { xs: '1fr 1fr', md: 'repeat(4, 1fr)' },
          gap: 4,
          textAlign: 'center',
        }}
      >
        {stats.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
          >
            <Counter value={s.value} suffix={s.suffix} />
            <Typography sx={{ color: 'rgba(250,246,238,0.75)', mt: 0.5, fontSize: 14 }}>{s.label}</Typography>
          </motion.div>
        ))}
      </Box>
    </Box>
  )
}
