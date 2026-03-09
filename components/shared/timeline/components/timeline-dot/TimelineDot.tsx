'use client'

import { cn } from '@/lib/utils'
import { LucideIcon } from 'lucide-react'
import { FC, HTMLAttributes, ReactNode, useRef } from 'react'
import { motion, HTMLMotionProps, useScroll } from 'framer-motion'
import { useTimelineContext } from '../../lib/hooks'
import { colorClasses, TimelineColor } from '../../lib/constants'

interface Props extends Omit<HTMLAttributes<HTMLDivElement>, 'onDrag' | 'onDragStart' | 'onDragEnd'> {
  size?: 'sm' | 'md' | 'lg'
  icon?: LucideIcon
  children?: ReactNode
  color?: TimelineColor
  variant?: 'filled' | 'outlined' | 'soft'
  animate?: boolean
}

const sizeClasses = {
  sm: 'h-6 w-6 text-xs',
  md: 'h-8 w-8 text-sm',
  lg: 'h-10 w-10 text-base'
}

const iconSizeClasses = {
  sm: 'h-3 w-3',
  md: 'h-4 w-4',
  lg: 'h-5 w-5'
}

const TimelineDot: FC<Props> = (props) => {
  // Props
  const {
    icon: Icon,
    size = 'md',
    className,
    children,
    color: colorProp,
    variant = 'filled',
    animate = true,
    ...restProps
  } = props

  // Hooks
  const ref = useRef<HTMLDivElement>(null)
  const context = useTimelineContext()

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 80%', 'end 60%']
  })

  // Memos
  const color = colorProp || context.color
  const colors = colorClasses[color]

  const variantClasses = {
    filled: colors.dot,
    outlined: `bg-background border-2 ${colors.dot.split(' ')[2]} text-current`,
    soft: `${colors.dot.replace('bg-', 'bg-').replace('500', '100')} ${colors.dot.split(' ')[1]}`
  }

  const dotVariants = {
    initial: { scale: 0, opacity: 0 },
    animate: {
      scale: 1,
      opacity: 1,
      transition: {
        type: 'spring' as const,
        stiffness: 260,
        damping: 20
      }
    }
  }

  const commonClasses = cn(
    'relative z-10 flex items-center justify-center rounded-full shadow-sm ring-4 ring-background',
    sizeClasses[size],
    variantClasses[variant],
    className
  )

  const content = (
    <>
      {Icon && <Icon className={iconSizeClasses[size]} />}
      {children}
    </>
  )

  if (animate) {
    return (
      <motion.div
        ref={ref}
        className={commonClasses}
        variants={dotVariants}
        initial='initial'
        whileInView='animate'
        viewport={{ once: true, margin: '-50px' }}
        {...(restProps as HTMLMotionProps<'div'>)}
      >
        {/* <svg viewBox='0 0 100 100' className='absolute inset-0'>
          <motion.circle
            cx={50}
            cy={50}
            r={20}
            className='fill-light absolute inset-0 m-auto stroke-[5px]'
            style={{
              pathLength: scrollYProgress
            }}
          />
        </svg> */}
        {content}
      </motion.div>
    )
  }

  return (
    <div className={commonClasses} {...restProps}>
      {content}
    </div>
  )
}

export default TimelineDot
