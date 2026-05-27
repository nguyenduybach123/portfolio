'use client'

import { DynamicFilter } from '@/components/shared'
import { POST_FILTER_FIELD_CONFIG, POST_FILTER_SCHEMA } from './_lib/constants'
import { PostFilterType } from './_lib/types'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { PlusIcon, SlidersHorizontalIcon } from 'lucide-react'
import { useRouter } from 'next/navigation'
import PostTable from '@/components/modules/posts/post-table/PostTable'
import { mockPosts } from '@/data/posts'

const Posts = () => {
  // Hooks
  const router = useRouter()

  // States
  const [isFilterOpen, setIsFilterOpen] = useState(false)

  // Methods
  const handleCreatePost = () => {
    router.push('/admin/posts/create')
  }

  const handleFilterSubmit = (data: PostFilterType) => {}

  return (
    <div className='container mx-auto flex max-w-6xl bg-background'>
      {/* Filter Sidebar */}
      <DynamicFilter schema={POST_FILTER_SCHEMA} onSubmit={handleFilterSubmit} fieldConfig={POST_FILTER_FIELD_CONFIG}>
        <DynamicFilter.Sidebar open={isFilterOpen} onClose={() => setIsFilterOpen(false)}>
          <div className='space-y-5'>
            <DynamicFilter.Fields />
            <DynamicFilter.Actions />
          </div>
        </DynamicFilter.Sidebar>
      </DynamicFilter>

      {/* Main Content */}
      <div className='flex-1 overflow-auto'>
        <div className='space-y-6 p-6 lg:p-8'>
          {/* Post Header */}
          <div className='flex flex-col justify-between gap-4 sm:flex-row sm:items-end'>
            <div className='space-y-1'>
              <h1 className='text-2xl font-bold tracking-tight'>Posts List</h1>
              <p className='text-sm text-muted-foreground'>Manage the posts in the system</p>
            </div>
            <div className='flex items-center gap-2'>
              <Button
                variant='outline'
                size='default'
                onClick={() => setIsFilterOpen(!isFilterOpen)}
                className='relative gap-2'
              >
                <SlidersHorizontalIcon className='h-4 w-4' />
                {isFilterOpen ? 'Hide Filter' : 'Show Filter'}
              </Button>
              <Button onClick={handleCreatePost} className='gap-2'>
                <PlusIcon className='h-4 w-4' />
                Add New
              </Button>
            </div>
          </div>

          {/* Post Table */}
          <PostTable data={mockPosts} />
        </div>
      </div>
    </div>
  )
}

export default Posts
