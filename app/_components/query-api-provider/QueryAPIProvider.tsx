'use client'

import { FC, ReactNode } from 'react'
import { QueryClientProvider } from '@tanstack/react-query'
import { getQueryClient } from '@/configs/query-client'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

interface Props {
  children: ReactNode
}

const QueryAPIProvider: FC<Props> = (props) => {
  // Props
  const { children } = props

  // Memos
  const queryClient = getQueryClient()

  // Template
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      {children}
    </QueryClientProvider>
  )
}

export default QueryAPIProvider
