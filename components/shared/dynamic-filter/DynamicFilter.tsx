'use client'

// Core
import { z } from 'zod'
import { useMemo, ReactNode } from 'react'
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
  DynamicFilterSection
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

  // Context
  const contextValues = useMemo(
    () => ({
      form,
      schema,
      fieldConfig,
      onSubmit
    }),
    [form, schema, fieldConfig, onSubmit]
  )

  return (
    <DYNAMIC_FILTER_CONTEXT.Provider value={contextValues}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4' noValidate>
        {children}
      </form>
    </DYNAMIC_FILTER_CONTEXT.Provider>
  )
}

export default assign(DynamicFilter, {
  Fields: DynamicFilterFields,
  Actions: DynamicFilterActions,
  Grid: DynamicFilterGrid,
  Sidebar: DynamicFilterSidebar,
  Section: DynamicFilterSection
})
