import { TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { useDataTableContext } from '../../lib/hooks'
import { cn } from '@/lib/utils'
import { Checkbox } from '@/components/ui/checkbox'
import { useDnDProviderContext } from '../../shared/data-table-dnd-provider'
import { TableHeadData, TableHeadSortableData } from './components'

const DataTableHeader = <TData,>() => {
  // Hooks
  const { table, enableRowSelection, classNames } = useDataTableContext<TData>()
  const dndContext = useDnDProviderContext()
  const enableDragAndDrop = dndContext?.enableDragAndDrop

  // Template
  return (
    <TableHeader className={cn(classNames?.header)}>
      {table.getHeaderGroups().map((headerGroup) => (
        <TableRow
          key={headerGroup.id}
          className='bg-muted [&>th]:border-t-0 [&>th]:font-mono [&>th]:font-semibold [&>th]:text-muted-foreground'
        >
          {enableRowSelection && (
            <TableHead className='relative h-10 w-12 border-t before:absolute before:inset-y-0 before:left-0 before:w-px before:bg-border first:before:bg-transparent'>
              <Checkbox
                checked={table.getIsAllPageRowsSelected()}
                onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
                aria-label='Select all'
                className='[&>span]:border-white [&>span]:bg-white/10 [&>span]:data-[state=checked]:border-white [&>span]:data-[state=checked]:bg-white [&>span]:data-[state=checked]:text-primary'
              />
            </TableHead>
          )}

          {headerGroup.headers.map((header, index) => {
            if (enableDragAndDrop) {
              return <TableHeadSortableData key={header.id} header={header} headerGroup={headerGroup} index={index} />
            }

            return <TableHeadData key={header.id} header={header} headerGroup={headerGroup} index={index} />
          })}
        </TableRow>
      ))}
    </TableHeader>
  )
}

export default DataTableHeader
