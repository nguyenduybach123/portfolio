'use client'

import DataTable from '@/components/shared/data-table'
import { FileItem } from '@/components/shared/files-media/lib/types'
import useListViewColumns from './useListViewColumns'

interface ListViewProps {
  files: FileItem[]
  selectedFileIds: Set<string>
  onToggleSelect: (fileId: string) => void
  onOpenPreview: (fileId: string) => void
  onSelectAll: () => void
  allSelected: boolean
}

const ListView = ({ files, selectedFileIds, onToggleSelect, onOpenPreview, onSelectAll }: ListViewProps) => {
  const columns = useListViewColumns({
    onOpenPreview,
    onNavigateFolder: () => {},
    onCopyUrl: () => {},
    onDownload: () => {},
    onDelete: () => {}
  })

  const selectedRows = files.filter((f) => selectedFileIds.has(f.id))

  const handleSelectedRowsChange = (rows: FileItem[]) => {
    const newIds = new Set(rows.map((r) => r.id))
    const currentIds = new Set([...selectedFileIds])

    // toggle added
    for (const id of newIds) {
      if (!currentIds.has(id)) onToggleSelect(id)
    }

    // toggle removed
    for (const id of currentIds) {
      if (!newIds.has(id)) onToggleSelect(id)
    }
  }

  return (
    <DataTable<FileItem>
      columns={columns}
      data={files}
      enableRowSelection
      getRowId={(row) => row.id}
      selectedRows={selectedRows}
      onSelectedRowsChange={handleSelectedRowsChange}
    >
      <DataTable.Header />
      <DataTable.Content>
        <DataTable.Body />
      </DataTable.Content>
    </DataTable>
  )
}

export default ListView
