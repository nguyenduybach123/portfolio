// @ts-nocheck
import type { ProjectRequestCategory } from './projectRequestCategory'
import type { ProjectRequestType } from './projectRequestType'

export interface ProjectRequest {
  title?: string
  description?: string
  type?: ProjectRequestType
  category?: ProjectRequestCategory
  github?: string
  demo?: string
  image?: string
  featured?: boolean
  startDate?: string
  endDate?: string
  technologies?: string[]
  responsibilities?: string[]
}
