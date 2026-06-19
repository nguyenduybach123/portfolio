'use client'

// Core
import { z } from 'zod'
import { useMemo, ReactNode, useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { assign } from 'lodash-es'

// Internal
import { Props } from './lib/types'
import { getDefaultValuesFromSchema } from './lib/utils'
import { DYNAMIC_FILTER_CONTEXT } from './lib/constants'
import {
  DynamicFilterFields,
  DynamicFilterActions,
  DynamicFilterGrid,
  DynamicFilterSidebar,
  DynamicFilterSection,
  DynamicFilterContent
} from './components'

interface DynamicFilterRootProps<T extends z.ZodObject<any>> extends Props<T> {
  children?: ReactNode
}

const DynamicFilter = <T extends z.ZodObject<any>>(props: DynamicFilterRootProps<T>) => {
  const { schema, onSubmit, defaultValues, fieldConfig = {} as Record<string, any>, children } = props

  // Hooks
  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: defaultValues ?? getDefaultValuesFromSchema(schema)
  })

  const [isFilterOpen, setIsFilterOpen] = useState(false)

  // Context
  const contextValues = useMemo(
    () => ({
      form,
      schema,
      fieldConfig,
      onSubmit,
      isFilterOpen,
      setIsFilterOpen
    }),
    [form, schema, fieldConfig, onSubmit, isFilterOpen]
  )

  return <DYNAMIC_FILTER_CONTEXT.Provider value={contextValues}>{children}</DYNAMIC_FILTER_CONTEXT.Provider>
}

export default assign(DynamicFilter, {
  Content: DynamicFilterContent,
  Fields: DynamicFilterFields,
  Actions: DynamicFilterActions,
  Grid: DynamicFilterGrid,
  Sidebar: DynamicFilterSidebar,
  Section: DynamicFilterSection
})
