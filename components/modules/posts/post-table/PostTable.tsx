'use client'

import { DataTable } from '@/components/shared'
import { FC, useMemo, useState } from 'react'
import { useBulkActions, usePostColumnsDefs } from './lib/hooks'
import { DataTableBulkActions } from '@/components/shared/data-table/shared'
import { PaginationResponsePostResponse, PostResponse } from '@/api/models'
import { PaginationState } from '@tanstack/react-table'
import { UseQueryResult } from '@tanstack/react-query'
import { DataTableProps } from '@/components/shared/data-table'

interface Props {
  query: UseQueryResult<PaginationResponsePostResponse | undefined>
  pagination: PaginationState
  onPaginationChange: DataTableProps<PostResponse[]>['onPaginationChange']
}

const PostTable: FC<Props> = (props) => {
  // Props
  const { query, pagination, onPaginationChange } = props

  // States
  const [selectedRows, setSelectedRows] = useState<PostResponse[]>([])

  //Memos
  const columns = usePostColumnsDefs({})

  const bulkActionList = useBulkActions({
    onDeleteSelected: () => {}
  })

  const postTableData = useMemo(() => query.data?.items ?? [], [query.data])

  return (
    <DataTable
      columns={columns}
      data={postTableData}
      rowCount={postTableData.length}
      getRowId={(row) => row.id as string}
      manualPagination={false}
      selectedRows={selectedRows}
      enablePagination
      enableRowSelection
      state={{ pagination }}
      onSelectedRowsChange={(selected) => setSelectedRows(selected)}
      onPaginationChange={onPaginationChange}
      classNames={{
        header: 'bg-primary/90'
      }}
    >
      <DataTable.Content>
        <DataTable.Header />
        <DataTable.Body />
      </DataTable.Content>
      <DataTable.Pagination />

      <DataTableBulkActions entityName='danh mục' actions={bulkActionList} />
    </DataTable>
  )
}

export default PostTable
