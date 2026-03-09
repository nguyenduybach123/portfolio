import { useContext } from 'react'
import { TIMELINE_CONTEXT } from './constants'

export const useTimelineContext = () => {
  const context = useContext(TIMELINE_CONTEXT)

  if (!context) {
    throw new Error('useTimelineContext must be used within a TimelineProvider')
  }

  return context
}
