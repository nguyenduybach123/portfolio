import { useMemo } from 'react'
import { ColumnDef } from '@tanstack/react-table'

import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { DropdownMenuItem } from '@/components/ui/dropdown-menu'

import { DataTableActionCell } from '@/components/shared/data-table/shared'

import { TrashIcon } from 'lucide-react'
import { Page } from '@/types/pages'

type UsePageColumnsDefsProps = {
  onEdit?: (page: Page) => void
  onDelete?: (page: Page) => void
  onViewDetails?: (page: Page) => void
}

const formatDateTime = (value?: string) => {
  if (!value) return '-'

  return new Date(value).toLocaleDateString('vi-VN', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit'
  })
}

export const usePageColumnsDefs = ({ onEdit, onDelete, onViewDetails }: UsePageColumnsDefsProps) => {
  return useMemo<ColumnDef<Page>[]>(
    () => [
      // TITLE
      {
        id: 'title',
        accessorKey: 'title',
        header: 'Page',
        cell: ({ row }) => {
          const page = row.original

          return (
            <div className='flex flex-col gap-1'>
              <div className='font-medium'>{page.title}</div>

              <div className='text-xs text-muted-foreground'>Last updated {formatDateTime(page.updatedAt)}</div>
            </div>
          )
        }
      },

      // STATUS
      {
        id: 'status',
        accessorKey: 'status',
        header: 'Status',
        cell: ({ row }) => {
          const status = row.original.status

          const statusMap = {
            published: {
              label: 'Published',
              variant: 'default'
            },

            draft: {
              label: 'Draft',
              variant: 'secondary'
            },

            archived: {
              label: 'Archived',
              variant: 'outline'
            }
          } as const

          const current = statusMap[status]

          return <Badge variant={current.variant}>{current.label}</Badge>
        }
      },

      // AUTHOR
      {
        id: 'author',
        accessorKey: 'author',
        header: 'Author',
        cell: ({ row }) => {
          const author = row.original.author

          return (
            <div className='flex items-center gap-3'>
              <Avatar className='size-9'>
                <AvatarImage src={author.avatarUrl} />

                <AvatarFallback>{author.name.slice(0, 2).toUpperCase()}</AvatarFallback>
              </Avatar>

              <div className='flex flex-col'>
                <span className='text-sm font-medium'>{author.name}</span>

                <span className='text-xs text-muted-foreground'>{author.email}</span>
              </div>
            </div>
          )
        }
      },

      // CREATED AT
      {
        id: 'createdAt',
        accessorKey: 'createdAt',
        header: 'Created',
        cell: ({ row }) => <div className='text-sm text-muted-foreground'>{formatDateTime(row.original.createdAt)}</div>
      },

      // UPDATED AT
      {
        id: 'updatedAt',
        accessorKey: 'updatedAt',
        header: 'Updated',
        cell: ({ row }) => {
          const { createdAt, updatedAt } = row.original

          const isUpdated = new Date(updatedAt) > new Date(createdAt)

          return (
            <div className='flex items-center gap-2'>
              <div className='text-sm text-muted-foreground'>{formatDateTime(updatedAt)}</div>

              {isUpdated && <Badge variant='outline'>Updated</Badge>}
            </div>
          )
        }
      },

      // ACTIONS
      {
        id: 'actions',
        header: 'Actions',
        width: 50,
        cell: ({ row }) => {
          const page = row.original

          return (
            <DataTableActionCell
              rowName={page.title}
              onDelete={() => onDelete?.(page)}
              extraActions={<DropdownMenuItem onSelect={() => onEdit?.(page)}>Edit</DropdownMenuItem>}
              actions={[
                {
                  label: 'View Details',

                  onAction: () => onViewDetails?.(page)
                }
              ]}
            />
          )
        }
      }
    ],
    [onDelete, onEdit, onViewDetails]
  )
}

export const usePageBulkActions = ({ onDeleteSelected }: { onDeleteSelected?: () => void }) => {
  return useMemo(
    () => [
      {
        label: 'Delete Selected Pages',

        icon: TrashIcon,

        tooltip: 'Delete all selected pages',

        variant: 'destructive' as const,

        onAction: () => {
          onDeleteSelected?.()
        }
      }
    ],
    [onDeleteSelected]
  )
}
