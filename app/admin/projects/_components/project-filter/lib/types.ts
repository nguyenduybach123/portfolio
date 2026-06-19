import z from 'zod'
import { POST_FILTER_SCHEMA } from './constants'

export type PostFilterType = z.infer<typeof POST_FILTER_SCHEMA>
