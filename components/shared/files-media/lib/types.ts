export type FileType = 'image' | 'video' | 'document' | 'audio' | 'folder' | 'other'

export type ViewMode = 'grid' | 'list'

export type SortBy = 'name' | 'date' | 'size'

export type SortOrder = 'asc' | 'desc'

export interface FilesMediaContextType {
  // State
  currentFolderId: string | null
  viewMode: 'grid' | 'list'
  searchQuery: string
  selectedFileIds: Set<string>
  files: FileItem[]
  currentPath: string[]
  isUploadOpen: boolean
  selectedFile: FileItem | null

  // Actions
  setCurrentFolderId: (id: string | null) => void
  setViewMode: (mode: 'grid' | 'list') => void
  setSearchQuery: (query: string) => void
  toggleFileSelection: (id: string) => void
  clearSelection: () => void
  selectAll: () => void
  setFiles: (files: FileItem[]) => void
  setCurrentPath: (path: string[]) => void
  setIsUploadOpen: (open: boolean) => void
  setSelectedFile: (file: FileItem | null) => void
  navigateTo: (folderId: string) => void
  navigateBack: () => void
  deleteFiles: (ids: string[]) => void
  renameFile: (id: string, newName: string) => void
}

export interface FileItem {
  id: string
  name: string
  type: FileType
  mimeType?: string
  size?: number
  width?: number
  height?: number
  duration?: number
  url?: string
  previewUrl?: string
  parentId?: string
  createdAt: Date
  updatedAt: Date
  isFolder?: boolean
  children?: FileItem[]
}

export interface FolderNode {
  id: string
  name: string
  icon: string
  children?: FolderNode[]
  isExpanded?: boolean
}

export interface FileManagerState {
  currentPath: string[]
  currentFolderId: string | null
  selectedFileIds: Set<string>
  viewMode: ViewMode
  searchQuery: string
  selectedFilter: FileType | 'all'
  sortBy: SortBy
  sortOrder: SortOrder
  isPreviewOpen: boolean
  previewFileId: string | null
  uploadProgress: number
  isUploading: boolean
}

export interface FileContextMenuAction {
  label: string
  icon: React.ReactNode
  action: () => void
  variant?: 'default' | 'destructive'
}
