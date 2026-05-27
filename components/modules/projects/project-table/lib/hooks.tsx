import { useMemo } from 'react'
import { ColumnDef } from '@tanstack/react-table'

import { Badge } from '@/components/ui/badge'
import { DropdownMenuItem } from '@/components/ui/dropdown-menu'

import { DataTableActionCell } from '@/components/shared/data-table/shared'

import { Project } from '@/types'
import { TrashIcon } from 'lucide-react'

type UseProjectColumnsDefsProps = {
  onEdit?: (project: Project) => void
  onDelete?: (project: Project) => void
  onViewDetails?: (project: Project) => void
}

const formatDate = (value?: string) => {
  if (!value) return '-'

  return new Date(value).toLocaleDateString('vi-VN')
}

export const useProjectColumnsDefs = ({ onEdit, onDelete, onViewDetails }: UseProjectColumnsDefsProps) => {
  return useMemo<ColumnDef<Project>[]>(
    () => [
      // PROJECT INFO
      {
        accessorKey: 'title',
        header: 'Project',
        cell: ({ row }) => {
          const project = row.original

          return (
            <div className='flex max-w-lg items-start gap-3'>
              <img src={project.image} alt={project.title} className='size-16 rounded-md object-cover' />

              <div className='space-y-1'>
                <div className='font-medium'>{project.title}</div>

                <div className='line-clamp-2 text-sm text-muted-foreground'>{project.description}</div>
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
          const type = row.original.type

          return <Badge variant={type === 'professional' ? 'default' : 'secondary'}>{type}</Badge>
        }
      },

      // CATEGORY
      {
        accessorKey: 'category',
        header: 'Category',
        cell: ({ row }) => <Badge variant='outline'>{row.original.category}</Badge>
      },

      // FEATURED
      {
        accessorKey: 'featured',
        header: 'Featured',
        cell: ({ row }) =>
          row.original.featured ? <Badge>Featured</Badge> : <span className='text-muted-foreground'>-</span>
      },

      // TECH STACK
      {
        accessorKey: 'tech',
        header: 'Tech Stack',
        cell: ({ row }) => {
          const tech = row.original.tech

          if (!tech?.length) {
            return <span className='text-muted-foreground'>-</span>
          }

          return (
            <div className='flex max-w-xs flex-wrap gap-1'>
              {tech.slice(0, 4).map((item) => (
                <Badge key={item} variant='outline'>
                  {item}
                </Badge>
              ))}

              {tech.length > 4 && <span className='text-xs text-muted-foreground'>+{tech.length - 4}</span>}
            </div>
          )
        }
      },

      // DURATION
      {
        id: 'duration',
        header: 'Duration',
        cell: ({ row }) => {
          const { startDate, endDate } = row.original

          return (
            <div className='text-sm text-muted-foreground'>
              {formatDate(startDate)}
              {' → '}
              {formatDate(endDate)}
            </div>
          )
        }
      },

      // CREATED
      {
        accessorKey: 'createdAt',
        header: 'Created',
        cell: ({ row }) => <div className='text-sm text-muted-foreground'>{formatDate(row.original.createdAt)}</div>
      },

      // ACTIONS
      {
        id: 'actions',
        header: 'Actions',
        cell: ({ row }) => {
          const project = row.original

          return (
            <DataTableActionCell
              rowName={project.title}
              extraActions={<DropdownMenuItem onSelect={() => onEdit?.(project)}>Edit</DropdownMenuItem>}
              onDelete={() => onDelete?.(project)}
              actions={[
                {
                  label: 'View Details',
                  onAction: () => onViewDetails?.(project)
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
