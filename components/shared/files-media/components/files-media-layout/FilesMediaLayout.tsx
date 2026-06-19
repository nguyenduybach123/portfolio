'use client'

import { ResizablePanelGroup } from '@/components/ui/resizable'
import React, { ReactNode } from 'react'

interface FilesMediaLayoutProps {
  children: ReactNode
}

/**
 * FilesMediaLayout - Overall page layout structure
 * Provides the main grid structure for sidebar + content
 */
const FilesMediaLayout = ({ children }: FilesMediaLayoutProps) => {
  return (
    <ResizablePanelGroup orientation='horizontal' className='h-full w-full'>
      <div className='flex h-full w-full bg-background'>{children}</div>
    </ResizablePanelGroup>
  )
}

export default FilesMediaLayout
