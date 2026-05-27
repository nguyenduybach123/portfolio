'use client'

import { DynamicFilter } from '@/components/shared'
import { USER_FILTER_FIELD_CONFIG, USER_FILTER_SCHEMA } from './_lib/constants'
import { UserFilterValues } from './_lib/types'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { SlidersHorizontalIcon } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { UserTable } from './_components'
import { mockUsers } from '@/data/user-data'

const Users = () => {
  // States
  const [isFilterOpen, setIsFilterOpen] = useState(false)

  const handleFilterSubmit = (data: UserFilterValues) => {}

  return (
    <div className='container mx-auto flex max-w-6xl'>
      {/* Filter Sidebar */}
      <DynamicFilter schema={USER_FILTER_SCHEMA} onSubmit={handleFilterSubmit} fieldConfig={USER_FILTER_FIELD_CONFIG}>
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
          {/* User Header */}
          <div className='flex flex-col justify-between gap-4 sm:flex-row sm:items-end'>
            <div className='space-y-1'>
              <h1 className='text-2xl font-bold tracking-tight'>Users List</h1>
              <p className='text-sm text-muted-foreground'>Manage users in the system</p>
            </div>
            <div className='flex items-center gap-2'>
              <Button
                variant='outline'
                size='default'
                onClick={() => setIsFilterOpen(!isFilterOpen)}
                className='relative gap-2'
              >
                <SlidersHorizontalIcon className='h-4 w-4' />
                {isFilterOpen ? 'Hide Filters' : 'Show Filters'}
              </Button>
            </div>
          </div>

          {/* User Table */}
          <UserTable data={mockUsers} />
        </div>
      </div>
    </div>
  )
}

export default Users
