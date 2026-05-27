// Core
import { FC } from 'react'
import { motion } from 'framer-motion'
import { Controller } from 'react-hook-form'
import { Field, FieldDescription, FieldError, FieldLabel } from '@/components/ui/field'

// Internal
import { useDynamicFilterContext } from '../../lib/hooks'
import { getSchemaShape } from '../../lib/utils'
import { DynamicFilterFieldRenderer } from '../../shared'

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05
    }
  }
}

const item = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0 }
}

// Component
const DynamicFilterFields: FC = () => {
  // Hooks
  const { form, schema, fieldConfig } = useDynamicFilterContext()

  console.log('DynamicFilterFields render with schema:', Object.entries(getSchemaShape(schema)))

  // Template
  return (
    <motion.div variants={container} initial='hidden' animate='show' className='space-y-4'>
      {Object.entries(getSchemaShape(schema)).map(([name, fieldSchema]) => {
        const config = fieldConfig[name]

        if (!config) return null

        return (
          <Controller
            key={name}
            control={form.control}
            name={name}
            render={({ field }) => (
              <motion.div variants={item}>
                <Field className='min-w-0'>
                  <FieldLabel className='text-xs font-medium text-muted-foreground'>{config.label ?? name}</FieldLabel>
                  <DynamicFilterFieldRenderer field={field} name={name} config={config} fieldSchema={fieldSchema} />
                  {config.description && <FieldDescription className='text-xs'>{config.description}</FieldDescription>}
                  <FieldError className='text-xs' />
                </Field>
              </motion.div>
            )}
          />
        )
      })}
    </motion.div>
  )
}

export default DynamicFilterFields
