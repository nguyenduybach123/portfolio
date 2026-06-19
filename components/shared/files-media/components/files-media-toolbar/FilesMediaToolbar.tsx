'use client'

import { useId } from 'react'
import { motion } from 'framer-motion'
import { Search, Filter, ArrowUpDown, Grid3x3, List, Check, ArrowDown, ArrowUp } from 'lucide-react'

import { useFilesMediaContext } from '../../lib/hooks'
import { FileType } from '../../lib/types'

// Import shadcn components (Điều chỉnh đường dẫn cho phù hợp với project của bạn)
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'

interface ToolbarProps {
  searchQuery?: string
  selectedFilter?: FileType | 'all'
  viewBy?: 'name' | 'date' | 'size'
  sortOrder?: 'asc' | 'desc'
  sortBy?: 'name' | 'date' | 'size'
  viewMode?: 'grid' | 'list'
  selectedCount: number
  allSelected: boolean
  totalCount: number
  onSelectAll?: () => void
  onSearchChange?: (query: string) => void
  onFilterChange?: (filter: FileType | 'all') => void
  onViewModeChange?: (mode: 'grid' | 'list') => void
  onSortOrderChange?: (order: 'asc' | 'desc') => void
  onSortChange?: (sort: 'name' | 'date' | 'size') => void
}

const FilesMediaToolbar = (props: Partial<ToolbarProps>) => {
  const context = (() => {
    try {
      return useFilesMediaContext()
    } catch {
      return null
    }
  })()

  // Props resolution
  const searchQuery = props.searchQuery ?? context?.searchQuery ?? ''
  const onSearchChange = props.onSearchChange ?? context?.setSearchQuery ?? (() => {})
  const selectedFilter = props.selectedFilter ?? 'all'
  const onFilterChange = props.onFilterChange ?? (() => {})
  const sortBy = props.sortBy ?? 'name'
  const onSortChange = props.onSortChange ?? (() => {})
  const sortOrder = props.sortOrder ?? 'asc'
  const onSortOrderChange = props.onSortOrderChange ?? (() => {})
  const viewMode = props.viewMode ?? context?.viewMode ?? 'grid'
  const onViewModeChange = props.onViewModeChange ?? context?.setViewMode ?? (() => {})

  const layoutId = useId() // Dùng cho Framer Motion layout animations

  const filterOptions: Array<{ value: FileType | 'all'; label: string }> = [
    { value: 'all', label: 'All Files' },
    { value: 'image', label: 'Images' },
    { value: 'video', label: 'Videos' },
    { value: 'document', label: 'Documents' },
    { value: 'audio', label: 'Audio' }
  ]

  const sortOptions = [
    { value: 'name', label: 'Name' },
    { value: 'date', label: 'Date Modified' },
    { value: 'size', label: 'Size' }
  ] as const

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className='flex flex-wrap items-center justify-between gap-4 px-4 pb-2'
    >
      {/* Search Input - Phong cách Minimalist không viền cứng */}
      <div className='relative flex-1 sm:max-w-xs'>
        <Search className='absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground/70' />
        <Input
          type='text'
          placeholder='Search files...'
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className='h-9 w-full border-transparent bg-muted/50 pl-9 shadow-none transition-all hover:bg-muted focus-visible:border-primary/20 focus-visible:bg-background focus-visible:ring-1 focus-visible:ring-primary/30'
        />
      </div>

      <div className='flex items-center gap-2 lg:gap-3'>
        {/* Filter Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant='outline'
              size='sm'
              className='h-9 border-dashed border-border/60 bg-transparent px-3 text-muted-foreground hover:text-foreground'
            >
              <Filter className='mr-2 h-4 w-4' />
              {selectedFilter === 'all' ? 'Filter' : filterOptions.find((o) => o.value === selectedFilter)?.label}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align='end' className='w-48 rounded-xl shadow-sm'>
            <DropdownMenuRadioGroup value={selectedFilter} onValueChange={(v) => onFilterChange(v as FileType | 'all')}>
              {filterOptions.map((option) => (
                <DropdownMenuRadioItem key={option.value} value={option.value} className='cursor-pointer'>
                  {option.label}
                </DropdownMenuRadioItem>
              ))}
            </DropdownMenuRadioGroup>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Sort Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant='outline'
              size='sm'
              className='h-9 border-dashed border-border/60 bg-transparent px-3 text-muted-foreground hover:text-foreground'
            >
              <ArrowUpDown className='mr-2 h-4 w-4' />
              Sort
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align='end' className='w-48 rounded-xl shadow-sm'>
            <DropdownMenuRadioGroup value={sortBy} onValueChange={(v) => onSortChange(v as 'name' | 'date' | 'size')}>
              {sortOptions.map((option) => (
                <DropdownMenuRadioItem key={option.value} value={option.value} className='cursor-pointer'>
                  {option.label}
                </DropdownMenuRadioItem>
              ))}
            </DropdownMenuRadioGroup>

            <DropdownMenuSeparator />

            <DropdownMenuItem
              onClick={() => onSortOrderChange(sortOrder === 'asc' ? 'desc' : 'asc')}
              className='cursor-pointer text-muted-foreground'
            >
              {sortOrder === 'asc' ? (
                <>
                  <ArrowUp className='mr-2 h-4 w-4' /> Ascending
                </>
              ) : (
                <>
                  <ArrowDown className='mr-2 h-4 w-4' /> Descending
                </>
              )}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* View Mode Toggle - Animated Sliding Background */}
        <div className='relative flex items-center rounded-lg bg-muted/50 p-1'>
          {(['grid', 'list'] as const).map((mode) => {
            const isActive = viewMode === mode
            return (
              <button
                key={mode}
                onClick={() => onViewModeChange(mode)}
                className={`relative z-10 flex h-7 w-7 items-center justify-center rounded-md text-sm transition-colors ${
                  isActive ? 'text-foreground' : 'text-muted-foreground hover:text-foreground'
                }`}
                title={`${mode.charAt(0).toUpperCase() + mode.slice(1)} View`}
              >
                {isActive && (
                  <motion.div
                    layoutId={`view-toggle-${layoutId}`}
                    className='absolute inset-0 z-0 rounded-md border border-border/50 bg-background shadow-sm'
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  />
                )}
                <span className='relative z-10'>
                  {mode === 'grid' ? <Grid3x3 className='h-4 w-4' /> : <List className='h-4 w-4' />}
                </span>
              </button>
            )
          })}
        </div>
      </div>
    </motion.div>
  )
}

export default FilesMediaToolbar
