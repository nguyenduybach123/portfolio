import { useMemo } from 'react'
import { ColumnDef } from '@tanstack/react-table'

import { Badge } from '@/components/ui/badge'
import { DropdownMenuItem } from '@/components/ui/dropdown-menu'

import { DataTableActionCell } from '@/components/shared/data-table/shared'

import { EditIcon, EyeIcon, TrashIcon } from 'lucide-react'
import { PostTableRow } from './types'

type UseProjectColumnsDefsProps = {
  onEdit?: (project: PostTableRow) => void
  onDelete?: (project: PostTableRow) => void
  onViewDetails?: (project: PostTableRow) => void
}

const formatDate = (value?: string) => {
  if (!value) return '-'

  return new Date(value).toLocaleDateString('vi-VN')
}

export const useProjectColumnsDefs = ({ onEdit, onDelete, onViewDetails }: UseProjectColumnsDefsProps) => {
  return useMemo<ColumnDef<PostTableRow>[]>(
    () => [
      // PROJECT INFO
      {
        accessorKey: 'title',
        header: 'Project',
        cell: ({ row }) => {
          const project = row.original

          return (
            <div className='flex max-w-lg items-start gap-3'>
              <img src={project.thumbnail} alt={project.title} className='size-16 rounded-md object-cover' />

              <div className='space-y-1'>
                <div className='font-medium'>{project.title}</div>

                <div className='line-clamp-2 text-sm text-muted-foreground'>{project.summary}</div>
              </div>
            </div>
          )
        }
      },

      // TYPE
      {
        accessorKey: 'type',
        header: 'Type',
        cell: ({ row }) => {
          const type = 'professional'

          return <Badge variant={type === 'professional' ? 'default' : 'secondary'}>{type}</Badge>
        }
      },

      // CATEGORY
      {
        accessorKey: 'category',
        header: 'Category',
        cell: ({ row }) => <Badge variant='outline'>{row.original.viewCount}</Badge>
      },

      // FEATURED
      {
        accessorKey: 'featured',
        header: 'Featured',
        cell: ({ row }) =>
          (row.original?.viewCount ?? 0) > 10 ? (
            <Badge>Featured</Badge>
          ) : (
            <span className='text-muted-foreground'>-</span>
          )
      },

      // TECH STACK
      // {
      //   accessorKey: 'tech',
      //   header: 'Tech Stack',
      //   cell: ({ row }) => {
      //     const tech = row.original.tech

      //     if (!tech?.length) {
      //       return <span className='text-muted-foreground'>-</span>
      //     }

      //     return (
      //       <div className='flex max-w-xs flex-wrap gap-1'>
      //         {tech.slice(0, 4).map((item) => (
      //           <Badge key={item} variant='outline'>
      //             {item}
      //           </Badge>
      //         ))}

      //         {tech.length > 4 && <span className='text-xs text-muted-foreground'>+{tech.length - 4}</span>}
      //       </div>
      //     )
      //   }
      // },

      // DURATION
      // {
      //   id: 'duration',
      //   header: 'Duration',
      //   cell: ({ row }) => {
      //     const { startDate, endDate } = row.original

      //     return (
      //       <div className='text-sm text-muted-foreground'>
      //         {formatDate(startDate)}
      //         {' → '}
      //         {formatDate(endDate)}
      //       </div>
      //     )
      //   }
      // },

      // CREATED
      // {
      //   accessorKey: 'createdAt',
      //   header: 'Created',
      //   cell: ({ row }) => <div className='text-sm text-muted-foreground'>{formatDate(row.original.createdAt)}</div>
      // },

      // ACTIONS
      {
        id: 'actions',
        header: 'Actions',
        cell: ({ row }) => {
          const project = row.original

          return (
            <DataTableActionCell
              rowName={project.title}
              onDelete={() => onDelete?.(project)}
              actions={[
                {
                  label: 'View Details',
                  icon: EyeIcon,
                  onAction: () => onViewDetails?.(project)
                },
                {
                  label: 'Edit Project',
                  icon: EditIcon,
                  onAction: () => onEdit?.(project)
                }
              ]}
            />
          )
        }
      }
    ],
    [onEdit, onDelete, onViewDetails]
  )
}

export const useBulkActions = ({ onDeleteSelected }: { onDeleteSelected?: () => void }) => {
  return useMemo(
    () => [
      {
        label: 'Xóa dự án đã chọn',
        icon: TrashIcon,
        tooltip: 'Xóa tất cả các dự án đã chọn',
        variant: 'destructive' as const,
        onAction: () => {
          onDeleteSelected?.()
        }
      }
    ],
    [onDeleteSelected]
  )
}
