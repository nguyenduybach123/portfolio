'use client'

import { cn } from '@/lib/utils'
import { FC, HTMLAttributes, ReactNode } from 'react'
import { motion, HTMLMotionProps } from 'framer-motion'
import { useTimelineContext } from '../../lib/hooks'

interface Props extends Omit<HTMLAttributes<HTMLDivElement>, 'onDrag' | 'onDragStart' | 'onDragEnd'> {
  children: ReactNode
  animate?: boolean
  position?: 'left' | 'right'
}

const TimelineItem: FC<Props> = (props) => {
  // Props
  const { children, className, animate = true, position: positionProp, ...restProps } = props
  const context = useTimelineContext()
  const position = positionProp || context.position

  const itemVariants = {
    initial: { opacity: 0, x: position === 'right' ? 50 : -50 },
    animate: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.5,
        ease: 'easeOut' as const
      }
    }
  }

  const commonClasses = cn('relative mb-8 flex gap-4 last:mb-0', position === 'right' && 'flex-row-reverse', className)

  if (animate) {
    return (
      <motion.div
        className={commonClasses}
        variants={itemVariants}
        initial='initial'
        whileInView='animate'
        viewport={{ once: true, margin: '-50px' }}
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

export default TimelineItem
