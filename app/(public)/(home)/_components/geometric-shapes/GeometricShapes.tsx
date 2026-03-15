'use client'

import { motion } from 'framer-motion'
import './GeometricShapes.css'

export function GeometricShapes() {
  const shapes = [
    { id: 1, top: '15%', left: '25%', size: 'w-24 h-24', delay: 0 },
    { id: 2, top: '35%', left: '10%', size: 'w-16 h-16', delay: 0.2 },
    { id: 3, top: '60%', left: '30%', size: 'w-32 h-32', delay: 0.4 },
    { id: 4, top: '50%', right: '15%', size: 'w-40 h-40', delay: 0.6 },
    { id: 5, top: '75%', right: '5%', size: 'w-20 h-20', delay: 0.3 },
    { id: 6, top: '20%', right: '30%', size: 'w-12 h-12', delay: 0.5 }
  ]

  return (
    <div className='pointer-events-none fixed inset-0 z-0 overflow-hidden'>
      {shapes.map((shape) => (
        <motion.div
          key={shape.id}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 0.15, scale: 1 }}
          transition={{ delay: shape.delay, duration: 0.8 }}
          className={`floating-shape ${shape.size} ${
            shape.id % 2 === 0 ? 'rotate-45' : 'rotate-12'
          } rounded-xl bg-orange-200`}
          style={{
            top: shape.top,
            left: shape.left,
            right: shape.right,
            animationDelay: `${shape.delay}s`
          }}
        />
      ))}
    </div>
  )
}
