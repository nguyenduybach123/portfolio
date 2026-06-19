import { useCallback, useMemo } from 'react'
import { useRouter, usePathname, useSearchParams } from 'next/navigation'
import type { PaginationState, Updater } from '@tanstack/react-table'

interface UseUrlPaginationProps {
  defaultPage?: number
  defaultSize?: number
}

const useUrlPagination = ({ defaultPage = 0, defaultSize = 20 }: UseUrlPaginationProps = {}) => {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const pageIndex = Number(searchParams.get('page') ?? defaultPage)
  const pageSize = Number(searchParams.get('size') ?? defaultSize)

  const pagination = useMemo(
    () => ({
      pageIndex,
      pageSize
    }),
    [pageIndex, pageSize]
  )

  const onPaginationChange = useCallback(
    (updater: Updater<PaginationState>) => {
      const next = typeof updater === 'function' ? updater(pagination) : updater

      const params = new URLSearchParams(searchParams.toString())
      params.set('page', String(next.pageIndex))
      params.set('size', String(next.pageSize))

      router.push(`${pathname}?${params.toString()}`, { scroll: false })
    },
    [pagination, pathname, router, searchParams]
  )

  return {
    pagination,
    onPaginationChange,
    pageIndex,
    pageSize
  }
}

export default useUrlPagination
