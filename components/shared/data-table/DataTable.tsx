'use client'

// Core
import { useEffect, useState, ReactNode, useMemo, useCallback, useRef } from 'react'
import {
  getCoreRowModel,
  useReactTable,
  getSortedRowModel,
  RowSelectionState,
  Updater,
  OnChangeFn,
  PaginationState,
  ColumnPinningState,
  ColumnSizingState
} from '@tanstack/react-table'

// Internal
import { Props } from './lib/types'
import { DATA_TABLE_CONTEXT, DEFAULT_PAGE_INDEX, DEFAULT_PAGE_SIZE } from './lib/constants'
import { assign } from 'lodash-es'
import { DataTableBody, DataTableContent, DataTableHeader, DataTablePagination } from './components'

export interface DataTableRootProps<TData> extends Props<TData> {
  children: ReactNode
}

const DataTable = <TData,>(props: DataTableRootProps<TData>) => {
  // Props
  const {
    columns,
    data,
    manualPagination = true,
    rowCount = 0,
    state,
    selectedRows,
    onPaginationChange,
    enableRowSelection = false,
    enablePagination = true,
    defaultSelectedRows,
    getRowId,
    classNames,
    onSelectedRowsChange,
    children
  } = props

  // States
  const [dataTable, setDataTable] = useState<TData[]>(data)
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false)
  const [columnPinning, setColumnPinning] = useState<ColumnPinningState>({
    left: [],
    right: []
  })
  const [columnSizing, setColumnSizing] = useState<ColumnSizingState>({})
  const [columnOrder, setColumnOrder] = useState<string[]>(() => {
    const allColumnIds = columns.map((col) => col.id as string)
    console.log('allColumnIds', allColumnIds)
    const pinnedLeftIds = columnPinning.left || []
    const pinnedRightIds = columnPinning.right || []
    const nonPinnedIds = allColumnIds.filter((id) => !pinnedLeftIds.includes(id) && !pinnedRightIds.includes(id))
    return [...pinnedLeftIds, ...nonPinnedIds, ...pinnedRightIds]
  })
  const [rowSelection, setRowSelection] = useState<RowSelectionState>(() => {
    const initialState: RowSelectionState = {}

    if (selectedRows && getRowId) {
      selectedRows.forEach((row) => {
        const rowId = getRowId!(row)
        const rowIndex = dataTable.findIndex((d) => getRowId!(d) === rowId)
        if (rowIndex !== -1) {
          initialState[rowIndex] = true
        }
      })
    } else if (defaultSelectedRows && getRowId) {
      defaultSelectedRows.forEach((row) => {
        const rowId = getRowId!(row)
        const rowIndex = dataTable.findIndex((d) => getRowId!(d) === rowId)
        if (rowIndex !== -1) {
          initialState[rowIndex] = true
        }
      })
    }

    return initialState
  })

  // Hooks
  const initialOrder = useRef({
    columnOrder,
    data
  })

  // Methods
  const handlePaginationChange: OnChangeFn<PaginationState> = useCallback(
    (updater) => {
      if (!onPaginationChange) return

      const newPagination =
        typeof updater === 'function'
          ? updater(
              state?.pagination || {
                pageIndex: DEFAULT_PAGE_INDEX,
                pageSize: DEFAULT_PAGE_SIZE
              }
            )
          : updater

      onPaginationChange(newPagination)
    },
    [onPaginationChange, state?.pagination]
  )

  const handleRowSelectionChange = useCallback(
    (updaterOrValue: Updater<RowSelectionState>) => {
      setRowSelection((prev) => {
        const newRowSelection = typeof updaterOrValue === 'function' ? updaterOrValue(prev) : updaterOrValue

        if (onSelectedRowsChange) {
          const selectedRowIds = Object.keys(newRowSelection).filter((id) => newRowSelection[id])

          const selectedRows = selectedRowIds
            .map((id) => dataTable.find((row) => getRowId?.(row) === id))
            .filter((row): row is TData => row !== undefined)

          onSelectedRowsChange(selectedRows)
        }

        return newRowSelection
      })
    },
    [onSelectedRowsChange, dataTable, getRowId]
  )

  const handleOpenDeleteDialog = useCallback(
    (open: boolean) => {
      setOpenDeleteDialog(open)
    },
    [setOpenDeleteDialog]
  )

  const handleColumnOrderChange = useCallback(
    (newOrder: string[] | ((prevOrder: string[]) => string[])) => {
      setColumnOrder(newOrder)
    },
    [setColumnOrder]
  )

  const handleDataChange = useCallback(
    (newData: TData[] | ((prevData: TData[]) => TData[])) => {
      setDataTable(newData)
    },
    [setDataTable]
  )

  // Table
  const table = useReactTable({
    data: dataTable,
    columns,
    rowCount,
    getRowId,
    manualPagination,
    state: {
      pagination: state?.pagination,
      rowSelection: enableRowSelection ? rowSelection : {},
      columnPinning,
      columnSizing,
      columnOrder
    },
    onPaginationChange: enablePagination ? handlePaginationChange : undefined,
    onColumnPinningChange: setColumnPinning,
    onColumnSizingChange: setColumnSizing,
    onColumnOrderChange: setColumnOrder,
    onRowSelectionChange: enableRowSelection ? handleRowSelectionChange : undefined,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    enableRowSelection,
    enableColumnResizing: true,
    enableColumnPinning: true,
    columnResizeMode: 'onChange'
  })

  // Effects
  useEffect(() => {
    setDataTable(data)
  }, [data])

  useEffect(() => {
    if (!selectedRows || !getRowId) return

    const newSelection: RowSelectionState = {}

    selectedRows.forEach((row) => {
      const rowId = getRowId(row)
      if (rowId != null) {
        newSelection[rowId] = true
      }
    })

    setRowSelection(newSelection)
  }, [selectedRows, getRowId])

  const contextValues = useMemo(
    () => ({
      // Props
      table,
      initialOrder,
      openDeleteDialog,
      enableRowSelection,
      enablePagination,
      manualPagination,
      classNames,

      // Actions
      openDeleteDialogAction: handleOpenDeleteDialog,
      changeColumnOrderAction: handleColumnOrderChange,
      changeDataTableAction: handleDataChange
    }),
    [
      table,
      dataTable,
      columnOrder,
      initialOrder,
      openDeleteDialog,
      enableRowSelection,
      enablePagination,
      manualPagination,
      classNames,
      rowSelection,
      columnPinning,
      columnSizing,
      handleOpenDeleteDialog,
      handleColumnOrderChange,
      handleDataChange
    ]
  )

  return (
    <DATA_TABLE_CONTEXT.Provider value={contextValues}>
      <div className='space-y-4 overflow-x-auto'>
        <div className='overflow-hidden rounded-lg border border-gray-200 dark:border-gray-800'>{children}</div>
      </div>
    </DATA_TABLE_CONTEXT.Provider>
  )
}

export default assign(DataTable, {
  Header: DataTableHeader,
  Body: DataTableBody,
  Content: DataTableContent,
  Pagination: DataTablePagination
})
