'use client'

import { useState } from 'react'
import { Eye, Copy, Download, Folder } from 'lucide-react'
import { FileItem } from '@/components/shared/files-media/lib/types'
import { getFileIcon } from '@/components/shared/files-media/lib/icon-helper'
import { formatDate, formatFileSize } from '@/components/shared/files-media/lib/utils'

interface FileCardProps {
  file: FileItem
  isSelected: boolean
  onToggleSelect: (fileId: string) => void
  onOpenPreview: (fileId: string) => void
  onNavigateFolder: (folderId: string, folderName: string) => void
}

const FileCard = ({ file, isSelected, onToggleSelect, onOpenPreview, onNavigateFolder }: FileCardProps) => {
  const [isHovering, setIsHovering] = useState(false)

  const handleFolderClick = () => {
    if (file.isFolder) {
      onNavigateFolder(file.id, file.name)
    }
  }

  return (
    <div
      className={`group relative cursor-pointer overflow-hidden rounded-lg border transition-all ${
        isSelected ? 'border-accent bg-accent/5 ring-2 ring-accent/30' : 'border-border bg-card hover:border-accent/50'
      }`}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {/* Checkbox */}
      <div
        className={`absolute left-2 top-2 z-10 rounded-md border transition-all ${
          isSelected ? 'border-accent bg-accent' : 'border-border bg-card group-hover:bg-card/50'
        }`}
        onClick={() => onToggleSelect(file.id)}
      >
        {isSelected && (
          <svg className='h-4 w-4 text-white' fill='currentColor' viewBox='0 0 20 20'>
            <path
              fillRule='evenodd'
              d='M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z'
              clipRule='evenodd'
            />
          </svg>
        )}
        {!isSelected && <div className='h-4 w-4' />}
      </div>

      {/* Preview Image */}
      <div
        className='relative aspect-square w-full overflow-hidden bg-gradient-to-br from-card to-card/50'
        onClick={handleFolderClick}
      >
        {file.isFolder ? (
          <div className='flex h-full items-center justify-center'>
            <Folder className='h-12 w-12 text-blue-400/30' />
          </div>
        ) : file.previewUrl ? (
          <img
            src={file.previewUrl}
            alt={file.name}
            className='h-full w-full object-cover transition-transform group-hover:scale-105'
          />
        ) : (
          <div className='flex h-full items-center justify-center'>{getFileIcon(file.type, false, 'md')}</div>
        )}

        {/* Quick Actions Overlay */}
        {isHovering && !file.isFolder && (
          <div className='absolute inset-0 flex items-center justify-center gap-2 bg-black/50 backdrop-blur-sm'>
            <button
              onClick={() => onOpenPreview(file.id)}
              className='rounded-lg bg-white/10 p-2 text-white backdrop-blur transition-colors hover:bg-white/20'
              title='Preview'
            >
              <Eye className='h-4 w-4' />
            </button>
            <button
              onClick={() => {}}
              className='rounded-lg bg-white/10 p-2 text-white backdrop-blur transition-colors hover:bg-white/20'
              title='Copy URL'
            >
              <Copy className='h-4 w-4' />
            </button>
            <button
              onClick={() => {}}
              className='rounded-lg bg-white/10 p-2 text-white backdrop-blur transition-colors hover:bg-white/20'
              title='Download'
            >
              <Download className='h-4 w-4' />
            </button>
          </div>
        )}
      </div>

      {/* File Info */}
      <div className='space-y-1 border-t border-border p-3'>
        <div className='flex items-start gap-2'>
          <div className='mt-0.5 flex-shrink-0 text-muted-foreground'>
            {getFileIcon(file.type, file.isFolder, 'sm')}
          </div>
          <p className='flex-1 truncate text-sm font-medium text-foreground'>{file.name}</p>
        </div>

        <div className='space-y-0.5 text-xs text-muted-foreground'>
          {file.size && <div>{formatFileSize(file.size)}</div>}
          {file.width && file.height && (
            <div>
              {file.width} × {file.height}
            </div>
          )}
          <div>{formatDate(file.updatedAt)}</div>
        </div>
      </div>
    </div>
  )
}

export default FileCard
