import { flexRender, Row } from '@tanstack/react-table'
import { TableCell, TableRow } from '@/components/ui/table'
import { cn } from '@/lib/utils'

interface Props<TData> {
  row: Row<TData>
  index: number
  lastRow?: boolean
}

const tdStyles: React.CSSProperties = {
  padding: '12px 16px',
  borderBottom: '1px solid #e2e8f0'
}

const tdLastRowStyles: React.CSSProperties = {
  padding: '12px 16px'
}

const SortableRowData = <TData,>({
  row,
  lastRow
}: Props<TData>) => {
  return (
    <TableRow
      data-state={row.getIsSelected() && 'selected'}
      className={cn(
        'border-b-gray-100 bg-white dark:border-b-gray-800',
        row.getIsSelected()
          ? 'bg-primary/10 hover:bg-primary/50 dark:bg-primary/20'
          : 'hover:bg-primary/10 dark:hover:bg-gray-800/30'
      )}
    >
      {row.getVisibleCells().map((cell) => (
        <TableCell
          key={cell.id}
          style={lastRow ? tdLastRowStyles : tdStyles}
        >
          {flexRender(
            cell.column.columnDef.cell,
            cell.getContext()
          )}
        </TableCell>
      ))}
    </TableRow>
  )
}

export default SortableRowData