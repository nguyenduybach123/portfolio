'use client'

import React, { useCallback, useState } from 'react'
import { FileItem, FilesMediaContextType } from './lib/types'
import { FILES_MEDIA_CONTEXT } from './lib/constants'
import assign from 'lodash-es/assign'
import {
  FilesMediaEmpty,
  FilesMediaHeader,
  FilesMediaLayout,
  FilesMediaMain,
  FilesMediaPreview,
  FilesMediaSideBar,
  FilesMediaToolbar,
  FilesMediaUpload,
  FilesMediaView
} from './components'

interface FilesMediaProviderProps {
  children: React.ReactNode
  initialFiles: FileItem[]
  initialFolderId?: string | null
}

export function FilesMedia({ children, initialFiles, initialFolderId = null }: FilesMediaProviderProps) {
  const [currentFolderId, setCurrentFolderId] = useState<string | null>(initialFolderId)
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedFileIds, setSelectedFileIds] = useState<Set<string>>(new Set())
  const [files, setFiles] = useState<FileItem[]>(initialFiles)
  const [currentPath, setCurrentPath] = useState<string[]>(['Home'])
  const [isUploadOpen, setIsUploadOpen] = useState(false)
  const [selectedFile, setSelectedFile] = useState<FileItem | null>(null)

  const toggleFileSelection = useCallback((id: string) => {
    setSelectedFileIds((prev) => {
      const newSet = new Set(prev)
      if (newSet.has(id)) {
        newSet.delete(id)
      } else {
        newSet.add(id)
      }
      return newSet
    })
  }, [])

  const clearSelection = useCallback(() => {
    setSelectedFileIds(new Set())
  }, [])

  const selectAll = useCallback(() => {
    const filteredFiles = getFilteredFiles()
    const allIds = new Set(filteredFiles.map((f) => f.id))
    setSelectedFileIds(allIds)
  }, [files, currentFolderId, searchQuery])

  const navigateTo = useCallback(
    (folderId: string) => {
      // Navigate to folder by ID (folders are navigation constructs, not in files array)
      setCurrentFolderId(folderId)
      clearSelection()
      setSelectedFile(null)
    },
    [clearSelection]
  )

  const navigateBack = useCallback(() => {
    if (currentPath.length > 1) {
      setCurrentPath((prev) => prev.slice(0, -1))
      // Find parent folder or go to root
      setCurrentFolderId(null)
      clearSelection()
      setSelectedFile(null)
    }
  }, [currentPath, clearSelection])

  const deleteFiles = useCallback(
    (ids: string[]) => {
      setFiles((prev) => prev.filter((f) => !ids.includes(f.id)))
      clearSelection()
    },
    [clearSelection]
  )

  const renameFile = useCallback((id: string, newName: string) => {
    setFiles((prev) => prev.map((f) => (f.id === id ? { ...f, name: newName } : f)))
  }, [])

  const getFilteredFiles = useCallback(() => {
    let filtered = files.filter((f) => (currentFolderId ? f.parentId === currentFolderId : !f.parentId))

    if (searchQuery) {
      filtered = filtered.filter((f) => f.name.toLowerCase().includes(searchQuery.toLowerCase()))
    }

    return filtered
  }, [files, currentFolderId, searchQuery])

  const value: FilesMediaContextType = {
    currentFolderId,
    viewMode,
    searchQuery,
    selectedFileIds,
    files,
    currentPath,
    isUploadOpen,
    selectedFile,
    setCurrentFolderId,
    setViewMode,
    setSearchQuery,
    toggleFileSelection,
    clearSelection,
    selectAll,
    setFiles,
    setCurrentPath,
    setIsUploadOpen,
    setSelectedFile,
    navigateTo,
    navigateBack,
    deleteFiles,
    renameFile
  }

  return <FILES_MEDIA_CONTEXT.Provider value={value}>{children}</FILES_MEDIA_CONTEXT.Provider>
}

const FilesMediaCompound = assign(FilesMedia, {
  Header: FilesMediaHeader,
  Main: FilesMediaMain,
  Layout: FilesMediaLayout,
  SideBar: FilesMediaSideBar,
  Toolbar: FilesMediaToolbar,
  Upload: FilesMediaUpload,
  Preview: FilesMediaPreview,
  Empty: FilesMediaEmpty,
  View: FilesMediaView
})

export type { FilesMediaProviderProps }

export default FilesMediaCompound
