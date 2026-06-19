'use client'

import { DataTable } from '@/components/shared'
import { FC, useState } from 'react'
import { DataTableBulkActions } from '@/components/shared/data-table/shared'

import { useRouter } from 'next/navigation'
import { useUserSessionBulkActions, useUserSessionColumnsDefs } from './lib/hooks'
import { UserSession } from '@/types/users'

interface FilterValues {
  name?: string
}

interface Props {
  data: UserSession[]
  filterValues?: FilterValues
}

const UserSessionTable: FC<Props> = (props) => {
  // Props
  const { data, filterValues } = props

  // Hooks
  const router = useRouter()

  // States
  const [selectedRows, setSelectedRows] = useState<UserSession[]>([])
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
  const columns = useUserSessionColumnsDefs({})

  const bulkActionList = useUserSessionBulkActions({
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

export default UserSessionTable
