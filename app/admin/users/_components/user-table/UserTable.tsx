'use client'

import { useMemo } from 'react'
import { useRouter, useSearchParams, usePathname } from 'next/navigation'

import { DataTable } from '@/components/shared'
import { DataTableBulkActions } from '@/components/shared/data-table/shared'

import { useGetUsers } from '@/api/endpoints/users'

import { useBulkActions, useUserColumnsDefs } from './lib/hooks'

const DEFAULT_PAGE = 0
const DEFAULT_SIZE = 10

export default function UserTable() {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const pageIndex = Number(searchParams.get('page') ?? DEFAULT_PAGE)

  const pageSize = Number(searchParams.get('size') ?? DEFAULT_SIZE)

  const getUsersQuery = useGetUsers(
    {
      page: pageIndex,
      size: pageSize
    },
    {
      query: {
        select: (data) => data.data.data
      }
    }
  )

  const pagination = useMemo(
    () => ({
      pageIndex,
      pageSize
    }),
    [pageIndex, pageSize]
  )

  const handlePaginationChange = (updater: typeof pagination | ((old: typeof pagination) => typeof pagination)) => {
    const next = typeof updater === 'function' ? updater(pagination) : updater

    const params = new URLSearchParams(searchParams.toString())

    params.set('page', String(next.pageIndex))
    params.set('size', String(next.pageSize))

    router.push(`${pathname}?${params.toString()}`)
  }

  const columns = useUserColumnsDefs({
    onViewDetails: (user) => {
      router.push(`/admin/users/${user.id}`)
    }
  })

  const bulkActions = useBulkActions({
    onDeleteSelected: () => {}
  })

  return (
    <DataTable
      columns={columns}
      data={getUsersQuery?.data?.items ?? []}
      rowCount={getUsersQuery.data?.totalElements ?? 0}
      manualPagination
      enablePagination
      enableRowSelection
      state={{
        pagination
      }}
      onPaginationChange={handlePaginationChange}
      getRowId={(row) => row.id!}
    >
      <DataTable.Content>
        <DataTable.Header />
        <DataTable.Body />
      </DataTable.Content>

      <DataTable.Pagination />

      <DataTableBulkActions entityName='User' actions={bulkActions} />
    </DataTable>
  )
}
