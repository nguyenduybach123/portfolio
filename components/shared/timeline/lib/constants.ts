import { createContext } from 'react'

export type TimelineVariant = 'default' | 'outlined' | 'dashed'
export type TimelinePosition = 'left' | 'right' | 'alternate'
export type TimelineColor = 'default' | 'primary' | 'success' | 'warning' | 'error' | 'info'

export interface TimelineContextValue {
  variant: TimelineVariant
  position: TimelinePosition
  color: TimelineColor
  index?: number
}

export const TIMELINE_CONTEXT = createContext<TimelineContextValue | null>(null)

// Color mapping for Tailwind/Shadcn
export const colorClasses = {
  default: {
    dot: 'bg-gray-300 text-gray-700 border-gray-300',
    connector: 'bg-gray-300',
    ring: 'ring-gray-200'
  },
  primary: {
    dot: 'bg-primary text-primary-foreground border-primary',
    connector: 'bg-primary',
    ring: 'ring-primary/20'
  },
  success: {
    dot: 'bg-green-500 text-white border-green-500',
    connector: 'bg-green-500',
    ring: 'ring-green-200'
  },
  warning: {
    dot: 'bg-yellow-500 text-white border-yellow-500',
    connector: 'bg-yellow-500',
    ring: 'ring-yellow-200'
  },
  error: {
    dot: 'bg-red-500 text-white border-red-500',
    connector: 'bg-red-500',
    ring: 'ring-red-200'
  },
  info: {
    dot: 'bg-blue-500 text-white border-blue-500',
    connector: 'bg-blue-500',
    ring: 'ring-blue-200'
  }
} as const
