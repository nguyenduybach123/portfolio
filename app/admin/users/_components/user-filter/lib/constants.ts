import { FieldConfig, SelectFieldConfig } from '@/components/shared/dynamic-filter'
import { z } from 'zod'

export const USER_FILTER_SCHEMA = z.object({
  q: z.string().trim().optional(),

  fullName: z.string().trim().optional(),

  provider: z.enum(['Local', 'Google', 'GitHub']).optional()
})

export type UserFilterValues = z.infer<typeof USER_FILTER_SCHEMA>

export const USER_FILTER_FIELD_CONFIG: Record<string, FieldConfig> = {
  q: {
    label: 'Search',
    type: 'text',
    placeholder: 'Name, email, or username...'
  },

  fullName: {
    label: 'Full Name',
    type: 'text',
    placeholder: 'Enter full name...'
  },

  provider: {
    label: 'Provider',
    type: 'select',
    placeholder: 'Select provider',
    options: [
      { label: 'Local', value: 'Local' },
      { label: 'Google', value: 'Google' },
      { label: 'GitHub', value: 'GitHub' }
    ]
  } as SelectFieldConfig
}
