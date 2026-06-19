import { TableHead } from '@/components/ui/table'
import { Header, HeaderGroup } from '@tanstack/react-table'
import { flexRender } from '@tanstack/react-table'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { ArrowLeftFromLineIcon, ArrowRightFromLineIcon, EllipsisIcon, PinOffIcon } from 'lucide-react'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'

interface Props<TData> {
  headerGroup: HeaderGroup<TData>
  header: Header<TData, unknown>
  index: number
}

const TableHeadData = <TData,>(props: Props<TData>) => {
  // Props
  const { header, headerGroup, index } = props

  // Memos
  const { column } = header
  const isPinned = column.getIsPinned()
  const isLastLeftPinned = isPinned === 'left' && column.getIsLastColumn('left')
  const isFirstRightPinned = isPinned === 'right' && column.getIsFirstColumn('right')

  return (
    <TableHead
      key={header.id}
      data-pinned={isPinned || undefined}
      data-last-col={isLastLeftPinned ? 'left' : isFirstRightPinned ? 'right' : undefined}
      colSpan={header.colSpan}
      style={{ width: header.getSize() }}
      className={cn(
        'data-pinned:bg-muted/90 data-pinned:backdrop-blur-xs relative h-10 truncate border-t [&:not([data-pinned]):has(+[data-pinned])_div.cursor-col-resize:last-child]:opacity-0 [&[data-last-col=left]_div.cursor-col-resize:last-child]:opacity-0 [&[data-pinned=right]:last-child_div.cursor-col-resize:last-child]:opacity-0'
      )}
    >
      <div className='flex items-center justify-between space-x-2'>
        {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}

        {!header.isPlaceholder &&
          header.column.getCanPin() &&
          (header.column.getIsPinned() ? (
            <Button
              size='icon'
              variant='ghost'
              className='-mr-1 size-7'
              onClick={() => header.column.pin(false)}
              title={`Unpin ${header.column.columnDef.header as string} column`}
            >
              <PinOffIcon className='opacity-60' aria-hidden='true' />
            </Button>
          ) : (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  size='icon'
                  variant='ghost'
                  className='-mr-1 size-7'
                  aria-label={`Pin options for ${header.column.columnDef.header as string} column`}
                  title={`Pin options for ${header.column.columnDef.header as string} column`}
                >
                  <EllipsisIcon className='opacity-60' aria-hidden='true' />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align='end'>
                <DropdownMenuItem onClick={() => header.column.pin('left')}>
                  <ArrowLeftFromLineIcon size={16} className='opacity-60' aria-hidden='true' />
                  Ghim trái
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => header.column.pin('right')}>
                  <ArrowRightFromLineIcon size={16} className='opacity-60' aria-hidden='true' />
                  Ghim phải
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ))}
      </div>
      {header.column.getCanResize() && index < headerGroup.headers.length - 1 && (
        <div
          {...{
            onDoubleClick: () => header.column.resetSize(),
            onMouseDown: header.getResizeHandler(),
            onTouchStart: header.getResizeHandler(),
            className:
              'group-last/head:hidden absolute top-0 h-full w-6 mx-1 cursor-col-resize user-select-none touch-none -right-2 z-10 flex justify-center before:absolute before:w-px before:inset-y-0 before:bg-border before:translate-x-px'
          }}
        />
      )}
    </TableHead>
  )
}

export default TableHeadData
