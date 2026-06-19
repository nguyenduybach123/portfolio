// app/admin/users/page.tsx

import { dehydrate, HydrationBoundary } from '@tanstack/react-query'

import { getQueryClient } from '@/configs/query-client'

import { UserFilter, UserTable } from './_components'
import { PageHeader } from '../_components'
import { usersQueryOptions } from '@/api/queries/user-queries'

interface Props {
  searchParams: Promise<{
    page?: string
    size?: string
  }>
}

export default async function UserPage({ searchParams }: Props) {
  const params = await searchParams

  const page = Number(params.page ?? 0)
  const size = Number(params.size ?? 10)

  const queryClient = getQueryClient()

  await queryClient.prefetchQuery(
    usersQueryOptions({
      page,
      size
    })
  )

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div className='container mx-auto flex max-w-6xl'>
        <UserFilter>
          <div className='flex-1 overflow-auto'>
            <div className='space-y-6 p-6 lg:p-8'>
              <PageHeader title='Users List' description='Manage users in the system' />
              <UserTable />
            </div>
          </div>
        </UserFilter>
      </div>
    </HydrationBoundary>
  )
}
