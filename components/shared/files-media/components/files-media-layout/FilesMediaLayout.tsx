'use client'

import React, { ReactNode } from 'react'

interface FilesMediaLayoutProps {
  children: ReactNode
}

/**
 * FilesMediaLayout - Overall page layout structure
 * Provides the main grid structure for sidebar + content
 */
const FilesMediaLayout = ({ children }: FilesMediaLayoutProps) => {
  return <div className='flex h-full w-full bg-background'>{children}</div>
}

export default FilesMediaLayout
