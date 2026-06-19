'use client'

import { useState } from 'react'
import { Search, Filter, ArrowUpDown, Grid3x3, List } from 'lucide-react'
import { FileType } from '../../lib/types'

interface ToolbarProps {
  searchQuery: string
  onSearchChange: (query: string) => void
  selectedFilter: FileType | 'all'
  onFilterChange: (filter: FileType | 'all') => void
  sortBy: 'name' | 'date' | 'size'
  onSortChange: (sort: 'name' | 'date' | 'size') => void
  sortOrder: 'asc' | 'desc'
  onSortOrderChange: (order: 'asc' | 'desc') => void
  viewMode: 'grid' | 'list'
  onViewModeChange: (mode: 'grid' | 'list') => void
  selectedCount: number
  totalCount: number
  onSelectAll: () => void
  allSelected: boolean
}

interface FilesMediaToolbarProps extends ToolbarProps {}

const FilesMediaToolbar = ({
  searchQuery,
  onSearchChange,
  selectedFilter,
  onFilterChange,
  sortBy,
  onSortChange,
  sortOrder,
  onSortOrderChange,
  viewMode,
  onViewModeChange,
  selectedCount,
  allSelected
}: ToolbarProps) => {
  const [showFilterMenu, setShowFilterMenu] = useState(false)
  const [showSortMenu, setShowSortMenu] = useState(false)

  const filterOptions: Array<{ value: FileType | 'all'; label: string }> = [
    { value: 'all', label: 'All Files' },
    { value: 'image', label: 'Images' },
    { value: 'video', label: 'Videos' },
    { value: 'document', label: 'Documents' },
    { value: 'audio', label: 'Audio' }
  ]

  const sortOptions = [
    { value: 'name' as const, label: 'Name' },
    { value: 'date' as const, label: 'Date Modified' },
    { value: 'size' as const, label: 'Size' }
  ]

  return (
    <div className='flex items-center justify-between gap-4 px-4'>
      {/* Search Input */}
      <div className='relative flex-1'>
        <Search className='pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground' />
        <input
          type='text'
          placeholder='Search files...'
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className='w-full rounded-lg border border-border bg-card py-2 pl-10 pr-4 text-sm transition-all focus:outline-none focus:ring-2 focus:ring-accent/50'
        />
      </div>

      {/* Filter Dropdown */}
      <div className='relative'>
        <button
          onClick={() => setShowFilterMenu(!showFilterMenu)}
          className='inline-flex items-center gap-2 rounded-lg border border-border bg-card px-3 py-2 text-sm transition-colors hover:bg-card/80'
        >
          <Filter className='h-4 w-4' />
          Filter
        </button>

        {showFilterMenu && (
          <div className='absolute right-0 top-full z-10 mt-2 w-48 rounded-lg border border-border bg-card py-1 shadow-lg'>
            {filterOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => {
                  onFilterChange(option.value)
                  setShowFilterMenu(false)
                }}
                className={`w-full px-4 py-2 text-left text-sm transition-colors ${
                  selectedFilter === option.value ? 'bg-accent/20 font-medium text-accent' : 'hover:bg-card/50'
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Sort Dropdown */}
      <div className='relative'>
        <button
          onClick={() => setShowSortMenu(!showSortMenu)}
          className='inline-flex items-center gap-2 rounded-lg border border-border bg-card px-3 py-2 text-sm transition-colors hover:bg-card/80'
        >
          <ArrowUpDown className='h-4 w-4' />
          Sort
        </button>

        {showSortMenu && (
          <div className='absolute right-0 top-full z-10 mt-2 w-48 rounded-lg border border-border bg-card py-1 shadow-lg'>
            {sortOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => {
                  onSortChange(option.value)
                  setShowSortMenu(false)
                }}
                className={`w-full px-4 py-2 text-left text-sm transition-colors ${
                  sortBy === option.value ? 'bg-accent/20 font-medium text-accent' : 'hover:bg-card/50'
                }`}
              >
                {option.label}
              </button>
            ))}

            <div className='my-1 border-t border-border' />

            <button
              onClick={() => {
                onSortOrderChange(sortOrder === 'asc' ? 'desc' : 'asc')
                setShowSortMenu(false)
              }}
              className='w-full px-4 py-2 text-left text-sm transition-colors hover:bg-card/50'
            >
              {sortOrder === 'asc' ? '↑ Ascending' : '↓ Descending'}
            </button>
          </div>
        )}
      </div>

      {/* View Mode Toggle */}
      <div className='flex items-center gap-1 rounded-lg border border-border bg-card p-1'>
        <button
          onClick={() => onViewModeChange('grid')}
          className={`rounded p-1.5 transition-colors ${
            viewMode === 'grid' ? 'bg-accent/20 text-accent' : 'hover:bg-card/50'
          }`}
          title='Grid View'
        >
          <Grid3x3 className='h-4 w-4' />
        </button>

        <button
          onClick={() => onViewModeChange('list')}
          className={`rounded p-1.5 transition-colors ${
            viewMode === 'list' ? 'bg-accent/20 text-accent' : 'hover:bg-card/50'
          }`}
          title='List View'
        >
          <List className='h-4 w-4' />
        </button>
      </div>
    </div>
  )
}

export default FilesMediaToolbar
