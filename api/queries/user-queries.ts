// /api/queries/user-queries.ts

import { queryOptions } from '@tanstack/react-query'
import { getUsers } from '@/api/endpoints/users'

export interface GetUsersParams {
  page: number
  size: number
}

export const userKeys = {
  all: ['users'] as const,

  list: (params: GetUsersParams) => [...userKeys.all, 'list', params] as const
}

export const usersQueryOptions = (params: GetUsersParams) =>
  queryOptions({
    queryKey: userKeys.list(params),
    queryFn: () =>
      getUsers({
        ...params
      })
  })
