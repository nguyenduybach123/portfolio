'use client'

import { MapSection } from '@/components/shared'
import { motion } from 'framer-motion'

export default function MapPage() {
  return (
    <section className='container mx-auto h-dvh max-w-6xl py-20'>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        <MapSection />
      </motion.div>
    </section>
  )
}
