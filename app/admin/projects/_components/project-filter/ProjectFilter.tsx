'use client'

import { DynamicFilter } from '@/components/shared'
import { PROJECT_FILTER_FIELD_CONFIG, PROJECT_FILTER_SCHEMA } from './lib/constants'
import { FC, ReactNode } from 'react'

interface Props {
  children: ReactNode
}

const ProjectFilter: FC<Props> = (props) => {
  // Props
  const { children } = props

  const handleFilterSubmit = () => {}

  return (
    <DynamicFilter
      schema={PROJECT_FILTER_SCHEMA}
      onSubmit={handleFilterSubmit}
      fieldConfig={PROJECT_FILTER_FIELD_CONFIG}
    >
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

export default ProjectFilter
