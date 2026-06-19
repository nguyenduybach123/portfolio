'use client'

import type { FC, ReactNode } from 'react'

import { DnD_PROVIDER_CONTEXT } from './lib/constants'

interface Props {
  children: ReactNode
}

const DataTableDnDProvider: FC<Props> = ({ children }) => {
  return (
    <DnD_PROVIDER_CONTEXT.Provider
      value={{
        enableDragAndDrop: false
      }}
    >
      {children}
    </DnD_PROVIDER_CONTEXT.Provider>
  )
}

export default DataTableDnDProvider