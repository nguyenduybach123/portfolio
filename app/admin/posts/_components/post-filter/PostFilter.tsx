'use client'

import { DynamicFilter } from '@/components/shared'
import { FC, ReactNode } from 'react'
import { POST_FILTER_FIELD_CONFIG, POST_FILTER_SCHEMA } from './lib/constants'

interface Props {
  children: ReactNode
}

const PostFilter: FC<Props> = (props) => {
  // Props
  const { children } = props

  const handleFilterSubmit = () => {}

  return (
    <DynamicFilter schema={POST_FILTER_SCHEMA} onSubmit={handleFilterSubmit} fieldConfig={POST_FILTER_FIELD_CONFIG}>
      <div className='flex'>
        <DynamicFilter.Content>
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

export default PostFilter
