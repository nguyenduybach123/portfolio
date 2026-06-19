'use client'

import { FC, useEffect, useState, ReactNode } from 'react'
import { Button } from '@/components/ui/button'
import { useDynamicFilterContext } from '@/components/shared/dynamic-filter/lib/hooks'
import { SlidersHorizontalIcon } from 'lucide-react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface Props {
  title: string
  description?: string
  className?: String
  actions?: ReactNode
  showFilter?: boolean
}

const PageHeader: FC<Props> = ({ title, description, className, actions, showFilter = true }) => {
  const filterContext = useDynamicFilterContext()
  const isFilterOpen = filterContext?.isFilterOpen ?? false
  const setIsFilterOpen = filterContext?.setIsFilterOpen ?? (() => {})

  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header
      className={cn(
        'sticky top-0 z-30 flex flex-col justify-between gap-4 px-1 pb-4 pt-6 sm:flex-row sm:items-end',
        'bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60',
        'transition-all duration-200 ease-in-out',
        isScrolled ? 'border-b shadow-sm' : 'border-transparent',
        className
      )}
    >
      <div className='space-y-1.5'>
        <motion.h1
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className='text-2xl font-semibold tracking-tight text-foreground'
        >
          {title}
        </motion.h1>

        {description && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
            className='text-sm text-muted-foreground'
          >
            {description}
          </motion.p>
        )}
      </div>

      {/* Khu vực chứa các Actions */}
      <motion.div
        initial={{ opacity: 0, x: 10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.15 }}
        className='flex flex-wrap items-center gap-2'
      >
        {/* Render các custom actions được truyền từ cha */}
        {actions}

        {/* Render nút Filter nếu showFilter = true */}
        {showFilter && (
          <Button
            variant={isFilterOpen ? 'secondary' : 'outline'}
            size='sm'
            onClick={() => setIsFilterOpen(!isFilterOpen)}
            className='relative h-9 gap-2 px-4 transition-colors duration-200'
          >
            <motion.div animate={{ rotate: isFilterOpen ? 180 : 0 }} transition={{ duration: 0.3, ease: 'easeInOut' }}>
              <SlidersHorizontalIcon className='h-4 w-4' />
            </motion.div>
            <span className='font-medium'>{isFilterOpen ? 'Hide Filters' : 'Show Filters'}</span>
          </Button>
        )}
      </motion.div>
    </header>
  )
}

export default PageHeader
