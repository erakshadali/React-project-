import { useMemo, useState } from 'react'
import { Box, Typography, Chip, Stack } from '@mui/material'
import { motion } from 'framer-motion'
import EnergySavingsLeafIcon from '@mui/icons-material/EnergySavingsLeaf'
import LocalDrinkIcon from '@mui/icons-material/LocalDrink'
import ScienceIcon from '@mui/icons-material/Science'
import Icecream from '@mui/icons-material/Icecream'
import Inventory2Icon from '@mui/icons-material/Inventory2'

const PRODUCTS = [
  {
    title: 'Loose-Leaf Tea',
    tag: 'Tea',
    icon: EnergySavingsLeafIcon,
    specs: ['Black, green & oolong grades', 'Origin-traceable lots', 'MOQ: 25kg', 'Hot brew & cold brew grades'],
  },
  {
    title: 'Iced Tea Concentrates',
    tag: 'Concentrate',
    icon: LocalDrinkIcon,
    specs: ['Ready-to-dilute base', '12 month shelf life', 'MOQ: 20L drum', 'Peach, lemon & classic'],
  },
  {
    title: 'Flavor Syrups',
    tag: 'Flavor',
    icon: ScienceIcon,
    specs: ['Natural fruit extracts', '30+ flavor profiles', 'MOQ: 10L case', 'Custom blending available'],
  },
  {
    title: 'Sweeteners',
    tag: 'Sweetener',
    icon: Icecream,
    specs: ['Cane sugar syrup', 'Honey & stevia options', 'MOQ: 50kg', 'Bulk tote or drum'],
  },
  {
    title: 'Packaging & Cups',
    tag: 'Packaging',
    icon: Inventory2Icon,
    specs: ['PET cups & lids', 'Compostable straws', 'Custom branded pouches', 'MOQ: 5,000 units'],
  },
]

const FILTERS = ['All', 'Tea', 'Concentrate', 'Flavor', 'Sweetener', 'Packaging']

function ProductCard({ product }) {
  const [flipped, setFlipped] = useState(false)
  const Icon = product.icon

  return (
    <Box
      onMouseEnter={() => setFlipped(true)}
      onMouseLeave={() => setFlipped(false)}
      sx={{ perspective: 1200, height: 260 }}
    >
      <motion.div
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={{ duration: 0.5 }}
        style={{ position: 'relative', width: '100%', height: '100%', transformStyle: 'preserve-3d' }}
      >
        {/* front */}
        <Box
          sx={{
            position: 'absolute',
            inset: 0,
            backfaceVisibility: 'hidden',
            borderRadius: 3,
            bgcolor: 'background.paper',
            border: '1px solid',
            borderColor: 'divider',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 1.5,
            boxShadow: '0 8px 28px rgba(27,58,43,0.08)',
          }}
        >
          <Box
            sx={{
              width: 64,
              height: 64,
              borderRadius: '50%',
              bgcolor: 'primary.main',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Icon sx={{ color: 'secondary.main', fontSize: 32 }} />
          </Box>
          <Typography variant="h6" sx={{ fontSize: 18 }}>
            {product.title}
          </Typography>
          <Typography sx={{ fontSize: 13, color: 'text.secondary' }}>Hover to view specs</Typography>
        </Box>

        {/* back */}
        <Box
          sx={{
            position: 'absolute',
            inset: 0,
            backfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)',
            borderRadius: 3,
            bgcolor: 'primary.dark',
            color: '#FAF6EE',
            p: 3,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            gap: 1,
          }}
        >
          <Typography sx={{ fontWeight: 700, mb: 1 }}>{product.title}</Typography>
          {product.specs.map((spec) => (
            <Typography key={spec} sx={{ fontSize: 13.5, color: 'rgba(250,246,238,0.85)' }}>
              • {spec}
            </Typography>
          ))}
        </Box>
      </motion.div>
    </Box>
  )
}

export default function ProductCategories() {
  const [filter, setFilter] = useState('All')

  const visible = useMemo(
    () => (filter === 'All' ? PRODUCTS : PRODUCTS.filter((p) => p.tag === filter)),
    [filter],
  )

  return (
    <Box id="products" sx={{ py: { xs: 8, md: 12 }, bgcolor: 'background.default' }}>
      <Box sx={{ maxWidth: 1200, mx: 'auto', px: { xs: 3, md: 6 } }}>
        <Typography sx={{ color: 'secondary.main', fontWeight: 600, letterSpacing: 2, fontSize: 13, textTransform: 'uppercase' }}>
          Catalog
        </Typography>
        <Typography variant="h2" sx={{ fontSize: { xs: 28, md: 38 }, mb: 1 }}>
          Raw Materials, Sourced to Spec
        </Typography>
        <Typography sx={{ color: 'text.secondary', mb: 4, maxWidth: 560 }}>
          Filter by category to find the ingredients your menu needs — every lot is quality-tested and traceable to origin.
        </Typography>

        <Stack direction="row" spacing={1} sx={{ mb: 5, flexWrap: 'wrap', gap: 1 }}>
          {FILTERS.map((f) => (
            <Chip
              key={f}
              label={f}
              onClick={() => setFilter(f)}
              color={filter === f ? 'secondary' : 'default'}
              variant={filter === f ? 'filled' : 'outlined'}
              sx={{ fontWeight: 500 }}
            />
          ))}
        </Stack>

        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)' },
            gap: 3,
          }}
        >
          {visible.map((product, i) => (
            <motion.div
              key={product.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.45, delay: i * 0.06 }}
            >
              <ProductCard product={product} />
            </motion.div>
          ))}
        </Box>
      </Box>
    </Box>
  )
}
