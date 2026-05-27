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
import { ProjectTable } from '@/components/modules/projects'
import { projects } from '@/data/project-data'

const Projects = () => {
  // Hooks
  const router = useRouter()

  // States
  const [isFilterOpen, setIsFilterOpen] = useState(false)

  // Methods
  const handleCreateProject = () => {
    router.push('/admin/projects/create')
  }

  const handleFilterSubmit = (data: PostFilterType) => {}

  return (
    <div className='container mx-auto flex max-w-6xl bg-background'>
      {/* Filter Sidebar */}
      <DynamicFilter schema={POST_FILTER_SCHEMA} onSubmit={handleFilterSubmit} fieldConfig={POST_FILTER_FIELD_CONFIG}>
        <DynamicFilter.Sidebar open={isFilterOpen} onClose={() => setIsFilterOpen(false)}>
          <div className='space-y-5'>
            <DynamicFilter.Actions />
          </div>
        </DynamicFilter.Sidebar>
      </DynamicFilter>

      {/* Main Content */}
      <div className='flex-1 overflow-auto'>
        <div className='space-y-6 p-6 lg:p-8'>
          {/* Project Header */}
          <div className='flex flex-col justify-between gap-4 sm:flex-row sm:items-end'>
            <div className='space-y-1'>
              <h1 className='text-2xl font-bold tracking-tight'>Dự án</h1>
              <p className='text-sm text-muted-foreground'>Quản lý các dự án trong hệ thống</p>
            </div>
            <div className='flex items-center gap-2'>
              <Button
                variant='outline'
                size='default'
                onClick={() => setIsFilterOpen(!isFilterOpen)}
                className='relative gap-2'
              >
                <SlidersHorizontalIcon className='h-4 w-4' />
                {isFilterOpen ? 'Ẩn bộ lọc' : 'Hiện bộ lọc'}
              </Button>
              <Button onClick={handleCreateProject} className='gap-2'>
                <PlusIcon className='h-4 w-4' />
                Thêm mới
              </Button>
            </div>
          </div>

          {/* Project Table */}
          <ProjectTable data={projects} />
        </div>
      </div>
    </div>
  )
}

export default Projects
