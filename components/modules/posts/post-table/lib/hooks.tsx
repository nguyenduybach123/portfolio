import { useMemo } from 'react'
import { ColumnDef } from '@tanstack/react-table'
import { PostTableRow } from './types'
import { Badge } from '@/components/ui/badge'
import { DataTableActionCell } from '@/components/shared/data-table/shared'
import { DropdownMenuItem } from '@/components/ui/dropdown-menu'
import { TrashIcon } from 'lucide-react'

type UsePostColumnsDefsProps = {
  onEdit?: (row: PostTableRow) => void
  onDelete?: (row: PostTableRow) => void
  onViewDetails?: (row: PostTableRow) => void
}

const formatDateTime = (value?: string) => {
  if (!value) return 'N/A'

  return new Date(value).toLocaleDateString('vi-VN', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit'
  })
}

export const usePostColumnsDefs = (props: UsePostColumnsDefsProps) => {
  const { onEdit, onDelete, onViewDetails } = props

  return useMemo<ColumnDef<PostTableRow>[]>(
    () => [
      // 📌 TITLE
      {
        accessorKey: 'title',
        header: 'Bài viết',
        cell: ({ row }) => {
          const post = row.original

          return (
            <div className='flex max-w-md items-start gap-3'>
              <img
                src={post.thumbnail || '/images/placeholder.png'}
                className='size-14 flex-shrink-0 rounded object-cover'
              />

              <div className='flex flex-col'>
                <div className='line-clamp-1 font-semibold text-gray-900'>{post.title}</div>

                <div className='text-xs text-gray-500'>/{post.slug}</div>

                {post.summary && <div className='line-clamp-2 text-xs text-gray-600'>{post.summary}</div>}
              </div>
            </div>
          )
        }
      },

      // 📌 STATUS
      {
        accessorKey: 'status',
        header: 'Trạng thái',
        cell: ({ row }) => {
          const status = row.original.status

          const map = {
            DRAFT: { label: 'Nháp', variant: 'outline' },
            PUBLISHED: { label: 'Đã đăng', variant: 'default' },
            ARCHIVED: { label: 'Lưu trữ', variant: 'secondary' }
          } as const

          const s = map[status] ?? { label: status, variant: 'outline' }

          return <Badge variant={s.variant}>{s.label}</Badge>
        }
      },

      // 📌 FEATURED
      {
        accessorKey: 'featured',
        header: 'Nổi bật',
        cell: ({ row }) => (row.original.featured ? <Badge>Featured</Badge> : <span className='text-gray-400'>-</span>)
      },

      // 📌 TAGS
      {
        accessorKey: 'tags',
        header: 'Tags',
        cell: ({ row }) => {
          const tags = row.original.tags

          if (!tags?.length) {
            return <span className='text-gray-400'>-</span>
          }

          return (
            <div className='flex max-w-xs flex-wrap gap-1'>
              {tags.slice(0, 3).map((tag) => (
                <Badge key={tag} variant='outline'>
                  {tag}
                </Badge>
              ))}
              {tags.length > 3 && <span className='text-xs text-gray-500'>+{tags.length - 3}</span>}
            </div>
          )
        }
      },

      // 📌 METRICS
      {
        accessorKey: 'viewCount',
        header: 'Lượt xem',
        cell: ({ row }) => <span className='text-sm'>{row.original.viewCount.toLocaleString()}</span>
      },
      {
        accessorKey: 'commentCount',
        header: 'Bình luận',
        cell: ({ row }) => <span className='text-sm'>{row.original.commentCount}</span>
      },

      // 📌 PUBLISHED
      {
        accessorKey: 'publishedAt',
        header: 'Xuất bản',
        cell: ({ row }) => <div className='text-sm text-gray-600'>{formatDateTime(row.original.publishedAt)}</div>
      },

      // 📌 CREATED
      {
        accessorKey: 'createdAt',
        header: 'Ngày tạo',
        cell: ({ row }) => <div className='text-sm text-gray-600'>{formatDateTime(row.original.createdAt)}</div>
      },

      // 📌 UPDATED
      {
        accessorKey: 'updatedAt',
        header: 'Cập nhật',
        cell: ({ row }) => {
          const { createdAt, updatedAt } = row.original

          const isUpdated = updatedAt && createdAt && new Date(updatedAt) > new Date(createdAt)

          return (
            <div className='flex items-center gap-2'>
              <div className='text-sm text-gray-600'>{formatDateTime(updatedAt)}</div>
              {isUpdated && <Badge>Đã sửa</Badge>}
            </div>
          )
        }
      },

      // 📌 ACTIONS
      {
        id: 'actions',
        header: 'Thao tác',
        cell: ({ row }) => {
          const post = row.original

          return (
            <DataTableActionCell
              rowName={post.title}
              extraActions={<DropdownMenuItem onSelect={() => onEdit?.(post)}>Chỉnh sửa</DropdownMenuItem>}
              onDelete={() => onDelete?.(post)}
              actions={[
                {
                  label: 'Xem chi tiết',
                  onAction: () => onViewDetails?.(post)
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
        label: 'Xóa danh mục đã chọn',
        icon: TrashIcon,
        tooltip: 'Xóa tất cả các danh mục đã chọn',
        variant: 'destructive' as const,
        onAction: () => {
          onDeleteSelected?.()
        }
      }
    ],
    [onDeleteSelected]
  )
}
