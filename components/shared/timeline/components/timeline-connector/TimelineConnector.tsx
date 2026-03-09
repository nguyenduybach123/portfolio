'use client'

import { cn } from '@/lib/utils'
import { useScroll, motion, useSpring, useTransform } from 'framer-motion'
import { FC, CSSProperties, useRef } from 'react'
import { useTimelineContext } from '../../lib/hooks'
import { colorClasses, TimelineColor } from '../../lib/constants'

interface Props {
  color?: TimelineColor
  animate?: boolean
  variant?: 'solid' | 'dashed' | 'dotted'
  className?: string
  style?: CSSProperties
}

// Component
const TimelineConnector: FC<Props> = (props) => {
  // Props
  const ref = useRef<HTMLDivElement>(null)
  const { className, color: colorProp, animate = true, variant = 'solid', style } = props

  const context = useTimelineContext()
  const color = colorProp || context.color
  const colors = colorClasses[color]

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 80%', 'end 60%']
  })

  // Smooth spring animation
  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  })

  const opacity = useTransform(scrollYProgress, [0, 0.1], [0.3, 1])

  const variantClasses = {
    solid: '',
    dashed: 'border-l-2 border-dashed bg-transparent',
    dotted: 'border-l-2 border-dotted bg-transparent'
  }

  // Template
  return (
    <div ref={ref} className='relative flex-1'>
      {animate ? (
        <motion.div
          style={{
            scaleY,
            opacity,
            originY: 0,
            ...style
          }}
          className={cn('h-full w-0.5', colors.connector, variantClasses[variant], className)}
        />
      ) : (
        <div className={cn('h-full w-0.5', colors.connector, variantClasses[variant], className)} style={style} />
      )}
    </div>
  )
}

export default TimelineConnector
