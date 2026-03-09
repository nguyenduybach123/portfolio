'use client'

import { cn } from '@/lib/utils'
import { FC, HTMLAttributes, ReactNode } from 'react'
import { motion, HTMLMotionProps } from 'framer-motion'

interface Props extends Omit<HTMLAttributes<HTMLDivElement>, 'onDrag' | 'onDragStart' | 'onDragEnd'> {
  children?: ReactNode
  animate?: boolean
  variant?: 'default' | 'card'
}

const TimelineContent: FC<Props> = (props) => {
  // Props
  const { className, children, animate = true, variant = 'default', ...restProps } = props

  const contentVariants = {
    initial: { opacity: 0, y: 20 },
    animate: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        delay: 0.2,
        ease: 'easeOut' as const
      }
    }
  }

  const variantClasses = {
    default: '',
    card: 'rounded-lg border bg-card p-4 shadow-sm hover:shadow-md transition-shadow'
  }

  const commonClasses = cn('flex-1 pb-8', variantClasses[variant], className)

  if (animate) {
    return (
      <motion.div
        className={commonClasses}
        variants={contentVariants}
        initial='initial'
        whileInView='animate'
        viewport={{ once: true }}
        {...(restProps as HTMLMotionProps<'div'>)}
      >
        {children}
      </motion.div>
    )
  }

  // Template
  return (
    <div className={commonClasses} {...restProps}>
      {children}
    </div>
  )
}

export default TimelineContent
