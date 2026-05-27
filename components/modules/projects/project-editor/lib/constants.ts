import { z } from 'zod'

export const PROJECT_FORM_SCHEMA = z.object({
  title: z.string().min(3, 'Title must be at least 3 characters'),

  description: z.string().min(10, 'Description must be at least 10 characters'),

  technologies: z.string(),

  responsibilities: z.string(),

  type: z.enum(['personal', 'professional']),

  category: z.enum(['frontend', 'backend', 'fullstack']),

  featured: z.boolean(),

  startDate: z.string().optional(),

  endDate: z.string().optional(),

  githubUrl: z.string().url('Invalid Github URL').optional().or(z.literal('')),

  demoUrl: z.string().url('Invalid Demo URL').optional().or(z.literal('')),

  imageUrl: z.string().url('Invalid Image URL').optional().or(z.literal(''))
})

export const DEFAULT_PROJECT_FORM_VALUES: ProjectFormValues = {
  title: '',
  description: '',
  technologies: '',
  responsibilities: '',
  type: 'personal',
  category: 'frontend',
  featured: false,
  startDate: '',
  endDate: '',
  githubUrl: '',
  demoUrl: '',
  imageUrl: ''
}

export type ProjectFormValues = z.infer<typeof PROJECT_FORM_SCHEMA>
