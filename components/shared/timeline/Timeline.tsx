'use client'

import { assign } from 'lodash'
import { FC, ReactNode } from 'react'
import { cn } from '@/lib/utils'
import { TIMELINE_CONTEXT, TimelineVariant, TimelinePosition, TimelineColor } from './lib/constants'
import {
  TimelineConnector,
  TimelineContent,
  TimelineDot,
  TimelineItem,
  TimelineSeperator,
  TimelineOppositeContent
} from './components'

interface TimelineProps {
  children: ReactNode
  variant?: TimelineVariant
  position?: TimelinePosition
  color?: TimelineColor
  className?: string
}

const Timeline: FC<TimelineProps> = (props) => {
  // Props
  const { children, variant = 'default', position = 'left', color = 'default', className } = props

  return (
    <TIMELINE_CONTEXT.Provider value={{ variant, position, color }}>
      <div className={cn('relative', className)}>{children}</div>
    </TIMELINE_CONTEXT.Provider>
  )
}

export default assign(Timeline, {
  Dot: TimelineDot,
  Item: TimelineItem,
  Content: TimelineContent,
  Connector: TimelineConnector,
  Separator: TimelineSeperator,
  OppositeContent: TimelineOppositeContent
})
