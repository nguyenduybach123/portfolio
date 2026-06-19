'use client'

import { Button } from '@/components/ui/button'
import { PlusIcon } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { PageTable } from './_components'
import { mockPages } from '@/data/page-data'
import { BASE_PATHS } from '@/constants/path'

const Pages = () => {
  // Hooks
  const router = useRouter()

  // Methods
  const handleCreatePage = () => {
    router.push(BASE_PATHS.admin.pages.create)
  }

  return (
    <div className='container mx-auto flex max-w-6xl bg-background'>
      {/* Main Content */}
      <div className='flex-1 overflow-auto'>
        <div className='space-y-6 p-6 lg:p-8'>
          {/* Page Header */}
          <div className='flex flex-col justify-between gap-4 sm:flex-row sm:items-end'>
            <div className='space-y-1'>
              <h1 className='text-2xl font-bold tracking-tight'>Pages List</h1>
              <p className='text-sm text-muted-foreground'>Manage the pages in the system</p>
            </div>
            <div className='flex items-center gap-2'>
              <Button onClick={handleCreatePage} className='gap-2'>
                <PlusIcon className='h-4 w-4' />
                Add New
              </Button>
            </div>
          </div>

          {/* Page Table */}
          <PageTable data={mockPages} />
        </div>
      </div>
    </div>
  )
}

export default Pages
