// /api/queries/user-queries.ts

import { queryOptions } from '@tanstack/react-query'
import { getPosts } from '@/api/endpoints/posts'

export interface GetUsersParams {
  page: number
  size: number
}

export const postKeys = {
  all: ['posts'] as const,

  list: (params: GetUsersParams) => [...postKeys.all, 'list', params] as const
}

export const postQueryOptions = (params: GetUsersParams) =>
  queryOptions({
    queryKey: postKeys.list(params),
    queryFn: () =>
      getPosts({
        ...params
      })
  })
