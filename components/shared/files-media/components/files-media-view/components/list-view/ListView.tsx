'use client'

import { getFileIcon } from '@/components/shared/files-media/lib/icon-helper'
import { FileItem } from '@/components/shared/files-media/lib/types'
import { formatDate, formatFileSize } from '@/components/shared/files-media/lib/utils'
import { Eye, Copy, Download, Trash2, Folder } from 'lucide-react'
import { useState } from 'react'

interface ListViewProps {
  files: FileItem[]
  selectedFileIds: Set<string>
  onToggleSelect: (fileId: string) => void
  onOpenPreview: (fileId: string) => void
  onSelectAll: () => void
  allSelected: boolean
}

const ListView = ({
  files,
  selectedFileIds,
  onToggleSelect,
  onOpenPreview,
  onSelectAll,
  allSelected
}: ListViewProps) => {
  const [hoveredId, setHoveredId] = useState<string | null>(null)

  return (
    <div className='overflow-hidden rounded-lg border border-border'>
      {/* Table Header */}
      <div className='sticky top-0 z-10 grid grid-cols-[40px_2fr_1fr_1fr_1fr_100px] gap-4 border-b border-border bg-card px-4 py-3 text-sm font-medium text-muted-foreground'>
        <div className='flex items-center'>
          <button
            onClick={onSelectAll}
            className='flex h-4 w-4 items-center justify-center rounded border border-border hover:bg-card/50'
          >
            {allSelected && (
              <svg className='h-3 w-3 text-accent' fill='currentColor' viewBox='0 0 20 20'>
                <path
                  fillRule='evenodd'
                  d='M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z'
                  clipRule='evenodd'
                />
              </svg>
            )}
          </button>
        </div>
        <div>Name</div>
        <div>Type</div>
        <div className='text-right'>Size</div>
        <div>Modified</div>
        <div className='text-center'>Actions</div>
      </div>

      {/* Table Rows */}
      <div className='divide-y divide-border'>
        {files.map((file) => {
          const isSelected = selectedFileIds.has(file.id)
          const isHovering = hoveredId === file.id

          return (
            <div
              key={file.id}
              onMouseEnter={() => setHoveredId(file.id)}
              onMouseLeave={() => setHoveredId(null)}
              className={`grid grid-cols-[40px_2fr_1fr_1fr_1fr_100px] items-center gap-4 px-4 py-3 text-sm transition-colors ${
                isSelected ? 'border-l-2 border-accent bg-accent/5' : isHovering ? 'bg-card/50' : ''
              }`}
            >
              {/* Checkbox */}
              <button
                onClick={() => onToggleSelect(file.id)}
                className={`rounded border transition-all ${
                  isSelected ? 'border-accent bg-accent' : 'border-border hover:bg-card'
                }`}
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
              </button>

              {/* Name */}
              <div className='flex min-w-0 items-center gap-3'>
                <div className='flex-shrink-0 text-muted-foreground'>{getFileIcon(file.type, file.isFolder, 'sm')}</div>
                <span className='truncate font-medium text-foreground'>{file.name}</span>
              </div>

              {/* Type */}
              <div className='truncate capitalize text-muted-foreground'>{file.type}</div>

              {/* Size */}
              <div className='text-right text-muted-foreground'>{file.size ? formatFileSize(file.size) : '—'}</div>

              {/* Modified */}
              <div className='text-muted-foreground'>{formatDate(file.updatedAt)}</div>

              {/* Actions */}
              <div className='flex items-center justify-center gap-1'>
                {isHovering && (
                  <div className='flex items-center gap-1'>
                    {!file.isFolder && (
                      <>
                        <button
                          onClick={() => onOpenPreview(file.id)}
                          className='rounded p-1.5 text-muted-foreground transition-colors hover:bg-card/50 hover:text-foreground'
                          title='Preview'
                        >
                          <Eye className='h-4 w-4' />
                        </button>
                        <button
                          onClick={() => {}}
                          className='rounded p-1.5 text-muted-foreground transition-colors hover:bg-card/50 hover:text-foreground'
                          title='Copy URL'
                        >
                          <Copy className='h-4 w-4' />
                        </button>
                        <button
                          onClick={() => {}}
                          className='rounded p-1.5 text-muted-foreground transition-colors hover:bg-card/50 hover:text-foreground'
                          title='Download'
                        >
                          <Download className='h-4 w-4' />
                        </button>
                      </>
                    )}
                    <button
                      onClick={() => {}}
                      className='rounded p-1.5 text-muted-foreground transition-colors hover:bg-red-500/10 hover:text-red-400'
                      title='Delete'
                    >
                      <Trash2 className='h-4 w-4' />
                    </button>
                  </div>
                )}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default ListView
