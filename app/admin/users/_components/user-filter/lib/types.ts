import z from 'zod'
import { USER_FILTER_SCHEMA } from './constants'

export type UserFilterValues = z.infer<typeof USER_FILTER_SCHEMA>
