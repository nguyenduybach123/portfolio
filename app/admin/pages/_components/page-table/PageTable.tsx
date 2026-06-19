'use client'

import { FC, useState } from 'react'
import { DataTable } from '@/components/shared'
import { usePageColumnsDefs } from './lib/hooks'
import { Page as PageResponse } from '@/types/pages'
import { DataTableDnDProvider } from '@/components/shared/data-table/shared'

interface FilterValues {
  name?: string
}

interface Props {
  data: PageResponse[]
  filterValues?: FilterValues
}

const PageTable: FC<Props> = (props) => {
  // Props
  const { data, filterValues } = props

  // States
  const [selectedRows, setSelectedRows] = useState<PageResponse[]>([])
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
  const columns = usePageColumnsDefs({})

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
      <DataTableDnDProvider>
        <DataTable.Content>
          <DataTable.Header />
          <DataTable.Body />
        </DataTable.Content>
        <DataTable.Pagination />
      </DataTableDnDProvider>
    </DataTable>
  )
}

export default PageTable
