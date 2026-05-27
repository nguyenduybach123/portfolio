import { FC, useState } from 'react'
import { DataTable } from '@/components/shared'
import { useCommentColumnsDefs } from './lib/hooks'
import { CommentTableRow } from './lib/types'
import { CommentTableBulkActions } from './BulkActions'

interface FilterValues {
  content?: string
  userName?: string
}

interface Props {
  data: CommentTableRow[]
  filterValues?: FilterValues
}

const CommentTable: FC<Props> = (props) => {
  const { data, filterValues } = props

  const [selectedRows, setSelectedRows] = useState<CommentTableRow[]>([])
  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 20 })

  const handlePaginationChange = (
    updater: Partial<typeof pagination> | ((old: typeof pagination) => typeof pagination)
  ) => {
    setPagination((old) => {
      const newPagination = typeof updater === 'function' ? updater(old) : updater
      return { ...old, ...newPagination }
    })
  }

  const columns = useCommentColumnsDefs({
    onViewDetails: (comment) => {
      // Implement view details logic here
      // e.g., open modal or navigate
    },
    onDelete: (comment) => {
      // Implement delete logic here
    }
  })

  const bulkActionList = [
    {
      label: 'Delete Selected',
      onClick: () => {
        // Implement bulk delete logic here
      }
    }
  ]

  return (
    <DataTable
      columns={columns}
      data={data}
      rowCount={data.length}
      getRowId={(row) => row.id as string}
      manualPagination={false}
      selectedRows={selectedRows}
      enablePagination
      onSelectedRowsChange={setSelectedRows}
      state={{ pagination }}
      onPaginationChange={handlePaginationChange}
    >
      <DataTable.Content>
        <DataTable.Header />
        <DataTable.Body />
      </DataTable.Content>
      <DataTable.Pagination />
    </DataTable>
  )
}

export default CommentTable
