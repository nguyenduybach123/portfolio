import { Table as TanStackTable, ColumnDef, PaginationState } from '@tanstack/react-table'
import { ReactNode, RefObject } from 'react'

export interface DataTableContextValue<TData> {
  // Props
  table: TanStackTable<TData>
  initialOrder: RefObject<{
    columnOrder: string[]
    data: TData[]
  }>
  enableRowSelection: boolean
  enablePagination: boolean
  manualPagination: boolean
  openDeleteDialog: boolean
  classNames?: {
    header?: string
    footer?: string
  }

  // Actions
  openDeleteDialogAction: (open: boolean) => void
  changeColumnOrderAction: (columnOrder: string[] | ((prevOrder: string[]) => string[])) => void
  changeDataTableAction: (data: TData[] | ((prevData: TData[]) => TData[])) => void
}
export type Props<TData> = {
  columns: ColumnDef<TData>[]
  data: TData[]
  manualPagination?: boolean
  rowCount?: number
  state?: {
    pagination?: PaginationState
  }
  enablePagination?: boolean
  enableRowSelection?: boolean
  defaultSelectedRows?: TData[]
  selectedRows?: TData[]
  getRowId?: (row: TData) => string
  onSelectedRowsChange?: (selectedRows: TData[]) => void
  onPaginationChange?: (pagination: PaginationState) => void
  classNames?: {
    header?: string
    footer?: string
  }
  children?: ReactNode
}
