import { TableHead } from '@/components/ui/table'
import { Header, HeaderGroup, flexRender } from '@tanstack/react-table'

import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'

import {
  ArrowLeftFromLineIcon,
  ArrowRightFromLineIcon,
  EllipsisIcon,
  PinOffIcon
} from 'lucide-react'

import { cn } from '@/lib/utils'

interface Props<TData> {
  headerGroup: HeaderGroup<TData>
  header: Header<TData, unknown>
  index: number
}

const TableHeadSortableData = <TData,>({
  header,
  headerGroup,
  index
}: Props<TData>) => {
  const { column } = header

  const isPinned = column.getIsPinned()
  const isLastLeftPinned =
    isPinned === 'left' && column.getIsLastColumn('left')

  const isFirstRightPinned =
    isPinned === 'right' && column.getIsFirstColumn('right')

  return (
    <TableHead
      data-pinned={isPinned || undefined}
      data-last-col={
        isLastLeftPinned
          ? 'left'
          : isFirstRightPinned
            ? 'right'
            : undefined
      }
      colSpan={header.colSpan}
      style={{
        width: header.getSize()
      }}
      className={cn(
        'data-pinned:bg-muted/90',
        'data-pinned:backdrop-blur-xs',
        'relative h-10 truncate border-t',
        '[&:not([data-pinned]):has(+[data-pinned])_div.cursor-col-resize:last-child]:opacity-0',
        '[&[data-last-col=left]_div.cursor-col-resize:last-child]:opacity-0',
        '[&[data-pinned=right]:last-child_div.cursor-col-resize:last-child]:opacity-0'
      )}
    >
      <div className='flex items-center justify-between gap-2'>
        {header.isPlaceholder
          ? null
          : flexRender(
              header.column.columnDef.header,
              header.getContext()
            )}

        {!header.isPlaceholder &&
          column.getCanPin() &&
          (isPinned ? (
            <Button
              size='icon'
              variant='ghost'
              className='size-7'
              onClick={() => column.pin(false)}
              title={`Unpin ${String(column.columnDef.header)} column`}
            >
              <PinOffIcon
                className='opacity-60'
                aria-hidden='true'
              />
            </Button>
          ) : (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  size='icon'
                  variant='ghost'
                  className='size-7'
                  aria-label={`Pin options for ${String(column.columnDef.header)} column`}
                  title={`Pin options for ${String(column.columnDef.header)} column`}
                >
                  <EllipsisIcon
                    className='opacity-60'
                    aria-hidden='true'
                  />
                </Button>
              </DropdownMenuTrigger>

              <DropdownMenuContent align='end'>
                <DropdownMenuItem
                  onClick={() => column.pin('left')}
                >
                  <ArrowLeftFromLineIcon
                    size={16}
                    className='opacity-60'
                  />
                  Ghim trái
                </DropdownMenuItem>

                <DropdownMenuItem
                  onClick={() => column.pin('right')}
                >
                  <ArrowRightFromLineIcon
                    size={16}
                    className='opacity-60'
                  />
                  Ghim phải
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ))}
      </div>

      {column.getCanResize() &&
        index < headerGroup.headers.length - 1 && (
          <div
            onDoubleClick={() => column.resetSize()}
            onMouseDown={header.getResizeHandler()}
            onTouchStart={header.getResizeHandler()}
            className='group-last/head:hidden absolute top-0 -right-2 z-10 mx-1 flex h-full w-6 touch-none select-none justify-center cursor-col-resize before:absolute before:inset-y-0 before:w-px before:bg-border before:translate-x-px'
          />
        )}
    </TableHead>
  )
}

export default TableHeadSortableData