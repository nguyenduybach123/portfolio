'use client'

import { useContext } from 'react'
import { FilesMediaContextType } from './types'
import { FILES_MEDIA_CONTEXT } from './constants'

export function useFilesMediaContext(): FilesMediaContextType {
  const context = useContext(FILES_MEDIA_CONTEXT)
  if (!context) {
    throw new Error('useFilesMediaContext must be used within FilesMediaProvider')
  }

  return context
}
