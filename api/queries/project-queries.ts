// /api/queries/user-queries.ts

import { queryOptions } from '@tanstack/react-query'
import { getAll as getProjects } from '@/api/endpoints/projects'

export interface GetUsersParams {
  page: number
  size: number
}

export const projectsKeys = {
  all: ['projects'] as const,

  list: (params: GetUsersParams) => [...projectsKeys.all, 'list', params] as const
}

export const postQueryOptions = (params: GetUsersParams) =>
  queryOptions({
    queryKey: projectsKeys.list(params),
    queryFn: () =>
      getProjects({
        ...params
      })
  })
