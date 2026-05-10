'use client'

import { DataTable } from '@/components/shared'
import { PostResponse } from '@/types/posts'
import { FC, useState } from 'react'
import { useBulkActions, usePostColumnsDefs } from './lib/hooks'
import { DataTableBulkActions, DataTableDeleteDialog } from '@/components/shared/data-table/shared'

interface FilterValues {
  name?: string
}

interface Props {
  data: PostResponse[]
  filterValues?: FilterValues
}

const PostTable: FC<Props> = (props) => {
  // Props
  const { data, filterValues } = props

  // States
  const [selectedRows, setSelectedRows] = useState<PostResponse[]>([])
  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 20 })

  // Methods
  const handlePaginationChange = (
    updater: Partial<typeof pagination> | ((old: typeof pagination) => typeof pagination)
  ) => {
    setPagination((old) => {
      const newPagination = typeof updater === 'function' ? updater(old) : updater
      return { ...old, ...newPagination }
    })
  }

  //Memos
  const columns = usePostColumnsDefs({})

  const bulkActionList = useBulkActions({
    onDeleteSelected: () => {}
  })

  return (
    <DataTable
      columns={columns}
      data={data}
      rowCount={data.length}
      getRowId={(row) => row.id}
      manualPagination={false}
      selectedRows={selectedRows}
      enablePagination
      enableRowSelection
      state={{ pagination }}
      onSelectedRowsChange={(selected) => setSelectedRows(selected)}
      onPaginationChange={handlePaginationChange}
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
