import { TableRow, TableCell, TableBody } from '@/components/ui/table'
import { useDataTableContext } from '../../lib/hooks'
import { RowData, SortableRowData } from './components'
import { useDnDProviderContext } from '../../shared/data-table-dnd-provider'
import { DnDProviderContextValue } from '../../shared/data-table-dnd-provider/lib/types'

const DataTableBody = <TData,>() => {
  // Hooks
  const { table, enableRowSelection } = useDataTableContext<TData>()
  const dndContext = useDnDProviderContext()

  // Memos
  const enableDragAndDrop = dndContext?.enableDragAndDrop

  // Template
  return (
    <TableBody>
      {table.getRowModel().rows?.length ? (
        table.getRowModel().rows.map((row, index) => {
          if (enableDragAndDrop) {
            return <SortableRowData key={row.id} row={row} index={index} />
          }

          return <RowData key={row.id} row={row} />
        })
      ) : (
        <TableRow>
          <TableCell
            colSpan={table.getAllColumns().length + (enableRowSelection ? 1 : 0)}
            className='h-24 text-center text-gray-500 dark:text-gray-400'
          >
            Không có dữ liệu để hiển thị.
          </TableCell>
        </TableRow>
      )}
    </TableBody>
  )
}

export default DataTableBody
