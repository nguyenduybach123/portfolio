'use client'

import { DataTable } from '@/components/shared'
import { FC, useState } from 'react'
import { DataTableBulkActions } from '@/components/shared/data-table/shared'
import { useBulkActions, useProjectColumnsDefs } from './lib/hooks'
import { Project as ProjectResponse } from '@/types'

interface FilterValues {
  name?: string
}

interface Props {
  data: ProjectResponse[]
  filterValues?: FilterValues
}

const ProjectTable: FC<Props> = (props) => {
  // Props
  const { data, filterValues } = props

  // States
  const [selectedRows, setSelectedRows] = useState<ProjectResponse[]>([])
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
  const columns = useProjectColumnsDefs({})

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

export default ProjectTable
