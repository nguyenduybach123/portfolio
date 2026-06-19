import { createContext } from 'react'
import { FilesMediaContextType } from './types'

export const FILES_MEDIA_CONTEXT = createContext<FilesMediaContextType | undefined>(undefined)
