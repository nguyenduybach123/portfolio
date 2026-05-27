import { FieldConfig } from '@/components/shared/dynamic-filter'
import { PostStatus } from '@/types/posts'
import { z } from 'zod'

export const POST_FILTER_SCHEMA = z.object({
  title: z.string().trim().min(1).optional(),

  summary: z.string().trim().optional(),

  content: z.string().trim().optional(),

  thumbnail: z.string().url().optional(),

  status: z.nativeEnum(PostStatus).optional(),

  featured: z.boolean().optional(),

  tags: z.array(z.string().min(1)).optional()
})

export const POST_FILTER_FIELD_CONFIG: Record<string, FieldConfig> = {
  q: {
    label: 'Tìm kiếm',
    type: 'text',
    placeholder: 'Nhập tiêu đề, nội dung...',
    description: 'Tìm kiếm theo tiêu đề hoặc nội dung'
  },

  title: {
    label: 'Tiêu đề',
    type: 'text',
    placeholder: 'Nhập tiêu đề bài viết...'
  },

  status: {
    label: 'Trạng thái',
    type: 'select',
    placeholder: 'Chọn trạng thái',
    description: 'Lọc theo trạng thái bài viết'
    // options sẽ handle ở component select
  },

  featured: {
    label: 'Nổi bật',
    type: 'checkbox',
    description: 'Chỉ hiển thị bài viết nổi bật'
  },

  tags: {
    label: 'Tags',
    type: 'auto-complete',
    placeholder: 'Nhập tag...',
    description: 'Có thể chọn nhiều tag'
  },

  createdAt: {
    label: 'Ngày tạo',
    type: 'date-range',
    description: 'Lọc theo khoảng thời gian'
  },

  views: {
    label: 'Lượt xem',
    type: 'number-range',
    placeholder: 'VD: 100 - 1000'
  },

  sortBy: {
    label: 'Sắp xếp theo',
    type: 'select',
    placeholder: 'Chọn field'
  },

  order: {
    label: 'Thứ tự',
    type: 'select',
    placeholder: 'Asc / Desc'
  }
}
