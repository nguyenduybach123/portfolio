import { useMemo } from 'react'
import { ColumnDef } from '@tanstack/react-table'
import { Badge } from '@/components/ui/badge'
import { DataTableActionCell } from '@/components/shared/data-table/shared'
import { EyeIcon } from 'lucide-react'

import { UserTableRow } from './types'
import { TrashIcon } from 'lucide-react'

type UseUserColumnsDefsProps = {
  onEdit?: (row: UserTableRow) => void
  onDelete?: (row: UserTableRow) => void
  onViewDetails?: (row: UserTableRow) => void
}

const formatDateTime = (value?: string | null) => {
  if (!value) return 'N/A'

  return new Date(value).toLocaleString('vi-VN', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit'
  })
}

export const useUserColumnsDefs = ({ onEdit, onDelete, onViewDetails }: UseUserColumnsDefsProps) => {
  return useMemo<ColumnDef<UserTableRow>[]>(
    () => [
      // USER INFO
      {
        accessorKey: 'fullName',
        header: 'Full Name',
        cell: ({ row }) => {
          const user = row.original

          return (
            <div className='flex items-center gap-3'>
              <img
                src={user.avatarUrl || '/images/avatar-placeholder.png'}
                alt={user.fullName || user.email}
                className='h-10 w-10 rounded-full object-cover'
              />

              <div className='flex flex-col'>
                <span className='font-medium'>{user.fullName || 'N/A'}</span>

                <span className='text-xs text-muted-foreground'>{user.email}</span>
              </div>
            </div>
          )
        }
      },

      // USERNAME
      {
        accessorKey: 'username',
        header: 'Username',
        cell: ({ row }) =>
          row.original.username ? (
            <span>@{row.original.username}</span>
          ) : (
            <span className='text-muted-foreground'>-</span>
          )
      },

      // PROVIDER
      {
        accessorKey: 'provider',
        header: 'Provider',
        cell: ({ row }) => {
          const provider = row.original.provider

          if (!provider) {
            return <span className='text-muted-foreground'>-</span>
          }

          return <Badge variant='outline'>{provider}</Badge>
        }
      },

      // ROLE
      {
        accessorKey: 'role',
        header: 'Role',
        cell: ({ row }) => {
          const role = row.original.role

          const roleMap = {
            ADMIN: {
              label: 'Admin',
              variant: 'destructive'
            },
            USER: {
              label: 'User',
              variant: 'default'
            }
          } as const

          const config = roleMap[role as keyof typeof roleMap] ?? {
            label: role || 'Unknown',
            variant: 'outline'
          }

          return <Badge variant={config.variant as any}>{config.label}</Badge>
        }
      },

      // CREATED
      {
        accessorKey: 'createdAt',
        header: 'Created At',
        cell: ({ row }) => <div className='text-sm text-muted-foreground'>{formatDateTime(row.original.createdAt)}</div>
      },

      // UPDATED
      {
        accessorKey: 'updatedAt',
        header: 'Updated At',
        cell: ({ row }) => {
          const { createdAt, updatedAt } = row.original

          const isUpdated = updatedAt && createdAt && new Date(updatedAt) > new Date(createdAt)

          return (
            <div className='flex items-center gap-2'>
              <span className='text-sm text-muted-foreground'>{formatDateTime(updatedAt)}</span>
            </div>
          )
        }
      },

      // ACTIONS
      {
        id: 'actions',
        header: 'Actions',
        cell: ({ row }) => {
          const user = row.original

          return (
            <DataTableActionCell
              rowName={user.fullName || user.email}
              onDelete={() => onDelete?.(user)}
              actions={[
                {
                  label: 'View Details',
                  icon: EyeIcon,
                  onAction: () => onViewDetails?.(user)
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
        label: 'Delete Selected Users',
        icon: TrashIcon,
        tooltip: 'Delete all selected users',
        variant: 'destructive' as const,
        onAction: () => {
          onDeleteSelected?.()
        }
      }
    ],
    [onDeleteSelected]
  )
}
