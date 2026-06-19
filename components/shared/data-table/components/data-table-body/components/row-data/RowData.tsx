import { useDataTableContext } from '@/components/shared/data-table/lib/hooks'
import { Checkbox } from '@/components/ui/checkbox'
import { TableRow, TableCell } from '@/components/ui/table'
import { cn } from '@/lib/utils'
import { flexRender, Row } from '@tanstack/react-table'

interface Props<TData> {
  row: Row<TData>
}

const RowData = <TData,>({ row }: Props<TData>) => {
  const { enableRowSelection } = useDataTableContext<TData>()

  return (
    <TableRow
      key={row.id}
      data-state={row.getIsSelected() && 'selected'}
      className={cn(
        'border-b-gray-100 bg-white dark:border-b-gray-800',
        row.getIsSelected()
          ? 'bg-primary/10 hover:bg-primary/50 dark:bg-primary/20'
          : 'hover:bg-primary/10 dark:hover:bg-gray-800/30'
      )}
    >
      {enableRowSelection && (
        <TableCell>
          <Checkbox
            checked={row.getIsSelected()}
            onCheckedChange={(value) => row.toggleSelected(!!value)}
            aria-label='Select row'
            className={cn(
              '[&>span]:border-gray-700! cursor-pointer border-2 [&>span]:data-[state=checked]:border-primary [&>span]:data-[state=checked]:bg-primary'
            )}
          />
        </TableCell>
      )}

      {row.getVisibleCells().map((cell) => (
        <TableCell key={cell.id} className='py-3'>
          {flexRender(cell.column.columnDef.cell, cell.getContext())}
        </TableCell>
      ))}
    </TableRow>
  )
}

export default RowData
