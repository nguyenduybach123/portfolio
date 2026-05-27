'use client'

import { DataTable } from '@/components/shared'
import { FC, useState } from 'react'
import { DataTableBulkActions } from '@/components/shared/data-table/shared'
import { useBulkActions, useUserColumnsDefs } from './lib/hooks'
import { User as UserResponse } from '@/types/users'

interface FilterValues {
  name?: string
}

interface Props {
  data: UserResponse[]
  filterValues?: FilterValues
}

const UserTable: FC<Props> = (props) => {
  // Props
  const { data, filterValues } = props

  // States
  const [selectedRows, setSelectedRows] = useState<UserResponse[]>([])
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
  const columns = useUserColumnsDefs({})

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

      <DataTableBulkActions entityName='người dùng' actions={bulkActionList} />
    </DataTable>
  )
}

export default UserTable
