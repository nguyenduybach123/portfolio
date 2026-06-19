import { FieldConfig, SelectFieldConfig } from '@/components/shared/dynamic-filter'
import { PostStatus } from '@/types/posts'
import { z } from 'zod'

export const POST_FILTER_SCHEMA = z.object({
  title: z.string().trim().min(1).optional(),

  summary: z.string().trim().optional(),

  content: z.string().trim().optional(),

  thumbnail: z.string().url().optional(),

  status: z.nativeEnum(PostStatus).optional(),

  featured: z.number().optional()
})

export const POST_FILTER_FIELD_CONFIG: Record<string, FieldConfig> = {
  q: {
    label: 'Search',
    type: 'text',
    placeholder: 'Enter title, content...',
    description: 'Search by title or content'
  },

  title: {
    label: 'Title',
    type: 'text',
    placeholder: 'Enter post title...'
  },

  status: {
    label: 'Status',
    type: 'select',
    placeholder: 'Select status',
    description: 'Filter by post status',
    options: [
      { label: 'Draft', value: PostStatus.DRAFT },
      { label: 'Published', value: PostStatus.PUBLISHED },
      { label: 'Archived', value: PostStatus.ARCHIVED }
    ]
  } as SelectFieldConfig,

  featured: {
    label: 'Featured',
    type: 'select',
    description: 'Only show featured posts',
    options: [
      { label: 'Yes', value: 1 },
      { label: 'No', value: 0 }
    ]
  } as SelectFieldConfig
}
