import { cn } from '@/lib/utils'
import { FC, HTMLAttributes } from 'react'

interface Props extends HTMLAttributes<HTMLDivElement> {}

const TimelineSeperator: FC<Props> = (props) => {
  // Props
  const { className, children, ...restProps } = props

  return (
    <div className={cn('flex flex-col items-center', className)} {...restProps}>
      {children}
    </div>
  )
}

export default TimelineSeperator
