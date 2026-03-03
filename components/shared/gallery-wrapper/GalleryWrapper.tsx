// GalleryWrapper.tsx
'use client'

import { FC, ReactNode } from 'react'
import { cva, VariantProps } from 'class-variance-authority'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

const galleryVariants = cva('gap-8 columns-1 sm:columns-2 md:columns-3 xl:columns-4', {
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

interface Props extends VariantProps<typeof galleryVariants> {
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

const GalleryWrapper: FC<Props> = ({ children, animation }) => {
  return (
    <motion.div
      variants={animation === 'stagger' ? containerAnimation.stagger : undefined}
      initial='hidden'
      animate='visible'
      className={cn(galleryVariants({ animation }))}
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

export default GalleryWrapper
