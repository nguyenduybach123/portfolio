import { useMemo } from 'react'
import { ColumnDef } from '@tanstack/react-table'

import { Badge } from '@/components/ui/badge'
import { DataTableActionCell } from '@/components/shared/data-table/shared'

import { EyeIcon, TrashIcon, MonitorIcon, ShieldOffIcon } from 'lucide-react'
import { UserSessionRow } from './types'

type UseUserSessionColumnsDefsProps = {
  onRevoke?: (session: UserSessionRow) => void
  onDelete?: (session: UserSessionRow) => void
  onViewDetails?: (session: UserSessionRow) => void
}

const formatDateTime = (value?: string) => {
  if (!value) return '-'

  return new Date(value).toLocaleString('vi-VN')
}

export const useUserSessionColumnsDefs = ({ onRevoke, onDelete, onViewDetails }: UseUserSessionColumnsDefsProps) => {
  return useMemo<ColumnDef<UserSessionRow>[]>(
    () => [
      // DEVICE & BROWSER INFO
      {
        accessorKey: 'deviceName',
        header: 'Device & Browser',
        cell: ({ row }) => {
          const session = row.original

          return (
            <div className='flex max-w-lg items-start gap-3'>
              <div className='flex size-12 shrink-0 items-center justify-center rounded-md bg-secondary text-secondary-foreground'>
                <MonitorIcon className='size-6' />
              </div>

              <div className='space-y-1'>
                <div className='font-medium'>{session.deviceName || 'Unknown Device'}</div>

                <div className='line-clamp-2 text-sm text-muted-foreground' title={session.userAgent}>
                  {session.userAgent || 'Unknown Browser'}
                </div>
              </div>
            </div>
          )
        }
      },

      // IP ADDRESS
      {
        accessorKey: 'ipAddress',
        header: 'IP Address',
        cell: ({ row }) => <span className='text-sm font-medium'>{row.original.ipAddress || '-'}</span>
      },

      // STATUS
      {
        id: 'status',
        header: 'Status',
        cell: ({ row }) => {
          const { revoked, expiresAt } = row.original
          const isExpired = new Date(expiresAt).getTime() < Date.now()

          if (revoked) {
            return <Badge variant='destructive'>Revoked</Badge>
          }

          if (isExpired) {
            return <Badge variant='secondary'>Expired</Badge>
          }

          return <Badge variant='default'>Active</Badge>
        }
      },

      // LAST ACTIVE
      {
        accessorKey: 'lastActiveAt',
        header: 'Last Active',
        cell: ({ row }) => (
          <div className='text-sm text-muted-foreground'>{formatDateTime(row.original.lastActiveAt)}</div>
        )
      },

      // EXPIRES AT
      {
        accessorKey: 'expiresAt',
        header: 'Expires At',
        cell: ({ row }) => <div className='text-sm text-muted-foreground'>{formatDateTime(row.original.expiresAt)}</div>
      },

      // CREATED
      {
        accessorKey: 'createdAt',
        header: 'Created',
        cell: ({ row }) => <div className='text-sm text-muted-foreground'>{formatDateTime(row.original.createdAt)}</div>
      },

      // ACTIONS
      {
        id: 'actions',
        header: 'Actions',
        cell: ({ row }) => {
          const session = row.original

          return (
            <DataTableActionCell
              rowName={session.deviceName || 'this session'}
              onDelete={() => onDelete?.(session)}
              actions={[
                {
                  label: 'View Details',
                  icon: EyeIcon,
                  onAction: () => onViewDetails?.(session)
                },
                {
                  label: 'Revoke Session',
                  icon: ShieldOffIcon,
                  onAction: () => onRevoke?.(session)
                }
              ]}
            />
          )
        }
      }
    ],
    [onRevoke, onDelete, onViewDetails]
  )
}

export const useUserSessionBulkActions = ({
  onDeleteSelected,
  onRevokeSelected
}: {
  onDeleteSelected?: () => void
  onRevokeSelected?: () => void
}) => {
  return useMemo(
    () => [
      {
        label: 'Thu hồi phiên đã chọn',
        icon: ShieldOffIcon,
        tooltip: 'Thu hồi tất cả các phiên hoạt động đã chọn',
        variant: 'secondary' as const,
        onAction: () => {
          onRevokeSelected?.()
        }
      },
      {
        label: 'Xóa phiên đã chọn',
        icon: TrashIcon,
        tooltip: 'Xóa tất cả các phiên đăng nhập đã chọn khỏi cơ sở dữ liệu',
        variant: 'destructive' as const,
        onAction: () => {
          onDeleteSelected?.()
        }
      }
    ],
    [onDeleteSelected, onRevokeSelected]
  )
}
