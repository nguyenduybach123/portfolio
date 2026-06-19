import { ColumnDef } from '@tanstack/react-table'
import { FileItem } from '@/components/shared/files-media/lib/types'
import { getFileIcon } from '@/components/shared/files-media/lib/icon-helper'
import { formatDate, formatFileSize } from '@/components/shared/files-media/lib/utils'
import { Eye, Copy, Download, Trash2, Folder } from 'lucide-react'
import React from 'react'

export type ListViewHandlers = {
  onOpenPreview: (id: string) => void
  onNavigateFolder: (id: string) => void
  onCopyUrl?: (id: string) => void
  onDownload?: (id: string) => void
  onDelete?: (id: string) => void
}

export function useListViewColumns(handlers: ListViewHandlers): ColumnDef<FileItem>[] {
  const { onOpenPreview, onNavigateFolder, onCopyUrl, onDownload, onDelete } = handlers

  const columns: ColumnDef<FileItem>[] = [
    {
      id: 'name',
      header: 'Name',
      accessorKey: 'name',
      cell: ({ row }) => {
        const file = row.original
        return (
          <div className='flex min-w-0 items-center gap-3'>
            <div className='flex-shrink-0 text-muted-foreground'>{getFileIcon(file.type, file.isFolder, 'sm')}</div>
            <button
              onClick={() => (file.isFolder ? onNavigateFolder(file.id) : onOpenPreview(file.id))}
              className='w-full truncate text-left font-medium text-foreground'
            >
              {file.name}
            </button>
          </div>
        )
      }
    },
    {
      id: 'type',
      header: 'Type',
      accessorFn: (row) => row.type,
      cell: ({ getValue }) => <div className='truncate capitalize text-muted-foreground'>{String(getValue())}</div>
    },
    {
      id: 'size',
      header: 'Size',
      accessorFn: (row) => row.size,
      cell: ({ getValue }) => (
        <div className='text-right text-muted-foreground'>
          {getValue() ? formatFileSize(getValue() as number) : '—'}
        </div>
      )
    },
    {
      id: 'modified',
      header: 'Modified',
      accessorFn: (row) => row.updatedAt,
      cell: ({ getValue }) => <div className='text-muted-foreground'>{formatDate(getValue() as Date)}</div>
    },
    {
      id: 'actions',
      header: 'Actions',
      cell: ({ row }) => {
        const file = row.original
        return (
          <div className='flex items-center justify-center gap-1'>
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
                  onClick={() => onCopyUrl?.(file.id)}
                  className='rounded p-1.5 text-muted-foreground transition-colors hover:bg-card/50 hover:text-foreground'
                  title='Copy URL'
                >
                  <Copy className='h-4 w-4' />
                </button>
                <button
                  onClick={() => onDownload?.(file.id)}
                  className='rounded p-1.5 text-muted-foreground transition-colors hover:bg-card/50 hover:text-foreground'
                  title='Download'
                >
                  <Download className='h-4 w-4' />
                </button>
              </>
            )}

            <button
              onClick={() => onDelete?.(file.id)}
              className='rounded p-1.5 text-muted-foreground transition-colors hover:bg-red-500/10 hover:text-red-400'
              title='Delete'
            >
              <Trash2 className='h-4 w-4' />
            </button>
          </div>
        )
      }
    }
  ]

  return columns
}

export default useListViewColumns
