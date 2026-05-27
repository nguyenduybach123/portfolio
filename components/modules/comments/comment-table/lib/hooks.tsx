import { useMemo } from 'react'
import { ColumnDef } from '@tanstack/react-table'
import { CommentTableRow } from './types'
import { DataTableActionCell } from '@/components/shared/data-table/shared'
import { EyeIcon, TrashIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'

export const useCommentColumnsDefs = ({
  onViewDetails,
  onDelete
}: {
  onViewDetails?: (row: CommentTableRow) => void
  onDelete?: (row: CommentTableRow) => void
}) => {
  return useMemo<ColumnDef<CommentTableRow>[]>(
    () => [
      {
        accessorKey: 'content',
        header: 'Content',
        cell: ({ row }) => {
          const comment = row.original
          return (
            <div className='max-w-xs truncate' title={comment.content}>
              {comment.content || 'N/A'}
            </div>
          )
        }
      },
      {
        accessorKey: 'userName',
        header: 'User',
        cell: ({ row }) => {
          const comment = row.original
          return (
            <div className='flex items-center gap-2'>
              <img
                src={comment.userAvatar || '/images/avatar-placeholder.png'}
                alt={comment.userName}
                className='h-8 w-8 rounded-full object-cover'
              />
              <span>{comment.userName || 'N/A'}</span>
            </div>
          )
        }
      },
      {
        accessorKey: 'createdAt',
        header: 'Created At',
        cell: ({ row }) => {
          const comment = row.original
          return <span>{comment.createdAt ? new Date(comment.createdAt).toLocaleString('vi-VN') : 'N/A'}</span>
        }
      },
      {
        id: 'actions',
        header: 'Actions',
        cell: ({ row }) => (
          <div className='flex items-center gap-2'>
            <Button variant='destructive' size='icon' onClick={() => onDelete?.(row.original)}>
              <TrashIcon className='size-2' />
            </Button>
          </div>
        )
      }
    ],
    [onViewDetails, onDelete]
  )
}
