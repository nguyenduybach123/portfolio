'use client'

import { useMemo } from 'react'
import { useRouter, useSearchParams, usePathname } from 'next/navigation'

import { DataTable } from '@/components/shared'
import { DataTableBulkActions } from '@/components/shared/data-table/shared'

import { BASE_PATHS } from '@/constants/path'

import { useGetAllProject as useGetProjects } from '@/api/endpoints/projects'

import { useBulkActions, useProjectColumnsDefs } from './lib/hooks'

const DEFAULT_PAGE = 0
const DEFAULT_SIZE = 20

export default function ProjectTable() {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const pageIndex = Number(searchParams.get('page') ?? DEFAULT_PAGE)

  const pageSize = Number(searchParams.get('size') ?? DEFAULT_SIZE)

  const getProjectsQuery = useGetProjects(
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

  const columns = useProjectColumnsDefs({
    onViewDetails: (project) => {
      router.push(BASE_PATHS.admin.projects.detail(project.id as string))
    }
  })

  const bulkActions = useBulkActions({
    onDeleteSelected: () => {}
  })

  return (
    <DataTable
      columns={columns}
      data={getProjectsQuery.data?.items ?? []}
      rowCount={getProjectsQuery.data?.totalElements ?? 0}
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

      <DataTableBulkActions entityName='Project' actions={bulkActions} />
    </DataTable>
  )
}
