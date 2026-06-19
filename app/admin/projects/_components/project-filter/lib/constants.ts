import { FieldConfig, SelectFieldConfig } from '@/components/shared/dynamic-filter'
import { z } from 'zod'

// Định nghĩa các enum/union types dựa trên interface Project
export const ProjectType = {
  PERSONAL: 'personal',
  PROFESSIONAL: 'professional'
} as const

export const ProjectCategory = {
  FRONTEND: 'frontend',
  BACKEND: 'backend',
  FULLSTACK: 'fullstack'
} as const

// ==========================================
// PROJECT FILTER SCHEMA
// ==========================================
export const PROJECT_FILTER_SCHEMA = z.object({
  title: z.string().trim().min(1).optional(),

  type: z.nativeEnum(ProjectType).optional(),

  category: z.nativeEnum(ProjectCategory).optional(),

  featured: z.boolean().optional(),

  // Hỗ trợ lọc theo cả mảng 'technologies' hoặc 'tech' tùy thuộc vào API thực tế của bạn
  tech: z.array(z.string().min(1)).optional(),

  technologies: z.array(z.string().min(1)).optional()
})

// ==========================================
// PROJECT FILTER FIELD CONFIG
// ==========================================
export const PROJECT_FILTER_FIELD_CONFIG: Record<string, FieldConfig> = {
  q: {
    label: 'Search',
    type: 'text',
    placeholder: 'Enter title, description...',
    description: 'Search by project title or description'
  },

  title: {
    label: 'Title',
    type: 'text',
    placeholder: 'Enter project title...'
  },

  type: {
    label: 'Project Type',
    type: 'select',
    placeholder: 'Select project type',
    description: 'Personal or professional project',
    options: [
      { label: 'Personal', value: 'personal' },
      { label: 'Professional', value: 'professional' }
    ]
  } as SelectFieldConfig,

  category: {
    label: 'Category',
    type: 'select',
    placeholder: 'Select category',
    description: 'Frontend, Backend, or Fullstack',
    options: [
      { label: 'Frontend', value: 'frontend' },
      { label: 'Backend', value: 'backend' },
      { label: 'Fullstack', value: 'fullstack' }
    ]
  } as SelectFieldConfig,

  tech: {
    label: 'Technology (Tech)',
    type: 'auto-complete',
    placeholder: 'Select or enter technology...',
    description: 'Filter by list of technologies used (React, NestJS...)'
  },

  sortBy: {
    label: 'Sort By',
    type: 'select',
    placeholder: 'Select field to sort by',
    options: [
      { label: 'Created At (Newest)', value: 'createdAt_desc' },
      { label: 'Created At (Oldest)', value: 'createdAt_asc' },
      { label: 'Title (A-Z)', value: 'title_asc' },
      { label: 'Title (Z-A)', value: 'title_desc' }
    ]
  } as SelectFieldConfig
}
