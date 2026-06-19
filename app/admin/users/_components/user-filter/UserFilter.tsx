'use client'

import { DynamicFilter } from '@/components/shared'
import { USER_FILTER_FIELD_CONFIG, USER_FILTER_SCHEMA } from './lib/constants'
import { FC, ReactNode } from 'react'

interface Props {
  children: ReactNode
}

const UserFilter: FC<Props> = (props) => {
  // Props
  const { children } = props

  const handleFilterSubmit = () => {}

  return (
    <DynamicFilter schema={USER_FILTER_SCHEMA} onSubmit={handleFilterSubmit} fieldConfig={USER_FILTER_FIELD_CONFIG}>
      <div className='flex'>
        <DynamicFilter.Content>
          {/* Filter Sidebar */}
          <DynamicFilter.Sidebar>
            <div className='space-y-5'>
              <DynamicFilter.Fields />
              <DynamicFilter.Actions />
            </div>
          </DynamicFilter.Sidebar>
        </DynamicFilter.Content>
        {/* Main Content */}
        <div className='flex-1'>{children}</div>
      </div>
    </DynamicFilter>
  )
}

export default UserFilter
