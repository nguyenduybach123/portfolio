// GridWrapper.tsx
'use client'

import { FC, ReactNode } from 'react'
import { cva, VariantProps } from 'class-variance-authority'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

const gridVariants = cva('gap-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4', {
  variants: {
    animation: {
      fade: '',
      slideUp: '',
      zoom: '',
      stagger: ''
    }
  },
  defaultVariants: {
    animation: 'fade'
  }
})

interface Props extends VariantProps<typeof gridVariants> {
  children: ReactNode
}

const containerAnimation = {
  stagger: {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1
      }
    }
  }
}

const itemAnimation = {
  fade: {
    hidden: { opacity: 0 },
    visible: { opacity: 1 }
  },
  slideUp: {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0 }
  },
  zoom: {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1 }
  },
  stagger: {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  }
}

const GridWrapper: FC<Props> = ({ children, animation }) => {
  return (
    <motion.div
      variants={animation === 'stagger' ? containerAnimation.stagger : undefined}
      initial='hidden'
      animate='visible'
      className={cn(gridVariants({ animation }))}
    >
      {Array.isArray(children)
        ? children.map((child, index) => (
            <motion.div
              key={index}
              variants={itemAnimation[animation || 'fade']}
              transition={{ duration: 0.4, ease: 'easeOut' }}
              className='mb-8 break-inside-avoid'
            >
              {child}
            </motion.div>
          ))
        : children}
    </motion.div>
  )
}

export default GridWrapper
