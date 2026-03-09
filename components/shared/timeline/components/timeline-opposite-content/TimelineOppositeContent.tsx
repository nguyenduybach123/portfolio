'use client'

import { cn } from '@/lib/utils'
import { FC, HTMLAttributes, ReactNode } from 'react'
import { motion, HTMLMotionProps } from 'framer-motion'

interface Props extends Omit<HTMLAttributes<HTMLDivElement>, 'onDrag' | 'onDragStart' | 'onDragEnd'> {
  children?: ReactNode
  animate?: boolean
}

const TimelineOppositeContent: FC<Props> = (props) => {
  // Props
  const { className, children, animate = true, ...restProps } = props

  const contentVariants = {
    initial: { opacity: 0, x: -20 },
    animate: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.4,
        delay: 0.1,
        ease: 'easeOut' as const
      }
    }
  }

  const commonClasses = cn('flex-1 pb-8 text-sm text-muted-foreground', className)

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

export default TimelineOppositeContent
