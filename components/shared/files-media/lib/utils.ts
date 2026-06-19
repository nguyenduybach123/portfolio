import { FileItem, FileType } from './types'

export function formatFileSize(bytes: number | undefined): string {
  if (!bytes) return '0 B'
  const units = ['B', 'KB', 'MB', 'GB']
  let size = bytes
  let unitIndex = 0

  while (size >= 1024 && unitIndex < units.length - 1) {
    size /= 1024
    unitIndex++
  }

  return `${size.toFixed(1)} ${units[unitIndex]}`
}

export function formatDate(date: Date | string): string {
  const d = typeof date === 'string' ? new Date(date) : date
  const now = new Date()
  const diff = now.getTime() - d.getTime()
  const seconds = Math.floor(diff / 1000)
  const minutes = Math.floor(seconds / 60)
  const hours = Math.floor(minutes / 60)
  const days = Math.floor(hours / 24)

  if (days > 7) {
    return d.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: d.getFullYear() !== now.getFullYear() ? 'numeric' : undefined,
    })
  }
  if (days > 0) return `${days} day${days > 1 ? 's' : ''} ago`
  if (hours > 0) return `${hours} hour${hours > 1 ? 's' : ''} ago`
  if (minutes > 0) return `${minutes} minute${minutes > 1 ? 's' : ''} ago`
  return 'just now'
}

export function getFileIconType(
  fileType: FileType,
  isFolder?: boolean,
): string {
  if (isFolder) return 'folder'

  switch (fileType) {
    case 'image':
      return 'image'
    case 'video':
      return 'video'
    case 'audio':
      return 'audio'
    case 'document':
      return 'document'
    default:
      return 'file'
  }
}

export function getFileTypeFromMime(mimeType?: string): FileType {
  if (!mimeType) return 'other'

  if (mimeType.startsWith('image/')) return 'image'
  if (mimeType.startsWith('video/')) return 'video'
  if (mimeType.startsWith('audio/')) return 'audio'
  if (
    mimeType.includes('pdf') ||
    mimeType.includes('word') ||
    mimeType.includes('excel') ||
    mimeType.includes('spreadsheet') ||
    mimeType.includes('presentation')
  ) {
    return 'document'
  }

  return 'other'
}

export function filterFiles(
  files: FileItem[],
  query: string,
  filterType: FileType | 'all',
): FileItem[] {
  return files.filter((file) => {
    const matchesSearch = file.name
      .toLowerCase()
      .includes(query.toLowerCase())
    const matchesType = filterType === 'all' || file.type === filterType

    return matchesSearch && matchesType
  })
}

export function sortFiles(
  files: FileItem[],
  sortBy: 'name' | 'date' | 'size',
  order: 'asc' | 'desc',
): FileItem[] {
  const sorted = [...files]
  const multiplier = order === 'asc' ? 1 : -1

  sorted.sort((a, b) => {
    switch (sortBy) {
      case 'name':
        return multiplier * a.name.localeCompare(b.name)
      case 'date':
        return (
          multiplier *
          (new Date(a.updatedAt).getTime() -
            new Date(b.updatedAt).getTime())
        )
      case 'size':
        return multiplier * ((a.size || 0) - (b.size || 0))
      default:
        return 0
    }
  })

  return sorted
}

export function getFileExtension(filename: string): string {
  return filename.split('.').pop()?.toLowerCase() || ''
}

export function sanitizeFileName(filename: string): string {
  return filename.replace(/[^a-zA-Z0-9._-]/g, '_')
}
